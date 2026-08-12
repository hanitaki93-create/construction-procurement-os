import { describe, expect, it } from 'vitest';

import {
  assertExactPostgresTypeParsers,
  inspectExactPostgresTypeParsers,
  installExactPostgresTypeParsers,
} from './internal/exact-types.js';

describe('PostgreSQL exact type parser inventory', () => {
  it('keeps int8 and numeric values as exact strings', () => {
    installExactPostgresTypeParsers();
    expect(inspectExactPostgresTypeParsers()).toEqual({
      int8PreservesString: true,
      numericPreservesString: true,
    });
    expect(() => assertExactPostgresTypeParsers()).not.toThrow();
  });
});
