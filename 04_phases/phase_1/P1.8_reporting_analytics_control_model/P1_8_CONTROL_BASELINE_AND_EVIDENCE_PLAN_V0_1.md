# P1.8 — Reporting, Analytics & Control Model — Control Baseline and Evidence Plan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CONTROL BASELINE / EVIDENCE PLAN  
**Parent:** `P1_8_WORKPLAN_V0_1.md`  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This document establishes the control and evidence surface for P1.8 before any metric, KPI, report or dashboard catalogue is treated as architecture.

It exists to prevent five common reporting failures:

1. inventing attractive KPIs before defining their source authority, population, grain and time basis;
2. allowing a report, spreadsheet, warehouse copy or dashboard to become a second business-truth writer;
3. importing competitor terminology or visual patterns as if they were proven contractor requirements;
4. collapsing distinct commercial, physical, accounting and cash meanings into one convenient “actual” value;
5. letting missing, stale, partial, migrated or mixed-time data appear as complete current truth.

The governing rule is:

> **Reporting evidence may inform metric and projection design, but no reporting convenience may reinterpret frozen domain, authority, evidence, integration or temporal semantics.**

---

# 2. Control status

P1.8 entered correctly because:

- P1.1–P1.7 are closed/frozen as applicable;
- P1.7 external hostile audit passed;
- ADR-0006 and ADR-0029–ADR-0032 are accepted;
- no upstream ADR reopened;
- P07 remains the sole independent XL gravity well;
- A0–A3 remains executable without connectors or AI;
- product code remains locked.

This document does **not** authorize:

- metric implementation;
- dashboard/UI design;
- warehouse/lakehouse selection;
- arbitrary report-builder scope;
- external provider selection;
- AI insight/recommendation design;
- cross-tenant benchmarking;
- product code.

---

# 3. Canonical control sources

The following are authoritative inputs for P1.8 meaning, in precedence order where they address the same subject:

1. `PROJECT_STATE.md`;
2. `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`;
3. `P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`;
4. `P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`;
5. `P1_6_FROZEN_EVIDENCE_DOCUMENT_COMMUNICATION_MODEL_V1_0.md`;
6. `P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`;
7. `P1_8_ENTRY_HANDOFF_V0_1.md`;
8. `P1_8_WORKPLAN_V0_1.md`;
9. current `02_research/control/adr_log.csv`;
10. P1.2 primary contractor evidence and reconciliations where reporting practice was observed;
11. later P1.8 targeted evidence collected under this plan.

A downstream report convention cannot supersede a frozen upstream semantic contract.

---

# 4. Evidence authority hierarchy

P1.8 uses the project-wide evidence hierarchy, specialized for reporting and analytics.

## E1 — FROZEN ARCHITECTURE / ACCEPTED SEMANTIC DECISION

Examples:

- accepted ADRs;
- frozen P1.4–P1.7 contracts;
- frozen CommercialEffectVector meanings;
- frozen authority, evidence, query and event distinctions.

Use:

- binding constraints;
- terminology and semantic ownership;
- mandatory reporting separations;
- prohibited metric interpretations.

May be reopened only through controlled change based on genuine contradiction, not product convenience.

## E2 — PRIMARY CONTRACTOR REALITY EVIDENCE

Examples when available:

- live procurement status reports;
- tender/RFQ trackers;
- bid comparison summaries;
- package registers;
- commitment/change/certification summaries;
- long-lead or expediting reports;
- supplier evaluation forms;
- aging, exception or reconciliation reports;
- actual project reporting packs;
- contractor interviews explaining how a number is used and challenged.

Use:

- decision-use and operating-language evidence;
- real populations, grains, exceptions and manual reconciliations;
- identification of reports people actually rely on;
- evidence of where spreadsheet reporting currently becomes shadow truth.

Primary evidence does not override accepted upstream semantic constraints, but genuine contradiction may trigger controlled review.

## E3 — PRIMARY TRANSACTION / REPORT ARTIFACT

Examples:

- exact issued report/export snapshot;
- exact source data and calculation workbook used for a decision;
- report definition, formula sheet or reconciliation notes;
- exact report revision and as-of date;
- issue/transmittal evidence.

Use:

- formula, numerator/denominator, source and snapshot reconstruction;
- correction/restatement analysis;
- evidence of hidden manual adjustments;
- proof of whether a report is live, snapshot, issued or mutable.

## E4 — REGULATORY / CONTRACTUAL / PROFESSIONAL REQUIREMENT

Examples:

- contractual reporting obligations;
- audit, retention or evidentiary requirements;
- applicable accounting/reporting definitions where the external system is authoritative;
- legal requirements affecting issued reports or supplier evaluations.

Use:

- bounded mandatory obligations;
- jurisdiction/contract-specific report or retention semantics;
- explicit legal/evidence debt.

Do not infer general legal requirements from product practice.

## E5 — OFFICIAL PRODUCT / PLATFORM DOCUMENTATION

Examples:

- official SAP Ariba, Coupa, Procore, Autodesk/BuildingConnected, Oracle, Microsoft, Tableau or similar documentation;
- official semantic-model, report-snapshot, data-freshness, export, audit or conversational-analytics documentation.

Use:

- current platform practice;
- proven interface/reporting patterns;
- terminology comparison;
- known limitations and disclosure patterns;
- candidate hostile scenarios.

Official product documentation never outranks contractor reality or frozen architecture.

## E6 — PROFESSIONAL / INDUSTRY PRACTICE

Examples:

- recognized procurement, project-controls, cost-management or commercial-management guidance;
- professional bodies and established practice references.

Use:

- terminology and candidate metric families;
- external critique of gaps;
- identification of contractual/control considerations.

It does not establish product scope or authority by itself.

## E7 — INTERNAL REASONING / HYPOTHESIS

Examples:

- proposed metric classes;
- candidate quality-state taxonomy;
- suspected reporting failure modes;
- inferred best practices;
- architecture threats.

Use:

- working hypotheses to test;
- hostile scenarios;
- candidate design only.

Every load-bearing internal hypothesis must be reconciled before freeze.

---

# 5. Evidence acceptance rules

A source is acceptable for a load-bearing P1.8 decision only when the relevant claim can be tied to:

- exact source identity;
- source authority class;
- exact version/date where material;
- specific section/page/location or captured observation;
- the reporting question it supports;
- any limitations, ambiguity or commercial context;
- whether it corroborates, contradicts or merely illustrates the candidate rule.

The following are insufficient by themselves:

- marketing screenshots;
- generic “industry standard KPI” claims;
- a dashboard label without formula/population definition;
- a visual chart with no source/freshness/as-of meaning;
- a competitor feature list;
- an AI-generated summary without primary/official source linkage;
- a spreadsheet total without reconstructable source and adjustment history;
- a current external link presented as historical report evidence.

---

# 6. Anti-anchoring and anti-feature-copy rules

## 6.1 Reality before product patterns

Existing contractor practice and frozen domain semantics are evaluated before competitor terminology.

A product feature may reveal a useful pattern, but cannot establish that:

- the product should own the source truth;
- the metric should be mandatory;
- the metric is reliable;
- the displayed formula is suitable for the beachhead;
- the same aggregation grain applies;
- a named connector or BI platform is required.

## 6.2 Semantics before visualization

Do not capture chart types, dashboard layouts or color systems as architecture decisions in P1.8.

Capture only the underlying semantic practice, such as:

- snapshot versus live query;
- as-of time;
- freshness disclosure;
- formula versioning;
- denominator disclosure;
- drill-through lineage;
- data-quality labels;
- correction/restatement behavior;
- access boundary;
- export identity.

## 6.3 No popularity weighting

A metric is not accepted because many products display it.

Acceptance requires:

- a valid decision use;
- authoritative source basis;
- exact grain/population/time semantics;
- no upstream semantic collapse;
- acceptable data availability and quality behavior;
- no second-XL or activation burden.

## 6.4 Preserve primary language

When contractor evidence is collected, capture labels and explanations verbatim before normalization.

If normalized terminology is introduced, preserve:

- raw term;
- normalized candidate term;
- meaning difference;
- source/context;
- reason for normalization.

---

# 7. Frozen inherited reporting obligations

The following obligations are already decided and are not research questions.

## 7.1 Authority and source

- metric/report/projection is never the authoritative writer;
- source facts retain OWN/MIRROR/REFERENCE/OUT;
- one authoritative source/writer per effective period remains;
- external values retain source, freshness, conflict and conformance state;
- access follows tenant/project/ContractingAuthorityContext.

## 7.2 Commercial and actual-family separation

Reports must preserve:

- AwardDecision ≠ Commitment;
- claim ≠ assessment ≠ certification;
- certification ≠ accounting posting ≠ payment;
- physical actual ≠ product commercial/certified actual ≠ external accounting-posted actual ≠ paid/cash actual;
- planned ≠ forecast ≠ confirmed ≠ actual;
- product commercial value ≠ external accounting value;
- CommercialEffectVector dimensions remain distinct.

## 7.3 Evidence and history

- load-bearing results must be source/projection/config traceable;
- issued/exported snapshots remain identifiable and reconstructable while retained;
- correction/restatement is history-preserving;
- a projection rebuild cannot rewrite source history;
- evidence disposition cannot make a report silently appear more certain than the remaining evidence supports.

## 7.4 Query and integration

- current/as-of/projection/external-observed/mixed results remain distinguishable;
- pagination/partiality cannot masquerade as completeness;
- mixed-time data cannot be presented as one simultaneous authoritative state;
- `EFFECT_INDETERMINATE` and `PARTIAL_EFFECT` remain visible where relevant;
- external observations do not become domain truth;
- report/query/chat access cannot bypass registered operations or authority.

## 7.5 AI and cross-tenant

- AI summaries/inferences are not authoritative facts;
- chat must cite and classify source/metric/projection/limitation;
- cross-tenant supplier scores, rankings, benchmarks and learned business knowledge are OUT by default;
- P1.8 does not decide AI model capability, causality or autonomy.

---

# 8. Reporting terminology control register

The following terms are controlled for P1.8. Later artifacts must either use them consistently or propose an explicit controlled extension.

| Term | Controlled meaning |
|---|---|
| Authoritative fact | Source-domain or authoritative external fact under frozen authority rules |
| MetricDefinition | Versioned semantic definition of one metric, including source, grain, population, formula, time and quality meaning |
| ProjectionDefinition | Versioned derivation from authoritative facts/events into a reproducible view/result family |
| ReportDefinition | Versioned composition of metrics/projections and presentation-independent report membership |
| ProjectionExecution | One identified calculation/build using exact definition and source cut |
| ReportSnapshot | Immutable identified result/member set at a stated as-of and issue/export context |
| Live query result | Non-issued current/as-of query response whose result may change with source facts or projection version |
| Restatement | Explicit new result reflecting correction or changed accepted definition, preserving prior result lineage |
| Presentation-only change | Formatting/layout change that does not alter metric/projection meaning or member values |
| Grain | Lowest authoritative unit at which a metric/result is defined before aggregation |
| Population | Complete set of eligible units under exact scope and time rules |
| Denominator | Explicit eligible population used by ratio/rate/coverage metrics |
| Source time | Time stated by source fact/system where available |
| Effective time | Business-effective time/period under owning semantics |
| Recorded time | Time product/system recorded the fact/event |
| As-of cut | Exact temporal boundary and consistency basis used by a query/projection |
| Period flow | Events/effects occurring within a period under exact time basis |
| Point-in-time balance | Derived position at a specific cut |
| Aging | Duration from an explicit governed trigger, with calendar/hold rules |
| Completeness | Whether the declared population and required sources are fully represented |
| Freshness | Age/validity of external or derived source relative to a versioned threshold |
| Comparability | Whether members share sufficient semantic, currency, time and scope basis for aggregation |
| Limitation | Machine- and human-visible condition restricting interpretation or use |
| Control observation | Derived indication of exception, risk, aging or missing prerequisite; not business state |
| Supplier performance fact | Tenant-owned evidence-backed result for a defined performance dimension |
| Supplier inference/score | Derived classification requiring explicit rules/provenance and never cross-tenant reputation by default |
| Unknown | Required meaning cannot be established from available evidence/source; not zero or not applicable |

---

# 9. Reporting threat and assumption register

## TH-P18-01 — dashboard becomes shadow truth

Risk:

Users manually edit, override or rely on dashboard values that no longer reconcile to authoritative facts.

Control:

- reports are read/projection surfaces;
- correction routes to owning domain;
- any manual note/annotation remains separate evidence/commentary.

## TH-P18-02 — generic actual collapse

Risk:

One “actual” field combines physical, certified, posted and paid positions.

Control:

- actual family mandatory in every relevant MetricDefinition;
- ambiguous legacy actual is migration/evidence limited, not silently normalized.

## TH-P18-03 — hidden denominator drift

Risk:

Response rate, savings rate, compliance rate or coverage changes because eligible populations change silently.

Control:

- explicit denominator population/version/time;
- excluded/unavailable members disclosed;
- formula/population changes create new definition/restatement.

## TH-P18-04 — missing becomes zero

Risk:

Missing supplier response, payment feed, cost code or migrated value is treated as zero.

Control:

- zero, missing, unknown, unsupported and not applicable remain distinct.

## TH-P18-05 — mixed-time portfolio illusion

Risk:

Projects with different source cuts/freshness are aggregated as one current portfolio position.

Control:

- exact multi-resource cut;
- component as-of/freshness;
- MIXED_TIME limitation or block where decision use requires comparability.

## TH-P18-06 — projection formula drift

Risk:

A new event type, formula, FX policy or mapping changes historical dashboard values with no version/restatement trail.

Control:

- versioned MetricDefinition/ProjectionDefinition;
- applicability and rebuild scope;
- old/restated lineage.

## TH-P18-07 — double-count through multiple lineages

Risk:

One RequirementAllocation, Commitment component or commercial effect appears in package, project and portfolio rollups more than once.

Control:

- canonical contribution identity;
- one aggregation path per metric grain;
- explicit allocation/contribution rules;
- anti-double-count hostile tests.

## TH-P18-08 — stale external fact appears authoritative current

Risk:

ERP payment, CDE milestone or other external observation is old or disconnected but displayed as current.

Control:

- source/freshness/conformance state;
- threshold/version;
- stale/unavailable classification.

## TH-P18-09 — control alert becomes business status

Risk:

“Overdue,” “at risk” or “exception” is written back as domain truth or workflow state.

Control:

- control observation is derived only;
- owning-domain command required for any business transition.

## TH-P18-10 — supplier score becomes hidden reputation network

Risk:

Tenant results are pooled or model-derived into cross-tenant supplier ranking.

Control:

- tenant-private evidence basis;
- no cross-tenant benchmark/learning by default;
- separate dimensions, population and limitations.

## TH-P18-11 — issued report loses its historical meaning

Risk:

A report link points to a live regenerated view after formulas or source data change.

Control:

- immutable ReportSnapshot/Export identity;
- exact definitions and source cut;
- explicit restatement/new issue.

## TH-P18-12 — AI summary overstates causation or completeness

Risk:

Chat says “supplier delays caused project delay” or “all RFQs responded” from correlation, partial pagination or mixed-time data.

Control:

- result truth classification;
- complete population proof;
- citation and limitation;
- inference separated from fact.

## TH-P18-13 — reporting scope becomes BI/warehouse XL

Risk:

P1.8 expands into arbitrary formula builder, enterprise lakehouse, generic GRC or universal report designer.

Control:

- bounded semantic catalogue;
- physical analytics platform deferred;
- no arbitrary tenant formula language;
- P07 remains sole XL.

## TH-P18-14 — competitor feature anchoring

Risk:

Common incumbent dashboard features are adopted without beachhead value, source authority or denominator clarity.

Control:

- evidence classification;
- decision-use test;
- no popularity weighting;
- competitor evidence remains secondary.

---

# 10. Open semantic questions requiring P1.8 resolution

The following remain open and must be decided by later P1.8 contracts or catalogues.

## Q-P18-01 — closed MetricDefinition classes

Are the candidate COUNT, BALANCE, FLOW, RATIO, RATE, DURATION, AGING, VARIANCE, COVERAGE, COMPLETENESS, EXCEPTION, RECONCILIATION, FORECAST, SCENARIO and QUALITATIVE classes complete and non-overlapping?

## Q-P18-02 — MetricDefinition version applicability

When a formula or population changes, when is it:

- a new semantic version;
- a prospective new metric;
- a historical restatement;
- a presentation-only change?

## Q-P18-03 — quality-state composition

How do component COMPLETE/PARTIAL/STALE/MIXED/MIGRATION/EVIDENCE/RECONCILIATION/INDETERMINATE conditions roll up to metric and report level without hiding the worst relevant limitation?

## Q-P18-04 — indeterminate-effect amounts

For exposure, commitment, payment or handoff metrics:

- when are indeterminate effects excluded;
- when are they included as a separate bounded range/category;
- when is the whole metric unsupported for a declared decision use?

## Q-P18-05 — issued report restatement

When source facts are corrected after an issued report:

- is a restated report mandatory, optional or prohibited;
- how are original and restated issues linked;
- what evidence remains if source payload was legitimately disposed?

## Q-P18-06 — cross-project currency aggregation

Which values may be aggregated under:

- transaction currency;
- Commitment currency;
- project reporting currency;
- tenant portfolio currency;
- accounting currency?

What FX purpose, fixing date and policy version applies to each metric family?

## Q-P18-07 — comparability gate

What exact semantic differences block or qualify aggregation across projects, legal entities, calendars, valuation bases, actual families and migration states?

## Q-P18-08 — supplier performance dimensions

Which dimensions are acceptable tenant-private facts, for example:

- participation/responsiveness;
- commercial competitiveness;
- technical/compliance result;
- delivery/fulfilment;
- quality/nonconformance;
- change/claim behavior;
- communication/evidence completeness?

Which require primary evidence before inclusion?

## Q-P18-09 — savings/variance metrics

Can “savings” be defined safely in V1, and against which authoritative baseline:

- approved budget;
- estimate;
- previous purchase;
- lowest compliant bid;
- initial offer;
- negotiated offer;
- awarded value;
- external benchmark?

No generic savings KPI may be accepted without one exact basis.

## Q-P18-10 — control-observation lifecycle

How are alerts:

- generated;
- acknowledged/commented;
- resolved when source condition changes;
- retained/reconstructed;

without creating a second workflow/case-management system?

## Q-P18-11 — report snapshot scope

Which outputs require immutable snapshots versus reproducible live/as-of queries, especially:

- management dashboards;
- tender status reports;
- award recommendations;
- commercial statements;
- supplier evaluations;
- exported portfolio reports?

## Q-P18-12 — chat/report answer contract

What minimum metric/projection/quality/source references must accompany:

- authoritative numerical answers;
- external-observed answers;
- trend summaries;
- inferred explanations;
- unsupported/unknown answers?

---

# 11. Evidence debt register entering P1.8

## ED-P18-01 — contractor reporting packs

Status:

`PRIMARY_EVIDENCE_PARTIAL / NOT YET RECONCILED FOR P1.8`

Need:

- exact procurement status reports and trackers;
- tender/RFQ/comparison/award reporting examples;
- commercial/commitment/change/certification summaries where available;
- long-lead/expediting/control reports;
- report revision/as-of/use context.

Purpose:

Identify real decision use, populations, exceptions and shadow-ledger behavior.

## ED-P18-02 — formula and denominator evidence

Status:

`PRIMARY_UNOBSERVED / HIGH-RISK`

Need:

Examples where rates, savings, coverage, aging or supplier scores include explicit formulas and denominator rules.

Purpose:

Prevent accepted KPIs from being based on conventional labels alone.

## ED-P18-03 — issued report correction/restatement

Status:

`PRIMARY_UNOBSERVED / HIGH-RISK`

Need:

Examples of reports corrected after issue, including whether original versions remain and how stakeholders are notified.

Purpose:

Inform snapshot/restatement semantics.

## ED-P18-04 — physical/commercial/accounting/cash reconciliation reports

Status:

`PRIMARY_EVIDENCE_DEBT / HIGH-RISK`

Need:

Reports or interviews showing how contractors distinguish and reconcile these actual families.

Purpose:

Validate display/use patterns without reopening the frozen distinction.

## ED-P18-05 — supplier performance practice

Status:

`PRIMARY_EVIDENCE_PARTIAL / HIGH-RISK`

Need:

Tenant-level supplier evaluation forms, dimensions, evidence basis, review process and use consequences.

Purpose:

Bound supplier analytics and prevent hidden reputation-network scope.

## ED-P18-06 — portfolio aggregation practice

Status:

`PRIMARY_UNOBSERVED / MEDIUM-HIGH RISK`

Need:

Examples of cross-project/company reporting, currency conversion, calendar cuts, double-count prevention and comparability limitations.

## ED-P18-07 — stale/partial/missing-data disclosure

Status:

`PRIMARY_UNOBSERVED / HIGH-RISK`

Need:

Evidence of how current contractor reports disclose or fail to disclose incomplete and stale source data.

## ED-P18-08 — conversational analytics reliability

Status:

`OFFICIAL_PRODUCT_EVIDENCE REQUIRED / NON-BLOCKING FOR CORE METRICS`

Need:

Current official documentation on citations, partial result handling, generated insights, limitations and action boundaries.

Purpose:

Prepare P1.9/P1.10 seam without assuming reliable AI.

## ED-P18-09 — UAE/GCC contractual reporting obligations

Status:

`LEGAL / CONTRACTUAL EVIDENCE DEBT`

Need:

Only where specific report issue, retention, certification, valuation or supplier-evaluation obligations materially affect semantics.

No broad legal conclusion is authorized in P1.8 without primary sources.

---

# 12. Targeted evidence plan

Evidence collection is staged to avoid premature competitor anchoring.

## Stage A — repository reconciliation

Before external research:

1. search P1.2 evidence for reporting artifacts and observed reporting language;
2. map each observation to the controlled terminology register;
3. classify each existing hypothesis as:
   - PRIMARY_CORROBORATED;
   - PRIMARY_CONTRADICTED;
   - PRIMARY_UNOBSERVED;
   - NOT_TESTED;
4. populate the unmodeled reporting-observation register;
5. identify exact evidence gaps that external official practice can illuminate.

## Stage B — targeted official product practice

Research official documentation only for unresolved architecture questions.

### Topic B1 — semantic metric catalogues

Look for:

- governed metric/semantic definitions;
- formula and dimensional metadata;
- lineage and ownership;
- semantic versioning/deprecation;
- certified versus user-defined measures.

Architecture question:

What minimum metadata is necessary for a load-bearing MetricDefinition, and how do mature platforms prevent formula fragmentation?

### Topic B2 — snapshot, as-of and restatement

Look for:

- live versus snapshot reports;
- as-of/effective/recorded-time behavior;
- dataset/report refresh identity;
- issued export history;
- correction/restatement behavior;
- reproducibility limits.

Architecture question:

What proven patterns preserve historical report meaning without freezing every live query result?

### Topic B3 — completeness, freshness and partiality

Look for:

- freshness timestamps;
- stale/incomplete indicators;
- pagination/partial result disclosure;
- refresh failure behavior;
- mixed-source status;
- unavailable-source treatment.

Architecture question:

How should quality conditions remain visible and machine-readable rather than becoming only UI color?

### Topic B4 — cross-project and currency aggregation

Look for:

- reporting currency selection;
- FX source/date/purpose disclosure;
- project/portfolio hierarchy;
- comparability restrictions;
- consolidation and double-count controls.

Architecture question:

Which metadata and blocking/limitation rules are necessary before cross-project values can be aggregated?

### Topic B5 — supplier performance

Look for:

- score dimensions;
- source evidence;
- tenant/private versus network scoring;
- weighting and manual adjustment;
- period and population;
- disputed/corrected evaluations;
- data sufficiency thresholds.

Architecture question:

What can be measured as tenant-owned evidence-backed performance without creating a shared reputation network or opaque score?

### Topic B6 — report export and auditability

Look for:

- export/snapshot identity;
- as-of and generation time;
- filter/population preservation;
- formula/version metadata;
- drill-through/source lineage;
- issued-report correction.

Architecture question:

What makes an exported report reconstructable and distinguishable from a live mutable view?

### Topic B7 — conversational analytics

Look for:

- source citations;
- semantic-model grounding;
- answer confidence/limitation;
- partial-data behavior;
- generated insight versus authoritative metric;
- tool/action separation;
- official accuracy warnings.

Architecture question:

What interface metadata must P1.8 expose so P1.9/P1.10 can support chat without changing metric authority?

## Stage C — professional-practice critique

Use professional guidance only after the core semantic draft exists.

Purpose:

- test missing metric families;
- identify contractual/control reporting obligations;
- challenge time, variance and supplier-performance semantics;
- identify terms likely to be misunderstood.

Professional guidance cannot by itself expand V1 scope.

## Stage D — focused primary follow-up

Where architecture remains high-risk after repository and official-practice review, request targeted contractor evidence/interviews rather than broad research.

Priority questions:

1. Which procurement reports are actually used for weekly decisions?
2. Which numbers are manually adjusted outside the source system?
3. What does “actual,” “committed,” “awarded,” “saved,” “overdue” and “response rate” mean in current practice?
4. Which report versions are issued or relied upon contractually?
5. How are errors corrected and communicated?
6. What happens when ERP/payment/CDE data is stale or unavailable?
7. Which supplier evaluations affect future sourcing decisions?
8. Which portfolio totals are known to double count or mix currencies/time cuts?

---

# 13. External-source selection rules

For targeted official product research:

- use current official documentation or official help/training sources;
- preserve document/page/version/update date where available;
- distinguish generally available functionality from preview/beta;
- capture stated limitations and warnings, not only capability claims;
- do not infer internal architecture from marketing text;
- do not use screenshots as sole evidence of formula or authority;
- prefer documentation describing exact semantics, refresh, scope, formula, audit or export behavior;
- use multiple vendors only where comparison materially tests a semantic decision;
- stop when the architecture question is resolved or evidence becomes repetitive.

No broad competitor feature inventory is authorized.

---

# 14. Evidence capture schema

Each new P1.8 evidence record should capture:

- Evidence ID;
- evidence authority class E1–E7;
- source title;
- publisher/organization;
- exact URL/file/reference;
- source/version/update/capture date;
- exact section/page/locator;
- verbatim observation or tightly bounded paraphrase;
- reporting topic/question;
- product/contractor context;
- corroborates/contradicts/illustrates/does-not-answer;
- architectural implication;
- limitation/caveat;
- affected candidate ADR/contract/gate;
- reviewer/date.

Candidate IDs:

- `EVD-P18-001...` for P1.8-specific evidence;
- preserve existing EVD IDs when reusing earlier evidence;
- never renumber or replace prior evidence identities.

---

# 15. Metric-evidence traceability requirement

Every load-bearing candidate metric must have an evidence/control row before acceptance.

Minimum traceability fields:

| Field | Requirement |
|---|---|
| MetricKey | Stable candidate identity |
| Decision use | Exact decision, control or explanation supported |
| Evidence basis | Relevant E1–E7 evidence IDs |
| Source authority | Owning domain/external authority |
| Grain | Lowest source/contribution grain |
| Population | Eligible population and scope |
| Formula | Exact formula or classification rule |
| Time basis | As-of/period/window/calendar semantics |
| Actual/truth family | Physical/commercial/accounting/cash/planned/etc. |
| Quality dependency | Completeness/freshness/reconciliation/evidence conditions |
| Limitation | Unsupported/unknown/migration or comparability conditions |
| Anti-double-count proof | Canonical contribution identity/path |
| Correction/restatement | Expected behavior after source or definition change |
| ADR/contract owner | P1.8 contract/catalogue decision |
| Status | PROPOSED / EVIDENCE_GAP / REJECTED / ACCEPT_CANDIDATE |

No metric advances because it is visually useful or commonly requested.

---

# 16. Reporting assumption reconciliation protocol

Every pre-existing or newly introduced reporting assumption must be classified before the integrated candidate.

Allowed classifications:

- `FROZEN_INHERITED`;
- `PRIMARY_CORROBORATED`;
- `PRIMARY_CONTRADICTED`;
- `PRIMARY_UNOBSERVED`;
- `OFFICIAL_PRACTICE_CORROBORATED`;
- `PROFESSIONAL_PRACTICE_ONLY`;
- `INTERNAL_HYPOTHESIS`;
- `REJECTED_SCOPE_CREEP`;
- `LATER_OWNED`;
- `UNRESOLVED_BLOCKING`.

Rules:

- PRIMARY_UNOBSERVED cannot silently retain primary evidentiary weight;
- official product corroboration does not convert a hypothesis into contractor reality;
- a frozen inherited rule remains binding unless controlled reopening occurs;
- unresolved blocking assumptions prevent P1.8 closure;
- later-owned UI/AI/physical matters remain explicit and non-blocking only if semantic meaning is already decided.

---

# 17. Unmodeled / unmatched reporting observation register

P1.8 must maintain a register asking:

> What did contractor evidence, official product practice or hostile review reveal that the current metric/projection hypothesis set does not represent?

Each entry must state:

- source/evidence ID;
- raw observation;
- why it does not fit current semantics;
- whether it indicates:
  - missing metric class;
  - missing time/quality state;
  - missing source authority distinction;
  - missing correction/restatement behavior;
  - missing control observation;
  - legitimate presentation/UX matter;
  - out-of-scope BI/accounting/network scope;
- proposed disposition;
- blocker/watch/later-owned status.

This register prevents the baseline from only validating its own starting model.

---

# 18. Change control

## 18.1 Frozen-source contradiction

If new primary or legal evidence genuinely contradicts a frozen P1.4–P1.7 rule:

1. record the exact contradiction;
2. identify affected ADR/contract clauses;
3. assess whether the contradiction is contextual, configuration-specific or universal;
4. do not silently modify P1.8 semantics;
5. open controlled upstream review only if the contradiction is load-bearing and cannot be handled within an existing seam.

## 18.2 Candidate metric change

A candidate metric may be:

- refined without identity change only before acceptance and where meaning is unchanged;
- versioned when meaning/population/formula/time/quality changes;
- split when one label hides different semantic families;
- rejected when evidence, activation value or authority is insufficient;
- deferred when source data or domain activation is unavailable.

## 18.3 Scope-expansion request

A request for arbitrary dashboards, formula builders, warehouse connectors, cross-tenant benchmark data or AI recommendations must be classified as:

- presentation/physical later design;
- named metric catalogue request;
- later activation;
- rejected second-XL scope;
- controlled roadmap change.

---

# 19. Control artefacts to maintain during P1.8

The following working registers are required, whether embedded in later documents or maintained as separate controlled files:

1. reporting terminology register;
2. inherited-obligation matrix;
3. reporting assumption/threat register;
4. evidence debt register;
5. evidence capture register;
6. metric-evidence traceability matrix;
7. unmodeled/unmatched reporting observation register;
8. candidate ADR register;
9. hostile-scenario register;
10. P1.8 gate checklist.

No register becomes a product feature requirement merely because it is used during architecture work.

---

# 20. Candidate ADR surface entering semantic design

The following candidate ADRs remain open and unaccepted:

- ADR-0033 — MetricDefinition authority and semantic-version model;
- ADR-0034 — projection, restatement and issued-report snapshot model;
- ADR-0035 — result-quality/completeness/freshness/limitation model;
- ADR-0036 — portfolio aggregation/comparability/anti-double-count model;
- ADR-0037 — tenant-private supplier-performance analytics boundary.

This control baseline does not accept them.

Each must be supported by:

- frozen inherited constraints;
- exact architecture reasoning;
- targeted evidence where required;
- hostile scenario resolution;
- internal PASS;
- Claude PASS before final acceptance.

---

# 21. Gate to begin MetricDefinition semantic contract

P1.8 may begin `P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md` when all of the following are true:

1. frozen inherited reporting obligations are explicit;
2. terminology control register is established;
3. threat/assumption register is established;
4. evidence hierarchy and acceptance rules are established;
5. evidence debt is explicit and classified;
6. targeted research topics are bounded;
7. no broad competitor inventory is planned;
8. metric-evidence traceability fields are defined;
9. unmodeled observation process is defined;
10. no upstream contradiction is currently identified;
11. P1.9+ remains locked;
12. product code remains locked.

**Result: PASS — this control baseline satisfies the entry gate for the MetricDefinition semantic and authority contract.**

This PASS authorizes only the next P1.8 semantic artifact. It does not accept any metric class, formula, KPI catalogue or ADR.

---

# 22. Immediate next action

Create:

`P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`

The next artifact must define metric meaning and authority before named KPI catalogues, dashboards or external product research are allowed to anchor the design.

P1.9+ remains locked.

Product code remains locked.
