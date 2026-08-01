# P1.7 — Integrated Interface, Integration & Migration Candidate v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL FREEZE CANDIDATE / HOSTILE AUDIT REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose and precedence

This document consolidates current P1.7 candidate semantics from:

- P1.7 entry handoff/workplan;
- current official competitor/provider evidence;
- capability-neutral extension contract;
- command/query/tool contract;
- domain/integration event contract;
- async/idempotency/retry contract;
- connector authority/capability profile;
- email/communication connector contract;
- import/export/migration contract;
- reconciliation/error/degradation taxonomy;
- agent/chat/tool seam;
- ADR-0006 integration-depth candidate;
- A0–A3 no-connector profile.

Where this document clarifies terminology, it controls the current internal audit target.

It does not choose physical API/event/middleware/storage/provider technology or product code.

---

# 2. P1.7 thesis

P1.7 freezes one deterministic semantic interface substrate that can be consumed by:

- UI/internal services;
- files/import/export;
- connectors/APIs/webhooks;
- email/CDE/ERP/external systems;
- chat;
- optional AI tools/agents.

All consumers use the same bounded domain authority/evidence/history semantics.

Integration readiness does not imply connector activation.

Agent/chat readiness does not imply proven AI capability.

Core deterministic/manual workflow remains complete with all optional connectors/AI disabled.

---

# 3. Closed operation classes

Every exposed capability/operation is exactly one primary class:

1. `QUERY` — authorized read with explicit consistency/as-of/projection/source classification;
2. `PROPOSAL` — versioned non-authoritative draft/derived result;
3. `COMMAND` — bounded owning-domain transition request;
4. `ASYNC_OPERATION` — durable long-running work/status whose terminal output is explicit.

No freeform action or generic CRUD class exists.

Capability/endpoint/tool names map to a versioned OperationRegistry; they do not define semantics independently.

---

# 4. Capability-neutral optionality

Every CapabilityDefinition states:

- stable key/version/class/owner;
- input/output contracts;
- allowed initiators;
- authority/context/evidence requirements;
- idempotency/async behavior;
- side effect;
- activation state;
- manual fallback where optional;
- compatibility/deprecation.

Lifecycle:

- DEFINED_DISABLED;
- EXPERIMENTAL;
- ENABLED_REVIEW_REQUIRED;
- ENABLED_BOUNDED_AUTOMATION;
- DEPRECATED;
- RETIRED.

Capabilities may be added, disabled, reduced, replaced or retired prospectively without rewriting accepted history or making manual operation unavailable.

AI reliability/autonomy evaluation remains P1.10.

---

# 5. Common invocation context

Every invocation carries/resolves:

- OperationKey/version;
- tenant;
- project/resource/ContractingAuthorityContext;
- authenticated, acting and represented principal where applicable;
- initiator identity/class;
- current authorization/grant/capability;
- logical invocation/command/idempotency identity;
- causation/correlation;
- input schema/version;
- expected version/state/precondition;
- requested effective/as-of basis where supported;
- evidence/source/proposal/config/policy refs;
- execution time and non-authoritative client metadata.

Hidden UI/chat/connector session state cannot substitute for load-bearing context.

External authentication never satisfies internal P09/domain authority automatically.

---

# 6. Query semantics

Query consistency class is explicit:

- AUTHORITATIVE_CURRENT;
- AS_OF_EFFECTIVE_TIME;
- AS_OF_RECORDED_TIME;
- PROJECTION_VERSIONED;
- EXTERNAL_OBSERVED;
- SEARCH_INDEX_DERIVED;
- MIXED_EXPLICIT.

Result preserves:

- projection/schema/as-of/source/freshness;
- pagination/partial state;
- authorization filtering;
- evidence/source links;
- unresolved/conflict limitations.

No query or chat response may silently blend commercial certified, accounting-posted and paid facts or claim complete results from partial pages.

---

# 7. Proposal semantics

Proposal/draft/derived result:

- has identity/version/status;
- preserves exact source/evidence/locator and tool/config provenance;
- exposes ambiguity/unsupported items/assumptions;
- has no business effect;
- may be reviewed/revised/rejected/superseded;
- becomes input to a separate bounded command;
- never becomes source/domain truth through confidence, elapsed time or lack of correction.

BOQ extraction/package proposal/RFQ draft use this boundary.

---

# 8. Command semantics

COMMAND is the only direct state-transition request class.

It states source state/context, action, guards, authority, preconditions, evidence/config versions, result event/state/effect class, correction path and idempotency/concurrency.

No generic:

- set status;
- arbitrary patch;
- insert event;
- mark paid/approved/awarded;
- overwrite evidence/current balance.

Current authority is checked at command execution except idempotent persistence/recognition of a fact already established under frozen upstream semantics.

Result distinguishes completed, duplicate-completed, async-accepted, rejected, conflict, unresolved evidence/dependency, quarantine and terminal failure.

---

# 9. Async/idempotency/retry

Distinct identities:

- InvocationId;
- LogicalCommandId;
- AsyncOperationId;
- DomainEventId;
- IntegrationEventId;
- TransportAttemptId;
- ExternalCorrelationId;
- Batch/Item IDs;
- MigrationRun/Item IDs.

Timeout means unknown until resolved. Retry uses same logical identity.

Same idempotency key with materially changed payload/context conflicts.

Duplicate completion returns original result.

Async states distinguish accepted/queued/running/waiting/partial/completed/rejected/failure/quarantine/cancellation/supersession.

Cancellation cannot reverse completed domain effects.

---

# 10. Domain event / integration event boundary

- DomainEvent = authoritative owning-domain transition fact;
- IntegrationEvent = consumer-facing versioned representation;
- TransportEnvelope = routing/delivery/attempt metadata;
- ExternalObservation = external/provider/source observation.

Domain commit/business truth is separate from publication/delivery.

Publication failure after commit creates pending/retry/quarantine state, not rollback or duplicate command.

Transport may be at-least-once, missed, reordered or replayed. Exactly-once domain effect comes from stable identity/idempotent consumer/domain boundaries.

No universal total order; ordering is declared per relevant stream/key.

Corrections are new history; events are not edited in place.

---

# 11. Callback/webhook boundary

Incoming webhook/change notification is ExternalObservation, not product DomainEvent.

Connector validates authenticity/subscription/tenant/resource/version and retrieves authoritative source data where notification is thin.

Missed/removed/expired subscription creates RESYNC_REQUIRED and provider-supported delta/history/full reconciliation.

A delayed current-pointer retrieval cannot be called an exact historical changed version.

Callback before local request persistence remains pending/orphan until exact correlation; no weak-similarity completion.

---

# 12. ConnectorProfile and AuthorityMapping

Every activated connector version binds technical/external account/principal/tenant/resource scopes, permissions, capabilities, source-version behavior, transformations, authority mappings, freshness, retry/resync, materialization, degradation, effective period and conformance.

Capability verbs are explicit, such as discover/read current/read version/observe/capture/propose/query/command/send/callback/import/export/reconcile/admin.

For every load-bearing exchanged fact/action, AuthorityMapping states:

- semantic key;
- OWN/MIRROR/REFERENCE/OUT;
- authoritative writer/source;
- direction;
- allowed verbs;
- transformation authority;
- times/freshness;
- conflict/correction;
- evidence/version/materialization;
- cutover/failure behavior.

Connector is operational adapter, never co-master.

---

# 13. Transformation classes

- TRANSPORT_ONLY;
- FORMAT_CANONICALIZATION;
- DETERMINISTIC_MAPPING;
- PROPOSAL_MAPPING;
- DOMAIN_ACCEPTED_TRANSFORMATION;
- OUTBOUND_PRESENTATION.

Uncertain/fuzzy/AI matching is proposal, not deterministic mapping.

Only owning-domain acceptance creates authoritative transformed fact.

---

# 14. External identity mapping

Mapping preserves tenant/external system/account/object/version/product target/type/effective/history.

Weak signals cannot merge identities.

Ambiguous one-to-many/many-to-one mapping is explicit.

Conflict/quarantine occurs if one external ID maps to incompatible active product targets.

External ID is correlation/reference, not identity authority.

---

# 15. External evidence/version conformance

Load-bearing external evidence must pass P1.6 ReconstructionAnchorTest.

Connector certification proves historical version semantics; a field labelled revision/version is insufficient.

Materialization policy is ANCHOR_ONLY, ANCHOR_PLUS_LOCAL_CAPTURE or LOCAL_CAPTURE_REQUIRED.

If neither exact anchor nor permitted capture exists, load-bearing use blocks/quarantines/remains limited.

---

# 16. Connector lifecycle/degradation

States:

- CONFIGURED_NOT_AUTHORIZED;
- AUTHORIZING;
- ACTIVE;
- ACTIVE_LIMITED;
- DEGRADED;
- REAUTHORIZATION_REQUIRED;
- RESYNC_REQUIRED;
- PAUSED;
- REVOKED;
- DISCONNECTED;
- RETIRED.

Degradation behavior is scoped per capability/fact and may allow manual/file fallback, queued retry, stale/read-only use or block freshness-dependent commands.

Historical evidence/domain facts remain.

No outage changes business state automatically.

---

# 17. Email connector boundary

Activation ranges from NO_CONNECTOR_MANUAL to scoped outbound/inbound/bidirectional provider integration.

Outbound sends exact frozen PRODUCT_ISSUED/Transmittal content; provider acceptance/message ID ≠ delivery/ack/domain effect.

Inbound notification is signal; connector retrieves/captures exact message body, headers/context and separate attachment EvidenceVersions.

Email From is source assertion, not authenticated supplier authority.

Scope is bounded; no full-mailbox archive requirement.

Subscription/consent gaps require reauthorization/resync and expose unrecoverable gaps.

Manual path remains complete.

---

# 18. Import/export/migration classes

- BOOTSTRAP_REFERENCE_DATA;
- CURRENT_OPEN_TRANSACTION;
- HISTORICAL_TRANSACTION_FULL;
- HISTORICAL_REFERENCE_ONLY;
- CURRENT_EXTERNAL_FACT_FEED;
- EVIDENCE_ARCHIVE_IMPORT;
- PROPOSAL/STAGING_IMPORT;
- EXPORT/HANDOFF.

Every run/item preserves source/version/time/authority/evidence/mapping/validation/result/error manifest.

No direct status/balance/current-state assignment.

Native history requires supported migration/domain actions/invariants.

If full history cannot be supported, use explicit reference-only/limitation or block; P1.7 cannot invent generic opening commercial truth.

Distinct actual/authority types never collapse.

---

# 19. Cutover and in-flight authority

Every authority transfer/cutover declares:

- old/new authority source/writer;
- effective cutover time/period;
- write freeze/read-only windows;
- final checkpoint/extraction;
- in-flight command/operation classes;
- callbacks/events during cutover;
- queued/rejected behavior;
- reconciliation/activation guard;
- rollback/forward correction;
- old connector/source disposition.

No dual authoritative writer exists for the same load-bearing fact/effective period.

## Current candidate in-flight rule

For an accepted async/integration operation:

- immutable operation semantics/input/evidence/config versions are bound at acceptance;
- current external technical permission is required for a new external call/retry;
- current product authority/security is required for a new discretionary owning-domain command;
- already-completed/established external/domain facts are recognized idempotently under historical bound context;
- authority-profile cutover explicitly classifies pending operations as CONTINUE_OLD_PROFILE, REBIND_NEW_PROFILE, CANCEL/SUPERSEDE, MANUAL_RECONCILIATION or BLOCKED;
- no middleware default chooses among them.

This rule is an internal audit target.

---

# 20. Error/reconciliation/degradation

Primary error layers:

transport, authentication, authorization scope, schema, identity, evidence, freshness, authority conflict, business precondition/rule, concurrency/idempotency, mapping, partial batch, retention/residency/security and unknown quarantine.

Reconciliation distinguishes equality, expected divergence, timing lag, stale source, value/authority/identity/version conflict, missing product/external fact, evidence deficiency, unpropagated correction, duplicate/replay and unknown.

Reconciliation never means forced equality.

Operational state/business state remain distinct and visible to UI/chat.

---

# 21. Chat/agent seam

A conversational request resolves to:

- answer from query;
- proposal/draft;
- bounded command request;
- async start/status;
- structured rejection/limitation explanation;
- abstention unsupported.

Session memory is not authority.

Answer components are classified as product fact, projection, external observed fact, source evidence, derived/proposal, operational status, inference/summary or unknown.

Load-bearing explanations support structured citations to canonical records/evidence/locators/config/authority/operations.

Chat/agents use authorization-filtered capability discovery and the same commands as UI/services.

No direct DB/event writes, hidden operation or verbal bypass.

External documents/messages are untrusted data, not tool instructions.

P1.9 owns UX; P1.10 owns reasoning/orchestration/confidence/autonomy/evaluation.

---

# 22. BOQ-to-RFQ readiness

Potential chain:

BOQ EvidenceVersion
→ extract proposal/async
→ normalized-line proposal
→ allocation/package proposal
→ human/domain acceptance/correction
→ package command
→ RFQ draft proposal
→ freeze/approval/issue commands.

Any assistance step can be disabled/replaced or stopped earlier.

Unsupported rows remain explicit.

Manual deterministic chain remains available.

No claim that full autonomous BOQ-to-issued-RFQ is reliable.

---

# 23. ADR-0006 candidate integration depth

- Tier 0 native/manual fallback — mandatory;
- Tier 1 bounded structured file import/export — mandatory V1 foundation;
- Tier 2 generic API/event/email/connector contracts — mandatory architecture/build-spec foundation, optional activation;
- Tier 3 selected named connectors — evidence-driven optional deployment;
- Tier 4 deep real-time transactional integration — later by default.

Named connector cannot be prerequisite for A0–A3.

Email connection is architecturally supported at Tier 2 with manual fallback.

---

# 24. A0–A3 no-connector proof

A0–A3 completes through:

- bounded internal/manual operations;
- structured files;
- exact product-issued artifacts;
- manual sending/capture;
- buyer-on-behalf evidence;
- normal comparison/approval/AwardDecision;
- bounded export/manual handoff.

No ERP/CDE/email API/supplier network/chat/AI/historical migration required.

First-live target remains no more than five working days from clean inputs.

---

# 25. Candidate ADR impact

No ADR status change before dual PASS.

## ADR-0006

Candidate ACCEPT with tiered integration depth in §23.

## Candidate ADR-0029 — Capability-neutral bounded interface substrate

Candidate decision:

- closed Q/P/C/A operation classes;
- one OperationRegistry and invocation/result semantics for UI/services/imports/connectors/chat/agents;
- optional capability lifecycle/disable/replace/manual fallback;
- proposals never become effects without bounded command.

## Candidate ADR-0030 — Domain/integration event and delivery-recovery boundary

Candidate decision:

- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- domain commit separate from publication;
- at-least-once/missed/reordered reality handled by stable identity/idempotency/resync;
- replay/delivery cannot create duplicate business effects.

## Candidate ADR-0031 — Connector authority/conformance model

Candidate decision:

- every connector has versioned fact/action-level AuthorityMapping, capability verbs, external-version conformance, freshness/conflict/degradation/manual fallback and certification;
- connector never co-master.

## Candidate ADR-0032 — Migration truth and limitation model

Candidate decision:

- migration/import classes distinguish native full history, open transaction, external fact, evidence, proposal and reference-only history;
- no direct state assignment or fabricated provenance;
- unsupported history stays limited/quarantined rather than invented.

Claude/internal audit should classify whether these are separate accepted ADRs or can be consolidated without losing traceability.

---

# 26. Gates

G1 one authority profile/no connector co-master;
G2 all state changes through registered bounded commands;
G3 Q/P/C/A and proposal/effect boundary;
G4 domain/integration/transport/external observation separation;
G5 deterministic crash/retry/publication/callback recovery;
G6 migration/import provenance/identity/time/authority/history;
G7 P1.6 reconstruction/materialization compliance;
G8 typed conflict/error/staleness/quarantine/no forced equality;
G9 authority transfer/cutover/in-flight no dual writers;
G10 schema/capability/API/event evolution and replace/disable;
G11 provider-neutral scoped email/manual fallback;
G12 chat/agent safe readiness without reliability assumption;
G13 ADR-0006 closure/no named connector prerequisite;
G14 A0–A3 no-connector end-to-end;
G15 P1.1–P1.6 regression NO/P07 sole XL/product code locked;
G16 internal + Claude hostile PASS.

---

# 27. One-XL guard

P1.7 does not become:

- iPaaS/ESB;
- generic API management;
- event platform product;
- no-code automation/workflow;
- MDM/ETL/data warehouse;
- email/CDE/ERP clone;
- agent platform;
- migration/observability/ITSM suite.

It is bounded interface infrastructure around frozen domain authority.

**P07 sole XL candidate: CLEAN.**

---

# 28. Internal audit targets

Attack at minimum:

1. in-flight authority/profile change;
2. command accepted under old authority then executed after revocation;
3. connector callback under old profile after cutover;
4. capability disabled during async operation;
5. event publication failure and retry identity;
6. missed webhook/resync historical-version gap;
7. query partial/stale/mixed truth in chat;
8. proposal auto-accept routes;
9. import reference-only versus native-history leakage;
10. opening state temptation;
11. email exact body/thread/correlation/permission revocation;
12. no-connector first tender;
13. duplicate command across UI/agent;
14. provider current pointer after historical callback;
15. named connector/integration second-XL creep;
16. ADR granularity and traceability.

P1.7 remains ACTIVE until internal and external hostile review PASS.
