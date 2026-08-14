# CPOS Material / Purchase Requisition Capability v1.0

## User meaning

The primary demand object is **Material Requisition (MR) / Purchase Requisition (PR)**, not an allocation ontology. A requester states what is needed, where, when and against which project/cost context. Procurement routes approved lines to RFQ/tender, direct order, package sourcing or another governed disposition.

## Header

- immutable ID and automatic business number;
- project/legal entity/authority context;
- requester/team;
- request date;
- need-by/required-on-site date;
- priority;
- delivery/ship-to location;
- purpose/subject;
- notes/instructions;
- lifecycle and approval state;
- attachments;
- source/import reference where applicable.

## Lines

- line number;
- master item/service/scope reference OR explicit free-form line;
- line type;
- description and detailed specification;
- requested quantity;
- governed UOM;
- required-date override;
- manufacturer/brand/model or approved-equivalent rule;
- preferred/known supplier optional;
- technical notes and attachments;
- requested, approved, sourced, ordered and received positions as distinct user-visible quantities.

## Distributions / cost attribution

A line may split across cost/WBS references. Each distribution carries quantity/percentage/amount attribution under a registered conservation rule. External ERP cost structures may be referenced/mirrored.

## Lifecycle

Minimum visible states:
`DRAFT -> SUBMITTED -> UNDER_REVIEW -> APPROVED/PARTIALLY_APPROVED/REJECTED -> SOURCING/ORDERING -> PARTIALLY_FULFILLED -> FULFILLED/CLOSED`

Cancellation/supersession preserves history; line state may differ from header state.

## Routes

Approved lines can route to RFQ/tender, direct LPO/PO where policy/authority permits, grouped procurement package, or external/ERP/stock disposition when enabled.

## Outputs / register

Professional MR PDF/print, Excel export where useful, attachment index, approval trail and MR register with number, project, requester, dates, priority, status, line count, pending approval, sourcing progress and overdue/risk.

## Downstream propagation

RFQ/order creation copies/links approved line identity, description/specification, quantity/UOM, attachments and project/cost context without re-keying. Downstream commercial changes create governed representations rather than rewriting MR source truth.

## Acceptance

A domain reviewer can raise a 10+ line construction MR, mix catalogue/free-form lines, attach drawings/specs, split a line to cost codes, approve selected lines, convert them to RFQ without re-entry, print the MR and trace every downstream line back to the request.