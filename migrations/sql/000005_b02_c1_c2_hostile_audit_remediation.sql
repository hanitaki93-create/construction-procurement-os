-- B02 C1/C2 hostile-audit remediation.
-- Closes database-level gaps identified by the offline C1/C2 checkpoint audit without rewriting 000002-000004.

-- ---------------------------------------------------------------------------
-- C1: bind bootstrap-created tenant rows to the exact bootstrap lineage.
-- ---------------------------------------------------------------------------

ALTER TABLE platform.tenant
  ADD COLUMN IF NOT EXISTS bootstrap_authentication_identity_id text,
  ADD COLUMN IF NOT EXISTS bootstrap_idempotency_key text;

UPDATE platform.tenant AS tenant
SET
  bootstrap_authentication_identity_id = intent.authentication_identity_id,
  bootstrap_idempotency_key = intent.idempotency_key
FROM platform.bootstrap_intent AS intent
WHERE intent.proposed_tenant_id = tenant.tenant_id
  AND intent.state = 'ESTABLISHED'
  AND tenant.bootstrap_authentication_identity_id IS NULL
  AND tenant.bootstrap_idempotency_key IS NULL;

ALTER TABLE platform.tenant
  DROP CONSTRAINT IF EXISTS tenant_bootstrap_origin_pair;
ALTER TABLE platform.tenant
  ADD CONSTRAINT tenant_bootstrap_origin_pair CHECK (
    (bootstrap_authentication_identity_id IS NULL AND bootstrap_idempotency_key IS NULL)
    OR
    (bootstrap_authentication_identity_id IS NOT NULL AND bootstrap_idempotency_key IS NOT NULL)
  );

ALTER TABLE platform.tenant
  DROP CONSTRAINT IF EXISTS tenant_bootstrap_origin_fk;
ALTER TABLE platform.tenant
  ADD CONSTRAINT tenant_bootstrap_origin_fk
  FOREIGN KEY (bootstrap_authentication_identity_id, bootstrap_idempotency_key)
  REFERENCES platform.bootstrap_intent(authentication_identity_id, idempotency_key);

CREATE OR REPLACE FUNCTION platform.stamp_bootstrap_tenant_origin()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  identity_id text;
  proposed_id text;
  bootstrap_key text;
BEGIN
  IF current_user <> 'cpos_platform_bootstrap_runtime' THEN
    RETURN NEW;
  END IF;

  identity_id := nullif(current_setting('cpos.authentication_identity_id', true), '');
  proposed_id := nullif(current_setting('cpos.proposed_tenant_id', true), '');

  IF identity_id IS NULL OR proposed_id IS NULL OR NEW.tenant_id::text <> proposed_id THEN
    RAISE EXCEPTION 'bootstrap tenant insert is not bound to the active bootstrap context';
  END IF;

  SELECT intent.idempotency_key
  INTO bootstrap_key
  FROM platform.bootstrap_intent AS intent
  WHERE intent.authentication_identity_id = identity_id
    AND intent.proposed_tenant_id = NEW.tenant_id
    AND intent.state = 'PENDING';

  IF bootstrap_key IS NULL THEN
    RAISE EXCEPTION 'bootstrap tenant insert has no matching pending bootstrap intent';
  END IF;

  NEW.bootstrap_authentication_identity_id := identity_id;
  NEW.bootstrap_idempotency_key := bootstrap_key;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS tenant_bootstrap_origin_stamp ON platform.tenant;
CREATE TRIGGER tenant_bootstrap_origin_stamp
BEFORE INSERT ON platform.tenant
FOR EACH ROW
EXECUTE FUNCTION platform.stamp_bootstrap_tenant_origin();

REVOKE ALL ON FUNCTION platform.stamp_bootstrap_tenant_origin() FROM PUBLIC;

DROP POLICY IF EXISTS bootstrap_tenant_insert ON platform.tenant;
CREATE POLICY bootstrap_tenant_insert ON platform.tenant
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND bootstrap_authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = bootstrap_authentication_identity_id
        AND intent.idempotency_key = bootstrap_idempotency_key
        AND intent.proposed_tenant_id = tenant_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_tenant_select ON platform.tenant;
CREATE POLICY bootstrap_tenant_select ON platform.tenant
  FOR SELECT TO cpos_platform_bootstrap_runtime
  USING (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND bootstrap_authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = bootstrap_authentication_identity_id
        AND intent.idempotency_key = bootstrap_idempotency_key
        AND intent.proposed_tenant_id = tenant_id
        AND intent.state = 'PENDING'
    )
  );

GRANT SELECT ON platform.tenant TO cpos_platform_bootstrap_runtime;

CREATE OR REPLACE FUNCTION platform.bootstrap_tenant_origin_matches(target_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = pg_catalog, platform
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM platform.tenant AS tenant
    WHERE tenant.tenant_id = target_tenant_id
      AND tenant.bootstrap_authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
      AND tenant.tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  )
$$;

REVOKE ALL ON FUNCTION platform.bootstrap_tenant_origin_matches(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION platform.bootstrap_tenant_origin_matches(uuid)
  TO cpos_platform_bootstrap_runtime;

-- Recreate every bootstrap lineage policy with the additional tenant-origin proof.

DROP POLICY IF EXISTS bootstrap_legal_entity_insert ON platform.legal_entity;
CREATE POLICY bootstrap_legal_entity_insert ON platform.legal_entity
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = legal_entity.tenant_id
        AND intent.legal_entity_id = legal_entity.legal_entity_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_legal_entity_version_insert ON platform.legal_entity_version;
CREATE POLICY bootstrap_legal_entity_version_insert ON platform.legal_entity_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND version = 1
    AND lifecycle_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = legal_entity_version.tenant_id
        AND intent.legal_entity_id = legal_entity_version.legal_entity_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_principal_insert ON platform.principal;
CREATE POLICY bootstrap_principal_insert ON platform.principal
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND principal_kind = 'HUMAN'
    AND lifecycle_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = principal.tenant_id
        AND intent.principal_id = principal.principal_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_principal_auth_insert ON platform.principal_authentication_identity;
CREATE POLICY bootstrap_principal_auth_insert ON platform.principal_authentication_identity
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = principal_authentication_identity.authentication_identity_id
        AND intent.proposed_tenant_id = principal_authentication_identity.tenant_id
        AND intent.principal_id = principal_authentication_identity.principal_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_membership_insert ON platform.tenant_membership;
CREATE POLICY bootstrap_membership_insert ON platform.tenant_membership
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = tenant_membership.tenant_id
        AND intent.principal_id = tenant_membership.principal_id
        AND intent.membership_id = tenant_membership.membership_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_membership_version_insert ON platform.tenant_membership_version;
CREATE POLICY bootstrap_membership_version_insert ON platform.tenant_membership_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND version = 1
    AND membership_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = tenant_membership_version.tenant_id
        AND intent.membership_id = tenant_membership_version.membership_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_role_assignment_insert ON platform.role_assignment;
CREATE POLICY bootstrap_role_assignment_insert ON platform.role_assignment
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND role_key = 'OWNER'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = role_assignment.tenant_id
        AND intent.membership_id = role_assignment.membership_id
        AND intent.owner_role_assignment_id = role_assignment.role_assignment_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_role_assignment_version_insert ON platform.role_assignment_version;
CREATE POLICY bootstrap_role_assignment_version_insert ON platform.role_assignment_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND version = 1
    AND assignment_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = role_assignment_version.tenant_id
        AND intent.owner_role_assignment_id = role_assignment_version.role_assignment_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_authority_context_insert ON platform.contracting_authority_context;
CREATE POLICY bootstrap_authority_context_insert ON platform.contracting_authority_context
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND context_kind = 'SINGLE_LEGAL_ENTITY'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = contracting_authority_context.tenant_id
        AND intent.authority_context_id = contracting_authority_context.authority_context_id
        AND intent.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_authority_context_version_insert ON platform.contracting_authority_context_version;
CREATE POLICY bootstrap_authority_context_version_insert ON platform.contracting_authority_context_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    platform.bootstrap_tenant_origin_matches(tenant_id)
    AND version = 1
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent AS intent
      WHERE intent.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND intent.proposed_tenant_id = contracting_authority_context_version.tenant_id
        AND intent.authority_context_id = contracting_authority_context_version.authority_context_id
        AND intent.legal_entity_id = contracting_authority_context_version.primary_legal_entity_id
        AND intent.state = 'PENDING'
    )
  );

-- ---------------------------------------------------------------------------
-- C2: exact entitlement-contribution coherence across independent slots.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION platform.validate_subscription_item_version_semantics()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  expected_version bigint;
BEGIN
  SELECT COALESCE(max(version), 0) + 1
  INTO expected_version
  FROM platform.tenant_subscription_item_version
  WHERE tenant_subscription_item_id = NEW.tenant_subscription_item_id;

  IF NEW.version <> expected_version THEN
    RAISE EXCEPTION 'subscription item version must be the next contiguous version';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM platform.product_offering_version AS offering
    WHERE offering.product_offering_version_id = NEW.product_offering_version_id
      AND offering.lifecycle_state = 'AVAILABLE'
      AND offering.availability_period @> lower(NEW.effective_period)
  ) THEN
    RAISE EXCEPTION 'offering version is not available at subscription item version start';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM platform.product_offering_entitlement_grant AS incoming_grant
    JOIN platform.entitlement_definition_version AS incoming_definition
      ON incoming_definition.entitlement_definition_version_id = incoming_grant.entitlement_definition_version_id
    JOIN platform.tenant_subscription_item_version AS existing_version
      ON existing_version.tenant_id = NEW.tenant_id
      AND existing_version.superseded_at IS NULL
      AND existing_version.effective_period && NEW.effective_period
    JOIN platform.product_offering_entitlement_grant AS existing_grant
      ON existing_grant.product_offering_version_id = existing_version.product_offering_version_id
      AND existing_grant.entitlement_key = incoming_grant.entitlement_key
    JOIN platform.entitlement_definition_version AS existing_definition
      ON existing_definition.entitlement_definition_version_id = existing_grant.entitlement_definition_version_id
    WHERE incoming_grant.product_offering_version_id = NEW.product_offering_version_id
      AND (
        incoming_grant.entitlement_definition_version_id <> existing_grant.entitlement_definition_version_id
        OR incoming_grant.entitlement_kind <> existing_grant.entitlement_kind
        OR (
          incoming_grant.entitlement_kind = 'METERED_LIMIT'
          AND incoming_definition.usage_measure_definition_version_id
            IS DISTINCT FROM existing_definition.usage_measure_definition_version_id
        )
      )
  ) THEN
    RAISE EXCEPTION 'overlapping subscription components contribute incompatible entitlement semantics';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS tenant_subscription_item_version_semantics
  ON platform.tenant_subscription_item_version;
CREATE TRIGGER tenant_subscription_item_version_semantics
BEFORE INSERT ON platform.tenant_subscription_item_version
FOR EACH ROW
EXECUTE FUNCTION platform.validate_subscription_item_version_semantics();

REVOKE ALL ON FUNCTION platform.validate_subscription_item_version_semantics() FROM PUBLIC;

-- ---------------------------------------------------------------------------
-- C2: immutable product-version content until a governed publication model exists.
-- Corrections create new version rows; tenant bindings never observe in-place rewrites.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION platform.reject_product_catalog_version_rewrite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  RAISE EXCEPTION '% rows are immutable; publish/correct through a new governed version', TG_TABLE_NAME;
END
$$;

DROP TRIGGER IF EXISTS usage_measure_definition_version_immutable
  ON platform.usage_measure_definition_version;
CREATE TRIGGER usage_measure_definition_version_immutable
BEFORE UPDATE OR DELETE ON platform.usage_measure_definition_version
FOR EACH ROW
EXECUTE FUNCTION platform.reject_product_catalog_version_rewrite();

DROP TRIGGER IF EXISTS entitlement_definition_version_immutable
  ON platform.entitlement_definition_version;
CREATE TRIGGER entitlement_definition_version_immutable
BEFORE UPDATE OR DELETE ON platform.entitlement_definition_version
FOR EACH ROW
EXECUTE FUNCTION platform.reject_product_catalog_version_rewrite();

DROP TRIGGER IF EXISTS product_offering_version_immutable
  ON platform.product_offering_version;
CREATE TRIGGER product_offering_version_immutable
BEFORE UPDATE OR DELETE ON platform.product_offering_version
FOR EACH ROW
EXECUTE FUNCTION platform.reject_product_catalog_version_rewrite();

DROP TRIGGER IF EXISTS product_offering_entitlement_grant_immutable
  ON platform.product_offering_entitlement_grant;
CREATE TRIGGER product_offering_entitlement_grant_immutable
BEFORE UPDATE OR DELETE ON platform.product_offering_entitlement_grant
FOR EACH ROW
EXECUTE FUNCTION platform.reject_product_catalog_version_rewrite();

REVOKE ALL ON FUNCTION platform.reject_product_catalog_version_rewrite() FROM PUBLIC;

-- ---------------------------------------------------------------------------
-- C2: lifecycle legality/continuity and terminal-state absorption.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION platform.validate_subscription_lifecycle_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  expected_sequence bigint;
  lifecycle_state text := 'INACTIVE';
  event record;
BEGIN
  SELECT COALESCE(max(sequence), 0) + 1
  INTO expected_sequence
  FROM platform.subscription_lifecycle_occurrence
  WHERE tenant_subscription_id = NEW.tenant_subscription_id;

  IF NEW.sequence <> expected_sequence THEN
    RAISE EXCEPTION 'subscription lifecycle sequence must be contiguous';
  END IF;

  FOR event IN
    SELECT occurrence_kind
    FROM (
      SELECT
        existing.occurrence_kind,
        existing.effective_at,
        existing.sequence,
        existing.subscription_lifecycle_occurrence_id::text AS occurrence_id
      FROM platform.subscription_lifecycle_occurrence AS existing
      WHERE existing.tenant_subscription_id = NEW.tenant_subscription_id

      UNION ALL

      SELECT
        NEW.occurrence_kind,
        NEW.effective_at,
        NEW.sequence,
        NEW.subscription_lifecycle_occurrence_id::text
    ) AS timeline
    ORDER BY effective_at, sequence, occurrence_id
  LOOP
    CASE lifecycle_state
      WHEN 'INACTIVE' THEN
        CASE event.occurrence_kind
          WHEN 'ACTIVATED' THEN lifecycle_state := 'ACTIVE';
          WHEN 'CANCELLED' THEN lifecycle_state := 'CANCELLED';
          WHEN 'EXPIRED' THEN lifecycle_state := 'EXPIRED';
          ELSE RAISE EXCEPTION 'illegal subscription lifecycle transition from INACTIVE to %', event.occurrence_kind;
        END CASE;
      WHEN 'ACTIVE' THEN
        CASE event.occurrence_kind
          WHEN 'SUSPENDED' THEN lifecycle_state := 'SUSPENDED';
          WHEN 'CANCELLED' THEN lifecycle_state := 'CANCELLED';
          WHEN 'EXPIRED' THEN lifecycle_state := 'EXPIRED';
          ELSE RAISE EXCEPTION 'illegal subscription lifecycle transition from ACTIVE to %', event.occurrence_kind;
        END CASE;
      WHEN 'SUSPENDED' THEN
        CASE event.occurrence_kind
          WHEN 'RESUMED' THEN lifecycle_state := 'ACTIVE';
          WHEN 'CANCELLED' THEN lifecycle_state := 'CANCELLED';
          WHEN 'EXPIRED' THEN lifecycle_state := 'EXPIRED';
          ELSE RAISE EXCEPTION 'illegal subscription lifecycle transition from SUSPENDED to %', event.occurrence_kind;
        END CASE;
      WHEN 'CANCELLED' THEN
        RAISE EXCEPTION 'CANCELLED is a terminal subscription lifecycle state';
      WHEN 'EXPIRED' THEN
        RAISE EXCEPTION 'EXPIRED is a terminal subscription lifecycle state';
      ELSE
        RAISE EXCEPTION 'unknown subscription lifecycle state %', lifecycle_state;
    END CASE;
  END LOOP;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS subscription_lifecycle_legality
  ON platform.subscription_lifecycle_occurrence;
CREATE TRIGGER subscription_lifecycle_legality
BEFORE INSERT ON platform.subscription_lifecycle_occurrence
FOR EACH ROW
EXECUTE FUNCTION platform.validate_subscription_lifecycle_insert();

REVOKE ALL ON FUNCTION platform.validate_subscription_lifecycle_insert() FROM PUBLIC;

-- ---------------------------------------------------------------------------
-- C2: every material entitlement mutation must advance the tenant guard in
-- the same transaction. This preserves the existing explicit guarded-mutation
-- operation pattern while making omission fail at commit.
-- ---------------------------------------------------------------------------

ALTER TABLE platform.tenant_entitlement_authority_guard
  ADD COLUMN IF NOT EXISTS last_advanced_txid text;

ALTER TABLE platform.subscription_lifecycle_occurrence
  ADD COLUMN IF NOT EXISTS entitlement_guard_version_at_record bigint;

ALTER TABLE platform.tenant_subscription_item_version
  ADD COLUMN IF NOT EXISTS entitlement_guard_version_at_record bigint,
  ADD COLUMN IF NOT EXISTS supersession_guard_version_at_record bigint;

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
  NEW.last_advanced_txid := pg_current_xact_id()::text;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION platform.stamp_entitlement_guard_baseline()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  current_guard bigint;
BEGIN
  SELECT guard_version
  INTO current_guard
  FROM platform.tenant_entitlement_authority_guard
  WHERE tenant_id = NEW.tenant_id;

  IF current_guard IS NULL THEN
    RAISE EXCEPTION 'tenant entitlement authority guard is missing';
  END IF;

  NEW.entitlement_guard_version_at_record := current_guard;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS subscription_lifecycle_guard_baseline
  ON platform.subscription_lifecycle_occurrence;
CREATE TRIGGER subscription_lifecycle_guard_baseline
BEFORE INSERT ON platform.subscription_lifecycle_occurrence
FOR EACH ROW
EXECUTE FUNCTION platform.stamp_entitlement_guard_baseline();

DROP TRIGGER IF EXISTS subscription_item_version_guard_baseline
  ON platform.tenant_subscription_item_version;
CREATE TRIGGER subscription_item_version_guard_baseline
BEFORE INSERT ON platform.tenant_subscription_item_version
FOR EACH ROW
EXECUTE FUNCTION platform.stamp_entitlement_guard_baseline();

CREATE OR REPLACE FUNCTION platform.stamp_entitlement_guard_supersession_baseline()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  current_guard bigint;
BEGIN
  IF NEW.superseded_at IS NOT DISTINCT FROM OLD.superseded_at THEN
    RETURN NEW;
  END IF;

  SELECT guard_version
  INTO current_guard
  FROM platform.tenant_entitlement_authority_guard
  WHERE tenant_id = NEW.tenant_id;

  IF current_guard IS NULL THEN
    RAISE EXCEPTION 'tenant entitlement authority guard is missing';
  END IF;

  NEW.supersession_guard_version_at_record := current_guard;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS subscription_item_version_supersession_guard_baseline
  ON platform.tenant_subscription_item_version;
CREATE TRIGGER subscription_item_version_supersession_guard_baseline
BEFORE UPDATE ON platform.tenant_subscription_item_version
FOR EACH ROW
EXECUTE FUNCTION platform.stamp_entitlement_guard_supersession_baseline();

CREATE OR REPLACE FUNCTION platform.require_entitlement_guard_advanced_same_transaction()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  baseline bigint;
  current_guard bigint;
  advanced_txid text;
BEGIN
  IF TG_TABLE_NAME = 'subscription_lifecycle_occurrence' THEN
    baseline := NEW.entitlement_guard_version_at_record;
  ELSIF TG_TABLE_NAME = 'tenant_subscription_item_version' AND TG_OP = 'INSERT' THEN
    baseline := NEW.entitlement_guard_version_at_record;
  ELSIF TG_TABLE_NAME = 'tenant_subscription_item_version' AND TG_OP = 'UPDATE' THEN
    IF NEW.superseded_at IS NOT DISTINCT FROM OLD.superseded_at THEN
      RETURN NEW;
    END IF;
    baseline := NEW.supersession_guard_version_at_record;
  ELSE
    RAISE EXCEPTION 'unsupported entitlement guard obligation source %.%', TG_TABLE_NAME, TG_OP;
  END IF;

  SELECT guard_version, last_advanced_txid
  INTO current_guard, advanced_txid
  FROM platform.tenant_entitlement_authority_guard
  WHERE tenant_id = NEW.tenant_id;

  IF baseline IS NULL OR current_guard IS NULL THEN
    RAISE EXCEPTION 'entitlement guard obligation is missing its baseline/current guard';
  END IF;

  IF current_guard <= baseline OR advanced_txid IS DISTINCT FROM pg_current_xact_id()::text THEN
    RAISE EXCEPTION 'material entitlement mutation must advance the tenant entitlement guard in the same transaction';
  END IF;

  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS subscription_lifecycle_requires_guard_advance
  ON platform.subscription_lifecycle_occurrence;
CREATE CONSTRAINT TRIGGER subscription_lifecycle_requires_guard_advance
AFTER INSERT ON platform.subscription_lifecycle_occurrence
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE FUNCTION platform.require_entitlement_guard_advanced_same_transaction();

DROP TRIGGER IF EXISTS subscription_item_version_insert_requires_guard_advance
  ON platform.tenant_subscription_item_version;
CREATE CONSTRAINT TRIGGER subscription_item_version_insert_requires_guard_advance
AFTER INSERT ON platform.tenant_subscription_item_version
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE FUNCTION platform.require_entitlement_guard_advanced_same_transaction();

DROP TRIGGER IF EXISTS subscription_item_version_update_requires_guard_advance
  ON platform.tenant_subscription_item_version;
CREATE CONSTRAINT TRIGGER subscription_item_version_update_requires_guard_advance
AFTER UPDATE ON platform.tenant_subscription_item_version
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE FUNCTION platform.require_entitlement_guard_advanced_same_transaction();

REVOKE ALL ON FUNCTION platform.stamp_entitlement_guard_baseline() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.stamp_entitlement_guard_supersession_baseline() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.require_entitlement_guard_advanced_same_transaction() FROM PUBLIC;

COMMENT ON COLUMN platform.tenant_entitlement_authority_guard.last_advanced_txid IS
  'Technical same-transaction proof for material entitlement mutations; not business/commercial truth.';
