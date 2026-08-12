DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'usage_measure_definition_version_id_key'
      AND conrelid = 'platform.usage_measure_definition_version'::regclass
  ) THEN
    ALTER TABLE platform.usage_measure_definition_version
      ADD CONSTRAINT usage_measure_definition_version_id_key
      UNIQUE (usage_measure_definition_version_id, usage_measure_key);
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS platform.metered_usage_occurrence (
  metered_usage_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  tenant_subscription_id uuid NOT NULL,
  usage_measure_definition_version_id uuid NOT NULL,
  usage_measure_key text NOT NULL CHECK (usage_measure_key ~ '^[a-z][a-z0-9._-]{1,127}$'),
  effect text NOT NULL CHECK (effect IN ('CONSUME', 'CREDIT')),
  quantity_text text NOT NULL CHECK (quantity_text ~ '^(0|[1-9][0-9]*)(\.[0-9]+)?$'),
  occurred_at timestamptz NOT NULL,
  correlation_id text NOT NULL CHECK (char_length(btrim(correlation_id)) BETWEEN 1 AND 240),
  adjustment_of_occurrence_id uuid,
  actor_kind text NOT NULL CHECK (actor_kind IN ('INTERNAL_PRINCIPAL', 'SYSTEM')),
  actor_principal_id uuid,
  reason text,
  evidence_ref text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, tenant_subscription_id)
    REFERENCES platform.tenant_subscription(tenant_id, tenant_subscription_id),
  FOREIGN KEY (usage_measure_definition_version_id, usage_measure_key)
    REFERENCES platform.usage_measure_definition_version(
      usage_measure_definition_version_id,
      usage_measure_key
    ),
  FOREIGN KEY (tenant_id, actor_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  FOREIGN KEY (adjustment_of_occurrence_id)
    REFERENCES platform.metered_usage_occurrence(metered_usage_occurrence_id),
  UNIQUE (tenant_id, tenant_subscription_id, usage_measure_key, correlation_id),
  CHECK (
    (actor_kind = 'INTERNAL_PRINCIPAL' AND actor_principal_id IS NOT NULL)
    OR
    (actor_kind = 'SYSTEM' AND actor_principal_id IS NULL)
  ),
  CHECK (
    (
      effect = 'CONSUME'
      AND adjustment_of_occurrence_id IS NULL
    )
    OR
    (
      effect = 'CREDIT'
      AND adjustment_of_occurrence_id IS NOT NULL
      AND reason IS NOT NULL
      AND char_length(btrim(reason)) > 0
      AND evidence_ref IS NOT NULL
      AND char_length(btrim(evidence_ref)) > 0
    )
  )
);

COMMENT ON TABLE platform.metered_usage_occurrence IS
  'Append-only commercial usage occurrence ledger. Remaining allowance and overage are derived; no mutable allowance balance is authoritative.';

COMMENT ON COLUMN platform.metered_usage_occurrence.adjustment_of_occurrence_id IS
  'For CREDIT rows, exact original CONSUME occurrence being corrected. Credits never rewrite the source occurrence.';

CREATE OR REPLACE FUNCTION platform.validate_metered_usage_occurrence_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  original_quantity numeric;
  already_credited numeric;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM platform.usage_measure_definition_version d
    WHERE d.usage_measure_definition_version_id = NEW.usage_measure_definition_version_id
      AND d.usage_measure_key = NEW.usage_measure_key
      AND d.effective_period @> NEW.occurred_at
  ) THEN
    RAISE EXCEPTION 'usage measure definition version is not effective at occurred_at';
  END IF;

  IF NEW.effect = 'CREDIT' THEN
    SELECT source.quantity_text::numeric
      INTO original_quantity
    FROM platform.metered_usage_occurrence source
    WHERE source.metered_usage_occurrence_id = NEW.adjustment_of_occurrence_id
      AND source.tenant_id = NEW.tenant_id
      AND source.tenant_subscription_id = NEW.tenant_subscription_id
      AND source.usage_measure_definition_version_id = NEW.usage_measure_definition_version_id
      AND source.usage_measure_key = NEW.usage_measure_key
      AND source.effect = 'CONSUME'
    FOR UPDATE;

    IF original_quantity IS NULL THEN
      RAISE EXCEPTION 'usage credit must reference a matching original CONSUME occurrence';
    END IF;

    SELECT COALESCE(sum(existing.quantity_text::numeric), 0)
      INTO already_credited
    FROM platform.metered_usage_occurrence existing
    WHERE existing.adjustment_of_occurrence_id = NEW.adjustment_of_occurrence_id
      AND existing.effect = 'CREDIT';

    IF already_credited + NEW.quantity_text::numeric > original_quantity THEN
      RAISE EXCEPTION 'usage credits cannot exceed the original consumed quantity';
    END IF;
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS metered_usage_occurrence_insert_guard
  ON platform.metered_usage_occurrence;
CREATE TRIGGER metered_usage_occurrence_insert_guard
BEFORE INSERT ON platform.metered_usage_occurrence
FOR EACH ROW
EXECUTE FUNCTION platform.validate_metered_usage_occurrence_insert();

CREATE OR REPLACE FUNCTION platform.reject_metered_usage_occurrence_rewrite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  RAISE EXCEPTION 'metered usage occurrence is append-only; record a new correction occurrence';
END
$$;

DROP TRIGGER IF EXISTS metered_usage_occurrence_immutable
  ON platform.metered_usage_occurrence;
CREATE TRIGGER metered_usage_occurrence_immutable
BEFORE UPDATE OR DELETE ON platform.metered_usage_occurrence
FOR EACH ROW
EXECUTE FUNCTION platform.reject_metered_usage_occurrence_rewrite();

REVOKE ALL ON FUNCTION platform.validate_metered_usage_occurrence_insert() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.reject_metered_usage_occurrence_rewrite() FROM PUBLIC;

ALTER TABLE platform.metered_usage_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.metered_usage_occurrence FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS metered_usage_occurrence_select ON platform.metered_usage_occurrence;
CREATE POLICY metered_usage_occurrence_select ON platform.metered_usage_occurrence
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS metered_usage_occurrence_insert ON platform.metered_usage_occurrence;
CREATE POLICY metered_usage_occurrence_insert ON platform.metered_usage_occurrence
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

REVOKE ALL ON platform.metered_usage_occurrence FROM PUBLIC;
GRANT SELECT, INSERT ON platform.metered_usage_occurrence TO cpos_subscription_runtime;
