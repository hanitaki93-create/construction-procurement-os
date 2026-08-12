import { randomUUID } from 'node:crypto';

import type {
  CreateProjectRequest,
  CreateProjectResponse,
  PlatformWorkspaceSnapshot,
  WorkspaceMembership,
  WorkspaceSubscription,
} from '@cpos/contracts';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  platformWorkspacePersistence,
  type MembershipRoleRow,
  type PlatformWorkspacePersistenceHandle,
  type SubscriptionRow,
} from './persistence/workspace.js';

export interface GovernedPlatformRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedPlatformWorkspaceService {
  readWorkspace(context: GovernedPlatformRequestContext): Promise<PlatformWorkspaceSnapshot>;
  createProject(
    context: GovernedPlatformRequestContext,
    request: CreateProjectRequest,
  ): Promise<CreateProjectResponse>;
}

const projectCodePattern = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,63}$/u;

function normalizedProject(input: CreateProjectRequest): Readonly<{
  projectCode: string;
  displayName: string;
}> {
  const projectCode = input.projectCode.trim();
  const displayName = input.displayName.trim();
  if (!projectCodePattern.test(projectCode)) throw new Error('projectCode is invalid');
  if (displayName.length < 1 || displayName.length > 240) throw new Error('displayName is invalid');
  return { projectCode, displayName };
}

function transactionContext(context: GovernedPlatformRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function groupMemberships(rows: readonly MembershipRoleRow[]): readonly WorkspaceMembership[] {
  const grouped = new Map<string, WorkspaceMembership>();
  for (const row of rows) {
    const existing = grouped.get(row.membership_id);
    const roles = new Set(existing?.roles ?? []);
    if (row.role_key !== null) roles.add(row.role_key);
    grouped.set(row.membership_id, {
      membershipId: row.membership_id,
      principalId: row.principal_id,
      displayName: row.display_name,
      membershipState: row.membership_state,
      roles: [...roles].sort((left, right) => left.localeCompare(right)),
    });
  }
  return [...grouped.values()].sort((left, right) =>
    left.displayName.localeCompare(right.displayName),
  );
}

function workspaceSubscription(row: SubscriptionRow | undefined): WorkspaceSubscription | null {
  if (row === undefined) return null;
  return {
    tenantSubscriptionId: row.tenant_subscription_id,
    commercialChannel: row.commercial_channel,
    lifecycleState: row.lifecycle_state,
    accessMode: row.lifecycle_state === 'ACTIVE' ? 'FULL' : 'READ_EXPORT_ONLY',
    entitlementGuardVersion: row.entitlement_guard_version,
  };
}

export function createGovernedPlatformWorkspaceService(
  database: DatabaseRuntime,
): GovernedPlatformWorkspaceService {
  async function verifyAndUse<Result>(
    context: GovernedPlatformRequestContext,
    operationKey: string,
    callback: (handle: PlatformWorkspacePersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: 'READ COMMITTED', logicalIdentity: context.invocationId },
      platformWorkspacePersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  return Object.freeze({
    async readWorkspace(
      context: GovernedPlatformRequestContext,
    ): Promise<PlatformWorkspaceSnapshot> {
      return verifyAndUse<PlatformWorkspaceSnapshot>(
        context,
        'platform.workspace.read.v1',
        async (handle) => {
          const [tenant, principal, company, authorities, membershipRows, projects, subscriptions] =
            await Promise.all([
              handle.tenant(),
              handle.principal(),
              handle.company(),
              handle.authorityContexts(),
              handle.memberships(),
              handle.projects(),
              handle.subscriptions(),
            ]);
          if (tenant === undefined || principal === undefined) {
            throw new Error('tenant or principal is not available in the governed workspace');
          }
          const memberships = groupMemberships(membershipRows);
          const currentMembership =
            memberships.find((entry) => entry.principalId === context.principalId) ?? null;
          const subscription = workspaceSubscription(subscriptions[0]);
          const activeMember = currentMembership?.membershipState === 'ACTIVE';
          const owner = activeMember && currentMembership.roles.includes('OWNER');
          const fullAccess = subscription?.accessMode === 'FULL';
          return {
            tenant: {
              tenantId: tenant.tenant_id,
              displayName: tenant.display_name,
              lifecycleState: tenant.lifecycle_state,
            },
            company:
              company === undefined
                ? null
                : {
                    legalEntityId: company.legal_entity_id,
                    legalName: company.legal_name,
                    lifecycleState: company.lifecycle_state,
                  },
            principal: {
              principalId: principal.principal_id,
              displayName: principal.display_name,
              lifecycleState: principal.lifecycle_state,
            },
            currentMembership,
            memberships,
            authorityContext:
              authorities.length === 1 && authorities[0] !== undefined
                ? {
                    authorityContextId: authorities[0].authority_context_id,
                    contextKind: authorities[0].context_kind,
                    primaryLegalEntityId: authorities[0].primary_legal_entity_id,
                  }
                : null,
            projects: projects.map((project) => ({
              projectId: project.project_id,
              projectCode: project.project_code,
              displayName: project.display_name,
              lifecycleState: project.lifecycle_state,
            })),
            subscription,
            capabilities: {
              canCreateProject: Boolean(owner && fullAccess && authorities.length === 1),
              canManageMemberships: Boolean(owner),
              canUseEntitledCommands: Boolean(activeMember && fullAccess),
              canReadExport: Boolean(activeMember),
            },
          };
        },
      );
    },

    async createProject(
      context: GovernedPlatformRequestContext,
      request: CreateProjectRequest,
    ): Promise<CreateProjectResponse> {
      const input = normalizedProject(request);
      return verifyAndUse<CreateProjectResponse>(
        context,
        'platform.project.create.v1',
        async (handle) => {
          const authorities = await handle.authorityContexts();
          if (authorities.length !== 1 || authorities[0] === undefined) {
            throw new Error('exactly one active authority context is required for project creation');
          }
          const row = await handle.createProject({
            projectId: randomUUID(),
            authorityContextId: authorities[0].authority_context_id,
            projectCode: input.projectCode,
            displayName: input.displayName,
          });
          return {
            project: {
              projectId: row.project_id,
              projectCode: row.project_code,
              displayName: row.display_name,
              lifecycleState: row.lifecycle_state,
            },
          };
        },
      );
    },
  });
}
