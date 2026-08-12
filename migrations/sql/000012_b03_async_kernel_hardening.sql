-- B03 pre-commit hardening of the async kernel introduced by 000011.
-- This remains forward-only migration history: no earlier migration is rewritten.

ALTER TABLE ops.job
  ADD COLUMN job_semantic_key text NOT NULL DEFAULT 'primary'
    CHECK (char_length(btrim(job_semantic_key)) BETWEEN 1 AND 400);
ALTER TABLE ops.job ALTER COLUMN job_semantic_key DROP DEFAULT;
ALTER TABLE ops.job DROP CONSTRAINT job_tenant_id_async_operation_id_lane_key;
ALTER TABLE ops.job
  ADD CONSTRAINT job_semantic_identity_unique
  UNIQUE (tenant_id, async_operation_id, lane, job_semantic_key);

CREATE TABLE ops.integration_event (
  integration_event_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  publication_intent_id uuid NOT NULL,
  semantic_version text NOT NULL CHECK (char_length(btrim(semantic_version)) BETWEEN 1 AND 120),
  payload_fingerprint text NOT NULL CHECK (payload_fingerprint ~ '^[0-9a-f]{64}$'),
  payload_content_identity text NOT NULL CHECK (char_length(btrim(payload_content_identity)) BETWEEN 1 AND 500),
  semantic_payload jsonb NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, publication_intent_id)
    REFERENCES ops.publication_intent(tenant_id, publication_intent_id),
  UNIQUE (tenant_id, integration_event_id),
  UNIQUE (tenant_id, publication_intent_id)
);

CREATE TRIGGER integration_event_immutable
BEFORE UPDATE OR DELETE ON ops.integration_event
FOR EACH ROW EXECUTE FUNCTION ops.reject_append_only_rewrite();

CREATE OR REPLACE FUNCTION ops.accept_async_operation(
  p_async_operation_id uuid,
  p_tenant_id uuid,
  p_principal_id uuid,
  p_project_id uuid,
  p_authority_context_id uuid,
  p_operation_key text,
  p_operation_version integer,
  p_logical_command_id text,
  p_idempotency_scope text,
  p_idempotency_key text,
  p_request_fingerprint text,
  p_input_semantic_version text,
  p_lane text,
  p_max_attempts integer
)
RETURNS TABLE(disposition text, accepted_async_operation_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops, platform
AS $$
DECLARE
  existing ops.async_operation%ROWTYPE;
  execution_tenant_id text;
  execution_principal_id text;
  chosen_id uuid;
BEGIN
  execution_tenant_id := nullif(current_setting('cpos.tenant_id', true), '');
  execution_principal_id := nullif(current_setting('cpos.principal_id', true), '');

  IF execution_tenant_id IS NULL OR execution_tenant_id <> p_tenant_id::text THEN
    RAISE EXCEPTION 'async operation tenant does not match execution context';
  END IF;
  IF execution_principal_id IS NULL OR execution_principal_id <> p_principal_id::text THEN
    RAISE EXCEPTION 'async operation principal does not match execution context';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM ops.worker_lane_policy p WHERE p.lane = p_lane) THEN
    RAISE EXCEPTION 'unknown worker lane';
  END IF;

  SELECT o.* INTO existing
  FROM ops.async_operation o
  WHERE o.tenant_id = p_tenant_id
    AND o.operation_key = p_operation_key
    AND o.operation_version = p_operation_version
    AND (
      o.logical_command_id = p_logical_command_id
      OR (o.idempotency_scope = p_idempotency_scope AND o.idempotency_key = p_idempotency_key)
    )
  FOR UPDATE;

  IF FOUND THEN
    IF existing.logical_command_id <> p_logical_command_id
       OR existing.idempotency_scope <> p_idempotency_scope
       OR existing.idempotency_key <> p_idempotency_key
       OR existing.request_fingerprint <> p_request_fingerprint
       OR existing.principal_id <> p_principal_id
       OR existing.project_id IS DISTINCT FROM p_project_id
       OR existing.authority_context_id IS DISTINCT FROM p_authority_context_id
       OR existing.input_semantic_version <> p_input_semantic_version THEN
      RAISE EXCEPTION 'IDEMPOTENCY_CONFLICT';
    END IF;
    disposition := 'DUPLICATE_ACCEPTED';
    accepted_async_operation_id := existing.async_operation_id;
    RETURN NEXT;
    RETURN;
  END IF;

  chosen_id := COALESCE(p_async_operation_id, uuidv7());

  BEGIN
    INSERT INTO ops.async_operation (
      async_operation_id, tenant_id, principal_id, project_id, authority_context_id,
      operation_key, operation_version, logical_command_id, idempotency_scope,
      idempotency_key, request_fingerprint, input_semantic_version
    ) VALUES (
      chosen_id, p_tenant_id, p_principal_id, p_project_id, p_authority_context_id,
      p_operation_key, p_operation_version, p_logical_command_id, p_idempotency_scope,
      p_idempotency_key, p_request_fingerprint, p_input_semantic_version
    );
  EXCEPTION
    WHEN unique_violation THEN
      SELECT o.* INTO existing
      FROM ops.async_operation o
      WHERE o.tenant_id = p_tenant_id
        AND o.operation_key = p_operation_key
        AND o.operation_version = p_operation_version
        AND (
          o.logical_command_id = p_logical_command_id
          OR (o.idempotency_scope = p_idempotency_scope AND o.idempotency_key = p_idempotency_key)
        )
      FOR UPDATE;

      IF NOT FOUND
         OR existing.logical_command_id <> p_logical_command_id
         OR existing.idempotency_scope <> p_idempotency_scope
         OR existing.idempotency_key <> p_idempotency_key
         OR existing.request_fingerprint <> p_request_fingerprint
         OR existing.principal_id <> p_principal_id
         OR existing.project_id IS DISTINCT FROM p_project_id
         OR existing.authority_context_id IS DISTINCT FROM p_authority_context_id
         OR existing.input_semantic_version <> p_input_semantic_version THEN
        RAISE EXCEPTION 'IDEMPOTENCY_CONFLICT';
      END IF;
      disposition := 'DUPLICATE_ACCEPTED';
      accepted_async_operation_id := existing.async_operation_id;
      RETURN NEXT;
      RETURN;
  END;

  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, chosen_id, NULL, 1, 'PRE_ACCEPTANCE',
    'logical request observed before durable acceptance'
  );
  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, chosen_id, NULL, 2, 'ACCEPTED_PRE_EFFECT',
    'durable acceptance committed before any effect-bearing boundary'
  );

  INSERT INTO ops.job (
    tenant_id, async_operation_id, lane, job_semantic_key,
    job_reader_version, event_reader_version, max_attempts
  ) VALUES (p_tenant_id, chosen_id, p_lane, 'primary', 1, 1, p_max_attempts);

  disposition := 'ACCEPTED';
  accepted_async_operation_id := chosen_id;
  RETURN NEXT;
END
$$;

CREATE OR REPLACE FUNCTION ops.claim_jobs(
  p_lane text,
  p_worker_id text,
  p_requested_lease_seconds integer,
  p_requested_batch integer
)
RETURNS TABLE(
  claimed_job_id uuid,
  claimed_tenant_id uuid,
  claimed_async_operation_id uuid,
  claimed_fencing_token bigint,
  claimed_attempt_number integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  lane_policy ops.worker_lane_policy%ROWTYPE;
  picked record;
  effective_batch integer;
  effective_lease integer;
BEGIN
  IF p_worker_id IS NULL OR btrim(p_worker_id) = '' THEN
    RAISE EXCEPTION 'worker_id is required';
  END IF;

  SELECT p.* INTO lane_policy
  FROM ops.worker_lane_policy p
  WHERE p.lane = p_lane;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown worker lane';
  END IF;

  -- Claim arbitration is serialized per physical lane. This deliberately favors a
  -- short, provably quota-safe critical section over an unsafe approximate quota.
  PERFORM pg_advisory_xact_lock(hashtextextended('cpos:b03:claim:' || p_lane, 0));

  effective_batch := LEAST(GREATEST(p_requested_batch, 1), lane_policy.max_claim_batch);
  effective_lease := LEAST(GREATEST(p_requested_lease_seconds, 1), lane_policy.max_lease_seconds);

  FOR picked IN
    WITH active AS MATERIALIZED (
      SELECT j.tenant_id, count(*)::integer AS active_count
      FROM ops.job j
      WHERE j.lane = p_lane
        AND j.operational_status = 'RUNNING'
        AND j.lease_expires_at > clock_timestamp()
      GROUP BY j.tenant_id
    ),
    eligible AS MATERIALIZED (
      SELECT
        j.job_id,
        j.tenant_id,
        row_number() OVER (
          PARTITION BY j.tenant_id
          ORDER BY j.priority DESC, j.available_at, j.recorded_at, j.job_id
        ) AS tenant_round,
        GREATEST(
          COALESCE(q.max_inflight, lane_policy.default_tenant_max_inflight)
          - COALESCE(a.active_count, 0),
          0
        ) AS remaining_quota
      FROM ops.job j
      LEFT JOIN ops.tenant_lane_quota q
        ON q.tenant_id = j.tenant_id AND q.lane = j.lane
      LEFT JOIN active a ON a.tenant_id = j.tenant_id
      WHERE j.lane = p_lane
        AND j.operational_status = 'QUEUED'
        AND j.available_at <= clock_timestamp()
        AND j.attempt_count < j.max_attempts
    )
    SELECT j.job_id, j.tenant_id
    FROM ops.job j
    JOIN eligible e ON e.job_id = j.job_id AND e.tenant_id = j.tenant_id
    WHERE e.tenant_round <= e.remaining_quota
    ORDER BY e.tenant_round, j.available_at, j.priority DESC, j.tenant_id, j.job_id
    LIMIT effective_batch
    FOR UPDATE OF j SKIP LOCKED
  LOOP
    UPDATE ops.job j
    SET operational_status = 'RUNNING',
        lease_owner = p_worker_id,
        lease_expires_at = clock_timestamp() + make_interval(secs => effective_lease),
        fencing_token = j.fencing_token + 1,
        attempt_count = j.attempt_count + 1,
        last_error_class = NULL
    WHERE j.job_id = picked.job_id AND j.tenant_id = picked.tenant_id
    RETURNING j.job_id, j.tenant_id, j.async_operation_id, j.fencing_token, j.attempt_count
    INTO claimed_job_id, claimed_tenant_id, claimed_async_operation_id,
         claimed_fencing_token, claimed_attempt_number;

    INSERT INTO ops.job_attempt (
      tenant_id, job_id, attempt_number, worker_id, fencing_token
    ) VALUES (
      claimed_tenant_id, claimed_job_id, claimed_attempt_number, p_worker_id, claimed_fencing_token
    );

    RETURN NEXT;
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION ops.record_domain_event_once(
  p_domain_event_id uuid,
  p_tenant_id uuid,
  p_async_operation_id uuid,
  p_event_family text,
  p_event_semantic_key text,
  p_event_version integer,
  p_payload_fingerprint text,
  p_payload jsonb,
  p_occurred_at timestamptz
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  existing ops.domain_event%ROWTYPE;
  current_position text;
  current_sequence bigint;
  chosen_id uuid;
BEGIN
  PERFORM 1
  FROM ops.async_operation o
  WHERE o.tenant_id = p_tenant_id AND o.async_operation_id = p_async_operation_id
  FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'async operation not found'; END IF;

  SELECT d.* INTO existing
  FROM ops.domain_event d
  WHERE d.tenant_id = p_tenant_id
    AND d.source_async_operation_id = p_async_operation_id
    AND d.event_family = p_event_family
    AND d.event_semantic_key = p_event_semantic_key;

  IF FOUND THEN
    IF existing.event_version <> p_event_version
       OR existing.payload_fingerprint <> p_payload_fingerprint THEN
      RAISE EXCEPTION 'DOMAIN_EVENT_IDEMPOTENCY_CONFLICT';
    END IF;
    RETURN existing.domain_event_id;
  END IF;

  SELECT e.effect_position, e.sequence INTO current_position, current_sequence
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = p_tenant_id
    AND e.async_operation_id = p_async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;

  IF current_position NOT IN ('ACCEPTED_PRE_EFFECT', 'EFFECT_INDETERMINATE', 'EXTERNAL_EFFECT_EMITTED') THEN
    RAISE EXCEPTION 'domain event cannot establish effect from current position %', current_position;
  END IF;

  chosen_id := COALESCE(p_domain_event_id, uuidv7());
  INSERT INTO ops.domain_event (
    domain_event_id, tenant_id, source_async_operation_id, event_family,
    event_semantic_key, event_version, payload_fingerprint, payload, occurred_at
  ) VALUES (
    chosen_id, p_tenant_id, p_async_operation_id, p_event_family,
    p_event_semantic_key, p_event_version, p_payload_fingerprint, p_payload, p_occurred_at
  );

  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, p_async_operation_id, NULL, current_sequence + 1,
    'DOMAIN_EFFECT_ESTABLISHED', 'authoritative domain event established under stable semantic identity'
  );

  RETURN chosen_id;
END
$$;

CREATE OR REPLACE FUNCTION ops.record_publication_intent_once(
  p_publication_intent_id uuid,
  p_tenant_id uuid,
  p_source_domain_event_id uuid,
  p_publication_identity text,
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
  existing ops.publication_intent%ROWTYPE;
  operation_id uuid;
  intent_id uuid;
  publish_job_id uuid;
BEGIN
  SELECT d.source_async_operation_id INTO operation_id
  FROM ops.domain_event d
  WHERE d.tenant_id = p_tenant_id AND d.domain_event_id = p_source_domain_event_id
  FOR UPDATE;
  IF operation_id IS NULL THEN RAISE EXCEPTION 'publication source domain event not found'; END IF;

  SELECT p.* INTO existing
  FROM ops.publication_intent p
  WHERE p.tenant_id = p_tenant_id AND p.publication_identity = p_publication_identity;

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
    RETURN existing.publication_intent_id;
  END IF;

  intent_id := COALESCE(p_publication_intent_id, uuidv7());
  INSERT INTO ops.publication_intent (
    publication_intent_id, tenant_id, source_domain_event_id, publication_identity,
    mapping_version, integration_event_semantic_version, disclosure_profile_version,
    target_basis_fingerprint, payload_content_identity, retry_policy_version
  ) VALUES (
    intent_id, p_tenant_id, p_source_domain_event_id, p_publication_identity,
    p_mapping_version, p_integration_event_semantic_version, p_disclosure_profile_version,
    p_target_basis_fingerprint, p_payload_content_identity, p_retry_policy_version
  );

  INSERT INTO ops.job (
    tenant_id, async_operation_id, lane, job_semantic_key,
    job_reader_version, event_reader_version, operational_status, max_attempts
  ) VALUES (
    p_tenant_id, operation_id, 'connector-email', 'publication:' || intent_id::text,
    1, 1, 'QUEUED', p_max_attempts
  ) RETURNING job_id INTO publish_job_id;

  INSERT INTO ops.outbox_entry (tenant_id, publication_intent_id, job_id, reader_version)
  VALUES (p_tenant_id, intent_id, publish_job_id, 1);

  RETURN intent_id;
END
$$;

CREATE OR REPLACE FUNCTION ops.materialize_integration_event_once(
  p_integration_event_id uuid,
  p_tenant_id uuid,
  p_publication_intent_id uuid,
  p_semantic_version text,
  p_payload_fingerprint text,
  p_payload_content_identity text,
  p_semantic_payload jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  intent ops.publication_intent%ROWTYPE;
  existing ops.integration_event%ROWTYPE;
  chosen_id uuid;
BEGIN
  SELECT p.* INTO intent
  FROM ops.publication_intent p
  WHERE p.tenant_id = p_tenant_id AND p.publication_intent_id = p_publication_intent_id
  FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'publication intent not found'; END IF;

  IF intent.integration_event_semantic_version <> p_semantic_version
     OR intent.payload_content_identity <> p_payload_content_identity THEN
    RAISE EXCEPTION 'integration event does not match immutable publication basis';
  END IF;

  SELECT i.* INTO existing
  FROM ops.integration_event i
  WHERE i.tenant_id = p_tenant_id AND i.publication_intent_id = p_publication_intent_id;
  IF FOUND THEN
    IF existing.semantic_version <> p_semantic_version
       OR existing.payload_fingerprint <> p_payload_fingerprint
       OR existing.payload_content_identity <> p_payload_content_identity THEN
      RAISE EXCEPTION 'INTEGRATION_EVENT_CONFLICT';
    END IF;
    RETURN existing.integration_event_id;
  END IF;

  chosen_id := COALESCE(p_integration_event_id, uuidv7());
  INSERT INTO ops.integration_event (
    integration_event_id, tenant_id, publication_intent_id, semantic_version,
    payload_fingerprint, payload_content_identity, semantic_payload
  ) VALUES (
    chosen_id, p_tenant_id, p_publication_intent_id, p_semantic_version,
    p_payload_fingerprint, p_payload_content_identity, p_semantic_payload
  );
  RETURN chosen_id;
END
$$;

CREATE OR REPLACE FUNCTION ops.begin_transport_attempt(
  p_job_id uuid,
  p_worker_id text,
  p_fencing_token bigint,
  p_publication_intent_id uuid,
  p_transport_attempt_id uuid,
  p_attempt_number integer
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  job_row ops.job%ROWTYPE;
  existing ops.transport_attempt%ROWTYPE;
  chosen_id uuid;
BEGIN
  SELECT j.* INTO job_row FROM ops.job j WHERE j.job_id = p_job_id FOR UPDATE;
  IF NOT FOUND
     OR job_row.operational_status <> 'RUNNING'
     OR job_row.lease_owner IS DISTINCT FROM p_worker_id
     OR job_row.fencing_token <> p_fencing_token
     OR job_row.lease_expires_at <= clock_timestamp() THEN
    RAISE EXCEPTION 'STALE_WORKER_FENCED';
  END IF;

  IF p_attempt_number <> job_row.attempt_count THEN
    RAISE EXCEPTION 'transport attempt number must match the active fenced job attempt';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM ops.outbox_entry o
    WHERE o.tenant_id = job_row.tenant_id
      AND o.job_id = job_row.job_id
      AND o.publication_intent_id = p_publication_intent_id
  ) THEN
    RAISE EXCEPTION 'transport attempt does not match the claimed outbox publication';
  END IF;

  SELECT t.* INTO existing
  FROM ops.transport_attempt t
  WHERE t.tenant_id = job_row.tenant_id
    AND t.publication_intent_id = p_publication_intent_id
    AND t.attempt_number = p_attempt_number;
  IF FOUND THEN RETURN existing.transport_attempt_id; END IF;

  -- Persist uncertainty BEFORE the caller may cross the external effect boundary.
  UPDATE ops.job_attempt a
  SET effect_boundary_started_at = COALESCE(a.effect_boundary_started_at, clock_timestamp())
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'active job attempt not found'; END IF;

  chosen_id := COALESCE(p_transport_attempt_id, uuidv7());
  INSERT INTO ops.transport_attempt (
    transport_attempt_id, tenant_id, publication_intent_id, attempt_number,
    transport_state, started_at
  ) VALUES (
    chosen_id, job_row.tenant_id, p_publication_intent_id, p_attempt_number,
    'TRANSMISSION_STARTED', clock_timestamp()
  );
  RETURN chosen_id;
END
$$;

CREATE OR REPLACE FUNCTION ops.resolve_indeterminate_effect(
  p_async_operation_id uuid,
  p_tenant_id uuid,
  p_resolution text,
  p_evidence_basis text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  current_position text;
  current_sequence bigint;
  next_position text;
  obligation record;
  next_reconciliation_sequence bigint;
BEGIN
  PERFORM 1 FROM ops.async_operation o
  WHERE o.tenant_id = p_tenant_id AND o.async_operation_id = p_async_operation_id
  FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'async operation not found'; END IF;

  SELECT e.effect_position, e.sequence INTO current_position, current_sequence
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = p_tenant_id
    AND e.async_operation_id = p_async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;

  IF current_position <> 'EFFECT_INDETERMINATE' THEN
    RAISE EXCEPTION 'only EFFECT_INDETERMINATE can use reconciliation resolution';
  END IF;

  IF p_resolution IN ('DOMAIN_EFFECT_ESTABLISHED', 'EXTERNAL_EFFECT_EMITTED', 'TERMINAL_NO_EFFECT') THEN
    next_position := p_resolution;
  ELSE
    RAISE EXCEPTION 'resolution requires positive effect/no-effect evidence';
  END IF;

  INSERT INTO ops.effect_position_occurrence (
    tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
  ) VALUES (
    p_tenant_id, p_async_operation_id, NULL, current_sequence + 1, next_position, p_evidence_basis
  );

  FOR obligation IN
    SELECT r.* FROM ops.reconciliation_obligation r
    WHERE r.tenant_id = p_tenant_id AND r.async_operation_id = p_async_operation_id
    ORDER BY r.reconciliation_obligation_id
    FOR UPDATE
  LOOP
    SELECT COALESCE(max(o.sequence), 0) + 1 INTO next_reconciliation_sequence
    FROM ops.reconciliation_occurrence o
    WHERE o.tenant_id = p_tenant_id
      AND o.reconciliation_obligation_id = obligation.reconciliation_obligation_id;

    INSERT INTO ops.reconciliation_occurrence (
      tenant_id, reconciliation_obligation_id, sequence, state, evidence_basis
    ) VALUES (
      p_tenant_id, obligation.reconciliation_obligation_id, next_reconciliation_sequence,
      CASE WHEN next_position = 'TERMINAL_NO_EFFECT'
        THEN 'RESOLVED_NO_EFFECT_CONFIRMED' ELSE 'RESOLVED_EFFECT_CONFIRMED' END,
      p_evidence_basis
    );
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION ops.accept_unresolved_external_position(
  p_async_operation_id uuid,
  p_tenant_id uuid,
  p_actor_principal_id uuid,
  p_evidence_basis text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  current_position text;
  obligation record;
  next_sequence bigint;
BEGIN
  PERFORM 1 FROM ops.async_operation o
  WHERE o.tenant_id = p_tenant_id AND o.async_operation_id = p_async_operation_id
  FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'async operation not found'; END IF;

  SELECT e.effect_position INTO current_position
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = p_tenant_id
    AND e.async_operation_id = p_async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;

  IF current_position <> 'EFFECT_INDETERMINATE' THEN
    RAISE EXCEPTION 'accepted unresolved variance does not relabel a resolved effect position';
  END IF;

  FOR obligation IN
    SELECT r.* FROM ops.reconciliation_obligation r
    WHERE r.tenant_id = p_tenant_id AND r.async_operation_id = p_async_operation_id
    ORDER BY r.reconciliation_obligation_id
    FOR UPDATE
  LOOP
    SELECT COALESCE(max(o.sequence), 0) + 1 INTO next_sequence
    FROM ops.reconciliation_occurrence o
    WHERE o.tenant_id = p_tenant_id
      AND o.reconciliation_obligation_id = obligation.reconciliation_obligation_id;

    INSERT INTO ops.reconciliation_occurrence (
      tenant_id, reconciliation_obligation_id, sequence, state, evidence_basis, actor_principal_id
    ) VALUES (
      p_tenant_id, obligation.reconciliation_obligation_id, next_sequence,
      'UNRESOLVED_EXTERNAL_POSITION_ACCEPTED', p_evidence_basis, p_actor_principal_id
    );
  END LOOP;
END
$$;

ALTER TABLE ops.integration_event ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops.integration_event FORCE ROW LEVEL SECURITY;
CREATE POLICY integration_event_tenant_select ON ops.integration_event
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

REVOKE ALL ON ops.integration_event FROM PUBLIC;
REVOKE ALL ON FUNCTION ops.materialize_integration_event_once(uuid, uuid, uuid, text, text, text, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION ops.begin_transport_attempt(uuid, text, bigint, uuid, uuid, integer) FROM PUBLIC;

GRANT SELECT ON ops.integration_event TO cpos_platform_runtime;
GRANT EXECUTE ON FUNCTION ops.begin_transport_attempt(uuid, text, bigint, uuid, uuid, integer)
  TO cpos_async_worker_runtime;

-- materialize_integration_event_once, record_domain_event_once, record_publication_intent_once,
-- resolve_indeterminate_effect and accept_unresolved_external_position remain internal owning
-- application/reconciliation seams with no broad runtime grant.
