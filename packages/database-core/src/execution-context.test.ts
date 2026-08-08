import { describe, expect, it } from 'vitest';

import { validateDatabaseExecutionContext } from './execution-context.js';

const valid = {
  tenantId: '019c0000-0000-7000-8000-000000000001',
  principalId: '019c0000-0000-7000-8000-000000000002',
  representedPrincipalId: '019c0000-0000-7000-8000-000000000003',
  projectId: '019c0000-0000-7000-8000-000000000004',
  authorityContextId: '019c0000-0000-7000-8000-000000000005',
  operationKey: 'platform.tenant.read.v1',
  invocationId: '019c0000-0000-7000-8000-000000000006',
  serviceIdentity: 'api',
} as const;

describe('database execution context validation', () => {
  it('accepts a bounded complete context', () => {
    expect(() => validateDatabaseExecutionContext(valid)).not.toThrow();
  });

  it.each(['tenantId', 'principalId', 'operationKey', 'invocationId', 'serviceIdentity'] as const)(
    'rejects missing/blank required %s',
    (key) => {
      expect(() => validateDatabaseExecutionContext({ ...valid, [key]: '   ' })).toThrow(
        /required/u,
      );
    },
  );

  it('rejects NUL and oversized context values before touching PostgreSQL', () => {
    expect(() =>
      validateDatabaseExecutionContext({ ...valid, tenantId: 'tenant\u0000other' }),
    ).toThrow(/NUL/u);
    expect(() =>
      validateDatabaseExecutionContext({ ...valid, operationKey: 'x'.repeat(513) }),
    ).toThrow(/512/u);
  });
});
