import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { createIntegrationPool, requiredDatabaseUrl } from './test-support.js';

const setupPool = createIntegrationPool('cpos-b02-execution-context-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 6,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-execution-context-runtime',
});

const schema = 'b02_execution_context_test';
const role = 'cpos_b02_platform_runtime_test';
const table = '"b02_execution_context_test"."tenant_item"';

interface ContextView {
  readonly current_user: string;
  readonly tenant_id: string;
  readonly principal_id: string;
  readonly represented_principal_id: string;
  readonly project_id: string;
  readonly authority_context_id: string;
  readonly operation_key: string;
  readonly invocation_id: string;
  readonly service_identity: string;
  readonly module_key: string;
}

interface TenantItemRow {
  readonly tenant_id: string;
  readonly item_id: string;
  readonly payload: string;
}

interface TestPersistenceHandle {
  context(): Promise<ContextView | undefined>;
  list(): Promise<readonly TenantItemRow[]>;
  insert(tenantId: string, itemId: string, payload: string): Promise<void>;
  attemptContextMutation(): Promise<void>;
}

const adapter = definePersistenceAdapter<TestPersistenceHandle>({
  moduleKey: 'platform',
  databaseRole: role,
  buildHandle: (executor) => ({
    context: () =>
      executor.oneOrNone<ContextView>(sql`
        SELECT
          current_user AS current_user,
          current_setting('cpos.tenant_id', true) AS tenant_id,
          current_setting('cpos.principal_id', true) AS principal_id,
          current_setting('cpos.represented_principal_id', true) AS represented_principal_id,
          current_setting('cpos.project_id', true) AS project_id,
          current_setting('cpos.authority_context_id', true) AS authority_context_id,
          current_setting('cpos.operation_key', true) AS operation_key,
          current_setting('cpos.invocation_id', true) AS invocation_id,
          current_setting('cpos.service_identity', true) AS service_identity,
          current_setting('cpos.module_key', true) AS module_key
      `),
    list: () =>
      executor.all<TenantItemRow>(sql`
        SELECT tenant_id, item_id, payload
        FROM b02_execution_context_test.tenant_item
        ORDER BY item_id
      `),
    insert: async (tenantId, itemId, payload) => {
      await executor.execute(sql`
        INSERT INTO b02_execution_context_test.tenant_item (tenant_id, item_id, payload)
        VALUES (${tenantId}, ${itemId}, ${payload})
      `);
    },
    attemptContextMutation: async () => {
      await executor.all(sql`
        SELECT set_config('cpos.tenant_id', 'tenant-b', true) AS changed
      `);
    },
  }),
});

function context(tenantId: string, invocationId: string) {
  return {
    tenantId,
    principalId: `principal-${tenantId}`,
    representedPrincipalId: `represented-${tenantId}`,
    projectId: `project-${tenantId}`,
    authorityContextId: `authority-${tenantId}`,
    operationKey: 'platform.test-tenant-item.v1',
    invocationId,
    serviceIdentity: 'api',
  } as const;
}

beforeAll(async () => {
  await setupPool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await setupPool.query(`DROP ROLE IF EXISTS "${role}"`);
  await setupPool.query(
    `CREATE ROLE "${role}" NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`,
  );
  await setupPool.query(`CREATE SCHEMA "${schema}"`);
  await setupPool.query(`
    CREATE TABLE ${table} (
      tenant_id text NOT NULL,
      item_id text PRIMARY KEY,
      payload text NOT NULL
    )
  `);
  await setupPool.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`);
  await setupPool.query(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY`);
  await setupPool.query(`
    CREATE POLICY tenant_isolation ON ${table}
    USING (tenant_id = nullif(current_setting('cpos.tenant_id', true), ''))
    WITH CHECK (tenant_id = nullif(current_setting('cpos.tenant_id', true), ''))
  `);
  await setupPool.query(`GRANT USAGE ON SCHEMA "${schema}" TO "${role}"`);
  await setupPool.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ${table} TO "${role}"`);
  await setupPool.query(
    `INSERT INTO ${table} (tenant_id, item_id, payload) VALUES
      ('tenant-a', 'a-1', 'A secret'),
      ('tenant-b', 'b-1', 'B secret')`,
  );
});

afterAll(async () => {
  await runtime.close();
  await setupPool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await setupPool.query(`DROP ROLE IF EXISTS "${role}"`);
  await setupPool.end();
});

describe('B02 fail-closed execution context and FORCE RLS', () => {
  it('sets and verifies exact context before exposing the module handle', async () => {
    const observed = await runtime.withExecutionContext(
      context('tenant-a', 'invocation-context-readback'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'context-readback' },
      adapter,
      (handle) => handle.context(),
    );

    expect(observed).toEqual({
      current_user: role,
      tenant_id: 'tenant-a',
      principal_id: 'principal-tenant-a',
      represented_principal_id: 'represented-tenant-a',
      project_id: 'project-tenant-a',
      authority_context_id: 'authority-tenant-a',
      operation_key: 'platform.test-tenant-item.v1',
      invocation_id: 'invocation-context-readback',
      service_identity: 'api',
      module_key: 'platform',
    });
  });

  it('prevents cross-tenant reads under FORCE RLS', async () => {
    const tenantA = await runtime.withExecutionContext(
      context('tenant-a', 'invocation-read-a'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'read-a' },
      adapter,
      (handle) => handle.list(),
    );
    const tenantB = await runtime.withExecutionContext(
      context('tenant-b', 'invocation-read-b'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'read-b' },
      adapter,
      (handle) => handle.list(),
    );

    expect(tenantA).toEqual([{ tenant_id: 'tenant-a', item_id: 'a-1', payload: 'A secret' }]);
    expect(tenantB).toEqual([{ tenant_id: 'tenant-b', item_id: 'b-1', payload: 'B secret' }]);
  });

  it('prevents a tenant-A transaction from inserting tenant-B data', async () => {
    await expect(
      runtime.withExecutionContext(
        context('tenant-a', 'invocation-cross-write'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'cross-write' },
        adapter,
        (handle) => handle.insert('tenant-b', 'b-injected', 'must fail'),
      ),
    ).rejects.toMatchObject({ code: '42501' });

    const tenantB = await runtime.withExecutionContext(
      context('tenant-b', 'invocation-check-cross-write'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'check-cross-write' },
      adapter,
      (handle) => handle.list(),
    );
    expect(tenantB.map((row) => row.item_id)).not.toContain('b-injected');
  });

  it('rejects persistence attempts to mutate execution context after verification', async () => {
    await expect(
      runtime.withExecutionContext(
        context('tenant-a', 'invocation-mutate-context'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'mutate-context' },
        adapter,
        (handle) => handle.attemptContextMutation(),
      ),
    ).rejects.toThrow(/forbidden runtime token: set_config/u);
  });

  it('invalidates a captured module handle when the transaction ends', async () => {
    let captured: TestPersistenceHandle | undefined;

    await runtime.withExecutionContext(
      context('tenant-a', 'invocation-handle-lifetime'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'handle-lifetime' },
      adapter,
      async (handle) => {
        captured = handle;
        await handle.list();
      },
    );

    if (captured === undefined) throw new Error('expected captured persistence handle');
    await expect(captured.list()).rejects.toThrow(/no longer active/u);
  });
});
