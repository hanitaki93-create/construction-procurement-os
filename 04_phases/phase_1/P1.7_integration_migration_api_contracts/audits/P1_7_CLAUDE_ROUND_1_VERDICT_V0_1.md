# P1.7 — Claude Round 1 Verdict v0.1

**Date:** 2026-08-01  
**Stage:** P1.7 — Integration, Migration & API Contracts  
**Verdict:** FAIL / P1.7 REMAINS OPEN  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Verdict

`FAIL — P1.7 remains open; blockers below must be remediated.`

Claude found one remaining blocker. The authority model, closed operation classes, publication immutability, migration truth, email seam, agent seam and V1 implementation floor otherwise passed.

---

# 2. Blocker

## BL-P17-05 — closed effect-stage taxonomy lacks an indeterminate stage

Current effect stages are all definite:

- PRE_ACCEPTANCE;
- ACCEPTED_PRE_EFFECT;
- EXTERNAL_EFFECT_EMITTED;
- DOMAIN_EFFECT_ESTABLISHED;
- TERMINAL_NO_EFFECT;
- PARTIAL_EFFECT.

But the idempotency contract states that a timeout means outcome unknown until resolved.

A timed-out or ambiguously correlated external call may already have produced an external effect. Recording it as `ACCEPTED_PRE_EFFECT` would permit pre-effect-only cutover dispositions such as `REBIND_TECHNICALLY_COMPATIBLE` or `CANCEL_OR_SUPERSEDE_PRE_EFFECT`, causing duplicate external effects when retried/reissued.

Required narrow remediation:

- add `EFFECT_INDETERMINATE` for an effect that may exist but is neither positively confirmed nor positively disproven;
- enter it after ambiguous timeout/result/correlation loss or another unresolved effect-bearing call;
- exit only through bounded retrieval/reconciliation that confirms or disproves effect;
- while indeterminate, prohibit `REBIND_TECHNICALLY_COMPATIBLE`, `CANCEL_OR_SUPERSEDE_PRE_EFFECT`, unsafe resend/reissue and conflicting new operations;
- allow only `RECONCILE_EXTERNAL_EFFECT`, `MANUAL_RECONCILIATION` or `BLOCKED_RECONCILIATION_REQUIRED` until resolved;
- preserve item-level indeterminacy for partial/bulk operations.

---

# 3. Watches / non-blocking hardening

## W-43 — uncorrelated inbound observations

An authentic inbound callback/observation arriving before local request visibility or without a current correlation must be retained and quarantined for later correlation, not discarded.

## W-44 — SYSTEM_BOUNDED wording

Remove the qualifier “arbitrary”. `SYSTEM_BOUNDED` cannot originate or satisfy award, approval, Commitment, change, certification or payment authority. It may perform only explicitly registered non-discretionary system operations or mechanical consequences of already-authorized facts.

## W-45 — untrusted-content scope

Treat every inbound external payload as untrusted data, including ExternalObservation payloads, imported files/rows, connector responses and inbound IntegrationEvent content—not only supplier documents/emails.

## W-46 — PublicationIntent destination

For target-specific publications, exact destination/profile must always be bound. For target-independent broadcast, the deterministic distribution/subscriber profile version must be bound. A target/destination/profile change requires a new PublicationIntent/logical operation and can never occur on retry.

## W-47 — email adapter conformance floor

Define the minimum activation modes and behaviors required for the selected V1 email adapter to be called conforming.

## W-48 — later connector conformance failure and historical RelianceBindings

If a provider later changes historical-version semantics and fails conformance, existing historical RelianceBindings remain immutable. Record evidence-deficiency/conformance variance against affected bindings; never silently invalidate, rebind or rewrite them.

---

# 4. Gate result

- G1 PASS
- G2 PASS
- G3 PASS
- G4 PASS
- G5 PASS
- G6 PASS
- G7 PASS
- G8 PASS
- G9 FAIL — BL-P17-05
- G10 PASS
- G11 PASS
- G12 PASS
- G13 PASS
- G14 PASS
- G15 PASS
- G16 PASS as packet quality, but closure still requires blocker remediation and external recheck

---

# 5. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

The blocker concerns duplicate external effect risk only; it does not reopen product-domain truth.

---

# 6. ADR impact

Claude classifications:

- ADR-0006 — ACCEPT SEMANTIC DECISION
- ADR-0029 — ACCEPT SEMANTIC DECISION
- ADR-0030 — ACCEPT SEMANTIC DECISION
- ADR-0031 — KEEP PROPOSED / BLOCKING pending BL-P17-05
- ADR-0032 — ACCEPT SEMANTIC DECISION
- ADR-0016 remains P1.9-owned
- ADR-0017 remains P1.10-owned
- no accepted upstream ADR reopens

---

# 7. Readiness

`NOT READY`

P1.7 remains ACTIVE.

P1.8+ remains LOCKED.

Product code remains LOCKED.
