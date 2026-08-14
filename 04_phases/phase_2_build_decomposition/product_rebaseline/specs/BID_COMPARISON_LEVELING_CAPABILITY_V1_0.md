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

Currency/UOM normalization uses governed reference data, explicit conversion basis/date/rate where applicable and exact decimal/rounding policy. The normalized layer never erases original quoted currency/UOM.

## Technical evaluation and supplier decision context

The leveling surface consumes the frozen/current TechnicalEvaluation where the tender uses structured technical evaluation. It shows technical compliance/deviation/clarification state beside the commercial offer and respects any two-stage opening policy.

TechnicalEvaluation is distinct from TechnicalApprovalDependency: evaluation judges the supplier's tender response; TechnicalApprovalDependency may remain unresolved for a later external consultant/client/material approval.

The leveling surface also exposes relevant registration/qualification/compliance state, company project/tender/commitment exposure, performance history and explainable capacity indicators alongside the current bid.

Commercially attractive but technically non-compliant/unresolved offers cannot be presented as fully equivalent without explicit status and justification.

## Buyer experience

- side-by-side leveling;
- missing/excluded counts;
- alternates/substitutes toggles;
- technical evaluation/commercial deviation views;
- clarification requests/responses linked to procurement correspondence;
- notes/history;
- negotiated revision selection;
- transparent formulas and normalized totals;
- frozen ComparisonSnapshot;
- no opaque ranking that hides coverage, technical status or supplier risk context.

## AI assist

AI may propose extraction, line mapping, UOM/item/currency match, inclusion/exclusion detection and technical/commercial deviation summaries with exact source citations/confidence. Human confirmation is mandatory. AI cannot edit supplier source truth, mark technical compliance as final, infer external technical approval, silently manipulate performance risk or choose the winner.

## Outputs

Professional comparison workbook/XLSX plus PDF/print summary. Every exported value identifies whether it is source, normalized or adjusted and the conversion/adjustment basis where applicable. Where technical evaluation is part of the decision, the output preserves the evaluation version/status relied upon.

## Acceptance

Given three materially different quotations—including bundled pricing, missing items, an alternate requiring technical evaluation/approval, different currencies/payment terms and one supplier with material current workload exposure—the buyer produces a reproducible leveled comparison, explains every conversion/adjustment, traces every value to source, sees the formal technical-evaluation state and remaining external approval dependencies, freezes a snapshot and hands the exact basis into recommendation without re-keying.