# CPOS Specialist Procurement Gap Evidence v0.2

**Status:** R00 evidence input / not frozen
**Date:** 2026-08-14

## Purpose

Refresh the product rebaseline against current specialist construction-procurement systems before Architecture V2 freeze. This evidence is used to decide whether capabilities are missing, should move earlier, or need stronger product meaning.

## Evidence standard

Primary vendor documentation/product pages are preferred. Marketing claims are treated as evidence of exposed product capability, not proof of internal implementation quality or customer adoption.

## 1. Scope of Works Library — required specialist capability

ProcurePro exposes a company-wide Scope of Works Library as a core solution. Its public product material describes centralized reusable scope content, project tailoring, online collaboration, revision/change tracking, and a lessons-learned feedback loop so recurring scope gaps are corrected across projects rather than copied job-to-job.

Sources:
- https://procurepro.co/solutions/scope-of-works
- https://procurepro.co/insights/eguide-creating-a-scope-of-works-content-library

### CPOS implication

An item/service/scope master is not sufficient. CPOS needs a separate reusable **Scope Library** capable of holding trade/package scope templates, standard inclusions/exclusions, clauses, checklist items, required documents, pricing-breakdown structures and lessons-learned proposals. A project/package instantiates a governed copy/version and may tailor it without mutating the company standard.

## 2. Estimating Handover — intelligence must survive project award

ProcurePro's AI Estimating Handover is explicitly designed to transfer pre-award vendor intelligence, quotes, notes, risks and opportunities into delivery procurement. It identifies vendors who priced during estimating and keeps estimating context visible during downstream procurement rather than leaving it in disconnected handover files.

Source:
- https://procurepro.co/solutions/estimating-handover

Procore also introduced an Estimating-to-Bidding integration in 2026, reinforcing that preconstruction/estimating and downstream bidding should not be disconnected systems.

Source:
- https://support.procore.com/products/online/user-guide/project-level/bidding/release-notes

### CPOS implication

CPOS needs an **Estimating / Pre-award Handover** capability and import seam. It must preserve source files and imported facts separately from delivery-team decisions. Minimum structured targets include project/package budget allowance, trade/package mapping, estimators' preferred/participating vendors, historical quote basis, notes/assumptions, risks/opportunities and provenance.

## 3. Supplier performance, workload and exposure — decision intelligence

ProcurePro Vendor Management exposes vendor workload/capacity risk, company-wide tender/contract activity, performance ratings and compliance in procurement decisions.

Source:
- https://procurepro.co/solutions/vendor-management

Procore added vendor Project History and qualification data directly inside Bid Leveling so buyers can consider past contract performance and financial history alongside the current bid.

Sources:
- https://support.procore.com/products/online/user-guide/project-level/bidding
- https://support.procore.com/products/online/user-guide/project-level/bidding/tutorials/view-leveled-bids

BuildingConnected/TradeTapp similarly combines bid management with subcontractor qualification/risk information and shares risk information with estimating teams.

Sources:
- https://construction.autodesk.com/products/buildingconnected/
- https://construction.autodesk.com/workflows/construction-bid-management/

### CPOS implication

Supplier Master must accumulate **performance and exposure intelligence**, not merely compliance documents and past transactions. Initial deterministic capability should include project/tender/award/order exposure, configurable performance ratings, issue history and visible current workload indicators. Financial/risk calculations remain governed and explainable. These facts must be visible during supplier selection, comparison and recommendation.

## 4. Contract execution / eSignature — formation is not complete at PDF generation

ProcurePro treats Contracts & eSignature as a core procurement module: contract particulars are populated, annexures compiled, signing workflow configured, signatures tracked, reminders issued and the signed copy stored automatically.

Sources:
- https://procurepro.co/solutions/contract-creation
- https://procurepro.co/integrations/procurepro-esign

### CPOS implication

R08 must extend beyond `issue-ready PDF`. CPOS needs an explicit **execution lifecycle** for LPO/PO/Subcontract: issue/send, recipient/signatory routing, acknowledgment/signature state, reminders, rejection/decline where applicable, executed artifact and provider-neutral signing adapter. V1 may support manual/external execution first, but the lifecycle and evidence model must be native.

## 5. Procurement schedule is an organizing spine, not late reporting

ProcurePro positions the Procurement Schedule as a central operational capability and markets end-to-end procurement from estimating handover to signed contracts. Schedule milestones must therefore exist while packages are planned and sourced, not be introduced after order formation.

Sources:
- https://procurepro.co/solution
- https://procurepro.co/news/procurepro-launches-free-online-procurement-playbook-for-contractors-packed-with-lessons-from-the-uks-leading-contractors-and-a-clear-path-to-ai-enabled-procurement

### CPOS implication

Split scheduling into:
1. **Core procurement plan** beginning with project/package creation: required-on-site date, tender issue/return, recommendation, approval, award/order, lead time and delivery targets; and
2. **R09 portfolio workbench/forecasting**: cross-project risk, forecast variance, workload, saved views, analytics and escalation.

Actual milestones must be derived from transaction events. Baseline, forecast, required and supplier-confirmed dates remain distinct facts.

## Resulting R00 decisions

Before Architecture V2 freeze:

- ADD Scope Library + Lessons Learned capability;
- ADD Estimating/Pre-award Handover capability;
- EXTEND Supplier Master with performance/workload/exposure intelligence and surface it in sourcing/leveling/award;
- EXTEND Early Commitment with contract execution/eSignature lifecycle;
- MOVE core procurement schedule/planning into R03/R04 while retaining R09 for portfolio/workbench depth.

These changes refine the Phase-1 product thesis; they do not invalidate the accepted B01-B03 technical substrate or the strongest semantic controls.