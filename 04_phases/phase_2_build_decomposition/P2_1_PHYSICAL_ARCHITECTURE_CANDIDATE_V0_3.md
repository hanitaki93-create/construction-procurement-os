# Construction Procurement OS — P2.1 Physical Architecture Candidate v0.3

**Date:** 2026-08-02  
**Status:** CLAUDE-REMEDIATED CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Phase 1:** FROZEN  
**Code:** LOCKED

---

# 1. Candidate composition

This candidate incorporates without alteration the complete v0.2 physical architecture body:

- path: `04_phases/phase_2_build_decomposition/P2_1_PHYSICAL_ARCHITECTURE_CANDIDATE_V0_2.md`
- blob SHA: `09e92ac7960c1dd360c5d53d14218c82bb76ab88`

It adds and controls the following where v0.2 was silent or less specific:

1. `P2_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`;
2. the `ConcurrencyControlProtocol` below;
3. W-100–W-111 closures;
4. P2.2 graph v0.2 and B01-P01 v0.2 when issued.

No topology, authoritative state, evidence, effect, tenancy or release decision from v0.2 is removed.

---

# 2. ConcurrencyControlProtocol

## 2.1 Mandatory operation declaration

Every registered state-changing operation declares a `ConcurrencyProfileVersion` containing:

- transaction isolation;
- invariant IDs touched;
- enforcement mechanism per invariant;
- exact guard/resource identity and lock order;
- named database constraints;
- expected-version members;
- safe-retry class and maximum attempts;
- typed conflict/deadlock/serialization outcomes;
- external-effect boundary;
- required concurrency tests.

Activation and CI fail when any registered conservation, exclusivity, uniqueness, sequence or one-value-once invariant lacks a complete profile.

The `PhysicalWriteOwnershipManifest` includes the same invariant/mechanism/guard/constraint/lock-order/test mapping for every mutable object and operation.

## 2.2 Permitted classes

### CC-1 — expected row version

Permitted only when the entire invariant is represented by one row. It cannot satisfy a cross-row predicate.

### CC-2 — stable guard-row lock

Default for conservation rooted in an exact authoritative basis or lineage.

Protocol:

1. derive stable tenant-scoped guard key;
2. acquire `SELECT ... FOR UPDATE` before reading contributions;
3. acquire multiple guards in registered ascending order;
4. recompute the complete invariant under lock;
5. apply child writes and optional counter/version in the same transaction;
6. emit immutable result/occurrence before commit.

Materialized counters are optimization/detection only and reconcile to authoritative rows.

Selected for:

- allocation consumption per AuthorizedRequirementBasis;
- minimum/residual drawdown per exact lineage;
- economic contribution/conservation group one-value-once;
- other aggregate invariants with one stable root.

### CC-3 — unique/partial-unique/exclusion constraint

Final race-safe backstop where PostgreSQL can exactly represent duplicate or overlap prohibition. Application pre-checks do not replace the constraint.

Selected for:

- exact idempotency/contribution/source identities;
- one active normalized exclusive scope;
- exact effective-range overlap rules.

### CC-4 — SERIALIZABLE predicate transaction

Used only where no natural guard row or exact constraint exists.

All predicate reads/writes execute inside the serializable transaction. Serialization retry uses the same logical command/idempotency identity, maximum three bounded attempts, and only when no external effect can have occurred. Exhaustion returns typed `CONCURRENCY_RETRY_EXHAUSTED`.

### CC-5 — advisory lock

Allowed only for technical serialization such as migrations or exact numbering allocation. It is not the default for commercial conservation.

## 2.3 Default and helper contract

Registered commands explicitly request `READ COMMITTED`, `REPEATABLE READ` or `SERIALIZABLE` before the first statement. The physical default is `READ COMMITTED` only for operations fully protected by CC-1/CC-2/CC-3.

`withExecutionContext`:

- requires an exact isolation parameter for commands;
- prohibits isolation change after the first statement;
- preserves command/idempotency identity across allowed database retries;
- creates no external effect before successful commit;
- records attempt count and typed terminal conflict;
- uses registered guard lock order.

---

# 3. Assigned cross-row invariants

## Allocation conservation

- CC-2 lock AuthorizedRequirementBasis guard row;
- recompute active leaf quantity under lock;
- compare using bound UOM/quantity policy;
- write child allocation plus basis version/counter in one transaction.

## Minimum/residual drawdown

- CC-2 lock exact credit/minimum lineage;
- recompute qualifying amount, prior applications and residual;
- append application and update lineage version atomically;
- CC-3 unique contribution identity blocks duplicate use.

## One economic value once

- CC-2 conservation-group/economic-lineage guard;
- CC-3 exact contribution identity;
- signed total recomputed before new contribution/correction.

## Exclusive active scope

- registered normalized scope key;
- CC-3 partial unique or GiST exclusion constraint where exact;
- CC-4 serializable predicate until an exact stable guard exists where the scope cannot be represented by a constraint.

---

# 4. Database-object and projection isolation hardening

- runtime `SECURITY DEFINER` functions are prohibited by default;
- database objects may not mutate tenant/principal/project/authority execution settings;
- CI catalog scans fail on `SECURITY DEFINER`, `set_config`, `SET ROLE`, dynamic context mutation or unmanifested security objects;
- tenant-owned projection/search/report/export/control tables use ENABLE + FORCE RLS;
- query filtering is additional, never sole tenant isolation.

---

# 5. Exact decimal and calculation execution

- PostgreSQL numeric OIDs remain decoded as strings;
- parser overrides to JavaScript `number` are prohibited;
- JSON decimal values are canonical strings;
- real PostgreSQL round-trip tests cover amount/rate precision, negative and beyond-IEEE-754 values.

Normative calculation is a versioned TypeScript exact-decimal executor.

SQL exact-numeric pre-aggregation is allowed only through product-owned versioned calculation plans/functions with no hidden business rounding and golden/property equivalence to the reference executor. Final policy rounding/disposition remains explicitly version-bound.

---

# 6. Reproducible reporting source cuts

Every load-bearing metric/report execution uses exactly one:

1. `AUTHORITATIVE_REPEATABLE_READ_SET` with persisted contributing row IDs/versions;
2. `PROJECTION_WATERMARK_SET` with exact reconstructable per-source watermarks;
3. `MATERIALIZED_INPUT_SET` with immutable member/value/version set.

Wall-clock or “latest index” is not a source cut. An unreconstructable cut blocks or returns a permitted limited result.

---

# 7. Release compatibility

The canonical physical artifact is `ReleaseCompatibilityManifestVersion`, enforced by deployment/rollback admission.

It binds build/image, API/browser ranges, schema phase, operation/field/schema/metric/config versions, payload readers, in-flight task/draft/proposal/confirmation dispositions, rollback/drain deadline and conformance result.

---

# 8. Registry/decomposition dependency

- B02 creates the product-controlled registry substrate only;
- B06 defines the sourcing response schema versions, field keys, mandatory attachments and acceptance policy required before issue;
- B07 captures against those exact versions;
- B08 uses the same semantics for normalization/comparison and cannot retroactively create or change submission meaning.

No B06/B07 forward dependency on B08 remains.

---

# 9. Arabic search decision

B12 owns `ArabicSearchRelevanceDecision` using a representative UAE procurement corpus and query set. It chooses only after evidence among:

- PostgreSQL exact/normalized/trigram sufficient;
- product-owned Arabic normalization/tokenization extension;
- separately governed external search projection.

No search engine is introduced by assumption.

---

# 10. Candidate status

The candidate claims BL-P21-06 and W-100–W-111 are closed, subject to:

- internal concurrency/release/decomposition recheck;
- revised B01 prompt audit;
- independent Claude Round 2 PASS.

P2.1/P2.2 freeze and code execution remain locked.