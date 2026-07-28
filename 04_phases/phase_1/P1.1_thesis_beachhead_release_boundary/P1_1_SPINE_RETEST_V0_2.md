# P1.1 — SPINE Re-test v0.2

**Status:** COMPLETE FOR CORRECTED DRAFT / NOT FROZEN

## Test

An area is `SPINE` only when at least one is true:

1. removing it breaks a closed lifecycle in the corrected V1 graph; or
2. it is a substrate whose omission cannot be safely retrofitted after commercial history/actions exist.

Usefulness, ambition, reporting convenience or future expansion alone do not qualify.

## Result

Original draft: **37 SPINE** across 80 areas.

After hostile re-test:
- **9 original SPINE rows demoted**;
- **28 original SPINE rows retained**;
- **2 missing mandatory nodes added as SPINE**;
- corrected matrix total: **30 SPINE / 28 THIN / 9 INTERFACE-ONLY / 15 OUT = 82 areas**.

## Original SPINE rows demoted

| Area | v0.1 | v0.2 | Reason |
|---|---|---|---|
| MAS-02 vendor categories/trades/eligibility | SPINE | THIN | manual/explicit bidder selection can close lifecycle |
| MAS-07 trade/package taxonomy | SPINE | THIN | useful vocabulary; not required to execute sourcing |
| PRC-01 procurement plan/milestone schedule | SPINE | THIN | demand may enter directly via MR/package |
| PRC-07 structured requested pricing/bid form | SPINE | THIN | attachment/freeform bid can still reach valid comparison/award |
| PRC-11 recommendation | SPINE | THIN | approval can act on comparison/award proposal without a distinct recommendation object |
| INT-02 external integration API/event surface | SPINE | THIN | internal bounded actions/events preserve later external exposure |
| INT-03 connector/reconciliation runtime framework | SPINE | INTERFACE-ONLY | ownership/runtime sync depth depends on ADR-0005/0021 |
| INT-06 export/BI/accounting handoff breadth | SPINE | THIN | useful interoperability surface; removal does not invalidate core transaction truth |
| UX-04 dashboards/core reports | SPINE | THIN | query/report UI is valuable but not a transaction invariant |

## Added missing SPINE nodes

### MAS-08 — Minimum vendor compliance/eligibility state

Needed so tender/award has an explicit counterparty eligibility state without requiring full supplier-management depth.

### FIN-11 — Valuation/progress event substrate

Needed so commitment/change truth can progress into incurred/certified commercial position without conflating reconciliation or payment with valuation.

## Original SPINE retained

Retained because they pass the criterion:

- FND-01 tenant identity
- FND-02 legal entity model
- FND-04 project master
- FND-05 internal identity
- FND-06 roles/permissions/DOA
- FND-07 external participant identity
- FND-11 shared approval/routing primitives
- FND-12 audit events
- MAS-01 vendor master
- FIN-01 cost/WBS reference
- FIN-02 budget baseline/context
- FIN-04 canonical commercial events
- FIN-05 monetary/currency semantics
- PRC-02 requisition path — provisional pending ADR-0003
- PRC-03 package path — provisional pending ADR-0003
- PRC-05 tender event
- PRC-06 bidder selection/invitation
- PRC-08 quote/revision evidence
- PRC-10 comparison/levelling
- PRC-12 approval/authority
- PRC-14 award/handoff
- COM-01 commitment record — exact model pending ADR-0004
- COM-04 controlled change
- DOC-01 evidence provenance
- DOC-02 commercial document identity/version
- EXT-01 minimum secure tender-response surface
- INT-01 bounded validated business actions
- UX-01 executable responsive interaction surface

## Conditionality rule

A `SPINE` label does not resolve an open `PRIMARY_REQUIRED` ADR. Where the retained concept depends on one, the matrix names the dependency and the class remains provisional.

Examples:
- PRC-02/PRC-03 do not decide procurement structural root (`ADR-0003`).
- COM-01 does not decide PO/Subcontract type model (`ADR-0004`).
- FIN-02/FIN-06/FIN-08/INT-03 do not decide accounting ownership (`ADR-0005`).

## Conclusion

The re-test removed UI/reporting/planning/generalization convenience from SPINE while retaining transaction truth, authority, historical evidence and the corrected commercial closure path.