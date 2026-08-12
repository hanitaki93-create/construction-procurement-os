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
    title: 'Construction Procurement OS Technical API',
    version: '0.0.0-b01',
    description: 'B01 technical shell only. No product or procurement operations are exposed.',
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
        responses: { '200': { description: 'Technical shell is ready' } },
      },
    },
    '/meta/build': {
      get: {
        operationId: 'technicalBuildMetadata',
        summary: 'Non-sensitive build metadata',
        responses: { '200': { description: 'Build compatibility metadata' } },
      },
    },
    '/openapi.json': {
      get: {
        operationId: 'technicalOpenApi',
        summary: 'OpenAPI 3.1 document',
        responses: { '200': { description: 'Technical OpenAPI document' } },
      },
    },
  },
} as const;
