import type { EquivalentRule, ProcurementRoute, SupplierSummary } from './procurement.js';

export type ProcurementPackageType =
  | 'MATERIAL_PACKAGE'
  | 'TRADE_PACKAGE'
  | 'SUBCONTRACT_PACKAGE'
  | 'SERVICE_PACKAGE'
  | 'MIXED';

export type ProcurementPackageStatus =
  | 'PLANNED'
  | 'PREPARING'
  | 'READY_FOR_SOURCING'
  | 'SOURCING'
  | 'AWARD_PENDING'
  | 'AWARDED'
  | 'ORDERED'
  | 'COMPLETE'
  | 'CANCELLED';

export type RfqEventType = 'RFQ' | 'TENDER' | 'RFP';
export type RfqPricingBasis = 'UNIT_AND_TOTAL' | 'LUMP_SUM' | 'RATE_SCHEDULE' | 'MIXED';
export type RfqEvaluationMode = 'COMBINED' | 'TWO_STAGE';
export type RfqBidVisibilityPolicy =
  | 'BUYER_AFTER_CLOSE'
  | 'BUYER_ON_RECEIPT'
  | 'SEALED_TWO_STAGE';
export type RfqStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'READY'
  | 'ISSUED'
  | 'ADDENDUM'
  | 'REISSUED'
  | 'CLOSED'
  | 'CANCELLED';
export type RfqInvitationState =
  | 'DRAFT'
  | 'READY'
  | 'INVITED'
  | 'DECLINED'
  | 'WITHDRAWN'
  | 'REMOVED';

export interface SourcingCandidateLine {
  readonly mrId: string;
  readonly mrNumber: string;
  readonly mrLineId: string;
  readonly lineNo: number;
  readonly projectId: string;
  readonly projectCode: string;
  readonly projectName: string;
  readonly subject: string;
  readonly description: string;
  readonly specification: string | null;
  readonly approvedQuantity: string;
  readonly uomCode: string;
  readonly requiredDate: string;
  readonly equivalentRule: EquivalentRule;
  readonly route: ProcurementRoute;
  readonly routeDecisionId: string;
  readonly policyKey: string;
  readonly policyVersion: number;
  readonly alreadyPackagedQuantity: string;
}

export interface SourcingCandidatesResponse {
  readonly candidates: readonly SourcingCandidateLine[];
}

export interface CreateProcurementPackageScopeRequest {
  readonly mrLineId: string;
  readonly allocatedQuantity: string;
}

export interface CreateProcurementPackageRequest {
  readonly projectId: string;
  readonly title: string;
  readonly packageType?: ProcurementPackageType;
  readonly tradeCategory?: string;
  readonly requiredOnSiteDate?: string;
  readonly targetAwardDate?: string;
  readonly scopeSummary?: string;
  readonly sourceLines: readonly CreateProcurementPackageScopeRequest[];
}

export interface ProcurementPackageScopeLine {
  readonly packageScopeId: string;
  readonly mrId: string;
  readonly mrNumber: string;
  readonly mrLineId: string;
  readonly sourceLineNo: number;
  readonly description: string;
  readonly specification: string | null;
  readonly allocatedQuantity: string;
  readonly uomCode: string;
  readonly requiredDate: string;
}

export interface ProcurementPackageSummary {
  readonly packageId: string;
  readonly packageNumber: string;
  readonly projectId: string;
  readonly projectCode: string;
  readonly projectName: string;
  readonly title: string;
  readonly tradeCategory: string | null;
  readonly packageType: ProcurementPackageType;
  readonly ownerId: string;
  readonly ownerName: string;
  readonly requiredOnSiteDate: string | null;
  readonly targetAwardDate: string | null;
  readonly status: ProcurementPackageStatus;
  readonly sourceLineCount: number;
  readonly routePolicyKey: string;
  readonly routePolicyVersion: number;
}

export interface ProcurementPackageDetail extends ProcurementPackageSummary {
  readonly scopeSummary: string | null;
  readonly scope: readonly ProcurementPackageScopeLine[];
}

export interface ProcurementPackageListResponse {
  readonly packages: readonly ProcurementPackageSummary[];
}

export interface ProcurementPackageDetailResponse {
  readonly package: ProcurementPackageDetail;
}

export interface CreateProcurementPackageResponse extends ProcurementPackageDetailResponse {}

export interface CreateRfqSourceLineRequest {
  readonly mrLineId: string;
  readonly quantity: string;
  readonly packageScopeId?: string;
}

export interface CreateRfqDraftRequest {
  readonly projectId: string;
  readonly title: string;
  readonly eventType?: RfqEventType;
  readonly packageId?: string;
  readonly responseDueAt: string;
  readonly responseTimezone?: string;
  readonly currency?: string;
  readonly pricingBasis?: RfqPricingBasis;
  readonly paymentTermRequirement?: string;
  readonly validityDays?: number;
  readonly commercialInstructions?: string;
  readonly submissionInstructions?: string;
  readonly evaluationMode?: RfqEvaluationMode;
  readonly bidVisibilityPolicy?: RfqBidVisibilityPolicy;
  readonly sourceLines: readonly CreateRfqSourceLineRequest[];
  readonly bidderSupplierIds: readonly string[];
}

export interface RfqLine {
  readonly rfqLineId: string;
  readonly lineNo: number;
  readonly mrLineId: string;
  readonly packageScopeId: string | null;
  readonly mrNumber: string;
  readonly sourceLineNo: number;
  readonly description: string;
  readonly specification: string | null;
  readonly quantity: string;
  readonly uomCode: string;
  readonly requiredDate: string | null;
  readonly equivalentRule: EquivalentRule;
}

export interface RfqBidder {
  readonly rfqBidderId: string;
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly legalName: string;
  readonly supplierContactId: string | null;
  readonly contactName: string | null;
  readonly contactEmail: string | null;
  readonly invitationState: RfqInvitationState;
  readonly eligibilityNote: string | null;
  readonly supplier: SupplierSummary | null;
}

export interface RfqSummary {
  readonly rfqId: string;
  readonly rfqNumber: string;
  readonly projectId: string;
  readonly projectCode: string;
  readonly projectName: string;
  readonly packageId: string | null;
  readonly packageNumber: string | null;
  readonly title: string;
  readonly eventType: RfqEventType;
  readonly buyerId: string;
  readonly buyerName: string;
  readonly responseDueAt: string;
  readonly responseTimezone: string;
  readonly currency: string;
  readonly pricingBasis: RfqPricingBasis;
  readonly evaluationMode: RfqEvaluationMode;
  readonly bidVisibilityPolicy: RfqBidVisibilityPolicy;
  readonly status: RfqStatus;
  readonly revisionNo: number;
  readonly sourceLineCount: number;
  readonly bidderCount: number;
  readonly routePolicyKey: string;
  readonly routePolicyVersion: number;
}

export interface RfqDetail extends RfqSummary {
  readonly issueAt: string | null;
  readonly paymentTermRequirement: string | null;
  readonly validityDays: number | null;
  readonly commercialInstructions: string | null;
  readonly submissionInstructions: string | null;
  readonly lines: readonly RfqLine[];
  readonly bidders: readonly RfqBidder[];
}

export interface RfqListResponse {
  readonly rfqs: readonly RfqSummary[];
}

export interface RfqDetailResponse {
  readonly rfq: RfqDetail;
}

export interface CreateRfqDraftResponse extends RfqDetailResponse {}
