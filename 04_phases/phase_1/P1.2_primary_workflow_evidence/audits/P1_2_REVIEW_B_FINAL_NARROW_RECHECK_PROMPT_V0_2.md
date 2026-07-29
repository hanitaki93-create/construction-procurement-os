# P1.2 — Review B Final Narrow Recheck Prompt v0.2

## Prior external status

Review B remains FAIL only because the previous narrow recheck found:
- BL-07 guaranteed-minimum framework drawdown ambiguity;
- BL-08 unconserved remeasurable scope possibility.

It also required:
- BL-05 wording: authorized instruction that adds scope must itself be the effective basis-expansion event when valid;
- BL-06 wording: all value-contributing fulfillment mechanisms must resolve against a common economic base;
- W01: tolerance ceiling requires governed rounding + reduction behavior.

Previously closed and not to be reopened without direct contradiction:
- BL-05 core mechanism;
- BL-06 composable fulfillment;
- W02;
- W03;
- W04;
- object-collapse posture;
- second-ledger check;
- Review A sourcing PASS;
- P1.1 reopen = NO.

## Current remediation to review

Read current artifacts:
- `P1_2_REVIEW_B_CRITIQUE_REMEDIATION_V0_2.md`
- `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_3.md`
- `P1_2_REVIEW_B_FINAL_REMEDIATION_SANITY_AUDIT_V0_1.md`

### BL-07 current rule

Guaranteed minimums are split by economic basis:

1. **SCOPE_BACKED_MINIMUM**
   - reserves capacity on the existing RequirementAllocation lineage;
   - call-offs draw down the reservation rather than consume the same scope again;
   - residual reservation at expiry is governed/released/converted according to evidence.

2. **MONETARY_MINIMUM**
   - minimum spend/take-or-pay/fee with no fixed physical scope;
   - does not fabricate RequirementAllocation scope;
   - call-offs consume real procurement scope normally and may reduce outstanding monetary-minimum exposure;
   - residual settlement remains commercial/accounting exposure, not fake procurement fulfillment.

Attack whether this distinction is coherent and whether it creates a hidden second ledger or Review A regression.

### BL-08 current rule

Every `REMEASURABLE_QUANTITY` commitment has a hard conservation dimension:
- genuine quantity/cap where actually authorized; otherwise
- mandatory `SCOPE_PARTITION_BASIS`.

There is no valid unconserved remeasurable state.

Estimated BOQ quantity may remain planning/valuation metadata when it is not genuine authorization.

### BL-05 wording closure

Where a governed instruction adds scope and the issuer has the required authority, the instruction **is itself** the effective source event for authorized-basis expansion.

No artificial second approval event is required just to create allocation capacity.

If internal authority is absent/disputed while external exposure may exist, preserve the exposure/exception and do not invent clean authorization or supplier price.

### BL-06 wording closure

Every value-contributing fulfillment mechanism for the same scope resolves against a common economic base/component identity.

Stored-material receipt/certification and later installation may not re-earn the same material economic component.

Physical persistence/grain remains later design.

### W01 closure

Tolerance ceiling is a deterministic property of the AuthorizedRequirementBasis version:
- nominal quantity;
- tolerance rule/type/direction;
- precision;
- rounding-policy reference;
- derived ceiling;
- effective version/provenance.

Basis reduction creates a new proposed ceiling and Review A downward-reconciliation/CR-01 applies before activation.

## Output contract

Return only:

### BLOCKERS
Only defects in the current BL-07/BL-08 remediation or direct defects created by the wording/W01 corrections.

### BL-07 VERDICT
Choose:
- `CLOSED — framework minimum/call-off semantics preserve one allocation authority without fabricating scope`
- `OPEN — exact defect`

### BL-08 VERDICT
Choose:
- `CLOSED — remeasurable scope always has a hard conservation dimension`
- `OPEN — exact defect`

### BL-05 / BL-06 WORDING VERDICT
For each: `CLOSED` or exact remaining defect.

### W01 VERDICT
Choose:
- `CLOSED / NON-BLOCKING`
- `BLOCKER — exact defect`

### SECOND-LEDGER / REVIEW-A REGRESSION
State:
- whether scope-backed reservation or monetary-minimum exposure creates a duplicate balance;
- whether any current rule violates Review A hard conservation.

### ADR-0004 CHECK
State whether framework/call-off physical composition remains open.

### P1.1 REOPEN?
`NO` or exact reason.

### VERDICT
Choose exactly one:
- `PASS — P07/P08 coherent; proceed to Review C`
- `FAIL — blocker(s) remain before Review C`

Do not reopen already-closed Review B history without a direct contradiction from this remediation.