# CPOS Architecture V2 — Audit Candidate v0.2

**Date:** 2026-08-14
**Status:** HOSTILE-REVIEW CANDIDATE / NOT FROZEN / NOT BUILD-AUTHORIZED
**Clean code lineage:** accepted `main@b44dcadc2d898b1db98c3a9dc3b182a88c198cd3` (B03)

## 1. Rebaseline decision

Architecture V2 is an **amendment and recompilation of the strong Phase-1 architecture**, not a blank-sheet restart.

Preserve unless contradicted by evidence:
- tenant/legal-entity/project authority model;
- PostgreSQL authoritative state;
- RLS/context isolation;
- exact decimal and explicit money/UOM semantics;
- operation/idempotency discipline;
- concurrency/invariant enforcement;
- immutable versions/occurrences/source provenance;
- `AwardDecision != Commitment`;
- supplier source truth distinct from normalized/buyer-adjusted/confirmed commercial basis;
- `CommercialTermsAuthority != scope-consuming call-off`;
- delivery != receipt != acceptance != invoice/payment;
- commercial truth != accounting authority;
- provider-neutral external effects/integration seams.

The old Phase-2 product decomposition from B04 onward is **superseded**. Rejected B04-B06 code is not inherited by the clean rebuild. Individual mechanisms may be salvaged only by explicit adoption into a V2 capability and reverified there.

## 2. Product thesis

CPOS is a construction-procurement system of action and intelligence that can coexist with Oracle/SAP/CMiC/Vista or another ERP. It must meet the conventional procurement floor while being materially better in construction-specific planning, scope control, supplier participation, bid analysis, decision intelligence, contract execution and AI-assisted work.

A user must never need to understand backend ontology to perform ordinary procurement.

## 3. Product domains

### 3.1 Platform / authority
Tenant, company/legal entity, project, users, roles, DOA, delegation, project context and governed configuration.

### 3.2 File / attachment / issued-artifact provenance substrate
The clean rebuild does not inherit rejected B04 product code. V2 therefore explicitly rebuilds FileAsset, BusinessAttachment, SourceDocumentVersion and IssuedArtifactVersion semantics. Every load-bearing source/issued document has immutable content/version identity, access context and source/artifact lineage. Ordinary UX says Documents/Attachments/Issued Documents, not evidence ontology.

### 3.3 Master / reference data
Supplier/subcontractor master; items/materials/services; UOM; categories/trades; cost/WBS; currencies/tax/payment terms; delivery locations; numbering policies; document template classes and governed commercial-term blocks.

Catalogue/master-backed and free-form construction lines coexist.

### 3.4 Procurement budget / cost-plan authority
Project/package procurement decisions bind to an explicit ProcurementBudgetBasis/version with source and OWN/MIRROR/REFERENCE authority. Estimating allowances may seed/reference the budget but never become undefined 'budget variance' numbers. Historical approvals retain the budget basis relied upon.

### 3.5 Supplier master / registration / qualification / eligibility
Supplier identity, contacts, legal/tax records and compliance are durable master facts. Registration, qualification/requalification, preferred status and tender/award eligibility are separate contextual lifecycles. Qualification may vary by trade/category/region/project; no universal `approved vendor` boolean replaces this model.

### 3.6 Supplier performance / workload / exposure
Company-wide procurement history, performance ratings, current tender/commitment exposure and explainable capacity indicators become visible during shortlisting, leveling and recommendation. Heuristics cannot silently become eligibility policy.

### 3.7 Scope knowledge / lessons learned
A company Scope of Works Library holds approved reusable trade/package scope content, inclusions/exclusions, interface obligations, required returnables, price-breakdown structures and lessons proposals. Projects instantiate/tailor governed versions; the exact frozen project scope binds to RFQ/contract artifacts.

### 3.8 Estimating / pre-award handover
A won project may inherit estimating-package allowances, tender-stage vendors/quotes, assumptions, risks/opportunities and source files. Handover context seeds procurement but remains immutable historical source rather than silently becoming current truth.

### 3.9 Demand / requisition
Material Requisition / Purchase Requisition header, lines, distributions, attachments, review/approval and routing. Approved lines may route to direct order, RFQ, Procurement Package or later framework call-off. Internal conservation/allocation mechanisms may exist but do not replace MR/PR UX.

### 3.10 Procurement package / plan
Optional trade/complex-scope grouping with source-scope conservation, estimating context, Scope Library instance, budget basis, owner and core procurement schedule.

### 3.11 Procurement schedule core
Planning starts with MR/package creation. Required-on-site, baseline, forecast, supplier-confirmed and actual dates are distinct. Baseline milestones cover RFQ issue/return, comparison/recommendation, approval, award/order/contract and delivery/start. Actual milestones derive from canonical transactions.

### 3.12 RFQ / tender
Numbered RFQ/Tender built from approved MR/package scope without re-keying. Includes frozen scope where relevant, bid form/price breakdown, commercial/technical requirements, due dates, registration/qualification-aware supplier selection, documents, clarifications/addenda and immutable issue versions. Product-owned event policy may support ordinary or blind/sealed response visibility where required.

### 3.13 Procurement correspondence / clarifications
Procurement-relevant invitations, reminders, questions, clarifications, addenda, negotiation confirmations, award notices and contract communications are context-bound records with sender/recipient/channel/source provenance. Clarifications may change a confirmed commercial basis only through an explicit governed path; they never mutate original RFQ/quotation truth.

### 3.14 Supplier participation / quotations
Low-friction secure participation plus controlled email/file/manual/buyer-on-behalf capture. Preserve original quotation files, intent/no-bid, revision/withdrawal/late treatment, structured values and exact source provenance.

### 3.15 Technical / document approval dependencies
CPOS owns or references procurement gates for material submittals, samples, proposed alternates, shop drawings or other technical approvals. A CDE such as Aconex/Procore may remain authoritative. Comparison/recommendation/order retain the exact approval state/reference relied upon; a priced alternate is not automatically a technically approved equivalent.

### 3.16 Comparison / leveling / negotiation
Four commercial layers remain explicit:
1. supplier source/submission;
2. normalized representation;
3. buyer adjustment;
4. supplier-confirmed contractable basis.

Handle missing/excluded scope, alternates/substitutes, bundles, partial coverage, currency/UOM normalization, technical/commercial deviations, clarifications and frozen ComparisonSnapshot. Supplier qualification/performance/exposure and technical-approval state appear beside current bids.

### 3.17 Recommendation / approval / award
Recommendation binds the exact comparison snapshot, ProcurementBudgetBasis/version, chosen supplier/basis, scope/deviations, technical status, qualification/compliance and relevant supplier intelligence. Govern non-lowest, split, sole-source and conditional decisions through DOA/approval. `AwardDecision` remains distinct from commitment.

### 3.18 Early LPO / PO / Subcontract formation
Approved award converts without re-keying into a numbered instrument with header, lines/SOV, taxes/currency/payment/delivery terms, exact scope/award lineage, approvals, annexures and professional issued artifact.

### 3.19 Contract execution / eSignature
Issued does not equal executed. Track send/delivery, acknowledgment/signatory routing, signature progress, reminders, decline/expiry/failure, executed final artifact and audit trail. Provider-neutral architecture permits manual/external eSign first and integrations later.

### 3.20 Framework / blanket / rate agreements and call-offs
Retain CommercialTermsAuthority separately from scope-consuming releases/call-offs. Agreements may govern rates, terms, expiry and true limits; call-offs consume approved MR/package scope and bind the exact agreement version. Agreement existence alone never fabricates ordered quantity/committed cost. Implementation may follow the first closed spine unless pilot evidence moves it earlier.

### 3.21 Workbench / registers / portfolio schedule
Daily role-focused home and serious registers for MR, packages, RFQs, responses, comparison, decisions, orders/contracts and receipts. Roll up schedule facts created earlier; show variance/risk/ball-in-court, supplier exposure, expiring compliance/qualification and unsigned-contract risk.

### 3.22 Receipt / GRN / ERP seam
Delivery, receipt, acceptance, shortage/damage/return remain distinct. Support partial receipt/GRN where owned and reconcile order/receipt references with external ERP/AP/inventory without duplicating GL/AP authority.

### 3.23 Business documents / rendering
Product-owned, versioned template/rendering classes generate professional MR, Scope of Works, RFQ, comparison/recommendation and LPO/PO/Subcontract outputs. Issued artifacts bind exact source versions/template/attachments. V1 does not expose tenant-authored code or a general expression language.

### 3.24 AI assistance
AI operates on deterministic objects and exact source provenance. Initial wedge: supplier PDF/Excel quotation extraction -> cited structured proposal -> RFQ-line mapping -> normalized comparison -> human confirmation.

Later: estimating handover extraction, scope-gap detection, historical pricing, supplier-performance synthesis, RFQ/spec drafting, clarification drafting, recommendation briefing and schedule risk. AI never silently changes supplier source truth, approved quantity/cost attribution, qualification/eligibility, technical approval, award, signature or executed commercial truth.

## 4. Cross-cutting identity / numbering / calculation

Internal UUID identity is separate from business/document number. Each numbered class declares scope, mask, sequence, gap policy, assignment timing, cancellation treatment, revision/reissue behavior and concurrency mechanism; `MAX(number)+1` is prohibited.

Money/UOM/currency/tax/discount calculations use explicit exact-decimal, rounding and conversion policies. Normalization preserves original supplier values and records conversion basis/version.

## 5. ERP / CDE coexistence

Every integrated field/domain declares authority as OWN / MIRROR / REFERENCE. CPOS may own construction-procurement execution while Oracle/SAP/etc. remains authoritative for selected accounting/AP/GL/inventory/payment fields and Aconex/Procore/CDE remains authoritative for selected technical-document workflows. Reconciliation is explicit; duplicate editable ledgers/workflows are prohibited.

## 6. First complete commercial journey

`Estimating Handover (optional)`
`-> Scope Library / Project Scope (package route)`
`-> ProcurementBudgetBasis`
`-> MR/PR and/or Procurement Package + core procurement plan`
`-> RFQ/Tender + qualification-aware bidder selection`
`-> supplier participation + quotation revisions + correspondence`
`-> source-cited extraction / structured capture`
`-> comparison / leveling / technical dependencies / clarifications`
`-> supplier-confirmed basis`
`-> recommendation / approval`
`-> AwardDecision`
`-> LPO/PO/Subcontract formation`
`-> issue + acknowledgment/eSignature`
`-> executed instrument`
`-> receipt/GRN/ERP seam`

At every stage: business numbers, attachments/documents, provenance/history, roles/authority, real UI and no re-keying of unchanged core meaning.

## 7. Retained later paths

Architecture V2 also preserves without forcing into the first implementation slice:
- framework/blanket/rate agreements + call-offs;
- deep commitment change/variation administration;
- advances/retention/security;
- claims/valuation/certification/recovery/final account;
- closeout/warranty;
- broader historical pricing and supplier intelligence;
- additional ERP/CDE adapters.

## 8. V2 build discipline after freeze

Every material capability requires a CapabilitySpecification with user object/fields, numbering, lifecycle, predecessor/successor conversion, outputs/registers, backend/invariant mapping, AI boundary where applicable, acceptance scenarios and domain `MEANING_PASS`.

After V2 freeze, the frozen architecture/capability set becomes the direct build source. Favor long vertical build/test/debug sessions. Thin session plans may sequence implementation but may not reinterpret product meaning. New architecture paperwork is required only when frozen meaning actually changes.

## 9. Freeze conditions

Do **not** freeze Architecture V2 until:
1. capability inventory is complete against retained Phase-1 scope + renewed specialist evidence;
2. first-spine capability specs exist;
3. all specialist/self-hostile-review additions are integrated, not standalone;
4. capability-completeness CI passes structurally;
5. project-owner/domain hostile review returns PASS or amendments;
6. independent hostile architecture/product audit returns PASS with no unresolved blocker;
7. all accepted findings are incorporated into one exact candidate commit;
8. an immutable V2 freeze checkpoint records candidate SHA/tree, capability count, accepted/deferred capabilities and build authorization.

Only then may the full-product build begin.