# CPOS RFQ / Tender Formation and Issue Capability v1.0

## User meaning

RFQ/Tender is a business enquiry built from approved MR/package scope, selected suppliers and governed tender documents—not an isolated blank event.

## Header

- immutable ID and governed RFQ/Tender number;
- project/legal entity/authority context;
- title/subject and event type;
- buyer/owner;
- issue date and response due date/time/timezone;
- commercial instructions and submission instructions;
- delivery/required dates;
- currency/pricing basis;
- payment-term requirements;
- validity requirement;
- tax/delivery/incoterm requirements where used;
- confidentiality/access profile;
- bid visibility/opening policy where used (ordinary/open, blind/sealed until governed opening, or other product-owned policy);
- lifecycle status and revision/addendum state;
- source package/MR route and procurement-schedule relationship.

## Lines / bid form

Lines originate from approved MR/package scope and preserve lineage. Each line may include source reference, description/specification, quantity, UOM, brand/model/equivalent requirement, target delivery/lead-time request, pricing fields and attachments. Structured bid sections may request unit rate, total, lead time, validity, technical response, alternates and commercial notes.

For package/trade procurement, the RFQ may include the exact frozen ProjectScopeInstance generated from the company Scope Library. Bid-form sections may be seeded from that scope template so scope obligations and price breakdown remain aligned.

## Supplier selection

Select supplier master records/contacts with visible registration, qualification, compliance and event-specific eligibility context. Where available, the selection surface also exposes current workload/exposure, performance history and estimating-stage participation/quote context. These facts support judgment; heuristic intelligence does not silently create eligibility or exclusion.

Invitation membership is distinct from supplier identity and can be added/removed before issue under governed rules.

## Technical requirements

The RFQ can declare required technical returnables such as datasheets, samples, proposed brands/models, shop-drawing references or alternates. Submitted alternates may create TechnicalApprovalDependency records rather than being treated as commercially approved merely because they are priced.

## Documents

Tender drawings/specifications/BOQ/scope documents are attached in ordinary document UX. The issue package has an attachment index and exact version binding through the file/issued-artifact provenance substrate. Scope-of-works annexures bind to the exact frozen project-scope version.

## Correspondence / clarifications

Invitations, reminders, bidder questions, clarifications and addendum communications are recorded as procurement correspondence with exact business/version context. A bidder answer that changes commercial meaning becomes a governed clarification/quotation revision/confirmed basis; it never silently rewrites the original RFQ or quotation.

## Procurement schedule

RFQ planned issue/return milestones originate from the core procurement plan. Actual issue and response milestones populate from canonical events; revisions/addenda do not silently rewrite the baseline schedule.

## Lifecycle

`DRAFT -> REVIEW/READY -> ISSUED -> ADDENDUM/REISSUED -> CLOSED/CANCELLED`

An issued version is immutable. Addenda supersede/augment through explicit version history and acknowledgment requirements where configured. Where blind/sealed policy applies, response visibility/opening follows the configured governed rule.

## Outputs / distribution

Professional branded RFQ PDF and structured Excel/XLSX where appropriate; preview; download/manual-send from day one; secure task/link issue; email connector later sends the exact issued artifact rather than regenerating it.

## Register

RFQ register shows number, project, subject/package, buyer, issue/due dates, status, invited suppliers, qualification/eligibility warnings, intent/response counts, overdue state, addenda, clarification state, comparison state and award/order status.

## Acceptance

Procurement selects approved MR/package scope, uses the frozen project scope where relevant, sees bidder registration/qualification/compliance/performance/exposure context, selects three suppliers, adds drawings/technical returnables/terms, issues a numbered professional RFQ without re-keying lines, downloads the exact PDF/Excel package, records bidder clarifications, later issues an addendum and can prove which supplier saw/responded to which scope/issue version.