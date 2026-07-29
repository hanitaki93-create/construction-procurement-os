# P1.2 — Sourcing Review A Final Verdict

**Status:** EXTERNAL HOSTILE REVIEW A PASS / SOURCING SUBGRAPH COHERENT / NOT FROZEN  
**Date:** 2026-07-29  
**Scope:** P01–P06 sourcing mechanics through AwardDecision, including RequirementAllocation and BL-01/BL-02 remediation.

## 1. Final external verdict

External hostile review returned:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

No blocking findings remain in Review A.

## 2. Closed blocker history

The Review A cycle now records:
- B1 supplier-confirmed economic-basis ownership/provenance — CLOSED;
- B2 evaluated basis vs contractable agreed basis — CLOSED;
- B3 competing allocation writers — CLOSED via one RequirementAllocation lineage;
- B4 FX/tax comparison reproducibility — CLOSED;
- B5 scope/quantity correctness vs value/budget governance — CLOSED;
- B6 every sourcing route enters allocation authority before tender — CLOSED;
- BL-01 downward authorized-basis reconciliation below consumed exposure — CLOSED;
- BL-02 parallel planned requirement authority over the same exclusive scope — CLOSED;
- ADR-0003/ADR-0004 anchoring concern — CLEAN;
- P1.1 reopen — NO.

## 3. Required correction CR-01 — accepted and binding

Review A returned no blocker but required one correction before build:

> no new allocation consumption **or commitment** may use the prior effective basis where it conflicts with an unresolved reduction target.

Binding rule:

When a basis-reduction proposal is pending:
- the prior basis remains historically/effectively authoritative until exposure is reconciled;
- existing exposure remains backed by that prior basis;
- **new allocation consumption that would conflict with the unresolved target reduction is blocked**;
- **new commitment binding that would conflict with the unresolved target reduction is blocked**;
- release/reduction/reconciliation operations remain allowed where they move exposure toward the target;
- the lower basis becomes effective only when unresolved active exposure fits the new authorized scope.

This closes the loophole where a still-valid old basis could otherwise be consumed further while a known reduction is pending.

## 4. Scope-uniqueness enforcement limitation — explicit

For deterministically identifiable scope, uniqueness may be system-enforced.

For free-form or semantically overlapping scope with no reliable natural key, uniqueness is partly **process-enforced**:
- overlap candidates are surfaced;
- controlled human scope-identity/reconcile/split decision is required before a second authority becomes active;
- AI may suggest but cannot silently establish, merge, split, or supersede requirement authority.

This limitation is intentional and must be tested for onboarding/UX friction in primary cases and prototype work.

## 5. Shared/joint responsibility — governed exception only

`SHARED/JOINED_RESPONSIBILITY` is not a convenience flag and cannot be used as a routine escape from exclusive-scope uniqueness.

It requires a named governed authorizing act preserving:
- affected authorized basis/bases;
- exact shared scope/partition;
- why simultaneous authority does not imply unintended double procurement;
- approving actor/role/authority;
- evidence;
- effective date/time;
- expiry/review condition where applicable.

The default remains exclusive scope ownership.

## 6. Active-leaf / UOM confirmations — closed

Review A confirmed:
- active-leaf semantics are coherent and explicit release is required;
- tender failure/re-tender does not itself free authorized scope;
- one authoritative conservation UOM exists per quantitative basis version;
- cross-UOM allocation is allowed only through governed deterministic conversion with exact factor, version, precision, rounding and provenance;
- non-deterministic conversions cannot support a hard conservation invariant.

## 7. ADR-0003 recording obligation

ADR-0003 remains `PROPOSED / PENDING`.

The following is now a recorded later design question:

Because `DEMAND_LINE` and `PLANNED_REQUIREMENT` expose the same AuthorizedRequirementBasis conservation/change-control contract, P1.4/P1.5 must decide whether they:
- remain separate entity types;
- collapse into one requirement entity with an origin discriminator;
- or use another physical model.

Review A does not decide this.

## 8. ADR-0005 / ADR-0011 forward obligation

P06 budget/estimate context remains contextual approval evidence only.

Historical approval must preserve the source/snapshot/freshness/variance basis actually seen by approvers. Later P07/P08 authority decisions may supersede current financial truth but may not rewrite historical decision evidence.

## 9. Sourcing pass meaning

Review A PASS means:
- P01–P06 sourcing mechanics are coherent enough to be used as upstream assumptions for Review B;
- the sourcing hostile-review blockers are closed;
- no further sourcing critique is required before Review B unless downstream review exposes a direct contradiction.

It does **not** mean:
- P1.2 final PASS;
- primary contractor evidence gate satisfied;
- ontology frozen;
- ADR-0003/0004 resolved;
- build authorized.

## 10. Next external gate

Proceed to:

**Review B — P07A–P07D Commercial Core + P08 Accounting/ERP Authority Seam.**

Review B remains a hostile structural review before structural architecture/freeze.