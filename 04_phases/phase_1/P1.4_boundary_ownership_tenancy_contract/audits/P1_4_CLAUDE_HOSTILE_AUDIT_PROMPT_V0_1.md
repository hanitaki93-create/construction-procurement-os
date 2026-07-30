# Claude Prompt — P1.4 Hostile Audit v0.1

Use GitHub `hanitaki93-create/construction-procurement-os` on current `main` as canonical truth.

You are fully updated through the start of P1.4. Do not restart P1.0–P1.3 research and do not rely on a recap from me instead of the repository.

Audit the newly completed internal P1.4 Boundary, Ownership & Tenancy Contract work.

First read:

1. `PROJECT_STATE.md`
2. `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/audits/P1_4_EXTERNAL_HOSTILE_REVIEW_PACKET_V0_1.md`
3. every P1.4 artifact listed in that packet, with `P1_4_BOUNDARY_CONTRACT_CANDIDATE_V0_1.md` as the primary audit target
4. current `02_research/control/adr_log.csv` before making any ADR claim

The internal audit initially failed on three narrow blockers — multi-party/JV authority ambiguity, cross-tenant relationship discovery through reusable login identity, and over-broad residency wording. New v0.2 contracts remediate them and the narrow internal recheck now returns PASS. Treat that as a claim to attack, not as proof.

Be hostile and independent.

Your job is to decide whether P1.4 has actually frozen the V1 boundary strongly enough that P1.5 can design the physical commercial core without having to re-decide tenancy, system authority, identity/grants, evidence lifecycle/residency, effective configuration binding, or accounting/integration ownership.

Keep these constraints unless you find a real contradiction:
- P1.1 frozen scope/beachhead;
- P1.2 primary evidence hierarchy and FT-02/06/09/10 debt;
- P1.3 closed; no competitor-research restart;
- P07 is the only independent XL gravity well;
- A0–A3 must work without P07, ERP/CDE connector, mandatory supplier network or advanced AI;
- no full ERP/GL/AP/cash, CDE/records management, generalized BPM, WMS or supplier-network gravity;
- P1.5 and product code remain locked during audit.

Do not fail P1.4 for database/schema/API implementation details that are safely deferred. Fail it when an unresolved boundary choice would force P1.5 to redefine ownership/authority, leak tenants, create dual truth, create another XL, or violate first-rail activation constraints.

Use the exact verdict structure required by `P1_4_EXTERNAL_HOSTILE_REVIEW_PACKET_V0_1.md`:

- VERDICT
- BLOCKERS
- WATCHES / NON-BLOCKING DEBT
- GATE CHECK
- REGRESSION CHECK
- ADR IMPACT
- P1.5 READINESS

For each blocker, cite the exact artifact/section, give a concrete counterexample and specify the narrowest remediation. Do not solve blockers by inventing broad new product scope.

A clean PASS should only be returned if there is no remaining authority/tenancy/residency/identity choice that could force P1.5 commercial-core replanning.