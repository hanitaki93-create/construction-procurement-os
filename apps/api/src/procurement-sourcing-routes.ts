import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import type { CreateProcurementPackageRequest, CreateRfqDraftRequest } from '@cpos/contracts';
import type {
  GovernedProcurementSourcingService,
  GovernedSourcingRequestContext,
} from '@cpos/platform-application/procurement-sourcing';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export interface SourcingAuthenticationSessionResolver {
  resolve(request: FastifyRequest): Promise<
    | Readonly<{
        authenticationIdentityId: string;
        tenantId: string;
        principalId: string;
      }>
    | undefined
  >;
}

function singleHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

async function sourcingContext(
  request: FastifyRequest,
  environment: string,
  resolver: SourcingAuthenticationSessionResolver | undefined,
): Promise<GovernedSourcingRequestContext | undefined> {
  if (resolver !== undefined) {
    const verified = await resolver.resolve(request);
    if (
      verified === undefined ||
      !uuidPattern.test(verified.tenantId) ||
      !uuidPattern.test(verified.principalId) ||
      !verified.authenticationIdentityId.trim()
    ) return undefined;
    return {
      ...verified,
      invocationId: request.id,
      serviceIdentity: 'cpos-api',
    };
  }
  if (environment === 'production' || singleHeader(request, 'x-cpos-session-mode') !== 'development') return undefined;
  const tenantId = singleHeader(request, 'x-cpos-tenant-id')?.trim();
  const principalId = singleHeader(request, 'x-cpos-principal-id')?.trim();
  const identity = singleHeader(request, 'x-cpos-authentication-identity-id')?.trim();
  if (!tenantId || !principalId || !uuidPattern.test(tenantId) || !uuidPattern.test(principalId)) return undefined;
  return {
    authenticationIdentityId: identity || `development:${principalId}`,
    tenantId,
    principalId,
    invocationId: request.id,
    serviceIdentity: 'cpos-api',
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function statusFor(error: unknown): 400 | 401 | 403 | 409 | 500 {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  if (message.includes('authentication identity')) return 401;
  if (message.includes('not authorized') || message.includes('permission denied') || message.includes('row-level security')) return 403;
  if (
    message.includes('duplicate') ||
    message.includes('conflict') ||
    message.includes('unique constraint') ||
    message.includes('exceeds governed') ||
    message.includes('exceeds remaining')
  ) return 409;
  if (
    message.includes('invalid') ||
    message.includes('must contain') ||
    message.includes('does not belong') ||
    message.includes('not approved') ||
    message.includes('not routed') ||
    message.includes('requires') ||
    message.includes('future date-time') ||
    message.includes('conflicting procurement policy')
  ) return 400;
  return 500;
}

export function registerProcurementSourcingRoutes(
  app: FastifyInstance,
  options: Readonly<{
    environment: string;
    service: GovernedProcurementSourcingService;
    authenticationSessionResolver?: SourcingAuthenticationSessionResolver;
  }>,
): void {
  async function contextOr401(request: FastifyRequest, reply: FastifyReply) {
    const context = await sourcingContext(request, options.environment, options.authenticationSessionResolver);
    if (context === undefined) {
      void reply.status(401).send({ code: 'SESSION_REQUIRED' });
      return undefined;
    }
    return context;
  }

  app.get('/procurement/sourcing/candidates', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.listCandidates(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SOURCING_CANDIDATES_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/packages', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.listPackages(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'PACKAGE_LIST_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/packages/:packageId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const packageId = (request.params as { readonly packageId?: unknown }).packageId;
    if (typeof packageId !== 'string') return reply.status(400).send({ code: 'INVALID_PACKAGE_ID' });
    try {
      const result = await options.service.readPackage(context, packageId);
      return result === undefined ? reply.status(404).send({ code: 'PACKAGE_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'PACKAGE_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/packages', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    if (!isObject(request.body) || typeof request.body['projectId'] !== 'string' || typeof request.body['title'] !== 'string' || !Array.isArray(request.body['sourceLines'])) {
      return reply.status(400).send({ code: 'INVALID_PACKAGE_REQUEST' });
    }
    try {
      const result = await options.service.createPackage(context, request.body as unknown as CreateProcurementPackageRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'PACKAGE_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/rfqs', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.listRfqs(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RFQ_LIST_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/rfqs/:rfqId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const rfqId = (request.params as { readonly rfqId?: unknown }).rfqId;
    if (typeof rfqId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_ID' });
    try {
      const result = await options.service.readRfq(context, rfqId);
      return result === undefined ? reply.status(404).send({ code: 'RFQ_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RFQ_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/rfqs', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    if (
      !isObject(request.body) ||
      typeof request.body['projectId'] !== 'string' ||
      typeof request.body['title'] !== 'string' ||
      typeof request.body['responseDueAt'] !== 'string' ||
      !Array.isArray(request.body['sourceLines']) ||
      !Array.isArray(request.body['bidderSupplierIds'])
    ) return reply.status(400).send({ code: 'INVALID_RFQ_REQUEST' });
    try {
      const result = await options.service.createRfqDraft(context, request.body as unknown as CreateRfqDraftRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RFQ_CREATE_REJECTED', requestId: request.id });
    }
  });
}