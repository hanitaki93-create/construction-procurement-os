export type SubscriptionLifecycleOccurrenceKind =
  'ACTIVATED' | 'SUSPENDED' | 'RESUMED' | 'CANCELLED' | 'EXPIRED';

export type SubscriptionLifecycleState =
  'INACTIVE' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';

export type SubscriptionCommercialChannel = 'SELF_SERVICE' | 'MANUAL_ENTERPRISE';
export type EntitlementDefinitionKind = 'CAPABILITY' | 'METERED_LIMIT';
export type MeteredLimitMode = 'FINITE' | 'UNBOUNDED';
export type MeteredUsageEffect = 'CONSUME' | 'CREDIT';

export interface EffectivePeriod {
  readonly effectiveFrom: string;
  readonly effectiveUntil?: string | null;
}

export interface TenantSubscription {
  readonly id: string;
  readonly tenantId: string;
  readonly commercialChannel: SubscriptionCommercialChannel;
  readonly externalAgreementRef?: string;
  readonly commercialEvidenceRef?: string;
  readonly recordedAt: string;
}

export interface TenantSubscriptionItem {
  readonly id: string;
  readonly tenantSubscriptionId: string;
  readonly tenantId: string;
  readonly itemSlotKey: string;
  readonly recordedAt: string;
}

export interface TenantSubscriptionItemVersion extends EffectivePeriod {
  readonly id: string;
  readonly tenantSubscriptionItemId: string;
  readonly tenantId: string;
  readonly itemSlotKey: string;
  readonly version: number;
  readonly productOfferingVersionId: string;
  readonly recordedAt: string;
  readonly supersededAt?: string | null;
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
  readonly aggregation: 'ANY' | 'ADDITIVE_LIMIT';
  readonly usageMeasureDefinitionVersionId?: string;
  readonly usageMeasureKey?: string;
  readonly recordedAt: string;
}

export type ProductOfferingEntitlement =
  | Readonly<{
      definitionVersionId: string;
      definitionKey: string;
      kind: 'CAPABILITY';
      enabled: true;
    }>
  | Readonly<{
      definitionVersionId: string;
      definitionKey: string;
      kind: 'METERED_LIMIT';
      usageMeasureDefinitionVersionId: string;
      usageMeasureKey: string;
      limitMode: 'FINITE';
      limitQuantity: string;
    }>
  | Readonly<{
      definitionVersionId: string;
      definitionKey: string;
      kind: 'METERED_LIMIT';
      usageMeasureDefinitionVersionId: string;
      usageMeasureKey: string;
      limitMode: 'UNBOUNDED';
    }>;

export interface ProductOfferingVersion {
  readonly id: string;
  readonly offeringKey: string;
  readonly version: number;
  readonly availableFrom: string;
  readonly availableUntil?: string | null;
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
  readonly effect: MeteredUsageEffect;
  readonly quantity: string;
  readonly occurredAt: string;
  readonly recordedAt: string;
  readonly correlationId: string;
  readonly adjustmentOfOccurrenceId?: string;
  readonly reason?: string;
}

export interface EntitlementSourceBinding {
  readonly tenantSubscriptionId: string;
  readonly tenantSubscriptionItemId: string;
  readonly tenantSubscriptionItemVersionId: string;
  readonly productOfferingVersionId: string;
  readonly entitlementDefinitionVersionId: string;
}

export type ResolvedEntitlement =
  | Readonly<{
      definitionKey: string;
      kind: 'CAPABILITY';
      enabled: true;
      sources: readonly EntitlementSourceBinding[];
    }>
  | Readonly<{
      definitionKey: string;
      kind: 'METERED_LIMIT';
      usageMeasureKey: string;
      limitMode: 'FINITE';
      limitQuantity: string;
      sources: readonly EntitlementSourceBinding[];
    }>
  | Readonly<{
      definitionKey: string;
      kind: 'METERED_LIMIT';
      usageMeasureKey: string;
      limitMode: 'UNBOUNDED';
      sources: readonly EntitlementSourceBinding[];
    }>;

export interface ResolvedEntitlementSnapshot {
  readonly tenantId: string;
  readonly resolvedAt: string;
  readonly validAt: string;
  readonly entitlementAuthorityGuardVersion: number;
  readonly subscriptionIds: readonly string[];
  readonly subscriptionItemIds: readonly string[];
  readonly subscriptionItemVersionIds: readonly string[];
  readonly productOfferingVersionIds: readonly string[];
  readonly entitlements: Readonly<Record<string, ResolvedEntitlement>>;
}

export interface ExactEntitlementArithmetic {
  readonly zero: string;
  add(left: string, right: string): string;
}

function parseInstant(value: string, field: string): number {
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) throw new Error(`${field} must be an ISO-8601 instant`);
  return instant;
}

function assertEffectivePeriod(period: EffectivePeriod): void {
  const from = parseInstant(period.effectiveFrom, 'effectiveFrom');
  if (period.effectiveUntil === undefined || period.effectiveUntil === null) return;
  const until = parseInstant(period.effectiveUntil, 'effectiveUntil');
  if (until <= from) throw new Error('effectiveUntil must be later than effectiveFrom');
}

export function isEffectiveAt(period: EffectivePeriod, at: string): boolean {
  assertEffectivePeriod(period);
  const target = parseInstant(at, 'at');
  const from = parseInstant(period.effectiveFrom, 'effectiveFrom');
  const until =
    period.effectiveUntil === undefined || period.effectiveUntil === null
      ? undefined
      : parseInstant(period.effectiveUntil, 'effectiveUntil');

  return target >= from && (until === undefined || target < until);
}

export function isOfferingAvailableAt(offering: ProductOfferingVersion, at: string): boolean {
  const period: EffectivePeriod =
    offering.availableUntil === undefined
      ? { effectiveFrom: offering.availableFrom }
      : { effectiveFrom: offering.availableFrom, effectiveUntil: offering.availableUntil };
  return isEffectiveAt(period, at);
}

function isVersionKnownAt(version: TenantSubscriptionItemVersion, knownAt: string): boolean {
  const target = parseInstant(knownAt, 'knownAt');
  const recorded = parseInstant(version.recordedAt, 'recordedAt');
  if (recorded > target) return false;
  if (version.supersededAt === undefined || version.supersededAt === null) return true;
  return parseInstant(version.supersededAt, 'supersededAt') > target;
}

export function assertNoSubscriptionItemVersionOverlap(
  versions: readonly TenantSubscriptionItemVersion[],
): void {
  const grouped = new Map<string, TenantSubscriptionItemVersion[]>();
  for (const version of versions) {
    assertEffectivePeriod(version);
    const key = `${version.tenantId}\u0000${version.itemSlotKey}`;
    const existing = grouped.get(key) ?? [];
    existing.push(version);
    grouped.set(key, existing);
  }

  for (const slotVersions of grouped.values()) {
    const ordered = [...slotVersions].sort(
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
        throw new Error(
          `overlapping current TenantSubscriptionItemVersion periods for tenant ${current.tenantId} slot ${current.itemSlotKey}`,
        );
      }
    }
  }
}

export function selectSubscriptionItemVersions(input: {
  readonly versions: readonly TenantSubscriptionItemVersion[];
  readonly tenantId: string;
  readonly validAt: string;
  readonly knownAt: string;
}): readonly TenantSubscriptionItemVersion[] {
  const selected = input.versions.filter(
    (version) =>
      version.tenantId === input.tenantId &&
      isVersionKnownAt(version, input.knownAt) &&
      isEffectiveAt(version, input.validAt),
  );
  assertNoSubscriptionItemVersionOverlap(selected);
  return selected;
}

function lifecycleStateForKind(
  kind: SubscriptionLifecycleOccurrenceKind,
): SubscriptionLifecycleState {
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
  knownAt = at,
): SubscriptionLifecycleState {
  const target = parseInstant(at, 'at');
  const knowledgeTarget = parseInstant(knownAt, 'knownAt');
  const applicable = occurrences
    .filter(
      (occurrence) =>
        occurrence.tenantSubscriptionId === tenantSubscriptionId &&
        parseInstant(occurrence.effectiveAt, 'effectiveAt') <= target &&
        parseInstant(occurrence.recordedAt, 'recordedAt') <= knowledgeTarget,
    )
    .sort((left, right) => {
      const effectiveDifference =
        parseInstant(left.effectiveAt, 'effectiveAt') -
        parseInstant(right.effectiveAt, 'effectiveAt');
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
  if (!offering.offeringKey.trim())
    throw new Error('ProductOfferingVersion.offeringKey is required');
  const availabilityPeriod: EffectivePeriod =
    offering.availableUntil === undefined
      ? { effectiveFrom: offering.availableFrom }
      : { effectiveFrom: offering.availableFrom, effectiveUntil: offering.availableUntil };
  assertEffectivePeriod(availabilityPeriod);

  const seenKeys = new Set<string>();
  for (const entitlement of offering.entitlements) {
    if (!entitlement.definitionKey.trim()) throw new Error('entitlement definitionKey is required');
    if (seenKeys.has(entitlement.definitionKey)) {
      throw new Error(`duplicate entitlement definitionKey: ${entitlement.definitionKey}`);
    }
    seenKeys.add(entitlement.definitionKey);

    if (entitlement.kind === 'METERED_LIMIT') {
      if (!entitlement.usageMeasureKey.trim()) throw new Error('usageMeasureKey is required');
      if (!entitlement.usageMeasureDefinitionVersionId.trim()) {
        throw new Error('usageMeasureDefinitionVersionId is required');
      }
      if (
        entitlement.limitMode === 'FINITE' &&
        !isCanonicalNonNegativeDecimal(entitlement.limitQuantity)
      ) {
        throw new Error('limitQuantity must be a canonical non-negative decimal string');
      }
    }
  }
}

export function validateSubscriptionItemVersionAssignment(input: {
  readonly subscription: TenantSubscription;
  readonly item: TenantSubscriptionItem;
  readonly itemVersion: TenantSubscriptionItemVersion;
  readonly offering: ProductOfferingVersion;
}): void {
  if (input.subscription.tenantId !== input.item.tenantId) {
    throw new Error('subscription item tenant does not match subscription tenant');
  }
  if (input.subscription.id !== input.item.tenantSubscriptionId) {
    throw new Error('subscription item does not belong to supplied subscription');
  }
  if (input.item.id !== input.itemVersion.tenantSubscriptionItemId) {
    throw new Error('subscription item version does not belong to supplied item');
  }
  if (input.item.tenantId !== input.itemVersion.tenantId) {
    throw new Error('subscription item version tenant does not match item tenant');
  }
  if (input.item.itemSlotKey !== input.itemVersion.itemSlotKey) {
    throw new Error('subscription item version slot does not match item slot');
  }
  if (input.itemVersion.productOfferingVersionId !== input.offering.id) {
    throw new Error('subscription item version does not bind supplied offering version');
  }
  if (!Number.isSafeInteger(input.itemVersion.version) || input.itemVersion.version <= 0) {
    throw new Error('TenantSubscriptionItemVersion.version must be a positive safe integer');
  }
  if (!isOfferingAvailableAt(input.offering, input.itemVersion.effectiveFrom)) {
    throw new Error('offering version is not available at subscription item version start');
  }
  validateProductOfferingVersion(input.offering);
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function sourceBinding(input: {
  readonly subscription: TenantSubscription;
  readonly item: TenantSubscriptionItem;
  readonly itemVersion: TenantSubscriptionItemVersion;
  readonly offering: ProductOfferingVersion;
  readonly entitlement: ProductOfferingEntitlement;
}): EntitlementSourceBinding {
  return {
    tenantSubscriptionId: input.subscription.id,
    tenantSubscriptionItemId: input.item.id,
    tenantSubscriptionItemVersionId: input.itemVersion.id,
    productOfferingVersionId: input.offering.id,
    entitlementDefinitionVersionId: input.entitlement.definitionVersionId,
  };
}

export function resolveEntitlementSnapshot(input: {
  readonly tenantId: string;
  readonly subscriptions: readonly TenantSubscription[];
  readonly subscriptionItems: readonly TenantSubscriptionItem[];
  readonly subscriptionItemVersions: readonly TenantSubscriptionItemVersion[];
  readonly offerings: readonly ProductOfferingVersion[];
  readonly lifecycleOccurrences: readonly SubscriptionLifecycleOccurrence[];
  readonly entitlementAuthorityGuardVersion: number;
  readonly resolvedAt: string;
  readonly validAt: string;
  readonly arithmetic: ExactEntitlementArithmetic;
}): ResolvedEntitlementSnapshot {
  if (
    !Number.isSafeInteger(input.entitlementAuthorityGuardVersion) ||
    input.entitlementAuthorityGuardVersion <= 0
  ) {
    throw new Error('entitlementAuthorityGuardVersion must be a positive safe integer');
  }

  const subscriptions = new Map(
    input.subscriptions
      .filter((subscription) => subscription.tenantId === input.tenantId)
      .map((subscription) => [subscription.id, subscription] as const),
  );
  const items = new Map(
    input.subscriptionItems
      .filter((item) => item.tenantId === input.tenantId)
      .map((item) => [item.id, item] as const),
  );
  const offerings = new Map(input.offerings.map((offering) => [offering.id, offering] as const));
  const effectiveVersions = selectSubscriptionItemVersions({
    versions: input.subscriptionItemVersions,
    tenantId: input.tenantId,
    validAt: input.validAt,
    knownAt: input.resolvedAt,
  });

  const activeSources: Array<{
    subscription: TenantSubscription;
    item: TenantSubscriptionItem;
    itemVersion: TenantSubscriptionItemVersion;
    offering: ProductOfferingVersion;
  }> = [];

  for (const itemVersion of effectiveVersions) {
    const item = items.get(itemVersion.tenantSubscriptionItemId);
    if (item === undefined) {
      throw new Error(`missing subscription item ${itemVersion.tenantSubscriptionItemId}`);
    }
    const subscription = subscriptions.get(item.tenantSubscriptionId);
    if (subscription === undefined) {
      throw new Error(`missing subscription ${item.tenantSubscriptionId}`);
    }
    if (
      deriveSubscriptionLifecycleState(
        input.lifecycleOccurrences,
        subscription.id,
        input.validAt,
        input.resolvedAt,
      ) !== 'ACTIVE'
    ) {
      continue;
    }
    const offering = offerings.get(itemVersion.productOfferingVersionId);
    if (offering === undefined) {
      throw new Error(`missing offering ${itemVersion.productOfferingVersionId}`);
    }
    validateProductOfferingVersion(offering);
    activeSources.push({ subscription, item, itemVersion, offering });
  }

  const entitlements: Record<string, ResolvedEntitlement> = {};
  for (const source of activeSources) {
    for (const grant of source.offering.entitlements) {
      const binding = sourceBinding({ ...source, entitlement: grant });
      const existing = entitlements[grant.definitionKey];

      if (grant.kind === 'CAPABILITY') {
        if (existing !== undefined && existing.kind !== 'CAPABILITY') {
          throw new Error(`entitlement kind conflict for ${grant.definitionKey}`);
        }
        const sources = existing === undefined ? [binding] : [...existing.sources, binding];
        entitlements[grant.definitionKey] = {
          definitionKey: grant.definitionKey,
          kind: 'CAPABILITY',
          enabled: true,
          sources,
        };
        continue;
      }

      if (existing !== undefined && existing.kind !== 'METERED_LIMIT') {
        throw new Error(`entitlement kind conflict for ${grant.definitionKey}`);
      }
      if (
        existing !== undefined &&
        existing.kind === 'METERED_LIMIT' &&
        existing.usageMeasureKey !== grant.usageMeasureKey
      ) {
        throw new Error(`usage measure conflict for ${grant.definitionKey}`);
      }

      const sources = existing === undefined ? [binding] : [...existing.sources, binding];
      if (
        grant.limitMode === 'UNBOUNDED' ||
        (existing !== undefined &&
          existing.kind === 'METERED_LIMIT' &&
          existing.limitMode === 'UNBOUNDED')
      ) {
        entitlements[grant.definitionKey] = {
          definitionKey: grant.definitionKey,
          kind: 'METERED_LIMIT',
          usageMeasureKey: grant.usageMeasureKey,
          limitMode: 'UNBOUNDED',
          sources,
        };
        continue;
      }

      const existingQuantity =
        existing === undefined || existing.kind !== 'METERED_LIMIT'
          ? input.arithmetic.zero
          : existing.limitQuantity;
      const limitQuantity = input.arithmetic.add(existingQuantity, grant.limitQuantity);
      if (!isCanonicalNonNegativeDecimal(limitQuantity)) {
        throw new Error('entitlement arithmetic returned a non-canonical quantity');
      }
      entitlements[grant.definitionKey] = {
        definitionKey: grant.definitionKey,
        kind: 'METERED_LIMIT',
        usageMeasureKey: grant.usageMeasureKey,
        limitMode: 'FINITE',
        limitQuantity,
        sources,
      };
    }
  }

  return {
    tenantId: input.tenantId,
    resolvedAt: input.resolvedAt,
    validAt: input.validAt,
    entitlementAuthorityGuardVersion: input.entitlementAuthorityGuardVersion,
    subscriptionIds: sortedUnique(activeSources.map((source) => source.subscription.id)),
    subscriptionItemIds: sortedUnique(activeSources.map((source) => source.item.id)),
    subscriptionItemVersionIds: sortedUnique(activeSources.map((source) => source.itemVersion.id)),
    productOfferingVersionIds: sortedUnique(activeSources.map((source) => source.offering.id)),
    entitlements,
  };
}
