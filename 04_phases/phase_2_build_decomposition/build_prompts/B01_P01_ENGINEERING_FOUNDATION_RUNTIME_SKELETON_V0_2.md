# Build Prompt B01-P01 — Engineering Foundation & Runtime Skeleton v0.2

**Status:** LOCKED CANDIDATE / DO NOT EXECUTE UNTIL CLAUDE ROUND 2 PASS, P2.1/P2.2 FREEZE, EXPLICIT IMPLEMENTATION AUTHORIZATION AND RECORDED V1/V2 SEQUENCING DECISION  
**Block:** B01  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch suggestion:** `build/b01-engineering-foundation`  
**Product code before this prompt:** none

---

# 1. Prompt composition

This prompt incorporates the complete B01-P01 v0.1 body:

- path: `04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_1.md`
- blob SHA: `e4913426a008488fa8a0166f1f3bc590a7d59bfc`

The builder must read and execute that full body with the substitutions and mandatory additions below. Where this artifact conflicts with v0.1, v0.2 controls.

Mandatory controlling sources are updated to:

- `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_3.md`;
- `P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_2.md`;
- `P2_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`.

All original exclusions remain: no tenant/business tables, authentication, product operations, evidence acceptance, procurement workflows, reporting, P07 or AI.

---

# 2. Transaction helper and isolation foundation

Replace the v0.1 transaction-helper requirement with the following exact contract.

Create a server-only transaction foundation that:

- accepts an explicit isolation value before the first SQL statement:
  - `READ COMMITTED`;
  - `REPEATABLE READ`;
  - `SERIALIZABLE`;
- has no implicit isolation for a registered command call;
- rejects unsupported or late isolation changes;
- returns a transaction-bound handle only;
- does not expose the underlying pool/client publicly;
- records technical attempt identity for tests without implementing B02 command/idempotency semantics;
- supports test-only retry orchestration that preserves one supplied logical test identity;
- never performs automatic retry unless the caller supplies an explicit pre-effect-safe retry profile.

B01 does not assign business invariants or implement `withExecutionContext`; B02 does that. B01 must prove the physical helper can honor the requested isolation and cannot silently fall back to the driver default.

---

# 3. Required real-PostgreSQL concurrency tests

Add integration tests against PostgreSQL 18 for:

## 3.1 Isolation-level proof

Inside each transaction, query `current_setting('transaction_isolation')` and assert exact requested value before any test mutation.

## 3.2 Write-skew fixture

Create test-only tables representing:

- one guard/basis row with authorized capacity;
- independently inserted child-consumption rows.

Run two concurrent transactions that each read remaining capacity and insert into different child rows.

Required results:

- under deliberately unprotected `READ COMMITTED`, the fixture demonstrates the write-skew risk and is labelled a negative control—not a passing production strategy;
- under CC-2-style `SELECT ... FOR UPDATE` on the guard row, at most one conflicting allocation commits and the invariant remains true;
- under `SERIALIZABLE`, one transaction commits and the other receives serialization failure/retry disposition while the invariant remains true;
- the tests have bounded timeouts and cannot hang CI;
- test cleanup is scoped.

This is a technical fixture only. Do not create product allocation tables or semantics.

## 3.3 Deadlock/lock-order fixture

Create a test-only two-guard scenario proving:

- registered ascending lock order completes;
- reversed lock order can produce a deadlock/timeout negative control;
- the helper surfaces a typed technical conflict rather than swallowing it.

---

# 4. Concurrency and write-ownership manifest scaffolds

Create versioned schemas/types and CI validators for:

## `ConcurrencyProfileVersion`

Fields at minimum:

- profile ID/version;
- transaction isolation;
- invariant IDs;
- mechanism: `EXPECTED_VERSION`, `GUARD_ROW_LOCK`, `UNIQUE_OR_EXCLUSION_CONSTRAINT`, `SERIALIZABLE_PREDICATE`, `ADVISORY_TECHNICAL`;
- guard relation/key description;
- lock-order rank;
- constraint names;
- safe-retry class/max attempts;
- required test IDs.

## `PhysicalWriteOwnershipManifest`

Fields at minimum:

- database object/schema;
- mutable/read-only classification;
- owning module;
- permitted runtime lane/role;
- permitted operation handlers;
- invariant/concurrency profile references;
- approved same-transaction contracts;
- migration owner.

B01 manifest contains only B01 technical metadata/migration objects. The validator must fail for any mutable user-created object lacking exactly one owner and required concurrency declaration where an invariant is registered.

Add positive and negative fixtures.

---

# 5. Raw-pool and database public-surface prohibition

Strengthen architecture tests so:

- `packages/database-core` public exports contain only approved configuration, health, migration and transaction-helper contracts;
- no workspace package can import or receive `pg.Pool`, `pg.Client`, Kysely root instance or unrestricted query function through a public export;
- browser packages cannot import any database package;
- test-only raw handles are available only from a clearly private/test export unavailable to production build graphs;
- a negative fixture attempting a raw-pool import fails the architecture check.

Document that B02 must introduce `withExecutionContext` before any tenant/business table or SQL exists.

---

# 6. Database-object security catalog scan

Add a CI/integration script that inspects PostgreSQL catalogs and fails on unmanifested:

- `SECURITY DEFINER` functions;
- functions/triggers/rules/views containing `set_config`, `SET ROLE` or reserved future execution-context setting names;
- runtime-owned function/policy/trigger/view creation;
- table owner or role with `BYPASSRLS` where prohibited by the technical role manifest.

B01 may have no approved context-mutating object.

The scanner must be reusable by B02+ and produce a machine-readable report.

---

# 7. Exact numeric driver contract

Pin PostgreSQL type parser behavior so `numeric`/`decimal` values remain strings.

Prohibit global or package-local overrides that convert numeric OIDs to JavaScript `number`.

Add real PostgreSQL round-trip tests for `numeric(38,12)` and `numeric(38,18)` covering:

- zero;
- negative;
- maximum declared scale;
- trailing zeros/canonical representation policy;
- values beyond IEEE-754 safe integer precision;
- high-precision fractional rates;
- JSON serialization as strings.

B01 does not implement business rounding. It proves the storage/driver/transport foundation cannot silently coerce exact values to float.

---

# 8. ReleaseCompatibilityManifestVersion scaffold

Create a versioned schema/validator and example technical B01 manifest containing:

- build/release ID and source commit;
- API and browser build compatibility ranges;
- schema migration head/phase;
- operation/field/schema/metric/configuration version placeholders;
- supported job/event payload readers placeholders;
- in-flight session/task/draft/proposal/confirmation disposition placeholders;
- rollback/drain deadline;
- conformance status.

B01 uses only technical/build fields; later blocks populate product fields.

Add validation tests showing an incompatible or incomplete manifest fails closed.

Expose only non-sensitive build compatibility information at `/meta/build`.

---

# 9. Block-local security/NFR evidence

The B01 completion manifest must contain explicit evidence for:

- database public-surface and ownership checks;
- isolation/concurrency fixtures;
- numeric exactness;
- database-object security scan;
- secrets/log/privacy checks;
- package/container resource and failure limits;
- migration/compatibility/rollback;
- telemetry/measurement health;
- accessibility/RTL shell tests;
- exact not-applicable declarations for product NFRs not implemented in B01.

B14 cannot retroactively waive missing B01 evidence.

---

# 10. Independent reviewer

Replace the generic independent-review requirement with:

- `Independent Build-Conformance Reviewer` who did not author the implementation and has authority to fail B01;
- separate architecture/conformance reviewer;
- database/security specialist review for transaction, numeric and catalog-scan evidence, which may be fulfilled by the independent reviewer only if that competence is recorded.

The builder cannot self-certify B01.

---

# 11. Additional hostile scenarios

Add to the original hostile list:

- requested transaction isolation silently falls back to another level;
- two child-row inserts violate an aggregate under unprotected READ COMMITTED negative control;
- guard-row lock preserves the invariant;
- SERIALIZABLE produces retryable serialization conflict and preserves the invariant;
- reversed lock order creates detectable conflict while registered order completes;
- raw pool/client import through a package public export;
- numeric parser converts beyond-safe value to JavaScript number;
- `SECURITY DEFINER` or `set_config` database object appears;
- incomplete/incompatible ReleaseCompatibilityManifest passes validation;
- a mutable technical table lacks a write owner.

---

# 12. Updated acceptance additions

B01 cannot PASS unless the original gates and all of the following pass:

1. explicit isolation selection is proven against real PostgreSQL;
2. write-skew negative control is demonstrated and both guard-row and SERIALIZABLE protected fixtures fail closed correctly;
3. no raw pool/client public path exists;
4. numeric exact-decimal string round trip passes;
5. write-ownership/concurrency manifest validator passes positive/negative fixtures;
6. database-object security scan passes;
7. ReleaseCompatibilityManifestVersion validation passes;
8. block-local security/NFR evidence is complete;
9. the named independent reviewer signs PASS;
10. no business invariant/table/workflow was introduced.

---

# 13. Final builder response addition

In addition to v0.1 response requirements, return:

- selected isolation helper API and proof;
- concurrency fixture results;
- raw-pool public-surface result;
- exact numeric parser/round-trip result;
- database-object catalog scan report;
- ownership/concurrency manifest report;
- ReleaseCompatibilityManifestVersion path/result;
- independent reviewer identity/role and disposition.

B02 remains locked without the complete PASS manifest.