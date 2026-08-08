import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { createIntegrationPool, requiredDatabaseUrl } from './test-support.js';

const setupPool = createIntegrationPool('cpos-b02-bootstrap-context-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 6,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-bootstrap-context-runtime',
});

const schema = 'b02_bootstrap_context_test';
const bootstrapRole = 'cpos_b02_bootstrap_runtime_test';
const tenantRole = 'cpos_b02_bootstrap_tenant_test';
const bootstrapIntentTable = '"b02_bootstrap_context_test"."bootstrap_intent"';
const tenantTable = '"b02_bootstrap_context_test"."tenant"';
const tenantA = '019c0000-0000-7000-8000-000000000001';
const tenantB = '019c0000-0000-7000-8000-000000000002';
const tenantC = '019c0000-0000-7000-8000-000000000003';

interface BootstrapContextView {
  readonly current_user: string;
  readonly tenant_id: string;
  readonly principal_id: string;
  readonly project_id: string;
  readonly authority_context_id: string;
  readonly authentication_identity_id: string;
  readonly proposed_tenant_id: string;
  readonly operation_key: string;
  readonly invocation_id: string;
  readonly service_identity: string;
  readonly module_key: string;
}

interface BootstrapIntentRow {
  readonly authentication_identity_id: string;
  readonly idempotency_key: string;
  readonly proposed_tenant_id: string;
  readonly payload_digest: string;
}

interface BootstrapHandle {
  context(): Promise<BootstrapContextView | undefined>;
  getIntent(idempotencyKey: string): Promise<BootstrapIntentRow | undefined>;
  insertIntent(
    authenticationIdentityId: string,
    idempotencyKey: string,
    proposedTenantId: string,
    payloadDigest: string,
  ): Promise<void>;
  insertTenant(tenantId: string, payload: string): Promise<void>;
  readTenant(tenantId: string): Promise<Readonly<{ tenant_id: string; payload: string }> | undefined>;
  updateTenant(tenantId: string, payload: string): Promise<void>;
}

interface TenantHandle {
  readTenant(tenantId: string): Promise<Readonly<{ tenant_id: string; payload: string }> | undefined>;
  readBootstrapIntent(idempotencyKey: string): Promise<BootstrapIntentRow | undefined>;
}

const bootstrapAdapter = definePersistenceAdapter<BootstrapHandle>({
  moduleKey: 'platform_bootstrap',
  databaseRole: bootstrapRole,
  executionScope: 'BOOTSTRAP',
  buildHandle: (executor) => ({
    context: () =>
      executor.oneOrNone<BootstrapContextView>(sql`
        SELECT
          current_user AS current_user,
          current_setting('cpos.tenant_id', true) AS tenant_id,
          current_setting('cpos.principal_id', true) AS principal_id,
          current_setting('cpos.project_id', true) AS project_id,
          current_setting('cpos.authority_context_id', true) AS authority_context_id,
          current_setting('cpos.authentication_identity_id', true) AS authentication_identity_id,
          current_setting('cpos.proposed_tenant_id', true) AS proposed_tenant_id,
          current_setting('cpos.operation_key', true) AS operation_key,
          current_setting('cpos.invocation_id', true) AS invocation_id,
          current_setting('cpos.service_identity', true) AS service_identity,
          current_setting('cpos.module_key', true) AS module_key
      `),
    getIntent: (idempotencyKey) =>
      executor.oneOrNone<BootstrapIntentRow>(sql`
        SELECT authentication_identity_id, idempotency_key, proposed_tenant_id::text, payload_digest
        FROM b02_bootstrap_context_test.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `),
    insertIntent: async (
      authenticationIdentityId,
      idempotencyKey,
      proposedTenantId,
      payloadDigest,
    ) => {
      await executor.execute(sql`
        INSERT INTO b02_bootstrap_context_test.bootstrap_intent
          (authentication_identity_id, idempotency_key, proposed_tenant_id, payload_digest)
        VALUES
          (${authenticationIdentityId}, ${idempotencyKey}, ${proposedTenantId}, ${payloadDigest})
      `);
    },
    insertTenant: async (tenantId, payload) => {
      await executor.execute(sql`
        INSERT INTO b02_bootstrap_context_test.tenant (tenant_id, payload)
        VALUES (${tenantId}, ${payload})
      `);
    },
    readTenant: (tenantId) =>
      executor.oneOrNone(sql`
        SELECT tenant_id::text AS tenant_id, payload
        FROM b02_bootstrap_context_test.tenant
        WHERE tenant_id = ${tenantId}
      `),
    updateTenant: async (tenantId, payload) => {
      await executor.execute(sql`
        UPDATE b02_bootstrap_context_test.tenant
        SET payload = ${payload}
        WHERE tenant_id = ${tenantId}
      `);
    },
  }),
});

const tenantAdapter = definePersistenceAdapter<TenantHandle>({
  moduleKey: 'platform',
  databaseRole: tenantRole,
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    readTenant: (tenantId) =>
      executor.oneOrNone(sql`
        SELECT tenant_id::text AS tenant_id, payload
        FROM b02_bootstrap_context_test.tenant
        WHERE tenant_id = ${tenantId}
      `),
    readBootstrapIntent: (idempotencyKey) =>
      executor.oneOrNone<BootstrapIntentRow>(sql`
        SELECT authentication_identity_id, idempotency_key, proposed_tenant_id::text, payload_digest
        FROM b02_bootstrap_context_test.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `),
  }),
});

function bootstrapContext(authenticationIdentityId: string, proposedTenantId: string, invocationId: string) {
  return {
    authenticationIdentityId,
    proposedTenantId,
    operationKey: 'platform.tenant.bootstrap.v1' as const,
    invocationId,
    serviceIdentity: 'api',
  };
}

function tenantContext(tenantId: string, invocationId: string) {
  return {
    tenantId,
    principalId: `principal-${tenantId}`,
    operationKey: 'platform.tenant.read.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

beforeAll(async () => {
  await setupPool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await setupPool.query(`DROP ROLE IF EXISTS "${bootstrapRole}"`);
  await setupPool.query(`DROP ROLE IF EXISTS "${tenantRole}"`);
  await setupPool.query(
    `CREATE ROLE "${bootstrapRole}" NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`,
  );
  await setupPool.query(
    `CREATE ROLE "${tenantRole}" NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`,
  );
  await setupPool.query(`CREATE SCHEMA "${schema}"`);
  await setupPool.query(`
    CREATE TABLE ${bootstrapIntentTable} (
      authentication_identity_id text NOT NULL,
      idempotency_key text NOT NULL,
      proposed_tenant_id uuid NOT NULL,
      payload_digest text NOT NULL,
      PRIMARY KEY (authentication_identity_id, idempotency_key)
    )
  `);
  await setupPool.query(`
    CREATE TABLE ${tenantTable} (
      tenant_id uuid PRIMARY KEY,
      payload text NOT NULL
    )
  `);

  await setupPool.query(`ALTER TABLE ${bootstrapIntentTable} ENABLE ROW LEVEL SECURITY`);
  await setupPool.query(`ALTER TABLE ${bootstrapIntentTable} FORCE ROW LEVEL SECURITY`);
  await setupPool.query(`ALTER TABLE ${tenantTable} ENABLE ROW LEVEL SECURITY`);
  await setupPool.query(`ALTER TABLE ${tenantTable} FORCE ROW LEVEL SECURITY`);

  await setupPool.query(`
    CREATE POLICY bootstrap_identity_isolation ON ${bootstrapIntentTable}
    FOR ALL TO "${bootstrapRole}"
    USING (
      authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
    )
    WITH CHECK (
      authentication_identity_id = nullif(current_setting('cpos.authentication_identity_id', true), '')
      AND proposed_tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    )
  `);
  await setupPool.query(`
    CREATE POLICY bootstrap_tenant_insert ON ${tenantTable}
    FOR INSERT TO "${bootstrapRole}"
    WITH CHECK (
      tenant_id::text = nullif(current_setting('cpos.proposed_tenant_id', true), '')
    )
  `);
  await setupPool.query(`
    CREATE POLICY ordinary_tenant_read ON ${tenantTable}
    FOR SELECT TO "${tenantRole}"
    USING (
      tenant_id::text = nullif(current_setting('cpos.tenant_id', true), '')
    )
  `);

  await setupPool.query(`GRANT USAGE ON SCHEMA "${schema}" TO "${bootstrapRole}"`);
  await setupPool.query(`GRANT USAGE ON SCHEMA "${schema}" TO "${tenantRole}"`);
  await setupPool.query(
    `GRANT SELECT, INSERT ON ${bootstrapIntentTable} TO "${bootstrapRole}"`,
  );
  await setupPool.query(`GRANT INSERT ON ${tenantTable} TO "${bootstrapRole}"`);
  await setupPool.query(`GRANT SELECT ON ${tenantTable} TO "${tenantRole}"`);

  await setupPool.query(`
    INSERT INTO ${bootstrapIntentTable}
      (authentication_identity_id, idempotency_key, proposed_tenant_id, payload_digest)
    VALUES
      ('identity-a', 'retry-a', '${tenantA}', 'digest-a'),
      ('identity-b', 'retry-b', '${tenantB}', 'digest-b')
  `);
  await setupPool.query(`
    INSERT INTO ${tenantTable} (tenant_id, payload)
    VALUES ('${tenantA}', 'existing A'), ('${tenantB}', 'existing B')
  `);
});

afterAll(async () => {
  await runtime.close();
  await setupPool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await setupPool.query(`DROP ROLE IF EXISTS "${bootstrapRole}"`);
  await setupPool.query(`DROP ROLE IF EXISTS "${tenantRole}"`);
  await setupPool.end();
});

describe('B02 pre-tenant bootstrap isolation', () => {
  it('clears ordinary tenant authority and exposes only bootstrap identity/proposed tenant', async () => {
    const observed = await runtime.withBootstrapContext(
      bootstrapContext('identity-a', tenantC, 'bootstrap-context-readback'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-context-readback' },
      bootstrapAdapter,
      (handle) => handle.context(),
    );

    expect(observed).toEqual({
      current_user: bootstrapRole,
      tenant_id: '',
      principal_id: '',
      project_id: '',
      authority_context_id: '',
      authentication_identity_id: 'identity-a',
      proposed_tenant_id: tenantC,
      operation_key: 'platform.tenant.bootstrap.v1',
      invocation_id: 'bootstrap-context-readback',
      service_identity: 'api',
      module_key: 'platform_bootstrap',
    });
  });

  it('isolates bootstrap-control rows by verified technical identity', async () => {
    const own = await runtime.withBootstrapContext(
      bootstrapContext('identity-a', tenantC, 'bootstrap-read-own'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-read-own' },
      bootstrapAdapter,
      (handle) => handle.getIntent('retry-a'),
    );
    const other = await runtime.withBootstrapContext(
      bootstrapContext('identity-a', tenantC, 'bootstrap-read-other'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-read-other' },
      bootstrapAdapter,
      (handle) => handle.getIntent('retry-b'),
    );

    expect(own?.authentication_identity_id).toBe('identity-a');
    expect(other).toBeUndefined();
  });

  it('rejects bootstrap-control insertion for another authentication identity', async () => {
    await expect(
      runtime.withBootstrapContext(
        bootstrapContext('identity-a', tenantC, 'bootstrap-wrong-identity'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-wrong-identity' },
        bootstrapAdapter,
        (handle) => handle.insertIntent('identity-b', 'attack', tenantC, 'digest'),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('can insert only the exact proposed tenant and cannot read/update existing tenants', async () => {
    await runtime.withBootstrapContext(
      bootstrapContext('identity-a', tenantC, 'bootstrap-create-proposed'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-create-proposed' },
      bootstrapAdapter,
      (handle) => handle.insertTenant(tenantC, 'created C'),
    );

    await expect(
      runtime.withBootstrapContext(
        bootstrapContext('identity-a', tenantC, 'bootstrap-create-other'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-create-other' },
        bootstrapAdapter,
        (handle) => handle.insertTenant(tenantB, 'must fail'),
      ),
    ).rejects.toMatchObject({ code: '42501' });

    await expect(
      runtime.withBootstrapContext(
        bootstrapContext('identity-a', tenantC, 'bootstrap-read-existing'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-read-existing' },
        bootstrapAdapter,
        (handle) => handle.readTenant(tenantA),
      ),
    ).rejects.toMatchObject({ code: '42501' });

    await expect(
      runtime.withBootstrapContext(
        bootstrapContext('identity-a', tenantC, 'bootstrap-update-existing'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-update-existing' },
        bootstrapAdapter,
        (handle) => handle.updateTenant(tenantA, 'must fail'),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('prevents ordinary tenant runtime from reading bootstrap-control state', async () => {
    await expect(
      runtime.withExecutionContext(
        tenantContext(tenantA, 'tenant-read-bootstrap'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-read-bootstrap' },
        tenantAdapter,
        (handle) => handle.readBootstrapIntent('retry-a'),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('rejects adapter-scope crossover before persistence is exposed', async () => {
    await expect(
      runtime.withBootstrapContext(
        bootstrapContext('identity-a', tenantC, 'bootstrap-with-tenant-adapter'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'bootstrap-with-tenant-adapter' },
        tenantAdapter,
        async () => 'unreachable',
      ),
    ).rejects.toThrow(/requires a BOOTSTRAP persistence adapter/u);

    await expect(
      runtime.withExecutionContext(
        tenantContext(tenantA, 'tenant-with-bootstrap-adapter'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-with-bootstrap-adapter' },
        bootstrapAdapter,
        async () => 'unreachable',
      ),
    ).rejects.toThrow(/requires a TENANT persistence adapter/u);
  });
});
