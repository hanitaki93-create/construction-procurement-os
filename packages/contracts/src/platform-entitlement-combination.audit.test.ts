import { describe, expect, it } from 'vitest';

import {
  resolveEntitlementSnapshot,
  type ProductOfferingVersion,
  type SubscriptionLifecycleOccurrence,
  type TenantSubscription,
  type TenantSubscriptionItem,
  type TenantSubscriptionItemVersion,
} from './platform.js';

const tenantId = 'tenant-a';
const subscriptionId = 'subscription-a';

const subscription: TenantSubscription = {
  id: subscriptionId,
  tenantId,
  commercialChannel: 'SELF_SERVICE',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const lifecycle: readonly SubscriptionLifecycleOccurrence[] = [
  {
    id: 'lifecycle-1',
    tenantSubscriptionId: subscriptionId,
    kind: 'ACTIVATED',
    effectiveAt: '2026-08-01T00:00:00.000Z',
    recordedAt: '2026-08-01T00:00:00.000Z',
    sequence: 1,
  },
];

const baseItem: TenantSubscriptionItem = {
  id: 'item-base',
  tenantSubscriptionId: subscriptionId,
  tenantId,
  itemSlotKey: 'BASE',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const addonItem: TenantSubscriptionItem = {
  id: 'item-addon',
  tenantSubscriptionId: subscriptionId,
  tenantId,
  itemSlotKey: 'AI_ADDON',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const baseVersion: TenantSubscriptionItemVersion = {
  id: 'item-base-v1',
  tenantSubscriptionItemId: baseItem.id,
  tenantId,
  itemSlotKey: baseItem.itemSlotKey,
  version: 1,
  productOfferingVersionId: 'offering-base',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const addonVersion: TenantSubscriptionItemVersion = {
  id: 'item-addon-v1',
  tenantSubscriptionItemId: addonItem.id,
  tenantId,
  itemSlotKey: addonItem.itemSlotKey,
  version: 1,
  productOfferingVersionId: 'offering-addon',
  effectiveFrom: '2026-08-01T00:00:00.000Z',
  effectiveUntil: '2026-09-01T00:00:00.000Z',
  recordedAt: '2026-08-01T00:00:00.000Z',
};

const arithmetic = {
  zero: '0',
  add(left: string, right: string): string {
    return (BigInt(left) + BigInt(right)).toString();
  },
};

function offering(
  id: string,
  entitlements: ProductOfferingVersion['entitlements'],
): ProductOfferingVersion {
  return {
    id,
    offeringKey: id.toUpperCase().replaceAll('-', '_'),
    version: 1,
    availableFrom: '2026-07-01T00:00:00.000Z',
    recordedAt: '2026-07-01T00:00:00.000Z',
    entitlements,
  };
}

function resolve(offerings: readonly ProductOfferingVersion[]) {
  return resolveEntitlementSnapshot({
    tenantId,
    subscriptions: [subscription],
    subscriptionItems: [baseItem, addonItem],
    subscriptionItemVersions: [baseVersion, addonVersion],
    offerings,
    lifecycleOccurrences: lifecycle,
    entitlementAuthorityGuardVersion: 7,
    validAt: '2026-08-10T00:00:00.000Z',
    resolvedAt: '2026-08-10T00:00:00.000Z',
    arithmetic,
  });
}

describe('B02 entitlement contribution combination', () => {
  it('adds finite limits from independent components and preserves both exact sources', () => {
    const snapshot = resolve([
      offering('offering-base', [
        {
          definitionVersionId: 'entitlement-ai-v1',
          definitionKey: 'ai.quote_extraction',
          kind: 'METERED_LIMIT',
          usageMeasureDefinitionVersionId: 'usage-ai-v1',
          usageMeasureKey: 'ai.quote_extraction.run',
          limitMode: 'FINITE',
          limitQuantity: '20',
        },
      ]),
      offering('offering-addon', [
        {
          definitionVersionId: 'entitlement-ai-v1',
          definitionKey: 'ai.quote_extraction',
          kind: 'METERED_LIMIT',
          usageMeasureDefinitionVersionId: 'usage-ai-v1',
          usageMeasureKey: 'ai.quote_extraction.run',
          limitMode: 'FINITE',
          limitQuantity: '10',
        },
      ]),
    ]);

    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'FINITE',
      limitQuantity: '30',
    });
    expect(snapshot.entitlements['ai.quote_extraction']?.sources).toHaveLength(2);
  });

  it('lets UNBOUNDED absorb a finite contribution while preserving both sources', () => {
    const snapshot = resolve([
      offering('offering-base', [
        {
          definitionVersionId: 'entitlement-ai-v1',
          definitionKey: 'ai.quote_extraction',
          kind: 'METERED_LIMIT',
          usageMeasureDefinitionVersionId: 'usage-ai-v1',
          usageMeasureKey: 'ai.quote_extraction.run',
          limitMode: 'FINITE',
          limitQuantity: '20',
        },
      ]),
      offering('offering-addon', [
        {
          definitionVersionId: 'entitlement-ai-v1',
          definitionKey: 'ai.quote_extraction',
          kind: 'METERED_LIMIT',
          usageMeasureDefinitionVersionId: 'usage-ai-v1',
          usageMeasureKey: 'ai.quote_extraction.run',
          limitMode: 'UNBOUNDED',
        },
      ]),
    ]);

    expect(snapshot.entitlements['ai.quote_extraction']).toMatchObject({
      kind: 'METERED_LIMIT',
      limitMode: 'UNBOUNDED',
    });
    expect(snapshot.entitlements['ai.quote_extraction']?.sources).toHaveLength(2);
  });

  it('fails closed when one entitlement key mixes capability and metered semantics', () => {
    expect(() =>
      resolve([
        offering('offering-base', [
          {
            definitionVersionId: 'entitlement-shared-v1',
            definitionKey: 'shared.key',
            kind: 'CAPABILITY',
            enabled: true,
          },
        ]),
        offering('offering-addon', [
          {
            definitionVersionId: 'entitlement-shared-v1',
            definitionKey: 'shared.key',
            kind: 'METERED_LIMIT',
            usageMeasureDefinitionVersionId: 'usage-shared-v1',
            usageMeasureKey: 'shared.unit',
            limitMode: 'FINITE',
            limitQuantity: '1',
          },
        ]),
      ]),
    ).toThrow(/entitlement kind conflict/u);
  });

  it('fails closed when metered contributors use different usage-measure keys', () => {
    expect(() =>
      resolve([
        offering('offering-base', [
          {
            definitionVersionId: 'entitlement-ai-v1',
            definitionKey: 'ai.quote_extraction',
            kind: 'METERED_LIMIT',
            usageMeasureDefinitionVersionId: 'usage-ai-v1',
            usageMeasureKey: 'ai.quote_extraction.run',
            limitMode: 'FINITE',
            limitQuantity: '20',
          },
        ]),
        offering('offering-addon', [
          {
            definitionVersionId: 'entitlement-ai-v1',
            definitionKey: 'ai.quote_extraction',
            kind: 'METERED_LIMIT',
            usageMeasureDefinitionVersionId: 'usage-pages-v1',
            usageMeasureKey: 'document.page',
            limitMode: 'FINITE',
            limitQuantity: '10',
          },
        ]),
      ]),
    ).toThrow(/usage measure conflict/u);
  });
});
