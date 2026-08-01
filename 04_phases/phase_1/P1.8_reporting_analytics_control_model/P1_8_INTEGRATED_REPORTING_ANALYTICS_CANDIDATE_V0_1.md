# P1.8 — Integrated Reporting, Analytics and Control Candidate v0.1

**Date:** 2026-08-01  
**Status:** INTEGRATED INTERNAL AUDIT CANDIDATE  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Precedence

This integrated candidate consolidates:

1. `P1_8_WORKPLAN_V0_1.md`;
2. `P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`;
3. `P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`;
4. `P1_8_PROJECTION_REPORT_VERSIONING_RESTATEMENT_CONTRACT_V0_1.md`;
5. `P1_8_TIME_STATUS_ACTUAL_FORECAST_CONTRACT_V0_1.md`;
6. `P1_8_DATA_QUALITY_COMPLETENESS_FRESHNESS_CONTRACT_V0_1.md`;
7. `P1_8_SOURCING_AWARD_REPORTING_CATALOGUE_V0_1.md`;
8. `P1_8_COMMERCIAL_COST_ANALYTICS_CATALOGUE_V0_1.md`;
9. `P1_8_EXPEDITING_CONTROL_OBSERVATION_CATALOGUE_V0_1.md`;
10. `P1_8_SUPPLIER_PERFORMANCE_ANALYTICS_BOUNDARY_V0_1.md`;
11. `P1_8_PORTFOLIO_CROSS_PROJECT_AGGREGATION_CONTRACT_V0_1.md`;
12. `P1_8_REPORT_EXPORT_SNAPSHOT_EVIDENCE_CONTRACT_V0_1.md`;
13. `P1_8_REPORT_QUERY_CHAT_SEAM_V0_1.md`;
14. `P1_8_A0_A3_MINIMUM_REPORT_PACK_V0_1.md`;
15. targeted official reporting-practice evidence.

Underlying contracts remain controlling where this candidate summarizes rather than repeats detail.

No ADR status changes before dual hostile PASS.

---

# 2. P1.8 thesis

> Reports and analytics are reproducible, versioned projections over authoritative facts; they are never independent business truth.

P1.8 decides:

- metric semantic/authority meaning;
- projection/execution/result meaning;
- time/status/actual/forecast meaning;
- quality/completeness/freshness/limitation meaning;
- aggregation/contribution/comparability meaning;
- report snapshot/export/issue/restatement meaning;
- control-observation meaning;
- supplier-performance boundaries;
- report/query/chat truth classes;
- A0–A3 minimum reporting profile.

P1.8 does not select dashboard, warehouse, BI, database, renderer, search or AI technology.

---

# 3. Metric semantic object

Every load-bearing metric has immutable `MetricDefinitionVersion` binding:

- stable MetricKey/class/name/business meaning/non-meaning;
- decision/use purpose and criticality;
- source fact/event families and OWN/MIRROR/REFERENCE/OUT;
- authoritative source/writer and evidence/conformance;
- base grain and contribution identity;
- PopulationDefinition and denominator;
- inclusion/exclusion;
- ordered deterministic calculation;
- unit/currency/FX/calculation policy;
- time basis and truth/actual family;
- completeness/freshness/quality requirements;
- access/sensitivity/residency;
- correction/recalculation/restatement/evolution;
- ADR/evidence basis.

Dashboard, spreadsheet, warehouse, AI or connector is never business authority.

---

# 4. Closed metric classes

Every metric has one primary class:

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

Calculations use a restricted deterministic grammar. No arbitrary SQL, code, scripts or tenant-authored formula language.

---

# 5. Metric execution/result

A `MetricExecution` binds one exact metric definition, population, source cut, governing time/calendar/FX/quality/configuration versions and contribution derivation/membership.

A `MetricResult` binds:

- result/execution/definition identity;
- value or explicit absence state;
- unit/currency;
- scope/dimensions;
- time/as-of basis;
- source authority composition;
- quality/limitations;
- population/contribution summary;
- evidence/projection lineage;
- access/disclosure;
- restatement/supersession.

Metric result is projection, not source truth.

---

# 6. Value and population semantics

Value states remain:

- PRESENT;
- ZERO_CONFIRMED;
- MISSING_EXPECTED;
- UNKNOWN_UNRESOLVED;
- NOT_APPLICABLE;
- UNSUPPORTED;
- SOURCE_UNAVAILABLE;
- RESTRICTED;
- QUARANTINED;
- BLOCKED.

Population is defined independently from returned rows.

Pagination/truncation/access filtering cannot masquerade as complete eligible population.

Ratio/rate/coverage denominator is explicit and versioned.

---

# 7. Time and truth families

Distinct times:

- source;
- effective;
- recorded;
- observed;
- known-at;
- as-of cut;
- execution;
- publication;
- communication occurrence.

Closed primary time bases include effective/recorded positions/flows, cohort/rolling windows, duration, aging, milestone variance and publication context.

Truth/status families:

- REQUIRED;
- PLANNED;
- FORECAST;
- CONFIRMED;
- ACTUAL;
- SCENARIO;
- TARGET.

ACTUAL requires one named family:

- PHYSICAL_ACTUAL;
- PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL;
- EXTERNAL_ACCOUNTING_POSTED_ACTUAL;
- PAID_CASH_ACTUAL;
- exact COMMUNICATION_ACTUAL subtype;
- EXTERNAL_TECHNICAL_ACTUAL;
- exact DOMAIN_TRANSACTION_ACTUAL.

No generic actual/current/overdue/period.

---

# 8. Forecast/history

Plan, forecast, confirmation, scenario and actual remain separate historical facts/results.

Later actual does not overwrite prior forecasts/confirmations.

Forecast binds method/tool/model/configuration, horizon, source/assumptions, forecast-as-of and uncertainty where relevant.

Confidence never changes forecast/scenario into confirmed or actual.

---

# 9. Projection and report versions

Distinct:

- MetricDefinitionVersion;
- ProjectionDefinitionVersion;
- ProjectionExecution/Result;
- ReportDefinitionVersion;
- ReportExecution;
- ReportSnapshot;
- ReportArtifactVersion;
- ReportIssue/CommunicationOccurrence;
- RestatementRecord.

A live query, materialized view, report snapshot and exported artifact are not interchangeable.

---

# 10. Change and restatement

Controlled change causes include:

- presentation only;
- prospective semantic change;
- retrospective semantic restatement;
- source correction;
- late-arriving fact;
- identity/mapping correction;
- migration remediation;
- implementation defect;
- evidence/conformance change;
- quality/threshold change.

Recalculation creates new execution/result.

Issued snapshot remains immutable.

Restatement creates new snapshot/artifact and explicit linkage/cause/scope.

---

# 11. Reconstruction

Each report snapshot/artifact has one reconstruction level:

- EXACT_RECONSTRUCTABLE;
- VALUE_REPRODUCIBLE_SOURCE_LIMITED;
- SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE;
- LINEAGE_ONLY_LIMITED;
- RECONSTRUCTION_BLOCKED_OR_UNKNOWN.

Evidence disposition or provider limitation may reduce current reconstruction level but never mutate prior issued values/history.

---

# 12. Quality model

Quality dimensions remain distinct:

- population completeness;
- source availability;
- source freshness;
- authority conformance;
- identity resolution;
- temporal consistency;
- evidence reconstructability;
- migration provenance;
- reconciliation state;
- effect certainty;
- calculation conformance;
- access/disclosure completeness;
- comparability.

Candidate primary quality classes:

- COMPLETE;
- PARTIAL_KNOWN;
- PARTIAL_UNKNOWN;
- STALE;
- MIXED_TIME;
- MIGRATION_LIMITED;
- EVIDENCE_LIMITED;
- EXTERNAL_SOURCE_UNAVAILABLE;
- RECONCILIATION_OPEN;
- EFFECT_INDETERMINATE_INCLUDED;
- EFFECT_INDETERMINATE_EXCLUDED;
- UNKNOWN_QUARANTINED;
- NOT_APPLICABLE;
- UNSUPPORTED;
- BLOCKED.

Quality is machine/human visible and never reduced to color/confidence alone.

---

# 13. Effect uncertainty

Indeterminate effects remain separate from no-effect and confirmed effects.

Metric policy explicitly:

- excludes/discloses;
- includes in bounded exposure/range;
- shows separately;
- or blocks.

Accepted unresolved variance closes an operational obligation but does not assert no effect.

---

# 14. Aggregation

Every metric declares:

- FULLY_ADDITIVE;
- TIME_SEMI_ADDITIVE;
- DIMENSION_SEMI_ADDITIVE;
- NON_ADDITIVE;
- DISTINCT_RECOMPUTE;
- BLOCKED_AGGREGATION.

Aggregation preserves:

- contribution identity;
- hierarchy/lineage;
- definition/source/actual/time/currency/quality/access comparability;
- correction/reclassification;
- anti-double-count;
- conservation for split attribution.

Ratios, averages, percentiles and distinct counts recompute at target scope.

---

# 15. Portfolio/cross-project

Cross-project aggregation requires compatible metric versions, source authority, actual family, grain/population, time cut, FX purpose, calendar, quality and access.

Incompatible values are segmented, limited or blocked.

Mixed-time is not one current total.

Cross-tenant aggregation/benchmark/learned influence remains OUT by default.

---

# 16. Sourcing/Award catalogue

The candidate catalogue covers:

- requirement/allocation/package readiness;
- RFQ/tender lifecycle;
- invitation/dispatch/delivery/acknowledgment;
- supplier response population/revisions/completeness;
- normalization/source/adjusted/confirmed layers;
- comparison readiness/comparability;
- recommendation/approval;
- AwardDecision;
- external handoff/reconciliation.

Recommendation ≠ AwardDecision ≠ Commitment.

One supplier with multiple messages/revisions contributes once to participation coverage.

---

# 17. Commercial catalogue

Where P07 active, metrics derive from exact CommercialEffectVector dimensions and subject grains.

Separate:

- Commitment/minimum obligation/qualification;
- changes;
- claim/assessment/certification;
- retention;
- advance;
- allowance;
- recovery;
- commercial certificate tax;
- external accounting-posted;
- paid cash;
- reconciliation/attribution/exposure.

No shadow ledger, generic actual cost or forced equality.

P07 inactive = not applicable/unsupported, never fabricated zero.

---

# 18. Control observations

Control observations are deterministic derived conditions, not business states.

Classes include time threshold, evidence, population, stale source, reconciliation, effect uncertainty, authority/access, identity/mapping, configuration/definition, dependency/sequence, data quality and business-rule rejection observations.

Acknowledgment/assignment/accepted variance does not assert source resolution.

No CPM/BPM/GRC gravity well.

---

# 19. Supplier performance

Supplier analytics is:

- tenant-private;
- dimension-specific;
- evidence/population bound;
- identity/context/time qualified;
- non-causal unless proven;
- access/confidentiality controlled.

No global score, cross-tenant reputation, hidden debarment/award authority or model-derived shared influence.

---

# 20. Snapshot/export/evidence

ReportSnapshot binds exact results/member set/source cut/quality/access/reconstruction.

ReportArtifactVersion binds exact content/renderer/template/format/locale/integrity.

Spreadsheet edits are external working copies, not source/report corrections.

Issue/dispatch/delivery/acknowledgment remain communication facts.

Restatement preserves prior issue.

---

# 21. Query/chat seam

Reporting requests resolve through registered P1.7 QUERY operations.

Answer components classify source facts, metric/projection results, external observations, snapshots, control observations, proposals/scenarios, inference, operational status or unknown.

Chat cannot:

- invent metric meaning;
- guess actual family/denominator/baseline/time;
- claim all from partial;
- hide quality;
- claim unsupported causation;
- use session memory as authority;
- execute command through wording;
- expose cross-tenant/restricted data.

Chat runtime remains optional; P1.9/P1.10 later-owned.

---

# 22. A0–A3 minimum pack

Eight-report pack:

1. requirement/allocation control;
2. tender/RFQ register;
3. supplier response register;
4. normalization/comparison readiness;
5. recommendation/approval control;
6. AwardDecision/handoff;
7. open controls/data quality;
8. immutable sourcing-event snapshot pack.

Works with manual/structured evidence and no connector, public API, chat, AI, warehouse, P07 or historical migration.

---

# 23. Official-practice evidence conclusion

Official Power BI, Looker and SAP documentation corroborates:

- model version ≠ data freshness;
- point-in-time copied models require refresh/source-cut visibility;
- semantic definitions benefit from version control;
- model changes can break dependent reports and require validation;
- draft/production states differ;
- exported artifacts are distinct portable copies;
- vendor version history is bounded and insufficient for contractual reconstruction.

No named BI technology or generic modeling language is adopted.

---

# 24. Candidate ADRs

No status changes yet.

- ADR-0033 — versioned metric semantic/authority grammar;
- ADR-0034 — projection/report snapshot/restatement semantics;
- ADR-0035 — explicit time/status/actual/forecast semantics;
- ADR-0036 — multi-dimensional quality/limitation semantics;
- ADR-0037 — contribution/comparability-controlled aggregation.

---

# 25. Current gate claim before hostile audit

- G1 metric definition — candidate PASS;
- G2 no report writer — candidate PASS;
- G3 actual families — candidate PASS;
- G4 time semantics — candidate PASS;
- G5 version/restatement — candidate PASS;
- G6 quality/limitations — candidate PASS;
- G7 external authority/evidence — candidate PASS;
- G8 aggregation/double count/access — candidate PASS;
- G9 supplier boundary — candidate PASS;
- G10 control observations — candidate PASS;
- G11 chat/AI boundary — candidate PASS;
- G12 A0–A3 no connector/AI — candidate PASS;
- G13 one-XL — candidate PASS;
- G14 upstream regression — candidate PASS;
- G15 product code locked — PASS;
- G16 dual hostile — PENDING.

This claim must be attacked independently.
