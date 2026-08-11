import Fastify, { type FastifyInstance, type FastifyRequest } from 'fastify';

import {
  technicalOpenApiDocument,
  type CreateProjectRequest,
  type CreateProjectResponse,
  type HealthComponent,
  type LivenessResponse,
  type PlatformWorkspaceSnapshot,
  type ReadinessResponse,
} from '@cpos/contracts';
import type { RuntimeConfig } from '@cpos/config';
import type { TechnicalLogger } from '@cpos/observability';

const secureHeaders: Readonly<Record<string, string>> = {
  'content-security-policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  'cross-origin-resource-policy': 'same-origin',
  'permissions-policy': 'camera=(), geolocation=(), microphone=()',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function normalizeThrown(value: unknown): Readonly<{ name: string; message: string }> {
  if (value instanceof Error) return { name: value.name, message: value.message };
  return { name: 'UnknownThrownValue', message: String(value) };
}

function singleHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];
  if (Array.isArray(value)) return value[0];
  return value;
}

export interface PlatformRequestContext {
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface PlatformWorkspaceService {
  readWorkspace(context: PlatformRequestContext): Promise<PlatformWorkspaceSnapshot>;
  createProject(
    context: PlatformRequestContext,
    request: CreateProjectRequest,
  ): Promise<CreateProjectResponse>;
}

function developmentContext(
  request: FastifyRequest,
  environment: string,
): PlatformRequestContext | undefined {
  if (environment === 'production') return undefined;
  if (singleHeader(request, 'x-cpos-session-mode') !== 'development') return undefined;

  const tenantId = singleHeader(request, 'x-cpos-tenant-id')?.trim();
  const principalId = singleHeader(request, 'x-cpos-principal-id')?.trim();
  if (!tenantId || !principalId || !uuidPattern.test(tenantId) || !uuidPattern.test(principalId)) {
    return undefined;
  }

  return {
    tenantId,
    principalId,
    invocationId: request.id,
    serviceIdentity: 'cpos-api',
  };
}

function productErrorStatus(error: unknown): 400 | 403 | 409 | 500 {
  const message = normalizeThrown(error).message.toLowerCase();
  if (
    message.includes('projectcode') ||
    message.includes('displayname') ||
    message.includes('project code')
  ) {
    return 400;
  }
  if (message.includes('not authorized') || message.includes('permission denied')) return 403;
  if (message.includes('already exists') || message.includes('conflict')) return 409;
  return 500;
}

export interface BuildApiOptions {
  readonly config: RuntimeConfig;
  readonly logger: TechnicalLogger;
  readonly now?: () => Date;
  readonly platformWorkspaceService?: PlatformWorkspaceService;
}

export function buildApi({
  config,
  logger,
  now = () => new Date(),
  platformWorkspaceService,
}: BuildApiOptions): FastifyInstance {
  const app = Fastify({
    bodyLimit: config.bodyLimitBytes,
    connectionTimeout: config.requestTimeoutMs,
    logger: false,
    requestTimeout: config.requestTimeoutMs,
    trustProxy: config.trustProxy,
  });

  app.addHook('onRequest', async (request) => {
    logger.info('http_request_started', {
      requestId: request.id,
      method: request.method,
      route: request.routeOptions.url,
    });
  });

  app.addHook('onSend', async (_request, reply, payload) => {
    for (const [name, value] of Object.entries(secureHeaders)) reply.header(name, value);
    reply.header('cache-control', 'no-store');
    return payload;
  });

  app.addHook('onResponse', async (request, reply) => {
    logger.info('http_request_completed', {
      requestId: request.id,
      method: request.method,
      route: request.routeOptions.url,
      statusCode: reply.statusCode,
    });
  });

  app.setErrorHandler((error, request, reply) => {
    const normalized = normalizeThrown(error);
    logger.error('http_request_failed', {
      requestId: request.id,
      errorName: normalized.name,
      errorMessage: normalized.message,
    });
    void reply.status(500).send({ status: 'error', requestId: request.id });
  });

  app.get('/health/live', async (): Promise<LivenessResponse> => ({
    status: 'ok',
    checkedAt: now().toISOString(),
  }));

  app.get('/health/ready', async (): Promise<ReadinessResponse> => {
    const checkedAt = now().toISOString();
    const components: readonly HealthComponent[] = [
      {
        name: 'runtime',
        state: 'ok',
        checkedAt,
        detail: platformWorkspaceService
          ? 'B02 development product runtime is configured.'
          : 'Technical runtime is ready; the B02 development product runtime is disabled.',
      },
    ];
    return { status: 'ok', checkedAt, components };
  });

  app.get('/meta/build', async () => config.build);
  app.get('/openapi.json', async () => technicalOpenApiDocument);

  app.get('/platform/workspace', async (request, reply) => {
    if (!platformWorkspaceService) {
      return reply.status(503).send({
        code: 'PRODUCT_RUNTIME_UNAVAILABLE',
        message: 'The development product runtime is not enabled for this API process.',
      });
    }
    const context = developmentContext(request, config.build.environment);
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message:
          config.build.environment === 'production'
            ? 'A verified production authentication provider is not configured.'
            : 'Provide a development session with tenant and principal context.',
      });
    }

    try {
      return await platformWorkspaceService.readWorkspace(context);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'WORKSPACE_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/platform/projects', async (request, reply) => {
    if (!platformWorkspaceService) {
      return reply.status(503).send({
        code: 'PRODUCT_RUNTIME_UNAVAILABLE',
        message: 'The development product runtime is not enabled for this API process.',
      });
    }
    const context = developmentContext(request, config.build.environment);
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message:
          config.build.environment === 'production'
            ? 'A verified production authentication provider is not configured.'
            : 'Provide a development session with tenant and principal context.',
      });
    }

    const raw = request.body;
    if (!raw || typeof raw !== 'object') {
      return reply.status(400).send({ code: 'INVALID_PROJECT_REQUEST' });
    }
    const body = raw as Partial<CreateProjectRequest>;
    if (typeof body.projectCode !== 'string' || typeof body.displayName !== 'string') {
      return reply.status(400).send({ code: 'INVALID_PROJECT_REQUEST' });
    }

    try {
      const result = await platformWorkspaceService.createProject(context, {
        projectCode: body.projectCode,
        displayName: body.displayName,
      });
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'PROJECT_CREATE_REJECTED', requestId: request.id });
    }
  });

  return app;
}
