# P1.8 — Internal Hostile Audit v0.1

**Date:** 2026-08-01  
**Verdict:** FAIL — NARROW SEMANTIC REMEDIATION REQUIRED  
**Audit target:** `P1_8_INTEGRATED_REPORTING_ANALYTICS_CANDIDATE_V0_1.md` and controlling P1.8 contracts  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Audit posture

The integrated candidate was attacked as an implementation contract, not reviewed for document completeness.

A blocker exists where a compliant builder could choose materially different source authority, contribution, quality or decision-use meaning.

Physical choices such as BI technology, storage, SQL engine, renderer, cache and UI were excluded from blocker status.

---

# 2. Verdict

`FAIL — three load-bearing semantic seams require remediation before external audit.`

The architecture remains structurally sound. The blockers are closed-enumeration/identity composition defects.

---

# 3. Blockers

## BL-P18-01 — contribution identity is ambiguous across correction, replacement and reclassification

### Clauses

- Metric contract `MetricContribution` / `ContributionKey`;
- portfolio contract contribution identity and “must survive corrections/reclassifications”;
- commercial catalogue correction/anti-double-count rules.

### Failure mode

The candidate requires one ContributionKey and also requires corrections/replacements/reclassifications to preserve immutable history.

It does not close whether:

- the original and replacement share the same ContributionKey;
- each effect occurrence has a new ContributionKey;
- a reclassification is a new contribution, a moved contribution or a zero-net pair;
- current-position metrics deduplicate, net or supersede occurrences.

### Concrete scenario

A Commitment effect of AED 100,000 is reverse-and-replaced by AED 120,000.

Builder A gives both effects the same ContributionKey and deduplicates to one row, potentially losing the reversal/replacement algebra.

Builder B gives each effect a different ContributionKey and sums both positive positions, producing AED 220,000.

Builder C includes the original, reversal and replacement but has no explicit metric-level contribution disposition/netting rule and may obtain AED 120,000 only by implementation convention.

All three can claim to preserve the current wording.

### Why this is semantic

Whether an occurrence is individually counted, netted, superseded or grouped is the economic/reporting meaning of the metric, not a storage implementation.

### Narrowest remediation

Freeze three distinct identities:

1. immutable `ContributionOccurrenceId` for each source fact/effect occurrence;
2. stable `EconomicContributionLineageKey` linking corrections/replacements/reclassifications of the same reporting contribution subject;
3. `ContributionDispositionRule` per MetricDefinitionVersion defining inclusion/netting/supersession/transfer behavior under the frozen correction algebra.

For split/reclassification, add `ConservationGroupKey` and require zero-net/conservation proof where applicable.

No deduplication by lineage key alone.

---

## BL-P18-02 — multi-dimensional quality has no closed overall-use disposition

### Clauses

- data-quality contract: thirteen quality dimensions;
- one primary ResultQualityClass plus typed limitations;
- QualityAggregationPolicy may determine severity/primary state.

### Failure mode

The candidate correctly says quality dimensions are independent but still asks the implementation to select one primary class among COMPLETE, STALE, PARTIAL, RECONCILIATION_OPEN, EFFECT_INDETERMINATE and others.

No closed precedence exists.

A builder may choose:

- STALE as primary and hide PARTIAL_UNKNOWN;
- RECONCILIATION_OPEN as primary and still label the result usable;
- COMPLETE as primary with non-blocking limitations;
- a numeric score or arbitrary “worst wins” rule.

### Concrete scenario

A portfolio total is:

- population PARTIAL_KNOWN;
- one ERP feed STALE;
- one identity conflict RECONCILIATION_OPEN;
- indeterminate effect excluded;
- evidence exact.

The same result could be shown as stale, partial, reconciliation open or complete-with-warnings depending on implementation.

### Why this is semantic

The permitted decision use and disclosure cannot be left to UI or data-platform precedence.

### Narrowest remediation

Replace the one-primary-class requirement with:

- immutable `ResultQualityVector` containing every dimension state;
- `DecisionUseAssessment` for each declared use with exactly one overall disposition:
  - `USE_PERMITTED`;
  - `USE_PERMITTED_WITH_LIMITATIONS`;
  - `USE_BLOCKED`;
- versioned rules mapping the vector to each use;
- optional derived summary label for presentation only, never authoritative and never allowed to suppress dimensions.

`COMPLETE` becomes a population/source qualification condition or summary only when all definition-required dimensions pass for that use.

---

## BL-P18-03 — report-level decision use and issue eligibility are not compositionally closed

### Clauses

- metric definition permitted decision use;
- data-quality decision-use classes;
- report definition quality/issue rules;
- export issue validation.

### Failure mode

Metrics declare allowed use, but ReportDefinition/ReportExecution/ReportSnapshot do not explicitly bind one or more report-level `DecisionUseProfile`s and prove every member/result is eligible for the chosen use.

A report can combine:

- an informational-only forecast;
- a monitoring-only supplier composite;
- an approval-support commercial metric;
- a stale external observation;

and still be issued under a title such as “Award Approval Pack” unless implementation invents report-level composition rules.

### Concrete scenario

A supplier recommendation report contains a composite index permitted only for informational monitoring and a comparison-readiness metric permitted for management review. The report is issued to an approval authority and then cited as governed approval support.

No metric writes the decision, but the report’s declared use overstates the validity of its members.

### Why this is semantic

Report issue purpose determines minimum quality, access, evidence and member-use eligibility. This cannot be decided by layout or workflow implementation.

### Narrowest remediation

Add:

- versioned `ReportDecisionUseProfile` to ReportDefinitionVersion;
- exact intended audience/decision/criticality;
- member-by-member allowed-use compatibility;
- report-level quality/evidence/access threshold;
- `ReportUseAssessment` at execution/snapshot with disposition permitted/limited/blocked;
- prohibition on issue for a use when any required member is blocked or outside allowed use;
- limitations cannot convert an informational metric into approval support.

---

# 4. Watches / non-blocking debt

## W-P18-01 — composite dependency graph

Metric and projection versions should preserve an explicit acyclic dependency graph and detect circular/retired/incompatible dependencies.

The current contracts imply dependencies but do not state cycle prohibition directly.

## W-P18-02 — accepted control variance visibility

An accepted control variance should preserve whether the underlying predicate remains true and should not move the observation to a generic resolved label.

## W-P18-03 — current reconstruction-level reduction notices

When evidence disposition reduces the reconstruction level of an issued report, define whether affected report owners/auditors receive a control observation/notice. The semantic limitation is present; notification workflow is later.

## W-P18-04 — statistical sample sufficiency

The metric contract requires minimum sample adequacy but named catalogues should avoid creating default thresholds without evidence.

## W-P18-05 — permitted safe aggregation policy

Safe aggregate disclosure must be explicit; exact minimum-population and inference tests remain later security/NFR design, but P1.8 should require denial by default where no policy exists.

## W-P18-06 — official-practice limitations

Official product version history/refresh/dependency validation corroborates the candidate but is operationally bounded and not contractual reconstruction evidence.

---

# 5. Gate check

- G1 metric definition — FAIL due BL-P18-01 contribution identity;
- G2 no report writer — PASS;
- G3 actual families — PASS;
- G4 time semantics — PASS;
- G5 version/restatement — PASS;
- G6 quality/limitations — FAIL due BL-P18-02;
- G7 external authority/evidence — PASS;
- G8 aggregation/double count/access — FAIL due BL-P18-01;
- G9 supplier boundary — PASS;
- G10 control observations — PASS with watch;
- G11 chat/AI boundary — PASS;
- G12 A0–A3 no connector/AI — PASS;
- G13 one-XL — PASS;
- G14 upstream regression — PASS;
- G15 product code locked — PASS;
- G16 dual hostile — FAIL / remediation required.

---

# 6. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- P1.7 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 7. Required remediation result

Create a narrow remediation that:

1. separates occurrence, lineage and conservation identities;
2. freezes correction/netting/disposition semantics per metric;
3. replaces primary quality ambiguity with vector + decision-use assessment;
4. composes metric decision-use eligibility at report/snapshot level;
5. closes watches without creating generic formula, workflow, GRC or BI platforms;
6. produces a remediated integrated candidate and full hostile recheck.
