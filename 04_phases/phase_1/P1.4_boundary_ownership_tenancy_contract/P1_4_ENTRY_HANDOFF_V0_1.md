# P1.4 — Entry Handoff v0.1

**Date:** 2026-07-30  
**Status:** **P1.4 UNLOCKED / READY TO START**  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Default branch:** `main`

---

# 1. Purpose of this handoff

This document is the starting point for the next chat/session.

The next session should **not rely on chat memory alone**. It should use GitHub as canonical truth, read the required files below, confirm current `PROJECT_STATE.md`, and then begin P1.4.

Do not restart prior research unless a new contradiction requires controlled change.

---

# 2. Current project position

Phase: **Phase 1 — Deterministic Architecture & Product Specification**

Closed:

- P1.0 — Research Control System — PASS / CLOSED
- P1.1 — Thesis, Beachhead & Release Boundary — PASS / FROZEN
- P1.2 — Primary Workflow Evidence — PASS / CLOSED
- P1.3 — Competitor Reconstruction — PASS / CLOSED

Next:

- **P1.4 — Boundary, Ownership & Tenancy Contract — ACTIVE / UNLOCKED**

Still locked:

- P1.5 and later Phase-1 subphases until P1.4 gate passes
- product code
- Phase 2/3 build

---

# 3. Mandatory startup procedure for next chat

Before making structural claims or creating P1.4 artifacts:

1. Read the GitHub plugin skill.
2. Fetch current `PROJECT_STATE.md` from `main`.
3. Read this handoff.
4. Read the P1.3 final verdict/checkpoint.
5. Read the frozen P1.1 baseline and P1.2 final verdict/reconciliation.
6. Read the specific P1.3 artifacts listed below.
7. Fetch exact ADR files before making strong claims about an ADR's wording/status.
8. Create a P1.4 workplan before doing broad architecture work.

GitHub is canonical truth. Do not infer that an old chat summary supersedes current repo content.

For existing mutable files, fetch current SHA before update.

For historical/versioned artifacts, create a new version rather than silently rewriting v0.1 history.

---

# 4. Files the next chat should read first

## A. Canonical state

- `PROJECT_STATE.md`

## B. P1.3 closure

- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_FINAL_CHECKPOINT_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_DESIGN_INHERITANCE_REGISTER_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_CROSS_MARKET_CONCLUSIONS_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_FIRST_RAIL_AND_ACTIVATION_BOUNDARY_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_EVIDENCE_EXTERNAL_ACCESS_BOUNDARY_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/P1_3_STATE_MACHINE_RECONSTRUCTIONS_V0_1.md`
- `04_phases/phase_1/P1.3_competitor_reconstruction/registers/P1_3_TERMINOLOGY_CROSSWALK_V0_1.csv`
- `04_phases/phase_1/P1.3_competitor_reconstruction/registers/P1_3_COMPETITOR_MATRIX_FINAL_V0_2.csv`

The hostile-review remediation files are historical support, not the primary starting point after closure.

## C. Frozen P1.1

Read the canonical P1.1 final verdict and frozen baseline, especially:

- frozen beachhead;
- 84-area scope classification;
- one-XL rule;
- first-live-tender ≤5-working-day target;
- zero bespoke named connector prerequisite;
- closed procurement-control graph.

Known canonical file:

- `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md`

Also fetch the current P1.1 final verdict path from repo before quoting it.

## D. P1.2 closure and primary evidence

Read:

- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_FINAL_PRIMARY_RECONCILIATION_V0_1.md`
- latest sourcing checkpoint
- latest P07/P08 commercial-core checkpoint
- latest complete provisional operational checkpoint
- primary falsification targets
- Perflex comparison-artifact decomposition

Do not assume P1.2 closure means every physical-model choice is proven.

---

# 5. Product philosophy that remains binding

- deterministic substrate owns truth/state;
- API-native and AI-ready;
- AI may later propose/extract/assist through structured operations, validation, confidence, provenance and approval;
- AI never silently writes hallucinated commercial/accounting truth;
- third-party obligations/invariants are deterministic;
- ambitious architecture is acceptable, but scope must be reduced by evidence/engineering rather than generic MVP advice;
- narrow first surface does not imply a small long-term architecture;
- product must avoid the prior failure mode of endless sophisticated architecture without commercial proof;
- process invention remains paused unless evidence proves a missing lifecycle.

---

# 6. Frozen beachhead / long-term direction

The frozen structural envelope is UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.

Do not introduce a hard company revenue/headcount band unless later commercial evidence justifies one.

The long-term product may cover materials and subcontracts, sourcing through commercial closeout, but P1.1 defines the controlled V1 boundary and one-XL burden rule.

---

# 7. First monetization / activation rail carried into P1.4

A0–A3 first-value surface:

`requirement / material request / package`
`→ RFQ/tender`
`→ supplier response capture`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

Important:

- Kojo contributes **intake UX only** in A0–A3.
- Direct-source/direct-order is not part of the first rail.
- Direct-source remains a valid P1.2 domain route and is deferred to A4 commercial execution.
- P07 execution is not required for A0–A3.
- ERP/CDE implementation is not required for A0–A3.
- advanced AI is not required for A0–A3.

P1.4 must preserve this activation independence.

---

# 8. Comparison truth carried into P1.4

Primary evidence established:

> **standardize the comparison grammar, not one comparison form.**

The comparison model must preserve four semantic layers:

1. supplier source submission/revision;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

Mapping must support package-specific, hierarchical and many-to-many semantics including exact, partial, bundled, alternate/substitute, supplier-added, missing and unresolved states.

Do not allow a tenancy/ownership decision in P1.4 to collapse supplier source truth into buyer-normalized truth.

---

# 9. Best-of-each competitor inheritance carried into P1.4

Binding rule:

> **Inheritance is semantic reuse, not cumulative feature scope.**

Synthesis:

- ProcurePro — construction-procurement focus and connected sourcing rail;
- Procore / BuildingConnected — bid UX, package-specific response structures, leveling and low-friction response paths;
- CMiC / Vista — commercial/finalization rigor and correction/posting lessons;
- SAP Ariba — supplier/sourcing lifecycle discipline;
- Aconex — evidence ownership/audit lessons without full CDE;
- Kojo — low-friction intake UX only for first rail;
- JobTread / Buildxact — adoption/pricing contrast only, not ontology.

P1.4 should not add competitor features merely because they exist.

---

# 10. Evidence / external access boundary entering P1.4

Classification:

`L SHARED SUBSTRATE / NOT XL`

Product owns, for governed transactions:

- EvidenceReference identity;
- immutable/versioned source attachment record;
- source/capture provenance;
- actor/organization/time/channel;
- domain event/object/version linkage;
- supersession/version lineage;
- bounded external-access grant history;
- transaction-level sensitivity/access classification as a recorded attribute.

Product references where externally authoritative:

- CDE drawings/submittals/review records;
- enterprise document IDs;
- ERP/payment evidence;
- bank/security/legal records;
- master correspondence.

Product refuses:

- general document management;
- project transmittal/correspondence platform;
- markup/annotation;
- design/submittal review engine;
- CDE replacement;
- enterprise records management;
- legal hold/eDiscovery;
- retention/redaction/classification policy engine;
- mandatory supplier network/portal.

Important implementation warning from final hostile review:

> sensitivity/access classification remains safe only while it is a recorded transaction attribute. Do not silently turn it into a configurable rule/policy engine.

---

# 11. External identity/access direction entering P1.4

ADR-0012 is now provisionally directed:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Direction:

- task/tender-scoped low-friction external participation;
- no mandatory persistent supplier signup to respond to a tender;
- guest link / email / governed buyer-on-behalf capture allowed with provenance;
- least-privilege scoped access;
- expiring/revocable grants.

Still open and owned by P1.4:

- persistent supplier account/identity;
- cross-tenant identity/network;
- authentication mechanism;
- organization hierarchy/persistence;
- tenancy relationship between one supplier organization and multiple contractor tenants.

---

# 12. Three explicit P1.4 entry obligations from final hostile review

These are non-blocking P1.3 carryovers but should be addressed early in P1.4.

## OBL-P14-01 — internal authorization vs external grant

There are now two authorization surfaces:

- internal P09 permission / DOA / delegation;
- external evidence/access grant for suppliers/subcontractors/guests.

P1.4 must decide whether they:

- share a common principal/authorization substrate with distinct policy semantics, or
- remain deliberately separate models linked at bounded interfaces.

Do not assume external guests are ordinary internal Users.

## OBL-P14-02 — immutable evidence vs deletion/offboarding

P1.4 must reconcile:

- immutable/auditable transaction evidence;
- tenant offboarding;
- deletion rights/contractual retention;
- data residency;
- external-party evidence ownership;
- legal/regulatory retention where applicable.

Do not solve this by destructive deletion of commercial history or by claiming perpetual storage without contractual/legal basis.

## OBL-P14-03 — classification attribute vs policy engine

Transaction-level sensitivity/access classification is permitted as owned metadata.

P1.4 must keep it bounded.

Do not create:

- arbitrary classification-rule language;
- general records-management policy engine;
- enterprise information-governance subsystem.

---

# 13. P1.4 required outputs

P1.4 is the **Boundary, Ownership & Tenancy Contract** stage.

Its expected outputs include, at minimum:

1. per-entity/object ownership table using `OWN / MIRROR / REFERENCE / OUT`;
2. authoritative system definition for load-bearing objects/fields/events;
3. accounting seam and authority boundary;
4. tenant/company/legal-entity hierarchy;
5. branch / business-unit / JV or equivalent posture where structurally required;
6. project ownership and legal-entity relationship;
7. tenancy architecture and cross-tenant isolation rules;
8. internal identity model boundary;
9. external vendor/subcontractor identity/access boundary;
10. evidence ownership and external organization provenance;
11. data-residency position / ADR;
12. early integration boundary decisions;
13. no accidental GL/AP/accounting ownership;
14. no accidental CDE ownership;
15. no accidental supplier-network/cross-tenant product;
16. explicit treatment of the three P1.4 entry obligations above.

P1.4 gate should freeze the V1 SPINE boundary contract so that no core object remains ambiguous about ownership/authority and no unresolved identity/residency choice would force commercial-core replanning later.

---

# 14. Open structural questions P1.4 must respect

Do not silently close these based on competitor convention.

Known open/material ADR areas include:

- ADR-0003 — physical structural root remains open even though requirement-authority direction is provisionally set;
- ADR-0004 — PO/subcontract/framework/call-off physical model;
- ADR-0005 — accounting/commercial ownership seam;
- ADR-0007 — long-lead physical model;
- ADR-0010 — GCC semantics;
- ADR-0011 — budget/cost attribution authority/timing;
- ADR-0012 — persistent external identity/tenancy mechanics;
- ADR-0015 — posting/finalization/reversal/correction physical model;
- ADR-0018 — workflow-to-financial-state seam;
- ADR-0020 — in-flight configuration binding;
- ADR-0022 — money/rounding/calculation order;
- ADR-0023 — numbering/concurrency/fiscal semantics.

Before changing status/wording, fetch the exact ADR file from GitHub.

---

# 15. Evidence debt that remains real

P1.2 closed without inventing support for:

- FT-02 — commitment versus requirement-allocation authority;
- FT-06 — remeasurement hard-conservation universality;
- FT-09 — rectification/replacement capacity treatment / CR-02;
- FT-10 — one active exclusive-scope authority in messy real organizations.

P1.4/P1.5 must not silently convert these into proven facts.

CR-02 remains pre-P07-fulfillment implementation obligation:

- reversible source fulfillment may restore capacity through valid history-preserving reversal/release;
- irreversible fulfilled/certified defective work does not silently return capacity;
- replacement procurement requires genuine additional/returned authority;
- recovery against defaulting supplier is separate from replacement authorization/cost.

---

# 16. GCC/UAE evidence warning

ADR-0010 GCC semantics remains conspicuously under-evidenced.

P1.3 benchmark coverage is mostly global/Western enterprise software. Qotera UAE only helped with sourcing friction; it does not prove GCC commercial semantics.

Do not infer UAE/GCC contractual/commercial rules from Procore, CMiC, Ariba, Coupa, Oracle or Vista.

For GCC-specific decisions, use:

- primary contractor evidence;
- actual UAE/GCC transaction artifacts/contracts;
- applicable regulatory/contractual sources;
- current public authoritative sources where relevant.

This is evidence work, not a reason to restart competitor reconstruction.

---

# 17. Commercial truth / market discipline

Current posture:

`CONTINUE — NOT PMF PROOF`

Closest known specialist incumbent on the same sourcing rail:

- ProcurePro

Candidate differentiation remains hypothesis-level:

- GCC/UAE contractor operating fit;
- four-layer comparison truth;
- arbitrary-source bid comparability;
- commercial-truth expansion without full ERP;
- small-footprint deployment.

No claim of superiority or PMF.

Pilot success must be judged using **comparison-worthy packages**.

Do not use total company procurement volume as the primary activation metric because repeat/direct material purchasing is intentionally outside A0–A3.

A2 pilot metrics should include:

- supplier-response receipt to comparison-ready elapsed time;
- buyer manual-touch minutes per response;
- mapping/coverage decisions;
- clarification loops;
- reusable schema/mapping leverage;
- current Excel/manual baseline.

The first rail fails commercially if normalization remains more expensive than the incumbent comparison workflow even when architecture is correct.

---

# 18. One-XL rule

Current intended single independent XL gravity well:

**P07 — commitment/change/valuation/commercial truth.**

P1.4 must reject boundary choices that create another independent XL product such as:

- full accounting ERP/GL/AP/cash;
- generalized BPM/low-code;
- full CDE/records management;
- CPM/master scheduling;
- claims/legal platform;
- payment/banking platform;
- inventory/WMS;
- mandatory supplier network.

---

# 19. Recommended P1.4 execution sequence

The next chat should proceed roughly in this order.

## Step 1 — establish P1.4 workplan and gate

Create a controlled workplan that names:

- required outputs;
- evidence sources;
- ADRs affected;
- internal audit gates;
- hostile-review milestone;
- explicit P1.5 unlock condition.

Do not start with physical schema design.

## Step 2 — inventory all load-bearing objects and authorities

Start from P01–P12 plus shared substrates.

For each object/fact/event identify:

- owner;
- authority;
- legal entity/project scope;
- tenant scope;
- external source where applicable;
- whether persistent or projection;
- whether P1.4 must decide now or defer.

## Step 3 — build `OWN / MIRROR / REFERENCE / OUT` contract

This should become the central boundary table.

Pay special attention to:

- vendor identity;
- quote/source evidence;
- technical approval references;
- budget/cost-code references;
- commitments;
- invoices/payment status;
- CDE artifacts;
- accounting fields;
- external grant/access records.

## Step 4 — tenant/legal-entity/project hierarchy

Determine the minimum hierarchy needed to support:

- one contractor company;
- multiple legal entities/branches/BUs where real;
- projects under a contracting legal entity;
- JV/other posture only to the level structurally necessary;
- vendor organization reuse without leaking data across tenants.

Avoid turning organizational modeling into an enterprise HR/master-data product.

## Step 5 — identity + authorization split

Resolve OBL-P14-01.

Model internal principals versus external principals deliberately.

Ensure external grant semantics cannot bypass P09 domain authorization.

## Step 6 — evidence + lifecycle + deletion/residency

Resolve OBL-P14-02 and OBL-P14-03.

Define evidence authority, retention/offboarding posture, provenance, and reference behavior without CDE/records-management expansion.

## Step 7 — accounting/integration authority

Use P08 direction:

- `OWN`
- `MIRROR`
- `REFERENCE`

Define field/event authority and reconciliation direction.

Do not create duplicate editable ledgers.

## Step 8 — hostile boundary audit

Before closing P1.4, attack:

- hidden cross-tenant leakage;
- duplicate authority;
- identity ambiguity;
- supplier network creep;
- CDE creep;
- accounting creep;
- P07 second ledger;
- immutable evidence versus offboarding conflict;
- authorization bypass;
- choices that force bespoke connector setup before first tender.

Then use one coherent external hostile review packet.

---

# 20. What the next chat should NOT do

- do not start P1.5 before P1.4 PASS;
- do not write product code;
- do not define database tables prematurely;
- do not reopen P1.3 competitor breadth;
- do not let the closest incumbent define our ontology;
- do not silently change P1.1 frozen scope;
- do not downgrade P1.2 primary contractor evidence in favor of software conventions;
- do not add a second first-release direct-purchase surface;
- do not make portal signup mandatory;
- do not make AI extraction a dependency for first value;
- do not solve evidence by building a CDE;
- do not solve accounting coexistence by building an ERP;
- do not solve access by building a cross-tenant supplier marketplace;
- do not claim GCC semantics from Western competitor evidence.

---

# 21. Next-chat opening instruction

A good opening instruction for the next session is:

> Continue the Construction Procurement OS from P1.4 Boundary, Ownership & Tenancy Contract. GitHub `hanitaki93-create/construction-procurement-os` on `main` is canonical. First read the GitHub skill, current `PROJECT_STATE.md`, `P1_4_ENTRY_HANDOFF_V0_1.md`, P1.3 final verdict/checkpoint, the frozen P1.1 baseline and P1.2 final verdict/reconciliation. Fetch exact ADR files before making ADR claims. P1.0–P1.3 are closed; do not reopen them without controlled contradictory evidence. Product code and P1.5 remain locked. Start by creating the P1.4 workplan and boundary/ownership inventory, with special attention to internal authorization vs external grants, immutable evidence vs tenant deletion/offboarding, classification attribute vs policy engine, accounting authority, tenancy isolation and external supplier identity.

---

# 22. Formal handoff

**P1.3 is closed.**

**P1.4 is the next active subphase.**

The next chat should orient from GitHub, create the P1.4 workplan, and begin boundary/ownership/tenancy reconstruction without revisiting closed competitor research.
