# B01 Audit Remediation 01

**Status:** Implemented and independently re-audit pending  
**First-audit target:** `1344a64454154bc624197b2a885bad9f8da9dafc`  
**Remediated implementation target:** `3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`  
**B02:** Locked

## BF-01 remediation — database public-surface enforcement

The regex denylist was removed from the executable checker.

### Current enforcement

- `scripts/check-database-public-surface.mjs` delegates to a reusable typed inspector.
- `scripts/lib/database-public-surface.mjs` enforces an exact approved symbol set.
- Each approved symbol must retain its expected declaration kind: local function, local interface, local type alias or type-only re-export.
- The TypeScript checker follows repository-owned public type graphs and rejects exposed `pg` client/pool types, Kysely roots and private transaction handles.
- Traversal follows generic type arguments but does not recursively enumerate standard-library implementation graphs.

### Approved B01 database exports

- `createDatabaseRuntime`;
- `DatabaseRuntime`;
- `DatabaseRuntimeOptions`;
- `DatabaseHealth`;
- `CatalogFinding`;
- `CatalogFindingKind`;
- `AppliedMigration`;
- `MigrationFile`;
- `MigrationResult`;
- `MigrationStatus`.

Any addition, deletion, rename or declaration-kind substitution fails the architecture gate.

### Hostile fixtures added

`scripts/lib/database-public-surface.test.mjs` now proves rejection of:

1. a renamed raw factory export: `createPrivatePool`;
2. a forbidden `Pool` type hidden behind the approved `DatabaseRuntimeOptions` name;
3. an unrestricted public `query` method.

The compliant current surface is also checked against the complete approved set.

### Implementation note

An initial typed traversal enumerated external standard-library object graphs and exhausted the CI heap. That approach was rejected. The final inspector traverses only repository-owned declarations while still following type arguments and checking external forbidden symbols. The final clean workflows passed without increased heap configuration.

## BF-02 remediation — complete archive evidence

The prior omission was caused by GitHub `upload-artifact` excluding hidden files by default, not by `git archive`.

The replacement exporter:

- creates the implementation snapshot with `git archive` at the exact remediated implementation target;
- verifies `.node-version`, `.github/workflows`, `.gitignore`, `.dockerignore` and `.env.example` exist in the assembled package;
- uploads with `include-hidden-files: true`;
- creates `SHA256SUMS.txt` over every packaged file;
- records the implementation SHA separately.

## Authoritative remediation workflow evidence

All authoritative workflows passed on exact implementation target `3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`.

| Lane | Run | Job | Result |
| --- | ---: | ---: | --- |
| Complete Node 24 workspace verification | `30803479916` | `91653347445` | PASS |
| PostgreSQL 18.4 hostile regression | `30803479389` | `91653323808` | PASS |
| Object, scanner and OTLP regression | `30803479929` | `91653336380` | PASS |
| Browser matrix | `30803479965` | `91653357204` | PASS |
| OCI, security, SBOM and vulnerability proof | `30803479965` | `91653357153` | PASS |
| Scoped rollback proof | `30803479965` | `91653357224` | PASS |

## Re-audit decision boundary

The remediation is a freeze candidate only. The first FAIL is not erased. The independent reviewer must explicitly disposition BF-01 and BF-02 against the replacement package. Project-owner acceptance remains separate, PR #1 remains draft and B02 remains locked.
