# CPOS Architecture V2 — Hostile Audit Candidate v0.3

**Date:** 2026-08-14
**Status:** PRE-AUDIT CANDIDATE / NOT FROZEN / NOT BUILD-AUTHORIZED
**Clean implementation lineage:** accepted `main@b44dcadc2d898b1db98c3a9dc3b182a88c198cd3` (B03)

## 1. What V2 is

Architecture V2 is an **evidence-driven amendment and product recompilation of the strong Phase-1 architecture**. It is not a blank-sheet restart.

The old Phase-2 product/build decomposition from B04 onward is superseded. Rejected B04-B06 code is not inherited by the clean implementation line. Individual mechanisms may be salvaged only by explicit adoption into a V2 capability and verification in that context.

Preserved load-bearing principles include tenant/legal-entity/project authority, PostgreSQL authoritative state, RLS/context isolation, bounded operations/idempotency, exact money/UOM semantics, concurrency controls, immutable provenance/version history, supplier-source truth, `AwardDecision != Commitment`, `CommercialTermsAuthority != scope-consuming call-off`, delivery/receipt/acceptance separation, commercial/accounting authority separation and provider-neutral integrations.

## 2. Product target

CPOS is a **construction procurement system of action and intelligence** capable of coexisting with Oracle/SAP/CMiC/Vista or another ERP.

It must meet the conventional procurement floor while being materially better in:
- construction demand/package planning;
- standardized scope knowledge and estimating handover;
- supplier participation and supplier intelligence;
- structured/traceable bid comparison;
- technical + commercial evaluation;
- procurement schedule visibility;
- recommendation/approval evidence;
- order/subcontract formation and execution;
- deterministic procurement analytics;
- source-cited AI assistance.

A normal user must not need to understand internal ontology or database concepts.

## 3. Product domains

### 3.1 Platform / authority
Tenant, company/legal entity, project, internal/external identities, roles, DOA, delegation, bounded configuration, audit events and bounded action/API semantics. Existing accepted B01-B03 mechanisms remain presumptively reusable.

### 3.2 File / attachment / source / issued-artifact provenance
The clean B03 line explicitly rebuilds the retrofit-impossible document/evidence substrate rather than assuming rejected B04 survives. Users operate Documents/Attachments/Issued Documents. Internally preserve FileAsset, BusinessAttachment, SourceDocumentVersion and immutable IssuedArtifactVersion with content identity, exact version/annexure membership and access context.

### 3.3 Master / reference data
Supplier master; items/materials/services; UOM; category/trade taxonomy; cost/WBS references; currencies/FX/tax/payment terms; delivery locations; standard commercial-term blocks; numbering policy; document template classes. Catalogue-backed and free-form construction lines coexist.

### 3.4 Procurement budget / cost-plan authority
Every budget/variance decision identifies an explicit ProcurementBudgetBasis/version and authority mode `OWN / MIRROR / REFERENCE`. Estimating allowances may seed/reference live procurement but never become anonymous budget truth. Historical recommendations retain the exact budget basis relied upon.

### 3.5 Procurement policy / route governance
A versioned bounded ProcurementRoutePolicy determines allowed/required routes based on typed company/project/category/value and exception criteria. Supported outcomes include competitive RFQ/tender, direct order, governed sole/single-source, later framework call-off and external/ERP/stock disposition. A ProcurementRouteDecision records the exact policy version, route, exception evidence and required approvals. No universal hard-coded three-quote rule and no arbitrary tenant-authored code.

### 3.6 Supplier master / registration / qualification / eligibility
Supplier legal/trading identity, contacts, tax/licence/compliance and categories are durable master facts. Registration, qualification/requalification, preferred status and tender/award eligibility remain separate contextual lifecycles. Supplier identity is never reduced to a global `approved` boolean.

### 3.7 Supplier performance / workload / exposure
Expose deterministic company-wide tender/project/commitment activity, governed performance ratings and explainable workload/capacity indicators at shortlisting, leveling and recommendation. Predictive/opaque optimization is not required for first spine and heuristics cannot silently become policy.

### 3.8 Scope of Works Library / lessons
Company-approved reusable trade/package scope templates contain inclusions/exclusions, interfaces, required returnables, technical requirements, bid-price breakdown structures and reusable scope clauses. Projects instantiate/tailor versioned ProjectScopeInstances. Issued RFQs/contracts bind the exact project scope version. Project lessons may propose changes but cannot silently rewrite company standards.

### 3.9 Estimating / pre-award handover
A won project may inherit package allowances, tender-stage vendors/quotes, assumptions, risks/opportunities and source files. Handover seeds project procurement and supplier context while remaining immutable historical source. CPOS is not an estimating engine.

### 3.10 MR / PR demand
Material/Purchase Requisition is the primary user demand object for the fast-material path. Header/lines/distributions support catalogue or free-form scope, quantity/UOM, need-by, delivery location, specifications, attachments, cost attribution, approvals and route decision. User-visible positions distinguish requested/approved/ordered/received/remaining facts.

### 3.11 Demand / scope authorization and conservation
Approved demand/scope remains traceable through package grouping, direct order, split award, cancellation and re-sourcing. Tendering the same scope to multiple bidders is allowed and does not consume demand. Effective award/commitment consumes authority. Concurrent commitments may not over-consume authorized quantity/scope; a declared guard/lock/serializable mechanism is required. Cancel/reversal/re-tender preserves history and residual authority.

### 3.12 Procurement Package
Optional planning/grouping object for complex/trade procurement. It can carry estimating handover context, budget basis, Scope Library instance, approved demand partitions, procurement route and core procurement plan. Package grouping itself neither fabricates demand authority nor consumes scope.

### 3.13 Procurement schedule core
Planning begins at MR/package creation. Required-on-site, baseline, forecast, supplier-confirmed and actual dates are distinct. Baseline milestones include RFQ issue/return, comparison/recommendation, approval, award/order/execution and delivery/start. Actual milestones derive from canonical transaction events. No general CPM/master scheduling engine.

### 3.14 RFQ / Tender
Numbered enquiry derived from approved MR/package scope without re-keying. Includes frozen project scope, structured pricing/bid form, commercial and technical requirements, due dates, route/competition policy, qualification-aware bidder selection, documents, addenda, correspondence and immutable issued versions.

Tender policy may support combined evaluation or bounded blind/sealed/two-stage modes. Commercial visibility/opening follows governed policy where restricted.

### 3.15 Supplier participation / quotations
Low-friction secure task/link plus controlled email/file/manual/buyer-on-behalf capture. Preserve intent/no-bid, original PDF/XLSX/email source, structured values, revisions, withdrawal/late treatment and exact source provenance. Persistent supplier portal is not mandatory.

### 3.16 Procurement correspondence / clarifications
Invitations, reminders, bidder questions, clarifications, addenda, negotiation confirmations, award notices and contract communications are context-bound correspondence. ClarificationCase links questions/responses to affected RFQ/quote/comparison items. Correspondence can create a confirmed basis only through an explicit governed transition; original RFQ/quotation truth remains immutable.

### 3.17 Technical bid evaluation
Complex tenders can use structured compliance criteria and optional two-stage/two-envelope evaluation. Preserve supplier technical source, evaluator actions, compliance/deviation/clarification state and frozen TechnicalEvaluation. Commercial opening under a two-stage policy is an auditable governed event. AI may assist classification but cannot make final technical qualification.

### 3.18 Technical / document approval dependency
Separate from tender technical evaluation, TechnicalApprovalDependency captures procurement reliance on consultant/client/CDE approval of material, sample, mock-up, shop drawing, brand/model/alternate or other technical matter. CPOS may OWN_THIN/MIRROR/REFERENCE the gate; it does not rebuild a full CDE.

### 3.19 Comparison / leveling / negotiation
Preserve four commercial layers:
1. supplier source submission;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

Support exact/partial/bundled/alternate/supplier-added/missing/unresolved coverage, explicit currency/UOM conversion basis, exclusions/deviations, clarifications, technical-evaluation status and supplier qualification/performance/exposure context. Freeze ComparisonSnapshot before recommendation.

### 3.20 Recommendation / approval / AwardDecision
Recommendation binds the exact ComparisonSnapshot, TechnicalEvaluation where used, ProcurementBudgetBasis, ProcurementRouteDecision, supplier basis, technical approval conditions, qualification/compliance and relevant supplier intelligence. DOA/approval governs non-lowest, sole/single-source, split and conditional outcomes. AwardDecision remains distinct from legally/commercially effective commitment.

### 3.21 Early LPO / PO / Subcontract formation
Approved award converts without re-keying into a numbered commercial instrument containing supplier/project identity, item/SOV lines, scope lineage, tax/currency/payment/delivery terms, approvals, annexures and exact professional issued artifact. Formation checks remaining demand/scope authority at the commitment point.

### 3.22 Contract execution / eSignature
Issued does not equal executed. ExecutionCase tracks send/delivery, acknowledgment/signatory routing, signature state, reminders, decline/expiry/failure, provider reference and exact executed artifact. CPOS owns execution state/evidence; signature trust technology may remain provider-neutral/external.

### 3.23 Framework / blanket / rate agreements + call-offs
Retained later path: CommercialTermsAuthority holds reusable rates/terms/limits/effective dates; call-off/release consumes approved demand and binds the exact agreement version. Agreement existence alone never fabricates ordered quantity or committed cost.

### 3.24 Workbench / registers / portfolio schedule
Role-focused home and serious registers for MR, packages, RFQs, responses, comparisons, technical evaluation, decisions, orders/contracts and receipts. Roll up early schedule facts, show variance/risk/ball-in-court, policy exceptions, supplier concentration/exposure, qualification/compliance expiry and unsigned-contract backlog.

### 3.25 Procurement analytics
Deterministic management metrics include cycle times, supplier invitation/response/no-bid rates, competition coverage, budget/estimate-to-award variance, comparable quote-to-negotiated movement, package status/risk and contract execution backlog. 'Savings' always declares its comparison baseline and every metric drills to source transactions.

### 3.26 Receipt / GRN / ERP seam
Delivery, receipt, acceptance, shortage/damage/return are distinct. Support partial commercial receipt/GRN where CPOS owns it and reconcile order/receipt/invoice/AP/inventory references with ERP authority. No duplicate stock/GL/AP ledger.

### 3.27 Business documents / rendering
Product-owned versioned templates render professional MR/PR, Scope of Works, RFQ/Addendum, comparison/recommendation and LPO/PO/Subcontract/receipt outputs. Issued artifacts bind exact source object versions/template/attachments. V2 does not expose an unrestricted report/expression programming language.

### 3.28 AI assistance
First wedge: supplier PDF/XLSX quote extraction -> cited structured proposal -> RFQ-line mapping -> normalized comparison -> human confirmation. Later: estimating handover extraction, scope-gap analysis, historical pricing, supplier-performance synthesis, clarification/recommendation drafting and schedule risk. AI never silently changes source truth, approved demand, policy/qualification/technical status, award, signature or executed commercial truth.

## 4. Retained Phase-1 commercial ceiling

Architecture V2 preserves the original single XL commercial gravity well even though the first full procurement product builds it later:
- canonical commercial event substrate;
- commitment change/variation control;
- valuation/progress event substrate;
- retention/advance/recoupment positions;
- progress claims/certification;
- final account/closeout and related securities.

These semantics are **not deleted or reclassified as OUT**. They are retained post-first-spine and must not require rewriting the issued commitment baseline. Their detailed product capability specs are required before R12+ implementation, not before the R01-R10 procurement build.

## 5. Identity / calculations / controls

- UUID/internal identity != business/document number.
- Every numbered class declares sequence scope/mask/gap/assignment/cancel/reissue/concurrency policy; `MAX()+1` is prohibited.
- Exact decimals and explicit FX/UOM/tax/rounding rules govern commercial normalization and totals.
- Historical decisions bind exact source/policy/budget/template/evaluation versions.
- Concurrency controls protect demand/commitment conservation and other cross-transaction invariants.
- Ordinary UX hides backend ontology while retaining drillable provenance.

## 6. ERP / CDE coexistence

Every integrated domain declares `OWN / MIRROR / REFERENCE`. CPOS may own construction procurement execution while ERP remains authoritative for selected AP/GL/inventory/payment/budget fields and CDE remains authoritative for selected technical-document workflows. Integration failures/staleness/reconciliation are explicit.

## 7. Complete first procurement journey

`Estimating Handover (optional)`
`-> Scope Library / project scope (optional package path)`
`-> ProcurementBudgetBasis`
`-> MR/PR and/or Procurement Package + ProcurementRouteDecision + core plan`
`-> RFQ/Tender + qualification-aware bidder selection`
`-> supplier participation + quote revisions + correspondence`
`-> technical evaluation where applicable`
`-> source-cited structured capture / AI proposal`
`-> comparison / leveling / technical dependencies / clarifications`
`-> supplier-confirmed basis`
`-> recommendation / approval`
`-> AwardDecision`
`-> demand-conserving LPO/PO/Subcontract formation`
`-> issue + acknowledgment/eSignature`
`-> executed instrument`
`-> receipt/GRN/ERP seam`
`-> workbench/analytics`

No unchanged core business meaning is re-keyed between stages.

## 8. Adoption / burden guardrails

- Standard clean tenant must be capable of first live tender within <=5 working days; this is an architecture constraint not a sales promise.
- No bespoke named ERP/CDE connector is required to issue first tender.
- Scope Library and Estimating Handover improve value but are not mandatory prerequisites for a simple first tender.
- Supplier persistent account/portal is not mandatory.
- Deep SRM, predictive supplier optimization, full CDE, full budgeting, AP/GL, inventory/WMS, payment rails, native mobile/offline and general no-code workflow remain outside the first procurement spine.
- The rebaseline must not create a second independent XL gravity well. Bounded AI, scope library, qualification, execution-state, analytics and schedule-core are deliberately constrained to avoid that failure.

## 9. Build discipline after V2 freeze

Architecture V2 + accepted CapabilitySpecifications become the direct build source. After freeze:
- favor long vertical implementation/test/debug sessions;
- every slice ships real UI and outputs where applicable;
- roadmap R labels are sequencing aids rather than interpretation contracts;
- no successor-prompt bureaucracy is required simply because a slice is large;
- new architecture paperwork/change control is required only if frozen product meaning must change.

## 10. Freeze conditions

Do **not** freeze V2 until:
1. all 84 frozen Phase-1 areas have an explicit V2 disposition;
2. scope promotions/additions are recorded with evidence/boundary;
3. V2 capability inventory and first-spine specs are structurally complete;
4. specialist gap evidence is incorporated;
5. internal hostile self-review has no unresolved blocker;
6. project-owner/domain review returns `MEANING_PASS` or explicit amendments;
7. independent hostile architecture/product audit returns PASS with no unresolved blocker;
8. accepted findings are incorporated into one exact candidate SHA/tree;
9. an immutable Architecture V2 freeze checkpoint records the exact candidate and authorizes the R01-R10 procurement build.

Until all nine conditions pass, this file is an audit candidate only.