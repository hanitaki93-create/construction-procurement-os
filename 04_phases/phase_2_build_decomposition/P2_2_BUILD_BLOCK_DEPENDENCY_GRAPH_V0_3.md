# Construction Procurement OS — P2.2 Build-Block Dependency Graph v0.3

**Date:** 2026-08-02  
**Status:** INVARIANT-COMPLETE DECOMPOSITION CANDIDATE / INTERNAL RECHECK PENDING  
**Phase 1:** FROZEN  
**P2.1 controlling candidate:** v0.4  
**Code:** LOCKED

---

# 1. Graph composition

This artifact incorporates the complete v0.2 graph:

- path: `04_phases/phase_2_build_decomposition/P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_2.md`
- blob SHA: `7f9ad5a4074182efb2b62cb40cb99f3c8ac8f3f8`

The 18-block count and causal ordering remain unchanged.

---

# 2. Invariant-register ownership

## B01 — compiler/validator foundation

B01 scaffolds and proves:

- `InvariantRegisterVersion` schema and validator;
- frozen-source coverage schema and 92-row completeness fixture;
- bidirectional register/object/operation compiler interfaces;
- empty/product-free technical manifests;
- test-only concurrency schema;
- guard materialization and global-order fixtures;
- all exact-type decoder tests;
- internal checkpoints F1–F5.

B01 does not assign product invariant implementations beyond its technical metadata.

## B02 — product register activation

B02 owns:

- loading the frozen InvariantRegisterVersion and coverage matrix;
- immutable activation/supersession history;
- object/operation reverse-reference compiler;
- effective-dated object-family inventory;
- CC-1–CC-5 profile activation;
- global guard-class/scope ranks and canonical key encoding;
- reference implementations for effective-period exclusion and register-completeness failure;
- operation activation failure when any invariant mapping is incomplete.

## Every later block

Every block that adds or changes a mutable object, operation, effective-dated version, calculation, projection or state machine must:

1. identify all participating `INV-*` entries;
2. update reverse mappings;
3. add exact enforcement/test evidence;
4. state whether a newly encountered invariant exists;
5. block PASS until any new invariant is reconciled through change control.

---

# 3. Effective-period ownership

- B02: ownership, authority, delegation/DOA, configuration/policy/operation activation.
- B06: sourcing response schema activation by event/member/scope.
- B12: metric/operator/materiality/use policy activation.
- B13: connector authority/cutover activation.
- B14: release compatibility phase and residency profile.
- B16/B17: Commitment basis/profile and commercial effective periods.
- B18: AI capability/provider/evaluation profile activation.

Every family uses CC-3 exact exclusion/partial uniqueness or a registered CC-4 fallback.

---

# 4. Guard and exact-type ownership

- B01 proves the technical helper, guard-materialization pattern, total lock order and numeric/int8 parser boundary.
- B02 activates global guard ranks/key encodings and operation profiles.
- B05 owns AuthorizedRequirementBasis guards.
- B12 owns report aggregation/contribution guard profiles and source cuts.
- B16/B17 own minimum-credit, economic-lineage and exclusive-scope guards after V4.

---

# 5. Completion manifest obligation

Every block completion manifest must include:

- invariant register version;
- frozen-source coverage version;
- newly added/changed objects and operations;
- forward and reverse invariant mappings;
- effective-period overlap disposition;
- concurrency profile/guard/constraint/lock-order tests;
- exact-type/calculation/source-cut evidence where relevant;
- explicit assertion that no unregistered invariant was encountered;
- local security/NFR evidence;
- independent review identity and disposition.

B14 cannot cure missing invariant or security evidence from a predecessor.

---

# 6. B01 checkpoints

- B01-F1 — workspace/toolchain/dependency boundaries.
- B01-F2 — API/worker/internal/external shells.
- B01-F3 — PostgreSQL, migrations, transaction/concurrency/exact-type/register/ownership/compatibility foundations.
- B01-F4 — object/scanner/local infrastructure/observability.
- B01-F5 — CI/containers/security/SBOM/docs/completion evidence.

Each checkpoint may commit independently. Only final B01 PASS unlocks B02.

---

# 7. Graph result

- major blocks: 18;
- causal cycles: 0 claimed;
- invariant-register owner: B02;
- validator/compiler scaffold: B01;
- effective-period families: explicitly owned;
- guard materialization/order: explicitly owned;
- 92/92 frozen-source coverage: required before activation;
- P07 V4 lock: unchanged;
- AI V6 lock: unchanged;
- B01 execution: locked pending Round 3 PASS, freeze and authorization.