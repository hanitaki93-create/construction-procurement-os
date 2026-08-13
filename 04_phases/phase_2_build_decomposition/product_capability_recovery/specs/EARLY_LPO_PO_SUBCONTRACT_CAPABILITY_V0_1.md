# CPOS Early LPO / PO / Subcontract Formation Capability v0.1

**Status:** DRAFT / MEANING REVIEW REQUIRED

## Purpose

The first usable CPOS release must be able to convert an approved award into an issue-ready order/contract without waiting for the full later commercial-administration engine.

`AwardDecision` remains distinct from `Effective Commitment`.

## User objects

Support bounded formation profiles for:
- Local Purchase Order / Purchase Order;
- Subcontract particulars / subcontract order;
- later call-off/release where authorized.

## Source

Creation starts from an approved AwardDecision and its exact comparison/recommendation basis. Supplier and awarded lines/SOV are copied by governed lineage rather than re-keyed.

## Minimum header/particulars

- automatic business number;
- document type;
- company/legal entity;
- project;
- supplier/subcontractor and contact/address;
- order/contract date;
- buyer/contact/signatory;
- currency;
- subtotal/tax/total basis;
- delivery/site or commencement/completion information;
- payment terms;
- quotation/reference basis;
- terms/conditions profile;
- status and revision;
- attachments/annexures.

## Lines / SOV

Depending on profile:
- item/scope reference;
- description;
- quantity/UOM;
- unit rate;
- line amount;
- cost/WBS attribution;
- delivery or milestone/date basis;
- source award/RFQ/quotation lineage.

Subcontract formation may use an SOV/scope schedule rather than material-style quantity lines. The capability spec must preserve that difference rather than force one generic line model.

## Lifecycle

Minimum visible states:
`DRAFT -> UNDER_APPROVAL -> APPROVED -> ISSUED -> ACKNOWLEDGED/ACCEPTED` with controlled CANCELLED/SUPERSEDED dispositions.

Issue/effectiveness rules are profile-specific. Approval alone never fabricates legal effectiveness.

## Document output

Generate a branded immutable PDF containing company/project/supplier particulars, numbered lines/SOV, commercial totals, delivery/program information, payment terms, terms/conditions, attachments/annexures index, approvals/signatures and revision marking.

Support preview, approval, issue, download and manual send. Later e-sign/email/ERP connectors attach to the same issued identity.

## Numbering

LPO/PO/Subcontract numbering uses the governed numbering service with class-specific uniqueness and gap policy. Issued/cancelled numbers are not reused.

## ERP coexistence

CPOS may own the sourcing/award/order artifact while accounting/job-cost posting remains external. Handoff status and external identifiers are separate from CPOS commitment identity and must be reconcilable.

## Explicit exclusion

This early capability does not pull forward full P07 variation, claim, retention-release, advance-recovery, certification, final-account or payment execution logic. Those remain later modules.

## Acceptance

A reviewer can take an approved leveled bid, create an LPO/PO or subcontract draft without re-keying supplier/scope/value, approve it, generate a professional numbered PDF, issue/download it, and trace every line/value back to the awarded supplier quotation and source RFQ/MR.
