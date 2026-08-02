# B01 Version Manifest

**Checked:** 2026-08-02  
**Block:** B01 — Engineering Foundation & Runtime Skeleton  
**Status:** F1–F3 VERIFIED / F4 CLEAN-ROOM PROOF PENDING

## Selection rules

- Exact versions only; no `latest`, caret, tilde or wildcard ranges.
- Node 24 LTS remains the runtime line. Node 26 is Current and is not selected.
- A newer major is not adopted until the complete selected toolchain proves compatibility.
- Packages published less than the workspace release-age threshold are not selected merely because they are newest.
- The lockfile and GitHub Actions install are the executable compatibility proof.
- Local services are replaceable contract-test substrates, not production provider commitments.

## Runtime and data platform

| Component  | Selected | Evidence / disposition |
| ---------- | -------: | ---------------------- |
| Node.js    | `24.18.0` | Verified Node 24 LTS release line; Node 26 remains Current. |
| pnpm       | `10.34.0` | Mature 10.x line. pnpm 11 remains a deliberate future migration. |
| PostgreSQL | `18.4` | Supported PostgreSQL 18 patch and F3 real-service proof. |

## Application framework

| Component              | Selected | Evidence / disposition |
| ---------------------- | -------: | ---------------------- |
| Fastify                | `5.10.0` | Verified Fastify v5 release. |
| React                  | `19.2.8` | Verified React 19.2 patch. |
| React DOM              | `19.2.8` | Exactly aligned with React. |
| Vite                   | `8.1.5` | Supported Vite 8.1 patch. |
| `@vitejs/plugin-react` | `6.0.4` | Compatible React plugin line. |
| TanStack React Query   | `5.101.4` | Queries only in B01; consequential mutations absent. |

## Language and quality tooling

| Component           | Selected | Evidence / disposition |
| ------------------- | -------: | ---------------------- |
| TypeScript          | `6.0.3` | Selected compatibility line; strict compiler remains enabled. |
| ESLint              | `9.39.5` | Stable line paired with `typescript-eslint`. |
| `typescript-eslint` | `8.65.0` | Verified with ESLint 9 and TypeScript 6. |
| Prettier            | `3.9.6` | Exact formatting line. |
| Vitest              | `4.1.10` | Exact unit/integration line. |
| Playwright Test     | `1.61.1` | Held mature patch for F5 browser proof. |
| `@types/node`       | `24.13.3` | Node 24 type line. |
| `@types/react`      | `19.2.17` | React 19.2 type line. |
| `@types/react-dom`  | `19.2.3` | React DOM 19.2 type line. |

## Database and calculation libraries

| Component   | Selected | Evidence / disposition |
| ----------- | -------: | ---------------------- |
| `pg`        | `8.22.0` | F3 exact-type, isolation and migration proof. |
| `@types/pg` | `8.20.0` | Matching type line. |
| Kysely      | `0.29.4` | Private database-core dependency; no public root query handle. |
| Decimal.js  | `10.6.0` | Isolated 120-significant-digit product calculation context. |

## Object storage and file scanning

| Component | Selected | Evidence / disposition |
| --------- | -------: | ---------------------- |
| `@aws-sdk/client-s3` | `3.1015.0` | Mature release-age-qualified S3 contract client; newer publication is not adopted automatically. |
| SeaweedFS local image | `chrislusf/seaweedfs:4.40` | Active S3-compatible local test substrate with versioning support; not a production provider decision. |
| ClamAV local image | `clamav/clamav:1.5.3` | Official scanner image used only for real INSTREAM contract proof. |

## Observability

| Component | Selected | Evidence / disposition |
| --------- | -------: | ---------------------- |
| `@opentelemetry/api` | `1.9.0` | Stable API line. |
| `@opentelemetry/sdk-node` | `0.221.0` | Node 24-compatible SDK line. |
| `@opentelemetry/sdk-metrics` | `2.9.0` | Matching stable metrics SDK used by Node SDK. |
| `@opentelemetry/exporter-trace-otlp-http` | `0.221.0` | Exact OTLP HTTP trace exporter line. |
| `@opentelemetry/exporter-metrics-otlp-http` | `0.221.0` | Exact OTLP HTTP metric exporter line. |
| OTel Collector local image | `otel/opentelemetry-collector-contrib:0.157.0` | Local OTLP receiver/debug exporter; no vendor lock-in or audit authority. |

## Primary verification sources

- Node.js release and previous-release pages.
- PostgreSQL 18.4 release notes and supported-version policy.
- React, Fastify and Vite official release/package records.
- Official npm records for workspace and OpenTelemetry packages.
- SeaweedFS official release and S3/versioning documentation.
- ClamAV official release and container-image documentation.
- OpenTelemetry Collector official release record.

## Stop conditions

B01 must stop and issue an architecture/build question rather than silently changing a major family when:

- Node 24 or PostgreSQL 18 is unsupported;
- a selected package or image has an unresolved critical vulnerability;
- the exact dependency graph cannot resolve under strict peers;
- TypeScript/ESLint/Vite/React compatibility requires a major-family change;
- an installation requires disabling integrity, peer or lockfile controls;
- the local S3 substrate cannot prove immutable version IDs and exact-byte retrieval;
- scanner timeout/unavailability cannot remain distinct from a clean verdict;
- telemetry requires sensitive/high-cardinality business data or becomes an audit substitute.
