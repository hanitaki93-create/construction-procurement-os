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
- P01–P12 provisional workflow set: **COMPLETE-ENOUGH / NOT FROZEN**
- Review A — P01–P06 sourcing: **PASS**
- Review B — P07/P08 commercial core/accounting seam: **PASS**
- Review C — P09–P12 + full graph: **PASS**
- External architecture critique: **COMPLETE**
- Public first-party challenge: **COMPLETE v0.1 / MAJOR P1.2 GATE PROGRESS**
- Current mode: **PRIMARY CHALLENGE / P1.2 CLOSURE — TARGETED REMAINING EVIDENCE**
- Process invention: **PAUSED** unless primary evidence proves a missing lifecycle
- P1.2 formal close: **LOCKED pending authentic completed contractor bid-leveling artifact + final reconciliation of remaining primary-unobserved assumptions**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 close**
- Product code: **NOT STARTED**
- Phase 2/3 build: **LOCKED**

## Evidence rule

P1.2 remains `PROVISIONAL / PRIMARY-FALSIFIABLE / NOT FROZEN` until primary evidence is captured and reconciled.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Public availability does not automatically demote contractor-origin evidence. Public contractor manuals, procedures, audits, role descriptions and contractual artifacts are classified by origin/directness, with generic software/market commentary remaining secondary.

Independent primary cases must be captured in source terminology before mapping to candidate architecture.

A genuine primary contradiction may reopen any Review A/B/C finding.

---

## Review A — sourcing PASS

Verdict:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_REVIEW_A_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_5.md`

Key closed issues:
- supplier truth / normalized representation / internal evaluation separation;
- evaluated basis ≠ supplier-confirmed contractable basis;
- one RequirementAllocation lineage;
- hard scope conservation separate from value/budget governance;
- DemandLine / PlannedRequirement common authorized-basis semantic contract;
- scope-level uniqueness;
- controlled UOM;
- downward reconciliation;
- CR-01 blocking conflicting new allocation consumption and new commitment binding during unresolved reduction;
- ProcurementPackage remains optional; ADR-0003 physical root remains unresolved.

---

## Review B — commercial core PASS

Verdict:

`PASS — P07/P08 coherent; proceed to Review C`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_4.md`

Current binding commercial semantics:
- CommercialTermsAuthority ≠ scope-consuming committed obligation;
- each call-off/release/order forms an effective obligation and binds backed RequirementAllocation scope;
- scope-backed guaranteed minimum reserves capacity on the same allocation lineage and call-offs draw it down;
- pure monetary minimum remains commercial exposure and does not fabricate physical scope;
- both minimum types may coexist;
- scope/quantity basis and valuation basis are orthogonal;
- remeasurable work always has hard conservation through a genuine cap or ScopePartitionBasis;
- valid scope-adding AuthorizedWorkInstruction may itself establish basis expansion where authority is sufficient;
- instruction authority ≠ supplier-agreed final price;
- fulfillment mechanisms are composable;
- one economic component cannot be earned twice;
- deterministic tolerance belongs to AuthorizedRequirementBasis;
- P08 accounting authority is field/event specific: OWN / MIRROR / REFERENCE;
- no editable duplicate commercial/accounting balance.

Review A regression: **NO**.

---

## Review C — full graph PASS

Verdict:

`PASS — full graph coherent; proceed to primary challenge/closure work`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_C_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_3.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_PRIMARY_FALSIFICATION_TARGETS_V0_1.md`

Review C results:
- SECOND-XL: **CLEAN — P07 only**;
- MISSING CORE PROCESS: **NONE**;
- FIRST LIVE TENDER: **CLEAN**;
- REVIEW A/B REGRESSION: **NO**;
- PRIMARY REVERSIBILITY: **CLEAN**;
- P1.1 REOPEN: **NO**.

### BL-09 closed

Binding distinction:

`Buyer entitlement/recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

Buyer-side recoveries include bounded semantics for LDs, backcharges/contra-charges, defect/rectification recovery, termination/replacement-cost recovery and security calls.

Recovery may affect payable/settlement without rewriting supplier-agreed contract price or gross certified earned value.

Cross-commitment recovery preserves the replacement supplier's legitimate positive cost separately from recovery against the defaulting supplier.

### CR-02 — required before P07 fulfillment implementation

Replacement/rectification procurement must still reconcile to RequirementAllocation authority.

- reversible source fulfillment may return capacity through a valid history-preserving reversal/release;
- irreversible source fulfillment does not silently return capacity and requires governed additional authorized scope/capacity before replacement commitment;
- recovery against the defaulting supplier remains separate from replacement procurement authorization/cost.

CR-02 **does not block primary challenge**.

---

## Complete provisional process set

- **P01** Demand / planning / package / cost attribution / RequirementAllocation
- **P02** Vendor qualification / contextual eligibility / participant selection
- **P03** Tender event / immutable release / addenda
- **P04** External participation / intent / decline / bid submission/revision
- **P05** Bid normalization / leveling / comparison
- **P06** Recommendation / DOA / governed award
- **P07** Commitment formation/change/instruction/fulfillment/certification/recovery
- **P08** Commercial position / accounting authority / ERP reconciliation
- **P09** Bounded deterministic control plane
- **P10** Long-lead / procurement schedule / expediting overlay
- **P11** Commercial closeout / security / warranty / recovery linkage
- **P12** External technical/material approval dependency interface

No P13 is justified unless primary evidence proves a missing lifecycle.

---

## One-XL guardrail

P07 remains the intended single XL commercial gravity well.

Reject expansion that turns:
- P08 into full accounting ERP/GL/AP/cash;
- P09 into programmable BPM/low-code;
- P10 into CPM/master scheduling;
- P11 into legal claims/banking/insurance/warranty platform;
- P12 into full CDE/submittal platform;
- fulfillment into inventory/WMS.

P09 gate classes are product-level bounded semantics. Deployment configuration may operate only inside those limits; hard invariants cannot be softened.

P10 may perform bounded local deterministic forecast derivation with visible source/formula/version, but not recursive dependency-network scheduling.

---

## Provisional ADR directions

Status:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Applies to:
- ADR-0003 Requirement-authority/structural-root direction;
- ADR-0008 Workflow generality — bounded built-in V1 controls, no arbitrary BPM;
- ADR-0013 Event-derived status;
- ADR-0014 Deep provenance for load-bearing events;
- ADR-0019 Effective dating/version binding;
- ADR-0021 OWN/MIRROR/REFERENCE integration authority model.

Other structural ADRs remain open, including ADR-0004, ADR-0005, ADR-0007, ADR-0010, ADR-0011, ADR-0012, ADR-0015, ADR-0018, ADR-0020, ADR-0022 and ADR-0023.

ADR-0022 now has a hard dependency on deterministic rounding wherever tolerance/conversion participates in conservation.

---

## Primary falsification register

Canonical artifact:

`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_PRIMARY_FALSIFICATION_TARGETS_V0_1.md`

Ten targets must be challenged after source/verbatim capture:
1. prior requirement authority;
2. allocation before commitment;
3. award distinct from commitment;
4. supplier claim / buyer assessment / certification separation;
5. composable fulfillment;
6. remeasurement conservation;
7. buyer recovery separation;
8. commercial truth with external accounting authority;
9. rectification procurement reconciliation;
10. one active authorized basis per exclusive scope.

A target may result in SUPPORTED_PRIMARY, CONTRADICTED_PRIMARY, MIXED/VARIANT, NOT TESTED or INSUFFICIENT EVIDENCE.

Do not force mixed primary evidence into PASS/FAIL.

---

## Public primary challenge v0.1

Artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/public_primary_challenge/P1_2_PUBLIC_PRIMARY_CHALLENGE_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/public_primary_challenge/P1_2_FT_PUBLIC_EVIDENCE_MATRIX_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/public_primary_challenge/P1_2_PUBLIC_CHALLENGE_GATE_VERDICT_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/public_primary_challenge/P1_2_PUBLIC_ROLE_ARTIFACT_MAP_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/registers/public_primary_source_register_v0_1.csv`

### Contractor workflow cases reconstructed

1. **Khansaheb Civil Engineering LLC — UAE**: tender/estimation + site requisition → LPO → delivery note → GRN → Accounts invoice processing; subcontract/material-submittal evidence.
2. **ASGC — UAE**: vendor RFQ notification → quotation header/lines/evaluation criteria/documents → explicit quotation submission; supplier-added quote items observed.
3. **Bechtel — global EPC**: Engineering Material Requisition → bidder list/prequalification → bid request → Q&A → commercial/technical evaluation → Commercial Bid Summary → recommendation/approval → PO/subcontract → changes/expediting/closeout.
4. **Fluor — global EPC**: pre-award/RFP → proposal → commercial + technical evaluation → recommendation/decision → contract finalization → performance/change/invoice/claims administration → closeout.
5. **Larsen & Toubro / NPL — India EPC/industrial**: RFQ → initial offer → negotiation → final offer → comparative statement → L1/commercial terms/tax → PO.

Additional stress evidence:
- Skanska subcontract valuation/invoicing mechanisms;
- ALEC UAE prequalification, technical approval, acceptance, replacement/recovery terms;
- Bechtel supplier backcharge/corrective-work evidence.

Supplier-side friction evidence:
- Qotera UAE operational evidence;
- ASGC supplier portal behavior;
- Rabitbuild/Inframat used only as market corroboration.

### P1.2 gates closed by public challenge

- **3–5 independent workflow reconstructions: CLOSED FOR EVIDENCE QUANTITY — 5 cases**;
- **at least 3 independent contractor workflows: CLOSED**;
- **at least 1 beachhead/UAE case: CLOSED**;
- **at least 1 case outside founder prior pattern: CLOSED**;
- **supplier-side friction evidence: CLOSED**;
- **variant/workaround/unmatched reconciliation: CLOSED FOR PUBLIC SPRINT**;
- **named role + artifact for every step in reconstructed workflows: CLOSED FOR THE FIVE PUBLIC RECONSTRUCTIONS**;
- **FT-01–FT-10 classification exercise: COMPLETE**.

### FT public evidence status

- `SUPPORTED_PRIMARY_PUBLIC`: **FT-01, FT-03, FT-05, FT-07, FT-08**;
- `MIXED_VARIANT_PUBLIC`: **FT-04**;
- `PRIMARY_UNOBSERVED_PUBLIC`: **FT-02, FT-09, FT-10**;
- `INSUFFICIENT_PUBLIC_EVIDENCE`: **FT-06**.

No `CONTRADICTED_PRIMARY` finding was discovered in the public sprint.

### Remaining hard gate

**P12-PRI-01 — completed authentic contractor bid-leveling/comparison artifact** remains OPEN.

Public evidence found:
- Khansaheb audit verifies a real `Commercial Summary T75` and Bid Settlement presentation, but does not expose the completed comparison rows;
- Bechtel first-party roles repeatedly identify the `Commercial Bid Summary`, but no authentic completed internal sheet was publicly available;
- L&T/NPL publishes an original contractor comparative-statement procedure specifying initial/final offers, no-quote, tax, ranking/L1 and PO basis, but it is a process specification rather than a completed transaction artifact;
- public owner bid tabs, generic templates and unverified document-sharing uploads were rejected for this gate.

Therefore the roadmap requirement **“at least 1 real bid-leveling artifact decomposed” is not closed**.

### Remaining primary-unobserved architecture risks

These are not silently treated as supported:
- FT-02 — allocation before commitment;
- FT-06 — remeasurement conservation against real scope/cap authority;
- FT-09 — rectification procurement capacity restoration vs additional authorization;
- FT-10 — one active authority per exclusive scope.

FT-04 is supported as a real distinction family but remains `MIXED_VARIANT_PUBLIC` on exact artifact/lifecycle shape.

---

## P1.2 closure status after public challenge

Architecture correspondence to reality is now materially better supported, but **P1.2 remains OPEN**.

### Closed

- architecture hostile reviews A/B/C;
- workflow count/diversity;
- independent contractor count;
- UAE/beachhead case;
- outside-founder-pattern case;
- role/artifact mapping for reconstructed workflows;
- supplier-side friction;
- public variants/unmatched observations;
- explicit FT-01–FT-10 evidence classification.

### Still required

1. **One authentic completed contractor bid-leveling/comparison artifact with real bidder rows, decomposed under P1.2 evidence rules.**
2. Targeted primary evidence should challenge FT-02/FT-06/FT-09/FT-10 rather than running broad generic interviews. These may ultimately remain `PRIMARY_UNOBSERVED` only if the P1.2 close explicitly accepts the residual uncertainty and demotes the affected assumptions accordingly.
3. Final P1.2 reconciliation must classify all carried hypotheses under the roadmap v1.3 primary-corroboration taxonomy and issue the formal P1.2 verdict.

## Next action

Do **not** repeat broad workflow research.

Highest-value next evidence is:

- one completed contractor commercial comparison/bid tab artifact;
- preferably bundled with a QS/commercial subcontract case that also exposes remeasurement/claim-assessment-certification and rectification/parallel-scope controls.

P1.3 remains locked until the P1.2 gate is formally closed.