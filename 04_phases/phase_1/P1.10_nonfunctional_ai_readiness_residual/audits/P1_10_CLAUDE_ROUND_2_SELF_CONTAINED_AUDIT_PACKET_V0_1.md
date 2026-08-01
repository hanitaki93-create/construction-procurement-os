# Construction Procurement OS — P1.10 Claude Round 2 Self-Contained Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.10 — Nonfunctional & AI-Readiness Residual  
**Status:** INTERNAL POST-ROUND-1 RECHECK PASS / P1.10 ACTIVE / P1.11 LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED

---

# 1. Round-2 mission

Audit this packet only.

Claude Round 1 returned:

`FAIL — P1.10 remains open; blockers below must be remediated.`

One blocker:

> **BL-P110-04 — AI capability, policy and authority-level authorship was unstated. Nothing said whether capability definitions, prompts, tools, L-levels, coverage policies, evaluation thresholds and resource budgets were product-authored or tenant-configurable.**

Round 1 otherwise passed:

- measurable NFR and release-conformance grammar;
- finite workload/capacity profiles;
- durability proof/RTO/RPO/restore;
- reliability/degradation/effect safety;
- observability/security/privacy/residency/lifecycle;
- file/import/export/quota/deployment controls;
- AI identity/provenance/context coverage;
- no AI truth/semantic creation;
- evaluation sufficiency/abstention/regression;
- tenant-isolated retrieval/memory/provider behavior;
- AI-off/provider replacement;
- validation/falsification boundary.

Round 1 also raised W-81–W-86.

Treat this remediation and the internal PASS as claims to attack.

Do not fail for vendor, framework, cloud, database, queue, physical topology/schema, implementation language, test tool, AI model or code intentionally deferred.

Fail if later physical/P1.11 work still must choose:

- who authors AI capability meaning;
- whether a tenant can broaden prompts/tools/authority;
- whether tenant budgets can weaken context completeness;
- whether evaluation thresholds can be tenant-defined;
- whether multi-agent delegation can amplify authority;
- whether proposal freshness is local and explicit;
- how confidence gates apply;
- who may declare a lower envelope;
- whether validation gates precede non-throwaway build;
- whether P1.10 creates a generic agent/NFR/data/model platform.

---

# 2. Frozen upstream state

P1.0–P1.9 are closed/frozen as applicable.

P1.10 is active.

P1.11 and product/frontend/AI code are locked.

P07 remains the sole independent XL.

A0–A3 remains complete without P07, named connector, supplier account/network, chat, AI or warehouse:

`authorized requirement/allocation/optional package`
`→ RFQ/tender`
`→ supplier response/revision`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

Frozen controls include:

- one authoritative source/writer and OWN/MIRROR/REFERENCE/OUT;
- bounded product-owned OperationRegistry;
- no workflow/evidence/report/AI business authority;
- AwardDecision ≠ Commitment;
- exact evidence, issue/effect, money/correction and actual-family meaning;
- effect-indeterminate and stable continuation/idempotency;
- product-owned metric/operator and field/schema registries;
- population/subset/range/quality/restatement semantics;
- principal-bound confirmation and no hidden action;
- tenant-private external participation;
- conventional no-AI A0–A3 floor;
- cross-tenant learned business influence OUT by default.

---

# 3. Unchanged P1.10 foundation

## 3.1 NFR conformance

Every NFR binds identity/version, risk, C0–C3 criticality, service/capability/data class, reference workload, exact SLI/formula, threshold/distribution, window/population/exclusions, measurement health, evidence/test, degradation, review and customer/contract mapping.

Conformance:

- TARGET_UNVERIFIED;
- VERIFIED_PASS;
- VERIFIED_PASS_LOWER_DECLARED_ENVELOPE;
- VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK;
- VERIFIED_FAIL_BLOCKED;
- ACTIVE_BREACH_REMEDIATION;
- NOT_APPLICABLE;
- RETIRED.

C0 requires pass with no waiver/error budget/lower envelope. C1 requires pass for declared envelope. C2 requires verified safe limitation/fallback. C3 stays disabled until pass. Pilot does not waive C0.

Measurement health is complete, partial-known, partial-unknown or unavailable. Missing telemetry cannot improve an SLO.

## 3.2 Workload and performance

Finite pilot and V1 standard profiles bind tenants, users, projects, suppliers, lines, events, evidence volume, sessions and operation rates.

Targets use P95/P99 or exact distribution semantics for reads, previews, durable acceptance, external tasks, search, reports, imports, exports and async progress.

Acknowledgement, effect establishment and result visibility remain distinct.

## 3.3 Availability, durability and recovery

Capability-specific availability remains:

- core/external tasks/evidence 99.90% monthly;
- reports/search 99.50%;
- optional AI 99.00% when active.

Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0 and require one:

- transactional durable commit;
- durable object plus metadata commit;
- replicated append/journal commit;
- external-authoritative acknowledgment plus local immutable intent/effect position.

Product-custodied evidence requires payload plus identity/integrity before accepted-capture success.

Core RTO ≤4 h; evidence/reporting ≤8 h; search ≤24 h; AI may remain disabled. Backup integrity daily, sampled restore monthly, end-to-end restore quarterly, disaster exercise annually.

## 3.4 Reliability, security and lifecycle

Only proven pre-effect idempotent transport auto-retries. Unknown effect never ordinary-retries.

Degradation protects security, durability/effect safety, evidence/submission attempt, result lookup and deterministic work before optional capabilities/AI.

Telemetry is not business truth and excludes sensitive content from general logs/traces.

Numeric MFA, revocation, sessions, encryption, secret/key, vulnerability, incident and zero-tolerance cross-tenant/unauthorized-effect/data-loss controls remain.

Lifecycle covers primary data, evidence, backups, logs, search, prompts, outputs, embeddings, retrieval, memory, evaluation and provider copies. Holds/redaction/tombstones survive restore. No UAE/GCC localization/certification claim without evidence.

## 3.5 Files, deployment and provider fallback

Exact file/archive/page/pixel/row/export limits remain. Scan unavailable/timeout is not clean. Unknown columns remain evidence/proposals. No silent export truncation.

Deployment binds build/schema/config/operation/metric/field/AI capability/policy/provider/model versions. Automatic provider/model fallback is allowed only to a separately evaluated compatible conforming profile; otherwise abstain/disable/manual.

---

# 4. Product-owned AI capability authorship

## 4.1 Governing rule

> **Every AI capability, output class, prompt/instruction set, exposed tool, authority ceiling, context-coverage policy, evaluation policy and resource-policy semantic is product-authored and versioned. Tenant configuration may only disable or narrow the product-defined capability.**

No runtime AI capability exists outside the product-owned `AICapabilityRegistry`.

## 4.2 `AICapabilityDefinitionVersion`

Every capability binds:

- stable key/version;
- supported purpose and explicit non-use;
- closed output class;
- eligible role/context classes;
- product prompt/instruction versions;
- permitted source/input classes;
- product `AIContextCoveragePolicyVersion`;
- product retrieval/source-selection policy;
- exact registered tools/operations and read/write class;
- maximum L0–L6 authority level;
- confirmation/review behavior;
- product `EvaluationSufficiencyPolicyVersion` and thresholds;
- product `AIResourceBudgetPolicyVersion`, default and mandatory floor;
- provider/model compatibility profile;
- isolation/residency/retention/training posture;
- activation/degradation/fallback/retirement;
- manual/AI-off equivalent;
- evidence/ADR/incident lineage.

---

# 5. Closed tenant configuration boundary

Tenant may only:

1. enable or disable a product capability;
2. choose a registered authority level at or below the product ceiling;
3. require additional review or less autonomy;
4. choose among product-defined source/output options;
5. add compliant tenant-authorized sources;
6. add mandatory sources or raise coverage;
7. strengthen abstention/escalation;
8. apply stricter budgets if mandatory context/safety still fit;
9. use stricter retention/no-memory;
10. choose separately evaluated compatible provider profiles where allowed;
11. require manual transmission;
12. supply non-authoritative terminology/examples as scoped evidence/reference data.

Tenant may not:

1. create or modify a capability;
2. author/modify system/developer prompts or hidden instructions;
3. add operations/tools/plugins/HTTP/DB/file-system/shell execution;
4. raise authority or create generative L6;
5. author or loosen context coverage;
6. remove/downgrade mandatory sources;
7. relabel incomplete context complete;
8. author/loosen evaluation metrics, thresholds, strata, confidence or adversarial suites;
9. author/loosen resource policy below mandatory-context/safety floor;
10. remove citations/review/confirmation;
11. create retrieval/vector/memory/cross-tenant knowledge semantics;
12. select an unevaluated provider/model;
13. weaken isolation/residency/retention/provider-training posture;
14. create multi-agent authority routing;
15. permit self-acceptance or confirmation bypass;
16. define policies through script, expression, natural-language instruction or tenant file.

Prohibited configuration is rejected.

---

# 6. Effective-profile monotonicity

Every runtime `AICapabilityEffectiveProfile` is the deterministic intersection of:

- product capability definition;
- product authority ceiling;
- product context/evaluation/resource policies;
- product mandatory resource floor;
- provider compatibility/conformance;
- tenant stricter settings;
- current principal/context authority;
- source/tool/operation access;
- current review/confirmation;
- degradation/resource state.

`ConfigurationMonotonicityCheck` proves:

- no authority increase;
- no tool expansion;
- no mandatory-context reduction;
- no weaker completeness meaning;
- no weaker evaluation threshold;
- no weaker review/abstention;
- no weaker isolation/residency/retention;
- no budget reduction that removes mandatory context or safety.

Failure blocks activation.

---

# 7. Resource-budget behavior

Tenant cost/time/token/concurrency limits may be stricter only when the evaluated mandatory context, citations, safety, confirmation and audit floor still fits.

Otherwise the only allowed outcomes are:

- queue;
- use a separately evaluated smaller product profile;
- explicitly narrow declared task scope;
- produce an allowed evaluated subset or deterministic range;
- abstain;
- disable AI/use manual deterministic fallback.

Budget cannot silently trim mandatory context, redefine completeness, skip citations/review or choose an unevaluated model.

---

# 8. Capability change control

A new capability, output class, prompt semantic, tool exposure, higher authority ceiling, broader source/context scope, lower review requirement, weaker abstention, new memory use, new provider class or material resource behavior requires:

1. prospective architecture-change record;
2. authority and second-XL review;
3. privacy/security/tenancy/residency review;
4. deterministic operation/tool review;
5. updated context/resource/evaluation policies;
6. updated adversarial suite;
7. `SUFFICIENT_PASS` for the complete new version;
8. shadow/limited pilot where applicable;
9. versioned release/conformance decision;
10. explicit old-version/in-flight/proposal disposition.

A tenant request is evidence/product feedback only and cannot create a runtime capability.

---

# 9. AI run, context and proposal freshness

Every run binds exact capability, provider/model, prompt/instruction, tools, retrieval, principal/context, source/input/cut, output, citations, uncertainty, review/correction, accepted-operation, retention/training and resource identity.

Claims remain classified and cited. AI cannot create authoritative facts, fields, metrics, operations, policies or authority. Proposal cannot self-accept.

Every capability/use binds product-owned context population, mandatory sources, time/cut, access treatment, retrieval/pagination/truncation, minimum coverage and allowed subset/range/segmentation/use.

Coverage dispositions:

- CONTEXT_COMPLETE;
- CONTEXT_EVALUATED_SUBSET_KNOWN;
- CONTEXT_DETERMINISTIC_RANGE;
- CONTEXT_SEGMENTED;
- CONTEXT_ACCESS_RESTRICTED;
- CONTEXT_UNKNOWN_GAP;
- CONTEXT_BLOCKED.

“All/total/complete/none/current” requires complete underlying product proof. Citations do not substitute for coverage.

Every proposal binds exact source/context cut, target/member/version set, governing authority/config/field/metric/operation versions, generation time and `ProposalFreshnessPolicyVersion`.

Material change produces `STALE_REVIEW_REQUIRED` or `INVALIDATED`. Stale proposal cannot be accepted or transmitted. Expected-version guards are an additional defense.

---

# 10. Agent authority and delegation

Closed levels:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare command for human confirmation;
- L5 transmit exact already-confirmed command;
- L6 non-generative deterministic system automation only.

No general autonomous commercial agent.

Authority is the intersection of product ceiling, current principal/context, exposed tool/operation, access, guards, exact confirmation, conformance and resources.

L5 transmits only the canonical command digest confirmed by the same acting/represented principal. Semantic changes invalidate confirmation.

A sub-agent's authority is the intersection with the invoker's current authority and delegated subset, never union. It cannot expand tools, create capabilities, raise level, inherit broad service-account rights, combine agents into broader authority or turn plan approval into command approval.

Effect-indeterminate pauses dependent/conflicting action and permits lookup/explanation/reconciliation recommendation only.

V1 prohibits autonomous award, Commitment, certification, payment, external issue, access grant, policy/field/metric/operation change, deletion/hold, provider/residency change and uncertainty resolution.

---

# 11. Evaluation and confidence

`EvaluationSufficiencyPolicy` remains product-owned.

Beyond-shadow defaults:

- ≥500 independent labelled units overall;
- ≥100 per critical stratum;
- ≥200 reviewed pilot outputs and ≥50 per critical stratum;
- calibration ≥500 with ≥50 positive/negative;
- critical truth double reviewed, ≥95% agreement and appropriate agreement ≥0.80, adjudicated;
- mandatory safety scenarios plus ≥200 adversarial variants with zero observed failures;
- quarterly refresh and within 10 business days of material incident/new attack class.

One-sided 95% confidence lower bound must meet threshold for every statistically estimable load-bearing activation rate/proportion, including extraction, mapping, classification, citation, unsupported claims, abstention, command exactness and customer-facing accuracy/completion/safety.

Zero-tolerance properties require zero observed failures in the finite mandatory suite and are reported only as finite-suite outcomes, not zero-risk proof.

Latency/cost/resources use percentile/distribution contracts.

Only `SUFFICIENT_PASS` activates.

---

# 12. Lower declared envelope authority

A lower verified capacity/performance envelope is allowed only prospectively where:

- C0 semantics remain unchanged;
- architecture owner and release authority approve;
- commercial/contract owner confirms offer/customer impact;
- legal/security reviews applicable commitments;
- existing customers are not moved below contracted commitments without an applicable mechanism and required consent/notice;
- the real verified envelope is exposed;
- later improvement creates a new version.

A failed existing commitment cannot be relabelled.

---

# 13. Ordered validation/falsification gates

1. **V0 architecture closure:** P1.11/master-spec PASS.
2. **V1 primary contractor/supplier evidence:** participant gates and outstanding FT evidence targeted before irreversible build-scope commitment.
3. **V2 prototype comprehension:** ≥8 internal and ≥8 external users, zero critical meaning misunderstandings in final round, before non-throwaway thin-slice build.
4. **V3 deterministic A0–A3 thin slice:** zero architecture invention, restore/load/isolation/NFR instrumentation, no AI dependency.
5. **V4 P07 feasibility:** before P07 build/commercial commitment.
6. **V5 NFR verification:** before pilot/GA for declared envelope.
7. **V6 AI capability gate:** deterministic/manual path first; evaluation/shadow/pilot per capability.
8. **V7 live pilot:** ≥2 contractors × ≥3 tenders each and ≥10 suppliers; ≤5 working days and ≥80% completion hypotheses measured.
9. **V8 commercial/release decision:** architecture, build, pilot and commercial evidence reported separately.

A failed earlier gate blocks dependent commitments or permits only explicitly throwaway research without customer promise.

Architecture PASS is not external/product/commercial validation.

---

# 14. Explicit anti-second-XL boundary

P1.10 does not authorize a tenant-facing/product-independent:

- SLO/SLA platform;
- observability/telemetry/SIEM product;
- security/GRC/compliance suite;
- data lake/warehouse/analytics platform;
- model training/fine-tuning platform;
- prompt/capability/agent builder;
- tool/plugin marketplace;
- vector/retrieval platform;
- memory/knowledge platform;
- evaluation/annotation/benchmark platform;
- multi-agent orchestration product;
- infrastructure/cloud-management product.

Internal engineering may use implementation tools later. They do not become tenant-authored semantics or product scope.

P07 remains sole independent XL.

---

# 15. Internal post-remediation result

Internal hostile recheck attacked **236 scenarios** and returned:

`PASS — BL-P110-04 and W-81–W-86 are closed. P1.10 is ready for Claude hostile audit Round 2.`

Claimed status:

- G1–G17 PASS internally;
- P1.1–P1.9 reopen = NO;
- second XL = CLEAN;
- A0–A3 = CLEAN;
- P1.11/code = LOCKED.

---

# 16. Candidate ADRs

Still proposed pending Round-2 PASS:

- ADR-0017 — additive/replaceable AI over deterministic substrate;
- ADR-0042 — measurable workload/performance/NFR conformance;
- ADR-0043 — availability/durability/continuity/reliability/degradation;
- ADR-0044 — observability/security/privacy/residency/lifecycle/data/resource residual;
- ADR-0045 — product-owned AI run/proposal/context/abstention/evaluation grammar;
- ADR-0046 — product-owned bounded agent authority/tool exposure/human-confirmed command;
- ADR-0047 — tenant-isolated retrieval/memory/provider replacement/AI-off;
- ADR-0048 — ordered architecture-to-evidence/build/pilot/commercial falsification gate.

No upstream ADR is proposed for reopening.

---

# 17. Required hostile scenarios

Attack at minimum:

1. tenant creates a new agent/capability;
2. tenant edits system/developer prompt;
3. tenant adds HTTP/plugin/database/shell tool;
4. query-labelled tool performs write;
5. tenant raises L4 to L5;
6. tenant turns generative capability into L6;
7. tenant removes mandatory source;
8. tenant calls missing source optional;
9. tenant lowers context coverage;
10. tenant marks subset complete;
11. tenant lowers evaluation threshold;
12. tenant removes critical stratum;
13. tenant weakens adversarial suite;
14. tenant cost budget removes mandatory context;
15. tenant chooses unevaluated provider;
16. tenant creates shared memory/vector/retrieval semantics;
17. tenant natural-language instruction bypasses policy;
18. tenant terminology/example contains prompt injection;
19. product changes prompt without version/evaluation;
20. product adds tool without full gate;
21. product raises authority without architecture review;
22. provider alias changes model silently;
23. smaller fallback model is unevaluated;
24. L4 planner calls L5 sender;
25. two restricted agents combine permissions;
26. sub-agent inherits service-account breadth;
27. recursive delegation amplifies authority;
28. plan approval becomes command approval;
29. recipient changes after confirmation;
30. agent retries indeterminate effect;
31. stale proposal after source/config/schema change;
32. 499 evaluation units;
33. critical stratum missing;
34. point estimate passes but 95% lower bound fails;
35. zero injection failure in inadequate suite;
36. reviewer disagreement hidden;
37. holdout reused/tuned;
38. adversarial suite expired;
39. top-k answer says all;
40. citations correct but mandatory source absent;
41. token truncation hides contradiction;
42. restricted source appears absent;
43. budget drops citations/review;
44. lower envelope declared after failure;
45. existing customer moved lower without contract mechanism;
46. evidence/participants occur after committed build;
47. throwaway prototype treated as product commitment;
48. P07 build before feasibility;
49. architecture PASS called market validation;
50. generic agent/SLO/SIEM/GRC/lake/model/vector/memory/evaluation platform;
51. all original Round-1 scenarios and previously passed NFR/AI controls.

Add your own.

---

# 18. Required response format

### VERDICT

Choose exactly:

`PASS — P1.10 Nonfunctional & AI-Readiness Residual can close; proceed to final ADR reconciliation/checkpoint and unlock P1.11.`

or

`FAIL — P1.10 remains open; blockers below must be remediated.`

### BLOCKERS

For each blocker provide ID, section/clause, failure path, why later physical/P1.11 work must choose meaning, and narrowest remediation.

Do not count deferred vendors/topology/tools/code as blockers.

### WATCHES / NON-BLOCKING DEBT

Separate semantic detail, contractor/supplier/legal/commercial validation, later physical implementation and P1.11-owned work.

### GATE CHECK

PASS/FAIL G1–G17.

### REGRESSION CHECK

P1.1–P1.9 reopening, SECOND XL and A0–A3 activation.

### ADR IMPACT

For ADR-0017 and ADR-0042–ADR-0048 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

State whether an accepted upstream ADR must reopen.

### P1.11 READINESS

Choose:

`READY AFTER P1.10 FINAL CHECKPOINT`

or

`NOT READY`

---

# 19. Final question

Is any load-bearing P1.10 decision still ambiguous enough that physical/P1.11 work must choose AI capability/prompt/tool authorship, authority ceiling, tenant configuration monotonicity, context/evaluation/resource-policy meaning, multi-agent delegation, confidence applicability, lower-envelope authority, validation ordering or anti-second-XL scope?

A clean PASS is appropriate only if the answer is NO.
