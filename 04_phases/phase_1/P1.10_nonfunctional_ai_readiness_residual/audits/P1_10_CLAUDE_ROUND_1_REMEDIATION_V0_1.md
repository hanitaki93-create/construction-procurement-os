# P1.10 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE REMEDIATION / BL-P110-04 + W-81–W-86  
**P1.10:** ACTIVE  
**P1.11 / product code:** LOCKED

---

# 1. Purpose

Close Claude blocker BL-P110-04 and absorb watches W-81–W-86 without creating:

- a tenant-authored agent or prompt platform;
- a generic AI capability builder;
- an authority/configuration bypass;
- an evaluation-policy marketplace;
- a model/vector/memory/data platform;
- a new independent XL gravity well.

This remediation controls over conflicting P1.10 candidate wording.

---

# 2. BL-P110-04 — product-owned AI capability authorship

## 2.1 Governing rule

> **Every AI capability, prompt/instruction set, output class, exposed tool, authority ceiling, context-coverage policy, evaluation policy and resource-policy semantic is product-authored, versioned and activated only through controlled architecture and conformance gates. Tenant configuration may only narrow or disable the product-defined capability; it may never create or broaden meaning, authority, context completeness, tool exposure or evaluation sufficiency.**

## 2.2 Product-owned `AICapabilityRegistry`

Every activated AI capability is a product-defined `AICapabilityDefinitionVersion` binding:

- stable `AICapabilityKey` and semantic version;
- supported deterministic business purpose;
- explicit prohibited/non-use purposes;
- closed output class;
- eligible tenant/project/role/context classes;
- exact product-owned prompt and instruction-set versions;
- exact permitted input/source classes;
- exact product-owned `AIContextCoveragePolicyVersion`;
- exact product-owned retrieval and source-selection policy;
- exact exposed registered operations/tools and read/write classification;
- maximum agent-authority level from L0–L6;
- required principal, authority, confirmation and review behavior;
- exact product-owned `EvaluationSufficiencyPolicyVersion`;
- product-owned capability-specific quality/safety thresholds;
- exact product-owned `AIResourceBudgetPolicyVersion` default and safe floor;
- provider/model compatibility profile;
- tenant-isolation, residency, retention and training posture;
- activation, degradation, fallback, suspension and retirement rules;
- human/manual/AI-off equivalent;
- evidence, incident and ADR lineage.

No runtime capability exists outside the registry.

## 2.3 Product-owned semantics

The following are product-authored and versioned only:

- capability definitions and decomposition;
- capability purpose and prohibited use;
- output class;
- system/developer prompts and instruction sets;
- model-facing task grammar;
- operation/tool exposure;
- tool argument and result semantics;
- maximum L0–L6 authority level;
- mandatory source and context-population meaning;
- coverage-completeness and abstention rules;
- evaluation metrics, thresholds, strata, confidence and safety cases;
- resource-budget dimensions, mandatory-context floor and safe over-budget behavior;
- memory classes and use;
- provider/model compatibility;
- fallback and degradation behavior.

Tenant labels, examples, preferences or business wording never redefine these semantics.

---

# 3. Closed tenant configuration boundary

Tenant configuration may only:

1. enable or disable an available product-defined capability;
2. choose an authority level **at or below** the product-defined maximum where the capability exposes a registered lower-level option;
3. require additional human review or reduce allowed autonomy;
4. choose among product-defined source scopes or output options where explicitly permitted;
5. add tenant-authorized source repositories that already satisfy the capability's source-class, access, residency and coverage rules;
6. select a stricter coverage minimum or add mandatory sources;
7. select a stricter abstention or escalation rule;
8. apply a stricter resource/cost/concurrency/time budget only when the product-defined mandatory-context and safety floor still fits;
9. apply a stricter retention or no-memory setting;
10. select among separately evaluated compatible provider/model profiles where product policy permits;
11. disable automated transmission and require manual execution;
12. provide non-authoritative tenant terminology/examples used only as scoped input evidence or approved reference data.

Tenant configuration may not:

1. create a new capability or capability variant;
2. author or modify system/developer prompts, hidden instructions or task grammar;
3. expose a new operation, tool, plugin, HTTP target, database path, file-system path or execution surface;
4. raise an authority ceiling or convert L1–L4 behavior into L5/L6;
5. make generative AI eligible for L6;
6. author or loosen an `AIContextCoveragePolicy`;
7. remove or downgrade a mandatory source/context class;
8. classify a mandatory source as optional;
9. author or loosen an `EvaluationSufficiencyPolicy`, metric, threshold, stratum, confidence rule or adversarial suite;
10. author or loosen an `AIResourceBudgetPolicy` below the mandatory-context/safety floor;
11. allow budget trimming to change `CONTEXT_COMPLETE` meaning;
12. permit uncited or unsupported load-bearing claims;
13. create tenant-defined memory, retrieval, vector or cross-tenant knowledge semantics;
14. select an unevaluated provider/model/profile;
15. change retention, residency, provider training or cross-tenant isolation to a weaker state;
16. create arbitrary routing, multi-agent delegation or authority inheritance;
17. permit proposals to self-accept or commands to bypass confirmation;
18. define tenant-authored evaluation or agent policies through scripts, expressions, natural-language instructions or configuration files.

An attempted prohibited configuration is rejected, not treated as a tenant-specific unsupported mode.

---

# 4. Capability extension and change control

A new capability, output class, prompt/instruction semantic, tool exposure, higher authority ceiling, broader source/context scope, lower review requirement, weaker abstention rule, new memory use, new provider compatibility class or materially changed resource behavior requires:

1. prospective controlled architecture-change record;
2. second-XL and authority-impact review;
3. privacy, security, tenancy, residency and evidence review;
4. deterministic-operation/tool contract review;
5. updated context-coverage and resource policies;
6. updated capability-specific evaluation and adversarial suites;
7. `SUFFICIENT_PASS` under the complete new capability version;
8. shadow and limited-pilot activation where applicable;
9. versioned release/conformance decision;
10. explicit old-version/in-flight/proposal disposition.

A tenant request cannot directly instantiate such a change. It may enter as evidence/product feedback only.

---

# 5. Policy precedence and stricter-only proof

Every runtime configuration produces `AICapabilityEffectiveProfile` as the deterministic intersection of:

- product capability definition;
- product authority ceiling;
- product context-coverage policy;
- product evaluation/conformance state;
- product resource mandatory floor;
- provider/model compatibility profile;
- current tenant enablement and stricter options;
- current principal/context authority;
- operation/field/metric/source access;
- current review/confirmation state;
- current system degradation/resource state.

The effective profile can only be equal to or narrower than the product definition.

A deterministic `ConfigurationMonotonicityCheck` must prove:

- authority is not increased;
- tool set is not expanded;
- mandatory context is not reduced;
- completeness meaning is unchanged or stricter;
- evaluation thresholds are unchanged or stricter;
- review/abstention is unchanged or stricter;
- isolation/residency/retention is unchanged or stricter;
- resource constraints do not remove mandatory context or safety controls.

Failure blocks activation.

---

# 6. Resource-budget closure

A tenant may reduce cost/time/token/concurrency limits only when the resulting profile still satisfies:

- all mandatory sources;
- minimum context coverage;
- required output/citation fields;
- security and privacy controls;
- confirmation and audit lineage;
- capability-specific evaluation envelope.

If the stricter budget cannot satisfy these:

- queue;
- use a smaller separately evaluated capability/profile;
- narrow the declared task scope explicitly;
- produce an evaluated-subset/range result where the capability/use policy permits;
- abstain;
- disable AI and use manual/deterministic fallback.

It may not silently trim mandatory context, relabel context completeness, skip citations, weaken review or switch to an unevaluated model.

---

# 7. Authority and multi-agent closure

An AI or sub-agent never receives authority merely because another AI invoked it.

Every delegated/sub-agent execution authority is the **intersection**, never union, of:

- invoker's current authority and context;
- product capability authority ceiling;
- delegated operation/tool subset;
- target/resource access;
- confirmation and continuation scope;
- current conformance/resource restrictions.

A sub-agent cannot:

- create another capability;
- expand tools or sources;
- raise L-level;
- reinterpret confirmation;
- inherit broader tenant/service-account authority;
- delegate more authority than it received;
- combine two restricted agents into a broader union;
- convert plan approval into command approval.

Multi-agent coordination is orchestration over separately identified capability runs and cannot become a new authority model.

This closes W-86.

---

# 8. AI proposal staleness — W-84

Every AI proposal binds:

- exact source/context cut;
- target/member/version set;
- relevant authority/configuration/field/metric/operation versions;
- generation time;
- product-defined `ProposalFreshnessPolicyVersion`;
- expiry and invalidation triggers.

A proposal becomes `STALE_REVIEW_REQUIRED` or `INVALIDATED` when any bound source, target, member set, authority, configuration, schema, metric, operation, recipient, value basis or effect consequence changes beyond the registered policy.

A stale proposal cannot be accepted or transmitted. The accepting command rechecks expected versions, but proposal staleness is also visible and enforced before command preparation.

---

# 9. Evaluation confidence closure — W-82

The one-sided 95% confidence lower bound must meet the declared threshold for every statistically estimable load-bearing quality metric used to activate:

- critical extraction precision and recall;
- mapping/matching precision and false-link rates;
- critical classification precision and recall;
- citation support and entailment rates;
- unsupported load-bearing claim rate;
- correct-abstention rate;
- command-preparation exact-match rate;
- any tenant/customer-facing accuracy, completion or safety metric expressed as a rate/proportion.

Zero-tolerance safety properties require zero observed failures across the mandatory deterministic/adversarial suite **and** do not become probabilistic pass claims. They are reported as finite-suite outcomes with scenario/sample coverage.

Latency, cost and resource metrics use the applicable percentile/distribution contract rather than a confidence-bound substitution.

A point estimate alone cannot activate a capability where a confidence rule applies.

---

# 10. Lower declared envelope authority — W-83

`VERIFIED_PASS_LOWER_DECLARED_ENVELOPE` is allowed only for prospective capacity/performance scope where:

- C0 semantics are unchanged;
- durability, authority, security, isolation, evidence and correction meaning are unchanged;
- the lower envelope is versioned before offer/activation;
- product architecture owner and release authority approve;
- commercial/contract owner confirms customer/offer impact;
- legal/security review occurs where contractual or regulatory commitments may be affected;
- affected existing customers are not moved to a lower contracted envelope without an applicable contract mechanism and required consent/notice;
- the interface and documentation expose the actual verified envelope;
- later achievement creates a new verified envelope rather than silently editing history.

A failed existing commitment cannot be relabelled as a lower envelope.

---

# 11. Validation-gate ordering — W-81

Mandatory sequence before product build commitment:

## Gate V0 — architecture closure

P1.11 final architecture/master-spec PASS.

## Gate V1 — primary contractor/supplier evidence

- contractor and supplier participant gates;
- outstanding FT-02, FT-06, FT-09/CR-02 and FT-10 targeted;
- beachhead terminology and friction contradictions recorded.

Must precede irreversible product-scope/build commitment.

## Gate V2 — interaction/prototype comprehension

- ≥8 internal and ≥8 external users;
- zero critical meaning misunderstandings in final round;
- task burden, secure-link/account, mobile/Arabic/RTL, revision/addendum and receipt hypotheses tested.

Must precede deterministic thin-slice build unless the build is explicitly throwaway/research-only with no architecture commitment.

## Gate V3 — deterministic A0–A3 thin slice

- zero architecture invention;
- restore/load/isolation/NFR instrumentation;
- no AI dependency.

## Gate V4 — P07 feasibility

Must pass before any P07 build or commercial-delivery commitment.

## Gate V5 — NFR verification

Applies before pilot/GA at the relevant declared envelope.

## Gate V6 — AI capability-specific validation

Only after deterministic/manual path works; each capability passes evaluation/shadow/pilot separately.

## Gate V7 — controlled live pilot

- ≥2 contractors;
- ≥3 tenders each;
- ≥10 suppliers;
- first-live-tender and supplier-completion hypotheses measured.

## Gate V8 — commercial/release decision

Architecture, build, pilot and commercial evidence remain separately reported. Failure at an earlier gate blocks dependent commitments or requires a formally declared research-only exception with no customer promise.

---

# 12. Explicit anti-second-XL boundary — W-85

P1.10 does not authorize a tenant-facing or product-independent:

- generic SLO/SLA design platform;
- observability, telemetry or SIEM product;
- cybersecurity/GRC/compliance-management suite;
- data lake, warehouse or analytics platform;
- model-training/fine-tuning platform;
- prompt/capability/agent builder;
- generic tool/plugin marketplace;
- vector database or retrieval platform exposed as a product;
- general memory/knowledge-management platform;
- evaluation/annotation/benchmark platform;
- multi-agent orchestration product;
- cloud/infrastructure-management product.

Internal engineering may use suitable physical technologies and operational practices later. Those implementation tools do not become tenant-authored semantic surfaces or independent product scope.

P07 remains the sole independent XL gravity well.

---

# 13. ADR impact

No ADR status changes occur before external PASS.

The remediation strengthens candidate decisions:

- ADR-0017 — AI additive/replaceable over deterministic substrate;
- ADR-0045 — product-owned AI capability/run/context/evaluation grammar;
- ADR-0046 — product-owned authority ceiling/tool exposure/human-confirmed command;
- ADR-0048 — ordered architecture-to-evidence/build/pilot/commercial gates.

ADR-0042, ADR-0043, ADR-0044 and ADR-0047 remain semantically unchanged and proposed pending final P1.10 reconciliation.

---

# 14. Exit tests

BL-P110-04 is closed only if:

1. no tenant can author or broaden capability meaning;
2. no tenant can author prompts/instructions/tools;
3. no tenant can raise authority or create L5/L6 eligibility;
4. no tenant can redefine complete context or mandatory sources;
5. no tenant can loosen evaluation or safety thresholds;
6. no tenant budget can silently remove mandatory context;
7. every runtime profile proves stricter-or-equal monotonicity;
8. every new capability/tool/ceiling passes architecture and evaluation gates;
9. multi-agent delegation is intersection-only;
10. no generic AI/agent/model/vector/memory/evaluation product is created.

W-81–W-86 are closed only if their local clauses survive the integrated hostile recheck.
