# Construction Procurement OS — P2.1 Physical Architecture Candidate v0.1

**Date:** 2026-08-02  
**Status:** INTEGRATED PHYSICAL CANDIDATE / INTERNAL HOSTILE AUDIT PENDING  
**Phase 1:** PASS / CLOSED / FROZEN  
**Product code:** LOCKED

---

# 1. Governing thesis

> Build the deterministic product as one strongly modular semantic system, with one authoritative transactional database and isolated runtime lanes, until measured evidence justifies another distributed boundary.

This candidate chooses physical mechanisms. It does not change frozen business semantics.

---

# 2. Technology baseline

- Node.js 24 LTS, exact patch pinned in release manifest;
- TypeScript strict mode, current compatible stable version pinned;
- pnpm workspaces and TypeScript project references;
- Fastify 5.x API/worker HTTP shell;
- React 19.2.x + Vite 8.1.x for browser applications;
- TanStack Query 5 for query/server-state caching only;
- PostgreSQL 18.x as authoritative database and initial outbox/job/search substrate;
- Kysely + `pg` for typed explicit SQL access; SQL-first migrations;
- S3-compatible versioned object storage through a product adapter;
- OpenTelemetry/OTLP for traces, metrics and logs;
- Vitest, property-based testing, Testcontainers and Playwright;
- OCI containers and provider-neutral managed-runtime deployment model.

Exact patches are selected and locked by Build Block 1 after support/security verification.

---

# 3. Repository and deployables

One monorepo contains four initial deployables:

1. `apps/api` — stateless HTTP/BFF/API process;
2. `apps/worker` — asynchronous worker process with named lanes;
3. `apps/web-internal` — authenticated internal browser application;
4. `apps/web-external` — secure-task/external-participant browser application.

Shared packages are bounded by architecture tests and public contracts. Domain modules may be imported by API and worker entry points, but one module may not import another module's persistence internals.

No runtime deployable owns business semantics independently. All deployables run one release manifest and compatible operation/schema/configuration versions.

---

# 4. Module boundaries

Initial module families:

- `platform/identity-tenancy-authority`;
- `platform/configuration-registry`;
- `platform/operations`;
- `platform/audit-security`;
- `platform/async-publication-reconciliation`;
- `evidence-files`;
- `communication-issue`;
- `requirements-allocation`;
- `sourcing-events`;
- `external-participation`;
- `supplier-submissions`;
- `normalization-comparison`;
- `recommendation-approval-award`;
- `handoff`;
- `reporting-controls`;
- `integration-migration`;
- `p07-commercial` — absent/disabled until V4 authorization;
- `ai-readiness` — metadata/adapter interfaces only until V6 authorization.

Each module owns:

- its authoritative tables;
- immutable occurrences/events/corrections;
- persistence adapters;
- command/query handlers;
- operation definitions;
- public application contracts;
- projection emitters;
- tests.

Cross-module writes occur only through a registered operation or explicit same-transaction application contract. Direct imports of another module's repositories, table constants or migrations are prohibited.

---

# 5. Database and schema strategy

One PostgreSQL cluster/database is authoritative for V1.

Schemas:

- `platform`;
- `iam`;
- `ops`;
- `audit`;
- `evidence`;
- `communication`;
- `requirements`;
- `sourcing`;
- `participation`;
- `submissions`;
- `comparison`;
- `decision`;
- `handoff`;
- `reporting`;
- `integration`;
- optional later `p07` and `ai`.

Physical rules:

- UUIDv7 primary identifiers;
- immutable identity separate from display/legal number;
- `tenant_id` on every tenant-owned row;
- `project_id` and `authority_context_id` where semantically applicable;
- `recorded_at timestamptz` and explicit effective/date fields;
- `version bigint` for expected-version concurrency;
- exact monetary amounts as `numeric(38,12)` and high-precision rates as `numeric(38,18)` unless a registered policy requires a stricter bounded scale;
- monetary/rate values serialize as strings, never JSON numbers;
- currency as ISO code plus exact policy/version;
- controlled JSONB only for versioned immutable envelopes, not uncontrolled business schema;
- no ORM auto-sync or destructive inferred migration.

Authoritative state is relational. Immutable occurrences, decisions, corrections, issue records and domain events are append-only. The system is not fully event-sourced.

---

# 6. Transactions and concurrency

Every consequential command executes through a central operation dispatcher inside an explicit database transaction.

The transaction establishes:

- request/operation identity;
- tenant/project/context/principal settings;
- current authority and configuration versions;
- idempotency record;
- expected aggregate/member versions;
- guard/evidence checks;
- authoritative state change and immutable occurrence/correction;
- domain event and outbox/job rows;
- outcome/continuation state.

Default isolation is `READ COMMITTED` with explicit row/version guards. Use `SERIALIZABLE`, advisory lock or deterministic row lock only for identified invariants such as numbering allocation, contribution conservation or aggregate-wide decision transitions.

Serialization/deadlock failures before possible external effect may retry under the same logical command and idempotency identity. They do not create a new command.

No command acknowledges authoritative acceptance before the required transaction commits durably.

---

# 7. Tenancy and authorization enforcement

Tenant-owned tables use `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`.

Runtime roles:

- are not superusers;
- do not own tenant tables;
- do not have `BYPASSRLS`;
- cannot run schema migrations;
- receive only required schema privileges.

A transaction-local execution context sets exact tenant, principal, represented principal, project and authority-context values. Missing or malformed context fails closed.

Application authorization remains mandatory. RLS is defense-in-depth and cannot decide DOA, delegation, field access, decision-use or external grant meaning by itself.

Worker execution claims a tenant-scoped job first, then opens a fresh transaction and establishes that job's frozen execution context. Service identity never broadens the represented principal's authority.

Cross-tenant platform maintenance uses separately registered, audited and narrowly scoped operations; it is not an ordinary runtime bypass.

---

# 8. Operation/API pattern

HTTP is REST/JSON with OpenAPI 3.1 descriptions.

Physical API classes:

- domain query endpoints;
- proposal/preview endpoints;
- command submission endpoints;
- async-operation status/result endpoints;
- reconciliation/effect lookup endpoints;
- evidence upload/session endpoints;
- external secure-task endpoints.

Every state-changing endpoint resolves one product-owned OperationKey/version and calls the operation dispatcher. Route handlers may validate/translate transport but cannot write domain tables.

Command envelope includes:

- operation key/version;
- logical command ID;
- idempotency key;
- continuation-anchor ID;
- principal/context bindings;
- exact target/member/expected versions;
- preview/confirmation identity where required;
- input/evidence bindings;
- client time/locale only as non-authoritative context.

Outcome uses the frozen typed envelope and separates acceptance, operational state, effect stage, item outcomes, domain result, publication correlation, limitations and safe next action.

Errors use versioned machine codes and RFC problem-details-compatible transport. A generic retry flag is prohibited where effect may exist.

No GraphQL or tenant query language is introduced in V1.

---

# 9. Durable asynchronous execution

PostgreSQL tables provide:

- `async_operation`;
- `job` and `job_attempt`;
- `domain_event`;
- `outbox_publication`;
- `publication_intent`;
- `transport_attempt`;
- `external_observation`;
- `reconciliation_item`;
- `dead_letter_or_quarantine`.

Workers claim jobs with `FOR UPDATE SKIP LOCKED` in bounded batches.

Worker lanes:

- interactive-nearline;
- routine-domain;
- evidence-scan/parse;
- render/export;
- connector/email;
- projection/search;
- reconciliation;
- optional AI-disabled lane placeholder.

Each job has immutable task identity, tenant/context, payload version, priority, deadline, lease owner/expiry, heartbeat, attempts, safe-retry class and terminal disposition.

`SKIP LOCKED` is used only for queue claiming, never as an authoritative query consistency shortcut.

External-effect jobs do not automatically retry after transmission may have occurred. They move through the seven effect stages and require lookup/reconciliation or positive no-effect evidence.

No Redis, Kafka or RabbitMQ is mandatory for V1. Extraction requires measured need and equivalent semantics.

---

# 10. Evidence and object storage

PostgreSQL owns evidence identity, version, source, capture, state, integrity metadata, access, reliance, issue and lifecycle.

Object storage owns immutable payload bytes and provider version identity but is never business authority.

Upload lifecycle:

1. create governed upload session and evidence-capture intent;
2. upload to tenant-scoped quarantine object key;
3. record provider version/size and stream-computed SHA-256;
4. MIME sniff and archive checks;
5. malware scan;
6. parser validation in isolated worker where applicable;
7. persist validation observations;
8. explicit evidence acceptance/normalization proposal where required;
9. promote/copy to immutable retained object location without changing EvidenceVersion identity.

`SCAN_CLEAN` requires completed supported scan under an exact scanner/signature version. Timeout/unavailable is not clean.

Evidence-capture acknowledgment occurs only after payload durability and authoritative metadata commit satisfy the selected DurabilityAcknowledgementProof.

Orphan payloads and incomplete metadata are reconciled by durable upload-session identity and never become accepted evidence automatically.

Issued artifacts are written to immutable/versioned locations with exact member-set and content manifest. Regeneration creates a new artifact/version.

---

# 11. Search, projections, reports and controls

Authoritative queries read module-owned relational tables under current access controls.

Derived stores remain inside PostgreSQL initially:

- module projection tables;
- `search_document` tables with `tsvector`, normalized fields and trigram indexes;
- report execution/result/snapshot tables;
- control-observation and queue projections.

Projection updates use outbox/domain-event identities and are idempotent/rebuildable.

Every derived row records:

- definition/version;
- source cut/event position;
- tenant/project/access scope;
- freshness/build status;
- correction/restatement lineage where applicable.

Search and report endpoints filter access before returning or aggregating. Restricted members never become absent/zero through the projection.

No derived table, materialized view, search document or report snapshot can call a domain write path.

Arabic search begins with exact/normalized/trigram behavior. Morphological relevance is a measured validation item, not a frozen claim.

OpenSearch or a warehouse is introduced only after measured need and separate projection/restore/access proof.

---

# 12. Browser architecture

Two independent Vite builds:

## Internal application

- OIDC-authenticated server-managed session;
- tenant/project/context chooser under authority;
- conventional work surfaces, forms, registers, reports and control queues;
- no domain truth in browser state.

## External application

- grant token exchanged for scoped external-task session;
- no internal bundles/routes/data;
- secure task, evidence upload, response/revision, receipt and status lookup;
- first participation does not require a persistent account.

TanStack Query is used for queries with explicit stale/fresh policies. Consequential commands use a separate operation client.

The command client:

- creates/persists the continuation anchor before transmission;
- does not use library-level automatic mutation retry;
- stores no authoritative domain result until server lookup confirms it;
- on network loss after transmission, performs status lookup only;
- invalidates/reloads queries after typed outcome.

Continuation anchors are stored in IndexedDB or another durable browser store scoped to the exact user/task/session; sensitive payloads are not persisted unless explicitly allowed.

Bulk and async progress uses polling as the mandatory baseline. SSE may optimize progress but cannot be the only recovery path.

Accessibility/RTL foundations are included from the first component: semantic HTML, keyboard/focus/error/status behavior, direction-aware layout, locale-independent machine values and explicit timezone/currency/unit display.

---

# 13. Identity and sessions

Identity provider seam uses OIDC authorization-code flow with PKCE.

Internal browser tokens are handled server-side; browser receives secure HttpOnly SameSite session cookies plus anti-CSRF protection.

Sessions are stored in PostgreSQL with:

- principal/represented-principal binding;
- authentication/assurance class;
- tenant access context;
- creation/last activity/absolute expiry;
- elevation state;
- revocation and reason;
- device/session security observations.

External task links use high-entropy opaque tokens stored only as hashes. The token is exchanged for a task-scoped session after grant, expiry, transfer/revocation and assurance checks.

No session or service account grants business authority by itself.

---

# 14. Migrations and releases

Migrations are SQL-first, versioned and reviewed.

Rules:

- no automatic schema synchronization;
- deployed migrations are forward-only historical records;
- destructive changes use expand/migrate/verify/contract;
- application rollback is supported only across declared compatibility windows;
- data corrections use domain operations, not migration scripts, unless the migration acceptance profile explicitly authorizes a bounded historical import/correction;
- operation, field, metric, configuration, prompt/tool and provider versions are included in release manifest;
- a dedicated migration job uses a separate privileged role;
- runtime starts only when schema compatibility passes.

---

# 15. Deployment and environment model

Local:

- pnpm workspace;
- container composition for PostgreSQL, S3-compatible object storage and malware scanner;
- API/worker/web processes run locally or in containers;
- deterministic seed/test fixtures only.

Hosted environments:

- separate development, test, staging and production boundaries;
- static web assets through CDN/static host;
- OCI API and worker containers;
- managed PostgreSQL HA with PITR;
- versioned object storage;
- managed secret/key seam;
- OTLP collector/export destination;
- provider-neutral DNS/TLS/load balancing.

Kubernetes is not the baseline.

Release is immutable by image digest and release manifest. Migrations run before compatible rollout. Workers drain or preserve versioned in-flight work during deployment. Kill switches disable optional connectors/AI but never rewrite history.

---

# 16. Observability, audit and security

OpenTelemetry emits traces, metrics and structured logs. Audit/security/domain records remain separate authoritative tables/streams.

Telemetry rules:

- no raw evidence, bid values, supplier narrative, prompt content, secrets or personal data in general logs;
- no high-cardinality user/task/evidence IDs as uncontrolled metric labels;
- correlation uses opaque trace/request/operation IDs;
- measurement-health gaps are visible and conservative.

Security baseline:

- dependency lockfile and provenance/SBOM;
- secret scanning and dependency/security checks in CI;
- secure headers, request/body limits, rate/resource policies;
- isolated file-processing worker/container permissions;
- least-privilege database/object roles;
- encryption in transit/at rest through providers;
- no production secret in repository or build artifact;
- break-glass operations are registered, time-bounded and audited.

---

# 17. Testing model

Test layers:

1. type/lint/format and module-boundary tests;
2. unit tests for policies and pure domain logic;
3. property tests for money, contribution, idempotency and state machines;
4. PostgreSQL integration tests with real RLS, transactions, locks and migrations;
5. object-storage/file-pipeline integration tests;
6. API contract/OpenAPI tests;
7. worker crash/lease/retry/effect-indeterminate tests;
8. Playwright internal/external browser tests;
9. accessibility/keyboard/mobile/RTL tests;
10. backup/restore, migration and deployment compatibility tests;
11. golden-thread suites.

No in-memory substitute may certify persistence, RLS, lock, outbox, restore or object-durability semantics.

---

# 18. AI seam

P2.1 creates only interfaces/data contracts for:

- product-owned capability registry;
- provider/model profiles;
- source-class admission;
- run/proposal/context/evaluation/resource lineage;
- tenant-scoped retrieval namespace;
- manual/AI-off fallback.

No model/provider is required, no prompt is activated and no agent tool is exposed in deterministic build blocks.

---

# 19. Explicit non-goals

Not in V1 baseline physical architecture:

- microservices;
- distributed transaction coordinator;
- Kafka/RabbitMQ/Redis mandatory state;
- OpenSearch/Elasticsearch;
- warehouse/lakehouse;
- Kubernetes/service mesh;
- full event sourcing;
- GraphQL or generic query/form/workflow engine;
- supplier network/account prerequisite;
- production P07 before V4;
- active AI before V6.

---

# 20. Candidate gate claim

The candidate claims PA-G1–PA-G15 can pass, subject to hostile audit of:

- cross-store evidence acknowledgment/restore;
- pooled-connection/RLS context leakage;
- worker lease/fairness and effect-indeterminate separation;
- browser retry/offline behavior;
- migration/rollback and in-flight version compatibility;
- module ownership enforcement inside one database.