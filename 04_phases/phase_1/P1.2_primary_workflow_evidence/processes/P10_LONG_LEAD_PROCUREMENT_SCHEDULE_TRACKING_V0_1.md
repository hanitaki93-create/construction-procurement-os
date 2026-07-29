# P10 — Long-Lead / Procurement Schedule Tracking v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Purpose:** define how procurement lead-time risk is planned and tracked across sourcing, technical approval, commitment, manufacturing/shipping and delivery without creating a parallel manual status ledger or prematurely deciding ADR-0007 long-lead object structure.

## 1. Problem to solve

Construction procurement often begins long before site demand becomes immediate.

The system must answer:

- what must be on site and when;
- which procurement requirement/package/commitment supplies it;
- what lead-time components drive the latest safe action dates;
- whether tender/award/submittal/manufacture/shipping/delivery milestones are planned, forecast or actual;
- who currently owns the next action;
- what changed from the original plan;
- whether risk to site-required date is increasing;
- whether the current status is transactional truth or human forecast.

The design must not require a separate Excel procurement schedule containing unique status truth already available in sourcing/commitment events.

## 2. Mature-system reference patterns

### ProcurePro

Current product material emphasizes procurement schedules with package milestones, lead times and automatically updated activity/status from procurement actions. This supports using the procurement lifecycle as evidence for schedule progress rather than manually duplicating each status.

### Procore Submittals

Submittal schedule calculations work backward from a Required On-Site Date using lead time and internal/design review durations to derive planned submit/review/return dates. Procore also distinguishes planned dates from confirmed/actual delivery dates and can reference a project schedule task.

This is a strong pattern for:
- required-on-site anchor;
- backward-calculated planning milestones;
- separate actual dates;
- external schedule activity linkage;
- keeping schedule calculations as planning/reference rather than mutating workflow truth.

## 3. ADR-0007 remains open

P10 does **not** decide that `LongLeadItem` is a new first-class aggregate.

Candidate implementations later may be:
- milestone plan attached to existing RequirementAllocation/package/commitment line;
- independent tracked subject linked to several domain objects;
- projection over linked procurement/submittal/shipment events;
- hybrid.

P10 defines required behavior/invariants first.

## 4. Tracking subject

A long-lead tracked subject represents a coherent item/scope whose timing matters to site/programme.

Candidate anchor can be:
- `PLANNED_REQUIREMENT`;
- DemandLine/RequirementAllocation;
- ProcurementPackage;
- commitment line/SOV item;
- equipment/material schedule line;
- scope partition;
- another evidenced planning unit.

The tracking identity must preserve links through sourcing→award→commitment→delivery without forcing every stage to create a new tracker record.

## 5. Critical date types

Never collapse these into one `expected date`.

### Required date

Externally/business-required milestone such as:
- required on site;
- installation start;
- commissioning need;
- handover dependency.

### Planned date

Baseline/target date derived or entered for a procurement milestone.

### Forecast date

Current human/system estimate of when the milestone will actually occur.

### Confirmed date

Date explicitly committed/confirmed by supplier/approver/carrier where that fact is useful.

### Actual date

Observed transaction/event completion date.

Historical planned/forecast revisions must not overwrite actual dates or old baseline plans.

## 6. Candidate milestone chain

A long-lead chain may include some or all of:

1. planning requirement identified;
2. scope ready / tender package ready;
3. tender issue;
4. tender return/close;
5. comparison complete;
6. award decision;
7. commitment effective;
8. technical submittal required;
9. supplier submittal received;
10. internal review complete;
11. consultant/client/design approval complete;
12. manufacturing/fabrication start;
13. manufacturing complete;
14. factory inspection/testing;
15. shipment dispatch;
16. customs/import clearance;
17. site/store delivery;
18. acceptance/GRN;
19. installation-ready/handover milestone.

Not every tracked subject uses every milestone.

The architecture needs a constrained milestone vocabulary/profile, not arbitrary user-authored workflow code.

## 7. Backward planning

Candidate lead-time components may include:
- procurement preparation;
- tender duration;
- evaluation/approval duration;
- contract finalization;
- submittal preparation;
- internal review;
- consultant/design review;
- revision allowance;
- manufacture/fabrication;
- shipping/transit;
- customs/clearance;
- local delivery;
- contingency/buffer.

From `RequiredOnSiteDate`, the system may derive latest-safe milestones backward.

Example conceptual chain:

`Required On Site`

`- delivery/transit`

`- manufacture`

`- approved submittal requirement`

`- review/revision allowance`

`- award/commitment lead`

`= latest safe tender/award actions`

Calendar/working-day policy must be explicit later.

## 8. Planned dates vs domain events

Where a milestone maps to a domain event, actual status/date derives from that event.

Examples:
- tender issued → TenderRelease actual release time;
- bids closed → TenderEvent close;
- award approved → AwardDecision time;
- commitment effective → P07A effectiveness event;
- delivery accepted → P07C GoodsReceipt accepted date.

Do not separately let a user type `Awarded = Yes` in the long-lead tracker.

Where milestone lies outside product-owned workflow:
- technical consultant approval;
- factory production;
- shipping/customs;

store referenced evidence/confirmed/forecast/actual dates without pretending the platform owns the external process.

## 9. Technical/submittal dependency

Many long-lead goods cannot manufacture until technical approval.

P10 requires a dependency reference such as:

`commitment/long-lead subject`

`→ external technical submittal/approval dependency`

with:
- reference ID/document;
- responsible party;
- planned submit date;
- planned approval date;
- actual/confirmed status/date;
- revision cycle count where available;
- blocking relationship to manufacture/release.

This does not require building a full CDE/submittal platform in V1.

## 10. Milestone status semantics

Candidate milestone statuses:
- `NOT_DUE`;
- `UPCOMING`;
- `DUE`;
- `OVERDUE`;
- `IN_PROGRESS`;
- `COMPLETE`;
- `BLOCKED`;
- `NOT_APPLICABLE`.

Prefer derived status from dates/events/dependencies.

Human-entered state may be needed for external activities but must be source-labelled.

## 11. Schedule health projection

Candidate health may compare:
- required date;
- baseline planned dates;
- current forecast/confirmed dates;
- actual progress;
- remaining modeled lead time;
- unresolved blockers.

Possible projection:
- `ON_TRACK`;
- `AT_RISK`;
- `LATE`;
- `UNKNOWN`.

Health is a projection/risk signal, not a manually owned commercial state.

The system should explain why:

> `AT_RISK because consultant approval is 8 days later than baseline and manufacturing lead remains 42 days.`

## 12. Baseline and rebaseline

A procurement schedule needs history.

Candidate plan versions:
- original/baseline plan;
- revised approved plan;
- current forecast.

Changing site programme/required date does not erase old plan.

Rebaseline requires:
- actor;
- reason/source;
- old/new required dates;
- affected milestones;
- timestamp;
- approval where company policy requires.

Actual event dates remain immutable.

## 13. Supplier confirmed dates

Supplier confirmation is distinct from forecast and actual.

Examples:
- confirmed manufacture complete date;
- confirmed vessel dispatch;
- confirmed delivery date.

Preserve:
- supplier/source;
- confirmation time;
- evidence/message;
- confirmed date;
- superseded confirmations.

Do not overwrite actual delivery when supplier changes a forecast.

## 14. Split award / split delivery

One tracked requirement may later split across:
- vendors;
- commitment lines;
- shipments;
- delivery dates.

The tracking model must support:
- parent requirement/package view;
- child allocation/vendor/commitment milestones;
- aggregate site readiness based on required scope.

Example:
- 60% cable from Vendor A arrives 1 June;
- 40% from Vendor B arrives 15 June;
- installation needs 100% by 10 June.

Parent health remains late even though one child is complete.

## 15. Partial delivery and readiness

`some delivered` is not necessarily `requirement ready`.

Readiness may depend on:
- full required quantity;
- critical subset;
- accepted quality;
- technical approval;
- accessories/components;
- installation sequence.

Use scope/quantity requirement rules to derive readiness where possible rather than a generic percent complete.

## 16. Long-lead identification

The system may flag a requirement as long-lead using:
- estimated total lead time;
- procurement-plan classification;
- required date minus current date;
- supplier/category historical lead time;
- manual commercial judgment;
- AI recommendation later.

But `LONG_LEAD=true` is classification/risk, not the lifecycle root.

Ordinary procurement should use the same underlying milestones where useful.

## 17. Relationship with project master schedule

P10 should reference rather than replace the construction schedule.

Candidate linkage:
- external schedule system/task ID;
- activity name/WBS;
- required milestone/date;
- imported schedule version/date;
- last sync;
- authority/source;
- staleness.

A master schedule change may update planning requirements through controlled rebaseline/proposal, not silently rewrite procurement history.

## 18. Task/notification derivation

Examples:
- tender must issue in 5 days;
- submittal approval overdue;
- supplier confirmed dispatch slipped;
- commitment not effective by latest safe date.

Tasks/alerts derive from plan vs domain facts.

Notification sent does not mean milestone completed.

P09 control-plane semantics apply.

## 19. Event-derived procurement schedule

Actual milestone facts should derive from P01–P09 canonical events.

This gives one procurement schedule view without a second truth ledger.

Example current row:

- planned tender issue: 1 Feb;
- actual tender issue: 3 Feb from TenderRelease;
- planned award: 20 Feb;
- actual award: 22 Feb from AwardDecision;
- planned commitment: 25 Feb;
- actual commitment effective: 28 Feb from P07A;
- supplier confirmed delivery: 10 May from supplier evidence;
- required on site: 5 May;
- health: LATE/AT_RISK derived.

## 20. Edge cases

### E01 — Package created months before MR

Required: PLANNED_REQUIREMENT can own planning dates before detailed demand exists; later demand reconciles without resetting history.

### E02 — Required-on-site date moves earlier

Required: preserve original baseline; recalculate forecast/risk and latest-safe dates under controlled rebaseline.

### E03 — Tender retendered

Required: actual first tender history remains; forecast downstream dates update from second event.

### E04 — Award changes supplier

Required: child/vendor lead-time assumptions update; prior preferred/award history remains.

### E05 — Submittal rejected twice

Required: actual revision cycles extend forecast; original planned review dates remain historical.

### E06 — Supplier confirms a date then slips it

Required: versioned confirmations; current forecast uses newest valid confirmation; old promises remain evidence.

### E07 — Partial shipment

Required: multiple shipment/delivery facts; readiness based on required scope, not first shipment.

### E08 — Goods delivered but rejected

Required: P07C accepted quantity drives readiness; physical arrival alone not complete.

### E09 — Customs delay outside supplier control

Required: external blocker/event reference + revised forecast; no need for customs-management module.

### E10 — No technical submittal required

Required: milestone = NOT_APPLICABLE; chain compresses.

### E11 — Direct purchase with no tender

Required: procurement schedule skips tender milestones and tracks commitment/delivery chain.

### E12 — Long-lead service subcontract

Required: milestones may track mobilization/approval/start rather than manufacturing/shipping; profiles remain constrained but not goods-only.

## 21. Failure patterns to reject

Fail later audit if design:
- creates a manual procurement tracker status separate from transaction truth;
- assumes every package has identical milestone chain;
- turns long-lead tracking into a second project scheduling product;
- creates full submittal/CDE ownership merely to track technical approval dependency;
- overwrites planned dates when forecast/actual changes;
- treats supplier confirmed date as actual;
- marks ready after partial/rejected delivery when required scope is incomplete;
- cannot handle package-before-MR planning;
- cannot explain why a package is at risk/late;
- requires a first-class LongLeadItem before evidence proves it is needed.

## 22. Primary audit tests later

1. What does a real contractor procurement schedule/log contain?
2. At what grain: package, material, equipment, PO line, subcontract?
3. Which milestones are manually tracked?
4. Which dates come from project schedule?
5. How are lead times estimated and updated?
6. What technical approvals block procurement/manufacture?
7. How are consultant/client delays tracked?
8. How are supplier confirmed manufacturing/delivery dates captured?
9. How are split suppliers/shipments represented?
10. What constitutes `delivered/closed`?
11. How often is schedule rebaselined?
12. Which tracker fields duplicate real RFQ/PO/submittal/GRN transactions?
13. Who owns expediting/follow-up?
14. What long-lead risks most often cause project delay?

## 23. Current disposition

### Strong enough to carry forward provisionally
- required/planned/forecast/confirmed/actual dates separate;
- backward planning from required-on-site date;
- domain-event actual milestones derived where possible;
- external technical/manufacturing/shipping milestones reference evidence without full module ownership;
- schedule health is explainable projection;
- baseline/rebaseline history preserved;
- split award/shipment supported;
- master schedule referenced, not replaced;
- tracker tasks/alerts derive from plan vs facts;
- `LongLeadItem` first-class object not presumed.

### Still unresolved
- ADR-0007 final tracking object/cardinality model;
- default milestone profiles;
- calendar/working-day calculations;
- lead-time source/historical learning depth;
- master schedule connector depth;
- submittal integration ownership;
- expediting/shipping data depth;
- package vs line tracking grain;
- default health thresholds/buffers.

## 24. Impact on ADRs

P10 supplies candidate behavior but does not close:
- ADR-0007 Long-lead tracking object model;
- ADR-0013 event-derived status;
- ADR-0021 external schedule/integration authority where linked.

Primary long-lead artifacts/cases remain required.

## 25. Next step

Integrate P01–P10 into the full provisional workflow map and identify whether any major operational process is still missing before the next internal critique boundary.