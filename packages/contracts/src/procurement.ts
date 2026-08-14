export type SupplierType =
  | 'MATERIAL_SUPPLIER'
  | 'SUBCONTRACTOR'
  | 'SERVICE_PROVIDER'
  | 'MANUFACTURER'
  | 'DISTRIBUTOR'
  | 'CONSULTANT_OTHER';

export type SupplierState = 'ACTIVE' | 'INACTIVE' | 'ON_HOLD';
export type MrPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export type MrStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PARTIALLY_APPROVED'
  | 'REJECTED'
  | 'SOURCING'
  | 'ORDERING'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED'
  | 'CLOSED'
  | 'CANCELLED'
  | 'SUPERSEDED';

export type MrLineType = 'MATERIAL' | 'SERVICE' | 'SUBCONTRACT_SCOPE' | 'EQUIPMENT' | 'OTHER';
export type MrEntryMode = 'MASTER_BACKED' | 'FREE_FORM';
export type EquivalentRule =
  | 'EXACT_ONLY'
  | 'APPROVED_EQUIVALENT_ALLOWED'
  | 'ALTERNATE_BY_APPROVAL';
export type MrReviewDecision = 'APPROVED' | 'PARTIALLY_APPROVED' | 'REJECTED';
export type MrLineReviewOutcome = 'APPROVED' | 'REJECTED';
export type ProcurementRoute =
  | 'COMPETITIVE_RFQ'
  | 'DIRECT_ORDER'
  | 'PACKAGE_SOURCING'
  | 'SOLE_SOURCE_EXCEPTION'
  | 'EXTERNAL_ERP_STOCK';

export interface ProcurementUom {
  readonly code: string;
  readonly displayName: string;
  readonly quantityKind: 'COUNT' | 'LENGTH' | 'AREA' | 'VOLUME' | 'MASS' | 'TIME' | 'LUMP_SUM';
  readonly decimalScale: number;
}

export interface SupplierSummary {
  readonly supplierId: string;
  readonly supplierCode: string;
  readonly legalName: string;
  readonly tradeName: string | null;
  readonly supplierType: SupplierType;
  readonly supplierState: SupplierState;
  readonly countryCode: string;
  readonly emirateRegion: string | null;
  readonly businessPhone: string | null;
  readonly businessEmail: string | null;
  readonly trnVatNumber: string | null;
  readonly primaryContact: SupplierContactSummary | null;
  readonly compliance: readonly SupplierComplianceSummary[];
}

export interface SupplierContactSummary {
  readonly supplierContactId: string;
  readonly displayName: string;
  readonly jobTitle: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly preferredChannel: 'EMAIL' | 'PHONE' | 'SECURE_LINK' | 'OTHER';
  readonly isPrimary: boolean;
  readonly activeState: 'ACTIVE' | 'INACTIVE';
}

export interface SupplierComplianceSummary {
  readonly complianceDocumentId: string;
  readonly documentType:
    | 'TRADE_LICENSE'
    | 'VAT_CERTIFICATE'
    | 'INSURANCE'
    | 'ISO_CERTIFICATE'
    | 'HSE_CERTIFICATE'
    | 'OTHER';
  readonly documentNumber: string | null;
  readonly expiryDate: string | null;
  readonly verificationStatus: 'UNVERIFIED' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
}

export interface CreateSupplierRequest {
  readonly supplierCode: string;
  readonly legalName: string;
  readonly tradeName?: string;
  readonly supplierType: SupplierType;
  readonly countryCode?: string;
  readonly emirateRegion?: string;
  readonly businessPhone?: string;
  readonly businessEmail?: string;
  readonly trnVatNumber?: string;
  readonly primaryContact?: {
    readonly displayName: string;
    readonly jobTitle?: string;
    readonly email?: string;
    readonly phone?: string;
  };
}

export interface CreateSupplierResponse {
  readonly supplier: SupplierSummary;
}

export interface SupplierListResponse {
  readonly suppliers: readonly SupplierSummary[];
}

export interface ProcurementReferenceDataResponse {
  readonly uoms: readonly ProcurementUom[];
}

export interface CreateMaterialRequisitionLineRequest {
  readonly entryMode: MrEntryMode;
  readonly itemId?: string;
  readonly lineType: MrLineType;
  readonly description: string;
  readonly specification?: string;
  readonly requestedQuantity: string;
  readonly uomCode: string;
  readonly requiredDateOverride?: string;
  readonly manufacturer?: string;
  readonly brand?: string;
  readonly model?: string;
  readonly equivalentRule?: EquivalentRule;
  readonly preferredSupplierId?: string;
  readonly technicalNotes?: string;
}

export interface CreateMaterialRequisitionRequest {
  readonly projectId: string;
  readonly requiredOnSiteDate: string;
  readonly priority?: MrPriority;
  readonly subject: string;
  readonly requesterTeam?: string;
  readonly deliveryLocationId?: string;
  readonly instructions?: string;
  readonly lines: readonly CreateMaterialRequisitionLineRequest[];
}

export interface ProcurementRouteDecisionSummary {
  readonly routeDecisionId: string;
  readonly policyKey: string;
  readonly policyVersion: number;
  readonly route: ProcurementRoute;
  readonly justification: string | null;
  readonly decidedBy: string;
  readonly decidedByName: string;
  readonly decidedAt: string;
}

export interface MaterialRequisitionLine {
  readonly mrLineId: string;
  readonly lineNo: number;
  readonly entryMode: MrEntryMode;
  readonly itemId: string | null;
  readonly lineType: MrLineType;
  readonly description: string;
  readonly specification: string | null;
  readonly requestedQuantity: string;
  readonly uomCode: string;
  readonly requiredDateOverride: string | null;
  readonly manufacturer: string | null;
  readonly brand: string | null;
  readonly model: string | null;
  readonly equivalentRule: EquivalentRule;
  readonly preferredSupplierId: string | null;
  readonly technicalNotes: string | null;
  readonly approvedQuantity: string | null;
  readonly lineState:
    | 'DRAFT'
    | 'SUBMITTED'
    | 'APPROVED'
    | 'PARTIALLY_APPROVED'
    | 'REJECTED'
    | 'SOURCING'
    | 'ORDERING'
    | 'PARTIALLY_FULFILLED'
    | 'FULFILLED'
    | 'CANCELLED';
  readonly routeDecision: ProcurementRouteDecisionSummary | null;
}

export interface MaterialRequisitionSummary {
  readonly mrId: string;
  readonly mrNumber: string;
  readonly projectId: string;
  readonly projectCode: string;
  readonly projectName: string;
  readonly requesterId: string;
  readonly requesterName: string;
  readonly requestDate: string;
  readonly requiredOnSiteDate: string;
  readonly priority: MrPriority;
  readonly subject: string;
  readonly status: MrStatus;
  readonly submittedAt: string | null;
  readonly lineCount: number;
}

export interface MrReviewOccurrenceSummary {
  readonly reviewOccurrenceId: string;
  readonly decision: MrReviewDecision;
  readonly reviewerId: string;
  readonly reviewerName: string;
  readonly comments: string | null;
  readonly occurredAt: string;
}

export interface MaterialRequisitionDetail extends MaterialRequisitionSummary {
  readonly requesterTeam: string | null;
  readonly deliveryLocationId: string | null;
  readonly instructions: string | null;
  readonly lines: readonly MaterialRequisitionLine[];
  readonly reviewTrail: readonly MrReviewOccurrenceSummary[];
}

export interface MaterialRequisitionListResponse {
  readonly requisitions: readonly MaterialRequisitionSummary[];
}

export interface CreateMaterialRequisitionResponse {
  readonly requisition: MaterialRequisitionDetail;
}

export interface MaterialRequisitionDetailResponse {
  readonly requisition: MaterialRequisitionDetail;
}

export interface SubmitMaterialRequisitionResponse {
  readonly requisition: MaterialRequisitionDetail;
}

export interface ReviewMaterialRequisitionLineRequest {
  readonly mrLineId: string;
  readonly outcome: MrLineReviewOutcome;
  readonly approvedQuantity?: string;
}

export interface ReviewMaterialRequisitionRequest {
  readonly lineDecisions: readonly ReviewMaterialRequisitionLineRequest[];
  readonly comments?: string;
}

export interface ReviewMaterialRequisitionResponse {
  readonly requisition: MaterialRequisitionDetail;
}

export interface SetProcurementRouteRequest {
  readonly route: ProcurementRoute;
  readonly justification?: string;
}

export interface SetProcurementRouteResponse {
  readonly requisition: MaterialRequisitionDetail;
}
