# Construction Procurement OS

Canonical system of record for research, frozen architecture, build decomposition, implementation, validation and operational history.

## Core rule

**Never guess where project truth lives.**

Every load-bearing artifact has a stable path, identity, lifecycle/status, upstream/downstream traceability and explicit freeze/change rules.

Always start with [`PROJECT_STATE.md`](PROJECT_STATE.md).

## Current position

- Phase 1 deterministic architecture: **PASS / CLOSED / FROZEN**.
- Phase 2 physical architecture and 18-block build program: **PASS / CLOSED / FROZEN**.
- Active implementation: **B01 — Engineering Foundation & Runtime Skeleton** on branch `build/b01-engineering-foundation` and draft PR #1.
- B01 checkpoints F1–F4: **PASS**.
- B01 F5: release/security/browser/rollback evidence in progress.
- B02 and all procurement/product semantics: **LOCKED** pending B01 final independent PASS plus V1/V2 validation gates.
- P07: V4 locked. AI: V6 locked.

## What B01 contains

B01 is real code, but deliberately business-empty:

- strict TypeScript/pnpm monorepo;
- Fastify API and worker shells;
- separate internal and external React/Vite applications;
- PostgreSQL migrations, exact types and hostile concurrency fixtures;
- invariant/coverage/ownership/concurrency/compatibility compiler foundation;
- versioned S3-compatible object adapter and malware scanner contract;
- structured logs and optional OpenTelemetry;
- local containers, OCI images, CI and verification tooling.

B01 does **not** contain tenants, authentication, RFQs, suppliers, quotations, comparison, approvals, awards, commitments, reports, P07 or AI.

## Developer start

Prerequisites: Node `24.18.0`, pnpm `10.34.0`, Docker Compose v2.

```bash
corepack enable
corepack prepare pnpm@10.34.0 --activate
pnpm install --frozen-lockfile
pnpm verify
pnpm infra:up
pnpm db:migrate
```

Technical shell commands:

```bash
pnpm start:api
pnpm start:worker
pnpm test:e2e
pnpm containers:build
pnpm containers:smoke
pnpm security:secrets
pnpm security:dependencies
pnpm sbom
pnpm security:containers
pnpm infra:down
```

See:

- [`docs/build/B01_ARCHITECTURE.md`](docs/build/B01_ARCHITECTURE.md)
- [`docs/build/B01_INVARIANT_COMPILER.md`](docs/build/B01_INVARIANT_COMPILER.md)
- [`docs/runbooks/B01_LOCAL_DEVELOPMENT.md`](docs/runbooks/B01_LOCAL_DEVELOPMENT.md)
- [`docs/runbooks/B01_MIGRATIONS.md`](docs/runbooks/B01_MIGRATIONS.md)
- [`docs/runbooks/B01_OBSERVABILITY.md`](docs/runbooks/B01_OBSERVABILITY.md)
- [`docs/runbooks/B01_SECURITY_AND_SECRETS.md`](docs/runbooks/B01_SECURITY_AND_SECRETS.md)

## Repository layers

1. `00_governance/` — project rules, freeze/change control, traceability and failure policy.
2. `01_roadmaps/` — frozen roadmaps and approved replacements.
3. `02_research/` — sources, evidence, assumptions and validation research.
4. `03_architecture/` — accepted ADRs, requirements and deterministic design.
5. `04_phases/` — phase execution, checkpoints, audits, outputs and freezes.
6. `05_build/` — build graph, work units, gates and exact executed prompts.
7. `apps/`, `packages/`, `infra/`, `migrations/`, `tests/` — actual implementation beginning with B01.
8. `07_quality/` — golden threads, test plans/results, performance and security evidence.
9. `08_operations/` — deployments, runbooks, incidents, migrations and recovery.
10. `09_history/` — superseded artifacts, change history and releases.

## Truth versus execution

Frozen requirements and architecture are truth artifacts. Prompts, code, migrations and tests are execution artifacts. Implementation may reveal a new question, but it may not silently rewrite frozen meaning because the code is inconvenient.
