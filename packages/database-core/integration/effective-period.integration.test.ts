import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { TransactionConflictError, withPrivateTransaction } from '../src/internal/transaction.js';
import { createBarrier, createIntegrationPool, databaseErrorCode, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-b01-effective-period-integration');
const schema = uniqueSchema('testkit_effective');
const q = (name: string): string => `"${schema}"."${name}"`;

beforeAll(async () => {
  await pool.query('CREATE EXTENSION IF NOT EXISTS btree_gist');
  await pool.query(`CREATE SCHEMA "${schema}"`);
  await pool.query(`CREATE TABLE ${q('plain')} (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    scope_key text NOT NULL,
    effective_range tstzrange NOT NULL
  )`);
  await pool.query(`CREATE TABLE ${q('excluded')} (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    scope_key text NOT NULL,
    effective_range tstzrange NOT NULL,
    EXCLUDE USING gist (scope_key WITH =, effective_range WITH &&)
  )`);
  await pool.query(`CREATE TABLE ${q('predicate')} (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    scope_key text NOT NULL,
    start_at timestamptz NOT NULL,
    end_at timestamptz NOT NULL,
    CHECK (start_at < end_at)
  )`);
});

afterAll(async () => {
  await dropSchema(pool, schema);
  await pool.end();
});

async function rowCount(table: string): Promise<number> {
  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*)::int8 AS count FROM ${q(table)}`,
  );
  return Number(result.rows[0]?.count ?? '0');
}

describe('effective-period non-overlap foundation', () => {
  it('reproduces overlap under unprotected READ COMMITTED', async () => {
    const barrier = createBarrier(2);
    const insert = async (identity: string, start: string, end: string) =>
      withPrivateTransaction(pool, { isolation: 'READ COMMITTED', logicalIdentity: identity }, async (transaction) => {
        const prior = await transaction.query<{ count: string }>(
          `SELECT COUNT(*)::int8 AS count FROM ${q('plain')}
           WHERE scope_key = 'scope'
             AND effective_range && tstzrange($1::timestamptz, $2::timestamptz, '[)')`,
          [start, end],
        );
        expect(prior.rows[0]?.count).toBe('0');
        await barrier.arriveAndWait();
        await transaction.query(
          `INSERT INTO ${q('plain')} (scope_key, effective_range)
           VALUES ('scope', tstzrange($1::timestamptz, $2::timestamptz, '[)'))`,
          [start, end],
        );
      });

    await Promise.all([
      insert('period-rc-a', '2026-08-01T00:00:00Z', '2026-09-01T00:00:00Z'),
      insert('period-rc-b', '2026-08-15T00:00:00Z', '2026-09-15T00:00:00Z'),
    ]);
    expect(await rowCount('plain')).toBe(2);
  });

  it('rejects concurrent overlap with a GiST exclusion constraint', async () => {
    const barrier = createBarrier(2);
    const insert = async (identity: string, start: string, end: string) =>
      withPrivateTransaction(pool, { isolation: 'READ COMMITTED', logicalIdentity: identity }, async (transaction) => {
        await barrier.arriveAndWait();
        await transaction.query(
          `INSERT INTO ${q('excluded')} (scope_key, effective_range)
           VALUES ('scope', tstzrange($1::timestamptz, $2::timestamptz, '[)'))`,
          [start, end],
        );
      });

    const settled = await Promise.allSettled([
      insert('period-cc3-a', '2026-08-01T00:00:00Z', '2026-09-01T00:00:00Z'),
      insert('period-cc3-b', '2026-08-15T00:00:00Z', '2026-09-15T00:00:00Z'),
    ]);
    expect(settled.filter((entry) => entry.status === 'fulfilled')).toHaveLength(1);
    const rejected = settled.find((entry) => entry.status === 'rejected');
    if (rejected?.status === 'rejected') expect(databaseErrorCode(rejected.reason)).toBe('23P01');
    expect(await rowCount('excluded')).toBe(1);
  });

  it('uses SERIALIZABLE for an application-normalized temporal predicate', async () => {
    const barrier = createBarrier(2);
    const insert = async (identity: string, start: string, end: string) =>
      withPrivateTransaction(pool, { isolation: 'SERIALIZABLE', logicalIdentity: identity }, async (transaction) => {
        const prior = await transaction.query<{ count: string }>(
          `SELECT COUNT(*)::int8 AS count FROM ${q('predicate')}
           WHERE scope_key = 'application-normalized'
             AND start_at < $2::timestamptz
             AND end_at > $1::timestamptz`,
          [start, end],
        );
        expect(prior.rows[0]?.count).toBe('0');
        await barrier.arriveAndWait();
        await transaction.query(
          `INSERT INTO ${q('predicate')} (scope_key, start_at, end_at)
           VALUES ('application-normalized', $1::timestamptz, $2::timestamptz)`,
          [start, end],
        );
      });

    const settled = await Promise.allSettled([
      insert('period-cc4-a', '2026-08-01T00:00:00Z', '2026-09-01T00:00:00Z'),
      insert('period-cc4-b', '2026-08-15T00:00:00Z', '2026-09-15T00:00:00Z'),
    ]);
    expect(settled.filter((entry) => entry.status === 'fulfilled')).toHaveLength(1);
    const rejected = settled.find((entry) => entry.status === 'rejected');
    if (rejected?.status === 'rejected') {
      expect(rejected.reason).toBeInstanceOf(TransactionConflictError);
    }
    expect(await rowCount('predicate')).toBe(1);
  });
});
