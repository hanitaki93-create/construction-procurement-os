# Construction Procurement OS — P2.1 Subscription-Native Invariant Overlay v1.0

**Date:** 2026-08-08  
**Status:** FROZEN CHG-SSS-001 INVARIANT OVERLAY  
**Parent register:** `P2_1_INVARIANT_REGISTER_V0_1.md`  
**Authority:** `CHG-SSS-001 v1.0`  
**Purpose:** register every new load-bearing invariant introduced by the subscription-native amendment before production B02 tables/operations are created

---

# 1. Governing rule

The historical invariant register remains intact.

This overlay extends it prospectively. IDs in this file are part of the active `InvariantRegisterVersion` for CHG-SSS-001 builds.

A B02 implementation may not introduce an authoritative object or operation covered here without:

- reverse object → invariant mapping;
- reverse operation → invariant mapping;
- declared effective-period disposition where applicable;
- declared concurrency profile where concurrency-sensitive;
- hostile proof in the owning block.

No builder may downgrade a CHG-SSS-001 invariant to a code detail.

---

# 2. Registered CHG invariants

| ID | Invariant | Class | Source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-SSS-001 | Effective `TenantSubscription` authority cannot overlap for the same tenant/subscription authority grain | EFFECTIVE_PERIOD_NON_OVERLAP | CHG §9 | TenantSubscription | B02 | YES | CC-3 exclusion/unique range constraint; concurrent replacement test |
| INV-SSS-002 | Product entitlement may narrow capability availability but can never create business/domain authority | NON_SUBSTITUTION | CHG §8 | EntitlementDefinitionVersion, ProductOfferingVersion, TenantSubscription, OperationDefinition, authority records | B02 | YES | registered-operation authorization intersection; no entitlement→role/DOA/Award/Commitment path |
| INV-SSS-003 | Consequential command acceptance revalidates current entitlement and binds the exact entitlement evaluation/version used at acceptance | VERSION_BINDING | CHG §9 | operation invocation, entitlement evaluation, subscription/offering versions, entitlement authority guard | B02 | YES | CC-2 tenant entitlement-authority guard; preview invalidation; downgrade race test |
| INV-SSS-004 | A stale derived entitlement snapshot/cache cannot authorize a command | NON_SUBSTITUTION | CHG §6/§9 | ResolvedEntitlementSnapshot, authoritative subscription/lifecycle facts, operation invocation | B02 | YES | command reads authoritative version under INV-SSS-003 guard; hostile stale-cache test |
| INV-SSS-005 | Subscription lifecycle and usage history are append-only occurrences; derived current/remaining positions are never editable second truth | IMMUTABILITY | CHG §6/§11/§14 | SubscriptionLifecycleOccurrence, MeteredUsageOccurrence, derived projections | B02/B03 | YES | append-only grants; no update/delete runtime path; rebuild equality test |
| INV-SSS-006 | One usage correlation identity contributes at most once to a tenant/subscription/measure position | UNIQUENESS | CHG §11 | MeteredUsageOccurrence | B02/B03 | YES | CC-3 unique correlation identity at declared grain; duplicate async/event test |
| INV-SSS-007 | Self-service bootstrap establishes one intended tenant + initial OWNER lineage per logical bootstrap identity and changed-payload idempotency reuse fails closed | UNIQUENESS | CHG §13 | AuthenticationIdentity, TenantBootstrapIntent, Tenant, TenantMembership, initial legal context | B02 | YES | CC-3 unique bootstrap identity + one transaction + payload digest/version; 20-way concurrency/lost-result test |
| INV-SSS-008 | Verified technical identity never substitutes for tenant membership/business authority | NON_SUBSTITUTION | CHG §13; P1.4 | AuthenticationIdentity, Principal, TenantMembership, role/delegation/DOA | B02 | YES | separate identities/FKs; authorization intersection; multi-tenant identity hostile test |
| INV-SSS-009 | Ordinary subscription expiry/downgrade/cancellation cannot retroactively invalidate an already-issued valid external task or rewrite procurement history | VERSION_BINDING | CHG §14–§15 | TenantSubscription, ExternalTaskGrant, ExternalSubmissionAcceptancePolicy, later procurement facts | B02/B06/B07 | YES | issue-time entitlement basis binding; current entitlement required for new buyer commands; expiry scenario matrix |
| INV-SSS-010 | First public offering must declare finite issue-time external-task duration and outbound invitation-volume dispositions | RESOURCE_BOUND | CHG §16 | ProductOfferingVersion, ExternalTaskGrant issue operation, outbound quota policy | B02/B06/B14 | YES | product-authored finite bound required at release; issue-time enforcement; no retroactive shortening |
| INV-SSS-011 | Invited supplier participation in an ordinary buyer sourcing task cannot require purchase of a supplier subscription | NO_OPTIONAL_DEPENDENCY | CHG §17 | ExternalTaskGrant, external session/response paths, entitlement model | B06/B07/B11 | NO | providers/subscription disabled external golden flow |
| INV-SSS-012 | Non-load-bearing Quick Compare scratch output cannot substitute for governed ComparisonSnapshot/recommendation/approval/AwardDecision/contractable basis | NON_SUBSTITUTION | CHG §19 | scratch workspace/artifacts, EvidenceVersion, supplier response, ComparisonSnapshot, decision objects | B08/B10 | YES | distinct object/operation identities; promotion creates governed objects; hostile direct-award attempt |
| INV-SSS-013 | Billing-provider observation never substitutes for CPOS entitlement authority | NON_SUBSTITUTION | CHG §7 | BillingProviderObservation, TenantSubscription, SubscriptionLifecycleOccurrence, entitlement projection | B02/B03/B13 | YES | ExternalObservation admission/reconciliation; no direct entitlement write grant |
| INV-SSS-014 | Commercial entitlement cannot silently shrink a displayed business population and present it as the complete population | POPULATION_COMPLETENESS | CHG §14/§23 | report/dashboard execution, entitlement, security access population | B12 | YES | frozen P1.8 population/quality disclosures; entitlement-vs-security filter tests |
| INV-SSS-015 | Product analytics are non-authoritative telemetry and cannot become procurement truth or cross-tenant business influence | STRUCTURAL_BOUNDARY | CHG §25 | product telemetry events, analytics projections | B12 | YES | separate write ownership/schema; no source-table write path; tenant isolation tests |
| INV-SSS-016 | Every consequential human-facing semantic block must pass SSV-1 before its final block PASS; the applicable set is extensible and never reducible | ORDERED_GATE | CHG §29 | BlockCompletionEvidenceManifest, ValidationGateDecision | B02/B04–B12 | YES | block manifest validation; successor lock; omitted-applicable-block negative fixture |
| INV-SSS-017 | Marketed offering names/prices never become procurement-domain fact meaning; offering changes bind versioned entitlement bundles | VERSION_BINDING | CHG §10 | ProductOfferingVersion, EntitlementDefinitionVersion, domain operations | B02 | YES | product registry separation; legacy-offering version tests; no plan-name domain FK |

---

# 3. Concurrency profiles

## CP-SSS-01 — Tenant subscription non-overlap

**Invariants:** INV-SSS-001  
**Isolation:** READ COMMITTED permitted only with complete CC-3 protection  
**Mechanism:** `UNIQUE_OR_EXCLUSION_CONSTRAINT`  
**Scope identity:** tenant + subscription-authority grain  
**Physical expectation:** exact half-open effective range `[from, until)`; GiST exclusion/partial unique where appropriate  
**Retry:** none for invariant violation; typed business/config conflict  
**Hostile proof:** two concurrent replacements/activations that would otherwise overlap; exactly one legal final authority set

## CP-SSS-02 — Entitlement command acceptance

**Invariants:** INV-SSS-002, INV-SSS-003, INV-SSS-004  
**Isolation:** READ COMMITTED with stable guard  
**Mechanism:** `GUARD_ROW_LOCK` + expected bound versions  
**Guard:** one `TenantEntitlementAuthorityGuard` per tenant  
**Materialization:** eager with tenant/bootstrap  
**Lock order:** inherited global order  
**Writers that lock:** subscription/offering activation/change affecting tenant entitlement; consequential command acceptance requiring entitlement  
**Retry:** bounded only for technical deadlock/serialization before external effect  
**Hostile proof:** downgrade between preview/command; upgrade race; stale cache; accepted command followed by downgrade

## CP-SSS-03 — Bootstrap uniqueness

**Invariants:** INV-SSS-007, INV-SSS-008  
**Isolation:** READ COMMITTED with CC-3 uniqueness and one transaction  
**Mechanism:** `UNIQUE_OR_EXCLUSION_CONSTRAINT` plus idempotent payload digest/version validation  
**Unique grain:** authentication identity + bootstrap idempotency key  
**Hostile proof:** 20-way same request, lost response, changed-payload key reuse, partial failure

## CP-SSS-04 — Usage correlation once

**Invariants:** INV-SSS-005, INV-SSS-006  
**Isolation:** READ COMMITTED with CC-3 uniqueness  
**Mechanism:** `UNIQUE_OR_EXCLUSION_CONSTRAINT`  
**Unique grain:** tenant + subscription + usage measure + correlation identity  
**Hostile proof:** duplicate worker/event delivery cannot double consume; correction is a new explicit occurrence

## CP-SSS-05 — External task issue-time commercial bounds

**Invariants:** INV-SSS-009, INV-SSS-010  
**Isolation:** follows B06 issue operation profile  
**Mechanism:** product offering/version binding + operation guard  
**Hostile proof:** valid issue then cancel; issue beyond max duration; invitation-volume exhaustion; later plan change does not shorten existing grant

---

# 4. Object reverse-map requirements

At minimum, when these objects become physical they reverse-reference:

| Object | Required invariant references |
|---|---|
| AuthenticationIdentity | INV-SSS-007, INV-SSS-008, inherited INV-005/INV-013 |
| TenantBootstrapIntent | INV-SSS-007, INV-012, inherited idempotency/operation invariants |
| Tenant | INV-SSS-007, INV-SSS-008, INV-005, INV-013 |
| TenantMembership | INV-SSS-007, INV-SSS-008, inherited authority/effective-period invariants |
| TenantEntitlementAuthorityGuard | INV-SSS-003, INV-SSS-004 |
| EntitlementDefinitionVersion | INV-SSS-002, INV-SSS-017, inherited configuration/version invariants |
| ProductOfferingVersion | INV-SSS-002, INV-SSS-010, INV-SSS-017 |
| TenantSubscription | INV-SSS-001, INV-SSS-002, INV-SSS-003, INV-SSS-009, INV-SSS-017 |
| SubscriptionLifecycleOccurrence | INV-SSS-003, INV-SSS-005, INV-SSS-009 |
| ResolvedEntitlementSnapshot | INV-SSS-002, INV-SSS-004, INV-SSS-017 |
| UsageMeasureDefinitionVersion | INV-SSS-005, INV-SSS-006 |
| MeteredUsageOccurrence | INV-SSS-005, INV-SSS-006 |
| later ExternalTaskGrant | INV-SSS-009, INV-SSS-010, INV-SSS-011 |
| later QuickCompare scratch artifact | INV-SSS-012 |
| later product analytics event | INV-SSS-015 |
| ValidationGateDecision | INV-SSS-016 |

---

# 5. Operation reverse-map requirements

Prospective operation families must reverse-reference the relevant invariants before activation.

At minimum:

- tenant bootstrap → INV-SSS-007/008;
- subscription activate/change/cancel/expire → INV-SSS-001/002/003/005/009/017;
- entitlement-requiring command acceptance → INV-SSS-002/003/004;
- usage record/credit → INV-SSS-005/006;
- external task issue → INV-SSS-009/010/011;
- Quick Compare promotion → INV-SSS-012;
- block completion decision → INV-SSS-016.

No API/UI/worker/AI/integration path is exempt from the same operation/invariant ownership.

---

# 6. Effective-period family additions

The mandatory effective-period completeness inventory is extended to include:

- ProductOfferingVersion activation;
- EntitlementDefinitionVersion activation;
- UsageMeasureDefinitionVersion activation where version-effective;
- TenantSubscription authority period.

`TenantSubscription` specifically requires `OVERLAP_PROHIBITED_CC3` unless a later controlled change proves that the exact authority grain cannot be represented by a constraint, in which case CC-4 must be declared before implementation.

---

# 7. Compiler/reconciliation rule

Every B02 completion manifest must assert:

`All CHG-SSS-001 invariant IDs applicable to every changed mutable object and state-changing operation are present in the active InvariantRegisterVersion and reverse mappings; no newly encountered invariant remains unregistered.`

Any newly encountered subscription/self-service invariant candidate blocks the affected block portion until reconciled.

---

# 8. Non-claim

This invariant overlay establishes implementation obligations for the approved productization change. It does not prove PMF, commercial success or production security certification.
