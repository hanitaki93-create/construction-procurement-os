# Construction Procurement OS — P2.1 Physical Architecture Candidate v0.2

**Date:** 2026-08-02  
**Status:** CONTROLLING REMEDIATED CANDIDATE / INTERNAL RECHECK PENDING  
**Supersedes:** `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_1.md` where conflicting  
**Phase 1:** FROZEN  
**Code:** LOCKED

---

# 1. Selected physical architecture

The V1 deterministic system is a **strong modular monolith in one TypeScript monorepo**, deployed as separate stateless API, worker, internal-browser and external-browser artifacts.

Baseline:

- Node.js 24 LTS;
- TypeScript strict;
- pnpm workspaces/project references;
- Fastify 5 API and worker shell;
- React 19.2 + Vite 8.1 internal/external applications;
- PostgreSQL 18 authoritative database and initial outbox/job/search substrate;
- Kysely/`pg` explicit SQL and SQL-first migrations;
- S3-compatible versioned object storage;
- OpenTelemetry/OTLP;
- Vitest/property tests/Testcontainers/Playwright;
- OCI containers on provider-neutral managed runtime.

Exact patches are verified and pinned in Build Block 1.

No mandatory microservices, broker, Redis, OpenSearch, Kubernetes, warehouse, supplier account/network, named connector or AI exists in the baseline.

---

# 2. Deployables and boundaries

Deployables:

1. `apps/api`;
2. `apps/worker`;
3. `apps/web-internal`;
4. `apps/web-external`;
5. dedicated migration/release job.

All deployables use one release/compatibility manifest.

Domain modules own authoritative data, operations and persistence. Module public application contracts are versioned. Persistence adapters, table identifiers and migrations are private.

A generated `PhysicalWriteOwnershipManifest` assigns every mutable database object to exactly one module, permitted operation handlers and runtime lane. CI and SQL grant tests fail on unowned, multiply owned or cross-module raw writes.

No general-purpose database client is importable by application/domain code. The only platform entry is `withExecutionContext`; module-specific persistence adapters receive its transaction-bound handle.

---

# 3. Authoritative persistence

PostgreSQL schemas are module-aligned. Authoritative current/effective state is relational. Immutable occurrences, decisions, corrections, issue records and domain events are append-only. The system is not event-sourced as a universal model.

Physical conventions:

- UUIDv7 immutable IDs;
- display/legal number separate;
- tenant/project/context columns as applicable;
- recorded time in UTC `timestamptz`, explicit effective/date/timezone fields;
- expected `version bigint`;
- monetary amounts `numeric(38,12)` and rates `numeric(38,18)` as physical defaults;
- decimal strings over JSON and decimal arithmetic in application;
- registered policy performs business rounding before persistence;
- database constraints reject excess scale/range rather than silently becoming policy;
- bounded versioned JSONB only;
- no ORM auto-sync.

Migrations are SQL-first, forward historical records using expand/migrate/verify/contract.

---

# 4. Fail-closed tenancy and execution context

All tenant-scoped SQL executes only through:

`withExecutionContext(context, transactionOptions, callback)`

It opens a transaction, sets exact tenant/principal/represented-principal/project/authority-context/operation/service values using `SET LOCAL`, reads them back, verifies equality, applies permitted module role/capability and only then exposes a transaction-bound persistence handle.

No query runs before context verification. No raw pool is exported.

Tenant tables use `ENABLE` and `FORCE ROW LEVEL SECURITY`. Missing/invalid settings evaluate false.

Runtime roles are non-owner, non-superuser, no-BYPASSRLS and no migration/function-creation privilege. Security-definer functions are prohibited by default.

Global worker claims access only a minimal `job_claim_envelope`; after claim the worker opens a fresh tenant-scoped transaction and loads tenant payload under the frozen job context. Service identity cannot replace represented principal or authority.

Cross-tenant maintenance is a separately registered, time-bounded and audited operation.

---

# 5. Operation/transaction protocol

Every consequential action maps to one registered OperationKey/version and central dispatcher.

A command transaction binds:

- logical command/idempotency/continuation identities;
- exact principal/context;
- operation, target/member, configuration and evidence versions;
- current authority and guards;
- authoritative state/immutable occurrence/correction;
- domain event and outbox/job rows;
- typed outcome/continuation state.

Default database isolation is READ COMMITTED plus explicit version/row guards. SERIALIZABLE/advisory/row locks are used only for identified invariants.

Command acceptance is not acknowledged before durable transaction commit.

API is REST/JSON/OpenAPI 3.1. Route handlers validate/translate only. State-changing routes cannot write domain tables.

Every command includes client build and compatibility versions. Typed results include upgrade/stale/invalidation outcomes.

---

# 6. Durable jobs and external effects

`JobExecution` is separate from `PublicationIntent`, `TransportAttempt`, `ExternalObservation` and `EffectPosition`.

Workers use named lanes, bounded claims, leases, heartbeats, fencing tokens, per-tenant concurrency, weighted fairness, deadline aging, resource budgets and explicit safe-retry class.

Before an external network call, a transaction commits immutable TransportAttempt identity and attempt-ready effect state.

If crash/lease expiry occurs after possible transmission:

- ordinary job retry is disabled;
- effect position is or becomes `EFFECT_INDETERMINATE` unless positive evidence proves otherwise;
- reconciliation/lookup/evidence capture is scheduled;
- resend requires positive no-effect proof or a new valid owning command;
- stale worker writes fail the fencing-token check.

`FOR UPDATE SKIP LOCKED` is used only for queue claims, never authoritative query consistency.

---

# 7. Evidence and issued-artifact protocol

An immutable UploadSession is committed before transfer with exact context, class/use, limits, target namespace, expiry and correlation.

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

Responses distinguish session creation, unverified receipt, verified quarantine, recorded capture and accepted evidence. Earlier states never imply later meaning.

`CAPTURE_RECORDED` requires immutable provider version, verified size/checksum and PostgreSQL metadata/capture commit retrievable by UploadSession ID.

`EVIDENCE_ACCEPTED` is a separate evidence-domain command.

Object-without-metadata and metadata-without-object states reconcile explicitly and never fabricate acceptance.

Issued artifact protocol:

1. commit ArtifactBuildIntent and exact source/member/version manifest;
2. render;
3. put immutable object and verify bytes;
4. commit IssuedArtifactVersion with provider version/checksum;
5. only then permit issue/dispatch.

Restore uses `RecoverySetManifest` binding DB recovery point, object-version inventory, release/schema/config manifests, evidence/artifact references, checksums, holds/tombstones and unresolved sessions. Post-restore verification classifies missing/inaccessible/mismatch states explicitly.

---

# 8. Search, projections, reports and controls

Authoritative queries read module tables under current access.

Derived PostgreSQL projection/search/report/control tables are idempotent and rebuildable from source identities. Each records definition/version, source cut, scope, freshness and correction/restatement lineage.

Initial search uses PostgreSQL full-text/trigram with separate connection/resource budgets. Arabic relevance is a validation target, not a claim.

Derived stores are read-only toward source schemas and cannot invoke commands.

OpenSearch/warehouse extraction requires measured need, access/restore/reconciliation proof and change control.

---

# 9. Browser and session protocol

Separate internal and external Vite builds prevent route, bundle and identity boundary collapse.

Internal users authenticate through OIDC authorization-code/PKCE with server-managed PostgreSQL sessions and secure HttpOnly SameSite cookies plus CSRF protection.

External grant tokens are opaque/high entropy, stored only as hashes and exchanged for task-scoped sessions after grant/expiry/transfer/revocation/assurance checks. Persistent account is optional.

TanStack Query handles queries only. A separate operation client handles commands and disables automatic mutation retry.

Before effect-bearing transmission, the client persists a continuation anchor scoped to exact user/task/session. Network loss after transmission triggers lookup, never blind resend.

Polling is mandatory recovery/progress; SSE is optional optimization.

Browser commands bind client build, operation/schema/member versions and preview/confirmation IDs. Incompatible versions produce typed upgrade/read-only/stale outcomes.

Semantic HTML, keyboard/focus/error/status, responsive behavior and Arabic/RTL foundations are mandatory from the first UI block.

---

# 10. Release/in-flight compatibility

Every release manifest binds:

- source/image/runtime/package versions;
- API and browser compatibility;
- schema migration head;
- operation/field/schema/metric/configuration versions;
- supported job/event payload readers;
- external-task/proposal/draft/confirmation transition dispositions;
- rollback window.

Old browser versions may perform declared safe reads but cannot submit semantically changed commands.

Workers retain old payload readers until drain/expiry/explicit migration. Unsupported payloads quarantine.

In-flight operations retain their original versions.

Schema rollout uses expand/migrate/verify/contract. Application rollback is allowed only inside compatibility window; data/schema history is not destructively rolled back.

---

# 11. Deployment, observability and security

Local composition provides PostgreSQL, S3-compatible object storage and malware-scanner interfaces.

Hosted topology uses static web assets, OCI API/worker containers, managed PostgreSQL HA/PITR, versioned object storage, secret/KMS seam and OTLP collector/exporter. Vendor and Kubernetes are not frozen.

OpenTelemetry provides traces/metrics/logs; audit/security/domain records remain separate. Sensitive evidence, bid, narrative, prompt and personal content is excluded from general telemetry. High-cardinality business IDs are not uncontrolled metric labels.

CI/release includes dependency lock/provenance/SBOM, secret scanning, SAST/dependency/container checks, real PostgreSQL/object integration, RLS/privilege tests, migration compatibility, browser/golden tests and image digest release.

---

# 12. Testing and proof

No in-memory substitute certifies PostgreSQL transactions/RLS/locks/outbox, object durability, restore or effect-indeterminate behavior.

Required suites include:

- module dependency/write ownership;
- pure policy/unit/property tests;
- exact money/contribution/correction properties;
- real PostgreSQL RLS/concurrency/crash tests;
- evidence cross-store crash/restore tests;
- worker lease/fencing/external-effect tests;
- API/OpenAPI/version compatibility;
- internal/external Playwright continuation/disclosure/accessibility/RTL;
- full restore and golden-thread replay;
- load/measurement-health tests.

---

# 13. AI and optional gravity wells

AI tables/interfaces remain inactive metadata seams until V6. No provider/model/prompt/tool is required.

P07 schemas/modules are absent or disabled until V4 feasibility authorization.

No second XL, supplier network, generic workflow/form/report/agent platform or hidden truth writer is introduced.

---

# 14. Candidate gate claim

The candidate claims PA-G1–PA-G13 and PA-G15 PASS, with PA-G14 dependent on the P2.2 build-block graph.

It remains subject to complete internal hostile recheck and independent external audit before freeze.