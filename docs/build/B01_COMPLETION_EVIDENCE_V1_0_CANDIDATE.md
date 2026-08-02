# B01 Completion Evidence v1.0 Candidate

**Block:** B01 — Engineering Foundation & Runtime Skeleton  
**Build branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Implementation evidence head:** `1344a64454154bc624197b2a885bad9f8da9dafc`  
**Date:** 2026-08-02  
**Status:** IMPLEMENTATION EVIDENCE PASS / FINAL B01 PASS PENDING INDEPENDENT REVIEW AND PROJECT-OWNER ACCEPTANCE

---

## 1. Decision boundary

This record is the builder's completion-evidence candidate. It is not the independent verdict and does not unlock B02.

B01 may become canonical PASS only after:

1. a fresh independent build-conformance review returns PASS with no unresolved architecture question or invariant candidate; and
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

## 3. Authoritative final implementation evidence

All four authoritative workflows passed on the same exact implementation head `1344a64454154bc624197b2a885bad9f8da9dafc`.

| Lane | Run | Job | Result |
| --- | ---: | ---: | --- |
| Complete Node 24 workspace verification | `30764286699` | `91540162236` | PASS |
| PostgreSQL 18.4 hostile regression | `30764286728` | `91540162411` | PASS |
| Object/scanner/telemetry regression | `30764286725` | `91540162338` | PASS |
| F5 browser, OCI, security, SBOM and rollback | `30764286720` | multiple | PASS |

F5 job results:

| F5 job | Job ID | Result |
| --- | ---: | --- |
| Chromium, Firefox, WebKit and mobile | `91540162441` | PASS |
| OCI, secret, dependency, SBOM and vulnerability proof | `91540162405` | PASS |
| Scoped teardown and repository rollback proof | `91540162439` | PASS |

The browser lifecycle defect found during F5 was not masked: Playwright initially reached a Vite import-error overlay because public workspace packages had not been built before development servers started. The root `test:e2e` command now builds the complete workspace before Playwright starts. The unchanged browser, accessibility, RTL, isolation and mobile assertions then passed.

---

## 4. F1–F5 checkpoint record

| Checkpoint | Scope | Recorded evidence | Result |
| --- | --- | --- | --- |
| F1 | workspace, exact toolchain, compiler/lint/format and executable boundaries | `docs/build/B01_F1_CHECKPOINT.md` | PASS |
| F2 | API, worker and physically separate internal/external technical shells | `docs/build/B01_F2_CHECKPOINT.md` | PASS |
| F3 | PostgreSQL, migrations, exact types, concurrency, effective periods and invariant fixtures | `docs/build/B01_F3_CHECKPOINT.md` | PASS |
| F4 | object storage, scanner, local infrastructure and observability | `docs/build/B01_F4_CHECKPOINT.md` | PASS |
| F5 | CI, browsers, containers, security, SBOM, documentation and rollback | `docs/build/B01_F5_VERIFICATION.md` | IMPLEMENTATION PASS |

---

## 5. Acceptance-gate table

| # | Frozen acceptance gate | Builder evidence disposition |
| ---: | --- | --- |
| 1 | Clean checkout installs and runs | PASS — exact Node/pnpm, frozen lockfile and clean GitHub runners. |
| 2 | Exact versions and lockfile committed | PASS — root/workspace manifest gate and lockfile check. |
| 3 | All four deployables build and start | PASS — workspace builds, process smoke and four OCI smoke tests. |
| 4 | Health, build metadata and OpenAPI work | PASS — API unit/process/container smoke. |
| 5 | Browser builds physically separate | PASS — separate source roots, Vite builds, OCI images and cross-surface browser assertions. |
| 6 | Migrations work and detect checksum/concurrency errors | PASS — PostgreSQL 18.4 migration hostile suite. |
| 7 | Object/scanner real contract tests pass | PASS — versioned object and real ClamAV integration. |
| 8 | Dependency/raw-pool negative fixtures pass | PASS — executable boundary and public-surface gates. |
| 9 | Invariant/coverage/ownership/concurrency/compatibility positive and negative fixtures pass | PASS — invariant compiler suite. |
| 10 | Exact 92-row fixture detects a missing row | PASS — frozen-source fixture negative control. |
| 11 | Effective-period negative control reproduces overlap and protections prevent it | PASS — unprotected, exclusion and SERIALIZABLE cases. |
| 12 | Guard materialization/global order fixtures pass | PASS — missing-guard, lazy materialization and deadlock-order cases. |
| 13 | Numeric/int8 exact boundary and SQL scale/equivalence fixtures pass | PASS — string parsers and 120-digit Decimal context. |
| 14 | Catalog scan passes | PASS — CPOS-owned security/context mutation scan. |
| 15 | All unit/integration/e2e/container/security/SBOM gates pass | PASS on exact implementation head. |
| 16 | No business/auth/evidence-acceptance/P07/AI implementation exists | BUILDER PASS CLAIM — requires independent repository-wide confirmation. |
| 17 | No secret or sensitive test data | PASS — Gitleaks and fixture review; harmless EICAR only. |
| 18 | F1–F5 evidence complete | PASS as implementation-evidence candidate. |
| 19 | Rollback executed successfully | PASS — reverse patch and scoped Docker teardown preserved unrelated resources. |
| 20 | Independent review reports no unresolved architecture question/invariant candidate | PENDING — builder cannot self-certify. |
| 21 | Project-owner acceptance recorded | PENDING. |

**Canonical B01 result:** NOT YET FINAL PASS because gates 20 and 21 remain open.

---

## 6. Hostile-scenario results

| Scenario | Result |
| --- | --- |
| Unsupported/incorrect runtime or manifest version | rejected by exact root manifest and engines checks |
| Invalid environment | fail-fast typed configuration |
| Database unavailable | distinct unhealthy result |
| Migration checksum modification | rejected |
| Concurrent migration | serialized by advisory lock |
| Isolation fallback | rejected/read back explicitly |
| Unprotected write skew | reproduced as negative control |
| Protected conservation | guard and SERIALIZABLE strategies pass |
| Missing guard | reproduced as unlocked negative control |
| Lazy guard materialization | one lockable row proven |
| Inconsistent guard order | `40P01` reproduced |
| Effective-period overlap | reproduced unprotected; blocked by protected strategies |
| Frozen source row removed | compiler rejects |
| Invariant missing owner/profile/reverse reference | compiler rejects |
| Unknown/unregistered invariant | compiler rejects |
| Raw pool or cross-package source import | architecture gate rejects |
| Numeric/int8 float coercion | exact string boundary proves rejection/avoidance |
| Implicit SQL division scale | calculation fixture rejects unsafe disposition |
| Unsafe security-definer/context mutation/BYPASSRLS role | catalog scanner detects |
| Invalid compatibility manifest | rejected |
| Fixture schema in product migration inventory | absent and inventory-gated |
| Object versioning disabled | rejected |
| Store unavailable | distinct failure |
| Scanner unavailable/timeout/infected/over-limit | distinct non-clean outcomes |
| External app internal route/component access | browser and boundary tests reject |
| Sensitive telemetry/log field | redaction/attribute policy rejects |
| Root runtime container | image smoke rejects; all images run `10001:10001` |
| Vulnerable unused package-manager tooling | removed from runtime images; absence asserted |
| CI failure swallowed | failing subprocesses and workflows remain non-zero |
| Teardown damages unrelated resources | scoped teardown proof passes |

---

## 7. Invariant/compiler evidence

- frozen source rows: `92/92`;
- invariant families: `102/102`;
- every source row requires invariant or explicit disposition coverage;
- every invariant requires owner, mechanism and test disposition;
- concurrency and effective-period fixtures include protected and deliberately unsafe controls;
- no newly discovered product invariant was registered during B01 because B01 remains business-empty;
- the builder declares no known unregistered B01 technical invariant at this checkpoint, subject to independent review.

---

## 8. Security and supply-chain evidence

- repository secret scan: PASS;
- exact dependency audit at high threshold: PASS;
- four runtime-image high/critical fixed-vulnerability scans: PASS;
- npm, Corepack, pnpm and Yarn removed from all runtime images because they are unnecessary at runtime;
- runtime smoke asserts those package-manager paths cannot return silently;
- source plus four image CycloneDX JSON SBOMs generated and counted exactly;
- all runtime images use non-root UID/GID `10001:10001`;
- OCI revision/build/release labels match the smoke environment.

---

## 9. Rollback evidence

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

## 10. Explicit non-establishment

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

## 11. Known limitations and successor work

- The deployables are technical shells, not the procurement product.
- Local object, scanner and telemetry services are contract-test substrates only.
- Browser accessibility is foundation-level automated proof, not full workflow WCAG certification.
- B02 must activate product registers and kernel semantics without weakening B01 boundaries.
- V1 field-evidence and V2 prototype-comprehension gates remain separate even after B01 acceptance.

---

## 12. Required independent verdict

The independent reviewer must inspect the exact branch/commit and return one of:

- `PASS` — no unresolved blocker, architecture question or invariant candidate;
- `PASS WITH NON-BLOCKING OBSERVATIONS` — observations are explicitly non-blocking and do not require code/evidence correction;
- `FAIL` — each blocker identifies the violated frozen clause, affected files, reproducible evidence and required remediation.

The reviewer must not rely solely on this record or prior builder summaries.

---

## 13. Current stop state

- implementation evidence: PASS;
- independent conformance review: PENDING;
- project-owner acceptance: PENDING;
- PR #1: DRAFT;
- `main`: UNCHANGED;
- B02: LOCKED.
