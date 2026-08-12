# B02-C4 Governed Product Surface — Technical Evidence v1.0

**Date:** 2026-08-12  
**Status:** TECHNICAL CHECKPOINT GREEN — NOT FORMAL B02 PASS  
**Exact source head:** `be5f04d27951a184817d882083bd93fd1764e5cc`  
**GitHub Actions run:** `31567643770` — SUCCESS  
**Runner:** `eth-sim-cpos-ci-01` (`self-hosted`, `Linux`, `X64`, `cpos-ci`)

## Scope closed technically

B02-C4 now contains a usable internal product shell plus a governed production-oriented application path without moving database authority into the browser/API.

Implemented and verified:

- versioned tenant-scoped Project / ProjectVersion persistence bound to ContractingAuthorityContext;
- FORCE RLS and immutable project identity/history;
- active OWNER required at the database boundary for project creation;
- active product access required at the same database boundary for project creation;
- suspension/offboarding blocks new project creation while preserving reads of existing project truth;
- restricted `@cpos/platform-application` persistence adapter using `cpos_platform_runtime` rather than raw SQL access from API code;
- exact AuthenticationIdentity → tenant Principal binding revalidation inside the governed database execution context;
- provider-neutral verified authentication-session resolver seam;
- production mode fails closed with 401 when no verified authentication resolver is configured;
- development identity headers remain an explicit non-production seam only;
- workspace read model exposes tenant/company/principal/membership/role/project/subscription/guard context;
- capability presentation derives from active membership, OWNER role, subscription access mode and authority context;
- EN/AR responsive internal dashboard and project creation product shell;
- isolated in-memory demo deployment remains explicitly non-production and is not represented as governed persistence.

## Forward migrations

- `000008_b02_c4_project_context.sql`
- `000009_b02_c4_project_version_trigger_privilege.sql`
- `000010_b02_c4_workspace_access_contract.sql`

No previously proven migration was rewritten.

## Load-bearing hostile/regression proofs

`platform-c4-project-context.integration.test.ts` proves:

1. active OWNER + active product access can create/read a project;
2. active member without OWNER cannot create;
3. after subscription SUSPENDED, a new project is denied while pre-existing project read remains available;
4. cross-tenant and cross-authority-context injection fail closed;
5. Project/ProjectVersion historical rows cannot be rewritten/deleted in place.

API/session tests prove:

- provider-neutral verified session is accepted in production;
- spoof development headers do not override the verified production session;
- production without a verified resolver fails closed;
- invalid development identity is classified as unauthenticated (401), not authorized by supplied tenant/principal headers.

## Exact CI evidence

Run `31567643770` completed SUCCESS and included:

- exact dependency graph install with frozen lockfile;
- `ARCHITECTURE_BOUNDARY_CHECK_PASS`;
- `DATABASE_PUBLIC_SURFACE_CHECK_PASS`;
- `@cpos/platform-application` typecheck PASS;
- contracts/API/UI/web typecheck/build PASS;
- API tests: **2 files / 7 tests / 7 PASS**;
- interactive B02 runtime smoke PASS;
- PostgreSQL integration: **12 files / 65 tests / 65 PASS**;
- migrations `000001` through `000010`, `pending: []`;
- catalog scan `[]`;
- persistent demo container redeploy PASS.

## Explicit non-claims / remaining formal gate

This evidence does **not** declare formal B02 PASS.

Under frozen CHG-SSS-001, SSV-1 still requires at least three non-builder construction practitioners to complete the self-service comprehension/usability exercise and for that evidence to be recorded. That external evidence cannot be fabricated by the builder or by automated CI.

Per CHG-0007, provisional B03 implementation may now proceed while SSV-1 remains pending. B04/B05/B06 remain locked until SSV-1 and the combined post-C1/C2 independent audit are both closed.
