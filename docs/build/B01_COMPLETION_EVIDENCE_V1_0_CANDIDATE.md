# B01 Completion Evidence v1.1 Remediation Candidate

**Block:** B01 — Engineering Foundation & Runtime Skeleton  
**Build branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Remediated implementation evidence head:** `3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`  
**Date:** 2026-08-03  
**Status:** FIRST AUDIT FAIL REMEDIATED / TARGETED INDEPENDENT RE-AUDIT AND PROJECT-OWNER ACCEPTANCE PENDING

---

## 1. Decision boundary

This record is the builder's remediated completion-evidence candidate. It is not the independent verdict and does not unlock B02.

The first hostile audit against implementation commit `1344a64454154bc624197b2a885bad9f8da9dafc` returned FAIL with two accepted blockers:

1. the database public-surface guard was an evadable source-text denylist; and
2. the supplied archive omitted dotfiles because the artifact uploader excluded hidden files.

Both have been remediated. B01 may become canonical PASS only after:

1. the targeted independent re-audit explicitly closes BF-01 and BF-02 with no unresolved architecture question or invariant candidate; and
2. the project owner records acceptance.

Until both occur:

- PR #1 remains draft;
- `main` remains unchanged;
- B02 remains locked;
- V1 and V2 remain separate successor gates.

---

## 2. Implemented technical surface

### Deployables

- `apps/api` — technical liveness, readiness, build metadata and OpenAPI shell;
- `apps/worker` — business-empty named-lane lifecycle shell;
- `apps/web-internal` — internal technical browser shell;
- `apps/web-external` — physically separate external technical browser shell.

### Foundation packages

- `@cpos/config`;
- `@cpos/contracts`;
- `@cpos/database-core`;
- `@cpos/invariant-compiler`;
- `@cpos/object-store`;
- `@cpos/observability`;
- `@cpos/testkit`;
- `@cpos/tooling-config`;
- `@cpos/ui-foundation`.

### Infrastructure and release surface

- PostgreSQL 18.4;
- SeaweedFS 4.40 S3-compatible proof substrate;
- ClamAV 1.5.3;
- OpenTelemetry Collector 0.157.0;
- four non-root OCI images;
- exact dependency graph and lockfile;
- source and four image CycloneDX SBOMs;
- secret, dependency and container-vulnerability gates;
- repository reverse-patch and scoped infrastructure rollback proof.

---

## 3. Authoritative remediation evidence

All four authoritative workflows passed on the same exact remediated implementation head `3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`.

| Lane | Run | Job | Result |
| --- | ---: | ---: | --- |
| Complete Node 24 workspace verification | `30803479916` | `91653347445` | PASS |
| PostgreSQL 18.4 hostile regression | `30803479389` | `91653323808` | PASS |
| Object/scanner/telemetry regression | `30803479929` | `91653336380` | PASS |
| F5 browser, OCI, security, SBOM and rollback | `30803479965` | multiple | PASS |

F5 job results:

| F5 job | Job ID | Result |
| --- | ---: | --- |
| Chromium, Firefox, WebKit and mobile | `91653357204` | PASS |
| OCI, secret, dependency, SBOM and vulnerability proof | `91653357153` | PASS |
| Scoped teardown and repository rollback proof | `91653357224` | PASS |

---

## 4. First-audit blocker remediation

### BF-01 — Database public-surface enforcement

The source-text denylist was replaced with an exact typed contract:

- exact approved symbol set;
- declaration-kind enforcement;
- TypeScript type-graph inspection for raw `pg`/Kysely/private-transaction exposure;
- hostile negative controls for renamed raw factory exports, forbidden types hidden behind approved names and unrestricted query methods.

The final traversal is bounded to repository-owned declarations while still following generic arguments. It passes without increasing the Node heap.

### BF-02 — Complete archive evidence

The root cause was GitHub `upload-artifact` excluding hidden files by default. The replacement package:

- archives the exact remediated implementation commit;
- verifies required hidden paths before upload;
- uploads with `include-hidden-files: true`;
- includes per-file SHA-256 checksums.

Formal records:

- `docs/build/B01_HOSTILE_AUDIT_PACKAGE/05_FIRST_AUDIT_FINDINGS.md`;
- `docs/build/B01_HOSTILE_AUDIT_PACKAGE/06_AUDIT_REMEDIATION_01.md`;
- `docs/build/B01_HOSTILE_AUDIT_PACKAGE/07_TARGETED_REAUDIT_PROMPT.md`.

---

## 5. Acceptance-gate table

| # | Frozen acceptance gate | Remediated evidence disposition |
| ---: | --- | --- |
| 1 | Clean checkout installs and runs | PASS — exact Node/pnpm, frozen lockfile and clean GitHub runners. |
| 2 | Exact versions and lockfile committed | PASS — root/workspace manifest gate and lockfile check. |
| 3 | All four deployables build and start | PASS — workspace builds, process smoke and four OCI smoke tests. |
| 4 | Health, build metadata and OpenAPI work | PASS — API unit/process/container smoke. |
| 5 | Browser builds physically separate | PASS — separate source roots, Vite builds, OCI images and cross-surface browser assertions. |
| 6 | Migrations work and detect checksum/concurrency errors | PASS — PostgreSQL 18.4 migration hostile suite. |
| 7 | Object/scanner real contract tests pass | PASS — versioned object and real ClamAV integration. |
| 8 | Dependency/raw-pool negative fixtures pass | PASS — executable boundary and exact typed public-surface gates, including hostile renamed-export fixtures. |
| 9 | Invariant/coverage/ownership/concurrency/compatibility fixtures pass | PASS — invariant compiler suite. |
| 10 | Exact 92-row fixture detects a missing row | PASS — frozen-source fixture negative control. |
| 11 | Effective-period negative control reproduces overlap and protections prevent it | PASS — unprotected, exclusion and SERIALIZABLE cases. |
| 12 | Guard materialization/global order fixtures pass | PASS — missing-guard, lazy materialization and deadlock-order cases. |
| 13 | Numeric/int8 exact boundary and SQL scale/equivalence fixtures pass | PASS — string parsers and 120-digit Decimal context. |
| 14 | Catalog scan passes | PASS — CPOS-owned security/context mutation scan. |
| 15 | All unit/integration/e2e/container/security/SBOM gates pass | PASS on exact remediated implementation head. |
| 16 | No business/auth/evidence-acceptance/P07/AI implementation exists | BUILDER PASS CLAIM — first auditor also reported scope isolation PASS; targeted re-audit may challenge new changes. |
| 17 | No secret or sensitive test data | PASS — Gitleaks and fixture review; harmless EICAR only. |
| 18 | F1–F5 evidence complete | PASS as remediation-evidence candidate. |
| 19 | Rollback executed successfully | PASS — reverse patch and scoped Docker teardown preserved unrelated resources. |
| 20 | Independent review reports no unresolved architecture question/invariant candidate and closes blockers | PENDING targeted re-audit. |
| 21 | Project-owner acceptance recorded | PENDING. |

**Canonical B01 result:** NOT YET FINAL PASS because gates 20 and 21 remain open.

---

## 6. Security and supply-chain evidence

- repository secret scan: PASS;
- exact dependency audit at high threshold: PASS;
- four runtime-image high/critical fixed-vulnerability scans: PASS;
- npm, Corepack, pnpm and Yarn removed from all runtime images because they are unnecessary at runtime;
- runtime smoke asserts those package-manager paths cannot return silently;
- source plus four image CycloneDX JSON SBOMs generated and counted exactly;
- all runtime images use non-root UID/GID `10001:10001`;
- OCI revision/build/release labels match the smoke environment.

---

## 7. Rollback evidence

Repository rollback:

- generated the complete binary diff from `origin/main...HEAD`;
- created a disposable detached worktree;
- verified and applied the reverse patch;
- proved the resulting tree matched `origin/main`;
- removed only the disposable worktree.

Infrastructure rollback:

- created unrelated sentinel container and volume;
- started and stopped the scoped `cpos-b01` environment;
- proved ordinary down preserved the B01 data volume;
- required explicit `CPOS_CONFIRM_DESTROY=YES` for volume destruction;
- proved explicit destroy removed the B01 volume while preserving both unrelated sentinels;
- used no broad Docker prune and no `git clean -fd`.

---

## 8. Explicit non-establishment

B01 does not establish or authorize:

- tenant, company, project, principal, role or authentication models;
- procurement operations, suppliers, RFQs, comparisons, approvals, commitments or purchase orders;
- evidence acceptance, quarantine or authoritative audit semantics;
- reporting/business truth;
- P07 behavior;
- AI behavior or model authority;
- production provider selection;
- production deployment approval;
- B02 execution.

---

## 9. Known limitations and successor work

- The deployables are technical shells, not the procurement product.
- Local object, scanner and telemetry services are contract-test substrates only.
- Browser accessibility is foundation-level automated proof, not full workflow WCAG certification.
- B02 must activate product registers and kernel semantics without weakening B01 boundaries.
- V1 field-evidence and V2 prototype-comprehension gates remain separate even after B01 acceptance.

---

## 10. Required targeted independent verdict

The independent reviewer must inspect the replacement package and explicitly disposition BF-01 and BF-02 as CLOSED or OPEN, then return exactly one of:

- `PASS` — no unresolved blocker, architecture question or invariant candidate;
- `MINOR PASS` — only explicitly non-blocking observations;
- `FAIL` — each blocker identifies the violated clause, affected files, reproducible evidence and required remediation.

The reviewer must not rely solely on this record or prior builder summaries.

---

## 11. Current stop state

- first independent audit: FAIL, preserved;
- remediation implementation evidence: PASS;
- targeted independent re-audit: PENDING;
- project-owner acceptance: PENDING;
- PR #1: DRAFT;
- `main`: UNCHANGED;
- B02: LOCKED.
