# B02-C2 — Subscription / Entitlement Physical Design v0.1 Candidate

**Date:** 2026-08-08  
**Status:** CANDIDATE / IMPLEMENTATION LOCKED UNTIL B02-C1 PRODUCTION BOOTSTRAP PROOF PASS  
**Authority:** CHG-SSS-001 v1.0 + INV-SSS-001/002/003/004/013/017  
**Scope:** physical composition only; no procurement-domain semantic change

---

# 1. Problem to solve now

CHG-SSS-001 requires plan/package flexibility without letting marketed tier names enter procurement truth.

A physical model in which `TenantSubscription` points directly to exactly one monolithic `ProductOfferingVersion` is initially simple but creates expensive retrofit pressure when the product later needs:

- a base plan plus AI add-on;
- a base plan plus one integration add-on;
- a legacy/grandfathered plan plus new capabilities;
- an Enterprise contract with selected modules;
- temporary extra project/user/processing allowance;
- a feature moving between marketed plans without changing domain meaning.

The smallest durable design is therefore:

`TenantSubscription (commercial agreement/container)`
`→ one or more effective TenantSubscriptionItem grants`
`→ each item references an immutable ProductOfferingVersion`
`→ offering version contributes product-entitlement grants`
`→ tenant entitlement is derived across currently effective items`

This is not a generic entitlement platform. It is a bounded CPOS product-access control plane.

---

# 2. Authoritative objects

## 2.1 `EntitlementDefinitionVersion`

Product-authored, platform-global configuration.

Minimum fields:

- `entitlement_definition_version_id`;
- stable `entitlement_key`;
- `kind = CAPABILITY | METERED_LIMIT`;
- `aggregation = ANY | ADDITIVE_LIMIT` according to kind;
- effective period;
- recorded time/version;
- optional usage-measure reference for metered limits.

Rules:

- procurement/domain tables never reference marketed plan names;
- entitlement key meaning is product-authored/versioned;
- tenant cannot author definitions;
- definition change never rewrites an old offering version.

## 2.2 `ProductOfferingVersion`

Immutable version of one purchasable/product-authored component.

Examples are commercial configuration only:

- base/core plan component;
- professional plan component;
- AI allowance add-on;
- integration add-on;
- Enterprise feature component.

Minimum fields:

- `product_offering_version_id`;
- stable `offering_key`;
- version;
- lifecycle/availability state;
- effective period;
- recorded time;
- commercial metadata needed by product UI but not procurement truth.

No customer-specific source-code behavior is stored here.

## 2.3 `ProductOfferingEntitlementGrant`

Immutable child rows defining what one offering version grants.

For `CAPABILITY`:

- entitlement definition version;
- grant = enabled.

For `METERED_LIMIT`:

- entitlement definition version;
- `limit_mode = FINITE | UNBOUNDED`;
- finite `limit_quantity` as canonical non-negative exact decimal string when FINITE.

No negative/deny grants exist in v1.

Downgrade/removal happens by ending/replacing a subscription item, never by layering contradictory deny rows over an older grant.

## 2.4 `TenantSubscription`

Tenant-scoped commercial-access agreement/container.

It does NOT itself define procurement authority.

Minimum fields:

- `tenant_subscription_id`;
- `tenant_id`;
- commercial channel/source class such as self-service or governed manual Enterprise activation;
- lifecycle occurrence lineage;
- external billing/agreement reference where available;
- recorded time/version.

Multiple historical subscription agreements may exist.

The exact active entitlement position is derived from active subscription items, not a mutable `current_plan` column.

## 2.5 `TenantSubscriptionItem`

Effective-dated tenant grant source referencing one exact `ProductOfferingVersion`.

Minimum fields:

- `tenant_subscription_item_id`;
- `tenant_subscription_id`;
- `tenant_id`;
- `item_slot_key`;
- `product_offering_version_id`;
- effective period;
- recorded time/version;
- optional product quantity where a future bounded offering needs multiplicity.

`item_slot_key` is product-owned, not customer-authored.

Examples may later include `BASE`, `AI_ADDON`, `INTEGRATION_ADDON`, but exact marketed names are not frozen here.

Non-overlap:

`tenant + item_slot_key + effective_period`

must obey CC-3 exclusion/non-overlap.

This permits a base component and independent add-on components to coexist while preventing contradictory simultaneous replacements inside the same product-owned slot.

---

# 3. Deterministic entitlement resolution

For one tenant at one exact `valid_at`:

1. select effective `TenantSubscriptionItem` rows;
2. validate their owning subscription lifecycle permits product access at `valid_at`;
3. load exact referenced immutable offering versions;
4. load exact entitlement-definition versions and grants;
5. aggregate only by the product-owned rule on the entitlement definition;
6. bind exact source subscription/item/offering/definition versions and the tenant entitlement guard version;
7. emit a derived `ResolvedEntitlementSnapshot`.

The snapshot is a projection/cache, never editable authority.

## 3.1 Capability aggregation

For `CAPABILITY`:

`enabled = any currently effective item grants the capability`.

Absence means not entitled.

There is no customer-authored override and no negative deny grant in v1.

## 3.2 Metered-limit aggregation

For `METERED_LIMIT`:

- if any effective grant is `UNBOUNDED`, resolved allowance is `UNBOUNDED`;
- otherwise resolved configured allowance is the exact-decimal sum of all effective finite grants.

Commercial consumed/remaining/overage remains C3 append-only usage derivation and is not stored on the offering/subscription item.

This design supports a base allowance plus a separately purchased allowance add-on without rewriting the base offering.

---

# 4. Entitlement authority guard

Create one eager `TenantEntitlementAuthorityGuard` per tenant.

Any operation that can materially change the tenant's product-entitlement position must lock/update the guard in the same transaction, including:

- subscription activation/suspension/resumption/cancellation where access consequence changes;
- subscription-item start/end/replacement;
- governed manual Enterprise activation;
- product-controlled tenant grant correction.

Any consequential business command requiring current entitlement:

1. locks/reads the same guard under CP-SSS-02;
2. resolves current entitlement from authoritative subscription/item/lifecycle facts;
3. rejects stale preview/snapshot;
4. binds exact guard/version + entitlement source versions at command acceptance.

Commercial entitlement still cannot create role, DOA, approval, AwardDecision or Commitment authority.

---

# 5. Lifecycle

`SubscriptionLifecycleOccurrence` remains append-only.

Candidate occurrence classes stay bounded to product-access lifecycle, e.g.:

- ACTIVATED;
- SUSPENDED;
- RESUMED;
- CANCELLED;
- EXPIRED;
- governed CORRECTION where necessary.

Current subscription state is derived.

Provider callbacks are admitted as external observations and cannot directly create lifecycle occurrences or entitlement.

---

# 6. Legacy and Enterprise compatibility

## Legacy / grandfathered offering

Old customer remains bound to old immutable offering version/item until a governed replacement operation changes the effective item.

A new pricing page does not migrate existing domain or entitlement history.

## Manual Enterprise contract

A governed CPOS operation may create/update the subscription agreement/items from verified commercial evidence without a card processor.

The operation:

- records actor;
- reason;
- commercial evidence reference;
- exact effective period;
- offering/item versions;
- tenant entitlement guard change.

It does not require building an invoicing/accounting system.

## Add-ons

New AI/integration/processing capabilities can be introduced as offering components occupying bounded product-owned slots.

No procurement schema changes are required.

---

# 7. Invariants / physical profiles

This design concretizes existing frozen invariants rather than adding a new product semantic.

### INV-SSS-001

Apply effective-period non-overlap to `TenantSubscriptionItem` per tenant + product-owned slot.

The subscription agreement container itself may have lifecycle history, but entitlement collision is prevented at the item authority grain.

### INV-SSS-002

Entitlement remains product capability access only; authority intersection remains separate.

### INV-SSS-003 / 004

`TenantEntitlementAuthorityGuard` is the stable CC-2 command/change guard; stale snapshot cannot authorize.

### INV-SSS-013

Billing-provider observation has no direct write grant to subscription/item/guard state.

### INV-SSS-017

Marketed names/prices are metadata on offering versions and never appear as procurement fact meaning.

---

# 8. Explicit refusals

C2 v1 does not implement:

- generic feature-flag service;
- customer-authored entitlements;
- arbitrary deny/precedence rule language;
- generic billing engine;
- tax/invoice/revenue accounting;
- provider-specific subscription state as CPOS truth;
- arbitrary entitlement formulas;
- procurement-domain authorization through plan purchase.

The only aggregation grammar is:

- `CAPABILITY -> ANY`;
- `METERED_LIMIT -> ADDITIVE_LIMIT with explicit UNBOUNDED mode`.

Anything else requires a controlled product-level change rather than a tenant formula.

---

# 9. Migration decomposition if C1 passes

Recommended physical split:

### `000003_b02_c2_product_entitlement_registry.sql`

Platform-global product-authored:

- EntitlementDefinitionVersion;
- UsageMeasureDefinitionVersion as needed for C2/C3 boundary;
- ProductOfferingVersion;
- ProductOfferingEntitlementGrant.

No tenant-specific content.

### `000004_b02_c2_tenant_subscription.sql`

Tenant-scoped:

- TenantSubscription;
- TenantSubscriptionItem;
- SubscriptionLifecycleOccurrence;
- TenantEntitlementAuthorityGuard;
- FORCE RLS;
- CC-3 item-slot non-overlap;
- minimum runtime/bootstrap/manual-enterprise grants.

C3 usage ledger may remain a later migration if doing so keeps C2 independently gateable.

---

# 10. Required hostile proof before C2 PASS

At minimum:

1. overlapping replacement in same tenant/item slot — exactly one legal authority set;
2. base + independent add-on coexist without overlap conflict;
3. legacy offering remains stable after new offering version published;
4. feature moves between marketed offerings without procurement-row migration;
5. downgrade between preview and command invalidates command entitlement evaluation;
6. downgrade after accepted command does not retroactively mutate that accepted logical command;
7. stale entitlement snapshot cannot authorize;
8. one tenant's offering/items cannot influence another tenant;
9. billing callback duplicate/reorder cannot directly change entitlement;
10. manual Enterprise activation uses governed operation/evidence and same entitlement guard;
11. finite limits aggregate exactly;
12. one UNBOUNDED grant resolves to unbounded without sentinel arithmetic;
13. no entitlement state creates role/DOA/award/commitment authority;
14. historical entitlement reconstruction at old `valid_at` returns old item/offering versions exactly.

---

# 11. Gate

`C2 IMPLEMENTATION = LOCKED UNTIL C1 PRODUCTION BOOTSTRAP PROOF PASS`

This candidate should be reconciled against the final C1 evidence before migrations are created.
