# B02 Invariant Reconciliation 001 — Pre-Tenant Bootstrap Isolation

**Date:** 2026-08-08  
**Status:** FROZEN B02 PHYSICAL-INVARIANT RECONCILIATION  
**Discovered during:** B02-C1 implementation  
**Semantic reopen:** NO  
**Upstream authority:** P1.4 F04/F08, CHG-SSS-001 §13, P2.1 fail-closed execution-context rules  
**Active-register effect:** adds `INV-SSS-018` and `CP-SSS-06` to the CHG-SSS-001 invariant overlay for B02 implementation

---

# 1. Discovery

Normal CPOS business/control operations are tenant-scoped and use fail-closed tenant execution context plus FORCE RLS.

Self-service tenant bootstrap is necessarily initiated before the new tenant exists.

Using a fake/reserved tenant identity for bootstrap would misrepresent the tenancy model and risks turning a convenience sentinel into authority.

Using a generic unscoped platform query path would create a bypass around F04 tenant privacy and F08's rule that authentication is not business authority.

Therefore B02 requires a separate **bounded pre-tenant bootstrap execution mode**, not a weakened ordinary tenant mode.

---

# 2. INV-SSS-018 — Pre-Tenant Bootstrap Isolation

**Invariant:** A pre-tenant bootstrap execution may access only the bootstrap-control lineage for the currently verified technical authentication identity and the exact server-proposed tenant identity for that logical bootstrap. It may create the initial tenant/owner lineage only through the registered bootstrap operation. It cannot read, infer, mutate or authorize any existing tenant business/control state and cannot become a generic platform-global execution path.

**Class:** `STRUCTURAL_BOUNDARY / NON_SUBSTITUTION`

**Sources:**

- P1.4 F04 cross-tenant privacy;
- P1.4 F08 technical authentication identity may be reusable but business authority exists only through tenant-scoped membership/role/delegation/DOA;
- CHG-SSS-001 self-service tenant bootstrap;
- P2.1 fail-closed DB context and bounded module capability.

**Participating objects:**

- pre-tenant bootstrap execution context;
- TenantBootstrapIntent;
- Tenant;
- initial Principal/TenantMembership;
- initial LegalEntity/ContractingAuthorityContext where created in C1;
- bootstrap persistence adapter/role;
- later ordinary tenant execution context.

**Owner:** B02-C1.

**Concurrency sensitive:** YES.

---

# 3. Required physical mechanism

The implementation shall use a dedicated bootstrap execution mode carrying only bounded bootstrap identity:

- verified technical `authenticationIdentityId`;
- exact `proposedTenantId` generated/accepted by the trusted server-side bootstrap operation;
- exact registered bootstrap operation key/version;
- invocation/logical-command identity;
- service identity;
- module identity.

It shall **not** fabricate `cpos.tenant_id` before the tenant exists.

The bootstrap database role:

- is non-superuser;
- has no BYPASSRLS;
- is not a member of ordinary tenant runtime roles;
- has only the minimum privileges needed for bootstrap-control lookup and atomic creation of the proposed tenant's initial lineage;
- cannot select arbitrary existing tenant rows;
- cannot update/delete established tenant business state.

Bootstrap-control state is isolated by the verified technical identity and logical bootstrap identity, not exposed as an unfiltered global table.

Tenant-scoped rows created during bootstrap must be constrained so bootstrap may create/read only rows whose `tenant_id` equals the exact `proposedTenantId` bound in the bootstrap context.

After establishment, all ordinary product operations use the normal tenant-scoped `withExecutionContext` path. Bootstrap identity alone never grants post-bootstrap business authority.

---

# 4. CP-SSS-06 — Bootstrap atomicity and isolation

**Invariants:** `INV-SSS-007`, `INV-SSS-008`, `INV-SSS-018`  
**Isolation:** READ COMMITTED permitted only with CC-3 uniqueness plus one atomic transaction; escalate to SERIALIZABLE only if a discovered cross-row predicate cannot be protected by the registered constraints/guard  
**Unique grain:** verified authentication identity + bootstrap idempotency key  
**Bound proposed resource:** one exact proposed tenant identity + initial owner lineage  
**Runtime role:** dedicated bootstrap role; `NOSUPERUSER`, `NOBYPASSRLS`, no ordinary tenant-role membership  
**Retry:** same logical bootstrap identity; changed payload under same idempotency key fails closed  
**Lost result:** retry returns the exact established bootstrap result rather than creating a second tenant

---

# 5. Mandatory hostile proofs

Before B02-C1 PASS, execute at minimum:

1. twenty concurrent identical bootstrap attempts produce one TenantBootstrapIntent and one tenant/initial-owner lineage;
2. same identity + same idempotency key + changed payload is rejected;
3. lost result followed by retry returns the same tenant and owner membership;
4. bootstrap identity A cannot read identity B's bootstrap intent;
5. bootstrap identity A cannot select an existing tenant not equal to its proposed tenant;
6. bootstrap role cannot use an arbitrary proposed tenant to obtain existing tenant membership/authority;
7. bootstrap role cannot UPDATE/DELETE an established tenant or membership after bootstrap;
8. ordinary tenant runtime cannot query the pre-tenant bootstrap-control index;
9. bootstrap context cannot call a non-bootstrap persistence adapter;
10. ordinary tenant execution context cannot call a bootstrap-scoped adapter;
11. no `SET`, `set_config`, role mutation, DDL or raw DB capability is reachable through module persistence;
12. after establishment, authentication identity by itself fails every business-authority check until the exact tenant membership/role path is used.

---

# 6. Reverse-map additions

| Object / operation | Required invariant references |
|---|---|
| TenantBootstrapIntent | INV-SSS-007, INV-SSS-008, INV-SSS-018 plus inherited idempotency invariants |
| pre-tenant bootstrap execution context | INV-SSS-008, INV-SSS-018 |
| bootstrap persistence adapter/role | INV-SSS-018 |
| tenant bootstrap command | INV-SSS-007, INV-SSS-008, INV-SSS-018 |
| initial Tenant/TenantMembership creation | INV-SSS-007, INV-SSS-008, INV-SSS-018 plus inherited tenancy/authority invariants |

---

# 7. Disposition

`ARCHITECTURE REOPEN = NO`

`CHG-SSS-001 REOPEN = NO`

`NEW PHYSICAL INVARIANT = YES / REGISTERED BEFORE TABLE IMPLEMENTATION`

`B02-C1 MAY CONTINUE SUBJECT TO THE PROOFS ABOVE`

This reconciliation narrows the implementation surface. It does not create a general platform-global authority path.
