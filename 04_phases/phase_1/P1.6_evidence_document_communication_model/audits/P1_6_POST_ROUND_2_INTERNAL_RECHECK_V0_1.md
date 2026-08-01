# P1.6 — Post-Claude-Round-2 Internal Recheck v0.1

**Date:** 2026-08-01  
**Audit target:** candidate v0.4 + Round-2 remediation + established-effect hardening  
**Verdict:** PASS / CLAUDE ROUND 3 READY  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Scope

Recheck:

- BL-P16-05 established-once domain effect;
- W-35 rule amendment;
- W-36 never-satisfied rules;
- W-37 multiple required communication facts;
- W-38 per-addressee completion granularity;
- W-39 business-calendar version binding;
- asynchronous crash/retry and evidence correction timing;
- all G1–G15 gates;
- upstream regression / second XL / A0–A3.

---

# 2. BL-P16-05 recheck

## Scenario A — callback retracted after domain persistence

Instruction uses:

- ALL_REQUIRED_ADDRESSEES;
- ANY_ALLOWED_CHANNEL;
- DELIVERY_RECEIPT;
- OBSERVATION_COMPLETES_EFFECT.

At Tuesday 14:00 the frozen rule is first accepted as satisfied and a CommunicationSatisfactionSnapshot is frozen.

The owning-domain instruction event is established at Tuesday 14:00.

Thursday, provider retracts one delivery callback.

Result:

- retraction is new corrective evidence;
- original snapshot remains immutable historical evidence of what the process accepted;
- instruction event remains established;
- no automatic recomputation, reversal or re-timing;
- owning-domain variance/correction/withdrawal action is required if consequence must change.

PASS.

## Scenario B — callback retracted after snapshot but before domain persistence

At T, snapshot is frozen.

Crash prevents immediate domain-event persistence.

Before retry, provider retracts one callback.

Result:

- establishment operation consumes frozen snapshot, not current evidence projection;
- event is idempotently recorded with historical effective time derived from T;
- retraction is visible as contradictory evidence/variance;
- domain correction path remains explicit.

PASS.

## Scenario C — late earlier observation

Event established at 14:00.

Later log shows satisfaction may have existed at 13:45.

Result:

- late evidence is preserved;
- event time does not move automatically;
- explicit owning-domain correction may assert corrected time if supported;
- original and corrected histories remain.

PASS.

## Scenario D — observation invalid before satisfaction evaluation

Provider sends a provisional/non-terminal callback that does not meet bound admissibility criteria.

Result:

- callback cannot enter the satisfaction snapshot;
- no effect establishment occurs;
- later terminal callback can qualify.

PASS.

## Scenario E — duplicate/concurrent callbacks

Email and portal callbacks satisfy at nearly the same time.

Result:

- stable logical establishment identity;
- one snapshot/event;
- rule-defined earliest/latest time is atomically bound;
- no duplicate effect.

PASS.

**BL-P16-05 CLOSED.**

---

# 3. W-35 recheck — rule amendment

A required bidder in an issued addendum becomes ineligible/dissolved.

Result:

- issued rule/addressee set remains immutable;
- no in-place deletion;
- owning domain withdraws/supersedes/reissues if permitted;
- old issue/attempt/evidence history remains.

PASS.

---

# 4. W-36 recheck — never-satisfied rule

Contractor and guarantor both required. Guarantor unreachable indefinitely.

Result:

- basis remains pre-effective/pending;
- P1.6 shows failure/aging/unresolved status;
- no P1.6 auto-timeout, auto-lapse, alternate-channel inference or quantifier change;
- owning domain performs any withdrawal/expiry/reissue action.

PASS.

---

# 5. W-37 recheck — terminal observation plus prerequisites

Rule requires delivery and written acknowledgment.

Acknowledgment message arrives, but no delivery proof exists.

Result:

- acknowledgment is terminal observation only;
- explicit prerequisite DELIVERY_RECEIPT remains unsatisfied;
- no implication from acknowledgment to delivery;
- rule does not satisfy.

PASS.

---

# 6. W-38 recheck — per-addressee granularity

Three JV partners use:

`PER_ADDRESSEE_INDEPENDENT + OBSERVATION_ENABLES_FINAL_ACTION`.

Only Partner A satisfies.

Result:

- only Partner A action is enabled;
- Partners B/C remain pending;
- no global command inferred;
- aggregate some/all status remains projection.

PASS.

With `OBSERVATION_COMPLETES_EFFECT`, each addressee establishes a separate scoped event/time.

PASS.

---

# 7. W-39 recheck — calendar version

Rule = deemed served two business days after dispatch using Calendar V3 / Dubai timezone / bound cutoff.

Calendar V4 later adds a holiday.

Result:

- issued pending rule continues using V3;
- established effective time remains under V3;
- V4 cannot silently alter it;
- changing governing calendar requires withdrawal/supersession/reissue before establishment where allowed.

PASS.

---

# 8. Additional hostile checks

## H01 — evidence action attempts reversal

Provider observation is corrected through P1.6 action.

Result:

- P1.6 records correction only;
- cannot reverse/retime owning-domain event;
- prohibited by action boundary.

PASS.

## H02 — AI agent reacts to retraction

Agent detects callback retraction and proposes instruction withdrawal.

Result:

- agent cannot directly reverse event;
- it may invoke/propose bounded owning-domain correction subject to P1.10/P1.7 authority later;
- evidence history remains.

PASS.

## H03 — satisfaction snapshot was created using wrong rule version

Audit discovers Rule V2 should have applied instead of V1.

Result:

- original snapshot/event remains historical claim;
- governed evidence/domain correction records wrong binding and corrected disposition;
- no silent rebinding/recalculation.

PASS.

## H04 — addressee correction before issue

Wrong recipient discovered before issue/communication begins.

Result:

- pre-effective draft basis/rule may be revised under owning-domain draft semantics;
- once issue begins, R11 immutability applies.

PASS.

## H05 — observed fact satisfies after governed offset but source later retracts before offset expires

Dispatch at Monday 10:00; deemed service is +2 business days.

Provider retracts dispatch Tuesday before Wednesday effective time.

Under the frozen rule, first accepted satisfaction snapshot was Monday and completion mode says observation completes effect after offset.

Result:

- scheduled owning-domain establishment remains causally bound to snapshot/effective time Wednesday unless explicit owning-domain intervention/correction withdraws/supersedes before/after effect according to supported lifecycle;
- P1.6 retraction alone cannot cancel the scheduled domain effect;
- owning domain may act on the variance if its lifecycle permits cancellation before effectiveness.

PASS; business consequence remains owning-domain controlled.

---

# 9. Gate check

- G1 exact source reconstruction — PASS
- G2 external communication capture/effectiveness — PASS
- G3 evidence/message not business writer — PASS
- G4 revision/issue/supersession immutability — PASS
- G5 external-reference reconstruction — PASS
- G6 communication-fact separation — PASS
- G7 retention/redaction/disposition — PASS
- G8 AI/source/derived provenance — PASS
- G9 multi-channel/duplicate semantics — PASS
- G10 hash/content/business identity — PASS
- G11 source attribution/physical capture — PASS
- G12 one-XL / anti-CDE-email-records-legal-trust gravity — PASS
- G13 A0–A3 minimal activation — PASS
- G14 upstream regression / P07 sole XL — PASS
- G15 product-code lock — PASS

---

# 10. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

Established-once semantics restore, rather than alter, the frozen P1.5 rule that evidence state never rewrites commercial/domain truth.

---

# 11. ADR posture

No ADR status changed.

Internal candidate classification:

- ADR-0027 — ACCEPT SEMANTIC DECISION
- ADR-0028 — ACCEPT SEMANTIC DECISION, subject to Claude Round 3 confirmation
- ADR-0006 — remains P1.7-owned
- ADR-0016 — remains P1.9-owned
- ADR-0017 — remains P1.10-owned

No accepted upstream ADR reopens.

---

# 12. Internal verdict

`PASS — BL-P16-05 and all Round-2 watches are closed; P1.6 is ready for Claude Round 3.`

P1.6 remains ACTIVE until Claude PASS + final ADR reconciliation/checkpoint.

P1.7+ remains LOCKED.

Product code remains LOCKED.
