export * from './async.js';
export * from './bootstrap.js';
export * from './operation.js';
export * from './platform.js';
export * from './procurement.js';
export * from './usage.js';
export * from './workspace.js';

export type HealthState = 'ok' | 'degraded' | 'unavailable';

export interface HealthComponent {
  readonly name: string;
  readonly state: HealthState;
  readonly checkedAt: string;
  readonly detail?: string;
}

export interface LivenessResponse {
  readonly status: 'ok';
  readonly checkedAt: string;
}

export interface ReadinessResponse {
  readonly status: HealthState;
  readonly checkedAt: string;
  readonly components: readonly HealthComponent[];
}

export interface BuildMetadata {
  readonly service: string;
  readonly buildId: string;
  readonly releaseId: string;
  readonly sourceCommit: string;
  readonly runtime: string;
  readonly environment: string;
}

export const technicalOpenApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Construction Procurement OS API',
    version: '0.0.0-b02',
    description:
      'CPOS governed platform plus B04-B06 evidence, requirements and sourcing procurement surfaces.',
  },
  paths: {
    '/health/live': {
      get: {
        operationId: 'technicalHealthLive',
        summary: 'Process liveness',
        responses: { '200': { description: 'Process is alive' } },
      },
    },
    '/health/ready': {
      get: {
        operationId: 'technicalHealthReady',
        summary: 'Technical readiness',
        responses: { '200': { description: 'Technical and product-shell readiness' } },
      },
    },
    '/meta/build': {
      get: {
        operationId: 'technicalBuildMetadata',
        summary: 'Non-sensitive build metadata',
        responses: { '200': { description: 'Build compatibility metadata' } },
      },
    },
    '/platform/workspace': {
      get: {
        operationId: 'platformWorkspaceRead',
        summary: 'Read tenant, company, membership, project and subscription workspace state',
        responses: {
          '200': { description: 'Governed workspace snapshot' },
          '401': { description: 'Session context is absent or invalid' },
          '503': { description: 'Product persistence is not configured' },
        },
      },
    },
    '/platform/projects': {
      post: {
        operationId: 'platformProjectCreate',
        summary: 'Create the first or subsequent tenant project context',
        responses: {
          '201': { description: 'Project created through the governed platform runtime' },
          '400': { description: 'Project request is invalid' },
          '401': { description: 'Session context is absent or invalid' },
          '403': { description: 'Execution principal lacks tenant authority' },
          '409': { description: 'Project code or effective meaning conflicts' },
        },
      },
    },
    '/procurement/workspace': {
      get: { operationId: 'procurementWorkspaceRead', summary: 'Read B04-B06 project procurement workspace', responses: { '200': { description: 'Evidence, requirements, suppliers and RFQ state' } } },
    },
    '/procurement/evidence/uploads': {
      post: { operationId: 'procurementEvidenceUpload', summary: 'Capture and accept a verified manual evidence file', responses: { '201': { description: 'Accepted evidence version' } } },
    },
    '/procurement/requirements': {
      post: { operationId: 'procurementRequirementCreate', summary: 'Create authorized requirement source/basis', responses: { '201': { description: 'Authorized requirement created' } } },
    },
    '/procurement/allocations': {
      post: { operationId: 'procurementAllocationCreate', summary: 'Allocate authorized procurement scope', responses: { '201': { description: 'Requirement allocation created' } } },
    },
    '/procurement/packages': {
      post: { operationId: 'procurementPackageCreate', summary: 'Create optional procurement grouping package', responses: { '201': { description: 'Procurement package created' } } },
    },
    '/procurement/suppliers': {
      post: { operationId: 'procurementSupplierCreate', summary: 'Create tenant-private supplier relationship/contact', responses: { '201': { description: 'Supplier/contact created' } } },
    },
    '/procurement/suppliers/:relationshipId/contacts': {
      post: { operationId: 'procurementSupplierContactCreate', summary: 'Add a contact to an existing supplier relationship', responses: { '201': { description: 'Supplier contact created' } } },
    },
    '/procurement/rfqs': {
      post: { operationId: 'procurementRfqDraftCreate', summary: 'Create RFQ draft with registered response schema', responses: { '201': { description: 'RFQ draft created' } } },
    },
    '/procurement/rfqs/:eventId/issue': {
      post: { operationId: 'procurementRfqIssue', summary: 'Issue exact RFQ version/artifact/grants', responses: { '201': { description: 'RFQ issued' } } },
    },
    '/procurement/rfqs/:eventId/addenda': {
      post: { operationId: 'procurementRfqAddendumCreate', summary: 'Create a versioned RFQ addendum draft from the exact issued basis', responses: { '201': { description: 'RFQ addendum draft created' } } },
    },
    '/procurement/grants/:grantId/revoke': {
      post: { operationId: 'procurementGrantRevoke', summary: 'Revoke an external task grant without rewriting issue history', responses: { '200': { description: 'Grant revoked' } } },
    },
    '/procurement/grants/:grantId/transfer': {
      post: { operationId: 'procurementGrantTransfer', summary: 'Controlled grant reissue to another contact in the same supplier relationship', responses: { '201': { description: 'Replacement grant issued' } } },
    },
    '/openapi.json': {
      get: {
        operationId: 'technicalOpenApi',
        summary: 'OpenAPI 3.1 document',
        responses: { '200': { description: 'CPOS API document' } },
      },
    },
  },
} as const;
