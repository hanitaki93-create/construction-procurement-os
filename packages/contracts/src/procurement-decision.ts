export type RecommendationStatus =
  | 'DRAFT'
  | 'READY_FOR_APPROVAL'
  | 'SUBMITTED'
  | 'RETURNED_FOR_REVISION'
  | 'APPROVED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'SUPERSEDED';

export type RecommendationOutcome =
  | 'SINGLE_SUPPLIER'
  | 'SPLIT_AWARD'
  | 'SOLE_SOURCE'
  | 'NO_AWARD'
  | 'RETENDER';

export type TechnicalConditionState =
  | 'CLEAR'
  | 'CONDITIONAL'
  | 'UNRESOLVED_BLOCKING'
  | 'NOT_APPLICABLE';

export type ApprovalCaseStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'APPROVED'
  | 'CONDITIONALLY_APPROVED'
  | 'REJECTED'
  | 'RETURNED'
  | 'CANCELLED'
  | 'SUPERSEDED';

export type ProcurementApprovalAction =
  | 'APPROVE'
  | 'APPROVE_WITH_CONDITIONS'
  | 'REJECT'
  | 'RETURN_FOR_REVISION';

export type AwardDecisionType = 'FULL' | 'SPLIT' | 'CONDITIONAL' | 'NO_AWARD';
export type AwardDecisionStatus =
  | 'DRAFT'
  | 'RECORDED'
  | 'EFFECTIVE_FOR_HANDOFF'
  | 'REVOKED'
  | 'SUPERSEDED'
  | 'CANCELLED';

export interface DecisionCandidateBasis {
  readonly snapshotConfirmedBasisId: string;
  readonly comparisonRowId: string;
  readonly comparisonBidderId: string;
  readonly rowNo: number;
  readonly rowKind: 'RFQ_LINE' | 'SUPPLIER_ADDED';
  readonly requirementDescription: string;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly supplierLegalName: string;
  readonly confirmationKind:
    | 'QUOTATION_REVISION'
    | 'CLARIFICATION_CONFIRMATION'
    | 'NEGOTIATED_BAFO'
    | 'WRITTEN_CONFIRMATION';
  readonly confirmedDescription: string;
  readonly confirmedQuantity: string | null;
  readonly confirmedUomCode: string | null;
  readonly confirmedUnitRate: string | null;
  readonly confirmedAmount: string;
  readonly currency: string;
  readonly confirmedTerms: Readonly<Record<string, string>>;
  readonly technicalStatusRefs: readonly string[];
  readonly quotationValidityUntil: string | null;
}

export interface DecisionCandidateComparison {
  readonly comparisonSnapshotId: string;
  readonly comparisonId: string;
  readonly comparisonNumber: string;
  readonly rfqIssueId: string;
  readonly rfqNumber: string;
  readonly projectId: string;
  readonly projectCode: string;
  readonly title: string;
  readonly baseCurrency: string;
  readonly frozenAt: string;
  readonly requirementRowCount: number;
  readonly bidderCount: number;
  readonly bases: readonly DecisionCandidateBasis[];
}

export interface DecisionCandidatesResponse {
  readonly comparisons: readonly DecisionCandidateComparison[];
}

export interface CreateAwardRecommendationRequest {
  readonly comparisonSnapshotId: string;
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
  readonly supersedesRecommendationId?: string;
}

export interface AddAwardRecommendationBasisRequest {
  readonly snapshotConfirmedBasisId: string;
  readonly scopePartitionNote?: string;
}

export interface ActOnProcurementApprovalRequest {
  readonly action: ProcurementApprovalAction;
  readonly conditions?: string;
  readonly comments?: string;
}

export interface RecordAwardDecisionRequest {
  readonly decisionJustification?: string;
}

export interface SatisfyAwardConditionRequest {
  readonly evidenceRefs: readonly string[];
}

export interface RecommendationSelection {
  readonly recommendationSelectionId: string;
  readonly snapshotConfirmedBasisId: string;
  readonly comparisonRowId: string;
  readonly comparisonBidderId: string;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly supplierLegalName: string;
  readonly confirmedBasisId: string;
  readonly confirmedAmount: string;
  readonly currency: string;
  readonly scopePartitionNote: string | null;
}

export interface RecommendationRouteBasis {
  readonly routeDecisionId: string;
  readonly mrLineId: string;
  readonly policyKey: string;
  readonly policyVersion: number;
  readonly route:
    | 'COMPETITIVE_RFQ'
    | 'DIRECT_ORDER'
    | 'PACKAGE_SOURCING'
    | 'SOLE_SOURCE_EXCEPTION'
    | 'EXTERNAL_ERP_STOCK';
  readonly justification: string | null;
}

export interface ApprovalActionOccurrence {
  readonly approvalActionOccurrenceId: string;
  readonly sequence: number;
  readonly action: ProcurementApprovalAction;
  readonly conditions: string | null;
  readonly comments: string | null;
  readonly currentGateFacts: Readonly<Record<string, unknown>>;
  readonly actionBy: string;
  readonly actionByDisplayName: string;
  readonly actionAt: string;
}

export interface ApprovalCaseDetail {
  readonly approvalCaseId: string;
  readonly policyKey: string;
  readonly policyVersion: number;
  readonly requiredRoleKey: string;
  readonly status: ApprovalCaseStatus;
  readonly monetaryBasis: string | null;
  readonly monetaryCurrency: string | null;
  readonly requiredApprovers: readonly Readonly<Record<string, unknown>>[];
  readonly ballInCourt: readonly Readonly<Record<string, unknown>>[];
  readonly requiredEvidence: readonly string[];
  readonly createdAt: string;
  readonly resolvedAt: string | null;
  readonly actions: readonly ApprovalActionOccurrence[];
}

export interface AwardConditionDetail {
  readonly awardConditionId: string;
  readonly conditionNo: number;
  readonly conditionText: string;
  readonly sourceApprovalActionOccurrenceId: string;
  readonly satisfied: boolean;
  readonly evidenceRefs: readonly string[];
  readonly satisfiedBy: string | null;
  readonly satisfiedByDisplayName: string | null;
  readonly satisfiedAt: string | null;
}

export interface AwardDecisionDetail {
  readonly awardDecisionId: string;
  readonly awardNumber: string;
  readonly awardType: AwardDecisionType;
  readonly status: AwardDecisionStatus;
  readonly decisionJustification: string;
  readonly transitionGateFacts: Readonly<Record<string, unknown>>;
  readonly decisionBy: string;
  readonly decisionByDisplayName: string;
  readonly decisionAt: string;
  readonly effectiveForHandoffBy: string | null;
  readonly effectiveForHandoffAt: string | null;
  readonly conditions: readonly AwardConditionDetail[];
}

export interface AwardRecommendationDetail {
  readonly recommendationId: string;
  readonly recommendationNumber: string | null;
  readonly projectId: string;
  readonly projectCode: string;
  readonly rfqIssueId: string;
  readonly rfqNumber: string;
  readonly comparisonSnapshotId: string;
  readonly comparisonNumber: string;
  readonly supersedesRecommendationId: string | null;
  readonly status: RecommendationStatus;
  readonly outcome: RecommendationOutcome;
  readonly technicalConditionState: TechnicalConditionState;
  readonly currency: string | null;
  readonly recommendedValue: string | null;
  readonly competitionInvited: number | null;
  readonly competitionValidResponses: number | null;
  readonly competitionComparableResponses: number | null;
  readonly competitionRequirement: number;
  readonly competitionExceptionReason: string | null;
  readonly rationale: string;
  readonly nonLowestReason: string | null;
  readonly splitOrSoleSourceReason: string | null;
  readonly budgetBasisRefs: readonly string[];
  readonly technicalDependencyRefs: readonly string[];
  readonly eligibilityBasisRefs: readonly string[];
  readonly supplierIntelligenceBasisRefs: readonly string[];
  readonly risksDeviations: readonly string[];
  readonly preparedBy: string | null;
  readonly preparedByDisplayName: string | null;
  readonly preparedAt: string | null;
  readonly createdAt: string;
  readonly submittedAt: string | null;
  readonly resolvedAt: string | null;
  readonly selections: readonly RecommendationSelection[];
  readonly routeBasis: readonly RecommendationRouteBasis[];
  readonly approvalCase: ApprovalCaseDetail | null;
  readonly awardDecision: AwardDecisionDetail | null;
}

export interface AwardRecommendationRegisterRow {
  readonly recommendationId: string;
  readonly recommendationNumber: string | null;
  readonly projectCode: string;
  readonly rfqNumber: string;
  readonly comparisonNumber: string;
  readonly status: RecommendationStatus;
  readonly outcome: RecommendationOutcome;
  readonly technicalConditionState: TechnicalConditionState;
  readonly recommendedValue: string | null;
  readonly currency: string | null;
  readonly supplierCount: number;
  readonly approvalStatus: ApprovalCaseStatus | null;
  readonly awardNumber: string | null;
  readonly awardStatus: AwardDecisionStatus | null;
  readonly createdAt: string;
}

export interface AwardRecommendationRegisterResponse {
  readonly recommendations: readonly AwardRecommendationRegisterRow[];
}

export interface AwardRecommendationDetailResponse {
  readonly recommendation: AwardRecommendationDetail;
}

export interface CreateAwardRecommendationResponse {
  readonly recommendation: AwardRecommendationDetail;
}

export interface SubmitAwardRecommendationResponse {
  readonly approvalCaseId: string;
  readonly recommendation: AwardRecommendationDetail;
}

export interface ApprovalActionResponse {
  readonly approvalStatus: ApprovalCaseStatus;
  readonly recommendation: AwardRecommendationDetail;
}

export interface RecordAwardDecisionResponse {
  readonly awardDecisionId: string;
  readonly recommendation: AwardRecommendationDetail;
}
