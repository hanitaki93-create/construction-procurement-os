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

const setupPool = createIntegrationPool('cpos-b02-audit-remediation-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 8,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-audit-remediation-runtime',
});
const trackingSchema = uniqueSchema('b02_audit_remediation_tracking');

const tenantA = '019d7000-0000-7000-8000-000000000001';
const existingTenant = '019d7000-0000-7000-8000-000000000002';
const principalA = '019d7000-0000-7000-8000-000000000003';
const subscriptionA = '019d7000-0000-7000-8000-000000000004';

const oldDefinition = '019d7000-0000-7000-8000-000000000010';
const newDefinition = '019d7000-0000-7000-8000-000000000011';
const oldOffering = '019d7000-0000-7000-8000-000000000012';
const newOffering = '019d7000-0000-7000-8000-000000000013';

interface BootstrapAttackHandle {
  attemptAuthorityInsertIntoExistingTenant(): Promise<void>;
}

const bootstrapAttackAdapter = definePersistenceAdapter<BootstrapAttackHandle>({
  moduleKey: 'platform_bootstrap',
  databaseRole: 'cpos_platform_bootstrap_runtime',
  executionScope: 'BOOTSTRAP',
  buildHandle: (executor) => ({
    attemptAuthorityInsertIntoExistingTenant: async () => {
      await executor.execute(sql`
        INSERT INTO platform.bootstrap_intent (
          authentication_identity_id,
          idempotency_key,
          request_version,
          payload_digest,
          state,
          requested_tenant_name,
          requested_legal_entity_name,
          proposed_tenant_id,
          legal_entity_id,
          principal_id,
          membership_id,
          owner_role_assignment_id,
          authority_context_id
        ) VALUES (
          'attacker-auth',
          'attacker-existing-tenant',
          1,
          ${'a'.repeat(64)},
          'PENDING',
          'Existing Victim',
          'Existing Victim LLC',
          ${existingTenant},
          '019d7000-0000-7000-8000-000000000020',
          '019d7000-0000-7000-8000-000000000021',
          '019d7000-0000-7000-8000-000000000022',
          '019d7000-0000-7000-8000-000000000023',
          '019d7000-0000-7000-8000-000000000024'
        )
      `);

      await executor.execute(sql`
        INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
        VALUES ('019d7000-0000-7000-8000-000000000020', ${existingTenant})
      `);
    },
  }),
});

interface SubscriptionHandle {
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
  assignVersion(input: {
    readonly id: string;
    readonly itemId: string;
    readonly slot: string;
    readonly version: number;
    readonly offeringVersionId: string;
    readonly from: string;
    readonly until: string;
  }): Promise<void>;
  bumpGuard(expected: number): Promise<number>;
}

const subscriptionAdapter = definePersistenceAdapter<SubscriptionHandle>({
  moduleKey: 'subscription',
  databaseRole: 'cpos_subscription_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
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
    assignVersion: async (input) => {
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
          tstzrange(${input.from}::timestamptz, ${input.until}::timestamptz, '[)')
        )
      `);
    },
    bumpGuard: async (expected) => {
      const row = await executor.oneOrNone<{ readonly guard_version: string }>(sql`
        UPDATE platform.tenant_entitlement_authority_guard
        SET guard_version = guard_version + 1
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND guard_version = ${expected}
        RETURNING guard_version::text AS guard_version
      `);
      if (row === undefined) throw new Error('entitlement guard changed concurrently');
      return Number(row.guard_version);
    },
  }),
});

function tenantContext(invocationId: string) {
  return {
    tenantId: tenantA,
    principalId: principalA,
    operationKey: 'platform.subscription.audit-remediation.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function withSubscription<T>(
  invocationId: string,
  callback: (handle: SubscriptionHandle) => Promise<T>,
): Promise<T> {
  return runtime.withExecutionContext(
    tenantContext(invocationId),
    { isolation: 'READ COMMITTED', logicalIdentity: invocationId },
    subscriptionAdapter,
    callback,
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'b02-audit-remediation',
  });
});

beforeEach(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await setupPool.query(
    'TRUNCATE TABLE platform.product_offering_entitlement_grant, platform.product_offering_version, platform.entitlement_definition_version, platform.usage_measure_definition_version CASCADE',
  );

  await setupPool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Tenant A'), ($2, 'Existing Victim')`,
    [tenantA, existingTenant],
  );
  await setupPool.query(
    `INSERT INTO platform.tenant_subscription (
       tenant_subscription_id, tenant_id, commercial_channel
     ) VALUES ($1, $2, 'SELF_SERVICE')`,
    [subscriptionA, tenantA],
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

describe('B02 C1/C2 hostile-audit remediation', () => {
  it('cannot turn an intent naming an existing tenant into bootstrap authority', async () => {
    await expect(
      runtime.withBootstrapContext(
        {
          authenticationIdentityId: 'attacker-auth',
          proposedTenantId: existingTenant,
          operationKey: 'platform.tenant.bootstrap.v1',
          invocationId: 'existing-tenant-attack',
          serviceIdentity: 'api',
        },
        { isolation: 'READ COMMITTED', logicalIdentity: 'existing-tenant-attack' },
        bootstrapAttackAdapter,
        (handle) => handle.attemptAuthorityInsertIntoExistingTenant(),
      ),
    ).rejects.toThrow();

    const residue = await setupPool.query<{ count: string }>(
      `SELECT count(*)::text AS count
       FROM platform.bootstrap_intent
       WHERE authentication_identity_id = 'attacker-auth'`,
    );
    expect(residue.rows[0]?.count).toBe('0');
  });

  it(
    'rejects a material entitlement mutation that does not advance the guard in the same transaction',
    async () => {
      await expect(
        withSubscription('unguarded-lifecycle', (handle) =>
          handle.appendLifecycle({
            id: '019d7000-0000-7000-8000-000000000030',
            subscriptionId: subscriptionA,
            sequence: 1,
            kind: 'ACTIVATED',
            effectiveAt: '2026-08-01T00:00:00.000Z',
          }),
        ),
      ).rejects.toThrow(/must advance the tenant entitlement guard in the same transaction/u);

      const lifecycle = await setupPool.query<{ count: string }>(
        'SELECT count(*)::text AS count FROM platform.subscription_lifecycle_occurrence WHERE tenant_subscription_id = $1',
        [subscriptionA],
      );
      expect(lifecycle.rows[0]?.count).toBe('0');
    },
  );

  it('accepts a material mutation only when the same transaction advances the guard', async () => {
    const result = await withSubscription('guarded-lifecycle', async (handle) => {
      await handle.appendLifecycle({
        id: '019d7000-0000-7000-8000-000000000031',
        subscriptionId: subscriptionA,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
      return handle.bumpGuard(1);
    });

    expect(result).toBe(2);
  });

  it('rejects illegal lifecycle resurrection and sequence gaps', async () => {
    await withSubscription('activate-before-illegal', async (handle) => {
      await handle.appendLifecycle({
        id: '019d7000-0000-7000-8000-000000000032',
        subscriptionId: subscriptionA,
        sequence: 1,
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
      });
      await handle.appendLifecycle({
        id: '019d7000-0000-7000-8000-000000000033',
        subscriptionId: subscriptionA,
        sequence: 2,
        kind: 'CANCELLED',
        effectiveAt: '2026-08-02T00:00:00.000Z',
      });
      await handle.bumpGuard(1);
    });

    await expect(
      withSubscription('resume-after-cancel', async (handle) => {
        await handle.appendLifecycle({
          id: '019d7000-0000-7000-8000-000000000034',
          subscriptionId: subscriptionA,
          sequence: 3,
          kind: 'RESUMED',
          effectiveAt: '2026-08-03T00:00:00.000Z',
        });
        await handle.bumpGuard(2);
      }),
    ).rejects.toThrow(/terminal subscription lifecycle state/u);

    await expect(
      withSubscription('sequence-gap', async (handle) => {
        await handle.appendLifecycle({
          id: '019d7000-0000-7000-8000-000000000035',
          subscriptionId: subscriptionA,
          sequence: 4,
          kind: 'EXPIRED',
          effectiveAt: '2026-08-04T00:00:00.000Z',
        });
        await handle.bumpGuard(2);
      }),
    ).rejects.toThrow(/sequence must be contiguous/u);
  });

  it('treats product catalog version rows as immutable content', async () => {
    await setupPool.query(`
      INSERT INTO platform.product_offering_version (
        product_offering_version_id, offering_key, version, display_name, lifecycle_state, availability_period
      ) VALUES (
        '${oldOffering}', 'IMMUTABLE_TEST', 1, 'Immutable Test', 'AVAILABLE', tstzrange('2026-01-01', NULL, '[)')
      )
    `);

    await expect(
      setupPool.query(
        `UPDATE platform.product_offering_version
         SET display_name = 'rewritten'
         WHERE product_offering_version_id = $1`,
        [oldOffering],
      ),
    ).rejects.toThrow(/immutable/u);
  });

  it(
    'rejects overlapping cross-slot contributions that use different entitlement definition versions',
    async () => {
      await setupPool.query(`
        INSERT INTO platform.entitlement_definition_version (
          entitlement_definition_version_id, entitlement_key, version, entitlement_kind,
          aggregation, effective_period
        ) VALUES
          ('${oldDefinition}', 'shared.capability', 1, 'CAPABILITY', 'ANY', tstzrange('2026-01-01', '2026-08-01', '[)')),
          ('${newDefinition}', 'shared.capability', 2, 'CAPABILITY', 'ANY', tstzrange('2026-08-01', NULL, '[)'));

        INSERT INTO platform.product_offering_version (
          product_offering_version_id, offering_key, version, display_name, lifecycle_state, availability_period
        ) VALUES
          ('${oldOffering}', 'OLD_COMPONENT', 1, 'Old Component', 'AVAILABLE', tstzrange('2026-01-01', NULL, '[)')),
          ('${newOffering}', 'NEW_COMPONENT', 1, 'New Component', 'AVAILABLE', tstzrange('2026-08-01', NULL, '[)'));

        INSERT INTO platform.product_offering_entitlement_grant (
          product_offering_version_id, entitlement_definition_version_id, entitlement_key,
          entitlement_kind, limit_mode, limit_quantity_text
        ) VALUES
          ('${oldOffering}', '${oldDefinition}', 'shared.capability', 'CAPABILITY', NULL, NULL),
          ('${newOffering}', '${newDefinition}', 'shared.capability', 'CAPABILITY', NULL, NULL);
      `);

      await withSubscription('seed-old-component', async (handle) => {
        await handle.appendLifecycle({
          id: '019d7000-0000-7000-8000-000000000040',
          subscriptionId: subscriptionA,
          sequence: 1,
          kind: 'ACTIVATED',
          effectiveAt: '2026-07-15T00:00:00.000Z',
        });
        await handle.createItem({
          id: '019d7000-0000-7000-8000-000000000041',
          subscriptionId: subscriptionA,
          slot: 'BASE',
        });
        await handle.assignVersion({
          id: '019d7000-0000-7000-8000-000000000042',
          itemId: '019d7000-0000-7000-8000-000000000041',
          slot: 'BASE',
          version: 1,
          offeringVersionId: oldOffering,
          from: '2026-07-15T00:00:00.000Z',
          until: '2026-09-01T00:00:00.000Z',
        });
        await handle.bumpGuard(1);
      });

      await expect(
        withSubscription('conflicting-new-component', async (handle) => {
          await handle.createItem({
            id: '019d7000-0000-7000-8000-000000000043',
            subscriptionId: subscriptionA,
            slot: 'ADDON',
          });
          await handle.assignVersion({
            id: '019d7000-0000-7000-8000-000000000044',
            itemId: '019d7000-0000-7000-8000-000000000043',
            slot: 'ADDON',
            version: 1,
            offeringVersionId: newOffering,
            from: '2026-08-10T00:00:00.000Z',
            until: '2026-09-01T00:00:00.000Z',
          });
          await handle.bumpGuard(2);
        }),
      ).rejects.toThrow(/incompatible entitlement semantics/u);
    },
  );
});