# P1.6 — Integrated Evidence, Document & Communication Candidate v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL FREEZE CANDIDATE / HOSTILE AUDIT REQUIRED  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose and precedence

This document consolidates current P1.6 candidate semantics from:

- `P1_6_WORKPLAN_V0_1.md`;
- targeted UAE electronic-evidence reconciliation;
- evidence identity/provenance contract;
- document revision/issue/supersession contract;
- communication/message/transmittal contract;
- confidentiality/retention/disposition contract;
- content-integrity/hashing contract;
- bounded evidence action catalogue;
- P01–P12 reconstruction matrix.

Where this document clarifies terminology, it controls the current internal audit target.

It does not choose physical database/object storage, hash algorithm, CDE/email/signature provider, API payload, UI, search engine, OCR/model implementation or product code.

---

# 2. P1.6 thesis

P1.6 is a **shared evidence/provenance/communication substrate** for P01–P12.

It owns the integrity/provenance of product-governed evidence history and bounded communication observations.

It does not own the commercial/domain truth merely because it stores evidence of that truth.

Core chain:

`source principal / source system`
`→ exact EvidenceVersion + SourceLocator`
`→ capture / issue / communication occurrence`
`→ [DerivedObservation / normalization / assessment where applicable]`
`→ EvidenceBinding`
`→ bounded owning-domain action`
`→ authoritative domain fact/event`
`→ [PRODUCT_ISSUED artifact / Transmittal / external communication where applicable]`

Later revision, supersession, redaction, retention or disposition changes evidence state/history without rewriting the authoritative domain event that legitimately occurred.

---

# 3. Three truths that must never collapse

## F01 — source evidence

What an external/internal source principal actually issued, submitted, stated or made available.

## F02 — evidence provenance/custody/reference truth

What the OS captured, referenced, issued, validated, transmitted, received, retained, redacted or disposed, with exact version/source/location/context.

## F03 — domain truth

What the bounded owning P01–P12/P09 domain action made authoritative.

Evidence can support domain truth.

Evidence does not become domain truth solely by existing, being signed, being delivered, being acknowledged, being extracted by AI or being stored in the OS.

---

# 4. Evidence identity model

## F04 — EvidenceRecord

Durable business-evidence identity/lineage inside tenant scope.

An EvidenceRecord may represent a quotation, tender release, claim, external approval record, delivery note, security instrument, message artifact or other in-scope evidence lineage.

It does not imply current validity/authority/acceptance.

## F05 — EvidenceVersion

Immutable identity for one exact captured/source/issued version of an EvidenceRecord.

A new load-bearing source revision/content state creates a new EvidenceVersion.

Historical versions remain identifiable while retained even when superseded/withdrawn/obsolete.

## F06 — ContentIdentity / IntegrityAssertion

Content/integrity identity is separate from business evidence identity.

Same bytes/hash do not prove same source principal, business submission, revision lineage or effect.

Hash/integrity does not prove content truth or business authority.

## F07 — CaptureObservation

One EvidenceVersion may be captured through more than one channel/path.

Repeated capture is represented as occurrence/provenance rather than duplicate source version where equivalence is proven.

## F08 — EvidenceBinding

Typed relation between exact evidence source/location and governed fact/event/decision.

Supported role classes are bounded, including source basis, issued output, supporting evidence, validation evidence, correction evidence, transmission evidence and ancillary reference.

P1.6 does not create a generic arbitrary knowledge graph.

---

# 5. Source principal / attribution

## F09 — source principal ≠ capture actor

Preserve source/originator separately from:

- internal capture/import actor;
- transport/service provider;
- authentication identity;
- buyer-on-behalf actor;
- later approver/consumer.

## F10 — PrincipalAttributionBasis

Where source attribution is load-bearing, preserve the basis/quality of attribution rather than reducing it to a display name/email address.

Candidate bounded classes include:

- `AUTHENTICATED_DIRECT` — source action tied to an authenticated external/internal principal under a supported context;
- `AUTHORIZED_REPRESENTATIVE` — evidence issued by a principal acting on behalf of the source organization with supported representation basis;
- `SYSTEM_ATTESTED` — authoritative/verified external system identifies the source/originator;
- `BUYER_ON_BEHALF_ASSERTED` — internal actor captures evidence as representing an external source, with representation status preserved;
- `UNVERIFIED_ASSERTION` — source identity is asserted but not verified under a stronger supported basis.

These classes describe attribution provenance, not legal authority to bind a party.

The owning domain decides whether an attribution basis is sufficient for a particular governed transition.

## F11 — email address is not authentication

An email `From` address/header alone must not be represented as authenticated supplier identity.

It may be source assertion/transport evidence plus whatever authentication/provider evidence is available.

## F12 — buyer-on-behalf

Buyer-on-behalf capture preserves internal actor, represented external party, source channel/evidence and later supplier confirmation separately where required.

It never rewrites history as direct supplier authentication.

---

# 6. Electronic and physical/offline source media

## F13 — source medium is explicit where material

Evidence may originate electronically or through physical/offline media/process.

P1.6 does not require paper duplication of electronic records and does not assume every scanned physical record is the original.

## F14 — physical original / digital capture distinction

Where a physical/offline source document exists and a scan/photo/digital representation is captured:

- source medium/original-reference status is preserved where load-bearing;
- the scan/photo is a captured digital representation with its own ContentIdentity/IntegrityAssertion;
- hashing the scan proves integrity of the scan representation, not the physical original;
- custody/location of a retained physical original may be referenced where required, without building a paper records-management platform.

## F15 — no universal physical-original requirement

Whether a specific transaction requires retention/production of a physical original is legal/contract/product evidence, not assumed by the core P1.6 model.

---

# 7. SourceLocator and exact reconstruction

## F16 — SourceLocator

A load-bearing source locator may identify external system/object/version, document revision, page/sheet/section/paragraph/table/cell/line, attachment/member or visual region as appropriate.

One universal locator syntax is not required, but locator type/version semantics are.

## F17 — exact value locator

When a governed value depends on a specific part of evidence, the binding must identify the source location at sufficient precision for supported reconstruction.

Derived/OCR/rendered locations never silently replace original source locations.

## F18 — mutable URL is ancillary unless version-anchored

A mutable URL/path alone cannot be sole SOURCE_BASIS for a load-bearing governed outcome requiring exact later reconstruction.

It needs either:

- stable external version anchor; or
- immutable local evidentiary capture.

Otherwise it remains ancillary/unresolved evidence dependency.

## F19 — external reconstruction anchor

Stable external references preserve authoritative system, object ID, version/revision, source principal/authority, locator, effective/source context and observed/fetched/freshness/conflict context where applicable.

Local capture of an external source proves what the OS relied on; it does not transfer business authority to the OS.

---

# 8. Integrity / hashing

## F20 — IntegrityAssertion

Integrity proof identifies exact EvidenceVersion/representation, integrity method, algorithm/scheme/version where applicable, resulting digest/reference, validation/calc context and predecessor/revalidation history.

## F21 — exact representation boundary

Hash exact source bytes/representation as such.

OCR, rendering, translation, normalized PDF, extracted data and other derivatives have separate identities/integrity assertions and explicit derivation relations.

No hidden canonicalization is allowed.

## F22 — algorithm agility

A retained EvidenceVersion may receive new integrity assertions when methods change.

Rehash does not create a new source version solely because the algorithm changed.

Old integrity assertion history remains.

A stronger hash cannot be fabricated for an unavailable original payload by hashing a derivative and calling it the original.

## F23 — hash equality is not business dedupe

Hash/content equality is only one signal.

Business evidence equivalence/merge also requires source/context/revision/correlation evidence.

---

# 9. Document roles and freeze trigger

## F24 — semantic document roles

Roles include:

- WORKING_DRAFT;
- SOURCE_CAPTURED;
- PRODUCT_GENERATED;
- PRODUCT_ISSUED;
- DERIVED_REPRESENTATION.

These are semantic roles, not mandatory physical entity types.

## F25 — no archive-every-keystroke requirement

Non-load-bearing drafts may remain mutable.

## F26 — load-bearing freeze trigger

Before/atomically with issue, submission acceptance, recommendation/approval reliance, award/Commitment/change/certification reliance, handoff or another P1.4 load-bearing trigger, the exact relied-on state becomes immutable EvidenceVersion history.

## F27 — issued copy is exact evidence

The exact PRODUCT_ISSUED copy/member set is immutable for that issue.

Later regeneration with new template/master/config/date does not recreate the original issue.

---

# 10. Revision / supersession / issue

## F28 — relation vocabulary

Supported bounded relations include:

- REVISION_OF;
- SUPERSEDES;
- ADDENDUM_TO;
- REPLACES;
- WITHDRAWS;
- CORRECTED_REISSUE;
- EQUIVALENT_REPRESENTATION_OF.

## F29 — current is derived

“Latest/current/operative” is a projection over revision/effective history in a declared context, not independently editable truth.

Latest supplier revision and historical governing award revision may legitimately differ.

## F30 — source revision ≠ domain correction

New supplier/source revision never directly changes comparison, award, Commitment, certification, accounting or payment.

Owning domain decides whether the evidence causes a governed transition.

## F31 — issued pack membership

Issued pack/Transmittal member EvidenceVersions, roles and order are immutable for that issue.

Member updates require a new issue/addendum/reissue.

---

# 11. Signature / seal / timestamp / trust evidence

## F32 — validation evidence binds exact version

Electronic signature, seal, timestamp and delivery validation bind to the exact EvidenceVersion/CommunicationOccurrence they cover.

They cannot float to a later revision.

## F33 — integrity/authenticity/authority/truth are separate

- integrity: content unchanged/matched;
- authenticity/attribution: source/signatory relation supported;
- business authority: actor/action may create claimed effect;
- factual truth: statements are actually correct.

One does not prove the others automatically.

## F34 — trust service is an evidence seam

P1.6 can store/reference qualified/reliable signature, seal, timestamp or delivery-service validation evidence.

It does not require a trust-service provider for every transaction and does not become a trust-service platform.

A valid signature does not satisfy internal P09 approval or create P07 effect by itself.

---

# 12. Communication / transmittal model

## F35 — Transmittal

Channel-neutral formal issue envelope binding exact issued member EvidenceVersions, issuing principal/domain action, intended addressees, purpose/context, issue time/reference and applicable response/acknowledgment requirement.

Transmittal is not delivery/acceptance.

## F36 — MessageEnvelope

Exact in-scope message body/header/member evidence with sender/source assertions, addressees, channel/provider IDs, sent-time assertion, observed receive/capture time and attachments.

## F37 — CommunicationOccurrence

One channel-specific send/receive/post/import/capture occurrence.

One Transmittal may have many occurrences.

## F38 — ThreadContext

Thread is convenience grouping, not transaction/business truth.

Messages remain independently identifiable if thread grouping changes.

---

# 13. Send / delivery / read / acknowledgment / acceptance

## F39 — six distinct stages/facts

1. issue/send intent;
2. transport delivery/receipt observation;
3. read/open observation;
4. acknowledgment of receipt;
5. content response/assertion/agreement evidence;
6. owning-domain acceptance/effectiveness.

No stage implies the next.

## F40 — transport observation does not create business effect

Email/portal/API callback, delivery receipt, read receipt, portal acknowledgment or message text cannot directly create approval, AwardDecision, Commitment, change, receipt, certification or accounting truth.

## F41 — communication-dependent domain guard

If contract/process semantics make delivery/acknowledgment/content response a condition of effectiveness, the owning domain transition consumes the required P1.6 evidence/observation and governing rule/version.

P1.6 still does not own the business effect.

## F42 — issue retry and multi-channel resend

Retry preserves same logical Transmittal/issued EvidenceVersion; transport attempts are separate observations.

Alternate-channel resend of same issue creates new CommunicationOccurrence, not duplicate issue truth.

---

# 14. Inbound communication capture

## F43 — in-scope message body is evidence

Where load-bearing/in-scope, email/portal/message body is source EvidenceVersion/MessageEnvelope, not transient text.

Attachments have separate EvidenceVersion identities linked to the message.

## F44 — forwarded message

Forward is a new message occurrence.

Original quoted/attached message may retain its own source identity where reconstructable.

Forwarder does not become original originator.

## F45 — oral/offline observation

A supported internal record of telephone/oral/offline communication is explicitly an internally authored observation with recorder, represented/source assertion, time/context and confirmation status.

It cannot masquerade as authenticated verbatim supplier evidence.

---

# 15. Duplicate/correlation semantics

## F46 — duplicate transport ≠ duplicate business evidence/event

Same evidence through email + portal must not create duplicate source submission/domain action where equivalence is proven.

## F47 — correlation uses multiple provenance signals

Correlation may use provider IDs, transmittal ID, source revision ID, source principal, content identity, tenant/project/tender context, time/correlation token and explicit reconciliation.

Filename, subject or hash alone is insufficient.

## F48 — ambiguity is preserved

If equivalence cannot be proven, preserve both occurrences and explicit ambiguity/reconciliation state rather than silently deleting one.

---

# 16. Derived observations / AI

## F49 — DerivedObservation

Human/parser/AI/tool extraction/mapping/classification/proposal can preserve exact source EvidenceVersion + SourceLocator + derivation identity + acceptance/correction/transformation history.

## F50 — derived is not source

Machine-extracted supplier price never becomes supplier-authored source truth.

Where supplier confirmation is required, supplier confirmation is a separate source version/communication fact.

## F51 — derived cannot write domain truth

DerivedObservation may be consumed by normalization/evaluation/assessment/domain workflows, but only bounded owning-domain action creates authoritative fact/event/effect.

P1.10 owns confidence/orchestration/agent authority.

---

# 17. Classification / access

## F52 — sensitivity/disclosure is bounded metadata

Evidence may carry product-supported sensitivity/disclosure/domain-scope metadata.

It is not a tenant-authored authorization/policy language.

## F53 — authorization remains current P09/domain security

Classification can trigger deterministic checks but does not grant/deny access by itself.

Preservation/retention does not grant viewing rights.

## F54 — participant isolation

Supplier evidence remains scoped to authorized buyer/internal and relevant external-party access.

Participation in one tender does not expose another supplier's evidence.

## F55 — time-based visibility belongs to owning domain

Sealed bid/opening/approval-timing conditions are domain policy/state, not a second evidence workflow.

---

# 18. Retention / preservation

## F56 — RetentionBasisRef

Retention has one or more explicit bounded typed/versioned bases derived from active transaction/contract, customer configuration/contract, verified legal/regulatory requirement, dispute/audit dependency or bounded security/audit basis.

No KEEP_FOREVER default.

## F57 — retention eligibility is derived

Current retention/disposition eligibility derives from active bases/dependencies/data scope.

It is not editable retain/delete truth.

## F58 — bounded PreservationDependency

Specific supported dispute/audit/contract/security/correction processes can block disposal for identified evidence scope.

This does not create organization-wide eDiscovery/legal hold or grant access.

---

# 19. Restriction / redaction / disposition

## F59 — restriction ≠ redaction ≠ disposal

- restriction changes current access;
- redaction creates a derived disclosure representation;
- disposal/minimization legitimately removes eligible payload/data.

None rewrites the source/domain history.

## F60 — redacted representation

A redacted copy links to source EvidenceVersion, redaction action/authority/basis/scope and its own ContentIdentity.

It never replaces the historical unredacted source for past reliance.

## F61 — DispositionRecord/tombstone

After legitimate payload disposal, preserve only minimum justified non-payload provenance/disposition metadata required by surviving basis/reconstruction.

No near-complete shadow copy may survive under the label `metadata`.

## F62 — no fabricated reconstruction after disposal

If legitimately disposed content is later unavailable, expose disposition history and reconstruction limit.

Do not fabricate source content/provenance.

---

# 20. Post-termination / export / residency

## F63 — post-termination authority

Former membership/grants do not authorize retained-state actions.

Export/restriction/minimization/disposition after termination uses explicit post-termination contract/lawful/verified legal authority.

## F64 — bounded export/return

Export/return can preserve manifest of included versions/scope/provenance/time/authority/destination and integrity as supported.

Destination retention/residency/authority is outside OS control.

## F65 — evidence residency categories

P1.6 identifies evidence payloads, message bodies/headers, metadata, SourceLocators, DerivedObservations, ValidationEvidence, redacted copies, tombstones and export manifests for later P1.10 residency/NFR classification.

Physical topology is not selected here.

---

# 21. Bounded action catalogue

Current candidate P1.6 state-changing action families are EA-001 through EA-026:

- capture/reference/add occurrence;
- evidence binding/derived observation;
- generated freeze/issue;
- communication/delivery/read/ack/content response;
- revision/supersession/withdrawal;
- integrity/validation;
- redacted representation;
- retention/preservation basis establish/end;
- payload disposition/metadata minimization;
- export/return;
- post-termination retained-state action;
- residency migration binding.

Every action is scoped/authorized/versioned/audited and has no direct P07 effect.

No generic `edit historical evidence`, `set approved`, `set awarded`, `set commitment`, `mark paid` or unguarded delete action exists.

---

# 22. Reconstruction classes

Every P01–P12 governed outcome can reconstruct through one or more:

- SOURCE_ORIGINATED;
- DOMAIN_NATIVE;
- PRODUCT_ISSUED;
- EXTERNAL_AUTHORITY;
- DERIVED_OBSERVATION.

A separate PDF/file is not required for every domain-native event.

The requirement is a complete trace from exact sources/versions/locators and governing policies to the authoritative event and resulting issue/communication history.

---

# 23. Disputed commercial value reconstruction

As applicable, reconstruction can identify:

1. authoritative domain fact/event/effect;
2. Commitment/EffectSubject/component lineage;
3. governing valuation/calculation/FX/tax/authority/config versions;
4. exact EvidenceVersion(s);
5. exact SourceLocator(s);
6. SourcePrincipalRef + PrincipalAttributionBasis;
7. capture/communication provenance;
8. DerivedObservation/normalization/assessment lineage;
9. bounded action/approval that consumed the evidence;
10. PRODUCT_ISSUED/Transmittal history;
11. later correction/supersession/redaction/disposition impact.

---

# 24. UAE targeted evidence alignment

Current UAE authoritative sources support the candidate separation:

- electronic records can satisfy storage/writing/original-form requirements subject to integrity/retrievability/source/send-receive conditions;
- electronic contracts/documents are not invalid merely because electronic;
- attribution/originator matters;
- acknowledgment of receipt does not mean acknowledgment of content;
- send/receive semantics are distinct;
- electronic evidence includes email and modern communication;
- qualified/reliable signature/seal/timestamp/delivery services have separate evidence/legal semantics.

P1.6 does not hard-code case-specific legal sufficiency, retention duration or mandatory qualified-signature usage.

---

# 25. A0–A3 closed-subgraph candidate

Minimum A0–A3 evidence support:

- EvidenceRecord/EvidenceVersion;
- source principal/attribution + capture occurrence;
- exact TenderRelease/Addendum issue;
- supplier response revisions;
- SourceLocator/EvidenceBinding for comparison values;
- normalization/evaluation/recommendation/approval/Award provenance;
- Award/handoff issue/capture evidence where used;
- bounded retention/disposition defaults.

Not required before first live tender:

- CDE connector;
- historical mailbox migration;
- persistent supplier account;
- enterprise records schedule;
- trust-service provider integration;
- AI extraction;
- full-text enterprise search;
- eDiscovery/legal hold system.

**A0–A3 candidate: CLEAN.**

---

# 26. One-XL / anti-gravity candidate

P1.6 does not become:

- full CDE/document management;
- enterprise records management;
- email server/archive;
- collaboration/chat platform;
- trust-service/e-signature platform;
- legal/eDiscovery platform;
- independent approval/workflow engine;
- independent commercial ledger.

Evidence/document/message state is substrate evidence, not P07 truth.

**SECOND XL candidate: CLEAN.**

---

# 27. Candidate new ADR implications

No ADR status changes occur before external PASS.

Potential final traceability ADRs if the stage survives hostile review:

### ADR-0027 — Evidence identity / version / content integrity / reconstruction-anchor model

Candidate decision:

- separate EvidenceRecord, EvidenceVersion, content/integrity, source principal, occurrence, locator and domain binding;
- load-bearing external source requires stable version anchor or immutable local capture;
- content/hash identity never substitutes for business evidence identity or authority.

### ADR-0028 — Communication/transmittal and acceptance boundary

Candidate decision:

- formal Transmittal is channel-neutral issue evidence;
- message/transport occurrence is separate;
- issue, delivery, read, receipt acknowledgment, content response and domain acceptance/effectiveness are distinct;
- communication evidence can only affect business truth through bounded owning-domain action.

P1.4 ADR-0014 remains the ownership/provenance foundation; any P1.6 ADR supplements rather than supersedes it.

---

# 28. Internal audit gates

Internal hostile review must attack at least:

G1 exact source version/location reconstruction;
G2 external communication capture completeness;
G3 no evidence/message direct business writer;
G4 revision/issue/supersession immutability;
G5 external reference reconstructability;
G6 issue/delivery/read/ack/content/domain separation;
G7 retention/redaction/disposition correctness;
G8 AI/source/derived provenance;
G9 duplicate channel/business dedupe;
G10 hash/content/business identity separation;
G11 source principal/attribution/physical scan semantics;
G12 no CDE/email/records/signature/legal gravity;
G13 A0–A3 minimal activation;
G14 P1.1–P1.5 regressions = NO / P07 sole XL;
G15 product code remains locked.

---

# 29. Candidate status

This is an internal freeze candidate only.

P1.6 remains ACTIVE.

P1.7+ remains LOCKED.

Product code remains LOCKED.
