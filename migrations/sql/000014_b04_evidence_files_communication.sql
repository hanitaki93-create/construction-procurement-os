-- B04 Evidence / Files / Issued Artifacts / Communication
-- Frozen basis: INV-035..045, INV-083/084/087 and P2.1 cross-store protocol.

CREATE SCHEMA IF NOT EXISTS evidence;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cpos_procurement_runtime') THEN
    CREATE ROLE cpos_procurement_runtime
      NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA platform, evidence TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION platform.current_principal_has_active_tenant_role(text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION platform.current_tenant_has_active_product_access() TO cpos_procurement_runtime;
GRANT SELECT ON platform.principal_authentication_identity TO cpos_procurement_runtime;

CREATE TABLE IF NOT EXISTS evidence.upload_session (
  upload_session_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  created_by_principal_id uuid NOT NULL,
  intended_evidence_class text NOT NULL CHECK (intended_evidence_class ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  intended_use text NOT NULL CHECK (length(intended_use) BETWEEN 1 AND 240),
  permitted_mime_types text[] NOT NULL CHECK (cardinality(permitted_mime_types) BETWEEN 1 AND 32),
  max_bytes bigint NOT NULL CHECK (max_bytes BETWEEN 1 AND 1073741824),
  max_file_count integer NOT NULL CHECK (max_file_count BETWEEN 1 AND 100),
  target_object_namespace text NOT NULL CHECK (target_object_namespace ~ '^[a-z0-9][a-z0-9/_-]{0,126}$'),
  expected_checksum_mode text NOT NULL CHECK (expected_checksum_mode = 'SHA256'),
  task_correlation_key text,
  expires_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, created_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  CHECK (expires_at > recorded_at),
  UNIQUE (tenant_id, upload_session_id)
);

CREATE TABLE IF NOT EXISTS evidence.upload_session_state_occurrence (
  upload_session_state_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  upload_session_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  state text NOT NULL CHECK (state IN (
    'RESERVED',
    'PAYLOAD_TRANSFER_IN_PROGRESS',
    'PAYLOAD_STORED_UNVERIFIED',
    'PAYLOAD_VERIFIED_QUARANTINED',
    'VALIDATION_IN_PROGRESS',
    'VALIDATION_BLOCKED_OR_FAILED',
    'CAPTURED_EVIDENCE_ONLY',
    'ACCEPTED_EVIDENCE_VERSION',
    'ABANDONED_OR_EXPIRED',
    'PAYLOAD_MISSING_RECONCILIATION_REQUIRED'
  )),
  reason text,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, upload_session_id)
    REFERENCES evidence.upload_session(tenant_id, upload_session_id),
  UNIQUE (upload_session_id, sequence),
  UNIQUE (tenant_id, upload_session_state_occurrence_id)
);

CREATE TABLE IF NOT EXISTS evidence.upload_payload_attempt (
  upload_payload_attempt_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  upload_session_id uuid NOT NULL,
  attempt_sequence bigint NOT NULL CHECK (attempt_sequence > 0),
  object_key text NOT NULL CHECK (length(object_key) BETWEEN 1 AND 512),
  provider_version_identity text NOT NULL CHECK (length(provider_version_identity) BETWEEN 1 AND 512),
  checksum_sha256 text NOT NULL CHECK (checksum_sha256 ~ '^[0-9a-f]{64}$'),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  mime_type text NOT NULL CHECK (length(mime_type) BETWEEN 1 AND 255),
  integrity_state text NOT NULL CHECK (integrity_state IN ('STORED_UNVERIFIED','VERIFIED','MISSING','CHECKSUM_MISMATCH','PROVIDER_VERSION_MISMATCH')),
  supersedes_payload_attempt_id uuid,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, upload_session_id)
    REFERENCES evidence.upload_session(tenant_id, upload_session_id),
  FOREIGN KEY (supersedes_payload_attempt_id)
    REFERENCES evidence.upload_payload_attempt(upload_payload_attempt_id),
  UNIQUE (upload_session_id, attempt_sequence),
  UNIQUE (tenant_id, upload_payload_attempt_id),
  UNIQUE (tenant_id, upload_session_id, object_key, provider_version_identity)
);

CREATE TABLE IF NOT EXISTS evidence.content_validation_observation (
  validation_observation_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  upload_payload_attempt_id uuid NOT NULL,
  observation_kind text NOT NULL CHECK (observation_kind IN ('CHECKSUM','MIME','ARCHIVE','MALWARE','PARSER')),
  tool_or_policy_version text NOT NULL CHECK (length(tool_or_policy_version) BETWEEN 1 AND 128),
  disposition text NOT NULL CHECK (disposition IN ('PASS','FAIL','BLOCKED','NOT_APPLICABLE','UNTRUSTED_SOURCE_EVIDENCE_ONLY')),
  detail text,
  observed_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, upload_payload_attempt_id)
    REFERENCES evidence.upload_payload_attempt(tenant_id, upload_payload_attempt_id),
  UNIQUE (tenant_id, validation_observation_id)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_record (
  evidence_record_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  evidence_class text NOT NULL CHECK (evidence_class ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  UNIQUE (tenant_id, evidence_record_id)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_version (
  evidence_version_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  evidence_record_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  upload_session_id uuid,
  upload_payload_attempt_id uuid,
  source_kind text NOT NULL CHECK (source_kind IN ('MANUAL_UPLOAD','EMAIL_CAPTURE','EXTERNAL_TASK','SYSTEM_GENERATED_REFERENCE')),
  source_locator text NOT NULL CHECK (length(source_locator) BETWEEN 1 AND 1000),
  provider_version_identity text,
  checksum_sha256 text,
  byte_size bigint,
  mime_type text,
  acceptance_basis text NOT NULL CHECK (length(acceptance_basis) BETWEEN 1 AND 1000),
  accepted_by_principal_id uuid NOT NULL,
  accepted_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, evidence_record_id)
    REFERENCES evidence.evidence_record(tenant_id, evidence_record_id),
  FOREIGN KEY (tenant_id, upload_session_id)
    REFERENCES evidence.upload_session(tenant_id, upload_session_id),
  FOREIGN KEY (tenant_id, upload_payload_attempt_id)
    REFERENCES evidence.upload_payload_attempt(tenant_id, upload_payload_attempt_id),
  FOREIGN KEY (tenant_id, accepted_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (evidence_record_id, version),
  UNIQUE (tenant_id, evidence_version_id),
  CHECK ((provider_version_identity IS NULL) = (checksum_sha256 IS NULL)),
  CHECK (checksum_sha256 IS NULL OR checksum_sha256 ~ '^[0-9a-f]{64}$'),
  CHECK (byte_size IS NULL OR byte_size > 0)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_binding (
  evidence_binding_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  evidence_version_id uuid NOT NULL,
  subject_kind text NOT NULL CHECK (subject_kind ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  subject_id uuid NOT NULL,
  binding_purpose text NOT NULL CHECK (length(binding_purpose) BETWEEN 1 AND 240),
  source_location text,
  bound_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, evidence_version_id)
    REFERENCES evidence.evidence_version(tenant_id, evidence_version_id),
  UNIQUE (tenant_id, evidence_binding_id),
  UNIQUE (tenant_id, evidence_version_id, subject_kind, subject_id, binding_purpose)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_reliance_occurrence (
  evidence_reliance_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  evidence_version_id uuid NOT NULL,
  reliance_kind text NOT NULL CHECK (reliance_kind IN ('REFERENCED','REVIEWED','RELIED_ON','RELIANCE_WITHDRAWN')),
  subject_kind text NOT NULL,
  subject_id uuid NOT NULL,
  rationale text,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, evidence_version_id)
    REFERENCES evidence.evidence_version(tenant_id, evidence_version_id),
  UNIQUE (tenant_id, evidence_reliance_occurrence_id)
);

CREATE TABLE IF NOT EXISTS evidence.artifact_build_intent (
  artifact_build_intent_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  artifact_kind text NOT NULL CHECK (artifact_kind ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  build_basis_fingerprint text NOT NULL CHECK (build_basis_fingerprint ~ '^sha256:[0-9a-f]{64}$'),
  requested_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, requested_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, artifact_build_intent_id)
);

CREATE TABLE IF NOT EXISTS evidence.artifact_build_member (
  artifact_build_member_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  artifact_build_intent_id uuid NOT NULL,
  member_kind text NOT NULL CHECK (member_kind ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  member_id uuid NOT NULL,
  member_version_identity text NOT NULL CHECK (length(member_version_identity) BETWEEN 1 AND 240),
  member_fingerprint text NOT NULL CHECK (member_fingerprint ~ '^sha256:[0-9a-f]{64}$'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, artifact_build_intent_id)
    REFERENCES evidence.artifact_build_intent(tenant_id, artifact_build_intent_id),
  UNIQUE (tenant_id, artifact_build_member_id),
  UNIQUE (artifact_build_intent_id, member_kind, member_id, member_version_identity)
);

CREATE TABLE IF NOT EXISTS evidence.issued_artifact_version (
  issued_artifact_version_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  artifact_build_intent_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  object_key text NOT NULL CHECK (length(object_key) BETWEEN 1 AND 512),
  provider_version_identity text NOT NULL CHECK (length(provider_version_identity) BETWEEN 1 AND 512),
  checksum_sha256 text NOT NULL CHECK (checksum_sha256 ~ '^[0-9a-f]{64}$'),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  mime_type text NOT NULL CHECK (length(mime_type) BETWEEN 1 AND 255),
  issued_by_principal_id uuid NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, artifact_build_intent_id)
    REFERENCES evidence.artifact_build_intent(tenant_id, artifact_build_intent_id),
  FOREIGN KEY (tenant_id, issued_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (artifact_build_intent_id, version),
  UNIQUE (tenant_id, issued_artifact_version_id),
  UNIQUE (tenant_id, object_key, provider_version_identity)
);

CREATE TABLE IF NOT EXISTS evidence.issued_artifact_member (
  issued_artifact_member_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  issued_artifact_version_id uuid NOT NULL,
  artifact_build_member_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, issued_artifact_version_id)
    REFERENCES evidence.issued_artifact_version(tenant_id, issued_artifact_version_id),
  FOREIGN KEY (tenant_id, artifact_build_member_id)
    REFERENCES evidence.artifact_build_member(tenant_id, artifact_build_member_id),
  UNIQUE (tenant_id, issued_artifact_member_id),
  UNIQUE (issued_artifact_version_id, artifact_build_member_id)
);

CREATE TABLE IF NOT EXISTS evidence.message (
  message_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  project_id uuid NOT NULL,
  authority_context_id uuid NOT NULL,
  message_kind text NOT NULL CHECK (message_kind IN ('TRANSMITTAL','RFQ_ISSUE','GENERAL_COMMUNICATION')),
  subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 500),
  issued_artifact_version_id uuid,
  created_by_principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, issued_artifact_version_id)
    REFERENCES evidence.issued_artifact_version(tenant_id, issued_artifact_version_id),
  FOREIGN KEY (tenant_id, created_by_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, message_id)
);

CREATE TABLE IF NOT EXISTS evidence.communication_occurrence (
  communication_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  message_id uuid NOT NULL,
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN (
    'ISSUE_RECORDED','DISPATCH_REQUESTED','PROVIDER_ACCEPTED','DELIVERED','READ_OBSERVED','ACKNOWLEDGED','RESPONSE_OBSERVED','DELIVERY_FAILED','CORRECTION_RECORDED'
  )),
  external_reference text,
  evidence_version_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, message_id) REFERENCES evidence.message(tenant_id, message_id),
  FOREIGN KEY (tenant_id, evidence_version_id)
    REFERENCES evidence.evidence_version(tenant_id, evidence_version_id),
  UNIQUE (tenant_id, communication_occurrence_id)
);

CREATE TABLE IF NOT EXISTS evidence.communication_satisfaction_snapshot (
  communication_satisfaction_snapshot_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  message_id uuid NOT NULL,
  rule_key text NOT NULL CHECK (rule_key ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  subject_kind text NOT NULL,
  subject_id uuid NOT NULL,
  satisfying_occurrence_id uuid NOT NULL,
  snapshot_basis text NOT NULL CHECK (length(snapshot_basis) BETWEEN 1 AND 1000),
  established_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, message_id) REFERENCES evidence.message(tenant_id, message_id),
  FOREIGN KEY (tenant_id, satisfying_occurrence_id)
    REFERENCES evidence.communication_occurrence(tenant_id, communication_occurrence_id),
  UNIQUE (tenant_id, communication_satisfaction_snapshot_id),
  UNIQUE (tenant_id, rule_key, subject_kind, subject_id)
);

CREATE TABLE IF NOT EXISTS evidence.domain_establishment_reference (
  domain_establishment_reference_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  communication_satisfaction_snapshot_id uuid NOT NULL,
  owning_domain text NOT NULL CHECK (owning_domain ~ '^[A-Z][A-Z0-9_]{1,62}$'),
  owning_subject_id uuid NOT NULL,
  owning_operation_key text NOT NULL CHECK (length(owning_operation_key) BETWEEN 1 AND 128),
  owning_domain_occurrence_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, communication_satisfaction_snapshot_id)
    REFERENCES evidence.communication_satisfaction_snapshot(tenant_id, communication_satisfaction_snapshot_id),
  UNIQUE (tenant_id, domain_establishment_reference_id),
  UNIQUE (communication_satisfaction_snapshot_id, owning_domain, owning_subject_id)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_hold_occurrence (
  evidence_hold_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  evidence_record_id uuid NOT NULL,
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('HOLD_PLACED','HOLD_RELEASED')),
  reason text NOT NULL CHECK (length(reason) BETWEEN 1 AND 1000),
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, evidence_record_id)
    REFERENCES evidence.evidence_record(tenant_id, evidence_record_id),
  UNIQUE (tenant_id, evidence_hold_occurrence_id)
);

CREATE TABLE IF NOT EXISTS evidence.evidence_disposition_occurrence (
  evidence_disposition_occurrence_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  evidence_record_id uuid NOT NULL,
  disposition text NOT NULL CHECK (disposition IN ('ACTIVE','REDACTED_PAYLOAD','TOMBSTONED_PAYLOAD','RETAINED_UNDER_HOLD')),
  reason text NOT NULL CHECK (length(reason) BETWEEN 1 AND 1000),
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, evidence_record_id)
    REFERENCES evidence.evidence_record(tenant_id, evidence_record_id),
  UNIQUE (tenant_id, evidence_disposition_occurrence_id)
);

CREATE TABLE IF NOT EXISTS evidence.recovery_set_manifest (
  recovery_set_manifest_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  database_recovery_identity text NOT NULL,
  object_inventory_checkpoint text NOT NULL,
  release_manifest_identity text NOT NULL,
  unresolved_session_count integer NOT NULL CHECK (unresolved_session_count >= 0),
  verification_summary text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, recovery_set_manifest_id)
);

-- Append-only enforcement for load-bearing evidence/history objects.
CREATE OR REPLACE FUNCTION evidence.reject_rewrite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, evidence
AS $$
BEGIN
  RAISE EXCEPTION '% is append-only', TG_TABLE_NAME;
END
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'upload_session','upload_session_state_occurrence','upload_payload_attempt','content_validation_observation',
    'evidence_record','evidence_version','evidence_binding','evidence_reliance_occurrence',
    'artifact_build_intent','artifact_build_member','issued_artifact_version','issued_artifact_member',
    'message','communication_occurrence','communication_satisfaction_snapshot','domain_establishment_reference',
    'evidence_hold_occurrence','evidence_disposition_occurrence','recovery_set_manifest'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS reject_rewrite ON evidence.%I', t);
    EXECUTE format('CREATE TRIGGER reject_rewrite BEFORE UPDATE OR DELETE ON evidence.%I FOR EACH ROW EXECUTE FUNCTION evidence.reject_rewrite()', t);
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION evidence.command_context_valid(p_project_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE
  v_tenant uuid;
BEGIN
  BEGIN
    v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  EXCEPTION WHEN invalid_text_representation THEN
    RETURN false;
  END;
  IF v_tenant IS NULL OR p_project_id IS NULL THEN RETURN false; END IF;
  RETURN platform.current_tenant_has_active_product_access()
    AND (
      platform.current_principal_has_active_tenant_role('OWNER')
      OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
    )
    AND EXISTS (
      SELECT 1 FROM platform.project p
      JOIN platform.project_version pv
        ON pv.tenant_id = p.tenant_id AND pv.project_id = p.project_id
      WHERE p.tenant_id = v_tenant
        AND p.project_id = p_project_id
        AND pv.lifecycle_state = 'ACTIVE'
        AND pv.effective_period @> statement_timestamp()
    );
END
$$;

CREATE OR REPLACE FUNCTION evidence.create_upload_session(
  p_upload_session_id uuid,
  p_project_id uuid,
  p_authority_context_id uuid,
  p_evidence_class text,
  p_intended_use text,
  p_permitted_mime_types text[],
  p_max_bytes bigint,
  p_max_file_count integer,
  p_target_object_namespace text,
  p_task_correlation_key text,
  p_expires_at timestamptz
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_principal uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_principal := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  IF NOT evidence.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'evidence command context is not authorized'; END IF;
  IF NOT EXISTS (SELECT 1 FROM platform.project p WHERE p.tenant_id=v_tenant AND p.project_id=p_project_id AND p.authority_context_id=p_authority_context_id) THEN
    RAISE EXCEPTION 'project authority context mismatch';
  END IF;
  INSERT INTO evidence.upload_session(
    upload_session_id,tenant_id,project_id,authority_context_id,created_by_principal_id,
    intended_evidence_class,intended_use,permitted_mime_types,max_bytes,max_file_count,
    target_object_namespace,expected_checksum_mode,task_correlation_key,expires_at
  ) VALUES (
    p_upload_session_id,v_tenant,p_project_id,p_authority_context_id,v_principal,
    p_evidence_class,p_intended_use,p_permitted_mime_types,p_max_bytes,p_max_file_count,
    p_target_object_namespace,'SHA256',p_task_correlation_key,p_expires_at
  );
  INSERT INTO evidence.upload_session_state_occurrence(
    upload_session_state_occurrence_id,tenant_id,upload_session_id,sequence,state
  ) VALUES (gen_random_uuid(),v_tenant,p_upload_session_id,1,'RESERVED');
  RETURN p_upload_session_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.record_upload_state(
  p_upload_session_id uuid,
  p_new_state text,
  p_reason text DEFAULT NULL
) RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid; v_seq bigint; v_current text; v_attempt uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  SELECT project_id INTO v_project FROM evidence.upload_session
    WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id FOR UPDATE;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'upload session unavailable or unauthorized'; END IF;
  SELECT sequence,state INTO v_seq,v_current
    FROM evidence.upload_session_state_occurrence
    WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id
    ORDER BY sequence DESC LIMIT 1 FOR UPDATE;
  IF v_current IN ('ACCEPTED_EVIDENCE_VERSION','ABANDONED_OR_EXPIRED') THEN RAISE EXCEPTION 'upload session is terminal'; END IF;
  IF NOT (
    (v_current='RESERVED' AND p_new_state IN ('PAYLOAD_TRANSFER_IN_PROGRESS','ABANDONED_OR_EXPIRED')) OR
    (v_current='PAYLOAD_TRANSFER_IN_PROGRESS' AND p_new_state IN ('PAYLOAD_STORED_UNVERIFIED','ABANDONED_OR_EXPIRED')) OR
    (v_current='PAYLOAD_STORED_UNVERIFIED' AND p_new_state IN ('PAYLOAD_VERIFIED_QUARANTINED','PAYLOAD_MISSING_RECONCILIATION_REQUIRED','ABANDONED_OR_EXPIRED')) OR
    (v_current='PAYLOAD_VERIFIED_QUARANTINED' AND p_new_state IN ('VALIDATION_IN_PROGRESS','PAYLOAD_MISSING_RECONCILIATION_REQUIRED')) OR
    (v_current='VALIDATION_IN_PROGRESS' AND p_new_state IN ('VALIDATION_BLOCKED_OR_FAILED','CAPTURED_EVIDENCE_ONLY','PAYLOAD_MISSING_RECONCILIATION_REQUIRED')) OR
    (v_current='VALIDATION_BLOCKED_OR_FAILED' AND p_new_state IN ('VALIDATION_IN_PROGRESS','ABANDONED_OR_EXPIRED')) OR
    (v_current='CAPTURED_EVIDENCE_ONLY' AND p_new_state IN ('ACCEPTED_EVIDENCE_VERSION','PAYLOAD_MISSING_RECONCILIATION_REQUIRED')) OR
    (v_current='PAYLOAD_MISSING_RECONCILIATION_REQUIRED' AND p_new_state IN ('PAYLOAD_STORED_UNVERIFIED','ABANDONED_OR_EXPIRED'))
  ) THEN RAISE EXCEPTION 'illegal upload session transition % -> %', v_current,p_new_state; END IF;
  IF p_new_state='PAYLOAD_VERIFIED_QUARANTINED' THEN
    IF NOT EXISTS(SELECT 1 FROM evidence.upload_payload_attempt p WHERE p.tenant_id=v_tenant AND p.upload_session_id=p_upload_session_id AND p.integrity_state='VERIFIED') THEN
      RAISE EXCEPTION 'verified payload identity/checksum must exist before quarantine acknowledgment';
    END IF;
  END IF;
  IF p_new_state='CAPTURED_EVIDENCE_ONLY' THEN
    SELECT p.upload_payload_attempt_id INTO v_attempt FROM evidence.upload_payload_attempt p
      WHERE p.tenant_id=v_tenant AND p.upload_session_id=p_upload_session_id AND p.integrity_state='VERIFIED'
      ORDER BY p.attempt_sequence DESC LIMIT 1;
    IF v_attempt IS NULL THEN RAISE EXCEPTION 'captured evidence requires verified payload'; END IF;
    IF NOT EXISTS(SELECT 1 FROM evidence.content_validation_observation o WHERE o.tenant_id=v_tenant AND o.upload_payload_attempt_id=v_attempt AND o.observation_kind='CHECKSUM' AND o.disposition='PASS')
       OR NOT EXISTS(SELECT 1 FROM evidence.content_validation_observation o WHERE o.tenant_id=v_tenant AND o.upload_payload_attempt_id=v_attempt AND o.observation_kind='MIME' AND o.disposition='PASS')
       OR NOT EXISTS(SELECT 1 FROM evidence.content_validation_observation o WHERE o.tenant_id=v_tenant AND o.upload_payload_attempt_id=v_attempt AND o.observation_kind='MALWARE' AND o.disposition='PASS') THEN
      RAISE EXCEPTION 'captured evidence requires positive checksum, MIME and malware validation observations';
    END IF;
    IF EXISTS(SELECT 1 FROM evidence.content_validation_observation o WHERE o.tenant_id=v_tenant AND o.upload_payload_attempt_id=v_attempt AND o.disposition IN ('FAIL','BLOCKED')) THEN
      RAISE EXCEPTION 'captured evidence cannot follow a blocking validation observation';
    END IF;
  END IF;
  v_seq := v_seq + 1;
  INSERT INTO evidence.upload_session_state_occurrence(upload_session_state_occurrence_id,tenant_id,upload_session_id,sequence,state,reason)
    VALUES(gen_random_uuid(),v_tenant,p_upload_session_id,v_seq,p_new_state,p_reason);
  RETURN v_seq;
END
$$;

CREATE OR REPLACE FUNCTION evidence.record_payload_attempt(
  p_attempt_id uuid,p_upload_session_id uuid,p_object_key text,p_provider_version_identity text,
  p_checksum_sha256 text,p_byte_size bigint,p_mime_type text,p_integrity_state text,p_supersedes uuid DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid; v_max_bytes bigint; v_mimes text[]; v_attempt_seq bigint; v_state text;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  SELECT project_id,max_bytes,permitted_mime_types INTO v_project,v_max_bytes,v_mimes
    FROM evidence.upload_session WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id FOR UPDATE;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'upload session unavailable or unauthorized'; END IF;
  SELECT state INTO v_state FROM evidence.upload_session_state_occurrence WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id ORDER BY sequence DESC LIMIT 1;
  IF v_state<>'PAYLOAD_STORED_UNVERIFIED' THEN RAISE EXCEPTION 'payload identity may be recorded only after PAYLOAD_STORED_UNVERIFIED'; END IF;
  IF p_byte_size > v_max_bytes THEN RAISE EXCEPTION 'payload exceeds upload session byte limit'; END IF;
  IF NOT (p_mime_type = ANY(v_mimes)) THEN RAISE EXCEPTION 'payload MIME type is not permitted'; END IF;
  SELECT coalesce(max(attempt_sequence),0)+1 INTO v_attempt_seq FROM evidence.upload_payload_attempt WHERE upload_session_id=p_upload_session_id;
  INSERT INTO evidence.upload_payload_attempt(
    upload_payload_attempt_id,tenant_id,upload_session_id,attempt_sequence,object_key,provider_version_identity,
    checksum_sha256,byte_size,mime_type,integrity_state,supersedes_payload_attempt_id
  ) VALUES(p_attempt_id,v_tenant,p_upload_session_id,v_attempt_seq,p_object_key,p_provider_version_identity,
    p_checksum_sha256,p_byte_size,p_mime_type,p_integrity_state,p_supersedes);
  RETURN p_attempt_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.record_validation_observation(
  p_observation_id uuid,p_upload_payload_attempt_id uuid,p_kind text,p_tool_version text,p_disposition text,p_detail text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  SELECT s.project_id INTO v_project
  FROM evidence.upload_payload_attempt p
  JOIN evidence.upload_session s ON s.tenant_id=p.tenant_id AND s.upload_session_id=p.upload_session_id
  WHERE p.tenant_id=v_tenant AND p.upload_payload_attempt_id=p_upload_payload_attempt_id;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'payload attempt unavailable or unauthorized'; END IF;
  INSERT INTO evidence.content_validation_observation(validation_observation_id,tenant_id,upload_payload_attempt_id,observation_kind,tool_or_policy_version,disposition,detail)
    VALUES(p_observation_id,v_tenant,p_upload_payload_attempt_id,p_kind,p_tool_version,p_disposition,p_detail);
  RETURN p_observation_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.accept_captured_evidence(
  p_evidence_record_id uuid,p_evidence_version_id uuid,p_upload_session_id uuid,p_acceptance_basis text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid; v_authority uuid; v_class text; v_principal uuid; v_state text; v_payload evidence.upload_payload_attempt%ROWTYPE; v_version bigint;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_principal := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  SELECT project_id,authority_context_id,intended_evidence_class INTO v_project,v_authority,v_class
    FROM evidence.upload_session WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id FOR UPDATE;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'upload session unavailable or unauthorized'; END IF;
  SELECT state INTO v_state FROM evidence.upload_session_state_occurrence
    WHERE upload_session_id=p_upload_session_id ORDER BY sequence DESC LIMIT 1;
  IF v_state <> 'CAPTURED_EVIDENCE_ONLY' THEN RAISE EXCEPTION 'evidence acceptance requires CAPTURED_EVIDENCE_ONLY'; END IF;
  SELECT * INTO v_payload FROM evidence.upload_payload_attempt
    WHERE tenant_id=v_tenant AND upload_session_id=p_upload_session_id AND integrity_state='VERIFIED'
    ORDER BY attempt_sequence DESC LIMIT 1;
  IF v_payload.upload_payload_attempt_id IS NULL THEN RAISE EXCEPTION 'accepted evidence requires exact verified payload identity'; END IF;
  INSERT INTO evidence.evidence_record(evidence_record_id,tenant_id,project_id,authority_context_id,evidence_class)
    VALUES(p_evidence_record_id,v_tenant,v_project,v_authority,v_class)
    ON CONFLICT (evidence_record_id) DO NOTHING;
  SELECT coalesce(max(version),0)+1 INTO v_version FROM evidence.evidence_version WHERE evidence_record_id=p_evidence_record_id;
  INSERT INTO evidence.evidence_version(
    evidence_version_id,tenant_id,evidence_record_id,version,upload_session_id,upload_payload_attempt_id,
    source_kind,source_locator,provider_version_identity,checksum_sha256,byte_size,mime_type,acceptance_basis,accepted_by_principal_id
  ) VALUES(
    p_evidence_version_id,v_tenant,p_evidence_record_id,v_version,p_upload_session_id,v_payload.upload_payload_attempt_id,
    'MANUAL_UPLOAD',v_payload.object_key,v_payload.provider_version_identity,v_payload.checksum_sha256,v_payload.byte_size,v_payload.mime_type,
    p_acceptance_basis,v_principal
  );
  PERFORM evidence.record_upload_state(p_upload_session_id,'ACCEPTED_EVIDENCE_VERSION','separate evidence acceptance command completed');
  RETURN p_evidence_version_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.create_artifact_build_intent(
  p_intent_id uuid,p_project_id uuid,p_authority_context_id uuid,p_artifact_kind text,p_basis_fingerprint text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_principal uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_principal := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  IF NOT evidence.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'artifact command context is not authorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM platform.project WHERE tenant_id=v_tenant AND project_id=p_project_id AND authority_context_id=p_authority_context_id) THEN RAISE EXCEPTION 'project authority context mismatch'; END IF;
  INSERT INTO evidence.artifact_build_intent(artifact_build_intent_id,tenant_id,project_id,authority_context_id,artifact_kind,build_basis_fingerprint,requested_by_principal_id)
    VALUES(p_intent_id,v_tenant,p_project_id,p_authority_context_id,p_artifact_kind,p_basis_fingerprint,v_principal);
  RETURN p_intent_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.add_artifact_build_member(
  p_member_id uuid,p_intent_id uuid,p_member_kind text,p_subject_id uuid,p_version_identity text,p_fingerprint text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  SELECT project_id INTO v_project FROM evidence.artifact_build_intent WHERE tenant_id=v_tenant AND artifact_build_intent_id=p_intent_id;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'artifact build intent unavailable or unauthorized'; END IF;
  INSERT INTO evidence.artifact_build_member(artifact_build_member_id,tenant_id,artifact_build_intent_id,member_kind,member_id,member_version_identity,member_fingerprint)
    VALUES(p_member_id,v_tenant,p_intent_id,p_member_kind,p_subject_id,p_version_identity,p_fingerprint);
  RETURN p_member_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.issue_artifact_version(
  p_issued_id uuid,p_intent_id uuid,p_object_key text,p_provider_version_identity text,p_checksum text,p_byte_size bigint,p_mime_type text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_project uuid; v_principal uuid; v_version bigint;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_principal := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  SELECT project_id INTO v_project FROM evidence.artifact_build_intent WHERE tenant_id=v_tenant AND artifact_build_intent_id=p_intent_id FOR UPDATE;
  IF v_project IS NULL OR NOT evidence.command_context_valid(v_project) THEN RAISE EXCEPTION 'artifact build intent unavailable or unauthorized'; END IF;
  IF NOT EXISTS(SELECT 1 FROM evidence.artifact_build_member WHERE tenant_id=v_tenant AND artifact_build_intent_id=p_intent_id) THEN RAISE EXCEPTION 'issued artifact requires exact non-empty member manifest'; END IF;
  SELECT coalesce(max(version),0)+1 INTO v_version FROM evidence.issued_artifact_version WHERE artifact_build_intent_id=p_intent_id;
  INSERT INTO evidence.issued_artifact_version(issued_artifact_version_id,tenant_id,artifact_build_intent_id,version,object_key,provider_version_identity,checksum_sha256,byte_size,mime_type,issued_by_principal_id)
    VALUES(p_issued_id,v_tenant,p_intent_id,v_version,p_object_key,p_provider_version_identity,p_checksum,p_byte_size,p_mime_type,v_principal);
  INSERT INTO evidence.issued_artifact_member(issued_artifact_member_id,tenant_id,issued_artifact_version_id,artifact_build_member_id)
    SELECT gen_random_uuid(),v_tenant,p_issued_id,artifact_build_member_id FROM evidence.artifact_build_member WHERE tenant_id=v_tenant AND artifact_build_intent_id=p_intent_id;
  RETURN p_issued_id;
END
$$;

CREATE OR REPLACE FUNCTION evidence.record_message(
  p_message_id uuid,p_project_id uuid,p_authority_context_id uuid,p_kind text,p_subject text,p_issued_artifact_version_id uuid
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, evidence, platform
AS $$
DECLARE v_tenant uuid; v_principal uuid;
BEGIN
  v_tenant := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
  v_principal := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  IF NOT evidence.command_context_valid(p_project_id) THEN RAISE EXCEPTION 'communication context is not authorized'; END IF;
  IF p_issued_artifact_version_id IS NOT NULL AND NOT EXISTS(SELECT 1 FROM evidence.issued_artifact_version WHERE tenant_id=v_tenant AND issued_artifact_version_id=p_issued_artifact_version_id) THEN RAISE EXCEPTION 'message artifact version is unavailable'; END IF;
  INSERT INTO evidence.message(message_id,tenant_id,project_id,authority_context_id,message_kind,subject,issued_artifact_version_id,created_by_principal_id)
    VALUES(p_message_id,v_tenant,p_project_id,p_authority_context_id,p_kind,p_subject,p_issued_artifact_version_id,v_principal);
  INSERT INTO evidence.communication_occurrence(communication_occurrence_id,tenant_id,message_id,occurrence_kind)
    VALUES(gen_random_uuid(),v_tenant,p_message_id,'ISSUE_RECORDED');
  RETURN p_message_id;
END
$$;

-- RLS read isolation. Runtime writes only through bounded protocol functions above.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'upload_session','upload_session_state_occurrence','upload_payload_attempt','content_validation_observation',
    'evidence_record','evidence_version','evidence_binding','evidence_reliance_occurrence','artifact_build_intent','artifact_build_member',
    'issued_artifact_version','issued_artifact_member','message','communication_occurrence','communication_satisfaction_snapshot',
    'domain_establishment_reference','evidence_hold_occurrence','evidence_disposition_occurrence','recovery_set_manifest'
  ] LOOP
    EXECUTE format('ALTER TABLE evidence.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE evidence.%I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_select ON evidence.%I', t);
    EXECUTE format('CREATE POLICY tenant_select ON evidence.%I FOR SELECT TO cpos_procurement_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))', t);
    EXECUTE format('GRANT SELECT ON evidence.%I TO cpos_procurement_runtime', t);
  END LOOP;
END
$$;

REVOKE ALL ON ALL TABLES IN SCHEMA evidence FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA evidence FROM PUBLIC;
GRANT EXECUTE ON FUNCTION evidence.create_upload_session(uuid,uuid,uuid,text,text,text[],bigint,integer,text,text,timestamptz) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.record_upload_state(uuid,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.record_payload_attempt(uuid,uuid,text,text,text,bigint,text,text,uuid) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.record_validation_observation(uuid,uuid,text,text,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.accept_captured_evidence(uuid,uuid,uuid,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.create_artifact_build_intent(uuid,uuid,uuid,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.add_artifact_build_member(uuid,uuid,text,uuid,text,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.issue_artifact_version(uuid,uuid,text,text,text,bigint,text) TO cpos_procurement_runtime;
GRANT EXECUTE ON FUNCTION evidence.record_message(uuid,uuid,uuid,text,text,uuid) TO cpos_procurement_runtime;
