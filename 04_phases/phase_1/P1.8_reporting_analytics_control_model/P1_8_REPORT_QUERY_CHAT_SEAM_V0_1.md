# P1.8 — Report Query and Chat Seam v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines how conventional reports, registered queries, later conversational interfaces and future agents may retrieve, explain and summarize P1.8 results without creating new metric meanings, bypassing access, hiding limitations or turning language into authority.

The governing rule is:

> **Every reporting answer is produced from registered queries and versioned metric/projection results under explicit authority, source cut and quality semantics. Natural language may explain those results but cannot redefine them, invent missing values or convert a derived conclusion into business truth.**

---

# 2. Permitted result classes

Every answer component is one:

- `AUTHORITATIVE_SOURCE_FACT`;
- `VERSIONED_METRIC_RESULT`;
- `VERSIONED_PROJECTION_RESULT`;
- `EXTERNAL_OBSERVED_FACT`;
- `REPORT_SNAPSHOT_FACT`;
- `CONTROL_OBSERVATION`;
- `PROPOSAL_OR_SCENARIO`;
- `INFERENCE_OR_SUMMARY`;
- `OPERATIONAL_STATUS`;
- `UNKNOWN_OR_UNSUPPORTED`.

Mixed answers label each component or use a structured answer manifest.

No answer may present an inference/summary as a source fact.

---

# 3. Query resolution

A request resolves to a registered P1.7 `QUERY` operation that binds:

- tenant/project/ContractingAuthorityContext;
- authenticated/acting principal;
- query/metric/report key and version;
- scope/dimensions/filters;
- time/as-of/known-at perspective;
- actual/status family;
- consistency cut;
- pagination/completeness rule;
- source/freshness/quality thresholds;
- access/disclosure policy;
- requested output/detail level.

Free text is parsed into a proposal for these parameters; parsing does not grant access or create new metric definitions.

---

# 4. Ambiguity handling

The system must not guess load-bearing meaning for ambiguous terms such as:

- actual cost;
- current value;
- savings;
- overdue;
- supplier performance;
- all responses;
- commitment;
- paid;
- progress;
- forecast;
- period.

It may:

- ask for clarification in P1.9 UX;
- choose a clearly declared non-load-bearing default only where a registered operation permits;
- present multiple separated interpretations;
- abstain.

It may not silently choose the most convenient actual family, denominator, baseline or time cut.

---

# 5. Answer manifest

Every load-bearing answer carries or can reveal:

- Query/Operation identity;
- metric/projection/report key and version;
- result/snapshot identity;
- scope/context;
- value/value state/unit/currency;
- time/as-of/known-at basis;
- source authority composition;
- actual/status family;
- quality/completeness/freshness/limitations;
- pagination/coverage;
- evidence/source references;
- execution time;
- restatement/supersession state;
- access/disclosure classification;
- answer component class.

A concise response may summarize, but material limitations cannot be omitted.

---

# 6. Citation contract

Load-bearing answers cite as applicable:

- MetricDefinitionVersion;
- ProjectionDefinitionVersion;
- MetricResult/ProjectionResult;
- ReportSnapshot/ArtifactVersion;
- source records/events;
- EvidenceVersion/SourceLocator/RelianceBinding;
- external source/profile/freshness;
- quality/reconciliation/indeterminate state;
- governing config/authority versions.

A citation to a dashboard page alone is insufficient where exact source/result lineage exists.

---

# 7. Completeness and partiality language

The answer must not say:

- all;
- none;
- total;
- complete;
- current;
- no outstanding items;
- fully responded;
- best/worst;

unless the registered result proves the relevant population, cut, freshness and comparability.

Where partial:

- state known loaded/eligible counts;
- state unknown gap where applicable;
- avoid extrapolation unless a separately declared statistical/proposal result supports it;
- expose excluded/restricted/indeterminate portions.

---

# 8. Time and actual-family language

Answers preserve exact terms:

- physical actual;
- product commercial/certified actual;
- external accounting-posted actual;
- paid/cash actual;
- planned;
- forecast;
- confirmed;
- scenario;
- as-of effective;
- as-of recorded/known-at;
- issued snapshot.

Chat cannot shorten a value to “actual” or “cost” where doing so changes meaning.

---

# 9. Explanation versus causation

The system may explain deterministic lineage and arithmetic:

- why a metric includes/excludes contributions;
- which definition/version applied;
- which source facts changed;
- which limitation blocks a conclusion;
- how a variance was calculated.

It may not claim causal responsibility from correlation, timing or aggregate association unless a separately governed evidence/analysis method supports that statement.

Examples of prohibited unsupported statements:

- supplier delay caused project delay;
- lower response rate proves poor supplier quality;
- payment lag proves commercial dispute;
- high exception count proves unreliable supplier.

---

# 10. Proposals, forecasts and scenarios

Derived or AI-generated:

- forecasts;
- scenarios;
- narrative interpretations;
- package/BOQ proposals;
- supplier-performance summaries;
- anomaly suggestions;

remain classified as proposal/forecast/scenario/inference.

They cannot become actual, confirmed, award, approval, Commitment or certification without separate bounded owning-domain action.

---

# 11. Action handoff

A report/chat answer may offer a separately registered bounded action, for example:

- open source record/evidence;
- request review;
- create a non-authoritative draft/proposal;
- start reconciliation;
- request a bounded domain command.

The action:

- is not executed by wording alone;
- uses P1.7 invocation/authority/idempotency;
- revalidates current authority/preconditions;
- preserves answer/result references as context/evidence;
- cannot convert a control observation into domain effect automatically.

---

# 12. Access and inference

Query/chat uses authorization-filtered operations and source/result policies.

It must prevent:

- cross-tenant retrieval or learned influence;
- hidden project/supplier value inference through subtraction;
- restricted-row existence disclosure;
- competitor-confidential details;
- unauthorized drill-through;
- using session memory as authority;
- using previous answer content to bypass current access.

A user losing access cannot retrieve a prior result merely because chat memory contains it.

---

# 13. Untrusted content

Supplier documents, emails, external observations, report comments, imported cells, filenames and metadata are untrusted data.

Instruction-like content cannot select:

- operation;
- tenant/context;
- principal;
- source cut;
- destination;
- metric definition;
- tool call;
- approval/action.

A request extracted from evidence remains a proposal/warning until independently authorized.

---

# 14. Historical report questions

Questions such as:

- what did the report show on date X?;
- what was effective at date X?;
- what was known at date X?;
- what is the restated value now?;

must resolve to distinct registered queries.

Current values may not replace historical issued snapshot values.

If reconstruction is limited, state the exact reconstruction level.

---

# 15. Unknown and abstention

The system must return unknown/unsupported/blocked where:

- metric meaning is ambiguous and no allowed default exists;
- source unavailable;
- population unknown;
- access restricted;
- quality threshold blocks use;
- evidence insufficient;
- actual family cannot be established;
- requested causal conclusion unsupported;
- requested cross-tenant benchmark prohibited;
- no registered metric/query exists.

Abstention is a valid and required result.

---

# 16. P1.9 and P1.10 boundary

P1.8 freezes result semantics, citations, limitations and permitted answer/action classes.

P1.9 owns:

- conversational interaction design;
- navigation/search presentation;
- clarification/confirmation UX;
- report/dashboard visual design.

P1.10 owns:

- model selection;
- reasoning/orchestration;
- memory;
- confidence;
- evaluation;
- autonomy thresholds;
- agent count/roles;
- fallback and replacement.

Neither later phase may reinterpret P1.8 truth/quality/source semantics.

---

# 17. Prohibitions

- no hidden ad hoc SQL/formula;
- no chat-only metric definition;
- no session memory as authority;
- no partial page as all;
- no missing as zero;
- no generic actual/cost/current;
- no unsupported causation;
- no AI confidence as completeness;
- no natural-language command bypass;
- no report/control observation direct state write;
- no current value substituted for issued history;
- no cross-tenant benchmark/reputation;
- no evidence prompt injection tool control.

---

# 18. Hostile scenarios

Test at minimum:

1. user asks “actual cost”;
2. user asks “all suppliers” from first page;
3. payment source unavailable;
4. report mixed time;
5. user asks current value from stale cache;
6. user asks historical issued value;
7. current value differs after restatement;
8. user asks why total changed;
9. AI claims causation;
10. forecast presented as actual;
11. scenario presented as forecast;
12. control alert presented as status;
13. supplier document contains tool instructions;
14. prior chat answer from another project;
15. access revoked after previous answer;
16. user requests hidden supplier details;
17. subtraction could reveal restricted value;
18. metric not registered;
19. actual family unknown in migrated data;
20. indeterminate effect included;
21. report snapshot evidence disposed;
22. reconstruction limited;
23. user asks cross-tenant benchmark;
24. AI summary omits limitation;
25. user says “mark it approved” after report answer;
26. agent retries unsafe external effect;
27. current definition retired;
28. query returns mixed semantic versions;
29. user asks “best supplier”;
30. no chat runtime activated; conventional query/report still works.

---

# 19. Exit condition

This seam may enter the integrated P1.8 candidate when every report/query/chat answer is registered, authority-filtered, versioned, cited, quality-qualified and unable to create new truth, hidden metrics or privileged action.
