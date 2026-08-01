# P1.8 — Frozen Reporting, Analytics & Control Model v1.0

**Date:** 2026-08-01  
**Status:** FROZEN / CONTROLLING P1.8 SEMANTIC CONTRACT  
**P1.8:** PASS / CLOSED / FROZEN  
**P1.9:** MAY BEGIN AFTER CANONICAL STATE UPDATE  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose and precedence

This contract freezes deterministic metric, projection, report, time, quality, aggregation, control-observation, supplier-performance, snapshot/export and report-query meaning.

It controls over conflicting P1.8 candidate, audit, remediation and hardening wording.

It does not select:

- dashboard or visualization technology;
- database, cache, materialized-view, warehouse or lakehouse technology;
- report renderer/export engine;
- exact physical schemas;
- search or drill-through implementation;
- AI model, orchestration or autonomy;
- exact legal/privacy/suppression thresholds;
- product code.

No physical or presentation choice may reinterpret this contract.

---

# 2. Governing thesis

> **Reports and analytics are reproducible, versioned projections over authoritative facts; they are never independent business truth.**

A report, metric, projection, dashboard, spreadsheet, export, warehouse copy, cache, connector or AI output is never the authoritative writer of domain, commercial, accounting or cash truth.

Correction routes to the owning domain/evidence/integration process. Reporting may expose, compare, reconcile, limit, block, restate or explain; it cannot create business authority.

---

# 3. Frozen inheritance

P1.8 preserves without reinterpretation:

- OWN / MIRROR / REFERENCE / OUT at load-bearing grain;
- one authoritative source/writer per effective period;
- tenant/project/ContractingAuthorityContext boundaries;
- AwardDecision ≠ Commitment;
- claim ≠ assessment ≠ certification;
- physical actual ≠ product commercial/certified actual ≠ external accounting-posted actual ≠ paid cash;
- REQUIRED ≠ PLANNED ≠ FORECAST ≠ CONFIRMED ≠ ACTUAL ≠ SCENARIO ≠ TARGET;
- exact-decimal/versioned money, FX, tax and correction semantics;
- immutable EvidenceVersion, SourceLocator, RelianceBinding and issued-artifact identity;
- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- explicit query consistency, pagination, source cuts, freshness and partiality;
- EFFECT_INDETERMINATE and PARTIAL_EFFECT;
- no cross-tenant learned business influence by default;
- A0–A3 no-connector/no-AI path;
- P07 as sole independent XL gravity well.

---

# 4. Core semantic identities

Distinct controlled identities include:

- `MetricDefinition`;
- `MetricDefinitionVersion`;
- `PopulationDefinitionVersion`;
- `MetricExecution`;
- `MetricResult`;
- `MetricResultSet`;
- `ProjectionDefinitionVersion`;
- `ProjectionExecution`;
- `ProjectionResult`;
- `ReportDefinitionVersion`;
- `ReportExecution`;
- `ReportSnapshot`;
- `ReportArtifactVersion`;
- `ReportIssue`;
- `ReportCommunicationOccurrence`;
- `RestatementRecord` / `RestatementNotice`;
- `IssueTimeReportUseAssessment`;
- `SubsequentRelianceAssessment`.

A definition is not an execution.

An execution is not a result.

A result is not a business fact.

A live query or materialized current view is not an issued snapshot.

An issued artifact is not a mutable link to current values.

---

# 5. MetricDefinitionVersion contract

Every load-bearing metric version binds at minimum:

- stable `MetricKey` and immutable semantic version;
- one primary metric class;
- precise business meaning and explicit non-meaning;
- semantic/domain steward;
- decision-use purpose and criticality;
- authoritative source families and OWN/MIRROR/REFERENCE/OUT;
- source writer, identity, semantic version, evidence and conformance requirements;
- base grain;
- contribution identities and disposition rules;
- exact `PopulationDefinitionVersion`;
- inclusion/exclusion rules;
- denominator where applicable;
- `PartialPopulationTreatment` for every declared use;
- ordered deterministic calculation graph;
- units, currency, FX purpose/source/rate/fixing/version and rounding where applicable;
- time basis and truth/actual family;
- complete quality, materiality and decision-use policies;
- access, sensitivity, disclosure and residency rules;
- correction, recalculation, restatement and dependency behavior;
- applicability/effective period;
- ADR/evidence/change basis.

No dashboard, spreadsheet, warehouse, connector or AI output can be source authority.

---

# 6. Closed metric classes

Every metric has exactly one primary class from the closed set:

- COUNT;
- DISTINCT_COUNT;
- QUANTITY_POSITION;
- QUANTITY_FLOW;
- MONETARY_POSITION;
- MONETARY_FLOW;
- RATIO;
- RATE;
- DURATION;
- AGING;
- DISTRIBUTION;
- STATISTICAL_SUMMARY;
- VARIANCE;
- COVERAGE;
- COMPLETENESS;
- CONTROL_EXCEPTION;
- RECONCILIATION_POSITION;
- FORECAST_PROJECTION;
- SCENARIO_PROJECTION;
- QUALITATIVE_RULE_CLASSIFICATION;
- COMPOSITE_INDEX.

A new class is a prospective controlled architecture change.

---

# 7. Closed calculation grammar

Calculations use an acyclic typed graph over a versioned registry of explicitly supported operator families.

Supported families may include only registered:

- population selection and filtering predicates;
- signed summation;
- count and distinct count;
- bounded statistical summaries;
- variance/difference;
- ratio and rate;
- duration and aging;
- deterministic threshold/rule classification;
- accepted unit/currency conversion;
- conservation and reconciliation;
- deterministic lower/upper-bound derivation;
- closed component composition.

Prohibited:

- arbitrary SQL/query expressions as metric semantics;
- loops, recursion or dynamic evaluation;
- user-defined functions;
- arbitrary scripts/code;
- runtime-defined joins or source access;
- tenant-authored operators;
- mutation or side effects;
- hidden manual adjustments.

A new operator family requires controlled architecture change and hostile review. The registry is a closure mechanism, not a generic expression engine.

---

# 8. Contribution and correction semantics

Distinct:

## `ContributionOccurrenceId`

Immutable identity of one source fact/event/effect occurrence.

## `EconomicContributionLineageKey`

Stable lineage joining original, correction, reversal, replacement, supersession or reclassification occurrences. It is not itself summed or deduplicated.

## `ConservationGroupKey`

Identity under which split, transfer, reclassification or correction must prove conservation and rounding-residual treatment.

## `MetricContributionIdentity`

Metric-specific identity combining exact metric version, source grain, occurrence, lineage/conservation where applicable, dimensions/attribution and source cut.

Every relevant metric binds a versioned `ContributionDispositionRule` for:

- signed inclusion;
- reversal;
- replacement;
- forward adjustment;
- reclassification out/in;
- proportional split;
- supersession;
- duplicate replay;
- unresolved identity;
- unsupported correction.

No `DISTINCT`, latest-row lookup, lineage dedupe or report-layer overwrite supplies correction meaning.

For original +100, reversal -100 and replacement +120:

- current position = +120;
- period flows include signed occurrences according to their exact effective/recorded time basis;
- all occurrences remain auditable.

---

# 9. Population distinctions

Every execution distinguishes:

1. declared eligible population;
2. system-resolvable population;
3. currently evaluable population;
4. caller-accessible/drillable population;
5. safely disclosable population/result.

Returned, visible, accessible or evaluated rows never dynamically redefine the declared eligible population.

Population eligibility is semantic, versioned and independent from temporary availability, connector state, user access or missing evidence.

---

# 10. Closed partial-population treatment

Every metric class and declared use binds exactly one:

## `BLOCK_ON_INCOMPLETE_POPULATION`

No numeric declared-population total is produced. Return the applicable missing, unavailable, restricted, unknown, quarantined or blocked value state.

## `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`

Allowed only where:

- the complete declared eligible population is known;
- every member is classified evaluated or unevaluated;
- every unevaluated member has a typed reason;
- no unknown population gap exists;
- overlap/deduplication is resolved;
- the subtotal is reproducible.

The result is `PRESENT_EVALUABLE_SUBSET` and binds eligible/evaluated/unevaluated populations, coverage and explicit statement that it is not the declared-population total.

It is prohibited for:

- COMMERCIAL_DECISION_SUPPORT;
- GOVERNED_APPROVAL_SUPPORT;
- EXTERNAL_ISSUED_REPORT;
- AUDIT_RECONSTRUCTION.

It may be permitted with limitations only for:

- INFORMATIONAL_MONITORING;
- OPERATIONAL_CONTROL;
- MANAGEMENT_REVIEW.

Report title, external distribution or composition cannot upgrade the use class.

## `REPORT_DETERMINISTIC_RANGE`

Use `PRESENT_DETERMINISTIC_RANGE` only where authoritative constraints produce valid bounds without imputation.

No midpoint, expected value or point estimate is inferred.

Where valid bounds cannot be established for the declared use, block.

`POPULATION_PARTIAL_UNKNOWN` cannot use the subset route.

---

# 11. Closed value states

Every result uses one:

- PRESENT;
- ZERO_CONFIRMED;
- PRESENT_EVALUABLE_SUBSET;
- PRESENT_DETERMINISTIC_RANGE;
- MISSING_EXPECTED;
- UNKNOWN_UNRESOLVED;
- NOT_APPLICABLE;
- UNSUPPORTED;
- SOURCE_UNAVAILABLE;
- RESTRICTED;
- QUARANTINED;
- BLOCKED.

`PRESENT` means the declared result meaning is present under its population contract.

`ZERO_CONFIRMED` requires complete eligible-population proof.

Subset/range states cannot be rendered or described as complete totals, current actuals or full portfolio positions.

Missing, unknown, unavailable, restricted, quarantined, not-applicable and unsupported are never coalesced to zero unless the exact semantic source field proves that mapping.

---

# 12. Time, status and actual families

Controlled times include:

- SOURCE_TIME;
- EFFECTIVE_TIME;
- RECORDED_TIME;
- OBSERVED_TIME;
- KNOWN_AT_TIME;
- AS_OF_CUT_TIME;
- EXECUTION_TIME;
- PUBLICATION_TIME;
- exact communication occurrence times.

Controlled time bases include:

- POINT_IN_TIME_EFFECTIVE_POSITION;
- POINT_IN_TIME_RECORDED_POSITION;
- PERIOD_EFFECTIVE_FLOW;
- PERIOD_RECORDED_FLOW;
- COHORT_WINDOW;
- ROLLING_WINDOW;
- DURATION_BETWEEN_EVENTS;
- AGING_UNTIL_RESOLUTION_OR_CUT;
- MILESTONE_VARIANCE;
- SNAPSHOT_PUBLICATION_CONTEXT.

Generic ACTUAL is invalid.

Actual families include:

- PHYSICAL_ACTUAL;
- PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL;
- EXTERNAL_ACCOUNTING_POSTED_ACTUAL;
- PAID_CASH_ACTUAL;
- exact COMMUNICATION_ACTUAL subtype;
- EXTERNAL_TECHNICAL_ACTUAL;
- exact DOMAIN_TRANSACTION_ACTUAL.

Actual families may be compared side by side but cannot be summed, substituted or selected using “latest available.”

Later actual never overwrites prior plans, forecasts, confirmations, targets or scenarios.

`PERIOD_RECORDED_FLOW` includes signed occurrences whose RecordedTime falls in the period. It is never current position.

---

# 13. Projection, report and restatement

Every projection execution binds:

- exact semantic definitions;
- exact source fact/event families;
- exact source/as-of/consistency cut;
- exact contribution and population derivation basis;
- exact time/calendar/FX/calculation/quality/configuration versions;
- execution identity and recorded time.

Controlled change causes include:

- presentation-only change;
- prospective semantic change;
- retrospective semantic restatement;
- source correction;
- late-arriving fact;
- identity/mapping correction;
- migration remediation;
- implementation defect;
- evidence/conformance change;
- quality/materiality/threshold change;
- population-definition change.

Recalculation creates a new execution/result.

Semantic change requires a new definition version or controlled restatement.

An issued `ReportSnapshot` never changes silently.

Restatement creates a new snapshot/artifact and explicit lineage to the prior issue.

A population definition cannot be narrowed after observing a gap merely to convert a subset into a total. Such narrowing is a prospective semantic change or retrospective restatement with prior definition and gap preserved.

---

# 14. Reconstruction levels

Each snapshot/artifact exposes one current reconstruction level:

- EXACT_RECONSTRUCTABLE;
- VALUE_REPRODUCIBLE_SOURCE_LIMITED;
- SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE;
- LINEAGE_ONLY_LIMITED;
- RECONSTRUCTION_BLOCKED_OR_UNKNOWN.

Evidence disposition, provider limitations or conformance changes may reduce current reconstructability but never mutate historical values, issue facts or bound definitions.

Material degradation creates an explicit reconstruction-limitation change/observation and may affect subsequent reliance.

---

# 15. Complete quality vector

Every load-bearing result evaluates independently:

1. population completeness;
2. source availability;
3. source freshness;
4. source authority conformance;
5. identity resolution;
6. temporal consistency;
7. evidence reconstructability;
8. migration provenance;
9. reconciliation state;
10. effect certainty;
11. calculation conformance;
12. access/disclosure completeness;
13. comparability.

No dimension overwrites another.

No opaque confidence or data-quality score replaces the vector.

Presentation summaries cannot suppress dimensions or upgrade use.

---

# 16. Decision-use and materiality

Controlled uses:

- INFORMATIONAL_MONITORING;
- OPERATIONAL_CONTROL;
- MANAGEMENT_REVIEW;
- COMMERCIAL_DECISION_SUPPORT;
- GOVERNED_APPROVAL_SUPPORT;
- EXTERNAL_ISSUED_REPORT;
- AUDIT_RECONSTRUCTION.

For each use, `DecisionUseAssessment` returns:

- USE_PERMITTED;
- USE_PERMITTED_WITH_LIMITATIONS;
- USE_BLOCKED.

Every metric/use pairing binds a versioned `MaterialityAndUsePolicy` covering quantitative and qualitative materiality, unknown/unbounded impact, multiple limitations and exact block-versus-limit rules.

Materiality never suppresses a limitation.

Where no accepted materiality basis exists:

- load-bearing decision, approval, external issue and audit reliance are blocked;
- implementation cannot choose permissive treatment ad hoc.

---

# 17. Report-level use composition

Every `ReportDefinitionVersion` binds a `ReportDecisionUseProfile` defining:

- intended use, audience and criticality;
- required and optional members;
- minimum member-use eligibility;
- quality/evidence/freshness/completeness requirements;
- access/disclosure/residency;
- indeterminate/reconciliation treatment;
- issue/export rules;
- required limitations and prohibited interpretations.

Every execution/snapshot has `ReportUseAssessment`:

- REPORT_USE_PERMITTED;
- REPORT_USE_PERMITTED_WITH_LIMITATIONS;
- REPORT_USE_BLOCKED.

An informational or subset metric cannot become approval support through title, layout, export or composition.

A blocked report cannot be issued for that declared use.

---

# 18. Issue-time use and subsequent reliance

Distinct:

## `IssueTimeReportUseAssessment`

Immutable eligibility under the then-governing use, members, quality, access, evidence, audience and policy.

## `SubsequentRelianceAssessment`

Required for a new load-bearing use of an old snapshot/artifact. Revalidate:

- current principal/context;
- intended use;
- access/security/legal/disclosure/residency;
- restatement/supersession/withdrawal;
- current reconstruction/evidence/conformance;
- definition support;
- current-truth divergence.

Disposition:

- RELIANCE_PERMITTED;
- RELIANCE_PERMITTED_WITH_LIMITATIONS;
- RELIANCE_BLOCKED.

Later blocked reliance does not rewrite the historical issue.

Historical issue permission does not grant perpetual access or current decision use.

The product does not promise recall/control of forwarded, printed or downloaded copies. Issued artifacts must carry or resolve issue identity, as-of/source cut, definitions, material limitations, confidentiality/audience and restatement/status-check instruction.

---

# 19. Gap resolution and restatement

Every relevant metric/projection binds a `GapResolutionPolicy`.

A resolved gap requires mandatory restatement of an issued result where the resolution changes value, range, classification, quality vector or decision-use eligibility beyond the report's declared materiality basis.

Absence of a materiality basis cannot justify no action. Higher reliance is blocked pending reassessment and a new calculation/impact assessment is required.

Resolution never silently mutates the old snapshot.

---

# 20. Effect uncertainty

Effect certainty remains distinct:

- NO_EFFECT_PROVEN;
- EXTERNAL_EFFECT_CONFIRMED;
- DOMAIN_EFFECT_CONFIRMED;
- EFFECT_INDETERMINATE;
- PARTIAL_EFFECT;
- UNRESOLVED_VARIANCE_ACCEPTED.

Accepted unresolved variance closes an operational reconciliation obligation but does not establish no effect or confirmed effect.

Metric policy must expose, range, separately quantify, exclude with mandatory disclosure or block uncertainty.

Excluding indeterminate effects always exposes:

- `EFFECT_INDETERMINATE_EXCLUDED`;
- affected item count;
- known amount/quantity where derivable;
- unknown/unbounded exposure statement;
- decision-use disposition.

Exclusion without disclosure is prohibited.

---

# 21. Aggregation behavior

Every metric declares one:

- FULLY_ADDITIVE;
- TIME_SEMI_ADDITIVE;
- DIMENSION_SEMI_ADDITIVE;
- NON_ADDITIVE;
- DISTINCT_RECOMPUTE;
- BLOCKED_AGGREGATION.

Ratios, rates, averages, percentiles and distinct counts are recomputed at target scope from governed populations/contributions.

No averages of project ratios without the exact target denominator.

No portfolio percentile from project percentiles.

No numeric type implies additivity.

---

# 22. MetricAggregationQualityRule

Every aggregate-capable metric/projection binds a versioned rule covering:

- target eligible population;
- population union and overlap;
- evaluated population;
- known gaps and typed reasons;
- unknown-gap propagation;
- restricted-member handling;
- every quality-dimension composition;
- block/segment/subset/range behavior;
- decision-use consequences;
- mandatory disclosure;
- gap-resolution restatement.

Prohibited:

- average quality;
- majority-good-member logic;
- opaque quality score;
- undocumented worst-flag logic;
- inherited child-use permission.

Target-scope quality and use are recomputed.

Mandatory composition rules include:

- population completeness is recomputed, not averaged;
- required source unavailability cannot be averaged away;
- stale portions remain quantified or block;
- authority conflict blocks or segments;
- identity conflict affecting uniqueness/denominator blocks or limits explicitly;
- mixed cuts remain mixed, segmented or blocked;
- evidence/migration limitations remain quantified;
- reconciliation conflict cannot disappear through netting;
- confirmed/indeterminate/partial/unresolved-variance effects remain separate;
- calculation nonconformance blocks;
- disclosure requires policy;
- any non-comparable member blocks one combined value unless explicit segmentation/normalization/limited comparison is defined.

Every aggregate result binds the target scope, hierarchy, eligible/evaluated/unevaluated population, gaps, restricted treatment, overlap/deduplication, quality portions, partial-population treatment, value state and DecisionUseAssessment.

---

# 23. Currency, time and actual-family aggregation

Cross-currency totals require:

- exact reporting currency;
- FX purpose;
- source/rate/fixing/version per contribution;
- conversion stage;
- rounding policy;
- native-value retention;
- quality and restatement rules.

No latest-spot default.

No mixing contractual, reporting, accounting and tax FX purposes.

Point-in-time positions require one accepted cut or explicit mixed-time classification.

Only like actual families aggregate within one MetricKey.

Cross-family views are comparison/reconciliation, not one total actual.

---

# 24. Restricted population and safe disclosure

Eligible population is independent of caller access.

Exactly one applies:

1. authorized service computes the complete aggregate and an explicit `AggregateDisclosurePolicy` permits safe disclosure;
2. explicit evaluated-subset result;
3. deterministic range;
4. restricted/blocked result.

A full restricted aggregate requires service authority, metric permission, inference controls, suppression/generalization policy, restricted drill-through treatment and complete population.

Restricted members never become absent, zero, not applicable or outside the denominator.

Cross-tenant aggregation, benchmarks, rankings, reputation and learned influence remain prohibited by default.

Absence of a disclosure policy is never permission.

---

# 25. Composite indices

Every `COMPOSITE_INDEX` binds:

- required/optional components and exact versions;
- normalization;
- fixed weights and conservation;
- missing/unknown/restricted/blocked treatment;
- component partial-population treatment;
- component quality composition;
- minimum use eligibility;
- explicit non-meaning.

No automatic weight renormalization.

Absence of an optional component creates `OPTIONAL_COMPONENT_ABSENT` limitation and forces target-scope use reassessment.

A new composition intentionally excluding a component requires a new semantic version.

Composite indices cannot create award, exclusion, debarment, Commitment, certification or payment authority.

---

# 26. Deterministic-range consumption

Higher-use consumption of a deterministic range requires a versioned `RangeConsumptionPolicy` declaring:

- exact decision/use;
- which bound or interval property is consumed;
- why that direction is conservative for that decision;
- units/currency/time/actual-family basis;
- unbounded-end treatment;
- prohibited midpoint/expected-value/point-estimate inference;
- pass/block/escalation rule;
- required wording/limitations;
- correction/restatement behavior.

The word `conservative` alone is insufficient.

Where direction cannot be justified, block.

---

# 27. Supplier-performance boundary

Supplier analytics remains:

- tenant-private;
- relationship/context/time bound;
- dimension-specific;
- opportunity/population fair;
- evidence/attribution qualified;
- non-causal unless proven;
- access/confidentiality controlled;
- unable to award, exclude, debar, commit, certify or pay.

No global supplier score, cross-tenant reputation, benchmark, training influence or weak-identity merge.

---

# 28. Control-observation boundary

Control observations are deterministic derived conditions, not business states.

Classes may include:

- threshold;
- missing evidence;
- incomplete population;
- stale source;
- reconciliation;
- effect uncertainty;
- authority/access;
- identity/mapping;
- configuration/definition;
- dependency/sequence;
- quality;
- command rejection.

Acknowledgment, assignment or accepted variance never clears the source predicate or means resolved/compliant/no-effect.

Any business transition still requires an owning-domain bounded command.

No CPM, BPM, GRC or generic quality-case platform is created.

---

# 29. Report, export and evidence

`ReportSnapshot` binds exact members/results/source cut/quality/access/reconstruction.

`ReportArtifactVersion` binds exact format, renderer/template/locale/timezone/member mapping/content integrity and sensitivity.

PDF, spreadsheet, CSV and structured exports are distinct artifacts.

An edited spreadsheet is an external working copy. It cannot re-enter as correction or truth except through bounded import/proposal/command.

Issue, dispatch, delivery, receipt, acknowledgment and domain effect remain distinct.

---

# 30. Report/query/chat seam

Reporting uses registered P1.7 QUERY operations with:

- principal/context;
- exact definition versions;
- scope;
- time and actual family;
- consistency cut;
- pagination/completeness;
- quality and access.

Answer components are classified as authoritative fact, metric result, projection result, external observation, report snapshot, control observation, scenario/proposal, inference/summary, operational status or unknown/unsupported.

Chat cannot:

- guess ambiguous “actual,” “current,” “savings,” “overdue,” “all” or “best”;
- claim all from partial;
- hide subset/range/quality limitations;
- claim unsupported causation;
- use session memory or an old report as current authority;
- execute commands through wording;
- expose restricted or cross-tenant data.

Chat is optional. P1.9 owns interaction design. P1.10 owns reasoning/autonomy.

---

# 31. A0–A3 minimum report pack

A0–A3 supports at minimum:

1. requirement/allocation control;
2. tender/RFQ register;
3. supplier-response register;
4. normalization/comparison readiness;
5. recommendation/approval control;
6. AwardDecision/handoff;
7. open controls/data-quality report;
8. immutable sourcing-event snapshot pack.

These use product-owned/manual/structured evidence.

They require no:

- named connector;
- public API/broker;
- supplier account/network;
- chat;
- AI;
- warehouse/BI platform;
- P07 activation;
- historical migration.

Connector-dependent external metrics are not applicable, unsupported or unavailable—never zero.

---

# 32. P1.9 inherited correctness obligations

P1.9 must treat the following as load-bearing correctness requirements:

- subset values cannot appear as unqualified totals;
- deterministic ranges cannot be replaced by midpoint/single-point headlines;
- population eligibility/evaluated/unevaluated/gap status must be available at the same decision surface;
- stale, mixed-time, restricted, excluded, migration/evidence/reconciliation and indeterminate limitations cannot be hidden solely in color, tooltip or secondary navigation where a decision is supported;
- report title/layout/export cannot upgrade prohibited use;
- restricted drill-through cannot imply hidden members are absent;
- issued, current and restated results remain distinguishable;
- issue-time eligibility and current subsequent-reliance status remain distinguishable;
- artifact status/restatement-check context remains discoverable;
- manual/conventional UI remains complete without chat.

P1.9 chooses interaction and visual implementation, not whether these obligations apply.

---

# 33. Scope guard

P1.8 does not create:

- enterprise data warehouse/lakehouse;
- generic BI/report builder;
- arbitrary formula/expression platform;
- CPM/master-scheduling analytics platform;
- accounting consolidation/FP&A system;
- supplier network/reputation database;
- generic control/GRC/quality-case platform;
- cross-tenant benchmark network;
- AI insight/recommendation engine.

P07 remains the sole independent XL gravity well.

---

# 34. Audit chain and gates

Audit chain:

- internal Round 1 FAIL — BL-P18-01/02/03;
- internal remediation and reliance hardening;
- internal Round 2 PASS;
- Claude Round 1 FAIL — BL-P18-04;
- partial-population/aggregation-quality remediation and hardening;
- internal Round 3 PASS;
- Claude Round 2 PASS — blockers none.

Final gates:

- G1–G16 — PASS;
- P1.1 REOPEN — NO;
- P1.2 REGRESSION — NO;
- P1.3 REOPEN — NO;
- P1.4 REOPEN — NO;
- P1.5 REOPEN — NO;
- P1.6 REOPEN — NO;
- P1.7 REOPEN — NO;
- SECOND XL — CLEAN;
- A0–A3 ACTIVATION — CLEAN;
- product code — LOCKED.

---

# 35. Accepted semantic decisions

The final contract supports acceptance of:

- ADR-0033 — metric semantic and authority grammar;
- ADR-0034 — projection/report snapshot/restatement/use/reliance;
- ADR-0035 — time/status/actual/forecast;
- ADR-0036 — quality vector, materiality and decision-use;
- ADR-0037 — contribution/comparability/partial-population aggregation.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

---

# 36. Final status

`PASS — P1.8 Reporting, Analytics & Control Model is frozen. P1.9 may begin after canonical checkpoint/state transition.`

Product code remains locked.
