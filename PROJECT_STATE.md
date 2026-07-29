# PROJECT STATE

**Updated:** 2026-07-29  
**Canonical status file:** this document

## Position

- Project: **Construction Procurement OS**
- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.2 — Primary Workflow Evidence + Secondary Best-Practice Calibration**
- P1.0: **CP-05 PASS / CLOSED**
- P1.1: **PASS / FROZEN**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.2 provisional operational model: **P01–P12 COMPLETE-ENOUGH / INTERNAL HOSTILE AUDIT PASSED FOR CONTINUATION / NOT FROZEN**
- Sourcing P01–P06 external status: **B1–B5 CLOSED / B6 REMEDIATED AGAIN / BL-01 + BL-02 REMEDIATED / FINAL NARROW RECHECK REQUIRED**
- P07/P08: **PROVISIONAL / INTERNALLY INTEGRATED / EXTERNAL REVIEW B PREPARED**
- P09–P12 + full graph: **PROVISIONAL / EXTERNAL REVIEW C PREPARED**
- Process invention: **PAUSED — no new core process without evidence/critique proving a gap**
- P1.2 formal close: **LOCKED pending primary-evidence gate + hostile-review passes**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 deterministic construction: LOCKED

## Operating rule

Missing independent primary evidence or temporary reviewer unavailability is not a day-to-day progress blocker.

Provisional work may use logical/domain reasoning, official top-tier competitor documentation/training/product tours, professional best practice and high-quality public implementation material.

These findings are `SECONDARY_REFERENCE / PROVISIONAL / REVERSIBLE`.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher-authority evidence may overturn lower-authority conclusions.

## External sourcing critique history

### Initial hostile review

Returned FAIL with:
- B1 supplier-agreed basis ownership/provenance;
- B2 evaluated vs contractable award basis;
- B3 competing allocation writers;
- B4 FX/tax freeze;
- ADR-0003 package-root anchoring concern.

### First remediation/re-review

Concluded:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 `RequirementAllocation` lineage ACCEPTED;
- ADR-0003 / ADR-0004 anchoring CLEAN;
- P1.1 REOPEN = NO.

Raised:
- B5 hard scope/quantity conservation vs value/budget governance;
- B6 package-led early procurement bypassing allocation authority.

### Second remediation/re-review

Concluded:
- **B5 CLOSED**;
- B6 remained OPEN;
- BL-01 raised: downward basis revision could fall below already allocated/awarded/committed scope;
- BL-02 raised: multiple planning evidence records could create parallel planned requirement lineages over the same physical scope;
- active-leaf release semantics and controlled-UOM semantics requested as non-blocking confirmations;
- ADR-0003 / P1.1 remained consistent.

## Current sourcing remediation — v0.3/v0.4

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_3.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_4.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_FINAL_RECHECK_PROMPT_V0_2.md`

### Authorized requirement basis

Every route starts from an effective authorized requirement basis whose owner type is:
1. `DEMAND_LINE`; or
2. `PLANNED_REQUIREMENT`.

Both owner types obey the same semantic contract for:
- scope coverage;
- quantity/UOM;
- basis version;
- effective dating;
- authorization/evidence;
- change/reconciliation.

This is a semantic role/interface only. It does not close ADR-0003 physical/root architecture.

### Planning evidence vs requirement authority

`ESTIMATE_LINE`, `PROCUREMENT_PLAN_LINE`, and `LONG_LEAD_PLAN_ITEM` are source evidence types.

They do not automatically create independent allocation authority.

Multiple such records may support one canonical `PLANNED_REQUIREMENT` for the same declared scope.

### Scope uniqueness

For exclusive scope:

> one declared physical/business scope coverage may have only one active independent authorized requirement basis owner at a time.

Before overlapping scope becomes active, resolve by:
- attach as evidence;
- reconcile to existing;
- split scope;
- supersede under governance;
- explicit shared/joint responsibility where double procurement is not implied.

Free-form scope requires controlled human scope-identity confirmation before allocation authority becomes active. AI may suggest overlap but cannot silently create/merge authority.

### Allocation basis

`RequirementAllocation` conserves scope/quantity only, not market price.

Basis types:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

Hard quantity conservation occurs in the authoritative basis UOM.

Cross-UOM allocation requires a governed deterministic conversion with factor/source/version/precision/rounding/provenance; otherwise allocation is blocked.

Estimated/target/planning value remains non-authoritative allocation context. Award price variance is commercial/DOA/budget governance.

### Active leaves

An active leaf currently consumes/reserves part of effective authorized scope.

Tender failure, re-tender, bidder withdrawal, supplier replacement or award supersession do not automatically release requirement scope.

Scope leaves counting only through explicit history-preserving split/release/cancel/fulfilled-close/effective downstream reduction semantics.

Award and commitment bind existing leaves; they do not add another allocation balance.

### Later detailed-demand reconciliation

A later DemandLine does **not** retroactively overwrite an earlier authorized planned basis.

Outcomes:
- match/corroborate;
- expansion through a new effective basis version before additional allocation;
- reduction through release/resize/split of releasable scope before the lower basis becomes effective;
- reduction below award/commitment exposure remains a pending basis-reduction/reconciliation proposal until downstream exposure is governed/reduced.

Until a reduction is resolved, the prior basis remains effective and the later demand is preserved as reconciliation/variance evidence.

There is no normal authoritative state where active committed leaves are silently unbacked by the effective basis.

P07 may bind new/effective commitment only to active leaves backed by the current effective basis and consistent with unresolved reconciliation conditions.

An already-effective commitment remains commercial/legal history until governed downstream action changes it.

## Current sourcing routes

Demand-led direct:

`DemandLine → RequirementAllocation → TenderEvent`

Demand-led packaged:

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

Planned before detailed MR:

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Then:

`TenderEvent → immutable TenderRelease/Addenda → TenderParticipant → bounded access → BidSubmission v1..n → source-linked normalization/internal evaluation → frozen ComparisonSnapshot → AwardRecommendation {evaluated_basis + contractable_agreed_basis} → ApprovalCase/DOA → AwardDecision → same RequirementAllocation lineage`

Key sourcing invariants retained:
- ProcurementPackage optional;
- supplier economic truth immutable/versioned;
- internal evaluation allowance cannot become supplier price;
- comparison freezes FX/tax basis;
- award ≠ commitment;
- one RequirementAllocation lineage;
- hard scope conservation separate from value governance;
- basis reductions cannot become effective below unresolved downstream exposure;
- exclusive scope cannot have parallel active basis owners.

## Complete provisional operational process set

### P01 — Demand / Package / Cost Attribution
Demand/planning entry, authorized requirement basis, RequirementAllocation, free-form/non-stock demand, cost attribution vs budget context.

### P02 — Vendor Eligibility / Bidder Selection
Vendor identity, qualification, contextual eligibility, selection and invitation.

### P03 — Tender Release Control
Optional package, TenderEvent, immutable TenderRelease/Addenda.

### P04 — External Tender Participation
Invitation/access, intent, decline, non-response, immutable bid revisions, controlled off-platform capture.

### P05 — Bid Normalization / Leveling
Supplier truth, normalized representation, internal adjustment, supplier-confirmed negotiated basis.

### P06 — Recommendation / DOA / Award
Evaluated vs contractable basis, recommendation vs approval, award vs commitment.

### P07A — Commitment Formation / Original Baseline
Explicit commitment formation/effectiveness creates immutable original contractual baseline.

### P07B — Controlled Commitment Change
Potential/pending/approved/effective changes separated; corrections use reversal/counter-events.

### P07C — Goods Receipt / GRN / Invoice-Match Seam
Delivery, receipt, acceptance, invoice and payment separated without forcing inventory ERP.

### P07D — Subcontract Valuation / Retention / Advance
Claim, assessment, certification, payable, retention, advance/recoupment, invoice and payment separated.

### P08 — Commercial Position / Accounting Authority / ERP Interface
Field/event authority, OWN/MIRROR/REFERENCE, export/acceptance/reconciliation, freshness/conflict.

### P09 — Cross-Cutting Deterministic Control Plane
Permissions, DOA, compliance, evidence, tasks, effective dating, concurrency/idempotency without generic BPM.

### P10 — Long-Lead / Procurement Schedule Tracking
Required/planned/forecast/confirmed/actual milestones and procurement expediting overlay.

### P11 — Commercial Closeout / Security / Warranty
Final account, retention/security release, warranty/DLP, multi-obligation closeout.

### P12 — External Technical / Material Approval Interface
Versioned technical/material approval dependency without requiring full CDE ownership.

## Integrated P01–P12 graph

`Project + Budget/Cost Structure`
`→ {DemandLine | PLANNED_REQUIREMENT}`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ contextual vendor eligibility`
`→ TenderEvent → immutable TenderRelease/Addenda`
`→ TenderParticipant / bounded external access`
`→ BidSubmission revisions`
`→ normalization / internal evaluation`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation + DOA ApprovalCase`
`→ AwardDecision`
`→ effective commitment baseline`
`→ controlled approved changes`
`→ {goods accepted receipt | subcontract certified earned value}`
`→ retention / advance / payable components`
`→ accounting authority/interface/reconciliation`
`→ final account / retention-security release / warranty-DLP / closeout`

Overlays:
- P09 authority/compliance/evidence control;
- P10 long-lead schedule/expediting;
- P12 technical approval dependencies;
- P08 source authority/integration semantics.

## Internal validation / continuation

Complete P01–P12 checkpoint:
`04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_1.md`

Golden-thread execution currently has:
- `FAIL_INTERNAL = 0`;
- seven `PASS_WITH_WATCH` threads;
- remaining threads `PASS_PROVISIONAL`.

This authorizes reversible P1.2 consolidation only. It does not mean external PASS, ontology freeze, P1.2 PASS, or build authorization.

## Reviewer batching strategy

When external review continues:

### Review A — sourcing final delta
Run `P1_2_SOURCING_FINAL_RECHECK_PROMPT_V0_2.md` against v0.3 remediation + v0.4 checkpoint.

### Review B — P07/P08
Commercial core + accounting seam together.

### Review C — P09–P12 + complete graph
Control-plane/burden/completeness review.

After remediation, rerun golden threads before primary gate/structural freeze.

## One-XL gravity guardrail

P07 remains the intended single XL commercial gravity well.

Reject expansion that makes:
- P08 accounting ERP;
- P09 programmable BPM;
- P10 master scheduling software;
- P11 banking/legal claims platform;
- P12 full CDE/submittal platform;
- P07C inventory/warehouse ERP.

## ADRs intentionally still open

- ADR-0003 Procurement structural root
- ADR-0004 PO/Subcontract type model
- ADR-0005 Accounting/commercial ownership seam
- ADR-0007 Long-lead tracking object model
- ADR-0008 Workflow engine generality
- ADR-0010 GCC semantics/localization
- ADR-0011 Budget/cost attribution timing/ownership
- ADR-0012 External vendor identity/access
- ADR-0013 Event-derived status
- ADR-0014 Document/evidence provenance depth
- ADR-0015 Posting/finalization/reversal/correction
- ADR-0018 Workflow→financial-state seam
- ADR-0019 Effective dating
- ADR-0020 In-flight configuration binding
- ADR-0021 Field-level integration authority/staleness
- ADR-0022 Money representation/rounding/calculation order
- ADR-0023 Numbering/concurrency/fiscal semantics

## P1.2 closure requirements remain unmet

Before formal P1.2 close:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 outside founder prior pattern;
- at least 1 original contractor bid-leveling artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched reconciliation;
- primary corroboration status;
- hostile Review A/B/C blockers resolved.

## Anti-anchoring / anti-ETH rule

P01–P12 remain a falsifiable hypothesis set.

Independent primary cases must be captured verbatim before mapping to this model.

Technical architecture progress is not commercial validation.

## Next action

Run external **Review A v0.2** now.

If sourcing passes, proceed to already-prepared Review B for P07/P08 rather than reopening process-by-process critique.
