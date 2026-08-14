-- Architecture V2 Session 01: turn submitted demand into approved, routable procurement demand.

CREATE TABLE procurement.procurement_route_policy_reference (
  policy_key text NOT NULL,
  version integer NOT NULL CHECK (version > 0),
  display_name text NOT NULL,
  default_route text NOT NULL CHECK (default_route IN (
    'COMPETITIVE_RFQ','DIRECT_ORDER','PACKAGE_SOURCING','SOLE_SOURCE_EXCEPTION','EXTERNAL_ERP_STOCK'
  )),
  active boolean NOT NULL DEFAULT true,
  effective_from date NOT NULL,
  PRIMARY KEY (policy_key, version)
);

INSERT INTO procurement.procurement_route_policy_reference (
  policy_key, version, display_name, default_route, effective_from
) VALUES (
  'UAE_CONTRACTOR_STARTER', 1, 'UAE Contractor Starter Procurement Policy', 'COMPETITIVE_RFQ', DATE '2026-01-01'
) ON CONFLICT (policy_key, version) DO NOTHING;

CREATE TABLE procurement.material_requisition_review_occurrence (
  review_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  mr_id uuid NOT NULL,
  reviewer_id uuid NOT NULL,
  decision text NOT NULL CHECK (decision IN ('APPROVED','PARTIALLY_APPROVED','REJECTED')),
  comments text,
  line_decisions jsonb NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, review_occurrence_id),
  FOREIGN KEY (tenant_id, mr_id) REFERENCES procurement.material_requisition(tenant_id, mr_id),
  FOREIGN KEY (tenant_id, reviewer_id) REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (jsonb_typeof(line_decisions) = 'array')
);

CREATE TABLE procurement.procurement_route_decision (
  route_decision_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  mr_line_id uuid NOT NULL,
  policy_key text NOT NULL,
  policy_version integer NOT NULL,
  route text NOT NULL CHECK (route IN (
    'COMPETITIVE_RFQ','DIRECT_ORDER','PACKAGE_SOURCING','SOLE_SOURCE_EXCEPTION','EXTERNAL_ERP_STOCK'
  )),
  justification text,
  decided_by uuid NOT NULL,
  decided_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  is_current boolean NOT NULL DEFAULT true,
  supersedes_route_decision_id uuid,
  UNIQUE (tenant_id, route_decision_id),
  FOREIGN KEY (tenant_id, mr_line_id) REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id),
  FOREIGN KEY (policy_key, policy_version) REFERENCES procurement.procurement_route_policy_reference(policy_key, version),
  FOREIGN KEY (tenant_id, decided_by) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, supersedes_route_decision_id) REFERENCES procurement.procurement_route_decision(tenant_id, route_decision_id),
  CHECK (
    route NOT IN ('DIRECT_ORDER','SOLE_SOURCE_EXCEPTION','EXTERNAL_ERP_STOCK')
    OR char_length(btrim(coalesce(justification, ''))) >= 10
  )
);

CREATE UNIQUE INDEX procurement_route_decision_current_unique
  ON procurement.procurement_route_decision (tenant_id, mr_line_id)
  WHERE is_current;

ALTER TABLE procurement.material_requisition_review_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.material_requisition_review_occurrence FORCE ROW LEVEL SECURITY;
ALTER TABLE procurement.procurement_route_decision ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement.procurement_route_decision FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_select ON procurement.material_requisition_review_occurrence
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));
CREATE POLICY tenant_insert ON procurement.material_requisition_review_occurrence
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_tenant_has_active_product_access()
  );

CREATE POLICY tenant_select ON procurement.procurement_route_decision
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));
CREATE POLICY tenant_insert ON procurement.procurement_route_decision
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_tenant_has_active_product_access()
  );
CREATE POLICY tenant_update ON procurement.procurement_route_decision
  FOR UPDATE TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''))
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_tenant_has_active_product_access()
  );

REVOKE ALL ON procurement.procurement_route_policy_reference FROM PUBLIC;
REVOKE ALL ON procurement.material_requisition_review_occurrence FROM PUBLIC;
REVOKE ALL ON procurement.procurement_route_decision FROM PUBLIC;
GRANT SELECT ON procurement.procurement_route_policy_reference TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.material_requisition_review_occurrence TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.procurement_route_decision TO cpos_platform_runtime;

COMMENT ON TABLE procurement.material_requisition_review_occurrence IS
  'Immutable review occurrence for a submitted MR; exact line approvals/rejections are captured as reviewed evidence.';
COMMENT ON TABLE procurement.procurement_route_decision IS
  'Versioned line-level procurement route decision. Re-routing supersedes rather than overwrites prior policy/justification evidence.';
