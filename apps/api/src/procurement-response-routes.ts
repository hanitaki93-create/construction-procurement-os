import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import type {
  CreateSupplierQuotationRequest,
  RecordSupplierIntentRequest,
} from '@cpos/contracts/procurement-responses';
import type {
  GovernedProcurementResponseRequestContext,
  GovernedProcurementResponseService,
} from '@cpos/platform-application/procurement-responses';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export interface ResponseAuthenticationSessionResolver {
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

async function responseContext(
  request: FastifyRequest,
  environment: string,
  resolver: ResponseAuthenticationSessionResolver | undefined,
): Promise<GovernedProcurementResponseRequestContext | undefined> {
  if (resolver !== undefined) {
    const verified = await resolver.resolve(request);
    if (
      verified === undefined ||
      !uuidPattern.test(verified.tenantId) ||
      !uuidPattern.test(verified.principalId) ||
      !verified.authenticationIdentityId.trim()
    ) return undefined;
    return { ...verified, invocationId: request.id, serviceIdentity: 'cpos-api' };
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

function statusFor(error: unknown): 400 | 401 | 403 | 404 | 409 | 500 {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  if (message.includes('authentication identity')) return 401;
  if (message.includes('not authorized') || message.includes('permission denied') || message.includes('row-level security')) return 403;
  if (message.includes('not visible in this tenant')) return 404;
  if (
    message.includes('must be issued') ||
    message.includes('not in an issuable state') ||
    message.includes('currently recorded as no_bid') ||
    message.includes('not invited') ||
    message.includes('immutable') ||
    message.includes('revision must append') ||
    message.includes('unique constraint')
  ) return 409;
  if (
    message.includes('invalid') ||
    message.includes('must contain') ||
    message.includes('cannot be') ||
    message.includes('without') ||
    message.includes('maps outside') ||
    message.includes('does not exist')
  ) return 400;
  return 500;
}

export function registerProcurementResponseRoutes(
  app: FastifyInstance,
  options: Readonly<{
    environment: string;
    service: GovernedProcurementResponseService;
    authenticationSessionResolver?: ResponseAuthenticationSessionResolver;
  }>,
): void {
  async function contextOr401(request: FastifyRequest, reply: FastifyReply) {
    const context = await responseContext(request, options.environment, options.authenticationSessionResolver);
    if (context === undefined) {
      void reply.status(401).send({ code: 'SESSION_REQUIRED' });
      return undefined;
    }
    return context;
  }

  app.post('/procurement/rfqs/:rfqId/issue', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const rfqId = (request.params as { readonly rfqId?: unknown }).rfqId;
    if (typeof rfqId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_ID' });
    try {
      const result = await options.service.issueRfq(context, rfqId);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RFQ_ISSUE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/rfqs/:rfqId/issue', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const rfqId = (request.params as { readonly rfqId?: unknown }).rfqId;
    if (typeof rfqId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_ID' });
    try {
      const result = await options.service.readLatestIssue(context, rfqId);
      return result === undefined ? reply.status(404).send({ code: 'RFQ_ISSUE_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RFQ_ISSUE_READ_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/responses', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const rawRfqId = (request.query as { readonly rfqId?: unknown }).rfqId;
    if (rawRfqId !== undefined && typeof rawRfqId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_ID' });
    try {
      return await options.service.listResponses(context, rawRfqId);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_RESPONSE_LIST_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/rfqs/:rfqId/bidders/:rfqBidderId/intent', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly rfqId?: unknown; readonly rfqBidderId?: unknown };
    if (typeof params.rfqId !== 'string' || typeof params.rfqBidderId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_BIDDER_ID' });
    if (!isObject(request.body) || typeof request.body['intent'] !== 'string' || typeof request.body['channel'] !== 'string') {
      return reply.status(400).send({ code: 'INVALID_SUPPLIER_INTENT_REQUEST' });
    }
    try {
      const result = await options.service.recordIntent(context, params.rfqId, params.rfqBidderId, request.body as unknown as RecordSupplierIntentRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_INTENT_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/rfqs/:rfqId/bidders/:rfqBidderId/quotations', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly rfqId?: unknown; readonly rfqBidderId?: unknown };
    if (typeof params.rfqId !== 'string' || typeof params.rfqBidderId !== 'string') return reply.status(400).send({ code: 'INVALID_RFQ_BIDDER_ID' });
    if (
      !isObject(request.body) ||
      typeof request.body['responseChannel'] !== 'string' ||
      typeof request.body['captureMode'] !== 'string' ||
      typeof request.body['currency'] !== 'string' ||
      !Array.isArray(request.body['lines'])
    ) return reply.status(400).send({ code: 'INVALID_SUPPLIER_QUOTATION_REQUEST' });
    try {
      const result = await options.service.createQuotation(context, params.rfqId, params.rfqBidderId, request.body as unknown as CreateSupplierQuotationRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_QUOTATION_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/quotations/:quotationRevisionId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const quotationRevisionId = (request.params as { readonly quotationRevisionId?: unknown }).quotationRevisionId;
    if (typeof quotationRevisionId !== 'string') return reply.status(400).send({ code: 'INVALID_QUOTATION_REVISION_ID' });
    try {
      const result = await options.service.readQuotation(context, quotationRevisionId);
      return result === undefined ? reply.status(404).send({ code: 'SUPPLIER_QUOTATION_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'SUPPLIER_QUOTATION_READ_REJECTED', requestId: request.id });
    }
  });
}
