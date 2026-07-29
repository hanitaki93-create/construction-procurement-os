# P1.2 Public Primary Challenge v0.1

**Date:** 2026-07-29  
**Status:** PUBLIC FIRST-PARTY EVIDENCE SPRINT COMPLETE / P1.2 NOT YET CLOSED  
**Purpose:** challenge the provisional P01–P12 architecture against public first-party contractor workflow evidence before seeking private interviews/artifacts.

## 1. Evidence rule used

Public availability does not make evidence secondary by itself.

This sprint classifies evidence by **origin and directness**:

- `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC` — contractor-origin workflow/manual/role/contract/audit evidence describing the contractor's own process.
- `PRIMARY_TRANSACTION_EVIDENCE_PUBLIC` — public evidence that exposes real transaction identifiers or transaction trail from contractor records.
- `REGULATORY_OR_CONTRACTUAL_REQUIREMENT` — issued contractual terms/requirements governing supplier/subcontractor behavior.
- `SECONDARY_MARKET_CORROBORATION` — supplier marketplace/software/professional evidence used only to corroborate friction/variants, never to close contractor workflow gates by itself.

The roadmap anti-anchoring rule remains binding: source language/process is captured before mapping to candidate architecture. Public contractor cases may challenge or reopen Review A/B/C findings.

---

## 2. Contractor case set

### CASE PUB-01 — Khansaheb Civil Engineering LLC, UAE — interiors/material procurement + fit-out controls

**Evidence quality:** `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC + PRIMARY_TRANSACTION_EVIDENCE_PUBLIC`  
**Source:** Khansaheb-hosted Bureau Veritas certification audit of internal procedures and sampled records.  
**URL:** https://ksight.khansaheb.ae/IntranetPortal/media/IntranetLibrary/DeptQA/QsheAuditReports/Audit_Report_Per_Site_1-1OW8Z-13_1-1OW8Z-13_Interiors_division.pdf

**Verbatim process facts captured before mapping:**

- internal procedures identified for estimation/contract review, material purchasing, and subcontractor/supplier procurement;
- site requisitions are received and approved by a Divisional Manager;
- LPO is forwarded to supplier and material follow-up occurs;
- GRN is prepared on receipt; supplier invoice is processed by Accounts;
- sampled records include requisition IDs, LPO IDs, supplier names, delivery notes and GRNs;
- supplier performance evaluation and supplier-selection questionnaire are evidenced;
- materials are generally delivered directly to site rather than through a central stock/store flow;
- project records include a subcontract agreement, material-submittal schedule, drawing-submittal schedule, approvals/rejections and inspection/NCR records.

**Reconstructed flow:**

`site/material requirement → approved requisition → LPO / authorized signatory → supplier follow-up → delivery note → GRN → Accounts invoice processing → supplier performance evaluation`

Project/subcontract overlay:

`project/subcontract → material/drawing submittals → consultant/client review state → inspection/NCR → execution`

**Architecture effect:** strongly supports demand before commitment, procurement/accounting separation, technical approval as distinct dependency, direct-to-site receipt without requiring full WMS, supplier evaluation after transaction history, and PO/GRN/invoice separation.

---

### CASE PUB-02 — ASGC, UAE — supplier eProcurement / RFQ response workflow

**Evidence quality:** `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Sources:** official ASGC vendor page + official ASGC eProcurement vendor manual.  
**URLs:**
- https://www.asgcgroup.com/vendors
- https://www.asgcgroup.com/pdf/Vendor-Web-Portal-ASGC.pdf

**Captured process facts:**

- ASGC describes eProcurement as handling enquiry, quotation and invoice submission plus LPO retrieval;
- each RFQ triggers vendor notification and appears in the vendor's active-RFQ list;
- vendor opens RFQ and completes quotation basic data, quotation detail, evaluation criteria, contractor documents and supplier documents;
- quote captures currency, payment method, delivery method and comments;
- vendor fills contractor BOQ items and may add additional quoted items;
- contractor-origin cells can be locked while supplier-entered fields remain editable;
- submission is explicit and occurs after prices, quantities and documents are completed.

**Reconstructed bounded flow:**

`vendor registration → contractor RFQ → vendor notification → RFQ review → line pricing/qty + commercial terms → evaluation criteria response → contractor/supplier documents → explicit quotation submission → downstream invoice/LPO interaction`

**Architecture effect:** supports structured tender participant access, supplier-side quote evidence, supplier-added/unmapped lines, separated contractor source values vs supplier responses, evidence attachments, and explicit submission state.

---

### CASE PUB-03 — Bechtel — engineered material procurement + subcontract formation

**Evidence quality:** `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Sources:** current first-party Bechtel career descriptions across Buyer, Lead Buyer/Expediter, Subcontract Specialist, and Turbine Package Commercial Manager roles.  
**URLs:**
- https://jobs.bechtel.com/job/Lead-BuyerExpediter/1379115600/
- https://jobs.bechtel.com/job/Houston-Subcontract-Specialist-TX-77056/1394478000/
- https://jobs.bechtel.com/job/Reston-Turbine-Package-Commercial-Manager-VA-20190/1354220800/

**Captured process facts:**

- Engineering prepares/materially supports material requisitions;
- procurement prepares bidder lists and bidder prequalification;
- bid packages are formed and bid requests issued;
- bidder questions are coordinated and bids received;
- a `Commercial Bid Summary` and award recommendation are prepared;
- approvals are secured under established procedures/delegated authority;
- purchase/subcontract documents are finalized and issued/executed;
- post-award includes supplier/subcontract administration, change management, expediting, billing/invoice review, claims/backcharges and closeout;
- complex engineered packages explicitly include turbines, boilers, condensers and auxiliary equipment, with technical/commercial data from Engineering, Construction, Finance, Logistics, Insurance and Tax.

**Reconstructed flow:**

`material requisition / defined scope → bidder list + prequalification → bid request package → bidder Q&A → bid receipt → commercial/technical evaluation → Commercial Bid Summary → recommendation → approval → PO/subcontract formation → supplier administration/expediting/change → invoice/billing controls → closeout`

**Architecture effect:** strong independent corroboration of recommendation ≠ approval ≠ commitment, technical/commercial evaluation separation, structured award basis, delegated authority, post-award change/claims and long-lead expediting.

---

### CASE PUB-04 — Fluor — subcontract/contract lifecycle

**Evidence quality:** `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Sources:** Fluor CMSi + current Fluor Contract/Subcontract Administrator career descriptions.  
**URLs:**
- https://www.fluor.com/services-and-expertise/innovation-and-expertise/technologies-and-processes/fluor-cmsi
- https://thrivecareers.fluor.com/job/Reston-Subcontract-Administrator-%28TSSCI-with-CI-Polygraph-Required%29-VA-20190/1332390100/
- https://thrivecareers.fluor.com/job/Houston-Director-II%2C-Contract-Management-Semiconductor-ID-83701/1365323000/

**Captured process facts:**

- Fluor explicitly manages subcontract process from pre-award through closeout;
- internal RFP/RFP-explanation and pre-award meetings precede final negotiation and contract finalization;
- commercial proposal sections and coordinated technical evaluations feed final proposal evaluation/recommendation;
- recommendations are presented to project/client decision makers;
- post-award includes performance/schedule status, change management, invoicing, claims avoidance, final modifications and performance evaluation;
- CMSi stores contractor bids, performance and claim history across disciplines;
- supplier portal registration is explicitly **not** an RFQ/RFP system and **not** qualification.

**Reconstructed flow:**

`candidate/prequalification context → RFP formation → pre-bid/RFP explanation → proposal receipt → commercial + technical evaluation → recommendation/decision → contract finalization → performance/change/invoice/claims administration → final modifications/performance evaluation → closeout`

**Architecture effect:** supports registration ≠ qualification ≠ bidding, pre/post-award lifecycle, technical/commercial evaluation separation, historical bid/performance/claim evidence, and cross-functional commercial truth without requiring a separate subsystem per discipline.

---

### CASE PUB-05 — Larsen & Toubro / NPL — RFQ → negotiation → comparative → PO

**Evidence quality:** `PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Source:** contractor-hosted internal comparative-statement process requirement.  
**URL:** https://nplmaximo.larsentoubro.com/ATTACHMENTS/ComparativeStatementProcedure-Requirement.pdf

**Captured process facts:**

- RFQ is sent to vendors from SAP;
- quotations are received as PDF/Excel and associated with the RFQ;
- initial offer references are preserved;
- after negotiation, final offers are preserved alongside initial offers;
- item-level no-quote is represented explicitly;
- tax and terms/conditions are carried into comparison;
- multiple RFQs/offers are plotted side-by-side;
- discount, rank/L1, rates, amounts, basic total and tax-inclusive total are compared;
- PO creation references the adopted RFQ/final offer basis.

**Reconstructed flow:**

`RFQ → supplier initial offers → negotiation → supplier final offers → side-by-side comparative → rank/L1 + commercial terms/tax → selected RFQ/final-offer basis → PO`

**Architecture effect:** strong support for immutable quote revision/economic-basis provenance, item-level no-quote, comparison snapshot semantics, and supplier-confirmed final basis feeding commitment rather than buyer-adjusted values silently becoming contract truth.

---

## 3. Additional first-party stress evidence

### Skanska — subcontract payment/valuation variants

**Evidence quality:** `REGULATORY_OR_CONTRACTUAL_REQUIREMENT + PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Source:** Skanska standard subcontract terms.  
**URL:** https://www.skanska.com/api/download?filename=skanska-standard-terms-and-conditions-for-subcontracting.pdf&url=https%3A%2F%2Fedit.skanska.com%2Fsiteassets%2Fskanska-suomessa%2Fyhteistyokumppaneille%2Fsopimusasiakirjat%2Fen%2Fskanska-standard-terms-and-conditions-for-subcontracting.pdf

Observed variants include progress/work-stage invoicing, supervisory confirmation, quality approval prerequisites, stored materials, unit-price invoices, hourly work, and separate additional/amendment-work invoicing.

**Architecture effect:** corroborates claim/application vs buyer verification/acceptance vs payment separation and supports composable fulfillment/valuation mechanisms rather than one PO-vs-subcontract fulfillment switch.

### ALEC — UAE contractual fulfillment/recovery stress case

**Evidence quality:** `REGULATORY_OR_CONTRACTUAL_REQUIREMENT + PRIMARY_CONTRACTOR_EVIDENCE_PUBLIC`  
**Source:** ALEC UAE purchase/supply terms and prequalification interface.  
**URLs:**
- https://www.alec.ae/subcontractors-and-supply-chain
- https://hive.alec.ae/cmicprod/PmSsPrequal/

Observed facts include vendor/subcontractor prequalification, PO/specification precedence, technical approval requirements, delivery/milestone obligations, inspection, acceptance evidence for invoices, rejection/replacement, liquidated-damages remedies where stated, and procurement of replacement supply at defaulting supplier expense.

**Architecture effect:** supports prequalification as separate context, commercial terms vs supplier quotation distinction, technical approval dependency, acceptance/invoice separation and buyer recovery distinct from ordinary supplier price agreement.

---

## 4. Supplier-side friction evidence

### UAE construction sourcing friction — Qotera

**Evidence quality:** `SECONDARY_MARKET_CORROBORATION / SUPPLIER-SIDE FIRST-PERSON OPERATOR EVIDENCE`  
**URL:** https://qotera.net/

Observed operational problems:

- requests arrive as BOQs, WhatsApp lists, site photos, schedules, voice-like informal requests or incomplete RFQs;
- missing spec, quantity, site, required date, brand/equivalent and payment expectation must be clarified before routing;
- suppliers waste time pricing incomplete/unserious requests;
- quotes die from silence/no follow-up;
- delivery timing is often a failure reason;
- outcomes are tracked as quote / no-quote / closed with reasons.

### UAE marketplace corroboration

- https://rabitbuild.ae/ — buyer RFQ → supplier response → direct negotiation → delivery.
- https://www.inframat.ai/ — describes mixed incoming formats (WhatsApp/PDF/Excel), inconsistent VAT/specs, manual leveling and supplier responses without forcing portal adoption.

**Architecture effect:** strongly supports free-form intake, incomplete-demand clarification, no-quote/no-response distinction, delivery-date importance, provenance, mixed-format ingestion and low-friction supplier participation.

---

## 5. Public challenge findings that materially affect P01–P12

1. **Registration is not qualification.** Fluor explicitly separates profile creation from qualification; ALEC prequalification is a distinct approval process.
2. **RFQ line structure is not always closed.** ASGC permits supplier-added quotation items in addition to contractor BOQ items. Canonical bid-line mapping must preserve supplier-added/unmapped lines.
3. **Initial and final supplier economics both matter.** L&T preserves initial offer + negotiated final offer; comparison uses final commercial basis without destroying original offer evidence.
4. **No-quote can exist at item level.** L&T requires explicit no-quote for unquoted/NIL items, so full-tender decline and partial quote gaps must remain distinct.
5. **Direct-to-site material flow is real.** Khansaheb audit states materials are generally delivered directly to site; full inventory/WMS ownership is not a prerequisite for GRN/receipt truth.
6. **Award/approval/commitment are operationally separable.** Bechtel/Fluor describe evaluation/recommendation, approval, then contract/PO finalization/execution.
7. **Technical and commercial evaluations are separate but coordinated.** Bechtel and Fluor repeatedly describe both layers.
8. **Subcontract valuation can use several mechanisms.** Skanska terms show work-stage, stored-material, unit-price, hourly and amendment-work invoicing under subcontract governance.
9. **Buyer recovery is a distinct contractual action.** ALEC expressly permits replacement procurement/recovery and LD remedies without implying supplier-agreed base-price rewrite.
10. **Accounts may own invoice/payment processing while procurement owns receipt/commercial evidence.** Khansaheb audit explicitly places invoice processing with Accounts after GRN.

No finding requires P13 or reopens Review A/B/C at this stage.

---

## 6. Public evidence limitations

Public evidence did **not** directly expose enough truth to prove:

- the exact allocation/reservation object used before commitment;
- one-active-authorized-basis uniqueness over exclusive scope;
- rectification procurement capacity restoration vs basis expansion;
- remeasurement conservation against a scope partition/cap;
- exact UAE subcontract claim → QS assessment → certification artifact chain;
- exact economic-component anti-double-counting grain;
- an original completed internal contractor bid-leveling/comparison sheet with real bidder rows suitable for full decomposition.

These remain explicit targets rather than being inferred from architecture.

---

## 7. Outcome

The public-first-party sprint is strong enough to satisfy multiple P1.2 evidence-count and diversity gates, but **not** enough to declare P1.2 closed.

Formal gate status is recorded separately in `P1_2_PUBLIC_CHALLENGE_GATE_VERDICT_V0_1.md`.
