import type {
  ActOnProcurementApprovalRequest,
  AddAwardRecommendationBasisRequest,
  ApprovalActionResponse,
  ApprovalCaseDetail,
  AwardConditionDetail,
  AwardDecisionDetail,
  AwardRecommendationDetail,
  AwardRecommendationDetailResponse,
  AwardRecommendationRegisterResponse,
  CreateAwardRecommendationRequest,
  CreateAwardRecommendationResponse,
  DecisionCandidateComparison,
  DecisionCandidatesResponse,
  ProcurementApprovalAction,
  RecordAwardDecisionRequest,
  RecordAwardDecisionResponse,
  RecommendationRouteBasis,
  RecommendationSelection,
  SatisfyAwardConditionRequest,
  SubmitAwardRecommendationResponse,
} from '@cpos/contracts/procurement-decision';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  procurementDecisionPersistence,
  type ApprovalActionRowDb,
  type ApprovalCaseRowDb,
  type AwardConditionRowDb,
  type AwardDecisionRowDb,
  type DecisionCandidateBasisRowDb,
  type ProcurementDecisionPersistenceHandle,
  type RecommendationHeaderRowDb,
  type RecommendationRouteBasisRowDb,
  type RecommendationSelectionRowDb,
} from './persistence/procurement-decision-persistence.js';

export interface GovernedProcurementDecisionRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementDecisionService {
  listCandidates(context: GovernedProcurementDecisionRequestContext): Promise<DecisionCandidatesResponse>;
  list(context: GovernedProcurementDecisionRequestContext): Promise<AwardRecommendationRegisterResponse>;
  create(context: GovernedProcurementDecisionRequestContext, request: CreateAwardRecommendationRequest): Promise<CreateAwardRecommendationResponse>;
  read(context: GovernedProcurementDecisionRequestContext, recommendationId: string): Promise<AwardRecommendationDetailResponse | undefined>;
  addBasis(context: GovernedProcurementDecisionRequestContext, recommendationId: string, request: AddAwardRecommendationBasisRequest): Promise<AwardRecommendationDetailResponse>;
  removeBasis(context: GovernedProcurementDecisionRequestContext, recommendationId: string, recommendationSelectionId: string): Promise<AwardRecommendationDetailResponse>;
  submit(context: GovernedProcurementDecisionRequestContext, recommendationId: string): Promise<SubmitAwardRecommendationResponse>;
  actOnApproval(context: GovernedProcurementDecisionRequestContext, approvalCaseId: string, request: ActOnProcurementApprovalRequest): Promise<ApprovalActionResponse>;
  recordAward(context: GovernedProcurementDecisionRequestContext, recommendationId: string, request: RecordAwardDecisionRequest): Promise<RecordAwardDecisionResponse>;
  satisfyCondition(context: GovernedProcurementDecisionRequestContext, recommendationId: string, awardDecisionId: string, awardConditionId: string, request: SatisfyAwardConditionRequest): Promise<AwardRecommendationDetailResponse>;
  makeEffectiveForHandoff(context: GovernedProcurementDecisionRequestContext, recommendationId: string, awardDecisionId: string): Promise<AwardRecommendationDetailResponse>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const outcomes = new Set(['SINGLE_SUPPLIER', 'SPLIT_AWARD', 'SOLE_SOURCE', 'NO_AWARD', 'RETENDER']);
const technicalStates = new Set(['CLEAR', 'CONDITIONAL', 'UNRESOLVED_BLOCKING', 'NOT_APPLICABLE']);
const approvalActions = new Set<ProcurementApprovalAction>(['APPROVE', 'APPROVE_WITH_CONDITIONS', 'REJECT', 'RETURN_FOR_REVISION']);

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

function transactionContext(context: GovernedProcurementDecisionRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function selection(row: RecommendationSelectionRowDb): RecommendationSelection {
  return {
    recommendationSelectionId: row.recommendation_selection_id,
    snapshotConfirmedBasisId: row.snapshot_confirmed_basis_id,
    comparisonRowId: row.comparison_row_id,
    comparisonBidderId: row.comparison_bidder_id,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierLegalName: row.supplier_legal_name,
    confirmedBasisId: row.confirmed_basis_id,
    confirmedAmount: row.confirmed_amount,
    currency: row.currency,
    scopePartitionNote: row.scope_partition_note,
  };
}

function routeBasis(row: RecommendationRouteBasisRowDb): RecommendationRouteBasis {
  return {
    routeDecisionId: row.route_decision_id,
    mrLineId: row.mr_line_id,
    policyKey: row.policy_key,
    policyVersion: row.policy_version,
    route: row.route,
    justification: row.justification,
  };
}

function approvalAction(row: ApprovalActionRowDb) {
  return {
    approvalActionOccurrenceId: row.approval_action_occurrence_id,
    sequence: row.sequence,
    action: row.action,
    conditions: row.conditions,
    comments: row.comments,
    currentGateFacts: row.current_gate_facts,
    actionBy: row.action_by,
    actionByDisplayName: row.action_by_display_name,
    actionAt: row.action_at,
  } as const;
}

async function approvalCase(
  handle: ProcurementDecisionPersistenceHandle,
  row: ApprovalCaseRowDb,
): Promise<ApprovalCaseDetail> {
  return {
    approvalCaseId: row.approval_case_id,
    policyKey: row.approval_policy_key,
    policyVersion: row.approval_policy_version,
    requiredRoleKey: row.required_role_key,
    status: row.status,
    monetaryBasis: row.monetary_basis,
    monetaryCurrency: row.monetary_currency,
    requiredApprovers: row.required_approvers,
    ballInCourt: row.ball_in_court,
    requiredEvidence: row.required_evidence,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at,
    actions: (await handle.approvalActions(row.approval_case_id)).map(approvalAction),
  };
}

function condition(row: AwardConditionRowDb): AwardConditionDetail {
  return {
    awardConditionId: row.award_condition_id,
    conditionNo: row.condition_no,
    conditionText: row.condition_text,
    sourceApprovalActionOccurrenceId: row.source_approval_action_occurrence_id,
    satisfied: row.satisfied,
    evidenceRefs: row.evidence_refs,
    satisfiedBy: row.satisfied_by,
    satisfiedByDisplayName: row.satisfied_by_display_name,
    satisfiedAt: row.satisfied_at,
  };
}

async function awardDecision(
  handle: ProcurementDecisionPersistenceHandle,
  row: AwardDecisionRowDb,
): Promise<AwardDecisionDetail> {
  return {
    awardDecisionId: row.award_decision_id,
    awardNumber: row.award_number,
    awardType: row.award_type,
    status: row.status,
    decisionJustification: row.decision_justification,
    transitionGateFacts: row.transition_gate_facts,
    decisionBy: row.decision_by,
    decisionByDisplayName: row.decision_by_display_name,
    decisionAt: row.decision_at,
    effectiveForHandoffBy: row.effective_for_handoff_by,
    effectiveForHandoffAt: row.effective_for_handoff_at,
    conditions: (await handle.awardConditions(row.award_decision_id)).map(condition),
  };
}

async function detail(
  handle: ProcurementDecisionPersistenceHandle,
  header: RecommendationHeaderRowDb,
): Promise<AwardRecommendationDetail> {
  const [selections, routes, approvalRow, awardRow] = await Promise.all([
    handle.recommendationSelections(header.recommendation_id),
    handle.recommendationRouteBasis(header.recommendation_id),
    header.approval_case_id === null ? Promise.resolve(undefined) : handle.approvalCase(header.approval_case_id),
    handle.awardDecision(header.recommendation_id),
  ]);
  return {
    recommendationId: header.recommendation_id,
    recommendationNumber: header.recommendation_number,
    projectId: header.project_id,
    projectCode: header.project_code,
    rfqIssueId: header.rfq_issue_id,
    rfqNumber: header.rfq_number,
    comparisonSnapshotId: header.comparison_snapshot_id,
    comparisonNumber: header.comparison_number,
    supersedesRecommendationId: header.supersedes_recommendation_id,
    status: header.status,
    outcome: header.outcome,
    technicalConditionState: header.technical_condition_state,
    currency: header.currency,
    recommendedValue: header.recommended_value,
    competitionInvited: header.competition_invited,
    competitionValidResponses: header.competition_valid_responses,
    competitionComparableResponses: header.competition_comparable_responses,
    competitionRequirement: header.competition_requirement,
    competitionExceptionReason: header.competition_exception_reason,
    rationale: header.rationale,
    nonLowestReason: header.non_lowest_reason,
    splitOrSoleSourceReason: header.split_or_sole_source_reason,
    budgetBasisRefs: header.budget_basis_refs,
    technicalDependencyRefs: header.technical_dependency_refs,
    eligibilityBasisRefs: header.eligibility_basis_refs,
    supplierIntelligenceBasisRefs: header.supplier_intelligence_basis_refs,
    risksDeviations: header.risks_deviations,
    preparedBy: header.prepared_by,
    preparedByDisplayName: header.prepared_by_display_name,
    preparedAt: header.prepared_at,
    createdAt: header.created_at,
    submittedAt: header.submitted_at,
    resolvedAt: header.resolved_at,
    selections: selections.map(selection),
    routeBasis: routes.map(routeBasis),
    approvalCase: approvalRow === undefined ? null : await approvalCase(handle, approvalRow),
    awardDecision: awardRow === undefined ? null : await awardDecision(handle, awardRow),
  };
}

function candidateBasis(row: DecisionCandidateBasisRowDb) {
  return {
    snapshotConfirmedBasisId: row.snapshot_confirmed_basis_id,
    comparisonRowId: row.comparison_row_id,
    comparisonBidderId: row.comparison_bidder_id,
    rowNo: row.row_no,
    rowKind: row.row_kind,
    requirementDescription: row.requirement_description,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierLegalName: row.supplier_legal_name,
    confirmationKind: row.confirmation_kind,
    confirmedDescription: row.confirmed_description,
    confirmedQuantity: row.confirmed_quantity,
    confirmedUomCode: row.confirmed_uom_code,
    confirmedUnitRate: row.confirmed_unit_rate,
    confirmedAmount: row.confirmed_amount,
    currency: row.currency,
    confirmedTerms: row.confirmed_terms,
    technicalStatusRefs: row.technical_status_refs,
    quotationValidityUntil: row.quotation_validity_until,
  } as const;
}

export function createGovernedProcurementDecisionService(database: DatabaseRuntime): GovernedProcurementDecisionService {
  async function use<Result>(
    context: GovernedProcurementDecisionRequestContext,
    operationKey: string,
    write: boolean,
    callback: (handle: ProcurementDecisionPersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: write ? 'SERIALIZABLE' : 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementDecisionPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  async function readRequired(handle: ProcurementDecisionPersistenceHandle, recommendationId: string) {
    const header = await handle.recommendationHeader(recommendationId);
    if (header === undefined) throw new Error('award recommendation is not visible in this tenant');
    return detail(handle, header);
  }

  return Object.freeze({
    async listCandidates(context): Promise<DecisionCandidatesResponse> {
      return use(context, 'procurement.decision.candidates.list.v1', false, async (handle) => {
        const snapshots = await handle.listCandidates();
        const comparisons: DecisionCandidateComparison[] = [];
        for (const row of snapshots) {
          comparisons.push({
            comparisonSnapshotId: row.comparison_snapshot_id,
            comparisonId: row.comparison_id,
            comparisonNumber: row.comparison_number,
            rfqIssueId: row.rfq_issue_id,
            rfqNumber: row.rfq_number,
            projectId: row.project_id,
            projectCode: row.project_code,
            title: row.title,
            baseCurrency: row.base_currency,
            frozenAt: row.frozen_at,
            requirementRowCount: row.requirement_row_count,
            bidderCount: row.bidder_count,
            bases: (await handle.candidateBasis(row.comparison_snapshot_id)).map(candidateBasis),
          });
        }
        return { comparisons };
      });
    },

    async list(context): Promise<AwardRecommendationRegisterResponse> {
      return use(context, 'procurement.decision.recommendation.list.v1', false, async (handle) => ({
        recommendations: (await handle.listRecommendations()).map((row) => ({
          recommendationId: row.recommendation_id,
          recommendationNumber: row.recommendation_number,
          projectCode: row.project_code,
          rfqNumber: row.rfq_number,
          comparisonNumber: row.comparison_number,
          status: row.status,
          outcome: row.outcome,
          technicalConditionState: row.technical_condition_state,
          recommendedValue: row.recommended_value,
          currency: row.currency,
          supplierCount: row.supplier_count,
          approvalStatus: row.approval_status,
          awardNumber: row.award_number,
          awardStatus: row.award_status,
          createdAt: row.created_at,
        })),
      }));
    },

    async create(context, request): Promise<CreateAwardRecommendationResponse> {
      const comparisonSnapshotId = requireUuid(request.comparisonSnapshotId, 'comparisonSnapshotId');
      if (!outcomes.has(request.outcome)) throw new Error('outcome is invalid');
      if (!technicalStates.has(request.technicalConditionState)) throw new Error('technicalConditionState is invalid');
      const rationale = requiredText(request.rationale, 'rationale', 8000);
      const nonLowestReason = optionalText(request.nonLowestReason, 'nonLowestReason', 4000);
      const splitOrSoleSourceReason = optionalText(request.splitOrSoleSourceReason, 'splitOrSoleSourceReason', 4000);
      const competitionExceptionReason = optionalText(request.competitionExceptionReason, 'competitionExceptionReason', 4000);
      const supersedesRecommendationId = request.supersedesRecommendationId === undefined
        ? null
        : requireUuid(request.supersedesRecommendationId, 'supersedesRecommendationId');
      const refs = {
        budgetBasisRefsJson: JSON.stringify(referenceArray(request.budgetBasisRefs, 'budgetBasisRefs')),
        technicalDependencyRefsJson: JSON.stringify(referenceArray(request.technicalDependencyRefs, 'technicalDependencyRefs')),
        eligibilityBasisRefsJson: JSON.stringify(referenceArray(request.eligibilityBasisRefs, 'eligibilityBasisRefs')),
        supplierIntelligenceBasisRefsJson: JSON.stringify(referenceArray(request.supplierIntelligenceBasisRefs, 'supplierIntelligenceBasisRefs')),
        risksDeviationsJson: JSON.stringify(referenceArray(request.risksDeviations, 'risksDeviations')),
      };
      return use(context, 'procurement.decision.recommendation.create.v1', true, async (handle) => {
        const recommendationId = await handle.createRecommendation({
          comparisonSnapshotId,
          outcome: request.outcome,
          technicalConditionState: request.technicalConditionState,
          rationale,
          nonLowestReason,
          splitOrSoleSourceReason,
          competitionExceptionReason,
          ...refs,
          supersedesRecommendationId,
        });
        return { recommendation: await readRequired(handle, recommendationId) };
      });
    },

    async read(context, recommendationId): Promise<AwardRecommendationDetailResponse | undefined> {
      const id = requireUuid(recommendationId, 'recommendationId');
      return use(context, 'procurement.decision.recommendation.read.v1', false, async (handle) => {
        const header = await handle.recommendationHeader(id);
        return header === undefined ? undefined : { recommendation: await detail(handle, header) };
      });
    },

    async addBasis(context, recommendationId, request): Promise<AwardRecommendationDetailResponse> {
      const id = requireUuid(recommendationId, 'recommendationId');
      const snapshotConfirmedBasisId = requireUuid(request.snapshotConfirmedBasisId, 'snapshotConfirmedBasisId');
      const scopePartitionNote = optionalText(request.scopePartitionNote, 'scopePartitionNote', 2000);
      return use(context, 'procurement.decision.recommendation.basis.add.v1', true, async (handle) => {
        await handle.addRecommendationBasis(id, snapshotConfirmedBasisId, scopePartitionNote);
        return { recommendation: await readRequired(handle, id) };
      });
    },

    async removeBasis(context, recommendationId, recommendationSelectionId): Promise<AwardRecommendationDetailResponse> {
      const id = requireUuid(recommendationId, 'recommendationId');
      const selectionId = requireUuid(recommendationSelectionId, 'recommendationSelectionId');
      return use(context, 'procurement.decision.recommendation.basis.remove.v1', true, async (handle) => {
        await handle.removeRecommendationBasis(id, selectionId);
        return { recommendation: await readRequired(handle, id) };
      });
    },

    async submit(context, recommendationId): Promise<SubmitAwardRecommendationResponse> {
      const id = requireUuid(recommendationId, 'recommendationId');
      return use(context, 'procurement.decision.recommendation.submit.v1', true, async (handle) => {
        const approvalCaseId = await handle.submitRecommendation(id);
        return { approvalCaseId, recommendation: await readRequired(handle, id) };
      });
    },

    async actOnApproval(context, approvalCaseId, request): Promise<ApprovalActionResponse> {
      const id = requireUuid(approvalCaseId, 'approvalCaseId');
      if (!approvalActions.has(request.action)) throw new Error('approval action is invalid');
      const conditions = optionalText(request.conditions, 'conditions', 4000);
      const comments = optionalText(request.comments, 'comments', 4000);
      if (request.action === 'APPROVE_WITH_CONDITIONS' && conditions === null) throw new Error('conditional approval requires conditions');
      return use(context, 'procurement.decision.approval.act.v1', true, async (handle) => {
        const approvalStatus = await handle.actOnApproval(id, request.action, conditions, comments);
        const approval = await handle.approvalCase(id);
        if (approval === undefined) throw new Error('approval case is not visible after action');
        const header = await handle.recommendationHeader((await handle.listRecommendations()).find((item) => item.approval_status === approvalStatus && item.recommendation_id)?.recommendation_id ?? '');
        if (header !== undefined && header.approval_case_id === id) {
          return { approvalStatus: approval.status, recommendation: await detail(handle, header) };
        }
        const candidates = await handle.listRecommendations();
        for (const candidate of candidates) {
          const candidateHeader = await handle.recommendationHeader(candidate.recommendation_id);
          if (candidateHeader?.approval_case_id === id) {
            return { approvalStatus: approval.status, recommendation: await detail(handle, candidateHeader) };
          }
        }
        throw new Error('approval subject recommendation is not visible after action');
      });
    },

    async recordAward(context, recommendationId, request): Promise<RecordAwardDecisionResponse> {
      const id = requireUuid(recommendationId, 'recommendationId');
      const decisionJustification = optionalText(request.decisionJustification, 'decisionJustification', 8000);
      return use(context, 'procurement.decision.award.record.v1', true, async (handle) => {
        const awardDecisionId = await handle.recordAward(id, decisionJustification);
        return { awardDecisionId, recommendation: await readRequired(handle, id) };
      });
    },

    async satisfyCondition(context, recommendationId, awardDecisionId, awardConditionId, request): Promise<AwardRecommendationDetailResponse> {
      const recommendation = requireUuid(recommendationId, 'recommendationId');
      const award = requireUuid(awardDecisionId, 'awardDecisionId');
      const conditionId = requireUuid(awardConditionId, 'awardConditionId');
      const evidenceRefs = referenceArray(request.evidenceRefs, 'evidenceRefs');
      if (evidenceRefs.length < 1) throw new Error('evidenceRefs is required');
      return use(context, 'procurement.decision.award.condition.satisfy.v1', true, async (handle) => {
        await handle.satisfyCondition(award, conditionId, JSON.stringify(evidenceRefs));
        return { recommendation: await readRequired(handle, recommendation) };
      });
    },

    async makeEffectiveForHandoff(context, recommendationId, awardDecisionId): Promise<AwardRecommendationDetailResponse> {
      const recommendation = requireUuid(recommendationId, 'recommendationId');
      const award = requireUuid(awardDecisionId, 'awardDecisionId');
      return use(context, 'procurement.decision.award.handoff.v1', true, async (handle) => {
        await handle.makeAwardEffectiveForHandoff(award);
        return { recommendation: await readRequired(handle, recommendation) };
      });
    },
  });
}
