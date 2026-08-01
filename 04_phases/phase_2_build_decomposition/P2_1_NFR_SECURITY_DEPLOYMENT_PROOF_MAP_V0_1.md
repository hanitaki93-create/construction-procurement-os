# P2.1 — NFR, Security & Deployment Proof Map v0.1

**Date:** 2026-08-02  
**Status:** PHYSICAL PROOF CANDIDATE  
**Code:** LOCKED

---

# 1. Proof rule

A technology selection is not evidence that an NFR is met. Each claim below requires executable proof at the named build block/gate.

---

# 2. Core proof map

| Frozen obligation | Physical mechanism | Required proof | Earliest block |
|---|---|---|---|
| semantic RPO 0 for acknowledged authoritative records | PostgreSQL durable transaction/HA/PITR and commit acknowledgment | kill/failover after acknowledgment with exact record/idempotency/event recovery | B03/B14 |
| evidence payload + metadata acknowledgment | versioned object put + checksum + metadata transaction + upload-session reconciliation | crash at every boundary, orphan reconciliation, payload/metadata restore | B04/B14 |
| tenant/project/context isolation | app authorization + FORCE RLS + non-bypass roles + transaction-local context | hostile cross-tenant read/write/job/search/export tests | B02/B14 |
| no duplicate external effect | immutable PublicationIntent, attempt identity, seven effect stages, lookup/reconciliation | lost response after send, duplicate callback, timeout, worker crash | B03/B13 |
| continuation before transmission | browser durable anchor + optional server preflight | close tab/network loss before/after transmit; recover by lookup | B10/B11 |
| immutable correction/history | append-only occurrences/corrections + expected versions | property tests, closed-period replay, no in-place mutation | B03/B08/B17 |
| exact money | NUMERIC + decimal strings/library + policy rounding | property/golden tests across scale, FX, negative/reversal | B03/B17 |
| report subset/range/block | versioned metric engine and population assessment | restricted/missing/unknown/partial scenarios across API/export/UI | B12 |
| issued artifact immutability | exact member/content manifest + immutable object version | regeneration creates new version; prior bytes retrievable | B04/B12 |
| provider-neutral A0–A3 | adapters and manual/file paths | complete GT-01/02/04/06/17 without provider services | B09–B13 |
| AI-off | no deterministic module imports AI runtime | build/test with AI package disabled/absent | all/B18 |

---

# 3. Performance/capacity proof

- k6 or equivalent HTTP load for read/preview/command/task/report endpoints;
- worker lane load generator with tenant/deadline mix;
- PostgreSQL query plans and lock/contention telemetry;
- search/report workload isolated from command pool and resource budgets;
- object upload/scan/render large-file tests;
- P95/P99 calculated over declared eligible populations, not averages;
- collector loss/measurement-health injection.

Extraction thresholds are evidence, not automatic architecture changes.

---

# 4. Restore proof

Quarterly-equivalent automated exercise must restore:

- PostgreSQL authoritative state/history/idempotency/outbox/jobs/sessions/holds/tombstones;
- object versions and issued artifacts;
- release/schema/configuration/operation/field/metric manifests;
- search/report projections by rebuild or verified restore;
- unresolved effect and reconciliation positions.

Restore validation runs golden checks for:

- one-writer/current-version integrity;
- evidence checksum/member manifests;
- no resurrected revoked grants/sessions;
- no replayable terminal or indeterminate command;
- report snapshot/reliance identity;
- tenant isolation.

---

# 5. Security proof

Required CI/staging evidence:

- dependency lock/provenance and SBOM;
- secret and credential scanning;
- SAST and dependency vulnerability checks;
- container image scan;
- database privilege/RLS policy snapshot tests;
- CSRF/session fixation/revocation/elevation tests;
- external grant forwarding/replay/expiry/transfer tests;
- upload archive-bomb, MIME mismatch, malware, parser timeout and unsupported-format tests;
- log/trace/metric sensitive-data assertions;
- authorization matrix and service-account amplification tests;
- annual/material-change penetration/adversarial test gate.

---

# 6. Deployment proof

Every release manifest binds:

- source commit and image digests;
- Node/runtime/package lock;
- schema migration head;
- operation/field/schema/metric/configuration versions;
- web/API/worker compatibility range;
- optional provider/profile versions;
- rollout/rollback and in-flight disposition.

Pipeline order:

1. static/type/boundary tests;
2. unit/property tests;
3. build/SBOM/security checks;
4. real PostgreSQL/object integration tests;
5. migration forward/compatibility tests;
6. API/worker/browser/golden tests;
7. image creation/signing;
8. staging migration and smoke/load/security checks;
9. explicit conformance disposition;
10. production rollout with health/error-budget guard.

Rollback may roll application images only while schema compatibility permits. Schema history is not destructively rolled back.

---

# 7. Environment and role proof

- local/test/staging/production use separate credentials and storage namespaces;
- production data is never copied to lower environments without governed redaction/export;
- migration role is unavailable to runtime containers;
- worker/API/object credentials are lane/scoped and rotated;
- no runtime role owns tenant tables or bypasses RLS;
- break-glass role is disabled by default, time-bound and independently alerted;
- tenant context is reset/verified on every pooled transaction.

---

# 8. Phase-2 gate mapping

| Gate | Proof owner |
|---|---|
| PA-G1 one writer | B02–B09 module ownership and boundary tests |
| PA-G2 command/idempotency | B03 transaction/crash tests |
| PA-G3 evidence coherence | B04 cross-store tests |
| PA-G4 async/indeterminate | B03/B13 worker and connector tests |
| PA-G5 isolation | B02 plus every later block |
| PA-G6 derived stores | B12 rebuild/non-write tests |
| PA-G7 correction/history | B03/B08/B17 property/replay tests |
| PA-G8 no-account external | B06/B07/B11 participant tests |
| PA-G9 UI operation/disclosure | B10/B11 Playwright tests |
| PA-G10 measurable NFR | B14 instrumentation/load tests |
| PA-G11 restore | B14 full restore exercise |
| PA-G12 AI-off | deterministic CI profile through B15 |
| PA-G13 no second XL | architecture dependency scan/review |
| PA-G14 decomposable blocks | P2.2 dependency graph |
| PA-G15 code lock | project state and authorization gate |