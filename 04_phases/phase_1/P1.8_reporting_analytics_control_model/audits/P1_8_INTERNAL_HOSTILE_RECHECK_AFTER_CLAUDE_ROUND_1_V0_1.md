# P1.8 — Internal Hostile Recheck After Claude Round 1 v0.1

**Date:** 2026-08-01  
**Verdict:** PASS — CLAUDE ROUND 2 READY  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Audit target

Recheck the complete P1.8 candidate with precedence to:

1. `P1_8_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`;
2. `P1_8_PARTIAL_POPULATION_POST_REMEDIATION_HARDENING_V0_1.md`;
3. `P1_8_INTEGRATED_REPORTING_ANALYTICS_CONTROL_CANDIDATE_V0_3.md`;
4. prior internal remediations and unchanged P1.8 contracts/catalogues.

The audit attacked BL-P18-04, W-52–W-56 and regressions into P1.1–P1.7.

---

# 2. Blocker recheck

## BL-P18-04 — CLOSED

The prior ambiguity was whether an incomplete declared population could return a plausible `PRESENT` non-zero total and whether aggregate quality/use could be selected by implementation.

The current candidate closes both routes.

### 2.1 Every metric class binds partial-population meaning

Exactly one treatment applies per declared use:

- `BLOCK_ON_INCOMPLETE_POPULATION`;
- `REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE`;
- `REPORT_DETERMINISTIC_RANGE`.

The rule is class-neutral and therefore applies to count, quantity, monetary, flow, position, ratio, rate, duration, distribution, statistics, variance, coverage, reconciliation, forecast, classification and composite metrics.

### 2.2 Plain `PRESENT` cannot hide missing population

Incomplete evaluation cannot return an unqualified declared-population total.

- subset subtotal → `PRESENT_EVALUABLE_SUBSET`;
- bounded result → `PRESENT_DETERMINISTIC_RANGE`;
- otherwise missing/unavailable/restricted/unknown/quarantined/blocked.

`ZERO_CONFIRMED` remains complete-population only.

### 2.3 Unknown population cannot use subset treatment

The subset route requires complete knowledge of the eligible population and a known evaluated/unevaluated partition.

Unknown eligible-population extent blocks or uses a valid deterministic range only.

### 2.4 Decision-use ceiling is exact

An evaluated-subset value is prohibited for:

- commercial decision support;
- governed approval support;
- external issued report;
- audit reconstruction.

No title, footnote, workflow or recipient upgrades it.

### 2.5 Access cannot redefine population

Eligible population remains independent of the principal's visible rows.

Restricted facts are:

- included in an authorized safe aggregate under disclosure policy;
- explicitly represented as subset/range;
- or restricted/blocked.

They are never silently dropped.

### 2.6 Aggregation quality is closed

`MetricAggregationQualityRule` defines target-population union, evaluated population, known/unknown gaps, restricted handling and every quality dimension's composition.

The aggregate quality vector and DecisionUseAssessment are recomputed at target scope, not inherited, averaged or chosen by implementation.

---

# 3. Exact Claude scenario

Scenario:

- declared portfolio = 20 projects;
- 19 projects evaluated;
- one project's required commercial source unavailable;
- evaluated subtotal = AED 84.2m.

Valid outcomes:

1. `BLOCK_ON_INCOMPLETE_POPULATION` → no numeric portfolio total; source unavailable/block result;
2. known complete project population + management-review use → `PRESENT_EVALUABLE_SUBSET` AED 84.2m, explicitly 19/20 projects, missing project/reason bound internally and disclosed under policy, explicitly not the portfolio total;
3. authoritative bounds exist → `PRESENT_DETERMINISTIC_RANGE` with exact lower/upper or supported one-sided bound.

Invalid outcomes:

- `PRESENT` AED 84.2m as portfolio total;
- omission only in tooltip/footnote;
- commercial/approval/external-issued/audit use of the subset;
- redefining population as the 19 available projects after failure.

Result: closed.

---

# 4. Aggregation-quality hostile matrix

## 4.1 Population completeness

- child completion percentages cannot be averaged;
- target population is recomputed by canonical identity union;
- known gaps are retained;
- unknown gaps propagate;
- overlap/deduplication is explicit.

PASS.

## 4.2 Source availability

One unavailable required source cannot disappear inside 99 available scopes.

The aggregate blocks, segments, ranges or returns explicit subset according to policy.

PASS.

## 4.3 Freshness

One stale scope remains quantified/segmented or blocks under the declared rule. Render time and majority freshness cannot upgrade it.

PASS.

## 4.4 Authority conformance

An authority-conflicted member cannot be averaged away. It blocks or remains separately segmented for a permitted limited use.

PASS.

## 4.5 Identity resolution

Ambiguous identity affecting denominator or contribution uniqueness blocks/limits. It is not silently merged, dropped or counted twice.

PASS.

## 4.6 Temporal consistency

Mixed cuts remain mixed, segmented or blocked. One current total is prohibited where simultaneity is required.

PASS.

## 4.7 Evidence/reconstruction

Evidence-limited portions remain visible by count/value and cannot inherit exact reconstruction from the majority.

PASS.

## 4.8 Migration provenance

Reference/evidence-limited migrated portions remain qualified and do not become native by aggregation.

PASS.

## 4.9 Reconciliation

Open conflicts/expected divergences remain visible and cannot be averaged into equality.

PASS.

## 4.10 Effect certainty

Confirmed, indeterminate, partial and unresolved-variance portions remain separate. Exclusion requires mandatory disclosure.

PASS.

## 4.11 Calculation conformance

Unsupported operator, dependency cycle, formula mismatch or failed conservation blocks the result.

PASS.

## 4.12 Access/disclosure

No result is disclosed without a valid AggregateDisclosurePolicy. Inaccessible rows do not redefine the population.

PASS.

## 4.13 Comparability

Any non-comparable member blocks one combined value. Segmentation/normalization/limited comparison must be explicit and versioned.

PASS.

---

# 5. Watch recheck

## W-52 — CLOSED

The calculation grammar is positively closed through an explicit typed operator registry and acyclic dependency graph.

Adding an operator family requires controlled semantic change and hostile review; no general expression engine can emerge by incremental convenience.

## W-53 — CLOSED SEMANTICALLY

The product explicitly does not promise recall/revalidation of uncontrolled forwarded copies.

Issued artifacts carry/resolve snapshot, issue, as-of, definition, limitation, classification and current-restatement-check context.

Rendering remains P1.9-owned.

## W-54 — CLOSED

Indeterminate-effect exclusion always carries `EFFECT_INDETERMINATE_EXCLUDED`, point-value label, affected item/value exposure where possible and decision-use disposition.

Exclusion without disclosure is invalid.

## W-55 — CLOSED

Composite index binds component/version, normalization, exact weight version, missing-component treatment and dimension-by-dimension quality composition.

No automatic weight renormalization.

## W-56 — CLOSED

Recorded-period flow includes signed occurrences recorded during the period; it is distinct from current position and effective-period flow.

---

# 6. Extended hostile scenarios

1. count over 19 of 20 projects → subset/block/range only.
2. monetary flow with one unavailable project → no plain total.
3. quantity position with one quarantined package → no plain total.
4. duration statistic with unresolved endpoint population → subset limited or block.
5. one restricted project excluded from caller rows → population unchanged.
6. service can compute full restricted aggregate but no disclosure policy → block.
7. safe disclosure policy permits aggregate but not drill-through → full aggregate with restricted-detail limitation.
8. unknown eligible project exists → no subset point value.
9. two known missing projects with maximum contractual limits → deterministic range.
10. lower bound only without supported one-sided use → block.
11. midpoint of range shown as estimate → prohibited unless separate scenario metric.
12. subset result inserted into approval pack → report use blocked.
13. subset result sent externally as purported portfolio report → external-issued use blocked.
14. subset result communicated as informational status → limited use only.
15. stale project hidden by large fresh population → prohibited.
16. non-comparable project coerced into total → blocked.
17. child quality labels all limited but aggregate use assumed permitted → target assessment required.
18. child result allowed for management review but target aggregate not → no inherited permission.
19. child completeness percentages averaged → prohibited.
20. one evidence-limited amount hidden in exact total → qualified portion preserved.
21. migration-limited project becomes native after sum → prohibited.
22. open reconciliation hidden by net zero → state preserved.
23. indeterminate amount excluded with no disclosure → prohibited.
24. indeterminate amount unknown/unbounded → explicitly stated/block per use.
25. composite component unavailable and weights renormalized → prohibited.
26. composite component blocked but index presented → blocked absent a separate prospective definition.
27. correction +100/-100/+120 recorded across periods → recorded-flow and current-position outputs remain distinct.
28. product-authored new calculation operator added without architecture review → prohibited.
29. arbitrary expression assembled from registered operators through dynamic code → prohibited.
30. externally forwarded old PDF used after restatement → product cannot recall; artifact requires verification instruction and new governed reliance must recheck.
31. access later revoked → old issue unchanged, new product reliance blocked.
32. population gap resolves after refresh → new execution/restatement; old subset remains historical.
33. population definition changes prospectively → new version, not dynamic denominator rewrite.
34. restricted identities cannot be disclosed → count/generalize/suppress/block under policy, never erase.
35. inferred hidden value by subtraction → disclosure policy blocks.
36. first tender/no connector → A0–A3 report pack still works.
37. external payment metric unavailable → unavailable, never zero.
38. no BI/warehouse selected → semantics remain implementable.
39. attempt to build generic formula engine → rejected by operator closure.
40. attempt to build quality case-management platform → rejected; quality remains projection/control semantics.

All PASS.

---

# 7. Gate recheck

- G1 metric definition/source/grain/population/formula/time/quality/contribution — PASS.
- G2 no report/projection truth writer — PASS.
- G3 actual-family separation — PASS.
- G4 time/period/position/aging — PASS.
- G5 version/restatement/snapshot/reconstruction — PASS.
- G6 quality vector/decision use/report use/subsequent reliance — PASS.
- G7 external authority/freshness/evidence — PASS.
- G8 aggregation/double count/currency/time/access — PASS.
- G9 supplier boundary — PASS.
- G10 control-observation boundary — PASS.
- G11 query/chat boundary — PASS.
- G12 A0–A3 no connector/AI — PASS.
- G13 one-XL/P07 — PASS.
- G14 upstream regression — PASS.
- G15 product-code lock — PASS.
- G16 internal hostile audit — PASS; Claude Round 2 pending.

---

# 8. Regression check

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

# 9. ADR posture

No status changes.

Internal candidate classification:

- ADR-0033 — ACCEPT candidate;
- ADR-0034 — ACCEPT candidate;
- ADR-0035 — ACCEPT candidate;
- ADR-0036 — ACCEPT candidate;
- ADR-0037 — ACCEPT candidate.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

No upstream accepted ADR reopens.

---

# 10. Verdict

`PASS — P1.8 internal post-Claude-Round-1 remediation recheck passes; prepare Claude Round 2. P1.8 remains active and P1.9 remains locked until external PASS.`
