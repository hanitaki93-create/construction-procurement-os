import { randomUUID } from 'node:crypto';

import type {
  CreateProjectRequest,
  CreateProjectResponse,
  PlatformWorkspaceSnapshot,
  WorkspaceProject,
} from '@cpos/contracts';

import type {
  PlatformRequestContext,
  PlatformWorkspaceService,
} from './app.js';

export const developmentDemoSession = Object.freeze({
  tenantId: '019d1111-1111-7111-8111-111111111111',
  principalId: '019d3333-3333-7333-8333-333333333333',
});

const projectCodePattern = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,63}$/u;

function validateSession(context: PlatformRequestContext): void {
  if (
    context.tenantId !== developmentDemoSession.tenantId ||
    context.principalId !== developmentDemoSession.principalId
  ) {
    throw new Error('development session is not authorized for the demo workspace');
  }
}

function validateProject(request: CreateProjectRequest): Readonly<{
  projectCode: string;
  displayName: string;
}> {
  const projectCode = request.projectCode.trim();
  const displayName = request.displayName.trim();
  if (!projectCodePattern.test(projectCode)) {
    throw new Error('projectCode must be a bounded project code');
  }
  if (displayName.length < 1 || displayName.length > 240) {
    throw new Error('displayName must contain from 1 to 240 characters');
  }
  return { projectCode, displayName };
}

export function createDevelopmentPlatformWorkspaceService(): PlatformWorkspaceService {
  const projects: WorkspaceProject[] = [
    {
      projectId: '019d6666-6666-7666-8666-666666666661',
      projectCode: 'JP-047',
      displayName: 'Jumeirah Park Villa 47',
      lifecycleState: 'ACTIVE',
    },
    {
      projectId: '019d6666-6666-7666-8666-666666666662',
      projectCode: 'UAQ-0066',
      displayName: 'UAQ Private Villa',
      lifecycleState: 'ACTIVE',
    },
  ];

  function snapshot(): PlatformWorkspaceSnapshot {
    return {
      tenant: {
        tenantId: developmentDemoSession.tenantId,
        displayName: 'CPOS Demo Contractor',
        lifecycleState: 'ACTIVE',
      },
      company: {
        legalEntityId: '019d2222-2222-7222-8222-222222222222',
        legalName: 'CPOS Demo Contracting LLC',
        lifecycleState: 'ACTIVE',
      },
      principal: {
        principalId: developmentDemoSession.principalId,
        displayName: 'Workspace Owner',
        lifecycleState: 'ACTIVE',
      },
      currentMembership: {
        membershipId: '019d4444-4444-7444-8444-444444444444',
        principalId: developmentDemoSession.principalId,
        displayName: 'Workspace Owner',
        membershipState: 'ACTIVE',
        roles: ['OWNER'],
      },
      memberships: [
        {
          membershipId: '019d4444-4444-7444-8444-444444444444',
          principalId: developmentDemoSession.principalId,
          displayName: 'Workspace Owner',
          membershipState: 'ACTIVE',
          roles: ['OWNER'],
        },
        {
          membershipId: '019d4444-4444-7444-8444-444444444445',
          principalId: '019d3333-3333-7333-8333-333333333334',
          displayName: 'Procurement Manager',
          membershipState: 'ACTIVE',
          roles: ['PROCUREMENT_MANAGER'],
        },
        {
          membershipId: '019d4444-4444-7444-8444-444444444446',
          principalId: '019d3333-3333-7333-8333-333333333335',
          displayName: 'Commercial Reviewer',
          membershipState: 'ACTIVE',
          roles: ['COMMERCIAL_REVIEWER'],
        },
      ],
      authorityContext: {
        authorityContextId: '019d5555-5555-7555-8555-555555555555',
        contextKind: 'SINGLE_LEGAL_ENTITY',
        primaryLegalEntityId: '019d2222-2222-7222-8222-222222222222',
      },
      projects: [...projects],
      subscription: {
        tenantSubscriptionId: '019d7777-7777-7777-8777-777777777777',
        commercialChannel: 'MANUAL_ENTERPRISE',
        lifecycleState: 'ACTIVE',
        accessMode: 'FULL',
        entitlementGuardVersion: '4',
      },
      capabilities: {
        canCreateProject: true,
        canManageMemberships: true,
        canUseEntitledCommands: true,
        canReadExport: true,
      },
    };
  }

  return Object.freeze({
    async readWorkspace(
      context: PlatformRequestContext,
    ): Promise<PlatformWorkspaceSnapshot> {
      validateSession(context);
      return snapshot();
    },

    async createProject(
      context: PlatformRequestContext,
      request: CreateProjectRequest,
    ): Promise<CreateProjectResponse> {
      validateSession(context);
      const input = validateProject(request);
      if (
        projects.some(
          (project) => project.projectCode.toLowerCase() === input.projectCode.toLowerCase(),
        )
      ) {
        throw new Error('project code already exists in the demo workspace');
      }
      const project: WorkspaceProject = {
        projectId: randomUUID(),
        projectCode: input.projectCode,
        displayName: input.displayName,
        lifecycleState: 'ACTIVE',
      };
      projects.push(project);
      return { project };
    },
  });
}
