# Construction Procurement OS — P1.8 Claude Round 2 Self-Contained Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.8 — Reporting, Analytics & Control Model  
**Status:** INTERNAL POST-ROUND-1 REMEDIATION PASS / P1.8 ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED  
**Repository access:** NOT REQUIRED

---

# 1. Round-2 mission

Claude Round 1 returned one blocker:

> **BL-P18-04 — partial-population evaluation and aggregation-quality composition were unspecified.**

The exact defect was that `ZERO_CONFIRMED` required complete-population proof, but an incomplete additive metric could still return a plausible understated non-zero `PRESENT` total. Aggregation also lacked a closed dimension-by-dimension quality-composition rule.

Audit the remediation below as a claim.

Do not fail for dashboard/BI/database/warehouse/cache/export/render/search technology, exact schemas, visualization, performance, AI models/orchestration or concrete privacy thresholds intentionally deferred.

Fail if later design must still choose:

- whether a result represents the declared eligible population or only an evaluated subset;
- how unavailable, restricted, unknown or unevaluated members affect point values;
- whether a subset/range may support a given decision use;
- how quality dimensions compose across scopes;
- whether indeterminate exclusions and composite-component failures may be hidden;
- whether arbitrary calculation operators can expand into an expression engine.

---

# 2. Frozen upstream position

- P1.1–P1.7 closed/frozen as applicable;
- P07 remains sole independent XL;
- A0–A3 works without connector, AI, P07 or warehouse;
- report/projection never business authority;
- AwardDecision ≠ Commitment;
- physical actual ≠ certified/commercial actual ≠ accounting-posted actual ≠ paid cash;
- planned ≠ forecast ≠ confirmed ≠ actual;
- EvidenceVersion/RelianceBinding/issued artifacts remain immutable in meaning;
- query cut, pagination, freshness, partiality and `EFFECT_INDETERMINATE` are explicit;
- cross-tenant learned business influence is OUT by default;
- product code remains locked.

No upstream ADR was reopened by Round 1.

---

# 3. Round-1 result

Round-1 verdict:

`FAIL — P1.8 remains open; blockers below must be remediated.`

Confirmed closed in Round 1:

- metric/report/projection identity separation;
- contribution/correction algebra;
- time and actual-family taxonomy;
- quality vector;
- report-use composition;
- issue-time versus subsequent-reliance model;
- source authority and evidence;
- supplier/control/chat boundaries;
- A0–A3 no-connector/no-AI reporting;
- one-XL guard.

G1 and G8 failed only for BL-P18-04.

ADR-0034 and ADR-0035 were semantically accepted by Round 1.

ADR-0033, ADR-0036 and ADR-0037 remained blocking only because of BL-P18-04.

---

# 4. Declared population is not evaluated population

The remediated governing rule is:

> **A numeric result is a total over the declared eligible population only when the required eligible population has been evaluated under the exact MetricDefinitionVersion. An evaluated subset is never silently promoted into the declared-population total.**

Distinct:

- declared eligible population;
- population resolvable under system authority;
- population evaluable from available/conforming sources;
- population accessible/drillable to the requesting principal;
- population/result safe to disclose.

Returned, accessible, resolved or evaluated rows do not automatically redefine the declared eligible population.

---

# 5. Closed `PartialPopulationTreatment`

Every `MetricDefinitionVersion`, for every metric class and declared use, binds exactly one:

## 5.1 `BLOCK_ON_INCOMPLETE_POPULATION`

If any required eligible member is unavailable, unevaluated, unresolved, quarantined, unknown or not safely computable:

- no numeric declared-population total is returned as `PRESENT`;
- use the applicable value state: `MISSING_EXPECTED`, `SOURCE_UNAVAILABLE`, `RESTRICTED`, `UNKNOWN_UNRESOLVED`, `QUARANTINED` or `BLOCKED`;
- preserve population gaps and reasons subject to disclosure policy.

## 5.2 `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`

Permitted only when:

- the complete declared eligible population is known;
- every eligible member is classified as evaluated or unevaluated;
- every unevaluated member has a typed reason;
- no unknown population gap exists;
- overlap/deduplication is resolved;
- the subtotal is reproducible.

The result uses:

- `PRESENT_EVALUABLE_SUBSET`.

It binds as result data:

- PopulationDefinitionVersion;
- declared eligible population/count;
- evaluated population/count;
- known unevaluated population/count/reasons;
- restricted-member treatment;
- evaluated coverage where valid;
- exact subtotal basis;
- explicit statement that it is not the declared-population total;
- whether omitted members may affect magnitude, direction, ranking or decision;
- quality vector and use disposition.

If identities cannot be disclosed, they remain internally bound and the visible result uses policy-permitted counts, grouping, suppression or blocking. They are never erased.

This treatment is strictly prohibited for:

- `COMMERCIAL_DECISION_SUPPORT`;
- `GOVERNED_APPROVAL_SUPPORT`;
- `EXTERNAL_ISSUED_REPORT`;
- `AUDIT_RECONSTRUCTION`.

It may be `USE_PERMITTED_WITH_LIMITATIONS` only for:

- informational monitoring;
- operational control;
- management review.

A subset may be communicated externally only as an informational/operational artifact; external communication never upgrades the use class.

`POPULATION_PARTIAL_UNKNOWN` cannot use this treatment.

## 5.3 `REPORT_DETERMINISTIC_RANGE`

Use only when authoritative constraints produce valid lower/upper or explicitly supported one-sided bounds without imputation.

The result uses:

- `PRESENT_DETERMINISTIC_RANGE`.

It binds bounds, inclusivity, evidence/rule, eligible/evaluated/unevaluated populations, unknown-gap status and exact decision-use rule.

If valid bounds cannot be established, block.

No midpoint, expected value or point estimate is inferred automatically.

A higher use may consume a range only where the exact use policy consumes the range conservatively.

---

# 6. Value-state amendment

The closed value states include:

- `PRESENT`;
- `ZERO_CONFIRMED`;
- `PRESENT_EVALUABLE_SUBSET`;
- `PRESENT_DETERMINISTIC_RANGE`;
- `MISSING_EXPECTED`;
- `UNKNOWN_UNRESOLVED`;
- `NOT_APPLICABLE`;
- `UNSUPPORTED`;
- `SOURCE_UNAVAILABLE`;
- `RESTRICTED`;
- `QUARANTINED`;
- `BLOCKED`.

`PRESENT` means the declared result meaning is present under its population contract.

`ZERO_CONFIRMED` requires complete-population proof.

Subset and range values cannot be labelled as an unqualified total, complete position, current actual or full portfolio value.

---

# 7. Restricted population

Eligible population is independent of caller access.

Exactly one applies:

1. an authorized service computes the full population and a valid `AggregateDisclosurePolicy` permits safe aggregate disclosure;
2. an explicit evaluated-subset result is returned;
3. a deterministic range is returned;
4. the result is restricted or blocked.

A full aggregate over restricted facts requires:

- service authority to evaluate the facts;
- metric permission for aggregate computation;
- active disclosure policy for the audience/use;
- inference/differencing controls;
- restricted drill-through limitation;
- complete eligible population.

The denominator/population is never redefined as the rows the user can see unless that visible scope is the prospectively versioned PopulationDefinition.

---

# 8. `MetricAggregationQualityRule`

Every aggregate-capable MetricDefinitionVersion or ProjectionDefinitionVersion binds a versioned rule defining:

- target eligible-population derivation;
- member/population union and overlap;
- evaluated population;
- known-gap union and reasons;
- unknown-gap propagation;
- restricted-member treatment;
- each quality-dimension composition;
- block/segment/subset/range behavior;
- decision-use consequence;
- mandatory result disclosure;
- restatement when gaps resolve.

No average, majority, opaque score or undocumented worst-flag rule supplies meaning.

Every aggregate result binds:

- target scope/hierarchy version;
- PopulationDefinitionVersion;
- eligible and evaluated populations;
- known unevaluated members/reasons;
- unknown-gap state;
- restricted treatment;
- overlap/deduplication;
- contribution counts/amounts by material quality state;
- PartialPopulationTreatment;
- value state;
- DecisionUseAssessment.

---

# 9. Dimension-by-dimension composition

## Population completeness

Recompute at target scope using canonical eligible identities.

Preserve eligible/evaluated/known missing/unknown gaps/overlap.

Do not average child completeness percentages.

## Source availability

Unavailable required sources propagate to affected population. Block, segment, range or explicit subset according to policy. Availability cannot be averaged away.

## Freshness

Use the metric's explicit all-required, segmented, maximum-age or blocking rule. Preserve stale population/value. Majority freshness cannot make the result current.

## Authority conformance

Authority conflict affecting included meaning blocks the combined load-bearing result unless explicitly segmented for a permitted use. REFERENCE/limited sources are not upgraded.

## Identity resolution

Unresolved identity affecting uniqueness, membership or denominator blocks/limits; no silent merge/drop/distinct treatment.

## Temporal consistency

Mixed cuts block a simultaneous total, segment by cut or produce a limited `NON_ATOMIC_MIXED_OBSERVATION`. Never an unqualified current total.

## Evidence reconstructability

Preserve counts/amounts by reconstruction level. Strong majority evidence does not upgrade weak members.

## Migration provenance

Preserve native/reference/evidence-limited/quarantined portions. Aggregation does not convert them to native.

## Reconciliation

Preserve affected population/value by reconciliation state. Conflict cannot be averaged away.

## Effect certainty

Preserve confirmed, indeterminate, partial and unresolved-variance portions.

## Calculation conformance

Unsupported operator, dependency cycle, version mismatch, failed conservation or calculation defect blocks.

## Access/disclosure

Full computation and disclosure are separate; no disclosure without policy; restricted rows are never silently removed.

## Comparability

Any non-comparable member blocks one combined value. Alternatives are explicit segmentation, accepted normalization, limited comparison or block.

---

# 10. Decision-use closure

Target-scope DecisionUseAssessment consumes:

- target eligible/evaluated population;
- value state and PartialPopulationTreatment;
- all composed quality dimensions;
- comparability;
- disclosure safety;
- declared use.

Child-use permission is not inherited automatically.

Defaults:

- complete/conforming result may be assessed for any declared use;
- evaluated subset is limited to informational/operational/management use;
- deterministic range may support higher use only when explicitly consumed conservatively;
- unknown population extent, non-comparability, unsafe access, calculation nonconformance or blocked required members block load-bearing use;
- report composition cannot upgrade member disposition.

---

# 11. W-52 calculation grammar

The calculation grammar is closed by a versioned typed operator registry.

Permitted operator families include only explicitly registered:

- authoritative-field selection;
- typed inclusion/exclusion predicate;
- signed contribution summation;
- count/distinct count;
- min/max/mean/weighted mean/median/percentile under exact population rules;
- subtraction/variance;
- ratio/rate;
- duration/aging;
- deterministic bucket/classification;
- currency/unit conversion under accepted policy;
- conservation/reconciliation check;
- deterministic bound derivation;
- closed component composition.

A metric calculation is an acyclic typed graph of registered operators/dependencies.

Prohibited:

- arbitrary SQL/query expressions;
- loops, recursion or dynamic evaluation;
- user-defined functions;
- arbitrary code/scripts;
- runtime-defined joins/source access;
- tenant-authored operators;
- mutation/side effects;
- hidden manual adjustments.

A new operator family requires controlled prospective architecture change, semantic typing, hostile tests and version impact. It cannot appear as an implementation increment.

---

# 12. W-53 uncontrolled external copies

The product does not promise recall or retroactive control of externally forwarded/downloaded/printed copies.

Every issued artifact carries or resolves:

- snapshot/artifact/issue identity;
- as-of/source-cut context;
- definition versions;
- material limitation status;
- confidentiality/audience classification;
- current-validity/restatement-check instruction;
- governed status lookup reference where permitted.

P1.9 owns rendering. P1.8 freezes the limitation and required semantic context.

---

# 13. W-54 indeterminate exclusion

Excluding indeterminate effects always requires:

- `EFFECT_INDETERMINATE_EXCLUDED`;
- explicit point-value label;
- affected count;
- known amount/quantity where derivable;
- unknown/unbounded exposure statement;
- decision-use disposition.

Exclusion without disclosure is prohibited.

---

# 14. W-55 composite index

Every composite binds exact component/version, normalization, weight version/conservation, missing-component treatment, component partial-population treatment, dimension-by-dimension quality composition and minimum use eligibility.

No automatic weight renormalization.

Component, weight, normalization, fallback or quality-rule change creates a new semantic version.

A blocked required component blocks the index absent a separate prospective alternative definition.

---

# 15. W-56 recorded-period flow

`PERIOD_RECORDED_FLOW` includes signed governed occurrences whose RecordedTime is inside the period.

For +100 in period 1, -100 and +120 in period 2:

- period 1 recorded flow = +100;
- period 2 recorded flow = +20 net, with -100/+120 detail;
- current position = +120.

Effective-period flow follows separate effective-time/correction rules.

Recorded flow never substitutes current position.

---

# 16. Internal post-remediation verdict

Internal hostile recheck result:

- BL-P18-04 — CLOSED;
- W-52–W-56 — CLOSED as allocated;
- G1–G15 — PASS;
- G16 — internal PASS / Claude Round 2 pending;
- no P1.1–P1.7 reopening;
- second XL CLEAN;
- A0–A3 CLEAN;
- product code locked.

No ADR status changed.

Candidate ADR posture:

- ADR-0033 — candidate ACCEPT;
- ADR-0034 — candidate ACCEPT;
- ADR-0035 — candidate ACCEPT;
- ADR-0036 — candidate ACCEPT;
- ADR-0037 — candidate ACCEPT.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

---

# 17. Required hostile scenarios

Attack at minimum:

1. 20-project declared population; one source unavailable; 19 total AED 84.2m.
2. one restricted project omitted from caller rows.
3. full restricted aggregate computable but drill-through restricted.
4. no disclosure policy.
5. unknown eligible-population extent.
6. known missing scopes with deterministic contractual bounds.
7. open/unbounded endpoint represented as finite estimate.
8. subset value inserted into commercial decision pack.
9. subset value inserted into approval pack.
10. subset value externally issued as purported full total.
11. subset value externally communicated as informational only.
12. management pack title says total over subset.
13. one stale member hidden by many fresh members.
14. one authority-conflicted member hidden by majority.
15. non-comparable member coerced into portfolio total.
16. child completeness percentages averaged.
17. child management-use permission inherited by target aggregate.
18. evidence-limited amount hidden by exact majority.
19. migration-limited project becomes native after sum.
20. reconciliation conflict nets to zero and disappears.
21. indeterminate effects excluded without disclosure.
22. indeterminate exposure unbounded.
23. composite component unavailable and weights renormalized.
24. composite blocked component hidden by other components.
25. recorded-period correction shown as current position.
26. dynamic expression assembled from registered operators.
27. new operator family added without architecture review.
28. externally forwarded old PDF after restatement.
29. access revoked after issue.
30. population gap later resolves.
31. population definition changed after missing data discovered.
32. hidden value inferred by subtraction.
33. no connector, AI, P07 or warehouse.
34. external payment source unavailable.
35. generic formula/BI/quality-case platform expansion attempt.

Add your own scenarios.

---

# 18. Required response format

## VERDICT

Choose exactly:

`PASS — P1.8 Reporting, Analytics & Control Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.9.`

or

`FAIL — P1.8 remains open; blockers below must be remediated.`

## BLOCKERS

For each blocker provide:

- blocker ID;
- section/clause;
- failure mode;
- concrete scenario;
- why later design must still choose population/value/quality/use/aggregation meaning;
- narrowest remediation.

Do not convert physical preferences into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic;
- contractor/evidence/legal;
- later physical implementation;
- P1.9/P1.10-owned.

## GATE CHECK

PASS/FAIL:

- G1 metric definition/source/grain/population/formula/time/quality/contribution
- G2 no report/projection truth writer
- G3 actual-family separation
- G4 time/period/position/aging
- G5 version/restatement/snapshot/reconstruction
- G6 quality vector/decision use/report use/subsequent reliance
- G7 external authority/freshness/evidence
- G8 aggregation/double count/currency/time/access
- G9 supplier boundary
- G10 control-observation boundary
- G11 query/chat boundary
- G12 A0–A3 no connector/AI
- G13 one-XL/P07
- G14 upstream regression
- G15 product-code lock
- G16 audit readiness

## REGRESSION CHECK

- P1.1 REOPEN
- P1.2 REGRESSION
- P1.3 REOPEN
- P1.4 REOPEN
- P1.5 REOPEN
- P1.6 REOPEN
- P1.7 REOPEN
- SECOND XL
- A0–A3 ACTIVATION

## ADR IMPACT

For ADR-0033–ADR-0037 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0016 and ADR-0017 remain later-owned and state whether any upstream ADR reopens.

## P1.9 READINESS

Choose:

`READY AFTER P1.8 FINAL CHECKPOINT`

or

`NOT READY`

---

# 19. Final question

After this remediation, is any load-bearing P1.8 choice still ambiguous enough that P1.9 or physical design must decide whether a metric reports its declared population or an evaluated subset, how unavailable/restricted/unknown members affect the value, how quality composes across scopes, which uses are allowed, whether indeterminate exclusions may be hidden, or whether calculation semantics may expand into a generic expression engine?

A clean PASS is appropriate only if the answer is NO.
