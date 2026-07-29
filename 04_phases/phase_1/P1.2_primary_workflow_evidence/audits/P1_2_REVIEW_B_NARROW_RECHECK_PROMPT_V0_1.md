# P1.2 — Review B Narrow Recheck Prompt v0.1

Review only the remediation of Review B blockers BL-03–BL-06 and watches W01–W04.

Current binding artifacts:
- `audits/P1_2_REVIEW_B_CRITIQUE_REMEDIATION_V0_1.md`
- `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_2.md`
- `audits/P1_2_REVIEW_B_REMEDIATION_SANITY_AUDIT_V0_1.md`

Review A sourcing PASS remains binding and must not be reopened unless this remediation directly violates it.

## Key architecture choices to judge

1. `CommercialTermsAuthority` is non-consuming rate/terms authority; call-off/release obligations form independently and consume allocation. Guaranteed minimum exposure is modeled separately if binding.
2. Scope/quantity basis and valuation basis are orthogonal. `PROVISIONAL_SUM` is a valuation/allowance mechanism, not a quantity basis.
3. Remeasurable quantity may vary under governed measurement without a fake variation when scope/rate basis already authorizes it.
4. `AuthorizedWorkInstruction` may establish scope/work authority before final commercial value agreement; final supplier price is not invented.
5. Certification of instructed/unagreed work requires a named contractual valuation basis and later reconciles to final agreement non-destructively.
6. P07C/P07D are composable fulfillment mechanisms, not mutually exclusive commitment types.
7. Authorized receipt tolerance is part of upstream effective requirement authorization ceiling, not a receipt-time override.
8. Integration rejection disposition is separate from OWN/MIRROR/REFERENCE authority.
9. Corrections share invariants but use domain-specific economic semantics.
10. Retention/advance/allowance/integration statuses remain projections/events, not editable parallel balances.

## Required output

### BLOCKERS
Only defects remaining from BL-03–BL-06 / W01–W04 or directly created by remediation.

### BL-03 VERDICT
`CLOSED` or `OPEN — exact defect`

### BL-04 VERDICT
`CLOSED` or `OPEN — exact defect`

### BL-05 VERDICT
`CLOSED` or `OPEN — exact defect`

### BL-06 VERDICT
`CLOSED` or `OPEN — exact defect`

### W01–W04 VERDICTS
Each as:
- `CLOSED / NON-BLOCKING`
- `PRIMARY-EVIDENCE WATCH`
- `BLOCKER — exact defect`

### OBJECT-COLLAPSE CHECK
State whether the remediation preserves semantics without unnecessary durable objects. Do not force `ValuationAssessment` collapse unless independent lifecycle is demonstrably unnecessary.

### SECOND-LEDGER CHECK
Choose one:
- `CLEAN`
- `FAIL — exact duplicate-ledger mechanism`

### ADR-0004 CHECK
State whether framework/call-off and composable fulfillment remain physically unresolved as intended.

### REVIEW A REGRESSION?
`NO` or exact violated sourcing invariant.

### P1.1 REOPEN?
`NO` or exact frozen assumption.

### VERDICT
Choose exactly one:
- `PASS — P07/P08 coherent; proceed to Review C`
- `FAIL — blocker(s) remain before Review C`

Be hostile, but critique the current remediation rather than reopening already-closed history without a direct contradiction.
