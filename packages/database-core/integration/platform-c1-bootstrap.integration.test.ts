import path from 'node:path';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { definePersistenceAdapter, sql } from '../src/persistence.js';
import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, requiredDatabaseUrl, uniqueSchema } from './test-support.js';

const setupPool = createIntegrationPool('cpos-b02-platform-c1-setup');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 12,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b02-platform-c1-runtime',
});

const trackingSchema = uniqueSchema('platform_c1_migration_tracking');

const ids = {
  tenant: '019c1111-1111-7111-8111-111111111111',
  legalEntity: '019c2222-2222-7222-8222-222222222222',
  principal: '019c3333-3333-7333-8333-333333333333',
  membership: '019c4444-4444-7444-8444-444444444444',
  ownerRole: '019c5555-5555-7555-8555-555555555555',
  authorityContext: '019c6666-6666-7666-8666-666666666666',
} as const;

const failedIds = {
  tenant: '019c7111-1111-7111-8111-111111111111',
  legalEntity: '019c7222-2222-7222-8222-222222222222',
  principal: '019c7333-3333-7333-8333-333333333333',
  membership: '019c7444-4444-7444-8444-444444444444',
  ownerRole: '019c7555-5555-7555-8555-555555555555',
  authorityContext: '019c7666-6666-7666-8666-666666666666',
} as const;

type BootstrapIds = typeof ids;

interface BootstrapIntentRow {
  readonly authentication_identity_id: string;
  readonly idempotency_key: string;
  readonly payload_digest: string;
  readonly state: 'PENDING' | 'ESTABLISHED' | 'REJECTED';
  readonly proposed_tenant_id: string;
  readonly legal_entity_id: string | null;
  readonly principal_id: string | null;
  readonly membership_id: string | null;
  readonly owner_role_assignment_id: string | null;
  readonly authority_context_id: string | null;
  readonly version: string;
}

interface BootstrapPersistence {
  insertPending(input: {
    readonly authenticationIdentityId: string;
    readonly idempotencyKey: string;
    readonly payloadDigest: string;
    readonly tenantName: string;
    readonly legalEntityName: string;
    readonly ids: BootstrapIds;
  }): Promise<number>;
  getIntent(idempotencyKey: string): Promise<BootstrapIntentRow | undefined>;
  insertTenant(tenantId: string, displayName: string): Promise<void>;
  insertLegalEntity(tenantId: string, legalEntityId: string, legalName: string, effectiveAt: string): Promise<void>;
  insertPrincipal(tenantId: string, principalId: string, displayName: string): Promise<void>;
  bindAuthenticationIdentity(
    tenantId: string,
    principalId: string,
    authenticationIdentityId: string,
    effectiveAt: string,
  ): Promise<void>;
  insertMembership(tenantId: string, membershipId: string, principalId: string, effectiveAt: string): Promise<void>;
  insertOwnerRole(tenantId: string, roleId: string, membershipId: string, effectiveAt: string): Promise<void>;
  insertAuthorityContext(
    tenantId: string,
    contextId: string,
    legalEntityId: string,
    effectiveAt: string,
  ): Promise<void>;
  markEstablished(idempotencyKey: string, establishedAt: string): Promise<void>;
  attemptWrongLegalEntity(tenantId: string, wrongLegalEntityId: string): Promise<void>;
}

interface TenantSnapshotRow {
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

interface TenantPersistence {
  snapshot(): Promise<readonly TenantSnapshotRow[]>;
  attemptBootstrapRead(idempotencyKey: string): Promise<BootstrapIntentRow | undefined>;
}

const bootstrapAdapter = definePersistenceAdapter<BootstrapPersistence>({
  moduleKey: 'platform_bootstrap',
  databaseRole: 'cpos_platform_bootstrap_runtime',
  executionScope: 'BOOTSTRAP',
  buildHandle: (executor) => ({
    insertPending: async (input) => {
      const result = await executor.execute(sql`
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
      return result.rowCount;
    },
    getIntent: (idempotencyKey) =>
      executor.oneOrNone<BootstrapIntentRow>(sql`
        SELECT
          authentication_identity_id,
          idempotency_key,
          payload_digest,
          state,
          proposed_tenant_id::text,
          legal_entity_id::text,
          principal_id::text,
          membership_id::text,
          owner_role_assignment_id::text,
          authority_context_id::text,
          version::text
        FROM platform.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `),
    insertTenant: async (tenantId, displayName) => {
      await executor.execute(sql`
        INSERT INTO platform.tenant (tenant_id, display_name)
        VALUES (${tenantId}, ${displayName})
      `);
    },
    insertLegalEntity: async (tenantId, legalEntityId, legalName, effectiveAt) => {
      await executor.execute(sql`
        INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
        VALUES (${legalEntityId}, ${tenantId})
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
          ${tenantId},
          1,
          ${legalName},
          'ACTIVE',
          tstzrange(${effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    insertPrincipal: async (tenantId, principalId, displayName) => {
      await executor.execute(sql`
        INSERT INTO platform.principal (
          principal_id,
          tenant_id,
          principal_kind,
          display_name,
          lifecycle_state
        ) VALUES (
          ${principalId},
          ${tenantId},
          'HUMAN',
          ${displayName},
          'ACTIVE'
        )
      `);
    },
    bindAuthenticationIdentity: async (
      tenantId,
      principalId,
      authenticationIdentityId,
      effectiveAt,
    ) => {
      await executor.execute(sql`
        INSERT INTO platform.principal_authentication_identity (
          tenant_id,
          principal_id,
          authentication_identity_id,
          effective_period
        ) VALUES (
          ${tenantId},
          ${principalId},
          ${authenticationIdentityId},
          tstzrange(${effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    insertMembership: async (tenantId, membershipId, principalId, effectiveAt) => {
      await executor.execute(sql`
        INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
        VALUES (${membershipId}, ${tenantId}, ${principalId})
      `);
      await executor.execute(sql`
        INSERT INTO platform.tenant_membership_version (
          membership_id,
          tenant_id,
          version,
          membership_state,
          effective_period
        ) VALUES (
          ${membershipId},
          ${tenantId},
          1,
          'ACTIVE',
          tstzrange(${effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    insertOwnerRole: async (tenantId, roleId, membershipId, effectiveAt) => {
      await executor.execute(sql`
        INSERT INTO platform.role_assignment (
          role_assignment_id,
          tenant_id,
          membership_id,
          role_key
        ) VALUES (
          ${roleId},
          ${tenantId},
          ${membershipId},
          'OWNER'
        )
      `);
      await executor.execute(sql`
        INSERT INTO platform.role_assignment_version (
          role_assignment_id,
          tenant_id,
          version,
          assignment_state,
          effective_period
        ) VALUES (
          ${roleId},
          ${tenantId},
          1,
          'ACTIVE',
          tstzrange(${effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    insertAuthorityContext: async (tenantId, contextId, legalEntityId, effectiveAt) => {
      await executor.execute(sql`
        INSERT INTO platform.contracting_authority_context (
          authority_context_id,
          tenant_id,
          context_kind
        ) VALUES (
          ${contextId},
          ${tenantId},
          'SINGLE_LEGAL_ENTITY'
        )
      `);
      await executor.execute(sql`
        INSERT INTO platform.contracting_authority_context_version (
          authority_context_id,
          tenant_id,
          version,
          primary_legal_entity_id,
          effective_period
        ) VALUES (
          ${contextId},
          ${tenantId},
          1,
          ${legalEntityId},
          tstzrange(${effectiveAt}::timestamptz, NULL, '[)')
        )
      `);
    },
    markEstablished: async (idempotencyKey, establishedAt) => {
      const result = await executor.execute(sql`
        UPDATE platform.bootstrap_intent
        SET
          state = 'ESTABLISHED',
          established_at = ${establishedAt}::timestamptz,
          version = version + 1
        WHERE idempotency_key = ${idempotencyKey}
          AND state = 'PENDING'
      `);
      if (result.rowCount !== 1) throw new Error('bootstrap intent establishment did not update exactly one row');
    },
    attemptWrongLegalEntity: async (tenantId, wrongLegalEntityId) => {
      await executor.execute(sql`
        INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
        VALUES (${wrongLegalEntityId}, ${tenantId})
      `);
    },
  }),
});

const tenantAdapter = definePersistenceAdapter<TenantPersistence>({
  moduleKey: 'platform',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    snapshot: () =>
      executor.all<TenantSnapshotRow>(sql`
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
        JOIN platform.legal_entity_version lev
          ON lev.tenant_id = le.tenant_id
         AND lev.legal_entity_id = le.legal_entity_id
        JOIN platform.principal p ON p.tenant_id = t.tenant_id
        JOIN platform.principal_authentication_identity pai
          ON pai.tenant_id = p.tenant_id
         AND pai.principal_id = p.principal_id
        JOIN platform.tenant_membership tm
          ON tm.tenant_id = p.tenant_id
         AND tm.principal_id = p.principal_id
        JOIN platform.tenant_membership_version tmv
          ON tmv.tenant_id = tm.tenant_id
         AND tmv.membership_id = tm.membership_id
        JOIN platform.role_assignment ra
          ON ra.tenant_id = tm.tenant_id
         AND ra.membership_id = tm.membership_id
        JOIN platform.role_assignment_version rav
          ON rav.tenant_id = ra.tenant_id
         AND rav.role_assignment_id = ra.role_assignment_id
        JOIN platform.contracting_authority_context cac
          ON cac.tenant_id = t.tenant_id
        JOIN platform.contracting_authority_context_version cacv
          ON cacv.tenant_id = cac.tenant_id
         AND cacv.authority_context_id = cac.authority_context_id
        WHERE t.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND lev.effective_period @> clock_timestamp()
          AND pai.effective_period @> clock_timestamp()
          AND tmv.effective_period @> clock_timestamp()
          AND rav.effective_period @> clock_timestamp()
          AND cacv.effective_period @> clock_timestamp()
      `),
    attemptBootstrapRead: (idempotencyKey) =>
      executor.oneOrNone<BootstrapIntentRow>(sql`
        SELECT
          authentication_identity_id,
          idempotency_key,
          payload_digest,
          state,
          proposed_tenant_id::text,
          legal_entity_id::text,
          principal_id::text,
          membership_id::text,
          owner_role_assignment_id::text,
          authority_context_id::text,
          version::text
        FROM platform.bootstrap_intent
        WHERE idempotency_key = ${idempotencyKey}
      `),
  }),
});

const request = {
  authenticationIdentityId: 'auth-user-001',
  idempotencyKey: 'bootstrap-request-001',
  payloadDigest: 'a'.repeat(64),
  tenantName: 'Example Contractor',
  legalEntityName: 'Example Contractor LLC',
  principalName: 'Owner User',
  effectiveAt: '2026-08-08T08:00:00.000Z',
  ids,
} as const;

function bootstrapContext(authenticationIdentityId: string, tenantId: string, invocationId: string) {
  return {
    authenticationIdentityId,
    proposedTenantId: tenantId,
    operationKey: 'platform.tenant.bootstrap.v1' as const,
    invocationId,
    serviceIdentity: 'api',
  };
}

function tenantContext(tenantId: string, invocationId: string) {
  return {
    tenantId,
    principalId: ids.principal,
    authorityContextId: ids.authorityContext,
    operationKey: 'platform.tenant.snapshot.v1',
    invocationId,
    serviceIdentity: 'api',
  };
}

async function establishBootstrap(input: typeof request, options: { readonly failAfterTenant?: boolean } = {}) {
  return runtime.withBootstrapContext(
    bootstrapContext(input.authenticationIdentityId, input.ids.tenant, `invoke-${input.idempotencyKey}`),
    { isolation: 'READ COMMITTED', logicalIdentity: input.idempotencyKey },
    bootstrapAdapter,
    async (handle) => {
      const inserted = await handle.insertPending(input);
      const intent = await handle.getIntent(input.idempotencyKey);
      if (intent === undefined) throw new Error('bootstrap intent was not visible to its owner identity');
      if (intent.payload_digest !== input.payloadDigest) {
        throw new Error('bootstrap idempotency key was reused with a different payload');
      }
      if (intent.state === 'ESTABLISHED') return intent;
      if (inserted !== 1 || intent.state !== 'PENDING') {
        throw new Error('bootstrap intent is neither the newly inserted PENDING row nor ESTABLISHED');
      }

      await handle.insertTenant(input.ids.tenant, input.tenantName);
      if (options.failAfterTenant === true) throw new Error('forced bootstrap failure after tenant insert');

      await handle.insertLegalEntity(
        input.ids.tenant,
        input.ids.legalEntity,
        input.legalEntityName,
        input.effectiveAt,
      );
      await handle.insertPrincipal(input.ids.tenant, input.ids.principal, input.principalName);
      await handle.bindAuthenticationIdentity(
        input.ids.tenant,
        input.ids.principal,
        input.authenticationIdentityId,
        input.effectiveAt,
      );
      await handle.insertMembership(
        input.ids.tenant,
        input.ids.membership,
        input.ids.principal,
        input.effectiveAt,
      );
      await handle.insertOwnerRole(
        input.ids.tenant,
        input.ids.ownerRole,
        input.ids.membership,
        input.effectiveAt,
      );
      await handle.insertAuthorityContext(
        input.ids.tenant,
        input.ids.authorityContext,
        input.ids.legalEntity,
        input.effectiveAt,
      );
      await handle.markEstablished(input.idempotencyKey, input.effectiveAt);

      const established = await handle.getIntent(input.idempotencyKey);
      if (established?.state !== 'ESTABLISHED') throw new Error('bootstrap intent did not establish');
      return established;
    },
  );
}

beforeAll(async () => {
  await runMigrations(setupPool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'platform-c1-integration',
  });

  await setupPool.query(`
    TRUNCATE TABLE
      platform.contracting_authority_context_version,
      platform.contracting_authority_context,
      platform.role_assignment_version,
      platform.role_assignment,
      platform.tenant_membership_version,
      platform.tenant_membership,
      platform.principal_authentication_identity,
      platform.principal,
      platform.legal_entity_version,
      platform.legal_entity,
      platform.tenant,
      platform.bootstrap_intent
    RESTART IDENTITY CASCADE
  `);
});

afterAll(async () => {
  await runtime.close();
  await dropSchema(setupPool, trackingSchema);
  await setupPool.end();
});

describe('B02 C1 production bootstrap and initial-owner lineage', () => {
  it('rolls back the complete lineage when bootstrap fails mid-transaction', async () => {
    const failedRequest = {
      ...request,
      idempotencyKey: 'bootstrap-forced-failure',
      payloadDigest: 'b'.repeat(64),
      ids: failedIds,
    } as const;

    await expect(establishBootstrap(failedRequest, { failAfterTenant: true })).rejects.toThrow(
      /forced bootstrap failure/u,
    );

    const rows = await setupPool.query<{ intent_count: string; tenant_count: string }>(`
      SELECT
        (SELECT count(*)::text FROM platform.bootstrap_intent WHERE idempotency_key = 'bootstrap-forced-failure') AS intent_count,
        (SELECT count(*)::text FROM platform.tenant WHERE tenant_id = '${failedIds.tenant}'::uuid) AS tenant_count
    `);
    expect(rows.rows[0]).toEqual({ intent_count: '0', tenant_count: '0' });
  });

  it('converges twenty concurrent identical bootstrap attempts to one established lineage', async () => {
    const results = await Promise.all(
      Array.from({ length: 20 }, () => establishBootstrap(request)),
    );

    expect(new Set(results.map((result) => result.proposed_tenant_id))).toEqual(new Set([ids.tenant]));
    expect(new Set(results.map((result) => result.principal_id))).toEqual(new Set([ids.principal]));
    expect(results.every((result) => result.state === 'ESTABLISHED')).toBe(true);

    const counts = await setupPool.query<{
      intents: string;
      tenants: string;
      legal_entities: string;
      principals: string;
      memberships: string;
      owner_roles: string;
      authority_contexts: string;
    }>(`
      SELECT
        (SELECT count(*)::text FROM platform.bootstrap_intent WHERE idempotency_key = 'bootstrap-request-001') AS intents,
        (SELECT count(*)::text FROM platform.tenant WHERE tenant_id = '${ids.tenant}'::uuid) AS tenants,
        (SELECT count(*)::text FROM platform.legal_entity WHERE tenant_id = '${ids.tenant}'::uuid) AS legal_entities,
        (SELECT count(*)::text FROM platform.principal WHERE tenant_id = '${ids.tenant}'::uuid) AS principals,
        (SELECT count(*)::text FROM platform.tenant_membership WHERE tenant_id = '${ids.tenant}'::uuid) AS memberships,
        (SELECT count(*)::text FROM platform.role_assignment WHERE tenant_id = '${ids.tenant}'::uuid AND role_key = 'OWNER') AS owner_roles,
        (SELECT count(*)::text FROM platform.contracting_authority_context WHERE tenant_id = '${ids.tenant}'::uuid) AS authority_contexts
    `);
    expect(counts.rows[0]).toEqual({
      intents: '1',
      tenants: '1',
      legal_entities: '1',
      principals: '1',
      memberships: '1',
      owner_roles: '1',
      authority_contexts: '1',
    });
  });

  it('returns the exact established result on lost-result retry', async () => {
    const first = await establishBootstrap(request);
    const retry = await establishBootstrap(request);
    expect(retry).toEqual(first);
    expect(retry.version).toBe('2');
  });

  it('fails closed when the same idempotency key is reused with a changed payload', async () => {
    await expect(
      establishBootstrap({ ...request, payloadDigest: 'c'.repeat(64) }),
    ).rejects.toThrow(/different payload/u);
  });

  it('binds bootstrap creation to the exact IDs recorded in the pending intent', async () => {
    const wrongId = '019c9999-9999-7999-8999-999999999999';
    await expect(
      runtime.withBootstrapContext(
        bootstrapContext(request.authenticationIdentityId, ids.tenant, 'wrong-legal-entity'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'wrong-legal-entity' },
        bootstrapAdapter,
        (handle) => handle.attemptWrongLegalEntity(ids.tenant, wrongId),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('exposes the established authority lineage only through ordinary tenant context', async () => {
    const snapshot = await runtime.withExecutionContext(
      tenantContext(ids.tenant, 'tenant-authority-readback'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-authority-readback' },
      tenantAdapter,
      (handle) => handle.snapshot(),
    );

    expect(snapshot).toEqual([
      {
        tenant_id: ids.tenant,
        display_name: request.tenantName,
        legal_entity_id: ids.legalEntity,
        legal_name: request.legalEntityName,
        principal_id: ids.principal,
        authentication_identity_id: request.authenticationIdentityId,
        membership_id: ids.membership,
        membership_state: 'ACTIVE',
        role_assignment_id: ids.ownerRole,
        role_key: 'OWNER',
        assignment_state: 'ACTIVE',
        authority_context_id: ids.authorityContext,
        context_kind: 'SINGLE_LEGAL_ENTITY',
        primary_legal_entity_id: ids.legalEntity,
      },
    ]);
  });

  it('denies ordinary tenant runtime access to bootstrap-control state', async () => {
    await expect(
      runtime.withExecutionContext(
        tenantContext(ids.tenant, 'tenant-bootstrap-control-read'),
        { isolation: 'READ COMMITTED', logicalIdentity: 'tenant-bootstrap-control-read' },
        tenantAdapter,
        (handle) => handle.attemptBootstrapRead(request.idempotencyKey),
      ),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('hides another identity bootstrap control even for the same proposed tenant context', async () => {
    const hidden = await runtime.withBootstrapContext(
      bootstrapContext('different-auth-user', ids.tenant, 'cross-identity-bootstrap-read'),
      { isolation: 'READ COMMITTED', logicalIdentity: 'cross-identity-bootstrap-read' },
      bootstrapAdapter,
      (handle) => handle.getIntent(request.idempotencyKey),
    );
    expect(hidden).toBeUndefined();
  });
});
