# P2.1 — Physical Architecture Workplan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE WORKPLAN  
**Phase 1:** PASS / CLOSED / FROZEN  
**Product/frontend/AI code:** LOCKED  
**Objective:** choose a buildable physical architecture that preserves the frozen Phase 1 semantics and enables safe dependency-ordered build prompts.

---

# 1. Governing rule

P2.1 may select physical mechanisms. It may not reinterpret business semantics.

Controlling source:

`04_phases/phase_1/P1.11_golden_thread_validation_red_team_master_specification/CONSTRUCTION_PROCUREMENT_OS_PHASE1_MASTER_SPECIFICATION_V1_0_FROZEN.md`

Any question about business ownership, fact meaning, lifecycle/guard, operation/authority, effect/correction, evidence/recovery, reporting, interaction, NFR or AI semantics is a failed physical-design gate and returns to controlled architecture reconciliation.

---

# 2. Required decisions

## D1 — Application topology

Compare and decide:

- modular monolith;
- modular monolith plus isolated workers;
- service-oriented split;
- mixed topology.

Decision criteria:

- transaction and one-writer preservation;
- evidence and commercial consistency;
- independent deployment necessity;
- operational burden;
- fault isolation;
- P07/AI optionality;
- pilot-scale and standard-envelope capacity;
- ability to split later without semantic rewrite.

Default hypothesis to attack:

> A strongly modular monolith with transactional database, outbox, isolated asynchronous workers and explicit module contracts is likely the safest V1 starting point; separate services require demonstrated isolation or scaling need.

## D2 — Authoritative persistence and transaction strategy

Decide:

- relational database role;
- event/history representation;
- immutable occurrence and correction storage;
- transactional outbox/inbox;
- optimistic/pessimistic concurrency boundaries;
- idempotency/continuation retention;
- effective-dated configuration and authority history;
- tenant isolation mechanism;
- migration/versioning approach.

Must prove:

- one authoritative writer;
- atomic accepted command identity and authoritative effect where required;
- no lost acknowledged record;
- immutable history and typed correction;
- exact money and contribution conservation;
- safe indeterminate-effect recovery.

## D3 — Evidence and file architecture

Decide:

- evidence metadata versus object payload storage;
- immutable content identity and versioning;
- upload quarantine/scan/parser pipeline;
- issued-artifact immutability;
- source locator and reliance storage;
- retention, hold, redaction and tombstone behavior;
- backup/restore integrity across database and objects;
- export manifests/checksums.

Must prevent:

- hash/URL/object identity becoming business authority;
- clean status without completed scan/validation;
- payload/metadata split-brain after acknowledgment;
- restore that loses holds, tombstones or idempotency.

## D4 — Asynchronous execution and integration

Decide:

- worker/queue model;
- durable job identity;
- outbox publication;
- inbound observation admission/quarantine;
- effect-stage persistence;
- reconciliation queues;
- dead-letter and accepted-unresolved handling;
- connector/email adapter boundary;
- retry and timeout implementation.

Must preserve:

- four operation classes;
- DomainEvent/IntegrationEvent/TransportEnvelope/ExternalObservation separation;
- immutable PublicationIntent;
- seven effect stages;
- no generic retry under possible effect;
- positive-evidence burden for no-effect.

## D5 — Search, projections, reports and controls

Decide:

- authoritative query path versus derived read models;
- search index and freshness;
- report execution/snapshot storage;
- metric operator execution;
- control-observation projection;
- rebuild/reconciliation strategy;
- access filtering before aggregation/disclosure.

Must preserve:

- no reporting/search truth writer;
- exact metric version/population/time/actual family;
- subset/range/block behavior;
- immutable issued snapshots and restatement;
- restricted-member and inference controls.

## D6 — API and operation execution pattern

Decide:

- internal command/query interface;
- external API style only as a physical convention;
- operation registry representation;
- request/response/outcome envelopes;
- expected-version and guard handling;
- idempotency/continuation keys;
- async lookup/recovery endpoints;
- authorization interception and evidence binding.

No endpoint may create a semantic path outside the registered operation.

## D7 — Frontend and interaction architecture

Decide:

- internal web application shell;
- external secure-task experience;
- optional workspace boundary;
- state/query caching;
- command preview/confirmation flow;
- continuation-anchor persistence;
- bulk-progress and indeterminate-effect UI;
- document/report/export rendering;
- accessibility, responsive and Arabic/RTL foundations;
- conventional-chat seam.

Must prevent:

- UI-owned state or truth;
- hidden commands;
- disclosure loss on compact/mobile/export surfaces;
- account/network dependency for supplier participation.

## D8 — Identity, authorization and tenancy enforcement

Decide:

- identity provider seam;
- tenant/project/context binding;
- role/delegation/DOA representation;
- external task grants and assurance;
- row/schema/policy enforcement;
- privileged operations;
- session/elevation/revocation;
- service and worker identities;
- audit/security event separation.

Must prove current authority on every consequential operation and prevent service-account or sub-agent authority amplification.

## D9 — NFR, deployment and operations baseline

Decide:

- development/test/staging/production environments;
- container/runtime/deployment strategy;
- release version manifest;
- schema/config/operation/metric/field/AI compatibility;
- rollout/rollback;
- backup/restore;
- observability and measurement health;
- secrets/key management;
- vulnerability and incident workflow;
- capacity and cost controls.

No specific vendor becomes frozen architecture unless separately justified.

## D10 — AI provider-neutral seam

Decide only the physical seam for later authorized AI:

- capability registry persistence;
- provider adapter boundary;
- prompt/tool/source/context/evaluation versioning;
- isolated retrieval/index namespace;
- run/proposal/audit storage;
- resource budgets;
- manual/AI-off fallback.

Do not choose or activate production AI capabilities in P2.1.

---

# 3. Decision artifacts

P2.1 should produce:

1. `P2_1_PHYSICAL_ARCHITECTURE_ALTERNATIVES_V0_1.md`
2. `P2_1_PHYSICAL_ARCHITECTURE_DECISION_MATRIX_V0_1.md`
3. `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_1.md`
4. `P2_1_MODULE_DATA_RUNTIME_MAP_V0_1.md`
5. `P2_1_NFR_SECURITY_DEPLOYMENT_PROOF_MAP_V0_1.md`
6. `P2_1_INTERNAL_HOSTILE_AUDIT_V0_1.md`
7. remediation and recheck if required;
8. independent Claude audit packet if the candidate changes high-load-bearing physical assumptions;
9. `P2_1_FINAL_CHECKPOINT_V1_0.md`.

Use one aggressive integrated build where safe. Do not create separate research phases for decisions that can be tested directly against the frozen architecture.

---

# 4. Physical-architecture gates

- PA-G1 — every authoritative fact has one physical owner/write path;
- PA-G2 — command acceptance, idempotency and authoritative effect are transactionally safe;
- PA-G3 — evidence metadata/payload acknowledgment and restore are coherent;
- PA-G4 — all asynchronous/effect-indeterminate branches are representable and recoverable;
- PA-G5 — tenant/project/context isolation is enforceable at every data/tool path;
- PA-G6 — derived search/report/control stores cannot write truth;
- PA-G7 — immutable correction, contribution and report history are physically supportable;
- PA-G8 — external supplier path works without account/network/named connector;
- PA-G9 — UI cannot bypass operations or hide required disclosure;
- PA-G10 — NFR SLIs and conformance are measurable rather than aspirational;
- PA-G11 — restore preserves authority, evidence, idempotency, holds and history;
- PA-G12 — AI can be absent or replaced without breaking A0–A3;
- PA-G13 — no second XL or generic platform appears;
- PA-G14 — architecture can be decomposed into bounded build blocks without semantic invention;
- PA-G15 — product code remains locked until authorization.

Any FAIL blocks build-prompt generation.

---

# 5. Hostile scenarios

Attack at minimum:

1. command accepted while database commits but outbox fails;
2. outbox publishes twice;
3. worker loses response after external effect;
4. same idempotency key crosses tenant/context;
5. object payload persists but evidence metadata fails, and vice versa;
6. restore database and object storage from different points;
7. correction races with report issuance;
8. current authority changes during preview/confirmation;
9. UI retries after timeout under possible effect;
10. bulk operation partly commits;
11. search/report index is stale or incomplete;
12. restricted member leaks through aggregation/cache;
13. external task link is forwarded;
14. buyer-on-behalf capture conflicts with supplier revision;
15. file scanner/parser is unavailable;
16. export exceeds limits and truncates;
17. database migration changes semantic field meaning;
18. provider callback is authentic but uncorrelated;
19. queue backlog threatens tender deadline;
20. AI provider is removed completely;
21. one tenant becomes noisy;
22. region outage occurs after accepted command;
23. rollback encounters newer data/config versions;
24. service split creates a second writer;
25. modular monolith becomes an unbounded shared-state blob;
26. generic workflow/report/form/agent engine emerges;
27. physical choice forces reinterpretation of a Phase 1 clause.

---

# 6. Build-block decomposition input

After P2.1 PASS, the physical architecture must expose:

- module boundaries and dependency direction;
- data ownership and transaction boundaries;
- event/publication/queue paths;
- evidence and file path;
- API/operation/surface ownership;
- shared libraries versus independent runtime components;
- migration and bootstrap order;
- test harness and quality gates;
- deployment order;
- optional P07 and AI seams.

These become inputs to P2.2’s 12–18 major build blocks.

---

# 7. Efficiency target

Aim to reach a hostile-audit-ready physical candidate in one focused run.

If no blocker appears, P2.2 block decomposition and the first build-prompt specification may follow immediately.

If a blocker appears, remediate only the affected physical decision; do not reopen Phase 1 unless the issue is genuinely semantic.

---

# 8. Current next action

Create the alternatives and decision matrix, then issue one integrated physical-architecture candidate covering D1–D10 and PA-G1–PA-G15.