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
  product_offering_version_id uuid NOT NULL REFERENCES platform.product_offering_version(product_offering_version_id),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  FOREIGN KEY (tenant_id, tenant_subscription_id)
    REFERENCES platform.tenant_subscription(tenant_id, tenant_subscription_id),
  UNIQUE (tenant_id, tenant_subscription_item_id),
  UNIQUE (tenant_id, item_slot_key, effective_period WITHOUT OVERLAPS)
);

COMMENT ON TABLE platform.tenant_subscription_item IS
  'Effective-dated product-owned subscription component bound to one exact immutable offering version. Same-slot authority cannot overlap.';

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

ALTER TABLE platform.tenant_subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.subscription_lifecycle_occurrence ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.subscription_lifecycle_occurrence FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_subscription_item FORCE ROW LEVEL SECURITY;
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

DROP POLICY IF EXISTS subscription_item_update ON platform.tenant_subscription_item;
CREATE POLICY subscription_item_update ON platform.tenant_subscription_item
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
REVOKE ALL ON platform.tenant_entitlement_authority_guard FROM PUBLIC;

GRANT SELECT ON platform.usage_measure_definition_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.entitlement_definition_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.product_offering_version TO cpos_subscription_runtime;
GRANT SELECT ON platform.product_offering_entitlement_grant TO cpos_subscription_runtime;

GRANT SELECT, INSERT ON platform.tenant_subscription TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.subscription_lifecycle_occurrence TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.tenant_subscription_item TO cpos_subscription_runtime;
GRANT UPDATE (effective_period, version) ON platform.tenant_subscription_item TO cpos_subscription_runtime;
GRANT SELECT, INSERT ON platform.tenant_entitlement_authority_guard TO cpos_subscription_runtime;
GRANT UPDATE (guard_version, updated_at) ON platform.tenant_entitlement_authority_guard TO cpos_subscription_runtime;

GRANT INSERT ON platform.tenant_entitlement_authority_guard TO cpos_platform_bootstrap_runtime;
