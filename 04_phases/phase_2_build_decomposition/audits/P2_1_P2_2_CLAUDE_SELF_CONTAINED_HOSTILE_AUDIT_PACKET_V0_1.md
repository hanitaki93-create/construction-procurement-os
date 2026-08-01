# Construction Procurement OS — P2.1/P2.2 Claude Hostile Audit Packet v0.1

**Date:** 2026-08-02  
**Status:** INTERNAL PASS / EXTERNAL FREEZE AUDIT PENDING  
**Phase 1:** PASS / CLOSED / FROZEN  
**P2.1 physical architecture:** INTERNAL PASS  
**P2.2 build decomposition:** INTERNAL PASS  
**B01-P01 build prompt:** INTERNAL PASS / EXECUTION LOCKED  
**Product code:** NOT STARTED

---

# 1. Audit mission

Audit the selected physical architecture, its 18-block decomposition and the attached first build prompt.

Decide whether later implementation can proceed without choosing:

- a different topology or state authority;
- tenant/context enforcement meaning;
- command/idempotency/effect recovery;
- cross-store evidence acknowledgment/restore;
- module write ownership;
- browser/worker/release compatibility;
- derived search/report authority;
- optional P07/AI dependency;
- block ownership or execution ordering;
- B01 scope, acceptance or rollback meaning.

Treat all internal PASS results as claims to attack.

Do not fail for production cloud vendor, exact container service, exact OIDC provider, exact S3 provider, visual design or later domain-table attributes intentionally owned by their build blocks.

Fail if B01 or a later block would still need to invent a load-bearing physical protocol.

---

# 2. Frozen upstream constraints

Phase 1 architecture is frozen.

A0–A3 must work without:

- P07;
- named connector;
- supplier account/network;
- public broker/API dependency;
- chat or AI;
- warehouse/BI;
- cross-tenant learned business influence.

P07 commercial truth remains the sole independent XL.

Every state-changing action uses a registered operation. Proposal, evidence, workflow, connector, report, UI and AI never write business truth directly.

Timeout/absence is never proof of no effect. Evidence identity and object/hash/URL remain distinct. Reports remain derived. UI cannot hide commands. AI remains optional and product-owned.

Implementation is still locked pending external P2 PASS, freeze, explicit authorization and recorded V1/V2 sequencing decision.

---

# 3. Current primary technical basis

Official current evidence checked 2026-08-02 supports:

- Node.js 24 as LTS while Node 26 is Current;
- Fastify 5.10.x current v5 line;
- React 19.2.x;
- Vite 8.1.x;
- PostgreSQL 18.4 current/supported;
- PostgreSQL exact `numeric`, UUIDv7, row-level security, `SKIP LOCKED`, full-text search and trigram extension;
- OpenTelemetry traces/metrics/logs;
- Playwright cross-browser testing.

The evidence supports feasibility only. It does not prove isolation, durability, Arabic relevance, accessibility or NFR conformance.

---

# 4. Selected physical architecture

## 4.1 Topology

One TypeScript monorepo, one semantic system, four initial deployables:

1. stateless Fastify API/BFF;
2. durable worker process with named lanes;
3. separate internal React/Vite browser application;
4. separate external secure-task React/Vite application;
5. dedicated migration/release job.

One PostgreSQL 18 database is authoritative. Versioned S3-compatible object storage holds evidence/artifact bytes but never business authority.

No mandatory microservices, Kafka/RabbitMQ, Redis, OpenSearch, warehouse, Kubernetes or AI.

## 4.2 Stack families

- Node 24 LTS;
- TypeScript strict;
- pnpm workspaces/project references;
- Fastify 5;
- React 19.2 + Vite 8.1;
- TanStack Query 5 for queries only;
- PostgreSQL 18;
- Kysely/`pg` explicit SQL;
- SQL-first forward migrations;
- S3-compatible object adapter;
- OpenTelemetry/OTLP;
- Vitest/property tests/Testcontainers/Playwright;
- OCI containers/provider-neutral managed runtime.

Exact patches are checked and pinned by B01.

## 4.3 Persistence

Relational authoritative state plus append-only occurrences, corrections, decisions, issue records and events. Not universal event sourcing.

Physical defaults:

- UUIDv7 IDs;
- display/legal numbering separate;
- tenant/project/context columns;
- `recorded_at timestamptz` plus explicit effective/date/timezone fields;
- expected `version bigint`;
- amount `numeric(38,12)`, rate `numeric(38,18)` as bounded physical defaults;
- decimal strings in JSON/application;
- policy performs rounding before persistence;
- bounded versioned JSONB only;
- no ORM auto-sync.

---

# 5. Exact load-bearing physical protocols

## 5.1 Fail-closed database context

No application/domain code receives a raw pool.

All tenant SQL executes through `withExecutionContext`:

1. verify execution-context shape;
2. open fresh transaction;
3. `SET LOCAL` tenant, principal, represented principal, project, authority context, operation/invocation and service identity;
4. read settings back and verify equality;
5. establish permitted module role/capability;
6. run only transaction-bound module persistence adapter;
7. commit/rollback and release.

No query before step 4.

Tenant tables use ENABLE + FORCE RLS. Missing/invalid context denies. Runtime roles are non-owner, non-superuser, no BYPASSRLS, no migration rights.

Workers claim only minimal non-business envelopes globally, then open a new tenant-scoped transaction to read payload.

## 5.2 One writer in a shared database

- no public general DB package;
- each module owns private persistence/table/migration package;
- cross-module access uses versioned application contract;
- generated `PhysicalWriteOwnershipManifest` assigns every mutable object one owner, operations and lane;
- CI fails on unowned/multiple owner, cross-module raw SQL/import or forbidden grant;
- reporting/search roles are read-only to source schemas;
- explicit same-transaction contracts are reviewed exceptions, never raw access.

## 5.3 Command transaction

A command transaction binds logical command, idempotency, continuation, principal/context, operation/target/config/evidence versions, authority/guards, authoritative mutation, immutable occurrence/correction, event/outbox/job and typed outcome.

No accepted acknowledgment before durable commit.

REST/JSON/OpenAPI 3.1 routes only validate/translate and call the dispatcher.

## 5.4 Job versus external effect

Job scheduling is distinct from PublicationIntent/TransportAttempt/Observation/EffectPosition.

Before network transmission, one transaction commits immutable TransportAttempt and attempt-ready effect state.

If crash/lease expiry occurs after possible transmission:

- no ordinary retry;
- effect is/enters EFFECT_INDETERMINATE unless positive evidence proves another stage;
- reconciliation/lookup/evidence capture only;
- resend requires positive no-effect proof or new valid owning command;
- fencing token blocks stale worker completion.

Queue has lanes, bounded claims, leases, heartbeats, tenant quotas, weighted fairness, deadline aging and explicit safe-retry class.

`SKIP LOCKED` is queue-claim only.

## 5.5 Cross-store evidence

UploadSession exists before transfer.

Closed states:

- RESERVED;
- TRANSFER_IN_PROGRESS;
- STORED_UNVERIFIED;
- VERIFIED_QUARANTINED;
- VALIDATION_IN_PROGRESS;
- VALIDATION_BLOCKED_OR_FAILED;
- CAPTURED_EVIDENCE_ONLY;
- ACCEPTED_EVIDENCE_VERSION;
- ABANDONED_OR_EXPIRED;
- PAYLOAD_MISSING_RECONCILIATION_REQUIRED.

Responses distinguish session creation, unverified receipt, verified quarantine, recorded capture and accepted evidence.

`CAPTURE_RECORDED` requires immutable provider version, verified bytes/checksum and committed metadata retrievable by UploadSession.

`EVIDENCE_ACCEPTED` is a separate evidence command.

Object without metadata and metadata without object reconcile explicitly and never fabricate acceptance.

Issued artifact flow is build intent → render → immutable verified object → issued artifact commit → issue/dispatch.

Restore uses RecoverySetManifest binding database recovery point, object-version inventory, release/schema/configuration, references/checksums, holds/tombstones and unresolved sessions.

## 5.6 Browser/release compatibility

Separate internal and external builds.

TanStack Query handles queries; a separate operation client disables automatic consequential mutation retry.

Continuation anchor persists before transmission. Network loss after possible send performs lookup, not resend.

Every command binds client build, operation/schema/member versions and preview/confirmation identity.

Typed outcomes include client upgrade, unsupported operation, stale preview, invalidated confirmation, superseded task schema and read-only compatibility.

Jobs/events have versioned readers retained until drain/expiry/explicit migration. Unsupported payloads quarantine.

Schema releases use expand/migrate/verify/contract. App rollback only inside declared compatibility window.

---

# 6. Derived data, deployment and security

Search/report/control remain derived PostgreSQL projections with definition/source-cut/access/freshness/lineage and no source write path.

Initial search is PostgreSQL FTS/trigram. Arabic relevance is measured later.

Hosted shape: static web, OCI API/worker containers, managed PostgreSQL HA/PITR, versioned object storage, secret/KMS seam and OTLP. Kubernetes/provider not frozen.

Telemetry excludes evidence/bid/narrative/prompt/personal data and uncontrolled high-cardinality business IDs. Audit/security/domain records remain separate.

No in-memory substitute certifies RLS, locks, outbox, object durability, restore or effect recovery.

---

# 7. P2.1 internal audit history

Initial FAIL blockers:

- BL-P21-01 cross-store evidence acknowledgment/restore;
- BL-P21-02 pooled RLS context;
- BL-P21-03 lease expiry after possible external effect;
- BL-P21-04 module write ownership in shared DB;
- BL-P21-05 browser/job/release version skew.

All were remediated through the exact protocols above.

Internal recheck attacked 128 scenarios and returned PASS for PA-G1–G13 and G15. PA-G14 was delegated to P2.2.

---

# 8. Build decomposition

18 major blocks:

1. B01 Engineering Foundation & Runtime Skeleton
2. B02 Platform Kernel: tenancy, authority, operations, idempotency, continuation and audit
3. B03 Async/event/publication/reconciliation kernel
4. B04 Evidence/files/issued artifacts/communication primitives
5. B05 Requirements/allocation
6. B06 Sourcing/RFQ/invitations/grants/issue
7. B07 Supplier submissions/revisions/buyer capture
8. B08 Field/schema registry, normalization/comparison
9. B09 Recommendation/approval/AwardDecision/handoff
10. B10 Internal conventional web application
11. B11 External secure-task participation
12. B12 Reporting/controls/search/export
13. B13 Integration/migration/provider-neutral email
14. B14 NFR/security/restore/release hardening
15. B15 Deterministic A0–A3 validation/pilot instrumentation
16. B16 P07 Commitment/change baseline — V4 gated
17. B17 P07 claims/certification/correction/reporting — V4 gated
18. B18 AI substrate/capabilities — V6 gated

Key ordering:

- B02 creates the only legal execution/RLS/operation path before business modules;
- B03 creates effect recovery before files/communications/connectors;
- B04–B09 form deterministic backend causality;
- B10/B11 expose separate conventional surfaces;
- B12 remains derived;
- B13 cannot become prerequisite;
- B14 consolidates proof but security/NFR apply incrementally;
- B15 reaches deterministic A0–A3 and validation instrumentation;
- P07/AI remain optional and gated.

All MR-001–MR-092 map to a primary block. Correct requirement dispositions remain 66 fully traced, 19 physical proof, 5 external validation, 1 legal, 1 non-SPINE, 0 architecture gaps.

P2.2 internal audit returned PASS and PA-G14 PASS.

---

# 9. Block-completion control

Every block must commit a BlockCompletionEvidenceManifest containing:

- block/prompt/commit identity;
- requirements/ADRs/frozen clauses;
- predecessor manifests and authorization;
- delivered schemas/APIs/events/operations/surfaces;
- ownership and compatibility manifests;
- exact test commands/results/artifacts;
- hostile scenarios;
- architecture questions;
- failures/debt/rollback;
- independent PASS/FAIL.

A successor cannot assume completion without this artifact.

Prompts are generated just in time.

---

# 10. First build prompt candidate

The attached B01-P01 prompt creates only:

- pinned Node/pnpm/TypeScript workspace;
- four deployable shells;
- package/architecture boundaries;
- Fastify health/readiness/build/OpenAPI shell;
- React/Vite internal/external accessible/RTL shells;
- PostgreSQL 18 SQL-first migration harness with bootstrap metadata only;
- object-store/scanner adapter foundations and local contract tests;
- local container composition;
- OpenTelemetry bootstrap;
- CI, container builds, secret/dependency checks and SBOM;
- real PostgreSQL/object/scanner integration and Playwright tests;
- documentation and block completion evidence.

It explicitly excludes:

- tenant/business tables;
- authentication;
- product operations;
- evidence acceptance;
- RFQ/supplier/approval/reporting;
- P07;
- AI.

It is execution-locked pending external PASS, freeze, explicit authorization and V1/V2 sequencing decision.

Internal prompt audit returned PASS.

---

# 11. Required independent physical executions

Execute at minimum:

## PX-01 — command crash/idempotency

- duplicate command before/after commit;
- response lost after commit;
- serialization/deadlock retry;
- verify one authoritative result and same logical identity.

## PX-02 — RLS/pool/worker isolation

- pooled connection moves tenant A → tenant B;
- missing/malformed context;
- worker claims global envelope then loads tenant payload;
- reporting/search/export path;
- prove no cross-tenant access.

## PX-03 — evidence cross-store crash/restore

Crash after each step from UploadSession through object put/checksum/metadata/validation/acceptance and issued artifact issue. Restore DB/object to skewed points. Verify no false acceptance/issue and correct reconciliation.

## PX-04 — external send lease expiry

Crash before attempt-ready commit, after commit before send, during send, after send before callback, after callback before update. Verify no ordinary duplicate send and correct indeterminate/reconciliation state.

## PX-05 — release/version skew

Old browser, stale confirmation, old external task schema, old job payload and app rollback across expand/contract. Verify typed blocking/compatibility rather than reinterpretation.

## PX-06 — decomposition path

Trace an ordinary A0–A3 tender and identify the block that implements every step, evidence, authority, UI, report and failure path. No P07/connector/AI dependency.

## PX-07 — B01 prompt simulation

Inspect the actual attached prompt. Identify any task that is missing, premature, semantically invasive, unverifiable or unsafe to roll back.

Add your own scenarios.

---

# 12. Required response

Return exactly:

- VERDICT
- PHYSICAL EXECUTIONS
- BLOCKERS
- WATCHES / NON-BLOCKING DEBT
- PA-G1–PA-G15 CHECK
- DECOMPOSITION CHECK
- REQUIREMENT TRACEABILITY CHECK
- B01 PROMPT CHECK
- REGRESSION CHECK
- FREEZE READINESS
- FIRST BUILD PROMPT READINESS

PASS wording:

`PASS — P2.1 physical architecture and P2.2 build decomposition can freeze; B01-P01 is ready for execution after explicit implementation authorization and the recorded V1/V2 sequencing decision.`

FAIL wording:

`FAIL — Phase 2 architecture/decomposition remains open; blockers below must be remediated before freeze or build-prompt release.`

On PASS, freeze readiness must be:

`READY TO FREEZE P2.1/P2.2 AFTER FINAL CHECKPOINT.`

Build prompt readiness must be:

`B01-P01 READY BUT EXECUTION LOCKED UNTIL EXPLICIT AUTHORIZATION AND V1/V2 SEQUENCING DECISION.`

A clean PASS is appropriate only if later implementation must choose physical code details but not topology, state authority, cross-store protocol, isolation, effect recovery, release compatibility, block ownership or B01 completion meaning.