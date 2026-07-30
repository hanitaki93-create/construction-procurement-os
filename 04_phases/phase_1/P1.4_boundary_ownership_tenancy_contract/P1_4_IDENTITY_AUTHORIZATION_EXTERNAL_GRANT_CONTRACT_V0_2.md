# P1.4 — Identity, Authorization & External Grant Contract v0.2

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / REMEDIATED / EXTERNAL AUDIT PENDING  
**Supersedes:** `P1_4_IDENTITY_AUTHORIZATION_EXTERNAL_GRANT_CONTRACT_V0_1.md`  
**Remediation:** closes internal-audit BL-02.

---

## 1. Core decision

Internal authorization and external supplier/guest access may share bounded principal, authentication and audit primitives, but they remain **separate authorization models with separate semantics**.

An external grant can never satisfy, substitute for or bypass P09 internal permission, role, delegation, DOA, compliance or deterministic domain-command authorization.

---

## 2. Principal families

### Internal principal

Acts through tenant membership and contextual internal authority.

Relevant authority may include:
- tenant membership;
- role/permission;
- legal/ContractingAuthorityContext scope;
- project scope;
- branch/BU scope where used;
- delegation;
- DOA/approval policy;
- compliance/override state;
- domain invariants.

### External principal

Acts only through bounded tenant/resource grants or governed buyer-on-behalf representation.

External capability may depend on:
- issuing tenant;
- project;
- tender/task/evidence resource;
- allowed actions;
- represented supplier/contact;
- grant validity/expiry/revocation;
- authentication assurance appropriate to the action.

External participation never creates internal membership.

---

## 3. Shared technical identity substrate

A technical authentication identity may be reusable across more than one tenant relationship.

Allowed shared primitives include:
- account/principal ID;
- authentication/session controls;
- verified email/contact primitives;
- audit/provenance infrastructure.

This technical reuse does **not** create shared business identity, shared authorization or supplier-network membership.

---

## 4. Cross-tenant non-discovery invariant

The existence of a relationship between an identity and another tenant is tenant-private unless independently authorized/disclosed.

Therefore a reusable account must not, by default, expose:
- a directory/list of contractor tenants the external party has worked with;
- another tenant's supplier/contact relationship;
- another tenant's invitations/grants;
- another tenant's project/tender names;
- another tenant's qualification/bid/award/performance/evidence history;
- a search or introspection API revealing whether another tenant knows the identity.

One tenant must not be able to ask the system, directly or indirectly, “which other customers use this supplier/contact?” through the shared identity layer.

Account recovery/profile UX must not become a supplier-network directory by convenience.

---

## 5. Internal authorization contract

Each internal state-changing command evaluates the relevant current/bound authority context, including:
- principal;
- tenant membership;
- command/action;
- contextual role/permission;
- ContractingAuthorityContext/project/BU scope where required;
- active delegation;
- applicable DOA/policy version;
- compliance/override prerequisites;
- domain invariants.

Workflow/task outcome may authorize a later bounded domain command but never writes commercial truth directly.

---

## 6. External grant contract

Every external grant is independently scoped by:
- issuing tenant;
- invitation/authorized external principal;
- represented external organization/contact where known;
- project where relevant;
- tender/task/evidence resource;
- allowed actions;
- issue time;
- expiry;
- revocation state;
- provenance/authentication state.

No grant is reusable across tenants.

No network membership creates baseline access.

---

## 7. Guest and persistent account decision

Persistent supplier signup is optional, not required for first participation.

Allowed semantic paths include:
- task/tender guest link;
- verified email path;
- optional persistent external account;
- governed buyer-on-behalf capture.

A persistent account may link to prior guest activity only through provenance-backed association.

Linking:
- does not rewrite historical actor/authentication facts;
- does not reveal other tenant relationships;
- does not import any grant or business history from another tenant;
- does not turn tenant-private supplier records into one global supplier master.

---

## 8. Buyer-on-behalf capture

A buyer-on-behalf action preserves:
- acting internal principal;
- represented supplier organization/contact if known;
- source channel;
- source evidence/reference;
- capture time;
- explicit buyer-on-behalf status;
- later supplier confirmation as a separate event where required.

Buyer-entered data is never falsely represented as direct supplier-authenticated truth.

Supplier source evidence may still be genuine supplier truth when the captured underlying quote/email/document was supplier-issued; provenance must make that basis visible.

---

## 9. Revocation and offboarding

Revocation affects future capability, not historical attribution.

- internal membership revocation stops future internal actions;
- external grant revocation stops future grant actions;
- account deactivation does not erase prior actors;
- supplier relationship deactivation does not erase transaction evidence;
- eligible profile/contact data may later be minimized under the evidence-lifecycle contract.

---

## 10. Authentication boundary

P1.4 does not select an authentication vendor/protocol.

Later implementation must preserve:
- task-appropriate assurance;
- expiry/replay protection for links/tokens;
- revocation;
- auditability;
- no privilege broadening from account linking;
- cross-tenant non-discovery.

---

## 11. Classification interaction

Sensitivity/access classification is bounded recorded metadata consumed only by fixed deterministic product checks where required.

It cannot grant internal authority, create cross-tenant access or become a tenant-authored policy language.

---

## 12. Rejected directions

Rejected for V1:
- guest = internal user with fewer permissions;
- one generalized programmable policy engine for all internal/external authority;
- mandatory persistent supplier signup;
- cross-tenant grant reuse;
- network membership as baseline access;
- global supplier relationship/history master;
- tenant discovery through shared account identity;
- buyer-on-behalf capture recorded as direct supplier authentication;
- historical authorization interpreted using only current role/delegation values.

---

## 13. Remediation result

**BL-02 CLOSED:** reusable technical identity is explicitly non-discoverable across tenant relationships and cannot become an accidental supplier-network directory.

The internal/external authorization non-bypass rule remains unchanged.

**CANDIDATE PASS / EXTERNAL AUDIT PENDING.**