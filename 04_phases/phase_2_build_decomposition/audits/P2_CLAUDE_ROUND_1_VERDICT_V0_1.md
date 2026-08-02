# Phase 2 — Claude Hostile Audit Round 1 Verdict v0.1

**Date:** 2026-08-02  
**Status:** EXTERNAL HOSTILE AUDIT / FAIL / ONE PHYSICAL BLOCKER  
**P2.1/P2.2:** OPEN  
**B01-P01:** NOT RELEASABLE  
**Product code:** LOCKED

---

# 1. Verdict

`FAIL — Phase 2 architecture/decomposition remains open; blockers below must be remediated before freeze or build-prompt release.`

Claude found one blocker: the physical architecture did not yet specify concurrency control for frozen cross-row conservation invariants. The previously remediated protocols for cross-store evidence, pooled RLS, external-effect lease expiry, shared-database write ownership and release/version skew all passed independent attack.

---

# 2. Independently executed physical scenarios

- PX-01 command crash/idempotency — identity/recovery PASS; concurrent cross-row correctness FAIL on BL-P21-06.
- PX-02 pooled RLS/worker isolation — PASS, with database-object hardening watches.
- PX-03 cross-store evidence crash/restore — PASS.
- PX-04 external send/lease expiry — PASS.
- PX-05 browser/job/schema/release skew — PASS.
- PX-06 ordinary A0–A3 across 18 blocks — PASS; no P07/connector/account/network/warehouse/chat/AI dependency.
- PX-07 B01 prompt — scope/rollback PASS, but four additions required.

---

# 3. Blocker

## BL-P21-06 — concurrency control for cross-row conservation invariants is unstated

Per-row expected versions under PostgreSQL `READ COMMITTED` do not prevent write skew when two commands read the same aggregate predicate and insert/update different rows.

Affected frozen invariant classes include:

- active leaf allocations must not exceed current authorized quantity;
- minimum/residual drawdown uses one qualifying amount once;
- economic contribution identity permits one value once;
- one active basis for an exclusive declared scope.

The missing physical choice was which mechanism controls each invariant:

- serializable predicate transaction;
- lock of a stable guard/aggregate row;
- materialized counter/version;
- exclusion/unique constraint.

Required remediation:

1. define a `ConcurrencyControlProtocol` and permitted mechanism classes;
2. require every frozen conservation/exclusivity invariant to declare its mechanism and guard identity in the physical ownership/operation manifests;
3. state default transaction isolation and expose explicit per-operation isolation;
4. bind serialization/deadlock retry to safe-retry/effect rules;
5. add real PostgreSQL helper and write-skew tests to B01.

---

# 4. Watches

- W-100 — prohibit and detect `SECURITY DEFINER` or database objects that can mutate execution-context settings.
- W-101 — tenant-owned projections/search/report tables require RLS; query predicates alone are insufficient.
- W-102 — name and enforce the release compatibility-window artifact.
- W-103 — pin PostgreSQL numeric parsers and prove decimal-string round trips.
- W-104 — state where registered calculations execute and how SQL/application equivalence binds policy versions.
- W-105 — define reproducible source-cut mechanisms for load-bearing metric/report execution.
- W-106 — close B06/B07 dependence on response schema/field registry currently located in B08.
- W-107 — require block-local security/NFR evidence so B14 cannot become a deferral bucket.
- W-108 — include full PA-G1–PA-G15 definitions in the next packet.
- W-109 — include the actual block graph, requirement traceability, module/runtime and NFR proof maps in the next evidence bundle.
- W-110 — name the independent reviewer role for B01 completion.
- W-111 — make Arabic search relevance a named B12 decision/proof gate.

---

# 5. Gate result

- PA-G1–PA-G5: PASS
- PA-G6 command/concurrency correctness: FAIL on BL-P21-06
- PA-G7–PA-G15: PASS, with watches above

Regression:

- Phase 1 reopen: NO
- SECOND XL: CLEAN
- A0–A3: CLEAN
- P07 sole XL: CLEAN
- product-code lock: INTACT

---

# 6. Readiness

- Freeze readiness: NOT READY pending BL-P21-06.
- B01 readiness: NOT RELEASABLE as drafted.
- Topology/state authority/cross-store/effect/release/block ordering remain sound and do not need reopening.