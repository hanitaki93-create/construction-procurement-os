# CPOS RFQ / Tender Formation and Issue Capability v1.0

## User meaning

RFQ/Tender is a business enquiry built from approved MR/package scope, a governed procurement-route decision, selected suppliers and governed tender documents—not an isolated blank event.

## Header

- immutable ID and governed RFQ/Tender number;
- project/legal entity/authority context;
- title/subject and event type;
- buyer/owner;
- source ProcurementRouteDecision/policy version;
- issue date and response due date/time/timezone;
- commercial instructions and submission instructions;
- delivery/required dates;
- currency/pricing basis;
- payment-term requirements;
- validity requirement;
- tax/delivery/incoterm requirements where used;
- confidentiality/access profile;
- evaluation mode: combined technical/commercial or governed two-stage/two-envelope where configured;
- bid visibility/opening policy;
- lifecycle status and revision/addendum state;
- source package/MR route and procurement-schedule relationship.

## Lines / bid form

Lines originate from approved MR/package scope and preserve lineage. Each line may include source reference, description/specification, quantity, UOM, brand/model/equivalent requirement, target delivery/lead-time request, pricing fields and attachments. Structured bid sections may request unit rate, total, lead time, validity, technical response, alternates and commercial notes.

For package/trade procurement, the RFQ may include the exact frozen ProjectScopeInstance generated from the company Scope Library. Bid-form sections may be seeded from that scope template so scope obligations and price breakdown remain aligned.

## Competition / supplier selection

The RFQ enforces the applicable ProcurementRouteDecision such as minimum competitive participation/quotation requirements, required justification and approval gates. The policy is configurable through bounded typed rules rather than a universal hard-coded 'three quote' rule.

Select supplier master records/contacts with visible registration, qualification, compliance and event-specific eligibility context. Where available, the selection surface also exposes current workload/exposure, performance history and estimating-stage participation/quote context. These facts support judgment; heuristic intelligence does not silently create eligibility or exclusion.

Invitation membership is distinct from supplier identity and can be added/removed before issue under governed rules. If the issued/returned competitive set falls below policy requirements, the event shows the exception and requires the configured justification/authority rather than silently continuing.

## Technical requirements and evaluation

The RFQ can declare required technical returnables such as datasheets, samples, proposed brands/models, method statements, experience/certifications, programme information, shop-drawing references or alternates.

Complex tenders may attach a governed Technical Bid Evaluation structure/compliance matrix. Where two-stage policy applies, commercial content remains restricted until the governed technical-opening/evaluation condition is satisfied. Technical evaluation is distinct from later TechnicalApprovalDependency for consultant/client/material approval.

## Documents

Tender drawings/specifications/BOQ/scope documents are attached in ordinary document UX. The issue package has an attachment index and exact version binding through the file/issued-artifact provenance substrate. Scope-of-works annexures bind to the exact frozen project-scope version.

## Correspondence / clarifications

Invitations, reminders, bidder questions, clarifications and addendum communications are recorded as procurement correspondence with exact business/version context. A bidder answer that changes commercial meaning becomes a governed clarification/quotation revision/confirmed basis; it never silently rewrites the original RFQ or quotation.

## Procurement schedule

RFQ planned issue/return milestones originate from the core procurement plan. Actual issue and response milestones populate from canonical events; revisions/addenda do not silently rewrite the baseline schedule.

## Lifecycle

`DRAFT -> REVIEW/READY -> ISSUED -> ADDENDUM/REISSUED -> CLOSED/CANCELLED`

An issued version is immutable. Addenda supersede/augment through explicit version history and acknowledgment requirements where configured. Where blind/sealed/two-stage policy applies, response visibility/opening follows the configured governed rule and opening occurrence is auditable.

## Outputs / distribution

Professional branded RFQ PDF and structured Excel/XLSX where appropriate; preview; download/manual-send from day one; secure task/link issue; email connector later sends the exact issued artifact rather than regenerating it.

## Register

RFQ register shows number, project, subject/package, buyer, route/policy state, evaluation mode, issue/due dates, status, invited suppliers, qualification/eligibility warnings, intent/response counts, competition-policy exception state, technical-evaluation state, overdue state, addenda, clarification state, comparison state and award/order status.

## Acceptance

Procurement selects approved MR/package scope, uses the frozen project scope where relevant, sees the required competitive route/minimum evidence, sees bidder registration/qualification/compliance/performance/exposure context, configures a combined or two-stage technical/commercial tender as appropriate, adds drawings/returnables/terms, issues a numbered professional RFQ without re-keying lines, and cannot silently expose restricted commercial responses or proceed through an under-competitive exception without the required policy/evidence.