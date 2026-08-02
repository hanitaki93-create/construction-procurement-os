# B01 Version Manifest

**Checked:** 2026-08-02  
**Block:** B01 — Engineering Foundation & Runtime Skeleton  
**Status:** F1 PRE-FLIGHT COMPLETE / CI COMPATIBILITY PROOF PENDING

## Selection rules

- Exact versions only; no `latest`, caret, tilde or wildcard ranges.
- Node 24 LTS remains the runtime line. Node 26 is Current and is not selected.
- A newer major is not adopted until the complete selected toolchain proves compatibility.
- Packages published less than the workspace release-age threshold are not selected merely because they are newest.
- The lockfile and GitHub Actions install are the executable compatibility proof.

## Runtime and data platform

| Component  |  Selected | Evidence / disposition                                                                                                                                  |
| ---------- | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js    | `24.18.0` | Latest verified Node 24 LTS release line at pre-flight; Node 26 remains Current.                                                                        |
| pnpm       | `10.34.0` | Latest mature 10.x line. pnpm 11 is deferred until its early security/configuration regressions are cleared and the workspace is migrated deliberately. |
| PostgreSQL |    `18.4` | Current supported PostgreSQL 18 patch and security release.                                                                                             |

## Application framework

| Component              |  Selected | Evidence / disposition                  |
| ---------------------- | --------: | --------------------------------------- |
| Fastify                |  `5.10.0` | Current Fastify v5 release.             |
| React                  |  `19.2.8` | Current React 19.2 patch at pre-flight. |
| React DOM              |  `19.2.8` | Kept exactly aligned with React.        |
| Vite                   |   `8.1.5` | Current supported Vite 8.1 patch.       |
| `@vitejs/plugin-react` |   `6.0.4` | Current compatible React plugin line.   |
| TanStack React Query   | `5.101.4` | Current v5 patch; queries only in B01.  |

## Language and quality tooling

| Component           |  Selected | Evidence / disposition                                                                                                         |
| ------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------ |
| TypeScript          |   `6.0.3` | Selected compatibility line. TypeScript 7 is deferred until `typescript-eslint` and all build tools prove support together.    |
| ESLint              |  `9.39.5` | Maintenance release selected because stable `typescript-eslint` support for ESLint 10 is not assumed.                          |
| `typescript-eslint` |  `8.65.0` | Current stable line used with ESLint 9 and TypeScript 6.                                                                       |
| Prettier            |   `3.9.6` | Current stable patch after release-age threshold.                                                                              |
| Vitest              |  `4.1.10` | Current stable v4 patch.                                                                                                       |
| Playwright Test     |  `1.61.1` | Mature current patch selected; `1.62.0` was published during pre-flight and is held until it clears the release-age threshold. |
| `@types/node`       | `24.13.3` | Node 24 type line.                                                                                                             |
| `@types/react`      | `19.2.17` | Current React 19.2 type line.                                                                                                  |
| `@types/react-dom`  |  `19.2.3` | Current React DOM 19.2 type line.                                                                                              |

## Observability

| Component                                 |  Selected | Evidence / disposition                  |
| ----------------------------------------- | --------: | --------------------------------------- |
| `@opentelemetry/api`                      |   `1.9.0` | Stable API line.                        |
| `@opentelemetry/sdk-node`                 | `0.221.0` | Current Node SDK package at pre-flight. |
| `@opentelemetry/exporter-trace-otlp-http` | `0.221.0` | Exact matching OTLP trace exporter.     |

## Primary verification sources

- Node.js release and previous-release pages.
- PostgreSQL 18.4 release notes and supported-version policy.
- React versions and npm package records.
- Fastify v5 documentation and npm package record.
- Vite release/support page and npm package record.
- Official npm records for TanStack Query, Vitest, Playwright, pnpm, ESLint, Prettier, types and OpenTelemetry.

## Stop conditions

B01 must stop and issue an architecture/build question rather than silently changing a major family when:

- Node 24 or PostgreSQL 18 is unsupported;
- a selected package has an unresolved critical vulnerability;
- the exact dependency graph cannot resolve under strict peers;
- TypeScript/ESLint/Vite/React compatibility requires a major-family change;
- an installation requires disabling integrity, peer or lockfile controls.
