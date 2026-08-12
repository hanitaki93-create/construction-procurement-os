import { describe, expect, it } from 'vitest';

import {
  deriveMeteredUsagePosition,
  deriveSubscriptionCommercialAccessDisposition,
  type ExactUsageArithmetic,
} from './usage.js';
import type { MeteredUsageOccurrence, SubscriptionLifecycleState } from './platform.js';

const integerArithmetic: ExactUsageArithmetic = {
  zero: '0',
  add: (left, right) => (BigInt(left) + BigInt(right)).toString(),
  subtract: (left, right) => (BigInt(left) - BigInt(right)).toString(),
  compare: (left, right) => {
    const difference = BigInt(left) - BigInt(right);
    return difference < 0n ? -1 : difference > 0n ? 1 : 0;
  },
};

function usage(
  id: string,
  correlationId: string,
  effect: 'CONSUME' | 'CREDIT',
  quantity: string,
  occurredAt: string,
): MeteredUsageOccurrence {
  return {
    id,
    tenantId: 'tenant-1',
    tenantSubscriptionId: 'sub-1',
    usageMeasureDefinitionVersionId: 'measure-v1',
    usageMeasureKey: 'ai.quote_extraction.run',
    effect,
    quantity,
    occurredAt,
    recordedAt: occurredAt,
    correlationId,
  };
}

describe('derived usage positions', () => {
  it('derives consumed and remaining allowance from append-only occurrences', () => {
    const result = deriveMeteredUsagePosition({
      tenantId: 'tenant-1',
      tenantSubscriptionId: 'sub-1',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitQuantity: '20',
      windowStart: '2026-08-01T00:00:00.000Z',
      windowEnd: '2026-09-01T00:00:00.000Z',
      asOf: '2026-08-20T00:00:00.000Z',
      occurrences: [
        usage('u1', 'corr-1', 'CONSUME', '5', '2026-08-05T00:00:00.000Z'),
        usage('u2', 'corr-2', 'CONSUME', '4', '2026-08-06T00:00:00.000Z'),
        usage('u3', 'corr-3', 'CREDIT', '2', '2026-08-07T00:00:00.000Z'),
      ],
      arithmetic: integerArithmetic,
    });

    expect(result.consumedQuantity).toBe('7');
    expect(result.remainingQuantity).toBe('13');
    expect(result.overageQuantity).toBe('0');
    expect(result.occurrenceIds).toEqual(['u1', 'u2', 'u3']);
  });

  it('derives overage without mutating the configured limit', () => {
    const result = deriveMeteredUsagePosition({
      tenantId: 'tenant-1',
      tenantSubscriptionId: 'sub-1',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitQuantity: '10',
      windowStart: '2026-08-01T00:00:00.000Z',
      windowEnd: '2026-09-01T00:00:00.000Z',
      asOf: '2026-08-20T00:00:00.000Z',
      occurrences: [usage('u1', 'corr-1', 'CONSUME', '13', '2026-08-05T00:00:00.000Z')],
      arithmetic: integerArithmetic,
    });

    expect(result.limitQuantity).toBe('10');
    expect(result.remainingQuantity).toBe('0');
    expect(result.overageQuantity).toBe('3');
  });

  it('fails closed on duplicate correlation ids rather than double consuming', () => {
    expect(() =>
      deriveMeteredUsagePosition({
        tenantId: 'tenant-1',
        tenantSubscriptionId: 'sub-1',
        usageMeasureKey: 'ai.quote_extraction.run',
        limitQuantity: '20',
        windowStart: '2026-08-01T00:00:00.000Z',
        windowEnd: '2026-09-01T00:00:00.000Z',
        asOf: '2026-08-20T00:00:00.000Z',
        occurrences: [
          usage('u1', 'corr-1', 'CONSUME', '5', '2026-08-05T00:00:00.000Z'),
          usage('u2', 'corr-1', 'CONSUME', '5', '2026-08-06T00:00:00.000Z'),
        ],
        arithmetic: integerArithmetic,
      }),
    ).toThrow(/duplicate usage correlationId/);
  });

  it('fails closed if a credit would create negative consumed usage', () => {
    expect(() =>
      deriveMeteredUsagePosition({
        tenantId: 'tenant-1',
        tenantSubscriptionId: 'sub-1',
        usageMeasureKey: 'ai.quote_extraction.run',
        limitQuantity: '20',
        windowStart: '2026-08-01T00:00:00.000Z',
        windowEnd: '2026-09-01T00:00:00.000Z',
        asOf: '2026-08-20T00:00:00.000Z',
        occurrences: [usage('u1', 'corr-1', 'CREDIT', '1', '2026-08-05T00:00:00.000Z')],
        arithmetic: integerArithmetic,
      }),
    ).toThrow(/would make consumed quantity negative/);
  });

  it('excludes occurrences outside the declared window or after asOf', () => {
    const result = deriveMeteredUsagePosition({
      tenantId: 'tenant-1',
      tenantSubscriptionId: 'sub-1',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitQuantity: '20',
      windowStart: '2026-08-01T00:00:00.000Z',
      windowEnd: '2026-09-01T00:00:00.000Z',
      asOf: '2026-08-10T00:00:00.000Z',
      occurrences: [
        usage('before', 'corr-0', 'CONSUME', '9', '2026-07-31T23:59:59.000Z'),
        usage('inside', 'corr-1', 'CONSUME', '4', '2026-08-05T00:00:00.000Z'),
        usage('future', 'corr-2', 'CONSUME', '7', '2026-08-20T00:00:00.000Z'),
      ],
      arithmetic: integerArithmetic,
    });

    expect(result.consumedQuantity).toBe('4');
    expect(result.occurrenceIds).toEqual(['inside']);
  });
});

describe('subscription commercial offboarding floor', () => {
  it('permits new entitled commands only while the subscription lifecycle is ACTIVE', () => {
    const active = deriveSubscriptionCommercialAccessDisposition('ACTIVE');
    expect(active).toMatchObject({
      mode: 'FULL',
      allowsNewEntitledCommands: true,
      preservesAuthorizedRead: true,
      preservesAuthorizedExport: true,
    });
  });

  it('preserves the commercial read/export floor without granting authority for every non-active state', () => {
    const restrictedStates: readonly SubscriptionLifecycleState[] = [
      'INACTIVE',
      'SUSPENDED',
      'CANCELLED',
      'EXPIRED',
    ];

    for (const state of restrictedStates) {
      expect(deriveSubscriptionCommercialAccessDisposition(state)).toEqual({
        mode: 'RESTRICTED_READ_EXPORT',
        allowsNewEntitledCommands: false,
        preservesAuthorizedRead: true,
        preservesAuthorizedExport: true,
        lifecycleState: state,
      });
    }
  });
});
