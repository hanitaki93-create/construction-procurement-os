# P1.1-D — Implementation Burden Budget v0.3

**Status:** PROVISIONAL / NOT FROZEN  
**Supersedes:** `P1_1_BURDEN_BUDGET_V0_2.md`  
**Inheritance:** all v0.2 cost/retrofittability definitions, workstream postures and numeric guardrails remain binding except where strengthened below.

## 1. Missing protective guardrail — now binding

Retrofittability is not only a deferral instrument.

**Mandatory rule:**

> Any area classified `IMPOSSIBLE` to retrofit must be `SPINE` or `INTERFACE-ONLY`. It may never be `THIN` or `OUT`, regardless of implementation cost.

Consequences:
- `IMPOSSIBLE` substrate is pulled into the retained architecture even when its initial implementation surface is narrow;
- implementation cost may cause sub-slicing, but never deletion of the invariant/data contract;
- `XL + CHEAP` remains the first deferral class;
- `XL + IMPOSSIBLE` is retained and sub-sliced rather than demoted.

This rule has precedence over the one-XL-gravity-well guardrail where an otherwise omitted invariant would destroy unrecoverable history. If such a case creates a second independent XL SPINE gravity well, P1.1 must reopen rather than silently demote it.

## 2. Full THIN/OUT retrofit audit

Canonical audit:

`P1_1_RETROFIT_AUDIT_V0_3.csv`

All **28 THIN + 15 OUT = 43** areas were explicitly scored.

Result:
- `IMPOSSIBLE`: **0** among THIN/OUT
- every THIN/OUT area is `CHEAP` or `EXPENSIVE` to retrofit;
- irreversible aspects previously hidden inside broader areas are separated into retained SPINE substrate rather than left inside THIN/OUT.

Two explicit separations are added by the v0.3 scope amendment:
1. retention / advance / recoupment **positions** are SPINE even though broad certification workflow stays THIN;
2. canonical bid-line/comparison structure is SPINE even though bid-form configurability stays THIN.

## 3. Numeric guardrails retained

1. Maximum independent XL SPINE gravity wells: **1**, unless an `IMPOSSIBLE` invariant forces reopening rather than demotion.
2. `XL + CHEAP` may not be SPINE.
3. Standard-config new tenant target to first live tender: **≤5 working days** from clean onboarding inputs.
4. Bespoke named connector implementations required before first live tender: **0**.
5. Any new `IMPOSSIBLE` finding in THIN/OUT automatically reopens the scope classification.

## 4. Current conclusion

The one independent XL SPINE gravity well remains:

**commitment + change + valuation + commercial truth**.

The corrected retrofit audit does not reveal a second hidden irreversible gravity well in current THIN/OUT scope.

This remains provisional until hostile recheck passes.
