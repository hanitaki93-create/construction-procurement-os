-- B06 Sourcing / RFQ / Response Schema / External Grants / Issue
-- Frozen basis: INV-006, INV-030, INV-056, INV-075/076/078 and P1.9 product-owned schema grammar.

CREATE SCHEMA IF NOT EXISTS sourcing;
GRANT USAGE ON SCHEMA sourcing TO cpos_procurement_runtime;

CREATE TABLE IF NOT EXISTS sourcing.registered_semantic_field_key (
  field_key text PRIMARY KEY CHECK (field_key ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  registry_version bigint NOT NULL CHECK (registry_version > 0),
  family text NOT NULL CHECK (family IN (
    'IDENTITY_OR_REFERENCE','QUANTITY_WITH_UOM','MONETARY_WITH_CURRENCY','DECIMAL_MEASURE','PERCENTAGE_OR_RATE',
    'DATE_OR_DATETIME','DURATION_OR_LEAD_TIME','ENUMERATED_SELECTION','BOOLEAN_OR_ACKNOWLEDGMENT','STRUCTURED_TEXT_IDENTIFIER',
    'FREE_TEXT_EVIDENCE_ONLY','ATTACHMENT_EVIDENCE','REGISTERED_LINE_OR_TABLE_GROUP'
  )),
  canonical_meaning text NOT NULL CHECK (length(canonical_meaning) BETWEEN 1 AND 1000),
  explicit_non_meaning text NOT NULL CHECK (length(explicit_non_meaning) BETWEEN 1 AND 1000),
  comparison_eligibility text NOT NULL CHECK (comparison_eligibility IN ('DIRECT','REGISTERED_NORMALIZATION_ONLY','EVIDENCE_ONLY','NOT_COMPARABLE')),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('ACTIVE','RETIRED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

INSERT INTO sourcing.registered_semantic_field_key(field_key,registry_version,family,canonical_meaning,explicit_non_meaning,comparison_eligibility,lifecycle_state) VALUES
 ('RFQ_ITEM_REFERENCE',1,'IDENTITY_OR_REFERENCE','Buyer-issued line/item reference for exact response alignment.','Does not establish compliance, equivalence, award or commitment.','DIRECT','ACTIVE'),
 ('RFQ_ITEM_DESCRIPTION',1,'FREE_TEXT_EVIDENCE_ONLY','Supplier-visible source description captured as attributable evidence.','Free text does not become normalized technical truth.','EVIDENCE_ONLY','ACTIVE'),
 ('RFQ_QUANTITY',1,'QUANTITY_WITH_UOM','Requested quantity bound to the issued UOM context.','Does not establish delivered, certified or committed quantity.','DIRECT','ACTIVE'),
 ('RFQ_UNIT_RATE',1,'MONETARY_WITH_CURRENCY','Supplier quoted unit-rate source value with explicit currency.','Does not establish evaluated or awarded price.','REGISTERED_NORMALIZATION_ONLY','ACTIVE'),
 ('RFQ_TOTAL_AMOUNT',1,'MONETARY_WITH_CURRENCY','Supplier quoted total source value with explicit currency.','Does not establish evaluated or awarded value.','REGISTERED_NORMALIZATION_ONLY','ACTIVE'),
 ('RFQ_LEAD_TIME',1,'DURATION_OR_LEAD_TIME','Supplier stated source lead-time.','Does not establish promised contractual milestone.','REGISTERED_NORMALIZATION_ONLY','ACTIVE'),
 ('RFQ_VALIDITY_DATE',1,'DATE_OR_DATETIME','Supplier stated quotation validity date.','Does not establish acceptance or award validity.','DIRECT','ACTIVE'),
 ('RFQ_COMMERCIAL_NOTES',1,'FREE_TEXT_EVIDENCE_ONLY','Supplier commercial notes preserved as source evidence.','Notes cannot silently become structured commercial truth.','EVIDENCE_ONLY','ACTIVE'),
 ('RFQ_TECHNICAL_ATTACHMENT',1,'ATTACHMENT_EVIDENCE','Exact attachment evidence linked to the response.','Attachment presence does not imply compliance or acceptance.','EVIDENCE_ONLY','ACTIVE')
ON CONFLICT (field_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS sourcing.supplier_relationship (
  supplier_relationship_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  supplier_name text NOT NULL CHECK (length(supplier_name) BETWEEN 1 AND 300),
  supplier_reference text,
  relationship_state text NOT NULL CHECK (relationship_state IN ('ACTIVE','INACTIVE')),
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, created_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, supplier_relationship_id)
);

CREATE TABLE IF NOT EXISTS sourcing.supplier_contact (
  supplier_contact_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  supplier_relationship_id uuid NOT NULL,
  display_name text NOT NULL CHECK (length(display_name) BETWEEN 1 AND 240),
  email_address text NOT NULL CHECK (position('@' in email_address) > 1),
  mailbox_kind text NOT NULL CHECK (mailbox_kind IN ('PERSON','SHARED_MAILBOX','TEAM')),
  contact_state text NOT NULL CHECK (contact_state IN ('ACTIVE','INACTIVE')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, supplier_relationship_id) REFERENCES sourcing.supplier_relationship(tenant_id, supplier_relationship_id),
  UNIQUE (tenant_id, supplier_contact_id),
  UNIQUE (tenant_id, supplier_relationship_id, email_address)
);

CREATE TABLE IF NOT EXISTS sourcing.sourcing_event (
  sourcing_event_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  event_number text NOT NULL CHECK (length(event_number) BETWEEN 1 AND 64),
  event_kind text NOT NULL CHECK (event_kind IN ('RFQ','TENDER')),
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id) REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, created_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, project_id, event_number),
  UNIQUE (tenant_id, sourcing_event_id)
);

CREATE TABLE IF NOT EXISTS sourcing.response_schema_version (
  response_schema_version_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  schema_name text NOT NULL CHECK (length(schema_name) BETWEEN 1 AND 240),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('DRAFT','ACTIVE','RETIRED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_id) REFERENCES sourcing.sourcing_event(tenant_id, sourcing_event_id),
  UNIQUE (sourcing_event_id, version),
  UNIQUE (tenant_id, response_schema_version_id)
);

CREATE TABLE IF NOT EXISTS sourcing.response_schema_field (
  response_schema_field_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  response_schema_version_id uuid NOT NULL,
  field_key text NOT NULL REFERENCES sourcing.registered_semantic_field_key(field_key),
  display_label text NOT NULL CHECK (length(display_label) BETWEEN 1 AND 240),
  ordinal integer NOT NULL CHECK (ordinal > 0),
  requirement text NOT NULL CHECK (requirement IN ('MANDATORY','OPTIONAL')),
  constraint_family text CHECK (constraint_family IS NULL OR constraint_family IN ('NUMERIC_MIN_MAX','DECIMAL_PRECISION_SCALE','TEXT_LENGTH','DATE_TIME_BOUND','DURATION_BOUND','ENUM_SUBSET','ATTACHMENT_BOUND','ROW_COUNT_BOUND','ACKNOWLEDGMENT','REGISTERED_APPLICABILITY')),
  constraint_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, response_schema_version_id) REFERENCES sourcing.response_schema_version(tenant_id, response_schema_version_id),
  UNIQUE (response_schema_version_id, field_key),
  UNIQUE (response_schema_version_id, ordinal),
  UNIQUE (tenant_id, response_schema_field_id)
);

CREATE TABLE IF NOT EXISTS sourcing.external_submission_acceptance_policy (
  acceptance_policy_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_id uuid NOT NULL,
  response_schema_version_id uuid NOT NULL,
  policy_version bigint NOT NULL CHECK (policy_version > 0),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('DRAFT','ACTIVE','RETIRED')),
  allowed_channels text[] NOT NULL CHECK (cardinality(allowed_channels) BETWEEN 1 AND 4 AND allowed_channels <@ ARRAY['SECURE_LINK','EMAIL','FILE','BUYER_CAPTURE']::text[]),
  late_response_policy text NOT NULL CHECK (late_response_policy IN ('REJECT','ALLOW_WITH_LIMITATION')),
  withdrawal_allowed boolean NOT NULL,
  buyer_capture_allowed boolean NOT NULL,
  require_file_integrity boolean NOT NULL,
  require_addendum_acknowledgment boolean NOT NULL,
  population_entry_rule text NOT NULL CHECK (population_entry_rule='VALID_OR_EXPLICIT_LATE_ACCEPTED_ONLY'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_id) REFERENCES sourcing.sourcing_event(tenant_id, sourcing_event_id),
  FOREIGN KEY (tenant_id, response_schema_version_id) REFERENCES sourcing.response_schema_version(tenant_id, response_schema_version_id),
  UNIQUE (sourcing_event_id, policy_version),
  UNIQUE (tenant_id, acceptance_policy_id)
);

CREATE TABLE IF NOT EXISTS sourcing.sourcing_event_version (
  sourcing_event_version_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  lifecycle_state text NOT NULL CHECK (lifecycle_state IN ('DRAFT','ISSUED','SUPERSEDED')),
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 500),
  response_due_at timestamptz NOT NULL,
  response_schema_version_id uuid NOT NULL,
  acceptance_policy_id uuid NOT NULL,
  issued_artifact_version_id uuid,
  supersedes_event_version_id uuid,
  addendum_reason text,
  issued_at timestamptz,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_id) REFERENCES sourcing.sourcing_event(tenant_id, sourcing_event_id),
  FOREIGN KEY (tenant_id, response_schema_version_id) REFERENCES sourcing.response_schema_version(tenant_id, response_schema_version_id),
  FOREIGN KEY (tenant_id, acceptance_policy_id) REFERENCES sourcing.external_submission_acceptance_policy(tenant_id, acceptance_policy_id),
  FOREIGN KEY (tenant_id, issued_artifact_version_id) REFERENCES evidence.issued_artifact_version(tenant_id, issued_artifact_version_id),
  FOREIGN KEY (supersedes_event_version_id) REFERENCES sourcing.sourcing_event_version(sourcing_event_version_id),
  UNIQUE (sourcing_event_id, version),
  UNIQUE (tenant_id, sourcing_event_version_id),
  CHECK ((lifecycle_state='ISSUED') = (issued_artifact_version_id IS NOT NULL AND issued_at IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS sourcing.sourcing_event_member (
  sourcing_event_member_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_version_id uuid NOT NULL,
  supplier_relationship_id uuid NOT NULL,
  supplier_contact_id uuid NOT NULL,
  member_state text NOT NULL CHECK (member_state IN ('ACTIVE','REMOVED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_version_id) REFERENCES sourcing.sourcing_event_version(tenant_id, sourcing_event_version_id),
  FOREIGN KEY (tenant_id, supplier_relationship_id) REFERENCES sourcing.supplier_relationship(tenant_id, supplier_relationship_id),
  FOREIGN KEY (tenant_id, supplier_contact_id) REFERENCES sourcing.supplier_contact(tenant_id, supplier_contact_id),
  UNIQUE (sourcing_event_version_id, supplier_relationship_id),
  UNIQUE (tenant_id, sourcing_event_member_id)
);

CREATE TABLE IF NOT EXISTS sourcing.external_task_grant (
  external_task_grant_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_version_id uuid NOT NULL,
  sourcing_event_member_id uuid NOT NULL,
  supplier_relationship_id uuid NOT NULL,
  supplier_contact_id uuid NOT NULL,
  token_digest_sha256 text NOT NULL CHECK (token_digest_sha256 ~ '^[0-9a-f]{64}$'),
  permitted_operations text[] NOT NULL CHECK (cardinality(permitted_operations) BETWEEN 1 AND 8),
  confidentiality_profile text NOT NULL CHECK (length(confidentiality_profile) BETWEEN 1 AND 128),
  assurance_profile text NOT NULL CHECK (length(assurance_profile) BETWEEN 1 AND 128),
  transfer_policy text NOT NULL CHECK (transfer_policy IN ('NO_TRANSFER','CONTROLLED_REISSUE')),
  due_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL,
  issue_time_subscription_id uuid NOT NULL,
  issue_time_entitlement_guard_version bigint,
  replaces_grant_id uuid,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_version_id) REFERENCES sourcing.sourcing_event_version(tenant_id, sourcing_event_version_id),
  FOREIGN KEY (tenant_id, sourcing_event_member_id) REFERENCES sourcing.sourcing_event_member(tenant_id, sourcing_event_member_id),
  FOREIGN KEY (tenant_id, supplier_relationship_id) REFERENCES sourcing.supplier_relationship(tenant_id, supplier_relationship_id),
  FOREIGN KEY (tenant_id, supplier_contact_id) REFERENCES sourcing.supplier_contact(tenant_id, supplier_contact_id),
  FOREIGN KEY (tenant_id, issue_time_subscription_id) REFERENCES platform.tenant_subscription(tenant_id, tenant_subscription_id),
  FOREIGN KEY (replaces_grant_id) REFERENCES sourcing.external_task_grant(external_task_grant_id),
  UNIQUE (tenant_id, external_task_grant_id),
  UNIQUE (tenant_id, token_digest_sha256),
  CHECK (expires_at >= due_at)
);

CREATE TABLE IF NOT EXISTS sourcing.external_task_grant_occurrence (
  external_task_grant_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  external_task_grant_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('ISSUED','REVOKED','TRANSFER_REISSUED','EXPIRED_OBSERVED')),
  reason text,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, external_task_grant_id) REFERENCES sourcing.external_task_grant(tenant_id, external_task_grant_id),
  UNIQUE (external_task_grant_id, sequence),
  UNIQUE (tenant_id, external_task_grant_occurrence_id)
);

CREATE TABLE IF NOT EXISTS sourcing.invitation_occurrence (
  invitation_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  external_task_grant_id uuid NOT NULL,
  sourcing_event_version_id uuid NOT NULL,
  sourcing_event_member_id uuid NOT NULL,
  supplier_contact_id uuid NOT NULL,
  message_id uuid NOT NULL,
  channel text NOT NULL CHECK (channel IN ('SECURE_LINK','EMAIL','FILE','BUYER_CAPTURE')),
  due_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL,
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('ISSUE','CONTROLLED_REISSUE')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, external_task_grant_id) REFERENCES sourcing.external_task_grant(tenant_id, external_task_grant_id),
  FOREIGN KEY (tenant_id, sourcing_event_version_id) REFERENCES sourcing.sourcing_event_version(tenant_id, sourcing_event_version_id),
  FOREIGN KEY (tenant_id, sourcing_event_member_id) REFERENCES sourcing.sourcing_event_member(tenant_id, sourcing_event_member_id),
  FOREIGN KEY (tenant_id, supplier_contact_id) REFERENCES sourcing.supplier_contact(tenant_id, supplier_contact_id),
  FOREIGN KEY (tenant_id, message_id) REFERENCES evidence.message(tenant_id, message_id),
  UNIQUE (tenant_id, invitation_occurrence_id),
  UNIQUE (external_task_grant_id, occurrence_kind)
);

CREATE TABLE IF NOT EXISTS sourcing.sourcing_issue_occurrence (
  sourcing_issue_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  sourcing_event_id uuid NOT NULL,
  sourcing_event_version_id uuid NOT NULL,
  issued_artifact_version_id uuid NOT NULL,
  message_id uuid NOT NULL,
  response_schema_version_id uuid NOT NULL,
  acceptance_policy_id uuid NOT NULL,
  issued_by_principal_id uuid NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, sourcing_event_id) REFERENCES sourcing.sourcing_event(tenant_id, sourcing_event_id),
  FOREIGN KEY (tenant_id, sourcing_event_version_id) REFERENCES sourcing.sourcing_event_version(tenant_id, sourcing_event_version_id),
  FOREIGN KEY (tenant_id, issued_artifact_version_id) REFERENCES evidence.issued_artifact_version(tenant_id, issued_artifact_version_id),
  FOREIGN KEY (tenant_id, message_id) REFERENCES evidence.message(tenant_id, message_id),
  FOREIGN KEY (tenant_id, response_schema_version_id) REFERENCES sourcing.response_schema_version(tenant_id, response_schema_version_id),
  FOREIGN KEY (tenant_id, acceptance_policy_id) REFERENCES sourcing.external_submission_acceptance_policy(tenant_id, acceptance_policy_id),
  FOREIGN KEY (tenant_id, issued_by_principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, sourcing_issue_occurrence_id),
  UNIQUE (sourcing_event_version_id)
);

CREATE OR REPLACE FUNCTION sourcing.reject_rewrite() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog,sourcing AS $$ BEGIN RAISE EXCEPTION '% is append-only',TG_TABLE_NAME; END $$;
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['supplier_relationship','supplier_contact','sourcing_event','response_schema_version','response_schema_field','external_submission_acceptance_policy','sourcing_event_version','sourcing_event_member','external_task_grant','external_task_grant_occurrence','invitation_occurrence','sourcing_issue_occurrence'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS reject_rewrite ON sourcing.%I',t);
    EXECUTE format('CREATE TRIGGER reject_rewrite BEFORE UPDATE OR DELETE ON sourcing.%I FOR EACH ROW EXECUTE FUNCTION sourcing.reject_rewrite()',t);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION sourcing.command_context_valid(p_project_id uuid)
RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; BEGIN
  BEGIN v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; EXCEPTION WHEN invalid_text_representation THEN RETURN false; END;
  RETURN v_tenant IS NOT NULL AND platform.current_tenant_has_active_product_access()
    AND (platform.current_principal_has_active_tenant_role('OWNER') OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER'))
    AND EXISTS(SELECT 1 FROM platform.project p JOIN platform.project_version pv ON pv.tenant_id=p.tenant_id AND pv.project_id=p.project_id
      WHERE p.tenant_id=v_tenant AND p.project_id=p_project_id AND pv.lifecycle_state='ACTIVE' AND pv.effective_period @> statement_timestamp());
END $$;

CREATE OR REPLACE FUNCTION sourcing.create_supplier(p_relationship_id uuid,p_contact_id uuid,p_supplier_name text,p_reference text,p_contact_name text,p_email text,p_mailbox_kind text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  IF NOT platform.current_tenant_has_active_product_access() OR NOT(platform.current_principal_has_active_tenant_role('OWNER') OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')) THEN RAISE EXCEPTION 'supplier command unauthorized'; END IF;
  INSERT INTO sourcing.supplier_relationship(supplier_relationship_id,tenant_id,supplier_name,supplier_reference,relationship_state,created_by_principal_id)
    VALUES(p_relationship_id,v_tenant,p_supplier_name,p_reference,'ACTIVE',v_principal);
  INSERT INTO sourcing.supplier_contact(supplier_contact_id,tenant_id,supplier_relationship_id,display_name,email_address,mailbox_kind,contact_state)
    VALUES(p_contact_id,v_tenant,p_relationship_id,p_contact_name,p_email,p_mailbox_kind,'ACTIVE');
  RETURN p_relationship_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.add_supplier_contact(
  p_contact_id uuid,p_relationship_id uuid,p_contact_name text,p_email text,p_mailbox_kind text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_relationship sourcing.supplier_relationship%ROWTYPE; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT * INTO v_relationship FROM sourcing.supplier_relationship WHERE tenant_id=v_tenant AND supplier_relationship_id=p_relationship_id AND relationship_state='ACTIVE';
  IF v_relationship.supplier_relationship_id IS NULL THEN RAISE EXCEPTION 'active supplier relationship unavailable'; END IF;
  IF NOT (platform.current_tenant_has_active_product_access() AND (platform.current_principal_has_active_tenant_role('OWNER') OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER'))) THEN RAISE EXCEPTION 'supplier contact command unauthorized'; END IF;
  INSERT INTO sourcing.supplier_contact(supplier_contact_id,tenant_id,supplier_relationship_id,display_name,email_address,mailbox_kind,contact_state)
  VALUES(p_contact_id,v_tenant,p_relationship_id,p_contact_name,lower(p_email),p_mailbox_kind,'ACTIVE');
  RETURN p_contact_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.create_rfq_draft(
  p_event_id uuid,p_event_version_id uuid,p_schema_version_id uuid,p_policy_id uuid,p_project_id uuid,p_authority_context_id uuid,p_event_number text,p_title text,p_due_at timestamptz
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  IF NOT sourcing.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'RFQ command context unauthorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM platform.project WHERE tenant_id=v_tenant AND project_id=p_project_id AND authority_context_id=p_authority_context_id) THEN RAISE EXCEPTION 'project authority context mismatch'; END IF;
  INSERT INTO sourcing.sourcing_event(sourcing_event_id,tenant_id,project_id,authority_context_id,event_number,event_kind,created_by_principal_id)
    VALUES(p_event_id,v_tenant,p_project_id,p_authority_context_id,p_event_number,'RFQ',v_principal);
  INSERT INTO sourcing.response_schema_version(response_schema_version_id,tenant_id,sourcing_event_id,version,schema_name,lifecycle_state)
    VALUES(p_schema_version_id,v_tenant,p_event_id,1,p_title||' response schema','ACTIVE');
  INSERT INTO sourcing.external_submission_acceptance_policy(acceptance_policy_id,tenant_id,sourcing_event_id,response_schema_version_id,policy_version,lifecycle_state,allowed_channels,late_response_policy,withdrawal_allowed,buyer_capture_allowed,require_file_integrity,require_addendum_acknowledgment,population_entry_rule)
    VALUES(p_policy_id,v_tenant,p_event_id,p_schema_version_id,1,'ACTIVE',ARRAY['SECURE_LINK','EMAIL','FILE','BUYER_CAPTURE'],'ALLOW_WITH_LIMITATION',true,true,true,true,'VALID_OR_EXPLICIT_LATE_ACCEPTED_ONLY');
  INSERT INTO sourcing.sourcing_event_version(sourcing_event_version_id,tenant_id,sourcing_event_id,version,lifecycle_state,title,response_due_at,response_schema_version_id,acceptance_policy_id)
    VALUES(p_event_version_id,v_tenant,p_event_id,1,'DRAFT',p_title,p_due_at,p_schema_version_id,p_policy_id);
  RETURN p_event_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.add_response_schema_field(p_field_id uuid,p_schema_version_id uuid,p_field_key text,p_label text,p_ordinal integer,p_requirement text,p_constraint_family text DEFAULT NULL,p_constraint_json jsonb DEFAULT '{}'::jsonb)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_project uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT e.project_id INTO v_project FROM sourcing.response_schema_version s JOIN sourcing.sourcing_event e ON e.tenant_id=s.tenant_id AND e.sourcing_event_id=s.sourcing_event_id WHERE s.tenant_id=v_tenant AND s.response_schema_version_id=p_schema_version_id;
  IF v_project IS NULL OR NOT sourcing.command_context_valid(v_project) THEN RAISE EXCEPTION 'response schema unavailable or unauthorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.registered_semantic_field_key WHERE field_key=p_field_key AND lifecycle_state='ACTIVE') THEN RAISE EXCEPTION 'field key is not product-registered and active'; END IF;
  INSERT INTO sourcing.response_schema_field(response_schema_field_id,tenant_id,response_schema_version_id,field_key,display_label,ordinal,requirement,constraint_family,constraint_json)
    VALUES(p_field_id,v_tenant,p_schema_version_id,p_field_key,p_label,p_ordinal,p_requirement,p_constraint_family,p_constraint_json);
  RETURN p_field_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.add_event_member(p_member_id uuid,p_event_version_id uuid,p_relationship_id uuid,p_contact_id uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_project uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT e.project_id INTO v_project FROM sourcing.sourcing_event_version ev JOIN sourcing.sourcing_event e ON e.tenant_id=ev.tenant_id AND e.sourcing_event_id=ev.sourcing_event_id WHERE ev.tenant_id=v_tenant AND ev.sourcing_event_version_id=p_event_version_id;
  IF v_project IS NULL OR NOT sourcing.command_context_valid(v_project) THEN RAISE EXCEPTION 'event unavailable or unauthorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.supplier_contact c WHERE c.tenant_id=v_tenant AND c.supplier_contact_id=p_contact_id AND c.supplier_relationship_id=p_relationship_id AND c.contact_state='ACTIVE') THEN RAISE EXCEPTION 'supplier contact does not belong to active relationship'; END IF;
  INSERT INTO sourcing.sourcing_event_member(sourcing_event_member_id,tenant_id,sourcing_event_version_id,supplier_relationship_id,supplier_contact_id,member_state)
    VALUES(p_member_id,v_tenant,p_event_version_id,p_relationship_id,p_contact_id,'ACTIVE');
  RETURN p_member_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.issue_event(
  p_issued_event_version_id uuid,p_event_id uuid,p_expected_draft_version bigint,p_artifact_version_id uuid,p_message_id uuid
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,evidence,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; v_event sourcing.sourcing_event%ROWTYPE; v_draft sourcing.sourcing_event_version%ROWTYPE; v_new_version bigint; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  SELECT * INTO v_event FROM sourcing.sourcing_event WHERE tenant_id=v_tenant AND sourcing_event_id=p_event_id FOR UPDATE;
  IF v_event.sourcing_event_id IS NULL OR NOT sourcing.command_context_valid(v_event.project_id) THEN RAISE EXCEPTION 'event unavailable or unauthorized'; END IF;
  SELECT * INTO v_draft FROM sourcing.sourcing_event_version WHERE tenant_id=v_tenant AND sourcing_event_id=p_event_id ORDER BY version DESC LIMIT 1 FOR UPDATE;
  IF v_draft.version<>p_expected_draft_version OR v_draft.lifecycle_state<>'DRAFT' THEN RAISE EXCEPTION 'stale or non-draft issue basis'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.response_schema_version s WHERE s.tenant_id=v_tenant AND s.response_schema_version_id=v_draft.response_schema_version_id AND s.lifecycle_state='ACTIVE') THEN RAISE EXCEPTION 'active response schema required before issue'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.response_schema_field f WHERE f.tenant_id=v_tenant AND f.response_schema_version_id=v_draft.response_schema_version_id) THEN RAISE EXCEPTION 'non-empty registered response schema required before issue'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.external_submission_acceptance_policy p WHERE p.tenant_id=v_tenant AND p.acceptance_policy_id=v_draft.acceptance_policy_id AND p.lifecycle_state='ACTIVE' AND p.response_schema_version_id=v_draft.response_schema_version_id) THEN RAISE EXCEPTION 'active compatible acceptance policy required before issue'; END IF;
  IF NOT EXISTS(SELECT 1 FROM sourcing.sourcing_event_member m WHERE m.tenant_id=v_tenant AND m.sourcing_event_version_id=v_draft.sourcing_event_version_id AND m.member_state='ACTIVE') THEN RAISE EXCEPTION 'at least one active event member required before issue'; END IF;
  IF NOT EXISTS(SELECT 1 FROM evidence.issued_artifact_version a WHERE a.tenant_id=v_tenant AND a.issued_artifact_version_id=p_artifact_version_id) THEN RAISE EXCEPTION 'exact immutable issued artifact required before issue'; END IF;
  IF NOT EXISTS(SELECT 1 FROM evidence.message m WHERE m.tenant_id=v_tenant AND m.message_id=p_message_id AND m.issued_artifact_version_id=p_artifact_version_id) THEN RAISE EXCEPTION 'issue message must bind the exact issued artifact'; END IF;
  v_new_version:=v_draft.version+1;
  INSERT INTO sourcing.sourcing_event_version(sourcing_event_version_id,tenant_id,sourcing_event_id,version,lifecycle_state,title,response_due_at,response_schema_version_id,acceptance_policy_id,issued_artifact_version_id,supersedes_event_version_id,issued_at)
    VALUES(p_issued_event_version_id,v_tenant,p_event_id,v_new_version,'ISSUED',v_draft.title,v_draft.response_due_at,v_draft.response_schema_version_id,v_draft.acceptance_policy_id,p_artifact_version_id,v_draft.sourcing_event_version_id,clock_timestamp());
  INSERT INTO sourcing.sourcing_issue_occurrence(sourcing_issue_occurrence_id,tenant_id,sourcing_event_id,sourcing_event_version_id,issued_artifact_version_id,message_id,response_schema_version_id,acceptance_policy_id,issued_by_principal_id)
    VALUES(gen_random_uuid(),v_tenant,p_event_id,p_issued_event_version_id,p_artifact_version_id,p_message_id,v_draft.response_schema_version_id,v_draft.acceptance_policy_id,v_principal);
  RETURN p_issued_event_version_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.issue_external_task_grant(
  p_grant_id uuid,p_issued_event_version_id uuid,p_member_id uuid,p_token_digest text,p_permitted_operations text[],p_confidentiality_profile text,p_assurance_profile text,p_transfer_policy text,p_expires_at timestamptz
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_event sourcing.sourcing_event_version%ROWTYPE; v_member sourcing.sourcing_event_member%ROWTYPE; v_subscription uuid; v_guard bigint; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT * INTO v_event FROM sourcing.sourcing_event_version WHERE tenant_id=v_tenant AND sourcing_event_version_id=p_issued_event_version_id AND lifecycle_state='ISSUED';
  IF v_event.sourcing_event_version_id IS NULL THEN RAISE EXCEPTION 'external grant requires issued event version'; END IF;
  SELECT * INTO v_member FROM sourcing.sourcing_event_member WHERE tenant_id=v_tenant AND sourcing_event_member_id=p_member_id AND member_state='ACTIVE';
  IF v_member.sourcing_event_member_id IS NULL THEN RAISE EXCEPTION 'external grant requires active event member'; END IF;
  -- The issued member may originate from the exact draft predecessor or the issued version in later addendum flows.
  IF NOT EXISTS(SELECT 1 FROM sourcing.sourcing_event_version mver WHERE mver.tenant_id=v_tenant AND mver.sourcing_event_version_id=v_member.sourcing_event_version_id AND mver.sourcing_event_id=v_event.sourcing_event_id) THEN RAISE EXCEPTION 'grant member belongs to another event'; END IF;
  SELECT s.tenant_subscription_id INTO v_subscription FROM platform.tenant_subscription s
  JOIN LATERAL(SELECT occurrence_kind FROM platform.subscription_lifecycle_occurrence o WHERE o.tenant_id=s.tenant_id AND o.tenant_subscription_id=s.tenant_subscription_id AND o.effective_at<=statement_timestamp() ORDER BY o.effective_at DESC,o.sequence DESC LIMIT 1) latest ON true
  WHERE s.tenant_id=v_tenant AND latest.occurrence_kind IN ('ACTIVATED','RESUMED') ORDER BY s.recorded_at DESC LIMIT 1;
  IF v_subscription IS NULL THEN RAISE EXCEPTION 'active subscription basis required at grant issue'; END IF;
  SELECT guard_version INTO v_guard FROM platform.tenant_entitlement_authority_guard WHERE tenant_id=v_tenant;
  INSERT INTO sourcing.external_task_grant(external_task_grant_id,tenant_id,sourcing_event_version_id,sourcing_event_member_id,supplier_relationship_id,supplier_contact_id,token_digest_sha256,permitted_operations,confidentiality_profile,assurance_profile,transfer_policy,due_at,expires_at,issue_time_subscription_id,issue_time_entitlement_guard_version)
    VALUES(p_grant_id,v_tenant,p_issued_event_version_id,p_member_id,v_member.supplier_relationship_id,v_member.supplier_contact_id,p_token_digest,p_permitted_operations,p_confidentiality_profile,p_assurance_profile,p_transfer_policy,v_event.response_due_at,p_expires_at,v_subscription,v_guard);
  INSERT INTO sourcing.external_task_grant_occurrence(external_task_grant_occurrence_id,tenant_id,external_task_grant_id,sequence,occurrence_kind)
    VALUES(gen_random_uuid(),v_tenant,p_grant_id,1,'ISSUED');
  RETURN p_grant_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.revoke_external_task_grant(p_grant_id uuid,p_reason text)
RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_seq bigint; v_state text; v_project uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT e.project_id INTO v_project FROM sourcing.external_task_grant g JOIN sourcing.sourcing_event_version ev ON ev.tenant_id=g.tenant_id AND ev.sourcing_event_version_id=g.sourcing_event_version_id JOIN sourcing.sourcing_event e ON e.tenant_id=ev.tenant_id AND e.sourcing_event_id=ev.sourcing_event_id WHERE g.tenant_id=v_tenant AND g.external_task_grant_id=p_grant_id;
  IF v_project IS NULL OR NOT sourcing.command_context_valid(v_project) THEN RAISE EXCEPTION 'grant unavailable or unauthorized'; END IF;
  SELECT sequence,occurrence_kind INTO v_seq,v_state FROM sourcing.external_task_grant_occurrence WHERE external_task_grant_id=p_grant_id ORDER BY sequence DESC LIMIT 1 FOR UPDATE;
  IF v_state IN ('REVOKED','TRANSFER_REISSUED') THEN RAISE EXCEPTION 'grant already revoked/transferred'; END IF;
  v_seq:=v_seq+1; INSERT INTO sourcing.external_task_grant_occurrence(external_task_grant_occurrence_id,tenant_id,external_task_grant_id,sequence,occurrence_kind,reason)
    VALUES(gen_random_uuid(),v_tenant,p_grant_id,v_seq,'REVOKED',p_reason); RETURN v_seq;
END $$;

CREATE OR REPLACE FUNCTION sourcing.record_invitation(
  p_invitation_id uuid,p_grant_id uuid,p_message_id uuid,p_channel text,p_occurrence_kind text DEFAULT 'ISSUE'
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,evidence,platform AS $$
DECLARE v_tenant uuid; v_grant sourcing.external_task_grant%ROWTYPE; v_project uuid; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT * INTO v_grant FROM sourcing.external_task_grant WHERE tenant_id=v_tenant AND external_task_grant_id=p_grant_id;
  IF v_grant.external_task_grant_id IS NULL THEN RAISE EXCEPTION 'grant unavailable'; END IF;
  SELECT e.project_id INTO v_project FROM sourcing.sourcing_event_version ev JOIN sourcing.sourcing_event e ON e.tenant_id=ev.tenant_id AND e.sourcing_event_id=ev.sourcing_event_id WHERE ev.tenant_id=v_tenant AND ev.sourcing_event_version_id=v_grant.sourcing_event_version_id;
  IF v_project IS NULL OR NOT sourcing.command_context_valid(v_project) THEN RAISE EXCEPTION 'invitation unavailable or unauthorized'; END IF;
  IF p_occurrence_kind NOT IN ('ISSUE','CONTROLLED_REISSUE') THEN RAISE EXCEPTION 'invalid invitation occurrence kind'; END IF;
  IF NOT EXISTS(SELECT 1 FROM evidence.message m WHERE m.tenant_id=v_tenant AND m.message_id=p_message_id) THEN RAISE EXCEPTION 'invitation requires exact message basis'; END IF;
  INSERT INTO sourcing.invitation_occurrence(invitation_occurrence_id,tenant_id,external_task_grant_id,sourcing_event_version_id,sourcing_event_member_id,supplier_contact_id,message_id,channel,due_at,expires_at,occurrence_kind)
  VALUES(p_invitation_id,v_tenant,p_grant_id,v_grant.sourcing_event_version_id,v_grant.sourcing_event_member_id,v_grant.supplier_contact_id,p_message_id,p_channel,v_grant.due_at,v_grant.expires_at,p_occurrence_kind);
  RETURN p_invitation_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.create_addendum_draft(
  p_new_event_version_id uuid,p_event_id uuid,p_expected_issued_version bigint,p_new_due_at timestamptz,p_reason text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_event sourcing.sourcing_event%ROWTYPE; v_current sourcing.sourcing_event_version%ROWTYPE; v_new_version bigint; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid;
  SELECT * INTO v_event FROM sourcing.sourcing_event WHERE tenant_id=v_tenant AND sourcing_event_id=p_event_id FOR UPDATE;
  IF v_event.sourcing_event_id IS NULL OR NOT sourcing.command_context_valid(v_event.project_id) THEN RAISE EXCEPTION 'event unavailable or unauthorized'; END IF;
  SELECT * INTO v_current FROM sourcing.sourcing_event_version WHERE tenant_id=v_tenant AND sourcing_event_id=p_event_id ORDER BY version DESC LIMIT 1 FOR UPDATE;
  IF v_current.version<>p_expected_issued_version OR v_current.lifecycle_state<>'ISSUED' THEN RAISE EXCEPTION 'addendum requires exact current issued version'; END IF;
  IF p_new_due_at<=statement_timestamp() THEN RAISE EXCEPTION 'addendum response due date must be future'; END IF;
  IF p_reason IS NULL OR length(btrim(p_reason))<3 THEN RAISE EXCEPTION 'addendum reason required'; END IF;
  v_new_version:=v_current.version+1;
  INSERT INTO sourcing.sourcing_event_version(sourcing_event_version_id,tenant_id,sourcing_event_id,version,lifecycle_state,title,response_due_at,response_schema_version_id,acceptance_policy_id,supersedes_event_version_id,addendum_reason)
  VALUES(p_new_event_version_id,v_tenant,p_event_id,v_new_version,'DRAFT',v_current.title,p_new_due_at,v_current.response_schema_version_id,v_current.acceptance_policy_id,v_current.sourcing_event_version_id,p_reason);
  INSERT INTO sourcing.sourcing_event_member(sourcing_event_member_id,tenant_id,sourcing_event_version_id,supplier_relationship_id,supplier_contact_id,member_state)
  SELECT gen_random_uuid(),v_tenant,p_new_event_version_id,m.supplier_relationship_id,m.supplier_contact_id,m.member_state
  FROM sourcing.sourcing_event_member m
  JOIN sourcing.sourcing_event_version mv ON mv.tenant_id=m.tenant_id AND mv.sourcing_event_version_id=m.sourcing_event_version_id
  WHERE m.tenant_id=v_tenant AND mv.sourcing_event_id=p_event_id
    AND m.member_state='ACTIVE'
    AND mv.version=(SELECT max(x.version) FROM sourcing.sourcing_event_version x WHERE x.tenant_id=v_tenant AND x.sourcing_event_id=p_event_id AND x.version < v_new_version AND EXISTS(SELECT 1 FROM sourcing.sourcing_event_member mm WHERE mm.sourcing_event_version_id=x.sourcing_event_version_id));
  RETURN p_new_event_version_id;
END $$;

CREATE OR REPLACE FUNCTION sourcing.transfer_external_task_grant(
  p_new_grant_id uuid,p_old_grant_id uuid,p_new_contact_id uuid,p_new_token_digest text,p_new_expires_at timestamptz,p_reason text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,sourcing,platform AS $$
DECLARE v_tenant uuid; v_principal uuid; v_old sourcing.external_task_grant%ROWTYPE; v_contact sourcing.supplier_contact%ROWTYPE; v_seq bigint; v_state text; v_project uuid; v_subscription uuid; v_guard bigint; BEGIN
  v_tenant:=nullif(current_setting('cpos.tenant_id',true),'')::uuid; v_principal:=nullif(current_setting('cpos.principal_id',true),'')::uuid;
  SELECT * INTO v_old FROM sourcing.external_task_grant WHERE tenant_id=v_tenant AND external_task_grant_id=p_old_grant_id FOR UPDATE;
  IF v_old.external_task_grant_id IS NULL THEN RAISE EXCEPTION 'grant unavailable'; END IF;
  SELECT e.project_id INTO v_project FROM sourcing.sourcing_event_version ev JOIN sourcing.sourcing_event e ON e.tenant_id=ev.tenant_id AND e.sourcing_event_id=ev.sourcing_event_id WHERE ev.tenant_id=v_tenant AND ev.sourcing_event_version_id=v_old.sourcing_event_version_id;
  IF v_project IS NULL OR NOT sourcing.command_context_valid(v_project) THEN RAISE EXCEPTION 'grant unavailable or unauthorized'; END IF;
  IF v_old.transfer_policy<>'CONTROLLED_REISSUE' THEN RAISE EXCEPTION 'grant transfer policy forbids reissue'; END IF;
  SELECT sequence,occurrence_kind INTO v_seq,v_state FROM sourcing.external_task_grant_occurrence WHERE external_task_grant_id=p_old_grant_id ORDER BY sequence DESC LIMIT 1 FOR UPDATE;
  IF v_state<>'ISSUED' THEN RAISE EXCEPTION 'only an active issued grant may transfer'; END IF;
  SELECT * INTO v_contact FROM sourcing.supplier_contact WHERE tenant_id=v_tenant AND supplier_contact_id=p_new_contact_id AND supplier_relationship_id=v_old.supplier_relationship_id AND contact_state='ACTIVE';
  IF v_contact.supplier_contact_id IS NULL THEN RAISE EXCEPTION 'replacement contact must be active within the same supplier relationship'; END IF;
  IF p_new_expires_at < v_old.due_at THEN RAISE EXCEPTION 'replacement grant cannot expire before task due date'; END IF;
  IF p_reason IS NULL OR length(btrim(p_reason))<3 THEN RAISE EXCEPTION 'transfer reason required'; END IF;
  SELECT s.tenant_subscription_id INTO v_subscription FROM platform.tenant_subscription s
  JOIN LATERAL(SELECT occurrence_kind FROM platform.subscription_lifecycle_occurrence o WHERE o.tenant_id=s.tenant_id AND o.tenant_subscription_id=s.tenant_subscription_id AND o.effective_at<=statement_timestamp() ORDER BY o.effective_at DESC,o.sequence DESC LIMIT 1) latest ON true
  WHERE s.tenant_id=v_tenant AND latest.occurrence_kind IN ('ACTIVATED','RESUMED') ORDER BY s.recorded_at DESC LIMIT 1;
  IF v_subscription IS NULL THEN RAISE EXCEPTION 'active subscription basis required for controlled reissue'; END IF;
  SELECT guard_version INTO v_guard FROM platform.tenant_entitlement_authority_guard WHERE tenant_id=v_tenant;
  INSERT INTO sourcing.external_task_grant(external_task_grant_id,tenant_id,sourcing_event_version_id,sourcing_event_member_id,supplier_relationship_id,supplier_contact_id,token_digest_sha256,permitted_operations,confidentiality_profile,assurance_profile,transfer_policy,due_at,expires_at,issue_time_subscription_id,issue_time_entitlement_guard_version,replaces_grant_id)
  VALUES(p_new_grant_id,v_tenant,v_old.sourcing_event_version_id,v_old.sourcing_event_member_id,v_old.supplier_relationship_id,p_new_contact_id,p_new_token_digest,v_old.permitted_operations,v_old.confidentiality_profile,v_old.assurance_profile,v_old.transfer_policy,v_old.due_at,p_new_expires_at,v_subscription,v_guard,p_old_grant_id);
  INSERT INTO sourcing.external_task_grant_occurrence(external_task_grant_occurrence_id,tenant_id,external_task_grant_id,sequence,occurrence_kind,reason)
  VALUES(gen_random_uuid(),v_tenant,p_old_grant_id,v_seq+1,'TRANSFER_REISSUED',p_reason);
  INSERT INTO sourcing.external_task_grant_occurrence(external_task_grant_occurrence_id,tenant_id,external_task_grant_id,sequence,occurrence_kind,reason)
  VALUES(gen_random_uuid(),v_tenant,p_new_grant_id,1,'ISSUED','controlled reissue from '||p_old_grant_id::text||': '||p_reason);
  RETURN p_new_grant_id;
END $$;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['supplier_relationship','supplier_contact','sourcing_event','response_schema_version','response_schema_field','external_submission_acceptance_policy','sourcing_event_version','sourcing_event_member','external_task_grant','external_task_grant_occurrence','invitation_occurrence','sourcing_issue_occurrence'] LOOP
    EXECUTE format('ALTER TABLE sourcing.%I ENABLE ROW LEVEL SECURITY',t);
    EXECUTE format('ALTER TABLE sourcing.%I FORCE ROW LEVEL SECURITY',t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON sourcing.%I',t);
    EXECUTE format('CREATE POLICY tenant_select ON sourcing.%I FOR SELECT TO cpos_procurement_runtime USING (tenant_id::text=nullif(current_setting(''cpos.tenant_id'',true),''''))',t);
    EXECUTE format('GRANT SELECT ON sourcing.%I TO cpos_procurement_runtime',t);
  END LOOP;
END $$;
GRANT SELECT ON sourcing.registered_semantic_field_key TO cpos_procurement_runtime;

REVOKE ALL ON ALL TABLES IN SCHEMA sourcing FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA sourcing FROM PUBLIC;
GRANT EXECUTE ON FUNCTION sourcing.create_supplier(uuid,uuid,text,text,text,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.add_supplier_contact(uuid,uuid,text,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.create_rfq_draft(uuid,uuid,uuid,uuid,uuid,uuid,text,text,timestamptz) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.add_response_schema_field(uuid,uuid,text,text,integer,text,text,jsonb) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.add_event_member(uuid,uuid,uuid,uuid) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.issue_event(uuid,uuid,bigint,uuid,uuid) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.issue_external_task_grant(uuid,uuid,uuid,text,text[],text,text,text,timestamptz) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.revoke_external_task_grant(uuid,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.record_invitation(uuid,uuid,uuid,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.create_addendum_draft(uuid,uuid,bigint,timestamptz,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION sourcing.transfer_external_task_grant(uuid,uuid,uuid,text,timestamptz,text) TO cpos_procurement_runtime;
