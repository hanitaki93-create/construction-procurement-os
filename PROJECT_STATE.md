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
- P01–P06 sourcing: **REVIEW A PASS**
- P07/P08 commercial core/accounting seam: **REVIEW B PASS**
- P09–P12 + complete graph: **REVIEW C ACTIVE / PACKET v0.2 READY**
- Process invention: **PAUSED** unless evidence/critique proves a real missing lifecycle
- P1.2 formal close: **LOCKED pending Review C + primary-evidence gate**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: **NOT STARTED**
- Phase 2/3 build: **LOCKED**

## Operating rule

P1.2 remains `SECONDARY_REFERENCE / PROVISIONAL / REVERSIBLE` until primary evidence and later structural decisions.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Independent primary cases must be captured verbatim before mapping to the candidate model.

---

## Review A — sourcing PASS

External verdict:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_REVIEW_A_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_5.md`

Closed sourcing issues include:
- supplier truth / evaluation / contractable basis separation;
- one RequirementAllocation lineage;
- hard scope conservation vs value governance;
- DemandLine / PlannedRequirement common authorized-basis contract;
- scope-level uniqueness;
- controlled UOM;
- downward reconciliation;
- CR-01 blocking conflicting new allocation consumption and commitment binding during unresolved reduction;
- package-root/ADR anchoring concern.

Review A regression after Review B: **NO**.

---

## Review B — commercial core PASS

External verdict:

`PASS — P07/P08 coherent; proceed to Review C`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_4.md`

Review B closed BL-03 through BL-08 and W01 through W04.

### Current binding commercial-core semantics

- `CommercialTermsAuthority` ≠ scope-consuming committed obligation.
- Each call-off/release/order forms its own effective obligation and binds backed RequirementAllocation scope.
- Scope-backed guaranteed minimum reserves capacity on the **same** RequirementAllocation lineage; call-offs draw down reservation rather than consume twice.
- Monetary minimum remains derived commercial exposure and does not fabricate physical procurement scope.
- One framework may carry both scope-backed and monetary minimums; qualifying call-offs can draw down both relations independently.
- Scope/quantity basis is orthogonal to valuation basis.
- `REMEASURABLE_QUANTITY` always has hard conservation: genuine quantity/cap or mandatory `SCOPE_PARTITION_BASIS`.
- Valid scope-adding `AuthorizedWorkInstruction` may itself be the effective basis-expansion source event where authority is sufficient; instruction ≠ final supplier price.
- Fulfillment mechanisms are composable at scope/economic-component grain.
- One economic component cannot be earned twice across receipt/progress/milestone mechanisms.
- Quantity tolerance belongs to AuthorizedRequirementBasis, is deterministic/versioned, and obeys downward-reconciliation + CR-01.
- Accounting authority remains field/event specific: `OWN / MIRROR / REFERENCE`.
- Integration error disposition is separate: `DATA_DEFECT / TRANSPORT_OR_MAPPING_DEFECT / TEMPORAL_RESTRICTION / EXTERNAL_AUTHORITY_RETURN`.
- Correction shares invariants but retains domain-specific modes rather than one generic reversal primitive.
- Retention, advance, allowance remaining, framework reservation, monetary-minimum exposure and integration status remain event-backed/derived positions; no editable duplicate ledger.

Second-ledger check: **CLEAN**.

ADR-0004: **OPEN as intended**.

P1.1 reopen: **NO**.

### Review B non-blocking carry-forward

1. Dual framework minimums must be allowed simultaneously.
2. ADR-0022 rounding policy has a hard-invariant dependency because tolerance ceilings use it.
3. P1.5 must define persisted `economic_component` matching grain for cross-fulfillment anti-double-counting.
4. Primary evidence still must test framework/call-off, remeasurement, instructed work, fulfillment, valuation and ERP practices.

---

## Complete provisional process set

- **P01** Demand / planning / package / cost attribution / RequirementAllocation
- **P02** Vendor qualification / contextual eligibility / bidder selection
- **P03** Tender event / immutable release / addenda
- **P04** External participation / intent / decline / bid submission/revision
- **P05** Bid normalization / leveling / comparison
- **P06** Recommendation / DOA / governed award
- **P07A** Commitment formation / original effective baseline
- **P07B** Controlled commitment change / variation / instruction
- **P07C/P07D** Composable fulfillment / receipt / valuation / certification / retention / advance
- **P08** Commercial position / accounting authority / ERP reconciliation
- **P09** Cross-cutting deterministic control plane
- **P10** Long-lead / procurement schedule / expediting
- **P11** Commercial closeout / security / warranty
- **P12** External technical/material approval dependency interface

No new P13 process is justified unless evidence/critique proves a missing lifecycle.

---

## Review C — ACTIVE

Canonical packet:

`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_C_CONTROLS_OVERLAYS_FULL_GRAPH_PACKET_V0_2.md`

Review C attacks:
- P09 BPM/workflow-engine creep;
- P10 Primavera/master-schedule creep;
- P11 banking/legal/warranty-platform creep;
- P12 CDE/submittal-platform creep;
- whole-graph object inflation;
- second-XL subsystem risk;
- missing core construction lifecycle;
- first-live-tender adoption burden;
- Review A/B regression;
- open ADR anchoring;
- whether blind primary evidence can still overturn the model.

Review C must PASS/remediate before P1.2 moves to primary challenge/closure work.

---

## One-XL gravity guardrail

P07 remains the intended single XL commercial gravity well.

Reject expansion that turns:
- P08 into full accounting ERP/GL/AP/cash;
- P09 into programmable BPM/low-code;
- P10 into CPM/master scheduling;
- P11 into banking/legal/insurance/warranty CRM;
- P12 into full CDE/submittal platform;
- P07 fulfillment into inventory/WMS.

---

## ADRs intentionally open

- ADR-0003 Procurement structural root
- ADR-0004 PO/Subcontract/Framework/CallOff physical model
- ADR-0005 Commercial/accounting ownership seam
- ADR-0007 Long-lead model
- ADR-0008 Workflow generality
- ADR-0010 GCC semantics/localization
- ADR-0011 Budget/cost authority
- ADR-0012 External identity/access
- ADR-0013 Event-derived status
- ADR-0014 Provenance depth
- ADR-0015 Posting/finalization/correction
- ADR-0018 Workflow→financial-state seam
- ADR-0019 Effective dating
- ADR-0020 In-flight config binding
- ADR-0021 Integration authority/staleness
- ADR-0022 Money/rounding/calculation order
- ADR-0023 Numbering/concurrency/fiscal semantics

Review B added a hard dependency on deterministic ADR-0022 policy use, but did not resolve its physical architecture.

---

## P1.2 closure requirements still unmet

Before formal P1.2 close:
- Review C PASS/remediation;
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 outside founder prior pattern;
- at least 1 original contractor bid-leveling/comparison artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched reconciliation;
- primary corroboration/contradiction status.

Architecture progress is not commercial validation.

## Next action

Run **external Review C v0.2**.

Do not start structural freeze or product build from Review A/B PASS alone.
