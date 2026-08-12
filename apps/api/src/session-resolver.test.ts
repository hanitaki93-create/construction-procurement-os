import { afterEach, describe, expect, it } from 'vitest';

import { loadRuntimeConfig } from '@cpos/config';
import type { PlatformWorkspaceSnapshot } from '@cpos/contracts';
import { createTechnicalLogger } from '@cpos/observability';

import { buildApi, type PlatformRequestContext } from './app.js';

const apps: ReturnType<typeof buildApi>[] = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map(async (app) => app.close()));
});

const emptyWorkspace: PlatformWorkspaceSnapshot = {
  tenant: {
    tenantId: '019d1111-1111-7111-8111-111111111111',
    displayName: 'Verified Tenant',
    lifecycleState: 'ACTIVE',
  },
  company: null,
  principal: {
    principalId: '019d3333-3333-7333-8333-333333333333',
    displayName: 'Verified User',
    lifecycleState: 'ACTIVE',
  },
  currentMembership: null,
  memberships: [],
  authorityContext: null,
  projects: [],
  subscription: null,
  capabilities: {
    canCreateProject: false,
    canManageMemberships: false,
    canUseEntitledCommands: false,
    canReadExport: false,
  },
};

describe('provider-neutral authentication session boundary', () => {
  it('accepts an injected verified session in production and ignores development headers', async () => {
    let observed: PlatformRequestContext | undefined;
    const app = buildApi({
      config: loadRuntimeConfig('api', { APP_ENV: 'production' }),
      logger: createTechnicalLogger({ service: 'auth-test', minimumLevel: 'error', sink: () => {} }),
      authenticationSessionResolver: {
        resolve: async () => ({
          authenticationIdentityId: 'oidc:issuer.example:subject-123',
          tenantId: emptyWorkspace.tenant.tenantId,
          principalId: emptyWorkspace.principal.principalId,
        }),
      },
      platformWorkspaceService: {
        readWorkspace: async (context) => {
          observed = context;
          return emptyWorkspace;
        },
        createProject: async () => {
          throw new Error('not used');
        },
      },
    });
    apps.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: {
        'x-cpos-session-mode': 'development',
        'x-cpos-tenant-id': '019d9999-9999-7999-8999-999999999999',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(observed?.authenticationIdentityId).toBe('oidc:issuer.example:subject-123');
    expect(observed?.tenantId).toBe(emptyWorkspace.tenant.tenantId);
    expect(observed?.principalId).toBe(emptyWorkspace.principal.principalId);
  });

  it('fails closed in production when no verified resolver is configured', async () => {
    const app = buildApi({
      config: loadRuntimeConfig('api', { APP_ENV: 'production' }),
      logger: createTechnicalLogger({ service: 'auth-test', minimumLevel: 'error', sink: () => {} }),
      platformWorkspaceService: {
        readWorkspace: async () => emptyWorkspace,
        createProject: async () => {
          throw new Error('not used');
        },
      },
    });
    apps.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: {
        'x-cpos-session-mode': 'development',
        'x-cpos-tenant-id': emptyWorkspace.tenant.tenantId,
        'x-cpos-principal-id': emptyWorkspace.principal.principalId,
      },
    });
    expect(response.statusCode).toBe(401);
  });
});
