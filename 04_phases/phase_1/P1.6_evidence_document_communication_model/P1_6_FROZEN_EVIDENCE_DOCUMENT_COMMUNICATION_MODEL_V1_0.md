# P1.6 — Frozen Evidence, Document & Communication Model v1.0

**Date:** 2026-08-01  
**Status:** FROZEN SEMANTIC CONTRACT  
**P1.6:** PASS / CLOSED / FROZEN  
**Next:** P1.7 — Integration, Migration & API Contracts  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose and precedence

This is the controlling P1.6 semantic contract.

It consolidates and supersedes earlier P1.6 candidates/remediation wording where inconsistent.

P1.7+ may choose physical storage, APIs, events, connectors, synchronization, search/indexing, UI and runtime mechanisms only if they preserve this contract.

P1.6 does not choose:

- database/schema/ORM;
- object/blob storage;
- event-store/outbox/transaction technology;
- hash algorithm;
- email/CDE/signature provider;
- connector protocol;
- OCR/model stack;
- indexing/search implementation;
- UI layout;
- product code.

---

# 2. Governing boundary

P1.6 is a bounded shared substrate for evidence identity, provenance, documents, communication observations, integrity and lifecycle-of-evidence state.

It is not the owner of P01–P12/P09 business truth merely because it stores evidence used by those domains.

The frozen separation is:

1. **source evidence truth** — what a source principal/system issued, submitted, stated or made available;
2. **evidence/provenance/communication truth** — what exact version the OS captured, referenced, issued, validated, transmitted, received, retained, redacted or disposed;
3. **owning-domain truth** — what a bounded P01–P12/P09 action made authoritative.

Evidence may satisfy a domain guard.

Only the owning domain establishes, changes, corrects, withdraws or reverses its business event/effect.

No P1.6 action may directly emit, reverse, cancel, withdraw, retime or change a P07/commercial or other owning-domain effect.

---

# 3. Evidence identity model

## 3.1 EvidenceRecord

A durable tenant-scoped business-evidence identity/lineage.

It may represent a supplier quotation lineage, tender release, claim, signed agreement, delivery note, external approval, message or other supported evidence family.

EvidenceRecord does not itself mean current, valid, authentic, accepted or authoritative.

## 3.2 EvidenceVersion

An immutable identity for one exact captured/source/issued revision or content state of an EvidenceRecord.

A new load-bearing source revision/content state creates a new EvidenceVersion.

Historical EvidenceVersions remain separately identifiable while retained.

They are never edited in place to represent later source content.

## 3.3 ContentIdentity and IntegrityAssertion

Content/integrity identity is separate from business evidence identity.

An IntegrityAssertion identifies as applicable:

- exact EvidenceVersion/representation;
- method/scheme/algorithm and version;
- digest/reference;
- calculation/validation actor/system/time;
- external provider/source where applicable;
- validation/revalidation history.

Hash/content equality does not prove:

- same source principal;
- same submission/business occurrence;
- same revision lineage;
- same authority;
- factual truth;
- same business effect.

## 3.4 Exact representation boundary

Source bytes, normalized PDF, OCR text, rendered image, translation, extracted data and redacted copy are separately identifiable representations with explicit derivation/equivalence relationships.

No hidden canonicalization may be described as the source-content hash.

A newer integrity algorithm may add a new assertion to the same EvidenceVersion without changing source-version identity.

A missing original payload cannot receive a fabricated stronger “original” hash by hashing a derivative.

---

# 4. Source principal and attribution

Source principal is distinct from:

- capture/import actor;
- transport/service provider;
- authentication/login identity;
- buyer-on-behalf actor;
- later evaluator/approver;
- content recipient.

Where attribution is load-bearing, preserve an explicit PrincipalAttributionBasis such as:

- `AUTHENTICATED_DIRECT`;
- `AUTHORIZED_REPRESENTATIVE`;
- `SYSTEM_ATTESTED`;
- `BUYER_ON_BEHALF_ASSERTED`;
- `UNVERIFIED_ASSERTION`.

These classify attribution provenance, not legal/business authority to bind a party.

The owning domain determines whether the attribution basis is sufficient for its action.

An email `From` address/header alone is not authenticated supplier identity.

Buyer-on-behalf capture preserves internal actor, represented party, source channel/evidence and later supplier confirmation separately where required.

---

# 5. Electronic and physical/offline sources

Evidence may originate electronically or through physical/offline media.

A scan/photo is a captured digital representation with its own content/integrity identity.

Hashing a scan proves the captured scan representation, not:

- the physical original;
- present custody/location;
- continued existence;
- business acceptance.

Where physical-original custody/location is load-bearing, preserve a bounded custody observation/reference with holder/location/time/transfer evidence as applicable.

P1.6 does not create general physical records management.

No universal paper-original requirement is asserted.

---

# 6. Capture and business deduplication

## 6.1 CaptureObservation

One EvidenceVersion may have multiple channel/path capture observations.

The same supplier version received through email and portal can remain one EvidenceVersion with multiple occurrences where equivalence is proven.

## 6.2 Content equality does not merge histories

Identical bytes submitted by different suppliers, contexts or occurrences remain distinct evidentiary histories.

## 6.3 Correlation/deduplication basis

Business equivalence may use a combination of:

- tenant/project/transaction context;
- source principal;
- provider/source message or object IDs;
- source document/revision ID;
- transmittal/correlation ID;
- content identity;
- timestamps;
- explicit source/system confirmation;
- governed reconciliation.

Filename, subject, visual similarity or hash alone is insufficient.

Where equivalence is uncertain, preserve both occurrences and explicit ambiguity rather than silently deleting one.

---

# 7. Evidence lineage and relationships

EvidenceVersion membership in one EvidenceRecord lineage requires supported source/business relationship evidence or governed classification, such as:

- source revision family;
- explicit supersession/replacement;
- provider-native version lineage;
- issued predecessor/addendum relationship;
- bounded authorized reconciliation.

Incorrect lineage assignment is corrected history-preservingly.

Supported bounded relationships include:

- `REVISION_OF`;
- `SUPERSEDES`;
- `ADDENDUM_TO`;
- `REPLACES`;
- `WITHDRAWS`;
- `CORRECTED_REISSUE`;
- `EQUIVALENT_REPRESENTATION_OF`.

“Current/latest/operative” is a projection under a declared context, not editable truth.

A later supplier revision may be latest while an earlier exact revision remains the governing award/Commitment basis.

---

# 8. SourceLocator and exact reconstruction

A SourceLocator identifies where relied-on information exists within or outside an EvidenceVersion.

Supported media-specific locators may include:

- external system/object/version;
- document revision;
- page/sheet/section/paragraph/table/cell/line;
- attachment/member;
- visual/geometric region;
- external URL/path as auxiliary context;
- source/effective/observed context.

One universal locator syntax is not required.

Typed/versioned locator semantics are required.

When a governed value/decision depends on specific source content, the historical binding identifies the source at sufficient precision for supported reconstruction.

OCR/normalized/rendered locations do not silently replace original source locations.

---

# 9. EvidenceBinding and immutable RelianceBinding

## 9.1 EvidenceBinding

A product-supported typed relationship between evidence and another evidence/domain action.

Bounded roles include:

- `SOURCE_BASIS`;
- `ISSUED_OUTPUT`;
- `SUPPORTING_EVIDENCE`;
- `VALIDATION_EVIDENCE`;
- `CORRECTION_EVIDENCE`;
- `TRANSMISSION_EVIDENCE`;
- `ANCILLARY_REFERENCE`.

This is not an arbitrary tenant knowledge graph.

## 9.2 RelianceBinding

Once an effective load-bearing domain fact/event/decision relies on evidence, preserve an immutable historical RelianceBinding identifying as applicable:

- exact domain fact/event/decision;
- exact EvidenceVersion;
- exact SourceLocator;
- binding role;
- source principal/attribution context;
- governing authority/policy/config version;
- relied-on/effective context;
- action/audit provenance.

Later source revision cannot update this historical binding.

A corrected/re-evaluated domain event creates new bindings while preserving the original claim/history.

Non-load-bearing convenience links remain distinguishable from effective RelianceBinding.

PRODUCT_ISSUED outputs bind immutably to the issue/domain action that produced them.

---

# 10. External ReconstructionAnchorTest

A load-bearing external `SOURCE_BASIS` must pass the ReconstructionAnchorTest.

Mandatory non-waivable core:

1. identifiable authoritative external source/system;
2. identifiable object/record;
3. exact immutable or historically addressable version/revision identity;
4. source semantics proving the identified version is not an alias/pointer to current mutable content.

A stable object ID that always resolves current content fails.

A mutable URL/path/current-state token fails unless its source semantics meet the exact-version test.

Other required context where material includes:

- source principal/authority;
- SourceLocator;
- source/effective context;
- observed/fetched time;
- freshness/conflict state;
- supported retrieval/reference path while the valid source-access/retention basis exists.

If the external source fails the test, permitted immutable local capture is required for load-bearing exact reconstruction.

If neither a passing anchor nor permitted local capture exists, the evidence dependency remains unresolved and cannot satisfy the owning-domain guard.

Later legitimate external unavailability/disposition does not rewrite the historically valid reliance; it changes availability/reconstruction-limit evidence only.

---

# 11. ExternalEvidenceMaterializationPolicy

For in-scope external evidence, exact versioned policy selects one:

## `ANCHOR_ONLY`

Default where an externally authoritative source passes ReconstructionAnchorTest.

No local payload duplication is required merely because the source is external.

## `ANCHOR_PLUS_LOCAL_CAPTURE`

Preserve exact passing anchor plus immutable local evidence copy where risk/domain/deployment policy requires stronger resilience and capture is permitted.

## `LOCAL_CAPTURE_REQUIRED`

Require local immutable capture where policy requires it or where an external source fails the anchor test but a permitted capture can satisfy reconstruction.

If anchor fails and local capture is prohibited/unavailable, the dependency remains unresolved.

These modes do not mirror an external repository’s hierarchy, full version estate, permissions or workflows.

Exact OS-issued supplier-facing artifacts remain product-governed issued evidence independently of this policy.

---

# 12. Document roles and freeze trigger

Semantic document roles:

- `WORKING_DRAFT`;
- `SOURCE_CAPTURED`;
- `PRODUCT_GENERATED`;
- `PRODUCT_ISSUED`;
- `DERIVED_REPRESENTATION`.

P1.6 does not require immutable storage of every keystroke/autosave.

Before or atomically with a P1.4 load-bearing trigger—submission acceptance, issue, recommendation/approval reliance, award/Commitment/change/certification reliance, handoff or equivalent—the exact relied-on state becomes immutable EvidenceVersion history.

A PRODUCT_GENERATED representation is not automatically issued or authoritative.

A PRODUCT_ISSUED version is the exact immutable counterparty-facing artifact/member set for that issue.

Regeneration later using current template/master/config/date does not recreate the historical issue.

---

# 13. Issued packs, addenda and reissue

A formal issued pack/Transmittal freezes:

- exact member EvidenceVersions;
- roles/order;
- issue context;
- issuer/domain action;
- intended addressees;
- issue time/reference.

Updating any member after issue requires a new issue/addendum/reissue as applicable.

An addendum binds the exact base release/version(s) it modifies.

Withdrawal/cancellation/voiding remains a separate historical fact and never makes the original issue disappear.

Source-document revision is not domain correction.

Correcting document text cannot substitute for an owning-domain correction when the underlying business truth changes.

---

# 14. Signature, seal, timestamp and delivery validation

Validation evidence binds the exact EvidenceVersion or CommunicationOccurrence it covers.

It cannot float to a later revision.

The architecture separates:

- integrity;
- authenticity/attribution;
- business authority;
- factual truth.

A cryptographically valid signature may belong to a person lacking authority for the business action.

A valid external signature never satisfies internal P09 approval by itself.

P1.6 can reference qualified/reliable signatures, seals, timestamps and delivery services without requiring them for every transaction or becoming a trust-service platform.

---

# 15. Communication model

## 15.1 Transmittal

A channel-neutral formal issue envelope binding exact artifact/member versions, issuer/domain action, intended addressees, purpose/context, issue time/reference and response/acknowledgment requirements where applicable.

Transmittal is not delivery, acknowledgment or acceptance.

## 15.2 MessageEnvelope

An exact in-scope message communication unit preserving as applicable:

- sender/source assertion and attribution basis;
- addressees;
- channel/provider context and IDs;
- source sent-time assertion;
- observed receive/capture time;
- exact body EvidenceVersion/content-bearing member;
- attachments/member EvidenceVersions;
- reply/forward/thread relations;
- transport/validation evidence.

Where message body is load-bearing, RelianceBinding may bind:

`MessageEnvelope → exact body EvidenceVersion → SourceLocator`.

Headers/envelope do not substitute for body content.

## 15.3 CommunicationOccurrence

One channel-specific send, receive, post, import or capture occurrence.

One Transmittal may have multiple occurrences across channels.

## 15.4 ThreadContext

A convenience grouping only.

It is not transaction identity, business lifecycle or authority.

---

# 16. Distinct communication facts

P1.6 keeps distinct:

1. issue/send intent;
2. dispatch/send observation;
3. delivery/receipt observation;
4. read/open observation;
5. acknowledgment of receipt;
6. substantive content response/assertion/agreement evidence;
7. owning-domain acceptance/effectiveness.

No fact implies another.

Acknowledgment of receipt does not mean acknowledgment/agreement to content.

Message text such as “approved” is source evidence until the owning domain validates principal, authority, rule, current state and emits its event.

---

# 17. Communication effectiveness patterns

Every owning-domain profile uses exactly one:

## Pattern A — `EFFECTIVE_THEN_NOTIFY`

The owning-domain event becomes effective under its own guards first.

P1.6 freezes/issues/communicates the exact resulting artifact afterward.

Transport failure does not silently reverse the event.

Any business correction/withdrawal remains an owning-domain action.

## Pattern B — `COMMUNICATION_GATED_EFFECTIVENESS`

The owning domain first creates/authorizes an immutable pre-effective basis containing sufficient final content/identity/number/authority to issue the artifact without asserting final effect.

P1.6 freezes the exact EvidenceVersion/Transmittal and records the required communication evidence.

The owning domain then establishes or permits the effect according to the frozen CommunicationSatisfactionRule and completion mode.

No hidden third pattern exists.

---

# 18. CommunicationSatisfactionRule

Every Pattern-B basis binds an exact versioned rule before issue.

The rule freezes:

- pre-effective basis/version;
- Transmittal/communication scope;
- immutable required addressee set;
- addressee quantifier;
- channel quantifier;
- allowed/required channel set;
- terminal qualifying observation type;
- explicit prerequisite-observation set where required;
- satisfaction-time derivation;
- effect-time rule;
- offset/calendar/timezone version where applicable;
- completion mode;
- governing contract/policy/config/authority version.

No omitted quantifier/default is valid.

Once the basis is issued or communication begins, the rule cannot be amended in place.

Required change uses owning-domain withdrawal/cancellation/supersession, a new pre-effective basis/rule/artifact and reissue.

---

# 19. Addressee and channel quantifiers

## Addressee quantifier — exactly one

- `ALL_REQUIRED_ADDRESSEES` — one global condition satisfies only when every frozen required addressee satisfies;
- `ANY_REQUIRED_ADDRESSEE` — one global condition satisfies on the first required addressee only where governing semantics explicitly permit any one to suffice;
- `PER_ADDRESSEE_INDEPENDENT` — satisfaction/effect/action is addressee-scoped; aggregate none/some/all is projection only.

## Channel quantifier — exactly one

- `DESIGNATED_CHANNEL_ONLY`;
- `ANY_ALLOWED_CHANNEL`;
- `ALL_REQUIRED_CHANNELS`.

No implicit fallback channel exists.

---

# 20. Satisfaction-time and offset semantics

Per addressee:

- designated channel → its qualifying observation time;
- any allowed channel → earliest qualifying allowed-channel time;
- all required channels → latest qualifying time across required channels.

Across addressees:

- all required addressees → latest addressee satisfaction time;
- any required addressee → earliest satisfying addressee time;
- per-addressee independent → separate satisfaction time per addressee.

Effect-time rule is exactly:

- `AT_SATISFACTION_TIME`; or
- `AFTER_GOVERNED_OFFSET`.

A governed offset binds an exact versioned load-bearing calendar/time artifact as applicable:

- calendar identity/version;
- timezone/basis;
- working/non-working days;
- holiday/exceptions set/version;
- cutoff/day-boundary rule;
- duration/unit;
- governing contract/policy source;
- calculation/effective-time provenance.

Later calendar/config changes cannot alter an issued pending rule or an established historical event.

---

# 21. Terminal and prerequisite observations

A rule may bind:

- one terminal qualifying observation type used for satisfaction time; and
- a closed explicit prerequisite-observation set.

No communication fact is inferred from another.

A rule requiring both delivery and written acknowledgment must explicitly require both.

Acknowledgment as terminal does not itself prove delivery.

---

# 22. Completion modes

## `OBSERVATION_ENABLES_FINAL_ACTION`

Communication satisfaction is one prerequisite only.

A later discretionary owning-domain command checks current authority/security/invariants and creates the event if still permitted.

Communication cannot create/backdate the effect.

With `PER_ADDRESSEE_INDEPENDENT`, the enabled action is addressee-scoped unless the domain defines a separate bounded aggregate action.

## `OBSERVATION_COMPLETES_EFFECT`

Use only where the pre-effective basis already contains the final authorized business decision/instruction and the governing rule says communication satisfaction completes effectiveness.

Communication evidence does not itself become the business writer.

Instead, first accepted satisfaction freezes a CommunicationSatisfactionSnapshot that is consumed by one idempotent bounded owning-domain establishment operation/event.

---

# 23. CommunicationSatisfactionSnapshot

At the first observation set accepted as satisfying the frozen rule under its then-governing admissibility/validation criteria, preserve an immutable snapshot binding:

- pre-effective basis/version;
- CommunicationSatisfactionRule version;
- required addressee scope;
- exact qualifying/prerequisite observation identities/versions;
- admissibility/validation state relied on at evaluation time;
- addressee/channel satisfaction derivation;
- satisfaction time;
- governed offset/calendar/timezone derivation;
- candidate effective time;
- snapshot/evaluation action identity/time;
- evidence/config/authority provenance.

“Accepted” means the evidence met the rule’s then-bound admissibility criteria.

It does not mean the evidence is guaranteed never to be challenged or disproved later.

The snapshot is evidence/control history, not the final business event.

---

# 24. Established-once domain invariant

The owning-domain establishment operation consumes the immutable CommunicationSatisfactionSnapshot, not the current observation projection.

One owning-domain event/effect is established with:

- stable logical establishment identity;
- exact snapshot/pre-effective basis;
- historical effective time;
- governing authority/policy/config/calendar versions;
- domain event/recorded time separately.

The event is established once.

It is not a live function over current P1.6 evidence.

Duplicate callbacks, connector replay, retries or concurrent channels cannot create duplicate effects.

Physical persistence may be synchronous or delayed; later technology must make the already-established event idempotently recoverable.

---

# 25. Evidence correction/retraction after satisfaction

Later:

- provider callback retraction;
- observation correction/invalidation;
- fraud/authenticity challenge;
- duplicate reconciliation;
- late earlier/later evidence;
- connector replay;
- source-system restatement;

creates contradictory/corrective evidence history.

It cannot automatically:

- recompute whether the owning-domain event exists;
- reverse/cancel/withdraw it;
- move its effective time;
- rewrite its original snapshot/RelianceBinding.

Any business consequence requires a bounded owning-domain correction, withdrawal, supersession, reissue or re-evaluation action with history preserved.

Late evidence never silently backdates or forward-dates the event.

---

# 26. Crash/retry and concurrent evaluation

If a snapshot is frozen at T, a crash delays domain persistence, and contradictory evidence arrives before retry:

- the owning-domain establishment consumes the frozen snapshot;
- the event is recorded with historical effective time T/offset result;
- the contradiction is simultaneously preserved as variance/corrective evidence;
- the owning domain decides any correction consequence.

Concurrent candidate evaluations use the stable establishment identity and deterministic frozen-rule ordering to bind exactly one canonical causal snapshot or one canonical composite snapshot.

Non-canonical competing evaluations remain evidence/control history and cannot create additional effects.

---

# 27. Pending basis and establishment disposition

A pre-effective basis that has not satisfied remains pending.

P1.6 must expose, not merely optionally calculate:

- current unresolved satisfaction status;
- missing required addressees/channels/prerequisites;
- failure/bounce/negative observations;
- aging under the frozen rule/calendar where applicable;
- whether a satisfaction snapshot exists;
- whether owning-domain establishment occurred;
- establishment disposition/status where no event exists.

This visibility supports the owning domain/process.

It does not authorize P1.6 to auto-lapse, auto-withdraw, drop addressees, change quantifiers, infer fallback channels or create timeout-based business effect.

A snapshot may legitimately remain as historical evidence that communication satisfaction was accepted even when no final domain event is established.

The snapshot’s disposition records as applicable:

- establishment pending;
- established;
- blocked by owning-domain lifecycle/invariant;
- basis withdrawn/cancelled/superseded before establishment;
- correction/reconciliation required.

The snapshot itself remains non-domain evidence.

---

# 28. Withdrawal before establishment / future offset

If the owning domain validly withdraws, cancels or supersedes the pre-effective basis before the final domain event is established—especially before a future `AFTER_GOVERNED_OFFSET` effective time—the owning-domain lifecycle rule/version determines whether establishment is blocked, cancelled or requires another disposition.

P1.6 does not decide this through evidence recomputation.

It preserves:

- snapshot/communication history;
- withdrawal/cancellation evidence binding;
- establishment disposition;
- any resulting owning-domain event/correction lineage.

No P1.6 timeout or scheduler lifecycle is introduced.

---

# 29. Inbound/forwarded/oral communication

A load-bearing inbound message body/header is preserved as evidence, not transient UI text.

Attachments remain separately identifiable EvidenceVersions.

A forwarded message is a new occurrence; the forwarder does not become originator of the quoted/attached original.

A recorded oral/telephone/offline communication is explicitly an internally authored observation with recorder, asserted represented/source party, time/context and confirmation status.

It cannot masquerade as authenticated verbatim supplier evidence.

---

# 30. DerivedObservation and AI provenance

A human/parser/AI/tool extraction, mapping, classification or proposal preserves as applicable:

- exact source EvidenceVersion;
- exact SourceLocator;
- derivation/tool/model/config execution identity sufficient for supported reconstruction;
- proposed/extracted value;
- actor/process/time;
- acceptance/correction/rejection/transformation history.

DerivedObservation is not supplier source truth and is not a P07 effect.

If it materially influences a governed outcome and meets the P1.4 load-bearing test, provenance is retained.

Only the owning-domain action establishes authoritative truth.

P1.10 owns broader agent orchestration, confidence and memory.

---

# 31. Classification and access

Sensitivity/disclosure/domain-scope facts are bounded metadata, not a tenant-authored policy language.

Current access remains P09/domain/external-grant authority.

Classification does not grant/deny access by itself.

Retention/preservation does not grant viewing rights.

Supplier evidence remains participant/resource scoped.

Tender opening/sealed timing belongs to owning-domain policy/state, not a second evidence workflow.

---

# 32. RetentionBasis and PreservationDependency

Retention requires one or more explicit typed/versioned bases such as:

- active transaction/contract dependency;
- customer contract/configured requirement;
- verified legal/regulatory requirement;
- active dispute/audit dependency;
- bounded security/audit requirement.

No `KEEP_FOREVER` default exists.

Current retention/disposition eligibility is derived over active bases/dependencies and data scope.

A bounded PreservationDependency may prevent disposal for specific evidence scope without granting access.

P1.6 does not build enterprise legal-hold/eDiscovery/records-schedule functionality.

---

# 33. Restriction, redaction and disposition

These are distinct:

- restriction changes current access;
- redaction creates a derived disclosure representation;
- disposition/minimization legitimately removes eligible payload/data.

A redacted representation preserves source, action/authority/basis/scope and its own content identity.

If externally issued, it receives its own PRODUCT_ISSUED EvidenceVersion/Transmittal history.

Past reliance on the unredacted source remains bound to that source.

Payload disposition never reverses domain history.

Where payload is legitimately disposed, retain only the minimum justified non-payload DispositionRecord/tombstone needed by surviving basis/reconstruction.

No near-complete shadow copy may survive under “metadata”.

Missing disposed content is never fabricated.

---

# 34. Post-termination, export and residency

Former memberships/grants do not authorize retained-state actions.

Post-termination export, restriction, minimization or disposition requires explicit contract/lawful/verified legal authority.

Bounded export/return may preserve a manifest of included versions/scope/provenance/time/authority/destination and integrity proof where supported.

Destination retention, residency and authority remain outside OS control.

P1.6 identifies evidence payloads, message bodies/headers, metadata, locators, DerivedObservations, ValidationEvidence, redacted copies, tombstones and export manifests for P1.10 residency/NFR classification.

Physical topology is later design.

---

# 35. Bounded action catalogue

P1.6 state-changing actions are bounded families covering:

- source capture/reference/add occurrence;
- evidence/reliance binding;
- derived observations;
- generated-version freeze/issue/transmittal;
- communication/delivery/read/acknowledgment/content-response observations;
- revision/supersession/withdrawal;
- integrity/validation;
- redacted representation;
- retention/preservation establish/end;
- payload disposition/metadata minimization;
- export/return;
- post-termination retained-state action;
- residency-migration evidence binding.

Each action is tenant/resource scoped, authorized, versioned, audited and idempotent where retries are possible.

No generic historical evidence edit, unguarded delete, set-approved, set-awarded, set-commitment, set-certified or mark-paid action exists.

---

# 36. P01–P12 reconstruction requirement

A governed outcome reconstructs through one or more:

- `SOURCE_ORIGINATED`;
- `DOMAIN_NATIVE`;
- `PRODUCT_ISSUED`;
- `EXTERNAL_AUTHORITY`;
- `DERIVED_OBSERVATION`.

A separate PDF/file is not required for every domain-native event.

For a disputed load-bearing commercial value, reconstruction can identify as applicable:

1. authoritative domain fact/event/effect;
2. Commitment/EffectSubject/component lineage;
3. governing valuation/calculation/FX/tax/authority/config versions;
4. immutable RelianceBinding(s);
5. exact EvidenceVersion(s);
6. exact SourceLocator(s);
7. source principal + attribution basis;
8. capture/communication provenance;
9. DerivedObservation/normalization/assessment lineage;
10. bounded action/approval that consumed evidence;
11. PRODUCT_ISSUED/Transmittal history;
12. later correction/supersession/redaction/disposition/contradictory-evidence history.

---

# 37. A0–A3 minimum profile

The first sourcing rail requires only:

- EvidenceRecord/EvidenceVersion;
- source principal/attribution and capture occurrence;
- exact TenderRelease/Addendum issue;
- supplier response revisions;
- SourceLocator/RelianceBinding for compared values;
- normalization/evaluation/recommendation/approval/Award provenance;
- Award/handoff issue/capture evidence where used;
- bounded retention/disposition defaults.

A0–A3 does not require:

- CDE connector;
- historical mailbox migration;
- persistent supplier account;
- enterprise records schedule;
- trust-service provider integration;
- AI extraction;
- enterprise search;
- eDiscovery/legal hold.

---

# 38. One-XL guard

P1.6 is not:

- full CDE/document-management platform;
- enterprise records-management platform;
- email server/archive;
- collaboration/chat platform;
- digital-signature/trust-service platform;
- legal/eDiscovery platform;
- generic workflow/BPM engine;
- independent commercial/accounting ledger.

CommunicationSatisfactionSnapshot is a bounded frozen evaluation record, not a new workflow or ledger subsystem.

P07 remains the sole independent XL gravity well.

---

# 39. Targeted UAE evidence conclusion

Current UAE authoritative electronic-transactions/evidence sources support the semantic distinctions used by P1.6:

- electronic records can be first-class subject to integrity/retrievability/source/send-receive context;
- attribution/originator is distinct from intermediary;
- acknowledgment of receipt is distinct from acknowledgment of content;
- send/receive semantics are distinct;
- email and modern communications can be electronic evidence;
- signature/seal/timestamp/delivery validation are distinct evidence capabilities.

P1.6 does not assert transaction-specific legal sufficiency, universal retention durations, mandatory qualified signatures or dispute outcomes.

Those remain evidence-driven legal/product configuration.

---

# 40. Frozen ADR decisions

## ADR-0027 — Evidence identity/version/content-integrity/reconstruction-anchor model

Accepted semantic decision:

- EvidenceRecord, EvidenceVersion, content/integrity, source principal/attribution, capture/communication occurrence, SourceLocator and RelianceBinding remain distinct;
- effective historical reliance is immutable;
- load-bearing external source requires mandatory ReconstructionAnchorTest core or permitted immutable local capture;
- materialization policy is explicit;
- hash/content identity never substitutes for business evidence identity, authenticity, authority or truth.

## ADR-0028 — Communication/transmittal/delivery/acknowledgment/domain-effect boundary

Accepted semantic decision:

- formal Transmittal is channel-neutral issue evidence;
- MessageEnvelope/CommunicationOccurrence is source/transport evidence;
- issue, dispatch, delivery/receipt, read/open, receipt acknowledgment, content response and owning-domain acceptance/effectiveness are distinct;
- Pattern B freezes addressee/channel/time/prerequisite/completion semantics before issue;
- `OBSERVATION_COMPLETES_EFFECT` uses immutable CommunicationSatisfactionSnapshot and one established-once owning-domain event;
- later evidence correction/retraction never automatically reverses or retimes domain truth;
- only bounded owning-domain correction can change consequence.

Later-owned remain:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

---

# 41. Gate result

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

Regression:

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 42. Closure

P1.6 is **PASS / CLOSED / FROZEN**.

P1.7 may define integration, migration, API/event/tool contracts and physical interface behavior only if it preserves this semantic evidence/communication boundary.

Product code remains locked.
