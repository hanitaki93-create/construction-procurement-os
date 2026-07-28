# PROJECT STATE

**Updated:** 2026-07-28  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: Phase 1 — Deterministic Architecture & Product Specification
- Active subphase: **P1.2 — Primary Workflow Evidence + Secondary Best-Practice Calibration**
- P1.0 final gate: **CP-05 PASS / CLOSED**
- P1.1 final gate: **PASS — FROZEN / P1.2 UNLOCKED**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.2 state: **CALIBRATION EXECUTED / SECONDARY REFERENCE LEARNING ACTIVE / PRIMARY AUDIT LATER**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## Operating rule added during P1.2

Missing independent primary evidence is **not a reason to stop learning or architecture work**.

When primary contractor evidence is incomplete, the project may continue provisionally using:
- logical/domain reasoning;
- official top-tier competitor documentation;
- official training/product-tour/video material;
- professional best-practice guidance;
- high-quality public implementation/case material.

Such findings are classified `SECONDARY_REFERENCE` and remain auditable/reversible later.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher-authority evidence may overturn lower-authority conclusions.

Secondary references may guide provisional specification and define strong later tests. They **cannot** satisfy P1.2 independent-workflow counts, original bid-leveling artifact requirements, or silently close PRIMARY_REQUIRED ADRs.

Formal P1.3 remains the later deep competitor-reconstruction phase. P1.2 reference learning is narrower and exists to prevent ignorance-driven design while primary evidence is incomplete.

Canonical policy: `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SECONDARY_REFERENCE_POLICY_V0_1.md`.

## Current authoritative artifacts

| Artifact | Status | Location |
|---|---|---|
| Phase 1 Roadmap v1.3 | FROZEN / GOVERNING | `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md` |
| P1.1 Final Verdict | PASS | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FINAL_VERDICT.md` |
| P1.1 Frozen Baseline v1.0 | FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md` |
| P1.2 Workplan v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKPLAN_V0_1.md` |
| Workflow Reconstruction Packet v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKFLOW_RECONSTRUCTION_PACKET_V0_1.md` |
| CAL-001 Perflex founder calibration | PARTIAL / CALIBRATION | `04_phases/phase_1/P1.2_primary_workflow_evidence/cases/CAL_001_PERFLEX_FOUNDER_CALIBRATION_V0_1.md` |
| Secondary Reference Policy v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SECONDARY_REFERENCE_POLICY_V0_1.md` |
| Best-Practice Reference Baseline v0.1 | SECONDARY / PROVISIONAL | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_BEST_PRACTICE_REFERENCE_V0_1.md` |
| CAL-001 Reference Gap Matrix v0.1 | SECONDARY / PROVISIONAL | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_CAL001_REFERENCE_GAP_MATRIX_V0_1.md` |
| Artifact Eligibility Control v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_ARTIFACT_ELIGIBILITY_V0_1.md` |
| Independent Case Intake v0.1 | ACTIVE / AUDIT INPUT | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_EXTERNAL_CASE_INTAKE_V0_1.md` |
| P1.2 Registers | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/` |
| Secondary Reference Sources | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/secondary_reference_sources.csv` |
| Source Preservation Policy | ACTIVE | `02_research/sources/SOURCE_PRESERVATION_POLICY_V1_0.md` |

## P1.1 frozen baseline

### Structural/sampling envelope

**UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.**

Main contractors may be emphasized for primary sampling. Specialist contractors remain deliberate posture/control cases.

Not frozen as assumptions: company size, revenue, project-concurrency band, willingness to pay, pricing, sales cycle, implementation model, or commercially optimal geography.

### Frozen structural wedges

1. **Closed Procurement Control Graph** — test whether one deterministic graph can explain in-scope procurement/current-commercial position without a parallel ledger containing unique authoritative truth.
2. **Commercial Commitment Truth** — test award/cost attribution/commitment/change/valuation plus retention/advance/recoupment positions while accounting ownership remains open.
3. **Task-Focused External Tender Participation** — test bounded secure supplier actions including `decline/no-bid` without a broad persistent portal.

### Frozen scope

- 32 SPINE
- 28 THIN
- 9 INTERFACE-ONLY
- 15 OUT
- 84 total controlled areas

Protective rule: `IMPOSSIBLE`-to-retrofit areas may only be SPINE or INTERFACE-ONLY; never THIN/OUT.

## P1.2 execution completed so far

### CAL-001 — Perflex founder calibration

Observed high-confidence skeleton:

`look-ahead / lead-time coordination → requisition → RFQ/RFP → quotation → technical/commercial comparison → approval → {LPO/PO | subcontract} → delivery / external technical approval as applicable → GRN / downstream administration → Accounts handoff`

CAL-001 remains calibration only and counts as 0 independent workflows.

Primary-evidence gaps include budget/cost authority, exact DOA, bidder/invite/response states, change lifecycle, subcontract valuation/certification, retention/advance/recoupment, accounting field authority and parallel tracker behavior.

### Secondary best-practice pass

Official reference learning now includes Procore, Autodesk BuildingConnected, Oracle Primavera Unifier, CMiC and ProcurePro.

Current provisional mature reference graph:

`Demand {requisition | package} → approval/eligibility → tender package → bidder invite → submitted bid/revision → canonical bid lines → leveling/adjustments → award decision + justification → commitment {PO | subcontract} → approved changes → {goods receipt | subcontract valuation} → retention/advance/recoupment positions → current commercial projection → accounting/payment interface`

Cross-cutting expectations:
- authority/DOA;
- compliance/override;
- provenance/version identity;
- event history;
- cost-code/CBS attribution;
- concurrency/idempotency;
- external technical/document dependencies.

This reference graph is not contractor reality. It is a provisional benchmark to be audited later.

### CAL-001 gap matrix

CAL-001 UNKNOWN areas now have provisional best-practice expectations and explicit later audit questions for:
- budget/cost code timing;
- DOA;
- bidder selection/invites;
- revisions/leveling;
- award justification;
- PO/subcontract divergence;
- changes;
- valuation/certification;
- retention/advance/recoupment;
- accounting authority;
- technical approvals;
- procurement schedule/status;
- compliance gating.

## Artifact eligibility result

The existing wires/cables comparison sheet is DERIVED / NOT PRIMARY because it was generated in an earlier assistant workflow from supplier quotations and MR/project quantities.

It can test normalization mechanics but does not satisfy the original contractor bid-leveling gate.

Current verified original contractor bid-leveling artifact count: **0 / 1 required for final P1.2 audit**.

## P1.2 final gate — still later

Before P1.2 can formally close and P1.3 deep competitor reconstruction opens, the project still requires:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 case outside founder prior pattern;
- at least 1 original contractor bid-leveling artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched-observation reconciliation;
- primary corroboration status for carried hypotheses.

These are **audit/closure requirements, not day-to-day progress blockers**.

## Next action

Continue P1.2 provisionally from the mature secondary-reference model, working area-by-area to define candidate mechanics and edge cases. Maintain explicit `SECONDARY_REFERENCE` provenance. Independent primary cases will later audit/corroborate/contradict the provisional model rather than stopping current progress.
