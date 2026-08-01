# P1.8 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE REMEDIATION / EXTERNAL ROUND 1 FAIL  
**Blocker:** BL-P18-04  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose and precedence

This remediation closes:

- BL-P18-04 — partial-population evaluation and aggregation-quality composition;
- W-52 — calculation-grammar closure;
- W-53 — externally forwarded artifact limitation;
- W-54 — mandatory disclosure when indeterminate effects are excluded;
- W-55 — composite-index component quality;
- W-56 — recorded-period correction meaning.

It controls over conflicting earlier P1.8 candidate wording.

No ADR status changes before external PASS and final reconciliation.

---

# 2. Governing partial-population rule

> **A numeric result is a total over the declared eligible population only when the required eligible population has been evaluated under the MetricDefinitionVersion. An evaluated subset is never silently promoted into the declared-population total.**

The following remain distinct:

- declared eligible population;
- population resolvable under system authority;
- population evaluable from currently available/conforming sources;
- population accessible or drillable to the requesting principal;
- population safe to disclose under AggregateDisclosurePolicy.

Returned rows, accessible rows, resolved rows and evaluated rows are not automatically the declared eligible population.

---

# 3. Closed `PartialPopulationTreatment`

Every `MetricDefinitionVersion`, for every metric class, binds exactly one treatment for each declared decision use:

## 3.1 `BLOCK_ON_INCOMPLETE_POPULATION`

Use when the metric's declared meaning requires complete evaluation.

If any required eligible member is unevaluated, unavailable, unresolved, restricted from safe aggregate computation, quarantined or unknown:

- do not return a numeric total as `PRESENT`;
- return the applicable value state such as `MISSING_EXPECTED`, `SOURCE_UNAVAILABLE`, `RESTRICTED`, `UNKNOWN_UNRESOLVED`, `QUARANTINED` or `BLOCKED`;
- expose known and unknown population gaps subject to access/disclosure rules.

## 3.2 `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`

Use only where an evaluated-subset subtotal has valid bounded meaning.

The result must use value state:

- `PRESENT_EVALUABLE_SUBSET`.

It must bind as part of the result, not only as a quality warning:

- declared eligible population identity/version;
- declared eligible member count or controlled population measure;
- evaluated member set/count;
- known unevaluated member set/count and typed reasons;
- unknown-gap indicator;
- restricted-member treatment;
- evaluated-population coverage where mathematically valid;
- exact subtotal basis;
- explicit statement that the value is **not** the declared-population total;
- whether omitted members may change direction, magnitude, ranking or decision outcome;
- quality vector and use disposition.

Where exact member identities cannot be disclosed, internal identities remain preserved and the visible result uses a policy-permitted count, grouped category, suppression marker or blocked result. Restricted members are never silently removed.

This treatment is prohibited for:

- `COMMERCIAL_DECISION_SUPPORT`;
- `GOVERNED_APPROVAL_SUPPORT`;
- `EXTERNAL_ISSUED_REPORT` where the issue purports to state the full declared population;
- `AUDIT_RECONSTRUCTION` of a full-population claim.

It may support `INFORMATIONAL_MONITORING`, `OPERATIONAL_CONTROL` or `MANAGEMENT_REVIEW` only as `USE_PERMITTED_WITH_LIMITATIONS`, with the omitted population visible under the disclosure policy.

A narrower metric may instead define its declared population as the evaluable population prospectively and honestly, but that is a different `PopulationDefinitionVersion`; it cannot be selected dynamically after missing data is discovered.

## 3.3 `REPORT_DETERMINISTIC_RANGE`

Use only where lower and upper bounds are deterministically derivable from authoritative constraints without imputation or guessed values.

The result must use value state:

- `PRESENT_DETERMINISTIC_RANGE`.

It binds:

- lower bound;
- upper bound;
- bound inclusivity;
- authoritative rule/evidence establishing each bound;
- evaluated and unevaluated populations;
- unknown-gap status;
- whether the range is finite;
- decision-use rule consuming the range.

If a finite or decision-valid bound cannot be established, the metric blocks or returns the appropriate unknown/unavailable state.

A range may support a load-bearing use only where the exact MetricDefinitionVersion and use policy explicitly consume the range conservatively. The midpoint, average or preferred estimate is never inferred automatically.

---

# 4. Value-state amendment

The closed value-state set is amended to include:

- `PRESENT_EVALUABLE_SUBSET`;
- `PRESENT_DETERMINISTIC_RANGE`.

Therefore:

- `PRESENT` means the declared result meaning is present under its required population contract;
- `ZERO_CONFIRMED` requires complete eligible-population proof;
- `PRESENT_EVALUABLE_SUBSET` is explicitly a subtotal/subset result;
- `PRESENT_DETERMINISTIC_RANGE` is explicitly bounded rather than a point total.

No presentation layer may label the latter two as an unqualified total, actual, complete position or full portfolio value.

---

# 5. Access-restricted population

The eligible population is defined independently of the requesting principal's row-level access.

Exactly one outcome applies:

1. the product is authorized to compute the full aggregate and an `AggregateDisclosurePolicy` permits safe disclosure of the result without restricted drill-through;
2. the result uses `PRESENT_EVALUABLE_SUBSET` with mandatory restricted-population disclosure permitted by policy;
3. a deterministic range is safely derivable and permitted;
4. the result is `RESTRICTED` or `BLOCKED`.

The system may never redefine the denominator or population as "the rows this user can see" unless that visible scope is the explicit, prospectively versioned PopulationDefinition.

A hidden/restricted member is never interpreted as absent, zero, not applicable or outside the eligible population.

---

# 6. `MetricAggregationQualityRule`

Every aggregate-capable `MetricDefinitionVersion` or governing ProjectionDefinitionVersion binds one versioned `MetricAggregationQualityRule`.

It states for every target aggregation scope:

- target eligible-population derivation;
- member/population union and overlap handling;
- evaluated-population derivation;
- known-gap union with typed reasons;
- unknown-gap propagation;
- access-restricted member treatment;
- per-dimension quality composition;
- blocking, segmentation, subset or range behavior;
- decision-use consequences;
- result disclosure fields;
- restatement behavior when gaps resolve.

No generic average, majority, single score or undocumented "worst flag wins" rule is permitted.

---

# 7. Mandatory dimension composition

## 7.1 Population completeness

Recompute at target scope from the union of canonical eligible-population identities under the target PopulationDefinitionVersion.

Preserve:

- eligible member set/count;
- evaluated member set/count;
- known missing/unevaluated member set/count and reasons;
- unknown-gap indicator;
- overlap/deduplication result;
- restricted-member treatment.

Completeness percentages cannot be averaged from child scopes.

A known incomplete member cannot disappear inside a larger aggregate.

## 7.2 Source availability

Required unavailable sources propagate to the affected population contribution.

The aggregate must block, segment, range or report an explicit evaluated subset according to `PartialPopulationTreatment`.

Availability cannot be averaged away by available scopes.

## 7.3 Freshness

Compose using the metric's declared rule, such as:

- strict all-required freshness;
- segmentation by freshness band;
- maximum age plus affected population/value;
- blocking threshold.

The rule must preserve the stale population/value and cannot call the aggregate current merely because most members are fresh.

## 7.4 Authority conformance

Any authority conflict affecting included contribution meaning blocks the combined load-bearing result unless the conflicting scope is separately segmented and the declared use permits that segmentation.

REFERENCE or limited-conformance data cannot be upgraded through aggregation.

## 7.5 Identity resolution

Unresolved identity affecting contribution uniqueness, population membership or denominator blocks or separately limits the aggregate under the definition.

No ambiguous identity is silently merged, dropped or counted as distinct.

## 7.6 Temporal consistency

Mixed cuts produce:

- a blocked simultaneous total;
- explicit segmentation by cut;
- or `NON_ATOMIC_MIXED_OBSERVATION` only for a declared limited use.

A mixed-time aggregate is never an unqualified current total.

## 7.7 Evidence reconstructability

Preserve counts/amounts by reconstruction level.

The aggregate use assessment applies the required reconstruction level for the declared use. Strong evidence in most members does not upgrade evidence-limited members.

## 7.8 Migration provenance

Preserve native/reference/evidence-limited/quarantined/excluded portions by count and amount where applicable.

Migration-limited contributions do not become native through aggregation.

## 7.9 Reconciliation

Preserve affected contribution/population/value by reconciliation state.

Open conflicts cannot be averaged away or silently resolved.

## 7.10 Effect certainty

Preserve confirmed, indeterminate, partial and unresolved-variance portions separately.

Exclusion of indeterminate effects always requires mandatory disclosure as defined in section 10.

## 7.11 Calculation conformance

Any unsupported operator, dependency cycle, formula-version mismatch, failed conservation or calculation defect blocks the affected result.

## 7.12 Access/disclosure

Full computation and visible disclosure are separately assessed.

No aggregate is disclosed without a valid `AggregateDisclosurePolicy`. Restricted members cannot be silently removed.

## 7.13 Comparability

Any non-comparable member blocks one combined value for the declared population.

Permitted alternatives are:

- segment by compatible set;
- normalize under an exact accepted versioned policy;
- return a limited comparative result explicitly not additive;
- block.

No numerical coercion creates comparability.

---

# 8. Aggregate-result mandatory population manifest

Every aggregate result binds, as result data:

- target scope and hierarchy version;
- PopulationDefinitionVersion;
- eligible population identity/count;
- evaluated population identity/count;
- known unevaluated population/count/reasons;
- unknown-gap indicator;
- restricted-population treatment;
- overlapping population and deduplication outcome;
- contribution counts/amounts by material quality dimension;
- applied PartialPopulationTreatment;
- value state;
- DecisionUseAssessment.

The visible representation may suppress identities under policy, but the semantic result cannot omit the population/gap facts.

---

# 9. Decision-use closure

The following defaults apply unless a stricter MetricDefinitionVersion rule applies:

- complete, conforming result may be assessed for any declared use;
- `PRESENT_EVALUABLE_SUBSET` is limited to informational, operational-control or management-review use and always carries limitations;
- `PRESENT_DETERMINISTIC_RANGE` may support a higher use only where the use profile explicitly consumes the range and neither midpoint nor omitted point estimate is substituted;
- `PARTIAL_UNKNOWN`, unknown population extent, non-comparability, unsafe restricted-population handling or calculation nonconformance blocks load-bearing decision/approval/external-issue use;
- a report member cannot upgrade its metric-use disposition through composition.

A management pack cannot present an evaluated-subset subtotal as the portfolio total with only a footnote.

---

# 10. Indeterminate-effect exclusion disclosure — W-54

Whenever indeterminate effects are excluded:

- the result quality includes `EFFECT_INDETERMINATE_EXCLUDED`;
- exclusion is stated explicitly in the result, report and export;
- affected operation/item count is disclosed where permitted;
- affected known amount/quantity is disclosed where derivable;
- unbounded/unknown exposure is stated;
- the point value is labelled as excluding indeterminate effects;
- decision-use policy states whether the result is limited or blocked.

Exclusion without disclosure is prohibited.

---

# 11. Composite-index quality — W-55

Every `COMPOSITE_INDEX` binds:

- exact component MetricKeys and versions;
- component direction and normalization;
- exact weight version and sum/conservation rule;
- missing-component treatment;
- component PartialPopulationTreatment;
- component ResultQualityVector composition into the index vector;
- minimum component-use eligibility;
- no automatic weight renormalization when a component is missing, blocked or restricted;
- sensitivity/what-if disclosure where material;
- explicit non-authority meaning.

Weight, component, normalization, fallback or component-quality rule change requires a new semantic version.

A blocked component blocks the index for any use requiring that component unless an explicit prospective alternative index definition exists.

---

# 12. Recorded-period correction meaning — W-56

`PERIOD_RECORDED_FLOW` includes the signed governed contribution occurrences whose `RecordedTime` falls inside the period.

It does not show the net current position merely because the current position is known later.

For original +100 recorded in period 1, reversal -100 and replacement +120 recorded in period 2:

- period 1 recorded flow = +100;
- period 2 recorded flow = +20 net from occurrences in period 2, while preserving -100 and +120 contribution detail;
- current position after all occurrences = +120.

`PERIOD_EFFECTIVE_FLOW` follows the separately defined effective-time/correction semantics and may restate a different business-effective period where permitted.

The two are never substituted.

---

# 13. Calculation grammar closure — W-52

The deterministic calculation grammar is closed by a versioned operator registry, not merely by prohibition.

Permitted operator families are limited to explicitly registered typed operations such as:

- authoritative-field/reference selection;
- typed inclusion/exclusion predicate over registered semantic fields;
- signed contribution summation under ContributionDispositionRule;
- count and distinct count under explicit identity;
- minimum, maximum, mean, weighted mean, median and percentile under declared population/statistical rules;
- subtraction/variance;
- ratio/rate with explicit denominator and zero behavior;
- duration/aging between governed time facts;
- deterministic bucket/classification under versioned thresholds;
- currency/unit conversion under accepted policy;
- conservation/reconciliation check;
- deterministic lower/upper-bound derivation;
- component composition under an accepted closed metric class.

The grammar prohibits:

- arbitrary SQL or query expressions;
- loops, recursion or dynamic evaluation;
- user-defined functions;
- arbitrary code/scripts;
- runtime-defined joins or source access;
- arbitrary mutation or side effects;
- tenant-authored operators;
- hidden manual adjustments.

A metric calculation is an acyclic typed graph of registered operators and accepted metric/source dependencies.

Adding an operator family requires prospective controlled architecture change, semantic typing, authority/time/quality behavior, hostile scenarios and version impact. It cannot expand incrementally into a generic expression engine.

---

# 14. Externally forwarded artifact limitation — W-53

The product can govern issue, access and subsequent reliance only while the artifact/use remains within a controlled product or communication path.

An uncontrolled external copy may be forwarded, downloaded, printed or stored beyond current revocation and restatement reach.

Therefore every issued artifact must carry or resolve:

- ReportSnapshotId and ReportArtifactVersion identity;
- issue identity/date;
- as-of/source-cut context;
- Metric/Projection/Report definition versions;
- material quality/limitation status;
- confidentiality/audience classification;
- instruction that current validity/restatement status must be checked through the governed product/reference path;
- stable restatement/status lookup reference where permitted.

The architecture does not promise recall or retroactive control of uncontrolled external copies.

P1.9 owns the rendering and interaction treatment. P1.8 freezes the semantic limitation and required embedded context.

---

# 15. Hostile scenarios added

1. 20-project portfolio; one unavailable; other 19 total AED 84.2m.
2. one restricted project omitted from a visible subtotal;
3. full aggregate computable but drill-through restricted;
4. population extent unknown rather than known missing one;
5. two missing projects with contractual upper bounds;
6. range has lower bound but no finite upper bound;
7. subset metric inserted into approval pack;
8. management pack title says total over subset result;
9. child completeness percentages averaged;
10. one non-comparable member coerced into portfolio total;
11. stale member hidden by 99 fresh members;
12. evidence-limited amount hidden by larger exact amount;
13. indeterminate effects excluded without count/value disclosure;
14. composite index renormalizes weights after one component is unavailable;
15. recorded-period flow shows current position instead of recorded occurrences;
16. restricted identities cannot be named without leaking scope;
17. later source recovery converts subset into complete result;
18. access change alters visible subset but not eligible population.

---

# 16. Blocker and watch disposition claim

Subject to full internal recheck and Claude Round 2:

- BL-P18-04 — CLOSED;
- W-52 — CLOSED;
- W-53 — CLOSED semantically / rendering remains P1.9;
- W-54 — CLOSED;
- W-55 — CLOSED;
- W-56 — CLOSED.

No upstream phase or accepted ADR is reopened.

P1.8 remains active.

P1.9+ remains locked.

Product code remains locked.
