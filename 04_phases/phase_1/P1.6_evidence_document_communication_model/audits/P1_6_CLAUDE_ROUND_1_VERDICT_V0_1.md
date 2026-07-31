# P1.6 — Claude Hostile Audit Round 1 Verdict v0.1

**Date:** 2026-07-31  
**Verdict:** FAIL — P1.6 remains open  
**Blockers:** 1  
**P1.7 readiness:** NOT READY

---

## VERDICT

`FAIL — P1.6 remains open; blockers below must be remediated.`

Claude found the evidence-identity half strong and could not find a compliant route to losing the historical basis. The remaining defect is in communication-gated effectiveness.

---

## BLOCKER

### BL-P16-04 — Pattern B qualifying observation lacks addressee/channel quantification

Pattern B states that the domain profile declares the qualifying observation type (issue, dispatch, delivery, acknowledgment, content response), but not the scope of that observation across intended addressees/channels.

Example: a tender addendum is sent to eight bidders by email + portal, one email hard-bounces. Plausible readings produce different business outcomes:

- per addressee — seven effective, one not;
- all addressees/global — one bounce blocks the extension for all;
- any channel per addressee — portal delivery may satisfy the bounced bidder.

The same issue exists for multi-party notices such as contractor + guarantor or JV partners.

Narrow remediation requested:

Require the domain profile to declare the qualifying-observation quantification, bounded to:

- `ALL_ADDRESSEES`;
- `ANY_ADDRESSEE`;
- `PER_ADDRESSEE_INDEPENDENT`;
- `PER_ADDRESSEE_ANY_CHANNEL`.

Where effectiveness is independent per addressee, record effectiveness per addressee rather than silently treating it as one global event.

---

## WATCHES / NON-BLOCKING DEBT

### W-30 — ReconstructionAnchorTest mandatory properties

Exact immutable/historically addressable version identity and proof that it is not an alias to current content are the essence of the test. They should be mandatory rather than hidden under `as applicable`.

### W-31 — deemed service / governed offsets

Pattern B should support a governed offset from a qualifying communication observation, e.g. effective a defined period after dispatch under the governing rule, without inventing a third pattern.

### W-32 — qualifying observation occurs but later effectiveness command sees changed current invariant

If the governing rule made the action effective at dispatch/delivery, a later retry must not falsify history merely because current authority/security state changed after the qualifying observation. The architecture must separate deterministic recognition of an already-effective fact from a new discretionary action.

### W-33 — message body evidence identity

A load-bearing MessageEnvelope body must itself resolve to exact EvidenceVersion identity so a supplier price/term stated only in email body can be bound by RelianceBinding.

### W-34 — passing external anchor plus optional local capture

Even when an external anchor passes ReconstructionAnchorTest, whether the OS additionally captures an immutable local copy should be a governed policy choice with an explicit default rather than an accidental implementation decision.

---

## GATE CHECK

- G1 exact source reconstruction — PASS
- G2 external communication capture/effectiveness — FAIL (BL-P16-04)
- G3 evidence/message not business writer — PASS
- G4 revision/issue/supersession immutability — PASS
- G5 external-reference reconstruction — PASS with W-30
- G6 communication-fact separation — PASS
- G7 retention/redaction/disposition — PASS
- G8 AI/source/derived provenance — PASS
- G9 multi-channel/duplicate semantics — PASS
- G10 hash/content/business identity — PASS
- G11 source attribution/physical capture — PASS
- G12 one-XL / anti-CDE/email/records/legal/trust-service gravity — PASS
- G13 A0–A3 minimal activation — PASS
- G14 upstream regression / P07 sole XL — PASS
- G15 product-code lock — PASS

---

## REGRESSION CHECK

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

## ADR IMPACT

### ADR-0027

`ACCEPT SEMANTIC DECISION`

Evidence identity/version/content-integrity/reconstruction-anchor model survived hostile review.

### ADR-0028

`KEEP PROPOSED — BLOCKING`

All elements except the Pattern B addressee/channel quantifier are accepted in substance.

Later-owned confirmed:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

No accepted P1.4/P1.5 ADR needs reopening.

---

## P1.7 READINESS

`NOT READY`

One narrow semantic clause remains before readiness: the qualifying-observation quantifier for communication-gated effectiveness.
