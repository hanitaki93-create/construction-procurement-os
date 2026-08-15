-- Architecture V2 Session 04 R07: Recommendation -> Approval -> AwardDecision.
--
-- Authority principles:
--   * frozen ComparisonSnapshot + supplier-confirmed basis is the commercial source for a recommendation;
--   * every line-derived ProcurementRouteDecision relied upon is preserved exactly, then revalidated;
--   * approval policy/case/action is reusable platform authority, not procurement-specific mutable state;
--   * AwardDecision is an immutable decision handoff and is NOT a commitment/order/contract;
--   * transition-time checks fail closed when route, supplier, quotation-validity or technical facts are stale.

CREATE TABLE IF NOT EXISTS platform.approval_policy_version (
  policy_key text NOT NULL CHECK (policy_key ~ '^[A-Z][A-Z0-9_]{0,126}$'),
  version integer NOT NULL CHECK (version > 0),
  subject_type text NOT NULL CHECK (subject_type ~ '^[A-Z][A-Z0-9_]{0,126}$'),
  required_role_key text NOT NULL CHECK (required_role_key ~ '^[A-Z][A-Z0-9_]{0,62}$'),
  allow_conditional boolean NOT NULL DEFAULT false,
  monetary_threshold numeric(24,6),
  monetary_currency text,
  required_evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (policy_key, version),
  CHECK (monetary_threshold IS NULL OR monetary_threshold >= 0),
  CHECK (
    (monetary_threshold IS NULL AND monetary_currency IS NULL)
    OR (monetary_threshold IS NOT NULL AND monetary_currency ~ '^[A-Z]{3}$')
  ),
  CHECK (jsonb_typeof(required_evidence) = 'array')
);

COMMENT ON TABLE platform.approval_policy_version IS
  'Reusable exact approval-policy versions. Monetary threshold may be NULL when policy is role/scope based; no universal DOA amount is invented.';

INSERT INTO platform.approval_policy_version (
  policy_key, version, subject_type, required_role_key, allow_conditional,
  monetary_threshold, monetary_currency, required_evidence, effective_period
) VALUES (
  'UAE_CONTRACTOR_PROCUREMENT_DOA_STARTER',
  1,
  'PROCUREMENT_RECOMMENDATION',
  'OWNER',
  true,
  NULL,
  NULL,
  '["FROZEN_COMPARISON","ROUTE_DECISIONS","COMPETITION_RESULT","SUPPLIER_CONFIRMED_BASIS"]'::jsonb,
  tstzrange('2026-01-01T00:00:00Z', NULL, '[)')
) ON CONFLICT (policy_key, version) DO NOTHING;

CREATE TABLE IF NOT EXISTS platform.approval_case (
  approval_case_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  subject_type text NOT NULL CHECK (subject_type ~ '^[A-Z][A-Z0-9_]{0,126}$'),
  subject_id uuid NOT NULL,
  case_version integer NOT NULL DEFAULT 1 CHECK (case_version > 0),
  supersedes_approval_case_id uuid,
  approval_policy_key text NOT NULL,
  approval_policy_version integer NOT NULL,
  status text NOT NULL DEFAULT 'DRAFT' CHECK (
    status IN ('DRAFT','PENDING','APPROVED','CONDITIONALLY_APPROVED','REJECTED','RETURNED','CANCELLED','SUPERSEDED')
  ),
  monetary_basis numeric(24,6),
  monetary_currency text,
  scope_basis jsonb NOT NULL DEFAULT '{}'::jsonb,
  required_approvers jsonb NOT NULL DEFAULT '[]'::jsonb,
  ball_in_court jsonb NOT NULL DEFAULT '[]'::jsonb,
  required_evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  resolved_at timestamptz,
  UNIQUE (tenant_id, approval_case_id),
  UNIQUE (tenant_id, subject_type, subject_id, case_version),
  FOREIGN KEY (approval_policy_key, approval_policy_version)
    REFERENCES platform.approval_policy_version(policy_key, version),
  FOREIGN KEY (tenant_id, supersedes_approval_case_id)
    REFERENCES platform.approval_case(tenant_id, approval_case_id),
  FOREIGN KEY (tenant_id, created_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (
    (monetary_basis IS NULL AND monetary_currency IS NULL)
    OR (monetary_basis IS NOT NULL AND monetary_basis >= 0 AND monetary_currency ~ '^[A-Z]{3}$')
  ),
  CHECK (jsonb_typeof(scope_basis) = 'object'),
  CHECK (jsonb_typeof(required_approvers) = 'array'),
  CHECK (jsonb_typeof(ball_in_court) = 'array'),
  CHECK (jsonb_typeof(required_evidence) = 'array'),
  CHECK (
    (status IN ('DRAFT','PENDING') AND resolved_at IS NULL)
    OR (status NOT IN ('DRAFT','PENDING') AND resolved_at IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS platform.approval_action_occurrence (
  approval_action_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  approval_case_id uuid NOT NULL,
  sequence integer NOT NULL CHECK (sequence > 0),
  action text NOT NULL CHECK (action IN ('APPROVE','APPROVE_WITH_CONDITIONS','REJECT','RETURN_FOR_REVISION')),
  conditions text,
  comments text,
  current_gate_facts jsonb NOT NULL,
  delegated_authority_ref text,
  action_by uuid NOT NULL,
  action_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, approval_action_occurrence_id),
  UNIQUE (tenant_id, approval_case_id, sequence),
  FOREIGN KEY (tenant_id, approval_case_id)
    REFERENCES platform.approval_case(tenant_id, approval_case_id),
  FOREIGN KEY (tenant_id, action_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (conditions IS NULL OR char_length(btrim(conditions)) BETWEEN 1 AND 4000),
  CHECK (comments IS NULL OR char_length(btrim(comments)) BETWEEN 1 AND 4000),
  CHECK (jsonb_typeof(current_gate_facts) = 'object'),
  CHECK (
    (action = 'APPROVE_WITH_CONDITIONS' AND conditions IS NOT NULL)
    OR (action <> 'APPROVE_WITH_CONDITIONS')
  )
);

CREATE TABLE IF NOT EXISTS procurement.award_recommendation (
  recommendation_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  recommendation_number text,
  numbering_scope_key text,
  project_id uuid NOT NULL,
  rfq_issue_id uuid NOT NULL,
  comparison_snapshot_id uuid NOT NULL,
  supersedes_recommendation_id uuid,
  approval_case_id uuid,
  status text NOT NULL DEFAULT 'DRAFT' CHECK (
    status IN ('DRAFT','READY_FOR_APPROVAL','SUBMITTED','RETURNED_FOR_REVISION','APPROVED','REJECTED','WITHDRAWN','SUPERSEDED')
  ),
  outcome text NOT NULL CHECK (outcome IN ('SINGLE_SUPPLIER','SPLIT_AWARD','SOLE_SOURCE','NO_AWARD','RETENDER')),
  technical_condition_state text NOT NULL CHECK (
    technical_condition_state IN ('CLEAR','CONDITIONAL','UNRESOLVED_BLOCKING','NOT_APPLICABLE')
  ),
  currency text CHECK (currency IS NULL OR currency ~ '^[A-Z]{3}$'),
  recommended_value numeric(24,6) CHECK (recommended_value IS NULL OR recommended_value >= 0),
  competition_invited integer CHECK (competition_invited IS NULL OR competition_invited >= 0),
  competition_valid_responses integer CHECK (competition_valid_responses IS NULL OR competition_valid_responses >= 0),
  competition_comparable_responses integer CHECK (competition_comparable_responses IS NULL OR competition_comparable_responses >= 0),
  competition_requirement integer NOT NULL DEFAULT 3 CHECK (competition_requirement > 0),
  competition_exception_reason text,
  rationale text NOT NULL CHECK (char_length(btrim(rationale)) BETWEEN 1 AND 8000),
  non_lowest_reason text,
  split_or_sole_source_reason text,
  budget_basis_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  technical_dependency_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  eligibility_basis_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  supplier_intelligence_basis_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  risks_deviations jsonb NOT NULL DEFAULT '[]'::jsonb,
  prepared_by uuid,
  prepared_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  submitted_at timestamptz,
  resolved_at timestamptz,
  UNIQUE (tenant_id, recommendation_id),
  UNIQUE (tenant_id, recommendation_number),
  FOREIGN KEY (tenant_id, project_id)
    REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, rfq_issue_id)
    REFERENCES procurement.rfq_tender_issue(tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, supersedes_recommendation_id)
    REFERENCES procurement.award_recommendation(tenant_id, recommendation_id),
  FOREIGN KEY (tenant_id, approval_case_id)
    REFERENCES platform.approval_case(tenant_id, approval_case_id),
  FOREIGN KEY (tenant_id, prepared_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, created_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (competition_exception_reason IS NULL OR char_length(btrim(competition_exception_reason)) BETWEEN 1 AND 4000),
  CHECK (non_lowest_reason IS NULL OR char_length(btrim(non_lowest_reason)) BETWEEN 1 AND 4000),
  CHECK (split_or_sole_source_reason IS NULL OR char_length(btrim(split_or_sole_source_reason)) BETWEEN 1 AND 4000),
  CHECK (jsonb_typeof(budget_basis_refs) = 'array'),
  CHECK (jsonb_typeof(technical_dependency_refs) = 'array'),
  CHECK (jsonb_typeof(eligibility_basis_refs) = 'array'),
  CHECK (jsonb_typeof(supplier_intelligence_basis_refs) = 'array'),
  CHECK (jsonb_typeof(risks_deviations) = 'array'),
  CHECK (
    (status = 'DRAFT' AND recommendation_number IS NULL AND prepared_by IS NULL AND prepared_at IS NULL AND submitted_at IS NULL)
    OR (status <> 'DRAFT' AND recommendation_number IS NOT NULL AND prepared_by IS NOT NULL AND prepared_at IS NOT NULL AND submitted_at IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS procurement.award_recommendation_selection (
  recommendation_selection_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  recommendation_id uuid NOT NULL,
  snapshot_confirmed_basis_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  confirmed_basis_id uuid NOT NULL,
  confirmed_amount numeric(24,6) NOT NULL CHECK (confirmed_amount >= 0),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  scope_partition_note text,
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, recommendation_selection_id),
  UNIQUE (tenant_id, recommendation_id, comparison_row_id),
  UNIQUE (tenant_id, recommendation_id, snapshot_confirmed_basis_id),
  FOREIGN KEY (tenant_id, recommendation_id)
    REFERENCES procurement.award_recommendation(tenant_id, recommendation_id),
  FOREIGN KEY (tenant_id, snapshot_confirmed_basis_id)
    REFERENCES procurement.bid_comparison_snapshot_confirmed_basis(tenant_id, snapshot_confirmed_basis_id),
  FOREIGN KEY (tenant_id, supplier_id)
    REFERENCES procurement.supplier(tenant_id, supplier_id),
  FOREIGN KEY (tenant_id, confirmed_basis_id)
    REFERENCES procurement.bid_comparison_confirmed_basis(tenant_id, confirmed_basis_id),
  FOREIGN KEY (tenant_id, recorded_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (scope_partition_note IS NULL OR char_length(btrim(scope_partition_note)) BETWEEN 1 AND 2000)
);

CREATE TABLE IF NOT EXISTS procurement.award_recommendation_route_basis (
  recommendation_route_basis_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  recommendation_id uuid NOT NULL,
  route_decision_id uuid NOT NULL,
  mr_line_id uuid NOT NULL,
  policy_key text NOT NULL,
  policy_version integer NOT NULL,
  route text NOT NULL,
  justification text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, recommendation_route_basis_id),
  UNIQUE (tenant_id, recommendation_id, mr_line_id),
  UNIQUE (tenant_id, recommendation_id, route_decision_id),
  FOREIGN KEY (tenant_id, recommendation_id)
    REFERENCES procurement.award_recommendation(tenant_id, recommendation_id),
  FOREIGN KEY (tenant_id, route_decision_id)
    REFERENCES procurement.procurement_route_decision(tenant_id, route_decision_id),
  FOREIGN KEY (tenant_id, mr_line_id)
    REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id)
);

CREATE TABLE IF NOT EXISTS procurement.award_decision (
  award_decision_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  award_number text NOT NULL,
  numbering_scope_key text NOT NULL,
  recommendation_id uuid NOT NULL,
  approval_case_id uuid NOT NULL,
  project_id uuid NOT NULL,
  comparison_snapshot_id uuid NOT NULL,
  award_type text NOT NULL CHECK (award_type IN ('FULL','SPLIT','CONDITIONAL','NO_AWARD')),
  status text NOT NULL DEFAULT 'RECORDED' CHECK (
    status IN ('DRAFT','RECORDED','EFFECTIVE_FOR_HANDOFF','REVOKED','SUPERSEDED','CANCELLED')
  ),
  decision_justification text NOT NULL CHECK (char_length(btrim(decision_justification)) BETWEEN 1 AND 8000),
  transition_gate_facts jsonb NOT NULL,
  decision_by uuid NOT NULL,
  decision_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  effective_for_handoff_by uuid,
  effective_for_handoff_at timestamptz,
  UNIQUE (tenant_id, award_decision_id),
  UNIQUE (tenant_id, award_number),
  UNIQUE (tenant_id, recommendation_id),
  FOREIGN KEY (tenant_id, recommendation_id)
    REFERENCES procurement.award_recommendation(tenant_id, recommendation_id),
  FOREIGN KEY (tenant_id, approval_case_id)
    REFERENCES platform.approval_case(tenant_id, approval_case_id),
  FOREIGN KEY (tenant_id, project_id)
    REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, comparison_snapshot_id)
    REFERENCES procurement.bid_comparison_snapshot(tenant_id, comparison_snapshot_id),
  FOREIGN KEY (tenant_id, decision_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, effective_for_handoff_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (jsonb_typeof(transition_gate_facts) = 'object'),
  CHECK (
    (status = 'EFFECTIVE_FOR_HANDOFF' AND effective_for_handoff_by IS NOT NULL AND effective_for_handoff_at IS NOT NULL)
    OR (status <> 'EFFECTIVE_FOR_HANDOFF' AND effective_for_handoff_at IS NULL)
  )
);

CREATE TABLE IF NOT EXISTS procurement.award_decision_supplier_basis (
  award_supplier_basis_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  award_decision_id uuid NOT NULL,
  recommendation_selection_id uuid NOT NULL,
  snapshot_confirmed_basis_id uuid NOT NULL,
  comparison_row_id uuid NOT NULL,
  comparison_bidder_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  confirmed_basis_id uuid NOT NULL,
  confirmed_amount numeric(24,6) NOT NULL,
  currency text NOT NULL,
  scope_partition_note text,
  UNIQUE (tenant_id, award_supplier_basis_id),
  UNIQUE (tenant_id, award_decision_id, comparison_row_id),
  FOREIGN KEY (tenant_id, award_decision_id)
    REFERENCES procurement.award_decision(tenant_id, award_decision_id),
  FOREIGN KEY (tenant_id, recommendation_selection_id)
    REFERENCES procurement.award_recommendation_selection(tenant_id, recommendation_selection_id),
  FOREIGN KEY (tenant_id, snapshot_confirmed_basis_id)
    REFERENCES procurement.bid_comparison_snapshot_confirmed_basis(tenant_id, snapshot_confirmed_basis_id),
  FOREIGN KEY (tenant_id, supplier_id)
    REFERENCES procurement.supplier(tenant_id, supplier_id),
  FOREIGN KEY (tenant_id, confirmed_basis_id)
    REFERENCES procurement.bid_comparison_confirmed_basis(tenant_id, confirmed_basis_id)
);

CREATE TABLE IF NOT EXISTS procurement.award_decision_route_basis (
  award_route_basis_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  award_decision_id uuid NOT NULL,
  route_decision_id uuid NOT NULL,
  mr_line_id uuid NOT NULL,
  policy_key text NOT NULL,
  policy_version integer NOT NULL,
  route text NOT NULL,
  justification text NOT NULL,
  UNIQUE (tenant_id, award_route_basis_id),
  UNIQUE (tenant_id, award_decision_id, mr_line_id),
  FOREIGN KEY (tenant_id, award_decision_id)
    REFERENCES procurement.award_decision(tenant_id, award_decision_id),
  FOREIGN KEY (tenant_id, route_decision_id)
    REFERENCES procurement.procurement_route_decision(tenant_id, route_decision_id),
  FOREIGN KEY (tenant_id, mr_line_id)
    REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id)
);

CREATE TABLE IF NOT EXISTS procurement.award_decision_condition (
  award_condition_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  award_decision_id uuid NOT NULL,
  condition_no integer NOT NULL CHECK (condition_no > 0),
  condition_text text NOT NULL CHECK (char_length(btrim(condition_text)) BETWEEN 1 AND 4000),
  source_approval_action_occurrence_id uuid NOT NULL,
  UNIQUE (tenant_id, award_condition_id),
  UNIQUE (tenant_id, award_decision_id, condition_no),
  FOREIGN KEY (tenant_id, award_decision_id)
    REFERENCES procurement.award_decision(tenant_id, award_decision_id),
  FOREIGN KEY (tenant_id, source_approval_action_occurrence_id)
    REFERENCES platform.approval_action_occurrence(tenant_id, approval_action_occurrence_id)
);

CREATE TABLE IF NOT EXISTS procurement.award_condition_satisfaction_occurrence (
  award_condition_satisfaction_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  award_condition_id uuid NOT NULL,
  evidence_refs jsonb NOT NULL,
  satisfied_by uuid NOT NULL,
  satisfied_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, award_condition_satisfaction_id),
  UNIQUE (tenant_id, award_condition_id),
  FOREIGN KEY (tenant_id, award_condition_id)
    REFERENCES procurement.award_decision_condition(tenant_id, award_condition_id),
  FOREIGN KEY (tenant_id, satisfied_by)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (jsonb_typeof(evidence_refs) = 'array'),
  CHECK (jsonb_array_length(evidence_refs) > 0)
);

CREATE OR REPLACE FUNCTION procurement.require_r07_sourcing_actor()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
BEGIN
  IF nullif(current_setting('cpos.tenant_id', true), '') IS NULL
     OR nullif(current_setting('cpos.principal_id', true), '') IS NULL THEN
    RAISE EXCEPTION 'R07 transition requires tenant and principal execution context' USING ERRCODE = '42501';
  END IF;
  IF NOT platform.current_tenant_has_active_product_access() THEN
    RAISE EXCEPTION 'R07 transition requires active product access' USING ERRCODE = '42501';
  END IF;
  IF NOT (
    platform.current_principal_has_active_tenant_role('OWNER')
    OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
    OR platform.current_principal_has_active_tenant_role('BUYER')
  ) THEN
    RAISE EXCEPTION 'R07 transition requires sourcing authority' USING ERRCODE = '42501';
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION procurement.create_award_recommendation(
  p_comparison_snapshot_id uuid,
  p_outcome text,
  p_technical_condition_state text,
  p_rationale text,
  p_non_lowest_reason text DEFAULT NULL,
  p_split_or_sole_source_reason text DEFAULT NULL,
  p_competition_exception_reason text DEFAULT NULL,
  p_budget_basis_refs jsonb DEFAULT '[]'::jsonb,
  p_technical_dependency_refs jsonb DEFAULT '[]'::jsonb,
  p_eligibility_basis_refs jsonb DEFAULT '[]'::jsonb,
  p_supplier_intelligence_basis_refs jsonb DEFAULT '[]'::jsonb,
  p_risks_deviations jsonb DEFAULT '[]'::jsonb,
  p_supersedes_recommendation_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_snapshot procurement.bid_comparison_snapshot%ROWTYPE;
  v_recommendation_id uuid;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_snapshot
  FROM procurement.bid_comparison_snapshot
  WHERE tenant_id = v_tenant_id
    AND comparison_snapshot_id = p_comparison_snapshot_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'recommendation requires a visible frozen ComparisonSnapshot' USING ERRCODE = '23503';
  END IF;

  IF p_outcome NOT IN ('SINGLE_SUPPLIER','SPLIT_AWARD','SOLE_SOURCE','NO_AWARD','RETENDER') THEN
    RAISE EXCEPTION 'invalid recommendation outcome' USING ERRCODE = '23514';
  END IF;
  IF p_technical_condition_state NOT IN ('CLEAR','CONDITIONAL','UNRESOLVED_BLOCKING','NOT_APPLICABLE') THEN
    RAISE EXCEPTION 'invalid technical condition state' USING ERRCODE = '23514';
  END IF;
  IF char_length(btrim(coalesce(p_rationale, ''))) < 1 THEN
    RAISE EXCEPTION 'recommendation rationale is required' USING ERRCODE = '23514';
  END IF;
  IF jsonb_typeof(p_budget_basis_refs) <> 'array'
     OR jsonb_typeof(p_technical_dependency_refs) <> 'array'
     OR jsonb_typeof(p_eligibility_basis_refs) <> 'array'
     OR jsonb_typeof(p_supplier_intelligence_basis_refs) <> 'array'
     OR jsonb_typeof(p_risks_deviations) <> 'array' THEN
    RAISE EXCEPTION 'recommendation source-reference fields must be arrays' USING ERRCODE = '23514';
  END IF;

  IF p_supersedes_recommendation_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM procurement.award_recommendation prior
    WHERE prior.tenant_id = v_tenant_id
      AND prior.recommendation_id = p_supersedes_recommendation_id
      AND prior.status IN ('RETURNED_FOR_REVISION','REJECTED','WITHDRAWN')
  ) THEN
    RAISE EXCEPTION 'superseded recommendation is not an eligible prior decision version' USING ERRCODE = '23514';
  END IF;

  INSERT INTO procurement.award_recommendation (
    tenant_id, project_id, rfq_issue_id, comparison_snapshot_id,
    supersedes_recommendation_id, outcome, technical_condition_state,
    rationale, non_lowest_reason, split_or_sole_source_reason,
    competition_exception_reason, budget_basis_refs, technical_dependency_refs,
    eligibility_basis_refs, supplier_intelligence_basis_refs, risks_deviations,
    created_by
  ) VALUES (
    v_tenant_id, v_snapshot.project_id, v_snapshot.rfq_issue_id, v_snapshot.comparison_snapshot_id,
    p_supersedes_recommendation_id, p_outcome, p_technical_condition_state,
    btrim(p_rationale), nullif(btrim(p_non_lowest_reason), ''), nullif(btrim(p_split_or_sole_source_reason), ''),
    nullif(btrim(p_competition_exception_reason), ''), p_budget_basis_refs, p_technical_dependency_refs,
    p_eligibility_basis_refs, p_supplier_intelligence_basis_refs, p_risks_deviations,
    v_actor_id
  ) RETURNING recommendation_id INTO v_recommendation_id;

  RETURN v_recommendation_id;
END
$$;

CREATE OR REPLACE FUNCTION procurement.add_award_recommendation_basis(
  p_recommendation_id uuid,
  p_snapshot_confirmed_basis_id uuid,
  p_scope_partition_note text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_recommendation procurement.award_recommendation%ROWTYPE;
  v_selection_id uuid;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_recommendation
  FROM procurement.award_recommendation
  WHERE tenant_id = v_tenant_id AND recommendation_id = p_recommendation_id
  FOR UPDATE;
  IF NOT FOUND OR v_recommendation.status <> 'DRAFT' THEN
    RAISE EXCEPTION 'recommendation basis can only be added to a visible DRAFT recommendation' USING ERRCODE = '55000';
  END IF;
  IF v_recommendation.outcome IN ('NO_AWARD','RETENDER') THEN
    RAISE EXCEPTION 'NO_AWARD/RETENDER recommendation cannot contain supplier award basis' USING ERRCODE = '23514';
  END IF;

  INSERT INTO procurement.award_recommendation_selection (
    tenant_id, recommendation_id, snapshot_confirmed_basis_id,
    comparison_row_id, comparison_bidder_id, supplier_id, confirmed_basis_id,
    confirmed_amount, currency, scope_partition_note, recorded_by
  )
  SELECT
    v_tenant_id,
    v_recommendation.recommendation_id,
    cb.snapshot_confirmed_basis_id,
    cb.comparison_row_id,
    cb.comparison_bidder_id,
    sb.supplier_id,
    cb.confirmed_basis_id,
    cb.confirmed_amount,
    cb.currency,
    nullif(btrim(p_scope_partition_note), ''),
    v_actor_id
  FROM procurement.bid_comparison_snapshot_confirmed_basis cb
  JOIN procurement.bid_comparison_snapshot_bidder sb
    ON sb.tenant_id = cb.tenant_id
   AND sb.comparison_snapshot_id = cb.comparison_snapshot_id
   AND sb.comparison_bidder_id = cb.comparison_bidder_id
  WHERE cb.tenant_id = v_tenant_id
    AND cb.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
    AND cb.snapshot_confirmed_basis_id = p_snapshot_confirmed_basis_id
  RETURNING recommendation_selection_id INTO v_selection_id;

  IF v_selection_id IS NULL THEN
    RAISE EXCEPTION 'selected supplier-confirmed basis does not belong to recommendation ComparisonSnapshot' USING ERRCODE = '23514';
  END IF;
  RETURN v_selection_id;
END
$$;

CREATE OR REPLACE FUNCTION procurement.remove_award_recommendation_basis(
  p_recommendation_id uuid,
  p_recommendation_selection_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();
  IF NOT EXISTS (
    SELECT 1 FROM procurement.award_recommendation r
    WHERE r.tenant_id = v_tenant_id
      AND r.recommendation_id = p_recommendation_id
      AND r.status = 'DRAFT'
  ) THEN
    RAISE EXCEPTION 'recommendation basis can only be removed from DRAFT' USING ERRCODE = '55000';
  END IF;
  DELETE FROM procurement.award_recommendation_selection
  WHERE tenant_id = v_tenant_id
    AND recommendation_id = p_recommendation_id
    AND recommendation_selection_id = p_recommendation_selection_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'recommendation selection is not visible' USING ERRCODE = '23503';
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION procurement.submit_award_recommendation(p_recommendation_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_recommendation procurement.award_recommendation%ROWTYPE;
  v_policy platform.approval_policy_version%ROWTYPE;
  v_required_rows integer;
  v_selected_required_rows integer;
  v_selection_count integer;
  v_supplier_count integer;
  v_currency_count integer;
  v_currency text;
  v_value numeric(24,6);
  v_invited integer;
  v_valid_responses integer;
  v_comparable_responses integer;
  v_route_required integer;
  v_route_recorded integer;
  v_recommendation_number text;
  v_scope_key text;
  v_approval_case_id uuid;
  v_submitted_at timestamptz := clock_timestamp();
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_recommendation
  FROM procurement.award_recommendation
  WHERE tenant_id = v_tenant_id AND recommendation_id = p_recommendation_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'recommendation is not visible' USING ERRCODE = '23503';
  END IF;
  IF v_recommendation.status <> 'DRAFT' THEN
    RAISE EXCEPTION 'only DRAFT recommendation can be submitted' USING ERRCODE = '55000';
  END IF;

  SELECT count(*)::int INTO v_required_rows
  FROM procurement.bid_comparison_snapshot_row r
  WHERE r.tenant_id = v_tenant_id
    AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
    AND r.row_kind = 'RFQ_LINE';

  SELECT count(*)::int,
         count(DISTINCT supplier_id)::int,
         count(DISTINCT currency)::int,
         min(currency),
         coalesce(sum(confirmed_amount), 0::numeric)
    INTO v_selection_count, v_supplier_count, v_currency_count, v_currency, v_value
  FROM procurement.award_recommendation_selection s
  WHERE s.tenant_id = v_tenant_id
    AND s.recommendation_id = v_recommendation.recommendation_id;

  SELECT count(*)::int INTO v_selected_required_rows
  FROM procurement.award_recommendation_selection s
  JOIN procurement.bid_comparison_snapshot_row r
    ON r.tenant_id = s.tenant_id
   AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
   AND r.comparison_row_id = s.comparison_row_id
  WHERE s.tenant_id = v_tenant_id
    AND s.recommendation_id = v_recommendation.recommendation_id
    AND r.row_kind = 'RFQ_LINE';

  IF v_recommendation.outcome IN ('NO_AWARD','RETENDER') THEN
    IF v_selection_count <> 0 THEN
      RAISE EXCEPTION 'NO_AWARD/RETENDER recommendation must not select supplier basis' USING ERRCODE = '23514';
    END IF;
    v_currency := (SELECT base_currency FROM procurement.bid_comparison_snapshot
                   WHERE tenant_id = v_tenant_id AND comparison_snapshot_id = v_recommendation.comparison_snapshot_id);
    v_value := 0;
  ELSE
    IF v_required_rows = 0 OR v_selected_required_rows <> v_required_rows THEN
      RAISE EXCEPTION 'award recommendation must cover every frozen RFQ requirement row exactly once' USING ERRCODE = '23514';
    END IF;
    IF v_currency_count <> 1 THEN
      RAISE EXCEPTION 'initial R07 award recommendation requires one exact supplier-confirmed currency' USING ERRCODE = '23514';
    END IF;
    IF v_recommendation.outcome IN ('SINGLE_SUPPLIER','SOLE_SOURCE') AND v_supplier_count <> 1 THEN
      RAISE EXCEPTION 'single/sole-source outcome requires exactly one recommended supplier' USING ERRCODE = '23514';
    END IF;
    IF v_recommendation.outcome = 'SPLIT_AWARD' AND v_supplier_count < 2 THEN
      RAISE EXCEPTION 'split award requires at least two recommended suppliers' USING ERRCODE = '23514';
    END IF;
    IF EXISTS (
      SELECT 1
      FROM procurement.award_recommendation_selection s
      JOIN procurement.supplier sup
        ON sup.tenant_id = s.tenant_id AND sup.supplier_id = s.supplier_id
      WHERE s.tenant_id = v_tenant_id
        AND s.recommendation_id = v_recommendation.recommendation_id
        AND sup.supplier_state <> 'ACTIVE'
    ) THEN
      RAISE EXCEPTION 'recommended supplier is not currently ACTIVE' USING ERRCODE = '23514';
    END IF;
    IF EXISTS (
      SELECT 1
      FROM procurement.award_recommendation_selection s
      JOIN procurement.bid_comparison_snapshot_bidder b
        ON b.tenant_id = s.tenant_id
       AND b.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
       AND b.comparison_bidder_id = s.comparison_bidder_id
      WHERE s.tenant_id = v_tenant_id
        AND s.recommendation_id = v_recommendation.recommendation_id
        AND b.validity_until IS NOT NULL
        AND b.validity_until < (statement_timestamp() AT TIME ZONE 'Asia/Dubai')::date
    ) THEN
      RAISE EXCEPTION 'recommended supplier quotation validity has expired' USING ERRCODE = '23514';
    END IF;
  END IF;

  IF v_recommendation.outcome IN ('SPLIT_AWARD','SOLE_SOURCE')
     AND v_recommendation.split_or_sole_source_reason IS NULL THEN
    RAISE EXCEPTION 'split/sole-source outcome requires explicit justification' USING ERRCODE = '23514';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM procurement.award_recommendation_selection chosen
    JOIN procurement.bid_comparison_snapshot_confirmed_basis alternate
      ON alternate.tenant_id = chosen.tenant_id
     AND alternate.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
     AND alternate.comparison_row_id = chosen.comparison_row_id
     AND alternate.currency = chosen.currency
     AND alternate.confirmed_amount < chosen.confirmed_amount
    WHERE chosen.tenant_id = v_tenant_id
      AND chosen.recommendation_id = v_recommendation.recommendation_id
  ) AND v_recommendation.non_lowest_reason IS NULL THEN
    RAISE EXCEPTION 'non-lowest selected supplier-confirmed basis requires explicit reason' USING ERRCODE = '23514';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM procurement.bid_comparison_snapshot_row r
    LEFT JOIN procurement.rfq_tender_issue_line il
      ON il.tenant_id = r.tenant_id AND il.rfq_issue_line_id = r.rfq_issue_line_id
    WHERE r.tenant_id = v_tenant_id
      AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
      AND r.row_kind = 'RFQ_LINE'
      AND il.mr_line_id IS NULL
  ) THEN
    RAISE EXCEPTION 'recommendation route authority requires every frozen RFQ row to retain MR-line authority' USING ERRCODE = '23514';
  END IF;

  SELECT count(DISTINCT il.mr_line_id)::int INTO v_route_required
  FROM procurement.bid_comparison_snapshot_row r
  JOIN procurement.rfq_tender_issue_line il
    ON il.tenant_id = r.tenant_id AND il.rfq_issue_line_id = r.rfq_issue_line_id
  WHERE r.tenant_id = v_tenant_id
    AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
    AND r.row_kind = 'RFQ_LINE';

  INSERT INTO procurement.award_recommendation_route_basis (
    tenant_id, recommendation_id, route_decision_id, mr_line_id,
    policy_key, policy_version, route, justification
  )
  SELECT DISTINCT ON (rd.mr_line_id)
    v_tenant_id, v_recommendation.recommendation_id, rd.route_decision_id, rd.mr_line_id,
    rd.policy_key, rd.policy_version, rd.route, rd.justification
  FROM procurement.bid_comparison_snapshot_row r
  JOIN procurement.rfq_tender_issue_line il
    ON il.tenant_id = r.tenant_id AND il.rfq_issue_line_id = r.rfq_issue_line_id
  JOIN procurement.procurement_route_decision rd
    ON rd.tenant_id = il.tenant_id AND rd.mr_line_id = il.mr_line_id AND rd.is_current
  WHERE r.tenant_id = v_tenant_id
    AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
    AND r.row_kind = 'RFQ_LINE'
  ORDER BY rd.mr_line_id, rd.decided_at DESC, rd.route_decision_id DESC;

  GET DIAGNOSTICS v_route_recorded = ROW_COUNT;
  IF v_route_recorded <> v_route_required THEN
    RAISE EXCEPTION 'recommendation requires one current exact ProcurementRouteDecision for every MR line' USING ERRCODE = '23514';
  END IF;

  SELECT count(*)::int INTO v_invited
  FROM procurement.rfq_tender_issue_bidder ib
  WHERE ib.tenant_id = v_tenant_id AND ib.rfq_issue_id = v_recommendation.rfq_issue_id;

  SELECT count(*)::int INTO v_valid_responses
  FROM procurement.rfq_tender_issue_bidder ib
  WHERE ib.tenant_id = v_tenant_id
    AND ib.rfq_issue_id = v_recommendation.rfq_issue_id
    AND EXISTS (
      SELECT 1
      FROM procurement.supplier_quotation_revision q
      WHERE q.tenant_id = ib.tenant_id
        AND q.rfq_issue_bidder_id = ib.rfq_issue_bidder_id
        AND q.revision_no = (
          SELECT max(q2.revision_no)
          FROM procurement.supplier_quotation_revision q2
          WHERE q2.tenant_id = q.tenant_id AND q2.rfq_issue_bidder_id = q.rfq_issue_bidder_id
        )
        AND q.response_status IN ('RECEIVED','FINAL')
    );

  SELECT count(*)::int INTO v_comparable_responses
  FROM procurement.bid_comparison_snapshot_bidder b
  WHERE b.tenant_id = v_tenant_id
    AND b.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
    AND NOT EXISTS (
      SELECT 1
      FROM procurement.bid_comparison_snapshot_row r
      LEFT JOIN procurement.bid_comparison_snapshot_cell c
        ON c.tenant_id = r.tenant_id
       AND c.comparison_snapshot_id = r.comparison_snapshot_id
       AND c.comparison_row_id = r.comparison_row_id
       AND c.comparison_bidder_id = b.comparison_bidder_id
      LEFT JOIN procurement.bid_comparison_snapshot_confirmed_basis cb
        ON cb.tenant_id = r.tenant_id
       AND cb.comparison_snapshot_id = r.comparison_snapshot_id
       AND cb.comparison_row_id = r.comparison_row_id
       AND cb.comparison_bidder_id = b.comparison_bidder_id
      WHERE r.tenant_id = v_tenant_id
        AND r.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
        AND r.row_kind = 'RFQ_LINE'
        AND (
          c.snapshot_cell_id IS NULL
          OR c.coverage_status IN ('MISSING','NOT_APPLICABLE','UNRESOLVED')
          OR cb.snapshot_confirmed_basis_id IS NULL
        )
    );

  IF (
    v_comparable_responses < v_recommendation.competition_requirement
    OR v_recommendation.outcome = 'SOLE_SOURCE'
    OR EXISTS (
      SELECT 1 FROM procurement.award_recommendation_route_basis rb
      WHERE rb.tenant_id = v_tenant_id
        AND rb.recommendation_id = v_recommendation.recommendation_id
        AND rb.route <> 'COMPETITIVE_RFQ'
    )
  ) AND v_recommendation.competition_exception_reason IS NULL THEN
    RAISE EXCEPTION 'under-competition/direct/sole-source path requires explicit competition exception justification' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO v_policy
  FROM platform.approval_policy_version
  WHERE policy_key = 'UAE_CONTRACTOR_PROCUREMENT_DOA_STARTER'
    AND version = 1
    AND subject_type = 'PROCUREMENT_RECOMMENDATION'
    AND effective_period @> statement_timestamp();
  IF NOT FOUND THEN
    RAISE EXCEPTION 'effective procurement approval policy is unavailable' USING ERRCODE = '23503';
  END IF;

  v_recommendation_number := procurement.allocate_project_business_number('RECOMMENDATION', v_recommendation.project_id);
  v_scope_key := v_recommendation.project_id::text || ':' || to_char(statement_timestamp() AT TIME ZONE 'Asia/Dubai', 'YYYY');

  INSERT INTO platform.approval_case (
    tenant_id, subject_type, subject_id, case_version,
    approval_policy_key, approval_policy_version, status,
    monetary_basis, monetary_currency, scope_basis,
    required_approvers, ball_in_court, required_evidence, created_by
  ) VALUES (
    v_tenant_id, 'PROCUREMENT_RECOMMENDATION', v_recommendation.recommendation_id, 1,
    v_policy.policy_key, v_policy.version, 'PENDING',
    v_value, v_currency,
    jsonb_build_object(
      'project_id', v_recommendation.project_id,
      'rfq_issue_id', v_recommendation.rfq_issue_id,
      'comparison_snapshot_id', v_recommendation.comparison_snapshot_id
    ),
    jsonb_build_array(jsonb_build_object('role_key', v_policy.required_role_key)),
    jsonb_build_array(jsonb_build_object('role_key', v_policy.required_role_key)),
    v_policy.required_evidence,
    v_actor_id
  ) RETURNING approval_case_id INTO v_approval_case_id;

  UPDATE procurement.award_recommendation
  SET recommendation_number = v_recommendation_number,
      numbering_scope_key = v_scope_key,
      status = 'SUBMITTED',
      currency = v_currency,
      recommended_value = v_value,
      competition_invited = v_invited,
      competition_valid_responses = v_valid_responses,
      competition_comparable_responses = v_comparable_responses,
      prepared_by = v_actor_id,
      prepared_at = v_submitted_at,
      submitted_at = v_submitted_at,
      approval_case_id = v_approval_case_id
  WHERE tenant_id = v_tenant_id AND recommendation_id = v_recommendation.recommendation_id;

  RETURN v_approval_case_id;
END
$$;

CREATE OR REPLACE FUNCTION procurement.revalidate_award_recommendation(p_recommendation_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_recommendation procurement.award_recommendation%ROWTYPE;
  v_route_count integer;
  v_supplier_count integer;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_recommendation
  FROM procurement.award_recommendation
  WHERE tenant_id = v_tenant_id AND recommendation_id = p_recommendation_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'recommendation is not visible for revalidation' USING ERRCODE = '23503';
  END IF;

  SELECT count(*)::int INTO v_route_count
  FROM procurement.award_recommendation_route_basis rb
  JOIN procurement.procurement_route_decision rd
    ON rd.tenant_id = rb.tenant_id
   AND rd.route_decision_id = rb.route_decision_id
   AND rd.mr_line_id = rb.mr_line_id
   AND rd.policy_key = rb.policy_key
   AND rd.policy_version = rb.policy_version
   AND rd.route = rb.route
   AND rd.is_current
  WHERE rb.tenant_id = v_tenant_id
    AND rb.recommendation_id = v_recommendation.recommendation_id;

  IF v_route_count <> (
    SELECT count(*) FROM procurement.award_recommendation_route_basis rb
    WHERE rb.tenant_id = v_tenant_id AND rb.recommendation_id = v_recommendation.recommendation_id
  ) THEN
    RAISE EXCEPTION 'current ProcurementRouteDecision no longer matches submitted recommendation basis' USING ERRCODE = '23514';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM procurement.award_recommendation_selection s
    JOIN procurement.supplier sup
      ON sup.tenant_id = s.tenant_id AND sup.supplier_id = s.supplier_id
    WHERE s.tenant_id = v_tenant_id
      AND s.recommendation_id = v_recommendation.recommendation_id
      AND sup.supplier_state <> 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'recommended supplier is no longer ACTIVE' USING ERRCODE = '23514';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM procurement.award_recommendation_selection s
    JOIN procurement.bid_comparison_snapshot_bidder b
      ON b.tenant_id = s.tenant_id
     AND b.comparison_snapshot_id = v_recommendation.comparison_snapshot_id
     AND b.comparison_bidder_id = s.comparison_bidder_id
    WHERE s.tenant_id = v_tenant_id
      AND s.recommendation_id = v_recommendation.recommendation_id
      AND b.validity_until IS NOT NULL
      AND b.validity_until < (statement_timestamp() AT TIME ZONE 'Asia/Dubai')::date
  ) THEN
    RAISE EXCEPTION 'recommended quotation validity expired after recommendation submission' USING ERRCODE = '23514';
  END IF;

  IF v_recommendation.technical_condition_state = 'UNRESOLVED_BLOCKING' THEN
    RAISE EXCEPTION 'technical condition is unresolved and blocking final approval/award' USING ERRCODE = '23514';
  END IF;

  SELECT count(DISTINCT supplier_id)::int INTO v_supplier_count
  FROM procurement.award_recommendation_selection
  WHERE tenant_id = v_tenant_id AND recommendation_id = v_recommendation.recommendation_id;

  RETURN jsonb_build_object(
    'checked_at', clock_timestamp(),
    'recommendation_id', v_recommendation.recommendation_id,
    'route_basis_count', v_route_count,
    'supplier_count', v_supplier_count,
    'technical_condition_state', v_recommendation.technical_condition_state,
    'competition', jsonb_build_object(
      'invited', v_recommendation.competition_invited,
      'valid_responses', v_recommendation.competition_valid_responses,
      'comparable_responses', v_recommendation.competition_comparable_responses,
      'requirement', v_recommendation.competition_requirement,
      'exception', v_recommendation.competition_exception_reason
    )
  );
END
$$;

CREATE OR REPLACE FUNCTION procurement.act_on_procurement_approval(
  p_approval_case_id uuid,
  p_action text,
  p_conditions text DEFAULT NULL,
  p_comments text DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_case platform.approval_case%ROWTYPE;
  v_policy platform.approval_policy_version%ROWTYPE;
  v_recommendation procurement.award_recommendation%ROWTYPE;
  v_gate_facts jsonb;
  v_case_status text;
  v_recommendation_status text;
  v_action_at timestamptz := clock_timestamp();
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_case
  FROM platform.approval_case
  WHERE tenant_id = v_tenant_id AND approval_case_id = p_approval_case_id
  FOR UPDATE;
  IF NOT FOUND OR v_case.subject_type <> 'PROCUREMENT_RECOMMENDATION' THEN
    RAISE EXCEPTION 'procurement approval case is not visible' USING ERRCODE = '23503';
  END IF;
  IF v_case.status <> 'PENDING' THEN
    RAISE EXCEPTION 'approval action requires PENDING case' USING ERRCODE = '55000';
  END IF;

  SELECT * INTO v_policy
  FROM platform.approval_policy_version
  WHERE policy_key = v_case.approval_policy_key AND version = v_case.approval_policy_version;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'approval policy version is unavailable' USING ERRCODE = '23503';
  END IF;
  IF NOT platform.current_principal_has_active_tenant_role(v_policy.required_role_key) THEN
    RAISE EXCEPTION 'principal does not hold required approval role' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_recommendation
  FROM procurement.award_recommendation
  WHERE tenant_id = v_tenant_id AND recommendation_id = v_case.subject_id
  FOR UPDATE;
  IF NOT FOUND OR v_recommendation.status <> 'SUBMITTED' THEN
    RAISE EXCEPTION 'approval subject is not a submitted recommendation' USING ERRCODE = '55000';
  END IF;

  IF p_action NOT IN ('APPROVE','APPROVE_WITH_CONDITIONS','REJECT','RETURN_FOR_REVISION') THEN
    RAISE EXCEPTION 'invalid approval action' USING ERRCODE = '23514';
  END IF;
  IF p_action = 'APPROVE_WITH_CONDITIONS' THEN
    IF NOT v_policy.allow_conditional THEN
      RAISE EXCEPTION 'approval policy does not allow conditional approval' USING ERRCODE = '23514';
    END IF;
    IF char_length(btrim(coalesce(p_conditions, ''))) < 1 THEN
      RAISE EXCEPTION 'conditional approval requires conditions' USING ERRCODE = '23514';
    END IF;
  END IF;

  IF p_action IN ('APPROVE','APPROVE_WITH_CONDITIONS') THEN
    v_gate_facts := procurement.revalidate_award_recommendation(v_recommendation.recommendation_id);
    IF p_action = 'APPROVE' AND v_recommendation.technical_condition_state = 'CONDITIONAL' THEN
      RAISE EXCEPTION 'conditional technical state requires APPROVE_WITH_CONDITIONS' USING ERRCODE = '23514';
    END IF;
  ELSE
    v_gate_facts := jsonb_build_object(
      'checked_at', v_action_at,
      'recommendation_id', v_recommendation.recommendation_id,
      'transition', p_action,
      'final_gate_revalidation_required', false
    );
  END IF;

  v_case_status := CASE p_action
    WHEN 'APPROVE' THEN 'APPROVED'
    WHEN 'APPROVE_WITH_CONDITIONS' THEN 'CONDITIONALLY_APPROVED'
    WHEN 'REJECT' THEN 'REJECTED'
    WHEN 'RETURN_FOR_REVISION' THEN 'RETURNED'
  END;
  v_recommendation_status := CASE p_action
    WHEN 'APPROVE' THEN 'APPROVED'
    WHEN 'APPROVE_WITH_CONDITIONS' THEN 'APPROVED'
    WHEN 'REJECT' THEN 'REJECTED'
    WHEN 'RETURN_FOR_REVISION' THEN 'RETURNED_FOR_REVISION'
  END;

  INSERT INTO platform.approval_action_occurrence (
    tenant_id, approval_case_id, sequence, action, conditions, comments,
    current_gate_facts, action_by, action_at
  ) VALUES (
    v_tenant_id, v_case.approval_case_id, 1, p_action,
    CASE WHEN p_action = 'APPROVE_WITH_CONDITIONS' THEN btrim(p_conditions) ELSE NULL END,
    nullif(btrim(p_comments), ''), v_gate_facts, v_actor_id, v_action_at
  );

  UPDATE platform.approval_case
  SET status = v_case_status,
      ball_in_court = '[]'::jsonb,
      resolved_at = v_action_at
  WHERE tenant_id = v_tenant_id AND approval_case_id = v_case.approval_case_id;

  UPDATE procurement.award_recommendation
  SET status = v_recommendation_status,
      resolved_at = CASE WHEN v_recommendation_status IN ('APPROVED','REJECTED') THEN v_action_at ELSE NULL END
  WHERE tenant_id = v_tenant_id AND recommendation_id = v_recommendation.recommendation_id;

  RETURN v_case_status;
END
$$;

CREATE OR REPLACE FUNCTION procurement.record_award_decision(
  p_recommendation_id uuid,
  p_decision_justification text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_recommendation procurement.award_recommendation%ROWTYPE;
  v_case platform.approval_case%ROWTYPE;
  v_policy platform.approval_policy_version%ROWTYPE;
  v_gate_facts jsonb;
  v_award_type text;
  v_award_number text;
  v_scope_key text;
  v_award_id uuid;
  v_condition_action_id uuid;
  v_condition_text text;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_recommendation
  FROM procurement.award_recommendation
  WHERE tenant_id = v_tenant_id AND recommendation_id = p_recommendation_id
  FOR UPDATE;
  IF NOT FOUND OR v_recommendation.status <> 'APPROVED' OR v_recommendation.approval_case_id IS NULL THEN
    RAISE EXCEPTION 'AwardDecision requires approved recommendation' USING ERRCODE = '55000';
  END IF;

  SELECT * INTO v_case
  FROM platform.approval_case
  WHERE tenant_id = v_tenant_id AND approval_case_id = v_recommendation.approval_case_id;
  IF NOT FOUND OR v_case.status NOT IN ('APPROVED','CONDITIONALLY_APPROVED') THEN
    RAISE EXCEPTION 'AwardDecision requires approved approval case' USING ERRCODE = '55000';
  END IF;

  SELECT * INTO v_policy
  FROM platform.approval_policy_version
  WHERE policy_key = v_case.approval_policy_key AND version = v_case.approval_policy_version;
  IF NOT platform.current_principal_has_active_tenant_role(v_policy.required_role_key) THEN
    RAISE EXCEPTION 'principal does not hold award decision authority' USING ERRCODE = '42501';
  END IF;

  v_gate_facts := procurement.revalidate_award_recommendation(v_recommendation.recommendation_id);
  v_award_type := CASE
    WHEN v_case.status = 'CONDITIONALLY_APPROVED' THEN 'CONDITIONAL'
    WHEN v_recommendation.outcome = 'SPLIT_AWARD' THEN 'SPLIT'
    WHEN v_recommendation.outcome IN ('NO_AWARD','RETENDER') THEN 'NO_AWARD'
    ELSE 'FULL'
  END;

  v_award_number := procurement.allocate_project_business_number('AWARD', v_recommendation.project_id);
  v_scope_key := v_recommendation.project_id::text || ':' || to_char(statement_timestamp() AT TIME ZONE 'Asia/Dubai', 'YYYY');

  INSERT INTO procurement.award_decision (
    tenant_id, award_number, numbering_scope_key, recommendation_id, approval_case_id,
    project_id, comparison_snapshot_id, award_type, status,
    decision_justification, transition_gate_facts, decision_by
  ) VALUES (
    v_tenant_id, v_award_number, v_scope_key, v_recommendation.recommendation_id,
    v_case.approval_case_id, v_recommendation.project_id, v_recommendation.comparison_snapshot_id,
    v_award_type, 'RECORDED',
    coalesce(nullif(btrim(p_decision_justification), ''), v_recommendation.rationale),
    v_gate_facts, v_actor_id
  ) RETURNING award_decision_id INTO v_award_id;

  INSERT INTO procurement.award_decision_supplier_basis (
    tenant_id, award_decision_id, recommendation_selection_id, snapshot_confirmed_basis_id,
    comparison_row_id, comparison_bidder_id, supplier_id, confirmed_basis_id,
    confirmed_amount, currency, scope_partition_note
  )
  SELECT
    s.tenant_id, v_award_id, s.recommendation_selection_id, s.snapshot_confirmed_basis_id,
    s.comparison_row_id, s.comparison_bidder_id, s.supplier_id, s.confirmed_basis_id,
    s.confirmed_amount, s.currency, s.scope_partition_note
  FROM procurement.award_recommendation_selection s
  WHERE s.tenant_id = v_tenant_id AND s.recommendation_id = v_recommendation.recommendation_id;

  INSERT INTO procurement.award_decision_route_basis (
    tenant_id, award_decision_id, route_decision_id, mr_line_id,
    policy_key, policy_version, route, justification
  )
  SELECT
    rb.tenant_id, v_award_id, rb.route_decision_id, rb.mr_line_id,
    rb.policy_key, rb.policy_version, rb.route, rb.justification
  FROM procurement.award_recommendation_route_basis rb
  WHERE rb.tenant_id = v_tenant_id AND rb.recommendation_id = v_recommendation.recommendation_id;

  IF v_case.status = 'CONDITIONALLY_APPROVED' THEN
    SELECT ao.approval_action_occurrence_id, ao.conditions
      INTO v_condition_action_id, v_condition_text
    FROM platform.approval_action_occurrence ao
    WHERE ao.tenant_id = v_tenant_id
      AND ao.approval_case_id = v_case.approval_case_id
      AND ao.action = 'APPROVE_WITH_CONDITIONS'
    ORDER BY ao.sequence DESC
    LIMIT 1;

    IF v_condition_action_id IS NULL OR v_condition_text IS NULL THEN
      RAISE EXCEPTION 'conditional approval is missing immutable approval condition occurrence' USING ERRCODE = '23514';
    END IF;

    INSERT INTO procurement.award_decision_condition (
      tenant_id, award_decision_id, condition_no, condition_text,
      source_approval_action_occurrence_id
    ) VALUES (
      v_tenant_id, v_award_id, 1, v_condition_text, v_condition_action_id
    );
  END IF;

  RETURN v_award_id;
END
$$;

CREATE OR REPLACE FUNCTION procurement.satisfy_award_condition(
  p_award_decision_id uuid,
  p_award_condition_id uuid,
  p_evidence_refs jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_occurrence_id uuid;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();
  IF NOT (
    platform.current_principal_has_active_tenant_role('OWNER')
    OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
  ) THEN
    RAISE EXCEPTION 'award condition satisfaction requires OWNER or PROCUREMENT_MANAGER authority' USING ERRCODE = '42501';
  END IF;
  IF jsonb_typeof(p_evidence_refs) <> 'array' OR jsonb_array_length(p_evidence_refs) = 0 THEN
    RAISE EXCEPTION 'award condition satisfaction requires evidence references' USING ERRCODE = '23514';
  END IF;
  IF NOT EXISTS (
    SELECT 1
    FROM procurement.award_decision_condition c
    JOIN procurement.award_decision a
      ON a.tenant_id = c.tenant_id AND a.award_decision_id = c.award_decision_id
    WHERE c.tenant_id = v_tenant_id
      AND c.award_condition_id = p_award_condition_id
      AND c.award_decision_id = p_award_decision_id
      AND a.status = 'RECORDED'
  ) THEN
    RAISE EXCEPTION 'award condition is not open on a RECORDED AwardDecision' USING ERRCODE = '55000';
  END IF;

  INSERT INTO procurement.award_condition_satisfaction_occurrence (
    tenant_id, award_condition_id, evidence_refs, satisfied_by
  ) VALUES (
    v_tenant_id, p_award_condition_id, p_evidence_refs, v_actor_id
  ) RETURNING award_condition_satisfaction_id INTO v_occurrence_id;

  RETURN v_occurrence_id;
END
$$;

CREATE OR REPLACE FUNCTION procurement.make_award_effective_for_handoff(p_award_decision_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  v_tenant_id uuid := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_actor_id uuid := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  v_award procurement.award_decision%ROWTYPE;
  v_case platform.approval_case%ROWTYPE;
  v_policy platform.approval_policy_version%ROWTYPE;
  v_gate_facts jsonb;
BEGIN
  PERFORM procurement.require_r07_sourcing_actor();

  SELECT * INTO v_award
  FROM procurement.award_decision
  WHERE tenant_id = v_tenant_id AND award_decision_id = p_award_decision_id
  FOR UPDATE;
  IF NOT FOUND OR v_award.status <> 'RECORDED' THEN
    RAISE EXCEPTION 'handoff requires RECORDED AwardDecision' USING ERRCODE = '55000';
  END IF;

  SELECT * INTO v_case
  FROM platform.approval_case
  WHERE tenant_id = v_tenant_id AND approval_case_id = v_award.approval_case_id;
  SELECT * INTO v_policy
  FROM platform.approval_policy_version
  WHERE policy_key = v_case.approval_policy_key AND version = v_case.approval_policy_version;
  IF NOT platform.current_principal_has_active_tenant_role(v_policy.required_role_key) THEN
    RAISE EXCEPTION 'principal does not hold handoff authority' USING ERRCODE = '42501';
  END IF;

  v_gate_facts := procurement.revalidate_award_recommendation(v_award.recommendation_id);

  IF EXISTS (
    SELECT 1
    FROM procurement.award_decision_condition c
    LEFT JOIN procurement.award_condition_satisfaction_occurrence s
      ON s.tenant_id = c.tenant_id AND s.award_condition_id = c.award_condition_id
    WHERE c.tenant_id = v_tenant_id
      AND c.award_decision_id = v_award.award_decision_id
      AND s.award_condition_satisfaction_id IS NULL
  ) THEN
    RAISE EXCEPTION 'AwardDecision conditions must be satisfied before commitment handoff' USING ERRCODE = '23514';
  END IF;

  UPDATE procurement.award_decision
  SET status = 'EFFECTIVE_FOR_HANDOFF',
      transition_gate_facts = v_gate_facts,
      effective_for_handoff_by = v_actor_id,
      effective_for_handoff_at = clock_timestamp()
  WHERE tenant_id = v_tenant_id AND award_decision_id = v_award.award_decision_id;
END
$$;

-- Tenant read isolation. All R07 writes occur only through the security-definer transition functions above.
ALTER TABLE platform.approval_case ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.approval_case FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.approval_action_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.approval_action_occurrence FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation_selection ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation_selection FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation_route_basis ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_recommendation_route_basis FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_supplier_basis ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_supplier_basis FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_route_basis ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_route_basis FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_condition ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_decision_condition FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_condition_satisfaction_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.award_condition_satisfaction_occurrence FORCE ROW LEVEL SECURITY;

DO $$
DECLARE
  v_table text;
BEGIN
  FOREACH v_table IN ARRAY ARRAY[
    'approval_case', 'approval_action_occurrence'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON platform.%I', v_table);
    EXECUTE format(
      'CREATE POLICY tenant_select ON platform.%I FOR SELECT TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))',
      v_table
    );
  END LOOP;
  FOREACH v_table IN ARRAY ARRAY[
    'award_recommendation', 'award_recommendation_selection', 'award_recommendation_route_basis',
    'award_decision', 'award_decision_supplier_basis', 'award_decision_route_basis',
    'award_decision_condition', 'award_condition_satisfaction_occurrence'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON procurement.%I', v_table);
    EXECUTE format(
      'CREATE POLICY tenant_select ON procurement.%I FOR SELECT TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))',
      v_table
    );
  END LOOP;
END
$$;

REVOKE ALL ON platform.approval_policy_version FROM PUBLIC;
REVOKE ALL ON platform.approval_case FROM PUBLIC;
REVOKE ALL ON platform.approval_action_occurrence FROM PUBLIC;
REVOKE ALL ON procurement.award_recommendation FROM PUBLIC;
REVOKE ALL ON procurement.award_recommendation_selection FROM PUBLIC;
REVOKE ALL ON procurement.award_recommendation_route_basis FROM PUBLIC;
REVOKE ALL ON procurement.award_decision FROM PUBLIC;
REVOKE ALL ON procurement.award_decision_supplier_basis FROM PUBLIC;
REVOKE ALL ON procurement.award_decision_route_basis FROM PUBLIC;
REVOKE ALL ON procurement.award_decision_condition FROM PUBLIC;
REVOKE ALL ON procurement.award_condition_satisfaction_occurrence FROM PUBLIC;

GRANT SELECT ON platform.approval_policy_version TO cpos_platform_runtime;
GRANT SELECT ON platform.approval_case, platform.approval_action_occurrence TO cpos_platform_runtime;
GRANT SELECT ON procurement.award_recommendation,
  procurement.award_recommendation_selection,
  procurement.award_recommendation_route_basis,
  procurement.award_decision,
  procurement.award_decision_supplier_basis,
  procurement.award_decision_route_basis,
  procurement.award_decision_condition,
  procurement.award_condition_satisfaction_occurrence
TO cpos_platform_runtime;

REVOKE ALL ON FUNCTION procurement.require_r07_sourcing_actor() FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.create_award_recommendation(uuid,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,jsonb,uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.add_award_recommendation_basis(uuid,uuid,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.remove_award_recommendation_basis(uuid,uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.submit_award_recommendation(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.revalidate_award_recommendation(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.act_on_procurement_approval(uuid,text,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.record_award_decision(uuid,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.satisfy_award_condition(uuid,uuid,jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION procurement.make_award_effective_for_handoff(uuid) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION procurement.create_award_recommendation(uuid,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,jsonb,uuid) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.add_award_recommendation_basis(uuid,uuid,text) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.remove_award_recommendation_basis(uuid,uuid) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.submit_award_recommendation(uuid) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.act_on_procurement_approval(uuid,text,text,text) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.record_award_decision(uuid,text) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.satisfy_award_condition(uuid,uuid,jsonb) TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION procurement.make_award_effective_for_handoff(uuid) TO cpos_platform_runtime;

DO $$
DECLARE
  v_table text;
BEGIN
  FOREACH v_table IN ARRAY ARRAY[
    'platform.approval_case', 'platform.approval_action_occurrence',
    'procurement.award_recommendation', 'procurement.award_recommendation_selection',
    'procurement.award_recommendation_route_basis', 'procurement.award_decision',
    'procurement.award_decision_supplier_basis', 'procurement.award_decision_route_basis',
    'procurement.award_decision_condition', 'procurement.award_condition_satisfaction_occurrence'
  ] LOOP
    IF has_table_privilege('cpos_platform_runtime', v_table, 'INSERT')
       OR has_table_privilege('cpos_platform_runtime', v_table, 'UPDATE')
       OR has_table_privilege('cpos_platform_runtime', v_table, 'DELETE') THEN
      RAISE EXCEPTION 'R07 direct runtime mutation privilege leaked on %', v_table;
    END IF;
  END LOOP;
END
$$;

COMMENT ON TABLE procurement.award_recommendation IS
  'Submitted procurement decision proposal grounded in one exact frozen ComparisonSnapshot and supplier-confirmed commercial basis.';
COMMENT ON TABLE procurement.award_recommendation_route_basis IS
  'Exact line-derived ProcurementRouteDecision versions relied upon by a submitted recommendation; revalidated at approval and award transitions.';
COMMENT ON TABLE procurement.award_decision IS
  'Immutable procurement AwardDecision. EFFECTIVE_FOR_HANDOFF authorizes downstream commitment formation but is not itself an LPO/PO/subcontract/commitment.';
