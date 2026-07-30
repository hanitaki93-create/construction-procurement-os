# P1.4 — Tenant / Legal Entity / Project Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING

---

## 1. Core hierarchy decision

V1 uses the following semantic hierarchy:

`Tenant → Operating Organization/Company → Legal Entity → Project`

with branch/business-unit and JV relationships added only where they materially affect authority, configuration, accounting, numbering or project assignment.

This is not a generic corporate/HR master-data model.

### Tenant

The **tenant is the customer isolation, configuration and security boundary**.

A tenant may contain more than one legal entity when the contractor/customer genuinely operates that way.

Tenant ≠ legal entity by definition.

### Operating organization/company

Represents the contractor organization using the product. It may correspond one-to-one with a legal entity in simple customers, but the semantic distinction remains available where the operating organization spans multiple legal entities.

### Legal entity

Represents the contracting/accounting/legal authority context needed by procurement/commercial actions.

Statutory facts may be externally referenced/mirrored; the product owns the relationship between its transactions and the declared legal context.

### Project

Every project belongs to one tenant and has one explicit **active contracting legal-authority context at a time**.

Historical transactions retain the legal-entity relationship that governed them.

---

## 2. Tenant-isolation invariant

No tenant may read, infer, query or receive another tenant's:
- projects;
- users/memberships/roles/delegations;
- supplier relationship/history;
- bidder list;
- quotes/prices;
- qualification results;
- comparison/evaluation data;
- awards/commitments/commercial positions;
- evidence;
- grants;
- integration/accounting mappings;
- configuration or analytics.

Cross-tenant access is denied by default.

A globally reusable technical human login does not weaken this rule; authorization exists only through tenant-scoped membership or tenant-scoped external grants.

Cross-tenant supplier-network behavior is `OUT` for V1.

---

## 3. Legal-entity/project authority invariant

A load-bearing procurement/commercial action must resolve to the legal/project context required by that action before it can become effective.

The product may support early A0–A3 sourcing with minimal commercial setup, but when a transition depends on legal-entity authority, accounting mapping, numbering, tax/currency policy or P07 commitment authority, the required context must be explicit and bound.

Project identity must never be used as a substitute for legal-entity authority.

---

## 4. Project transfer / legal-context change

A project/legal-entity relationship may change only through a governed effective-dated transition when the real-world contracting posture permits it.

The transition must:
1. identify prior and new legal contexts;
2. identify effective time/version;
3. preserve prior transaction interpretation;
4. define which in-flight transactions remain governed by prior context;
5. prevent silent migration of existing awards/commitments/accounting mappings;
6. trigger explicit rebinding/reconciliation only where lawful and intended.

Changing the project's current legal-entity field may never rewrite historical approvals or commitments.

---

## 5. Branch and business-unit posture

A branch/BU is **not automatically**:
- a tenant;
- a legal entity;
- a project;
- an accounting ledger.

It becomes a first-class authority scope only when reality requires it for one or more of:
- internal authorization/DOA;
- project assignment;
- numbering/configuration;
- accounting mapping;
- operating responsibility/access.

If a branch is legally distinct in the deployment, model that reality through the legal-entity context rather than assuming all branches have the same status.

---

## 6. JV / multi-organization posture

P1.4 does not create a generalized JV collaboration subsystem.

V1 rule:
- where the JV is a distinct legal entity, use the legal-entity model;
- where multiple organizations participate without a dedicated legal entity, represent only the explicit relationship needed for the project/authority/commitment context;
- do not create cross-tenant sharing merely because two companies cooperate on a project;
- if the required JV authority cannot be represented without a broader collaboration model, that case requires controlled scope/evidence review rather than silent generalization.

No current evidence requires JV to become a separate product gravity well.

---

## 7. Cross-legal-entity actions inside one tenant

Cross-entity activity is never implicit.

Examples requiring explicit authority/context include:
- one entity sourcing for a project contracted by another;
- shared procurement teams;
- transfer of demand/package responsibility;
- commitment issued by a different legal entity;
- accounting posting to a different entity;
- intercompany recharge or settlement.

P1.4 permits shared internal staff across legal entities through contextual memberships/roles, but the business action remains bound to its transaction legal context.

Intercompany accounting is `OUT` unless later evidence creates a bounded required interface.

---

## 8. Project access

Default internal authorization is tenant-scoped **and context-restricted**.

A tenant member may have:
- tenant-wide access where granted;
- legal-entity scoped access;
- project scoped access;
- branch/BU scoped access where that scope exists.

Membership in the tenant alone does not imply access to every project.

External supplier/guest access remains grant-scoped and does not inherit internal project access.

---

## 9. External supplier organization position

V1 supplier business identity/relationship is tenant-private.

A supplier may participate with two contractor tenants, but the two tenant relationships are independent.

No cross-tenant reuse is implied for:
- qualification;
- bid history;
- contacts relationship history;
- pricing;
- evidence;
- awards;
- access grants;
- performance.

A technical login identity may authenticate to more than one tenant relationship, but each relationship/grant remains independently authorized.

A shared supplier-network master/profile is `OUT` for V1.

---

## 10. Effective dating required by this contract

The following relationships must preserve historical governing context where they can change:
- project ↔ legal entity;
- tenant membership;
- role/delegation scope;
- branch/BU assignment where authority-relevant;
- integration/accounting authority profile;
- residency region/cutover;
- project/master-data authority mapping.

P1.5 decides physical persistence; P1.4 freezes historical interpretability.

---

## 11. First-rail minimum

A0 bootstrap needs only the minimum hierarchy necessary for the first sourcing rail:
- one tenant;
- operating company identity;
- at least one usable legal context when required by the chosen sourcing/award posture;
- project;
- user membership/role;
- basic money/time defaults.

Multi-entity, branch and JV capability cannot become mandatory onboarding configuration for a simple contractor.

Standard configuration to first live tender remains targeted at ≤5 working days from clean inputs, with zero bespoke named connectors required.

---

## 12. Rejected directions

Rejected unless controlled contradictory evidence reopens them:
- tenant per project;
- tenant per branch/BU by default;
- tenant automatically equals legal entity;
- project floats across legal entities without explicit authority;
- current legal-entity mapping retroactively reinterprets old transactions;
- cross-tenant supplier relationship/history sharing;
- generic HR/corporate hierarchy product;
- generic JV collaboration platform.

---

## 13. Internal result

**CANDIDATE PASS — tenant, company, legal-entity and project authority is unambiguous enough for P1.5 physical design, subject to hostile external review.**

P1.5 remains locked.