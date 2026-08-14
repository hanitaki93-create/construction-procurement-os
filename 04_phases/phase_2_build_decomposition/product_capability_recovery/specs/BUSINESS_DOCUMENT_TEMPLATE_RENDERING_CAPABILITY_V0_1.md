# CPOS Business Document Template / Rendering Capability v0.1

**Status:** DRAFT / R00 MEANING REVIEW REQUIRED

## Purpose

Turn governed procurement records into professional issue-ready business documents while preserving exact issued-version identity and preventing V1 from becoming a general report-builder platform.

## Initial document classes

- Material/Purchase Requisition;
- RFQ/Tender enquiry;
- RFQ addendum;
- Bid comparison summary/workbook export;
- Recommendation/approval brief;
- LPO/Purchase Order;
- Subcontract/award basis summary;
- GRN/receipt where CPOS owns the document.

## Template structure

Every document class declares product-owned sections and fields. Typical blocks:
- company/legal entity identity and logo;
- document title/number/revision/date;
- project and contracting authority context;
- supplier/recipient details where applicable;
- attention/contact;
- subject/purpose;
- line/SOV table;
- currency/tax/totals;
- delivery/need-by details;
- payment/commercial terms;
- instructions/notes;
- attachment/annexure index;
- approval/signature blocks;
- footer, page numbering and issue/revision marking.

## Tenant configuration boundary

V1 allows bounded configuration only:
- logo;
- company/contact/address blocks;
- approved standard-term blocks;
- signature roles/blocks;
- locale/language;
- approved optional sections;
- document numbering presentation.

No tenant-authored formulas, executable expressions, arbitrary database queries or unrestricted conditional logic.

## Lifecycle

`DRAFT PREVIEW -> APPROVED/READY -> ISSUED VERSION -> SUPERSEDED/REISSUED`

An issued artifact binds exact source object versions, template class/version, locale, number/revision and render inputs. Re-rendering an old issued version must be reproducible.

## Outputs

- PDF required for issued business documents;
- Excel/XLSX for RFQ/comparison where operationally useful;
- print preview;
- download/manual-send from day one;
- email/connector distribution later uses the exact issued artifact rather than regenerating ad hoc.

## B04 reuse

Reuse evidence/object-store and issued-artifact immutability where valid. Users see the business document and its revisions, while EvidenceVersion/IssuedArtifactVersion remain internal provenance mechanics.

## Acceptance

A contractor can configure company identity once, create an MR/RFQ/LPO, preview a professional layout, issue it, download the exact PDF, later issue a revision, and reproduce both versions with their original numbers, source lines, terms and attachments.