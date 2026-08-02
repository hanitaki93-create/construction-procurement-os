# Phase 2 — Internal Post-Claude Round 1 Recheck v0.1

**Date:** 2026-08-02  
**Status:** PASS / CLAUDE ROUND 2 READY  
**Candidate:** P2.1 v0.3 / P2.2 v0.2 / B01-P01 v0.2  
**Code:** LOCKED

---

# 1. Verdict

`PASS — BL-P21-06 and W-100–W-111 are closed. P2.1/P2.2 and B01-P01 are ready for Claude Round 2 hostile audit.`

This internal result does not freeze Phase 2 or authorize code.

---

# 2. Concurrency hostile replay

The recheck executed 74 concurrency-specific paper/database-design scenarios in addition to the prior 128 physical scenarios.

## 2.1 Allocation write skew

Scenario:

- authorized basis capacity 100;
- existing allocation 60;
- concurrent commands add 30 and 20 to different child rows.

Unprotected READ COMMITTED negative control:

- both may read 40 remaining and commit;
- total becomes 110;
- confirms expected row versions on children are insufficient.

CC-2 result:

- both derive and lock the same AuthorizedRequirementBasis guard;
- second command waits;
- first commits 30, second recomputes residual 10 and returns typed invariant conflict;
- total remains 90.

CC-4 result:

- serializable predicate causes one transaction to abort/retry;
- retry under the same logical identity recomputes and fails the business guard;
- total remains 90.

Verdict: PASS.

## 2.2 One-value-once/contribution race

- concurrent different rows reference the same economic contribution identity;
- CC-2 locks the conservation lineage;
- CC-3 unique contribution identity is the race-safe backstop;
- one commits, one receives deterministic duplicate/conservation conflict;
- no double count.

Verdict: PASS.

## 2.3 Minimum/residual drawdown

- two commands draw against one residual lineage;
- both lock the same lineage guard in registered order;
- qualifying amount/prior applications/residual are recomputed under lock;
- applied credit equals the minimum at each serialized step;
- unique contribution identity prevents reuse.

Verdict: PASS.

## 2.4 Exclusive active scope

- exact normalized/effective scope uses partial unique/GiST exclusion constraint;
- two concurrent activations cannot both commit;
- predicate scope not exactly constraint-representable uses serializable profile;
- no implementation may substitute an application pre-check.

Verdict: PASS.

## 2.5 Multiple guard rows/deadlock

- all profiles define tenant-scoped guard-key tuple and ascending lock-order rank;
- correct order completes;
- reversed test fixture creates a detectable deadlock/timeout negative control;
- safe profile retries only before external effect and preserves logical identity;
- exhaustion is typed, not hidden.

Verdict: PASS.

---

# 3. B01 foundation recheck

B01-P01 v0.2 now requires:

- explicit isolation parameter and proof through `transaction_isolation`;
- write-skew negative control;
- guard-row and serializable protected fixtures;
- deadlock/lock-order fixture;
- `ConcurrencyProfileVersion` and `PhysicalWriteOwnershipManifest` validators;
- architecture test proving no raw pool/client public surface;
- exact numeric string parser/round-trip tests;
- database-object security catalog scan;
- ReleaseCompatibilityManifestVersion scaffold;
- block-local security/NFR evidence;
- independent reviewer roles.

No tenant/business table or semantic invariant is implemented in B01. The tests use technical fixtures only.

Prompt scope: PASS.

Rollback remains repository revert and scoped local infrastructure teardown: PASS.

---

# 4. W-100–W-111 result

- W-100: closed by prohibited context mutation and catalog scan.
- W-101: closed; projections/search/report/export/control tables are RLS tenant tables.
- W-102: closed; `ReleaseCompatibilityManifestVersion` named and enforced.
- W-103: closed; numeric OIDs remain strings with real round-trip tests.
- W-104: closed; exact-decimal TypeScript reference executor and versioned SQL equivalence rule.
- W-105: closed; three reproducible source-cut modes.
- W-106: closed; B06 defines response schema before issue, B08 normalizes prospectively.
- W-107: closed; block-local evidence mandatory in completion template v0.2.
- W-108: Round-2 packet enumerates PA-G1–PA-G15.
- W-109: Round-2 evidence bundle includes actual candidate, graph, traceability, maps and prompt.
- W-110: independent reviewer roles named.
- W-111: B12 ArabicSearchRelevanceDecision named.

---

# 5. Decomposition regression

- major blocks: 18;
- cycles: 0;
- B02 execution kernel before business tables: preserved;
- B03 effect recovery before communication/connectors: preserved;
- B06/B07 schema forward dependency: removed;
- B14 security/NFR deferral risk: removed;
- B16/B17 V4 gate: preserved;
- B18 V6 gate: preserved;
- requirements mapped: 92/92;
- physical proof mapped: 19/19;
- external validation mapped: 5/5;
- architecture gaps: 0.

---

# 6. PA-G1–PA-G15

- PA-G1 one physical owner/write path — PASS
- PA-G2 command acceptance/idempotency/concurrency/effect safety — PASS
- PA-G3 evidence payload/metadata coherence — PASS
- PA-G4 async/indeterminate recovery — PASS
- PA-G5 tenant/project/context isolation — PASS
- PA-G6 derived stores cannot write truth — PASS
- PA-G7 correction/contribution/report history — PASS
- PA-G8 external no-account/manual path — PASS
- PA-G9 UI operations/disclosure/recovery/versioning — PASS
- PA-G10 measurable NFR structure — PASS; physical execution later
- PA-G11 restore authority/evidence/idempotency/holds/history — PASS as protocol; exercise later
- PA-G12 AI absent/replaceable — PASS
- PA-G13 no second XL/generic platform — PASS
- PA-G14 bounded acyclic decomposition — PASS
- PA-G15 code lock/authorization honesty — PASS

---

# 7. Regression

- Phase 1 reopen: NO
- accepted ADR conflict: NONE
- A0–A3 dependency regression: NO
- P07 premature activation: NO
- AI dependency: NO
- second XL: CLEAN
- product code: NOT STARTED / LOCKED

---

# 8. Final internal closure answer

No later builder must choose the concurrency mechanism for a frozen invariant by convenience. The mechanism class, guard/constraint/isolation, lock order, retry behavior and proof ownership are now declared before implementation.

Proceed to Claude Round 2. Do not freeze or execute B01 before external PASS.