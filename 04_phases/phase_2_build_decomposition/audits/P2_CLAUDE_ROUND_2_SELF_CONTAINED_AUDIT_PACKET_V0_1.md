# Construction Procurement OS — Phase 2 Claude Round 2 Audit Packet v0.1

**Date:** 2026-08-02  
**Status:** INTERNAL POST-ROUND-1 PASS / EXTERNAL FREEZE AUDIT PENDING  
**Phase 1:** PASS / CLOSED / FROZEN  
**P2.1/P2.2:** OPEN  
**B01-P01:** v0.2 READY FOR AUDIT / EXECUTION LOCKED  
**Product code:** NOT STARTED

---

# 1. Round-2 mission

Audit whether BL-P21-06 and W-100–W-111 are closed without reopening the selected topology or Phase 1 semantics.

A clean PASS must establish that later implementation cannot choose by convenience:

- cross-row invariant concurrency mechanism;
- isolation/guard/constraint/lock order/retry behavior;
- database context mutation or projection isolation;
- numeric coercion/calculation execution;
- report source cut;
- response-schema ordering;
- block-local security/NFR evidence;
- B01 completion/reviewer meaning.

Treat internal PASS as a claim to attack.

---

# 2. Round-1 result

Round 1 independently passed:

- cross-store evidence acknowledgment/restore;
- pooled RLS/worker isolation;
- external-effect lease expiry and fencing;
- shared-database write ownership;
- browser/job/schema/release compatibility;
- ordinary A0–A3 independence;
- B01 scope and rollback.

It failed only:

`BL-P21-06 — cross-row conservation invariants could write-skew under READ COMMITTED because expected row versions do not protect predicates spanning different rows.`

---

# 3. Controlling physical package

1. `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_3.md`
   - incorporates v0.2 blob `09e92ac7960c1dd360c5d53d14218c82bb76ab88`;
   - adds concurrency and W-100–W-111 controls.
2. `P2_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`
3. `P2_2_BUILD_BLOCK_DEPENDENCY_GRAPH_V0_2.md`
4. `P2_2_REQUIREMENT_TO_BLOCK_TRACEABILITY_V0_1.md`
5. `P2_1_MODULE_DATA_RUNTIME_MAP_V0_1.md`
6. `P2_1_NFR_SECURITY_DEPLOYMENT_PROOF_MAP_V0_1.md`
7. `P2_2_BLOCK_COMPLETION_EVIDENCE_MANIFEST_TEMPLATE_V0_2.md`
8. `build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V0_2.md`
9. `audits/P2_INTERNAL_POST_CLAUDE_ROUND_1_RECHECK_V0_1.md`

---

# 4. Selected topology remains unchanged

- strong TypeScript modular monolith;
- separate API, worker, internal-web and external-web artifacts;
- PostgreSQL 18 authoritative relational state, append-only occurrences/events/corrections, outbox/jobs and initial search;
- versioned S3-compatible object payload storage;
- fail-closed RLS/application authorization;
- provider-neutral deployment/observability;
- no mandatory microservices, broker, Redis, OpenSearch, Kubernetes, warehouse, supplier network/account, connector or AI.

---

# 5. ConcurrencyControlProtocol

## 5.1 Mandatory declaration

Every registered state-changing operation binds `ConcurrencyProfileVersion`:

- exact isolation;
- invariant IDs;
- mechanism per invariant;
- guard/resource identity;
- lock order;
- named constraints;
- expected-version members;
- safe-retry class/max attempts;
- typed conflict outcomes;
- external-effect boundary;
- required concurrency tests.

`PhysicalWriteOwnershipManifest` repeats the invariant/mechanism/guard/constraint/lock-order/test mapping for every mutable object and permitted operation.

Activation and CI fail on a registered cross-row invariant without a complete profile.

## 5.2 Closed mechanism classes

### CC-1 — expected row version

Only when the complete invariant is represented by one row. Never sufficient for cross-row predicate conservation.

### CC-2 — stable guard-row lock

Default for aggregate conservation rooted in one authoritative basis/lineage:

1. derive stable tenant-scoped guard key;
2. lock guard `FOR UPDATE` before reading contributing rows;
3. acquire multiple guards in registered ascending order;
4. recompute full invariant under lock;
5. apply child writes and optional counter/version in one transaction;
6. emit occurrence/result before commit.

Counter is optimization/detection only and reconciles to authoritative rows.

### CC-3 — unique/partial-unique/exclusion constraint

Final database backstop where exact duplicate/overlap can be expressed. Application pre-check is explanation only.

### CC-4 — SERIALIZABLE predicate transaction

Used only where no natural guard row or exact constraint exists. Same logical command/idempotency identity across maximum three pre-effect retries. Exhaustion is typed `CONCURRENCY_RETRY_EXHAUSTED`.

### CC-5 — advisory technical lock

Only technical serialization such as migrations or exact numbering; not the default for business conservation.

## 5.3 Default/helper

- registered commands explicitly select READ COMMITTED, REPEATABLE READ or SERIALIZABLE before first statement;
- READ COMMITTED is permitted only when CC-1/CC-2/CC-3 fully protect the invariants;
- helper rejects missing/late isolation;
- no external effect exists before successful commit;
- allowed retry preserves logical command/idempotency identity;
- lock order is registered.

---

# 6. Frozen invariant assignments

## Allocation

`sum(active leaf allocation) <= authorized basis quantity`

- CC-2 AuthorizedRequirementBasis guard row;
- recompute all active leaves under lock;
- bound UOM/quantity policy;
- child write and basis version/counter atomically.

## Minimum/residual drawdown

- CC-2 exact minimum/credit lineage guard;
- recompute qualifying/prior/residual under lock;
- append application atomically;
- CC-3 unique contribution identity.

## One economic value once

- CC-2 conservation-group/economic-lineage guard;
- CC-3 contribution identity;
- recompute signed contributions under lock.

## Exclusive active scope

- normalized registered scope key;
- CC-3 partial unique/GiST exclusion where exact;
- CC-4 serializable predicate only where no exact constraint/guard exists.

---

# 7. W-100–W-111 closure

## W-100 database context mutation

Runtime `SECURITY DEFINER` and any unmanifested function/trigger/view/rule using `set_config`, `SET ROLE`, dynamic context mutation or reserved context settings are prohibited. CI catalog scan fails. No exception can alter tenant/principal/project/authority context.

## W-101 projection isolation

All tenant-owned projection/search/report/export/control tables use ENABLE + FORCE RLS and non-bypass roles. Query predicates are additional, never sole isolation.

## W-102 compatibility artifact

`ReleaseCompatibilityManifestVersion` binds release/images, API/browser ranges, schema phase, operation/field/schema/metric/config versions, payload readers, in-flight dispositions, rollback/drain deadline and conformance. Deployment/rollback fail outside it.

## W-103 numeric coercion

PostgreSQL numeric OIDs remain strings. JavaScript-number parser override prohibited. Real tests cover numeric(38,12)/(38,18), negative, maximum scale and beyond IEEE-754 range; JSON remains decimal strings.

## W-104 registered calculation

Versioned TypeScript exact-decimal executor is normative. SQL exact-numeric pre-aggregation is allowed only through product-owned versioned calculation plan/function, no hidden rounding, and golden/property equivalence. Final policy rounding/disposition is explicitly bound.

## W-105 source cut

Every load-bearing metric/report uses exactly:

1. AUTHORITATIVE_REPEATABLE_READ_SET plus persisted row IDs/versions;
2. PROJECTION_WATERMARK_SET with reconstructable per-source watermarks;
3. MATERIALIZED_INPUT_SET.

Wall-clock/latest-index alone prohibited.

## W-106 schema ordering

- B02 registry infrastructure only;
- B06 creates sourcing-specific response schema/field keys/attachments/acceptance policy before issue;
- B07 captures against those versions;
- B08 normalizes/compares same semantics prospectively.

No B06/B07 forward dependency.

## W-107 local evidence

Every block completion manifest requires its own authorization/isolation, security/privacy/telemetry, resource limits, migration/rollback and block-NFR evidence. B14 consolidates but cannot waive.

## W-108/W-109 audit completeness

This packet defines PA-G1–PA-G15 and the Round-2 bundle includes actual graph, traceability, module map, proof map and prompt.

## W-110 reviewer

Every block requires an `Independent Build-Conformance Reviewer` independent from builder and able to fail, plus architecture/conformance reviewer and specialists as required.

## W-111 Arabic search

B12 owns `ArabicSearchRelevanceDecision` using representative UAE procurement corpus/query set, deciding between PostgreSQL profile, product-owned normalization/tokenization or separately governed search projection.

---

# 8. PA-G1–PA-G15 exact definitions

- PA-G1 — every authoritative fact has one physical owner/write path.
- PA-G2 — command acceptance, idempotency, concurrency and authoritative effect are transactionally safe.
- PA-G3 — evidence metadata/payload acknowledgment and restore are coherent.
- PA-G4 — async/effect-indeterminate branches are representable and recoverable.
- PA-G5 — tenant/project/context isolation is enforced at every data/tool path.
- PA-G6 — derived search/report/control stores cannot write truth.
- PA-G7 — immutable correction, contribution and report history are physically supportable.
- PA-G8 — external supplier path works without account/network/named connector.
- PA-G9 — UI cannot bypass operations or hide disclosure and has recovery/version handling.
- PA-G10 — NFR SLIs and conformance are measurable, not aspirational.
- PA-G11 — restore preserves authority, evidence, idempotency, holds and history.
- PA-G12 — AI can be absent/replaced without breaking A0–A3.
- PA-G13 — no second XL or generic platform appears.
- PA-G14 — architecture decomposes into bounded acyclic build blocks without semantic invention.
- PA-G15 — code remains locked until explicit authorization.

Internal result: PA-G1–PA-G15 PASS.

---

# 9. Module/data/runtime map

Deployables:

- API — transport, session/context establishment, operation/query dispatch; no direct domain SQL.
- Worker — jobs/projections/file/render/transport/reconciliation; no broad service authority.
- Internal web — conventional internal surfaces; no truth/automatic command replay.
- External web — secure tasks/uploads/responses/status; no internal routes/data/network profile.
- Migration job — reviewed migrations only.

Authoritative module families:

- identity/tenancy/authority;
- configuration/registries;
- operations;
- audit/security;
- async/publication/reconciliation;
- evidence/files;
- communication;
- requirements/allocation;
- sourcing;
- external participation;
- submissions;
- normalization/comparison;
- recommendation/approval/award;
- handoff;
- reporting/controls;
- integration/migration;
- gated P07;
- disabled/gated AI.

No module imports another module persistence/migrations. Cross-module writes use registered operation or explicit same-transaction application contract. Derived stores cannot write source schemas.

---

# 10. NFR/security/deployment proof ownership

Physical proof is assigned across blocks:

- semantic RPO0 — B02/B03/B14 crash/failover;
- evidence payload/metadata — B04/B14 crash/restore;
- isolation — B02 and every later block;
- no duplicate external effect — B03/B13;
- continuation before transmission — B10/B11;
- immutable correction/history — B03/B08/B17;
- exact money — B01 foundation, B08 and B16/B17;
- report subset/range/block — B12;
- immutable issued artifacts — B04/B12;
- provider-neutral A0–A3 — B09–B15;
- AI-off — all deterministic blocks/B18.

B14 performs full-system load, restore, security and release proof but predecessor block evidence is mandatory.

---

# 11. 18-block graph

1. B01 Engineering Foundation
2. B02 Platform Kernel: tenancy, authority, operations, idempotency, concurrency, continuation and audit
3. B03 Async/event/publication/reconciliation
4. B04 Evidence/files/issued artifacts/communication
5. B05 Requirements/allocation
6. B06 Sourcing/RFQ/invitations/grants/issue and response schema activation
7. B07 Supplier submissions/revisions/buyer capture
8. B08 Normalization/comparison and field mapping
9. B09 Recommendation/approval/AwardDecision/handoff
10. B10 Internal conventional web
11. B11 External secure-task participation
12. B12 Reporting/controls/search/export
13. B13 Integration/migration/provider-neutral email
14. B14 NFR/security/restore/release hardening
15. B15 Deterministic A0–A3 validation/pilot instrumentation
16. B16 P07 Commitment/change — V4 gated
17. B17 P07 claims/certification/correction/reporting — V4 gated
18. B18 AI substrate/capabilities — V6 gated

Causal path:

B01 → B02 → B03 → B04 → B05 → B06 → B07 → B08 → B09 → B10/B11 → B12 → B13 → B14 → B15 → optional B16/B17 or B18.

B10/B11 may parallel after stable backend/shared transport contract. B12 waits for both disclosure contracts.

---

# 12. Requirement traceability result

- MR-001–MR-092 mapped: 92/92.
- FULLY_TRACED: 66.
- PHYSICAL_PROOF_REQUIRED: 19, each has a proof block.
- EXTERNAL_VALIDATION_REQUIRED: 5, each has V1/V2 decision ownership.
- LEGAL_EVIDENCE_REQUIRED: 1, owned by gated legal/P07 profile.
- NON_SPINE_DEFERRED: 1, ADR-0011 detailed suspense mechanics in B16.
- ARCHITECTURE_GAP: 0.

Concurrency ownership additions:

- B01 helper/fixtures/manifests;
- B02 operation concurrency registry/reference profiles;
- B05 allocation conservation;
- B08 exact data/calculation and relevant identities;
- B12 calculation/source cut;
- B16/B17 P07 conservation/drawdown/exclusivity.

---

# 13. B01-P01 v0.2 required additions

B01 remains business-empty and incorporates v0.1 plus:

1. explicit isolation helper and exact transaction-isolation proof;
2. real PostgreSQL write-skew negative control;
3. guard-row and SERIALIZABLE protected fixtures;
4. lock-order/deadlock fixture;
5. ConcurrencyProfileVersion/PhysicalWriteOwnershipManifest validators;
6. executable no-raw-pool public-surface check;
7. numeric-string parser/round-trip tests;
8. database-object security catalog scan;
9. ReleaseCompatibilityManifestVersion scaffold;
10. block-local security/NFR evidence;
11. independent reviewer roles.

It still excludes tenant/business schemas, auth, operations, evidence acceptance, procurement workflows, reporting, P07 and AI.

---

# 14. Required Round-2 attacks

At minimum independently execute:

1. concurrent allocation write skew under unprotected RC, CC-2 guard and CC-4 serializable;
2. concurrent one-value-once contribution;
3. concurrent minimum/residual drawdown;
4. concurrent exclusive-scope activation;
5. multiple guard lock ordering/deadlock;
6. serializable retry under same logical identity and no external effect;
7. context-mutating database object attempt;
8. projection-table cross-tenant read attempt;
9. numeric parser override/precision loss;
10. SQL calculation divergence from registered reference;
11. unreconstructable report watermark;
12. RFQ issue before response schema activation;
13. block completion trying to defer security/NFR to B14;
14. B01 prompt simulation and rollback;
15. ordinary A0–A3 across graph with all optional systems disabled.

Add your own scenarios.

---

# 15. Required response

Return exactly:

- VERDICT
- CONCURRENCY EXECUTIONS
- PHYSICAL REGRESSION EXECUTIONS
- BLOCKERS
- WATCHES / NON-BLOCKING DEBT
- PA-G1–PA-G15 CHECK
- DECOMPOSITION / TRACEABILITY CHECK
- B01-P01 V0.2 CHECK
- REGRESSION CHECK
- FREEZE READINESS
- FIRST BUILD PROMPT READINESS

PASS wording:

`PASS — P2.1 physical architecture and P2.2 build decomposition can freeze; B01-P01 v0.2 is ready for execution after explicit implementation authorization and the recorded V1/V2 sequencing decision.`

FAIL wording:

`FAIL — Phase 2 architecture/decomposition remains open; blockers below must be remediated before freeze or build-prompt release.`

On PASS:

`READY TO FREEZE P2.1/P2.2 AFTER FINAL CHECKPOINT.`

`B01-P01 V0.2 READY BUT EXECUTION LOCKED UNTIL EXPLICIT AUTHORIZATION AND V1/V2 SEQUENCING DECISION.`

A clean PASS requires NO to:

> Does any later implementation still need to choose a load-bearing concurrency, isolation, cross-store, effect-recovery, tenancy, calculation, reporting-cut, compatibility, block-order or B01-completion protocol?