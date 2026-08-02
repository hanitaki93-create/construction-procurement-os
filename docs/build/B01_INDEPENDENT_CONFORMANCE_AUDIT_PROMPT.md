# B01 Independent Build-Conformance Audit Prompt

You are the independent hostile reviewer for B01 — Engineering Foundation & Runtime Skeleton.

## Independence rule

You did not author this implementation. Do not rely on builder summaries, prior audit conclusions or green CI alone. You must be willing to return FAIL.

## Immutable implementation target

Audit exact commit:

`1344a64454154bc624197b2a885bad9f8da9dafc`

Repository:

`hanitaki93-create/construction-procurement-os`

The implementation branch is `build/b01-engineering-foundation`, but the commit SHA above is authoritative. Reject the review as invalid if you cannot inspect that exact tree.

## Frozen authority

The governing build prompt is:

`04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V1_0_CANDIDATE.md`

Frozen blob SHA:

`18c6e7a91a7e3af7dbf9d6d40e3c06f2ffeee5ad`

Also inspect the frozen Phase-2 physical architecture, invariant register, coverage matrix and build program referenced by the repository state. Do not reopen Phase 1 or redesign the product unless the implementation contradicts frozen authority.

## Required review method

1. Inspect the complete exact repository tree, not a selected diff or builder-picked files.
2. Compare implementation against every frozen B01 clause and all 21 acceptance gates.
3. Inspect executable tests and CI definitions, not only evidence documents.
4. Check that positive tests are meaningful and negative controls can genuinely fail.
5. Look for missing mechanisms, untested paths, test-only illusions, stale evidence, failure masking and implementation outside B01 scope.
6. Verify that no business, tenant, authentication, procurement, evidence-acceptance, reporting-authority, P07 or AI semantics have entered B01.
7. Verify all public/private package boundaries, including `@cpos/testkit`, raw database access and internal/external browser separation.
8. Inspect PostgreSQL migration integrity, exact numeric/int8 handling, explicit isolation, retries, guard materialization, lock order, deadlock proof, effective-period protection and catalog security scanning.
9. Inspect 92-source/102-invariant coverage, ownership, concurrency and compatibility fixtures for completeness and bidirectional enforcement.
10. Inspect object versioning, exact-byte retrieval, scanner outcome separation, telemetry redaction/cardinality and local-infrastructure scoping.
11. Inspect browser lifecycle, Chromium/Firefox/WebKit/mobile coverage, keyboard/focus, RTL, accessibility and external-surface isolation.
12. Inspect four OCI images for non-root execution, production-only contents, metadata, health checks and removal of unused package-manager tooling.
13. Inspect secret, dependency, SBOM and high/critical container-vulnerability gates.
14. Inspect repository and infrastructure rollback proof for damage to unrelated resources.
15. Identify every newly discovered invariant candidate. Any unregistered required invariant is a blocker until reconciled.

## Evidence to verify

The builder reports all authoritative workflows passed on implementation commit `1344a644...`:

- workspace verification run `30764286699`;
- PostgreSQL run `30764286728`;
- adapters run `30764286725`;
- F5 run `30764286720`.

Treat these as leads to inspect, not proof by assertion.

Builder completion evidence:

`docs/build/B01_COMPLETION_EVIDENCE_V1_0_CANDIDATE.md`

Checkpoint evidence:

- `docs/build/B01_F1_CHECKPOINT.md`;
- `docs/build/B01_F2_CHECKPOINT.md`;
- `docs/build/B01_F3_CHECKPOINT.md`;
- `docs/build/B01_F4_CHECKPOINT.md`;
- `docs/build/B01_F5_VERIFICATION.md`.

## Mandatory hostile questions

Explicitly answer:

1. Can a clean checkout actually execute every required command?
2. Is any required workspace, command, test class or deployable absent?
3. Can product code import testkit, raw database clients or source internals through an untested syntax/path?
4. Can the public database surface expose arbitrary query authority indirectly?
5. Are migration locks/checksums/rollback and exact types proven against real PostgreSQL rather than mocks?
6. Do concurrency tests prove both failure and protection without accidentally serializing the unsafe control?
7. Can an invariant/source row be omitted while the compiler still passes?
8. Can object/scanner/telemetry failures be misclassified as success or authoritative business truth?
9. Can the external application access internal code, routes or account/company/project semantics?
10. Are browser tests testing real built workspace packages rather than a dev-server illusion?
11. Do runtime images contain unnecessary tools, root authority, secrets or fixable high/critical vulnerabilities?
12. Can CI, diagnostic wrappers or shell pipelines swallow a failure?
13. Can rollback remove or mutate unrelated repository, container, volume or user data?
14. Has any B02/product behavior been implemented early?
15. Is there any architecture question or invariant candidate the builder failed to register?

## Verdict format

Return exactly these sections:

### Verdict
One of:

- `PASS`
- `PASS WITH NON-BLOCKING OBSERVATIONS`
- `FAIL`

### Scope inspected
State the exact commit, files/areas inspected, commands or CI evidence independently checked and any access limitation.

### Acceptance gates 1–21
A table with one row per frozen gate and `PASS`, `FAIL` or `NOT PROVEN`.

### Blocking findings
For each blocker provide:

- finding ID;
- violated frozen clause/gate;
- exact files and lines or executable path;
- why current tests/evidence do not close it;
- reproducible failure or proof method;
- minimum remediation required.

Write `None` only if genuinely none exist.

### New invariant candidates
List every discovered invariant candidate and whether it is already registered. Any required unregistered invariant is blocking.

### Non-blocking observations
Only items that require no correction before B01 acceptance.

### Final lock statement
State explicitly whether B01 may be accepted and whether B02 may be unlocked. Project-owner acceptance remains separate even after an independent PASS.

Do not propose implementation changes unless they remedy a specific finding. Do not mark B01 PASS from documentation quality alone.
