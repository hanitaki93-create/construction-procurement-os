import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import type { Pool, PoolClient } from 'pg';

const migrationFilename = /^(\d{6})_([a-z0-9_]+)\.sql$/u;
const identifier = /^[a-z][a-z0-9_]{0,62}$/u;
const advisoryLockKey = '574461836214172321';

export interface MigrationFile {
  readonly id: string;
  readonly name: string;
  readonly filename: string;
  readonly checksum: string;
  readonly sql: string;
}

export interface AppliedMigration {
  readonly id: string;
  readonly name: string;
  readonly checksum: string;
  readonly appliedAt: string;
  readonly buildId: string;
}

export interface MigrationStatus {
  readonly applied: readonly AppliedMigration[];
  readonly pending: readonly MigrationFile[];
}

export interface MigrationResult extends MigrationStatus {
  readonly newlyApplied: readonly AppliedMigration[];
}

export class MigrationChecksumError extends Error {
  public constructor(public readonly migrationId: string) {
    super(`migration ${migrationId} checksum does not match applied history`);
    this.name = 'MigrationChecksumError';
  }
}

function quoteIdentifier(value: string): string {
  if (!identifier.test(value)) throw new Error(`unsafe SQL identifier ${value}`);
  return `"${value}"`;
}

function checksum(sql: string): string {
  return createHash('sha256').update(sql, 'utf8').digest('hex');
}

export async function readMigrationFiles(directory: string): Promise<readonly MigrationFile[]> {
  const entries = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && migrationFilename.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  const files: MigrationFile[] = [];
  const seenIds = new Set<string>();

  for (const filename of entries) {
    const match = migrationFilename.exec(filename);
    if (!match) continue;
    const id = match[1];
    const name = match[2];
    if (id === undefined || name === undefined)
      throw new Error(`invalid migration filename ${filename}`);
    if (seenIds.has(id)) throw new Error(`duplicate migration ID ${id}`);
    seenIds.add(id);
    const sql = await readFile(path.join(directory, filename), 'utf8');
    files.push({ id, name, filename, checksum: checksum(sql), sql });
  }

  return files;
}

async function tableExists(client: PoolClient, schema: string): Promise<boolean> {
  const result = await client.query<{ exists: boolean }>(
    'SELECT to_regclass($1) IS NOT NULL AS exists',
    [`${schema}.schema_migration`],
  );
  return result.rows[0]?.exists === true;
}

async function appliedMigrations(
  client: PoolClient,
  schema: string,
): Promise<readonly AppliedMigration[]> {
  if (!(await tableExists(client, schema))) return [];
  const qualified = `${quoteIdentifier(schema)}.${quoteIdentifier('schema_migration')}`;
  const result = await client.query<{
    id: string;
    name: string;
    checksum: string;
    applied_at: Date;
    build_id: string;
  }>(`SELECT id, name, checksum, applied_at, build_id FROM ${qualified} ORDER BY id`);
  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    checksum: row.checksum,
    appliedAt: row.applied_at.toISOString(),
    buildId: row.build_id,
  }));
}

function compareStatus(
  files: readonly MigrationFile[],
  applied: readonly AppliedMigration[],
): MigrationStatus {
  const appliedById = new Map(applied.map((entry) => [entry.id, entry]));
  for (const file of files) {
    const existing = appliedById.get(file.id);
    if (existing && existing.checksum !== file.checksum) throw new MigrationChecksumError(file.id);
  }
  return { applied, pending: files.filter((file) => !appliedById.has(file.id)) };
}

export async function migrationStatus(
  pool: Pool,
  options: { readonly directory: string; readonly schema?: string },
): Promise<MigrationStatus> {
  const schema = options.schema ?? 'cpos_technical';
  quoteIdentifier(schema);
  const files = await readMigrationFiles(options.directory);
  const client = await pool.connect();
  try {
    return compareStatus(files, await appliedMigrations(client, schema));
  } finally {
    client.release();
  }
}

export async function runMigrations(
  pool: Pool,
  options: {
    readonly directory: string;
    readonly buildId: string;
    readonly schema?: string;
  },
): Promise<MigrationResult> {
  if (!options.buildId.trim()) throw new Error('migration buildId is required');
  const schema = options.schema ?? 'cpos_technical';
  const quotedSchema = quoteIdentifier(schema);
  const qualified = `${quotedSchema}.${quoteIdentifier('schema_migration')}`;
  const files = await readMigrationFiles(options.directory);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock($1::bigint)', [advisoryLockKey]);
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${quotedSchema}`);
    await client.query(`SET LOCAL search_path TO ${quotedSchema}, pg_catalog`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${qualified} (
        id text PRIMARY KEY,
        name text NOT NULL,
        checksum text NOT NULL,
        applied_at timestamptz NOT NULL DEFAULT clock_timestamp(),
        build_id text NOT NULL
      )
    `);

    const before = compareStatus(files, await appliedMigrations(client, schema));
    const newlyApplied: AppliedMigration[] = [];

    for (const migration of before.pending) {
      await client.query(migration.sql);
      const inserted = await client.query<{ applied_at: Date }>(
        `INSERT INTO ${qualified} (id, name, checksum, build_id)
         VALUES ($1, $2, $3, $4)
         RETURNING applied_at`,
        [migration.id, migration.name, migration.checksum, options.buildId],
      );
      const appliedAt = inserted.rows[0]?.applied_at;
      if (!appliedAt) throw new Error(`migration ${migration.id} did not return applied_at`);
      newlyApplied.push({
        id: migration.id,
        name: migration.name,
        checksum: migration.checksum,
        appliedAt: appliedAt.toISOString(),
        buildId: options.buildId,
      });
    }

    await client.query('COMMIT');
    const after = compareStatus(files, await appliedMigrations(client, schema));
    return { ...after, newlyApplied };
  } catch (error: unknown) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // Preserve the migration failure.
    }
    throw error;
  } finally {
    client.release();
  }
}
