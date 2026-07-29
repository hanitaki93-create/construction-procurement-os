# P1.2 — Full Provisional Workflow Map v0.1

**Status:** PROVISIONAL INTEGRATION / SECONDARY_REFERENCE / PRIMARY AUDIT LATER  
**Coverage:** P01–P11 + P07A–P07D  
**Purpose:** test whether the current evidence-informed process set forms a coherent end-to-end construction procurement/commercial operating model and identify any genuine missing operational process before the next critique boundary.

## 1. End-to-end provisional graph

### Need / planning

`Project + Budget/Cost Structure`

`→ {DemandLine | PLANNED_REQUIREMENT}`

`→ RequirementAllocation`

`→ [optional ProcurementPackage]`

### Supplier market / tender

`→ vendor qualification/contextual eligibility`

`→ TenderEvent`

`→ immutable TenderRelease + Addenda`

`→ TenderParticipant + bounded access`

`→ {Will Bid | Decline | No Response}`

`→ BidSubmission v1..n`

### Evaluation / award

`→ source-linked normalization`

`→ internal EvaluationAdjustments`

`→ frozen ComparisonSnapshot`

`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`

`→ ApprovalCase / DOA`

`→ AwardDecision`

### Contractual formation

`→ commitment preparation`

`→ issue/signature/acceptance as policy requires`

`→ EFFECTIVE_COMMITMENT_BASELINE`

### Commercial change

`→ {potential issue → proposal → approval → contractual/effective change}`

`→ Current Approved Commitment = Original + Effective Approved Changes`

### Fulfillment branch — goods/material

`→ delivery`

`→ GoodsReceipt`

`→ accepted/rejected/damaged/returned position`

`→ invoice-match evidence/interface`

### Fulfillment branch — subcontract/service

`→ ProgressClaim`

`→ ValuationAssessment`

`→ CertificationDecision`

`→ retention / advance recoupment / payable components`

### Accounting/interface

`→ accounting acceptance/export/import/reconciliation`

`→ AP invoice/payment/job-cost mirrors where authoritative externally`

### Closeout

`→ final scope disposition`

`→ final account / retention release / security release`

`→ warranty/DLP obligations`

`→ commercial/accounting closure`

## 2. Planning/expediting overlay

P10 spans the whole chain:

`Required On Site`

`← delivery/manufacturing/submittal/award/tender lead times`

and derives actual milestone dates from domain events where possible.

Long-lead tracking is a planning/projection layer, not a second procurement status ledger.

## 3. Governance/control overlay

P09 spans all business transitions:

`Permission`

`+ Authority/Approval`

`+ Compliance/Override`

`+ Domain Guard`

`→ valid domain event`

with evidence, task, notification, effective dating, idempotency and concurrency controls.

Workflow never directly owns commercial/financial state.

## 4. Integration/authority overlay

P08 spans any boundary where accounting/master data is external:

- field/event authority;
- OWN/MIRROR/REFERENCE;
- external identity links;
- export/import states;
- connector capability contract;
- staleness;
- reconciliation exceptions;
- historical authority/cutover.

One combined user view may exist, but source authority remains explicit.

## 5. Process coverage table

| Process | Business question answered | Coverage |
|---|---|---|
| P01 Demand/Package/Cost Attribution | What is needed and what scope may enter procurement? | PROVISIONAL COVERED |
| P02 Vendor Eligibility/Bidder Selection | Who may participate and who is selected to tender? | PROVISIONAL COVERED |
| P03 Tender Release | What exact scope/commercial basis was released to market? | PROVISIONAL COVERED |
| P04 Supplier Participation | Who received/accessed/declined/submitted/revised? | PROVISIONAL COVERED |
| P05 Bid Leveling | How are messy offers compared without corrupting supplier truth? | PROVISIONAL COVERED |
| P06 Award/DOA | What exact supplier/commercial basis was governed/approved? | PROVISIONAL COVERED |
| P07A Commitment Formation | What became contractually effective and when? | PROVISIONAL COVERED |
| P07B Commitment Change | How does approved contract truth change without rewriting original? | PROVISIONAL COVERED |
| P07C Goods Receipt | What goods were physically accepted and matchable to invoice? | PROVISIONAL COVERED |
| P07D Subcontract Valuation | What was claimed, certified, retained, recouped and payable? | PROVISIONAL COVERED |
| P08 Accounting Interface | Who owns each commercial/accounting fact and how do systems reconcile? | PROVISIONAL COVERED |
| P09 Control Plane | Who may act, approve, override and how are facts/evidence protected? | PROVISIONAL COVERED |
| P10 Long-Lead Tracking | Will procurement meet site/programme dates and why? | PROVISIONAL COVERED |
| P11 Closeout | Why is commitment still open and what must be released/closed? | PROVISIONAL COVERED |

## 6. Core truth domains

The workflow now separates these truth domains:

### Requirement truth

Authorized procurement need/scope.

### Supplier-market truth

What was released, who participated, what each supplier submitted.

### Buyer evaluation truth

How offers were normalized/adjusted/compared and why a decision was recommended.

### Award authority truth

What was approved by whom under what policy.

### Contractual truth

What became effective with the counterparty and how it changed.

### Fulfillment/earned-value truth

Goods accepted or subcontract work certified.

### Payable-component truth

Retention/advance/recoupment and other contractual withholding components.

### Accounting truth

Invoices/postings/payments/job costs where external accounting may be authoritative.

### Planning truth

Target/forecast/confirmed milestone dates separate from actual events.

### Evidence/control truth

Permissions, approvals, compliance, provenance, overrides and historical authority.

No one generic status/balance is allowed to replace these distinctions.

## 7. Anti-duplication rules

1. Demand and package do not duplicate one another.
2. Package is not the tender release.
3. Tender release is not supplier submission.
4. Supplier submission is not buyer normalized comparison.
5. Buyer evaluated amount is not supplier contractable amount.
6. Award is not commitment.
7. Original commitment is not current value after changes.
8. Pending change is not approved committed cost.
9. Delivery is not accepted receipt.
10. Receipt is not invoice/payment.
11. Claim is not certification.
12. Certification is not payment.
13. Retention is not unearned scope.
14. Advance is not earned value.
15. Planning milestone is not actual transactional status.
16. Task complete is not domain state complete.
17. Notification sent is not acknowledgment.
18. ERP export sent is not accounting accepted/posted.
19. Commercial closeout is not automatically cash/accounting closeout.

## 8. Golden-thread coverage

### GT-01 ordinary material request

`MR/Demand → sourcing → bids → award → PO effective → partial GRNs → invoice match → accounting`

### GT-02 planned long-lead material

`PLANNED_REQUIREMENT → package → tender → award → PO → technical approval dependency → manufacture/shipping → delivery/acceptance`

### GT-03 subcontract package

`package → tender → leveling → award → subcontract effective → progress claims → certification → retention → final account/closeout`

### GT-04 change/variation

`effective commitment → instruction/potential change → supplier evidence → approval/effectiveness → current commitment changes → downstream valuation/receipt`

### GT-05 retender/no award

`TenderEvent A → insufficient/invalid bids → preserved history → TenderEvent B`

### GT-06 compliance expiry

`eligible at invite → expires later → gate recheck → block/override without rewriting history`

### GT-07 split award

`RequirementAllocation split → Vendor A + Vendor B → separate commitments/fulfillment → aggregate requirement position`

### GT-08 advance/recoupment

`subcontract effective → advance paid → earned remains zero → later certification → recoupment reduces advance/payable`

### GT-09 correction/reversal

`effective commercial event → error found → counter-event/reversal → current position corrected without rewriting history`

### GT-10 ERP split ownership

`commercial truth in product → controlled export → accounting acceptance/posting → payment mirror → reconciliation`

### GT-11 termination

`effective commitment → termination → unperformed scope disposition → final valuation/settlement → security/retention/warranty treatment`

### GT-12 closeout security/warranty

`completion → final account → retention/security releases → warranty/DLP obligations → full closure`

## 9. Major gap audit

### Gap G1 — external technical/material submittal approval boundary

**Status: REAL GAP / NEEDS EXPLICIT BOUNDARY PROCESS.**

Evidence already shows:
- CAL-001 material submittals/client approvals occur in real workflow;
- P03 can have technical prerequisites;
- P06 can approve award subject to technical approval;
- P10 long-lead chain often depends on approved submittal before manufacture;
- P11 requires technical/warranty closeout evidence.

Current process set references this dependency but does not yet define:
- source/revision identity;
- responsible contractor/vendor;
- external reviewer/consultant/client;
- submitted/reviewed/approved/rejected/revise status;
- what approval applies to which product/scope/revision;
- how it gates commitment/manufacturing/payment without requiring full submittal/CDE ownership.

**Action:** create a narrow interface process/boundary, not a full project submittal-management module.

### Gap G2 — vendor master/onboarding

**Status: SUFFICIENT FOR P1.2 / NOT SEPARATE CORE PROCESS.**

P02 covers durable vendor identity, qualification/compliance and contextual eligibility. P08 covers external master authority. Rich CRM/vendor-portal capabilities remain outside core.

### Gap G3 — contract document generation/e-sign

**Status: BOUNDARY SUFFICIENT.**

P07A requires execution/signature evidence but does not need to own document generation/e-sign. P1.4/P1.9 can decide implementation/interface.

### Gap G4 — AP invoice/payment engine

**Status: BOUNDARY SUFFICIENT / ADR-0005 OPEN.**

P07C/P07D stop at match/certified payable and P08 handles accounting interface. Full AP/cash ownership is not needed to complete procurement/commercial workflow model.

### Gap G5 — full inventory/store management

**Status: INTENTIONALLY OUTSIDE CURRENT CORE.**

P07C models receipt/acceptance against commitments without inventory on-hand ownership.

### Gap G6 — owner/client change/revenue contracts

**Status: OUTSIDE BEACHHEAD CORE EXCEPT AS REFERENCES/TRIGGERS.**

Commitment change can reference upstream client/design instruction. P07B should not become full owner contract/change management.

### Gap G7 — vendor performance scoring

**Status: DOWNSTREAM ANALYTICS / LATER.**

P02/P04/P07C/P07D/P11 generate evidence. Scoring/prediction belongs later and is not needed for deterministic transactional completeness.

### Gap G8 — tax/regional legal semantics

**Status: STRUCTURALLY OPEN FOR P1.5 / ADR-0010/0022.**

Current processes preserve tax/currency/rule components without freezing GCC/UAE calculation/legal policy.

## 10. Object-inflation audit

Candidate names across P01–P11 are deliberately semantic. Many should not become separate database aggregates.

High-confidence durable truths likely needing identity/version/evidence:
- Vendor;
- Demand/authorized requirement basis;
- TenderEvent + released version;
- supplier offer revision;
- award decision;
- effective commitment baseline;
- effective commitment change;
- receipt/certification events;
- external-system links/reconciliation evidence.

Likely candidates for event/value/projection implementation rather than aggregates:
- eligibility evaluation;
- bidder selection/intent facts;
- comparison mappings/adjustments;
- working preference;
- approval step states;
- compliance checks;
- schedule-health status;
- closeout obligation/status projections.

Final entity freeze remains P1.5-owned.

## 11. Gravity audit

### XL gravity well

P07 commercial commitment/change/valuation core — intentionally one XL.

### Must remain bounded

- P09 workflow/control plane → reusable primitives, no generic BPM.
- P08 integrations → authority contracts, no mandatory deep connector.
- P10 schedule → procurement projection, no master scheduling product.
- P11 security/warranty → obligation tracking, no banking/legal-claims platform.
- technical approval gap → interface boundary, no full CDE/submittal platform by default.

Current integrated architecture remains within P1.1 one-XL-gravity-well constraint if these boundaries hold.

## 12. Primary evidence sensitivity

The current map is intentionally falsifiable.

Primary contractor cases must still determine:
- real starting roots;
- actual terminology;
- authority/DOA patterns;
- supplier participation behavior;
- comparison artifacts;
- PO/subcontract formation;
- GRN truth;
- progress valuation/certification;
- retention/advance semantics;
- long-lead schedule behavior;
- technical approval boundary;
- ERP/accounting ownership;
- closeout practice.

No process artifact may be used as an interview script that forces participants into our ontology.

## 13. Current map verdict

**P01–P11 form a coherent provisional end-to-end procurement/commercial workflow, with one material operational gap: external technical/material approval dependency.**

No other missing area currently justifies a new core transactional process before primary audit/structural design.

## 14. Next action

Create **P12 — External Technical / Material Approval Dependency Interface**, keeping it narrow.

Then integrate P01–P12 and set the next internal critique boundary while the external sourcing recheck remains pending.