# Construction Procurement OS — P1.7 Self-Contained Claude Hostile Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.7 — Integration, Migration & API Contracts  
**Status entering audit:** INTERNAL RECHECK PASS / P1.7 ACTIVE / P1.8+ LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED / DO NOT REQUEST

---

# 1. Audit mission

Audit only this packet.

Decide whether P1.7 has frozen interface, authority, event, connector, email, migration, retry and future agent-tool meaning strongly enough that later physical design/build can choose APIs, event buses, adapters, providers, storage, UX and AI runtimes without re-deciding:

- what operation is a query, proposal, command or async operation;
- how service/connector/agent authority composes with represented-user authority;
- how idempotency, timeout, retries and duplicate calls preserve one business effect;
- how DomainEvent differs from IntegrationEvent, TransportEnvelope and ExternalObservation;
- what exact mapping/schema/disclosure version a publication retry uses;
- how connector profiles preserve OWN/MIRROR/REFERENCE/OUT and never become co-masters;
- how authority/profile/capability cutover handles in-flight operations;
- how external version/current-pointer evidence is validated;
- how scoped email send/capture/watch works without becoming a mailbox archive;
- how import/migration preserves or explicitly limits identity, time, evidence, authority and history;
- how chat/agents query, propose and invoke bounded actions without capability or autonomy assumptions;
- what V1 substrate must actually be built versus what adapters/transports remain optional;
- how A0–A3 operates with no named connector or AI.

Be hostile. Treat our internal PASS as a claim to attack.

Do not fail P1.7 merely because REST/RPC/GraphQL, database/event store, outbox/queue/broker, API gateway, object storage, exact schemas, OAuth provider, named email/ERP/CDE adapters, UI or AI model/orchestration are intentionally deferred.

Fail P1.7 if later work must still choose authority, operation class/effect, historical publication meaning, cutover behavior, migration truth, or mandatory V1 readiness substrate.

---

# 2. Frozen upstream state

- P1.0 CLOSED
- P1.1 PASS / FROZEN
- P1.2 PASS / CLOSED
- P1.3 PASS / CLOSED
- P1.4 PASS / CLOSED / FROZEN
- P1.5 PASS / CLOSED / FROZEN
- P1.6 PASS / CLOSED / FROZEN
- P1.7 ACTIVE
- P1.8+ LOCKED
- Product code NOT STARTED / LOCKED

P07 commitment/change/valuation/commercial truth remains the sole independent XL gravity well.

A0–A3 first rail:

`requirement / MR / package`
`→ RFQ/tender`
`→ supplier response`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`.

A0–A3 must work without P07, named ERP/CDE/email connector, supplier network/account, CPM/BPM, WMS, chat or advanced AI.

## P1.4 inheritance

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative writer/source per effective period;
- connector/middleware never business authority;
- historical authority/config binding;
- governed authority transfer/cutover;
- external fact freshness/conflict;
- tenant and cross-tenant model-mediated isolation.

## P1.5 inheritance

- no generic status/commercial mutation;
- bounded domain actions/TX lifecycle;
- history-preserving correction;
- idempotency/concurrency/numbering;
- product commercial versus accounting/tax/payment truth;
- exact money/time/config versions;
- workflow/evidence/integration state never directly writes P07 truth;
- AI-derived value never becomes source/domain truth automatically.

## P1.6 inheritance

- EvidenceRecord/EvidenceVersion/content/source/occurrence/locator separation;
- immutable historical RelianceBinding;
- mandatory ReconstructionAnchorTest;
- explicit external materialization policy;
- exact issued artifact/member-set identity;
- issue/send/delivery/read/ack/content/domain-effect separation;
- immutable CommunicationSatisfactionRule;
- CommunicationSatisfactionSnapshot + established-once domain effect;
- later evidence correction never automatically reverses/re-times domain truth;
- retention/redaction/disposition/export and bounded evidence actions.

---

# 3. User direction / capability stance

P1.7 is **not an AI capability promise phase**.

It is a capability-neutral integration/readiness foundation.

Unknown examples:

- whether AI can reliably turn every BOQ into correct procurement packages;
- whether it can create a ready-to-issue RFQ autonomously;
- whether it can evaluate/negotiation/approve reliably.

P1.7 must support manual, deterministic parser, AI-assisted proposal, human-reviewed automation and later stronger autonomy without changing deterministic truth.

Readiness now; capability claims later.

Chat should be possible later, but ordinary UI/manual search/operation remains independently complete.

Email connectivity is a required V1 product capability target, but no named provider is an A0–A3 prerequisite.

---

# 4. Current official-practice evidence

Official documentation reviewed:

## SAP Ariba

- API index: https://help.sap.com/docs/ARIBA_APIS
- Event Management API: https://help.sap.com/docs/ARIBA_APIS/0414af6b17164879920cf26608ae643d/event-management-api
- v2 endpoints: https://help.sap.com/docs/ariba-apis/event-management-api/event-management-api-v2-endpoints

Observed:

- business-oriented event/item/participant/bid/award/document/approval APIs;
- explicit asynchronous jobs for publish/edit/timing/invitation actions;
- some objects are readable but not writable;
- pagination and external correlation IDs;
- integration monitoring/status APIs.

## Coupa

- sourcing/quote requests and responses APIs;
- supplier/requisition/purchase-order/change APIs;
- Navi conversational support/Agent Studio positioning.

Observed:

- sourcing events/responses/line award through explicit APIs;
- resource restrictions; not all fields/resources directly writable;
- conversational support increasingly layered over procurement platform;
- AI product presence does not prove construction BOQ/package reliability.

## Procore

- developer platform, scoped company/project APIs;
- bid package/bid/document APIs;
- versioned webhooks;
- platform currently describes integrations/apps/agents over common APIs.

## Autodesk / BuildingConnected

- ACC item/version/data APIs;
- BuildingConnected bid/opportunity webhooks;
- Autodesk Assistant supports project questions, prompt library/chat history;
- official Tech Preview material states results may not be accurate.

## Microsoft Graph / Gmail

- scoped send/read/watch permissions;
- send acceptance distinct from delivery;
- webhook/push notifications are signals;
- subscription expiration/removal/reauthorization/missed-notification recovery;
- delta/history/full resynchronization required;
- provider IDs/checkpoints and retries.

Evidence-derived foundation patterns:

1. bounded business APIs, not arbitrary fields;
2. actions/jobs separate from resources;
3. webhooks are lossy/replayed signals, not source truth;
4. provider subscription/permission lifecycle and resync are normal;
5. pagination/partial results are first-class;
6. scoped least privilege;
7. common platform APIs can serve UI/apps/agents;
8. conversational access is useful, but AI reliability remains capability-specific and uncertain.

Competitor parity is not the decision. These patterns inform the candidate below.

---

# 5. Closed operation classes

Every registered operation has exactly one primary class:

## QUERY

Authorized read with explicit consistency/as-of/projection/source/freshness classification.

No state change and no implied permission to act.

## PROPOSAL

Versioned non-authoritative draft/derived result with source/tool/config provenance, ambiguities and no business effect.

## COMMAND

Only direct state-transition request class. Routes to bounded owning-domain action with guards, authority, expected version, evidence/config, idempotency and explicit result.

## ASYNC_OPERATION

Durable operation/status for long-running work. Acceptance/progress is not domain completion. Terminal output is explicit: query/export, proposal, command result, import/migration manifest, evidence result or partial/error report.

No freeform action/generic CRUD fifth class.

---

# 6. OperationRegistry / CapabilityDefinition

Every operation/capability has versioned metadata:

- stable key/class/owner/purpose;
- input/output semantic versions;
- permitted initiators;
- tenant/project/resource/ContractingAuthorityContext requirements;
- authority/capability/grant;
- consistency/as-of or expected state/preconditions;
- evidence/source/config prerequisites;
- idempotency/retry/async/bulk behavior;
- sensitivity/residency;
- side effect;
- activation/deprecation/manual fallback.

Endpoint URL, UI button, model tool name or connector method maps to the definition; it cannot redefine it.

Capability lifecycle:

- DEFINED_DISABLED;
- EXPERIMENTAL;
- ENABLED_REVIEW_REQUIRED;
- ENABLED_BOUNDED_AUTOMATION;
- DEPRECATED;
- RETIRED.

Before P1.10, state-changing AI/agent capabilities remain disabled/experimental/review-required. Bounded automation may be enabled only for deterministic system operations already frozen by domain rules.

---

# 7. Common invocation context

Every invocation carries/resolves:

- OperationKey/version;
- tenant;
- project/resource/ContractingAuthorityContext;
- authenticated principal;
- acting/represented principal;
- initiator identity/class;
- ExecutionAuthorityMode;
- current authorization/grant/capability;
- LogicalCommand/Invocation/idempotency identity;
- causation/correlation;
- input schema/version;
- expected state/version/precondition;
- requested effective/as-of basis;
- evidence/source/proposal/config/policy refs;
- execution time.

Hidden UI/chat session or connector cache cannot substitute for load-bearing context.

---

# 8. Closed ExecutionAuthorityMode

Every command/privileged integration action binds exactly one:

## DIRECT_PRINCIPAL

Authenticated principal is acting principal. Effective authority is current internal P09/domain authority for exact context/action. Technical scope can reduce, never add, authority.

## DELEGATED_ON_BEHALF

Service/connector/agent acts for represented principal.

Permission is the intersection of:

1. technical initiator capability;
2. valid versioned delegation/on-behalf grant;
3. represented principal current domain authority;
4. exact tenant/resource/context/operation scopes;
5. command guards/evidence.

No union/escalation/implicit impersonation.

## SYSTEM_BOUNDED

Explicitly registered deterministic system operation under exact policy/scope, no discretionary commercial judgment and full audit.

Cannot be used for arbitrary award/approval/Commitment choices.

## EXTERNAL_SOURCE_SUBMISSION

External grant allows exact source submission/capture action, such as supplier response/acknowledgment, within resource scope.

It cannot satisfy internal buyer approval/AwardDecision/Commitment/certification/payment authority.

## HISTORICAL_IDEMPOTENT_RECOVERY

System records/returns/publishes/recognizes a fact already established under immutable historical basis. Current system recovery permission required; no new discretion/effect.

No valid mode = deny.

---

# 9. Query semantics

Consistency class is one of:

- AUTHORITATIVE_CURRENT;
- AS_OF_EFFECTIVE_TIME;
- AS_OF_RECORDED_TIME;
- PROJECTION_VERSIONED;
- EXTERNAL_OBSERVED;
- SEARCH_INDEX_DERIVED;
- MIXED_EXPLICIT.

For multi-resource/domain query, declare:

- ATOMIC_DOMAIN_SNAPSHOT;
- CONSISTENT_AS_OF_CUT;
- CAUSALLY_BOUND_RESULT_SET;
- NON_ATOMIC_MIXED_OBSERVATION with component times/limitations.

A mixed observation cannot be presented as one simultaneous state or consumed by a command unless explicitly allowed with per-component authority/freshness/skew guards.

Pagination/partial/cursor/completeness and authorization filtering are explicit. Chat cannot claim “all” from a partial page.

---

# 10. Proposal semantics

Proposal has identity/version/status, exact input/source/evidence/locator, tool/model/parser/config execution where load-bearing, assumptions/ambiguities/unsupported items and review/correction history.

It never becomes authoritative through confidence, viewing, export, timeout or lack of correction.

A separate command accepts/corrects it and produces authoritative domain event/history.

BOQ extraction, normalized lines, package grouping, RFQ/email drafts and fuzzy mappings are proposal operations unless deterministic domain rules say otherwise.

---

# 11. Command/result semantics

Command defines source state/context, action, guards, authority, expected version/preconditions, evidence/config, result event/effect, correction and idempotency.

Prohibited generic meanings:

- arbitrary update/patch;
- set status;
- mark approved/awarded/paid;
- insert event;
- overwrite historical evidence/balance.

Result classes include completed, duplicate-completed, async-accepted, authentication/authorization/precondition/business rejection, version/authority conflict, unresolved evidence/dependency, quarantine and terminal failure.

Async acceptance is never reported as completion.

---

# 12. Stable identities / idempotency

Distinct:

- InvocationId;
- LogicalCommandId;
- AsyncOperationId;
- DomainEventId;
- IntegrationEventId;
- TransportAttemptId;
- ExternalCorrelationId;
- Batch/Item IDs;
- MigrationRun/Item IDs;
- P1.6 snapshot ID where applicable.

Timeout = outcome unknown until resolved. Retry uses same logical identity.

Same key + materially different payload/context = conflict.

Duplicate completion returns original result.

Concurrent attempts create at most one effect.

Cancellation never reverses completed domain effects.

---

# 13. Event/message classes

## DomainEvent

Authoritative owning-domain fact.

## IntegrationEvent

Versioned consumer-facing representation of a source fact/event.

## TransportEnvelope

Delivery/routing/attempt metadata.

## ExternalObservation

Provider/external source observation such as ERP status, callback or current master fact.

Incoming webhook is observation, never product DomainEvent.

Receiving IntegrationEvent grants no write/authority.

---

# 14. PublicationIntent / publication recovery

Every publishable source event/result binds immutable PublicationIntent:

- source event/fact/version;
- exact mapping version;
- IntegrationEvent semantic/schema version;
- disclosure/redaction profile version;
- source/authority classification;
- destination/profile/subscription scope where material;
- exact payload ContentIdentity OR complete deterministic generation basis;
- correlation/causation/publication identity;
- retry/replay rules.

Generation basis includes representation-affecting serializer/canonicalization/encoding/template/formatter/locale/timezone/currency/default/enum/member versions where applicable.

Retry uses original intent.

New mapping/schema/disclosure = new related publication, not retry.

If current security/legal policy prohibits an undelivered old payload, block/quarantine/cancel that delivery explicitly and create a permitted new publication if appropriate; do not mutate old intent.

Domain commit remains authoritative if publication fails. Publication has pending/retry/quarantine state.

---

# 15. At-least-once / ordering / replay

Transport may miss, duplicate, reorder or replay.

Exactly-once domain effect comes from stable identity/idempotent domain consumers, not transport assumption.

No universal total order. Event family declares aggregate/resource/external stream/operation/subscription ordering key.

Sequence gap causes resync/reconciliation/quarantine.

Replay republishes history with replay metadata; it does not recreate events/effects.

Correction creates new event/history; no edit in place.

---

# 16. In-flight effect stages

Every state-changing/external-effect operation identifies:

- PRE_ACCEPTANCE;
- ACCEPTED_PRE_EFFECT;
- EXTERNAL_EFFECT_EMITTED;
- DOMAIN_EFFECT_ESTABLISHED;
- TERMINAL_NO_EFFECT;
- PARTIAL_EFFECT with enumerated effects.

Queue/running/progress is separate.

Acceptance freezes operation/input/evidence/config/idempotency meaning but does not preserve represented-user authority for a later discretionary command after revocation.

OperationDefinition declares current revalidation points for product authority, external technical scope, profile/freshness and business preconditions.

Already-emitted/established facts cannot be denied by later revalidation.

---

# 17. Cutover dispositions

Before connector/authority/capability cutover, every non-terminal operation gets exactly one disposition.

Default = BLOCKED_RECONCILIATION_REQUIRED.

- CONTINUE_BOUND_PROFILE — explicitly permitted, no new discretion, current technical access for new external call, no dual writer/effect.
- REBIND_TECHNICALLY_COMPATIBLE — before effect only; technical adapter/routing changes but authority, payload, target, evidence behavior and meaning are identical.
- CANCEL_OR_SUPERSEDE_PRE_EFFECT — no effect; preserve history/new operation if replacement.
- RECONCILE_EXTERNAL_EFFECT — external action occurred; preserve/retrieve/reconcile; no denial.
- RECOGNIZE_ESTABLISHED_DOMAIN_EFFECT — domain event exists; no reversal; historical recovery for remaining work.
- MANUAL_RECONCILIATION — exact effect/correlation uncertain; block conflict.
- BLOCKED_RECONCILIATION_REQUIRED — safe inspection only.

Semantic/authority/payload/target change requires new logical operation.

Late authentic callback from retired profile is preserved under historical profile and reconciles old external action; it cannot reactivate profile or authorize new command.

---

# 18. ConnectorProfile / AuthorityMapping

Every activated connector version binds tenant/external account/technical principal/represented organization/resource scopes/permissions/capabilities/authority mappings/version semantics/transformation/freshness/retry/resync/materialization/degradation/effective period/conformance.

Capability verbs are explicit: discover/read current/read version/observe/capture/propose/query/command/send/callback/import/export/reconcile/admin.

For every load-bearing fact/action, AuthorityMapping states:

- semantic key;
- OWN/MIRROR/REFERENCE/OUT;
- authoritative source/writer;
- direction/allowed verbs;
- transformation authority;
- source/effective/observed times;
- freshness/staleness;
- conflict/correction;
- evidence/version/materialization;
- cutover/failure/manual fallback.

Connector is operational adapter, never co-master.

---

# 19. Transformation / identity mapping

Transformation class:

- TRANSPORT_ONLY;
- FORMAT_CANONICALIZATION;
- DETERMINISTIC_MAPPING;
- PROPOSAL_MAPPING;
- DOMAIN_ACCEPTED_TRANSFORMATION;
- OUTBOUND_PRESENTATION.

Fuzzy/AI mapping is proposal.

External identity mapping preserves source account/object/version/product target/type/effective/history. Weak names/emails/numbers/hash/similarity cannot merge ambiguous identities.

Mapping correction preserves original/corrected mapping, all dependent observations/events/migration items/commands/domain/evidence bindings, impact and reconciliation/domain-correction disposition. It does not move historical effects silently.

---

# 20. External evidence/version conformance

Load-bearing external source must pass P1.6 mandatory ReconstructionAnchorTest.

A provider field called version/revision is insufficient without proof it is historically addressable and not current alias.

Materialization:

- ANCHOR_ONLY;
- ANCHOR_PLUS_LOCAL_CAPTURE;
- LOCAL_CAPTURE_REQUIRED.

If neither exact anchor nor permitted capture exists, block/quarantine/limited reference.

Connector conformance revalidates after material provider API/scope/version/callback/schema/authority/version-semantics/materialization/adapter change.

---

# 21. Connector lifecycle / degradation

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

On missed/removed/expired subscription:

- record gap/checkpoint;
- use provider delta/history/full resync;
- never infer no changes;
- preserve unrecoverable gap;
- historical evidence remains.

Degradation may block freshness-dependent actions, queue/retry, mark stale or use manual/file fallback. It never changes business state automatically.

---

# 22. Email connector

Activation modes:

- NO_CONNECTOR_MANUAL;
- OUTBOUND_SEND_ONLY;
- INBOUND_CAPTURE_SELECTED;
- INBOUND_WATCH_SCOPED;
- BIDIRECTIONAL_SCOPED;
- API_SYSTEM_CHANNEL.

Outbound:

- exact PRODUCT_ISSUED/Transmittal content;
- connector cannot mutate body/member/addressees/rule;
- provider accepted/message ID ≠ delivery/ack/domain effect;
- retries use same logical send/exact artifact.

Inbound:

- notification is signal;
- retrieve exact message/body/attachments;
- body and attachments separate EvidenceVersions;
- email From is assertion, not supplier authority;
- forwarding/import preserves original/capture actor distinction;
- bounded scope, no full-mailbox archive.

Consent revocation stops new access, preserves history, exposes gaps/pending state and uses manual fallback.

Provider-neutral port/interface is mandatory V1 substrate.

A V1 release/build plan must select at least one deployable conforming email adapter for its target deployment class through a pre-implementation selection gate, but no provider is selected by this architecture and A0–A3 does not depend on activation.

---

# 23. Import/export/migration

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

No direct status/balance/current-state assignment.

Native open/history import requires a versioned domain-family MigrationAcceptanceProfile specifying minimum history/evidence/authority/time/config, target actions/effects, cutover and correction.

Default without profile = block native import or reference-only/evidence-limited.

No generic opening state/balance.

Physical, certified, accounting-posted and paid actuals cannot collapse.

Cutover forbids dual writer and defines in-flight behavior.

Post-live rollback uses domain correction/forward remediation, not history deletion.

---

# 24. Error/reconciliation/degradation taxonomy

Primary layers:

transport; authentication; authorization scope; schema; identity/reference; evidence/provenance; freshness/availability; authority conflict; business precondition/rule; concurrency/idempotency; transformation/mapping; partial batch; retention/residency/security; unknown quarantine.

Reconciliation classes distinguish equality, expected divergence, timing lag, stale source, value/authority/identity/version conflict, missing product/external fact, evidence deficiency, unpropagated correction, duplicate/replay and unknown.

Reconciliation never means forced equality or overwrite.

UI/chat separates domain state, operation state, connector health, external freshness, reconciliation issue and evidence limitation.

---

# 25. Chat/agent seam

Meaningful request resolves to:

- answer from query;
- create proposal/draft;
- request bounded command;
- start/track async operation;
- explain rejection/limitation;
- abstain unsupported.

Session memory is not authority. Every tool call carries explicit tenant/principal/context/operation/source/idempotency.

Answer components classify as product fact, projection, external observed fact, source evidence, proposal/derived, operational status, inference/summary or unknown.

Load-bearing explanations support structured references to canonical records/events/EvidenceVersion/SourceLocator/RelianceBinding/config/authority/operation.

Agent uses authorization-filtered capability registry and same commands as UI/services.

No raw DB/event writes, hidden operations or verbal bypass.

Supplier documents/emails are untrusted data, not tool instructions.

P1.9 owns chat UX; P1.10 owns reasoning/orchestration/memory/confidence/autonomy/evaluation.

---

# 26. BOQ-to-RFQ readiness

Possible safe chain:

BOQ EvidenceVersion
→ extraction proposal/async
→ normalized-line proposal
→ allocation/package proposal
→ review/accept/correct command
→ package
→ RFQ draft proposal
→ freeze/approval/issue commands.

Every proposal retains source locators and unsupported rows.

Any AI step may be disabled/replaced/limited.

Manual deterministic chain remains.

No claim of full autonomous reliability.

---

# 27. ADR-0006 / V1 integration depth

## Tier 0 — native/manual fallback — mandatory

End-to-end UI/manual evidence/issue/handoff, no connector.

## Tier 1 — bounded structured file exchange — mandatory foundation

Validated import/export/run/item/error manifests, no direct state assignment.

## Tier 2 — generic operation/event/connector/email foundation — mandatory implementation substrate, optional activation

Internal operation registry/service/idempotency/profile/publication/error/email-port foundation must be implemented from inception.

Public external API transport, event broker/webhooks and chat runtime are optional activation.

## Tier 3 — selected named connectors — evidence-driven optional deployment

Email target requires at least one conforming deployable adapter in V1 release/build planning, but named provider is selected later; ERP/CDE/etc remain customer/provider evidence-driven.

## Tier 4 — deep real-time transactional integration — later by default

No named connector prerequisite for A0–A3.

---

# 28. A0–A3 no-connector proof

End-to-end operation through:

- bounded internal/manual commands;
- structured files;
- exact product-issued artifacts;
- manual send/capture;
- buyer-on-behalf evidence;
- normal comparison/approval/AwardDecision;
- bounded export/manual handoff.

No email API, ERP, CDE, supplier account, chat, AI or historical migration required.

Later activation uses same semantics and can be removed.

---

# 29. Internal hostile audit history

Initial internal verdict:

`FAIL / NARROW SEMANTIC REMEDIATION REQUIRED`.

## BL-P17-01 — execution authority composition

Closed by five ExecutionAuthorityModes and intersection rule for delegated action.

## BL-P17-02 — in-flight cutover dispositions undefined

Closed by effect stages, exact disposition rules, current revalidation, default block and historical recovery boundary.

## BL-P17-03 — publication retry mapping/schema/redaction drift

Closed by immutable PublicationIntent and complete representation-generation binding.

## BL-P17-04 — ADR-0006 V1 implementation floor ambiguous

Closed by mandatory internal substrate, optional transports/adapters and required email-capability target/selection gate.

Watches closed:

- per-family MigrationAcceptanceProfile;
- multi-resource query consistency cut;
- capability disablement disposition;
- identity-mapping correction impact;
- connector conformance revalidation;
- no AI autonomous state change before P1.10;
- late callback after cutover;
- mixed-query command use;
- external source-submission boundary;
- exact publication serialization/template binding.

Post-remediation internal verdict:

`PASS — P1.7 internal blockers are closed; external hostile audit ready.`

---

# 30. Current gate claim

G1 one authority/no connector co-master — PASS
G2 all state changes through registered bounded commands — PASS
G3 Q/P/C/A and proposal/effect boundary — PASS
G4 DomainEvent/IntegrationEvent/TransportEnvelope/ExternalObservation separation — PASS
G5 deterministic crash/retry/publication/callback recovery — PASS
G6 migration/import identity/time/evidence/authority/history — PASS
G7 P1.6 reconstruction/materialization — PASS
G8 typed conflict/error/staleness/quarantine/no forced equality — PASS
G9 authority transfer/cutover/no dual writer — PASS
G10 schema/capability/API/event evolution/disable/replace — PASS
G11 provider-neutral email/manual fallback — PASS
G12 chat/agent readiness/no reliability assumption — PASS
G13 ADR-0006/no named connector prerequisite — PASS
G14 A0–A3 no-connector end-to-end — PASS
G15 P1.1–P1.6 regression NO/P07 sole XL/product code locked — PASS
G16 internal PASS; Claude pending

Regression claim:

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN
- Product code = LOCKED

---

# 31. Non-blocking later debt

- exact API/RPC/tool/event/file schemas and technology;
- named email adapter/provider selection under implementation gate;
- connector-specific version/conformance evidence;
- detailed P1.8 query/projection/report design;
- P1.9 chat/navigation/confirmation UX;
- P1.10 AI evaluation/confidence/orchestration/autonomy/security;
- per-domain MigrationAcceptanceProfiles only when migration activated;
- exact public API/marketplace strategy;
- customer-specific ERP/CDE integration scope.

These should not require re-deciding P1.7 meaning.

---

# 32. Candidate ADR impact

No ADR has changed yet.

## ADR-0006 — V1 ERP/accounting/integration depth

Candidate:

`ACCEPT SEMANTIC DECISION`

using tiered depth and explicit implementation floor/email target.

## ADR-0029 — capability-neutral bounded interface substrate

Candidate:

`ACCEPT SEMANTIC DECISION`

Closed Q/P/C/A, one OperationRegistry/invocation/result meaning for UI/services/import/connectors/chat/agents, optional capability lifecycle/manual fallback, proposals require bounded acceptance command.

## ADR-0030 — domain/integration event and publication-recovery boundary

Candidate:

`ACCEPT SEMANTIC DECISION`

DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation; immutable PublicationIntent; at-least-once/missed/reordered recovery without duplicate domain effect.

## ADR-0031 — connector/execution authority and conformance model

Candidate:

`ACCEPT SEMANTIC DECISION`

ExecutionAuthorityMode, per-fact/action AuthorityMapping, cutover/effect-stage semantics, version/evidence/freshness/degradation/conformance and no co-master.

## ADR-0032 — migration truth and limitation model

Candidate:

`ACCEPT SEMANTIC DECISION`

Migration classes/manifests, per-family acceptance profiles, no direct state assignment/fabricated provenance, reference-only/quarantine default.

Auditor may recommend consolidation only if traceability remains equally explicit.

Later-owned remain:

- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

State if any accepted P1.4–P1.6 ADR must reopen.

---

# 33. Required hostile scenarios

Attack at minimum:

1. service account has broad capability; represented user lacks project authority;
2. agent/connector tries implicit impersonation;
3. external supplier submission attempts internal approval/effect;
4. user command accepted then delegation revoked before execution;
5. external request emitted before connector cutover;
6. credential-only adapter replacement versus target/authority-changing replacement;
7. no cutover disposition supplied;
8. callback from retired connector after cutover;
9. domain commit succeeds but publication fails;
10. mapping/schema/redaction/serializer changes before retry;
11. old publication payload becomes newly prohibited before undelivered retry;
12. duplicate UI/agent command after timeout;
13. callback arrives before local request persistence;
14. webhook subscription misses changes and provider has current-only state;
15. event replay/correction ordering;
16. multi-resource query read at mixed times then used by chat/command;
17. BOQ/package proposal high-confidence auto-accept attempt;
18. capability disabled during async work;
19. public API/chat/broker never activated;
20. email provider permission revoked;
21. same email body/attachment delivered twice or resent with changed body;
22. source identity mapping corrected after domain events used it;
23. open transaction migration has no MigrationAcceptanceProfile;
24. legacy `actual` has unknown meaning;
25. current CDE pointer imported as historical evidence;
26. batch partial failure/restart/cancel;
27. provider changes historical-version semantics after connector certification;
28. supplier document contains prompt/tool instructions;
29. no named connector first tender;
30. team attempts to turn P1.7 into iPaaS/agent platform.

Add your own scenarios.

---

# 34. Required response format

## VERDICT

Choose exactly:

`PASS — P1.7 Integration, Migration & API Contracts can close; proceed to final ADR reconciliation/checkpoint and unlock P1.8.`

or

`FAIL — P1.7 remains open; blockers below must be remediated.`

## BLOCKERS

For each:

- blocker ID;
- section/clause;
- failure mode;
- concrete scenario;
- why later design/build must choose authority/operation/event/migration meaning;
- narrowest remediation.

Do not turn physical implementation preferences into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic;
- competitor/evidence/legal;
- later physical/implementation;
- P1.8/P1.9/P1.10-owned.

## GATE CHECK

PASS/FAIL with reason:

- G1 authority/no co-master
- G2 bounded commands/execution authority
- G3 Q/P/C/A/proposal-effect
- G4 event/message class separation
- G5 async/idempotency/publication/callback recovery
- G6 migration truth/provenance/history
- G7 P1.6 evidence/version compliance
- G8 error/conflict/staleness/quarantine
- G9 cutover/in-flight/no dual writer
- G10 evolution/disable/replace
- G11 email/provider-neutral/manual fallback
- G12 chat/agent readiness/no capability assumption
- G13 ADR-0006/V1 floor/no named connector prerequisite
- G14 A0–A3 no-connector
- G15 upstream/P07/product-code
- G16 audit readiness

## REGRESSION CHECK

- P1.1 REOPEN = YES/NO
- P1.2 REGRESSION = YES/NO
- P1.3 REOPEN = YES/NO
- P1.4 REOPEN = YES/NO
- P1.5 REOPEN = YES/NO
- P1.6 REOPEN = YES/NO
- SECOND XL = CLEAN/FAIL
- A0–A3 ACTIVATION = CLEAN/FAIL

## ADR IMPACT

For ADR-0006, ADR-0029, ADR-0030, ADR-0031 and ADR-0032 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0016/0017 remain later-owned.

State if any accepted upstream ADR must reopen.

## P1.8 READINESS

Choose:

`READY AFTER P1.7 FINAL CHECKPOINT`

or

`NOT READY`

---

# 35. Final question

Is any load-bearing P1.7 decision still ambiguous enough that P1.8/later physical design would have to choose operation/effect class, service/agent/connector authority, retry/publication meaning, cutover disposition, external version authority, migration truth/limitation or the mandatory V1 readiness substrate?

A clean PASS is appropriate only if the answer is NO.
