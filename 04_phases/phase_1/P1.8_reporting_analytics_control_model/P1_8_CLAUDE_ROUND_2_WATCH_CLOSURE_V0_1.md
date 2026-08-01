# P1.8 — Claude Round 2 Watch Closure v0.1

**Date:** 2026-08-01  
**Status:** WATCHES CLOSED INTO FINAL P1.8 FREEZE  
**External verdict:** PASS / BLOCKERS NONE  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This document closes Claude Round-2 watches W-57 through W-61 without reopening P1.1–P1.7 or expanding P1.8 into a BI, warehouse, formula, quality-case or legal-notification platform.

These rules are controlling inputs to the final P1.8 frozen contract.

---

# 2. W-57 — gap-resolution restatement obligation

## Closed rule

Every `MetricDefinitionVersion` and every aggregate-capable `ProjectionDefinitionVersion` must bind a versioned `GapResolutionPolicy` containing:

- the gap classes covered;
- the original result/value-state classes covered;
- the declared metric/use materiality basis;
- the comparison method between the original result and the resolved result;
- whether resolution triggers:
  - no issued-report action;
  - linked limitation update only;
  - mandatory recalculation;
  - mandatory restatement;
  - withdrawal/supersession review;
- the affected report/use classes;
- timing and authority for the resulting action;
- treatment when the prior result was a subset, deterministic range, blocked result or unavailable result;
- notification/publication obligations where already supported by the frozen communication/report model.

For an issued report or export, restatement is mandatory when the resolved gap changes the reported value, range, classification, quality vector or decision-use eligibility beyond the bound materiality basis for the report's declared use.

Absence of a declared materiality basis cannot be used to avoid restatement. The default is the more conservative action:

- block higher reliance pending reassessment; and
- create a new recalculation/result with explicit impact assessment.

A resolved gap never silently mutates the old snapshot.

---

# 3. W-58 — population-definition narrowing after a gap

## Closed rule

A `PopulationDefinitionVersion` cannot be narrowed retrospectively merely because a member or scope is unavailable, restricted, stale, difficult to evaluate, migration-limited or commercially inconvenient.

After a gap has been observed, removing that member/scope from eligibility is classified as one of:

- `PROSPECTIVE_POPULATION_SEMANTIC_CHANGE`; or
- `RETROSPECTIVE_POPULATION_RESTATEMENT`.

The change must preserve:

- the prior `PopulationDefinitionVersion`;
- the observed gap and its timing;
- the reason/evidence/authority for the new eligibility rule;
- the affected MetricDefinition/ProjectionDefinition/ReportDefinition versions;
- the old result and new result lineage;
- whether prior issued results require restatement or withdrawal review;
- whether the change is genuinely a correction of an erroneous population rule or a new prospective business definition.

Prohibited:

- redefining the denominator after seeing missing data to obtain a complete result;
- labelling a previously incomplete result complete under the same population version;
- deleting the historical gap because a new definition excludes it;
- using access restrictions as population eligibility rules.

---

# 4. W-59 — materiality and block-versus-limit basis

## Closed rule

Every load-bearing metric/use pairing must bind a versioned `MaterialityAndUsePolicy` stating:

- declared decision use;
- quantitative and/or qualitative materiality dimensions;
- whether value, percentage, population count, concentration, sensitivity, authority, freshness, evidence, reconciliation, effect certainty or comparability can be material;
- threshold/rule source and version where a threshold exists;
- whether the policy is project, tenant, contract, regulatory or product-standard specific;
- treatment of unknown/unbounded impact;
- the exact rule producing:
  - `USE_PERMITTED`;
  - `USE_PERMITTED_WITH_LIMITATIONS`;
  - `USE_BLOCKED`;
- treatment of multiple simultaneous limitations;
- change/restatement behavior when the policy changes.

Materiality is not a license to suppress a limitation.

Where impact is unknown or unbounded, the result cannot be downgraded from block to limited use by implementation judgement.

Where no accepted materiality policy exists:

- informational display may remain possible only if the semantic contract already permits it and limitations are explicit;
- load-bearing decision, approval, external issue and audit reliance are blocked.

No generic global percentage threshold is invented in P1.8.

---

# 5. W-60 — optional composite components

## Closed rule

Every `COMPOSITE_INDEX` definition binds:

- required components;
- optional components;
- exact component versions;
- normalization rules;
- fixed weight version and conservation;
- missing/unknown/restricted/blocked component treatment;
- component quality composition;
- partial-population treatment;
- minimum use eligibility;
- explicit non-meaning.

An absent optional component:

- never causes automatic weight renormalization;
- never silently preserves the same interpretation as a complete index;
- creates a typed `OPTIONAL_COMPONENT_ABSENT` composition limitation;
- identifies the absent component and reason;
- states whether the published numeric result remains calculable under the original fixed weights, becomes a range, becomes a subset/limited composition or blocks;
- forces target-scope `DecisionUseAssessment` and `ReportUseAssessment` recomputation.

A separate index design that intentionally excludes the component requires a new semantic version.

Composite indices remain unable to award, exclude, debar, commit, certify or pay.

---

# 6. W-61 — deterministic-range consumption policy

## Closed rule

Any use above management monitoring that consumes a `PRESENT_DETERMINISTIC_RANGE` must bind a versioned `RangeConsumptionPolicy` containing:

- the exact decision/use;
- whether the lower bound, upper bound, both bounds, interval width or a bound-derived guard is consumed;
- why that direction is conservative for the exact decision;
- units/currency/time/actual-family basis;
- whether the range is closed/open and inclusive/exclusive;
- treatment of unbounded ends;
- prohibited midpoint/expected-value/point-estimate inference;
- pass/block/escalation rule;
- report wording and required limitation;
- correction/restatement behavior when the range narrows or resolves.

Examples:

- exposure/cost-risk ceiling may conservatively consume the upper bound;
- confirmed coverage may conservatively consume the lower bound;
- available headroom may require the lower bound;
- obligation-at-risk may require both bounds or block if the upper end is unbounded.

The word `conservative` alone is insufficient.

Where the direction cannot be justified for the exact decision, higher-use consumption is blocked.

---

# 7. P1.9 inherited presentation obligation

P1.9 must preserve semantic distinctions visibly and structurally.

At minimum:

- `PRESENT_EVALUABLE_SUBSET` cannot be rendered as an unqualified headline total;
- `PRESENT_DETERMINISTIC_RANGE` cannot be replaced by a midpoint or single-point headline;
- eligible/evaluated/unevaluated population and known/unknown gap status must be accessible at the same decision surface;
- subset/range/indeterminate/restricted/excluded/stale/mixed-time/migration/evidence/reconciliation limitations cannot be hidden solely in tooltip, color or secondary navigation where the value supports a decision;
- a prohibited use cannot be enabled by report title, layout, export or interaction;
- restricted drill-through must not imply the hidden members are absent;
- issued and current/restated values must remain distinguishable;
- current subsequent-reliance status must not rewrite issue-time status.

This is a correctness obligation, not visual preference.

P1.9 may decide interaction and presentation implementation, but not whether these limitations are material or optional.

---

# 8. Scope guard

This watch closure does not create:

- a universal materiality engine;
- a general legal-notification system;
- a programmable formula/expression engine;
- a generic data-quality case platform;
- a BI/report builder;
- a warehouse/lakehouse;
- a GRC platform;
- an AI recommendation subsystem.

Policies remain typed, versioned and bounded to product-supported semantic dimensions.

P07 remains the sole independent XL gravity well.

---

# 9. Closure result

- W-57 — CLOSED
- W-58 — CLOSED
- W-59 — CLOSED
- W-60 — CLOSED
- W-61 — CLOSED
- P1.9 presentation inheritance — EXPLICIT
- upstream reopening — NO
- second XL — CLEAN
- product code — LOCKED
