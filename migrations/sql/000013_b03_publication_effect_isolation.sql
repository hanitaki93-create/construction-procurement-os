-- B03 publication-effect isolation.
-- A source domain operation may already be DOMAIN_EFFECT_ESTABLISHED while an outbound
-- publication remains pre-effect/indeterminate. Publication therefore owns a distinct
-- child AsyncOperation/effect-position identity rather than reusing source domain state.

ALTER TABLE ops.publication_intent
  ADD COLUMN publication_async_operation_id uuid;
ALTER TABLE ops.publication_intent
  ADD CONSTRAINT publication_intent_async_operation_fk
  FOREIGN KEY (tenant_id, publication_async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id);
ALTER TABLE ops.publication_intent
  ALTER COLUMN publication_async_operation_id SET NOT NULL;
ALTER TABLE ops.publication_intent
  ADD CONSTRAINT publication_intent_async_operation_unique
  UNIQUE (tenant_id, publication_async_operation_id);

DROP FUNCTION ops.record_publication_intent_once(
  uuid, uuid, uuid, text, text, text, text, text, text, text, integer
);

CREATE OR REPLACE FUNCTION ops.record_publication_intent_once(
  p_publication_intent_id uuid,
  p_tenant_id uuid,
  p_source_domain_event_id uuid,
  p_publication_identity text,
  p_publication_request_fingerprint text,
  p_mapping_version text,
  p_integration_event_semantic_version text,
  p_disclosure_profile_version text,
  p_target_basis_fingerprint text,
  p_payload_content_identity text,
  p_retry_policy_version text,
  p_max_attempts integer
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  source_operation ops.async_operation%ROWTYPE;
  existing ops.publication_intent%ROWTYPE;
  intent_id uuid;
  publication_operation_id uuid;
  publish_job_id uuid;
BEGIN
  IF p_publication_request_fingerprint !~ '^[0-9a-f]{64}$' THEN
    RAISE EXCEPTION 'publication request fingerprint must be canonical sha256 hex';
  END IF;

  SELECT o.* INTO source_operation
  FROM ops.domain_event d
  JOIN ops.async_operation o
    ON o.tenant_id = d.tenant_id
   AND o.async_operation_id = d.source_async_operation_id
  WHERE d.tenant_id = p_tenant_id
    AND d.domain_event_id = p_source_domain_event_id
  FOR UPDATE OF o;
  IF NOT FOUND THEN RAISE EXCEPTION 'publication source domain event not found'; END IF;

  SELECT p.* INTO existing
  FROM ops.publication_intent p
  WHERE p.tenant_id = p_tenant_id
    AND p.publication_identity = p_publication_identity;

  IF FOUND THEN
    IF existing.source_domain_event_id <> p_source_domain_event_id
       OR existing.mapping_version <> p_mapping_version
       OR existing.integration_event_semantic_version <> p_integration_event_semantic_version
       OR existing.disclosure_profile_version <> p_disclosure_profile_version
       OR existing.target_basis_fingerprint <> p_target_basis_fingerprint
       OR existing.payload_content_identity <> p_payload_content_identity
       OR existing.retry_policy_version <> p_retry_policy_version THEN
      RAISE EXCEPTION 'PUBLICATION_INTENT_CONFLICT';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM ops.async_operation o
      WHERE o.tenant_id = p_tenant_id
        AND o.async_operation_id = existing.publication_async_operation_id
        AND o.request_fingerprint = p_publication_request_fingerprint
    ) THEN
      RAISE EXCEPTION 'PUBLICATION_INTENT_CONFLICT';
    END IF;
    RETURN existing.publication_intent_id;
  END IF;

  intent_id := COALESCE(p_publication_intent_id, uuidv7());
  publication_operation_id := uuidv7();

  INSERT INTO ops.async_operation (
    async_operation_id, tenant_id, principal_id, project_id, authority_context_id,
    operation_key, operation_version, logical_command_id, idempotency_scope,
    idempotency_key, request_fingerprint, input_semantic_version
  ) VALUES (
    publication_operation_id,
    p_tenant_id,
    source_operation.principal_id,
    source_operation.project_id,
    source_operation.authority_context_id,
    'ops.publication.dispatch.v1',
    1,
    'publication:' || intent_id::text,
    'publication-intent',
    intent_id::text,
    p_publication_request_fingerprint,
    'publication-intent-v1'
  );

  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, publication_operation_id, NULL, 1, 'PRE_ACCEPTANCE',
    'publication logical intent created from an immutable source DomainEvent'
  );
  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, publication_operation_id, NULL, 2, 'ACCEPTED_PRE_EFFECT',
    'immutable PublicationIntent accepted before any transport effect-bearing boundary'
  );

  INSERT INTO ops.publication_intent (
    publication_intent_id, tenant_id, publication_async_operation_id,
    source_domain_event_id, publication_identity, mapping_version,
    integration_event_semantic_version, disclosure_profile_version,
    target_basis_fingerprint, payload_content_identity, retry_policy_version
  ) VALUES (
    intent_id, p_tenant_id, publication_operation_id,
    p_source_domain_event_id, p_publication_identity, p_mapping_version,
    p_integration_event_semantic_version, p_disclosure_profile_version,
    p_target_basis_fingerprint, p_payload_content_identity, p_retry_policy_version
  );

  INSERT INTO ops.job (
    tenant_id, async_operation_id, lane, job_semantic_key,
    job_reader_version, event_reader_version, operational_status, max_attempts
  ) VALUES (
    p_tenant_id, publication_operation_id, 'connector-email', 'publication:' || intent_id::text,
    1, 1, 'QUEUED', p_max_attempts
  ) RETURNING job_id INTO publish_job_id;

  INSERT INTO ops.outbox_entry (tenant_id, publication_intent_id, job_id, reader_version)
  VALUES (p_tenant_id, intent_id, publish_job_id, 1);

  RETURN intent_id;
END
$$;

REVOKE ALL ON FUNCTION ops.record_publication_intent_once(
  uuid, uuid, uuid, text, text, text, text, text, text, text, text, integer
) FROM PUBLIC;
