# P1.5 — Internal Recheck After Claude Round 1 v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL PASS / CLAUDE ROUND-2 READY  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

## Verdict

`PASS — Claude round-1 P1.5 blockers are internally closed; prepare self-contained round-2 hostile review.`

This is not final P1.5 PASS.

---

# BL-14 — tax authority

**PASS.**

Recheck:

- `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` is a named product commercial fact, not statutory VAT liability.
- It is emitted only when an activated versioned certificate policy gives the OS authority to calculate that commercial component.
- statutory tax point/date-of-supply, invoice/e-invoice, credit-note/adjustment and liability/posting/payment bind separate P1.4 authority profiles;
- default statutory posture remains external MIRROR/REFERENCE/OUT according to deployment;
- one load-bearing tax fact has one authority source/profile per effective period;
- statutory divergence creates reconciliation and, if warranted, separate governed corrections rather than co-master overwrite.

Counterexample test: certificate commercial tax = 5, later statutory date-of-supply/tax invoice produces a different authoritative statutory amount/time.

Result: two differently named facts remain historically interpretable; statutory source owns statutory truth; certificate history remains bound to its commercial calculation policy; no duplicate authority for one fact.

**BL-14 CLOSED internally.**

---

# BL-15 — effect subject/conservation grain

**PASS.**

Recheck:

Every monetary effect now resolves to exactly:

`Commitment + COMPONENT(EconomicComponentKey)`

or

`Commitment + OBLIGATION(ObligationEffectKey)`.

No third implicit grain exists.

The dimension/subject matrix is closed for the current candidate.

Minimum test:

- minimum obligation uses one stable ObligationEffectKey;
- qualification credit uses the same obligation lineage;
- applied credit is capped to residual-before-credit;
- excess call-off value remains ordinary call-off obligation/evidence and cannot produce negative/transferable floor credit by accident.

Component test:

- `CERTIFIED_GROSS` is component-only;
- retention is component-only;
- ad hoc component fallback is forbidden;
- component mapping is created only through governed `DefineEconomicComponentMapping` and preserves prior contribution.

Advance test:

- advance outstanding never enters certified gross;
- recoupment affects advance/net-payable semantics, not gross certified value.

Cross-grain test:

- movement between component and obligation subjects requires explicit mapping/reclassification/correction;
- issuing a new effect at a different subject cannot reset conservation.

**BL-15 CLOSED internally.**

---

# BL-16 — lifecycle closed membership/completeness

**PASS.**

The candidate membership set is now named and finite:

`P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md`

`TX-001` through `TX-056`.

Membership is selected by the frozen P1.4 load-bearing test, not by schema convenience.

Each product state-changing member requires:

1. source state/context;
2. bounded command/action;
3. guards/invariants;
4. authority/control;
5. result event/state;
6. economic effect or explicit NONE/scope/external class;
7. correction/reversal/supersession;
8. concurrency/idempotency;
9. evidence/config/version binding.

Coverage sources:

- original P01–P12 lifecycle matrix;
- completeness hardening for direct source/invoice/actual/forecast;
- Claude round-1 remediation for effect subject/component mapping;
- transition supplement for late/cross-cutting register members.

Spot checks:

- direct source has current-basis/DOA/idempotent award contract;
- component mapping has no-conflict conservation guard and stable mapping identity;
- invoice match cannot mutate commercial truth merely to pass;
- authority transfer preserves one effective source/profile and in-flight disposition;
- evidence disposal does not reverse domain history;
- residency migration has cutover/in-flight/copy-disposition evidence;
- actual milestone cannot be manually overwritten when a canonical source event is authoritative.

GT1–GT4 are explicitly coverage/execution samples only.

Future transaction membership is prospective controlled change and must carry the same full contract before activation.

**BL-16 CLOSED internally.**

---

# Claude watch recheck

## W — minimum over-credit

PASS. Applied credit is capped to residual-before-credit; excess does not become negative/transferable minimum credit by default.

## W — advance vs certified gross

PASS. Advance outstanding/recoupment is separate from `CERTIFIED_GROSS`.

## W — component fallback authority

PASS. `DefineEconomicComponentMapping` is a governed P07 action; downstream mechanisms/agents cannot invent keys.

## W — closed profile language

PASS. The profile set is exactly seven named semantic profiles; new profile requires controlled prospective change.

---

# Gate recheck

- G1 Structural root/decomposability — **PASS**
- G2 Commitment/minimum/effect-subject/conservation — **PASS**
- G3 balances/money/FX/tax/correction/temporal — **PASS**
- G4 lifecycle completeness/transition contract — **PASS**
- G5 authority/workflow/config/concurrency/numbering — **PASS**
- G6 accounting/invoice/tax/regional seam — **PASS**
- G7 long-lead/status/direct-source — **PASS**
- G8 GT1–4/Ceiling/Closed Subgraph/A0–A3 — **PASS**
- G9 one-XL/object explosion/AI bounded-action future — **PASS**

---

# Regression recheck

- P1.1 REOPEN = **NO**
- P1.2 REGRESSION = **NO**
- P1.3 REOPEN = **NO**
- P1.4 REOPEN = **NO**
- SECOND XL = **CLEAN**
- A0–A3 ACTIVATION = **CLEAN**

FT-02/06/09/10 remain evidence debt; none was promoted to proven universal practice.

---

# ADR posture

No status changes are made before Claude round-2 review.

Round-1 candidate impact remains under review for:

- ADR-0003
- ADR-0004
- ADR-0007
- ADR-0008
- ADR-0009
- ADR-0010
- ADR-0011
- ADR-0013
- ADR-0015
- ADR-0019
- ADR-0022
- ADR-0023

ADR-0006, ADR-0016 and ADR-0017 remain later-owned/non-blocking unless Claude identifies a direct semantic dependency.

---

# Readiness

**External hostile review readiness: READY.**

**P1.6 readiness: NOT YET — Claude round-2 PASS and final P1.5 checkpoint/ADR reconciliation still required.**
