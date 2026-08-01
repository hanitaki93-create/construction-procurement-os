# P1.8 — Claude Hostile Audit Round 2 Verdict v0.1

**Date:** 2026-08-01  
**Status:** EXTERNAL HOSTILE AUDIT PASS  
**P1.8 closure eligibility:** READY AFTER FINAL CHECKPOINT  
**Source:** user-supplied Claude Round-2 verdict

---

## VERDICT

`PASS — P1.8 Reporting, Analytics & Control Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.9.`

BL-P18-04 is closed, and the remediation goes materially further than the two clauses requested.

---

## BLOCKERS

**None.**

### BL-P18-04 — CLOSED

The external auditor confirmed that the following close the blocker:

1. the five-population distinction:
   - declared eligible population;
   - system-resolvable population;
   - currently evaluable population;
   - caller-accessible/drillable population;
   - safely disclosable population/result;
2. strict preconditions for `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`;
3. the hard decision-use ceiling for subset results;
4. deterministic ranges without midpoint, expected-value or point-estimate imputation;
5. restricted rows never redefining the denominator or becoming absence/zero/not-applicable;
6. target-scope `MetricAggregationQualityRule` composition with no averaging, majority or inherited-child-permission escape.

The auditor specifically confirmed:

- a 19-project subtotal over a 20-project population is `PRESENT_EVALUABLE_SUBSET`, not `PRESENT`;
- `POPULATION_PARTIAL_UNKNOWN` cannot use the evaluated-subset route;
- subset results cannot support commercial decision, governed approval, external issued report or audit reconstruction;
- child completeness percentages are not averaged;
- required source unavailability, reconciliation conflict and non-comparability cannot disappear inside a good-member majority;
- target-scope quality and use are recomputed;
- report composition and external communication cannot upgrade member use.

---

## WATCHES / NON-BLOCKING DEBT

### W-57 — gap-resolution restatement obligation

Clarify that resolution of a previously missing scope requires restatement of an issued result where the resolved value changes the reported figure beyond the metric's declared materiality basis.

### W-58 — population-definition narrowing after a gap

Clarify that narrowing a `PopulationDefinitionVersion` after a gap is observed is a semantic change, not cleanup. Retrospective narrowing requires controlled change/restatement with the prior population definition preserved.

### W-59 — metric/use materiality basis

Clarify that every block-versus-limit choice uses a declared metric/use materiality basis. Absence of such a basis cannot become implementation discretion.

### W-60 — optional composite components

Clarify that absence of an optional composite component remains a composition limitation even where weights do not renormalize.

### W-61 — deterministic-range consumption

Clarify that a higher-use policy consuming a deterministic range must declare which bound is consumed and why that direction is conservative for that exact decision.

### Existing evidence/legal debt

- FT-02;
- FT-06;
- FT-09 / CR-02;
- FT-10;
- ADR-0010 GCC legal/statutory specifics.

### P1.9 inherited obligation

Rendering of subset, range, exclusion and limitation states is load-bearing. A `PRESENT_EVALUABLE_SUBSET` rendered as an unqualified headline total defeats the semantic contract. P1.9 must treat limitation rendering and restricted drill-through behavior as correctness requirements, not visual preferences.

P1.10 retains chat reasoning, confidence and autonomy.

---

## GATE CHECK

- G1 metric definition/source/grain/population/formula/time/quality/contribution — **PASS**
- G2 no report/projection truth writer — **PASS**
- G3 actual-family separation — **PASS**
- G4 time/period/position/aging — **PASS**
- G5 version/restatement/snapshot/reconstruction — **PASS**
- G6 quality vector/decision use/report use/subsequent reliance — **PASS**
- G7 external authority/freshness/evidence — **PASS**
- G8 aggregation/double count/currency/time/access — **PASS**
- G9 supplier boundary — **PASS**
- G10 control-observation boundary — **PASS**
- G11 query/chat boundary — **PASS**
- G12 A0–A3 no connector/no AI — **PASS**
- G13 one-XL/P07 — **PASS**
- G14 upstream regression — **PASS**
- G15 product-code lock — **PASS**
- G16 audit readiness — **PASS**

---

## REGRESSION CHECK

- P1.1 REOPEN = **NO**
- P1.2 REGRESSION = **NO**
- P1.3 REOPEN = **NO**
- P1.4 REOPEN = **NO**
- P1.5 REOPEN = **NO**
- P1.6 REOPEN = **NO**
- P1.7 REOPEN = **NO**
- SECOND XL = **CLEAN**
- A0–A3 ACTIVATION = **CLEAN**

---

## ADR IMPACT

- ADR-0033 — `ACCEPT SEMANTIC DECISION`
- ADR-0034 — `ACCEPT SEMANTIC DECISION`
- ADR-0035 — `ACCEPT SEMANTIC DECISION`
- ADR-0036 — `ACCEPT SEMANTIC DECISION`
- ADR-0037 — `ACCEPT SEMANTIC DECISION`

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

No accepted upstream ADR must reopen.

---

## P1.9 READINESS

`READY AFTER P1.8 FINAL CHECKPOINT`

Final auditor answer:

> No load-bearing P1.8 decision remains for P1.9 or physical design to choose. Population/subset meaning, missing/restricted/unknown treatment, target-scope quality composition, calculation-grammar closure, contribution identity, actual/time meaning and restatement/history are decided.
