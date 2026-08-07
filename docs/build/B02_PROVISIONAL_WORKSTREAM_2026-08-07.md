# B02 Provisional Workstream — 2026-08-07

**Branch:** `build/b02-platform-saas-provisional`  
**Base:** independently verified B01 head `5d35a718ba861d18b822246756c640ea0b631a01`  
**Merge status:** PROHIBITED pending CHG-SSS-001 v0.4 final independent closure and B01 owner acceptance.  
**Purpose:** continue reversible engineering while the remaining independent audit concerns validation-label/change-control closure rather than B01 implementation or deterministic product semantics.

## Hard boundary

This branch may implement only semantics already stable across the frozen Phase-1/P2 record and CHG-SSS-001 hostile audits.

Allowed before final CHG closure:

- shared tenant/bootstrap contracts;
- subscription/offering/entitlement contracts;
- append-only usage occurrence contracts;
- effective-period guards;
- derived entitlement snapshots;
- idempotent bootstrap decision contracts;
- tests and completion evidence for those contracts;
- implementation planning that is explicitly provisional.

Not authorized before final CHG closure / B01 acceptance:

- merge to `main`;
- owner-accept B01 by implication;
- production/public release;
- billing-provider commitment;
- named identity provider commitment;
- permanent product pricing/tier names;
- RFQ/procurement business tables;
- AI capability activation;
- named ERP/CDE/scheduling integration;
- any change to frozen commercial truth.

## Implemented provisional slice

### Platform subscription / entitlement contracts

`packages/contracts/src/platform.ts`

Provides:

- `TenantSubscription` effective-period contract;
- `SubscriptionLifecycleOccurrence` append-only lifecycle vocabulary;
- `ProductOfferingVersion` and entitlement bundle contract;
- `EntitlementDefinitionVersion`;
- `UsageMeasureDefinitionVersion`;
- append-only `MeteredUsageOccurrence`;
- derived `ResolvedEntitlementSnapshot` contract;
- half-open effective-period evaluation;
- overlap detection/fail-closed effective subscription selection;
- lifecycle-state derivation by effective occurrence;
- canonical non-negative decimal-string validation;
- offering entitlement uniqueness validation.

Important boundary:

`ResolvedEntitlementSnapshot` is a derived value, not independently editable entitlement truth.

### Tenant bootstrap contracts

`packages/contracts/src/bootstrap.ts`

Provides:

- verified technical identity contract;
- `TenantBootstrapRequest`;
- `TenantBootstrapIntent`;
- exact idempotent retry decision;
- changed-payload/idempotency collision rejection;
- identity/request matching guard;
- established bootstrap guard requiring both tenant and initial owner membership.

Important boundary:

Technical authentication identity does not itself constitute tenant ownership or business authority.

## Verification performed before deeper work

The two production source files were compiled locally against the repository's strict TypeScript posture including:

- `strict`;
- `noUncheckedIndexedAccess`;
- `exactOptionalPropertyTypes`;
- `noImplicitReturns`;
- `verbatimModuleSyntax`;
- NodeNext module semantics.

Result: PASS for production contract sources.

Existing B01 GitHub workflows do not automatically run on this provisional branch, therefore branch-level full CI remains pending until a B02 workflow/PR path is deliberately created.

## Next engineering slices

Safe next slices before final independent CHG closure:

1. operation/envelope contract implementation using the already-frozen QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION grammar;
2. entitlement precondition helpers that can only deny product capability and never grant business authority;
3. bootstrap persistence design and hostile concurrency fixtures as provisional implementation;
4. B02 database execution-context implementation only after the B01 database public-surface allowlist is deliberately evolved and hostile-tested so no raw query capability leaks outside database-core.

## Required tomorrow before merge/freeze

1. run the narrow Claude audit for CHG-SSS-001 v0.4;
2. if PASS, freeze CHG-SSS-001 and supersede the old prospective V1/V2 lock using the SSV namespace;
3. explicitly owner-accept B01 or remediate any newly identified B01 issue;
4. generate/update the canonical B02 prompt/build program from the frozen amendment;
5. reconcile this provisional branch against that canonical prompt;
6. keep, amend, or discard each provisional commit based on the reconciliation;
7. only then open/retarget a formal B02 PR.

## Reversibility statement

All work on this branch is based on B01's independently verified head rather than `main` and is intentionally isolated.

If the final independent CHG audit changes any load-bearing B02 meaning, the provisional branch is not evidence against that change. The affected code is amended or discarded.
