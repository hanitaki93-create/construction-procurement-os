# Phase 2 — Final Watch Disposition v1.0

**Date:** 2026-08-02  
**Status:** ACCEPTED / NON-BLOCKING / BUILD-GATE OWNERS ASSIGNED  
**Source:** Claude Round-3 final PASS, W-120–W-125

---

# 1. Rule

No watch below reopens Phase 1 or blocks the Phase-2 freeze. Each watch either receives an exact physical assignment now or an explicit later proof owner and fail-closed gate.

---

# 2. W-120 — enforcement class populated unevenly

**Disposition:** CLOSED AS PHYSICAL ASSIGNMENT.

The four cross-row/state-transition predicates called out by Claude receive the following mandatory profiles before their owning operation can activate:

| Invariant | Required profile | Guard / constraint | Owner |
|---|---|---|---|
| INV-042 retention-hold precedence versus disposition | CC-2 stable guard-row lock and recomputation | `EvidenceLifecycleGuard(tenant_id, evidence_version_id)`; hold/disposition/redaction/tombstone operations acquire the same guard before evaluating lifecycle state | B04, consolidated B14 |
| INV-077 deadline/addendum versus late-response admission | CC-2 stable guard-row lock and recomputation | `SourcingEventMemberAdmissionGuard(tenant_id, event_id, member_id)`; addendum/deadline/acceptance operations lock and recompute the effective admission basis | B06/B07 |
| INV-032 concurrent suspense attribution/resolution | CC-2 stable guard plus CC-3 one-active-resolution identity | `CommitmentAttributionGuard(tenant_id, commitment_or_subject_id)` and exact unique active resolution identity | B16 |
| INV-051 concurrent EffectPosition transition | CC-1 expected version on one authoritative current-position row plus append-only transition occurrence and CC-3 unique transition identity | exact effect-position identity/version | B03 |

The InvariantRegister/compiler must reject activation if these assignments are absent or replaced without architecture change control.

---

# 3. W-121 — clause-level completeness is curated

**Disposition:** ACCEPTED BUILD DEBT / FAIL-CLOSED OWNER B01+B02.

B01 must scaffold a machine-readable `FrozenSourceManifestVersion` capable of listing every frozen MR, accepted ADR and explicit clause-level source identity. B02 must activate an exact source manifest and reconcile the curated supplement before any product operation activates.

The existing MR 92/92 matrix and ten clause-level supplement families remain the frozen seed. Any additional clause discovered during implementation becomes an invariant candidate and blocks the owning block until reconciled. Structural coverage by composition is permitted only when the source clause explicitly names the controlling invariant composition and proof.

This debt cannot silently convert to PASS merely because the compiler implementation exists.

---

# 4. W-122 — “0 claimed” wording

**Disposition:** CLOSED BY FREEZE WORDING.

The freeze checkpoint preserves:

- architecture gaps: `0 claimed`;
- unresolved registered-invariant gaps: `0 claimed`;
- physical implementation proof: pending by block.

The Phase-2 PASS means the design is sufficiently closed to build. It does not assert that unbuilt validators, manifests, operations or database constraints have already passed physical tests.

---

# 5. W-123 — independent reviewer staffing

**Disposition:** CLOSED AS NAMED INDEPENDENCE MECHANISM.

For a single-operator build, an independent review means:

1. a fresh reviewer session/model did not author the implementation and receives only the immutable evidence package, prompt, commits, commands and artifacts;
2. it has explicit authority to return FAIL;
3. its method/session/tool identity and date are recorded;
4. project-owner acceptance is separate;
5. B02–B04, B14 and B16–B18 require two independent hostile reviews unless a named qualified human reviewer participates.

An authoring-session self-review cannot satisfy the gate.

---

# 6. W-124 — B01 magnitude

**Disposition:** ACCEPTED / CONTROLLED BY F1–F5.

B01 remains one semantic block because all content establishes the foundation B02 relies on. Execution is divided into five checkpoint commits/evidence packages:

- F1 workspace/toolchain/boundaries;
- F2 runtime/browser shells;
- F3 database/concurrency/invariant/manifest foundations;
- F4 object/scanner/local infrastructure/observability;
- F5 CI/containers/security/SBOM/docs/rollback/evidence.

A checkpoint failure stops continuation. Only final independently reviewed B01 PASS unlocks B02.

---

# 7. W-125 — implementation verification does not yet exist

**Disposition:** EXPECTED PHYSICAL-PROOF DEBT / OWNED BY B01+B02.

The compiler, `PhysicalWriteOwnershipManifest` and `OperationRegistry` are specifications, not implemented facts.

- B01 builds and tests the generic validators using positive/negative technical fixtures.
- B02 activates the product register, operation registry, ownership manifest and reverse mappings before business tables exist.

No documentation claim may be represented as physical proof. Failure of those executable gates fails the block and leaves successors locked.

---

# 8. Final result

- freeze blockers: 0;
- watches without owner: 0;
- watches converted into unsupported assertions: 0;
- Phase 1 reopen: NO;
- B01 execution lock: retained pending explicit authorization and sequencing record.
