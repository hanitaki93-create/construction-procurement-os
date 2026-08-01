# P1.6 — Integrated Evidence, Document & Communication Candidate v0.4

**Date:** 2026-08-01  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.6 audit target is formed by:

1. `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_1.md` for unchanged evidence/document/communication/retention semantics;
2. `P1_6_INTERNAL_AUDIT_REMEDIATION_V0_1.md` and candidate v0.2 for immutable RelianceBinding, ReconstructionAnchorTest and two communication-effectiveness patterns;
3. candidate v0.3 / Round-1 external remediation for mandatory addressee/channel quantification, satisfaction-time derivation, completion modes, mandatory external-anchor core, message-body evidence and materialization policy;
4. `P1_6_ROUND_2_REMEDIATION_V0_1.md` for established-once effect semantics and W-35–W-39 hardening.

Where wording conflicts, this v0.4 consolidation and the Round-2 remediation control.

No ADR status changes occur before external PASS/final reconciliation.

---

# 2. Evidence/domain boundary remains

P1.6 owns evidence/provenance/communication facts and bounded evidence actions.

Only the owning P01–P12/P09 domain owns authoritative business effect.

No P1.6 action can directly establish, reverse, withdraw, retime or change the commercial/domain consequence of an authoritative event.

---

# 3. Pattern B rule freeze

Every `COMMUNICATION_GATED_EFFECTIVENESS` basis freezes before issue:

- exact pre-effective domain basis/version;
- exact Transmittal/communication scope;
- immutable required addressee set;
- addressee quantifier;
- channel quantifier;
- required/allowed channel set;
- terminal qualifying observation type;
- explicit prerequisite observation set where required;
- satisfaction-time derivation;
- effect-time rule;
- governed offset/calendar/timezone version where applicable;
- completion mode;
- governing contract/policy/config/authority version.

No omitted quantifier/default is valid.

After issue/communication start, the rule is immutable and cannot be amended in place.

Required change uses owning-domain withdrawal/supersession/reissue with a new basis/rule.

---

# 4. Addressee quantifiers

Exactly one:

- `ALL_REQUIRED_ADDRESSEES` — one global condition satisfies only when all frozen required addressees satisfy;
- `ANY_REQUIRED_ADDRESSEE` — one global condition satisfies when any one satisfies, only when explicitly permitted by governing semantics;
- `PER_ADDRESSEE_INDEPENDENT` — satisfaction/effect/final action is addressee-scoped; aggregate states are projections.

No implicit fourth mode.

---

# 5. Channel quantifiers

Exactly one:

- `DESIGNATED_CHANNEL_ONLY`;
- `ANY_ALLOWED_CHANNEL`;
- `ALL_REQUIRED_CHANNELS`.

No implicit fallback channel.

Satisfaction time remains:

- designated channel time;
- earliest allowed-channel time;
- latest all-required-channel time;

combined across addressees by latest-all, earliest-any or per-addressee independent time.

---

# 6. Effect-time rule

Exactly one:

- `AT_SATISFACTION_TIME`;
- `AFTER_GOVERNED_OFFSET`.

A governed offset binds exact duration/unit plus versioned business calendar/timezone/cutoff/holiday semantics where applicable.

Later calendar/config change cannot alter the issued pending rule or an established event.

---

# 7. Completion modes

## 7.1 `OBSERVATION_ENABLES_FINAL_ACTION`

Communication satisfaction supplies one prerequisite only.

A later discretionary owning-domain command checks current authority/security/invariants and creates the event if still permitted.

Communication itself does not create/backdate effect.

With `PER_ADDRESSEE_INDEPENDENT`, the enabled command is addressee-scoped unless the domain defines a separate bounded aggregate command.

## 7.2 `OBSERVATION_COMPLETES_EFFECT`

Use only where the pre-effective basis already contains the final authorized business decision/instruction and the governing rule says communication satisfaction completes effectiveness.

Architecture sequence:

1. P1.6 records immutable qualifying observation(s);
2. the frozen rule first satisfies;
3. one idempotent bounded owning-domain establishment operation/event consumes the exact satisfaction evidence;
4. one owning-domain event is established with exact historical effective time and causal bindings;
5. persistence may be synchronous or delayed, but the resulting domain fact is established once and is not a live projection over current evidence.

---

# 8. Established-once invariant

At first valid satisfaction, the owning-domain event binds:

- exact pre-effective basis/version;
- exact CommunicationSatisfactionRule version;
- exact qualifying observation identities and prerequisite observations;
- frozen addressee/channel satisfaction result;
- satisfaction-time derivation;
- exact effective time;
- governing authority/policy/config/calendar versions;
- stable owning-domain event/establishment identity.

After establishment:

- provider callback retraction;
- observation correction/invalidation;
- duplicate reconciliation;
- source authenticity challenge;
- late earlier/later evidence;
- connector replay;
- source-system restatement;

cannot automatically recompute, reverse, cancel, withdraw or retime the domain event.

The evidence correction remains real and visible.

Any business consequence requires an explicit bounded owning-domain correction/withdrawal/supersession/reissue/re-evaluation action with history preserved.

---

# 9. Late evidence / retraction semantics

## Retraction after effect

If a provider later proves one delivery callback was false:

- record retraction/correction evidence;
- preserve original consumed evidence and established event;
- flag variance/defect;
- invoke owning-domain correction path where required;
- never silently evaporate effectiveness.

## Late earlier observation

If later evidence suggests the rule had satisfied earlier:

- record late evidence;
- do not automatically move effective time;
- only explicit owning-domain correction may alter/assert a corrected time;
- preserve original and corrected causal history.

## Delayed persistence

If satisfaction occurred at T and durable event recording happens later:

- event binds T/offset result as historical effective time;
- persistence/recorded time remains separate;
- retry returns same event/effective time.

---

# 10. Idempotency and concurrency

The establishment operation uses a stable logical identity bound to:

- pre-effective basis;
- rule version;
- effect family;
- addressee scope where applicable.

Duplicate callbacks, concurrent channels, retries and connector replay cannot create duplicate effects.

The first valid rule-satisfying evidence snapshot/time is atomically bound for establishment.

Later correction follows domain correction semantics, not live recomputation.

---

# 11. Frozen-rule replacement only

Once issued, no action may edit in place:

- addressees;
- quantifiers;
- channel set;
- qualifying/prerequisite observations;
- time/offset/calendar;
- completion mode.

If a bidder is dissolved, a recipient was wrong, or service rules change:

- preserve old basis/issue/attempts;
- owning domain withdraws/supersedes/cancels as permitted;
- create new basis/rule/artifact;
- reissue.

---

# 12. Never-satisfied rule

An unreachable addressee or missing acknowledgment leaves the pre-effective basis pending.

P1.6 may report bounce/failure/aging/unresolved status.

P1.6 cannot:

- auto-lapse;
- auto-withdraw;
- drop addressee;
- change quantifier;
- infer fallback channel;
- create a timeout-based hidden effect pattern.

Any expiry/withdrawal/reissue/cancellation is owning-domain lifecycle under a bound rule/version.

---

# 13. Multiple communication prerequisites

The rule may have:

- one terminal qualifying observation type used for satisfaction time; and
- an explicit closed prerequisite-observation set.

No communication fact implies another.

Thus a requirement for delivery + written acknowledgment must explicitly require both; acknowledgment alone cannot stand in for delivery.

---

# 14. External evidence core remains

For load-bearing external `SOURCE_BASIS`, mandatory:

- authoritative external source/system;
- object/record identity;
- exact immutable/historically addressable version identity;
- proof the version is not a current-content alias.

Without these, the external anchor fails.

Materialization policy remains exactly:

- `ANCHOR_ONLY` default for a passing anchor;
- `ANCHOR_PLUS_LOCAL_CAPTURE`;
- `LOCAL_CAPTURE_REQUIRED`.

If anchor fails and permitted local capture is unavailable/prohibited, dependency remains unresolved.

---

# 15. Exact message-body evidence remains

Where email/message body is load-bearing, it resolves to exact immutable EvidenceVersion/content-bearing member + ContentIdentity + SourceLocator.

Headers alone are not body evidence.

Attachments remain separate EvidenceVersions.

---

# 16. Existing P1.6 core remains

Unchanged semantics continue to apply:

- EvidenceRecord/EvidenceVersion/ContentIdentity/occurrence separation;
- immutable RelianceBinding;
- source principal/attribution classes;
- physical scan versus original/custody;
- source locators;
- integrity/hash exact representation and algorithm agility;
- document roles/freeze triggers;
- revision/supersession/reissue;
- signature/seal/timestamp/delivery evidence versus authority;
- transmittal/message/thread semantics;
- seven communication facts;
- duplicate/multi-channel correlation;
- DerivedObservation/AI provenance;
- classification/access separation;
- retention/preservation/redaction/disposition;
- post-termination/export/residency boundaries;
- EA-001–EA-026 bounded evidence actions;
- P01–P12 reconstruction matrix;
- A0–A3 minimal activation;
- P07 sole XL / anti-CDE-email-records-legal gravity.

---

# 17. Candidate ADR posture

No formal status change yet.

- ADR-0027 remains candidate ACCEPT, already accepted by Claude Rounds 1–2.
- ADR-0028 remains candidate ACCEPT only if Round 3 confirms established-once communication-effect semantics.
- ADR-0006 remains P1.7-owned.
- ADR-0016 remains P1.9-owned.
- ADR-0017 remains P1.10-owned.

---

# 18. Gate claim before recheck

Candidate claim:

- G1 PASS
- G2 PASS after established-once remediation
- G3 PASS because evidence correction cannot emit/reverse/retime domain effect
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

Internal hostile recheck is required before external Round 3.
