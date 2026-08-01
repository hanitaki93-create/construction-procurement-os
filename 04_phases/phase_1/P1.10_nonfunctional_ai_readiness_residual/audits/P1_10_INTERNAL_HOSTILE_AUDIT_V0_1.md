# P1.10 — Internal Hostile Audit v0.1

**Date:** 2026-08-01  
**Verdict:** FAIL — three blockers  
**P1.10:** ACTIVE  
**P1.11 / product code:** LOCKED

---

# 1. Audit posture

Attack whether later physical/release/AI work must still choose load-bearing meaning despite the large measurable catalogue.

---

# 2. Blockers

## BL-P10-01 — NFR verification and activation disposition is not closed

### Failure path

The catalogue states targets and says unproven targets remain `TARGET_UNVERIFIED`, but does not define:

- closed verification/conformance outcomes;
- which NFR classes are release-blocking;
- whether an optional capability may activate with an unverified target;
- how a formally lowered release envelope interacts with target rows;
- whether a failed integrity/security target may be accepted through an error budget;
- reportable evidence and expiry.

A release team could label every target “unverified” and ship, or lower a profile after a failed test without a controlled impact decision.

### Required remediation

Create versioned `NFRVerificationProfile` and `NFRConformanceAssessment`, closed outcomes, criticality classes and release/activation rules. Zero-tolerance integrity/security NFRs must block. Capacity/performance may activate only against a proven lower declared envelope through explicit versioned scope. Optional AI may remain disabled rather than weaken core requirements.

---

## BL-P10-02 — AI evaluation statistical sufficiency is not closed

### Failure path

Precision/recall/calibration thresholds exist but no minimum sample, critical stratum coverage, confidence bound, reviewer agreement or rare-event/adversarial sufficiency rule exists.

A capability could achieve 100% extraction precision on one document, zero prompt-injection success on one attack or acceptable calibration on ten examples and activate compliantly.

### Required remediation

Create capability-specific `EvaluationSufficiencyPolicy` binding minimum independent samples, per-stratum samples, confidence/uncertainty, reviewer agreement, known-adversarial coverage, holdout protection and insufficient-evidence outcome. Threshold pass without sufficiency must remain unverified/blocked.

---

## BL-P10-03 — AI context completeness and truncation use is not closed

### Failure path

`InputContextManifest` records truncation and omissions, but the capability does not declare the eligible context population, mandatory source classes, evaluated versus omitted members or the consequence for the output/use.

A query asking “summarize all supplier exclusions” can retrieve only the first/most similar records and still return a fluent cited answer. Each cited claim may be correct while the total meaning is understated—recreating P1.8’s partial-population defect inside AI.

### Required remediation

Create versioned `AIContextCoveragePolicy` and `AIContextCoverageAssessment` with declared eligible context, required sources, evaluated/omitted/unknown populations, access-restricted treatment, retrieval/truncation rule and closed output dispositions: complete, evaluated subset, bounded range, segmented, abstained or blocked. AI cannot claim all/complete/current from partial context.

---

# 3. Watches

## W-72 — SLI collection loss

A collector/telemetry outage could remove failed requests from the availability denominator. Require measurement health/coverage and unknown measurement state; unknown cannot improve SLO.

## W-73 — RPO-0 proof

Define acceptable `DurabilityAcknowledgementProof` and verify that acknowledged evidence payload plus identity—not metadata alone—crossed the durable boundary.

## W-74 — AI resource budget

AI capability mentions budget but no required numeric `AIResourceBudgetPolicy` before activation. Add request/context/output/time/cost/storage/concurrency limits and hard behavior.

## W-75 — Retention default

Seven-year default must remain a configurable product default, never legal advice or universal minimum. Activation needs tenant/category policy and unsupported-jurisdiction disclosure.

## W-76 — Evaluation ground truth disagreement

Define reviewer qualification, independent double review for critical sets and disagreement/adjudication state.

## W-77 — Adversarial suite evolution

Known attack success of zero can become stale. Bind suite/version, minimum attack families, refresh cadence and incident-to-regression path.

## W-78 — Exact L5 command binding

Add command serialization/canonical digest binding to confirmation so “exact” cannot vary through reserialization/default insertion.

## W-79 — Automatic provider fallback

Prohibit automatic fallback to an unevaluated model/provider/version. Fallback is disabled/abstention or a separately evaluated compatible profile.

## W-80 — NFR breach and contractual disclosure

Define customer/contract impact assessment when a target is weakened or repeatedly breached; an internal version change cannot silently lower external commitments.

---

# 4. Gate result

- G1 measurable NFR definition — FAIL via BL-P10-01;
- G2 finite workload — PASS;
- G3 timing/availability/durability distinctions — PASS;
- G4 degradation/effect safety — PASS;
- G5 observability authority/privacy — PASS subject W-72;
- G6 security/privacy/residency/lifecycle — PASS subject W-73/W-75;
- G7 files/import/export/rates — PASS;
- G8 deployment/conformance — FAIL via BL-P10-01;
- G9 AI identity/provenance — PASS;
- G10 no AI semantic/authority creation — PASS;
- G11 agent ladder — PASS subject W-78;
- G12 evaluation/abstention — FAIL via BL-P10-02;
- G13 AI isolation/context — FAIL via BL-P10-03;
- G14 AI-off/provider replacement — PASS subject W-79;
- G15 validation debt — PASS;
- G16 one XL/product lock — PASS;
- G17 audit — FAIL pending remediation.

---

# 5. Regression

No upstream phase must reopen. The blockers are P1.10 residual semantics. P07 remains sole XL. A0–A3 remains clean. Product code remains locked.
