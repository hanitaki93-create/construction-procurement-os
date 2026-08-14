# CPOS Business Document Template / Rendering Capability v1.0

## Purpose

Turn governed procurement records into professional issue-ready documents while preserving exact issued-version identity and avoiding a general report-builder platform in V1.

## Initial document classes

- MR/PR;
- RFQ/Tender enquiry;
- RFQ addendum;
- bid comparison summary/workbook export;
- recommendation/approval brief;
- LPO/Purchase Order;
- Subcontract/award basis;
- GRN/receipt where CPOS owns the document.

## Template structure

Every class declares product-owned sections/fields. Typical blocks include company/legal entity identity and logo; document title/number/revision/date; project; supplier/recipient and attention; subject; line/SOV table; currency/tax/totals; delivery/need-by; payment/commercial terms; instructions/notes; attachment/annexure index; approval/signature blocks; footer/page numbering and issue/revision marking.

## Tenant configuration boundary

V1 allows bounded configuration only: logo, company/contact/address blocks, approved standard-term blocks, signature roles/blocks, locale/language, approved optional sections and document-number presentation. No tenant-authored formulas, arbitrary queries, executable expressions or unrestricted conditional logic.

## Lifecycle

`DRAFT_PREVIEW -> APPROVED/READY -> ISSUED_VERSION -> SUPERSEDED/REISSUED`

An issued artifact binds exact source object versions, template class/version, locale, business number/revision and render inputs. Re-rendering an issued version must be reproducible.

## Outputs

PDF required for issued documents; XLSX for RFQ/comparison where useful; print preview; download/manual-send from day one. Email/connectors later send the exact issued artifact rather than regenerating ad hoc.

## Provenance substrate

The rejected B04 evidence/artifact code may be salvaged only if it cleanly supports this capability; ordinary users see business documents and revisions, not EvidenceVersion vocabulary.

## Acceptance

A contractor configures company identity once, creates an MR/RFQ/LPO, previews a professional layout, issues/downloads the exact PDF, later issues a revision and can reproduce both versions with their original numbers, source lines, terms and attachments.