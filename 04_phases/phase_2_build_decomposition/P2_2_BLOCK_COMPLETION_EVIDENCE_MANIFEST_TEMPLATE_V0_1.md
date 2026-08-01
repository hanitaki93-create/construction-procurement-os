# Phase 2 — Block Completion Evidence Manifest Template v0.1

**Status:** REQUIRED TEMPLATE  
**Purpose:** prevent a later prompt from assuming a block passed without reviewable evidence.

---

# 1. Identity

- Block ID:
- Block title:
- Prompt ID/version:
- Repository/branch:
- Start commit:
- End commit:
- Builder:
- Reviewer:
- Date:

---

# 2. Governing inputs

- Phase 1 requirement IDs:
- Accepted ADRs/frozen clauses:
- P2.1 physical decisions:
- Predecessor completion manifests:
- Authorization decision:
- Explicit exclusions/non-goals:

---

# 3. Delivered artifacts

- applications/packages/modules:
- database schemas/migrations:
- API/OpenAPI contracts:
- operations/events/jobs:
- browser surfaces:
- reports/exports:
- runtime/deployment files:
- documentation/runbooks:

---

# 4. Ownership and compatibility

- mutable-object ownership manifest result:
- package dependency-boundary result:
- release/runtime/package versions:
- schema migration head:
- operation/schema/configuration compatibility range:
- in-flight/rollback disposition:

---

# 5. Verification

List exact commands, exit status and artifact paths for:

- install/format/lint/typecheck;
- unit/property tests;
- real database/object integration tests;
- RLS/authorization tests;
- API contract tests;
- worker/crash/recovery tests;
- browser/Playwright/accessibility/RTL tests;
- security/SBOM/secret/dependency/container checks;
- migration/rollback/restore tests;
- load/NFR/measurement-health tests;
- golden-thread tests.

No claim may rely only on a screenshot or prose statement where an executable test is possible.

---

# 6. Requirement and gate result

| Requirement/gate | Evidence | PASS/FAIL | Limitation |
|---|---|---|---|

---

# 7. Hostile scenarios

For each required hostile scenario:

- scenario;
- setup;
- observed result;
- expected result;
- evidence location;
- PASS/FAIL.

---

# 8. Architecture questions

List every question encountered that concerned:

- ownership/truth;
- state/guard;
- operation/authority;
- effect/correction;
- evidence/recovery;
- report population/history;
- interaction/disclosure;
- NFR/security/residency;
- AI semantics.

Required result for block PASS: **none unresolved**.

A physical implementation question may be recorded with its chosen decision and proof. A semantic question blocks completion and returns to architecture change control.

---

# 9. Failures, debt and rollback

- known failed tests:
- accepted limitations:
- open physical proof:
- external/legal gate still pending:
- rollback command/procedure:
- rollback test result:
- data/in-flight consequence:

---

# 10. Final disposition

Choose exactly:

- `PASS — block complete; named successors may unlock.`
- `FAIL — block remains open; successors stay locked.`
- `PASS WITH EXPLICIT LOWER VERIFIED ENVELOPE — only where the frozen NFR conformance rules permit.`

Approvals/sign-off:

- Builder:
- Independent reviewer:
- Architecture/conformance reviewer:
- Date: