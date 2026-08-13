# CPOS RFQ / Tender Capability v0.1

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

An RFQ/Tender is a numbered buyer-issued commercial enquiry built from approved demand/scope, sent to selected suppliers, and answered through controlled quotations/revisions.

## Formation

A buyer can select approved MR/package lines and create an RFQ without re-keying. CPOS preserves exact lineage to the originating demand and carries line identity, description/specification, quantity, UOM, required date and linked documents.

The buyer can group/split demand lines under explicit rules without changing source truth.

## Header

Minimum fields include RFQ number, project/company, title/subject, buyer contact, issue date, response due date/time, currency/price basis, delivery expectations/location, quotation validity requirement, commercial instructions, response method, status and revision/addendum state.

## Lines / response structure

Each line includes buyer line reference, description/specification, quantity, UOM, item/service/scope reference where available, required delivery/lead-time basis, attachments and response fields.

Response templates may request unit rate, total, brand/model, lead time, validity, payment terms, warranty, inclusions/exclusions, deviations, alternates and technical attachments.

## Supplier selection

Select suppliers and contacts from the Supplier Master. Sourcing eligibility is checked before invitation. Commitment eligibility is not required merely to quote but must be resolved before order formation.

## Documents and issue

Before issue the user can preview:
- professional branded RFQ PDF;
- structured Excel response schedule where applicable;
- attachment/document index;
- recipient list and due date.

Issue binds the exact event version, lines, supplier list, response schema, terms and documents to an immutable B04 issued artifact.

Support manual download/send from the first release. Secure-link participation uses existing B06 grants. Email and other channels may be added without changing issued truth.

## Addenda / clarification

Changes after issue occur through versioned addendum/reissue semantics. The user sees which suppliers acknowledged/received each version. Old issued bytes remain immutable.

## Register

RFQ register includes number, project, title/package, status, issue/due date, supplier count, responses received, overdue suppliers, addendum/revision state and responsible buyer.

## Acceptance

A reviewer can select approved MR lines, choose at least three stored supplier contacts, generate a branded RFQ PDF and response sheet, issue it, download it for manual email, record an addendum, and trace every RFQ line to its MR/source allocation without re-entry.
