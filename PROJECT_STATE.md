# PROJECT STATE

**Updated:** 2026-07-28  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: Phase 1 — Deterministic Architecture & Product Specification
- Active subphase: **P1.2 — Primary Workflow Evidence**
- P1.0 final gate: **CP-05 PASS / CLOSED**
- P1.1 final gate: **PASS — FROZEN / P1.2 UNLOCKED**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.3 competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## Current authoritative artifacts

| Artifact | Status | Location |
|---|---|---|
| Phase 1 Roadmap v1.3 | FROZEN / GOVERNING | `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md` |
| P1.1 Final Verdict | PASS | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FINAL_VERDICT.md` |
| P1.1 Frozen Baseline v1.0 | FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md` |
| P1.2 Workplan v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKPLAN_V0_1.md` |
| P1.2 Workflow Reconstruction Packet v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKFLOW_RECONSTRUCTION_PACKET_V0_1.md` |
| P1.2 Registers | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/` |
| Source Preservation Policy | ACTIVE | `02_research/sources/SOURCE_PRESERVATION_POLICY_V1_0.md` |
| Research control registers | ACTIVE | `02_research/control/` |

## P1.1 final result

### Frozen structural/sampling envelope

Initial P1.2 filter:

**UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.**

Main contractors may be emphasized for primary sampling because they expose downstream buying plus upstream commercial context. Specialist contractors remain deliberate posture/control cases.

Not frozen as assumptions: company size, revenue, project-concurrency band, willingness to pay, pricing, sales cycle, implementation model, or commercially optimal geography.

### Frozen structural wedges

1. **Closed Procurement Control Graph** — test whether one deterministic graph can explain in-scope procurement/current-commercial position without a parallel ledger containing unique authoritative truth.
2. **Commercial Commitment Truth** — test award/cost attribution/commitment/change/valuation plus retention/advance/recoupment positions while accounting ownership remains open.
3. **Task-Focused External Tender Participation** — test bounded secure supplier actions including `decline/no-bid` without a broad persistent portal.

### Frozen scope

- **32 SPINE**
- **28 THIN**
- **9 INTERFACE-ONLY**
- **15 OUT**
- **84 total controlled areas**

Protective rule: `IMPOSSIBLE`-to-retrofit areas may only be SPINE or INTERFACE-ONLY; never THIN/OUT.

P1.1 retrofit audit checked all 43 THIN/OUT rows and found zero IMPOSSIBLE classifications.

### Frozen closed graph target

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

Authority/approval, provenance, bounded actions, audit and concurrency remain cross-cutting transition properties.

### Frozen burden rules

- cost: `S / M / L / XL`;
- retrofittability: `CHEAP / EXPENSIVE / IMPOSSIBLE`;
- `IMPOSSIBLE` → SPINE or INTERFACE-ONLY;
- max one independent XL SPINE gravity well unless an IMPOSSIBLE invariant forces reopening rather than demotion;
- `XL + CHEAP` cannot be SPINE;
- standard configuration to first live tender target ≤5 working days from clean inputs;
- bespoke named connectors required before first live tender = 0.

Current single independent XL SPINE gravity well: **commitment/change/valuation/commercial truth**.

## P1.1 audit scope note

The external hostile reviewer certified the P1.1 boundary **as described** and explicitly did not claim independent repository execution inspection.

Repository execution was checked separately before recording the PASS, including the 43-row THIN/OUT retrofit audit and the FIN-12 / PRC-15 / WEDGE-01 remediation artifacts.

## Forward-owned items from P1.1

- supplier non-response/timeout semantics → **P1.5 state-machine design**; P1.2 should observe actual behavior/terminology;
- FIN-12 retention/advance/recoupment positions → **P1.5 projection over the canonical commercial cost-event store**, never a parallel mutable balance store.

These are not P1.2 blockers.

## P1.2 objective

Reconstruct how contractors actually procure and commercially administer work **before deep competitor reconstruction** is allowed to define the domain.

Required end-state includes:
- 3–5 independent contractor workflow reconstructions;
- at least 3 independent workflows;
- at least 1 UAE case;
- at least 1 case outside the founder's prior trade/project pattern;
- real artifacts where obtainable;
- at least 1 bid-leveling artifact decomposed to line/revision/adjustment level;
- role/artifact map for every workflow step;
- variant, workaround, contradiction and unmodeled-observation registers;
- supplier-side friction evidence;
- primary corroboration status for incumbent-derived hypotheses.

Primary evidence is verbatim-by-default and normalization is a later logged transformation.

## P1.2 active control artifacts

Created:
- `P1_2_WORKPLAN_V0_1.md`
- `P1_2_WORKFLOW_RECONSTRUCTION_PACKET_V0_1.md`
- `registers/workflows.csv`
- `registers/role_artifact_map.csv`
- `registers/variants.csv`
- `registers/workarounds.csv`
- `registers/unmodeled_observations.csv`
- `registers/contradictions.csv`
- `registers/primary_corroboration.csv`

## Current blocking condition

**P1.3 remains locked until the P1.2 primary-evidence gate passes.**

P1.2 may contradict frozen P1.1 hypotheses. Any resulting boundary change must preserve raw evidence and use normal ADR/change control rather than silently editing the frozen baseline.

## Next action

Begin P1.2 execution with a calibration workflow reconstruction using the raw-capture packet, then acquire independent contractor cases. The calibration case cannot by itself satisfy the independent-workflow gate.
