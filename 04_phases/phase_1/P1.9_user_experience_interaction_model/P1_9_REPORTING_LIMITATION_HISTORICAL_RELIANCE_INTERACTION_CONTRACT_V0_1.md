# P1.9 — Reporting, Limitation and Historical-Reliance Interaction Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **A result’s population, value state, time, actual family, quality, use eligibility, issue history and current reliance status must survive every screen, compact view, export and later chat answer. Presentation may compress layout, never meaning.**

---

# 2. `LoadBearingDisclosureBundle`

Every load-bearing metric/report value binds a disclosure bundle containing as applicable:

- Metric/Projection/Report definition version;
- exact result/snapshot/artifact identity;
- value state;
- declared, evaluated and unevaluated population;
- subset/range treatment;
- lower/upper/unbounded range semantics;
- time/as-of/known-at basis;
- actual/status family;
- currency/unit/FX purpose;
- full material quality limitations;
- DecisionUseAssessment and ReportUseAssessment;
- source freshness/cut;
- restricted/suppressed treatment;
- indeterminate-effect treatment;
- restatement/supersession/withdrawal state;
- issue-time use eligibility;
- current SubsequentRelianceAssessment;
- current reconstruction/status-check state;
- required explanation/non-meaning.

The bundle is semantic data, not a tooltip.

---

# 3. Surface classes

Every rendering declares one:

- `DECISION_SURFACE`;
- `MONITORING_SURFACE`;
- `COMPACT_SUMMARY_SURFACE`;
- `DETAIL_OR_DRILL_SURFACE`;
- `ISSUED_REPORT_SURFACE`;
- `EXPORT_SURFACE`;
- `HISTORICAL_RELIANCE_SURFACE`;
- `CONVERSATIONAL_SURFACE`.

Surface class cannot upgrade result use or omit mandatory disclosure for its permitted purpose.

---

# 4. Value-state presentation

## `PRESENT`

May use a total/point-value treatment only under exact declared meaning.

## `ZERO_CONFIRMED`

Must not visually match missing/unavailable; proof/completeness remains inspectable.

## `PRESENT_EVALUABLE_SUBSET`

Must:

- label as evaluated subset/subtotal, never total;
- show eligible/evaluated/unevaluated population directly or one action away on the same decision surface;
- show typed gap reasons;
- state prohibited higher uses;
- prevent export/report title from calling it complete;
- retain the subset state in copied/exported machine and human representation.

## `PRESENT_DETERMINISTIC_RANGE`

Must:

- show both bounds and unbounded ends;
- never show midpoint/average/single headline as equivalent;
- show which bound a use policy consumes and why;
- distinguish range width/unknown exposure from confidence;
- preserve range in export/chat.

## Missing/unavailable/restricted/blocked states

Must remain distinguishable and must not use numeric zero or blank as sole representation.

---

# 5. Limitation prominence

A limitation is material when the metric/use policy says it changes permitted interpretation or action.

Material limitations must:

- appear at the same decision surface as the value/action;
- state consequence, not only category;
- be programmatically associated with the value/action;
- survive compact view, print/export and accessible representation;
- not be dismissible as if the source condition resolved;
- not rely solely on color/icon/tooltip;
- block the corresponding call to action when use is blocked.

Acknowledgment only records that the user saw the limitation; it does not alter quality/use/source state.

---

# 6. Compact/card presentation

Compact views may shorten text but must preserve:

- value state label;
- material limitation indicator with consequence;
- as-of/time/actual family where ambiguity is possible;
- permitted/limited/blocked use;
- direct access to population/source/history detail;
- no stronger headline than the underlying result.

A card cannot display an evaluated subset as “Portfolio Commitment AED 84.2m” with the limitation only in a footnote. It must say equivalent to “Evaluated subset AED 84.2m — 19 of 20 projects; not a complete portfolio total.”

---

# 7. Actual/time selection

UI must require or preserve explicit selection/label for:

- physical actual;
- product commercial/certified actual;
- accounting-posted actual;
- paid cash actual;
- forecast/confirmed/planned/scenario;
- effective/recorded/known-at/as-of context.

Generic “Actual,” “Current Cost,” “Spent,” “Paid” or “Progress” is prohibited where more than one frozen family is plausible.

Side-by-side comparison is permitted; summing/substitution/latest-available selection is not.

---

# 8. Population and denominator interaction

For counts/ratios/coverage/aggregates expose:

- declared population;
- numerator/denominator;
- known exclusions;
- missing/unknown/restricted members;
- coverage/completeness;
- whether filters are presentation-only or semantic scope;
- pagination/truncation/sample status;
- target-scope recomputation.

Changing a filter cannot silently redefine a governed denominator. A new semantic scope requires a new query/result context.

---

# 9. Restricted and safe aggregate interaction

If full aggregate is safely disclosable but details are restricted:

- show aggregate under exact policy;
- state detail is restricted, not absent;
- prevent subtraction/differencing/filter attacks where policy requires;
- do not show hidden member count/value if that leaks;
- explain drill-through denial without revealing restricted identities.

If no AggregateDisclosurePolicy permits the result, return restricted/blocked rather than a smaller visible-row total.

---

# 10. Issued, current and restated

Distinct user-selectable/visible states:

- current live result;
- historical as-of reconstruction;
- issued snapshot/artifact;
- recalculated result;
- restated/superseding snapshot;
- withdrawn artifact;
- original issue context.

An old issued URL cannot open current regenerated data by default.

Restated view shows:

- original and restated identities;
- cause/scope/materiality basis;
- changed members/values/limitations;
- issue/notification status;
- whether original remains historically valid but not current.

---

# 11. Issue-time versus current reliance

Historical use surface must show:

- `IssueTimeReportUseAssessment`;
- current `SubsequentRelianceAssessment`;
- current user/principal/context;
- intended new use;
- access/legal/disclosure/residency state;
- restatement/supersession/withdrawal;
- reconstruction/evidence/conformance;
- current-truth divergence;
- permitted/limited/blocked result and reasons.

A previously valid report cannot provide a new approval/award/audit call to action until current reliance is assessed.

---

# 12. Export and copy parity

Every export/copy/print of a load-bearing result preserves:

- value state and label;
- population/subset/range;
- time/actual/currency;
- material limitations and use disposition;
- source cut/definition/version;
- report/snapshot/artifact identity;
- issued/current/restated status;
- confidentiality/audience;
- restatement/status-check instruction.

Plain CSV may carry structured metadata/companion manifest where columns alone are insufficient. Removing the disclosure bundle creates an uncontrolled working copy, not a governed report.

---

# 13. Decision calls to action

Calls to approve, award, issue, commit, certify or otherwise rely on a result are available only when:

- the exact result/report use permits it;
- current authority and reliance permit it;
- material limitations are visible;
- the operation preview binds the result/snapshot/version;
- restricted data does not create an unsafe inference;
- later refresh cannot silently replace the bound result.

A disabled/blocked action states why without leaking restricted information.

---

# 14. Status and refresh

UI distinguishes:

- rendered now;
- result executed at;
- source observed/refreshed at;
- as-of cut;
- current connector/source availability;
- cache/materialization state where material.

“Updated just now” cannot refer only to page render when source/result is stale.

Refresh creates a new execution/result; it does not mutate an issued snapshot.

---

# 15. Candidate ADR-0040

> Adopt a load-bearing disclosure and historical-reliance interaction contract: every result carries a semantic disclosure bundle through decision, compact, issued, export and conversational surfaces; subset, range, missing, restricted, stale, indeterminate and blocked states cannot be visually upgraded; issued/current/restated and issue-time/current-reliance states remain distinct; and calls to action bind exact permitted results rather than current-looking presentation.

No ADR status change yet.

---

# 16. Hostile scenarios

1. subset shown as headline total;
2. range rendered as midpoint;
3. stale value with “updated now”;
4. generic Actual combines families;
5. restricted project omitted from total;
6. tooltip-only material limitation;
7. compact mobile card removes use block;
8. CSV loses limitation metadata;
9. issued link shows current values;
10. restatement notice hidden;
11. old report used for new award after access loss;
12. filter changes denominator silently;
13. first page shown as all;
14. safe aggregate permits subtraction inference;
15. chat repeats value without subset state;
16. acknowledgment clears warning visually.

---

# 17. Exit test

Pass only when no surface can make the same semantic result appear more complete, current, authoritative, unrestricted or decision-fit than it is.