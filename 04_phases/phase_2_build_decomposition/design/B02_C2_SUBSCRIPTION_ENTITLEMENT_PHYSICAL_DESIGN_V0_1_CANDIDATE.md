# B02-C2 — Subscription / Entitlement Physical Design v0.2 CANDIDATE

**Date:** 2026-08-08  
**Status:** IMPLEMENTED CANDIDATE / HOSTILE AUDIT REQUIRED  
**Branch:** `build/b02-platform-saas-provisional`  
**Controlling change:** `CHG-SSS-001 v1.0 FROZEN`

---

## 1. Purpose

C2 implements the product-commercial control plane required for self-service SaaS without creating procurement authority, accounting truth or a generic billing/entitlement platform.

The physical design supports:

- self-service subscriptions;
- manually evidenced Enterprise subscriptions;
- base product plus independent add-ons;
- grandfathered offering versions;
- upgrade/downgrade through effective-dated product components;
- future AI/integration add-ons without procurement-schema changes;
- deterministic command-time entitlement revalidation;
- historical reconstruction of what entitlement state was known at a prior recorded time.

It deliberately does **not** implement:

- payment processing;
- tax/revenue accounting;
- procurement role/DOA/approval authority;
- billing-provider callback interpretation;
- metered-usage persistence (C3);
- API/UI subscription operations;
- generic customer-authored product policies.

---

## 2. Authority split

### Product-global product catalog

Product-authored shared definitions:

- `UsageMeasureDefinitionVersion`;
- `EntitlementDefinitionVersion`;
- `ProductOfferingVersion`;
- exact entitlement grants contributed by an offering version.

Tenant runtime receives read-only access to this catalog.

### Tenant-commercial authority

Tenant-scoped facts:

- `TenantSubscription`;
- append-only `SubscriptionLifecycleOccurrence`;
- stable `TenantSubscriptionItem` identity;
- append-only/superseding `TenantSubscriptionItemVersion`;
- `TenantEntitlementAuthorityGuard`.

All tenant-scoped C2 tables use FORCE RLS.

### Business authority remains separate

No C2 table grants or modifies:

- membership;
- role;
- delegation;
- DOA;
- approval authority;
- project access;
- AwardDecision authority;
- Commitment authority.

A subscription answers only whether a product capability is commercially available to the tenant.

---

## 3. Why subscription is composable

C2 rejects the physical model:

`TenantSubscription -> exactly one plan row`

because that would force future packaging changes into structural migrations.

Instead:

`TenantSubscription`
`-> TenantSubscriptionItem`
`-> TenantSubscriptionItemVersion`
`-> ProductOfferingVersion`
`-> exact entitlement grants`

Example:

`subscription agreement`
`-> BASE -> Core v3`
`-> AI_ADDON -> Quote Extraction Pack v2`
`-> INTEGRATION_ADDON -> Primavera Connector v1`

The exact marketed names and prices remain commercial variables rather than procurement semantics.

---

## 4. Stable subscription item + append-only versions

A key implementation correction was made before C2 audit.

The first C2 candidate allowed an effective period to be updated directly on `TenantSubscriptionItem`.

That was rejected because changing an old period in place would preserve current safety but destroy the exact commercial authority state previously recorded.

The implemented model is therefore:

### `TenantSubscriptionItem`

Stable logical component identity:

- tenant;
- subscription;
- item slot;
- recorded identity.

### `TenantSubscriptionItemVersion`

Exact recorded commercial version:

- item-version ID;
- stable item ID;
- tenant;
- item slot;
- version number;
- exact `ProductOfferingVersion`;
- half-open effective period;
- recorded time;
- optional superseded time.

Runtime has no permission to rewrite:

- offering version;
- effective period;
- version number;
- slot;
- tenant.

It may only mark a current version superseded through the governed physical path.

A database trigger prevents a version from being superseded twice.

Historical content remains stored after supersession.

---

## 5. Current-authority non-overlap

Current unsuperseded item versions use a PostgreSQL GiST exclusion constraint over:

- `tenant_id` equality;
- `item_slot_key` equality;
- `effective_period` overlap.

Therefore two current versions cannot claim the same product slot for overlapping effective periods.

Superseded historical versions are preserved outside the current-authority exclusion population so corrected knowledge can coexist with the exact prior recorded version.

This distinction permits both:

- deterministic current entitlement;
- historical reconstruction of what CPOS knew earlier.

---

## 6. Recorded-time reconstruction

The TypeScript resolver distinguishes:

- `validAt` — the business/effective time being evaluated;
- `resolvedAt` / `knownAt` — the recorded-time cut of information known to CPOS.

An item version participates only when:

- it was recorded by the knowledge cut;
- it had not yet been superseded by that knowledge cut;
- its effective period contains the evaluated valid time.

Subscription lifecycle derivation likewise considers both effective time and recorded time.

This allows reconstruction of:

1. what CPOS believed on an earlier date using the information then known; and
2. the corrected later reconstruction of that same effective date after a governed correction.

---

## 7. Product offering availability versus grandfathering

`ProductOfferingVersion.availability_period` governs **new assignment**.

A new subscription-item version must bind an offering version that is available at that item's effective start.

Once validly assigned, later retirement/end-of-sale of that offering version does not silently remove the customer's entitlement.

This supports grandfathered plans/add-ons without copying entitlement semantics into tenant rows.

Open audit question:

> Is the current product-global offering publication/retirement representation sufficient for C2, or must product-catalog administration itself gain a separately append-only publication/supersession operation before C2 can PASS?

No tenant runtime can modify the product catalog in the current implementation.

---

## 8. Lifecycle

`SubscriptionLifecycleOccurrence` is append-only and currently permits:

- ACTIVATED;
- SUSPENDED;
- RESUMED;
- CANCELLED;
- EXPIRED.

Current lifecycle state is derived, not stored as a mutable authoritative column.

Runtime has INSERT/SELECT only; UPDATE/DELETE is not granted.

Recorded-time-aware derivation is implemented in contracts.

Open audit question:

> Must legal transition and sequence-continuity enforcement be physically completed inside C2, or is the current append-only storage plus later registered subscription operation owner an acceptable C2 boundary?

The current hostile suite verifies history cannot be rewritten, but does not yet claim every invalid lifecycle transition is impossible at the persistence layer.

---

## 9. Entitlement authority guard

Each tenant has one stable `TenantEntitlementAuthorityGuard`.

Its purpose is CC-2 style revalidation for consequential operations:

1. preview resolves entitlement and binds guard version N;
2. a subscription/entitlement mutation locks and verifies N;
3. successful mutation increments guard to N+1;
4. a later command using preview N observes current N+1 and must fail/re-preview before business effect.

Database hardening:

- guard update is restricted to the `guard_version` column;
- trigger requires exactly +1;
- `updated_at` is set by the database;
- tenant RLS applies;
- every new tenant receives its guard automatically in the same tenant-creation transaction.

The guard is not role, DOA or procurement authority.

Open audit question:

> Which later block must persist the exact entitlement evaluation/guard binding on a durably accepted asynchronous or business command so ordinary post-acceptance downgrade cannot mutate the already-accepted logical command?

The frozen semantic rule exists; C2 does not introduce a generic command ledger merely to solve this downstream binding.

---

## 10. Manual Enterprise subscriptions

`MANUAL_ENTERPRISE` creation requires `commercial_evidence_ref` at the database level.

This permits invoiced/offline commercial arrangements without pretending a card processor is authoritative for entitlement.

Self-service and Enterprise therefore share the same product entitlement model.

---

## 11. Metered limits

Product grants support:

- finite decimal-string limits;
- explicit `UNBOUNDED` mode.

No sentinel such as `-1`, `999999999` or `Infinity` is used.

Multiple active offering components may contribute to the same additive metered entitlement.

The resolver delegates exact decimal addition to an injected exact-arithmetic interface. Test fixtures may use integer-safe arithmetic where only integral quantities are exercised; this is not a declaration that BigInt is the production decimal engine.

Metered usage occurrences themselves remain C3.

---

## 12. Current PostgreSQL hostile coverage

The C2 production suite attacks:

- base plus add-on coexistence;
- same-slot effective overlap;
- append-only/superseding item-version history;
- duplicate supersession;
- stale guard rejection;
- guard arbitrary-jump rejection;
- manual Enterprise subscription without evidence;
- cross-tenant subscription write;
- new assignment of no-longer-available offering;
- grandfathered existing offering binding;
- attempted OWNER-role grant by subscription runtime;
- attempted product-catalog rewrite by subscription runtime;
- attempted lifecycle rewrite by subscription runtime.

The suite uses:

- PostgreSQL 18.4;
- actual migration tables;
- actual non-superuser/NOBYPASSRLS database role;
- actual FORCE RLS policies;
- the restricted persistence-adapter path.

---

## 13. C2 acceptance boundary for hostile audit

The hostile reviewer must distinguish:

### Proven now

- physical subscription/entitlement authority separation;
- composable packaging substrate;
- exact version binding;
- current same-slot non-overlap;
- historical item-version preservation;
- recorded/effective-time resolver grammar;
- grandfathering behavior;
- manual Enterprise evidence floor;
- tenant isolation;
- stable revalidation guard;
- subscription runtime cannot grant procurement role/authority;
- subscription runtime cannot rewrite catalog/lifecycle history.

### Not claimed complete yet

- external billing-provider adapter/reconciliation;
- usage-occurrence persistence;
- subscription HTTP/UI operations;
- generalized product-catalog administration;
- every lifecycle transition rule;
- downstream durable accepted-command binding;
- production commercial pricing configuration;
- production release/security certification.

The audit should classify each open item as:

- `C2 BLOCKER`;
- `C2 WATCH / later-block owner`;
- or `NOT A C2 RESPONSIBILITY`.

It must not force premature generic infrastructure where an already-defined later block owns the concern.
