# P1.8 — Expediting and Control Observation Catalogue v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CATALOGUE CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This catalogue defines bounded planning, forecast, confirmation, actual, aging and exception observations for procurement/expediting control without creating a second lifecycle writer, CPM/master schedule, BPM engine or GRC platform.

The governing rule is:

> **A control observation describes a condition derived from authoritative facts under an explicit rule and time cut. It may request attention or support a bounded command, but it never becomes the underlying business state, milestone actual, approval or commercial effect.**

---

# 2. Controlled object boundary

P1.8 reports over existing lineage such as:

- requirement/allocation;
- ProcurementPackage where used;
- tender/RFQ;
- supplier response;
- recommendation/approval/AwardDecision;
- Commitment/component/deliverable where P07 active;
- technical/evidence/submittal identities where frozen upstream;
- external authoritative milestone/shipment observations where configured.

It does not create a universal independent `TrackedItem`, master schedule activity or generic control case root.

---

# 3. Milestone truth families

Every milestone report names:

- milestone identity/type/version;
- subject/lineage;
- REQUIRED / PLANNED / FORECAST / CONFIRMED / ACTUAL;
- actual family where ACTUAL;
- source/authority;
- time/calendar;
- current/as-of/history perspective;
- quality/freshness/evidence.

A generic milestone date is invalid.

---

# 4. Planning and forecast metrics

## CTL-001 — planned milestone position

Class: `DISTRIBUTION` / date projection  
Source: named plan version.

## CTL-002 — current forecast milestone position

Class: `FORECAST_PROJECTION`  
Preserves forecast-as-of/method/version.

## CTL-003 — confirmed milestone position

Class: `DISTRIBUTION` / point position  
Source principal/confirmation occurrence explicit.

## CTL-004 — actual milestone position

Class: `DISTRIBUTION` / actual date  
Actual family/source explicit.

## CTL-005 — forecast revision count

Class: `COUNT` at forecast-version grain.

## CTL-006 — forecast volatility

Class: `STATISTICAL_SUMMARY` / `VARIANCE` under explicit method.

Not accepted as supplier performance or causal reliability automatically.

---

# 5. Milestone variance metrics

Separate MetricKeys for:

- `FORECAST_MINUS_PLANNED`;
- `CONFIRMED_MINUS_PLANNED`;
- `ACTUAL_MINUS_PLANNED`;
- `ACTUAL_MINUS_FORECAST_AS_OF_SELECTED_CUT`;
- `ACTUAL_MINUS_CONFIRMED`.

Each binds direction, calendar, baseline version and missing/open treatment.

Current forecast cannot be used retrospectively as the forecast that existed before actual unless the forecast-as-of version is selected.

---

# 6. Aging/control metrics

## CTL-010 — open requirement aging

Trigger/resolution exact.

## CTL-011 — sourcing-start aging

## CTL-012 — RFQ response aging

## CTL-013 — normalization ambiguity aging

## CTL-014 — recommendation approval aging

## CTL-015 — award-to-handoff aging

## CTL-016 — evidence deficiency aging

## CTL-017 — reconciliation aging

## CTL-018 — effect-indeterminacy aging

## CTL-019 — external-source staleness age

Each is a separate MetricKey and cannot share one generic “days overdue” formula unless exact triggers/calendars/holds are identical.

---

# 7. Control observation classes

Every observation has exactly one primary class:

## `TIME_THRESHOLD_BREACH`

A duration/aging threshold under versioned rule is exceeded.

## `MISSING_REQUIRED_EVIDENCE`

A required evidence binding/member is absent or deficient.

## `INCOMPLETE_POPULATION`

Expected population/coverage is partial or unknown.

## `STALE_EXTERNAL_SOURCE`

Required external source exceeds freshness rule.

## `RECONCILIATION_EXCEPTION`

Typed mismatch/divergence/conflict requires attention.

## `EFFECT_UNCERTAINTY`

Operation/effect is `EFFECT_INDETERMINATE`, partial or unresolved variance.

## `AUTHORITY_OR_ACCESS_EXCEPTION`

Action/result lacks required authority/context or is restricted.

## `IDENTITY_OR_MAPPING_EXCEPTION`

Unresolved/ambiguous identity, mapping or duplicate.

## `CONFIGURATION_OR_DEFINITION_EXCEPTION`

Required policy/calendar/metric/projection definition is missing, invalid, deprecated or incompatible.

## `DEPENDENCY_OR_SEQUENCE_EXCEPTION`

Declared prerequisite/sequence condition is not satisfied.

## `DATA_QUALITY_EXCEPTION`

Blocking partial/stale/mixed/migration/evidence limitation.

## `BUSINESS_RULE_REJECTION_OBSERVATION`

A bounded command was rejected under owning-domain rules.

This reports the rejection; it does not create a new workflow state.

---

# 8. `ControlObservationDefinition`

Every control observation binds:

- stable key/version;
- purpose and allowed use;
- source facts/events/metrics;
- predicate/calculation;
- subject/grain;
- trigger/as-of/time/calendar;
- threshold/policy/config version;
- severity classification rules;
- evidence/quality prerequisites;
- suppression/duplication rule;
- open/resolved/accepted-variance projection behavior;
- owning domain/team for attention, not business authority;
- permitted bounded next operations;
- explicit non-meaning;
- access/sensitivity/residency;
- restatement/history behavior.

No tenant-authored arbitrary rule scripts.

---

# 9. Observation lifecycle projection

Control observation lifecycle is a projection over source facts:

- `OBSERVED_OPEN`;
- `OBSERVED_ACKNOWLEDGED`;
- `OBSERVED_UNDER_REVIEW`;
- `OBSERVED_RESOLVED_BY_SOURCE_FACT`;
- `OBSERVED_ACCEPTED_VARIANCE`;
- `OBSERVED_SUPERSEDED`;
- `OBSERVED_FALSE_POSITIVE_CORRECTED`;
- `OBSERVED_UNKNOWN_BLOCKED`.

Acknowledging or assigning an observation does not change the underlying business fact.

Resolution requires:

- source/domain fact that clears predicate;
- corrected definition/data;
- explicit accepted variance under authorized control basis;
- or supersession.

Manual “close” cannot assert the source issue disappeared.

---

# 10. Severity and priority

Severity is a deterministic classification based on explicit dimensions such as:

- decision criticality;
- amount/quantity exposure;
- duration beyond threshold;
- required-evidence impact;
- authority/security impact;
- effect certainty;
- population affected;
- contractual/control rule.

Severity is not domain authority, supplier performance or causal proof.

No universal risk score is accepted.

---

# 11. Escalation boundary

P1.8 may report:

- threshold reached;
- observation age;
- owner/attention queue;
- unassigned-control breach;
- notification/escalation occurrence;
- unresolved count/exposure.

P1.8 does not create a general escalation workflow engine.

Any notification/assignment/acknowledgment uses bounded control primitives and P1.7 operations; any business effect uses owning-domain command.

---

# 12. Long-lead and expediting views

Long-lead reporting is a projection across existing anchored milestones.

Candidate metrics:

- CTL-030 milestones by planned/forecast/confirmed/actual state;
- CTL-031 milestones due within window;
- CTL-032 overdue milestone observations;
- CTL-033 forecast slippage distribution;
- CTL-034 actual-versus-planned variance;
- CTL-035 missing confirmation count;
- CTL-036 stale external shipment/milestone count;
- CTL-037 evidence-deficient milestone count;
- CTL-038 unresolved dependency count;
- CTL-039 subject exposure linked to delayed milestone where exact lineage exists.

No independent CPM critical-path calculation, float, resource leveling or master-program ownership is introduced.

---

# 13. External milestone/shipment observations

External facts preserve:

- authoritative source/profile;
- source object/version;
- source/effective/observed times;
- freshness/conformance;
- identity mapping;
- evidence/materialization;
- conflict/reconciliation;
- current/history limitations.

A provider status label is not automatically mapped to product actual without accepted deterministic mapping/domain treatment.

---

# 14. Effect uncertainty controls

For `EFFECT_INDETERMINATE`:

- observation remains open until positive resolution or accepted unresolved variance;
- ordinary retry/rebind/cancel restrictions remain P1.7-controlled;
- age and reconciliation attempts are visible;
- confirmed and indeterminate exposure are separate;
- accepted unresolved variance closes the control obligation but not effect certainty;
- no control operator may relabel it no-effect.

---

# 15. Evidence and communication controls

Candidate observations include:

- missing exact issued artifact;
- incomplete issued member set;
- dispatch/delivery/acknowledgment gap;
- missing response/source attachment;
- reconstruction-anchor failure;
- evidence retention/disposition limitation;
- reliance binding deficiency.

These remain evidence/control observations and never automatically reverse or retime established domain effects.

---

# 16. No-connector profile

A0–A3 control observations operate from product-owned facts and manually captured evidence.

No ERP/CDE/email connector, external broker, chat or AI is required.

Where an optional connector is inactive:

- connector-dependent observations are not applicable/unsupported or use manual capture;
- absence of connector data is not interpreted as zero/no issue;
- useful internal sourcing aging/evidence/control reporting remains complete.

---

# 17. Prohibitions

- no control observation writes lifecycle/commercial truth;
- no manual dashboard close as source resolution;
- no generic overdue status across incompatible triggers;
- no alert color as semantic state;
- no critical-path/CPM platform;
- no general GRC case system;
- no arbitrary rule engine;
- no supplier risk/reputation inference from exception count alone;
- no external provider status as product actual without mapping/authority;
- no accepted variance as proof no effect occurred;
- no AI alert becoming command without authorization.

---

# 18. Hostile scenarios

Test at minimum:

1. planned date changes;
2. forecast changes repeatedly;
3. confirmation retracted;
4. actual arrives late;
5. external status stale;
6. provider label mapping changes;
7. hold pauses one aging metric but not another;
8. threshold/calendar changes;
9. dashboard color changed manually;
10. user acknowledges alert;
11. source issue remains after acknowledgment;
12. operator closes alert without source fact;
13. accepted variance with unresolved effect;
14. indeterminate effect ages for months;
15. unassigned observation;
16. missing evidence later disposed;
17. established domain effect evidence corrected;
18. partial population;
19. cross-project different calendars;
20. one supplier has many exceptions;
21. exception count used as reputation score;
22. AI claims cause from delay correlation;
23. workflow rejected command;
24. report treats rejection as business failure state;
25. connector inactive;
26. no connector first tender;
27. external shipment source unavailable;
28. current dashboard uses stale milestone;
29. long-lead view attempts critical-path logic;
30. team builds generic case management around observations.

---

# 19. Exit condition

This catalogue may enter the integrated P1.8 candidate when every control observation is deterministic, source-linked, time/quality-qualified, unable to write business truth and unable to expand into CPM, BPM or GRC gravity.
