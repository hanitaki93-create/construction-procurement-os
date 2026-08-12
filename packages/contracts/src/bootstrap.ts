export interface VerifiedAuthenticationIdentity {
  readonly id: string;
  readonly providerKey: string;
  readonly providerSubject: string;
  readonly verifiedAt: string;
}

export interface TenantBootstrapRequest {
  readonly authenticationIdentityId: string;
  readonly idempotencyKey: string;
  readonly requestedTenantName: string;
  readonly requestedInitialLegalEntityName?: string;
}

export type TenantBootstrapIntentState = 'PENDING' | 'ESTABLISHED' | 'REJECTED';

export interface TenantBootstrapIntent {
  readonly id: string;
  readonly authenticationIdentityId: string;
  readonly idempotencyKey: string;
  readonly requestedTenantName: string;
  readonly requestedInitialLegalEntityName?: string;
  readonly state: TenantBootstrapIntentState;
  readonly tenantId?: string;
  readonly ownerMembershipId?: string;
  readonly recordedAt: string;
  readonly establishedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionCode?: string;
}

export type TenantBootstrapDecision =
  | Readonly<{
      action: 'CREATE_INTENT';
      request: TenantBootstrapRequest;
    }>
  | Readonly<{
      action: 'RETURN_EXISTING';
      intent: TenantBootstrapIntent;
    }>;

function parseInstant(value: string, field: string): number {
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) throw new Error(`${field} must be an ISO-8601 instant`);
  return instant;
}

function normalizedOptional(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized === undefined || normalized.length === 0 ? undefined : normalized;
}

export function assertVerifiedIdentityForBootstrap(
  identity: VerifiedAuthenticationIdentity,
  asOf: string,
): void {
  if (!identity.id.trim()) throw new Error('authentication identity id is required');
  if (!identity.providerKey.trim()) throw new Error('authentication provider key is required');
  if (!identity.providerSubject.trim())
    throw new Error('authentication provider subject is required');

  const verifiedAt = parseInstant(identity.verifiedAt, 'verifiedAt');
  const target = parseInstant(asOf, 'asOf');
  if (verifiedAt > target) throw new Error('identity verification cannot be in the future');
}

export function decideTenantBootstrap(input: {
  readonly identity: VerifiedAuthenticationIdentity;
  readonly request: TenantBootstrapRequest;
  readonly existingIntents: readonly TenantBootstrapIntent[];
  readonly asOf: string;
}): TenantBootstrapDecision {
  assertVerifiedIdentityForBootstrap(input.identity, input.asOf);

  if (input.request.authenticationIdentityId !== input.identity.id) {
    throw new Error('bootstrap request identity does not match verified authentication identity');
  }
  if (!input.request.idempotencyKey.trim()) throw new Error('bootstrap idempotencyKey is required');
  if (!input.request.requestedTenantName.trim()) throw new Error('requestedTenantName is required');

  const matchingIntent = input.existingIntents.find(
    (intent) =>
      intent.authenticationIdentityId === input.request.authenticationIdentityId &&
      intent.idempotencyKey === input.request.idempotencyKey,
  );

  if (matchingIntent === undefined) {
    return { action: 'CREATE_INTENT', request: input.request };
  }

  const requestedLegalEntity = normalizedOptional(input.request.requestedInitialLegalEntityName);
  const existingLegalEntity = normalizedOptional(matchingIntent.requestedInitialLegalEntityName);

  if (
    matchingIntent.requestedTenantName.trim() !== input.request.requestedTenantName.trim() ||
    requestedLegalEntity !== existingLegalEntity
  ) {
    throw new Error('idempotency key was already used with a different bootstrap payload');
  }

  return { action: 'RETURN_EXISTING', intent: matchingIntent };
}

export function assertEstablishedBootstrap(intent: TenantBootstrapIntent): void {
  if (intent.state !== 'ESTABLISHED') {
    throw new Error('bootstrap intent is not established');
  }
  if (intent.tenantId === undefined || !intent.tenantId.trim()) {
    throw new Error('established bootstrap must bind a tenantId');
  }
  if (intent.ownerMembershipId === undefined || !intent.ownerMembershipId.trim()) {
    throw new Error('established bootstrap must bind an ownerMembershipId');
  }
  if (intent.establishedAt === undefined) {
    throw new Error('established bootstrap must record establishedAt');
  }
}
