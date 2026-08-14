# CPOS Rebuilt Build Program v0.3

**Status:** HOSTILE-REVIEW CANDIDATE / NOT FROZEN

The R labels below are thin implementation slices, not an architecture interpretation bureaucracy. After Architecture V2 freeze, long build/test/debug sessions may implement across these slices directly from frozen capability specs.

## R00 — Architecture V2 rebaseline / hostile review / freeze
- complete retained capability inventory against Phase-1 + current specialist evidence;
- capability specs + structural checker;
- owner/domain hostile review;
- independent hostile architecture/product review;
- incorporate accepted findings;
- freeze one exact V2 candidate SHA/tree.

## R01 — Shared procurement foundation
- FileAsset / BusinessAttachment / SourceDocumentVersion / IssuedArtifactVersion substrate;
- Item/Material/Service/Scope master + free-form escape;
- UOM, category/trade, cost/WBS, currency/tax/payment/delivery references;
- ProcurementBudgetBasis authority/version/import seam;
- governed numbering service;
- product-owned business-document templates/rendering;
- real maintenance/import/search/export UI.

## R02 — Supplier Master / Lifecycle / Compliance / Intelligence
- supplier legal/trading profile, addresses and contacts;
- registration workflow;
- qualification/requalification/preferred/contextual eligibility;
- tax/licence/compliance docs/expiry/verification;
- trade/category classification;
- sourcing/award/order history;
- governed performance ratings;
- active tender/commitment/project exposure and explainable capacity indicators;
- supplier profile/search surfaces usable from sourcing/decision screens.

## R03 — Project procurement setup / demand / scope / planning
- Estimating/Pre-award Handover;
- Scope of Works Library + versions + lessons proposals;
- ProjectScopeInstance tailoring/freeze;
- MR/PR headers, lines, distributions, approvals and documents;
- Procurement Package;
- core procurement schedule from required-on-site through order/delivery milestones;
- budget/scope/estimating mappings;
- real project/MR/package/scope/schedule UI and outputs.

## R04 — RFQ / Tender Formation and Issue
- derive RFQ from approved MR/package scope without re-keying;
- frozen ProjectScopeInstance / structured price breakdown;
- bidder shortlisting with registration/qualification/compliance/performance/exposure context;
- technical returnables and TechnicalApprovalDependency creation;
- ordinary or governed blind/sealed response visibility where configured;
- documents, correspondence, clarifications, addenda;
- numbering + professional PDF/XLSX issue pack;
- manual send/download and secure external participation entry;
- schedule actuals.

## R05 — Supplier Participation / Quotations / Revisions
- secure no-account response;
- intent/no-bid;
- PDF/XLSX/file/email/manual/buyer capture;
- immutable source-document/revision provenance;
- structured quotation lines/commercial terms;
- response revisions/withdrawal/late handling;
- correspondence/clarification linkage;
- lead-time and supplier-confirmed schedule inputs.

## R06 — Bid Comparison / Leveling + bounded AI extraction
- source vs normalized vs buyer-adjusted vs supplier-confirmed layers;
- exact currency/UOM conversion basis;
- missing/excluded/alternate/substitute/bundled/partial mapping;
- technical/commercial deviations and TechnicalApprovalDependency status;
- supplier qualification/performance/exposure beside the bid;
- source-cited AI PDF/XLSX extraction + confidence + human confirmation;
- comparison workbook/PDF and frozen ComparisonSnapshot.

## R07 — Negotiation / Recommendation / Approval / Award
- negotiation/clarification outcomes and confirmed basis;
- exact ProcurementBudgetBasis/estimating variance;
- technical/qualification/compliance/supplier-intelligence decision context;
- DOA approval case;
- non-lowest/split/sole-source/conditional decision handling;
- AwardDecision distinct from Commitment;
- professional decision outputs/registers.

## R08 — LPO / PO / Subcontract Formation + Execution
- convert approved award without re-keying;
- header + item lines/SOV + exact scope lineage;
- payment/delivery/tax/currency/terms;
- numbering + approval;
- professional issued artifact/annexures;
- acknowledgment/signatory/eSignature ExecutionCase;
- send/delivery/signature/reminder/decline/expiry/executed-artifact history;
- provider-neutral signing adapter;
- ERP handoff;
- amendment/revision boundary;
- technical approval conditions preserved.

## R09 — Workbench / Registers / Portfolio Procurement Schedule
- role-focused home/work queues;
- MR/package/RFQ/response/comparison/decision/order/contract registers;
- portfolio roll-up of schedule facts created in R03-R08;
- baseline/forecast/supplier-confirmed/actual variance;
- supplier concentration/exposure/performance;
- qualification/compliance expiry and unsigned-contract risk;
- saved views/search/filter/export/drill-down;
- responsive/RTL/accessibility consolidation.

## R10 — Receipt / GRN / Downstream Reconciliation
- delivery vs receipt vs acceptance;
- partial receipt/damage/shortage/return;
- GRN/receipt where CPOS owns it;
- order balance visibility;
- invoice/AP/inventory/ERP reference/reconciliation seams;
- no duplicate GL/AP/WMS.

## R11 — Production hardening + real contractor pilot
- security/reliability/performance/observability;
- migration/import/setup;
- configuration/template validation;
- real golden-thread packages and actual documents;
- measured adoption/time/leakage/decision/integration outcomes.

## R12+ — Retained advanced commercial paths + intelligence
- Framework/Blanket/Rate Agreement CommercialTermsAuthority + call-offs/releases;
- commitment variations/change;
- advances/retention/security;
- claims/valuation/certification/recovery/final account;
- closeout/warranty;
- historical pricing library and richer supplier/scope/schedule intelligence;
- additional ERP/CDE adapters and controlled AI automation.

## Post-freeze build rule

No successor-prompt decomposition is required merely because a roadmap slice is large. The frozen Architecture V2 + capability specs are the direct source. Implementation sessions should be vertical, long and product-visible; tests/debugging/audits occur continuously. Architecture change control is invoked only when the build discovers that frozen meaning itself must change.