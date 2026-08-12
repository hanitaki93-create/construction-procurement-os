export type TenantLifecycleState = 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';
export type PrincipalLifecycleState = 'ACTIVE' | 'SUSPENDED' | 'ENDED';
export type MembershipLifecycleState = 'ACTIVE' | 'SUSPENDED' | 'ENDED';
export type ProjectLifecycleState = 'ACTIVE' | 'ARCHIVED';
export type WorkspaceSubscriptionLifecycleState =
  | 'INACTIVE'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';
export type SubscriptionAccessMode = 'FULL' | 'READ_EXPORT_ONLY' | 'NO_SUBSCRIPTION';

export interface WorkspaceTenant {
  readonly tenantId: string;
  readonly displayName: string;
  readonly lifecycleState: TenantLifecycleState;
}

export interface WorkspaceCompany {
  readonly legalEntityId: string;
  readonly legalName: string;
  readonly lifecycleState: 'ACTIVE' | 'SUSPENDED' | 'ENDED';
}

export interface WorkspacePrincipal {
  readonly principalId: string;
  readonly displayName: string;
  readonly lifecycleState: PrincipalLifecycleState;
}

export interface WorkspaceMembership {
  readonly membershipId: string;
  readonly principalId: string;
  readonly displayName: string;
  readonly membershipState: MembershipLifecycleState;
  readonly roles: readonly string[];
}

export interface WorkspaceAuthorityContext {
  readonly authorityContextId: string;
  readonly contextKind: 'SINGLE_LEGAL_ENTITY' | 'MULTI_PARTY_BOUNDED';
  readonly primaryLegalEntityId: string;
}

export interface WorkspaceProject {
  readonly projectId: string;
  readonly projectCode: string;
  readonly displayName: string;
  readonly lifecycleState: ProjectLifecycleState;
}

export interface WorkspaceSubscription {
  readonly tenantSubscriptionId: string;
  readonly commercialChannel: 'SELF_SERVICE' | 'MANUAL_ENTERPRISE';
  readonly lifecycleState: WorkspaceSubscriptionLifecycleState;
  readonly accessMode: SubscriptionAccessMode;
  readonly entitlementGuardVersion: string | null;
}

export interface PlatformWorkspaceSnapshot {
  readonly tenant: WorkspaceTenant;
  readonly company: WorkspaceCompany | null;
  readonly principal: WorkspacePrincipal;
  readonly currentMembership: WorkspaceMembership | null;
  readonly memberships: readonly WorkspaceMembership[];
  readonly authorityContext: WorkspaceAuthorityContext | null;
  readonly projects: readonly WorkspaceProject[];
  readonly subscription: WorkspaceSubscription | null;
  readonly capabilities: Readonly<{
    canCreateProject: boolean;
    canManageMemberships: boolean;
    canUseEntitledCommands: boolean;
    canReadExport: boolean;
  }>;
}

export interface CreateProjectRequest {
  readonly projectCode: string;
  readonly displayName: string;
}

export interface CreateProjectResponse {
  readonly project: WorkspaceProject;
}
