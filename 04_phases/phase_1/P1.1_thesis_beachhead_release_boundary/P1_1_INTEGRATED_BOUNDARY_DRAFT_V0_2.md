# P1.1-F — Integrated Structural Envelope & Release Boundary Draft v0.2

**Status:** COMPLETE CORRECTED DRAFT / NOT FROZEN / HOSTILE RECHECK REQUIRED  
**Supersedes:** `P1_1_INTEGRATED_BOUNDARY_DRAFT_V0_1.md` for current P1.1 reasoning  
**Governing roadmap:** Phase 1 Roadmap v1.3

## 1. What P1.1 decides

P1.1 defines:
- the structural environment the architecture must accommodate;
- who P1.2 should observe first;
- the provisional V1 closed sub-graph;
- provisional scope classes and interface boundaries;
- implementation-burden guardrails.

P1.1 does **not** prove product-market fit, willingness to pay, pricing, sales cycle, commercial implementation model, exact organization size or optimal geography.

## 2. Initial structural/sampling beachhead

**UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture that the product must coexist with rather than assume.**

Primary P1.2 sampling emphasis may be main contractors because they expose both downstream buying and upstream commercial context. Specialist contractors remain an intentional posture variant/control population.

### Architecture-active attributes

- UAE jurisdiction profile without UAE-only ontology.
- private-sector tender regime as initial deployment boundary; public-procedure requirements remain open.
- contracting posture is modelled, not hardcoded to tenant type.
- legal-entity/branch/BU multiplicity where present.
- explicit authority/DOA depth.
- AED plus possible differing commitment/vendor currencies.
- accounting posture ranges from weak procurement integration to substantial ERP/job-cost authority.
- suppliers/subcontractors are first-class external participants.

### Explicitly removed as architecture constraints

- `mid-market`;
- revenue bands;
- 5–25 concurrent projects or any fixed volume band;
- willingness-to-pay/sales assumptions.

Concurrency remains only a P1.2 sampling/measurement variable.

Canonical detail: `P1_1_STRUCTURAL_ENVELOPE_V0_2.md`.

## 3. Structural wedge hypotheses

Canonical detail: `P1_1_WEDGE_HYPOTHESES_V0_2.md`.

### WEDGE-01 — Closed Sourcing-to-Commitment Control Path

Demand (`MR` or package) can progress through tender, quote/revision, comparison, governed award and commitment handoff under one lifecycle/evidence/authority model without a parallel transaction-status ledger.

### WEDGE-02 — Commercial Commitment Truth

Award, cost attribution, commitment, controlled change and valuation/progress events can form coherent commercial truth while AP/GL/invoice/payment ownership remains an explicit boundary decision.

### WEDGE-03 — Task-Focused External Tender Participation

An external supplier can receive/respond/revise/clarify through bounded secure tender actions without requiring a broad persistent supplier portal.

These are architecture/operating hypotheses. P1.1 does not claim commercial validation.

## 4. Corrected scope classification

Canonical matrix: `P1_1_SCOPE_MATRIX_V0_2.csv`.

**82 candidate areas:**
- **30 SPINE**
- **28 THIN**
- **9 INTERFACE-ONLY**
- **15 OUT**

All classifications are provisional until P1.1 freeze. Any row depending on an unresolved `PRIMARY_REQUIRED` ADR names that ADR; the scope class cannot settle the ADR.

### Important corrections from v0.1

- AP/GL: `OUT` → **INTERFACE-ONLY / ADR-0005 dependent**.
- vendor category/taxonomy depth: SPINE → THIN.
- procurement plan: SPINE → THIN.
- structured bid form: SPINE → THIN.
- recommendation object: SPINE → THIN.
- external API breadth: SPINE → THIN.
- connector runtime/reconciliation framework: SPINE → INTERFACE-ONLY pending ownership seam.
- export/BI breadth: SPINE → THIN.
- dashboards/core report UI: SPINE → THIN.
- minimum vendor compliance/eligibility state: **new SPINE**.
- valuation/progress event substrate: **new SPINE**.

Full SPINE test: `P1_1_SPINE_RETEST_V0_2.md`.

## 5. Corrected accounting/finance boundary

### Retained commercial truth

V1 architecture retains:
- cost/WBS attribution;
- budget/baseline context;
- commitment identity;
- controlled change events;
- valuation/progress event substrate;
- derived commercial balances;
- provenance/audit;
- reconciliation/interface semantics.

### Explicit boundary

- **AP/GL ownership:** INTERFACE-ONLY and unresolved under `ADR-0005`.
- **invoice/payment status:** INTERFACE-ONLY where externally authoritative.
- **payment execution/banking:** OUT.
- **progress claim/certification workflow:** THIN.
- **valuation/progress event semantics:** SPINE.

The system may represent incurred/certified commercial position without claiming payment execution. A `paid` balance cannot be treated as product-authoritative unless the later ownership decision explicitly grants that authority or it is mirrored from an authoritative external source.

## 6. Corrected external supplier boundary

WEDGE-03 requires only the SPINE `EXT-01` minimum secure tender-response surface:
- invite/access;
- acknowledge/respond;
- bid/attachment submission;
- revision identity;
- clarification/reply as needed;
- confidentiality boundary.

A broad persistent supplier portal/dashboard remains OUT. There is no contradiction: task participation is core; portal breadth is not.

## 7. Corrected workflow boundary

The general-purpose workflow engine remains OUT.

However, V1 approval/routing cannot be implemented as throwaway module-specific history. Shared approval/routing primitives must be:
- durable and versioned;
- bound to domain guards/actions;
- historically reproducible;
- capable of becoming a constrained profile/specialization within a later broader workflow model.

`ADR-0008` remains PRIMARY_REQUIRED; P1.1 does not select final workflow generality.

## 8. Corrected inventory/GRN boundary

Inventory/warehouse remains OUT.

V1 may capture material receipt/GRN as **commercial receipt/valuation evidence** linked to a commitment/valuation event. It does not own:
- stock-on-hand;
- warehouse/bin movements;
- inventory costing ledger;
- replenishment/warehouse operations.

This prevents GRN semantics from silently pulling inventory into V1.

## 9. Corrected closed executable graph

The P1.5 Closed Sub-graph Gate should be able to execute:

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → Quote/Revision → Comparison → Award Proposal → Commitment → [Controlled Change] → Valuation/Progress Event → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

### Cross-cutting edge property

Every state-changing edge carries the applicable:
- authority/approval guard;
- evidence/provenance requirement;
- bounded action;
- audit event;
- idempotency/concurrency rule where applicable.

Approval is therefore not omitted; it is a governed edge property/service used by multiple nodes.

### Detailed certification/payment statement

- valuation/progress event: SPINE;
- detailed claim/certification workflow: THIN;
- payment status: INTERFACE-ONLY where external;
- banking/payment execution: OUT.

## 10. Implementation burden budget v0.2

The old `230.2 / 240` pseudo-unit score is retired.

Canonical budget: `P1_1_BURDEN_BUDGET_V0_2.md`.

### Axes
- implementation cost: `S / M / L / XL`;
- retrofittability: `CHEAP / EXPENSIVE / IMPOSSIBLE`.

### Numeric guardrails

- maximum independent XL SPINE gravity wells: **1**;
- `XL + CHEAP` may not be SPINE;
- standard-config new tenant target to first live tender: **≤5 working days** from clean onboarding inputs;
- bespoke named connector implementations required before first live tender: **0**.

Current draft has one XL SPINE gravity well: commitment/change/valuation/commercial truth.

## 11. Deliberately deferred gravity wells

Remain outside SPINE:
- full AP/GL/payment execution;
- full CDE/BIM/project-control suite;
- inventory/warehouse;
- general workflow/no-code platform;
- deep named connector portfolio;
- broad supplier portal/marketplace;
- native/offline clients;
- deterministic-stage AI.

These are deferred because they are separate implementation gravity wells, not because the long-term platform ceiling is reduced.

## 12. Decisions explicitly still unknown

P1.1 does not decide:
- procurement package vs requisition structural root (`ADR-0003`);
- PO/Subcontract type model (`ADR-0004`);
- accounting/commercial ownership seam (`ADR-0005`);
- workflow generality (`ADR-0008`);
- configuration breadth (`ADR-0009`);
- GCC policy semantics (`ADR-0010`);
- external identity model details (`ADR-0012`);
- posting/reversal/correction design (`ADR-0015`);
- temporal/config binding/integration authority/money/numbering decisions assigned later;
- willingness to pay, pricing, sales cycle, company size or concurrency bands;
- whether the hypothesized field pains exist materially.

## 13. Gate status

| P1.1 condition | Corrected draft status |
|---|---|
| structural/sampling beachhead exists | YES — provisional |
| three falsifiable structural wedges | YES |
| all candidate areas classified | YES — 82/82 |
| burden budget explicit | YES — ordinal + numeric guardrails |
| exclusions/revisit rules explicit | YES |
| attractive gravity wells deliberately deferred | YES |
| no everything-is-core outcome | YES |
| hostile critique resolved | **PENDING RECHECK** |

## 14. Critique boundary

Do not freeze P1.1 yet.

The next hostile recheck should inspect only whether these corrections resolved Critique 01:
- structural envelope vs commercial persona;
- ADR-dependent scope classifications;
- SPINE re-test/demotions;
- accounting/portal/workflow/inventory boundaries;
- corrected graph closure;
- burden-budget replacement.

If those pass, P1.1 can freeze and P1.2 can open.