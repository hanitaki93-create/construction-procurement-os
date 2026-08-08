import { describe, expect, it } from 'vitest';

import {
  assertNoSubscriptionItemOverlap,
  deriveSubscriptionLifecycleState,
  isCanonicalNonNegativeDecimal,
  isEffectiveAt,
  isOfferingAvailableAt,
  resolveEntitlementSnapshot,
  selectEffectiveSubscriptionItems,
  validateProductOfferingVersion,
  validateSubscriptionItemAssignment,
  type ExactEntitlementArithmetic,
  type ProductOfferingVersion,
  type SubscriptionLifecycleOccurrence,
  type TenantSubscription,
  type TenantSubscriptionItem,
} from './platform.js';

const arithmetic: ExactEntitlementArithmetic = {
  zero: '0',
  add: (left, right) => (BigInt(left) + BigInt(right)).toString(),
};

const subscription: TenantSubscription = {
  id: 'sub-1',
  tenantId: 'tenant-1',
  commercialChannel: 'SELF_SERVICE',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const baseItem: TenantSubscriptionItem = {
  id: 'item-base-1',
  tenantSubscriptionId: 'sub-1',
  tenantId: 'tenant-1',
  itemSlotKey: 'BASE',
  productOfferingVersionId: 'offering-base-v1',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
  version: 1,
};

const addonItem: TenantSubscriptionItem = {
  id: 'item-ai-1',
  tenantSubscriptionId: 'sub-1',
  tenantId: 'tenant-1',
  itemSlotKey: 'AI_ADDON',
  productOfferingVersionId: 'offering-ai-v1',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
  version: 1,
};

const baseOffering: ProductOfferingVersion = {
  id: 'offering-base-v1',
  offeringKey: 'BASE_PUBLIC',
  version: 1,
  availableFrom: '2026-07-01T00:00:00.000Z',
  availableUntil: '2026-08-15T00:00:00.000Z',
  recordedAt: '2026-07-01T00:00:00.000Z',
  entitlements: [
    {
      definitionVersionId: 'ent-rfq-v1',
      definitionKey: 'sourcing.rfq.issue',
      kind: 'CAPABILITY',
      enabled: true,
    },
    {
      definitionVersionId: 'ent-ai-v1',
      definitionKey: 'ai.quote_extraction',
      kind: 'METERED_LIMIT',
      usageMeasureDefinitionVersionId: 'usage-ai-v1',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitMode: 'FINITE',
      limitQuantity: '20',
    },
  ],
};

const addonOffering: ProductOfferingVersion = {
  id: 'offering-ai-v1',
  offeringKey: 'AI_ALLOWANCE_ADDON',
  version: 1,
  availableFrom: '2026-07-01T00:00:00.000Z',
  recordedAt: '2026-07-01T00:00:00.000Z',
  entitlements: [
    {
      definitionVersionId: 'ent-ai-v1',
      definitionKey: 'ai.quote_extraction',
      kind: 'METERED_LIMIT',
      usageMeasureDefinitionVersionId: 'usage-ai-v1',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitMode: 'FINITE',
      limitQuantity: '10',
    },
  ],
};

const lifecycle: SubscriptionLifecycleOccurrence[] = [
  {
    id: 'occ-1',
    tenantSubscriptionId: 'sub-1',
    kind: 'ACTIVATED',
    effectiveAt: '2026-08-01T00:00:00.000Z',
    recordedAt: '2026-08-01T00:00:00.000Z',
    sequence: 1,
  },
];

describe('platform subscription contracts', () => {
  it('uses half-open effective periods', () => {
    expect(isEffectiveAt(baseItem, '2026-08-01T00:00:00.000Z')).toBe(true);
    expect(isEffectiveAt(baseItem, '2026-08-31T23:59:59.999Z')).toBe(true);
    expect(isEffectiveAt(baseItem, '2026-09-01T00:00:00.000Z')).toBe(false);
  });

  it('rejects overlapping authority inside one tenant and item slot', () => {
    expect(() =>
      assertNoSubscriptionItemOverlap([
        baseItem,
        {
          ...baseItem,
          id: 'item-base-2',
          effectiveFrom: '2026-08-20T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
        },
      ]),
    ).toThrow(/overlapping TenantSubscriptionItem/);
  });

  it('allows independent base and add-on slots to coexist', () => {
    expect(() => assertNoSubscriptionItemOverlap([baseItem, addonItem])).not.toThrow();
    expect(selectEffectiveSubscriptionItems([baseItem, addonItem], 'tenant-1', '2026-08-20T00:00:00.000Z')).toHaveLength(2);
  });

  it('allows adjacent replacements in the same slot', () => {
    expect(() =>
      assertNoSubscriptionItemOverlap([
        baseItem,
        {
          ...baseItem,
          id: 'item-base-2',
          productOfferingVersionId: 'offering-base-v2',
          effectiveFrom: '2026-09-01T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
          version: 2,
        },
      ]),
    ).not.toThrow();
  });

  it('derives lifecycle state from append-only occurrences as of time', () => {
    const occurrences: SubscriptionLifecycleOccurrence[] = [
      ...lifecycle,
      {
        id: 'occ-2',
        tenantSubscriptionId: 'sub-1',
        kind: 'SUSPENDED',
        effectiveAt: '2026-08-10T00:00:00.000Z',
        recordedAt: '2026-08-10T00:00:00.000Z',
        sequence: 2,
      },
      {
        id: 'occ-3',
        tenantSubscriptionId: 'sub-1',
        kind: 'RESUMED',
        effectiveAt: '2026-08-12T00:00:00.000Z',
        recordedAt: '2026-08-12T00:00:00.000Z',
        sequence: 3,
      },
    ];

    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-05T00:00:00.000Z')).toBe('ACTIVE');
    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-11T00:00:00.000Z')).toBe('SUSPENDED');
    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-13T00:00:00.000Z')).toBe('ACTIVE');
  });

  it('keeps decimal quantities as canonical strings', () => {
    expect(isCanonicalNonNegativeDecimal('0')).toBe(true);
    expect(isCanonicalNonNegativeDecimal('20')).toBe(true);
    expect(isCanonicalNonNegativeDecimal('20.5')).toBe(true);
    expect(isCanonicalNonNegativeDecimal('01')).toBe(false);
    expect(isCanonicalNonNegativeDecimal('-1')).toBe(false);
    expect(isCanonicalNonNegativeDecimal('1e3')).toBe(false);
  });

  it('rejects duplicate entitlement definitions in one offering version', () => {
    expect(() =>
      validateProductOfferingVersion({
        ...baseOffering,
        entitlements: [baseOffering.entitlements[0]!, baseOffering.entitlements[0]!],
      }),
    ).toThrow(/duplicate entitlement/);
  });

  it('requires an offering to be available when a new item starts', () => {
    expect(isOfferingAvailableAt(baseOffering, '2026-08-01T00:00:00.000Z')).toBe(true);
    expect(isOfferingAvailableAt(baseOffering, '2026-08-20T00:00:00.000Z')).toBe(false);
    expect(() => validateSubscriptionItemAssignment({ subscription, item: baseItem, offering: baseOffering })).not.toThrow();
    expect(() =>
      validateSubscriptionItemAssignment({
        subscription,
        item: { ...baseItem, effectiveFrom: '2026-08-20T00:00:00.000Z' },
        offering: baseOffering,
      }),
    ).toThrow(/not available/);
  });

  it('keeps a grandfathered item entitled after its offering stops being sold', () => {
    const snapshot = resolveEntitlementSnapshot({
      tenantId: 'tenant-1',
      subscriptions: [subscription],
      subscriptionItems: [baseItem],
      offerings: [baseOffering],
      lifecycleOccurrences: lifecycle,
      entitlementAuthorityGuardVersion: 3,
      resolvedAt: '2026-08-20T10:00:00.000Z',
      validAt: '2026-08-20T10:00:00.000Z',
      arithmetic,
    });

    expect(snapshot.entitlements['sourcing.rfq.issue']).toMatchObject({
      kind: 'CAPABILITY',
      enabled: true,
    });
  });

  it('aggregates a base finite allowance plus an independent add-on exactly', () => {
    const snapshot = resolveEntitlementSnapshot({
      tenantId: 'tenant-1',
      subscriptions: [subscription],
      subscriptionItems: [baseItem, addonItem],
      offerings: [baseOffering, addonOffering],
      lifecycleOccurrences: lifecycle,
      entitlementAuthorityGuardVersion: 4,
      resolvedAt: '2026-08-20T10:00:00.000Z',
      validAt: '2026-08-20T10:00:00.000Z',
      arithmetic,
    });

    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'FINITE',
      limitQuantity: '30',
      usageMeasureKey: 'ai.quote_extraction.run',
    });
    expect(snapshot.subscriptionItemIds).toEqual(['item-ai-1', 'item-base-1']);
    expect(snapshot.entitlementAuthorityGuardVersion).toBe(4);
  });

  it('lets one UNBOUNDED grant dominate finite allowance without sentinel arithmetic', () => {
    const unlimitedOffering: ProductOfferingVersion = {
      ...addonOffering,
      id: 'offering-ai-unlimited-v1',
      offeringKey: 'AI_UNLIMITED_ADDON',
      entitlements: [
        {
          definitionVersionId: 'ent-ai-v1',
          definitionKey: 'ai.quote_extraction',
          kind: 'METERED_LIMIT',
          usageMeasureDefinitionVersionId: 'usage-ai-v1',
          usageMeasureKey: 'ai.quote_extraction.run',
          limitMode: 'UNBOUNDED',
        },
      ],
    };
    const unlimitedItem = {
      ...addonItem,
      id: 'item-ai-unlimited',
      productOfferingVersionId: unlimitedOffering.id,
    };

    const snapshot = resolveEntitlementSnapshot({
      tenantId: 'tenant-1',
      subscriptions: [subscription],
      subscriptionItems: [baseItem, unlimitedItem],
      offerings: [baseOffering, unlimitedOffering],
      lifecycleOccurrences: lifecycle,
      entitlementAuthorityGuardVersion: 5,
      resolvedAt: '2026-08-20T10:00:00.000Z',
      validAt: '2026-08-20T10:00:00.000Z',
      arithmetic,
    });

    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'UNBOUNDED',
    });
  });

  it('removes suspended subscriptions from current entitlement without rewriting items', () => {
    const suspendedLifecycle: SubscriptionLifecycleOccurrence[] = [
      ...lifecycle,
      {
        id: 'occ-suspend',
        tenantSubscriptionId: 'sub-1',
        kind: 'SUSPENDED',
        effectiveAt: '2026-08-19T00:00:00.000Z',
        recordedAt: '2026-08-19T00:00:00.000Z',
        sequence: 2,
      },
    ];
    const snapshot = resolveEntitlementSnapshot({
      tenantId: 'tenant-1',
      subscriptions: [subscription],
      subscriptionItems: [baseItem, addonItem],
      offerings: [baseOffering, addonOffering],
      lifecycleOccurrences: suspendedLifecycle,
      entitlementAuthorityGuardVersion: 6,
      resolvedAt: '2026-08-20T10:00:00.000Z',
      validAt: '2026-08-20T10:00:00.000Z',
      arithmetic,
    });

    expect(snapshot.entitlements).toEqual({});
    expect(snapshot.subscriptionItemIds).toEqual([]);
  });
});
