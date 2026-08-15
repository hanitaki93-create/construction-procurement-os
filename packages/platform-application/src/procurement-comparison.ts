import type {
  AddComparisonAdjustmentRequest,
  AddComparisonRowRequest,
  BidComparisonDetail,
  BidComparisonDetailResponse,
  BidComparisonRegisterResponse,
  ComparisonAdjustment,
  ComparisonCell,
  ComparisonConfirmedBasis,
  ComparisonRow,
  ConfirmComparisonBasisRequest,
  CreateBidComparisonRequest,
  CreateBidComparisonResponse,
  FreezeBidComparisonResponse,
  UpsertComparisonCellRequest,
} from '@cpos/contracts/procurement-comparison';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  procurementComparisonPersistence,
  type ComparisonAdjustmentRowDb,
  type ComparisonBidderRowDb,
  type ComparisonCellRowDb,
  type ComparisonConfirmedBasisRowDb,
  type ComparisonHeaderRow,
  type ComparisonRowDb,
  type ProcurementComparisonPersistenceHandle,
} from './persistence/procurement-comparison-persistence.js';

export interface GovernedProcurementComparisonRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementComparisonService {
  list(context: GovernedProcurementComparisonRequestContext): Promise<BidComparisonRegisterResponse>;
  create(context: GovernedProcurementComparisonRequestContext, request: CreateBidComparisonRequest): Promise<CreateBidComparisonResponse>;
  read(context: GovernedProcurementComparisonRequestContext, comparisonId: string): Promise<BidComparisonDetailResponse | undefined>;
  addRow(context: GovernedProcurementComparisonRequestContext, comparisonId: string, request: AddComparisonRowRequest): Promise<BidComparisonDetailResponse>;
  upsertCell(context: GovernedProcurementComparisonRequestContext, comparisonId: string, rowId: string, bidderId: string, request: UpsertComparisonCellRequest): Promise<BidComparisonDetailResponse>;
  addAdjustment(context: GovernedProcurementComparisonRequestContext, comparisonId: string, cellId: string, request: AddComparisonAdjustmentRequest): Promise<BidComparisonDetailResponse>;
  confirmBasis(context: GovernedProcurementComparisonRequestContext, comparisonId: string, rowId: string, bidderId: string, request: ConfirmComparisonBasisRequest): Promise<BidComparisonDetailResponse>;
  freeze(context: GovernedProcurementComparisonRequestContext, comparisonId: string): Promise<FreezeBidComparisonResponse>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const exactDecimal = /^-?(?:0|[1-9]\d*)(?:\.\d{1,6})?$/u;
const nonNegativeDecimal = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/u;
const positiveDecimal = /^(?:0*[1-9]\d*)(?:\.\d{1,6})?$|^0*\.\d{0,5}[1-9]\d*$/u;
const positiveRate = /^(?:0*[1-9]\d*)(?:\.\d{1,12})?$|^0*\.\d{0,11}[1-9]\d*$/u;
const currencyPattern = /^[A-Z]{3}$/u;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const coverageStatuses = new Set(['EXACT','PARTIAL','BUNDLED','ALTERNATE','SUPPLIER_ADDED','MISSING','NOT_APPLICABLE','UNRESOLVED']);
const adjustmentTypes = new Set(['ADD_COST','DEDUCT_COST','EXCLUSION','PLUG','COMMERCIAL_NORMALIZATION']);
const confirmationKinds = new Set(['QUOTATION_REVISION','CLARIFICATION_CONFIRMATION','NEGOTIATED_BAFO','WRITTEN_CONFIRMATION']);

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
  if (value === undefined || !value.trim()) return null;
  const normalized = value.trim();
  if (normalized.length > max) throw new Error(`text exceeds ${max} characters`);
  return normalized;
}

function optionalDecimal(value: string | undefined, label: string, positive = false): string | null {
  if (value === undefined || !value.trim()) return null;
  const normalized = value.trim();
  if (!(positive ? positiveDecimal : exactDecimal).test(normalized)) throw new Error(`${label} is invalid exact decimal`);
  return normalized;
}

function requiredNonNegativeDecimal(value: string, label: string): string {
  const normalized = value.trim();
  if (!nonNegativeDecimal.test(normalized)) throw new Error(`${label} is invalid non-negative exact decimal`);
  return normalized;
}

function optionalNonNegativeDecimal(value: string | undefined, label: string): string | null {
  if (value === undefined || !value.trim()) return null;
  return requiredNonNegativeDecimal(value, label);
}

function optionalRate(value: string | undefined): string | null {
  if (value === undefined || !value.trim()) return null;
  const normalized = value.trim();
  if (!positiveRate.test(normalized)) throw new Error('currencyConversionRate is invalid exact decimal');
  return normalized;
}

function optionalDate(value: string | undefined): string | null {
  if (value === undefined || !value.trim()) return null;
  if (!datePattern.test(value)) throw new Error('conversionRateDate is invalid');
  return value;
}

function boundedRefs(values: readonly string[] | undefined, label: string): readonly string[] {
  if (values === undefined) return [];
  if (values.length > 100) throw new Error(`${label} contains too many references`);
  return values.map((value) => requiredText(value, label, 1000));
}

function boundedTerms(values: Readonly<Record<string, string>> | undefined): Readonly<Record<string, string>> {
  if (values === undefined) return {};
  const entries = Object.entries(values);
  if (entries.length > 50) throw new Error('confirmedTerms contains too many entries');
  return Object.fromEntries(entries.map(([key, value]) => [
    requiredText(key, 'confirmedTerms key', 120),
    requiredText(value, 'confirmedTerms value', 2000),
  ]));
}

function transactionContext(context: GovernedProcurementComparisonRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function bidder(row: ComparisonBidderRowDb) {
  return {
    comparisonBidderId: row.comparison_bidder_id,
    rfqIssueBidderId: row.rfq_issue_bidder_id,
    selectedQuotationRevisionId: row.selected_quotation_revision_id,
    quotationRevisionNo: row.quotation_revision_no,
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    supplierLegalName: row.supplier_legal_name,
    supplierQuotationReference: row.supplier_quotation_reference,
    quotationCurrency: row.quotation_currency,
    validityUntil: row.validity_until,
    leadTimePromise: row.lead_time_promise,
    deliveryPromise: row.delivery_promise,
    paymentTerms: row.payment_terms,
    warrantyTerms: row.warranty_terms,
    responseStatus: row.response_status,
    isLate: row.is_late,
  } as const;
}

function adjustment(row: ComparisonAdjustmentRowDb): ComparisonAdjustment {
  return {
    comparisonAdjustmentId: row.comparison_adjustment_id,
    adjustmentType: row.adjustment_type,
    adjustmentAmount: row.adjustment_amount,
    reason: row.reason,
    recordedBy: row.recorded_by,
    recordedAt: row.recorded_at,
  };
}

function confirmedBasis(row: ComparisonConfirmedBasisRowDb): ComparisonConfirmedBasis {
  return {
    confirmedBasisId: row.confirmed_basis_id,
    comparisonRowId: row.comparison_row_id,
    comparisonBidderId: row.comparison_bidder_id,
    basisVersion: row.basis_version,
    supersedesConfirmedBasisId: row.supersedes_confirmed_basis_id,
    confirmationKind: row.confirmation_kind,
    sourceQuotationRevisionId: row.source_quotation_revision_id,
    sourceConfirmationRefs: row.source_confirmation_refs,
    confirmedDescription: row.confirmed_description,
    confirmedQuantity: row.confirmed_quantity,
    confirmedUomCode: row.confirmed_uom_code,
    confirmedUnitRate: row.confirmed_unit_rate,
    confirmedAmount: row.confirmed_amount,
    currency: row.currency,
    confirmedTerms: row.confirmed_terms,
    technicalStatusRefs: row.technical_status_refs,
    recordedBy: row.recorded_by,
    recordedAt: row.recorded_at,
  };
}

function cell(
  row: ComparisonCellRowDb,
  adjustments: readonly ComparisonAdjustmentRowDb[],
  confirmedRows: readonly ComparisonConfirmedBasisRowDb[],
): ComparisonCell {
  const basis = confirmedRows.find(
    (item) => item.comparison_row_id === row.comparison_row_id && item.comparison_bidder_id === row.comparison_bidder_id,
  );
  return {
    comparisonCellId: row.comparison_cell_id,
    comparisonRowId: row.comparison_row_id,
    comparisonBidderId: row.comparison_bidder_id,
    coverageStatus: row.coverage_status,
    source: row.source_quotation_line_id === null || row.supplier_description === null || row.line_type === null ? null : {
      quotationLineId: row.source_quotation_line_id,
      supplierLineNo: row.supplier_line_no,
      supplierDescription: row.supplier_description,
      quotedQuantity: row.quoted_quantity,
      quotedUomCode: row.quoted_uom_code,
      unitRate: row.source_unit_rate,
      lineAmount: row.source_line_amount,
      taxAmount: row.source_tax_amount,
      brand: row.brand,
      manufacturer: row.manufacturer,
      model: row.model,
      inclusionExclusionNote: row.inclusion_exclusion_note,
      deviationNote: row.deviation_note,
      lineType: row.line_type,
      sourceReference: row.source_reference,
    },
    normalizedQuantity: row.normalized_quantity,
    normalizedUomCode: row.normalized_uom_code,
    normalizedUnitRate: row.normalized_unit_rate,
    normalizedAmount: row.normalized_amount,
    currencyConversionRate: row.currency_conversion_rate,
    conversionRateDate: row.conversion_rate_date,
    conversionRateSource: row.conversion_rate_source,
    normalizationBasis: row.normalization_basis,
    normalizationNote: row.normalization_note,
    adjustments: adjustments.filter((item) => item.comparison_cell_id === row.comparison_cell_id).map(adjustment),
    adjustmentTotal: row.adjustment_total,
    evaluatedAmount: row.evaluated_amount,
    confirmedBasis: basis === undefined ? null : confirmedBasis(basis),
  };
}

async function detail(handle: ProcurementComparisonPersistenceHandle, header: ComparisonHeaderRow): Promise<BidComparisonDetail> {
  const [bidderRows, rowRows, cellRows, adjustmentRows, confirmedRows] = await Promise.all([
    handle.bidders(header.comparison_id),
    handle.rows(header.comparison_id),
    handle.cells(header.comparison_id),
    handle.adjustments(header.comparison_id),
    handle.confirmedBasis(header.comparison_id),
  ]);
  const mappedCells = cellRows.map((item) => cell(item, adjustmentRows, confirmedRows));
  const rows: readonly ComparisonRow[] = rowRows.map((item: ComparisonRowDb) => ({
    comparisonRowId: item.comparison_row_id,
    rowNo: item.row_no,
    rowKind: item.row_kind,
    rfqIssueLineId: item.rfq_issue_line_id,
    description: item.description,
    targetQuantity: item.target_quantity,
    targetUomCode: item.target_uom_code,
    cells: mappedCells.filter((entry) => entry.comparisonRowId === item.comparison_row_id),
  }));
  return {
    comparisonId: header.comparison_id,
    comparisonNumber: header.comparison_number,
    rfqIssueId: header.rfq_issue_id,
    rfqNumber: header.rfq_number,
    rfqTitle: header.rfq_title,
    projectId: header.project_id,
    title: header.title,
    baseCurrency: header.base_currency,
    state: header.state,
    version: header.version,
    createdBy: header.created_by,
    createdAt: header.created_at,
    updatedAt: header.updated_at,
    frozenBy: header.frozen_by,
    frozenAt: header.frozen_at,
    snapshotId: header.snapshot_id,
    bidders: bidderRows.map(bidder),
    rows,
  };
}

export function createGovernedProcurementComparisonService(database: DatabaseRuntime): GovernedProcurementComparisonService {
  async function use<Result>(context: GovernedProcurementComparisonRequestContext, operationKey: string, write: boolean, callback: (handle: ProcurementComparisonPersistenceHandle) => Promise<Result>): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: write ? 'SERIALIZABLE' : 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementComparisonPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) throw new Error('verified authentication identity is not bound to this tenant principal');
        if (write && !(await handle.canManageSourcing())) throw new Error('principal is not authorized to manage bid comparison');
        return callback(handle);
      },
    );
  }

  async function readRequired(handle: ProcurementComparisonPersistenceHandle, comparisonId: string): Promise<BidComparisonDetail> {
    const header = await handle.header(comparisonId);
    if (header === undefined) throw new Error('bid comparison is not visible in this tenant');
    return detail(handle, header);
  }

  return Object.freeze({
    async list(context: GovernedProcurementComparisonRequestContext): Promise<BidComparisonRegisterResponse> {
      return use(context, 'procurement.comparison.list.v1', false, async (handle) => ({
        comparisons: (await handle.list()).map((row) => ({
          comparisonId: row.comparison_id,
          comparisonNumber: row.comparison_number,
          rfqIssueId: row.rfq_issue_id,
          rfqNumber: row.rfq_number,
          rfqTitle: row.rfq_title,
          projectId: row.project_id,
          title: row.title,
          baseCurrency: row.base_currency,
          state: row.state,
          bidderCount: row.bidder_count,
          rowCount: row.row_count,
          explicitCellCount: row.explicit_cell_count,
          missingCellCount: row.missing_cell_count,
          frozenAt: row.frozen_at,
          snapshotId: row.snapshot_id,
        })),
      }));
    },

    async create(context: GovernedProcurementComparisonRequestContext, request: CreateBidComparisonRequest): Promise<CreateBidComparisonResponse> {
      const rfqIssueId = requireUuid(request.rfqIssueId, 'rfqIssueId');
      const title = requiredText(request.title, 'title', 240);
      const baseCurrency = request.baseCurrency.trim().toUpperCase();
      if (!currencyPattern.test(baseCurrency)) throw new Error('baseCurrency is invalid');
      if (request.bidders.length < 1) throw new Error('comparison must contain at least one selected quotation revision');
      const seenBidders = new Set<string>();
      const bidders = request.bidders.map((item) => {
        const rfqIssueBidderId = requireUuid(item.rfqIssueBidderId, 'rfqIssueBidderId');
        const selectedQuotationRevisionId = requireUuid(item.selectedQuotationRevisionId, 'selectedQuotationRevisionId');
        if (seenBidders.has(rfqIssueBidderId)) throw new Error('comparison cannot select the same bidder twice');
        seenBidders.add(rfqIssueBidderId);
        return { rfqIssueBidderId, selectedQuotationRevisionId };
      });
      return use(context, 'procurement.comparison.create.v1', true, async (handle) => {
        const comparisonId = await handle.createHeader({ rfqIssueId, title, baseCurrency, actorId: context.principalId });
        for (const item of bidders) await handle.addBidder({ comparisonId, ...item, actorId: context.principalId });
        const rowCount = await handle.bootstrapIssueRows(comparisonId, context.principalId);
        if (rowCount < 1) throw new Error('comparison RFQ issue must contain at least one issued line');
        return { comparison: await readRequired(handle, comparisonId) };
      });
    },

    async read(context: GovernedProcurementComparisonRequestContext, comparisonId: string): Promise<BidComparisonDetailResponse | undefined> {
      const id = requireUuid(comparisonId, 'comparisonId');
      return use(context, 'procurement.comparison.read.v1', false, async (handle) => {
        const header = await handle.header(id);
        return header === undefined ? undefined : { comparison: await detail(handle, header) };
      });
    },

    async addRow(context: GovernedProcurementComparisonRequestContext, comparisonId: string, request: AddComparisonRowRequest): Promise<BidComparisonDetailResponse> {
      const id = requireUuid(comparisonId, 'comparisonId');
      const description = requiredText(request.description, 'description', 2000);
      const rowKind = request.rowKind;
      if (rowKind !== 'RFQ_LINE' && rowKind !== 'SUPPLIER_ADDED') throw new Error('rowKind is invalid');
      const rfqIssueLineId = request.rfqIssueLineId === undefined ? null : requireUuid(request.rfqIssueLineId, 'rfqIssueLineId');
      const targetQuantity = optionalDecimal(request.targetQuantity, 'targetQuantity', true);
      const targetUomCode = optionalText(request.targetUomCode, 80);
      if (rowKind === 'RFQ_LINE' && (rfqIssueLineId === null || targetQuantity === null || targetUomCode === null)) throw new Error('RFQ_LINE requires issued line, quantity and UOM');
      if (rowKind === 'SUPPLIER_ADDED' && rfqIssueLineId !== null) throw new Error('SUPPLIER_ADDED cannot bind an RFQ issue line');
      return use(context, 'procurement.comparison.row.add.v1', true, async (handle) => {
        await handle.addRow({ comparisonId: id, rowKind, rfqIssueLineId, description, targetQuantity, targetUomCode, actorId: context.principalId });
        return { comparison: await readRequired(handle, id) };
      });
    },

    async upsertCell(context: GovernedProcurementComparisonRequestContext, comparisonId: string, rowId: string, bidderId: string, request: UpsertComparisonCellRequest): Promise<BidComparisonDetailResponse> {
      const id = requireUuid(comparisonId, 'comparisonId');
      const comparisonRowId = requireUuid(rowId, 'comparisonRowId');
      const comparisonBidderId = requireUuid(bidderId, 'comparisonBidderId');
      if (!coverageStatuses.has(request.coverageStatus)) throw new Error('coverageStatus is invalid');
      const sourceQuotationLineId = request.sourceQuotationLineId === undefined ? null : requireUuid(request.sourceQuotationLineId, 'sourceQuotationLineId');
      const normalizedQuantity = optionalDecimal(request.normalizedQuantity, 'normalizedQuantity', true);
      const normalizedUomCode = optionalText(request.normalizedUomCode, 80);
      const normalizedUnitRate = optionalDecimal(request.normalizedUnitRate, 'normalizedUnitRate');
      const normalizedAmount = optionalDecimal(request.normalizedAmount, 'normalizedAmount');
      const currencyConversionRate = optionalRate(request.currencyConversionRate);
      const conversionRateDate = optionalDate(request.conversionRateDate);
      const conversionRateSource = optionalText(request.conversionRateSource, 500);
      const normalizationBasis = optionalText(request.normalizationBasis, 2000);
      const normalizationNote = optionalText(request.normalizationNote, 4000);
      return use(context, 'procurement.comparison.cell.upsert.v1', true, async (handle) => {
        await handle.upsertCell({ comparisonId: id, comparisonRowId, comparisonBidderId, sourceQuotationLineId, coverageStatus: request.coverageStatus, normalizedQuantity, normalizedUomCode, normalizedUnitRate, normalizedAmount, currencyConversionRate, conversionRateDate, conversionRateSource, normalizationBasis, normalizationNote, actorId: context.principalId });
        return { comparison: await readRequired(handle, id) };
      });
    },

    async addAdjustment(context: GovernedProcurementComparisonRequestContext, comparisonId: string, cellId: string, request: AddComparisonAdjustmentRequest): Promise<BidComparisonDetailResponse> {
      const id = requireUuid(comparisonId, 'comparisonId');
      const comparisonCellId = requireUuid(cellId, 'comparisonCellId');
      if (!adjustmentTypes.has(request.adjustmentType)) throw new Error('adjustmentType is invalid');
      const adjustmentAmount = optionalDecimal(request.adjustmentAmount, 'adjustmentAmount');
      if (adjustmentAmount === null) throw new Error('adjustmentAmount is required');
      const reason = requiredText(request.reason, 'reason', 4000);
      return use(context, 'procurement.comparison.adjustment.add.v1', true, async (handle) => {
        await handle.addAdjustment({ comparisonId: id, comparisonCellId, adjustmentType: request.adjustmentType, adjustmentAmount, reason, actorId: context.principalId });
        return { comparison: await readRequired(handle, id) };
      });
    },

    async confirmBasis(context: GovernedProcurementComparisonRequestContext, comparisonId: string, rowId: string, bidderId: string, request: ConfirmComparisonBasisRequest): Promise<BidComparisonDetailResponse> {
      const id = requireUuid(comparisonId, 'comparisonId');
      const comparisonRowId = requireUuid(rowId, 'comparisonRowId');
      const comparisonBidderId = requireUuid(bidderId, 'comparisonBidderId');
      if (!confirmationKinds.has(request.confirmationKind)) throw new Error('confirmationKind is invalid');
      const sourceQuotationRevisionId = request.sourceQuotationRevisionId === undefined ? null : requireUuid(request.sourceQuotationRevisionId, 'sourceQuotationRevisionId');
      if (request.confirmationKind === 'QUOTATION_REVISION' && sourceQuotationRevisionId === null) throw new Error('QUOTATION_REVISION confirmation requires sourceQuotationRevisionId');
      const sourceConfirmationRefs = boundedRefs(request.sourceConfirmationRefs, 'sourceConfirmationRefs');
      if (request.confirmationKind !== 'QUOTATION_REVISION' && sourceConfirmationRefs.length < 1) throw new Error('non-quotation confirmation requires sourceConfirmationRefs');
      const confirmedDescription = requiredText(request.confirmedDescription, 'confirmedDescription', 2000);
      const confirmedQuantity = optionalDecimal(request.confirmedQuantity, 'confirmedQuantity', true);
      const confirmedUomCode = optionalText(request.confirmedUomCode, 80);
      if ((confirmedQuantity === null) !== (confirmedUomCode === null)) throw new Error('confirmedQuantity and confirmedUomCode must be provided together');
      const confirmedUnitRate = optionalNonNegativeDecimal(request.confirmedUnitRate, 'confirmedUnitRate');
      const confirmedAmount = requiredNonNegativeDecimal(request.confirmedAmount, 'confirmedAmount');
      const currency = request.currency.trim().toUpperCase();
      if (!currencyPattern.test(currency)) throw new Error('currency is invalid');
      const confirmedTerms = boundedTerms(request.confirmedTerms);
      const technicalStatusRefs = boundedRefs(request.technicalStatusRefs, 'technicalStatusRefs');
      return use(context, 'procurement.comparison.basis.confirm.v1', true, async (handle) => {
        await handle.confirmBasis({
          comparisonId: id,
          comparisonRowId,
          comparisonBidderId,
          confirmationKind: request.confirmationKind,
          sourceQuotationRevisionId,
          sourceConfirmationRefsJson: JSON.stringify(sourceConfirmationRefs),
          confirmedDescription,
          confirmedQuantity,
          confirmedUomCode,
          confirmedUnitRate,
          confirmedAmount,
          currency,
          confirmedTermsJson: JSON.stringify(confirmedTerms),
          technicalStatusRefsJson: JSON.stringify(technicalStatusRefs),
          actorId: context.principalId,
        });
        return { comparison: await readRequired(handle, id) };
      });
    },

    async freeze(context: GovernedProcurementComparisonRequestContext, comparisonId: string): Promise<FreezeBidComparisonResponse> {
      const id = requireUuid(comparisonId, 'comparisonId');
      return use(context, 'procurement.comparison.freeze.v1', true, async (handle) => {
        const comparisonSnapshotId = await handle.freeze(id);
        return { comparisonSnapshotId, comparison: await readRequired(handle, id) };
      });
    },
  });
}