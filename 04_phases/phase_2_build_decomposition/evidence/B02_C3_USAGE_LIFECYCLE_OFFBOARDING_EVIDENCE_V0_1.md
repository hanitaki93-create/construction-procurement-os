# B02-C3 Usage / Lifecycle / Offboarding — Implementation Evidence v0.1

**Date:** 2026-08-11  
**Status:** C3 implementation evidence — checkpoint candidate  
**Predecessor:** B02-C1/C2 independently closed at `76d5c260cf48c4b3bce842687d3cbe1690b228d8`  

## Implemented

- append-only `platform.metered_usage_occurrence` ledger;
- declared correlation uniqueness at tenant + subscription + usage-measure grain;
- exact usage-definition-version binding at occurrence time;
- explicit `CONSUME` / `CREDIT` occurrences;
- credits reference the original consumption and require reason + evidence;
- concurrent credits serialize against the original occurrence and cannot exceed original consumption;
- usage rows are immutable; correction is a new occurrence;
- FORCE RLS and dedicated `cpos_subscription_runtime` access;
- no authoritative mutable allowance/balance table;
- deterministic consumed / remaining / overage derivation remains in contracts;
- lifecycle-derived commercial access disposition blocks new entitled commands outside ACTIVE while preserving the bounded authorized read/export floor. The floor does not itself grant tenant/project/security/business authority.

Forward migrations:

- `000006_b02_c3_usage_offboarding.sql`
- `000007_b02_c3_usage_credit_trigger_privilege.sql`

The `000007` remediation is forward-only. It gives the validation trigger the narrow privilege required to lock/read the source occurrence while first enforcing exact execution-tenant equality, preventing privileged cross-tenant lookup.

## Hostile proofs

`packages/database-core/integration/platform-c3-usage-offboarding.integration.test.ts` proves:

1. duplicate correlation cannot double-consume;
2. usage rows cannot be rewritten;
3. FORCE-RLS tenant isolation for read and write;
4. a credit without explicit provenance fails;
5. a valid credit preserves the original consumption;
6. concurrent over-credit attempts cannot both commit;
7. usage cannot bind to a definition version outside its effective period.

`packages/contracts/src/usage.test.ts` additionally proves derived usage position and commercial offboarding disposition without introducing a mutable second truth.

## Exact execution evidence

GitHub Actions run: `31522800965` — **SUCCESS**  
Workflow: `B02 Provisional Verification` #111  
Runner: `eth-sim-cpos-ci-01` (`self-hosted`, `Linux`, `X64`, `cpos-ci`)  
Runtime: Node 24.18.0 / pnpm 10.34.0 / PostgreSQL 18.4

Observed results:

- `ARCHITECTURE_BOUNDARY_CHECK_PASS`
- `DATABASE_PUBLIC_SURFACE_CHECK_PASS`
- 11 integration test files passed
- **60 / 60 integration tests passed**
- migrations `000001` through `000007` applied from rebuild
- `pending: []`
- catalog scan `[]`

## Scope boundary

This evidence supports B02-C3 only. It does not claim B02-C4, SSV-1, full B02 PASS, B03, release readiness, procurement-domain functionality, P07 or AI activation.

No C1/C2 semantic reopening is implied by this checkpoint.
