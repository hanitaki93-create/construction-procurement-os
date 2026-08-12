import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { TransactionConflictError, withPrivateTransaction } from '../src/internal/transaction.js';
import {
  createBarrier,
  createIntegrationPool,
  databaseErrorCode,
  dropSchema,
  uniqueSchema,
} from './test-support.js';

const pool = createIntegrationPool('cpos-b01-concurrency-integration');
const schema = uniqueSchema('testkit_concurrency');
const q = (name: string): string => `"${schema}"."${name}"`;

async function resetAllocation(): Promise<void> {
  await pool.query(`TRUNCATE ${q('consumption')}`);
  await pool.query(`INSERT INTO ${q('consumption')} (amount) VALUES (60)`);
}

async function totalConsumption(): Promise<number> {
  const result = await pool.query<{ total: number }>(
    `SELECT COALESCE(SUM(amount), 0)::int AS total FROM ${q('consumption')}`,
  );
  return result.rows[0]?.total ?? 0;
}

beforeAll(async () => {
  await pool.query('CREATE EXTENSION IF NOT EXISTS btree_gist');
  await pool.query(`CREATE SCHEMA "${schema}"`);
  await pool.query(`CREATE TABLE ${q('basis')} (id int PRIMARY KEY, capacity int NOT NULL)`);
  await pool.query(
    `CREATE TABLE ${q('consumption')} (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, amount int NOT NULL)`,
  );
  await pool.query(`CREATE TABLE ${q('guard')} (guard_key text PRIMARY KEY)`);
  await pool.query(`INSERT INTO ${q('basis')} (id, capacity) VALUES (1, 100)`);
  await resetAllocation();
});

afterAll(async () => {
  await dropSchema(pool, schema);
  await pool.end();
});

describe('cross-row concurrency foundation', () => {
  it('reproduces aggregate write skew under unprotected READ COMMITTED', async () => {
    await resetAllocation();
    const barrier = createBarrier(2);
    const allocate = async (amount: number, identity: string) =>
      withPrivateTransaction(
        pool,
        { isolation: 'READ COMMITTED', logicalIdentity: identity },
        async (transaction) => {
          const result = await transaction.query<{ remaining: number }>(`
            SELECT b.capacity - COALESCE(SUM(c.amount), 0)::int AS remaining
            FROM ${q('basis')} b
            LEFT JOIN ${q('consumption')} c ON true
            WHERE b.id = 1
            GROUP BY b.capacity
          `);
          expect(result.rows[0]?.remaining).toBe(40);
          await barrier.arriveAndWait();
          await transaction.query(`INSERT INTO ${q('consumption')} (amount) VALUES ($1)`, [amount]);
        },
      );

    await Promise.all([allocate(30, 'unprotected-a'), allocate(20, 'unprotected-b')]);
    expect(await totalConsumption()).toBe(110);
  });

  it('serializes allocation through an existing guard row and recomputes under lock', async () => {
    await resetAllocation();
    let releaseFirst: (() => void) | undefined;
    const firstLocked = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });

    const first = withPrivateTransaction(
      pool,
      { isolation: 'READ COMMITTED', logicalIdentity: 'guarded-a' },
      async (transaction) => {
        await transaction.query(`SELECT id FROM ${q('basis')} WHERE id = 1 FOR UPDATE`);
        releaseFirst?.();
        const remaining = await transaction.query<{ remaining: number }>(`
          SELECT b.capacity - COALESCE(SUM(c.amount), 0)::int AS remaining
          FROM ${q('basis')} b
          LEFT JOIN ${q('consumption')} c ON true
          WHERE b.id = 1
          GROUP BY b.capacity
        `);
        expect(remaining.rows[0]?.remaining).toBe(40);
        await transaction.query(`INSERT INTO ${q('consumption')} (amount) VALUES (30)`);
        await new Promise((resolve) => setTimeout(resolve, 150));
      },
    );

    await firstLocked;
    const second = withPrivateTransaction(
      pool,
      { isolation: 'READ COMMITTED', logicalIdentity: 'guarded-b' },
      async (transaction) => {
        await transaction.query(`SELECT id FROM ${q('basis')} WHERE id = 1 FOR UPDATE`);
        const remaining = await transaction.query<{ remaining: number }>(`
          SELECT b.capacity - COALESCE(SUM(c.amount), 0)::int AS remaining
          FROM ${q('basis')} b
          LEFT JOIN ${q('consumption')} c ON true
          WHERE b.id = 1
          GROUP BY b.capacity
        `);
        if ((remaining.rows[0]?.remaining ?? 0) < 20)
          throw new Error('ALLOCATION_CONSERVATION_CONFLICT');
        await transaction.query(`INSERT INTO ${q('consumption')} (amount) VALUES (20)`);
      },
    );

    const settled = await Promise.allSettled([first, second]);
    expect(settled[0]?.status).toBe('fulfilled');
    expect(settled[1]?.status).toBe('rejected');
    expect(await totalConsumption()).toBe(90);
  });

  it('preserves the aggregate under SERIALIZABLE and returns a typed conflict', async () => {
    await resetAllocation();
    const barrier = createBarrier(2);
    const allocate = async (amount: number, identity: string) =>
      withPrivateTransaction(
        pool,
        { isolation: 'SERIALIZABLE', logicalIdentity: identity },
        async (transaction) => {
          await transaction.query(`
            SELECT b.capacity - COALESCE(SUM(c.amount), 0)::int AS remaining
            FROM ${q('basis')} b
            LEFT JOIN ${q('consumption')} c ON true
            WHERE b.id = 1
            GROUP BY b.capacity
          `);
          await barrier.arriveAndWait();
          await transaction.query(`INSERT INTO ${q('consumption')} (amount) VALUES ($1)`, [amount]);
        },
      );

    const settled = await Promise.allSettled([
      allocate(30, 'serializable-a'),
      allocate(20, 'serializable-b'),
    ]);
    expect(settled.filter((entry) => entry.status === 'fulfilled')).toHaveLength(1);
    const rejected = settled.find((entry) => entry.status === 'rejected');
    expect(rejected?.status).toBe('rejected');
    if (rejected?.status === 'rejected') {
      expect(rejected.reason).toBeInstanceOf(TransactionConflictError);
    }
    expect(await totalConsumption()).toBeLessThanOrEqual(90);
  });

  it('proves a missing row SELECT FOR UPDATE protects nothing', async () => {
    const result = await withPrivateTransaction(
      pool,
      { isolation: 'READ COMMITTED', logicalIdentity: 'missing-guard' },
      async (transaction) =>
        transaction.query(
          `SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'absent' FOR UPDATE`,
        ),
    );
    expect(result.rowCount).toBe(0);
  });

  it('materializes one lazy guard before locking', async () => {
    await pool.query(`TRUNCATE ${q('guard')}`);
    const createAndLock = async (identity: string) =>
      withPrivateTransaction(
        pool,
        { isolation: 'READ COMMITTED', logicalIdentity: identity },
        async (transaction) => {
          await transaction.query(
            `INSERT INTO ${q('guard')} (guard_key) VALUES ('shared') ON CONFLICT DO NOTHING`,
          );
          const locked = await transaction.query(
            `SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'shared' FOR UPDATE`,
          );
          expect(locked.rowCount).toBe(1);
        },
      );
    await Promise.all([createAndLock('lazy-guard-a'), createAndLock('lazy-guard-b')]);
    const count = await pool.query<{ count: string }>(
      `SELECT COUNT(*)::int8 AS count FROM ${q('guard')}`,
    );
    expect(count.rows[0]?.count).toBe('1');
  });

  it('detects reversed multi-guard acquisition while canonical order completes', async () => {
    await pool.query(`TRUNCATE ${q('guard')}`);
    await pool.query(`INSERT INTO ${q('guard')} (guard_key) VALUES ('a'), ('b')`);

    const ordered = async (identity: string) =>
      withPrivateTransaction(
        pool,
        { isolation: 'READ COMMITTED', logicalIdentity: identity },
        async (transaction) => {
          await transaction.query(
            `SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'a' FOR UPDATE`,
          );
          await transaction.query(
            `SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'b' FOR UPDATE`,
          );
        },
      );
    await expect(Promise.all([ordered('ordered-a'), ordered('ordered-b')])).resolves.toBeDefined();

    const left = await pool.connect();
    const right = await pool.connect();
    const barrier = createBarrier(2);
    try {
      await Promise.all([left.query('BEGIN'), right.query('BEGIN')]);
      await Promise.all([
        left.query(`SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'a' FOR UPDATE`),
        right.query(`SELECT guard_key FROM ${q('guard')} WHERE guard_key = 'b' FOR UPDATE`),
      ]);
      const opposite = async (client: typeof left, key: 'a' | 'b') => {
        await barrier.arriveAndWait();
        return client.query(
          `SELECT guard_key FROM ${q('guard')} WHERE guard_key = '${key}' FOR UPDATE`,
        );
      };
      const settled = await Promise.allSettled([opposite(left, 'b'), opposite(right, 'a')]);
      expect(
        settled.some(
          (entry) => entry.status === 'rejected' && databaseErrorCode(entry.reason) === '40P01',
        ),
      ).toBe(true);
    } finally {
      await Promise.allSettled([left.query('ROLLBACK'), right.query('ROLLBACK')]);
      left.release();
      right.release();
    }
  });
});
