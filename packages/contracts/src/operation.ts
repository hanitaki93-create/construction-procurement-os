import type { ResolvedEntitlementSnapshot } from './platform.js';

export type OperationClass = 'QUERY' | 'PROPOSAL' | 'COMMAND' | 'ASYNC_OPERATION';

export interface OperationExecutionContext {
  readonly tenantId: string;
  readonly principalId: string;
  readonly representedPrincipalId?: string;
  readonly projectId?: string;
  readonly contractingAuthorityContextId?: string;
}

export interface RegisteredOperationDefinition {
  readonly key: string;
  readonly version: number;
  readonly operationClass: OperationClass;
  readonly requiredEntitlementKey?: string;
  readonly requiresCurrentEntitlement: boolean;
  readonly requiresIdempotencyKey: boolean;
  readonly recordedAt: string;
}

interface OperationEnvelopeBase {
  readonly invocationId: string;
  readonly operationKey: string;
  readonly operationVersion: number;
  readonly context: OperationExecutionContext;
  readonly requestedAt: string;
}

export interface QueryOperationEnvelope extends OperationEnvelopeBase {
  readonly operationClass: 'QUERY';
}

export interface ProposalOperationEnvelope extends OperationEnvelopeBase {
  readonly operationClass: 'PROPOSAL';
}

export interface CommandOperationEnvelope extends OperationEnvelopeBase {
  readonly operationClass: 'COMMAND';
  readonly idempotencyKey: string;
  readonly expectedVersion?: string;
  readonly previewDigest?: string;
  readonly confirmationDigest?: string;
}

export interface AsyncOperationEnvelope extends OperationEnvelopeBase {
  readonly operationClass: 'ASYNC_OPERATION';
  readonly idempotencyKey: string;
  readonly continuationToken?: string;
}

export type OperationEnvelope =
  | QueryOperationEnvelope
  | ProposalOperationEnvelope
  | CommandOperationEnvelope
  | AsyncOperationEnvelope;

export type EntitlementPreconditionResult =
  | Readonly<{ state: 'NOT_REQUIRED' }>
  | Readonly<{ state: 'SATISFIED'; entitlementKey: string }>
  | Readonly<{ state: 'BLOCKED_NOT_ENTITLED'; entitlementKey: string }>
  | Readonly<{
      state: 'REQUIRES_USAGE_EVALUATION';
      entitlementKey: string;
      usageMeasureKey: string;
    }>;

function requireNonBlank(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} is required`);
}

function requirePositiveVersion(value: number, field: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${field} must be a positive safe integer`);
  }
}

export function validateRegisteredOperationDefinition(
  definition: RegisteredOperationDefinition,
): void {
  requireNonBlank(definition.key, 'operation key');
  requirePositiveVersion(definition.version, 'operation version');

  if (
    (definition.operationClass === 'COMMAND' || definition.operationClass === 'ASYNC_OPERATION') &&
    !definition.requiresIdempotencyKey
  ) {
    throw new Error(`${definition.operationClass} operations must require an idempotency key`);
  }

  if (definition.requiresCurrentEntitlement && definition.requiredEntitlementKey === undefined) {
    throw new Error('requiresCurrentEntitlement requires requiredEntitlementKey');
  }
}

export function validateOperationEnvelope(
  definition: RegisteredOperationDefinition,
  envelope: OperationEnvelope,
): void {
  validateRegisteredOperationDefinition(definition);
  requireNonBlank(envelope.invocationId, 'invocationId');
  requireNonBlank(envelope.operationKey, 'operationKey');
  requirePositiveVersion(envelope.operationVersion, 'operationVersion');
  requireNonBlank(envelope.context.tenantId, 'context.tenantId');
  requireNonBlank(envelope.context.principalId, 'context.principalId');

  if (
    definition.key !== envelope.operationKey ||
    definition.version !== envelope.operationVersion
  ) {
    throw new Error('operation envelope does not match the registered operation version');
  }
  if (definition.operationClass !== envelope.operationClass) {
    throw new Error('operation envelope class does not match the registered operation class');
  }

  if (envelope.operationClass === 'COMMAND' || envelope.operationClass === 'ASYNC_OPERATION') {
    requireNonBlank(envelope.idempotencyKey, 'idempotencyKey');
  }
}

export function evaluateEntitlementPrecondition(
  definition: RegisteredOperationDefinition,
  snapshot: ResolvedEntitlementSnapshot | undefined,
): EntitlementPreconditionResult {
  if (!definition.requiresCurrentEntitlement) return { state: 'NOT_REQUIRED' };

  const entitlementKey = definition.requiredEntitlementKey;
  if (entitlementKey === undefined) {
    throw new Error('registered operation is missing requiredEntitlementKey');
  }

  const entitlement = snapshot?.entitlements[entitlementKey];
  if (entitlement === undefined) return { state: 'BLOCKED_NOT_ENTITLED', entitlementKey };

  if (entitlement.kind === 'CAPABILITY') {
    return entitlement.enabled
      ? { state: 'SATISFIED', entitlementKey }
      : { state: 'BLOCKED_NOT_ENTITLED', entitlementKey };
  }

  return {
    state: 'REQUIRES_USAGE_EVALUATION',
    entitlementKey,
    usageMeasureKey: entitlement.usageMeasureKey,
  };
}

export function entitlementPreconditionAllowsCapabilityAvailability(
  result: EntitlementPreconditionResult,
): boolean {
  return result.state === 'NOT_REQUIRED' || result.state === 'SATISFIED';
}
