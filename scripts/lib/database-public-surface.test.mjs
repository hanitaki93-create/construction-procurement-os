import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  approvedDatabasePersistenceExports,
  approvedDatabasePublicExports,
  inspectDatabasePublicSurface,
} from './database-public-surface.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const publicPath = path.join(repositoryRoot, 'packages/database-core/src/public.ts');
const persistencePath = path.join(repositoryRoot, 'packages/database-core/src/persistence.ts');

async function readPublicSource() {
  return readFile(publicPath, 'utf8');
}

async function readPersistenceSource() {
  return readFile(persistencePath, 'utf8');
}

test('database-core exposes only the approved root and restricted persistence surfaces', async () => {
  assert.deepEqual(approvedDatabasePublicExports, [
    'AppliedMigration',
    'CatalogFinding',
    'CatalogFindingKind',
    'DatabaseExecutionContext',
    'DatabaseExecutionTransactionOptions',
    'DatabaseHealth',
    'DatabaseRuntime',
    'DatabaseRuntimeOptions',
    'ExecutionIsolation',
    'MigrationFile',
    'MigrationResult',
    'MigrationStatus',
    'PersistenceAdapterToken',
    'createDatabaseRuntime',
  ]);
  assert.deepEqual(approvedDatabasePersistenceExports, [
    'PersistenceAdapterToken',
    'SqlBindable',
    'SqlExecutor',
    'SqlStatement',
    'definePersistenceAdapter',
    'sql',
  ]);
  assert.deepEqual(await inspectDatabasePublicSurface({ repositoryRoot }), []);
});

test('database-core root guard rejects a renamed raw pool factory export', async () => {
  const publicSource = await readPublicSource();
  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    publicSourceOverride: `${publicSource}\nexport { createPrivatePool } from './internal/pool.js';\n`,
  });

  assert.match(errors.join('\n'), /received \[.*createPrivatePool/u);
});

test('database-core root guard rejects forbidden types behind approved names', async () => {
  const publicSource = await readPublicSource();
  const mutatedSource = publicSource.replace(
    'export type DatabaseRuntimeOptions = PrivatePoolOptions;',
    'export type DatabaseRuntimeOptions = Pool;',
  );
  assert.notEqual(mutatedSource, publicSource);

  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    publicSourceOverride: mutatedSource,
  });

  assert.match(
    errors.join('\n'),
    /approved export DatabaseRuntimeOptions exposes forbidden type Pool/u,
  );
});

test('database-core root guard rejects unrestricted query methods', async () => {
  const publicSource = await readPublicSource();
  const mutatedSource = publicSource.replace(
    'export interface DatabaseRuntime {',
    'export interface DatabaseRuntime {\n  query(sqlText: string): Promise<unknown>;',
  );
  assert.notEqual(mutatedSource, publicSource);

  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    publicSourceOverride: mutatedSource,
  });

  assert.ok(errors.includes('database-core root public surface exposes an unrestricted query method'));
});

test('restricted persistence surface rejects an extra raw pool export', async () => {
  const persistenceSource = await readPersistenceSource();
  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    persistenceSourceOverride: `${persistenceSource}\nexport type SmuggledPool = import('pg').Pool;\n`,
  });

  assert.match(errors.join('\n'), /received \[.*SmuggledPool/u);
});

test('restricted persistence surface rejects forbidden pg types behind an approved name', async () => {
  const persistenceSource = await readPersistenceSource();
  const mutatedSource = `import type { Pool } from 'pg';\n${persistenceSource.replace(
    'export interface SqlExecutor {',
    'export type SqlExecutor = Pool;\ninterface RemovedSqlExecutor {',
  )}`;
  assert.notEqual(mutatedSource, persistenceSource);

  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    persistenceSourceOverride: mutatedSource,
  });

  assert.match(errors.join('\n'), /approved export SqlExecutor exposes forbidden type Pool/u);
});

test('restricted persistence surface rejects unrestricted query methods', async () => {
  const persistenceSource = await readPersistenceSource();
  const mutatedSource = persistenceSource.replace(
    'export interface SqlExecutor {',
    'export interface SqlExecutor {\n  query(sqlText: string): Promise<unknown>;',
  );
  assert.notEqual(mutatedSource, persistenceSource);

  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    persistenceSourceOverride: mutatedSource,
  });

  assert.ok(
    errors.includes(
      'database-core restricted persistence surface exposes an unrestricted query method',
    ),
  );
});
