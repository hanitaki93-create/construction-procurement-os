# PROJECT STATE

**Updated:** 2026-07-28  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: Phase 1 — Deterministic Architecture & Product Specification
- Active subphase: **P1.1 — Thesis, Beachhead & Release Boundary**
- P1.0 final gate: **CP-05 PASS — P1.1 UNLOCKED**
- P1.1 current state: **INTEGRATED BOUNDARY DRAFT COMPLETE / HOSTILE CRITIQUE DUE**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## Current authoritative artifacts

| Artifact | Status | Location |
|---|---|---|
| Phase 1 Roadmap v1.3 | FROZEN / GOVERNING | `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md` |
| P1.0 Control System v0.4 | CURRENT CONTROL BASELINE | `04_phases/phase_1/P1.0_research_control/P1_0_CONTROL_SYSTEM_V0_4.md` |
| CP-05 Final Verdict | PASS | `04_phases/phase_1/P1.0_research_control/audits/CP_05_FINAL_VERDICT.md` |
| P1.1 Workplan | ACTIVE | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_WORKPLAN_V0_1.md` |
| P1.1 Beachhead Candidates | PROVISIONAL | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_BEACHHEAD_CANDIDATES_V0_1.md` |
| P1.1 Wedge Hypotheses | PROVISIONAL | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_WEDGE_HYPOTHESES_V0_1.md` |
| P1.1 Scope Matrix | COMPLETE DRAFT | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_SCOPE_MATRIX_V0_1.csv` |
| P1.1 Burden Budget | COMPLETE DRAFT | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_BURDEN_BUDGET_V0_1.md` |
| P1.1 Integrated Boundary Draft | COMPLETE / NOT FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_INTEGRATED_BOUNDARY_DRAFT_V0_1.md` |
| Source Preservation Policy | ACTIVE | `02_research/sources/SOURCE_PRESERVATION_POLICY_V1_0.md` |
| Research control registers | ACTIVE | `02_research/control/` |

## P1.1 draft result

### Provisional beachhead

**UAE private-sector mid-market main contractors** with a centralized procurement/commercial function, approximately 5–25 concurrently active building projects or equivalent multi-project procurement load, and no fully integrated enterprise procurement/commercial operating layer.

Candidate B (upper-mid/enterprise GCC main contractors) remains the ceiling/integration comparator. Candidate C (specialist subcontractors) remains a falsification/control population.

### Wedges

1. **Procurement Control Loop** — planned demand/MR/package → tender → comparison → recommendation → approval → award.
2. **Commercial Commitment Truth** — award → cost attribution → commitment → controlled changes → derived commercial balances without owning GL/AP.
3. **Low-Friction Supplier Participation + Tender Evidence** — guest participation, controlled bid/revision evidence and comparison-ready requested data without heavyweight portal dependency.

### Scope classification

80 candidate areas classified:
- **37 SPINE**
- **20 THIN**
- **7 INTERFACE-ONLY**
- **16 OUT**

No `important later` bucket remains.

### Implementation burden

- hard envelope: **240 weighted burden units**
- current draft: **230.2**
- reserve: **9.8**
- highest workstream: commitments/changes/commercial truth = **38.1**, below the 40-unit mandatory sub-slicing trigger

The burden model keeps difficult truth/authority/integration substrates while explicitly deferring separate gravity wells such as full accounting, CDE/BIM, inventory, general no-code/workflow, broad ERP connector portfolio, native/offline, marketplace and deterministic-stage AI.

### Expected V1 closed sub-graph

`Company/Legal Entity → Project → User/Authority → Vendor → Cost/WBS/Budget Context → Procurement Plan → {MR | Package} → RFQ → Invite/Guest Access → Quote/Revision → Comparison → Recommendation → Approval → Award → Commitment → Change → Derived Commercial Balance → Evidence/Audit → Export/Reconciliation`

Dependencies leaving the V1 graph terminate at explicit interfaces for accounting/ERP, estimating/budget source, CDE/document source, e-signature and project schedule.

## P1.1 gate status

- named beachhead: **PROVISIONALLY YES**
- three falsifiable wedges: **YES**
- 100% candidate areas classified: **YES — 80/80**
- numeric burden budget: **YES**
- explicit exclusions/revisit conditions: **YES**
- attractive features deliberately deferred: **YES — multiple**
- no everything-is-core outcome: **YES**
- hostile critique resolved: **NO**

## Current market-context note

Current official UAE sources (`SRC-0047`–`SRC-0050`) support an active construction environment and continuing contractor-sector digitalization. They are context for geography selection only; P1.2 must establish actual workflow pain, buying behavior and ontology.

## Blocking condition

**P1.1 must not freeze or unlock P1.2 until the integrated boundary draft receives hostile critique and all blocking findings are resolved.**

## Next action

Run the planned hostile critique against the integrated P1.1 boundary as one object: beachhead + wedges + scope matrix + burden budget + exclusions + expected closed sub-graph. Do not continue into P1.2 before that critique.