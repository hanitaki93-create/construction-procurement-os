# Construction Procurement OS — P1.8 Self-Contained Claude Hostile Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.8 — Reporting, Analytics & Control Model  
**Status:** INTERNAL RECHECK PASS / P1.8 ACTIVE / P1.9+ LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED

---

# 1. Audit mission

Audit only this packet.

Decide whether P1.8 freezes metric, projection, time, quality, aggregation, report-snapshot, control-observation, supplier-performance and report/query/chat meaning strongly enough that later dashboard/UX/physical design can proceed without re-deciding:

- what one metric is and where its authority comes from;
- how correction/reversal/replacement/reclassification contributions count;
- population/denominator/grain/actual/time/currency meaning;
- how projections and issued reports version, recalculate and restate;
- how incomplete/stale/mixed/migrated/evidence-limited/reconciled/indeterminate results are represented;
- whether a result/report is fit for monitoring, management, approval, external issue or audit;
- whether old issued reports may be relied on later after access/evidence/policy/restatement changes;
- how project/portfolio aggregation avoids double count and false comparability;
- whether supplier analytics creates cross-tenant reputation or decision authority;
- whether control observations become a shadow workflow/state system;
- whether chat/AI can hide ambiguity, limitations or create authority;
- whether A0–A3 reporting works with no connector, chat or AI;
- whether P1.8 creates a BI/warehouse/formula/GRC/supplier-network second XL.

Treat internal PASS as a claim to attack.

Do not fail for dashboard/BI/database/warehouse/cache/renderer/export/search technology, exact schemas, visualization, UI, AI models, agent orchestration, performance or concrete privacy thresholds intentionally deferred.

Fail if later work still has to choose metric/economic contribution meaning, quality precedence/use fitness, report-use eligibility, actual/time semantics, restatement/history meaning, aggregation contribution identity or current reliance on old reports.

---

# 2. Frozen upstream state

- P1.0 CLOSED
- P1.1 PASS / FROZEN
- P1.2 PASS / CLOSED
- P1.3 PASS / CLOSED
- P1.4 PASS / CLOSED / FROZEN
- P1.5 PASS / CLOSED / FROZEN
- P1.6 PASS / CLOSED / FROZEN
- P1.7 PASS / CLOSED / FROZEN
- P1.8 ACTIVE
- P1.9+ LOCKED
- Product code LOCKED / NOT STARTED

P07 remains the sole independent XL gravity well.

A0–A3:

`requirement / MR / package`
`→ RFQ/tender`
`→ supplier response`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

A0–A3 must work without P07, ERP/CDE/email connector, supplier account/network, public API/broker, chat, AI, warehouse or historical migration.

Frozen upstream rules include:

- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative source/writer per effective period;
- tenant/project/ContractingAuthorityContext boundaries;
- connector/report/projection never business authority;
- AwardDecision ≠ Commitment;
- claim ≠ assessment ≠ certification;
- physical actual ≠ product commercial/certified actual ≠ external accounting-posted actual ≠ paid cash;
- planned ≠ forecast ≠ confirmed ≠ actual;
- exact decimal/versioned calculation/FX/tax semantics;
- history-preserving correction;
- EvidenceVersion/SourceLocator/RelianceBinding and ReconstructionAnchorTest;
- exact issued artifact/member identity;
- Query/Proposal/Command/Async classes;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- explicit query consistency/multi-resource cut/pagination;
- `EFFECT_INDETERMINATE` and `PARTIAL_EFFECT` visibility;
- no cross-tenant learned business influence by default;
- agents/chat use registered bounded operations only.

---

# 3. P1.8 thesis

> Reports and analytics are reproducible, versioned projections over authoritative facts; they are never independent business truth.

P1.8 decides semantic meaning, not technology or visuals.

No dashboard, spreadsheet, cache, warehouse, report, export or AI summary can become authoritative source truth.

---

# 4. Evidence posture

P1.8 evidence priority:

1. frozen architecture / accepted ADR;
2. primary contractor reality;
3. primary transaction/report artifact;
4. regulatory/contractual requirement;
5. official product/platform documentation;
6. professional practice;
7. internal hypothesis.

Competitor/product reporting patterns cannot override contractor/domain semantics.

Targeted official documentation reviewed from Microsoft Power BI, Google Looker and SAP Analytics Cloud supports:

- semantic-model version ≠ data freshness;
- imported/materialized models are point-in-time copies requiring refresh;
- model/data/cache/render refresh states differ;
- centralized semantic definitions benefit from version control;
- model changes can break dependent reports and need validation;
- development/review/production states differ;
- exported files are separate artifacts;
- vendor version history is bounded and insufficient for contractual reconstruction.

No named BI tool or generic modeling language is selected.

---

# 5. Metric semantic object

Every load-bearing metric has immutable `MetricDefinitionVersion` binding:

- stable MetricKey;
- one primary metric class;
- controlled name/precise definition/explicit non-meaning;
- decision/use purpose and criticality;
- semantic/domain steward;
- source fact/event families;
- authoritative source/writer and OWN/MIRROR/REFERENCE/OUT;
- source identity/version/evidence/conformance;
- base grain;
- contribution identities/disposition;
- PopulationDefinition and denominator;
- inclusion/exclusion;
- ordered deterministic calculation;
- unit/currency/FX/calculation policy;
- time basis;
- truth/status/actual family;
- quality/completeness/freshness requirements;
- access/sensitivity/residency;
- correction/recalculation/restatement/evolution;
- dependency graph;
- ADR/evidence/change basis.

Dashboard, spreadsheet, warehouse, AI and connector are prohibited as business authority.

---

# 6. Closed metric classes

Every metric has exactly one primary class:

- COUNT
- DISTINCT_COUNT
- QUANTITY_POSITION
- QUANTITY_FLOW
- MONETARY_POSITION
- MONETARY_FLOW
- RATIO
- RATE
- DURATION
- AGING
- DISTRIBUTION
- STATISTICAL_SUMMARY
- VARIANCE
- COVERAGE
- COMPLETENESS
- CONTROL_EXCEPTION
- RECONCILIATION_POSITION
- FORECAST_PROJECTION
- SCENARIO_PROJECTION
- QUALITATIVE_RULE_CLASSIFICATION
- COMPOSITE_INDEX

A restricted deterministic grammar permits arithmetic, governed aggregation, comparisons, boolean inclusion, typed mappings, explicit currency/unit conversion, time differences and transparent weighted composition.

No arbitrary SQL, scripts, code execution, user formulas or current-UI label semantics.

---

# 7. Value and population semantics

Value states:

- PRESENT
- ZERO_CONFIRMED
- MISSING_EXPECTED
- UNKNOWN_UNRESOLVED
- NOT_APPLICABLE
- UNSUPPORTED
- SOURCE_UNAVAILABLE
- RESTRICTED
- QUARANTINED
- BLOCKED

`ZERO_CONFIRMED` requires authoritative proof over the complete eligible population.

Population is independently versioned and defines grain, eligibility, scope, entry/exit, cancelled/superseded/duplicate/migrated behavior, required source availability and completeness test.

Returned rows or first page are not the denominator automatically.

Every ratio/rate/coverage defines numerator, denominator, zero-denominator and unknown/exclusion behavior.

---

# 8. Contribution identity and correction

P1.8 freezes four distinct identities.

## `ContributionOccurrenceId`

Immutable identity of one source fact/event/effect occurrence.

## `EconomicContributionLineageKey`

Stable lineage connecting original, correction, reversal, replacement, supersession or reclassification occurrences of the same governed reporting subject.

It is not itself summed or deduplicated.

## `ConservationGroupKey`

Group used where split/reclassification/correction must prove zero-net or conserved total and rounding residual treatment.

## `MetricContributionIdentity`

Metric-specific identity combining definition version, source/subject grain, occurrence, lineage/conservation where applicable, dimension/attribution membership and execution/source cut.

Every relevant metric binds `ContributionDispositionRule` with closed occurrence dispositions:

- include as occurrence;
- include signed effect;
- exclude superseded occurrence;
- include reversal;
- include replacement;
- include reclassification out/in;
- include proportional part;
- exclude duplicate replay;
- exclude out of population;
- quarantine unresolved identity;
- block unsupported correction.

The rule defines current-position, period-flow, effective/recorded reconstruction, signed correction, supersession, transfer, split conservation, duplicate and restatement behavior.

No `DISTINCT`, latest row or lineage dedupe may supply correction meaning.

Example +100, reversal -100, replacement +120:

- current position after all three = 120;
- period flows depend on exact effective/recorded occurrence times;
- all occurrences remain auditable.

---

# 9. Metric execution/result

A MetricExecution binds:

- exact MetricDefinitionVersion;
- exact source/query cut;
- exact population and contribution membership/derivation basis;
- time/calendar/FX/calculation/quality/config versions;
- execution identity/time.

MetricResult binds:

- result/definition/execution identity;
- scope/dimensions;
- value or value state;
- unit/currency;
- time/as-of basis;
- source authority composition;
- ResultQualityVector;
- population/contribution summary;
- indeterminate treatment;
- source/evidence/config lineage;
- access/disclosure;
- restatement/supersession.

It remains a projection result, not source truth.

---

# 10. Time dimensions

Distinct:

- SOURCE_TIME
- EFFECTIVE_TIME
- RECORDED_TIME
- OBSERVED_TIME
- KNOWN_AT_TIME
- AS_OF_CUT_TIME
- EXECUTION_TIME
- PUBLICATION_TIME
- exact communication occurrence times

Closed primary time bases:

- POINT_IN_TIME_EFFECTIVE_POSITION
- POINT_IN_TIME_RECORDED_POSITION
- PERIOD_EFFECTIVE_FLOW
- PERIOD_RECORDED_FLOW
- COHORT_WINDOW
- ROLLING_WINDOW
- DURATION_BETWEEN_EVENTS
- AGING_UNTIL_RESOLUTION_OR_CUT
- MILESTONE_VARIANCE
- SNAPSHOT_PUBLICATION_CONTEXT

Periods bind exact timezone/calendar/start/end/inclusion/close/backdate/late-arrival behavior.

No user locale/dashboard render defaults.

---

# 11. Truth/status/actual families

Truth/status families:

- REQUIRED
- PLANNED
- FORECAST
- CONFIRMED
- ACTUAL
- SCENARIO
- TARGET

Generic ACTUAL is invalid.

Closed actual families:

- PHYSICAL_ACTUAL
- PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL
- EXTERNAL_ACCOUNTING_POSTED_ACTUAL
- PAID_CASH_ACTUAL
- exact COMMUNICATION_ACTUAL subtype
- EXTERNAL_TECHNICAL_ACTUAL
- exact DOMAIN_TRANSACTION_ACTUAL

Reports may show families side by side but may not sum, substitute or select latest available family.

Cross-family comparison is a separate variance/reconciliation metric.

Later actual never overwrites prior plan/forecast/confirmation history.

Forecast binds method/tool/model/config, forecast-as-of, horizon, source/assumptions and uncertainty where relevant.

Confidence never turns forecast/scenario into confirmed/actual.

---

# 12. Projection/report objects

Distinct:

- MetricDefinitionVersion
- ProjectionDefinitionVersion
- ProjectionExecution
- ProjectionResult
- ReportDefinitionVersion
- ReportExecution
- ReportSnapshot
- ReportArtifactVersion
- ReportIssue
- ReportCommunicationOccurrence
- RestatementRecord/Notice

A live query, materialized current view, snapshot and exported artifact are not interchangeable.

Projection source-cut manifest includes definition versions, source identities/versions/events, effective/recorded/known-at cut, population, quality, external freshness/conformance, migration/reconciliation and configuration versions.

---

# 13. Change, recalculation and restatement

Controlled causes:

- presentation-only;
- prospective semantic change;
- retrospective semantic restatement;
- source correction;
- late-arriving fact;
- identity/mapping correction;
- migration remediation;
- implementation defect;
- evidence/conformance change;
- quality/threshold change.

Recalculation under same semantic version creates a new execution/result.

A semantic change requires new definition/version or controlled retrospective restatement.

Issued ReportSnapshot never changes silently.

Restatement creates new execution/snapshot/artifact plus cause, scope, changed-member summary and link to prior issue.

Old report remains what was issued.

---

# 14. Reconstruction levels

Each report snapshot/artifact has one:

- EXACT_RECONSTRUCTABLE
- VALUE_REPRODUCIBLE_SOURCE_LIMITED
- SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE
- LINEAGE_ONLY_LIMITED
- RECONSTRUCTION_BLOCKED_OR_UNKNOWN

Evidence disposition/provider limitation may reduce current reconstruction level but never mutate historical values/issue facts.

Material degradation creates `RECONSTRUCTION_LIMITATION_CHANGED` control observation linked to affected snapshot/evidence.

---

# 15. Quality vector

The previous one-primary-quality-class concept is superseded.

Every result has complete `ResultQualityVector` with one state for every applicable dimension:

- population completeness;
- source availability;
- source freshness;
- authority conformance;
- identity resolution;
- temporal consistency;
- evidence reconstructability;
- migration provenance;
- reconciliation;
- effect certainty;
- calculation conformance;
- access/disclosure;
- comparability.

Non-applicable is explicit.

No dimension overwrites another.

Candidate dimension/limitation states include complete/partial known/partial unknown/stale/mixed time/migration limited/evidence limited/source unavailable/reconciliation open/effect indeterminate included or excluded/unknown quarantined/not applicable/unsupported/blocked.

---

# 16. Decision-use assessment

Allowed uses:

- INFORMATIONAL_MONITORING
- OPERATIONAL_CONTROL
- MANAGEMENT_REVIEW
- COMMERCIAL_DECISION_SUPPORT
- GOVERNED_APPROVAL_SUPPORT
- EXTERNAL_ISSUED_REPORT
- AUDIT_RECONSTRUCTION

For each declared use, exact DecisionUseAssessment returns:

- USE_PERMITTED
- USE_PERMITTED_WITH_LIMITATIONS
- USE_BLOCKED

It binds use-profile version, quality vector, passed/failed rules, blocking dimensions, material limitations and disclosures.

Optional presentation summary is derived for one use only and cannot suppress dimensions or upgrade use.

A metric may be monitoring-permitted and approval-blocked.

---

# 17. Report-use composition

Every ReportDefinitionVersion binds one or more `ReportDecisionUseProfile`s containing:

- use/audience/criticality;
- required/optional members;
- minimum member eligibility;
- quality/evidence/freshness/completeness requirements;
- access/disclosure/residency;
- indeterminate/reconciliation treatment;
- issue/export restrictions;
- required limitations/non-meaning.

Every ReportExecution/Snapshot has ReportUseAssessment:

- exact profile;
- exact members and their DecisionUseAssessments;
- required-member presence;
- report source-cut/quality/access/evidence assessment;
- incompatible/blocked members;
- REPORT_USE_PERMITTED, PERMITTED_WITH_LIMITATIONS or BLOCKED;
- issue eligibility.

Informational metric cannot become approval support through report title/composition/warning.

Blocked use cannot be issued for that use.

---

# 18. Subsequent reliance on old reports

Distinct:

## IssueTimeReportUseAssessment

Immutable original issue eligibility under then-governing use, members, quality, access, evidence, audience and policy.

## SubsequentRelianceAssessment

Required for a new load-bearing use of an existing snapshot/artifact after original issue.

It revalidates:

- current relying principal/context;
- current intended use profile;
- current access/security/legal/disclosure/residency;
- current restatement/supersession/withdrawal;
- current reconstruction/evidence/conformance;
- current definition support;
- current-truth divergence;
- required limitations.

Disposition:

- RELIANCE_PERMITTED
- RELIANCE_PERMITTED_WITH_LIMITATIONS
- RELIANCE_BLOCKED

Later blocked reliance does not rewrite old issue. Old issue permission does not grant perpetual access/current use.

Old report cannot authorize a new command; current P1.7 authority/guards apply.

---

# 19. Effect uncertainty

Effect states remain no-effect proven, external confirmed, domain confirmed, indeterminate, partial, or unresolved variance accepted.

Accepted unresolved variance closes control attention but does not establish no effect/confirmed effect.

Metrics explicitly include separately, expose range, exclude/disclose or block.

No old age/timeout/operational closure converts indeterminate to actual/no effect.

---

# 20. Aggregation

Every metric declares:

- FULLY_ADDITIVE
- TIME_SEMI_ADDITIVE
- DIMENSION_SEMI_ADDITIVE
- NON_ADDITIVE
- DISTINCT_RECOMPUTE
- BLOCKED_AGGREGATION

Numeric type does not determine behavior.

Aggregation preserves contribution identity, hierarchy, correction lineage, definition, source authority, actual family, grain/population, time cut, currency/FX purpose, unit, calendar, quality, migration/evidence and access comparability.

Incompatible values are segmented, limited or blocked.

Ratios/rates/averages/percentiles/distinct counts recompute at target scope.

Split/proportional attribution requires versioned basis, conservation and rounding residual.

---

# 21. Portfolio/currency/time

Cross-project totals require one declared reporting currency and exact FX purpose/source/rate/fixing/version/conversion stage/rounding.

No latest spot default or mixed FX purpose.

Point positions require one accepted cut.

Mixed-time observations cannot be one current total where simultaneity matters.

Unlike actual families remain separate.

Cross-tenant aggregation, benchmark and learned influence are prohibited by default.

---

# 22. Safe aggregate disclosure

Aggregate disclosure is denied where no explicit `AggregateDisclosurePolicy` exists.

Policy must cover source sensitivity, audience, minimum/concentration/suppression/generalization, differencing/filtering, drill-through, export, inference/re-identification and tenant/project/residency scope.

Exact thresholds are later security/legal design, but absence is never permission.

---

# 23. Statistical/composite metrics

Statistical/score metrics bind `SampleSufficiencyRule` or explicitly prohibit inferential use.

No universal sample threshold is invented.

Composite index binds exact component versions, weights, normalization, missing behavior, sample, validity and non-meaning.

It cannot average away blocking technical/evidence/authority/identity limitations or create award/debarment authority.

---

# 24. Sourcing/Award catalogue

Candidate reporting includes:

- requirements/allocation/package readiness;
- RFQ lifecycle/issue/revision;
- invitations and dispatch/delivery/acknowledgment separately;
- supplier response coverage/revisions/completeness;
- source/normalized/buyer-adjusted/supplier-confirmed layers;
- comparison readiness/comparability/ambiguities;
- recommendation/approval;
- AwardDecision;
- external handoff/reconciliation.

One supplier with multiple emails/revisions contributes once to participation.

Draft/proposal ≠ issued; recommendation ≠ AwardDecision; AwardDecision ≠ Commitment; external acknowledgment ≠ posting/acceptance.

---

# 25. Commercial catalogue

Where P07 active, metrics derive from exact CommercialEffectVector dimensions and COMPONENT/OBLIGATION subject grain.

Separate Commitment, minimum obligation, qualification credit, changes, claim/assessment/certification, retention, advance, allowance, recovery, commercial tax, external accounting posting and paid cash.

No generic actual cost, shadow ledger, forced equality or budget invention.

P07 inactive returns not applicable/unsupported, not zero.

---

# 26. Control observations

Control observations are deterministic derived conditions, not business states.

Classes include threshold, missing evidence, incomplete population, stale source, reconciliation, effect uncertainty, authority/access, identity/mapping, configuration/definition, dependency/sequence, data quality and business-rule rejection.

Acknowledgment/assignment does not clear source predicate.

Accepted variance preserves whether predicate remains true and does not mean false/resolved/compliant/no effect.

No CPM/BPM/GRC platform.

---

# 27. Supplier performance

Supplier analytics remains:

- tenant-private;
- relationship/context/time bound;
- dimension-specific;
- population-fair;
- evidence/attribution qualified;
- access/confidentiality controlled;
- non-causal unless proven;
- unable to award, exclude, debar, commit, certify or pay.

No global score, cross-tenant reputation/benchmark/training/learned influence or weak-identity merge.

---

# 28. Report/export/evidence

ReportSnapshot binds exact member results/source cut/quality/access/reconstruction.

ReportArtifactVersion binds exact format, renderer/template/locale/timezone/member mapping/content integrity/sensitivity.

PDF/XLSX/CSV/JSON are distinct artifacts.

Edited spreadsheet is external working copy; cannot re-enter as correction/truth except through bounded import/proposal/command.

Issue/dispatch/delivery/acknowledgment remain distinct communication facts.

Dependency validation checks active/compatible metric/projection/report members before issue.

Machine-readable manifest preserves exact meaning.

---

# 29. Query/chat seam

Reporting request resolves through registered P1.7 QUERY with principal/context, metric/report version, scope, time/actual family, consistency cut, pagination, quality and access.

Answer components classify:

- authoritative fact;
- metric result;
- projection result;
- external observation;
- report snapshot;
- control observation;
- proposal/scenario;
- inference/summary;
- operational status;
- unknown/unsupported.

Chat cannot guess ambiguous actual cost/current/savings/overdue/all/best terms; claim all from partial; hide quality; claim unsupported causation; use session memory as authority; execute command by wording; or expose restricted/cross-tenant data.

Untrusted external content cannot select tools/operations/context.

Chat runtime is optional; P1.9 owns UX and P1.10 owns reasoning/autonomy.

---

# 30. A0–A3 minimum report pack

Eight reports:

1. requirement/allocation control;
2. tender/RFQ register;
3. supplier response register;
4. normalization/comparison readiness;
5. recommendation/approval control;
6. AwardDecision/handoff;
7. open controls/data quality;
8. immutable sourcing-event snapshot pack.

Uses product-owned/manual/structured evidence.

No email/ERP/CDE connector, public API, broker, supplier account, chat, AI, warehouse, P07 or historical migration required.

Connector-dependent external metrics are not applicable/unsupported/unavailable, never zero.

---

# 31. Internal hostile audit history

Initial internal verdict:

`FAIL — three narrow semantic blockers.`

## BL-P18-01

Contribution identity ambiguous under correction/replacement/reclassification.

Closed by occurrence/lineage/conservation identities and ContributionDispositionRule.

## BL-P18-02

Independent quality dimensions had no closed overall use disposition.

Closed by ResultQualityVector plus per-use permitted/limited/blocked assessment; no primary-class suppression.

## BL-P18-03

Metric-level use eligibility did not compositionally control report use/issue.

Closed by ReportDecisionUseProfile and ReportUseAssessment.

Additional hardening:

- acyclic exact dependency graph;
- accepted variance preserves source predicate;
- reconstruction-level degradation observation;
- sample sufficiency without invented threshold;
- safe aggregate disclosure deny default;
- issue-time use versus current subsequent reliance.

Post-remediation internal verdict:

`PASS — external hostile audit ready.`

---

# 32. Current gate claim

- G1 every metric has versioned definition/source/grain/population/formula/time/quality/contribution meaning — PASS
- G2 reports/projections cannot write truth — PASS
- G3 actual families distinct — PASS
- G4 effective/recorded/period/position/aging semantics explicit — PASS
- G5 projection evolution/restatement non-silent — PASS
- G6 quality/limitations/use fitness explicit — PASS
- G7 external authority/freshness/evidence preserved — PASS
- G8 aggregation/double count/currency/time/access controlled — PASS
- G9 supplier analytics tenant-private/evidence-based — PASS
- G10 control observations not domain state/workflow — PASS
- G11 report/query/chat classified/cited/non-authoritative — PASS
- G12 A0–A3 no connector/AI — PASS
- G13 no BI/warehouse/formula/GRC/supplier-network second XL; P07 sole XL — PASS
- G14 P1.1–P1.7 regression — PASS
- G15 product code locked — PASS
- G16 internal hostile PASS; Claude pending — PASS/PENDING EXTERNAL

Regression claim:

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- P1.7 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 33. Candidate ADRs

No ADR status changed.

## ADR-0033 — Metric semantic and authority grammar

Candidate: `ACCEPT SEMANTIC DECISION`

Versioned metric definition, closed class, source/grain/population/calculation/time/quality/access contract and occurrence/lineage/conservation/disposition identity.

## ADR-0034 — Projection/report snapshot/restatement and use

Candidate: `ACCEPT SEMANTIC DECISION`

Distinct definition/execution/result/snapshot/artifact/issue, immutable issued snapshots, explicit recalculation/restatement/reconstruction, report use composition and subsequent reliance.

## ADR-0035 — Time/status/actual/forecast

Candidate: `ACCEPT SEMANTIC DECISION`

Distinct source/effective/recorded/observed/known-at/publication times, closed primary bases, named truth/actual families and preserved forecast history.

## ADR-0036 — Quality and decision-use

Candidate: `ACCEPT SEMANTIC DECISION`

ResultQualityVector, explicit limitations and use-specific permitted/limited/blocked assessment.

## ADR-0037 — Aggregation/contribution/comparability

Candidate: `ACCEPT SEMANTIC DECISION`

Contribution identity/conservation, declared additivity, semantic/currency/time/quality/access comparability and safe disclosure deny default.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

State whether any accepted upstream ADR must reopen.

---

# 34. Required hostile scenarios

Attack at minimum:

## Metric/contribution

1. +100 original, -100 reversal, +120 replacement;
2. forward adjustment without reversal;
3. zero-net reclassification out/in;
4. proportional split with rounding residual;
5. duplicate replay versus legitimate repeated event;
6. latest-row/dedup implementation attempt;
7. ambiguous legacy actual;
8. source/normalized/adjusted/confirmed value collapse.

## Quality/use

9. partial known + stale + reconciliation open + indeterminate excluded;
10. metric permitted for monitoring but blocked for approval;
11. quality summary hides vector;
12. missing payment source shown zero;
13. first page shown complete;
14. access-filtered rows inferred absent;
15. quality improves after refresh;
16. issued report quality later degrades.

## Report composition/reliance

17. approval pack includes informational-only composite;
18. optional blocked member;
19. same snapshot used for different use/audience;
20. old report cited for new AwardDecision;
21. report restated after original issue;
22. user loses access;
23. provider conformance fails later;
24. evidence disposed;
25. old report forwarded externally;
26. original issue remains historically valid while new reliance blocked.

## Time/actual

27. physical progress before certification;
28. certification before ERP posting;
29. posting before cash payment;
30. effective month-end versus known-at month-end;
31. late-arriving fact;
32. forecasts changed before actual;
33. current forecast used retrospectively;
34. generic actual cost;
35. calendar/threshold changes;
36. mixed-time portfolio total.

## Projection/snapshot

37. formula change after report issue;
38. new event type changes historical projection;
39. source correction;
40. identity/hierarchy correction;
41. template-only change;
42. live link changes after issue;
43. workbook edited/re-uploaded;
44. vendor version history lost;
45. data refresh and cache refresh differ;
46. reconstruction no longer recalculable but snapshot verifiable.

## Aggregation/access

47. allocation appears in package/project/portfolio;
48. award and Commitment both present;
49. component and obligation both present;
50. product and ERP representation both present;
51. native and translated currency both present;
52. project response rates averaged;
53. portfolio percentile from project percentiles;
54. different FX purposes;
55. different as-of cuts;
56. incomplete project hidden in portfolio;
57. cross-tenant benchmark;
58. small aggregate inference/differencing;
59. no AggregateDisclosurePolicy.

## Supplier/control/chat

60. one supplier many revisions;
61. supplier not invited is penalized;
62. contractor-caused delay attributed to supplier;
63. composite used to auto-award/debar;
64. control observation acknowledged but predicate remains;
65. accepted variance on unresolved effect;
66. alert becomes workflow/domain status;
67. prompt injection in supplier/import/external payload;
68. chat says all from partial;
69. AI claims causation;
70. old report in session memory used as authority;
71. no chat runtime activated.

## A0–A3 / scope

72. first tender manual capture/no connector;
73. no AI;
74. no P07;
75. external accounting metric requested;
76. no warehouse/BI tool selected;
77. team attempts generic formula/report builder;
78. team attempts data warehouse/CPM/GRC/supplier network/AI insight second XL.

Add your own scenarios.

---

# 35. Required response format

## VERDICT

Choose exactly:

`PASS — P1.8 Reporting, Analytics & Control Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.9.`

or

`FAIL — P1.8 remains open; blockers below must be remediated.`

## BLOCKERS

For each:

- blocker ID;
- section/clause;
- failure mode;
- concrete scenario;
- why later work must choose metric/contribution/quality/use/time/restatement/aggregation meaning;
- narrowest remediation.

Do not convert physical implementation choices into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic;
- contractor/evidence/legal;
- later physical implementation;
- P1.9/P1.10-owned.

## GATE CHECK

PASS/FAIL with reason:

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

- P1.1 REOPEN = YES/NO
- P1.2 REGRESSION = YES/NO
- P1.3 REOPEN = YES/NO
- P1.4 REOPEN = YES/NO
- P1.5 REOPEN = YES/NO
- P1.6 REOPEN = YES/NO
- P1.7 REOPEN = YES/NO
- SECOND XL = CLEAN/FAIL
- A0–A3 ACTIVATION = CLEAN/FAIL

## ADR IMPACT

For ADR-0033 through ADR-0037 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0016 and ADR-0017 remain later-owned.

State whether any accepted upstream ADR must reopen.

## P1.9 READINESS

Choose:

`READY AFTER P1.8 FINAL CHECKPOINT`

or

`NOT READY`

---

# 36. Final question

Is any load-bearing P1.8 decision still ambiguous enough that P1.9 or physical design must choose:

- which source occurrence/economic lineage contributes under correction;
- which quality condition takes precedence and whether the result/report is fit for the declared use;
- whether an old issued report can support a new decision;
- what actual/time/source-cut meaning applies;
- whether a projection change recalculates, restates or mutates history;
- whether an aggregate double counts or combines incomparable values;
- whether supplier/control/chat output creates authority;
- whether A0–A3 requires connector/AI/warehouse?

A clean PASS is appropriate only if the answer is NO.
