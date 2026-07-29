# P1.2 — Revision Risk + Batched Hostile-Review Strategy v0.1

**Status:** ACTIVE CONTROL / PROVISIONAL MODEL NOT FROZEN  
**Purpose:** define how far P1.2 may continue while the final sourcing critique is pending, quantify likely revision cost, and avoid wasting reviewer usage on process-by-process critique.

## 1. Current posture

The current P01–P12 operational model is:
- complete-enough for provisional secondary-reference coverage;
- internally integrated;
- not frozen;
- not product code;
- not P1.2 PASS;
- still subject to primary evidence and hostile critique.

The final Claude B5/B6 sourcing recheck is PENDING because reviewer usage is temporarily unavailable. No PASS is inferred.

Continuation is allowed because current work is architecture specification, not irreversible implementation.

## 2. Revision-cost principle

Revision cost is governed by **when** the correction arrives.

### Now — P1.2 provisional specification

Most corrections are cheap-to-moderate:
- edit candidate semantics;
- collapse/rename candidate objects;
- change state boundaries;
- adjust invariants;
- change which process owns a fact;
- update integrated lineage and audit tests.

No database migration, production data migration, API compatibility, UI rewrite, customer retraining or connector rewrite exists yet.

### P1.4/P1.5 structural freeze

Corrections become materially more expensive because they may alter:
- structural root;
- canonical commercial event model;
- persistence boundaries;
- authority/configuration model;
- integration contracts;
- state/event semantics;
- money/concurrency/effective-dating primitives.

### Phase 2/3 build

The same correction may require:
- schema/data migrations;
- API changes;
- service/domain rewrites;
- UI/workflow changes;
- tests/backfills;
- integration changes;
- customer configuration migration.

Therefore reviewer feedback has very high economic value **before structural freeze**, even when it causes document rework.

## 3. Revision blast-radius tiers

### R1 — LOW

Typical blast radius: one process artifact + integrated checkpoint.

Examples:
- status naming;
- optional/mandatory field default;
- object collapsed to event/value/projection without truth change;
- supplier UX detail;
- notification/task behavior;
- long-lead projection presentation;
- technical-approval interface detail;
- closeout tracking detail.

These should never block provisional continuation.

### R2 — MODERATE

Typical blast radius: 2–5 process artifacts + cross-process checkpoint.

Examples:
- qualification/eligibility/participant grain;
- tender release/version semantics;
- comparison snapshot composition;
- DOA/approval-case representation;
- award-to-commitment handoff;
- goods receipt vs invoice seam;
- accounting field authority/freshness;
- compliance gate timing.

Still inexpensive at P1.2 because no implementation exists.

### R3 — HIGH ARCHITECTURAL

Typical blast radius: many P01–P12 artifacts plus future P1.4/P1.5 decisions.

Examples:
- ADR-0003 structural root;
- ADR-0004 PO/Subcontract physical model;
- ADR-0005 commercial/accounting truth ownership;
- requirement-allocation authority;
- supplier commercial truth ownership;
- original/effective commitment baseline semantics;
- change/correction/reversal model;
- budget/commitment authority seam;
- effective dating/config binding;
- money/rounding/calculation order;
- numbering/concurrency/idempotency;
- tenancy/legal-entity ownership;
- provenance/audit irreversibility.

Even R3 is currently manageable because it is document/architecture rework, but these topics must be resolved before structural freeze or build.

## 4. Pending B5/B6 critique — expected risk

The pending sourcing recheck is narrow.

Prior review already accepted/closed:
- B1 commercial-basis ownership/provenance;
- B2 evaluated vs contractable basis;
- B3 single RequirementAllocation lineage mechanism;
- B4 FX/tax reproducibility;
- ADR-0003/0004 anchoring;
- P1.1 REOPEN = NO.

Only B5/B6 remain for final recheck:
- B5 scope/quantity conservation separated from value governance;
- B6 all sourcing routes enter allocation authority before tender.

If critique requests changes within those boundaries, expected blast radius is R1–R2, primarily:
- P01 allocation semantics;
- integrated sourcing checkpoint;
- P06 award variance context;
- P07 commitment binding assumptions;
- P10 early long-lead origin references.

A complete P01–P12 redesign would require a new structural finding beyond the stated final recheck scope.

## 5. Continuation guardrails while critique is pending

Current P1.2 work may continue only if:
1. new work treats sourcing mechanics as provisional dependencies;
2. no sourcing-dependent ADR is closed because downstream work exists;
3. no P1.2 freeze occurs;
4. no product-code/schema commitment occurs;
5. downstream artifacts identify assumptions inherited from pending sourcing critique where load-bearing;
6. later critique failure propagates backward/forward honestly rather than being resisted due to sunk documentation.

This makes continuation cheaper than idle waiting while preserving reversibility.

## 6. Claude review batching strategy

Do **not** return to one-review-per-process.

When reviewer usage returns, use three review units.

### Review A — final sourcing delta

Scope only:
- B5;
- B6;
- defects directly introduced by their remediation.

Goal:
`PASS — sourcing subgraph coherent; proceed to downstream external review`

This remains first because RequirementAllocation and award handoff are dependencies of P07.

### Review B — commercial core + accounting seam

Batch together:
- P07A commitment formation/baseline;
- P07B controlled change;
- P07C goods receipt/invoice-match seam;
- P07D subcontract valuation/retention/advance;
- P08 commercial position/accounting authority/reconciliation.

Primary attack axes:
- duplicate ledger risk;
- original/current/pending/effective value semantics;
- PO/Subcontract false unification;
- earned value vs payable vs accounting posting;
- reversal/correction/finalization;
- field/event authority and ERP coexistence;
- money/rounding/effective dating/concurrency;
- whether P07 has become more than one XL gravity well.

### Review C — bounded overlays + whole graph

Batch together:
- P09 deterministic control plane;
- P10 long-lead/procurement schedule;
- P11 closeout/security/warranty;
- P12 external technical approval interface;
- complete P01–P12 integrated checkpoint.

Primary attack axes:
- BPM/workflow-engine creep;
- schedule/Primavera creep;
- CDE/submittal creep;
- legal/banking closeout creep;
- authority/evidence duplication;
- object inflation;
- missing real construction workflow;
- first-live-tender burden;
- retrofit-impossible omissions.

### Optional final integration review

After A/B/C pass/remediate, run one short golden-thread integration review rather than another full artifact review.

Threads should include:
- ordinary material demand → tender → PO → partial receipt → invoice seam;
- planned long-lead item before MR → tender → award → technical approval → delivery;
- subcontract → award → baseline → variation → progress certification → retention/advance → final closeout;
- non-lowest/split award;
- retender;
- closed-period correction/reversal;
- accounting authority conflict/reconciliation.

## 7. Reviewer-efficiency rule

Every future Claude packet should be self-contained and delta-oriented:
- current binding model only;
- truth-ownership table;
- critical states/events/invariants;
- unresolved ADRs;
- exact prior blocker remediation;
- small number of hostile-review questions;
- no historical artifact dump unless needed.

Reviewer should critique mechanics, not spend usage reconstructing repository history.

## 8. Current decision

**CONTINUE P1.2 CONSOLIDATION WHILE FINAL SOURCING RECHECK IS PENDING.**

This is economically rational because revision cost is currently low relative to later phases.

However:
- pending critique remains real;
- P01–P12 remain provisional;
- P1.2 cannot formally close;
- P1.4/P1.5 structural freeze cannot rely on unresolved hostile findings;
- product build remains locked.
