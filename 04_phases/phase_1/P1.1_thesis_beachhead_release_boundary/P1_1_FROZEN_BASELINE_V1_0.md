# P1.1 — Frozen Baseline v1.0

**Freeze date:** 2026-07-28  
**Status:** **FROZEN / P1.1 COMPLETE**  
**Gate:** `P1_1_FINAL_VERDICT.md` — PASS

## Canonical composition

This baseline freezes the following P1.1 artifacts together as one decision set:

| Artifact | Frozen role | Blob SHA at freeze |
|---|---|---|
| `P1_1_STRUCTURAL_ENVELOPE_V0_2.md` | structural/sampling envelope | `3984445d8f35d90516f17fe09e3e18b1c16fb99c` |
| `P1_1_WEDGE_HYPOTHESES_V0_3.md` | structural hypotheses for P1.2 falsification | `b15f272dc372523e03a75f3bbd8707fc75d3de4b` |
| `P1_1_SCOPE_MATRIX_V0_2.csv` | base 82-area classification | canonical base matrix |
| `P1_1_SCOPE_AMENDMENT_V0_3.md` | FIN-12 / PRC-15 and related binding clarifications | `4fd1c5f04d8194dd113b7bbe408f36c32ffbc29c` |
| `P1_1_RETROFIT_AUDIT_V0_3.csv` | 43-row THIN/OUT retrofit audit | `9874fdb2978b75d1cd3d10066c6aa24dba2f5f97` |
| `P1_1_BURDEN_BUDGET_V0_3.md` | cost × retrofittability guardrails | `f900b49638374dc6d139aad57510238fb6908d3e` |
| `P1_1_INTEGRATED_BOUNDARY_DRAFT_V0_3.md` | integrated boundary statement | `ba40174a85996dc357e9e2b4ff6644a6e2047970` |

The base scope matrix plus v0.3 amendment is the canonical 84-area classification until changed through controlled revision.

## Frozen scope

- **32 SPINE**
- **28 THIN**
- **9 INTERFACE-ONLY**
- **15 OUT**
- **84 total controlled areas**

No `IMPOSSIBLE`-to-retrofit area may exist in THIN or OUT.

## Frozen structural envelope

Initial P1.2 sampling/deployment boundary:

**UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.**

This is not a market-size, revenue-band, project-count or willingness-to-pay claim. Contracting posture is modelled rather than hardcoded to one tenant type.

## Frozen structural wedges

1. **Closed Procurement Control Graph** — test whether one deterministic graph can explain the in-scope procurement/current commercial position without a parallel ledger holding unique authoritative truth.
2. **Commercial Commitment Truth** — test whether award, cost attribution, commitment, change, valuation and retention/advance/recoupment positions can form coherent commercial truth while accounting ownership stays open.
3. **Task-Focused External Tender Participation** — test bounded secure supplier participation, including decline/no-bid, without requiring a broad persistent portal.

These are hypotheses to falsify in P1.2, not commercially validated claims.

## Frozen closed-graph target

`Tenant/Company → Legal Entity + Contracting Posture → Project → Budget/Cost Structure → Demand {MR | Package} → Vendor + Minimum Compliance State → Tender/RFQ → Invite/External Task Access → {Respond | Decline/No-Bid} → Quote/Revision → Canonical Bid-Line Structure → Comparison → Governed Award + Justification → Commitment → [Controlled Change] → Valuation/Progress Event → Retention/Advance/Recoupment Positions → Derived Commercial Balance → Evidence/Audit → Reconciliation/External Interface`

Authority/approval, provenance, bounded actions, audit and concurrency remain cross-cutting transition properties.

## Frozen burden rules

- implementation cost: `S / M / L / XL`;
- retrofittability: `CHEAP / EXPENSIVE / IMPOSSIBLE`;
- `IMPOSSIBLE` → SPINE or INTERFACE-ONLY only;
- maximum one independent XL SPINE gravity well unless a newly discovered IMPOSSIBLE invariant forces scope reopening;
- `XL + CHEAP` cannot be SPINE;
- standard configuration to first live tender target ≤5 working days from clean inputs;
- bespoke named connectors required before first live tender = 0.

Current single independent XL SPINE gravity well: **commitment/change/valuation/commercial truth**.

## Change-control rule

P1.2 is expected to contradict or refine P1.1 hypotheses. That does not make this freeze dogma.

When primary evidence changes a frozen boundary assumption:
1. preserve the raw primary evidence;
2. identify the affected P1.1 row/wedge/invariant;
3. record contradiction and evidence basis;
4. reopen through normal ADR/change control;
5. never silently mutate the frozen baseline.

## Forward-owned items

- supplier non-response/timeout semantics → P1.5 state-machine design, informed by P1.2 evidence;
- FIN-12 positions → P1.5 projection over the canonical commercial cost-event store, never a parallel balance store.

**P1.1 v1.0 is frozen. P1.2 is unlocked.**
