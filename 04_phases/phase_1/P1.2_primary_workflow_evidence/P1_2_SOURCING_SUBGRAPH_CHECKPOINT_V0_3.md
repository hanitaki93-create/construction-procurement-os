# P1.2 — Sourcing Subgraph Checkpoint v0.3

**Status:** B1–B6 REMEDIATED / READY FOR FINAL NARROW HOSTILE RE-REVIEW / NOT FROZEN  
**Supersedes:** `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_2.md` for current provisional integration.  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER.

## 1. Review history

Initial hostile review:
- B1 supplier-agreed basis ownership/provenance;
- B2 evaluated vs contractable award basis;
- B3 competing allocation writers;
- B4 FX/tax freeze;
- ADR-0003 package-root anchoring.

First re-review:
- B1 CLOSED;
- B2 CLOSED;
- B4 CLOSED;
- B3 `RequirementAllocation` lineage ACCEPTED;
- ADR-0003/0004 anchoring CLEAN;
- new B5/B6 raised.

Current checkpoint incorporates B5/B6 remediation.

## 2. Binding framing

P01–P06 remain falsifiable candidate mechanics, not accepted final ontology.

ADR-0003 and ADR-0004 remain `PROPOSED / PENDING`.

Primary contractor evidence later may contradict or simplify this model.

## 3. Requirement source families

Every sourcing path begins from one of two closed origin families:

1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

### DEMAND_LINE
Normal requisition/demand source.

### PLANNED_REQUIREMENT
Authorized early-planning basis anchored to:

`Project → Budget/Cost Structure`

with closed V1 source evidence types:
- `ESTIMATE_LINE`;
- `PROCUREMENT_PLAN_LINE`;
- `LONG_LEAD_PLAN_ITEM`.

This is a source role/basis, not a new universal upstream product node.

## 4. Corrected entry routes

### Demand-led direct
`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

### Demand-led packaged
`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### Planned/package-led before detailed MR
`Project + Budget/Cost Structure + PLANNED_REQUIREMENT`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ TenderEvent`

Therefore every route has allocation authority before tender/award.

`ProcurementPackage` remains optional.

## 5. RequirementAllocation authority

`RequirementAllocation` owns **requirement-scope consumption**, not market price/budget spend.

It may be based on:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

### Quantity basis
Hard invariant:

`sum(active leaf allocated quantity) <= current authorized requirement quantity`

within the same controlled UOM basis.

No allocation-level override.

Extra quantity requires prior governed change to the authorized demand/planning basis.

### Scope-partition basis
For lump-sum/document-driven scope, authorized scope is divided using explicit business partition identities such as section, BOQ group/line, deliverable, lot, or defined work-scope segment.

Default invariant:

> one authorized scope partition may not be consumed by multiple active award/commitment leaves unless the authorized scope model explicitly permits shared/joint responsibility.

The partition ID references the actual requirement/tender breakdown. It does not create a generalized construction ontology.

### Value
Estimated/target/planning value may be attached only as non-authoritative context.

It is not part of the hard allocation conservation rule.

## 6. Commercial value governance

Award price may legitimately exceed estimate.

At P06, compare `contractable_agreed_basis` to applicable budget/estimate/target context for:
- variance visibility;
- DOA escalation;
- exception/approval;
- budget revision/reallocation where required.

This is separate from scope allocation correctness.

P07 / ADR-0005 / ADR-0011 later determine authoritative commitment-budget/accounting ownership and posting/interface behavior.

## 7. Allocation lineage behavior

One authorized slice progresses through:

`RequirementAllocation leaf → sourcing reference → award binding → later commitment binding`

Award/commitment do not create duplicate allocation balances.

Split creates children and deactivates the parent from active consumption counting.

Later detailed-demand reconciliation for early planned procurement links to the existing lineage and cannot duplicate already-covered scope.

Split/merge/reconciliation/conversion must be atomic, history-preserving and idempotent.

## 8. Corrected integrated sourcing lineage

From either origin family:

`RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ TenderEvent`
`→ immutable TenderRelease vN + Addenda`
`→ TenderParticipant`
`→ ExternalAccessGrant as required`
`→ BidIntent / response facts`
`→ BidSubmission v1..n`
`→ source-linked normalization + internal EvaluationAdjustment`
`→ frozen ComparisonSnapshot {FX/tax basis}`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase {effective policy + historical role/delegation context}`
`→ AwardDecision`
`→ existing RequirementAllocation leaf/leaves bound to award`
`→ P07 commitment binding to same lineage`

## 9. Truth ownership summary

| Concept | Candidate truth |
|---|---|
| DemandLine / PlannedRequirement basis | authorized requirement source |
| RequirementAllocation | hard requirement-scope consumption lineage |
| ProcurementPackage | optional planning/grouping context |
| TenderRelease | exact supplier-facing release/version |
| TenderParticipant | tender×vendor participation facts |
| BidSubmission | immutable supplier-confirmed commercial offer revision |
| ComparisonSnapshot | frozen buyer evaluation basis incl. FX/tax transforms |
| AwardRecommendation | proposed evaluated + contractable bases |
| ApprovalCase | authority evidence |
| AwardDecision | approved internal selection/contractable basis |
| P07 | later commitment/change/valuation truth |

## 10. Existing closed blocker corrections retained

### B1
Every material supplier economic change becomes a new immutable `BidSubmission` revision. Buyer-on-behalf capture preserves immutable source and ingestion provenance.

### B2
Award preserves both `evaluated_basis` and `contractable_agreed_basis`. P07 may consume only the latter.

### B3
One `RequirementAllocation` lineage; no separate demand/award/commitment allocation ledgers.

### B4
Historical comparison freezes FX rate/source/fixing date and tax/rounding basis; it never resolves through live tables.

## 11. Object simplification retained

- `TenderParticipant` absorbs candidate/selection/invitation shell at tender×vendor grain while preserving distinct dated facts;
- `EligibilityEvaluation` defaults to dated event/value on participant;
- `VendorQualificationRecord` remains reusable vendor evidence;
- durable `PreferredBidderSelection` removed;
- `ExternalAccessGrant` remains separate security capability.

## 12. Core invariants after remediation

1. Supplier-facing releases and bid revisions remain immutable evidence.
2. Supplier commercial truth is separate from normalization and buyer adjustments.
3. Only supplier-confirmed bid revisions can define contractable commercial basis.
4. Award ≠ commitment.
5. One requirement-allocation lineage owns scope consumption.
6. Quantity/scope conservation is hard; price-vs-estimate is not an allocation correctness rule.
7. All sourcing routes enter allocation authority before award.
8. Package is optional.
9. Planned early procurement is anchored to Project + Budget/Cost Structure and a closed planning source type.
10. Later demand reconciliation cannot duplicate early allocated scope.
11. FX/tax evaluation basis is historically reproducible.
12. DOA policy, actual historical role assignment and delegation are reproducible.
13. External supplier access remains bounded.
14. AI cannot silently create supplier or commercial truth.

## 13. ADR posture

### ADR-0003
Still `PROPOSED / PENDING`.

Current mechanics support direct-demand and package-mediated paths without selecting final structural root/navigation architecture.

### ADR-0004
Still `PROPOSED / PENDING`.

P01–P06 still stop at award and do not choose final PO/subcontract type architecture.

### ADR-0005 / ADR-0011
P07/later work owns authoritative budget/commitment/accounting seam and value control semantics. Current sourcing work only exposes budget variance for governance.

## 14. P1.1 impact

**P1.1 REOPEN: NO.**

No new upstream product node is introduced. Planned requirements are source bases attached to frozen Project + Budget/Cost Structure context.

## 15. Gate

P07 remains blocked until final narrow hostile re-review returns:

`PASS — sourcing subgraph coherent; proceed to P07`

Final re-review scope should be only B5/B6 and any direct defect created by their remediation.