# P1.2 — Sourcing Subgraph Checkpoint v0.5

**Status:** REVIEW A PASS / EXTERNALLY CLEARED FOR DOWNSTREAM REVIEW B / NOT FROZEN  
**Supersedes:** `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_4.md` for current sourcing integration.  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER.

## 1. External Review A result

External hostile Review A returned:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

No blocking sourcing findings remain.

Closed through the review cycle:
- B1 supplier economic truth ownership/provenance;
- B2 evaluated vs contractable basis;
- B3 competing allocation ledgers;
- B4 FX/tax reproducibility;
- B5 hard scope conservation vs value governance;
- B6 all sourcing routes enter allocation authority;
- BL-01 downward basis reconciliation;
- BL-02 scope-level uniqueness;
- ADR-0003/0004 anchoring concern.

P1.1 remains closed/frozen; no reopening required.

## 2. Authorized requirement basis

Every sourcing route begins from an effective authorized requirement basis whose semantic owner type is:
1. `DEMAND_LINE`; or
2. `PLANNED_REQUIREMENT`.

Both expose the same change/conservation contract:
- owner identity/type;
- version;
- project/legal entity;
- declared scope coverage;
- authoritative quantity/UOM and/or scope partitions;
- authorizing evidence;
- effective time;
- prior/superseded version;
- change/reconciliation lineage.

This is a semantic role. ADR-0003 still decides later whether the physical implementation keeps two types, collapses them, or uses another structure.

## 3. Planning evidence vs authority

`ESTIMATE_LINE`, `PROCUREMENT_PLAN_LINE`, and `LONG_LEAD_PLAN_ITEM` are source-evidence types.

They do not independently create allocation authority.

Multiple records may support one canonical `PLANNED_REQUIREMENT` for the same declared procurement scope.

## 4. Scope-level uniqueness

Default rule for exclusive scope:

> one declared physical/business scope coverage may have only one active independent authorized requirement basis owner at a time.

Overlap is resolved before a second authority becomes active through:
- attach as evidence;
- reconcile to existing;
- split scope;
- supersede;
- governed shared/joint responsibility.

### Free-form limitation

Where the scope has no deterministic natural key, uniqueness is partly process-enforced:
- possible overlap is surfaced;
- controlled human scope-identity/reconcile/split decision is required;
- AI may suggest but cannot silently establish, merge, split, supersede, or duplicate authority.

### Shared/joint responsibility

This is a governed exception, not a bypass.

The authorizing act must preserve:
- exact overlapping/shared scope;
- affected basis owners;
- business reason simultaneous authority is legitimate;
- approving actor/authority;
- evidence;
- effective time;
- review/expiry condition where appropriate.

## 5. RequirementAllocation authority

`RequirementAllocation` owns requirement-scope consumption only.

Basis modes:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

Quantity conservation:

`sum(active leaf allocated quantity in authoritative basis UOM) <= current effective authorized quantity`

Non-quantified scope uses explicit partition conservation.

Estimated/target/planning value is non-authoritative allocation context. Price/estimate variance belongs to commercial/DOA/budget governance.

## 6. Active leaves

An active leaf consumes/reserves part of effective authorized requirement scope.

Tender failure, re-tender, bidder withdrawal, supplier replacement, or award supersession do not automatically release scope.

A leaf stops consuming only through explicit history-preserving actions such as:
- split;
- allowed merge;
- release/cancel remaining scope;
- governed reduction after downstream exposure is reconciled;
- fulfilled/closed disposition;
- effective downstream cancellation/reduction that returns capacity.

Award and commitment bind existing leaves rather than creating additive allocation balances.

## 7. Controlled UOM

Every quantitative authorized basis version has one authoritative conservation UOM.

Cross-UOM input is permitted only when a governed deterministic conversion preserves:
- source/target UOM;
- exact conversion relationship/factor;
- business/source definition;
- version/effective time;
- precision;
- rounding;
- provenance.

Canonical converted quantity consumes the basis.

No deterministic governed conversion = allocation blocked.

## 8. Basis versioning / later demand reconciliation

Later demand/planning evidence cannot retroactively invalidate earlier authorization.

### Match
Link/corroborate existing basis.

### Expansion
New higher basis becomes effective before additional allocation consumption.

### Reduction — releasable scope
Release/resize/split excess active scope first, then activate lower basis.

### Reduction — downstream exposure exists
Create a pending basis-reduction/reconciliation proposal.

Prior basis stays effective while existing exposure remains unresolved.

Depending on binding state:
- sourcing only → release/rebind leaves;
- approved award/no effective commitment → revise/cancel/supersede award/allocation;
- effective commitment → contractual reduction/cancellation/negative change/termination under P07 before lower basis effectivity.

If exposure cannot be reduced, preserve the mismatch/variance rather than falsifying authorization or contractual history.

## 9. CR-01 — pending-reduction consumption guard

While a basis-reduction proposal is unresolved:

> no new allocation consumption **or commitment binding** may use the prior effective basis where that action conflicts with the unresolved reduction target.

The old basis remains effective to keep existing exposure historically backed, but it is not available as a loophole for fresh inconsistent consumption.

Allowed actions include release/reduction/reconciliation moves that reduce exposure toward the target.

## 10. Entry routes

Demand-led direct:

`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

Demand-led packaged:

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

Planned before detailed MR:

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Then:

`TenderEvent`
`→ immutable TenderRelease/Addenda`
`→ TenderParticipant`
`→ bounded external access`
`→ BidSubmission v1..n`
`→ source-linked normalization/internal EvaluationAdjustment`
`→ frozen ComparisonSnapshot {FX/tax basis}`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase {effective authority/history}`
`→ AwardDecision`
`→ same RequirementAllocation lineage`
`→ P07`

## 11. Sourcing commercial truth

Binding distinctions retained:
- supplier economic change → immutable supplier-confirmed BidSubmission revision;
- buyer-on-behalf capture preserves original evidence/provenance;
- supplier truth ≠ normalized view ≠ internal evaluation adjustment;
- evaluated basis ≠ contractable agreed basis;
- P07 consumes only approved contractable agreed basis;
- historical comparison freezes FX/tax transformation inputs;
- award ≠ commitment.

## 12. Hard invariants

1. One effective authorized basis owner per exclusive declared scope unless governed shared/joint responsibility exists.
2. DemandLine and PlannedRequirement obey identical semantic version/change-control rules.
3. Planning evidence alone does not create authority.
4. RequirementAllocation consumes only effective authorized scope.
5. Quantity conservation is hard in authoritative UOM.
6. Scope-partition conservation is hard where quantity is not meaningful.
7. Expansion becomes authorized/effective before incremental consumption.
8. Reduction cannot become effective below unresolved existing exposure.
9. During unresolved reduction, no new allocation or commitment may conflict with target reduced scope.
10. Later evidence does not rewrite earlier valid authorization history.
11. Tender failure/re-tender does not automatically release scope.
12. Award/commitment bind existing leaves, not new allocation ledgers.
13. Value variance is commercial governance, not scope-conservation authority.
14. Shared/joint overlap requires governed authorization/evidence.
15. Allocation/version/reconciliation actions are atomic, history-preserving and idempotent.

## 13. ADR posture

### ADR-0003
Still `PROPOSED / PENDING`.

Later structural decision must test whether DemandLine and PlannedRequirement remain separate physical types or collapse behind their common AuthorizedRequirementBasis contract.

### ADR-0004
Still `PROPOSED / PENDING`.

Sourcing stops at award; downstream physical PO/subcontract model is not decided.

### ADR-0005 / ADR-0011
Budget/estimate figures used by P06 are contextual approval evidence and preserve source/snapshot/freshness. Later authority decisions cannot rewrite historical approval evidence.

## 14. Gate

**Review A sourcing gate: PASS.**

Proceed to external **Review B — P07A–P07D + P08 commercial core/accounting seam**.

This is not P1.2 final closure, ontology freeze, primary evidence completion, or build authorization.