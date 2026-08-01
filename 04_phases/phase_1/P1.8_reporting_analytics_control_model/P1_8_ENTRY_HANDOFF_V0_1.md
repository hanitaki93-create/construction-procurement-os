# P1.8 — Reporting, Analytics & Control Model — Entry Handoff v0.1

**Date:** 2026-08-01  
**Status:** ENTRY HANDOFF / P1.8 ACTIVE CANDIDATE  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Entry condition

P1.8 begins only because:

- P1.1–P1.7 are closed/frozen as applicable;
- Claude P1.7 Round 2 returned PASS with blockers none;
- G1–G16 passed;
- ADR-0006 and ADR-0029–ADR-0032 are accepted;
- no upstream ADR reopened;
- P07 remains the sole XL;
- A0–A3 remains clean;
- product code remains locked.

---

# 2. Objective

Define the deterministic reporting, analytics, metric, projection and control-observation model that allows users and later chat/AI surfaces to understand procurement/commercial truth without creating:

- a second business-truth writer;
- a shadow spreadsheet/reporting ledger;
- silent formula or projection changes;
- collapsed physical/commercial/accounting/cash actuals;
- hidden stale, partial, mixed-time or migrated data;
- misleading cross-project/portfolio aggregation;
- arbitrary tenant-authored formulas;
- a universal data warehouse/BI-platform XL gravity well.

P1.8 decides **metric and projection meaning**, not dashboard technology or visual design.

---

# 3. Frozen inheritance

P1.8 may not reinterpret:

## P1.4

- tenant/project/ContractingAuthorityContext boundaries;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative source/writer per effective period;
- external fact freshness/conflict;
- historical configuration/authority binding;
- tenant residency and cross-tenant isolation;
- no cross-tenant learned/business-data influence by default.

## P1.5

- P07 Commercial Core and sole-XL status;
- exact CommercialEffectVector meanings;
- ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile;
- claim ≠ assessment ≠ certification;
- certification ≠ accounting posting/payment;
- physical actual ≠ certified actual ≠ accounting-posted actual ≠ paid cash;
- exact-decimal/versioned monetary/FX/tax semantics;
- append-only/history-preserving correction;
- planned/forecast/confirmed/actual distinctions;
- no workflow/report state writing commercial truth.

## P1.6

- exact EvidenceVersion/SourceLocator/RelianceBinding provenance;
- external reconstruction-anchor/materialization rules;
- issued/document/communication fact separation;
- evidence correction does not silently reverse domain truth;
- retention/redaction/disposition restrictions.

## P1.7

- QUERY/PROPOSAL/COMMAND/ASYNC_OPERATION classes;
- explicit query consistency and multi-resource cut;
- DomainEvent ≠ IntegrationEvent ≠ ExternalObservation;
- external freshness/staleness and migration limitations;
- `EFFECT_INDETERMINATE` and partial-effect visibility;
- provider-neutral email/manual fallback;
- chat/agents use registered operations and classified result truth;
- capability lifecycle/disablement/replacement;
- A0–A3 no-connector path.

---

# 4. Governing thesis

> Reports and analytics are reproducible projections over authoritative facts, not independent truth stores.

Every load-bearing metric/report must identify:

- metric identity and semantic version;
- business purpose and decision use;
- source authority and owning facts/events;
- grain and population/scope;
- inclusion/exclusion rules;
- numerator/denominator/formula;
- time basis and as-of/cut semantics;
- currency/FX/calculation policy;
- completeness, freshness and partial-data status;
- correction/recalculation behavior;
- evidence/config/projection version lineage;
- access/sensitivity/residency constraints.

---

# 5. Primary workstreams

## P1.8a — MetricDefinition and semantic catalogue

Define:

- stable metric keys;
- closed metric classes;
- authoritative source basis;
- grain/population/window;
- formula and dimensional definitions;
- units/currency/FX;
- applicability/version/effective period;
- completeness/freshness requirements;
- correction/restatement semantics;
- owner and evidence/ADR basis.

No arbitrary tenant-authored formula language.

## P1.8b — Projection and report contract

Define:

- projection identity/version;
- source event/fact families;
- current versus historical/as-of views;
- effective-time versus recorded-time projections;
- recalculation/rebuild behavior;
- new event-type applicability;
- corrected/restated report lineage;
- pagination/partial result/completeness;
- export snapshot identity;
- report publication/evidence binding.

## P1.8c — Time, actual, status and forecast semantics

Preserve:

- REQUIRED;
- PLANNED;
- FORECAST;
- CONFIRMED;
- ACTUAL;

and separate actual families:

- physical actual;
- product commercial/certified actual;
- external accounting-posted actual;
- paid/cash actual.

Define as-of, period, cohort, point-in-time, duration and aging semantics without collapsing them.

## P1.8d — Cost, commitment and commercial analytics

Define deterministic metrics/projections for activated scope, potentially including:

- requirement/allocation/package status;
- sourcing pipeline and response coverage;
- comparison/award positions;
- Commitment obligation/change/certification/retention/advance/allowance/recovery positions;
- variance to approved attribution/budget/reference where authoritative data exists;
- supplier/commitment exposure;
- open commercial obligations;
- external accounting/payment reconciliation.

P1.8 does not create missing budget/accounting authority.

## P1.8e — Schedule, expediting and control observations

Define:

- planned/forecast/confirmed/actual milestone measures;
- long-lead/expediting projections;
- overdue/aging/control-exception semantics;
- pending approvals/evidence/reconciliation/indeterminate-effect visibility;
- control alerts versus business state;
- escalation metrics without a second workflow engine.

## P1.8f — Supplier/performance analytics boundary

Define what supplier performance can be measured from tenant-owned evidence without:

- inventing shared supplier-network truth;
- cross-tenant aggregation;
- hidden reputation scores;
- collapsing sourcing competitiveness, technical compliance, delivery, commercial and quality outcomes;
- treating proposals/inferences as facts.

## P1.8g — Portfolio and cross-project aggregation

Define:

- tenant/legal/entity/project hierarchy and scope;
- comparable versus non-comparable populations;
- currency/FX/time/calendar normalization;
- double-count prevention;
- Commitment/allocation/component identity lineage;
- access and ContractingAuthorityContext;
- mixed-source completeness/freshness.

## P1.8h — Report/query/chat handoff

Freeze:

- which metrics can support authoritative answers;
- when answers are projection, external observation, inference or unknown;
- structured citations to metric definition/source/evidence;
- how stale/partial/mixed-time limitations are surfaced;
- no natural-language summary becoming new authority.

P1.9 owns interaction design.

P1.10 owns AI reasoning/evaluation.

---

# 6. Hard distinctions

P1.8 must preserve:

- authoritative fact ≠ metric/projection;
- metric definition ≠ displayed widget;
- current value ≠ historical/as-of value;
- effective-time ≠ recorded-time;
- period flow ≠ point-in-time balance;
- numerator population ≠ denominator population;
- planned ≠ forecast ≠ confirmed ≠ actual;
- physical actual ≠ certified actual ≠ accounting-posted actual ≠ paid cash;
- product commercial value ≠ external accounting value;
- report snapshot ≠ live mutable query;
- stale/partial/mixed-time result ≠ complete current truth;
- alert/control exception ≠ business state/effect;
- supplier performance fact ≠ model inference/reputation;
- export/report issue ≠ source-domain event;
- projection rebuild ≠ history rewrite;
- correction/restatement ≠ silent dashboard change.

---

# 7. Candidate metric classes

P1.8 should evaluate a bounded catalogue such as:

- COUNT / DISTINCT_COUNT;
- AMOUNT_BALANCE;
- AMOUNT_FLOW;
- QUANTITY_BALANCE / FLOW;
- RATIO / RATE;
- DURATION / AGING;
- MILESTONE_STATUS_DISTRIBUTION;
- VARIANCE;
- COVERAGE / COMPLETENESS;
- EXCEPTION / CONTROL_COUNT;
- RECONCILIATION_POSITION;
- FORECAST / SCENARIO projection;
- QUALITATIVE_CLASSIFICATION backed by explicit rules/evidence.

A class is not automatically accepted merely because listed here.

No arbitrary executable metric language.

---

# 8. Projection-version requirement

A metric or report must not change silently because:

- a new event type is added;
- an inclusion rule changes;
- a formula changes;
- an FX/calendar/timezone policy changes;
- a correction interpretation changes;
- an external source mapping changes;
- an identity resolution changes;
- migration limitations are remediated;
- data freshness/completeness improves.

The architecture must preserve:

- definition/version identity;
- applicability/effective period;
- recalculation scope;
- old versus restated result lineage;
- reason/ADR/change reference;
- report/export snapshot identity.

---

# 9. Data-quality and limitation semantics

Every relevant result can state:

- COMPLETE;
- PARTIAL_KNOWN;
- PARTIAL_UNKNOWN;
- STALE;
- MIXED_TIME;
- MIGRATION_LIMITED;
- EVIDENCE_LIMITED;
- EXTERNAL_SOURCE_UNAVAILABLE;
- RECONCILIATION_OPEN;
- EFFECT_INDETERMINATE_INCLUDED/EXCLUDED;
- NOT_APPLICABLE;
- UNSUPPORTED.

These are candidate bounded classes for P1.8 closure.

A dashboard cannot hide these behind a single green/red value.

---

# 10. A0–A3 reporting profile

The first live tender should support useful reporting without connectors or AI, including at minimum:

- requirements/packages by status and owner;
- RFQs issued/open/closed;
- supplier invitation/response coverage;
- response revision/compliance/normalization status;
- comparison readiness;
- recommendation/approval status;
- AwardDecision/handoff status;
- overdue/aging and missing-evidence/control exceptions;
- exact source/report as-of information.

No ERP/CDE/email connector, public API, chat or AI is required.

---

# 11. One-XL guard

P1.8 must not become:

- enterprise data warehouse/lakehouse;
- generic BI/report builder;
- arbitrary formula/calculation platform;
- CPM/master-scheduling analytics platform;
- accounting consolidation/FP&A system;
- supplier network/reputation database;
- generic controls/GRC platform;
- cross-tenant benchmark network;
- AI insight/recommendation subsystem.

It remains deterministic reporting/projection semantics over frozen product/external authority.

P07 remains the sole XL.

---

# 12. Required outputs

P1.8 should produce at least:

1. `P1_8_WORKPLAN_V0_1.md`;
2. metric semantic/authority contract;
3. projection/report versioning and restatement contract;
4. time/status/actual/forecast contract;
5. commercial/cost analytics catalogue;
6. sourcing/award reporting catalogue;
7. expediting/control-observation catalogue;
8. data quality/completeness/freshness contract;
9. supplier-performance analytics boundary;
10. portfolio/cross-project aggregation contract;
11. report export/snapshot/evidence contract;
12. chat/query reporting seam;
13. A0–A3 minimal report pack;
14. integrated candidate;
15. internal hostile audit/remediation/recheck;
16. self-contained Claude hostile-audit packet;
17. final ADR/checkpoint only after dual PASS.

---

# 13. P1.8 gates

P1.8 may close only if:

G1 — every load-bearing metric has one versioned definition, source authority, grain, scope, formula, time and quality meaning.

G2 — reports/projections cannot write or silently alter domain/commercial truth.

G3 — physical, commercial/certified, accounting-posted and cash actuals remain distinct.

G4 — effective-time, recorded-time, period-flow, point-balance and aging semantics are explicit.

G5 — projection evolution/restatement is versioned, traceable and non-silent.

G6 — partial, stale, mixed-time, migration/evidence-limited, reconciliation-open and indeterminate-effect data is visible and cannot masquerade as complete truth.

G7 — external-source metrics preserve authority/freshness/conflict and P1.6 evidence/version rules.

G8 — portfolio aggregation prevents double count and preserves tenant/legal/project/context/currency/time comparability.

G9 — supplier-performance analytics remains tenant-private/evidence-based and does not create a shared reputation network.

G10 — control alerts/exceptions never become domain state or a second workflow engine.

G11 — chat/AI reporting outputs remain classified, cited and non-authoritative where derived.

G12 — A0–A3 useful reporting works with no connector or AI.

G13 — no BI/warehouse/formula/GRC/supplier-network second XL; P07 sole XL.

G14 — P1.1–P1.7 regression = NO.

G15 — product code remains locked.

G16 — internal hostile PASS + Claude hostile PASS before closure.

---

# 14. Required hostile scenarios

At minimum test:

1. metric formula changes after reports were issued;
2. new event type changes historical balance projection;
3. physical progress is shown as certified value;
4. certified value is shown as paid cash;
5. ERP payment feed is stale/unavailable;
6. one project reports in AED and another in USD under different FX purposes;
7. non-atomic mixed-time portfolio query;
8. partial supplier responses/pagination shown as complete coverage;
9. migrated legacy `actual` with unknown meaning;
10. corrected identity mapping changes supplier aggregation;
11. Commitment component appears in two package/project rollups;
12. indeterminate external effect is included in exposure total;
13. report exported before later correction/restatement;
14. user edits dashboard value/status manually;
15. alert is treated as overdue business state;
16. supplier score uses data from another tenant;
17. AI summary claims causation from correlation;
18. chat answers “all” from a partial page;
19. no connector first tender still has useful reporting;
20. team attempts to build generic BI/data warehouse or cross-tenant benchmark scope.

---

# 15. First action

Create:

`P1_8_WORKPLAN_V0_1.md`

before choosing dashboard tools, warehouse technology or visualization design.

P1.9+ remains locked.

Product code remains locked.
