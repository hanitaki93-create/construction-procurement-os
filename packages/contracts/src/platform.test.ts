import { describe, expect, it } from 'vitest';

import {
  assertNoEffectivePeriodOverlap,
  deriveSubscriptionLifecycleState,
  isCanonicalNonNegativeDecimal,
  isEffectiveAt,
  resolveEntitlementSnapshot,
  selectEffectiveSubscription,
  validateProductOfferingVersion,
  type ProductOfferingVersion,
  type SubscriptionLifecycleOccurrence,
  type TenantSubscription,
} from './platform.js';

const subscription: TenantSubscription = {
  id: 'sub-1',
  tenantId: 'tenant-1',
  productOfferingVersionId: 'offering-v1',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const offering: ProductOfferingVersion = {
  id: 'offering-v1',
  offeringKey: 'SELF_SERVICE_PUBLIC',
  version: 1,
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
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
      usageMeasureKey: 'ai.quote_extraction.run',
      limitQuantity: '20',
    },
  ],
};

describe('platform subscription contracts', () => {
  it('uses half-open effective periods', () => {
    expect(isEffectiveAt(subscription, '2026-08-01T00:00:00.000Z')).toBe(true);
    expect(isEffectiveAt(subscription, '2026-08-31T23:59:59.999Z')).toBe(true);
    expect(isEffectiveAt(subscription, '2026-09-01T00:00:00.000Z')).toBe(false);
  });

  it('rejects overlapping subscription authority periods for one tenant', () => {
    expect(() =>
      assertNoEffectivePeriodOverlap([
        subscription,
        {
          ...subscription,
          id: 'sub-2',
          effectiveFrom: '2026-08-20T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
        },
      ]),
    ).toThrow(/overlapping TenantSubscription/);
  });

  it('allows adjacent subscription authority periods', () => {
    expect(() =>
      assertNoEffectivePeriodOverlap([
        subscription,
        {
          ...subscription,
          id: 'sub-2',
          effectiveFrom: '2026-09-01T00:00:00.000Z',
          effectiveUntil: '2026-10-01T00:00:00.000Z',
        },
      ]),
    ).not.toThrow();
  });

  it('fails closed if more than one subscription is effective', () => {
    const overlapping = {
      ...subscription,
      id: 'sub-2',
      effectiveFrom: '2026-08-15T00:00:00.000Z',
      effectiveUntil: '2026-10-01T00:00:00.000Z',
    };

    expect(() =>
      selectEffectiveSubscription(
        [subscription, overlapping],
        'tenant-1',
        '2026-08-20T00:00:00.000Z',
      ),
    ).toThrow(/multiple effective TenantSubscription/);
  });

  it('derives lifecycle state from append-only occurrences as of time', () => {
    const occurrences: SubscriptionLifecycleOccurrence[] = [
      {
        id: 'occ-1',
        tenantSubscriptionId: 'sub-1',
        kind: 'ACTIVATED',
        effectiveAt: '2026-08-01T00:00:00.000Z',
        recordedAt: '2026-08-01T00:00:00.000Z',
        sequence: 1,
      },
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

    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-05T00:00:00.000Z')).toBe(
      'ACTIVE',
    );
    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-11T00:00:00.000Z')).toBe(
      'SUSPENDED',
    );
    expect(deriveSubscriptionLifecycleState(occurrences, 'sub-1', '2026-08-13T00:00:00.000Z')).toBe(
      'ACTIVE',
    );
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
        ...offering,
        entitlements: [offering.entitlements[0]!, offering.entitlements[0]!],
      }),
    ).toThrow(/duplicate entitlement/);
  });

  it('resolves a derived snapshot without creating a mutable entitlement authority', () => {
    const snapshot = resolveEntitlementSnapshot({
      tenantId: 'tenant-1',
      subscription,
      offering,
      resolvedAt: '2026-08-20T10:00:00.000Z',
      validAt: '2026-08-20T10:00:00.000Z',
    });

    expect(snapshot.tenantSubscriptionId).toBe('sub-1');
    expect(snapshot.productOfferingVersionId).toBe('offering-v1');
    expect(snapshot.entitlements['sourcing.rfq.issue']).toEqual({
      definitionVersionId: 'ent-rfq-v1',
      definitionKey: 'sourcing.rfq.issue',
      kind: 'CAPABILITY',
      enabled: true,
    });
  });
});
