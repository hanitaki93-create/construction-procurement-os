CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cpos_platform_runtime') THEN
    CREATE ROLE cpos_platform_runtime
      NOLOGIN
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOINHERIT
      NOBYPASSRLS;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'cpos_platform_bootstrap_runtime') THEN
    CREATE ROLE cpos_platform_bootstrap_runtime
      NOLOGIN
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOINHERIT
      NOBYPASSRLS;
  END IF;
END
$$;

CREATE SCHEMA IF NOT EXISTS platform;
REVOKE ALL ON SCHEMA platform FROM PUBLIC;
GRANT USAGE ON SCHEMA platform TO cpos_platform_runtime, cpos_platform_bootstrap_runtime;

CREATE TABLE IF NOT EXISTS platform.bootstrap_intent (
  authentication_identity_id text NOT NULL,
  idempotency_key text NOT NULL,
  request_version integer NOT NULL DEFAULT 1 CHECK (request_version > 0),
  payload_digest text NOT NULL CHECK (payload_digest ~ '^[0-9a-f]{64}$'),
  state text NOT NULL CHECK (state IN ('PENDING', 'ESTABLISHED', 'REJECTED')),
  requested_tenant_name text NOT NULL CHECK (char_length(btrim(requested_tenant_name)) BETWEEN 1 AND 240),
  requested_legal_entity_name text NOT NULL CHECK (char_length(btrim(requested_legal_entity_name)) BETWEEN 1 AND 320),
  proposed_tenant_id uuid NOT NULL,
  legal_entity_id uuid,
  principal_id uuid,
  membership_id uuid,
  owner_role_assignment_id uuid,
  authority_context_id uuid,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  established_at timestamptz,
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
  PRIMARY KEY (authentication_identity_id, idempotency_key),
  UNIQUE (proposed_tenant_id),
  CHECK (
    (
      state = 'REJECTED'
      AND established_at IS NULL
      AND legal_entity_id IS NULL
      AND principal_id IS NULL
      AND membership_id IS NULL
      AND owner_role_assignment_id IS NULL
      AND authority_context_id IS NULL
    )
    OR
    (
      state = 'PENDING'
      AND established_at IS NULL
      AND legal_entity_id IS NOT NULL
      AND principal_id IS NOT NULL
      AND membership_id IS NOT NULL
      AND owner_role_assignment_id IS NOT NULL
      AND authority_context_id IS NOT NULL
    )
    OR
    (
      state = 'ESTABLISHED'
      AND established_at IS NOT NULL
      AND legal_entity_id IS NOT NULL
      AND principal_id IS NOT NULL
      AND membership_id IS NOT NULL
      AND owner_role_assignment_id IS NOT NULL
      AND authority_context_id IS NOT NULL
    )
  )
);

COMMENT ON TABLE platform.bootstrap_intent IS
  'Pre-tenant idempotency/provenance control only. It is not tenant business authority.';

CREATE TABLE IF NOT EXISTS platform.tenant (
  tenant_id uuid PRIMARY KEY,
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 240),
  lifecycle_state text NOT NULL DEFAULT 'ACTIVE' CHECK (lifecycle_state IN ('ACTIVE', 'SUSPENDED', 'TERMINATED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  version bigint NOT NULL DEFAULT 1 CHECK (version > 0)
);

COMMENT ON TABLE platform.tenant IS
  'Customer isolation/configuration/security boundary. Tenant is not automatically a legal entity.';

CREATE TABLE IF NOT EXISTS platform.legal_entity (
  legal_entity_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, legal_entity_id)
);

CREATE TABLE IF NOT EXISTS platform.legal_entity_version (
  legal_entity_id uuid NOT NULL REFERENCES platform.legal_entity(legal_entity_id),
  tenant_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  legal_name text NOT NULL CHECK (char_length(btrim(legal_name)) BETWEEN 1 AND 320),
  lifecycle_state text NOT NULL DEFAULT 'ACTIVE' CHECK (lifecycle_state IN ('ACTIVE', 'SUSPENDED', 'ENDED')),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (legal_entity_id, version),
  FOREIGN KEY (tenant_id, legal_entity_id)
    REFERENCES platform.legal_entity(tenant_id, legal_entity_id),
  UNIQUE (legal_entity_id, effective_period WITHOUT OVERLAPS)
);

CREATE TABLE IF NOT EXISTS platform.principal (
  principal_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  principal_kind text NOT NULL CHECK (principal_kind IN ('HUMAN', 'SERVICE')),
  display_name text NOT NULL CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 240),
  lifecycle_state text NOT NULL DEFAULT 'ACTIVE' CHECK (lifecycle_state IN ('ACTIVE', 'SUSPENDED', 'ENDED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, principal_id)
);

CREATE TABLE IF NOT EXISTS platform.principal_authentication_identity (
  binding_id uuid PRIMARY KEY DEFAULT uuidv7(),
  tenant_id uuid NOT NULL,
  principal_id uuid NOT NULL,
  authentication_identity_id text NOT NULL,
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, authentication_identity_id, effective_period WITHOUT OVERLAPS),
  UNIQUE (tenant_id, principal_id, authentication_identity_id, effective_period WITHOUT OVERLAPS)
);

CREATE TABLE IF NOT EXISTS platform.tenant_membership (
  membership_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  principal_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, principal_id)
    REFERENCES platform.principal(tenant_id, principal_id),
  UNIQUE (tenant_id, membership_id),
  UNIQUE (tenant_id, principal_id)
);

CREATE TABLE IF NOT EXISTS platform.tenant_membership_version (
  membership_id uuid NOT NULL REFERENCES platform.tenant_membership(membership_id),
  tenant_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  membership_state text NOT NULL CHECK (membership_state IN ('ACTIVE', 'SUSPENDED', 'ENDED')),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (membership_id, version),
  FOREIGN KEY (tenant_id, membership_id)
    REFERENCES platform.tenant_membership(tenant_id, membership_id),
  UNIQUE (membership_id, effective_period WITHOUT OVERLAPS)
);

CREATE TABLE IF NOT EXISTS platform.role_assignment (
  role_assignment_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  membership_id uuid NOT NULL,
  role_key text NOT NULL CHECK (role_key ~ '^[A-Z][A-Z0-9_]{0,62}$'),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  FOREIGN KEY (tenant_id, membership_id)
    REFERENCES platform.tenant_membership(tenant_id, membership_id),
  UNIQUE (tenant_id, role_assignment_id),
  UNIQUE (tenant_id, membership_id, role_key)
);

CREATE TABLE IF NOT EXISTS platform.role_assignment_version (
  role_assignment_id uuid NOT NULL REFERENCES platform.role_assignment(role_assignment_id),
  tenant_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  assignment_state text NOT NULL CHECK (assignment_state IN ('ACTIVE', 'SUSPENDED', 'ENDED')),
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (role_assignment_id, version),
  FOREIGN KEY (tenant_id, role_assignment_id)
    REFERENCES platform.role_assignment(tenant_id, role_assignment_id),
  UNIQUE (role_assignment_id, effective_period WITHOUT OVERLAPS)
);

CREATE TABLE IF NOT EXISTS platform.contracting_authority_context (
  authority_context_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES platform.tenant(tenant_id),
  context_kind text NOT NULL CHECK (context_kind IN ('SINGLE_LEGAL_ENTITY', 'MULTI_PARTY_BOUNDED')),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (tenant_id, authority_context_id)
);

CREATE TABLE IF NOT EXISTS platform.contracting_authority_context_version (
  authority_context_id uuid NOT NULL REFERENCES platform.contracting_authority_context(authority_context_id),
  tenant_id uuid NOT NULL,
  version bigint NOT NULL CHECK (version > 0),
  primary_legal_entity_id uuid NOT NULL,
  effective_period tstzrange NOT NULL CHECK (NOT isempty(effective_period)),
  recorded_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY (authority_context_id, version),
  FOREIGN KEY (tenant_id, authority_context_id)
    REFERENCES platform.contracting_authority_context(tenant_id, authority_context_id),
  FOREIGN KEY (tenant_id, primary_legal_entity_id)
    REFERENCES platform.legal_entity(tenant_id, legal_entity_id),
  UNIQUE (authority_context_id, effective_period WITHOUT OVERLAPS)
);

ALTER TABLE platform.bootstrap_intent ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.bootstrap_intent FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.legal_entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.legal_entity FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.legal_entity_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.legal_entity_version FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.principal ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.principal FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.principal_authentication_identity ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.principal_authentication_identity FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_membership ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_membership FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_membership_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_membership_version FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.role_assignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.role_assignment FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.role_assignment_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.role_assignment_version FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.contracting_authority_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.contracting_authority_context FORCE ROW LEVEL SECURITY;
ALTER TABLE platform.contracting_authority_context_version ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.contracting_authority_context_version FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS bootstrap_intent_select ON platform.bootstrap_intent;
CREATE POLICY bootstrap_intent_select ON platform.bootstrap_intent
  FOR SELECT TO cpos_platform_bootstrap_runtime
  USING (
    authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND proposed_tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  );

DROP POLICY IF EXISTS bootstrap_intent_insert ON platform.bootstrap_intent;
CREATE POLICY bootstrap_intent_insert ON platform.bootstrap_intent
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND proposed_tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  );

DROP POLICY IF EXISTS bootstrap_intent_update ON platform.bootstrap_intent;
CREATE POLICY bootstrap_intent_update ON platform.bootstrap_intent
  FOR UPDATE TO cpos_platform_bootstrap_runtime
  USING (
    authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND proposed_tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  )
  WITH CHECK (
    authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND proposed_tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  );

DROP POLICY IF EXISTS bootstrap_tenant_insert ON platform.tenant;
CREATE POLICY bootstrap_tenant_insert ON platform.tenant
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
  );

DROP POLICY IF EXISTS tenant_self_select ON platform.tenant;
CREATE POLICY tenant_self_select ON platform.tenant
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS bootstrap_legal_entity_insert ON platform.legal_entity;
CREATE POLICY bootstrap_legal_entity_insert ON platform.legal_entity
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = legal_entity.tenant_id
        AND bi.legal_entity_id = legal_entity.legal_entity_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_legal_entity_version_insert ON platform.legal_entity_version;
CREATE POLICY bootstrap_legal_entity_version_insert ON platform.legal_entity_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND version = 1
    AND lifecycle_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = legal_entity_version.tenant_id
        AND bi.legal_entity_id = legal_entity_version.legal_entity_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_principal_insert ON platform.principal;
CREATE POLICY bootstrap_principal_insert ON platform.principal
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND principal_kind = 'HUMAN'
    AND lifecycle_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = principal.tenant_id
        AND bi.principal_id = principal.principal_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_principal_auth_insert ON platform.principal_authentication_identity;
CREATE POLICY bootstrap_principal_auth_insert ON platform.principal_authentication_identity
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = principal_authentication_identity.authentication_identity_id
        AND bi.proposed_tenant_id = principal_authentication_identity.tenant_id
        AND bi.principal_id = principal_authentication_identity.principal_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_membership_insert ON platform.tenant_membership;
CREATE POLICY bootstrap_membership_insert ON platform.tenant_membership
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = tenant_membership.tenant_id
        AND bi.principal_id = tenant_membership.principal_id
        AND bi.membership_id = tenant_membership.membership_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_membership_version_insert ON platform.tenant_membership_version;
CREATE POLICY bootstrap_membership_version_insert ON platform.tenant_membership_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND version = 1
    AND membership_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = tenant_membership_version.tenant_id
        AND bi.membership_id = tenant_membership_version.membership_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_role_assignment_insert ON platform.role_assignment;
CREATE POLICY bootstrap_role_assignment_insert ON platform.role_assignment
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND role_key = 'OWNER'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = role_assignment.tenant_id
        AND bi.membership_id = role_assignment.membership_id
        AND bi.owner_role_assignment_id = role_assignment.role_assignment_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_role_assignment_version_insert ON platform.role_assignment_version;
CREATE POLICY bootstrap_role_assignment_version_insert ON platform.role_assignment_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND version = 1
    AND assignment_state = 'ACTIVE'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = role_assignment_version.tenant_id
        AND bi.owner_role_assignment_id = role_assignment_version.role_assignment_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_authority_context_insert ON platform.contracting_authority_context;
CREATE POLICY bootstrap_authority_context_insert ON platform.contracting_authority_context
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND context_kind = 'SINGLE_LEGAL_ENTITY'
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = contracting_authority_context.tenant_id
        AND bi.authority_context_id = contracting_authority_context.authority_context_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS bootstrap_authority_context_version_insert ON platform.contracting_authority_context_version;
CREATE POLICY bootstrap_authority_context_version_insert ON platform.contracting_authority_context_version
  FOR INSERT TO cpos_platform_bootstrap_runtime
  WITH CHECK (
    tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    AND version = 1
    AND EXISTS (
      SELECT 1
      FROM platform.bootstrap_intent bi
      WHERE bi.authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
        AND bi.proposed_tenant_id = contracting_authority_context_version.tenant_id
        AND bi.authority_context_id = contracting_authority_context_version.authority_context_id
        AND bi.legal_entity_id = contracting_authority_context_version.primary_legal_entity_id
        AND bi.state = 'PENDING'
    )
  );

DROP POLICY IF EXISTS tenant_legal_entity_select ON platform.legal_entity;
CREATE POLICY tenant_legal_entity_select ON platform.legal_entity
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_legal_entity_version_select ON platform.legal_entity_version;
CREATE POLICY tenant_legal_entity_version_select ON platform.legal_entity_version
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_principal_select ON platform.principal;
CREATE POLICY tenant_principal_select ON platform.principal
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_principal_auth_select ON platform.principal_authentication_identity;
CREATE POLICY tenant_principal_auth_select ON platform.principal_authentication_identity
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_membership_select ON platform.tenant_membership;
CREATE POLICY tenant_membership_select ON platform.tenant_membership
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_membership_version_select ON platform.tenant_membership_version;
CREATE POLICY tenant_membership_version_select ON platform.tenant_membership_version
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_role_assignment_select ON platform.role_assignment;
CREATE POLICY tenant_role_assignment_select ON platform.role_assignment
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_role_assignment_version_select ON platform.role_assignment_version;
CREATE POLICY tenant_role_assignment_version_select ON platform.role_assignment_version
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_authority_context_select ON platform.contracting_authority_context;
CREATE POLICY tenant_authority_context_select ON platform.contracting_authority_context
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

DROP POLICY IF EXISTS tenant_authority_context_version_select ON platform.contracting_authority_context_version;
CREATE POLICY tenant_authority_context_version_select ON platform.contracting_authority_context_version
  FOR SELECT TO cpos_platform_runtime
  USING (tenant_id::text = nullif(current_setting('cpos.tenant_id', true), ''));

REVOKE ALL ON ALL TABLES IN SCHEMA platform FROM PUBLIC;

GRANT SELECT, INSERT, UPDATE ON platform.bootstrap_intent TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.tenant TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.legal_entity TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.legal_entity_version TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.principal TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.principal_authentication_identity TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.tenant_membership TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.tenant_membership_version TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.role_assignment TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.role_assignment_version TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.contracting_authority_context TO cpos_platform_bootstrap_runtime;
GRANT INSERT ON platform.contracting_authority_context_version TO cpos_platform_bootstrap_runtime;

GRANT SELECT ON platform.tenant TO cpos_platform_runtime;
GRANT SELECT ON platform.legal_entity TO cpos_platform_runtime;
GRANT SELECT ON platform.legal_entity_version TO cpos_platform_runtime;
GRANT SELECT ON platform.principal TO cpos_platform_runtime;
GRANT SELECT ON platform.principal_authentication_identity TO cpos_platform_runtime;
GRANT SELECT ON platform.tenant_membership TO cpos_platform_runtime;
GRANT SELECT ON platform.tenant_membership_version TO cpos_platform_runtime;
GRANT SELECT ON platform.role_assignment TO cpos_platform_runtime;
GRANT SELECT ON platform.role_assignment_version TO cpos_platform_runtime;
GRANT SELECT ON platform.contracting_authority_context TO cpos_platform_runtime;
GRANT SELECT ON platform.contracting_authority_context_version TO cpos_platform_runtime;
