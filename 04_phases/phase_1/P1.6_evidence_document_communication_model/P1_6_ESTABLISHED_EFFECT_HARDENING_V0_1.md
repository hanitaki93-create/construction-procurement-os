# P1.6 — Established-Once Communication Effect Hardening v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL HARDENING / RECHECK REQUIRED  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Remove a residual wording risk in `P1_6_ROUND_2_REMEDIATION_V0_1.md`:

“first valid satisfaction” must not be interpreted as a live/future-dependent validity test that permits later evidence retraction to erase whether satisfaction occurred.

---

# 2. CommunicationSatisfactionSnapshot

For `OBSERVATION_COMPLETES_EFFECT`, when the frozen rule is first satisfied under its then-governing admissibility/validation criteria, preserve an immutable **CommunicationSatisfactionSnapshot** semantics.

The snapshot is P1.6 evidence/control history, not the final business effect.

It binds:

- exact pre-effective basis/version;
- exact CommunicationSatisfactionRule version;
- exact required addressee set/scope;
- exact qualifying and prerequisite observation identities/versions;
- the observation admissibility/validation state relied on at that time;
- addressee/channel satisfaction derivation;
- satisfaction time;
- governed offset/calendar/timezone result where applicable;
- resulting candidate domain effective time;
- snapshot/evaluation action identity and time;
- evidence/config/authority provenance.

---

# 3. Accepted-under-the-rule, not eternally validated

“First satisfaction” means:

> the first observation set accepted as satisfying the frozen rule under the evidence/admissibility/validation state governing that evaluation.

It does not mean:

> an observation set that will remain unchallenged or factually perfect forever.

A later provider correction, fraud finding, authenticity challenge or source restatement may prove the accepted observation was defective.

That later fact is preserved as contradictory/corrective evidence.

It does not delete or rewrite the historical CommunicationSatisfactionSnapshot.

---

# 4. Domain establishment consumes the frozen snapshot

The idempotent owning-domain establishment operation consumes the exact immutable CommunicationSatisfactionSnapshot rather than recomputing satisfaction from the current observation projection.

Therefore, if:

1. qualifying observations were accepted and snapshot S was frozen at T;
2. a crash delayed owning-domain persistence;
3. a provider retraction arrives before the establishment retry;

then:

- snapshot S remains the historical communication-satisfaction fact that the governing process accepted at T;
- the establishment operation may still record the domain event/effective time caused by S under `OBSERVATION_COMPLETES_EFFECT`;
- the retraction is simultaneously visible as a defect/variance requiring the owning-domain correction/withdrawal/re-evaluation path;
- the system does not pretend the event never became effective merely because recording lagged.

This preserves the governing rule’s effect while retaining the later contradictory evidence.

---

# 5. Logical establishment versus physical persistence

P1.6 does not mandate one database transaction across evidence and domain services.

Semantic requirement:

- once a CommunicationSatisfactionSnapshot is frozen for `OBSERVATION_COMPLETES_EFFECT`, the owning-domain establishment is inevitable/idempotently recoverable under the already-authorized basis unless an explicit owning-domain correction/withdrawal event supersedes it;
- physical persistence may use transactions, outbox, event processing or another later mechanism;
- later infrastructure cannot choose to discard the establishment merely because current evidence projection changed.

The domain event preserves separately:

- satisfaction/effective time;
- domain recorded/persisted time;
- correction/variance history.

---

# 6. Observation correction history

A correction/retraction to an observation consumed by a snapshot must preserve:

- original observation;
- original satisfaction snapshot;
- correction/retraction source/version/time;
- reason/validation status;
- affected snapshot/domain event references;
- owning-domain variance/correction disposition.

P1.6 may identify affected domain events/snapshots but cannot reverse or retime them directly.

---

# 7. Preventing false early snapshots

The frozen domain profile defines the admissibility/validation requirements for an observation to enter satisfaction evaluation.

Examples may include:

- provider callback type/status;
- required correlation to exact Transmittal/addressee/channel;
- provider/source validation class;
- duplicate/retry handling;
- terminal versus provisional callback state.

An observation that does not meet the bound admissibility criteria cannot create the snapshot.

This does not require perfect future truth; it requires deterministic use of the evidence status accepted by the governing rule at the time.

---

# 8. Closure

This hardening removes the ambiguous phrase “first valid satisfaction”.

Current semantic term is:

`first accepted satisfaction under the frozen rule and its bound admissibility/validation criteria`.

Effectiveness remains:

- established once by the owning domain;
- causally bound to the immutable snapshot;
- never recomputed from current evidence;
- changeable only through explicit owning-domain correction/withdrawal/supersession.
