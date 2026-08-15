import type { AwardRecommendationDetailResponse } from '@cpos/contracts/procurement-decision';
import type { UpdateAwardRecommendationDraftRequest } from '@cpos/contracts/procurement-decision-draft';
import type { DatabaseRuntime } from '@cpos/database-core';

import type {
  GovernedProcurementDecisionRequestContext,
  GovernedProcurementDecisionService,
} from './procurement-decision.js';
import {
  procurementDecisionDraftPersistence,
  type ProcurementDecisionDraftPersistenceHandle,
} from './persistence/procurement-decision-draft-persistence.js';

export interface GovernedProcurementDecisionDraftService {
  updateDraft(
    context: GovernedProcurementDecisionRequestContext,
    recommendationId: string,
    request: UpdateAwardRecommendationDraftRequest,
  ): Promise<AwardRecommendationDetailResponse>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const outcomes = new Set(['SINGLE_SUPPLIER', 'SPLIT_AWARD', 'SOLE_SOURCE', 'NO_AWARD', 'RETENDER']);
const technicalStates = new Set(['CLEAR', 'CONDITIONAL', 'UNRESOLVED_BLOCKING', 'NOT_APPLICABLE']);

function requireUuid(value: string, label: string): string {
  const normalized = value.trim();
  if (!uuidPattern.test(normalized)) throw new Error(`${label} is invalid`);
  return normalized;
}

function requiredText(value: string, label: string, max: number): string {
  const normalized = value.trim();
  if (normalized.length < 1 || normalized.length > max) throw new Error(`${label} is invalid`);
  return normalized;
}

function optionalText(value: string | undefined, label: string, max: number): string | null {
  if (value === undefined || value.trim().length === 0) return null;
  return requiredText(value, label, max);
}

function referenceArray(values: readonly string[] | undefined, label: string): readonly string[] {
  if (values === undefined) return [];
  if (values.length > 100) throw new Error(`${label} contains too many references`);
  return values.map((value) => requiredText(value, label, 1000));
}

function transactionContext(context: GovernedProcurementDecisionRequestContext) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey: 'procurement.decision.recommendation.draft.update.v1',
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

export function createGovernedProcurementDecisionDraftService(
  database: DatabaseRuntime,
  decisionService: GovernedProcurementDecisionService,
): GovernedProcurementDecisionDraftService {
  return Object.freeze<GovernedProcurementDecisionDraftService>({
    async updateDraft(context, recommendationId, request): Promise<AwardRecommendationDetailResponse> {
      const id = requireUuid(recommendationId, 'recommendationId');
      if (!outcomes.has(request.outcome)) throw new Error('outcome is invalid');
      if (!technicalStates.has(request.technicalConditionState)) throw new Error('technicalConditionState is invalid');

      const input = {
        recommendationId: id,
        outcome: request.outcome,
        technicalConditionState: request.technicalConditionState,
        rationale: requiredText(request.rationale, 'rationale', 8000),
        nonLowestReason: optionalText(request.nonLowestReason, 'nonLowestReason', 4000),
        splitOrSoleSourceReason: optionalText(request.splitOrSoleSourceReason, 'splitOrSoleSourceReason', 4000),
        competitionExceptionReason: optionalText(request.competitionExceptionReason, 'competitionExceptionReason', 4000),
        budgetBasisRefsJson: JSON.stringify(referenceArray(request.budgetBasisRefs, 'budgetBasisRefs')),
        technicalDependencyRefsJson: JSON.stringify(referenceArray(request.technicalDependencyRefs, 'technicalDependencyRefs')),
        eligibilityBasisRefsJson: JSON.stringify(referenceArray(request.eligibilityBasisRefs, 'eligibilityBasisRefs')),
        supplierIntelligenceBasisRefsJson: JSON.stringify(referenceArray(request.supplierIntelligenceBasisRefs, 'supplierIntelligenceBasisRefs')),
        risksDeviationsJson: JSON.stringify(referenceArray(request.risksDeviations, 'risksDeviations')),
      };

      await database.withExecutionContext(
        transactionContext(context),
        { isolation: 'SERIALIZABLE', logicalIdentity: context.invocationId },
        procurementDecisionDraftPersistence,
        async (handle: ProcurementDecisionDraftPersistenceHandle) => {
          if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
            throw new Error('verified authentication identity is not bound to this tenant principal');
          }
          await handle.updateDraft(input);
        },
      );

      const refreshed = await decisionService.read(
        { ...context, invocationId: `${context.invocationId}:draft-read` },
        id,
      );
      if (refreshed === undefined) throw new Error('award recommendation is not visible after draft update');
      return refreshed;
    },
  });
}
