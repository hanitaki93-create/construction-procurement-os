# CHG-0008 — SSV-1 Operational-MVP Deferral v1.0

**Date:** 2026-08-12  
**Status:** OWNER-AUTHORIZED GOVERNANCE AMENDMENT  
**Trigger:** owner review of the deployed B02 dashboard found that the current shell exposes only limited meaningful practitioner actions and does not yet provide a realistic multi-role/multi-state procurement operating surface.  
**Semantic change:** NONE to procurement, authority, tenancy, entitlement, persistence or audit invariants.  
**Gate timing change:** YES — SSV-1 is deferred from immediate B02 closure to the first genuinely operational MVP/user-validation stage.

## 1. Owner decision

The owner expressly authorizes the current B02 SSV-1 practitioner gate to be deferred rather than executed against an immature dashboard shell.

The existing SSV-1 requirement is **not waived or deleted**. It is moved to the first product stage where practitioners can exercise meaningful real workflows, roles, permissions, states and procurement-domain actions without artificial coaching or placeholder-only interpretation.

## 2. Rationale

The current B02 surface proves the governed product shell, workspace/project context, session/persistence seams and entitlement/restriction foundations. It is not yet a representative procurement operating product. At present, the only substantial user command exposed is project creation; role switching, realistic authority differentiation and wider procurement workflows are not yet available in a form suitable for independent practitioner validation.

Running the three-practitioner exercise now would therefore produce weak or misleading evidence about the eventual product rather than useful usability/comprehension evidence.

## 3. Revised acceptance sequence

Effective immediately:

`B02 technical implementation green`
`→ B03 provisional implementation + deterministic/hostile verification`
`→ combined post-C1/C2 independent audit`
`→ if audit PASS, B02/B03 may be owner-accepted for successor implementation`
`→ B04/B05/B06 procurement creation wave may proceed`
`→ continue building until the first genuinely operational procurement MVP/user-validation surface exists`
`→ execute SSV-1 with at least three eligible non-builder construction practitioners`
`→ capture remediation findings and feed them into the product backlog/change-control process before production/release acceptance`

## 4. What remains mandatory

- SSV-1 remains a real future validation obligation.
- At least three eligible non-builder construction practitioners remain the minimum external validation cohort unless a later owner-authorized amendment changes that acceptance standard.
- The owner may act as the primary alpha/product-acceptance tester, but because the owner has materially shaped CPOS requirements and product decisions, owner testing does not replace the later independent practitioner cohort.
- Any major usability, workflow, authority or domain issue discovered during owner or practitioner testing must be treated as a genuine product finding and may require architecture/change-control reconciliation if it reaches a load-bearing invariant.
- The combined B02/B03 audit remains mandatory before B04-B06 are unlocked under the current accelerated plan.
- This amendment does not weaken tenant/RLS, authority/DOA, entitlement, immutable-history, concurrency, idempotency, audit or financial/procurement truth controls.

## 5. Supersession scope

This amendment supersedes only the **timing/blocking role** of SSV-1 in CHG-0007 and the corresponding immediate B02 completion timing in CHG-SSS-001. All substantive SSV-1 practitioner-validation expectations remain preserved for the operational-MVP stage.

## 6. Product-owner testing philosophy

The owner explicitly expects the first real working procurement system to become the primary product-learning arena. This is intentional: CPOS is being built on a professional reverse-engineered deterministic foundation so that later real-world findings can lead to additions, removals and workflow changes without discarding the underlying governance model.

The architecture and building blocks are therefore treated as a strong controlled foundation, not as a claim that future user testing will reveal no major product changes.
