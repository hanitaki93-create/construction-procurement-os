# B02 Invariant Reconciliation 002 — C1/C2 Hostile Audit Remediation

**Date:** 2026-08-09  
**Status:** FROZEN B02 PHYSICAL-INVARIANT RECONCILIATION  
**Discovered during:** independent B02 C1/C2 hostile checkpoint audit  
**Semantic reopen:** NO  
**Upstream authority:** CHG-SSS-001 §§8–11/13, P2.1 SSS invariant overlay, INV-SSS-018  
**Physical remediation:** `migrations/sql/000005_b02_c1_c2_hostile_audit_remediation.sql`

---

# 1. Purpose

The C1/C2 offline hostile audit found one real C1 policy gap, one real entitlement-guard coupling gap, one narrower entitlement-composition ambiguity, and two implementation controls that required explicit ownership before C3.

This reconciliation records the missing physical invariants before C3 implementation. It does not reopen procurement semantics, B01, P07 or CHG-SSS-001.

---

# 2. INV-SSS-018 refinement — bootstrap tenant origin

The existing pre-tenant bootstrap invariant is strengthened physically:

> Initial legal entity, principal, membership, OWNER role and authority-context rows may be created by the bootstrap runtime only after the exact target Tenant row has itself been created by the same bootstrap lineage.

A caller-created `TenantBootstrapIntent` that merely names an existing tenant is insufficient.

Physical proof requires an immutable/bootstrap-origin binding on the Tenant row plus RLS checks tying every initial-lineage insert to that origin.

This is a refinement of INV-SSS-018, not a new business invariant.

---

# 3. INV-SSS-019 — Entitlement contribution coherence

**Invariant:** Multiple simultaneously effective subscription components may contribute to the same entitlement key only when they reference the same exact entitlement-definition version and, for metered limits, the same exact usage-measure-definition version. Different semantic versions may not be silently combined.

**Class:** `VERSION_BINDING / NON_SUBSTITUTION`

**Owner:** B02-C2.

**Concurrency:** YES.

**Combination grammar when semantic versions match:**

- `CAPABILITY + CAPABILITY` → enabled; preserve all exact contributing sources;
- finite `METERED_LIMIT + finite METERED_LIMIT` → additive exact quantity;
- `UNBOUNDED + finite/UNBOUNDED` → `UNBOUNDED`; preserve all exact contributing sources;
- `CAPABILITY` versus `METERED_LIMIT` under one entitlement key → conflict/fail closed;
- different usage-measure definition version under one entitlement key → conflict/fail closed;
- different entitlement-definition version under one entitlement key → conflict/fail closed.

**Physical enforcement:** database compatibility trigger across overlapping current subscription-item versions plus resolver fail-closed semantics. The database is authoritative against races.

---

# 4. INV-SSS-020 — Subscription lifecycle transition legality

**Invariant:** Subscription lifecycle occurrences remain append-only, sequence-contiguous and deterministic. A new occurrence must produce a legal transition across the complete effective-time timeline known after that insertion.

**Class:** `STATE_MACHINE / IMMUTABILITY`

**Owner:** B02-C2 substrate; later product/API surfaces invoke the same operation semantics.

**Concurrency:** YES.

**Initial transition grammar:**

- `INACTIVE → ACTIVATED → ACTIVE`;
- `INACTIVE → CANCELLED` permitted;
- `INACTIVE → EXPIRED` permitted;
- `ACTIVE → SUSPENDED`;
- `ACTIVE → CANCELLED`;
- `ACTIVE → EXPIRED`;
- `SUSPENDED → RESUMED → ACTIVE`;
- `SUSPENDED → CANCELLED`;
- `SUSPENDED → EXPIRED`;
- `CANCELLED` is terminal;
- `EXPIRED` is terminal.

`ACTIVATED` twice, `RESUMED` without `SUSPENDED`, and any event after a terminal state fail closed.

Future-effective and late-recorded events are permitted only when the complete effective timeline remains legal. Sequence identity remains append order; effective time remains business-time ordering.

**Concurrency mechanism:** contiguous sequence uniqueness plus the tenant entitlement-authority guard/transaction protocol; no read-then-write state transition outside the governed mutation transaction.

---

# 5. INV-SSS-021 — Material entitlement mutation / guard coupling

**Invariant:** Every material mutation that can change resolved product entitlement must prove that the same transaction advances the tenant entitlement-authority guard after the last such mutation and before commit.

**Class:** `VERSION_BINDING / CONCURRENCY_GUARD`

**Owner:** B02-C2.

**Material C2 mutations include at minimum:**

- append subscription lifecycle occurrence;
- insert subscription-item business version;
- supersede subscription-item business version.

Stable empty container creation alone does not establish entitlement and need not advance the guard.

**Physical mechanism:** each material row records the guard baseline observed at mutation; guard advancement records a technical transaction identity; deferred constraint triggers require current guard > baseline and the last advancement transaction to equal the material-write transaction.

The transaction identity is technical enforcement metadata only. It is not commercial/business truth.

A guard increment without a material change may invalidate previews unnecessarily but cannot grant business authority. A material change without same-transaction guard advancement must fail at commit.

---

# 6. INV-SSS-017 clarification — product-version immutability

Product catalog version rows and their exact entitlement grants are immutable after insertion in the current C2 substrate.

Until a governed product-catalog publication operation is introduced, correction means a new version, not in-place rewrite.

This prevents a bound customer subscription from changing meaning because a product administrator edits an old offering/definition row.

A later product-publication lifecycle may be added as a separate append-only/versioned control, but it may not mutate the semantic content already referenced by tenant subscription history.

---

# 7. Reverse-map additions

| Object / operation | Invariant references |
|---|---|
| Tenant bootstrap target Tenant | INV-SSS-007, INV-SSS-008, INV-SSS-018 |
| bootstrap initial-lineage inserts | INV-SSS-007, INV-SSS-008, INV-SSS-018 |
| TenantSubscriptionItemVersion insert | INV-SSS-001, INV-SSS-003, INV-SSS-004, INV-SSS-017, INV-SSS-019, INV-SSS-021 |
| TenantSubscriptionItemVersion supersession | INV-SSS-003, INV-SSS-004, INV-SSS-017, INV-SSS-021 |
| SubscriptionLifecycleOccurrence insert | INV-SSS-003, INV-SSS-005, INV-SSS-009, INV-SSS-020, INV-SSS-021 |
| ProductOfferingVersion / entitlement grants | INV-SSS-002, INV-SSS-017, INV-SSS-019 |
| entitlement resolver | INV-SSS-002, INV-SSS-003, INV-SSS-004, INV-SSS-017, INV-SSS-019 |

---

# 8. Required hostile proofs before C2 checkpoint acceptance

1. bootstrap intent naming an existing tenant cannot create any initial authority row;
2. ordinary bootstrap still creates its exact tenant/OWNER lineage;
3. material lifecycle/item mutation without same-transaction guard advance fails at commit;
4. material mutation with correct expected guard and same-transaction +1 succeeds;
5. different entitlement-definition versions under one effective entitlement key fail closed across independent slots;
6. different usage-measure-definition versions under one effective entitlement key fail closed;
7. finite matching metered grants remain additive;
8. `UNBOUNDED` absorbs finite while preserving all contributing sources;
9. lifecycle illegal resume/double activation/post-cancel resurrection fails;
10. bound product version/grant cannot be rewritten in place;
11. exact public-surface negative probes remain fail closed.

---

# 9. Disposition

`ARCHITECTURE REOPEN = NO`

`CHG-SSS-001 REOPEN = NO`

`B01 REOPEN = NO`

`NEW/REFINED PHYSICAL INVARIANTS = YES / REGISTERED BEFORE C3`

C3 remains locked until migration/test verification confirms this reconciliation on the exact branch head.
