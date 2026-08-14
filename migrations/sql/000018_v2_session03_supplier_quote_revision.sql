-- Architecture V2 Session 03: immutable RFQ issue basis + supplier intent + quotation revisions.
-- Supplier quotation rows preserve source truth. Buyer normalization belongs to Comparison, never here.

CREATE TABLE IF NOT EXISTS procurement.rfq_tender_issue (
  rfq_issue_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_id uuid NOT NULL,
  revision_no integer NOT NULL CHECK (revision_no >= 0),
  rfq_number text NOT NULL CHECK (char_length(rfq_number) BETWEEN 1 AND 80),
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),
  event_type text NOT NULL CHECK (event_type IN ('RFQ','TENDER','RFP')),
  project_id uuid NOT NULL,
  package_id uuid,
  buyer_id uuid NOT NULL,
  issued_at timestamptz NOT NULL,
  response_due_at timestamptz NOT NULL,
  response_timezone text NOT NULL,
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  pricing_basis text NOT NULL CHECK (pricing_basis IN ('UNIT_AND_TOTAL','LUMP_SUM','RATE_SCHEDULE','MIXED')),
  payment_term_requirement text,
  validity_days integer CHECK (validity_days IS NULL OR validity_days BETWEEN 1 AND 3650),
  commercial_instructions text,
  submission_instructions text,
  evaluation_mode text NOT NULL CHECK (evaluation_mode IN ('COMBINED','TWO_STAGE')),
  bid_visibility_policy text NOT NULL CHECK (bid_visibility_policy IN ('BUYER_AFTER_CLOSE','BUYER_ON_RECEIPT','SEALED_TWO_STAGE')),
  route_policy_key text NOT NULL,
  route_policy_version integer NOT NULL,
  issued_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_issue_id),
  UNIQUE (tenant_id, rfq_id, revision_no),
  FOREIGN KEY (tenant_id, rfq_id) REFERENCES procurement.rfq_tender(tenant_id, rfq_id),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, package_id) REFERENCES procurement.procurement_package(tenant_id, package_id),
  FOREIGN KEY (tenant_id, buyer_id) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, issued_by) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (route_policy_key, route_policy_version)
    REFERENCES procurement.procurement_route_policy_reference(policy_key, version),
  CHECK (response_due_at > issued_at)
);

CREATE TABLE IF NOT EXISTS procurement.rfq_tender_issue_line (
  rfq_issue_line_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_issue_id uuid NOT NULL,
  source_rfq_line_id uuid NOT NULL,
  line_no integer NOT NULL CHECK (line_no > 0),
  mr_line_id uuid NOT NULL,
  package_scope_id uuid,
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 500),
  specification text,
  quantity numeric(24,6) NOT NULL CHECK (quantity > 0),
  uom_code text NOT NULL REFERENCES procurement.uom_reference(uom_code),
  required_date date,
  equivalent_rule text NOT NULL CHECK (equivalent_rule IN ('EXACT_ONLY','APPROVED_EQUIVALENT_ALLOWED','ALTERNATE_BY_APPROVAL')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_issue_line_id),
  UNIQUE (tenant_id, rfq_issue_id, line_no),
  UNIQUE (tenant_id, rfq_issue_id, source_rfq_line_id),
  FOREIGN KEY (tenant_id, rfq_issue_id) REFERENCES procurement.rfq_tender_issue(tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, source_rfq_line_id) REFERENCES procurement.rfq_tender_line(tenant_id, rfq_line_id),
  FOREIGN KEY (tenant_id, mr_line_id) REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id),
  FOREIGN KEY (tenant_id, package_scope_id) REFERENCES procurement.procurement_package_scope(tenant_id, package_scope_id)
);

CREATE TABLE IF NOT EXISTS procurement.rfq_tender_issue_bidder (
  rfq_issue_bidder_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_issue_id uuid NOT NULL,
  source_rfq_bidder_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  supplier_contact_id uuid,
  invitation_state text NOT NULL DEFAULT 'INVITED' CHECK (invitation_state = 'INVITED'),
  eligibility_note text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, rfq_issue_bidder_id),
  UNIQUE (tenant_id, rfq_issue_id, source_rfq_bidder_id),
  UNIQUE (tenant_id, rfq_issue_id, supplier_id),
  FOREIGN KEY (tenant_id, rfq_issue_id) REFERENCES procurement.rfq_tender_issue(tenant_id, rfq_issue_id),
  FOREIGN KEY (tenant_id, source_rfq_bidder_id) REFERENCES procurement.rfq_tender_bidder(tenant_id, rfq_bidder_id),
  FOREIGN KEY (tenant_id, supplier_id) REFERENCES procurement.supplier(tenant_id, supplier_id),
  FOREIGN KEY (tenant_id, supplier_contact_id) REFERENCES procurement.supplier_contact(tenant_id, supplier_contact_id)
);

CREATE TABLE IF NOT EXISTS procurement.rfq_supplier_intent_event (
  intent_event_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_issue_bidder_id uuid NOT NULL,
  intent text NOT NULL CHECK (intent IN ('WILL_BID','NO_BID')),
  reason text,
  channel text NOT NULL CHECK (channel IN ('SECURE_TASK','EMAIL','PHONE','BUYER_CAPTURE','OTHER')),
  recorded_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, intent_event_id),
  FOREIGN KEY (tenant_id, rfq_issue_bidder_id)
    REFERENCES procurement.rfq_tender_issue_bidder(tenant_id, rfq_issue_bidder_id),
  FOREIGN KEY (tenant_id, recorded_by) REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (reason IS NULL OR char_length(reason) <= 2000)
);

CREATE TABLE IF NOT EXISTS procurement.supplier_quotation_revision (
  quotation_revision_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  rfq_issue_bidder_id uuid NOT NULL,
  revision_no integer NOT NULL CHECK (revision_no >= 0),
  supersedes_revision_id uuid,
  supplier_quotation_reference text,
  quotation_date date,
  received_at timestamptz NOT NULL,
  response_channel text NOT NULL CHECK (response_channel IN ('SECURE_TASK','FILE_UPLOAD','EMAIL','BUYER_CAPTURE','API','OTHER')),
  capture_mode text NOT NULL CHECK (capture_mode IN ('SUPPLIER_DIRECT','BUYER_ON_BEHALF','INTEGRATION')),
  captured_by_principal_id uuid,
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  validity_until date,
  lead_time_promise text,
  delivery_promise text,
  payment_terms text,
  warranty_terms text,
  commercial_notes text,
  response_status text NOT NULL DEFAULT 'RECEIVED' CHECK (response_status IN ('RECEIVED','WITHDRAWN','FINAL')),
  source_file_name text,
  source_media_type text,
  source_sha256 text CHECK (source_sha256 IS NULL OR source_sha256 ~ '^[0-9a-fA-F]{64}$'),
  source_channel_reference text,
  is_late boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, quotation_revision_id),
  UNIQUE (tenant_id, rfq_issue_bidder_id, revision_no),
  FOREIGN KEY (tenant_id, rfq_issue_bidder_id)
    REFERENCES procurement.rfq_tender_issue_bidder(tenant_id, rfq_issue_bidder_id),
  FOREIGN KEY (tenant_id, supersedes_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, captured_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, created_by) REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (supplier_quotation_reference IS NULL OR char_length(supplier_quotation_reference) <= 160),
  CHECK (lead_time_promise IS NULL OR char_length(lead_time_promise) <= 1000),
  CHECK (delivery_promise IS NULL OR char_length(delivery_promise) <= 1000),
  CHECK (payment_terms IS NULL OR char_length(payment_terms) <= 2000),
  CHECK (warranty_terms IS NULL OR char_length(warranty_terms) <= 2000),
  CHECK (commercial_notes IS NULL OR char_length(commercial_notes) <= 6000),
  CHECK (source_file_name IS NULL OR char_length(source_file_name) <= 500),
  CHECK (source_media_type IS NULL OR char_length(source_media_type) <= 200),
  CHECK (source_channel_reference IS NULL OR char_length(source_channel_reference) <= 1000),
  CHECK (
    (capture_mode = 'BUYER_ON_BEHALF' AND captured_by_principal_id IS NOT NULL)
    OR (capture_mode <> 'BUYER_ON_BEHALF')
  )
);

CREATE TABLE IF NOT EXISTS procurement.supplier_quotation_line (
  quotation_line_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  quotation_revision_id uuid NOT NULL,
  rfq_issue_line_id uuid,
  supplier_line_no text,
  supplier_description text NOT NULL CHECK (char_length(btrim(supplier_description)) BETWEEN 1 AND 2000),
  quoted_quantity numeric(24,6) CHECK (quoted_quantity IS NULL OR quoted_quantity > 0),
  quoted_uom_code text,
  unit_rate numeric(24,6),
  line_amount numeric(24,6),
  tax_amount numeric(24,6),
  brand text,
  manufacturer text,
  model text,
  lead_time_override text,
  inclusion_exclusion_note text,
  deviation_note text,
  line_type text NOT NULL DEFAULT 'BASE' CHECK (line_type IN ('BASE','ALTERNATE','SUBSTITUTE','UNMAPPED')),
  source_reference text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, quotation_line_id),
  FOREIGN KEY (tenant_id, quotation_revision_id)
    REFERENCES procurement.supplier_quotation_revision(tenant_id, quotation_revision_id),
  FOREIGN KEY (tenant_id, rfq_issue_line_id)
    REFERENCES procurement.rfq_tender_issue_line(tenant_id, rfq_issue_line_id),
  CHECK (supplier_line_no IS NULL OR char_length(supplier_line_no) <= 80),
  CHECK (quoted_uom_code IS NULL OR char_length(quoted_uom_code) <= 80),
  CHECK (brand IS NULL OR char_length(brand) <= 240),
  CHECK (manufacturer IS NULL OR char_length(manufacturer) <= 240),
  CHECK (model IS NULL OR char_length(model) <= 240),
  CHECK (lead_time_override IS NULL OR char_length(lead_time_override) <= 1000),
  CHECK (inclusion_exclusion_note IS NULL OR char_length(inclusion_exclusion_note) <= 4000),
  CHECK (deviation_note IS NULL OR char_length(deviation_note) <= 4000),
  CHECK (source_reference IS NULL OR char_length(source_reference) <= 1000),
  CHECK (unit_rate IS NULL OR abs(unit_rate) < 1000000000000000000::numeric),
  CHECK (line_amount IS NULL OR abs(line_amount) < 1000000000000000000::numeric),
  CHECK (tax_amount IS NULL OR abs(tax_amount) < 1000000000000000000::numeric)
);

CREATE OR REPLACE FUNCTION procurement.reject_immutable_supplier_source_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
BEGIN
  RAISE EXCEPTION 'immutable procurement source truth cannot be updated or deleted' USING ERRCODE = '55000';
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_rfq_issue_lineage()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  issue_rfq_id uuid;
  source_rfq_id uuid;
BEGIN
  SELECT rfq_id INTO issue_rfq_id
  FROM procurement.rfq_tender_issue
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_id = NEW.rfq_issue_id;

  SELECT rfq_id INTO source_rfq_id
  FROM procurement.rfq_tender_line
  WHERE tenant_id = NEW.tenant_id AND rfq_line_id = NEW.source_rfq_line_id;

  IF issue_rfq_id IS NULL OR source_rfq_id IS NULL OR issue_rfq_id <> source_rfq_id THEN
    RAISE EXCEPTION 'issued RFQ line must snapshot a source line from the same RFQ' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_rfq_issue_bidder_lineage()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  issue_rfq_id uuid;
  bidder_rfq_id uuid;
  bidder_supplier_id uuid;
  bidder_contact_id uuid;
BEGIN
  SELECT rfq_id INTO issue_rfq_id
  FROM procurement.rfq_tender_issue
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_id = NEW.rfq_issue_id;

  SELECT rfq_id, supplier_id, supplier_contact_id
  INTO bidder_rfq_id, bidder_supplier_id, bidder_contact_id
  FROM procurement.rfq_tender_bidder
  WHERE tenant_id = NEW.tenant_id AND rfq_bidder_id = NEW.source_rfq_bidder_id;

  IF issue_rfq_id IS NULL OR bidder_rfq_id IS NULL OR issue_rfq_id <> bidder_rfq_id THEN
    RAISE EXCEPTION 'issued bidder must snapshot a bidder from the same RFQ' USING ERRCODE = '23514';
  END IF;
  IF NEW.supplier_id <> bidder_supplier_id OR NEW.supplier_contact_id IS DISTINCT FROM bidder_contact_id THEN
    RAISE EXCEPTION 'issued bidder identity/contact must preserve selected bidder source truth' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_supplier_quotation_revision_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  issue_due timestamptz;
  latest_revision_no integer;
  latest_revision_id uuid;
BEGIN
  PERFORM 1
  FROM procurement.rfq_tender_issue_bidder
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_bidder_id = NEW.rfq_issue_bidder_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'quotation issued bidder does not exist' USING ERRCODE = '23503';
  END IF;

  SELECT i.response_due_at INTO issue_due
  FROM procurement.rfq_tender_issue_bidder ib
  JOIN procurement.rfq_tender_issue i
    ON i.tenant_id = ib.tenant_id AND i.rfq_issue_id = ib.rfq_issue_id
  WHERE ib.tenant_id = NEW.tenant_id AND ib.rfq_issue_bidder_id = NEW.rfq_issue_bidder_id;

  SELECT revision_no, quotation_revision_id
  INTO latest_revision_no, latest_revision_id
  FROM procurement.supplier_quotation_revision
  WHERE tenant_id = NEW.tenant_id AND rfq_issue_bidder_id = NEW.rfq_issue_bidder_id
  ORDER BY revision_no DESC
  LIMIT 1;

  IF latest_revision_no IS NULL THEN
    IF NEW.revision_no <> 0 OR NEW.supersedes_revision_id IS NOT NULL THEN
      RAISE EXCEPTION 'first supplier quotation revision must be R0 without supersedes reference' USING ERRCODE = '23514';
    END IF;
  ELSE
    IF NEW.revision_no <> latest_revision_no + 1 OR NEW.supersedes_revision_id IS DISTINCT FROM latest_revision_id THEN
      RAISE EXCEPTION 'quotation revision must append exactly after the latest immutable revision' USING ERRCODE = '23514';
    END IF;
  END IF;

  NEW.is_late := NEW.received_at > issue_due;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_supplier_quotation_line_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  quote_issue_id uuid;
  line_issue_id uuid;
BEGIN
  SELECT ib.rfq_issue_id INTO quote_issue_id
  FROM procurement.supplier_quotation_revision q
  JOIN procurement.rfq_tender_issue_bidder ib
    ON ib.tenant_id = q.tenant_id AND ib.rfq_issue_bidder_id = q.rfq_issue_bidder_id
  WHERE q.tenant_id = NEW.tenant_id AND q.quotation_revision_id = NEW.quotation_revision_id;

  IF quote_issue_id IS NULL THEN
    RAISE EXCEPTION 'quotation revision does not exist' USING ERRCODE = '23503';
  END IF;

  IF NEW.rfq_issue_line_id IS NOT NULL THEN
    SELECT rfq_issue_id INTO line_issue_id
    FROM procurement.rfq_tender_issue_line
    WHERE tenant_id = NEW.tenant_id AND rfq_issue_line_id = NEW.rfq_issue_line_id;
    IF line_issue_id IS NULL OR line_issue_id <> quote_issue_id THEN
      RAISE EXCEPTION 'quotation line mapping must reference a line from the quotation issued RFQ basis' USING ERRCODE = '23514';
    END IF;
  ELSIF NEW.line_type <> 'UNMAPPED' THEN
    RAISE EXCEPTION 'supplier-added line without RFQ mapping must be explicitly UNMAPPED' USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS rfq_issue_line_validate ON procurement.rfq_tender_issue_line;
CREATE TRIGGER rfq_issue_line_validate
BEFORE INSERT ON procurement.rfq_tender_issue_line
FOR EACH ROW EXECUTE FUNCTION procurement.validate_rfq_issue_lineage();

DROP TRIGGER IF EXISTS rfq_issue_bidder_validate ON procurement.rfq_tender_issue_bidder;
CREATE TRIGGER rfq_issue_bidder_validate
BEFORE INSERT ON procurement.rfq_tender_issue_bidder
FOR EACH ROW EXECUTE FUNCTION procurement.validate_rfq_issue_bidder_lineage();

DROP TRIGGER IF EXISTS supplier_quotation_revision_validate ON procurement.supplier_quotation_revision;
CREATE TRIGGER supplier_quotation_revision_validate
BEFORE INSERT ON procurement.supplier_quotation_revision
FOR EACH ROW EXECUTE FUNCTION procurement.validate_supplier_quotation_revision_write();

DROP TRIGGER IF EXISTS supplier_quotation_line_validate ON procurement.supplier_quotation_line;
CREATE TRIGGER supplier_quotation_line_validate
BEFORE INSERT ON procurement.supplier_quotation_line
FOR EACH ROW EXECUTE FUNCTION procurement.validate_supplier_quotation_line_write();

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'rfq_tender_issue',
    'rfq_tender_issue_line',
    'rfq_tender_issue_bidder',
    'rfq_supplier_intent_event',
    'supplier_quotation_revision',
    'supplier_quotation_line'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS reject_immutable_change ON procurement.%I', table_name);
    EXECUTE format(
      'CREATE TRIGGER reject_immutable_change BEFORE UPDATE OR DELETE ON procurement.%I FOR EACH ROW EXECUTE FUNCTION procurement.reject_immutable_supplier_source_change()',
      table_name
    );
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION procurement.validate_rfq_issue_header_write()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform, procurement
AS $$
DECLARE
  source procurement.rfq_tender%ROWTYPE;
BEGIN
  SELECT * INTO source
  FROM procurement.rfq_tender
  WHERE tenant_id = NEW.tenant_id AND rfq_id = NEW.rfq_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'RFQ to issue does not exist' USING ERRCODE = '23503';
  END IF;
  IF source.status NOT IN ('DRAFT','REVIEW','READY') THEN
    RAISE EXCEPTION 'RFQ is not in an issuable state' USING ERRCODE = '23514';
  END IF;
  IF NEW.revision_no <> source.revision_no
     OR NEW.rfq_number <> source.rfq_number
     OR NEW.title <> source.title
     OR NEW.event_type <> source.event_type
     OR NEW.project_id <> source.project_id
     OR NEW.package_id IS DISTINCT FROM source.package_id
     OR NEW.buyer_id <> source.buyer_id
     OR NEW.response_due_at <> source.response_due_at
     OR NEW.response_timezone <> source.response_timezone
     OR NEW.currency <> source.currency
     OR NEW.pricing_basis <> source.pricing_basis
     OR NEW.payment_term_requirement IS DISTINCT FROM source.payment_term_requirement
     OR NEW.validity_days IS DISTINCT FROM source.validity_days
     OR NEW.commercial_instructions IS DISTINCT FROM source.commercial_instructions
     OR NEW.submission_instructions IS DISTINCT FROM source.submission_instructions
     OR NEW.evaluation_mode <> source.evaluation_mode
     OR NEW.bid_visibility_policy <> source.bid_visibility_policy
     OR NEW.route_policy_key <> source.route_policy_key
     OR NEW.route_policy_version <> source.route_policy_version THEN
    RAISE EXCEPTION 'issued RFQ header must be an exact snapshot of the current governed RFQ revision' USING ERRCODE = '23514';
  END IF;
  IF NEW.issued_at >= source.response_due_at THEN
    RAISE EXCEPTION 'RFQ cannot be issued at or after its response due date' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS rfq_issue_header_validate ON procurement.rfq_tender_issue;
CREATE TRIGGER rfq_issue_header_validate
BEFORE INSERT ON procurement.rfq_tender_issue
FOR EACH ROW EXECUTE FUNCTION procurement.validate_rfq_issue_header_write();

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'rfq_tender_issue',
    'rfq_tender_issue_line',
    'rfq_tender_issue_bidder',
    'rfq_supplier_intent_event',
    'supplier_quotation_revision',
    'supplier_quotation_line'
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
  END LOOP;
END
$$;

REVOKE ALL ON procurement.rfq_tender_issue FROM PUBLIC;
REVOKE ALL ON procurement.rfq_tender_issue_line FROM PUBLIC;
REVOKE ALL ON procurement.rfq_tender_issue_bidder FROM PUBLIC;
REVOKE ALL ON procurement.rfq_supplier_intent_event FROM PUBLIC;
REVOKE ALL ON procurement.supplier_quotation_revision FROM PUBLIC;
REVOKE ALL ON procurement.supplier_quotation_line FROM PUBLIC;

GRANT SELECT, INSERT ON procurement.rfq_tender_issue TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.rfq_tender_issue_line TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.rfq_tender_issue_bidder TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.rfq_supplier_intent_event TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.supplier_quotation_revision TO cpos_platform_runtime;
GRANT SELECT, INSERT ON procurement.supplier_quotation_line TO cpos_platform_runtime;

COMMENT ON TABLE procurement.rfq_tender_issue IS
  'Immutable issued RFQ/Tender header snapshot. Supplier responses bind to this exact version, never to a moving draft.';
COMMENT ON TABLE procurement.rfq_tender_issue_line IS
  'Immutable issued RFQ pricing/scope line snapshot used as supplier-response mapping authority.';
COMMENT ON TABLE procurement.rfq_tender_issue_bidder IS
  'Immutable issued bidder/contact snapshot. Invitation mechanics remain distinct from intent and submission.';
COMMENT ON TABLE procurement.rfq_supplier_intent_event IS
  'Append-only supplier intent/no-bid history. Latest event is current intent without mutating invitation history.';
COMMENT ON TABLE procurement.supplier_quotation_revision IS
  'Immutable supplier commercial response header revision. Revisions append and never overwrite source truth.';
COMMENT ON TABLE procurement.supplier_quotation_line IS
  'Immutable structured capture of supplier-source quotation lines. Supplier discrepancies are preserved for later Comparison normalization.';
