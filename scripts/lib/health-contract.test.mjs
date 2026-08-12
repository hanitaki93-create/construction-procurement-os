import assert from 'node:assert/strict';
import test from 'node:test';

import { healthFieldMatches } from './health-contract.mjs';

test('matches the API liveness contract', () => {
  assert.equal(healthFieldMatches({ status: 'ok' }, 'status', 'ok'), true);
  assert.equal(healthFieldMatches({ status: 'ok' }, 'state', 'alive'), false);
});

test('matches the static web liveness contract', () => {
  assert.equal(healthFieldMatches({ state: 'alive' }, 'state', 'alive'), true);
  assert.equal(healthFieldMatches({ state: 'alive' }, 'status', 'ok'), false);
});

test('rejects null, arrays and inherited health fields', () => {
  assert.equal(healthFieldMatches(null, 'status', 'ok'), false);
  assert.equal(healthFieldMatches([], 'status', 'ok'), false);
  assert.equal(healthFieldMatches(Object.create({ status: 'ok' }), 'status', 'ok'), false);
});
