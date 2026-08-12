import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface EvidenceRow {
  readonly evidence_record_id: string;
  readonly evidence_version_id: string;
  readonly evidence_class: string;
  readonly source_kind: string;
  readonly source_locator: string;
  readonly mime_type: string | null;
  readonly byte_size: string | null;
  readonly accepted_at: Date;
}
export interface UploadSessionRow {
  readonly upload_session_id: string;
  readonly intended_evidence_class: string;
  readonly intended_use: string;
  readonly state: string;
  readonly expires_at: Date;
}
export interface RequirementRow {
  readonly authorized_requirement_source_id: string;
  readonly source_kind: string;
  readonly source_reference: string;
  readonly description: string;
  readonly authorized_quantity: string;
  readonly allocated_quantity: string;
  readonly available_quantity: string;
  readonly uom_key: string;
  readonly basis_version: string;
}
export interface AllocationRow {
  readonly requirement_allocation_id: string;
  readonly authorized_requirement_source_id: string;
  readonly quantity: string;
  readonly uom_key: string;
  readonly allocation_purpose: string;
  readonly state: 'ALLOCATED' | 'RELEASED' | 'SUPERSEDED';
}
export interface PackageRow {
  readonly procurement_package_id: string;
  readonly package_code: string;
  readonly display_name: string;
  readonly active_allocation_ids_json: string;
}
export interface SupplierRow {
  readonly supplier_relationship_id: string;
  readonly supplier_contact_id: string;
  readonly supplier_name: string;
  readonly display_name: string;
  readonly email_address: string;
  readonly mailbox_kind: 'PERSON' | 'SHARED_MAILBOX' | 'TEAM';
}
export interface RegisteredFieldRow {
  readonly field_key: string;
  readonly family: string;
  readonly canonical_meaning: string;
  readonly explicit_non_meaning: string;
  readonly comparison_eligibility: string;
}
export interface RfqRow {
  readonly sourcing_event_id: string;
  readonly event_number: string;
  readonly title: string;
  readonly version: string;
  readonly lifecycle_state: 'DRAFT' | 'ISSUED' | 'SUPERSEDED';
  readonly response_due_at: Date;
  readonly response_schema_version_id: string;
  readonly acceptance_policy_id: string;
  readonly member_count: string;
  readonly issued_artifact_version_id: string | null;
  readonly grant_count: string;
  readonly addendum_reason: string | null;
}
export interface ExternalGrantRow {
  readonly external_task_grant_id: string;
  readonly sourcing_event_id: string;
  readonly sourcing_event_version_id: string;
  readonly supplier_relationship_id: string;
  readonly supplier_contact_id: string;
  readonly supplier_name: string;
  readonly contact_display_name: string;
  readonly state: 'ISSUED' | 'REVOKED' | 'TRANSFER_REISSUED' | 'EXPIRED_OBSERVED';
  readonly channel: 'SECURE_LINK' | 'EMAIL' | 'FILE' | 'BUYER_CAPTURE' | null;
  readonly due_at: Date;
  readonly expires_at: Date;
  readonly replaces_grant_id: string | null;
  readonly issue_message_id: string | null;
}
export interface EventIssueBasisRow {
  readonly sourcing_event_id: string;
  readonly event_number: string;
  readonly title: string;
  readonly draft_version_id: string;
  readonly draft_version: string;
  readonly response_due_at: Date;
  readonly response_schema_version_id: string;
  readonly acceptance_policy_id: string;
  readonly authority_context_id: string;
}
export interface EventMemberRow {
  readonly sourcing_event_member_id: string;
  readonly supplier_contact_id: string;
  readonly supplier_name: string;
  readonly email_address: string;
}

export interface ProcurementPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canCommand(): Promise<boolean>;
  evidence(projectId: string): Promise<readonly EvidenceRow[]>;
  uploadSessions(projectId: string): Promise<readonly UploadSessionRow[]>;
  requirements(projectId: string): Promise<readonly RequirementRow[]>;
  allocations(projectId: string): Promise<readonly AllocationRow[]>;
  packages(projectId: string): Promise<readonly PackageRow[]>;
  suppliers(): Promise<readonly SupplierRow[]>;
  registeredFields(): Promise<readonly RegisteredFieldRow[]>;
  rfqs(projectId: string): Promise<readonly RfqRow[]>;
  externalGrants(projectId: string): Promise<readonly ExternalGrantRow[]>;

  createUploadSession(input: {
    uploadSessionId: string; projectId: string; authorityContextId: string; evidenceClass: string;
    intendedUse: string; mimeType: string; maximumBytes: bigint; namespace: string; correlation: string; expiresAt: string;
  }): Promise<void>;
  recordUploadState(uploadSessionId: string, state: string, reason: string): Promise<void>;
  recordPayload(input: {
    attemptId: string; uploadSessionId: string; objectKey: string; providerVersionIdentity: string;
    checksum: string; byteSize: bigint; mimeType: string; integrityState: string;
  }): Promise<void>;
  recordValidation(input: { observationId: string; attemptId: string; kind: string; toolVersion: string; disposition: string; detail: string }): Promise<void>;
  acceptEvidence(input: { evidenceRecordId: string; evidenceVersionId: string; uploadSessionId: string; basis: string }): Promise<void>;

  createRequirement(input: {
    sourceId: string; basisVersionId: string; projectId: string; authorityContextId: string;
    sourceKind: string; sourceReference: string; description: string; quantity: string; uomKey: string; evidenceVersionId?: string;
  }): Promise<void>;
  allocateRequirement(input: { allocationId: string; sourceId: string; quantity: string; uomKey: string; purpose: string }): Promise<void>;
  createPackage(input: { packageId: string; projectId: string; authorityContextId: string; packageCode: string; displayName: string }): Promise<void>;

  createSupplier(input: { relationshipId: string; contactId: string; supplierName: string; supplierReference?: string; contactName: string; email: string; mailboxKind: string }): Promise<void>;
  addSupplierContact(input: { contactId: string; relationshipId: string; contactName: string; email: string; mailboxKind: string }): Promise<void>;
  createRfqDraft(input: { eventId: string; eventVersionId: string; schemaId: string; policyId: string; projectId: string; authorityContextId: string; eventNumber: string; title: string; dueAt: string }): Promise<void>;
  addSchemaField(input: { fieldId: string; schemaId: string; fieldKey: string; label: string; ordinal: number; requirement: string }): Promise<void>;
  addEventMember(input: { memberId: string; eventVersionId: string; relationshipId: string; contactId: string }): Promise<void>;
  eventIssueBasis(eventId: string): Promise<EventIssueBasisRow | undefined>;
  eventMembers(eventId: string): Promise<readonly EventMemberRow[]>;
  createArtifactIntent(input: { intentId: string; projectId: string; authorityContextId: string; artifactKind: string; fingerprint: string }): Promise<void>;
  addArtifactMember(input: { memberId: string; intentId: string; memberKind: string; subjectId: string; versionIdentity: string; fingerprint: string }): Promise<void>;
  issueArtifact(input: { issuedId: string; intentId: string; objectKey: string; providerVersionIdentity: string; checksum: string; byteSize: bigint; mimeType: string }): Promise<void>;
  recordMessage(input: { messageId: string; projectId: string; authorityContextId: string; kind: string; subject: string; artifactId: string }): Promise<void>;
  issueEvent(input: { issuedVersionId: string; eventId: string; expectedVersion: string; artifactId: string; messageId: string }): Promise<void>;
  issueGrant(input: { grantId: string; issuedVersionId: string; memberId: string; tokenDigest: string; expiry: string }): Promise<void>;
  recordInvitation(input: { invitationId: string; grantId: string; messageId: string; channel: string; kind: string }): Promise<void>;
  createAddendum(input: { versionId: string; eventId: string; expectedVersion: string; dueAt: string; reason: string }): Promise<void>;
  revokeGrant(grantId: string, reason: string): Promise<void>;
  transferGrant(input: { newGrantId: string; oldGrantId: string; newContactId: string; tokenDigest: string; expiry: string; reason: string }): Promise<void>;
}

export const procurementPersistence = definePersistenceAdapter<ProcurementPersistenceHandle>({
  moduleKey: 'procurement_workspace',
  databaseRole: 'cpos_procurement_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    verifyAuthenticationIdentity: async (authenticationIdentityId) => {
      const row = await executor.oneOrNone<{ binding_id: string }>(sql`
        SELECT binding_id::text FROM platform.principal_authentication_identity
        WHERE tenant_id=current_setting('cpos.tenant_id')::uuid
          AND principal_id=current_setting('cpos.principal_id')::uuid
          AND authentication_identity_id=${authenticationIdentityId}
          AND effective_period @> statement_timestamp()
        LIMIT 1
      `);
      return row !== undefined;
    },
    canCommand: async () => {
      const row = await executor.oneOrNone<{ allowed: boolean }>(sql`
        SELECT (
          platform.current_tenant_has_active_product_access()
          AND (
            platform.current_principal_has_active_tenant_role('OWNER')
            OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
          )
        ) AS allowed
      `);
      return row?.allowed === true;
    },
    evidence: (projectId) => executor.all<EvidenceRow>(sql`
      SELECT r.evidence_record_id::text,v.evidence_version_id::text,r.evidence_class,v.source_kind,v.source_locator,
             v.mime_type,v.byte_size::text,v.accepted_at
      FROM evidence.evidence_record r JOIN evidence.evidence_version v
        ON v.tenant_id=r.tenant_id AND v.evidence_record_id=r.evidence_record_id
      WHERE r.tenant_id=current_setting('cpos.tenant_id')::uuid AND r.project_id=${projectId}
      ORDER BY v.accepted_at DESC,v.version DESC
    `),
    uploadSessions: (projectId) => executor.all<UploadSessionRow>(sql`
      SELECT s.upload_session_id::text,s.intended_evidence_class,s.intended_use,state.state,s.expires_at
      FROM evidence.upload_session s
      JOIN LATERAL(SELECT o.state FROM evidence.upload_session_state_occurrence o WHERE o.upload_session_id=s.upload_session_id ORDER BY o.sequence DESC LIMIT 1) state ON true
      WHERE s.tenant_id=current_setting('cpos.tenant_id')::uuid AND s.project_id=${projectId}
      ORDER BY s.recorded_at DESC
    `),
    requirements: (projectId) => executor.all<RequirementRow>(sql`
      SELECT s.authorized_requirement_source_id::text,s.source_kind,s.source_reference,b.description,
             g.current_authorized_quantity::text AS authorized_quantity,
             coalesce(active.total,0)::text AS allocated_quantity,
             (g.current_authorized_quantity-coalesce(active.total,0))::text AS available_quantity,
             g.uom_key,b.version::text AS basis_version
      FROM requirements.authorized_requirement_source s
      JOIN requirements.authorized_requirement_basis_guard g ON g.tenant_id=s.tenant_id AND g.authorized_requirement_source_id=s.authorized_requirement_source_id
      JOIN requirements.authorized_requirement_basis_version b ON b.tenant_id=g.tenant_id AND b.authorized_requirement_basis_version_id=g.current_basis_version_id
      LEFT JOIN LATERAL(
        SELECT sum(a.quantity) AS total FROM requirements.requirement_allocation a
        JOIN LATERAL(SELECT occurrence_kind FROM requirements.requirement_allocation_occurrence o WHERE o.requirement_allocation_id=a.requirement_allocation_id ORDER BY sequence DESC LIMIT 1) st ON true
        WHERE a.tenant_id=s.tenant_id AND a.authorized_requirement_source_id=s.authorized_requirement_source_id AND st.occurrence_kind='ALLOCATED'
      ) active ON true
      WHERE s.tenant_id=current_setting('cpos.tenant_id')::uuid AND s.project_id=${projectId}
      ORDER BY s.recorded_at DESC
    `),
    allocations: (projectId) => executor.all<AllocationRow>(sql`
      SELECT a.requirement_allocation_id::text,a.authorized_requirement_source_id::text,a.quantity::text,a.uom_key,a.allocation_purpose,st.occurrence_kind AS state
      FROM requirements.requirement_allocation a
      JOIN requirements.authorized_requirement_source s ON s.tenant_id=a.tenant_id AND s.authorized_requirement_source_id=a.authorized_requirement_source_id
      JOIN LATERAL(SELECT occurrence_kind FROM requirements.requirement_allocation_occurrence o WHERE o.requirement_allocation_id=a.requirement_allocation_id ORDER BY sequence DESC LIMIT 1) st ON true
      WHERE a.tenant_id=current_setting('cpos.tenant_id')::uuid AND s.project_id=${projectId}
      ORDER BY a.recorded_at DESC
    `),
    packages: (projectId) => executor.all<PackageRow>(sql`
      SELECT p.procurement_package_id::text,p.package_code,p.display_name,
        coalesce((SELECT jsonb_agg(x.requirement_allocation_id::text ORDER BY x.requirement_allocation_id)::text FROM (
          SELECT DISTINCT ON (m.requirement_allocation_id) m.requirement_allocation_id,m.occurrence_kind
          FROM requirements.package_membership_occurrence m WHERE m.procurement_package_id=p.procurement_package_id ORDER BY m.requirement_allocation_id,m.sequence DESC
        ) x WHERE x.occurrence_kind='ADDED'),'[]') AS active_allocation_ids_json
      FROM requirements.procurement_package p
      WHERE p.tenant_id=current_setting('cpos.tenant_id')::uuid AND p.project_id=${projectId}
      ORDER BY p.package_code
    `),
    suppliers: () => executor.all<SupplierRow>(sql`
      SELECT r.supplier_relationship_id::text,c.supplier_contact_id::text,r.supplier_name,c.display_name,c.email_address,c.mailbox_kind
      FROM sourcing.supplier_relationship r JOIN sourcing.supplier_contact c ON c.tenant_id=r.tenant_id AND c.supplier_relationship_id=r.supplier_relationship_id
      WHERE r.tenant_id=current_setting('cpos.tenant_id')::uuid AND r.relationship_state='ACTIVE' AND c.contact_state='ACTIVE'
      ORDER BY r.supplier_name,c.display_name
    `),
    registeredFields: () => executor.all<RegisteredFieldRow>(sql`
      SELECT field_key,family,canonical_meaning,explicit_non_meaning,comparison_eligibility
      FROM sourcing.registered_semantic_field_key WHERE lifecycle_state='ACTIVE' ORDER BY field_key
    `),
    rfqs: (projectId) => executor.all<RfqRow>(sql`
      SELECT e.sourcing_event_id::text,e.event_number,v.title,v.version::text,v.lifecycle_state,v.response_due_at,
             v.response_schema_version_id::text,v.acceptance_policy_id::text,
             (SELECT count(*) FROM sourcing.sourcing_event_member m JOIN sourcing.sourcing_event_version mv ON mv.sourcing_event_version_id=m.sourcing_event_version_id WHERE mv.sourcing_event_id=e.sourcing_event_id AND m.member_state='ACTIVE')::text AS member_count,
             v.issued_artifact_version_id::text,v.addendum_reason,
             (SELECT count(*) FROM sourcing.external_task_grant g JOIN sourcing.sourcing_event_version gv ON gv.sourcing_event_version_id=g.sourcing_event_version_id WHERE gv.sourcing_event_id=e.sourcing_event_id)::text AS grant_count
      FROM sourcing.sourcing_event e
      JOIN LATERAL(SELECT ev.* FROM sourcing.sourcing_event_version ev WHERE ev.sourcing_event_id=e.sourcing_event_id ORDER BY version DESC LIMIT 1) v ON true
      WHERE e.tenant_id=current_setting('cpos.tenant_id')::uuid AND e.project_id=${projectId}
      ORDER BY e.recorded_at DESC
    `),
    externalGrants: (projectId) => executor.all<ExternalGrantRow>(sql`
      SELECT g.external_task_grant_id::text,e.sourcing_event_id::text,g.sourcing_event_version_id::text,
             g.supplier_relationship_id::text,g.supplier_contact_id::text,r.supplier_name,c.display_name AS contact_display_name,
             state.occurrence_kind AS state,inv.channel,g.due_at,g.expires_at,g.replaces_grant_id::text,
             issue.message_id::text AS issue_message_id
      FROM sourcing.external_task_grant g
      JOIN sourcing.sourcing_event_version ev ON ev.tenant_id=g.tenant_id AND ev.sourcing_event_version_id=g.sourcing_event_version_id
      JOIN sourcing.sourcing_event e ON e.tenant_id=ev.tenant_id AND e.sourcing_event_id=ev.sourcing_event_id
      JOIN sourcing.supplier_relationship r ON r.tenant_id=g.tenant_id AND r.supplier_relationship_id=g.supplier_relationship_id
      JOIN sourcing.supplier_contact c ON c.tenant_id=g.tenant_id AND c.supplier_contact_id=g.supplier_contact_id
      JOIN LATERAL(SELECT o.occurrence_kind FROM sourcing.external_task_grant_occurrence o WHERE o.external_task_grant_id=g.external_task_grant_id ORDER BY o.sequence DESC LIMIT 1) state ON true
      LEFT JOIN LATERAL(SELECT i.channel FROM sourcing.invitation_occurrence i WHERE i.external_task_grant_id=g.external_task_grant_id ORDER BY i.recorded_at DESC LIMIT 1) inv ON true
      LEFT JOIN sourcing.sourcing_issue_occurrence issue ON issue.tenant_id=g.tenant_id AND issue.sourcing_event_version_id=g.sourcing_event_version_id
      WHERE g.tenant_id=current_setting('cpos.tenant_id')::uuid AND e.project_id=${projectId}
      ORDER BY g.recorded_at DESC
    `),
    createUploadSession: async (i) => { await executor.execute(sql`
      SELECT evidence.create_upload_session(${i.uploadSessionId},${i.projectId},${i.authorityContextId},${i.evidenceClass},${i.intendedUse},string_to_array(${i.mimeType},','),${i.maximumBytes},${1},${i.namespace},${i.correlation},${i.expiresAt}::timestamptz)
    `); },
    recordUploadState: async (id,state,reason) => { await executor.execute(sql`SELECT evidence.record_upload_state(${id},${state},${reason})`); },
    recordPayload: async (i) => { await executor.execute(sql`
      SELECT evidence.record_payload_attempt(${i.attemptId},${i.uploadSessionId},${i.objectKey},${i.providerVersionIdentity},${i.checksum},${i.byteSize},${i.mimeType},${i.integrityState},${null})
    `); },
    recordValidation: async (i) => { await executor.execute(sql`
      SELECT evidence.record_validation_observation(${i.observationId},${i.attemptId},${i.kind},${i.toolVersion},${i.disposition},${i.detail})
    `); },
    acceptEvidence: async (i) => { await executor.execute(sql`SELECT evidence.accept_captured_evidence(${i.evidenceRecordId},${i.evidenceVersionId},${i.uploadSessionId},${i.basis})`); },
    createRequirement: async (i) => { await executor.execute(sql`
      SELECT requirements.create_authorized_requirement(${i.sourceId},${i.basisVersionId},${i.projectId},${i.authorityContextId},${i.sourceKind},${i.sourceReference},${i.description},${i.quantity}::numeric,${i.uomKey},${i.evidenceVersionId ?? null})
    `); },
    allocateRequirement: async (i) => { await executor.execute(sql`SELECT requirements.allocate_requirement(${i.allocationId},${i.sourceId},${i.quantity}::numeric,${i.uomKey},${i.purpose},${null})`); },
    createPackage: async (i) => { await executor.execute(sql`SELECT requirements.create_procurement_package(${i.packageId},${i.projectId},${i.authorityContextId},${i.packageCode},${i.displayName})`); },
    createSupplier: async (i) => { await executor.execute(sql`SELECT sourcing.create_supplier(${i.relationshipId},${i.contactId},${i.supplierName},${i.supplierReference ?? null},${i.contactName},${i.email},${i.mailboxKind})`); },
    addSupplierContact: async (i) => { await executor.execute(sql`SELECT sourcing.add_supplier_contact(${i.contactId},${i.relationshipId},${i.contactName},${i.email},${i.mailboxKind})`); },
    createRfqDraft: async (i) => { await executor.execute(sql`SELECT sourcing.create_rfq_draft(${i.eventId},${i.eventVersionId},${i.schemaId},${i.policyId},${i.projectId},${i.authorityContextId},${i.eventNumber},${i.title},${i.dueAt}::timestamptz)`); },
    addSchemaField: async (i) => { await executor.execute(sql`SELECT sourcing.add_response_schema_field(${i.fieldId},${i.schemaId},${i.fieldKey},${i.label},${i.ordinal},${i.requirement},${null},${'{}'}::jsonb)`); },
    addEventMember: async (i) => { await executor.execute(sql`SELECT sourcing.add_event_member(${i.memberId},${i.eventVersionId},${i.relationshipId},${i.contactId})`); },
    eventIssueBasis: (eventId) => executor.oneOrNone<EventIssueBasisRow>(sql`
      SELECT e.sourcing_event_id::text,e.event_number,v.title,v.sourcing_event_version_id::text AS draft_version_id,v.version::text AS draft_version,
             v.response_due_at,v.response_schema_version_id::text,v.acceptance_policy_id::text,e.authority_context_id::text
      FROM sourcing.sourcing_event e JOIN LATERAL(SELECT ev.* FROM sourcing.sourcing_event_version ev WHERE ev.sourcing_event_id=e.sourcing_event_id ORDER BY version DESC LIMIT 1)v ON true
      WHERE e.tenant_id=current_setting('cpos.tenant_id')::uuid AND e.sourcing_event_id=${eventId} AND v.lifecycle_state='DRAFT'
    `),
    eventMembers: (eventId) => executor.all<EventMemberRow>(sql`
      SELECT m.sourcing_event_member_id::text,m.supplier_contact_id::text,r.supplier_name,c.email_address
      FROM sourcing.sourcing_event_member m
      JOIN sourcing.sourcing_event_version ev ON ev.tenant_id=m.tenant_id AND ev.sourcing_event_version_id=m.sourcing_event_version_id
      JOIN sourcing.supplier_relationship r ON r.tenant_id=m.tenant_id AND r.supplier_relationship_id=m.supplier_relationship_id
      JOIN sourcing.supplier_contact c ON c.tenant_id=m.tenant_id AND c.supplier_contact_id=m.supplier_contact_id
      WHERE m.tenant_id=current_setting('cpos.tenant_id')::uuid AND ev.sourcing_event_id=${eventId} AND m.member_state='ACTIVE'
      ORDER BY r.supplier_name
    `),
    createArtifactIntent: async (i) => { await executor.execute(sql`SELECT evidence.create_artifact_build_intent(${i.intentId},${i.projectId},${i.authorityContextId},${i.artifactKind},${i.fingerprint})`); },
    addArtifactMember: async (i) => { await executor.execute(sql`SELECT evidence.add_artifact_build_member(${i.memberId},${i.intentId},${i.memberKind},${i.subjectId},${i.versionIdentity},${i.fingerprint})`); },
    issueArtifact: async (i) => { await executor.execute(sql`SELECT evidence.issue_artifact_version(${i.issuedId},${i.intentId},${i.objectKey},${i.providerVersionIdentity},${i.checksum},${i.byteSize},${i.mimeType})`); },
    recordMessage: async (i) => { await executor.execute(sql`SELECT evidence.record_message(${i.messageId},${i.projectId},${i.authorityContextId},${i.kind},${i.subject},${i.artifactId})`); },
    issueEvent: async (i) => { await executor.execute(sql`SELECT sourcing.issue_event(${i.issuedVersionId},${i.eventId},${i.expectedVersion}::bigint,${i.artifactId},${i.messageId})`); },
    issueGrant: async (i) => { await executor.execute(sql`SELECT sourcing.issue_external_task_grant(${i.grantId},${i.issuedVersionId},${i.memberId},${i.tokenDigest},string_to_array(${'VIEW_TASK,SUBMIT_RESPONSE'},','),'STANDARD_RFQ','EMAIL_LINK_ASSURANCE','CONTROLLED_REISSUE',${i.expiry}::timestamptz)`); },
    recordInvitation: async (i) => { await executor.execute(sql`SELECT sourcing.record_invitation(${i.invitationId},${i.grantId},${i.messageId},${i.channel},${i.kind})`); },
    createAddendum: async (i) => { await executor.execute(sql`SELECT sourcing.create_addendum_draft(${i.versionId},${i.eventId},${i.expectedVersion}::bigint,${i.dueAt}::timestamptz,${i.reason})`); },
    revokeGrant: async (grantId, reason) => { await executor.execute(sql`SELECT sourcing.revoke_external_task_grant(${grantId},${reason})`); },
    transferGrant: async (i) => { await executor.execute(sql`SELECT sourcing.transfer_external_task_grant(${i.newGrantId},${i.oldGrantId},${i.newContactId},${i.tokenDigest},${i.expiry}::timestamptz,${i.reason})`); },
  }),
});
