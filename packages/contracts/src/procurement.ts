export const uploadSessionStates = [
  'RESERVED',
  'PAYLOAD_TRANSFER_IN_PROGRESS',
  'PAYLOAD_STORED_UNVERIFIED',
  'PAYLOAD_VERIFIED_QUARANTINED',
  'VALIDATION_IN_PROGRESS',
  'VALIDATION_BLOCKED_OR_FAILED',
  'CAPTURED_EVIDENCE_ONLY',
  'ACCEPTED_EVIDENCE_VERSION',
  'ABANDONED_OR_EXPIRED',
  'PAYLOAD_MISSING_RECONCILIATION_REQUIRED',
] as const;
export type UploadSessionState = (typeof uploadSessionStates)[number];

export const semanticFieldFamilies = [
  'IDENTITY_OR_REFERENCE',
  'QUANTITY_WITH_UOM',
  'MONETARY_WITH_CURRENCY',
  'DECIMAL_MEASURE',
  'PERCENTAGE_OR_RATE',
  'DATE_OR_DATETIME',
  'DURATION_OR_LEAD_TIME',
  'ENUMERATED_SELECTION',
  'BOOLEAN_OR_ACKNOWLEDGMENT',
  'STRUCTURED_TEXT_IDENTIFIER',
  'FREE_TEXT_EVIDENCE_ONLY',
  'ATTACHMENT_EVIDENCE',
  'REGISTERED_LINE_OR_TABLE_GROUP',
] as const;
export type SemanticFieldFamily = (typeof semanticFieldFamilies)[number];

export interface ProcurementEvidenceItem {
  readonly evidenceRecordId: string;
  readonly evidenceVersionId: string;
  readonly evidenceClass: string;
  readonly sourceKind: string;
  readonly sourceLocator: string;
  readonly mimeType: string | null;
  readonly byteSize: string | null;
  readonly acceptedAt: string;
}

export interface ProcurementUploadSession {
  readonly uploadSessionId: string;
  readonly evidenceClass: string;
  readonly intendedUse: string;
  readonly state: UploadSessionState;
  readonly expiresAt: string;
}

export interface AuthorizedRequirementView {
  readonly authorizedRequirementSourceId: string;
  readonly sourceKind: string;
  readonly sourceReference: string;
  readonly description: string;
  readonly authorizedQuantity: string;
  readonly allocatedQuantity: string;
  readonly availableQuantity: string;
  readonly uomKey: string;
  readonly basisVersion: string;
}

export interface RequirementAllocationView {
  readonly requirementAllocationId: string;
  readonly authorizedRequirementSourceId: string;
  readonly quantity: string;
  readonly uomKey: string;
  readonly purpose: string;
  readonly state: 'ALLOCATED' | 'RELEASED' | 'SUPERSEDED';
}

export interface ProcurementPackageView {
  readonly procurementPackageId: string;
  readonly packageCode: string;
  readonly displayName: string;
  readonly activeAllocationIds: readonly string[];
}

export interface SupplierContactView {
  readonly supplierRelationshipId: string;
  readonly supplierContactId: string;
  readonly supplierName: string;
  readonly displayName: string;
  readonly emailAddress: string;
  readonly mailboxKind: 'PERSON' | 'SHARED_MAILBOX' | 'TEAM';
}

export interface RegisteredSemanticFieldView {
  readonly fieldKey: string;
  readonly family: SemanticFieldFamily;
  readonly canonicalMeaning: string;
  readonly explicitNonMeaning: string;
  readonly comparisonEligibility: string;
}

export interface ExternalTaskGrantView {
  readonly externalTaskGrantId: string;
  readonly sourcingEventId: string;
  readonly sourcingEventVersionId: string;
  readonly supplierRelationshipId: string;
  readonly supplierContactId: string;
  readonly supplierName: string;
  readonly contactDisplayName: string;
  readonly state: 'ISSUED' | 'REVOKED' | 'TRANSFER_REISSUED' | 'EXPIRED_OBSERVED';
  readonly channel: 'SECURE_LINK' | 'EMAIL' | 'FILE' | 'BUYER_CAPTURE' | null;
  readonly dueAt: string;
  readonly expiresAt: string;
  readonly replacesGrantId: string | null;
}

export interface RfqEventView {
  readonly sourcingEventId: string;
  readonly eventNumber: string;
  readonly title: string;
  readonly version: string;
  readonly lifecycleState: 'DRAFT' | 'ISSUED' | 'SUPERSEDED';
  readonly responseDueAt: string;
  readonly responseSchemaVersionId: string;
  readonly acceptancePolicyId: string;
  readonly memberCount: number;
  readonly issuedArtifactVersionId: string | null;
  readonly grantCount: number;
  readonly addendumReason: string | null;
}

export interface ProcurementWorkspaceSnapshot {
  readonly projectId: string;
  readonly evidence: readonly ProcurementEvidenceItem[];
  readonly uploadSessions: readonly ProcurementUploadSession[];
  readonly requirements: readonly AuthorizedRequirementView[];
  readonly allocations: readonly RequirementAllocationView[];
  readonly packages: readonly ProcurementPackageView[];
  readonly suppliers: readonly SupplierContactView[];
  readonly registeredFields: readonly RegisteredSemanticFieldView[];
  readonly rfqs: readonly RfqEventView[];
  readonly externalTaskGrants: readonly ExternalTaskGrantView[];
  readonly capabilities: Readonly<{
    canCaptureEvidence: boolean;
    canManageRequirements: boolean;
    canManageSourcing: boolean;
    canIssueRfq: boolean;
    canManageExternalGrants: boolean;
  }>;
}

export interface CreateEvidenceUploadRequest {
  readonly projectId: string;
  readonly authorityContextId: string;
  readonly evidenceClass: string;
  readonly intendedUse: string;
  readonly fileName: string;
  readonly mimeType: string;
  readonly contentBase64: string;
}
export interface CreateEvidenceUploadResponse {
  readonly uploadSessionId: string;
  readonly evidenceRecordId: string;
  readonly evidenceVersionId: string;
  readonly state: 'ACCEPTED_EVIDENCE_VERSION';
}

export interface CreateAuthorizedRequirementRequest {
  readonly projectId: string;
  readonly authorityContextId: string;
  readonly sourceKind: 'BOQ' | 'SCHEDULE' | 'DRAWING' | 'SPECIFICATION' | 'MANUAL_AUTHORIZED_REQUIREMENT';
  readonly sourceReference: string;
  readonly description: string;
  readonly authorizedQuantity: string;
  readonly uomKey: string;
  readonly evidenceVersionId?: string;
}
export interface CreateAuthorizedRequirementResponse { readonly authorizedRequirementSourceId: string; }

export interface CreateRequirementAllocationRequest {
  readonly projectId: string;
  readonly authorizedRequirementSourceId: string;
  readonly quantity: string;
  readonly uomKey: string;
  readonly purpose: string;
}
export interface CreateRequirementAllocationResponse { readonly requirementAllocationId: string; }

export interface CreateProcurementPackageRequest {
  readonly projectId: string;
  readonly authorityContextId: string;
  readonly packageCode: string;
  readonly displayName: string;
}
export interface CreateProcurementPackageResponse { readonly procurementPackageId: string; }

export interface CreateSupplierRequest {
  readonly supplierName: string;
  readonly supplierReference?: string;
  readonly contactName: string;
  readonly emailAddress: string;
  readonly mailboxKind: 'PERSON' | 'SHARED_MAILBOX' | 'TEAM';
}
export interface CreateSupplierResponse { readonly supplierRelationshipId: string; readonly supplierContactId: string; }

export interface CreateSupplierContactRequest {
  readonly supplierRelationshipId: string;
  readonly contactName: string;
  readonly emailAddress: string;
  readonly mailboxKind: 'PERSON' | 'SHARED_MAILBOX' | 'TEAM';
}
export interface CreateSupplierContactResponse { readonly supplierContactId: string; }

export interface CreateRfqDraftRequest {
  readonly projectId: string;
  readonly authorityContextId: string;
  readonly eventNumber: string;
  readonly title: string;
  readonly responseDueAt: string;
  readonly responseFieldKeys: readonly string[];
  readonly supplierContactIds: readonly string[];
}
export interface CreateRfqDraftResponse { readonly sourcingEventId: string; readonly sourcingEventVersionId: string; }

export interface IssueRfqRequest {
  readonly projectId: string;
  readonly sourcingEventId: string;
  readonly expectedDraftVersion: string;
}
export interface IssueRfqResponse {
  readonly sourcingEventVersionId: string;
  readonly issuedArtifactVersionId: string;
  readonly messageId: string;
  readonly externalTaskGrantIds: readonly string[];
}


export interface CreateRfqAddendumRequest {
  readonly projectId: string;
  readonly sourcingEventId: string;
  readonly expectedIssuedVersion: string;
  readonly responseDueAt: string;
  readonly reason: string;
}
export interface CreateRfqAddendumResponse { readonly sourcingEventVersionId: string; }

export interface RevokeExternalTaskGrantRequest {
  readonly projectId: string;
  readonly externalTaskGrantId: string;
  readonly reason: string;
}
export interface RevokeExternalTaskGrantResponse { readonly externalTaskGrantId: string; readonly state: 'REVOKED'; }

export interface TransferExternalTaskGrantRequest {
  readonly projectId: string;
  readonly externalTaskGrantId: string;
  readonly replacementSupplierContactId: string;
  readonly reason: string;
}
export interface TransferExternalTaskGrantResponse {
  readonly previousExternalTaskGrantId: string;
  readonly externalTaskGrantId: string;
  readonly state: 'ISSUED';
}
