# Construction Procurement OS — P2.1 Physical Architecture v1.0 Candidate

**Date:** 2026-08-02  
**Status:** STANDALONE FREEZE CANDIDATE / INDEPENDENT HOSTILE PASS PENDING  
**Phase 1:** PASS / CLOSED / FROZEN  
**Code:** NOT STARTED / LOCKED

---

# 1. Governing thesis

Build the deterministic product as one strongly modular semantic system with one authoritative transactional database and isolated runtime lanes until measured evidence justifies another distributed boundary.

Physical choices preserve the frozen Phase 1 contracts. They do not redesign business meaning.

---

# 2. Technology baseline

- Node.js 24 LTS, exact patch pinned per release;
- TypeScript strict mode and exact compatible version;
- pnpm workspaces and TypeScript project references;
- Fastify 5.x API/worker HTTP shell;
- React 19.2.x + Vite 8.1.x for separate browser applications;
- TanStack Query 5 for query/server-state caching only;
- PostgreSQL 18.x authoritative database and initial outbox/job/search substrate;
- Kysely + `pg` explicit SQL access;
- SQL-first forward migrations;
- S3-compatible versioned object storage through a product adapter;
- OpenTelemetry/OTLP for traces, metrics and logs;
- Vitest, property-based tests, Testcontainers and Playwright;
- OCI containers on a provider-neutral managed runtime.

Exact patches are verified and committed by B01. A major-family change requires physical architecture change control.

Not baseline:

- microservices;
- Kafka/RabbitMQ/mandatory broker;
- Redis as mandatory state/queue;
- OpenSearch/Elasticsearch;
- warehouse/lakehouse;
- Kubernetes/service mesh;
- full event sourcing;
- GraphQL/generic query language;
- supplier account/network prerequisite;
- named connector prerequisite;
- active P07 before V4;
- active AI before V6.

---

# 3. Repository and deployables

One monorepo contains:

1. `apps/api` — stateless HTTP/BFF/API;
2. `apps/worker` — asynchronous workers with named lanes;
3. `apps/web-internal` — authenticated internal browser application;
4. `apps/web-external` — secure-task external participant application;
5. a dedicated migration/release job.

All deployables use one release compatibility manifest and compatible operation/schema/configuration versions.

No deployable independently owns business semantics.

---

# 4. Module ownership

Initial module families:

- identity/tenancy/authority;
- configuration/registries;
- operations/idempotency/continuation;
- audit/security;
- async/publication/reconciliation;
- evidence/files;
- communication/issue;
- requirements/allocation;
- sourcing events;
- external participation;
- supplier submissions;
- normalization/comparison;
- recommendation/approval/AwardDecision;
- handoff;
- reporting/controls/search/export;
- integration/migration;
- P07 later;
- AI later.

Each module owns its authoritative tables, immutable occurrences/events/corrections, persistence adapters, operations, public application contracts and tests.

Cross-module rules:

- no module writes another module’s authoritative table directly;
- no module imports another module’s persistence/migration internals;
- cross-module writes use a registered operation or explicit reviewed same-transaction application contract;
- reporting/search/integration roles are read-only toward source schemas;
- public contracts are versioned and dependency-direction tested.

A generated `PhysicalWriteOwnershipManifest` assigns every mutable object exactly one owner, permitted operation handlers, runtime lane/role, invariant references and approved transaction contracts.

No general raw database client is importable by application/domain packages.

---

# 5. Authoritative persistence

One PostgreSQL cluster/database is authoritative for V1.

Module-aligned schemas include platform, identity, operations, audit, evidence, communication, requirements, sourcing, participation, submissions, comparison, decision, handoff, reporting and integration. P07/AI schemas are absent or disabled until their gates.

Authoritative current/effective state is relational. Immutable occurrences, decisions, corrections, issue records and events are append-only. The product is not universally event-sourced.

Physical conventions:

- UUIDv7 immutable identifiers;
- display/legal number separate from identity;
- tenant ID on every tenant-owned row;
- project/authority-context IDs where applicable;
- `recorded_at timestamptz` plus explicit effective/date/timezone fields;
- expected `version bigint`;
- amounts `numeric(38,12)` and rates `numeric(38,18)` as bounded physical defaults;
- decimal/integer exact values serialize as strings;
- registered policy performs business rounding before persistence;
- constraints reject excess range/scale;
- bounded versioned JSONB only;
- no ORM auto-sync.

---

# 6. Fail-closed execution context and RLS

All tenant-scoped SQL executes through:

`withExecutionContext(context, transactionOptions, callback)`

It:

1. validates the execution-context shape;
2. opens a fresh transaction;
3. sets tenant, principal, represented principal, project, authority context, operation/invocation and service identity using `SET LOCAL`;
4. reads them back and verifies exact equality;
5. establishes permitted module role/capability;
6. exposes only a transaction-bound module persistence handle;
7. commits/rolls back and releases.

No query executes before step 4. No raw pool is exported.

Tenant-owned authoritative and derived tables use `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`. Missing/invalid context denies.

Runtime roles are non-owner, non-superuser, no `BYPASSRLS`, no migration rights and no runtime function/policy/trigger/view creation.

`SECURITY DEFINER`, `set_config`, `SET ROLE` and execution-context-mutating database objects are prohibited by default and detected by catalog scan.

Workers claim only minimal non-business job envelopes globally, then open a new tenant-scoped transaction to load payload. Service identity never replaces represented-principal authority.

---

# 7. Invariant completeness architecture

The product has one product-authored versioned `InvariantRegisterVersion` compiled from the frozen Phase 1 package, accepted ADRs, MR-001–MR-092 and explicit later change records.

Current candidate:

- 102 invariant families;
- 92/92 frozen requirement dispositions;
- clause-level supplements for specific conservation, effective-period, evidence, effect and report-cut rules.

One bidirectional compiler joins:

1. frozen source manifest;
2. frozen-clause coverage matrix;
3. invariant register;
4. physical write-ownership manifest;
5. operation registry;
6. concurrency profiles;
7. schema catalog;
8. block completion evidence.

It fails when:

- any frozen source has no invariant/non-state disposition;
- any invariant lacks owner, objects, enforcement or hostile test;
- any object/operation omits reverse invariant references;
- any concurrency-sensitive invariant lacks a complete profile;
- any effective-dated object lacks overlap disposition;
- any newly encountered invariant is not reconciled before block PASS.

Tenant configuration and implementation code cannot create/delete invariant meaning.

---

# 8. ConcurrencyControlProtocol

Every state-changing operation declares a versioned concurrency profile containing:

- isolation level;
- invariant IDs;
- mechanism per invariant;
- guard/resource identity;
- global lock order;
- named constraints;
- expected-version members;
- safe-retry class/max attempts;
- conflict/deadlock/serialization outcomes;
- external-effect boundary;
- required concurrency tests.

Permitted mechanisms:

- CC-1 expected row version, only for a complete single-row invariant;
- CC-2 stable guard-row lock plus recomputation;
- CC-3 unique/partial-unique/exclusion/database constraint;
- CC-4 SERIALIZABLE predicate transaction;
- CC-5 technical advisory lock.

Default READ COMMITTED is allowed only when CC-1/CC-2/CC-3 fully protect all registered invariants touched.

The transaction helper requires explicit isolation before the first statement. Serialization/deadlock retry preserves logical command/idempotency identity, retries the entire pre-effect transaction, uses bounded attempts and never retries a business-invariant conflict.

## Guard materialization

A CC-2 guard exists before lock:

- eagerly with its authoritative parent; or
- idempotent insert-on-conflict followed by `SELECT FOR UPDATE`.

A missing-row lock is invalid.

## Global lock order

All guards sort by:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

No profile-local alternative order exists.

## Named cross-row assignments

- allocation conservation: AuthorizedRequirementBasis guard;
- minimum/residual drawdown: exact lineage guard plus contribution uniqueness;
- one economic value once: conservation-lineage guard plus contribution unique constraint;
- exclusive active scope: exact partial unique/GiST exclusion or serializable fallback;
- effective-period non-overlap: exact range exclusion/partial uniqueness or serializable fallback.

---

# 9. Effective-period non-overlap

Every effective-dated mutable family declares:

- normalized scope identity;
- range/boundary convention;
- overlap prohibited/bounded/permitted disposition;
- constraint or serializable profile;
- correction/migration behavior;
- concurrency test.

Mandatory inventory includes ownership, authority context, delegation/DOA, residency, operation/configuration/policy, field/schema/constraint, metric/operator/materiality/use, connector cutover, sourcing response schema, P07 basis/profile, AI capability/provider/evaluation and release compatibility phase.

A two-row “close old + insert new” sequence is never sufficient by itself.

---

# 10. Command and transaction protocol

Every consequential action maps to one registered OperationKey/version and central dispatcher.

The command transaction binds:

- logical command/idempotency/continuation;
- principal/context;
- operation, target/member, configuration and evidence versions;
- concurrency profile and invariant set;
- current authority/guards;
- authoritative state and immutable occurrence/correction;
- domain event/outbox/job;
- typed outcome/continuation state.

No authoritative acceptance acknowledgment occurs before durable commit.

API transport is REST/JSON/OpenAPI 3.1. Route handlers validate/translate only and cannot write source tables.

---

# 11. Durable jobs and external effects

`JobExecution` is distinct from `PublicationIntent`, `TransportAttempt`, `ExternalObservation` and `EffectPosition`.

Workers use named lanes, bounded claims, leases, heartbeats, fencing tokens, per-tenant concurrency, weighted fairness, deadline aging, resource budgets and explicit safe-retry class.

Before an external call, a transaction commits immutable TransportAttempt identity and attempt-ready effect state.

If crash/lease expiry occurs after possible transmission:

- ordinary retry is disabled;
- effect is/enters `EFFECT_INDETERMINATE` unless positive evidence proves another stage;
- reconciliation/lookup/evidence capture is scheduled;
- resend requires positive no-effect proof or a new valid owning command;
- stale worker writes fail fencing.

`SKIP LOCKED` is queue-claim only.

---

# 12. Evidence and issued artifacts

An immutable UploadSession is committed before transfer.

Closed states:

1. RESERVED;
2. PAYLOAD_TRANSFER_IN_PROGRESS;
3. PAYLOAD_STORED_UNVERIFIED;
4. PAYLOAD_VERIFIED_QUARANTINED;
5. VALIDATION_IN_PROGRESS;
6. VALIDATION_BLOCKED_OR_FAILED;
7. CAPTURED_EVIDENCE_ONLY;
8. ACCEPTED_EVIDENCE_VERSION;
9. ABANDONED_OR_EXPIRED;
10. PAYLOAD_MISSING_RECONCILIATION_REQUIRED.

Responses distinguish session creation, unverified receipt, verified quarantine, recorded capture and accepted evidence.

`CAPTURE_RECORDED` requires immutable provider version, verified size/checksum and committed metadata retrievable by UploadSession.

`EVIDENCE_ACCEPTED` is a separate owning-domain command.

Object-without-metadata and metadata-without-object reconcile explicitly and never fabricate acceptance.

Issued artifact flow:

1. ArtifactBuildIntent and exact member/source manifest;
2. render;
3. immutable verified object;
4. IssuedArtifactVersion commit;
5. issue/dispatch command.

Restore uses RecoverySetManifest binding database recovery point, object-version inventory, release/schema/configuration, exact references/checksums, holds/tombstones and unresolved sessions.

---

# 13. Search, reports and controls

Authoritative queries read module tables under current access.

Derived PostgreSQL projection/search/report/control tables are idempotent, rebuildable, tenant-RLS protected and read-only toward source schemas.

Every derived record binds definition/version, exact source cut, scope/access, freshness and correction/restatement lineage.

Permitted load-bearing source cuts:

1. authoritative repeatable-read input set with persisted row IDs/versions;
2. exact projection watermark set;
3. immutable materialized input set.

Wall-clock/latest-index alone is prohibited.

Initial search uses PostgreSQL exact/normalized/full-text/trigram. B12 owns an ArabicSearchRelevanceDecision based on representative UAE procurement evidence before any external search engine is introduced.

Normative calculation uses a versioned TypeScript exact-decimal executor. Approved SQL plans declare operator sequence, precision/scale, division intermediate scale, rounding point and equivalence tests.

---

# 14. Browser and sessions

Two independent Vite builds prevent internal/external route, bundle and identity collapse.

Internal identity uses OIDC authorization-code/PKCE with server-managed sessions, secure HttpOnly SameSite cookies and CSRF protection.

External high-entropy grant tokens are stored only as hashes and exchanged for task-scoped sessions after grant/expiry/transfer/revocation/assurance checks. No persistent account is required.

TanStack Query handles queries only. A separate operation client disables automatic consequential mutation retry.

Continuation anchor persists before transmission. Network loss after possible send triggers lookup, never blind resend.

Commands bind client build, operation/schema/member versions and preview/confirmation identities. Typed outcomes include upgrade, unsupported operation, stale preview, invalidated confirmation, superseded task schema and read-only compatibility.

Semantic HTML, keyboard/focus/error/status, responsive design and Arabic/RTL foundations are mandatory from first UI block.

---

# 15. Release and migrations

SQL-first migrations are forward historical records using expand/migrate/verify/contract. No auto-sync or destructive inferred rollback.

Every `ReleaseCompatibilityManifestVersion` binds:

- source/image/runtime/package versions;
- API/browser compatibility;
- schema migration head/phase;
- operation/field/schema/metric/configuration versions;
- supported payload readers;
- session/task/draft/proposal/confirmation dispositions;
- rollback/drain window;
- conformance result.

Old browser versions may perform declared safe reads but cannot submit semantically changed commands. Workers retain old payload readers until drain/expiry/explicit migration. Unsupported payloads quarantine.

Application rollback is allowed only within the declared compatibility window. Data/schema history is not destructively rolled back.

---

# 16. Exact database type boundary

- numeric/decimal remain canonical decimal strings;
- int8/bigint remain canonical integer strings at boundary or checked bigint internally;
- neither converts to JavaScript number;
- JSON preserves exact strings;
- parser inventory and round-trip tests cover beyond-safe values;
- business rounding occurs only in a registered calculation policy/executor.

---

# 17. Deployment, observability and security

Local composition provides PostgreSQL, S3-compatible object storage and scanner interfaces.

Hosted topology uses static web assets, OCI API/worker containers, managed PostgreSQL HA/PITR, versioned object storage, secret/KMS seam and OTLP collector/exporter. Vendor and Kubernetes are not frozen.

Telemetry provides traces/metrics/logs but never substitutes for audit/security/domain records. Sensitive evidence, bid, narrative, prompt, credential and personal content is excluded from general telemetry. High-cardinality business identities are not uncontrolled metric labels.

CI/release includes exact lockfile, provenance/SBOM, secret scanning, SAST/dependency/container checks, real PostgreSQL/object integration, RLS/privilege/catalog tests, migration compatibility, browser/golden tests and immutable image-digest release.

---

# 18. Testing and block evidence

No in-memory substitute certifies PostgreSQL transactions/RLS/locks/outbox, object durability, restore or effect-indeterminate behavior.

Required suites include:

- module/write-ownership/invariant reverse mapping;
- unit/property and exact-decimal tests;
- real PostgreSQL RLS/concurrency/effective-period/deadlock tests;
- evidence cross-store crash/restore;
- worker lease/fencing/external-effect;
- API/OpenAPI/version compatibility;
- browser continuation/disclosure/accessibility/RTL;
- full restore and golden-thread replay;
- load/measurement-health.

Every block completion manifest includes invariant register/coverage versions, changed objects/operations, reverse mappings, concurrency/effective-period evidence, block-local security/NFR evidence, rollback result and independent review.

No successor unlocks without final block PASS.

---

# 19. Independent review

Every block requires a fresh independent review that did not author the implementation, can return FAIL and records method, reviewer identity, evidence supplied and date. Project owner retains final acceptance.

B02–B04, B14 and V4/V6 blocks require dual independent hostile review unless a named qualified human reviewer participates.

---

# 20. AI and P07 locks

P07 is absent/disabled until V4 feasibility/authorization.

AI interfaces/metadata remain inactive until V6. No model/provider/prompt/tool is required. Deterministic/manual A0–A3 remains complete with AI removed.

No second XL, supplier network, generic workflow/form/report/agent platform or hidden truth writer is introduced.

---

# 21. PA-G1–PA-G15 claim

- one physical owner/write path;
- safe command/idempotency/concurrency/effect;
- coherent evidence payload/metadata/restore;
- recoverable async/indeterminate effects;
- enforceable tenant/project/context isolation;
- derived stores non-authoritative;
- immutable correction/contribution/report history;
- no-account/no-network supplier path;
- UI operation/disclosure/recovery;
- measurable NFRs;
- restore preserves authority/evidence/idempotency/holds/history;
- AI absent/replaceable;
- no second XL/platform;
- bounded acyclic decomposition;
- code remains locked pending authorization.

All are claimed PASS internally and remain subject to final independent hostile audit.