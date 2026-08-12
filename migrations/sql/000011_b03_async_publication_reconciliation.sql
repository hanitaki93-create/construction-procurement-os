-- B03 async/event/publication/reconciliation kernel.
-- Frozen semantic sources: P1.7 Frozen Integration/Migration/API Contract v1.0,
-- P2.1 INV-049..INV-053, and the P2.2 B03 gate.
-- Operational queue state is deliberately separate from immutable effect-position history.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cpos_async_worker_runtime') THEN
    CREATE ROLE cpos_async_worker_runtime
      NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;
  END IF;
END
$$;

CREATE SCHEMA IF NOT EXISTS ops;
REVOKE ALL ON SCHEMA ops FROM PUBLIC;
GRANT USAGE ON SCHEMA ops TO cpos_platform_runtime, cpos_async_worker_runtime;

CREATE TABLE IF NOT EXISTS ops.worker_lane_policy (
  lane text PRIMARY KEY CHECK (lane IN (
    'interactive-nearline', 'routine-domain', 'evidence', 'connector-email',
    'reconciliation', 'report-export', 'search'
  )),
  default_tenant_max_inflight integer NOT NULL CHECK (default_tenant_max_inflight BETWEEN 1 AND 1024),
  max_claim_batch integer NOT NULL CHECK (max_claim_batch BETWEEN 1 AND 1024),
  max_lease_seconds integer NOT NULL CHECK (max_lease_seconds BETWEEN 1 AND 3600),
  policy_version integer NOT NULL CHECK (policy_version > 0),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

INSERT INTO ops.worker_lane_policy (
  lane, default_tenant_max_inflight, max_claim_batch, max_lease_seconds, policy_version
) VALUES
  ('interactive-nearline', 4, 32, 300, 1),
  ('routine-domain', 4, 32, 300, 1),
  ('evidence', 2, 16, 900, 1),
  ('connector-email', 2, 16, 300, 1),
  ('reconciliation', 2, 16, 600, 1),
  ('report-export', 2, 16, 900, 1),
  ('search', 4, 32, 600, 1)
ON CONFLICT (lane) DO NOTHING;

CREATE TABLE IF NOT EXISTS ops.tenant_lane_quota (
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  lane text NOT NULL REFERENCES ops.worker_lane_policy(lane),
  max_inflight integer NOT NULL CHECK (max_inflight BETWEEN 1 AND 1024),
  policy_version integer NOT NULL CHECK (policy_version > 0),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (tenant_id, lane)
);

CREATE TABLE IF NOT EXISTS ops.async_operation (
  async_operation_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  principal_id uuid NOT NULL,
  project_id uuid,
  authority_context_id uuid,
  operation_key text NOT NULL CHECK (operation_key ~ '^[a-z][a-z0-9._-]{0,126}$'),
  operation_version integer NOT NULL CHECK (operation_version > 0),
  logical_command_id text NOT NULL CHECK (char_length(btrim(logical_command_id)) BETWEEN 1 AND 240),
  idempotency_scope text NOT NULL CHECK (char_length(btrim(idempotency_scope)) BETWEEN 1 AND 320),
  idempotency_key text NOT NULL CHECK (char_length(btrim(idempotency_key)) BETWEEN 1 AND 320),
  request_fingerprint text NOT NULL CHECK (request_fingerprint ~ '^[0-9a-f]{64}$'),
  input_semantic_version text NOT NULL CHECK (char_length(btrim(input_semantic_version)) BETWEEN 1 AND 120),
  accepted_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, principal_id) REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (tenant_id, project_id) REFERENCES platform.project(tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  UNIQUE (tenant_id, async_operation_id),
  UNIQUE (tenant_id, operation_key, operation_version, logical_command_id),
  UNIQUE (tenant_id, operation_key, operation_version, idempotency_scope, idempotency_key)
);

COMMENT ON TABLE ops.async_operation IS
  'Immutable accepted async operation and frozen input semantic fingerprint. Acceptance/queueing is not business completion.';

CREATE TABLE IF NOT EXISTS ops.effect_position_occurrence (
  effect_position_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  async_operation_id uuid NOT NULL,
  item_key text,
  sequence bigint NOT NULL CHECK (sequence > 0),
  effect_position text NOT NULL CHECK (effect_position IN (
    'PRE_ACCEPTANCE', 'ACCEPTED_PRE_EFFECT', 'EFFECT_INDETERMINATE',
    'EXTERNAL_EFFECT_EMITTED', 'DOMAIN_EFFECT_ESTABLISHED',
    'TERMINAL_NO_EFFECT', 'PARTIAL_EFFECT'
  )),
  evidence_basis text NOT NULL CHECK (char_length(btrim(evidence_basis)) BETWEEN 1 AND 2000),
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id),
  UNIQUE NULLS NOT DISTINCT (tenant_id, async_operation_id, item_key, sequence)
);

COMMENT ON TABLE ops.effect_position_occurrence IS
  'Append-only seven-stage effect position history. Queue status is a separate operational fact.';

CREATE TABLE IF NOT EXISTS ops.async_operation_result (
  async_operation_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  result_kind text NOT NULL CHECK (result_kind IN (
    'COMPLETED', 'DUPLICATE_COMPLETED', 'REJECTED', 'CONFLICT',
    'UNRESOLVED_DEPENDENCY', 'QUARANTINED', 'TERMINAL_FAILURE', 'PARTIAL'
  )),
  result_semantic_version text NOT NULL CHECK (char_length(btrim(result_semantic_version)) BETWEEN 1 AND 120),
  result_fingerprint text NOT NULL CHECK (result_fingerprint ~ '^[0-9a-f]{64}$'),
  result_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  established_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id)
);

CREATE TABLE IF NOT EXISTS ops.domain_event (
  domain_event_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  source_async_operation_id uuid NOT NULL,
  event_family text NOT NULL CHECK (char_length(btrim(event_family)) BETWEEN 1 AND 160),
  event_semantic_key text NOT NULL CHECK (char_length(btrim(event_semantic_key)) BETWEEN 1 AND 320),
  event_version integer NOT NULL CHECK (event_version > 0),
  payload_fingerprint text NOT NULL CHECK (payload_fingerprint ~ '^[0-9a-f]{64}$'),
  payload jsonb NOT NULL,
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, source_async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id),
  UNIQUE (tenant_id, domain_event_id),
  UNIQUE (tenant_id, source_async_operation_id, event_family, event_semantic_key)
);

CREATE TABLE IF NOT EXISTS ops.publication_intent (
  publication_intent_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  source_domain_event_id uuid NOT NULL,
  publication_identity text NOT NULL CHECK (char_length(btrim(publication_identity)) BETWEEN 1 AND 320),
  mapping_version text NOT NULL CHECK (char_length(btrim(mapping_version)) BETWEEN 1 AND 120),
  integration_event_semantic_version text NOT NULL CHECK (char_length(btrim(integration_event_semantic_version)) BETWEEN 1 AND 120),
  disclosure_profile_version text NOT NULL CHECK (char_length(btrim(disclosure_profile_version)) BETWEEN 1 AND 120),
  target_basis_fingerprint text NOT NULL CHECK (target_basis_fingerprint ~ '^[0-9a-f]{64}$'),
  payload_content_identity text NOT NULL CHECK (char_length(btrim(payload_content_identity)) BETWEEN 1 AND 500),
  retry_policy_version text NOT NULL CHECK (char_length(btrim(retry_policy_version)) BETWEEN 1 AND 120),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, source_domain_event_id)
    REFERENCES ops.domain_event(tenant_id, domain_event_id),
  UNIQUE (tenant_id, publication_intent_id),
  UNIQUE (tenant_id, publication_identity)
);

CREATE TABLE IF NOT EXISTS ops.transport_attempt (
  transport_attempt_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  publication_intent_id uuid NOT NULL,
  attempt_number integer NOT NULL CHECK (attempt_number > 0),
  transport_state text NOT NULL CHECK (transport_state IN (
    'PREPARED', 'TRANSMISSION_STARTED', 'PROVIDER_ACCEPTED', 'DELIVERED_OBSERVED',
    'NO_EFFECT_CONFIRMED', 'OUTCOME_UNKNOWN', 'FAILED_PRE_EFFECT'
  )),
  external_correlation_id text,
  response_fingerprint text CHECK (response_fingerprint IS NULL OR response_fingerprint ~ '^[0-9a-f]{64}$'),
  started_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  completed_at timestamptz,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, publication_intent_id)
    REFERENCES ops.publication_intent(tenant_id, publication_intent_id),
  UNIQUE (tenant_id, publication_intent_id, attempt_number)
);

CREATE TABLE IF NOT EXISTS ops.external_observation (
  external_observation_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  provider_profile_key text NOT NULL CHECK (char_length(btrim(provider_profile_key)) BETWEEN 1 AND 240),
  external_correlation_id text,
  trust_class text NOT NULL CHECK (trust_class IN (
    'AUTHENTICATED_OR_PROVIDER_VALIDATED', 'SOURCE_ASSERTED_NOT_AUTHENTICATED',
    'TECHNICALLY_UNVERIFIED', 'MALFORMED_OR_SECURITY_SUSPECT'
  )),
  payload_fingerprint text NOT NULL CHECK (payload_fingerprint ~ '^[0-9a-f]{64}$'),
  payload jsonb NOT NULL,
  observed_at timestamptz NOT NULL,
  correlated_async_operation_id uuid,
  quarantine_state text NOT NULL CHECK (quarantine_state IN (
    'PENDING_CORRELATION', 'CORRELATED', 'DUPLICATE', 'UNRELATED', 'INVALID'
  )),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, correlated_async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id)
);

CREATE TABLE IF NOT EXISTS ops.job (
  job_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  async_operation_id uuid NOT NULL,
  lane text NOT NULL REFERENCES ops.worker_lane_policy(lane),
  job_reader_version integer NOT NULL CHECK (job_reader_version > 0),
  event_reader_version integer NOT NULL CHECK (event_reader_version > 0),
  operational_status text NOT NULL DEFAULT 'QUEUED' CHECK (operational_status IN (
    'QUEUED', 'RUNNING', 'WAITING', 'PAUSED', 'CANCEL_REQUESTED', 'COMPLETED',
    'DEAD_LETTER', 'QUARANTINED', 'RECONCILIATION_REQUIRED'
  )),
  priority integer NOT NULL DEFAULT 0 CHECK (priority BETWEEN -1000 AND 1000),
  available_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  max_attempts integer NOT NULL CHECK (max_attempts BETWEEN 1 AND 1000),
  lease_owner text,
  lease_expires_at timestamptz,
  fencing_token bigint NOT NULL DEFAULT 0 CHECK (fencing_token >= 0),
  last_error_class text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id),
  UNIQUE (tenant_id, job_id),
  UNIQUE (tenant_id, async_operation_id, lane),
  CHECK (
    (operational_status = 'RUNNING' AND lease_owner IS NOT NULL AND lease_expires_at IS NOT NULL)
    OR operational_status <> 'RUNNING'
  )
);

CREATE INDEX IF NOT EXISTS job_claim_idx
  ON ops.job (lane, operational_status, available_at, priority DESC, tenant_id, job_id);

CREATE TABLE IF NOT EXISTS ops.job_attempt (
  job_attempt_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  job_id uuid NOT NULL,
  attempt_number integer NOT NULL CHECK (attempt_number > 0),
  worker_id text NOT NULL CHECK (char_length(btrim(worker_id)) BETWEEN 1 AND 240),
  fencing_token bigint NOT NULL CHECK (fencing_token > 0),
  started_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  effect_boundary_started_at timestamptz,
  completed_at timestamptz,
  outcome text CHECK (outcome IS NULL OR outcome IN (
    'NO_EFFECT_CONFIRMED', 'EXTERNAL_EFFECT_CONFIRMED', 'DOMAIN_EFFECT_CONFIRMED',
    'OUTCOME_UNKNOWN', 'TRANSIENT_PRE_EFFECT_FAILURE', 'PERMANENT_PRE_EFFECT_FAILURE'
  )),
  retry_class text CHECK (retry_class IS NULL OR retry_class IN (
    'SAFE_RETRY_SAME_IDENTITY', 'RETRY_AFTER_REAUTHORIZATION',
    'RETRY_AFTER_DEPENDENCY_RECOVERY', 'RETRY_AFTER_RECONCILIATION',
    'NO_RETRY_REQUIRES_INPUT_CHANGE', 'NO_RETRY_TERMINAL', 'UNKNOWN_QUARANTINE'
  )),
  error_detail text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, job_id) REFERENCES ops.job(tenant_id, job_id),
  UNIQUE (tenant_id, job_id, attempt_number),
  UNIQUE (tenant_id, job_id, fencing_token)
);

CREATE TABLE IF NOT EXISTS ops.outbox_entry (
  outbox_entry_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  publication_intent_id uuid NOT NULL,
  job_id uuid NOT NULL,
  reader_version integer NOT NULL CHECK (reader_version > 0),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, publication_intent_id)
    REFERENCES ops.publication_intent(tenant_id, publication_intent_id),
  FOREIGN KEY (tenant_id, job_id) REFERENCES ops.job(tenant_id, job_id),
  UNIQUE (tenant_id, publication_intent_id),
  UNIQUE (tenant_id, outbox_entry_id)
);

CREATE TABLE IF NOT EXISTS ops.reconciliation_obligation (
  reconciliation_obligation_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  async_operation_id uuid NOT NULL,
  job_id uuid,
  reason text NOT NULL CHECK (char_length(btrim(reason)) BETWEEN 1 AND 1000),
  opened_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, async_operation_id)
    REFERENCES ops.async_operation(tenant_id, async_operation_id),
  FOREIGN KEY (tenant_id, job_id) REFERENCES ops.job(tenant_id, job_id),
  UNIQUE (tenant_id, reconciliation_obligation_id),
  UNIQUE NULLS NOT DISTINCT (tenant_id, async_operation_id, job_id)
);

CREATE TABLE IF NOT EXISTS ops.reconciliation_occurrence (
  reconciliation_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  reconciliation_obligation_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  state text NOT NULL CHECK (state IN (
    'OPEN', 'LOOKUP_ATTEMPTED', 'RESOLVED_EFFECT_CONFIRMED',
    'RESOLVED_NO_EFFECT_CONFIRMED', 'UNRESOLVED_EXTERNAL_POSITION_ACCEPTED'
  )),
  evidence_basis text NOT NULL CHECK (char_length(btrim(evidence_basis)) BETWEEN 1 AND 2000),
  actor_principal_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, reconciliation_obligation_id)
    REFERENCES ops.reconciliation_obligation(tenant_id, reconciliation_obligation_id),
  FOREIGN KEY (tenant_id, actor_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, reconciliation_obligation_id, sequence)
);

CREATE OR REPLACE FUNCTION ops.reject_append_only_rewrite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, ops
AS $$
BEGIN
  RAISE EXCEPTION 'B03 semantic history is append-only';
END
$$;

DO $$
DECLARE
  target_table text;
BEGIN
  FOREACH target_table IN ARRAY ARRAY[
    'async_operation', 'effect_position_occurrence', 'async_operation_result',
    'domain_event', 'publication_intent', 'transport_attempt', 'external_observation',
    'outbox_entry', 'reconciliation_obligation', 'reconciliation_occurrence'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON ops.%I', target_table || '_immutable', target_table);
    EXECUTE format('CREATE TRIGGER %I BEFORE UPDATE OR DELETE ON ops.%I FOR EACH ROW EXECUTE FUNCTION ops.reject_append_only_rewrite()',
      target_table || '_immutable', target_table);
  END LOOP;
END
$$;

CREATE OR REPLACE FUNCTION ops.validate_effect_position_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, ops
AS $$
DECLARE
  prior_position text;
  prior_sequence bigint;
BEGIN
  PERFORM 1
  FROM ops.async_operation o
  WHERE o.tenant_id = NEW.tenant_id
    AND o.async_operation_id = NEW.async_operation_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'effect position must belong to an existing async operation';
  END IF;

  SELECT e.sequence, e.effect_position
    INTO prior_sequence, prior_position
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = NEW.tenant_id
    AND e.async_operation_id = NEW.async_operation_id
    AND e.item_key IS NOT DISTINCT FROM NEW.item_key
  ORDER BY e.sequence DESC
  LIMIT 1;

  IF prior_sequence IS NULL THEN
    IF NEW.sequence <> 1 OR NEW.effect_position <> 'PRE_ACCEPTANCE' THEN
      RAISE EXCEPTION 'effect history must begin at PRE_ACCEPTANCE sequence 1';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.sequence <> prior_sequence + 1 THEN
    RAISE EXCEPTION 'effect position sequence must be contiguous';
  END IF;

  IF prior_position IN ('DOMAIN_EFFECT_ESTABLISHED', 'TERMINAL_NO_EFFECT') THEN
    RAISE EXCEPTION 'terminal effect position cannot transition';
  ELSIF prior_position = 'PRE_ACCEPTANCE'
    AND NEW.effect_position NOT IN ('ACCEPTED_PRE_EFFECT', 'TERMINAL_NO_EFFECT') THEN
    RAISE EXCEPTION 'illegal effect transition from PRE_ACCEPTANCE';
  ELSIF prior_position = 'ACCEPTED_PRE_EFFECT'
    AND NEW.effect_position NOT IN (
      'EFFECT_INDETERMINATE', 'EXTERNAL_EFFECT_EMITTED', 'DOMAIN_EFFECT_ESTABLISHED',
      'TERMINAL_NO_EFFECT', 'PARTIAL_EFFECT'
    ) THEN
    RAISE EXCEPTION 'illegal effect transition from ACCEPTED_PRE_EFFECT';
  ELSIF prior_position = 'EFFECT_INDETERMINATE'
    AND NEW.effect_position NOT IN (
      'EXTERNAL_EFFECT_EMITTED', 'DOMAIN_EFFECT_ESTABLISHED', 'TERMINAL_NO_EFFECT', 'PARTIAL_EFFECT'
    ) THEN
    RAISE EXCEPTION 'indeterminate effect can exit only on positive resolution evidence';
  ELSIF prior_position = 'EXTERNAL_EFFECT_EMITTED'
    AND NEW.effect_position NOT IN ('DOMAIN_EFFECT_ESTABLISHED', 'PARTIAL_EFFECT') THEN
    RAISE EXCEPTION 'illegal effect transition from EXTERNAL_EFFECT_EMITTED';
  ELSIF prior_position = 'PARTIAL_EFFECT'
    AND NEW.effect_position NOT IN (
      'PARTIAL_EFFECT', 'EXTERNAL_EFFECT_EMITTED', 'DOMAIN_EFFECT_ESTABLISHED', 'TERMINAL_NO_EFFECT'
    ) THEN
    RAISE EXCEPTION 'illegal effect transition from PARTIAL_EFFECT';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS effect_position_transition_guard
  ON ops.effect_position_occurrence;
CREATE TRIGGER effect_position_transition_guard
BEFORE INSERT ON ops.effect_position_occurrence
FOR EACH ROW EXECUTE FUNCTION ops.validate_effect_position_insert();

CREATE OR REPLACE VIEW ops.current_effect_position_v1
WITH (security_invoker = true)
AS
SELECT DISTINCT ON (e.tenant_id, e.async_operation_id, e.item_key)
  e.tenant_id, e.async_operation_id, e.item_key, e.sequence, e.effect_position,
  e.evidence_basis, e.occurred_at, e.recorded_at
FROM ops.effect_position_occurrence e
ORDER BY e.tenant_id, e.async_operation_id, e.item_key, e.sequence DESC;

CREATE OR REPLACE VIEW ops.async_operation_status_v1
WITH (security_invoker = true)
AS
SELECT
  o.tenant_id, o.async_operation_id, o.operation_key, o.operation_version,
  o.logical_command_id, o.idempotency_scope, o.idempotency_key,
  o.input_semantic_version, o.accepted_at, ep.effect_position,
  j.job_id, j.lane, j.operational_status, j.attempt_count, j.max_attempts,
  j.available_at, j.lease_expires_at,
  r.result_kind, r.result_semantic_version, r.result_fingerprint,
  r.established_at AS result_established_at
FROM ops.async_operation o
LEFT JOIN ops.current_effect_position_v1 ep
  ON ep.tenant_id = o.tenant_id
 AND ep.async_operation_id = o.async_operation_id
 AND ep.item_key IS NULL
LEFT JOIN ops.job j
  ON j.tenant_id = o.tenant_id
 AND j.async_operation_id = o.async_operation_id
LEFT JOIN ops.async_operation_result r
  ON r.tenant_id = o.tenant_id
 AND r.async_operation_id = o.async_operation_id;

CREATE OR REPLACE VIEW ops.domain_event_reader_v1
WITH (security_invoker = true)
AS
SELECT tenant_id, domain_event_id, source_async_operation_id, event_family,
  event_semantic_key, event_version, payload_fingerprint, payload, occurred_at, recorded_at
FROM ops.domain_event;

CREATE OR REPLACE VIEW ops.job_reader_v1
WITH (security_invoker = true)
AS
SELECT tenant_id, job_id, async_operation_id, lane, job_reader_version,
  event_reader_version, operational_status, priority, available_at,
  attempt_count, max_attempts, lease_expires_at, fencing_token, last_error_class, recorded_at
FROM ops.job;

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
  ) VALUES
    (p_tenant_id, chosen_id, NULL, 1, 'PRE_ACCEPTANCE', 'logical request observed before durable acceptance'),
    (p_tenant_id, chosen_id, NULL, 2, 'ACCEPTED_PRE_EFFECT', 'durable acceptance committed before any effect-bearing boundary');

  INSERT INTO ops.job (
    tenant_id, async_operation_id, lane, job_reader_version, event_reader_version, max_attempts
  ) VALUES (p_tenant_id, chosen_id, p_lane, 1, 1, p_max_attempts);

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

CREATE OR REPLACE FUNCTION ops.heartbeat_job(
  p_job_id uuid, p_worker_id text, p_fencing_token bigint, p_requested_lease_seconds integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  lane_policy ops.worker_lane_policy%ROWTYPE;
  job_row ops.job%ROWTYPE;
  effective_lease integer;
BEGIN
  SELECT j.* INTO job_row FROM ops.job j WHERE j.job_id = p_job_id FOR UPDATE;
  IF NOT FOUND
     OR job_row.operational_status <> 'RUNNING'
     OR job_row.lease_owner IS DISTINCT FROM p_worker_id
     OR job_row.fencing_token <> p_fencing_token
     OR job_row.lease_expires_at <= clock_timestamp() THEN
    RETURN false;
  END IF;

  SELECT p.* INTO lane_policy FROM ops.worker_lane_policy p WHERE p.lane = job_row.lane;
  effective_lease := LEAST(GREATEST(p_requested_lease_seconds, 1), lane_policy.max_lease_seconds);
  UPDATE ops.job j
  SET lease_expires_at = clock_timestamp() + make_interval(secs => effective_lease)
  WHERE j.job_id = p_job_id;
  RETURN true;
END
$$;

CREATE OR REPLACE FUNCTION ops.mark_effect_boundary_started(
  p_job_id uuid, p_worker_id text, p_fencing_token bigint
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  job_row ops.job%ROWTYPE;
BEGIN
  SELECT j.* INTO job_row FROM ops.job j WHERE j.job_id = p_job_id FOR UPDATE;
  IF NOT FOUND
     OR job_row.operational_status <> 'RUNNING'
     OR job_row.lease_owner IS DISTINCT FROM p_worker_id
     OR job_row.fencing_token <> p_fencing_token
     OR job_row.lease_expires_at <= clock_timestamp() THEN
    RAISE EXCEPTION 'STALE_WORKER_FENCED';
  END IF;

  UPDATE ops.job_attempt a
  SET effect_boundary_started_at = COALESCE(a.effect_boundary_started_at, clock_timestamp())
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'active job attempt not found';
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION ops.complete_pre_effect_attempt(
  p_job_id uuid,
  p_worker_id text,
  p_fencing_token bigint,
  p_retry_class text,
  p_error_detail text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  job_row ops.job%ROWTYPE;
  effect_started timestamptz;
  current_position text;
  next_status text;
BEGIN
  SELECT j.* INTO job_row FROM ops.job j WHERE j.job_id = p_job_id FOR UPDATE;
  IF NOT FOUND
     OR job_row.operational_status <> 'RUNNING'
     OR job_row.lease_owner IS DISTINCT FROM p_worker_id
     OR job_row.fencing_token <> p_fencing_token
     OR job_row.lease_expires_at <= clock_timestamp() THEN
    RAISE EXCEPTION 'STALE_WORKER_FENCED';
  END IF;

  SELECT a.effect_boundary_started_at INTO effect_started
  FROM ops.job_attempt a
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'active job attempt not found';
  END IF;
  IF effect_started IS NOT NULL THEN
    RAISE EXCEPTION 'pre-effect completion prohibited after possible effect boundary started';
  END IF;

  SELECT e.effect_position INTO current_position
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = job_row.tenant_id
    AND e.async_operation_id = job_row.async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;
  IF current_position <> 'ACCEPTED_PRE_EFFECT' THEN
    RAISE EXCEPTION 'ordinary retry is permitted only from ACCEPTED_PRE_EFFECT';
  END IF;

  IF p_retry_class = 'SAFE_RETRY_SAME_IDENTITY' AND job_row.attempt_count < job_row.max_attempts THEN
    next_status := 'QUEUED';
  ELSIF p_retry_class IN (
    'RETRY_AFTER_REAUTHORIZATION', 'RETRY_AFTER_DEPENDENCY_RECOVERY', 'RETRY_AFTER_RECONCILIATION'
  ) THEN
    next_status := 'WAITING';
  ELSIF p_retry_class = 'UNKNOWN_QUARANTINE' THEN
    next_status := 'QUARANTINED';
  ELSE
    next_status := 'DEAD_LETTER';
  END IF;

  UPDATE ops.job_attempt a
  SET completed_at = clock_timestamp(),
      outcome = CASE WHEN p_retry_class = 'SAFE_RETRY_SAME_IDENTITY'
        THEN 'TRANSIENT_PRE_EFFECT_FAILURE' ELSE 'PERMANENT_PRE_EFFECT_FAILURE' END,
      retry_class = p_retry_class,
      error_detail = p_error_detail
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL;

  UPDATE ops.job j
  SET operational_status = next_status,
      available_at = CASE WHEN next_status = 'QUEUED' THEN clock_timestamp() ELSE j.available_at END,
      lease_owner = NULL,
      lease_expires_at = NULL,
      last_error_class = p_retry_class
  WHERE j.job_id = job_row.job_id;

  RETURN next_status;
END
$$;

CREATE OR REPLACE FUNCTION ops.record_unknown_effect(
  p_job_id uuid, p_worker_id text, p_fencing_token bigint, p_reason text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  job_row ops.job%ROWTYPE;
  effect_started timestamptz;
  current_position text;
  current_sequence bigint;
  obligation_id uuid;
BEGIN
  SELECT j.* INTO job_row FROM ops.job j WHERE j.job_id = p_job_id FOR UPDATE;
  IF NOT FOUND
     OR job_row.operational_status <> 'RUNNING'
     OR job_row.lease_owner IS DISTINCT FROM p_worker_id
     OR job_row.fencing_token <> p_fencing_token
     OR job_row.lease_expires_at <= clock_timestamp() THEN
    RAISE EXCEPTION 'STALE_WORKER_FENCED';
  END IF;

  SELECT a.effect_boundary_started_at INTO effect_started
  FROM ops.job_attempt a
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL
  FOR UPDATE;
  IF effect_started IS NULL THEN
    RAISE EXCEPTION 'OUTCOME_UNKNOWN requires a recorded possible effect-bearing boundary';
  END IF;

  SELECT e.effect_position, e.sequence INTO current_position, current_sequence
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = job_row.tenant_id
    AND e.async_operation_id = job_row.async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;

  IF current_position = 'ACCEPTED_PRE_EFFECT' THEN
    INSERT INTO ops.effect_position_occurrence (
      tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
    ) VALUES (
      job_row.tenant_id, job_row.async_operation_id, NULL, current_sequence + 1,
      'EFFECT_INDETERMINATE', p_reason
    );
  ELSIF current_position <> 'EFFECT_INDETERMINATE' THEN
    RAISE EXCEPTION 'unknown effect cannot be recorded from current effect position %', current_position;
  END IF;

  UPDATE ops.job_attempt a
  SET completed_at = clock_timestamp(), outcome = 'OUTCOME_UNKNOWN',
      retry_class = 'RETRY_AFTER_RECONCILIATION', error_detail = p_reason
  WHERE a.tenant_id = job_row.tenant_id
    AND a.job_id = job_row.job_id
    AND a.fencing_token = p_fencing_token
    AND a.completed_at IS NULL;

  UPDATE ops.job j
  SET operational_status = 'RECONCILIATION_REQUIRED', lease_owner = NULL,
      lease_expires_at = NULL, last_error_class = 'OUTCOME_UNKNOWN'
  WHERE j.job_id = job_row.job_id;

  INSERT INTO ops.reconciliation_obligation (tenant_id, async_operation_id, job_id, reason)
  VALUES (job_row.tenant_id, job_row.async_operation_id, job_row.job_id, p_reason)
  ON CONFLICT (tenant_id, async_operation_id, job_id) DO NOTHING
  RETURNING reconciliation_obligation_id INTO obligation_id;

  IF obligation_id IS NULL THEN
    SELECT r.reconciliation_obligation_id INTO obligation_id
    FROM ops.reconciliation_obligation r
    WHERE r.tenant_id = job_row.tenant_id
      AND r.async_operation_id = job_row.async_operation_id
      AND r.job_id = job_row.job_id;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM ops.reconciliation_occurrence r
    WHERE r.tenant_id = job_row.tenant_id
      AND r.reconciliation_obligation_id = obligation_id
  ) THEN
    INSERT INTO ops.reconciliation_occurrence (
      tenant_id, reconciliation_obligation_id, sequence, state, evidence_basis
    ) VALUES (job_row.tenant_id, obligation_id, 1, 'OPEN', p_reason);
  END IF;

  RETURN obligation_id;
END
$$;

CREATE OR REPLACE FUNCTION ops.reap_expired_leases(p_lane text, p_limit integer)
RETURNS TABLE(reaped_job_id uuid, disposition text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, ops
AS $$
DECLARE
  picked record;
  current_position text;
  current_sequence bigint;
  effect_started timestamptz;
  obligation_id uuid;
BEGIN
  FOR picked IN
    SELECT j.*
    FROM ops.job j
    WHERE j.lane = p_lane
      AND j.operational_status = 'RUNNING'
      AND j.lease_expires_at <= clock_timestamp()
    ORDER BY j.lease_expires_at, j.job_id
    LIMIT GREATEST(p_limit, 1)
    FOR UPDATE SKIP LOCKED
  LOOP
    SELECT a.effect_boundary_started_at INTO effect_started
    FROM ops.job_attempt a
    WHERE a.tenant_id = picked.tenant_id
      AND a.job_id = picked.job_id
      AND a.fencing_token = picked.fencing_token
      AND a.completed_at IS NULL
    FOR UPDATE;

    SELECT e.effect_position, e.sequence INTO current_position, current_sequence
    FROM ops.effect_position_occurrence e
    WHERE e.tenant_id = picked.tenant_id
      AND e.async_operation_id = picked.async_operation_id
      AND e.item_key IS NULL
    ORDER BY e.sequence DESC LIMIT 1;

    IF effect_started IS NOT NULL THEN
      IF current_position = 'ACCEPTED_PRE_EFFECT' THEN
        INSERT INTO ops.effect_position_occurrence (
          tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
        ) VALUES (
          picked.tenant_id, picked.async_operation_id, NULL, current_sequence + 1,
          'EFFECT_INDETERMINATE', 'worker lease expired after possible effect-bearing boundary started'
        );
      END IF;

      UPDATE ops.job_attempt a
      SET completed_at = clock_timestamp(), outcome = 'OUTCOME_UNKNOWN',
          retry_class = 'RETRY_AFTER_RECONCILIATION',
          error_detail = 'lease expired after possible effect-bearing boundary started'
      WHERE a.tenant_id = picked.tenant_id
        AND a.job_id = picked.job_id
        AND a.fencing_token = picked.fencing_token
        AND a.completed_at IS NULL;

      UPDATE ops.job j
      SET operational_status = 'RECONCILIATION_REQUIRED', lease_owner = NULL,
          lease_expires_at = NULL, last_error_class = 'LEASE_EXPIRED_AFTER_POSSIBLE_EFFECT',
          fencing_token = j.fencing_token + 1
      WHERE j.job_id = picked.job_id;

      INSERT INTO ops.reconciliation_obligation (tenant_id, async_operation_id, job_id, reason)
      VALUES (
        picked.tenant_id, picked.async_operation_id, picked.job_id,
        'lease expired after possible effect-bearing boundary started'
      )
      ON CONFLICT (tenant_id, async_operation_id, job_id) DO NOTHING
      RETURNING reconciliation_obligation_id INTO obligation_id;

      IF obligation_id IS NULL THEN
        SELECT r.reconciliation_obligation_id INTO obligation_id
        FROM ops.reconciliation_obligation r
        WHERE r.tenant_id = picked.tenant_id
          AND r.async_operation_id = picked.async_operation_id
          AND r.job_id = picked.job_id;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM ops.reconciliation_occurrence r
        WHERE r.tenant_id = picked.tenant_id
          AND r.reconciliation_obligation_id = obligation_id
      ) THEN
        INSERT INTO ops.reconciliation_occurrence (
          tenant_id, reconciliation_obligation_id, sequence, state, evidence_basis
        ) VALUES (
          picked.tenant_id, obligation_id, 1, 'OPEN',
          'lease expired after possible effect-bearing boundary started'
        );
      END IF;

      reaped_job_id := picked.job_id;
      disposition := 'RECONCILIATION_REQUIRED';
      RETURN NEXT;
    ELSE
      UPDATE ops.job_attempt a
      SET completed_at = clock_timestamp(), outcome = 'TRANSIENT_PRE_EFFECT_FAILURE',
          retry_class = CASE WHEN picked.attempt_count < picked.max_attempts
            THEN 'SAFE_RETRY_SAME_IDENTITY' ELSE 'NO_RETRY_TERMINAL' END,
          error_detail = 'worker lease expired before effect-bearing boundary'
      WHERE a.tenant_id = picked.tenant_id
        AND a.job_id = picked.job_id
        AND a.fencing_token = picked.fencing_token
        AND a.completed_at IS NULL;

      UPDATE ops.job j
      SET operational_status = CASE
            WHEN picked.attempt_count < picked.max_attempts
              AND current_position = 'ACCEPTED_PRE_EFFECT' THEN 'QUEUED'
            ELSE 'DEAD_LETTER'
          END,
          available_at = clock_timestamp(), lease_owner = NULL, lease_expires_at = NULL,
          last_error_class = 'LEASE_EXPIRED_PRE_EFFECT', fencing_token = j.fencing_token + 1
      WHERE j.job_id = picked.job_id;

      reaped_job_id := picked.job_id;
      disposition := CASE
        WHEN picked.attempt_count < picked.max_attempts
          AND current_position = 'ACCEPTED_PRE_EFFECT' THEN 'SAFE_RETRY_SAME_IDENTITY'
        ELSE 'DEAD_LETTER'
      END;
      RETURN NEXT;
    END IF;
  END LOOP;
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
  SELECT d.* INTO existing
  FROM ops.domain_event d
  WHERE d.tenant_id = p_tenant_id
    AND d.source_async_operation_id = p_async_operation_id
    AND d.event_family = p_event_family
    AND d.event_semantic_key = p_event_semantic_key
  FOR UPDATE;

  IF FOUND THEN
    IF existing.event_version <> p_event_version
       OR existing.payload_fingerprint <> p_payload_fingerprint THEN
      RAISE EXCEPTION 'DOMAIN_EVENT_IDEMPOTENCY_CONFLICT';
    END IF;
    RETURN existing.domain_event_id;
  END IF;

  chosen_id := COALESCE(p_domain_event_id, uuidv7());
  INSERT INTO ops.domain_event (
    domain_event_id, tenant_id, source_async_operation_id, event_family,
    event_semantic_key, event_version, payload_fingerprint, payload, occurred_at
  ) VALUES (
    chosen_id, p_tenant_id, p_async_operation_id, p_event_family,
    p_event_semantic_key, p_event_version, p_payload_fingerprint, p_payload, p_occurred_at
  );

  SELECT e.effect_position, e.sequence INTO current_position, current_sequence
  FROM ops.effect_position_occurrence e
  WHERE e.tenant_id = p_tenant_id
    AND e.async_operation_id = p_async_operation_id
    AND e.item_key IS NULL
  ORDER BY e.sequence DESC LIMIT 1;

  IF current_position IN ('ACCEPTED_PRE_EFFECT', 'EFFECT_INDETERMINATE', 'EXTERNAL_EFFECT_EMITTED') THEN
    INSERT INTO ops.effect_position_occurrence (
      tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
    ) VALUES (
      p_tenant_id, p_async_operation_id, NULL, current_sequence + 1,
      'DOMAIN_EFFECT_ESTABLISHED', 'authoritative domain event established under stable semantic identity'
    );
  ELSIF current_position <> 'DOMAIN_EFFECT_ESTABLISHED' THEN
    RAISE EXCEPTION 'domain event cannot establish effect from current position %', current_position;
  END IF;

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
  SELECT p.* INTO existing
  FROM ops.publication_intent p
  WHERE p.tenant_id = p_tenant_id AND p.publication_identity = p_publication_identity
  FOR UPDATE;

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

  SELECT d.source_async_operation_id INTO operation_id
  FROM ops.domain_event d
  WHERE d.tenant_id = p_tenant_id AND d.domain_event_id = p_source_domain_event_id;
  IF operation_id IS NULL THEN
    RAISE EXCEPTION 'publication source domain event not found';
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
    tenant_id, async_operation_id, lane, job_reader_version, event_reader_version,
    operational_status, max_attempts
  ) VALUES (
    p_tenant_id, operation_id, 'connector-email', 1, 1, 'QUEUED', p_max_attempts
  )
  ON CONFLICT (tenant_id, async_operation_id, lane) DO UPDATE
    SET available_at = LEAST(ops.job.available_at, EXCLUDED.available_at)
  RETURNING job_id INTO publish_job_id;

  INSERT INTO ops.outbox_entry (tenant_id, publication_intent_id, job_id, reader_version)
  VALUES (p_tenant_id, intent_id, publish_job_id, 1);

  RETURN intent_id;
END
$$;

-- Tenant-facing tables are FORCE RLS. Worker runtime receives no direct table grants;
-- cross-tenant queue work occurs only through bounded SECURITY DEFINER protocols.
DO $$
DECLARE
  target_table text;
BEGIN
  FOREACH target_table IN ARRAY ARRAY[
    'tenant_lane_quota', 'async_operation', 'effect_position_occurrence',
    'async_operation_result', 'domain_event', 'publication_intent', 'transport_attempt',
    'external_observation', 'job', 'job_attempt', 'outbox_entry',
    'reconciliation_obligation', 'reconciliation_occurrence'
  ]
  LOOP
    EXECUTE format('ALTER TABLE ops.%I ENABLE ROW LEVEL SECURITY', target_table);
    EXECUTE format('ALTER TABLE ops.%I FORCE ROW LEVEL SECURITY', target_table);
    EXECUTE format('DROP POLICY IF EXISTS %I ON ops.%I', target_table || '_tenant_select', target_table);
    EXECUTE format(
      'CREATE POLICY %I ON ops.%I FOR SELECT TO cpos_platform_runtime USING (tenant_id::text = nullif(current_setting(''cpos.tenant_id'', true), ''''))',
      target_table || '_tenant_select', target_table
    );
  END LOOP;
END
$$;

REVOKE ALL ON ALL TABLES IN SCHEMA ops FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA ops FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA ops FROM PUBLIC;

GRANT SELECT ON
  ops.async_operation, ops.effect_position_occurrence, ops.async_operation_result,
  ops.domain_event, ops.publication_intent, ops.transport_attempt, ops.external_observation,
  ops.job, ops.job_attempt, ops.outbox_entry, ops.reconciliation_obligation,
  ops.reconciliation_occurrence, ops.tenant_lane_quota
TO cpos_platform_runtime;

GRANT SELECT ON
  ops.current_effect_position_v1, ops.async_operation_status_v1,
  ops.domain_event_reader_v1, ops.job_reader_v1
TO cpos_platform_runtime;

GRANT EXECUTE ON FUNCTION ops.accept_async_operation(
  uuid, uuid, uuid, uuid, uuid, text, integer, text, text, text, text, text, text, integer
) TO cpos_platform_runtime;

GRANT EXECUTE ON FUNCTION ops.claim_jobs(text, text, integer, integer)
  TO cpos_async_worker_runtime;
GRANT EXECUTE ON FUNCTION ops.heartbeat_job(uuid, text, bigint, integer)
  TO cpos_async_worker_runtime;
GRANT EXECUTE ON FUNCTION ops.mark_effect_boundary_started(uuid, text, bigint)
  TO cpos_async_worker_runtime;
GRANT EXECUTE ON FUNCTION ops.complete_pre_effect_attempt(uuid, text, bigint, text, text)
  TO cpos_async_worker_runtime;
GRANT EXECUTE ON FUNCTION ops.record_unknown_effect(uuid, text, bigint, text)
  TO cpos_async_worker_runtime;
GRANT EXECUTE ON FUNCTION ops.reap_expired_leases(text, integer)
  TO cpos_async_worker_runtime;

-- Deliberately no runtime grants for generic domain-event establishment,
-- publication-intent creation, indeterminate resolution, or accepted-unresolved disposition.
-- Those are internal owning-application/reconciliation seams and cannot become broad worker authority.