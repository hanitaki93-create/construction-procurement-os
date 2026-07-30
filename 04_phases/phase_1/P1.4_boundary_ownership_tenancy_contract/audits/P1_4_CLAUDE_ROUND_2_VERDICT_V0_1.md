# P1.4 — Claude External Hostile Audit Round 2 Verdict v0.1

**Date:** 2026-07-30  
**Status:** EXTERNAL HOSTILE AUDIT PASS  
**Audit source:** Claude review supplied by project owner after self-contained re-audit packet v0.3  
**P1.4 at audit time:** ACTIVE  
**P1.5 at audit time:** LOCKED

---

## 1. Verdict

> **PASS — P1.4 boundary contract can close; unlock final checkpoint/ADR reconciliation.**

Claude reported **no blockers**.

Both prior external-audit blockers were accepted as genuinely closed:

- **BL-12 CLOSED** — cross-tenant derived, aggregate and model-mediated use is now bounded by R01–R04.
- **BL-13 CLOSED** — `load-bearing` now has a semantic selection test through R05–R08.

---

## 2. Key external findings accepted for closure

### BL-12 closure

The audit accepted the outcome-based isolation rule: tenant business data must not be used to create, improve or influence another tenant's business outputs by default, even when source records are not directly disclosed.

The audit specifically accepted the distinction:

> shared model executable / agent infrastructure may be common; shared learned tenant business knowledge is not common by default.

This preserves single-agent, multi-agent, orchestration, shared foundation-model infrastructure and model replacement while preventing hidden cross-tenant memory, retrieval, adaptive learning, benchmarking and supplier-network intelligence.

The future governed shared-learning/benchmarking mode remains possible only as an explicit separately governed extension.

### BL-13 closure

The audit accepted the three-part `load-bearing` test:

1. governed outcome dependence;
2. counterfactual materiality; or
3. reconstruction necessity.

It also accepted that P1.5 may catalogue concrete load-bearing facts but may not redefine the P1.4 semantic test by implementation convenience.

---

## 3. Gate result

| Gate | Claude Round-2 result |
|---|---|
| G1 Tenant isolation | **PASS** |
| G2 Legal/project/ContractingAuthorityContext | **PASS** |
| G3 Authority coverage | **PASS** |
| G4 Internal authorization vs external grants | **PASS** |
| G5 Evidence/offboarding/deletion/retention/residency | **PASS** |
| G6 Classification boundary | **PASS** |
| G7 Effective/config binding | **PASS** |
| G8 Accounting/integration authority | **PASS** |
| G9 One-XL/adoption burden | **PASS** |

---

## 4. Regression result

- `P1.1 REOPEN = NO`
- `P1.2 REGRESSION = NO`
- `P1.3 REOPEN = NO`
- `SECOND XL = CLEAN`
- `A0–A3 ACTIVATION = CLEAN`

---

## 5. Non-blocking watches from round 2

Claude identified the following as watches only, not blockers:

- **W-14** — make explicit that cross-tenant AI/data-isolation constraints bind third-party model invocation and sub-processors as well as product-owned processing paths.
- **W-15** — remove any possible permissive reading of the word `silently` in shared-model wording; R03 already substantively requires a governed mode.
- **W-16** — within one tenant, model-mediated influence remains subject to the invocation's authorized context; ContractingAuthorityContext does not imply shared access.
- **W-17** — clarify the authorized-reader/reconstruction audience when reconciling ADR-0014.
- **W-18** — if a fact is later discovered to have been mis-catalogued as non-load-bearing, provenance cannot be fabricated retroactively; record the deficiency and correct prospectively.
- **W-19** — any future shared-learning withdrawal semantics must be honest about technical ability to remove already-learned influence.
- ADR-0010 GCC semantics debt remains.
- residency-category catalogue remains later NFR/legal work.
- export formats/jurisdictional portability obligations remain later product/legal/NFR work.

The P1.4 final freeze incorporates W-14–W-18 where semantic clarification is cheap and carries W-19 and jurisdiction-specific obligations as explicit future-mode/legal debt.

---

## 6. ADR impact recommended by external audit

Claude considered semantic decision supportable for:

- ADR-0005 — accounting/commercial ownership seam;
- ADR-0012 — external vendor identity/access;
- ADR-0014 — document provenance ownership/depth;
- ADR-0018 — workflow-to-financial seam;
- ADR-0020 — configuration binding in flight;
- ADR-0021 — field-level integration authority/staleness.

Claude recommended standalone decision control for:

- data residency / region declaration / governed migration;
- cross-tenant data isolation / shared-learning boundary.

Claude recommended **no status change** for ADR-0003, ADR-0004, ADR-0006, ADR-0008, ADR-0009, ADR-0010, ADR-0011, ADR-0015, ADR-0019, ADR-0022 and ADR-0023.

---

## 7. P1.5 readiness

> **READY AFTER P1.4 FINAL CHECKPOINT.**

Claude's final answer to the P1.4 closure question was **no**: no tenancy, authority, identity/grant, evidence lifecycle/residency, configuration-binding, AI/data-isolation, or accounting/integration decision remained ambiguous enough that P1.5 would need to choose the meaning or ownership of truth rather than its physical implementation.

---

## 8. Closure consequence

This external PASS completes the required dual-model hostile-audit gate together with the internal post-remediation PASS.

P1.4 may therefore proceed to:

1. final frozen boundary contract;
2. ADR reconciliation;
3. final verdict/checkpoint;
4. `PROJECT_STATE.md` transition;
5. P1.5 unlock.
