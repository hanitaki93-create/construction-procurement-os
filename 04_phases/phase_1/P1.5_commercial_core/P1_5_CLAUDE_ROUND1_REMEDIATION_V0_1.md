# P1.5 — Claude Round-1 Remediation v0.1

**Date:** 2026-07-31  
**Status:** BINDING CANDIDATE REMEDIATION / RECHECK REQUIRED  
**Parent:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_2.md` + `P1_5_COMPLETENESS_HARDENING_V0_1.md`  
**Claude blockers:** BL-14 / BL-15 / BL-16  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. BL-14 — Tax authority binding

## T01 — tax fact classes are distinct

The following are not one fact and may not be co-mastered:

1. `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` — product commercial certificate calculation component;
2. statutory tax point/date-of-supply;
3. statutory tax invoice/e-invoice fact;
4. statutory tax credit-note/adjustment fact;
5. statutory tax liability/posting/payment fact.

Each load-bearing tax fact binds exactly one P1.4 authority profile (`OWN / MIRROR / REFERENCE / OUT`) per effective period.

## T02 — default V1 authority profile

Default V1 posture:

- statutory tax point/date-of-supply = `MIRROR / REFERENCE / OUT` from externally authoritative tax/accounting source as deployment permits;
- statutory tax invoice/e-invoice = `MIRROR / REFERENCE / OUT` unless a future explicitly supported deployment makes the OS authoritative for that exact fact;
- statutory tax liability/posting/payment = external accounting/tax authority;
- product may `OWN` `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` only when the activated commercial certificate calculation profile explicitly requires the OS to calculate that commercial certificate component.

Absence of that activated profile means the OS does not invent or own a certificate-tax amount.

## T03 — no dual authority when statutory tax timing diverges

If statutory tax timing/value later diverges from the commercial certificate calculation:

- product-owned certified commercial gross and historical commercial certificate tax component remain interpreted under their bound certificate policy/version;
- statutory tax point/invoice/credit-note/liability follows the externally authoritative statutory source/profile;
- reconciliation may expose the difference;
- external tax divergence does not mutate certified commercial truth unless a separate governed commercial correction is actually required;
- commercial correction may create or relate to an external statutory adjustment/credit note, but the OS does not become VAT/AP journal authority by implication.

Therefore there is no co-master: the two values are different named facts with different authority purposes.

## T04 — effect dimension rename

The ambiguous `CERTIFICATE_TAX_COMPONENT` dimension is superseded for the current candidate by:

`COMMERCIAL_CERTIFICATE_TAX_COMPONENT`

It means only a product-owned commercial certificate calculation component under an activated profile. It must never be labelled or consumed as statutory VAT liability without the separately authoritative statutory fact.

**BL-14 remediation status: CLOSED internally, external recheck required.**

---

# 2. BL-15 — Closed effect-subject grain

## EGS01 — every monetary effect has exactly one EffectSubject

Every `CommercialEffectVector` resolves to:

`Commitment + EffectSubject`

where `EffectSubject` is exactly one of two closed semantic classes:

1. `COMPONENT(EconomicComponentKey)`; or
2. `OBLIGATION(ObligationEffectKey)`.

No third untyped/implicit grain exists.

## EGS02 — EconomicComponentKey

Use `COMPONENT(EconomicComponentKey)` when the effect represents value attributable to an earnable/fulfillable/valued economic component such as a line, SOV section, milestone, deliverable, service period/unit, allowance component or governed scope partition.

Where no existing identity safely unifies the same economic value across mechanisms, creation of the thin EconomicComponentKey/mapping is a governed P07 action:

`DefineEconomicComponentMapping`

It requires:

- current Commitment/version;
- supported profile/mechanism;
- source component identities;
- reason and authority;
- no conflicting recognition lineage;
- provenance/effective version;
- idempotent stable mapping identity.

A downstream receipt/certificate/agent may not invent an ad hoc component key to make a transaction pass.

## EGS03 — ObligationEffectKey

Use `OBLIGATION(ObligationEffectKey)` only where the economic fact is genuinely obligation-level rather than component-earned value.

`ObligationEffectKey` is a stable Commitment-scoped identity created/bound by the governing obligation event/profile. It identifies a named non-component obligation lineage such as:

- enforceable monetary minimum/floor;
- contract-level advance position where the advance is not contractually allocated to components;
- another product-supported obligation-level effect explicitly allowed by the closed dimension/profile matrix.

It is not a generic bucket for unresolved component grain.

## EGS04 — closed dimension / subject matrix

Current candidate permissions:

| Effect dimension | Allowed subject |
|---|---|
| `COMMITMENT_OBLIGATION` | COMPONENT or OBLIGATION, fixed by Commitment baseline/profile; same value cannot exist in both |
| `MINIMUM_OBLIGATION` | OBLIGATION only |
| `MINIMUM_QUALIFICATION_CREDIT` | same OBLIGATION lineage as the minimum it offsets |
| `CERTIFIED_GROSS` | COMPONENT only |
| `RETENTION_HELD` | COMPONENT only; certificate/header calculations must allocate the resulting effect to governed component lineage |
| `ADVANCE_OUTSTANDING_EFFECT` | OBLIGATION by default; COMPONENT only where the contractual advance basis explicitly allocates the advance to components |
| `ALLOWANCE_CONSUMPTION` | COMPONENT only |
| `RECOVERY_EFFECT` | COMPONENT when recovery is tied to an economic component; OBLIGATION only for an explicitly contract-level recovery basis |
| `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` | COMPONENT where component-calculated; OBLIGATION only where the activated certificate policy legitimately calculates at certificate/Commitment level |

Subject class is bound by the governing profile/event and cannot be changed merely by a downstream projection.

## EGS05 — conservation rules

Conservation applies per stable EffectSubject lineage.

- COMPONENT effects obey one-economic-value-once by EconomicComponentKey lineage.
- OBLIGATION effects obey obligation-level floor/position conservation by ObligationEffectKey lineage.
- Moving value between subject classes requires explicit governed mapping/reclassification/correction; it cannot be achieved by issuing a new effect at another grain.
- Split/merge/reclassification preserves prior contribution and does not reset cumulative value.

## EGS06 — minimum over-credit

For a monetary minimum:

`applied_qualification_credit = min(qualifying_value, residual_minimum_before_credit)`

Only the applied amount emits `MINIMUM_QUALIFICATION_CREDIT` against the minimum's `ObligationEffectKey`.

Any qualifying call-off value beyond the residual minimum remains ordinary call-off obligation/evidence; it does not create a negative minimum, transferable credit or hidden asset unless the governing contract has a separately supported explicit commercial right/event.

The qualifying relationship and gross qualifying call-off amount may remain auditable facts even where only part is applied to the minimum floor.

## EGS07 — advance does not enter certified gross

`ADVANCE_OUTSTANDING_EFFECT` never contributes to `CERTIFIED_GROSS`.

Advance recoupment changes advance outstanding and, where relevant, a derived net-certificate/payable presentation; it does not reduce gross earned/certified value.

## EGS08 — capability profile set is actually closed

The current supported semantic capability-profile set is:

1. `QUANTITY_GOODS_FULFILMENT`
2. `PROGRESS_VALUATION`
3. `UNIT_RATE_REMEASUREMENT`
4. `MILESTONE_VALUATION`
5. `RATE_BASED_SERVICE`
6. `DELIVERABLE_ACCEPTANCE`
7. `ALLOWANCE_PROVISIONAL_MECHANISM`

A Commitment may use a product-supported compatible composition of these profiles. Tenant configuration may select supported combinations/parameters only.

Adding another capability profile is a prospective controlled architecture/product change that must define effect subject, lifecycle, guards, correction, conservation and projection impact before use. It does not silently extend the closed set.

**BL-15 remediation status: CLOSED internally, external recheck required.**

---

# 3. BL-16 — Closed Load-Bearing Transaction Register rule

## TX01 — named register is mandatory

P1.5 lifecycle completeness is measured against:

`P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md`

The register is the closed semantic membership set for the P1.5 freeze candidate.

The P01–P12 lifecycle matrix and later direct-source/invoice supplements provide the transition contracts for those registered families.

## TX02 — membership selection

A transaction/control family belongs in the register when at least one state-changing action satisfies the frozen P1.4 load-bearing test because a governed outcome, commercial position, authorization, external handoff or historical reconstruction depends on it.

Projection-only displays, caches, notifications and external facts with no product state-changing lifecycle are not promoted into fake transactions.

## TX03 — completeness contract for every member

Every registered state-changing family must define, at semantic level:

1. source state/context;
2. bounded command/action;
3. guards/domain invariants;
4. authority/control;
5. resulting event/state;
6. economic effect or explicit `NONE`/scope-only classification;
7. reversal/correction/supersession treatment;
8. concurrency/idempotency rule;
9. evidence/config/version binding.

A registered family is not complete if one of these is deferred to UI/schema/API implementation.

## TX04 — additions after freeze

A future capability/event/transaction satisfying the load-bearing test is added prospectively through controlled change.

Before becoming effective it must:

- enter the transaction register/version;
- define the full TX03 transition contract;
- define CommercialEffectVector/EffectSubject impact where economic;
- define projection/derivation evolution and effective applicability;
- preserve existing event meaning/history;
- pass affected Ceiling/Closed-Subgraph/golden-thread checks.

New membership does not retroactively make old unregistered UI/activity rows business events.

## TX05 — GT1–GT4 meaning

Golden Threads 1–4 are required cross-domain coverage samples and architecture-execution tests.

They are not the proof that lifecycle membership is complete.

Completeness comes from the closed transaction register plus full transition contracts for every member.

**BL-16 remediation status: CLOSED internally, external recheck required.**

---

# 4. Phase/status protection

These remediations:

- add no second XL;
- do not reopen P1.1–P1.4;
- do not alter FT-02/06/09/10 evidence debt;
- do not make the OS statutory tax/AP/GL authority;
- do not add a generic component ontology;
- do not add generalized workflow/configuration scope;
- keep A0–A3 clean;
- keep product code locked.

No ADR status changes are made until internal + Claude recheck agree.
