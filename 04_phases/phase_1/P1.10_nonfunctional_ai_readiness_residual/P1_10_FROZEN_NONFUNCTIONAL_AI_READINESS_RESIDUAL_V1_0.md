# P1.10 — Frozen Nonfunctional & AI-Readiness Residual v1.0

**Date:** 2026-08-01  
**Status:** PASS / CLOSED / FROZEN  
**External hostile audit:** Claude Round 2 PASS  
**Product/frontend/AI code:** NOT STARTED / LOCKED pending Phase 1 final validation

---

# 1. Governing thesis

> **Nonfunctional requirements are measurable product contracts, and AI is an optional, replaceable proposal-and-orchestration layer over the frozen deterministic system—not a new truth, authority or dependency.**

This contract freezes operating and AI-readiness meaning. It does not select cloud, database, queue, observability, security, AI provider, framework, language or physical topology.

---

# 2. Inherited invariants

P1.10 may not reinterpret:

- tenant/project/ContractingAuthorityContext and current authority checks;
- one authoritative source/writer per effective period;
- AwardDecision ≠ Commitment;
- workflow/evidence/integration/report/AI never business truth;
- exact commercial, correction and actual-family semantics;
- evidence/source/version/location/reliance and immutable issued artifacts;
- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- stable command, continuation and result identities;
- EFFECT_INDETERMINATE and PARTIAL_EFFECT;
- declared/evaluated/restricted populations and use limitations;
- principal-bound confirmation and no hidden commands;
- product-owned operation, metric, field and configuration registries;
- disclosure parity and complete deterministic A0–A3 operation without AI;
- cross-tenant business influence OUT by default.

P07 remains the sole independent XL gravity well.

---

# 3. Measurable NFR contract

Every load-bearing NFR binds:

- stable key/version;
- purpose and protected risk;
- criticality C0–C3;
- service/capability/data class;
- exact reference workload profile;
- SLI start/end/formula;
- threshold, percentile/distribution and window;
- eligible population, inclusion/exclusion and measurement-health rules;
- test/evidence and conformance disposition;
- degradation/fallback;
- customer/contract impact;
- review/change/restatement lineage.

## 3.1 Criticality

- `C0_INTEGRITY_SECURITY_AUTHORITY_DURABILITY`
- `C1_CORE_SERVICE_OR_CUSTOMER_COMMITMENT`
- `C2_SUPPORTING_OR_DEGRADABLE_CAPABILITY`
- `C3_OPTIONAL_CAPABILITY`

## 3.2 Conformance

- TARGET_UNVERIFIED
- VERIFIED_PASS
- VERIFIED_PASS_LOWER_DECLARED_ENVELOPE
- VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK
- VERIFIED_FAIL_BLOCKED
- ACTIVE_BREACH_REMEDIATION
- NOT_APPLICABLE
- RETIRED

Rules:

- C0 requires verified pass. No waiver, lower envelope or error budget can authorize loss, unauthorized effect, cross-tenant disclosure or authority violation.
- C1 requires pass for the declared release/customer envelope.
- C2 may activate only under an explicit verified limitation/fallback.
- C3 remains disabled until pass.
- Pilot does not waive C0.
- Unverified is never represented as achieved.

Measurement health is complete, partial-known, partial-unknown or unavailable. Missing telemetry cannot improve an SLO; it is treated conservatively or blocks the claim.

---

# 4. Workload and performance envelope

## 4.1 Pilot profile

- 10 active tenants;
- 250 concurrent sessions platform-wide / 25 largest tenant;
- 20 active projects and 100 internal users per tenant;
- 5,000 supplier relationships per tenant;
- 250k active / 1.5m historical lines per tenant;
- 2m retained events and 250 GB evidence per tenant;
- 50 command acceptances/min platform;
- 200 reads/min largest tenant;
- 25 external submissions/min platform.

## 4.2 Standard verification profile

- 50 active tenants;
- 1,000 concurrent sessions / 100 largest tenant;
- 50 projects, 250 users and 25k supplier relationships per tenant;
- 1m active / 5m historical lines per tenant;
- 10m events and 1 TB evidence per tenant;
- 250 command acceptances/min platform;
- 1,000 reads/min largest tenant;
- 100 external submissions/min platform.

## 4.3 Core targets

- interactive read P95 ≤1.5 s, P99 ≤4 s;
- proposal preview P95 ≤3 s, P99 ≤8 s;
- durable command acceptance P95 ≤1.5 s, P99 ≤4 s, client timeout 10 s;
- external task landing P95 ≤3 s, P99 ≤7 s;
- search P95 ≤2 s, freshness 60 s P95 / 5 min P99;
- common report P95 ≤5 s, P99 ≤15 s;
- ≤100-page or 100k-row artifact P95 ≤2 min;
- import preview ≤10k rows P95 ≤60 s, ≤100k rows P95 ≤10 min;
- export ≤100k rows P95 ≤2 min, ≤1m rows P95 ≤15 min;
- accepted async visible P95 ≤2 s, heartbeat ≤15 s, committed result visible P95 ≤5 s.

Saturation must produce typed backpressure/degradation—not acknowledged loss, duplicate effect, hidden truncation or cross-tenant leakage.

---

# 5. Availability, durability and recovery

Monthly targets:

- core deterministic A0–A3: 99.90%;
- external task/submission: 99.90%;
- evidence access/issue: 99.90%;
- reporting/search: 99.50%;
- optional AI when active: 99.00%.

## 5.1 RPO

- acknowledged authoritative/evidence/issued/idempotency records: semantic RPO 0;
- operational effect position: ≤1 minute;
- report support indexes: ≤15 minutes or rebuild;
- derived search/cache: ≤24 hours or rebuild;
- critical telemetry: ≤15 minutes;
- transient unaccepted AI output: discardable.

## 5.2 Durability proof

Acknowledgment requires one `DurabilityAcknowledgementProof`:

1. transactional durable commit;
2. durable payload/object plus metadata commit;
3. replicated append/journal commit;
4. authoritative external acknowledgment plus local immutable intent/effect position.

Product-custodied evidence requires exact payload plus identity/integrity to cross the durable boundary before accepted-capture success.

## 5.3 RTO and restore

- core/A0–A3/external task ≤4 h;
- evidence/reporting ≤8 h;
- search ≤24 h with degraded path;
- AI ≤72 h or disabled.

Required proof:

- daily backup integrity evidence;
- monthly sampled restore;
- quarterly end-to-end restore;
- annual disaster exercise.

A backup not restored in the prior quarter does not support the recovery claim. Restore preserves idempotency, effect positions, holds, redactions, tombstones, lineage and tenant/access boundaries.

---

# 6. Reliability and degradation

Every dependency/action binds timeout, safe retry class, attempts/window, backoff, circuit, queue priority/age, dead-letter/reconciliation, idempotency retention and visibility.

Defaults:

- ≤5 automatic attempts only for proven pre-effect idempotent transport;
- interactive retry window ≤15 min, routine async ≤24 h;
- possible effect never ordinary-retries;
- queue warning at 5 min interactive / 30 min routine;
- blocking escalation at 15 min interactive / 4 h routine or deadline sooner;
- dead-letter/quarantine visible ≤5 min;
- continuation/idempotency retained ≥90 days after terminal, longer while unresolved or issue-bearing.

Degradation protects in this order:

1. tenant/access/security;
2. durability/effect safety;
3. evidence/submission attempts;
4. result lookup/reconciliation;
5. deterministic core reads/actions;
6. control reporting;
7. search;
8. import/export;
9. optional connectors;
10. AI.

---

# 7. Observability, security, privacy and lifecycle

Domain events, integration events, external observations, transport envelopes, audit/security records, logs, traces, metrics, incidents and AI records remain distinct. Telemetry never establishes business truth.

Sensitive bid, commercial, evidence, personal, prompt or confidential content is prohibited from general telemetry. Restricted diagnostics are purpose, tenant, access and retention bound.

Binding targets include:

- MFA for internal production users by GA and always for privileged users;
- access revocation P95 ≤5 min;
- idle session internal 30 min / external 60 min;
- absolute session internal 12 h / external 24 h;
- privileged elevation ≤1 h;
- TLS 1.2 minimum, TLS 1.3 preferred, encryption at rest;
- privileged static secrets ≤90 days, other secrets ≤180 days, keys ≤365 days or stricter;
- known-exploited/critical active-path containment ≤24 h and fix target ≤7 days;
- high vulnerability target ≤30 days, medium ≤90 days;
- adversarial/penetration testing before GA, annually and after material security change;
- SEV-0/1 response start ≤15 min and material updates at least every 60 min.

Zero tolerance applies to cross-tenant disclosure, unauthorized commercial/domain effect and acknowledged data loss.

Lifecycle and residency cover primary data, evidence, backups, logs, search, prompts, outputs, embeddings, retrieval, memory, evaluation and provider files. Holds/redactions/tombstones survive restore. No compliance, legal, UAE/GCC residency or retention claim is made without applicable evidence.

---

# 8. Files, imports, exports, quotas and deployment

Default bounded limits:

- file: 100 MB synchronous / 500 MB asynchronous;
- external submission: ≤100 files and 2 GB;
- internal capture: ≤250 files and 5 GB;
- archive depth ≤2, entries ≤10k, expanded ≤5 GB and ≤20× compressed;
- PDF ≤5,000 pages;
- image ≤100 megapixels;
- import ≤100k rows;
- export ≤1m rows or 5 GB.

Pipeline:

`durable untrusted capture → type validation → quarantine → scan → parser validation → proposal → explicit acceptance`

Scan unavailable/timeout is not clean. Macro/script/trusted execution is prohibited. Unknown fields remain evidence or unmapped proposals. Exports cannot silently truncate.

Quotas/rates are numeric per tenant/capability and preserve exact acceptance/effect/continuation/reset/fallback meaning, including deadline-attempt evidence.

Deployment binds build/provenance/schema/configuration/operation/metric/field/AI-capability/provider versions, compatibility, migration, rollout, rollback and kill-switch state. In-flight work retains original governing versions. Provider fallback requires a separately evaluated compatible conforming profile.

---

# 9. Product-owned AI capability registry

Every runtime AI capability binds a product-authored `AICapabilityDefinitionVersion` in the product `AICapabilityRegistry`.

Product-owned only:

- purpose and explicit non-use;
- output class;
- prompts/instruction versions;
- accepted input/source classes;
- context/retrieval policy;
- exposed registered operations/tools and read/write class;
- maximum L0–L6 authority;
- confirmation/review behavior;
- evaluation thresholds/sufficiency policy;
- resource budget/default/mandatory floor;
- provider/model compatibility;
- isolation/residency/retention/training posture;
- activation/degradation/fallback/retirement;
- deterministic/manual equivalent.

No runtime capability exists outside the registry.

## 9.1 Tenant configuration

Tenant configuration may only disable/narrow:

- enable/disable;
- choose authority at or below the product ceiling;
- require more review or manual transmission;
- choose product-defined options;
- add admitted tenant sources within a registered source class;
- add mandatory sources or raise coverage;
- strengthen abstention/escalation;
- apply stricter budgets that preserve mandatory context/safety;
- apply stricter retention/no-memory;
- select an independently evaluated compatible provider profile;
- supply non-authoritative terminology/examples as evidence/reference data.

Tenant configuration may not create capabilities/prompts/tools/policies, raise authority, create generative L6, weaken context/evaluation/review/isolation, remove mandatory sources, redefine completeness, select unevaluated providers, create memory/vector/agent routing or use scripts/natural language/files as policy definitions.

## 9.2 Runtime monotonicity

`ConfigurationMonotonicityCheck` proves that the effective profile does not expand authority/tools, reduce mandatory context, weaken evaluation/review/abstention, weaken isolation/residency/retention or breach the resource floor.

It runs before initial enablement and on every configuration, capability, prompt, source, tool, provider, authority, context, evaluation, resource, isolation, retention or migration change. Failure/unavailability blocks activation.

## 9.3 Source and provider admission

Tenant-added sources must conform to a product-registered `AISourceClassVersion`. Admission does not establish source authority.

Every permitted provider/model profile carries its own current `SUFFICIENT_PASS`, compatibility, privacy/residency/retention, adversarial validity and activation state. Evaluation is never inherited between profiles.

---

# 10. AI run, context and proposal semantics

Every AI run binds exact:

- capability/version;
- model/provider/version/region;
- prompt/instruction/tool/retrieval versions;
- principal, tenant, project and authority context;
- source/input/source-cut manifest;
- context coverage;
- output class/content/citations;
- uncertainty/limitations;
- review/correction/accepted-operation lineage;
- provider data-use/retention posture;
- latency/resource/cost/failure.

Closed output classes:

- extraction proposal;
- normalization mapping proposal;
- classification proposal;
- matching/linkage proposal;
- draft content;
- comparison/summary projection;
- anomaly/control hypothesis;
- recommendation;
- cited query answer;
- operation-plan proposal;
- human-confirmed command request;
- abstention/unsupported.

No generic authoritative AI result. AI cannot invent or change field, metric, operation, policy, authority or source meaning. Proposal cannot self-accept.

## 10.1 Context coverage

Every capability/use binds `AIContextCoveragePolicyVersion`, including eligible population, mandatory sources, scope/time/cut, access treatment, retrieval/pagination/truncation, minimum coverage, duplicate/correction treatment and allowed subset/range/segmentation/use.

Run disposition is one:

- CONTEXT_COMPLETE;
- CONTEXT_EVALUATED_SUBSET_KNOWN;
- CONTEXT_DETERMINISTIC_RANGE;
- CONTEXT_SEGMENTED;
- CONTEXT_ACCESS_RESTRICTED;
- CONTEXT_UNKNOWN_GAP;
- CONTEXT_BLOCKED.

“All,” “total,” “complete,” “none” and “current” require complete underlying product proof. Citations do not substitute for coverage. Unknown gaps/missing mandatory sources abstain or block. Subset/range behavior inherits P1.8/P1.9 disclosure and use ceilings.

## 10.2 Proposal freshness

Every proposal binds exact source/target/context/authority/configuration/schema/metric/operation/recipient versions and a `ProposalFreshnessPolicyVersion`.

Material change makes it stale or invalid. A capability-version transition explicitly disposes outstanding runs/proposals before the per-proposal freshness check. No proposal silently migrates or rebinds to a new capability/model/prompt/tool/policy.

---

# 11. Agent authority

Closed levels:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare exact command for human confirmation;
- L5 transmit the exact already-confirmed command;
- L6 non-generative deterministic system automation only.

There is no general autonomous commercial agent.

Authority is the exact intersection of product capability ceiling, current principal/context authority, exposed registered operation/tool, access, guards, confirmation, conformance and resources.

L5 uses a canonical command digest covering operation, principals, context, targets, values, recipients, evidence, idempotency and continuation. Any semantic change invalidates confirmation.

Sub-agent authority is the intersection with the invoker's current authority/delegated subset, never a union. Agents cannot combine permissions, inherit broad service-account authority, add tools/sources, create capabilities or convert plan approval into command approval.

Effect-indeterminate pauses dependent/conflicting work; only lookup, explanation and reconciliation recommendation remain permitted.

V1 prohibits autonomous award, Commitment, certification, payment, external issue, access grant, policy/registry change, evidence deletion/hold, provider/residency change and uncertainty resolution.

---

# 12. AI evaluation and resource sufficiency

Evaluation stages:

1. deterministic validation;
2. offline evaluation;
3. adversarial/security/privacy;
4. shadow;
5. limited pilot;
6. monitored activation;
7. periodic regression;
8. incident rollback/retirement.

Default beyond-shadow sufficiency:

- ≥500 independent labelled units overall;
- ≥100 per critical stratum;
- ≥200 reviewed pilot outputs and ≥50 per critical stratum;
- one-sided 95% confidence lower bound meets every statistically estimable load-bearing threshold;
- calibration ≥500 with ≥50 positive and 50 negative;
- critical ground truth double-reviewed, ≥95% agreement and suitable agreement measure ≥0.80 with adjudication;
- all mandatory safety scenarios plus ≥200 adversarial variants, zero observed failures;
- quarterly suite refresh and within 10 business days of material incident/new attack class.

Only `SUFFICIENT_PASS` activates. Point estimates alone do not activate. Finite zero-failure evidence is reported as a finite-suite result, not proof of zero real-world risk.

Every capability has a numeric resource budget. Reducing budget may queue, use a separately evaluated smaller profile, explicitly narrow task scope, produce a permitted subset/range, abstain or disable AI. It may not remove mandatory context, citations, safety, confirmation or audit.

---

# 13. AI isolation, memory and replaceability

Isolation covers prompts, retrieval, embeddings/indexes, caches, memory, tool results, outputs, evaluations, provider files and telemetry by tenant/project/principal/purpose/residency.

Cross-tenant business influence and provider training are OUT by default.

Memory classes:

- turn-local;
- session;
- user preference;
- task working;
- tenant knowledge index;
- evaluation/correction;
- prohibited authority/truth memory.

AI-off/manual deterministic A0–A3 remains complete. Provider disappearance or AI outage cannot block core procurement. New providers/models require independent evaluation and conformance.

---

# 14. Ordered validation and falsification

1. V0 — P1.11 architecture/master-spec closure.
2. V1 — primary contractor/supplier evidence and targeted open fieldwork before irreversible build-scope commitment.
3. V2 — prototype comprehension with ≥8 internal and ≥8 external users and zero critical meaning misunderstanding in the final qualifying round.
4. V3 — deterministic A0–A3 thin slice with zero architecture invention and restore/load/isolation/NFR instrumentation.
5. V4 — P07 feasibility before P07 build/commercial commitment.
6. V5 — NFR verification at the declared envelope.
7. V6 — capability-specific AI evaluation/shadow/pilot after deterministic/manual path.
8. V7 — controlled live pilot with ≥2 contractors, ≥3 tenders each and ≥10 suppliers.
9. V8 — commercial/release decision with architecture, build, pilot and commercial evidence reported separately.

Primary evidence and comprehension precede non-throwaway build.

V1/V2 pass/fail requires a recorded independent `ValidationGateDecision` with raw observations, criticality classification, disagreements, conflicts and revise/kill disposition.

Architecture PASS is not external, product, commercial or market validation.

---

# 15. Explicit scope refusal

P1.10 does not authorize a tenant-facing or product-independent:

- SLO/SLA platform;
- observability/SIEM product;
- security/GRC/compliance suite;
- data lake/warehouse platform;
- model training/fine-tuning platform;
- prompt/capability/agent builder;
- tool/plugin marketplace;
- vector/retrieval platform;
- memory/knowledge platform;
- evaluation/annotation/benchmark platform;
- multi-agent orchestration product;
- infrastructure/cloud-management product.

Internal implementation tools may be selected later but do not become tenant-authored semantics or independent product scope.

---

# 16. Accepted ADR basis

This freeze is the controlling semantic basis for final acceptance of:

- ADR-0017;
- ADR-0042;
- ADR-0043;
- ADR-0044;
- ADR-0045;
- ADR-0046;
- ADR-0047;
- ADR-0048.

No upstream ADR reopens.

---

# 17. Closure gates

- G1 measurable NFR/conformance — PASS
- G2 finite scale/capacity — PASS
- G3 acknowledgment/durability/RTO/RPO — PASS
- G4 degradation/retry/effect safety — PASS
- G5 observability/no authority/privacy — PASS
- G6 security/privacy/residency/lifecycle — PASS
- G7 files/import/export/quota/rates — PASS
- G8 deployment/conformance/version/rollback — PASS
- G9 AI identity/provenance/context/uncertainty/review — PASS
- G10 no AI semantic/authority/truth creation — PASS
- G11 agent ladder/tool use/partial-indeterminate — PASS
- G12 sufficient evaluation/abstention/regression — PASS
- G13 tenant-isolated context/memory/retrieval/provider — PASS
- G14 AI-off/provider replacement — PASS
- G15 ordered validation/falsification — PASS
- G16 one XL/product-code lock — PASS
- G17 dual hostile audit — PASS

P1.10 is PASS / CLOSED / FROZEN. P1.11 may begin. Product code remains locked until Phase 1 final validation and subsequent authorized build phase.