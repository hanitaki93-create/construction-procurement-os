# P2.1 — Internal Audit Remediation v0.1

**Date:** 2026-08-02  
**Status:** REMEDIATION COMPLETE / RECHECK REQUIRED  
**Blockers:** BL-P21-01–BL-P21-05  
**Code:** LOCKED

---

# 1. BL-P21-01 — cross-store evidence protocol

## 1.1 Upload/capture identities

Before payload transfer, the API commits an immutable `UploadSession` with:

- session ID;
- tenant/project/context/principal;
- intended evidence class/use;
- permitted content/size/count;
- target object namespace;
- expiry;
- expected checksum mode;
- task/submission correlation;
- lifecycle state.

States are exactly:

1. `RESERVED`;
2. `PAYLOAD_TRANSFER_IN_PROGRESS`;
3. `PAYLOAD_STORED_UNVERIFIED`;
4. `PAYLOAD_VERIFIED_QUARANTINED`;
5. `VALIDATION_IN_PROGRESS`;
6. `VALIDATION_BLOCKED_OR_FAILED`;
7. `CAPTURED_EVIDENCE_ONLY`;
8. `ACCEPTED_EVIDENCE_VERSION`;
9. `ABANDONED_OR_EXPIRED`;
10. `PAYLOAD_MISSING_RECONCILIATION_REQUIRED`.

The object key includes UploadSession ID and random nonce; it never creates EvidenceVersion identity.

## 1.2 Capture acknowledgment classes

Transport response distinguishes:

- `UPLOAD_SESSION_CREATED`;
- `PAYLOAD_RECEIVED_UNVERIFIED`;
- `PAYLOAD_VERIFIED_QUARANTINED`;
- `CAPTURE_RECORDED`;
- `EVIDENCE_ACCEPTED`.

No earlier response implies a later class.

`CAPTURE_RECORDED` requires:

1. object provider returns immutable version/ETag or equivalent durable identity;
2. server verifies size and independently computed checksum;
3. PostgreSQL transaction commits payload reference, integrity observation and capture state;
4. lookup by UploadSession ID can reconstruct the result.

`EVIDENCE_ACCEPTED` requires a separate owning evidence command after validation and any required review.

## 1.3 Crash/orphan behavior

- object exists, DB state absent/incomplete → orphan reconciliation by UploadSession ID; never automatic evidence acceptance;
- DB reference exists, object missing/unreadable → `PAYLOAD_MISSING_RECONCILIATION_REQUIRED`; no clean/accepted claim;
- retry uses the same UploadSession and object version identity where compatible;
- a different payload/checksum requires a new payload attempt and explicit supersession, not silent replacement.

## 1.4 Issued artifacts

Artifact flow:

1. commit `ArtifactBuildIntent` and exact source/member/version manifest;
2. render bytes under build ID;
3. put immutable/versioned object and verify checksum/size;
4. commit `IssuedArtifactVersion` referencing exact provider version and manifest;
5. only then allow issue/dispatch command.

A render retry cannot overwrite an issued object.

## 1.5 Cross-store recovery manifest

Every backup/restore proof includes a `RecoverySetManifest` binding:

- database recovery point/time/LSN or provider snapshot identity;
- object versioning/bucket inventory checkpoint;
- release/schema/configuration manifests;
- accepted evidence and issued-artifact object references/checksums;
- holds/tombstones/redactions;
- unresolved upload/build/reconciliation sessions.

Post-restore verification classifies each referenced payload as verified, missing, inaccessible, checksum mismatch or provider-version mismatch. It never fabricates a clean result.

---

# 2. BL-P21-02 — fail-closed RLS execution context

## 2.1 Sole database entry point

Application code receives no raw connection pool.

All tenant-scoped SQL executes through:

`withExecutionContext(context, transactionOptions, callback)`

This function:

1. checks the signed/session-derived execution context shape;
2. opens a fresh transaction;
3. executes transaction-local `SET LOCAL` values for tenant, principal, represented principal, project, authority context, operation/invocation and service identity;
4. reads the settings back and verifies exact equality;
5. sets the permitted module database role or capability set;
6. runs callback through a transaction-bound module persistence adapter;
7. commits/rolls back;
8. releases connection after transaction reset.

No query may execute before step 4.

## 2.2 RLS fail-closed rule

RLS policies use safe current-setting access and require non-null exact tenant/context conditions. Missing/empty/invalid settings evaluate false, not global access.

Tenant tables use `ENABLE` and `FORCE ROW LEVEL SECURITY`.

Runtime roles are:

- non-owner;
- non-superuser;
- no `BYPASSRLS`;
- no arbitrary function creation;
- no migration rights.

Security-definer functions are prohibited by default and require explicit review, fixed search path, narrow grants and hostile tests.

## 2.3 Worker claim separation

Global claim query may access only a minimal non-business `job_claim_envelope` containing:

- job ID;
- tenant ID;
- lane/priority/deadline;
- lease/fencing metadata;
- payload-version pointer, not tenant payload.

After claim, worker opens a new `withExecutionContext` transaction using the frozen job context and loads payload through the owning module under RLS.

Service identity cannot substitute for represented principal or authority.

## 2.4 Isolation proof

Tests cover:

- pooled connection reuse across tenants;
- missing/partial/malformed settings;
- table-owner and bypass-role absence;
- worker claim then tenant payload access;
- search/report/export/background job paths;
- SQL functions/views/triggers;
- restore and migration role separation.

---

# 3. BL-P21-03 — job versus external-effect protocol

## 3.1 Separate state machines

`JobExecution` schedules work. It never establishes external-effect retry safety.

`PublicationIntent`, `TransportAttempt`, `ExternalObservation` and `EffectPosition` own external-effect state.

Before the network call, one transaction:

- verifies intent/recipient/content basis;
- allocates immutable TransportAttempt ID;
- records fencing token and `ACCEPTED_PRE_EFFECT`/attempt-ready state;
- commits.

After commit, the worker may transmit.

## 3.2 Crash/lease-expiry rule

If the process dies or lease expires after the attempt-ready commit and transmission may have occurred:

- the job is not returned to ordinary retry;
- effect position becomes or remains `EFFECT_INDETERMINATE` unless positive evidence proves another stage;
- a reconciliation job may be created;
- only provider lookup/evidence capture/manual resolution is allowed;
- resend requires positive no-effect evidence or a new owning command explicitly permitted by frozen semantics.

A stale worker cannot commit completion after lease loss because every write checks the current fencing token.

## 3.3 Queue scheduling

Scheduler uses:

- named lanes;
- bounded batch claim;
- per-tenant concurrency limits;
- weighted fair tenant rotation;
- deadline/age escalation;
- maximum lease and heartbeat rules;
- resource budgets;
- explicit safe-retry class;
- dead-letter/quarantine and accepted-unresolved dispositions.

Queue fairness cannot reorder ordered-dependent domain operations; such dependencies remain explicit.

---

# 4. BL-P21-04 — enforceable one-writer module ownership

## 4.1 Persistence boundary

- no shared general-purpose database package is importable by domain/application code;
- core DB infrastructure exposes only `withExecutionContext` and migration/test utilities;
- each module has a private persistence adapter/package;
- table/schema identifiers are private to the owning module;
- another module can call only the owner's versioned application contract.

## 4.2 Automated ownership manifest

A generated `PhysicalWriteOwnershipManifest` lists every mutable table/view/function and exactly one:

- owning module;
- permitted operation handlers;
- runtime lane/role;
- event/correction path;
- approved cross-module transaction contracts.

CI fails for:

- unowned or multiply owned mutable object;
- forbidden package dependency;
- raw SQL/table reference outside owner;
- reporting/search/integration write grant to source schema;
- operation handler not listed for a mutable object.

## 4.3 Database grants

Runtime privileges are generated from the manifest:

- source module roles receive required DML on owned schema;
- reporting/search roles receive read-only source access and write access only to derived schema;
- connector/file workers receive narrow protocol tables plus owning operation access;
- direct cross-schema DML is denied except an explicit reviewed same-transaction contract.

Physical grants are defense-in-depth; application operation guards remain authoritative.

---

# 5. BL-P21-05 — release and in-flight compatibility

## 5.1 Compatibility manifest

Every release publishes:

- release/build ID;
- API compatibility range;
- browser build IDs;
- operation versions;
- field/schema/metric/configuration versions;
- database migration compatibility window;
- job/event/payload readers supported;
- external-task/proposal transition dispositions.

## 5.2 Browser command binding

Every command includes client build, operation version, schema/member versions and preview/confirmation identities.

Typed outcomes include:

- `CLIENT_UPGRADE_REQUIRED`;
- `OPERATION_VERSION_UNSUPPORTED`;
- `PREVIEW_STALE`;
- `CONFIRMATION_INVALIDATED`;
- `TASK_SCHEMA_SUPERSEDED`;
- `READ_ONLY_COMPATIBILITY_MODE`.

Old browser builds may continue safe reads under declared compatibility but cannot submit a command whose semantics changed.

## 5.3 Jobs and events

- job/event payloads are versioned and immutable;
- workers retain old readers until all payloads drain, expire or are explicitly migrated;
- unsupported payloads quarantine rather than reinterpret;
- in-flight operations retain original operation/configuration/source versions;
- capability/schema transitions state whether drafts/proposals/tasks remain valid, stale-review, invalidated or historical-only.

## 5.4 Migration/rollback

- schema changes use expand/migrate/verify/contract;
- old application version may roll back only while compatible with expanded schema;
- contract migration occurs only after old versions/jobs are absent;
- data is never destructively rolled back or reinterpreted;
- rollback disposition is part of release approval.

---

# 6. Watch incorporation

- PostgreSQL search uses dedicated pools/resource limits and measured extraction thresholds.
- database constraints reject out-of-range precision; application decimal policy performs business rounding before persistence.
- session indexes/cleanup/revocation are measured; cache remains optional/non-authoritative.
- local object/scanner components are replaceable test tools.
- service extraction always requires `CHG-*` review and semantic-equivalence proof.

---

# 7. Remediation claim

BL-P21-01–BL-P21-05 are closed in the controlling v0.2 candidate only if the full hostile recheck passes.

No Phase 1 semantic decision is changed.