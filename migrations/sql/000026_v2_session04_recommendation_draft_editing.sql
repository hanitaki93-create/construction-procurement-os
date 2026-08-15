-- Architecture V2 Session 04 R07 usability completion.
-- Keep migration history append-only: add governed DRAFT editing without rewriting 000025.

CREATE OR REPLACE FUNCTION procurement.update_award_recommendation_draft(
  p_recommendation_id uuid,
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
  p_risks_deviations jsonb DEFAULT '[]'::jsonb
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

  UPDATE procurement.award_recommendation
  SET outcome = p_outcome,
      technical_condition_state = p_technical_condition_state,
      rationale = btrim(p_rationale),
      non_lowest_reason = nullif(btrim(p_non_lowest_reason), ''),
      split_or_sole_source_reason = nullif(btrim(p_split_or_sole_source_reason), ''),
      competition_exception_reason = nullif(btrim(p_competition_exception_reason), ''),
      budget_basis_refs = p_budget_basis_refs,
      technical_dependency_refs = p_technical_dependency_refs,
      eligibility_basis_refs = p_eligibility_basis_refs,
      supplier_intelligence_basis_refs = p_supplier_intelligence_basis_refs,
      risks_deviations = p_risks_deviations
  WHERE tenant_id = v_tenant_id
    AND recommendation_id = p_recommendation_id
    AND status = 'DRAFT';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'recommendation can only be edited while DRAFT and visible in this tenant' USING ERRCODE = '55000';
  END IF;
END
$$;

REVOKE ALL ON FUNCTION procurement.update_award_recommendation_draft(
  uuid,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,jsonb
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION procurement.update_award_recommendation_draft(
  uuid,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,jsonb
) TO cpos_platform_runtime;

COMMENT ON FUNCTION procurement.update_award_recommendation_draft(
  uuid,text,text,text,text,text,text,jsonb,jsonb,jsonb,jsonb,jsonb
) IS 'Governed R07 DRAFT-only edit path. Submitted recommendation evidence remains immutable.';
