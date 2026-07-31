# P1.5 — Integrated Commercial Core Candidate v0.3

**Date:** 2026-07-31  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / CLAUDE ROUND-2 REQUIRED  
**Supersedes for current audit:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_2.md` where this file or its incorporated remediation differs.  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.5 audit semantics are the combination of:

1. `P1_5_INTEGRATED_CORE_CANDIDATE_V0_2.md` for unchanged core clauses;
2. `P1_5_COMPLETENESS_HARDENING_V0_1.md`;
3. `P1_5_CLAUDE_ROUND1_REMEDIATION_V0_1.md` — controls where it changes tax/effect-grain/lifecycle semantics;
4. `P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md` — closed candidate transaction membership;
5. `P1_5_TRANSACTION_TRANSITION_SUPPLEMENT_V0_1.md` — late/cross-cutting transition contracts.

This v0.3 states the resulting consolidated decisions that materially changed after Claude round 1.

No ADR status changes are implied before Claude round-2 PASS and final reconciliation.

---

# 2. Tax authority — closed candidate

## C51 — product commercial tax and statutory tax are different facts

The ambiguous prior `CERTIFICATE_TAX_COMPONENT` is replaced by:

`COMMERCIAL_CERTIFICATE_TAX_COMPONENT`.

It is product-owned only when an activated versioned commercial certificate calculation profile requires the OS to calculate that certificate component.

Default V1 authority posture:

- statutory tax point/date-of-supply: external `MIRROR / REFERENCE / OUT` according to deployment authority profile;
- statutory tax invoice/e-invoice: external `MIRROR / REFERENCE / OUT` unless a future explicitly supported deployment assigns that exact fact to the OS;
- statutory tax credit-note/adjustment: external statutory authority by default;
- statutory tax liability/posting/payment: external accounting/tax authority;
- product commercial certificate-tax component: `OWN` only under activated commercial certificate policy.

One load-bearing tax fact has one authority profile per effective period.

Statutory tax divergence does not overwrite product certified commercial truth. Reconciliation/correction uses separate governed facts/actions.

---

# 3. CommercialEffectVector subject grain — closed candidate

## C52 — every monetary P07 effect has exactly one subject

Every effect resolves to:

`Commitment + EffectSubject`

with `EffectSubject` exactly one of:

- `COMPONENT(EconomicComponentKey)`; or
- `OBLIGATION(ObligationEffectKey)`.

There is no implicit `where applicable` exception and no third ad hoc grain.

## C53 — component mapping is governed

If existing line/SOV/milestone/deliverable/service/scope identities cannot unify the same underlying economic value, P07 uses governed `DefineEconomicComponentMapping` with source identities, reason, authority, version/provenance, current Commitment/profile and no conflicting recognition lineage.

Receipt/certificate/UI/AI cannot invent an ad hoc component key.

## C54 — obligation-level key is bounded

`ObligationEffectKey` is a stable Commitment-scoped non-component obligation identity for an explicitly supported obligation-level effect such as monetary minimum or contract-level advance.

It is not a parking bucket for unresolved component grain.

## C55 — dimension/subject matrix

| Dimension | Subject rule |
|---|---|
| `COMMITMENT_OBLIGATION` | COMPONENT or OBLIGATION fixed by baseline/profile; never both for same value |
| `MINIMUM_OBLIGATION` | OBLIGATION only |
| `MINIMUM_QUALIFICATION_CREDIT` | same OBLIGATION lineage as minimum |
| `CERTIFIED_GROSS` | COMPONENT only |
| `RETENTION_HELD` | COMPONENT only |
| `ADVANCE_OUTSTANDING_EFFECT` | OBLIGATION by default; COMPONENT only under explicit component-allocated advance basis |
| `ALLOWANCE_CONSUMPTION` | COMPONENT only |
| `RECOVERY_EFFECT` | COMPONENT when component-linked; OBLIGATION only for explicit contract-level recovery basis |
| `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` | COMPONENT where component-calculated; OBLIGATION only under explicit certificate/Commitment-level calculation policy |

Subject class is bound by the governing profile/event, not selected later by projection convenience.

## C56 — conservation by subject lineage

- component effects conserve by EconomicComponentKey lineage;
- obligation effects conserve by ObligationEffectKey lineage;
- movement between subject classes requires explicit governed mapping/reclassification/correction;
- split/merge/reclassification does not reset prior contribution.

---

# 4. Minimum / advance hardening

## C57 — minimum credit cannot go negative

For a monetary minimum:

`applied_credit = min(qualifying_value, residual_before_credit)`.

Only applied credit enters `MINIMUM_QUALIFICATION_CREDIT`.

Excess qualifying call-off value remains ordinary call-off obligation/evidence and does not become a negative/transferable minimum credit unless a separate supported contractual right explicitly exists.

## C58 — advance never reduces gross certification

`ADVANCE_OUTSTANDING_EFFECT` never enters `CERTIFIED_GROSS` derivation.

Recoupment changes advance outstanding and, where applicable, net-payable presentation only. Gross earned/certified value remains independent.

---

# 5. Capability-profile set — closed candidate

The supported semantic profile set for this P1.5 candidate is exactly:

1. `QUANTITY_GOODS_FULFILMENT`
2. `PROGRESS_VALUATION`
3. `UNIT_RATE_REMEASUREMENT`
4. `MILESTONE_VALUATION`
5. `RATE_BASED_SERVICE`
6. `DELIVERABLE_ACCEPTANCE`
7. `ALLOWANCE_PROVISIONAL_MECHANISM`

Supported product-defined compatible compositions are allowed.

Tenant configuration cannot create a new mechanism/profile.

A new profile requires prospective controlled change defining subject grain, lifecycle, guards, correction, conservation, derivation and compatibility before use.

---

# 6. Closed lifecycle membership — candidate

## C59 — authoritative transaction membership artifact

Lifecycle completeness is tested against:

`P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md`.

Current closed candidate membership is `TX-001` through `TX-056`.

The register is selected by the frozen P1.4 load-bearing test and explicitly excludes projection-only/display/cache/external-out-of-scope activity from fake lifecycles.

## C60 — complete transition contract

Every current product state-changing register member has the semantic contract:

1. source state/context;
2. bounded command/action;
3. guards/domain invariants;
4. authority/control;
5. result event/state;
6. economic effect or explicit none/scope/external classification;
7. correction/reversal/supersession;
8. concurrency/idempotency;
9. evidence/config/version binding.

Coverage sources are the original P01–P12 lifecycle matrix plus the completeness hardening, round-1 remediation and transition supplement.

## C61 — future additions

Future load-bearing transaction membership is prospective and controlled.

Before activation, a new family must enter a new register version, define the full transition contract, define effect subject/authority/derivation impact where relevant, preserve old event meaning/history and pass affected golden-thread/Ceiling/Closed-Subgraph checks.

GT1–GT4 are cross-domain execution samples, not membership proof.

---

# 7. Core decisions unchanged from v0.2

Unless explicitly superseded above, v0.2 retains:

- polycentric procurement graph; no universal package/allocation/case root;
- award != Commitment;
- semantic Commitment core with kind/profile differences and no mini-ledgers;
- CommercialTermsAuthority separate from ordinary obligation;
- enforceable monetary minimum represented as P07 obligation lineage;
- one-economic-value-once;
- immutable signed CommercialEffectVector algebra, not GL;
- claim != assessment != certification;
- exact decimal + versioned MonetaryCalculationPolicy + purpose-specific FX;
- controlled suspense attribution before Commitment with downstream resolution gates;
- history-preserving correction and hybrid effective/record temporal semantics;
- workflow outcome consumed by deterministic domain action, never financial truth itself;
- bounded typed configuration;
- immutable internal IDs separate from versioned display numbering;
- direct-source route without fake tender;
- invoice match without AP ownership;
- actual physical/commercial/accounting/cash authorities distinguished;
- long-lead thin milestone overlay and event-derived actual status;
- P07 sole independent XL;
- A0–A3 independently viable;
- future AI/agents act only through bounded domain commands.

---

# 8. Current audit posture

Claude round 1:

- BL-14 tax authority: remediated by C51;
- BL-15 effect grain: remediated by C52–C58;
- BL-16 lifecycle closed set: remediated by C59–C61 + register/supplement.

Watches addressed:

- minimum over-credit: explicit;
- advance vs gross certification: explicit;
- component fallback authority: governed;
- capability list: closed.

No P1.1–P1.4 reopening is proposed.

No second XL is introduced.

P1.5 remains ACTIVE until internal recheck + Claude round-2 review agree.
