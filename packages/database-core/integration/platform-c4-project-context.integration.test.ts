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

const setupPool = createIntegrationPool('cpos-b02-platform-c4-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 12,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-platform-c4-runtime',
});
const trackingSchema = uniqueSchema('platform_c4_tracking');

const tenantA = '019d7100-0000-7000-8000-000000000001';
const tenantB = '019d7100-0000-7000-8000-000000000002';
const legalA = '019d7100-0000-7000-8000-000000000003';
const legalB = '019d7100-0000-7000-8000-000000000004';
const authorityA = '019d7100-0000-7000-8000-000000000005';
const authorityB = '019d7100-0000-7000-8000-000000000006';
const ownerPrincipal = '019d7100-0000-7000-8000-000000000007';
const memberPrincipal = '019d7100-0000-7000-8000-000000000008';
const ownerMembership = '019d7100-0000-7000-8000-000000000009';
const memberMembership = '019d7100-0000-7000-8000-000000000010';
const ownerRole = '019d7100-0000-7000-8000-000000000011';
const subscriptionA = '019d7100-0000-7000-8000-000000000012';

interface ProjectRow {
  readonly project_id: string;
  readonly project_code: string;
  readonly display_name: string;
  readonly lifecycle_state: string;
  readonly authority_context_id: string;
}

interface ProjectHandle {
  create(input: {
    readonly projectId: string;
    readonly tenantId: string;
    readonly authorityContextId: string;
    readonly projectCode: string;
    readonly displayName: string;
    readonly effectiveAt: string;
  }): Promise<void>;
  list(asOf: string): Promise<readonly ProjectRow[]>;
}

const projectAdapter = definePersistenceAdapter<ProjectHandle>({
  moduleKey: 'platform_project',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    create: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
        VALUES (${input.projectId}, ${input.tenantId}, ${input.authorityContextId})
      `);
      await executor.execute(sql`
        INSERT INTO platform.project_version (
          project_id,
          tenant_id,
          version,
          project_code,
          display_name,
          lifecycle_state,
          effective_period
        ) VALUES (
          ${input.projectId},
          ${input.tenantId},
          1,
          ${input.projectCode},
          ${input.displayName},
          'ACTIVE',
          tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    list: (asOf) =>
      executor.all<ProjectRow>(sql`
        SELECT
          p.project_id::text,
          pv.project_code,
          pv.display_name,
          pv.lifecycle_state,
          p.authority_context_id::text
        FROM platform.project p
        JOIN platform.project_version pv
          ON pv.tenant_id = p.tenant_id
         AND pv.project_id = p.project_id
        WHERE p.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND pv.effective_period @> ${asOf}::timestamptz
        ORDER BY pv.project_code
      `),
  }),
});

function executionContext(tenantId: string, principalId: string, invocationId: string) {
  return {
    tenantId,
    principalId,
    operationKey: 'platform.project.create.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function withProjects<T>(
  tenantId: string,
  principalId: string,
  logicalIdentity: string,
  callback: (handle: ProjectHandle) => Promise<T>,
): Promise<T> {
  return runtime.withExecutionContext(
    executionContext(tenantId, principalId, logicalIdentity),
    { isolation: 'READ COMMITTED', logicalIdentity },
    projectAdapter,
    callback,
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'platform-c4-integration',
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
       ($1, $2, 'HUMAN', 'Owner', 'ACTIVE'),
       ($3, $2, 'HUMAN', 'Member', 'ACTIVE')`,
    [ownerPrincipal, tenantA, memberPrincipal],
  );
  await setupPool.query(
    `INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
     VALUES ($1, $2, $3), ($4, $2, $5)`,
    [ownerMembership, tenantA, ownerPrincipal, memberMembership, memberPrincipal],
  );
  await setupPool.query(
    `INSERT INTO platform.tenant_membership_version (
       membership_id, tenant_id, version, membership_state, effective_period
     ) VALUES
       ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)')),
       ($3, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [ownerMembership, tenantA, memberMembership],
  );
  await setupPool.query(
    `INSERT INTO platform.role_assignment (
       role_assignment_id, tenant_id, membership_id, role_key
     ) VALUES ($1, $2, $3, 'OWNER')`,
    [ownerRole, tenantA, ownerMembership],
  );
  await setupPool.query(
    `INSERT INTO platform.role_assignment_version (
       role_assignment_id, tenant_id, version, assignment_state, effective_period
     ) VALUES ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [ownerRole, tenantA],
  );
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
});

afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B02 C4 governed project context', () => {
  it('allows an active OWNER with active product access to create and read the first tenant project', async () => {
    const projectId = '019d7200-0000-7000-8000-000000000001';
    await withProjects(tenantA, ownerPrincipal, 'project-owner-create', (handle) =>
      handle.create({
        projectId,
        tenantId: tenantA,
        authorityContextId: authorityA,
        projectCode: 'JP-047',
        displayName: 'Jumeirah Park Villa 47',
        effectiveAt: '2026-08-11T00:00:00.000Z',
      }),
    );

    const rows = await withProjects(tenantA, ownerPrincipal, 'project-owner-read', (handle) =>
      handle.list('2026-08-11T12:00:00.000Z'),
    );
    expect(rows).toEqual([
      {
        project_id: projectId,
        project_code: 'JP-047',
        display_name: 'Jumeirah Park Villa 47',
        lifecycle_state: 'ACTIVE',
        authority_context_id: authorityA,
      },
    ]);
  });

  it('denies project creation to an active tenant member without OWNER role', async () => {
    await expect(
      withProjects(tenantA, memberPrincipal, 'project-member-create', (handle) =>
        handle.create({
          projectId: '019d7200-0000-7000-8000-000000000002',
          tenantId: tenantA,
          authorityContextId: authorityA,
          projectCode: 'DENIED-1',
          displayName: 'Denied Project',
          effectiveAt: '2026-08-11T00:00:00.000Z',
        }),
      ),
    ).rejects.toThrow();
  });

  it('denies a new project after commercial access is suspended without hiding existing project reads', async () => {
    const existingProject = '019d7200-0000-7000-8000-000000000006';
    await withProjects(tenantA, ownerPrincipal, 'project-before-suspend', (handle) =>
      handle.create({
        projectId: existingProject,
        tenantId: tenantA,
        authorityContextId: authorityA,
        projectCode: 'PRE-SUSPEND',
        displayName: 'Existing Project',
        effectiveAt: '2026-08-11T00:00:00.000Z',
      }),
    );

    await setupPool.query('BEGIN');
    try {
      await setupPool.query(
        `INSERT INTO platform.subscription_lifecycle_occurrence (
           tenant_id, tenant_subscription_id, sequence, occurrence_kind,
           effective_at, actor_kind
         ) VALUES ($1, $2, 2, 'SUSPENDED', statement_timestamp(), 'SYSTEM')`,
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

    await expect(
      withProjects(tenantA, ownerPrincipal, 'project-after-suspend', (handle) =>
        handle.create({
          projectId: '019d7200-0000-7000-8000-000000000007',
          tenantId: tenantA,
          authorityContextId: authorityA,
          projectCode: 'POST-SUSPEND',
          displayName: 'Blocked Project',
          effectiveAt: '2026-08-11T00:00:00.000Z',
        }),
      ),
    ).rejects.toThrow();

    const rows = await withProjects(tenantA, ownerPrincipal, 'project-read-after-suspend', (handle) =>
      handle.list('2026-08-11T12:00:00.000Z'),
    );
    expect(rows.some((row) => row.project_id === existingProject)).toBe(true);
  });

  it('fails closed on cross-tenant project or authority-context injection', async () => {
    await expect(
      withProjects(tenantA, ownerPrincipal, 'project-cross-tenant', (handle) =>
        handle.create({
          projectId: '019d7200-0000-7000-8000-000000000003',
          tenantId: tenantB,
          authorityContextId: authorityB,
          projectCode: 'TENANT-B',
          displayName: 'Cross Tenant',
          effectiveAt: '2026-08-11T00:00:00.000Z',
        }),
      ),
    ).rejects.toThrow();

    await expect(
      withProjects(tenantA, ownerPrincipal, 'project-cross-authority', (handle) =>
        handle.create({
          projectId: '019d7200-0000-7000-8000-000000000004',
          tenantId: tenantA,
          authorityContextId: authorityB,
          projectCode: 'BAD-AUTH',
          displayName: 'Wrong Authority',
          effectiveAt: '2026-08-11T00:00:00.000Z',
        }),
      ),
    ).rejects.toThrow();
  });

  it('keeps project identity and version history immutable', async () => {
    const projectId = '019d7200-0000-7000-8000-000000000005';
    await withProjects(tenantA, ownerPrincipal, 'project-immutable-create', (handle) =>
      handle.create({
        projectId,
        tenantId: tenantA,
        authorityContextId: authorityA,
        projectCode: 'IMM-1',
        displayName: 'Immutable Project',
        effectiveAt: '2026-08-11T00:00:00.000Z',
      }),
    );

    await expect(
      setupPool.query(
        `UPDATE platform.project_version SET display_name = 'rewritten'
         WHERE project_id = $1 AND version = 1`,
        [projectId],
      ),
    ).rejects.toThrow(/immutable/u);

    await expect(
      setupPool.query('DELETE FROM platform.project WHERE project_id = $1', [projectId]),
    ).rejects.toThrow(/immutable/u);
  });
});
