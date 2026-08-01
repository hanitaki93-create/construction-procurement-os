# Construction Procurement OS — P1.6 Claude Round 3 Self-Contained Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.6 — Evidence, Document & Communication Model  
**Status entering audit:** INTERNAL RECHECK PASS / P1.6 ACTIVE / P1.7+ LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED

---

# 1. Mission

Audit this packet only.

Claude Round 2 returned:

`FAIL — P1.6 remains open; blockers below must be remediated.`

One blocker:

- BL-P16-05 — `OBSERVATION_COMPLETES_EFFECT` did not explicitly establish effectiveness once; a later implementation could recompute effectiveness from the current evidence set and silently reverse or retime a domain effect when communication evidence was retracted/corrected or discovered late.

Round 2 also raised:

- W-35 immutable issued-rule amendment path;
- W-36 never-satisfied rule handling;
- W-37 terminal observation versus prerequisite observations;
- W-38 per-addressee final-action/effect granularity;
- business-calendar version binding.

Decide whether the remediation below genuinely closes those issues without creating another ambiguity, upstream regression, second XL subsystem or A0–A3 burden.

Treat our internal PASS as a claim to attack.

Do not fail for SQL/schema/event store/object storage/API/UI/connector protocol/hash algorithm/provider/OCR/model/search/index implementation intentionally deferred.

A blocker exists only if later work must still choose:

- whether an established effect is a domain fact or evidence projection;
- whether evidence retraction/correction/late discovery can unmake or retime it;
- what happens during crash/retry between satisfaction and domain persistence;
- whether an issued satisfaction rule can change in place;
- whether unreachable addressees cause hidden timeout/auto-lapse;
- whether one communication fact implies another;
- whether per-addressee satisfaction is flattened;
- or another load-bearing evidence-to-domain meaning decision.

---

# 2. Frozen upstream state

- P1.0 CLOSED
- P1.1 PASS/FROZEN
- P1.2 PASS/CLOSED
- P1.3 PASS/CLOSED
- P1.4 PASS/CLOSED/FROZEN
- P1.5 PASS/CLOSED/FROZEN
- P1.6 ACTIVE
- P1.7+ LOCKED
- Product code LOCKED

P07 remains the sole independent XL gravity well.

A0–A3 remains independently viable without P07, named CDE/ERP/email connector, supplier network, CPM/BPM, WMS or advanced AI.

P1.4 still freezes evidence provenance/authority, one authority per load-bearing fact/effective period, no edit-in-place source-history rewrite, bounded retention/tombstone, current authority versus historical bound authority, connector-never-authority and bounded-agent-action rules.

P1.5 still freezes that evidence/message/workflow state never directly writes commercial truth, historical meaning/config/authority versions remain, correction is history-preserving, and P1.6 cannot emit P07/commercial effects.

---

# 3. P1.6 core already accepted by prior rounds

## Evidence identity

- EvidenceRecord = durable business evidence lineage.
- EvidenceVersion = immutable exact captured/source/issued version.
- ContentIdentity/IntegrityAssertion = exact representation integrity, not business identity/authority/truth.
- CaptureObservation = channel/path occurrence.
- immutable RelianceBinding = effective domain event/decision → exact EvidenceVersion → exact SourceLocator → governing context.
- later revisions cannot rebind historical award/Commitment/certificate basis.
- source principal differs from capture actor/login/transport/buyer-on-behalf actor/approver.
- hash equality cannot merge supplier histories.

## External reconstruction

A load-bearing external source must identify:

- authoritative source/system;
- object/record;
- exact immutable or historically addressable version;
- proof the version is not a current-content alias.

If the external anchor fails, permitted immutable local capture is required. If neither is available, the dependency remains unresolved.

Materialization policy is explicit:

- ANCHOR_ONLY;
- ANCHOR_PLUS_LOCAL_CAPTURE;
- LOCAL_CAPTURE_REQUIRED.

## Document/issue

- WORKING_DRAFT, SOURCE_CAPTURED, PRODUCT_GENERATED, PRODUCT_ISSUED and DERIVED_REPRESENTATION remain distinct.
- no archive-every-keystroke requirement.
- exact relied-on/issued state freezes at load-bearing trigger.
- revision/supersession/addendum/replacement/withdrawal/reissue preserve history.
- latest/current is projection.
- exact issued pack membership is immutable.

## Communication separation

Distinct facts:

1. issue/send intent;
2. dispatch/send observation;
3. delivery/receipt observation;
4. read/open observation;
5. receipt acknowledgment;
6. substantive response/agreement evidence;
7. owning-domain acceptance/effectiveness.

No fact implies the next.

## Addressee/channel quantification

Every Pattern-B basis freezes:

- exact addressee set;
- addressee quantifier: ALL_REQUIRED_ADDRESSEES, ANY_REQUIRED_ADDRESSEE or PER_ADDRESSEE_INDEPENDENT;
- channel quantifier: DESIGNATED_CHANNEL_ONLY, ANY_ALLOWED_CHANNEL or ALL_REQUIRED_CHANNELS;
- channel set;
- qualifying observation;
- satisfaction/effective-time rule;
- completion mode.

All nine addressee×channel combinations have explicit earliest/latest/per-addressee semantics. No fallback/default is allowed.

## Offsets/time

Effect time is:

- AT_SATISFACTION_TIME; or
- AFTER_GOVERNED_OFFSET.

Offset binds duration, business-calendar/timezone/cutoff/holiday semantics and governing version.

## Message-body evidence

A load-bearing message body resolves to immutable EvidenceVersion/content-bearing member + ContentIdentity + SourceLocator. Headers alone are not body content.

## Retention/AI/one-XL

- preservation can block disposal without granting access;
- restriction ≠ redaction ≠ disposal;
- disposition never reverses domain truth;
- AI/model/tool observations preserve source/version/location and never become supplier source truth;
- P1.6 is not a CDE/email archive/records management/legal/eDiscovery/trust-service/commercial-ledger subsystem.

---

# 4. BL-P16-05 remediation — established-once invariant

Under `OBSERVATION_COMPLETES_EFFECT`, communication satisfaction does not remain a live function over the current observation set.

At the first observation set accepted as satisfying the frozen rule under its then-governing admissibility/validation criteria:

1. P1.6 freezes an immutable `CommunicationSatisfactionSnapshot`;
2. one idempotent bounded owning-domain establishment operation consumes that exact snapshot;
3. one owning-domain event/effect is established with immutable causal evidence and historical effective time;
4. persistence may be synchronous or delayed, but the resulting domain fact is established once and is never recomputed from current evidence.

The snapshot binds:

- pre-effective basis/version;
- CommunicationSatisfactionRule version;
- exact required addressee scope;
- exact qualifying/prerequisite observation identities;
- admissibility/validation state relied on at that time;
- addressee/channel derivation;
- satisfaction time;
- offset/calendar/timezone derivation;
- candidate effective time;
- evaluation/snapshot action identity;
- evidence/config/authority provenance.

The owning-domain event binds the snapshot plus exact domain event/establishment identity and historical effective time.

---

# 5. Accepted at the time, not eternally perfect

“First satisfaction” means:

> the first observation set accepted as satisfying the frozen rule under its bound admissibility/validation criteria.

It does not mean:

> evidence guaranteed never to be challenged or corrected later.

A provider retraction, fraud finding, authenticity challenge or source restatement creates contradictory/corrective evidence.

It does not delete the historical satisfaction snapshot or automatically undo the domain event.

---

# 6. Evidence correction after establishment

After establishment, any later:

- callback retraction;
- observation correction/invalidation;
- authenticity challenge;
- duplicate reconciliation;
- late discovery of earlier/later observations;
- connector replay;
- source-system restatement;

may update evidence/variance history only.

It cannot automatically:

- recompute whether the domain event exists;
- reverse/cancel/withdraw it;
- move its effective time;
- rewrite the original causal RelianceBinding/snapshot.

If business consequence must change, the owning domain must execute a bounded history-preserving correction/withdrawal/supersession/reissue/re-evaluation action.

P1.6 can expose the defect and affected event but cannot emit, reverse or retime the domain effect.

---

# 7. Crash/retry boundary

If:

1. snapshot S is frozen at T;
2. a crash delays owning-domain durable persistence;
3. the provider retracts an observation before retry;

then:

- S remains the historical accepted-satisfaction fact;
- the owning-domain establishment operation consumes S rather than current observation projection;
- the event is recorded with historical effective time T/offset result;
- the retraction is simultaneously visible as a variance requiring owning-domain correction review;
- the system does not pretend the event never became effective solely because persistence lagged.

The stable establishment identity prevents duplicate effects under retries/concurrent callbacks.

Domain recorded time remains separate from effective time.

---

# 8. Late evidence and effective-time correction

Late evidence that suggests satisfaction existed earlier/later does not automatically retime an established event.

Only a supported owning-domain correction may:

- retain original time and record variance;
- assert a corrected effective time;
- withdraw/supersede/reissue;
- preserve original and corrected causal histories.

No silent backdating/forward-dating occurs.

---

# 9. Frozen rule cannot be amended in place

Once a pre-effective basis/artifact is issued or communication begins, its CommunicationSatisfactionRule is immutable.

No in-place amendment of:

- required addressees;
- addressee/channel quantifiers;
- channel set;
- terminal/prerequisite observations;
- effect-time/offset/calendar/timezone;
- completion mode.

Required change uses owning-domain withdrawal/cancellation/supersession plus a new basis/rule/artifact and reissue.

A dissolved bidder cannot simply be removed from an already-issued ALL_REQUIRED_ADDRESSEES set.

---

# 10. Never-satisfied rules

If a required addressee/channel/acknowledgment never qualifies:

- pre-effective basis remains pending;
- P1.6 may expose failures, bounce, aging and unresolved status;
- P1.6 does not auto-lapse, auto-withdraw, drop recipients, change quantifiers or infer fallback channels;
- timeout/expiry/withdrawal/reissue is an explicit owning-domain lifecycle rule/action.

No hidden third communication-effectiveness pattern.

---

# 11. Terminal observation plus prerequisites

A rule may bind:

- one terminal qualifying observation used for satisfaction time; and
- an explicit closed prerequisite-observation set.

No communication fact implies another.

Thus a rule requiring delivery plus written acknowledgment must explicitly require both. Binding acknowledgment as terminal does not itself prove delivery.

---

# 12. Per-addressee granularity

With `PER_ADDRESSEE_INDEPENDENT`:

- OBSERVATION_COMPLETES_EFFECT establishes separate addressee-scoped events/times;
- OBSERVATION_ENABLES_FINAL_ACTION enables an addressee-scoped discretionary command unless the domain explicitly defines a separate bounded aggregate command;
- one addressee’s satisfaction never authorizes another’s effect/action;
- none/some/all are projections only.

---

# 13. Versioned calendar/time basis

Every business calendar/timezone basis used by AFTER_GOVERNED_OFFSET is an exact versioned load-bearing configuration artifact/reference bound before issue.

Preserve as applicable:

- calendar identity/version;
- timezone/basis;
- working/non-working days;
- holiday/exceptions version;
- cutoff/day-boundary rule;
- offset duration/unit;
- governing contract/policy source;
- result/effective-time provenance.

Later calendar changes cannot alter pending issued rules or established events.

Changing the governing calendar for a pending issued basis requires withdrawal/supersession/reissue where allowed.

---

# 14. Internal hostile recheck

Internal verdict:

`PASS — BL-P16-05 and all Round-2 watches are closed; P1.6 is ready for Claude Round 3.`

Scenarios passed:

1. callback retracted after domain event persistence;
2. callback retracted after snapshot but before domain persistence;
3. late earlier observation;
4. provisional/non-terminal callback excluded by admissibility rule;
5. duplicate/concurrent channel callbacks;
6. bidder dissolved after issue;
7. permanently unreachable guarantor;
8. acknowledgment without required delivery proof;
9. per-addressee independent final action;
10. calendar version changes after issue;
11. P1.6 action attempts to reverse effect;
12. AI agent proposes withdrawal but cannot execute evidence-side reversal;
13. wrong rule version discovered later;
14. recipient corrected before issue versus after issue;
15. retraction during governed offset before scheduled effective time.

---

# 15. Current gate claim

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

Regression claim:

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

No ADR status has changed.

---

# 16. ADR review

## ADR-0027

Evidence identity/version/content-integrity/reconstruction-anchor model.

Round-1 and Round-2 classification:

`ACCEPT SEMANTIC DECISION`

Confirm.

## ADR-0028

Communication/transmittal/delivery/acknowledgment/domain-effect boundary.

Round-2 classification:

`KEEP PROPOSED — BLOCKING`

Re-evaluate after established-once remediation.

Later-owned remain:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

State whether any accepted P1.4/P1.5 ADR must reopen.

---

# 17. Required hostile scenarios

Attack at minimum:

1. delivery callback retracted after effect persisted;
2. callback retracted after snapshot but before async establishment persistence;
3. late evidence suggests earlier effective time;
4. provisional callback initially looks successful but fails admissibility criteria;
5. duplicate/concurrent callbacks on multiple channels;
6. provider changes callback status in place;
7. one required bidder is dissolved after issue;
8. one required guarantor is permanently unreachable;
9. written acknowledgment arrives without independent required delivery evidence;
10. PER_ADDRESSEE_INDEPENDENT + OBSERVATION_ENABLES_FINAL_ACTION;
11. business calendar changes before governed offset expires;
12. P1.6 correction action attempts automatic reversal;
13. AI agent reacts to retraction;
14. satisfaction snapshot bound wrong rule version;
15. offset-based effect scheduled, underlying observation retracted before effect time;
16. owning domain explicitly withdraws pre-effective basis before offset completes;
17. correction determines original provider observation was fraudulent;
18. disputed event has original snapshot + later contradictory evidence five years later.

Add your own hostile scenarios.

---

# 18. Required response

## VERDICT

Choose exactly:

`PASS — P1.6 Evidence, Document & Communication Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.7.`

or

`FAIL — P1.6 remains open; blockers below must be remediated.`

## BLOCKERS

For each:

- blocker ID;
- section/clause;
- failure mode;
- concrete scenario;
- why later architecture/build must choose evidence/domain meaning;
- narrowest remediation.

Do not convert physical implementation preferences into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate semantic, legal/evidence and later physical debt.

## GATE CHECK

PASS/FAIL:

- G1 exact source reconstruction
- G2 external communication capture/effectiveness
- G3 evidence/message not business writer
- G4 revision/issue/supersession immutability
- G5 external-reference reconstruction
- G6 communication-fact separation
- G7 retention/redaction/disposition
- G8 AI/source/derived provenance
- G9 multi-channel/duplicate semantics
- G10 hash/content/business identity
- G11 source attribution/physical capture
- G12 one-XL/anti-CDE-email-records-legal gravity
- G13 A0–A3 minimal activation
- G14 upstream regression/P07 sole XL
- G15 product-code lock

## REGRESSION CHECK

- P1.1 REOPEN
- P1.2 REGRESSION
- P1.3 REOPEN
- P1.4 REOPEN
- P1.5 REOPEN
- SECOND XL
- A0–A3 ACTIVATION

## ADR IMPACT

Classify ADR-0027 and ADR-0028:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0006/0016/0017 remain later-owned and whether any accepted upstream ADR reopens.

## P1.7 READINESS

Choose:

`READY AFTER P1.6 FINAL CHECKPOINT`

or

`NOT READY`

---

# 19. Final question

After this remediation, is any load-bearing P1.6 choice still ambiguous enough that P1.7/later design must decide whether an established domain effect is recomputed from current evidence, whether evidence correction/retraction can unmake or retime it, how delayed persistence behaves, whether an issued satisfaction rule can change in place, or whether pending/unreachable/per-addressee/calendar cases need hidden semantics?

A clean PASS is appropriate only if the answer is NO.
