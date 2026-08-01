## VERDICT

`FAIL — P1.8 remains open; blockers below must be remediated.`

One blocker. The identity separation, contribution/correction algebra, time and actual-family taxonomy, quality vector, report-use composition and subsequent-reliance model are all closed — no route was found through them. The defect is that partial-population evaluation is specified for one metric family and one value state only, leaving the general case to implementation.

## BLOCKER

### BL-P18-04 — Partial-population evaluation and aggregation-quality composition are unspecified

`ZERO_CONFIRMED` correctly requires proof over the complete eligible population, but the same protection was not stated for plausible understated non-zero values.

Concrete failure:

- a portfolio metric declares 20 projects;
- one required project source is unavailable;
- the system calculates the other 19 and returns a credible `PRESENT` amount;
- quality is degraded, but the contract does not yet close whether the value is blocked, ranged or allowed over an explicitly disclosed evaluated subset;
- aggregation quality does not yet define how gaps and quality dimensions compose across scopes.

The same ambiguity applies where eligible members exist but are inaccessible to the current user. The declared eligible population and the accessible/evaluable subset must not be confused.

### Narrow remediation required

1. Every metric class must declare a `PartialPopulationTreatment` from a closed set:
   - `BLOCK`;
   - `REPORT_OVER_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`;
   - `RANGE` where deterministic bounds are derivable.
2. Subset reporting is prohibited for uses at or above `COMMERCIAL_DECISION_SUPPORT` unless the exact metric/use policy explicitly proves that the omitted members cannot affect the decision meaning.
3. Eligible population remains the denominator/population basis; unavailable, restricted or unevaluated members are never silently removed.
4. Every aggregation must bind a `MetricAggregationQualityRule` defining composition of each quality dimension across scopes, including union-with-enumerated-gaps for population completeness and blocking of non-comparable members.

## WATCHES

- W-52 — calculation grammar needs a positive closure criterion, not prohibition only.
- W-53 — externally forwarded artifacts cannot be revalidated by the product; state this limitation and require embedded issue/restatement-check context later in P1.9.
- W-54 — indeterminate effects may be excluded only with mandatory disclosure.
- W-55 — `COMPOSITE_INDEX` needs component-weight versioning and component-quality composition.
- W-56 — `PERIOD_RECORDED_FLOW` must show occurrences recorded in the period rather than a net current position.

## GATE RESULT

- G1 — FAIL only for partial-population treatment.
- G8 — FAIL only for aggregation-quality composition.
- G2–G7 and G9–G16 — PASS.

## REGRESSION

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- P1.7 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

## ADR IMPACT

- ADR-0033 — KEEP PROPOSED — BLOCKING
- ADR-0034 — ACCEPT SEMANTIC DECISION
- ADR-0035 — ACCEPT SEMANTIC DECISION
- ADR-0036 — KEEP PROPOSED — BLOCKING
- ADR-0037 — KEEP PROPOSED — BLOCKING

ADR-0016 remains P1.9-owned. ADR-0017 remains P1.10-owned. No accepted upstream ADR reopens.

## P1.9 READINESS

`NOT READY`

Two clauses inside one blocker stand between P1.8 and readiness.