import { describe, expect, it } from 'vitest';

import {
  assertEstablishedBootstrap,
  assertVerifiedIdentityForBootstrap,
  decideTenantBootstrap,
  type TenantBootstrapIntent,
  type VerifiedAuthenticationIdentity,
} from './bootstrap.js';

const identity: VerifiedAuthenticationIdentity = {
  id: 'auth-1',
  providerKey: 'oidc-primary',
  providerSubject: 'subject-123',
  verifiedAt: '2026-08-07T12:00:00.000Z',
};

const establishedIntent: TenantBootstrapIntent = {
  id: 'bootstrap-1',
  authenticationIdentityId: 'auth-1',
  idempotencyKey: 'request-1',
  requestedTenantName: 'Example Contractor',
  requestedInitialLegalEntityName: 'Example Contractor LLC',
  state: 'ESTABLISHED',
  tenantId: 'tenant-1',
  ownerMembershipId: 'membership-1',
  recordedAt: '2026-08-07T12:01:00.000Z',
  establishedAt: '2026-08-07T12:01:01.000Z',
};

describe('tenant bootstrap contracts', () => {
  it('requires a verified identity that already exists as of the bootstrap decision', () => {
    expect(() => assertVerifiedIdentityForBootstrap(identity, '2026-08-07T12:05:00.000Z')).not.toThrow();
    expect(() => assertVerifiedIdentityForBootstrap(identity, '2026-08-07T11:59:59.000Z')).toThrow(
      /cannot be in the future/,
    );
  });

  it('creates a new bootstrap intent for a new idempotency key', () => {
    const result = decideTenantBootstrap({
      identity,
      request: {
        authenticationIdentityId: 'auth-1',
        idempotencyKey: 'request-new',
        requestedTenantName: 'Example Contractor',
      },
      existingIntents: [establishedIntent],
      asOf: '2026-08-07T12:05:00.000Z',
    });

    expect(result.action).toBe('CREATE_INTENT');
  });

  it('returns the existing intent for an exact idempotent retry', () => {
    const result = decideTenantBootstrap({
      identity,
      request: {
        authenticationIdentityId: 'auth-1',
        idempotencyKey: 'request-1',
        requestedTenantName: 'Example Contractor',
        requestedInitialLegalEntityName: 'Example Contractor LLC',
      },
      existingIntents: [establishedIntent],
      asOf: '2026-08-07T12:05:00.000Z',
    });

    expect(result).toEqual({ action: 'RETURN_EXISTING', intent: establishedIntent });
  });

  it('rejects reuse of an idempotency key with a changed payload', () => {
    expect(() =>
      decideTenantBootstrap({
        identity,
        request: {
          authenticationIdentityId: 'auth-1',
          idempotencyKey: 'request-1',
          requestedTenantName: 'Different Contractor',
          requestedInitialLegalEntityName: 'Example Contractor LLC',
        },
        existingIntents: [establishedIntent],
        asOf: '2026-08-07T12:05:00.000Z',
      }),
    ).toThrow(/different bootstrap payload/);
  });

  it('does not conflate a technical identity with tenant ownership', () => {
    expect(() =>
      decideTenantBootstrap({
        identity,
        request: {
          authenticationIdentityId: 'auth-other',
          idempotencyKey: 'request-2',
          requestedTenantName: 'Example Contractor',
        },
        existingIntents: [],
        asOf: '2026-08-07T12:05:00.000Z',
      }),
    ).toThrow(/does not match verified authentication identity/);
  });

  it('requires established bootstrap to bind both tenant and initial owner membership', () => {
    expect(() => assertEstablishedBootstrap(establishedIntent)).not.toThrow();
    const { ownerMembershipId: _omitted, ...missingOwnerMembership } = establishedIntent;
    expect(() => assertEstablishedBootstrap(missingOwnerMembership)).toThrow(/ownerMembershipId/);
  });
});
