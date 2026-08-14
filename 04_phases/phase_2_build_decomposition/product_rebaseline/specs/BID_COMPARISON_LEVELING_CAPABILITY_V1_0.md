# CPOS Bid Comparison / Leveling Capability v1.0

## Purpose

Turn heterogeneous supplier quotations into a reproducible apples-to-apples buying decision without altering supplier-origin truth.

## Semantic layers

1. **Supplier Source** — exact submitted values/documents.
2. **Normalized Representation** — mapped item/UOM/currency/coverage representation with provenance.
3. **Buyer Evaluation Adjustment** — explicitly marked internal adjustments, exclusions, plugs or commercial normalization.
4. **Supplier-Confirmed Contractable Basis** — values confirmed through clarification/negotiation that may support award/commitment.

No layer silently overwrites another.

## Comparison structure

The buyer defines/selects sections/rows derived from RFQ lines plus governed supplier-added lines. Each supplier column can show original and normalized amounts/rates, adjustment marker/reason, coverage status, brand/model/alternate, lead time, payment terms, validity, warranty, exclusions/deviations, clarification status and source citation/link.

Coverage statuses include EXACT, PARTIAL, BUNDLED, ALTERNATE, SUPPLIER_ADDED, MISSING, NOT_APPLICABLE and UNRESOLVED.

## Buyer experience

- side-by-side leveling;
- missing/excluded counts;
- alternates/substitutes toggles;
- technical/commercial deviation views;
- clarification requests/responses;
- notes/history;
- negotiated revision selection;
- transparent formulas and normalized totals;
- frozen ComparisonSnapshot;
- no opaque ranking that hides coverage.

## AI assist

AI may propose extraction, line mapping, UOM/item match, inclusion/exclusion detection and deviation summaries with exact source citations/confidence. Human confirmation is mandatory. AI cannot edit supplier source truth or silently choose the winner.

## Outputs

Professional comparison workbook/XLSX plus PDF/print summary. Every exported value identifies whether it is source, normalized or adjusted.

## Acceptance

Given three materially different quotations—including bundled pricing, missing items, an alternate brand and different payment terms—the buyer produces a reproducible leveled comparison, explains every adjustment, traces every value to source, freezes a snapshot and hands the exact basis into recommendation without re-keying.