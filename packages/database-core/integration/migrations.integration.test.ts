import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterAll, describe, expect, it } from 'vitest';

import {
  MigrationChecksumError,
  migrationStatus,
  runMigrations,
} from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-b01-migration-integration');
const temporaryDirectories: string[] = [];
const schemas: string[] = [];

async function migrationDirectory(files: Readonly<Record<string, string>>): Promise<string> {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cpos-b01-migrations-'));
  temporaryDirectories.push(directory);
  await Promise.all(
    Object.entries(files).map(async ([filename, sql]) =>
      writeFile(path.join(directory, filename), sql),
    ),
  );
  return directory;
}

afterAll(async () => {
  for (const schema of schemas) await dropSchema(pool, schema);
  for (const directory of temporaryDirectories)
    await rm(directory, { recursive: true, force: true });
  await pool.end();
});

describe('SQL-first migration runner', () => {
  it('reports pending, applies once, and remains idempotent', async () => {
    const schema = uniqueSchema('migration_status');
    schemas.push(schema);
    const directory = await migrationDirectory({
      '000001_create_metadata.sql': `CREATE TABLE "${schema}".technical_metadata (id text PRIMARY KEY);`,
    });

    const before = await migrationStatus(pool, { directory, schema });
    expect(before.applied).toHaveLength(0);
    expect(before.pending.map((entry) => entry.id)).toEqual(['000001']);

    const first = await runMigrations(pool, { directory, schema, buildId: 'build-one' });
    expect(first.newlyApplied).toHaveLength(1);
    expect(first.pending).toHaveLength(0);

    const second = await runMigrations(pool, { directory, schema, buildId: 'build-two' });
    expect(second.newlyApplied).toHaveLength(0);
    expect(second.applied[0]?.buildId).toBe('build-one');
  });

  it('rejects checksum drift in applied migration history', async () => {
    const schema = uniqueSchema('migration_checksum');
    schemas.push(schema);
    const directory = await migrationDirectory({
      '000001_create_item.sql': `CREATE TABLE "${schema}".item (id text PRIMARY KEY);`,
    });
    await runMigrations(pool, { directory, schema, buildId: 'checksum-one' });
    await writeFile(
      path.join(directory, '000001_create_item.sql'),
      `CREATE TABLE "${schema}".item (id text PRIMARY KEY, changed text);`,
    );

    await expect(migrationStatus(pool, { directory, schema })).rejects.toBeInstanceOf(
      MigrationChecksumError,
    );
  });

  it('rolls back the full pending batch on migration failure', async () => {
    const schema = uniqueSchema('migration_failure');
    schemas.push(schema);
    const directory = await migrationDirectory({
      '000001_failure.sql': `
        CREATE TABLE "${schema}".must_rollback (id text PRIMARY KEY);
        SELECT definitely_missing_function();
      `,
    });

    await expect(
      runMigrations(pool, { directory, schema, buildId: 'failure-build' }),
    ).rejects.toThrow();
    const exists = await pool.query<{ exists: boolean }>(
      'SELECT to_regclass($1) IS NOT NULL AS exists',
      [`${schema}.must_rollback`],
    );
    expect(exists.rows[0]?.exists).toBe(false);
  });

  it('serializes concurrent migration runners through the advisory lock', async () => {
    const schema = uniqueSchema('migration_concurrent');
    schemas.push(schema);
    const directory = await migrationDirectory({
      '000001_slow.sql': `
        SELECT pg_sleep(0.2);
        CREATE TABLE "${schema}".serialized (id text PRIMARY KEY);
      `,
    });

    const results = await Promise.all([
      runMigrations(pool, { directory, schema, buildId: 'concurrent-a' }),
      runMigrations(pool, { directory, schema, buildId: 'concurrent-b' }),
    ]);
    expect(results.map((entry) => entry.newlyApplied.length).sort()).toEqual([0, 1]);
  });

  it('rebuilds the committed migration set including B02, B03 and V2 Sessions 01-04 from an empty tracking schema', async () => {
    const schema = uniqueSchema('migration_rebuild');
    schemas.push(schema);
    const directory = path.resolve('../../migrations/sql');
    const expected = [
      '000001',
      '000002',
      '000003',
      '000004',
      '000005',
      '000006',
      '000007',
      '000008',
      '000009',
      '000010',
      '000011',
      '000012',
      '000013',
      '000014',
      '000015',
      '000016',
      '000017',
      '000018',
      '000019',
      '000020',
      '000021',
      '000022',
      '000023',
      '000024',
      '000025',
      '000026',
      '000027',
    ];
    const first = await runMigrations(pool, {
      directory,
      schema,
      buildId: 'rebuild-one',
    });
    expect(first.newlyApplied.map((entry) => entry.id)).toEqual(expected);

    const slotOverlapConstraint = await pool.query<{
      contype: string;
      convalidated: boolean;
      definition: string;
    }>(`
      SELECT
        contype,
        convalidated,
        pg_get_constraintdef(oid) AS definition
      FROM pg_constraint
      WHERE conrelid = 'platform.tenant_subscription_item_version'::regclass
        AND conname = 'tenant_subscription_item_version_current_slot_overlap_excl'
    `);
    expect(slotOverlapConstraint.rows).toHaveLength(1);
    expect(slotOverlapConstraint.rows[0]?.contype).toBe('x');
    expect(slotOverlapConstraint.rows[0]?.convalidated).toBe(true);
    expect(slotOverlapConstraint.rows[0]?.definition).toContain('EXCLUDE USING gist');
    expect(slotOverlapConstraint.rows[0]?.definition).toContain('effective_period WITH &&');
    expect(slotOverlapConstraint.rows[0]?.definition).toContain('superseded_at IS NULL');

    const confirmedBasisTables = await pool.query<{ readonly count: string }>(`
      SELECT count(*)::text AS count
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'procurement'
        AND c.relname IN ('bid_comparison_confirmed_basis', 'bid_comparison_snapshot_confirmed_basis')
        AND c.relkind = 'r'
    `);
    expect(confirmedBasisTables.rows[0]?.count).toBe('2');

    const r07Authority = await pool.query<{
      readonly approval_policy_count: string;
      readonly decision_table_count: string;
      readonly runtime_direct_dml_count: string;
    }>(`
      SELECT
        (SELECT count(*)::text
         FROM platform.approval_policy_version
         WHERE policy_key = 'UAE_CONTRACTOR_PROCUREMENT_DOA_STARTER'
           AND version = 1
           AND subject_type = 'PROCUREMENT_RECOMMENDATION') AS approval_policy_count,
        (SELECT count(*)::text
         FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE (n.nspname, c.relname) IN (
           ('platform', 'approval_case'),
           ('platform', 'approval_action_occurrence'),
           ('procurement', 'award_recommendation'),
           ('procurement', 'award_recommendation_selection'),
           ('procurement', 'award_recommendation_route_basis'),
           ('procurement', 'award_decision'),
           ('procurement', 'award_decision_supplier_basis'),
           ('procurement', 'award_decision_route_basis'),
           ('procurement', 'award_decision_condition'),
           ('procurement', 'award_condition_satisfaction_occurrence')
         ) AND c.relkind = 'r') AS decision_table_count,
        (SELECT count(*)::text
         FROM (VALUES
           ('platform.approval_case'),
           ('platform.approval_action_occurrence'),
           ('procurement.award_recommendation'),
           ('procurement.award_recommendation_selection'),
           ('procurement.award_recommendation_route_basis'),
           ('procurement.award_decision'),
           ('procurement.award_decision_supplier_basis'),
           ('procurement.award_decision_route_basis'),
           ('procurement.award_decision_condition'),
           ('procurement.award_condition_satisfaction_occurrence')
         ) AS guarded(table_name)
         WHERE has_table_privilege('cpos_platform_runtime', guarded.table_name, 'INSERT')
            OR has_table_privilege('cpos_platform_runtime', guarded.table_name, 'UPDATE')
            OR has_table_privilege('cpos_platform_runtime', guarded.table_name, 'DELETE')) AS runtime_direct_dml_count
    `);
    expect(r07Authority.rows[0]).toEqual({
      approval_policy_count: '1',
      decision_table_count: '10',
      runtime_direct_dml_count: '0',
    });

    await dropSchema(pool, schema);
    const second = await runMigrations(pool, {
      directory,
      schema,
      buildId: 'rebuild-two',
    });
    expect(second.newlyApplied.map((entry) => entry.id)).toEqual(expected);
  });
});