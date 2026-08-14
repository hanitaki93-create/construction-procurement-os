import { describe, expect, it } from 'vitest';

import { technicalOpenApiDocument } from './index.js';

describe('technical and product contracts', () => {
  it('exposes accepted technical/platform routes plus the live V2 procurement surface', () => {
    expect(technicalOpenApiDocument.openapi).toBe('3.1.0');
    expect(Object.keys(technicalOpenApiDocument.paths).sort()).toEqual([
      '/health/live',
      '/health/ready',
      '/meta/build',
      '/openapi.json',
      '/platform/projects',
      '/platform/workspace',
      '/procurement/reference-data',
      '/procurement/requisitions',
      '/procurement/requisitions/{mrId}',
      '/procurement/requisitions/{mrId}/submit',
      '/procurement/suppliers',
    ]);
  });
});
