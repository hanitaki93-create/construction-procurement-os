# P1.2 Sourcing Final Narrow Recheck Prompt v0.1

The prior re-review accepted the `RequirementAllocation` lineage cure and closed B1, B2 and B4, but raised two new blockers: B5 and B6.

A second remediation is now applied in:
- `audits/P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_2.md`
- `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_3.md`

Review **only** B5, B6, and defects directly created by this correction.

## B5 correction

`RequirementAllocation` now owns hard requirement-scope consumption only.

Hard conservation dimensions are:
- `QUANTITY_BASIS` for genuinely quantitative requirements; or
- `SCOPE_PARTITION_BASIS` for lump-sum/document-driven scope; or
- `HYBRID` where appropriate.

Quantity invariant:

`sum(active leaf allocated quantity) <= current authorized requirement quantity`

No allocation-level routine override exists. Extra quantity requires prior governed change to the authorized requirement basis.

For non-quantified scope, explicit scope partition identities (section, BOQ line/group, deliverable, lot, defined work-scope segment) are conserved. Default is exclusive consumption unless the authorized scope basis explicitly allows shared/joint responsibility.

Estimated/target/planning value is non-authoritative allocation metadata only.

Award price vs estimate/budget is a separate commercial variance/DOA/budget control using the `contractable_agreed_basis`. It is not an allocation correctness rule.

P07 / ADR-0005 / ADR-0011 later resolve authoritative budget/commitment/accounting ownership.

## B6 correction

Every sourcing path originates a `RequirementAllocation` before tender/award.

Closed origin families:
1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

`PLANNED_REQUIREMENT` is an authorized planning basis anchored to `Project → Budget/Cost Structure`, not a new universal upstream node.

Closed V1 planning source evidence types:
- `ESTIMATE_LINE`
- `PROCUREMENT_PLAN_LINE`
- `LONG_LEAD_PLAN_ITEM`

Routes:

`DemandLine → RequirementAllocation → TenderEvent`

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [optional ProcurementPackage] → TenderEvent`

Later detailed demand reconciles to the same allocation lineage; it cannot create duplicate allocation for already-covered scope.

## Prior findings retained

- B1 CLOSED.
- B2 CLOSED.
- B3 lineage cure ACCEPTED.
- B4 CLOSED.
- ADR-0003 and ADR-0004 were clean after prior correction.
- P1.1 reopening was NO.

## Return only

### BLOCKERS
Only remaining B5/B6 blockers or direct defects created by this remediation.

### B5 VERDICT
Choose exactly one:
- `CLOSED — scope/quantity correctness is cleanly separated from value governance`
- `OPEN — exact remaining defect`

### B6 VERDICT
Choose exactly one:
- `CLOSED — every sourcing route enters the single allocation authority`
- `OPEN — exact remaining defect`

### ADR-0003 / P1.1 CONSISTENCY
State whether the closed origin model introduces a new root/anchoring problem.

### VERDICT
Choose exactly one:
- `PASS — sourcing subgraph coherent; proceed to P07`
- `FAIL — blocker(s) remain before P07`

Do not reopen unrelated watch items unless this correction directly creates a new structural blocker.