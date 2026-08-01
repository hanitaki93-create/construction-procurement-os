# P1.10 — AI Run, Proposal, Output & Review Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**AI/product code:** LOCKED

---

# 1. Governing rule

> **An AI output is a versioned, source-scoped, non-authoritative execution result. It becomes useful only through an explicit product-defined output class and review/acceptance route.**

AI cannot create business truth, authority, semantic fields, metrics, operations, policies or evidence authenticity.

---

# 2. Distinct identities

Never collapse:

- `AICapabilityDefinitionKey`;
- `AICapabilityVersion`;
- `AIRunId`;
- `AIRequestId`;
- `ModelProviderProfileVersion`;
- `ModelIdentityVersion`;
- `PromptInstructionVersion`;
- `ToolAndOperationExposureVersion`;
- `RetrievalConfigurationVersion`;
- `InputContextManifestId`;
- `SourceCutManifestId`;
- `AIOutputId`;
- `AIProposalId`;
- `HumanReviewId`;
- `AcceptedProductOperationId`;
- `AIEvaluationExecutionId`;
- `AIIncidentId`.

A conversation/thread/session is not authority or durable business identity.

---

# 3. AI capability definition

Each capability version binds:

- exact purpose and intended user/task;
- output class;
- explicit non-intended uses;
- permitted tenant/project/authority context;
- allowed input/evidence/source classes;
- required source cut/freshness;
- permitted tools/registered operations;
- maximum agent authority level;
- required human review;
- task-specific score/uncertainty semantics;
- abstention and unsupported conditions;
- privacy/residency/provider constraints;
- evaluation suite/activation thresholds;
- monitoring/incident/rollback;
- AI-off/manual deterministic fallback.

A model endpoint alone is not a capability.

---

# 4. Closed output classes

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

No generic authoritative `AI_RESULT`, `AI_APPROVED`, `AI_ACTUAL`, `AI_AWARD`, `AI_COMMITMENT` or `AI_COMPLIANT` state.

---

# 5. Input context manifest

Every run binds exact:

- tenant/project/ContractingAuthorityContext;
- acting/represented principal and permitted access scope;
- capability/version;
- user request and trusted system instruction version;
- source records/evidence/versions/locations;
- metric/report/result identities;
- effective/recorded/as-of/source-cut time;
- retrieval results and ranking/version;
- prior conversation/memory items admitted;
- untrusted external-content boundaries;
- redactions/restrictions;
- tool/operation schemas exposed;
- model/provider/input/output policy;
- token/size truncation and omitted items.

“All available context” is invalid. Context is an explicit finite manifest.

---

# 6. Instruction and data separation

Trusted instruction sources are limited to:

- versioned product system policy;
- registered capability/task definition;
- current authorized user request within that capability;
- exact registered operation/tool schema.

Evidence, documents, email, attachments, web/provider/tool output, retrieved text and prior model output are untrusted data unless separately accepted as authoritative product facts under frozen contracts.

Untrusted content cannot:

- redefine the task or authority;
- request secrets/other tenant data;
- expose new tools;
- suppress review/disclosure;
- instruct command execution;
- change output class;
- become trusted because the model says so.

---

# 7. AI run record

Every run preserves:

- all identities in Section 2;
- start/end/status/latency/cost-resource measures;
- exact model/provider/version/region;
- prompt/instruction/tool/retrieval versions;
- input context/source cut manifest;
- generated output and structured parse state;
- citations/source bindings;
- task-specific score/uncertainty;
- abstention/limitation/safety outcomes;
- review/acceptance/correction lineage;
- provider request/response identifiers where permitted;
- data-use/retention posture;
- failure/timeout/retry history;
- no hidden chain-of-thought requirement.

Internal hidden reasoning is not required evidence; product-relevant claims/actions require inspectable sources, rules and output structure.

---

# 8. Citation and claim contract

Every load-bearing factual claim in AI output is one:

- `CITED_AUTHORITATIVE_PRODUCT_FACT`;
- `CITED_EXTERNAL_OBSERVATION`;
- `CITED_METRIC_OR_PROJECTION_RESULT`;
- `CITED_EVIDENCE_CONTENT`;
- `RULE_DERIVATION`;
- `MODEL_INFERENCE_OR_SUMMARY`;
- `UNKNOWN_OR_UNSUPPORTED`.

Citations bind exact source identity/version/location and source cut. A link without version/location is insufficient for load-bearing reliance.

Model inference cannot be presented as source fact or causation. Missing citation for a required claim blocks load-bearing use.

---

# 9. Proposal object

`AIProposal` binds:

- proposal/output identity and capability version;
- target registered product object/field/operation;
- exact proposed values/content/mapping;
- source/citation/evidence bindings;
- differences from current/draft state;
- uncertainty/limitations/abstained parts;
- affected population/member set;
- validation/guard results;
- required reviewer/authority;
- expiration/invalidation conditions;
- explicit non-effect;
- review/accept/reject/correct operation keys.

Proposal cannot self-accept. Acceptance creates a separate registered product command or accepted proposal fact under owning domain rules.

---

# 10. Confidence, uncertainty and abstention

No universal confidence percentage.

Each capability defines one or more task-specific measures such as:

- calibrated probability of exact field correctness;
- candidate-ranking margin;
- citation support/coverage;
- extraction completeness;
- distribution shift/out-of-scope score;
- rule/validation conformance;
- conflicting-evidence indicator;
- human disagreement/error history.

The user sees understandable outcome classes and limitations, not false precision.

Closed high-level dispositions:

- `SUPPORTED_HIGH_REVIEW_READY`;
- `SUPPORTED_LIMITED_REVIEW_REQUIRED`;
- `AMBIGUOUS_MULTIPLE_CANDIDATES`;
- `OUT_OF_SCOPE`;
- `INSUFFICIENT_EVIDENCE`;
- `CONFLICTING_EVIDENCE`;
- `SAFETY_OR_ACCESS_BLOCKED`;
- `MODEL_OR_PROVIDER_UNAVAILABLE`;
- `ABSTAINED`.

Abstention is a valid result and must preserve manual fallback.

---

# 11. Human review

Review binds:

- reviewer/current authority and represented principal;
- exact proposal/output/source cut/citations;
- full/field/item review scope;
- accepted, rejected, corrected, partially accepted or deferred disposition;
- correction and reason taxonomy;
- resulting registered command/proposal fact if any;
- time/version/confirmation;
- no blanket approval of unseen items.

Review UI follows P1.9 disclosure/confirmation/accessibility. “Looks good” cannot accept a hidden population.

---

# 12. Invalidation

AI proposal/output invalidates or requires re-evaluation upon material change to:

- target object/member/population;
- source/evidence version or source cut;
- authority/access/context;
- semantic field/metric/operation/policy version;
- model/provider/capability/prompt/tool/retrieval version where required;
- conflicting authoritative fact;
- expiration/freshness threshold;
- evaluation/conformance/incident state.

Previously accepted domain effects remain history; later AI invalidation cannot undo them automatically.

---

# 13. Deterministic validation

Before review/acceptance, structured AI output passes:

- schema/type parsing;
- registered semantic key validation;
- authority/access check;
- source/citation existence and version check;
- unit/currency/date/time validation;
- target/version/concurrency check;
- operation guard/prevalidation;
- duplicate/idempotency check;
- prohibited-content/action check;
- population/completeness disclosure.

Passing validation does not prove factual correctness; failure blocks proposal use.

---

# 14. AI-off and failure behavior

AI timeout/error/provider unavailability returns typed failure/abstention with:

- no accepted business effect;
- preserved user inputs/source context where policy permits;
- retry only under safe non-effect generation semantics;
- manual/conventional task route;
- no fabricated fallback output;
- no use of stale old output without explicit current validation/reliance.

A0–A3 remains complete without AI.

---

# 15. Retention and privacy

AI run/proposal records are retained according to capability and business reliance:

- accepted/rejected/corrected proposal supporting a business/evidence decision follows that decision/evidence retention;
- non-relied transient outputs default ≤30 days;
- evaluation/incident samples follow governed purpose and de-identification/isolation policy;
- prompts/outputs are not logged to general telemetry;
- provider retention/training is prohibited unless an explicit governed participation mode exists; V1 default is no provider training on tenant business data;
- legal hold/redaction/export/residency cover AI copies.

---

# 16. Scope guard

No:

- model-vendor-specific architecture;
- generic prompt/workflow builder;
- arbitrary tool/plugin marketplace;
- shared cross-tenant prompt/memory corpus;
- AI-owned field/metric/operation creation;
- self-accepting proposal;
- autonomous commercial truth;
- hidden chain-of-thought storage requirement;
- AI dependency for A0–A3;
- product code.
