# P1.1-F — Integrated Structural Envelope & Release Boundary Draft v0.3

**Status:** COMPLETE CORRECTED DRAFT / NOT FROZEN / HOSTILE RECHECK REQUIRED  
**Supersedes:** v0.2 for current P1.1 reasoning.  
**Inheritance:** all v0.2 structural-envelope, ADR-boundary, workflow, inventory, accounting, interface and closed-graph corrections remain binding except as strengthened below.

## 1. Retrofittability is now protective, not only reductive

Binding rule:

> Any `IMPOSSIBLE`-to-retrofit area must be `SPINE` or `INTERFACE-ONLY`; it may never be `THIN` or `OUT` regardless of implementation cost.

All 28 THIN and 15 OUT areas were rescored in `P1_1_RETROFIT_AUDIT_V0_3.csv`.

Result: **0 IMPOSSIBLE findings** among THIN/OUT after separating irreversible/core structures into retained substrate.

## 2. Scope amendments

The v0.2 matrix remains the base plus `P1_1_SCOPE_AMENDMENT_V0_3.md`.

Added SPINE:
- `FIN-12` retention / advance / recoupment position substrate;
- `PRC-15` canonical bid-line / comparison input structure.

Clarified:
- full claim/certification workflow remains THIN;
- bond/guarantee/insurance lifecycle remains THIN;
- configurable bid-form/layout remains THIN;
- award justification is mandatory SPINE content of the governed award record even though a distinct Recommendation object remains THIN;
- external tender response includes first-class `decline/no-bid`.

Provisional total:

**84 areas = 32 SPINE / 28 THIN / 9 INTERFACE-ONLY / 15 OUT.**

## 3. Structural WEDGE-01

WEDGE-01 is now explicitly the closed procurement-control graph:

`budget/cost context → demand {MR | package} → vendor eligibility → tender → bid/revision → comparison → governed award → commitment → change → valuation/progress → current commercial position`

The falsifiable claim is that this graph can explain the in-scope transaction/current commercial position without a separate parallel ledger containing unique authoritative truth.

WEDGE-02 continues to test commercial-truth coherence and the accounting ownership seam. WEDGE-03 continues to test bounded external participation without a portal gravity well.

Canonical: `P1_1_WEDGE_HYPOTHESES_V0_3.md`.

## 4. Commercial position completeness

The retained SPINE commercial position now explicitly includes:
- commitment value;
- controlled change position;
- valuation/progress position;
- retention held/accrued/released position;
- advance outstanding position where applicable;
- advance recoupment position;
- monetary/provenance semantics for changes to those positions.

This does not imply V1 payment execution or full certification workflow ownership.

## 5. Burden budget v0.3

The two-axis model remains:
- implementation cost `S/M/L/XL`;
- retrofittability `CHEAP/EXPENSIVE/IMPOSSIBLE`.

Strengthened guardrails:
1. `IMPOSSIBLE` → SPINE or INTERFACE-ONLY; never THIN/OUT.
2. max 1 independent XL SPINE gravity well unless a newly discovered IMPOSSIBLE invariant forces reopening rather than demotion.
3. XL + CHEAP cannot be SPINE.
4. first live tender ≤5 working days from clean inputs under standard configuration.
5. bespoke named connector dependency before first tender = 0.

Current one XL SPINE gravity well remains commitment/change/valuation/commercial truth.

## 6. Gate

P1.1 remains **NOT FROZEN**.

P1.2 remains **LOCKED** until hostile recheck accepts these v0.3 corrections.
