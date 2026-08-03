import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  approvedDatabasePublicExports,
  inspectDatabasePublicSurface,
} from './database-public-surface.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const publicPath = path.join(repositoryRoot, 'packages/database-core/src/public.ts');

async function readPublicSource() {
  return readFile(publicPath, 'utf8');
}

test('database-core package exposes exactly the approved technical runtime surface', async () => {
  assert.deepEqual(approvedDatabasePublicExports, [
    'AppliedMigration',
    'CatalogFinding',
    'CatalogFindingKind',
    'DatabaseHealth',
    'DatabaseRuntime',
    'DatabaseRuntimeOptions',
    'MigrationFile',
    'MigrationResult',
    'MigrationStatus',
    'createDatabaseRuntime',
  ]);
  assert.deepEqual(await inspectDatabasePublicSurface({ repositoryRoot }), []);
});

test('database-core public-surface guard rejects a renamed raw pool factory export', async () => {
  const publicSource = await readPublicSource();
  const errors = await inspectDatabasePublicSurface({
    repositoryRoot,
    publicSourceOverride: `${publicSource}\nexport { createPrivatePool } from './internal/pool.js';\n`,
  });

  assert.match(errors.join('\n'), /received \[.*createPrivatePool/u);
});

test('database-core public-surface guard rejects forbidden types behind approved names', async () => {
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

test('database-core public-surface guard rejects unrestricted query methods', async () => {
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

  assert.ok(errors.includes('database-core public runtime exposes an unrestricted query method'));
});
