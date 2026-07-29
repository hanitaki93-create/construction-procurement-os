# PROJECT STATE

**Updated:** 2026-07-29  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: Phase 1 — Deterministic Architecture & Product Specification
- Active subphase: **P1.2 — Primary Workflow Evidence + Secondary Best-Practice Calibration**
- P1.0 final gate: **CP-05 PASS / CLOSED**
- P1.1 final gate: **PASS — FROZEN / P1.2 UNLOCKED**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.2 state: **SOURCING SUBGRAPH P01–P06 COMPLETE / READY FOR HOSTILE CRITIQUE / PRIMARY AUDIT LATER**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## P1.2 operating rule

Missing independent primary evidence is **not a day-to-day progress blocker**.

The project may continue provisionally using:
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

Secondary references may guide provisional specification and define strong later tests. They cannot satisfy P1.2 independent-workflow counts, original bid-leveling artifact requirements, or silently close PRIMARY_REQUIRED ADRs.

## Current authoritative artifacts

| Artifact | Status | Location |
|---|---|---|
| Phase 1 Roadmap v1.3 | FROZEN / GOVERNING | `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md` |
| P1.1 Frozen Baseline v1.0 | FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md` |
| P1.2 Workplan v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKPLAN_V0_1.md` |
| CAL-001 Perflex founder calibration | PARTIAL / CALIBRATION | `04_phases/phase_1/P1.2_primary_workflow_evidence/cases/CAL_001_PERFLEX_FOUNDER_CALIBRATION_V0_1.md` |
| Secondary Reference Policy v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SECONDARY_REFERENCE_POLICY_V0_1.md` |
| Best-Practice Reference Baseline v0.1 | SECONDARY / PROVISIONAL | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_BEST_PRACTICE_REFERENCE_V0_1.md` |
| P01–P06 detailed process artifacts | SECONDARY / PROVISIONAL | `04_phases/phase_1/P1.2_primary_workflow_evidence/processes/` |
| Sourcing Subgraph Checkpoint v0.1 | READY FOR HOSTILE CRITIQUE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_1.md` |
| Sourcing Hostile Critique Prompt v0.1 | READY | `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_HOSTILE_CRITIQUE_PROMPT_V0_1.md` |
| Secondary Reference Sources | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/secondary_reference_sources.csv` |

## P1.1 frozen baseline

Frozen scope remains:
- 32 SPINE
- 28 THIN
- 9 INTERFACE-ONLY
- 15 OUT
- 84 total controlled areas

Frozen closed-graph hypothesis:

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

No P1.1 reopening is proposed before hostile critique.

## P1.2 primary calibration

CAL-001 supports a real sourcing-to-commitment skeleton:

`look-ahead / lead-time coordination → requisition → RFQ/RFP → quotation → technical/commercial comparison → approval → {LPO/PO | subcontract} → delivery / external technical approval as applicable → GRN / downstream administration → Accounts handoff`

CAL-001 remains founder calibration and counts as **0 independent workflows**.

Final P1.2 closure still requires independent workflows and real primary artifacts later.

## P1.2 detailed process work completed

### P01 — Demand / Package Initiation + Cost Attribution

Provisional findings carried forward:
- `Demand`, `DemandLine`, `ProcurementPackage` and allocation relationship remain distinct;
- MR-led and package-led procurement both valid;
- free-form/non-stock procurement valid;
- cost attribution, budget context and budget reservation are separate concepts;
- partial sourcing/conversion is first-class;
- commitment must have valid financial attribution or governed exception;
- downstream status should derive from allocations/events rather than parallel tracker truth.

### P02 — Vendor Eligibility + Bidder Selection

Key finding:

**qualification ≠ contextual eligibility ≠ bidder selection ≠ invitation.**

A supplier may be generally qualified but ineligible for one package, eligible but not selected, or selected under an explicit exception.

### P03 — Tender Package + Release Control

Key finding:
- mutable package planning truth is not supplier-facing release truth;
- a `TenderEvent` owns the solicitation attempt/round;
- a released tender version is immutable evidence;
- supplier-facing post-release change requires addendum/new controlled release.

### P04 — External Tender Participation

Key finding:
- external participation remains bounded/task-focused;
- invitation/access, will-bid, decline/no-bid, non-response and submission are distinct facts;
- email/PDF response must remain possible through controlled on-behalf ingestion with immutable source provenance;
- broad supplier portal membership is not required.

### P05 — Bid Normalization / Leveling / Comparison

Key truth separation:

`supplier-origin truth → normalized mapping → internal evaluation adjustment → supplier-confirmed/agreed commercial basis`

Internal leveling may explain the decision but may not silently alter supplier-origin commercial truth.

A frozen comparison snapshot is the exact decision basis passed to award governance.

### P06 — Recommendation / DOA Approval / Governed Award

Key finding:

`working preference ≠ formal recommendation ≠ approval ≠ award decision ≠ commitment`

Award governance preserves:
- exact bid/agreed basis;
- exact comparison snapshot;
- recommendation version;
- effective DOA/policy version;
- actual approvers/delegation;
- exceptions/conditions;
- split/partial allocation;
- staleness/reconfirmation before commitment.

Approved award may represent pending/intended exposure but does not become authoritative committed cost until P07.

## Integrated sourcing subgraph P01–P06

Current provisional lineage:

`DemandLine`
`→ DemandAllocation`
`→ ProcurementPackage`
`→ supplier qualification / contextual eligibility / bidder selection`
`→ TenderEvent`
`→ immutable TenderRelease vN + Addenda`
`→ invitation / bounded external access`
`→ {will bid | decline/no-bid | undeclared/non-response}`
`→ BidSubmission v1..n`
`→ canonical mapping + normalization + internal adjustments`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation vN`
`→ effective DOA ApprovalCase`
`→ AwardDecision + AwardAllocation`
`→ P07 commitment handoff`

Cross-process invariants:
- immutable lineage;
- no destructive revision;
- no silent allocation inflation;
- contextual vendor status;
- immutable market release;
- decline ≠ non-response;
- supplier truth ≠ leveled truth;
- negotiated economics require supplier/agreement evidence;
- frozen award basis;
- award ≠ commitment;
- effective-dated DOA;
- compliance re-check at later commercial gates;
- bounded external participation;
- AI cannot silently create commercial truth;
- blind-bid/confidentiality enforced beneath UI.

## Internal integration self-audit

P01–P06 passed internal integration sufficiently to reach hostile critique.

Known attack points carried into critique:
1. object inflation — durable objects vs events/projections/value objects;
2. accidental generalized BPM/workflow-engine gravity;
3. truth ownership overlap across package/tender/release/bid/comparison/award;
4. version/provenance implementation burden;
5. low-friction supplier UX vs security/provenance;
6. internal leveling leaking into contractual commercial basis;
7. legal semantics of soft/provisional award;
8. split-award concurrency/double-allocation risk;
9. email/offline ingestion attribution;
10. irreversible omissions before P07.

No obvious blocker was accepted by internal self-audit; this is deliberately not a PASS verdict.

## Critique checkpoint

**P07 Commitment / Change / Valuation must not start until the P01–P06 hostile critique returns PASS or blockers are remediated.**

Canonical prompt:
`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_HOSTILE_CRITIQUE_PROMPT_V0_1.md`

Critique must return:
- BLOCKERS;
- NON-BLOCKING WATCH ITEMS;
- P1.1 REOPEN?;
- exact PASS/FAIL verdict.

## P1.2 final closure — later

Before P1.2 can formally close and P1.3 deep competitor reconstruction opens, project still requires:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 case outside founder prior pattern;
- at least 1 original contractor bid-leveling artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched-observation reconciliation;
- primary corroboration status for carried hypotheses.

These are audit/closure requirements, not day-to-day progress blockers.

## Next action

Run the **P1.2 sourcing hostile critique** against P01–P06. If PASS, proceed to P07 Commitment / Commercial Core. If FAIL, remediate only blocker-level issues before recheck.
