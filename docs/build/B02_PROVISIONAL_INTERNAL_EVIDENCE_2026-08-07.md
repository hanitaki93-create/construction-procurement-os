# B02 Provisional Internal Evidence — 2026-08-07

**Status:** INTERNAL PROVISIONAL PASS FOR IMPLEMENTED CONTRACT SLICE / NOT B02 PASS / NOT MERGE AUTHORIZATION  
**Branch:** `build/b02-platform-saas-provisional`  
**Base:** `5d35a718ba861d18b822246756c640ea0b631a01` — independently verified B01 evidence head  
**Final independent CHG audit:** PENDING  
**B01 owner acceptance:** PENDING

---

## 1. Why implementation proceeded

CHG-SSS-001 hostile audit Rounds 1–3 converged on a bounded subscription-native amendment with:

- B01 valid unchanged;
- no second XL;
- deterministic procurement/commercial truth unchanged;
- subscription/entitlement additive;
- AI/integration architecture unchanged;
- remaining Round-3 blocker limited to validation-label collision/change-control wording.

The project owner explicitly authorized continued real work rather than idling until the next Claude usage window, provided work remained safe/reversible.

This branch therefore starts from the independently verified B01 head and is not merged into `main` or PR #1.

---

## 2. Git delta from verified B01 head

At evidence capture, the branch is ahead of B01 by 18 commits and behind by 0.

Changed files are limited to:

- provisional B02 build prompt;
- provisional B02 workstream/evidence docs;
- shared contract source/tests for bootstrap;
- shared contract source/tests for subscription/entitlement;
- shared contract source/tests for registered operation envelopes;
- shared contract source/tests for usage metering;
- `packages/contracts/src/index.ts` exports.

No B01 runtime, database, object-store, worker, browser shell, CI, migration or infrastructure file has been changed by the implemented contract slice.

---

## 3. Implemented production contracts

### 3.1 `bootstrap.ts`

Implements:

- `VerifiedAuthenticationIdentity`;
- `TenantBootstrapRequest`;
- `TenantBootstrapIntent`;
- `TenantBootstrapDecision`;
- verification-time guard;
- identity/request equality guard;
- exact idempotent-retry return;
- changed-payload/idempotency-key collision rejection;
- established bootstrap guard requiring tenant + initial owner membership.

Explicit non-claim:

A verified technical identity is not tenant ownership/business authority.

### 3.2 `platform.ts`

Implements candidate contracts for:

- `TenantSubscription`;
- `SubscriptionLifecycleOccurrence`;
- `EntitlementDefinitionVersion`;
- `ProductOfferingVersion`;
- `UsageMeasureDefinitionVersion`;
- `MeteredUsageOccurrence`;
- derived `ResolvedEntitlementSnapshot`.

Guards/helpers include:

- half-open effective periods;
- invalid period rejection;
- per-tenant overlap rejection;
- fail-closed effective-subscription selection;
- lifecycle state derived from append-only occurrences;
- canonical non-negative decimal-string validation;
- duplicate entitlement-definition rejection;
- offering/subscription binding verification;
- derived entitlement snapshot construction.

Usage occurrence effect is explicit:

- `CONSUME`;
- `CREDIT`.

This avoids encoding correction as mutable balances or untyped negative quantities.

### 3.3 `operation.ts`

Implements candidate shared operation contracts for:

- `QUERY`;
- `PROPOSAL`;
- `COMMAND`;
- `ASYNC_OPERATION`.

Guards include:

- positive registered versions;
- stable registered operation identity;
- required context tenant/principal;
- command/async idempotency requirement;
- envelope/registry class/version match;
- typed product-entitlement precondition.

The entitlement helper returns only capability-availability dispositions:

- `NOT_REQUIRED`;
- `SATISFIED`;
- `BLOCKED_NOT_ENTITLED`;
- `REQUIRES_USAGE_EVALUATION`.

It does not return business authorization.

### 3.4 `usage.ts`

Implements an arithmetic-engine-neutral derived usage position over append-only usage occurrences.

It:

- filters by tenant/subscription/measure/window/as-of;
- uses half-open usage windows;
- rejects non-canonical quantities;
- rejects duplicate correlation identities instead of double consuming;
- applies explicit CONSUME/CREDIT effects;
- rejects a credit that would create negative consumed usage;
- derives consumed/remaining/overage without mutating the configured limit;
- returns exact contributing occurrence identities.

Exact arithmetic is injected through `ExactUsageArithmetic` so this contract does not create a second decimal engine. Production arithmetic remains subject to the repository's frozen exact-decimal machinery.

---

## 4. Test coverage added

### Bootstrap

- verified identity time;
- new intent;
- exact idempotent retry;
- changed payload collision;
- technical identity mismatch;
- established result requires owner membership.

### Subscription / entitlement

- half-open effective period;
- overlap failure;
- adjacent-period success;
- multiple-current failure;
- lifecycle as-of derivation;
- canonical decimal strings;
- duplicate entitlement rejection;
- derived snapshot.

### Operation

- command/async idempotency invariant;
- operation version mismatch;
- empty idempotency key;
- entitled capability availability;
- absent capability denial;
- metered entitlement requires usage evaluation.

### Usage

- consumption + credit derivation;
- overage derivation;
- duplicate correlation fail-closed;
- over-credit fail-closed;
- window/as-of filtering.

---

## 5. Independent local compile/runtime checks performed in this session

The production contract sources were reconstructed locally and compiled with TypeScript under the repository's strict posture including:

- target ES2023;
- NodeNext module semantics;
- `strict`;
- `noImplicitAny`;
- `noUncheckedIndexedAccess`;
- `exactOptionalPropertyTypes`;
- `noImplicitReturns`;
- `verbatimModuleSyntax`.

Result:

`PRODUCTION CONTRACT TYPECHECK PASS`

A runtime smoke execution then exercised:

- subscription overlap guard;
- lifecycle derivation;
- entitlement snapshot;
- registered command envelope;
- entitlement precondition;
- tenant bootstrap decision.

Result:

`B02_PROVISIONAL_CONTRACT_RUNTIME_CHECK_PASS`

The usage production source was subsequently included in the same strict compile set.

Result:

`B02 PROVISIONAL USAGE SOURCE TYPECHECK PASS`

---

## 6. What has intentionally NOT been implemented

The following are intentionally stopped pending final CHG freeze/canonical B02 reconciliation or a bounded physical design decision:

- production tenant database migration;
- production RLS policies;
- `withExecutionContext` public database capability;
- authentication-provider integration;
- payment/billing-provider integration;
- actual subscription database state;
- API mutation routes;
- self-service React surfaces;
- rate limiting/abuse implementation;
- procurement domain tables;
- RFQ/supplier/comparison/award behavior.

The database execution-context slice is intentionally stopped because B01's hostile-tested database public surface forbids raw pool/Kysely/query leakage. B02 must evolve that surface deliberately rather than bypass it.

---

## 7. Known provisional questions for canonical B02 reconciliation

These are physical implementation questions, not discovered semantic architecture gaps:

1. Exact bounded public database capability supporting transaction-bound module persistence without exposing raw SQL/query power.
2. Final physical table/schema names for platform objects.
3. Exact PostgreSQL enforcement mechanism selected for subscription effective-period non-overlap under the registered concurrency profile.
4. Exact authentication provider and verified-identity exchange.
5. Exact billing provider / manual Enterprise observation path.
6. Exact first public offering numerical task-duration/invitation limits.
7. Exact routing/layout of first B02 conventional web surfaces.

No provisional answer to these may silently become frozen because code exists.

---

## 8. Pending audit boundary

The next independent Claude audit is intentionally narrow and pending until usage becomes available.

Its only purpose is to close CHG-SSS-001 v0.4 around:

- BL-SSS-07 validation namespace/legacy-label supersession;
- W3-01 attribution/assurance relationship;
- W3-02 block-pass comprehension placement;
- W3-03 validation execution form;
- W3-04 public external-task duration/volume release bound.

On clean PASS:

1. freeze CHG-SSS-001;
2. update canonical P2.2/B15 prospective wording;
3. record B01 owner acceptance if the owner approves;
4. generate the final B02 prompt;
5. reconcile every provisional file against that prompt;
6. discard any incompatible provisional code;
7. only then create/formalize the B02 PR and full CI/audit cycle.

---

## 9. Internal disposition

`SAFE TO CONTINUE PROVISIONAL B02 ENGINEERING WITHIN THE DECLARED BOUNDARY.`

`NOT SAFE TO MERGE, FREEZE B02, OR CLAIM B02 PASS BEFORE FINAL CHG CLOSURE + B01 OWNER ACCEPTANCE + CANONICAL RECONCILIATION.`
