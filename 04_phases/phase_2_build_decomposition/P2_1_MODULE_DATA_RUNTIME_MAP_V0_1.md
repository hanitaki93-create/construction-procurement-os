# P2.1 — Module, Data & Runtime Map v0.1

**Date:** 2026-08-02  
**Status:** PHYSICAL OWNERSHIP CANDIDATE  
**Code:** LOCKED

---

# 1. Runtime deployables

| Deployable | Responsibilities | Prohibited |
|---|---|---|
| `api` | browser/API transport, validation, session/context establishment, operation/query dispatch, result lookup | direct domain SQL, file parsing, hidden commands |
| `worker` | durable jobs, projections, file pipeline, rendering, transport adapters, reconciliation | broad service-account authority, raw business mutation outside operation handlers |
| `web-internal` | conventional internal queries, previews, confirmations, commands, reports and controls | domain truth, automatic command replay |
| `web-external` | secure-task participation, uploads, responses/revisions, receipt/status | internal routes/data, supplier-network profile |
| migration job | reviewed schema/data migration only | ordinary runtime or commercial correction |

---

# 2. Module ownership

| Module | Authoritative data | Public writes | Derived outputs | Runtime lane |
|---|---|---|---|---|
| identity/tenancy/authority | tenant, project, principals, roles, delegations, DOA, sessions, contexts, grants | registered authority/session/grant commands | current access projections | API + worker validation |
| configuration/registries | operation/field/schema/metric/policy/version manifests | product-controlled activation/change commands | compatibility manifests | API |
| operations | invocation, idempotency, continuation, preview/confirmation, typed outcome | dispatcher only | status/result views | API |
| audit/security | audit records, security observations/incidents | registered audit/security writers | security/control views | API + worker |
| async/publication/reconciliation | jobs, attempts, domain events, publication intents, transport attempts, observations, reconciliation | operation/worker protocols | queue/control projections | worker lanes |
| evidence/files | EvidenceRecord/Version, upload sessions, object identity, validation, holds, reliance | capture/accept/correct/hold/issue commands | evidence/search projections | API + evidence worker |
| communication | issued artifacts, transmittals, messages, occurrences, satisfaction snapshots | issue/capture/establish commands | communication registers | API + connector worker |
| requirements/allocation | requirement sources and RequirementAllocation | requirement/allocation commands | allocation control | API |
| sourcing | RFQ/tender/event/member/addendum/invitation | sourcing commands | tender register | API |
| external participation | task grants, task sessions, participation state | grant/revoke/transfer commands | external task views | API/external web |
| submissions | source response/revision/buyer capture/disposition | submit/revise/withdraw/accept commands | response register | API |
| comparison | normalized values, mapping proposals, buyer adjustments, confirmed basis | normalization/evaluation/confirmation commands | comparison projections | API + projection worker |
| decision | recommendation, approval records, AwardDecision | recommend/approve/decide commands | decision/approval controls | API |
| handoff | immutable handoff package/occurrence/status | prepare/issue/record commands | handoff register | API + connector worker |
| reporting/controls | definitions, executions, snapshots, restatements, controls | product definitions and issued report commands | reports/queues/search | worker + API reads |
| integration/migration | connector profiles, mappings, cutovers, migration manifests | profile/mapping/import/reconcile commands | integration controls | worker |
| P07 later | Commitment/components/obligations/effects/corrections | P07 commands after V4 | commercial reports | not active |
| AI later | capability/profile/run/proposal/context/evaluation metadata | product activation and reviewed proposal commands after V6 | AI controls | disabled |

---

# 3. Cross-module rules

- a module never writes another module's authoritative table directly;
- one operation may orchestrate multiple modules in one database transaction only through exported application contracts;
- the owning module still emits its own occurrence/event and validates its invariant;
- no module imports another module's persistence adapter or migration package;
- query joins may use approved read contracts/views and current access filtering;
- reporting/search projections consume domain events or approved source queries and cannot write source tables;
- all public module contracts are versioned and dependency-direction tested.

---

# 4. Database schema/role map

| Schema | Owner | Runtime access |
|---|---|---|
| `platform`, `iam` | identity/configuration/operations | API read/write through module adapters; worker scoped read |
| `ops`, `audit` | operation/audit modules | API + worker protocol-specific access |
| `evidence`, `communication` | evidence/communication modules | API metadata writes; evidence/connector workers scoped writes |
| `requirements`, `sourcing`, `participation`, `submissions`, `comparison`, `decision`, `handoff` | named domain modules | API through owning adapter; worker only explicit operations/projections |
| `reporting` | reporting module | worker projection/report writes; API read/issue operations |
| `integration` | integration module | worker adapter writes; API control commands |
| `p07`, `ai` | later gated modules | no runtime access before activation |

Migration owner is separate from runtime roles. Runtime roles are non-owner, non-superuser and no-BYPASSRLS.

---

# 5. Worker lanes

| Lane | Examples | Safe retry |
|---|---|---|
| interactive-nearline | short validation, preview preparation | only proven pre-effect |
| routine-domain | projections, scheduled controls | idempotent by source/event identity |
| evidence | scan, sniff, parse, render | stage-specific; never mark clean on timeout |
| connector/email | dispatch and provider lookup | governed by effect stage, not generic queue retry |
| reconciliation | correlate observations, resolve indeterminacy | lookup/evidence only unless owning command authorized |
| report/export | report execution and artifact rendering | immutable execution identity |
| search | derived document update/rebuild | idempotent/rebuildable |
| AI | none before V6 | disabled |

---

# 6. Physical extraction seams

A module may later become a service only through its existing:

- public application contracts;
- registered operations;
- immutable domain/integration events;
- outbox/inbox identities;
- explicit authority and data ownership;
- reconciliation and migration profile.

Extraction may not duplicate authority or use database replication as a new command path.