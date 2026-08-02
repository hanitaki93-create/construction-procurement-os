import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { inspectSpecifier } from './boundary-checker.mjs';

const repositoryRoot = path.resolve('/repository');

function violations(file, specifier) {
  return inspectSpecifier({ repositoryRoot, file: path.join(repositoryRoot, file), specifier });
}

test('allows public package imports from server code', () => {
  assert.deepEqual(violations('apps/api/src/main.ts', '@cpos/config'), []);
});

test('rejects raw database libraries outside database-core and testkit', () => {
  const result = violations('apps/api/src/main.ts', 'pg');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /raw database libraries/u);
});

test('allows raw database libraries inside database-core', () => {
  assert.deepEqual(violations('packages/database-core/src/private.ts', 'pg'), []);
});

test('rejects browser imports of database capabilities', () => {
  const result = violations('apps/web-internal/src/main.tsx', '@cpos/database-core');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /browser code cannot import database/u);
});

test('rejects external web imports of internal web code', () => {
  const result = violations('apps/web-external/src/main.tsx', '@cpos/web-internal/private');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /external web cannot import internal/u);
});

test('rejects source-internal imports', () => {
  const result = violations('apps/api/src/main.ts', '@cpos/config/src/private.js');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /public exports/u);
});

test('rejects relative imports escaping a package root', () => {
  const result = violations('packages/config/src/index.ts', '../../database-core/src/private.ts');
  assert.equal(result.length, 2);
  assert.match(result.map((entry) => entry.message).join(' '), /cross-package relative imports/u);
});
