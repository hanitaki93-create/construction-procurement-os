import { afterAll, describe, expect, it } from 'vitest';

import { createDatabaseRuntime } from '../src/public.js';
import { withPrivateTransaction } from '../src/internal/transaction.js';
import { createIntegrationPool, requiredDatabaseUrl } from './test-support.js';

const pool = createIntegrationPool('cpos-b01-database-integration');
const runtime = createDatabaseRuntime({
  connectionString: requiredDatabaseUrl(),
  maximumConnections: 4,
  idleTimeoutMs: 1_000,
  connectionTimeoutMs: 5_000,
  statementTimeoutMs: 20_000,
  applicationName: 'cpos-b01-runtime-integration',
});

afterAll(async () => {
  await runtime.close();
  await pool.end();
});

describe('database runtime foundation', () => {
  it('connects to PostgreSQL 18 and exposes only approved bounded capabilities', async () => {
    const health = await runtime.health();
    if (health.state !== 'ok') {
      throw new Error(`expected healthy database: ${health.detail}`);
    }
    expect(health.serverVersion).toMatch(/^18\./u);
    expect(Object.keys(runtime).sort()).toEqual([
      'close',
      'health',
      'migrate',
      'migrationStatus',
      'scanCatalog',
      'withBootstrapContext',
      'withExecutionContext',
    ]);
    expect('query' in runtime).toBe(false);
  });

  it.each(['READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'] as const)(
    'honours explicit %s isolation before callback SQL',
    async (isolation) => {
      const observed = await withPrivateTransaction(
        pool,
        { isolation, logicalIdentity: `isolation-${isolation}` },
        async (transaction) => {
          const result = await transaction.query<{ transaction_isolation: string }>(
            "SELECT current_setting('transaction_isolation') AS transaction_isolation",
          );
          return result.rows[0]?.transaction_isolation.toUpperCase();
        },
      );
      expect(observed).toBe(isolation);
    },
  );

  it('round-trips numeric(38,18) and int8 beyond IEEE-754 as strings', async () => {
    const result = await pool.query<{
      amount: string;
      rate: string;
      counter: string;
    }>(`
      SELECT
        9007199254740993.123456789012::numeric(38,12) AS amount,
        0.123456789012345678::numeric(38,18) AS rate,
        9007199254740993123::int8 AS counter
    `);
    expect(result.rows[0]).toEqual({
      amount: '9007199254740993.123456789012',
      rate: '0.123456789012345678',
      counter: '9007199254740993123',
    });
    expect(typeof result.rows[0]?.amount).toBe('string');
    expect(typeof result.rows[0]?.counter).toBe('string');
  });

  it('requires explicit logical identity and bounded retry configuration', async () => {
    await expect(
      withPrivateTransaction(
        pool,
        { isolation: 'READ COMMITTED', logicalIdentity: '' },
        async () => 'unreachable',
      ),
    ).rejects.toThrow(/logicalIdentity/u);
    await expect(
      withPrivateTransaction(
        pool,
        {
          isolation: 'READ COMMITTED',
          logicalIdentity: 'invalid-retry',
          preEffectSafeRetryMaximum: 4,
        },
        async () => 'unreachable',
      ),
    ).rejects.toThrow(/0 to 3/u);
  });
});
