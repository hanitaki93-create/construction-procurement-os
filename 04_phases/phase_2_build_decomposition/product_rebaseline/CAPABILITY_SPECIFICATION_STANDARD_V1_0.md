# CPOS Capability Specification Standard v1.0

Every material product capability requires an accepted `CapabilitySpecification` before implementation authorization.

## Mandatory sections

### A. User meaning
Capability name in ordinary procurement language, primary roles, business outcome, and internal/backend terms that must not leak into ordinary UX.

### B. User-facing object model
Header, lines, distributions/splits, attachments/documents, source/derived lineage, catalogue/master-backed versus free-form records.

### C. Fields
For every field: label, meaning, type, required/optional/conditional status, master/reference source, defaults, lifecycle editability, validation, security classification, downstream-copy behavior.

### D. Identity and numbering
Immutable internal identity; displayed business/document number; scope; format; auto/manual policy; gap policy; cancellation/reissue behavior; concurrency mechanism; legal/audit implication.

### E. Lifecycle
Visible statuses, allowed actions, approval/review gates, cancel/withdraw/revise/supersede behavior, downstream effect, late/exception states.

### F. Journey position
Predecessors, successors, conversion/copy rules, grouping/splitting rules, legitimate bypass/direct-buy routes, source truth versus copied working values.

### G. Documents and outputs
Required printable/issued document classes, template inputs, headers, line/table layout, terms/notes/attachments index, revision marking, language/RTL, preview/download/issue/manual-send behavior and immutable issued-artifact binding.

### H. Registers and operational views
List/register columns, search/filter/sort, status summaries, overdue/risk indicators, portfolio visibility where applicable, and drill-down links.

### I. Backend truth mapping
Authoritative domain objects, accepted B01-B03 primitives reused, any B04-B06 mechanisms intentionally salvaged, new objects, invariants, write owner, concurrency profile, provenance bindings and ERP authority boundary.

### J. AI readiness
Source data, deterministic target schema, citation/provenance, confidence/uncertainty, human confirmation, forbidden silent actions and evaluation criteria.

### K. User acceptance
At minimum create/edit/review/approve-or-issue flow; print/export/download where the object is a business document; revision/cancellation; one error/exception; predecessor -> capability -> successor; role/permission behavior; mobile/RTL disposition.

## Required first-spine specs

- Master/reference data;
- Supplier Master + compliance;
- Material/Purchase Requisition;
- RFQ/Tender formation and issue;
- Supplier Quotation and Revision;
- Bid Comparison/Leveling;
- Recommendation/Approval/Award;
- Early LPO/PO/Subcontract formation;
- Procurement Workbench/Schedule;
- Receipt/GRN handoff seam;
- Business document template/rendering;
- Numbering policy.

## Completeness compiler

A new check must fail build authorization when any retained capability lacks:

`CapabilitySpecification -> user object -> fields/master refs -> numbering disposition -> lifecycle -> predecessor/successor -> document/output disposition -> backend mapping -> user acceptance -> domain-owner decision`

A SPINE/required capability cannot be satisfied only by an internal table, invariant or service.

## Domain validation

Before a block begins, the project owner/domain reviewer records `MEANING_PASS` or `MEANING_FAIL` against each owned capability spec. Technical audit remains separate and cannot substitute for domain acceptance.