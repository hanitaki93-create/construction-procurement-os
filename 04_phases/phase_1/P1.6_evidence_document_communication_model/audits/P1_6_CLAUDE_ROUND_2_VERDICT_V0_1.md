# P1.6 — Claude Round 2 Verdict v0.1

**Date:** 2026-08-01  
**Stage:** P1.6 — Evidence, Document & Communication Model  
**Verdict:** FAIL / P1.6 REMAINS OPEN  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Verdict

`FAIL — P1.6 remains open; blockers below must be remediated.`

Claude found one remaining blocker. The addressee/channel quantifier remediation was accepted as complete. The remaining ambiguity concerns whether `OBSERVATION_COMPLETES_EFFECT` establishes a domain fact once or leaves effectiveness recomputable from the current evidence-observation set.

---

# 2. Blocker

## BL-P16-05 — effectiveness must be established once, never recomputed from evidence

Current wording said business effectiveness becomes true deterministically at the derived effective time.

Risk:

A later implementation could treat effectiveness as a projection over the current qualifying observations. If a provider later retracts/corrects a delivery callback, or late evidence changes the apparent first-satisfaction time, the historical domain effect could silently disappear or move.

That would let evidence state rewrite business truth and violate G3/P1.5.

Required narrow remediation:

- under `OBSERVATION_COMPLETES_EFFECT`, first satisfaction of the frozen `CommunicationSatisfactionRule` establishes one immutable owning-domain effect/event with its derived effective time;
- subsequent evidence-observation correction, retraction, invalidation or late discovery never automatically recomputes, reverses or retimes the established effect;
- any resulting change requires a bounded owning-domain correction/withdrawal/re-evaluation action with history preserved;
- no P1.6 action may emit, reverse or retime a domain/commercial effect.

---

# 3. Watches / non-blocking hardening

## W-35 — frozen-rule amendment

An issued `CommunicationSatisfactionRule` must never be amended in place. Required recipient/channel/rule change must withdraw/supersede the pre-effective basis and issue a new basis/rule/artifact.

## W-36 — never-satisfiable conditions

An unreachable required addressee may leave a pre-effective basis pending indefinitely. Timeout/auto-lapse must not be invented inside P1.6. Withdrawal/supersession/cancellation remains an owning-domain lifecycle action.

## W-37 — single qualifying observation type

Where a process requires both delivery and written acknowledgment, binding acknowledgment as the qualifying type does not itself prove delivery because communication facts remain non-implicative. The profile/evidence guard must explicitly require all supporting facts it needs.

## W-38 — per-addressee completion mode

With `PER_ADDRESSEE_INDEPENDENT`, satisfaction/effect/final-action state and time are addressee-scoped. A final discretionary command under `OBSERVATION_ENABLES_FINAL_ACTION` is likewise per addressee unless the owning domain explicitly defines another bounded aggregate action.

## W-39 — business calendar version

A business calendar used by `AFTER_GOVERNED_OFFSET` is load-bearing and must be an exact versioned configuration artifact bound to the rule, not a live runtime lookup.

---

# 4. Gate result

- G1 PASS
- G2 FAIL — BL-P16-05
- G3 PASS in stated boundary, but BL-P16-05 opens a recomputation route
- G4 PASS
- G5 PASS
- G6 PASS
- G7 PASS
- G8 PASS
- G9 PASS
- G10 PASS
- G11 PASS
- G12 PASS
- G13 PASS
- G14 PASS
- G15 PASS

---

# 5. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO, provided BL-P16-05 is closed by restoring evidence-to-domain separation
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 6. ADR impact

- ADR-0027 — ACCEPT SEMANTIC DECISION confirmed
- ADR-0028 — KEEP PROPOSED / BLOCKING pending BL-P16-05
- ADR-0006 remains P1.7-owned
- ADR-0016 remains P1.9-owned
- ADR-0017 remains P1.10-owned
- no accepted P1.4/P1.5 ADR reopens

---

# 7. Readiness

`NOT READY`

P1.6 remains ACTIVE.

P1.7+ remains LOCKED.

Product code remains LOCKED.
