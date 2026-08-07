export type SubscriptionLifecycleOccurrenceKind =
  | 'ACTIVATED'
  | 'SUSPENDED'
  | 'RESUMED'
  | 'CANCELLED'
  | 'EXPIRED';

export type SubscriptionLifecycleState =
  | 'INACTIVE'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';

export type EntitlementDefinitionKind = 'CAPABILITY' | 'METERED_LIMIT';

export interface EffectivePeriod {
  readonly effectiveFrom: string;
  readonly effectiveUntil?: string | null;
}

export interface TenantSubscription extends EffectivePeriod {
  readonly id: string;
  readonly tenantId: string;
  readonly productOfferingVersionId: string;
  readonly recordedAt: string;
}

export interface SubscriptionLifecycleOccurrence {
  readonly id: string;
  readonly tenantSubscriptionId: string;
  readonly kind: SubscriptionLifecycleOccurrenceKind;
  readonly effectiveAt: string;
  readonly recordedAt: string;
  readonly sequence: number;
  readonly reason?: string;
}

export interface EntitlementDefinitionVersion extends EffectivePeriod {
  readonly id: string;
  readonly key: string;
  readonly kind: EntitlementDefinitionKind;
  readonly usageMeasureKey?: string;
  readonly recordedAt: string;
}

export type ProductOfferingEntitlement =
  | Readonly<{
      definitionVersionId: string;
      definitionKey: string;
      kind: 'CAPABILITY';
      enabled: boolean;
    }>
  | Readonly<{
      definitionVersionId: string;
      definitionKey: string;
      kind: 'METERED_LIMIT';
      usageMeasureKey: string;
      limitQuantity: string;
    }>;

export interface ProductOfferingVersion extends EffectivePeriod {
  readonly id: string;
  readonly offeringKey: string;
  readonly version: number;
  readonly recordedAt: string;
  readonly entitlements: readonly ProductOfferingEntitlement[];
}

export interface UsageMeasureDefinitionVersion extends EffectivePeriod {
  readonly id: string;
  readonly key: string;
  readonly unit: string;
  readonly recordedAt: string;
}

export interface MeteredUsageOccurrence {
  readonly id: string;
  readonly tenantId: string;
  readonly tenantSubscriptionId: string;
  readonly usageMeasureDefinitionVersionId: string;
  readonly usageMeasureKey: string;
  readonly quantity: string;
  readonly occurredAt: string;
  readonly recordedAt: string;
  readonly correlationId: string;
  readonly adjustmentOfOccurrenceId?: string;
  readonly reason?: string;
}

export interface ResolvedEntitlementSnapshot {
  readonly tenantId: string;
  readonly tenantSubscriptionId: string;
  readonly productOfferingVersionId: string;
  readonly resolvedAt: string;
  readonly validAt: string;
  readonly entitlements: Readonly<Record<string, ProductOfferingEntitlement>>;
}

function parseInstant(value: string, field: string): number {
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) throw new Error(`${field} must be an ISO-8601 instant`);
  return instant;
}

export function isEffectiveAt(period: EffectivePeriod, at: string): boolean {
  const target = parseInstant(at, 'at');
  const from = parseInstant(period.effectiveFrom, 'effectiveFrom');
  const until =
    period.effectiveUntil === undefined || period.effectiveUntil === null
      ? undefined
      : parseInstant(period.effectiveUntil, 'effectiveUntil');

  if (until !== undefined && until <= from) {
    throw new Error('effectiveUntil must be later than effectiveFrom');
  }

  return target >= from && (until === undefined || target < until);
}

export function assertNoEffectivePeriodOverlap(
  subscriptions: readonly TenantSubscription[],
): void {
  const byTenant = new Map<string, TenantSubscription[]>();
  for (const subscription of subscriptions) {
    const existing = byTenant.get(subscription.tenantId) ?? [];
    existing.push(subscription);
    byTenant.set(subscription.tenantId, existing);
  }

  for (const tenantSubscriptions of byTenant.values()) {
    const ordered = [...tenantSubscriptions].sort(
      (left, right) =>
        parseInstant(left.effectiveFrom, 'effectiveFrom') -
        parseInstant(right.effectiveFrom, 'effectiveFrom'),
    );

    for (let index = 1; index < ordered.length; index += 1) {
      const previous = ordered[index - 1];
      const current = ordered[index];
      if (previous === undefined || current === undefined) continue;

      const previousUntil =
        previous.effectiveUntil === undefined || previous.effectiveUntil === null
          ? Number.POSITIVE_INFINITY
          : parseInstant(previous.effectiveUntil, 'effectiveUntil');
      const currentFrom = parseInstant(current.effectiveFrom, 'effectiveFrom');

      if (currentFrom < previousUntil) {
        throw new Error(`overlapping TenantSubscription effective periods for tenant ${current.tenantId}`);
      }
    }
  }
}

export function selectEffectiveSubscription(
  subscriptions: readonly TenantSubscription[],
  tenantId: string,
  at: string,
): TenantSubscription | undefined {
  const matches = subscriptions.filter(
    (subscription) => subscription.tenantId === tenantId && isEffectiveAt(subscription, at),
  );

  if (matches.length > 1) {
    throw new Error(`multiple effective TenantSubscription records for tenant ${tenantId}`);
  }

  return matches[0];
}

function lifecycleStateForKind(kind: SubscriptionLifecycleOccurrenceKind): SubscriptionLifecycleState {
  switch (kind) {
    case 'ACTIVATED':
    case 'RESUMED':
      return 'ACTIVE';
    case 'SUSPENDED':
      return 'SUSPENDED';
    case 'CANCELLED':
      return 'CANCELLED';
    case 'EXPIRED':
      return 'EXPIRED';
  }
}

export function deriveSubscriptionLifecycleState(
  occurrences: readonly SubscriptionLifecycleOccurrence[],
  tenantSubscriptionId: string,
  at: string,
): SubscriptionLifecycleState {
  const target = parseInstant(at, 'at');
  const applicable = occurrences
    .filter(
      (occurrence) =>
        occurrence.tenantSubscriptionId === tenantSubscriptionId &&
        parseInstant(occurrence.effectiveAt, 'effectiveAt') <= target,
    )
    .sort((left, right) => {
      const effectiveDifference =
        parseInstant(left.effectiveAt, 'effectiveAt') - parseInstant(right.effectiveAt, 'effectiveAt');
      if (effectiveDifference !== 0) return effectiveDifference;
      if (left.sequence !== right.sequence) return left.sequence - right.sequence;
      return left.id.localeCompare(right.id);
    });

  const latest = applicable.at(-1);
  return latest === undefined ? 'INACTIVE' : lifecycleStateForKind(latest.kind);
}

export function isCanonicalNonNegativeDecimal(value: string): boolean {
  return /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value);
}

export function validateProductOfferingVersion(offering: ProductOfferingVersion): void {
  if (!Number.isSafeInteger(offering.version) || offering.version <= 0) {
    throw new Error('ProductOfferingVersion.version must be a positive safe integer');
  }

  if (!offering.offeringKey.trim()) throw new Error('ProductOfferingVersion.offeringKey is required');

  const seenKeys = new Set<string>();
  for (const entitlement of offering.entitlements) {
    if (!entitlement.definitionKey.trim()) throw new Error('entitlement definitionKey is required');
    if (seenKeys.has(entitlement.definitionKey)) {
      throw new Error(`duplicate entitlement definitionKey: ${entitlement.definitionKey}`);
    }
    seenKeys.add(entitlement.definitionKey);

    if (entitlement.kind === 'METERED_LIMIT') {
      if (!entitlement.usageMeasureKey.trim()) throw new Error('usageMeasureKey is required');
      if (!isCanonicalNonNegativeDecimal(entitlement.limitQuantity)) {
        throw new Error('limitQuantity must be a canonical non-negative decimal string');
      }
    }
  }
}

export function resolveEntitlementSnapshot(input: {
  readonly tenantId: string;
  readonly subscription: TenantSubscription;
  readonly offering: ProductOfferingVersion;
  readonly resolvedAt: string;
  readonly validAt: string;
}): ResolvedEntitlementSnapshot {
  if (input.subscription.tenantId !== input.tenantId) {
    throw new Error('subscription tenant does not match requested tenant');
  }
  if (input.subscription.productOfferingVersionId !== input.offering.id) {
    throw new Error('subscription does not bind the supplied ProductOfferingVersion');
  }
  if (!isEffectiveAt(input.subscription, input.validAt)) {
    throw new Error('subscription is not effective at validAt');
  }
  if (!isEffectiveAt(input.offering, input.validAt)) {
    throw new Error('offering is not effective at validAt');
  }

  validateProductOfferingVersion(input.offering);

  const entitlements: Record<string, ProductOfferingEntitlement> = {};
  for (const entitlement of input.offering.entitlements) {
    entitlements[entitlement.definitionKey] = entitlement;
  }

  return {
    tenantId: input.tenantId,
    tenantSubscriptionId: input.subscription.id,
    productOfferingVersionId: input.offering.id,
    resolvedAt: input.resolvedAt,
    validAt: input.validAt,
    entitlements,
  };
}
