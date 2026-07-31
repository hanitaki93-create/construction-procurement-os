# P1.6 — Communication, Message & Transmittal Contract v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Define channel-neutral issue/transmittal semantics and channel-specific message/communication provenance so externally communicated procurement/commercial artifacts can be reconstructed without confusing transport, delivery, receipt, acknowledgment, content agreement or domain effectiveness.

P1.6 does not build an email server, collaboration/chat platform, messaging archive or workflow engine.

---

# 2. Core separation

P1.6 distinguishes:

1. **Issue/Transmittal intent** — what exact evidence version(s) the OS or source intended to issue/send, to whom, for what purpose/context;
2. **CommunicationOccurrence** — a channel-specific send/receive/capture occurrence;
3. **DeliveryObservation** — evidence that transport reached a system/address/channel destination under a stated basis;
4. **Read/OpenObservation** — evidence that a channel reported opening/access where available;
5. **AcknowledgmentObservation** — evidence that addressee acknowledged receipt;
6. **ContentAssertion/Response evidence** — what the recipient/source actually said about the content;
7. **Domain acceptance/agreement/decision** — governed business truth created only by the owning domain action.

No step silently implies the next.

---

# 3. Candidate semantic primitives

Physical tables/entities are not implied.

## C01 — Transmittal

A channel-neutral formal issue envelope identifying the exact artifact/version set intentionally issued for a business purpose.

Preserve as applicable:

- tenant/project/ContractingAuthorityContext;
- issuing principal/domain action;
- intended addressee principals/organizations;
- exact member EvidenceVersions and roles;
- purpose/type;
- issue reference/number where applicable;
- issue time/effective context;
- response/acknowledgment requirement where part of governed process;
- predecessor/addendum/reissue relation;
- subsequent CommunicationOccurrences.

A Transmittal is not itself proof of delivery or acceptance.

## C02 — MessageEnvelope

An exact captured message communication unit where message body/headers/metadata matter as evidence.

Examples:

- email;
- portal message;
- messaging-channel message;
- API-originated human-readable notice where retained as evidence.

Preserve as applicable:

- source/sender principal assertion and authenticated/verified status;
- represented organization/contact;
- recipient/addressee assertions;
- channel/provider account/context;
- source/provider message identifier;
- source sent-time assertion;
- observed received/captured time;
- subject/body EvidenceVersion or exact content identity;
- attachments/member EvidenceVersions;
- reply/forward/thread relation where known;
- transport/validation evidence.

## C03 — CommunicationOccurrence

One provenance-bearing channel occurrence of sending, receiving, posting, importing or capturing a message/transmittal/artifact.

One Transmittal may have multiple CommunicationOccurrences, for example email plus portal publication.

One EvidenceVersion may also be observed through multiple occurrences.

## C04 — DeliveryObservation

Evidence that a message/artifact reached a declared destination/system/channel under a specific transport basis.

Examples:

- email server accepted delivery;
- qualified electronic delivery proof;
- portal delivery/posting event;
- API delivery response;
- manual courier receipt evidence captured as external evidence.

DeliveryObservation does not mean read, acknowledgment, content agreement or domain acceptance.

## C05 — ReadOpenObservation

Channel-reported observation that content was opened/accessed/viewed.

It may be absent, unreliable or unsupported.

P1.6 never requires a read receipt for basic evidence semantics.

Read/Open does not mean agreement.

## C06 — AcknowledgmentObservation

Evidence that an addressee acknowledged receipt of the communication/artifact.

Acknowledgment of receipt is not acknowledgment/agreement to content.

The acknowledgment itself has source principal/channel/provenance.

## C07 — ContentResponseEvidence

A source communication that contains a response/assertion about content, such as:

- “accepted”;
- “agreed”;
- “confirmed”;
- “rejected”;
- “revise and resubmit”;
- “received without comment”.

The message is source evidence of what was communicated.

The owning domain determines whether it satisfies the guard/authority for a domain transition.

A textual word such as “approved” cannot directly write ApprovalOutcome, AwardDecision, Commitment or certificate truth.

## C08 — ThreadContext

A convenience relationship grouping related MessageEnvelopes/CommunicationOccurrences.

Thread grouping is not business truth, transaction identity or legal sequence by itself.

Messages remain independently identifiable if a thread is split/merged/reconstructed differently later.

---

# 4. Channel taxonomy

P1.6 supports bounded channel classes sufficient for provenance, such as:

- `PORTAL`;
- `EMAIL`;
- `API_SYSTEM`;
- `EXTERNAL_CDE`;
- `MESSAGING_CHANNEL`;
- `MANUAL_CAPTURE`;
- `PHYSICAL_OR_OFFLINE_REFERENCE` where an external receipt/document is captured.

Exact providers/vendors are later configuration/integration details.

Channel does not determine authority.

A supplier portal response is not inherently more authoritative than an email response; authority depends on principal/authentication/context/domain rules.

---

# 5. Outbound issue semantics

## O01 — issue before transport

For a governed OS-issued artifact, the issue action binds the exact EvidenceVersion/Transmittal before channel transport.

Transport retry cannot regenerate or mutate the issued artifact.

## O02 — one issue, many channels

The same Transmittal may be communicated through multiple channels.

Multiple CommunicationOccurrences do not create duplicate issued business truth.

## O03 — retry/idempotency

Retry of the same logical channel send preserves:

- same Transmittal/issued EvidenceVersion;
- stable logical communication identity/correlation;
- separate attempt/transport observations where needed;
- no duplicate domain issue event.

## O04 — alternate-channel resend

Resending the same exact issued artifact through a different channel creates a new CommunicationOccurrence linked to the same Transmittal.

If the content or intended member set changes, a new issue/reissue/addendum Transmittal is required.

## O05 — failed/bounced send

A failed/bounced transport attempt is preserved as transport evidence where load-bearing.

It cannot be relabeled delivered.

The owning domain/process decides whether failed delivery affects effectiveness, deadlines or requires alternate action.

P1.6 records facts; it does not invent contract-effect rules.

---

# 6. Inbound communication semantics

## I01 — inbound message body is evidence

Where a message is in-scope/load-bearing, its body/header/context is an EvidenceVersion/MessageEnvelope source record, not merely transient UI text.

## I02 — attachments are separately identifiable evidence

Attachments/member artifacts have their own EvidenceVersion identities and bind to the MessageEnvelope/CommunicationOccurrence.

Message body and attachment are not one undifferentiated file.

## I03 — capture actor ≠ sender

An internal user importing/forwarding/capturing a supplier email is the capture actor.

The stated/verified supplier is the source principal where supported.

Buyer-on-behalf representation is explicit.

## I04 — forwarded email

A forward is a new communication occurrence/message envelope.

The quoted/attached prior message may be preserved as linked source evidence where reconstructable.

The forwarder does not become the originator of the original message content.

## I05 — manual recording of oral/offline communication

Where the supported process allows recording an oral/telephone/offline communication, preserve it as an internally authored evidence record describing the observation:

- recorder;
- represented/source party assertion;
- time/channel/context;
- content summary/attachment;
- confirmation status if any.

It must not masquerade as a verbatim authenticated supplier message.

If supplier confirmation is required, confirmation is separate source evidence.

---

# 7. Formal transmittal versus ordinary message

## T01 — transmittal required only where business purpose needs it

Not every message needs a formal Transmittal.

A Transmittal is justified when exact issued artifact set, addressees, issue purpose, numbering, response requirement or issue history is load-bearing.

Ordinary contextual messages may remain MessageEnvelopes/CommunicationOccurrences.

## T02 — transmittal is channel-neutral

A formal issue may be transported through email, portal, API/system or another supported channel without changing the Transmittal identity.

## T03 — transmittal member set is immutable after issue

Changing an attachment/member after issue requires a new transmittal/reissue/addendum as applicable.

## T04 — cover email does not redefine pack content

An email carrying an issued pack may add contextual source evidence, but it does not mutate the Transmittal member set unless a governed new issue action occurs.

---

# 8. Delivery, receipt, acknowledgment, acceptance

## D01 — sent/issued

The originator/OS intentionally initiated transmission of an exact artifact/message.

## D02 — transport delivered/received observation

Evidence shows entry into the recipient's designated/observed channel/system under the applicable transport basis.

## D03 — read/open

Evidence shows access/opening where the channel provides it.

## D04 — acknowledgment of receipt

Recipient/source acknowledges receipt.

## D05 — acknowledgment/agreement to content

Recipient/source communicates a substantive content response.

## D06 — domain acceptance/effectiveness

Owning domain validates principal, authority, applicable contract/process rule, evidence and current domain state and emits the authoritative business event.

These six states/facts are not synonyms.

---

# 9. Legal/evidentiary alignment without hard-coding law

Current UAE electronic-transactions evidence reinforces the distinction between acknowledgment of receipt and acknowledgment of content and provides separate sending/receiving semantics.

P1.6 therefore preserves observations and applicable communication basis/version rather than defining one universal application timestamp as legal receipt/acceptance.

The exact contractual/statutory effect of delivery/receipt remains evidence-driven legal/domain configuration where it matters.

Qualified electronic delivery/signature/timestamp validation may be attached as ValidationEvidence but is not mandatory for every communication.

---

# 10. Domain-effect boundary

## B01 — communication cannot write business truth directly

No channel webhook, email parser, read receipt, portal click or message text directly creates:

- ApprovalOutcome;
- AwardDecision;
- Commitment;
- Change;
- AuthorizedWorkInstruction;
- GoodsReceipt;
- CertificationDecision;
- payment/accounting fact.

A bounded domain command may consume communication evidence as its basis.

## B02 — communication-dependent effectiveness

If a contract/process rule makes delivery/acknowledgment a guard for domain effectiveness, the owning domain transition explicitly consumes the required P1.6 observation and governing rule/version.

P1.6 does not own the business effect.

## B03 — inbound supplier acceptance

A supplier message stating acceptance may be sufficient evidence for a supported domain command under the governing contract/authority profile.

The message itself remains source evidence; the command creates the domain event.

---

# 11. Duplicate channel capture

## U01 — duplicate transport ≠ duplicate business event

The same EvidenceVersion/Transmittal arriving through multiple channels must not create duplicate source submissions or duplicate domain actions.

## U02 — correlation hierarchy

Duplicate/correlation logic may use:

- provider/source message IDs;
- Transmittal ID;
- source revision/document ID;
- source principal;
- content identity;
- tenant/project/tender context;
- time/correlation token;
- explicit user/system reconciliation.

No single weak signal such as filename, subject or hash alone decides business equivalence.

## U03 — ambiguity remains explicit

If two communications may be duplicates but equivalence cannot be proven, preserve both occurrences and mark/reconcile ambiguity rather than silently deleting one.

---

# 12. Communication capture boundary

P1.6 captures only messages/communications that are:

- directly part of a supported procurement/commercial transaction;
- relied on as load-bearing evidence;
- explicitly selected/imported under a supported capture path;
- generated/issued by the OS as transaction evidence.

P1.6 does not require:

- full mailbox ingestion;
- organization-wide email journaling;
- Teams/WhatsApp/Slack archive ingestion;
- search across all corporate communication;
- generic chat history;
- social messaging integration.

Future connectors may add supported capture paths under P1.7 without changing these semantics.

---

# 13. A0–A3 communication minimum

The first sourcing rail needs defined capture/issue paths for:

- RFQ/TenderRelease and addenda;
- supplier invitation/access notification where evidentiary;
- supplier response/submission revisions;
- clarification/confirmation where used in evaluation;
- recommendation/approval evidence where externally communicated;
- AwardDecision/notification and external handoff where applicable.

A0–A3 does not require historical mailbox migration, formal transmittal for every note, or a persistent supplier portal account.

---

# 14. One-XL check

Threads are grouping context, not a collaboration platform.

Transmittals are bounded issue evidence, not CDE workflow.

Messages are evidentiary communications, not a corporate mailbox/archive.

Delivery/acknowledgment observations are evidence, not domain truth.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

---

# 15. Hostile tests

1. Tender pack issued by portal and email — one issue, two occurrences, no duplicate release? REQUIRED.
2. Email bounces but portal succeeds — delivery facts differ, issue identity stable? REQUIRED.
3. Supplier says “received” — cannot become commercial acceptance? REQUIRED.
4. Supplier says “we accept” in email — source evidence only until domain command validates authority/context? REQUIRED.
5. Read receipt arrives — cannot create acknowledgment/agreement? REQUIRED.
6. Same attachment email + portal — duplicate transport cannot create duplicate bid revision if equivalence proven? REQUIRED.
7. Forwarded email imported — forwarder does not become original supplier source principal? REQUIRED.
8. Oral call recorded internally — not represented as authenticated supplier message? REQUIRED.
9. Qualified delivery proof exists — validation evidence binds exact occurrence, not business acceptance? REQUIRED.

This artifact remains subject to integrated P1.6 hostile audit.
