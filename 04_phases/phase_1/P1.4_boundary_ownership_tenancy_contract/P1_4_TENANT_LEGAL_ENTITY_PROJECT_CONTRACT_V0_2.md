# P1.4 — Tenant / Legal Entity / Project Contract v0.2

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / REMEDIATED / EXTERNAL AUDIT PENDING  
**Supersedes:** `P1_4_TENANT_LEGAL_ENTITY_PROJECT_CONTRACT_V0_1.md`  
**Remediation:** closes internal-audit BL-01 and tenancy-side BL-02.

---

## 1. Core organization boundary

V1 is **not required to be a strict organization tree**.

The minimum semantic set is:
- **Tenant** — customer isolation/configuration/security boundary;
- **Operating Organization/Company** — contractor organization using the product;
- **Legal Entity** — legal/accounting/contracting entity where real;
- **Project** — project context inside exactly one tenant;
- **ContractingAuthorityContext** — the explicit contracting authority bound to a project/transaction when legal/commercial authority is required;
- **Branch/BU/JV relationships** — represented only where they materially affect authority/configuration/accounting/numbering/project assignment.

A simple customer may have one operating organization, one legal entity and many projects without seeing additional hierarchy complexity.

---

## 2. Tenant

The tenant is the customer isolation, configuration and security boundary.

A tenant may contain more than one legal entity where the contractor genuinely operates that way.

Tenant ≠ legal entity and tenant ≠ project.

Cross-tenant access is denied by default.

---

## 3. Operating organization and legal entities

The operating organization represents the contractor/customer using the OS.

Legal entities represent the legal/accounting/contracting entities needed by business actions.

Statutory/legal master facts may be externally referenced/mirrored, while the OS owns the relationship between product transactions and their declared legal/contracting context.

Branches/BUs do not automatically become legal entities; if reality makes them legally distinct, that distinction is modeled explicitly.

---

## 4. Project and ContractingAuthorityContext

Every project belongs to one tenant.

When a load-bearing action requires contracting/legal authority, it binds one explicit **ContractingAuthorityContext** at that action/effectiveness point.

A ContractingAuthorityContext may represent:
1. the normal case — one legal entity; or
2. an exceptional evidence-backed multi-party contracting arrangement where no dedicated legal entity exists.

The context is a semantic authority boundary, not a decision that P1.5 must create one physical entity/table.

The project may have one active default ContractingAuthorityContext for new actions at a time, while historical transactions retain the exact context/version that governed them.

This prevents `project.legal_entity_id` from becoming an irreversible hidden assumption.

---

## 5. Multi-party / JV posture

P1.4 does not create a generalized JV collaboration subsystem.

Rules:
- if a JV is a distinct legal entity, use that legal entity in the contracting context;
- if an unincorporated/multi-party arrangement genuinely has joint contracting authority, the ContractingAuthorityContext may identify that bounded arrangement and its participating legal/organization parties;
- the arrangement exists only to express authority needed for the project/transaction;
- it does not create shared tenant data, shared supplier history or a cross-company collaboration portal;
- if a future case needs richer JV governance, that requires controlled evidence/scope review rather than silent expansion.

No current evidence makes JV an independent product gravity well.

---

## 6. Tenant-isolation invariant

No tenant may read, infer, query or receive another tenant's:
- projects or legal/authority relationships;
- memberships/roles/delegations;
- supplier relationship or performance history;
- bidder lists;
- quotes/prices;
- qualification results;
- comparison/evaluation data;
- awards/commitments/commercial positions;
- evidence;
- external grants;
- integration/accounting mappings;
- configuration or analytics.

The **existence of a relationship with another tenant is itself tenant-private** unless independently authorized/disclosed outside this product boundary.

A globally reusable technical authentication identity therefore must not create:
- a tenant directory;
- a list of other contractor relationships;
- tenant-discovery search;
- cross-tenant organization/contact relationship introspection.

Authentication reuse is a technical convenience only. It is not supplier-network membership.

---

## 7. Legal/project authority invariant

A load-bearing procurement/commercial action resolves the required:
- tenant;
- project;
- ContractingAuthorityContext;
- legal-entity/accounting context where applicable;
- relevant authority/config version.

before it becomes effective.

Project identity is not a substitute for contracting/legal authority.

A0–A3 may begin with minimal setup, but any transition that requires legal-entity, accounting, numbering, tax/currency or P07 authority must bind the required context before that transition.

---

## 8. Change of project contracting context

A project authority context may change only through a governed effective-dated transition where the real contracting posture permits it.

The transition must:
1. identify old and new contexts;
2. identify effective time/version;
3. preserve prior transaction interpretation;
4. state treatment of in-flight transactions;
5. prevent silent reassignment of prior awards/commitments/accounting mappings;
6. use explicit migration/rebinding/reconciliation where required.

Changing a current project setting never rewrites historical approvals or commitments.

---

## 9. Branch/BU posture

A branch/BU is not automatically a tenant, legal entity, project or ledger.

It becomes an explicit authority scope only when it changes one or more of:
- internal access/DOA;
- project assignment;
- numbering/configuration;
- accounting mapping;
- operating responsibility.

This is bounded organization context, not an HR master-data product.

---

## 10. Cross-legal/context activity inside one tenant

Cross-entity/context activity is explicit, never inferred.

Examples:
- shared procurement team working for multiple legal entities;
- one entity sourcing for a project whose contracting context is another entity/arrangement;
- commitment issued under a different contracting context;
- accounting posting to a different entity;
- transfer of project authority context.

Shared staff can hold contextual memberships/roles, but each business action remains bound to its transaction authority context.

Intercompany accounting remains `OUT` except for a bounded interface if later evidence requires it.

---

## 11. Project access

Tenant membership does not imply access to every project.

Internal authorization may be scoped by:
- tenant;
- legal entity/ContractingAuthorityContext;
- project;
- branch/BU where relevant.

External supplier/guest access remains independently grant-scoped and never inherits internal project access.

---

## 12. External supplier organization position

V1 supplier business relationships are tenant-private.

The same real-world supplier may have separate records/relationships in separate tenants.

No cross-tenant reuse is implied for qualification, pricing, evidence, bids, performance, awards or grants.

A technical external login may authenticate separately to multiple tenant grants, but:
- each relationship is independently authorized;
- another tenant relationship is not discoverable by default;
- no network profile/master is created.

Cross-tenant supplier network/master remains `OUT` for V1.

---

## 13. Effective dating

Historical governing context must remain interpretable for:
- project ↔ ContractingAuthorityContext;
- ContractingAuthorityContext composition where multi-party;
- tenant membership;
- role/delegation scope;
- branch/BU authority scope;
- integration/accounting authority profile;
- residency region/cutover;
- master-data authority mapping.

P1.5 chooses physical persistence.

---

## 14. First-rail minimum

A simple A0 bootstrap requires only:
- one tenant;
- operating company identity;
- usable contracting/legal context when required by the chosen transition;
- project;
- user membership/role;
- basic money/time defaults.

Multi-entity, branch and multi-party/JV capability cannot become mandatory setup burden for a simple contractor.

Target remains ≤5 working days from clean inputs to first live tender and zero bespoke named connector prerequisite.

---

## 15. Rejected directions

Rejected unless controlled contradictory evidence reopens them:
- tenant per project;
- tenant per branch/BU by default;
- tenant automatically equals legal entity;
- mandatory `project.legal_entity_id` as the only possible contracting authority representation;
- hidden multi-party authority through free text;
- cross-tenant supplier/business relationship sharing;
- tenant discovery through reusable login identity;
- generic HR/corporate hierarchy product;
- generic JV collaboration platform.

---

## 16. Remediation result

**BL-01 CLOSED:** multi-party/unincorporated authority can be represented semantically without forcing a single legal-entity physical model.  
**BL-02 TENANCY SIDE CLOSED:** existence of other tenant relationships is explicitly private; reusable technical identity creates no tenant/network discovery surface.

**CANDIDATE PASS / EXTERNAL AUDIT PENDING.**