# CAL-001 — Perflex Founder Calibration Workflow v0.1

**Status:** PARTIAL PRIMARY RECONSTRUCTION / CALIBRATION ONLY  
**Gate value:** does **not** count as an independent contractor workflow  
**Purpose:** test the P1.2 capture system against a real known operating environment without pretending missing details are known.

## A. Case identity

- `case_id`: CAL-001
- organization: Perflex Building Contracting LLC
- geography: Dubai, UAE
- contracting posture: building contractor acting as buyer of material orders and specialist subcontracts
- procurement mix: mixed civil / MEP / specialist subcontract procurement
- project examples evidenced in prior records: Jumeirah Park villas, Al Mizhar 1 and other building projects
- observed project concurrency: **UNKNOWN / not used as architecture input**
- accounting / ERP posture: FirstBit ERP aligned with Accounts; procurement documentation and approvals were formalized around the procurement process
- source class: founder direct operating experience + private transaction/document evidence

Canonical primary sources: `registers/primary_sources.csv` (`PSRC-0001`–`PSRC-0004`).

## B. Verbatim / source-supported operating terms

The following labels are preserved because they appear in user-provided process descriptions/artifacts:

- `requisition`
- `comparison sheet`
- `LPO`
- `RFQ / RFP`
- `GRN`
- `technical comparison`
- `commercial comparison`
- `material submittal`
- `client approval`
- `look-ahead schedule`
- `lead time`
- `3-way matching`
- `FirstBit ERP`

No claim is made that these labels form one universal contractor vocabulary.

## C. Reconstructed workflow — supported portion

| Step | Raw/observed label | Actor(s) evidenced | Input / trigger | Action | Output / evidence | System / channel | Confidence |
|---|---|---|---|---|---|---|---|
| C01 | look-ahead / lead-time coordination | Planning / Projects + Procurement | project need / schedule context | procurement coordinates required timing and critical-package lead times | procurement timing / need identified | planning process + procurement records; exact tool UNKNOWN | HIGH |
| C02 | requisition | project/site/internal requester + Procurement | required material/service/package | requisition enters procurement process | requisition record | FirstBit / controlled procurement workflow; exact form fields UNKNOWN | HIGH |
| C03 | RFQ / RFP | Procurement + suppliers/subcontractors | approved/usable requirement | suppliers are sourced and invited to quote | quotations / proposals | channel mix not fully evidenced | HIGH |
| C04 | quotation / revisions | supplier/subcontractor + Procurement | RFQ/RFP | supplier provides commercial/technical offer | quotation artifact | supplier document/email channel likely but exact authoritative channel UNKNOWN | HIGH |
| C05 | technical & commercial comparison / comparison sheet | Procurement + technical/project participants | quotations | bids are technically/commercially compared; negotiation may follow | comparison sheet / evaluated offers | comparison artifact + procurement process | HIGH |
| C06 | approval | Procurement + management/authorized approver | evaluated sourcing result | approval is obtained before commitment | approved transaction / approval evidence | FirstBit automated approvals evidenced; exact DOA chain UNKNOWN | MEDIUM-HIGH |
| C07a | LPO / PO | Procurement + authorized issuer + supplier | approved award / selected offer | purchase commitment is issued | LPO/PO | FirstBit / issued PO artifact | HIGH |
| C07b | subcontractor agreement | Procurement / commercial / management + subcontractor | selected specialist subcontractor | scope, price, payment terms, duration/SLA and other terms are contracted | subcontract agreement | document-based agreement process; exact execution workflow varies | HIGH |
| C08 | material submittal / client approval | Procurement + Project/technical + consultant/client where applicable | material/vendor selection or procurement need | material is submitted, reviewed and potentially resubmitted | approval / resubmission evidence | external approval process; sequencing vs award is **VARIANT / UNKNOWN** | HIGH that process exists; LOW on universal sequence |
| C09 | delivery follow-up | Procurement + supplier + Projects/site | issued commitment + required date | delivery is coordinated/tracked | delivery occurrence / delivery documents | FirstBit tracks deliveries; detailed milestone states UNKNOWN | HIGH |
| C10 | GRN | site/project + procurement/accounts interface | delivered/received goods | receipt is recorded for accepted delivery | GRN | FirstBit / accounts process | HIGH |
| C11 | invoice / Accounts handoff | Accounts + Procurement/site | PO/LPO + GRN + supplier invoice | procurement/receipt/invoice are aligned for Accounts | 3-way-match processing / payable workflow | FirstBit + Accounts | HIGH |

### Subcontract downstream branch

The existence of subcontract agreements is directly evidenced. However, the following are **not yet reconstructed at primary-evidence level for CAL-001**:
- SOV/progress-measurement mechanics;
- claim submission and certification workflow;
- retention accrual/release mechanics;
- advance-payment/recoupment mechanics;
- detailed variation/change approval;
- final-account/closeout flow.

They remain UNKNOWN, not inferred from the Phase 1 architecture.

## D. Transaction artifact observations

### Issued PO evidence (`PSRC-0003`)
The observed Perflex PO exposes at least:
- PO number/date;
- vendor and project;
- quote/reference linkage;
- description/quantity/UOM/value/VAT;
- shipping/delivery terms;
- payment terms;
- authorization field.

This supports a real **quotation/reference → approved commitment** artifact handoff but does not by itself prove the upstream approval state machine.

### Supplier quotation evidence (`PSRC-0004`)
The observed quotation exposes:
- project/scope;
- quantity/rate/total/VAT;
- milestone payment terms.

This supports supplier-origin commercial evidence entering procurement. It does not prove a canonical supplier-response channel or bid-form structure.

## E. Truth-source checkpoints — current evidence

| Position | Current finding | Confidence |
|---|---|---|
| procurement demand | formal requisition exists | HIGH |
| sourcing offers | supplier quotations/proposals + comparison sheet | HIGH |
| comparison/evaluation | comparison sheet is a real operating artifact | HIGH |
| approval | FirstBit approval automation existed; exact authority model unobserved | MEDIUM |
| commitment | issued LPO/PO and subcontract agreements | HIGH |
| receipt | GRN aligned to Accounts / 3-way matching | HIGH |
| invoice/payable | Accounts handoff exists; exact field authority/status model UNKNOWN | MEDIUM |
| budget/cost baseline | **UNKNOWN** — exact link timing and authority not evidenced here | LOW |
| pending/approved variation | **UNKNOWN** | LOW |
| valuation/progress position | **UNKNOWN for subcontract branch** | LOW |
| retention position | **UNKNOWN** | LOW |
| advance / recoupment | **UNKNOWN** | LOW |
| paid position | **UNKNOWN / accounting-owned likely but not asserted** | LOW |

## F. Variants already visible

1. **Material purchase vs specialist subcontract** — both exist and diverge after sourcing/award.
2. **Submittal-dependent procurement** — material/client approval may affect release/ordering but exact placement varies and is not yet reconstructed.
3. **Critical/long-lead packages** — planning/lead-time coordination exists and may change the entry timing/path.
4. **Ordinary goods receipt vs subcontract progress** — GRN evidence supports goods; subcontract progress requires a different downstream mechanism that remains unobserved in this calibration.

## G. Workarounds / parallel truth

No workaround is asserted merely because a comparison sheet exists. The comparison sheet may be a deliberate controlled artifact.

What is not yet established:
- whether the comparison sheet carried unique truth absent from FirstBit;
- whether parallel procurement trackers were used;
- whether email/messaging contained authoritative status;
- how often manual reconciliation was required.

These become explicit external-case questions rather than assumptions.

## H. Unmodelled / unmatched observations

CAL-001 already exposes questions the frozen graph does not answer by itself:

1. **Material-submittal/client-approval dependency** — real procurement timing can depend on an external technical approval loop whose exact placement relative to tender/award/PO is variable.
2. **Comparison sheet as artifact vs system state** — must determine whether comparison is only a presentation artifact or an authoritative decision record with unique fields.
3. **PO vs subcontract downstream divergence** — the common sourcing path is supported, but downstream receipt/valuation semantics clearly diverge.

These are not yet P1.1 contradictions; they are observations requiring independent cases.

## I. Frozen-wedge attack — calibration disposition

### WEDGE-01 — Closed Procurement Control Graph
**Disposition: PARTIAL SUPPORT / UNRESOLVED.**

Supported sequence exists across requisition → sourcing → comparison → approval → LPO/PO/subcontract → receipt/accounting handoff.

Still unproven:
- budget/cost context at entry;
- whether unique authoritative status lived outside the formal process;
- whether one ontology covers material + subcontract + submittal dependencies without invention;
- valuation/current-commercial closure.

### WEDGE-02 — Commercial Commitment Truth
**Disposition: UNRESOLVED.**

Commitment artifacts and accounting handoff are real. Change, valuation, retention, advance and recoupment positions are not yet evidenced sufficiently.

### WEDGE-03 — Task-Focused External Tender Participation
**Disposition: UNRESOLVED.**

Supplier quotations and revisions clearly enter sourcing, but CAL-001 does not yet establish:
- secure access model;
- acknowledgement;
- deliberate decline/no-bid;
- non-response/timeout;
- portal/account friction;
- whether direct supplier interaction can be bounded without changing response behavior.

## J. Calibration result

The P1.2 packet works as intended: it distinguishes **observed process**, **partial inference**, and **UNKNOWN** instead of forcing the frozen P1.1 graph to appear proven.

CAL-001 therefore succeeds as a calibration case but contributes **0 independent workflows** to the P1.2 gate.

## K. Highest-value gaps for external Case 001

The first independent contractor case should prioritize evidence for:
1. exact budget/cost-code timing and authority;
2. exact approval/DOA path from comparison to commitment;
3. whether bid comparison carries canonical comparable lines and adjustment history;
4. supplier response/decline/non-response/revision behavior;
5. award justification, especially non-lowest selection;
6. variation/change movement into current commitment value;
7. subcontract valuation/certification + retention/advance/recoupment;
8. system-of-record split between procurement and accounting;
9. parallel trackers/manual reconciliation;
10. where technical/material approvals interrupt or gate procurement.
