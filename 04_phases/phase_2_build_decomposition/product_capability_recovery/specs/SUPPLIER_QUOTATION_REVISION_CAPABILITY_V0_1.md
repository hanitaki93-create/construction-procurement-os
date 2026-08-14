# CPOS Supplier Quotation / Revision Capability v0.1

**Status:** DRAFT / R00 MEANING REVIEW REQUIRED

## User meaning

A supplier response is a governed commercial source record, not merely an attachment and not merely structured form data. CPOS must preserve exactly what the supplier sent while also supporting structured capture for comparison.

## Response object

Header:
- supplier and invited contact;
- RFQ/tender and exact issued version;
- response/revision number;
- received/submitted timestamp and channel;
- quotation reference/date;
- currency;
- validity date/period;
- lead time/delivery promise;
- payment terms;
- warranty/guarantee statements;
- commercial notes;
- response status;
- source documents/files;
- capture provenance and buyer-on-behalf identity where applicable.

Lines:
- RFQ line mapping or explicit supplier-added/unmapped line;
- supplier description;
- quoted quantity/UOM;
- unit rate and amount;
- tax treatment where supplied;
- brand/manufacturer/model;
- lead time override;
- inclusion/exclusion/deviation notes;
- alternate/substitute indicator;
- attachments/evidence links.

## Channels

Support secure task/link, file upload, email attachment/reply capture where integrated, and governed buyer-on-behalf/manual capture. Channel does not change source provenance.

## Lifecycle

`INVITED -> INTENT/NO_BID -> DRAFT_RESPONSE -> SUBMITTED/RECEIVED -> REVISED -> WITHDRAWN/FINAL`

Late responses are accepted/rejected only under the RFQ acceptance policy. Revisions never overwrite prior supplier source truth.

## Original versus structured truth

The original PDF/Excel/email attachment remains immutable evidence. Structured values are attributable captures from that source or direct supplier input. Buyer normalization happens later in Comparison and cannot mutate supplier-source values.

## Register

Response register shows supplier, invitation status, intent/no-bid, latest revision, received time, channel, validity, completeness, missing fields/documents, late flag, clarification state and comparison inclusion.

## AI readiness

AI may extract proposed line/value mappings from supplier documents with exact source citations and confidence. Human confirmation is required before extracted values enter deterministic structured capture. Source files remain authoritative evidence.

## Acceptance

Three suppliers can respond to one RFQ using different channels and document formats; one revises twice, one declines, one submits late. The buyer sees the exact response history and can select the correct immutable revision for comparison.