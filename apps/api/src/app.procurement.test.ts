import { describe, expect, it } from 'vitest';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  CreateSupplierRequest,
  CreateSupplierResponse,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionListResponse,
  ProcurementReferenceDataResponse,
  ReviewMaterialRequisitionRequest,
  SetProcurementRouteRequest,
  SupplierListResponse,
} from '@cpos/contracts';
import type { RuntimeConfig } from '@cpos/config';
import type { TechnicalLogger } from '@cpos/observability';
import type {
  GovernedProcurementRequestContext,
  GovernedProcurementService,
} from '@cpos/platform-application';

import { buildApi } from './app.js';

const tenantId = '018f0000-0000-7000-8000-000000000001';
const principalId = '018f0000-0000-7000-8000-000000000002';
const mrId = '018f0000-0000-7000-8000-000000000003';
const mrLineId = '018f0000-0000-7000-8000-000000000005';

const config = {
  bodyLimitBytes: 1_000_000,
  requestTimeoutMs: 5_000,
  trustProxy: false,
  host: '127.0.0.1',
  port: 3000,
  serviceName: 'test-api',
  logLevel: 'error',
  build: {
    service: 'api',
    buildId: 'test',
    releaseId: 'test',
    sourceCommit: 'test',
    runtime: 'node',
    environment: 'test',
  },
} as unknown as RuntimeConfig;

const logger = {
  info: () => undefined,
  error: () => undefined,
  warn: () => undefined,
  debug: () => undefined,
} as unknown as TechnicalLogger;

function contextHeaders() {
  return {
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': tenantId,
    'x-cpos-principal-id': principalId,
  };
}

function procurementService(): GovernedProcurementService {
  const summary = {
    mrId,
    mrNumber: 'MR-UAQ-26-00001',
    projectId: '018f0000-0000-7000-8000-000000000004',
    projectCode: 'UAQ',
    projectName: 'UAQ Villa',
    requesterId: principalId,
    requesterName: 'Buyer',
    requestDate: '2026-08-14',
    requiredOnSiteDate: '2026-08-30',
    priority: 'NORMAL' as const,
    subject: 'Aluminium materials',
    status: 'DRAFT' as const,
    submittedAt: null,
    lineCount: 1,
  };
  const detail = {
    ...summary,
    requesterTeam: 'Procurement',
    deliveryLocationId: null,
    instructions: null,
    reviewTrail: [],
    lines: [
      {
        mrLineId,
        lineNo: 10,
        entryMode: 'FREE_FORM' as const,
        itemId: null,
        lineType: 'MATERIAL' as const,
        description: 'Aluminium profile',
        specification: null,
        requestedQuantity: '20.000000',
        uomCode: 'M',
        requiredDateOverride: null,
        manufacturer: null,
        brand: null,
        model: null,
        equivalentRule: 'ALTERNATE_BY_APPROVAL' as const,
        preferredSupplierId: null,
        technicalNotes: null,
        approvedQuantity: null,
        lineState: 'DRAFT' as const,
        routeDecision: null,
      },
    ],
  };

  return {
    referenceData: async (_context: GovernedProcurementRequestContext): Promise<ProcurementReferenceDataResponse> => ({
      uoms: [{ code: 'M', displayName: 'Metre', quantityKind: 'LENGTH', decimalScale: 3 }],
    }),
    listSuppliers: async (): Promise<SupplierListResponse> => ({ suppliers: [] }),
    createSupplier: async (_context, request: CreateSupplierRequest): Promise<CreateSupplierResponse> => ({
      supplier: {
        supplierId: '018f0000-0000-7000-8000-000000000006',
        supplierCode: request.supplierCode,
        legalName: request.legalName,
        tradeName: null,
        supplierType: request.supplierType,
        supplierState: 'ACTIVE',
        countryCode: 'AE',
        emirateRegion: null,
        businessPhone: null,
        businessEmail: null,
        trnVatNumber: null,
        primaryContact: null,
        compliance: [],
      },
    }),
    listRequisitions: async (): Promise<MaterialRequisitionListResponse> => ({ requisitions: [summary] }),
    readRequisition: async (_context, requestedMrId): Promise<MaterialRequisitionDetailResponse | undefined> =>
      requestedMrId === mrId ? { requisition: detail } : undefined,
    createRequisition: async (
      _context,
      _request: CreateMaterialRequisitionRequest,
    ): Promise<CreateMaterialRequisitionResponse> => ({ requisition: detail }),
    submitRequisition: async (): Promise<MaterialRequisitionDetailResponse> => ({
      requisition: { ...detail, status: 'SUBMITTED', submittedAt: '2026-08-14T10:00:00.000Z' },
    }),
    reviewRequisition: async (
      _context,
      _requestedMrId,
      _request: ReviewMaterialRequisitionRequest,
    ): Promise<MaterialRequisitionDetailResponse> => ({
      requisition: {
        ...detail,
        status: 'APPROVED',
        lines: detail.lines.map((line) => ({
          ...line,
          approvedQuantity: line.requestedQuantity,
          lineState: 'APPROVED',
        })),
        reviewTrail: [
          {
            reviewOccurrenceId: '018f0000-0000-7000-8000-000000000007',
            decision: 'APPROVED',
            reviewerId: principalId,
            reviewerName: 'Buyer',
            comments: 'Approved for sourcing',
            occurredAt: '2026-08-14T10:05:00.000Z',
          },
        ],
      },
    }),
    setLineRoute: async (
      _context,
      _requestedMrId,
      _requestedMrLineId,
      request: SetProcurementRouteRequest,
    ): Promise<MaterialRequisitionDetailResponse> => ({
      requisition: {
        ...detail,
        status: 'APPROVED',
        lines: detail.lines.map((line) => ({
          ...line,
          approvedQuantity: line.requestedQuantity,
          lineState: 'APPROVED',
          routeDecision: {
            routeDecisionId: '018f0000-0000-7000-8000-000000000008',
            policyKey: 'UAE_CONTRACTOR_STARTER',
            policyVersion: 1,
            route: request.route,
            justification: request.justification ?? null,
            decidedBy: principalId,
            decidedByName: 'Buyer',
            decidedAt: '2026-08-14T10:06:00.000Z',
          },
        })),
      },
    }),
  };
}

describe('Architecture V2 procurement API', () => {
  it('requires a session for procurement reads', async () => {
    const app = buildApi({ config, logger, procurementService: procurementService() });
    const response = await app.inject({ method: 'GET', url: '/procurement/requisitions' });
    expect(response.statusCode).toBe(401);
    await app.close();
  });

  it('creates and reads a Material Requisition through the product API', async () => {
    const app = buildApi({ config, logger, procurementService: procurementService() });
    const create = await app.inject({
      method: 'POST',
      url: '/procurement/requisitions',
      headers: contextHeaders(),
      payload: {
        projectId: '018f0000-0000-7000-8000-000000000004',
        requiredOnSiteDate: '2026-08-30',
        subject: 'Aluminium materials',
        lines: [
          {
            entryMode: 'FREE_FORM',
            lineType: 'MATERIAL',
            description: 'Aluminium profile',
            requestedQuantity: '20',
            uomCode: 'M',
          },
        ],
      },
    });
    expect(create.statusCode).toBe(201);
    expect(create.json().requisition.mrNumber).toBe('MR-UAQ-26-00001');

    const read = await app.inject({
      method: 'GET',
      url: `/procurement/requisitions/${mrId}`,
      headers: contextHeaders(),
    });
    expect(read.statusCode).toBe(200);
    expect(read.json().requisition.lines).toHaveLength(1);
    await app.close();
  });

  it('reviews a submitted MR and routes an approved line', async () => {
    const app = buildApi({ config, logger, procurementService: procurementService() });
    const review = await app.inject({
      method: 'POST',
      url: `/procurement/requisitions/${mrId}/review`,
      headers: contextHeaders(),
      payload: {
        lineDecisions: [{ mrLineId, outcome: 'APPROVED', approvedQuantity: '20' }],
        comments: 'Approved for sourcing',
      },
    });
    expect(review.statusCode).toBe(200);
    expect(review.json().requisition.status).toBe('APPROVED');
    expect(review.json().requisition.reviewTrail).toHaveLength(1);

    const route = await app.inject({
      method: 'POST',
      url: `/procurement/requisitions/${mrId}/lines/${mrLineId}/route`,
      headers: contextHeaders(),
      payload: { route: 'COMPETITIVE_RFQ' },
    });
    expect(route.statusCode).toBe(200);
    expect(route.json().requisition.lines[0].routeDecision.route).toBe('COMPETITIVE_RFQ');
    await app.close();
  });

  it('creates a supplier and returns 404 for an unknown MR', async () => {
    const app = buildApi({ config, logger, procurementService: procurementService() });
    const supplier = await app.inject({
      method: 'POST',
      url: '/procurement/suppliers',
      headers: contextHeaders(),
      payload: {
        supplierCode: 'SUP-001',
        legalName: 'Al Fahad Trading LLC',
        supplierType: 'MATERIAL_SUPPLIER',
      },
    });
    expect(supplier.statusCode).toBe(201);
    expect(supplier.json().supplier.legalName).toBe('Al Fahad Trading LLC');

    const missing = await app.inject({
      method: 'GET',
      url: '/procurement/requisitions/018f0000-0000-7000-8000-000000000099',
      headers: contextHeaders(),
    });
    expect(missing.statusCode).toBe(404);
    await app.close();
  });
});
