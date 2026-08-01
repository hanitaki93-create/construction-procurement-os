# P1.10 — AI Evaluation, Isolation, Memory, Retrieval & Provider Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**AI/product code:** LOCKED

---

# 1. Governing rule

> **AI activation is capability-specific, evidence-gated, tenant-isolated and reversible. A model is replaceable infrastructure; accepted product facts and operations remain deterministic.**

---

# 2. Evaluation hierarchy

Every AI capability passes in order:

1. deterministic schema/guard tests;
2. curated offline evaluation;
3. adversarial/security/privacy evaluation;
4. shadow/read-only evaluation on representative tenant-authorized data;
5. limited pilot with mandatory human review;
6. monitored activation;
7. periodic regression/recalibration;
8. incident rollback/retirement.

Skipping a stage requires a stricter capability-specific decision with evidence; high-risk command preparation cannot skip shadow and pilot.

---

# 3. Evaluation-set identity

Every set binds:

- `EvaluationSetId` and version;
- capability/output class;
- source/provenance and authorization;
- tenant/context partition;
- train/development/validation/holdout/adversarial split;
- labeling/ground-truth/reviewer process;
- difficult/negative/abstention cases;
- time/domain/geography/category coverage;
- access/residency/retention;
- contamination/leakage checks;
- permitted provider/model use;
- known limitations.

No tenant data enters a shared evaluation/training set by default.

---

# 4. Leakage and overfitting controls

- holdout examples are not used in prompts, tuning, demonstrations or threshold selection;
- provider/model training data access is treated as unknown unless contractually/evidentially established;
- evaluation prompts/answers are access controlled;
- repeated model selection against one holdout requires a new sealed holdout or correction for adaptive reuse;
- synthetic examples are labelled and cannot replace representative real evidence entirely;
- exact production incidents/adversarial cases enter regression only under authorized redaction/isolation;
- performance on seen templates/documents/suppliers is reported separately from unseen variants.

---

# 5. Capability-specific metrics

No generic overall AI score.

## Extraction proposal

Measure by registered field/role:

- exact-match or accepted normalized correctness;
- precision, recall and coverage;
- amount/quantity/unit/currency critical error rate;
- citation/source-location correctness;
- abstention and review burden;
- document/category/language/template breakdown.

Activation minimum for load-bearing structured extraction proposal:

- critical identifier/money/quantity precision ≥99.0%;
- critical-field recall ≥95.0%;
- source-location citation correctness ≥99.5%;
- zero silent unit/currency substitution in release adversarial set;
- all critical values remain human review required until separately evidenced.

## Normalization/mapping/linkage proposal

- top-1 precision ≥97.0% for auto-suggested review-ready candidate;
- unsupported/ambiguous cases abstain rather than force;
- false merge of unrelated supplier/item/field identity = zero tolerated in release critical set;
- mapping source/difference/provenance completeness ≥99.5%.

## Classification proposal

- class-specific precision/recall and confusion matrix;
- critical blocking/compliance class precision ≥99.0% and recall ≥97.0% where activated;
- lower-risk routing class macro-F1 ≥0.92 with no protected/category collapse;
- out-of-scope detection/abstention measured separately.

## Query answer with citations

- citation-supported factual claim rate ≥99.0%;
- citation entailment/correct-source-version ≥98.0%;
- unsupported load-bearing claim rate = 0 in release critical set and ≤0.5% overall pilot sample;
- correct abstention for inaccessible/unknown/ambiguous questions ≥95.0%;
- exact access-boundary violations = zero tolerated.

## Draft content

- no autonomous factual acceptance;
- required-source/citation coverage according to draft type;
- human edit distance/acceptance and error taxonomy monitored;
- prohibited sensitive disclosure/recipient error = zero tolerated in release critical set.

## Recommendation/control hypothesis

- report precision/recall by use, with false-positive/false-negative cost declared;
- no causal claim without accepted evidence method;
- no automatic award/exclusion/control resolution;
- decision-use eligibility follows P1.8/P1.9.

## Command preparation/orchestration

- exact registered OperationKey/target/member/value/recipient match to human-approved intent = 100% in release set;
- unauthorized/unexposed operation request = 0;
- confirmation bypass = 0;
- prompt-injection success causing protected action = 0;
- indeterminate-effect resend/replacement = 0;
- cross-tenant access = 0.

A single critical safety violation blocks activation regardless of aggregate score.

---

# 6. Calibration and thresholds

Each probabilistic score binds:

- what event it predicts;
- evaluation population;
- calibration method/version;
- reliability curve/error;
- threshold selection basis and cost tradeoff;
- out-of-distribution behavior;
- review/abstention consequence;
- expiry/recalibration trigger.

Target for capabilities presenting probability:

- expected calibration error ≤0.05 on representative holdout where statistically meaningful;
- thresholds reviewed after material model/data/capability change and at least quarterly during pilot/first year;
- low sample size displays insufficient evidence, not precise calibration.

---

# 7. Activation dispositions

- `DISABLED`;
- `OFFLINE_EVALUATION_ONLY`;
- `SHADOW_ONLY`;
- `PILOT_REVIEW_REQUIRED`;
- `ACTIVE_REVIEW_REQUIRED`;
- `ACTIVE_COMMAND_PREPARATION_HUMAN_CONFIRMED`;
- `DEGRADED_OR_LIMITED`;
- `SUSPENDED_INCIDENT_OR_REGRESSION`;
- `RETIRED`.

No AI capability becomes autonomous from good average performance.

---

# 8. Ongoing monitoring

Monitor by capability/version/model/provider/tenant category where privacy permits:

- volume, latency, failure/cost;
- abstention/coverage;
- human acceptance/rejection/correction;
- error classes and critical incidents;
- citation/source failures;
- drift/out-of-distribution;
- prompt-injection/safety filter events;
- access/isolation denials;
- provider/conformance changes;
- business outcome only as non-causal observation unless study design supports inference.

Alert thresholds:

- any critical safety/isolation violation → immediate suspend affected capability;
- critical error rate >0 in release/pilot safety sample → block progression;
- 20% relative degradation in primary quality metric versus accepted baseline over sufficient sample → review/degrade;
- abstention/coverage shift >25% relative or statistically material distribution shift → investigate;
- human rejection/correction rate >30% over ≥100 reviewed outputs → capability review, not hidden threshold lowering.

---

# 9. Human correction data

Corrections bind exact proposal/output/source/model/capability/reviewer and typed reason.

Uses:

- individual business correction through registered product operation;
- capability evaluation/regression under authorized scope;
- tenant-specific improvement where explicitly activated and isolated;
- shared learning only under a future separately governed participation mode.

Default V1:

- no cross-tenant training/fine-tuning/retrieval influence;
- no automatic model training from clicks/acceptance/corrections;
- no treating acceptance as ground truth without review of context;
- withdrawal/deletion applies prospectively and to retained datasets under policy, without impossible retroactive-unlearning promises.

---

# 10. Tenant/context isolation

Every AI path is scoped by:

- tenant;
- project/ContractingAuthorityContext;
- principal/represented principal and access;
- capability/purpose;
- data category/sensitivity;
- residency/provider profile;
- source cut and retention.

Isolation covers:

- prompts/inputs;
- retrieved chunks/search results;
- embeddings/vector/index namespaces;
- caches;
- conversation/session memory;
- persistent memory/preferences;
- tool results;
- run/output logs;
- evaluation/correction data;
- provider files/fine-tunes/batches;
- monitoring/telemetry.

Cross-tenant business influence is OUT by default even when records appear de-identified.

---

# 11. Retrieval contract

Every retrieval execution binds:

- query and capability;
- tenant/project/principal scope;
- permitted source/index classes;
- index/version/freshness;
- source identities/versions/locations;
- ranking/filter/configuration version;
- number of candidates and truncation;
- access filtering before model exposure;
- result source cut;
- limitations/unsupported state.

Retrieval cannot:

- access denied data then rely on model not to disclose;
- merge tenant indexes;
- use current document where historical version is required;
- treat embedding similarity as identity or truth;
- silently omit source/version/citation;
- use external web/content for business authority without classification.

---

# 12. Memory classes

Exactly:

- `TURN_LOCAL_CONTEXT` — current run only;
- `SESSION_CONTEXT` — bounded session, non-authoritative;
- `USER_PREFERENCE_MEMORY` — presentation/work preference only;
- `TASK_WORKING_MEMORY` — explicit task draft/proposal state;
- `TENANT_KNOWLEDGE_INDEX` — source-linked authorized retrieval projection;
- `EVALUATION_OR_CORRECTION_RECORD` — governed quality evidence;
- `PROHIBITED_AUTHORITY_OR_TRUTH_MEMORY`.

Memory may not store authority, delegation, confirmation, accepted terms, current facts, report reliance, hidden business status or cross-tenant business learning.

Every persistent memory item binds source/purpose/tenant/principal visibility, version/time, expiry, correction/deletion and authority/non-authority label.

Default retention:

- session context ≤24 hours;
- user preference until user/admin deletion or 12-month inactivity review;
- task working memory according to draft/task policy;
- transient provider cache disabled or shortest supported period;
- no provider training.

---

# 13. Prompt injection and untrusted content

Controls:

- strict trusted-instruction/data separation;
- minimum tool exposure and least privilege;
- structured outputs and deterministic validation;
- source/citation binding;
- content sanitization/rendering isolation without assuming it solves semantic injection;
- no secret/tool-schema exposure beyond need;
- protected-action human confirmation;
- adversarial tests across email, PDF, spreadsheet, image metadata, retrieved documents, tool output and web content;
- model output treated untrusted until validation/review.

No claim that prompt injection can be completely eliminated. Consequential safety derives from constrained authority and confirmation, not perfect detection.

---

# 14. Provider profile

Every model/provider deployment binds:

- provider/service/model/version/region;
- input/output/data categories;
- data retention and training posture;
- subcontractors/processing locations;
- encryption/access/security evidence;
- availability/rate/size limits;
- content filtering/changes;
- model update/version pinning behavior;
- export/deletion/incident obligations;
- evaluation/conformance evidence;
- fallback/replacement/exit;
- current state.

V1 default requirements:

- no training on tenant business data;
- provider retention disabled or shortest contractually supported period compatible with operation evidence;
- covered region consistent with tenant policy;
- no provider-owned memory as product authority;
- model/version changes require re-evaluation before wider activation.

---

# 15. Provider/model replacement

Capability implementation uses provider-neutral product contracts.

Replacement requires:

- new profile/model identity;
- compatibility and output-schema validation;
- complete capability evaluation and adversarial gates;
- shadow/pilot for material change;
- retention/deletion/export reconciliation from old provider;
- in-flight run treatment;
- no rebinding old outputs to new model identity;
- rollback/disable path;
- deterministic manual fallback.

A provider disappearance may remove AI convenience but cannot block authoritative work or history.

---

# 16. Cost/resource control

Each capability binds:

- request/token/file/context limits;
- per-tenant and platform budgets;
- timeout/retry policy;
- caching policy with tenant/source/version isolation;
- cost anomaly alerts;
- degradation/disable behavior.

AI cost pressure cannot justify hidden context truncation, missing citations, cross-tenant cache or degraded review.

---

# 17. AI incident

Incidents include:

- unauthorized/cross-tenant disclosure;
- protected-action attempt/success;
- fabricated load-bearing source/fact;
- provider training/retention/residency violation;
- systemic critical extraction/mapping error;
- evaluation leakage or manipulated monitoring;
- prompt-injection/tool misuse;
- hidden model/version change;
- memory lifecycle failure.

Response:

- suspend affected capability/provider/model;
- preserve safe evidence/run identities;
- block new affected proposals/actions;
- assess relied-on outputs and create correction/review campaign where material;
- do not automatically reverse domain effects;
- notify under security/contract policy;
- require regression/adversarial evidence before reactivation.

---

# 18. Scope guard

No:

- shared cross-tenant model training or benchmarking by default;
- vector-database/platform product;
- generic memory layer;
- universal evaluation platform;
- agent/model marketplace;
- provider lock-in;
- generic AI confidence score;
- self-improving autonomous loop;
- product code.
