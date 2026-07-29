# P1.2 — Sourcing Subgraph Checkpoint v0.2

**Status:** REMEDIATED / READY FOR NARROW HOSTILE RE-REVIEW / NOT FROZEN  
**Supersedes checkpoint:** `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_1.md` for current integrated candidate mechanics.  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER.

## 1. Binding framing

P01–P06 remain falsifiable candidate decompositions, not accepted entity architecture.

ADR-0003 and ADR-0004 remain `PROPOSED / PENDING`.

Primary contractor cases must be captured verbatim before mapping to these candidate concepts.

## 2. Corrected candidate lineage — no package universal root

Three valid entry patterns remain open.

### Demand-led direct

`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

### Demand-led packaged

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### Package-led planning

`Estimate / Procurement Plan / Long-lead Trigger → ProcurementPackage → TenderEvent`

Later detailed demand may reconcile to the package through the allocation lineage.

From `TenderEvent` onward:

`TenderEvent`
`→ TenderRelease vN + Addenda`
`→ TenderParticipant {selection/invite lifecycle}`
`→ ExternalAccessGrant as required`
`→ BidIntent / supplier response facts`
`→ BidSubmission v1..n`
`→ ComparisonSchema + BidLineMapping + EvaluationAdjustment`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation vN {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase {effective policy + actual role/authority context}`
`→ AwardDecision`
`→ existing RequirementAllocation leaf/leaves bound to award`
`→ P07 commitment binding to the same allocation lineage`

`ProcurementPackage` is optional. This checkpoint does not resolve ADR-0003.

## 3. Corrected truth ownership

| Concept | Authoritative candidate truth | Does NOT own |
|---|---|---|
| Demand / DemandLine | required and authorized procurement basis | tender release, supplier offer, award, committed cost |
| RequirementAllocation | single authoritative quantity/value lineage from authorized requirement through sourcing/award/commitment binding | commercial terms, supplier price |
| ProcurementPackage | optional planning/grouping/sourcing context | universal structural root, supplier release truth, committed cost |
| TenderEvent | one solicitation attempt/round | exact released content, supplier offer |
| TenderRelease | exact supplier-facing released scope/docs/instructions/dates/version | bidder offer, comparison, award |
| TenderParticipant | tender×vendor participation lifecycle facts: considered, selected/excluded, invited, response state projection | vendor qualification evidence, bid commercial content |
| VendorQualificationRecord | reusable dated/effective qualification evidence | package-specific selection |
| ExternalAccessGrant | bounded authorization capability | commercial participation truth |
| BidSubmission | immutable supplier-confirmed economic offer revision, including direct or buyer-on-behalf capture provenance | internal normalization/allowances |
| ComparisonSnapshot | frozen buyer evaluation basis including applied FX/tax normalization | supplier-origin/agreed commercial truth |
| AwardRecommendation | proposed selection carrying both evaluated and contractable basis | final approval, committed cost |
| ApprovalCase | policy, role assignment, delegation and actual approver evidence for that recommendation version | commercial commitment |
| AwardDecision | approved/rejected/returned selection and approved contractable basis | authoritative committed cost |
| P07 | commitment/change/valuation commercial truth | not specified yet |

## 4. Supplier commercial truth and capture provenance

Every supplier-confirmed economic change must materialize as a new immutable `BidSubmission` revision.

Clarification/thread/email evidence may support the revision but cannot itself become the contractable basis.

Candidate provenance dimensions:
- `commercial_origin = SUPPLIER`;
- `capture_mode = SUPPLIER_DIRECT | BUYER_ON_BEHALF`;
- supplier contact/confirmation identity where available;
- buyer ingestion actor when applicable;
- immutable source artifact/message/file;
- receipt and capture timestamps;
- verification/review status where extraction/transcription occurs.

Buyer ingestion does not authorize invented supplier values.

## 5. Four-layer commercial model — corrected ownership

1. **Supplier truth:** immutable `BidSubmission vN`.
2. **Normalized representation:** source-linked mapping/extraction.
3. **Internal evaluation adjustment:** buyer-only comparison effect.
4. **Negotiated/agreed basis:** later supplier-confirmed `BidSubmission vN+1`.

Layer 4 is not a free-floating record type.

## 6. Award basis — evaluated vs contractable

`AwardRecommendation` and `AwardDecision` preserve two distinct bases:

### evaluated_basis

Frozen comparison-derived decision basis, which may include internal allowances/risk/normalization.

### contractable_agreed_basis

Exact supplier-confirmed bid revision(s), scope allocation and commercial terms authorized for commitment conversion.

Approval must show both and identify the contractable basis.

P07 may consume only the approved contractable basis.

Tolerance rules apply only to drift from an already-defined approved contractable basis; they cannot convert buyer allowances into supplier price.

## 7. Single allocation authority

`DemandAllocation` and `AwardAllocation` are superseded as separate authoritative concepts.

One `RequirementAllocation` lineage owns requirement quantity/value allocation.

### Core invariant

`sum(active leaf allocations) <= authorized demand basis`

unless explicit controlled overbuy/change exists.

### Split example

Demand 100 units:
- parent allocation 100;
- split into child A 60 and child B 40;
- parent becomes inactive/non-counting;
- award binds A/B to selected vendors;
- P07 later binds the same leaf/leaves to commitment(s).

Sourcing, award and commitment are progression/bindings on the same lineage, not three independently additive balances.

Split/merge/close operations must be atomic, history-preserving and idempotent.

## 8. FX/tax freeze

`BidSubmission` preserves source currency and tax posture at the required header/line grain.

`ComparisonSnapshot` freezes every applied transformation needed to reproduce the decision:
- source and target currency;
- exact FX rate;
- rate source;
- fixing date/time/policy;
- target comparison tax basis;
- source bidder tax posture;
- applied tax calculation treatment;
- rounding/calculation policy references.

A later live rate/config change cannot alter historical comparison rankings.

## 9. Object simplification

### TenderParticipant

`BidderCandidate`, `BidderSelection` and invitation lifecycle are collapsed by default into one `TenderParticipant` aggregate at tender×vendor grain.

The following remain separate dated facts/transitions, not one status bit:
- considered;
- eligibility evaluated;
- selected/excluded/hold;
- invited/delivered;
- access granted/revoked;
- will-bid/decline;
- submission received/withdrawn;
- derived no-response.

`VendorQualificationRecord` remains vendor-level reusable evidence.

`EligibilityEvaluation` is a dated event/value on TenderParticipant by default.

`ExternalAccessGrant` remains separate because it is a security capability.

### PreferredBidderSelection

Deleted as a durable candidate object.

Working preference is a comparison annotation/event; formal governance begins at `AwardRecommendation`.

## 10. DOA reproducibility

Historical approval reproducibility requires:
- policy version/effective date;
- actual approver identity;
- resolved role at the time;
- role-assignment basis/effective context;
- delegation evidence/effective date where used.

Standard V1 configuration should keep the default approval rule core small:
- legal entity/company;
- monetary threshold;
- delegation.

Other dimensions remain additive policy capabilities.

## 11. Bid confidentiality reveal condition

Candidate modes:
- `OPEN_INTERNAL_VISIBILITY`;
- `BLIND_UNTIL_CLOSE`;
- `CONTROLLED_REVEAL`.

Preserve reveal policy/condition, actual reveal time, and actor when controlled.

Supplier-to-supplier confidentiality remains invariant.

## 12. Corrected cross-process invariants

1. immutable lineage from procurement basis through release, bid, comparison, award and later commitment;
2. no destructive revision of released tender, submission, comparison or award evidence;
3. one authoritative requirement-allocation lineage; no competing sourcing/award/commitment allocation ledgers;
4. package is optional and cannot become the universal root by implication;
5. qualification, eligibility, selection/invitation/access/intent/submission remain distinct facts even where grouped in TenderParticipant;
6. decline ≠ non-response;
7. every supplier economic change that may become contractual is a new supplier-confirmed BidSubmission revision;
8. buyer-on-behalf capture preserves source artifact and ingestion provenance;
9. supplier truth ≠ normalized view ≠ internal evaluation adjustment;
10. comparison snapshot freezes FX/tax transformation basis;
11. award preserves evaluated basis and separately contractable agreed basis;
12. P07 may instantiate only approved contractable basis;
13. award ≠ commitment;
14. historical DOA/role/delegation is reproducible;
15. AI/extraction cannot silently create supplier/commercial truth;
16. bid reveal/confidentiality policy is deterministic and auditable.

## 13. P1.1 impact

**P1.1 REOPEN: NO.**

The hostile review also concluded no frozen P1.1 assumption requires reopening.

These corrections remain inside the frozen `need → market → bid → governed award` boundary and reduce ambiguity/object burden.

## 14. Re-review status

Internal disposition after critique:
- B1 remediated;
- B2 remediated;
- B3 remediated with modified implementation cure;
- B4 remediated;
- ADR-0003 package anchoring remediated;
- cheap object-count simplifications applied;
- P07 remains blocked pending external narrow re-review PASS.
