# P1.4 — External Hostile Review Packet v0.1

**Date:** 2026-07-30  
**Status:** READY FOR CLAUDE HOSTILE REVIEW  
**Review purpose:** decide whether P1.4 can close without forcing P1.5 boundary/authority replanning.

---

## 1. Review boundary

Audit **P1.4 Boundary, Ownership & Tenancy Contract only**.

P1.0–P1.3 are closed/frozen inputs. Do not restart competitor research or reopen prior phases for breadth.

P1.5 and product code remain locked.

The review should attack whether the consolidated candidate actually freezes the V1 boundary strongly enough for later physical commercial-core/state design.

---

## 2. Canonical read order

Use GitHub `hanitaki93-create/construction-procurement-os` on current `main` as canonical truth.

Read:

1. `PROJECT_STATE.md`
2. `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/P1_4_WORKPLAN_V0_1.md`
3. `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/P1_4_BOUNDARY_CONTRACT_CANDIDATE_V0_1.md` — **primary audit target**
4. `P1_4_LOAD_BEARING_AUTHORITY_INVENTORY_V0_1.md`
5. `P1_4_OWN_MIRROR_REFERENCE_OUT_CONTRACT_V0_1.md`
6. `P1_4_TENANT_LEGAL_ENTITY_PROJECT_CONTRACT_V0_2.md`
7. `P1_4_IDENTITY_AUTHORIZATION_EXTERNAL_GRANT_CONTRACT_V0_2.md`
8. `P1_4_EVIDENCE_LIFECYCLE_RESIDENCY_CONTRACT_V0_2.md`
9. `P1_4_EFFECTIVE_DATED_CONFIGURATION_BINDING_V0_1.md`
10. `P1_4_ACCOUNTING_INTEGRATION_AUTHORITY_CONTRACT_V0_1.md`
11. `audits/P1_4_INTERNAL_BOUNDARY_AUDIT_V0_1.md`
12. `audits/P1_4_INTERNAL_BOUNDARY_RECHECK_V0_1.md`
13. current `02_research/control/adr_log.csv`

For background only where needed, use the already-known P1.1 frozen baseline, P1.2 final reconciliation/checkpoints and P1.3 final verdict/checkpoint. Do not re-run competitor breadth research.

Where v0.2 exists, it supersedes corresponding v0.1 contract wording.

---

## 3. Must-preserve constraints

The review must preserve unless a genuine contradiction is demonstrated:
- P1.1 frozen UAE private-sector contractor beachhead;
- 84-area scope/burden controls;
- P07 commitment/change/valuation/commercial truth as the only independent XL gravity well;
- A0–A3 sourcing/comparison/award rail usable without P07/ERP/CDE/advanced AI;
- zero bespoke named connector prerequisite before first live tender;
- P1.2 evidence hierarchy and FT-02/06/09/10 debt;
- P1.3 rule: inheritance is semantic reuse, not cumulative feature scope;
- no mandatory supplier network;
- no full CDE/records-management ownership;
- no full GL/AP/cash/accounting ownership;
- product code and P1.5 locked during this review.

---

## 4. Core P1.4 decisions under attack

### A — Tenancy/legal authority

Candidate:
- tenant = customer isolation/config/security boundary;
- project belongs to one tenant;
- legal/contracting authority is explicit through `ContractingAuthorityContext`;
- normal case one legal entity; bounded multi-party context allowed where real;
- branches/BUs/JVs remain bounded authority context, not enterprise org product;
- historical contracting context is effective-dated.

Attack for hidden single-entity assumptions, ambiguous project ownership, illegal cross-entity actions or unavoidable P1.5 replanning.

### B — Cross-tenant supplier identity

Candidate:
- supplier business relationship/history is tenant-private;
- cross-tenant supplier network/master is OUT;
- reusable technical login identity is permitted but cannot reveal other tenant relationships;
- no qualification/bid/price/evidence/grant reuse across tenants.

Attack whether this is secure/coherent without creating duplicate authority or hidden network behavior.

### C — Internal authorization vs external grants

Candidate:
- common bounded principal/authentication/audit substrate permitted;
- internal command authorization and external resource grants are semantically separate;
- external grant can never satisfy P09/DOA/domain authorization;
- persistent supplier account optional;
- buyer-on-behalf capture preserves acting principal + represented party/source.

Attack bypass, impersonation, provenance and in-flight revocation cases.

### D — OWN / MIRROR / REFERENCE / OUT

Candidate:
- applied at load-bearing fact/field/event grain;
- one authoritative writer/source at a time;
- deployment-profiled facts bind exactly one authority;
- mirrors are not editable co-masters;
- references preserve source/version/effective/freshness context;
- authority transfer is governed/effective-dated.

Attack whether any core fact still has dual/ambiguous authority or whether the model is too abstract to constrain P1.5.

### E — Evidence/offboarding/deletion/retention

Candidate:
- OS owns integrity/provenance of governed transaction evidence;
- external CDE/ERP/bank/legal records remain reference/narrow mirror;
- immutable history separated from mutable accounts/access/contact data;
- retention requires explicit basis, not forever;
- eligible disposition does not reverse historical domain events;
- no records-management/legal-hold policy engine.

Attack legal/operational contradictions, especially offboarding while commercial history is required.

### F — Sensitivity classification

Candidate:
- bounded recorded transaction/evidence metadata;
- fixed deterministic checks may consume it;
- it does not become arbitrary tenant-authored authorization/retention/redaction policy language.

Attack whether a hidden generalized policy engine has still been introduced.

### G — Residency

Candidate:
- tenant-level declared primary residency region for data in the product residency commitment;
- later NFR work must classify backups/DR/telemetry against the declared commitment;
- external-system residency remains external;
- region migration is governed/effective-dated;
- no UAE/GCC localization law is asserted.

Attack whether this is sufficient to prevent P1.5 replan without prematurely deciding NFR infrastructure.

### H — Effective-dated/config binding

Candidate:
- historical transaction meaning uses governing versions, not current lookup;
- bind only load-bearing config, not entire tenant snapshot;
- bound policy and current security capability are separate;
- explicit migration/re-evaluation required for legitimate in-flight rebinding.

Attack policy changes, delegation revocation, project legal-context transfer and authority-map cutover.

### I — Accounting/integration seam

Candidate:
- product owns procurement/commercial truth in activated domains;
- external ERP/accounting owns AP posting/liability, payment/cash, GL/accounting close/job-cost posting where applicable;
- invoice evidence/match may be product-owned without becoming AP;
- certification and accounting posting are distinct;
- P08 owns authority mapping/transport/reconciliation, not accounting balances;
- connector is never business authority;
- rejection taxonomy prevents sync-driven truth mutation.

Attack second-ledger risk, ERP coexistence and deployment variation.

### J — P07 / activation burden

Candidate:
- RequirementAllocation is scope-consumption authority only, not commercial ledger;
- workflow/evidence/integration states do not own commercial balance;
- P07 remains sole independent XL;
- A0–A3 ends at AwardDecision/handoff without P07/ERP/CDE/network.

Attack hidden second XL and first-rail burden.

---

## 5. Explicitly later-owned, not P1.4 blockers unless boundary ambiguity remains

Do not fail P1.4 merely because these physical details are intentionally later:
- ADR-0003 final structural root;
- ADR-0004 PO/Subcontract/Framework/CallOff physical composition;
- FT-02/06/10 exact RequirementAllocation mechanics;
- FT-09/CR-02 exact rectification capacity state mechanics;
- ADR-0011 exact cost-attribution mandatory transition;
- ADR-0015 physical correction/posting event model;
- temporal database implementation;
- money/rounding algorithm;
- numbering/concurrency algorithm;
- connector/authentication technology;
- jurisdiction-specific retention duration/localization requirement.

Fail only if a missing P1.4 authority/tenancy/residency choice means those later designs would have to redefine the boundary.

---

## 6. Required verdict format

Return exactly these sections:

### VERDICT
Choose one:
- `PASS — P1.4 boundary contract can close; unlock final checkpoint/ADR reconciliation.`
- `FAIL — P1.4 remains open; blockers below must be remediated.`

### BLOCKERS
For each blocker provide:
- ID;
- exact artifact/section or candidate clause involved;
- failure mode;
- concrete counterexample/scenario;
- why it would force P1.5 replan, cross-tenant leak, duplicate authority, second XL or adoption burden;
- narrow remediation required.

Do not invent broad features as remediation.

### WATCHES / NON-BLOCKING DEBT
List items that should remain explicit but do not prevent P1.4 closure.

### GATE CHECK
Return PASS/FAIL for:
- G1 Tenant isolation
- G2 Legal/project/ContractingAuthorityContext
- G3 Authority coverage
- G4 Internal authorization vs external grants
- G5 Evidence/offboarding/deletion/residency
- G6 Classification boundary
- G7 Effective/config binding
- G8 Accounting/integration authority
- G9 One-XL/adoption burden

### REGRESSION CHECK
State:
- P1.1 REOPEN = YES/NO
- P1.2 REGRESSION = YES/NO
- P1.3 REOPEN = YES/NO
- SECOND XL = CLEAN/FAIL
- A0–A3 ACTIVATION = CLEAN/FAIL

### ADR IMPACT
Use the exact current ADR log. Identify only ADRs whose status/decision wording should change **if P1.4 passes**. Do not invent ADR text/status based on memory.

### P1.5 READINESS
Choose:
- `READY AFTER P1.4 FINAL CHECKPOINT`
- `NOT READY`

Explain only the blocking boundary reason if not ready.

---

## 7. Review standard

Be hostile. Do not reward architectural sophistication.

Look specifically for:
- hidden dual masters;
- hidden cross-tenant discovery;
- identity/account conflation;
- legal-entity/JV false simplification;
- evidence retention contradictions;
- residency statements that are either meaningless or over-prescriptive;
- stale/reference ambiguity;
- current-config rewriting history;
- workflow/grant authorization bypass;
- ERP rejection mutating commercial truth;
- second P07 ledger;
- supplier-network/CDE/accounting/BPM gravity;
- onboarding prerequisites that violate A0–A3.

A blocker must be structural enough that leaving it unresolved would force P1.5 to choose or redesign a boundary that P1.4 was supposed to freeze.

Do not fail the stage for ordinary implementation detail that is already safely deferred.