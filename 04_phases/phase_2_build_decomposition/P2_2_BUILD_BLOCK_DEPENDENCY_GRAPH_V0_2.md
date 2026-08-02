# Construction Procurement OS — P2.2 Build-Block Dependency Graph v0.2

**Date:** 2026-08-02  
**Status:** CLAUDE-REMEDIATED DECOMPOSITION CANDIDATE / INTERNAL RECHECK PENDING  
**Phase 1:** FROZEN  
**P2.1 controlling candidate:** v0.3  
**Code:** LOCKED

---

# 1. Graph composition

This artifact incorporates the complete v0.1 graph:

- path: `04_phases/phase_2_build_decomposition/P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_1.md`
- blob SHA: `ae15ad039b9a492020bb79f1ec4a281e8a928945`

The 18-block count and causal ordering remain unchanged.

This v0.2 artifact controls the clarifications and gate additions below.

---

# 2. Corrected B02/B06/B07/B08 registry ordering

## B02 — registry substrate only

B02 implements:

- product-owned registry infrastructure;
- version activation/supersession/admission mechanics;
- compatibility and immutable version identity;
- no sourcing-specific field semantics.

## B06 — sourcing response semantics before issue

Before an RFQ/tender can issue, B06 defines and activates the exact sourcing-specific:

- response schema version;
- RegisteredSemanticFieldKeys used by that event;
- mandatory/optional field groups;
- mandatory attachment/evidence classes;
- enum/reference versions;
- `ExternalSubmissionAcceptancePolicy`;
- member/event/schema compatibility;
- late/invalid/quarantine rules used by issue and receipt.

These are product-owned/versioned and use B02 substrate.

## B07 — source capture

B07 captures source responses/revisions against the exact B06 event/member/schema/acceptance versions. It cannot create new field meaning through supplier content or buyer capture.

## B08 — normalization/comparison

B08 consumes the already issued sourcing field keys/schema versions and adds:

- normalization mapping/proposal;
- unit/currency/date/value transformations;
- buyer evaluation adjustment;
- comparison compatibility and population;
- supplier-confirmed contractable basis.

B08 may introduce a new product-owned schema version only prospectively through the registry/issue lifecycle. It cannot retroactively redefine a B06/B07 response.

Result: B06/B07 have no forward dependency on B08.

---

# 3. Concurrency ownership by block

## B01

Scaffolds and proves:

- transaction helper accepts exact isolation before first statement;
- real PostgreSQL isolation behavior;
- write-skew fixture fails under protected strategy;
- `PhysicalWriteOwnershipManifest` and `ConcurrencyProfileVersion` schemas/checks;
- no raw pool public surface;
- database-object security catalog scan.

B01 contains no business invariant assignments.

## B02

Implements:

- operation registry integration with `ConcurrencyProfileVersion`;
- CC-1–CC-5 mechanism types;
- guard-key/lock-order/retry/conflict envelopes;
- activation failure for missing invariant mechanism;
- reference/test aggregates proving CC-1, CC-2, CC-3 and CC-4.

## B05

Owns allocation-conservation guard-row protocol and tests.

## B08

Owns exact-money parser/calculation-plan contracts used by sourcing comparison and relevant uniqueness/contribution identities.

## B12

Owns registered calculation executors and reproducible report source-cut modes.

## B16/B17

Own P07 minimum/residual drawdown, economic contribution and exclusive-scope assignments after V4.

Every block that adds a cross-row invariant must extend the manifest and concurrency tests in the same block.

---

# 4. Block-local NFR/security evidence

Every B01–B18 completion manifest includes:

- authorization/RLS/data-isolation result;
- secrets/privacy/telemetry result;
- resource limits and failure behavior;
- migration/compatibility/rollback result;
- block-specific SLI/NFR result or an exact not-applicable justification;
- dependency/security scan result;
- hostile scenarios relevant to the block.

B14 consolidates full-system load, restore, security and release proof. It cannot cure or waive missing predecessor evidence.

---

# 5. B12 additions

B12 must implement and gate:

- the three permitted reproducible source-cut modes;
- product-owned exact-decimal reference calculation executor;
- SQL execution equivalence/registration rule;
- RLS on all tenant-owned projections/search/report/export/control tables;
- `ArabicSearchRelevanceDecision` using representative UAE procurement corpus and queries.

No load-bearing report may rely on wall-clock/latest-index source cut.

---

# 6. Release compatibility ownership

- B01 scaffolds `ReleaseCompatibilityManifestVersion` schema/validation.
- B02 binds operation and client compatibility identities.
- every block adds its new schema/operation/job/event/task compatibility entries.
- B14 implements deployment admission, drain and rollback enforcement against the manifest.

---

# 7. Reviewer and completion protocol

Every block requires:

- builder;
- `Independent Build-Conformance Reviewer` who did not author the implementation and can fail the block;
- architecture/conformance reviewer;
- relevant security/database/accessibility/domain specialist when the block gate requires it.

A successor remains locked without a PASS completion manifest.

---

# 8. Updated graph result

- major blocks: 18;
- causal cycles: 0 claimed;
- B06/B07 forward schema dependency: CLOSED;
- cross-row concurrency ownership: explicit;
- security/NFR deferral to B14: prohibited;
- P07 V4 lock: unchanged;
- AI V6 lock: unchanged;
- B01 execution: locked pending Round 2 PASS, freeze and authorization.