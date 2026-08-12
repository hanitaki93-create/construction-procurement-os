# B01 Targeted Independent Re-audit Prompt

Audit the replacement package for repository `hanitaki93-create/construction-procurement-os`, PR #1, branch `build/b01-engineering-foundation`, against exact remediated implementation commit:

`3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`

The first independent audit returned FAIL with two blockers. Read, in order:

1. `05_FIRST_AUDIT_FINDINGS.md`;
2. `06_AUDIT_REMEDIATION_01.md`;
3. the implementation snapshot;
4. the freeze and supporting evidence documents.

Do not treat the remediation record or green CI as proof. Reproduce or independently falsify the remediation.

## Required package-completeness confirmation

Before reviewing code, confirm the implementation snapshot contains at least:

- `.node-version`;
- `.github/workflows/`;
- `.gitignore`;
- `.dockerignore`;
- `.env.example`;
- all source, tests, scripts, manifests, lockfile, Dockerfiles, Compose files and migrations.

Report the exact result of a hidden-entry check such as:

```bash
find 01_IMPLEMENTATION_SNAPSHOT -name '.*' -print
```

If required dotfiles are absent, BF-02 remains open and the verdict must be FAIL.

## BF-01 mandatory re-audit

Inspect:

- `scripts/check-database-public-surface.mjs`;
- `scripts/lib/database-public-surface.mjs`;
- `scripts/lib/database-public-surface.test.mjs`;
- `packages/database-core/src/public.ts`;
- `packages/database-core/package.json`.

Attempt to bypass the guard using at least:

1. `export { createPrivatePool } from './internal/pool.js';`;
2. aliasing a raw factory to an approved export name;
3. exposing `Pool`, `PoolClient`, `Client` or Kysely behind an approved type name;
4. adding an unrestricted query method;
5. adding an unexpected but innocently named export.

Confirm failures occur because of the intended exact-symbol, declaration-shape or type-graph rule, not because the mutation creates unrelated syntax or type errors.

Recommended commands:

```bash
node scripts/check-database-public-surface.mjs
node --test scripts/lib/database-public-surface.test.mjs
pnpm architecture:check
pnpm verify
```

BF-01 may close only if the exact public contract is enforced and the hostile negative fixtures genuinely fail for their intended reasons.

## BF-02 and previously unassessable sections

Re-audit:

- OCI and supply-chain controls;
- root manifest and exact-version controls;
- workflow pinning and failure propagation;
- Gitleaks configuration and redacted diagnostics;
- dependency-audit threshold;
- source and image SBOM generation/count;
- high/critical fixed-vulnerability rejection;
- repository rollback and scoped infrastructure teardown.

Inspect the actual `.github/workflows/` files and supporting scripts. Do not rely only on cited run IDs.

## Scope of re-audit

The auditor may rely on the first audit's PASS sections unless the remediation or replacement archive introduces evidence that contradicts them. Any newly discovered correctness, architecture, security, reproducibility or evidence-integrity blocker must still be reported.

## Required response

Use `03_AUDIT_RESPONSE_TEMPLATE.md` and explicitly include:

- BF-01: CLOSED or OPEN, with reproduction evidence;
- BF-02: CLOSED or OPEN, with archive-completeness evidence;
- OCI and supply chain: PASS or FAIL;
- reproducibility and rollback: PASS or FAIL;
- CI evidence quality: PASS or FAIL;
- unresolved architecture questions or invariant candidates;
- one overall verdict: `PASS`, `MINOR PASS` or `FAIL`.

Do not merge, modify the repository, unlock B02 or infer project-owner acceptance.
