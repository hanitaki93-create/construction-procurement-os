-- Architecture V2 Session 01: first real procurement product persistence.
-- Reuses the accepted B02 tenant/principal/project authority substrate and runtime role.

CREATE SCHEMA IF NOT EXISTS procurement;
REVOKE ALL ON SCHEMA procurement FROM PUBLIC;
GRANT USAGE ON SCHEMA procurement TO cpos_platform_runtime;

CREATE TABLE procurement.uom_reference (
  uom_code text PRIMARY KEY CHECK (uom_code ~ '^[A-Z0-9]{1,12}$'),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 80),
  quantity_kind text NOT NULL CHECK (quantity_kind IN ('COUNT','LENGTH','AREA','VOLUME','MASS','TIME','LUMP_SUM')),
  decimal_scale smallint NOT NULL DEFAULT 3 CHECK (decimal_scale BETWEEN 0 AND 6),
  active boolean NOT NULL DEFAULT true
);

INSERT INTO procurement.uom_reference (uom_code, display_name, quantity_kind, decimal_scale) VALUES
  ('EA','Each','COUNT',0),
  ('PCS','Pieces','COUNT',0),
  ('M','Metre','LENGTH',3),
  ('M2','Square metre','AREA',3),
  ('M3','Cubic metre','VOLUME',3),
  ('KG','Kilogram','MASS',3),
  ('TON','Metric tonne','MASS',3),
  ('L','Litre','VOLUME',3),
  ('LS','Lump sum','LUMP_SUM',2),
  ('DAY','Day','TIME',2),
  ('HR','Hour','TIME',2)
ON CONFLICT (uom_code) DO NOTHING;

CREATE TABLE procurement.delivery_location (
  delivery_location_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  location_code text NOT NULL CHECK (char_length(btrim(location_code)) BETWEEN 1 AND 40),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 160),
  address_text text,
  active boolean NOT NULL DEFAULT true,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, project_id, location_code),
  UNIQUE (tenant_id, delivery_location_id),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id)
);

CREATE TABLE procurement.cost_reference (
  cost_reference_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  cost_code text NOT NULL CHECK (char_length(btrim(cost_code)) BETWEEN 1 AND 80),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 200),
  active boolean NOT NULL DEFAULT true,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, project_id, cost_code),
  UNIQUE (tenant_id, cost_reference_id),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id)
);

CREATE TABLE procurement.supplier (
  supplier_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  supplier_code text NOT NULL CHECK (char_length(btrim(supplier_code)) BETWEEN 1 AND 40),
  legal_name text NOT NULL CHECK (char_length(btrim(legal_name)) BETWEEN 1 AND 240),
  trade_name text,
  supplier_type text NOT NULL DEFAULT 'MATERIAL_SUPPLIER'
    CHECK (supplier_type IN ('MATERIAL_SUPPLIER','SUBCONTRACTOR','SERVICE_PROVIDER','MANUFACTURER','DISTRIBUTOR','CONSULTANT_OTHER')),
  supplier_state text NOT NULL DEFAULT 'ACTIVE' CHECK (supplier_state IN ('ACTIVE','INACTIVE','ON_HOLD')),
  country_code text NOT NULL DEFAULT 'AE' CHECK (country_code ~ '^[A-Z]{2}$'),
  emirate_region text,
  registered_address jsonb,
  business_phone text,
  business_email text,
  website text,
  trn_vat_number text,
  default_currency text CHECK (default_currency IS NULL OR default_currency ~ '^[A-Z]{3}$'),
  created_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, supplier_id),
  UNIQUE (tenant_id, supplier_code),
  FOREIGN KEY (tenant_id, created_by) REFERENCES platform.principal(tenant_id, principal_id)
);

CREATE UNIQUE INDEX supplier_legal_name_normalized_unique
  ON procurement.supplier (tenant_id, lower(btrim(legal_name)));

CREATE TABLE procurement.supplier_contact (
  supplier_contact_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  supplier_id uuid NOT NULL,
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 160),
  job_title text,
  roles text[] NOT NULL DEFAULT ARRAY['PRIMARY']::text[],
  email text,
  phone text,
  preferred_channel text NOT NULL DEFAULT 'EMAIL' CHECK (preferred_channel IN ('EMAIL','PHONE','SECURE_LINK','OTHER')),
  is_primary boolean NOT NULL DEFAULT false,
  active_state text NOT NULL DEFAULT 'ACTIVE' CHECK (active_state IN ('ACTIVE','INACTIVE')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, supplier_contact_id),
  FOREIGN KEY (tenant_id, supplier_id) REFERENCES procurement.supplier(tenant_id, supplier_id),
  CHECK (cardinality(roles) >= 1),
  CHECK (preferred_channel NOT IN ('EMAIL','SECURE_LINK') OR email IS NOT NULL)
);

CREATE UNIQUE INDEX supplier_primary_contact_unique
  ON procurement.supplier_contact (tenant_id, supplier_id)
  WHERE is_primary AND active_state = 'ACTIVE';

CREATE TABLE procurement.supplier_compliance_document (
  compliance_document_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  supplier_id uuid NOT NULL,
  document_type text NOT NULL CHECK (document_type IN ('TRADE_LICENSE','VAT_CERTIFICATE','INSURANCE','ISO_CERTIFICATE','HSE_CERTIFICATE','OTHER')),
  document_number text,
  issuer text,
  issue_date date,
  expiry_date date,
  source_document_reference text,
  verification_status text NOT NULL DEFAULT 'UNVERIFIED'
    CHECK (verification_status IN ('UNVERIFIED','PENDING_REVIEW','VERIFIED','REJECTED','EXPIRED')),
  verified_by uuid,
  verified_at timestamptz,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, compliance_document_id),
  FOREIGN KEY (tenant_id, supplier_id) REFERENCES procurement.supplier(tenant_id, supplier_id),
  FOREIGN KEY (tenant_id, verified_by) REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (expiry_date IS NULL OR issue_date IS NULL OR expiry_date >= issue_date),
  CHECK ((verification_status IN ('VERIFIED','REJECTED')) = (verified_by IS NOT NULL AND verified_at IS NOT NULL))
);

CREATE TABLE procurement.item_master (
  item_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  item_code text NOT NULL CHECK (char_length(btrim(item_code)) BETWEEN 1 AND 60),
  item_kind text NOT NULL CHECK (item_kind IN ('MATERIAL','SERVICE','SUBCONTRACT_SCOPE','EQUIPMENT','OTHER')),
  short_description text NOT NULL CHECK (char_length(btrim(short_description)) BETWEEN 1 AND 500),
  detailed_specification text,
  default_uom_code text REFERENCES procurement.uom_reference(uom_code),
  manufacturer text,
  brand text,
  model text,
  equivalent_rule text NOT NULL DEFAULT 'ALTERNATE_BY_APPROVAL'
    CHECK (equivalent_rule IN ('EXACT_ONLY','APPROVED_EQUIVALENT_ALLOWED','ALTERNATE_BY_APPROVAL')),
  active boolean NOT NULL DEFAULT true,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, item_id),
  UNIQUE (tenant_id, item_code)
);

CREATE TABLE procurement.document_number_counter (
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  document_class text NOT NULL CHECK (document_class IN ('MR')),
  scope_key text NOT NULL CHECK (char_length(scope_key) BETWEEN 1 AND 180),
  next_value bigint NOT NULL DEFAULT 1 CHECK (next_value > 0),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (tenant_id, document_class, scope_key)
);

CREATE TABLE procurement.material_requisition (
  mr_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  mr_number text NOT NULL CHECK (char_length(mr_number) BETWEEN 1 AND 80),
  numbering_scope_key text NOT NULL,
  requester_id uuid NOT NULL,
  requester_team text,
  request_date date NOT NULL,
  required_on_site_date date NOT NULL,
  priority text NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW','NORMAL','HIGH','URGENT')),
  delivery_location_id uuid,
  subject text NOT NULL CHECK (char_length(btrim(subject)) BETWEEN 1 AND 240),
  instructions text,
  status text NOT NULL DEFAULT 'DRAFT'
    CHECK (status IN ('DRAFT','SUBMITTED','UNDER_REVIEW','APPROVED','PARTIALLY_APPROVED','REJECTED','SOURCING','ORDERING','PARTIALLY_FULFILLED','FULFILLED','CLOSED','CANCELLED','SUPERSEDED')),
  submitted_at timestamptz,
  created_by uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, mr_id),
  UNIQUE (tenant_id, mr_number),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, requester_id) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, created_by) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, delivery_location_id) REFERENCES procurement.delivery_location(tenant_id, delivery_location_id),
  CHECK (required_on_site_date >= request_date),
  CHECK ((status = 'DRAFT' AND submitted_at IS NULL) OR status <> 'DRAFT')
);

CREATE TABLE procurement.material_requisition_line (
  mr_line_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  mr_id uuid NOT NULL,
  line_no integer NOT NULL CHECK (line_no > 0),
  entry_mode text NOT NULL CHECK (entry_mode IN ('MASTER_BACKED','FREE_FORM')),
  item_id uuid,
  line_type text NOT NULL CHECK (line_type IN ('MATERIAL','SERVICE','SUBCONTRACT_SCOPE','EQUIPMENT','OTHER')),
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 500),
  specification text,
  requested_quantity numeric(24,6) NOT NULL CHECK (requested_quantity > 0),
  uom_code text NOT NULL REFERENCES procurement.uom_reference(uom_code),
  required_date_override date,
  manufacturer text,
  brand text,
  model text,
  equivalent_rule text NOT NULL DEFAULT 'ALTERNATE_BY_APPROVAL'
    CHECK (equivalent_rule IN ('EXACT_ONLY','APPROVED_EQUIVALENT_ALLOWED','ALTERNATE_BY_APPROVAL')),
  preferred_supplier_id uuid,
  technical_notes text,
  approved_quantity numeric(24,6),
  line_state text NOT NULL DEFAULT 'DRAFT'
    CHECK (line_state IN ('DRAFT','SUBMITTED','APPROVED','PARTIALLY_APPROVED','REJECTED','SOURCING','ORDERING','PARTIALLY_FULFILLED','FULFILLED','CANCELLED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, mr_line_id),
  UNIQUE (tenant_id, mr_id, line_no),
  FOREIGN KEY (tenant_id, mr_id) REFERENCES procurement.material_requisition(tenant_id, mr_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, item_id) REFERENCES procurement.item_master(tenant_id, item_id),
  FOREIGN KEY (tenant_id, preferred_supplier_id) REFERENCES procurement.supplier(tenant_id, supplier_id),
  CHECK ((entry_mode = 'MASTER_BACKED' AND item_id IS NOT NULL) OR (entry_mode = 'FREE_FORM' AND item_id IS NULL)),
  CHECK (approved_quantity IS NULL OR (approved_quantity >= 0 AND approved_quantity <= requested_quantity))
);

CREATE TABLE procurement.material_requisition_distribution (
  mr_distribution_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  mr_line_id uuid NOT NULL,
  cost_reference_id uuid NOT NULL,
  basis text NOT NULL DEFAULT 'QUANTITY' CHECK (basis IN ('QUANTITY','PERCENTAGE','AMOUNT')),
  quantity numeric(24,6),
  percentage numeric(9,6),
  amount numeric(24,6),
  currency text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, mr_distribution_id),
  FOREIGN KEY (tenant_id, mr_line_id) REFERENCES procurement.material_requisition_line(tenant_id, mr_line_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, cost_reference_id) REFERENCES procurement.cost_reference(tenant_id, cost_reference_id),
  CHECK (
    (basis = 'QUANTITY' AND quantity IS NOT NULL AND percentage IS NULL AND amount IS NULL AND currency IS NULL)
    OR (basis = 'PERCENTAGE' AND quantity IS NULL AND percentage IS NOT NULL AND percentage >= 0 AND percentage <= 100 AND amount IS NULL AND currency IS NULL)
    OR (basis = 'AMOUNT' AND quantity IS NULL AND percentage IS NULL AND amount IS NOT NULL AND amount >= 0 AND currency ~ '^[A-Z]{3}$')
  )
);

-- Tenant isolation. Authentication binding is checked in application services before these handles are used.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'delivery_location','cost_reference','supplier','supplier_contact','supplier_compliance_document',
    'item_master','document_number_counter','material_requisition','material_requisition_line','material_requisition_distribution'
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

REVOKE ALL ON ALL TABLES IN SCHEMA procurement FROM PUBLIC;
GRANT SELECT ON procurement.uom_reference TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.delivery_location TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.cost_reference TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.supplier TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.supplier_contact TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.supplier_compliance_document TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.item_master TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.document_number_counter TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.material_requisition TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.material_requisition_line TO cpos_platform_runtime;
GRANT SELECT, INSERT, UPDATE ON procurement.material_requisition_distribution TO cpos_platform_runtime;

COMMENT ON TABLE procurement.material_requisition IS
  'Architecture V2 Material/Purchase Requisition user object. DRAFT receives its governed MR number on first saved create; downstream sourcing is not yet implemented in Session 01.';
COMMENT ON TABLE procurement.document_number_counter IS
  'Serialized business-number counter. Application allocation locks the complete tenant/project/year MR scope; MAX()+1 is prohibited.';
