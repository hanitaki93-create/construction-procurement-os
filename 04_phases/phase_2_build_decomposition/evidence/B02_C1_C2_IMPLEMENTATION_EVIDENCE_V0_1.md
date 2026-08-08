# B02 C1/C2 — Provisional Implementation Evidence v0.1

**Date:** 2026-08-08  
**Status:** INTERNAL IMPLEMENTATION CHECKPOINT / INDEPENDENT HOSTILE AUDIT REQUIRED  
**Branch:** `build/b02-platform-saas-provisional`  
**Base:** B01 verified head `5d35a718ba861d18b822246756c640ea0b631a01`  
**Review PR:** #2 (`B02 -> B01`, draft / DO NOT MERGE)

---

## 1. Scope of this evidence

This record covers only the implemented B02 platform slices:

- C1 — identity/tenant bootstrap and initial authority lineage;
- C2 — subscription/entitlement control-plane substrate;
- the B02 database execution-context substrate required by C1/C2.

It does **not** claim:

- complete B02 PASS;
- B01 owner acceptance;
- production certification;
- payment-provider integration;
- subscription UI/API completion;
- C3 usage persistence completion;
- RFQ/procurement-domain implementation;
- AI capability activation;
- PMF or commercial proof.

---

## 2. Controlling semantic baseline

Implemented C1/C2 must remain subordinate to:

- frozen Phase-1 semantics;
- `CHG-SSS-001 v1.0 FROZEN`;
- frozen SSS Build Program overlay;
- frozen SSS invariant overlay;
- `INV-SSS-018 / CP-SSS-06` pre-tenant bootstrap isolation reconciliation.

Sunk provisional code has no authority to redefine those artifacts.

---

## 3. B01 disposition

B01 implementation remains expected:

`VALID UNCHANGED`

PR #2 is stacked on the exact independently verified B01 head rather than merging or rewriting B01.

C1/C2 additions do not authorize modification of the B01 business-empty acceptance baseline.

---

# 4. C1 — Tenant bootstrap / initial authority lineage

## 4.1 Production migration

`migrations/sql/000002_b02_c1_platform_bootstrap_tenancy.sql`

Creates the bounded initial platform lineage:

- pre-tenant `bootstrap_intent` control record;
- Tenant;
- LegalEntity + effective versions;
- Principal;
- authentication-identity binding;
- TenantMembership + effective versions;
- OWNER RoleAssignment + effective versions;
- ContractingAuthorityContext + effective versions.

Security/authority properties include:

- FORCE RLS on tenant-private tables;
- non-superuser / NOBYPASSRLS runtime roles;
- separate `TENANT` versus `BOOTSTRAP` execution scopes;
- bootstrap may create only the exact identity/proposed-tenant lineage bound by its context/control row;
- technical authentication identity remains distinct from tenant membership/business authority;
- ordinary tenant runtime cannot read bootstrap-control state;
- bootstrap runtime cannot become a generic tenant reader/updater.

## 4.2 Database execution substrate

Implemented in `packages/database-core`:

- `DatabaseRuntime.withExecutionContext`;
- `DatabaseRuntime.withBootstrapContext`;
- opaque persistence adapter token;
- restricted `@cpos/database-core/persistence` subpath;
- transaction-bound executor lifetime;
- parameterized SQL interpolation;
- runtime SQL guard against context mutation, role mutation, DDL and multiple statements;
- hostile architecture/public-surface guards preventing raw pg/Kysely or persistence capability leakage into ordinary application/domain code.

The SQL guard explicitly permits ordinary DML grammar such as `INSERT ... ON CONFLICT ... DO NOTHING` while continuing to reject standalone procedural `DO`, `SET`, `set_config`, DDL and multi-statement SQL.

## 4.3 C1 hostile production proof

Primary suite:

`packages/database-core/integration/platform-c1-bootstrap-v2.integration.test.ts`

Exercises actual production migration tables, actual bootstrap/tenant roles and actual RLS.

Proves:

1. mid-transaction failure leaves no partial tenant/authority residue;
2. bootstrap cannot create a different/unbound authority identifier;
3. 20 identical concurrent bootstrap attempts converge to one tenant/OWNER authority lineage;
4. lost-result retry returns the same established result;
5. same idempotency key with changed payload is rejected;
6. established lineage is readable through normal tenant execution context;
7. tenant runtime cannot read bootstrap intent/control state;
8. another authentication identity cannot see the first identity's bootstrap intent.

C1 remains deliberately narrow; later user/role management operations are not granted broad mutation privileges in C1.

---

# 5. C2 — Subscription / entitlement substrate

## 5.1 Product-global registry migration

`migrations/sql/000003_b02_c2_product_entitlement_registry.sql`

Creates product-authored shared definitions:

- UsageMeasureDefinitionVersion;
- EntitlementDefinitionVersion;
- ProductOfferingVersion;
- exact ProductOffering entitlement grants.

Tenant runtimes receive read-only catalog access.

The catalog is not tenant procurement truth and is not a billing/accounting ledger.

## 5.2 Tenant subscription migration

`migrations/sql/000004_b02_c2_tenant_subscription.sql`

Creates:

- TenantSubscription;
- append-only SubscriptionLifecycleOccurrence;
- stable TenantSubscriptionItem;
- append-only/superseding TenantSubscriptionItemVersion;
- TenantEntitlementAuthorityGuard.

Key physical rules:

- FORCE RLS on every tenant-scoped C2 table;
- dedicated `cpos_subscription_runtime` role is NOBYPASSRLS and has least-privilege grants;
- manual Enterprise subscription requires commercial evidence reference;
- lifecycle rows cannot be UPDATE/DELETE rewritten by subscription runtime;
- subscription runtime cannot write membership/role/DOA tables;
- subscription runtime cannot modify the product-global offering catalog;
- current unsuperseded item versions cannot overlap for the same tenant/item slot;
- old superseded item-version content remains stored;
- item-version commercial fields are not mutable by runtime;
- an item version may be superseded only once;
- every tenant has a stable entitlement authority guard;
- guard can increment only exactly +1;
- tenant creation automatically establishes the entitlement guard without broadening bootstrap privileges.

## 5.3 Contract/resolver semantics

`packages/contracts/src/platform.ts`

Implements:

- subscription agreement/container distinct from composable items;
- stable item + item-version model;
- exact offering-version binding;
- offering availability for new assignment;
- grandfathering of already-valid assignments;
- recorded-time and effective-time selection;
- append-only lifecycle derivation as-of recorded time;
- explicit finite versus UNBOUNDED metered grants;
- additive metered entitlements through injected exact arithmetic;
- exact source binding in ResolvedEntitlementSnapshot;
- tenant entitlement authority guard version binding.

No marketed plan name becomes procurement-domain truth.

## 5.4 C2 hostile production proof

Primary suite:

`packages/database-core/integration/platform-c2-subscription.integration.test.ts`

Exercises actual production tables, actual non-superuser subscription runtime and actual FORCE RLS.

Proves:

1. base offering and independent add-on can coexist;
2. overlapping current same-slot authority is rejected by PostgreSQL exclusion constraint;
3. failed overlapping change rolls back without guard advancement;
4. superseded item-version content remains historically available;
5. a replacement can occupy an adjacent effective period;
6. already-superseded version cannot be superseded again;
7. stale expected entitlement guard blocks a later mutation before effect;
8. manual Enterprise creation without commercial evidence fails;
9. evidenced manual Enterprise creation succeeds;
10. tenant A cannot create tenant B subscription state;
11. expired/end-of-sale offering cannot be newly assigned after its availability period;
12. an already-valid grandfathered offering remains bound/readable;
13. subscription runtime cannot grant OWNER role;
14. subscription runtime cannot rewrite product offering catalog;
15. subscription runtime cannot rewrite lifecycle history;
16. arbitrary entitlement-guard jumps are rejected while exact +1 succeeds.

---

# 6. Exact CI evidence

## 6.1 Latest semantic database run

Branch commit:

`8370a217bb389c6e412cb9775388d1912823d032`

GitHub Actions run:

`B02 Provisional Verification #76`

Run ID:

`31252013403`

Result:

`SUCCESS`

Evidence from the run:

- database-core strict typecheck — PASS;
- architecture boundary guard — `ARCHITECTURE_BOUNDARY_CHECK_PASS`;
- database public-surface guard — `DATABASE_PUBLIC_SURFACE_CHECK_PASS`;
- PostgreSQL 18.4 integration files — `9 passed / 9`;
- PostgreSQL integration tests — `49 passed / 49`;
- C2 production hostile suite — `7 / 7` PASS;
- C1 production bootstrap suite — `8 / 8` PASS;
- committed migrations 000001–000004 applied successfully;
- migration status after application — no pending migrations;
- catalog scan — `[]` / zero findings.

The PostgreSQL service log contains expected rejected attack/failure statements from hostile tests (RLS rejection, permission denial, exclusion conflict, guard jump rejection, deliberate migration rollback test, deadlock/serialization test). Those are test evidence, not unexplained production errors.

## 6.2 Documentation-only head after CI

Later commits may update only candidate design/evidence documentation. Hostile audit must distinguish a documentation-only head from the last semantically verified code/migration head above.

If code/migrations change after the recorded green head, fresh CI is required before C1/C2 implementation PASS may be claimed.

---

# 7. Full-workspace CI note

The inherited `B01 Verification` workflow on the B02 tree currently stops at Prettier for four B02 files before lint/type/build can proceed.

This is mechanical branch hygiene, not a semantic database failure.

The semantic database workflow is independently green as documented above.

The four known formatting files at the recorded green head were:

- `packages/contracts/src/platform.ts`;
- `packages/contracts/src/platform.test.ts`;
- `packages/database-core/integration/platform-c1-bootstrap-v2.integration.test.ts`;
- `packages/database-core/integration/platform-c2-subscription.integration.test.ts`.

Formatting must be normalized before B02 completion; no implementation PASS should misrepresent the full-workspace workflow as green until that occurs.

B01 F4/F5 release-evidence workflows are B01-specific and may also reject the expanded B02 tree because B01's release manifest is intentionally frozen. Such failures must not be 'fixed' by weakening or rewriting B01 release evidence.

---

# 8. Open questions intentionally presented to hostile audit

The following are not hidden as completed:

## AQ-01 — Product catalog publication lifecycle

Tenant runtime cannot modify catalog definitions, but C2 has not yet implemented a governed product-catalog authoring/publication/supersession operation.

Question:

Is this a C2 blocker for the current substrate, or a bounded internal-product administration concern that may be completed before public subscription release?

## AQ-02 — Lifecycle transition legality / sequence continuity

Lifecycle occurrences are append-only and sequence-unique, but the persistence layer does not itself encode the full legal transition graph or force sequence N+1.

Question:

Must that transition/sequence operation be physically completed before C2 PASS, or may it remain an operation-owner concern inside the remaining B02 implementation?

## AQ-03 — Accepted-command entitlement binding

Frozen semantics require a consequential command to revalidate current entitlement and, once durably accepted, retain the exact accepted entitlement evaluation even if the tenant later downgrades.

The stable C2 guard supports preview/command invalidation, but C2 does not create a generic durable command ledger.

Question:

Which block owns persistence of the exact entitlement binding on accepted domain/async commands: remaining B02 operation infrastructure, B03 async/continuation, or each later domain command owner?

## AQ-04 — Exact metered arithmetic

C2 contracts inject exact arithmetic and preserve decimal quantities as canonical strings. Metered usage persistence belongs to C3.

Question:

Is this abstraction sufficient at C2, or must C2 bind a concrete Decimal implementation before C3?

---

# 9. Required hostile disposition

The next independent audit should return separately:

- B01 disposition;
- execution-context substrate disposition;
- C1 disposition;
- C2 disposition;
- AQ-01 through AQ-04 ownership/classification;
- any new load-bearing blockers;
- whether C3 may proceed provisionally after remediation of any actual blocker;
- whether any implemented C1/C2 concept creates a second XL or leaks into procurement truth.

A clean C1/C2 audit does not equal full B02 PASS or production certification.
