# B01 Engineering Foundation Architecture

**Status:** implementation candidate / final independent review pending  
**Business semantics:** none

## Deployables

| Deployable | Purpose | Port | Business authority |
|---|---|---:|---|
| `apps/api` | Technical health, readiness, build metadata and OpenAPI shell | 3001 | None |
| `apps/worker` | Empty named-lane runtime and lifecycle shell | n/a | None |
| `apps/web-internal` | Internal technical browser shell | 3000 dev / 8080 image | None |
| `apps/web-external` | Physically separate external technical shell | 3003 dev / 8080 image | None |

The internal and external applications have separate entry points, Vite builds and OCI images. They share only non-authoritative UI primitives.

## Foundation packages

- `@cpos/contracts` — technical transport/build/readiness types only.
- `@cpos/config` — bounded environment parsing; no secret retrieval or domain configuration.
- `@cpos/database-core` — private PostgreSQL pool, explicit-isolation transaction helper, migrations, exact type handling and catalog scan. Its public runtime exposes no raw query handle.
- `@cpos/invariant-compiler` — B01 fixture compiler for the 92 frozen-source rows, 102 invariant families, ownership, concurrency, effective-period and compatibility manifests. B02 activates product registers.
- `@cpos/object-store` — versioned object and malware-scanner technical contracts. It does not create evidence acceptance or quarantine semantics.
- `@cpos/observability` — redacted structured technical logs and optional OTLP traces/metrics. It is not audit or domain truth.
- `@cpos/ui-foundation` — semantic shell, focus/status, localization and RTL primitives.
- `@cpos/tooling-config` — immutable workspace policy constants.

## Physical boundaries

Executable checks prohibit:

- browser imports of database/server object-store capabilities;
- raw `pg`, Kysely or database client imports outside the private database/test graph;
- cross-package relative imports;
- package `/src/` imports outside the same-package private test graph;
- external web imports of internal web code;
- a public database query/root client surface.

## Infrastructure

The local `cpos-b01` Compose project contains:

- PostgreSQL 18.4;
- SeaweedFS 4.40 as a replaceable S3-compatible test substrate;
- ClamAV 1.5.3;
- OpenTelemetry Collector 0.157.0.

These are development and proof substrates, not production provider selections.

## Data boundary

The sole committed migration creates technical migration/release metadata. B01 contains no tenant, project, principal, authentication, evidence, supplier, RFQ, approval, commitment, report, P07 or AI table.

Concurrency and effective-period schemas are test-only, created in isolated temporary schemas and excluded from product migrations and runtime roles.

## Release boundary

Four exact Node 24.18.0 multi-stage OCI images are built:

- `cpos-b01-api`;
- `cpos-b01-worker`;
- `cpos-b01-web-internal`;
- `cpos-b01-web-external`.

All runtime images use UID/GID `10001`, contain production/runtime output only, carry OCI build/release/source labels and have technical health checks.
