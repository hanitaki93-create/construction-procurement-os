import type {
  AwardRecommendationDetailResponse,
  RecommendationOutcome,
  TechnicalConditionState,
} from './procurement-decision.js';

export interface UpdateAwardRecommendationDraftRequest {
  readonly outcome: RecommendationOutcome;
  readonly technicalConditionState: TechnicalConditionState;
  readonly rationale: string;
  readonly nonLowestReason?: string;
  readonly splitOrSoleSourceReason?: string;
  readonly competitionExceptionReason?: string;
  readonly budgetBasisRefs?: readonly string[];
  readonly technicalDependencyRefs?: readonly string[];
  readonly eligibilityBasisRefs?: readonly string[];
  readonly supplierIntelligenceBasisRefs?: readonly string[];
  readonly risksDeviations?: readonly string[];
}

export type UpdateAwardRecommendationDraftResponse = AwardRecommendationDetailResponse;
