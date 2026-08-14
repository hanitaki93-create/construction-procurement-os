-- Architecture V2 Session 02: optional Procurement Package + RFQ/Tender draft formation.
-- Package is a planning/grouping object; RFQ is the market event. Direct MR -> RFQ remains valid.

ALTER TABLE procurement.document_number_counter
  DROP CONSTRAINT IF EXISTS document_number_counter_document_class_check;
ALTER TABLE procurement.document_number_counter
  ADD CONSTRAINT document_number_counter_document_class_check
  CHECK (document_class IN ('MR','PACKAGE','RFQ'));

CREATE TABLE IF NOT EXISTS procurement.procurement_package (
  package_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  package_number text NOT NULL CHECK (char_length(package_number) BETWEEN 1 AND 80),
  numbering_scope_key text NOT NULL,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),
  trade_category text,
  package_type text NOT NULL DEFAULT 'MATERIAL_PACKAGE'
    CHECK (package_type IN ('MATERIAL_PACKAGE','TRADE_PACKAGE','SUBCONTRACT_PACKAGE','SERVICE_PACKAGE','MIXED')),
  owner_id uuid NOT NULL,
  required_on_site_date date,
  target_award_date date,
  route_policy_key text NOT NULL,
  route_policy_version integer NOT NULL,
  scope_summary text,
  status text NOT NULL DEFAULT 'PLANNED'
    CHECK (status IN ('PLANNED','PREPARING','READY_FOR_SOURCING','SOURCING','AWARD_PENDING','AWARDED','ORDERED','COMPLETE','CANCELLED')),
  created_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, package_id),
  UNIQUE (tenant_id, package_number),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, owner_id) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, created_by) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (route_policy_key, route_policy_version)
    REFERENCES procurement.procurement_route_policy_reference(policy_key, version),
  CHECK (target_award_date IS NULL OR required_on_site_date IS NULL OR target_award_date <= required_on_site_date)
);

CREATE TABLE IF NOT EXISTS procurement.procurement_package_scope (
  package_scope_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  package_id uuid NOT NULL,
  mr_line_id uuid NOT NULL,
  allocated_quantity numeric(24,6) NOT NULL CHECK (allocated_quantity > 0),
  source_uom_code text NOT NULL REFERENCES procurement.uom_reference(uom_code),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, package_scope_id),
  UNIQUE (tenant_id, package_id, mr_line_id),
  FOREIGN KEY (tenant_id, package_id) REFERENCES procurement.procurement_package(tenant_id, package_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, mr_line_id) REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id)
);

CREATE OR REPLACE FUNCTION procurement.validate_package_scope_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  source_line procurement.material_requisition_line%ROWTYPE;
  current_route text;
  already_allocated numeric(24,6);
  source_authority numeric(24,6);
BEGIN
  SELECT * INTO source_line
  FROM procurement.material_requisition_line
  WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'package scope source MR line does not exist' USING ERRCODE = '23503';
  END IF;

  IF source_line.line_state NOT IN ('APPROVED','PARTIALLY_APPROVED','SOURCING') THEN
    RAISE EXCEPTION 'package scope requires approved MR authority' USING ERRCODE = '23514';
  END IF;

  source_authority := coalesce(source_line.approved_quantity, source_line.requested_quantity);
  IF NEW.source_uom_code <> source_line.uom_code THEN
    RAISE EXCEPTION 'package scope UOM must preserve source MR UOM' USING ERRCODE = '23514';
  END IF;

  SELECT route INTO current_route
  FROM procurement.procurement_route_decision
  WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id AND is_current;

  IF current_route IS DISTINCT FROM 'PACKAGE_SOURCING' THEN
    RAISE EXCEPTION 'MR line is not governed for package sourcing' USING ERRCODE = '23514';
  END IF;

  SELECT coalesce(sum(allocated_quantity), 0) INTO already_allocated
  FROM procurement.procurement_package_scope
  WHERE tenant_id = NEW.tenant_id
    AND mr_line_id = NEW.mr_line_id
    AND package_scope_id <> NEW.package_scope_id;

  IF already_allocated + NEW.allocated_quantity > source_authority THEN
    RAISE EXCEPTION 'package scope allocation exceeds approved MR authority' USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS procurement_package_scope_validate ON procurement.procurement_package_scope;
CREATE TRIGGER procurement_package_scope_validate
BEFORE INSERT OR UPDATE OF mr_line_id, allocated_quantity, source_uom_code
ON procurement.procurement_package_scope
FOR EACH ROW EXECUTE FUNCTION procurement.validate_package_scope_write();

CREATE TABLE IF NOT EXISTS procurement.rfq_tender (
  rfq_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  rfq_number text NOT NULL CHECK (char_length(rfq_number) BETWEEN 1 AND 80),
  numbering_scope_key text NOT NULL,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),
  event_type text NOT NULL DEFAULT 'RFQ'
    CHECK (event_type IN ('RFQ','TENDER','RFP')),
  buyer_id uuid NOT NULL,
  package_id uuid,
  route_policy_key text NOT NULL,
  route_policy_version integer NOT NULL,
  issue_at timestamptz,
  response_due_at timestamptz NOT NULL,
  response_timezone text NOT NULL DEFAULT 'Asia/Dubai',
  currency text NOT NULL DEFAULT 'AED' CHECK (currency ~ '^[A-Z]{3}$'),
  pricing_basis text NOT NULL DEFAULT 'UNIT_AND_TOTAL'
    CHECK (pricing_basis IN ('UNIT_AND_TOTAL','LUMP_SUM','RATE_SCHEDULE','MIXED')),
  payment_term_requirement text,
  validity_days integer CHECK (validity_days IS NULL OR validity_days BETWEEN 1 AND 3650),
  commercial_instructions text,
  submission_instructions text,
  evaluation_mode text NOT NULL DEFAULT 'COMBINED'
    CHECK (evaluation_mode IN ('COMBINED','TWO_STAGE')),
  bid_visibility_policy text NOT NULL DEFAULT 'BUYER_AFTER_CLOSE'
    CHECK (bid_visibility_policy IN ('BUYER_AFTER_CLOSE','BUYER_ON_RECEIPT','SEALED_TWO_STAGE')),
  status text NOT NULL DEFAULT 'DRAFT'
    CHECK (status IN ('DRAFT','REVIEW','READY','ISSUED','ADDENDUM','REISSUED','CLOSED','CANCELLED')),
  revision_no integer NOT NULL DEFAULT 0 CHECK (revision_no >= 0),
  created_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_id),
  UNIQUE (tenant_id, rfq_number),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, buyer_id) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, package_id) REFERENCES procurement.procurement_package(tenant_id, package_id),
  FOREIGN KEY (tenant_id, created_by) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (route_policy_key, route_policy_version)
    REFERENCES procurement.procurement_route_policy_reference(policy_key, version),
  CHECK (issue_at IS NULL OR response_due_at > issue_at)
);

CREATE TABLE IF NOT EXISTS procurement.rfq_tender_line (
  rfq_line_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_id uuid NOT NULL,
  line_no integer NOT NULL CHECK (line_no > 0),
  mr_line_id uuid NOT NULL,
  package_scope_id uuid,
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 500),
  specification text,
  quantity numeric(24,6) NOT NULL CHECK (quantity > 0),
  uom_code text NOT NULL REFERENCES procurement.uom_reference(uom_code),
  required_date date,
  equivalent_rule text NOT NULL DEFAULT 'ALTERNATE_BY_APPROVAL'
    CHECK (equivalent_rule IN ('EXACT_ONLY','APPROVED_EQUIVALENT_ALLOWED','ALTERNATE_BY_APPROVAL')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_line_id),
  UNIQUE (tenant_id, rfq_id, line_no),
  UNIQUE (tenant_id, rfq_id, mr_line_id),
  FOREIGN KEY (tenant_id, rfq_id) REFERENCES procurement.rfq_tender(tenant_id, rfq_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, mr_line_id) REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id),
  FOREIGN KEY (tenant_id, package_scope_id) REFERENCES procurement.procurement_package_scope(tenant_id, package_scope_id)
);

CREATE OR REPLACE FUNCTION procurement.validate_rfq_line_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  source_line procurement.material_requisition_line%ROWTYPE;
  source_package_scope procurement.procurement_package_scope%ROWTYPE;
  current_route text;
  source_authority numeric(24,6);
BEGIN
  SELECT * INTO source_line
  FROM procurement.material_requisition_line
  WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'RFQ source MR line does not exist' USING ERRCODE = '23503';
  END IF;

  IF NEW.uom_code <> source_line.uom_code THEN
    RAISE EXCEPTION 'RFQ UOM must preserve source MR UOM' USING ERRCODE = '23514';
  END IF;

  IF NEW.package_scope_id IS NOT NULL THEN
    SELECT * INTO source_package_scope
    FROM procurement.procurement_package_scope
    WHERE tenant_id = NEW.tenant_id AND package_scope_id = NEW.package_scope_id;
    IF NOT FOUND OR source_package_scope.mr_line_id <> NEW.mr_line_id THEN
      RAISE EXCEPTION 'RFQ package scope does not match source MR line' USING ERRCODE = '23514';
    END IF;
    source_authority := source_package_scope.allocated_quantity;
  ELSE
    SELECT route INTO current_route
    FROM procurement.procurement_route_decision
    WHERE tenant_id = NEW.tenant_id AND mr_line_id = NEW.mr_line_id AND is_current;
    IF current_route IS DISTINCT FROM 'COMPETITIVE_RFQ' THEN
      RAISE EXCEPTION 'direct MR source is not governed for competitive RFQ' USING ERRCODE = '23514';
    END IF;
    IF source_line.line_state NOT IN ('APPROVED','PARTIALLY_APPROVED','SOURCING') THEN
      RAISE EXCEPTION 'RFQ requires approved MR authority' USING ERRCODE = '23514';
    END IF;
    source_authority := coalesce(source_line.approved_quantity, source_line.requested_quantity);
  END IF;

  IF NEW.quantity > source_authority THEN
    RAISE EXCEPTION 'RFQ quantity exceeds governed source authority' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS rfq_tender_line_validate ON procurement.rfq_tender_line;
CREATE TRIGGER rfq_tender_line_validate
BEFORE INSERT OR UPDATE OF mr_line_id, package_scope_id, quantity, uom_code
ON procurement.rfq_tender_line
FOR EACH ROW EXECUTE FUNCTION procurement.validate_rfq_line_write();

CREATE TABLE IF NOT EXISTS procurement.rfq_tender_bidder (
  rfq_bidder_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  supplier_contact_id uuid,
  invitation_state text NOT NULL DEFAULT 'DRAFT'
    CHECK (invitation_state IN ('DRAFT','READY','INVITED','DECLINED','WITHDRAWN','REMOVED')),
  eligibility_note text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_bidder_id),
  UNIQUE (tenant_id, rfq_id, supplier_id),
  FOREIGN KEY (tenant_id, rfq_id) REFERENCES procurement.rfq_tender(tenant_id, rfq_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, supplier_id) REFERENCES procurement.supplier(tenant_id, supplier_id),
  FOREIGN KEY (tenant_id, supplier_contact_id) REFERENCES procurement.supplier_contact(tenant_id, supplier_contact_id)
);

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'procurement_package','procurement_package_scope','rfq_tender','rfq_tender_line','rfq_tender_bidder'
  ] LOOP
    EXECUTE format('ALTER TABLE procurement.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('ALTER TABLE procurement.%I FORCE ROW LEVEL SECURITY', table_name);
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_select ON procurement.%I FOR SELECT TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))',
      table_name
    );
    EXECUTE format('DROP POLICY IF EXISTS tenant_insert ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_insert ON procurement.%I FOR INSERT TO cpos_platform_runtime WITH CHECK (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''') AND platform.current_tenant_has_active_product_access())',
      table_name
    );
    EXECUTE format('DROP POLICY IF EXISTS tenant_update ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE POLICY tenant_update ON procurement.%I FOR UPDATE TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''')) WITH CHECK (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), '''') AND platform.current_tenant_has_active_product_access())',
      table_name
    );
  END LOOP;
END
$$;

REVOKE ALL ON procurement.procurement_package FROM PUBLIC;
REVOKE ALL ON procurement.procurement_package_scope FROM PUBLIC;
REVOKE ALL ON procurement.rfq_tender FROM PUBLIC;
REVOKE ALL ON procurement.rfq_tender_line FROM PUBLIC;
REVOKE ALL ON procurement.rfq_tender_bidder FROM PUBLIC;
GRANT SELECT, INSERT, UPDATE ON procurement.procurement_package TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.procurement_package_scope TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.rfq_tender TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.rfq_tender_line TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.rfq_tender_bidder TO cpos_platform_runtime;

COMMENT ON TABLE procurement.procurement_package IS
  'Optional construction procurement planning/grouping object. It never replaces the fast direct-MR path.';
COMMENT ON TABLE procurement.rfq_tender IS
  'RFQ/Tender market-event header formed from approved direct-MR or package scope. Issue immutability/artifacts follow in the next Session 02 slice.';