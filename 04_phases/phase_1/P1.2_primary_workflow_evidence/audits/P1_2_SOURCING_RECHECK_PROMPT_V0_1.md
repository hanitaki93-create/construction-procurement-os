# P1.2 Sourcing Narrow Recheck Prompt v0.1

The prior hostile review returned `FAIL — remediate blockers before P07` with B1–B4 plus ADR-0003 package-root anchoring.

A remediation has now been applied. Review only whether those blockers are closed and whether the B3 modified cure introduces a new blocker.

## Corrected delta

### B1 — supplier-confirmed basis
- Every material supplier economic change must become a new immutable `BidSubmission` revision.
- Clarification/thread/email is supporting evidence only; it cannot itself be the authoritative contractable basis.
- Submission provenance separates `commercial_origin = SUPPLIER` from `capture_mode = SUPPLIER_DIRECT | BUYER_ON_BEHALF`.
- Buyer-on-behalf capture must preserve immutable source artifact, ingestion actor, receipt/capture timestamps and review status.

### B2 — award basis
- `AwardRecommendation` and approved `AwardDecision` preserve both:
  - `evaluated_basis` — comparison-derived internal decision basis;
  - `contractable_agreed_basis` — supplier-confirmed bid revision/scope/terms authorized for commitment.
- Approval identifies the contractable basis.
- P07 may consume only the approved contractable basis.
- Tolerance applies only after contractable basis is defined.

### B3 — allocation authority
We accept the diagnosis but modified the proposed implementation.

Instead of separate `DemandAllocation`, `AwardAllocation`, and future commitment allocation, or independent stage rows, the candidate model uses one canonical `RequirementAllocation` lineage at requirement grain.

- one allocation slice progresses through sourcing→award→commitment bindings;
- split creates child allocation leaves and deactivates the parent for active-balance counting;
- `sum(active leaf allocations) <= authorized basis` unless explicit controlled overbuy/change;
- award and P07 bind to existing leaf/leaves rather than creating parallel allocation records;
- split/merge/close/conversion must be atomic, history-preserving and idempotent.

Reason for not using one independent row per `SOURCING | AWARD | COMMITMENT` stage: a 100-unit requirement could otherwise exist as 100 at all three stages and still create ambiguous cumulative balance semantics.

Judge whether the lineage/slice cure closes the structural issue better than the original proposed stage-row implementation.

### B4 — FX/tax
- `BidSubmission` preserves source currency and tax posture at required grain.
- `ComparisonSnapshot` freezes every applied FX rate, currency pair, source, fixing date/time/policy, tax-normalization basis and calculation/rounding reference required to reproduce the ranking.
- historical comparison never resolves through a live FX/tax table.

### ADR-0003 anchoring
`ProcurementPackage` is optional.

Explicit candidate paths:
1. `DemandLine → RequirementAllocation → TenderEvent / direct source`
2. `DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`
3. `Estimate / Procurement Plan / Long-lead Trigger → ProcurementPackage → TenderEvent`, with later demand reconciliation.

ADR-0003 remains `PROPOSED / PENDING`.

## Object simplifications accepted before P07

- `BidderCandidate` + `BidderSelection` + invitation lifecycle collapse into `TenderParticipant` at tender×vendor grain while selection/invite/access/intent/submission remain distinct dated facts.
- `EligibilityEvaluation` is a dated event/value on TenderParticipant by default.
- `VendorQualificationRecord` remains reusable vendor-level evidence.
- `PreferredBidderSelection` durable object is deleted; working preference is a comparison annotation/event.
- `ExternalAccessGrant` remains separate as a security capability.

## Additional watch-item closures

- Approval history preserves policy version, actual approver identity, resolved historical role/role-assignment context and delegation evidence.
- Standard V1 approval setup uses a small default core; other rule dimensions are additive.
- Bid visibility has explicit deterministic reveal modes/condition/time/actor.
- ADR-0012 remains the target for external vendor identity/access topology.

## P1.1
No reopening proposed.

## Return only

### BLOCKERS
Only blockers remaining from B1–B4/ADR-0003 or newly created by the remediation. For each give exact reason and minimum correction.

### B3 CURE VERDICT
Choose one:
- `ACCEPT — RequirementAllocation lineage closes the competing-ledger issue`
- `REJECT — exact remaining structural defect`

### ADR-0003 / ADR-0004 ANCHORING CHECK
State whether either is still closed in practice.

### P1.1 REOPEN?
`NO` or exact frozen assumption.

### VERDICT
Choose exactly one:
- `PASS — sourcing subgraph coherent; proceed to P07`
- `FAIL — remediation still has blocker(s)`

Do not reopen unrelated watch items unless the remediation itself creates a new structural blocker.
