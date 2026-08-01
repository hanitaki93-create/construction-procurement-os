# P1.8 — Commercial and Cost Analytics Catalogue v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CATALOGUE CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This catalogue defines deterministic commercial/cost reporting families over the frozen P1.5 Commercial Core without creating a shadow ledger, accounting system, planning model or second P07.

The governing rule is:

> **Commercial analytics derive from exact P07 events/effects and declared external accounting/cash observations. They never merge physical, certified, posted or paid truth, invent missing budget authority, or convert report balances into commercial events.**

P1.8 does not activate P07 for A0–A3 and does not require ERP integration.

---

# 2. Frozen commercial basis

Every commercial metric preserves:

- AwardDecision ≠ Commitment;
- ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile;
- one semantic Commitment core;
- COMPONENT(EconomicComponentKey) versus OBLIGATION(ObligationEffectKey);
- CommercialEffectVector dimensions;
- exact decimal and versioned MonetaryCalculationPolicy;
- purpose-specific FX;
- history-preserving correction;
- physical actual ≠ certified actual ≠ accounting-posted actual ≠ paid cash;
- product commercial truth ≠ external accounting truth.

---

# 3. Commitment obligation metrics

## COM-001 — effective Commitment count

Class: `COUNT`  
Grain: effective Commitment identity.

AwardDecision without effective Commitment is excluded and separately reportable.

## COM-002 — Commitment obligation position

Class: `MONETARY_POSITION`  
Source: `COMMITMENT_OBLIGATION` effects by exact component/obligation grain.

## COM-003 — minimum-obligation position

Class: `MONETARY_POSITION`  
Source: `MINIMUM_OBLIGATION` only.

Must not be added again to Commitment obligation unless the frozen algebra explicitly requires distinct presentation rather than contribution.

## COM-004 — minimum-qualification credit position

Class: `MONETARY_POSITION`  
Source: `MINIMUM_QUALIFICATION_CREDIT`.

Not equivalent to obligation or certified value.

## COM-005 — Commitment flow by period

Class: `MONETARY_FLOW`  
Uses exact effective/recorded basis and correction/reversal treatment.

## COM-006 — open Commitment obligation position

Class: `MONETARY_POSITION`  
Definition must state which discharged/cancelled/reclassified/corrected effects remain.

## COM-007 — Commitment count/value by kind/profile

Class: `DISTRIBUTION`  
Dimensions may include PO, subcontract, call-off/release and supported service forms without separate mini-ledgers.

---

# 4. Change metrics

## COM-010 — commercial change count/flow

Class: `COUNT` / `MONETARY_FLOW`.

## COM-011 — approved/effective change position

Class: `MONETARY_POSITION`  
Only authoritative effective change effects.

## COM-012 — proposed/pending change position

Class: `MONETARY_POSITION` or `FORECAST_PROJECTION` under a separate MetricKey and truth family.

Never included in effective Commitment obligation unless established.

## COM-013 — change aging

Class: `AGING` from exact submission/initiation to governed resolution.

## COM-014 — change correction/reclassification distribution

Class: `DISTRIBUTION` preserving correction modes.

## COM-015 — Commitment-to-current-position variance

Class: `VARIANCE` between explicit comparable positions; not generic “change exposure.”

---

# 5. Certification/valuation metrics

## COM-020 — certified gross position

Class: `MONETARY_POSITION`  
Source: `CERTIFIED_GROSS` effects under product commercial authority.

## COM-021 — certified gross flow

Class: `MONETARY_FLOW` by exact certification effective/recorded basis.

## COM-022 — uncertified eligible/progress position

Only supported where an authoritative physical/assessment basis exists. Must remain a comparison/forecast/proposal metric, not certified actual.

## COM-023 — claim versus assessment versus certification variance

Separate `VARIANCE` MetricKeys for each pair.

Claims, assessments and certifications are never collapsed.

## COM-024 — certification cycle duration

Class: `DURATION` with exact claim/assessment/certification events.

## COM-025 — certification aging/open position

Class: `AGING` / `MONETARY_POSITION`, with explicit open population.

---

# 6. Retention, advance, allowance and recovery

## COM-030 — retention held position

Class: `MONETARY_POSITION`  
Source: `RETENTION_HELD` effects.

## COM-031 — retention movement flow

Class: `MONETARY_FLOW`, preserving hold/release/correction meaning.

## COM-032 — advance outstanding position

Class: `MONETARY_POSITION`  
Source: `ADVANCE_OUTSTANDING_EFFECT`.

Not cash balance unless external payment truth is separately shown.

## COM-033 — allowance/provisional consumption position

Class: `MONETARY_POSITION`  
Source: `ALLOWANCE_CONSUMPTION`.

## COM-034 — allowance remaining position

Class: `MONETARY_POSITION` derived from exact authoritative allowance basis and consumption effects.

## COM-035 — recovery position/flow

Class: `MONETARY_POSITION` / `MONETARY_FLOW`  
Source: `RECOVERY_EFFECT`.

## COM-036 — commercial certificate tax component

Class: `MONETARY_POSITION` / `MONETARY_FLOW`  
Source: `COMMERCIAL_CERTIFICATE_TAX_COMPONENT`.

It is not statutory VAT liability unless external tax authority/system separately establishes that fact.

---

# 7. External accounting and payment seam

## COM-040 — accounting-posted position

Class: `MONETARY_POSITION`  
Actual family: `EXTERNAL_ACCOUNTING_POSTED_ACTUAL`.

## COM-041 — paid cash position

Class: `MONETARY_POSITION`  
Actual family: `PAID_CASH_ACTUAL`.

## COM-042 — certified versus accounting-posted reconciliation

Class: `RECONCILIATION_POSITION`.

Must preserve expected semantic divergence, timing lag and true conflict.

## COM-043 — accounting-posted versus paid reconciliation

Class: `RECONCILIATION_POSITION`.

## COM-044 — product commercial versus external job-cost position

Class: `RECONCILIATION_POSITION` under exact source/authority mapping.

No forced equality.

## COM-045 — external-source freshness/availability control

Class: `CONTROL_EXCEPTION` / quality state, not a monetary adjustment.

---

# 8. Budget/reference variance boundary

P1.8 may report variance only when the baseline/reference has explicit authority and semantic meaning.

Candidate baselines:

- approved budget/reference under an activated owning source;
- authorized requirement estimate;
- accepted tender/award basis;
- effective Commitment basis;
- forecast/scenario under separate truth family.

Prohibited:

- spreadsheet budget with no authority/provenance;
- latest visible number selected as baseline;
- tender lowest price as automatic “budget”;
- one tenant/project baseline reused across incompatible scope;
- savings metric without exact comparable scope and baseline.

## COM-050 — variance to approved reference

Class: `VARIANCE` with exact baseline identity/version.

## COM-051 — commitment versus award variance

Class: `VARIANCE`; preserves AwardDecision ≠ Commitment.

## COM-052 — commitment versus certified variance

Class: `VARIANCE`; not automatically “remaining cost.”

## COM-053 — certified versus paid variance

Class: `VARIANCE` / reconciliation; not “outstanding payment” without external liability/due semantics.

---

# 9. Exposure metrics

Exposure is not a universal metric class. Each exposure MetricKey must define exactly:

- confirmed obligation/effect dimensions;
- proposed/forecast/indeterminate components;
- inclusion/exclusion and ranges;
- authority/time/quality basis;
- whether it is position, scenario or control observation.

## COM-060 — confirmed commercial exposure

Class: `MONETARY_POSITION` from exact effective commercial effects.

## COM-061 — pending proposed exposure

Class: `FORECAST_PROJECTION` or `SCENARIO_PROJECTION`, not confirmed position.

## COM-062 — indeterminate external-effect exposure

Class: `RECONCILIATION_POSITION` or bounded range; never silently included as confirmed or zero.

## COM-063 — total scenario exposure

Class: `SCENARIO_PROJECTION` with transparent components and assumptions.

---

# 10. Attribution and coding

Every commercial metric preserves explicit attribution:

- project/legal/context;
- RequirementAllocation/Commitment/component/obligation lineage;
- cost code/work breakdown/reference mapping where authoritative;
- suspense/unallocated identity where permitted;
- mapping version/correction history.

No null/hidden attribution is converted to a normal category.

## COM-070 — attributed position

Class: `MONETARY_POSITION` by valid attribution.

## COM-071 — suspense/unallocated position

Class: `MONETARY_POSITION` / `CONTROL_EXCEPTION`.

## COM-072 — attribution completeness

Class: `COVERAGE`.

## COM-073 — mapping conflict count/value

Class: `CONTROL_EXCEPTION` / `RECONCILIATION_POSITION`.

---

# 11. Anti-double-count rules

For every monetary metric:

- one `CommercialEffectKey`/contribution identity contributes once;
- component and obligation subjects cannot both count the same economic value unless the metric explicitly reports separate non-additive dimensions;
- original and replacement/correction effects follow the frozen correction algebra;
- award value and Commitment value are not summed;
- certified, posted and paid values are separate families and not summed into “total actual”;
- native and translated currency values cannot both contribute;
- package/allocation/project/portfolio dimensions are grouping paths, not duplicate contributions;
- retention/advance/recovery/tax components are included only under explicit metric formulas.

---

# 12. Currency and FX

Every cross-currency metric binds:

- native source currency;
- reporting currency;
- FX purpose;
- source/rate/fixing date/version;
- conversion stage;
- monetary calculation policy;
- rounding-difference treatment;
- comparability limitation.

Contractual, reporting, minimum-qualification, tax and accounting FX purposes remain distinct.

No “latest exchange rate” default.

---

# 13. Corrections and closed periods

Current and historical projections preserve:

- original effects;
- correction/reversal/replacement/reclassification lineage;
- effective/recorded periods;
- closed-period policy;
- external posting/reversal status where observed.

A reporting restatement cannot mutate a closed commercial period or create a commercial correction.

A commercial correction may cause a new projection/restatement under the projection contract.

---

# 14. Minimum activated scope

A0–A3 does not require this catalogue beyond AwardDecision/handoff reporting.

Where P07/A4 is inactive:

- commercial metrics are `NOT_APPLICABLE` or `UNSUPPORTED` as defined;
- the system does not fabricate Commitment/certification/payment positions;
- external handoff remains reportable without claiming effective Commitment.

---

# 15. Prohibitions

- no shadow commercial ledger;
- no report/manual balance writeback;
- no generic “actual cost”;
- no certified-as-paid or posted-as-certified;
- no award-as-Commitment;
- no proposed change in effective obligation;
- no physical progress converted to certified value without owning-domain event;
- no external accounting feed rewriting product commercial truth;
- no forced reconciliation equality;
- no hidden FX purpose;
- no arbitrary budget formula;
- no predictive exposure treated as actual;
- no double-count across effect vectors or hierarchy dimensions.

---

# 16. Hostile scenarios

Test at minimum:

1. AwardDecision exists, Commitment absent;
2. Commitment corrected after issue;
3. proposed change not approved;
4. approved change future-effective;
5. claim exceeds assessment;
6. assessment exceeds certification;
7. physical progress exceeds certified value;
8. ERP posting lags certification;
9. payment lags posting;
10. payment reversed;
11. retention released;
12. advance recouped;
13. allowance consumption corrected;
14. recovery effect reversed;
15. commercial tax component differs from statutory tax;
16. award and Commitment summed;
17. component and obligation both counted;
18. old and replacement effects both counted;
19. AED and USD positions aggregated with latest spot rate;
20. reporting FX differs from accounting FX;
21. suspense attribution hidden;
22. mapping correction changes project rollup;
23. external job-cost feed stale;
24. external source unavailable;
25. unresolved ERP post effect;
26. scenario exposure shown as confirmed;
27. pending change included in current obligation;
28. spreadsheet budget used as authority;
29. “savings” uses lowest bid against incomparable scope;
30. P07 inactive but dashboard shows zero Commitment value;
31. closed-period correction arrives;
32. issued report later restated;
33. AI calls certified value “paid cost”;
34. report exports values without actual family;
35. cross-project rollup double counts shared component;
36. connector acknowledgment treated as accounting posting.

---

# 17. Exit condition

This catalogue may enter the integrated P1.8 candidate when every activated commercial metric is bound to exact CommercialEffectVector/authority/time/actual/currency/quality semantics and cannot become a second ledger or P07 writer.
