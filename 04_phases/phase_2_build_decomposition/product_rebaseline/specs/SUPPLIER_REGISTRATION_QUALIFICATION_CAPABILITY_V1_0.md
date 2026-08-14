# CPOS Supplier Registration / Qualification Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Supplier identity, document compliance, registration, qualification and tender eligibility are related but different facts. CPOS must support a lightweight construction-appropriate lifecycle without reducing all suppliers to one global `approved` flag.

## Registration

A supplier may be created internally and later sent a directed registration request, or initially captured through controlled import/manual creation. Registration can collect profile facts/documents through configurable product-owned questionnaire sections.

Minimum states:
`NOT_REGISTERED -> REGISTRATION_REQUESTED -> IN_PROGRESS -> SUBMITTED -> APPROVED/REJECTED -> UPDATE_REQUIRED`

Registration approval does not itself qualify the supplier for every trade/project.

## Qualification

### QualificationRecord
- supplier;
- qualification scheme/version;
- trade/category/commodity;
- region/jurisdiction and optional project/department context;
- questionnaire/evidence set;
- reviewer/approver;
- start/effective/expiry/review dates;
- outcome/status;
- conditions/limits;
- disqualification/suspension reason where applicable.

Minimum states:
`NOT_STARTED -> IN_PROGRESS -> SUBMITTED -> UNDER_REVIEW -> QUALIFIED/CONDITIONALLY_QUALIFIED/NOT_QUALIFIED -> EXPIRED/REQUALIFICATION_DUE/SUSPENDED`

## Preferred status

Where used, preferred status is contextual and separately governed from qualification. It may be tied to trade/region/project policy and must not overwrite qualification history.

## Eligibility relationship

Tender/award eligibility evaluates current registration, qualification, compliance and explicit project/event rules. The evaluation records the facts/rule version used. Human override requires authority/reason/evidence.

## Supplier participation UX

Qualification may use secure task links without forcing a persistent supplier portal account. Required questionnaire answers and documents are captured with provenance. Expiring qualification triggers requalification workflow where configured.

## Integration into sourcing

RFQ bidder selection and award surfaces show registration/qualification state in context. A supplier can be known in the master and even invited under policy while not being qualified for award; the distinction is explicit.

## Acceptance

A subcontractor registers once, is qualified for Aluminium works in UAE for a defined period, remains unqualified for Firefighting, later updates an expiring insurance document, is routed through requalification, and the buyer can prove which qualification/eligibility facts governed a tender invitation and award.