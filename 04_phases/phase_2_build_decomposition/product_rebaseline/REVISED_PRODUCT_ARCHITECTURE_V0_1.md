# CPOS Revised Product Architecture v0.1

## Architecture thesis

Keep the accepted modular/PostgreSQL substrate, but require explicit product domains that mirror how procurement users think and work. Internal semantic primitives may remain more rigorous than the UI, but they may not replace user-facing business objects.

## Product domains

### Platform / authority
Tenant, legal entity, project, users, roles, DOA, delegation, subscription/configuration and project context.

### Master / reference data
Supplier/subcontractor master; contacts/addresses; registrations/compliance/eligibility; item/material/service/scope master; UOM; categories/trades; currencies/taxes/payment terms; project delivery locations; cost/WBS references; numbering policies; document template classes.

### Requisition / demand
Material Requisition / Purchase Requisition header, lines, distributions, attachments, approvals and routing. ProcurementPackage remains available for complex/package sourcing. RequirementAllocation may be reintroduced only as an internal scope-conservation lineage if the rebuilt MR model proves it useful.

### Sourcing / tender
RFQ/Tender header, lines sourced from MR/package, supplier selection, bid form/response schema, commercial/technical instructions, tender documents, addenda, clarifications, due dates, issue/distribution and immutable issued versions.

### Supplier participation / submissions
Secure task/link, email/manual/buyer capture, intent/no-bid, original quotation files, structured values, revisions, withdrawals, late-response treatment and exact source provenance.

### Comparison / negotiation
Supplier-source layer, normalized layer, buyer adjustment, clarification state, alternates, missing/excluded scope, technical/commercial deviations, supplier-confirmed basis and frozen comparison snapshots.

### Decision
Recommendation, approval case, authority checks, negotiation outcome, AwardDecision and structured justification including non-lowest, split and sole-source cases.

### Early commitment formation
LPO/PO/Subcontract header and lines/SOV, supplier/project/currency/tax/payment/delivery terms, awarded-basis lineage, approvals, numbering, professional issued document, revision/amendment boundary and ERP handoff.

### Fulfillment / downstream seam
Delivery/receipt/GRN evidence, partial receipt, discrepancy/return seam and ERP/AP/invoice reference/reconciliation. Full inventory/GL/AP remains external unless later evidence changes scope.

### Planning / workbench
Procurement schedule; MR/RFQ/quote/comparison/award/order registers; tasks, overdue/risk and ball-in-court; package status; portfolio views; search/filter/export/drill-down. Actual milestones derive from canonical events.

### Documents
A product-owned template/rendering layer produces professional MR, RFQ, comparison/recommendation and LPO/PO/Subcontract outputs. Users operate on Documents/Attachments/Issued Documents, not backend provenance vocabulary.

### AI assistance
AI maps source documents into deterministic product schemas with citations/confidence and human confirmation. Initial wedge: supplier quote extraction and bid leveling. Later: RFQ drafting, specification extraction, supplier intelligence, historical price analysis, recommendation briefing, contract drafting and schedule risk.

## Cross-cutting controls

1. CapabilitySpecification before build.
2. Domain `MEANING_PASS` before build authorization.
3. Numbering is governed by document-class policy with concurrency/gap/reissue semantics.
4. Template classes are product-owned/versioned; no V1 expression language.
5. Internal immutable ID is separate from displayed/legal number.
6. Every product block ships real UI, register and output behavior; no later block may defer basic usability.
7. AI proposals never silently replace supplier/source or approved commercial truth.

## ERP coexistence

CPOS owns construction procurement execution and decision provenance while allowing Oracle/SAP/CMiC/Vista/etc. to remain authoritative for selected accounting, AP, GL, inventory or payment fields. Interfaces use explicit OWN/MIRROR/REFERENCE authority and reconciliation rather than a duplicate editable ledger.

## First product bar

A contractor must be able to execute a real job from numbered MR through numbered issue-ready LPO/PO/Subcontract without re-keying core lines, while preserving supplier quote originals, comparison provenance, approvals, attachments and history.