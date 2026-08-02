# Build Prompt B01-P01 — Engineering Foundation & Runtime Skeleton v1.0 Candidate

**Status:** STANDALONE FREEZE CANDIDATE / DO NOT EXECUTE UNTIL PHASE 2 FINAL PASS, FREEZE, EXPLICIT IMPLEMENTATION AUTHORIZATION AND RECORDED V1/V2 SEQUENCING DECISION  
**Block:** B01  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch suggestion:** `build/b01-engineering-foundation`  
**Product code before this prompt:** none

---

# 1. Role and objective

Act as a senior staff engineer implementing only B01 — Engineering Foundation & Runtime Skeleton.

Create a reproducible TypeScript monorepo and four runnable deployable shells with local PostgreSQL/object/scanner infrastructure, CI, observability, SQL-first migrations, architecture/invariant/concurrency validators, security/supply-chain gates and completion evidence.

Do not implement procurement behavior, tenant/business tables, authentication, evidence acceptance, operations, RFQs, supplier workflows, reports, P07 or AI.

If a task requires a new decision about ownership, truth, authority, lifecycle, effect, correction, evidence, reporting, interaction, NFR semantics or AI authority, record an architecture question and stop that portion. Do not invent an answer.

---

# 2. Mandatory sources

Read before editing:

1. `PROJECT_STATE.md`;
2. Phase 1 frozen master specification;
3. `P2_1_PHYSICAL_ARCHITECTURE_V1_0_CANDIDATE.md` or its final frozen successor;
4. `P2_1_INVARIANT_REGISTER_V0_1.md`;
5. `P2_1_FROZEN_CLAUSE_INVARIANT_COVERAGE_MATRIX_V0_1.md`;
6. `P2_2_BUILD_PROGRAM_V1_0_CANDIDATE.md` or its frozen successor;
7. `P2_2_BLOCK_COMPLETION_EVIDENCE_MANIFEST_TEMPLATE_V0_3.md`.

Do not edit Phase 1 frozen artifacts.

---

# 3. Repository and safety rules

- inspect repository before creating files;
- preserve all documentation/history;
- never use `git clean -fd`;
- never use broad Docker/system prune;
- do not delete user/untracked artifacts;
- no force push;
- no secrets, credentials, private keys, local object payloads, browser auth state or `.env` values;
- use `.env.example` with safe local placeholders;
- exact dependency versions and committed lockfile;
- no `latest`, `*`, broad major-only range or unreviewed Git dependency;
- no production cloud resources;
- no generic BPM/workflow/form/event-sourcing/plugin/agent platform;
- no unrelated cleanup or Phase 1 edits.

---

# 4. Version preflight

Before scaffolding:

1. confirm Node.js 24 remains LTS;
2. resolve latest supported security-patched versions inside:
   - Node 24 LTS;
   - Fastify 5.x;
   - React 19.2.x;
   - Vite 8.1.x;
   - TanStack Query 5.x;
   - PostgreSQL 18.x;
   - compatible TypeScript, pnpm, Vitest, Playwright and OpenTelemetry;
3. record exact versions, release/support status and check date in `docs/build/B01_VERSION_MANIFEST.md`;
4. pin exact versions in package manifests, lockfile, runtime/container files and CI;
5. stop if a selected major is unsupported or has an unresolved critical vulnerability—do not silently choose another major.

Use Node 24 LTS rather than Node 26 Current.

---

# 5. Repository structure

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
  invariant-compiler/
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

No procurement/domain module.

---

# 6. Workspace and toolchain

Implement:

- pnpm workspace and exact `packageManager`;
- Node engine constraint;
- TypeScript strict mode/project references/no implicit any;
- shared lint/format/import/unused checks;
- consistent ESM policy;
- package export maps;
- root scripts for build, format, lint, typecheck, unit, architecture, integration, e2e, migrations, containers, SBOM and full verification;
- root `pnpm verify` executing all non-destructive B01 gates deterministically.

---

# 7. Architecture boundaries

Use dependency-cruiser, ESLint boundaries or equivalent executable rules.

Enforce:

- browser apps cannot import API/worker/database/object-store internals;
- external web cannot import internal routes/features;
- apps use public package exports only;
- no cross-package relative source imports;
- no workspace package cycles;
- no package can publicly obtain `pg.Pool`, `pg.Client`, unrestricted Kysely/root query handle;
- database test raw handles are private to test graph;
- `ui-foundation` contains only non-authoritative accessibility/localization/design primitives;
- `contracts` contains technical transport/build/manifest primitives only;
- future domain persistence packages are private by convention and test rule.

Add positive and negative fixture tests proving failures.

---

# 8. API shell

Create Fastify application with:

- explicit composition root;
- request IDs;
- structured logging through observability package;
- startup configuration validation;
- secure headers;
- bounded request/body/time limits;
- configurable trust proxy;
- no business/auth routes;
- no raw DB pool in route handlers.

Endpoints:

- `GET /health/live`;
- `GET /health/ready` with typed component results;
- `GET /meta/build` with non-sensitive release/compatibility metadata;
- `GET /openapi.json` generated as OpenAPI 3.1.

No health endpoint may reveal credentials, internal object keys or stack traces.

---

# 9. Worker shell

Create separate worker process with:

- composition root/logger;
- graceful startup/shutdown;
- process health/readiness;
- empty named lane registry:
  - interactive-nearline;
  - routine-domain;
  - evidence;
  - connector-email;
  - reconciliation;
  - report-export;
  - search.

No job tables, external transmission, product operation or AI.

The lane registry is configuration metadata, not a plugin platform.

---

# 10. Browser shells

Create two separate React/Vite builds.

## Internal

- semantic layout/navigation/main landmarks;
- API/build health page;
- error boundary;
- programmatic loading/status/error primitives;
- locale/direction foundation;
- English/Arabic shell demonstrating RTL;
- no login, tenant selector or domain workflow.

## External

- independent entry, bundle and routes;
- secure-task placeholder revealing no internal data;
- API/build health page;
- same accessibility/RTL foundation;
- no supplier profile/account/network behavior.

`ui-foundation` may contain design tokens, semantic layout/focus/status/error and locale/direction helpers only.

Use TanStack Query only for non-consequential health/build queries with explicit defaults. No server actions or browser domain state.

---

# 11. PostgreSQL and migrations

Use PostgreSQL 18.x.

Create:

- server-only config/connection package;
- local/test pool sizing/timeouts;
- startup connection validation;
- transaction helper accepting explicit READ COMMITTED/REPEATABLE READ/SERIALIZABLE before first SQL;
- no implicit isolation for a registered command call;
- no public raw pool/client;
- test-only explicit retry orchestration with supplied logical identity/pre-effect-safe profile;
- SQL-first migration runner with ordered immutable IDs, checksum, advisory lock, applied timestamp/build, status command, forward-only history and transaction rollback where supported;
- bootstrap migration containing technical migration/release metadata only.

Do not create tenant, project, principal, operation, evidence or procurement tables.

Real PostgreSQL tests:

- empty database migration;
- repeat/idempotent status;
- checksum mismatch;
- concurrent migration lock;
- failed migration fixture;
- clean rebuild from zero;
- requested transaction isolation confirmed by `current_setting('transaction_isolation')`.

---

# 12. Test-only concurrency schema

All concurrency/effective-period/guard fixtures live in `testkit_concurrency`:

- created by test setup, not product migrations;
- dropped by scoped teardown;
- excluded from production migration/status inventory;
- inaccessible to production runtime roles/build graph;
- no tenant/procurement names/semantics;
- no fixture object in production manifests.

---

# 13. Concurrency fixtures

## Write skew

Test-only basis row plus child-consumption rows.

Prove:

- unprotected READ COMMITTED reproduces aggregate write skew as negative control;
- CC-2 `SELECT FOR UPDATE` guard plus recomputation preserves invariant;
- SERIALIZABLE produces typed serialization conflict/retry and preserves invariant;
- tests use bounded timeouts.

## Guard materialization

Prove:

- locking a missing row protects nothing;
- eager guard creation is atomic;
- lazy `INSERT ... ON CONFLICT DO NOTHING` then lock creates one unique guard;
- contributor reads occur after lock.

## Global lock order

Use:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

Prove canonical sorting, duplicate removal, ordered completion and reversed-order negative conflict.

## Effective-period non-overlap

One active test version; two concurrent replacements.

Prove:

- unprotected READ COMMITTED allows overlapping replacements as negative control;
- GiST exclusion/partial unique prevents exact overlap;
- SERIALIZABLE fallback prevents an intentionally inexact predicate overlap;
- boundary semantics and typed result are explicit.

---

# 14. Invariant and manifest compiler foundation

Create versioned machine-readable schemas/types/validators for:

## InvariantRegisterVersion

- register ID/version/status/source identities;
- invariant ID/name/class/source references;
- participating object families;
- owner block/module;
- concurrency sensitivity;
- enforcement/profile;
- hostile tests;
- effective-period disposition;
- activation/supersession.

## FrozenClauseInvariantCoverageVersion

- source clause/requirement ID;
- source artifact/version;
- invariant IDs or explicit non-state disposition;
- owner/proof gate;
- review status.

## ConcurrencyProfileVersion

- isolation;
- invariants;
- mechanism;
- guard relation/key/materialization;
- global lock-order participation;
- constraints;
- retry/max attempts;
- required tests.

## PhysicalWriteOwnershipManifest

- object/schema;
- mutable/read-only;
- owner module;
- runtime lane/role;
- operation handlers;
- invariant/concurrency references;
- effective-period disposition;
- approved transaction contracts;
- migration owner.

## ReleaseCompatibilityManifestVersion

- build/source/images;
- API/browser range;
- schema migration head/phase;
- product-version placeholders;
- payload-reader placeholders;
- in-flight disposition placeholders;
- rollback/drain;
- conformance.

Create one bidirectional compiler accepting source coverage, register, ownership, operations, concurrency profiles, schema catalog and block evidence.

It must fail on:

- missing one of 92 frozen rows;
- invariant without owner/enforcement/test;
- concurrency-sensitive invariant without profile;
- effective-dated object without overlap disposition;
- object/operation missing reverse invariant;
- unknown invariant reference;
- mutable object without exactly one owner;
- incomplete/incompatible release manifest.

B01 validates fixtures only. B02 activates product registers.

---

# 15. Database object security scan

Add machine-readable CI/integration catalog scan failing on unmanifested:

- SECURITY DEFINER;
- `set_config`;
- `SET ROLE`;
- context-mutating functions/triggers/rules/views;
- runtime-created database objects;
- prohibited owner/BYPASSRLS roles.

B01 has no approved context-mutating object.

---

# 16. Exact PostgreSQL type and calculation contract

Pin:

- numeric/decimal to canonical decimal string;
- int8/bigint to canonical integer string at boundary or checked bigint internally;
- no conversion to JavaScript number;
- JSON exact-string serialization;
- parser inventory rejecting lossy overrides.

Real tests cover zero, negative, maximum scale, trailing-zero canonical policy, high precision, values above safe integer and fractional rates.

Create exact-decimal calculation-plan validator with:

- operator sequence;
- input/output precision and scale;
- division intermediate scale;
- rounding mode/point;
- overflow/underflow disposition;
- golden equivalence to a TypeScript exact-decimal reference executor.

No business formula/rounding is implemented in B01.

---

# 17. Object store and scanner adapters

Create product interfaces/local adapters for:

- object put/get/head/delete-test-object;
- provider version/ETag/checksum metadata;
- bucket/versioning readiness;
- scanner health/result envelope.

Local composition may use MinIO and ClamAV or equivalent replaceable tools.

Do not implement UploadSession, EvidenceVersion, acceptance, quarantine state machine or parser pipeline.

Contract tests:

- exact byte round trip;
- head size/version/checksum;
- versioning required;
- scanner timeout/unavailable is not clean;
- no payload/credential logging;
- scoped isolated test namespace/teardown.

---

# 18. Local infrastructure

Pinned compose or equivalent for:

- PostgreSQL 18;
- S3-compatible local store;
- bucket/versioning initializer;
- malware scanner;
- optional OTLP collector if needed for tests.

Requirements:

- health checks;
- named local volumes;
- documented ports;
- safe placeholder credentials;
- no host network;
- no unnecessary privilege;
- scoped startup/teardown;
- no deletion of unrelated Docker resources/files.

Create local-development runbook.

---

# 19. Observability

Vendor-neutral OpenTelemetry for API/worker:

- traces, metrics, structured logs;
- configurable optional OTLP exporter;
- bounded-cardinality readiness/process metrics;
- build/release metadata;
- redaction hooks;
- no evidence/object bytes/credentials/query tokens/personal/business values.

Audit/domain/security records are not simulated through logs.

Add log/attribute sensitive-key tests.

---

# 20. Containers

Multi-stage OCI Dockerfiles for API, worker and both web builds:

- non-root runtime;
- minimal image;
- exact Node base;
- health checks where applicable;
- no source/test/dev dependencies at runtime;
- no secrets/`.env` copied;
- deterministic context/`.dockerignore`;
- commit/build/version labels;
- local smoke tests.

No Kubernetes/Terraform/cloud resources.

---

# 21. CI and supply chain

CI must run:

- frozen install;
- format/lint/typecheck;
- unit/property;
- architecture boundaries;
- invariant/coverage/ownership/concurrency/compatibility validators;
- PostgreSQL concurrency/effective-period/migration/catalog/type tests;
- object/scanner tests;
- builds;
- Playwright shell/accessibility/RTL;
- container builds;
- secret scan;
- dependency vulnerability check;
- CycloneDX/equivalent SBOM.

No failure masking. Pin third-party actions to immutable SHAs where practical and document updates.

---

# 22. Browser tests

Playwright across Chromium, Firefox and WebKit:

- both shells;
- external cannot access internal routes/components;
- API health/build display;
- keyboard/focus;
- loading/error/status semantics;
- English LTR/Arabic RTL;
- mobile viewport;
- basic automated accessibility scan.

Foundation proof only, not full workflow WCAG conformance.

---

# 23. B01 internal checkpoints

## F1
Workspace/toolchain/boundaries.

## F2
API/worker/internal/external shells.

## F3
PostgreSQL/migrations/transaction/concurrency/effective-period/exact-type/invariant/ownership/compatibility/catalog foundations.

## F4
Object/scanner/local infrastructure/observability.

## F5
CI/containers/security/SBOM/docs/rollback/completion evidence.

Each checkpoint records commits/commands/results. Only final B01 PASS unlocks B02.

---

# 24. Documentation

Create:

- root developer README;
- B01 version manifest;
- architecture structure;
- commands;
- security/secrets;
- invariant/compiler foundation;
- local-development/migrations/observability runbooks;
- B01 completion evidence using v0.3 template.

Document exactly what B01 does not establish.

---

# 25. Required commands

Provide working equivalents:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm architecture:check
pnpm manifests:check
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

No production credentials or paid external services.

---

# 26. Acceptance gates

B01 passes only when:

1. clean checkout installs and runs;
2. exact versions/lockfile committed;
3. all four deployables build/start;
4. health/build/OpenAPI work;
5. browser builds physically separate;
6. migrations work and detect checksum/concurrency errors;
7. object/scanner real contract tests pass;
8. dependency/raw-pool negative fixtures pass;
9. invariant/coverage/ownership/concurrency/compatibility positive and negative fixtures pass;
10. exact 92-row fixture detects a missing row;
11. effective-period negative control reproduces overlap and protected strategies prevent it;
12. guard materialization/global order fixtures pass;
13. numeric/int8 exact-boundary and SQL scale/equivalence fixtures pass;
14. catalog scan passes;
15. all unit/integration/e2e/container/security/SBOM gates pass;
16. no business/auth/evidence-acceptance/P07/AI implementation exists;
17. no secret/sensitive test data;
18. F1–F5 evidence complete;
19. rollback executed successfully;
20. independent review reports no unresolved architecture question/invariant candidate;
21. project-owner acceptance recorded.

---

# 27. Hostile scenarios

At minimum:

- unsupported Node version;
- invalid environment;
- DB unavailable;
- concurrent migration/checksum modification;
- isolation fallback;
- unprotected write skew;
- protected guard/SERIALIZABLE;
- missing guard treated as locked;
- inconsistent guard order;
- effective-period overlap;
- frozen row removed;
- invariant no owner/profile;
- missing reverse reference;
- unknown invariant;
- raw pool import;
- numeric/int8 float coercion;
- implicit SQL division scale;
- SECURITY DEFINER/set_config object;
- invalid compatibility manifest accepted;
- fixture schema in product migration inventory;
- object versioning disabled/store unavailable/scanner unavailable;
- external app internal import/route;
- sensitive log value;
- root container;
- CI failure swallowed;
- builder self-certification;
- teardown damages unrelated resources/files.

---

# 28. Independent review

Final B01 requires:

- fresh Independent Build-Conformance Review not authored in the build session and able to return FAIL;
- architecture/conformance review;
- recorded database/security competence;
- review method, identity, evidence and date;
- project-owner acceptance.

---

# 29. Rollback

Because B01 has no business data:

- rollback is repository revert of B01 commits;
- teardown uses scoped compose commands;
- volume removal only through explicit warned command;
- never `git clean -fd`;
- never broad Docker/system prune;
- preserve unrelated containers/volumes/repository files/user artifacts;
- migration test DB rebuilds from zero;
- rollback test/result recorded.

---

# 30. Commit discipline

Suggested logical commits:

1. F1 workspace/toolchain;
2. F2 runtime/browser shells;
3. F3 DB/concurrency/invariant/manifest foundations;
4. F4 adapters/local infra/observability;
5. F5 tests/CI/containers/security/docs/evidence.

Do not mix unrelated changes.

---

# 31. Builder final response

Return:

- concise implementation summary;
- exact commits and tree;
- version manifest;
- F1–F5 results;
- commands/results/artifacts;
- acceptance table;
- hostile scenarios;
- invariant/compiler counts and failures tested;
- architecture questions/new invariant candidates;
- limitations;
- rollback result;
- completion-evidence path.

Do not claim B02 unlock unless the canonical final B01 manifest is PASS, independently reviewed and accepted.