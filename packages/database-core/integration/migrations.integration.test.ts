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

  it('rebuilds the committed migration set including B02 C1/C2 from an empty tracking schema', async () => {
    const schema = uniqueSchema('migration_rebuild');
    schemas.push(schema);
    const directory = path.resolve('../../migrations/sql');
    const expected = ['000001', '000002', '000003', '000004'];
    const first = await runMigrations(pool, { directory, schema, buildId: 'rebuild-one' });
    expect(first.newlyApplied.map((entry) => entry.id)).toEqual(expected);
    await dropSchema(pool, schema);
    const second = await runMigrations(pool, { directory, schema, buildId: 'rebuild-two' });
    expect(second.newlyApplied.map((entry) => entry.id)).toEqual(expected);
  });
});
