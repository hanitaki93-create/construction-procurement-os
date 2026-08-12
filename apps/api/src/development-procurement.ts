import { randomUUID } from 'node:crypto';

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
} from '@cpos/contracts';

import type { PlatformRequestContext, ProcurementWorkspaceService } from './app.js';
import { developmentDemoSession, developmentDemoSessions } from './development-platform.js';

const demoProject = '019d6666-6666-7666-8666-666666666662';

function session(context: PlatformRequestContext) {
  const found = developmentDemoSessions.find((entry) => entry.principalId === context.principalId && entry.tenantId === context.tenantId);
  if (!found) throw new Error('development session is not authorized for the demo workspace');
  return found;
}
function canCommand(context: PlatformRequestContext): boolean {
  return session(context).roles.some((role) => role === 'OWNER' || role === 'PROCUREMENT_MANAGER');
}
function requireCommand(context: PlatformRequestContext): void {
  if (!canCommand(context)) throw new Error('development procurement command is not authorized for this role');
}

export function createDevelopmentProcurementWorkspaceService(): ProcurementWorkspaceService {
  const evidence: ProcurementWorkspaceSnapshot['evidence'][number][] = [
    { evidenceRecordId:randomUUID(),evidenceVersionId:randomUUID(),evidenceClass:'BOQ_SOURCE',sourceKind:'MANUAL_UPLOAD',sourceLocator:'UAQ_BoQ_Rev02.pdf',mimeType:'application/pdf',byteSize:'2480134',acceptedAt:'2026-08-12T09:00:00.000Z' },
  ];
  const uploadSessions: ProcurementWorkspaceSnapshot['uploadSessions'][number][] = [];
  const requirements: ProcurementWorkspaceSnapshot['requirements'][number][] = [
    { authorizedRequirementSourceId:randomUUID(),sourceKind:'BOQ',sourceReference:'BOQ-CIV-001',description:'Ready-mix concrete C40/20',authorizedQuantity:'260.000000000000',allocatedQuantity:'95.000000000000',availableQuantity:'165.000000000000',uomKey:'M3',basisVersion:'1' },
    { authorizedRequirementSourceId:randomUUID(),sourceKind:'BOQ',sourceReference:'BOQ-BLK-014',description:'200mm concrete blockwork',authorizedQuantity:'1180.000000000000',allocatedQuantity:'0',availableQuantity:'1180.000000000000',uomKey:'M2',basisVersion:'1' },
  ];
  const allocations: ProcurementWorkspaceSnapshot['allocations'][number][] = [
    { requirementAllocationId:randomUUID(),authorizedRequirementSourceId:requirements[0]!.authorizedRequirementSourceId,quantity:'95.000000000000',uomKey:'M3',purpose:'Concrete supply RFQ',state:'ALLOCATED' },
  ];
  const packages: ProcurementWorkspaceSnapshot['packages'][number][] = [
    { procurementPackageId:randomUUID(),packageCode:'PKG-CIV-01',displayName:'Concrete Supply',activeAllocationIds:[allocations[0]!.requirementAllocationId] },
  ];
  const suppliers: ProcurementWorkspaceSnapshot['suppliers'][number][] = [
    { supplierRelationshipId:randomUUID(),supplierContactId:randomUUID(),supplierName:'Al Fahad Building Materials',displayName:'Sales Desk',emailAddress:'sales@alfahad.example',mailboxKind:'SHARED_MAILBOX' },
    { supplierRelationshipId:randomUUID(),supplierContactId:randomUUID(),supplierName:'Gulf Ready Mix',displayName:'Tender Team',emailAddress:'tenders@gulfreadymix.example',mailboxKind:'TEAM' },
  ];
  const registeredFields: ProcurementWorkspaceSnapshot['registeredFields'][number][] = [
    {fieldKey:'RFQ_ITEM_REFERENCE',family:'IDENTITY_OR_REFERENCE',canonicalMeaning:'Buyer-issued line/item reference for exact response alignment.',explicitNonMeaning:'Does not establish compliance, equivalence, award or commitment.',comparisonEligibility:'DIRECT'},
    {fieldKey:'RFQ_QUANTITY',family:'QUANTITY_WITH_UOM',canonicalMeaning:'Requested quantity bound to issued UOM.',explicitNonMeaning:'Does not establish delivered or committed quantity.',comparisonEligibility:'DIRECT'},
    {fieldKey:'RFQ_UNIT_RATE',family:'MONETARY_WITH_CURRENCY',canonicalMeaning:'Supplier quoted unit-rate source value.',explicitNonMeaning:'Does not establish evaluated or awarded price.',comparisonEligibility:'REGISTERED_NORMALIZATION_ONLY'},
    {fieldKey:'RFQ_LEAD_TIME',family:'DURATION_OR_LEAD_TIME',canonicalMeaning:'Supplier stated source lead-time.',explicitNonMeaning:'Does not establish contractual milestone.',comparisonEligibility:'REGISTERED_NORMALIZATION_ONLY'},
  ];
  const rfqs: ProcurementWorkspaceSnapshot['rfqs'][number][] = [
    { sourcingEventId:randomUUID(),eventNumber:'RFQ-UAQ-001',title:'Concrete Supply — C40/20',version:'2',lifecycleState:'ISSUED',responseDueAt:'2026-08-19T12:00:00.000Z',responseSchemaVersionId:randomUUID(),acceptancePolicyId:randomUUID(),memberCount:2,issuedArtifactVersionId:randomUUID(),grantCount:2,addendumReason:null },
  ];
  const externalTaskGrants: ProcurementWorkspaceSnapshot['externalTaskGrants'][number][] = [
    {externalTaskGrantId:randomUUID(),sourcingEventId:rfqs[0]!.sourcingEventId,sourcingEventVersionId:randomUUID(),supplierRelationshipId:suppliers[0]!.supplierRelationshipId,supplierContactId:suppliers[0]!.supplierContactId,supplierName:suppliers[0]!.supplierName,contactDisplayName:suppliers[0]!.displayName,state:'ISSUED',channel:'SECURE_LINK',dueAt:rfqs[0]!.responseDueAt,expiresAt:'2026-08-20T12:00:00.000Z',replacesGrantId:null},
    {externalTaskGrantId:randomUUID(),sourcingEventId:rfqs[0]!.sourcingEventId,sourcingEventVersionId:randomUUID(),supplierRelationshipId:suppliers[1]!.supplierRelationshipId,supplierContactId:suppliers[1]!.supplierContactId,supplierName:suppliers[1]!.supplierName,contactDisplayName:suppliers[1]!.displayName,state:'ISSUED',channel:'SECURE_LINK',dueAt:rfqs[0]!.responseDueAt,expiresAt:'2026-08-20T12:00:00.000Z',replacesGrantId:null},
  ];

  function snapshot(context: PlatformRequestContext, projectId: string): ProcurementWorkspaceSnapshot {
    session(context);
    if (projectId !== demoProject && !projectId.startsWith('019d')) throw new Error('demo project is unavailable');
    const allowed = canCommand(context);
    return { projectId,evidence:[...evidence],uploadSessions:[...uploadSessions],requirements:[...requirements],allocations:[...allocations],packages:[...packages],suppliers:[...suppliers],registeredFields:[...registeredFields],rfqs:[...rfqs],externalTaskGrants:[...externalTaskGrants],capabilities:{canCaptureEvidence:allowed,canManageRequirements:allowed,canManageSourcing:allowed,canIssueRfq:allowed,canManageExternalGrants:allowed} };
  }

  return Object.freeze({
    async readWorkspace(context,projectId){ return snapshot(context,projectId); },
    async captureEvidence(context,request:CreateEvidenceUploadRequest):Promise<CreateEvidenceUploadResponse>{
      requireCommand(context); const uploadSessionId=randomUUID(),evidenceRecordId=randomUUID(),evidenceVersionId=randomUUID();
      uploadSessions.unshift({uploadSessionId,evidenceClass:request.evidenceClass,intendedUse:request.intendedUse,state:'ACCEPTED_EVIDENCE_VERSION',expiresAt:new Date(Date.now()+3600000).toISOString()});
      evidence.unshift({evidenceRecordId,evidenceVersionId,evidenceClass:request.evidenceClass,sourceKind:'MANUAL_UPLOAD',sourceLocator:request.fileName,mimeType:request.mimeType,byteSize:String(Buffer.from(request.contentBase64,'base64').byteLength),acceptedAt:new Date().toISOString()});
      return {uploadSessionId,evidenceRecordId,evidenceVersionId,state:'ACCEPTED_EVIDENCE_VERSION'};
    },
    async createRequirement(context,request:CreateAuthorizedRequirementRequest):Promise<CreateAuthorizedRequirementResponse>{ requireCommand(context); const id=randomUUID(); requirements.unshift({authorizedRequirementSourceId:id,sourceKind:request.sourceKind,sourceReference:request.sourceReference,description:request.description,authorizedQuantity:request.authorizedQuantity,allocatedQuantity:'0',availableQuantity:request.authorizedQuantity,uomKey:request.uomKey,basisVersion:'1'}); return {authorizedRequirementSourceId:id}; },
    async allocateRequirement(context,request:CreateRequirementAllocationRequest):Promise<CreateRequirementAllocationResponse>{ requireCommand(context); const req=requirements.find((r)=>r.authorizedRequirementSourceId===request.authorizedRequirementSourceId); if(!req) throw new Error('authorized requirement unavailable'); const q=Number(request.quantity),available=Number(req.availableQuantity); if(q<=0||q>available) throw new Error('requirement allocation exceeds current authorized quantity'); const id=randomUUID(); allocations.unshift({requirementAllocationId:id,authorizedRequirementSourceId:req.authorizedRequirementSourceId,quantity:request.quantity,uomKey:request.uomKey,purpose:request.purpose,state:'ALLOCATED'}); const idx=requirements.indexOf(req); requirements[idx]={...req,allocatedQuantity:String(Number(req.allocatedQuantity)+q),availableQuantity:String(available-q)}; return {requirementAllocationId:id}; },
    async createPackage(context,request:CreateProcurementPackageRequest):Promise<CreateProcurementPackageResponse>{ requireCommand(context); const id=randomUUID(); packages.unshift({procurementPackageId:id,packageCode:request.packageCode,displayName:request.displayName,activeAllocationIds:[]}); return {procurementPackageId:id}; },
    async createSupplier(context,request:CreateSupplierRequest):Promise<CreateSupplierResponse>{ requireCommand(context); const relationshipId=randomUUID(),contactId=randomUUID(); suppliers.unshift({supplierRelationshipId:relationshipId,supplierContactId:contactId,supplierName:request.supplierName,displayName:request.contactName,emailAddress:request.emailAddress,mailboxKind:request.mailboxKind}); return {supplierRelationshipId:relationshipId,supplierContactId:contactId}; },
    async addSupplierContact(context,request:CreateSupplierContactRequest):Promise<CreateSupplierContactResponse>{ requireCommand(context); const relationship=suppliers.find((x)=>x.supplierRelationshipId===request.supplierRelationshipId); if(!relationship) throw new Error('supplier relationship unavailable'); const contactId=randomUUID(); suppliers.unshift({supplierRelationshipId:request.supplierRelationshipId,supplierContactId:contactId,supplierName:relationship.supplierName,displayName:request.contactName,emailAddress:request.emailAddress,mailboxKind:request.mailboxKind}); return {supplierContactId:contactId}; },
    async createRfqDraft(context,request:CreateRfqDraftRequest):Promise<CreateRfqDraftResponse>{ requireCommand(context); for(const key of request.responseFieldKeys){if(!registeredFields.some((f)=>f.fieldKey===key)) throw new Error('field key is not product-registered and active');} const eventId=randomUUID(),versionId=randomUUID(); rfqs.unshift({sourcingEventId:eventId,eventNumber:request.eventNumber,title:request.title,version:'1',lifecycleState:'DRAFT',responseDueAt:request.responseDueAt,responseSchemaVersionId:randomUUID(),acceptancePolicyId:randomUUID(),memberCount:request.supplierContactIds.length,issuedArtifactVersionId:null,grantCount:0,addendumReason:null}); return {sourcingEventId:eventId,sourcingEventVersionId:versionId}; },
    async issueRfq(context,request:IssueRfqRequest):Promise<IssueRfqResponse>{ requireCommand(context); const idx=rfqs.findIndex((r)=>r.sourcingEventId===request.sourcingEventId); const current=rfqs[idx]; if(!current||current.lifecycleState!=='DRAFT'||current.version!==request.expectedDraftVersion) throw new Error('stale or non-draft issue basis'); const artifact=randomUUID(),messageId=randomUUID(),versionId=randomUUID(); const selected=suppliers.slice(0,current.memberCount); const grants=selected.map((supplier)=>{const id=randomUUID(); externalTaskGrants.unshift({externalTaskGrantId:id,sourcingEventId:current.sourcingEventId,sourcingEventVersionId:versionId,supplierRelationshipId:supplier.supplierRelationshipId,supplierContactId:supplier.supplierContactId,supplierName:supplier.supplierName,contactDisplayName:supplier.displayName,state:'ISSUED',channel:'SECURE_LINK',dueAt:current.responseDueAt,expiresAt:new Date(new Date(current.responseDueAt).getTime()+86400000).toISOString(),replacesGrantId:null}); return id;}); rfqs[idx]={...current,version:String(Number(current.version)+1),lifecycleState:'ISSUED',issuedArtifactVersionId:artifact,grantCount:grants.length,addendumReason:null}; return {sourcingEventVersionId:versionId,issuedArtifactVersionId:artifact,messageId,externalTaskGrantIds:grants}; },
    async createRfqAddendum(context,request:CreateRfqAddendumRequest):Promise<CreateRfqAddendumResponse>{ requireCommand(context); const idx=rfqs.findIndex((r)=>r.sourcingEventId===request.sourcingEventId); const current=rfqs[idx]; if(!current||current.lifecycleState!=='ISSUED'||current.version!==request.expectedIssuedVersion) throw new Error('addendum requires exact current issued version'); const versionId=randomUUID(); rfqs[idx]={...current,version:String(Number(current.version)+1),lifecycleState:'DRAFT',responseDueAt:request.responseDueAt,issuedArtifactVersionId:null,addendumReason:request.reason}; return {sourcingEventVersionId:versionId}; },
    async revokeExternalTaskGrant(context,request:RevokeExternalTaskGrantRequest):Promise<RevokeExternalTaskGrantResponse>{ requireCommand(context); const idx=externalTaskGrants.findIndex((g)=>g.externalTaskGrantId===request.externalTaskGrantId); const g=externalTaskGrants[idx]; if(!g||g.state!=='ISSUED') throw new Error('active external grant unavailable'); externalTaskGrants[idx]={...g,state:'REVOKED'}; return {externalTaskGrantId:g.externalTaskGrantId,state:'REVOKED'}; },
    async transferExternalTaskGrant(context,request:TransferExternalTaskGrantRequest):Promise<TransferExternalTaskGrantResponse>{ requireCommand(context); const idx=externalTaskGrants.findIndex((g)=>g.externalTaskGrantId===request.externalTaskGrantId); const old=externalTaskGrants[idx]; if(!old||old.state!=='ISSUED') throw new Error('active external grant unavailable for transfer'); const contact=suppliers.find((x)=>x.supplierContactId===request.replacementSupplierContactId&&x.supplierRelationshipId===old.supplierRelationshipId); if(!contact) throw new Error('replacement contact must be within the same supplier relationship'); externalTaskGrants[idx]={...old,state:'TRANSFER_REISSUED'}; const id=randomUUID(); externalTaskGrants.unshift({...old,externalTaskGrantId:id,supplierContactId:contact.supplierContactId,contactDisplayName:contact.displayName,state:'ISSUED',replacesGrantId:old.externalTaskGrantId}); return {previousExternalTaskGrantId:old.externalTaskGrantId,externalTaskGrantId:id,state:'ISSUED'}; },
  });
}

export const developmentProcurementProjectId = demoProject;
export const defaultDevelopmentProcurementSession = developmentDemoSession;
