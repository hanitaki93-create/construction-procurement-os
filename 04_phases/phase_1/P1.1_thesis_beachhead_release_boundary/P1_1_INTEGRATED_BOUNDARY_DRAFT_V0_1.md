# P1.1-F — Integrated Beachhead & Release Boundary Draft v0.1

**Status:** COMPLETE DRAFT / NOT FROZEN / HOSTILE CRITIQUE REQUIRED  
**Governing roadmap:** Phase 1 Roadmap v1.3  
**Purpose:** Define the first executable commercial attack surface while preserving the architecture ceiling.

---

# 1. Provisional beachhead selection

## Selected for the integrated draft

**UAE private-sector mid-market main contractors with a centralized procurement/commercial function, approximately 5–25 concurrently active building projects or equivalent multi-project procurement load, and no fully integrated enterprise procurement/commercial operating layer.**

This is an operational-complexity definition, not a revenue-band definition.

### Initial geography
UAE, with Dubai as the most practical first evidence/deployment environment and GCC expansion intentionally preserved.

### Project profile
Private building work with repeated material and subcontract packages: residential/villas, low/mid-rise, hospitality, commercial and fit-out/mixed building portfolios.

### Organizational profile
- dedicated procurement responsibility exists;
- project/site teams generate demand and technical inputs;
- commercial/QS/management participate in recommendations/changes/cost exposure;
- accounting/ERP exists or accounting is structured enough that the product must coexist with it rather than assume no back office;
- supplier/subcontractor behavior remains substantially external to the contractor's internal software.

### Current-stack hypothesis to test
ERP/accounting + spreadsheets + email/messaging + shared files coexist, with procurement status, tender evidence, approval and commitment truth fragmented between them.

### Why this beachhead
It is complex enough to expose the hard architecture we care about — authority, dual procurement paths, vendor participation, commitments, changes, cost attribution, evidence and integration — while still allowing a closed product slice that does not begin by replacing enterprise accounting/CDE infrastructure.

Current official UAE context (`SRC-0047`–`SRC-0050`) supports a large active construction environment and ongoing contractor digitalization; exact workflow pain and buying behavior remain hypotheses for P1.2.

### Control populations
- **Candidate B:** upper-mid/enterprise GCC main contractors — used as a ceiling/integration comparator, not initial scope driver.
- **Candidate C:** specialist subcontractors — used as a workflow falsification/control population so the main-contractor model does not become falsely universal.

---

# 2. Three falsifiable wedges

Detailed definitions: `P1_1_WEDGE_HYPOTHESES_V0_1.md`.

## WEDGE-01 — Procurement Control Loop
Create one deterministic operating flow from planned demand/MR/package through RFQ, bid, comparison, recommendation, approval and award/commitment handoff.

**Target:** ≥25% lower RFQ→approved-award elapsed time or ≥50% fewer duplicated manual status/reconciliation updates for comparable workflows.

## WEDGE-02 — Commercial Commitment Truth
Connect approved award, cost attribution, commitment and controlled change events so procurement/commercial teams can trust current committed/pending exposure without the product becoming a full GL/AP system.

**Target:** ≥90% of in-scope open awarded/committed scope reconciled to current value/cost attribution without a parallel commitment spreadsheet, and ≥50% lower manual reconciliation effort.

## WEDGE-03 — Low-Friction Supplier Participation + Tender Evidence
Allow secure low-friction participation, controlled quote/revision evidence and comparison-ready requested data without forcing suppliers into a heavyweight portal.

**Target:** ≥70% of responsive invited suppliers can participate without permanent portal onboarding; every comparison-used revision is source/version/time identified; ≥40% lower bid-preparation/revision-identification effort.

### Wedge dependency rule
WEDGE-01 must deliver standalone deterministic value. WEDGE-02 must add commercial truth without requiring accounting replacement. WEDGE-03 may strengthen the attack surface but may not make supplier behavior change a prerequisite for WEDGE-01.

---

# 3. V1 scope classification

Canonical matrix: `P1_1_SCOPE_MATRIX_V0_1.csv`.

**80 candidate product areas classified:**
- **SPINE: 37**
- **THIN: 20**
- **INTERFACE-ONLY: 7**
- **OUT: 16**

No `important later` bucket exists.

## SPINE shape

### Operating/authority substrate
- tenant/company/legal entity/project;
- users, external identities, roles/permissions/DOA;
- constrained shared approval/routing;
- audit events;
- vendor master/categories;
- bounded service/API actions.

### Commercial substrate
- cost-code/WBS reference;
- budget snapshot / available-for-commitment context;
- canonical commercial event substrate;
- monetary/currency/tax/rounding semantics;
- commitment record and controlled changes.

### Procurement/sourcing spine
- procurement plan;
- requisition path;
- package path, without assuming package is universal root;
- RFQ/tender;
- bidder invitation;
- pricing/bid form;
- quote/revision capture;
- bid comparison/levelling;
- recommendation;
- approval/authority;
- award/handoff.

### Evidence/external/integration spine
- commercial evidence provenance;
- document identity/version for owned commercial artifacts;
- secure guest tender participation;
- external integration/event API;
- connector/reconciliation framework;
- export/accounting handoff;
- responsive web surface;
- operational dashboards/core reports.

## THIN areas
Examples: configuration inheritance, vendor compliance/performance, item catalogue, long-lead tracking, clarifications, negotiation log, document compilation, delivery/GRN, claims/certification, retention/bond terms, closeout, communication capture, supplier registration, import/migration, saved views.

THIN means the deterministic concept/lifecycle seam exists but breadth is intentionally constrained.

---

# 4. Explicit V1 exclusions / boundaries

## Accounting / finance
**OUT:** AP, GL, banking/payment execution.  
**INTERFACE-ONLY:** invoice/payment status and full budget ownership where external accounting/cost systems are authoritative.

V1 may derive procurement/commercial balances but does not claim to be the accounting ledger.

## CDE / project controls
**INTERFACE-ONLY:** full CDE/drawing/BIM and project scheduling.  
**OUT:** RFI/submittal/transmittal management as a product domain.

Commercial records may reference exact external document/schedule versions without recreating the entire project-control suite.

## Enterprise connector breadth
**INTERFACE-ONLY:** deep named ERP connectors until beachhead stack is proven.  
**SPINE:** connector authority/retry/conflict/reconciliation framework and API contracts.

## External supplier surface
**OUT:** broad supplier dashboard/portal and marketplace/network.  
**SPINE:** task-focused secure participation and exact bid evidence.

## Platform generality
**OUT:** general no-code schema and general-purpose workflow engine.  
**SPINE/THIN:** typed entities plus constrained shared routing/approval and limited configuration.

## Field/mobile
**OUT:** native mobile and offline synchronization initially.  
**SPINE:** responsive web/API architecture that does not preclude later clients.

## Adjacent enterprise domains
**OUT:** inventory/warehouse, HR/payroll, CRM.  
**INTERFACE-ONLY:** estimating/takeoff handover and scheduling references.

## AI
**OUT from deterministic V1 implementation:** extraction, copilot/recommendation and autonomous actions.  
The provenance, bounded-action and API substrate remains intentionally ready for later AI.

---

# 5. Implementation burden budget

Canonical budget: `P1_1_BURDEN_BUDGET_V0_1.md`.

- Hard V1 envelope: **240 weighted burden units**.
- Current draft: **230.2**.
- Reserve: **9.8**.
- Maximum current workstream: commitments/changes/commercial truth = **38.1**, below the 40-unit mandatory sub-slicing trigger.

The budget intentionally protects the difficult commercial substrate and creates pressure against adding separate gravity wells.

### Attractive features deliberately deferred/cut
At minimum the P1.1 gate requirement is satisfied by explicit deferral of several attractive capabilities:
- general workflow/no-code platform;
- deep ERP connector portfolio;
- full CDE/BIM/project-control suite;
- native mobile/offline;
- broad supplier portal/marketplace;
- full AP/GL/payment system;
- inventory/warehouse;
- deterministic-stage AI.

These are deferred for burden/dependency reasons, not because the long-term platform ceiling is being reduced.

---

# 6. Expected closed executable sub-graph

The later P1.5 Closed Sub-graph Gate should be able to execute this loop without unbuilt domains:

`Company/Legal Entity → Project → User/Authority → Vendor → Cost/WBS/Budget Context → Procurement Plan → {MR | Package} → RFQ → Invite/Guest Access → Quote/Revision → Comparison → Recommendation → Approval → Award → Commitment → Change → Derived Commercial Balance → Evidence/Audit → Export/Reconciliation`

Supporting THIN branches may attach for:
- compliance;
- long lead;
- clarifications;
- delivery/GRN;
- progress claim/certification;
- retention/guarantee terms;
- closeout.

Every dependency leaving the sub-graph must terminate at an explicit interface:
- accounting/ERP;
- estimating/budget source;
- CDE/document source;
- e-sign provider;
- project schedule.

A V1 implementation fails the intended boundary if a core procurement/commitment lifecycle cannot reach a valid state without implementing one of the OUT domains.

---

# 7. Evidence-to-revisit rules

The detailed row-level revisit condition is stored in the scope matrix. Cross-cutting triggers include:

### Promote an OUT/INTERFACE area only when
- primary evidence shows it is required to complete a retained SPINE lifecycle;
- the selected buyer will not adopt without it;
- its absence causes duplicate commercial truth rather than merely inconvenience;
- or it becomes cheaper/safer than maintaining the external-system seam.

### Demote a SPINE area only when
- primary evidence shows the concept is not required for the beachhead's coherent transaction lifecycle;
- another abstraction provides the same invariant without duplicate truth;
- or the capability creates harmful coupling disproportionate to its strategic role.

Ambition or raw implementation size alone is not a demotion reason.

---

# 8. Important decisions intentionally NOT made in P1.1

This boundary does not settle later ADRs prematurely.

Still primary/design-phase dependent:
- package vs requisition structural relationship;
- PO/Subcontract shared Commitment model;
- accounting/commercial field authority;
- exact workflow-engine generality;
- exact configuration inheritance/versioning;
- long-lead object model;
- GCC policy semantics;
- posting/finalization/correction design;
- temporal authority;
- integration field authority/staleness;
- detailed money/rounding policy;
- numbering semantics.

P1.1 says these concepts must fit the retained ceiling where applicable; it does not select their final models.

---

# 9. P1.1 draft gate assessment

| Gate condition | Draft status |
|---|---|
| one named beachhead selected | **PROVISIONALLY YES** — Candidate A |
| three falsifiable wedges | **YES** |
| 100% candidate areas classified | **YES — 80/80** |
| numeric burden budget | **YES — 230.2 / 240** |
| explicit exclusions/revisit evidence | **YES** |
| at least one attractive feature deliberately deferred | **YES — multiple** |
| no everything-is-core outcome | **YES** |
| hostile critique resolved | **NO — critique is now due** |

---

# 10. Critique boundary

**STOP here before P1.1 freeze.**

The hostile critique should attack this integrated object, especially:
1. whether Candidate A is the wrong structural beachhead;
2. whether 37 SPINE areas are genuinely one coherent closed sub-graph or hidden ERP sprawl;
3. whether WEDGE-02 makes commitments/changes too deep for a first attack surface or is essential to avoid a weak tender tracker;
4. whether the interface boundaries create duplicate truth or impossible adoption dependencies;
5. whether the 230.2/240 budget is actually constraining or merely fitted around the desired scope;
6. whether any OUT area is secretly required by a retained SPINE lifecycle;
7. whether the boundary preserves the intended multi-country/AI-ready ceiling without forcing those capabilities into V1.
