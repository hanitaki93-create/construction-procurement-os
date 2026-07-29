# P1.2 Sourcing Final Narrow Recheck Prompt v0.2

The previous narrow review concluded:
- B5 CLOSED;
- B6 OPEN;
- BL-01: downward basis revision below consumed allocation;
- BL-02: duplicate PLANNED_REQUIREMENTs over the same physical scope;
- active-leaf and controlled-UOM confirmations requested as non-blocking;
- ADR-0003/P1.1 remained consistent.

The current binding correction is in:
- `P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_3.md`
- `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_4.md`

Review only the delta below.

## BL-01 correction

A later DemandLine does **not** automatically overwrite an earlier effective planned basis.

Authorized requirement basis changes are versioned.

For a proposed reduction:
- if releasable scope exists, release/resize/split it first;
- if award exposure exists, revise/cancel/supersede the award first;
- if effective commitment exposure exists, reduce/cancel/negatively change that contractual exposure first;
- only after active/downstream exposure fits may the reduced basis version become effective.

Until then:
- the prior basis remains effective;
- the later DemandLine is reconciliation/variance evidence;
- there is no ordinary authoritative state where active committed leaves silently exceed their effective basis;
- P07 may create/bind new commitment only against active leaves backed by the current effective basis.

This intentionally differs from a `stranded unbacked leaf` cure: the model prevents an inconsistent lower basis from becoming effective before exposure is resolved.

## BL-02 correction

`ESTIMATE_LINE`, `PROCUREMENT_PLAN_LINE`, and `LONG_LEAD_PLAN_ITEM` are source evidence types, not automatic independent requirement roots.

Multiple such records may support one canonical PLANNED_REQUIREMENT.

Every active authorized basis declares its physical/business scope coverage.

For exclusive scope:

`one declared scope coverage → one active authorized basis owner`

unless shared/joint responsibility is explicitly authorized.

Before creating/activating an overlapping PlannedRequirement or DemandLine basis, resolve overlap through:
- attach as evidence;
- reconcile to existing;
- split scope;
- supersede;
- explicit shared/joint responsibility.

Free-form scopes require controlled human scope-identity confirmation before allocation authority becomes active. AI may suggest overlaps but cannot silently merge/create authority.

## Authorized basis owner contract

Owner type is:
- DEMAND_LINE; or
- PLANNED_REQUIREMENT.

Both obey identical version, scope-conservation, change-control and provenance rules.

This is a semantic contract only and does not close ADR-0003 physical/root architecture.

## Active leaf confirmation

An active leaf currently consumes/reserves part of the effective authorized scope.

Tender failure, re-tender, bidder withdrawal or supplier replacement do not automatically release it.

Release from counting requires explicit history-preserving split/release/cancel/fulfilled/closed or effective downstream reduction semantics.

Award and commitment bind existing leaves and do not add scope consumption.

## UOM confirmation

Each quantitative basis version has one authoritative conservation UOM.

Cross-UOM allocation is permitted only with a deterministic governed conversion preserving factor, source, version/effective date, precision, rounding and provenance.

Without a governed conversion, cross-UOM allocation is blocked.

## ADR / budget recording

ADR-0003 remains open but now records two possible authorized-basis owner types under one change-control contract.

P06 budget/estimate context must preserve source/snapshot/freshness. Later ADR-0005/0011 authority resolution cannot rewrite what approvers saw historically.

## Return only

### BLOCKERS
Only BL-01/BL-02 defects still present, active-leaf/UOM defects, or direct defects introduced by this remediation.

### BL-01 VERDICT
Choose exactly one:
- `CLOSED — downward reconciliation cannot create unbacked active exposure`
- `OPEN — exact remaining defect`

### BL-02 VERDICT
Choose exactly one:
- `CLOSED — scope-level uniqueness prevents parallel allocation authority over exclusive scope`
- `OPEN — exact remaining defect`

### ADR-0003 / P1.1 CONSISTENCY
State whether the semantic two-owner contract creates any structural-root or frozen-boundary problem.

### VERDICT
Choose exactly one:
- `PASS — sourcing subgraph coherent; proceed to downstream external Review B`
- `FAIL — sourcing blocker(s) remain`

Do not reopen B1–B5, ADR-0004 or P1.1 unless this v0.3/v0.4 remediation directly contradicts them.
