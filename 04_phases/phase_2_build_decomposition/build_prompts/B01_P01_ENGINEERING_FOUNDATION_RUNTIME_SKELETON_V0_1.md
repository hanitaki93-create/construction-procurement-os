# Build Prompt B01-P01 — Engineering Foundation & Runtime Skeleton v0.1

**Status:** LOCKED CANDIDATE / DO NOT EXECUTE UNTIL EXTERNAL P2 AUDIT PASS, P2 FREEZE, EXPLICIT IMPLEMENTATION AUTHORIZATION AND RECORDED V1/V2 SEQUENCING DECISION  
**Block:** B01  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch suggestion:** `build/b01-engineering-foundation`  
**Product code before this prompt:** none

---

# 1. Role and objective

Act as a senior staff engineer building only **B01 — Engineering Foundation & Runtime Skeleton**.

Create a reproducible TypeScript monorepo and four runnable deployable shells with local PostgreSQL/object/scanner infrastructure, CI, observability bootstrap, migrations, architecture-boundary tests and completion evidence.

Do **not** implement procurement business behavior, tenant data models, authentication, evidence acceptance, operations, RFQs, supplier workflows, reports, P07 or AI.

This prompt creates the foundation on which B02 may safely build. It must not anticipate B02 by inventing semantics.

---

# 2. Mandatory sources to read before editing

Read and treat as controlling:

1. `PROJECT_STATE.md`
2. `04_phases/phase_1/P1.11_golden_thread_validation_red_team_master_specification/CONSTRUCTION_PROCUREMENT_OS_PHASE1_MASTER_SPECIFICATION_V1_0_FROZEN.md`
3. `04_phases/phase_2_build_decomposition/P2_0_ENTRY_HANDOFF_V0_1.md`
4. `04_phases/phase_2_build_decomposition/P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_2.md`
5. `04_phases/phase_2_build_decomposition/P2_1_MODULE_DATA_RUNTIME_MAP_V0_1.md`
6. `04_phases/phase_2_build_decomposition/P2_1_NFR_SECURITY_DEPLOYMENT_PROOF_MAP_V0_1.md`
7. `04_phases/phase_2_build_decomposition/P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_1.md`
8. `04_phases/phase_2_build_decomposition/P2_2_REQUIREMENT_TO_BLOCK_TRACEABILITY_V0_1.md`
9. `04_phases/phase_2_build_decomposition/P2_2_BLOCK_COMPLETION_EVIDENCE_MANIFEST_TEMPLATE_V0_1.md`

Do not edit Phase 1 frozen artifacts.

If an implementation choice appears to require a new decision about ownership, truth, state, authority, effect, correction, evidence, report meaning, interaction, NFR semantics or AI authority, record it as an architecture question and stop that portion. Do not invent an answer.

---

# 3. Safety and repository rules

- Inspect the repository before creating files.
- Preserve all existing documentation and history.
- Never use `git clean -fd`.
- Do not delete untracked/user artifacts.
- Do not force-push.
- Do not commit secrets, credentials, generated private keys, local object payloads, browser auth state or `.env` values.
- Use `.env.example` files with safe placeholders.
- Pin exact dependency versions and commit the lockfile.
- No package may float on `latest`, `*`, broad major-only range or unreviewed Git URL.
- Do not add a package unless it has a concrete B01 purpose.
- Do not create production cloud resources.
- Do not implement a generic platform, workflow engine, form builder, event-sourcing framework or plugin system.

---

# 4. Version-resolution preflight

Before scaffolding:

1. Confirm Node.js 24 is still LTS.
2. Resolve the latest supported security-patched version inside these selected families:
   - Node.js 24 LTS;
   - Fastify 5.x;
   - React 19.2.x;
   - Vite 8.1.x;
   - TanStack Query 5.x;
   - PostgreSQL 18.x;
   - current compatible stable TypeScript, pnpm, Vitest, Playwright and OpenTelemetry packages.
3. Record exact versions and source/check date in:
   - `docs/build/B01_VERSION_MANIFEST.md`.
4. Pin exact versions in package manifests, lockfile, runtime/container files and CI.
5. If a selected major has become unsupported or has an unresolved critical vulnerability, stop and record a physical architecture issue. Do not silently choose a new major.

Use Node 24 LTS rather than Node 26 Current.

---

# 5. Required repository structure

Create at minimum:

```text
apps/
  api/
  worker/
  web-internal/
  web-external/
packages/
  config/
  contracts/
  database-core/
  object-store/
  observability/
  testkit/
  ui-foundation/
  tooling-config/
infra/
  local/
  containers/
migrations/
  sql/
scripts/
docs/
  build/
  runbooks/
tests/
  architecture/
  integration/
  e2e/
```

Naming may differ only where the purpose remains exact and is documented.

No procurement/domain module is created in B01.

---

# 6. Workspace and toolchain

Implement:

- pnpm workspace with exact `packageManager` version;
- Node engine constraint for the pinned Node 24 patch/family;
- TypeScript strict mode, project references and no implicit `any`;
- shared ESLint and formatter configuration;
- import sorting and unused-code checks;
- root scripts for build, lint, format-check, typecheck, test, integration, e2e, architecture check, migrations, SBOM and full verification;
- source maps for test/staging debugging without exposing them publicly by default;
- consistent ESM/CJS policy—prefer ESM unless an exact dependency forces an isolated exception;
- package export maps so internal paths are not accidentally public.

Root `pnpm verify` must execute all non-destructive B01 quality gates in deterministic order.

---

# 7. Dependency and ownership boundaries

Add an executable architecture-boundary check using `dependency-cruiser`, ESLint boundaries or an equally explicit tool.

Enforce at minimum:

- browser apps cannot import API/worker/database/object-store internals;
- `web-external` cannot import `web-internal` routes/features;
- apps may depend on public package exports only;
- `database-core` may not be imported directly by browser packages;
- no package imports files through `../../` into another package source;
- no cycles across workspace packages;
- future domain persistence adapters must be private by convention and rule;
- `ui-foundation` contains only non-authoritative primitives, tokens, accessibility and localization helpers—no domain workflow or command logic;
- `contracts` contains transport/build metadata primitives only in B01.

Add positive and negative fixture tests proving the rules actually fail when violated.

---

# 8. API application shell

Create a Fastify application with:

- explicit composition root;
- request IDs;
- structured logging through the observability package;
- startup configuration validation;
- secure default headers;
- bounded body/request timeouts suitable for a shell;
- no trust-proxy assumption without configuration;
- no business routes;
- no authentication routes;
- no raw database pool exposed to route handlers.

Endpoints:

- `GET /health/live` — process liveness only;
- `GET /health/ready` — database and required local adapter readiness with typed component results;
- `GET /meta/build` — non-sensitive release/build/version manifest;
- `GET /openapi.json` — generated OpenAPI 3.1 document for current shell endpoints.

Health endpoints must not disclose credentials, hostnames, object keys or stack traces.

Add unit and real-infrastructure integration tests.

---

# 9. Worker application shell

Create a separate worker process with:

- its own composition root and logger;
- graceful startup/shutdown;
- health/readiness endpoint or equivalent process probe;
- named lane registry containing only empty B01 lanes:
  - `interactive-nearline`;
  - `routine-domain`;
  - `evidence`;
  - `connector-email`;
  - `reconciliation`;
  - `report-export`;
  - `search`;
- no job tables or business job execution yet;
- no external transmission;
- no AI lane implementation.

The lane registry is configuration metadata only and must not become a generic plugin system.

---

# 10. Browser application shells

Create two separate React/Vite builds.

## Internal shell

- semantic layout with placeholder navigation region and main landmark;
- build/API health page;
- error boundary;
- loading/status components with programmatic status semantics;
- locale/direction foundation;
- English and Arabic shell strings proving RTL direction switching;
- no login, tenant selector or domain workflow.

## External shell

- independent entry point, bundle and routes;
- secure-task placeholder route that shows no internal data;
- build/API health page;
- same accessibility/RTL foundations;
- no supplier profile/account/network behavior.

Shared `ui-foundation` may include:

- design tokens/CSS variables;
- semantic layout primitives;
- focus-visible and status/error primitives;
- locale and direction helpers;
- no domain-specific fields, forms or actions.

Use TanStack Query only for the non-consequential API health/build query. Configure defaults explicitly; do not rely on implicit mutation retry behavior.

Do not introduce server actions or browser domain state.

---

# 11. Database foundation

Use PostgreSQL 18.x.

Create:

- connection/config package usable only by server-side composition roots and future private persistence adapters;
- pool sizing/timeouts for local/test environment;
- startup connection validation;
- transaction helper foundation without tenant/business context semantics;
- SQL-first migration runner with:
  - ordered immutable migration IDs;
  - migration checksum;
  - advisory lock preventing concurrent migration;
  - applied timestamp/build identity;
  - `status` command;
  - forward application only;
  - failure rollback at transaction boundary where PostgreSQL permits;
- bootstrap migration containing only technical metadata required by the migration/release system.

Do **not** create tenant, project, principal, operation, evidence or procurement tables. Those belong to B02+.

Do not export a general raw pool from the package public API. API/worker composition roots may receive a restricted health/migration/test handle; document how B02 will introduce `withExecutionContext` before domain SQL exists.

Add integration tests against a real PostgreSQL 18 container:

- empty database migration;
- repeat/idempotent status;
- checksum mismatch detection;
- concurrent migration lock;
- failed migration behavior using a test-only fixture;
- clean rebuild from zero.

---

# 12. Object-storage and scanner adapter foundations

Create product interfaces and a local/test adapter for:

- object put/get/head/delete-test-object;
- provider version/ETag/checksum metadata;
- bucket/versioning readiness;
- malware-scanner health and scan result envelope.

Local composition may use MinIO and ClamAV or equivalent replaceable tools.

B01 must not implement UploadSession, EvidenceVersion, acceptance, quarantine state machine or parser pipeline.

Add adapter contract tests proving:

- put/get exact bytes;
- head returns size/version/checksum metadata;
- versioning is enabled or the readiness check fails;
- scanner timeout/unavailable is not reported as clean;
- logs do not contain object payload or credentials.

Test objects must use an isolated local/test namespace and be deleted through test teardown without deleting user files or volumes.

---

# 13. Local infrastructure

Create `infra/local/compose.yaml` or equivalent with pinned images for:

- PostgreSQL 18.x;
- S3-compatible local object store;
- bucket/versioning initialization;
- malware scanner;
- optional OTLP collector only if it is required to verify export.

Requirements:

- explicit health checks;
- named local development volumes;
- documented ports;
- non-production credentials in `.env.example` only;
- no host-network mode;
- no privileged containers unless technically unavoidable and documented;
- predictable startup and teardown scripts;
- teardown must not use `git clean` and must not delete unrelated Docker resources.

Create runbook:

- `docs/runbooks/local-development.md`.

---

# 14. Observability bootstrap

Implement vendor-neutral OpenTelemetry bootstrap for API and worker:

- traces, metrics and structured logs;
- OTLP exporter configurable and disabled safely when absent;
- request/process/database readiness metrics with bounded cardinality;
- build/release metadata;
- log redaction hooks;
- no evidence text, object bytes, credentials, URL query tokens, personal data or business values.

Audit/domain/security records are not implemented in B01 and must not be simulated through logs.

Add tests that inspect representative logs/attributes and fail on configured sensitive keys.

---

# 15. Build and container artifacts

Create multi-stage OCI Dockerfiles for:

- API;
- worker;
- internal web static build;
- external web static build.

Requirements:

- non-root runtime user;
- minimal runtime image;
- exact Node base version;
- health checks where applicable;
- no source/test/dev dependencies in runtime image;
- no secrets or `.env` copied into image;
- deterministic build context and `.dockerignore`;
- image labels for commit/build/version;
- local container smoke tests.

Do not create production Kubernetes/Terraform/cloud resources.

---

# 16. CI and supply-chain baseline

Create GitHub Actions workflows or existing-repository equivalent for:

- install with frozen lockfile;
- format check;
- lint;
- typecheck;
- unit tests;
- architecture tests;
- PostgreSQL/object/scanner integration tests;
- application builds;
- Playwright shell smoke/accessibility/RTL tests;
- container builds;
- secret scan;
- dependency vulnerability check;
- CycloneDX or equivalent SBOM generation.

CI must fail closed on test failure. Do not mask failures with `|| true`.

Pin third-party actions to immutable commit SHAs where practical and document update procedure.

Generated reports/artifacts must not be committed unless the repository convention explicitly requires them.

---

# 17. Browser and accessibility tests

Use Playwright across Chromium, Firefox and WebKit for:

- internal shell load;
- external shell load;
- no internal routes/components in external app;
- API health/build display;
- keyboard-only navigation;
- visible focus;
- programmatic loading/error/status;
- English LTR and Arabic RTL shell;
- responsive mobile viewport;
- basic automated accessibility scan.

These tests prove only the foundation shell, not WCAG conformance of future workflows.

---

# 18. Documentation deliverables

Create:

- `README.md` developer quick start;
- `docs/build/B01_VERSION_MANIFEST.md`;
- `docs/build/B01_ARCHITECTURE_STRUCTURE.md`;
- `docs/build/B01_COMMANDS.md`;
- `docs/build/B01_SECURITY_AND_SECRETS.md`;
- `docs/runbooks/local-development.md`;
- `docs/runbooks/migrations.md`;
- `docs/runbooks/observability.md`;
- `docs/build/B01_COMPLETION_EVIDENCE.md` based on the canonical block manifest template.

Document exactly what B01 does **not** establish.

---

# 19. Required root commands

Provide working commands equivalent to:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm architecture:check
pnpm infra:up
pnpm db:migrate
pnpm test:integration
pnpm test:e2e
pnpm build
pnpm containers:build
pnpm sbom
pnpm verify
pnpm infra:down
```

`pnpm verify` must not require production credentials or external paid services.

---

# 20. Acceptance gates

B01 passes only when all are true:

1. a clean checkout on a supported machine can install and run the documented workflow;
2. exact versions and lockfile are committed;
3. all four deployables build and start;
4. API/worker health and build metadata work;
5. internal/external web shells are physically separate;
6. PostgreSQL migrations work from an empty database and detect checksum/concurrency errors;
7. object and scanner adapters pass real local contract tests;
8. architecture boundary negative fixtures prove enforcement;
9. unit/integration/e2e/container/security/SBOM checks pass;
10. no business table, workflow, authentication, P07 or AI implementation exists;
11. no secret or sensitive test data is committed/logged;
12. completion evidence manifest lists exact commands/results and unresolved questions;
13. rollback procedure is tested;
14. independent reviewer reports no unresolved architecture question.

---

# 21. Required hostile scenarios

Test at minimum:

- unsupported Node version;
- missing/invalid environment variable;
- database unavailable at readiness;
- concurrent migration attempts;
- modified applied-migration checksum;
- object versioning disabled;
- object store unavailable;
- scanner timeout/unavailable;
- external browser attempts internal route import/navigation;
- package attempts forbidden cross-boundary import;
- accidental raw DB import from browser/package;
- log message containing configured sensitive key;
- stale generated OpenAPI/build metadata;
- container runs as root;
- CI command failure is not swallowed;
- local teardown preserves unrelated Docker resources and repository files.

---

# 22. Rollback

Because B01 has no business data:

- rollback is repository revert of B01 commits;
- local infrastructure teardown uses documented scoped compose commands;
- local B01 volumes may be removed only through an explicit named command with warning;
- no broad Docker prune and no `git clean -fd`;
- migration test database can be rebuilt from zero;
- record rollback test in completion evidence.

---

# 23. Commit discipline

Use logical commits, for example:

1. workspace/toolchain/configuration;
2. API/worker/web shells;
3. database/object/scanner/local infrastructure;
4. tests/CI/containers/observability;
5. documentation and completion evidence.

Do not mix unrelated cleanup or Phase 1 documentation edits.

---

# 24. Final response from builder

Return:

- concise implementation summary;
- exact commits;
- file/module tree;
- exact version manifest;
- commands run and results;
- acceptance-gate table;
- hostile-test results;
- architecture questions encountered;
- known limitations;
- rollback result;
- link/path to `B01_COMPLETION_EVIDENCE.md`.

Do not claim B02 is unlocked unless the canonical completion manifest is PASS and independently reviewed.