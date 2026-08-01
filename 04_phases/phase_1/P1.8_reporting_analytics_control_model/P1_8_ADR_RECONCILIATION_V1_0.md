# P1.8 — ADR Reconciliation v1.0

**Date:** 2026-08-01  
**Status:** FINAL P1.8 ADR RECONCILIATION  
**External audit:** Claude Round 2 PASS / blockers none  
**P1.8:** PASS / CLOSED / FROZEN candidate pending canonical log/state update

---

# 1. Decision basis

This reconciliation is based on:

- `P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`;
- internal hostile audit/remediation/recheck chain;
- Claude Round 1 FAIL and BL-P18-04 remediation;
- Claude Round 2 PASS;
- closure of W-57 through W-61;
- G1–G16 PASS;
- no P1.1–P1.7 reopening;
- second XL clean;
- A0–A3 activation clean;
- product code locked.

---

# 2. ADR-0033 — metric semantic and authority grammar

## Final status

`ACCEPTED`

## Decision

Adopt one versioned `MetricDefinitionVersion` grammar for every load-bearing metric.

Each metric binds:

- stable identity/version and one closed primary class;
- authoritative source families and authority classification;
- source/evidence/conformance requirements;
- base grain and contribution identities;
- exact population/denominator;
- one closed `PartialPopulationTreatment` per declared use;
- restricted deterministic calculation graph over a controlled operator registry;
- unit/currency/FX/time/actual/status meaning;
- complete quality/materiality/use/access/restatement semantics;
- explicit non-meaning.

Closed partial-population modes:

- BLOCK_ON_INCOMPLETE_POPULATION;
- REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE;
- REPORT_DETERMINISTIC_RANGE.

Returned/accessible/evaluated rows never redefine the declared population.

No arbitrary SQL, scripting, user-defined functions, tenant-authored operators, runtime joins/source access, side effects or hidden manual adjustments.

## Reason

Prevents KPI labels, formulas, dashboards, spreadsheets or AI outputs from creating ambiguous or silently changing reporting meaning.

## Consequences

- `PRESENT`, `PRESENT_EVALUABLE_SUBSET` and `PRESENT_DETERMINISTIC_RANGE` are distinct;
- subset results have a hard use ceiling;
- unknown population extent cannot become a plausible point subtotal;
- new metric/operator classes require prospective controlled architecture change;
- implementation cannot choose source, denominator, partiality or formula meaning.

---

# 3. ADR-0034 — projection, report snapshot, restatement, use and reliance

## Final status

`ACCEPTED`

## Decision

Keep metric/projection/report definitions, executions, results, snapshots, artifacts, issues, communications and restatements distinct.

An issued report/export is an immutable identified snapshot of exact member results under an exact source cut and semantic version.

Recalculation creates a new execution/result.

Semantic change, retrospective population change, source correction, late fact, identity/mapping correction, migration remediation, implementation defect, quality/materiality change or evidence/conformance change uses explicit version/restatement lineage.

Issue-time eligibility is immutable and distinct from current `SubsequentRelianceAssessment` for a new load-bearing use of an old report.

Gap resolution requires mandatory restatement where it changes an issued result beyond the declared materiality basis for its use.

Forwarded/downloaded/printed copies cannot be recalled by promise; issued artifacts must carry or resolve identity, as-of/source cut, definitions, limitations, audience/confidentiality and restatement/status-check context.

## Reason

Prevents live links, refreshes, corrections, definition changes and later evidence/access changes from silently altering historical reports or granting perpetual reliance.

## Consequences

- old and restated reports coexist with explicit lineage;
- current reconstruction quality may degrade without rewriting historical issue facts;
- old issue permission does not authorize new approval/award/external reliance;
- P1.9 must make issued/current/restated and issue-time/current-reliance distinctions visible.

---

# 4. ADR-0035 — time, status, actual and forecast semantics

## Final status

`ACCEPTED`

## Decision

Adopt explicit source, effective, recorded, observed, known-at, as-of-cut, execution, publication and communication occurrence times.

Adopt explicit point-position, period-flow, cohort, rolling, duration, aging, milestone-variance and publication-context bases.

Preserve REQUIRED, PLANNED, FORECAST, CONFIRMED, ACTUAL, SCENARIO and TARGET.

Generic ACTUAL is invalid. Every actual result binds one named family:

- PHYSICAL_ACTUAL;
- PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL;
- EXTERNAL_ACCOUNTING_POSTED_ACTUAL;
- PAID_CASH_ACTUAL;
- exact communication, technical or domain-transaction actual subtype.

Unlike actual families may be compared but never summed/substituted/latest-selected.

`PERIOD_RECORDED_FLOW` reports signed occurrences recorded in the period and remains distinct from current position and effective-period flow.

## Reason

Prevents convenient “actual/current/period/overdue” labels from collapsing incompatible truth and temporal meanings.

## Consequences

- later actual never overwrites prior forecasts/plans/confirmations;
- historical effective and known-at views remain distinguishable;
- portfolio totals cannot mix actual families or incompatible cuts.

---

# 5. ADR-0036 — result-quality vector, materiality and decision-use eligibility

## Final status

`ACCEPTED`

## Decision

Adopt a complete independent `ResultQualityVector` covering:

- population completeness;
- source availability;
- freshness;
- authority conformance;
- identity resolution;
- temporal consistency;
- evidence reconstructability;
- migration provenance;
- reconciliation;
- effect certainty;
- calculation conformance;
- access/disclosure completeness;
- comparability.

No opaque quality/confidence score replaces the vector.

For each declared use, return:

- USE_PERMITTED;
- USE_PERMITTED_WITH_LIMITATIONS;
- USE_BLOCKED.

Every metric/use pairing binds a versioned `MaterialityAndUsePolicy` defining quantitative/qualitative materiality and exact block-versus-limit behavior.

Unknown/unbounded impact cannot be downgraded by implementation discretion.

Report composition uses `ReportDecisionUseProfile` and `ReportUseAssessment`; titles/layout/export cannot upgrade member use.

## Reason

A numerically correct result may still be unsafe because it is partial, stale, conflicted, non-comparable, restricted or unreconstructable. Those conditions must affect declared use deterministically.

## Consequences

- subset results are blocked for commercial decision, governed approval, external issue and audit reconstruction;
- deterministic ranges support higher use only under an explicit conservative bound-consumption policy;
- absence of a materiality policy blocks load-bearing use rather than creating an implementation default;
- P1.9 must render material limitations as correctness requirements.

---

# 6. ADR-0037 — contribution, comparability and partial-population aggregation

## Final status

`ACCEPTED`

## Decision

Adopt contribution-identity and comparability-controlled aggregation.

Distinct:

- ContributionOccurrenceId;
- EconomicContributionLineageKey;
- ConservationGroupKey;
- MetricContributionIdentity;
- versioned ContributionDispositionRule.

Every metric declares additivity behavior.

Every aggregate-capable metric/projection binds a versioned `MetricAggregationQualityRule` covering target population, union/overlap, evaluated/unevaluated members, gaps, restricted treatment, every quality-dimension composition, partial treatment, decision-use consequence, disclosure and gap-resolution restatement.

Target-scope quality and use are recomputed. They are not averaged or inherited.

Incompatible actual families, source authority, time cuts, population definitions, currency/FX purposes, hierarchy mappings, evidence/migration states, access policies or non-comparable members are segmented, normalized under explicit policy, limited or blocked.

Restricted members never redefine the denominator.

Cross-tenant aggregation/benchmark/reputation/learned influence remains OUT by default.

## Reason

Prevents original/replacement, allocation/package, award/Commitment, native/translated, product/external representation and project/portfolio double count while preventing incomplete members from disappearing inside larger totals.

## Consequences

- ratios/rates/statistics/distinct counts are recomputed at target scope;
- partial totals use explicit subset/range/block states;
- full restricted aggregates require explicit disclosure policy and inference controls;
- quality/reconciliation/conflict cannot disappear through averaging/netting;
- no warehouse or portfolio domain becomes authority.

---

# 7. Later-owned/open ADRs

Remain unchanged:

- ADR-0010 — GCC legal/statutory/rate specifics / non-blocking;
- ADR-0011 — detailed attribution/suspense mechanics / non-blocking;
- ADR-0016 — external-party UX priority / P1.9-owned;
- ADR-0017 — broader AI-readiness / P1.10-owned.

No accepted upstream ADR reopens.

---

# 8. Canonical log action

Update `02_research/control/adr_log.csv` to add ADR-0033 through ADR-0037 as ACCEPTED using the final decisions above.

Do not mark ADR-0016 or ADR-0017 accepted during P1.8 closure.
