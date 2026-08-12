# Build Prompt B02-P01 — Platform + Self-Service/SaaS Kernel — PROVISIONAL

**Status:** PROVISIONAL ENGINEERING SPEC / DO NOT MERGE OR CALL B02 PASS UNTIL CHG-SSS-001 v0.4 FINAL INDEPENDENT PASS + FREEZE + B01 OWNER ACCEPTANCE  
**Branch:** `build/b02-platform-saas-provisional`  
**Base:** independently verified B01 head `5d35a718ba861d18b822246756c640ea0b631a01`  
**Purpose:** remove idle time by implementing only semantics already stable across frozen Phase 1, P2.1/P2.2 and CHG-SSS-001 hostile audit rounds. Reconcile this prompt against the final frozen CHG before formal B02 authorization.

---

# 1. Objective

Build the only legal self-service platform substrate needed before procurement business tables exist.

B02 must provide:

1. technical identity → tenant-scoped principal/membership foundation;
2. idempotent self-service tenant bootstrap;
3. tenant/project/legal-entity/context primitives required by later blocks;
4. product offering / entitlement / subscription control plane separate from procurement truth;
5. product usage-meter semantics based on append-only occurrences;
6. command-time entitlement preconditions that can only narrow product availability and can never grant business authority;
7. the first conventional internal self-service surfaces for signup/account/workspace/project/subscription;
8. exact completion evidence and hostile tests.

B02 must NOT implement procurement requirements, RFQs, supplier responses, comparison, approvals, AwardDecision, P07 commercial truth, evidence acceptance, named ERP/CDE connectors or active AI capabilities.

---

# 2. Controlling invariants

B02 implementation must preserve all inherited B01/P2 invariants and additionally satisfy the following.

## B02-I01 Tenant boundary

`Tenant` is the customer isolation/configuration/security boundary.

- tenant != legal entity;
- tenant != project;
- one technical identity may participate in multiple tenants;
- no tenant relationship is discoverable from another tenant by default;
- all tenant-scoped state is fail-closed under missing/malformed execution context.

## B02-I02 Business authority is not authentication

Technical authentication proves identity only.

Internal business authority requires tenant/context-scoped membership plus current role/delegation/DOA/domain rules.

An external grant can never satisfy internal business authority.

## B02-I03 Bootstrap is atomic and idempotent

Self-service bootstrap conceptually establishes:

`verified authentication identity`
`→ TenantBootstrapIntent`
`→ Tenant`
`→ optional/minimum initial legal-entity/company context`
`→ initial OWNER membership`
`→ product-owned defaults`

Retry/lost response/concurrency must not create duplicate unintended tenant/owner authority.

Same idempotency identity + same payload returns the established result.

Same idempotency identity + different payload fails closed.

## B02-I04 Entitlement cannot grant authority

Commercial entitlement answers only whether a tenant is commercially permitted to use a product capability.

Effective operation permission is the intersection of:

- current product entitlement;
- authenticated principal;
- tenant/project/context membership;
- role/permission;
- delegation/DOA;
- registered operation;
- domain guard;
- evidence/configuration prerequisite;
- security/conformance state.

A higher offering may never create approval, award, Commitment, certification, payment or AI authority.

## B02-I05 Offering semantics are versioned and marketing-independent

No marketed tier name is allowed to become procurement/domain semantics.

Architecture may support versioned `ProductOfferingVersion` bundles, but price, permanent marketing tier names, free/trial duration and AI commercial units remain product configuration rather than domain meaning.

## B02-I06 Subscription periods cannot overlap

Load-bearing `TenantSubscription` effective periods are registered under `EFFECTIVE_PERIOD_NON_OVERLAP` with the applicable frozen concurrency mechanism.

A stale entitlement cache cannot authorize a command.

## B02-I07 Command-time entitlement revalidation

For consequential operations:

`preview entitlement resolution`
`→ material-change invalidation`
`→ command-acceptance entitlement revalidation`
`→ bind exact entitlement evaluation`
`→ accepted logical command remains historically bound`

Later ordinary downgrade/cancellation does not rewrite an already accepted command.

New logical commands use current entitlement.

## B02-I08 Usage is occurrence-derived

`MeteredUsageOccurrence` is append-only.

Consumed, remaining and overage positions are derived.

Manual credit/correction is a new occurrence with actor/reason/evidence, never an editable balance mutation.

## B02-I09 Subscription history never rewrites procurement history

Although procurement history does not yet exist in B02, the substrate must make the future rule possible:

- downgrade/cancel/expiry may restrict future capability;
- it may not delete or reinterpret historical business actions;
- read/export/offboarding can be bounded without rewriting truth.

## B02-I10 No second SaaS/billing gravity well

B02 does not build:

- invoicing;
- AR/AP;
- tax engine;
- payment processing;
- revenue recognition;
- generic entitlement platform;
- customer-specific billing workflows.

Future billing-provider facts are external observations, not CPOS procurement truth.

---

# 3. Existing provisional code to reconcile, not blindly trust

The provisional branch already contains:

- `packages/contracts/src/platform.ts`;
- `packages/contracts/src/platform.test.ts`;
- `packages/contracts/src/bootstrap.ts`;
- `packages/contracts/src/bootstrap.test.ts`;
- `packages/contracts/src/operation.ts`;
- `packages/contracts/src/operation.test.ts`.

Treat these as implementation candidates.

They must be kept only if they pass the final frozen CHG and this B02 gate.

Do not preserve code merely because it already exists.

---

# 4. B02-C1 — Identity / Tenant Bootstrap

## 4.1 Durable concepts

Implement the minimum durable identity/tenant concepts needed by later blocks.

Candidate concepts:

- `AuthenticationIdentity`;
- `Principal`;
- `Tenant`;
- `LegalEntity` only at the minimum authority/configuration grain;
- `TenantMembership`;
- initial owner role/membership binding;
- `TenantBootstrapIntent`;
- `Project` minimum platform identity;
- `ContractingAuthorityContext` minimum platform binding where required by frozen P1.4.

Do not build HR/org-chart/JV management.

## 4.2 Bootstrap command

Define a registered B02 command equivalent to:

`tenant.bootstrap.v1`

It must:

1. require verified technical identity;
2. require idempotency identity;
3. create/find exact `TenantBootstrapIntent`;
4. reject changed-payload reuse;
5. create tenant + initial membership atomically;
6. create initial legal-entity/company context only according to product-owned bootstrap defaults;
7. preserve tenant != legal entity;
8. return the same established result after lost-response retry;
9. never claim ownership inside an already-existing tenant solely because identity is verified.

## 4.3 Required concurrency attacks

At minimum test:

- same bootstrap request 20 concurrent times;
- same identity + same idempotency key + changed tenant name;
- lost response after tenant creation before client sees result;
- two concurrent attempts to establish the same intent;
- authenticated identity already belongs to another tenant;
- user creates another legitimate tenant with a different explicit bootstrap request;
- partially failed initial legal-entity/default creation;
- OWNER membership missing after tenant creation must prevent success disposition.

## C1 PASS condition

One logical bootstrap results in one established bootstrap lineage and exactly the intended tenant/initial owner authority.

---

# 5. B02-C2 — Subscription / Entitlement Core

## 5.1 Durable concepts

Minimum candidate set:

- `EntitlementDefinitionVersion`;
- `ProductOfferingVersion`;
- product-offering entitlement members;
- `TenantSubscription`;
- append-only `SubscriptionLifecycleOccurrence`;
- derived `ResolvedEntitlementSnapshot` projection/cache only.

`ResolvedEntitlementSnapshot` must not become an editable authority table.

## 5.2 Effective periods

`TenantSubscription` uses explicit half-open effective periods:

`[effective_from, effective_until)`

unless the final frozen physical contract specifies another representation with identical semantics.

The active authority cannot overlap for the same tenant/subscription authority dimension.

Register the invariant before introducing the production table.

## 5.3 Lifecycle

Lifecycle occurrences must preserve history and effective time separately from recorded time.

Do not implement a mutable status field as an independent second history ledger.

A convenient current-state projection may exist only if fully derivable and non-authoritative.

## 5.4 Entitlement guard

Implement an entitlement precondition that returns typed dispositions such as:

- not required;
- satisfied;
- blocked/not entitled;
- usage evaluation required.

It must not return or imply business authorization.

## 5.5 Required attacks

- overlapping offering/subscription effective periods;
- upgrade effective exactly when old offering ends;
- downgrade between preview and command;
- downgrade immediately after durable command acceptance;
- stale derived entitlement snapshot;
- feature moves between offering versions;
- legacy customer remains on old offering;
- manual Enterprise activation races provider observation;
- command requires capability absent from offering;
- metered entitlement cannot be treated as automatically satisfied.

## C2 PASS condition

A builder cannot use price/tier/subscription state to grant domain authority or rewrite historical accepted commands.

---

# 6. B02-C3 — Usage / Lifecycle / Offboarding Foundation

## 6.1 Usage measure registry

Implement versioned product-owned usage-measure definitions.

Do not expose raw LLM token accounting as the permanent business model.

Quantity representation must use exact canonical decimal strings across application/JSON boundaries and exact numeric storage where persisted.

## 6.2 Metered usage occurrences

Every occurrence binds at minimum:

- tenant;
- subscription;
- usage measure definition version;
- quantity;
- occurred/effective time;
- recorded time;
- correlation/idempotency identity;
- adjustment relation where applicable.

Duplicate correlation must not double consume usage.

## 6.3 Offboarding/read floor

B02 owns only the platform foundation for future offboarding.

It must distinguish:

- future capability access;
- mutable profile/account state;
- required historical transaction truth;
- export/retention obligations.

Do not implement procurement retention policy before B04/P1.6 ownership.

## C3 attacks

- duplicate usage event;
- negative usage masquerading as normal event rather than explicit adjustment;
- stale derived allowance;
- allowance changes after offering upgrade;
- period boundary race;
- cancellation does not delete tenant history;
- manual commercial credit without actor/reason is rejected.

---

# 7. B02-C4 — First Self-Service Product Surface

B02 introduces the first real conventional internal product surfaces.

Minimum routes/surfaces are product-owned, not final visual design.

Candidate first surfaces:

- sign in / verified-identity handoff;
- create workspace/company;
- workspace/account summary;
- first project creation;
- users/memberships at minimum owner/admin/member level permitted by frozen authority rules;
- subscription/account status;
- entitlement-disabled capability explanation;
- bounded cancellation/export/account controls where physically implemented.

No procurement/RFQ/comparison screen is implemented in B02.

## UX rules

- user must not see internal ontology unnecessarily;
- tenant vs legal entity is kept semantically correct even if UI uses simpler product language;
- entitlement denial is visually distinct from business authorization denial;
- error states never imply an operation succeeded merely because request was accepted;
- Arabic/RTL/accessibility/responsive semantics inherit P1.9/B01 foundations and receive block-local proof where the surface exists.

---

# 8. Operation Registry

Implement or extend the product-owned `OperationRegistry` before exposing state-changing platform behavior.

At minimum B02 operations must have:

- stable operation key;
- version;
- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION class;
- context requirements;
- idempotency requirement;
- entitlement precondition where applicable;
- authority owner;
- expected-version/concurrency profile where applicable;
- evidence/audit requirements;
- typed result/outcome;
- preview/confirmation requirement where applicable.

Commands and async operations require stable idempotency identity.

No raw mutation endpoint is permitted.

---

# 9. Database execution context — explicit design constraint

Do NOT weaken B01's database-public-surface guard to make B02 easier.

B01 currently prevents application/domain packages from receiving raw `pg`, Kysely or unrestricted query capability.

B02 must implement the frozen `withExecutionContext` protocol without creating a generic raw-query escape hatch.

Before changing the B01 database public allowlist:

1. write the exact bounded public capability shape;
2. prove a module cannot smuggle raw pool/client/Kysely/query through it;
3. extend the hostile public-surface tests first or in the same commit;
4. preserve fail-closed context verification;
5. ensure tenant SQL cannot execute before context read-back verification;
6. preserve module write ownership.

If the implementation team cannot produce a bounded capability without exposing unrestricted SQL, STOP this slice and record an architecture implementation question rather than weakening the guard.

This is a physical implementation problem, not permission to reopen tenant/business authority semantics.

---

# 10. RLS / execution context

Every tenant-scoped table introduced by B02 must be covered by the declared tenant/context isolation posture.

Required hostile cases include:

- missing tenant setting;
- malformed tenant setting;
- connection reused tenant A → tenant B;
- internal principal from tenant A supplies tenant B object id;
- global worker claim followed by tenant payload;
- query/search/projection path without execution context;
- SECURITY DEFINER/function/view/trigger cannot silently bypass tenant context;
- current principal/context read-back mismatch;
- external grant cannot be treated as internal membership.

No B02 PASS until cross-tenant result is zero for every released platform path.

---

# 11. Schema / migration discipline

Use forward SQL migrations only.

Before adding each mutable/effective-dated object:

1. map frozen clause/MR/CHG requirement;
2. register applicable invariants;
3. assign physical write owner;
4. assign concurrency mechanism;
5. add reverse object/operation → invariant mapping;
6. add catalog/RLS/security proof;
7. add rollback/rebuild test where reversible.

Do not create tables merely because a TypeScript interface exists.

Do not use ORM auto-sync.

---

# 12. Public API boundary

B02 may expose platform API operations only through the registered operation grammar.

No direct CRUD table endpoints.

API route names are physical implementation choices, but the first product API must clearly separate:

- authentication/identity exchange;
- tenant bootstrap;
- tenant/account read;
- project creation/read;
- membership operations;
- subscription/account read;
- product capability/entitlement read;
- cancellation/account operations when activated.

Do not publish customer-editable offering-definition APIs.

Product offering/entitlement definitions are product-authored.

---

# 13. Product-abuse minimum at B02 test envelope

B02 is not the final public security block, but self-service signup means abuse cannot be completely deferred to B14.

At B02's declared test envelope provide the minimum controls needed for:

- identity verification before consequential platform creation/outbound behavior;
- bootstrap rate limiting or equivalent bounded control seam;
- repeated workspace/trial creation observability;
- resource quota hooks;
- abuse suspension state distinct from ordinary billing state.

Broad sender reputation/outbound RFQ controls belong to later B06/B13/B14 before public supplier release.

No generic fraud engine.

---

# 14. B02 rolling comprehension checkpoint — SSV-1

Under CHG-SSS-001 v0.4 candidate semantics, B02 final PASS includes a real-product `RollingComprehensionCheckpoint`.

At least three non-builder construction practitioners exercise the consequential B02 surfaces against realistic tasks.

Test comprehension of:

- workspace/company creation;
- tenant/company distinction as presented to the user;
- project creation;
- membership/role consequence;
- subscription state;
- product capability unavailable due entitlement versus unavailable due authorization;
- expected next action after errors.

Builder coaching that explains away confusing product semantics does not count as successful comprehension.

Critical-meaning findings block B02 final PASS and therefore block B03.

This checkpoint is comprehension evidence only, not willingness-to-pay or PMF evidence.

If the final independent CHG audit changes SSV labels but not the function, reconcile the label without weakening the gate.

---

# 15. Hostile test matrix

At minimum execute and record:

## Isolation

1. tenant A cannot read/infer tenant B tenant/legal/project/membership/subscription data;
2. technical identity shared across tenants exposes no relationship directory;
3. malformed/missing context fails closed;
4. pooled connection context cannot bleed.

## Bootstrap

5. 20-way duplicate bootstrap concurrency;
6. lost result after commit;
7. same idempotency key changed payload;
8. partial tenant/owner creation;
9. existing invited identity;
10. owner membership cannot be created for unrelated existing tenant by bootstrap identity alone.

## Entitlement

11. overlapping subscription period;
12. boundary instant upgrade/downgrade;
13. stale snapshot;
14. preview then downgrade then command;
15. command accepted then downgrade;
16. higher offering cannot bypass mocked business-authority denial;
17. plan/tier rename requires no domain-row rewrite.

## Usage

18. duplicate correlation;
19. adjustment occurrence preserves prior event;
20. stale remaining allowance;
21. usage period boundary;
22. metered entitlement cannot skip usage evaluation.

## Operation registry

23. unregistered state-changing operation rejected;
24. COMMAND without idempotency rejected;
25. operation version mismatch rejected;
26. context tenant/principal missing rejected;
27. raw table mutation endpoint absent.

## Security / surface

28. entitlement-hidden UI cannot imply business authorization;
29. unauthorized project id cannot be accessed by URL substitution;
30. browser bundle contains no DB/server secret capability;
31. no production secrets in repository/logs;
32. cancellation does not erase authoritative history.

Add independent hostile scenarios before closure.

---

# 16. Completion evidence

Produce:

`docs/build/B02_COMPLETION_EVIDENCE_V1_0_CANDIDATE.md`

and checkpoint evidence for C1–C4.

Final manifest must record:

- exact base/head commits;
- final frozen CHG version;
- final B02 prompt version;
- changed files/migrations;
- operations;
- tables/objects;
- write ownership;
- invariant mappings;
- effective-period dispositions;
- RLS/catalog scan;
- concurrency profiles;
- API/UI surfaces;
- local security/NFR evidence;
- tests and exact commands;
- hostile scenarios;
- SSV-1 comprehension decision;
- unresolved questions;
- rollback;
- independent audit;
- project-owner acceptance.

No successor unlock without final B02 PASS.

---

# 17. Internal commit discipline

Preferred logical slices:

1. contracts + registries;
2. execution-context/RLS foundation;
3. C1 identity/bootstrap persistence + operations;
4. C2 offering/subscription/entitlement persistence + guards;
5. C3 usage/lifecycle/offboarding foundation;
6. C4 API/UI surfaces;
7. hostile tests/security/invariant reconciliation;
8. completion evidence.

Do not mix procurement B05+ work into B02 commits.

---

# 18. Rollback / provisional reconciliation

Until final CHG freeze and B01 acceptance:

- branch remains provisional;
- no merge to `main`;
- no B01 PR mutation is implied by this branch;
- any provisional code contradicting the final frozen amendment is discarded or amended;
- no argument from sunk implementation work is accepted.

After final CHG PASS:

1. reconcile every provisional B02 semantic against frozen CHG;
2. reconcile this prompt against canonical P2.2 delta;
3. regenerate the formal B02 prompt if needed;
4. compare provisional code to the formal prompt;
5. retain only code that passes that comparison;
6. then begin formal B02 completion/audit sequence.
