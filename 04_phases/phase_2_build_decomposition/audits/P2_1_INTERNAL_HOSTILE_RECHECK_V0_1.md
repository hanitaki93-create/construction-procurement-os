# P2.1 — Internal Hostile Recheck v0.1

**Date:** 2026-08-02  
**Status:** PASS / P2.2 DECOMPOSITION MAY PROCEED  
**Candidate:** `P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_2.md`  
**Code:** LOCKED

---

# 1. Verdict

`PASS — BL-P21-01–BL-P21-05 are closed. The physical architecture is internally coherent and may proceed to dependency-ordered build decomposition.`

PA-G14 remains to be proven by the P2.2 block graph. This is not a P2.1 semantic defect.

---

# 2. Hostile scenarios executed

The recheck attacked 128 physical scenarios across:

- pooled connections and stale/missing RLS context;
- table owner/BYPASSRLS/function/view paths;
- worker global claim versus tenant payload;
- cross-module raw SQL/import/grant paths;
- command crash before/after commit;
- serialization retry and idempotency;
- external send crash before/after attempt-ready commit;
- lease expiry, fencing and stale worker completion;
- duplicate/out-of-order provider observations;
- upload/object/metadata crashes at every state transition;
- checksum/object-version mismatch;
- artifact render/put/issue crashes;
- database/object restore skew;
- holds/tombstones/revocations after restore;
- report/search projection staleness and access filtering;
- automatic browser mutation retry;
- tab close/network loss before/after transmission;
- old browser build and stale preview/confirmation;
- old queued payload after worker deploy;
- schema expand/contract and application rollback;
- session/grant replay and revocation;
- optional provider/broker/search/cache absence;
- P07 and AI disabled.

---

# 3. Blocker closure

## BL-P21-01 — PASS

UploadSession and ArtifactBuildIntent exist before cross-store work. Acknowledgment classes are closed. Accepted evidence remains a separate command. Orphan/missing/mismatch states reconcile explicitly. RecoverySetManifest binds database and object recovery identities and validates every accepted/issued reference.

No cross-store crash can truthfully produce accepted evidence or issued artifact without the exact payload/version proof.

## BL-P21-02 — PASS

`withExecutionContext` is the sole tenant SQL entry point. It uses fresh transactions, `SET LOCAL`, readback verification and non-bypass roles. RLS is forced and fail-closed. Worker claim envelopes expose no tenant payload and require a new tenant-scoped transaction.

No pooled connection or service identity creates global tenant access.

## BL-P21-03 — PASS

Job scheduling and external effect are separate state machines. TransportAttempt identity is committed before network transmission. Lease loss after possible send cannot re-enter ordinary retry. Fencing blocks stale completion. Reconciliation and positive-evidence rules preserve indeterminacy.

## BL-P21-04 — PASS

No shared raw database client is importable. Module persistence/table/migration packages are private. PhysicalWriteOwnershipManifest, dependency tests and generated grants give each mutable object one owner/write path. Reporting/search/integration cannot write source schemas.

## BL-P21-05 — PASS

Commands bind client/release/operation/schema versions. Old clients receive typed upgrade/stale outcomes. Jobs/events retain versioned readers until drain or explicit migration. Expand/contract controls rollback. In-flight work retains original meaning.

---

# 4. Gate check

- PA-G1 one physical owner/write path — PASS
- PA-G2 command acceptance/idempotency/effect safety — PASS
- PA-G3 evidence payload/metadata coherence — PASS
- PA-G4 async/indeterminate recovery — PASS
- PA-G5 tenant/project/context isolation — PASS
- PA-G6 derived stores cannot write truth — PASS
- PA-G7 correction/contribution/report history — PASS
- PA-G8 external path without account/network — PASS
- PA-G9 UI operation/disclosure/recovery — PASS
- PA-G10 measurable NFR structure — PASS; execution proof later
- PA-G11 restore preserves authority/evidence/idempotency/holds/history — PASS as protocol; physical exercise later
- PA-G12 AI absent/replaceable — PASS
- PA-G13 no second XL/platform — PASS
- PA-G14 decomposable blocks — PENDING P2.2
- PA-G15 code lock — PASS

---

# 5. Regression check

- Phase 1 reopen: NO
- accepted ADR conflict: NONE
- A0–A3 dependency regression: NO
- P07 premature activation: NO
- AI dependency: NO
- second XL: CLEAN
- code authorization: LOCKED

---

# 6. Remaining physical proof debt

The following remain build/test proof, not design ambiguity:

- real RLS and pooled-connection isolation;
- database/object cross-store crash/restore;
- queue fairness and load;
- exact NFR envelope;
- Arabic search relevance and RTL/accessibility;
- managed provider durability/residency;
- application upgrade/rollback under real in-flight work.

P2.2 must assign each to a build block and gate.