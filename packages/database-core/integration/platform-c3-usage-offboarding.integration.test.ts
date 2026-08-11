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

const setupPool = createIntegrationPool('cpos-b02-platform-c3-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 12,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-platform-c3-runtime',
});
const trackingSchema = uniqueSchema('platform_c3_tracking');

const tenantA = '019d6100-0000-7000-8000-000000000001';
const tenantB = '019d6100-0000-7000-8000-000000000002';
const subscriptionA = '019d6100-0000-7000-8000-000000000003';
const subscriptionB = '019d6100-0000-7000-8000-000000000004';
const usageMeasure = '019d6100-0000-7000-8000-000000000005';
const principal = '019d6100-0000-7000-8000-000000000006';

interface UsageRow {
  readonly id: string;
  readonly effect: 'CONSUME' | 'CREDIT';
  readonly quantity: string;
  readonly correlation_id: string;
  readonly adjustment_of_occurrence_id: string | null;
}

interface UsageHandle {
  append(input: {
    readonly id: string;
    readonly tenantId: string;
    readonly subscriptionId: string;
    readonly effect: 'CONSUME' | 'CREDIT';
    readonly quantity: string;
    readonly occurredAt: string;
    readonly correlationId: string;
    readonly adjustmentOfOccurrenceId?: string;
    readonly reason?: string;
    readonly evidenceRef?: string;
  }): Promise<void>;
  rows(): Promise<readonly UsageRow[]>;
}

const usageAdapter = definePersistenceAdapter<UsageHandle>({
  moduleKey: 'subscription-usage',
  databaseRole: 'cpos_subscription_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    append: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.metered_usage_occurrence (
          metered_usage_occurrence_id,
          tenant_id,
          tenant_subscription_id,
          usage_measure_definition_version_id,
          usage_measure_key,
          effect,
          quantity_text,
          occurred_at,
          correlation_id,
          adjustment_of_occurrence_id,
          actor_kind,
          reason,
          evidence_ref
        ) VALUES (
          ${input.id},
          ${input.tenantId},
          ${input.subscriptionId},
          ${usageMeasure},
          'ai.quote_extraction.run',
          ${input.effect},
          ${input.quantity},
          ${input.occurredAt}::timestamptz,
          ${input.correlationId},
          ${input.adjustmentOfOccurrenceId ?? null},
          'SYSTEM',
          ${input.reason ?? null},
          ${input.evidenceRef ?? null}
        )
      `);
    },
    rows: () =>
      executor.all<UsageRow>(sql`
        SELECT
          metered_usage_occurrence_id::text AS id,
          effect,
          quantity_text AS quantity,
          correlation_id,
          adjustment_of_occurrence_id::text
        FROM platform.metered_usage_occurrence
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY recorded_at, metered_usage_occurrence_id
      `),
  }),
});

function context(tenantId: string, invocationId: string) {
  return {
    tenantId,
    principalId: principal,
    operationKey: 'platform.usage.test.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function withUsage<T>(
  tenantId: string,
  logicalIdentity: string,
  callback: (handle: UsageHandle) => Promise<T>,
): Promise<T> {
  return runtime.withExecutionContext(
    context(tenantId, logicalIdentity),
    { isolation: 'READ COMMITTED', logicalIdentity },
    usageAdapter,
    callback,
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'platform-c3-integration',
  });
});

beforeEach(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await setupPool.query(
    'TRUNCATE TABLE platform.product_offering_entitlement_grant, platform.product_offering_version, platform.entitlement_definition_version, platform.usage_measure_definition_version CASCADE',
  );

  await setupPool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Tenant A'), ($2, 'Tenant B')`,
    [tenantA, tenantB],
  );
  await setupPool.query(
    `INSERT INTO platform.usage_measure_definition_version (
      usage_measure_definition_version_id,
      usage_measure_key,
      version,
      unit_key,
      effective_period
    ) VALUES ($1, 'ai.quote_extraction.run', 1, 'run', tstzrange('2026-01-01', NULL, '[)'))`,
    [usageMeasure],
  );
  await setupPool.query(
    `INSERT INTO platform.tenant_subscription (
      tenant_subscription_id,
      tenant_id,
      commercial_channel
    ) VALUES ($1, $2, 'SELF_SERVICE'), ($3, $4, 'SELF_SERVICE')`,
    [subscriptionA, tenantA, subscriptionB, tenantB],
  );
});

afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await setupPool.query(
    'TRUNCATE TABLE platform.product_offering_entitlement_grant, platform.product_offering_version, platform.entitlement_definition_version, platform.usage_measure_definition_version CASCADE',
  );
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B02 C3 append-only usage and offboarding substrate', () => {
  it('records an immutable consume occurrence once per declared correlation grain', async () => {
    const id = '019d6200-0000-7000-8000-000000000001';

    await withUsage(tenantA, 'usage-once-1', (handle) =>
      handle.append({
        id,
        tenantId: tenantA,
        subscriptionId: subscriptionA,
        effect: 'CONSUME',
        quantity: '3.5',
        occurredAt: '2026-08-11T10:00:00.000Z',
        correlationId: 'quote-extraction:123',
      }),
    );

    await expect(
      withUsage(tenantA, 'usage-once-2', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000002',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CONSUME',
          quantity: '3.5',
          occurredAt: '2026-08-11T10:00:01.000Z',
          correlationId: 'quote-extraction:123',
        }),
      ),
    ).rejects.toThrow();

    const rows = await withUsage(tenantA, 'usage-once-read', (handle) => handle.rows());
    expect(rows).toHaveLength(1);
    expect(rows[0]?.quantity).toBe('3.5');

    await expect(
      setupPool.query(
        `UPDATE platform.metered_usage_occurrence
         SET quantity_text = '99'
         WHERE metered_usage_occurrence_id = $1`,
        [id],
      ),
    ).rejects.toThrow(/append-only/u);
  });

  it('enforces tenant isolation for both reads and inserts under FORCE RLS', async () => {
    await withUsage(tenantA, 'usage-rls-a', (handle) =>
      handle.append({
        id: '019d6200-0000-7000-8000-000000000010',
        tenantId: tenantA,
        subscriptionId: subscriptionA,
        effect: 'CONSUME',
        quantity: '1',
        occurredAt: '2026-08-11T10:00:00.000Z',
        correlationId: 'tenant-a-only',
      }),
    );

    const tenantBRows = await withUsage(tenantB, 'usage-rls-b-read', (handle) => handle.rows());
    expect(tenantBRows).toEqual([]);

    await expect(
      withUsage(tenantB, 'usage-rls-b-write', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000011',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CONSUME',
          quantity: '1',
          occurredAt: '2026-08-11T10:00:00.000Z',
          correlationId: 'cross-tenant-attempt',
        }),
      ),
    ).rejects.toThrow();
  });

  it('requires explicit credit provenance and never rewrites the source consumption', async () => {
    const sourceId = '019d6200-0000-7000-8000-000000000020';
    await withUsage(tenantA, 'usage-credit-source', (handle) =>
      handle.append({
        id: sourceId,
        tenantId: tenantA,
        subscriptionId: subscriptionA,
        effect: 'CONSUME',
        quantity: '10',
        occurredAt: '2026-08-11T10:00:00.000Z',
        correlationId: 'source-10',
      }),
    );

    await expect(
      withUsage(tenantA, 'usage-credit-missing-proof', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000021',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CREDIT',
          quantity: '2',
          occurredAt: '2026-08-11T11:00:00.000Z',
          correlationId: 'credit-missing-proof',
          adjustmentOfOccurrenceId: sourceId,
        }),
      ),
    ).rejects.toThrow();

    await withUsage(tenantA, 'usage-credit-valid', (handle) =>
      handle.append({
        id: '019d6200-0000-7000-8000-000000000022',
        tenantId: tenantA,
        subscriptionId: subscriptionA,
        effect: 'CREDIT',
        quantity: '2',
        occurredAt: '2026-08-11T11:00:00.000Z',
        correlationId: 'credit-valid',
        adjustmentOfOccurrenceId: sourceId,
        reason: 'duplicate provider observation reconciled',
        evidenceRef: 'evidence://usage/reconciliation/22',
      }),
    );

    const rows = await withUsage(tenantA, 'usage-credit-read', (handle) => handle.rows());
    expect(rows.map((row) => [row.effect, row.quantity])).toEqual([
      ['CONSUME', '10'],
      ['CREDIT', '2'],
    ]);
    expect(rows[1]?.adjustment_of_occurrence_id).toBe(sourceId);
  });

  it('serializes concurrent credits against one source so total credit cannot exceed consumption', async () => {
    const sourceId = '019d6200-0000-7000-8000-000000000030';
    await withUsage(tenantA, 'usage-race-source', (handle) =>
      handle.append({
        id: sourceId,
        tenantId: tenantA,
        subscriptionId: subscriptionA,
        effect: 'CONSUME',
        quantity: '10',
        occurredAt: '2026-08-11T10:00:00.000Z',
        correlationId: 'race-source',
      }),
    );

    const credits = await Promise.allSettled([
      withUsage(tenantA, 'usage-race-credit-a', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000031',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CREDIT',
          quantity: '6',
          occurredAt: '2026-08-11T11:00:00.000Z',
          correlationId: 'race-credit-a',
          adjustmentOfOccurrenceId: sourceId,
          reason: 'correction A',
          evidenceRef: 'evidence://usage/race/a',
        }),
      ),
      withUsage(tenantA, 'usage-race-credit-b', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000032',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CREDIT',
          quantity: '6',
          occurredAt: '2026-08-11T11:00:00.000Z',
          correlationId: 'race-credit-b',
          adjustmentOfOccurrenceId: sourceId,
          reason: 'correction B',
          evidenceRef: 'evidence://usage/race/b',
        }),
      ),
    ]);

    expect(credits.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(credits.filter((result) => result.status === 'rejected')).toHaveLength(1);

    const rows = await withUsage(tenantA, 'usage-race-read', (handle) => handle.rows());
    expect(rows.filter((row) => row.effect === 'CREDIT')).toHaveLength(1);
  });

  it('binds usage to the exact usage-definition version effective at occurrence time', async () => {
    await expect(
      withUsage(tenantA, 'usage-definition-time', (handle) =>
        handle.append({
          id: '019d6200-0000-7000-8000-000000000040',
          tenantId: tenantA,
          subscriptionId: subscriptionA,
          effect: 'CONSUME',
          quantity: '1',
          occurredAt: '2025-12-31T23:59:59.000Z',
          correlationId: 'before-definition',
        }),
      ),
    ).rejects.toThrow(/not effective/u);
  });
});
