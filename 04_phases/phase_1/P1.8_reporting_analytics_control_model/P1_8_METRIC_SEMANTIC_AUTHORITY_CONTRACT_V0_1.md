# P1.8 — Metric Semantic and Authority Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**Parent:** `P1_8_WORKPLAN_V0_1.md`  
**Control baseline:** `P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines the semantic and authority grammar for every load-bearing metric used by product reports, exports, later dashboards, control observations, chat answers and future AI explanations.

It prevents a metric from becoming:

- a second business-truth writer;
- an unlabeled spreadsheet formula;
- a hidden status or scoring system;
- an ambiguous aggregation over incompatible facts;
- a silently changing KPI;
- a substitute for missing source authority;
- a path for stale, partial or migrated data to appear complete;
- a generic tenant-authored formula or BI platform.

The governing rule is:

> **A metric is a versioned, reproducible interpretation of authoritative facts under an explicit grain, population, time, calculation, quality and access contract. It is never itself the authoritative business fact.**

---

# 2. Precedence and inherited constraints

This candidate is governed by:

1. frozen P1.4 boundary, ownership, tenancy and authority semantics;
2. frozen P1.5 Commercial Core, actual-family, money, correction and temporal semantics;
3. frozen P1.6 evidence, reliance, issue and disposition semantics;
4. frozen P1.7 query, operation, event, connector, migration and uncertainty semantics;
5. `P1_8_ENTRY_HANDOFF_V0_1.md`;
6. `P1_8_WORKPLAN_V0_1.md`;
7. `P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`.

This contract cannot reinterpret:

- OWN / MIRROR / REFERENCE / OUT;
- one authoritative source/writer per effective period;
- AwardDecision ≠ Commitment;
- claim ≠ assessment ≠ certification;
- physical actual ≠ commercial/certified actual ≠ accounting-posted actual ≠ paid/cash actual;
- planned ≠ forecast ≠ confirmed ≠ actual;
- exact-decimal and versioned monetary/FX semantics;
- immutable, history-preserving correction;
- EvidenceVersion / SourceLocator / RelianceBinding;
- current/as-of/projection/external-observed/mixed query distinctions;
- `EFFECT_INDETERMINATE` and `PARTIAL_EFFECT` visibility;
- tenant/project/ContractingAuthorityContext access;
- cross-tenant learned business knowledge being OUT by default;
- report/query/chat surfaces being unable to bypass bounded operations or domain authority.

Where this contract does not yet close detailed time, quality, portfolio or report-snapshot semantics, it requires an explicit versioned reference to the later controlling P1.8 contract. It does not permit implementation defaults.

---

# 3. Core distinctions

P1.8 freezes the following distinctions:

- authoritative fact ≠ metric definition;
- metric definition ≠ metric execution;
- metric execution ≠ metric result;
- metric result ≠ report snapshot;
- metric result ≠ business state;
- metric value ≠ source evidence;
- formula ≠ population;
- population ≠ denominator automatically;
- denominator ≠ all records visible to the query;
- grain ≠ display grouping;
- contribution identity ≠ dimension label;
- zero ≠ missing ≠ unknown ≠ not applicable ≠ unsupported;
- current result ≠ historical/as-of result;
- point-in-time position ≠ period flow;
- duration ≠ aging automatically;
- forecast ≠ scenario ≠ actual;
- external observed value ≠ product-owned fact;
- control observation ≠ workflow/domain status;
- deterministic classification ≠ authoritative source fact;
- composite index ≠ award, approval or supplier reputation truth;
- metric restatement ≠ source-history rewrite;
- presentation-only change ≠ semantic metric change;
- aggregated access ≠ automatic permission to underlying restricted facts;
- chat summary ≠ metric result;
- metric confidence ≠ evidence completeness.

---

# 4. Semantic objects

## 4.1 `MetricDefinition`

A versioned semantic definition of one metric family.

It states exactly:

- what is measured;
- why it is measured;
- which authoritative facts may contribute;
- at what grain contributions exist;
- which population is eligible;
- how values are calculated;
- which time basis applies;
- which truth/actual/status family applies;
- which quality and comparability conditions are required;
- how corrections and definition changes behave;
- who may access the result;
- what the metric does **not** mean.

A `MetricDefinition` is not a materialized value and never writes source-domain state.

## 4.2 `MetricDefinitionVersion`

An immutable semantic version of a `MetricDefinition`.

It binds all load-bearing meaning required to reproduce and interpret results.

A new version is required when any load-bearing meaning changes, including source family, authority basis, grain, population, inclusion/exclusion, contribution identity, formula, denominator, time basis, actual/status family, currency/FX purpose, quality threshold, comparability, classification rule, access/disclosure or restatement behavior.

## 4.3 `MetricContribution`

The lowest governed contribution to a metric execution.

It binds:

- `ContributionKey`;
- source fact/event/reference identity;
- authority classification;
- source/effective/recorded/observed time as applicable;
- metric grain identity;
- raw/source value where applicable;
- normalized/calculation value where applicable;
- unit/currency;
- inclusion or exclusion result;
- exclusion reason;
- quality/freshness/evidence state;
- transformation/config/version lineage;
- dimensional memberships.

A contribution is not a new source-domain fact.

## 4.4 `PopulationDefinition`

The exact rule defining all eligible units for a metric under a stated scope and time basis.

It binds:

- population grain;
- scope/context;
- eligibility criteria;
- inclusion/exclusion criteria;
- entry/exit timing;
- treatment of superseded, withdrawn, cancelled, invalid, duplicate or migrated members;
- required source availability;
- open versus frozen population behavior;
- denominator relation where applicable;
- population-completeness test.

## 4.5 `MetricExecution`

One identified calculation using:

- one exact `MetricDefinitionVersion`;
- one explicit query/as-of/source cut;
- exact governing time/calendar/FX/quality/config versions;
- one resolved population;
- exact contribution membership or reproducible contribution derivation basis;
- execution identity and recorded time.

A live query may execute repeatedly. An issued report/export must bind the exact execution/result used.

## 4.6 `MetricResult`

The output of one `MetricExecution`.

It includes:

- `MetricResultId`;
- `MetricKey` and definition version;
- execution identity;
- scope and dimension coordinates;
- value or explicit absence state;
- unit/currency;
- time/as-of basis;
- source-authority composition;
- quality/completeness/freshness/limitation state;
- contribution/population summary;
- included/excluded indeterminate-effect position where relevant;
- lineage to source/projection/config/evidence;
- access/disclosure classification;
- restatement/supersession lineage where applicable.

A `MetricResult` is a projection result, not authoritative business truth.

## 4.7 `MetricResultSet`

A governed set of metric results produced under a declared consistency cut.

It states whether the set is:

- one atomic domain snapshot;
- one consistent as-of cut;
- one causally bound result set;
- a non-atomic mixed-time observation with component cuts and limitations.

A set cannot imply simultaneous comparability merely because values appear in one table or chart.

---

# 5. `MetricDefinitionVersion` mandatory contract

Every load-bearing metric version must contain or reference all fields below.

## 5.1 Identity and governance

- stable `MetricKey`;
- immutable semantic version;
- controlled name;
- precise business definition;
- metric class;
- lifecycle state;
- semantic/domain steward;
- decision/use purpose;
- permitted decision criticality;
- applicability/effective period;
- predecessor/successor/supersession lineage;
- ADR/evidence/change basis.

## 5.2 Source authority

For every source fact/event family:

- semantic source key;
- owning domain or authoritative external source;
- OWN / MIRROR / REFERENCE / OUT classification;
- source writer;
- source version/event family;
- allowed transformation class;
- source identity/version requirements;
- freshness/conformance requirements where external;
- P1.6 evidence/reconstruction requirement where load-bearing;
- conflict/reconciliation behavior;
- migration limitations permitted or prohibited.

A metric definition cannot name “dashboard,” “spreadsheet,” “warehouse,” “reporting database,” “AI output” or “connector” as business authority.

## 5.3 Grain and contribution identity

- authoritative base grain;
- `ContributionKey` construction;
- one-contribution rule;
- duplicate/supersession/correction treatment;
- permitted dimension memberships;
- aggregation hierarchy rules;
- anti-double-count rule;
- drill-down identity;
- treatment of split allocation or proportional contribution where supported.

## 5.4 Population

- exact `PopulationDefinition` reference/version;
- scope boundaries;
- eligibility rules;
- inclusion rules;
- exclusion rules and reasons;
- denominator population where applicable;
- population freeze/as-of behavior;
- late-arriving member behavior;
- unavailable/unknown member behavior;
- population completeness test.

## 5.5 Calculation

- metric class;
- ordered calculation stages;
- allowed operators;
- numerator and denominator definitions where relevant;
- weighting rule where relevant;
- unit handling;
- exact decimal/rounding policy where relevant;
- missing/unknown/not-applicable behavior;
- negative value behavior;
- zero-denominator behavior;
- outlier/capping/winsorization rule if ever supported;
- result precision/display precision distinction;
- deterministic classification thresholds where relevant.

No hidden manual adjustment is permitted inside a load-bearing calculation.

## 5.6 Time and truth basis

- time-basis class/reference;
- effective-time versus recorded-time basis;
- point-in-time versus period-flow basis;
- window start/end and boundary inclusion;
- timezone/calendar version;
- aging/duration trigger where applicable;
- truth/status family;
- actual family where applicable;
- future-dated/backdated treatment;
- correction/restatement temporal treatment.

A metric cannot use generic “current,” “actual,” “period,” “overdue” or “as of” without an accepted explicit meaning.

## 5.7 Currency and valuation

For monetary metrics:

- native currency behavior;
- `CurrencyAggregationMode`;
- FX purpose;
- FX source/rate/fixing-date/version;
- conversion stage relative to aggregation;
- monetary calculation policy;
- rounding treatment;
- tax/value basis where relevant;
- whether result is product commercial or external accounting value.

## 5.8 Quality and limitation

- required source completeness;
- freshness thresholds or explicit no-threshold justification;
- allowed quality states;
- blocking versus warning limitations;
- partial-population behavior;
- mixed-time behavior;
- migration/evidence limitation behavior;
- reconciliation/conflict behavior;
- indeterminate-effect inclusion/exclusion policy;
- result-level quality aggregation rule;
- machine-readable limitation codes;
- human-readable limitation requirements.

## 5.9 Access, sensitivity and residency

- tenant/project/context scope;
- source-level access dependencies;
- result sensitivity class;
- disclosure policy;
- row/dimension suppression requirements;
- aggregation-disclosure policy where explicitly permitted;
- external-party visibility restrictions;
- residency/export restrictions;
- cross-tenant prohibition.

Aggregation never automatically grants permission unavailable on the source facts.

## 5.10 Evolution and correction

- semantic-change triggers;
- metadata/presentation-only changes;
- recalculation policy;
- restatement policy;
- issued snapshot treatment;
- source correction behavior;
- source identity-mapping correction behavior;
- new event-type applicability;
- migration-remediation behavior;
- deprecation/retirement behavior;
- legacy result interpretation.

## 5.11 Explicit non-meaning

Every load-bearing metric must state material interpretations it does not support.

Examples:

- response coverage does not mean bid competitiveness;
- awarded value does not mean effective Commitment value;
- certified value does not mean accounting liability or cash paid;
- average cycle time does not prove causal performance;
- control-exception count does not mean domain breach;
- supplier composite index does not create award authority or cross-tenant reputation.

---

# 6. Metric lifecycle

A `MetricDefinitionVersion` has one lifecycle state:

## `DRAFT`

Incomplete working definition. Not available for load-bearing reports, exports or chat answers.

## `EVIDENCE_REVIEW`

Semantic definition is complete enough for evidence and hostile review but not operationally accepted.

## `ACTIVE`

Passed required semantic, authority, time, quality, access and hostile gates for declared decision use.

## `ACTIVE_LIMITED`

Permitted only for explicitly bounded scope/use because evidence, source availability, migration, comparability or external conformance is limited.

Every result exposes the limitation.

## `DEPRECATED`

No new use should be introduced. Existing historical results remain interpretable.

## `RETIRED`

No new execution except explicit historical reconstruction/replay where permitted.

Retirement never deletes prior definition or issued-result meaning.

No metric becomes `ACTIVE` merely because a dashboard, spreadsheet, customer request or AI prompt uses its name.

---

# 7. Closed metric-class catalogue

Every metric has exactly one primary class from the closed set below.

A metric may reference supporting component metrics, but its result meaning must remain one primary class.

## 7.1 `COUNT`

Counts eligible contribution instances.

Required:

- exact population grain;
- inclusion/exclusion;
- duplicate/supersession treatment;
- count of what.

## 7.2 `DISTINCT_COUNT`

Counts distinct identities under an explicit distinctness key.

Required:

- distinct identity key;
- identity-mapping/version behavior;
- ambiguous/unresolved identity treatment.

## 7.3 `QUANTITY_POSITION`

Point-in-time quantity position at a stated cut.

Examples may include open required quantity or remaining allocated quantity.

It is not a period movement.

## 7.4 `QUANTITY_FLOW`

Quantity movement within a stated period and time basis.

Corrections/reversals and entry/exit boundaries must be explicit.

## 7.5 `MONETARY_POSITION`

Point-in-time monetary position derived from authoritative monetary facts/effects.

It must name the exact commercial/accounting/cash family and effect dimensions included.

## 7.6 `MONETARY_FLOW`

Monetary movement within a stated period.

It must name the event/effect time basis and cannot substitute for a closing position.

## 7.7 `RATIO`

A dimensionless numerator divided by denominator.

Required:

- exact numerator population/value;
- exact denominator population/value;
- subset relationship or explicit justification;
- zero-denominator result;
- bounds if mathematically expected;
- excluded/unknown member treatment.

## 7.8 `RATE`

A quantity, count or amount per explicit unit, exposure or time base.

Examples include events per tender or value per elapsed day.

It must not be labelled “rate” when it is merely a ratio with no exposure/time basis.

## 7.9 `DURATION`

Elapsed time between two explicit governed events/facts.

Required:

- start trigger;
- end trigger;
- open-instance treatment;
- calendar/timezone;
- pause/suspension behavior;
- negative/inconsistent timestamp behavior.

## 7.10 `AGING`

Elapsed time from a governed trigger to an as-of cut while a defined unresolved condition remains true.

Aging differs from duration because the endpoint is the evaluation cut until resolution.

## 7.11 `DISTRIBUTION`

A partitioned result across mutually exclusive or explicitly overlapping categories.

Required:

- category definition/version;
- exhaustiveness;
- mutual-exclusivity status;
- unknown/unclassified bucket;
- whether category totals may be summed.

## 7.12 `STATISTICAL_SUMMARY`

A bounded statistical summary of a declared population, such as mean, median, percentile, minimum or maximum.

Required:

- exact statistic/operator;
- sample/population size;
- missing-data rule;
- weighting;
- outlier rule;
- minimum sample adequacy;
- distribution limitations.

Averages may not hide material skew without an accepted decision-use justification.

## 7.13 `VARIANCE`

Difference between two explicitly comparable bases.

Required:

- baseline and comparison basis;
- value/truth family;
- currency/unit/time alignment;
- sign convention;
- favorable/unfavorable interpretation where applicable;
- comparability limitations.

## 7.14 `COVERAGE`

Extent to which an eligible population satisfies a defined presence/completion condition.

Coverage is usually a ratio but remains a separate class because numerator eligibility, denominator completeness and missing-source treatment are load-bearing.

Required:

- eligible denominator;
- covered condition;
- partial/unknown members;
- completeness proof.

## 7.15 `RECONCILIATION_POSITION`

Typed comparison of product and external/source positions without forced equality.

Result components may include:

- confirmed equal;
- expected semantic divergence;
- timing lag;
- stale source;
- value conflict;
- identity conflict;
- authority conflict;
- missing fact;
- evidence deficiency;
- unknown/quarantine.

It is not one unexplained net difference.

## 7.16 `FORECAST_PROJECTION`

A versioned projected future value under an accepted forecast method and current known basis.

It remains forecast truth and cannot overwrite actual facts.

Required:

- forecast method/version;
- forecast cut;
- source actual/confirmed/planned basis;
- horizon;
- assumptions;
- uncertainty/limitation;
- superseded forecast history.

## 7.17 `SCENARIO_PROJECTION`

A hypothetical result under explicit scenario assumptions.

It is never current authoritative or forecast truth unless separately accepted through a governed process.

## 7.18 `RULE_CLASSIFICATION`

A deterministic classification produced by explicit versioned rules.

Examples may include ready/not-ready/limited or risk-band classification.

Required:

- full rule set;
- precedence;
- source facts;
- unknown handling;
- explanation;
- no domain-state write.

## 7.19 `COMPOSITE_INDEX`

A transparent deterministic composition of multiple accepted component metrics.

Allowed only when:

- every component metric/version is explicit;
- normalization method is explicit;
- weights are explicit and sum/scale behavior is defined;
- missing-component treatment is explicit;
- no hidden model output enters the value;
- sensitivity and robustness are disclosed;
- the index is declared derived decision support;
- it cannot create award, approval, Commitment, certification or supplier reputation authority.

A composite index is not permitted merely to imitate a competitor scorecard.

## 7.20 Controlled extension

A new metric class requires:

- demonstrated inability of the closed classes to represent the meaning;
- evidence and decision-use basis;
- anti-overlap analysis;
- hostile review;
- prospective ADR/contract extension;
- no reinterpretation of historical class meanings.

---

# 8. Bounded calculation grammar

A metric definition may use only explicit deterministic operators approved by its class.

Candidate operator families are:

## 8.1 Selection and membership

- source-family selection;
- exact scope/context filter;
- eligibility predicate;
- inclusion/exclusion predicate;
- effective/as-of cut;
- status/truth-family filter;
- typed authority/quality filter.

## 8.2 Identity and contribution

- canonical contribution-key resolution;
- versioned deterministic identity mapping;
- distinct-key projection;
- explicit split/allocation factor;
- correction/supersession resolution.

Fuzzy or AI identity mapping cannot enter an authoritative metric until accepted through a bounded domain/mapping command; otherwise it remains proposal/limited.

## 8.3 Aggregation

- `COUNT`;
- `DISTINCT_COUNT`;
- `SUM`;
- `MIN`;
- `MAX`;
- `MEAN`;
- `WEIGHTED_MEAN`;
- `MEDIAN`;
- explicit `PERCENTILE`;
- category distribution;
- duration difference;
- deterministic ratio/rate;
- deterministic rule classification.

## 8.4 Arithmetic

- addition;
- subtraction;
- multiplication;
- division;
- absolute value;
- bounded percentage conversion;
- explicit unit conversion;
- explicit currency conversion under accepted FX policy.

## 8.5 Prohibited calculation behavior

- arbitrary SQL or script execution;
- tenant-authored executable formulas;
- hidden spreadsheet links;
- mutable manual adjustments inside formula execution;
- model-generated weights or thresholds without separate governed proposal/acceptance;
- implicit coercion of missing/unknown to zero;
- current lookup of historical config/FX/authority where a bound version is required;
- aggregation across incompatible units/currencies/time cuts;
- automatic causality claims;
- write-back from calculated result to domain state.

Physical expression language and execution engine remain later implementation choices, but they must enforce this semantic grammar.

---

# 9. Source-authority composition

## 9.1 Single-authority metric

All load-bearing inputs come from one authoritative domain/source family under one compatible authority profile.

The result still remains a projection.

## 9.2 Mixed-authority metric

Inputs come from multiple authoritative product/external sources.

The definition must state:

- each source authority;
- why combination is valid;
- exact multi-resource cut;
- freshness/comparability requirements;
- source conflict behavior;
- quality aggregation;
- whether the result is blocked, limited or allowed when one source is unavailable.

A mixed-authority metric cannot imply one source owns the other source’s facts.

## 9.3 External-observation metric

A metric derived from REFERENCE/MIRROR external facts must expose:

- external source identity;
- observed/fetched time;
- source effective time/version where available;
- freshness/conformance;
- conflict/reconciliation state;
- evidence/materialization limitation;
- whether the metric is external-observed rather than product authoritative.

## 9.4 Derived/proposal input

An AI/model/parser/user-derived proposal may contribute only when the metric explicitly measures proposal state or quality.

It cannot be mixed into an authoritative business metric as though it were validated source truth.

Examples:

- “AI-extracted lines awaiting review” may be counted as proposal records;
- they cannot count as validated tender lines until accepted through the owning bounded command.

---

# 10. Grain, contribution and anti-double-count contract

## 10.1 One governed contribution identity

Every additive metric defines one `ContributionKey` at the lowest contribution grain.

The same contribution may appear in multiple views/dimensions, but within one metric result coordinate it may contribute no more than once unless the metric explicitly models proportional allocation with factors that reconcile to the governed total.

## 10.2 Economic contribution

For P07 monetary effects, the definition must preserve the frozen economic subject/effect identity and cannot count the same economic value through both:

- source Commitment/component/effect lineage; and
- package/allocation/reporting rollup lineage.

A package, project, supplier, cost code or portfolio dimension is a grouping coordinate, not a second economic contribution.

## 10.3 Scope contribution

Requirement/allocation/package metrics must distinguish:

- source requirement quantity/scope;
- allocation consumption;
- package grouping;
- award/Commitment lineage.

A requirement appearing in several candidate packages or comparison scenarios cannot be counted several times as committed or consumed scope.

## 10.4 Overlapping dimensions

If one contribution may belong to several categories:

- the definition declares `MUTUALLY_EXCLUSIVE`, `HIERARCHICAL`, `OVERLAPPING_NON_ADDITIVE` or `PROPORTIONAL_ADDITIVE`;
- totals across overlapping categories are prohibited unless a valid proportional rule exists;
- user interfaces and exports must expose non-additivity.

## 10.5 Identity correction

If identity mapping changes after metric execution:

- original contribution/result lineage remains;
- corrected execution/restatement uses the corrected mapping version;
- prior issued results are not silently regrouped;
- aggregate changes are traceable;
- unresolved identity conflict creates a limitation or block.

---

# 11. Population and denominator contract

## 11.1 Population is a first-class definition

A formula cannot infer its population from currently returned rows.

Population eligibility exists independently of whether all eligible records are available, visible, paged, migrated or matched.

## 11.2 Population modes

A population version declares one:

### `OPEN_AS_OF_CUT`

Membership is resolved from authoritative facts at the execution cut and may differ at another cut.

### `FROZEN_COHORT`

Exact cohort membership freezes at a governed trigger/version.

### `EVENT_PERIOD_POPULATION`

Membership consists of qualifying events/effects during a stated period/time basis.

### `CURRENT_STATE_POPULATION`

Membership depends on state at a stated cut and cannot be interpreted as a period flow.

### `EXPLICIT_MEMBER_SET`

Exact governed member set is supplied/bound, such as an issued invitation set or report cohort.

## 11.3 Denominator rules

Every ratio/rate/coverage metric states:

- denominator semantic meaning;
- denominator population version;
- denominator value derivation;
- whether numerator must be a subset;
- exclusions and unavailable members;
- zero-denominator result;
- unknown denominator behavior;
- denominator correction/restatement behavior.

No percentage is valid when the denominator is merely “records returned by the current page/query.”

## 11.4 Late-arriving members

The definition states whether late facts:

- enter future live results only;
- restate prior as-of results;
- create a new cohort version;
- remain excluded due to issued/frozen population;
- create a limitation.

Implementation cannot choose silently.

## 11.5 Missing source versus ineligible member

An eligible member whose source fact is unavailable is not an excluded or ineligible member.

It remains population evidence of incompleteness and affects quality/coverage according to the definition.

---

# 12. Value and absence semantics

Every contribution and result distinguishes at minimum:

- `VALUE_PRESENT`;
- `ZERO_OBSERVED`;
- `MISSING_REQUIRED`;
- `UNKNOWN_UNRESOLVED`;
- `NOT_APPLICABLE`;
- `UNSUPPORTED`;
- `SOURCE_UNAVAILABLE`;
- `REDACTED_OR_RESTRICTED`;
- `EXCLUDED_BY_DEFINITION`;
- `QUARANTINED_CONFLICT`.

Rules:

1. `ZERO_OBSERVED` requires authoritative evidence that the value is zero under the metric basis.
2. `MISSING_REQUIRED` means the value should exist for the eligible member but is absent.
3. `UNKNOWN_UNRESOLVED` means available evidence cannot establish the value/meaning.
4. `NOT_APPLICABLE` means the metric dimension does not apply under explicit rules.
5. `UNSUPPORTED` means the product/definition does not support calculation for this case.
6. `SOURCE_UNAVAILABLE` means a required external/source system could not provide the fact at the cut.
7. `REDACTED_OR_RESTRICTED` does not imply missing at source.
8. `EXCLUDED_BY_DEFINITION` requires an explicit exclusion rule/reason.
9. `QUARANTINED_CONFLICT` means contribution is withheld pending identity/authority/evidence reconciliation.

A result with no numeric value must return the explicit absence state and limitation; it cannot return zero, blank or “N/A” without controlled meaning.

---

# 13. Truth, status and actual-family binding

Every metric states its truth family where material:

- `REQUIRED`;
- `PLANNED`;
- `FORECAST`;
- `CONFIRMED`;
- `ACTUAL`.

Every metric using `ACTUAL` states one exact actual family, including at minimum where applicable:

- `PHYSICAL_ACTUAL`;
- `PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL`;
- `EXTERNAL_ACCOUNTING_POSTED_ACTUAL`;
- `PAID_CASH_ACTUAL`.

A metric may compare multiple families only as an explicit `VARIANCE` or `RECONCILIATION_POSITION` with each component preserved.

It cannot output one generic “actual” amount.

Further time/status/actual details remain controlled by `P1_8_TIME_STATUS_ACTUAL_FORECAST_CONTRACT_V0_1.md`. A metric cannot become `ACTIVE` until its required time/truth reference is accepted.

---

# 14. Currency, units and exact calculation

## 14.1 Currency aggregation mode

Every monetary metric declares one:

### `SINGLE_CURRENCY_ONLY`

Population must share one currency. Incompatible members block or split the result.

### `PER_CURRENCY_BUCKET`

Results remain separately grouped by native currency. No total across currencies is implied.

### `CONVERT_THEN_AGGREGATE`

Each contribution is converted under one explicit FX purpose/policy/rate/fixing-date/version before aggregation.

### `AGGREGATE_THEN_CONVERT`

Allowed only where the source values share one currency and the accepted purpose/policy explicitly requires conversion after native aggregation.

Direct addition across currencies is prohibited.

## 14.2 Units

Quantity metrics declare:

- source unit;
- canonical/reporting unit where conversion occurs;
- deterministic conversion definition/version;
- dimensional compatibility;
- rounding/precision;
- mixed-unit behavior.

## 14.3 Money and rounding

Authoritative monetary calculation uses exact decimal semantics and accepted `MonetaryCalculationPolicy`.

Display rounding never changes authoritative metric result.

A metric states whether rounding occurs:

- per contribution;
- per grouped subtotal;
- only at final display;
- under another accepted purpose-specific boundary.

## 14.4 Value basis

Monetary metrics state the exact value family/effect dimensions included.

Examples must distinguish:

- award value;
- effective Commitment obligation;
- approved change effect;
- certified gross;
- retention held;
- advance outstanding effect;
- external accounting posting;
- paid cash.

No generic “spend” metric is allowed without exact semantic decomposition.

---

# 15. Time-basis binding

Every metric binds one accepted `TimeBasisDefinitionVersion` from the later P1.8 time contract.

At minimum the binding resolves:

- source/effective/recorded/observed time used;
- point-in-time versus flow;
- period boundaries;
- timezone;
- business calendar;
- as-of consistency cut;
- open/closed instance behavior;
- future/backdated/corrected fact treatment;
- duration/aging trigger;
- pause/hold treatment.

Until `P1_8_TIME_STATUS_ACTUAL_FORECAST_CONTRACT_V0_1.md` is accepted, time-dependent metric definitions remain `DRAFT` or `EVIDENCE_REVIEW`, not `ACTIVE`.

---

# 16. Quality and limitation binding

Every metric binds one accepted `MetricQualityPolicyVersion` from the later P1.8 quality contract.

The policy resolves:

- population completeness;
- pagination/completeness proof;
- freshness;
- mixed-time state;
- source unavailability;
- migration/evidence limitation;
- identity/authority/reconciliation conflict;
- `EFFECT_INDETERMINATE` inclusion/exclusion;
- component-to-result quality aggregation;
- blocking versus warning use;
- machine/human disclosure.

Until `P1_8_DATA_QUALITY_COMPLETENESS_FRESHNESS_CONTRACT_V0_1.md` is accepted, load-bearing metric definitions remain `DRAFT` or `EVIDENCE_REVIEW`.

A numeric value and a quality/limitation state are both required outputs where quality can materially affect interpretation.

---

# 17. Indeterminate and partial effects

A metric whose population may contain `EFFECT_INDETERMINATE` or `PARTIAL_EFFECT` must declare one policy:

## `EXCLUDE_AND_DISCLOSE`

Exclude unresolved contributions from the main value, separately quantify the excluded position/population where possible, and mark the result limited.

## `INCLUDE_BOUNDED_RANGE`

Present confirmed value plus an explicit lower/upper or included/possible range when a defensible bounded amount exists.

## `SEPARATE_BUCKET`

Report confirmed, indeterminate and resolved-no-effect positions separately with no collapsed total.

## `BLOCK_RESULT`

Return no load-bearing value until uncertainty resolves.

A metric cannot include indeterminate effects in a normal confirmed total without explicit separate classification.

A permanently unresolved external position accepted as variance under P1.7 remains unresolved/variance truth; it never becomes `TERMINAL_NO_EFFECT` or confirmed value through reporting.

---

# 18. Deterministic classifications and composite indices

## 18.1 Rule classifications

A `RULE_CLASSIFICATION` is acceptable only when:

- all input metrics/facts are declared;
- full rule order/precedence is versioned;
- thresholds are evidence/decision-use justified;
- unknown/missing inputs have explicit outcomes;
- explanation is reconstructable;
- classification does not write domain state.

Examples such as `COMPARISON_READY`, `LIMITED`, `OVERDUE_CONTROL_OBSERVATION` or `RECONCILIATION_REQUIRED` remain derived observations.

## 18.2 Composite indices

A `COMPOSITE_INDEX` must expose:

- component metric key/version;
- component scale and normalization;
- weight and sign;
- missing-component behavior;
- sensitivity to each component;
- threshold/band rule;
- use limitation;
- whether component populations are comparable;
- result quality as no stronger than its weakest material component.

## 18.3 Forbidden authority effects

Neither rule classification nor composite index may directly:

- approve;
- reject;
- award;
- form a Commitment;
- certify;
- instruct payment;
- create supplier business identity;
- create cross-tenant supplier reputation;
- substitute for required source evidence.

Any later automated action must use a separately accepted bounded domain command and authority basis.

---

# 19. Access, confidentiality and inference control

## 19.1 Source-access inheritance

Metric access begins from the intersection of:

- tenant/project/ContractingAuthorityContext;
- source-record permissions;
- metric-definition disclosure policy;
- evidence/confidentiality restrictions;
- external-party grant where applicable.

## 19.2 Aggregated disclosure

Aggregated results may be exposed beyond individual source visibility only under an explicit accepted disclosure policy stating:

- purpose;
- eligible audience;
- minimum group/population rule;
- suppression/rounding/generalization;
- re-identification risk;
- dimensional drill-down limits;
- residency/export constraints;
- auditability.

Aggregation alone does not authorize disclosure.

## 19.3 Cross-tenant boundary

No metric may pool tenant business data for:

- supplier rankings;
- benchmarks;
- performance scores;
- recommendations;
- learned mappings;
- model training/adaptation;
- portfolio comparisons;

unless a later explicitly governed participation mode is accepted under frozen P1.4/P1.10 constraints.

## 19.4 Inference leakage

A metric or dimension must be blocked/suppressed where it would reveal restricted source facts through subtraction, small groups, repeated queries or dimensional slicing.

Physical privacy-control implementation remains later, but the semantic disclosure rule is mandatory.

---

# 20. Metric evolution and compatibility

## 20.1 Semantic changes requiring a new version

A new `MetricDefinitionVersion` is mandatory when any of the following changes materially:

- business meaning or decision use;
- metric class;
- source authority/fact family;
- grain or contribution key;
- population or denominator;
- inclusion/exclusion;
- formula/operator/order;
- weighting/normalization/classification;
- unit/currency/FX purpose;
- time basis;
- truth/actual family;
- quality/freshness threshold;
- indeterminate-effect policy;
- access/disclosure;
- correction/restatement behavior;
- unsupported cases.

## 20.2 Presentation/metadata-only changes

The following may remain presentation metadata when they do not change interpretation or result:

- display label translation;
- layout;
- chart type;
- column order;
- explanatory wording clarification;
- display formatting that does not alter stored/result precision.

The change must still be auditable where issued reports depend on it.

## 20.3 New event/fact type

A new source event/fact type does not automatically enter an existing metric.

The metric definition must state whether the new type:

- is outside scope;
- applies prospectively;
- applies historically through controlled restatement;
- requires a new metric version;
- exposes a limitation until reconciled.

## 20.4 Source correction

Corrected source facts may change current/rebuilt metric results under the same definition when the semantic calculation is unchanged.

Prior issued snapshots remain intact and may receive a linked restatement.

## 20.5 Definition correction

If the metric definition itself was wrong or incomplete:

- preserve the flawed version and affected executions;
- issue a corrected/superseding version;
- identify affected results/reports;
- define restatement applicability;
- never rewrite the old definition or issued result silently.

## 20.6 Deprecation and retirement

Deprecated/retired metrics retain:

- exact definition/version;
- historical executions/results;
- use limitations;
- successor mapping where any;
- no silent alias to a differently defined successor.

---

# 21. Metric execution and result reproducibility

Every execution must be reproducible from either:

1. exact retained contribution/member snapshot; or
2. exact deterministic generation basis over historically reconstructable authoritative facts/versions.

The execution binds:

- definition version;
- source/query cut;
- population version and resolved membership basis;
- time/calendar/FX/quality/config versions;
- authority/conformance versions where load-bearing;
- execution software/calculation implementation version where result-affecting;
- correction/replay/restatement context;
- result ContentIdentity where issued/exported.

If evidence/source disposition prevents full reconstruction:

- preserve the result identity and remaining basis;
- expose `EVIDENCE_LIMITED` or equivalent accepted limitation;
- do not claim stronger reproducibility than remains possible;
- do not recalculate using current substitute data and call it the original result.

Detailed issued report/export snapshot semantics remain controlled by the later report snapshot contract.

---

# 22. Relationship to reports, exports and live queries

## 22.1 Live query

A live query may return a current or as-of `MetricResult` and may change as authoritative facts, source freshness or accepted projection versions change.

It must expose:

- definition version;
- query/as-of cut;
- quality/limitation;
- result time;
- whether it is live/non-issued.

## 22.2 Report definition

A `ReportDefinition` composes accepted metric/projection definitions. It cannot redefine their formula or authority.

## 22.3 Report snapshot/export

An issued/exported report binds exact metric result versions/member set/as-of/issue context.

A live link cannot impersonate an immutable issued snapshot.

## 22.4 Manual annotation

Users may attach comments/explanations/evidence under governed functionality, but annotations:

- remain separate from the metric value;
- do not overwrite formula/source contributions;
- are attributable/versioned where load-bearing;
- cannot convert a limitation into completeness.

---

# 23. Relationship to alerts and control observations

A metric may feed a `ControlObservation`, but:

- the observation is derived;
- it has its own rule/version/source/result lineage;
- it cannot become business status or effect;
- it cannot write workflow/commercial state;
- resolution of the underlying domain condition occurs through the owning bounded command;
- dismissing/acknowledging the alert does not change the underlying metric or domain truth;
- alert aging/escalation remains control visibility, not a second workflow engine.

Examples:

- overdue RFQ response;
- missing comparison evidence;
- stale payment feed;
- indeterminate external effect;
- unresolved identity mapping;
- report population incomplete.

---

# 24. Relationship to chat and future AI

Chat/AI may:

- query accepted metric definitions/results;
- explain the metric meaning;
- summarize classified results;
- cite source/definition/as-of/quality/limitations;
- compare explicitly comparable metrics;
- abstain where unsupported or incomplete.

Chat/AI may not:

- invent a formula or denominator and present it as an accepted metric;
- hide quality/partiality;
- treat a proposal/model output as authoritative fact;
- claim “all” from incomplete/paginated populations;
- claim causation from correlation/statistical association;
- resolve identity/authority/evidence conflicts verbally;
- create domain effects from a metric value;
- use session memory as source authority;
- pool cross-tenant business results.

AI-generated interpretations remain `INFERENCE_SUMMARY` or equivalent classified derived content, not `MetricResult` or source fact.

P1.9 owns interaction design. P1.10 owns model reasoning, confidence, evaluation and autonomy.

---

# 25. Mandatory metric-definition activation tests

Before a metric can become `ACTIVE`, it must pass all applicable tests.

## MT-01 — authority test

Every source fact has one valid authority classification/source and no reporting copy becomes writer.

## MT-02 — grain test

Contribution grain and identity are exact and drillable.

## MT-03 — anti-double-count test

The same contribution cannot enter one result coordinate twice through alternate lineages/dimensions.

## MT-04 — population test

Eligible population is independent of currently returned/visible rows.

## MT-05 — denominator test

Ratios/rates/coverage have explicit, complete and reconstructable denominators.

## MT-06 — time test

Point/flow/as-of/window/calendar/aging semantics are accepted and bound.

## MT-07 — truth/actual-family test

Planned/forecast/confirmed/actual and actual family are explicit.

## MT-08 — money/unit test

Currency, FX purpose, unit conversion, precision and rounding are accepted.

## MT-09 — missing/zero test

Missing, unknown, unavailable, not applicable and zero cannot collapse.

## MT-10 — quality test

Completeness, freshness, mixed-time, migration/evidence and reconciliation limitations are machine/human visible.

## MT-11 — indeterminate-effect test

Inclusion/exclusion/range/block behavior is explicit and cannot convert uncertainty to confirmed value.

## MT-12 — correction/version test

Source correction, definition change, restatement and issued-result lineage are non-silent.

## MT-13 — access/isolation test

Source access, disclosure, inference leakage, residency and cross-tenant boundaries hold.

## MT-14 — decision-use test

Metric purpose is legitimate, non-duplicative and does not create domain authority.

## MT-15 — evidence test

Load-bearing meaning has accepted architecture/evidence basis; hypotheses are not disguised as standards.

## MT-16 — one-XL test

Metric does not require a generic BI/formula/warehouse/benchmark/AI-insight platform.

Failure of any load-bearing test keeps the metric `DRAFT`, `EVIDENCE_REVIEW` or `ACTIVE_LIMITED` as explicitly justified.

---

# 26. Canonical examples

These examples illustrate the grammar and do not yet accept named production metrics.

## 26.1 Supplier response coverage

Candidate meaning:

- class: `COVERAGE`;
- denominator: exact invited/applicable supplier-recipient set for one issued RFQ version;
- numerator: distinct supplier relationships with at least one qualifying source response by the cut;
- revisions count once per supplier in the numerator;
- delivery/read acknowledgment alone is not response;
- withdrawn/non-applicable invitations follow explicit denominator rules;
- partial mailbox/portal capture creates limitation;
- result does not mean bid quality or competitiveness.

## 26.2 Awarded amount

Candidate meaning:

- class: `MONETARY_POSITION` or period `MONETARY_FLOW` depending declared use;
- source: owning `AwardDecision` facts;
- value family: award basis only;
- not effective Commitment obligation;
- not accounting posting or payment;
- currency mode explicit;
- superseded/withdrawn award treatment explicit.

## 26.3 Certified-versus-paid reconciliation

Candidate meaning:

- class: `RECONCILIATION_POSITION`;
- component A: product commercial/certified actual;
- component B: external accounting/payment or paid-cash actual as separately authoritative;
- freshness and period cut explicit;
- timing lag is not automatically conflict;
- no single generic actual or forced equality.

## 26.4 Tender cycle duration

Candidate meaning:

- class: `DURATION`;
- start/end triggers exact;
- withdrawn/reissued tender behavior explicit;
- open tenders excluded or reported as aging separately;
- business calendar/version explicit;
- average/median summary requires a separate `STATISTICAL_SUMMARY` metric over a defined cohort;
- result does not prove causation or staff performance.

## 26.5 External-effect exposure

Candidate meaning:

- class: `RECONCILIATION_POSITION` or `MONETARY_POSITION` with separate buckets;
- confirmed external effects separate from `EFFECT_INDETERMINATE` positions;
- indeterminate amount included only under accepted separate-bucket/range policy;
- permanently unresolved variance never becomes confirmed or no-effect merely for reporting closure.

---

# 27. Prohibited metrics and labels

The following are prohibited unless decomposed into accepted precise definitions:

- “actual cost”;
- “spend”;
- “savings”;
- “budget utilized”;
- “supplier performance score”;
- “procurement efficiency”;
- “on-time performance”;
- “compliance rate”;
- “project progress”;
- “value delivered”;
- “risk score”;
- “AI confidence” used as business evidence;
- “all responses” from incomplete population;
- “current” value with no cut/freshness;
- “approved” count where approval family/authority is unspecified.

These labels may later be used only when backed by exact controlled metric definitions and non-meaning statements.

---

# 28. Hostile scenarios for this contract

The integrated P1.8 audit must attack at minimum:

1. response coverage denominator is built only from successfully delivered emails;
2. one supplier submits five revisions and is counted as five respondents;
3. paginated results are treated as the population;
4. missing ERP payment feed becomes zero paid value;
5. certified amount is labelled actual cost;
6. AwardDecision amount is counted again after Commitment creation;
7. one Commitment component is grouped under two packages and summed twice;
8. one contribution belongs to overlapping categories whose totals are added;
9. AED and USD amounts are directly summed;
10. FX purpose changes but the metric key/version stays the same;
11. time basis changes from effective to recorded without version change;
12. an issued report link regenerates using a newer formula;
13. a new event type silently enters historical balances;
14. identity correction silently moves prior supplier totals;
15. late responses silently restate a frozen invitation cohort;
16. denominator is zero and UI displays 0%;
17. unknown legacy “actual” is normalized into commercial actual;
18. `EFFECT_INDETERMINATE` is included in confirmed exposure;
19. control alert status is manually set to resolve domain state;
20. user edits a dashboard total;
21. composite supplier index automatically rejects a bidder;
22. deterministic system score performs an AwardDecision;
23. AI-extracted proposal lines count as validated lines;
24. model confidence is shown as completeness;
25. cross-tenant supplier averages feed one tenant’s score;
26. aggregated metric leaks a confidential bidder through a one-member slice;
27. source evidence is disposed and current data is used to regenerate the old result;
28. average duration hides open cases and severe skew;
29. external observed fact is displayed without freshness/conformance;
30. metric implementation requires arbitrary tenant formulas or a generic BI platform.

---

# 29. Candidate ADR impact

This contract supports candidate:

## ADR-0033 — versioned metric semantic and authority model

Candidate decision:

> Adopt one versioned `MetricDefinition` grammar binding source authority, contribution grain, population, formula, time/truth basis, quality, access, correction and explicit non-meaning. Reports and later chat/AI use metric results as reproducible projections, never as independent business truth.

No ADR status changes at this stage.

ADR-0034 through ADR-0037 remain later P1.8 candidates.

No accepted upstream ADR reopens.

---

# 30. Contract gate result

This v0.1 candidate claims:

- one closed metric semantic object model exists;
- metric source authority cannot move into reporting infrastructure;
- metric classes are bounded and controlled;
- arbitrary formulas/scripts are prohibited;
- grain/population/denominator/contribution identity are explicit;
- actual/status/time/currency/quality references are mandatory;
- missing/zero/unknown cannot collapse;
- indeterminate effects remain visible;
- evolution/restatement is non-silent;
- access/cross-tenant boundaries remain;
- alerts/chat/AI cannot become alternate writers;
- no BI/warehouse/formula/benchmark second XL is created.

The candidate is not frozen.

It must be reconciled with:

- `P1_8_PROJECTION_REPORT_VERSIONING_RESTATEMENT_CONTRACT_V0_1.md`;
- `P1_8_TIME_STATUS_ACTUAL_FORECAST_CONTRACT_V0_1.md`;
- `P1_8_DATA_QUALITY_COMPLETENESS_FRESHNESS_CONTRACT_V0_1.md`;
- later catalogues and portfolio/report contracts;
- internal and Claude hostile audits.

P1.8 remains ACTIVE.

P1.9+ remains LOCKED.

Product code remains LOCKED.
