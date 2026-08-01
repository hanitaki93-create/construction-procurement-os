# PROJECT STATE

**Updated:** 2026-08-02  
**Canonical repository:** `hanitaki93-create/construction-procurement-os`

---

# 1. Current position

- Project: **Construction Procurement OS**
- Phase 1: **PASS / CLOSED / FROZEN**
- Active phase: **Phase 2 — Build Decomposition**
- P2.1 physical architecture: **INTERNAL HOSTILE RECHECK PASS / CLAUDE AUDIT PENDING**
- P2.2 build-block dependency graph: **INTERNAL HOSTILE PASS / CLAUDE AUDIT PENDING**
- P2.3 first build prompt: **B01-P01 INTERNAL PASS / EXTERNAL AUDIT PENDING / EXECUTION LOCKED**
- Product/frontend/AI code: **NOT STARTED / LOCKED**
- P07 implementation: **LOCKED pending V4**
- AI implementation/activation: **LOCKED pending V6**
- External/build/pilot/commercial validation: **PENDING**

Current status:

`A strong modular-monolith physical architecture has been selected and internally remediated. The system uses separate API/worker/internal-web/external-web deployables, PostgreSQL 18 authoritative state/outbox/jobs/initial search, versioned S3-compatible object storage, fail-closed RLS execution context, explicit cross-store evidence and external-effect protocols, and provider-neutral deployment/observability seams. An 18-block dependency graph maps all MR-001–MR-092. B01-P01 is complete as a locked candidate. One combined Claude hostile audit is pending before freeze and prompt release.`

---

# 2. Controlling Phase 1 package

`04_phases/phase_1/P1.11_golden_thread_validation_red_team_master_specification/CONSTRUCTION_PROCUREMENT_OS_PHASE1_MASTER_SPECIFICATION_V1_0_FROZEN.md`

Phase 1 remains controlling. Any semantic contradiction requires explicit `CHG-*` reconciliation.

---

# 3. Selected P2.1 architecture

Baseline:

- Node.js 24 LTS / TypeScript strict / pnpm workspace;
- Fastify 5 API and worker shell;
- React 19.2 + Vite 8.1 separate internal/external browser apps;
- PostgreSQL 18 authoritative relational state plus append-only occurrences/events/corrections;
- PostgreSQL RLS, outbox/jobs and initial FTS/trigram search;
- Kysely/`pg` explicit SQL and SQL-first forward migrations;
- S3-compatible versioned object storage through a product adapter;
- OpenTelemetry/OTLP;
- Vitest/property tests/Testcontainers/Playwright;
- OCI containers/provider-neutral managed runtime.

Not baseline:

- microservices;
- mandatory Kafka/RabbitMQ/Redis;
- OpenSearch/warehouse;
- Kubernetes/service mesh;
- full event sourcing;
- supplier network/account prerequisite;
- named connector prerequisite;
- production P07 or AI.

Controlling candidate:

`04_phases/phase_2_build_decomposition/P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_2.md`

Supporting controls:

- alternatives and decision matrix;
- targeted official technical evidence;
- module/data/runtime map;
- NFR/security/deployment proof map;
- initial hostile FAIL, remediation and 128-scenario recheck PASS.

---

# 4. P2.1 internal result

Closed blockers:

- BL-P21-01 — exact cross-store evidence/artifact acknowledgment and restore;
- BL-P21-02 — pooled RLS/worker context fail-closed protocol;
- BL-P21-03 — job lease versus external-effect indeterminacy;
- BL-P21-04 — enforceable module write ownership in shared database;
- BL-P21-05 — browser/job/schema/release compatibility and rollback.

Internal gates:

- PA-G1–PA-G13: PASS
- PA-G14: PASS through P2.2 decomposition
- PA-G15: PASS / code remains locked

---

# 5. P2.2 build program

Controlling graph:

`04_phases/phase_2_build_decomposition/P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_1.md`

18 major blocks:

1. engineering foundation;
2. platform kernel;
3. async/event/publication/reconciliation;
4. evidence/files/communication;
5. requirements/allocation;
6. sourcing/RFQ/grants/issue;
7. supplier submissions/revisions/buyer capture;
8. field/schema/normalization/comparison;
9. recommendation/approval/AwardDecision/handoff;
10. internal conventional web;
11. external secure-task participation;
12. reporting/controls/search/export;
13. integration/migration/provider-neutral email;
14. NFR/security/restore/release hardening;
15. deterministic A0–A3 validation/pilot instrumentation;
16. P07 commitment/change — V4 gated;
17. P07 claims/certification/correction/reporting — V4 gated;
18. AI substrate/capabilities — V6 gated.

Traceability:

- MR-001–MR-092 mapped: 92/92;
- physical-proof rows with proof blocks: 19/19;
- external-validation rows with decision gates: 5/5;
- architecture gaps introduced: 0.

Every completed block must commit a `BlockCompletionEvidenceManifest`; successors cannot rely on a block without it.

---

# 6. First build prompt

Candidate:

`04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_1.md`

It creates only:

- pinned monorepo/toolchain;
- API/worker/internal-web/external-web shells;
- package boundaries;
- PostgreSQL migration foundation;
- object/scanner adapter foundations;
- local infrastructure;
- observability bootstrap;
- tests/CI/containers/security/SBOM;
- documentation and completion evidence.

It explicitly excludes tenant/business schemas, authentication, product operations, evidence acceptance, procurement workflows, reporting, P07 and AI.

Execution remains locked until:

1. combined Claude P2 PASS;
2. P2.1/P2.2 freeze and final checkpoint;
3. explicit implementation authorization;
4. recorded V1/V2 sequencing decision.

---

# 7. Canonical next handoff

Send Claude:

1. `04_phases/phase_2_build_decomposition/audits/P2_1_P2_2_CLAUDE_SELF_CONTAINED_HOSTILE_AUDIT_PACKET_V0_1.md`
2. `04_phases/phase_2_build_decomposition/audits/P2_1_P2_2_CLAUDE_HOSTILE_AUDIT_PROMPT_V0_1.md`
3. `04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_1.md`

Required PASS:

`PASS — P2.1 physical architecture and P2.2 build decomposition can freeze; B01-P01 is ready for execution after explicit implementation authorization and the recorded V1/V2 sequencing decision.`

---

# 8. Locks

Do not:

- freeze P2.1/P2.2 before external PASS;
- execute B01 before explicit authorization and V1/V2 decision;
- generate executable P07/AI prompts before V4/V6;
- add a broker/search/cache/service as a new authority or prerequisite;
- reinterpret frozen Phase 1 semantics;
- claim physical, external, pilot or commercial validation from documentation alone.