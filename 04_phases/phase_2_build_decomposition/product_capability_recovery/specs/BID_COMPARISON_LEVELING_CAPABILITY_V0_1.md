# CPOS Bid Comparison / Leveling Capability v0.1

**Status:** DRAFT / R00 MEANING REVIEW REQUIRED

## Purpose

Turn heterogeneous supplier quotations into a reproducible apples-to-apples buying decision without altering supplier-origin truth.

## Semantic layers

1. **Supplier Source** — exact submitted values/documents.
2. **Normalized Representation** — mapped item/UOM/currency/coverage representation with provenance.
3. **Buyer Evaluation Adjustment** — explicitly marked internal adjustments, exclusions, plugs or commercial normalization.
4. **Supplier-Confirmed Contractable Basis** — values confirmed through clarification/negotiation that may support award/commitment.

No layer silently overwrites another.

## Comparison structure

The buyer can define/select comparison sections and rows derived from RFQ lines plus governed supplier-added lines. Each supplier column shows:
- original amount/rate;
- normalized amount/rate;
- adjustment indicator and reason;
- coverage status;
- brand/model/alternate;
- lead time;
- payment terms;
- validity;
- warranty;
- exclusions/deviations;
- clarification status;
- source citation/link.

Coverage statuses include EXACT, PARTIAL, BUNDLED, ALTERNATE, SUPPLIER_ADDED, MISSING, NOT_APPLICABLE and UNRESOLVED.

## Buyer experience

- side-by-side leveling;
- missing/excluded counts;
- toggled alternates/substitutes;
- technical/commercial deviation views;
- clarification requests and responses;
- notes/history;
- negotiated revision selection;
- comparison freeze/snapshot;
- total and normalized total with transparent formula basis;
- no opaque ranking that hides scope coverage.

## AI assist

AI may propose extraction, line mapping, UOM/item match, inclusion/exclusion detection and deviation summaries with exact source citations and confidence. Human confirmation is mandatory. AI cannot edit supplier source truth, select a winner silently, or create contractable terms without confirmation.

## Outputs

Professional comparison workbook/export plus PDF/print summary suitable for internal review. Every exported value must identify whether it is source, normalized or adjusted.

## Acceptance

Given three materially different quotations—including bundled pricing, missing items, an alternate brand and different payment terms—the buyer can produce a reproducible leveled comparison, explain every adjustment, trace each value to source, freeze a snapshot, and hand that exact basis into recommendation without re-keying.