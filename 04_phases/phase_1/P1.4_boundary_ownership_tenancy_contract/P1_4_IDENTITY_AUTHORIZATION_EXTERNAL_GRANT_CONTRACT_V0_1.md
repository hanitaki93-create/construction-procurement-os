# P1.4 — Identity, Authorization & External Grant Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING

---

## 1. Core decision

Internal authorization and external supplier/guest access share bounded **principal, identity and audit primitives**, but they remain **separate authorization models with separate semantics**.

This resolves OBL-P14-01 at the semantic boundary level.

The product does not build one generalized policy engine that treats employees, suppliers, guests, approval authority and task links as interchangeable permission subjects.

---

## 2. Principal families

### Internal principal

A human or service identity acting through tenant membership.

Internal authorization may depend on:
- tenant membership;
- role/permission;
- legal-entity scope;
- project scope;
- branch/BU scope where used;
- delegation;
- DOA/approval policy;
- compliance prerequisites;
- current domain invariants.

### External principal

A supplier/subcontractor/contact/guest identity acting through a bounded external grant or governed representation path.

External capability may depend on:
- tenant;
- project;
- tender/task/evidence scope;
- represented external organization/contact;
- grant validity/expiry/revocation;
- authentication assurance appropriate to the task.

It does **not** gain internal tenant membership merely by participating.

### Acting internal principal representing an external party

Buyer-on-behalf capture remains an internal action with explicit represented-party provenance.

The internal actor does not become the supplier, and the supplier is not falsely recorded as directly authenticated.

---

## 3. Hard non-bypass invariant

> An external access grant can never satisfy, substitute for or bypass P09 internal permission, role, delegation, DOA, compliance or deterministic domain-command authorization.

Examples:
- access to upload a bid does not grant award authority;
- access to acknowledge a tender does not grant internal project access;
- access to submit a clarification does not grant ability to alter tender release truth;
- a supplier login that also belongs to another tenant never imports authority from that tenant;
- an expired/revoked external grant cannot be resurrected by a persistent account.

Domain commands always revalidate their internal or external authorization semantics explicitly.

---

## 4. Shared substrate allowed

The following may be reused technically without merging authorization semantics:
- global authentication account identity;
- principal identifier;
- contact/email verification capability;
- session/security primitives;
- audit event substrate;
- provenance fields;
- organization/contact linkage primitives.

Reuse exists to reduce implementation duplication, not to create shared permissions.

---

## 5. Internal authorization contract

Internal command authorization resolves at action time using the relevant historical/current governing context.

Minimum semantic inputs:
- acting principal;
- tenant membership;
- action/command;
- role/permission grants;
- contextual legal entity/project/BU scope;
- active delegation where applicable;
- DOA/policy version where applicable;
- compliance/override status where applicable;
- domain invariants.

Workflow/task completion alone never creates commercial truth. It may provide an approved outcome consumed by the relevant domain command.

---

## 6. External grant contract

Each external grant is bounded by:
- issuing tenant;
- represented/authorized external principal or invitation target;
- project where relevant;
- tender/task/evidence resource scope;
- allowed action set;
- issue time;
- expiry;
- revocation state;
- provenance of issuance;
- authentication/claim state where relevant.

No V1 external grant is tenant-wide supplier network membership.

Grants are least-privilege and independently revocable.

---

## 7. Guest and persistent identity decision

Persistent supplier signup is **optional**, not required for first participation.

Supported semantic participation paths may include:
- task/tender guest link;
- verified email path;
- optional persistent external account;
- buyer-on-behalf capture.

An optional persistent account may improve repeat participation, but:
- prior guest actions remain attributed to their original evidence/principal context;
- account claiming/linking requires provenance-backed association;
- linking never rewrites the historical actor record;
- the account does not inherit cross-tenant business history or grants.

---

## 8. Tenant-private external organization model

V1 does not require a global supplier organization master/network.

The supplier/subcontractor **business relationship** is tenant-private.

The same real-world supplier may therefore have separate relationship records in separate contractor tenants.

This is deliberate isolation, not a data-quality defect.

Potential future neutral identity/dedup/network features are outside V1 and require controlled scope change.

---

## 9. Buyer-on-behalf capture contract

When an internal user captures a supplier response received by email, phone, physical document or another allowed channel, the transaction must preserve at least:
- acting internal principal;
- represented supplier organization/contact if known;
- original source channel;
- source evidence/reference;
- capture time;
- statement that the action was buyer-on-behalf rather than direct supplier authentication;
- any later supplier confirmation as a distinct event/evidence item.

The product must never transform buyer-entered data into falsely authenticated supplier truth.

---

## 10. Revocation and offboarding

Revocation affects **future capability**, not historical attribution.

Therefore:
- external grant revocation disables future permitted actions;
- internal membership revocation disables future internal actions;
- account deactivation does not erase prior transaction actors;
- supplier relationship deactivation does not erase bids/awards/evidence;
- eligible mutable profile/contact/account data may be minimized under the evidence-lifecycle contract without falsifying action history.

---

## 11. Authentication boundary

P1.4 freezes authorization semantics, not a specific authentication vendor/protocol.

Authentication mechanism may vary by risk/action, but it must not change the principal/grant distinction.

P1.5/NFR work may choose concrete mechanisms while preserving:
- identity assurance appropriate to action;
- replay/expiry protection for links/tokens;
- revocation;
- auditability;
- no privilege broadening during account linking.

---

## 12. Classification interaction

Sensitivity/access classification is a bounded fact used by fixed deterministic access checks where required.

It does not create a tenant-authored authorization language and cannot grant authority that role/delegation/DOA/domain rules do not provide.

Classification can restrict or require handling; it cannot manufacture commercial authority.

---

## 13. Rejected directions

Rejected for V1:
- external guest = internal user with fewer permissions;
- one generic programmable authorization engine controlling all internal/external semantics;
- mandatory persistent supplier signup before tender response;
- cross-tenant grant reuse;
- supplier-network membership as baseline access;
- automatic qualification/permission inheritance across tenants;
- buyer-on-behalf capture recorded as direct supplier authentication;
- current role/delegation values retroactively used to explain historical approvals.

---

## 14. ADR impact candidate — no status change yet

This contract materially constrains ADR-0008, ADR-0012, ADR-0018, ADR-0019 and ADR-0020.

It preserves ADR-0012's provisional low-friction external participation direction while resolving the internal-vs-external authorization seam.

No ADR status is changed before hostile review.

---

## 15. Internal result

**CANDIDATE PASS — internal authorization and external grants are semantically separated with a hard non-bypass invariant, while low-friction external participation remains intact.**

External hostile review remains required.