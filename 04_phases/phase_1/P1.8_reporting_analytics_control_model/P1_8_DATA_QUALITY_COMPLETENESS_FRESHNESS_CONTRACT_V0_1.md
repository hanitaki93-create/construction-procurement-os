# P1.8 — Data Quality, Completeness, Freshness and Limitation Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines how every P1.8 metric, projection, report, export and later chat answer represents completeness, freshness, comparability, evidence, migration, conflict, reconciliation and effect uncertainty.

The governing rule is:

> **A numerically correct value is not a truthful reporting result unless its population, source cut, freshness, authority, evidence and unresolved limitations are also represented. Missing, stale, partial, conflicted or indeterminate data never becomes complete truth through aggregation or presentation.**

---

# 2. Core distinctions

- zero ≠ missing;
- missing ≠ unknown;
- unknown ≠ unavailable;
- unavailable ≠ restricted;
- not applicable ≠ unsupported;
- partial known ≠ partial unknown;
- stale ≠ current;
- mixed time ≠ simultaneous snapshot;
- migrated reference ≠ native authoritative fact;
- evidence limited ≠ false;
- reconciliation open ≠ incorrect automatically;
- indeterminate effect ≠ no effect;
- quality score ≠ business truth;
- quality warning ≠ business-state transition;
- component quality ≠ aggregate quality automatically.

---

# 3. Quality dimensions

Every load-bearing result evaluates distinct dimensions:

1. `POPULATION_COMPLETENESS`;
2. `SOURCE_AVAILABILITY`;
3. `SOURCE_FRESHNESS`;
4. `SOURCE_AUTHORITY_CONFORMANCE`;
5. `IDENTITY_RESOLUTION`;
6. `TEMPORAL_CONSISTENCY`;
7. `EVIDENCE_RECONSTRUCTABILITY`;
8. `MIGRATION_PROVENANCE`;
9. `RECONCILIATION_STATE`;
10. `EFFECT_CERTAINTY`;
11. `CALCULATION_CONFORMANCE`;
12. `ACCESS_DISCLOSURE_COMPLETENESS`;
13. `COMPARABILITY`.

A single opaque data-quality score may not replace these dimensions.

---

# 4. Closed result-quality classes

A result has one primary `ResultQualityClass` plus zero or more typed limitations.

## `COMPLETE`

Declared population and required source basis are complete for the stated use, current enough under the definition, authority-conforming, temporally compatible and free of blocking unresolved limitations.

`COMPLETE` does not mean source facts are substantively correct beyond their authority/evidence basis.

## `PARTIAL_KNOWN`

Known missing members/sources are enumerated or bounded and their effect is disclosed.

## `PARTIAL_UNKNOWN`

The extent of missing population/source data cannot be bounded reliably.

## `STALE`

One or more required external/derived sources exceed the bound freshness rule.

## `MIXED_TIME`

Components are based on different cuts/times and no accepted simultaneous cut exists.

## `MIGRATION_LIMITED`

One or more contributions originate from reference-only, evidence-limited or otherwise qualified migrated history.

## `EVIDENCE_LIMITED`

Value calculation may exist, but required source/reconstruction evidence is incomplete, disposed, unavailable or below the declared decision-use standard.

## `EXTERNAL_SOURCE_UNAVAILABLE`

A required external source is unavailable or disconnected at execution.

## `RECONCILIATION_OPEN`

A value/identity/authority/version conflict or expected divergence remains unresolved.

## `EFFECT_INDETERMINATE_INCLUDED`

The result includes explicitly bounded indeterminate effects under the metric policy.

## `EFFECT_INDETERMINATE_EXCLUDED`

Indeterminate effects are excluded and separately disclosed/quantified where possible.

## `UNKNOWN_QUARANTINED`

Required contributions/observations are quarantined or unclassified such that the result’s meaning is materially unresolved.

## `NOT_APPLICABLE`

The metric is valid but does not apply to the subject/population.

## `UNSUPPORTED`

The product/metric version does not support the requested semantic case.

## `BLOCKED`

The result must not be produced for the declared use because one or more blocking conditions apply.

---

# 5. Value-state contract

Every value position uses one:

- `PRESENT`;
- `ZERO_CONFIRMED`;
- `MISSING_EXPECTED`;
- `UNKNOWN_UNRESOLVED`;
- `NOT_APPLICABLE`;
- `UNSUPPORTED`;
- `SOURCE_UNAVAILABLE`;
- `RESTRICTED`;
- `QUARANTINED`;
- `BLOCKED`.

`ZERO_CONFIRMED` requires a complete eligible population and authoritative evidence that the value is zero.

No calculation may coalesce the other states to zero unless the metric definition explicitly proves that mapping is semantically correct for that exact source field.

---

# 6. Population completeness

A population-completeness assessment binds:

- `PopulationDefinitionVersion`;
- expected population derivation;
- actual resolved population;
- known exclusions;
- missing expected members;
- unknown population gaps;
- pagination/cursor completion;
- source coverage by system/profile;
- duplicate/superseded handling;
- late-arrival window;
- access-filter impact;
- assessment time/source cut.

A query returning every visible row is not complete unless the eligible population is proven complete.

## Completeness outcomes

- `POPULATION_COMPLETE`;
- `POPULATION_PARTIAL_KNOWN`;
- `POPULATION_PARTIAL_UNKNOWN`;
- `POPULATION_NOT_APPLICABLE`;
- `POPULATION_UNSUPPORTED`;
- `POPULATION_BLOCKED`.

---

# 7. Pagination and result truncation

Every paginated, capped, sampled or truncated result states:

- page/member count;
- total-count reliability;
- cursor/continuation status;
- whether all pages were consumed;
- truncation/sample rule;
- effect on population/denominator/completeness;
- whether aggregation occurred before or after truncation.

Chat, UI and exports cannot say “all,” “total,” “complete coverage” or “top/bottom population” from an incomplete page unless the metric/query semantics independently prove completeness.

---

# 8. Freshness contract

A required external or materialized source binds:

- source/profile/version;
- last source-effective time where available;
- last observed/fetched time;
- last successful complete synchronization/build;
- current connector/conformance state;
- freshness threshold/version;
- grace/degradation rule;
- source outage/gap history;
- current freshness outcome.

Freshness outcomes:

- `FRESH`;
- `AGING_WITHIN_THRESHOLD`;
- `STALE`;
- `UNKNOWN_FRESHNESS`;
- `SOURCE_UNAVAILABLE`;
- `RESYNC_REQUIRED`;
- `CONFORMANCE_LIMITED`.

Render time never substitutes for freshness time.

---

# 9. Mixed-time and consistency cuts

A multi-source/multi-resource result declares:

- `ATOMIC_DOMAIN_SNAPSHOT`;
- `CONSISTENT_AS_OF_CUT`;
- `CAUSALLY_BOUND_RESULT_SET`;
- `NON_ATOMIC_MIXED_OBSERVATION`.

For mixed observation, preserve component cuts and maximum/actual skew.

The metric/report definition declares whether mixed-time data:

- blocks the result;
- permits segmented presentation;
- permits limited aggregation with disclosure;
- is acceptable for non-load-bearing monitoring only.

A portfolio dashboard cannot present mixed-time values as one current total merely because it can add them.

---

# 10. Authority and conformance quality

For each source contribution preserve:

- OWN/MIRROR/REFERENCE/OUT;
- authoritative source/writer;
- source version/profile;
- connector conformance status where external;
- authority conflict;
- current/frozen governing version.

Authority outcomes:

- `AUTHORITY_CONFORMING`;
- `AUTHORITY_REFERENCE_ONLY`;
- `AUTHORITY_CONFLICT`;
- `AUTHORITY_UNKNOWN`;
- `CONNECTOR_CONFORMANCE_LIMITED`;
- `SOURCE_OUT_OF_SCOPE`.

A value from a technically healthy connector may still be authority-conflicted or reference-only.

---

# 11. Evidence quality

Evidence/reconstruction outcomes:

- `EXACT_RELIANCE_RECONSTRUCTABLE`;
- `ANCHOR_RECONSTRUCTABLE`;
- `LOCAL_CAPTURE_RECONSTRUCTABLE`;
- `VALUE_REPRODUCIBLE_EVIDENCE_LIMITED`;
- `SNAPSHOT_VERIFIABLE_NOT_RECALCULABLE`;
- `LINEAGE_ONLY_LIMITED`;
- `EVIDENCE_UNAVAILABLE`;
- `RECONSTRUCTION_BLOCKED`.

Evidence disposition/restriction may reduce future reconstruction quality but cannot mutate the prior value or silently preserve the stronger old quality label.

---

# 12. Migration quality

Each migrated contribution carries:

- migration class/run/item/profile;
- source identity/version;
- native versus reference-only treatment;
- provenance limitations;
- identity confidence/resolution;
- accepted transformation;
- unsupported/missing fields;
- correction/remediation lineage.

Migration outcomes:

- `NATIVE_ACCEPTED`;
- `REFERENCE_ONLY`;
- `EVIDENCE_LIMITED`;
- `PROPOSAL_STAGING`;
- `QUARANTINED`;
- `EXCLUDED`;
- `UNSUPPORTED`.

Ambiguous legacy `actual` never becomes a named actual family without evidence and owning-domain acceptance.

---

# 13. Reconciliation and conflict

Reconciliation states include:

- `MATCH_CONFIRMED`;
- `EXPECTED_SEMANTIC_DIVERGENCE`;
- `TIMING_LAG`;
- `STALE_SOURCE`;
- `VALUE_CONFLICT`;
- `AUTHORITY_CONFLICT`;
- `IDENTITY_CONFLICT`;
- `VERSION_CONFLICT`;
- `MISSING_PRODUCT_FACT`;
- `MISSING_EXTERNAL_FACT`;
- `EVIDENCE_DEFICIENCY`;
- `CORRECTION_NOT_PROPAGATED`;
- `DUPLICATE_REPLAY`;
- `UNRESOLVED_EXTERNAL_POSITION`;
- `UNKNOWN_QUARANTINED`.

Reconciliation never means forced equality.

A report may show product and external positions side by side with the reconciliation state; it cannot silently choose one based on convenience.

---

# 14. Effect certainty

Effect-certainty outcomes:

- `NO_EFFECT_PROVEN`;
- `EXTERNAL_EFFECT_CONFIRMED`;
- `DOMAIN_EFFECT_CONFIRMED`;
- `EFFECT_INDETERMINATE`;
- `PARTIAL_EFFECT`;
- `UNRESOLVED_VARIANCE_ACCEPTED`.

`UNRESOLVED_VARIANCE_ACCEPTED` closes an operational reconciliation obligation but does not assert no effect or confirmed effect.

Metric policy must define whether each state is:

- included as confirmed;
- separately quantified;
- represented as range/exposure;
- excluded with disclosure;
- blocking.

---

# 15. Result-quality derivation

A metric result’s primary quality is derived from its component dimensions under a versioned `QualityAggregationPolicy`.

The policy defines:

- blocking conditions;
- severity ordering;
- whether multiple primary limitations are surfaced;
- dimensional summaries;
- contribution counts/amounts by quality;
- propagation from component to aggregate;
- minimum complete/fresh population threshold;
- permitted decision uses by quality state.

No generic “worst flag wins” or numeric quality score is assumed.

An aggregate cannot become `COMPLETE` if a material component is partial, stale, conflicted or indeterminate under the metric’s declared use.

---

# 16. Decision-use classes

Every load-bearing metric declares one or more allowed uses:

- `INFORMATIONAL_MONITORING`;
- `OPERATIONAL_CONTROL`;
- `MANAGEMENT_REVIEW`;
- `COMMERCIAL_DECISION_SUPPORT`;
- `GOVERNED_APPROVAL_SUPPORT`;
- `EXTERNAL_ISSUED_REPORT`;
- `AUDIT_RECONSTRUCTION`.

Quality thresholds may differ by use.

A metric acceptable for informational monitoring may be blocked for approval or external issue.

Quality state never grants domain authority.

---

# 17. Access-filtered completeness

A user may see a complete result for their authorized scope while lacking access to underlying details.

The result must distinguish:

- source population complete under system authority;
- visible/drillable population under user access;
- suppression/aggregation policy;
- whether restrictions affect interpretation.

A result cannot infer “no data” when rows exist but are restricted.

Cross-tenant absence inference remains prohibited.

---

# 18. Quality change and restatement

Quality may change because:

- late data arrives;
- source refresh succeeds/fails;
- connector conformance changes;
- migration is remediated;
- evidence is disposed/restricted;
- identity/reconciliation resolves;
- indeterminate effect resolves;
- quality threshold/definition changes.

Each change creates a new execution/result or controlled restatement under the projection contract.

Prior issued snapshots retain their original quality state and may receive a linked correction/restatement/limitation notice; they are not silently relabelled.

---

# 19. Presentation requirements

Every load-bearing output exposes machine-readable:

- primary quality class;
- dimensional quality states;
- limitation codes;
- as-of/source freshness;
- missing/unknown counts or value exposure where permitted;
- indeterminate-effect treatment;
- migration/evidence/reconciliation state;
- definition/source-cut identity.

Human presentation must not rely solely on color, icon or tooltip.

A green visual cannot suppress a material stale or partial limitation.

---

# 20. Chat and AI boundary

Chat/AI must:

- state partial/stale/mixed/limited status;
- avoid “all,” “none,” “current,” “complete” or “accurate” unless supported;
- distinguish unavailable from zero;
- cite metric/result/source-cut/quality lineage;
- abstain where decision-use quality is blocked;
- never invent missing values;
- never convert quality/confidence into business authority.

Natural-language brevity cannot remove material limitations.

---

# 21. Activation tests

A quality contract/result cannot activate unless:

1. eligible population completeness is testable;
2. pagination/truncation behavior is explicit;
3. source freshness is versioned;
4. authority/conformance is preserved;
5. temporal consistency cut is declared;
6. evidence/reconstruction state is defined;
7. migration state is defined;
8. reconciliation/conflict state is defined;
9. effect certainty is defined;
10. zero/missing/unknown/unavailable/restricted are distinct;
11. aggregate propagation is explicit;
12. decision-use thresholds are explicit;
13. access filtering cannot masquerade as absence;
14. quality changes create new result/restatement lineage;
15. machine/human disclosure is mandatory;
16. no opaque quality score substitutes for dimensions;
17. no quality flag writes domain state;
18. product code remains locked.

---

# 22. Hostile scenarios

Test at minimum:

1. only first page of supplier responses loaded;
2. provider total count is approximate;
3. unknown suppliers are excluded from denominator;
4. connector is healthy but feed is two days stale;
5. source refresh succeeded partially;
6. dashboard rendered now from old cache;
7. one project current, another stale;
8. portfolio result has mixed cuts;
9. external source unavailable;
10. access restrictions hide rows;
11. hidden rows are inferred absent;
12. missing payment value becomes zero;
13. ambiguous legacy actual is migrated;
14. evidence payload disposed after issue;
15. provider historical version unavailable;
16. identity conflict affects aggregation;
17. mapping correction resolves conflict;
18. product and ERP positions differ by expected semantics;
19. timing lag becomes value conflict;
20. indeterminate effect included in exposure;
21. indeterminate effect excluded without disclosure;
22. unresolved variance accepted operationally;
23. partial batch has mixed effect states;
24. quality threshold changes;
25. stale result previously issued;
26. later refresh improves quality;
27. complete metric depends on unsupported source family;
28. metric is complete only for visible user scope;
29. chat says “no unpaid items” when payment source unavailable;
30. AI fills missing values from pattern;
31. green status hides evidence limitation;
32. migration remediation changes totals;
33. connector conformance later fails;
34. current source link replaced;
35. report claims complete coverage from sampled data;
36. a quality score averages away blocking conflict.

---

# 23. Candidate ADR impact

Supports future ADR-0036:

> Adopt multi-dimensional result-quality semantics in which completeness, freshness, authority, temporal consistency, evidence, migration, reconciliation and effect certainty remain explicit; missing/stale/partial/mixed/indeterminate data cannot become complete through aggregation; and issued-result quality changes only through explicit new execution/restatement lineage.

No ADR status changes now.

---

# 24. Exit condition

This candidate may proceed into named catalogues when every catalogue metric can carry the closed quality dimensions and cannot present stale, partial, migrated, conflicted or indeterminate data as complete current truth.
