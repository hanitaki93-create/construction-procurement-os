# Construction Procurement OS — P2.1 Physical Architecture Candidate v0.4

**Date:** 2026-08-02  
**Status:** INVARIANT-COMPLETE CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Phase 1:** FROZEN  
**Code:** LOCKED

---

# 1. Candidate composition

This candidate incorporates the complete physical architecture v0.3:

- path: `04_phases/phase_2_build_decomposition/P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_3.md`
- blob SHA: `492d22d26b3b8c89c5515dddf1328c2dee70ca37`

It additionally incorporates and makes controlling:

1. `P2_CLAUDE_ROUND_2_REMEDIATION_V0_1.md`;
2. `P2_1_INVARIANT_REGISTER_V0_1.md`;
3. `P2_1_FROZEN_CLAUSE_INVARIANT_COVERAGE_MATRIX_V0_1.md`;
4. P2.2 graph v0.3;
5. B01-P01 v0.3;
6. Block Completion Evidence Manifest v0.3.

Where v0.3 refers to a registered invariant set, v0.4 means the complete versioned register and coverage compiler defined here.

No topology, state authority, tenancy, evidence, effect-recovery, calculation, reporting or release decision from v0.3 is removed.

---

# 2. InvariantRegisterVersion is mandatory architecture

The product has one versioned `InvariantRegisterVersion` compiled from:

- the frozen Phase 1 master package;
- all P1.4–P1.10 frozen clauses and incorporated watches;
- MR-001–MR-092;
- accepted ADRs;
- subsequent explicit `CHG-*` records only.

The current candidate contains 102 invariant families and a 92/92 source-coverage matrix.

The register is product-authored. Tenant configuration, implementation code, migrations, tests and providers cannot create or delete invariant meaning.

---

# 3. Bidirectional completeness compiler

Build/freeze/operation activation requires one compiler result joining:

1. frozen source manifest;
2. frozen-clause coverage matrix;
3. InvariantRegisterVersion;
4. PhysicalWriteOwnershipManifest;
5. OperationRegistry;
6. ConcurrencyProfileVersion;
7. schema/migration catalog;
8. block completion manifests.

The compiler fails when:

- any frozen source clause/MR has no invariant or explicit non-state disposition;
- any invariant lacks owner, objects, enforcement or hostile test;
- any object/operation omits a reverse invariant reference;
- any concurrency-sensitive invariant lacks a complete concurrency profile;
- any effective-dated object lacks an overlap disposition;
- any conservation/exclusivity/uniqueness/sequence/one-value-once invariant lacks exact enforcement;
- any newly encountered invariant is not reconciled before block PASS.

This closes the register-input gap found by BL-P21-07.

---

# 4. EffectivePeriodNonOverlap compiler rule

Every effective-dated mutable family must declare:

- normalized scope identity;
- exact period/range type and boundary convention;
- whether overlap is prohibited, bounded or explicitly permitted;
- CC-3 constraint identity where exact;
- CC-4 predicate/serialization profile where not exactly representable;
- migration/correction behavior;
- concurrency test.

The current mandatory family inventory includes ownership, authority context, delegation/DOA, residency, operation/configuration/policy activation, field/schema/constraint activation, metric/operator/materiality/use policy, connector cutover, sourcing response schema, P07 basis/profile, AI capability/provider/evaluation profile and release compatibility phase.

A natural “close prior row + insert replacement row” sequence is never sufficient without the declared non-overlap mechanism.

---

# 5. Guard materialization and total order

CC-2 guard rows are:

- created eagerly with the authoritative parent; or
- materialized by idempotent insert-on-conflict before lock acquisition.

All guard locks use the one global tuple:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

No operation/profile may define a different local order.

---

# 6. Database exact-type boundary

The PostgreSQL adapter preserves all potentially lossy exact values:

- `numeric`/`decimal` as canonical decimal strings;
- `int8`/bigint as canonical integer strings at the boundary or checked `bigint` internally;
- no JSON conversion to JavaScript number;
- explicit parser inventory and round-trip tests.

The normative exact-decimal executor controls division scale and rounding. Approved SQL plans declare intermediate precision/scale and must prove equivalence.

---

# 7. Independent review and block checkpoints

Independent block review must be executed outside the authoring build session, may fail the block and records method/date/reviewer identity. The project owner remains final acceptance authority.

B02–B04, B14 and every V4/V6 block require dual independent hostile review unless a named qualified human reviewer participates.

B01 has checkpoints F1–F5, but only one final B01 PASS unlocks B02.

---

# 8. Candidate gate claim

The candidate claims:

- BL-P21-06 remains closed;
- BL-P21-07 is closed;
- W-100–W-119 are closed;
- all PA-G1–PA-G15 pass internally after recheck;
- 18-block count and ordering remain unchanged;
- all 92 requirements retain block/proof ownership;
- B01 remains business-empty and execution-locked.

P2.1/P2.2 freeze still requires complete internal hostile recheck and independent Claude Round 3 PASS.