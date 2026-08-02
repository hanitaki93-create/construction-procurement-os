# PROJECT STATE

**Updated:** 2026-08-02  
**Canonical repository:** `hanitaki93-create/construction-procurement-os`

---

# 1. Current position

- Project: **Construction Procurement OS**
- Phase 1: **PASS / CLOSED / FROZEN**
- Active phase: **Phase 2 — Build Decomposition**
- P2.1 physical architecture: **CLAUDE ROUND 1 FAIL ON BL-P21-06 ONLY / REMEDIATED / INTERNAL RECHECK PASS / CLAUDE ROUND 2 PENDING**
- P2.2 build decomposition: **REMEDIATED V0.2 / INTERNAL RECHECK PASS / CLAUDE ROUND 2 PENDING**
- P2.3 first build prompt: **B01-P01 V0.2 INTERNAL PASS / EXECUTION LOCKED**
- Product/frontend/AI code: **NOT STARTED / LOCKED**
- P07 implementation: **LOCKED pending V4**
- AI implementation/activation: **LOCKED pending V6**
- External/build/pilot/commercial validation: **PENDING**

Current status:

`Claude Round 1 passed the selected topology, cross-store evidence, RLS/worker isolation, external-effect recovery, module write ownership, release compatibility, A0–A3 independence and B01 scope. It found BL-P21-06: missing concurrency control for cross-row conservation invariants. The architecture now has a closed ConcurrencyControlProtocol, exact invariant assignments, isolation/guard/constraint/lock-order/retry declarations, W-100–W-111 closure, an updated 18-block graph and B01-P01 v0.2 with real PostgreSQL write-skew/isolation proof. Internal recheck PASS. Claude Round 2 pending.`

---

# 2. Controlling Phase 1 package

`04_phases/phase_1/P1.11_golden_thread_validation_red_team_master_specification/CONSTRUCTION_PROCUREMENT_OS_PHASE1_MASTER_SPECIFICATION_V1_0_FROZEN.md`

Phase 1 remains controlling. No Phase 1 reopen occurred.

---

# 3. Controlling Phase 2 candidates

Physical architecture:

`04_phases/phase_2_build_decomposition/P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_3.md`

Build graph:

`04_phases/phase_2_build_decomposition/P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_2.md`

Block completion evidence:

`04_phases/phase_2_build_decomposition/P2_2_BLOCK_COMPLETION_EVIDENCE_MANIFEST_TEMPLATE_V0_2.md`

First build prompt:

`04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_2.md`

---

# 4. Selected physical baseline

- Node.js 24 LTS / TypeScript strict / pnpm workspace;
- Fastify 5 API/worker;
- React 19.2 + Vite 8.1 separate internal/external apps;
- PostgreSQL 18 authoritative relational state plus append-only occurrences/events/corrections;
- PostgreSQL RLS, outbox/jobs and initial FTS/trigram search;
- explicit SQL and SQL-first forward migrations;
- S3-compatible versioned object storage;
- OpenTelemetry/OTLP;
- real PostgreSQL/object tests, property tests and Playwright;
- OCI containers/provider-neutral runtime.

No mandatory microservices, broker, Redis, OpenSearch, Kubernetes, warehouse, supplier account/network, named connector, P07 or AI.

---

# 5. ConcurrencyControlProtocol

Every state-changing operation declares `ConcurrencyProfileVersion` with exact isolation, invariant IDs, mechanism, guard/constraint, lock order, retry class and tests.

Permitted mechanisms:

- CC-1 single-row expected version;
- CC-2 stable guard-row lock for rooted aggregate conservation;
- CC-3 unique/partial-unique/exclusion constraint;
- CC-4 SERIALIZABLE predicate transaction where no natural guard/constraint exists;
- CC-5 advisory lock for technical serialization only.

Assigned invariants:

- allocations — AuthorizedRequirementBasis guard;
- minimum/residual drawdown — lineage guard plus unique contribution;
- one value once — conservation-lineage guard plus contribution identity;
- exclusive active scope — exclusion/unique constraint or serializable fallback.

Registered commands explicitly choose isolation before the first statement. Missing invariant mechanism blocks activation/CI.

---

# 6. W-100–W-111 closure

- database context-mutating/security-definer objects prohibited and catalog-scanned;
- tenant projections/search/report/export/control tables use FORCE RLS;
- `ReleaseCompatibilityManifestVersion` named/enforced;
- numeric OIDs remain strings with precision round-trip tests;
- exact-decimal reference calculation and registered SQL equivalence rule;
- three reproducible report source-cut modes;
- B06 owns response schema before issue, B08 only normalizes/compares;
- every block supplies local security/NFR evidence;
- Round-2 packet includes PA gates and actual graph/maps/traceability/prompt;
- independent build reviewer role named;
- B12 owns Arabic search relevance decision.

---

# 7. Build program

The final candidate remains **18 major blocks**.

A0–A3 completes by B15 without P07, connectors, account/network, warehouse, chat or AI.

P07 remains B16–B17 and V4-gated. AI remains B18 and V6-gated.

MR-001–MR-092 remain mapped 92/92; physical proof 19/19 and external validation 5/5 have owners/gates; architecture gaps remain 0.

---

# 8. B01-P01 v0.2

B01 remains an engineering foundation with no business tables/workflows.

It now additionally requires:

- explicit isolation helper;
- write-skew negative control;
- guard-row and serializable protected fixtures;
- lock-order/deadlock fixture;
- concurrency/write-ownership manifest validators;
- no-raw-pool public-surface test;
- exact numeric parser/round-trip test;
- unsafe database-object catalog scan;
- release compatibility manifest scaffold;
- block-local security/NFR evidence;
- independent reviewer.

Execution is locked until:

1. Claude Round 2 PASS;
2. P2.1/P2.2 freeze/final checkpoint;
3. explicit implementation authorization;
4. recorded V1/V2 sequencing decision.

---

# 9. Canonical next handoff

Send Claude:

1. `04_phases/phase_2_build_decomposition/audits/P2_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`
2. `04_phases/phase_2_build_decomposition/audits/P2_CLAUDE_ROUND_2_HOSTILE_AUDIT_PROMPT_V0_1.md`

Required PASS:

`PASS — P2.1 physical architecture and P2.2 build decomposition can freeze; B01-P01 v0.2 is ready for execution after explicit implementation authorization and the recorded V1/V2 sequencing decision.`

---

# 10. Locks

Do not:

- freeze P2.1/P2.2 before Claude Round 2 PASS;
- execute B01 before explicit authorization/V1-V2 decision;
- start P07 before V4 or AI before V6;
- add a service/broker/cache/search system as new authority;
- reinterpret Phase 1 semantics;
- treat documentation as physical/external/pilot/commercial proof.