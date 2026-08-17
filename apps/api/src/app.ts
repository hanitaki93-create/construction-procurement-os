import Fastify, { type FastifyInstance, type FastifyRequest } from 'fastify';

import {
  technicalOpenApiDocument,
  type CreateMaterialRequisitionRequest,
  type CreateProjectRequest,
  type CreateProjectResponse,
  type CreateSupplierRequest,
  type HealthComponent,
  type LivenessResponse,
  type PlatformWorkspaceSnapshot,
  type ReadinessResponse,
  type ReviewMaterialRequisitionRequest,
  type SetProcurementRouteRequest,
  type UpdateMaterialRequisitionDraftRequest,
} from '@cpos/contracts';
import type { RuntimeConfig } from '@cpos/config';
import type { TechnicalLogger } from '@cpos/observability';
import type { GovernedProcurementService } from '@cpos/platform-application';

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

export interface VerifiedAuthenticationSession {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
}

export interface AuthenticationSessionResolver {
  resolve(request: FastifyRequest): Promise<VerifiedAuthenticationSession | undefined>;
}

export interface PlatformRequestContext extends VerifiedAuthenticationSession {
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
  const suppliedIdentity = singleHeader(request, 'x-cpos-authentication-identity-id')?.trim();
  if (!tenantId || !principalId || !uuidPattern.test(tenantId) || !uuidPattern.test(principalId)) {
    return undefined;
  }

  return {
    authenticationIdentityId: suppliedIdentity || `development:${principalId}`,
    tenantId,
    principalId,
    invocationId: request.id,
    serviceIdentity: 'cpos-api',
  };
}

async function resolvedContext(
  request: FastifyRequest,
  environment: string,
  resolver: AuthenticationSessionResolver | undefined,
): Promise<PlatformRequestContext | undefined> {
  if (resolver !== undefined) {
    const verified = await resolver.resolve(request);
    if (verified === undefined) return undefined;
    if (!uuidPattern.test(verified.tenantId) || !uuidPattern.test(verified.principalId)) return undefined;
    if (!verified.authenticationIdentityId.trim() || verified.authenticationIdentityId.length > 512) {
      return undefined;
    }
    return {
      ...verified,
      invocationId: request.id,
      serviceIdentity: 'cpos-api',
    };
  }
  return developmentContext(request, environment);
}

function productErrorStatus(error: unknown): 400 | 401 | 403 | 409 | 500 {
  const message = normalizeThrown(error).message.toLowerCase();
  if (
    message.includes('invalid') ||
    message.includes('must contain') ||
    message.includes('is required') ||
    message.includes('cannot be before') ||
    message.includes('positive exact decimal') ||
    message.includes('non-negative exact decimal') ||
    message.includes('not active or not visible') ||
    message.includes('does not belong') ||
    message.includes('exactly one decision') ||
    message.includes('requires a justification') ||
    message.includes('violates foreign key constraint') ||
    message.includes('violates check constraint') ||
    message.includes('project code') ||
    message.includes('authority context')
  ) {
    return 400;
  }
  if (message.includes('authentication identity') || message.includes('session')) return 401;
  if (
    message.includes('not authorized') ||
    message.includes('permission denied') ||
    message.includes('product access') ||
    message.includes('row-level security')
  ) {
    return 403;
  }
  if (
    message.includes('already exists') ||
    message.includes('conflict') ||
    message.includes('not found') ||
    message.includes('duplicate') ||
    message.includes('unique constraint')
  ) {
    return 409;
  }
  return 500;
}

function sessionRequiredMessage(environment: string): string {
  return environment === 'production'
    ? 'A verified production authentication provider is not configured.'
    : 'Provide a verified or development session with tenant and principal context.';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export interface BuildApiOptions {
  readonly config: RuntimeConfig;
  readonly logger: TechnicalLogger;
  readonly now?: () => Date;
  readonly platformWorkspaceService?: PlatformWorkspaceService;
  readonly procurementService?: GovernedProcurementService;
  readonly authenticationSessionResolver?: AuthenticationSessionResolver;
}

export function buildApi({
  config,
  logger,
  now = () => new Date(),
  platformWorkspaceService,
  procurementService,
  authenticationSessionResolver,
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
        detail:
          platformWorkspaceService && procurementService
            ? 'Architecture V2 platform and procurement runtimes are configured.'
            : platformWorkspaceService
              ? 'Platform workspace runtime is configured; procurement runtime is disabled.'
              : 'Technical runtime is ready; product runtimes are disabled.',
      },
    ];
    return { status: 'ok', checkedAt, components };
  });

  app.get('/meta/build', async () => config.build);
  app.get('/openapi.json', async () => technicalOpenApiDocument);

  app.get('/auth/sign-in', async (_request, reply) =>
    reply.status(501).send({
      code: 'AUTH_PROVIDER_NOT_CONFIGURED',
      message: 'Use a configured verified authentication provider for this deployment.',
    }),
  );

  app.get('/auth/callback', async (_request, reply) =>
    reply.status(501).send({
      code: 'AUTH_PROVIDER_NOT_CONFIGURED',
      message: 'Authentication callback ownership is provider-neutral and not configured here.',
    }),
  );

  app.get('/platform/workspace', async (request, reply) => {
    if (!platformWorkspaceService) {
      return reply.status(503).send({
        code: 'PRODUCT_RUNTIME_UNAVAILABLE',
        message: 'The platform workspace runtime is not enabled for this API process.',
      });
    }
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message: sessionRequiredMessage(config.build.environment),
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
        message: 'The platform workspace runtime is not enabled for this API process.',
      });
    }
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message: sessionRequiredMessage(config.build.environment),
      });
    }
    const raw = request.body;
    if (!isObject(raw)) return reply.status(400).send({ code: 'INVALID_PROJECT_REQUEST' });
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

  app.get('/procurement/reference-data', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    try {
      return await procurementService.referenceData(context);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'REFERENCE_DATA_READ_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/suppliers', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    try {
      return await procurementService.listSuppliers(context);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_LIST_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/suppliers', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const raw = request.body;
    if (!isObject(raw)) return reply.status(400).send({ code: 'INVALID_SUPPLIER_REQUEST' });
    if (
      typeof raw['supplierCode'] !== 'string' ||
      typeof raw['legalName'] !== 'string' ||
      typeof raw['supplierType'] !== 'string'
    ) {
      return reply.status(400).send({ code: 'INVALID_SUPPLIER_REQUEST' });
    }
    try {
      const result = await procurementService.createSupplier(context, raw as unknown as CreateSupplierRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/requisitions', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    try {
      return await procurementService.listRequisitions(context);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_LIST_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/requisitions', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const raw = request.body;
    if (!isObject(raw)) return reply.status(400).send({ code: 'INVALID_MR_REQUEST' });
    if (
      typeof raw['projectId'] !== 'string' ||
      typeof raw['requiredOnSiteDate'] !== 'string' ||
      typeof raw['subject'] !== 'string' ||
      !Array.isArray(raw['lines'])
    ) {
      return reply.status(400).send({ code: 'INVALID_MR_REQUEST' });
    }
    try {
      const result = await procurementService.createRequisition(
        context,
        raw as unknown as CreateMaterialRequisitionRequest,
      );
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.put('/procurement/requisitions/:mrId/draft', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const mrId = (request.params as { readonly mrId?: unknown }).mrId;
    const raw = request.body;
    if (typeof mrId !== 'string' || !isObject(raw) || typeof raw['requiredOnSiteDate'] !== 'string' || typeof raw['priority'] !== 'string' || typeof raw['subject'] !== 'string' || !Array.isArray(raw['lines'])) return reply.status(400).send({ code: 'INVALID_MR_DRAFT_REQUEST' });
    try { return await procurementService.updateRequisitionDraft(context, mrId, raw as unknown as UpdateMaterialRequisitionDraftRequest); }
    catch (error: unknown) { const status = productErrorStatus(error); if (status === 500) throw error; return reply.status(status).send({ code: 'MR_DRAFT_UPDATE_REJECTED', requestId: request.id }); }
  });

  app.get('/procurement/requisitions/:mrId', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const mrId = (request.params as { readonly mrId?: unknown }).mrId;
    if (typeof mrId !== 'string') return reply.status(400).send({ code: 'INVALID_MR_ID' });
    try {
      const result = await procurementService.readRequisition(context, mrId);
      if (result === undefined) return reply.status(404).send({ code: 'MR_NOT_FOUND' });
      return result;
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/requisitions/:mrId/submit', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const mrId = (request.params as { readonly mrId?: unknown }).mrId;
    if (typeof mrId !== 'string') return reply.status(400).send({ code: 'INVALID_MR_ID' });
    try {
      return await procurementService.submitRequisition(context, mrId);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_SUBMIT_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/requisitions/:mrId/review', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const mrId = (request.params as { readonly mrId?: unknown }).mrId;
    const raw = request.body;
    if (typeof mrId !== 'string' || !isObject(raw) || !Array.isArray(raw['lineDecisions'])) {
      return reply.status(400).send({ code: 'INVALID_MR_REVIEW_REQUEST' });
    }
    try {
      return await procurementService.reviewRequisition(
        context,
        mrId,
        raw as unknown as ReviewMaterialRequisitionRequest,
      );
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_REVIEW_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/requisitions/:mrId/lines/:mrLineId/route', async (request, reply) => {
    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });
    const params = request.params as { readonly mrId?: unknown; readonly mrLineId?: unknown };
    const raw = request.body;
    if (
      typeof params.mrId !== 'string' ||
      typeof params.mrLineId !== 'string' ||
      !isObject(raw) ||
      typeof raw['route'] !== 'string'
    ) {
      return reply.status(400).send({ code: 'INVALID_MR_ROUTE_REQUEST' });
    }
    try {
      return await procurementService.setLineRoute(
        context,
        params.mrId,
        params.mrLineId,
        raw as unknown as SetProcurementRouteRequest,
      );
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'MR_ROUTE_REJECTED', requestId: request.id });
    }
  });

  return app;
}
