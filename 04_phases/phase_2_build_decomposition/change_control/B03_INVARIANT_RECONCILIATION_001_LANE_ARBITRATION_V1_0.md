# B03 Invariant Reconciliation 001 — Tenant-Lane Arbitration v1.0

**Date:** 2026-08-12  
**Status:** ACCEPTED INCREMENTAL INVARIANT/CONCURRENCY RECONCILIATION  
**Trigger:** independent combined B02-C3/C4 + B03 audit watch `W-COMB-05`.

## Finding

B03 implements concurrency-sensitive tenant/lane claim arbitration using a transaction-scoped advisory lock per worker lane, live RUNNING-lease quota recomputation, bounded round-robin candidate ranking and `FOR UPDATE SKIP LOCKED` claim fencing.

The mechanism is load-bearing because concurrent claimers must not oversubscribe the tenant/lane resource envelope or silently starve an eligible tenant while claiming that the quota/fairness contract is enforced.

## Registered disposition

This is a specialized B03 concurrency profile under existing frozen resource-bound/isolation/durability requirements rather than a new business semantic invariant.

The controlling physical rule is:

`For a registered worker lane, concurrent claim arbitration MUST serialize the quota-admission predicate for that lane, recompute live tenant occupancy inside the serialized transaction, admit no tenant above its configured lane quota, and preserve bounded tenant-round ordering among eligible candidates.`

Concurrency enforcement: `CC-5` transaction-scoped technical advisory lock + row locks/fencing on claimed jobs.

Participating objects/operations:

- `ops.worker_lane_policy`;
- `ops.tenant_lane_quota`;
- `ops.job` / active lease state;
- `ops.claim_jobs(...)`;
- worker fencing token issuance.

Hostile proof requirements:

1. two concurrent claimers cannot admit more RUNNING jobs for a tenant/lane than its quota;
2. stale occupancy is recomputed inside arbitration, not from an application cache;
3. eligible tenants are represented in bounded round-robin order rather than a single-tenant drain;
4. worker runtime obtains this behavior only through the bounded protocol function, not generic table authority.

## Relationship to frozen register

- `INV-005` / `INV-013`: tenant isolation remains mandatory;
- `INV-052` / `INV-053`: effect uncertainty/fencing semantics remain unchanged;
- `INV-084`: retry/degradation must preserve tenant/effect meaning;
- `INV-087`: finite quota/resource limits remain explicit and cannot silently truncate/create semantics.

No change is made to the frozen seven-stage EffectPosition invariant: `INV-051` already expressly requires the closed state machine **and transition matrix**.

## Audit disposition

The independent auditor found the current implementation correct and classified this as non-blocking registration debt. This reconciliation closes that debt prospectively without changing the audited implementation.