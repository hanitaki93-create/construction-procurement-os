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
- Sourcing P01–P06 external status: **B1–B6 REMEDIATED / FINAL CLAUDE B5–B6 RECHECK PENDING**
- P07 commercial core: **P07A–P07D INTERNALLY INTEGRATED / EXTERNAL HOSTILE REVIEW LATER**
- Process invention: **PAUSED — no new core process without evidence/critique proving a gap**
- P1.2 formal close: **LOCKED pending primary-evidence gate + pending critiques**
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

## External sourcing critique — pending

Initial hostile review returned FAIL with B1–B4 plus ADR-0003 package-root anchoring.

First remediation/re-review concluded:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 `RequirementAllocation` lineage ACCEPTED;
- ADR-0003 / ADR-0004 anchoring CLEAN;
- P1.1 REOPEN = NO.

It introduced B5/B6:
- B5 hard scope/quantity conservation vs value/budget governance;
- B6 package-led early procurement bypassing allocation authority.

B5/B6 have been remediated. Final narrow recheck has not run because Claude usage is temporarily unavailable.

Canonical pending-control artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_FINAL_CRITIQUE_PENDING_V0_1.md`

No PASS is inferred. Downstream sourcing-dependent assumptions remain reversible.

## Current sourcing candidate mechanics

Allocation origin families:
1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

Routes:

`DemandLine → RequirementAllocation → TenderEvent`

or

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

or

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Then:

`TenderEvent → immutable TenderRelease/Addenda → TenderParticipant → bounded access → BidSubmission v1..n → source-linked normalization/internal evaluation → frozen ComparisonSnapshot → AwardRecommendation {evaluated_basis + contractable_agreed_basis} → ApprovalCase/DOA → AwardDecision → same RequirementAllocation lineage`

Key sourcing invariants:
- `ProcurementPackage` optional; ADR-0003 open;
- hard scope/quantity conservation separate from value/budget governance;
- supplier economic truth immutable/versioned;
- internal evaluation allowance cannot become supplier price;
- comparison freezes FX/tax transformation basis;
- award ≠ commitment;
- one RequirementAllocation lineage; no competing stage ledgers.

## Complete provisional operational process set

### P01 — Demand / Package / Cost Attribution
Defines demand/planning entry, RequirementAllocation, free-form/non-stock demand, cost attribution vs budget context vs reservation.

### P02 — Vendor Eligibility / Bidder Selection
Separates durable vendor identity, qualification, contextual eligibility, selection and invitation.

### P03 — Tender Release Control
Separates optional procurement package, TenderEvent and immutable TenderRelease/Addenda.

### P04 — External Tender Participation
Separates invitation/access, intent, decline, derived non-response, immutable bid revisions and low-friction off-platform capture.

### P05 — Bid Normalization / Leveling
Separates supplier truth, normalized representation, internal adjustment and supplier-confirmed negotiated basis.

### P06 — Recommendation / DOA / Award
Separates evaluated basis from contractable agreed basis, recommendation from approval, award from commitment.

### P07A — Commitment Formation / Original Baseline
Award does not create committed cost. An explicit formation/effectiveness event creates immutable original contractual baseline.

### P07B — Controlled Commitment Change
Potential/pending/approved/effective changes separate. Current approved commitment derives from original + effective approved changes. Corrections use reversal/counter-events.

### P07C — Goods Receipt / GRN / Invoice-Match Seam
Delivery, receipt, acceptance, invoice and payment separate. Partial/rejected/returned receipt first-class without requiring inventory ERP.

### P07D — Subcontract Valuation / Retention / Advance
Claim, assessment, certification, payable components, invoice and payment separate. Retention is withheld payable; advance is funding; recoupment reduces payable, not earned value.

### P08 — Commercial Position / Accounting Authority / ERP Interface
Field/event authority with `OWN / MIRROR / REFERENCE`, explicit export/acceptance states, connector capability contracts, freshness, conflict and reconciliation. No mandatory deep connector.

### P09 — Cross-Cutting Deterministic Control Plane
Permission + authority/approval + compliance/override + domain guards. Workflow never directly mutates commercial truth. Includes evidence, tasks, notifications, effective dating, idempotency and concurrency requirements without generic BPM.

### P10 — Long-Lead / Procurement Schedule Tracking
Required/planned/forecast/confirmed/actual dates separated; backward planning; actual milestones derive from transactional events where possible; master schedule/submittal/manufacture/shipping remain referenced boundaries.

### P11 — Commercial Closeout / Security / Warranty
Multi-obligation closeout; final account; retention release; security/guarantee release vs expiry; warranty/DLP triggers; termination path; commercial vs accounting closeout.

### P12 — External Technical / Material Approval Interface
Technical approval separate from commercial approval; exact revision/decision lineage; conditional gates and early-procurement exception; external CDE/lightweight/hybrid authority; no full submittal/CDE ownership required.

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

## Current integrated checkpoints

### P07 commercial-core checkpoint
`04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_P07_COMMERCIAL_CORE_CHECKPOINT_V0_1.md`

Internal verdict: **P07A–P07D internally coherent enough to carry forward provisionally.**

### Full P01–P11 workflow map
`04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_FULL_PROVISIONAL_WORKFLOW_MAP_V0_1.md`

This audit found one material workflow gap: external technical/material approval dependency. P12 was created to close that gap.

### Complete P01–P12 checkpoint
`04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_1.md`

Internal verdict:

**P01–P12 provide complete-enough provisional operational coverage for P1.2 secondary-reference modeling.**

This means process invention stops unless primary evidence, competitor reconstruction, golden-thread failure, legal requirement or hostile critique demonstrates a real missing lifecycle.

It does NOT mean:
- P1.2 PASS;
- ontology frozen;
- product-market fit proven;
- primary evidence gate satisfied.

## One-XL gravity guardrail

P07 remains the intended single XL commercial gravity well.

Reject future expansion that makes supporting processes independent XL systems:
- P08 must not become accounting ERP;
- P09 must not become programmable BPM;
- P10 must not become master scheduling software;
- P11 must not become banking/legal-claims management;
- P12 must not become full CDE/submittal management;
- P07C must not force inventory/warehouse ERP.

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
- contradiction/variant/unmatched-observation reconciliation;
- primary corroboration status for carried hypotheses;
- pending hostile critiques resolved.

## Anti-anchoring / anti-ETH rule

P01–P12 are a falsifiable hypothesis set. Independent primary cases must be captured verbatim before mapping to this model.

Do not add processes simply because another feature is imaginable.

New process area requires evidence of a genuine missing workflow from primary cases, competitor reconstruction, golden-thread failure, legal/regulatory requirement or hostile critique.

Technical architecture progress is not commercial validation. Later build/pilot investment must remain gated by real contractor pain, incumbent gap, implementation burden, willingness to pay and repeated usage.

## Next action

Shift P1.2 from **process invention** to **consolidation + contradiction/unmatched + primary-audit preparation**.

When Claude usage returns:
1. run the final narrow B5/B6 sourcing recheck first;
2. then run a separate integrated hostile review of P07/P01–P12 before any process/ontology freeze.

Until then, continue only reversible consolidation/evidence work; do not claim external PASS.