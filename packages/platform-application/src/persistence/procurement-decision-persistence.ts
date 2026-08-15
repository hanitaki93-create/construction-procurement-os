import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface DecisionCandidateComparisonRowDb {
  readonly comparison_snapshot_id: string;
  readonly comparison_id: string;
  readonly comparison_number: string;
  readonly rfq_issue_id: string;
  readonly rfq_number: string;
  readonly project_id: string;
  readonly project_code: string;
  readonly title: string;
  readonly base_currency: string;
  readonly frozen_at: string;
  readonly requirement_row_count: number;
  readonly bidder_count: number;
}

export interface DecisionCandidateBasisRowDb {
  readonly snapshot_confirmed_basis_id: string;
  readonly comparison_row_id: string;
  readonly comparison_bidder_id: string;
  readonly row_no: number;
  readonly row_kind: 'RFQ_LINE' | 'SUPPLIER_ADDED';
  readonly requirement_description: string;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly supplier_legal_name: string;
  readonly confirmation_kind: 'QUOTATION_REVISION' | 'CLARIFICATION_CONFIRMATION' | 'NEGOTIATED_BAFO' | 'WRITTEN_CONFIRMATION';
  readonly confirmed_description: string;
  readonly confirmed_quantity: string | null;
  readonly confirmed_uom_code: string | null;
  readonly confirmed_unit_rate: string | null;
  readonly confirmed_amount: string;
  readonly currency: string;
  readonly confirmed_terms: Readonly<Record<string, string>>;
  readonly technical_status_refs: readonly string[];
  readonly quotation_validity_until: string | null;
}

export interface RecommendationRegisterRowDb {
  readonly recommendation_id: string;
  readonly recommendation_number: string | null;
  readonly project_code: string;
  readonly rfq_number: string;
  readonly comparison_number: string;
  readonly status: 'DRAFT' | 'READY_FOR_APPROVAL' | 'SUBMITTED' | 'RETURNED_FOR_REVISION' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN' | 'SUPERSEDED';
  readonly outcome: 'SINGLE_SUPPLIER' | 'SPLIT_AWARD' | 'SOLE_SOURCE' | 'NO_AWARD' | 'RETENDER';
  readonly technical_condition_state: 'CLEAR' | 'CONDITIONAL' | 'UNRESOLVED_BLOCKING' | 'NOT_APPLICABLE';
  readonly recommended_value: string | null;
  readonly currency: string | null;
  readonly supplier_count: number;
  readonly approval_status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'CONDITIONALLY_APPROVED' | 'REJECTED' | 'RETURNED' | 'CANCELLED' | 'SUPERSEDED' | null;
  readonly award_number: string | null;
  readonly award_status: 'DRAFT' | 'RECORDED' | 'EFFECTIVE_FOR_HANDOFF' | 'REVOKED' | 'SUPERSEDED' | 'CANCELLED' | null;
  readonly created_at: string;
}

export interface RecommendationHeaderRowDb {
  readonly recommendation_id: string;
  readonly recommendation_number: string | null;
  readonly project_id: string;
  readonly project_code: string;
  readonly rfq_issue_id: string;
  readonly rfq_number: string;
  readonly comparison_snapshot_id: string;
  readonly comparison_number: string;
  readonly supersedes_recommendation_id: string | null;
  readonly status: RecommendationRegisterRowDb['status'];
  readonly outcome: RecommendationRegisterRowDb['outcome'];
  readonly technical_condition_state: RecommendationRegisterRowDb['technical_condition_state'];
  readonly currency: string | null;
  readonly recommended_value: string | null;
  readonly competition_invited: number | null;
  readonly competition_valid_responses: number | null;
  readonly competition_comparable_responses: number | null;
  readonly competition_requirement: number;
  readonly competition_exception_reason: string | null;
  readonly rationale: string;
  readonly non_lowest_reason: string | null;
  readonly split_or_sole_source_reason: string | null;
  readonly budget_basis_refs: readonly string[];
  readonly technical_dependency_refs: readonly string[];
  readonly eligibility_basis_refs: readonly string[];
  readonly supplier_intelligence_basis_refs: readonly string[];
  readonly risks_deviations: readonly string[];
  readonly prepared_by: string | null;
  readonly prepared_by_display_name: string | null;
  readonly prepared_at: string | null;
  readonly created_at: string;
  readonly submitted_at: string | null;
  readonly resolved_at: string | null;
  readonly approval_case_id: string | null;
}

export interface RecommendationSelectionRowDb {
  readonly recommendation_selection_id: string;
  readonly snapshot_confirmed_basis_id: string;
  readonly comparison_row_id: string;
  readonly comparison_bidder_id: string;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly supplier_legal_name: string;
  readonly confirmed_basis_id: string;
  readonly confirmed_amount: string;
  readonly currency: string;
  readonly scope_partition_note: string | null;
}

export interface RecommendationRouteBasisRowDb {
  readonly route_decision_id: string;
  readonly mr_line_id: string;
  readonly policy_key: string;
  readonly policy_version: number;
  readonly route: 'COMPETITIVE_RFQ' | 'DIRECT_ORDER' | 'PACKAGE_SOURCING' | 'SOLE_SOURCE_EXCEPTION' | 'EXTERNAL_ERP_STOCK';
  readonly justification: string | null;
}

export interface ApprovalCaseRowDb {
  readonly approval_case_id: string;
  readonly approval_policy_key: string;
  readonly approval_policy_version: number;
  readonly required_role_key: string;
  readonly status: NonNullable<RecommendationRegisterRowDb['approval_status']>;
  readonly monetary_basis: string | null;
  readonly monetary_currency: string | null;
  readonly required_approvers: readonly Readonly<Record<string, unknown>>[];
  readonly ball_in_court: readonly Readonly<Record<string, unknown>>[];
  readonly required_evidence: readonly string[];
  readonly created_at: string;
  readonly resolved_at: string | null;
}

export interface ApprovalActionRowDb {
  readonly approval_action_occurrence_id: string;
  readonly sequence: number;
  readonly action: 'APPROVE' | 'APPROVE_WITH_CONDITIONS' | 'REJECT' | 'RETURN_FOR_REVISION';
  readonly conditions: string | null;
  readonly comments: string | null;
  readonly current_gate_facts: Readonly<Record<string, unknown>>;
  readonly action_by: string;
  readonly action_by_display_name: string;
  readonly action_at: string;
}

export interface AwardDecisionRowDb {
  readonly award_decision_id: string;
  readonly award_number: string;
  readonly award_type: 'FULL' | 'SPLIT' | 'CONDITIONAL' | 'NO_AWARD';
  readonly status: NonNullable<RecommendationRegisterRowDb['award_status']>;
  readonly decision_justification: string;
  readonly transition_gate_facts: Readonly<Record<string, unknown>>;
  readonly decision_by: string;
  readonly decision_by_display_name: string;
  readonly decision_at: string;
  readonly effective_for_handoff_by: string | null;
  readonly effective_for_handoff_at: string | null;
}

export interface AwardConditionRowDb {
  readonly award_condition_id: string;
  readonly condition_no: number;
  readonly condition_text: string;
  readonly source_approval_action_occurrence_id: string;
  readonly satisfied: boolean;
  readonly evidence_refs: readonly string[];
  readonly satisfied_by: string | null;
  readonly satisfied_by_display_name: string | null;
  readonly satisfied_at: string | null;
}

export interface ProcurementDecisionPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  listCandidates(): Promise<readonly DecisionCandidateComparisonRowDb[]>;
  candidateBasis(comparisonSnapshotId: string): Promise<readonly DecisionCandidateBasisRowDb[]>;
  listRecommendations(): Promise<readonly RecommendationRegisterRowDb[]>;
  recommendationHeader(recommendationId: string): Promise<RecommendationHeaderRowDb | undefined>;
  recommendationSelections(recommendationId: string): Promise<readonly RecommendationSelectionRowDb[]>;
  recommendationRouteBasis(recommendationId: string): Promise<readonly RecommendationRouteBasisRowDb[]>;
  approvalCase(approvalCaseId: string): Promise<ApprovalCaseRowDb | undefined>;
  approvalActions(approvalCaseId: string): Promise<readonly ApprovalActionRowDb[]>;
  awardDecision(recommendationId: string): Promise<AwardDecisionRowDb | undefined>;
  awardConditions(awardDecisionId: string): Promise<readonly AwardConditionRowDb[]>;
  createRecommendation(input: {
    readonly comparisonSnapshotId: string;
    readonly outcome: string;
    readonly technicalConditionState: string;
    readonly rationale: string;
    readonly nonLowestReason: string | null;
    readonly splitOrSoleSourceReason: string | null;
    readonly competitionExceptionReason: string | null;
    readonly budgetBasisRefsJson: string;
    readonly technicalDependencyRefsJson: string;
    readonly eligibilityBasisRefsJson: string;
    readonly supplierIntelligenceBasisRefsJson: string;
    readonly risksDeviationsJson: string;
    readonly supersedesRecommendationId: string | null;
  }): Promise<string>;
  addRecommendationBasis(recommendationId: string, snapshotConfirmedBasisId: string, scopePartitionNote: string | null): Promise<string>;
  removeRecommendationBasis(recommendationId: string, recommendationSelectionId: string): Promise<void>;
  submitRecommendation(recommendationId: string): Promise<string>;
  actOnApproval(approvalCaseId: string, action: string, conditions: string | null, comments: string | null): Promise<string>;
  recordAward(recommendationId: string, decisionJustification: string | null): Promise<string>;
  satisfyCondition(awardDecisionId: string, awardConditionId: string, evidenceRefsJson: string): Promise<string>;
  makeAwardEffectiveForHandoff(awardDecisionId: string): Promise<void>;
}

const recommendationHeaderSql = (recommendationId: string) => sql`
  SELECT r.recommendation_id::text, r.recommendation_number,
         r.project_id::text, pv.project_code,
         r.rfq_issue_id::text, i.rfq_number,
         r.comparison_snapshot_id::text, cs.comparison_number,
         r.supersedes_recommendation_id::text, r.status, r.outcome,
         r.technical_condition_state, r.currency, r.recommended_value::text,
         r.competition_invited, r.competition_valid_responses,
         r.competition_comparable_responses, r.competition_requirement,
         r.competition_exception_reason, r.rationale, r.non_lowest_reason,
         r.split_or_sole_source_reason, r.budget_basis_refs,
         r.technical_dependency_refs, r.eligibility_basis_refs,
         r.supplier_intelligence_basis_refs, r.risks_deviations,
         r.prepared_by::text, prepared.display_name AS prepared_by_display_name,
         r.prepared_at::text, r.created_at::text, r.submitted_at::text,
         r.resolved_at::text, r.approval_case_id::text
  FROM procurement.award_recommendation r
  JOIN procurement.bid_comparison_snapshot cs
    ON cs.tenant_id = r.tenant_id AND cs.comparison_snapshot_id = r.comparison_snapshot_id
  JOIN procurement.rfq_tender_issue i
    ON i.tenant_id = r.tenant_id AND i.rfq_issue_id = r.rfq_issue_id
  JOIN LATERAL (
    SELECT project_code
    FROM platform.project_version p
    WHERE p.tenant_id = r.tenant_id AND p.project_id = r.project_id
    ORDER BY p.version DESC
    LIMIT 1
  ) pv ON true
  LEFT JOIN platform.principal prepared
    ON prepared.tenant_id = r.tenant_id AND prepared.principal_id = r.prepared_by
  WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
    AND r.recommendation_id = ${recommendationId}
`;

export const procurementDecisionPersistence = definePersistenceAdapter<ProcurementDecisionPersistenceHandle>({
  moduleKey: 'procurement_v2_session04_recommendation_approval_award',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    verifyAuthenticationIdentity: async (authenticationIdentityId) => {
      const row = await executor.oneOrNone<{ readonly binding_id: string }>(sql`
        SELECT binding_id::text
        FROM platform.principal_authentication_identity
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND principal_id = current_setting('cpos.principal_id')::uuid
          AND authentication_identity_id = ${authenticationIdentityId}
          AND effective_period @> statement_timestamp()
        LIMIT 1
      `);
      return row !== undefined;
    },

    listCandidates: () => executor.all<DecisionCandidateComparisonRowDb>(sql`
      SELECT s.comparison_snapshot_id::text, s.comparison_id::text,
             s.comparison_number, s.rfq_issue_id::text, i.rfq_number,
             s.project_id::text, pv.project_code, s.title, s.base_currency,
             s.frozen_at::text,
             (SELECT count(*)::int FROM procurement.bid_comparison_snapshot_row r
               WHERE r.tenant_id = s.tenant_id
                 AND r.comparison_snapshot_id = s.comparison_snapshot_id
                 AND r.row_kind = 'RFQ_LINE') AS requirement_row_count,
             (SELECT count(*)::int FROM procurement.bid_comparison_snapshot_bidder b
               WHERE b.tenant_id = s.tenant_id
                 AND b.comparison_snapshot_id = s.comparison_snapshot_id) AS bidder_count
      FROM procurement.bid_comparison_snapshot s
      JOIN procurement.rfq_tender_issue i
        ON i.tenant_id = s.tenant_id AND i.rfq_issue_id = s.rfq_issue_id
      JOIN LATERAL (
        SELECT project_code
        FROM platform.project_version p
        WHERE p.tenant_id = s.tenant_id AND p.project_id = s.project_id
        ORDER BY p.version DESC
        LIMIT 1
      ) pv ON true
      WHERE s.tenant_id = current_setting('cpos.tenant_id')::uuid
      ORDER BY s.frozen_at DESC, s.comparison_snapshot_id DESC
    `),

    candidateBasis: (comparisonSnapshotId) => executor.all<DecisionCandidateBasisRowDb>(sql`
      SELECT cb.snapshot_confirmed_basis_id::text,
             cb.comparison_row_id::text, cb.comparison_bidder_id::text,
             r.row_no, r.row_kind, r.description AS requirement_description,
             b.supplier_id::text, b.supplier_code, b.supplier_legal_name,
             cb.confirmation_kind, cb.confirmed_description,
             cb.confirmed_quantity::text, cb.confirmed_uom_code,
             cb.confirmed_unit_rate::text, cb.confirmed_amount::text,
             cb.currency, cb.confirmed_terms, cb.technical_status_refs,
             b.validity_until::text AS quotation_validity_until
      FROM procurement.bid_comparison_snapshot_confirmed_basis cb
      JOIN procurement.bid_comparison_snapshot_row r
        ON r.tenant_id = cb.tenant_id
       AND r.comparison_snapshot_id = cb.comparison_snapshot_id
       AND r.comparison_row_id = cb.comparison_row_id
      JOIN procurement.bid_comparison_snapshot_bidder b
        ON b.tenant_id = cb.tenant_id
       AND b.comparison_snapshot_id = cb.comparison_snapshot_id
       AND b.comparison_bidder_id = cb.comparison_bidder_id
      WHERE cb.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND cb.comparison_snapshot_id = ${comparisonSnapshotId}
      ORDER BY r.row_no, b.supplier_code, cb.snapshot_confirmed_basis_id
    `),

    listRecommendations: () => executor.all<RecommendationRegisterRowDb>(sql`
      SELECT r.recommendation_id::text, r.recommendation_number,
             pv.project_code, i.rfq_number, cs.comparison_number,
             r.status, r.outcome, r.technical_condition_state,
             r.recommended_value::text, r.currency,
             (SELECT count(DISTINCT s.supplier_id)::int
                FROM procurement.award_recommendation_selection s
                WHERE s.tenant_id = r.tenant_id
                  AND s.recommendation_id = r.recommendation_id) AS supplier_count,
             ac.status AS approval_status,
             ad.award_number, ad.status AS award_status,
             r.created_at::text
      FROM procurement.award_recommendation r
      JOIN procurement.rfq_tender_issue i
        ON i.tenant_id = r.tenant_id AND i.rfq_issue_id = r.rfq_issue_id
      JOIN procurement.bid_comparison_snapshot cs
        ON cs.tenant_id = r.tenant_id AND cs.comparison_snapshot_id = r.comparison_snapshot_id
      JOIN LATERAL (
        SELECT project_code
        FROM platform.project_version p
        WHERE p.tenant_id = r.tenant_id AND p.project_id = r.project_id
        ORDER BY p.version DESC
        LIMIT 1
      ) pv ON true
      LEFT JOIN platform.approval_case ac
        ON ac.tenant_id = r.tenant_id AND ac.approval_case_id = r.approval_case_id
      LEFT JOIN procurement.award_decision ad
        ON ad.tenant_id = r.tenant_id AND ad.recommendation_id = r.recommendation_id
      WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
      ORDER BY r.created_at DESC, r.recommendation_id DESC
    `),

    recommendationHeader: (recommendationId) => executor.oneOrNone<RecommendationHeaderRowDb>(recommendationHeaderSql(recommendationId)),

    recommendationSelections: (recommendationId) => executor.all<RecommendationSelectionRowDb>(sql`
      SELECT s.recommendation_selection_id::text, s.snapshot_confirmed_basis_id::text,
             s.comparison_row_id::text, s.comparison_bidder_id::text,
             s.supplier_id::text, sup.supplier_code, sup.legal_name AS supplier_legal_name,
             s.confirmed_basis_id::text, s.confirmed_amount::text,
             s.currency, s.scope_partition_note
      FROM procurement.award_recommendation_selection s
      JOIN procurement.supplier sup
        ON sup.tenant_id = s.tenant_id AND sup.supplier_id = s.supplier_id
      WHERE s.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND s.recommendation_id = ${recommendationId}
      ORDER BY s.comparison_row_id, s.recommendation_selection_id
    `),

    recommendationRouteBasis: (recommendationId) => executor.all<RecommendationRouteBasisRowDb>(sql`
      SELECT route_decision_id::text, mr_line_id::text,
             policy_key, policy_version, route, justification
      FROM procurement.award_recommendation_route_basis
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND recommendation_id = ${recommendationId}
      ORDER BY mr_line_id, route_decision_id
    `),

    approvalCase: (approvalCaseId) => executor.oneOrNone<ApprovalCaseRowDb>(sql`
      SELECT c.approval_case_id::text, c.approval_policy_key,
             c.approval_policy_version, p.required_role_key,
             c.status, c.monetary_basis::text, c.monetary_currency,
             c.required_approvers, c.ball_in_court, c.required_evidence,
             c.created_at::text, c.resolved_at::text
      FROM platform.approval_case c
      JOIN platform.approval_policy_version p
        ON p.policy_key = c.approval_policy_key
       AND p.version = c.approval_policy_version
      WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND c.approval_case_id = ${approvalCaseId}
    `),

    approvalActions: (approvalCaseId) => executor.all<ApprovalActionRowDb>(sql`
      SELECT a.approval_action_occurrence_id::text, a.sequence, a.action,
             a.conditions, a.comments, a.current_gate_facts,
             a.action_by::text, p.display_name AS action_by_display_name,
             a.action_at::text
      FROM platform.approval_action_occurrence a
      JOIN platform.principal p
        ON p.tenant_id = a.tenant_id AND p.principal_id = a.action_by
      WHERE a.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND a.approval_case_id = ${approvalCaseId}
      ORDER BY a.sequence
    `),

    awardDecision: (recommendationId) => executor.oneOrNone<AwardDecisionRowDb>(sql`
      SELECT a.award_decision_id::text, a.award_number, a.award_type,
             a.status, a.decision_justification, a.transition_gate_facts,
             a.decision_by::text, p.display_name AS decision_by_display_name,
             a.decision_at::text, a.effective_for_handoff_by::text,
             a.effective_for_handoff_at::text
      FROM procurement.award_decision a
      JOIN platform.principal p
        ON p.tenant_id = a.tenant_id AND p.principal_id = a.decision_by
      WHERE a.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND a.recommendation_id = ${recommendationId}
    `),

    awardConditions: (awardDecisionId) => executor.all<AwardConditionRowDb>(sql`
      SELECT c.award_condition_id::text, c.condition_no, c.condition_text,
             c.source_approval_action_occurrence_id::text,
             (s.award_condition_satisfaction_id IS NOT NULL) AS satisfied,
             coalesce(s.evidence_refs, '[]'::jsonb) AS evidence_refs,
             s.satisfied_by::text,
             p.display_name AS satisfied_by_display_name,
             s.satisfied_at::text
      FROM procurement.award_decision_condition c
      LEFT JOIN procurement.award_condition_satisfaction_occurrence s
        ON s.tenant_id = c.tenant_id AND s.award_condition_id = c.award_condition_id
      LEFT JOIN platform.principal p
        ON p.tenant_id = s.tenant_id AND p.principal_id = s.satisfied_by
      WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND c.award_decision_id = ${awardDecisionId}
      ORDER BY c.condition_no
    `),

    createRecommendation: async (input) => {
      const row = await executor.oneOrNone<{ readonly recommendation_id: string }>(sql`
        SELECT procurement.create_award_recommendation(
          ${input.comparisonSnapshotId}, ${input.outcome}, ${input.technicalConditionState},
          ${input.rationale}, ${input.nonLowestReason}, ${input.splitOrSoleSourceReason},
          ${input.competitionExceptionReason}, ${input.budgetBasisRefsJson}::jsonb,
          ${input.technicalDependencyRefsJson}::jsonb, ${input.eligibilityBasisRefsJson}::jsonb,
          ${input.supplierIntelligenceBasisRefsJson}::jsonb, ${input.risksDeviationsJson}::jsonb,
          ${input.supersedesRecommendationId}
        )::text AS recommendation_id
      `);
      if (row === undefined) throw new Error('award recommendation could not be created');
      return row.recommendation_id;
    },

    addRecommendationBasis: async (recommendationId, snapshotConfirmedBasisId, scopePartitionNote) => {
      const row = await executor.oneOrNone<{ readonly recommendation_selection_id: string }>(sql`
        SELECT procurement.add_award_recommendation_basis(
          ${recommendationId}, ${snapshotConfirmedBasisId}, ${scopePartitionNote}
        )::text AS recommendation_selection_id
      `);
      if (row === undefined) throw new Error('recommendation basis could not be added');
      return row.recommendation_selection_id;
    },

    removeRecommendationBasis: async (recommendationId, recommendationSelectionId) => {
      await executor.execute(sql`
        SELECT procurement.remove_award_recommendation_basis(${recommendationId}, ${recommendationSelectionId})
      `);
    },

    submitRecommendation: async (recommendationId) => {
      const row = await executor.oneOrNone<{ readonly approval_case_id: string }>(sql`
        SELECT procurement.submit_award_recommendation(${recommendationId})::text AS approval_case_id
      `);
      if (row === undefined) throw new Error('recommendation could not be submitted');
      return row.approval_case_id;
    },

    actOnApproval: async (approvalCaseId, action, conditions, comments) => {
      const row = await executor.oneOrNone<{ readonly approval_status: string }>(sql`
        SELECT procurement.act_on_procurement_approval(
          ${approvalCaseId}, ${action}, ${conditions}, ${comments}
        ) AS approval_status
      `);
      if (row === undefined) throw new Error('approval action could not be recorded');
      return row.approval_status;
    },

    recordAward: async (recommendationId, decisionJustification) => {
      const row = await executor.oneOrNone<{ readonly award_decision_id: string }>(sql`
        SELECT procurement.record_award_decision(
          ${recommendationId}, ${decisionJustification}
        )::text AS award_decision_id
      `);
      if (row === undefined) throw new Error('AwardDecision could not be recorded');
      return row.award_decision_id;
    },

    satisfyCondition: async (awardDecisionId, awardConditionId, evidenceRefsJson) => {
      const row = await executor.oneOrNone<{ readonly satisfaction_id: string }>(sql`
        SELECT procurement.satisfy_award_condition(
          ${awardDecisionId}, ${awardConditionId}, ${evidenceRefsJson}::jsonb
        )::text AS satisfaction_id
      `);
      if (row === undefined) throw new Error('award condition satisfaction could not be recorded');
      return row.satisfaction_id;
    },

    makeAwardEffectiveForHandoff: async (awardDecisionId) => {
      await executor.execute(sql`
        SELECT procurement.make_award_effective_for_handoff(${awardDecisionId})
      `);
    },
  }),
});
