# P1.10 — Internal Audit Remediation v0.1

**Date:** 2026-08-01  
**Status:** BLOCKER/WATCH REMEDIATION  
**P1.10:** ACTIVE  
**P1.11 / product code:** LOCKED

---

# 1. BL-P10-01 — NFR verification and activation closure

## 1.1 `NFRCriticalityClass`

Every NFR is exactly:

- `C0_INTEGRITY_SECURITY_AUTHORITY_DURABILITY`;
- `C1_CORE_SERVICE_OR_CUSTOMER_COMMITMENT`;
- `C2_SUPPORTING_OR_DEGRADABLE_CAPABILITY`;
- `C3_OPTIONAL_CAPABILITY`.

Examples:

- cross-tenant isolation, unauthorized effect, acknowledged authoritative durability, hidden truncation and unsafe retry are C0;
- core availability/latency/RTO and external submission are C1;
- search/report/export/optional connector may be C2 where fallback exists;
- AI is C3 unless a later contract explicitly promotes a narrow capability, while deterministic fallback remains mandatory.

## 1.2 `NFRVerificationProfile`

Binds:

- release/deployment/capability versions;
- environment/topology class;
- declared workload/capacity envelope;
- NFR catalogue/version;
- exact test suites and measurement definitions;
- dependency/failure conditions;
- evidence artifacts;
- tester/reviewer/approval;
- execution period;
- evidence expiry/retest triggers;
- customer/contract mapping.

## 1.3 `NFRConformanceAssessment`

Closed outcomes:

- `TARGET_UNVERIFIED`;
- `VERIFIED_PASS`;
- `VERIFIED_PASS_LOWER_DECLARED_ENVELOPE`;
- `VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK`;
- `VERIFIED_FAIL_BLOCKED`;
- `ACTIVE_BREACH_REMEDIATION`;
- `NOT_APPLICABLE`;
- `RETIRED`.

Every assessment binds measured result/distribution, coverage/measurement health, workload, evidence, limitations, expiry, allowed activation and required action.

## 1.4 Activation rules

- C0 requires `VERIFIED_PASS`; no waiver, error budget or lower envelope may permit a semantic integrity/security violation.
- C1 requires `VERIFIED_PASS` for the declared release envelope. Capacity/performance may use `VERIFIED_PASS_LOWER_DECLARED_ENVELOPE` only through a prospective versioned envelope reduction, customer/contract impact review and truthful published limit. Durability/authority meaning cannot be lowered.
- C2 requires pass or `VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK`; limitation and fallback are customer/operation visible.
- C3 remains disabled until `VERIFIED_PASS` for its activation profile. Failure/insufficient evidence disables rather than weakening deterministic work.
- `TARGET_UNVERIFIED` blocks GA activation for C0/C1 and blocks optional capability activation for C3.
- a pilot may operate under an explicit pilot profile with bounded users/data/effects and separate disclosures, but C0 still requires pass.
- repeated/active breach cannot be hidden through target redefinition; it creates remediation, rollout freeze, lower prospective envelope or capability disablement.

## 1.5 Measurement health — W-72

Every SLI execution carries:

- `MEASUREMENT_COMPLETE`;
- `MEASUREMENT_PARTIAL_KNOWN`;
- `MEASUREMENT_PARTIAL_UNKNOWN`;
- `MEASUREMENT_UNAVAILABLE`.

Collector/telemetry gaps cannot improve SLO. Partial/unknown measurement either counts conservatively as failure under policy or blocks the SLO claim; exact missing interval/request population is disclosed. C0 event-detection loss is a security incident.

---

# 2. BL-P10-02 — Evaluation sufficiency closure

## 2.1 `EvaluationSufficiencyPolicy`

Every capability/metric/version binds:

- minimum independent sample overall;
- critical strata and minimum per stratum;
- evaluation time/source/domain/template/language/category diversity;
- target prevalence and negative/abstention cases;
- confidence-bound or exact-enumeration method;
- reviewer qualifications and ground-truth process;
- agreement/adjudication threshold;
- holdout protection and adaptive-reuse rule;
- mandatory adversarial families/scenarios;
- insufficient-evidence disposition;
- expiry/re-evaluation triggers.

## 2.2 Default minimums

For quality activation beyond shadow:

- ≥500 independently sampled labelled units overall per capability version;
- ≥100 units per critical stratum, or all available cases plus an explicit insufficient-evidence limitation when population is genuinely smaller;
- ≥200 reviewed production-like outputs in pilot before broader activation;
- ≥50 pilot outputs per critical stratum;
- point threshold alone is insufficient: the one-sided 95% confidence lower bound must meet the required minimum for precision/recall/support metrics where statistical inference is applicable;
- calibration metrics require ≥500 scored cases with outcome prevalence sufficient for at least 50 positive and 50 negative cases, otherwise `INSUFFICIENT_EVIDENCE`;
- zero-tolerance safety tests require all registered mandatory scenarios plus ≥200 adversarial variants across prompt injection, tool misuse, authority, confirmation, cross-tenant, source fabrication and effect-uncertainty families, with zero failures;
- passing a finite zero-failure suite means the suite passed, not that real-world risk is zero.

Capability-specific policy may require more, never silently less.

## 2.3 Ground truth — W-76

Critical evaluation items require:

- two independent qualified reviewers;
- ≥95% raw agreement and Cohen’s kappa/appropriate agreement measure ≥0.80 where applicable;
- disagreements adjudicated by a named third qualified reviewer;
- ambiguous/unresolvable items labelled and excluded from ordinary correctness denominator but included in abstention/ambiguity tests;
- reviewer/version/evidence retained.

Non-critical high-volume labels may use sampled double review under policy.

## 2.4 Adversarial evolution — W-77

- adversarial suite identity/version is mandatory;
- minimum families include direct/indirect prompt injection, encoded/hidden instructions, tool-output injection, sensitive-data exfiltration, excessive agency, confirmation bypass, identity/context confusion, cross-tenant retrieval, stale/source substitution, file/image/spreadsheet/email attacks and indeterminate-effect manipulation;
- refresh at least quarterly while active and within 10 business days of a material incident/new relevant attack class;
- every material incident becomes a regression case under authorized isolation;
- stale adversarial evidence expires capability conformance.

## 2.5 Sufficiency outcome

- `SUFFICIENT_PASS`;
- `SUFFICIENT_FAIL`;
- `INSUFFICIENT_SAMPLE`;
- `INSUFFICIENT_STRATUM_COVERAGE`;
- `GROUND_TRUTH_UNRELIABLE`;
- `HOLDOUT_COMPROMISED`;
- `ADVERSARIAL_COVERAGE_EXPIRED`.

Only `SUFFICIENT_PASS` supports activation. All others remain shadow/disabled or require an explicitly narrower evaluated capability scope.

---

# 3. BL-P10-03 — AI context completeness closure

## 3.1 `AIContextCoveragePolicy`

Every capability/output/use binds:

- declared eligible context population/source classes;
- mandatory sources/evidence/versions;
- exact scope/time/source cut;
- access-restricted population treatment;
- retrieval/index/query/pagination rules;
- deterministic ranking/truncation budgets;
- minimum coverage/completeness;
- duplicate/superseded/correction treatment;
- unknown-gap detection;
- permitted subset/range/segmented behavior;
- output/use consequences;
- required disclosure and citations.

## 3.2 `AIContextCoverageAssessment`

Binds:

- eligible population known/unknown;
- evaluated/retrieved members;
- omitted known members and reasons;
- unknown gaps;
- restricted/suppressed members;
- stale/incompatible sources;
- token/file/tool truncation;
- coverage counts/value exposure;
- context/source-cut identity;
- one disposition.

Closed dispositions:

- `CONTEXT_COMPLETE`;
- `CONTEXT_EVALUATED_SUBSET_KNOWN`;
- `CONTEXT_DETERMINISTIC_RANGE`;
- `CONTEXT_SEGMENTED`;
- `CONTEXT_ACCESS_RESTRICTED`;
- `CONTEXT_UNKNOWN_GAP`;
- `CONTEXT_BLOCKED`.

## 3.3 Output rules

- “all,” “total,” “complete,” “none,” “current” or equivalent requires `CONTEXT_COMPLETE` and the underlying product population/time/access proof.
- known subset may produce an explicitly labelled evaluated-subset summary only for informational/operational/management use and never be retitled as full result.
- deterministic ranges follow P1.8 range semantics; no midpoint.
- restricted context does not imply absence and cannot be inferred through subtraction.
- unknown gap, missing mandatory source or unsafe truncation requires abstention/block for load-bearing use.
- query answer citations do not substitute for context completeness.
- AI output carries the same disclosure parity through chat/export/report/proposal.

## 3.4 Selection/truncation

- mandatory sources are reserved before optional context;
- no silent first-page/top-k completeness assumption;
- token/context budget exhaustion returns explicit omitted population and disposition;
- summarization/compression is itself versioned derived context with source links and cannot remove required contradictions/limitations;
- access filtering occurs before retrieval/model exposure.

---

# 4. Watch closures

## W-73 — `DurabilityAcknowledgementProof`

Every D0 acknowledgement binds one proof class:

- `TRANSACTIONAL_DURABLE_COMMIT_CONFIRMED`;
- `DURABLE_OBJECT_AND_METADATA_COMMIT_CONFIRMED`;
- `REPLICATED_APPEND_OR_JOURNAL_COMMIT_CONFIRMED`;
- `EXTERNAL_AUTHORITATIVE_ACK_WITH_LOCAL_INTENT_POSITION` where the external system owns truth and P1.7 effect semantics apply.

For product-custodied evidence, identity/metadata and exact payload/content integrity must both cross the declared durable boundary before accepted-capture success. A temporary upload/cache/object pointer alone is insufficient.

Proof is tested through failure injection/restore. Missing proof blocks D0 success.

## W-74 — `AIResourceBudgetPolicy`

Before activation every AI capability binds numeric:

- max input files/bytes/tokens/items;
- max retrieved sources/chunks;
- max output tokens/items;
- timeout and safe generation retries;
- concurrent runs per tenant/platform;
- per-run and monthly cost budget;
- cache/memory/evaluation storage;
- over-budget disposition: trim only optional context under coverage policy, queue, abstain or disable.

No hidden truncation, cross-tenant cache or review reduction.

## W-75 — retention default

Seven years is a product default candidate, not legal advice/minimum. Production activation requires a tenant/data-category `RetentionPolicyVersion`; unsupported jurisdiction/contract cases are disclosed and block any claim of compliance. Policy may be shorter/longer where authority permits while frozen commercial/evidence integrity remains.

## W-78 — canonical L5 command digest

Human confirmation binds a canonical serialized command representation/digest covering OperationKey/version, principal/represented principal, context, target/member set, values, recipients, evidence/config/source versions, idempotency and continuation identity. L5 transmits bytes/semantic representation matching the digest. Any default insertion/reordering with semantic effect invalidates confirmation.

## W-79 — provider fallback

Automatic fallback is permitted only to a separately evaluated, currently conforming provider/model profile declared compatible for the exact capability and output schema. Otherwise fallback is abstention/disabled/manual. No unannounced “best available model.”

## W-80 — target breach/weakening

Weakening a customer-facing target or repeated breach requires:

- exact affected contracts/tenants/capabilities;
- customer/legal/commercial impact assessment;
- prospective version/effective date;
- required notification/consent under contract;
- limitation/fallback;
- no retroactive relabelling of prior performance;
- executive/product/security approval according to criticality.

---

# 5. Result

BL-P10-01, BL-P10-02 and BL-P10-03 are remediated in candidate form. W-72–W-80 are closed in candidate form. Full integrated recheck remains required.
