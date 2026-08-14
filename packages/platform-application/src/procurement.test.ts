import { describe, expect, it } from 'vitest';

import type { DatabaseRuntime } from '@cpos/database-core';

import { createGovernedProcurementService } from './procurement.js';

function unavailableDatabase(): DatabaseRuntime {
  return {
    withExecutionContext: async () => {
      throw new Error('database callback should not be reached for pre-transaction validation');
    },
  } as unknown as DatabaseRuntime;
}

describe('createGovernedProcurementService', () => {
  it('rejects malformed MR identifiers before opening persistence', async () => {
    const service = createGovernedProcurementService(unavailableDatabase());
    await expect(
      service.readRequisition(
        {
          authenticationIdentityId: 'development:test',
          tenantId: '018f0000-0000-7000-8000-000000000001',
          principalId: '018f0000-0000-7000-8000-000000000002',
          invocationId: 'test',
          serviceIdentity: 'test',
        },
        'not-a-uuid',
      ),
    ).rejects.toThrow('mrId is invalid');
  });
});
