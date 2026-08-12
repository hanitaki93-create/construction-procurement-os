import { describe, expect, it } from 'vitest';

import { technicalOpenApiDocument } from './index.js';

describe('technical contracts', () => {
  it('exposes the B01 technical routes plus the governed B02 platform surface', () => {
    expect(technicalOpenApiDocument.openapi).toBe('3.1.0');
    expect(Object.keys(technicalOpenApiDocument.paths).sort()).toEqual([
      '/health/live',
      '/health/ready',
      '/meta/build',
      '/openapi.json',
      '/platform/projects',
      '/platform/workspace',
    ]);
  });
});
