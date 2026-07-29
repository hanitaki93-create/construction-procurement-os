# P1.2 — P07 Commercial-Core Checkpoint v0.1

**Status:** INTERNAL INTEGRATION COMPLETE / PROVISIONAL / EXTERNAL CRITIQUE LATER  
**Coverage:** P07A Commitment Formation + P07B Controlled Change + P07C Goods Receipt + P07D Subcontract Valuation  
**Evidence posture:** SECONDARY_REFERENCE / PRIMARY AUDIT LATER  
**Sourcing dependency:** final external B5/B6 sourcing recheck remains PENDING. P07 sourcing-dependent mechanics remain reversible.

## 1. Why this checkpoint exists

P07 is the first heavy commercial-core area. It must prove that the product can move from an approved sourcing decision into real contractual/commercial truth without becoming:

- a second accounting ERP;
- a generalized BPM/change-management platform;
- two disconnected PO/subcontract products;
- a mutable spreadsheet ledger with prettier UI;
- a document-management system pretending documents are state;
- an inventory/warehouse ERP merely to support goods procurement.

The checkpoint integrates:

`award → effective commitment → approved change → fulfillment/earned value → commercial position → accounting interface`

before any structural freeze.

## 2. Integrated provisional graph

### Sourcing handoff

`AwardDecision`

`+ approved contractable_agreed_basis`

`+ RequirementAllocation leaf/leaves`

`→ commitment preparation`

### Formation

`DRAFT_COMMITMENT`

`→ READY_FOR_EXECUTION`

`→ ISSUED / signature / acceptance events as applicable`

`→ EFFECTIVE_COMMITMENT_BASELINE`

### Change

`ChangeIssue/reference`

`→ ChangeProposal / commercial negotiation`

`→ approval/governance`

`→ contractual acceptance/effectiveness`

`→ EFFECTIVE_COMMITMENT_CHANGE`

### Current approved contractual position

`Original Effective Baseline + Effective Approved Changes`

### Fulfillment branch A — goods/material

`Effective PO/goods commitment`

`→ delivery evidence`

`→ GoodsReceipt`

`→ accepted/rejected/damaged/returned quantity`

`→ invoice-match evidence/interface`

### Fulfillment branch B — subcontract/service

`Effective subcontract/service commitment + current SOV`

`→ supplier ProgressClaim`

`→ buyer measurement/ValuationAssessment`

`→ CertificationDecision`

`→ retention / advance recoupment / payable components`

`→ invoice/payment accounting interface`

## 3. Canonical truth layers

### Layer A — Authorized procurement scope

Owned by `RequirementAllocation` lineage under the pending sourcing model.

Answers: **what scope/quantity may be commercially consumed?**

### Layer B — Contractual commitment truth

Original effective baseline plus effective approved changes.

Answers: **what has the organization contractually committed to this counterparty?**

### Layer C — Fulfillment / earned-value truth

Goods:
- accepted physical receipt.

Subcontract/service:
- certified gross earned value.

Answers: **what obligation has been physically fulfilled or commercially earned?**

### Layer D — Withholding / payable components

Retention, advance recovery and other contract-rule components.

Answers: **how does certified/accepted commercial value translate toward payable amount?**

### Layer E — Accounting / invoice / payment truth

System ownership remains open.

Answers: **what was invoiced, posted and paid in the accounting system?**

These layers may integrate tightly but may never become one mutable `current balance` field.

## 4. Core invariants across P07

1. **Award ≠ commitment.** Award approval authorizes selection; legal/economic commitment starts only at the explicit formation/effectiveness event.
2. **Contractable basis only.** Commitment cannot instantiate buyer-only evaluation allowances.
3. **Original baseline is immutable after effectiveness.** Later commercial changes are separate records/events.
4. **Current approved commitment derives:** original + effective approved changes.
5. **Pending change is exposure, not approved committed cost.** Forecast may include it under reporting policy.
6. **Value change ≠ scope allocation change.** Price variance does not manufacture allocation capacity.
7. **Added scope requires authorized scope first.** Requirement basis/allocation capacity changes before added commitment scope becomes effective.
8. **One allocation lineage.** Award/change/commitment bind existing authorized scope; they do not create parallel allocation ledgers.
9. **PO and subcontract share formation/change invariants but diverge downstream.** Common semantics do not resolve ADR-0004 hierarchy.
10. **Goods receipt ≠ invoice.** Physical acceptance is independent evidence.
11. **Subcontract claim ≠ certification.** Supplier request cannot overwrite buyer-certified earned value.
12. **Certification ≠ payment.** Earned/payable commercial truth remains separate from AP/cash state.
13. **Retention ≠ unearned scope.** It is a withheld payable position.
14. **Advance ≠ earned value.** Advance funding is tracked separately and recovered through recoupment rules.
15. **Recoupment does not reduce gross earned value.** It changes payable position.
16. **Correction is historical.** Effective commitments, changes, receipts and certifications use void/reversal/counter-events rather than destructive rewrite.
17. **Historical position is reproducible.** Effective-dated events determine as-of views.
18. **Accounting ownership is explicit.** Product never silently assumes its commercial state is also the GL/AP/payment source of truth.
19. **Stable commercial line identity.** Changes, receipts and certifications target durable commitment/SOV scope.
20. **No false precision.** Lump-sum scope does not require invented quantity/item-master detail.

## 5. Candidate commercial projections

### Commitment position

- Original Commitment
- Approved Changes
- Current Approved Commitment
- Pending Change Exposure
- Adjusted / Forecast Commitment

### Goods path

- Ordered quantity
- Received quantity
- Accepted quantity
- Rejected/returned quantity
- Open quantity
- Matched invoice position where applicable

### Subcontract/service path

- Current approved SOV value
- Previous Certified Gross
- Current Certified Gross
- Certified Gross To Date
- Remaining Uncertified Value
- Retention Withheld
- Retention Released
- Retention Outstanding
- Advance Paid
- Advance Recouped
- Advance Outstanding
- Certified/Payable basis

### Accounting interface

- Invoice received/approved/posted
- Payment status/value/date
- external IDs/reconciliation state

These are derived views over evidence/events. They are not independent editable ledgers.

## 6. PO vs Subcontract commonality test

### Shared semantic kernel appears credible

Both paths need:
- counterparty/legal entity/project;
- original commercial baseline;
- stable scope/line identity;
- currency/tax/cost attribution;
- authority/effectiveness evidence;
- effective changes;
- current approved value;
- provenance/audit;
- accounting interface.

### Divergence is material

Goods PO emphasizes:
- ordered quantity;
- delivery/receipt;
- acceptance/rejection/returns;
- invoice match;
- possible inventory/store interface.

Subcontract/service emphasizes:
- SOV/work breakdown;
- claim/measurement/certification;
- previous/current/cumulative value;
- retention;
- advance/recoupment;
- payment holds/conditions.

### Internal verdict

P07 supports a **shared commercial commitment semantic kernel with subtype-specific downstream engines**, but this is not sufficient to accept a physical common `Commitment` aggregate.

ADR-0004 remains OPEN.

## 7. Accounting ownership seam — current internal position

P07 should own or reproduce enough commercial evidence to answer:

- original contractual value;
- approved change value;
- current approved commercial value;
- physical accepted goods or certified earned value;
- contractual retention/advance positions;
- source/provenance/authority.

It does **not** yet establish that the product owns:

- accounting encumbrance;
- AP invoice posting;
- tax journal;
- payment transaction;
- bank/cash truth;
- GL balance.

These may be OWN / MIRROR / REFERENCE per event/field after P1.4/P1.5 analysis.

ADR-0005 remains OPEN.

## 8. Internal contradiction audit

### Finding A — commitment semantics vs legal formation

Risk: `EFFECTIVE` could become a fake universal legal rule.

Resolution: effectiveness is a semantic event whose triggering evidence/policy varies by commitment type/company/jurisdiction. PO issue, supplier acknowledgment, bilateral signature, NTP or another formation rule may differ. No universal trigger is frozen.

### Finding B — change-management gravity

Risk: `ChangeIssue` becomes a generalized owner/field/design change-management platform.

Resolution: P07 owns only **commitment-side commercial change semantics**. The source issue may be a reference to a client instruction, design revision, RFI, site instruction or external change system. P07 does not require owning the upstream project-wide change/event workflow in V1.

### Finding C — post-award supplier agreement evidence

Risk: P07B creates a second supplier-truth system inconsistent with sourcing `BidSubmission`.

Resolution: original award contractable basis stays bound to `BidSubmission` lineage. Post-award contractual change may be evidenced by a signed CO/amendment/accepted supplier quotation or other explicit contract-change evidence. Later architecture may factor a shared evidence primitive, but P07 does not invent a second editable price truth.

### Finding D — commercial event substrate vs second ledger

Risk: original/change/receipt/certification projections become a new bespoke ledger alongside accounting.

Resolution: P07 commercial state is an auditable **contractual event/projection substrate**, already required by accepted ADR-0002. It does not implement double-entry accounting or AP/payment journals. External accounting authority remains explicit.

### Finding E — goods receipt inventory gravity

Risk: supporting GRN forces warehouse/item-master/inventory ownership.

Resolution: P07C works against commitment lines and receipt evidence, including free-form/non-stock items. Inventory/on-hand remains outside unless later evidence promotes it.

### Finding F — certification vs invoice ambiguity

Risk: contractor workflows sometimes call the progress claim itself an invoice, making separate records feel artificial.

Resolution: terminology may collapse in UI/document artifact, but semantic facts remain distinct: supplier-requested amount, buyer-certified earned amount, accounting invoice/posting and cash payment. Physical record count can be optimized later.

### Finding G — retention and advance calculation order

Risk: prematurely hardcoding formulas creates legal/accounting contradictions.

Resolution: P07 preserves components and terms; ADR-0022/P1.5 owns exact decimal/rounding/calculation order and regional/accounting policy.

### Finding H — approved vs effective change

Risk: some companies treat internal approval as effective change; others require supplier signature/posting.

Resolution: keep approval and effectiveness conceptually separable while allowing configuration/evidence to make them coincide.

## 9. Burden / gravity audit

The P07 commercial core is expected to be the **single XL gravity well** allowed by P1.1.

Potential gravity sources:
- contractual baseline/versioning;
- changes;
- valuation/certification;
- retention/advance positions;
- commercial projections;
- correction/reversal;
- accounting interface.

Reject future design if P07 additionally requires:
- full GL/double-entry accounting;
- full inventory/warehouse system;
- owner-side change-management suite;
- generalized document/CDE platform;
- fully programmable BPM engine;
- bespoke commitment schema per customer;
- deep named ERP connector before first live tender.

Current internal assessment: **XL but contained** if these boundaries hold.

## 10. Golden-thread tests now supported provisionally

### GT-C01 — ordinary material PO

`award → effective PO → partial receipt → invoice match → external payment`

### GT-C02 — material PO with change

`effective PO → approved quantity/value amendment → revised ordered basis → receipts`

### GT-C03 — subcontract progress

`effective subcontract/SOV → claim → valuation → certification → retention → accounting handoff`

### GT-C04 — subcontract advance

`effective subcontract → advance paid → zero earned value initially → later certification → recoupment → advance outstanding declines`

### GT-C05 — pending variation

`instruction → pending proposal → forecast exposure only → approved/effective change → current commitment updates`

### GT-C06 — negative variation

`effective subcontract → omission change → current approved value decreases while historical baseline/certification remains`

### GT-C07 — erroneous certification

`certificate A effective → error found → reversal/correction B → current position corrected without rewriting A`

### GT-C08 — goods return

`receipt accepted → later return → current fulfilled quantity reduced while original receipt remains evidence`

### GT-C09 — accounting ownership split

`commercial commitment/certification in product → invoice/payment in ERP → mirrored status/external ID/reconciliation`

## 11. Unresolved items that must remain open

- ADR-0004 PO/Subcontract implementation structure;
- ADR-0005 accounting/commercial field/event authority;
- ADR-0010 GCC/UAE commercial semantics;
- ADR-0011 budget/cost attribution and availability ownership;
- ADR-0015 posting/finalization/reversal/closed-period correction;
- ADR-0018 workflow→financial-state seam;
- ADR-0019 temporal authority;
- ADR-0021 integration authority/staleness;
- ADR-0022 money/rounding/calculation order;
- exact commitment-formation legal defaults;
- exact receipt/inspection depth;
- exact claim/certification object decomposition;
- payment ownership;
- retention/advance defaults and security semantics;
- pay-when-paid V1 scope;
- regional terminology.

## 12. Primary audit tests later

Primary cases must attack:
- what makes PO/subcontract binding;
- how original contract is represented after changes;
- potential vs approved variation treatment;
- goods receipt/GRN truth location;
- progress claim vs certificate vs invoice workflow;
- retention/advance/recoupment calculation;
- accounting/ERP ownership;
- corrections/reversals;
- work started before formal approval;
- regional/GCC contractual semantics.

Do not show contractors this object vocabulary before verbatim capture.

## 13. Internal checkpoint verdict

**P07A–P07D: INTERNALLY COHERENT ENOUGH TO CARRY FORWARD PROVISIONALLY.**

This is not a freeze and not an external PASS.

No P1.1 reopening is proposed.

P07 remains subject to:
1. the still-pending final sourcing B5/B6 external critique;
2. later hostile P07 critique;
3. primary contractor evidence;
4. P1.4/P1.5 ownership/state/financial-invariant resolution.

## 14. Next action

Continue P1.2 into the next supporting/cross-cutting process area while Claude is unavailable, with P07 recorded as a provisional integrated commercial-core checkpoint.

Before any P07 freeze, prepare a focused hostile review packet that attacks:
- legal-effect semantics;
- PO/subcontract common-kernel assumption;
- second-ledger/accounting leakage;
- change/valuation truth ownership;
- retention/advance math boundaries;
- goods receipt vs inventory gravity;
- reversal/correction semantics;
- implementation burden.