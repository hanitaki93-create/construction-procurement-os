# Phase 2 — Claude Round 2 Verdict v0.1

**Date:** 2026-08-02  
**Status:** FAIL / ONE COMPLETENESS BLOCKER  
**P2.1/P2.2:** OPEN  
**B01-P01:** LOCKED

---

## VERDICT

`FAIL — Phase 2 architecture/decomposition remains open; blockers below must be remediated before freeze or build-prompt release.`

Round 2 independently confirmed that BL-P21-06 is closed. The `ConcurrencyControlProtocol`, guard-row locking, exact constraints, serializable fallback, idempotency/retry boundary, pooled RLS, cross-store evidence, external-effect recovery, version compatibility, A0–A3 independence and all W-100–W-111 remediations passed.

One blocker remains.

---

## BL-P21-07 — invariant-register completeness is not obligated

The enforcement system is complete for registered invariants, but no artifact proves that every frozen Phase 1 invariant is registered.

Concrete missed invariant:

`EFFECTIVE_PERIOD_NON_OVERLAP`

P1.4 freezes one authoritative writer per fact per effective period. A natural two-row supersession implementation can race under READ COMMITTED:

1. two transactions read the same active version;
2. both close it;
3. both insert a replacement;
4. overlapping active effective periods result with no row-version conflict.

This is exactly representable by CC-3 exclusion/partial-unique constraints where the scope/range is exact, with CC-4 serializable fallback where it is not.

Required narrow remediation:

1. compile an exhaustive versioned invariant register from the frozen Phase 1 contracts and 92-requirement traceability set;
2. give every invariant a stable ID, class, source clause, participating objects, owning block, concurrency sensitivity, mechanism and test obligation;
3. add `EFFECTIVE_PERIOD_NON_OVERLAP` explicitly;
4. enforce completeness bidirectionally:
   - every frozen clause maps to one or more invariant/register dispositions;
   - every mutable object/operation maps back to all participating invariants;
5. fail CI/activation when either direction is incomplete;
6. require every block completion manifest to declare that no new frozen invariant was encountered without a register entry.

---

## WATCHES W-112–W-119

- W-112: guard rows must exist before locking; define eager or insert-on-conflict materialization.
- W-113: define one global total order for multiple guard acquisition.
- W-114: pin all lossy PostgreSQL type decoders, including `int8`, not only `numeric`.
- W-115: define SQL division/intermediate scale equivalence to the TypeScript decimal executor.
- W-116: B01 concurrency fixtures must live in an isolated test-only schema, not product migrations.
- W-117: define an achievable independent-review mechanism for a single-operator build.
- W-118: give B01 internal checkpoints because its foundation scope is large.
- W-119: provide actual register/graph/traceability/proof/B01 artifacts in the next audit package rather than summaries only.

---

## REGRESSION

- Phase 1 reopen: NO
- topology change: NO
- second XL: CLEAN
- A0–A3 independence: CLEAN
- P07 sole XL: CLEAN
- product code lock: INTACT

The remaining defect is the completeness boundary of one physical protocol, not a new architecture front.