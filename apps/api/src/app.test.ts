import { afterEach, describe, expect, it } from 'vitest';

import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger } from '@cpos/observability';

import { buildApi } from './app.js';

const apps: ReturnType<typeof buildApi>[] = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map(async (app) => app.close()));
});

function createApp() {
  const config = loadRuntimeConfig('api', {
    BUILD_ID: 'test-build',
    RELEASE_ID: 'test-release',
    SOURCE_COMMIT: 'abc123',
  });
  const app = buildApi({
    config,
    logger: createTechnicalLogger({ service: 'api-test', minimumLevel: 'error', sink: () => {} }),
    now: () => new Date('2026-08-02T00:00:00.000Z'),
  });
  apps.push(app);
  return app;
}

describe('B01 technical API', () => {
  it('serves liveness, readiness, build metadata, and OpenAPI only', async () => {
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

  it('does not expose a product route', async () => {
    const response = await createApp().inject({ method: 'POST', url: '/operations' });
    expect(response.statusCode).toBe(404);
  });
});
