# P1.4 — Internal Boundary Audit v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL HOSTILE AUDIT / REMEDIATION REQUIRED  
**Scope:** P1.4 workplan, alternatives matrix, authority inventory and candidate contracts created before this audit.

---

## 1. Verdict

`FAIL NARROWLY — three P1.4 boundary ambiguities must be remediated before external hostile review.`

No failure requires reopening P1.1, P1.2 or P1.3. No competitor research is required.

P1.5 and product code remain locked.

---

## 2. Artifacts attacked

- `P1_4_WORKPLAN_V0_1.md`
- `P1_4_OWNERSHIP_TENANCY_ALTERNATIVES_MATRIX_V0_1.md`
- `P1_4_LOAD_BEARING_AUTHORITY_INVENTORY_V0_1.md`
- `P1_4_OWN_MIRROR_REFERENCE_OUT_CONTRACT_V0_1.md`
- `P1_4_TENANT_LEGAL_ENTITY_PROJECT_CONTRACT_V0_1.md`
- `P1_4_IDENTITY_AUTHORIZATION_EXTERNAL_GRANT_CONTRACT_V0_1.md`
- `P1_4_EVIDENCE_LIFECYCLE_RESIDENCY_CONTRACT_V0_1.md`
- `P1_4_EFFECTIVE_DATED_CONFIGURATION_BINDING_V0_1.md`
- `P1_4_ACCOUNTING_INTEGRATION_AUTHORITY_CONTRACT_V0_1.md`
- current `02_research/control/adr_log.csv`

---

## 3. Gate audit

| Gate | Result | Reason |
|---|---|---|
| G0 canonical orientation | **PASS** | GitHub state/handoff/frozen/closed inputs and exact ADR log were read first. |
| G1 tenant isolation | **FAIL NARROW** | technical reusable login is allowed, but explicit prohibition on discovering/listing other tenant relationships from that identity is missing. |
| G2 legal-entity/project authority | **FAIL NARROW** | current hierarchy can be read as forcing one legal entity even for a valid unincorporated multi-party contracting posture. |
| G3 authority coverage | **PASS** | P01–P12/shared load-bearing concerns have authority source/boundary treatment; deployment-profiled facts still require exactly one bound authority. |
| G4 internal auth/external grants | **PASS** | separate semantics and non-bypass rule are explicit. |
| G5 evidence/offboarding/deletion/residency | **FAIL NARROW** | lifecycle is coherent, but residency language is broad enough to accidentally pre-decide backup/DR/telemetry physical architecture rather than declaring the tenant-data residency scope. |
| G6 classification boundary | **PASS** | classification remains bounded metadata; no arbitrary policy language. |
| G7 effective/config binding | **PASS** | policy binding, live security capability, organizational effective dating and source freshness are separated coherently. |
| G8 accounting/integration authority | **PASS** | product commercial truth, external accounting truth and P08 transport/reconciliation are separated; no duplicate editable ledger. |
| G9 one-XL/adoption burden | **PASS** | P07 remains the only independent XL; no mandatory ERP/CDE/network/BPM/connector before first tender. |
| G10 hostile-review readiness | **FAIL** | external review packet should not be issued until BL-01–BL-03 below are closed. |

---

## 4. Blockers

### BL-01 — unincorporated JV / multi-party contracting authority ambiguity

**Attack**

`Tenant → Operating Organization/Company → Legal Entity → Project` plus “one active contracting legal-authority context” could be implemented as `project.legal_entity_id`, making a later valid multi-party/unincorporated JV impossible without reworking P1.5.

**Why this matters**

P1.4 is supposed to prevent a tenancy/legal authority choice from forcing P1.5 replanning. A single-ID interpretation would do exactly that.

**Required remediation**

Define a semantic **ContractingAuthorityContext**:
- normally one legal entity;
- may represent an explicit bounded multi-party contracting arrangement where real evidence requires it;
- never implies cross-tenant data sharing;
- does not become a generalized JV collaboration product;
- each load-bearing transaction binds the exact authority context/version that governed it.

No physical entity model is required now.

### BL-02 — reusable technical login may leak tenant relationships

**Attack**

The packet permits one authentication identity to participate with multiple tenants. Without an explicit non-discovery rule, a login/account surface could reveal which contractors a supplier/contact has relationships with, creating cross-tenant leakage even though bids/prices remain private.

**Required remediation**

State that:
- existence of another tenant relationship is itself tenant-private unless independently authorized/disclosed;
- authentication identity reuse does not grant a cross-tenant tenant-list/network view;
- one tenant cannot query another tenant's relationship to the same identity;
- account recovery/profile UX cannot become a supplier-network directory by convenience.

### BL-03 — residency boundary over-specifies physical infrastructure

**Attack**

“product-hosted tenant data belongs to the tenant configured hosting region” can be read as a universal physical constraint on backups, disaster recovery, security telemetry, service metadata and other NFR infrastructure before those categories are designed.

**Why this matters**

P1.4 must freeze data authority/residency semantics but should not accidentally decide P1.9/NFR physical replication architecture or assert a legal localization rule.

**Required remediation**

Define a **declared tenant-data residency scope**:
- in-scope tenant/business/evidence data has a declared primary residency region;
- any permitted replicas/backups/processing outside that scope must be explicitly declared by product architecture/contract and later validated against applicable law/contract;
- operational/security metadata categories are not silently assumed exempt or silently included; their treatment is later NFR work under the declared boundary;
- P1.4 makes no UAE/GCC localization claim.

---

## 5. Watches — not blockers

### W-01 — retention durations

Exact durations are intentionally not frozen. This is acceptable because P1.4 freezes the lifecycle/basis/disposition contract, and specific legal/contractual durations are deployment/legal inputs.

### W-02 — ADR-0011 cost-attribution timing

Exact mandatory transition remains open. Authority of cost structure and historical transaction binding are explicit. This can proceed to P1.5 without authority ambiguity.

### W-03 — RequirementAllocation evidence debt

FT-02/06/10 remain explicitly falsifiable. Inventory assigns procurement-scope authority without claiming primary proof of exact mechanics. Clean.

### W-04 — rectification capacity

FT-09/CR-02 remains a pre-P07-fulfillment implementation obligation. No silent capacity restoration is introduced. Clean.

### W-05 — evidence disposition versus immutability

“Immutable” is correctly interpreted as history-preserving/non-destructive mutation while retained, not perpetual existence regardless of retention basis. The disposition event remains separate from commercial history. Clean.

### W-06 — supplier source truth under buyer-on-behalf capture

The packet preserves source channel/represented party and does not equate buyer capture with direct authentication. P1.2 supplier-confirmed contractable-basis requirement remains applicable. Clean.

### W-07 — ERP-only downstream execution

A0–A3 can hand off externally without activating P07. When P07 is activated, the product owns its commercial core and ERP accounting representation is not co-master. Clean.

---

## 6. Hostile-question results

1. Same human in two tenants without role leakage — **PASS**, subject to BL-02 relationship-discovery remediation.
2. Same supplier in two tenants without commercial leakage — **PASS**; tenant-private supplier relationship chosen.
3. External link becoming internal DOA authority — **PASS**, explicitly impossible.
4. Buyer-on-behalf mistaken for direct supplier auth — **PASS**, explicit provenance split.
5. Offboarding destroying historical award/commitment proof — **PASS**.
6. Immutable evidence becoming perpetual storage by default — **PASS**; explicit retention basis required.
7. Region/config change rewriting in-flight history — **PASS**, but physical residency scope needs BL-03 wording.
8. Sensitivity label becoming policy engine — **PASS**.
9. ERP rejection mutating commercial truth for sync — **PASS**.
10. Mirrored accounting field becoming competing ledger — **PASS**.
11. Project move silently rewriting legal context — **PASS**, with BL-01 multi-party refinement required.
12. Branch/BU/JV creating hidden commitment authority — **PASS** for branch/BU; JV needs BL-01 clarification.
13. Current DOA/role config rewriting historical approval — **PASS**.
14. External reference change/disappearance erasing decision basis — **PASS** at semantic level; minimum source/version provenance required.
15. Second independent XL beside P07 — **PASS / CLEAN**.
16. First rail forced to portal/connector/P07/enterprise config — **PASS / CLEAN**.

Additional attacks:
17. Connector becomes authority due to transformation — **PASS**, forbidden.
18. External contact account linking rewrites historical actor — **PASS**, forbidden.
19. Project master/budget authority varies by customer — **PASS**, profile-bound one-authority rule handles this.
20. Cross-system authority transfer creates dual-master window — **PASS**, controlled cutover required.

---

## 7. Required remediation sequence

1. Create remediated tenancy contract v0.2 closing BL-01 and BL-02 tenancy-side wording.
2. Create remediated identity contract v0.2 closing BL-02 identity/account discovery wording.
3. Create remediated evidence/residency contract v0.2 closing BL-03.
4. Run narrow internal recheck only on BL-01–BL-03 and direct regressions.
5. If PASS, create one coherent external Claude hostile-review packet/prompt.

Do not reopen competitor research or unrelated ADRs.

---

## 8. Current state

**P1.4 remains ACTIVE.**  
**P1.5 and product code remain LOCKED.**  
**External hostile review is not yet ready until BL-01–BL-03 are remediated.**