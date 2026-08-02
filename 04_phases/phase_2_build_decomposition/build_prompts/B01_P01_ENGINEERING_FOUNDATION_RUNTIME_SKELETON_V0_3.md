# Build Prompt B01-P01 — Engineering Foundation & Runtime Skeleton v0.3

**Status:** LOCKED CANDIDATE / DO NOT EXECUTE UNTIL CLAUDE ROUND 3 PASS, P2.1/P2.2 FREEZE, EXPLICIT IMPLEMENTATION AUTHORIZATION AND RECORDED V1/V2 SEQUENCING DECISION  
**Block:** B01  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch suggestion:** `build/b01-engineering-foundation`  
**Product code before this prompt:** none

---

# 1. Prompt composition

This prompt incorporates the complete B01-P01 v0.2 body:

- path: `04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_2.md`
- blob SHA: `8b044666f2858513a5a5911e2c2b8251e94d7744`

It also inherits the complete v0.1 body incorporated by v0.2.

Where this file conflicts with earlier versions, v0.3 controls.

Updated mandatory sources:

- `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_4.md`;
- `P2_1_INVARIANT_REGISTER_V0_1.md`;
- `P2_1_FROZEN_CLAUSE_INVARIANT_COVERAGE_MATRIX_V0_1.md`;
- `P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_3.md`;
- `P2_CLAUDE_ROUND_2_REMEDIATION_V0_1.md`;
- Block Completion Evidence Manifest v0.3.

All original exclusions remain. B01 contains no tenant/business schema, authentication, product operation, evidence acceptance, procurement workflow, report, P07 or AI behavior.

---

# 2. InvariantRegisterVersion scaffold

Create versioned machine-readable schemas/types and validators for:

## `InvariantRegisterVersion`

Required fields:

- register ID/version/status;
- source frozen-master/checkpoint identities;
- invariant ID/name/class;
- source requirement/contract/ADR references;
- participating object-family names;
- owning block/module;
- concurrency sensitivity;
- enforcement class/profile reference;
- minimum hostile test IDs;
- effective-period overlap disposition where applicable;
- activation/supersession metadata.

## `FrozenClauseInvariantCoverageVersion`

Required fields:

- source clause/requirement ID;
- source artifact/version;
- mapped invariant IDs or explicit allowed non-state disposition;
- owning block/proof gate;
- review status.

The B01 fixture must validate the exact 92-row completeness shape without implementing product semantics.

Positive fixture:

- every source row has a disposition;
- every invariant has owner/enforcement/test;
- reverse references are complete.

Negative fixtures must fail for:

- one missing frozen source row;
- one invariant with no owner;
- one concurrency-sensitive invariant with no profile;
- one effective-dated family with no overlap disposition;
- one object that omits a reverse invariant reference;
- one unknown invariant reference.

B01 must not invent or modify the production register; it implements the validator/compiler foundation only.

---

# 3. Bidirectional compiler interface

Scaffold a reusable compiler that accepts:

1. frozen-source coverage;
2. invariant register;
3. physical write-ownership manifest;
4. operation manifest;
5. concurrency profiles;
6. schema-catalog manifest;
7. block completion manifest.

It must produce a machine-readable PASS/FAIL report and fail closed on any incomplete direction.

No runtime application activation is implemented in B01; B02 consumes the compiler.

---

# 4. Test-only concurrency schema — W-116

All B01 concurrency/guard/effective-period fixtures live in an isolated schema named `testkit_concurrency` or an equivalently explicit test-only name.

Requirements:

- created by test setup, not product migrations;
- dropped by scoped test teardown;
- excluded from production migration/status inventory;
- unavailable to production runtime roles/build graph;
- contains no tenant/procurement naming or semantics;
- no fixture object can appear in generated production ownership manifests.

The product bootstrap migration remains technical/business-empty.

---

# 5. Guard materialization and total-order fixtures

Extend v0.2 concurrency tests.

## Guard materialization

Prove:

- `SELECT FOR UPDATE` on a missing row protects nothing as a negative control;
- eager parent+guard creation is atomic;
- lazy `INSERT ... ON CONFLICT DO NOTHING` followed by `SELECT ... FOR UPDATE` produces one guard under concurrency;
- contributor reads happen only after guard lock;
- guard identity is unique and idempotent.

## Global lock order

Use the exact tuple:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

Prove:

- canonical sorting is identical across callers;
- duplicate guards are removed;
- ordered acquisition completes;
- reversed/manual acquisition is a negative deadlock/timeout fixture;
- profiles cannot override the global comparator.

---

# 6. Effective-period non-overlap fixture

Add a test-only effective-version table in `testkit_concurrency`.

Scenario:

- one current version exists;
- two concurrent transactions close it and insert replacements over overlapping periods.

Required results:

- unprotected READ COMMITTED demonstrates two overlapping active versions as a negative control;
- CC-3 GiST exclusion/partial-unique strategy prevents overlap;
- CC-4 SERIALIZABLE fallback prevents overlap for an intentionally non-constraint predicate;
- boundary semantics are explicit and tested;
- typed conflict/result is surfaced.

This fixture proves the exact BL-P21-07 example without creating a product authority table.

---

# 7. Exact PostgreSQL type boundary — W-114/W-115

Extend v0.2 numeric tests and adapter policy.

Pin and test:

- `numeric`/`decimal` as canonical decimal strings;
- `int8`/bigint as canonical integer strings at the database/transport boundary;
- optional internal conversion only through checked `bigint`, never JavaScript number;
- JSON serialization preserves strings;
- values above `Number.MAX_SAFE_INTEGER` remain exact;
- parser inventory rejects global/package overrides that produce lossy values.

Add exact-decimal plan contract fixtures declaring:

- addition/subtraction/multiplication/division;
- input/output precision and scale;
- division intermediate scale;
- rounding mode and point;
- overflow/underflow disposition;
- golden equivalence to the TypeScript reference executor.

B01 proves the contract/validator only; it implements no business formula.

---

# 8. Manifest integration

Extend `PhysicalWriteOwnershipManifest` and `ConcurrencyProfileVersion` validators so every mutable object/operation can carry:

- invariant IDs;
- effective-period overlap disposition;
- guard materialization strategy;
- global lock-order participation;
- constraint identity;
- required concurrency tests.

A mutable effective-dated object with no overlap disposition must fail validation even if no author manually registered a concurrency profile for it.

---

# 9. B01 internal checkpoints — W-118

Implement and commit in five checkpoints:

## B01-F1

Workspace, exact versions, TypeScript/build/lint/format, dependency boundaries and negative import fixtures.

## B01-F2

API, worker, internal web and external web shells with health/build/OpenAPI/accessibility/RTL smoke.

## B01-F3

PostgreSQL/migrations, transaction helper, concurrency/effective-period/guard fixtures, exact-type boundary, invariant/coverage/write-ownership/concurrency/compatibility validators and catalog scan.

## B01-F4

Object-store/scanner adapters, local infrastructure and observability.

## B01-F5

CI, containers, security/SBOM, documentation, rollback test and final completion evidence.

Every checkpoint records exact commands/results. A checkpoint failure blocks final B01 but does not require deleting passed commits. B02 remains locked until final B01 PASS.

---

# 10. Independent review — W-117

B01 final review requires:

- one fresh `Independent Build-Conformance Review` that did not author the implementation and can return FAIL;
- one architecture/conformance review;
- recorded database/security competence for the transaction/concurrency/type/catalog evidence;
- project-owner acceptance after the independent disposition.

The review record contains method, reviewer identity, evidence supplied, date, findings and PASS/FAIL.

The same authoring session cannot self-certify B01.

---

# 11. Exact rollback discipline carried forward

The following v0.1 rollback rules remain mandatory without weakening:

- rollback is repository revert of B01 commits because B01 has no business data;
- local infrastructure teardown uses documented scoped compose commands;
- local B01 volumes may be removed only through an explicit named command with a clear warning;
- never use `git clean -fd`;
- never use broad Docker prune;
- teardown must not remove unrelated Docker resources, repository files or user artifacts;
- the migration test database is rebuildable from zero;
- rollback execution and result are recorded in completion evidence;
- hostile test: scoped teardown preserves unrelated resources and repository files.

---

# 12. Additional acceptance gates

In addition to all v0.1/v0.2 gates, B01 cannot PASS unless:

1. InvariantRegisterVersion validator passes positive and all negative completeness fixtures;
2. exact 92-row coverage fixture detects any removed row;
3. bidirectional object/operation/invariant compiler fails incomplete reverse mappings;
4. effective-period negative control reproduces overlap and CC-3/CC-4 prevent it;
5. guard materialization and global order fixtures pass;
6. numeric and int8 exact-boundary tests pass;
7. SQL division-scale plan validation/equivalence fixture passes;
8. test-only concurrency schema is absent from product migration inventory;
9. F1–F5 checkpoint evidence is complete;
10. independent review and project-owner acceptance are recorded;
11. original rollback discipline is executed successfully;
12. no product/business table or invariant implementation is introduced.

---

# 13. Additional hostile scenarios

- frozen coverage row removed while register otherwise validates;
- invariant omitted from object reverse references;
- effective-dated mutable object has no overlap disposition;
- missing guard row is treated as locked;
- two callers use different guard ordering;
- int8 is converted to JavaScript number;
- SQL division uses implicit scale;
- concurrency fixture leaks into product migrations;
- builder attempts to self-certify final B01;
- rollback uses broad cleanup or damages unrelated resources.

---

# 14. Execution lock

Do not execute this prompt until:

1. Claude Round 3 PASS;
2. P2.1/P2.2 final freeze/checkpoint;
3. explicit implementation authorization;
4. recorded V1/V2 sequencing decision.

The prompt is ready for audit, not yet authorized for build.