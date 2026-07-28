# P1.1 Scope Amendment v0.3

**Status:** PROVISIONAL / NOT FROZEN  
**Base matrix:** `P1_1_SCOPE_MATRIX_V0_2.csv`  
**Purpose:** Apply Critique-01 recheck corrections without changing unrelated scope rows.

## 1. Retention / advance / recoupment positions — SPINE

Add:

`FIN-12 — Retention / advance / recoupment position substrate — SPINE`

The retained commercial balance must be able to represent, from first relevant commercial history:
- retention held/accrued/released position;
- advance granted/outstanding position where applicable;
- advance recoupment position;
- the events/allocations that change those positions;
- provenance and monetary policy applied to them.

This does **not** make full claim/certification workflow SPINE. `FIN-09` remains THIN.

`FIN-10` is interpreted as the broader bonds/guarantees/insurance lifecycle and related term/evidence automation; it remains THIN. Retention **position truth** is no longer hidden inside that THIN row.

## 2. Canonical bid-line structure — SPINE

Add:

`PRC-15 — Canonical bid-line / comparison input structure — SPINE`

Comparison requires a stable internal representation for comparable bid lines, quantities/units where applicable, commercial fields and supplier revisions.

`PRC-07 Requested pricing breakdown / bid form` remains THIN because **form configurability and supplier-entry layout** can be constrained. Attachments/freeform bids may still be human-normalized into the SPINE comparison structure.

The graph therefore does not rely on configurable supplier forms to obtain comparable lines.

## 3. Award justification survives recommendation demotion

`PRC-11 Recommendation` remains THIN.

`PRC-14 Award decision and handoff` SPINE must include an immutable **award-justification record** sufficient to state:
- selected counterparty/bid revision;
- comparison/evidence basis;
- approving authority/result;
- stated exception/override rationale where applicable;
- source/version/time provenance.

A distinct Recommendation object is optional; governed award justification is not.

## 4. External tender decline / no-bid state

`EXT-01 Minimum secure tender-response surface` SPINE is amended to include:

`invite/access → acknowledge → {respond | decline/no-bid} → submit/revise → clarify`

Decline/no-bid is a first-class tender-response outcome so bid coverage, evidence and later vendor-performance signals do not confuse deliberate decline with silence or null bid.

## 5. Resulting provisional count

Base v0.2: 82 areas = 30 SPINE / 28 THIN / 9 INTERFACE-ONLY / 15 OUT.

After adding FIN-12 and PRC-15:

**84 areas = 32 SPINE / 28 THIN / 9 INTERFACE-ONLY / 15 OUT.**

No THIN/OUT row was promoted by the retrofit audit because none was rated `IMPOSSIBLE`; the two added SPINE rows extract irreversible/core structures that were previously implicit inside broader rows.
