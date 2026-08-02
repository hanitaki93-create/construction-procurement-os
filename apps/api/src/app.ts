import Fastify, { type FastifyInstance } from 'fastify';

import {
  technicalOpenApiDocument,
  type HealthComponent,
  type LivenessResponse,
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

export interface BuildApiOptions {
  readonly config: RuntimeConfig;
  readonly logger: TechnicalLogger;
  readonly now?: () => Date;
}

export function buildApi({
  config,
  logger,
  now = () => new Date(),
}: BuildApiOptions): FastifyInstance {
  const app = Fastify({
    bodyLimit: config.bodyLimitBytes,
    connectionTimeout: config.requestTimeoutMs,
    disableRequestLogging: true,
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
    logger.error('http_request_failed', {
      requestId: request.id,
      errorName: error.name,
      errorMessage: error.message,
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
        detail: 'B01 technical shell initialized; no product dependencies are configured.',
      },
    ];
    return { status: 'ok', checkedAt, components };
  });

  app.get('/meta/build', async () => config.build);
  app.get('/openapi.json', async () => technicalOpenApiDocument);

  return app;
}
