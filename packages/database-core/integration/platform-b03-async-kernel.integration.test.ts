import { randomUUID } from 'node:crypto';
import path from 'node:path';

import type { PoolClient, QueryResultRow } from 'pg';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-b03-async-kernel');
const trackingSchema = uniqueSchema('b03_async_tracking');

const tenantA = '019d7300-0000-7000-8000-000000000001';
const tenantB = '019d7300-0000-7000-8000-000000000002';
const principalA = '019d7300-0000-7000-8000-000000000003';
const principalB = '019d7300-0000-7000-8000-000000000004';
const fpA = 'a'.repeat(64);
const fpB = 'b'.repeat(64);
const fpC = 'c'.repeat(64);

interface AcceptedRow extends QueryResultRow {
  disposition: string;
  accepted_async_operation_id: string;
}

interface ClaimedRow extends QueryResultRow {
  claimed_job_id: string;
  claimed_tenant_id: string;
  claimed_async_operation_id: string;
  claimed_fencing_token: string;
  claimed_attempt_number: number;
}

async function setPlatformContext(client: PoolClient, tenantId: string, principalId: string) {
  await client.query('SET LOCAL ROLE cpos_platform_runtime');
  await client.query("SELECT set_config('cpos.tenant_id', $1, true)", [tenantId]);
  await client.query("SELECT set_config('cpos.principal_id', $1, true)", [principalId]);
}

async function acceptWithClient(
  client: PoolClient,
  input: {
    tenantId: string;
    principalId: string;
    logicalId: string;
    fingerprint?: string;
    operationId?: string;
    lane?: string;
  },
): Promise<AcceptedRow> {
  const result = await client.query<AcceptedRow>(
    `SELECT disposition, accepted_async_operation_id::text
     FROM ops.accept_async_operation(
       $1::uuid, $2::uuid, $3::uuid, NULL, NULL,
       'ops.async.hostile.v1', 1, $4, 'tenant-hostile-scope', $4,
       $5, '1.0.0', $6, 4
     )`,
    [
      input.operationId ?? randomUUID(),
      input.tenantId,
      input.principalId,
      input.logicalId,
      input.fingerprint ?? fpA,
      input.lane ?? 'routine-domain',
    ],
  );
  const row = result.rows[0];
  if (!row) throw new Error('accept_async_operation returned no row');
  return row;
}

async function accept(input: Parameters<typeof acceptWithClient>[1]): Promise<AcceptedRow> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await setPlatformContext(client, input.tenantId, input.principalId);
    const result = await acceptWithClient(client, input);
    await client.query('COMMIT');
    return result;
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function workerQuery<T extends QueryResultRow>(
  statement: string,
  values: readonly unknown[] = [],
): Promise<readonly T[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL ROLE cpos_async_worker_runtime');
    const result = await client.query<T>(statement, [...values]);
    await client.query('COMMIT');
    return result.rows;
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function claim(lane = 'routine-domain', batch = 1, worker = 'worker-a') {
  return workerQuery<ClaimedRow>(
    `SELECT claimed_job_id::text, claimed_tenant_id::text,
            claimed_async_operation_id::text, claimed_fencing_token::text,
            claimed_attempt_number
     FROM ops.claim_jobs($1, $2, 120, $3)`,
    [lane, worker, batch],
  );
}

async function currentPosition(asyncOperationId: string): Promise<string | undefined> {
  const result = await pool.query<{ effect_position: string }>(
    `SELECT effect_position FROM ops.current_effect_position_v1
     WHERE async_operation_id = $1 AND item_key IS NULL`,
    [asyncOperationId],
  );
  return result.rows[0]?.effect_position;
}

beforeAll(async () => {
  await runMigrations(pool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'b03-async-kernel-integration',
  });
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await pool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name)
     VALUES ($1, 'Tenant A'), ($2, 'Tenant B')`,
    [tenantA, tenantB],
  );
  await pool.query(
    `INSERT INTO platform.principal (
       principal_id, tenant_id, principal_kind, display_name, lifecycle_state
     ) VALUES
       ($1, $2, 'HUMAN', 'Principal A', 'ACTIVE'),
       ($3, $4, 'HUMAN', 'Principal B', 'ACTIVE')`,
    [principalA, tenantA, principalB, tenantB],
  );
});

afterAll(async () => {
  await dropSchema(pool, trackingSchema);
  await pool.end();
});

describe('B03 async/event/publication/reconciliation kernel', () => {
  it('survives crash-before-commit and reuses a committed lost-result identity', async () => {
    const rolledBack = randomUUID();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await setPlatformContext(client, tenantA, principalA);
      await acceptWithClient(client, {
        tenantId: tenantA,
        principalId: principalA,
        logicalId: 'rollback-1',
        operationId: rolledBack,
      });
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
    const absent = await pool.query<{ count: string }>(
      'SELECT count(*)::text AS count FROM ops.async_operation WHERE async_operation_id = $1',
      [rolledBack],
    );
    expect(absent.rows[0]?.count).toBe('0');

    const first = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'lost-1' });
    const duplicate = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'lost-1' });
    expect(first.disposition).toBe('ACCEPTED');
    expect(duplicate.disposition).toBe('DUPLICATE_ACCEPTED');
    expect(duplicate.accepted_async_operation_id).toBe(first.accepted_async_operation_id);
    expect(await currentPosition(first.accepted_async_operation_id)).toBe('ACCEPTED_PRE_EFFECT');
  });

  it('rejects materially changed payload under the same logical/idempotency identity', async () => {
    await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'conflict-1', fingerprint: fpA });
    await expect(
      accept({ tenantId: tenantA, principalId: principalA, logicalId: 'conflict-1', fingerprint: fpB }),
    ).rejects.toThrow(/IDEMPOTENCY_CONFLICT/u);
  });

  it('retries an expired pre-effect lease with the same operation and a newer fence', async () => {
    const operation = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'pre-expiry' });
    const first = (await claim())[0];
    if (!first) throw new Error('first claim missing');
    await pool.query(
      "UPDATE ops.job SET lease_expires_at = clock_timestamp() - interval '1 second' WHERE job_id = $1",
      [first.claimed_job_id],
    );
    const reaped = await workerQuery<{ disposition: string }>(
      "SELECT disposition FROM ops.reap_expired_leases('routine-domain', 10)",
    );
    expect(reaped[0]?.disposition).toBe('SAFE_RETRY_SAME_IDENTITY');
    const second = (await claim())[0];
    expect(second?.claimed_async_operation_id).toBe(operation.accepted_async_operation_id);
    expect(BigInt(second?.claimed_fencing_token ?? '0')).toBeGreaterThan(
      BigInt(first.claimed_fencing_token),
    );
  });

  it('keeps source domain completion separate from publication uncertainty after possible transmission', async () => {
    const source = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'source-effect' });
    const eventId = randomUUID();
    await pool.query(
      `SELECT ops.record_domain_event_once(
         $1, $2, $3, 'test.effect', 'primary', 1, $4,
         '{"authoritative":true}'::jsonb, clock_timestamp()
       )`,
      [eventId, tenantA, source.accepted_async_operation_id, fpA],
    );
    expect(await currentPosition(source.accepted_async_operation_id)).toBe('DOMAIN_EFFECT_ESTABLISHED');

    const publication = await pool.query<{ publication_intent_id: string; publication_async_operation_id: string }>(
      `WITH created AS (
         SELECT ops.record_publication_intent_once(
           $1, $2, $3, 'publication-1', $4, 'map-v1', 'event-v1',
           'disclosure-v1', $5, 'sha256:published-content', 'retry-v1', 4
         ) AS publication_intent_id
       )
       SELECT p.publication_intent_id::text, p.publication_async_operation_id::text
       FROM created c
       JOIN ops.publication_intent p ON p.publication_intent_id = c.publication_intent_id`,
      [randomUUID(), tenantA, eventId, fpB, fpC],
    );
    const publicationRow = publication.rows[0];
    if (!publicationRow) throw new Error('publication intent missing');
    expect(await currentPosition(publicationRow.publication_async_operation_id)).toBe('ACCEPTED_PRE_EFFECT');

    const claimed = (await claim('connector-email', 1, 'mail-worker'))[0];
    if (!claimed) throw new Error('publication job not claimed');
    expect(claimed.claimed_async_operation_id).toBe(publicationRow.publication_async_operation_id);

    await workerQuery(
      `SELECT ops.begin_transport_attempt($1::uuid, $2, $3::bigint, $4::uuid, $5::uuid, $6)`,
      [
        claimed.claimed_job_id,
        'mail-worker',
        claimed.claimed_fencing_token,
        publicationRow.publication_intent_id,
        randomUUID(),
        claimed.claimed_attempt_number,
      ],
    );
    await pool.query(
      "UPDATE ops.job SET lease_expires_at = clock_timestamp() - interval '1 second' WHERE job_id = $1",
      [claimed.claimed_job_id],
    );
    const reaped = await workerQuery<{ disposition: string }>(
      "SELECT disposition FROM ops.reap_expired_leases('connector-email', 10)",
    );
    expect(reaped[0]?.disposition).toBe('RECONCILIATION_REQUIRED');
    expect(await currentPosition(publicationRow.publication_async_operation_id)).toBe('EFFECT_INDETERMINATE');
    expect(await currentPosition(source.accepted_async_operation_id)).toBe('DOMAIN_EFFECT_ESTABLISHED');
    expect((await claim('connector-email', 1, 'mail-worker-2')).length).toBe(0);

    const stale = await workerQuery<{ heartbeat_job: boolean }>(
      'SELECT ops.heartbeat_job($1::uuid, $2, $3::bigint, 120)',
      [claimed.claimed_job_id, 'mail-worker', claimed.claimed_fencing_token],
    );
    expect(stale[0]?.heartbeat_job).toBe(false);
  });

  it('deduplicates domain events and freezes publication/integration representation basis', async () => {
    const source = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'dedup-effect' });
    const eventId = randomUUID();
    const first = await pool.query<{ event_id: string }>(
      `SELECT ops.record_domain_event_once(
         $1, $2, $3, 'test.effect', 'primary', 1, $4, '{}', clock_timestamp()
       )::text AS event_id`,
      [eventId, tenantA, source.accepted_async_operation_id, fpA],
    );
    const duplicate = await pool.query<{ event_id: string }>(
      `SELECT ops.record_domain_event_once(
         $1, $2, $3, 'test.effect', 'primary', 1, $4, '{}', clock_timestamp()
       )::text AS event_id`,
      [randomUUID(), tenantA, source.accepted_async_operation_id, fpA],
    );
    expect(duplicate.rows[0]?.event_id).toBe(first.rows[0]?.event_id);

    const publication = await pool.query<{ publication_id: string }>(
      `SELECT ops.record_publication_intent_once(
         $1, $2, $3, 'publication-dedup', $4, 'map-v1', 'event-v1',
         'disclosure-v1', $5, 'sha256:published-content', 'retry-v1', 4
       )::text AS publication_id`,
      [randomUUID(), tenantA, eventId, fpB, fpC],
    );
    const publicationId = publication.rows[0]?.publication_id;
    if (!publicationId) throw new Error('publication id missing');

    await pool.query(
      `SELECT ops.materialize_integration_event_once(
         $1, $2, $3, 'event-v1', $4, 'sha256:published-content', '{"mapped":true}'::jsonb
       )`,
      [randomUUID(), tenantA, publicationId, fpC],
    );
    await expect(
      pool.query(
        "UPDATE ops.publication_intent SET mapping_version = 'map-v2' WHERE publication_intent_id = $1",
        [publicationId],
      ),
    ).rejects.toThrow(/append-only/u);
    await expect(
      pool.query(
        `SELECT ops.materialize_integration_event_once(
           $1, $2, $3, 'event-v1', $4, 'sha256:other-content', '{}'::jsonb
         )`,
        [randomUUID(), tenantA, publicationId, fpA],
      ),
    ).rejects.toThrow(/immutable publication basis/u);
  });

  it('serializes concurrent lane claims so tenant quota cannot be oversubscribed and preserves fairness', async () => {
    for (let index = 0; index < 2; index += 1) {
      await accept({ tenantId: tenantA, principalId: principalA, logicalId: `quota-a-${index}` });
      await accept({ tenantId: tenantB, principalId: principalB, logicalId: `quota-b-${index}` });
    }
    await pool.query(
      `INSERT INTO ops.tenant_lane_quota (tenant_id, lane, max_inflight, policy_version)
       VALUES ($1, 'routine-domain', 1, 1), ($2, 'routine-domain', 1, 1)`,
      [tenantA, tenantB],
    );

    const [left, right] = await Promise.all([
      claim('routine-domain', 10, 'claim-worker-left'),
      claim('routine-domain', 10, 'claim-worker-right'),
    ]);
    const all = [...left, ...right];
    expect(all).toHaveLength(2);
    expect(new Set(all.map((row) => row.claimed_tenant_id))).toEqual(new Set([tenantA, tenantB]));
    expect((await claim('routine-domain', 10, 'claim-worker-third')).length).toBe(0);
  });

  it('preserves EFFECT_INDETERMINATE when an owner accepts an unresolvable external variance', async () => {
    const operation = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'unresolved' });
    const claimed = (await claim())[0];
    if (!claimed) throw new Error('job not claimed');
    await workerQuery(
      'SELECT ops.mark_effect_boundary_started($1::uuid, $2, $3::bigint)',
      [claimed.claimed_job_id, 'worker-a', claimed.claimed_fencing_token],
    );
    await workerQuery(
      'SELECT ops.record_unknown_effect($1::uuid, $2, $3::bigint, $4)',
      [claimed.claimed_job_id, 'worker-a', claimed.claimed_fencing_token, 'provider history unavailable'],
    );
    await pool.query(
      'SELECT ops.accept_unresolved_external_position($1, $2, $3, $4)',
      [operation.accepted_async_operation_id, tenantA, principalA, 'documented retrieval exhausted'],
    );
    expect(await currentPosition(operation.accepted_async_operation_id)).toBe('EFFECT_INDETERMINATE');
    const occurrence = await pool.query<{ state: string }>(
      `SELECT o.state FROM ops.reconciliation_occurrence o
       JOIN ops.reconciliation_obligation r USING (tenant_id, reconciliation_obligation_id)
       WHERE r.async_operation_id = $1 ORDER BY o.sequence DESC LIMIT 1`,
      [operation.accepted_async_operation_id],
    );
    expect(occurrence.rows[0]?.state).toBe('UNRESOLVED_EXTERNAL_POSITION_ACCEPTED');
  });

  it('keeps tenant-facing status readers FORCE-RLS isolated', async () => {
    const owned = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'rls-a' });
    await accept({ tenantId: tenantB, principalId: principalB, logicalId: 'rls-b' });
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await setPlatformContext(client, tenantA, principalA);
      const rows = await client.query<{ tenant_id: string; async_operation_id: string }>(
        'SELECT tenant_id::text, async_operation_id::text FROM ops.async_operation_status_v1',
      );
      expect(rows.rows).toHaveLength(1);
      expect(rows.rows[0]).toEqual({
        tenant_id: tenantA,
        async_operation_id: owned.accepted_async_operation_id,
      });
      await client.query('COMMIT');
    } catch (error: unknown) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  });

  it('rejects illegal effect-stage rewind', async () => {
    const operation = await accept({ tenantId: tenantA, principalId: principalA, logicalId: 'rewind' });
    await expect(
      pool.query(
        `INSERT INTO ops.effect_position_occurrence (
           tenant_id, async_operation_id, item_key, sequence, effect_position, evidence_basis
         ) VALUES ($1, $2, NULL, 3, 'PRE_ACCEPTANCE', 'illegal rewind')`,
        [tenantA, operation.accepted_async_operation_id],
      ),
    ).rejects.toThrow(/illegal effect transition/u);
  });
});
