# B01 Verification Matrix

**Version:** 1.0  
**Status:** Builder verification complete; independent audit pending  
**Implementation evidence commit:** `1344a64454154bc624197b2a885bad9f8da9dafc`

| Requirement area | Verification mechanism | Evidence | Builder result |
| --- | --- | --- | --- |
| Exact workspace and toolchain | Frozen lockfile, root manifest gate, clean Node 24 runner | Run `30764286699` | PASS |
| Type, lint, format and test graphs | Root `verify` and workspace references | Run `30764286699` | PASS |
| Package boundaries | Executable architecture and public-surface negative fixtures | Run `30764286699` | PASS |
| API and worker technical shells | Build, process smoke and OCI smoke | Runs `30764286699`, `30764286720` | PASS |
| Separate internal and external web shells | Source boundaries, separate builds/images and cross-surface E2E assertions | Run `30764286720` | PASS |
| Browser compatibility | Chromium, Firefox, WebKit and mobile matrix | Job `91540162441` | PASS |
| Accessibility and RTL foundation | Automated Playwright/axe assertions | Job `91540162441` | PASS |
| PostgreSQL migrations | Checksum, advisory-lock and hostile migration tests on PostgreSQL 18.4 | Run `30764286728` | PASS |
| Exact numeric and int8 boundaries | String-boundary and SQL-equivalence fixtures | Run `30764286728` | PASS |
| Concurrency controls | Protected and deliberately unsafe controls | Run `30764286728` | PASS |
| Effective-period protections | Unprotected reproduction plus exclusion/SERIALIZABLE proof | Run `30764286728` | PASS |
| Catalog security | CPOS-owned function, context and role scan | Run `30764286728` | PASS |
| Frozen architecture source coverage | 92-source and 102-invariant compiler fixtures | Run `30764286699` | PASS |
| Object-store contract | Versioned object and exact-byte integration proof | Run `30764286725` | PASS |
| Malware-scanner contract | Real ClamAV clean, infected, unavailable and timeout outcomes | Run `30764286725` | PASS |
| OTLP contract and telemetry policy | Collector integration, redaction and attribute controls | Run `30764286725` | PASS |
| OCI runtime | Four non-root images and runtime health smoke | Job `91540162405` | PASS |
| Secret and dependency gates | Gitleaks and exact dependency audit | Job `91540162405` | PASS |
| SBOM | Source plus four image CycloneDX documents | Job `91540162405` | PASS |
| Container vulnerability gate | Fixed high/critical Trivy scan | Job `91540162405` | PASS |
| Rollback | Reverse-patch repository proof and scoped infrastructure teardown | Job `91540162439` | PASS |
| Scope isolation | Repository-wide independent confirmation | Audit package | PENDING |
| Independent architecture/invariant review | Hostile external audit | Audit package | PENDING |
| Project-owner acceptance | Explicit owner decision | Post-audit record | PENDING |

No pending builder implementation gate is concealed by this matrix. The three pending rows are external governance gates and do not authorize B02.
