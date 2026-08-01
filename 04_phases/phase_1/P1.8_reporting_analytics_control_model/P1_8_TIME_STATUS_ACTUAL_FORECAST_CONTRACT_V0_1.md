# P1.8 — Time, Status, Actual and Forecast Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**Parent:** `P1_8_WORKPLAN_V0_1.md`  
**Metric contract:** `P1_8_METRIC_SEMANTIC_AUTHORITY_CONTRACT_V0_1.md`  
**Projection contract:** `P1_8_PROJECTION_REPORT_VERSIONING_RESTATEMENT_CONTRACT_V0_1.md`  
**P1.7:** PASS / CLOSED / FROZEN  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract freezes the time, status, actual and forecast meanings used by every P1.8 metric, projection, report, export, control observation and later chat/AI explanation.

It prevents:

- generic “current,” “actual,” “period” or “overdue” labels;
- physical progress being reported as certified value;
- certified value being reported as accounting posting or paid cash;
- forecast overwriting actual;
- later confirmation erasing prior forecasts;
- recorded-time views being presented as effective-time history;
- point-in-time positions being confused with period movement;
- aging calculations silently changing calendar, trigger or hold treatment;
- report publication time being mistaken for source or business-effective time.

The governing rule is:

> **Every load-bearing result binds an explicit time basis and truth family. No metric may infer one actual/status family from another, and no later fact may silently rewrite the historical forecast, confirmation or known-at state that preceded it.**

---

# 2. Inherited constraints

This contract preserves:

- P1.4 effective-period authority and historical configuration/authority binding;
- P1.5 effective-time/recorded-time distinction, planned/forecast/confirmed/actual separation and actual-family separation;
- P1.5 exact monetary/FX/calendar/configuration versioning;
- P1.6 evidence observation/occurrence/source-time distinctions;
- P1.7 query consistency, source/observed/freshness time and `EFFECT_INDETERMINATE` visibility;
- P1.8 metric/projection/report version identities.

No UI, dashboard, export, connector or AI summary may replace these semantics with a generic timestamp or status label.

---

# 3. Controlled time dimensions

The following time dimensions remain distinct.

## 3.1 `SOURCE_TIME`

Time asserted by the source system, document, message or observation.

It must state:

- source identity;
- timezone/offset or unknown status;
- precision;
- source confidence/validation;
- whether it is event time, document date, provider timestamp or user assertion.

Source time is not automatically product-effective time.

## 3.2 `EFFECTIVE_TIME`

Business-effective instant or period under the owning-domain semantics.

It may differ from source time and recorded time.

Backdated or future-dated effective time requires the owning-domain rule and governing policy/version.

## 3.3 `RECORDED_TIME`

Time the product durably recorded the fact/event/observation.

Recorded time is never silently substituted for effective time.

## 3.4 `OBSERVED_TIME`

Time an external fact was observed/fetched/received by the product.

It supports freshness and known-at analysis but does not define the external fact’s effective meaning.

## 3.5 `KNOWN_AT_TIME`

Earliest governed time at which the report/projection population could legitimately include the fact under its recorded/observed/evidence rules.

Used for historical “what was known then” reconstruction.

## 3.6 `AS_OF_CUT_TIME`

The declared temporal boundary used by a query or projection.

It must bind:

- effective-time or recorded/known-at basis;
- inclusive/exclusive boundary;
- timezone/calendar;
- multi-resource consistency cut;
- permitted late-arrival treatment;
- source freshness state.

## 3.7 `EXECUTION_TIME`

Time the metric/projection/report calculation executed.

Execution time does not imply source freshness or as-of meaning.

## 3.8 `PUBLICATION_TIME`

Time a report snapshot/artifact was issued or published.

Publication time differs from as-of time and source time.

## 3.9 `COMMUNICATION_TIME`

Issue, dispatch, delivery, receipt, acknowledgment or response time under P1.6.

Those times remain separate and may drive different duration/aging metrics.

---

# 4. Closed primary time-basis catalogue

Every load-bearing metric has exactly one primary time-basis class.

## 4.1 `POINT_IN_TIME_EFFECTIVE_POSITION`

Position at an exact effective-time cut.

Examples:

- open Commitment obligation at period end;
- unallocated requirement quantity at a stated cut.

## 4.2 `POINT_IN_TIME_RECORDED_POSITION`

Position reconstructable from facts recorded by a stated recorded-time cut.

Used for known-at/audit analysis, not as a substitute for effective position.

## 4.3 `PERIOD_EFFECTIVE_FLOW`

Events/effects whose effective time falls within the period.

## 4.4 `PERIOD_RECORDED_FLOW`

Facts/events recorded within the period regardless of effective date.

## 4.5 `COHORT_WINDOW`

Population enters by an explicitly defined cohort event/date and is measured under a stated follow-up window.

## 4.6 `ROLLING_WINDOW`

A moving interval relative to the as-of cut, with exact length and boundary rules.

## 4.7 `DURATION_BETWEEN_EVENTS`

Elapsed time between two exact governed triggers.

## 4.8 `AGING_UNTIL_RESOLUTION_OR_CUT`

Elapsed time from trigger until resolution or current as-of cut while an unresolved predicate remains true.

## 4.9 `MILESTONE_VARIANCE`

Difference between two explicit milestone time families, such as actual versus confirmed or forecast versus planned.

## 4.10 `SNAPSHOT_PUBLICATION_CONTEXT`

Used only for issued-report metadata and not for source/business movement.

A supporting secondary time dimension may be included, but the primary basis controls interpretation.

---

# 5. Period and boundary rules

Every period/window definition binds:

- period key/version;
- timezone;
- calendar or business-calendar version;
- start boundary and inclusivity;
- end boundary and inclusivity;
- daylight-saving behavior where relevant;
- fiscal/project/reporting calendar basis;
- open-period behavior;
- period-close/correction behavior;
- backdated/future-dated inclusion;
- late-recorded fact treatment;
- cross-project comparability rule.

No metric may infer a calendar from user locale or dashboard rendering settings.

---

# 6. Truth/status family catalogue

The following families remain distinct.

## 6.1 `REQUIRED`

A governed requirement/obligation/prerequisite exists.

Required is not planned completion or actual performance.

## 6.2 `PLANNED`

An authorized plan/baseline target under a named plan version.

A plan is a planning fact and does not become forecast or actual automatically.

## 6.3 `FORECAST`

A current predicted outcome/date/value under a named forecast method/version and forecast-as-of time.

Forecast is never overwritten by later actual; prior forecasts remain historical forecast facts.

## 6.4 `CONFIRMED`

An explicitly confirmed expected outcome/date/value from a stated principal/source under a governed confirmation basis.

Confirmed is stronger than forecast but not actual.

## 6.5 `ACTUAL`

An occurred/established fact under one exact actual family.

Generic `ACTUAL` alone is invalid for load-bearing metrics.

## 6.6 `SCENARIO`

A hypothetical/proposed result under declared assumptions.

Scenario is not forecast unless a separate forecast definition adopts it.

## 6.7 `TARGET`

A goal or control threshold.

Target is not plan, forecast, confirmed or actual.

---

# 7. Closed actual-family catalogue

Every actual metric names exactly one primary actual family.

## 7.1 `PHYSICAL_ACTUAL`

Observed/accepted physical delivery, installation, progress or completion fact under the relevant operating/domain evidence.

It does not establish commercial certification, accounting posting or payment.

## 7.2 `PRODUCT_COMMERCIAL_CERTIFIED_ACTUAL`

Product-owned commercial assessment/certification/effect established under P07 or another activated owning domain.

It does not establish statutory/AP liability, GL posting or cash paid.

## 7.3 `EXTERNAL_ACCOUNTING_POSTED_ACTUAL`

External accounting system fact for posting/liability/job-cost/accounting position under configured authority.

It remains external authoritative truth where configured and does not rewrite product commercial certification.

## 7.4 `PAID_CASH_ACTUAL`

Authoritative payment/cash settlement fact from the owning external/payment source.

It does not imply physical completion or certified entitlement.

## 7.5 `COMMUNICATION_ACTUAL`

Observed issue/dispatch/delivery/receipt/acknowledgment/response occurrence under P1.6.

The exact communication fact must be named; “sent” or “received” is insufficient.

## 7.6 `EXTERNAL_TECHNICAL_ACTUAL`

External authoritative technical/CDE/milestone fact where configured.

It must preserve source/freshness/version and cannot become product commercial truth.

## 7.7 `DOMAIN_TRANSACTION_ACTUAL`

A product-owned non-commercial domain event, such as tender issued or AwardDecision established.

The exact event family must be named.

Any new actual family requires controlled extension; it cannot be folded into an existing family for convenience.

---

# 8. Actual-family composition rules

A report may present multiple actual families side by side.

It may not:

- sum unlike actual families into one value;
- use one as a proxy for another without an explicit comparison/variance metric;
- select “latest available actual” across families;
- treat missing accounting/payment data as zero;
- infer certification from physical completion;
- infer payment from accounting posting;
- infer physical completion from paid cash;
- infer communication effectiveness from provider send acceptance.

A comparison among families is a separate `VARIANCE` or `RECONCILIATION_POSITION` metric with exact source/time/quality meaning.

---

# 9. Plan, forecast, confirmation and actual lineage

For every tracked subject/milestone/value family, preserve as applicable:

- plan version and effective period;
- forecast version and forecast-as-of time;
- confirmation occurrence/source and effective scope;
- actual source/event and time;
- supersession/correction lineage;
- variance basis;
- evidence/configuration versions.

Later actual does not delete or rewrite prior plan, forecast or confirmation.

Later forecast does not overwrite prior forecasts; current forecast is a projection over forecast history.

A confirmation correction preserves the original confirmation and correction/retraction history.

---

# 10. Duration contract

A `DURATION` metric binds:

- exact start event/fact family;
- exact end event/fact family;
- effective/recorded/communication time basis for each;
- population eligibility;
- treatment of missing start/end;
- open-instance exclusion or separate state;
- calendar/timezone;
- pause/suspension intervals;
- same-day/zero duration rule;
- negative/inconsistent timestamp rule;
- correction/restatement behavior;
- percentile/average sample requirements where aggregated.

No duration may infer start/end from current status labels alone unless the status projection is proven to map to exact underlying events.

---

# 11. Aging contract

An `AGING` metric binds:

- trigger event/fact;
- unresolved predicate;
- resolution event/fact;
- as-of basis;
- calendar/timezone;
- hold/pause/suspension rule;
- grace period/threshold version;
- open versus terminal-no-effect behavior;
- treatment of `EFFECT_INDETERMINATE`;
- negative/missing/inconsistent timestamp behavior;
- reset/reopen behavior;
- quality/limitation state.

An overdue/control threshold does not change the underlying business state.

Aging continues or pauses only under the explicit definition; UI color cannot alter it.

---

# 12. Milestone semantics

A milestone result names both:

- milestone identity/family;
- time/truth family.

Valid examples:

- planned material delivery date;
- forecast material delivery date;
- supplier-confirmed delivery date;
- physical actual delivery date;
- product-issued RFQ actual date;
- external accounting-posted invoice date.

Invalid example:

- “delivery date” without family/source/time meaning.

Milestone variance names exact compared families and direction convention.

---

# 13. Backdating and late arrival

## 13.1 Backdated effective fact

A fact recorded now with earlier effective time affects effective-time projections under owning-domain correction rules.

It does not alter what was known at an earlier recorded/known-at cut.

## 13.2 Late-arriving observation

An external fact observed after its source/effective time affects current effective projections when accepted, while historical known-at reports remain unchanged unless explicitly restated for a stated purpose.

## 13.3 Future-dated fact

A future-effective fact does not enter current effective position until its effective time unless the metric explicitly measures future commitments/forecast/confirmed pipeline.

## 13.4 Invalid temporal assertion

Impossible or conflicting timestamps cause typed quality/conflict state, not silent correction.

---

# 14. Corrections and temporal restatement

A source correction preserves:

- original fact/event/time;
- correction/replacement identity;
- effective and recorded times;
- governing authority/configuration;
- projection impact.

Projection behavior depends on declared purpose:

- current effective truth;
- historical effective restatement;
- historical recorded/known-at view;
- issued snapshot preservation.

No single corrected timestamp silently replaces all four perspectives.

---

# 15. `EFFECT_INDETERMINATE` time treatment

An indeterminate external/domain effect preserves:

- last effect-bearing attempt time;
- uncertainty-start time;
- source/provider correlation;
- reconciliation attempts/times;
- current stage and limitations.

Metrics must explicitly choose:

- exclude and quantify separately;
- include in bounded exposure range;
- block result;
- show separate confirmed/indeterminate positions.

No indeterminate effect becomes actual because it is old, timed out or operationally closed as unresolved variance.

---

# 16. Status projection rules

A status is either:

- authoritative source/domain state under an owning model; or
- a named projection/classification over facts/events.

A projected status binds:

- exact rules/version;
- source facts/events;
- current/as-of basis;
- precedence/order rules;
- unknown/conflict state;
- correction/restatement behavior;
- explicit non-authority.

Manual dashboard edits cannot change it.

Alerts such as `OVERDUE`, `AT_RISK`, `MISSING_EVIDENCE`, `STALE_SOURCE` or `RECONCILIATION_OPEN` are control observations, not owning-domain lifecycle states unless a frozen domain separately defines them.

---

# 17. Current-state projections

“Current” means:

- a declared authoritative-current or projection-versioned query;
- exact source cut/execution time;
- source freshness/completeness state;
- effective-time basis;
- current accepted definition/configuration.

A cached value without current cut/freshness is not current.

A live dashboard rendered now from stale data remains stale, not newly current.

---

# 18. Forecast and scenario rules

A forecast binds:

- ForecastDefinition/version;
- forecast subject/grain;
- forecast-as-of time;
- source facts/assumptions;
- method/tool/model/configuration identity;
- horizon;
- uncertainty/range where relevant;
- access/provenance;
- status lifecycle;
- later actual comparison rule.

Deterministic and AI/model forecasts remain derived.

A scenario binds explicit hypothetical assumptions and cannot be represented as expected/forecast outcome unless a separate authorized forecast result adopts it.

No confidence score changes forecast into actual or confirmed fact.

---

# 19. Calendar and timezone control

Load-bearing time calculations bind a versioned calendar/timezone basis.

The basis states:

- IANA timezone or controlled equivalent;
- working days/hours;
- weekends;
- holidays and effective version;
- project/contract calendar where applicable;
- partial-day rule;
- timezone conversion/display policy;
- daylight-saving behavior;
- exception handling.

Display timezone may differ from calculation timezone but cannot change the result.

---

# 20. Aggregation and comparability

Time-based aggregation is permitted only when members have compatible:

- time-basis class;
- period boundaries/calendar;
- timezone conversion policy;
- actual/status family;
- source authority/freshness;
- definition version or explicit cross-version policy.

Otherwise:

- block aggregation;
- segment results;
- or mark non-comparable/mixed-time with exact limitations.

A portfolio report cannot average cycle times across incompatible start/end definitions.

---

# 21. Report and chat disclosure

Every load-bearing result exposes as applicable:

- as-of time and basis;
- period/window;
- calculation timezone/calendar;
- truth/status/actual family;
- source freshness;
- known-at versus restated perspective;
- indeterminate/partial treatment;
- forecast/scenario/actual classification.

Chat/AI cannot shorten “product commercial certified actual” to “paid” or “physical progress” to “cost incurred.”

---

# 22. Activation tests

A time/status/actual/forecast definition cannot activate unless:

1. primary time basis is named;
2. all relevant source/effective/recorded/observed times are distinguished;
3. period boundaries and timezone/calendar are explicit;
4. truth/status family is explicit;
5. actual family is explicit where applicable;
6. plan/forecast/confirmation/actual lineage is preserved;
7. duration/aging triggers are exact;
8. holds/pauses/open instances are defined;
9. backdating/late arrival/future-dating are defined;
10. correction/restatement perspective is explicit;
11. indeterminate-effect treatment is explicit;
12. aggregation comparability is defined;
13. source freshness/completeness is visible;
14. no UI label or current lookup substitutes for temporal meaning;
15. no actual family is inferred from another;
16. product code remains locked.

---

# 23. Hostile scenarios

Test at minimum:

1. physical delivery occurs before commercial certification;
2. certification occurs before ERP posting;
3. ERP posting occurs before cash payment;
4. payment is reversed externally;
5. future-dated Commitment becomes effective next month;
6. backdated correction arrives after period close;
7. report asks what was effective at month end;
8. report asks what was known at month end;
9. forecast changed five times before actual;
10. supplier confirmation is later retracted;
11. current dashboard uses yesterday’s stale ERP feed;
12. report rendered now from old cache;
13. project uses Friday/Saturday weekend while another uses Saturday/Sunday;
14. business-calendar holiday list changes;
15. daylight-saving conversion affects portfolio duration;
16. missing start timestamp;
17. end timestamp precedes start;
18. unresolved item is put on hold;
19. hold removal reopens aging;
20. alert threshold changes;
21. status color changes without source event;
22. “delivery date” lacks truth family;
23. external CDE milestone is stale;
24. indeterminate ERP post remains unresolved for months;
25. operational variance closes but effect remains indeterminate;
26. late external observation has earlier source time;
27. current effective report includes late fact;
28. historical known-at report excludes late fact;
29. issued report is later restated;
30. cross-project average cycle time uses different triggers;
31. forecast generated by AI is presented as confirmed;
32. scenario is shown as forecast;
33. paid amount is shown as physical progress;
34. accounting posted amount is shown as certified value;
35. communication provider acceptance is shown as delivery;
36. chat answers “actual cost” without family clarification.

---

# 24. Candidate ADR impact

This candidate supports a future ADR-0035 semantic decision:

> Adopt explicit time-basis and truth-family semantics for all reporting: source/effective/recorded/observed/known-at/publication times remain distinct; REQUIRED/PLANNED/FORECAST/CONFIRMED/ACTUAL/SCENARIO/TARGET remain distinct; ACTUAL requires a named actual family; and historical forecast/confirmation/known-at history is never overwritten by later actuals or corrections.

No ADR status changes at this stage.

---

# 25. Exit condition

This candidate may proceed into data-quality and metric-catalogue integration when hostile review confirms that no report, metric, export, dashboard or chat result can use generic time/status/actual language or silently collapse physical, commercial, accounting and cash truth.
