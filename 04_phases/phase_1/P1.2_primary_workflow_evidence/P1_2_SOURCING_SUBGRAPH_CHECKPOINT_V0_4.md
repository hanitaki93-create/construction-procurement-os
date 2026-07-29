# P1.2 — Sourcing Subgraph Checkpoint v0.4

**Status:** B1–B5 CLOSED / B6 REMEDIATED AGAIN / FINAL NARROW HOSTILE RE-REVIEW REQUIRED / NOT FROZEN  
**Supersedes:** `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_3.md` for current sourcing integration.  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER.

## 1. Review history

Initial hostile review found B1–B4 plus ADR-0003 package-root anchoring.

First remediation/re-review:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 RequirementAllocation lineage ACCEPTED;
- ADR-0003/0004 anchoring CLEAN;
- B5/B6 raised.

Second re-review:
- B5 CLOSED;
- B6 remained OPEN because the v0.2/v0.3 model did not define downward basis reconciliation or duplicate planned-scope prevention;
- BL-01 and BL-02 raised;
- active-leaf and controlled-UOM confirmations requested as non-blocking.

Current checkpoint incorporates those corrections.

## 2. Authorized requirement basis contract

Every sourcing route begins from an effective authorized requirement basis whose owner type is one of:

1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

Both expose the same semantic contract:
- basis identity/version;
- project/legal entity;
- declared scope coverage;
- quantity/UOM where quantitative;
- scope partitions where non-quantitative;
- authorizing evidence;
- effective date/time;
- change/reconciliation lineage.

This contract is semantic only at P1.2; it does not select a final physical root/object hierarchy.

## 3. Planning evidence versus planned requirement

The following are source evidence types:
- `ESTIMATE_LINE`;
- `PROCUREMENT_PLAN_LINE`;
- `LONG_LEAD_PLAN_ITEM`.

They do **not** automatically create separate planned requirements.

Multiple evidence records may support one canonical `PLANNED_REQUIREMENT` for the same declared procurement scope.

## 4. Scope-level uniqueness

Every active authorized basis declares the physical/business scope it covers using the best available project breakdown, such as:
- project/legal entity;
- location/phase/zone;
- BOQ/WBS/cost-code/estimate identity;
- trade/package scope;
- material/use/location;
- section/lot/deliverable;
- explicit requirement-scope partitions.

For exclusive scope:

> the same declared scope coverage may not be owned by two active independent authorized requirement basis lineages at the same time.

Before a new planned requirement or overlapping demand basis becomes active, resolve overlap by one of:
- attach as evidence;
- reconcile to existing basis;
- split scope;
- supersede under governance;
- explicit shared/joint responsibility where double procurement is not implied.

Free-form scope without a deterministic natural key requires controlled human scope-identity confirmation before allocation becomes authoritative. AI may suggest overlap candidates but cannot merge/create authority silently.

## 5. Entry routes

### Demand-led direct
`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

### Demand-led packaged
`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### Planned before detailed MR
`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Every route therefore enters allocation authority before market commitment.

`ProcurementPackage` remains optional.

## 6. RequirementAllocation authority

RequirementAllocation owns requirement-scope consumption only.

Basis types:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

### Quantity

`sum(active leaf allocated quantity in authoritative basis UOM) <= current effective authorized quantity`

No routine allocation-level override.

Expansion requires an effective authorized basis increase first.

### Non-quantified scope

Exclusive scope partitions cannot be consumed by multiple active leaves unless explicit shared/joint responsibility is part of the authorized scope model.

### Value

Estimated/target/planning value remains non-authoritative allocation context.

Award price variance routes through commercial/DOA/budget governance, not allocation conservation.

## 7. Active leaf semantics

An active leaf is a leaf that currently consumes/reserves part of the effective authorized requirement scope.

Tender failure, re-tender, bidder withdrawal, or supplier replacement do **not** automatically release the leaf.

A leaf stops counting only through explicit history-preserving actions such as:
- split into replacement child leaves;
- merge where allowed;
- release/cancel remaining requirement scope;
- governed basis reduction after downstream exposure is reconciled;
- fulfilled/closed disposition where no residual procurement capacity remains;
- effective downstream cancellation/reduction that returns capacity under policy.

Award and commitment bind existing leaves; they do not create additional consumption.

## 8. Controlled UOM

Each quantitative basis version has one authoritative conservation UOM.

Cross-UOM allocation is permitted only where a governed deterministic conversion exists.

Preserve:
- source UOM;
- target authoritative UOM;
- exact conversion factor/rational relationship;
- source/business definition;
- version/effective date;
- precision;
- rounding rule;
- provenance.

The canonical converted quantity consumes the basis.

Without a governed deterministic conversion, cross-UOM allocation is blocked.

## 9. Later DemandLine reconciliation after early procurement

A later detailed DemandLine is reconciliation evidence; it does not automatically overwrite the earlier effective planning basis.

### Match
Link/corroborate. No scope change.

### Expansion
Approve a higher basis version first, then allocate increment.

### Reduction where scope is releasable
Release/resize/split affected unbound scope first. Activate the lower basis only after active consumption fits.

### Reduction below award/commitment exposure
Do not activate the lower basis immediately.

Create a pending reconciliation/basis-reduction proposal recording:
- target basis;
- delta/excess scope;
- affected allocation leaves;
- award/commitment exposure;
- required governance/action.

The prior basis remains effective until exposure is resolved.

Resolution:
- sourcing only → release/rebind leaves;
- approved award but no effective commitment → cancel/supersede/revise governed award/allocation;
- effective commitment → effective contractual reduction/cancellation/negative change/termination under P07 before the lower requirement basis can become effective to that extent.

If exposure cannot be reduced, preserve the mismatch/variance. Do not falsify prior authorization or contractual history.

There is no ordinary authoritative state where active commitment leaves are silently unbacked by the effective basis.

## 10. P07 binding guard

A new/effective P07 commitment may bind only when:
- referenced allocation leaf is active;
- it is backed by the current effective basis version;
- binding remains within authorized scope/quantity;
- unresolved reduction/reconciliation does not make the proposed binding inconsistent with the target authorized scope.

An already-effective commitment remains legal/commercial history until governed downstream action changes it.

## 11. Sourcing commercial truth retained

Closed corrections remain binding:
- supplier economic changes become immutable BidSubmission revisions;
- buyer-on-behalf capture preserves source/provenance;
- evaluated basis ≠ contractable agreed basis;
- P07 consumes only approved contractable basis;
- comparison snapshot freezes FX/tax transformation basis;
- award ≠ commitment;
- one RequirementAllocation lineage; no stage-ledger duplication.

## 12. ADR posture

### ADR-0003
Still `PROPOSED / PENDING`.

Record:
- authorized basis owner can be DemandLine or PlannedRequirement;
- both obey identical basis/version/change-control contract;
- package remains optional;
- physical hierarchy/root/navigation remains undecided.

### ADR-0004
Untouched / pending.

### ADR-0005 / ADR-0011
P06 budget/estimate figure is contextual approval evidence only and must preserve source/snapshot/freshness.

Later commercial/accounting authority decisions cannot rewrite what approvers saw historically.

## 13. P1.1 impact

**P1.1 REOPEN: NO.**

No new business lifecycle is introduced. This only closes duplicate-scope and reconciliation holes in the existing demand/planning→allocation seam.

## 14. Current hard invariants

1. One effective authorized basis owner per exclusive declared scope coverage unless explicit shared/joint coverage exists.
2. Basis owner type is DemandLine or PlannedRequirement; both use identical change control.
3. RequirementAllocation consumes only current effective basis.
4. Quantity conservation is hard in authoritative UOM.
5. Scope-partition conservation is hard where quantity is not meaningful.
6. Basis expansion must become effective before added scope allocation.
7. Basis reduction cannot become effective below unresolved downstream exposure.
8. Later demand evidence cannot retroactively falsify earlier authorized planning history.
9. Planning evidence does not independently create allocation authority.
10. Tender failure/re-tender does not automatically release scope.
11. Award/commitment bind existing leaves, not new balances.
12. New P07 commitment binds only currently backed active leaves.
13. Value variance is commercial governance, not scope conservation.
14. Split/release/reconcile/basis-version transitions are atomic, history-preserving and idempotent.

## 15. Gate

Final sourcing external PASS is still required.

Next re-review scope:
- BL-01 downward reconciliation;
- BL-02 scope uniqueness;
- active leaf release semantics;
- UOM semantics;
- ADR-0003 recording consistency;
- only direct defects introduced by this correction.

Do not reopen B1–B5, ADR-0004 or P1.1 without a direct contradiction from v0.4.
