# B01 Version Manifest

**Checked:** 2026-08-02  
**Block:** B01 — Engineering Foundation & Runtime Skeleton  
**Status:** F1–F5 IMPLEMENTATION VERIFIED / INDEPENDENT REVIEW PENDING

## Selection rules

- Exact versions only; no `latest`, caret, tilde or wildcard ranges.
- Node 24 LTS remains the runtime line. Node 26 is Current and is not selected.
- A newer major is not adopted until the complete selected toolchain proves compatibility.
- Packages published less than the workspace release-age threshold are not selected merely because they are newest.
- The lockfile and GitHub Actions install are the executable compatibility proof.
- Local services are replaceable contract-test substrates, not production provider commitments.

## Runtime and data platform

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| Node.js | `24.18.0` | Exact build, CI and OCI runtime line. |
| pnpm | `10.34.0` | Exact workspace/build line; absent from runtime images. |
| PostgreSQL | `18.4` | Real-service migration, exact-type, concurrency and catalog proof. |

## Application framework

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| Fastify | `5.10.0` | API technical shell and process/container smoke. |
| React | `19.2.8` | Internal and external technical shells. |
| React DOM | `19.2.8` | Exactly aligned with React. |
| Vite | `8.1.5` | Separate production builds and real E2E servers. |
| `@vitejs/plugin-react` | `6.0.4` | Exact React/Vite integration line. |
| TanStack React Query | `5.101.4` | Query-only use in B01; no product mutations. |

## Language and quality tooling

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| TypeScript | `6.0.3` | Strict production/test/tooling graphs. |
| ESLint | `9.39.5` | Exact flat-config line. |
| `typescript-eslint` | `8.65.0` | Exact TypeScript/ESLint compatibility line. |
| Prettier | `3.9.6` | Deterministic source formatting. |
| Vitest | `4.1.10` | Unit and real-service integration tests. |
| Playwright Test | `1.61.1` | Chromium, Firefox, WebKit and mobile proof. |
| `playwright-core` | `1.61.1` | Exact peer required by Playwright/axe and OCI deploy graph. |
| `@types/node` | `24.13.3` | Node 24 type line. |
| `@types/react` | `19.2.17` | React 19.2 type line. |
| `@types/react-dom` | `19.2.3` | React DOM 19.2 type line. |

## Database and calculation libraries

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| `pg` | `8.22.0` | Private database-core dependency; real PostgreSQL proof. |
| `@types/pg` | `8.20.0` | Matching type line. |
| Kysely | `0.29.4` | Private database-core dependency; no public raw query handle. |
| Decimal.js | `10.6.0` | Isolated 120-significant-digit product calculation context. |

## Object storage and file scanning

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| `@aws-sdk/client-s3` | `3.1015.0` | Versioned-object exact-byte contract. |
| SeaweedFS local image | `chrislusf/seaweedfs:4.40` | Replaceable local S3/versioning proof substrate. |
| ClamAV local image | `clamav/clamav:1.5.3` | Real INSTREAM clean/infected/unavailable/timeout proof. |

## Observability

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| `@opentelemetry/api` | `1.9.0` | Stable API line. |
| `@opentelemetry/sdk-node` | `0.221.0` | Node 24-compatible SDK line. |
| `@opentelemetry/sdk-metrics` | `2.9.0` | Exact metrics SDK line used by Node SDK. |
| `@opentelemetry/exporter-trace-otlp-http` | `0.221.0` | Exact OTLP HTTP trace exporter. |
| `@opentelemetry/exporter-metrics-otlp-http` | `0.221.0` | Exact OTLP HTTP metric exporter. |
| OTel Collector local image | `otel/opentelemetry-collector-contrib:0.157.0` | Replaceable local OTLP receiver/debug proof. |

## Release and security tooling

| Component | Selected | Evidence / disposition |
| --- | ---: | --- |
| Gitleaks image | `zricethezav/gitleaks:v8.30.1` | Repository no-git redacted secret scan. |
| Syft image | `anchore/syft:v1.44.0` | Source and four-image CycloneDX SBOMs. |
| Trivy image | `aquasec/trivy:0.70.0` | Fixed high/critical runtime-image rejection. |
| Node OCI base | `node:24.18.0-bookworm-slim` | Exact runtime base; package managers removed from final images. |

## Final exact-head compatibility proof

All authoritative workflows passed on implementation commit:

`1344a64454154bc624197b2a885bad9f8da9dafc`

- workspace verification run `30764286699`: PASS;
- PostgreSQL 18.4 run `30764286728`: PASS;
- object/scanner/OTLP run `30764286725`: PASS;
- browser/OCI/security/SBOM/rollback run `30764286720`: PASS.

## Primary verification sources

Version selection was originally checked against official runtime, database, framework, package, image and OpenTelemetry release records. The committed exact manifests, lockfile, clean-room CI, real-service tests, OCI builds and vulnerability scans are the executable compatibility proof for B01.

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

No such unresolved stop condition remains in the implementation evidence. Independent conformance review and project-owner acceptance remain separate final gates.
