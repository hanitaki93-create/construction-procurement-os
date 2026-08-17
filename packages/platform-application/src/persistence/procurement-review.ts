import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface ReviewableMrRow {
  readonly mr_id: string;
  readonly status: string;
}

export interface ReviewableLineRow {
  readonly mr_id: string;
  readonly mr_line_id: string;
  readonly requested_quantity: string;
  readonly approved_quantity: string | null;
  readonly line_state: string;
}

export interface ReviewTrailRow {
  readonly review_occurrence_id: string;
  readonly decision: 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED';
  readonly reviewer_id: string;
  readonly reviewer_name: string;
  readonly comments: string | null;
  readonly occurred_at: string;
}

export interface RouteDecisionRow {
  readonly route_decision_id: string;
  readonly mr_line_id: string;
  readonly policy_key: string;
  readonly policy_version: number;
  readonly route:
    | 'COMPETITIVE_RFQ'
    | 'DIRECT_ORDER'
    | 'PACKAGE_SOURCING'
    | 'SOLE_SOURCE_EXCEPTION'
    | 'EXTERNAL_ERP_STOCK';
  readonly justification: string | null;
  readonly decided_by: string;
  readonly decided_by_name: string;
  readonly decided_at: string;
}

export interface ProcurementReviewPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canReview(): Promise<boolean>;
  canRoute(): Promise<boolean>;
  lockReviewableMr(mrId: string): Promise<ReviewableMrRow | undefined>;
  reviewableLines(mrId: string): Promise<readonly ReviewableLineRow[]>;
  applyLineDecision(input: {
    readonly mrLineId: string;
    readonly approvedQuantity: string | null;
    readonly lineState: 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED';
  }): Promise<boolean>;
  setMrReviewState(mrId: string, state: 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED'): Promise<boolean>;
  recordReview(input: {
    readonly mrId: string;
    readonly reviewerId: string;
    readonly decision: 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED';
    readonly comments: string | null;
    readonly lineDecisionsJson: string;
  }): Promise<void>;
  reviewTrail(mrId: string): Promise<readonly ReviewTrailRow[]>;
  currentRoutes(mrId: string): Promise<readonly RouteDecisionRow[]>;
  currentRoute(mrLineId: string): Promise<RouteDecisionRow | undefined>;
  lockApprovedLine(mrLineId: string): Promise<ReviewableLineRow | undefined>;
  setRoute(input: {
    readonly mrLineId: string;
    readonly route:
      | 'COMPETITIVE_RFQ'
      | 'DIRECT_ORDER'
      | 'PACKAGE_SOURCING'
      | 'SOLE_SOURCE_EXCEPTION'
      | 'EXTERNAL_ERP_STOCK';
    readonly justification: string | null;
    readonly decidedBy: string;
  }): Promise<RouteDecisionRow>;
}

export const procurementReviewPersistence = definePersistenceAdapter<ProcurementReviewPersistenceHandle>({
  moduleKey: 'procurement_v2_session01_review_route',
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

    canReview: async () => {
      const row = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT (
          platform.current_principal_has_active_tenant_role('OWNER')
          OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
        ) AS allowed
      `);
      return row?.allowed === true;
    },

    canRoute: async () => {
      const row = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT (
          platform.current_principal_has_active_tenant_role('OWNER')
          OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
          OR platform.current_principal_has_active_tenant_role('BUYER')
        ) AS allowed
      `);
      return row?.allowed === true;
    },

    lockReviewableMr: (mrId) =>
      executor.oneOrNone<ReviewableMrRow>(sql`
        SELECT mr_id::text, status
        FROM procurement.material_requisition
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
        FOR UPDATE
      `),

    reviewableLines: (mrId) =>
      executor.all<ReviewableLineRow>(sql`
        SELECT mr_id::text, mr_line_id::text, requested_quantity::text,
               approved_quantity::text, line_state
        FROM procurement.material_requisition_line
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
        ORDER BY line_no, mr_line_id
        FOR UPDATE
      `),

    applyLineDecision: async (input) => {
      const result = await executor.execute(sql`
        UPDATE procurement.material_requisition_line
        SET approved_quantity = ${input.approvedQuantity},
            line_state = ${input.lineState}
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_line_id = ${input.mrLineId}
          AND line_state = 'SUBMITTED'
      `);
      return result.rowCount === 1;
    },

    setMrReviewState: async (mrId, state) => {
      const result = await executor.execute(sql`
        UPDATE procurement.material_requisition
        SET status = ${state}, updated_at = clock_timestamp()
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
          AND status IN ('SUBMITTED','UNDER_REVIEW')
      `);
      return result.rowCount === 1;
    },

    recordReview: async (input) => {
      await executor.execute(sql`
        INSERT INTO procurement.material_requisition_review_occurrence (
          tenant_id, mr_id, reviewer_id, decision, comments, line_decisions
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid,
          ${input.mrId},
          ${input.reviewerId},
          ${input.decision},
          ${input.comments},
          ${input.lineDecisionsJson}::jsonb
        )
      `);
    },

    reviewTrail: (mrId) =>
      executor.all<ReviewTrailRow>(sql`
        SELECT r.review_occurrence_id::text, r.decision, r.reviewer_id::text,
               p.display_name AS reviewer_name, r.comments, r.occurred_at::text
        FROM procurement.material_requisition_review_occurrence r
        JOIN platform.principal p
          ON p.tenant_id = r.tenant_id AND p.principal_id = r.reviewer_id
        WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND r.mr_id = ${mrId}
        ORDER BY r.occurred_at, r.review_occurrence_id
      `),

    currentRoutes: (mrId) =>
      executor.all<RouteDecisionRow>(sql`
        SELECT d.route_decision_id::text, d.mr_line_id::text, d.policy_key, d.policy_version,
               d.route, d.justification, d.decided_by::text,
               p.display_name AS decided_by_name, d.decided_at::text
        FROM procurement.procurement_route_decision d
        JOIN procurement.material_requisition_line line
          ON line.tenant_id = d.tenant_id AND line.mr_line_id = d.mr_line_id
        JOIN platform.principal p
          ON p.tenant_id = d.tenant_id AND p.principal_id = d.decided_by
        WHERE d.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND line.mr_id = ${mrId}
          AND d.is_current
        ORDER BY line.line_no, d.route_decision_id
      `),

    currentRoute: (mrLineId) =>
      executor.oneOrNone<RouteDecisionRow>(sql`
        SELECT d.route_decision_id::text, d.mr_line_id::text, d.policy_key, d.policy_version,
               d.route, d.justification, d.decided_by::text,
               p.display_name AS decided_by_name, d.decided_at::text
        FROM procurement.procurement_route_decision d
        JOIN platform.principal p
          ON p.tenant_id = d.tenant_id AND p.principal_id = d.decided_by
        WHERE d.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND d.mr_line_id = ${mrLineId}
          AND d.is_current
        LIMIT 1
      `),

    lockApprovedLine: (mrLineId) =>
      executor.oneOrNone<ReviewableLineRow>(sql`
        SELECT mr_id::text, mr_line_id::text, requested_quantity::text,
               approved_quantity::text, line_state
        FROM procurement.material_requisition_line
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_line_id = ${mrLineId}
          AND approved_quantity > 0
          AND line_state IN ('APPROVED','PARTIALLY_APPROVED')
        FOR UPDATE
      `),

    setRoute: async (input) => {
      const previous = await executor.oneOrNone<{ readonly route_decision_id: string }>(sql`
        SELECT route_decision_id::text
        FROM procurement.procurement_route_decision
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_line_id = ${input.mrLineId}
          AND is_current
        FOR UPDATE
      `);
      if (previous !== undefined) {
        await executor.execute(sql`
          UPDATE procurement.procurement_route_decision
          SET is_current = false
          WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
            AND route_decision_id = ${previous.route_decision_id}
            AND is_current
        `);
      }
      const row = await executor.oneOrNone<RouteDecisionRow>(sql`
        WITH inserted AS (
          INSERT INTO procurement.procurement_route_decision (
            tenant_id, mr_line_id, policy_key, policy_version, route, justification,
            decided_by, supersedes_route_decision_id
          ) VALUES (
            current_setting('cpos.tenant_id')::uuid,
            ${input.mrLineId},
            'UAE_CONTRACTOR_STARTER',
            1,
            ${input.route},
            ${input.justification},
            ${input.decidedBy},
            ${previous?.route_decision_id ?? null}
          )
          RETURNING *
        )
        SELECT i.route_decision_id::text, i.mr_line_id::text, i.policy_key, i.policy_version,
               i.route, i.justification, i.decided_by::text,
               p.display_name AS decided_by_name, i.decided_at::text
        FROM inserted i
        JOIN platform.principal p
          ON p.tenant_id = i.tenant_id AND p.principal_id = i.decided_by
      `);
      if (row === undefined) throw new Error('route decision insert returned no row');
      return row;
    },
  }),
});
