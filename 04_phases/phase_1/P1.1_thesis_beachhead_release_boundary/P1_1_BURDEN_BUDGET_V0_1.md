# P1.1-D — Implementation Burden Budget v0.1

**Status:** PROVISIONAL / NOT FROZEN  
**Purpose:** Prevent uncontrolled ERP sprawl while allowing a high-ceiling deterministic architecture.

This is a relative complexity budget, **not a calendar or developer-hour estimate**.

## Scoring model

Each workstream is scored 0–5 on seven burden dimensions.

| Dimension | Weight | Why weighted |
|---|---:|---|
| entity/state complexity | 1.5 | state/cardinality errors propagate across the product |
| financial-truth complexity | 2.0 | monetary mistakes are high-risk and expensive to retrofit |
| external-party complexity | 1.2 | supplier participation adds identity/security/support variance |
| integration dependency | 1.5 | external authority/failure/reconciliation can dominate implementation |
| migration burden | 1.0 | needed for adoption but can often be staged |
| configuration/testing burden | 1.3 | configurability multiplies test/state combinations |
| operational/support burden | 1.0 | recurring implementation/support cost matters after build |

Weighted score = sum of `(dimension score × weight)`.
Maximum theoretical score per workstream = 47.5.

## Budget rules

- **Total V1 implementation envelope:** ≤ **240 burden units**.
- **Target:** ≤ **230 units**, leaving reserve for P1.2/P1.4 discoveries.
- Any single workstream >40 requires explicit sub-slicing before P1.1 freeze.
- Any proposed scope addition that pushes total >240 requires demoting another area or an explicit P1.1 change decision showing why the addition is structurally mandatory.
- OUT areas consume zero V1 build burden but must preserve required interface/ontology seams where stated in the scope matrix.
- The budget may not demote accepted irreversible substrates merely to hit the number.

## Current planned burden

| Workstream | State | Financial | External | Integration | Migration | Config/Test | Ops | Weighted |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Foundation / security / masters | 5 | 2 | 3 | 2 | 3 | 4 | 3 | 29.3 |
| Procurement planning / requisition | 4 | 2 | 1 | 2 | 2 | 3 | 2 | 22.1 |
| Sourcing / vendor participation | 5 | 1 | 5 | 2 | 2 | 4 | 4 | 29.7 |
| Comparison / recommendation / approval | 5 | 2 | 2 | 1 | 1 | 4 | 3 | 24.6 |
| Commitments / changes / commercial truth | 5 | 5 | 2 | 4 | 3 | 4 | 4 | **38.1** |
| Evidence / documents / audit | 4 | 2 | 3 | 2 | 3 | 3 | 4 | 27.5 |
| Integration / migration / reporting | 3 | 3 | 1 | 5 | 5 | 3 | 4 | **32.1** |
| Thin downstream commercial / logistics | 3 | 4 | 2 | 2 | 2 | 3 | 3 | 26.8 |
| **Total** |  |  |  |  |  |  |  | **230.2** |

**Reserve to hard cap:** 9.8 units.

## What the budget is deliberately excluding

The current 230.2 envelope is only credible because several attractive capabilities are not allowed to accumulate in V1:

- full AP/GL/payment execution;
- full CDE/drawing/BIM/RFI/submittal platform;
- broad no-code schema and general-purpose workflow engine;
- deep named ERP connectors before beachhead stack is proven;
- inventory/warehouse system;
- native mobile + offline synchronization;
- persistent broad supplier portal / marketplace;
- deterministic-stage AI extraction/copilot/autonomous actions.

These are not rejected from the long-term platform. They are excluded because each introduces a separate architecture/testing/implementation gravity well that is not necessary to prove the first procurement/commercial attack surface.

## High-burden workstream treatment

### Commitments / changes / commercial truth — 38.1
Keep. This workstream protects WEDGE-02 and prevents V1 becoming a tender tracker with no commercial truth. Scope is constrained by leaving AP/GL/payment execution outside and progress claims/retention depth THIN.

### Integration / migration / reporting — 32.1
Keep the framework and seams, not many bespoke connectors. P1.7 will specify one reference connector; P1.1 does not commit V1 to implementing every accounting stack.

## Re-budget triggers

Recalculate before P1.1 freeze if:
- primary evidence makes progress claims/certification a required SPINE;
- a deep named ERP connector becomes mandatory for the selected beachhead;
- mobile/offline becomes adoption-critical;
- supplier participation requires a persistent portal rather than task links;
- budget ownership moves from interface/reference to product-owned;
- long-lead/logistics becomes a primary wedge;
- any OUT area becomes a dependency of a retained SPINE workflow.

A re-budget does not automatically cause scope reduction; it forces an explicit tradeoff or justification.