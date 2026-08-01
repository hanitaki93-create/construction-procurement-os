# PROJECT STATE

**Updated:** 2026-08-01  
**Canonical status file:** this document  
**Repository:** `hanitaki93-create/construction-procurement-os`

---

# 1. Position

- Project: **Construction Procurement OS**
- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.10 — Nonfunctional & AI-Readiness Residual**
- P1.0: **CP-05 PASS / CLOSED**
- P1.1: **PASS / FROZEN**
- P1.2: **PASS / CLOSED**
- P1.3: **PASS / CLOSED**
- P1.4: **PASS / CLOSED / FROZEN**
- P1.5: **PASS / CLOSED / FROZEN**
- P1.6: **PASS / CLOSED / FROZEN**
- P1.7: **PASS / CLOSED / FROZEN**
- P1.8: **PASS / CLOSED / FROZEN**
- P1.9: **PASS / CLOSED / FROZEN**
- P1.10: **ACTIVE / INTERNAL POST-CLAUDE-ROUND-1 RECHECK PASS / CLAUDE ROUND 2 PENDING**
- P1.11: **LOCKED** until P1.10 external PASS, ADR reconciliation and final checkpoint
- Product/frontend/AI code: **NOT STARTED / LOCKED**
- Phase 2/3 build: **LOCKED**
- Physical architecture/vendor selection: **NOT STARTED / LOCKED**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**

Current status:

`P1.10 Claude Round 1 FAIL on BL-P110-04 only. Product-owned AI capability/policy authorship and W-81–W-86 remediation completed. Internal post-remediation recheck PASS. Claude Round 2 pending. Do not close P1.10, accept candidate ADRs, unlock P1.11 or start implementation until external PASS and final checkpoint.`

---

# 2. Canonical next-chat handoff

Read first:

- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/audits/P1_10_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/audits/P1_10_CLAUDE_ROUND_2_HOSTILE_AUDIT_PROMPT_V0_1.md`

Then read:

- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/P1_10_INTEGRATED_NONFUNCTIONAL_AI_READINESS_CANDIDATE_V0_3.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/audits/P1_10_CLAUDE_ROUND_1_VERDICT_V0_1.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/audits/P1_10_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/audits/P1_10_INTERNAL_POST_CLAUDE_ROUND_1_RECHECK_V0_1.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/P1_10_MEASURABLE_NFR_CATALOGUE_V0_1.md`
- `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/P1_10_VALIDATION_FALSIFICATION_BUILD_GATE_PLAN_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_FROZEN_USER_EXPERIENCE_INTERACTION_MODEL_V1_0.md`
- `02_research/control/adr_log.csv`

GitHub remains canonical truth.

Do not start P1.11, product/frontend/AI code, physical architecture selection or Phase 2/3.

Do not accept ADR-0017 or ADR-0042–ADR-0048 until Claude PASS and final reconciliation.

---

# 3. Frozen beachhead and burden controls

Beachhead:

> UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.

Burden controls:

- 84 controlled scope areas;
- sole independent XL = **P07 commitment/change/valuation/commercial truth**;
- first live tender target ≤5 working days from clean inputs;
- named connector prerequisites before first live tender = 0.

A0–A3:

`authorized requirement / allocation / optional package`
`→ RFQ/tender`
`→ supplier response/revision`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

A0–A3 remains complete without:

- P07 execution;
- named ERP/CDE/email connectors;
- persistent supplier account/network;
- public API/broker;
- chat;
- AI;
- warehouse/BI platform;
- cross-tenant learned business influence.

---

# 4. Frozen P1.4–P1.9 inheritance

## Boundary and authority

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing grain;
- one authoritative source/writer per effective period;
- connector/report/workflow/AI never business authority;
- residency/governed migration;
- cross-tenant learned business influence OUT by default;
- all action through registered bounded operations.

## Commercial core

- polycentric procurement graph;
- AwardDecision ≠ Commitment;
- one Commitment core and closed CommercialEffectVector;
- exact money/FX/tax/calculation/correction;
- claim ≠ assessment ≠ certification;
- physical ≠ commercial/certified ≠ accounting-posted ≠ paid actual;
- one economic contribution once;
- P07 sole XL.

## Evidence and communication

- exact evidence/source/version/location/reliance;
- immutable issued member sets;
- issue/dispatch/delivery/read/ack/content/domain effect distinct;
- controlled redaction/retention/disposition;
- external content untrusted.

## Integration/migration/API

- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- stable invocation/logical/async/publication/transport identities;
- effect stages including EFFECT_INDETERMINATE and PARTIAL_EFFECT;
- no ordinary retry under unknown effect;
- connector authority/conformance/cutover;
- migration manifests/acceptance profiles;
- manual/file/provider-neutral fallback.

## Reporting

- metric/projection/report/snapshot identities;
- declared/evaluated/restricted population;
- subset/range/missing/unknown states;
- time/status/actual-family separation;
- quality vector/materiality/decision-use;
- restatement/current reliance;
- contribution/comparability/aggregation;
- no reporting truth writer.

## UX and interaction

- six interaction classes and no hidden command;
- exact preview/principal-bound confirmation;
- retrievable continuation anchor before transmission;
- typed outcome and four bulk modes;
- polycentric work context/no case root;
- bounded hybrid external UX/no network;
- external submission disposition/receipt;
- product-owned field/schema grammar;
- source-to-normalized bounded command;
- disclosure parity/history/current reliance;
- WCAG 2.2 AA target, mobile/Arabic/RTL;
- conventional A0–A3 complete without chat.

---

# 5. P1.9 closure

P1.9 is PASS/CLOSED/FROZEN.

Canonical:

- `P1_9_FROZEN_USER_EXPERIENCE_INTERACTION_MODEL_V1_0.md`
- `P1_9_ADR_RECONCILIATION_V1_0.md`
- `P1_9_FINAL_VERDICT.md`
- `P1_9_FINAL_CHECKPOINT_V1_0.md`

Accepted by the controlling P1.9 reconciliation:

- ADR-0016;
- ADR-0038;
- ADR-0039;
- ADR-0040;
- ADR-0041.

Canonical ADR-log synchronization remains required at the next final reconciliation update.

---

# 6. P1.10 governing thesis

> **Nonfunctional requirements are testable product contracts, and AI is an optional, replaceable proposal-and-orchestration layer over the frozen deterministic system—not a new truth, authority or dependency.**

P1.10 decides measurable operating and additive AI semantics. It does not select cloud, database, queue, observability, security or model vendors; physical topology/schema; implementation language; exact test tooling; or product code.

---

# 7. Deterministic NFR candidate

## Measurable conformance

Every NFR binds:

- identity/version;
- purpose/risk;
- C0–C3 criticality;
- service/capability/data class;
- reference workload;
- exact SLI/formula/threshold/distribution;
- population/window/inclusions/exclusions;
- measurement health;
- evidence/test;
- degradation/fallback;
- review and customer/contract mapping.

Conformance outcomes:

- TARGET_UNVERIFIED;
- VERIFIED_PASS;
- VERIFIED_PASS_LOWER_DECLARED_ENVELOPE;
- VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK;
- VERIFIED_FAIL_BLOCKED;
- ACTIVE_BREACH_REMEDIATION;
- NOT_APPLICABLE;
- RETIRED.

C0 requires verified pass. Missing telemetry never improves an SLO.

## Capacity and performance

Finite pilot and standard profiles bind tenants, sessions, projects, users, suppliers, lines, events, evidence volumes and operation rates.

Latency and processing targets use P95/P99 or exact distribution semantics. Acknowledgment, effect establishment and result availability remain distinct.

## Availability, durability and recovery

- core/external task/evidence 99.90% monthly;
- reports/search 99.50%;
- optional AI 99.00% when active;
- semantic RPO 0 for acknowledged authoritative/evidence/issued/idempotency records;
- exact DurabilityAcknowledgementProof;
- core RTO ≤4 h; evidence/reporting ≤8 h; search ≤24 h; AI may remain disabled;
- daily integrity, monthly sampled restore, quarterly end-to-end restore, annual disaster exercise.

## Reliability/degradation

- only proven pre-effect idempotent transport auto-retries;
- effect-bearing unknown never ordinary-retries;
- typed queue/dead-letter/reconciliation/idempotency/continuation;
- deterministic safety degrades after security/durability/evidence/result lookup and before optional AI.

## Security/privacy/lifecycle

- telemetry/audit/domain truth remain distinct;
- sensitive business/prompt content excluded from general telemetry;
- numeric MFA/revocation/session/encryption/secret/vulnerability/incident targets;
- zero tolerance for cross-tenant disclosure, unauthorized effect and acknowledged data loss;
- lifecycle includes backups/logs/search/prompts/outputs/embeddings/retrieval/memory/evaluation/provider copies;
- holds/redaction/tombstones survive restore;
- no localization/certification claim without evidence.

## Files/deployment

- exact file/archive/page/pixel/row/export limits;
- untrusted capture/scan/parser/proposal/accept pipeline;
- no silent truncation;
- numeric quotas and deadline-attempt preservation;
- versioned release/compatibility/rollout/rollback/conformance;
- fallback only to separately evaluated compatible provider/model profiles.

---

# 8. Product-owned AI capability grammar

Every runtime AI capability is a product-authored, versioned `AICapabilityDefinitionVersion` in the product `AICapabilityRegistry`.

Product-owned semantics include:

- capability purpose and non-use;
- output class;
- prompt/instruction set;
- source/input classes;
- context-coverage policy;
- retrieval/source-selection policy;
- registered tools/operations;
- maximum L0–L6 authority level;
- review/confirmation behavior;
- evaluation policy and thresholds;
- resource policy/default/mandatory floor;
- provider/model compatibility;
- isolation/residency/retention/training posture;
- activation/degradation/fallback/retirement;
- manual/AI-off equivalent.

No runtime capability exists outside the registry.

---

# 9. Closed tenant AI configuration boundary

Tenant may only:

- enable/disable;
- choose a registered lower authority level;
- require more review/less autonomy;
- choose among product-defined options;
- add compliant tenant-authorized sources;
- add mandatory sources/raise coverage;
- strengthen abstention/escalation;
- set stricter budgets where mandatory context/safety still fits;
- use stricter retention/no-memory;
- select separately evaluated compatible profiles;
- require manual transmission;
- provide non-authoritative terminology/examples as evidence/reference.

Tenant may not:

- create/modify capability or prompts;
- add tools/plugins/HTTP/DB/file-system/shell execution;
- raise authority or create generative L6;
- loosen coverage or remove mandatory sources;
- redefine completeness;
- loosen evaluation/threshold/strata/confidence/adversarial requirements;
- lower resource floor below mandatory context/safety;
- remove citations/review/confirmation;
- create retrieval/vector/memory/cross-tenant semantics;
- select unevaluated providers/models;
- weaken isolation/residency/retention/training posture;
- create multi-agent authority routing;
- permit self-acceptance/confirmation bypass;
- define policies through scripts, expressions, natural-language instructions or tenant files.

Prohibited configuration is rejected.

`ConfigurationMonotonicityCheck` proves the effective profile is equal to or narrower than the product definition across authority, tools, context, evaluation, review, isolation, retention and resource safety.

---

# 10. AI context, resource and proposal semantics

Each AI run binds exact capability, provider/model, prompt/instruction, tools, retrieval, principal/context, source/input/cut, output, citations, uncertainty, review/correction, accepted-operation, retention/training and resource identity.

Context coverage dispositions remain:

- CONTEXT_COMPLETE;
- CONTEXT_EVALUATED_SUBSET_KNOWN;
- CONTEXT_DETERMINISTIC_RANGE;
- CONTEXT_SEGMENTED;
- CONTEXT_ACCESS_RESTRICTED;
- CONTEXT_UNKNOWN_GAP;
- CONTEXT_BLOCKED.

“All/total/complete/none/current” requires complete underlying product proof. Citations do not substitute for coverage.

A stricter budget that cannot satisfy mandatory context, citations, safety, confirmation and audit can only queue, use a separately evaluated smaller profile, explicitly narrow task scope, return an allowed subset/range, abstain or disable AI.

Every proposal binds exact source/context cut, target/member/version set, governing versions, generation time and product freshness policy. Material change makes it stale/invalid before acceptance.

---

# 11. Agent authority

Closed levels:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare command for human confirmation;
- L5 transmit exact already-confirmed command;
- L6 non-generative deterministic system automation only.

There is no general autonomous commercial agent.

Authority is the intersection of product ceiling, principal/context authority, tool/operation exposure, access, guards, confirmation, conformance and resources.

L5 uses the exact canonical command digest confirmed by the same acting/represented principal. Semantic change invalidates confirmation.

Sub-agent/multi-agent authority is the intersection with the invoker and delegated subset, never a union. Agents cannot combine permissions, inherit broad service-account authority, create tools/capabilities, raise level or convert plan approval into command approval.

Effect-indeterminate pauses dependent/conflicting action.

V1 prohibits autonomous award, Commitment, certification, payment, external issue, grant, policy/field/metric/operation changes, deletion/hold, provider/residency change and uncertainty resolution.

---

# 12. AI evaluation and confidence

Evaluation is product-owned and binds sample, strata, diversity, confidence, reviewers/ground truth, holdout, adversarial coverage and expiry.

Defaults:

- ≥500 independent labelled units overall;
- ≥100 per critical stratum;
- ≥200 pilot outputs and ≥50 per critical stratum;
- calibration ≥500 with ≥50 positive/negative;
- double-reviewed critical truth, ≥95% agreement and agreement measure ≥0.80;
- mandatory safety scenarios plus ≥200 adversarial variants with zero observed failures;
- quarterly refresh and ≤10 business days after material incident/new attack class.

A one-sided 95% confidence lower bound must meet threshold for every statistically estimable load-bearing activation rate/proportion.

Zero-tolerance finite-suite properties remain finite-suite claims, not proof of zero real-world risk.

Only `SUFFICIENT_PASS` activates.

---

# 13. Lower envelope and validation ordering

A lower capacity/performance envelope is prospective only, cannot weaken C0 semantics and requires architecture/release authority, commercial/contract review, applicable legal/security review and respect for existing customer mechanisms/consent/notice.

Ordered gates:

1. P1.11 architecture/master-spec closure;
2. contractor/supplier evidence;
3. prototype comprehension;
4. deterministic A0–A3 thin slice;
5. P07 feasibility before P07 commitment;
6. NFR verification;
7. capability-specific AI gate;
8. controlled live pilot;
9. commercial/release decision.

Primary evidence and comprehension precede non-throwaway thin-slice build. Architecture PASS is never market/product/commercial validation.

---

# 14. Anti-second-XL boundary

No tenant-facing/product-independent:

- SLO/SLA platform;
- observability/SIEM product;
- security/GRC suite;
- lake/warehouse/analytics platform;
- model-training platform;
- prompt/capability/agent builder;
- tool/plugin marketplace;
- vector/retrieval platform;
- memory/knowledge platform;
- evaluation/annotation platform;
- multi-agent orchestration product;
- cloud-management product.

Internal engineering tools remain implementation choices only.

P07 remains sole independent XL.

---

# 15. Audit chain

Internal Round 1:

`FAIL — BL-P10-01/02/03.`

Closed by NFR conformance, evaluation sufficiency and AI context-population contracts.

Internal recheck:

`PASS — 184 scenarios.`

Claude Round 1:

`FAIL — BL-P110-04 only.`

Claude confirmed all other major P1.10 semantics, including the validation/falsification boundary.

Post-Claude remediation:

- product-owned AI capability registry;
- closed tenant narrower-only boundary;
- effective-profile monotonicity;
- mandatory resource floor;
- capability change control;
- proposal freshness;
- confidence applicability;
- lower-envelope authority;
- ordered validation gates;
- explicit anti-second-XL refusal;
- intersection-only sub-agent delegation.

Internal post-Claude recheck:

`PASS — 236 hostile scenarios; G1–G17 internal PASS.`

---

# 16. Candidate ADR posture

Still proposed pending Claude Round 2 PASS:

- ADR-0017;
- ADR-0042;
- ADR-0043;
- ADR-0044;
- ADR-0045;
- ADR-0046;
- ADR-0047;
- ADR-0048.

No accepted upstream ADR must reopen.

---

# 17. Immediate next action

Send Claude:

- `P1_10_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`;
- `P1_10_CLAUDE_ROUND_2_HOSTILE_AUDIT_PROMPT_V0_1.md`.

On FAIL:

- record the exact verdict;
- remediate narrowly;
- rerun the full hostile matrix;
- keep P1.10/P1.11/code locks.

On PASS:

- record verdict;
- close non-blocking watches;
- reconcile and accept ADR-0017/0042–0048;
- create frozen P1.10 contract, final verdict and checkpoint;
- unlock P1.11 only;
- keep product code locked until P1.11 final Phase 1 gate.
