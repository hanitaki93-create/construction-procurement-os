# CPOS Product Recovery Sequence v0.1

**Date:** 2026-08-13
**Status:** DRAFT / OLD B07+ NOT AUTHORIZED

## Existing blocks

- B01 Foundation: **KEEP**.
- B02 Platform/authority/RLS: **KEEP**.
- B03 async/effects/reconciliation: **KEEP**.
- B04 evidence/files/artifacts: **KEEP BACKEND; hide generic evidence vocabulary from ordinary UX**.
- B05 requirements/allocation: **KEEP conservation engine; add real MR/PR product model above it**.
- B06 sourcing/version/grant/issue: **KEEP core; materially extend supplier master and RFQ formation**.

## Recovery blocks

### R01 Capability compiler and product vocabulary
Create accepted CapabilitySpecifications, user-object vocabulary, navigation contract, user acceptance gates and domain-owner validation. A SPINE capability cannot pass merely because an internal primitive exists.

### R02 Master/reference data + numbering + document kernel
Supplier/item/service/UOM/category/cost-code/currency/payment-term/project-location references; concurrency-safe business numbering; product-owned document templates; deterministic PDF/Excel rendering over B04 issued artifacts.

### R03 Material/Purchase Requisition
First-class MR header, lines and cost/WBS distributions. Item-master or free-form lines. Need-by/delivery/priority/approval/attachments. Route to RFQ, direct order or governed alternative. Backend lineage binds to existing requirement/allocation truth.

### R04 Supplier master + compliance/eligibility
Credible supplier/subcontractor profile, multiple contacts/addresses, tax and licence identifiers, categories/trades, compliance documents and expiry, sourcing eligibility, separate commitment eligibility, history hooks.

### R05 RFQ/Tender formation and issue
Create RFQ from approved MR/package lines without re-keying. Supplier selection, line/group propagation, commercial instructions, response schedule, attachments, due date, addenda and professional issued PDF/Excel. Manual download/send and secure-link paths are first-class.

### R06 Supplier quotation/revision
Preserve old B07 semantic strength: immutable source submission, revisions, buyer capture, withdrawal/late/quarantine states, attachments, structured/file/manual channels, no mandatory supplier account.

### R07 Comparison/leveling + bounded AI extraction
Side-by-side pricing and scope, missing/excluded/alternate/bundled mappings, UOM/currency normalization, commercial deviations, buyer adjustments and supplier-confirmed basis. AI may propose extracted mappings only with source citations, confidence and human confirmation; deterministic manual path remains complete.

### R08 Recommendation/approval/award
Recommendation snapshot, supplier/value/risk/compliance context, non-lowest/sole-source justification, DOA approval, stale-approval invalidation, AwardDecision separate from Commitment, reproducible recommendation output.

### R09 Early LPO/PO/Subcontract formation
Move simple commitment formation forward. Convert approved award basis into numbered LPO/PO/subcontract with supplier/project/company details, lines/SOV, rates/amounts, delivery/payment/terms, attachments and issue-ready immutable PDF. Full variations/claims/certification/recovery remain later P07.

### R10 Procurement schedule/registers/internal product consolidation
MR/RFQ/quotation/comparison/approval/order registers, supplier-compliance register, procurement schedule/long-lead milestones, project/portfolio dashboards, queues, search/filter/export, responsive/RTL/accessibility consolidation. Milestones derive from domain events wherever possible.

## First serious product-review gate

No contractor-facing product review is called serious until CPOS can execute:

`Project -> MR -> RFQ -> supplier quotation/revision -> comparison -> recommendation/approval -> award -> LPO/PO/subcontract`

with supplier master/compliance, item/UOM/cost references, automatic numbering, professional documents, attachments/history and operational registers throughout.

Anything less is an engineering control surface.
