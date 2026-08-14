# CPOS Architecture V2 — Canonical v1.0

**Date:** 2026-08-14
**Status:** FINAL FREEZE CANDIDATE — becomes FROZEN only when `ARCHITECTURE_V2_FREEZE_CHECKPOINT_V1_0.md` records an exact green SHA/tree.
**Clean implementation base:** accepted B03 `b44dcadc2d898b1db98c3a9dc3b182a88c198cd3`

## 1. Canonical composition

Architecture V2 is not one prose file. Its frozen meaning is the following controlled composition:

### High-level product/domain architecture
- `CPOS_ARCHITECTURE_V2_AUDIT_CANDIDATE_V0_3.md` — the independently audited high-level product/domain architecture. Its semantic body remains accepted except where the post-audit closure artifacts below add field/numbering/default detail or supersede its pre-audit status text.

### Product capability inventory / trace
- `R00_CAPABILITY_INVENTORY_V0_5.csv` — **59 current capability rows**. `CAP-056` is intentionally unused/tombstoned; earlier summaries saying 60 were a counting error and are superseded.
- `P1_1_84_AREA_V2_DISPOSITION_V0_1.csv` — every frozen Phase-1 area explicitly disposed.
- `P1_3_DI01_DI18_V2_TRACE_V0_1.md` — design inheritance trace.
- `PHASE1_SCOPE_REOPEN_DECISIONS_FOR_V2.md` — explicit scope promotions/reopens.

### Capability meaning
- `CAPABILITY_SPECIFICATION_STANDARD_V1_0.md` at v1.1 semantics;
- `R00_CAPABILITY_SPEC_MANIFEST_V0_7.json`;
- all manifest-referenced R01–R10/cross-cutting CapabilitySpecifications;
- `DEFAULT_TENANT_PROFILE_UAE_CONTRACTOR_V1_0.md`.

### Standard §C field/build authority
- `field_contracts/FIELD_CONTRACT_COMMON_V1_0.md`;
- `field_contracts/R01_FOUNDATION_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R02_SUPPLIER_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R03_DEMAND_PLANNING_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R04_SOURCING_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R05_SUBMISSION_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R06_COMPARISON_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R07_DECISION_FIELD_CONTRACTS_V1_0.md`;
- `field_contracts/R08_COMMITMENT_EXECUTION_FIELD_CONTRACTS_V1_0.md`.

These are equal build authority to embedded field tables. A coder may not substitute different field types/enums/editability/default/copy semantics without an explicit Architecture V2 change.

### Numbering / document authority
- `specs/NUMBERING_POLICY_V1_0.md` at governed policy v1.1;
- `specs/BUSINESS_DOCUMENT_TEMPLATE_RENDERING_CAPABILITY_V1_0.md`;
- `specs/FILE_ATTACHMENT_ISSUED_ARTIFACT_PROVENANCE_CAPABILITY_V1_0.md`.

### Hostile audit / closure / owner decision
- `audit/CLAUDE_ARCHITECTURE_V2_HOSTILE_AUDIT_VERDICT_2026-08-14.md`;
- `audit/POST_CLAUDE_BLOCKER_CLOSURE_VERIFICATION_V1_0.md`;
- `audit/OWNER_DOMAIN_MEANING_PASS_ARCHITECTURE_V2_2026-08-14.md`.

### Mechanical guards
- `scripts/check-product-capabilities.mjs`;
- `.github/workflows/r00-product-rebaseline.yml`;
- `.github/workflows/architecture-v2-freeze.yml`.

## 2. Rebaseline decision

Architecture V2 is an evidence-driven **amendment/recompilation of the strong Phase-1 architecture**, not a blank-sheet restart.

Preserve from accepted architecture/substrate unless a specific V2 artifact says otherwise:
- tenant/company/legal-entity/project authority;
- PostgreSQL authoritative state;
- tenant isolation/RLS/context discipline;
- exact money/quantity/UOM semantics;
- idempotent bounded operations;
- concurrency/invariant enforcement;
- immutable source/version/provenance history;
- supplier source truth != normalized representation != buyer adjustment != supplier-confirmed contractable basis;
- `AwardDecision != Commitment`;
- `CommercialTermsAuthority != scope-consuming call-off`;
- delivery != receipt != acceptance != invoice/payment;
- commercial/procurement authority != accounting authority;
- provider-neutral effects/integration and explicit reconciliation.

The old Phase-2 product/build decomposition from B04 onward is **superseded**. Rejected B04–B06 code is not inherited by the clean implementation line. A rejected mechanism may be reused only by explicit salvage into a V2 capability and must be reverified there.

## 3. Product thesis

CPOS is a **construction procurement system of action and intelligence** that can coexist with Oracle/SAP/CMiC/Vista and CDE platforms while giving a procurement team enough construction-specific value to prefer CPOS for day-to-day procurement execution and decision intelligence.

It must meet the conventional procurement floor and materially outperform generic ERP procurement in the combination of:
- low-friction construction demand and package planning;
- company Scope of Works knowledge/lessons;
- estimating handover;
- procurement schedule and risk visibility;
- supplier participation, qualification, performance and exposure context;
- structured technical/commercial tender evaluation;
- source-preserving bid leveling;
- recommendation/approval evidence;
- order/subcontract formation and execution;
- deterministic procurement analytics;
- source-cited AI assistance.

Normal users operate procurement business objects, not internal ontology.

## 4. Canonical first procurement spine

`Project / legal entity / authority`
`-> master/reference + files/numbering/templates`
`-> supplier master/registration/qualification/compliance/eligibility`
`-> Estimating Handover (optional)`
`-> Scope Library / Project Scope (optional package route)`
`-> ProcurementBudgetBasis`
`-> MR/PR and/or Procurement Package + ProcurementRouteDecision + core schedule`
`-> RFQ/Tender + qualification-aware bidder selection`
`-> secure supplier participation + quote revisions + correspondence`
`-> technical tender evaluation where applicable`
`-> source-cited structured capture / AI proposal`
`-> comparison / normalization / buyer adjustment / clarifications`
`-> supplier-confirmed contractable basis`
`-> recommendation + DOA approval`
`-> AwardDecision`
`-> demand-conserving LPO/PO/Subcontract formation`
`-> immutable issue artifact`
`-> acknowledgment/eSignature/execution`
`-> receipt/GRN/ERP seam`
`-> workbench/registers/schedule/analytics`

Unchanged core business meaning is propagated by reference/snapshot rules and is not re-keyed.

## 5. Material V2 product commitments

### 5.1 Real MR/PR rather than allocation UX
MR/PR has human header, lines, cost distributions, approvals, quantities/UOM, need-by/location/specification/documents and route disposition. Conservation/allocation remains backend control, not ordinary user vocabulary.

### 5.2 Serious supplier lifecycle
Supplier identity/master, contacts, tax/licence/compliance, registration, qualification/requalification, contextual eligibility and performance/exposure are distinct. A global `approved vendor` boolean is insufficient.

Supplier intelligence renders at shortlist, RFQ bidder selection, leveling and recommendation/approval—not only on the supplier record.

### 5.3 Optional catalogue, mandatory UOM/reference discipline
Reusable item/material/service/scope master exists, but free-form construction lines remain legal. UOM/currency/tax/cost/WBS/budget conversions and references are governed and source values are preserved.

### 5.4 Procurement route policy
Competitive RFQ, direct order, governed sole-source, later framework call-off and external/stock disposition use bounded versioned policy and explicit exception/approval evidence. No universal product hard-code substitutes for company procurement policy.

### 5.5 Demand/scope conservation
Tendering the same scope to several suppliers is not consumption. Effective award/commitment consumes approved authority. Concurrent commitments cannot over-consume the same quantity/scope partition. Cancellation/reversal exposes residual authority without erasing history.

### 5.6 Specialist package/scope/estimating/schedule layer
Procurement Package is optional for complex/trade sourcing. Scope Library provides reusable company standards + project versions + lessons proposals. Estimating Handover preserves tender-stage allowances/vendors/assumptions without turning them into current truth. Core procurement milestones start early; portfolio workbench later rolls them up.

### 5.7 RFQ/Tender and participation
RFQ derives from approved demand/package scope, issues professional versioned artifacts, supports addenda/correspondence, structured bid forms, technical evaluation/two-stage modes and low-friction secure supplier task access without mandatory portal account.

### 5.8 Supplier response/source truth
Original supplier PDF/XLSX/email/structured response and every revision remain immutable source truth. Manual/buyer-on-behalf capture is governed and attributable. Late/no-bid/withdrawal are explicit states.

### 5.9 Four-layer comparison
1. supplier source;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

No layer overwrites another. Technical evaluation/approval status, qualification and supplier intelligence can sit beside commercial leveling without becoming hidden price manipulation.

### 5.10 Award != commitment
Recommendation/approval/AwardDecision preserve chosen basis, budget/policy/technical/eligibility evidence and exceptions. Award prepares handoff; it does not silently create contractual effectiveness.

### 5.11 Early real LPO/PO/Subcontract
The first procurement product forms a real numbered, approved, professional issued LPO/PO/Subcontract directly from the approved award basis without re-keying. Issued != executed; execution/acknowledgment/eSignature evidence is explicit.

### 5.12 Professional documents
Product-owned versioned templates produce MR, SOW, RFQ/addendum, comparison/recommendation, LPO/PO/Subcontract and GRN where enabled. Tenant configuration is bounded; V2 does not expose a report/programming language.

### 5.13 AI wedge
Initial differentiator: supplier PDF/XLSX -> source-cited extraction proposal -> RFQ-line mapping -> deterministic structured capture/normalization -> human confirmation. AI cannot silently create supplier truth, technical qualification, policy compliance, award, signature or executed commercial truth.

## 6. Concrete numbering decision

The UAE-contractor starter profile provides concrete masks/policies for MR, RFQ, Addendum, Comparison, Recommendation, Award, LPO, PO, Subcontract and GRN.

Default class policy is `GAP_ALLOWED` with uniqueness, permanent non-reuse and cancelled/voided-number history. Architecture V2 **does not fabricate a universal legal claim that UAE LPO/PO/Subcontract numbering must be gapless**.

When tenant/jurisdiction policy requires `CONTINUOUS_REQUIRED`, the class uses the stronger registered mechanism: assign at the protected commit transition, dedicated scoped counter row locked `FOR UPDATE`, rollback-safe transaction, idempotent retry, no pre-reservation and permanent numbered cancellation history.

`MAX(number)+1` is prohibited.

## 7. ERP/CDE boundary

Integrated domains declare `OWN / MIRROR / REFERENCE`. CPOS may own construction procurement execution while Oracle/SAP/etc. remains authoritative for selected budget/AP/GL/inventory/payment data and Aconex/Procore/etc. remains authoritative for selected technical-document workflows.

No duplicate editable ledger/workflow is introduced merely for integration convenience. Send/accept/reject/stale/reconcile state is explicit.

## 8. Quality / adoption boundary

- WCAG 2.2 AA remains the supported first-party web semantic target inherited from Phase 1;
- responsive web is required; native mobile/offline is not first-spine scope;
- Arabic/RTL support is built into components/templates;
- business-effect-aware error/recovery behavior is mandatory;
- first clean live tender target remains <=5 working days from clean standard inputs;
- item catalogue, Scope Library, estimating handover, ERP/CDE connector, native eSign and AI are not prerequisites for first live tender;
- starter UAE profile supplies baseline UOMs, numbering, templates and safe route defaults.

## 9. Retained later commercial ceiling

Architecture V2 preserves—without pulling into the first procurement coding sequence—the Phase-1 commercial ceiling:
- framework/blanket/rate agreement call-offs;
- canonical commercial event substrate;
- commitment changes/variations;
- valuation/progress events;
- retention/advance/recoupment;
- claims/certification/recovery;
- securities/warranty/final account/closeout.

These are not OUT. They require their own field-level capability closure before their later implementation and may not require rewriting the V2 issued commitment baseline.

## 10. Hostile audit disposition

External Claude audit of exact target `a0f976e7da840376c3df4f02d9e7ec8f5102d5ee` returned `FAIL` with exactly three freeze blockers:
- missing Standard §C field contracts;
- missing concrete per-document numbering policies;
- incomplete manifest/CAP-042 binding.

The same audit independently accepted the 84-area/DI trace, burden/XL boundary, scenarios B–H, specialist architecture, ERP/CDE seam, AI boundary and direct-build structure; Scenario A failed only on field/numbering detail.

The project owner explicitly authorized a **surgical closure rule**: if these comments were simple/closable, close them, treat the corrected architecture as passed, freeze it and proceed to coding rather than consume another external audit cycle.

`POST_CLAUDE_BLOCKER_CLOSURE_VERIFICATION_V1_0.md` records the three blockers and four low-cost amendments as closed. No architecture contradiction emerged. `OWNER_DOMAIN_MEANING_PASS_ARCHITECTURE_V2_2026-08-14.md` therefore records `MEANING_PASS` for the R01–R10/cross-cutting product architecture.

This is deliberately described as **owner-accepted post-audit closure**, not a false claim that Claude literally returned PASS.

## 11. Post-freeze build mode

Once the exact freeze checkpoint is created:
- Architecture V2 + accepted capability specs + field contracts are direct build authority;
- R01–R10 labels are sequencing aids only;
- coding should dominate: long focused vertical implementation/test/debug sessions are preferred;
- each vertical slice must include its actual UI, outputs/documents and tests where applicable;
- no block/prompt interpretation layer may redefine frozen product meaning;
- ordinary coding decisions remain implementation decisions; new architecture/change-control work is needed only when implementation reveals a genuine contradiction or requested product-meaning change;
- code/invariant/security hostile tests continue, but they audit implementation rather than restart product architecture by default.

## 12. Freeze condition

This canonical composition becomes **FROZEN Architecture V2** only when the dedicated `Architecture V2 freeze gate` succeeds on an exact SHA/tree and `ARCHITECTURE_V2_FREEZE_CHECKPOINT_V1_0.md` records that exact target and authorization.
