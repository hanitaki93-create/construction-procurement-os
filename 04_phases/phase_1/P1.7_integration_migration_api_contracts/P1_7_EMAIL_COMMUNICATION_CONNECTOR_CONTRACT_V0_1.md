# P1.7 — Email & Communication Connector Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define a provider-neutral email/message integration contract that implements frozen P1.6 evidence/transmittal semantics without becoming a full mailbox archive, email client/server or alternate approval/business system.

---

# 2. Supported activation modes

A tenant/deployment may activate one or more:

- `NO_CONNECTOR_MANUAL` — download/copy/manual send and buyer-on-behalf capture;
- `OUTBOUND_SEND_ONLY` — send exact issued artifacts/messages;
- `INBOUND_CAPTURE_SELECTED` — capture explicitly selected/in-scope messages;
- `INBOUND_WATCH_SCOPED` — watch a bounded mailbox/folder/label/query scope;
- `BIDIRECTIONAL_SCOPED` — outbound issue + inbound scoped capture/correlation;
- `API_SYSTEM_CHANNEL` — non-email message/portal channel mapped to same P1.6 semantics.

Full corporate mailbox journaling/archive is not a P1.7 default or A0–A3 prerequisite.

---

# 3. MailConnectorProfile

Binds:

- tenant;
- provider/account/mailbox identity;
- technical/authenticated principal;
- represented sender identity/organization;
- delegated versus application/service access;
- least-privilege permission scopes;
- permitted folders/labels/address patterns/project contexts;
- inbound/outbound activation mode;
- message/version retrieval capabilities;
- watch/subscription/change-history capabilities;
- send/draft/reply capabilities;
- source attribution/validation evidence;
- retention/materialization policy;
- correlation rules;
- consent/reauthorization lifecycle;
- degraded/manual fallback;
- residency/sensitivity classification;
- effective period.

---

# 4. Outbound issue path

## O01 — domain issue precedes connector send

For a governed artifact:

1. owning domain/P1.6 freezes exact PRODUCT_ISSUED EvidenceVersion/Transmittal;
2. connector receives exact immutable body/member/addressee envelope;
3. connector creates TransportAttempt/provider request;
4. provider acceptance/message ID is recorded;
5. later dispatch/delivery/bounce/read/ack observations remain distinct;
6. Pattern-A/Pattern-B owning-domain semantics consume only the named P1.6 facts.

## O02 — no connector mutation

Connector cannot alter:

- issued attachment/member bytes;
- transmittal member set;
- frozen required addressees;
- message body where it is part of the exact issued artifact;
- subject/reference if load-bearing;
- communication satisfaction rule.

Permitted transport headers/provider encoding changes are technical representation only and preserve exact content/binding provenance.

## O03 — draft versus issued send

A connector may send:

- exact PRODUCT_ISSUED content through a governed issue operation; or
- an ordinary/non-authoritative draft message after explicit user action under the proposal/draft contract.

Sending a draft does not create an issued tender/Commitment/certificate artifact.

## O04 — provider acceptance

HTTP/API acceptance, queued status or returned provider message ID is operational send acceptance only.

It is not delivery, receipt, acknowledgment, content acceptance or domain effectiveness.

---

# 5. Inbound capture path

## I01 — change notification is a signal

Webhook/push/history notification is an ExternalObservation indicating possible mailbox change.

Connector retrieves the exact message/resource and attachments under its profile before creating accepted MessageEnvelope/EvidenceVersion.

## I02 — exact message evidence

For in-scope load-bearing message preserve as available:

- provider/account/mailbox;
- provider message/resource ID;
- immutable/captured raw or exact content representation;
- MIME/body format/ContentIdentity;
- Internet Message-ID and relevant reply/reference headers;
- source-sent assertion;
- provider received/created/modified observations;
- sender/from/reply-to assertions;
- to/cc/bcc/addressee assertions subject to authorization;
- subject/body EvidenceVersion/SourceLocator;
- attachment EvidenceVersions;
- thread/conversation/provider IDs;
- authentication/transport validation evidence where available;
- capture/watch/history provenance.

## I03 — body and attachments separate

Commercial text in message body is exact bindable evidence independent of attachments.

Attachments remain separately identifiable EvidenceVersions.

A new email body may change commercial meaning even when attachment bytes are unchanged.

## I04 — sender attribution

Email From/Reply-To/display name alone is an assertion, not authenticated supplier authority.

Preserve available provider/authentication/context evidence and PrincipalAttributionBasis.

Owning domain decides whether it is sufficient for a specific action.

## I05 — forwarded/imported email

Forward/import creates a new capture/communication occurrence. Original message/source identity is preserved where reconstructable. Internal forwarder/importer does not become original supplier source principal.

---

# 6. Scope and capture boundary

A watch/capture rule is versioned and bounded by combinations such as:

- mailbox/folder/label;
- explicit addresses/domains;
- project/tender/Commitment correlation token;
- provider message/thread IDs;
- time window;
- manually selected message;
- transmittal/reply reference;
- approved query/filter where provider supports it.

Connector must not ingest unrelated personal/corporate mailbox content merely because technical scope allows it.

Capture eligibility does not grant general user access to message content.

---

# 7. Correlation

Correlation may use:

- exact Transmittal/reference token;
- Internet Message-ID / In-Reply-To / References;
- provider thread/conversation/message IDs;
- issued recipient/account;
- tender/package/Commitment reference in subject/body;
- attachment/source document IDs;
- supplier/contact relationship;
- explicit user/domain reconciliation.

No one weak signal such as subject, filename, hash or email address alone establishes business transaction identity.

Ambiguous messages remain unassigned/quarantined or proposed mapping; they are not silently attached to the nearest RFQ/Commitment.

---

# 8. Duplicate and revision behavior

## D01 — duplicate provider notification

Multiple notifications for one message create transport/notification attempts, not duplicate MessageEnvelopes/evidence versions where provider/content/source equivalence is proven.

## D02 — same message via multiple paths

Email imported manually then discovered by watch may reconcile to one MessageEnvelope/EvidenceVersion with multiple CaptureObservations when equivalence is proven.

## D03 — resent/revised supplier content

A new provider message or changed body/attachment may be a new source EvidenceVersion/revision/communication occurrence even if subject/thread is identical.

Owning domain determines submission/clarification/revision meaning.

## D04 — provider mutable message state

Flags/folder/read status/category changes are provider observations/metadata; they do not mutate frozen body/attachment evidence or domain acceptance.

---

# 9. Subscription/watch lifecycle

Connector state includes:

- watch/subscription identity;
- provider checkpoint/history/delta token;
- expiration;
- last successful notification/retrieval;
- last complete synchronization point;
- reauthorization/renewal state;
- missed-notification/gap state;
- resync start/end/outcome.

If subscription expires/is removed/misses changes:

- mark REAUTHORIZATION_REQUIRED/RESYNC_REQUIRED;
- renew/recreate under current consent;
- use provider history/delta/full reconciliation;
- expose any unrecoverable gap;
- do not assume no messages arrived;
- historical captured evidence remains.

---

# 10. Permissions and consent

## P01 — least privilege

Request only read/send/watch scopes required by activated mode and bounded mailbox/resource scope where provider supports it.

## P02 — consent history

Preserve grant/consent/account/profile/effective history sufficient to explain connector access.

## P03 — revocation

On permission revocation/account disconnect:

- stop new provider operations;
- mark connector degraded/revoked;
- preserve historical evidence under retention basis;
- do not delete domain events/transmittals;
- expose pending outbound/inbound/gap state;
- offer manual fallback.

## P04 — reconnect

Reconnection is a new/effective connector authorization context and may require resync; it does not silently continue old checkpoints if provider semantics do not permit it.

---

# 11. Outbound retries and alternate paths

- retry same exact Transmittal/message uses same logical send identity with new TransportAttempt;
- duplicate provider send/result correlation is explicit;
- retry cannot regenerate issued content;
- alternate provider/manual resend links to same Transmittal if exact content/addressee purpose remains;
- changed content/addressees requires reissue/new transmittal according to P1.6;
- one failed channel may be supplemented by another only if frozen CommunicationSatisfactionRule permits.

---

# 12. Replies and substantive responses

A reply such as “received,” “accepted,” “revised price attached” or “we decline” is source ContentResponseEvidence.

Connector may:

- capture exact message;
- propose correlation/classification;
- invoke a registered capture/submission/response command where profile and authority allow.

Connector cannot directly:

- mark approval;
- make award/Commitment effective;
- accept a price revision;
- certify work;
- infer supplier legal authority;
- satisfy a communication rule without exact qualifying/prerequisite evidence.

---

# 13. Chat/email drafting seam

A future chat/agent may invoke proposal capabilities to draft an email.

The draft preserves:

- target transaction/context;
- source facts/evidence cited;
- recipient proposal;
- generated content/model/config provenance where load-bearing;
- user edits/revisions.

Draft sending still requires the registered send/issue operation and applicable confirmation/authority.

A generated statement is not supplier/buyer source evidence until actually issued/captured as communication.

---

# 14. Provider portability

Provider-specific fields map to frozen semantics through versioned adapter rules.

Switching Microsoft/Gmail/SMTP/other provider:

- preserves product Transmittal/MessageEnvelope/EvidenceVersion identity/history;
- creates new ConnectorProfile/effective period;
- does not claim provider IDs are portable business IDs;
- maps in-flight/pending sends/watches explicitly;
- prevents dual automatic capture/send during cutover;
- retains manual fallback.

---

# 15. Data minimization and retention

Connector captures only in-scope message content/metadata needed by the activated transaction/evidence path.

Provider mailbox retention is external.

Product-retained copies/references follow P1.6 RetentionBasis/materialization/disposition rules.

Deleting/moving a message in provider mailbox does not automatically delete/rewrite product evidence or domain truth.

Product cannot promise recovery of uncaptured provider content after provider deletion.

---

# 16. A0–A3 minimum

First tender can operate with `NO_CONNECTOR_MANUAL`:

- product freezes/downloads exact RFQ artifact;
- buyer sends externally;
- buyer captures reply/quote evidence;
- product records issue/capture provenance;
- comparison/award continues.

A generic email connector improves speed but is not mandatory.

---

# 17. One-XL guard

This contract does not create:

- full email client/server;
- corporate archive/journaling;
- marketing automation;
- generic CRM/thread system;
- provider-independent mail sync platform.

It defines bounded transaction communication capture/issue only.

**P07 sole XL: preserved.**

---

# 18. Hostile tests

1. Graph/Gmail webhook missed — explicit resync/gap, no missing-message denial? REQUIRED.
2. Provider returns send accepted then later bounce — send ≠ delivery, both preserved? REQUIRED.
3. Same quote attachment resent with changed body price term — body creates distinct evidence? REQUIRED.
4. User forwards supplier email — forwarder not supplier source? REQUIRED.
5. Connector full mailbox permission but transaction scope narrow — unrelated messages not ingested? REQUIRED.
6. Permission revoked — historical evidence remains and manual fallback works? REQUIRED.
7. Same message manually imported then watch captures — dedupe only with proven equivalence? REQUIRED.
8. AI drafts award email — cannot issue without command/authority? REQUIRED.
9. Thread subject matches two tenders — ambiguity/quarantine, no nearest assignment? REQUIRED.
10. Connector provider replaced — no duplicate capture/send and old IDs retained as provider refs? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
