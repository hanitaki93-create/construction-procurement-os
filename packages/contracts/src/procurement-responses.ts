export type SupplierIntent = 'WILL_BID' | 'NO_BID';
export type SupplierIntentChannel = 'SECURE_TASK' | 'EMAIL' | 'PHONE' | 'BUYER_CAPTURE' | 'OTHER';
export type QuotationResponseChannel = 'SECURE_TASK' | 'FILE_UPLOAD' | 'EMAIL' | 'BUYER_CAPTURE' | 'API' | 'OTHER';
export type QuotationCaptureMode = 'SUPPLIER_DIRECT' | 'BUYER_ON_BEHALF' | 'INTEGRATION';
export type QuotationResponseStatus = 'RECEIVED' | 'WITHDRAWN' | 'FINAL';
export type QuotationLineType = 'BASE' | 'ALTERNATE' | 'SUBSTITUTE' | 'UNMAPPED';

export interface RfqIssueLine {
  readonly rfqIssueLineId: string;
  readonly sourceRfqLineId: string;
  readonly lineNo: number;
  readonly mrLineId: string;
  readonly packageScopeId: string | null;
  readonly description: string;
  readonly specification: string | null;
  readonly quantity: string;
  readonly uomCode: string;
  readonly requiredDate: string | null;
  readonly equivalentRule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
}

export interface RfqIssueBidder {
  readonly rfqIssueBidderId: string;
  readonly sourceRfqBidderId: string;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly legalName: string;
  readonly supplierContactId: string | null;
  readonly contactName: string | null;
  readonly contactEmail: string | null;
  readonly invitationState: 'INVITED';
  readonly eligibilityNote: string | null;
}

export interface RfqIssueDetail {
  readonly rfqIssueId: string;
  readonly rfqId: string;
  readonly revisionNo: number;
  readonly rfqNumber: string;
  readonly title: string;
  readonly eventType: 'RFQ' | 'TENDER' | 'RFP';
  readonly projectId: string;
  readonly packageId: string | null;
  readonly buyerId: string;
  readonly issuedAt: string;
  readonly responseDueAt: string;
  readonly responseTimezone: string;
  readonly currency: string;
  readonly pricingBasis: 'UNIT_AND_TOTAL' | 'LUMP_SUM' | 'RATE_SCHEDULE' | 'MIXED';
  readonly paymentTermRequirement: string | null;
  readonly validityDays: number | null;
  readonly commercialInstructions: string | null;
  readonly submissionInstructions: string | null;
  readonly evaluationMode: 'COMBINED' | 'TWO_STAGE';
  readonly bidVisibilityPolicy: 'BUYER_AFTER_CLOSE' | 'BUYER_ON_RECEIPT' | 'SEALED_TWO_STAGE';
  readonly routePolicyKey: string;
  readonly routePolicyVersion: number;
  readonly issuedBy: string;
  readonly lines: readonly RfqIssueLine[];
  readonly bidders: readonly RfqIssueBidder[];
}

export interface IssueRfqResponse {
  readonly issue: RfqIssueDetail;
}

export interface RecordSupplierIntentRequest {
  readonly intent: SupplierIntent;
  readonly reason?: string;
  readonly channel: SupplierIntentChannel;
}

export interface SupplierIntentEvent {
  readonly intentEventId: string;
  readonly rfqIssueBidderId: string;
  readonly intent: SupplierIntent;
  readonly reason: string | null;
  readonly channel: SupplierIntentChannel;
  readonly recordedBy: string;
  readonly recordedAt: string;
}

export interface RecordSupplierIntentResponse {
  readonly event: SupplierIntentEvent;
}

export interface CreateSupplierQuotationLineRequest {
  readonly rfqIssueLineId?: string;
  readonly supplierLineNo?: string;
  readonly supplierDescription: string;
  readonly quotedQuantity?: string;
  readonly quotedUomCode?: string;
  readonly unitRate?: string;
  readonly lineAmount?: string;
  readonly taxAmount?: string;
  readonly brand?: string;
  readonly manufacturer?: string;
  readonly model?: string;
  readonly leadTimeOverride?: string;
  readonly inclusionExclusionNote?: string;
  readonly deviationNote?: string;
  readonly lineType?: QuotationLineType;
  readonly sourceReference?: string;
}

export interface CreateSupplierQuotationRequest {
  readonly supplierQuotationReference?: string | undefined;
  readonly quotationDate?: string | undefined;
  readonly receivedAt?: string | undefined;
  readonly responseChannel: QuotationResponseChannel;
  readonly captureMode: QuotationCaptureMode;
  readonly currency: string;
  readonly validityUntil?: string | undefined;
  readonly leadTimePromise?: string | undefined;
  readonly deliveryPromise?: string | undefined;
  readonly paymentTerms?: string | undefined;
  readonly warrantyTerms?: string | undefined;
  readonly commercialNotes?: string | undefined;
  readonly responseStatus?: QuotationResponseStatus | undefined;
  readonly sourceFileName?: string | undefined;
  readonly sourceMediaType?: string | undefined;
  readonly sourceSha256?: string | undefined;
  readonly sourceChannelReference?: string | undefined;
  readonly lines: readonly CreateSupplierQuotationLineRequest[];
}

export interface SupplierQuotationLine {
  readonly quotationLineId: string;
  readonly rfqIssueLineId: string | null;
  readonly rfqLineNo: number | null;
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
  readonly leadTimeOverride: string | null;
  readonly inclusionExclusionNote: string | null;
  readonly deviationNote: string | null;
  readonly lineType: QuotationLineType;
  readonly sourceReference: string | null;
}

export interface SupplierQuotationRevision {
  readonly quotationRevisionId: string;
  readonly rfqIssueBidderId: string;
  readonly revisionNo: number;
  readonly supersedesRevisionId: string | null;
  readonly supplierQuotationReference: string | null;
  readonly quotationDate: string | null;
  readonly receivedAt: string;
  readonly responseChannel: QuotationResponseChannel;
  readonly captureMode: QuotationCaptureMode;
  readonly capturedByPrincipalId: string | null;
  readonly currency: string;
  readonly validityUntil: string | null;
  readonly leadTimePromise: string | null;
  readonly deliveryPromise: string | null;
  readonly paymentTerms: string | null;
  readonly warrantyTerms: string | null;
  readonly commercialNotes: string | null;
  readonly responseStatus: QuotationResponseStatus;
  readonly sourceFileName: string | null;
  readonly sourceMediaType: string | null;
  readonly sourceSha256: string | null;
  readonly sourceChannelReference: string | null;
  readonly isLate: boolean;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly supplierLegalName: string;
  readonly contactName: string | null;
  readonly rfqIssueId: string;
  readonly rfqId: string;
  readonly rfqNumber: string;
  readonly rfqTitle: string;
  readonly issueRevisionNo: number;
  readonly lines: readonly SupplierQuotationLine[];
}

export interface CreateSupplierQuotationResponse {
  readonly quotation: SupplierQuotationRevision;
}

export interface SupplierQuotationDetailResponse {
  readonly quotation: SupplierQuotationRevision;
  readonly revisionHistory: readonly SupplierQuotationRevision[];
}

export interface SupplierResponseRegisterRow {
  readonly rfqId: string;
  readonly rfqNumber: string;
  readonly rfqTitle: string;
  readonly issueRevisionNo: number;
  readonly rfqIssueId: string;
  readonly responseDueAt: string;
  readonly rfqIssueBidderId: string;
  readonly sourceRfqBidderId: string;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly supplierLegalName: string;
  readonly contactName: string | null;
  readonly contactEmail: string | null;
  readonly invitationState: 'INVITED';
  readonly intent: SupplierIntent | null;
  readonly intentReason: string | null;
  readonly intentChannel: SupplierIntentChannel | null;
  readonly intentRecordedAt: string | null;
  readonly latestQuotationRevisionId: string | null;
  readonly latestRevisionNo: number | null;
  readonly receivedAt: string | null;
  readonly responseChannel: QuotationResponseChannel | null;
  readonly currency: string | null;
  readonly validityUntil: string | null;
  readonly responseStatus: QuotationResponseStatus | null;
  readonly isLate: boolean | null;
  readonly lineCount: number;
  readonly sourceFileName: string | null;
  readonly completeness: 'NO_RESPONSE' | 'PARTIAL' | 'STRUCTURED';
  readonly clarificationState: 'NONE';
  readonly comparisonState: 'NOT_STARTED';
}

export interface SupplierResponseRegisterResponse {
  readonly responses: readonly SupplierResponseRegisterRow[];
}
