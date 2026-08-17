# ERP Reverse Engineering Slice S02 — Material / Purchase Requisition

## Scope lock

This slice is **only** the Material / Purchase Requisition operating object and the shell needed to use it. It does not redesign RFQ, comparison, award, PO/LPO or subcontract.

The build rule is evidence first, then implementation in the same slice. No unrelated feature invention.

## Primary benchmark: SAP S/4HANA Purchase Requisition

Observed purchase-requisition grammar used as the main control:

- requisition is a business object, not a wizard;
- header information, notes, items and approval details remain attached to one requisition;
- line detail separates quantity/date, source of supply, delivery, notes and attachments;
- requester demand and approval are distinct;
- approvers may be permitted to edit specific fields while the document is actually in approval;
- rejected/rework states are explicit rather than silently editing a closed approval;
- related documents and workflow history are navigable from the requisition context.

CPOS S02 deliberately does **not** reproduce SAP breadth. It adopts the proven object grammar and specializes it for construction project demand.

## Secondary benchmark: Oracle Fusion Procurement

Observed requisition concepts used to challenge field coverage:

- description-based/free-text requisition lines are first-class;
- requested delivery date is a line-level purchasing concept;
- supplier / suggested supplier can be captured before purchase-order formation;
- manufacturer and requester/deliver-to information can accompany a requisition line;
- a requisition remains demand, even when a suggested source exists.

## Construction boundary: ProcurePro

ProcurePro is used to stop the MR from turning into a generic finance ERP object. Construction procurement remains project-centric and downstream work must stay connected to packages, tendering, comparison, recommendation and contract formation.

## Product-owner corrections locked in S02

1. **Approval != sourcing route.**
   - Approval decides whether/how much project demand is authorized.
   - Sourcing route decides how an approved line enters procurement.

2. **A route is not a casual dropdown after it is set.**
   - Existing route decisions render read-only.
   - The API rejects direct route replacement.
   - A future route change must be an explicit controlled reopen/revision capability with audit history.

3. **MR print output is the item schedule.**
   - The print/PDF action belongs to the Items tab.
   - Print output contains a compact header plus requested lines, quantities, UOM, need date, proposed supplier and remarks.
   - Approval/sourcing UI is not printed as the MR item schedule.

4. **Expose fields already supported by the domain instead of hiding them.**
   - header required supply/on-site date
   - header remarks/site instructions
   - line required-date override
   - optional proposed supplier
   - manufacturer / brand / model or supplier item reference
   - equivalency rule
   - line technical remarks

5. **Proposed supplier is non-binding.**
   - It does not approve a supplier, skip competition or constitute an award.

6. **Site/requester and procurement creation are both legitimate.**
   - Existing governed role policy already allows Requester, Buyer, Procurement Manager and Owner to create MR demand.
   - S02 makes the requestor/team context visible but does not invent a new people master.

7. **No fake lifecycle.**
   - Replace the vague lifecycle tab with concrete `Approval`, `Sourcing` and `History` views.
   - Downstream records are shown only when real owned modules create them.

## Realistic review fixture

S02 seeds an eight-line submitted MR from the supplied MAMS Trading quotation Ref #15967 solely to stress-test MR density and approval behavior.

The fixture copies demand-relevant description, quantity, UOM, proposed supplier and supplier item references. It intentionally does **not** copy quoted price, VAT or total into the MR because those belong to supplier quotation/commercial sourcing evidence, not internal project demand.

## S02 review gate

Do not proceed to another procurement slice until the product owner can comfortably:

1. scan the MR register;
2. create a new multi-line MR;
3. open the eight-line fixture;
4. read all item data without toy-sized typography;
5. submit a draft;
6. approve/reject line quantities;
7. understand each sourcing route;
8. set a route once and see it become locked/read-only;
9. print a usable item-centric MR schedule.
