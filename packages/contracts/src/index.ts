export * from './async.js';
export * from './bootstrap.js';
export * from './operation.js';
export * from './platform.js';
export * from './procurement.js';
export * from './procurement-sourcing.js';
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
    version: '0.2.0-v2-session02',
    description:
      'Architecture V2 product API: accepted platform substrate plus Supplier Master, Material/Purchase Requisition, optional Procurement Package and RFQ/Tender draft formation.',
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
        responses: { '200': { description: 'Technical and product readiness' } },
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
        summary: 'Create a tenant project context',
        responses: {
          '201': { description: 'Project created through the governed platform runtime' },
          '400': { description: 'Project request is invalid' },
          '401': { description: 'Session context is absent or invalid' },
          '403': { description: 'Execution principal lacks tenant authority' },
          '409': { description: 'Project code or effective meaning conflicts' },
        },
      },
    },
    '/procurement/reference-data': {
      get: {
        operationId: 'procurementReferenceDataRead',
        summary: 'Read governed procurement reference data used by live forms',
        responses: { '200': { description: 'UOM and starter procurement references' } },
      },
    },
    '/procurement/suppliers': {
      get: {
        operationId: 'supplierList',
        summary: 'List tenant suppliers with primary contact and compliance state',
        responses: { '200': { description: 'Supplier register' } },
      },
      post: {
        operationId: 'supplierCreate',
        summary: 'Create a real supplier/subcontractor master record',
        responses: {
          '201': { description: 'Supplier created' },
          '400': { description: 'Supplier request invalid' },
          '409': { description: 'Supplier code/name conflict' },
        },
      },
    },
    '/procurement/requisitions': {
      get: {
        operationId: 'materialRequisitionList',
        summary: 'List Material/Purchase Requisitions for the governed tenant',
        responses: { '200': { description: 'MR register' } },
      },
      post: {
        operationId: 'materialRequisitionCreate',
        summary: 'Create a numbered MR with real lines',
        responses: {
          '201': { description: 'MR created' },
          '400': { description: 'MR validation failed' },
          '409': { description: 'MR numbering or source conflict' },
        },
      },
    },
    '/procurement/requisitions/{mrId}': {
      get: {
        operationId: 'materialRequisitionRead',
        summary: 'Read one MR and its lines, review trail and route decisions',
        responses: { '200': { description: 'MR detail' }, '404': { description: 'MR not found' } },
      },
    },
    '/procurement/requisitions/{mrId}/submit': {
      post: {
        operationId: 'materialRequisitionSubmit',
        summary: 'Submit a draft MR for review',
        responses: {
          '200': { description: 'MR submitted' },
          '409': { description: 'MR cannot be submitted in its current state' },
        },
      },
    },
    '/procurement/requisitions/{mrId}/review': {
      post: {
        operationId: 'materialRequisitionReview',
        summary: 'Review every MR line and approve, partially approve or reject the requisition',
        responses: {
          '200': { description: 'MR review recorded' },
          '403': { description: 'Reviewer lacks procurement authority' },
          '409': { description: 'MR changed or is no longer reviewable' },
        },
      },
    },
    '/procurement/requisitions/{mrId}/lines/{mrLineId}/route': {
      post: {
        operationId: 'materialRequisitionLineRoute',
        summary: 'Set or supersede the procurement route for an approved MR line',
        responses: {
          '200': { description: 'Route decision recorded' },
          '400': { description: 'Route or justification is invalid' },
          '403': { description: 'Buyer lacks route authority' },
          '409': { description: 'Line is not approved/routable' },
        },
      },
    },
    '/procurement/sourcing/candidates': {
      get: {
        operationId: 'procurementSourcingCandidates',
        summary: 'List approved routed MR scope available for Package or RFQ formation',
        responses: { '200': { description: 'Sourcing candidate lines with source authority and route' } },
      },
    },
    '/procurement/packages': {
      get: {
        operationId: 'procurementPackageList',
        summary: 'List optional Procurement Packages',
        responses: { '200': { description: 'Package register' } },
      },
      post: {
        operationId: 'procurementPackageCreate',
        summary: 'Create a governed Package from approved PACKAGE_SOURCING MR lines',
        responses: {
          '201': { description: 'Package created without re-keying source demand' },
          '400': { description: 'Package scope or schedule is invalid' },
          '403': { description: 'Buyer lacks procurement authority' },
        },
      },
    },
    '/procurement/packages/{packageId}': {
      get: {
        operationId: 'procurementPackageRead',
        summary: 'Read Package header and source-line allocation',
        responses: { '200': { description: 'Package detail' }, '404': { description: 'Package not found' } },
      },
    },
    '/procurement/rfqs': {
      get: {
        operationId: 'rfqList',
        summary: 'List RFQ/Tender market-event drafts and live events',
        responses: { '200': { description: 'RFQ/Tender register' } },
      },
      post: {
        operationId: 'rfqDraftCreate',
        summary: 'Create a numbered RFQ/Tender draft from governed MR or Package scope',
        responses: {
          '201': { description: 'RFQ/Tender draft created with source lineage and bidder membership' },
          '400': { description: 'Source scope, timing, supplier or commercial basis is invalid' },
          '403': { description: 'Buyer lacks procurement authority' },
        },
      },
    },
    '/procurement/rfqs/{rfqId}': {
      get: {
        operationId: 'rfqRead',
        summary: 'Read RFQ/Tender header, sourced lines and selected bidders',
        responses: { '200': { description: 'RFQ/Tender detail' }, '404': { description: 'RFQ not found' } },
      },
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