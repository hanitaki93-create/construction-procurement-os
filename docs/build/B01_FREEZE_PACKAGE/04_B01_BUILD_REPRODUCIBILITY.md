# B01 Build Reproducibility

**Version:** 1.0  
**Status:** Freeze candidate  
**Target commit:** `1344a64454154bc624197b2a885bad9f8da9dafc`

## Required environment

- Git
- Node.js `24.18.0`
- Corepack only for activating pnpm during development/CI setup
- pnpm `10.34.0`
- Docker with Compose support

## Clean verification

```bash
git clone <repository-url> construction-procurement-os
cd construction-procurement-os
git checkout 1344a64454154bc624197b2a885bad9f8da9dafc
corepack prepare pnpm@10.34.0 --activate
pnpm install --frozen-lockfile
pnpm verify
```

## Real-service lanes

Run the committed GitHub Actions workflows or execute their checked-in commands in equivalent clean infrastructure for:

- PostgreSQL 18.4 hostile regression;
- object-store, ClamAV and OTLP regression;
- browser matrix;
- OCI build and runtime smoke;
- secret/dependency/SBOM/vulnerability gates;
- scoped rollback proof.

## Expected result

All commands must exit zero without modifying the lockfile or relaxing peer, integrity, security, browser, database or rollback controls.

## Reproducibility failure

The audit must report FAIL when the target commit cannot be installed and verified from a clean checkout using the exact versions, unless the failure is proven to be an unavailable external registry/service rather than repository drift. Any exception must include command output and a reproducible cause.
