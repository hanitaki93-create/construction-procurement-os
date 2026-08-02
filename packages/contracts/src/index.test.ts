import { describe, expect, it } from 'vitest';

import { technicalOpenApiDocument } from './index.js';

describe('technical contracts', () => {
  it('exposes only the four B01 technical routes', () => {
    expect(technicalOpenApiDocument.openapi).toBe('3.1.0');
    expect(Object.keys(technicalOpenApiDocument.paths).sort()).toEqual([
      '/health/live',
      '/health/ready',
      '/meta/build',
      '/openapi.json',
    ]);
  });
});
