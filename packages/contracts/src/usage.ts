import {
  isCanonicalNonNegativeDecimal,
  type MeteredUsageOccurrence,
  type SubscriptionLifecycleState,
} from './platform.js';

export interface ExactUsageArithmetic {
  readonly zero: string;
  add(left: string, right: string): string;
  subtract(left: string, right: string): string;
  compare(left: string, right: string): -1 | 0 | 1;
}

export interface MeteredUsagePosition {
  readonly tenantId: string;
  readonly tenantSubscriptionId: string;
  readonly usageMeasureKey: string;
  readonly windowStart: string;
  readonly windowEnd: string;
  readonly asOf: string;
  readonly consumedQuantity: string;
  readonly limitQuantity: string;
  readonly remainingQuantity: string;
  readonly overageQuantity: string;
  readonly occurrenceIds: readonly string[];
}

export type SubscriptionCommercialAccessMode = 'FULL' | 'RESTRICTED_READ_EXPORT';

export interface SubscriptionCommercialAccessDisposition {
  readonly mode: SubscriptionCommercialAccessMode;
  readonly allowsNewEntitledCommands: boolean;
  readonly preservesAuthorizedRead: true;
  readonly preservesAuthorizedExport: true;
  readonly lifecycleState: SubscriptionLifecycleState;
}

/**
 * Commercial gating only. The preserved read/export flags do not grant access:
 * normal tenant/project/security/business authorization still applies.
 */
export function deriveSubscriptionCommercialAccessDisposition(
  lifecycleState: SubscriptionLifecycleState,
): SubscriptionCommercialAccessDisposition {
  const active = lifecycleState === 'ACTIVE';
  return {
    mode: active ? 'FULL' : 'RESTRICTED_READ_EXPORT',
    allowsNewEntitledCommands: active,
    preservesAuthorizedRead: true,
    preservesAuthorizedExport: true,
    lifecycleState,
  };
}

function parseInstant(value: string, field: string): number {
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) throw new Error(`${field} must be an ISO-8601 instant`);
  return instant;
}

export function deriveMeteredUsagePosition(input: {
  readonly tenantId: string;
  readonly tenantSubscriptionId: string;
  readonly usageMeasureKey: string;
  readonly limitQuantity: string;
  readonly windowStart: string;
  readonly windowEnd: string;
  readonly asOf: string;
  readonly occurrences: readonly MeteredUsageOccurrence[];
  readonly arithmetic: ExactUsageArithmetic;
}): MeteredUsagePosition {
  if (!isCanonicalNonNegativeDecimal(input.limitQuantity)) {
    throw new Error('limitQuantity must be a canonical non-negative decimal string');
  }

  const windowStart = parseInstant(input.windowStart, 'windowStart');
  const windowEnd = parseInstant(input.windowEnd, 'windowEnd');
  const asOf = parseInstant(input.asOf, 'asOf');
  if (windowEnd <= windowStart) throw new Error('windowEnd must be later than windowStart');

  const selected = input.occurrences
    .filter((occurrence) => {
      if (occurrence.tenantId !== input.tenantId) return false;
      if (occurrence.tenantSubscriptionId !== input.tenantSubscriptionId) return false;
      if (occurrence.usageMeasureKey !== input.usageMeasureKey) return false;
      const occurredAt = parseInstant(occurrence.occurredAt, 'occurredAt');
      return occurredAt >= windowStart && occurredAt < windowEnd && occurredAt <= asOf;
    })
    .sort((left, right) => {
      const occurredDifference =
        parseInstant(left.occurredAt, 'occurredAt') - parseInstant(right.occurredAt, 'occurredAt');
      if (occurredDifference !== 0) return occurredDifference;
      const recordedDifference =
        parseInstant(left.recordedAt, 'recordedAt') - parseInstant(right.recordedAt, 'recordedAt');
      if (recordedDifference !== 0) return recordedDifference;
      return left.id.localeCompare(right.id);
    });

  const seenCorrelationIds = new Set<string>();
  let consumed = input.arithmetic.zero;
  const occurrenceIds: string[] = [];

  for (const occurrence of selected) {
    if (!isCanonicalNonNegativeDecimal(occurrence.quantity)) {
      throw new Error(`usage occurrence ${occurrence.id} has a non-canonical quantity`);
    }
    if (!occurrence.correlationId.trim()) {
      throw new Error(`usage occurrence ${occurrence.id} is missing correlationId`);
    }
    if (seenCorrelationIds.has(occurrence.correlationId)) {
      throw new Error(`duplicate usage correlationId: ${occurrence.correlationId}`);
    }
    seenCorrelationIds.add(occurrence.correlationId);

    consumed =
      occurrence.effect === 'CONSUME'
        ? input.arithmetic.add(consumed, occurrence.quantity)
        : input.arithmetic.subtract(consumed, occurrence.quantity);

    if (input.arithmetic.compare(consumed, input.arithmetic.zero) < 0) {
      throw new Error(`usage credit ${occurrence.id} would make consumed quantity negative`);
    }
    occurrenceIds.push(occurrence.id);
  }

  const comparedToLimit = input.arithmetic.compare(consumed, input.limitQuantity);
  const remaining =
    comparedToLimit <= 0
      ? input.arithmetic.subtract(input.limitQuantity, consumed)
      : input.arithmetic.zero;
  const overage =
    comparedToLimit > 0
      ? input.arithmetic.subtract(consumed, input.limitQuantity)
      : input.arithmetic.zero;

  return {
    tenantId: input.tenantId,
    tenantSubscriptionId: input.tenantSubscriptionId,
    usageMeasureKey: input.usageMeasureKey,
    windowStart: input.windowStart,
    windowEnd: input.windowEnd,
    asOf: input.asOf,
    consumedQuantity: consumed,
    limitQuantity: input.limitQuantity,
    remainingQuantity: remaining,
    overageQuantity: overage,
    occurrenceIds,
  };
}
