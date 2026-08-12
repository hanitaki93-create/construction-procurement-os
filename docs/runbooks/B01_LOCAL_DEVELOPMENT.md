# B01 Local Development Runbook

**Scope:** technical foundation only  
**Local project:** `cpos-b01`  
**Product/business data:** none

## Prerequisites

- Node.js `24.18.0`;
- pnpm `10.34.0` through Corepack;
- Docker with Compose v2;
- free local ports `3001`, `4318`, `5432`, `8333`, `9333`, `13133`, `3310`.

Copy `.env.example` to a local ignored `.env` only when needed. Never commit real credentials.

## Clean setup

```bash
corepack enable
corepack prepare pnpm@10.34.0 --activate
pnpm install --frozen-lockfile
pnpm infra:up
pnpm db:migrate
pnpm build
```

`pnpm infra:up` starts only the scoped Compose project `cpos-b01` and waits for:

- PostgreSQL readiness;
- the local S3-compatible endpoint;
- ClamAV `PONG`;
- OpenTelemetry Collector health.

## Run technical shells

Terminal 1:

```bash
pnpm start:api
```

Terminal 2:

```bash
pnpm start:worker
```

Internal and external browser shells remain separate Vite applications and may be started through their workspace packages during development.

## Verification

```bash
pnpm verify
pnpm db:integration
pnpm object:integration
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 pnpm telemetry:smoke
```

Expected B01 boundaries:

- no tenant/business/authentication tables;
- no product operations;
- no accepted evidence state;
- no procurement workflow;
- no P07 or AI;
- telemetry is technical only and never audit/domain truth.

## Status and ordinary teardown

```bash
pnpm infra:status
pnpm infra:down
```

`infra:down` removes only the `cpos-b01` containers and network. It preserves named volumes.

## Explicit destructive local reset

```bash
CPOS_CONFIRM_DESTROY=YES pnpm infra:destroy
```

This removes only volumes owned by the Compose project `cpos-b01`. It must never run as part of ordinary CI teardown or automatic rollback.

Never use:

- `git clean -fd`;
- broad `docker system prune`;
- broad `docker volume prune`;
- deletion of unrelated containers, volumes or repository files.

## Failure interpretation

- Object-store endpoint reachable but bucket versioning absent: **FAIL**, not degraded success.
- ClamAV unavailable or timed out: **UNAVAILABLE/TIMEOUT**, never `CLEAN`.
- OTLP Collector unavailable: application technical work remains possible, but telemetry export is explicitly unavailable; logs do not replace domain/audit records.
- PostgreSQL unavailable: database readiness fails; no in-memory substitute certifies B01 database behavior.
