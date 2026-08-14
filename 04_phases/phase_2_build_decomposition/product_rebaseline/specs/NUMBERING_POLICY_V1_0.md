# CPOS Governed Numbering Policy v1.0

## Principle

Internal immutable identity is never the displayed business/document number. Every numbered document class declares its own policy.

## Required policy fields

- document class: MR, RFQ, ADDENDUM, COMPARISON, RECOMMENDATION, AWARD, LPO, PO, SUBCONTRACT, GRN, etc.;
- uniqueness scope: tenant/legal entity/project/year/class or another approved scope;
- format/mask, e.g. `MR-{PROJECT}-{YY}-{SEQ}`;
- sequence width and reset rule;
- automatic/manual/externally-assigned mode;
- gap policy: GAP_ALLOWED or CONTINUOUS_REQUIRED;
- assignment timing;
- reservation policy;
- cancellation treatment;
- revision/reissue treatment;
- external ERP number mapping where relevant;
- concurrency mechanism;
- legal/audit rationale.

## Invariants

1. No duplicate active/issued business number in its configured uniqueness scope.
2. Issued/cancelled numbers are not silently reused.
3. `max(number)+1` and equivalent race-prone allocation are prohibited.
4. Revision of one business document does not silently create a different identity unless the policy explicitly requires reissue/new number.
5. If CONTINUOUS_REQUIRED is selected, assignment must use a mechanism compatible with the declared no-gap semantics; reservation/crash behavior is part of the design.
6. External ERP-assigned numbers remain distinct from CPOS internal transaction identity and may coexist with a CPOS tracking number.

## User experience

Users normally see the generated number before issue when the policy allows safe reservation, or immediately at issue/commit when continuity requires late assignment. Manual override is permissioned, validated and auditable; it is never an unrestricted text field.

## Acceptance

Concurrent creation/issue tests prove uniqueness and the declared gap behavior. Cancellation, retry, failed issue, reissue and ERP-number assignment are hostile-tested for each numbered class.