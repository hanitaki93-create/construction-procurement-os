# CPOS Material / Purchase Requisition Capability v0.1

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

The primary user object is **Material Requisition (MR)** / **Purchase Requisition (PR)**, not `AuthorizedRequirementSource` or `RequirementAllocation`.

A site/project/requesting user states what is needed, why, where, when and against which project/cost context. Procurement reviews the request and routes approved lines to RFQ/tender, direct order, package sourcing or another governed disposition.

## Object structure

### Requisition header
- immutable internal ID;
- automatic business number;
- project;
- requesting user/team;
- request date;
- required/need-by date;
- priority;
- delivery/ship-to location;
- purpose/subject;
- notes/instructions;
- lifecycle status;
- approval/reviewer state;
- attachments;
- source/import reference where applicable.

### Requisition line
- line number;
- master item/service/scope reference **or free-form line**;
- line type;
- description and detailed specification;
- requested quantity;
- governed UOM reference;
- required date override;
- manufacturer/brand/model or approved-equivalent rule where relevant;
- preferred/known supplier optional;
- technical notes;
- attachments/specification evidence;
- requested, approved, allocated, sourced, ordered and received quantities as distinct user-visible positions.

### Distribution / cost attribution
A line may split across one or more distributions. Each distribution binds to project cost/WBS/cost-code reference and carries the applicable quantity/percentage/amount allocation under a registered conservation rule.

## Lifecycle

Minimum visible states:
`DRAFT -> SUBMITTED -> UNDER_REVIEW -> APPROVED/PARTIALLY_APPROVED/REJECTED -> SOURCING/ORDERING -> PARTIALLY_FULFILLED -> FULFILLED/CLOSED`

Cancellation/supersession must preserve history. Line-level status may differ from header status.

## Routes

Approved lines may be routed to:
- RFQ/tender;
- direct LPO/PO where policy/authority allows;
- procurement package/grouped sourcing;
- external/ERP/stock fulfillment disposition when that capability exists.

The user selects business intent. Existing B05 `RequirementAllocation` remains the backend scope-conservation mechanism.

## Numbering

Use the registered numbering service. Example class: `MR`. Number assigned automatically under a tenant/project/year policy. Issued/submitted numbers are never reused.

## Documents and outputs

- professional MR print/PDF;
- Excel export where useful;
- attachment index;
- revision/status history;
- approval trail.

## Register

MR register must support at least number, project, requester, date, need-by, priority, status, line count, pending approval, sourcing progress and overdue/risk indicators, with search/filter/export.

## Downstream propagation

Creating an RFQ from MR lines must copy/link the approved line identity, description/specification, quantity/UOM, attachments and cost/project context without re-keying. Any downstream edit that changes business meaning is a new governed representation, not a rewrite of the MR source.

## Backend mapping

Reuse B05 authorized requirement source/basis/allocation for scope authority and conservation. Add user-facing requisition header/line/distribution identities and explicit mapping to those primitives.

## AI readiness

AI may assist free-text intake, item/UOM matching, specification extraction and route suggestions, but cannot silently change approved quantity/cost attribution or submit/approve the MR.

## Acceptance

A domain reviewer must be able to raise a real 10+ line construction MR, attach drawings/specifications, split a line to cost codes, approve selected lines, convert those lines into an RFQ without re-entry, print the MR, and trace every downstream line back to the original request.
