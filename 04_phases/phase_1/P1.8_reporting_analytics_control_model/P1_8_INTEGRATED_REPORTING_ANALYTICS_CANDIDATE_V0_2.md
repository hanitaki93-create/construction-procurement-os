# P1.8 — Integrated Reporting, Analytics and Control Candidate v0.2

**Date:** 2026-08-01  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / RECHECK REQUIRED  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

The current audit target is:

1. `P1_8_INTEGRATED_REPORTING_ANALYTICS_CANDIDATE_V0_1.md` for unchanged semantics;
2. `audits/P1_8_INTERNAL_AUDIT_REMEDIATION_V0_1.md` for contribution identity, quality/use assessment, report use composition and closed watches;
3. underlying P1.8 contracts/catalogues.

This v0.2 summary controls over conflicting v0.1 wording.

No ADR status changes before external hostile PASS/final reconciliation.

---

# 2. Contribution identity and correction

Every source/reporting contribution distinguishes:

- immutable `ContributionOccurrenceId`;
- stable `EconomicContributionLineageKey` for correction/reversal/replacement/reclassification lineage;
- `ConservationGroupKey` where zero-net/total conservation is required;
- metric-specific `MetricContributionIdentity`.

Every relevant MetricDefinitionVersion binds a versioned `ContributionDispositionRule` governing inclusion, signed effects, reversal, replacement, reclassification in/out, proportional allocation, supersession, duplicate replay, quarantine and unsupported corrections.

No deduplication by lineage, latest-row selection or generic DISTINCT supplies correction meaning.

Current position and period flow follow the frozen correction algebra and exact time perspective.

---

# 3. Quality vector and decision use

Every result binds a complete `ResultQualityVector` with distinct states for:

- population completeness;
- source availability;
- source freshness;
- authority conformance;
- identity resolution;
- temporal consistency;
- evidence reconstructability;
- migration provenance;
- reconciliation;
- effect certainty;
- calculation conformance;
- access/disclosure;
- comparability.

No dimension overwrites another.

For every declared use, a `DecisionUseAssessment` yields exactly:

- USE_PERMITTED;
- USE_PERMITTED_WITH_LIMITATIONS;
- USE_BLOCKED.

Optional presentation summaries are derived from one exact use assessment and cannot suppress the vector or upgrade use eligibility.

---

# 4. Report decision-use composition

Every ReportDefinitionVersion binds one or more `ReportDecisionUseProfile`s stating:

- use/audience/criticality;
- required/optional members;
- minimum member-use eligibility;
- quality/evidence/freshness/completeness thresholds;
- access/disclosure/residency;
- indeterminate/reconciliation treatment;
- issue/export rules;
- required limitations and prohibited interpretations.

Every ReportExecution/ReportSnapshot binds a `ReportUseAssessment` with exact member assessments and one disposition:

- REPORT_USE_PERMITTED;
- REPORT_USE_PERMITTED_WITH_LIMITATIONS;
- REPORT_USE_BLOCKED.

An informational metric cannot become approval support through composition, title, audience or warning text.

Blocked report use cannot be issued/exported for that use.

---

# 5. Dependency graph

MetricDefinitionVersion, ProjectionDefinitionVersion and ReportDefinitionVersion preserve exact versioned dependency graphs.

Activation/issue requires:

- acyclic graph;
- required dependencies resolvable;
- semantic/version compatibility;
- source/quality/access propagation;
- no retired/incompatible member;
- explicit change-impact/restatement behavior.

Dependency changes never silently rewrite downstream definitions/reports.

---

# 6. Control variance and reconstruction degradation

`OBSERVED_ACCEPTED_VARIANCE` closes the control-attention obligation only under explicit authority/basis/scope.

It preserves whether the underlying predicate remains true and never means false, compliant, complete, no-effect or resolved source condition.

Material degradation in current report reconstruction level creates a `RECONSTRUCTION_LIMITATION_CHANGED` control observation linked to affected snapshots/evidence; original issue/value history remains unchanged.

---

# 7. Safe aggregate disclosure

Aggregate disclosure is denied where no versioned `AggregateDisclosurePolicy` exists.

A policy must cover source sensitivity, audience, minimum/concentration/suppression/generalization, differencing/filtering, drill-through, export, inference/re-identification and tenant/project/residency scope.

Exact thresholds remain later security/legal design, but absence is never permission.

---

# 8. Statistical sufficiency

Statistical/score metrics bind a versioned `SampleSufficiencyRule` or explicitly prohibit inferential use.

No universal threshold is invented.

Insufficient samples produce limited/blocked use rather than a confident score.

---

# 9. Existing core preserved

Unchanged v0.1 semantics remain:

- metric as versioned projection, never truth writer;
- closed metric classes and restricted deterministic grammar;
- explicit population/denominator/value states;
- explicit source/effective/recorded/known-at/publication times;
- REQUIRED/PLANNED/FORECAST/CONFIRMED/ACTUAL/SCENARIO/TARGET separation;
- named actual families;
- immutable projection/report snapshot/restatement history;
- five reconstruction levels;
- multi-dimensional quality and explicit limitations;
- no generic actual cost;
- no mixed-time current total;
- sourcing/award/commercial/control catalogues;
- tenant-private supplier performance;
- contribution/comparability-controlled portfolio aggregation;
- exact snapshot/artifact/issue/evidence distinction;
- registered query/chat seam;
- A0–A3 no-connector/no-AI report pack;
- one-XL and product-code lock.

---

# 10. Candidate ADRs

No formal status change.

Internal candidates subject to recheck/Claude:

- ADR-0033 — ACCEPT versioned metric semantic/authority grammar including occurrence/lineage/disposition identity;
- ADR-0034 — ACCEPT projection/report snapshot/restatement and report-use composition;
- ADR-0035 — ACCEPT explicit time/status/actual/forecast semantics;
- ADR-0036 — ACCEPT ResultQualityVector and per-use assessment;
- ADR-0037 — ACCEPT comparability/contribution-controlled aggregation and safe-disclosure deny default.

---

# 11. Gate claim before recheck

- G1 metric definition/source/contribution — PASS after remediation;
- G2 no report writer — PASS;
- G3 actual-family separation — PASS;
- G4 time semantics — PASS;
- G5 version/restatement/snapshot — PASS;
- G6 quality/decision-use — PASS after remediation;
- G7 external authority/evidence — PASS;
- G8 aggregation/double count/access — PASS after remediation;
- G9 supplier boundary — PASS;
- G10 control observations — PASS;
- G11 query/chat — PASS;
- G12 A0–A3 no connector/AI — PASS;
- G13 one-XL — PASS;
- G14 upstream regression — PASS;
- G15 product code locked — PASS;
- G16 internal recheck + Claude — PENDING.

This claim requires independent recheck.
