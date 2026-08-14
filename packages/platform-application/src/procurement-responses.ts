import type {
  CreateSupplierQuotationRequest,
  CreateSupplierQuotationResponse,
  IssueRfqResponse,
  RecordSupplierIntentRequest,
  RecordSupplierIntentResponse,
  RfqIssueBidder,
  RfqIssueDetail,
  RfqIssueLine,
  SupplierIntentEvent,
  SupplierQuotationDetailResponse,
  SupplierQuotationLine,
  SupplierQuotationRevision,
  SupplierResponseRegisterResponse,
  SupplierResponseRegisterRow,
} from '@cpos/contracts/procurement-responses';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  procurementResponsePersistence,
  type ProcurementResponsePersistenceHandle,
  type RfqIssueBidderRow,
  type RfqIssueHeaderRow,
  type RfqIssueLineRow,
  type SupplierIntentEventRow,
  type SupplierQuotationHeaderRow,
  type SupplierQuotationLineRow,
  type SupplierResponseRegisterRowDb,
} from './persistence/procurement-responses.js';

export interface GovernedProcurementResponseRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementResponseService {
  issueRfq(context: GovernedProcurementResponseRequestContext, rfqId: string): Promise<IssueRfqResponse>;
  readLatestIssue(context: GovernedProcurementResponseRequestContext, rfqId: string): Promise<IssueRfqResponse | undefined>;
  listResponses(context: GovernedProcurementResponseRequestContext, rfqId?: string): Promise<SupplierResponseRegisterResponse>;
  recordIntent(context: GovernedProcurementResponseRequestContext, rfqId: string, rfqBidderId: string, request: RecordSupplierIntentRequest): Promise<RecordSupplierIntentResponse>;
  createQuotation(context: GovernedProcurementResponseRequestContext, rfqId: string, rfqBidderId: string, request: CreateSupplierQuotationRequest): Promise<CreateSupplierQuotationResponse>;
  readQuotation(context: GovernedProcurementResponseRequestContext, quotationRevisionId: string): Promise<SupplierQuotationDetailResponse | undefined>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const positiveDecimal = /^(?:0*[1-9]\d*)(?:\.\d{1,6})?$|^0*\.\d{0,5}[1-9]\d*$/u;
const signedDecimal = /^-?(?:0|[1-9]\d*)(?:\.\d{1,6})?$/u;
const currencyPattern = /^[A-Z]{3}$/u;
const sha256Pattern = /^[0-9a-f]{64}$/u;
const intentChannels = new Set(['SECURE_TASK','EMAIL','PHONE','BUYER_CAPTURE','OTHER']);
const responseChannels = new Set(['SECURE_TASK','FILE_UPLOAD','EMAIL','BUYER_CAPTURE','API','OTHER']);
const captureModes = new Set(['SUPPLIER_DIRECT','BUYER_ON_BEHALF','INTEGRATION']);
const responseStatuses = new Set(['RECEIVED','WITHDRAWN','FINAL']);
const lineTypes = new Set(['BASE','ALTERNATE','SUBSTITUTE','UNMAPPED']);

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

function optionalPositiveDecimal(value: string | undefined, label: string): string | null {
  if (value === undefined || !value.trim()) return null;
  const normalized = value.trim();
  if (!positiveDecimal.test(normalized)) throw new Error(`${label} must be a positive exact decimal with at most 6 decimals`);
  return normalized;
}

function optionalSignedDecimal(value: string | undefined, label: string): string | null {
  if (value === undefined || !value.trim()) return null;
  const normalized = value.trim();
  if (!signedDecimal.test(normalized)) throw new Error(`${label} must be an exact decimal with at most 6 decimals`);
  return normalized;
}

function transactionContext(context: GovernedProcurementResponseRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function issueLine(row: RfqIssueLineRow): RfqIssueLine {
  return {
    rfqIssueLineId: row.rfq_issue_line_id,
    sourceRfqLineId: row.source_rfq_line_id,
    lineNo: row.line_no,
    mrLineId: row.mr_line_id,
    packageScopeId: row.package_scope_id,
    description: row.description,
    specification: row.specification,
    quantity: row.quantity,
    uomCode: row.uom_code,
    requiredDate: row.required_date,
    equivalentRule: row.equivalent_rule,
  };
}

function issueBidder(row: RfqIssueBidderRow): RfqIssueBidder {
  return {
    rfqIssueBidderId: row.rfq_issue_bidder_id,
    sourceRfqBidderId: row.source_rfq_bidder_id,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    legalName: row.legal_name,
    supplierContactId: row.supplier_contact_id,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    invitationState: row.invitation_state,
    eligibilityNote: row.eligibility_note,
  };
}

async function issueDetail(handle: ProcurementResponsePersistenceHandle, header: RfqIssueHeaderRow): Promise<RfqIssueDetail> {
  const [lines, bidders] = await Promise.all([handle.issueLines(header.rfq_issue_id), handle.issueBidders(header.rfq_issue_id)]);
  return {
    rfqIssueId: header.rfq_issue_id,
    rfqId: header.rfq_id,
    revisionNo: header.revision_no,
    rfqNumber: header.rfq_number,
    title: header.title,
    eventType: header.event_type,
    projectId: header.project_id,
    packageId: header.package_id,
    buyerId: header.buyer_id,
    issuedAt: header.issued_at,
    responseDueAt: header.response_due_at,
    responseTimezone: header.response_timezone,
    currency: header.currency,
    pricingBasis: header.pricing_basis,
    paymentTermRequirement: header.payment_term_requirement,
    validityDays: header.validity_days,
    commercialInstructions: header.commercial_instructions,
    submissionInstructions: header.submission_instructions,
    evaluationMode: header.evaluation_mode,
    bidVisibilityPolicy: header.bid_visibility_policy,
    routePolicyKey: header.route_policy_key,
    routePolicyVersion: header.route_policy_version,
    issuedBy: header.issued_by,
    lines: lines.map(issueLine),
    bidders: bidders.map(issueBidder),
  };
}

function intentEvent(row: SupplierIntentEventRow): SupplierIntentEvent {
  return {
    intentEventId: row.intent_event_id,
    rfqIssueBidderId: row.rfq_issue_bidder_id,
    intent: row.intent,
    reason: row.reason,
    channel: row.channel,
    recordedBy: row.recorded_by,
    recordedAt: row.recorded_at,
  };
}

function quotationLine(row: SupplierQuotationLineRow): SupplierQuotationLine {
  return {
    quotationLineId: row.quotation_line_id,
    rfqIssueLineId: row.rfq_issue_line_id,
    rfqLineNo: row.rfq_line_no,
    supplierLineNo: row.supplier_line_no,
    supplierDescription: row.supplier_description,
    quotedQuantity: row.quoted_quantity,
    quotedUomCode: row.quoted_uom_code,
    unitRate: row.unit_rate,
    lineAmount: row.line_amount,
    taxAmount: row.tax_amount,
    brand: row.brand,
    manufacturer: row.manufacturer,
    model: row.model,
    leadTimeOverride: row.lead_time_override,
    inclusionExclusionNote: row.inclusion_exclusion_note,
    deviationNote: row.deviation_note,
    lineType: row.line_type,
    sourceReference: row.source_reference,
  };
}

async function quotationRevision(handle: ProcurementResponsePersistenceHandle, row: SupplierQuotationHeaderRow): Promise<SupplierQuotationRevision> {
  const lines = await handle.quotationLines(row.quotation_revision_id);
  return {
    quotationRevisionId: row.quotation_revision_id,
    rfqIssueBidderId: row.rfq_issue_bidder_id,
    revisionNo: row.revision_no,
    supersedesRevisionId: row.supersedes_revision_id,
    supplierQuotationReference: row.supplier_quotation_reference,
    quotationDate: row.quotation_date,
    receivedAt: row.received_at,
    responseChannel: row.response_channel,
    captureMode: row.capture_mode,
    capturedByPrincipalId: row.captured_by_principal_id,
    currency: row.currency,
    validityUntil: row.validity_until,
    leadTimePromise: row.lead_time_promise,
    deliveryPromise: row.delivery_promise,
    paymentTerms: row.payment_terms,
    warrantyTerms: row.warranty_terms,
    commercialNotes: row.commercial_notes,
    responseStatus: row.response_status,
    sourceFileName: row.source_file_name,
    sourceMediaType: row.source_media_type,
    sourceSha256: row.source_sha256,
    sourceChannelReference: row.source_channel_reference,
    isLate: row.is_late,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierLegalName: row.supplier_legal_name,
    contactName: row.contact_name,
    rfqIssueId: row.rfq_issue_id,
    rfqId: row.rfq_id,
    rfqNumber: row.rfq_number,
    rfqTitle: row.rfq_title,
    issueRevisionNo: row.issue_revision_no,
    lines: lines.map(quotationLine),
  };
}

function registerRow(row: SupplierResponseRegisterRowDb): SupplierResponseRegisterRow {
  return {
    rfqId: row.rfq_id,
    rfqNumber: row.rfq_number,
    rfqTitle: row.rfq_title,
    issueRevisionNo: row.issue_revision_no,
    rfqIssueId: row.rfq_issue_id,
    responseDueAt: row.response_due_at,
    rfqIssueBidderId: row.rfq_issue_bidder_id,
    sourceRfqBidderId: row.source_rfq_bidder_id,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierLegalName: row.supplier_legal_name,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    invitationState: row.invitation_state,
    intent: row.intent,
    intentReason: row.intent_reason,
    intentChannel: row.intent_channel,
    intentRecordedAt: row.intent_recorded_at,
    latestQuotationRevisionId: row.latest_quotation_revision_id,
    latestRevisionNo: row.latest_revision_no,
    receivedAt: row.received_at,
    responseChannel: row.response_channel,
    currency: row.currency,
    validityUntil: row.validity_until,
    responseStatus: row.response_status,
    isLate: row.is_late,
    lineCount: row.line_count,
    sourceFileName: row.source_file_name,
    completeness: row.latest_quotation_revision_id === null ? 'NO_RESPONSE' : row.line_count > 0 ? 'STRUCTURED' : 'PARTIAL',
    clarificationState: 'NONE',
    comparisonState: 'NOT_STARTED',
  };
}

export function createGovernedProcurementResponseService(
  database: DatabaseRuntime,
  now: () => Date = () => new Date(),
): GovernedProcurementResponseService {
  async function verifyAndUse<Result>(
    context: GovernedProcurementResponseRequestContext,
    operationKey: string,
    callback: (handle: ProcurementResponsePersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementResponsePersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  return Object.freeze<GovernedProcurementResponseService>({
    issueRfq: (context, rawRfqId) => verifyAndUse(context, 'procurement.rfq.issue.v1', async (handle) => {
      if (!(await handle.canManageSourcing())) throw new Error('not authorized to manage procurement sourcing');
      const rfqId = requireUuid(rawRfqId, 'rfqId');
      const source = await handle.rfqForIssue(rfqId);
      if (source === undefined) throw new Error('RFQ is not visible in this tenant');
      if (source.status === 'ISSUED' || source.status === 'REISSUED') {
        const existing = await handle.latestIssueForRfq(rfqId);
        if (existing === undefined) throw new Error('issued RFQ has no immutable issue basis');
        return { issue: await issueDetail(handle, existing) };
      }
      if (!['DRAFT','REVIEW','READY'].includes(source.status)) throw new Error('RFQ is not in an issuable state');
      if (source.source_line_count < 1) throw new Error('RFQ cannot be issued without governed source lines');
      if (source.bidder_count < 1) throw new Error('RFQ cannot be issued without selected bidders');
      const issuedAt = now().toISOString();
      const rfqIssueId = await handle.createIssueFromRfq(rfqId, issuedAt, context.principalId);
      const [lineCount, bidderCount] = await Promise.all([
        handle.snapshotIssueLines(rfqIssueId, rfqId),
        handle.snapshotIssueBidders(rfqIssueId, rfqId),
      ]);
      if (lineCount !== source.source_line_count || bidderCount !== source.bidder_count) {
        throw new Error('RFQ issue snapshot did not preserve all source lines and bidders');
      }
      await handle.markRfqBiddersInvited(rfqId);
      await handle.markRfqIssued(rfqId, issuedAt);
      const header = await handle.issue(rfqIssueId);
      if (header === undefined) throw new Error('created RFQ issue basis is not readable');
      return { issue: await issueDetail(handle, header) };
    }),

    readLatestIssue: async (context, rawRfqId) => {
      const rfqId = requireUuid(rawRfqId, 'rfqId');
      return verifyAndUse(context, 'procurement.rfq.issue.read.v1', async (handle) => {
        const header = await handle.latestIssueForRfq(rfqId);
        return header === undefined ? undefined : { issue: await issueDetail(handle, header) };
      });
    },

    listResponses: (context, rawRfqId) => verifyAndUse(context, 'procurement.response.list.v1', async (handle) => ({
      responses: (await handle.responseRegister(rawRfqId === undefined ? undefined : requireUuid(rawRfqId, 'rfqId'))).map(registerRow),
    })),

    recordIntent: (context, rawRfqId, rawRfqBidderId, request) => verifyAndUse(context, 'procurement.response.intent.v1', async (handle) => {
      if (!(await handle.canManageSourcing())) throw new Error('not authorized to manage procurement sourcing');
      const rfqId = requireUuid(rawRfqId, 'rfqId');
      const rfqBidderId = requireUuid(rawRfqBidderId, 'rfqBidderId');
      if (request.intent !== 'WILL_BID' && request.intent !== 'NO_BID') throw new Error('intent is invalid');
      if (!intentChannels.has(request.channel)) throw new Error('intent channel is invalid');
      const issue = await handle.latestIssueForRfq(rfqId);
      if (issue === undefined) throw new Error('RFQ must be issued before supplier intent can be recorded');
      const bidder = await handle.issueBidderBySource(issue.rfq_issue_id, rfqBidderId);
      if (bidder === undefined) throw new Error('supplier was not invited on the current issued RFQ basis');
      const intentEventId = await handle.recordIntent({
        issueBidderId: bidder.rfq_issue_bidder_id,
        intent: request.intent,
        reason: optionalText(request.reason, 2000),
        channel: request.channel,
        recordedBy: context.principalId,
      });
      const created = await handle.intentEvent(intentEventId);
      if (created === undefined) throw new Error('recorded supplier intent is not readable');
      return { event: intentEvent(created) };
    }),

    createQuotation: (context, rawRfqId, rawRfqBidderId, request) => verifyAndUse(context, 'procurement.response.quotation.create.v1', async (handle) => {
      if (!(await handle.canManageSourcing())) throw new Error('not authorized to capture supplier quotations');
      const rfqId = requireUuid(rawRfqId, 'rfqId');
      const rfqBidderId = requireUuid(rawRfqBidderId, 'rfqBidderId');
      const issue = await handle.latestIssueForRfq(rfqId);
      if (issue === undefined) throw new Error('RFQ must be issued before supplier quotations can be captured');
      const bidder = await handle.issueBidderBySource(issue.rfq_issue_id, rfqBidderId);
      if (bidder === undefined) throw new Error('supplier was not invited on the current issued RFQ basis');
      const lockedBidder = await handle.lockIssueBidder(bidder.rfq_issue_bidder_id);
      if (lockedBidder === undefined) throw new Error('issued bidder is not visible in this tenant');
      const latestIntent = await handle.latestIntent(bidder.rfq_issue_bidder_id);
      if (latestIntent?.intent === 'NO_BID') throw new Error('supplier is currently recorded as NO_BID; record WILL_BID before capturing a quotation');

      if (!responseChannels.has(request.responseChannel)) throw new Error('responseChannel is invalid');
      if (!captureModes.has(request.captureMode)) throw new Error('captureMode is invalid');
      const responseStatus = request.responseStatus ?? 'RECEIVED';
      if (!responseStatuses.has(responseStatus)) throw new Error('responseStatus is invalid');
      const currency = request.currency.trim().toUpperCase();
      if (!currencyPattern.test(currency)) throw new Error('currency is invalid');
      if (!Array.isArray(request.lines) || request.lines.length < 1 || request.lines.length > 1000) {
        throw new Error('quotation must contain between 1 and 1000 structured source lines');
      }

      const receivedAt = request.receivedAt === undefined ? now() : new Date(request.receivedAt);
      if (Number.isNaN(receivedAt.getTime())) throw new Error('receivedAt is invalid');
      if (receivedAt.getTime() > now().getTime() + 5 * 60 * 1000) throw new Error('receivedAt cannot be in the future');
      const quotationDate = optionalDate(request.quotationDate, 'quotationDate');
      const validityUntil = optionalDate(request.validityUntil, 'validityUntil');
      if (quotationDate !== null && validityUntil !== null && validityUntil < quotationDate) throw new Error('validityUntil cannot be before quotationDate');
      const sourceSha256 = optionalText(request.sourceSha256, 64)?.toLowerCase() ?? null;
      if (sourceSha256 !== null && !sha256Pattern.test(sourceSha256)) throw new Error('sourceSha256 is invalid');

      const sourceLines = await handle.issueLines(issue.rfq_issue_id);
      const sourceLineIds = new Set(sourceLines.map((line) => line.rfq_issue_line_id));
      const normalizedLines = request.lines.map((line, index) => {
        const rfqIssueLineId = line.rfqIssueLineId === undefined ? null : requireUuid(line.rfqIssueLineId, `lines[${index}].rfqIssueLineId`);
        if (rfqIssueLineId !== null && !sourceLineIds.has(rfqIssueLineId)) throw new Error(`lines[${index}] maps outside the current issued RFQ basis`);
        const lineType = line.lineType ?? (rfqIssueLineId === null ? 'UNMAPPED' : 'BASE');
        if (!lineTypes.has(lineType)) throw new Error(`lines[${index}].lineType is invalid`);
        if (rfqIssueLineId === null && lineType !== 'UNMAPPED') throw new Error(`lines[${index}] without RFQ mapping must be UNMAPPED`);
        return {
          rfqIssueLineId,
          supplierLineNo: optionalText(line.supplierLineNo, 80),
          supplierDescription: requiredText(line.supplierDescription, `lines[${index}].supplierDescription`, 2000),
          quotedQuantity: optionalPositiveDecimal(line.quotedQuantity, `lines[${index}].quotedQuantity`),
          quotedUomCode: optionalText(line.quotedUomCode, 80),
          unitRate: optionalSignedDecimal(line.unitRate, `lines[${index}].unitRate`),
          lineAmount: optionalSignedDecimal(line.lineAmount, `lines[${index}].lineAmount`),
          taxAmount: optionalSignedDecimal(line.taxAmount, `lines[${index}].taxAmount`),
          brand: optionalText(line.brand, 240),
          manufacturer: optionalText(line.manufacturer, 240),
          model: optionalText(line.model, 240),
          leadTimeOverride: optionalText(line.leadTimeOverride, 1000),
          inclusionExclusionNote: optionalText(line.inclusionExclusionNote, 4000),
          deviationNote: optionalText(line.deviationNote, 4000),
          lineType: lineType as 'BASE' | 'ALTERNATE' | 'SUBSTITUTE' | 'UNMAPPED',
          sourceReference: optionalText(line.sourceReference, 1000),
        };
      });

      const latest = await handle.latestQuotation(bidder.rfq_issue_bidder_id);
      const quotationRevisionId = await handle.createQuotation({
        issueBidderId: bidder.rfq_issue_bidder_id,
        revisionNo: latest === undefined ? 0 : latest.revision_no + 1,
        supersedesRevisionId: latest?.quotation_revision_id ?? null,
        supplierQuotationReference: optionalText(request.supplierQuotationReference, 160),
        quotationDate,
        receivedAt: receivedAt.toISOString(),
        responseChannel: request.responseChannel,
        captureMode: request.captureMode,
        capturedByPrincipalId: request.captureMode === 'BUYER_ON_BEHALF' ? context.principalId : null,
        currency,
        validityUntil,
        leadTimePromise: optionalText(request.leadTimePromise, 1000),
        deliveryPromise: optionalText(request.deliveryPromise, 1000),
        paymentTerms: optionalText(request.paymentTerms, 2000),
        warrantyTerms: optionalText(request.warrantyTerms, 2000),
        commercialNotes: optionalText(request.commercialNotes, 6000),
        responseStatus: responseStatus as 'RECEIVED' | 'WITHDRAWN' | 'FINAL',
        sourceFileName: optionalText(request.sourceFileName, 500),
        sourceMediaType: optionalText(request.sourceMediaType, 200),
        sourceSha256,
        sourceChannelReference: optionalText(request.sourceChannelReference, 1000),
        createdBy: context.principalId,
      });
      for (const line of normalizedLines) {
        await handle.createQuotationLine({ quotationRevisionId, ...line });
      }
      const created = await handle.quotation(quotationRevisionId);
      if (created === undefined) throw new Error('created supplier quotation is not readable');
      return { quotation: await quotationRevision(handle, created) };
    }),

    readQuotation: async (context, rawQuotationRevisionId) => {
      const quotationRevisionId = requireUuid(rawQuotationRevisionId, 'quotationRevisionId');
      return verifyAndUse(context, 'procurement.response.quotation.read.v1', async (handle) => {
        const header = await handle.quotation(quotationRevisionId);
        if (header === undefined) return undefined;
        const [quotation, historyRows] = await Promise.all([
          quotationRevision(handle, header),
          handle.quotationHistory(header.rfq_issue_bidder_id),
        ]);
        const revisionHistory: SupplierQuotationRevision[] = [];
        for (const row of historyRows) revisionHistory.push(await quotationRevision(handle, row));
        return { quotation, revisionHistory };
      });
    },
  });
}
