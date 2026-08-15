export type ComparisonState = 'DRAFT' | 'FROZEN';
export type ComparisonRowKind = 'RFQ_LINE' | 'SUPPLIER_ADDED';
export type ComparisonCoverageStatus =
  | 'EXACT'
  | 'PARTIAL'
  | 'BUNDLED'
  | 'ALTERNATE'
  | 'SUPPLIER_ADDED'
  | 'MISSING'
  | 'NOT_APPLICABLE'
  | 'UNRESOLVED';
export type ComparisonAdjustmentType =
  | 'ADD_COST'
  | 'DEDUCT_COST'
  | 'EXCLUSION'
  | 'PLUG'
  | 'COMMERCIAL_NORMALIZATION';

export interface CreateBidComparisonBidderRequest {
  readonly rfqIssueBidderId: string;
  readonly selectedQuotationRevisionId: string;
}

export interface CreateBidComparisonRequest {
  readonly rfqIssueId: string;
  readonly title: string;
  readonly baseCurrency: string;
  readonly bidders: readonly CreateBidComparisonBidderRequest[];
}

export interface AddComparisonRowRequest {
  readonly rowKind: ComparisonRowKind;
  readonly rfqIssueLineId?: string;
  readonly description: string;
  readonly targetQuantity?: string;
  readonly targetUomCode?: string;
}

export interface UpsertComparisonCellRequest {
  readonly sourceQuotationLineId?: string;
  readonly coverageStatus: ComparisonCoverageStatus;
  readonly normalizedQuantity?: string;
  readonly normalizedUomCode?: string;
  readonly normalizedUnitRate?: string;
  readonly normalizedAmount?: string;
  readonly currencyConversionRate?: string;
  readonly conversionRateDate?: string;
  readonly conversionRateSource?: string;
  readonly normalizationBasis?: string;
  readonly normalizationNote?: string;
}

export interface AddComparisonAdjustmentRequest {
  readonly adjustmentType: ComparisonAdjustmentType;
  readonly adjustmentAmount: string;
  readonly reason: string;
}

export interface ComparisonSourceLine {
  readonly quotationLineId: string;
  readonly supplierLineNo: string | null;
  readonly supplierDescription: string;
  readonly quotedQuantity: string | null;
  readonly quotedUomCode: string | null;
  readonly unitRate: string | null;
  readonly lineAmount: string | null;
  readonly taxAmount: string | null;
  readonly brand: string | null;
  readonly manufacturer: string | null;
  readonly model: string | null;
  readonly inclusionExclusionNote: string | null;
  readonly deviationNote: string | null;
  readonly lineType: 'BASE' | 'ALTERNATE' | 'SUBSTITUTE' | 'UNMAPPED';
  readonly sourceReference: string | null;
}

export interface ComparisonAdjustment {
  readonly comparisonAdjustmentId: string;
  readonly adjustmentType: ComparisonAdjustmentType;
  readonly adjustmentAmount: string;
  readonly reason: string;
  readonly recordedBy: string;
  readonly recordedAt: string;
}

export interface ComparisonCell {
  readonly comparisonCellId: string;
  readonly comparisonRowId: string;
  readonly comparisonBidderId: string;
  readonly coverageStatus: ComparisonCoverageStatus;
  readonly source: ComparisonSourceLine | null;
  readonly normalizedQuantity: string | null;
  readonly normalizedUomCode: string | null;
  readonly normalizedUnitRate: string | null;
  readonly normalizedAmount: string | null;
  readonly currencyConversionRate: string | null;
  readonly conversionRateDate: string | null;
  readonly conversionRateSource: string | null;
  readonly normalizationBasis: string | null;
  readonly normalizationNote: string | null;
  readonly adjustments: readonly ComparisonAdjustment[];
  readonly adjustmentTotal: string;
  readonly evaluatedAmount: string | null;
}

export interface ComparisonRow {
  readonly comparisonRowId: string;
  readonly rowNo: number;
  readonly rowKind: ComparisonRowKind;
  readonly rfqIssueLineId: string | null;
  readonly description: string;
  readonly targetQuantity: string | null;
  readonly targetUomCode: string | null;
  readonly cells: readonly ComparisonCell[];
}

export interface ComparisonBidder {
  readonly comparisonBidderId: string;
  readonly rfqIssueBidderId: string;
  readonly selectedQuotationRevisionId: string;
  readonly quotationRevisionNo: number;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly supplierLegalName: string;
  readonly supplierQuotationReference: string | null;
  readonly quotationCurrency: string;
  readonly validityUntil: string | null;
  readonly leadTimePromise: string | null;
  readonly deliveryPromise: string | null;
  readonly paymentTerms: string | null;
  readonly warrantyTerms: string | null;
  readonly responseStatus: 'RECEIVED' | 'FINAL';
  readonly isLate: boolean;
}

export interface BidComparisonDetail {
  readonly comparisonId: string;
  readonly rfqIssueId: string;
  readonly rfqNumber: string;
  readonly rfqTitle: string;
  readonly projectId: string;
  readonly title: string;
  readonly baseCurrency: string;
  readonly state: ComparisonState;
  readonly version: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly frozenBy: string | null;
  readonly frozenAt: string | null;
  readonly snapshotId: string | null;
  readonly bidders: readonly ComparisonBidder[];
  readonly rows: readonly ComparisonRow[];
}

export interface BidComparisonRegisterRow {
  readonly comparisonId: string;
  readonly rfqIssueId: string;
  readonly rfqNumber: string;
  readonly rfqTitle: string;
  readonly projectId: string;
  readonly title: string;
  readonly baseCurrency: string;
  readonly state: ComparisonState;
  readonly bidderCount: number;
  readonly rowCount: number;
  readonly explicitCellCount: number;
  readonly missingCellCount: number;
  readonly frozenAt: string | null;
  readonly snapshotId: string | null;
}

export interface BidComparisonRegisterResponse {
  readonly comparisons: readonly BidComparisonRegisterRow[];
}

export interface CreateBidComparisonResponse {
  readonly comparison: BidComparisonDetail;
}

export interface BidComparisonDetailResponse {
  readonly comparison: BidComparisonDetail;
}

export interface FreezeBidComparisonResponse {
  readonly comparisonSnapshotId: string;
  readonly comparison: BidComparisonDetail;
}
