# Construction Procurement OS
# Phase 1 Roadmap v1.1 — FROZEN

**Version:** 1.1  
**Freeze date:** 2026-07-28  
**Status:** FROZEN GOVERNING ROADMAP  
**Supersedes:** Phase 1 Roadmap v1.0  
**Change basis:** `ROADMAP_CHANGE_CHG_0003.md`  
**Sequence:** unchanged from v1.0

## 1. Version rule

Roadmap v1.1 inherits **all objectives, required outputs, gates, dependencies, governing principles, scope vocabulary, hypotheses and golden threads from Roadmap v1.0 except where this document explicitly augments or replaces them**.

Roadmap v1.0 remains an immutable historical predecessor. This v1.1 file plus the unchanged v1.0 sections it incorporates by reference is the governing Phase 1 roadmap.

No feature or product area was cut by this revision. The revision strengthens architectural ceiling, decomposability and non-retrofittable correctness semantics.

## 2. Phase sequence — unchanged

1. P1.0 — Research Control System
2. P1.1 — Thesis, Beachhead & Release Boundary
3. P1.2 — Primary Workflow Evidence
4. P1.3 — Competitor Reconstruction
5. P1.4 — Boundary, Ownership & Tenancy Contract
6. P1.5 — Commercial Core
7. P1.6 — Evidence, Document & Communication Model
8. P1.7 — Integration, Migration & API Contracts
9. P1.8 — Reporting & Query Model
10. P1.9 — UI / Navigation / Interaction Architecture
11. P1.10 — Nonfunctional & AI-Readiness Residual
12. P1.11 — Golden-Thread Validation, Red Team & Master Specification

The v1.0 principle **Reality before incumbents** remains binding: P1.2 primary contractor workflows precede P1.3 competitor reconstruction.

---

## 3. P1.4 augmentation — Boundary, Ownership & Tenancy

All v1.0 P1.4 outputs remain required.

### Additional required output: authority granularity and staleness contract

The ownership model must define authority at the smallest granularity required to avoid false shared truth.

For integrated records specify where applicable:

- entity/domain owner;
- field-level authoritative side when one record contains fields owned by different systems;
- sync direction per authoritative field/domain;
- conflict rule;
- last-authoritative-update / synchronization timestamp or equivalent staleness metadata;
- read-path behavior when a user is about to approve or act on externally authoritative data that may be stale.

`ADR-0021` is mandatory before this output freezes.

### Additional P1.4 gate condition

**PASS only if:** no commercially significant integrated field is left ambiguously shared, and any externally authoritative value used in a decision has defined staleness semantics.

---

## 4. P1.5 augmentation — Commercial Core

All four concurrent v1.0 tracks remain mandatory:

- P1.5a Entities & Master Data
- P1.5b Cost Ledger & Posting Semantics
- P1.5c Lifecycles & State Machines
- P1.5d Authority / Approval / Audit / Concurrency

The following decisions are now explicit P1.5 obligations.

### 4.1 Workflow → domain/financial-state seam — ADR-0018

A configurable workflow may determine routing, reviewers, conditions and approval outcomes, but it may not bypass deterministic domain invariants.

P1.5 must specify:

- what a workflow is allowed to emit;
- whether approval outcome is an event/result consumed by a domain service;
- which service owns the financially significant transition;
- guards evaluated by that service;
- idempotency/concurrency behavior when approval and posting/finalization interact.

No tenant-configured workflow may create an unguarded path into financial truth.

### 4.2 Effective dating / historical interpretation — ADR-0019

P1.5 must define historical semantics for load-bearing rules whose meaning changes over time, including where applicable:

- approval authority and delegation;
- FX/rate applicability;
- cost-code structures;
- organizational/legal-entity structures;
- other configuration referenced by legally or commercially significant history.

The chosen model may use snapshots, version references, effective-dated records, bitemporal semantics or another explicit approach, but historical transactions and approvals must remain reproducible under the rules that governed them.

### 4.3 Configuration binding for in-flight instances — ADR-0020

When configuration changes while a transaction/workflow is active, P1.5 must define one coherent policy:

- live resolution;
- snapshot at instantiation;
- explicit version binding;
- controlled migration to a newer configuration;
- or a deliberately mixed rule by configuration class.

Different subsystems may not silently use incompatible binding semantics.

### 4.4 Monetary representation and rounding — ADR-0022

P1.5b must define at minimum:

- decimal monetary representation;
- currency and scale carried with commercial events;
- rounding mode;
- stage at which rounding occurs;
- order of operations for compound calculations such as progress value, retention, advance recoupment, contra charges, tax and net certification;
- treatment of rounding differences and reversals.

Two modules must not derive different legally significant values from the same canonical commercial events.

### 4.5 Numbering under concurrency/retry/fiscal rules — ADR-0023

P1.5a/P1.5d must define:

- numbering scope: tenant/legal entity/project/document type/fiscal period as applicable;
- whether gaps are allowed and under which rules;
- allocation timing;
- retry/idempotency behavior;
- rollback/cancellation behavior;
- separation between immutable internal identifiers and human/legal display numbers where useful.

No numbering requirement may silently undermine transaction idempotency or concurrency correctness.

---

## 5. P1.5 Ceiling Test — NEW MANDATORY GATE

Purpose: prove the architecture has the intended multi-country/high-complexity ceiling rather than merely claiming it.

At minimum execute these structural scenarios on paper:

1. **Multi-entity/JV:** procurement involving more than one legal entity or a JV structure without collapsing financial ownership.
2. **Cross-country vendor relationship:** one vendor/business identity participates through multiple legal/tax registrations and project relationships.
3. **Multi-currency commercial chain:** commitment currency differs from budget/reporting currency while rates, retention and later adjustments remain reproducible.
4. **Authority change in flight:** approval authority/configuration changes while multiple transactions are mid-process, and historical validity remains explainable.
5. **Different legal-entity fiscal semantics:** commercial records across entities with different period/calendar constraints remain coherent.
6. **Contextual vendor status:** a vendor may be preferred/eligible in one business unit/project context and restricted in another without duplicating the underlying identity incorrectly.

### Ceiling Test PASS

All scenarios must fit through the **same core entity/event/authority abstractions** with explicit configuration/policy differences where needed.

A scenario fails if it requires:

- a second incompatible ledger model;
- a single-country/single-entity shortcut that corrupts history;
- duplicate truth objects for the same commercial fact;
- or a fundamental ontology rewrite.

Failure reopens the affected P1.4/P1.5 artifact through normal change control.

---

## 6. P1.5 Closed Sub-graph Gate — NEW MANDATORY GATE

Purpose: prove that a focused first build is possible **without shrinking the architectural ceiling**.

The V1 SPINE/THIN slice selected in P1.1 must form a closed executable sub-graph of the Phase 1 architecture.

For every V1 entity/action:

1. its lifecycle can reach valid terminal/steady states without requiring an unbuilt product area;
2. every dependency either exists inside the V1 slice or has a deliberately specified interface/stub contract;
3. derived balances depend only on event types/contracts available to the slice;
4. adding future entity/event types is additive and does not require rewriting historical records or changing the meaning of existing event types;
5. deferred human workbenches do not remove the deterministic store, invariant, provenance or action contract required by future implementations/AI.

### Closed Sub-graph PASS

A competent builder can implement the selected V1 slice without inventing behavior for omitted modules and without implementing the entire future platform first.

If the dependency chain does not bottom out inside the slice or an explicit interface, the slice or underlying model must be revised before P1.5 freezes.

---

## 7. P1.11 retention — closed-period correction remains mandatory

Roadmap v1.0 already requires the golden thread:

**correction of a certified financial error from a closed period**.

This remains mandatory and must now exercise the v1.1 posting/reversal, temporal, authority, integration and evidence semantics.

The original issued/certified artifact must remain historically interpretable; correction must not rewrite history invisibly.

---

## 8. Unchanged high-ceiling substrates

This revision does not demote the following architecture foundations:

- canonical commercial cost-event model;
- ownership/tenancy/legal-entity/JV model;
- evidence provenance;
- bounded business actions;
- lifecycle/state guards;
- authority/audit/concurrency;
- integration/migration/API contracts;
- reporting semantic model;
- future AI/tool action surface.

P1.1 may classify user-facing breadth as SPINE / THIN / INTERFACE-ONLY / OUT, but it may not silently remove a substrate that a retained SPINE capability requires.

## 9. Change control

This roadmap is frozen.

Any future change to phase order, objectives, required outputs, dependencies, gates or governing principles requires a new `CHG-*` roadmap-change record and version increment.

No silent roadmap drift is permitted.

## 10. Current phase status

- P1.0 Research Control System — ACTIVE
- P1.1 through P1.11 — LOCKED until their dependencies/gates are satisfied
- Product code — NOT STARTED
- Phase 2 build decomposition — LOCKED
- Phase 3 construction — LOCKED

**Phase 1 Roadmap v1.1 is now the governing roadmap.**
