import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import type {
  ActOnProcurementApprovalRequest,
  AddAwardRecommendationBasisRequest,
  CreateAwardRecommendationRequest,
  RecordAwardDecisionRequest,
  SatisfyAwardConditionRequest,
} from '@cpos/contracts/procurement-decision';
import type {
  GovernedProcurementDecisionRequestContext,
  GovernedProcurementDecisionService,
} from '@cpos/platform-application/procurement-decision';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function singleHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

async function decisionContext(
  request: FastifyRequest,
  environment: string,
): Promise<GovernedProcurementDecisionRequestContext | undefined> {
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
  if (
    message.includes('not authorized') ||
    message.includes('required approval role') ||
    message.includes('does not hold') ||
    message.includes('permission denied') ||
    message.includes('row-level security')
  ) return 403;
  if (message.includes('not visible') || message.includes('does not exist') || message.includes('unavailable')) return 404;
  if (
    message.includes('only draft') ||
    message.includes('requires pending') ||
    message.includes('requires submitted') ||
    message.includes('requires approved') ||
    message.includes('requires recorded') ||
    message.includes('can only') ||
    message.includes('no longer') ||
    message.includes('expired') ||
    message.includes('stale') ||
    message.includes('immutable') ||
    message.includes('current procurementroutedecision')
  ) return 409;
  if (
    message.includes('invalid') ||
    message.includes('required') ||
    message.includes('requires') ||
    message.includes('must ') ||
    message.includes('cannot ') ||
    message.includes('under-competition') ||
    message.includes('non-lowest') ||
    message.includes('split') ||
    message.includes('sole-source')
  ) return 400;
  return 500;
}

export function registerProcurementDecisionRoutes(
  app: FastifyInstance,
  options: Readonly<{ environment: string; service: GovernedProcurementDecisionService }>,
): void {
  async function contextOr401(request: FastifyRequest, reply: FastifyReply) {
    const context = await decisionContext(request, options.environment);
    if (context === undefined) {
      void reply.status(401).send({ code: 'SESSION_REQUIRED' });
      return undefined;
    }
    return context;
  }

  app.get('/procurement/decision-candidates', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.listCandidates(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'DECISION_CANDIDATES_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/recommendations', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    try {
      return await options.service.list(context);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_LIST_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    if (
      !isObject(request.body) ||
      typeof request.body['comparisonSnapshotId'] !== 'string' ||
      typeof request.body['outcome'] !== 'string' ||
      typeof request.body['technicalConditionState'] !== 'string' ||
      typeof request.body['rationale'] !== 'string'
    ) return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_REQUEST' });
    try {
      const result = await options.service.create(context, request.body as unknown as CreateAwardRecommendationRequest);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/recommendations/:recommendationId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const recommendationId = (request.params as { readonly recommendationId?: unknown }).recommendationId;
    if (typeof recommendationId !== 'string') return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_ID' });
    try {
      const result = await options.service.read(context, recommendationId);
      return result === undefined ? reply.status(404).send({ code: 'RECOMMENDATION_NOT_FOUND' }) : result;
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations/:recommendationId/bases', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const recommendationId = (request.params as { readonly recommendationId?: unknown }).recommendationId;
    if (
      typeof recommendationId !== 'string' ||
      !isObject(request.body) ||
      typeof request.body['snapshotConfirmedBasisId'] !== 'string'
    ) return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_BASIS_REQUEST' });
    try {
      return reply.status(201).send(await options.service.addBasis(
        context,
        recommendationId,
        request.body as unknown as AddAwardRecommendationBasisRequest,
      ));
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_BASIS_REJECTED', requestId: request.id });
    }
  });

  app.delete('/procurement/recommendations/:recommendationId/bases/:recommendationSelectionId', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly recommendationId?: unknown; readonly recommendationSelectionId?: unknown };
    if (typeof params.recommendationId !== 'string' || typeof params.recommendationSelectionId !== 'string') {
      return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_BASIS_ID' });
    }
    try {
      return await options.service.removeBasis(context, params.recommendationId, params.recommendationSelectionId);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_BASIS_REMOVE_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations/:recommendationId/submit', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const recommendationId = (request.params as { readonly recommendationId?: unknown }).recommendationId;
    if (typeof recommendationId !== 'string') return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_ID' });
    try {
      return await options.service.submit(context, recommendationId);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_SUBMIT_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/approvals/:approvalCaseId/actions', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const approvalCaseId = (request.params as { readonly approvalCaseId?: unknown }).approvalCaseId;
    if (typeof approvalCaseId !== 'string' || !isObject(request.body) || typeof request.body['action'] !== 'string') {
      return reply.status(400).send({ code: 'INVALID_APPROVAL_ACTION_REQUEST' });
    }
    try {
      return await options.service.actOnApproval(
        context,
        approvalCaseId,
        request.body as unknown as ActOnProcurementApprovalRequest,
      );
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'APPROVAL_ACTION_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations/:recommendationId/award', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const recommendationId = (request.params as { readonly recommendationId?: unknown }).recommendationId;
    if (typeof recommendationId !== 'string' || (request.body !== undefined && !isObject(request.body))) {
      return reply.status(400).send({ code: 'INVALID_AWARD_DECISION_REQUEST' });
    }
    try {
      return reply.status(201).send(await options.service.recordAward(
        context,
        recommendationId,
        (request.body ?? {}) as RecordAwardDecisionRequest,
      ));
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'AWARD_DECISION_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations/:recommendationId/award/:awardDecisionId/conditions/:awardConditionId/satisfy', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as {
      readonly recommendationId?: unknown;
      readonly awardDecisionId?: unknown;
      readonly awardConditionId?: unknown;
    };
    if (
      typeof params.recommendationId !== 'string' ||
      typeof params.awardDecisionId !== 'string' ||
      typeof params.awardConditionId !== 'string' ||
      !isObject(request.body) ||
      !Array.isArray(request.body['evidenceRefs'])
    ) return reply.status(400).send({ code: 'INVALID_AWARD_CONDITION_REQUEST' });
    try {
      return await options.service.satisfyCondition(
        context,
        params.recommendationId,
        params.awardDecisionId,
        params.awardConditionId,
        request.body as unknown as SatisfyAwardConditionRequest,
      );
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'AWARD_CONDITION_REJECTED', requestId: request.id });
    }
  });

  app.post('/procurement/recommendations/:recommendationId/award/:awardDecisionId/effective-for-handoff', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const params = request.params as { readonly recommendationId?: unknown; readonly awardDecisionId?: unknown };
    if (typeof params.recommendationId !== 'string' || typeof params.awardDecisionId !== 'string') {
      return reply.status(400).send({ code: 'INVALID_AWARD_HANDOFF_REQUEST' });
    }
    try {
      return await options.service.makeEffectiveForHandoff(context, params.recommendationId, params.awardDecisionId);
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'AWARD_HANDOFF_REJECTED', requestId: request.id });
    }
  });
}
