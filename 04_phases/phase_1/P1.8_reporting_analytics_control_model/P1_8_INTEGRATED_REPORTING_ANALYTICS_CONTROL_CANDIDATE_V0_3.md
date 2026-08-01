# P1.8 — Integrated Reporting, Analytics & Control Candidate v0.3

**Date:** 2026-08-01  
**Status:** EXTERNAL ROUND-1 REMEDIATED INTEGRATED CANDIDATE / INTERNAL RECHECK REQUIRED  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Precedence

The controlling P1.8 candidate is the integrated meaning of:

1. all unchanged P1.8 semantic contracts and catalogues;
2. `P1_8_INTERNAL_AUDIT_REMEDIATION_V0_1.md`;
3. `P1_8_POST_REMEDIATION_RELIANCE_HARDENING_V0_1.md`;
4. `P1_8_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`.

Where wording conflicts, the latest remediation controls.

No ADR status changes before external PASS and final reconciliation.

---

# 2. Governing thesis

Reports and analytics are versioned, reproducible projections over authoritative facts. They are never independent truth writers.

Every load-bearing result must close:

- source authority;
- metric and projection semantic version;
- contribution identity and correction disposition;
- declared population and evaluated population;
- time/actual/status family;
- calculation and currency policy;
- complete quality vector;
- decision/report use;
- access/disclosure;
- snapshot/restatement/reconstruction lineage.

---

# 3. Metric and contribution grammar

Every metric binds one primary closed metric class, a stable MetricKey, exact source families, grain, population, calculation, time, quality, access and explicit non-meaning.

Contribution semantics distinguish:

- immutable `ContributionOccurrenceId`;
- stable `EconomicContributionLineageKey`;
- `ConservationGroupKey` where correction/reclassification/split conservation is required;
- metric-specific contribution identity;
- versioned `ContributionDispositionRule`.

No latest-row, generic deduplication or dimension label supplies correction meaning.

Calculation is an acyclic typed graph of explicitly registered operator families. No arbitrary SQL, scripting, code, loops, recursion, user-defined functions, runtime-defined joins, tenant-authored operators or hidden manual adjustments.

Adding an operator family requires controlled prospective semantic change and hostile review; the registry cannot evolve into a generic expression engine by implementation convenience.

---

# 4. Declared population versus evaluated population

The following are separate:

- declared eligible population;
- system-resolvable population;
- currently evaluable population;
- caller-accessible/drillable population;
- safely disclosable population/result.

A result is a total over the declared population only when the required declared population has been evaluated under the exact metric version.

Every metric/use binds exactly one `PartialPopulationTreatment`:

## `BLOCK_ON_INCOMPLETE_POPULATION`

No numeric total. Use missing/unavailable/restricted/unknown/quarantined/blocked value state.

## `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`

Use `PRESENT_EVALUABLE_SUBSET` and bind eligible/evaluated/unevaluated/unknown/restricted population facts as result data.

The value is explicitly a subtotal, never the declared-population total.

Permitted only with limitations for informational monitoring, operational control or management review.

Prohibited for commercial decision support, governed approval support, a full-population external issue or full-population audit reconstruction.

## `REPORT_DETERMINISTIC_RANGE`

Use `PRESENT_DETERMINISTIC_RANGE` only where lower/upper bounds are derivable from authoritative constraints without imputation.

Higher decision use is allowed only when the exact use policy consumes the range conservatively.

If a valid bound cannot be established, block.

The population cannot be dynamically redefined as the evaluable subset after missing data is discovered.

---

# 5. Access and partial population

Eligible population remains independent of the caller's access.

Exactly one applies:

- compute the full population under system authority and safely disclose an aggregate under a valid AggregateDisclosurePolicy;
- return an explicit subset result;
- return a deterministic range;
- return restricted/blocked.

Restricted members never become absent, zero, not applicable or out of population.

Where member identities cannot be exposed, internal identities remain bound and visible output follows suppression/generalization/blocking policy without erasing the population gap.

---

# 6. Value states

The closed result value-state set includes:

- PRESENT;
- ZERO_CONFIRMED;
- PRESENT_EVALUABLE_SUBSET;
- PRESENT_DETERMINISTIC_RANGE;
- MISSING_EXPECTED;
- UNKNOWN_UNRESOLVED;
- NOT_APPLICABLE;
- UNSUPPORTED;
- SOURCE_UNAVAILABLE;
- RESTRICTED;
- QUARANTINED;
- BLOCKED.

`ZERO_CONFIRMED` requires complete-population proof.

`PRESENT_EVALUABLE_SUBSET` and `PRESENT_DETERMINISTIC_RANGE` cannot be displayed or described as unqualified total/current/complete actual.

---

# 7. Time and actual

Every result binds exact time basis and status/truth family.

Generic ACTUAL is invalid.

Distinct actual families include physical, product commercial/certified, external accounting-posted, paid/cash and other exact accepted domain/technical/communication actuals.

Families may be compared but never summed, substituted or selected by latest availability.

`PERIOD_RECORDED_FLOW` includes signed governed occurrences recorded inside the period; it does not substitute the current net position.

Effective-time flow follows its separately defined correction/restatement semantics.

---

# 8. Quality vector and aggregation-quality composition

Every result preserves a complete quality vector covering:

- population completeness;
- source availability;
- freshness;
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

No quality dimension overwrites another.

Every aggregate-capable metric/projection binds a versioned `MetricAggregationQualityRule` defining:

- target population union and overlap treatment;
- evaluated and missing population;
- unknown-gap propagation;
- restricted-member treatment;
- each quality-dimension composition;
- blocking/segmentation/subset/range behavior;
- decision-use result;
- restatement when gaps resolve.

Mandatory composition includes:

- population completeness recomputed at target scope with enumerated gaps;
- availability not averaged away;
- stale population/value preserved;
- authority conflict blocks or segments;
- unresolved identity blocks/limits;
- mixed-time remains mixed/segmented/blocked;
- evidence/migration/reconciliation/effect portions preserved;
- calculation nonconformance blocks;
- safe disclosure required;
- non-comparability blocks one combined value.

No average/majority/opaque score or undocumented worst-flag rule supplies composition meaning.

---

# 9. Aggregate result manifest

Every aggregate result binds:

- target scope and hierarchy version;
- PopulationDefinitionVersion;
- eligible population;
- evaluated population;
- known unevaluated population and reasons;
- unknown-gap state;
- restricted-population treatment;
- overlap/deduplication outcome;
- contribution counts/amounts by material quality state;
- PartialPopulationTreatment;
- value state;
- DecisionUseAssessment.

Presentation may suppress identities under policy but cannot remove the semantic manifest.

---

# 10. Decision and report use

Per-use result disposition is exactly:

- USE_PERMITTED;
- USE_PERMITTED_WITH_LIMITATIONS;
- USE_BLOCKED.

Report use is separately assessed from its member metrics.

An informational or evaluated-subset member cannot become approval-valid through report title or composition.

Unknown population extent, non-comparability, unsafe access handling, calculation nonconformance or blocked required members blocks load-bearing use.

Every report snapshot binds issue-time use assessment.

A later load-bearing use of an old report requires current `SubsequentRelianceAssessment` for access, intended use, policy, restatement/withdrawal, reconstruction/evidence/conformance, definition support and current-truth divergence.

Later blocked reliance does not rewrite the old issue.

---

# 11. Projection, snapshot and restatement

Metric, projection, execution, result, report definition, report execution, report snapshot, artifact version, issue and communication identities remain separate.

Live query, materialized current view and immutable issued snapshot are not interchangeable.

Recalculation creates new execution/results.

Formula/source family/population/time/FX/quality/interpretation change requires versioning or controlled restatement.

Issued snapshots never mutate silently.

Reconstruction levels are explicit and may degrade prospectively without changing historical values or issue facts.

---

# 12. Indeterminate effects

Indeterminate effect is never no-effect.

When indeterminate effects are excluded:

- `EFFECT_INDETERMINATE_EXCLUDED` is mandatory;
- the point value is labelled as excluding them;
- affected item count and known amount/quantity are disclosed where permitted/derivable;
- unknown or unbounded exposure is stated;
- decision-use disposition is explicit.

Exclusion without disclosure is prohibited.

---

# 13. Composite index

Every composite index binds exact component/version, normalization, weights, weight conservation, missing-component treatment, component partial-population treatment, component-quality composition and minimum use eligibility.

No automatic weight renormalization occurs after a component becomes unavailable, blocked or restricted.

Component/weight/normalization/fallback/quality-rule change creates a new semantic version.

A composite never creates award, exclusion, debarment, Commitment, certification or payment authority.

---

# 14. Aggregation and comparability

Every metric declares additivity behavior.

Ratios, rates, averages, percentiles and distinct counts are recomputed at target scope.

One economic contribution may appear in many drill paths but contributes once.

Unlike actual families, incompatible time cuts, incompatible FX purposes, incompatible populations or non-comparable members remain segmented, limited or blocked.

Cross-currency totals bind reporting currency, exact FX purpose/source/fixing/version/conversion stage and native-value lineage.

No latest-rate default.

Cross-tenant aggregation, reputation and learned influence remain OUT by default.

---

# 15. Supplier and control boundaries

Supplier analytics remains tenant-private, dimension-specific, opportunity/population-fair, evidence/attribution qualified and non-causal unless proven.

Control observations are deterministic derived conditions, not business states.

Acknowledgment/assignment does not clear the source predicate.

Accepted variance does not mean false, resolved, compliant or no-effect.

No supplier network, CPM, BPM or GRC second XL.

---

# 16. Report/export and uncontrolled-copy limitation

ReportSnapshot and ReportArtifactVersion bind exact source cut, result membership, versions, quality, use, evidence, access and content identity.

Edited exported spreadsheets are external working copies and cannot re-enter as truth except through bounded import/proposal/command.

Uncontrolled external copies may be forwarded beyond revocation/restatement reach. Therefore every issued artifact carries or resolves:

- snapshot/artifact and issue identity;
- as-of/source-cut context;
- definition versions;
- material limitations;
- confidentiality/audience classification;
- current-validity/restatement-check instruction and governed lookup reference where permitted.

The product does not promise recall of uncontrolled copies.

P1.9 owns rendering.

---

# 17. Query/chat boundary

Reporting access uses registered QUERY operations with principal/context, version, scope, time/actual family, consistency, pagination, quality and access.

Chat/AI cannot:

- guess ambiguous terms;
- claim all from partial;
- hide subset/range/quality limitations;
- claim unsupported causation;
- use old report/session memory as current authority;
- execute commands by wording;
- expose restricted/cross-tenant data.

Chat is optional; conventional reports remain complete.

---

# 18. A0–A3 minimum reporting

Eight minimum report families run from product-owned/manual/structured evidence with no connector, public API, supplier account, chat, AI, warehouse, P07 or migration prerequisite.

Connector-dependent metrics return not applicable, unsupported, unavailable or limited—never convenient zero.

---

# 19. Candidate ADR posture

No status changes.

Subject to internal and external recheck:

- ADR-0033 — candidate ACCEPT after partial-population closure;
- ADR-0034 — candidate ACCEPT;
- ADR-0035 — candidate ACCEPT;
- ADR-0036 — candidate ACCEPT after quality-composition closure;
- ADR-0037 — candidate ACCEPT after aggregation-quality closure.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

---

# 20. Gate claim before recheck

- G1 — candidate PASS after PartialPopulationTreatment;
- G2 — PASS;
- G3 — PASS;
- G4 — PASS;
- G5 — PASS;
- G6 — candidate PASS after quality/use composition;
- G7 — PASS;
- G8 — candidate PASS after MetricAggregationQualityRule;
- G9 — PASS;
- G10 — PASS;
- G11 — PASS;
- G12 — PASS;
- G13 — PASS;
- G14 — PASS;
- G15 — PASS;
- G16 — internal recheck and Claude Round 2 pending.

P1.8 remains active.

P1.9+ remains locked.

Product code remains locked.
