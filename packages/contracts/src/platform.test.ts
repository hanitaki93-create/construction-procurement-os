import { describe, expect, it } from 'vitest';

import {
  assertNoSubscriptionItemVersionOverlap,
  deriveSubscriptionLifecycleState,
  isCanonicalNonNegativeDecimal,
  isEffectiveAt,
  isOfferingAvailableAt,
  resolveEntitlementSnapshot,
  selectSubscriptionItemVersions,
  validateProductOfferingVersion,
  validateSubscriptionItemVersionAssignment,
  type ExactEntitlementArithmetic,
  type ProductOfferingVersion,
  type SubscriptionLifecycleOccurrence,
  type TenantSubscription,
  type TenantSubscriptionItem,
  type TenantSubscriptionItemVersion,
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
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const addonItem: TenantSubscriptionItem = {
  id: 'item-ai-1',
  tenantSubscriptionId: 'sub-1',
  tenantId: 'tenant-1',
  itemSlotKey: 'AI_ADDON',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const baseItemVersion: TenantSubscriptionItemVersion = {
  id: 'item-base-version-1',
  tenantSubscriptionItemId: 'item-base-1',
  tenantId: 'tenant-1',
  itemSlotKey: 'BASE',
  version: 1,
  productOfferingVersionId: 'offering-base-v1',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const addonItemVersion: TenantSubscriptionItemVersion = {
  id: 'item-ai-version-1',
  tenantSubscriptionItemId: 'item-ai-1',
  tenantId: 'tenant-1',
  itemSlotKey: 'AI_ADDON',
  version: 1,
  productOfferingVersionId: 'offering-ai-v1',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
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

function resolve(input: {
  readonly items?: readonly TenantSubscriptionItem[];
  readonly itemVersions?: readonly TenantSubscriptionItemVersion[];
  readonly offerings?: readonly ProductOfferingVersion[];
  readonly lifecycleOccurrences?: readonly SubscriptionLifecycleOccurrence[];
  readonly resolvedAt?: string;
  readonly validAt?: string;
  readonly guardVersion?: number;
}) {
  return resolveEntitlementSnapshot({
    tenantId: 'tenant-1',
    subscriptions: [subscription],
    subscriptionItems: input.items ?? [baseItem, addonItem],
    subscriptionItemVersions: input.itemVersions ?? [baseItemVersion, addonItemVersion],
    offerings: input.offerings ?? [baseOffering, addonOffering],
    lifecycleOccurrences: input.lifecycleOccurrences ?? lifecycle,
    entitlementAuthorityGuardVersion: input.guardVersion ?? 4,
    resolvedAt: input.resolvedAt ?? '2026-08-20T10:00:00.000Z',
    validAt: input.validAt ?? '2026-08-20T10:00:00.000Z',
    arithmetic,
  });
}

describe('platform subscription contracts', () => {
  it('uses half-open effective periods', () => {
    expect(isEffectiveAt(baseItemVersion, '2026-08-01T00:00:00.000Z')).toBe(true);
    expect(isEffectiveAt(baseItemVersion, '2026-08-31T23:59:59.999Z')).toBe(true);
    expect(isEffectiveAt(baseItemVersion, '2026-09-01T00:00:00.000Z')).toBe(false);
  });

  it('rejects overlapping current authority inside one tenant and item slot', () => {
    expect(() =>
      assertNoSubscriptionItemVersionOverlap([
        baseItemVersion,
        {
          ...baseItemVersion,
          id: 'item-base-version-2',
          tenantSubscriptionItemId: 'item-base-2',
          effectiveFrom: '2026-08-20T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
          version: 1,
        },
      ]),
    ).toThrow(/overlapping current TenantSubscriptionItemVersion/);
  });

  it('allows independent base and add-on slots to coexist', () => {
    expect(() =>
      assertNoSubscriptionItemVersionOverlap([baseItemVersion, addonItemVersion]),
    ).not.toThrow();
    expect(
      selectSubscriptionItemVersions({
        versions: [baseItemVersion, addonItemVersion],
        tenantId: 'tenant-1',
        validAt: '2026-08-20T00:00:00.000Z',
        knownAt: '2026-08-20T00:00:00.000Z',
      }),
    ).toHaveLength(2);
  });

  it('allows adjacent current authority versions in the same slot', () => {
    expect(() =>
      assertNoSubscriptionItemVersionOverlap([
        { ...baseItemVersion, effectiveUntil: '2026-08-20T00:00:00.000Z' },
        {
          ...baseItemVersion,
          id: 'item-base-version-2',
          tenantSubscriptionItemId: 'item-base-2',
          productOfferingVersionId: 'offering-base-v2',
          effectiveFrom: '2026-08-20T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
          version: 1,
        },
      ]),
    ).not.toThrow();
  });

  it('derives lifecycle state from append-only occurrences as of valid and recorded time', () => {
    const occurrences: SubscriptionLifecycleOccurrence[] = [
      ...lifecycle,
      {
        id: 'occ-2',
        tenantSubscriptionId: 'sub-1',
        kind: 'SUSPENDED',
        effectiveAt: '2026-08-10T00:00:00.000Z',
        recordedAt: '2026-08-12T00:00:00.000Z',
        sequence: 2,
      },
    ];

    expect(
      deriveSubscriptionLifecycleState(
        occurrences,
        'sub-1',
        '2026-08-11T00:00:00.000Z',
        '2026-08-11T00:00:00.000Z',
      ),
    ).toBe('ACTIVE');
    expect(
      deriveSubscriptionLifecycleState(
        occurrences,
        'sub-1',
        '2026-08-11T00:00:00.000Z',
        '2026-08-13T00:00:00.000Z',
      ),
    ).toBe('SUSPENDED');
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

  it('requires an offering to be available when a new item version starts', () => {
    expect(isOfferingAvailableAt(baseOffering, '2026-08-01T00:00:00.000Z')).toBe(true);
    expect(isOfferingAvailableAt(baseOffering, '2026-08-20T00:00:00.000Z')).toBe(false);
    expect(() =>
      validateSubscriptionItemVersionAssignment({
        subscription,
        item: baseItem,
        itemVersion: baseItemVersion,
        offering: baseOffering,
      }),
    ).not.toThrow();
    expect(() =>
      validateSubscriptionItemVersionAssignment({
        subscription,
        item: baseItem,
        itemVersion: { ...baseItemVersion, effectiveFrom: '2026-08-20T00:00:00.000Z' },
        offering: baseOffering,
      }),
    ).toThrow(/not available/);
  });

  it('keeps a grandfathered item entitled after its offering stops being sold', () => {
    const snapshot = resolve({ items: [baseItem], itemVersions: [baseItemVersion], offerings: [baseOffering] });
    expect(snapshot.entitlements['sourcing.rfq.issue']).toMatchObject({
      kind: 'CAPABILITY',
      enabled: true,
    });
  });

  it('aggregates a base finite allowance plus an independent add-on exactly', () => {
    const snapshot = resolve({});
    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'FINITE',
      limitQuantity: '30',
      usageMeasureKey: 'ai.quote_extraction.run',
    });
    expect(snapshot.subscriptionItemVersionIds).toEqual([
      'item-ai-version-1',
      'item-base-version-1',
    ]);
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
    const unlimitedVersion: TenantSubscriptionItemVersion = {
      ...addonItemVersion,
      id: 'item-ai-unlimited-version-1',
      productOfferingVersionId: unlimitedOffering.id,
    };

    const snapshot = resolve({
      itemVersions: [baseItemVersion, unlimitedVersion],
      offerings: [baseOffering, unlimitedOffering],
    });
    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'UNBOUNDED',
    });
  });

  it('removes suspended subscriptions from current entitlement without rewriting item versions', () => {
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
    const snapshot = resolve({ lifecycleOccurrences: suspendedLifecycle });
    expect(snapshot.entitlements).toEqual({});
    expect(snapshot.subscriptionItemVersionIds).toEqual([]);
  });

  it('reconstructs the exact item version known at an earlier recorded time', () => {
    const original: TenantSubscriptionItemVersion = {
      ...baseItemVersion,
      id: 'item-base-original',
      effectiveUntil: '2026-09-01T00:00:00.000Z',
      supersededAt: '2026-08-15T12:00:00.000Z',
    };
    const corrected: TenantSubscriptionItemVersion = {
      ...baseItemVersion,
      id: 'item-base-corrected',
      version: 2,
      effectiveUntil: '2026-08-15T00:00:00.000Z',
      recordedAt: '2026-08-15T12:00:00.000Z',
    };

    const thenSnapshot = resolve({
      items: [baseItem],
      itemVersions: [original, corrected],
      offerings: [baseOffering],
      resolvedAt: '2026-08-10T12:00:00.000Z',
      validAt: '2026-08-10T12:00:00.000Z',
      guardVersion: 1,
    });
    expect(thenSnapshot.subscriptionItemVersionIds).toEqual(['item-base-original']);

    const laterReconstruction = resolve({
      items: [baseItem],
      itemVersions: [original, corrected],
      offerings: [baseOffering],
      resolvedAt: '2026-08-20T12:00:00.000Z',
      validAt: '2026-08-10T12:00:00.000Z',
      guardVersion: 2,
    });
    expect(laterReconstruction.subscriptionItemVersionIds).toEqual(['item-base-corrected']);
  });
});
