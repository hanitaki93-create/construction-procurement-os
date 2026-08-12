import { describe, expect, it } from 'vitest';

import { technicalOpenApiDocument } from './index.js';

describe('technical contracts', () => {
  it('exposes technical, platform and governed B04-B06 procurement routes', () => {
    expect(technicalOpenApiDocument.openapi).toBe('3.1.0');
    expect(Object.keys(technicalOpenApiDocument.paths).sort()).toEqual([
      '/health/live',
      '/health/ready',
      '/meta/build',
      '/openapi.json',
      '/platform/projects',
      '/platform/workspace',
      '/procurement/allocations',
      '/procurement/evidence/uploads',
      '/procurement/grants/:grantId/revoke',
      '/procurement/grants/:grantId/transfer',
      '/procurement/packages',
      '/procurement/requirements',
      '/procurement/rfqs',
      '/procurement/rfqs/:eventId/addenda',
      '/procurement/rfqs/:eventId/issue',
      '/procurement/suppliers',
      '/procurement/suppliers/:relationshipId/contacts',
      '/procurement/workspace',
    ]);
  });
});
