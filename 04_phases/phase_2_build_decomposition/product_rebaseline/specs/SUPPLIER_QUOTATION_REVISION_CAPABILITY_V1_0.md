# CPOS Supplier Quotation / Revision Capability v1.0

## User meaning

A supplier response is governed commercial source truth. CPOS must preserve exactly what the supplier sent while also supporting structured capture for comparison.

## Header

- supplier and invited contact;
- RFQ/Tender and exact issued version;
- response/revision number;
- submitted/received timestamp and channel;
- quotation reference/date;
- currency;
- validity;
- lead time/delivery promise;
- payment terms;
- warranty/guarantee statements;
- commercial notes;
- response status;
- source files/documents;
- capture provenance and buyer-on-behalf identity where relevant.

## Lines

- RFQ line mapping or explicit supplier-added/unmapped line;
- supplier description;
- quoted quantity/UOM;
- unit rate and amount;
- tax where supplied;
- brand/manufacturer/model;
- lead time override;
- inclusion/exclusion/deviation notes;
- alternate/substitute indicator;
- attachments/evidence links.

## Channels

Secure task/link, file upload, email attachment/reply capture when integrated, and governed buyer-on-behalf/manual capture. Channel never erases provenance.

## Lifecycle

`INVITED -> INTENT/NO_BID -> DRAFT_RESPONSE -> SUBMITTED/RECEIVED -> REVISED -> WITHDRAWN/FINAL`

Late-response treatment follows the RFQ policy. Revisions never overwrite prior supplier source truth.

## Source versus structured truth

Original PDF/Excel/email attachment remains immutable evidence. Structured values are attributable captures from source or direct supplier input. Buyer normalization occurs only in Comparison and cannot mutate supplier-source values.

## Register

Supplier response register shows supplier, invitation state, intent/no-bid, latest revision, received time, channel, validity, completeness, missing fields/documents, late flag, clarification state and comparison inclusion.

## AI readiness

AI may propose line/value extraction with exact source citations and confidence. Human confirmation is required before extracted values enter deterministic structured capture.

## Acceptance

Three suppliers respond to one RFQ using different channels and formats; one revises twice, one declines and one submits late. The buyer can see the exact response history and select the correct immutable revision for comparison.