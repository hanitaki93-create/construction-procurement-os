# P1.6 — Claude Round 1 Post-Remediation Internal Recheck v0.1

**Date:** 2026-07-31  
**Target:** `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_3.md`  
**Verdict:** PASS / CLAUDE ROUND 2 READY  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Scope

Recheck:

- BL-P16-04 communication qualifying-observation quantification;
- W-30 ReconstructionAnchorTest mandatory core;
- W-31 deemed-service/governed offsets;
- W-32 delayed recognition after qualifying observation/current-state change;
- W-33 load-bearing MessageEnvelope body identity;
- W-34 external local-capture policy/default;
- G1–G15;
- P1.1–P1.5 regression;
- P07 sole XL;
- A0–A3 activation.

---

# 2. BL-P16-04 recheck

## Scenario A — eight bidders, email + portal, one email bounces

Rule:

- required addressees = exact eight applicable participants frozen at issue;
- AddresseeQuantifier = ALL_REQUIRED_ADDRESSEES;
- ChannelQuantifier = ANY_ALLOWED_CHANNEL;
- allowed channels = EMAIL, PORTAL;
- qualifying observation = DELIVERY_RECEIPT.

Bidder 4 email bounces but portal delivery succeeds.

Result:

- bidder 4 satisfies via portal;
- other bidders satisfy via their earliest allowed-channel delivery;
- global satisfaction occurs only when all eight satisfy;
- no per-bidder deadline split is created unless the domain profile explicitly chose PER_ADDRESSEE_INDEPENDENT.

PASS.

## Scenario B — all bidders must receive via designated portal

Rule:

- ALL_REQUIRED_ADDRESSEES;
- DESIGNATED_CHANNEL_ONLY = PORTAL.

Email success cannot rescue missing portal delivery.

PASS.

## Scenario C — contractor + guarantor, both notices required

Rule:

- required addressees = Contractor, Guarantor;
- ALL_REQUIRED_ADDRESSEES;
- channel rule as contract specifies.

Notice remains globally unsatisfied until both required parties satisfy their channel rule.

PASS.

## Scenario D — notice valid if served on either of two nominated representatives

Rule explicitly permits:

- ANY_REQUIRED_ADDRESSEE.

First qualifying required representative satisfies the global condition.

System cannot infer ANY merely because one delivery happened.

PASS.

## Scenario E — genuinely independent addressee effectiveness

Rule:

- PER_ADDRESSEE_INDEPENDENT;
- ANY_ALLOWED_CHANNEL.

Addressee A satisfies today; B tomorrow.

Result:

- owning domain retains A effective today, B pending until tomorrow;
- no global effective flag may hide mixed state;
- aggregate projection may derive partial/all effective explicitly.

PASS.

## Scenario F — recipient set changes after issue

A ninth bidder is admitted after Addendum 1 was issued.

Result:

- Addendum 1 CommunicationSatisfactionRule retains original frozen eight-addressee scope;
- governing tender/domain action decides whether the ninth bidder requires a new/reissued/additional communication basis;
- historical satisfaction cannot silently expand/recalculate from current participant set.

PASS.

## Scenario G — allowed channel configuration changes after issue

Tenant disables email after a transmittal was issued under EMAIL+PORTAL ANY_ALLOWED_CHANNEL.

Result:

- historical rule remains bound to the issue-time allowed set/version;
- current channel security/capability controls new attempts;
- already-recorded valid occurrence remains historical.

PASS.

**BL-P16-04 CLOSED.**

---

# 3. W-31 deemed service / time recheck

## Scenario A — deemed served two business days after dispatch

Pattern B binds:

- qualifying observation = PROVIDER_SEND_OBSERVATION;
- effect-time rule = AFTER_GOVERNED_OFFSET;
- duration = 2 business days;
- governing calendar/timezone version bound.

Result:

- dispatch occurrence is immutable evidence;
- satisfaction time derives from dispatch;
- domain effective time derives by the bound offset/calendar rule;
- no invented third pattern.

PASS.

## Scenario B — ALL_REQUIRED addressees with offset

Each addressee must be delivered; deemed effect is 1 day after the condition is globally satisfied.

Global satisfaction base time = latest required-addressee satisfaction time.

Offset applies to that frozen derived base.

PASS.

## Scenario C — per-addressee independent offset

Each addressee effective 24 hours after its own delivery.

Each addressee derives its own base + offset/effective time.

PASS.

**W-31 CLOSED.**

---

# 4. W-32 effect-recognition recheck

## Scenario A — authorized instruction effective on dispatch; user revoked after dispatch

Completion mode = OBSERVATION_COMPLETES_EFFECT.

Pre-effective basis was authorized while user had valid authority.

Qualifying dispatch occurs at 10:00.

User's delegation is revoked at 10:05.

Async domain recorder runs 10:10.

Result:

- domain effect is recognized as effective at 10:00 under the bound prior authorization + dispatch rule;
- revocation at 10:05 prevents new discretionary actions but cannot falsify the already-effective instruction;
- no fresh human authority is needed simply to persist/recognize it.

PASS.

## Scenario B — recorder sees unrelated current control inconsistency

The qualifying observation already completed effect contractually, but an integration/config inconsistency prevents clean automatic persistence.

Result:

- architecture requires explicit control/reconciliation variance;
- historical effective time remains the derived contractual time;
- system must reconcile the recording deficiency rather than report `not effective`.

PASS.

## Scenario C — communication only enables a final discretionary action

Completion mode = OBSERVATION_ENABLES_FINAL_ACTION.

Delivery occurs, then user's authority is revoked before final approval command.

Result:

- delivery satisfies the communication prerequisite only;
- final domain action still checks current authority and fails/blocks if authority is absent;
- no retroactive automatic effect is claimed.

PASS.

**W-32 CLOSED.**

---

# 5. W-30 ReconstructionAnchorTest recheck

## Scenario A — immutable historical version ID absent

Provider exposes stable object ID only.

Mandatory property 3 fails.

Reference cannot satisfy SOURCE_BASIS.

PASS.

## Scenario B — provider calls current pointer a “revision”

ID exists but provider semantics show it aliases latest/current content.

Mandatory property 4 fails.

Reference cannot satisfy SOURCE_BASIS.

PASS.

## Scenario C — true immutable revision exists

Source/system/object identity + immutable historically addressable revision semantics exist.

Mandatory core passes; contextual locator/freshness/source properties remain required when material.

PASS.

**W-30 CLOSED.**

---

# 6. W-33 message-body evidence recheck

Supplier email has no attachment and states:

`Our revised total is AED 850,000, VAT excluded.`

Result:

- MessageEnvelope body resolves to exact immutable content EvidenceVersion/member;
- source attribution and message occurrence preserved;
- SourceLocator can point to exact sentence/body region;
- RelianceBinding can bind a later normalization/comparison/domain fact to that exact body version;
- headers alone cannot substitute for the body content.

PASS.

**W-33 CLOSED.**

---

# 7. W-34 materialization policy recheck

## Scenario A — passing external CDE revision, default profile

ReconstructionAnchorTest passes.

MaterializationPolicy = ANCHOR_ONLY by default.

Result:

- exact version/source/location preserved without forced local repository mirroring;
- A0–A3/CDE gravity not increased.

PASS.

## Scenario B — high-risk dispute-prone category

Deployment/domain profile selects ANCHOR_PLUS_LOCAL_CAPTURE.

Result:

- exact anchor retained;
- exact captured version retained when permitted;
- external source remains business authority;
- local capture is evidence resilience, not co-master.

PASS.

## Scenario C — external source fails anchor test but local capture permitted

MaterializationPolicy = LOCAL_CAPTURE_REQUIRED.

Exact capture becomes reconstruction basis with external source provenance.

PASS.

## Scenario D — source fails anchor test and capture prohibited

Result:

- evidence dependency remains unresolved/blocked;
- no URL/user override approximates load-bearing reconstruction.

PASS.

## Scenario E — anchor-only source later disappears

Original RelianceBinding and passing source/version semantics remain historical.

Current source availability becomes unavailable; reconstruction limitation is explicit.

No historical falsification occurs.

PASS.

**W-34 CLOSED.**

---

# 8. Additional quantifier hostile tests

## H01 — same addressee, two allowed channels, both delivered

ANY_ALLOWED_CHANNEL satisfaction time = earliest qualifying observation.

Second occurrence is additional communication evidence and does not shift the already-satisfied effective time.

PASS.

## H02 — same addressee, ALL_REQUIRED_CHANNELS, one channel delayed

Satisfaction time = latest required-channel qualifying observation.

Effect cannot occur on the first channel alone.

PASS.

## H03 — duplicate provider callbacks

Stable occurrence/correlation/idempotency prevents duplicate satisfaction/business effect.

PASS.

## H04 — per-addressee independent + any allowed channel

Each addressee uses earliest qualifying allowed-channel observation and derives its own effect state/time.

PASS.

## H05 — ANY_REQUIRED_ADDRESSEE configured accidentally by UI default

Architecture prohibits implicit/default ANY semantics. Domain/contract profile must explicitly bind it.

PASS.

---

# 9. Full gate check

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

# 10. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

Communication satisfaction quantification is a P1.6 evidence-to-domain guard seam and does not alter P1.5 commercial value semantics.

OBSERVATION_COMPLETES_EFFECT preserves already-authorized historical truth; OBSERVATION_ENABLES_FINAL_ACTION preserves current-security checks for new discretionary actions.

---

# 11. ADR posture

Internal recommendation after remediation:

- ADR-0027 — ACCEPT SEMANTIC DECISION at final P1.6 reconciliation if Claude Round 2 agrees;
- ADR-0028 — ACCEPT SEMANTIC DECISION at final P1.6 reconciliation if Claude Round 2 agrees.

No ADR status changes yet.

Later-owned unchanged:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

---

# 12. Internal verdict

`PASS — Claude Round 1 blocker and watches are closed internally; P1.6 is ready for Claude Round 2 hostile audit.`

P1.6 remains ACTIVE.
P1.7+ remains LOCKED.
Product code remains LOCKED.
