import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import type {
  AddComparisonAdjustmentRequest,
  AddComparisonRowRequest,
  ConfirmComparisonBasisRequest,
  CreateBidComparisonRequest,
  UpsertComparisonCellRequest,
} from '@cpos/contracts/procurement-comparison';
import type {
  GovernedProcurementComparisonRequestContext,
  GovernedProcurementComparisonService,
} from '@cpos/platform-application/procurement-comparison';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function singleHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

async function comparisonContext(request: FastifyRequest, environment: string): Promise<GovernedProcurementComparisonRequestContext | undefined> {
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
  if (message.includes('immutable') || message.includes('frozen') || message.includes('cannot select') || message.includes('cannot be selected') || message.includes('unique constraint') || message.includes('rebase') || message.includes('supersede')) return 409;
  if (message.includes('invalid') || message.includes('must contain') || message.includes('must belong') || message.includes('requires') || message.includes('required') || message.includes('does not exist') || message.includes('cannot bind') || message.includes('must be provided')) return 400;
  return 500;
}

export function registerProcurementComparisonRoutes(
  app: FastifyInstance,
  options: Readonly<{ environment: string; service: GovernedProcurementComparisonService }>,
): void {
  async function contextOr401(request: FastifyRequest, reply: FastifyReply) {
    const context = await comparisonContext(request, options.environment);
    if (context === undefined) {
      void reply.status(401).send({ code: 'SESSION_REQUIRED' });
      return undefined;
    }
    return context;
  }

  app.get('/procurement/comparisons', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.list(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_LIST_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/comparisons', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    if (!isObject(request.body) || typeof request.body['rfqIssueId'] !== 'string' || typeof request.body['title'] !== 'string' || typeof request.body['baseCurrency'] !== 'string' || !Array.isArray(request.body['bidders'])) {
      return reply.status(400).send({ code: 'INVALID_COMPARISON_REQUEST' });
    }
    try {
      const result = await options.service.create(context, request.body as unknown as CreateBidComparisonRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/comparisons/:comparisonId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const comparisonId = (request.params as { readonly comparisonId?: unknown }).comparisonId;
    if (typeof comparisonId !== 'string') return reply.status(400).send({ code: 'INVALID_COMPARISON_ID' });
    try {
      const result = await options.service.read(context, comparisonId);
      return result === undefined ? reply.status(404).send({ code: 'COMPARISON_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/comparisons/:comparisonId/rows', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const comparisonId = (request.params as { readonly comparisonId?: unknown }).comparisonId;
    if (typeof comparisonId !== 'string' || !isObject(request.body) || typeof request.body['rowKind'] !== 'string' || typeof request.body['description'] !== 'string') return reply.status(400).send({ code: 'INVALID_COMPARISON_ROW_REQUEST' });
    try {
      return reply.status(201).send(await options.service.addRow(context, comparisonId, request.body as unknown as AddComparisonRowRequest));
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_ROW_REJECTED', requestId: request.id });
    }
  });

  app.put('/procurement/comparisons/:comparisonId/rows/:rowId/bidders/:bidderId/cell', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly comparisonId?: unknown; readonly rowId?: unknown; readonly bidderId?: unknown };
    if (typeof params.comparisonId !== 'string' || typeof params.rowId !== 'string' || typeof params.bidderId !== 'string' || !isObject(request.body) || typeof request.body['coverageStatus'] !== 'string') return reply.status(400).send({ code: 'INVALID_COMPARISON_CELL_REQUEST' });
    try {
      return await options.service.upsertCell(context, params.comparisonId, params.rowId, params.bidderId, request.body as unknown as UpsertComparisonCellRequest);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_CELL_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/comparisons/:comparisonId/cells/:cellId/adjustments', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly comparisonId?: unknown; readonly cellId?: unknown };
    if (typeof params.comparisonId !== 'string' || typeof params.cellId !== 'string' || !isObject(request.body) || typeof request.body['adjustmentType'] !== 'string' || typeof request.body['adjustmentAmount'] !== 'string' || typeof request.body['reason'] !== 'string') return reply.status(400).send({ code: 'INVALID_COMPARISON_ADJUSTMENT_REQUEST' });
    try {
      return reply.status(201).send(await options.service.addAdjustment(context, params.comparisonId, params.cellId, request.body as unknown as AddComparisonAdjustmentRequest));
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_ADJUSTMENT_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/comparisons/:comparisonId/rows/:rowId/bidders/:bidderId/confirmed-basis', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly comparisonId?: unknown; readonly rowId?: unknown; readonly bidderId?: unknown };
    if (
      typeof params.comparisonId !== 'string' ||
      typeof params.rowId !== 'string' ||
      typeof params.bidderId !== 'string' ||
      !isObject(request.body) ||
      typeof request.body['confirmationKind'] !== 'string' ||
      typeof request.body['confirmedDescription'] !== 'string' ||
      typeof request.body['confirmedAmount'] !== 'string' ||
      typeof request.body['currency'] !== 'string'
    ) {
      return reply.status(400).send({ code: 'INVALID_COMPARISON_CONFIRMED_BASIS_REQUEST' });
    }
    try {
      return reply.status(201).send(await options.service.confirmBasis(
        context,
        params.comparisonId,
        params.rowId,
        params.bidderId,
        request.body as unknown as ConfirmComparisonBasisRequest,
      ));
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_CONFIRMED_BASIS_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/comparisons/:comparisonId/freeze', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const comparisonId = (request.params as { readonly comparisonId?: unknown }).comparisonId;
    if (typeof comparisonId !== 'string') return reply.status(400).send({ code: 'INVALID_COMPARISON_ID' });
    try {
      return await options.service.freeze(context, comparisonId);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'COMPARISON_FREEZE_REJECTED', requestId: request.id });
    }
  });
}
