# Phase 2 — V1/V2 and Build Sequencing Decision v1.0

**Date:** 2026-08-02  
**Status:** DECIDED / CONTROLLING  
**Decision owner:** Project owner, with architecture recommendation  
**Applies to:** B01–B15 deterministic program

---

# 1. Decision

The ordered sequence is:

1. Phase 2 freezes.
2. B01 may execute after a separate explicit implementation authorization.
3. V1 contractor/supplier evidence begins no later than B01 and may run in parallel with B01 because B01 is business-empty, reversible and establishes no workflow hypothesis as truth.
4. V1 must PASS before V2 is finalized.
5. V2 uses V1 evidence to produce and test the throwaway workflow prototype with the frozen participant/comprehension gate.
6. B02 and every later non-throwaway product block remain locked until both V1 and V2 return independent PASS decisions.
7. A V1 or V2 FAIL triggers revision or reopening of the affected product/architecture clauses before B02; it is not overridden by sunk B01 work.

---

# 2. Why this sequence controls

The largest remaining existential risk is not infrastructure. It is building a technically correct procurement bureaucracy that users experience as extra work.

B01 is safe before field validation because it contains only reusable technical foundations:

- repository/toolchain;
- runtime shells;
- database transaction and migration foundation;
- invariant/concurrency/ownership validators;
- object/scanner adapters;
- observability, CI, containers and security gates.

B01 explicitly excludes tenant/business tables, authentication, product operations, evidence acceptance, procurement workflow, reporting, P07 and AI.

B02 is the first block that creates durable product execution semantics. It therefore waits until procurement teams and suppliers recognize the problem model and workflow direction.

---

# 3. V1 gate

V1 must gather the named contractor/supplier evidence required by the frozen validation contract and issue an independent `ValidationGateDecision`.

V1 is not satisfied by:

- architecture review;
- builder opinion;
- generic ERP research;
- feature interest without real workflow evidence;
- project-owner enthusiasm;
- B01 technical success.

V1 must be able to revise or kill workflow hypotheses.

---

# 4. V2 gate

V2 follows V1 and tests a throwaway prototype rather than production code.

The controlling target remains:

- at least 8 internal participants;
- at least 8 external participants;
- zero unresolved critical meaning misunderstandings in the final round;
- explicit burden, duplication, completion and recovery observations;
- independent PASS/FAIL decision.

V2 must prove that normal procurement work feels simpler than email/Excel/folders, while complexity remains inside the system.

---

# 5. B01 execution authorization

This sequencing decision removes the sequencing lock from B01, but it does **not** itself authorize code execution.

B01 may start only after the project owner gives a separate explicit implementation instruction. The first executable artifact is:

`04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V1_0_CANDIDATE.md`

frozen by the Phase-2 checkpoint at its exact Git blob identity.

---

# 6. Locks retained

- B02–B15: locked pending V1 PASS + V2 PASS + predecessor block PASS.
- B16–B17 P07: additionally locked pending V4.
- B18 AI: additionally locked pending V6.
- No validation evidence may be fabricated from architecture/build results.

---

# 7. Final disposition

`V1 THEN V2; B01 MAY RUN IN PARALLEL WITH V1 AFTER EXPLICIT AUTHORIZATION; B02+ WAIT FOR V1 AND V2 PASS.`
