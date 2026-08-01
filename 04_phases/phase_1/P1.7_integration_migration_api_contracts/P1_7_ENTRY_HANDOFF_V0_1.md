# P1.7 — Integration, Migration & API Contracts — Entry Handoff v0.1

**Date:** 2026-08-01  
**Status:** ENTRY HANDOFF / P1.7 ACTIVE CANDIDATE  
**P1.6:** PASS / CLOSED / FROZEN  
**P1.8+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Entry condition

P1.7 begins only because:

- P1.1–P1.6 are closed/frozen as applicable;
- P1.6 internal hostile audit/remediation passed;
- Claude P1.6 Round 3 returned PASS with blockers none;
- G1–G15 passed;
- ADR-0027 and ADR-0028 are accepted;
- no upstream ADR reopened;
- P07 remains sole XL;
- A0–A3 remains clean;
- product code remains locked.

---

# 2. Objective

Define the deterministic integration, migration and interface contracts that allow external systems, users, automation and future agents to interact with the frozen domain/evidence substrate without creating:

- dual masters;
- connector-owned business truth;
- arbitrary mutation surfaces;
- evidence/history loss;
- non-idempotent duplicate effects;
- hidden synchronization correction;
- mandatory bespoke connector burden before first live tender;
- an independent integration-platform XL gravity well.

P1.7 decides **interface meaning and authority**, not product implementation technology.

---

# 3. Frozen inheritance

P1.7 may not reinterpret:

## P1.4

- tenant/project/ContractingAuthorityContext boundaries;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- exactly one authoritative writer/source per effective period;
- connector/middleware never business authority;
- external fact freshness/conflict and governed authority transfer;
- historical configuration/authority version binding;
- residency/migration boundary;
- cross-tenant isolation including indirect/model-mediated effects.

## P1.5

- polycentric procurement graph;
- P07 Commercial Core and sole-XL status;
- bounded domain actions and TX-001–TX-056 lifecycle membership;
- immutable history-preserving correction;
- idempotency/concurrency/numbering semantics;
- commercial versus accounting/tax/payment authority seam;
- actual/forecast/status distinctions;
- exact decimal/versioned calculation/FX/tax semantics;
- AI/tool-derived content cannot write truth directly.

## P1.6

- EvidenceRecord/EvidenceVersion/content/source/occurrence/locator/reliance separation;
- immutable historical RelianceBinding;
- mandatory ReconstructionAnchorTest;
- explicit external materialization policy;
- exact issued artifact/member-set identity;
- issue/send/delivery/read/ack/content/domain-effect separation;
- immutable CommunicationSatisfactionRule;
- CommunicationSatisfactionSnapshot and established-once domain effect;
- later evidence correction cannot automatically reverse/retime domain truth;
- pending/snapshot/establishment disposition visibility;
- retention/redaction/disposition/export semantics;
- bounded evidence actions.

---

# 4. Primary P1.7 workstreams

## P1.7a — API and bounded command/query contracts

Define semantic contracts for:

- bounded state-changing commands;
- read/query/projection operations;
- command identity/idempotency;
- expected version/preconditions;
- tenant/principal/context propagation;
- authority and capability checks;
- evidence/config/version bindings;
- result/event/error contracts;
- asynchronous accepted/pending/completed/rejected states;
- bulk operations without semantic bypass;
- future agent/tool invocation over the same bounded actions.

No generic CRUD/mutation endpoint may bypass domain invariants.

## P1.7b — Domain event and integration-event contracts

Define:

- domain event versus integration event;
- event identity/version/type/effective/recorded times;
- tenant/project/context and authority metadata;
- causation/correlation/idempotency lineage;
- evidence/config/version references;
- schema evolution and compatibility;
- replay/redelivery behavior;
- ordering guarantees by relevant stream/key, not false universal ordering;
- projection recalculation/version behavior;
- event publication failure/recovery boundary;
- prohibition on consumers treating integration events as permission to overwrite authoritative facts.

## P1.7c — Integration authority and connector profiles

For each load-bearing exchanged fact/event/field define:

- authority mode: OWN/MIRROR/REFERENCE/OUT;
- authoritative source/writer;
- direction;
- effective period/cutover;
- freshness/staleness expectations;
- conflict classification;
- correction/reconciliation behavior;
- evidence/reference/version requirements;
- read/write/retry capability;
- connector degradation/failure behavior;
- operational versus business authority distinction.

Connector profile/capability cannot silently change domain meaning.

## P1.7d — Import, export and migration contracts

Define semantic treatment for:

- bootstrap import;
- in-flight transaction migration;
- historical import/reference;
- source identity/version mapping;
- tenant/project/legal/context mapping;
- master/config/policy version mapping;
- display-number preservation/mapping;
- evidence payload/reference/materialization;
- external authority ownership;
- validation/rejection/quarantine;
- duplicate detection;
- partial migration and resumability;
- migration cutover and in-flight write handling;
- rollback/forward correction;
- provenance and migration manifest;
- post-migration source/copy disposition;
- no fabrication of missing historical provenance.

## P1.7e — Reconciliation, conflict and error taxonomy

Define closed/typed classes for:

- transport failure;
- authentication/authorization failure;
- schema/version incompatibility;
- duplicate/replay;
- stale external fact;
- source conflict;
- authority conflict;
- referential/mapping failure;
- business-rule rejection;
- evidence/reconstruction-anchor failure;
- partial/batch failure;
- rate/availability degradation;
- unknown/unclassifiable failure requiring quarantine.

Integration correction cannot mutate authoritative product truth merely to make synchronization pass.

## P1.7f — Agent/tool interface seam

Freeze the API/tool boundary future agents may use:

- same bounded command/query operations as users/services;
- explicit principal/tenant/context/capability;
- no direct DB/event-store writes;
- no arbitrary SQL/tool mutation;
- deterministic validation and domain ownership;
- evidence/provenance attached to proposals/derived inputs;
- idempotent tool calls;
- inspectable results/errors;
- no cross-tenant memory/data leakage;
- agent implementation/orchestration/confidence remains P1.10.

---

# 5. ADR-0006 closure obligation

P1.7 must resolve:

**ADR-0006 — V1 ERP/accounting integration depth.**

The decision must be evidence- and burden-controlled.

At minimum evaluate:

1. no V1 integration beyond manual/import/export interface;
2. thin structured import/export/reconciliation;
3. generic API/webhook/file integration contract without named connector;
4. one or more named connectors;
5. deep real-time transactional integration.

The final decision must preserve:

- A0–A3 first live tender with zero bespoke named connector prerequisite;
- product commercial truth versus external accounting truth;
- no connector co-master;
- bounded V1 implementation surface;
- expansion path without ontology rewrite.

Connector strategy may vary by activation tier/profile, but authority and event meanings remain invariant.

---

# 6. Candidate semantic outputs

P1.7 should produce at least:

1. `P1_7_WORKPLAN_V0_1.md`;
2. API command/query contract;
3. domain-event/integration-event contract;
4. integration authority profile grammar;
5. connector capability/certification contract;
6. reconciliation/conflict/error taxonomy;
7. import/export/migration contract;
8. identity/reference mapping contract;
9. idempotency/retry/delivery/replay contract;
10. asynchronous operation/status contract;
11. agent/tool API boundary;
12. A0–A3 minimal no-connector deployment profile;
13. external accounting/ERP/CDE/email/bank/technical-system seam tests;
14. integrated candidate;
15. internal hostile audit/remediation/recheck;
16. self-contained Claude hostile-audit packet;
17. final ADR/checkpoint only after dual PASS.

---

# 7. Hard distinctions

P1.7 must preserve:

- API command ≠ generic CRUD;
- query/projection ≠ authority;
- domain event ≠ integration event;
- event delivery ≠ event effect;
- connector acknowledgment ≠ business acceptance;
- synchronization success ≠ truth correctness;
- transport retry ≠ new business command;
- external ID mapping ≠ identity authority;
- import row ≠ authoritative domain fact until validated/accepted by owning domain;
- migration ≠ history rewrite;
- reconciliation ≠ forced equality;
- external current pointer ≠ historical evidence version;
- API version ≠ domain semantic version automatically;
- webhook callback ≠ domain event;
- outbox/message broker ≠ business authority;
- agent/tool call ≠ privileged mutation.

---

# 8. Integration authority profiles

Every load-bearing integration mapping must state:

- fact/event/field identity;
- authority mode;
- source/writer;
- target/consumer;
- direction;
- transformation/normalization authority;
- source/effective/observed times;
- freshness/staleness threshold or explicit no-threshold where justified;
- conflict behavior;
- correction path;
- evidence/reference/version anchor;
- cutover/transfer rule;
- failure/degraded-mode behavior;
- allowed actions under stale/unavailable source.

No entity-level blanket ownership may hide mixed-authority facts.

---

# 9. API command contract minimum

Every state-changing API/tool command must carry or resolve:

- tenant/project/resource/ContractingAuthorityContext;
- authenticated principal + acting/represented principal where applicable;
- bounded operation identity;
- stable idempotency key/logical command identity;
- expected current state/version/causal precondition;
- governing config/policy/authority versions or resolution basis;
- evidence/source references where required;
- requested effective time/backdate basis where supported;
- correlation/causation context;
- exact command payload/version;
- deterministic validation result;
- result event/resource identity;
- explicit rejected/pending/completed/duplicate/conflict outcome.

Bulk commands must apply domain semantics per affected item/aggregate and cannot hide partial failures.

---

# 10. Event contract minimum

Every domain/integration event must state as applicable:

- immutable event identity;
- tenant/project/context;
- owning domain/aggregate/resource;
- event type and semantic schema version;
- recorded time;
- effective time/period where material;
- causation/correlation/command identity;
- principal/authority context;
- governing config/policy versions;
- evidence/RelianceBinding references where load-bearing;
- correction/supersession lineage;
- publication/replay metadata separated from business meaning.

Consumers cannot infer authority from receipt of an integration event.

---

# 11. Delivery, retry and asynchronous semantics

P1.7 must define:

- at-least-once versus exactly-once illusion boundaries;
- idempotent command/result behavior;
- duplicate event/message handling;
- ordering scope;
- retryable versus terminal failure;
- poison/quarantine behavior;
- asynchronous accepted/pending/completed/rejected states;
- publication failure after domain commit;
- callback before local persistence;
- eventual reconciliation without domain truth rewrite;
- stable causal identity across retries/channels.

Physical outbox/event-bus/queue/transaction technology remains later implementation.

---

# 12. Migration invariants

Migration may not:

- fabricate missing source/version/location provenance;
- collapse historical source and normalized values;
- relabel external accounting facts as product commercial facts;
- overwrite original effective/recorded times silently;
- change historical governing policy/authority versions;
- merge tenants/suppliers/transactions solely by weak identifier similarity;
- create duplicate commercial effects;
- import mutable current external links as exact historical evidence;
- bypass lifecycle guards by direct state assignment.

Where source data cannot satisfy the target invariant, migration must:

- reject/quarantine;
- import as explicit external/reference/legacy fact with limitations;
- require controlled remediation;
- or exclude with manifest and impact.

No invented certainty.

---

# 13. A0–A3 minimum integration profile

The first live tender must remain possible with:

- no named ERP/CDE/email connector;
- bounded manual/config/bootstrap data entry;
- structured file import/export where useful;
- product-owned tender release, supplier response capture, comparison, approval and AwardDecision evidence;
- optional email/portal/manual capture paths under P1.6;
- external handoff through bounded export/API/file/manual evidence.

P1.7 must not let enterprise integration aspirations delay this profile.

---

# 14. One-XL guard

P1.7 must not become:

- enterprise service bus/iPaaS platform;
- universal data warehouse/MDM;
- generic ETL/no-code mapping platform;
- API management product;
- event-sourcing framework product;
- migration consultancy platform;
- agent orchestration platform;
- external accounting/CDE/email system clone.

Integration remains bounded interface infrastructure around frozen domain authority.

**P07 sole XL must remain clean.**

---

# 15. P1.7 gates

P1.7 may close only if:

G1 — every load-bearing inbound/outbound fact/event has one authority profile and no connector co-master.

G2 — every state-changing external/API/agent operation routes through a bounded domain action with authority, precondition, idempotency and evidence/config binding.

G3 — domain events and integration events are semantically separated; delivery/replay cannot create duplicate domain effects.

G4 — async commit/publication/callback crash windows have deterministic recovery without truth rewrite.

G5 — imports/migrations preserve or explicitly qualify identity, authority, time, evidence and history; missing provenance is never fabricated.

G6 — external references/evidence satisfy P1.6 ReconstructionAnchorTest/materialization rules.

G7 — conflicts/rejections/staleness/errors are typed and cannot be “resolved” by overwriting authoritative truth.

G8 — authority transfer/cutover prevents dual writers and defines in-flight handling.

G9 — schema/API/event evolution preserves historical meaning and projection reproducibility.

G10 — agent/tool interface is bounded, tenant-scoped, auditable and no more powerful than supported domain actions.

G11 — ADR-0006 is resolved without making a named connector prerequisite for A0–A3.

G12 — A0–A3 minimal profile executes with no bespoke connector and no architecture invention.

G13 — P1.1–P1.6 regression = NO; P07 sole XL; second XL clean.

G14 — product code remains locked.

G15 — internal hostile review PASS + Claude hostile review PASS before closure.

---

# 16. Required hostile scenarios

At minimum test:

1. domain commit succeeds but event publication fails;
2. duplicate API command after timeout;
3. webhook callback arrives before local command result persistence;
4. external ERP retries same invoice/payment/posting fact;
5. stale ERP cost code used during Commitment command;
6. authority profile changes while transactions are in flight;
7. connector maps one external ID to two tenant records;
8. two external systems claim authority for the same fact;
9. external CDE current pointer changes after award;
10. historical migration lacks exact supplier quote revision;
11. migration imports certified value and accounting-posted value as one `actual`;
12. partial batch import succeeds for some rows and fails others;
13. API schema version changes while old clients retry;
14. integration event replay after correction;
15. agent invokes same command twice;
16. connector outage during Pattern-B communication establishment;
17. evidence snapshot exists while domain event is pending;
18. region migration occurs during active synchronization;
19. export/return followed by source-system deletion;
20. no connector deployment runs first tender end to end.

---

# 17. First action

Create:

`P1_7_WORKPLAN_V0_1.md`

before selecting technologies or designing named connectors.

P1.8+ remains locked.

Product code remains locked.
