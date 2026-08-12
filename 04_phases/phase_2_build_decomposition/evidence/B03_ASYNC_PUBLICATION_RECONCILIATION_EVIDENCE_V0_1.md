# B03 Async / Publication / Reconciliation — Implementation Evidence v0.1

**Date:** 2026-08-12  
**Status:** TECHNICAL IMPLEMENTATION GREEN / INDEPENDENT HOSTILE AUDIT PENDING / NOT PASS  
**PR:** #5 — `B03 provisional async publication and reconciliation kernel` — DRAFT / DO NOT MERGE  
**B03 source head verified:** `e7a453cd7702d3816984a4152af298e9036613c8`  
**B02 base at verification:** `5e90ce775e15d94178f4ccd1540970e18b54e352`  
**Verified PR merge ref:** `67d97e360c2c8c6e9e8a643915541b8d0aad930e`  
**GitHub Actions run:** `31583094396` — B03 Provisional Verification #8 — SUCCESS  
**Job:** `94070587038`  
**Runner:** `eth-sim-cpos-ci-01` (`self-hosted`, `Linux`, `X64`, `cpos-ci`)

---

## 1. Scope

This record is implementation and deterministic-hostile evidence for B03 only. It does not declare B03 PASS, does not authorize merge and does not unlock B04–B06.

B03 implements the physical async/event/publication/reconciliation substrate required before later evidence, communication and integration work can safely cross an external effect boundary.

The load-bearing scope is:

- stable async-operation identity and idempotency conflict handling;
- immutable seven-stage `EffectPosition` history distinct from operational queue status;
- jobs, attempts, leases, heartbeats and fencing;
- tenant-aware claim quotas/fairness;
- immutable `DomainEvent`, `IntegrationEvent`, `PublicationIntent`, `TransportAttempt` and `ExternalObservation` separation;
- publication as a distinct child `AsyncOperation`, preventing source-domain completion from being conflated with outbound transport uncertainty;
- reconciliation obligations/occurrences and accepted unresolved external variance without relabelling absence as no-effect;
- tenant FORCE-RLS status readers and narrow cross-tenant worker protocols;
- migration replay/rebuild compatibility in the shared PostgreSQL integration environment.

No procurement-domain table or human-facing semantic surface is introduced by B03.

---

## 2. Governing frozen requirements

The primary frozen invariant boundary for this block is P2.1 `INV-049` through `INV-053`:

| Invariant | Required meaning | B03 physical disposition |
|---|---|---|
| `INV-049` | DomainEvent, IntegrationEvent, TransportEnvelope and ExternalObservation cannot substitute for each other. | Separate authoritative objects/contracts; transport/publication state cannot directly become domain truth. |
| `INV-050` | PublicationIntent is immutable and retry retains the exact original source/mapping/disclosure/target basis. | Append-only `publication_intent`; stable publication identity; materialization/retry binds immutable basis/version/fingerprints. |
| `INV-051` | EffectPosition uses exactly the seven frozen stages. | Closed seven-value contract + DB check + append-only transition guard/history. |
| `INV-052` | Timeout/absence after an effect-bearing attempt never proves no effect. | Possible-effect boundary is durably recorded before transport; expiry/crash enters reconciliation/indeterminate path rather than ordinary retry. |
| `INV-053` | Lease loss after possible send cannot re-enter ordinary retry. | Fencing token + lease checks + `EFFECT_INDETERMINATE` + `RECONCILIATION_REQUIRED`. |

The current product overlay adds B03 support for async usage-producing operations, provider observations/reconciliation where introduced and tenant/resource quotas, while preserving: no provider observation writes entitlement, usage is idempotent/correlated, there is no mutable usage balance, and timeout/absence remains no proof of no effect.

Governance sequencing is controlled by `CHG-0007` plus `CHG-0008`: provisional B03 implementation and verification may precede the combined post-C1/C2 independent audit; B04–B06 remain locked until that audit and owner acceptance. SSV-1 is deferred, not waived, to the first operational procurement MVP stage.

---

## 3. Implemented surfaces

### Contracts

`packages/contracts/src/async.ts` defines the closed seven-stage effect-position set:

1. `PRE_ACCEPTANCE`
2. `ACCEPTED_PRE_EFFECT`
3. `EFFECT_INDETERMINATE`
4. `EXTERNAL_EFFECT_EMITTED`
5. `DOMAIN_EFFECT_ESTABLISHED`
6. `TERMINAL_NO_EFFECT`
7. `PARTIAL_EFFECT`

It also distinguishes operational job status, worker lanes and retry classification. Ordinary retry is permitted only from `ACCEPTED_PRE_EFFECT`; `EFFECT_INDETERMINATE` requires reconciliation.

### Migrations

- `migrations/sql/000011_b03_async_publication_reconciliation.sql`
- `migrations/sql/000012_b03_async_kernel_hardening.sql`
- `migrations/sql/000013_b03_publication_effect_isolation.sql`

Key authoritative/technical objects include:

- `ops.async_operation`
- `ops.effect_position_occurrence`
- `ops.async_operation_result`
- `ops.domain_event`
- `ops.integration_event`
- `ops.publication_intent`
- `ops.transport_attempt`
- `ops.external_observation`
- `ops.job`
- `ops.job_attempt`
- `ops.outbox_entry`
- `ops.reconciliation_obligation`
- `ops.reconciliation_occurrence`
- `ops.worker_lane_policy`
- `ops.tenant_lane_quota`

The publication-isolation migration binds each `PublicationIntent` to a distinct child async operation. A source domain operation may therefore remain `DOMAIN_EFFECT_ESTABLISHED` while its outbound publication operation becomes `EFFECT_INDETERMINATE` after a possible transmission.

### Worker protocols

Bounded `SECURITY DEFINER` protocols implement claim, heartbeat, possible-effect-boundary recording, pre-effect completion, unknown-effect recording and expired-lease reaping. Worker runtime receives no general direct-table mutation grant for domain-event establishment, publication-intent creation or reconciliation resolution.

Tenant-facing B03 readers operate under FORCE RLS. Cross-tenant queue work is bounded to worker protocol functions rather than generic source-table authority.

---

## 4. Hostile proof inventory

`packages/database-core/integration/platform-b03-async-kernel.integration.test.ts` contains nine B03 hostile tests proving:

1. crash-before-commit leaves no accepted operation, while a committed lost-result identity is reused idempotently;
2. materially changed input under the same logical/idempotency identity is rejected;
3. an expired pre-effect lease may retry only under the same operation identity with a newer fence;
4. source domain completion remains distinct from outbound publication uncertainty after possible transmission;
5. DomainEvent deduplication and immutable PublicationIntent/IntegrationEvent representation basis;
6. concurrent lane claims cannot oversubscribe tenant quota and preserve tenant fairness across the bounded claim set;
7. an owner-accepted unresolved external variance preserves `EFFECT_INDETERMINATE` rather than converting unknown to no-effect;
8. tenant-facing status readers remain FORCE-RLS isolated;
9. illegal effect-stage rewind is rejected.

The full database suite also re-runs C1/C2, C3, C4, execution-context, concurrency, effective-period, migration and catalog hostility so B03 cannot obtain green evidence by regressing predecessor controls.

---

## 5. Exact execution evidence

B03 Provisional Verification run `31583094396` completed **SUCCESS** against PR merge ref `67d97e360c2c8c6e9e8a643915541b8d0aad930e`, which combined B03 source head `e7a453cd7702d3816984a4152af298e9036613c8` with B02 base `5e90ce775e15d94178f4ccd1540970e18b54e352`.

Runtime:

- Node `24.18.0`
- pnpm `10.34.0`
- PostgreSQL `18.4-trixie`
- frozen lockfile install

Observed gates:

- `ARCHITECTURE_BOUNDARY_CHECK_PASS`
- `DATABASE_PUBLIC_SURFACE_CHECK_PASS`
- contracts: **7 files / 41 tests / 41 PASS**
- B02 API regression: **2 files / 7 tests / 7 PASS**
- `@cpos/platform-application` typecheck PASS
- UI foundation build PASS
- internal web typecheck/build PASS
- PostgreSQL integration: **13 files / 74 tests / 74 PASS**
- B03 hostile suite specifically: **9 / 9 PASS**
- committed migrations `000001` through `000013` applied
- `pending: []`
- catalog scan: `[]`

The PostgreSQL service log includes expected errors generated deliberately by negative tests: RLS denials, permission denials, idempotency conflicts, append-only rejection, illegal effect transition, entitlement/lifecycle guards, exclusion conflicts and concurrency deadlock/serialization exercises. The Vitest suite treats those expected failures as proof; all 74 tests passed.

Current B03 migration checksums observed in the successful run:

- `000011`: `c6b40a58a9339dbd479d72f5f9acb6297cc62169c24682eda804a334d8ba0a39`
- `000012`: `3e94ac1a44f5f70e2b59a692ff5f3790e5205b230e76edb92194608840ed65fe`
- `000013`: `a3f6ee7c6569fe51268e038c8842219e68eeeac136d675526036954d665ab5c5`

---

## 6. Failure/recovery history and why it is closed

The B03 verification loop exposed three implementation-test infrastructure defects before the final green run.

### A. Shared-database migration replay collisions

Initial B03 migrations created global `ops` objects with non-reentrant DDL, while independent integration suites use separate migration tracking schemas against the same physical database. This produced duplicate relation/column errors when a later suite replayed the committed migration set.

Repairs were mechanical and limited to B03 provisional migrations:

- `000011`: `CREATE ... IF NOT EXISTS`, index guard, trigger/policy drop-recreate;
- `000012`: guarded `ADD COLUMN`, named constraint, table, trigger and policy creation;
- `000013`: guarded column/FK/unique creation and old function-signature cleanup.

No B02 migration `000001`–`000010` was rewritten. No B03 function body, effect transition, RLS meaning, publication basis or worker authority was weakened by these replay repairs.

### B. Migration rebuild expectation lagged B03

The migration-runner hostile test still expected the committed set to end at `000010`. It was updated to require `000011`–`000013` as part of both clean rebuild passes.

### C. Same-statement publication test snapshot assumption

One hostile test invoked state-changing `record_publication_intent_once()` in a CTE and attempted to join the newly inserted row in the outer query of the same SQL statement. The test was corrected to execute the state-changing function first, then observe the committed-in-transaction row in a second statement. Production semantics were not changed for this correction.

Run #8 proves the complete repair set together.

---

## 7. Changed-object / invariant map for independent audit

| Object / operation | Primary invariant pressure | Audit attack required |
|---|---|---|
| `async_operation` / `accept_async_operation` | idempotency, immutable accepted identity, context binding | lost response, duplicate, changed payload, concurrent duplicate |
| `effect_position_occurrence` | INV-051/052/053 | illegal transition, rewind, false no-effect, indeterminate preservation |
| `domain_event` | INV-049 | duplicate event, event cannot substitute transport/observation |
| `publication_intent` | INV-050 | mutation, retry basis drift, identity collision |
| `integration_event` | INV-049/050 | materialization mismatch, semantic-version/basis drift |
| `transport_attempt` / `begin_transport_attempt` | INV-049/052/053 | crash before/after possible-send boundary, attempt identity |
| `external_observation` | INV-049 | observation cannot become domain/entitlement authority |
| `job` / `job_attempt` | INV-052/053, resource bound | stale worker, lease expiry, fencing, quota oversubscription |
| reconciliation objects | INV-052/053 | unresolved remains indeterminate; no absence inference |
| `record_domain_event_once` | INV-049 + stable semantic identity | duplicate/conflict and effect establishment ordering |
| `record_publication_intent_once` | INV-050 + effect isolation | immutable basis + child operation separation |
| `claim_jobs` | quota/fairness/concurrency | concurrent claim race and lane isolation |
| `reap_expired_leases` | INV-052/053 | pre-effect retry vs possible-effect reconciliation |

No effective-dated business family is introduced by B03. Worker quota/policy rows are technical resource-control state, not commercial/business truth.

---

## 8. Independent audit gate

The next required independent hostile audit must review the complete post-C1/C2 load-bearing delta, not B03 in isolation:

- B02-C3 usage/lifecycle/offboarding;
- B02-C4 project/governed workspace/session/persistence/entitlement restriction;
- B03 async/event/publication/reconciliation;
- C1/C2 only where the later implementation touches or relies on those boundaries.

The audit should attack code and proof, not accept this narrative as evidence of correctness.

Required disposition is either:

- `PASS — combined post-C1/C2 B02-C3/C4 and B03 hostile audit closed; owner may record B02/B03 successor acceptance under CHG-0008.`

or:

- `FAIL — blockers remain; B04–B06 stay locked.`

Independent PASS still does not merge PR #5 automatically. Project-owner acceptance remains a separate governance action.

---

## 9. Residuals / non-claims

- **B03 is not PASS yet.** Independent hostile audit is still required.
- **PR #5 remains draft and must not be merged without explicit owner/governance authorization.**
- **B04–B06 remain locked** until the combined audit returns PASS and owner acceptance is recorded.
- SSV-1 remains mandatory later under `CHG-0008`; it is deferred to the first genuinely operational procurement MVP and is not waived.
- The previously recorded `nanoid`/F5 dependency advisory remains a later release-hardening blocker, not a B03 semantic blocker.
- This evidence does not claim provider-specific email, billing provider, evidence/files, procurement-domain functionality, P07, AI or release readiness.

**Current disposition:** `AUDIT-READY CANDIDATE — TECHNICAL VERIFICATION GREEN; NO SUCCESSOR UNLOCK YET.`
