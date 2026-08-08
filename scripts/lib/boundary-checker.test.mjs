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

test('allows raw database libraries inside testkit', () => {
  assert.deepEqual(violations('packages/testkit/src/database.ts', 'pg'), []);
});

test('rejects restricted database persistence capability from application code', () => {
  const result = violations('apps/api/src/main.ts', '@cpos/database-core/persistence');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /private to module src\/persistence/u);
});

test('rejects restricted database persistence capability from ordinary domain source', () => {
  const result = violations(
    'packages/platform-kernel/src/service.ts',
    '@cpos/database-core/persistence',
  );
  assert.equal(result.length, 1);
  assert.match(result[0].message, /private to module src\/persistence/u);
});

test('allows restricted database persistence capability only from module persistence source', () => {
  assert.deepEqual(
    violations(
      'packages/platform-kernel/src/persistence/platform-repository.ts',
      '@cpos/database-core/persistence',
    ),
    [],
  );
});

test('allows restricted database persistence capability in a private test graph', () => {
  assert.deepEqual(
    violations('packages/platform-kernel/src/service.test.ts', '@cpos/database-core/persistence'),
    [],
  );
});

test('rejects testkit imports from production code', () => {
  const result = violations('apps/api/src/main.ts', '@cpos/testkit');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /private to test and integration graphs/u);
});

test('allows testkit imports from test code', () => {
  assert.deepEqual(violations('apps/api/src/app.test.ts', '@cpos/testkit'), []);
});

test('allows same-package private source imports only from the private test graph', () => {
  assert.deepEqual(
    violations(
      'packages/database-core/integration/concurrency.integration.test.ts',
      '../src/internal/transaction.js',
    ),
    [],
  );
  const productionResult = violations(
    'packages/database-core/src/public.ts',
    '../src/internal/transaction.js',
  );
  assert.equal(productionResult.length, 1);
  assert.match(productionResult[0].message, /public exports/u);
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

test('rejects source-internal package imports', () => {
  const result = violations('apps/api/src/main.ts', '@cpos/config/src/private.js');
  assert.equal(result.length, 1);
  assert.match(result[0].message, /public exports/u);
});

test('rejects relative imports escaping a package root', () => {
  const result = violations('packages/config/src/index.ts', '../../database-core/src/private.ts');
  assert.equal(result.length, 2);
  assert.match(result.map((entry) => entry.message).join(' '), /cross-package relative imports/u);
});
