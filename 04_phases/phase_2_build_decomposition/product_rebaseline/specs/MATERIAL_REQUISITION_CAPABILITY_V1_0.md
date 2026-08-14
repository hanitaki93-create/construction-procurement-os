# CPOS Material / Purchase Requisition Capability v1.0

## User meaning

The primary demand object is **Material Requisition (MR) / Purchase Requisition (PR)**, not an allocation ontology. A requester states what is needed, where, when and against which project/cost context. Procurement routes approved lines through the governed Procurement Policy / Route decision to RFQ/tender, direct order, package sourcing or another valid disposition.

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

## Route decision

Approved demand is evaluated against the current governed ProcurementRoutePolicyVersion using value/category/project/legal-entity and other configured typed criteria. The route result may permit/require competitive RFQ, direct LPO/PO, package sourcing, sole-source exception, later framework call-off, or external/ERP/stock disposition.

The exact ProcurementRouteDecision and policy version are preserved. An emergency/direct/sole-source path does not bypass required justification or authority simply because the user can navigate to an order screen.

## Outputs / register

Professional MR PDF/print, Excel export where useful, attachment index, approval trail and MR register with number, project, requester, dates, priority, status, line count, route/status, pending approval, sourcing progress and overdue/risk.

## Downstream propagation

RFQ/order creation copies/links approved line identity, description/specification, quantity/UOM, attachments and project/cost context without re-keying. Downstream commercial changes create governed representations rather than rewriting MR source truth.

## Acceptance

A domain reviewer can raise a 10+ line construction MR, mix catalogue/free-form lines, attach drawings/specs, split a line to cost codes, approve selected lines, see the applicable procurement route, convert RFQ-routed lines without re-entry, process a separately authorized direct-buy line under policy, print the MR and trace every downstream line/route decision back to the request.