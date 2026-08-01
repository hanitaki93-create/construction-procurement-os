# P1.10 — Integrated Nonfunctional & AI-Readiness Candidate v0.3

**Date:** 2026-08-01  
**Status:** POST-CLAUDE-ROUND-1 REMEDIATED CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Supersedes:** v0.2 and conflicting prior P1.10 candidate/remediation wording  
**P1.11 / product code:** LOCKED

---

# 1. Governing thesis

> **Nonfunctional requirements are testable product contracts, and AI is an optional, replaceable proposal-and-orchestration layer over the frozen deterministic system—not a new truth, authority or dependency.**

No target, telemetry record, AI result, capability policy, prompt, agent, provider, cache, embedding, model or evaluation system is business authority.

---

# 2. NFR identity, measurement and activation

Every NFR binds stable identity/version, purpose/risk, C0–C3 criticality, service/capability/data class, exact workload profile, SLI/formula, threshold/distribution, measurement population/window/inclusions/exclusions, measurement health, evidence/test, degradation, review and customer/contract mapping.

Conformance outcomes:

- TARGET_UNVERIFIED;
- VERIFIED_PASS;
- VERIFIED_PASS_LOWER_DECLARED_ENVELOPE;
- VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK;
- VERIFIED_FAIL_BLOCKED;
- ACTIVE_BREACH_REMEDIATION;
- NOT_APPLICABLE;
- RETIRED.

C0 requires verified pass with no waiver, error budget or lower envelope. C1 requires pass for its declared envelope. C2 operates only with verified safe fallback/limitation. C3 remains disabled until pass. Pilot never waives C0.

Measurement health is complete, partial-known, partial-unknown or unavailable. Missing telemetry cannot improve a result or shrink the denominator silently.

---

# 3. Workload, performance and capacity

The pilot and V1 standard verification profiles remain finite and numeric across tenants, sessions, projects, users, supplier relationships, active/historical lines, events, evidence volume, command rates, read rates and submission rates.

Interactive and async targets use exact P50/P95/P99 or distribution semantics. Acknowledgment, effect establishment and result availability remain distinct.

Burst, stress, deadline and noisy-neighbor tests must prove typed saturation/backpressure with no acknowledged loss, duplicate effect, hidden truncation, unsafe retry or cross-tenant leakage.

`VERIFIED_PASS_LOWER_DECLARED_ENVELOPE` is prospective and allowed only for capacity/performance where C0 semantics remain unchanged, architecture/release and commercial/contract authority approve, affected customer commitments are respected and the actual verified envelope is visible. Existing commitments cannot be relabelled after failure.

---

# 4. Availability, durability and recovery

Capability-specific availability and data-class RTO/RPO remain frozen.

Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0 and require one `DurabilityAcknowledgementProof`:

- transactional durable commit;
- durable object plus metadata commit;
- replicated append/journal commit;
- external-authoritative acknowledgment plus local immutable intent/effect position.

Product-custodied evidence requires payload plus identity/integrity before accepted-capture success.

Backup integrity is checked daily, sampled restore monthly, end-to-end restore quarterly and disaster exercise annually. A backup not restored in the prior quarter cannot support the recovery claim. Holds, tombstones, idempotency and unresolved-effect position survive restore.

---

# 5. Reliability, retry and degradation

Timeout, retry, attempts/window, backoff, circuit, queue age/priority, dead letter, reconciliation, idempotency retention and visibility are explicit by operation/dependency.

Only proven pre-effect idempotent transport may auto-retry. An effect-bearing unknown never ordinary-retries. Partial/indeterminate items are reconciled individually.

Degradation protects tenant/security, durability/effect safety, evidence/submission attempt, result lookup and deterministic work before optional reporting/search/import/export/connectors/AI.

---

# 6. Observability, security, privacy, residency and lifecycle

DomainEvent, IntegrationEvent, ExternalObservation, TransportEnvelope, audit/security record, log, trace, metric, incident and AI record remain distinct. Telemetry is not business truth.

General telemetry excludes sensitive bid, commercial, evidence, personal and prompt content. Restricted diagnostics are purpose, tenant, access, residency and retention bound.

Numeric MFA, revocation, session, encryption, secret/key, vulnerability, testing and incident targets remain frozen. Cross-tenant disclosure, unauthorized effect and acknowledged data loss are zero-tolerance C0 failures.

Lifecycle includes primary data, evidence, backups, logs, search, prompts, outputs, embeddings, retrieval, memory, evaluations and provider-held copies. Retention is tenant/category versioned; holds/redaction/tombstones survive restore. Seven years is a candidate default, not legal advice. No UAE/GCC localization or certification claim exists without evidence.

---

# 7. Files, imports, exports, quotas and deployment

Exact file, archive, page, pixel, row, volume, expansion and export limits remain frozen.

Pipeline:

`durable untrusted capture → type validation → quarantine → scan → parser validation → proposal → explicit acceptance`

Scan unavailable/timeout is not clean. Unknown file/import columns remain evidence or unmapped proposals. No macro/script/trusted execution. Exports carry exact cut, count, manifest, checksum, completeness and limitations; no silent truncation.

Quota/rate policies are numeric and preserve exact acceptance/effect/continuation/deadline attempt meaning. Resource pressure disables optional AI before deterministic capacity.

Deployment binds build, schema, configuration, operation, metric, field, AI capability, policy, provider and model versions. In-flight work retains original bindings. Automatic fallback is limited to a separately evaluated compatible conforming profile; otherwise abstain, disable or manual fallback.

---

# 8. Product-owned AI capability registry

## 8.1 Governing rule

> **Every AI capability, output class, prompt/instruction set, exposed tool, authority ceiling, context-coverage policy, evaluation policy and resource-policy semantic is product-authored and versioned. Tenant configuration can only disable or narrow the product-defined capability.**

No runtime capability exists outside the product-owned `AICapabilityRegistry`.

## 8.2 `AICapabilityDefinitionVersion`

Every capability binds:

- stable capability key/version;
- deterministic supported purpose and explicit non-use;
- closed output class;
- eligible roles/contexts;
- product-owned prompt/instruction versions;
- permitted source/input classes;
- product-owned `AIContextCoveragePolicyVersion`;
- product-owned retrieval/source-selection policy;
- exact registered operations/tools and read/write class;
- maximum L0–L6 authority level;
- confirmation/review behavior;
- product-owned `EvaluationSufficiencyPolicyVersion` and thresholds;
- product-owned `AIResourceBudgetPolicyVersion`, default and mandatory floor;
- provider/model compatibility profile;
- isolation/residency/retention/training posture;
- activation/degradation/fallback/retirement;
- manual/AI-off equivalent;
- evidence/ADR/incident lineage.

## 8.3 Tenant permitted configuration

Tenant may only:

- enable/disable;
- choose a registered authority level at or below the product ceiling;
- require more review or less autonomy;
- choose among product-defined options;
- add compliant tenant-authorized sources;
- add mandatory sources or raise coverage;
- strengthen abstention/escalation;
- set stricter budgets where mandatory context/safety still fit;
- use stricter retention/no-memory;
- select separately evaluated compatible providers where allowed;
- require manual transmission;
- supply non-authoritative scoped terminology/examples.

## 8.4 Tenant prohibited configuration

Tenant cannot:

- create/modify a capability, hidden prompt or instruction grammar;
- add tools/operations/plugins/HTTP/DB/file-system execution;
- raise authority or generative L6;
- author/loosen coverage policy or remove mandatory sources;
- author/loosen evaluation metrics, thresholds, strata, confidence or adversarial suites;
- author/loosen resource policy below mandatory-context/safety floor;
- relabel incomplete context complete;
- allow uncited load-bearing claims;
- create retrieval/vector/memory/cross-tenant semantics;
- choose unevaluated provider/model;
- weaken isolation/residency/retention/training posture;
- create multi-agent authority routing;
- permit self-acceptance or confirmation bypass;
- define capability/policy through scripts, expressions, natural-language configuration or tenant files.

Prohibited configuration is rejected.

## 8.5 Effective-profile monotonicity

Every runtime `AICapabilityEffectiveProfile` is the deterministic intersection of product definition, authority ceiling, context/evaluation/resource/provider policies, current conformance, tenant stricter settings, principal/context authority, source/tool access, confirmation and degradation state.

`ConfigurationMonotonicityCheck` proves no authority/tool expansion, no mandatory-context reduction, no weaker completeness/evaluation/review/isolation/residency/retention and no resource setting that removes mandatory context or safety. Failure blocks activation.

---

# 9. AI run, proposal and source/context semantics

Every run binds exact capability, model/provider, prompt/instruction, tool, retrieval, principal/context, source/input/cut, output, citation, uncertainty, review, correction, accepted-operation, retention/training and resource identities.

Closed output classes remain extraction, mapping, classification, matching, draft, cited summary/projection, anomaly hypothesis, recommendation, cited query answer, operation-plan proposal, human-confirmed command request and abstention/unsupported.

No authoritative generic AI result. Proposal cannot self-accept.

Claims remain classified as product fact, external observation, metric/projection, evidence content, deterministic rule derivation, model inference or unknown. Exact source/version/location/cut is required. Inference is not fact or causation.

---

# 10. AI context coverage and resource floor

Every capability/use binds product-owned `AIContextCoveragePolicy` covering eligible context population, mandatory sources, scope/time/cut, access treatment, retrieval/pagination/truncation, minimum coverage, duplicate/correction handling and allowed subset/range/segmentation/use.

Run assessment remains:

- CONTEXT_COMPLETE;
- CONTEXT_EVALUATED_SUBSET_KNOWN;
- CONTEXT_DETERMINISTIC_RANGE;
- CONTEXT_SEGMENTED;
- CONTEXT_ACCESS_RESTRICTED;
- CONTEXT_UNKNOWN_GAP;
- CONTEXT_BLOCKED.

“All,” “total,” “complete,” “none” and “current” require complete underlying product proof. Citations do not substitute for coverage. Missing mandatory sources/unknown gaps abstain or block. Known subsets/ranges inherit P1.8/P1.9 use and disclosure limits.

Tenant budgets may reduce cost/time/tokens/concurrency only if mandatory context, citations, safety, confirmation and audit lineage still fit. Otherwise queue, select a separately evaluated smaller profile, explicitly narrow scope, return an allowed subset/range, abstain or disable AI. Silent mandatory-context trimming is prohibited.

---

# 11. AI proposal freshness

Every AI proposal binds exact source/context cut, target/member/version set, authority/configuration/field/metric/operation versions, generation time and product-owned `ProposalFreshnessPolicyVersion`.

Material source, target, population, authority, evidence, configuration, schema, metric, operation, recipient, value-basis or consequence change makes the proposal `STALE_REVIEW_REQUIRED` or `INVALIDATED`.

A stale proposal cannot be accepted, converted into a command or transmitted. Expected-version guards remain an additional defense, not the sole staleness control.

---

# 12. Agent authority and multi-agent delegation

Closed ladder:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare command for human confirmation;
- L5 transmit the exact already-confirmed command;
- L6 non-generative deterministic system automation only.

There is no general autonomous commercial agent.

Authority is the intersection of product capability ceiling, current principal/context, exposed operation/tool, access, guards, exact confirmation, conformance and resources.

L5 transmits only the canonical command digest already confirmed by the same acting/represented principal. Any semantic default/change invalidates confirmation.

Sub-agent/multi-agent authority is the intersection with the invoker's authority and delegated subset, never a union. Agents cannot combine restrictions into broader authority, create tools/capabilities, raise levels, inherit service-account breadth or convert plan approval into command approval.

Effect-indeterminate pauses dependent/conflicting actions and permits lookup, explanation or reconciliation recommendation only.

V1 prohibits autonomous award, Commitment, certification, payment, external issue, grant, policy/field/metric/operation change, deletion/hold, residency/provider change and uncertainty resolution.

---

# 13. Evaluation sufficiency and confidence

Every capability binds product-owned `EvaluationSufficiencyPolicy` with sample, strata, diversity, confidence, reviewer/ground-truth, holdout, adversarial and expiry rules.

Beyond-shadow defaults remain:

- ≥500 independent labelled units overall;
- ≥100 per critical stratum;
- ≥200 reviewed pilot outputs and ≥50 per critical stratum;
- calibration ≥500 with ≥50 positive and 50 negative;
- two reviewers for critical truth, ≥95% agreement and appropriate agreement ≥0.80, adjudicated;
- mandatory safety scenarios plus ≥200 adversarial variants with zero observed failures;
- quarterly refresh and ≤10 business days after a material incident/new attack class.

A one-sided 95% confidence lower bound must meet threshold for all statistically estimable load-bearing rate/proportion metrics used for activation, including extraction, mapping, classification, citation, unsupported-claim, abstention, command-exactness and customer-facing accuracy/completion/safety rates.

Zero-tolerance properties require zero observed failures in the finite mandatory suite and are reported as finite-suite outcomes, never proof of zero real-world risk.

Latency/resource/cost use percentile/distribution contracts.

Only `SUFFICIENT_PASS` activates. Insufficient sample/strata, unreliable truth, compromised holdout or expired adversarial coverage does not activate.

---

# 14. Retrieval, memory, provider and AI-off

Prompts, retrieval, embeddings/indexes, caches, memory, tool results, outputs, corrections, evaluations and provider files remain tenant/project/principal/purpose/residency scoped.

Cross-tenant business influence and provider training are OUT by default.

Retrieval filters access before exposure, binds exact source/version/index/freshness and never treats similarity as identity/truth.

Memory classes remain turn-local, session, preference, task working, tenant knowledge index and evaluation/correction; authority/truth memory is prohibited.

Material provider/model change requires full evaluation and shadow/pilot. Fallback only to separately evaluated compatible conforming profiles. Provider disappearance leaves deterministic A0–A3 intact.

---

# 15. Ordered validation/falsification gates

1. **V0 architecture closure:** P1.11/master-spec PASS.
2. **V1 primary contractor/supplier evidence:** participant gates and FT-02, FT-06, FT-09/CR-02, FT-10 targeted before irreversible build-scope commitment.
3. **V2 prototype comprehension:** ≥8 internal and ≥8 external users, zero critical meaning misunderstandings in final round; before non-throwaway thin-slice build.
4. **V3 deterministic A0–A3 thin slice:** zero architecture invention, restore/load/isolation/NFR instrumentation, no AI dependency.
5. **V4 P07 feasibility:** before any P07 build/commercial commitment.
6. **V5 NFR verification:** before pilot/GA for declared envelope.
7. **V6 AI capability gate:** deterministic/manual path first; evaluation/shadow/pilot per capability.
8. **V7 controlled pilot:** ≥2 contractors, ≥3 tenders each, ≥10 suppliers; ≤5 working days to first tender and ≥80% supplier completion hypotheses measured.
9. **V8 commercial/release decision:** architecture, build, pilot and commercial evidence reported separately.

A failed earlier gate blocks dependent commitment or permits only a clearly declared throwaway research activity without customer promise.

Architecture PASS is never external, product, commercial or market validation.

---

# 16. Explicit one-XL/scope boundary

P1.10 does not authorize a tenant-facing or product-independent:

- generic SLO/SLA platform;
- observability/telemetry/SIEM product;
- security/GRC/compliance suite;
- data lake/warehouse/analytics platform;
- model-training/fine-tuning platform;
- prompt/capability/agent builder;
- tool/plugin marketplace;
- vector/retrieval platform;
- memory/knowledge platform;
- evaluation/annotation/benchmark platform;
- multi-agent orchestration product;
- infrastructure/cloud-management product.

Internal engineering may later select technologies/practices to implement these obligations. Those tools are not tenant-authored semantics or independent product scope.

P07 remains the sole independent XL.

---

# 17. Candidate ADR posture

Still proposed pending external PASS:

- ADR-0017 — additive/replaceable AI over deterministic substrate;
- ADR-0042 — measurable workload/performance/NFR conformance;
- ADR-0043 — availability/durability/continuity/reliability/degradation;
- ADR-0044 — observability/security/privacy/residency/lifecycle/data/resource residual;
- ADR-0045 — product-owned AI run/proposal/context/abstention/evaluation grammar;
- ADR-0046 — product-owned bounded agent authority/tool exposure/human-confirmed command;
- ADR-0047 — tenant-isolated retrieval/memory/provider replacement/AI-off;
- ADR-0048 — ordered architecture-to-evidence/build/pilot/commercial falsification gate.

No ADR status changes before Claude Round-2 PASS and final reconciliation.

---

# 18. Gate claim

- G1 measurable NFR/conformance — PASS candidate;
- G2 finite scale/capacity — PASS candidate;
- G3 acknowledgment/durability/RTO/RPO — PASS candidate;
- G4 degradation/retry/effect safety — PASS candidate;
- G5 observability/no-authority/privacy — PASS candidate;
- G6 security/privacy/residency/lifecycle — PASS candidate;
- G7 files/import/export/quota/rates — PASS candidate;
- G8 deployment/conformance/version/rollback — PASS candidate;
- G9 AI identity/provenance/context/uncertainty/review — PASS candidate;
- G10 no AI semantic/authority/truth creation — PASS candidate;
- G11 product-owned capability/agent ladder/tool/partial-indeterminate — PASS candidate;
- G12 sufficient evaluation/confidence/abstention/regression — PASS candidate;
- G13 tenant-isolated context/memory/retrieval/provider — PASS candidate;
- G14 AI-off/provider replacement — PASS candidate;
- G15 ordered validation/falsification debt — PASS candidate;
- G16 one XL/product-code lock — PASS candidate;
- G17 internal recheck and Claude — PENDING.

P1.1–P1.9 remain closed. P1.11 and product code remain locked.
