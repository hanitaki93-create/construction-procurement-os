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
- Current mode: **PRIMARY CHALLENGE / P1.2 CLOSURE**
- Process invention: **PAUSED** unless primary evidence proves a missing lifecycle
- P1.2 formal close: **LOCKED pending primary-evidence gate**
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

Independent primary cases must be captured verbatim before mapping to candidate architecture.

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

Ten targets must be challenged after blind/verbatim capture:
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

## P1.2 closure requirements still unmet

Before formal P1.2 close:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 case outside founder prior pattern;
- at least 1 original contractor bid-leveling/comparison artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched reconciliation;
- primary corroboration/contradiction status against the falsification register.

Architecture critique is complete; architecture correspondence to reality is **not yet proven**.

## Next action

Begin **primary challenge/closure** using blind contractor workflow/artifact capture.

Do not begin P1.3 structural/competitor reconstruction or product build until P1.2 primary-evidence gate closes.
