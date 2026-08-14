# CPOS Revised Product Architecture v0.1

## 1. Architecture thesis

Keep the strong modular/PostgreSQL substrate, but introduce explicit product domains that mirror how procurement users think and work. Internal semantic primitives may remain more rigorous than the UI, but they may not replace user-facing business objects.

## 2. Product domain map

### Platform / authority
Tenant, legal entity, project, users, roles, DOA, project context, subscriptions and configuration.

### Master and reference data
Supplier/subcontractor master; contacts/addresses; compliance/eligibility; item/material/service/scope master; UOM; categories/trades; currencies/taxes/payment terms; project delivery locations; cost/WBS references; document numbering policies; template classes.

### Requisition / demand
Material Requisition / Purchase Requisition header, lines, distributions, attachments, approvals and routing. ProcurementPackage remains available for complex/package sourcing. Existing RequirementAllocation may serve as internal scope-conservation lineage.

### Sourcing / tender
RFQ/Tender header, lines sourced from MR/package, selected suppliers, bid form/response schema, commercial/technical instructions, tender documents, addenda, clarifications, due dates, issue/distribution and immutable issued versions.

### Supplier participation / submissions
Secure task/link, email/manual/buyer capture, intent/no-bid, original quotation documents, structured values, revisions, withdrawals, late-response treatment and exact source provenance.

### Comparison / negotiation
Supplier-source layer, normalized layer, buyer evaluation adjustment, clarification state, alternates, missing/excluded scope, technical/commercial deviations, supplier-confirmed basis and frozen comparison snapshots.

### Decision
Recommendation, approval case, authority checks, negotiation outcome, AwardDecision and justification including non-lowest/split/sole-source cases.

### Early commitment formation
LPO/PO/Subcontract header + lines/SOV, supplier/project/currency/tax/payment/delivery terms, awarded-basis lineage, approvals, numbering, professional issued document, revision/amendment boundary and external ERP handoff.

### Fulfillment / downstream seam
Delivery/receipt/GRN evidence, partial receipt, discrepancy/return seam and ERP/AP/invoice reference/reconciliation. Full inventory/GL/AP remains external unless later evidence changes scope.

### Planning / workbench
Procurement schedule, MR/RFQ/quote/award/order registers, tasks/overdue/risk, package status, portfolio views, search, filters, exports and drill-down. Actual milestones derive from canonical domain events.

### Documents
Evidence/object storage remains the provenance substrate. A product-owned template/rendering layer produces professional MR, RFQ, comparison/recommendation and LPO/PO/Subcontract outputs. Users operate on Documents/Attachments/Issued Documents, not `EvidenceVersion` vocabulary.

### AI assistance
AI maps source documents into deterministic product schemas with citations/confidence and human confirmation. Initial wedge: supplier quote extraction and bid leveling. Later wedges include RFQ drafting, specification extraction, supplier shortlist intelligence, historical price analysis, recommendation briefing, contract drafting and schedule risk.

## 3. New cross-cutting controls

1. CapabilitySpecification required before build.
2. Domain `MEANING_PASS` required before build authorization.
3. Numbering is a governed policy/invariant with document-class gap policy and concurrency semantics.
4. Template classes are product-owned/versioned; V1 tenant customization is bounded and has no expression language.
5. Every business document has immutable internal ID separate from displayed/legal number.
6. Every product block ships real UI, registers and document/output behavior; no future block may be used to defer basic usability.
7. AI proposals never silently replace supplier/source or approved commercial truth.

## 4. ERP coexistence

CPOS aims to own construction procurement execution and commercial decision provenance while allowing Oracle/SAP/CMiC/Vista/etc. to remain authoritative for selected accounting, AP, GL, inventory or payment fields. Interfaces use explicit OWN/MIRROR/REFERENCE authority and reconciliation rather than a duplicate editable ledger.

## 5. First product bar

A contractor must be able to execute a real job from numbered MR through numbered issue-ready LPO/PO/Subcontract without re-keying core lines, while preserving quote originals, comparison provenance, approvals, attachments and history.