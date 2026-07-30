# P1.5 — Commercial Core — Entry Handoff v0.1

**Date:** 2026-07-30  
**Status:** P1.5 UNLOCKED / READY TO START  
**P1.4:** PASS / CLOSED / FROZEN  
**Product code:** LOCKED / NOT STARTED

---

## 1. Canonical orientation

GitHub is canonical truth.

Before making P1.5 structural claims, read in this order:

1. `PROJECT_STATE.md`
2. `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`
3. `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`
4. `P1_4_FINAL_VERDICT.md`
5. `P1_4_FINAL_CHECKPOINT_V1_0.md`
6. current `02_research/control/adr_log.csv`
7. P1.2 final verdict/reconciliation and current P07/P08/sourcing operational checkpoints as needed
8. P1.3 final verdict/checkpoint only where competitor semantics are genuinely needed

Do not restart broad competitor research.

Do not start product code.

---

## 2. P1.5 objective

P1.5 must produce **one internally consistent Commercial Core model of data, commercial value, lifecycle and authority**.

It is not four independent sequential design exercises.

The four roadmap tracks are concurrent and must continuously reconcile against one another:

### P1.5a — Entities & Master Data

- entity dictionary;
- attributes/types;
- cardinalities;
- master vs transaction;
- numbering;
- immutability;
- revision semantics;
- P1.4 ownership inheritance.

### P1.5b — Cost Ledger & Posting Semantics

- commercial financial-event types;
- canonical derivation for every commercial balance;
- pending/approved/committed semantics;
- certification;
- actual/paid distinction;
- retention;
- forecasts;
- reversal/adjustment;
- financial periods;
- cut-off/backdating;
- multi-currency/FX;
- tax timing;
- external GL/AP seam.

### P1.5c — Lifecycles & State Machines

For every SPINE transaction:

- states;
- transitions;
- guards;
- side effects;
- emitted events;
- reversibility;
- supersession/cancellation.

### P1.5d — Authority / Approval / Audit / Concurrency

- role/permission model;
- approval policies;
- authority limits;
- delegation;
- ball-in-court;
- audit-event catalogue;
- simultaneous-edit/concurrency rules.

---

## 3. Frozen P1.4 constraints P1.5 may not reinterpret

P1.5 must inherit, not reopen by convenience:

- tenant isolation including model-mediated/cross-tenant AI use;
- ContractingAuthorityContext semantics;
- tenant-private supplier business relationships;
- internal authorization vs external-grant non-bypass;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- frozen `load-bearing` test;
- evidence provenance/immutability/supersession semantics;
- offboarding, bounded retention/disposition and tombstone semantics;
- tenant-level declared residency boundary and governed migration;
- load-bearing config/version binding and live-security distinction;
- product commercial truth vs external accounting truth;
- connector is never business authority;
- P07 as sole independent XL;
- A0–A3 independence;
- agents/future AI act through bounded domain operations and do not become arbitrary truth writers.

A physical model that makes one of these invariants difficult is a model defect, not a reason to weaken P1.4.

---

## 4. P1.5 load-bearing catalogue obligation

P1.5 must apply the frozen test to concrete facts/events/configuration.

A value is load-bearing where governed outcome dependence, counterfactual materiality or reconstruction necessity requires its governing authority/version/context.

P1.5 may catalogue and refine object placement/cardinality. It may not redefine the selection criterion.

If evidence is insufficient for an exact business mechanic, mark the mechanic falsifiable/open rather than silently promote a hypothesis into a core invariant.

---

## 5. P1.2 evidence debt still binding

Carry forward without invention:

- FT-02 — RequirementAllocation exact mechanics;
- FT-06 — remeasurement conservation;
- FT-09 / CR-02 — rectification/replacement capacity;
- FT-10 — one active exclusive-scope authority.

CR-02 remains mandatory before P07 fulfillment implementation.

---

## 6. P1.5 roadmap-specific audit/history invariant

P1.5 must define append-only commercial/audit history compatible with later controlled redaction/tombstoning.

It must preserve:

- immutable record/event identity;
- commercial/financial meaning and derived-balance integrity;
- referential integrity;
- evidence that a redaction/tombstone action occurred;
- authority/audit trail for that action.

P1.6/P1.10 may elaborate exact privacy/retention/hold policy without requiring redesign of the P1.5 substrate.

---

## 7. Projection evolution

Adding future event/entity types must not silently rewrite historical event meaning.

Projection/derivation changes must be versioned/identifiable and traceable to controlled architecture change.

Recalculation behavior and effective applicability must be explicit.

The requirement is reproducibility, not freezing every formula forever.

---

## 8. Open ADR priorities entering P1.5

Structural/commercial decisions requiring active treatment include:

- ADR-0003 — procurement structural root;
- ADR-0004 — PO/Subcontract physical composition;
- ADR-0008 — workflow engine breadth;
- ADR-0009 — configuration breadth;
- ADR-0010 — GCC semantics / evidence debt;
- ADR-0011 — budget/cost attribution timing;
- ADR-0015 — posting/finalization/reversal/correction physical semantics;
- ADR-0019 — physical temporal model;
- ADR-0022 — money representation/rounding/calculation order;
- ADR-0023 — numbering/concurrency/fiscal rules.

ADR-0006 integration depth remains open but does not justify designing a connector prerequisite into A0–A3.

---

## 9. One-XL guard

P07 commitment/change/valuation/commercial truth remains the only independent XL gravity well.

Reject P1.5 designs that accidentally create another independent ledger/control gravity well in:

- RequirementAllocation;
- workflow;
- evidence/audit;
- integration;
- accounting mirror;
- identity/authorization;
- AI/agent memory;
- scheduling;
- CDE;
- supplier network.

---

## 10. First working sequence

Create `P1_5_WORKPLAN_V0_1.md` before physical modelling.

The workplan should:

1. define the concurrent reconciliation loop across P1.5a–d;
2. define the canonical commercial-event/balance questions that drive all four tracks;
3. build a provisional load-bearing fact/event catalogue from P01–P12;
4. identify the exact open ADRs/evidence debts that can block entity/lifecycle freeze;
5. define golden-thread checkpoints while modelling, not only at the end;
6. define Ceiling Test and Closed Sub-graph Gate execution;
7. explicitly protect redaction/tombstone compatibility and projection reproducibility;
8. keep P07 as sole XL;
9. keep A0–A3 independently viable;
10. keep product code locked.

Do not begin by drawing database tables.

---

## 11. P1.5 gate

P1.5 cannot close until:

- every derived balance has one canonical derivation over commercial financial events;
- every SPINE transaction has a complete lifecycle;
- every transition names guard, authority, financial effect, event and reversibility;
- golden threads 1–4 execute on paper with zero architecture invention;
- P1.5 Ceiling Test passes;
- P1.5 Closed Sub-graph Gate passes;
- hostile red-team gate passes.

---

## 12. Current transition

**P1.4 CLOSED / FROZEN.**  
**P1.5 COMMERCIAL CORE UNLOCKED / NEXT ACTIVE STAGE.**  
**Product code remains LOCKED.**
