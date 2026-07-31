# P1.6 — Claude Round 1 Remediation v0.1

**Date:** 2026-07-31  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent audit:** `audits/P1_6_CLAUDE_ROUND_1_VERDICT_V0_1.md`  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close:

- BL-P16-04 — Pattern B qualifying-observation quantification over addressees/channels;
- W-30 — mandatory core of ReconstructionAnchorTest;
- W-31 — deemed-service/governed offsets;
- W-32 — recognition of already-effective communication-gated facts after current-state change;
- W-33 — load-bearing MessageEnvelope body identity;
- W-34 — policy/default for local materialization of otherwise valid external anchors.

These clauses supersede affected current candidate wording where inconsistent.

---

# 2. R09 — CommunicationSatisfactionRule

Every `COMMUNICATION_GATED_EFFECTIVENESS` domain profile must bind a versioned **CommunicationSatisfactionRule** before the pre-effective basis is issued.

The rule freezes, as applicable:

1. exact pre-effective domain basis/version;
2. exact Transmittal/communication scope;
3. immutable required addressee set or a deterministic addressee-set rule resolved/frozen at issue;
4. qualifying observation type;
5. addressee quantifier;
6. channel quantifier;
7. allowed/required channel set where relevant;
8. observation-satisfaction/effective-time rule, including governed offset/calendar/timezone where applicable;
9. effect-completion mode;
10. governing policy/contract/config version.

A later change in recipients, channels or service policy cannot silently change the rule for an already-issued pre-effective basis.

---

# 3. R10 — closed addressee quantifiers

`AddresseeQuantifier` is exactly one of:

## `ALL_REQUIRED_ADDRESSEES`

One global domain effectiveness condition is satisfied only when every addressee in the frozen required-addressee set has satisfied the qualifying observation under the bound channel rule.

One unsatisfied required addressee prevents global satisfaction.

## `ANY_REQUIRED_ADDRESSEE`

One global domain effectiveness condition is satisfied when at least one addressee in the frozen required-addressee set satisfies the qualifying observation under the bound channel rule.

This mode is permitted only when the governing domain/contract rule expressly says any one required addressee is sufficient. It is never inferred merely because one delivery succeeded.

## `PER_ADDRESSEE_INDEPENDENT`

Effectiveness is independently evaluated for each addressee.

The owning domain records addressee-scoped effectiveness/relationship state rather than one silently global effective event.

An addressee that has not satisfied the rule remains ineffective with respect to that addressee even if others have satisfied it.

A later aggregate view may derive `all effective`, `some effective` or equivalent status but does not replace the addressee-scoped truth.

No other implicit addressee quantifier exists.

---

# 4. R11 — closed channel quantifiers

`ChannelQuantifier` is exactly one of:

## `DESIGNATED_CHANNEL_ONLY`

For each addressee evaluated under the addressee quantifier, only the bound designated channel/occurrence class may satisfy the rule.

A successful alternative channel does not substitute.

## `ANY_ALLOWED_CHANNEL`

For each addressee evaluated under the addressee quantifier, the first qualifying observation on any channel in the frozen allowed-channel set satisfies that addressee's channel condition.

This supports cases such as email bounce but successful portal delivery where the governing rule permits either channel.

## `ALL_REQUIRED_CHANNELS`

For each addressee evaluated under the addressee quantifier, every channel in the frozen required-channel set must satisfy the qualifying observation.

A successful observation on only one channel is insufficient.

No other implicit channel quantifier exists.

---

# 5. R12 — satisfaction-time derivation

P1.6 communication facts remain observations; the owning domain profile derives the satisfaction/effective time using the frozen CommunicationSatisfactionRule.

Define the qualifying **addressee satisfaction time**:

- `DESIGNATED_CHANNEL_ONLY` → qualifying observation time on the designated channel;
- `ANY_ALLOWED_CHANNEL` → earliest qualifying observation among allowed channels for that addressee;
- `ALL_REQUIRED_CHANNELS` → latest qualifying observation among all required channels for that addressee.

Then define the **rule satisfaction time**:

- `ALL_REQUIRED_ADDRESSEES` → latest addressee satisfaction time among all required addressees;
- `ANY_REQUIRED_ADDRESSEE` → earliest addressee satisfaction time that satisfies the rule;
- `PER_ADDRESSEE_INDEPENDENT` → each addressee retains its own satisfaction time.

A domain profile may bind an explicit `CommunicationEffectTimeRule`:

- `AT_SATISFACTION_TIME`; or
- `AFTER_GOVERNED_OFFSET`.

For `AFTER_GOVERNED_OFFSET`, the bound rule defines the offset/duration and any required business-calendar/timezone semantics.

This supports deemed-service rules without creating a third communication-effectiveness pattern.

Upload/capture time cannot substitute for the qualifying observation time unless the governing channel/domain rule explicitly says it does.

---

# 6. R13 — tender/addendum fairness example

Tender addendum issued to eight bidders through email and portal.

If the governing profile intends one common effective tender basis and either email or portal delivery is sufficient for each bidder, bind:

- `AddresseeQuantifier = ALL_REQUIRED_ADDRESSEES`;
- `ChannelQuantifier = ANY_ALLOWED_CHANNEL`;
- required addressee set = the eight frozen applicable TenderParticipants;
- allowed channels = EMAIL, PORTAL;
- qualifying observation = DELIVERY_RECEIPT (or other exact contract rule).

One email bounce does not defeat the bidder if portal delivery qualifies.

The addendum does not become globally effective until every required bidder has at least one qualifying channel observation.

If the contract/process instead allows per-bidder effectiveness, the profile must explicitly use `PER_ADDRESSEE_INDEPENDENT`; the system may not infer that behavior from partial delivery.

---

# 7. R14 — effect-completion mode inside Pattern B

Pattern B remains `COMMUNICATION_GATED_EFFECTIVENESS`, but the owning domain profile must declare one of two completion modes.

## `OBSERVATION_COMPLETES_EFFECT`

Use when the pre-effective basis already contains the final authorized business decision/instruction and the governing rule says the qualifying communication condition itself completes effectiveness.

Semantics:

1. pre-effective basis is authorized under the governing authority/policy version before issue;
2. qualifying communication observation(s) satisfy the frozen CommunicationSatisfactionRule;
3. business effectiveness becomes true deterministically at the derived effective time;
4. the owning-domain recorder/service persists/reconciles that truth idempotently even if recording occurs later;
5. later revocation of the original actor's membership/delegation or unrelated current-state change cannot make the system deny an effect that already became true under the previously authorized basis + governing communication rule;
6. if delayed recording encounters a control/data inconsistency, preserve an explicit control/reconciliation variance and historical effective time; do not falsify history by pretending the effect never occurred;
7. no new discretionary human authority is required merely to recognize the already-effective fact.

Current security still governs any new discretionary action taken after that point.

## `OBSERVATION_ENABLES_FINAL_ACTION`

Use when the communication observation satisfies only one prerequisite and a new discretionary owning-domain action is still required before effectiveness.

Semantics:

- qualifying observation alone does not make the event effective;
- the subsequent domain command checks current authority/security/invariants;
- final domain effect occurs only when that command succeeds under the governing rule.

The profile cannot claim earlier automatic effectiveness under this mode.

This distinction prevents an asynchronous recorder from falsifying a contractually effective dispatch while preserving current-authority checks for genuinely new discretionary decisions.

---

# 8. R15 — addressee-scoped effect truth

When `AddresseeQuantifier = PER_ADDRESSEE_INDEPENDENT`:

- the owning domain must represent the effective relation/state at addressee scope;
- each addressee has its own satisfaction/effective time under the bound channel/time rule;
- a single global `effective=true` cannot overwrite or hide mixed addressee states;
- any aggregate/global projection is derived and must state its aggregation semantics.

P1.6 supplies addressee/channel observations and satisfaction evidence; it does not own the business effect itself.

---

# 9. R16 — ReconstructionAnchorTest mandatory core (W-30)

For a load-bearing external `SOURCE_BASIS`, the ReconstructionAnchorTest has a mandatory core.

The following are **always required**:

1. identifiable authoritative external source/system;
2. identifiable external object/record;
3. exact immutable or historically addressable version/revision identity;
4. source semantics proving that the identified version is not merely an alias/pointer to current mutable content.

If items 3 or 4 are absent, the external reference FAILS the test regardless of other metadata.

Additional properties remain required where material to the relied-on fact/context, including source principal/authority, SourceLocator, effective/source context, observed/fetched time, freshness/conflict state and supported retrieval/reference path.

A connector cannot self-declare an ID “versioned”; its source semantics must demonstrate historical version addressability.

---

# 10. R17 — MessageEnvelope body is bindable evidence (W-33)

Where a MessageEnvelope body is load-bearing, the exact body content must resolve to an immutable EvidenceVersion or exact content-bearing member version with its own ContentIdentity/integrity semantics.

RelianceBinding may bind:

`MessageEnvelope`
`→ body EvidenceVersion`
`→ SourceLocator within body where needed`.

Example:

A supplier email body states “Our revised total is AED 850,000, VAT excluded” with no attachment.

If relied on, the exact message body/version + source attribution + relevant body locator can become SOURCE_BASIS.

The transport envelope/header alone is not a substitute for the content version.

Attachments remain separately identifiable EvidenceVersions.

---

# 11. R18 — governed external evidence materialization policy (W-34)

Passing ReconstructionAnchorTest establishes that an external exact-version anchor is semantically sufficient for reconstruction while its valid source-access/retention basis exists.

Whether the OS also keeps an immutable local evidentiary capture is an explicit versioned **ExternalEvidenceMaterializationPolicy**, not an implementation accident.

Closed modes:

## `ANCHOR_ONLY`

Retain the reconstruction-safe external anchor/reference without local payload duplication.

This is the **default for externally authoritative evidence that passes ReconstructionAnchorTest**, preserving the P1.3/P1.4 boundary against becoming a full CDE mirror.

## `ANCHOR_PLUS_LOCAL_CAPTURE`

Retain the exact external anchor plus immutable local evidentiary capture when the deployment/domain risk profile requires stronger long-term reconstruction resilience and capture is permitted.

## `LOCAL_CAPTURE_REQUIRED`

Use when exact local evidence capture is a governing product/contract/legal/domain requirement, or when the external source cannot pass ReconstructionAnchorTest but a permitted local capture can satisfy the load-bearing evidence requirement.

If local capture is prohibited and the external source fails ReconstructionAnchorTest, the evidence dependency remains unresolved/blocked.

The policy may be bound by evidence category/domain/deployment profile but cannot silently change historical RelianceBindings.

Exact OS-issued supplier-facing artifacts remain product-governed exact issued evidence regardless of this external-source materialization policy.

---

# 12. R19 — no CDE gravity from local capture policy

`ANCHOR_PLUS_LOCAL_CAPTURE` and `LOCAL_CAPTURE_REQUIRED` are evidence-resilience modes, not a mandate to mirror an external repository hierarchy, permissions, workflow, full document estate or version history.

Only in-scope evidence versions required by the governed transaction/evidence policy are captured.

A0–A3 remains deployable without a CDE connector.

---

# 13. Blocker/watch closure claim

- BL-P16-04 → CLOSED by R09–R15.
- W-30 → hardened by R16.
- W-31 → hardened by R12.
- W-32 → hardened by R14.
- W-33 → hardened by R17.
- W-34 → hardened by R18–R19.

No P1.4/P1.5 decision is reopened.

P1.6 remains ACTIVE pending integrated v0.3 + internal recheck + Claude round 2.
