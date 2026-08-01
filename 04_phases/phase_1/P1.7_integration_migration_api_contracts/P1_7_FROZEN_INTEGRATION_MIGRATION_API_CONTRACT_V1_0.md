# P1.7 — Frozen Integration, Migration & API Contract v1.0

**Date:** 2026-08-01  
**Status:** FROZEN / CONTROLLING P1.7 SEMANTIC CONTRACT  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.8:** MAY BEGIN AFTER CANONICAL STATE UPDATE  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose and precedence

This contract freezes the semantic meaning of interfaces, operations, execution authority, event publication, connector authority, email integration, migration, reconciliation, future chat/agent tool access and the V1 integration floor.

It controls over conflicting P1.7 candidate, audit and remediation wording.

Physical implementation remains later, including:

- REST/RPC/GraphQL;
- database/event-store design;
- transaction/outbox/queue/broker technology;
- exact API/event/database schemas;
- gateways and infrastructure;
- named email/ERP/CDE/bank providers;
- object storage and indexing;
- UI;
- AI model/orchestration.

No physical choice may reinterpret this contract.

---

# 2. P1.7 thesis

P1.7 is a **capability-neutral deterministic integration foundation**.

It enables humans, product UI, internal services, files, email connectors, external systems and future chat/agents to use the same bounded domain/evidence substrate.

It does not promise that AI can reliably perform BOQ extraction, package creation, RFQ generation, evaluation, negotiation or approval.

Capabilities may expand, reduce, be replaced or be disabled as evidence develops without changing deterministic truth or breaking the manual rail.

Core principle:

> Readiness now; capability claims later.

---

# 3. Closed operation classes

Every registered operation has exactly one primary class.

## 3.1 QUERY

Authorized read with explicit consistency, as-of, projection, source, completeness and freshness meaning.

A query has no state-changing authority and does not imply permission to act.

## 3.2 PROPOSAL

Versioned non-authoritative draft or derived result with exact source/tool/config provenance, assumptions, ambiguities and unsupported items.

Confidence, viewing, export, timeout or absence of correction never makes a proposal authoritative.

## 3.3 COMMAND

The sole direct state-transition request class.

A command routes to a bounded owning-domain operation with authority, preconditions, expected version, evidence/config binding, idempotency and explicit result/effect.

## 3.4 ASYNC_OPERATION

Durable long-running operation/status wrapper.

Acceptance, queuing or progress is not business completion.

The terminal output is explicit and remains subject to the underlying query/proposal/command semantics.

## 3.5 prohibited fifth class

No generic CRUD/freeform action may bypass these classes.

Prohibited external meanings include:

- arbitrary update/patch;
- set status;
- mark approved/awarded/paid;
- insert event;
- overwrite historical evidence/balance;
- raw database/event-store mutation;
- chat/import/connector-specific hidden operations.

---

# 4. OperationRegistry and capability lifecycle

Every operation/capability has a stable versioned definition including:

- key, class, owner and purpose;
- input/output semantic versions;
- permitted initiator classes;
- tenant/project/resource/ContractingAuthorityContext;
- authority/capability/grant requirements;
- query consistency or command guards;
- evidence/source/config requirements;
- idempotency, async and bulk behavior;
- sensitivity/residency;
- declared side effects;
- activation/deprecation/manual fallback.

UI buttons, API endpoints, file/import actions, connector methods, chat tools and agents map to the same definition and cannot redefine meaning.

Capability lifecycle:

- `DEFINED_DISABLED`;
- `EXPERIMENTAL`;
- `ENABLED_REVIEW_REQUIRED`;
- `ENABLED_BOUNDED_AUTOMATION`;
- `DEPRECATED`;
- `RETIRED`.

Before P1.10, AI/agent state-changing capabilities remain disabled, experimental or review-required. Bounded automation is deterministic mechanical automation only.

Historical results remain reconstructable after disablement or replacement.

Manual/deterministic fallback remains available for supported core workflows.

---

# 5. Invocation context

Every invocation carries or deterministically resolves:

- OperationKey/version;
- tenant/project/resource/ContractingAuthorityContext;
- authenticated, acting and represented principal;
- initiator identity/class;
- ExecutionAuthorityMode;
- current authorization/grant/capability;
- InvocationId and logical/idempotency identity;
- causation/correlation;
- input semantic version;
- expected state/version/precondition;
- effective/as-of basis;
- evidence/source/proposal/config/policy references;
- execution time.

Hidden UI state, chat memory or connector cache cannot substitute for load-bearing context.

---

# 6. Closed ExecutionAuthorityMode

Every privileged operation binds exactly one mode.

## 6.1 DIRECT_PRINCIPAL

The authenticated principal is the acting principal.

Effective permission is current P09/owning-domain authority.

Technical scope may reduce, never add, business authority.

## 6.2 DELEGATED_ON_BEHALF

Effective permission is the intersection of:

1. technical initiator capability;
2. valid versioned delegation/on-behalf grant;
3. represented principal's current domain authority;
4. exact operation/resource/context scope;
5. domain guards/evidence.

No union, escalation or implicit impersonation.

A broadly privileged service identity cannot exceed the represented principal.

## 6.3 SYSTEM_BOUNDED

A deterministic registered mechanical operation under exact policy and scope.

`SYSTEM_BOUNDED` cannot originate, satisfy or substitute for principal/domain authority for:

- supplier selection or award;
- approval/DOA outcome;
- AwardDecision;
- Commitment formation/effectiveness;
- commercial change;
- certification;
- payment instruction/approval;
- another decision family requiring a principal or separately authorized domain basis.

It may execute a mechanical consequence of an already-authorized immutable basis where the owning-domain contract permits it.

Determinism alone never grants authority.

## 6.4 EXTERNAL_SOURCE_SUBMISSION

Permits exact scoped source submission/capture by an external party.

It cannot satisfy internal buyer approval, AwardDecision, Commitment, certification or payment authority.

## 6.5 HISTORICAL_IDEMPOTENT_RECOVERY

Records, returns, publishes or recognizes a fact already established under immutable historical basis.

It may not create new discretion or effect.

No valid mode = deny.

---

# 7. Query semantics

Query consistency is exactly one:

- `AUTHORITATIVE_CURRENT`;
- `AS_OF_EFFECTIVE_TIME`;
- `AS_OF_RECORDED_TIME`;
- `PROJECTION_VERSIONED`;
- `EXTERNAL_OBSERVED`;
- `SEARCH_INDEX_DERIVED`;
- `MIXED_EXPLICIT`.

Multi-resource cut is exactly one:

- `ATOMIC_DOMAIN_SNAPSHOT`;
- `CONSISTENT_AS_OF_CUT`;
- `CAUSALLY_BOUND_RESULT_SET`;
- `NON_ATOMIC_MIXED_OBSERVATION` with component times and limitations.

Mixed/non-atomic results cannot be presented as simultaneous authoritative truth.

A command may consume them only where its definition explicitly permits this and applies per-component authority, freshness and skew guards.

Pagination, cursor, partial status and completeness are explicit.

Chat cannot claim “all” from a partial result.

---

# 8. Proposal-to-effect boundary

A proposal preserves:

- identity/version/status;
- exact EvidenceVersion/SourceLocator/source references;
- model/tool/parser/config execution identity where load-bearing;
- assumptions/alternatives/ambiguities/unsupported items;
- review/correction/supersession history.

A separate bounded command accepts/corrects a proposal and creates authoritative history.

BOQ extraction, normalized lines, package grouping, RFQ drafts, email drafts and fuzzy mappings remain proposals unless a deterministic owning-domain rule explicitly establishes otherwise.

No proposal becomes authoritative automatically.

---

# 9. Command/result semantics

Every command defines:

- source state and bounded action;
- guards and authority;
- expected version/causal precondition;
- evidence/config/policy basis;
- result event/effect;
- correction path;
- idempotency semantics.

Results distinguish:

- completed;
- duplicate-completed;
- async-accepted;
- rejected;
- conflict;
- unresolved evidence/dependency;
- quarantined;
- terminal failure.

Async acceptance is never reported as completed.

Bulk operations apply semantics per item/effect and expose partial results.

---

# 10. Stable identities and idempotency

Distinct identities include:

- InvocationId;
- LogicalCommandId;
- AsyncOperationId;
- DomainEventId;
- IntegrationEventId;
- PublicationIntentId;
- TransportAttemptId;
- ExternalCorrelationId;
- BatchId/BatchItemId;
- MigrationRunId/MigrationItemId;
- P1.6 CommunicationSatisfactionSnapshotId where relevant.

Timeout means outcome unknown until resolved.

Retry uses the same logical identity.

Same idempotency key with materially changed payload, target, principal, context or semantic version is a conflict.

Duplicate completion returns the original result.

Concurrent attempts create at most one product-domain effect.

Local idempotency never assumes an external system will prevent duplicate external effects.

---

# 11. Event/message classes

## 11.1 DomainEvent

Authoritative owning-domain transition fact.

## 11.2 IntegrationEvent

Versioned consumer-facing representation of a source fact/event.

## 11.3 TransportEnvelope

Routing, delivery and attempt metadata.

## 11.4 ExternalObservation

Provider/external-system observation such as webhook, ERP status, send callback or external record.

An incoming webhook is never a product DomainEvent.

Receiving an IntegrationEvent grants no authority to overwrite source truth.

---

# 12. Immutable PublicationIntent

Every publication binds:

- source event/fact/version;
- exact mapping version;
- IntegrationEvent semantic/schema version;
- disclosure/redaction profile version;
- source/authority classification;
- exact target identity/version or frozen distribution basis;
- payload ContentIdentity or complete deterministic generation basis;
- causation/correlation/publication identity;
- retry/replay policy.

The generation basis includes all representation-affecting versions where relevant:

- serializer/canonicalization/encoding;
- template/formatter;
- locale/timezone/currency/display policy;
- defaults/enums;
- attachment/member EvidenceVersions.

## 12.1 target-specific publication

Bind exact destination/account/resource/profile/subscription identity and relevant version.

## 12.2 target-independent distribution

Bind exact distribution/topic/subscriber-selection profile version plus the recipient/subscription snapshot or deterministic historical as-of cut where recipient/disclosure identity is material.

Retry preserves the original target or distribution/recipient basis.

New subscribers receive a separate replay/new publication.

A destination/audience/profile change affecting authority, disclosure or meaning creates a new PublicationIntent and, where effect-bearing, a new logical operation.

An old payload that becomes prohibited is blocked/quarantined/cancelled explicitly; its intent is not mutated.

Domain commit remains authoritative when publication fails.

---

# 13. Delivery, ordering and replay

Transport may miss, duplicate, reorder or replay.

Exactly-once product effect comes from stable identity and idempotent domain boundaries, not transport claims.

No universal total order exists.

Each event family declares ordering key and gap behavior.

A sequence gap causes resynchronization, reconciliation or quarantine.

Replay republishes existing history with replay metadata; it does not recreate domain events/effects.

Corrections are new history.

---

# 14. Closed effect-stage taxonomy

Every state-changing or external-effect operation has exactly one current aggregate stage:

1. `PRE_ACCEPTANCE`;
2. `ACCEPTED_PRE_EFFECT`;
3. `EFFECT_INDETERMINATE`;
4. `EXTERNAL_EFFECT_EMITTED`;
5. `DOMAIN_EFFECT_ESTABLISHED`;
6. `TERMINAL_NO_EFFECT`;
7. `PARTIAL_EFFECT` with exact item/effect-level stages.

Operational queued/running/waiting/paused/cancel-requested status is separate.

Stage transitions are immutable history; current stage is a projection.

## 14.1 ACCEPTED_PRE_EFFECT

Requires positive evidence that no effect-bearing boundary was crossed.

Missing response, timeout, missing callback or local persistence gap is not positive no-effect evidence.

## 14.2 EFFECT_INDETERMINATE

Mandatory when an external/domain effect may exist but existence, absence, scope or correlation is neither confirmed nor disproved.

Entry includes:

- timeout after possible effect-bearing transmission;
- ambiguous provider result;
- connection loss after transmission may have begun;
- crash after external send/domain commit attempt before result persistence;
- missing/conflicting callback correlation;
- provider acknowledgment that does not prove/disprove the defined effect;
- missed history with current-only provider state;
- unresolved domain-command result;
- unknown batch items.

## 14.3 EXTERNAL_EFFECT_EMITTED

Positive evidence establishes the operation-defined external effect/durable external acceptance under bound connector conformance.

Socket write, send attempt or generic HTTP success is insufficient unless conformance proves it establishes the effect.

## 14.4 DOMAIN_EFFECT_ESTABLISHED

The authoritative owning-domain event/effect exists.

## 14.5 TERMINAL_NO_EFFECT

Positive evidence establishes that no external/domain effect occurred.

Never inferred from timeout, missing callback or absence.

## 14.6 PARTIAL_EFFECT

Every item/effect retains its own stage.

Confirmed, no-effect and indeterminate items remain distinct.

The aggregate remains `PARTIAL_EFFECT` while outcomes are mixed. When all items resolve and none remains indeterminate, the aggregate projects the exact union of final item outcomes and never falsely collapses mixed outcomes into one homogeneous stage.

---

# 15. Indeterminate-effect restrictions

While `EFFECT_INDETERMINATE`, only non-conflicting reconciliation/recovery is allowed:

- stable-correlation result/history/delta lookup;
- read-only provider/domain retrieval;
- callback/ExternalObservation/evidence capture;
- resynchronization;
- evidence review;
- manual reconciliation;
- provider-certified idempotent recovery/status call proven incapable of a second effect;
- quarantine/blocking.

Prohibited:

- ordinary effect-bearing retry/resend/reissue;
- `REBIND_TECHNICALLY_COMPATIBLE`;
- `CANCEL_OR_SUPERSEDE_PRE_EFFECT`;
- effect-bearing `CONTINUE_BOUND_PROFILE`;
- conflicting new LogicalCommandId for the same effect;
- assumption that cutover removed prior risk;
- user/agent relabelling without evidence.

Allowed cutover dispositions are exactly:

- `RECONCILE_EXTERNAL_EFFECT`;
- `MANUAL_RECONCILIATION`;
- `BLOCKED_RECONCILIATION_REQUIRED`.

Operational cancellation may stop future attempts but never resolves/relabels effect uncertainty.

Exit requires positive confirmation/disconfirmation.

Absence from an eventually consistent/current-only query is not conclusive unless certified semantics make it conclusive for the operation/time window.

---

# 16. Permanently unresolvable external position

A permanently unresolvable indeterminate effect may not be changed to `TERMINAL_NO_EFFECT` without positive proof.

The owning domain/integration governance may close the operational reconciliation obligation through an explicit bounded disposition such as:

`UNRESOLVED_EXTERNAL_POSITION_ACCEPTED`

The disposition preserves:

- operation/item identity;
- `EFFECT_INDETERMINATE` historical position;
- known/unknown possible effects;
- owner and authority accepting the variance;
- evidence and retrieval attempts;
- reason resolution is impossible;
- risk/impact and downstream restrictions;
- prohibition on unsafe replay;
- correction/reconciliation path if later evidence arrives;
- retention/preservation basis.

Operational closure does not assert effect absence and does not create/alter product commercial truth.

---

# 17. Cutover dispositions

Every non-terminal operation receives exactly one disposition before connector/authority/capability cutover.

Default:

`BLOCKED_RECONCILIATION_REQUIRED`.

## 17.1 CONTINUE_BOUND_PROFILE

Only when explicitly permitted, no new discretion exists, current technical permission exists for new external calls, authority/payload/target/evidence meaning remains unchanged and no dual writer/effect arises.

## 17.2 REBIND_TECHNICALLY_COMPATIBLE

Before effect only, with identical authority, payload, destination, evidence behavior and meaning.

Semantic/authority/payload/target change requires a new logical operation.

## 17.3 CANCEL_OR_SUPERSEDE_PRE_EFFECT

Only when positive evidence establishes no effect exists.

## 17.4 RECONCILE_EXTERNAL_EFFECT

An external effect occurred or may have occurred; preserve/retrieve/reconcile it.

## 17.5 RECOGNIZE_ESTABLISHED_DOMAIN_EFFECT

The domain effect exists and cannot be reversed by cutover.

## 17.6 MANUAL_RECONCILIATION

Exact effect/correlation remains uncertain; conflicting action remains blocked.

## 17.7 BLOCKED_RECONCILIATION_REQUIRED

Safe inspection/reconciliation only.

A late authentic callback from a retired profile remains historical ExternalObservation and does not reactivate authority.

---

# 18. Indeterminate visibility

Every current indeterminate operation/item must expose:

- identity and tenant/project/context;
- target/profile;
- uncertainty start and last effect-bearing attempt;
- uncertainty reason;
- provider/correlation IDs;
- last reconciliation attempt/result;
- permitted next actions;
- blocked conflicting actions;
- owning queue or explicit unassigned-control breach;
- aging/escalation under versioned operational policy;
- evidence limitations.

It cannot appear merely as generic failed, pending or retrying.

This is bounded safety visibility, not a generic case-management subsystem.

---

# 19. ConnectorProfile and AuthorityMapping

Each activated connector version binds:

- tenant/external account/realm;
- technical principal/represented organization;
- project/resource scopes and permissions;
- capabilities and authority mappings;
- source-version behavior;
- transformations;
- freshness/staleness;
- retry/resync;
- evidence/materialization;
- degradation/manual fallback;
- effective period;
- conformance result.

Capability verbs include:

- DISCOVER;
- READ_CURRENT;
- READ_VERSION;
- OBSERVE_CHANGE;
- CAPTURE_EVIDENCE;
- PROPOSE_MAPPING;
- INVOKE_QUERY;
- INVOKE_COMMAND;
- ISSUE_SEND;
- RECEIVE_CALLBACK;
- IMPORT;
- EXPORT;
- RECONCILE;
- ADMIN_CONNECTOR.

Every load-bearing fact/action maps:

- semantic key;
- OWN/MIRROR/REFERENCE/OUT;
- authoritative source/writer;
- direction/verbs;
- transformation authority;
- source/effective/observed times;
- freshness;
- conflict/correction;
- evidence/version/materialization;
- cutover/failure/fallback.

A connector is an adapter, never a co-master.

---

# 20. Transformation and identity mapping

Transformation class is exactly one:

- `TRANSPORT_ONLY`;
- `FORMAT_CANONICALIZATION`;
- `DETERMINISTIC_MAPPING`;
- `PROPOSAL_MAPPING`;
- `DOMAIN_ACCEPTED_TRANSFORMATION`;
- `OUTBOUND_PRESENTATION`.

Fuzzy/AI matching is a proposal.

Weak names, emails, numbers, amounts, filenames, hashes or similarity cannot merge ambiguous identities.

Mapping correction preserves original/corrected mapping, effective periods, evidence/reason/authority, dependent observations/events/migration items/commands/domain/evidence bindings, impact and disposition.

Historical effects never move silently to another target.

---

# 21. External evidence/version conformance

Load-bearing external evidence must pass P1.6 ReconstructionAnchorTest.

A field labelled version/revision is insufficient unless the exact historical version is addressable and not a current-content alias.

Materialization modes remain:

- `ANCHOR_ONLY`;
- `ANCHOR_PLUS_LOCAL_CAPTURE`;
- `LOCAL_CAPTURE_REQUIRED`.

If neither passing anchor nor permitted local capture exists, load-bearing use is blocked/quarantined/limited.

Conformance is revalidated after material provider API/scope/callback/schema/authority/version/materialization/adapter change.

A later conformance failure:

- blocks/limits future affected capabilities;
- records a conformance/evidence-deficiency variance;
- identifies affected profiles/historical bindings where determinable;
- preserves original EvidenceVersion/RelianceBinding/conformance basis;
- never silently invalidates, rebinds or substitutes current content;
- exposes reconstruction limitations;
- routes consequence change through owning-domain/evidence correction where required.

---

# 22. Connector lifecycle/degradation

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

Missed/expired subscriptions record a gap and require delta/history/full resync.

Missing callbacks never imply no change.

Degradation may block freshness-dependent operations, mark stale, queue/retry or use manual/file fallback.

It never changes business state automatically.

---

# 23. Inbound external content and quarantine

All inbound external content is untrusted data, including:

- supplier documents/emails;
- ExternalObservation payloads;
- inbound IntegrationEvents;
- ERP/CDE/bank/technical records;
- CSV/spreadsheet/XML/JSON/PDF/text imports;
- API/portal submissions;
- filenames, metadata, statuses and error text.

Instruction-like content cannot choose/redefine:

- OperationKey;
- tenant/principal/context;
- permission;
- destination;
- idempotency identity;
- review/approval;
- tool use;
- cross-tenant access.

Extracted actions remain Proposal/warning until independently authorized command.

## 23.1 uncorrelated observation retention

An inbound observation lacking current correlation is retained and quarantined when it may be relevant or must be preserved under security/evidence policy.

Preserve exact payload/evidence, source/provider/account/profile candidate scope, provider/correlation IDs, times, validation evidence, failed-correlation history, retention basis and quarantine state.

It cannot create domain truth or authority.

## 23.2 typed trust/admission class

Quarantine records distinguish at least:

- `AUTHENTICATED_OR_PROVIDER_VALIDATED`;
- `SOURCE_ASSERTED_NOT_AUTHENTICATED`;
- `TECHNICALLY_UNVERIFIED`;
- `MALFORMED_OR_SECURITY_SUSPECT`.

They may share bounded quarantine infrastructure but not trust meaning or permitted actions.

## 23.3 retention/disposition

Uncorrelated observations may be correlated, classified duplicate/unrelated/invalid or disposed/minimized only through P1.4/P1.6 retention/security authority.

An active reconciliation/preservation dependency blocks disposal.

Disposition cannot silently remove evidence still required to resolve an indeterminate effect.

---

# 24. Provider-neutral email contract

Activation modes:

- `NO_CONNECTOR_MANUAL`;
- `OUTBOUND_SEND_ONLY`;
- `INBOUND_CAPTURE_SELECTED`;
- `INBOUND_WATCH_SCOPED`;
- `BIDIRECTIONAL_SCOPED`;
- `API_SYSTEM_CHANNEL`.

Outbound sends exact frozen PRODUCT_ISSUED/Transmittal content.

Provider acceptance/message ID is not delivery, acknowledgment or domain effect.

Retry uses same logical send and exact artifact.

Inbound notification is a signal; exact body and separate attachment EvidenceVersions are captured.

Email From is source assertion, not authenticated supplier authority.

Capture is scoped; no full mailbox archive requirement.

Consent revocation stops new access, preserves history, exposes gaps/pending states and leaves manual fallback.

## 24.1 V1 conformance floor

The provider-neutral email port is mandatory V1 substrate.

At least one target-release adapter must be `V1_EMAIL_CORE_CONFORMING` and support:

- `OUTBOUND_SEND_ONLY`;
- `INBOUND_CAPTURE_SELECTED`.

Minimum behavior:

- scoped authorization/revocation;
- exact frozen-artifact send;
- stable logical/provider correlation;
- idempotent retry/no regeneration;
- send/acceptance/delivery/bounce/acknowledgment/effect separation;
- exact selected inbound body/header provenance;
- separate attachment EvidenceVersions;
- sender attribution basis;
- duplicate/error/quarantine handling;
- degradation/manual fallback;
- no full-mailbox archive.

An adapter claiming watch/bidirectional support must also provide subscription lifecycle/expiry visibility, gap detection, resync and incomplete/stale state.

No named provider is selected in P1.7.

A0–A3 remains complete through `NO_CONNECTOR_MANUAL`.

---

# 25. Import/export/migration

Classes:

- BOOTSTRAP_REFERENCE_DATA;
- CURRENT_OPEN_TRANSACTION;
- HISTORICAL_TRANSACTION_FULL;
- HISTORICAL_REFERENCE_ONLY;
- CURRENT_EXTERNAL_FACT_FEED;
- EVIDENCE_ARCHIVE_IMPORT;
- PROPOSAL/STAGING_IMPORT;
- EXPORT/HANDOFF.

Every run/item preserves source/version/time/authority/evidence/mapping/validation/result/error manifest.

No direct status, balance or current-state assignment.

Native open/full-history migration requires a per-domain `MigrationAcceptanceProfile` defining:

- supported source history/state;
- minimum identity/time/evidence/authority/config;
- target migration/domain actions/effects;
- current-state/cutover mapping;
- validation/limitations;
- correction/rollback/forward path.

Without a profile:

- block native import; or
- import as reference-only/evidence with explicit limitations.

No generic opening state/balance.

Physical, certified, accounting-posted and paid actuals never collapse.

Post-live rollback uses domain correction/forward remediation, not deletion.

No fabricated provenance or certainty.

---

# 26. Errors/reconciliation

Primary error layers include:

- transport;
- authentication;
- authorization scope;
- schema;
- identity/reference;
- evidence/provenance;
- freshness/availability;
- authority conflict;
- business precondition/rule;
- concurrency/idempotency;
- transformation/mapping;
- partial batch;
- retention/residency/security;
- unknown quarantine.

Reconciliation distinguishes:

- equality confirmed;
- expected semantic divergence;
- timing lag;
- stale source;
- value/authority/identity/version conflict;
- missing product/external fact;
- evidence deficiency;
- correction not propagated;
- duplicate/replay;
- unknown quarantine.

Reconciliation never means forced equality or overwrite of authoritative truth.

---

# 27. Chat/agent seam

A request resolves only to:

- answer from registered Query;
- Proposal/draft;
- bounded Command request;
- start/track Async Operation;
- explain rejection/limitation;
- abstain unsupported.

Session memory is not authority.

Tool calls carry explicit tenant/principal/context/operation/source/idempotency.

Answer components distinguish authoritative product fact, projection, external observation, source evidence, proposal/derived content, operational status, inference/summary and unknown.

Agents use authorization-filtered OperationRegistry and the same commands as UI/services.

No raw writes, hidden operations or verbal bypass.

P1.9 owns interaction/confirmation UX.

P1.10 owns reasoning/orchestration/memory/confidence/evaluation/autonomy.

---

# 28. BOQ-to-RFQ readiness

Supported optional chain:

`BOQ EvidenceVersion`
`→ extraction Proposal/Async`
`→ normalized-line Proposal`
`→ allocation/package Proposal`
`→ review/accept/correct Command`
`→ ProcurementPackage`
`→ RFQ draft Proposal`
`→ freeze/approval/issue Commands`.

Every proposal preserves source locators and unsupported rows.

AI steps may be disabled/replaced/limited.

The deterministic/manual chain remains.

No autonomous reliability claim is frozen.

---

# 29. ADR-0006 — V1 integration depth

## Tier 0 — mandatory native/manual fallback

End-to-end UI/manual evidence, issue and handoff with no connector.

## Tier 1 — mandatory bounded structured file exchange

Validated import/export with run/item/error manifests and no direct state assignment.

## Tier 2 — mandatory internal foundation / optional external activation

Mandatory from inception:

1. UI-independent bounded service/domain operation layer;
2. OperationRegistry/CapabilityDefinition;
3. invocation/ExecutionAuthorityMode;
4. Query/Proposal/Command/Async contracts;
5. stable command/idempotency/result recovery;
6. canonical domain event/result/audit identities;
7. PublicationIntent/pending recovery for activated outbound paths;
8. ConnectorProfile/AuthorityMapping/ExternalObservation/error/reconciliation abstractions;
9. migration run/item manifests;
10. provider-neutral email port;
11. manual/file adapters and A0–A3 no-connector path;
12. authorization-filtered capability exposure for later UI/chat/tools.

Optional activation:

- public API gateway/transport;
- external broker/webhooks;
- named ERP/CDE/bank/technical connectors;
- chat/agent runtime;
- broad migration;
- deep real-time integration.

## Tier 3 — evidence-driven selected connectors

Email is a V1 capability target with one conforming adapter selected later through evidence.

Other named connectors remain deployment/customer/provider driven.

## Tier 4 — deep real-time integration later by default

No named connector is an A0–A3 prerequisite.

---

# 30. A0–A3 no-connector proof

The first rail executes through:

- bounded internal/manual operations;
- structured files;
- exact issued artifacts;
- manual sending/capture;
- buyer-on-behalf evidence;
- normal comparison/approval/AwardDecision;
- bounded export/manual handoff.

No email API, ERP, CDE, supplier account, public API, broker, chat, AI or historical migration is required.

Later capabilities attach to the same operations/history and may be removed again.

---

# 31. One-XL guard

P1.7 is not:

- enterprise service bus/iPaaS;
- universal warehouse/MDM;
- generic ETL/no-code mapper;
- API-management product;
- event-platform product;
- migration consultancy platform;
- case-management system;
- agent-orchestration platform;
- email/CDE/accounting clone.

Integration remains bounded interface infrastructure around frozen domain authority.

P07 remains the sole XL.

---

# 32. Frozen gate result

- G1 authority/no co-master — PASS
- G2 bounded commands/execution authority — PASS
- G3 Q/P/C/A/proposal-effect — PASS
- G4 event/message separation — PASS
- G5 async/idempotency/publication/callback recovery — PASS
- G6 migration truth/provenance/history — PASS
- G7 P1.6 evidence/version compliance — PASS
- G8 error/conflict/staleness/quarantine — PASS
- G9 cutover/in-flight/no dual writer — PASS
- G10 evolution/disable/replace — PASS
- G11 provider-neutral email/manual fallback — PASS
- G12 chat/agent readiness/no capability assumption — PASS
- G13 ADR-0006/V1 floor/no named connector prerequisite — PASS
- G14 A0–A3 no connector — PASS
- G15 upstream/P07/product-code lock — PASS
- G16 internal and Claude hostile audits — PASS

---

# 33. Regression result

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 34. Accepted ADRs from P1.7

Subject to canonical log reconciliation, P1.7 accepts:

- ADR-0006 — V1 integration depth;
- ADR-0029 — capability-neutral bounded interface substrate;
- ADR-0030 — domain/integration event and immutable publication-recovery boundary;
- ADR-0031 — connector/execution authority, seven-stage effect taxonomy, indeterminate-effect restrictions and conformance;
- ADR-0032 — migration truth and limitation.

Later-owned:

- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

No accepted upstream ADR reopens.

---

# 35. Freeze statement

`PASS — P1.7 Integration, Migration & API Contracts is frozen; P1.8 may begin after final checkpoint and canonical state update.`

Product code remains locked.
