# P1.8 — Reporting, Analytics & Control Model — Workplan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE WORKPLAN / P1.8 UNLOCKED  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Workplan purpose

This workplan controls P1.8 execution.

P1.8 defines the deterministic semantic layer through which users, exports, later dashboards, chat and future AI may understand procurement and commercial facts without creating a second truth writer, shadow ledger, silent formula drift or generic BI/data-platform gravity well.

The governing rule is:

> **Reports and analytics are reproducible, versioned projections over authoritative facts; they are never independent business truth.**

P1.8 decides:

- metric meaning;
- projection meaning;
- time/as-of semantics;
- actual/forecast/status distinctions;
- completeness/freshness/limitation semantics;
- aggregation and double-count rules;
- report/export snapshot identity;
- control-observation meaning;
- supplier-performance boundaries;
- query/chat reporting truth classes.

P1.8 does **not** select or design:

- dashboard technology;
- data warehouse/lakehouse technology;
- BI tools;
- visualization system;
- physical database/materialized-view implementation;
- report-layout UX;
- AI model, reasoning, ranking or recommendation behavior;
- arbitrary tenant-authored formulas.

---

# 2. Entry baseline

P1.8 may proceed because:

- P1.1–P1.7 are closed/frozen as applicable;
- P1.7 external hostile audit passed with blockers none;
- ADR-0006 and ADR-0029–ADR-0032 are accepted;
- no upstream ADR reopened;
- P07 remains the sole independent XL gravity well;
- A0–A3 remains executable without connectors or AI;
- product code remains locked.

Canonical upstream inputs:

1. `PROJECT_STATE.md`;
2. `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`;
3. `P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`;
4. `P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`;
5. `P1_6_FROZEN_EVIDENCE_DOCUMENT_COMMUNICATION_MODEL_V1_0.md`;
6. `P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`;
7. `P1_8_ENTRY_HANDOFF_V0_1.md`;
8. current `02_research/control/adr_log.csv`.

No upstream semantic rule may be reinterpreted by a reporting convenience.

---

# 3. Non-negotiable inherited constraints

## 3.1 Authority

- Every reported load-bearing fact retains its P1.4 OWN/MIRROR/REFERENCE/OUT classification.
- A report, metric, warehouse copy, cache, export or dashboard is never the authoritative writer.
- External facts retain source, freshness, conflict and conformance state.
- Tenant/project/ContractingAuthorityContext access boundaries apply to every metric component and aggregate.

## 3.2 Commercial semantics

P1.8 must preserve without collapse:

- ScopeBasis;
- ValuationBasis;
- CapabilityProfile;
- RequirementAllocation versus ProcurementPackage;
- AwardDecision versus Commitment;
- claim versus assessment versus certification;
- Commitment obligation versus minimum obligation/qualification;
- CommercialEffectVector dimensions;
- physical actual;
- product commercial/certified actual;
- accounting-posted actual;
- paid/cash actual;
- planned, forecast, confirmed and actual facts;
- product commercial truth versus external accounting truth.

## 3.3 Evidence and history

- Every load-bearing metric can trace to source facts/events and, where required, EvidenceVersion/SourceLocator/RelianceBinding.
- Projection rebuild never edits source history.
- Historical issued/exported report snapshots remain reconstructable while retained.
- Correction/restatement is explicit and lineage-preserving.
- Redaction/disposition does not reverse domain history and must not make a report silently claim stronger evidence than remains available.

## 3.4 Integration/query semantics

- Query consistency and multi-resource cut are explicit.
- Pagination/partial results cannot masquerade as complete populations.
- External observations remain distinct from domain facts.
- EFFECT_INDETERMINATE and PARTIAL_EFFECT must remain visible where relevant.
- No report/query/chat path bypasses P1.7 operation classes or authority.

## 3.5 AI and cross-tenant boundary

- Chat/AI may later summarize or explain registered metrics only through classified results and citations.
- Derived explanations are not authoritative facts.
- Cross-tenant supplier rankings, benchmarks, learned mappings or reputation are OUT by default.
- P1.8 does not decide model capability or autonomy.

---

# 4. P1.8 execution strategy

P1.8 will proceed in the following controlled sequence:

1. control baseline and evidence plan;
2. metric semantic grammar;
3. projection/version/restatement contract;
4. time/status/actual/forecast contract;
5. data-quality/completeness/freshness contract;
6. sourcing, award and commercial metric catalogues;
7. expediting/control-observation catalogue;
8. supplier-performance boundary;
9. portfolio/cross-project aggregation contract;
10. report snapshot/export/evidence contract;
11. query/chat reporting seam;
12. A0–A3 minimum report pack and golden-thread proof;
13. integrated candidate;
14. internal hostile audit and remediation;
15. self-contained Claude hostile audit;
16. final ADR reconciliation/checkpoint only after dual PASS.

No metric catalogue may be treated as frozen before the semantic grammar, time model and quality model are established.

---

# 5. Workstream P1.8-00 — control baseline and evidence plan

## Objective

Create the working control surface before defining metrics.

## Tasks

1. Reconcile all upstream reporting-relevant terms and invariants.
2. Extract every upstream projection/reporting obligation, especially:
   - projection versioning from Roadmap v1.3;
   - P1.4 authority/freshness/context rules;
   - P1.5 actual/forecast/effect distinctions;
   - P1.6 provenance/restatement evidence;
   - P1.7 query consistency, partiality and effect-stage semantics.
3. Build a reporting assumption/threat register.
4. Build a reporting terminology register preserving exact upstream meanings.
5. Build a targeted evidence plan for current official product practices only where architecture gaps require it.
6. Define primary versus secondary evidence authority for metric semantics.
7. Confirm no broad competitor feature inventory is needed.

## Targeted external-practice evidence topics

Use official documentation only where relevant to semantic decisions:

- report snapshot/as-of behavior;
- metric-definition/catalogue practices;
- projection restatement/version behavior;
- partial/stale-data disclosure;
- cross-project currency aggregation;
- supplier-performance scoring boundaries;
- export auditability;
- conversational analytics citations/limitations.

Marketing feature claims do not establish reliability or authority semantics.

## Output

`P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`

## Exit condition

All reporting-relevant inherited terms, assumptions, evidence debts and scope guards are explicit.

---

# 6. Workstream P1.8-01 — MetricDefinition semantic and authority contract

## Objective

Define one bounded grammar for load-bearing metrics before creating named KPI catalogues.

## Required semantic object

A candidate `MetricDefinition` must bind at minimum:

- stable MetricKey;
- metric semantic version;
- metric class;
- name and precise business meaning;
- decision/use purpose;
- owning semantic/domain steward;
- source authority profile;
- source fact/event families;
- grain;
- population/scope;
- inclusion rules;
- exclusion rules;
- numerator/denominator where applicable;
- formula/calculation order;
- units;
- currency and FX purpose/policy where applicable;
- time/window/as-of/cut basis;
- dimensional breakdowns permitted;
- completeness/freshness thresholds or explicit no-threshold justification;
- evidence/projection/config dependencies;
- applicability/effective period;
- correction/recalculation/restatement behavior;
- access/sensitivity/residency;
- unsupported/undefined cases;
- ADR/evidence basis.

## Candidate closed metric classes to test

- COUNT;
- DISTINCT_COUNT;
- AMOUNT_BALANCE;
- AMOUNT_FLOW;
- QUANTITY_BALANCE;
- QUANTITY_FLOW;
- RATIO;
- RATE;
- DURATION;
- AGING;
- MILESTONE_STATUS_DISTRIBUTION;
- VARIANCE;
- COVERAGE;
- COMPLETENESS;
- EXCEPTION_CONTROL_COUNT;
- RECONCILIATION_POSITION;
- FORECAST_PROJECTION;
- SCENARIO_PROJECTION;
- QUALITATIVE_RULE_CLASSIFICATION.

The audit may reduce, split or reject this candidate set.

## Required prohibitions

- no generic executable formula language;
- no tenant-authored arbitrary SQL/expression scripts;
- no metric whose source authority is merely “dashboard” or “spreadsheet”;
- no status/score whose meaning depends on current UI color or label;
- no implicit denominator population;
- no metric whose actual family is unspecified;
- no metric whose missing data silently becomes zero;
- no metric whose confidence score substitutes for evidence completeness.

## Output

`P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`

## Exit condition

A builder can implement a metric catalogue without choosing business meaning, source authority, time basis or quality behavior.

---

# 7. Workstream P1.8-02 — projection, report versioning and restatement contract

## Objective

Define how projections and report results evolve without silent history change.

## Required distinctions

- MetricDefinition version;
- ProjectionDefinition version;
- ReportDefinition version;
- ProjectionExecution/Build identity;
- ReportSnapshot/Export identity;
- live query result;
- issued/published report snapshot;
- restated result;
- superseded definition;
- corrected source facts;
- recalculated projection;
- changed presentation only.

## Required semantics

Define:

- source event/fact families;
- projection applicability/effective period;
- event semantic-version compatibility;
- effective-time versus recorded-time rebuild;
- full versus incremental rebuild meaning;
- corrected event/reclassification treatment;
- new event type historical applicability;
- source identity-mapping correction impact;
- migration limitation remediation impact;
- old versus restated result lineage;
- reason/ADR/change reference;
- report snapshot content/member identity;
- publication/issue time versus as-of time;
- reproducibility expectations where source payload was legitimately disposed.

## Hard rule

A formula, source family, mapping, FX purpose, calendar, inclusion rule, quality threshold or projection interpretation change creates a new explicit definition/version or controlled restatement path.

It never changes prior issued/exported reports silently.

## Output

`P1_8_PROJECTION_REPORT_VERSIONING_RESTATEMENT_CONTRACT_V0_1.md`

## Exit condition

Historical and restated values are distinguishable and reconstructable, and implementation cannot choose whether a changed metric is “the same KPI” without an explicit semantic rule.

---

# 8. Workstream P1.8-03 — time, status, actual and forecast contract

## Objective

Freeze the temporal and truth-family semantics used by every catalogue.

## Required time classes

Evaluate and define:

- AS_OF_EFFECTIVE_TIME;
- AS_OF_RECORDED_TIME;
- PERIOD_FLOW;
- POINT_IN_TIME_BALANCE;
- COHORT_WINDOW;
- ROLLING_WINDOW;
- DURATION;
- AGING_FROM_TRIGGER;
- CALENDAR_PERIOD;
- BUSINESS_CALENDAR_PERIOD;
- MILESTONE_VARIANCE;
- SNAPSHOT_PUBLICATION_TIME.

## Required status/truth classes

Preserve:

- REQUIRED;
- PLANNED;
- FORECAST;
- CONFIRMED;
- ACTUAL.

Separate actual families:

- PHYSICAL_ACTUAL;
- PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL;
- EXTERNAL_ACCOUNTING_POSTED_ACTUAL;
- PAID_CASH_ACTUAL.

Where another actual family is required, it must be separately named and owned rather than folded into generic ACTUAL.

## Required rules

- aging trigger is explicit;
- pause/suspension/hold treatment is explicit;
- business calendar/timezone version is bound;
- future-dated/backdated facts are handled explicitly;
- open-ended periods are defined;
- duration and status cannot infer each other automatically;
- forecast does not overwrite actual;
- current value does not erase prior forecasts;
- overdue alert is not a domain-status writer.

## Output

`P1_8_TIME_STATUS_ACTUAL_FORECAST_CONTRACT_V0_1.md`

## Exit condition

No report can use “actual,” “current,” “overdue,” “period” or “as of” without a closed semantic meaning.

---

# 9. Workstream P1.8-04 — data quality, completeness, freshness and limitation contract

## Objective

Prevent visually complete reports from hiding incomplete, stale, mixed-time, migrated, disputed or indeterminate source conditions.

## Candidate result-quality classes

Evaluate and close a bounded set including:

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
- NOT_APPLICABLE;
- UNSUPPORTED;
- UNKNOWN_QUARANTINED.

## Required semantics

Define:

- population completeness;
- pagination/completeness proof;
- source freshness and threshold version;
- multi-source/multi-time cut;
- unavailable source treatment;
- indeterminate effect inclusion/exclusion policy;
- migration-limited records;
- evidence-deficiency effects;
- identity/reconciliation conflict;
- zero versus missing versus not applicable;
- report-level aggregation of component quality;
- quality improvement/restatement behavior;
- machine-readable and human-visible limitations.

## Hard rules

- missing is not zero;
- stale is not current;
- partial is not complete;
- mixed-time is not a simultaneous snapshot;
- excluded indeterminate effects must be disclosed;
- included indeterminate effects must be separately quantified/classified;
- unresolved identity conflict cannot be hidden inside an aggregate;
- red/amber/green alone is never sufficient quality semantics.

## Output

`P1_8_DATA_QUALITY_COMPLETENESS_FRESHNESS_CONTRACT_V0_1.md`

## Exit condition

Every load-bearing metric/report can state whether its population and source basis are complete, current, comparable and authoritative enough for its declared use.

---

# 10. Workstream P1.8-05 — sourcing, tender, comparison and award reporting catalogue

## Objective

Define deterministic A0–A3 sourcing metrics without assuming connector or AI availability.

## Candidate metric families

### Requirements and packaging

- requirement lines by lifecycle/status/owner;
- allocated/unallocated/partially allocated scope;
- package readiness;
- scope lineage coverage;
- package overlap/double-consumption exceptions;
- aging from authorized requirement to sourcing start.

### Tender/RFQ

- tenders/RFQs issued/open/closed/withdrawn/superseded;
- invitation coverage;
- delivery/receipt/acknowledgment coverage where applicable;
- addendum coverage and unresolved recipients;
- response due/overdue aging;
- supplier response coverage;
- revision/withdrawal state;
- incomplete/late/non-compliant response counts.

### Normalization/comparison

- source-to-normalized coverage;
- unresolved normalization ambiguities;
- comparison readiness;
- missing scope/term/technical evidence;
- supplier-confirmed contractable-basis coverage;
- proposal/AI-derived versus validated-line counts.

### Recommendation/approval/award

- recommendation state;
- approval/DOA state;
- evidence/control exceptions;
- AwardDecision status;
- award-to-handoff timing;
- award without effective Commitment distinction;
- external handoff status/limitations.

## Required controls

- no “bidder participation rate” without exact invited/applicable denominator;
- no response count based only on email messages where one supplier submitted multiple revisions;
- no comparison ranking metric that silently embeds unsupported weights;
- no awarded-value metric that treats recommendation as award or award as Commitment;
- no complete-coverage claim from paginated/partial supplier data.

## Output

`P1_8_SOURCING_AWARD_REPORTING_CATALOGUE_V0_1.md`

## Exit condition

The A0–A3 sourcing rail has a useful but bounded reporting catalogue with exact source, grain, denominator, time and quality meanings.

---

# 11. Workstream P1.8-06 — commercial, cost and reconciliation analytics catalogue

## Objective

Define reporting over activated commercial domains without creating a shadow P07 ledger or external accounting authority.

## Candidate metric families

Where authoritative data exists and the relevant activation tier is enabled:

- Commitment obligation position;
- approved change position;
- minimum obligation and qualification position;
- certified gross;
- retention held;
- advance outstanding effect;
- allowance consumption;
- recovery effect;
- commercial tax component;
- open commercial obligations;
- Commitment/component exposure;
- variance against approved attribution/budget/reference;
- product commercial versus external accounting reconciliation;
- certified versus posted versus paid positions;
- unresolved reconciliation positions;
- effect-indeterminate external postings.

## Required controls

- one CommercialEffectVector dimension cannot be relabelled as another;
- balance versus period flow remains explicit;
- current position derives from authoritative effects, not editable report cells;
- no generic “committed cost” until the exact included effects are defined;
- no “actual cost” without actual-family ownership;
- no accounting payment/cash claim when only product certification exists;
- no budget variance when authoritative budget/reference is absent or migration-limited;
- no hidden FX-purpose mixing;
- corrections/restatements preserve original report lineage.

## Output

`P1_8_COMMERCIAL_COST_RECONCILIATION_ANALYTICS_CATALOGUE_V0_1.md`

## Exit condition

Commercial reporting can be implemented without inventing a new ledger, balance class, accounting fact or value authority.

---

# 12. Workstream P1.8-07 — expediting and control-observation catalogue

## Objective

Define useful control visibility without creating a second workflow, CPM scheduler or GRC system.

## Candidate observation families

- required/planned/forecast/confirmed/actual milestone distributions;
- overdue milestone and aging measures;
- long-lead/expediting exposure;
- pending approval/review aging;
- missing evidence/source/control prerequisites;
- open reconciliation issues;
- EFFECT_INDETERMINATE operations/items;
- quarantined observations/import items;
- connector freshness/conformance limitations;
- communication delivery/acknowledgment gaps;
- snapshot-to-establishment or publication recovery gaps;
- unresolved migration limitations;
- expiring securities/warranties only where canonical domain facts exist.

## Required distinctions

- alert ≠ business status;
- control exception ≠ breach/claim/legal conclusion;
- overdue projection ≠ automatic default;
- aging metric ≠ workflow transition;
- escalation indicator ≠ authority grant;
- reconciliation issue ≠ value overwrite;
- connector degradation ≠ supplier failure;
- missing evidence ≠ negative business fact automatically.

## Output

`P1_8_EXPEDITING_CONTROL_OBSERVATION_CATALOGUE_V0_1.md`

## Exit condition

Control visibility is actionable and source-linked but cannot create lifecycle state or an independent controls platform.

---

# 13. Workstream P1.8-08 — supplier-performance analytics boundary

## Objective

Define what supplier performance can legitimately mean within one tenant using evidence-backed dimensions, without creating shared reputation truth.

## Required dimension separation

Evaluate distinct dimensions such as:

- invitation/response behavior;
- commercial competitiveness;
- qualification/compliance;
- technical responsiveness;
- delivery/fulfilment;
- quality/acceptance;
- change/claim behavior;
- documentation/evidence completeness;
- communication responsiveness;
- accounting/payment interactions where tenant-authorized and source-qualified.

No dimension may silently become one universal supplier score.

## Required rules

- tenant-private by default;
- project/context/time/sample size explicit;
- source facts versus derived classification explicit;
- supplier identity resolution quality explicit;
- non-response reason and applicability considered;
- award selection bias acknowledged;
- proposed/model-derived score classified as proposal/inference;
- no hidden cross-tenant benchmark;
- no future supplier-network truth created by analytics convenience;
- no reputational/legal conclusion beyond supported evidence.

## Output

`P1_8_SUPPLIER_PERFORMANCE_ANALYTICS_BOUNDARY_V0_1.md`

## Exit condition

Supplier analytics remain evidence-based, tenant-private, dimensioned and non-authoritative where inferred.

---

# 14. Workstream P1.8-09 — portfolio and cross-project aggregation contract

## Objective

Define safe aggregation across projects, legal entities and ContractingAuthorityContexts.

## Required semantics

- tenant/legal entity/project/context scope;
- access intersection;
- comparability class;
- source authority compatibility;
- actual-family compatibility;
- currency and FX purpose;
- calendar/timezone/period alignment;
- denominator/population alignment;
- hierarchy and rollup lineage;
- double-count prevention;
- inter-project/shared allocation treatment;
- component/Commitment/package identity lineage;
- partial/mixed-time/stale source aggregation;
- migrated/reference-only record treatment;
- corrected identity-mapping impact;
- restatement behavior.

## Required anti-double-count tests

At minimum test:

- one RequirementAllocation represented under multiple package views;
- one Commitment component associated with package, project and portfolio views;
- Commitment and accounting representation both present;
- superseded/corrected events;
- duplicated imported/external facts;
- parent/child hierarchy totals;
- multi-currency values;
- shared/JV or multi-entity contexts;
- partial-period projects;
- tenant-private supplier identity relationships.

## Output

`P1_8_PORTFOLIO_CROSS_PROJECT_AGGREGATION_CONTRACT_V0_1.md`

## Exit condition

A portfolio result can prove scope, comparability, time/currency basis and absence or explicit treatment of double count.

---

# 15. Workstream P1.8-10 — report snapshot, export and evidence contract

## Objective

Define when a report/export is a live projection, frozen snapshot or issued artifact and how it remains reconstructable.

## Required objects/semantics to evaluate

- ReportDefinition;
- ReportExecution;
- ReportSnapshot;
- ReportExport;
- ReportPublication/Issue;
- member/query population manifest;
- MetricDefinition/ProjectionDefinition versions;
- as-of/cut/recorded time;
- source/projection build versions;
- quality/limitation summary;
- access/disclosure/redaction profile;
- ContentIdentity/EvidenceVersion where issued or relied upon;
- correction/restatement/supersession lineage;
- retention/disposition behavior.

## Required distinctions

- live query ≠ frozen snapshot;
- download time ≠ as-of time;
- issued report ≠ underlying domain event;
- report evidence ≠ source-business authority;
- restated report ≠ silent replacement;
- presentation-only formatting change ≠ semantic metric change;
- redacted report ≠ altered source truth;
- export success ≠ recipient receipt/acceptance.

## Output

`P1_8_REPORT_SNAPSHOT_EXPORT_EVIDENCE_CONTRACT_V0_1.md`

## Exit condition

Reports used for decisions, dispute, audit or external issue have exact semantic and evidence lineage without becoming a document-management subsystem.

---

# 16. Workstream P1.8-11 — report query and chat handoff contract

## Objective

Freeze the reporting result classes later UI/chat/AI may expose without making natural language a new truth layer.

## Required answer/result classes

Use and refine P1.7 classes:

- AUTHORITATIVE_PRODUCT_FACT;
- VERSIONED_PRODUCT_PROJECTION;
- EXTERNAL_OBSERVED_FACT;
- SOURCE_EVIDENCE_CONTENT;
- PROPOSAL_DERIVED_CONTENT;
- OPERATIONAL_CONTROL_STATUS;
- INFERENCE_SUMMARY;
- UNKNOWN_UNRESOLVED.

## Required semantics

- registered MetricKey/ProjectionKey access;
- query consistency and multi-resource cut;
- as-of and population disclosure;
- partial/pagination disclosure;
- source/projection/metric citations;
- limitation/freshness disclosure;
- inference versus correlation versus causation wording;
- no “all,” “current,” “best,” “worst,” “paid,” “actual” or “overdue” without exact semantics;
- no conversational override of access, formula, denominator or quality state;
- explanation links to source facts/evidence where permitted;
- abstention where the metric is unsupported or evidence-limited.

P1.9 owns interface/confirmation/navigation.

P1.10 owns reasoning/evaluation/autonomy.

## Output

`P1_8_REPORT_QUERY_CHAT_HANDOFF_CONTRACT_V0_1.md`

## Exit condition

Later chat can answer reporting questions through the same metric/projection authority model without inventing hidden calculations or claims.

---

# 17. Workstream P1.8-12 — A0–A3 minimal report pack and proof

## Objective

Prove useful reporting for the first monetization rail with no connector, chat or AI.

## Minimum pack to evaluate

1. requirements/allocation/package status and aging;
2. RFQ/tender issued/open/closed status;
3. supplier invitation and response coverage;
4. response revision/compliance/normalization status;
5. comparison readiness and unresolved evidence;
6. recommendation/approval state;
7. AwardDecision and external handoff status;
8. overdue/aging/control exceptions;
9. missing evidence and unresolved recipient/communication conditions;
10. exact report as-of, population, completeness and source/version information.

## Proof conditions

- ordinary internal/manual operations only;
- structured files permitted but not required;
- no named email/ERP/CDE connector;
- no supplier account/network;
- no public API/broker;
- no chat/AI;
- no P07 activation required;
- no arbitrary dashboard formula;
- no architecture invention outside P1.8 contracts.

## Output

`P1_8_A0_A3_MINIMAL_REPORT_PACK_PROOF_V0_1.md`

## Exit condition

A0–A3 produces operationally useful, reproducible reporting under the minimum deployment profile.

---

# 18. Workstream P1.8-13 — integrated candidate

## Objective

Consolidate all accepted candidate semantics into one coherent P1.8 audit target.

## Required content

- governing thesis;
- MetricDefinition grammar;
- metric classes;
- projection/report/snapshot identities;
- time/status/actual/forecast semantics;
- quality/limitation classes;
- sourcing/award catalogue;
- commercial/reconciliation catalogue;
- expediting/control catalogue;
- supplier-performance boundary;
- portfolio aggregation;
- report snapshot/export/evidence;
- query/chat handoff;
- A0–A3 report pack;
- one-XL controls;
- candidate ADRs;
- full gate claim.

## Output

`P1_8_INTEGRATED_REPORTING_ANALYTICS_CONTROL_CANDIDATE_V0_1.md`

## Exit condition

The integrated document contains no unresolved cross-contract contradiction and can be audited without hidden dependency on dashboard technology.

---

# 19. Workstream P1.8-14 — internal hostile audit

## Objective

Attack the integrated candidate before external review.

## Mandatory hostile scenarios

At minimum:

1. formula changes after an issued report;
2. new event type changes historical projection;
3. physical progress displayed as certified value;
4. certified value displayed as paid cash;
5. external payment source stale/unavailable;
6. AED and USD projects aggregated with wrong FX purpose;
7. non-atomic mixed-time portfolio query;
8. paginated supplier responses displayed as complete coverage;
9. migrated legacy `actual` with unknown meaning;
10. corrected identity mapping changes supplier aggregation;
11. one Commitment component double-counted across package/project/portfolio views;
12. indeterminate external effect included/excluded from exposure without disclosure;
13. exported report predates later correction/restatement;
14. user attempts manual dashboard value/status edit;
15. alert/control exception treated as business state;
16. supplier score uses another tenant’s data;
17. AI summary claims causation from correlation;
18. chat answers “all” from a partial page;
19. no-connector first tender requires useful reporting;
20. attempt to build generic BI/data warehouse/cross-tenant benchmark scope;
21. missing denominator treated as zero;
22. one report combines effective-time and recorded-time values without disclosure;
23. one project’s accounting-posted value is compared with another project’s certified value;
24. redaction/disposition removes source payload after report issue;
25. one report definition changes only the label but actually changes formula meaning;
26. a forecast is overwritten by later actual rather than preserved;
27. overdue aging continues through an approved suspension incorrectly;
28. quality state improves and prior report silently changes;
29. supplier performance is based only on awarded suppliers, creating selection bias;
30. portfolio access exposes facts from a project/context the user cannot access.

Add hostile scenarios discovered during work.

## Required outputs

- `audits/P1_8_INTERNAL_HOSTILE_AUDIT_V0_1.md`;
- remediation artifact(s) for every blocker;
- updated integrated candidate;
- `audits/P1_8_POST_REMEDIATION_INTERNAL_RECHECK_V0_1.md`.

## Internal PASS standard

Every gate G1–G16 must pass, with no P1.1–P1.7 regression, second XL clean, A0–A3 clean and product code locked.

---

# 20. Workstream P1.8-15 — external Claude hostile audit

## Objective

Obtain an independent self-contained audit with no repository access.

## Packet requirements

The packet must include:

- mission and failure criteria;
- frozen upstream constraints;
- current official-practice evidence used;
- complete semantic candidate;
- internal audit failures/remediations;
- all G1–G16 claims;
- regression/one-XL/A0–A3 claims;
- candidate ADRs;
- mandatory hostile scenarios;
- exact response format.

## Required outputs

- `audits/P1_8_CLAUDE_SELF_CONTAINED_HOSTILE_AUDIT_PACKET_V0_1.md`;
- `audits/P1_8_CLAUDE_HOSTILE_AUDIT_PROMPT_V0_1.md`.

## Rule

P1.8 cannot close on internal PASS alone.

Any Claude FAIL keeps P1.8 active and P1.9+ locked until narrow remediation and a new audit round pass.

---

# 21. Candidate ADR set

No ADR is accepted by this workplan.

Candidate decisions to evaluate:

## ADR-0033 — metric semantic and authority model

Potential decision:

Adopt versioned MetricDefinition with explicit source authority, grain, population, formula, time, quality, currency, evidence and restatement semantics; reports never become source truth.

## ADR-0034 — projection/report versioning and restatement

Potential decision:

Adopt explicit ProjectionDefinition/ReportDefinition/ReportSnapshot identities and non-silent restatement lineage when formulas, event applicability, mappings, policies or source corrections change.

## ADR-0035 — result quality and limitation semantics

Potential decision:

Adopt bounded quality/limitation classes that prevent partial, stale, mixed-time, migrated, evidence-limited, reconciliation-open and indeterminate data from masquerading as complete current truth.

## ADR-0036 — portfolio aggregation and double-count prevention

Potential decision:

Adopt authority/time/currency/comparability-aware portfolio aggregation with canonical identity lineage and explicit anti-double-count rules.

## ADR-0037 — supplier-performance analytics boundary

Potential decision:

Adopt tenant-private, evidence-based, dimension-specific supplier analytics with no universal reputation score or cross-tenant benchmark by default.

Candidate IDs/titles may be refined before final reconciliation. No status change occurs before dual hostile PASS.

---

# 22. Gate matrix

P1.8 may close only when all gates pass.

## G1 — metric definition completeness

Every load-bearing metric has one versioned definition, source authority, grain, scope, formula, time, quality and currency/unit meaning.

## G2 — no reporting truth writer

Reports, projections, caches, exports, alerts and dashboards cannot write or silently alter domain/commercial truth.

## G3 — actual-family separation

Physical, product commercial/certified, accounting-posted and paid/cash actuals remain distinct in definitions, catalogues and aggregates.

## G4 — time semantics

Effective-time, recorded-time, period flow, point balance, duration, aging and report publication/as-of time are explicit.

## G5 — projection evolution/restatement

Formula, source, mapping, event applicability, policy and correction changes are versioned, traceable and non-silent.

## G6 — quality/limitations

Partial, stale, mixed-time, migration/evidence-limited, unavailable, reconciliation-open and effect-indeterminate data is visible and cannot masquerade as complete truth.

## G7 — external source/evidence

External-source metrics preserve authority, version, freshness, conflict, conformance and P1.6 evidence requirements.

## G8 — aggregation/no double count

Portfolio aggregation preserves tenant/legal/project/context/currency/time comparability and canonical identity lineage without double count.

## G9 — supplier analytics boundary

Supplier-performance analytics remain tenant-private, dimensioned, evidence-based and non-authoritative where inferred.

## G10 — control-observation boundary

Alerts, exceptions and aging observations never become domain state or a second workflow/GRC/CPM engine.

## G11 — query/chat/AI boundary

Reporting answers remain classified, cited, limitation-aware and non-authoritative where derived.

## G12 — A0–A3 minimum reporting

Useful reporting works with no connector, public API, supplier account, chat or AI.

## G13 — one-XL guard

No BI/warehouse/formula/GRC/supplier-network/benchmark/AI-insight second XL; P07 remains sole XL.

## G14 — upstream regression

P1.1–P1.7 regression = NO.

## G15 — product code lock

Product code remains NOT STARTED / LOCKED.

## G16 — dual hostile review

Internal hostile review PASS and Claude hostile review PASS.

---

# 23. Evidence-debt handling

P1.8 must preserve rather than conceal upstream evidence debts:

- FT-02;
- FT-06;
- FT-09 / CR-02;
- FT-10;
- ADR-0010 exact GCC/regional legal/rate/statutory evidence;
- ADR-0011 detailed attribution/suspense mechanics;
- ADR-0016 external-party UX;
- ADR-0017 broader AI readiness.

If a proposed metric depends on unresolved evidence or later-owned semantics:

- classify it as unsupported, provisional, configuration-dependent or later-owned;
- do not invent a default formula or source authority;
- do not block the A0–A3 minimum pack unless the metric is genuinely required for that rail.

---

# 24. Scope and burden controls

P1.8 must not become:

- enterprise data warehouse/lakehouse;
- universal semantic layer for arbitrary customer data;
- generic BI/report builder;
- arbitrary formula engine;
- general ETL/MDM platform;
- accounting consolidation/FP&A system;
- CPM/master-scheduling system;
- GRC/control case-management platform;
- supplier-network/reputation database;
- cross-tenant benchmark service;
- AI insight/recommendation engine.

The metric catalogue is bounded by activated procurement/commercial workflows and evidence-backed control needs.

Any new metric family must pass:

1. decision relevance;
2. authoritative source availability;
3. semantic non-duplication;
4. A0–A5 activation relevance;
5. no second-writer risk;
6. no second-XL risk;
7. reconstructability;
8. quality/limitation visibility.

---

# 25. Completion and state-transition rule

P1.8 remains ACTIVE until:

1. all required contracts/catalogues/proofs exist;
2. integrated candidate exists;
3. internal hostile audit PASS;
4. Claude hostile audit PASS;
5. blockers = none;
6. G1–G16 PASS;
7. no P1.1–P1.7 reopening;
8. second XL clean;
9. A0–A3 clean;
10. candidate ADRs reconciled;
11. frozen P1.8 contract, final verdict and checkpoint exist;
12. canonical `PROJECT_STATE.md` is updated.

Only then may P1.9 be unlocked.

Product code remains locked throughout P1.8.

---

# 26. Immediate next action

Create:

`P1_8_CONTROL_BASELINE_AND_EVIDENCE_PLAN_V0_1.md`

Then proceed to:

`P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`

No dashboard tool, warehouse technology, visualization design or named BI product may be selected before the semantic contracts are substantially complete.
