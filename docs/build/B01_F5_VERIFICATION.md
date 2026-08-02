# B01 F5 Checkpoint — CI, Browsers, Containers, Security, SBOM and Rollback

**Date:** 2026-08-02  
**Status:** IMPLEMENTATION PASS / INDEPENDENT REVIEW PENDING  
**Implementation evidence head:** `1344a64454154bc624197b2a885bad9f8da9dafc`  
**Branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Business/product behavior:** none

## Delivered

- complete clean-room workspace verification;
- PostgreSQL 18.4 hostile regression;
- versioned object, ClamAV and OTLP regression;
- Chromium, Firefox, WebKit and mobile browser proof;
- four exact non-root OCI image builds and runtime smokes;
- repository secret scan and exact dependency audit;
- source and four-image CycloneDX SBOM generation;
- fixed high/critical runtime-image vulnerability rejection;
- repository reverse-patch rollback proof;
- scoped infrastructure teardown proof preserving unrelated resources;
- compact Playwright JSON diagnostics and retained browser evidence;
- completion-evidence and independent-audit package.

## Conformance remediation closed during F5

- restored exact `playwright-core@1.61.1` peer required by OCI deploy;
- added the required private `@cpos/testkit` workspace;
- prohibited production imports of testkit;
- added root `test:integration` and complete workspace/command manifest enforcement;
- added frozen-lockfile integrity to full verification;
- corrected API/web health-contract matching;
- made secret-scan findings diagnostically actionable without exposing secrets;
- structurally removed two secret-scanner false-positive literals instead of allowlisting them;
- corrected source-relative Syft exclusions;
- removed unused npm, Corepack, pnpm and Yarn tooling from runtime images after Trivy found fixable CVEs inside inherited package-manager tooling;
- asserted package-manager absence in OCI smoke;
- built the complete workspace before Playwright starts so Vite resolves public workspace exports;
- retained full browser diagnostics without weakening any browser assertion.

## Authoritative exact-head evidence

All lanes passed on implementation head `1344a64454154bc624197b2a885bad9f8da9dafc`.

| Workflow | Run | Job(s) | Result |
| --- | ---: | --- | --- |
| B01 Verification | `30764286699` | `91540162236` | PASS |
| B01 F3 PostgreSQL | `30764286728` | `91540162411` | PASS |
| B01 F4 Adapters | `30764286725` | `91540162338` | PASS |
| B01 F5 Release Evidence | `30764286720` | `91540162441`, `91540162405`, `91540162439` | PASS |

## Browser proof

- Chromium: PASS;
- Firefox: PASS;
- WebKit: PASS;
- mobile Chromium: PASS;
- internal/external physical and route separation: PASS;
- keyboard and skip-link focus: PASS;
- English LTR and Arabic RTL: PASS;
- mobile horizontal-overflow control: PASS;
- serious/critical automated accessibility findings: 0.

## Supply-chain and runtime proof

- exact dependency audit: no known high-threshold vulnerability;
- repository secret scan: no leaks;
- CycloneDX files: exactly 5;
- runtime images: API, worker, internal web, external web;
- runtime UID/GID: `10001:10001` for all images;
- OCI revision/build/release metadata: matched;
- package-manager tooling in runtime images: absent and asserted;
- fixed high/critical vulnerabilities after runtime minimization: 0.

## Rollback proof

- complete B01 diff reverse-applied in a disposable worktree;
- reversed tree matched `origin/main`;
- unrelated repository files were untouched;
- ordinary scoped infrastructure down preserved the B01 data volume;
- explicit-confirmation destroy removed only the B01 data volume;
- unrelated sentinel container and volume survived;
- no `git clean -fd`, broad Docker prune or unscoped deletion was used.

## F5 result

`F5 IMPLEMENTATION PASS`.

This is not canonical final B01 PASS. The fresh independent build-conformance review and project-owner acceptance required by frozen acceptance gates 20 and 21 remain pending. PR #1 remains draft, `main` remains unchanged and B02 remains locked.
