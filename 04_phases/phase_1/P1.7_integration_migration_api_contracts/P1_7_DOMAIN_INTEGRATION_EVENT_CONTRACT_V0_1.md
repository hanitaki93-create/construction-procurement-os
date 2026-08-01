# P1.7 — Domain Event & Integration Event Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define the semantic boundary among authoritative domain events, integration events, transport messages and external observations so publication, redelivery, replay or connector failure cannot create or rewrite business truth.

This contract does not choose event sourcing, database logs, outbox, queue, broker, webhook, stream or transaction technology.

---

# 2. Four event/message classes

## E1 — DomainEvent

Immutable owning-domain fact that a bounded domain transition occurred.

It is authoritative according to the owning domain and frozen authority semantics.

Examples:

- AwardDecisionMade;
- CommitmentBecameEffective;
- SupplierResponseRevisionAccepted;
- GoodsReceiptRecorded;
- CertificationMadeEffective;
- Communication-Gated Effect Established;
- EvidencePayloadDisposed.

A DomainEvent is not created merely because a message was received or published.

## E2 — IntegrationEvent

Versioned consumer-facing representation that communicates a domain/external/integration fact across a boundary.

It may be derived from one or more DomainEvents/projections.

It is not a second authoritative domain event and cannot grant permission to overwrite the source domain.

## E3 — TransportEnvelope

Delivery/retry/routing wrapper for an IntegrationEvent, command, callback or notification.

It contains operational metadata such as delivery attempt, destination, headers, subscription and broker offsets.

Transport metadata never changes business meaning.

## E4 — ExternalObservation

A provenance-bearing observation from an external source/system/provider, such as:

- ERP posting/payment status;
- email delivery callback;
- CDE revision notification;
- external master-data change;
- bank/security status;
- webhook event.

It becomes product domain truth only through the applicable authority profile and bounded domain/integration action.

No implicit fifth class exists.

---

# 3. DomainEvent minimum

Every DomainEvent states as applicable:

- immutable DomainEvent ID;
- tenant;
- project/resource/ContractingAuthorityContext;
- owning domain/aggregate/resource;
- event type + semantic version;
- aggregate/resource version/sequence where applicable;
- recorded time;
- effective time/period where material;
- bounded command/establishment identity;
- causation/correlation lineage;
- principal/acting/represented context;
- governing authority/policy/config versions;
- evidence/RelianceBinding/CommunicationSatisfactionSnapshot references where load-bearing;
- economic effect or explicit none/scope/external class;
- correction/reversal/supersession lineage;
- domain payload sufficient for its frozen semantic meaning.

Publication state is not part of DomainEvent business meaning.

---

# 4. IntegrationEvent minimum

Every IntegrationEvent states:

- immutable IntegrationEvent ID;
- integration event type + semantic schema version;
- source domain/system and source fact/event/reference;
- tenant/project/context scope;
- produced time;
- source recorded/effective/observed times as applicable;
- causation/correlation/logical command IDs;
- authority mode/source classification;
- event payload version;
- evidence/reference/version links where required;
- correction/supersession relationship;
- sensitivity/disclosure profile;
- consumer compatibility/deprecation metadata where needed.

An IntegrationEvent may intentionally omit internal fields. Omission cannot change the source fact’s meaning.

---

# 5. Event publication boundary

## P01 — domain commit first or atomic-equivalent

A DomainEvent/business transition must not depend for its existence on successful downstream publication unless the frozen owning-domain lifecycle explicitly defines an external communication observation as a guard under P1.6.

For ordinary publication:

- domain commit establishes truth;
- publication can succeed later;
- publication failure creates operational/integration state;
- it does not roll back or duplicate the DomainEvent silently.

Physical implementation may use an atomic transaction/outbox/equivalent recovery mechanism.

## P02 — stable publication intent

Each publishable source event/result has a stable publication identity so retries produce the same logical IntegrationEvent or a clearly versioned replacement, not a new business event.

## P03 — publication states

Operational publication may expose:

- NOT_REQUIRED;
- PENDING;
- PUBLISHED;
- PARTIALLY_PUBLISHED;
- FAILED_RETRYABLE;
- FAILED_TERMINAL;
- QUARANTINED;
- SUPERSEDED.

These states do not change source business state.

## P04 — consumer-specific delivery

One IntegrationEvent may have multiple destination/subscription TransportEnvelopes and delivery outcomes.

Failure for one consumer does not imply the IntegrationEvent or DomainEvent did not exist.

---

# 6. Delivery/replay semantics

## D01 — at-least-once reality

P1.7 assumes IntegrationEvents/notifications may be delivered zero, one or multiple times during outages/recovery unless a stronger provider contract is proven.

Exactly-once business effect is achieved through stable source/event/command identity and idempotent consumers—not assumed transport magic.

## D02 — consumer dedupe

A consumer preserves processed identity/checkpoint sufficient to avoid duplicate local domain effect for the applicable replay horizon.

A repeated IntegrationEvent may update delivery observation but cannot create a second source event.

## D03 — redelivery ordering

Redelivery may arrive after later events. Consumers use event/source sequence/effective/correction semantics, not arrival time alone.

## D04 — replay

Replay/redrive republishes existing IntegrationEvent/source history under explicit replay metadata. It does not pretend events occurred again.

## D05 — missed notifications

Where provider/connector indicates missed notifications, expiry/removal or history gap, the connector enters RESYNC_REQUIRED/degraded state and performs bounded reconciliation/full or incremental retrieval.

It cannot infer no changes from missing callbacks.

---

# 7. Ordering

## O01 — no universal total order

P1.7 does not promise a total order across tenants/domains/resources.

## O02 — declared ordering key

Each event family declares the scope in which ordering is meaningful, such as:

- one aggregate/resource;
- one external object/version stream;
- one command/async operation;
- one Transmittal/addressee/channel;
- one migration batch/item;
- one tenant connector subscription.

## O03 — sequence gaps

Consumers detecting a required sequence gap enter reconciliation/resync/quarantine behavior rather than applying later events as complete history.

## O04 — effective versus recorded order

Effective-time order and recorded/publication/arrival order may differ. The event declares both where material.

Projection/report semantics choose explicitly which order governs.

---

# 8. Correction and supersession

## C01 — no event edit in place

Published or stored DomainEvents/IntegrationEvents are not edited to represent corrections.

Correction uses new event/history with predecessor/correction relationship according to owning domain.

## C02 — integration correction

If an IntegrationEvent payload was wrong while source DomainEvent was correct:

- issue a corrected/superseding IntegrationEvent;
- preserve original publication/delivery history;
- do not alter source business truth.

## C03 — source correction

If owning domain corrects/reverses/supersedes business truth, publish the corresponding correction event(s) with causal lineage.

Consumers cannot delete prior event history and retain only current state.

## C04 — external observation correction

Provider callback/status correction remains ExternalObservation correction. It may trigger an owning-domain correction process but cannot itself rewrite DomainEvent.

---

# 9. Domain event versus integration event mapping

Mapping definition is versioned and states:

- source DomainEvent/fact family;
- produced IntegrationEvent family/version;
- field transformations/redactions;
- authority/source classifications;
- omitted fields;
- effective applicability;
- replay/republication behavior;
- compatibility/deprecation;
- whether one source event produces zero/one/many consumer-facing events.

Mapping change cannot silently reinterpret previously published events.

---

# 10. Incoming external events/webhooks

## X01 — callback is observation

An incoming webhook/change notification is a TransportEnvelope + ExternalObservation, not a product DomainEvent.

## X02 — authenticity

Connector validates provider/source authenticity, subscription/correlation, tenant/resource scope and payload version before acceptance.

Invalid observations are rejected/quarantined.

## X03 — thin notification

If callback identifies only a changed resource, connector retrieves exact current/versioned source data under its authority profile before creating accepted external fact/reference.

## X04 — current-pointer danger

Retrieving current source after a delayed callback cannot be represented as the exact historical changed version unless the external system provides version/history semantics satisfying P1.6.

## X05 — callback-before-command-result

If external callback arrives before local request/result persistence:

- correlate by stable external/logical IDs;
- preserve callback as pending/orphan observation if target not yet available;
- reconcile when local state exists;
- never fabricate a completed command solely from callback similarity.

---

# 11. Schema/semantic evolution

## V01 — semantic event version

Event type version changes when meaning, required interpretation or closed enum/value behavior changes materially.

## V02 — additive compatibility

Additive fields may be compatible only if old consumers can ignore them without losing required meaning and unknown values are handled safely.

## V03 — unknown event/type/value

Consumer must quarantine/ignore safely according to declared compatibility; it cannot map unknown event to nearest known business effect.

## V04 — old replay

Historical event retains original schema/semantic version. Replay does not upgrade it silently.

A transformed compatibility view may be generated with explicit transformation/version/provenance.

## V05 — deprecation

Deprecation states publication/consumption window and replacement mapping. It cannot remove historical reconstructability.

---

# 12. Projection evolution

Projection definition is versioned when event-set/formula/interpretation changes.

A new event type may alter a projection only through explicit projection version/effective applicability under frozen roadmap rules.

Historical events remain unchanged.

Queries/reports declare projection version/as-of semantics.

---

# 13. External consumer authority

Receiving a product IntegrationEvent grants no right to:

- overwrite product source facts;
- create a product correction;
- infer approval/authority;
- write back current state without a registered bounded command/authority profile;
- treat integration delivery as supplier/accounting/legal acceptance.

Bidirectional integrations have separate outbound event and inbound command/observation contracts.

---

# 14. Agent/chat event use

Agents/chat may subscribe/query event/projection history through authorized registered capabilities.

They may not:

- consume raw event stream across tenants;
- treat event arrival as permission to act;
- replay events to recreate effects;
- infer missing events as no activity;
- hide correction/supersession history in explanations.

P1.10 owns reasoning/orchestration.

---

# 15. A0–A3 minimum

A0–A3 can operate with internal durable DomainEvents/audit history and no external broker/webhook.

Bounded file/manual exports may carry integration-event-like manifests.

External event publication is optional activation, not first-tender prerequisite.

---

# 16. One-XL guard

This contract does not create:

- universal event-stream platform;
- enterprise service bus;
- generic CDC system;
- event-sourcing framework product;
- cross-tenant data lake.

It defines bounded event semantics for frozen domains.

**P07 sole XL: preserved.**

---

# 17. Hostile tests

1. Award commits, broker is down — award remains; publication retries? REQUIRED.
2. Same event delivered three times — one consumer effect? REQUIRED.
3. Correction event arrives before original during replay — consumer reconciles by lineage/sequence, not arrival? REQUIRED.
4. Webhook says CDE file changed but points current Rev5 after delayed Rev3 callback — cannot claim Rev3? REQUIRED.
5. Callback arrives before local send operation stored — pending correlation, no fabricated completion? REQUIRED.
6. Old client receives unknown event enum — safe quarantine/ignore, no nearest-effect mapping? REQUIRED.
7. Integration payload error while domain truth correct — corrected integration event, no domain rewrite? REQUIRED.
8. Projection changes when new event introduced — versioned/non-silent? REQUIRED.
9. Consumer receives payment event — cannot mark product commitment paid without authority profile/domain action? REQUIRED.
10. Agent replays event to “retry” award — cannot create another award? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
