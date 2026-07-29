# P1.2 Sourcing Critique Attempt 01 — No Verdict

**Date:** 2026-07-29  
**External reviewer outcome:** REVIEW NOT EXECUTED / NO VERDICT  
**Reason:** reviewer had no repository access and the v0.1 prompt supplied only repository paths, not the actual P01–P06 content.

## 1. Outcome classification

This is **not a FAIL** of the sourcing subgraph. The external reviewer explicitly declined to invent blockers without the artifacts.

The attempt is classified:

`NO_VERDICT — REVIEW_INPUT_UNAVAILABLE`

P07 remains blocked because the required hostile review has not actually occurred.

## 2. Useful reviewer challenge retained

The reviewer raised a sequencing/anchoring risk from the prompt itself:

> If P01–P06 are treated as a provisional design that primary evidence later validates, the project could recreate the ontology-first anchoring problem that P1.0 controls were designed to prevent.

This is a legitimate control concern even though it was not a completed architecture review.

## 3. Repo verification against the challenge

The reviewer stated ADR-0003 was `PRIMARY_REQUIRED`. Current canonical evidence coverage does **not** say that.

- ADR-0003 Procurement structural root: `P1_0_SUFFICIENT`, with primary package-led/requisition-led evidence still required for later resolution.
- ADR-0004 PO/Subcontract type model: `P1_0_SUFFICIENT`, with primary lifecycle/financial variants still required.
- Both ADRs remain `PROPOSED / PENDING` in the ADR log; neither is accepted.

Therefore the reviewer was correct about the **risk of practical anchoring**, but incorrect if interpreted as saying ADR-0003 is formally already classified `PRIMARY_REQUIRED`.

## 4. Remediation applied before re-review

Created binding control:

`P1_2_SOURCING_HYPOTHESIS_FRAMING_CONTROL_V0_1.md`

It establishes that:
- P01–P06 are falsifiable candidate decompositions, not accepted ontology;
- first-classness of candidate objects is explicitly undecided;
- candidate concepts may collapse into events/value objects/projections/relationships or disappear;
- ADR-0003 and ADR-0004 remain open;
- primary cases must be captured blind to candidate object/state names;
- unmatched/contradictory observations are recorded before normalization and take priority over preserving the candidate model;
- P01–P06 cannot close open ADRs or satisfy independent primary evidence gates.

## 5. Transport failure remediation

Created `P1_2_SOURCING_HOSTILE_CRITIQUE_PROMPT_V0_2.md` with an explicit rule that the external reviewer must be given a self-contained review packet and must not be assumed to have repository access.

A portable packet was prepared for the external reviewer containing:
- binding hypothesis framing;
- P01–P06 object/concept inventory;
- truth-ownership table;
- state/transition summary;
- integrated checkpoint/invariants/edge threads;
- internal attack points;
- detailed P06 award seam;
- burden guardrails;
- primary-audit requirements;
- revised hostile-review instructions including an ADR-0003/0004 anchoring check.

## 6. Current decision

**No sourcing PASS has been granted.**

The correct next action is to rerun the hostile critique using the portable review packet and v0.2 prompt.

P07 remains blocked until that review returns PASS or identified blockers are remediated and rechecked.
