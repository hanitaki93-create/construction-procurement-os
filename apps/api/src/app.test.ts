import { afterEach, describe, expect, it } from 'vitest';

import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger } from '@cpos/observability';

import { buildApi } from './app.js';
import {
  createDevelopmentPlatformWorkspaceService,
  developmentDemoSession,
} from './development-platform.js';

const apps: ReturnType<typeof buildApi>[] = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map(async (app) => app.close()));
});

function createApp(withProduct = false) {
  const config = loadRuntimeConfig('api', {
    BUILD_ID: 'test-build',
    RELEASE_ID: 'test-release',
    SOURCE_COMMIT: 'abc123',
    APP_ENV: 'test',
  });
  const app = buildApi({
    config,
    logger: createTechnicalLogger({ service: 'api-test', minimumLevel: 'error', sink: () => {} }),
    now: () => new Date('2026-08-02T00:00:00.000Z'),
    ...(withProduct
      ? { platformWorkspaceService: createDevelopmentPlatformWorkspaceService() }
      : {}),
  });
  apps.push(app);
  return app;
}

const sessionHeaders = {
  'x-cpos-session-mode': 'development',
  'x-cpos-tenant-id': developmentDemoSession.tenantId,
  'x-cpos-principal-id': developmentDemoSession.principalId,
};

describe('B02 platform API shell', () => {
  it('serves liveness, readiness, build metadata, and OpenAPI', async () => {
    const app = createApp();
    const live = await app.inject({ method: 'GET', url: '/health/live' });
    const ready = await app.inject({ method: 'GET', url: '/health/ready' });
    const build = await app.inject({ method: 'GET', url: '/meta/build' });
    const openApi = await app.inject({ method: 'GET', url: '/openapi.json' });

    expect(live.statusCode).toBe(200);
    expect(live.json()).toEqual({ status: 'ok', checkedAt: '2026-08-02T00:00:00.000Z' });
    expect(ready.json().components).toHaveLength(1);
    expect(build.json().buildId).toBe('test-build');
    expect(openApi.json().openapi).toBe('3.1.0');
    expect(openApi.headers['content-security-policy']).toContain("default-src 'none'");
    expect(openApi.headers['cache-control']).toBe('no-store');
  });

  it('fails closed when the development product runtime is disabled', async () => {
    const response = await createApp().inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: sessionHeaders,
    });
    expect(response.statusCode).toBe(503);
    expect(response.json().code).toBe('PRODUCT_RUNTIME_UNAVAILABLE');
  });

  it('requires explicit development session context', async () => {
    const response = await createApp(true).inject({
      method: 'GET',
      url: '/platform/workspace',
    });
    expect(response.statusCode).toBe(401);
    expect(response.json().code).toBe('SESSION_REQUIRED');
  });

  it('returns a coherent workspace and supports project creation in the isolated demo runtime', async () => {
    const app = createApp(true);
    const overview = await app.inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: sessionHeaders,
    });
    expect(overview.statusCode).toBe(200);
    expect(overview.json().tenant.displayName).toBe('CPOS Demo Contractor');
    expect(overview.json().projects).toHaveLength(2);

    const create = await app.inject({
      method: 'POST',
      url: '/platform/projects',
      headers: {
        ...sessionHeaders,
        'content-type': 'application/json',
      },
      payload: {
        projectCode: 'AM-001',
        displayName: 'Al Mizhar Private Villa',
      },
    });
    expect(create.statusCode).toBe(201);
    expect(create.json().project.projectCode).toBe('AM-001');

    const after = await app.inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: sessionHeaders,
    });
    expect(after.json().projects).toHaveLength(3);
  });

  it('rejects a development session that does not belong to the demo tenant/principal', async () => {
    const response = await createApp(true).inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: {
        ...sessionHeaders,
        'x-cpos-principal-id': '019d3333-3333-7333-8333-333333333336',
      },
    });
    expect(response.statusCode).toBe(403);
  });
});
