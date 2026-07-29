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
- P1.2 state: **SOURCING P01–P06 HOSTILE REVIEW FAIL / B1–B4 REMEDIATED / NARROW RE-REVIEW REQUIRED**
- P07 Commitment / Commercial Core: **BLOCKED pending sourcing re-review PASS**
- P1.3 formal competitor reconstruction: **LOCKED pending final P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## P1.2 operating rule

Missing independent primary evidence is **not a day-to-day progress blocker**.

The project may continue provisionally using logical/domain reasoning, official top-tier competitor documentation/training/product tours, professional best practice and high-quality public implementation material.

Such findings are `SECONDARY_REFERENCE` and remain reversible.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher-authority evidence may overturn lower-authority conclusions.

Secondary reference work cannot satisfy the independent-workflow gate, original bid-leveling artifact gate, or close evidence-dependent ADRs by itself.

## Hypothesis framing control

P01–P06 are **falsifiable candidate decompositions**, not accepted entity architecture or validated contractor workflow.

Candidate labels may later collapse into events, projections, value objects, relationship records or disappear.

Independent primary cases must be captured verbatim before mapping to candidate concepts.

`ADR-0003 Procurement structural root` remains `PROPOSED / PENDING`.

`ADR-0004 PO and Subcontract type model` remains `PROPOSED / PENDING`.

## Current authoritative artifacts

| Artifact | Status | Location |
|---|---|---|
| Phase 1 Roadmap v1.3 | FROZEN / GOVERNING | `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md` |
| P1.1 Frozen Baseline v1.0 | FROZEN | `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md` |
| P1.2 Workplan v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_WORKPLAN_V0_1.md` |
| CAL-001 founder calibration | PARTIAL / CALIBRATION | `04_phases/phase_1/P1.2_primary_workflow_evidence/cases/CAL_001_PERFLEX_FOUNDER_CALIBRATION_V0_1.md` |
| Secondary Reference Policy v0.1 | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SECONDARY_REFERENCE_POLICY_V0_1.md` |
| Best-Practice Reference Baseline v0.1 | SECONDARY / PROVISIONAL | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_BEST_PRACTICE_REFERENCE_V0_1.md` |
| P01–P06 detailed process artifacts v0.1 | HISTORICAL PROVISIONAL INPUT | `04_phases/phase_1/P1.2_primary_workflow_evidence/processes/` |
| Sourcing Subgraph Checkpoint v0.1 | SUPERSEDED FOR CURRENT INTEGRATION | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_1.md` |
| Sourcing Critique Remediation v0.1 | BINDING PROVISIONAL DELTA | `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_1.md` |
| Sourcing Subgraph Checkpoint v0.2 | CURRENT / READY FOR RE-REVIEW | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_2.md` |
| Secondary Reference Sources | ACTIVE | `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/secondary_reference_sources.csv` |

Where v0.1 process wording conflicts with the remediation artifact/checkpoint v0.2, the newer remediation/checkpoint controls current provisional interpretation until later consolidation.

## Frozen P1.1 boundary

Frozen scope remains:
- 32 SPINE
- 28 THIN
- 9 INTERFACE-ONLY
- 15 OUT
- 84 total controlled areas

Frozen closed-graph hypothesis:

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

The hostile review concluded **P1.1 REOPEN = NO**.

## P1.2 primary calibration

CAL-001 supports a real sourcing-to-commitment skeleton:

`look-ahead / lead-time coordination → requisition → RFQ/RFP → quotation → technical/commercial comparison → approval → {LPO/PO | subcontract} → delivery / external technical approval as applicable → GRN / downstream administration → Accounts handoff`

CAL-001 remains founder calibration and counts as **0 independent workflows**.

## P01–P06 hostile review result

External hostile review returned:

`FAIL — remediate blockers before P07`

Blockers:
1. supplier-confirmed negotiated/agreed basis had no singular truth owner and buyer-ingested submissions lacked explicit provenance separation;
2. award recommendation risked conflating internal evaluated amount with supplier-agreed contractable amount;
3. `DemandAllocation` + `AwardAllocation` + future commitment allocation created competing quantity/balance writers;
4. frozen comparison did not explicitly freeze applied FX/tax transformation basis.

Additional required correction:
- canonical lineage implicitly routed every sourcing path through `ProcurementPackage`, partially closing ADR-0003 in practice.

No P1.1 reopening was required.

## Remediation now applied

### Supplier commercial basis

Every supplier-confirmed economic change that may become contractual must materialize as an immutable `BidSubmission` revision.

Clarification/thread/email is evidence, not the authoritative commercial basis.

Submission provenance separates:
- commercial origin = supplier;
- capture mode = supplier direct or buyer on behalf;
- source artifact;
- supplier confirmation identity where available;
- buyer ingestion actor where applicable;
- receipt/capture timestamps and review status.

### Award basis

`AwardRecommendation` and `AwardDecision` now carry:
- `evaluated_basis` — internal comparison-derived decision basis;
- `contractable_agreed_basis` — supplier-confirmed basis authorized for contractual conversion.

P07 may consume only the approved contractable basis.

### Allocation authority

`DemandAllocation` and `AwardAllocation` are superseded as separate authorities by one canonical `RequirementAllocation` lineage at requirement grain.

Sourcing, award and commitment are progression/bindings on the same lineage.

Split creates child allocation leaves and closes the parent from active-balance counting.

`sum(active leaf allocations) <= authorized basis` unless controlled overbuy/change exists.

P07 must bind commitment to existing allocation leaf/leaves instead of creating another allocation ledger.

### FX/tax reproducibility

`BidSubmission` preserves source currency/tax posture.

`ComparisonSnapshot` freezes applied FX rate, source, fixing date/time/policy, tax-normalization basis and rounding/calculation reference required to reproduce historical rankings.

### ADR-0003 neutrality

`ProcurementPackage` is optional.

Valid candidate routes include:

`DemandLine → RequirementAllocation → TenderEvent`

and

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

and package-led planning before detailed demand:

`Estimate / Procurement Plan / Long-lead Trigger → ProcurementPackage → TenderEvent`

ADR-0003 remains open.

### Object simplification

Current provisional simplifications:
- `BidderCandidate` + `BidderSelection` + invitation lifecycle → `TenderParticipant` at tender×vendor grain, while preserving distinct dated facts/transitions;
- `EligibilityEvaluation` → dated event/value on TenderParticipant by default;
- `PreferredBidderSelection` durable object removed; working preference becomes comparison annotation/event;
- `ExternalAccessGrant` remains separate security capability.

### Approval history

Approval reproducibility must preserve policy version, actual approver identity, resolved role/role-assignment context and delegation evidence.

Standard V1 approval configuration should have a small default core; additional dimensions remain additive.

### Bid reveal

Blind-bid/open/controlled-reveal mode must have a deterministic reveal condition and auditable actual reveal time/actor.

## Current integrated sourcing candidate lineage

Demand-led direct:

`DemandLine → RequirementAllocation → TenderEvent`

Demand-led packaged:

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

Package-led planning:

`Estimate / Procurement Plan / Long-lead Trigger → ProcurementPackage → TenderEvent`

Then:

`TenderEvent → immutable TenderRelease vN/Addenda → TenderParticipant → bounded access → BidSubmission v1..n → normalization/internal evaluation → frozen ComparisonSnapshot → AwardRecommendation {evaluated_basis + contractable_agreed_basis} → effective DOA ApprovalCase → AwardDecision → same RequirementAllocation lineage → P07`

## P1.2 final closure — still later

Before formal P1.2 close and P1.3 deep competitor reconstruction opens, project still requires:
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

Run a **narrow hostile re-review** of the sourcing remediation/checkpoint v0.2.

P07 remains blocked until that review returns:

`PASS — sourcing subgraph coherent; proceed to P07`
