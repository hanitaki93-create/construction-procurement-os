# B01 F2 Scope — Runtime and Browser Technical Shells

**Date:** 2026-08-02  
**Status:** IMPLEMENTED CANDIDATE / CLEAN-ROOM VERIFICATION ACTIVE  
**Verification trigger:** exact lockfile refreshed after explicit Node type-boundary correction

## Candidate inventory

- `@cpos/contracts` — health, build and OpenAPI technical contracts;
- `@cpos/config` — bounded fail-fast runtime configuration;
- `@cpos/observability` — structured redacted technical logging foundation;
- `@cpos/ui-foundation` — semantic, responsive and English/Arabic direction primitives;
- `@cpos/api` — liveness, readiness, build metadata and OpenAPI routes only;
- `@cpos/worker` — empty named-lane runtime and lifecycle checks;
- `@cpos/web-internal` — separate internal technical shell;
- `@cpos/web-external` — separate external secure-task placeholder shell;
- API and worker process smoke tests;
- branch maintenance for exact lockfile and formatting;
- read-only PR verification.

## Required F2 proof

- exact frozen-lockfile install;
- formatting and lint;
- strict production and test typecheck;
- package tests;
- all package and application builds;
- API process starts and serves the four technical routes;
- worker `--check` starts and stops cleanly;
- internal and external browser bundles remain physically separate;
- dependency boundary scanner rejects external-to-internal and browser-to-database paths;
- no business, tenant, procurement, evidence-acceptance, P07 or AI implementation.

This document is not a PASS declaration. F2 remains open until the clean-room run and checkpoint evidence are complete.
