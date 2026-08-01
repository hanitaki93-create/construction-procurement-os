# P1.11 — Claude Final Hostile Audit Round 1 Verdict v0.1

**Date:** 2026-08-01  
**Status:** EXTERNAL HOSTILE AUDIT / FAIL / ONE CONTROL BLOCKER  
**P1.11:** ACTIVE  
**Phase 1 closure / Phase 2 / product code:** LOCKED

---

## VERDICT

`FAIL — P1.11 remains open; blockers below must be remediated.`

One blocker, and it is not in the architecture — it is in the precedence rule that determines which text carries the architecture. Both required threads executed cleanly, and both optional threads resolved. But three of four executions had to descend from the packet summary to a frozen phase contract to reach the controlling answer, while the precedence structure placed the summary above the contract.

The reviewer explicitly limited certification scope because the 92-requirement register, W-14–W-91 disposition list, twenty internal executions and master-specification candidate were not included in the first packet. That limitation is directly connected to the blocker.

---

## EXECUTED THREADS

### GT-10 — communication-gated effectiveness

PASS on architecture. The branch where a provider retracts the qualifying callback after the snapshot exists but before the establishment command runs is controlled by the P1.6 frozen contract: the establishment operation consumes the frozen snapshot rather than the current observation projection. The summary packet did not state this precise branch.

### GT-13 — closed-period certified correction

PASS. Zero invention required. The original effect and report remain immutable; correction is a new signed occurrence under the registered correction algebra; recorded-period flow and current position remain distinct; posting/payment actuals remain separately authoritative; restatement and subsequent reliance remain explicit.

### GT-12 — connector effect indeterminacy

PASS. Timeout after possible effect enters `EFFECT_INDETERMINATE`; no ordinary retry or no-effect inference; uncorrelated observations remain retained/quarantined; nonconformance changes current/future eligibility only; unresolved work may close operationally without asserting no effect or permitting replay.

### GT-20 — incomplete-context AI

PASS. Product-owned registry, monotone tenant configuration, mandatory context, separately evaluated provider profiles, stale proposal invalidation, same-principal L5 digest and AI-off fallback all resolved. The complete lower-budget alternative set existed only in the P1.10 frozen contract, not the summary packet.

---

## BLOCKER

### BL-P111-04 — master-spec precedence can flatten frozen-contract detail

The master specification was ranked above phase-specific frozen contracts without a closed general-versus-specific rule. The master summary was demonstrably less specific in three load-bearing branches:

1. GT-10 — retraction between satisfaction snapshot and domain establishment;
2. GT-20 — mandatory context cannot fit a stricter tenant budget;
3. GT-12 — authentic or potentially relevant uncorrelated inbound observation retention/quarantine.

A builder could therefore treat the rank-1 summary as complete, find silence and choose a meaning. In GT-10 this could produce opposite commercial outcomes.

Required narrow remediation:

1. State that the master specification governs only on explicit direct conflict. Where it is silent, summarizing or less specific, the phase-frozen contract binds in full. The master may not narrow, generalize or omit a frozen clause except through an explicit architecture change record carrying equivalent review.
2. Mark every master-spec summary clause with a pointer to its controlling frozen contract, so it cannot be mistaken for the complete contract.
3. Run and publish a no-narrowing conformance check against all frozen phase contracts before final checkpoint.

---

## WATCHES

- **W-92:** restatement trigger threshold is a versioned operating/materiality policy, not a missing correction/history architecture decision.
- **W-93:** identify the single non-SPINE deferral by name.
- **W-94:** tenant AI sources may enter only through a product-registered source class and admission contract.
- **W-95:** every provider/model profile carries its own current `SUFFICIENT_PASS`; it never inherits another profile’s evaluation.
- **W-96:** V1/V2 evidence and prototype-comprehension gates require named independent adjudication roles and a recorded critical-misunderstanding classification rule.

Physical NFR/restore/load/isolation/accessibility/provider proof, external participant gates, legal/GCC evidence and Phase 2 physical decomposition remain non-blocking debt.

---

## GATE RESULT

- G1 PASS
- G2 PASS on independently executed threads, subject to BL-P111-04 precedence
- G3–G15 PASS
- G16 FAIL — final rank-1 master artifact was not fully available and precedence was consequential
- G17 PASS

Regression:

- P1.1–P1.10 reopen = NO
- SECOND XL = CLEAN
- A0–A3 = CLEAN

ADR posture was found coherent. ADR-0010 and ADR-0011 may remain proposed without blocking V1 architecture. No accepted ADR must reopen.

---

## READINESS

- Phase 1 architecture content: architecturally sound in all tested branches.
- Formal Phase 1 status: `ARCHITECTURE NOT COMPLETE` pending BL-P111-04.
- Phase 2: `NOT READY` pending the precedence clauses, summary marking and no-narrowing check.

The reviewer’s final closure answer was YES in exactly one place: whether a phase-frozen contract binds where the master specification is silent or less specific.