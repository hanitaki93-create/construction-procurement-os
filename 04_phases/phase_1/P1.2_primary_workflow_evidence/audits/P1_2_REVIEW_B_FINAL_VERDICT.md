# P1.2 — Review B Final Verdict

**Date:** 2026-07-29  
**Scope:** P07A–P07D + P08 commercial core / accounting seam  
**Status:** **PASS / PROVISIONAL / PRIMARY AUDIT STILL REQUIRED / NOT FROZEN**

## Verdict

External hostile review returned:

`PASS — P07/P08 coherent; proceed to Review C`

Review B is structurally closed for progression into Review C.

This does **not** mean:
- P1.2 is closed;
- P07/P08 ontology is frozen;
- primary contractor evidence is satisfied;
- ADR-0004/0005/0011/0015/0018/0019/0020/0021/0022/0023 are resolved;
- product build is authorized.

## Closed findings

Review B closed:
- BL-03 framework / rate authority / call-off representation;
- BL-04 firm-quantity assumption;
- BL-05 instructed-but-unagreed work path;
- BL-06 false PO/subcontract fulfillment bifurcation;
- BL-07 guaranteed-minimum framework drawdown semantics;
- BL-08 mandatory hard conservation for remeasurable scope;
- W01 receipt/quantity tolerance conservation;
- W02 remeasurement / provisional sum / daywork / instructed work valuation semantics;
- W03 integration rejection/correction direction;
- W04 domain-specific correction taxonomy.

Second-ledger check: **CLEAN**.

Review A regression: **NO**.

ADR-0004 physical model: **OPEN as intended**.

P1.1 reopen: **NO**.

## Binding commercial-core distinctions carried forward

1. `CommercialTermsAuthority` is distinct from consuming committed obligation.
2. Scope-backed framework minimums reserve capacity on the existing RequirementAllocation lineage; call-offs draw down reservation rather than consume twice.
3. Pure monetary minimums are commercial exposure and do not fabricate physical procurement scope.
4. A framework may carry both a scope-backed minimum and a monetary minimum simultaneously; the same qualifying call-off may draw down scope reservation and reduce monetary-minimum exposure under separate governed relations.
5. `REMEASURABLE_QUANTITY` always has a hard conservation dimension: real quantity/cap when genuine, otherwise mandatory `SCOPE_PARTITION_BASIS`.
6. Scope/quantity basis is orthogonal to valuation basis.
7. A valid governed scope-adding instruction may itself be the effective source event for basis expansion when the issuer has the required authority; it does not manufacture supplier-agreed final price.
8. Mixed fulfillment mechanisms resolve against a common economic base so one material/work value cannot be earned twice.
9. Quantity tolerance is pre-authorized scope on the basis version and requires deterministic rounding-policy reference.
10. Basis reduction recalculates/redefines tolerance explicitly and obeys Review A downward-reconciliation + CR-01.
11. Retention, advance, recoupment, allowance remaining, framework reservation and monetary-minimum exposure remain event-backed/derived positions, never independent editable balances.
12. AP/payment/job-cost authority remains explicit through P08 OWN/MIRROR/REFERENCE semantics.

## Non-blocking carry-forward obligations

### Dual minimum

Implementation/structural design must allow one framework to contain both:
- `SCOPE_BACKED_MINIMUM`; and
- `MONETARY_MINIMUM`.

These are not mutually exclusive.

### ADR-0022 hard dependency

Rounding/calculation policy is no longer purely presentational because quantity-tolerance ceilings participate in hard conservation.

Exact physical design remains ADR-0022/P1.5, but deterministic policy reference is mandatory.

### Economic-component matching

P1.5 must define the persisted grain/mechanism for cross-fulfillment anti-double-counting. The invariant is already fixed:

> one economic component may be recognized/earned only once even when multiple fulfillment mechanisms provide evidence or stage transitions.

### Primary evidence

Blind contractor evidence remains mandatory for:
- actual commitment-formation events;
- framework/call-off practice;
- remeasurement/provisional sums/dayworks;
- instructed/unagreed work;
- mixed supply/install valuation;
- retention/advance;
- ERP authority and correction practice.

Secondary reference does not close those evidence requirements.

## Gate

Review C is now authorized as the active external gate:

**P09–P12 + complete P01–P12 burden/completeness/reversibility review.**
