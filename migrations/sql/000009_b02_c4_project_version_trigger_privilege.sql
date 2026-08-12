CREATE OR REPLACE FUNCTION platform.validate_project_version_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, platform
AS $$
DECLARE
  latest_version bigint;
  execution_tenant_id text;
BEGIN
  execution_tenant_id := nullif(current_setting('cpos.tenant_id', true), '');
  IF execution_tenant_id IS NULL OR NEW.tenant_id::text <> execution_tenant_id THEN
    RAISE EXCEPTION 'project version tenant does not match execution context';
  END IF;

  IF NOT platform.current_principal_has_active_tenant_role('OWNER') THEN
    RAISE EXCEPTION 'active OWNER authority is required to create a project version';
  END IF;

  PERFORM 1
  FROM platform.project p
  WHERE p.project_id = NEW.project_id
    AND p.tenant_id = NEW.tenant_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'project version must belong to an existing project in the execution tenant';
  END IF;

  SELECT max(pv.version)
    INTO latest_version
  FROM platform.project_version pv
  WHERE pv.project_id = NEW.project_id
    AND pv.tenant_id = NEW.tenant_id;

  IF latest_version IS NULL THEN
    IF NEW.version <> 1 THEN
      RAISE EXCEPTION 'first project version must be version 1';
    END IF;
  ELSIF NEW.version <> latest_version + 1 THEN
    RAISE EXCEPTION 'project version sequence must be contiguous';
  END IF;

  RETURN NEW;
END
$$;

REVOKE ALL ON FUNCTION platform.validate_project_version_insert() FROM PUBLIC;
