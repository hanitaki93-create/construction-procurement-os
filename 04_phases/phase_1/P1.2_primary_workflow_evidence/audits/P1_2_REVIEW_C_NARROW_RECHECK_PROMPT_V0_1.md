# P1.2 Review C — Narrow Recheck Prompt v0.1

## Prior external result

Review C returned:

`FAIL — remediate blocker(s) before primary challenge/structural architecture`

with one blocker:
- BL-09 buyer-side entitlement/recovery missing.

It also returned:
- second-XL CLEAN;
- missing-core-process NONE;
- first-live-tender CLEAN;
- Review A/B regression NO conditional on BL-09;
- object-collapse/boundary/ADR/falsification obligations.

## Current remediation

Use current artifacts:
- `P1_2_REVIEW_C_CRITIQUE_REMEDIATION_V0_1.md`
- `P1_2_COMPLETE_PROVISIONAL_OPERATIONAL_CHECKPOINT_V0_2.md`
- `P1_2_REVIEW_C_REMEDIATION_SANITY_AUDIT_V0_1.md`

### BL-09 cure

Binding distinction:

`Buyer entitlement/recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

Bounded recovery family preserves:
- contractual basis;
- trigger;
- quantification;
- authority/evidence;
- disputed state;
- application/settlement;
- cross-commitment reference where rectification/replacement cost arises elsewhere;
- security-call linkage where applicable.

Recovery may affect payable/settlement under contract/policy but cannot falsify original/current supplier-agreed contract value or gross earned certification.

### Boundary dispositions

- P09 tasks/notifications outside truth graph.
- Gate semantics use fixed named classes; customers may configure only parameters/override behavior permitted by that class. Hard domain invariants cannot be made overridable.
- P10 has no CPM/network propagation; local deterministic derived forecast is allowed with visible source/formula/version.
- P11 claim/dispute substance remains reference-only; recovery stops at contractual entitlement/quantification/application evidence.
- Compliance evaluation collapses to event/evidence + derived state by default.
- Bidder selection progression remains TenderParticipant events/state.
- Reconciliation exception is derived; optional operational remediation case is outside accounting/commercial truth.
- Planning/forecast dates are versioned records; actual schedule milestones are projections over canonical events.

### ADR posture

ADR-0003, 0008, 0013, 0014, 0019 and 0021 are not represented as directionless open.

Current posture:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Do not treat secondary-reference architecture as final ADR close.

### Primary falsification

Eight named falsification targets are defined before primary capture. Primary capture remains verbatim/blind first, then mapped against the targets.

## Reviewer output contract

Return only:

### BLOCKERS

Only defects in BL-09 remediation or direct defects created by the boundary/collapse/ADR/falsification corrections.

### BL-09 VERDICT

Choose exactly one:

`CLOSED — buyer-side entitlement/recovery is structurally distinct from contract change and gross earned value`

or

`OPEN — exact remaining defect`

### SECOND-XL CHECK

`CLEAN — only P07 remains XL`

or exact regression.

### FIRST-LIVE-TENDER CHECK

`CLEAN`

or exact new dependency caused by remediation.

### REVIEW A/B REGRESSION?

`NO`

or exact contradiction.

### ADR POSTURE CHECK

State whether provisional-direction status accurately reflects what has already been decided without pretending final architecture/evidence closure.

### PRIMARY-EVIDENCE REVERSIBILITY

`CLEAN`

or exact remaining institutional/architectural lock-in.

### P1.1 REOPEN?

`NO` or exact reason.

### VERDICT

Choose exactly one:

`PASS — full graph coherent; proceed to primary challenge/closure work`

or

`FAIL — blocker(s) remain before primary challenge`

Do not reopen Review A/B or unrelated Review C watches unless this remediation directly contradicts them.
