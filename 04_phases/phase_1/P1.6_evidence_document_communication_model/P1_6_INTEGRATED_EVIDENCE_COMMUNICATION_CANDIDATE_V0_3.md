# P1.6 — Integrated Evidence, Document & Communication Candidate v0.3

**Date:** 2026-07-31  
**Status:** POST-CLAUDE-ROUND-1 REMEDIATED CANDIDATE / INTERNAL RECHECK REQUIRED  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Current precedence

Current P1.6 candidate semantics are:

1. `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_2.md` for unchanged clauses;
2. `P1_6_CLAUDE_ROUND_1_REMEDIATION_V0_1.md` for communication quantification, deemed-service/effect-time, effect completion, anchor mandatory-core, message-body evidence and external materialization policy;
3. underlying evidence/document/communication/retention/hash/action/reconstruction artifacts for supporting detail.

No ADR status changes occur before external PASS.

---

# 2. CommunicationSatisfactionRule is mandatory for Pattern B

Every `COMMUNICATION_GATED_EFFECTIVENESS` profile binds a versioned CommunicationSatisfactionRule before issue.

It freezes:

- pre-effective domain basis/version;
- exact Transmittal/communication scope;
- required addressee set or deterministic addressee-set rule resolved/frozen at issue;
- qualifying observation type;
- addressee quantifier;
- channel quantifier;
- allowed/required channel set;
- effect-time rule and offset/calendar/timezone where applicable;
- effect-completion mode;
- governing policy/contract/config version.

Later participant/channel/config change cannot silently modify an already-issued rule.

---

# 3. Closed addressee quantifier

Exactly one:

## `ALL_REQUIRED_ADDRESSEES`

Global satisfaction occurs only when every frozen required addressee satisfies the qualifying observation under the bound channel rule.

## `ANY_REQUIRED_ADDRESSEE`

Global satisfaction occurs when at least one frozen required addressee satisfies the rule.

This is valid only when the governing domain/contract semantics explicitly permit any one addressee to satisfy the condition.

## `PER_ADDRESSEE_INDEPENDENT`

Satisfaction/effectiveness is evaluated independently for each addressee.

The owning domain records addressee-scoped effective state/time.

A single global effective flag cannot erase mixed addressee states.

Aggregate states are derived projections only.

No implicit fourth mode exists.

---

# 4. Closed channel quantifier

Exactly one:

## `DESIGNATED_CHANNEL_ONLY`

Only the bound designated channel can satisfy the addressee condition.

## `ANY_ALLOWED_CHANNEL`

The earliest qualifying observation on any frozen allowed channel satisfies the addressee condition.

## `ALL_REQUIRED_CHANNELS`

Every frozen required channel must satisfy; the addressee satisfaction time is the latest qualifying observation across those channels.

No implicit channel fallback exists.

---

# 5. Satisfaction/effective-time derivation

Per addressee:

- DESIGNATED_CHANNEL_ONLY → designated-channel qualifying observation time;
- ANY_ALLOWED_CHANNEL → earliest qualifying observation across allowed channels;
- ALL_REQUIRED_CHANNELS → latest qualifying observation across required channels.

Across addressees:

- ALL_REQUIRED_ADDRESSEES → latest required-addressee satisfaction time;
- ANY_REQUIRED_ADDRESSEE → earliest addressee satisfaction time satisfying the rule;
- PER_ADDRESSEE_INDEPENDENT → each addressee retains its own satisfaction time.

The domain profile binds one effect-time rule:

- `AT_SATISFACTION_TIME`; or
- `AFTER_GOVERNED_OFFSET`.

A governed offset binds the required duration and business-calendar/timezone semantics where applicable.

This supports deemed-service semantics without inventing a third Pattern-B lifecycle.

---

# 6. Pattern-B completion mode

The profile also binds one completion mode.

## `OBSERVATION_COMPLETES_EFFECT`

The pre-effective basis already contains the final authorized business decision/instruction and the governing rule says the communication condition itself completes effectiveness.

When the CommunicationSatisfactionRule is satisfied:

- effectiveness becomes true deterministically at the derived effective time;
- owning-domain persistence/reconciliation may occur asynchronously but cannot deny the already-effective fact because membership/delegation/current state changed after the qualifying observation;
- delayed recorder failure creates a control/reconciliation variance and preserves the historical effective time;
- no new discretionary human authority is required merely to recognize what already became effective.

Current security still governs all new discretionary actions after effectiveness.

## `OBSERVATION_ENABLES_FINAL_ACTION`

The communication condition is only a prerequisite.

A new discretionary owning-domain command remains required.

That command checks current authority/security/invariants and only then creates effectiveness.

The observation alone cannot be backdated into automatic effect under this mode.

---

# 7. Tender multi-channel example

Eight applicable bidders must receive one addendum and either email or portal delivery is contractually sufficient.

Bind:

- addressee set = exact eight applicable TenderParticipants at issue;
- AddresseeQuantifier = ALL_REQUIRED_ADDRESSEES;
- ChannelQuantifier = ANY_ALLOWED_CHANNEL;
- allowed channels = EMAIL + PORTAL;
- qualifying observation = DELIVERY_RECEIPT;
- effect-time rule according to governing tender policy.

A bounced email is rescued by a qualifying portal delivery for that same bidder.

The global rule does not satisfy until each required bidder has at least one qualifying allowed-channel observation.

If the process genuinely permits different effective times per bidder, that must be explicitly `PER_ADDRESSEE_INDEPENDENT`; partial delivery cannot silently create it.

---

# 8. ReconstructionAnchorTest mandatory core

For every load-bearing external SOURCE_BASIS, these are mandatory:

1. identifiable authoritative external source/system;
2. identifiable object/record;
3. exact immutable or historically addressable version/revision identity;
4. source semantics proving the version is not merely an alias/pointer to current mutable content.

Items 3 and 4 can never be waived as “not applicable”.

If absent, the external reference fails ReconstructionAnchorTest.

Other source principal, locator, effective context, observed time, freshness/conflict and retrieval properties are required when material to the relied-on fact/context.

---

# 9. Message body is exact bindable evidence

When a MessageEnvelope body is load-bearing, exact body content resolves to immutable EvidenceVersion or exact content-bearing member version with its own content/integrity identity.

RelianceBinding can point to:

`MessageEnvelope → body EvidenceVersion → SourceLocator`.

A commercial statement existing only in email/message body is therefore reconstructable without inventing an attachment.

Headers/envelope alone do not substitute for the exact relied-on message content.

---

# 10. ExternalEvidenceMaterializationPolicy

A passing ReconstructionAnchorTest is sufficient external-source version identity.

Local duplication is an explicit versioned policy choice with exactly three modes:

## `ANCHOR_ONLY`

Default for externally authoritative evidence that passes ReconstructionAnchorTest.

Store/rely on the exact reconstruction-safe external anchor without locally duplicating payload.

## `ANCHOR_PLUS_LOCAL_CAPTURE`

Keep the exact external anchor plus immutable local evidentiary capture where the risk/deployment/domain profile requires stronger resilience and capture is permitted.

## `LOCAL_CAPTURE_REQUIRED`

Require exact local capture because the governing policy requires it or because external version semantics fail ReconstructionAnchorTest but permitted local capture can satisfy the evidence requirement.

If external anchor fails and capture is prohibited, the dependency remains unresolved/blocked.

This policy applies only to in-scope evidence versions and does not mirror external repository hierarchy, full version estate, permissions or workflow.

Exact OS-issued supplier-facing artifacts remain product-governed issued evidence regardless of this policy.

---

# 11. Existing P1.6 semantics preserved

Unchanged candidate decisions remain:

- EvidenceRecord/EvidenceVersion/ContentIdentity/occurrence separation;
- immutable historical RelianceBinding;
- SourcePrincipalRef + PrincipalAttributionBasis;
- electronic vs physical/offline source distinction;
- SourceLocator exactness;
- integrity/hash exact-representation semantics + algorithm agility;
- document roles and load-bearing freeze trigger;
- revision/supersession/addendum/replacement/withdrawal/corrected-reissue relations;
- immutable exact PRODUCT_ISSUED artifacts/packs;
- signature/seal/timestamp/delivery evidence ≠ business authority;
- Transmittal/MessageEnvelope/CommunicationOccurrence/ThreadContext separation;
- issue/dispatch/delivery/read/receipt-ack/content-response/domain-effect separation;
- duplicate/multi-channel provenance;
- DerivedObservation/AI-source separation;
- classification ≠ authorization;
- retention/preservation/access/redaction/disposition separation;
- post-termination/export/residency boundaries;
- EA-001–EA-026 bounded evidence actions;
- P01–P12 reconstruction matrix;
- A0–A3 minimal activation;
- P07 sole-XL guard.

---

# 12. Current candidate ADR posture

No status changes yet.

Internal candidate:

- ADR-0027 remains semantically accepted in substance by Claude Round 1 but not formally reconciled until P1.6 closure;
- ADR-0028 becomes acceptable only if BL-P16-04 remediation survives internal and external re-audit.

Later-owned remain:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

---

# 13. Recheck claims to test

- BL-P16-04 CLOSED by frozen addressee + channel quantifiers and addressee-scoped effect semantics;
- W-30 CLOSED by mandatory ReconstructionAnchorTest core;
- W-31 CLOSED by governed offset/effect-time rule;
- W-32 CLOSED by OBSERVATION_COMPLETES_EFFECT vs OBSERVATION_ENABLES_FINAL_ACTION;
- W-33 CLOSED by bindable message-body EvidenceVersion;
- W-34 CLOSED by explicit materialization policy/default.

P1.6 remains ACTIVE pending recheck and Claude Round 2.
