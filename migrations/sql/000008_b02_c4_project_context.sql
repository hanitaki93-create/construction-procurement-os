CREATE TABLE IF NOT EXISTS platform.project (
  project_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  authority_context_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, project_id),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id)
);

COMMENT ON TABLE platform.project IS
  'Tenant-scoped project identity. Project creation requires active tenant OWNER authority; project identity is not business approval authority.';

CREATE TABLE IF NOT EXISTS platform.project_version (
  project_id uuid NOT NULL REFERENCES platform.project(project_id),
  tenant_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  project_code text NOT NULL CHECK (
    char_length(btrim(project_code)) BETWEEN 1 AND 64
    AND project_code ~ '^[A-Za-z0-9][A-Za-z0-9._/-]{0,63}$'
  ),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 240),
  lifecycle_state text NOT NULL DEFAULT 'ACTIVE'
    CHECK (lifecycle_state IN ('ACTIVE', 'ARCHIVED')),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (project_id, version),
  FOREIGN KEY (tenant_id, project_id)
    REFERENCES platform.project(tenant_id, project_id),
  UNIQUE (project_id, effective_period WITHOUT OVERLAPS),
  UNIQUE (tenant_id, project_code, effective_period WITHOUT OVERLAPS)
);

COMMENT ON TABLE platform.project_version IS
  'Versioned project display/context meaning. Rows are immutable; later controlled supersession may append a non-overlapping version.';

CREATE OR REPLACE FUNCTION platform.current_principal_has_active_tenant_role(required_role_key text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, platform
AS $$
DECLARE
  execution_tenant_id uuid;
  execution_principal_id uuid;
BEGIN
  IF required_role_key IS NULL OR required_role_key !~ '^[A-Z][A-Z0-9_]{0,62}$' THEN
    RETURN false;
  END IF;

  BEGIN
    execution_tenant_id := nullif(current_setting('cpos.tenant_id', true), '')::uuid;
    execution_principal_id := nullif(current_setting('cpos.principal_id', true), '')::uuid;
  EXCEPTION
    WHEN invalid_text_representation THEN
      RETURN false;
  END;

  IF execution_tenant_id IS NULL OR execution_principal_id IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM platform.principal p
    JOIN platform.tenant_membership m
      ON m.tenant_id = p.tenant_id
     AND m.principal_id = p.principal_id
    JOIN platform.tenant_membership_version mv
      ON mv.tenant_id = m.tenant_id
     AND mv.membership_id = m.membership_id
    JOIN platform.role_assignment ra
      ON ra.tenant_id = m.tenant_id
     AND ra.membership_id = m.membership_id
     AND ra.role_key = required_role_key
    JOIN platform.role_assignment_version rav
      ON rav.tenant_id = ra.tenant_id
     AND rav.role_assignment_id = ra.role_assignment_id
    WHERE p.tenant_id = execution_tenant_id
      AND p.principal_id = execution_principal_id
      AND p.lifecycle_state = 'ACTIVE'
      AND mv.membership_state = 'ACTIVE'
      AND mv.effective_period @> statement_timestamp()
      AND rav.assignment_state = 'ACTIVE'
      AND rav.effective_period @> statement_timestamp()
  );
END
$$;

REVOKE ALL ON FUNCTION platform.current_principal_has_active_tenant_role(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION platform.current_principal_has_active_tenant_role(text)
  TO cpos_platform_runtime;

CREATE OR REPLACE FUNCTION platform.validate_project_version_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
DECLARE
  latest_version bigint;
BEGIN
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
  WHERE pv.project_id = NEW.project_id;

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

CREATE OR REPLACE FUNCTION platform.reject_project_rewrite()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, platform
AS $$
BEGIN
  RAISE EXCEPTION 'project identity/version rows are immutable; use a governed append-only project version operation';
END
$$;

DROP TRIGGER IF EXISTS project_version_insert_guard ON platform.project_version;
CREATE TRIGGER project_version_insert_guard
BEFORE INSERT ON platform.project_version
FOR EACH ROW
EXECUTE FUNCTION platform.validate_project_version_insert();

DROP TRIGGER IF EXISTS project_identity_immutable ON platform.project;
CREATE TRIGGER project_identity_immutable
BEFORE UPDATE OR DELETE ON platform.project
FOR EACH ROW
EXECUTE FUNCTION platform.reject_project_rewrite();

DROP TRIGGER IF EXISTS project_version_immutable ON platform.project_version;
CREATE TRIGGER project_version_immutable
BEFORE UPDATE OR DELETE ON platform.project_version
FOR EACH ROW
EXECUTE FUNCTION platform.reject_project_rewrite();

REVOKE ALL ON FUNCTION platform.validate_project_version_insert() FROM PUBLIC;
REVOKE ALL ON FUNCTION platform.reject_project_rewrite() FROM PUBLIC;

ALTER TABLE platform.project ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.project FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.project_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.project_version FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS project_select ON platform.project;
CREATE POLICY project_select ON platform.project
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS project_insert ON platform.project;
CREATE POLICY project_insert ON platform.project
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_principal_has_active_tenant_role('OWNER')
  );

DROP POLICY IF EXISTS project_version_select ON platform.project_version;
CREATE POLICY project_version_select ON platform.project_version
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS project_version_insert ON platform.project_version;
CREATE POLICY project_version_insert ON platform.project_version
  FOR INSERT TO cpos_platform_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    AND platform.current_principal_has_active_tenant_role('OWNER')
  );

REVOKE ALL ON platform.project FROM PUBLIC;
REVOKE ALL ON platform.project_version FROM PUBLIC;
GRANT SELECT, INSERT ON platform.project TO cpos_platform_runtime;
GRANT SELECT, INSERT ON platform.project_version TO cpos_platform_runtime;
