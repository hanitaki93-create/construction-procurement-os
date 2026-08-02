import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('database-core package exposes only the approved technical runtime entry point', async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(repositoryRoot, 'packages/database-core/package.json'), 'utf8'),
  );
  assert.deepEqual(Object.keys(packageJson.exports), ['.']);
  assert.equal(packageJson.exports['.'].default, './dist/public.js');
  assert.equal(packageJson.exports['.'].types, './dist/public.d.ts');
});

test('database-core public runtime has no unrestricted query method', async () => {
  const publicSource = await readFile(
    path.join(repositoryRoot, 'packages/database-core/src/public.ts'),
    'utf8',
  );
  assert.doesNotMatch(publicSource, /(?:readonly\s+)?query\s*\(/u);
  assert.doesNotMatch(
    publicSource,
    /export\s+(?:type\s+)?(?:\{[^}]*\b(?:Pool|PoolClient|Client|Kysely|PrivateTransaction)\b|(?:class|interface|const|function|type)\s+(?:Pool|PoolClient|Client|Kysely|PrivateTransaction)\b)/u,
  );
});
