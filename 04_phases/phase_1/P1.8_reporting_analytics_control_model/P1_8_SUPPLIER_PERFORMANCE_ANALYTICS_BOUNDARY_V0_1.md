# P1.8 — Supplier Performance Analytics Boundary v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / P1.8  
**P1.8:** ACTIVE / UNLOCKED  
**P1.9+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Purpose

This contract defines what supplier-performance reporting may and may not represent from tenant-owned evidence.

It prevents:

- one opaque supplier score collapsing unrelated dimensions;
- sourcing competitiveness being confused with delivery or quality performance;
- one project’s evidence becoming another tenant’s reputation signal;
- missing opportunities or biased populations being treated as poor performance;
- proposed/AI-derived judgments becoming supplier facts;
- performance analytics becoming hidden debarment, award or network authority.

The governing rule is:

> **Supplier performance is a tenant-private, evidence-bound set of dimension-specific observations over declared eligible populations. It is never a universal reputation, cross-tenant rank, award authority or inferred fact merely because it is summarized numerically.**

---

# 2. Identity and scope

Every supplier-performance result binds:

- tenant-private supplier relationship identity;
- reusable technical authentication identity only where relevant and never as business relationship authority;
- project/legal/entity/ContractingAuthorityContext;
- subject relationship/evaluation period;
- evidence/source population;
- exact supplier identity mapping/version;
- access/confidentiality;
- no cross-tenant data or indirect learned influence by default.

A similar name, email, tax number or bank account cannot merge supplier relationships without governed identity resolution.

---

# 3. Closed performance dimensions

Each metric belongs to one primary dimension.

## 3.1 `SOURCING_PARTICIPATION`

Examples:

- invitation-response coverage;
- response timeliness;
- required response completeness;
- revision/clarification behavior.

Does not measure competitiveness, delivery, quality or financial health.

## 3.2 `COMMERCIAL_COMPARABILITY`

Examples:

- comparable scope/terms coverage;
- unresolved qualification/exception count;
- supplier-confirmed contractable-basis completeness.

Does not automatically mean price competitiveness or acceptability.

## 3.3 `PRICE_OR_VALUE_POSITION`

Tenant-event-specific comparison against exact comparable population/baseline.

Does not create general supplier performance or market-price truth.

## 3.4 `TECHNICAL_COMPLIANCE`

Evidence-backed compliance/exception results for a specific tender/submittal/requirement basis.

Does not imply general capability outside the evaluated scope.

## 3.5 `DELIVERY_OR_MILESTONE_PERFORMANCE`

Planned/forecast/confirmed/actual milestone metrics under exact source/calendar/subject.

Does not prove causation or quality.

## 3.6 `QUALITY_OR_ACCEPTANCE_OUTCOME`

Accepted/rejected/nonconformance/defect/remediation evidence where an owning domain/source exists.

P1.8 does not invent a quality-management domain.

## 3.7 `COMMERCIAL_ADMINISTRATION`

Examples:

- change/claim/document response timeliness;
- certification/support-document completeness;
- reconciliation exceptions attributable under evidence.

Does not imply contractual breach automatically.

## 3.8 `COMMUNICATION_RESPONSIVENESS`

Exact issue/dispatch/response occurrences and durations.

Delivery/read/acknowledgment/substantive response remain distinct.

## 3.9 `CONTROL_OR_EVIDENCE_DISCIPLINE`

Evidence completeness, reconstruction limitations and control exceptions.

Does not mean fraud, unreliability or business risk without separate evidence.

## 3.10 `TENANT_AUTHORIZED_QUALITATIVE_EVALUATION`

Structured human evaluation under explicit criteria, principal, evidence, period and review/correction history.

It remains an evaluation fact, not objective universal truth.

No new dimension is introduced without controlled extension.

---

# 4. Population and opportunity fairness

Every supplier-performance metric defines:

- eligible events/relationships;
- opportunity population;
- inclusion/exclusion;
- minimum sample/observation count;
- open/unfinished event treatment;
- cancelled/withdrawn/incomplete process treatment;
- supplier-caused versus contractor/system-caused exclusions where evidence supports;
- missing/unknown source treatment;
- time horizon/cohort;
- project/category/scope comparability.

A supplier cannot be penalized for:

- not being invited;
- a cancelled tender;
- missing contractor-side information;
- unavailable connector data;
- incompatible categories/projects;
- unresolved identity;
- events outside the evaluation scope.

---

# 5. Evidence and attribution

Every material result preserves:

- source facts/events;
- EvidenceVersion/SourceLocator/RelianceBinding where load-bearing;
- evaluator/authority for human assessment;
- source versus normalized versus buyer-adjusted versus supplier-confirmed layer;
- correction/appeal/review history;
- quality/completeness/freshness;
- causal-attribution limitation.

Correlation or timing alone does not establish supplier responsibility.

Where attribution is disputed or unknown, the metric states that limitation or excludes the event under the definition.

---

# 6. Composite indices

A composite supplier index is permitted only as a transparent `COMPOSITE_INDEX` and must bind:

- exact component MetricKeys/versions;
- dimensions represented and omitted;
- weights and rationale;
- normalization/scaling;
- missing-component behavior;
- minimum sample rules;
- project/category comparability;
- validity period;
- sensitivity/access;
- explicit non-meaning;
- no direct award/debarment authority.

No default universal supplier score is accepted.

Composite values may not average away a blocking technical, evidence, authority or identity limitation.

---

# 7. Qualitative evaluations

A human evaluation binds:

- evaluation definition/version;
- evaluator principal/role/context;
- subject/scope/period;
- exact criteria and scales;
- evidence references;
- comments/rationale;
- conflicts of interest where governed;
- review/approval where required;
- correction/appeal/response history;
- access/retention;
- explicit subjective status.

A free-text opinion is not automatically an active load-bearing metric.

---

# 8. Cross-tenant prohibition

By default, tenant business data must not:

- create or improve another tenant’s supplier score;
- rank suppliers across tenants;
- train adaptive supplier-risk/performance models;
- populate shared benchmarks;
- create shared embeddings/retrieval/memory;
- reveal another tenant’s participation, price, quality or dispute history;
- indirectly influence another tenant’s award recommendation.

Shared executable infrastructure is allowed with tenant-scoped authorized context.

Any future shared-learning/benchmark mode requires separate explicit governance under P1.4/ADR-0026 and cannot be required by A0–A3.

---

# 9. Current versus historical performance

Every result states:

- evaluation period/cohort;
- as-of/known-at basis;
- definition version;
- source coverage;
- current identity mapping;
- whether later corrections/restatements apply;
- whether the result is event-specific, category/project-specific or relationship-level.

A current score does not overwrite prior issued evaluations.

A corrected identity mapping creates explicit impact/restatement lineage.

---

# 10. Decision-use boundary

Supplier-performance results may support:

- information/monitoring;
- sourcing preparation;
- management review;
- governed decision support where quality/access rules permit.

They cannot by themselves:

- issue an invitation;
- exclude/debar a supplier;
- approve/reject a response;
- create recommendation/AwardDecision;
- form Commitment;
- certify or pay;
- create cross-tenant reputation.

Any decision uses separate bounded authority/command and must cite the exact evidence/metric basis where required.

---

# 11. Privacy, confidentiality and access

Performance results inherit source access and may be more sensitive due to inference.

Define:

- internal roles allowed;
- external supplier access/rebuttal where configured;
- competitor-confidential data suppression;
- small-population inference controls;
- export restrictions;
- retention/disposition;
- audit/review access;
- residency.

Aggregation never automatically makes restricted bid or performance evidence safe to disclose.

---

# 12. Prohibitions

- no global supplier score;
- no cross-tenant reputation network;
- no hidden ranking weights;
- no price-only “best supplier” claim;
- no one-event permanent classification;
- no missing data as poor performance;
- no contractor/system delay attributed to supplier without evidence;
- no AI-generated supplier judgment as fact;
- no opaque causal claim;
- no dashboard manual score as authority;
- no score direct to award/debarment;
- no identity merge by weak similarity;
- no data from unconsented/unrelated tenant influence.

---

# 13. Hostile scenarios

Test at minimum:

1. supplier invited once and did not respond;
2. supplier not invited to most tenders;
3. tender cancelled;
4. contractor issued late addendum;
5. delivery plan changed by contractor;
6. supplier confirmation later changed;
7. external milestone feed stale;
8. quality rejection lacks evidence;
9. one severe failure and many successful events;
10. one successful event only;
11. different product categories;
12. different project calendars;
13. price compared across incomparable scopes;
14. missing data becomes zero score;
15. human evaluator conflict;
16. supplier disputes evaluation;
17. identity merged after mapping correction;
18. same technical identity across tenant relationships;
19. cross-tenant score requested;
20. shared benchmark requested;
21. AI summary labels supplier unreliable;
22. exception count used as risk score;
23. composite averages away technical noncompliance;
24. score used to auto-exclude supplier;
25. score used to auto-award;
26. old evaluation overwritten;
27. evidence disposed;
28. performance export reveals competitor price;
29. small population reveals confidential event;
30. no AI/no connector deployment still supports tenant-private evaluation.

---

# 14. Exit condition

This boundary may enter the integrated P1.8 candidate when supplier metrics remain dimension-specific, tenant-private, evidence-bound, population-fair, access-controlled and incapable of becoming shared reputation or decision authority.
