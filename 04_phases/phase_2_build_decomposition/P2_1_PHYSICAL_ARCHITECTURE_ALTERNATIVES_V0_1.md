# P2.1 — Physical Architecture Alternatives v0.1

**Date:** 2026-08-02  
**Status:** DECISION INPUT  
**Phase 1:** FROZEN  
**Code:** LOCKED

---

# 1. Governing question

Which physical architecture gives the first build the highest probability of preserving:

- one authoritative writer;
- exact command/idempotency/effect semantics;
- evidence durability and correction history;
- tenant/project/context isolation;
- A0–A3 without P07/connectors/account/chat/AI/warehouse;
- measurable NFRs;
- later extraction without semantic rewrite;
- low operational burden during prototype and pilot?

---

# 2. Topology alternatives

## A — Distributed microservices from first build

Shape:

- separate services for identity, evidence, sourcing, reporting, integration and P07;
- broker-first asynchronous communication;
- separate databases or database ownership per service;
- gateway and service mesh tendencies.

Advantages:

- independent scaling and deployment;
- strong runtime ownership boundaries if executed perfectly;
- fault isolation.

Failure risks:

- cross-service transactions make AwardDecision/evidence/effect acceptance harder;
- distributed idempotency, outbox, saga and effect-indeterminacy burden arrives before product evidence;
- duplicate schemas and integration events can become a second truth model;
- operational burden is disproportionate to V1 envelopes;
- encourages generic gateway/broker/platform scope;
- slower thin-slice learning.

Disposition: **REJECT FOR V1 BASELINE.** Retain later extraction seams.

## B — Single-process monolith with one application and one database

Shape:

- API, workers and browser serving in one process/deployable;
- one relational database;
- in-process background work.

Advantages:

- simplest deployment;
- easiest transactions;
- fastest initial coding.

Failure risks:

- background work competes with interactive commands;
- file scanning/rendering and connector failures threaten the whole process;
- no clean worker identity or resource lane;
- difficult independent scaling and failure isolation;
- browser/internal/external surface boundaries blur.

Disposition: **REJECT AS TOO COARSE.** Useful only as a local conceptual model.

## C — Strong modular monolith with isolated deployable processes

Shape:

- one monorepo and one product semantic model;
- stateless API process;
- one or more worker processes using the same versioned domain modules;
- separate internal and external web applications;
- one authoritative PostgreSQL cluster;
- S3-compatible evidence/object storage;
- PostgreSQL transactional outbox/job/search baseline;
- explicit module ownership and extraction seams.

Advantages:

- authoritative command/effect/outbox can commit transactionally;
- lower operational burden than services;
- interactive and asynchronous workloads are isolated;
- separate external browser surface reduces attack/bundle scope;
- later service extraction can follow module/event contracts;
- A0–A3 remains compact and provider-neutral.

Failure risks:

- module boundaries can collapse into shared-table/shared-service code;
- one database can become an ungoverned integration surface;
- worker queue and tenant context require strong discipline;
- database and object storage durability must be reconciled explicitly.

Disposition: **PREFERRED.** Requires architecture tests, schema ownership and cross-store protocols.

## D — Mixed topology with early evidence and integration services

Shape:

- modular core plus separate evidence/file and integration services;
- separate object metadata or connector databases.

Advantages:

- isolates untrusted files and external dependencies;
- independent scaling of expensive processing.

Failure risks:

- evidence acceptance becomes a distributed transaction immediately;
- payload/metadata and issue/effect identity split across services;
- reconciliation complexity appears before measured need;
- separate service can become a CDE/integration platform gravity well.

Disposition: **REJECT FOR FIRST BUILD.** Use isolated worker processes and restricted adapters inside the modular system. Service extraction only after measured operational need and semantic-equivalence proof.

---

# 3. Persistence alternatives

## P1 — Full event sourcing

Benefits:

- immutable history and reconstruction.

Risks:

- forces every domain into event-replay semantics;
- current truth, effective dating and external observations become harder;
- migration and correction complexity;
- event stream may be mistaken for universal truth root.

Disposition: **REJECT.** Use authoritative state plus immutable occurrences/events/corrections.

## P2 — Relational authoritative state plus append-only history/outbox

Shape:

- normalized current/effective state tables;
- immutable occurrence, event, decision, correction and issue records;
- transactional outbox/inbox and durable operation tables;
- rebuildable projections/search/report tables.

Disposition: **SELECT.** Best fit for frozen distinctions and exact transactions.

## P3 — Document database primary

Risks:

- exact joins, contribution conservation, RLS, constraints and reporting become application-only;
- schema drift threatens registered field and operation semantics.

Disposition: **REJECT AS AUTHORITATIVE PRIMARY.** JSONB remains allowed for bounded versioned payloads, never uncontrolled schema.

---

# 4. Asynchronous execution alternatives

## Q1 — Kafka/broker-first

Advantages:

- scale, replay and partitioning.

Risks:

- operational and schema-registry burden;
- broker offsets can be confused with domain/effect truth;
- dual-write problem unless outbox remains;
- unnecessary at current envelopes.

Disposition: **DEFER.** Outbox remains required even if later broker is introduced.

## Q2 — Redis queue

Advantages:

- familiar worker ecosystem and fast claims.

Risks:

- second durability substrate;
- command/outbox/job atomicity requires reconciliation;
- Redis may become mandatory for A0–A3.

Disposition: **REJECT FOR V1 BASELINE.** May later support cache or non-authoritative scheduling after proof.

## Q3 — PostgreSQL durable job/outbox tables

Advantages:

- atomic creation with command/effect;
- one backup/recovery boundary for operation state;
- `FOR UPDATE SKIP LOCKED` supports worker claiming;
- fewer systems.

Risks:

- queue contention/starvation;
- long tasks require leases and heartbeats;
- poor designs can overload authoritative database.

Disposition: **SELECT WITH LANES, LEASES, FAIRNESS, QUOTAS AND EXTRACTION THRESHOLDS.**

---

# 5. Search alternatives

## S1 — OpenSearch/Elasticsearch immediately

Risks:

- another cluster and access-control boundary;
- index can be mistaken for current truth;
- restore and residency complexity;
- premature operational burden.

Disposition: **DEFER.**

## S2 — PostgreSQL FTS/trigram derived documents

Advantages:

- one initial data boundary;
- transactional projection enqueueing;
- adequate for V1 register/search workloads;
- explicit rebuild path.

Risks:

- language relevance and large-scale search limits;
- heavy search can contend with commands.

Disposition: **SELECT FOR BASELINE**, with Arabic relevance validation and measured extraction triggers.

---

# 6. Frontend alternatives

## F1 — One full-stack meta-framework application with server actions

Risks:

- state-changing route semantics can bypass the OperationRegistry;
- internal and external surface boundaries blur;
- cache/revalidation may obscure current versus issued meaning.

Disposition: **REJECT FOR V1 BASELINE.**

## F2 — Separate React browser applications plus explicit API

Shape:

- internal authenticated application;
- external secure-task application;
- explicit query and command APIs;
- shared presentation/schema packages only;
- no domain state in browser.

Disposition: **SELECT.**

---

# 7. Tenancy alternatives

## T1 — Database per tenant

Advantages:

- strong physical separation.

Risks:

- operational/migration/analytics explosion at 50 tenants;
- cross-tenant platform operations become complex;
- backup/restore and release management multiply.

Disposition: **DEFER AS OPTIONAL HIGH-ISOLATION PROFILE.**

## T2 — Shared schema with tenant columns, RLS and application authorization

Advantages:

- manageable operations;
- centralized migrations;
- strong database defense-in-depth when roles are correct.

Risks:

- context leakage through pooled connections;
- RLS owner/bypass mistakes;
- global tables require explicit classification.

Disposition: **SELECT**, with transaction-local context, forced RLS, non-owner runtime roles and hostile isolation tests.

## T3 — Schema per tenant

Risks:

- migration and catalog growth;
- dynamic SQL/search/report complexity;
- little advantage over database-per-tenant for current scale.

Disposition: **REJECT.**

---

# 8. Deployment alternatives

## DPL1 — Kubernetes baseline

Disposition: **DEFER.** No current need justifies its control plane.

## DPL2 — OCI containers on provider-neutral managed container runtime

Shape:

- static web artifacts/CDN;
- API containers;
- worker containers by lane;
- managed PostgreSQL HA;
- versioned object storage;
- secret manager/KMS seam;
- OTLP collector/exporter.

Disposition: **SELECT.** Local development uses container composition; production vendor is not frozen.

---

# 9. Selected architecture summary

Selected combination:

`C + P2 + Q3 + S2 + F2 + T2 + DPL2`

Meaning:

> A TypeScript strong modular monolith in one monorepo, deployed as separate stateless API, worker and browser artifacts, using PostgreSQL 18 for authoritative state, immutable history, transactions, RLS, outbox/jobs and initial search; S3-compatible object storage for evidence payloads; explicit OIDC/session and object/provider seams; OpenTelemetry instrumentation; no mandatory broker, Redis, OpenSearch, Kubernetes, supplier account, named connector or AI.

This selection remains subject to hostile audit.