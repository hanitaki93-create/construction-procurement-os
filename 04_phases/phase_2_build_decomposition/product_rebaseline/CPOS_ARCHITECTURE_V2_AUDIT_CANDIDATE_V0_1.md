# CPOS Architecture V2 — Audit Candidate v0.1

**Date:** 2026-08-14
**Status:** AUDIT CANDIDATE / NOT FROZEN / NOT BUILD-AUTHORIZED
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
- delivery != receipt != acceptance;
- commercial truth != accounting authority;
- provider-neutral external effects/integration seams.

The old Phase-2 product decomposition from B04 onward is **superseded**. Rejected B04-B06 code is not inherited by the clean rebuild. Individual mechanisms may be salvaged only by explicit adoption into a V2 capability and reverified there.

## 2. Product thesis

CPOS is a construction-procurement system of action and intelligence that can coexist with Oracle/SAP/CMiC/Vista or another ERP. It must meet the conventional procurement floor while being materially better in construction-specific planning, scope control, supplier participation, bid analysis, decision intelligence, contract execution and AI-assisted work.

A user must never need to understand backend ontology to perform ordinary procurement.

## 3. User-facing product domains

### 3.1 Platform / authority
Tenant, company/legal entity, project, users, roles, DOA, delegation, project context and governed configuration.

### 3.2 Master / reference data
Supplier/subcontractor master; contacts/addresses; tax/registration/compliance; items/materials/services; UOM; categories/trades; cost/WBS; currencies/tax/payment terms; delivery locations; numbering policies; document template classes.

Catalogue/master-backed and free-form construction lines coexist. A master catalogue is useful but never a universal prerequisite for ad-hoc scope.

### 3.3 Supplier intelligence
Supplier identity/compliance is separate from qualification/eligibility/tender participation. Company-wide procurement history, performance ratings, current tender/commitment exposure and explainable workload/capacity indicators become visible during shortlisting, leveling and recommendation.

### 3.4 Scope knowledge / lessons learned
A company Scope of Works Library holds approved reusable trade/package scope content, inclusions/exclusions, interface obligations, required returnables, bid-breakdown structure and lessons-learned proposals. Projects instantiate and tailor governed scope versions without rewriting the company standard. Exact project scope freezes into RFQ/contract artifacts.

### 3.5 Estimating / pre-award handover
A won project may inherit estimating-package allowances, tender-stage vendors/quotes, assumptions, risks/opportunities and source files. Handover context seeds live procurement but remains immutable historical source rather than silently becoming current commercial truth.

### 3.6 Demand / requisition
Material Requisition / Purchase Requisition header, lines, distributions, attachments, review/approval and routing. Approved lines may route to direct order, RFQ or Procurement Package. Backend conservation/allocation semantics may be used internally but do not replace MR/PR UX.

### 3.7 Procurement package / plan
Optional trade/complex-scope grouping with source-scope conservation, estimating context, Scope Library instance, budget context, owner and core procurement schedule.

### 3.8 Procurement schedule core
Planning starts with MR/package creation. Required-on-site, baseline, forecast, supplier-confirmed and actual dates are distinct. Baseline milestones cover RFQ issue/return, comparison/recommendation, approval, award/order/contract and delivery/start. Actual milestones derive from canonical transactions.

### 3.9 RFQ / tender
Numbered RFQ/Tender built from approved MR/package scope without re-keying. Includes frozen scope instance where relevant, bid form/price breakdown, commercial and technical requirements, due dates, supplier selection, documents, clarifications/addenda and immutable issue versions.

Supplier selection surfaces compliance, qualification, performance/exposure and estimating-stage participation where available.

### 3.10 Supplier participation / quotations
Low-friction secure participation plus controlled email/file/manual/buyer-on-behalf capture. Preserve original quotation files, intent/no-bid, revision/withdrawal/late treatment, structured values and exact source provenance.

### 3.11 Comparison / leveling / negotiation
Four commercial layers remain explicit:
1. supplier source/submission;
2. normalized representation;
3. buyer adjustment;
4. supplier-confirmed contractable basis.

Handle missing/excluded scope, alternates/substitutes, bundles, partial coverage, technical/commercial deviations, clarifications and frozen ComparisonSnapshot.

Supplier history/performance/exposure is visible beside the current bid rather than isolated in an admin master.

### 3.12 Recommendation / approval / award
Recommendation carries chosen supplier(s), confirmed value, budget/estimate context, deviations, risk, supplier intelligence and justification. Govern non-lowest, split, sole-source and conditional decisions through DOA/approval. `AwardDecision` remains distinct from commitment.

### 3.13 Early LPO / PO / Subcontract formation
Approved award converts without re-keying into a numbered instrument with header, lines/SOV, taxes/currency/payment/delivery terms, project/supplier identities, exact scope/award lineage, approvals, annexures and professional issued artifact.

### 3.14 Contract execution / eSignature
Issued does not equal executed. Track send/delivery, acknowledgment/signatory routing, signature progress, reminders, decline/expiry/failure, executed final artifact and audit trail. Provider-neutral architecture permits manual/external eSign first and integrations later.

### 3.15 Workbench / registers / portfolio schedule
Daily role-focused home and serious registers for MR, packages, RFQs, responses, comparison, decisions, orders/contracts and receipts. R09 rolls up schedule facts created earlier, highlights variance/risk/ball-in-court, supplier exposure, expiring compliance and unsigned-contract risk across projects.

### 3.16 Receipt / GRN / ERP seam
Delivery, receipt, acceptance, shortage/damage/return remain distinct. Support partial receipt/GRN where owned and reconcile order/receipt references with external ERP/AP/inventory without duplicating GL/AP authority.

### 3.17 Documents
Product-owned, versioned template/rendering classes generate professional MR, Scope of Works, RFQ, comparison/recommendation and LPO/PO/Subcontract outputs. Users see Documents/Attachments/Issued Documents; provenance objects remain backend infrastructure. V1 does not expose a tenant-authored programming/expression language.

### 3.18 AI assistance
AI operates on deterministic objects and exact source provenance. Initial wedge: supplier PDF/Excel quotation extraction -> cited structured proposal -> RFQ-line mapping -> normalized comparison -> human confirmation.

Later capabilities: estimating handover extraction, scope-gap detection, historical pricing, supplier-performance synthesis, RFQ/spec drafting, clarification drafting, recommendation briefing and schedule risk. AI never silently changes supplier source truth, approved quantity/cost attribution, eligibility, award, signature or executed commercial truth.

## 4. Identity / numbering

Internal UUID identity is separate from business/document number. Each numbered document class declares scope, mask, sequence, gap policy, assignment timing, cancellation treatment, revision/reissue behavior and concurrency mechanism. `MAX(number)+1` is prohibited.

## 5. ERP coexistence

Every integrated field/domain declares authority as OWN / MIRROR / REFERENCE. CPOS may become the construction-procurement system of action while Oracle/SAP/etc. remains authoritative for selected accounting, AP, GL, inventory or payment state. Reconciliation is explicit; duplicate editable ledgers are prohibited.

## 6. First complete commercial journey

`Estimating Handover (optional)`
`-> Scope Library / Project Scope (package route)`
`-> MR/PR and/or Procurement Package + core procurement plan`
`-> RFQ/Tender`
`-> supplier participation + quotation revisions`
`-> source-cited extraction / structured capture`
`-> comparison / leveling / clarifications`
`-> supplier-confirmed basis`
`-> recommendation / approval`
`-> AwardDecision`
`-> LPO/PO/Subcontract formation`
`-> issue + acknowledgment/eSignature`
`-> executed instrument`
`-> receipt/GRN/ERP seam`

At every stage: business numbers, attachments/documents, history, roles/authority, real UI and no re-keying of unchanged core meaning.

## 7. V2 build discipline

Architecture V2 is not complete because semantic invariants exist. Every material capability requires:
- user-facing object/terminology;
- field/master-data specification;
- identity/numbering disposition;
- lifecycle;
- predecessor/successor and copy/conversion rules;
- output/document disposition;
- registers/work surfaces;
- backend/invariant mapping;
- AI boundary where applicable;
- user-language acceptance scenarios;
- domain `MEANING_PASS`.

After V2 freeze, this specification/capability set becomes the direct build source. The project should favor long vertical build/test/debug sessions over another large interpretive block bureaucracy; thin session plans may partition implementation, but they may not redefine product meaning.

## 8. Freeze conditions

Do **not** freeze Architecture V2 until:
1. capability inventory is complete against retained Phase-1 scope and renewed specialist evidence;
2. first-spine capability specs exist;
3. the specialist-gap additions are integrated, not standalone;
4. capability-completeness CI passes structurally;
5. owner/domain review returns `MEANING_PASS` or explicit amendments;
6. independent hostile architecture/product audit returns PASS with no unresolved blocker;
7. all accepted audit amendments are incorporated into one exact candidate commit.

Only then create the immutable Architecture V2 freeze checkpoint and authorize full-product implementation.