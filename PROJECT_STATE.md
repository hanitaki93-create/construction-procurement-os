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
- P1.2 sourcing state: **B1–B6 REMEDIATED / FINAL NARROW HOSTILE RE-REVIEW REQUIRED**
- P07 Commitment / Commercial Core: **BLOCKED pending sourcing PASS**
- P1.3 formal competitor reconstruction: **LOCKED pending final P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 construction: LOCKED

## P1.2 operating rule

Missing independent primary evidence is not a day-to-day progress blocker.

Provisional architecture work may use logical/domain reasoning, official top-tier competitor documentation/training/product tours, professional best practice and high-quality public implementation material.

Such findings are `SECONDARY_REFERENCE` and reversible.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher-authority evidence may overturn lower-authority conclusions.

Secondary work cannot satisfy the independent-workflow gate, original bid-leveling artifact gate, or close evidence-dependent ADRs by itself.

## Hypothesis framing control

P01–P06 are falsifiable candidate decompositions, not accepted final entity architecture or validated contractor workflow.

Candidate labels may later collapse into events, projections, value objects, relationship records or disappear.

Independent primary cases must be captured verbatim before mapping to candidate concepts.

- `ADR-0003 Procurement structural root` remains `PROPOSED / PENDING`.
- `ADR-0004 PO and Subcontract type model` remains `PROPOSED / PENDING`.

## Current authoritative P1.2 sourcing artifacts

| Artifact | Status | Location |
|---|---|---|
| P01–P06 detailed v0.1 process artifacts | HISTORICAL PROVISIONAL INPUT | `04_phases/phase_1/P1.2_primary_workflow_evidence/processes/` |
| Sourcing Checkpoint v0.1 | SUPERSEDED | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_1.md` |
| Critique Remediation v0.1 | SUPERSEDED BY v0.2 FOR ALLOCATION SEMANTICS | `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_1.md` |
| Sourcing Checkpoint v0.2 | SUPERSEDED BY v0.3 | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_2.md` |
| Critique Remediation v0.2 | CURRENT BINDING PROVISIONAL DELTA | `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_2.md` |
| Sourcing Checkpoint v0.3 | CURRENT / READY FOR FINAL RE-REVIEW | `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_3.md` |
| Final Narrow Recheck Prompt v0.1 | READY | `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_FINAL_RECHECK_PROMPT_V0_1.md` |

Where historical process wording conflicts with current remediation/checkpoint, v0.2 remediation + v0.3 checkpoint control current provisional interpretation until later consolidation.

## Frozen P1.1 boundary

Frozen scope remains:
- 32 SPINE
- 28 THIN
- 9 INTERFACE-ONLY
- 15 OUT
- 84 total controlled areas

Frozen closed-graph hypothesis:

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

Hostile review/reviews continue to return **P1.1 REOPEN = NO**.

## P1.2 primary calibration

CAL-001 supports the real skeleton:

`look-ahead / lead-time coordination → requisition → RFQ/RFP → quotation → technical/commercial comparison → approval → {LPO/PO | subcontract} → delivery / external technical approval as applicable → GRN / downstream administration → Accounts handoff`

CAL-001 remains founder calibration and counts as 0 independent workflows.

## Sourcing hostile-review history

### Initial review — FAIL

Blockers:
1. B1 supplier-agreed basis ownership/provenance;
2. B2 evaluated amount vs contractable amount;
3. B3 competing allocation writers;
4. B4 missing FX/tax snapshot freeze.

Additional correction: candidate lineage implicitly privileged `ProcurementPackage`, partly anchoring ADR-0003.

### First remediation / re-review

Claude re-review concluded:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 `RequirementAllocation` lineage cure ACCEPTED;
- ADR-0003/ADR-0004 anchoring CLEAN;
- P1.1 REOPEN = NO.

New blockers introduced by the remediation:
- B5 hard quantity/scope correctness was conflated with value/budget control;
- B6 package-led planned procurement could reach tender without first entering the single allocation authority.

## Current B5/B6 remediation

### B5 — allocation scope vs value separated

`RequirementAllocation` now owns requirement-scope consumption only.

Hard basis options:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

For measurable demand:

`sum(active leaf allocated quantity) <= current authorized requirement quantity`

No routine allocation-level override exists.

Additional quantity requires prior governed change to the authorized requirement basis.

For lump-sum/document-driven scope, explicit scope partition identity provides the hard conservation dimension. Candidate references include section, BOQ/price-schedule line/group, deliverable, lot or defined work-scope segment.

Default: one authorized scope partition cannot be consumed by multiple active award/commitment leaves unless the authorized scope basis explicitly permits shared/joint responsibility.

Estimated/target/planning value is non-authoritative allocation metadata only.

Award above estimate is a commercial variance/approval/budget event, not an allocation correctness error.

P06 may use budget variance for governance; P07 / ADR-0005 / ADR-0011 later resolve authoritative commitment-budget-accounting ownership.

### B6 — all routes enter allocation before tender

Closed allocation origin families:
1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

`PLANNED_REQUIREMENT` is an authorized planning basis anchored to:

`Project → Budget/Cost Structure`

Closed V1 planning source evidence types:
- `ESTIMATE_LINE`;
- `PROCUREMENT_PLAN_LINE`;
- `LONG_LEAD_PLAN_ITEM`.

Current candidate routes:

Demand-led direct:

`DemandLine → RequirementAllocation → TenderEvent`

Demand-led packaged:

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

Planned/package-led before MR:

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Later detailed demand reconciles to the existing allocation lineage and cannot create a second allocation for already-covered scope.

## Other sourcing corrections retained

### Supplier commercial basis
Every supplier-confirmed material economic change becomes an immutable `BidSubmission` revision. Clarification/email/thread evidence cannot itself be authoritative contractable basis.

Buyer-on-behalf capture preserves supplier commercial origin, immutable source evidence, ingestion actor and timestamps/review status.

### Award basis
`AwardRecommendation` / `AwardDecision` preserve:
- `evaluated_basis` — internal comparison basis;
- `contractable_agreed_basis` — supplier-confirmed basis approved for contract conversion.

P07 may consume only the approved `contractable_agreed_basis`.

### FX/tax
`BidSubmission` preserves source currency/tax posture.

`ComparisonSnapshot` freezes applied FX rate/source/fixing date and tax/calculation/rounding basis so historical ranking is reproducible.

### Participation simplification
- `TenderParticipant` groups candidate/selection/invitation shell at tender×vendor grain while keeping facts dated and distinct;
- eligibility evaluation defaults to dated participant event/value;
- vendor qualification remains reusable vendor evidence;
- durable preferred-bidder object removed;
- external access grant remains separate security capability.

## Current integrated sourcing lineage

From either origin family:

`RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ TenderEvent`
`→ immutable TenderRelease vN/Addenda`
`→ TenderParticipant`
`→ bounded external access`
`→ BidSubmission v1..n`
`→ source-linked normalization + internal evaluation`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ effective DOA ApprovalCase`
`→ AwardDecision`
`→ same RequirementAllocation leaf/leaves bound to award`
`→ P07 commitment binding to same lineage`

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

Run the **final narrow hostile re-review** of B5/B6 using:

`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_FINAL_RECHECK_PROMPT_V0_1.md`

P07 remains blocked until:

`PASS — sourcing subgraph coherent; proceed to P07`