# Phase 2 — Internal Post-Claude Round 2 Recheck v0.1

**Date:** 2026-08-02  
**Status:** PASS / CLAUDE ROUND 3 READY  
**P2.1/P2.2:** OPEN  
**B01-P01 v0.3:** AUDIT READY / EXECUTION LOCKED

---

# 1. Verdict

`PASS — BL-P21-07 and W-112–W-119 are closed internally. P2.1 v0.4, P2.2 v0.3 and B01-P01 v0.3 are ready for one final independent hostile freeze audit.`

This internal verdict does not freeze Phase 2.

---

# 2. Inputs

- Claude Round 2 verdict;
- P2.1 candidate v0.3 and v0.4;
- Round 2 remediation;
- Invariant Register v0.1;
- Frozen-Clause Invariant Coverage Matrix v0.1;
- P2.2 graph v0.3;
- Requirement-to-Block Traceability v0.2;
- Block Completion Evidence Manifest v0.3;
- B01-P01 v0.3;
- Phase 1 frozen master package and corrected MR-001–MR-092 set.

---

# 3. Completeness attacks

## 3.1 Remove one frozen source row

Removed MR-009 from a negative coverage fixture while leaving all objects/register entries unchanged.

Result:

- source expected/found count mismatch;
- coverage compiler FAIL;
- freeze/activation blocked.

## 3.2 Add an invariant with no owner

Added `INV-TEST-MISSING-OWNER`.

Result:

- register validator FAIL;
- no activation.

## 3.3 Omit an invariant from a mutable object

An effective-dated authority object omitted INV-008 from its reverse references while the register named the object family.

Result:

- bidirectional compiler mismatch;
- block completion FAIL.

## 3.4 Add an effective-dated object with no overlap disposition

Result:

- compiler detects effective-dated mutable family;
- missing CC-3/CC-4/not-applicable disposition;
- FAIL even if the author did not declare a concurrency profile.

## 3.5 Unknown reverse invariant

A mutable object referenced a nonexistent invariant ID.

Result: FAIL.

## 3.6 Newly encountered invariant in block

A block completion manifest listed a new candidate but no register reconciliation.

Result: unresolved invariant candidates > 0; FAIL; successor locked.

---

# 4. Effective-period race replay

Scenario:

- one current effective version;
- two concurrent replacements close the same prior row and insert overlapping new rows.

Unprotected READ COMMITTED:

- both can commit;
- overlap reproduced.

CC-3:

- exact scope/range exclusion constraint rejects one transaction;
- one current effective range remains.

CC-4:

- intentionally inexact predicate under SERIALIZABLE produces serialization failure/retry;
- same logical command identity preserved;
- retry observes new range and returns typed conflict.

The compiler inventory requires this disposition for ownership, authority, configuration, response schema, metric/policy, connector, P07, AI and release families.

Result: PASS.

---

# 5. Guard-row and lock-order replay

## Missing guard

`SELECT FOR UPDATE` on absent row was executed as a negative control.

Result:

- no lock protection;
- profile rejected unless eager or insert-on-conflict materialization is declared.

## Lazy materialization

Two transactions run idempotent guard insert then lock.

Result:

- one unique guard;
- both serialize on the same row;
- contributor reads occur after lock.

## Global order

All callers canonicalize:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

Result:

- same sorted order across profiles;
- duplicates removed;
- ordered acquisition completes;
- reversed manual order reproduces bounded conflict/deadlock negative control.

Result: PASS.

---

# 6. Exact-type and calculation replay

- numeric beyond IEEE-754 remains decimal string;
- int8 beyond `Number.MAX_SAFE_INTEGER` remains integer string/checked bigint;
- parser override to JavaScript number is rejected;
- JSON serialization preserves exact strings;
- SQL division plan without declared intermediate scale fails validation;
- approved SQL plan matches TypeScript exact-decimal reference vectors.

Result: PASS.

---

# 7. B01 scope and rollback replay

B01 v0.3:

- uses only test-only `testkit_concurrency` fixture schema;
- creates no tenant/procurement/product table;
- excludes fixture schema from product migration inventory and production roles;
- retains all v0.1 rollback rules;
- forbids `git clean -fd` and broad Docker prune;
- uses scoped teardown;
- preserves unrelated repository files/resources;
- records F1–F5 checkpoint evidence;
- requires independent review outside the authoring session.

Result: PASS.

---

# 8. 92-row and 102-invariant audit

- MR rows with coverage disposition: 92/92;
- missing MR rows: 0;
- invariant families: INV-001–INV-102;
- invariant IDs without owner: 0;
- concurrency-sensitive invariants without enforcement obligation: 0;
- effective-period family inventory without mandatory disposition: 0 permitted;
- requirements without primary block: 0;
- physical-proof requirements without proof owner: 0;
- external-validation rows without gate owner: 0;
- legal/non-SPINE rows without owner: 0.

Result: PASS.

---

# 9. Regression replay

- pooled RLS and worker claim isolation — PASS;
- cross-store evidence and skewed restore — PASS;
- external-effect attempt-ready/lease/fencing — PASS;
- module one-writer enforcement — PASS;
- release/browser/job version compatibility — PASS;
- exact report source cuts — PASS;
- B06 response schema before issue — PASS;
- B14 cannot waive predecessor proof — PASS;
- ordinary A0–A3 with P07/connectors/account/network/chat/AI/warehouse off — PASS;
- second XL — CLEAN;
- Phase 1 reopen — NO.

---

# 10. PA-G1–PA-G15

- PA-G1 one physical owner/write path — PASS
- PA-G2 command/idempotency/concurrency/effect — PASS
- PA-G3 evidence payload/metadata/restore — PASS
- PA-G4 async/effect indeterminacy — PASS
- PA-G5 tenant/project/context isolation — PASS
- PA-G6 derived stores non-authoritative — PASS
- PA-G7 correction/contribution/report history — PASS
- PA-G8 no-account/no-network supplier path — PASS
- PA-G9 UI operation/disclosure/recovery — PASS
- PA-G10 measurable NFR structure — PASS
- PA-G11 restore semantics — PASS
- PA-G12 AI absent/replaceable — PASS
- PA-G13 no second XL/platform — PASS
- PA-G14 bounded acyclic decomposition/traceability — PASS
- PA-G15 code/authorization lock — PASS

---

# 11. Final internal result

No later implementation is permitted to decide whether a frozen invariant exists or whether it needs concurrency protection. The register, source coverage and reverse mapping compiler make that decision explicit before activation and re-test it at every block.

P2.1/P2.2 remain open pending independent Claude Round 3 PASS and final freeze checkpoint.