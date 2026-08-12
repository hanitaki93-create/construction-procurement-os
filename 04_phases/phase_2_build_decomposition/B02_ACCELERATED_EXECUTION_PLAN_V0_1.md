# CPOS Accelerated Build Execution Plan v0.1

**Date:** 2026-08-11  
**Status:** ACTIVE EXECUTION PLAN — NON-SEMANTIC / NON-FROZEN  
**Authority:** Owner direction to increase implementation throughput without reducing quality  
**Frozen semantics:** unchanged

---

## 1. Purpose

Increase build throughput by working in larger coherent implementation slices, reducing unnecessary micro-audit interruption, and moving routine verification onto available self-hosted compute where useful.

This plan changes **execution cadence only**. It does not supersede the frozen Phase-2 architecture, invariant register, block ownership, dependency graph, SSV gates, security requirements or block-completion criteria.

---

## 2. Quality rule

Acceleration means:

- larger coherent implementation batches;
- fewer stop/start audit cycles for ordinary code;
- one implementation lead maintaining cross-domain coherence;
- targeted hostile verification at load-bearing boundaries;
- routine UI/CRUD/navigation code proven primarily through deterministic tests and product use rather than architecture-level hostile review.

Acceleration does **not** mean weakening:

- tenant/RLS isolation;
- authority/DOA separation;
- append-only or effective-dated truth;
- concurrency and idempotency controls;
- exact commercial/financial arithmetic;
- irreversible state-transition controls;
- audit/evidence lineage;
- frozen invariant coverage.

Any later-discovered concrete regression into the closed C1/C2 substrate is fixed surgically; C1/C2 are not reopened as a general architecture exercise.

---

## 3. Immediate active wave — complete B02

C1/C2 are independently closed at audited SHA `76d5c260cf48c4b3bce842687d3cbe1690b228d8`.

The next implementation cycle should treat the remaining B02 work as one coordinated engineering wave while preserving the distinct checkpoint evidence:

### B02-C3 — Usage / Lifecycle / Offboarding

Complete the remaining production substrate for:

- append-only `MeteredUsageOccurrence` persistence;
- idempotent/correlated usage recording;
- exact derived usage position with no mutable authoritative balance;
- explicit consume/credit/correction occurrences;
- actor/reason/evidence on governed adjustments;
- usage-conservation and concurrency enforcement;
- dedicated runtime/RLS consistent with the C1/C2 execution model;
- lifecycle/offboarding read and export floor;
- preservation of historical entitlement/commercial meaning after expiry/downgrade;
- correct guard ordering where a transaction materially changes entitlement authority.

### B02-C4 — Self-Service Product Surface

Complete the first coherent conventional product surface for:

- sign-in/auth callback shell;
- signup/bootstrap;
- company/tenant context;
- first project creation/context;
- membership/user administration within authority;
- subscription/account state;
- clear restriction, expiry and offboarding states.

C3 and C4 may be engineered in one concentrated implementation cycle where their interfaces interact, but each checkpoint must retain its own acceptance evidence.

### B02 completion remains required

Before B03 is formally unlocked, B02 still requires:

- C3 PASS;
- C4 PASS;
- required B02 hostile/invariant/security evidence;
- SSV-1 RollingComprehensionCheckpoint PASS;
- independent B02 block review;
- final B02 completion evidence.

No acceleration shortcut changes those conditions.

---

## 4. Subsequent high-throughput path

After full B02 PASS:

1. **B03** — async/event/publication/reconciliation + usage/event support.
2. **B04 → B05 → B06 rapid sequential cycle** — evidence/files/communication → requirements/allocation → sourcing/RFQ/issue.
3. **B07 → B08 → B09 rapid sequential cycle** — supplier submissions/revisions → normalization/comparison → recommendation/approval/award/handoff.
4. **B10/B11 → B12** — internal/external UX consolidation → dashboard/reporting/search/export/product analytics.

The goal is to reach a genuinely operable deterministic procurement product by B09 and then consolidate it into the dashboard/product experience through B10–B12.

Blocks remain semantically ordered even when implemented back-to-back in one working cycle. A successor does not acquire formal authority merely because its code was prepared quickly.

---

## 5. Audit-intensity policy

Use hostile independent review primarily where failure can corrupt or leak system truth, including:

- tenant isolation;
- authority/DOA;
- immutable/effective-dated commercial history;
- concurrency/idempotency;
- financial or allocation conservation;
- irreversible approval/award/commitment transitions;
- evidence lineage and security boundaries.

Use deterministic automated tests plus direct product validation for routine presentation and workflow plumbing unless a concrete semantic risk appears.

This policy is an execution heuristic only; any frozen gate explicitly requiring independent review remains mandatory.

---

## 6. Compute policy

GitHub remains the control plane for source, PR lineage and CI evidence.

GitHub-hosted compute may be replaced by a GitHub self-hosted runner on an available Linux VPS without changing CPOS architecture or evidence semantics, provided the runner is isolated operationally and does not destroy unrelated workloads or data on the host.

The existing ETH simulation VPS is a compute host only; legacy ETH simulator/RTK assets remain preserved and dormant unless separately authorized.

---

## 7. Current state

**Active next scope:** B02-C3 + B02-C4 completion wave.

**Blocked only by:** implementation/verification of the remaining B02 scope and its existing completion gates — not by C1/C2.
