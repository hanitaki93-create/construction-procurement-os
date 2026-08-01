# P2.1 — Physical Architecture Decision Matrix v0.1

**Date:** 2026-08-02  
**Status:** DECISION RECORD CANDIDATE  
**Code:** LOCKED

---

# 1. Scoring

Score 1–5. Weight reflects Phase 1 risk rather than generic technology preference.

| Criterion | Weight |
|---|---:|
| One-writer/transaction/effect preservation | 20 |
| Evidence and immutable-history coherence | 15 |
| Tenant/context isolation | 15 |
| Effect-indeterminate recovery | 10 |
| A0–A3 no-dependency floor | 10 |
| NFR measurability and restore | 10 |
| Operational simplicity | 10 |
| Later extraction without semantic rewrite | 5 |
| Delivery speed and testability | 5 |

---

# 2. Topology matrix

| Alternative | Weighted result / 500 | Main reason |
|---|---:|---|
| Distributed microservices first | 329 | strong isolation but premature distributed consistency and operational burden |
| Single-process monolith | 371 | fast but weak worker/external/file isolation |
| Strong modular monolith + isolated processes | **454** | preserves transactions while separating runtime lanes and surfaces |
| Mixed core + early evidence/integration services | 390 | useful isolation but creates cross-store acceptance too early |

**Decision:** strong modular monolith plus isolated deployable processes.

---

# 3. Selected decision table

| Decision | Selected physical choice | Rejected baseline | Frozen-semantic reason |
|---|---|---|---|
| Runtime | Node.js 24 LTS, TypeScript, exact versions pinned | Current/non-LTS runtime | production support and reproducibility |
| Repository | pnpm workspaces, TypeScript project references, strict dependency boundaries | many repositories | one semantic version set and easier atomic change |
| API shell | Fastify 5.x, REST/JSON, OpenAPI 3.1 | GraphQL/generic query DSL/server actions | explicit operation mapping and bounded payloads |
| Browser apps | separate React 19.2 + Vite 8 internal/external apps | one full-stack app | prevents internal/external/auth/command boundary collapse |
| Authoritative database | PostgreSQL 18.x | document DB/event-store-only | exact constraints, transactions, RLS, numeric and history |
| Data model | authoritative state + append-only occurrences/events/corrections | full event sourcing | preserves immutable history without universal event root |
| Identifiers | UUIDv7; identity independent from display/legal number | sequence as identity | concurrency and immutable identity |
| Money | PostgreSQL NUMERIC + decimal library + JSON strings | float/JS number | exact commercial calculation |
| Tenant isolation | tenant columns + FORCE RLS + application authorization | schema-per-tenant | scalable isolation with centralized migrations |
| Runtime DB roles | non-owner/non-superuser/no-BYPASSRLS; separate migration role | table-owner runtime | RLS must apply to runtime paths |
| Async | PostgreSQL outbox/jobs, worker lanes, leases/heartbeats | Redis/Kafka first | atomic command/outbox creation and fewer durability domains |
| External effects | publication/attempt/observation/reconciliation tables | queue success boolean | seven effect stages and indeterminacy |
| Search | PostgreSQL FTS/trigram derived documents | OpenSearch first | derived, rebuildable and lower operational burden |
| Cache | no mandatory distributed cache | Redis baseline | avoids second state source and stale-authority risk |
| Evidence payload | S3-compatible versioned object storage | DB blobs or evidence microservice | scalable payloads with provider-neutral boundary |
| Evidence metadata | PostgreSQL authoritative metadata/state | object tags as truth | object/hash/URL cannot become evidence authority |
| File safety | quarantine → sniff → malware scan → parser validation → proposal/acceptance | direct parse/upload acceptance | untrusted content and clean-status truth |
| Identity | OIDC authorization-code/PKCE seam with server-managed sessions | bespoke passwords/provider lock | provider-neutral identity and browser token reduction |
| External access | hashed grant token exchanged for scoped task session; optional registered assurance steps | mandatory supplier account | preserves no-network participation |
| Session storage | PostgreSQL, revocation-aware | browser long-lived bearer token | current authority/revocation and auditability |
| UI server state | TanStack Query for queries; commands use explicit operation client and continuation store | generic optimistic mutation replay | prevents hidden replay and stale command acceptance |
| Continuation anchor | UUIDv7 persisted before transmission in IndexedDB/session-safe store and server preflight where required | generated only inside command request | lost-response recovery contract |
| Command updates | expected aggregate/config/evidence versions; serializable/row-lock where required | last-write-wins | exact guards and concurrency |
| Migrations | SQL-first, forward-only deployed migrations, expand/contract compatibility | ORM auto-sync/destructive rollback | immutable history and safe release rollback |
| Deployment | OCI containers on managed container runtime; static web; managed PostgreSQL/object store | Kubernetes baseline | adequate isolation without platform burden |
| Observability | OpenTelemetry OTLP; structured logs/metrics/traces | vendor-native-only telemetry | vendor-neutral and measurable NFRs |
| Testing | Vitest, property tests, Testcontainers, Playwright | unit-only | database/RLS/restore/browser semantics require physical proof |
| AI | provider adapter and metadata seams only; no active capability | embedded provider/model | AI-off A0–A3 and later evaluation |

---

# 4. Version convention

P2.1 freezes major/runtime families, not unreviewed floating versions.

At Build Block 1:

- resolve latest supported patch inside each selected major;
- pin exact versions in lockfile and runtime manifest;
- record release date, support state and security advisories checked;
- upgrades require CI, migration, architecture-boundary and golden-thread regression.

Initial families:

- Node 24 LTS;
- PostgreSQL 18;
- Fastify 5;
- React 19.2;
- Vite 8.1;
- TanStack Query 5;
- OpenTelemetry current compatible stable line;
- Playwright current compatible stable line.

---

# 5. Extraction triggers

A separate service, broker, search engine or cache may be introduced only when:

1. a measured workload/fault/isolation need exists;
2. the owning module and exact data/effect authority are already explicit;
3. transaction/outbox/reconciliation semantics remain equivalent;
4. tenant/residency/restore/in-flight migration is designed;
5. no new truth writer or generic platform appears;
6. a `CHG-*` physical architecture record and hostile regression pass.

Candidate triggers:

- worker lane repeatedly breaches its C1 target despite vertical/queue optimization;
- search load materially threatens command durability or cannot meet verified relevance/latency;
- evidence processing requires independent security or regional boundary;
- connector workload requires isolated deployment but not separate business truth;
- a tenant contract requires a dedicated isolation profile.

---

# 6. Decision status

All selections are **P2.1 candidate physical decisions** pending internal hostile audit and independent freeze review.