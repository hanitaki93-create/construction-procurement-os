export * from './bootstrap.js';
export * from './operation.js';
export * from './platform.js';
export * from './usage.js';
export * from './workspace.js';

export type HealthState = 'ok' | 'degraded' | 'unavailable';

export interface HealthComponent {
  readonly name: string;
  readonly state: HealthState;
  readonly checkedAt: string;
  readonly detail?: string;
}

export interface LivenessResponse {
  readonly status: 'ok';
  readonly checkedAt: string;
}

export interface ReadinessResponse {
  readonly status: HealthState;
  readonly checkedAt: string;
  readonly components: readonly HealthComponent[];
}

export interface BuildMetadata {
  readonly service: string;
  readonly buildId: string;
  readonly releaseId: string;
  readonly sourceCommit: string;
  readonly runtime: string;
  readonly environment: string;
}

export const technicalOpenApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Construction Procurement OS API',
    version: '0.0.0-b02',
    description:
      'B02 platform and self-service product shell. Procurement-domain commands remain intentionally excluded.',
  },
  paths: {
    '/health/live': {
      get: {
        operationId: 'technicalHealthLive',
        summary: 'Process liveness',
        responses: { '200': { description: 'Process is alive' } },
      },
    },
    '/health/ready': {
      get: {
        operationId: 'technicalHealthReady',
        summary: 'Technical readiness',
        responses: { '200': { description: 'Technical and product-shell readiness' } },
      },
    },
    '/meta/build': {
      get: {
        operationId: 'technicalBuildMetadata',
        summary: 'Non-sensitive build metadata',
        responses: { '200': { description: 'Build compatibility metadata' } },
      },
    },
    '/platform/workspace': {
      get: {
        operationId: 'platformWorkspaceRead',
        summary: 'Read tenant, company, membership, project and subscription workspace state',
        responses: {
          '200': { description: 'Governed workspace snapshot' },
          '401': { description: 'Session context is absent or invalid' },
          '503': { description: 'Product persistence is not configured' },
        },
      },
    },
    '/platform/projects': {
      post: {
        operationId: 'platformProjectCreate',
        summary: 'Create the first or subsequent tenant project context',
        responses: {
          '201': { description: 'Project created through the governed platform runtime' },
          '400': { description: 'Project request is invalid' },
          '401': { description: 'Session context is absent or invalid' },
          '403': { description: 'Execution principal lacks tenant authority' },
          '409': { description: 'Project code or effective meaning conflicts' },
        },
      },
    },
    '/openapi.json': {
      get: {
        operationId: 'technicalOpenApi',
        summary: 'OpenAPI 3.1 document',
        responses: { '200': { description: 'CPOS API document' } },
      },
    },
  },
} as const;
