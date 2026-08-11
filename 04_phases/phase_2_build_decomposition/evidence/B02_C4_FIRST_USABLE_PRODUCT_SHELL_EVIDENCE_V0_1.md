# B02-C4 First Usable Product Shell — Evidence V0.1

**Date:** 2026-08-11  
**Branch:** `build/b02-platform-saas-provisional`  
**Verified implementation head:** `bdec8a0e9e77d5c7df8e1729f05de051485f80c4`  
**GitHub Actions run:** `31526007658` — SUCCESS  
**Self-hosted runner:** `eth-sim-cpos-ci-01` (`self-hosted`, `Linux`, `X64`, `cpos-ci`)

## Status

**FIRST GENUINELY USABLE B02 DEVELOPMENT PRODUCT SHELL IMPLEMENTED AND GREEN.**

This evidence is a product-shell milestone, not a declaration that B02-C4 or B02 overall is formally closed. The shell deliberately uses an isolated non-production development runtime until verified authentication and governed persistence wiring are completed through their proper build gates.

The existing governed B02 PostgreSQL kernel remains canonical and was not bypassed, weakened, or rewritten by this product-shell implementation.

## Product surface now available

The internal web surface now provides a coherent contractor workspace rather than the previous technical shell:

- explicit development session gate using tenant/principal context;
- one-click isolated demo workspace for product development;
- English/Arabic locale switching;
- company/tenant identity context;
- current principal and membership/role context;
- project list and selected project state;
- interactive project creation through the B02 platform API shell;
- subscription lifecycle, access mode and entitlement-guard visibility;
- commercial restriction banner for non-FULL access modes;
- membership/role overview;
- responsive desktop/mobile dashboard styling;
- deliberately disabled placeholders for Supplier, Procurement, Approval and Report areas that belong to later domain waves;
- explicit preview of the next domain sequence: RFQ → Supplier Response → Comparison → Approval → Award.

## API/product-runtime seam

The API now exposes:

- `GET /platform/workspace`
- `POST /platform/projects`

The development product runtime is enabled only when `CPOS_DEMO_MODE=true` outside production. Development session headers are rejected in production mode. If the product runtime is disabled, product routes fail closed with `503 PRODUCT_RUNTIME_UNAVAILABLE`; absent/invalid session context fails closed with `401`; unauthorized demo identity is rejected.

The isolated demo adapter exists only to make the product surface immediately interactive without introducing a new database boundary or casually coupling unfinished application code into the frozen persistence kernel. It is not authoritative production persistence.

## Exact verification evidence

GitHub Actions run `31526007658` completed successfully on the self-hosted CPOS runner.

### Architecture and persistence boundary

- `ARCHITECTURE_BOUNDARY_CHECK_PASS`
- `DATABASE_PUBLIC_SURFACE_CHECK_PASS`

### Product shell

- `@cpos/contracts` typecheck PASS
- `@cpos/api` typecheck PASS
- API tests: **5/5 PASS**
- `@cpos/ui-foundation` build PASS
- `@cpos/web-internal` typecheck PASS
- production Vite web build PASS
- Vite transformed 64 modules and emitted the production bundle successfully

### Kernel regression

PostgreSQL integration suite remained green after the product-shell work:

- **12 test files PASS**
- **64/64 tests PASS**
- C1 bootstrap suite PASS
- C1/C2 hostile-remediation suite PASS
- C2 subscription suite PASS
- C3 usage/offboarding suite PASS
- C4 project-context suite PASS
- execution-context, concurrency, effective-period, migration and catalog tests PASS

### Migration/catalog proof

- migrations `000001` through `000009` applied from clean state;
- `pending: []`;
- catalog scan result: `[]`.

## Non-claims / remaining C4 work

This milestone does **not** claim:

- production authentication-provider integration;
- production persistence wiring for the dashboard read model;
- production deployment readiness;
- completion of SSV-1 comprehension evidence;
- formal B02-C4 PASS or B02 overall PASS;
- any RFQ, supplier-response, comparison, approval, award, P07, named integration or active AI business semantics.

Those remain governed by the frozen build program and later checkpoints.

## Milestone conclusion

The user-requested acceleration milestone has been reached: CPOS now has a first genuinely usable, interactive product/dashboard shell while the load-bearing B02 kernel remains green and separately governed.
