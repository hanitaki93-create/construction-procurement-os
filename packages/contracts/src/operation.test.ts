import { describe, expect, it } from 'vitest';

import {
  entitlementPreconditionAllowsCapabilityAvailability,
  evaluateEntitlementPrecondition,
  validateOperationEnvelope,
  validateRegisteredOperationDefinition,
  type CommandOperationEnvelope,
  type RegisteredOperationDefinition,
} from './operation.js';
import type { ResolvedEntitlementSnapshot } from './platform.js';

const commandDefinition: RegisteredOperationDefinition = {
  key: 'tenant.project.create',
  version: 1,
  operationClass: 'COMMAND',
  requiredEntitlementKey: 'project.create',
  requiresCurrentEntitlement: true,
  requiresIdempotencyKey: true,
  recordedAt: '2026-08-07T12:00:00.000Z',
};

const commandEnvelope: CommandOperationEnvelope = {
  invocationId: 'invoke-1',
  operationKey: 'tenant.project.create',
  operationVersion: 1,
  operationClass: 'COMMAND',
  context: {
    tenantId: 'tenant-1',
    principalId: 'principal-1',
  },
  idempotencyKey: 'idem-1',
  requestedAt: '2026-08-07T12:01:00.000Z',
};

const capabilitySnapshot: ResolvedEntitlementSnapshot = {
  tenantId: 'tenant-1',
  tenantSubscriptionId: 'sub-1',
  productOfferingVersionId: 'offering-v1',
  resolvedAt: '2026-08-07T12:00:30.000Z',
  validAt: '2026-08-07T12:01:00.000Z',
  entitlements: {
    'project.create': {
      definitionVersionId: 'ent-project-create-v1',
      definitionKey: 'project.create',
      kind: 'CAPABILITY',
      enabled: true,
    },
    'ai.quote_extraction': {
      definitionVersionId: 'ent-ai-quote-v1',
      definitionKey: 'ai.quote_extraction',
      kind: 'METERED_LIMIT',
      usageMeasureKey: 'ai.quote_extraction.run',
      limitQuantity: '20',
    },
  },
};

describe('registered operation contracts', () => {
  it('requires idempotency for every command and async operation definition', () => {
    expect(() =>
      validateRegisteredOperationDefinition({
        ...commandDefinition,
        requiresIdempotencyKey: false,
      }),
    ).toThrow(/must require an idempotency key/);
  });

  it('rejects an envelope that does not match the registered operation version', () => {
    expect(() =>
      validateOperationEnvelope(commandDefinition, {
        ...commandEnvelope,
        operationVersion: 2,
      }),
    ).toThrow(/does not match the registered operation version/);
  });

  it('requires a non-empty idempotency key for command execution', () => {
    expect(() =>
      validateOperationEnvelope(commandDefinition, {
        ...commandEnvelope,
        idempotencyKey: '   ',
      }),
    ).toThrow(/idempotencyKey is required/);
  });

  it('treats entitlement as a capability-availability precondition only', () => {
    const result = evaluateEntitlementPrecondition(commandDefinition, capabilitySnapshot);
    expect(result).toEqual({ state: 'SATISFIED', entitlementKey: 'project.create' });
    expect(entitlementPreconditionAllowsCapabilityAvailability(result)).toBe(true);
  });

  it('fails closed when the required entitlement is absent', () => {
    const result = evaluateEntitlementPrecondition(
      { ...commandDefinition, requiredEntitlementKey: 'award.approve' },
      capabilitySnapshot,
    );
    expect(result).toEqual({
      state: 'BLOCKED_NOT_ENTITLED',
      entitlementKey: 'award.approve',
    });
    expect(entitlementPreconditionAllowsCapabilityAvailability(result)).toBe(false);
  });

  it('does not treat a metered entitlement as automatically satisfied', () => {
    const result = evaluateEntitlementPrecondition(
      {
        ...commandDefinition,
        key: 'ai.quote.extract',
        requiredEntitlementKey: 'ai.quote_extraction',
      },
      capabilitySnapshot,
    );

    expect(result).toEqual({
      state: 'REQUIRES_USAGE_EVALUATION',
      entitlementKey: 'ai.quote_extraction',
      usageMeasureKey: 'ai.quote_extraction.run',
    });
    expect(entitlementPreconditionAllowsCapabilityAvailability(result)).toBe(false);
  });
});
