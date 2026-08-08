DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cpos_subscription_runtime') THEN
    CREATE ROLE cpos_subscription_runtime
      NOLOGIN
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOINHERIT
      NOBYPASSRLS;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA platform TO cpos_subscription_runtime;

CREATE TABLE IF NOT EXISTS platform.tenant_subscription (
  tenant_subscription_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  commercial_channel text NOT NULL CHECK (commercial_channel IN ('SELF_SERVICE', 'MANUAL_ENTERPRISE')),
  external_agreement_ref text,
  commercial_evidence_ref text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (tenant_id, tenant_subscription_id),
  CHECK (
    commercial_channel <> 'MANUAL_ENTERPRISE'
    OR commercial_evidence_ref IS NOT NULL
  )
);

COMMENT ON TABLE platform.tenant_subscription IS
  'Tenant-scoped commercial-access agreement/container. It is not procurement role, DOA, approval or award authority.';

CREATE TABLE IF NOT EXISTS platform.subscription_lifecycle_occurrence (
  subscription_lifecycle_occurrence_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  tenant_subscription_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  occurrence_kind text NOT NULL CHECK (occurrence_kind IN ('ACTIVATED', 'SUSPENDED', 'RESUMED', 'CANCELLED', 'EXPIRED')),
  effective_at timestamptz NOT NULL,
  actor_kind text NOT NULL CHECK (actor_kind IN ('INTERNAL_PRINCIPAL', 'SYSTEM')),
  actor_principal_id uuid,
  reason text,
  commercial_evidence_ref text,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, tenant_subscription_id)
    REFERENCES platform.tenant_subscription(tenant_id, tenant_subscription_id),
  FOREIGN KEY (tenant_id, actor_principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_subscription_id, sequence),
  CHECK (
    (actor_kind = 'INTERNAL_PRINCIPAL' AND actor_principal_id IS NOT NULL)
    OR
    (actor_kind = 'SYSTEM' AND actor_principal_id IS NULL)
  )
);

COMMENT ON TABLE platform.subscription_lifecycle_occurrence IS
  'Append-only CPOS product-access lifecycle occurrence. External billing observations cannot write this table directly.';

CREATE TABLE IF NOT EXISTS platform.tenant_subscription_item (
  tenant_subscription_item_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  tenant_subscription_id uuid NOT NULL,
  item_slot_key text NOT NULL CHECK (item_slot_key ~ '^[A-Z][A-Z0-9_]{0,63}$'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, tenant_subscription_id)
    REFERENCES platform.tenant_subscription(tenant_id, tenant_subscription_id),
  UNIQUE (tenant_id, tenant_subscription_item_id),
  UNIQUE (tenant_id, tenant_subscription_item_id, item_slot_key)
);

COMMENT ON TABLE platform.tenant_subscription_item IS
  'Stable subscription-component identity. Commercial version content lives in append-only/superseding item-version rows.';

CREATE TABLE IF NOT EXISTS platform.tenant_subscription_item_version (
  tenant_subscription_item_version_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_subscription_item_id uuid NOT NULL,
  tenant_id uuid NOT NULL,
  item_slot_key text NOT NULL CHECK (item_slot_key ~ '^[A-Z][A-Z0-9_]{0,63}$'),
  version bigint NOT NULL CHECK (version > 0),
  product_offering_version_id uuid NOT NULL REFERENCES platform.product_offering_version(product_offering_version_id),
  effective_period tstzrange NOT NULL CHECK (
    NOT isempty(effective_period)
    AND lower(effective_period) IS NOT NULL
    AND lower_inc(effective_period)
    AND NOT upper_inc(effective_period)
  ),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  superseded_at timestamptz,
  FOREIGN KEY (tenant_id, tenant_subscription_item_id, item_slot_key)
    REFERENCES platform.tenant_subscription_item(tenant_id, tenant_subscription_item_id, item_slot_key),
  UNIQUE (tenant_subscription_item_id, version),
  EXCLUDE USING gist (
    tenant_id WITH =,
    item_slot_key WITH =,
    effective_period WITH &&
  ) WHERE (superseded_at IS NULL)
);

COMMENT ON TABLE platform.tenant_subscription_item_version IS
  'Exact recorded business version of a subscription-item grant. Supersession preserves the prior row; current unsuperseded versions cannot overlap in one tenant/product slot.';

CREATE TABLE IF NOT EXISTS platform.tenant_entitlement_authority_guard (
  tenant_id uuid PRIMARY KEY REFERENCES platform.tenant(tenant_id),
  guard_version bigint NOT NULL DEFAULT 1 CHECK (guard_version > 0),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

COMMENT ON TABLE platform.tenant_entitlement_authority_guard IS
  'Stable CC-2 authority guard for product-entitlement changes and consequential command-time revalidation. It grants no business authority.';

INSERT INTO platform.tenant_entitlement_authority_guard (tenant_id)
SELECT tenant_id
FROM platform.tenant
ON CONFLICT (tenant_id) DO NOTHING;

CREATE OR REPLACE FUNCTION platform.enforce_subscription_item_version_supersession()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  IF OLD.superseded_at IS NOT NULL THEN
    RAISE EXCEPTION 'subscription item version is already superseded';
  END IF;
  IF NEW.superseded_at IS NULL THEN
    RAISE EXCEPTION 'subscription item version supersession requires a non-null superseded_at';
  END IF;
  NEW.superseded_at := clock_timestamp();
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS tenant_subscription_item_version_supersession_guard
  ON platform.tenant_subscription_item_version;
CREATE TRIGGER tenant_subscription_item_version_supersession_guard
BEFORE UPDATE OF superseded_at ON platform.tenant_subscription_item_version
FOR EACH ROW
EXECUTE FUNCTION platform.enforce_subscription_item_version_supersession();

CREATE OR REPLACE FUNCTION platform.enforce_entitlement_guard_increment()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  IF NEW.guard_version <> OLD.guard_version + 1 THEN
    RAISE EXCEPTION 'entitlement guard version must increment by exactly one';
  END IF;
  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS tenant_entitlement_authority_guard_increment
  ON platform.tenant_entitlement_authority_guard;
CREATE TRIGGER tenant_entitlement_authority_guard_increment
BEFORE UPDATE OF guard_version ON platform.tenant_entitlement_authority_guard
FOR EACH ROW
EXECUTE FUNCTION platform.enforce_entitlement_guard_increment();

CREATE OR REPLACE FUNCTION platform.ensure_entitlement_guard_for_tenant()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  INSERT INTO platform.tenant_entitlement_authority_guard (tenant_id)
  VALUES (NEW.tenant_id)
  ON CONFLICT (tenant_id) DO NOTHING;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS tenant_entitlement_guard_bootstrap
  ON platform.tenant;
CREATE TRIGGER tenant_entitlement_guard_bootstrap
AFTER INSERT ON platform.tenant
FOR EACH ROW
EXECUTE FUNCTION platform.ensure_entitlement_guard_for_tenant();

REVOKE ALL ON FUNCTION platform.enforce_subscription_item_version_supersession() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.enforce_entitlement_guard_increment() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.ensure_entitlement_guard_for_tenant() FROM PUBLIC;

ALTER TABLE platform.tenant_subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.subscription_lifecycle_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.subscription_lifecycle_occurrence FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item_version FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_entitlement_authority_guard ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_entitlement_authority_guard FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS subscription_select ON platform.tenant_subscription;
CREATE POLICY subscription_select ON platform.tenant_subscription
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_insert ON platform.tenant_subscription;
CREATE POLICY subscription_insert ON platform.tenant_subscription
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_lifecycle_select ON platform.subscription_lifecycle_occurrence;
CREATE POLICY subscription_lifecycle_select ON platform.subscription_lifecycle_occurrence
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_lifecycle_insert ON platform.subscription_lifecycle_occurrence;
CREATE POLICY subscription_lifecycle_insert ON platform.subscription_lifecycle_occurrence
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_item_select ON platform.tenant_subscription_item;
CREATE POLICY subscription_item_select ON platform.tenant_subscription_item
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_item_insert ON platform.tenant_subscription_item;
CREATE POLICY subscription_item_insert ON platform.tenant_subscription_item
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_item_version_select ON platform.tenant_subscription_item_version;
CREATE POLICY subscription_item_version_select ON platform.tenant_subscription_item_version
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_item_version_insert ON platform.tenant_subscription_item_version;
CREATE POLICY subscription_item_version_insert ON platform.tenant_subscription_item_version
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS subscription_item_version_update ON platform.tenant_subscription_item_version;
CREATE POLICY subscription_item_version_update ON platform.tenant_subscription_item_version
  FOR UPDATE TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''))
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS entitlement_guard_select ON platform.tenant_entitlement_authority_guard;
CREATE POLICY entitlement_guard_select ON platform.tenant_entitlement_authority_guard
  FOR SELECT TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS entitlement_guard_insert ON platform.tenant_entitlement_authority_guard;
CREATE POLICY entitlement_guard_insert ON platform.tenant_entitlement_authority_guard
  FOR INSERT TO cpos_subscription_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS entitlement_guard_update ON platform.tenant_entitlement_authority_guard;
CREATE POLICY entitlement_guard_update ON platform.tenant_entitlement_authority_guard
  FOR UPDATE TO cpos_subscription_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''))
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS bootstrap_entitlement_guard_insert ON platform.tenant_entitlement_authority_guard;
CREATE POLICY bootstrap_entitlement_guard_insert ON platform.tenant_entitlement_authority_guard
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), ''));

REVOKE ALL ON platform.tenant_subscription FROM PUBLIC;
REVOKE ALL ON platform.subscription_lifecycle_occurrence FROM PUBLIC;
REVOKE ALL ON platform.tenant_subscription_item FROM PUBLIC;
REVOKE ALL ON platform.tenant_subscription_item_version FROM PUBLIC;
REVOKE ALL ON platform.tenant_entitlement_authority_guard FROM PUBLIC;

GRANT SELECT ON platform.usage_measure_definition_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.entitlement_definition_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.product_offering_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.product_offering_entitlement_grant TO cpos_subscription_runtime;

GRANT SELECT, INSERT ON platform.tenant_subscription TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.subscription_lifecycle_occurrence TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.tenant_subscription_item TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.tenant_subscription_item_version TO cpos_subscription_runtime;
GRANT UPDATE (superseded_at) ON platform.tenant_subscription_item_version TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.tenant_entitlement_authority_guard TO cpos_subscription_runtime;
GRANT UPDATE (guard_version) ON platform.tenant_entitlement_authority_guard TO cpos_subscription_runtime;

GRANT INSERT ON platform.tenant_entitlement_authority_guard TO cpos_platform_bootstrap_runtime;
