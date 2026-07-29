# P07C — Goods Fulfillment / Receipt / GRN / Invoice-Match Seam v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / SOURCING_CRITIQUE_PENDING / AUDIT LATER  
**Dependency:** P07A commitment baseline + P07B controlled change.  
**Purpose:** define the goods/material fulfillment seam so physical receipt, inspection/acceptance, supplier invoice and accounting payment are separate facts without expanding V1 into a full inventory ERP.

## 1. Problem to solve

For material/equipment purchase commitments, the system must distinguish:

- quantity ordered;
- quantity delivered;
- quantity received;
- quantity accepted;
- quantity rejected/damaged/short;
- quantity returned;
- supplier invoice quantity/value;
- matched/approved invoice amount;
- accounting payment status.

A supplier invoice is not proof that goods arrived.

A delivery note is not proof that all goods were accepted.

A GRN/receipt is not necessarily the accounting invoice or payment event.

## 2. Mature-system reference pattern

CMiC's PO module provides the clearest current reference:

- PO committed-cost integration;
- manual/automatic receipt creation;
- PO receipt quantities and status;
- line-level matching between PO, receipts and supplier invoices;
- receipt documents linked to specific receipt/allocation lines;
- PO receipt queries exposing received, rejected or claimed quantities and associated AP invoice information;
- free-form/non-stock items as well as inventory items.

This supports a narrow procurement receipt/commercial-control seam without requiring the product to own warehouse inventory.

## 3. Candidate semantic boundary

P07C uses these semantic roles without deciding final persistence structure.

### `GoodsReceipt`

A dated record/event that goods under an effective commitment physically arrived and were recorded by an authorized receiver.

### `GoodsReceiptLine`

Line-level receipt against a commitment line/allocation.

Candidate fields:
- commitment line;
- RequirementAllocation leaf;
- delivery note/ship list reference;
- received date/time;
- received location;
- received quantity/UOM;
- accepted quantity;
- rejected quantity;
- damaged quantity;
- short/excess quantity;
- inspection status;
- receiver;
- source document/evidence;
- external ERP/warehouse receipt ID where applicable.

### `InvoiceMatchResult`

A commercial/accounting-control result comparing invoice line(s) against commitment and receipt evidence.

It is not itself the supplier invoice, receipt or payment.

## 4. Critical distinction — delivery vs receipt vs acceptance

### Delivery

Supplier/carrier presents goods at site/store/location.

### Receipt

Authorized organization actor/system records what physically arrived.

### Acceptance

Goods pass the required quantity/quality/specification check or are accepted subject to qualification.

Depending on contractor practice, receipt and acceptance may occur together or separately.

The architecture must allow both without forcing a full QA/QC inspection module.

## 5. Candidate goods-receipt flow

`Effective PO / goods commitment`

`→ supplier delivery / delivery-note evidence`

`→ GoodsReceipt`

`→ line-level {received | short | excess | damaged | rejected | pending inspection}`

`→ accepted position`

`→ supplier invoice received`

`→ match {commitment ↔ receipt ↔ invoice}`

`→ exception/approval or accounting handoff`

Payment remains outside this flow unless the product later owns it.

## 6. Receipt conservation

For quantity-controlled commitment lines:

`accepted cumulative receipt quantity <= effective ordered quantity`

unless an explicit over-receipt tolerance or approved quantity change exists.

Over-delivery must never silently increase commitment truth.

Possible behavior:
- reject excess;
- receive excess into quarantine/pending decision;
- approve commitment change then accept;
- accept within configured tolerance if policy permits.

Tolerance must be explicit and auditable.

## 7. Partial delivery

Partial receipt is first-class.

Example:

PO line = 100 units.

Receipts:
- R1 = 30 accepted;
- R2 = 50 accepted;
- R3 = 15 accepted + 5 rejected.

Derived positions:
- delivered/recorded = 100;
- accepted = 95;
- rejected = 5;
- open accepted quantity = 5.

Do not mark the line fulfilled merely because cumulative delivered quantity reached 100.

## 8. Rejection / damage / return

Receipt must support dispositions such as:
- accepted;
- rejected at delivery;
- accepted subject to inspection;
- damaged;
- quarantined;
- returned after receipt;
- replacement expected;
- claim/dispute opened.

Returned/rejected quantities must not rewrite the historical fact that delivery occurred.

A return/reversal event adjusts current accepted/fulfilled position while preserving prior receipt evidence.

## 9. Goods fulfillment vs RequirementAllocation

RequirementAllocation controls authorized procurement scope, not warehouse stock.

When goods are accepted:
- the commitment/allocation can derive fulfilled quantity;
- receipt does not create a new allocation ledger;
- a rejected/returned quantity does not consume final fulfilled position unless policy explicitly treats it as consumed.

The product need not model inventory on-hand unless later scope evidence requires it.

## 10. Invoice matching

Candidate match types:

### 2-way

`Commitment ↔ Supplier Invoice`

May be acceptable for certain services/prepayments/low-risk goods under policy.

### 3-way

`Commitment ↔ Accepted Receipt ↔ Supplier Invoice`

Strong pattern for goods/material control.

Possible match checks:
- vendor/legal entity;
- PO/commitment number;
- line identity;
- quantity;
- rate;
- line amount;
- tax;
- currency;
- delivery/receipt evidence;
- invoice duplicates;
- cumulative invoiced quantity/value.

Exact ownership of invoice processing/accounting posting remains open.

## 11. Match exceptions

The system must represent rather than hide:
- invoice before receipt;
- quantity invoice > accepted receipt;
- price differs from commitment;
- tax differs;
- freight/extra charge not in PO;
- duplicate invoice;
- invoice references wrong PO;
- accepted goods with no invoice;
- receipt exists but supplier invoices later in multiple parts;
- prepayment/advance before physical receipt.

Possible result states:
- `MATCHED`;
- `MATCHED_WITH_TOLERANCE`;
- `EXCEPTION_REVIEW`;
- `BLOCKED`;
- `NOT_APPLICABLE`.

Names remain provisional.

## 12. Authority seam with ERP/accounting

Possible ownership models later:

1. product owns receipt, ERP owns invoice/payment;
2. ERP owns receipt and invoice, product mirrors references/status;
3. product owns procurement receipt, sends approved receipt/match result to ERP;
4. mixed field/event ownership.

P07C requires:
- stable external IDs;
- source system;
- sync timestamp;
- field/event authority;
- stale/conflict indication;
- reconciliation history.

Do not assume deep named connector in V1.

## 13. GRN semantics

`GRN` is treated as contractor terminology for a goods-receipt artifact/event, not automatically as a separate universal entity.

Primary evidence later must determine:
- who creates it;
- whether it records physical receipt or approved acceptance;
- whether it lives in procurement, stores, site or ERP;
- whether one GRN can cover several PO lines/deliveries;
- whether one delivery generates multiple GRNs by project/location;
- whether invoice matching requires posted GRN.

## 14. Edge cases

### E01 — Supplier delivers 90 of 100

Required: partial receipt and open remainder.

### E02 — Supplier delivers 110 of 100

Required: 100 accepted + 10 excess/rejected/pending unless authorized tolerance/change.

### E03 — Delivery note says 100, receiver counts 95

Required: preserve supplier document and receiver fact separately.

### E04 — 100 received, 10 damaged

Required: accepted/usable position differs from physically received.

### E05 — Invoice arrives before materials

Required: invoice exception; no fake receipt.

### E06 — Invoice price higher than PO due to agreed amendment

Required: match against effective changed commitment, not obsolete original baseline.

### E07 — Partial invoice after partial receipt

Required: line/cumulative match supports partials.

### E08 — Returned materials after prior receipt

Required: return/reversal event adjusts current accepted position; original receipt remains evidence.

### E09 — One delivery covers several POs

Required: allocate receipt evidence across specific commitment lines; no ambiguous global received quantity.

### E10 — One PO line delivered to several sites

Required: receipt location and partial line allocations.

### E11 — Free-form item, no item master

Required: receipt works from commitment line identity and description/UOM; item master not mandatory.

### E12 — ERP creates GRN first

Required: mirror/import authoritative external receipt with provenance; do not create conflicting product-owned receipt.

## 15. Failure patterns to reject

Fail later audit if design:
- treats invoice as receipt;
- marks full fulfillment on delivery note without receiver/acceptance evidence;
- cannot handle partial receipts;
- cannot represent rejected/damaged/returned quantity;
- silently accepts over-delivery beyond ordered/authorized quantity;
- requires inventory item master for all goods;
- creates duplicate receipt truth in product and ERP with no authority rule;
- cannot match invoice line to the exact effective commitment basis;
- overwrites prior receipt after return/correction;
- forces deep warehouse/inventory scope to support procurement receipt control.

## 16. Primary audit tests later

1. Who receives goods at site/store and who creates GRN?
2. Is receipt quantity different from accepted quantity in practice?
3. How are damaged/rejected/short materials recorded?
4. Does invoice processing require GRN?
5. Is 2-way or 3-way match used?
6. Who resolves match exceptions?
7. Are over-deliveries accepted with tolerance?
8. How are returns/replacements handled?
9. Can one delivery cover several POs/projects?
10. Where is GRN authoritative: site sheet, ERP, procurement tracker, stores system?
11. What fields are manually re-entered into accounting?
12. How are partial invoices and partial deliveries reconciled?

## 17. Current disposition

### Strong enough to carry forward provisionally
- physical receipt is distinct from invoice/payment;
- delivery/receipt/acceptance may be separate facts;
- partial receipt first-class;
- accepted quantity drives fulfillment, not supplier delivery note alone;
- rejection/damage/return preserve historical events;
- 3-way match is a strong goods-control pattern but configurable;
- free-form/non-stock lines supported;
- ERP/accounting authority seam explicit;
- procurement receipt does not require full inventory ownership.

### Still unresolved
- exact GRN object/state model;
- inspection/QA depth;
- default over-receipt tolerance;
- whether product owns invoice-match engine or only exposes evidence/status;
- ERP receipt ownership in beachhead customers;
- inventory/store interface depth;
- prepayment treatment for goods;
- exact receipt reversal/correction semantics.

## 18. Next dependency

Proceed to P07D subcontract SOV/progress valuation/certification/retention/advance/recoupment, keeping claim, certification, invoice and payment truth separate.