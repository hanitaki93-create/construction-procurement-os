import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface TenantRow {
  readonly tenant_id: string;
  readonly display_name: string;
  readonly lifecycle_state: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';
}

export interface PrincipalRow {
  readonly principal_id: string;
  readonly display_name: string;
  readonly lifecycle_state: 'ACTIVE' | 'SUSPENDED' | 'ENDED';
}

export interface CompanyRow {
  readonly legal_entity_id: string;
  readonly legal_name: string;
  readonly lifecycle_state: 'ACTIVE' | 'SUSPENDED' | 'ENDED';
}

export interface AuthorityRow {
  readonly authority_context_id: string;
  readonly context_kind: 'SINGLE_LEGAL_ENTITY' | 'MULTI_PARTY_BOUNDED';
  readonly primary_legal_entity_id: string;
}

export interface MembershipRoleRow {
  readonly membership_id: string;
  readonly principal_id: string;
  readonly display_name: string;
  readonly membership_state: 'ACTIVE' | 'SUSPENDED' | 'ENDED';
  readonly role_key: string | null;
}

export interface ProjectRow {
  readonly project_id: string;
  readonly project_code: string;
  readonly display_name: string;
  readonly lifecycle_state: 'ACTIVE' | 'ARCHIVED';
}

export interface SubscriptionRow {
  readonly tenant_subscription_id: string;
  readonly commercial_channel: 'SELF_SERVICE' | 'MANUAL_ENTERPRISE';
  readonly lifecycle_state: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
  readonly entitlement_guard_version: string | null;
}

export interface PlatformWorkspacePersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  tenant(): Promise<TenantRow | undefined>;
  principal(): Promise<PrincipalRow | undefined>;
  company(): Promise<CompanyRow | undefined>;
  authorityContexts(): Promise<readonly AuthorityRow[]>;
  memberships(): Promise<readonly MembershipRoleRow[]>;
  projects(): Promise<readonly ProjectRow[]>;
  subscriptions(): Promise<readonly SubscriptionRow[]>;
  createProject(input: {
    readonly projectId: string;
    readonly authorityContextId: string;
    readonly projectCode: string;
    readonly displayName: string;
  }): Promise<ProjectRow>;
}

export const platformWorkspacePersistence = definePersistenceAdapter<PlatformWorkspacePersistenceHandle>({
  moduleKey: 'platform_workspace',
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
    tenant: () =>
      executor.oneOrNone<TenantRow>(sql`
        SELECT tenant_id::text, display_name, lifecycle_state
        FROM platform.tenant
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
      `),
    principal: () =>
      executor.oneOrNone<PrincipalRow>(sql`
        SELECT principal_id::text, display_name, lifecycle_state
        FROM platform.principal
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND principal_id = current_setting('cpos.principal_id')::uuid
      `),
    company: () =>
      executor.oneOrNone<CompanyRow>(sql`
        SELECT le.legal_entity_id::text, lev.legal_name, lev.lifecycle_state
        FROM platform.legal_entity le
        JOIN platform.legal_entity_version lev
          ON lev.tenant_id = le.tenant_id
         AND lev.legal_entity_id = le.legal_entity_id
        WHERE le.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND lev.effective_period @> statement_timestamp()
        ORDER BY lev.version DESC
        LIMIT 1
      `),
    authorityContexts: () =>
      executor.all<AuthorityRow>(sql`
        SELECT
          ac.authority_context_id::text,
          ac.context_kind,
          acv.primary_legal_entity_id::text
        FROM platform.contracting_authority_context ac
        JOIN platform.contracting_authority_context_version acv
          ON acv.tenant_id = ac.tenant_id
         AND acv.authority_context_id = ac.authority_context_id
        WHERE ac.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND acv.effective_period @> statement_timestamp()
        ORDER BY ac.recorded_at, ac.authority_context_id
      `),
    memberships: () =>
      executor.all<MembershipRoleRow>(sql`
        SELECT
          m.membership_id::text,
          m.principal_id::text,
          p.display_name,
          mv.membership_state,
          ra.role_key
        FROM platform.tenant_membership m
        JOIN platform.principal p
          ON p.tenant_id = m.tenant_id
         AND p.principal_id = m.principal_id
        JOIN platform.tenant_membership_version mv
          ON mv.tenant_id = m.tenant_id
         AND mv.membership_id = m.membership_id
         AND mv.effective_period @> statement_timestamp()
        LEFT JOIN platform.role_assignment ra
          ON ra.tenant_id = m.tenant_id
         AND ra.membership_id = m.membership_id
        LEFT JOIN platform.role_assignment_version rav
          ON rav.tenant_id = ra.tenant_id
         AND rav.role_assignment_id = ra.role_assignment_id
         AND rav.assignment_state = 'ACTIVE'
         AND rav.effective_period @> statement_timestamp()
        WHERE m.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND (ra.role_assignment_id IS NULL OR rav.role_assignment_id IS NOT NULL)
        ORDER BY p.display_name, m.membership_id, ra.role_key
      `),
    projects: () =>
      executor.all<ProjectRow>(sql`
        SELECT p.project_id::text, pv.project_code, pv.display_name, pv.lifecycle_state
        FROM platform.project p
        JOIN platform.project_version pv
          ON pv.tenant_id = p.tenant_id
         AND pv.project_id = p.project_id
         AND pv.effective_period @> statement_timestamp()
        WHERE p.tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY pv.project_code, p.project_id
      `),
    subscriptions: () =>
      executor.all<SubscriptionRow>(sql`
        SELECT
          s.tenant_subscription_id::text,
          s.commercial_channel,
          CASE latest.occurrence_kind
            WHEN 'ACTIVATED' THEN 'ACTIVE'
            WHEN 'RESUMED' THEN 'ACTIVE'
            WHEN 'SUSPENDED' THEN 'SUSPENDED'
            WHEN 'CANCELLED' THEN 'CANCELLED'
            WHEN 'EXPIRED' THEN 'EXPIRED'
            ELSE 'INACTIVE'
          END AS lifecycle_state,
          g.guard_version::text AS entitlement_guard_version
        FROM platform.tenant_subscription s
        LEFT JOIN platform.tenant_entitlement_authority_guard g
          ON g.tenant_id = s.tenant_id
        LEFT JOIN LATERAL (
          SELECT o.occurrence_kind
          FROM platform.subscription_lifecycle_occurrence o
          WHERE o.tenant_id = s.tenant_id
            AND o.tenant_subscription_id = s.tenant_subscription_id
            AND o.effective_at <= statement_timestamp()
          ORDER BY o.effective_at DESC, o.sequence DESC, o.recorded_at DESC,
                   o.subscription_lifecycle_occurrence_id DESC
          LIMIT 1
        ) latest ON true
        WHERE s.tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY
          CASE latest.occurrence_kind WHEN 'ACTIVATED' THEN 0 WHEN 'RESUMED' THEN 0 ELSE 1 END,
          s.recorded_at DESC,
          s.tenant_subscription_id
      `),
    createProject: async (input) => {
      await executor.execute(sql`
        INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
        VALUES (
          ${input.projectId},
          current_setting('cpos.tenant_id')::uuid,
          ${input.authorityContextId}
        )
      `);
      await executor.execute(sql`
        INSERT INTO platform.project_version (
          project_id,
          tenant_id,
          version,
          project_code,
          display_name,
          lifecycle_state,
          effective_period
        ) VALUES (
          ${input.projectId},
          current_setting('cpos.tenant_id')::uuid,
          1,
          ${input.projectCode},
          ${input.displayName},
          'ACTIVE',
          tstzrange(statement_timestamp(), NULL, '[)')
        )
      `);
      return {
        project_id: input.projectId,
        project_code: input.projectCode,
        display_name: input.displayName,
        lifecycle_state: 'ACTIVE',
      };
    },
  }),
});
