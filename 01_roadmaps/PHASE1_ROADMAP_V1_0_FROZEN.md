# Construction Procurement OS
# Phase 1 Roadmap v1.0 — FROZEN

**Version:** 1.0  
**Freeze date:** 2026-07-28  
**Status:** FROZEN GOVERNING ROADMAP  
**Supersedes:** the P1.0–P1.12 process sequence in `construction_procurement_os_phase1_architecture_v0_1.md`  
**Does not supersede:** the useful domain content in v0.1; that content is retained as provisional research material until re-derived through this roadmap.

---

## 1. Purpose

Phase 1 exists to produce the **minimum complete deterministic architecture** for a strong contractor procurement/commercial operating system, detailed enough that Phase 2 can decompose it into build instructions without requiring implementation agents to invent major architecture.

Phase 1 is not:
- a code phase,
- an AI implementation phase,
- a generic enterprise-software encyclopaedia,
- or a promise to reproduce every function of every incumbent.

The product architecture must remain commercially useful even if advanced AI never works.

---

## 2. Governing Principles

1. **Scope before depth.** V1 must be bounded before all modules are specified deeply.
2. **Reality before incumbents.** Real contractor workflows and artifacts precede competitor reconstruction.
3. **Incumbents are evidence, not ontology.**
4. **Ownership before modeling.** The system-of-record seam, accounting seam, tenancy, residency and external identity must be decided before the commercial core is frozen.
5. **Entities, money, states and authority are one interlocking model.** They are designed iteratively together.
6. **One commercial cost-event substrate.** Derived balances such as committed, pending, certified, retained, actual and forecast values must have one canonical derivation model. This is not automatically a full accounting general ledger.
7. **Evidence and provenance are architectural.**
8. **Every business action is bounded.** Business actions must exist as controlled service operations rather than arbitrary database writes.
9. **Reporting validates the data model before UI polish.**
10. **Red-team at expensive freeze points, not only at the end.**
11. **AI remains additive.** Only AI-readiness constraints that cannot be retrofitted are allowed to influence the deterministic core early.
12. **Commercial viability and technical architecture remain separate risks.** Phase 1 can reduce technical/product uncertainty but cannot prove trust, sales, implementation capacity or investor demand.

---

## 3. Scope Classification Vocabulary

Every candidate product area must be classified in P1.1 as exactly one:

- **SPINE** — fully specified for V1; product cannot operate coherently without it.
- **THIN** — V1 has a minimal deterministic implementation; depth is intentionally constrained.
- **INTERFACE-ONLY** — V1 defines the contract/integration boundary but does not own the full function.
- **OUT** — explicitly excluded from V1.

No section may remain “important later” without one of these labels.

---

# 4. Frozen Phase 1 Sequence

## P1.0 — Research Control System

### Objective
Create a queryable control system for evidence, terminology, assumptions, contradictions, decisions, requirements and architecture changes before research volume makes weak conclusions permanent.

### Inputs
- v0.1 architecture map
- hostile structure audit v1
- existing first-pass source library

### Required outputs
1. Source Register
2. Evidence Register
3. Terminology Dictionary
4. Assumption Register
5. Open Question Register
6. Contradiction Register
7. Architecture Decision Record (ADR) Log
8. Requirement Register
9. Architecture Change Log
10. ID and status conventions
11. Evidence-grade rules
12. Freeze/change-control rule

### Gate
- Every existing v0.1 §2 competitor claim and §3 cross-market conclusion is either:
  - traced to source/evidence, or
  - explicitly demoted to hypothesis.
- Any accepted architecture conclusion can answer “why do we believe this?” in no more than two register lookups.
- Registers are structured tables, not prose lists.
- No unresolved load-bearing assumption is hidden in narrative text.

### Dependencies
None.

---

## P1.1 — Thesis, Beachhead & Release Boundary

### Objective
Define who V1 serves and what V1 deliberately does not contain, so Phase 1 can terminate.

### Inputs
- P1.0 control system
- v0.1 product boundary
- differentiation hypotheses
- commercial/operational risk list
- current domain knowledge

### Required outputs
1. Named beachhead segment:
   - geography,
   - contractor size band,
   - project/trade profile,
   - likely current software/tool stack.
2. Every candidate content area classified SPINE / THIN / INTERFACE-ONLY / OUT.
3. Three falsifiable wedge hypotheses with kill criteria.
4. Numeric implementation-burden budget.
5. Explicit V1 exclusions.
6. Evidence needed to revisit each scope decision.

### Gate
- 100% of candidate areas classified.
- SPINE scope is small enough for finite Phase 1 specification and solo/AI-assisted Phase 3 construction.
- At least one attractive v0.1 feature is cut or deferred because of the burden budget.
- No “everything is core” outcome is permitted.

### Dependencies
P1.0.

---

## P1.2 — Primary Workflow Evidence

### Objective
Reconstruct how contractors actually procure and commercially administer work before allowing software incumbents to define the domain.

### Inputs
- P1.1 beachhead
- P1.0 terminology/evidence standards

### Required outputs
- 3–5 independent contractor workflow reconstructions from estimate handover through closeout.
- Real artifacts where obtainable:
  - procurement tracker,
  - RFQ pack,
  - quotation,
  - bid comparison,
  - DOA/approval matrix,
  - recommendation,
  - PO/subcontract,
  - payment certificate/application,
  - variation register,
  - long-lead tracker.
- Variant map.
- Workaround register.
- Role/artifact map for every step.
- Supplier-side friction evidence.

### Gate
- At least 3 independent contractor workflows.
- At least 1 within the beachhead geography.
- At least 1 outside the founder’s own prior trade/project pattern.
- At least 1 real bid-leveling artifact decomposed.
- Every workflow step has a named role and artifact.
- Contradictions are logged, not silently resolved.

### Dependencies
P1.0, P1.1.

---

## P1.3 — Competitor Reconstruction

### Objective
Reverse engineer incumbent object models, workflows, states, interfaces, UX patterns and operational weaknesses against real workflow evidence.

### Initial systems to study
- ProcurePro
- Procore
- Autodesk Construction Cloud / BuildingConnected
- Oracle Aconex
- Oracle Primavera Unifier / Textura where relevant
- CMiC
- Trimble Viewpoint / Vista
- SAP Ariba / Coupa for mature procurement controls
- selected newer construction-procurement entrants

### Required outputs
- controlled competitor matrix
- source/evidence ID attached to every substantive cell
- object-model reconstruction
- state/workflow reconstruction where public evidence allows
- permissions/approval patterns
- financial-boundary patterns
- vendor UX
- internal UX
- integration/API patterns
- implementation/pricing observations
- complaint register separate from architecture evidence
- updated cross-market conclusions

### Gate
- No silently blank matrix cells; unknown = explicitly “not determinable”.
- At least 2 competitors reconstructed to state-machine level.
- Every v0.1 cross-market conclusion re-derived from graded evidence or withdrawn.
- Competitor terminology mapped to canonical terminology.

### Dependencies
P1.2.

---

## P1.4 — Boundary, Ownership & Tenancy Contract

### Objective
Decide what the platform owns, mirrors, references or excludes before designing the commercial core.

### Required outputs
1. Per-entity ownership table:
   `OWN / MIRROR / REFERENCE / OUT`
2. Authoritative system for every candidate entity.
3. Accounting seam:
   - who certifies,
   - who posts,
   - who owns retention,
   - who owns payment state,
   - what crosses to GL/AP/job cost,
   - reconciliation/conflict authority.
4. Tenancy architecture.
5. legal-entity / branch / business-unit / JV hierarchy.
6. data-residency ADR.
7. internal identity model.
8. external vendor/subcontractor identity/access model.
9. early integration boundary decisions.

### Gate
- Every modeled entity has exactly one authoritative owner.
- No entity is left “shared”.
- Accounting seam is readable by a competent accountant without guessing.
- Tenancy/residency/identity ADRs accepted.
- Red-team gate passed before P1.5.

### Dependencies
P1.1–P1.3.

---

## P1.5 — Commercial Core

### Objective
Produce one internally consistent model of data, commercial value, lifecycle and authority.

### Four concurrent tracks

#### P1.5a — Entities & Master Data
- entity dictionary
- attributes/types
- cardinalities
- master vs transaction
- numbering
- immutability
- revision semantics
- ownership inherited from P1.4

#### P1.5b — Cost Ledger & Posting Semantics
- commercial financial-event types
- derivation formula for every commercial balance
- pending vs approved vs committed semantics
- certification
- actual/paid distinction
- retention
- forecasts
- reversal/adjustment
- financial periods
- cut-off/backdating
- multi-currency/FX
- tax timing
- external GL/AP posting seam

#### P1.5c — Lifecycles & State Machines
For every SPINE transaction:
- states
- transitions
- guards
- side effects
- emitted events
- reversibility
- supersession/cancellation

#### P1.5d — Authority / Approval / Audit / Concurrency
- role/permission model
- approval policies
- authority limits
- delegation
- ball-in-court
- audit-event catalogue
- simultaneous-edit/concurrency rules

### Binding AI-readiness constraints declared before modeling
1. Every commercially significant value must be capable of tracing to source evidence, revision and location.
2. Every business action must be exposed as a bounded service operation, never arbitrary data mutation.

### Gate
- Every derived balance has one canonical derivation over commercial financial events.
- Every SPINE transaction has a complete lifecycle.
- Every transition names guard, authority, financial effect, event and reversibility.
- Golden threads 1–4 execute on paper with zero architecture invention.
- Red-team gate passed.

### Dependencies
P1.4.

---

## P1.6 — Evidence, Document & Communication Model

### Objective
Define the durable provenance substrate for commercial records and later AI.

### Required outputs
- document identity
- versions/revisions
- supersession
- immutable issued versions
- hashing
- transmittals
- source-location references
- confidentiality
- retention
- message/thread model
- external communication capture rules
- email/portal/message-channel boundary

### Gate
- Every disputed commercial value can trace to a specific source version/location.
- Every externally communicated commercial commitment has a defined capture path.

### Dependencies
P1.5.

---

## P1.7 — Integration, Migration & API Contracts

### Objective
Specify deterministic seams after ownership and model are known.

### Required outputs

#### Integration
- connector model
- entity/field mapping
- sync direction
- authoritative side
- webhook/event behavior
- retry/dead-letter behavior
- conflict resolution
- reconciliation
- health/observability

#### Migration
- import contract
- legacy IDs
- deduplication
- validation
- preview
- rollback
- reconciliation
- audit trail

#### API
Three surfaces:
1. internal product API
2. external integration API
3. future agent/tool API

### Gate
- One reference connector fully specified end-to-end including failures/conflicts.
- One real or representative legacy dataset can be mapped without schema invention.
- Every SPINE entity/action has an API contract.
- Red-team gate passed.

### Dependencies
P1.4, P1.5, P1.6 where evidence links are needed.

---

## P1.8 — Reporting & Query Model

### Objective
Use reporting as a deliberate validator of the commercial core before UI design.

### Required outputs
- V1 report catalogue
- exact query/derivation for every report
- rollup semantics
- portfolio semantics
- saved-view/query contracts
- export/BI contract

### Gate
- Every V1 report is expressible without missing fields or ambiguous aggregation.
- Any missing field forces controlled amendment of P1.5 rather than UI workaround.

### Dependencies
P1.5.

---

## P1.9 — UI / Navigation / Interaction Architecture

### Objective
Assign every V1 deterministic action to an owning user surface and make complex workflows operationally usable.

### Required outputs
- global navigation
- project workspace navigation
- screen inventory
- interaction ownership
- table/grid conventions
- record detail/flyout conventions
- comparison-grid design
- approval/action center
- vendor external experience
- responsive/mobile boundary
- wireframe-level flows for SPINE objects

### Gate
- Every P1.5 state transition has an owning UI action where human interaction is required.
- Zero orphan actions.
- Zero phantom controls.
- 100% SPINE navigation coverage.

### Dependencies
P1.5, P1.8.

---

## P1.10 — Nonfunctional & AI-Readiness Residual

### Objective
Specify measurable operating constraints and only the future-AI structures that are safely additive.

### Deterministic outputs
- performance targets
- scale assumptions
- availability target
- backup/DR
- observability
- data export/lifecycle
- rate limits
- attachment constraints
- security controls
- reliability/error-recovery expectations

### AI-readiness outputs
- AI proposal object
- confidence/abstention representation
- human-review state
- agent authority ladder
- provenance metadata
- correction/evaluation-data retention
- safe agent action catalogue derived from deterministic service actions

### Gate
- Every nonfunctional requirement has a number or measurable test.
- No residual AI structure requires redesign of a deterministic entity.
- No AI capability is assumed to work.

### Dependencies
P1.5–P1.9.

---

## P1.11 — Golden-Thread Validation, Red Team & Master Specification

### Objective
Prove that the architecture can be implemented without architectural invention, then assemble the final Phase 1 specification.

### Required golden threads
Final set is created from P1.2 evidence. At minimum it must test:
1. standard subcontract package
2. imported long-lead equipment
3. progress claim/certification
4. variation chain
5. rejected award and re-tender
6. ordinary material requisition with no package
7. vendor compliance expiry blocking transaction
8. retention/bond release
9. mid-project migration
10. correction of a certified financial error from a closed period

### Test 1 — Golden-thread execution
For every step identify:
- entity
- state transition
- guard
- permission
- approval
- commercial ledger effect
- event
- screen
- API operation
- audit record
- evidence linkage

**Pass:** zero architecture invention.

### Test 2 — Artifact completeness
- every entity typed/related/owned
- every transaction state machine complete
- every derived value has one formula
- every action has UI/API ownership
- every report is queryable
- every integration seam has authority/conflict/failure rules
- every requirement traced backward to evidence and forward to spec
- every open question resolved or deferred outside SPINE with explicit blast radius

### Test 3 — Independent no-invention audit
A fresh engineer/model with no conversation history executes at least two golden threads.

**Architecture questions asked = gate failures.**

### Final gate
All three tests pass and every unresolved issue either:
- is resolved, or
- is formally deferred with demonstrated non-impact on V1 SPINE.

### Dependencies
All prior subphases.

---

# 5. Red-Team Gates

Mandatory adversarial review occurs at:

- **P1.4** — ownership/accounting/tenancy/identity
- **P1.5** — commercial core and ledger
- **P1.7** — integration/migration/API seams
- **P1.11** — final no-invention validation

A gate finding may reopen an earlier artifact only through architecture change control.

---

# 6. Frozen Hypotheses — Not Decisions

The following are explicitly **not frozen architecture** despite appearing in v0.1:

1. Procurement Package is the structural root of all procurement/commercial activity.
2. PO and Subcontract must be separate top-level entity types.
3. The product should own payment/invoice commercial controls.
4. Deep ERP/accounting integration is mandatory in V1.
5. Long-lead tracking requires an independent `TrackedItem`.
6. A fully general workflow engine belongs in V1.
7. All configuration dimensions listed in v0.1 belong in V1.
8. GCC commercial requirements can be deferred to a localization pass.
9. The v0.1 product graph is canonical.

These move into the P1.0 Assumption Register and are resolved by evidence.

---

# 7. Roadmap Change Control

This roadmap is frozen.

A change to:
- subphase ordering,
- objective,
- required outputs,
- dependencies,
- gate,
- or governing principle

requires a `ROADMAP_CHANGE` record containing:
1. proposed change,
2. trigger/evidence,
3. affected subphases,
4. downstream impact,
5. alternatives,
6. acceptance/rejection decision,
7. new roadmap version.

Minor wording corrections do not require a version increment.

No silent roadmap drift is permitted.

---

# 8. Phase Status

| Subphase | Status |
|---|---|
| P1.0 Research Control System | **ACTIVE** |
| P1.1 Thesis / Beachhead / Release Boundary | LOCKED — waiting on P1.0 |
| P1.2 Primary Workflow Evidence | LOCKED |
| P1.3 Competitor Reconstruction | LOCKED |
| P1.4 Boundary / Ownership / Tenancy | LOCKED |
| P1.5 Commercial Core | LOCKED |
| P1.6 Evidence / Document / Communication | LOCKED |
| P1.7 Integration / Migration / API | LOCKED |
| P1.8 Reporting / Query | LOCKED |
| P1.9 UI / Interaction | LOCKED |
| P1.10 Nonfunctional / AI Readiness | LOCKED |
| P1.11 Golden Thread / Red Team / Master Spec | LOCKED |

**Phase 1 Roadmap v1.0 is frozen. P1.0 is the only active subphase.**
