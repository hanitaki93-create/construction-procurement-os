# Phase 2 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-02  
**Status:** REMEDIATION COMPLETE / INTERNAL RECHECK REQUIRED  
**Blocker:** BL-P21-06  
**Watches:** W-100–W-111  
**Product code:** LOCKED

---

# 1. BL-P21-06 accepted

Claude correctly found that per-row optimistic versions under default PostgreSQL `READ COMMITTED` do not protect cross-row predicate and conservation invariants from write skew.

This remediation adds a closed `ConcurrencyControlProtocol`. It does not change any Phase 1 business invariant.

---

# 2. ConcurrencyControlProtocol

Every state-changing OperationDefinition declares one `ConcurrencyProfileVersion` containing:

- default transaction isolation;
- invariant IDs touched;
- enforcement mechanism for each invariant;
- exact guard/resource identity and lock ordering;
- database constraints relied upon;
- expected-version members;
- retry classification and maximum automatic attempts;
- conflict/deadlock/serialization typed outcomes;
- external-effect boundary;
- tests and evidence required.

An operation cannot activate if a frozen conservation, uniqueness, exclusivity, sequence or one-value-once invariant lacks a declared mechanism.

The `PhysicalWriteOwnershipManifest` is extended with:

- `invariant_ids`;
- `concurrency_mechanism`;
- `guard_relation` and guard-key derivation;
- `constraint_name` where applicable;
- `lock_order_rank`;
- `isolation_level`;
- `safe_retry_class`;
- owning operation handlers;
- required concurrency test IDs.

CI fails if a mutable object or operation touches a registered cross-row invariant without a complete declaration.

---

# 3. Permitted mechanism classes

## CC-1 — single-row expected version

Use only when the complete invariant is represented by one locked/versioned row.

Protocol:

- `UPDATE ... WHERE id = ? AND version = expected`;
- exactly one updated row is required;
- version increments in the authoritative transaction;
- zero rows returns typed stale/conflict outcome.

It is not sufficient for a predicate spanning independently writable rows.

## CC-2 — stable guard-row lock

Default mechanism for aggregate conservation rooted in one authoritative basis/lineage.

Protocol:

1. derive one stable guard key from tenant plus the frozen invariant root;
2. lock the owning guard row using `SELECT ... FOR UPDATE` before reading contributing rows;
3. acquire multiple guards in ascending registered lock-order tuple;
4. recompute the complete invariant under the lock from authoritative rows, optionally verifying a materialized counter;
5. apply child writes and any counter/version update inside the same transaction;
6. emit the invariant result/occurrence before commit.

A materialized counter is an optimization and detection aid, not the sole source of truth. It must be reconciled to authoritative contribution rows and cannot be updated outside the owning operation.

This mechanism is selected for:

- RequirementAllocation consumption per current authorized basis;
- minimum/residual drawdown per exact qualifying lineage;
- economic contribution/conservation group one-value-once;
- any bounded aggregate with a stable authoritative parent/lineage row.

## CC-3 — database uniqueness/exclusion constraint

Use when PostgreSQL can express the complete forbidden overlap/duplicate relation.

Protocol:

- a unique, partial unique or GiST exclusion constraint is the final race-safe backstop;
- application pre-checks may improve explanation but are not enforcement;
- constraint violation maps to a typed deterministic conflict outcome;
- the exact constraint/version is named in the operation profile.

This mechanism is selected for:

- one active basis per exact exclusive declared scope where a normalized scope key and active/effective predicate are representable;
- immutable idempotency, contribution and source-identity duplicates where exact keys exist;
- effective-time overlap where an exclusion range constraint exactly represents the rule.

## CC-4 — SERIALIZABLE predicate transaction

Use only where no stable guard row or exact database constraint can represent the invariant without creating an artificial universal root.

Protocol:

- operation declares `SERIALIZABLE` before any query;
- all reads/writes required for the predicate occur inside that transaction;
- serialization failure retries under the same logical command/idempotency identity only when no external effect can have occurred;
- default automatic maximum is three attempts with bounded jitter;
- exhaustion returns typed `CONCURRENCY_RETRY_EXHAUSTED`, not a generic server error;
- repeated contention is measured and may trigger creation of a domain-valid guard row through reviewed physical change.

## CC-5 — advisory lock

Advisory locks are permitted only for technical serialization such as migration execution or display/legal number allocation where the stable key and ownership are exact.

They are not the default for business conservation because referential enforcement and orphan-lock meaning are weaker than row locks.

---

# 4. Default isolation and transaction helper

The physical default remains PostgreSQL `READ COMMITTED` for ordinary queries and operations whose complete invariants are protected by CC-1, CC-2 or CC-3.

Every operation transaction explicitly passes:

- `READ COMMITTED`;
- `REPEATABLE READ`; or
- `SERIALIZABLE`.

There is no implicit driver default for a registered command.

`withExecutionContext`/the transaction helper must:

- accept an exact isolation parameter before the first statement;
- reject unsupported/missing isolation for registered commands;
- expose no method to change isolation after the first statement;
- preserve the same logical command/idempotency identity across allowed serialization/deadlock retries;
- create no outbox/publication effect until the successful transaction commits;
- record attempt count and final conflict disposition without multiplying command identity.

Deadlock retry is allowed only when the profile classifies it as pre-effect safe. Consistent registered guard lock order is mandatory to minimize deadlocks.

---

# 5. Frozen invariant assignments

## Allocation conservation

Invariant:

`sum(active leaf allocated quantity for AuthorizedRequirementBasis) <= current authorized quantity`

Mechanism:

- CC-2 lock the exact AuthorizedRequirementBasis/conservation guard row;
- recompute active leaf allocation under lock;
- apply allocation mutation and basis version/counter update atomically;
- amount/UOM normalization policy version is bound before comparison;
- concurrent commands against different leaf rows serialize on the same basis guard.

## Minimum/residual drawdown

Invariant:

`applied_credit = min(qualifying_value, residual_before_credit)` and one qualifying amount is consumed once.

Mechanism:

- CC-2 lock exact minimum/credit lineage guard;
- recompute qualifying value, prior applications and residual under lock;
- append the new application/contribution and update lineage version in one transaction;
- CC-3 unique contribution identity prevents duplicate economic application.

## One economic value once

Mechanism:

- CC-2 lock the exact conservation-group/economic-lineage guard;
- CC-3 unique key on contribution identity/disposition where exact duplicate prevention is expressible;
- recompute signed contributions under lock before accepting new contribution or correction.

## Exclusive active scope

Mechanism:

- normalize the exact declared scope key through the registered policy;
- use CC-3 partial unique/exclusion constraint for exact active/effective overlap;
- where scope membership is predicate-based and not exactly representable, use CC-4 SERIALIZABLE until an explicit stable scope guard is introduced.

---

# 6. W-100–W-111 closure

## W-100 — context-mutating database objects

Prohibited by default:

- `SECURITY DEFINER` runtime functions;
- functions/triggers/views/rules containing `set_config`, `SET ROLE`, execution-context setting names or dynamic SQL capable of altering context;
- runtime creation of functions, policies, triggers or views.

A generated database-object security manifest and CI catalog scan fail on any such object unless a narrowly reviewed exception is named, fixed-search-path, non-context-mutating and hostile-tested. No exception may alter tenant/principal/project/authority-context settings.

## W-101 — RLS on projections

Every tenant-owned projection, search document, report execution/result, export staging and control queue table is a tenant table for RLS purposes.

It uses ENABLE + FORCE RLS and non-bypass roles. Query predicates and access filtering are additional controls, never the sole isolation mechanism.

Cross-tenant aggregate/platform tables require an explicit OUT/REFERENCE classification and registered privileged operation; they cannot be ordinary projections.

## W-102 — compatibility artifact

The canonical artifact is `ReleaseCompatibilityManifestVersion`.

It binds:

- release/build and image digests;
- API/browser compatibility range;
- schema migration head and expand/contract phase;
- operation/field/schema/metric/configuration versions;
- supported job/event payload readers;
- session/task/draft/proposal/confirmation dispositions;
- rollback/drain deadline;
- conformance result.

Deployment admission and rollback tooling read this artifact and fail closed outside its declared window.

## W-103 — numeric driver coercion

The PostgreSQL numeric/decimal OIDs remain string-decoded. Global or module-local parser overrides to JavaScript `number` are prohibited.

B01 adds real PostgreSQL round-trip tests for `numeric(38,12)` and `numeric(38,18)`, including maximum scale, negative values and values beyond IEEE-754 exact range. JSON serialization must remain canonical decimal strings.

## W-104 — registered calculation execution

The normative reference executor is a versioned TypeScript exact-decimal calculation package implementing product-registered operators and rounding policies.

SQL may perform set filtering, joins and exact-numeric pre-aggregation only when:

- the exact operator/executor version is declared;
- no hidden business rounding occurs;
- a versioned SQL function/expression is product-owned rather than tenant-authored;
- cross-executor golden/property tests prove equivalence to the reference executor;
- final policy rounding and disposition are executed/bound by the registered calculation plan.

An unregistered SQL expression cannot become a load-bearing metric or commercial calculation.

## W-105 — reproducible source cut

Every load-bearing MetricExecution/ReportExecution uses exactly one registered cut mode:

1. `AUTHORITATIVE_REPEATABLE_READ_SET` — repeatable-read transaction plus persisted exact contributing row IDs/versions;
2. `PROJECTION_WATERMARK_SET` — exact per-source/per-projection event watermark with rows versioned so the cut can be reconstructed;
3. `MATERIALIZED_INPUT_SET` — persisted immutable input member/value/version set.

Wall-clock query time or “latest index” alone is not a reproducible cut. If the projection cannot reconstruct the requested watermark, execution blocks or returns a permitted limited disposition.

## W-106 — B06/B07 schema dependency

Resolved without adding a block:

- B02 creates only the product-controlled registry substrate and version/admission mechanics;
- B06 defines and activates the sourcing-specific response schema versions, field keys, mandatory attachments and `ExternalSubmissionAcceptancePolicy` required to issue each event;
- B07 captures responses against those exact versions;
- B08 consumes the same keys and extends them with normalization/comparison mappings and buyer-adjustment rules; it does not retroactively create the submission semantics.

B06 therefore has no forward dependency on B08.

## W-107 — B14 deferral risk

Every block completion manifest must include block-local:

- authorization/isolation evidence;
- security tests;
- telemetry/measurement-health evidence;
- resource/limit tests;
- migration/rollback evidence;
- block-specific NFR result or explicit not-applicable reason.

B14 consolidates and executes system-level proof; it cannot waive missing predecessor evidence.

## W-108/W-109 — audit evidence completeness

Round 2 includes:

- exact PA-G1–PA-G15 definitions;
- full physical candidate/remediation;
- module/data/runtime map;
- NFR/security/deployment proof map;
- complete 18-block graph;
- MR-001–MR-092 traceability;
- B01 prompt v0.2.

## W-110 — independent reviewer

B01 completion requires a reviewer independent of the builder/author, with authority to fail the block. The minimum named role is `Independent Build-Conformance Reviewer`; security, database or accessibility specialists may be added by gate scope.

The architecture/conformance reviewer separately checks Phase 1/P2 preservation.

## W-111 — Arabic search decision

B12 includes a named `ArabicSearchRelevanceDecision` using a representative UAE procurement corpus and query set.

It must decide among:

- PostgreSQL exact/normalized/trigram profile is sufficient for the verified envelope;
- a product-owned Arabic normalization/tokenization extension is required;
- a separately governed search-engine projection is justified.

No broader search technology is introduced before measured relevance/latency/access evidence and change control.

---

# 7. B01 mandatory additions

B01 prompt v0.2 must add:

1. explicit isolation parameter/default and real PostgreSQL isolation/write-skew tests;
2. executable public-surface test proving no raw pool/connection is importable;
3. numeric parser pinning and exact decimal round-trip tests;
4. `PhysicalWriteOwnershipManifest` schema/check scaffold that fails on unowned mutable database objects;
5. database-object security catalog scan for W-100;
6. named independent reviewer role;
7. `ReleaseCompatibilityManifestVersion` schema scaffold.

These additions remain engineering foundation scope and add no business tables or workflows.

---

# 8. Remediation claim

BL-P21-06 and W-100–W-111 are closed in the remediated candidate only if:

- internal concurrency hostile tests pass;
- P2.2 graph/traceability remains coherent after W-106;
- B01 v0.2 prompt audit passes;
- independent Claude Round 2 returns PASS.

P2.1/P2.2 and B01 execution remain locked until then.