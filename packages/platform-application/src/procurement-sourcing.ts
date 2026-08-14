import type {
  CreateProcurementPackageRequest,
  CreateProcurementPackageResponse,
  CreateRfqDraftRequest,
  CreateRfqDraftResponse,
  ProcurementPackageDetail,
  ProcurementPackageDetailResponse,
  ProcurementPackageListResponse,
  ProcurementPackageSummary,
  ProcurementPackageType,
  RfqBidder,
  RfqDetail,
  RfqDetailResponse,
  RfqEventType,
  RfqListResponse,
  RfqSummary,
  SourcingCandidateLine,
  SourcingCandidatesResponse,
} from '@cpos/contracts';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  procurementSourcingPersistence,
  type PackageHeaderRow,
  type PackageScopeRow,
  type ProcurementSourcingPersistenceHandle,
  type RfqBidderRow,
  type RfqHeaderRow,
  type RfqLineRow,
  type SourcingCandidateRow,
} from './persistence/procurement-sourcing.js';

export interface GovernedSourcingRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementSourcingService {
  listCandidates(context: GovernedSourcingRequestContext): Promise<SourcingCandidatesResponse>;
  listPackages(context: GovernedSourcingRequestContext): Promise<ProcurementPackageListResponse>;
  readPackage(context: GovernedSourcingRequestContext, packageId: string): Promise<ProcurementPackageDetailResponse | undefined>;
  createPackage(context: GovernedSourcingRequestContext, request: CreateProcurementPackageRequest): Promise<CreateProcurementPackageResponse>;
  listRfqs(context: GovernedSourcingRequestContext): Promise<RfqListResponse>;
  readRfq(context: GovernedSourcingRequestContext, rfqId: string): Promise<RfqDetailResponse | undefined>;
  createRfqDraft(context: GovernedSourcingRequestContext, request: CreateRfqDraftRequest): Promise<CreateRfqDraftResponse>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const exactPositiveDecimal = /^(?:0*[1-9]\d*)(?:\.\d{1,6})?$|^0*\.\d{0,5}[1-9]\d*$/u;
const currencyPattern = /^[A-Z]{3}$/u;
const timezonePattern = /^[A-Za-z_]+\/[A-Za-z_+-]+(?:\/[A-Za-z_+-]+)?$/u;
const packageTypes = new Set<ProcurementPackageType>(['MATERIAL_PACKAGE','TRADE_PACKAGE','SUBCONTRACT_PACKAGE','SERVICE_PACKAGE','MIXED']);
const eventTypes = new Set<RfqEventType>(['RFQ','TENDER','RFP']);
const pricingBases = new Set(['UNIT_AND_TOTAL','LUMP_SUM','RATE_SCHEDULE','MIXED']);
const evaluationModes = new Set(['COMBINED','TWO_STAGE']);
const visibilityPolicies = new Set(['BUYER_AFTER_CLOSE','BUYER_ON_RECEIPT','SEALED_TWO_STAGE']);

function requireUuid(value: string, label: string): string {
  const normalized = value.trim();
  if (!uuidPattern.test(normalized)) throw new Error(`${label} is invalid`);
  return normalized;
}

function requiredText(value: string, label: string, max: number): string {
  const normalized = value.trim();
  if (normalized.length < 1 || normalized.length > max) throw new Error(`${label} is invalid`);
  return normalized;
}

function optionalText(value: string | undefined, max: number): string | null {
  if (value === undefined) return null;
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > max) throw new Error(`text exceeds ${max} characters`);
  return normalized;
}

function optionalDate(value: string | undefined, label: string): string | null {
  if (value === undefined || !value.trim()) return null;
  if (!datePattern.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) throw new Error(`${label} is invalid`);
  return value;
}

function positiveQuantity(value: string, label: string): string {
  const normalized = value.trim();
  if (!exactPositiveDecimal.test(normalized)) throw new Error(`${label} must be a positive exact decimal with at most 6 decimals`);
  return normalized;
}

function compareDecimal(left: string, right: string): number {
  const [li = '0', lf = ''] = left.split('.');
  const [ri = '0', rf = ''] = right.split('.');
  const scale = Math.max(lf.length, rf.length);
  const l = BigInt(li) * 10n ** BigInt(scale) + BigInt(lf.padEnd(scale, '0') || '0');
  const r = BigInt(ri) * 10n ** BigInt(scale) + BigInt(rf.padEnd(scale, '0') || '0');
  return l < r ? -1 : l > r ? 1 : 0;
}

function transactionContext(context: GovernedSourcingRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function candidate(row: SourcingCandidateRow): SourcingCandidateLine {
  return {
    mrId: row.mr_id,
    mrNumber: row.mr_number,
    mrLineId: row.mr_line_id,
    lineNo: row.line_no,
    projectId: row.project_id,
    projectCode: row.project_code,
    projectName: row.project_name,
    subject: row.subject,
    description: row.description,
    specification: row.specification,
    approvedQuantity: row.approved_quantity,
    uomCode: row.uom_code,
    requiredDate: row.required_date,
    equivalentRule: row.equivalent_rule,
    route: row.route,
    routeDecisionId: row.route_decision_id,
    policyKey: row.policy_key,
    policyVersion: row.policy_version,
    alreadyPackagedQuantity: row.already_packaged_quantity,
  };
}

function packageSummary(row: PackageHeaderRow): ProcurementPackageSummary {
  return {
    packageId: row.package_id,
    packageNumber: row.package_number,
    projectId: row.project_id,
    projectCode: row.project_code,
    projectName: row.project_name,
    title: row.title,
    tradeCategory: row.trade_category,
    packageType: row.package_type,
    ownerId: row.owner_id,
    ownerName: row.owner_name,
    requiredOnSiteDate: row.required_on_site_date,
    targetAwardDate: row.target_award_date,
    status: row.status,
    sourceLineCount: row.source_line_count,
    routePolicyKey: row.route_policy_key,
    routePolicyVersion: row.route_policy_version,
  };
}

function packageScope(row: PackageScopeRow) {
  return {
    packageScopeId: row.package_scope_id,
    mrId: row.mr_id,
    mrNumber: row.mr_number,
    mrLineId: row.mr_line_id,
    sourceLineNo: row.source_line_no,
    description: row.description,
    specification: row.specification,
    allocatedQuantity: row.allocated_quantity,
    uomCode: row.uom_code,
    requiredDate: row.required_date,
  } as const;
}

async function packageDetail(handle: ProcurementSourcingPersistenceHandle, packageId: string): Promise<ProcurementPackageDetail | undefined> {
  const header = await handle.package(packageId);
  if (header === undefined) return undefined;
  const scope = await handle.packageScope(packageId);
  return { ...packageSummary(header), scopeSummary: header.scope_summary, scope: scope.map(packageScope) };
}

function rfqSummary(row: RfqHeaderRow): RfqSummary {
  return {
    rfqId: row.rfq_id,
    rfqNumber: row.rfq_number,
    projectId: row.project_id,
    projectCode: row.project_code,
    projectName: row.project_name,
    packageId: row.package_id,
    packageNumber: row.package_number,
    title: row.title,
    eventType: row.event_type,
    buyerId: row.buyer_id,
    buyerName: row.buyer_name,
    responseDueAt: row.response_due_at,
    responseTimezone: row.response_timezone,
    currency: row.currency,
    pricingBasis: row.pricing_basis,
    evaluationMode: row.evaluation_mode,
    bidVisibilityPolicy: row.bid_visibility_policy,
    status: row.status,
    revisionNo: row.revision_no,
    sourceLineCount: row.source_line_count,
    bidderCount: row.bidder_count,
    routePolicyKey: row.route_policy_key,
    routePolicyVersion: row.route_policy_version,
  };
}

function rfqBidder(row: RfqBidderRow): RfqBidder {
  return {
    rfqBidderId: row.rfq_bidder_id,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    legalName: row.legal_name,
    supplierContactId: row.supplier_contact_id,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    invitationState: row.invitation_state,
    eligibilityNote: row.eligibility_note,
    supplier: null,
  };
}

function rfqLine(row: RfqLineRow) {
  return {
    rfqLineId: row.rfq_line_id,
    lineNo: row.line_no,
    mrLineId: row.mr_line_id,
    packageScopeId: row.package_scope_id,
    mrNumber: row.mr_number,
    sourceLineNo: row.source_line_no,
    description: row.description,
    specification: row.specification,
    quantity: row.quantity,
    uomCode: row.uom_code,
    requiredDate: row.required_date,
    equivalentRule: row.equivalent_rule,
  } as const;
}

async function rfqDetail(handle: ProcurementSourcingPersistenceHandle, rfqId: string): Promise<RfqDetail | undefined> {
  const header = await handle.rfq(rfqId);
  if (header === undefined) return undefined;
  const [lines, bidders] = await Promise.all([handle.rfqLines(rfqId), handle.rfqBidders(rfqId)]);
  return {
    ...rfqSummary(header),
    issueAt: header.issue_at,
    paymentTermRequirement: header.payment_term_requirement,
    validityDays: header.validity_days,
    commercialInstructions: header.commercial_instructions,
    submissionInstructions: header.submission_instructions,
    lines: lines.map(rfqLine),
    bidders: bidders.map(rfqBidder),
  };
}

export function createGovernedProcurementSourcingService(
  database: DatabaseRuntime,
  now: () => Date = () => new Date(),
): GovernedProcurementSourcingService {
  async function verifyAndUse<Result>(
    context: GovernedSourcingRequestContext,
    operationKey: string,
    callback: (handle: ProcurementSourcingPersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementSourcingPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  return Object.freeze<GovernedProcurementSourcingService>({
    listCandidates: (context) => verifyAndUse(context, 'procurement.sourcing.candidates.v1', async (handle) => ({
      candidates: (await handle.sourcingCandidates()).map(candidate),
    })),

    listPackages: (context) => verifyAndUse(context, 'procurement.package.list.v1', async (handle) => ({
      packages: (await handle.packages()).map(packageSummary),
    })),

    readPackage: async (context, rawPackageId) => {
      const packageId = requireUuid(rawPackageId, 'packageId');
      const value = await verifyAndUse(context, 'procurement.package.read.v1', (handle) => packageDetail(handle, packageId));
      return value === undefined ? undefined : { package: value };
    },

    createPackage: (context, request) => verifyAndUse(context, 'procurement.package.create.v1', async (handle) => {
      if (!(await handle.canManageSourcing())) throw new Error('not authorized to manage procurement sourcing');
      const projectId = requireUuid(request.projectId, 'projectId');
      const project = await handle.project(projectId);
      if (project === undefined) throw new Error('project is not active or not visible in this tenant');
      if (!Array.isArray(request.sourceLines) || request.sourceLines.length < 1 || request.sourceLines.length > 250) {
        throw new Error('Package must contain between 1 and 250 source lines');
      }
      const packageType = request.packageType ?? 'MATERIAL_PACKAGE';
      if (!packageTypes.has(packageType)) throw new Error('packageType is invalid');
      const requiredOnSiteDate = optionalDate(request.requiredOnSiteDate, 'requiredOnSiteDate');
      const targetAwardDate = optionalDate(request.targetAwardDate, 'targetAwardDate');
      if (requiredOnSiteDate !== null && targetAwardDate !== null && targetAwardDate > requiredOnSiteDate) {
        throw new Error('targetAwardDate cannot be after requiredOnSiteDate');
      }

      const sourceIds = new Set<string>();
      const source: { row: SourcingCandidateRow; quantity: string }[] = [];
      for (const requested of request.sourceLines) {
        const mrLineId = requireUuid(requested.mrLineId, 'mrLineId');
        if (sourceIds.has(mrLineId)) throw new Error('Package contains a duplicate MR source line');
        sourceIds.add(mrLineId);
        const row = await handle.sourcingCandidate(mrLineId);
        if (row === undefined || row.route !== 'PACKAGE_SOURCING') throw new Error('MR line is not approved and routed for PACKAGE_SOURCING');
        if (row.project_id !== projectId) throw new Error('Package source line does not belong to the selected project');
        const quantity = positiveQuantity(requested.allocatedQuantity, 'allocatedQuantity');
        const remaining = Number(row.approved_quantity) - Number(row.already_packaged_quantity);
        if (!Number.isFinite(remaining) || remaining <= 0 || Number(quantity) > remaining + 1e-9) {
          throw new Error('Package allocation exceeds remaining approved MR authority');
        }
        source.push({ row, quantity });
      }
      const policyKey = source[0]!.row.policy_key;
      const policyVersion = source[0]!.row.policy_version;
      if (source.some(({ row }) => row.policy_key !== policyKey || row.policy_version !== policyVersion)) {
        throw new Error('Package source lines use conflicting procurement policy versions');
      }

      const year = now().getUTCFullYear().toString();
      const scopeKey = `PROJECT:${projectId}:YEAR:${year}`;
      await handle.ensureCounter('PACKAGE', scopeKey);
      const sequence = await handle.allocateNextNumber('PACKAGE', scopeKey);
      const packageNumber = `PKG-${project.project_code}-${year.slice(2)}-${String(sequence).padStart(4, '0')}`;
      const packageId = await handle.createPackage({
        projectId,
        packageNumber,
        scopeKey,
        title: requiredText(request.title, 'title', 240),
        tradeCategory: optionalText(request.tradeCategory, 160),
        packageType,
        ownerId: context.principalId,
        requiredOnSiteDate,
        targetAwardDate,
        scopeSummary: optionalText(request.scopeSummary, 4000),
        policyKey,
        policyVersion,
        createdBy: context.principalId,
      });
      for (const entry of source) {
        await handle.createPackageScope({ packageId, mrLineId: entry.row.mr_line_id, allocatedQuantity: entry.quantity, uomCode: entry.row.uom_code });
      }
      const created = await packageDetail(handle, packageId);
      if (created === undefined) throw new Error('created Package is not readable');
      return { package: created };
    }),

    listRfqs: (context) => verifyAndUse(context, 'procurement.rfq.list.v1', async (handle) => ({
      rfqs: (await handle.rfqs()).map(rfqSummary),
    })),

    readRfq: async (context, rawRfqId) => {
      const rfqId = requireUuid(rawRfqId, 'rfqId');
      const value = await verifyAndUse(context, 'procurement.rfq.read.v1', (handle) => rfqDetail(handle, rfqId));
      return value === undefined ? undefined : { rfq: value };
    },

    createRfqDraft: (context, request) => verifyAndUse(context, 'procurement.rfq.create.v1', async (handle) => {
      if (!(await handle.canManageSourcing())) throw new Error('not authorized to manage procurement sourcing');
      const projectId = requireUuid(request.projectId, 'projectId');
      const project = await handle.project(projectId);
      if (project === undefined) throw new Error('project is not active or not visible in this tenant');
      if (!Array.isArray(request.sourceLines) || request.sourceLines.length < 1 || request.sourceLines.length > 250) {
        throw new Error('RFQ must contain between 1 and 250 source lines');
      }
      if (!Array.isArray(request.bidderSupplierIds) || request.bidderSupplierIds.length < 1 || request.bidderSupplierIds.length > 200) {
        throw new Error('RFQ draft must contain between 1 and 200 selected bidders');
      }
      const eventType = request.eventType ?? 'RFQ';
      if (!eventTypes.has(eventType)) throw new Error('eventType is invalid');
      const pricingBasis = request.pricingBasis ?? 'UNIT_AND_TOTAL';
      if (!pricingBases.has(pricingBasis)) throw new Error('pricingBasis is invalid');
      const evaluationMode = request.evaluationMode ?? 'COMBINED';
      if (!evaluationModes.has(evaluationMode)) throw new Error('evaluationMode is invalid');
      const bidVisibilityPolicy = request.bidVisibilityPolicy ?? 'BUYER_AFTER_CLOSE';
      if (!visibilityPolicies.has(bidVisibilityPolicy)) throw new Error('bidVisibilityPolicy is invalid');
      const currency = (request.currency ?? 'AED').trim().toUpperCase();
      if (!currencyPattern.test(currency)) throw new Error('currency is invalid');
      const responseTimezone = (request.responseTimezone ?? 'Asia/Dubai').trim();
      if (!timezonePattern.test(responseTimezone) || responseTimezone.length > 80) throw new Error('responseTimezone is invalid');
      const responseDueAt = new Date(request.responseDueAt);
      if (Number.isNaN(responseDueAt.getTime()) || responseDueAt.getTime() <= now().getTime()) throw new Error('responseDueAt must be a future date-time');
      const validityDays = request.validityDays ?? null;
      if (validityDays !== null && (!Number.isInteger(validityDays) || validityDays < 1 || validityDays > 3650)) throw new Error('validityDays is invalid');

      const packageId = request.packageId === undefined ? null : requireUuid(request.packageId, 'packageId');
      const packageHeader = packageId === null ? undefined : await handle.package(packageId);
      if (packageId !== null && (packageHeader === undefined || packageHeader.project_id !== projectId)) {
        throw new Error('Package does not belong to the selected project');
      }
      const packageScopeIds = packageId === null ? new Set<string>() : new Set((await handle.packageScope(packageId)).map((entry) => entry.package_scope_id));

      const sourceIds = new Set<string>();
      const source: { row: SourcingCandidateRow; quantity: string; packageScopeId: string | null }[] = [];
      for (const requested of request.sourceLines) {
        const mrLineId = requireUuid(requested.mrLineId, 'mrLineId');
        if (sourceIds.has(mrLineId)) throw new Error('RFQ contains a duplicate MR source line');
        sourceIds.add(mrLineId);
        const row = await handle.sourcingCandidate(mrLineId);
        if (row === undefined || row.project_id !== projectId) throw new Error('RFQ source line is not approved or does not belong to the selected project');
        const quantity = positiveQuantity(requested.quantity, 'quantity');
        let sourceAuthority = row.approved_quantity;
        let packageScopeId: string | null = null;
        if (packageId !== null) {
          if (requested.packageScopeId === undefined) throw new Error('Package RFQ source requires packageScopeId');
          packageScopeId = requireUuid(requested.packageScopeId, 'packageScopeId');
          if (!packageScopeIds.has(packageScopeId)) throw new Error('packageScopeId does not belong to the selected Package');
          const scope = await handle.packageScopeById(packageScopeId);
          if (scope === undefined || scope.mr_line_id !== mrLineId) throw new Error('packageScopeId does not match the selected MR source line');
          sourceAuthority = scope.allocated_quantity;
        } else if (row.route !== 'COMPETITIVE_RFQ') {
          throw new Error('Direct RFQ source is not routed for COMPETITIVE_RFQ');
        }
        if (compareDecimal(quantity, sourceAuthority) > 0) throw new Error('RFQ quantity exceeds governed source authority');
        source.push({ row, quantity, packageScopeId });
      }

      const policyKey = packageHeader?.route_policy_key ?? source[0]!.row.policy_key;
      const policyVersion = packageHeader?.route_policy_version ?? source[0]!.row.policy_version;
      if (source.some(({ row }) => row.policy_key !== policyKey || row.policy_version !== policyVersion)) {
        throw new Error('RFQ source lines use conflicting procurement policy versions');
      }

      const bidderIds = request.bidderSupplierIds.map((value) => requireUuid(value, 'supplierId'));
      if (new Set(bidderIds).size !== bidderIds.length) throw new Error('RFQ contains duplicate selected bidders');

      const year = now().getUTCFullYear().toString();
      const scopeKey = `PROJECT:${projectId}:YEAR:${year}`;
      await handle.ensureCounter('RFQ', scopeKey);
      const sequence = await handle.allocateNextNumber('RFQ', scopeKey);
      const rfqNumber = `${eventType}-${project.project_code}-${year.slice(2)}-${String(sequence).padStart(5, '0')}`;
      const rfqId = await handle.createRfq({
        projectId,
        rfqNumber,
        scopeKey,
        title: requiredText(request.title, 'title', 240),
        eventType,
        buyerId: context.principalId,
        packageId,
        policyKey,
        policyVersion,
        responseDueAt: responseDueAt.toISOString(),
        responseTimezone,
        currency,
        pricingBasis: pricingBasis as RfqHeaderRow['pricing_basis'],
        paymentTermRequirement: optionalText(request.paymentTermRequirement, 1000),
        validityDays,
        commercialInstructions: optionalText(request.commercialInstructions, 6000),
        submissionInstructions: optionalText(request.submissionInstructions, 6000),
        evaluationMode: evaluationMode as RfqHeaderRow['evaluation_mode'],
        bidVisibilityPolicy: bidVisibilityPolicy as RfqHeaderRow['bid_visibility_policy'],
        createdBy: context.principalId,
      });
      for (const [index, entry] of source.entries()) {
        await handle.createRfqLine({
          rfqId,
          lineNo: (index + 1) * 10,
          mrLineId: entry.row.mr_line_id,
          packageScopeId: entry.packageScopeId,
          description: entry.row.description,
          specification: entry.row.specification,
          quantity: entry.quantity,
          uomCode: entry.row.uom_code,
          requiredDate: entry.row.required_date,
          equivalentRule: entry.row.equivalent_rule,
        });
      }
      for (const supplierId of bidderIds) await handle.createRfqBidder({ rfqId, supplierId });
      const created = await rfqDetail(handle, rfqId);
      if (created === undefined) throw new Error('created RFQ is not readable');
      return { rfq: created };
    }),
  });
}
