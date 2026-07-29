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
- Sourcing P01–P06: **REVIEW A PASS**
- P07/P08 commercial core: **REVIEW B FAIL → BL-03–BL-06 + W01–W04 REMEDIATED / NARROW RECHECK READY**
- P09–P12 + complete graph: **REVIEW C PREPARED / BLOCKED pending Review B PASS**
- Process invention: **PAUSED** unless evidence/critique proves a real missing lifecycle
- P1.2 formal close: **LOCKED pending primary-evidence gate + Review B/C PASS**
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

Binding sourcing corrections include:
- supplier truth / evaluated basis / contractable basis separation;
- single RequirementAllocation lineage;
- hard scope conservation separate from value governance;
- DemandLine / PlannedRequirement common authorized-basis contract;
- scope-level uniqueness;
- versioned downward reconciliation;
- controlled UOM conversion;
- CR-01: while a reduction target is unresolved, no new allocation consumption or commitment binding may use the prior basis where inconsistent with that target;
- shared/joint responsibility requires governed authorization/evidence.

ADR-0003 and ADR-0004 remain open. P1.1 reopen = NO.

---

## Review B — external FAIL and current remediation

External Review B returned:

`FAIL — remediate blocker(s) before Review C`

### BL-03 — Framework / rate agreement / call-off

Accepted.

Current model separates:
- `CommercialTermsAuthority` — rate/terms authority that normally creates no allocation consumption or committed cost;
- effective call-off/release/order obligation — fresh commitment baseline that binds RequirementAllocation scope.

A guaranteed minimum in a framework is explicit committed obligation exposure, not hidden inside non-consuming rate authority.

ADR-0004 must later decide physical PO/Subcontract/Framework/CallOff structure.

### BL-04 — firm-quantity assumption

Diagnosis accepted; Claude's proposed taxonomy modified.

Two orthogonal dimensions now exist.

**Scope/quantity basis:**
- `FIRM_QUANTITY`
- `REMEASURABLE_QUANTITY`
- `NON_QUANTIFIED_SCOPE`

**Valuation basis:**
- `FIRM_LUMP_SUM`
- `UNIT_RATE_REMEASUREMENT`
- `PROVISIONAL_SUM_ALLOWANCE`
- `DAYWORK`
- `MILESTONE`
- `RATE_BASED_SERVICE`

`PROVISIONAL_SUM` is not treated as a quantity-basis type.

Estimated BOQ quantity under remeasurement is not automatically a hard procurement-authorization ceiling. Hard Review A conservation must bind to genuine scope partition/cap.

### BL-05 — instructed but commercially unagreed work

Accepted with generalized cure.

`AuthorizedWorkInstruction` may create work/scope authority before final supplier price is agreed.

- if scope genuinely expands, valid instruction/governance establishes effective authorized-basis expansion before added consumption;
- if work remains inside already-authorized remeasurable scope, no fake basis expansion is created;
- provisional/interim certification is allowed only under a named contractual valuation authority;
- final supplier agreement/change reconciles prior provisional valuation non-destructively.

Instruction authority ≠ final supplier-agreed price.

### BL-06 — fulfillment bifurcation

Accepted.

P07C/P07D are fulfillment mechanisms, not mutually exclusive commitment types.

Candidate mechanisms at line/SOV/milestone/scope-segment grain:
- `GOODS_RECEIPT`
- `PROGRESS_VALUATION`
- `MILESTONE_CERTIFICATION`
- `RATE_BASED_SERVICE`
- `DELIVERABLE_ACCEPTANCE`

One commitment may combine mechanisms. Cross-mechanism economic value must not be earned twice.

### W01 — over-receipt tolerance

Accepted with refinement.

Authorized quantitative basis may preserve:
- nominal quantity;
- governed tolerance rule;
- derived hard authorized quantity ceiling.

Tolerance is pre-authorized scope, not a receipt-time override.

`accepted cumulative <= commitment permitted <= authorized requirement ceiling`

Tolerance consumed above nominal remains visible separately.

### W03 — integration rejection

Field authority remains `OWN / MIRROR / REFERENCE`.

Error/rejection disposition is separate:
- `DATA_DEFECT`
- `TRANSPORT_OR_MAPPING_DEFECT`
- `TEMPORAL_RESTRICTION`
- `EXTERNAL_AUTHORITY_RETURN`

Transport/mapping defects cannot mutate commercial truth merely to make sync pass.

### W04 — correction semantics

Shared invariants, not one universal reversal primitive.

Candidate modes:
- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical reversal;
- reclassification;
- non-domain integration correction.

Retention, advance, allowance remaining and integration status remain derived/event-backed positions, never editable competing ledgers.

---

## Current binding Review B artifacts

- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_CRITIQUE_REMEDIATION_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_2.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_REMEDIATION_SANITY_AUDIT_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_NARROW_RECHECK_PROMPT_V0_1.md`

Historical P07A–P07D/P08 v0.1 artifacts remain evidence/input; where they conflict with the Review B remediation + checkpoint v0.2, the remediation/checkpoint controls current provisional interpretation.

---

## Internal Review B remediation sanity result

`FAIL_INTERNAL = 0`

Affected tests passed provisionally for:
- non-consuming framework + multiple call-offs;
- remeasurement without fake variation;
- firm quantity hard limit;
- provisional-sum allowance;
- daywork / instructed-unagreed work;
- instruction inside existing remeasurable scope;
- mixed supply/install fulfillment;
- milestone consultancy;
- governed over-receipt tolerance;
- ERP mapping defect;
- external authority return;
- forward certification correction;
- physical receipt reversal.

Two non-blocking watches remain:
1. guaranteed-minimum framework drawdown mechanics;
2. exact cross-mechanism anti-double-counting grain for mixed fulfillment/stored materials.

No new P13 process is justified.

---

## Second-ledger guard

P07 remains the intended single XL commercial gravity well.

Reject expansion that creates:
- full GL/AP/cash ledger;
- full inventory/warehouse ERP;
- generalized claims/legal platform;
- second editable retention/advance/current-balance ledger;
- mandatory deep ERP connector before first live tender.

P08 field/event authority + reconciliation remains bounded support.

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

P1.1 reopen remains **NO**.

---

## Review C

Prepared but blocked until Review B narrow recheck returns:

`PASS — P07/P08 coherent; proceed to Review C`

Review C will attack P09–P12 + complete P01–P12 burden/completeness.

---

## P1.2 closure requirements still unmet

Before formal P1.2 close:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 outside founder prior pattern;
- at least 1 original contractor bid-leveling artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched reconciliation;
- primary corroboration status;
- Review B/C blockers resolved.

Architecture progress is not commercial validation.

## Next action

Run **Review B narrow recheck** using `P1_2_REVIEW_B_NARROW_RECHECK_PROMPT_V0_1.md` and the current remediation/checkpoint.

Do not proceed to Review C until external PASS.
