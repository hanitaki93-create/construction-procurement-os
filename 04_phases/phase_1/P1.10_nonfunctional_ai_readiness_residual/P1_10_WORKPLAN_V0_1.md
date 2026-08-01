# P1.10 — Nonfunctional & AI-Readiness Residual — Workplan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CONTROL WORKPLAN  
**P1.10:** ACTIVE / UNLOCKED  
**P1.11:** LOCKED  
**Product code:** LOCKED

---

# 1. Mission

Close all residual measurable operating contracts and additive AI-readiness semantics without selecting physical technology or creating a security, observability, data, model or agent platform gravity well.

---

# 2. Ordered work packages

## WP-0 — control baseline and evidence plan

- freeze inherited semantics;
- define evidence authority and current standards sources;
- establish workload/NFR terminology;
- record unknowns and validation debt.

## WP-1 — workload, scale and performance

- workload classes and reference profiles;
- finite scale assumptions;
- latency/throughput/concurrency targets;
- acknowledgement versus completion;
- capacity-test and saturation behavior.

## WP-2 — availability, continuity, backup and DR

- service availability classes;
- SLI/SLO/error-budget semantics;
- RTO/RPO by data/effect class;
- backup/restore verification;
- regional/dependency failure and manual fallback.

## WP-3 — reliability, queues, concurrency and degradation

- idempotency/continuation durability;
- queue age and backlog;
- retry budgets/circuit breaking;
- dead-letter/reconciliation;
- partial/indeterminate visibility;
- graceful degradation matrix.

## WP-4 — observability and operational evidence

- logs/metrics/traces/audit/domain-event distinctions;
- correlation and propagation;
- privacy-safe telemetry;
- incident and customer-status evidence;
- alert ownership and operational reconstruction.

## WP-5 — security, privacy, residency and lifecycle residual

- security governance and secure development outcomes;
- authentication/session/authorization residual;
- encryption/secrets/key lifecycle;
- tenant isolation;
- deletion/redaction/legal hold/export;
- subprocessor/model-provider/residency paths;
- vulnerability and incident handling.

## WP-6 — files, imports, exports, quotas and rate limits

- file/attachment classes;
- size/count/archive/decompression/parser boundaries;
- malware and untrusted-content handling;
- bulk/import limits;
- export completeness/integrity;
- API/channel quotas, backpressure and fair use.

## WP-7 — capability, deployment and conformance

- deployment profiles;
- capability lifecycle and compatibility;
- rollout/rollback/kill switch;
- connector/provider conformance;
- migration compatibility;
- minimum deterministic substrate.

## WP-8 — AI run, proposal and output grammar

- identities and provenance;
- model/provider/config/prompt/input/source-cut binding;
- output classes;
- uncertainty/confidence/abstention;
- human review and correction;
- no authoritative AI fact.

## WP-9 — agent authority and autonomy ladder

- closed authority levels;
- capability/action eligibility;
- human-confirmed command requests;
- bounded system automation distinction;
- revocation, pause and emergency disable;
- partial/indeterminate restrictions.

## WP-10 — AI evaluation, correction and monitoring

- capability-specific metrics;
- offline/shadow/online evaluation;
- test-set governance and leakage controls;
- calibration/abstention;
- regression/drift/conformance;
- human correction and incident handling.

## WP-11 — AI isolation, memory, retrieval and provider replacement

- tenant/project/authority scoping;
- retrieval and embedding isolation;
- memory types/lifecycle;
- prompt injection/untrusted data;
- provider data-use/residency;
- portability and AI-off fallback.

## WP-12 — validation/falsification/build gates

- unfired contractor/supplier hypotheses;
- measurable pilot gates;
- kill/revise criteria;
- architecture versus market-validation statement;
- evidence-debt ownership.

## WP-13 — measurable NFR catalogue

- one closed catalogue of target IDs, scope, metric, threshold, window, exclusions, evidence and degradation.

## WP-14 — integrated candidate

- reconcile all contracts and candidate ADRs;
- prove no deterministic redesign and no second XL.

## WP-15 — internal hostile audit

- execute complete scenario matrix;
- record FAIL where any unbounded qualifier, missing member or measurement ambiguity exists.

## WP-16 — remediation and recheck

- narrow fixes only;
- full matrix rerun.

## WP-17 — Claude hostile audit

- self-contained packet and exact prompt;
- no repository access required.

## WP-18 — final closure

Only after internal and Claude PASS:

- accept ADR-0017 and ADR-0042–ADR-0048;
- create frozen P1.10 contract, final verdict/checkpoint;
- unlock P1.11.

---

# 3. Required measurement grammar

Every load-bearing NFR binds:

- stable NFR key and semantic version;
- purpose/risk;
- service/capability/operation/data class;
- reference workload profile;
- exact SLI/measurement formula;
- threshold/target;
- percentile or distribution where applicable;
- rolling/fixed measurement window;
- included/excluded events;
- source of measurement;
- test method and evidence artifact;
- warning/error-budget/breach behavior;
- degradation/fallback;
- review cadence and change lineage;
- security/access/residency of measurement data.

A statement without these fields is a goal, not an accepted NFR.

---

# 4. Candidate service/data criticality classes

## Service classes

- `INTERACTIVE_READ`;
- `INTERACTIVE_PROPOSAL_PREVIEW`;
- `COMMAND_ACCEPTANCE`;
- `ASYNC_EFFECT_EXECUTION`;
- `EXTERNAL_TASK_ACCESS`;
- `REPORT_QUERY`;
- `REPORT_SNAPSHOT_ISSUE`;
- `FILE_UPLOAD_AND_SCAN`;
- `STRUCTURED_IMPORT`;
- `EXPORT_GENERATION`;
- `CONNECTOR_OBSERVATION`;
- `CONNECTOR_EFFECT`;
- `SEARCH_INDEX`;
- `AI_ASSISTIVE_READ`;
- `AI_PROPOSAL`;
- `AI_COMMAND_ORCHESTRATION`.

## Data/effect classes

- `AUTHORITATIVE_DOMAIN_AND_COMMERCIAL`;
- `EVIDENCE_AND_ISSUED_ARTIFACT`;
- `OPERATION_IDEMPOTENCY_AND_CONTINUATION`;
- `INTEGRATION_PUBLICATION_AND_EFFECT_POSITION`;
- `REPORT_SNAPSHOT_AND_RESTATEMENT`;
- `CONFIGURATION_AND_AUTHORITY_BINDING`;
- `DERIVED_PROJECTION_CACHE`;
- `SEARCH_INDEX_DERIVED`;
- `OPERATIONAL_TELEMETRY`;
- `AI_RUN_AND_EVALUATION_DERIVED`.

Targets may differ by class but must remain explicit.

---

# 5. AI output classes

Candidate closed classes:

- `EXTRACTION_PROPOSAL`;
- `NORMALIZATION_MAPPING_PROPOSAL`;
- `CLASSIFICATION_PROPOSAL`;
- `MATCHING_OR_LINKAGE_PROPOSAL`;
- `DRAFT_CONTENT_PROPOSAL`;
- `COMPARISON_OR_SUMMARY_PROJECTION`;
- `ANOMALY_OR_CONTROL_HYPOTHESIS`;
- `RECOMMENDATION_PROPOSAL`;
- `QUERY_ANSWER_WITH_CITATIONS`;
- `OPERATION_PLAN_PROPOSAL`;
- `COMMAND_REQUEST_FOR_HUMAN_CONFIRMATION`;
- `ABSTENTION_OR_UNSUPPORTED_RESULT`.

No generic authoritative `AI_RESULT` state.

---

# 6. Agent authority ladder candidate

- `L0_DISABLED`;
- `L1_READ_AND_EXPLAIN`;
- `L2_DRAFT_OR_PROPOSE`;
- `L3_RECOMMEND_BOUNDED_ACTION`;
- `L4_PREPARE_COMMAND_FOR_HUMAN_CONFIRMATION`;
- `L5_EXECUTE_EXACT_HUMAN_CONFIRMED_COMMAND`;
- `L6_SYSTEM_BOUNDED_DETERMINISTIC_AUTOMATION` — non-generative deterministic automation only unless a later separately accepted capability proves otherwise.

No free-running commercial/autonomous agent level in V1.

---

# 7. Internal hostile scenario groups

- measurement ambiguity and percentile/window gaming;
- saturation, burst and noisy-neighbor behavior;
- acknowledgement/completion collapse;
- data-loss/durability/restore false claims;
- failover and regional/subprocessor path leakage;
- queue/retry/idempotency/indeterminate conflicts;
- telemetry authority/privacy/cardinality explosion;
- deletion/hold/redaction/export conflicts;
- file parser/archive/malware/resource exhaustion;
- rate-limit behavior during tender deadlines;
- rollout/conformance/version drift;
- AI provenance/source-cut/model-version gaps;
- confidence/abstention misuse;
- excessive agency and hidden delegation;
- prompt injection and untrusted tool output;
- retrieval/memory/embedding isolation failure;
- provider training/retention/residency conflict;
- evaluation leakage/weak baselines/drift;
- AI-off/provider-replacement failure;
- architecture-validation versus contractor-validation misstatement;
- second-XL expansion.

---

# 8. Exit condition

P1.10 reaches Claude only when:

- every NFR is measurable;
- all AI semantics are bounded and removable;
- A0–A3 remains complete with AI off;
- no agent can bypass P1.4–P1.9;
- validation debt is explicit;
- internal hostile recheck passes;
- P1.11 and product code remain locked.
