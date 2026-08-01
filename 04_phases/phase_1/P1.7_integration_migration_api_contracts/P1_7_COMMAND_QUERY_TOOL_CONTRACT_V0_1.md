# P1.7 — Command, Query & Tool Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define one semantic invocation/result contract for humans, product services, APIs, imports, connectors, chat and future agents while preserving frozen domain authority, evidence, concurrency and history.

This contract does not prescribe REST, GraphQL, RPC, SDK, message bus, tool-calling protocol or UI.

---

# 2. OperationRegistry

Every externally or cross-component invokable operation has a versioned registered definition.

It identifies:

- stable `OperationKey`;
- primary class QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- owning domain/service;
- semantic input/output versions;
- permitted initiator classes;
- authority/capability requirement;
- tenant/project/resource/ContractingAuthorityContext requirement;
- consistency/as-of semantics for reads;
- expected version/preconditions for writes;
- evidence/config/source prerequisites;
- idempotency/retry contract;
- sync/async result contract;
- bulk/per-item behavior;
- deprecation/compatibility state;
- side-effect declaration.

An endpoint, URL, UI action or model tool name may map to an OperationKey but cannot redefine its meaning.

---

# 3. Common InvocationEnvelope

Every invocation carries or deterministically resolves:

1. `OperationKey` + semantic version;
2. tenant identity;
3. project/resource scope where applicable;
4. ContractingAuthorityContext where required;
5. authenticated principal;
6. acting principal and represented principal where applicable;
7. initiator identity/class;
8. current authorization/grant/capability context;
9. stable logical Invocation/Command ID;
10. idempotency key and scope;
11. correlation and causation IDs;
12. exact input payload/schema version;
13. expected target version/state/precondition where applicable;
14. requested effective/as-of time and basis where supported;
15. source/evidence/proposal/config/policy references;
16. locale/timezone/currency/display context only where semantically relevant;
17. execution/request time;
18. optional client metadata that cannot change domain meaning.

Hidden chat memory, HTTP session, connector cache or user interface state cannot substitute for load-bearing context.

---

# 4. Principal semantics

## P01 — authenticated principal

Identity authenticated for the invocation.

## P02 — acting principal

Person/service/agent executing the request.

## P03 — represented principal/organization

Party on whose behalf the action is asserted where applicable.

## P04 — initiator process

UI, internal service, connector, import job, chat/agent or other process that submitted the invocation.

These may differ and must remain reconstructable where load-bearing.

External authentication/grant never substitutes for internal P09/domain authority.

---

# 5. QUERY contract

A QUERY:

- cannot change authoritative state;
- declares result schema/projection version;
- declares consistency/as-of context;
- enforces authorization at fact/resource/field/evidence grain as applicable;
- supports pagination/cursors/limits;
- may return stale/external/projected data only with authority/freshness classification;
- includes evidence/source/provenance links where requested/supported;
- never implies command permission.

## Q01 — consistency classes

Every query defines one:

- `AUTHORITATIVE_CURRENT` — current owning-domain state under its consistency contract;
- `AS_OF_EFFECTIVE_TIME` — historical/effective interpretation under bound versions;
- `AS_OF_RECORDED_TIME` — what was recorded/known by a recorded-time point where supported;
- `PROJECTION_VERSIONED` — named/versioned projection definition;
- `EXTERNAL_OBSERVED` — externally authoritative/reference fact with observation/freshness context;
- `SEARCH_INDEX_DERIVED` — convenience/search result that must resolve back to canonical records/evidence;
- `MIXED_EXPLICIT` — combines classes but labels every component/source.

No generic “current” answer may silently blend product commercial, external accounting and projected/search data.

## Q02 — pagination and completeness

Result declares:

- page/cursor/limit;
- partial/truncated status;
- next cursor where available;
- total only if semantically supported;
- source/filter/as-of basis;
- authorization-filtering effect where disclosure is permitted.

Chat/agent summaries cannot claim complete estate coverage from a partial result.

## Q03 — explanation/citation

An explanation query may return:

- canonical fact/event IDs;
- governing config/authority versions;
- RelianceBinding/EvidenceVersion/SourceLocator;
- causal/correction history;
- external source/freshness/conflict;
- limitation/unknown state.

Generated prose remains a rendering of the result, not the authoritative result itself.

---

# 6. PROPOSAL contract

A PROPOSAL invocation returns a versioned non-authoritative proposal/draft/derived observation.

Required semantics as applicable:

- ProposalKey/version;
- status: DRAFT / READY_FOR_REVIEW / REVIEWED / REJECTED / SUPERSEDED / ACCEPTED_REFERENCE / EXPIRED;
- exact input/source/evidence/locator versions;
- tool/model/parser/config execution identity;
- unresolved/ambiguous/unsupported items;
- transformations/assumptions;
- proposed target domain operation/data;
- review/correction history;
- no direct domain effect.

`ACCEPTED_REFERENCE` means the proposal was used by a separate domain command; it does not transform proposal history into source/domain truth.

Proposal outputs may be edited only through new proposal versions/history-preserving correction.

---

# 7. COMMAND contract

A COMMAND is the only registered operation class that requests an owning-domain state transition directly.

Every command definition states:

- source/current state/context;
- exact bounded action;
- input semantic contract;
- guards/invariants;
- required authority/control;
- expected version/preconditions;
- evidence/proposal/config bindings;
- effective-time/backdate rules;
- result event/state;
- economic effect or explicit NONE/SCOPE/EXTERNAL classification;
- correction/reversal/supersession path;
- idempotency/concurrency semantics;
- evidence/config/version/audit output.

This inherits P1.5’s nine-field transition standard where applicable.

## C01 — no generic CRUD

Prohibited external meanings include:

- update arbitrary fields;
- set status;
- mark approved/awarded/paid;
- replace current document/evidence;
- insert event;
- delete historical record;
- patch commercial amount without domain action.

A technical PATCH/PUT may implement a bounded command only if the semantic operation remains explicit.

## C02 — expected state/version

State-changing command must carry or resolve a causal precondition such as:

- aggregate/resource version;
- domain state;
- governing basis/version;
- snapshot/proposal version;
- expected unconsumed allocation/residual;
- expected current authority profile.

Mismatch returns typed conflict/rejection; middleware cannot silently reread and apply different meaning unless the operation contract explicitly permits safe rebasing.

## C03 — current authority

Current authorization/security is checked at command execution except where frozen upstream semantics establish an already-effective historical fact and the operation is only idempotently persisting/recognizing it, such as P1.6 snapshot establishment.

## C04 — result

Command result states exactly one:

- `COMPLETED` — domain event/state established;
- `DUPLICATE_COMPLETED` — same logical command already completed; returns same result;
- `ACCEPTED_ASYNC` — accepted for asynchronous processing, not complete;
- `REJECTED_AUTHENTICATION`;
- `REJECTED_AUTHORIZATION`;
- `REJECTED_PRECONDITION`;
- `REJECTED_BUSINESS_RULE`;
- `CONFLICT_VERSION`;
- `CONFLICT_AUTHORITY`;
- `UNRESOLVED_EVIDENCE`;
- `UNAVAILABLE_DEPENDENCY`;
- `QUARANTINED`;
- `FAILED_TERMINAL`.

Extensions require controlled contract versioning.

---

# 8. ASYNC_OPERATION contract

An async operation is not a weak command result. It has its own durable identity and lifecycle.

## A01 — states

Closed common states:

- `ACCEPTED`;
- `QUEUED`;
- `RUNNING`;
- `WAITING_EXTERNAL`;
- `WAITING_REVIEW`;
- `PARTIAL`;
- `COMPLETED`;
- `REJECTED`;
- `FAILED_RETRYABLE`;
- `FAILED_TERMINAL`;
- `QUARANTINED`;
- `CANCEL_REQUESTED`;
- `CANCELLED`;
- `SUPERSEDED`.

Owning operation may use a bounded subset.

## A02 — terminal output

Terminal output identifies:

- query/export result;
- proposal version;
- command result/domain event;
- import/migration manifest;
- evidence/capture result;
- partial per-item results;
- error/quarantine report.

## A03 — cancellation

Cancellation:

- stops only not-yet-completed work where supported;
- never silently reverses domain events already established;
- reports which items/results completed before cancellation;
- may require owning-domain correction for completed effects.

## A04 — progress

Progress is operational observation, not business truth. Percentage/step estimates may be approximate and must not be used as domain completion.

---

# 9. Idempotency

## I01 — stable logical identity

Every retryable command/async operation has a stable logical ID scoped to tenant + OperationKey + business target/context as defined.

## I02 — same identity, same semantic request

Reuse of an idempotency key with materially different payload, target, operation version or principal/context returns conflict; it cannot create a second meaning.

## I03 — replay result

A duplicate completed invocation returns the original result/event/operation reference, not a regenerated business effect or document.

## I04 — retention window

The semantic requirement is that duplicate risk is controlled for the lifetime in which the same logical command can be replayed or retried. Physical key-retention/storage strategy remains later, but cannot be shorter than the governing retry/replay risk without another durable causal identity.

## I05 — multi-channel

Same logical command submitted through UI then agent/API may dedupe only when they intentionally share the same logical command identity. Similar payloads alone do not prove duplicate business intent.

---

# 10. Bulk operations

A bulk operation is a container of item-scoped operations unless the owning domain explicitly defines one atomic aggregate command.

Every bulk definition states:

- atomic all-or-nothing OR partial-per-item;
- per-item authority/guard/idempotency;
- ordering/dependency rules;
- stop/continue behavior;
- partial result manifest;
- retry semantics for failed items;
- no hiding of rejected/quarantined rows.

A bulk API cannot bypass item/domain validation for performance.

---

# 11. Capability/tool exposure

A UI/chat/agent/tool schema is generated/mapped from the authorized OperationRegistry view.

It exposes only:

- registered operation;
- permitted input fields;
- current scope/authority prerequisites;
- proposal/command distinction;
- confirmation/review requirement;
- async behavior;
- result/error semantics.

A model cannot invent a parameter, operation or authority by outputting a syntactically plausible tool call.

---

# 12. Confirmation boundary

P1.7 does not design UX confirmation, but operation metadata declares whether invocation requires:

- no additional confirmation;
- explicit user confirmation;
- independent approval/domain workflow;
- review of proposal/diff;
- step-up authentication;
- external-party response;
- no direct human confirmation because it is deterministic system recovery/establishment under frozen semantics.

P1.9 renders the interaction. P1.10 decides agent autonomy within these bounds.

---

# 13. Read-your-own-action and eventual projections

Command completion may precede update of some projections/search indexes/integration consumers.

The command result returns canonical event/resource identity sufficient to query authoritative state.

Queries declare whether they are authoritative or eventually updated projections.

Clients/chat cannot report command failure solely because a lagging search/report projection has not updated.

---

# 14. Error contract minimum

Every non-success result includes as applicable:

- stable error class/code;
- operation/invocation/command ID;
- item/field/resource scope;
- retryability;
- current versus expected version/state;
- authority/dependency/evidence conflict reference;
- safe user-facing explanation key;
- machine-actionable next allowed operations;
- correlation/support trace ID;
- no leakage of unauthorized tenant/data details.

Natural-language error text is not the semantic contract.

---

# 15. Schema and semantic versioning

API/tool payload version and domain semantic version are separate.

A transport-compatible schema change may still be semantically breaking.

Every operation version declares compatibility for:

- old clients retrying old logical commands;
- result replay;
- proposal acceptance;
- event causation;
- deprecation/retirement;
- field defaulting/unknown enum behavior.

No silent reinterpretation of stored/replayed command payload.

---

# 16. Security and tenant isolation

Authorization/filtering applies before returning query/proposal/evidence/tool-discovery content.

Operation logs, prompts/input payloads, results and errors remain tenant/context scoped.

A generic assistant/service account does not obtain broad product authority; it acts under explicit service/represented principal/capability context.

---

# 17. A0–A3 minimum

Minimum operation set can be exposed through internal/manual UI without public API or connector:

- requirement/package queries/commands;
- tender draft/freeze/issue;
- supplier response capture/revision;
- normalization/comparison proposal/commands;
- recommendation/approval/AwardDecision;
- evidence/message/transmittal operations;
- bounded export/handoff.

Public APIs/chat/agents remain optional consumers of the same definitions.

---

# 18. One-XL guard

This is not:

- universal API management;
- generic workflow engine;
- arbitrary CRUD platform;
- no-code automation language;
- tool marketplace;
- event-source framework product.

It freezes only semantic invocation/result boundaries around existing domains.

**P07 sole XL: preserved.**

---

# 19. Hostile tests

1. Agent invokes `SetAwarded=true` — no registered operation, rejected? REQUIRED.
2. UI command times out then API retries same ID — one event/result? REQUIRED.
3. Same idempotency key with changed supplier — conflict? REQUIRED.
4. Search index lags after award — authoritative command result/query still available? REQUIRED.
5. Query returns only first page — assistant cannot say “all suppliers”? REQUIRED.
6. Proposal confidence 99% — still no effect without command? REQUIRED.
7. Bulk import 80/100 rows valid — explicit 80 completed/20 rejected or atomic rollback according to contract? REQUIRED.
8. Old client retries after schema upgrade — original operation meaning preserved? REQUIRED.
9. Connector authentication proves identity but internal authority absent — rejected authorization? REQUIRED.
10. Async job accepted — chatbot cannot call it completed? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
