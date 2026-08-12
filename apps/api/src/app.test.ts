import { afterEach, describe, expect, it } from 'vitest';

import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger } from '@cpos/observability';

import { buildApi } from './app.js';
import { createDevelopmentPlatformWorkspaceService } from './development-platform.js';
import { createDevelopmentProcurementWorkspaceService, developmentProcurementProjectId } from './development-procurement.js';

const apps: ReturnType<typeof buildApi>[] = [];
const sessionHeaders = {
  'x-cpos-session-mode': 'development',
  'x-cpos-tenant-id': '019d1111-1111-7111-8111-111111111111',
  'x-cpos-principal-id': '019d3333-3333-7333-8333-333333333333',
};

afterEach(async () => {
  await Promise.all(apps.splice(0).map(async (app) => app.close()));
});

function createApp(productRuntime = false) {
  const config = loadRuntimeConfig('api', { APP_ENV: 'development' });
  const logger = createTechnicalLogger({
    service: 'api-test',
    minimumLevel: 'error',
    sink: () => {},
  });
  const app = buildApi({
    config,
    logger,
    now: () => new Date('2026-08-11T00:00:00.000Z'),
    ...(productRuntime
      ? { platformWorkspaceService: createDevelopmentPlatformWorkspaceService(), procurementWorkspaceService: createDevelopmentProcurementWorkspaceService() }
      : {}),
  });
  apps.push(app);
  return app;
}

describe('B02 platform API shell', () => {
  it('serves liveness, readiness, build metadata, and OpenAPI', async () => {
    const app = createApp();
    const live = await app.inject({ method: 'GET', url: '/health/live' });
    expect(live.statusCode).toBe(200);
    expect(live.json()).toEqual({ status: 'ok', checkedAt: '2026-08-11T00:00:00.000Z' });

    const ready = await app.inject({ method: 'GET', url: '/health/ready' });
    expect(ready.statusCode).toBe(200);
    expect(ready.json().status).toBe('ok');

    const build = await app.inject({ method: 'GET', url: '/meta/build' });
    expect(build.statusCode).toBe(200);
    expect(build.json().environment).toBe('development');

    const openapi = await app.inject({ method: 'GET', url: '/openapi.json' });
    expect(openapi.statusCode).toBe(200);
    expect(openapi.json().openapi).toBe('3.1.0');
  });

  it('fails closed when the development product runtime is disabled', async () => {
    const response = await createApp().inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: sessionHeaders,
    });
    expect(response.statusCode).toBe(503);
  });

  it('requires explicit development session context', async () => {
    const response = await createApp(true).inject({
      method: 'GET',
      url: '/platform/workspace',
    });
    expect(response.statusCode).toBe(401);
  });

  it('returns a coherent workspace and supports project creation in the isolated demo runtime', async () => {
    const app = createApp(true);
    const before = await app.inject({
      method: 'GET',
      url: '/platform/workspace',
      headers: sessionHeaders,
    });
    expect(before.statusCode).toBe(200);
    expect(before.json().tenant.displayName).toBe('CPOS Demo Contractor');
    expect(before.json().projects).toHaveLength(2);

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

  it('exposes the B04-B06 procurement workspace and enforces role-aware command capability', async () => {
    const app=createApp(true);
    const read=await app.inject({method:'GET',url:`/procurement/workspace?projectId=${developmentProcurementProjectId}`,headers:sessionHeaders});
    expect(read.statusCode).toBe(200);
    expect(read.json().requirements.length).toBeGreaterThan(0);
    expect(read.json().rfqs.length).toBeGreaterThan(0);
    expect(read.json().externalTaskGrants.length).toBeGreaterThan(0);

    const managerHeaders={...sessionHeaders,'x-cpos-principal-id':'019d3333-3333-7333-8333-333333333334','content-type':'application/json'};
    const create=await app.inject({method:'POST',url:'/procurement/requirements',headers:managerHeaders,payload:{projectId:developmentProcurementProjectId,authorityContextId:'019d5555-5555-7555-8555-555555555551',sourceKind:'MANUAL_AUTHORIZED_REQUIREMENT',sourceReference:'TEST-001',description:'Test requirement',authorizedQuantity:'10',uomKey:'EA'}});
    expect(create.statusCode).toBe(201);

    const reviewerHeaders={...sessionHeaders,'x-cpos-principal-id':'019d3333-3333-7333-8333-333333333335','content-type':'application/json'};
    const denied=await app.inject({method:'POST',url:'/procurement/packages',headers:reviewerHeaders,payload:{projectId:developmentProcurementProjectId,authorityContextId:'019d5555-5555-7555-8555-555555555551',packageCode:'PKG-X',displayName:'Reviewer cannot create'}});
    expect(denied.statusCode).toBe(403);
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
    expect(response.statusCode).toBe(401);
  });
});
