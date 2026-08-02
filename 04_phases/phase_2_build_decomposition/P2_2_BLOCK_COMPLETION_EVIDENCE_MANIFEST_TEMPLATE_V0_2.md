# Phase 2 — Block Completion Evidence Manifest Template v0.2

**Status:** REQUIRED / SUPERSEDES V0.1 WHERE CONFLICTING  
**Purpose:** prevent successor unlock without executable proof, including block-local security, NFR and concurrency evidence.

---

# 1. Identity and independence

- Block ID/title:
- Prompt ID/version:
- Repository/branch:
- Start/end commits:
- Builder:
- `Independent Build-Conformance Reviewer`:
- Architecture/conformance reviewer:
- Required security/database/accessibility/domain specialist:
- Date:

The independent reviewer must not be the implementation author and must have authority to return FAIL.

---

# 2. Governing inputs

- Phase 1 requirements/ADRs/frozen clauses:
- P2.1 physical candidate/version:
- P2.2 block graph/version:
- Predecessor PASS manifests:
- Authorization decision:
- Explicit exclusions/non-goals:

---

# 3. Delivered inventory

- apps/packages/modules:
- mutable/read-only database objects:
- migrations:
- APIs/OpenAPI:
- operations/concurrency profiles:
- events/jobs/publications:
- browser surfaces:
- reports/exports:
- runtime/deployment files:
- documentation/runbooks:

---

# 4. Ownership, isolation and concurrency

- `PhysicalWriteOwnershipManifest` result:
- mutable objects without exactly one owner: must be 0;
- forbidden persistence imports/grants: must be 0;
- RLS/tenant isolation result:
- context-mutating/security-definer catalog scan:
- `ConcurrencyProfileVersion` list:
- invariant → mechanism/guard/constraint/lock-order mapping:
- real concurrency/write-skew/deadlock/serialization tests:
- safe-retry classification:

---

# 5. Compatibility and exact data handling

- ReleaseCompatibilityManifestVersion:
- runtime/package/image versions:
- schema migration head/phase:
- operation/field/schema/metric/config versions:
- supported payload readers:
- in-flight dispositions:
- rollback/drain window:
- exact decimal/parser/calculation-equivalence result where applicable:

---

# 6. Block-local security and NFR evidence

Every block must report, not defer to B14:

- authorization/data-isolation tests;
- secrets/privacy/log/telemetry tests;
- dependency/SAST/container/SBOM results as applicable;
- resource/size/time/rate/concurrency limits;
- measurement-health result;
- migration/rollback result;
- block-specific SLI/NFR conformance or exact not-applicable reason;
- restore/recovery evidence required by the block;
- accessibility/RTL evidence where a surface exists.

Missing evidence is FAIL. B14 may consolidate, not waive.

---

# 7. Verification commands and artifacts

For every applicable test, list exact command, exit status and artifact path:

- install/format/lint/typecheck;
- unit/property;
- database/object integration;
- RLS/authorization;
- concurrency/lock/serialization;
- API contract;
- worker/crash/effect recovery;
- browser/accessibility/RTL;
- security/supply chain;
- migration/compatibility/rollback/restore;
- load/NFR/measurement health;
- golden threads.

No prose-only claim where executable proof is possible.

---

# 8. Requirement/gate table

| Requirement/gate | Test/evidence | PASS/FAIL | Limitation |
|---|---|---|---|

---

# 9. Hostile scenarios

For each required scenario:

- setup;
- expected result;
- observed result;
- evidence;
- PASS/FAIL.

---

# 10. Architecture questions

List all questions concerning ownership/truth, lifecycle/guard, operation/authority, concurrency/effect/correction, evidence/recovery, report history, interaction/disclosure, NFR/security/residency or AI.

Block PASS requires **zero unresolved semantic or load-bearing physical protocol questions**.

---

# 11. Failures, debt and rollback

- failed tests:
- accepted lower verified envelope, if permitted:
- open physical proof:
- external/legal gates:
- rollback command/procedure:
- rollback test result:
- data/in-flight consequence:

---

# 12. Final disposition

Choose exactly:

- `PASS — block complete; named successors may unlock.`
- `FAIL — block remains open; successors stay locked.`
- `PASS WITH EXPLICIT LOWER VERIFIED ENVELOPE — only where frozen conformance permits.`

Signatures/dispositions:

- Builder:
- Independent Build-Conformance Reviewer:
- Architecture/conformance reviewer:
- Specialist reviewer(s):
- Date: