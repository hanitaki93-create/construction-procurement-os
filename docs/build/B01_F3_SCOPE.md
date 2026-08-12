# B01 F3 Scope — PostgreSQL, Concurrency and Manifest Foundations

**Date:** 2026-08-02  
**Status:** IMPLEMENTED CANDIDATE / CLEAN-ROOM VERIFICATION ACTIVE  
**Verification trigger:** exact-health typing and formatting normalized at `c3b28041e8ac59c91f68cf3b3e8b6f488dfe95b5`

## Candidate inventory

- private PostgreSQL pool and transaction foundation;
- explicit READ COMMITTED, REPEATABLE READ and SERIALIZABLE selection verified before callback SQL;
- bounded pre-effect-safe serialization/deadlock retry with stable logical identity;
- exact numeric and int8 parser inventory and real round-trip tests;
- SQL-first forward migration runner with SHA-256 checksums, advisory lock, batch rollback and status;
- one technical release-metadata migration only;
- database catalog scan for CPOS-owned SECURITY DEFINER, context mutation, SET ROLE and BYPASSRLS;
- single public database entry point exposing health, migration, scan and close only;
- 92-source / 102-invariant compiler fixtures and bidirectional omission checks;
- effective-period overlap dispositions and concurrency-profile validation;
- release compatibility manifest validation;
- exact-decimal calculation plan with mandatory division intermediate scale;
- isolated `testkit_*` PostgreSQL schemas for hostile concurrency tests;
- PostgreSQL 18.4 service workflow.

## Required unit proof

- complete 92/102 fixture passes;
- missing frozen source fails;
- missing invariant owner/test fails;
- missing object reverse mapping fails;
- missing effective-period disposition fails;
- unknown invariant and unreconciled candidate fail;
- incomplete release manifest fails;
- division without intermediate scale fails;
- exact decimal beyond IEEE-754 remains exact;
- public database surface exposes no pool/client/Kysely/private transaction/unrestricted query;
- numeric and int8 parsers remain strings.

## Required real PostgreSQL proof

- PostgreSQL 18.x health;
- exact isolation readback for all three levels;
- numeric(38,12), numeric(38,18) and int8 exact round trip;
- migration pending/apply/idempotency/checksum/failure rollback/concurrent lock/rebuild;
- unprotected aggregate write skew reproduces;
- stable guard row preserves conservation;
- SERIALIZABLE preserves conservation with typed conflict;
- absent guard locks nothing;
- insert-on-conflict creates one guard before lock;
- canonical lock order completes and reversed order deadlocks with 40P01;
- unprotected effective periods overlap;
- GiST exclusion rejects concurrent overlap with 23P01;
- SERIALIZABLE protects an application-normalized temporal predicate;
- clean CPOS catalog has zero findings;
- unsafe SECURITY DEFINER/context mutation and BYPASSRLS role are detected;
- committed migration rebuild and clean catalog scan pass.

## Scope exclusions

- tenant/project/principal/authority tables;
- `withExecutionContext` and RLS product context;
- OperationRegistry or product command semantics;
- evidence, procurement, reporting, P07 or AI state;
- product migrations beyond technical release metadata.

This document is not a PASS declaration. F3 remains open until both clean-room workflows pass and checkpoint evidence is recorded.
