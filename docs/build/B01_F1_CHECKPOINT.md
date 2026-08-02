# B01 F1 Checkpoint — Workspace, Toolchain and Boundaries

**Date:** 2026-08-02  
**Status:** PASS  
**Branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Verified head:** `a8820660ea354a8ea455842b096d47e33273d9e4`

## Delivered

- Node `24.18.0` and pnpm `10.34.0` exact runtime pins;
- exact central dependency catalog and committed `pnpm-lock.yaml`;
- strict TypeScript production and test compiler graphs;
- ESLint flat configuration and deterministic Prettier policy;
- immutable `@cpos/tooling-config` workspace policy;
- root manifest integrity gate;
- executable dependency-boundary scanner;
- seven positive/negative boundary tests;
- read-only, pinned-SHA GitHub Actions verification.

## Clean-room evidence

- Workflow: `B01 F1 Foundation`;
- Run ID: `30748312399`;
- Job ID: `91497692857`;
- Runner: Ubuntu 24.04;
- Node: `v24.18.0`;
- pnpm: `10.34.0`;
- frozen-lockfile install: PASS;
- root manifest validation: PASS;
- architecture boundary scan: PASS;
- formatting: PASS;
- lint: PASS;
- strict production/test typecheck: PASS;
- root and workspace tests: PASS;
- package build: PASS.

## Failures discovered and closed

1. Initial formatting failure on eight new files.
   - Frozen architecture corpus was excluded from formatting.
   - New B01 files were normalized and the generated lockfile excluded.
2. Initial TypeScript test-graph failure for `AbortSignal`, `EventTarget`, timers and `WebSocket`.
   - Production graph retained server-only `ES2023` libraries.
   - Test/tooling graphs explicitly added `DOM` and `DOM.Iterable`.
   - `skipLibCheck` remained `false`.
3. Duplicate push/PR workflows.
   - Lockfile bootstrap completed once.
   - Verification is now one cancelable, read-only PR workflow.

## Scope confirmation

- business modules: 0;
- tenant or procurement tables: 0;
- authentication: 0;
- product operations: 0;
- evidence acceptance: 0;
- P07: 0;
- AI: 0.

F1 PASS does not unlock B02. It unlocks only B01 checkpoint F2.
