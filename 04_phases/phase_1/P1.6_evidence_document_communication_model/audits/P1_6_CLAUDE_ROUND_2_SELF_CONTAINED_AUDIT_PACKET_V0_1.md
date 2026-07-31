# Construction Procurement OS — P1.6 Claude Round 2 Self-Contained Audit Packet v0.1

**Date:** 2026-07-31  
**Stage:** P1.6 — Evidence, Document & Communication Model  
**Status entering audit:** INTERNAL RECHECK PASS / P1.6 ACTIVE / P1.7+ LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED / DO NOT REQUEST

---

# 1. Mission

Audit this packet only.

Claude Round 1 returned:

`FAIL — P1.6 remains open; blockers below must be remediated.`

One blocker:

- BL-P16-04 — Pattern B qualifying observation lacked quantification over addressees/channels.

Round 1 also raised:

- W-30 ReconstructionAnchorTest mandatory core;
- W-31 deemed-service/governed offset;
- W-32 effect already true at communication time but later recorder sees changed current invariant;
- W-33 load-bearing MessageEnvelope body identity;
- W-34 policy/default for local capture when an external anchor already passes.

Your task is to decide whether those issues are genuinely closed and whether the remediation introduces any new ambiguity, second subsystem/gravity well, A0–A3 burden or P1.1–P1.5 regression.

Treat the internal PASS as a claim to attack.

Do not fail for database/schema/object storage/API/UI/connector protocol/hash algorithm/email provider/signature provider/OCR/model/search/index implementation choices intentionally deferred.

A blocker exists only if later architecture/build would still have to choose:

- which addressees/channels satisfy a communication condition;
- when the communication condition becomes satisfied/effective;
- whether a qualifying observation itself completes effect or merely enables a later action;
- whether changed current authority can falsify a fact already effective under a prior authorized basis;
- whether an external reference is reconstruction-safe;
- whether message-body content is bindable exact evidence;
- whether local materialization of external evidence is a hidden implementation choice;
- or any other load-bearing evidence meaning/authority/lifecycle decision.

---

# 2. Frozen upstream controls

- P1.0 CLOSED
- P1.1 PASS/FROZEN
- P1.2 PASS/CLOSED
- P1.3 PASS/CLOSED
- P1.4 PASS/CLOSED/FROZEN
- P1.5 PASS/CLOSED/FROZEN
- P1.6 ACTIVE
- P1.7+ LOCKED
- Product code LOCKED

P07 commitment/change/valuation/commercial truth remains the sole independent XL gravity well.

A0–A3 remains:

`requirement/MR/package`
`→ RFQ/tender`
`→ supplier response`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

No P07, named ERP/CDE connector, supplier network, CPM/BPM, WMS or advanced AI is required for A0–A3.

P1.4 still freezes:

- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative source per effective period;
- exact governed evidence provenance;
- external authoritative records remain REFERENCE/narrow MIRROR;
- no edit-in-place rewrite of load-bearing evidence;
- retention/disposition/tombstone/post-termination boundaries;
- current authorization separate from historical bound authority/policy;
- connector never business authority;
- bounded agent actions only.

P1.5 still freezes:

- evidence/message/workflow state never directly writes commercial truth;
- historical meaning/config/authority version preserved;
- TX-001–TX-056 domain lifecycle membership;
- AI-derived influence remains provenance-bearing, never supplier source truth;
- P07 sole XL;
- A0–A3 independent.

---

# 3. Unchanged P1.6 core that Round 1 passed

## Evidence identity

- `EvidenceRecord` = business evidence lineage identity.
- `EvidenceVersion` = immutable exact captured/source/issued version.
- `ContentIdentity` / `IntegrityAssertion` = exact technical content/integrity identity, not business/source authority.
- Same bytes/hash do not merge source/business evidence histories.
- `CaptureObservation` = channel/path occurrence; multiple occurrences may bind one EvidenceVersion where equivalence is proven.
- `EvidenceBinding` = typed evidence relation.
- Effective load-bearing domain reliance uses immutable `RelianceBinding` to exact EvidenceVersion + SourceLocator + governing context.
- Later source revision cannot rebind historical award/Commitment/certificate evidence.

## Source principal / attribution

Source principal remains separate from:

- capture actor;
- transport provider;
- login identity;
- buyer-on-behalf actor;
- later approver.

Attribution classes are provenance, not legal/business authority.

Email From header alone is not authenticated supplier identity.

## External reconstruction

Mutable/current URL or provider object ID is insufficient.

Load-bearing external source must pass `ReconstructionAnchorTest` or use permitted immutable local capture.

If neither path exists, the evidence dependency remains unresolved/blocked.

## Document/issue semantics

- WORKING_DRAFT, SOURCE_CAPTURED, PRODUCT_GENERATED, PRODUCT_ISSUED and DERIVED_REPRESENTATION are distinct semantic roles.
- No archive-every-keystroke requirement.
- Exact relied-on/issued state freezes at load-bearing trigger.
- Revision/supersession/addendum/replacement/withdrawal/corrected reissue are history-preserving.
- “latest/current” is a projection.
- Exact issued pack membership is immutable.

## Communication facts

Distinct:

1. issue/send intent;
2. dispatch/send observation;
3. delivery/receipt observation;
4. read/open observation;
5. acknowledgment of receipt;
6. substantive content response/agreement evidence;
7. owning-domain acceptance/effectiveness.

No fact implies the next.

P1.6 communication evidence never directly emits P07/commercial effect.

## Retention / redaction

- retention has explicit bounded basis;
- preservation can block disposal without granting view access;
- restriction ≠ redaction ≠ disposal;
- redaction produces linked derived representation;
- disposition does not reverse historical domain truth;
- no near-complete shadow retained as “metadata”.

## AI provenance

Load-bearing model/tool extraction binds exact source version/location and derivation/acceptance/correction chain.

Machine-derived value never becomes supplier-authored source truth.

## One-XL / activation

P1.6 is evidence/provenance/communication substrate only, not full CDE, records management, email archive/server, collaboration, eDiscovery/legal platform, trust-service platform or commercial ledger.

A0–A3 remains minimal.

---

# 4. BL-P16-04 remediation — mandatory CommunicationSatisfactionRule

Every `COMMUNICATION_GATED_EFFECTIVENESS` profile must bind a versioned `CommunicationSatisfactionRule` before issue.

It freezes:

1. exact pre-effective domain basis/version;
2. exact Transmittal/communication scope;
3. immutable required addressee set OR deterministic addressee-set rule resolved/frozen at issue;
4. qualifying observation type;
5. addressee quantifier;
6. channel quantifier;
7. allowed/required channel set;
8. observation-satisfaction/effect-time rule, including governed offset/calendar/timezone where applicable;
9. effect-completion mode;
10. governing policy/contract/config version.

Later recipient/channel/config change cannot silently change an already-issued rule.

---

# 5. Closed addressee quantifiers

Exactly one:

## `ALL_REQUIRED_ADDRESSEES`

One global domain condition satisfies only when every frozen required addressee satisfies the qualifying observation under the bound channel rule.

One missing required addressee prevents global satisfaction.

## `ANY_REQUIRED_ADDRESSEE`

One global condition satisfies when at least one frozen required addressee satisfies the rule.

This mode is allowed only when the governing contract/domain rule explicitly says any one required addressee is sufficient.

It is never inferred from partial delivery.

## `PER_ADDRESSEE_INDEPENDENT`

Effectiveness is evaluated independently per addressee.

Owning domain records addressee-scoped effective state/time.

One global effective flag may not hide mixed states.

Aggregate “some/all effective” is projection only.

No implicit addressee mode exists.

---

# 6. Closed channel quantifiers

Exactly one:

## `DESIGNATED_CHANNEL_ONLY`

Only the bound designated channel can satisfy the addressee condition.

## `ANY_ALLOWED_CHANNEL`

The earliest qualifying observation on any frozen allowed channel satisfies that addressee.

## `ALL_REQUIRED_CHANNELS`

Every frozen required channel must qualify; addressee satisfaction time is the latest qualifying observation across required channels.

No implicit fallback channel exists.

---

# 7. Satisfaction-time derivation

Per addressee:

- DESIGNATED_CHANNEL_ONLY → designated-channel qualifying observation time;
- ANY_ALLOWED_CHANNEL → earliest qualifying allowed-channel observation;
- ALL_REQUIRED_CHANNELS → latest qualifying observation across required channels.

Across addressees:

- ALL_REQUIRED_ADDRESSEES → latest required-addressee satisfaction time;
- ANY_REQUIRED_ADDRESSEE → earliest addressee satisfaction time that satisfies the rule;
- PER_ADDRESSEE_INDEPENDENT → each addressee retains own satisfaction time.

Effect-time rule is exactly one:

- `AT_SATISFACTION_TIME`; or
- `AFTER_GOVERNED_OFFSET`.

For a governed offset, the domain profile binds duration and required business-calendar/timezone semantics.

This supports deemed-service semantics without a third communication-effectiveness pattern.

---

# 8. Pattern-B completion modes

Pattern B remains `COMMUNICATION_GATED_EFFECTIVENESS`, but the domain profile binds exactly one completion mode.

## `OBSERVATION_COMPLETES_EFFECT`

Use when the pre-effective basis already contains the final authorized decision/instruction and the governing rule says the qualifying communication condition itself completes effectiveness.

When the CommunicationSatisfactionRule is satisfied:

- business effectiveness becomes true deterministically at the derived effective time;
- persistence/reconciliation may occur later;
- later revocation of original actor membership/delegation or unrelated current-state change cannot make the system deny a fact that already became effective under the previously authorized basis + governing communication rule;
- delayed recording/control failure creates explicit control/reconciliation variance and preserves the historical effective time;
- no new discretionary human authority is needed merely to recognize the already-effective fact.

Current security still governs any new discretionary action after effectiveness.

## `OBSERVATION_ENABLES_FINAL_ACTION`

Use when communication only satisfies one prerequisite.

A new discretionary owning-domain command is still required.

That command checks current authority/security/invariants.

Observation alone does not create/backdate automatic effect.

---

# 9. Tender multi-channel example

Eight applicable bidders must receive a tender addendum.

Governing rule: either email or portal delivery is sufficient for each bidder, and one common tender basis should apply globally once all eight are served.

Bind:

- addressee set = exact eight applicable TenderParticipants frozen at issue;
- AddresseeQuantifier = ALL_REQUIRED_ADDRESSEES;
- ChannelQuantifier = ANY_ALLOWED_CHANNEL;
- allowed channels = EMAIL, PORTAL;
- qualifying observation = DELIVERY_RECEIPT;
- effect-time rule = governing tender rule.

Bidder 4 email hard-bounces but portal delivery succeeds.

Bidder 4 is satisfied via portal.

Global condition remains unsatisfied until every required bidder has at least one qualifying allowed-channel observation.

Partial delivery does not silently create per-bidder effectiveness.

If the contract/process genuinely permits independent bidder effect, the profile must explicitly use PER_ADDRESSEE_INDEPENDENT.

---

# 10. W-30 remediation — ReconstructionAnchorTest mandatory core

For every load-bearing external `SOURCE_BASIS`, these are ALWAYS required:

1. identifiable authoritative external source/system;
2. identifiable external object/record;
3. exact immutable or historically addressable version/revision identity;
4. source semantics proving the identified version is not an alias/pointer to current mutable content.

Items 3 and 4 can never be waived as “not applicable”.

If absent, the reference FAILS.

Additional properties remain required where material, including source principal/authority, SourceLocator, effective/source context, observed/fetched time, freshness/conflict state and supported retrieval/reference path.

Connector/vendor documentation must demonstrate true historical version addressability; an ID label alone is insufficient.

---

# 11. W-31 remediation — governed offsets

Pattern B may bind `AFTER_GOVERNED_OFFSET`.

The profile freezes:

- base satisfaction rule;
- duration/offset;
- business-calendar semantics where applicable;
- timezone semantics where applicable;
- governing policy/contract/config version.

Examples:

- deemed served 2 business days after dispatch;
- global effect 1 day after last required addressee delivery;
- per-addressee independent effect 24 hours after each addressee delivery.

This remains Pattern B; no hidden third pattern exists.

---

# 12. W-32 remediation — recognition versus new discretion

If completion mode is OBSERVATION_COMPLETES_EFFECT and dispatch/delivery/acknowledgment already satisfied the governing rule:

- the fact is effective at the derived time even if the recorder runs later;
- later revocation or current-state drift cannot falsify it;
- a control/data mismatch is recorded/reconciled without changing the historical effective time.

If completion mode is OBSERVATION_ENABLES_FINAL_ACTION:

- current authority/security/invariants apply to the later command;
- communication does not itself create the effect.

---

# 13. W-33 remediation — exact MessageEnvelope body evidence

Where message body content is load-bearing, the exact body resolves to immutable EvidenceVersion or exact content-bearing member version with its own ContentIdentity/integrity semantics.

RelianceBinding may bind:

`MessageEnvelope → body EvidenceVersion → SourceLocator`.

A supplier price/term stated only in an email body is therefore exact bindable source evidence.

Headers/envelope alone are not the content version.

Attachments remain separate EvidenceVersions.

---

# 14. W-34 remediation — ExternalEvidenceMaterializationPolicy

Whether a passing external anchor is additionally copied locally is explicit versioned policy, not an implementation accident.

Exactly three modes:

## `ANCHOR_ONLY`

Default for externally authoritative evidence that passes ReconstructionAnchorTest.

Use the exact reconstruction-safe external anchor without locally duplicating payload.

## `ANCHOR_PLUS_LOCAL_CAPTURE`

Retain exact anchor + immutable local evidence capture when risk/deployment/domain policy requires stronger resilience and capture is permitted.

## `LOCAL_CAPTURE_REQUIRED`

Require local capture when policy demands it or when external source fails ReconstructionAnchorTest but a permitted exact capture can satisfy the load-bearing requirement.

If external source fails and local capture is prohibited, evidence remains unresolved/blocked.

These modes apply only to in-scope evidence versions and never imply full external repository mirroring/hierarchy/permissions/workflow/version estate.

Exact OS-issued supplier-facing artifacts remain product-governed evidence regardless of this policy.

---

# 15. Internal post-remediation hostile checks

Internal result:

- BL-P16-04 CLOSED;
- W-30 CLOSED;
- W-31 CLOSED;
- W-32 CLOSED;
- W-33 CLOSED;
- W-34 CLOSED.

Hostile scenarios passed:

1. eight bidders, email + portal, one email bounce;
2. all bidders must use designated portal;
3. contractor + guarantor both required;
4. any one nominated representative sufficient only under explicit ANY mode;
5. genuine per-addressee independent effectiveness;
6. recipient set changes after issue;
7. channel config changes after issue;
8. deemed service 2 business days after dispatch;
9. all-required global offset;
10. per-addressee independent offset;
11. authority revoked after dispatch where observation already completed effect;
12. authority revoked before final discretionary action where observation only enables it;
13. current-pointer external object falsely labeled revision;
14. email-body-only commercial term;
15. passing external anchor under ANCHOR_ONLY;
16. risk profile uses ANCHOR_PLUS_LOCAL_CAPTURE;
17. failed external anchor uses LOCAL_CAPTURE_REQUIRED;
18. external anchor fails and capture prohibited → unresolved/blocked;
19. duplicate callbacks do not duplicate satisfaction/effect;
20. ANY_REQUIRED cannot appear as an implicit UI/default rule.

---

# 16. Current gate claim

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

---

# 17. ADR review

No ADR has been formally accepted yet from this audit cycle.

Review:

### ADR-0027 — Evidence identity/version/content-integrity/reconstruction-anchor model

Round 1 classification:

`ACCEPT SEMANTIC DECISION`

Confirm whether it remains acceptable after the W-30/W-34 hardening.

### ADR-0028 — Communication/transmittal/delivery/acknowledgment/domain-effect boundary

Round 1 classification:

`KEEP PROPOSED — BLOCKING`

Re-evaluate now after quantification/completion/effect-time remediation.

Confirm later-owned:

- ADR-0006 → P1.7 integration depth;
- ADR-0016 → P1.9 external UX;
- ADR-0017 → P1.10 broader AI readiness.

State whether any accepted P1.4/P1.5 ADR must reopen.

---

# 18. Required hostile scenarios

At minimum attack:

1. ALL_REQUIRED_ADDRESSEES + ANY_ALLOWED_CHANNEL with one email bounce and portal success.
2. ALL_REQUIRED_ADDRESSEES + DESIGNATED_CHANNEL_ONLY with one designated-channel failure.
3. ALL_REQUIRED_ADDRESSEES + ALL_REQUIRED_CHANNELS.
4. ANY_REQUIRED_ADDRESSEE where contract genuinely permits one representative to suffice.
5. PER_ADDRESSEE_INDEPENDENT with different effect times and no global flattening.
6. Addressee set changes after issue.
7. Allowed channel set changes after issue.
8. Same addressee receives on two allowed channels at different times.
9. Deemed service after governed business-day offset.
10. Deemed service on ALL_REQUIRED global condition.
11. Qualifying dispatch completes effect, but user authority revoked before async persistence.
12. Qualifying delivery merely enables a final action, but user's authority is revoked before that action.
13. Provider exposes an object ID + “revision” string that actually aliases current content.
14. Supplier commercial term exists only in email body.
15. ANCHOR_ONLY source later becomes unavailable.
16. ANCHOR_PLUS_LOCAL_CAPTURE under a high-risk category.
17. External source fails ReconstructionAnchorTest and local capture is prohibited.
18. Duplicate delivery callbacks/retries.
19. Future AI agent invokes issue/capture/disposition action but cannot choose a different satisfaction rule.
20. Tender/contract profile accidentally omits addressee/channel quantifier — should be invalid, not defaulted.

Add your own hostile scenarios.

---

# 19. Required response format

## VERDICT

Choose exactly:

`PASS — P1.6 Evidence, Document & Communication Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.7.`

or

`FAIL — P1.6 remains open; blockers below must be remediated.`

## BLOCKERS

For each:

- ID;
- section/clause;
- failure mode;
- concrete scenario;
- why later work must choose evidence/business-effect meaning;
- narrowest remediation.

Do not turn physical implementation choices into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic;
- legal/evidence;
- later physical/implementation.

## GATE CHECK

PASS/FAIL:

- G1 exact source reconstruction;
- G2 external communication capture/effectiveness;
- G3 evidence/message not business writer;
- G4 revision/issue/supersession immutability;
- G5 external-reference reconstruction;
- G6 communication-fact separation;
- G7 retention/redaction/disposition;
- G8 AI/source/derived provenance;
- G9 multi-channel/duplicate semantics;
- G10 hash/content/business identity;
- G11 source attribution/physical capture;
- G12 one-XL/anti-CDE-email-records-legal gravity;
- G13 A0–A3 minimal activation;
- G14 upstream regression/P07 sole XL;
- G15 product-code lock.

## REGRESSION CHECK

- P1.1 REOPEN = YES/NO
- P1.2 REGRESSION = YES/NO
- P1.3 REOPEN = YES/NO
- P1.4 REOPEN = YES/NO
- P1.5 REOPEN = YES/NO
- SECOND XL = CLEAN/FAIL
- A0–A3 ACTIVATION = CLEAN/FAIL

## ADR IMPACT

For ADR-0027 and ADR-0028 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0006, ADR-0016 and ADR-0017 remain later-owned.

State explicitly whether any accepted P1.4/P1.5 ADR must reopen.

## P1.7 READINESS

Choose:

`READY AFTER P1.6 FINAL CHECKPOINT`

or

`NOT READY`

---

# 20. Final question

After this remediation, is any load-bearing P1.6 choice still ambiguous enough that P1.7 or later implementation must decide which addressees/channels satisfy a communication condition, what time that condition becomes effective, whether a qualifying observation itself completes effect, whether a reference is reconstruction-safe, or whether exact message content/evidence materialization semantics can change historical truth?

A clean PASS is appropriate only if the answer is NO.
