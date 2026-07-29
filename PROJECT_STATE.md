# PROJECT STATE

**Updated:** 2026-07-29  
**Canonical status file:** this document

## Position

- Project: Construction Procurement OS
- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.2 — Primary Workflow Evidence + Secondary Best-Practice Calibration**
- P1.0: **CP-05 PASS / CLOSED**
- P1.1: **PASS / FROZEN**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.2 sourcing P01–P06: **PROVISIONAL / B1–B6 REMEDIATED / FINAL EXTERNAL RECHECK PENDING**
- P07 commercial core: **PROVISIONAL P07A–P07D INTERNALLY INTEGRATED / EXTERNAL CRITIQUE LATER**
- P1.2 formal close: **LOCKED pending primary-evidence gate + critiques**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 deterministic construction: LOCKED

## Operating rule

Missing independent primary evidence or temporary reviewer unavailability is **not a day-to-day progress blocker**.

The project may continue provisionally using:
- logical/domain reasoning;
- official top-tier competitor documentation/training/product tours;
- professional best practice;
- high-quality public implementation/case material.

These findings are `SECONDARY_REFERENCE / PROVISIONAL / REVERSIBLE`.

Authority order remains:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher-authority evidence may overturn lower-authority conclusions.

## Sourcing critique status

The initial hostile sourcing review returned FAIL with B1–B4 plus ADR-0003 anchoring concern.

First remediation/re-review concluded:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 `RequirementAllocation` lineage ACCEPTED;
- ADR-0003 / ADR-0004 anchoring CLEAN;
- P1.1 REOPEN = NO.

It introduced two narrow blockers:
- B5 hard scope/quantity conservation vs value/budget governance;
- B6 package-led procurement bypassing allocation authority.

B5/B6 were remediated in current sourcing checkpoint v0.3.

The final narrow external recheck is **PENDING because Claude usage is temporarily unavailable**. No PASS is inferred.

Canonical pending-control artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_FINAL_CRITIQUE_PENDING_V0_1.md`

Continuation rule:
- later P1.2 research may proceed provisionally;
- sourcing-dependent assumptions remain reversible;
- no sourcing freeze or formal P1.2 closure until final critique runs;
- if critique later fails, affected downstream assumptions must be remediated rather than protected by sunk work.

## Current sourcing candidate mechanics

Two closed allocation origin families:
1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

Candidate routes:

`DemandLine → RequirementAllocation → TenderEvent`

or

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

or early planning:

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Then:

`TenderEvent → immutable TenderRelease/Addenda → TenderParticipant → bounded access → BidSubmission v1..n → normalization/internal evaluation → frozen ComparisonSnapshot → AwardRecommendation {evaluated_basis + contractable_agreed_basis} → effective DOA ApprovalCase → AwardDecision → same RequirementAllocation lineage`

Key sourcing invariants retained:
- `ProcurementPackage` optional; ADR-0003 remains open;
- hard scope/quantity conservation is separate from value/budget governance;
- supplier economic truth is immutable/versioned;
- buyer evaluation allowances never become supplier price;
- comparison freezes FX/tax transformation basis;
- award ≠ commitment;
- no competing sourcing/award/commitment allocation ledgers.

## P07 commercial-core work completed provisionally

### P07A — Commitment Formation / Original Baseline

Artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/processes/P07_COMMITMENT_FORMATION_BASELINE_V0_1.md`

Key candidate mechanics:
- award approval does not itself create authoritative committed cost;
- commitment effectiveness/formation is explicit and policy/evidence driven;
- original effective baseline becomes immutable commercial history;
- current approved commitment later derives from original + effective approved changes;
- commitment consumes approved `contractable_agreed_basis`, never internal evaluated allowance;
- existing RequirementAllocation leaves bind through commitment;
- `Commitment` is only a semantic role at P07; ADR-0004 physical PO/Subcontract structure remains OPEN.

### P07B — Controlled Commitment Change

Artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/processes/P07B_CONTROLLED_COMMITMENT_CHANGE_V0_1.md`

Key mechanics:
- potential/pending/approved/effective change are distinct;
- original commitment is not rewritten;
- current approved commitment = original + effective approved changes;
- pending change may affect forecast only;
- value-only change does not create allocation capacity;
- added scope requires prior authorized requirement-basis change;
- positive, negative, zero-value and time-only changes supported;
- effective correction uses void/reversal/counter-change lineage.

### P07C — Goods Receipt / GRN / Invoice-Match Seam

Artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/processes/P07C_GOODS_RECEIPT_GRN_INVOICE_MATCH_SEAM_V0_1.md`

Key mechanics:
- delivery, receipt, acceptance, supplier invoice and payment are distinct facts;
- partial receipt first-class;
- rejection/damage/return preserve history;
- accepted quantity drives fulfillment;
- 2-way/3-way match may be policy driven;
- receipt control works for free-form/non-stock items;
- procurement receipt does not force full inventory ownership.

### P07D — Subcontract Valuation / Retention / Advance

Artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/processes/P07D_SUBCONTRACT_VALUATION_RETENTION_ADVANCE_V0_1.md`

Key mechanics:
- supplier claim ≠ buyer assessment ≠ certification ≠ invoice ≠ payment;
- certified gross earned value is constrained by effective approved SOV/commitment;
- previous/current/cumulative certified positions derive from events;
- retention is withheld payable, not unearned scope;
- advance payment is funding, not earned value;
- recoupment reduces payable position, not gross earned value;
- payment/compliance holds remain separate from certification truth;
- corrections use reversal/counter-certification semantics.

## P07 integrated checkpoint

Artifact:
`04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_P07_COMMERCIAL_CORE_CHECKPOINT_V0_1.md`

Integrated provisional graph:

`AwardDecision + contractable_agreed_basis + RequirementAllocation`

`→ effective commitment baseline`

`→ effective approved changes`

`→ {goods accepted receipt | subcontract certified earned value}`

`→ retention / advance / payable components`

`→ accounting/invoice/payment interface`

Internal verdict:

**P07A–P07D INTERNALLY COHERENT ENOUGH TO CARRY FORWARD PROVISIONALLY.**

No P1.1 reopening is proposed.

## P07 burden guardrail

P07 is the intended **single XL gravity well**.

Reject future design if it requires in addition:
- full GL/double-entry accounting;
- full inventory/warehouse ERP;
- owner-side generalized change-management suite;
- generalized CDE/document platform;
- fully programmable BPM engine;
- bespoke commercial ontology per customer;
- deep named ERP connector before first live tender.

## ADRs explicitly still open

- ADR-0003 Procurement structural root
- ADR-0004 PO/Subcontract type model
- ADR-0005 Accounting/commercial ownership seam
- ADR-0007 Long-lead tracking model
- ADR-0008 Workflow generality
- ADR-0010 GCC semantics/localization
- ADR-0011 Budget/cost attribution timing/ownership
- ADR-0012 External vendor identity/access
- ADR-0013 Event-derived status
- ADR-0014 Provenance depth
- ADR-0015 Posting/finalization/reversal/correction
- ADR-0018 Workflow→financial-state seam
- ADR-0019 Effective dating
- ADR-0020 In-flight configuration binding
- ADR-0021 Field-level integration authority/staleness
- ADR-0022 Money/rounding/calculation order
- ADR-0023 Numbering/concurrency/fiscal semantics

## P1.2 final closure requirements remain

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

These are closure/audit gates, not day-to-day progress blockers.

## Next action

Continue provisionally into **commercial position + accounting/ERP authority/interface mechanics**, building on P07 without resolving ADR-0005 prematurely.

When Claude usage returns, run the final narrow B5/B6 sourcing recheck first; later prepare a separate hostile critique packet for integrated P07.