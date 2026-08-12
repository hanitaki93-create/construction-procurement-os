import path from 'node:path';
import { randomUUID } from 'node:crypto';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, requiredDatabaseUrl, uniqueSchema } from './test-support.js';
import {
  authorityA,
  procurementExecutionContext,
  procurementPrincipal,
  projectA,
  reviewerPrincipal,
  seedProcurementWaveFixture,
  tenantA,
} from './procurement-wave-test-support.js';

const setupPool = createIntegrationPool('cpos-b05-requirements-setup');
const runtime = createDatabaseRuntime({ connectionString: requiredDatabaseUrl(), maximumConnections: 12, applicationName: 'cpos-b05-requirements-runtime' });
const trackingSchema = uniqueSchema('b05_requirements_tracking');

interface RequirementHandle {
  createSource(sourceId: string, quantity: string): Promise<void>;
  allocate(sourceId: string, allocationId: string, quantity: string): Promise<void>;
  release(allocationId: string): Promise<void>;
  amend(sourceId: string, quantity: string): Promise<void>;
  createPackage(packageId: string): Promise<void>;
  packageMembership(packageId: string, allocationId: string, kind: 'ADDED' | 'REMOVED'): Promise<void>;
  activeAllocated(sourceId: string): Promise<string>;
}

const requirementAdapter = definePersistenceAdapter<RequirementHandle>({
  moduleKey: 'b05_requirements_test',
  databaseRole: 'cpos_procurement_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    createSource: async (sourceId, quantity) => {
      await executor.execute(sql`
        SELECT requirements.create_authorized_requirement(
          ${sourceId}, ${randomUUID()}, ${projectA}, ${authorityA}, 'BOQ', ${`BOQ-${sourceId.slice(0, 8)}`},
          'Concrete works authorized quantity', ${quantity}::numeric, 'M3', ${null}
        )
      `);
    },
    allocate: async (sourceId, allocationId, quantity) => {
      await executor.execute(sql`SELECT requirements.allocate_requirement(${allocationId}, ${sourceId}, ${quantity}::numeric, 'M3', 'Sourcing allocation', ${null})`);
    },
    release: async (allocationId) => {
      await executor.execute(sql`SELECT requirements.release_allocation(${allocationId}, 'release for reallocation')`);
    },
    amend: async (sourceId, quantity) => {
      await executor.execute(sql`SELECT requirements.amend_authorized_requirement(${randomUUID()}, ${sourceId}, 'Amended concrete works', ${quantity}::numeric, ${null}, 'controlled amendment')`);
    },
    createPackage: async (packageId) => {
      await executor.execute(sql`SELECT requirements.create_procurement_package(${packageId}, ${projectA}, ${authorityA}, ${`PKG-${packageId.slice(0, 6)}`}, 'Concrete Package')`);
    },
    packageMembership: async (packageId, allocationId, kind) => {
      await executor.execute(sql`SELECT requirements.record_package_membership(${randomUUID()}, ${packageId}, ${allocationId}, ${kind}, 'test membership')`);
    },
    activeAllocated: async (sourceId) => {
      const row = await executor.oneOrNone<{ total: string }>(sql`
        SELECT coalesce(sum(a.quantity),0)::text AS total
        FROM requirements.requirement_allocation a
        JOIN LATERAL (
          SELECT occurrence_kind
          FROM requirements.requirement_allocation_occurrence o
          WHERE o.requirement_allocation_id=a.requirement_allocation_id
          ORDER BY sequence DESC LIMIT 1
        ) state ON true
        WHERE a.authorized_requirement_source_id=${sourceId}
          AND state.occurrence_kind='ALLOCATED'
      `);
      return row?.total ?? '0';
    },
  }),
});

function withRequirements<T>(principalId: string, invocation: string, isolation: 'READ COMMITTED' | 'SERIALIZABLE', callback: (h: RequirementHandle) => Promise<T>): Promise<T> {
  return runtime.withExecutionContext(
    procurementExecutionContext(tenantA, principalId, 'requirements.command.v1', invocation),
    { isolation, logicalIdentity: invocation },
    requirementAdapter,
    callback,
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, { directory: path.resolve('../../migrations/sql'), schema: trackingSchema, buildId: 'b05-requirements-integration' });
});
beforeEach(async () => seedProcurementWaveFixture(setupPool));
afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B05 RequirementAllocation conservation', () => {
  it('serializes concurrent allocations on the same AuthorizedRequirementBasis guard', async () => {
    const sourceId = randomUUID();
    await withRequirements(procurementPrincipal, 'b05-source', 'READ COMMITTED', (h) => h.createSource(sourceId, '100'));

    const results = await Promise.allSettled([
      withRequirements(procurementPrincipal, 'b05-alloc-a', 'READ COMMITTED', (h) => h.allocate(sourceId, randomUUID(), '60')),
      withRequirements(procurementPrincipal, 'b05-alloc-b', 'READ COMMITTED', (h) => h.allocate(sourceId, randomUUID(), '60')),
    ]);
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1);
    expect(results.filter((r) => r.status === 'rejected')).toHaveLength(1);
    expect(await withRequirements(procurementPrincipal, 'b05-total', 'READ COMMITTED', (h) => h.activeAllocated(sourceId))).toBe('60.000000000000');
  });

  it('does not allow an amendment to shrink authorized quantity below active allocation', async () => {
    const sourceId = randomUUID();
    await withRequirements(procurementPrincipal, 'b05-source-amend', 'READ COMMITTED', (h) => h.createSource(sourceId, '100'));
    await withRequirements(procurementPrincipal, 'b05-allocate-amend', 'READ COMMITTED', (h) => h.allocate(sourceId, randomUUID(), '80'));
    await expect(withRequirements(procurementPrincipal, 'b05-bad-amend', 'READ COMMITTED', (h) => h.amend(sourceId, '70'))).rejects.toThrow(/below active allocation/u);
  });

  it('releasing an allocation preserves lineage and restores capacity without deleting history', async () => {
    const sourceId = randomUUID();
    const allocationId = randomUUID();
    await withRequirements(procurementPrincipal, 'b05-source-release', 'READ COMMITTED', (h) => h.createSource(sourceId, '100'));
    await withRequirements(procurementPrincipal, 'b05-allocate-release', 'READ COMMITTED', (h) => h.allocate(sourceId, allocationId, '90'));
    await withRequirements(procurementPrincipal, 'b05-release', 'READ COMMITTED', (h) => h.release(allocationId));
    expect(await withRequirements(procurementPrincipal, 'b05-total-release', 'READ COMMITTED', (h) => h.activeAllocated(sourceId))).toBe('0');
    const history = await setupPool.query(`SELECT occurrence_kind FROM requirements.requirement_allocation_occurrence WHERE requirement_allocation_id=$1 ORDER BY sequence`, [allocationId]);
    expect(history.rows.map((r) => r.occurrence_kind)).toEqual(['ALLOCATED','RELEASED']);
  });

  it('package removal never destroys RequirementAllocation lineage', async () => {
    const sourceId = randomUUID();
    const allocationId = randomUUID();
    const packageId = randomUUID();
    await withRequirements(procurementPrincipal, 'b05-source-pkg', 'READ COMMITTED', (h) => h.createSource(sourceId, '50'));
    await withRequirements(procurementPrincipal, 'b05-alloc-pkg', 'READ COMMITTED', (h) => h.allocate(sourceId, allocationId, '25'));
    await withRequirements(procurementPrincipal, 'b05-pkg', 'READ COMMITTED', (h) => h.createPackage(packageId));
    await withRequirements(procurementPrincipal, 'b05-pkg-add', 'READ COMMITTED', (h) => h.packageMembership(packageId, allocationId, 'ADDED'));
    await withRequirements(procurementPrincipal, 'b05-pkg-remove', 'READ COMMITTED', (h) => h.packageMembership(packageId, allocationId, 'REMOVED'));
    expect(await withRequirements(procurementPrincipal, 'b05-total-pkg', 'READ COMMITTED', (h) => h.activeAllocated(sourceId))).toBe('25.000000000000');
    const allocation = await setupPool.query('SELECT 1 FROM requirements.requirement_allocation WHERE requirement_allocation_id=$1', [allocationId]);
    expect(allocation.rowCount).toBe(1);
  });

  it('keeps Commercial Reviewer read-only for allocation commands', async () => {
    await expect(withRequirements(reviewerPrincipal, 'b05-reviewer', 'READ COMMITTED', (h) => h.createSource(randomUUID(), '10'))).rejects.toThrow(/not authorized/u);
  });
});
