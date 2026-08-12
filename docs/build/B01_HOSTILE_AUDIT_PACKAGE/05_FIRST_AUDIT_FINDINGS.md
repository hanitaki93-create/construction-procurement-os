# B01 First Independent Audit Findings

**Audit date:** 2026-08-03  
**Auditor:** Claude  
**Audit target:** `1344a64454154bc624197b2a885bad9f8da9dafc`  
**Archive:** `B01_AUDIT_SHARE_PACKAGE.zip`  
**Overall verdict:** FAIL  
**Disposition:** Accepted for remediation; B02 remained locked.

## Blocking finding BF-01

The database public-surface check was a source-text denylist. It did not enforce the complete approved export contract and could be bypassed by adding:

```ts
export { createPrivatePool } from './internal/pool.js';
```

The checker returned PASS because its regular expression looked for exact forbidden names such as `Pool`, not the effective exported type or symbol graph.

Required remediation:

1. enforce an exact approved export set;
2. reject approved names whose declarations resolve transitively to `pg.Pool`, `pg.PoolClient`, `pg.Client`, Kysely or private transaction handles;
3. add hostile negative fixtures proving renamed raw-handle exports are rejected.

## Blocking finding BF-02

The supplied ZIP omitted dotfiles, including:

- `.github/workflows/`;
- `.node-version`;
- `.gitignore`;
- `.dockerignore`;
- `.env.example`.

The repository snapshot was created with `git archive`, but the GitHub artifact upload used the default hidden-file exclusion. This prevented audit of workflow, root-manifest, secret-scan, SBOM and dependency-audit evidence.

Required remediation:

- generate a new archive from the pinned implementation commit;
- upload it with hidden-file inclusion enabled;
- verify required hidden paths before publishing the package.

## Non-blocking observations

- `tests/architecture/` contains a README rather than a thin executable forwarding test. The real architecture tests are executable under `scripts/lib/`; no correction was required.
- `release_metadata` is unqualified by a module schema. This is intentionally deferred until B02 establishes module schemas and does not create product or tenant authority in B01.

## Architecture and invariant disposition

The auditor reported no unresolved architecture question and no new invariant candidate. BF-01 was a defective enforcement of an already registered boundary, not a new architectural requirement.

## Re-audit scope requested by the auditor

- BF-01 and its negative-control integrity;
- OCI and supply-chain evidence;
- reproducibility and rollback evidence;
- CI evidence quality;
- confirmation that the replacement archive contains dotfiles and workflows.
