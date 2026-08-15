import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface ProcurementDecisionDraftPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  updateDraft(input: {
    readonly recommendationId: string;
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
  }): Promise<void>;
}

export const procurementDecisionDraftPersistence =
  definePersistenceAdapter<ProcurementDecisionDraftPersistenceHandle>({
    moduleKey: 'procurement_v2_session04_recommendation_draft_edit',
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

      updateDraft: async (input) => {
        await executor.execute(sql`
          SELECT procurement.update_award_recommendation_draft(
            ${input.recommendationId},
            ${input.outcome},
            ${input.technicalConditionState},
            ${input.rationale},
            ${input.nonLowestReason},
            ${input.splitOrSoleSourceReason},
            ${input.competitionExceptionReason},
            ${input.budgetBasisRefsJson}::jsonb,
            ${input.technicalDependencyRefsJson}::jsonb,
            ${input.eligibilityBasisRefsJson}::jsonb,
            ${input.supplierIntelligenceBasisRefsJson}::jsonb,
            ${input.risksDeviationsJson}::jsonb
          )
        `);
      },
    }),
  });
