# CPOS Procurement Analytics / Savings / Cycle-Time Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

A specialist procurement system must show whether procurement is on time, competitive and commercially effective without maintaining external spreadsheets. Metrics must derive from governed transaction facts rather than manually curated status numbers.

## Initial deterministic metrics

Examples include:
- procurement packages by status/risk/project/trade/buyer;
- planned vs actual RFQ/return/recommendation/award/order/execution cycle times;
- supplier invitation/intent/response/no-bid rates;
- tender coverage and number of comparable bids;
- initial quoted vs final supplier-confirmed/awarded value where semantically comparable;
- ProcurementBudgetBasis vs approved award/order variance;
- estimating allowance vs award variance where relevant and clearly labeled;
- identified comparison adjustments/scope gaps/deviations;
- awards by supplier/category/project;
- supplier response/performance trends;
- compliance/qualification expiry exposure;
- unsigned/unexecuted contract backlog;
- order/receipt progress where CPOS owns the facts.

## Savings semantics

'Savings' is not one universal number. Every displayed savings/avoidance metric declares the baseline used such as:
- original supplier quotation;
- first comparable bid basis;
- negotiated supplier-confirmed basis;
- budget/cost-plan basis;
- estimating allowance.

Metrics that are not semantically comparable must not be collapsed into a headline saving.

## Views

- project procurement dashboard;
- portfolio procurement dashboard;
- category/trade view;
- buyer/team view;
- supplier view;
- cycle-time/funnel view;
- schedule/risk view;
- export/BI/API dataset where authorized.

## Provenance

A user can drill from a metric to the transactions that compose it and identify the calculation version/time window. Corrected/superseded transactions follow explicit metric rules rather than disappearing from history.

## AI readiness

AI may explain trends, anomalies or likely causes using the same deterministic metric facts. It cannot fabricate savings or convert correlation into hidden supplier/risk policy.

## Acceptance

A procurement manager can see which packages are late, how long tender-to-award takes, which suppliers frequently decline or respond late, budget-to-award variance and negotiated value movement, and can drill every number back to the exact packages/tenders/awards that produced it.