# P1.8 — Portfolio and Cross-Project Aggregation Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines when and how tenant, legal-entity, portfolio, project, package, supplier and commercial results may be aggregated without double counting, authority leakage, currency/time distortion or false comparability.

The governing rule is:

> **Aggregation is a governed projection over canonical contribution identities and comparable semantic members. Shared display dimensions never create duplicate contributions, and values that are not comparable remain segmented, limited or blocked rather than forced into one portfolio total.**

---

# 2. Scope hierarchy

Every aggregate binds exact scope identities and hierarchy version:

- tenant;
- legal entity / contracting organization;
- portfolio/program grouping where configured;
- project;
- ContractingAuthorityContext;
- requirement/allocation;
- optional package;
- tender/award/Commitment/component/obligation;
- supplier relationship;
- external source/profile;
- reporting currency/calendar.

A project belongs to one tenant. Portfolio grouping is a reporting/configuration relation, not a new business-truth owner.

---

# 3. Contribution identity

Every additive/semi-additive metric defines a canonical `ContributionKey` at the source grain.

The key must survive:

- multiple report dimensions;
- package/project/portfolio rollups;
- source corrections/reclassifications;
- identity mapping correction;
- currency translation;
- report restatement.

One contribution may appear in multiple non-additive drill paths but contributes once to any additive result.

Dimension membership is not contribution identity.

---

# 4. Aggregation behavior classes

Every metric declares one:

## `FULLY_ADDITIVE`

May sum across permitted dimensions and time under exact semantic compatibility.

## `TIME_SEMI_ADDITIVE`

May aggregate across entity dimensions but not sum across time; point-in-time balances require one cut.

## `DIMENSION_SEMI_ADDITIVE`

May aggregate across some dimensions only; declared prohibited dimensions remain segmented.

## `NON_ADDITIVE`

Ratios, rates, averages, percentiles, classifications and indices must be recomputed from governed contributions/populations rather than summed or averaged blindly.

## `DISTINCT_RECOMPUTE`

Distinct counts require recomputation under exact identity key at target scope.

## `BLOCKED_AGGREGATION`

Semantic comparability is insufficient for the requested scope.

No implementation infers aggregation behavior from numeric data type.

---

# 5. Comparability dimensions

Members are comparable only when accepted rules align or explicitly normalize:

- MetricDefinitionVersion;
- source authority/truth family;
- actual/status family;
- contribution grain;
- population/denominator;
- time basis/cut/window;
- currency/FX purpose;
- unit/measurement basis;
- calendar/timezone;
- valuation/calculation policy;
- scope/category/capability profile where material;
- quality/completeness threshold;
- migration/evidence limitation;
- hierarchy/identity mapping version;
- access/disclosure policy.

A metric must define which mismatches:

- block;
- segment;
- normalize under an accepted versioned policy;
- permit limited comparison with disclosure.

---

# 6. Currency aggregation

Cross-currency totals require:

- one declared reporting currency;
- one exact FX purpose;
- source/rate/fixing date/version per contribution;
- conversion stage;
- rounding policy;
- native-value retention;
- conversion quality/limitation;
- restatement rule when FX policy/source changes.

Prohibited:

- latest spot rate default;
- mixing contractual/reporting/accounting/tax FX purposes;
- summing native and translated values;
- converting only aggregate totals when contribution-level conversion is required;
- comparing totals without disclosing reporting currency and FX basis.

---

# 7. Time and cut aggregation

Point-in-time positions require one accepted cut.

A portfolio result may be:

- `CONSISTENT_AS_OF_CUT`;
- `CAUSALLY_BOUND_RESULT_SET`;
- `NON_ATOMIC_MIXED_OBSERVATION` with component cuts;
- blocked.

Mixed-time values cannot be labelled one current total where the declared use requires simultaneity.

Period flows require compatible period boundaries/time basis.

Rolling/cohort/duration metrics require target-scope recomputation, not simple sum/average unless explicitly valid.

---

# 8. Actual-family aggregation

Only like actual families may aggregate within one MetricKey.

Separate portfolio positions for:

- physical actual;
- product commercial/certified actual;
- external accounting-posted actual;
- paid cash actual;
- other explicitly accepted actual families.

No portfolio “total actual” may select latest available family per project or sum different families.

Cross-family views are comparison/reconciliation reports, not one aggregate.

---

# 9. Hierarchy and lineage anti-double-count

## Requirement/allocation/package

A RequirementAllocation contribution may relate to an optional package and project but contributes once.

Package is a grouping dimension, not an additional value.

## Award/Commitment

AwardDecision value and effective Commitment value are separate metrics and cannot be added.

## Commitment/effect subject

Component and obligation effects follow exact P07 contribution rules; one economic value cannot appear twice through both grains.

## Supplier

One supplier relationship may have many responses/revisions; distinct counts use the target identity/population rule.

## External systems

Product fact and mirrored/reference external representation are not two contributions.

## Currency

Native and translated representation are one economic contribution in different currencies.

---

# 10. Split and proportional attribution

Where one source contribution legitimately spans multiple reporting dimensions, the MetricDefinition must declare:

- whether allocation is allowed;
- allocation basis/version;
- conservation rule;
- rounding residual treatment;
- effective period;
- correction/reclassification behavior;
- unallocated/suspense position;
- evidence/authority.

No report engine may invent proportional allocation for presentation convenience.

Allocated parts plus residual must conserve the source contribution under the governing monetary/quantity policy.

---

# 11. Ratios, rates and statistics

Portfolio ratio/rate is recomputed from target-scope numerator and denominator unless the metric explicitly defines weighted combination.

Prohibited:

- average of project response rates without correct weights/populations;
- sum of percentages;
- average of averages without contribution/sample basis;
- portfolio percentile from project percentiles;
- comparing durations with different triggers/calendars;
- merging unknown populations into denominator.

Statistical summaries disclose sample size, distribution limitations and project/category composition.

---

# 12. Supplier aggregation

Supplier reporting remains tenant-private.

Within a tenant, cross-project supplier aggregation requires:

- same tenant-private relationship or governed relationship grouping;
- identity mapping/version;
- compatible performance dimension;
- category/scope comparability;
- opportunity population;
- project/calendar/time normalization;
- evidence/access controls;
- no cross-tenant data or learned influence.

One technical authentication identity never automatically merges business relationships.

---

# 13. Quality aggregation

Aggregate quality is derived under `QualityAggregationPolicy` and exposes:

- contribution/population counts/amounts by quality;
- stale/partial/mixed/migration/evidence/reconciliation/indeterminate portions;
- blocking components;
- comparability limitations;
- component cuts.

A material incomplete project cannot disappear inside a larger complete portfolio.

No aggregate becomes complete merely because most value is complete unless the metric/use policy explicitly permits and quantifies the incomplete remainder.

---

# 14. Access and inference

Aggregation does not automatically grant source access.

Safe aggregate disclosure requires explicit policy covering:

- minimum population;
- confidentiality/supplier bid sensitivity;
- restricted project/entity data;
- inference/re-identification risk;
- drill-through permissions;
- external-party access;
- export/residency.

Cross-tenant aggregation is prohibited by default even when anonymized-looking.

A user cannot infer hidden project/supplier values through subtraction, filtering or small populations.

---

# 15. Hierarchy/version correction

Changes to:

- project/portfolio grouping;
- legal entity mapping;
- supplier identity;
- cost/attribution hierarchy;
- requirement/package/Commitment lineage;
- currency/FX policy;
- calendar;
- MetricDefinition;

require explicit projection impact assessment and new execution/restatement where material.

Prior issued reports retain original hierarchy/version context.

No historical effect silently moves to a new project/supplier/portfolio.

---

# 16. Portfolio report classes

Candidate classes:

- `PORTFOLIO_CURRENT_POSITION`;
- `PORTFOLIO_PERIOD_FLOW`;
- `PORTFOLIO_PIPELINE_DISTRIBUTION`;
- `PORTFOLIO_CONTROL_EXCEPTION_SUMMARY`;
- `PORTFOLIO_RECONCILIATION_POSITION`;
- `PORTFOLIO_QUALITY_COVERAGE`;
- `PORTFOLIO_SUPPLIER_DIMENSION_SUMMARY` tenant-private;
- `PORTFOLIO_MIXED_TIME_MONITORING` limited;
- `CROSS_PROJECT_COMPARATIVE_ANALYSIS` with explicit comparability set.

A class does not authorize a data warehouse or portfolio-management domain.

---

# 17. No-connector behavior

Portfolio reporting may aggregate product-owned A0–A3 facts with no connectors.

Connector-dependent external accounting/CDE/payment metrics:

- remain not applicable/unsupported;
- use manual/structured-file observations where accepted;
- or show source unavailable/limited.

Missing connectors never create zero external positions.

---

# 18. Prohibitions

- no entity/project duplication of one contribution;
- no package plus allocation double count;
- no award plus Commitment total;
- no certified plus posted plus paid “actual”;
- no average of ratios without declared weighting;
- no latest-rate FX;
- no mixed-time current total;
- no cross-tenant benchmark/reputation;
- no hierarchy reassignment rewriting historical reports;
- no restricted-data inference;
- no reporting allocation invented by dashboard;
- no warehouse copy as authority;
- no universal portfolio object/domain.

---

# 19. Hostile scenarios

Test at minimum:

1. one allocation belongs to package and project;
2. one Commitment component appears in multiple views;
3. award and Commitment both present;
4. original and replacement effect present;
5. product and ERP representation both present;
6. native and translated currency both present;
7. AED and USD projects;
8. contractual and reporting FX differ;
9. projects have different as-of cuts;
10. one feed stale;
11. point balances summed across months;
12. project response rates averaged equally;
13. portfolio percentile built from project percentiles;
14. distinct supplier count with shared identity;
15. identity mapping corrected;
16. supplier operates in unrelated categories;
17. one project migration-limited;
18. one project effect-indeterminate;
19. incomplete project hidden by large complete project;
20. restricted project omitted from user view;
21. user infers restricted value by subtraction;
22. small supplier population disclosed externally;
23. hierarchy changes after issued report;
24. project moved between portfolios;
25. legal entity mapping corrected;
26. allocation proportions do not conserve value;
27. rounding residual lost;
28. missing connector treated as zero;
29. cross-tenant benchmark requested;
30. portfolio dashboard becomes planning/warehouse platform.

---

# 20. Candidate ADR impact

Supports future ADR-0037:

> Adopt contribution-identity and comparability-controlled aggregation: every metric declares additivity behavior; portfolio results preserve exact hierarchy, source, time, actual family, currency/FX, quality and access basis; incompatible values are segmented, limited or blocked; and cross-tenant aggregation/learned influence remains OUT by default.

No ADR status changes now.

---

# 21. Exit condition

This contract may enter the integrated P1.8 candidate when all portfolio/cross-project aggregates can prove contribution conservation, semantic comparability, quality/access safety and no double count without creating a warehouse/portfolio second truth owner.
