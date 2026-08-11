CREATE OR REPLACE FUNCTION platform.validate_metered_usage_occurrence_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform
AS $$
DECLARE
  original_quantity numeric;
  already_credited numeric;
  execution_tenant_id text;
BEGIN
  execution_tenant_id := nullif(current_setting('cpos.tenant_id', true), '');
  IF execution_tenant_id IS NULL OR NEW.tenant_id::text <> execution_tenant_id THEN
    RAISE EXCEPTION 'usage occurrence tenant does not match execution context';
  END IF;

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

REVOKE ALL ON FUNCTION platform.validate_metered_usage_occurrence_insert() FROM PUBLIC;
