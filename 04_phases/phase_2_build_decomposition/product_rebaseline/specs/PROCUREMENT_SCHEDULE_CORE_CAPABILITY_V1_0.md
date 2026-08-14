# CPOS Procurement Schedule Core Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Procurement planning begins before an RFQ is issued. Every material/package path that matters to programme must carry a usable procurement timeline from the moment it becomes a planned procurement object.

## Schedule object

For each Procurement Package or schedule-worthy MR/direct procurement route, maintain distinct date facts for:
- required-on-site / required-by;
- baseline RFQ/tender issue;
- baseline tender return;
- baseline comparison/recommendation;
- baseline approval;
- baseline award/order/contract;
- supplier production/lead-time start where relevant;
- baseline delivery/start-on-site;
- current forecast dates for the same milestones;
- supplier-confirmed dates where available;
- actual milestone dates derived from canonical transaction events.

Required, baseline, forecast, supplier-confirmed and actual dates are not interchangeable.

## Dependencies and calculations

The schedule may calculate suggested upstream dates from required-on-site date and governed lead-time assumptions, approval duration and sourcing duration. Calculated suggestions remain proposals until baselined.

Baseline changes require user attribution/reason and history. Actual dates are never manually rewritten where a canonical event exists.

## Integration into the spine

- Estimating Handover may seed initial required dates/allowances.
- Procurement Package owns the core package plan.
- MR/direct route may carry a simpler plan.
- RFQ issue/return, comparison, approval, award, order and execution events populate actual milestones automatically.
- Supplier quotation/clarification may provide lead-time inputs and supplier-confirmed dates.
- R09 Workbench provides portfolio roll-up, variance, risk and cross-project analysis rather than inventing the schedule late.

## Risk indicators

Minimum deterministic indicators:
- baseline milestone overdue and not actualized;
- forecast later than baseline;
- forecast/order/delivery later than required date;
- supplier-confirmed date later than required date;
- no confirmed supplier date within configurable lead-time horizon.

Rules expose their basis and must not silently alter dates.

## User surfaces

- package/MR procurement-plan panel;
- project procurement schedule/register;
- milestone timeline;
- baseline-vs-forecast variance and history;
- later portfolio workbench roll-up.

## Acceptance

A procurement manager creates an aluminium package six months before required installation, baselines RFQ/return/recommendation/award/order/delivery dates, sees actual milestones populate as procurement progresses, updates a forecast with reason after a delayed tender return, records supplier-confirmed delivery, and sees immediately when the confirmed date threatens the required-on-site date.