-- B02-C4 governed workspace/read contract.
-- This is a read-only cross-substrate contract inside the B02 platform/SaaS kernel:
-- cpos_platform_runtime may inspect tenant-local subscription lifecycle/guard facts,
-- but it receives no subscription mutation privilege.

DROP POLICY IF EXISTS platform_workspace_subscription_select ON platform.tenant_subscription;
CREATE POLICY platform_workspace_subscription_select ON platform.tenant_subscription
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS platform_workspace_subscription_lifecycle_select
  ON platform.subscription_lifecycle_occurrence;
CREATE POLICY platform_workspace_subscription_lifecycle_select
  ON platform.subscription_lifecycle_occurrence
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS platform_workspace_entitlement_guard_select
  ON platform.tenant_entitlement_authority_guard;
CREATE POLICY platform_workspace_entitlement_guard_select
  ON platform.tenant_entitlement_authority_guard
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

GRANT SELECT ON platform.tenant_subscription TO cpos_platform_runtime;
GRANT SELECT ON platform.subscription_lifecycle_occurrence TO cpos_platform_runtime;
GRANT SELECT ON platform.tenant_entitlement_authority_guard TO cpos_platform_runtime;

CREATE OR REPLACE FUNCTION platform.current_tenant_has_active_product_access()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = pg_catalog, platform
AS $$
  WITH current_states AS (
    SELECT
      s.tenant_subscription_id,
      (
        SELECT o.occurrence_kind
        FROM platform.subscription_lifecycle_occurrence o
        WHERE o.tenant_id = s.tenant_id
          AND o.tenant_subscription_id = s.tenant_subscription_id
          AND o.effective_at <= statement_timestamp()
        ORDER BY o.effective_at DESC, o.sequence DESC, o.recorded_at DESC,
                 o.subscription_lifecycle_occurrence_id DESC
        LIMIT 1
      ) AS occurrence_kind
    FROM platform.tenant_subscription s
    WHERE s.tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
  )
  SELECT EXISTS (
    SELECT 1
    FROM current_states
    WHERE occurrence_kind IN ('ACTIVATED', 'RESUMED')
  )
$$;

REVOKE ALL ON FUNCTION platform.current_tenant_has_active_product_access() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION platform.current_tenant_has_active_product_access()
  TO cpos_platform_runtime;

DROP POLICY IF EXISTS project_insert ON platform.project;
CREATE POLICY project_insert ON platform.project
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_principal_has_active_tenant_role('OWNER')
    AND platform.current_tenant_has_active_product_access()
  );

DROP POLICY IF EXISTS project_version_insert ON platform.project_version;
CREATE POLICY project_version_insert ON platform.project_version
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_principal_has_active_tenant_role('OWNER')
    AND platform.current_tenant_has_active_product_access()
  );
