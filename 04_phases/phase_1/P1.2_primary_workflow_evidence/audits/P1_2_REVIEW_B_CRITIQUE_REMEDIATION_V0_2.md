# P1.2 — Review B Commercial-Core Critique Remediation v0.2

**Status:** BL-03–BL-08 REMEDIATED / REVIEW B FINAL NARROW RECHECK REQUIRED / NOT FROZEN  
**Supersedes:** `P1_2_REVIEW_B_CRITIQUE_REMEDIATION_V0_1.md` for current provisional interpretation.  
**Upstream:** Review A sourcing PASS remains binding.

## 1. Independent disposition of latest critique

| Finding | Disposition | Current decision |
|---|---|---|
| BL-07 guaranteed-minimum framework drawdown | ACCEPT DIAGNOSIS / REFINE CURE | Scope-backed minimums reserve allocation capacity and call-offs draw down that reservation. Pure monetary minimums are commercial exposure, not fabricated procurement scope. |
| BL-08 remeasurable unconserved state | ACCEPT | A remeasurable commitment always has a hard conservation dimension. Where no genuine quantity cap exists, `SCOPE_PARTITION_BASIS` is mandatory. |
| BL-05 wording obligation | ACCEPT | An instruction that is valid authority for added scope is itself the effective basis-expansion event; no artificial second approval event is required. |
| BL-06 economic-base obligation | ACCEPT | Every fulfillment mechanism resolves its value contribution against a common economic base for the same scope segment/component. |
| W01 rounding + basis-reduction behavior | ACCEPT | Tolerance ceiling is deterministic/versioned under an explicit rounding rule; reduction creates a new basis/tolerance ceiling subject to Review A reconciliation guards. |
| Free-form/object/second-ledger/ADR findings | RETAIN | Prior positions remain unchanged unless contradicted below. |

P1.1 reopening remains **NO**.

---

## 2. BL-07 — guaranteed minimums and call-off drawdown

The v0.1 remediation correctly separated non-consuming `CommercialTermsAuthority` from consuming call-off obligations, but it left a binding minimum ambiguous.

The fix is to distinguish the **economic basis of the minimum obligation**.

### 2.1 `SCOPE_BACKED_MINIMUM`

A framework minimum expressed as identifiable quantity/scope that is part of authorized procurement need.

Example:
- agreement requires minimum purchase of 500 m³ concrete over the term;
- 500 m³ is backed by authorized project/scope capacity.

Required behavior:

1. framework effectiveness creates a **reservation** against existing authorized RequirementAllocation capacity for the minimum scope;
2. reservation is not a second allocation ledger and does not count again when a call-off forms;
3. each call-off converts/draws down part of the reservation into actual committed obligation binding;
4. conserved relation is evaluated over the same lineage:

`unreserved active capacity + reserved-not-called scope + called/committed scope <= effective authorized basis ceiling`

5. a call-off against reserved scope reduces `reserved-not-called` by the same amount it adds to called/committed exposure;
6. no double consumption occurs;
7. call-offs above the reserved minimum may use other available authorized capacity subject to normal Review A rules;
8. residual reservation at expiry/termination must be resolved through governed disposition: release, extend/renew, convert to an effective settlement obligation where contractually required, or another evidenced outcome.

A reservation is therefore a state/use of the existing allocation authority, not a new parallel quantity balance.

### 2.2 `MONETARY_MINIMUM`

Some frameworks impose a minimum spend, fee, take-or-pay amount, or other financial obligation without identifying a fixed physical scope quantity at formation.

Do **not** fabricate RequirementAllocation scope merely to represent that liability.

Required behavior:
- preserve the minimum as explicit contractual/commercial exposure under the terms authority;
- call-offs still bind and consume RequirementAllocation scope normally;
- call-off value may reduce the outstanding monetary-minimum exposure under the agreement's formula;
- any residual cash-only settlement/liability is commercial/accounting exposure, not fake fulfilled procurement scope;
- value/budget/accounting authority remains under P07/P08 / ADR-0005 / ADR-0011.

Review A remains intact because Review A conserves procurement scope. It does not require a fictional physical allocation for a purely monetary liability.

### 2.3 No hidden third ledger

For scope-backed minimums, reservation and call-off are states against the same RequirementAllocation lineage.

For monetary minimums, outstanding minimum exposure is a derived contractual projection from agreement terms + qualifying call-offs/settlements. It is not an editable parallel balance.

### 2.4 ADR-0004

ADR-0004 remains open for physical composition of:
- framework / terms authority;
- minimum-obligation terms;
- call-off/release/order;
- PO/subcontract/service obligations.

The semantic distinction is required; persisted hierarchy is not decided here.

---

## 3. BL-08 — remeasurable quantity may never be unconserved

The phrase `scope partition and/or genuine maximum where one exists` was too loose.

Corrected rule:

> Every effective procurement requirement/commitment scope has a hard Review A conservation dimension at all times.

For `REMEASURABLE_QUANTITY`:

### Case A — real authorized maximum/cap exists

Use:
- `HYBRID` or `QUANTITY_BASIS`, where justified by actual authorization;
- governed maximum quantity/cap is hard;
- measurement resolves inside that ceiling unless authorized scope/basis changes.

### Case B — no genuine quantity maximum exists

`SCOPE_PARTITION_BASIS` is **mandatory**.

- the physical/business scope partition is the hard procurement-authorization dimension;
- estimated BOQ quantity remains planning/valuation metadata;
- actual measured quantity may increase/decrease under the same authorized partition without manufacturing a variation solely because measurement differs;
- rate/formula/cap rules remain contractual valuation controls;
- added physical scope outside the authorized partition still requires governed scope expansion.

There is no valid `REMEASURABLE_QUANTITY` state with neither a quantity/cap basis nor a scope-partition basis.

---

## 4. BL-05 wording closure — instruction can itself expand authorized basis

The current `AuthorizedWorkInstruction` rule is tightened.

Where an instruction:
- is effective under the governing contract;
- is issued by an actor/role valid to authorize that added scope under the applicable authority contract;
- clearly identifies the new scope;

then **that governed instruction is itself the effective source event for authorized requirement-basis expansion**.

No artificial second `approve basis expansion` event is required before the work may be allocated/consumed.

If internal authority is missing or disputed:
- do not silently treat the instruction as cleanly authorized;
- preserve the instruction/external contractual exposure plus governance exception/escalation;
- do not invent supplier price or erase the fact that work was instructed/performed.

Where the instruction remains inside already-authorized remeasurable/non-quantified scope, no basis expansion is created.

Commercial value remains separate and may stay unagreed while measurement/certification proceeds under a named effective valuation authority.

---

## 5. BL-06 wording closure — common economic base across fulfillment mechanisms

Composable fulfillment remains accepted.

Binding principle now:

> Every fulfillment mechanism contributing value for the same commercial scope resolves against a common economic base at the applicable scope-segment/component grain.

The common base must make it possible to identify:
- what economic component is being evidenced/earned;
- its contractual/valuation basis;
- how much of that component has already been recognized;
- whether a later mechanism is evidence/transition of the same value or a separately earnable component.

Example — stored material:
- goods receipt establishes physical receipt/evidence;
- stored-material certification may recognize the material economic component;
- installation/progress may recognize installation and/or transition status;
- the already-certified material component cannot be certified again as new economic value.

`economic_component_id` is a semantic identity requirement, not a mandated new top-level entity.

Exact persisted grain remains P1.5 territory, but anti-double-counting is enforceable in principle now.

---

## 6. W01 — tolerance rounding and basis reduction

A quantitative AuthorizedRequirementBasis version with tolerance must preserve enough information to derive its hard ceiling deterministically.

Required fields/semantics:
- nominal quantity;
- authoritative UOM;
- tolerance type/rule (`ABSOLUTE`, `PERCENT_OF_NOMINAL`, or later governed rule);
- tolerance direction where relevant;
- precision;
- **rounding-policy reference**;
- derived authorized quantity ceiling;
- rule version/effective date/provenance.

Example:

`97 units + 2%` must not silently become `98`, `99`, or `98.94` depending on UI/runtime defaults.

ADR-0022 must resolve the actual rounding/calculation policy, but P1.2 now makes its application **mandatory for hard-invariant computation**.

### Basis reduction

When nominal quantity/tolerance changes:
- create a new proposed basis version;
- derive the new ceiling using that version's governed rule;
- Review A downward-reconciliation rules apply against the new target ceiling;
- lower basis cannot become effective below unresolved allocation/commitment exposure;
- CR-01 blocks conflicting new allocation consumption or commitment binding while reduction is unresolved.

Tolerance does not survive basis-version change implicitly; it must be carried/redefined explicitly in the new version.

---

## 7. W02/W03/W04

### W02

Structurally closed subject to BL-08 correction above:
- remeasurement → scope/quantity basis + unit-rate valuation;
- provisional sum → valuation/allowance mechanism;
- daywork → valuation basis;
- instructed-unagreed work → AuthorizedWorkInstruction + named valuation authority.

No generic bypass remains.

### W03

Retain:
- `DATA_DEFECT`;
- `TRANSPORT_OR_MAPPING_DEFECT`;
- `TEMPORAL_RESTRICTION`;
- `EXTERNAL_AUTHORITY_RETURN`.

Transport/config defects may not mutate commercial truth merely to make integration succeed.

### W04

Retain shared correction invariants plus domain-specific modes:
- `AMEND_NON_ECONOMIC_RECORD`;
- `REVERSE_AND_REPLACE`;
- `FORWARD_ADJUST`;
- `PHYSICAL_REVERSAL`;
- `RECLASSIFY`;
- `NON_DOMAIN_INTEGRATION_CORRECTION`.

---

## 8. Review A compatibility

Review A remains binding:

1. RequirementAllocation conserves procurement scope only.
2. Remeasurable work always has hard conservation through quantity/cap or mandatory scope partition.
3. Scope-backed framework minimum reservation and call-off drawdown use the same allocation lineage.
4. Pure monetary minimum does not fabricate physical allocation scope.
5. Scope-expanding authorized instruction creates valid basis authority before new scope consumption.
6. Tolerance is part of the effective authorized basis ceiling with deterministic rounding.
7. Unresolved reductions block conflicting new allocation consumption and commitment binding.

---

## 9. Second-ledger / object posture

Retain prior Review B position:
- retention/advance/recoupment/allowance remaining are projections over authoritative events;
- scope-backed minimum reservation is a state/projection on the existing allocation lineage, not an independent ledger;
- monetary-minimum outstanding exposure is derived from terms + qualifying obligation/settlement events;
- no editable competing current-balance fields;
- AP/payment/job-cost remains controlled by field/event authority.

`ValuationAssessment` remains semantically distinct; physical persistence is still evidence-dependent.

---

## 10. ADR posture

Still open:
- ADR-0004 physical PO/Subcontract/Framework/CallOff composition;
- ADR-0005 commercial/accounting ownership;
- ADR-0011 budget authority;
- ADR-0015 correction physical model;
- ADR-0018 workflow-financial seam;
- ADR-0019/0020 effective dating/config binding;
- ADR-0021 integration authority;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 concurrency/idempotency/numbering.

P1.1 REOPEN = **NO**.

---

## 11. Gate

Run one final narrow Review B recheck over:
- BL-07;
- BL-08;
- BL-05 wording obligation;
- BL-06 economic-base obligation;
- W01 rounding/reduction behavior;
- direct regressions introduced by this remediation.

Review C remains blocked until external Review B returns PASS.