# P1.4 — Boundary, Ownership & Tenancy Contract — Workplan v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE WORKPLAN / P1.4 ONLY / NOT A FREEZE  
**Subphase:** P1.4 — Boundary, Ownership & Tenancy Contract  
**P1.5+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

## 1. Purpose

P1.4 must freeze the V1 boundary contract before P1.5 physical commercial-core design begins.

The work is to decide **who/what is authoritative, inside which tenant/legal/project boundary, under which historical configuration, and at which external seam**.

P1.4 is not database design, entity-table design, API implementation, product code, connector implementation, accounting-system implementation, CDE implementation, supplier-network implementation, or a reopening of competitor research.

The central output is a semantic authority contract capable of constraining later physical design without prematurely choosing it.

---

## 2. Canonical repository inputs read before starting

GitHub `hanitaki93-create/construction-procurement-os` on `main` is canonical.

The following current artifacts were read before creating this workplan:

| Artifact | Current blob SHA read | Role in P1.4 |
|---|---|---|
| `PROJECT_STATE.md` | `cebafef5c9184276a65aef15b7fb21858e037418` | canonical phase state |
| `P1_4_ENTRY_HANDOFF_V0_1.md` | `9eaa94eaf01f514d4af488866d26e4d22c09e94c` | P1.4 entry obligations and execution order |
| `P1_3_FINAL_VERDICT.md` | `53e7b69baa3a0e3edb9cbe490af07519bc3bfcbb` | closed P1.3 conclusions |
| `P1_3_FINAL_CHECKPOINT_V0_1.md` | `dc77bbd408e232427f86c8b5ccfc475bdcb69dc6` | final P1.3 handoff state |
| `P1_3_EVIDENCE_EXTERNAL_ACCESS_BOUNDARY_V0_1.md` | `f898cbe3b1fad3c1972fe885fd868eee9a1e5ae5` | bounded evidence/external-access substrate |
| `P1_3_FIRST_RAIL_AND_ACTIVATION_BOUNDARY_V0_1.md` | `ccccbfd7dd2ff3e222cf33490d60ba98a8903c98` | A0–A3 activation independence |
| `P1_1_FROZEN_BASELINE_V1_0.md` | `1613e3b3a0e9f47d873fe177ed3bd1a11216b31f` | frozen beachhead, 84-area scope, one-XL rule |
| `P1_2_FINAL_VERDICT.md` | `9acaf825f3ac45cd427111490111b7516383b97c` | closed P1.2 evidence gate |
| `P1_2_FINAL_PRIMARY_RECONCILIATION_V0_1.md` | `34c32142988b1697a515093ab6b7ffc96f321620` | primary evidence and residual debt |
| `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_3.md` | `09da2a5c4847fd2f4ff97142d7e0f81626424200` | latest sourcing authority checkpoint |
| `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_3.md` | `70f88e5fa66aab9425d4cff43473db4bfbc7bc38` | latest P07/P08 authority checkpoint |
| `P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_1.md` | `f60eecaa9280779fd885d3cde1eb6f5f9dd183ec` | complete provisional P01–P12 operating graph |
| `02_research/control/adr_log.csv` | `287fc220edc6e4cc061d267f5e4f8b684cc00960` | exact current ADR status/wording source |

Historical/versioned artifacts are not silently rewritten. Existing ADR statuses are not changed by this workplan.

---

## 3. Binding inputs that P1.4 must preserve

### 3.1 Phase state

- P1.0 — CLOSED.
- P1.1 — FROZEN.
- P1.2 — CLOSED.
- P1.3 — CLOSED.
- P1.4 — ACTIVE.
- P1.5+ — LOCKED until the P1.4 gate passes.
- Product code — NOT STARTED.

### 3.2 Frozen beachhead

UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.

P1.4 may model organizational variation needed by that beachhead, but may not silently broaden the product into generic enterprise master-data, HR, accounting, document-management, supplier-network or project-management software.

### 3.3 One-XL rule

**P07 — commitment/change/valuation/commercial truth remains the only independent XL gravity well.**

P1.4 boundary choices must reject any second independent XL created by:

- accounting/GL/AP/cash ownership;
- generalized BPM/low-code authorization;
- CDE/records management;
- CPM/master scheduling;
- legal claims/banking/insurance;
- inventory/WMS;
- mandatory supplier network;
- evidence/external-access expansion.

### 3.4 Activation independence

A0–A3 must remain independently usable without:

- P07 execution;
- direct-source execution surface;
- ERP connector;
- CDE connector;
- persistent supplier account/network;
- advanced AI;
- CPM/BPM platform configuration;
- inventory/WMS.

Award/handoff remains a valid A3 terminal point.

### 3.5 Evidence hierarchy

Use the existing evidence-authority order:

1. PRIMARY_CONTRACTOR_EVIDENCE;
2. PRIMARY_TRANSACTION_ARTIFACT;
3. REGULATORY / CONTRACTUAL REQUIREMENT;
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING;
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE;
6. INTERNAL_REASONING / HYPOTHESIS.

P1.3 competitor reconstruction is closed and remains secondary evidence. Do not restart competitor research for breadth.

### 3.6 P1.2 residual evidence debt

P1.4 must not silently promote the following to primary-proven facts:

- FT-02 — exact RequirementAllocation mechanics / commitment-vs-allocation authority;
- FT-06 — universal hard-conservation implementation for remeasurement;
- FT-09 — rectification/replacement capacity treatment; CR-02 remains a pre-P07-fulfillment implementation obligation;
- FT-10 — universal one-active-exclusive-scope authority.

Where P1.4 needs these concepts, preserve their falsifiability and explicit shared/joint/split-authority paths.

---

## 4. P1.4 semantic vocabulary

P1.4 uses `OWN / MIRROR / REFERENCE / OUT` as **system authority/custody classifications**, not as assertions of legal title, IP ownership or contractual property rights.

### OWN

The product is the canonical authority for the identified fact/event/history within its declared tenant/legal/project scope. Authoritative changes must occur through governed domain actions and preserve required history/provenance.

### MIRROR

The product stores a local representation of externally authoritative truth for operation, reconciliation, search or projection. The mirrored fact is not independently editable as competing business truth. Freshness/source/conflict state must be explicit where load-bearing.

### REFERENCE

The product stores the external authority pointer/identity and enough provenance, version/effective-state and freshness information to use the external record safely, while the authoritative payload remains outside the product.

### OUT

The product does not own or mirror the business truth. It may know that the concern exists at a boundary, but it is outside the V1 authority model except for a bounded interface/reference where separately declared.

### Mixed authority rule

Authority is assigned at the **load-bearing object/fact/field/event level**, not automatically at whole-entity level.

One business object may legitimately contain product-owned facts, mirrored accounting/master-data facts and external references. No connector, workflow engine or convenience copy becomes authoritative merely because it stores the same value.

---

## 5. Mandatory P1.4 decision streams

### W1 — Tenant / company / legal-entity / project boundary

Define the minimum semantic hierarchy needed to support:

- tenant isolation;
- contractor company/operating organization;
- one or more real legal entities where required;
- branch/business-unit structure only where it changes authority, configuration, numbering, accounting or project ownership;
- project relationship to the contracting legal entity;
- JV/other multi-organization posture only to the level structurally necessary;
- cross-project internal access without weakening tenant isolation.

Do not turn this stream into generic enterprise organization/HR master data.

Required output:

- semantic hierarchy alternatives and chosen/bounded direction;
- tenant isolation invariant;
- legal-entity/project authority invariant;
- branch/BU/JV treatment;
- cross-entity action rules.

### W2 — Central `OWN / MIRROR / REFERENCE / OUT` authority contract

Inventory P01–P12 plus shared substrates and classify every load-bearing object/fact/event.

For each item record:

- semantic concern;
- transaction/process location;
- tenant scope;
- legal-entity scope;
- project scope where applicable;
- external organization/source where applicable;
- authority label: OWN / MIRROR / REFERENCE / OUT;
- authoritative writer/source;
- permitted local representation;
- correction/reconciliation path;
- persistence/history expectation;
- effective-dated/config binding dependency;
- P1.4 decision vs later deferral.

No core object may reach the P1.4 gate with ambiguous authority.

### W3 — Internal authorization versus external supplier/guest grants

Resolve OBL-P14-01 explicitly.

The alternatives must test at least:

1. one generalized authorization model for internal and external principals;
2. one shared principal/audit substrate with **separate internal command-authorization semantics and external scoped-grant semantics**;
3. fully separate models linked only through provenance.

Hard invariant regardless of implementation choice:

> possession of an external access grant can never satisfy or bypass P09 internal permission, DOA, delegation, compliance or deterministic domain authorization.

External supplier/guest access must remain task/tender/evidence scoped, least privilege, expiring/revocable and provenance preserving.

Do not assume an external guest is an ordinary internal User.

### W4 — Internal identity, external organization and cross-tenant identity

Define boundaries for:

- human identity versus tenant membership;
- tenant-specific role/delegation/authorization context;
- supplier/subcontractor organization identity;
- contacts acting for an external organization;
- buyer-on-behalf capture;
- persistent external account as optional versus mandatory;
- same external organization participating with multiple contractor tenants;
- whether any neutral identity can be reused cross-tenant without sharing commercial/qualification/evidence/access history.

Hard isolation rule:

> cross-tenant supplier identity reuse, if permitted at all, must not imply cross-tenant visibility, qualification reuse, price/history sharing, evidence sharing, access reuse or network membership.

A mandatory supplier network is outside the P1.4 boundary.

### W5 — Evidence ownership, external evidence and lifecycle

Resolve OBL-P14-02.

Preserve the P1.3 boundary:

Product-owned transaction evidence/provenance may include governed tender releases, bid/quote revisions, clarifications, approvals, commitment/change evidence, receipts, certification/recovery evidence and bounded external-grant history when those domains are active.

Externally authoritative CDE/ERP/bank/legal/master-correspondence records remain REFERENCE or narrowly MIRROR where justified.

P1.4 must reconcile:

- immutable/versioned transaction evidence;
- external organization/source attribution;
- buyer-on-behalf capture;
- supersession without destructive mutation;
- tenant offboarding;
- user/contact offboarding;
- grant revocation;
- deletion requests/contractual deletion;
- retention basis;
- legal/regulatory retention where applicable;
- residency and controlled migration/export;
- tenant exit while commercial history remains required.

Do not solve this by either extreme:

- destructive deletion that corrupts commercial/audit history; or
- perpetual storage of all tenant/external-party data without contractual/legal basis.

P1.4 must distinguish **transaction-history integrity** from mutable account/contact/access data so offboarding can revoke access and remove/minimize eligible data without rewriting historical truth.

No GCC/UAE retention or residency rule may be asserted from competitor convention. Where a legal/regulatory rule is required to freeze a choice, obtain authoritative current evidence.

### W6 — Stored sensitivity/access attributes versus forbidden policy engine

Resolve OBL-P14-03.

Permitted direction:

- transaction/evidence sensitivity/access class as recorded metadata;
- provenance of who/what assigned it;
- bounded fixed product checks that consume it where required;
- historical interpretability where load-bearing.

Forbidden expansion:

- arbitrary classification rule language;
- configurable enterprise information-governance engine;
- generalized retention/redaction/classification policy engine;
- legal hold/eDiscovery platform;
- CDE/records-management suite.

The alternatives matrix must include a hostile check that a stored classification value has not silently become a second programmable authorization/policy system.

### W7 — Effective-dated configuration and in-flight binding

P1.4 must define enough temporal/configuration authority to prevent later P1.5 replanning.

Load-bearing candidates include:

- tenant/legal-entity/project relationship;
- role assignment and delegation;
- DOA/approval policy;
- organization membership;
- external grant scope and validity;
- accounting/integration authority mapping;
- money/currency/tax configuration references where authority depends on time;
- residency/configuration region;
- numbering/configuration scope where boundary-sensitive.

The alternatives must compare:

- live-current lookup;
- full snapshot;
- effective-dated/version-bound configuration with explicit migration/rebinding semantics.

P1.4 should decide the semantic binding rule. P1.5 may decide physical persistence shape.

### W8 — Integration and accounting authority boundaries

Use P08 direction without creating ERP ownership.

Define per load-bearing fact/event:

- authority system/source;
- OWN / MIRROR / REFERENCE / OUT;
- inbound/outbound/bidirectional transport direction;
- whether inbound data can affect domain decisions;
- freshness/staleness requirement;
- conflict rule;
- rejection/disposition semantics;
- reconciliation path;
- correction ownership;
- failure behavior when the external system is unavailable.

Hard invariants:

- connector/transport is never the business authority merely because it moved the value;
- integration defects do not mutate commercial truth merely to make synchronization pass;
- no independently edited balance may compete with underlying commercial/accounting authority;
- no full GL/AP/cash engine is introduced;
- zero bespoke named connector remains required before first live tender.

### W9 — P07 authority protection

P1.4 must ensure that P07 remains the only independent XL gravity well.

Boundary decisions must not create a second commercial ledger in:

- RequirementAllocation;
- accounting mirrors;
- workflow/approval state;
- integration status;
- evidence metadata;
- project/organization hierarchy;
- supplier network identity.

P07 commercial truth may depend on bounded external/master/accounting references, but those references must not duplicate editable P07 truth.

---

## 6. Current ADR map entering P1.4

Exact current ADR wording/status was read from `02_research/control/adr_log.csv` before this workplan.

This workplan does **not** close or change any ADR.

### Directly exercised by P1.4

- **ADR-0003 — Procurement structural root — PROPOSED.** P1.4 may constrain root ownership/tenant authority but must not prematurely choose a P1.5 physical graph.
- **ADR-0005 — Accounting and commercial ownership seam — PROPOSED.** Central P1.4 authority decision.
- **ADR-0006 — V1 ERP/accounting integration depth — PROPOSED.** Must remain compatible with zero bespoke named connector before first tender.
- **ADR-0008 — Workflow engine generality in V1 — PROPOSED.** Internal authorization must remain bounded and deterministic.
- **ADR-0009 — Configuration breadth in V1 — PROPOSED.** P1.4 must avoid enterprise configuration gravity.
- **ADR-0011 — Budget and cost attribution timing — PROPOSED.** Authority/timing boundary may be constrained; exact mechanics remain falsifiable.
- **ADR-0012 — External vendor identity and access model — PROPOSED.** Core P1.4 identity/grant decision area.
- **ADR-0014 — Document provenance ownership and depth — PROPOSED.** Core evidence/CDE seam.
- **ADR-0018 — Workflow-to-financial-state seam — PROPOSED.** External/internal authorization cannot directly overwrite commercial truth.
- **ADR-0019 — Effective dating and temporal authority semantics — PROPOSED.** Core historical interpretability decision area.
- **ADR-0020 — Configuration binding for in-flight instances — PROPOSED.** Core binding decision area.
- **ADR-0021 — Field-level integration authority and staleness — PROPOSED.** Central P1.4 authority contract.
- **ADR-0024 — irreversible pre-model substrate constraints — ACCEPTED.** Commercially significant truth requires source/version/location provenance and state-changing business operations must be bounded validated service/domain actions.

### Consulted constraints; do not close accidentally in P1.4

- ADR-0004 — PO/Subcontract/Framework/CallOff physical type model;
- ADR-0007 — long-lead physical object model;
- ADR-0010 — GCC commercial semantics;
- ADR-0013 — event-derived status versus planning inputs;
- ADR-0015 — posting/finalization/reversal/correction physical model;
- ADR-0022 — money/rounding/calculation order;
- ADR-0023 — numbering/concurrency/fiscal semantics.

P1.4 may establish authority/boundary constraints needed by these ADRs while leaving P1.5 physical-form decisions open.

Data residency is an explicit P1.4 required position. If an additional ADR is required, allocate it through normal ADR change control only after the alternatives/evidence are developed; do not invent an ADR number in advance.

---

## 7. Planned controlled artifacts

Create in this order unless evidence requires a controlled change:

1. `P1_4_WORKPLAN_V0_1.md` — this file.
2. `P1_4_OWNERSHIP_TENANCY_ALTERNATIVES_MATRIX_V0_1.md` — structured alternatives before final decisions.
3. `P1_4_LOAD_BEARING_AUTHORITY_INVENTORY_V0_1.md` — P01–P12 + shared substrate inventory.
4. `P1_4_OWN_MIRROR_REFERENCE_OUT_CONTRACT_V0_1.md` — central authority contract.
5. `P1_4_TENANT_LEGAL_ENTITY_PROJECT_CONTRACT_V0_1.md` — hierarchy/isolation contract.
6. `P1_4_IDENTITY_AUTHORIZATION_EXTERNAL_GRANT_CONTRACT_V0_1.md` — internal/external principal split and grant rules.
7. `P1_4_EVIDENCE_LIFECYCLE_RESIDENCY_CONTRACT_V0_1.md` — evidence/offboarding/deletion/residency boundary.
8. `P1_4_EFFECTIVE_DATED_CONFIGURATION_BINDING_V0_1.md` — temporal/config binding contract.
9. `P1_4_ACCOUNTING_INTEGRATION_AUTHORITY_CONTRACT_V0_1.md` — accounting/integration seam.
10. `audits/P1_4_INTERNAL_BOUNDARY_AUDIT_V0_1.md` — hostile internal audit.
11. coherent external hostile-review packet after internal blockers are closed.
12. final P1.4 verdict/checkpoint only after external hostile review and remediation.

Names after item 2 are planned working names, not frozen requirements; they may be consolidated if a smaller artifact set is clearer.

---

## 8. Execution sequence

### Step 1 — alternatives before physical design

Build the ownership/tenancy alternatives matrix covering all mandatory decision streams.

No database tables, schema, code or connector implementation.

### Step 2 — load-bearing authority inventory

Walk P01–P12 and shared substrates.

Start with semantics already evidenced in P1.2/P1.3; do not invent new processes merely to populate the inventory.

### Step 3 — central authority classification

Assign `OWN / MIRROR / REFERENCE / OUT` at the lowest load-bearing fact/event grain needed to prevent duplicate authority.

Objects with mixed authority must be decomposed semantically instead of assigned a misleading whole-object label.

### Step 4 — hierarchy/tenancy freeze candidate

Resolve tenant, company/operating organization, legal entity, project, branch/BU/JV and cross-project/cross-entity boundaries.

### Step 5 — identity and authorization split

Resolve internal principal/membership/role/delegation semantics versus external organization/contact/task-grant semantics.

### Step 6 — evidence lifecycle and residency

Resolve evidence custody, immutable history, offboarding, eligible deletion/minimization, retention basis and region/residency semantics without building records management.

### Step 7 — temporal/configuration binding

Resolve effective-dated/version-bound authority semantics strongly enough that later entity/state design cannot reinterpret historical transactions using current configuration.

### Step 8 — accounting/integration authority

Freeze authority/staleness/reconciliation boundaries before named connectors are designed.

### Step 9 — hostile internal audit

Attack all hidden second-system, second-ledger, cross-tenant, retention and authorization failure modes.

### Step 10 — external hostile review and remediation

Use one coherent packet after internal blockers are closed. Remediate narrowly; do not reopen competitor research for breadth.

### Step 11 — P1.4 gate verdict

Only after all gate conditions below pass may the canonical state unlock P1.5.

---

## 9. Internal audit gates

### G0 — Canonical-orientation gate

PASS when:

- current repo state/handoff/frozen/closed inputs are read;
- exact ADR log is read before ADR claims;
- no older chat summary overrides current GitHub truth.

### G1 — Tenant isolation gate

PASS when:

- every product-owned fact has an unambiguous tenant boundary;
- same external organization across two tenants does not create data leakage;
- cross-tenant access is denied by default and only explicit bounded semantics can cross the boundary;
- branch/BU/JV handling cannot accidentally become a second tenant/network product.

### G2 — Legal-entity/project authority gate

PASS when:

- project contracting/authority context is explicit;
- cross-legal-entity activity is governed rather than implicit;
- accounting/numbering/config authority can resolve to the correct legal context;
- project ownership is not confused with tenant ownership.

### G3 — Authority coverage gate

PASS when every load-bearing object/fact/event is classified `OWN / MIRROR / REFERENCE / OUT` with one authoritative writer/source and an explicit correction/reconciliation path.

No dual editable authority.

### G4 — Internal authorization / external grant gate

PASS when:

- internal command authorization is semantically distinct from external resource/task access;
- external grants cannot bypass P09/DOA/domain invariants;
- external grants are scoped, expiring/revocable and provenance preserving;
- buyer-on-behalf actions preserve both acting internal principal and represented external organization/source.

### G5 — Evidence/offboarding/deletion/residency gate

PASS when:

- immutable transaction history and supersession can survive offboarding;
- access revocation does not require evidence destruction;
- eligible personal/contact/account data can be removed/minimized without falsifying transaction history;
- retention is based on explicit contractual/legal/product rules rather than perpetual default;
- residency/region behavior and any migration/export boundary are explicit;
- external authoritative evidence remains referenceable without pulling full CDE/ERP records into ownership.

### G6 — Classification-boundary gate

PASS when sensitivity/access classification remains a stored bounded transaction/evidence attribute and has not expanded into arbitrary tenant-authored information-governance rules.

### G7 — Effective-dated/config binding gate

PASS when historical authorization, organization/legal context, external grants and integration authority can be interpreted using the configuration/effective state that governed the transaction rather than silently using current values.

### G8 — Accounting/integration authority gate

PASS when:

- commercial truth and accounting truth have explicit object/field/event authority;
- mirrors/references carry source/freshness/conflict semantics where load-bearing;
- transport/config errors do not rewrite commercial truth;
- no GL/AP/cash engine or duplicate editable commercial balance is introduced;
- connector absence does not block A0–A3 first value.

### G9 — One-XL / adoption-burden gate

PASS when P07 remains the only independent XL gravity well and P1.4 does not require:

- mandatory supplier network;
- full CDE;
- full ERP/accounting;
- generalized BPM;
- customer-designed ontology;
- bespoke named connector before first tender.

### G10 — Hostile-review gate

PASS when the coherent P1.4 packet returns no unresolved blocker that could force P1.5 entity/commercial-core replanning.

---

## 10. Hostile questions that must be answered before close

1. Can the same human identity have membership in two tenants without role/delegation leakage?
2. Can the same supplier organization participate in two tenants without price, qualification, evidence or grant leakage?
3. Can a supplier guest obtain a link and accidentally gain a capability equivalent to an internal approval/DOA permission?
4. Can a buyer-on-behalf submission later be mistaken for direct supplier-authenticated truth?
5. Can offboarding a tenant/user/contact destroy evidence needed to explain a historical award or commitment?
6. Can retained immutable evidence become perpetual storage without a defined retention basis?
7. Can residency rules be changed for an in-flight transaction without leaving the historical governing region/configuration interpretable?
8. Can a sensitivity label become an implicit tenant-programmable policy engine?
9. Can ERP rejection or connector failure cause product commercial truth to be edited merely to achieve synchronization?
10. Can a mirrored accounting field be edited locally and become a competing ledger?
11. Can a project move between legal entities without explicit effective-dated authority and historical interpretation?
12. Can a branch/BU/JV boundary create hidden cross-entity commitment authority?
13. Can current DOA/role/config values rewrite the meaning of a historical approval?
14. Can a referenced CDE/ERP record disappear or change without the product preserving enough source/version/freshness provenance to explain the transaction?
15. Does any proposed solution create a second independent XL gravity well beside P07?
16. Does any proposed solution force portal signup, named connector setup, full P07 or enterprise configuration before A1–A3 value?

---

## 11. Explicit non-goals for P1.4

P1.4 does not:

- design database tables;
- choose ORM/storage technologies;
- write product code;
- choose connector vendors;
- implement ERP integration;
- implement CDE integration;
- create a GL/AP/cash ledger;
- create full supplier master-data/network product;
- create general HR/org master-data product;
- create records-management or legal-hold system;
- create arbitrary classification/retention policy language;
- create generalized BPM/low-code platform;
- reopen P1.3 competitor research;
- resolve P1.5 physical PO/Subcontract/Framework hierarchy unless a P1.4 boundary invariant makes an option impossible;
- silently resolve FT-02/06/09/10 evidence debt.

---

## 12. P1.5 unlock condition

P1.5 remains locked until a formal P1.4 PASS establishes all of the following:

1. tenant/company/legal-entity/project boundary is unambiguous;
2. internal identity/authorization and external organization/grant boundary is unambiguous;
3. every load-bearing object/fact/event has an `OWN / MIRROR / REFERENCE / OUT` authority classification;
4. evidence ownership/provenance, offboarding/deletion/retention and residency semantics are coherent;
5. stored sensitivity/access classification remains bounded and does not create a policy-engine gravity well;
6. effective-dated/configuration binding semantics are sufficient for historical authority interpretation;
7. accounting/integration authority, staleness, conflict and reconciliation boundaries are explicit;
8. no duplicate editable commercial/accounting truth exists;
9. A0–A3 activation independence remains intact;
10. P07 remains the only independent XL gravity well;
11. no unresolved identity/residency/authority choice would force P1.5 commercial-core replanning;
12. internal hostile audit and coherent external hostile review have no unresolved blockers;
13. final P1.4 verdict/checkpoint and `PROJECT_STATE.md` are updated through controlled change.

Until then:

**P1.4 ACTIVE. P1.5 and product code remain LOCKED.**
