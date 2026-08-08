import path from 'node:path';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, requiredDatabaseUrl, uniqueSchema } from './test-support.js';

const setupPool = createIntegrationPool('cpos-b02-platform-c1-v2-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 12,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-platform-c1-v2-runtime',
});
const trackingSchema = uniqueSchema('platform_c1_v2_tracking');

interface BootstrapIds {
  readonly tenant: string;
  readonly legalEntity: string;
  readonly principal: string;
  readonly membership: string;
  readonly ownerRole: string;
  readonly authorityContext: string;
}

interface BootstrapRequest {
  readonly authenticationIdentityId: string;
  readonly idempotencyKey: string;
  readonly payloadDigest: string;
  readonly tenantName: string;
  readonly legalEntityName: string;
  readonly principalName: string;
  readonly effectiveAt: string;
  readonly ids: BootstrapIds;
}

interface EstablishedBootstrap {
  readonly state: 'ESTABLISHED';
  readonly proposedTenantId: string;
  readonly principalId: string;
  readonly membershipId: string;
  readonly ownerRoleAssignmentId: string;
  readonly authorityContextId: string;
  readonly version: string;
}

interface BootstrapRow {
  readonly payload_digest: string;
  readonly state: 'PENDING' | 'ESTABLISHED' | 'REJECTED';
  readonly proposed_tenant_id: string;
  readonly principal_id: string | null;
  readonly membership_id: string | null;
  readonly owner_role_assignment_id: string | null;
  readonly authority_context_id: string | null;
  readonly version: string;
}

interface BootstrapHandle {
  establish(
    request: BootstrapRequest,
    options?: Readonly<{ failAfterTenant?: boolean; wrongLegalEntityId?: string }>,
  ): Promise<EstablishedBootstrap>;
  find(idempotencyKey: string): Promise<BootstrapRow | undefined>;
}

interface TenantSnapshot {
  readonly tenant_id: string;
  readonly display_name: string;
  readonly legal_entity_id: string;
  readonly legal_name: string;
  readonly principal_id: string;
  readonly authentication_identity_id: string;
  readonly membership_id: string;
  readonly membership_state: string;
  readonly role_assignment_id: string;
  readonly role_key: string;
  readonly assignment_state: string;
  readonly authority_context_id: string;
  readonly context_kind: string;
  readonly primary_legal_entity_id: string;
}

interface TenantHandle {
  snapshot(asOf: string): Promise<readonly TenantSnapshot[]>;
  readBootstrapControl(idempotencyKey: string): Promise<BootstrapRow | undefined>;
}

const canonicalIds: BootstrapIds = {
  tenant: '019c1111-1111-7111-8111-111111111111',
  legalEntity: '019c2222-2222-7222-8222-222222222222',
  principal: '019c3333-3333-7333-8333-333333333333',
  membership: '019c4444-4444-7444-8444-444444444444',
  ownerRole: '019c5555-5555-7555-8555-555555555555',
  authorityContext: '019c6666-6666-7666-8666-666666666666',
};

const request: BootstrapRequest = {
  authenticationIdentityId: 'auth-user-001',
  idempotencyKey: 'bootstrap-request-001',
  payloadDigest: 'a'.repeat(64),
  tenantName: 'Example Contractor',
  legalEntityName: 'Example Contractor LLC',
  principalName: 'Owner User',
  effectiveAt: '2026-08-08T00:00:00.000Z',
  ids: canonicalIds,
};

function established(row: BootstrapRow): EstablishedBootstrap {
  if (
    row.state !== 'ESTABLISHED' ||
    row.principal_id === null ||
    row.membership_id === null ||
    row.owner_role_assignment_id === null ||
    row.authority_context_id === null
  ) {
    throw new Error('bootstrap row is not a complete established lineage');
  }
  return {
    state: 'ESTABLISHED',
    proposedTenantId: row.proposed_tenant_id,
    principalId: row.principal_id,
    membershipId: row.membership_id,
    ownerRoleAssignmentId: row.owner_role_assignment_id,
    authorityContextId: row.authority_context_id,
    version: row.version,
  };
}

const bootstrapAdapter = definePersistenceAdapter<BootstrapHandle>({
  moduleKey: 'platform_bootstrap',
  databaseRole: 'cpos_platform_bootstrap_runtime',
  executionScope: 'BOOTSTRAP',
  buildHandle: (executor) => {
    const find = (idempotencyKey: string) =>
      executor.oneOrNone<BootstrapRow>(sql`
        SELECT
          payload_digest,
          state,
          proposed_tenant_id::text,
          principal_id::text,
          membership_id::text,
          owner_role_assignment_id::text,
          authority_context_id::text,
          version::text
        FROM platform.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `);

    return {
      find,
      establish: async (input, options = {}) => {
        const inserted = await executor.execute(sql`
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
            ${input.authenticationIdentityId},
            ${input.idempotencyKey},
            1,
            ${input.payloadDigest},
            'PENDING',
            ${input.tenantName},
            ${input.legalEntityName},
            ${input.ids.tenant},
            ${input.ids.legalEntity},
            ${input.ids.principal},
            ${input.ids.membership},
            ${input.ids.ownerRole},
            ${input.ids.authorityContext}
          )
          ON CONFLICT (authentication_identity_id, idempotency_key) DO NOTHING
        `);

        const current = await find(input.idempotencyKey);
        if (current === undefined) throw new Error('bootstrap intent is not visible to its owner identity');
        if (current.payload_digest !== input.payloadDigest) {
          throw new Error('bootstrap idempotency key was reused with a different payload');
        }
        if (current.state === 'ESTABLISHED') return established(current);
        if (inserted.rowCount !== 1 || current.state !== 'PENDING') {
          throw new Error('bootstrap intent is neither newly PENDING nor already ESTABLISHED');
        }

        await executor.execute(sql`
          INSERT INTO platform.tenant (tenant_id, display_name)
          VALUES (${input.ids.tenant}, ${input.tenantName})
        `);
        if (options.failAfterTenant === true) throw new Error('forced bootstrap failure after tenant insert');

        const legalEntityId = options.wrongLegalEntityId ?? input.ids.legalEntity;
        await executor.execute(sql`
          INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
          VALUES (${legalEntityId}, ${input.ids.tenant})
        `);
        await executor.execute(sql`
          INSERT INTO platform.legal_entity_version (
            legal_entity_id,
            tenant_id,
            version,
            legal_name,
            lifecycle_state,
            effective_period
          ) VALUES (
            ${legalEntityId},
            ${input.ids.tenant},
            1,
            ${input.legalEntityName},
            'ACTIVE',
            tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
          )
        `);
        await executor.execute(sql`
          INSERT INTO platform.principal (
            principal_id,
            tenant_id,
            principal_kind,
            display_name,
            lifecycle_state
          ) VALUES (
            ${input.ids.principal},
            ${input.ids.tenant},
            'HUMAN',
            ${input.principalName},
            'ACTIVE'
          )
        `);
        await executor.execute(sql`
          INSERT INTO platform.principal_authentication_identity (
            tenant_id,
            principal_id,
            authentication_identity_id,
            effective_period
          ) VALUES (
            ${input.ids.tenant},
            ${input.ids.principal},
            ${input.authenticationIdentityId},
            tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
          )
        `);
        await executor.execute(sql`
          INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
          VALUES (${input.ids.membership}, ${input.ids.tenant}, ${input.ids.principal})
        `);
        await executor.execute(sql`
          INSERT INTO platform.tenant_membership_version (
            membership_id,
            tenant_id,
            version,
            membership_state,
            effective_period
          ) VALUES (
            ${input.ids.membership},
            ${input.ids.tenant},
            1,
            'ACTIVE',
            tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
          )
        `);
        await executor.execute(sql`
          INSERT INTO platform.role_assignment (
            role_assignment_id,
            tenant_id,
            membership_id,
            role_key
          ) VALUES (${input.ids.ownerRole}, ${input.ids.tenant}, ${input.ids.membership}, 'OWNER')
        `);
        await executor.execute(sql`
          INSERT INTO platform.role_assignment_version (
            role_assignment_id,
            tenant_id,
            version,
            assignment_state,
            effective_period
          ) VALUES (
            ${input.ids.ownerRole},
            ${input.ids.tenant},
            1,
            'ACTIVE',
            tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
          )
        `);
        await executor.execute(sql`
          INSERT INTO platform.contracting_authority_context (
            authority_context_id,
            tenant_id,
            context_kind
          ) VALUES (${input.ids.authorityContext}, ${input.ids.tenant}, 'SINGLE_LEGAL_ENTITY')
        `);
        await executor.execute(sql`
          INSERT INTO platform.contracting_authority_context_version (
            authority_context_id,
            tenant_id,
            version,
            primary_legal_entity_id,
            effective_period
          ) VALUES (
            ${input.ids.authorityContext},
            ${input.ids.tenant},
            1,
            ${input.ids.legalEntity},
            tstzrange(${input.effectiveAt}::timestamptz, NULL, '[)')
          )
        `);
        const marked = await executor.execute(sql`
          UPDATE platform.bootstrap_intent
          SET state = 'ESTABLISHED', established_at = ${input.effectiveAt}::timestamptz, version = version + 1
          WHERE idempotency_key = ${input.idempotencyKey} AND state = 'PENDING'
        `);
        if (marked.rowCount !== 1) throw new Error('bootstrap establishment update did not affect one row');

        const finalRow = await find(input.idempotencyKey);
        if (finalRow === undefined) throw new Error('established bootstrap row disappeared');
        return established(finalRow);
      },
    };
  },
});

const tenantAdapter = definePersistenceAdapter<TenantHandle>({
  moduleKey: 'platform',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    snapshot: (asOf) =>
      executor.all<TenantSnapshot>(sql`
        SELECT
          t.tenant_id::text,
          t.display_name,
          le.legal_entity_id::text,
          lev.legal_name,
          p.principal_id::text,
          pai.authentication_identity_id,
          tm.membership_id::text,
          tmv.membership_state,
          ra.role_assignment_id::text,
          ra.role_key,
          rav.assignment_state,
          cac.authority_context_id::text,
          cac.context_kind,
          cacv.primary_legal_entity_id::text
        FROM platform.tenant t
        JOIN platform.legal_entity le ON le.tenant_id = t.tenant_id
        JOIN platform.legal_entity_version lev ON lev.tenant_id = le.tenant_id AND lev.legal_entity_id = le.legal_entity_id
        JOIN platform.principal p ON p.tenant_id = t.tenant_id
        JOIN platform.principal_authentication_identity pai ON pai.tenant_id = p.tenant_id AND pai.principal_id = p.principal_id
        JOIN platform.tenant_membership tm ON tm.tenant_id = p.tenant_id AND tm.principal_id = p.principal_id
        JOIN platform.tenant_membership_version tmv ON tmv.tenant_id = tm.tenant_id AND tmv.membership_id = tm.membership_id
        JOIN platform.role_assignment ra ON ra.tenant_id = tm.tenant_id AND ra.membership_id = tm.membership_id
        JOIN platform.role_assignment_version rav ON rav.tenant_id = ra.tenant_id AND rav.role_assignment_id = ra.role_assignment_id
        JOIN platform.contracting_authority_context cac ON cac.tenant_id = t.tenant_id
        JOIN platform.contracting_authority_context_version cacv ON cacv.tenant_id = cac.tenant_id AND cacv.authority_context_id = cac.authority_context_id
        WHERE t.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND lev.effective_period @> ${asOf}::timestamptz
          AND pai.effective_period @> ${asOf}::timestamptz
          AND tmv.effective_period @> ${asOf}::timestamptz
          AND rav.effective_period @> ${asOf}::timestamptz
          AND cacv.effective_period @> ${asOf}::timestamptz
      `),
    readBootstrapControl: (idempotencyKey) =>
      executor.oneOrNone<BootstrapRow>(sql`
        SELECT payload_digest, state, proposed_tenant_id::text, principal_id::text,
               membership_id::text, owner_role_assignment_id::text,
               authority_context_id::text, version::text
        FROM platform.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `),
  }),
});

function bootstrapContext(input: BootstrapRequest, invocationId: string) {
  return {
    authenticationIdentityId: input.authenticationIdentityId,
    proposedTenantId: input.ids.tenant,
    operationKey: 'platform.tenant.bootstrap.v1' as const,
    invocationId,
    serviceIdentity: 'api',
  };
}

function tenantContext(invocationId: string) {
  return {
    tenantId: canonicalIds.tenant,
    principalId: canonicalIds.principal,
    authorityContextId: canonicalIds.authorityContext,
    operationKey: 'platform.tenant.snapshot.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function runBootstrap(
  input: BootstrapRequest,
  options: Readonly<{ failAfterTenant?: boolean; wrongLegalEntityId?: string }> = {},
): Promise<EstablishedBootstrap> {
  return runtime.withBootstrapContext(
    bootstrapContext(input, `invoke-${input.idempotencyKey}`),
    { isolation: 'READ COMMITTED', logicalIdentity: input.idempotencyKey },
    bootstrapAdapter,
    (handle) => handle.establish(input, options),
  );
}

async function count(table: string, predicateSql = 'TRUE'): Promise<number> {
  const result = await setupPool.query<{ count: string }>(
    `SELECT count(*)::text AS count FROM ${table} WHERE ${predicateSql}`,
  );
  return Number(result.rows[0]?.count ?? '0');
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'platform-c1-v2-integration',
  });
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
});

afterAll(async () => {
  await setupPool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B02 C1 production bootstrap v2', () => {
  it('rolls back both control and tenant state on a mid-transaction failure', async () => {
    const failed: BootstrapRequest = {
      ...request,
      authenticationIdentityId: 'auth-failure',
      idempotencyKey: 'bootstrap-failure',
      payloadDigest: 'b'.repeat(64),
      ids: {
        tenant: '019c7111-1111-7111-8111-111111111111',
        legalEntity: '019c7222-2222-7222-8222-222222222222',
        principal: '019c7333-3333-7333-8333-333333333333',
        membership: '019c7444-4444-7444-8444-444444444444',
        ownerRole: '019c7555-5555-7555-8555-555555555555',
        authorityContext: '019c7666-6666-7666-8666-666666666666',
      },
    };

    await expect(runBootstrap(failed, { failAfterTenant: true })).rejects.toThrow(/forced bootstrap failure/u);
    expect(await count('platform.bootstrap_intent', "idempotency_key = 'bootstrap-failure'")) .toBe(0);
    expect(await count('platform.tenant', `tenant_id = '${failed.ids.tenant}'::uuid`)).toBe(0);
  });

  it('rejects an authority row whose ID was not bound by the pending bootstrap intent', async () => {
    const wrong: BootstrapRequest = {
      ...request,
      authenticationIdentityId: 'auth-wrong-id',
      idempotencyKey: 'bootstrap-wrong-id',
      payloadDigest: 'd'.repeat(64),
      ids: {
        tenant: '019c8111-1111-7111-8111-111111111111',
        legalEntity: '019c8222-2222-7222-8222-222222222222',
        principal: '019c8333-3333-7333-8333-333333333333',
        membership: '019c8444-4444-7444-8444-444444444444',
        ownerRole: '019c8555-5555-7555-8555-555555555555',
        authorityContext: '019c8666-6666-7666-8666-666666666666',
      },
    };

    await expect(
      runBootstrap(wrong, { wrongLegalEntityId: '019c8999-9999-7999-8999-999999999999' }),
    ).rejects.toMatchObject({ code: '42501' });
    expect(await count('platform.bootstrap_intent', "idempotency_key = 'bootstrap-wrong-id'")) .toBe(0);
  });

  it('converges twenty concurrent identical attempts to one OWNER lineage', async () => {
    const results = await Promise.all(Array.from({ length: 20 }, () => runBootstrap(request)));

    expect(results.every((result) => result.state === 'ESTABLISHED')).toBe(true);
    expect(new Set(results.map((result) => result.proposedTenantId))).toEqual(new Set([canonicalIds.tenant]));
    expect(new Set(results.map((result) => result.principalId))).toEqual(new Set([canonicalIds.principal]));

    expect(await count('platform.bootstrap_intent', "idempotency_key = 'bootstrap-request-001'")) .toBe(1);
    expect(await count('platform.tenant', `tenant_id = '${canonicalIds.tenant}'::uuid`)).toBe(1);
    expect(await count('platform.legal_entity', `tenant_id = '${canonicalIds.tenant}'::uuid`)).toBe(1);
    expect(await count('platform.principal', `tenant_id = '${canonicalIds.tenant}'::uuid`)).toBe(1);
    expect(await count('platform.tenant_membership', `tenant_id = '${canonicalIds.tenant}'::uuid`)).toBe(1);
    expect(await count('platform.role_assignment', `tenant_id = '${canonicalIds.tenant}'::uuid AND role_key = 'OWNER'`)).toBe(1);
    expect(await count('platform.contracting_authority_context', `tenant_id = '${canonicalIds.tenant}'::uuid`)).toBe(1);
  });

  it('returns the same established result on a lost-result retry', async () => {
    const first = await runBootstrap(request);
    const retry = await runBootstrap(request);
    expect(retry).toEqual(first);
    expect(retry.version).toBe('2');
  });

  it('fails closed when one idempotency key is reused with a changed payload', async () => {
    await expect(runBootstrap({ ...request, payloadDigest: 'c'.repeat(64) })).rejects.toThrow(/different payload/u);
  });

  it('exposes the established lineage only through ordinary tenant context', async () => {
    const snapshot = await runtime.withExecutionContext(
      tenantContext('tenant-authority-readback'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-authority-readback' },
      tenantAdapter,
      (handle) => handle.snapshot(request.effectiveAt),
    );

    expect(snapshot).toEqual([
      {
        tenant_id: canonicalIds.tenant,
        display_name: request.tenantName,
        legal_entity_id: canonicalIds.legalEntity,
        legal_name: request.legalEntityName,
        principal_id: canonicalIds.principal,
        authentication_identity_id: request.authenticationIdentityId,
        membership_id: canonicalIds.membership,
        membership_state: 'ACTIVE',
        role_assignment_id: canonicalIds.ownerRole,
        role_key: 'OWNER',
        assignment_state: 'ACTIVE',
        authority_context_id: canonicalIds.authorityContext,
        context_kind: 'SINGLE_LEGAL_ENTITY',
        primary_legal_entity_id: canonicalIds.legalEntity,
      },
    ]);
  });

  it('denies ordinary tenant runtime access to bootstrap-control state', async () => {
    await expect(
      runtime.withExecutionContext(
        tenantContext('tenant-bootstrap-control-read'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-bootstrap-control-read' },
        tenantAdapter,
        (handle) => handle.readBootstrapControl(request.idempotencyKey),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('hides the bootstrap intent from another authentication identity', async () => {
    const hidden = await runtime.withBootstrapContext(
      {
        authenticationIdentityId: 'different-auth-user',
        proposedTenantId: canonicalIds.tenant,
        operationKey: 'platform.tenant.bootstrap.v1',
        invocationId: 'cross-identity-read',
        serviceIdentity: 'api',
      },
      { isolation: 'READ COMMITTED', logicalIdentity: 'cross-identity-read' },
      bootstrapAdapter,
      (handle) => handle.find(request.idempotencyKey),
    );
    expect(hidden).toBeUndefined();
  });
});
