import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import type { UpdateAwardRecommendationDraftRequest } from '@cpos/contracts/procurement-decision-draft';
import type {
  GovernedProcurementDecisionDraftService,
} from '@cpos/platform-application/procurement-decision-draft';
import type {
  GovernedProcurementDecisionRequestContext,
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
    message.includes('permission denied') ||
    message.includes('row-level security')
  ) return 403;
  if (message.includes('not visible') || message.includes('does not exist') || message.includes('unavailable')) return 404;
  if (
    message.includes('only draft') ||
    message.includes('can only') ||
    message.includes('no longer') ||
    message.includes('immutable')
  ) return 409;
  if (
    message.includes('invalid') ||
    message.includes('required') ||
    message.includes('must ') ||
    message.includes('cannot ') ||
    message.includes('under-competition') ||
    message.includes('non-lowest') ||
    message.includes('split') ||
    message.includes('sole-source')
  ) return 400;
  return 500;
}

export function registerProcurementDecisionDraftRoutes(
  app: FastifyInstance,
  options: Readonly<{ environment: string; service: GovernedProcurementDecisionDraftService }>,
): void {
  async function contextOr401(request: FastifyRequest, reply: FastifyReply) {
    const context = await decisionContext(request, options.environment);
    if (context === undefined) {
      void reply.status(401).send({ code: 'SESSION_REQUIRED' });
      return undefined;
    }
    return context;
  }

  app.put('/procurement/recommendations/:recommendationId/draft', async (request, reply) => {
    const context = await contextOr401(request, reply);
    if (context === undefined) return reply;
    const recommendationId = (request.params as { readonly recommendationId?: unknown }).recommendationId;
    if (
      typeof recommendationId !== 'string' ||
      !isObject(request.body) ||
      typeof request.body['outcome'] !== 'string' ||
      typeof request.body['technicalConditionState'] !== 'string' ||
      typeof request.body['rationale'] !== 'string'
    ) return reply.status(400).send({ code: 'INVALID_RECOMMENDATION_DRAFT_REQUEST' });

    try {
      return await options.service.updateDraft(
        context,
        recommendationId,
        request.body as unknown as UpdateAwardRecommendationDraftRequest,
      );
    } catch (error: unknown) {
      const status = statusFor(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'RECOMMENDATION_DRAFT_UPDATE_REJECTED', requestId: request.id });
    }
  });
}
