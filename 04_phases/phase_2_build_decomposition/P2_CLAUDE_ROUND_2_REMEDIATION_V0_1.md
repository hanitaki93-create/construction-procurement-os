# Phase 2 — Claude Round 2 Remediation v0.1

**Date:** 2026-08-02  
**Status:** REMEDIATION COMPLETE / INTERNAL RECHECK REQUIRED  
**Blocker:** BL-P21-07  
**Watches:** W-112–W-119  
**Code:** LOCKED

---

# 1. BL-P21-07 closure

The physical enforcement system no longer depends on an informally noticed invariant set.

Two controlling artifacts now exist:

1. `P2_1_INVARIANT_REGISTER_V0_1.md`
   - 102 stable invariant families;
   - exact class, frozen source, objects, owner, concurrency sensitivity, enforcement and proof;
   - `EFFECTIVE_PERIOD_NON_OVERLAP` as a first-class invariant;
   - bidirectional compiler obligations.
2. `P2_1_FROZEN_CLAUSE_INVARIANT_COVERAGE_MATRIX_V0_1.md`
   - MR-001–MR-092 mapped 92/92;
   - explicit hypothesis/legal/accessibility/control dispositions;
   - clause-level supplements for minimum credit, exclusive scope, capture/acceptance, cross-store references, indeterminate retry, report source cuts, effective-period overlap and communication effect.

Completeness is enforced in three directions:

- frozen source to register/disposition;
- register to owner/mechanism/test;
- object/operation to reverse invariant references.

A block cannot PASS when it encounters a load-bearing invariant absent from the register.

---

# 2. Effective-period non-overlap

`EFFECTIVE_PERIOD_NON_OVERLAP` applies to every effective-dated family through a compiler inventory, including fact ownership, authority context, role/delegation/DOA, residency, operation/configuration/policy activation, field/schema activation, metric/operator/materiality/use policy, connector cutover, sourcing response schema, P07 basis/profile, AI capability/provider/evaluation profile and release compatibility phase.

Default:

- exact range/scope: CC-3 GiST exclusion or partial unique constraint;
- inexact predicate: CC-4 SERIALIZABLE;
- not applicable: explicit registered disposition.

---

# 3. W-112 — guard-row materialization

A CC-2 guard must exist before `SELECT FOR UPDATE`.

Permitted:

- eager creation with the authoritative parent; or
- idempotent `INSERT ... ON CONFLICT DO NOTHING`, then lock and only then read contributors.

A missing-row lock is a failed concurrency profile.

---

# 4. W-113 — global total lock order

All guards use one global tuple:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

Ranks and encodings are product-owned and versioned. Profiles cannot define local ordering.

---

# 5. W-114 — lossy PostgreSQL decoders

The database adapter pins all potentially lossy types:

- `numeric`/`decimal` to canonical decimal string;
- `int8`/bigint to canonical integer string at the boundary, optionally checked `bigint` internally;
- JSON serialization never converts either to JavaScript `number`;
- tests cover values beyond `Number.MAX_SAFE_INTEGER`.

---

# 6. W-115 — division/intermediate scale

The versioned exact-decimal executor is normative.

Any approved SQL calculation plan declares exact operator sequence, input/output precision and scale, division intermediate scale, rounding mode and point, overflow/underflow disposition and equivalence vectors against the reference executor.

SQL division with implicit database scale selection is not load-bearing.

---

# 7. W-116 — B01 test-only fixture schema

B01 concurrency fixtures use an isolated `testkit_concurrency` schema created and dropped by test setup/teardown.

It is not a product migration, contains no tenant/procurement semantics and is unavailable to production runtime roles.

---

# 8. W-117 — independent review in a single-operator build

Every block requires a fresh independent review execution that:

- did not author the implementation;
- receives source, completion evidence, tests and frozen contracts;
- can return FAIL and keep successors locked;
- records reviewer identity, review method and date;
- leaves the project owner as final acceptance authority.

For B02–B04, B14 and every P07/AI gated block, dual independent hostile reviews are required unless a named qualified human reviewer participates.

Self-review in the same build session cannot satisfy the independent gate.

---

# 9. W-118 — B01 internal checkpoints

B01 has five internal checkpoints:

1. `B01-F1` workspace/toolchain/boundary rules;
2. `B01-F2` API/worker/internal/external shells;
3. `B01-F3` PostgreSQL/migration/concurrency/numeric/manifest foundations;
4. `B01-F4` object/scanner/local infrastructure/observability;
5. `B01-F5` CI/containers/security/SBOM/documentation/completion evidence.

Each checkpoint has exact tests and commits. Failure blocks final B01 PASS but does not require discarding already passed checkpoint commits.

B02 remains locked until the final B01 completion manifest passes.

---

# 10. W-119 — audit evidence completeness

The next external package must provide the actual contents, not only summaries, of:

- invariant register;
- 92-row coverage matrix;
- P2.1 controlling candidate;
- module/data/runtime map;
- NFR/security/deployment proof map;
- P2.2 18-block graph;
- requirement-to-block traceability;
- completion evidence template;
- B01-P01 controlling prompt.

A self-contained packet may concatenate exact files, but it must identify each source path/version and preserve the complete relevant text.

---

# 11. Closure claim

BL-P21-07 and W-112–W-119 are closed internally only if P2.1 candidate v0.4 incorporates this remediation and both completeness artifacts, P2.2/B01/completion-manifest revisions bind them, exhaustive internal hostile replay passes and independent Claude Round 3 passes.

No Phase 1 semantic decision, topology, state authority or block count changes.