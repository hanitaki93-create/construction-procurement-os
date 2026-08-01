# P1.10 — Availability, Reliability, Continuity & Degradation Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Availability is the ability to perform a declared capability correctly; a responding endpoint that loses evidence, duplicates effects or hides uncertainty is unavailable for that capability.**

---

# 2. Service classes and monthly SLOs

Measured over calendar month after declared exclusions:

## `CORE_DETERMINISTIC_CONTROL`

Registered reads, proposals, command acceptance/result lookup, authority/configuration and A0–A3 core:

- target 99.90%;
- minimum release gate 99.50% in pilot before wider rollout;
- planned maintenance exclusion capped at 4 hours/month and notified where contract requires;
- security incidents or emergency maintenance remain visible, not silently excluded.

## `EXTERNAL_TASK_AND_SUBMISSION`

- target 99.90%;
- deadline-protection and preserved-attempt/manual fallback mandatory.

## `EVIDENCE_ACCESS_AND_ISSUE`

- target 99.90% for retained product-custodied evidence metadata/access;
- external-reference provider outages reported separately with source-unavailable state.

## `REPORTING_AND_EXPORT`

- target 99.50%;
- core command/evidence capacity has priority during degradation.

## `SEARCH_DERIVED`

- target 99.50%;
- indexing freshness SLO separate;
- conventional exact navigation/query remains available when search is degraded where feasible.

## `NAMED_CONNECTOR_OPTIONAL`

- measured per ConnectorProfile/conformance;
- connector outage does not redefine product availability or external truth;
- manual/file fallback according to activated profile.

## `AI_OPTIONAL`

- target 99.00% only when activated;
- AI outage/degradation never makes deterministic A0–A3 unavailable.

---

# 3. Availability measurement

Each SLI binds:

- capability and valid synthetic/real request;
- correct result criteria;
- tenant/geography/role coverage;
- measurement frequency;
- dependency state;
- exclusion categories;
- partial/degraded classification;
- rolling/monthly calculation;
- evidence retention.

Excluded:

- explicitly announced planned maintenance within cap;
- customer-controlled endpoint/network failure where independently proven;
- unsupported usage beyond declared limits with typed response.

Not excluded:

- provider/subprocessor outage selected by product;
- capacity exhaustion within declared envelope;
- bad rollout;
- security emergency caused by product controls;
- dependency timeout that leaves effect uncertainty hidden;
- inaccessible but technically “up” user journey.

---

# 4. Durability and RPO classes

## `D0_ACKNOWLEDGED_AUTHORITATIVE`

Includes acknowledged domain/commercial events, accepted evidence payload/version, issued artifact, authority/configuration binding, idempotency/continuation anchor and publication/effect position.

- semantic RPO = 0 for acknowledged records;
- the system must not acknowledge success before the declared durable boundary;
- a disaster may leave unacknowledged work unknown/in-flight, but acknowledged identity/effect cannot be silently lost;
- restore/reconciliation must preserve original identities and effect uncertainty.

## `D1_OPERATIONAL_RECONSTRUCTABLE`

Includes durable queues/outbox/inbox/reconciliation state needed to prevent duplicate or lost effects.

- RPO ≤ 1 minute;
- loss beyond target requires explicit incident/reconciliation and no unsafe retry.

## `D2_ISSUED_REPORT_AND_AUDIT_SUPPORT`

- acknowledged snapshots/artifacts semantic RPO = 0;
- reconstructable support indexes/manifests RPO ≤ 15 minutes where rebuildable.

## `D3_DERIVED_REBUILDABLE`

Projection cache/search index/materialized read model:

- RPO ≤24 hours or complete rebuild from authoritative sources;
- staleness/rebuild state visible.

## `D4_OPERATIONAL_TELEMETRY`

- RPO ≤15 minutes for security/incident-critical telemetry;
- other low-risk telemetry may lose ≤60 minutes under disaster;
- telemetry loss never rewrites domain history.

## `D5_AI_DERIVED`

AI transient context/output not accepted into product proposal/evidence:

- may be discarded;
- accepted AI proposal/review/correction records follow their owning evidence/operation class;
- AI memory is never durability substrate for business truth.

---

# 5. RTO classes

After declared disaster:

- core deterministic control read and result lookup: ≤4 hours;
- command acceptance and A0–A3 write capability: ≤4 hours;
- external task/submission: ≤4 hours, with preserved deadline attempt/manual fallback activated earlier where available;
- evidence metadata/access and issue: ≤8 hours;
- reporting/export: ≤8 hours;
- search derived: ≤24 hours or explicit degraded exact-navigation path;
- optional connectors: per profile, target ≤24 hours or manual/file fallback;
- optional AI: ≤72 hours or disabled indefinitely without core impact.

RTO begins at incident declaration criteria defined by the service policy, not when engineering chooses to start work.

---

# 6. Backup and restore evidence

Mandatory:

- encrypted backups under separate access boundary;
- point-in-time or equivalent recovery capable of meeting data-class RPO;
- daily automated backup integrity evidence;
- monthly sampled restore of authoritative/evidence data in isolated environment;
- quarterly end-to-end restore test covering identities, evidence, operations, reports and reconciliation;
- annual disaster/recovery exercise including dependency outage and manual fallback;
- restore test records exact source snapshot, start/end, achieved RPO/RTO, integrity checks, gaps, remediation and approval;
- a backup not successfully restored within the previous quarter does not support a recovery claim.

No vendor backup-success status alone proves recoverability.

---

# 7. Reliability and error budgets

Error budget applies only to availability/performance misses. It never permits:

- unauthorized access/action;
- cross-tenant leakage;
- acknowledged authoritative data loss;
- duplicate commercial effect;
- hidden effect uncertainty;
- missing required evidence/disclosure;
- fabricated AI source/fact.

Such events are zero-tolerance integrity/security incidents, not budgeted failures.

---

# 8. Retry, queue and dependency contract

Every dependency/action profile binds:

- timeout and acceptance semantics;
- safe retry criteria;
- max attempts and total retry duration;
- backoff/jitter;
- circuit-open behavior;
- queue priority and maximum age;
- dead-letter/quarantine/reconciliation;
- idempotency retention;
- continuation/result lookup;
- customer/operator visibility.

Defaults unless a stricter profile applies:

- no more than 5 automatic transport attempts for proven pre-effect idempotent operations;
- total automated retry window ≤15 minutes for interactive-originated work and ≤24 hours for non-urgent publication/observation;
- effect-bearing unknown outcomes never ordinary-retry;
- queue age warning at 5 minutes for interactive-originated work, 30 minutes for routine async work;
- blocking alert at 15 minutes interactive, 4 hours routine, or before business deadline where sooner;
- dead-letter/quarantine item visible within 5 minutes of terminal routing.

---

# 9. Continuation/idempotency retention

- command/async continuation and idempotency records retained at least 90 days after terminal result;
- effect-indeterminate/unresolved positions retained until resolved/accepted variance plus governing retention period;
- externally issued/publication identities retained with the underlying business/evidence retention;
- expiration cannot occur while a client could legally/safely retry under published behavior;
- lookup after active retention returns preserved terminal reference or explicit expired-with-support path, never “not found therefore no effect.”

---

# 10. Degradation priority order

Protect in order:

1. tenant/security boundary and authority;
2. acknowledged-data durability/idempotency/effect safety;
3. evidence capture and external submission attempt preservation;
4. command/result lookup;
5. core read/navigation;
6. registered reporting required for control;
7. search/index freshness;
8. non-urgent import/export;
9. optional connectors;
10. AI.

Lower-priority capabilities may queue, limit or disable before higher-priority semantics weaken.

---

# 11. Deadline protection

For tender/approval/communication deadlines:

- server-authoritative received/attempt time is preserved before heavy processing where technically valid;
- if durable capture succeeded but validation is delayed, state is captured/provisional—not silently late or valid;
- unavailable structured path exposes accepted manual/file/support fallback and exact evidence/time rules;
- capacity/rate limits may not erase an on-time attempt;
- deadline policy and calendar/timezone remain versioned.

---

# 12. Incident and recovery communication

Material incidents expose:

- affected capability/tenant scope where safe;
- detected/declared time;
- known impact and uncertainty;
- current degradation/fallback;
- updates at least every 60 minutes during active customer-impacting incident unless a stricter contract applies;
- recovery time;
- data/effect/reconciliation impact;
- follow-up/correction where required.

Status communication is operational evidence, not domain truth.

---

# 13. Change and proof

Availability/RTO/RPO claims require:

- successful load/failure/restore evidence under the declared profile;
- no open critical integrity blocker;
- versioned measurement definition;
- review at least annually and after material architecture/provider change.

Targets may be strengthened with evidence. Weakening requires explicit impact/contract review and cannot silently change an existing customer commitment.
