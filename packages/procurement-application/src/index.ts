import { createHash, randomBytes, randomUUID } from 'node:crypto';

import type {
  CreateAuthorizedRequirementRequest,
  CreateAuthorizedRequirementResponse,
  CreateEvidenceUploadRequest,
  CreateEvidenceUploadResponse,
  CreateProcurementPackageRequest,
  CreateProcurementPackageResponse,
  CreateRequirementAllocationRequest,
  CreateRequirementAllocationResponse,
  CreateRfqDraftRequest,
  CreateRfqDraftResponse,
  CreateSupplierRequest,
  CreateSupplierResponse,
  CreateSupplierContactRequest,
  CreateSupplierContactResponse,
  CreateRfqAddendumRequest,
  CreateRfqAddendumResponse,
  RevokeExternalTaskGrantRequest,
  RevokeExternalTaskGrantResponse,
  TransferExternalTaskGrantRequest,
  TransferExternalTaskGrantResponse,
  IssueRfqRequest,
  IssueRfqResponse,
  ProcurementWorkspaceSnapshot,
  SemanticFieldFamily,
  UploadSessionState,
} from '@cpos/contracts';
import type { DatabaseRuntime } from '@cpos/database-core';
import type { MalwareScanner, VersionedObjectStore } from '@cpos/object-store';

import { procurementPersistence, type ProcurementPersistenceHandle } from './persistence/procurement.js';

export interface GovernedProcurementRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementService {
  readWorkspace(context: GovernedProcurementRequestContext, projectId: string): Promise<ProcurementWorkspaceSnapshot>;
  captureEvidence(context: GovernedProcurementRequestContext, request: CreateEvidenceUploadRequest): Promise<CreateEvidenceUploadResponse>;
  createRequirement(context: GovernedProcurementRequestContext, request: CreateAuthorizedRequirementRequest): Promise<CreateAuthorizedRequirementResponse>;
  allocateRequirement(context: GovernedProcurementRequestContext, request: CreateRequirementAllocationRequest): Promise<CreateRequirementAllocationResponse>;
  createPackage(context: GovernedProcurementRequestContext, request: CreateProcurementPackageRequest): Promise<CreateProcurementPackageResponse>;
  createSupplier(context: GovernedProcurementRequestContext, request: CreateSupplierRequest): Promise<CreateSupplierResponse>;
  addSupplierContact(context: GovernedProcurementRequestContext, request: CreateSupplierContactRequest): Promise<CreateSupplierContactResponse>;
  createRfqDraft(context: GovernedProcurementRequestContext, request: CreateRfqDraftRequest): Promise<CreateRfqDraftResponse>;
  issueRfq(context: GovernedProcurementRequestContext, request: IssueRfqRequest): Promise<IssueRfqResponse>;
  createRfqAddendum(context: GovernedProcurementRequestContext, request: CreateRfqAddendumRequest): Promise<CreateRfqAddendumResponse>;
  revokeExternalTaskGrant(context: GovernedProcurementRequestContext, request: RevokeExternalTaskGrantRequest): Promise<RevokeExternalTaskGrantResponse>;
  transferExternalTaskGrant(context: GovernedProcurementRequestContext, request: TransferExternalTaskGrantRequest): Promise<TransferExternalTaskGrantResponse>;
}

export interface ProcurementInfrastructure {
  readonly objectStore: VersionedObjectStore;
  readonly malwareScanner: MalwareScanner;
}

function txContext(context: GovernedProcurementRequestContext, operationKey: string, projectId?: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    ...(projectId === undefined ? {} : { projectId }),
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function bounded(value: string, name: string, min: number, max: number): string {
  const normalized = value.trim();
  if (normalized.length < min || normalized.length > max) throw new Error(`${name} is invalid`);
  return normalized;
}
function positiveDecimal(value: string, name: string): string {
  const normalized = value.trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,12})?$/u.test(normalized) || Number(normalized) <= 0) throw new Error(`${name} is invalid`);
  return normalized;
}
function sha256(bytes: Uint8Array): string { return createHash('sha256').update(bytes).digest('hex'); }
function artifactFingerprint(value: string): string { return `sha256:${createHash('sha256').update(value).digest('hex')}`; }
function parseActiveAllocationIds(value: string): readonly string[] {
  const parsed: unknown = JSON.parse(value);
  return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
}

export function createGovernedProcurementService(database: DatabaseRuntime, infrastructure?: ProcurementInfrastructure): GovernedProcurementService {
  async function use<Result>(
    context: GovernedProcurementRequestContext,
    operationKey: string,
    projectId: string | undefined,
    isolation: 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE',
    callback: (handle: ProcurementPersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      txContext(context, operationKey, projectId),
      { isolation, logicalIdentity: context.invocationId, ...(isolation === 'SERIALIZABLE' ? { preEffectSafeRetryMaximum: 2 } : {}) },
      procurementPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) throw new Error('verified authentication identity is not bound to this tenant principal');
        return callback(handle);
      },
    );
  }

  return Object.freeze({
    async readWorkspace(context, projectId) {
      const id = bounded(projectId, 'projectId', 1, 64);
      return use(context, 'procurement.workspace.read.v1', id, 'READ COMMITTED', async (h) => {
        const [evidence, uploadSessions, requirements, allocations, packages, suppliers, registeredFields, rfqs, externalTaskGrants, canCommand] = await Promise.all([
          h.evidence(id), h.uploadSessions(id), h.requirements(id), h.allocations(id), h.packages(id), h.suppliers(), h.registeredFields(), h.rfqs(id), h.externalGrants(id), h.canCommand(),
        ]);
        return {
          projectId: id,
          evidence: evidence.map((r) => ({ evidenceRecordId:r.evidence_record_id,evidenceVersionId:r.evidence_version_id,evidenceClass:r.evidence_class,sourceKind:r.source_kind,sourceLocator:r.source_locator,mimeType:r.mime_type,byteSize:r.byte_size,acceptedAt:r.accepted_at.toISOString() })),
          uploadSessions: uploadSessions.map((r) => ({ uploadSessionId:r.upload_session_id,evidenceClass:r.intended_evidence_class,intendedUse:r.intended_use,state:r.state as UploadSessionState,expiresAt:r.expires_at.toISOString() })),
          requirements: requirements.map((r) => ({ authorizedRequirementSourceId:r.authorized_requirement_source_id,sourceKind:r.source_kind,sourceReference:r.source_reference,description:r.description,authorizedQuantity:r.authorized_quantity,allocatedQuantity:r.allocated_quantity,availableQuantity:r.available_quantity,uomKey:r.uom_key,basisVersion:r.basis_version })),
          allocations: allocations.map((r) => ({ requirementAllocationId:r.requirement_allocation_id,authorizedRequirementSourceId:r.authorized_requirement_source_id,quantity:r.quantity,uomKey:r.uom_key,purpose:r.allocation_purpose,state:r.state })),
          packages: packages.map((r) => ({ procurementPackageId:r.procurement_package_id,packageCode:r.package_code,displayName:r.display_name,activeAllocationIds:parseActiveAllocationIds(r.active_allocation_ids_json) })),
          suppliers: suppliers.map((r) => ({ supplierRelationshipId:r.supplier_relationship_id,supplierContactId:r.supplier_contact_id,supplierName:r.supplier_name,displayName:r.display_name,emailAddress:r.email_address,mailboxKind:r.mailbox_kind })),
          registeredFields: registeredFields.map((r) => ({ fieldKey:r.field_key,family:r.family as SemanticFieldFamily,canonicalMeaning:r.canonical_meaning,explicitNonMeaning:r.explicit_non_meaning,comparisonEligibility:r.comparison_eligibility })),
          rfqs: rfqs.map((r) => ({ sourcingEventId:r.sourcing_event_id,eventNumber:r.event_number,title:r.title,version:r.version,lifecycleState:r.lifecycle_state,responseDueAt:r.response_due_at.toISOString(),responseSchemaVersionId:r.response_schema_version_id,acceptancePolicyId:r.acceptance_policy_id,memberCount:Number(r.member_count),issuedArtifactVersionId:r.issued_artifact_version_id,grantCount:Number(r.grant_count),addendumReason:r.addendum_reason })),
          externalTaskGrants: externalTaskGrants.map((g)=>({externalTaskGrantId:g.external_task_grant_id,sourcingEventId:g.sourcing_event_id,sourcingEventVersionId:g.sourcing_event_version_id,supplierRelationshipId:g.supplier_relationship_id,supplierContactId:g.supplier_contact_id,supplierName:g.supplier_name,contactDisplayName:g.contact_display_name,state:g.state,channel:g.channel,dueAt:g.due_at.toISOString(),expiresAt:g.expires_at.toISOString(),replacesGrantId:g.replaces_grant_id})),
          capabilities: { canCaptureEvidence:canCommand,canManageRequirements:canCommand,canManageSourcing:canCommand,canIssueRfq:canCommand,canManageExternalGrants:canCommand },
        };
      });
    },

    async captureEvidence(context, request) {
      if (!infrastructure) throw new Error('evidence object-store/scanner infrastructure is not configured');
      const projectId=bounded(request.projectId,'projectId',1,64);
      const authorityContextId=bounded(request.authorityContextId,'authorityContextId',1,64);
      const evidenceClass=bounded(request.evidenceClass,'evidenceClass',2,63).toUpperCase();
      const intendedUse=bounded(request.intendedUse,'intendedUse',1,240);
      const fileName=bounded(request.fileName,'fileName',1,240).replaceAll('\\','/').split('/').at(-1) ?? 'upload.bin';
      const mimeType=bounded(request.mimeType,'mimeType',1,255);
      const bytes=Buffer.from(request.contentBase64,'base64');
      if (bytes.byteLength<1 || bytes.byteLength>25*1024*1024) throw new Error('evidence payload must be from 1 byte to 25 MiB');
      const uploadSessionId=randomUUID();
      const expiresAt=new Date(Date.now()+60*60*1000).toISOString();
      await use(context,'evidence.upload.reserve.v1',projectId,'READ COMMITTED',(h)=>h.createUploadSession({ uploadSessionId,projectId,authorityContextId,evidenceClass,intendedUse,mimeType,maximumBytes:25n*1024n*1024n,namespace:`tenant/${context.tenantId}/project/${projectId}/evidence`,correlation:context.invocationId,expiresAt }));
      await use(context,'evidence.upload.transfer-start.v1',projectId,'READ COMMITTED',(h)=>h.recordUploadState(uploadSessionId,'PAYLOAD_TRANSFER_IN_PROGRESS','browser/API transfer started'));
      const objectKey=`tenant/${context.tenantId}/project/${projectId}/evidence/${uploadSessionId}/${randomBytes(12).toString('hex')}/${fileName}`;
      let object;
      try { object=await infrastructure.objectStore.putVerifiedObject({ key:objectKey,bytes,...(mimeType?{contentType:mimeType}:{}) }); }
      catch(error:unknown){
        await use(context,'evidence.upload.orphan-observe.v1',projectId,'READ COMMITTED',(h)=>h.recordUploadState(uploadSessionId,'ABANDONED_OR_EXPIRED','object transfer failed before durable provider identity'));
        throw error;
      }
      await use(context,'evidence.upload.stored.v1',projectId,'READ COMMITTED',(h)=>h.recordUploadState(uploadSessionId,'PAYLOAD_STORED_UNVERIFIED','versioned object stored'));
      const attemptId=randomUUID();
      await use(context,'evidence.upload.verify.v1',projectId,'READ COMMITTED',async(h)=>{
        await h.recordPayload({ attemptId,uploadSessionId,objectKey:object.key,providerVersionIdentity:object.versionId,checksum:object.sha256,byteSize:BigInt(object.size),mimeType:object.contentType ?? mimeType,integrityState:'VERIFIED' });
        await h.recordUploadState(uploadSessionId,'PAYLOAD_VERIFIED_QUARANTINED','checksum/size/provider version verified');
        await h.recordValidation({observationId:randomUUID(),attemptId,kind:'CHECKSUM',toolVersion:'object-store-sha256-v1',disposition:'PASS',detail:`sha256:${object.sha256}`});
        await h.recordValidation({observationId:randomUUID(),attemptId,kind:'MIME',toolVersion:'declared-and-object-metadata-v1',disposition:'PASS',detail:object.contentType ?? mimeType});
        await h.recordValidation({observationId:randomUUID(),attemptId,kind:'ARCHIVE',toolVersion:'archive-policy-v1',disposition:'NOT_APPLICABLE',detail:'no archive expansion performed'});
        await h.recordUploadState(uploadSessionId,'VALIDATION_IN_PROGRESS','malware validation started');
      });
      const scan=await infrastructure.malwareScanner.scan(bytes);
      if (scan.state!=='CLEAN') {
        await use(context,'evidence.upload.validation-failed.v1',projectId,'READ COMMITTED',async(h)=>{
          await h.recordValidation({observationId:randomUUID(),attemptId,kind:'MALWARE',toolVersion:'clamd-v1',disposition:scan.state==='INFECTED'?'FAIL':'BLOCKED',detail:scan.detail});
          await h.recordUploadState(uploadSessionId,'VALIDATION_BLOCKED_OR_FAILED',`scanner disposition ${scan.state}`);
        });
        throw new Error(`evidence validation blocked: ${scan.state}`);
      }
      const evidenceRecordId=randomUUID(); const evidenceVersionId=randomUUID();
      await use(context,'evidence.upload.accept.v1',projectId,'READ COMMITTED',async(h)=>{
        await h.recordValidation({observationId:randomUUID(),attemptId,kind:'MALWARE',toolVersion:'clamd-v1',disposition:'PASS',detail:scan.detail});
        await h.recordUploadState(uploadSessionId,'CAPTURED_EVIDENCE_ONLY','verified clean payload captured; not yet accepted');
        await h.acceptEvidence({ evidenceRecordId,evidenceVersionId,uploadSessionId,basis:'manual evidence command after verified payload integrity and clean malware scan' });
      });
      return {uploadSessionId,evidenceRecordId,evidenceVersionId,state:'ACCEPTED_EVIDENCE_VERSION'};
    },

    async createRequirement(context,request){
      const sourceId=randomUUID();
      await use(context,'requirements.source.create.v1',request.projectId,'SERIALIZABLE',(h)=>h.createRequirement({ sourceId,basisVersionId:randomUUID(),projectId:request.projectId,authorityContextId:request.authorityContextId,sourceKind:request.sourceKind,sourceReference:bounded(request.sourceReference,'sourceReference',1,500),description:bounded(request.description,'description',1,1000),quantity:positiveDecimal(request.authorizedQuantity,'authorizedQuantity'),uomKey:bounded(request.uomKey,'uomKey',1,32).toUpperCase(),...(request.evidenceVersionId?{evidenceVersionId:request.evidenceVersionId}:{}) }));
      return {authorizedRequirementSourceId:sourceId};
    },
    async allocateRequirement(context,request){
      const allocationId=randomUUID();
      await use(context,'requirements.allocation.create.v1',request.projectId,'SERIALIZABLE',(h)=>h.allocateRequirement({allocationId,sourceId:request.authorizedRequirementSourceId,quantity:positiveDecimal(request.quantity,'quantity'),uomKey:bounded(request.uomKey,'uomKey',1,32).toUpperCase(),purpose:bounded(request.purpose,'purpose',1,500)}));
      return {requirementAllocationId:allocationId};
    },
    async createPackage(context,request){
      const packageId=randomUUID();
      await use(context,'requirements.package.create.v1',request.projectId,'READ COMMITTED',(h)=>h.createPackage({packageId,projectId:request.projectId,authorityContextId:request.authorityContextId,packageCode:bounded(request.packageCode,'packageCode',1,64),displayName:bounded(request.displayName,'displayName',1,240)}));
      return {procurementPackageId:packageId};
    },
    async createSupplier(context,request){
      const relationshipId=randomUUID(),contactId=randomUUID();
      await use(context,'sourcing.supplier.create.v1',undefined,'READ COMMITTED',(h)=>h.createSupplier({relationshipId,contactId,supplierName:bounded(request.supplierName,'supplierName',1,300),...(request.supplierReference?{supplierReference:bounded(request.supplierReference,'supplierReference',1,240)}:{}),contactName:bounded(request.contactName,'contactName',1,240),email:bounded(request.emailAddress,'emailAddress',3,320),mailboxKind:request.mailboxKind}));
      return {supplierRelationshipId:relationshipId,supplierContactId:contactId};
    },
    async addSupplierContact(context,request){
      const contactId=randomUUID();
      await use(context,'sourcing.supplier-contact.create.v1',undefined,'READ COMMITTED',(h)=>h.addSupplierContact({contactId,relationshipId:request.supplierRelationshipId,contactName:bounded(request.contactName,'contactName',1,240),email:bounded(request.emailAddress,'emailAddress',3,320),mailboxKind:request.mailboxKind}));
      return {supplierContactId:contactId};
    },
    async createRfqDraft(context,request){
      if(request.responseFieldKeys.length<1||request.responseFieldKeys.length>32) throw new Error('RFQ responseFieldKeys must contain 1 to 32 product-registered keys');
      if(request.supplierContactIds.length<1||request.supplierContactIds.length>100) throw new Error('RFQ supplierContactIds must contain 1 to 100 contacts');
      const eventId=randomUUID(),eventVersionId=randomUUID(),schemaId=randomUUID(),policyId=randomUUID();
      await use(context,'sourcing.rfq.create.v1',request.projectId,'SERIALIZABLE',async(h)=>{
        await h.createRfqDraft({eventId,eventVersionId,schemaId,policyId,projectId:request.projectId,authorityContextId:request.authorityContextId,eventNumber:bounded(request.eventNumber,'eventNumber',1,64),title:bounded(request.title,'title',1,500),dueAt:new Date(request.responseDueAt).toISOString()});
        let ordinal=1;
        for(const key of request.responseFieldKeys){ await h.addSchemaField({fieldId:randomUUID(),schemaId,fieldKey:key,label:key.replaceAll('_',' '),ordinal,requirement:'MANDATORY'}); ordinal+=1; }
        const suppliers=await h.suppliers();
        for(const contactId of request.supplierContactIds){ const supplier=suppliers.find((s)=>s.supplier_contact_id===contactId); if(!supplier) throw new Error('RFQ supplier contact is unavailable'); await h.addEventMember({memberId:randomUUID(),eventVersionId,relationshipId:supplier.supplier_relationship_id,contactId}); }
      });
      return {sourcingEventId:eventId,sourcingEventVersionId:eventVersionId};
    },
    async issueRfq(context,request){
      if(!infrastructure) throw new Error('issued-artifact object-store infrastructure is not configured');
      const basis=await use(context,'sourcing.rfq.issue-preview.v1',request.projectId,'REPEATABLE READ',(h)=>h.eventIssueBasis(request.sourcingEventId));
      if(!basis) throw new Error('current RFQ draft is unavailable for issue');
      if(basis.draft_version!==request.expectedDraftVersion) throw new Error('stale RFQ issue basis');
      const members=await use(context,'sourcing.rfq.issue-members.v1',request.projectId,'READ COMMITTED',(h)=>h.eventMembers(request.sourcingEventId));
      if(members.length<1) throw new Error('RFQ requires at least one member');
      const artifactBody=JSON.stringify({type:'CPOS_RFQ_ISSUE_V1',eventId:basis.sourcing_event_id,eventNumber:basis.event_number,title:basis.title,version:basis.draft_version,dueAt:basis.response_due_at.toISOString(),responseSchemaVersionId:basis.response_schema_version_id,acceptancePolicyId:basis.acceptance_policy_id,members:members.map((m)=>({memberId:m.sourcing_event_member_id,supplier:m.supplier_name,email:m.email_address}))},null,2);
      const artifactBytes=Buffer.from(artifactBody,'utf8'); const intentId=randomUUID(); const artifactMemberId=randomUUID();
      const fingerprint=artifactFingerprint(artifactBody);
      await use(context,'evidence.artifact.intent.v1',request.projectId,'READ COMMITTED',async(h)=>{
        await h.createArtifactIntent({intentId,projectId:request.projectId,authorityContextId:basis.authority_context_id,artifactKind:'RFQ_ISSUE',fingerprint});
        await h.addArtifactMember({memberId:artifactMemberId,intentId,memberKind:'SOURCING_EVENT',subjectId:basis.sourcing_event_id,versionIdentity:`draft-v${basis.draft_version}`,fingerprint});
      });
      const object=await infrastructure.objectStore.putVerifiedObject({key:`tenant/${context.tenantId}/project/${request.projectId}/issued/rfq/${basis.sourcing_event_id}/${randomUUID()}.json`,bytes:artifactBytes,contentType:'application/json'});
      const issuedArtifactVersionId=randomUUID(),messageId=randomUUID(),issuedEventVersionId=randomUUID(); const grantIds:string[]=[];
      await use(context,'sourcing.rfq.issue.v1',request.projectId,'SERIALIZABLE',async(h)=>{
        await h.issueArtifact({issuedId:issuedArtifactVersionId,intentId,objectKey:object.key,providerVersionIdentity:object.versionId,checksum:object.sha256,byteSize:BigInt(object.size),mimeType:object.contentType ?? 'application/json'});
        await h.recordMessage({messageId,projectId:request.projectId,authorityContextId:basis.authority_context_id,kind:'RFQ_ISSUE',subject:`${basis.event_number} — ${basis.title}`,artifactId:issuedArtifactVersionId});
        await h.issueEvent({issuedVersionId:issuedEventVersionId,eventId:basis.sourcing_event_id,expectedVersion:basis.draft_version,artifactId:issuedArtifactVersionId,messageId});
        for(const member of members){ const grantId=randomUUID(); const tokenDigest=sha256(randomBytes(32)); const expiry=new Date(Math.max(basis.response_due_at.getTime(),Date.now())+24*60*60*1000).toISOString(); await h.issueGrant({grantId,issuedVersionId:issuedEventVersionId,memberId:member.sourcing_event_member_id,tokenDigest,expiry}); await h.recordInvitation({invitationId:randomUUID(),grantId,messageId,channel:'SECURE_LINK',kind:'ISSUE'}); grantIds.push(grantId); }
      });
      return {sourcingEventVersionId:issuedEventVersionId,issuedArtifactVersionId,messageId,externalTaskGrantIds:grantIds};
    },
    async createRfqAddendum(context,request){
      const versionId=randomUUID();
      await use(context,'sourcing.rfq.addendum.create.v1',request.projectId,'SERIALIZABLE',(h)=>h.createAddendum({versionId,eventId:request.sourcingEventId,expectedVersion:request.expectedIssuedVersion,dueAt:new Date(request.responseDueAt).toISOString(),reason:bounded(request.reason,'reason',3,1000)}));
      return {sourcingEventVersionId:versionId};
    },
    async revokeExternalTaskGrant(context,request){
      await use(context,'sourcing.external-grant.revoke.v1',request.projectId,'SERIALIZABLE',(h)=>h.revokeGrant(request.externalTaskGrantId,bounded(request.reason,'reason',3,1000)));
      return {externalTaskGrantId:request.externalTaskGrantId,state:'REVOKED'};
    },
    async transferExternalTaskGrant(context,request){
      const grants=await use(context,'sourcing.external-grant.transfer-preview.v1',request.projectId,'READ COMMITTED',(h)=>h.externalGrants(request.projectId));
      const current=grants.find((g)=>g.external_task_grant_id===request.externalTaskGrantId);
      if(!current || current.state!=='ISSUED') throw new Error('active external grant unavailable for transfer');
      if(!current.issue_message_id) throw new Error('external grant issue message basis unavailable');
      const newGrantId=randomUUID(); const tokenDigest=sha256(randomBytes(32));
      const expiry=new Date(Math.max(current.expires_at.getTime(),current.due_at.getTime())).toISOString();
      await use(context,'sourcing.external-grant.transfer.v1',request.projectId,'SERIALIZABLE',async(h)=>{
        await h.transferGrant({newGrantId,oldGrantId:request.externalTaskGrantId,newContactId:request.replacementSupplierContactId,tokenDigest,expiry,reason:bounded(request.reason,'reason',3,1000)});
        await h.recordInvitation({invitationId:randomUUID(),grantId:newGrantId,messageId:current.issue_message_id!,channel:'SECURE_LINK',kind:'CONTROLLED_REISSUE'});
      });
      return {previousExternalTaskGrantId:request.externalTaskGrantId,externalTaskGrantId:newGrantId,state:'ISSUED'};
    },
  });
}
