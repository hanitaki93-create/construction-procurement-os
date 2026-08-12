import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { scanDatabaseCatalog } from '../src/internal/catalog-scan.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-b01-catalog-integration');
const schema = uniqueSchema('cpos_security');
const unsafeRole = `cpos_unsafe_${schema.slice(-12)}`;

beforeAll(async () => {
  await pool.query(`CREATE SCHEMA "${schema}"`);
});

afterAll(async () => {
  await pool.query(`DROP ROLE IF EXISTS "${unsafeRole}"`);
  await dropSchema(pool, schema);
  await pool.end();
});

describe('database catalog security scan', () => {
  it('returns no findings for clean CPOS-owned technical objects', async () => {
    expect(await scanDatabaseCatalog(pool)).toEqual([]);
  });

  it('detects SECURITY DEFINER and execution-context mutation', async () => {
    await pool.query(`
      CREATE FUNCTION "${schema}".unsafe_context_change()
      RETURNS text
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        PERFORM set_config('cpos.tenant', 'other-tenant', true);
        RETURN 'unsafe';
      END;
      $$
    `);

    const findings = await scanDatabaseCatalog(pool);
    const kinds = findings.map((entry) => entry.kind);
    expect(kinds).toContain('SECURITY_DEFINER');
    expect(kinds).toContain('CONTEXT_MUTATION');

    await pool.query(`DROP FUNCTION "${schema}".unsafe_context_change()`);
    expect(await scanDatabaseCatalog(pool)).toEqual([]);
  });

  it('detects a CPOS role with BYPASSRLS', async () => {
    await pool.query(`CREATE ROLE "${unsafeRole}" NOLOGIN BYPASSRLS`);
    const findings = await scanDatabaseCatalog(pool);
    expect(findings).toContainEqual({
      kind: 'BYPASS_RLS_ROLE',
      identity: unsafeRole,
      detail: 'CPOS runtime roles may not have BYPASSRLS',
    });
    await pool.query(`DROP ROLE "${unsafeRole}"`);
    expect(await scanDatabaseCatalog(pool)).toEqual([]);
  });
});
