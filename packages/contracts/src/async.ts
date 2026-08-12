export const effectPositions = [
  'PRE_ACCEPTANCE',
  'ACCEPTED_PRE_EFFECT',
  'EFFECT_INDETERMINATE',
  'EXTERNAL_EFFECT_EMITTED',
  'DOMAIN_EFFECT_ESTABLISHED',
  'TERMINAL_NO_EFFECT',
  'PARTIAL_EFFECT',
] as const;

export type EffectPosition = (typeof effectPositions)[number];

export const workerLanes = [
  'interactive-nearline',
  'routine-domain',
  'evidence',
  'connector-email',
  'reconciliation',
  'report-export',
  'search',
] as const;

export type WorkerLane = (typeof workerLanes)[number];

export type OperationalJobStatus =
  | 'QUEUED'
  | 'RUNNING'
  | 'WAITING'
  | 'PAUSED'
  | 'CANCEL_REQUESTED'
  | 'COMPLETED'
  | 'DEAD_LETTER'
  | 'QUARANTINED'
  | 'RECONCILIATION_REQUIRED';

export type RetryClassification =
  | 'SAFE_RETRY_SAME_IDENTITY'
  | 'RETRY_AFTER_REAUTHORIZATION'
  | 'RETRY_AFTER_DEPENDENCY_RECOVERY'
  | 'RETRY_AFTER_RECONCILIATION'
  | 'NO_RETRY_REQUIRES_INPUT_CHANGE'
  | 'NO_RETRY_TERMINAL'
  | 'UNKNOWN_QUARANTINE';

export interface EffectPositionOccurrenceV1 {
  readonly asyncOperationId: string;
  readonly itemKey?: string;
  readonly sequence: string;
  readonly effectPosition: EffectPosition;
  readonly evidenceBasis: string;
  readonly occurredAt: string;
  readonly recordedAt: string;
}

export interface AsyncOperationStatusV1 {
  readonly tenantId: string;
  readonly asyncOperationId: string;
  readonly operationKey: string;
  readonly operationVersion: number;
  readonly logicalCommandId: string;
  readonly inputSemanticVersion: string;
  readonly effectPosition: EffectPosition;
  readonly jobId?: string;
  readonly lane?: WorkerLane;
  readonly operationalStatus?: OperationalJobStatus;
  readonly attemptCount?: number;
  readonly maxAttempts?: number;
  readonly resultKind?:
    | 'COMPLETED'
    | 'DUPLICATE_COMPLETED'
    | 'REJECTED'
    | 'CONFLICT'
    | 'UNRESOLVED_DEPENDENCY'
    | 'QUARANTINED'
    | 'TERMINAL_FAILURE'
    | 'PARTIAL';
}

export interface PublicationIntentV1 {
  readonly publicationIntentId: string;
  readonly sourceDomainEventId: string;
  readonly publicationIdentity: string;
  readonly mappingVersion: string;
  readonly integrationEventSemanticVersion: string;
  readonly disclosureProfileVersion: string;
  readonly targetBasisFingerprint: string;
  readonly payloadContentIdentity: string;
  readonly retryPolicyVersion: string;
}

export function effectPositionRequiresReconciliation(position: EffectPosition): boolean {
  return position === 'EFFECT_INDETERMINATE';
}

export function effectPositionAllowsOrdinaryRetry(position: EffectPosition): boolean {
  return position === 'ACCEPTED_PRE_EFFECT';
}

export function isTerminalHomogeneousEffectPosition(position: EffectPosition): boolean {
  return position === 'DOMAIN_EFFECT_ESTABLISHED' || position === 'TERMINAL_NO_EFFECT';
}
