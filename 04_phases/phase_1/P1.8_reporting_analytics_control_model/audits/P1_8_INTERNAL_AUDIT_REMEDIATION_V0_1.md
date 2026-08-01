# P1.8 — Internal Audit Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Remediates:** BL-P18-01, BL-P18-02, BL-P18-03 and watches W-P18-01–W-P18-05  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

This remediation closes the contribution-identity, quality-use and report-use composition gaps found by the first internal hostile audit without changing upstream domain/evidence/integration meaning or expanding P1.8 into a BI, formula, workflow or GRC platform.

---

# 2. Contribution identity model — BL-P18-01

P1.8 freezes four distinct identities.

## 2.1 `ContributionOccurrenceId`

Immutable identity of one source fact/event/effect occurrence as considered by a metric execution.

Examples:

- original Commitment effect;
- reversal effect;
- replacement effect;
- reclassification debit/credit occurrence;
- one supplier response revision occurrence;
- one payment observation occurrence.

Every occurrence remains individually traceable and is never deduplicated merely because it belongs to the same lineage.

## 2.2 `EconomicContributionLineageKey`

Stable lineage connecting occurrences that represent correction, reversal, replacement, supersession or reclassification of the same governed reporting subject/position.

The lineage key is not a contribution to be summed or deduplicated by itself.

It supports:

- history navigation;
- current-position resolution;
- correction/restatement impact;
- duplicate detection versus legitimate correction;
- audit explanation.

## 2.3 `ConservationGroupKey`

Stable group used where a correction/reclassification/split must conserve a governed quantity/value.

It binds:

- original/source basis;
- outgoing/incoming occurrences;
- required zero-net or conserved-total rule;
- rounding residual treatment;
- effective period;
- governing correction/configuration version.

Not every lineage requires a ConservationGroupKey; where required, absence blocks activation/use.

## 2.4 `MetricContributionIdentity`

Metric-specific identity combining:

- MetricDefinitionVersion;
- source/subject grain;
- ContributionOccurrenceId;
- EconomicContributionLineageKey where applicable;
- ConservationGroupKey where applicable;
- dimension/attribution membership;
- execution/source-cut context.

---

# 3. Contribution disposition rule

Every additive, semi-additive, variance, reconciliation and position/flow metric binds a versioned `ContributionDispositionRule`.

Closed occurrence dispositions:

- `INCLUDE_AS_OCCURRENCE`;
- `INCLUDE_WITH_SIGNED_EFFECT`;
- `EXCLUDE_SUPERSEDED_OCCURRENCE`;
- `INCLUDE_REVERSAL`;
- `INCLUDE_REPLACEMENT`;
- `INCLUDE_RECLASSIFICATION_OUT`;
- `INCLUDE_RECLASSIFICATION_IN`;
- `INCLUDE_PROPORTIONAL_PART`;
- `EXCLUDE_DUPLICATE_REPLAY`;
- `EXCLUDE_OUT_OF_POPULATION`;
- `QUARANTINE_UNRESOLVED_IDENTITY`;
- `BLOCK_UNSUPPORTED_CORRECTION`.

The rule defines by metric class/time basis:

- current-position inclusion;
- period-flow inclusion;
- historical recorded/effective reconstruction;
- correction/reversal signs;
- supersession behavior;
- reclassification transfer;
- split/allocation conservation;
- duplicate/replay exclusion;
- indeterminate/partial treatment;
- restatement impact.

No report implementation may use `DISTINCT` or latest-row selection as correction semantics unless the exact MetricDefinitionVersion explicitly defines and proves that behavior.

---

# 4. Current position and period flow under correction

## 4.1 Current position

Current position is derived from all relevant signed/typed occurrences under the frozen correction algebra and exact as-of cut.

It is not:

- latest occurrence only;
- one row per lineage by arbitrary deduplication;
- original plus replacement without reversal/disposition;
- current source table value with no history.

## 4.2 Period flow

Period flow includes occurrences whose declared effective/recorded basis falls in the period, including reversals/replacements/reclassifications under exact signs and classification.

A period flow may differ from current-position movement where backdating/late recording occurs; the definition states the perspective.

## 4.3 Example

Original +100,000, reversal -100,000, replacement +120,000:

- current position under effective as-of after all three = 120,000;
- effective period flow depends on effective times of all occurrences;
- recorded period flow depends on recorded times;
- all occurrences remain auditable;
- no dedupe by lineage.

---

# 5. Quality vector — BL-P18-02

The prior one-primary-quality-class rule is superseded.

Every result binds an immutable `ResultQualityVector` containing one state for every applicable dimension:

- PopulationCompletenessState;
- SourceAvailabilityState;
- SourceFreshnessState;
- AuthorityConformanceState;
- IdentityResolutionState;
- TemporalConsistencyState;
- EvidenceReconstructabilityState;
- MigrationProvenanceState;
- ReconciliationState;
- EffectCertaintyState;
- CalculationConformanceState;
- AccessDisclosureState;
- ComparabilityState.

Non-applicable dimensions are explicitly `NOT_APPLICABLE`, not omitted silently.

No vector dimension overwrites another.

---

# 6. Decision-use assessment

For each declared use, the result binds a `DecisionUseAssessment` with exactly one disposition:

- `USE_PERMITTED`;
- `USE_PERMITTED_WITH_LIMITATIONS`;
- `USE_BLOCKED`.

Each assessment binds:

- DecisionUseProfile/version;
- ResultQualityVector;
- metric/report scope;
- passed/failed rules;
- blocking dimensions;
- material limitations;
- required disclosures;
- assessment time/source cut;
- configuration/policy version.

The allowed decision uses remain:

- INFORMATIONAL_MONITORING;
- OPERATIONAL_CONTROL;
- MANAGEMENT_REVIEW;
- COMMERCIAL_DECISION_SUPPORT;
- GOVERNED_APPROVAL_SUPPORT;
- EXTERNAL_ISSUED_REPORT;
- AUDIT_RECONSTRUCTION.

A result may be permitted for monitoring and blocked for approval/external issue.

---

# 7. Quality summary labels

A presentation may derive a summary label such as:

- COMPLETE_FOR_DECLARED_USE;
- LIMITED_FOR_DECLARED_USE;
- BLOCKED_FOR_DECLARED_USE.

The summary:

- is derived from one exact DecisionUseAssessment;
- is not stored as source truth;
- cannot suppress vector dimensions;
- cannot be averaged into a confidence score;
- cannot be used for another decision use;
- cannot relabel a blocked result as green/complete.

The prior `COMPLETE`, `PARTIAL_KNOWN`, `STALE`, etc. labels remain dimension states/limitation codes where applicable, not mutually exclusive overall classes.

---

# 8. Report decision-use composition — BL-P18-03

Every `ReportDefinitionVersion` binds one or more versioned `ReportDecisionUseProfile`s.

A profile contains:

- stable use-profile key/version;
- intended decision/use class;
- audience/role/context;
- decision criticality;
- required/optional report members;
- minimum metric/member use eligibility;
- required quality-vector rules;
- source/evidence/reconstruction standard;
- freshness/completeness/temporal consistency threshold;
- access/disclosure/residency rules;
- indeterminate/reconciliation treatment;
- issue/export restrictions;
- required warning/limitation text;
- prohibited interpretations;
- approval/authority non-meaning.

A report title or folder does not establish use.

---

# 9. Report use assessment

Every ReportExecution/ReportSnapshot intended for a declared use binds a `ReportUseAssessment`:

- ReportDecisionUseProfile/version;
- exact member MetricResult/ProjectionResult identities;
- member DecisionUseAssessments;
- required-member presence;
- report-level source-cut/quality/access/evidence assessment;
- incompatible/blocked members;
- overall disposition:
  - `REPORT_USE_PERMITTED`;
  - `REPORT_USE_PERMITTED_WITH_LIMITATIONS`;
  - `REPORT_USE_BLOCKED`;
- issue eligibility;
- assessment time/policy version.

Rules:

1. every required member must permit the report’s use;
2. an informational-only metric cannot become approval support through composition;
3. optional blocked members must be removed with explicit definition/version change or block the report according to profile;
4. limitations cannot upgrade member use eligibility;
5. report issue/export for a use is prohibited when `REPORT_USE_BLOCKED`;
6. issue under another use requires a separate profile/assessment;
7. same ReportSnapshot may have different use assessments only where exact profile/access/audience semantics permit and are recorded.

---

# 10. Composite dependency graph — W-P18-01

Every MetricDefinitionVersion, ProjectionDefinitionVersion and ReportDefinitionVersion preserves a versioned dependency graph.

The graph binds:

- exact dependency keys/versions;
- required/optional relationship;
- semantic compatibility constraints;
- source/quality/access propagation;
- change-impact rule;
- deprecation/retirement behavior.

Activation requires:

- acyclic graph;
- all required dependencies resolvable/active or explicitly limited;
- no circular metric/composite/report dependency;
- no incompatible semantic-version combination;
- dependency validation before issue/restatement.

A dependency change never silently rewrites downstream definitions.

---

# 11. Accepted control variance — W-P18-02

A control observation closed as `OBSERVED_ACCEPTED_VARIANCE` binds:

- whether the underlying predicate remains true;
- variance authority/basis/reason;
- scope/effective period;
- risk/limitation;
- review/expiry/reassessment where applicable;
- source condition and quality state;
- prohibited interpretation.

Accepted variance closes the control-attention obligation only under its basis.

It does not relabel the source predicate false, no-effect, resolved, compliant or complete.

---

# 12. Reconstruction-level degradation notice — W-P18-03

When a retained/issued report’s current reconstruction level degrades materially:

- create a `RECONSTRUCTION_LIMITATION_CHANGED` control observation;
- identify affected ReportSnapshot/ArtifactVersion and prior/current levels;
- preserve cause, authority, time and affected evidence/source;
- expose whether values remain verifiable/reproducible;
- do not mutate original snapshot/issue quality history;
- route notification/review UX to P1.9/later operations.

The observation does not reverse report reliance or domain decisions automatically.

---

# 13. Statistical sufficiency — W-P18-04

Statistical/score metrics bind a versioned `SampleSufficiencyRule` or explicitly state no accepted inferential use.

The rule defines:

- minimum population/sample;
- weighting;
- missing/censored cases;
- category/project comparability;
- permitted statistic/use;
- blocked/limited outcomes.

P1.8 does not invent universal thresholds without evidence.

---

# 14. Safe aggregate disclosure — W-P18-05

Safe aggregate disclosure is deny-by-default where no explicit `AggregateDisclosurePolicy` exists.

The policy binds:

- source sensitivity classes;
- intended audience/context;
- minimum population/concentration rules;
- suppression/generalization;
- differencing/subtraction/filtering controls;
- drill-through permissions;
- export restrictions;
- re-identification/inference tests;
- tenant/project/legal/residency scope;
- policy version/effective period.

The exact privacy/security thresholds remain later NFR/legal design, but absence of a policy cannot be treated as permission.

---

# 15. Updated activation tests

In addition to prior tests:

1. every occurrence has immutable ContributionOccurrenceId;
2. correction lineage uses EconomicContributionLineageKey;
3. required conservation uses ConservationGroupKey;
4. every relevant metric has ContributionDispositionRule;
5. no dedupe/latest-row convention supplies correction meaning;
6. every result has complete ResultQualityVector;
7. every declared use has DecisionUseAssessment;
8. quality summary cannot suppress dimensions;
9. every report use has ReportDecisionUseProfile;
10. every execution/snapshot has ReportUseAssessment;
11. blocked member/use cannot be upgraded by report title or limitation text;
12. dependency graph is acyclic/version-compatible;
13. accepted variance preserves source predicate truth;
14. reconstruction degradation creates visible control observation;
15. safe aggregate disclosure is denied absent policy.

---

# 16. Blocker disposition

- BL-P18-01 — CLOSED by occurrence/lineage/conservation identities and ContributionDispositionRule;
- BL-P18-02 — CLOSED by ResultQualityVector + per-use assessment;
- BL-P18-03 — CLOSED by ReportDecisionUseProfile + ReportUseAssessment;
- W-P18-01 — CLOSED;
- W-P18-02 — CLOSED;
- W-P18-03 — CLOSED semantically; presentation/notification later;
- W-P18-04 — CLOSED without inventing thresholds;
- W-P18-05 — CLOSED by deny-default policy requirement.

---

# 17. Exit condition

Create a remediated integrated candidate and rerun the full hostile scenario matrix. No ADR/status/state change before internal recheck PASS and Claude PASS.
