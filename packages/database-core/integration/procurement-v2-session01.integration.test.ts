import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import {
  createIntegrationPool,
  dropSchema,
  requiredDatabaseUrl,
  uniqueSchema,
} from './test-support.js';

const setupPool = createIntegrationPool('cpos-v2-session01-procurement-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 24,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-v2-session01-procurement-runtime',
});
const trackingSchema = uniqueSchema('v2_session01_procurement_tracking');

const tenantA = '019e1100-0000-7000-8000-000000000001';
const tenantB = '019e1100-0000-7000-8000-000000000002';
const principalA = '019e1100-0000-7000-8000-000000000003';
const principalB = '019e1100-0000-7000-8000-000000000004';
const legalA = '019e1100-0000-7000-8000-000000000005';
const legalB = '019e1100-0000-7000-8000-000000000006';
const authorityA = '019e1100-0000-7000-8000-000000000007';
const authorityB = '019e1100-0000-7000-8000-000000000008';
const projectA = '019e1100-0000-7000-8000-000000000009';
const projectB = '019e1100-0000-7000-8000-000000000010';
const subscriptionA = '019e1100-0000-7000-8000-000000000011';
const supplierA = '019e1100-0000-7000-8000-000000000012';
const supplierB = '019e1100-0000-7000-8000-000000000013';

interface TestHandle {
  listSupplierCodes(): Promise<readonly string[]>;
  createSupplier(code: string): Promise<void>;
  ensureCounter(scopeKey: string): Promise<void>;
  allocate(scopeKey: string): Promise<number>;
}

const adapter = definePersistenceAdapter<TestHandle>({
  moduleKey: 'procurement_v2_hostile_test',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    listSupplierCodes: async () => {
      const rows = await executor.all<{ readonly supplier_code: string }>(sql`
        SELECT supplier_code
        FROM procurement.supplier
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY supplier_code
      `);
      return rows.map((row) => row.supplier_code);
    },
    createSupplier: async (code) => {
      await executor.execute(sql`
        INSERT INTO procurement.supplier (
          tenant_id, supplier_code, legal_name, supplier_type, supplier_state,
          country_code, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid,
          ${code},
          ${`Supplier ${code}`},
          'MATERIAL_SUPPLIER',
          'ACTIVE',
          'AE',
          current_setting('cpos.principal_id')::uuid
        )
      `);
    },
    ensureCounter: async (scopeKey) => {
      await executor.execute(sql`
        INSERT INTO procurement.document_number_counter (
          tenant_id, document_class, scope_key, next_value
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, 'MR', ${scopeKey}, 1
        )
        ON CONFLICT (tenant_id, document_class, scope_key) DO NOTHING
      `);
    },
    allocate: async (scopeKey) => {
      const row = await executor.oneOrNone<{ readonly allocated: string }>(sql`
        WITH locked AS (
          SELECT next_value
          FROM procurement.document_number_counter
          WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
            AND document_class = 'MR'
            AND scope_key = ${scopeKey}
          FOR UPDATE
        ), advanced AS (
          UPDATE procurement.document_number_counter c
          SET next_value = locked.next_value + 1,
              updated_at = clock_timestamp()
          FROM locked
          WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
            AND c.document_class = 'MR'
            AND c.scope_key = ${scopeKey}
          RETURNING locked.next_value::text AS allocated
        )
        SELECT allocated FROM advanced
      `);
      if (row === undefined) throw new Error('number allocation returned no row');
      return Number(row.allocated);
    },
  }),
});

function context(tenantId: string, principalId: string, invocationId: string) {
  return {
    tenantId,
    principalId,
    operationKey: 'procurement.v2.test',
    invocationId,
    serviceIdentity: 'integration-test',
  };
}

function withProcurement<T>(
  tenantId: string,
  principalId: string,
  logicalIdentity: string,
  callback: (handle: TestHandle) => Promise<T>,
): Promise<T> {
  return runtime.withExecutionContext(
    context(tenantId, principalId, logicalIdentity),
    { isolation: 'READ COMMITTED', logicalIdentity },
    adapter,
    callback,
  );
}

async function activateTenantA(): Promise<void> {
  await setupPool.query('BEGIN');
  try {
    await setupPool.query(
      `INSERT INTO platform.tenant_subscription (
         tenant_subscription_id, tenant_id, commercial_channel
       ) VALUES ($1, $2, 'SELF_SERVICE')`,
      [subscriptionA, tenantA],
    );
    await setupPool.query(
      `INSERT INTO platform.subscription_lifecycle_occurrence (
         tenant_id, tenant_subscription_id, sequence, occurrence_kind,
         effective_at, actor_kind
       ) VALUES ($1, $2, 1, 'ACTIVATED', '2026-01-01', 'SYSTEM')`,
      [tenantA, subscriptionA],
    );
    await setupPool.query(
      `UPDATE platform.tenant_entitlement_authority_guard
       SET guard_version = guard_version + 1
       WHERE tenant_id = $1`,
      [tenantA],
    );
    await setupPool.query('COMMIT');
  } catch (error: unknown) {
    await setupPool.query('ROLLBACK');
    throw error;
  }
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'v2-session01-procurement-integration',
  });
});

beforeEach(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await setupPool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name)
     VALUES ($1, 'Tenant A'), ($2, 'Tenant B')`,
    [tenantA, tenantB],
  );
  await setupPool.query(
    `INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
     VALUES ($1, $2), ($3, $4)`,
    [legalA, tenantA, legalB, tenantB],
  );
  await setupPool.query(
    `INSERT INTO platform.contracting_authority_context (
       authority_context_id, tenant_id, context_kind
     ) VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY'), ($3, $4, 'SINGLE_LEGAL_ENTITY')`,
    [authorityA, tenantA, authorityB, tenantB],
  );
  await setupPool.query(
    `INSERT INTO platform.principal (
       principal_id, tenant_id, principal_kind, display_name, lifecycle_state
     ) VALUES
       ($1, $2, 'HUMAN', 'Buyer A', 'ACTIVE'),
       ($3, $4, 'HUMAN', 'Buyer B', 'ACTIVE')`,
    [principalA, tenantA, principalB, tenantB],
  );
  await setupPool.query(
    `INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
     VALUES ($1, $2, $3), ($4, $5, $6)`,
    [projectA, tenantA, authorityA, projectB, tenantB, authorityB],
  );
  await setupPool.query(
    `INSERT INTO platform.project_version (
       project_id, tenant_id, version, project_code, display_name, lifecycle_state, effective_period
     ) VALUES
       ($1, $2, 1, 'A-001', 'Project A', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)')),
       ($3, $4, 1, 'B-001', 'Project B', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [projectA, tenantA, projectB, tenantB],
  );
  await activateTenantA();

  await setupPool.query(
    `INSERT INTO procurement.supplier (
       supplier_id, tenant_id, supplier_code, legal_name, supplier_type,
       supplier_state, country_code, created_by
     ) VALUES
       ($1, $2, 'A-SUP', 'Tenant A Supplier', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $3),
       ($4, $5, 'B-SUP', 'Tenant B Supplier', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $6)`,
    [supplierA, tenantA, principalA, supplierB, tenantB, principalB],
  );
});

afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('Architecture V2 Session 01 procurement persistence', () => {
  it('isolates supplier rows by the active tenant context', async () => {
    const rowsA = await withProcurement(tenantA, principalA, 'supplier-list-a', (handle) =>
      handle.listSupplierCodes(),
    );
    const rowsB = await withProcurement(tenantB, principalB, 'supplier-list-b', (handle) =>
      handle.listSupplierCodes(),
    );

    expect(rowsA).toEqual(['A-SUP']);
    expect(rowsB).toEqual(['B-SUP']);
  });

  it('denies supplier writes when the tenant has no active product entitlement', async () => {
    await expect(
      withProcurement(tenantB, principalB, 'inactive-subscription-write', (handle) =>
        handle.createSupplier('B-NEW'),
      ),
    ).rejects.toMatchObject({ code: '42501' });

    const count = await setupPool.query<{ readonly count: string }>(
      `SELECT count(*)::text AS count
       FROM procurement.supplier
       WHERE tenant_id = $1 AND supplier_code = 'B-NEW'`,
      [tenantB],
    );
    expect(Number(count.rows[0]?.count ?? '0')).toBe(0);
  });

  it('serializes concurrent MR number allocation within one project/year scope', async () => {
    const scopeKey = `PROJECT:${projectA}:YEAR:2026`;
    await withProcurement(tenantA, principalA, 'counter-create', (handle) =>
      handle.ensureCounter(scopeKey),
    );

    const allocated = await Promise.all(
      Array.from({ length: 20 }, (_, index) =>
        withProcurement(tenantA, principalA, `counter-${index}`, (handle) =>
          handle.allocate(scopeKey),
        ),
      ),
    );

    expect([...allocated].sort((left, right) => left - right)).toEqual(
      Array.from({ length: 20 }, (_, index) => index + 1),
    );
    expect(new Set(allocated).size).toBe(20);

    const row = await setupPool.query<{ readonly next_value: string }>(
      `SELECT next_value::text
       FROM procurement.document_number_counter
       WHERE tenant_id = $1 AND document_class = 'MR' AND scope_key = $2`,
      [tenantA, scopeKey],
    );
    expect(row.rows[0]?.next_value).toBe('21');
  });
});
