# B01 F4 Checkpoint — Object, Scanner, Local Infrastructure and Observability

**Date:** 2026-08-02  
**Status:** PASS  
**Branch head proven:** `ed7055a7b0ade62123c0eead22e1b87d74971488`  
**Product/business behavior:** none

## Delivered

- versioned S3-compatible object-store contract and SeaweedFS local adapter proof;
- exact object `VersionId`, ETag, byte length and SHA-256 references;
- exact-version put/get/head/delete-test-object behavior;
- unversioned-bucket rejection;
- bounded ClamAV INSTREAM adapter with distinct clean, infected, rejected, unavailable, timeout and error outcomes;
- optional vendor-neutral OpenTelemetry traces and metrics for API/worker technical lifecycle;
- bounded low-cardinality telemetry attributes and existing structured-log redaction;
- scoped local composition for PostgreSQL 18.4, SeaweedFS 4.40, ClamAV 1.5.3 and OTel Collector 0.157.0;
- safe local startup/status/down and explicit-confirmation volume destruction;
- local development runbook and exact version manifest.

## Authoritative clean-room evidence

### Complete workspace

- Workflow: `B01 Verification`
- Run: `30759854723`
- Job: `91528320194`
- Result: PASS
- Exact lockfile install, formatting, lint, strict typecheck, architecture/public-surface checks, invariant manifest checks, unit tests, builds and API/worker smoke all passed across 13 workspace projects.

### PostgreSQL regression

- Workflow: `B01 F3 PostgreSQL`
- Run: `30759854725`
- Result: PASS
- F3 isolation, migration, concurrency, effective-period, exact-type and catalog-security proofs remained green after F4.

### Real F4 services

- Workflow: `B01 F4 Adapters`
- Run: `30759854722`
- Job: `91528320114`
- Result: PASS
- Four scoped containers reached readiness.
- Object-store integration: 3/3 PASS.
- Scanner integration: 3/3 PASS, including harmless EICAR detection.
- Real OTLP trace and metric payloads reached Collector 0.157.0 under service identity `cpos-b01-otel-smoke`.
- Scoped teardown removed only B01 containers and network while preserving named volumes.

## Hostile evidence

- unversioned bucket is rejected;
- two immutable versions of one key remain independently retrievable;
- tampered checksum reference is rejected;
- unavailable scanner is not clean;
- scanner timeout is not clean;
- over-limit payload is rejected before connection;
- unexpected scanner response is an error;
- disallowed high-cardinality telemetry attribute is rejected;
- local volume removal requires explicit `CPOS_CONFIRM_DESTROY=YES`.

## Defects found and corrected

1. Scanner socket was unnecessarily mutable; corrected to a constant without behavior change.
2. The fake timeout server retained a test socket and caused teardown timeout; test sockets are now tracked and destroyed before fake-server closure.
3. Earlier pre-normalization runs rejected the stale dependency lockfile; the exact graph was regenerated and committed before authoritative verification.

## Boundary confirmation

F4 does not create:

- UploadSession, EvidenceRecord, evidence acceptance or quarantine state;
- tenant, project, principal or authentication data;
- procurement operations, RFQs, supplier behavior, reporting, P07 or AI;
- telemetry-based audit or business truth;
- a production object-storage, scanner or telemetry provider commitment.

## Result

`F4 PASS — object/scanner/local-infrastructure/observability foundations are proven. F5 may begin. B02 remains locked.`
