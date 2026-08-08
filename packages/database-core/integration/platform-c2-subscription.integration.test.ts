import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, requiredDatabaseUrl, uniqueSchema } from './test-support.js';

const setupPool = createIntegrationPool('cpos-b02-platform-c2-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 12,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-platform-c2-runtime',
});
const trackingSchema = uniqueSchema('platform_c2_tracking');

const tenantA = '019d1111-1111-7111-8111-111111111111';
const tenantB = '019d2222-2222-7222-8222-222222222222';
const principalA = '019d3333-3333-7333-8333-333333333333';

const usageAi = '019d4000-0000-7000-8000-000000000001';
const entitlementRfq = '019d4000-0000-7000-8000-000000000002';
const entitlementAi = '019d4000-0000-7000-8000-000000000003';
const offeringBase = '019d4000-0000-7000-8000-000000000004';
const offeringAddon = '019d4000-0000-7000-8000-000000000005';
const offeringBaseV2 = '019d4000-0000-7000-8000-000000000006';
const offeringExpired = '019d4000-0000-7000-8000-000000000007';

interface GuardRow {
  readonly guard_version: string;
}

interface ItemVersionRow {
  readonly tenant_subscription_item_version_id: string;
  readonly tenant_subscription_item_id: string;
  readonly item_slot_key: string;
  readonly product_offering_version_id: string;
  readonly effective_from: string;
  readonly effective_until: string | null;
  readonly version: string;
  readonly superseded_at: string | null;
}

interface SubscriptionHandle {
  lockGuard(): Promise<number>;
  bumpGuard(expected: number): Promise<number>;
  createSubscription(input: {
    readonly id: string;
    readonly tenantId: string;
    readonly channel: 'SELF_SERVICE' | 'MANUAL_ENTERPRISE';
    readonly evidenceRef?: string;
  }): Promise<void>;
  appendLifecycle(input: {
    readonly id: string;
    readonly subscriptionId: string;
    readonly sequence: number;
    readonly kind: 'ACTIVATED' | 'SUSPENDED' | 'RESUMED' | 'CANCELLED' | 'EXPIRED';
    readonly effectiveAt: string;
  }): Promise<void>;
  createItem(input: {
    readonly id: string;
    readonly subscriptionId: string;
    readonly slot: string;
  }): Promise<void>;
  assignItemVersion(input: {
    readonly id: string;
    readonly itemId: string;
    readonly slot: string;
    readonly version: number;
    readonly offeringVersionId: string;
    readonly effectiveFrom: string;
    readonly effectiveUntil?: string;
  }): Promise<void>;
  supersedeItemVersion(id: string): Promise<void>;
  readItemVersions(): Promise<readonly ItemVersionRow[]>;
  countSubscriptions(): Promise<number>;
  attemptLifecycleRewrite(id: string): Promise<void>;
  attemptCatalogRewrite(): Promise<void>;
  attemptRoleGrant(): Promise<void>;
  attemptGuardJump(target: number): Promise<void>;
}

const subscriptionAdapter = definePersistenceAdapter<SubscriptionHandle>({
  moduleKey: 'subscription',
  databaseRole: 'cpos_subscription_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    lockGuard: async () => {
      const row = await executor.oneOrNone<GuardRow>(sql`
        SELECT guard_version::text AS guard_version
        FROM platform.tenant_entitlement_authority_guard
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        FOR UPDATE
      `);
      if (row === undefined) throw new Error('tenant entitlement authority guard is missing');
      return Number(row.guard_version);
    },
    bumpGuard: async (expected) => {
      const row = await executor.oneOrNone<GuardRow>(sql`
        UPDATE platform.tenant_entitlement_authority_guard
        SET guard_version = guard_version + 1
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND guard_version = ${expected}
        RETURNING guard_version::text AS guard_version
      `);
      if (row === undefined) throw new Error('entitlement authority guard changed concurrently');
      return Number(row.guard_version);
    },
    createSubscription: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.tenant_subscription (
          tenant_subscription_id,
          tenant_id,
          commercial_channel,
          commercial_evidence_ref
        ) VALUES (
          ${input.id},
          ${input.tenantId},
          ${input.channel},
          ${input.evidenceRef ?? null}
        )
      `);
    },
    appendLifecycle: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.subscription_lifecycle_occurrence (
          subscription_lifecycle_occurrence_id,
          tenant_id,
          tenant_subscription_id,
          sequence,
          occurrence_kind,
          effective_at,
          actor_kind
        ) VALUES (
          ${input.id},
          current_setting('cpos.tenant_id')::uuid,
          ${input.subscriptionId},
          ${input.sequence},
          ${input.kind},
          ${input.effectiveAt}::timestamptz,
          'SYSTEM'
        )
      `);
    },
    createItem: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.tenant_subscription_item (
          tenant_subscription_item_id,
          tenant_id,
          tenant_subscription_id,
          item_slot_key
        ) VALUES (
          ${input.id},
          current_setting('cpos.tenant_id')::uuid,
          ${input.subscriptionId},
          ${input.slot}
        )
      `);
    },
    assignItemVersion: async (input) => {
      const available = await executor.oneOrNone<{ readonly allowed: number }>(sql`
        SELECT 1 AS allowed
        FROM platform.product_offering_version
        WHERE product_offering_version_id = ${input.offeringVersionId}
          AND lifecycle_state = 'AVAILABLE'
          AND availability_period @> ${input.effectiveFrom}::timestamptz
      `);
      if (available === undefined) {
        throw new Error('offering version is not available at subscription item version start');
      }

      await executor.execute(sql`
        INSERT INTO platform.tenant_subscription_item_version (
          tenant_subscription_item_version_id,
          tenant_subscription_item_id,
          tenant_id,
          item_slot_key,
          version,
          product_offering_version_id,
          effective_period
        ) VALUES (
          ${input.id},
          ${input.itemId},
          current_setting('cpos.tenant_id')::uuid,
          ${input.slot},
          ${input.version},
          ${input.offeringVersionId},
          tstzrange(
            ${input.effectiveFrom}::timestamptz,
            ${input.effectiveUntil ?? null}::timestamptz,
            '[)'
          )
        )
      `);
    },
    supersedeItemVersion: async (id) => {
      const result = await executor.execute(sql`
        UPDATE platform.tenant_subscription_item_version
        SET superseded_at = clock_timestamp()
        WHERE tenant_subscription_item_version_id = ${id}
      `);
      if (result.rowCount !== 1) throw new Error('item-version supersession did not update one row');
    },
    readItemVersions: () =>
      executor.all<ItemVersionRow>(sql`
        SELECT
          tenant_subscription_item_version_id::text,
          tenant_subscription_item_id::text,
          item_slot_key,
          product_offering_version_id::text,
          lower(effective_period)::text AS effective_from,
          upper(effective_period)::text AS effective_until,
          version::text,
          superseded_at::text
        FROM platform.tenant_subscription_item_version
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY recorded_at, tenant_subscription_item_version_id
      `),
    countSubscriptions: async () => {
      const row = await executor.oneOrNone<{ readonly count: string }>(sql`
        SELECT count(*)::text AS count
        FROM platform.tenant_subscription
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
      `);
      return Number(row?.count ?? '0');
    },
    attemptLifecycleRewrite: async (id) => {
      await executor.execute(sql`
        UPDATE platform.subscription_lifecycle_occurrence
        SET reason = 'rewritten'
        WHERE subscription_lifecycle_occurrence_id = ${id}
      `);
    },
    attemptCatalogRewrite: async () => {
      await executor.execute(sql`
        UPDATE platform.product_offering_version
        SET display_name = 'mutated by tenant runtime'
        WHERE product_offering_version_id = ${offeringBase}
      `);
    },
    attemptRoleGrant: async () => {
      await executor.execute(sql`
        INSERT INTO platform.role_assignment (
          role_assignment_id,
          tenant_id,
          membership_id,
          role_key
        ) VALUES (
          '019d9999-9999-7999-8999-999999999999',
          current_setting('cpos.tenant_id')::uuid,
          '019d8888-8888-7888-8888-888888888888',
          'OWNER'
        )
      `);
    },
    attemptGuardJump: async (target) => {
      await executor.execute(sql`
        UPDATE platform.tenant_entitlement_authority_guard
        SET guard_version = ${target}
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
      `);
    },
  }),
});

function context(tenantId: string, invocationId: string) {
  return {
    tenantId,
    principalId: principalA,
    operationKey: 'platform.subscription.test.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function withHandle<T>(
  tenantId: string,
  logicalIdentity: string,
  callback: (handle: SubscriptionHandle) => Promise<T>,
): Promise<T> {
  return runtime.withExecutionContext(
    context(tenantId, logicalIdentity),
    { isolation: 'READ COMMITTED', logicalIdentity },
    subscriptionAdapter,
    callback,
  );
}

async function mutate<T>(
  tenantId: string,
  expectedGuard: number,
  logicalIdentity: string,
  callback: (handle: SubscriptionHandle) => Promise<T>,
): Promise<Readonly<{ result: T; guardVersion: number }>> {
  return withHandle(tenantId, logicalIdentity, async (handle) => {
    const current = await handle.lockGuard();
    if (current !== expectedGuard) {
      throw new Error(`stale entitlement authority guard: expected ${expectedGuard}, current ${current}`);
    }
    const result = await callback(handle);
    const guardVersion = await handle.bumpGuard(expectedGuard);
    return { result, guardVersion };
  });
}

async function seedCatalog(): Promise<void> {
  await setupPool.query(`
    INSERT INTO platform.usage_measure_definition_version (
      usage_measure_definition_version_id, usage_measure_key, version, unit_key, effective_period
    ) VALUES (
      '${usageAi}', 'ai.quote_extraction.run', 1, 'run', tstzrange('2026-01-01', NULL, '[)')
    );

    INSERT INTO platform.entitlement_definition_version (
      entitlement_definition_version_id, entitlement_key, version, entitlement_kind,
      aggregation, usage_measure_definition_version_id, effective_period
    ) VALUES
      ('${entitlementRfq}', 'sourcing.rfq.issue', 1, 'CAPABILITY', 'ANY', NULL, tstzrange('2026-01-01', NULL, '[)')),
      ('${entitlementAi}', 'ai.quote_extraction', 1, 'METERED_LIMIT', 'ADDITIVE_LIMIT', '${usageAi}', tstzrange('2026-01-01', NULL, '[)'));

    INSERT INTO platform.product_offering_version (
      product_offering_version_id, offering_key, version, display_name, lifecycle_state, availability_period
    ) VALUES
      ('${offeringBase}', 'BASE_PUBLIC', 1, 'Base Public', 'AVAILABLE', tstzrange('2026-07-01', '2026-08-15', '[)')),
      ('${offeringAddon}', 'AI_ADDON', 1, 'AI Add-on', 'AVAILABLE', tstzrange('2026-07-01', NULL, '[)')),
      ('${offeringBaseV2}', 'BASE_PUBLIC_V2', 1, 'Base Public V2', 'AVAILABLE', tstzrange('2026-08-15', NULL, '[)')),
      ('${offeringExpired}', 'EXPIRED_TEST', 1, 'Expired Test', 'AVAILABLE', tstzrange('2026-07-01', '2026-07-15', '[)'));

    INSERT INTO platform.product_offering_entitlement_grant (
      product_offering_version_id, entitlement_definition_version_id, entitlement_key,
      entitlement_kind, limit_mode, limit_quantity_text
    ) VALUES
      ('${offeringBase}', '${entitlementRfq}', 'sourcing.rfq.issue', 'CAPABILITY', NULL, NULL),
      ('${offeringBase}', '${entitlementAi}', 'ai.quote_extraction', 'METERED_LIMIT', 'FINITE', '20'),
      ('${offeringAddon}', '${entitlementAi}', 'ai.quote_extraction', 'METERED_LIMIT', 'FINITE', '10'),
      ('${offeringBaseV2}', '${entitlementRfq}', 'sourcing.rfq.issue', 'CAPABILITY', NULL, NULL),
      ('${offeringExpired}', '${entitlementRfq}', 'sourcing.rfq.issue', 'CAPABILITY', NULL, NULL);
  `);
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'platform-c2-integration',
  });
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await setupPool.query('TRUNCATE TABLE platform.product_offering_entitlement_grant, platform.product_offering_version, platform.entitlement_definition_version, platform.usage_measure_definition_version CASCADE');
  await setupPool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Tenant A'), ($2, 'Tenant B')`,
    [tenantA, tenantB],
  );
  await seedCatalog();
});

beforeEach(async () => {
  await setupPool.query('TRUNCATE TABLE platform.subscription_lifecycle_occurrence, platform.tenant_subscription_item_version, platform.tenant_subscription_item, platform.tenant_subscription CASCADE');
  await setupPool.query('TRUNCATE TABLE platform.tenant_entitlement_authority_guard');
  await setupPool.query(
    'INSERT INTO platform.tenant_entitlement_authority_guard (tenant_id, guard_version) VALUES ($1, 1), ($2, 1)',
    [tenantA, tenantB],
  );
});

afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await setupPool.query('TRUNCATE TABLE platform.product_offering_entitlement_grant, platform.product_offering_version, platform.entitlement_definition_version, platform.usage_measure_definition_version CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B02 C2 production subscription and entitlement authority', () => {
  it('creates base and add-on slots together while rejecting overlapping current authority in one slot', async () => {
    const subscriptionId = '019d5000-0000-7000-8000-000000000001';
    const baseItemId = '019d5000-0000-7000-8000-000000000002';
    const addonItemId = '019d5000-0000-7000-8000-000000000003';

    const created = await mutate(tenantA, 1, 'base-plus-addon', async (handle) => {
      await handle.createSubscription({ id: subscriptionId, tenantId: tenantA, channel: 'SELF_SERVICE' });
      await handle.appendLifecycle({
        id: '019d5000-0000-7000-8000-000000000004',
        subscriptionId,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
      await handle.createItem({ id: baseItemId, subscriptionId, slot: 'BASE' });
      await handle.assignItemVersion({
        id: '019d5000-0000-7000-8000-000000000005',
        itemId: baseItemId,
        slot: 'BASE',
        version: 1,
        offeringVersionId: offeringBase,
        effectiveFrom: '2026-08-01T00:00:00.000Z',
        effectiveUntil: '2026-09-01T00:00:00.000Z',
      });
      await handle.createItem({ id: addonItemId, subscriptionId, slot: 'AI_ADDON' });
      await handle.assignItemVersion({
        id: '019d5000-0000-7000-8000-000000000006',
        itemId: addonItemId,
        slot: 'AI_ADDON',
        version: 1,
        offeringVersionId: offeringAddon,
        effectiveFrom: '2026-08-01T00:00:00.000Z',
        effectiveUntil: '2026-09-01T00:00:00.000Z',
      });
      return handle.readItemVersions();
    });

    expect(created.guardVersion).toBe(2);
    expect(created.result.map((row) => row.item_slot_key).sort()).toEqual(['AI_ADDON', 'BASE']);

    await expect(
      mutate(tenantA, 2, 'overlapping-base', async (handle) => {
        const secondItem = '019d5000-0000-7000-8000-000000000007';
        await handle.createItem({ id: secondItem, subscriptionId, slot: 'BASE' });
        await handle.assignItemVersion({
          id: '019d5000-0000-7000-8000-000000000008',
          itemId: secondItem,
          slot: 'BASE',
          version: 1,
          offeringVersionId: offeringBaseV2,
          effectiveFrom: '2026-08-20T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
        });
      }),
    ).rejects.toMatchObject({ code: '23P01' });

    expect(await withHandle(tenantA, 'guard-after-overlap', (handle) => handle.lockGuard())).toBe(2);
  });

  it('preserves superseded item content and permits an adjacent replacement without rewriting history', async () => {
    const subscriptionId = '019d5100-0000-7000-8000-000000000001';
    const baseItemId = '019d5100-0000-7000-8000-000000000002';
    const originalVersionId = '019d5100-0000-7000-8000-000000000003';

    await mutate(tenantA, 1, 'seed-original-base', async (handle) => {
      await handle.createSubscription({ id: subscriptionId, tenantId: tenantA, channel: 'SELF_SERVICE' });
      await handle.appendLifecycle({
        id: '019d5100-0000-7000-8000-000000000004',
        subscriptionId,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
      await handle.createItem({ id: baseItemId, subscriptionId, slot: 'BASE' });
      await handle.assignItemVersion({
        id: originalVersionId,
        itemId: baseItemId,
        slot: 'BASE',
        version: 1,
        offeringVersionId: offeringBase,
        effectiveFrom: '2026-08-01T00:00:00.000Z',
        effectiveUntil: '2026-09-01T00:00:00.000Z',
      });
    });

    await mutate(tenantA, 2, 'replace-base-mid-period', async (handle) => {
      await handle.supersedeItemVersion(originalVersionId);
      await handle.assignItemVersion({
        id: '019d5100-0000-7000-8000-000000000005',
        itemId: baseItemId,
        slot: 'BASE',
        version: 2,
        offeringVersionId: offeringBase,
        effectiveFrom: '2026-08-01T00:00:00.000Z',
        effectiveUntil: '2026-08-15T00:00:00.000Z',
      });
      const replacementItem = '019d5100-0000-7000-8000-000000000006';
      await handle.createItem({ id: replacementItem, subscriptionId, slot: 'BASE' });
      await handle.assignItemVersion({
        id: '019d5100-0000-7000-8000-000000000007',
        itemId: replacementItem,
        slot: 'BASE',
        version: 1,
        offeringVersionId: offeringBaseV2,
        effectiveFrom: '2026-08-15T00:00:00.000Z',
        effectiveUntil: '2026-09-01T00:00:00.000Z',
      });
    });

    const rows = await withHandle(tenantA, 'read-version-history', (handle) => handle.readItemVersions());
    const original = rows.find((row) => row.tenant_subscription_item_version_id === originalVersionId);
    expect(original).toMatchObject({
      product_offering_version_id: offeringBase,
      version: '1',
    });
    expect(original?.superseded_at).not.toBeNull();
    expect(rows.filter((row) => row.superseded_at === null)).toHaveLength(2);

    await expect(
      withHandle(tenantA, 'double-supersede', (handle) => handle.supersedeItemVersion(originalVersionId)),
    ).rejects.toThrow(/already superseded/u);
  });

  it('invalidates a stale entitlement preview through the stable tenant guard', async () => {
    const firstSubscription = '019d5200-0000-7000-8000-000000000001';
    await mutate(tenantA, 1, 'first-guarded-mutation', async (handle) => {
      await handle.createSubscription({ id: firstSubscription, tenantId: tenantA, channel: 'SELF_SERVICE' });
    });

    const previewGuardVersion = 2;
    await mutate(tenantA, previewGuardVersion, 'second-guarded-mutation', async (handle) => {
      await handle.appendLifecycle({
        id: '019d5200-0000-7000-8000-000000000002',
        subscriptionId: firstSubscription,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
    });

    await expect(
      mutate(tenantA, previewGuardVersion, 'stale-preview-command', async (handle) => {
        await handle.createSubscription({
          id: '019d5200-0000-7000-8000-000000000003',
          tenantId: tenantA,
          channel: 'SELF_SERVICE',
        });
      }),
    ).rejects.toThrow(/stale entitlement authority guard/u);

    expect(await withHandle(tenantA, 'subscription-count-after-stale', (handle) => handle.countSubscriptions())).toBe(1);
    expect(await withHandle(tenantA, 'guard-after-stale', (handle) => handle.lockGuard())).toBe(3);
  });

  it('requires evidence for manual Enterprise activation and keeps tenant data isolated', async () => {
    await expect(
      mutate(tenantA, 1, 'manual-enterprise-no-evidence', (handle) =>
        handle.createSubscription({
          id: '019d5300-0000-7000-8000-000000000001',
          tenantId: tenantA,
          channel: 'MANUAL_ENTERPRISE',
        }),
      ),
    ).rejects.toMatchObject({ code: '23514' });

    const enterprise = await mutate(tenantA, 1, 'manual-enterprise-evidenced', (handle) =>
      handle.createSubscription({
        id: '019d5300-0000-7000-8000-000000000002',
        tenantId: tenantA,
        channel: 'MANUAL_ENTERPRISE',
        evidenceRef: 'contract:ENT-2026-001',
      }),
    );
    expect(enterprise.guardVersion).toBe(2);

    await expect(
      mutate(tenantA, 2, 'cross-tenant-subscription-insert', (handle) =>
        handle.createSubscription({
          id: '019d5300-0000-7000-8000-000000000003',
          tenantId: tenantB,
          channel: 'SELF_SERVICE',
        }),
      ),
    ).rejects.toMatchObject({ code: '42501' });

    expect(await withHandle(tenantB, 'tenant-b-count', (handle) => handle.countSubscriptions())).toBe(0);
  });

  it('rejects assignment of a retired-for-sale offering but preserves an already assigned grandfathered version', async () => {
    const subscriptionId = '019d5400-0000-7000-8000-000000000001';
    const itemId = '019d5400-0000-7000-8000-000000000002';

    await mutate(tenantA, 1, 'grandfather-base', async (handle) => {
      await handle.createSubscription({ id: subscriptionId, tenantId: tenantA, channel: 'SELF_SERVICE' });
      await handle.appendLifecycle({
        id: '019d5400-0000-7000-8000-000000000003',
        subscriptionId,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
      await handle.createItem({ id: itemId, subscriptionId, slot: 'BASE' });
      await handle.assignItemVersion({
        id: '019d5400-0000-7000-8000-000000000004',
        itemId,
        slot: 'BASE',
        version: 1,
        offeringVersionId: offeringBase,
        effectiveFrom: '2026-08-01T00:00:00.000Z',
        effectiveUntil: '2026-09-01T00:00:00.000Z',
      });
    });

    const grandfathered = await withHandle(tenantA, 'grandfather-read', (handle) => handle.readItemVersions());
    expect(grandfathered).toHaveLength(1);
    expect(grandfathered[0]?.product_offering_version_id).toBe(offeringBase);

    await expect(
      mutate(tenantA, 2, 'expired-offering-assignment', async (handle) => {
        const expiredItem = '019d5400-0000-7000-8000-000000000005';
        await handle.createItem({ id: expiredItem, subscriptionId, slot: 'EXPIRED_TEST' });
        await handle.assignItemVersion({
          id: '019d5400-0000-7000-8000-000000000006',
          itemId: expiredItem,
          slot: 'EXPIRED_TEST',
          version: 1,
          offeringVersionId: offeringExpired,
          effectiveFrom: '2026-08-20T00:00:00.000Z',
        });
      }),
    ).rejects.toThrow(/not available/u);
  });

  it('prevents subscription runtime from granting OWNER, rewriting catalog, or mutating lifecycle history', async () => {
    const subscriptionId = '019d5500-0000-7000-8000-000000000001';
    const lifecycleId = '019d5500-0000-7000-8000-000000000002';
    await mutate(tenantA, 1, 'authority-separation-seed', async (handle) => {
      await handle.createSubscription({ id: subscriptionId, tenantId: tenantA, channel: 'SELF_SERVICE' });
      await handle.appendLifecycle({
        id: lifecycleId,
        subscriptionId,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
    });

    await expect(withHandle(tenantA, 'role-grant-attack', (handle) => handle.attemptRoleGrant())).rejects.toMatchObject({ code: '42501' });
    await expect(withHandle(tenantA, 'catalog-rewrite-attack', (handle) => handle.attemptCatalogRewrite())).rejects.toMatchObject({ code: '42501' });
    await expect(withHandle(tenantA, 'lifecycle-rewrite-attack', (handle) => handle.attemptLifecycleRewrite(lifecycleId))).rejects.toMatchObject({ code: '42501' });
  });

  it('allows the entitlement guard to move by exactly one and rejects arbitrary jumps', async () => {
    await expect(withHandle(tenantA, 'guard-jump', (handle) => handle.attemptGuardJump(9))).rejects.toThrow(/increment by exactly one/u);
    expect(await withHandle(tenantA, 'guard-still-one', (handle) => handle.lockGuard())).toBe(1);

    const moved = await withHandle(tenantA, 'guard-normal-bump', (handle) => handle.bumpGuard(1));
    expect(moved).toBe(2);
  });
});
