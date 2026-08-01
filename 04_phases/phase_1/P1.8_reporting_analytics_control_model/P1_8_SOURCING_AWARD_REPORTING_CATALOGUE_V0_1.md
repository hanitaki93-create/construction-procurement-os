# P1.8 — Sourcing, Tender, Comparison and Award Reporting Catalogue v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CATALOGUE CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This catalogue defines the bounded reporting families required to understand the A0–A3 sourcing rail without creating a second tracker, hidden ranking model, connector prerequisite or AI dependency.

Every named metric below is a candidate family that must be instantiated through the controlling MetricDefinition, time and quality contracts before activation.

The governing rule is:

> **Sourcing reporting describes governed requirement, tender, response, comparison, recommendation, approval and AwardDecision facts. It never converts a report status, rank, recommendation or communication observation into sourcing or commercial authority.**

---

# 2. Canonical sourcing rail

`requirement / material request / package`
`→ RFQ/tender`
`→ supplier response capture`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

AwardDecision remains distinct from effective Commitment.

Supplier source submission, normalized representation, buyer evaluation adjustment and supplier-confirmed contractable basis remain distinct layers.

---

# 3. Requirement and allocation metrics

## SRC-001 — authorized requirement count

Class: `COUNT`  
Grain: authorized requirement line  
Meaning: requirement lines active under the exact lifecycle/population definition.

Does not mean packages, RFQs or commitments.

## SRC-002 — authorized requirement quantity/amount position

Class: `QUANTITY_POSITION` or `MONETARY_POSITION` by separate MetricKey  
Requires exact valuation/currency basis where monetary.

## SRC-003 — allocation coverage

Class: `COVERAGE`  
Numerator: eligible requirement quantity/value represented by valid RequirementAllocation contributions.  
Denominator: eligible authorized requirement quantity/value.

Must expose partially allocated and unknown/migration-limited positions separately.

## SRC-004 — unallocated position

Class: `QUANTITY_POSITION` / `MONETARY_POSITION`  
Meaning: eligible requirement basis not consumed by valid allocations at the cut.

No negative hidden carry-forward.

## SRC-005 — overlapping allocation exception

Class: `CONTROL_EXCEPTION`  
Detects duplicate scope consumption or contribution conflicts.

It is not a domain-state writer.

## SRC-006 — requirement-to-sourcing-start aging

Class: `AGING`  
Trigger: authorized requirement/allocation readiness event.  
Resolution: first valid sourcing route/tender initiation under exact rule.

---

# 4. Package readiness metrics

## SRC-010 — package count by governed lifecycle state

Class: `DISTRIBUTION`

Must not make ProcurementPackage a universal root; demand-led routes without package remain valid.

## SRC-011 — package scope-lineage coverage

Class: `COVERAGE`  
Measures valid requirement/allocation lineage for package scope.

## SRC-012 — package readiness classification

Class: `QUALITATIVE_RULE_CLASSIFICATION`  
Candidate dimensions:

- scope complete;
- issue evidence ready;
- recipient/invitation population ready;
- approval prerequisite ready;
- unresolved ambiguity/control exceptions.

Readiness never issues an RFQ automatically.

## SRC-013 — package readiness exception count

Class: `CONTROL_EXCEPTION`

---

# 5. Tender/RFQ lifecycle metrics

## SRC-020 — tender/RFQ count by actual lifecycle event

Class: `DISTRIBUTION`  
Candidate events/states:

- draft/proposal only;
- frozen/approved for issue where applicable;
- issued;
- open;
- closed;
- withdrawn;
- superseded;
- cancelled/terminal no issue.

Proposal or draft cannot be counted as issued.

## SRC-021 — issued tender flow

Class: `COUNT` / `PERIOD_RECORDED_FLOW` or effective flow under explicit definition.

## SRC-022 — open tender position

Class: `COUNT` / `POINT_IN_TIME_EFFECTIVE_POSITION`.

## SRC-023 — RFQ issue-to-close duration

Class: `DURATION`  
Start/end events exact; withdrawn/superseded/open cases classified separately.

## SRC-024 — RFQ due aging

Class: `AGING`  
Trigger and due-calendar version explicit.

## SRC-025 — addendum/revision count

Class: `COUNT`  
Counts governed tender revisions/addenda, not arbitrary file versions.

## SRC-026 — current issued revision coverage

Class: `COVERAGE`  
Measures exact recipient population against current issued revision/addendum communication requirement.

---

# 6. Invitation and communication coverage

## SRC-030 — invited supplier relationship count

Class: `DISTINCT_COUNT`  
Distinct tenant-private supplier relationship identity, not email address or reusable authentication identity.

## SRC-031 — invitation dispatch coverage

Class: `COVERAGE`  
Numerator/denominator use exact required recipient population and P1.6 dispatch facts.

## SRC-032 — delivery/receipt/acknowledgment coverage

Separate MetricKeys for:

- dispatch;
- delivery/receipt;
- receipt acknowledgment;
- substantive response.

No collapse into “sent” or “received.”

## SRC-033 — unresolved recipient communication exception

Class: `CONTROL_EXCEPTION`  
Examples: bounce, stale address, missing required addressee, unknown delivery.

Does not automatically alter tender lifecycle.

---

# 7. Supplier response metrics

## SRC-040 — supplier response coverage

Class: `COVERAGE`  
Numerator: invited/applicable supplier relationships with at least one accepted response occurrence under the exact rule.  
Denominator: eligible invited/applicable supplier relationships.

A supplier with multiple emails/revisions contributes once to coverage.

## SRC-041 — response revision count

Class: `COUNT` at response revision grain.

## SRC-042 — latest valid response position

Class: `DISTRIBUTION` / current projection  
Must preserve revision, withdrawal and supersession lineage.

## SRC-043 — response due/late distribution

Class: `DISTRIBUTION` or `AGING`.

Late is a time/control classification, not automatic invalidity unless owning tender rules say so.

## SRC-044 — response completeness coverage

Class: `COVERAGE`  
Measures required source sections/evidence present under exact tender/response profile.

## SRC-045 — response evidence limitation count

Class: `CONTROL_EXCEPTION`  
Separate from commercial/technical non-compliance.

## SRC-046 — no-response count

Class: `COUNT` only when invited population is complete and due/closure rule establishes no response.

Missing notification/source availability cannot be counted as no response automatically.

---

# 8. Normalization metrics

## SRC-050 — source-line normalization coverage

Class: `COVERAGE`  
Numerator: eligible supplier source lines with accepted normalized representation.  
Denominator: eligible supplier source lines.

AI/parser proposals are not accepted normalized lines until governed validation/command.

## SRC-051 — unresolved normalization ambiguity count

Class: `CONTROL_EXCEPTION`.

## SRC-052 — unsupported source-line count

Class: `COUNT` / quality-limited.

## SRC-053 — buyer adjustment coverage

Class: `COVERAGE`  
Measures evaluation adjustments explicitly reviewed/accepted where required.

## SRC-054 — supplier-confirmed contractable-basis coverage

Class: `COVERAGE` over exact required elements.

Normalized/buyer-adjusted value cannot be represented as supplier-confirmed unless evidence establishes it.

## SRC-055 — proposal-derived contribution count

Class: `COUNT`  
Shows AI/tool/parser proposals separately from validated contributions.

---

# 9. Comparison readiness and comparison metrics

## SRC-060 — comparison readiness classification

Class: `QUALITATIVE_RULE_CLASSIFICATION`.

Candidate required dimensions:

- invited/response population status;
- source response revision status;
- normalization coverage;
- commercial/technical evidence status;
- unresolved scope/term ambiguities;
- currency/FX comparability;
- quality/completeness state.

Readiness does not rank suppliers or authorize recommendation.

## SRC-061 — comparison population count

Class: `DISTINCT_COUNT` of eligible supplier response bases.

## SRC-062 — comparable commercial basis coverage

Class: `COVERAGE`.

## SRC-063 — technical/commercial exception distribution

Class: `DISTRIBUTION` with explicit categories and overlap semantics.

## SRC-064 — normalized evaluated amount position

Class: `MONETARY_POSITION` per supplier/response basis.

It must state whether source, normalized, buyer-adjusted or supplier-confirmed value is shown.

## SRC-065 — comparison spread/variance

Class: `VARIANCE` / `STATISTICAL_SUMMARY`  
No hidden “savings” claim; exact baseline and comparability required.

## SRC-066 — ranking output

Only allowed as `QUALITATIVE_RULE_CLASSIFICATION` or `COMPOSITE_INDEX` under explicit accepted rules.

Ranking is decision support, not AwardDecision authority.

No default ranking metric is accepted merely by this catalogue.

---

# 10. Recommendation and approval metrics

## SRC-070 — recommendation count/state distribution

Class: `DISTRIBUTION`.

Recommendation remains proposal/decision-support fact, not AwardDecision.

## SRC-071 — recommendation-to-approval duration

Class: `DURATION` with exact start/end/return/revision handling.

## SRC-072 — approval/DOA state distribution

Class: `DISTRIBUTION` over authoritative workflow/control outcomes.

Workflow result does not directly write commercial truth.

## SRC-073 — approval aging

Class: `AGING`.

## SRC-074 — approval/control exception count

Class: `CONTROL_EXCEPTION`.

## SRC-075 — returned/revised recommendation count

Class: `COUNT` preserving revisions and reasons.

---

# 11. AwardDecision metrics

## SRC-080 — AwardDecision count/flow

Class: `COUNT` / period flow under exact authoritative event.

## SRC-081 — awarded scope/value position

Class: `QUANTITY_POSITION` / `MONETARY_POSITION`.

Must name AwardDecision basis and cannot be labelled Commitment value.

## SRC-082 — award without effective Commitment position

Class: `COUNT` / `MONETARY_POSITION` comparison.

Useful to preserve AwardDecision ≠ Commitment.

## SRC-083 — recommendation-to-award duration

Class: `DURATION`.

## SRC-084 — award correction/supersession distribution

Class: `DISTRIBUTION` preserving history.

## SRC-085 — award evidence limitation count

Class: `CONTROL_EXCEPTION`.

---

# 12. External handoff metrics

## SRC-090 — handoff status distribution

Class: `DISTRIBUTION`.

Candidate states must distinguish:

- not prepared;
- prepared/exported;
- dispatched/transferred;
- external acknowledgment observed;
- external acceptance/posting observed where applicable;
- failed/partial/stale/reconciliation open;
- manual handoff evidenced.

## SRC-091 — award-to-handoff duration

Class: `DURATION`.

## SRC-092 — handoff completeness coverage

Class: `COVERAGE` over required payload/artifact/member set.

## SRC-093 — handoff reconciliation position

Class: `RECONCILIATION_POSITION`.

External success never changes product award authority.

---

# 13. Minimum A0–A3 catalogue

The first live tender must support at minimum:

- SRC-001 authorized requirement count;
- SRC-003 allocation coverage;
- SRC-010 package/status distribution where package route applies;
- SRC-020 tender/RFQ lifecycle distribution;
- SRC-030 invited supplier count;
- SRC-031 dispatch coverage;
- SRC-040 response coverage;
- SRC-044 response completeness coverage;
- SRC-050 normalization coverage;
- SRC-051 unresolved normalization ambiguity;
- SRC-060 comparison readiness;
- SRC-070 recommendation state;
- SRC-072 approval state;
- SRC-080 AwardDecision count/state;
- SRC-090 handoff status;
- overdue/aging and missing-evidence control exceptions;
- exact as-of/source/quality information.

No connector, public API, chat or AI is required.

---

# 14. Catalogue-wide prohibitions

- no package universal-root reporting assumption;
- no email-message count as supplier-response count;
- no response revision count as supplier participation;
- no partial page as full invited/responded population;
- no source/normalized/adjusted/confirmed value collapse;
- no recommendation as award;
- no award as Commitment;
- no handoff acknowledgment as business acceptance;
- no hidden scoring weights;
- no “savings” without explicit authoritative baseline and comparable scope;
- no manual dashboard status writeback;
- no AI proposal counted as validated fact;
- no cross-tenant supplier population or reputation.

---

# 15. Quality and access rules

Every result inherits:

- tenant/project/ContractingAuthorityContext;
- supplier confidentiality/access;
- source/evidence restrictions;
- completeness/pagination state;
- communication evidence limitation;
- migration/reconciliation state;
- definition/source-cut identity.

A user may see aggregate coverage without permission to see competitor submissions only under an explicit safe aggregation policy.

---

# 16. Hostile scenarios

Test at minimum:

1. one supplier sends five revisions;
2. two responses arrive from same supplier identity;
3. email received but attachment missing;
4. response captured manually;
5. response arrives after close;
6. response withdrawn;
7. addendum sent to only some suppliers;
8. provider delivery unknown;
9. partial invitation page;
10. supplier identity unresolved;
11. source line parsed by AI but not validated;
12. normalized price differs from supplier-confirmed basis;
13. buyer adjustment lacks evidence;
14. ranking uses hidden weights;
15. lowest price has incomplete scope;
16. recommendation returned for revision;
17. workflow approved but AwardDecision not issued;
18. AwardDecision exists but Commitment does not;
19. external handoff fails;
20. ERP acknowledges receipt but posting not established;
21. package route omitted for direct/demand-led tender;
22. allocation overlaps two packages;
23. cancelled tender counted as closed successfully;
24. superseded RFQ revision remains current;
25. report uses latest source rather than issued revision;
26. user edits dashboard status;
27. no connector first tender;
28. no AI first tender;
29. chat says all suppliers responded from partial data;
30. cross-tenant supplier score appears in comparison.

---

# 17. Exit condition

This catalogue may enter the integrated P1.8 candidate when every activated metric is instantiated under the controlling semantic/time/quality contracts and the A0–A3 no-connector proof remains complete.
