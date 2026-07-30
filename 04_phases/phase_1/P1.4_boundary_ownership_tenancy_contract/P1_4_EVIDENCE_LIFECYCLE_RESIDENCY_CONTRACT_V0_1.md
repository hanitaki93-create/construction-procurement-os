# P1.4 — Evidence Lifecycle, Offboarding & Residency Contract v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / EXTERNAL AUDIT PENDING

---

## 1. Core decision

The OS separates **immutable/reconstructable transaction history** from **mutable access/account/contact/operational data**.

Tenant or external-party offboarding revokes capability and permits eligible data minimization/disposition without rewriting the historical commercial record.

Neither of these extremes is allowed as the default architecture:
- destructive deletion that makes prior awards/commitments/evidence unexplainable;
- perpetual retention of every tenant/external-party datum with no defined basis.

This resolves OBL-P14-02 at the semantic boundary level.

---

## 2. Evidence authority boundary

For product-governed transactions, the OS owns the integrity/provenance of captured transaction evidence including as applicable:
- tender releases/addenda;
- bid/quote submissions and revisions;
- clarifications/confirmations;
- comparison/approval/award evidence;
- commitment/change evidence when P07 is active;
- receipt/claim/assessment/certification/recovery evidence when those domains are active;
- buyer-on-behalf source evidence;
- bounded external-grant issuance/revocation/use history.

The OS references or narrowly mirrors externally authoritative:
- CDE drawings/submittals/review records;
- ERP/accounting/payment records;
- bank/security records;
- legal records;
- master correspondence;
- other systems explicitly configured as authority.

The product does not become a general CDE/records-management platform.

---

## 3. Evidence version and supersession rule

Load-bearing transaction evidence is not edited in place to change history.

Corrections use one of:
- new source revision;
- superseding evidence;
- governed correction event;
- external-authority update/reference with retained source/version context.

Prior versions remain interpretable for as long as their retention basis requires them.

Supplier source truth, buyer normalization and buyer evaluation adjustment remain separate evidence/truth layers.

---

## 4. Data lifecycle categories

This contract uses bounded lifecycle categories, not arbitrary tenant-authored records policies.

### A. Governed transaction history/evidence

Examples: issued tender release, quote revision, approval evidence, AwardDecision, commitment/change evidence.

Treatment:
- history-preserving while an applicable retention basis remains active;
- access may be removed without deleting the record;
- later disposition must not falsify dependent business history;
- where payload disposition becomes eligible, minimum disposition/provenance record may remain as required to explain that disposition.

### B. Mutable account/contact/access data

Examples: login profile, current email/phone, invitation state, active membership, active supplier contact details.

Treatment:
- revoke/deactivate promptly through offboarding;
- minimize/delete eligible fields when no longer needed under the applicable basis;
- historical transaction attribution may retain a stable actor/principal token, role/org context and necessary non-sensitive provenance rather than the full mutable profile.

### C. Configuration/authority history

Examples: project↔legal-entity mapping, DOA policy version, integration authority map, residency region.

Treatment:
- preserve governing versions needed to interpret historical transactions;
- current config can be removed from active use at offboarding while historical binding remains locked/reconstructable.

### D. External references/mirrors

Treatment:
- external authority remains external;
- local mirror may be disposed/minimized when operational need/retention basis expires;
- historical transaction that relied on an external record must preserve the minimum source/version/effective/freshness provenance required to explain what was relied on.

### E. Derived caches/search/indexes

Treatment:
- disposable/rebuildable from authoritative retained data;
- not treated as separate evidence authority.

### F. Secrets/tokens/session material

Treatment:
- revoke/delete according to security lifecycle;
- never retained merely to preserve transaction history.

---

## 5. Retention-basis contract

Retention is governed by an explicit basis rather than `keep forever`.

Allowed semantic basis families may include:
- active transaction/contractual dependency;
- customer contract/configured product retention requirement;
- applicable legal/regulatory requirement where verified for the deployment;
- active dispute/audit dependency where the customer has a valid basis;
- security/audit requirement for bounded access/action history.

P1.4 does **not** define jurisdiction-specific retention durations.

Those durations/defaults require current authoritative legal/contractual evidence and later product/legal review.

The product does not provide arbitrary tenant-authored retention-rule language or enterprise records schedules.

---

## 6. Disposition contract

A governed evidence payload becomes eligible for disposition only when:
1. its applicable retention basis has expired or been lawfully removed;
2. no active dependency recorded by the product requires the evidence to explain an in-scope transaction;
3. disposition is authorized;
4. the action preserves a bounded disposition audit fact where required;
5. dependent projections/indexes are updated accordingly.

Disposition is not a commercial event reversal.

Deleting eligible evidence does not erase the fact that a historical domain event occurred.

Exact legal deletion obligations remain jurisdiction/contract dependent and are not invented here.

---

## 7. Tenant offboarding state transition

Tenant offboarding is a controlled lifecycle, not `DELETE tenant`.

Minimum semantic sequence:
1. stop new commercial/sourcing actions at the agreed cutoff;
2. revoke internal/external active access as appropriate;
3. complete/export/return customer data where contractually required and supported;
4. freeze remaining retained transaction/configuration history into non-operational retained state;
5. delete/minimize eligible account/contact/secret/cache data;
6. retain only data with an explicit continuing basis;
7. dispose remaining retained data when its basis expires and dependencies clear.

The OS need not remain an active working tenant merely because some history remains retained.

---

## 8. User/contact/supplier offboarding

### Internal user

Removing a user:
- removes future tenant authorization;
- revokes sessions/access;
- may minimize eligible profile/contact data;
- preserves sufficient historical principal/role/org/time context to explain prior governed actions.

### External contact/account

Removing/deactivating an external account/contact:
- revokes future grants/account capability;
- does not erase prior quote/submission/clarification attribution;
- may minimize eligible current contact/profile data;
- does not keep a supplier portal account active merely because evidence is retained.

### Supplier organization relationship

Deactivation:
- stops future ordinary selection/use according to tenant rules;
- revokes or prevents new grants as applicable;
- preserves prior participation and commercial evidence under its basis;
- remains tenant-private.

---

## 9. Sensitivity/access classification boundary

A transaction/evidence item may store a bounded sensitivity/access classification and assignment provenance.

The classification may be consumed by fixed deterministic product checks.

It does not create:
- arbitrary classification-rule language;
- tenant-authored dynamic authorization logic;
- general retention-rule language;
- redaction engine;
- legal hold/eDiscovery platform;
- enterprise information-governance subsystem.

Retention basis and authorization remain explicit concepts; classification cannot silently become their policy engine.

This resolves OBL-P14-03.

---

## 10. Residency decision

V1 adopts a **tenant-level product-hosted residency/provisioning region** as the semantic boundary.

Rules:
- product-hosted tenant data belongs to the tenant's configured hosting region unless a governed product operation explicitly states otherwise;
- legal entities/projects inside a tenant do not freely select independent regions by default;
- external authoritative systems may reside elsewhere; `REFERENCE/MIRROR` semantics must state that the OS does not control the external system's residency;
- cross-tenant aggregation/network analytics outside the tenant residency boundary is not a V1 assumption;
- region is configuration with history, not a hidden infrastructure detail.

This is an architectural product boundary, **not a claim that UAE/GCC law requires a specific hosting region**.

No jurisdiction-specific residency obligation is asserted by this artifact.

---

## 11. Region migration

A tenant region may change only through a governed migration/cutover.

Minimum semantics:
1. authorized migration request;
2. source and destination region identified;
3. effective cutover time/version;
4. in-flight operations assessed and paused/reconciled where required;
5. retained evidence/configuration history transferred according to the valid basis;
6. external references remain external and their region is not falsely represented as migrated;
7. migration evidence retained;
8. old-region copies disposed according to the migration/security/retention plan rather than left as silent duplicate authority.

P1.5/NFR work determines physical migration mechanisms.

---

## 12. External-record disappearance/change

Because an external reference can change or disappear, any load-bearing transaction relying on it must preserve enough provenance to explain the decision at the time.

Depending on the domain this may require:
- external record ID;
- version/revision;
- effective state;
- observed/fetched time;
- hash/checksum where useful;
- locally retained supplier-facing release copy when the OS issued that exact basis.

The OS is not required to clone the entire external repository.

---

## 13. Rejected directions

Rejected:
- tenant offboarding = immediate destructive history deletion;
- tenant offboarding = perpetual active tenant forever;
- perpetual retention as architectural default;
- automatic deletion based only on a classification label;
- classification-driven arbitrary policy engine;
- full CDE/records management/legal hold/eDiscovery scope;
- claiming control over residency of external systems;
- per-project arbitrary region selection in V1;
- global cross-tenant supplier/evidence analytics by default.

---

## 14. ADR impact candidate — no status change yet

This contract materially constrains ADR-0014, ADR-0019, ADR-0020 and the P1.4 residency position, and is consistent with ADR-0024 provenance requirements.

A new residency ADR is not created merely for numbering convenience; any ADR addition/change should occur after hostile review confirms the decision boundary.

No ADR status is changed here.

---

## 15. Internal result

**CANDIDATE PASS — immutable evidence, offboarding/minimization, bounded retention, classification limits and tenant-level residency are mutually coherent without CDE/records-management expansion.**

Jurisdiction-specific retention/residency rules remain evidence-dependent deployment/legal inputs and do not block P1.5 physical commercial-core design.

External hostile review remains required.