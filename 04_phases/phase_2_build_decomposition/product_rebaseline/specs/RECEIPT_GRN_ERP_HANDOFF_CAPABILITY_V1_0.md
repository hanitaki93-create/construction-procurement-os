# CPOS Receipt / GRN / ERP Handoff Capability v1.0

## Purpose

Close the first procurement spine far enough to know what was delivered/received and reconcile the order with an external ERP/AP/inventory authority without pretending CPOS owns a full warehouse or accounting ledger.

## Distinctions

`delivery != receipt != acceptance != return != invoice != payment`

These states must not be collapsed.

## Receipt header

- immutable receipt ID and governed business number where CPOS issues a GRN;
- project/site/location;
- supplier;
- LPO/PO reference;
- delivery note/reference;
- receipt date/time;
- receiver;
- status;
- attachments/photos/documents;
- external ERP/GRN ID where mirrored/referenced.

## Receipt lines

- order line identity;
- delivered quantity;
- received/accepted quantity;
- rejected/damaged/short quantity;
- governed UOM;
- condition/remarks;
- batch/serial only where the item/category requires it;
- evidence attachments;
- return/replacement linkage.

## Lifecycle

`EXPECTED -> PARTIALLY_RECEIVED -> RECEIVED -> ACCEPTED/REJECTED/PARTIAL -> RETURNED/CORRECTED -> CLOSED`

Corrections preserve history rather than destructively rewriting operated receipts.

## PO balance

Users can see ordered, received, accepted, returned and open quantities/values without confusing that operational position with invoice/payment truth.

## ERP/AP/inventory coexistence

Each integration field/event declares OWN, MIRROR or REFERENCE authority. CPOS records outbound handoff, external acceptance/rejection, external IDs, stale/reconciliation state and replay/effect status. It does not silently create AP/GL postings.

## Outputs / register

GRN/receipt PDF where CPOS owns it; receipt register by supplier/project/order/date/status; discrepancy/return queue; order balance drill-down.

## Acceptance

One PO is delivered in two partial shipments; one line is short and another damaged. The receiver records evidence, accepts valid quantities, creates a return/discrepancy, sees the remaining order balance, and CPOS hands the governed receipt state to an external ERP with explicit accepted/rejected/reconcile status.