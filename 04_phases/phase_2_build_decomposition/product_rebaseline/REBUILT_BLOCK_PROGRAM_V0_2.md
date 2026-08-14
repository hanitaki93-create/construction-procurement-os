# CPOS Rebuilt Build Program v0.2

**Status:** ARCHITECTURE V2 AUDIT CANDIDATE / NOT FROZEN

This roadmap is intentionally thin. It identifies coherent vertical product slices after Architecture V2 freeze; it is not a new interpretation layer that may redefine the architecture.

## R00 — Architecture V2 rebaseline and freeze preparation
- complete capability inventory against retained Phase-1 scope + current specialist evidence;
- maintain capability specification standard and executable completeness checker;
- integrate specialist gaps: Scope Library/Lessons, Estimating Handover, supplier performance/exposure, contract execution/eSign, early schedule core;
- owner/domain hostile review;
- independent hostile architecture/product audit;
- incorporate findings and freeze exact Architecture V2 candidate.

No transaction-domain implementation from rejected B04+ is authorized before R00 freeze. Salvage is explicit, not inherited.

## R01 — Shared procurement foundation
Build real master/reference/identity/document foundations and their maintenance UI:
- UOM registry/conversions;
- Item/Material/Service/Scope master with free-form escape;
- category/trade taxonomy;
- cost/WBS references and project delivery locations;
- currencies/tax/payment-term references;
- governed numbering service/document-class policy;
- product-owned template/rendering foundation;
- search/import/export/maintenance surfaces.

## R02 — Supplier/Subcontractor Master + Compliance + Intelligence foundation
- serious supplier profile, contacts/addresses;
- legal/tax/licence/registration records;
- categories/trades and contextual eligibility;
- compliance documents/expiry/verification;
- procurement history;
- governed performance ratings;
- deterministic active tender/commitment/project exposure and capacity indicators;
- supplier search/profile surfaces usable directly from sourcing decisions.

## R03 — Project procurement setup, demand and planning
A coherent project-start/demand slice:
- Estimating/Pre-award Handover import and review;
- company Scope of Works Library + versioning + lessons proposals;
- ProjectScopeInstance generation/tailoring;
- MR/PR headers, lines, distributions, approvals and attachments;
- Procurement Package grouping and scope lineage;
- core procurement schedule from required-on-site through order/delivery milestones;
- real MR/package/scope/schedule surfaces and documents.

## R04 — RFQ/Tender Formation and Issue
- create from approved MR/package scope without re-keying;
- consume frozen ProjectScopeInstance/price-breakdown template where relevant;
- shortlist suppliers with compliance/performance/exposure/pre-award context;
- bid forms, terms, due dates, commercial/technical requirements;
- documents/addenda/clarifications;
- governed numbering;
- professional RFQ PDF/Excel issue pack;
- manual-send/download plus secure participation entry;
- actual RFQ milestones feed the core schedule.

## R05 — Supplier Participation, Quotations and Revisions
- secure no-account response task/link;
- intent/no-bid;
- file/email/manual/buyer-on-behalf capture;
- original source files preserved;
- structured quotation values and commercial terms;
- revisions/withdrawal/late-response lifecycle;
- response register/status;
- supplier lead-time/confirmed-date inputs update planning facts without overwriting baseline.

## R06 — Bid Comparison / Leveling + bounded AI extraction
- source vs normalized vs buyer-adjusted vs supplier-confirmed layers;
- side-by-side leveling;
- missing/excluded/alternate/substitute/bundled/partial coverage;
- technical/commercial deviations and clarifications;
- supplier performance/exposure/qualification visible in decision context;
- AI PDF/Excel extraction with exact source citations/confidence/human confirmation;
- comparison workbook/PDF/export and frozen ComparisonSnapshot.

## R07 — Negotiation, Recommendation, Approval and Award
- negotiation/clarification outcomes;
- supplier-confirmed commercial basis;
- recommendation with budget/estimating variance, scope/deviation/risk and supplier-intelligence context;
- DOA/approval case;
- non-lowest, split, sole-source and conditional outcomes;
- AwardDecision distinct from Commitment;
- professional recommendation/decision outputs and registers.

## R08 — Early LPO/PO/Subcontract Formation + Execution
- convert approved award/confirmed basis without re-keying;
- header + item lines/SOV;
- payment/delivery/tax/currency/standard/special terms;
- exact project scope/award lineage;
- governed numbering and approvals;
- professional issue-ready artifact + annexures;
- acknowledgment/signatory/eSignature execution case;
- send/delivery/signature/reminder/decline/expiry/executed-artifact lifecycle;
- provider-neutral signing adapter boundary;
- ERP/export/handoff seam;
- revision/amendment boundary.

## R09 — Procurement Workbench / Portfolio Schedule / Registers
- role-focused home and work queues;
- serious MR/package/RFQ/response/comparison/decision/order/contract registers;
- portfolio roll-up of the schedule facts created in R03-R08;
- baseline/forecast/supplier-confirmed/actual variance;
- overdue/risk/ball-in-court;
- supplier concentration/exposure and performance views;
- compliance expiry and unsigned-contract risk;
- search/filter/saved views/export/drill-down;
- responsive/RTL/accessibility consolidation.

## R10 — Receipt / GRN / Downstream Reconciliation
- delivery vs receipt vs acceptance;
- partial receipt, damage/shortage/return evidence;
- GRN/receipt where CPOS owns it;
- PO/order balance visibility;
- invoice/AP/inventory/ERP references and reconciliation seams;
- no duplicate GL/AP/warehouse unless later evidence expands scope.

## R11 — Production hardening + pilot
- security/reliability/performance/observability;
- migration/import/setup;
- template/configuration validation;
- real contractor golden-thread pilot using real documents/data;
- measure time saved, leakage detected, adoption, decision quality and integration behavior.

## R12+ — Deep commercial administration + advanced intelligence
Only after the procurement spine is proven:
- variations/change control;
- advances/retention/security;
- claims/certification/recovery/final account;
- closeout/warranty;
- AI pricing library, estimating handover expansion, scope-gap learning, supplier risk/performance synthesis, recommendation briefing and controlled automation.

## Post-freeze execution rule

Once Architecture V2 is frozen, these R labels are roadmap slices, not mandatory paperwork cycles. Implementation may proceed in long focused vertical sessions directly from the frozen architecture/capability specs. Each session must preserve the frozen semantics and finish with working UI + tests/debugging for the slice it touches. A new document is required only when architecture meaning changes, not before every coding step.