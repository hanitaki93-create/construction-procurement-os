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
- lifecycle status and revision/addendum state.

## Lines / bid form

Lines originate from approved MR/package scope and preserve lineage. Each line may include source reference, description/specification, quantity, UOM, brand/model/equivalent requirement, target delivery/lead-time request, pricing fields and attachments. Structured bid sections may request unit rate, total, lead time, validity, technical response, alternates and commercial notes.

## Supplier selection

Select supplier master records/contacts with visible compliance/eligibility context. Invitation membership is distinct from supplier identity and can be added/removed before issue under governed rules.

## Documents

Tender drawings/specifications/BOQ/scope documents are attached in ordinary document UX. The issue package has an attachment index and exact version binding.

## Lifecycle

`DRAFT -> REVIEW/READY -> ISSUED -> ADDENDUM/REISSUED -> CLOSED/CANCELLED`

An issued version is immutable. Addenda supersede/augment through explicit version history and acknowledgment requirements where configured.

## Outputs / distribution

Professional branded RFQ PDF and structured Excel/XLSX where appropriate; preview; download/manual-send from day one; secure task/link issue; email connector later sends the exact issued artifact rather than regenerating it.

## Register

RFQ register shows number, project, subject/package, buyer, issue/due dates, status, invited suppliers, intent/response counts, overdue state, addenda, comparison state and award/order status.

## Acceptance

Procurement selects approved MR lines, selects three eligible suppliers, adds drawings/terms, issues a numbered professional RFQ without re-keying lines, downloads the exact PDF/Excel package, later issues an addendum and can prove which supplier saw/responded to which version.