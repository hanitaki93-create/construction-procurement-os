# P1.2 — Sourcing v0.4 Delta Sanity Audit v0.1

**Status:** INTERNAL PROVISIONAL CHECK / NOT EXTERNAL PASS  
**Scope:** only consequences of BL-01/BL-02 remediation and the active-leaf/UOM confirmations.

## 1. Test — planned long-lead 100, later detailed demand 80

Initial state:
- PLANNED_REQUIREMENT basis v1 = 100 units;
- RequirementAllocation leaf = 100;
- procurement may already be sourced/awarded/committed.

Later DemandLine proposes 80.

### No downstream exposure / 20 releasable

Expected:
- propose basis v2 = 80;
- release/resize/split 20 first;
- activate v2 only after active consumption <=80.

**Verdict:** PASS_PROVISIONAL.

### 100 awarded, no effective commitment

Expected:
- basis v2 remains proposed/pending;
- revise/cancel/supersede award/allocation to remove excess 20;
- only then activate v2.

**Verdict:** PASS_PROVISIONAL.

### 100 effectively committed

Expected:
- basis v1 remains effective while the 100 contractual exposure exists;
- DemandLine 80 recorded as reconciliation variance/proposed reduction;
- effective negative change/cancellation/termination removes 20 where contractually possible;
- activate v2 only after effective exposure is <=80;
- if exposure cannot be reduced, preserve mismatch rather than falsify prior authorization/commitment.

**Verdict:** PASS_PROVISIONAL.

No `unbacked committed leaf` is required.

## 2. Test — estimate line and procurement-plan line describe same scope

Input:
- ESTIMATE_LINE for 100 doors;
- PROCUREMENT_PLAN_LINE for doors package;
- both refer to the same declared exclusive project/location/scope coverage.

Expected:
- second evidence source is reconciled/attached to the existing PLANNED_REQUIREMENT;
- it does not automatically create a second authorized basis or RequirementAllocation lineage.

**Verdict:** PASS_PROVISIONAL.

## 3. Test — legitimate similar-looking scopes

Input:
- 100 doors for Building A;
- 100 doors for Building B.

Expected:
- scope coverage identity includes location/phase/use or other project breakdown;
- scopes are distinct and may have independent bases.

**Verdict:** PASS_PROVISIONAL.

The uniqueness rule is over declared physical/business coverage, not item name alone.

## 4. Test — free-form scope with ambiguous overlap

Input:
- planning source A: `external works package`;
- planning source B: `landscape + external civil works`.

Expected:
- system cannot pretend deterministic overlap from text alone;
- potential overlap is surfaced;
- controlled human scope identity/split/reconcile decision required before the second independent allocation authority becomes active;
- AI may suggest but cannot silently merge/split authority.

**Verdict:** PASS_WITH_WATCH.

Watch: primary evidence must test whether this control creates unacceptable planning friction. This is implementation/UX risk, not a truth-model contradiction.

## 5. Test — re-tender after no valid bids

Expected:
- tender failure does not release the requirement leaf;
- same active scope can rebind to a new TenderEvent/round;
- no duplicate requirement allocation is created.

**Verdict:** PASS_PROVISIONAL.

## 6. Test — split award after scope uniqueness

Expected:
- one authorized basis/leaf may split into non-overlapping child leaves;
- vendor A and B bind different child scope;
- parent becomes non-counting;
- no second root/basis is created.

**Verdict:** PASS_PROVISIONAL.

## 7. Test — P07 new commitment while basis reduction pending

Expected:
- P07 binding checks current effective basis and unresolved reconciliation;
- new commitment that would conflict with the target reduced scope is blocked/requires reconciliation even though old basis remains historically effective;
- already-effective contractual exposure remains historical truth until changed.

**Verdict:** PASS_PROVISIONAL.

This prevents the old basis from becoming a loophole for additional commitment after a known reduction request.

## 8. Test — UOM conversion

Input:
- requirement basis = 1,000 kg;
- supplier/operating input = 40 bags at governed 25 kg/bag.

Expected:
- versioned factor 25 kg/bag converts to 1,000 kg;
- canonical kg quantity consumes the basis;
- factor/version/precision/rounding preserved.

If bag weight is variable or no governed factor exists, cross-UOM allocation is blocked rather than approximated.

**Verdict:** PASS_PROVISIONAL.

## 9. Internal result

`FAIL_INTERNAL = 0`

One watch:
- free-form overlap resolution may create UX/onboarding friction; test in primary cases and prototype, but do not weaken scope uniqueness to avoid the inconvenience.

## 10. Continuation

The v0.4 remediation is internally coherent enough for external narrow re-review.

This is not external PASS and does not close P1.2.
