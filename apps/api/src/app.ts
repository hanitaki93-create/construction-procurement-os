import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

import {
  technicalOpenApiDocument,
  type CreateProjectRequest,
  type CreateProjectResponse,
  type ProcurementWorkspaceSnapshot,
  type CreateEvidenceUploadRequest,
  type CreateEvidenceUploadResponse,
  type CreateAuthorizedRequirementRequest,
  type CreateAuthorizedRequirementResponse,
  type CreateRequirementAllocationRequest,
  type CreateRequirementAllocationResponse,
  type CreateProcurementPackageRequest,
  type CreateProcurementPackageResponse,
  type CreateSupplierRequest,
  type CreateSupplierResponse,
  type CreateSupplierContactRequest,
  type CreateSupplierContactResponse,
  type CreateRfqDraftRequest,
  type CreateRfqDraftResponse,
  type IssueRfqRequest,
  type IssueRfqResponse,
  type CreateRfqAddendumRequest,
  type CreateRfqAddendumResponse,
  type RevokeExternalTaskGrantRequest,
  type RevokeExternalTaskGrantResponse,
  type TransferExternalTaskGrantRequest,
  type TransferExternalTaskGrantResponse,
  type HealthComponent,
  type LivenessResponse,
  type PlatformWorkspaceSnapshot,
  type ReadinessResponse,
} from '@cpos/contracts';
import type { RuntimeConfig } from '@cpos/config';
import type { TechnicalLogger } from '@cpos/observability';

const secureHeaders: Readonly<Record<string, string>> = {
  'content-security-policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  'cross-origin-resource-policy': 'same-origin',
  'permissions-policy': 'camera=(), geolocation=(), microphone=()',
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function normalizeThrown(value: unknown): Readonly<{ name: string; message: string }> {
  if (value instanceof Error) return { name: value.name, message: value.message };
  return { name: 'UnknownThrownValue', message: String(value) };
}

function singleHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];
  if (Array.isArray(value)) return value[0];
  return value;
}

export interface VerifiedAuthenticationSession {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
}

export interface AuthenticationSessionResolver {
  resolve(request: FastifyRequest): Promise<VerifiedAuthenticationSession | undefined>;
}

export interface PlatformRequestContext extends VerifiedAuthenticationSession {
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface PlatformWorkspaceService {
  readWorkspace(context: PlatformRequestContext): Promise<PlatformWorkspaceSnapshot>;
  createProject(
    context: PlatformRequestContext,
    request: CreateProjectRequest,
  ): Promise<CreateProjectResponse>;
}

export interface ProcurementWorkspaceService {
  readWorkspace(context: PlatformRequestContext, projectId: string): Promise<ProcurementWorkspaceSnapshot>;
  captureEvidence(context: PlatformRequestContext, request: CreateEvidenceUploadRequest): Promise<CreateEvidenceUploadResponse>;
  createRequirement(context: PlatformRequestContext, request: CreateAuthorizedRequirementRequest): Promise<CreateAuthorizedRequirementResponse>;
  allocateRequirement(context: PlatformRequestContext, request: CreateRequirementAllocationRequest): Promise<CreateRequirementAllocationResponse>;
  createPackage(context: PlatformRequestContext, request: CreateProcurementPackageRequest): Promise<CreateProcurementPackageResponse>;
  createSupplier(context: PlatformRequestContext, request: CreateSupplierRequest): Promise<CreateSupplierResponse>;
  addSupplierContact(context: PlatformRequestContext, request: CreateSupplierContactRequest): Promise<CreateSupplierContactResponse>;
  createRfqDraft(context: PlatformRequestContext, request: CreateRfqDraftRequest): Promise<CreateRfqDraftResponse>;
  issueRfq(context: PlatformRequestContext, request: IssueRfqRequest): Promise<IssueRfqResponse>;
  createRfqAddendum(context: PlatformRequestContext, request: CreateRfqAddendumRequest): Promise<CreateRfqAddendumResponse>;
  revokeExternalTaskGrant(context: PlatformRequestContext, request: RevokeExternalTaskGrantRequest): Promise<RevokeExternalTaskGrantResponse>;
  transferExternalTaskGrant(context: PlatformRequestContext, request: TransferExternalTaskGrantRequest): Promise<TransferExternalTaskGrantResponse>;
}

function developmentContext(
  request: FastifyRequest,
  environment: string,
): PlatformRequestContext | undefined {
  if (environment === 'production') return undefined;
  if (singleHeader(request, 'x-cpos-session-mode') !== 'development') return undefined;

  const tenantId = singleHeader(request, 'x-cpos-tenant-id')?.trim();
  const principalId = singleHeader(request, 'x-cpos-principal-id')?.trim();
  const suppliedIdentity = singleHeader(request, 'x-cpos-authentication-identity-id')?.trim();
  if (!tenantId || !principalId || !uuidPattern.test(tenantId) || !uuidPattern.test(principalId)) {
    return undefined;
  }

  return {
    authenticationIdentityId: suppliedIdentity || `development:${principalId}`,
    tenantId,
    principalId,
    invocationId: request.id,
    serviceIdentity: 'cpos-api',
  };
}

async function resolvedContext(
  request: FastifyRequest,
  environment: string,
  resolver: AuthenticationSessionResolver | undefined,
): Promise<PlatformRequestContext | undefined> {
  if (resolver !== undefined) {
    const verified = await resolver.resolve(request);
    if (verified === undefined) return undefined;
    if (!uuidPattern.test(verified.tenantId) || !uuidPattern.test(verified.principalId)) return undefined;
    if (!verified.authenticationIdentityId.trim() || verified.authenticationIdentityId.length > 512) {
      return undefined;
    }
    return {
      ...verified,
      invocationId: request.id,
      serviceIdentity: 'cpos-api',
    };
  }
  return developmentContext(request, environment);
}

function productErrorStatus(error: unknown): 400 | 401 | 403 | 409 | 422 | 500 {
  const message = normalizeThrown(error).message.toLowerCase();
  if (
    message.includes('projectcode') ||
    message.includes('displayname') ||
    message.includes('project code') ||
    message.includes('authority context') ||
    message.includes(' is invalid') ||
    message.includes('must contain') ||
    message.includes('payload must')
  ) {
    return 400;
  }
  if (message.includes('authentication identity') || message.includes('session')) return 401;
  if (
    message.includes('not authorized') ||
    message.includes('permission denied') ||
    message.includes('product access') ||
    message.includes('row-level security')
  ) {
    return 403;
  }
  if (message.includes('already exists') || message.includes('conflict') || message.includes('stale')) return 409;
  if (message.includes('required') || message.includes('blocked') || message.includes('cannot') || message.includes('only an active')) return 422;
  return 500;
}

export interface BuildApiOptions {
  readonly config: RuntimeConfig;
  readonly logger: TechnicalLogger;
  readonly now?: () => Date;
  readonly platformWorkspaceService?: PlatformWorkspaceService;
  readonly procurementWorkspaceService?: ProcurementWorkspaceService;
  readonly authenticationSessionResolver?: AuthenticationSessionResolver;
}

export function buildApi({
  config,
  logger,
  now = () => new Date(),
  platformWorkspaceService,
  procurementWorkspaceService,
  authenticationSessionResolver,
}: BuildApiOptions): FastifyInstance {
  const app = Fastify({
    bodyLimit: config.bodyLimitBytes,
    connectionTimeout: config.requestTimeoutMs,
    logger: false,
    requestTimeout: config.requestTimeoutMs,
    trustProxy: config.trustProxy,
  });

  app.addHook('onRequest', async (request) => {
    logger.info('http_request_started', {
      requestId: request.id,
      method: request.method,
      route: request.routeOptions.url,
    });
  });

  app.addHook('onSend', async (_request, reply, payload) => {
    for (const [name, value] of Object.entries(secureHeaders)) reply.header(name, value);
    reply.header('cache-control', 'no-store');
    return payload;
  });

  app.addHook('onResponse', async (request, reply) => {
    logger.info('http_request_completed', {
      requestId: request.id,
      method: request.method,
      route: request.routeOptions.url,
      statusCode: reply.statusCode,
    });
  });

  app.setErrorHandler((error, request, reply) => {
    const normalized = normalizeThrown(error);
    logger.error('http_request_failed', {
      requestId: request.id,
      errorName: normalized.name,
      errorMessage: normalized.message,
    });
    void reply.status(500).send({ status: 'error', requestId: request.id });
  });

  app.get('/health/live', async (): Promise<LivenessResponse> => ({
    status: 'ok',
    checkedAt: now().toISOString(),
  }));

  app.get('/health/ready', async (): Promise<ReadinessResponse> => {
    const checkedAt = now().toISOString();
    const components: readonly HealthComponent[] = [
      {
        name: 'runtime',
        state: 'ok',
        checkedAt,
        detail: platformWorkspaceService
          ? `Platform runtime configured; procurement runtime ${procurementWorkspaceService ? 'configured' : 'disabled'}.`
          : 'Technical runtime is ready; product runtimes are disabled.',
      },
    ];
    return { status: 'ok', checkedAt, components };
  });

  app.get('/meta/build', async () => config.build);
  app.get('/openapi.json', async () => technicalOpenApiDocument);

  app.get('/auth/sign-in', async (_request, reply) =>
    reply.status(501).send({
      code: 'AUTH_PROVIDER_NOT_CONFIGURED',
      message: 'Use a configured verified authentication provider for this deployment.',
    }),
  );

  app.get('/auth/callback', async (_request, reply) =>
    reply.status(501).send({
      code: 'AUTH_PROVIDER_NOT_CONFIGURED',
      message: 'Authentication callback ownership is provider-neutral and not configured here.',
    }),
  );

  async function requireProductContext(request: FastifyRequest, reply: FastifyReply): Promise<PlatformRequestContext | undefined> {
    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);
    if (context) return context;
    reply.status(401).send({
      code: 'SESSION_REQUIRED',
      message: config.build.environment === 'production'
        ? 'A verified production authentication provider is not configured.'
        : 'Provide a verified or development session with tenant and principal context.',
    });
    return undefined;
  }

  function bodyObject(request: FastifyRequest): Record<string, unknown> | undefined {
    return request.body && typeof request.body === 'object' && !Array.isArray(request.body)
      ? request.body as Record<string, unknown>
      : undefined;
  }

  async function procurementCommand<Result>(request: FastifyRequest, reply: FastifyReply, code: string, execute: (context: PlatformRequestContext) => Promise<Result>, successStatus = 201): Promise<unknown> {
    if (!procurementWorkspaceService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context = await requireProductContext(request, reply);
    if (!context) return undefined;
    try { return reply.status(successStatus).send(await execute(context)); }
    catch (error: unknown) {
      const status=productErrorStatus(error); if(status===500) throw error;
      return reply.status(status).send({code,requestId:request.id,message:normalizeThrown(error).message});
    }
  }

  app.get('/platform/workspace', async (request, reply) => {
    if (!platformWorkspaceService) {
      return reply.status(503).send({
        code: 'PRODUCT_RUNTIME_UNAVAILABLE',
        message: 'The platform workspace runtime is not enabled for this API process.',
      });
    }
    const context = await resolvedContext(
      request,
      config.build.environment,
      authenticationSessionResolver,
    );
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message:
          config.build.environment === 'production'
            ? 'A verified production authentication provider is not configured.'
            : 'Provide a verified or development session with tenant and principal context.',
      });
    }

    try {
      return await platformWorkspaceService.readWorkspace(context);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'WORKSPACE_READ_REJECTED', requestId: request.id });
    }
  });

  app.post('/platform/projects', async (request, reply) => {
    if (!platformWorkspaceService) {
      return reply.status(503).send({
        code: 'PRODUCT_RUNTIME_UNAVAILABLE',
        message: 'The platform workspace runtime is not enabled for this API process.',
      });
    }
    const context = await resolvedContext(
      request,
      config.build.environment,
      authenticationSessionResolver,
    );
    if (!context) {
      return reply.status(401).send({
        code: 'SESSION_REQUIRED',
        message:
          config.build.environment === 'production'
            ? 'A verified production authentication provider is not configured.'
            : 'Provide a verified or development session with tenant and principal context.',
      });
    }

    const raw = request.body;
    if (!raw || typeof raw !== 'object') {
      return reply.status(400).send({ code: 'INVALID_PROJECT_REQUEST' });
    }
    const body = raw as Partial<CreateProjectRequest>;
    if (typeof body.projectCode !== 'string' || typeof body.displayName !== 'string') {
      return reply.status(400).send({ code: 'INVALID_PROJECT_REQUEST' });
    }

    try {
      const result = await platformWorkspaceService.createProject(context, {
        projectCode: body.projectCode,
        displayName: body.displayName,
      });
      return reply.status(201).send(result);
    } catch (error: unknown) {
      const status = productErrorStatus(error);
      if (status === 500) throw error;
      return reply.status(status).send({ code: 'PROJECT_CREATE_REJECTED', requestId: request.id });
    }
  });

  app.get('/procurement/workspace', async (request, reply) => {
    if (!procurementWorkspaceService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });
    const context=await requireProductContext(request,reply); if(!context) return;
    const query=request.query as {projectId?: unknown}; if(typeof query?.projectId!=='string'||!uuidPattern.test(query.projectId)) return reply.status(400).send({code:'INVALID_PROJECT_CONTEXT'});
    try { return await procurementWorkspaceService.readWorkspace(context,query.projectId); }
    catch(error:unknown){ const status=productErrorStatus(error); if(status===500) throw error; return reply.status(status).send({code:'PROCUREMENT_WORKSPACE_READ_REJECTED',requestId:request.id}); }
  });

  app.post('/procurement/evidence/uploads', async (request,reply)=>procurementCommand(request,reply,'EVIDENCE_CAPTURE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['projectId']!=='string'||typeof b['authorityContextId']!=='string'||typeof b['evidenceClass']!=='string'||typeof b['intendedUse']!=='string'||typeof b['fileName']!=='string'||typeof b['mimeType']!=='string'||typeof b['contentBase64']!=='string') throw new Error('evidence upload request is invalid');
    return procurementWorkspaceService!.captureEvidence(context,b as unknown as CreateEvidenceUploadRequest);
  }));

  app.post('/procurement/requirements', async (request,reply)=>procurementCommand(request,reply,'REQUIREMENT_CREATE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['projectId']!=='string'||typeof b['authorityContextId']!=='string'||typeof b['sourceKind']!=='string'||typeof b['sourceReference']!=='string'||typeof b['description']!=='string'||typeof b['authorizedQuantity']!=='string'||typeof b['uomKey']!=='string') throw new Error('requirement request is invalid');
    return procurementWorkspaceService!.createRequirement(context,b as unknown as CreateAuthorizedRequirementRequest);
  }));

  app.post('/procurement/allocations', async (request,reply)=>procurementCommand(request,reply,'ALLOCATION_CREATE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['projectId']!=='string'||typeof b['authorizedRequirementSourceId']!=='string'||typeof b['quantity']!=='string'||typeof b['uomKey']!=='string'||typeof b['purpose']!=='string') throw new Error('allocation request is invalid');
    return procurementWorkspaceService!.allocateRequirement(context,b as unknown as CreateRequirementAllocationRequest);
  }));

  app.post('/procurement/packages', async (request,reply)=>procurementCommand(request,reply,'PACKAGE_CREATE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['projectId']!=='string'||typeof b['authorityContextId']!=='string'||typeof b['packageCode']!=='string'||typeof b['displayName']!=='string') throw new Error('package request is invalid');
    return procurementWorkspaceService!.createPackage(context,b as unknown as CreateProcurementPackageRequest);
  }));

  app.post('/procurement/suppliers', async (request,reply)=>procurementCommand(request,reply,'SUPPLIER_CREATE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['supplierName']!=='string'||typeof b['contactName']!=='string'||typeof b['emailAddress']!=='string'||typeof b['mailboxKind']!=='string') throw new Error('supplier request is invalid');
    return procurementWorkspaceService!.createSupplier(context,b as unknown as CreateSupplierRequest);
  }));

  app.post('/procurement/suppliers/:relationshipId/contacts', async (request,reply)=>procurementCommand(request,reply,'SUPPLIER_CONTACT_CREATE_REJECTED',async(context)=>{
    const p=request.params as {relationshipId?:unknown}; const b=bodyObject(request); if(typeof p.relationshipId!=='string'||!b||typeof b['contactName']!=='string'||typeof b['emailAddress']!=='string'||typeof b['mailboxKind']!=='string') throw new Error('supplier contact request is invalid');
    return procurementWorkspaceService!.addSupplierContact(context,{supplierRelationshipId:p.relationshipId,contactName:b['contactName'],emailAddress:b['emailAddress'],mailboxKind:b['mailboxKind']} as CreateSupplierContactRequest);
  }));

  app.post('/procurement/rfqs', async (request,reply)=>procurementCommand(request,reply,'RFQ_DRAFT_CREATE_REJECTED',async(context)=>{
    const b=bodyObject(request); if(!b||typeof b['projectId']!=='string'||typeof b['authorityContextId']!=='string'||typeof b['eventNumber']!=='string'||typeof b['title']!=='string'||typeof b['responseDueAt']!=='string'||!Array.isArray(b['responseFieldKeys'])||!Array.isArray(b['supplierContactIds'])) throw new Error('RFQ draft request is invalid');
    return procurementWorkspaceService!.createRfqDraft(context,b as unknown as CreateRfqDraftRequest);
  }));

  app.post('/procurement/rfqs/:eventId/issue', async (request,reply)=>procurementCommand(request,reply,'RFQ_ISSUE_REJECTED',async(context)=>{
    const p=request.params as {eventId?:unknown}; const b=bodyObject(request); if(typeof p.eventId!=='string'||!b||typeof b['projectId']!=='string'||typeof b['expectedDraftVersion']!=='string') throw new Error('RFQ issue request is invalid');
    return procurementWorkspaceService!.issueRfq(context,{projectId:b['projectId'],sourcingEventId:p.eventId,expectedDraftVersion:b['expectedDraftVersion']});
  }));

  app.post('/procurement/rfqs/:eventId/addenda', async (request,reply)=>procurementCommand(request,reply,'RFQ_ADDENDUM_REJECTED',async(context)=>{
    const p=request.params as {eventId?:unknown}; const b=bodyObject(request); if(typeof p.eventId!=='string'||!b||typeof b['projectId']!=='string'||typeof b['expectedIssuedVersion']!=='string'||typeof b['responseDueAt']!=='string'||typeof b['reason']!=='string') throw new Error('RFQ addendum request is invalid');
    return procurementWorkspaceService!.createRfqAddendum(context,{projectId:b['projectId'],sourcingEventId:p.eventId,expectedIssuedVersion:b['expectedIssuedVersion'],responseDueAt:b['responseDueAt'],reason:b['reason']});
  }));

  app.post('/procurement/grants/:grantId/revoke', async (request,reply)=>procurementCommand(request,reply,'GRANT_REVOKE_REJECTED',async(context)=>{
    const p=request.params as {grantId?:unknown}; const b=bodyObject(request); if(typeof p.grantId!=='string'||!b||typeof b['projectId']!=='string'||typeof b['reason']!=='string') throw new Error('grant revoke request is invalid');
    return procurementWorkspaceService!.revokeExternalTaskGrant(context,{projectId:b['projectId'],externalTaskGrantId:p.grantId,reason:b['reason']});
  },200));

  app.post('/procurement/grants/:grantId/transfer', async (request,reply)=>procurementCommand(request,reply,'GRANT_TRANSFER_REJECTED',async(context)=>{
    const p=request.params as {grantId?:unknown}; const b=bodyObject(request); if(typeof p.grantId!=='string'||!b||typeof b['projectId']!=='string'||typeof b['replacementSupplierContactId']!=='string'||typeof b['reason']!=='string') throw new Error('grant transfer request is invalid');
    return procurementWorkspaceService!.transferExternalTaskGrant(context,{projectId:b['projectId'],externalTaskGrantId:p.grantId,replacementSupplierContactId:b['replacementSupplierContactId'],reason:b['reason']});
  }));

  return app;
}
