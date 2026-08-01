# P2.1 — Internal Hostile Audit v0.1

**Date:** 2026-08-02  
**Status:** FAIL / REMEDIATION REQUIRED  
**Candidate:** `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_1.md`  
**Code:** LOCKED

---

# 1. Verdict

`FAIL — the selected topology is sound, but five physical control gaps can still let implementation weaken frozen semantics.`

No Phase 1 business architecture must reopen. The defects are physical protocol/enforcement gaps.

---

# 2. Blockers

## BL-P21-01 — cross-store evidence acknowledgment and restore are not an exact protocol

The candidate says acknowledgment occurs after payload durability and metadata commit but does not close:

- which write occurs first;
- what identity survives a crash between object put and DB commit;
- whether capture acknowledgment means quarantined capture or accepted evidence;
- how issued artifact bytes and issue rows are coordinated;
- how a database point-in-time restore selects the correct object versions;
- how orphan and missing payloads are classified without fabricating acceptance.

Failure path:

1. payload put succeeds;
2. DB metadata commit/response is lost;
3. retry creates a second EvidenceVersion or marks the first absent;
4. later restore retrieves a different object version or omits a held artifact.

Required remediation:

- closed upload/artifact state machine;
- durable UploadSession/ArtifactBuild identity before object transfer;
- provider version/checksum verification;
- exact acknowledgment classes;
- orphan/missing reconciliation;
- cross-store recovery manifest and restore verification.

## BL-P21-02 — pooled RLS context is not fail-closed enough

The candidate requires transaction-local tenant/principal/context but does not define:

- the only permitted database entry point;
- how a connection with stale session settings is prevented;
- how missing context affects RLS expressions;
- how a global worker claims work without reading tenant payload;
- how current principal/represented-principal/authority context is verified after claim;
- how tests prove no bypass through table ownership, functions or maintenance paths.

Failure path:

A pooled connection retains or receives incorrect settings, and a query executes before context initialization or after job claim under service identity.

Required remediation:

- one `withExecutionContext` transaction boundary;
- `SET LOCAL` only plus verification;
- deny-by-default RLS expressions;
- no raw pool export;
- claim envelope separated from tenant payload;
- fresh tenant-scoped transaction after claim;
- explicit role/policy audit tests.

## BL-P21-03 — job retry and external-effect recovery can still collapse

The candidate separates effect stages but one generic job table/lease model can cause a worker lease expiry after transmission to be interpreted as a retryable job.

Failure path:

1. connector worker records job attempt;
2. sends externally;
3. crashes before effect stage update;
4. lease expires;
5. queue retries job and duplicates transmission.

Required remediation:

- separate job execution state from PublicationIntent/TransportAttempt/effect state;
- atomic transition to an effect-bearing attempt identity before network call;
- lease expiry after possible send produces `EFFECT_INDETERMINATE`, not retry eligibility;
- safe retry class derived from effect stage and positive evidence;
- weighted fairness/tenant quotas/deadline behavior;
- worker-fencing token so stale workers cannot commit results.

## BL-P21-04 — one-writer module ownership is not enforceable inside the shared database

The candidate prohibits imports, but a shared runtime database package or unrestricted schema grants can let any module write any table.

Failure path:

A reporting, integration or UI-adjacent package imports the general DB client and updates a sourcing/decision table directly, bypassing operation guards while still compiling.

Required remediation:

- database client is never exported as a general application dependency;
- each module owns a private persistence package and schema manifest;
- architecture tests forbid cross-module persistence/migration imports;
- SQL privilege manifest is generated/tested per runtime lane;
- reporting/search roles are read-only to source schemas;
- write-set audit verifies every mutable table has exactly one owning module and operation path;
- exceptions require explicit same-transaction contract, not raw SQL access.

## BL-P21-05 — release/version skew can silently rebind browser commands and in-flight work

The candidate mentions compatibility windows but does not close:

- old internal/external browser build submitting against changed OperationKey/schema;
- stale confirmation/preview after deploy;
- queued jobs whose payload decoder or module version is removed;
- in-flight external tasks after schema/field/event version change;
- rollback after new migration.

Failure path:

An old browser submits a previously valid command after operation/schema change, or a new worker interprets an old job payload under new meaning.

Required remediation:

- client/release/operation/schema version binding on commands;
- API compatibility manifest and typed `CLIENT_UPGRADE_REQUIRED`/`PREVIEW_STALE` outcomes;
- transition disposition for sessions, external tasks, drafts, confirmations, jobs and proposals;
- old payload readers retained until drain/expiry/migration;
- expand/contract schema windows and release gates;
- application rollback cannot reinterpret data or in-flight work.

---

# 3. Watches

## W-P21-01 — PostgreSQL search contention

PostgreSQL search is acceptable only with separate connection/resource budgets, derived tables and extraction thresholds. Arabic relevance requires prototype evidence.

## W-P21-02 — numeric scale

`numeric(38,12)` amount and `numeric(38,18)` rate are physical defaults. A registered money/calculation policy must reject out-of-range/scale values and define canonical serialization; database coercion cannot silently perform business rounding.

## W-P21-03 — session database load

PostgreSQL-backed sessions are acceptable at stated envelopes, but session cleanup/indexing and revocation latency require proof. A later cache cannot become authority.

## W-P21-04 — local object-store/scanner tooling

Local MinIO/ClamAV or equivalent is a development choice, not a production vendor or proof of provider durability/scanning quality.

## W-P21-05 — module extraction

Extraction triggers must not be interpreted as automatic service creation; every extraction requires change control and migration/effect equivalence.

---

# 4. Gate result

- PA-G1 one writer — FAIL on BL-P21-04
- PA-G2 command/idempotency/effect safety — FAIL on BL-P21-03
- PA-G3 evidence coherence — FAIL on BL-P21-01
- PA-G4 async/indeterminate — FAIL on BL-P21-03
- PA-G5 isolation — FAIL on BL-P21-02
- PA-G6 derived stores — PASS with W-P21-01
- PA-G7 correction/history — PASS with numeric watch
- PA-G8 external no-account — PASS candidate
- PA-G9 UI operation/disclosure — FAIL on version skew branch
- PA-G10 measurable NFR — PASS candidate/proof later
- PA-G11 restore — FAIL on BL-P21-01
- PA-G12 AI-off — PASS
- PA-G13 no second XL — PASS
- PA-G14 decomposable blocks — PENDING P2.2
- PA-G15 code lock — PASS

---

# 5. Regression result

- Phase 1 reopen: NO
- second XL: CLEAN
- A0–A3 dependency regression: NO
- selected topology rejected: NO
- product code unlock: NO

The preferred physical direction remains valid after narrow remediation.