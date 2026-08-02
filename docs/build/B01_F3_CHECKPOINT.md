# B01 F3 Checkpoint — PostgreSQL, Concurrency and Manifest Foundations

**Date:** 2026-08-02  
**Status:** PASS  
**Branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Verified head:** `70455c8b144c32259306e38934743f0896854472`

## Delivered

- private PostgreSQL pool, explicit-isolation transaction helper and bounded pre-effect-safe retry;
- exact `numeric` and `int8` parser contract;
- SQL-first migration runner with SHA-256 history, advisory locking, status, batch rollback and clean rebuild;
- technical release-metadata migration only;
- database catalog scan for CPOS-owned `SECURITY DEFINER`, context mutation, `SET ROLE` and `BYPASSRLS` roles;
- one public database entry point exposing health, migrations, catalog scan and close only;
- 92-source / 102-invariant bidirectional compiler fixtures;
- effective-period, ownership, concurrency-profile and release-compatibility validation;
- product-owned 120-significant-digit exact-decimal executor with mandatory division intermediate scale;
- isolated `testkit_*` schemas for concurrency/effective-period tests;
- PostgreSQL 18.4 clean-room service workflow.

## Workspace verification

- Workflow: `B01 Verification`;
- Run ID: `30750604101`;
- Job ID: `91503869152`;
- frozen-lockfile install: PASS;
- formatting/lint/strict typecheck: PASS;
- root architecture tests: 10/10 PASS;
- manifest compiler fixture: 92 source rows / 102 invariants PASS;
- workspace test files: 13 PASS;
- workspace tests: 32 PASS;
- all packages and both browser applications build: PASS;
- API and worker process smokes: PASS.

## PostgreSQL hostile verification

- Workflow: `B01 F3 PostgreSQL`;
- Run ID: `30750604099`;
- Job ID: `91503869243`;
- service image: PostgreSQL 18.4;
- database package typecheck and public-surface check: PASS;
- integration test files: 5 PASS;
- real PostgreSQL hostile tests: 20 PASS;
- committed migration apply/status/rebuild: PASS;
- clean database catalog scan: PASS.

## Hostile results

- explicit READ COMMITTED / REPEATABLE READ / SERIALIZABLE readback: PASS;
- beyond-IEEE-754 `numeric(38,12)`, `numeric(38,18)` and `int8` round trip as strings: PASS;
- migration idempotency/checksum/failure rollback/concurrent advisory lock/rebuild: PASS;
- unprotected cross-row write skew reproduced: PASS negative control;
- stable guard row and recomputation preserved conservation: PASS;
- SERIALIZABLE preserved conservation with typed conflict: PASS;
- absent guard proved to lock nothing: PASS negative control;
- lazy insert-on-conflict guard materialization produced one lockable row: PASS;
- canonical multi-guard order completed; reversed order produced `40P01`: PASS;
- unprotected effective-period overlap reproduced: PASS negative control;
- GiST exclusion rejected overlap with `23P01`: PASS;
- SERIALIZABLE protected an application-normalized temporal predicate: PASS;
- unsafe `SECURITY DEFINER`/context mutation and CPOS `BYPASSRLS` role detected: PASS.

## Failures discovered and closed

1. discriminated database-health result required explicit test narrowing;
2. environment URL required a guaranteed-string helper;
3. architecture scanner needed a narrow same-package private-test exception while retaining all production/cross-package prohibitions;
4. Decimal.js default precision rounded a 28-digit exact calculation; replaced with an isolated 120-digit product context;
5. NodeNext Decimal ESM import and exact optional-property cloning were corrected without interop or compiler relaxation;
6. empty database interfaces were replaced with exact type aliases;
7. public database surface remained one entry point with no raw query capability.

No compiler, database, migration, concurrency, catalog or arithmetic strictness was weakened.

## Scope confirmation

- product tenant/business schemas: 0;
- `withExecutionContext` product/RLS context: 0;
- registered product operations: 0;
- evidence/procurement/reporting state: 0;
- P07: 0;
- AI: 0.

F3 PASS does not unlock B02. It unlocks only B01 checkpoint F4.
