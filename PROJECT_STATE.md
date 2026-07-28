# PROJECT STATE

**Updated:** 2026-07-28  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: Phase 1 — Deterministic Architecture & Product Specification
- Active subphase: **P1.1 — Thesis, Beachhead & Release Boundary**
- P1.0 final gate: **CP-05 PASS — P1.1 UNLOCKED**
- P1.1 current state: **HOSTILE CRITIQUE 01 = SOUND WITH CORRECTIONS / REMEDIATION IMPLEMENTED / RECHECK DUE**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## Current authoritative P1.1 artifacts

| Artifact | Status | Location |
|---|---|---|
| P1.1 Workplan | ACTIVE | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_WORKPLAN_V0_1.md` |
| Critique 01 dispositions | IMPLEMENTED / AWAITING RECHECK | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_CRITIQUE_01_DISPOSITIONS.md` |
| Structural Envelope v0.2 | PROVISIONAL | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_STRUCTURAL_ENVELOPE_V0_2.md` |
| Wedge Hypotheses v0.2 | PROVISIONAL | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_WEDGE_HYPOTHESES_V0_2.md` |
| Scope Matrix v0.2 | COMPLETE CORRECTED DRAFT | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_SCOPE_MATRIX_V0_2.csv` |
| SPINE Re-test v0.2 | COMPLETE | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_SPINE_RETEST_V0_2.md` |
| Burden Budget v0.2 | COMPLETE CORRECTED DRAFT | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_BURDEN_BUDGET_V0_2.md` |
| Integrated Boundary Draft v0.2 | COMPLETE / NOT FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_INTEGRATED_BOUNDARY_DRAFT_V0_2.md` |

v0.1 P1.1 artifacts remain historical provisional predecessors and are not current decision truth.

## Critique 01 corrections now implemented

1. Commercial persona wording replaced by a **structural envelope**.
2. `mid-market` and fixed `5–25 project` range removed as architecture constraints.
3. Contracting posture is modelled; main contractor is a primary sampling posture, not a hardcoded tenant type.
4. Scope rows now name unresolved ADR dependencies; scope cannot silently settle a `PRIMARY_REQUIRED` ADR.
5. AP/GL moved from OUT to **INTERFACE-ONLY / ADR-0005 dependent**.
6. WEDGE-03 is explicitly a minimum task-focused tender-response surface; broad supplier portal remains OUT.
7. Closed graph now includes **budget/cost structure, vendor + minimum compliance state, and valuation/progress event**.
8. Certification/payment boundary explicit: valuation substrate SPINE; detailed certification THIN; payment status INTERFACE; banking/payment execution OUT.
9. General workflow engine remains OUT only with durable/versioned shared approval primitives.
10. Inventory remains OUT; GRN/receipt is commercial valuation evidence, not stock truth.
11. Old 230.2/240 burden score retired; budget now uses **cost × retrofittability ordinals plus numeric guardrails**.
12. All original 37 SPINE areas re-tested under strict closed-lifecycle/retrofit-impossible rule.

## Corrected structural/sampling envelope

Initial P1.2 sampling/deployment filter:

**UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.**

Primary sampling may emphasize main contractors; specialist contractors remain a deliberate posture/control population.

Not decided: company size, project-concurrency band, willingness to pay, pricing, sales cycle, commercial implementation model, or commercially optimal geography.

## Corrected wedges

1. **Closed Sourcing-to-Commitment Control Path** — one deterministic lifecycle/evidence/authority model from demand to governed award/commitment handoff.
2. **Commercial Commitment Truth** — cost attribution + commitment + controlled change + valuation/progress events while accounting ownership remains open.
3. **Task-Focused External Tender Participation** — bounded secure supplier tender actions without requiring a broad portal.

## Corrected scope classification

82 candidate areas classified:
- **30 SPINE**
- **28 THIN**
- **9 INTERFACE-ONLY**
- **15 OUT**

Key demotions from SPINE: vendor taxonomy depth, trade/package taxonomy, procurement plan, structured bid form, recommendation, external API breadth, connector runtime framework, export/BI breadth, dashboard UI.

New mandatory SPINE nodes: minimum vendor compliance/eligibility state and valuation/progress event substrate.

## Corrected burden budget

No summed pseudo-unit score.

Axes:
- implementation cost: `S / M / L / XL`;
- retrofittability: `CHEAP / EXPENSIVE / IMPOSSIBLE`.

Numeric guardrails:
- independent XL SPINE gravity wells: **max 1**;
- `XL + CHEAP` cannot be SPINE;
- standard-config tenant to first live tender: **≤5 working days** from clean onboarding inputs;
- bespoke named connectors required before first live tender: **0**.

Current single XL SPINE gravity well: commitment/change/valuation/commercial truth.

## Corrected closed sub-graph target

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → Quote/Revision → Comparison → Award Proposal → Commitment → [Controlled Change] → Valuation/Progress Event → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

Authority/approval, provenance, bounded action, audit and concurrency are cross-cutting transition properties.

## P1.1 gate status

- structural/sampling beachhead: **PROVISIONALLY YES**
- three falsifiable structural wedges: **YES**
- all candidate areas classified: **YES — 82/82**
- implementation burden budget explicit: **YES — ordinal + numeric guardrails**
- exclusions/revisit rules explicit: **YES**
- attractive gravity wells deliberately deferred: **YES**
- no everything-is-core outcome: **YES**
- hostile critique resolved: **REMEDIATION COMPLETE / RECHECK REQUIRED**

## Blocking condition

**P1.1 remains NOT FROZEN and P1.2 remains LOCKED until hostile recheck accepts the corrected v0.2 integrated boundary.**

## Next action

Return only the correction delta to the hostile auditor. Ask whether Critique 01 is resolved and whether any concrete blocker remains before P1.1 freeze. Do not reopen P1.0 or redesign later phases.