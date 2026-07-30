# Construction Procurement OS — P1.4 Next-Chat Handoff v0.1

**Date:** 2026-07-30  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch:** `main`  
**Current phase:** Phase 1 — Deterministic Architecture & Product Specification  
**Active subphase:** **P1.4 — Boundary, Ownership & Tenancy Contract**  
**Product code:** NOT STARTED / LOCKED

# 1. Read this first

A new chat should not reconstruct the project from conversation memory alone.

Use the GitHub connector first and read, in this order:

1. `PROJECT_STATE.md`
2. `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_FINAL_VERDICT.md`
3. `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md`
4. `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_FINAL_VERDICT.md`
5. `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_3.md`
6. `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_DESIGN_INHERITANCE_REGISTER_V0_1.md`
7. `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_FIRST_RAIL_AND_ACTIVATION_BOUNDARY_V0_1.md`
8. `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_EVIDENCE_EXTERNAL_ACCESS_BOUNDARY_V0_1.md`
9. all current ADR files relevant to P1.4, especially ADR-0003, 0004, 0005, 0011, 0012, 0014, 0018, 0019, 0020, 0021, 0022 and 0023.

Before updating any existing GitHub file, fetch it and use its current SHA. Create new versioned artifacts rather than silently rewriting historical versions.

# 2. Closed gates

- **P1.0:** PASS / CLOSED
- **P1.1:** PASS / FROZEN
- **P1.2:** PASS / CLOSED
- **P1.3:** PASS / CLOSED
- **P1.4:** UNLOCKED / ACTIVE
- **P1.5 onward:** LOCKED
- **Product code:** LOCKED

Do not reopen P1.1, P1.2 or P1.3 casually. Later primary evidence may challenge them only through controlled change.

# 3. Product philosophy

- Deterministic substrate owns truth and state.
- AI later proposes, extracts, maps or recommends through bounded structured operations.
- AI never silently creates commercial/accounting truth.
- Third-party obligations and invariants remain deterministic.
- Narrow first activation does not mean small long-term architecture.
- Do not repeat the ETH-project failure mode of sophisticated architecture without commercial proof.
- Do not clone one incumbent. Use the best pattern from each only where compatible with contractor truth and burden limits.

# 4. Frozen P1.1 boundary

Beachhead:

> UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.

Frozen graph:

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

Guardrails:

- first live tender setup ≤5 working days from clean inputs;
- zero bespoke named connectors before first live tender;
- only one independent XL gravity well;
- intended XL gravity well = P07 commitment/change/valuation/commercial truth.

# 5. P1.2 workflow truth carried forward

P01–P12 are complete-enough but not physically frozen:

- P01 Demand/planning/package/cost attribution/RequirementAllocation
- P02 Vendor qualification/contextual eligibility/participant selection
- P03 Tender event/immutable release/addenda
- P04 External participation/intent/decline/submission/revision
- P05 Bid normalization/leveling/comparison
- P06 Recommendation/DOA/award
- P07 Commitment/change/instruction/fulfillment/certification/recovery
- P08 Commercial position/accounting authority/reconciliation
- P09 Bounded deterministic controls
- P10 Long-lead/procurement-schedule overlay
- P11 Closeout/security/warranty/recovery linkage
- P12 External technical/material approval dependency interface

Important semantics:

- supplier truth ≠ normalized representation ≠ buyer adjustment ≠ supplier-confirmed contractable basis;
- qualification ≠ eligibility ≠ selection ≠ invitation ≠ intent ≠ submission;
- recommendation ≠ approval ≠ award ≠ commitment;
- claim ≠ assessment ≠ certification ≠ invoice/AP ≠ payment;
- delivery ≠ receipt ≠ acceptance ≠ return ≠ invoice ≠ payment;
- buyer recovery ≠ contract change ≠ reduction of gross certified earned value;
- CommercialTermsAuthority ≠ scope-consuming obligation;
- accounting authority is field/event specific: OWN / MIRROR / REFERENCE;
- no duplicate editable commercial/accounting ledger.

P1.2 comparison conclusion:

> Standardize the comparison grammar, not one comparison form.

P05 must support package-specific schemas, immutable quote revisions, hierarchical comparison basis, many-to-many mapping, missing/excluded/additional/alternate/bundled states, technical deviation separate from price, provenance-bearing buyer adjustments and frozen ComparisonSnapshots.

# 6. P1.2 evidence debt

Do not invent these into supported facts:

- FT-02 commitment versus allocation authority
- FT-06 remeasurement hard-conservation universality
- FT-09 rectification capacity / CR-02
- FT-10 one active exclusive-scope authority

CR-02 before P07 fulfillment implementation:

- reversible source fulfillment may restore capacity through a valid history-preserving reversal;
- irreversible source fulfillment does not restore capacity silently;
- replacement commitment requires governed authority;
- recovery from the defaulting supplier is separate from replacement procurement authorization.

# 7. P1.3 final inheritance

Binding rule:

> Inheritance is semantic reuse, not cumulative feature scope.

Synthesis:

> ProcurePro focus + Procore/BuildingConnected bid UX + CMiC/Vista commercial/finalization rigor + Ariba lifecycle discipline + Aconex evidence ownership + Kojo low-friction intake UX — bounded by P1.1 scope, P1.2 contractor truth and activation discipline.

No incumbent becomes the ontology.

Closest specialist incumbent: **ProcurePro**.

Candidate differentiation remains hypothesis-level:

- GCC/UAE operating fit;
- four-layer comparison truth;
- arbitrary-source bid comparability;
- commercial-truth expansion without full ERP;
- small-footprint deployment.

# 8. First activation / monetization rail

A0–A3 has one surface:

`requirement / material request / package`
`→ RFQ/tender`
`→ supplier response capture`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

Activation:

- A0 bootstrap
- A1 first sourcing event
- A2 comparison
- A3 governed award/handoff
- A4 later commitment/commercial execution, including controlled direct-source
- A5 optional enterprise/portfolio overlays

Kojo contributes intake UX only in A0–A3. Direct-source/direct-order is not a second first-release surface.

Pilot packages must be comparison-worthy. Do not judge early adoption against total procurement volume when repeat/direct orders are outside A0–A3.

Normalization economics must be measured against current Excel/manual work:

- response receipt to comparison-ready elapsed time;
- buyer manual-touch minutes;
- mapping/coverage decisions;
- clarification loops;
- reusable schema/mapping leverage;
- manual baseline.

# 9. Evidence and external access boundary

Classification:

`L shared substrate / not XL`

Own for governed transactions:

- EvidenceReference identity;
- immutable/versioned source attachment record;
- source/capture provenance;
- actor/organization/time/channel;
- domain object/event/version linkage;
- optional integrity hash/checksum where required;
- stored transaction-level sensitivity/access classification;
- version/supersession lineage;
- external access grant history.

Reference where externally authoritative:

- CDE drawings/submittals/review records;
- ERP/payment records;
- bank/security/legal records;
- master correspondence.

Refuse:

- general document management;
- transmittals/correspondence platform;
- markup/annotation;
- design/submittal review engine;
- CDE replacement;
- enterprise records management;
- legal hold/eDiscovery;
- retention/redaction/classification policy engine;
- mandatory supplier network/portal.

Important implementation warning:

Transaction sensitivity/classification is a recorded attribute, not a derived output of configurable classification rules.

Email is a capture channel. Automatic email-to-structured-bid parsing is not an A0–A3 prerequisite.

# 10. P1.4 objective

P1.4 must produce the **Boundary, Ownership & Tenancy Contract** before P1.5 can design the physical commercial core.

It should answer:

- What is the tenant?
- What is the legal entity?
- Can one tenant contain multiple legal entities?
- What is project ownership and contracting posture?
- Which objects are tenant-owned, legal-entity-owned, project-owned, cross-project, external-party-owned or referenced?
- How are internal users, service principals and external guests represented?
- What can external suppliers see and act on?
- Which records/evidence are organization-owned versus shared-visible?
- What happens on tenant offboarding, project archival, external-party revocation and data deletion requests?
- What is immutable, what may be redacted, what may be tombstoned and what must remain referenced?
- How do effective-dated policy/configuration versions bind to in-flight transactions?
- How does OWN/MIRROR/REFERENCE authority coexist across tenant/legal entity/project/integration boundaries?
- What are the concurrency and numbering boundaries?

# 11. Three mandatory P1.4 entry questions

These came directly from the final hostile recheck and must appear in the P1.4 workplan.

## Q1 — Internal authorization versus external grants

There are two authorization surfaces:

1. P09 internal roles/permissions/DOA/delegation;
2. evidence/external-access grants for guests and supplier actions.

P1.4 must decide whether they share one principal/authorization substrate or remain deliberately separate.

Do not casually force external guests into the same model as internal employees. Do not create two unrelated permission engines without justification.

## Q2 — Immutable evidence versus offboarding/deletion

Resolve the tension between:

- immutable commercial evidence/audit;
- tenant offboarding;
- external-party revocation;
- deletion/privacy/data-residency rights;
- contractual/legal retention.

Do not solve this by destructive history edits or by claiming all data is permanently undeletable.

## Q3 — Sensitivity attribute versus policy engine

Transaction-level sensitivity/access classification is allowed as a stored attribute.

A configurable rules/classification-policy engine is explicitly out of scope.

P1.4 must preserve that line in the ownership/access contract.

# 12. ADR posture entering P1.4

Provisional direction set / primary falsifiable / implementation form open:

- ADR-0003 requirement-authority/structural-root
- ADR-0008 bounded workflow controls
- ADR-0012 external identity/access
- ADR-0013 event-derived status
- ADR-0014 deep provenance
- ADR-0019 effective dating/version binding
- ADR-0021 OWN/MIRROR/REFERENCE

Strengthened but not closed:

- ADR-0005 accounting/commercial ownership seam
- ADR-0007 long-lead physical model
- ADR-0015 finalization/correction
- ADR-0018 workflow-financial seam

Still materially open/load-bearing:

- ADR-0004 PO/subcontract/framework/call-off physical model
- ADR-0010 GCC semantics — primary/regulatory/contractual evidence required
- ADR-0011 budget/cost attribution authority and timing
- ADR-0020 in-flight configuration binding
- ADR-0022 money/rounding/calculation order
- ADR-0023 numbering/concurrency/fiscal semantics

Fetch exact ADR files before making strong claims.

# 13. First P1.4 action

Do not begin with database tables.

Create `P1_4_WORKPLAN_V0_1.md` defining:

1. controlled questions and exit gate;
2. ownership-layer vocabulary;
3. principal/organization/tenant/legal-entity/project hierarchy alternatives;
4. internal and external authorization alternatives;
5. evidence ownership/offboarding/deletion alternatives;
6. integration-authority and configuration-binding questions;
7. ADRs to resolve versus merely direct;
8. hostile audit plan;
9. explicit non-goals preventing IAM platform, CDE, records-management or generic policy-engine expansion.

Then create an alternatives matrix before selecting a preferred architecture.

# 14. Working rules

- GitHub is canonical truth.
- Use GitHub connector first.
- Read relevant files before drafting.
- Fetch current SHA before updating existing files.
- Create versioned artifacts.
- Never silently rewrite P1.1/P1.2/P1.3 historical records.
- No product code.
- No P1.5 work before P1.4 PASS.
- No generic BPM, CDE, ERP, WMS, CPM or supplier-network expansion.
- Keep P07 as the only independent XL gravity well.
- Explain abstractions through construction/procurement behavior.
- Challenge architecture independently; do not preserve a design merely because prior reviews passed it.

# 15. Exact continuation instruction for the next chat

> Read the canonical GitHub state and this handoff. Confirm P1.0–P1.3 are closed and P1.4 is active. Do not restart competitor research. Begin P1.4 by producing the controlled workplan and ownership/tenancy alternatives, explicitly covering the three mandatory entry questions: internal authorization versus external grants, immutable evidence versus offboarding/deletion, and sensitivity attributes versus a forbidden classification-policy engine. Keep product code and P1.5 locked.
