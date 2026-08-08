import { describe, expect, it } from 'vitest';

import { definePersistenceAdapter, sql } from './persistence.js';
import {
  assertPersistenceSqlIsBounded,
  createTransactionSqlExecutor,
  deactivateTransactionSqlExecutor,
  resolvePersistenceAdapter,
} from './internal/persistence-registry.js';
import type { PrivateTransaction } from './internal/transaction.js';

function fakeTransaction(): PrivateTransaction {
  return {
    isolation: 'READ COMMITTED',
    query: async <Row extends Record<string, unknown>>(
      text: string,
      values: readonly unknown[] = [],
    ) => {
      return {
        command: text.trim().split(/\s+/u)[0]?.toUpperCase() ?? '',
        rowCount: 1,
        oid: 0,
        fields: [],
        rows: [{ text, values }] as unknown as Row[],
      };
    },
  };
}

describe('restricted persistence SQL', () => {
  it('parameterizes every interpolation and keeps dynamic values out of SQL text', () => {
    const hostileValue = "tenant'; SET ROLE postgres; --";
    const statement = sql`SELECT tenant_id FROM platform.tenant WHERE tenant_id = ${hostileValue}`;

    expect(statement.text).toBe(
      'SELECT tenant_id FROM platform.tenant WHERE tenant_id = $1',
    );
    expect(statement.values).toEqual([hostileValue]);
    expect(() => assertPersistenceSqlIsBounded(statement.text)).not.toThrow();
  });

  it.each([
    'SET LOCAL cpos.tenant_id = \'other\'',
    "SELECT set_config('cpos.tenant_id', 'other', true)",
    "SELECT pg_catalog.set_config('cpos.tenant_id', 'other', true)",
    'SELECT /* evade */ set_config(\'x\', \'y\', true)',
    'SELECT "set_config"(\'x\', \'y\', true)',
    'RESET ALL',
    'DISCARD ALL',
    'CREATE TABLE attack(id int)',
    'ALTER TABLE platform.tenant DISABLE ROW LEVEL SECURITY',
    'DROP TABLE platform.tenant',
    'GRANT ALL ON platform.tenant TO public',
    'REVOKE ALL ON platform.tenant FROM public',
    'CALL attack()',
    'DO $$ BEGIN RAISE NOTICE \'x\'; END $$',
    'COPY platform.tenant TO STDOUT',
    'SELECT 1; SELECT 2',
  ])('rejects context mutation, DDL or multiple statements: %s', (text) => {
    expect(() => assertPersistenceSqlIsBounded(text)).toThrow();
  });

  it('ignores forbidden words that occur only inside literals/comments', () => {
    expect(() =>
      assertPersistenceSqlIsBounded(
        "SELECT 'set_config SET ROLE' AS harmless /* DROP TABLE hidden */",
      ),
    ).not.toThrow();
    expect(() =>
      assertPersistenceSqlIsBounded('SELECT $$set_config SET ROLE$$ AS harmless'),
    ).not.toThrow();
  });

  it.each([
    'SELECT tenant_id FROM platform.tenant WHERE tenant_id = $1',
    'INSERT INTO platform.tenant(id) VALUES ($1)',
    'UPDATE platform.tenant SET version = version + 1 WHERE id = $1',
    'DELETE FROM platform.tenant WHERE id = $1',
    'WITH selected AS (SELECT $1::text AS value) SELECT value FROM selected',
  ])('allows one bounded DML/read statement: %s', (text) => {
    expect(() => assertPersistenceSqlIsBounded(text)).not.toThrow();
  });
});

describe('opaque persistence adapter', () => {
  it('keeps the executor behind the adapter registry and returns only the declared handle', async () => {
    interface Handle {
      readTenant(tenantId: string): Promise<readonly Record<string, unknown>[]>;
    }

    const token = definePersistenceAdapter<Handle>({
      moduleKey: 'platform',
      databaseRole: 'cpos_platform_runtime',
      buildHandle: (executor) => ({
        readTenant: (tenantId) =>
          executor.all(sql`SELECT tenant_id FROM platform.tenant WHERE tenant_id = ${tenantId}`),
      }),
    });

    expect(Object.keys(token).sort()).toEqual(['databaseRole', 'moduleKey']);
    const definition = resolvePersistenceAdapter<Handle>(token);
    const executor = createTransactionSqlExecutor(fakeTransaction());
    const handle = definition.buildHandle(executor);

    await expect(handle.readTenant('tenant-1')).resolves.toHaveLength(1);
    expect('query' in (handle as object)).toBe(false);
    expect('execute' in (handle as object)).toBe(false);

    deactivateTransactionSqlExecutor(executor);
    await expect(handle.readTenant('tenant-1')).rejects.toThrow(/no longer active/u);
  });

  it('rejects unsafe module and role identifiers before registration', () => {
    expect(() =>
      definePersistenceAdapter({
        moduleKey: 'platform;drop',
        databaseRole: 'cpos_platform_runtime',
        buildHandle: () => ({}),
      }),
    ).toThrow(/moduleKey/u);

    expect(() =>
      definePersistenceAdapter({
        moduleKey: 'platform',
        databaseRole: 'cpos_platform_runtime;set role postgres',
        buildHandle: () => ({}),
      }),
    ).toThrow(/databaseRole/u);
  });
});
