# P1.5 — Claude Round-2 Remediation v0.1

**Date:** 2026-07-31  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent candidate:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_3.md`  
**External audit:** `audits/P1_5_CLAUDE_ROUND_2_VERDICT_V0_1.md`  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close Claude round-2 blockers:

- BL-17 — minimum over-credit/carry-forward ambiguity;
- BL-18 — valuation-basis versus capability-profile ambiguity.

Also harden watches W-20 through W-24 where the semantic boundary is cheap and non-retrofittable.

No P1.1–P1.4 decision is reopened.

No ADR status changes occur in this artifact.

---

# 2. BL-17 — minimum credit rule is absolute for the current closed set

## R17.1 — applied credit

For an active monetary minimum obligation lineage:

`applied_credit = min(qualifying_value, residual_before_credit)`

Only `applied_credit` may emit `MINIMUM_QUALIFICATION_CREDIT` against that minimum `ObligationEffectKey`.

## R17.2 — excess qualifying value has no transferable minimum-credit effect

For the current P1.5 closed semantic set:

> qualifying value above the current residual minimum emits **no** additional minimum-credit, banked-credit, carry-forward-credit, negative-minimum or transferable-right effect.

The excess remains ordinary call-off/Commitment value and source evidence only.

It cannot reduce:

- another minimum obligation;
- another period's minimum;
- another ContractingAuthorityContext's minimum;
- a future minimum lineage;

unless a future controlled architecture change introduces an explicit supported carry-forward/right mechanism.

There is no `by default` escape.

## R17.3 — carry-forward is unsupported in the current closed set, not silently approximated

A contract whose enforceable economics require banking/carry-forward of excess qualifying value cannot be represented by pretending the excess is ordinary `MINIMUM_QUALIFICATION_CREDIT`.

Until a future mechanism is accepted, that contractual feature is an explicit unsupported/exception condition for the current minimum profile.

A future carry-forward mechanism must be prospective and must define before activation:

- a distinct named right/effect; it may not reuse ordinary `MINIMUM_QUALIFICATION_CREDIT` ambiguously;
- source minimum `ObligationEffectKey` and target minimum/period lineage;
- amount eligible for transfer;
- creation/effective/expiry rules;
- one-time consumption/conservation rule;
- correction/reversal;
- authority/evidence/config binding;
- interaction with call-off obligation and residual-minimum derivation;
- historical treatment when profile/rules change.

Existing minimum/call-off events retain their original meaning.

## R17.4 — multi-period minimums use distinct obligation lineages

Where the current supported contract defines separate period minimums without carry-forward, each enforceable period minimum has its own stable `ObligationEffectKey`/effective basis.

A qualifying call-off is credited only to the minimum lineage(s) explicitly identified by the governing current rule; the same qualifying economic value cannot be credited twice.

---

# 3. BL-18 — scope basis, valuation basis and capability profile are orthogonal axes

## R18.1 — three separate semantic axes

P1.5 preserves three non-collapsible dimensions:

### A. Scope / quantity authority basis

Answers:

> what physical/non-physical scope is authorized and conserved?

Current P1.2 families remain:

- `FIRM_QUANTITY`;
- `REMEASURABLE_QUANTITY`;
- `NON_QUANTIFIED_SCOPE`;

plus explicit scope partition/hybrid mechanics where P1.2 requires them.

This is RequirementAllocation / authorized-scope truth. It is not monetary valuation.

### B. ValuationBasis

Answers:

> by what contractual rule is the monetary value of the component/work determined?

The current closed P1.2 valuation-basis set is:

1. `FIRM_LUMP_SUM`
2. `UNIT_RATE_REMEASUREMENT`
3. `PROVISIONAL_SUM_ALLOWANCE`
4. `DAYWORK`
5. `MILESTONE`
6. `RATE_BASED_SERVICE`

A valuation basis is bound to the relevant Commitment/EconomicComponentKey or governed valuation authority and is load-bearing/versioned where it affects value.

### C. CapabilityProfile

Answers:

> which bounded lifecycle/fulfilment/valuation/certification mechanism is permitted to operate on that Commitment/component?

The current closed P1.5 capability set remains:

1. `QUANTITY_GOODS_FULFILMENT`
2. `PROGRESS_VALUATION`
3. `UNIT_RATE_REMEASUREMENT`
4. `MILESTONE_VALUATION`
5. `RATE_BASED_SERVICE`
6. `DELIVERABLE_ACCEPTANCE`
7. `ALLOWANCE_PROVISIONAL_MECHANISM`

Capability profile is **not** the valuation-basis axis.

Compatible product-defined compositions are allowed because a single commercial component may need a fulfilment mechanism and a valuation/certification mechanism simultaneously.

Tenant configuration cannot invent a new valuation basis or capability profile.

## R18.2 — closed valuation-basis mapping

Every current P1.2 valuation basis maps into the P1.5 capability model as follows.

| P1.2 ValuationBasis | P1.5 capability treatment | Meaning preserved |
|---|---|---|
| `FIRM_LUMP_SUM` | `PROGRESS_VALUATION`, `MILESTONE_VALUATION` or `DELIVERABLE_ACCEPTANCE` according to the bound contract structure; `QUANTITY_GOODS_FULFILMENT` may evidence fulfilment of a fixed baseline without remeasuring the contract value | total/component contractual value is fixed except governed change; progress/milestone/deliverable/receipt determines recognition or certification under the bound profile |
| `UNIT_RATE_REMEASUREMENT` | `UNIT_RATE_REMEASUREMENT`, optionally composed with `PROGRESS_VALUATION` for assessment/certification workflow | measured quantity × bound unit-rate rules determines value inside authorized scope; no fake VO merely because measured quantity differs from estimate |
| `PROVISIONAL_SUM_ALLOWANCE` | `ALLOWANCE_PROVISIONAL_MECHANISM` plus an explicitly bound underlying valuation basis/profile for actual consumption | allowance is a governed commercial capacity/basis; actual consumption must state how the consumed work/value is valued |
| `DAYWORK` | `RATE_BASED_SERVICE` capability used as the bounded **rate × measured input/time/resource execution mechanism**, while `ValuationBasis = DAYWORK` remains explicit | daywork remains daywork; labour/plant/material/time records and contractual daywork rates determine value under named authority |
| `MILESTONE` | `MILESTONE_VALUATION` | milestone entitlement/achievement rule determines the valued/certifiable component |
| `RATE_BASED_SERVICE` | `RATE_BASED_SERVICE` | service units/time/output × bound contractual rates determine value |

The label `RATE_BASED_SERVICE` is therefore a capability mechanism broad enough to execute bounded rate-based measured valuation; it does **not** erase the `DAYWORK` versus `RATE_BASED_SERVICE` contractual distinction because `ValuationBasis` remains separately bound.

## R18.3 — fixed goods do not create a hidden seventh/eighth valuation basis

For a fixed goods Commitment using `FIRM_QUANTITY` scope plus a fixed component/line baseline:

- `QUANTITY_GOODS_FULFILMENT` determines accepted/rejected/returned physical fulfilment;
- component commercial value follows the bound fixed baseline/rate economics of the Commitment;
- accepted quantity may determine proportional recognition/match basis where the profile permits;
- physical receipt does not remeasure the contractual baseline merely because value is allocated across units.

This does not invent a `UNIT_RATE_REMEASUREMENT` valuation where quantity is contractually firm.

## R18.4 — provisional-sum consumption cannot stay valuation-undefined

A `PROVISIONAL_SUM_ALLOWANCE` may not emit authoritative allowance consumption/certified value against an unnamed valuation rule.

Before value becomes effective, the consumed work must bind one supported underlying valuation basis/profile or another named contractual valuation authority already supported by the core.

No generic `PROVISIONAL` bypass exists.

## R18.5 — instructed work keeps valuation authority explicit

`AuthorizedWorkInstruction` is scope/work authority, not final price.

Provisional certification before final agreement still requires a named effective contractual valuation authority, such as:

- applicable existing `UNIT_RATE_REMEASUREMENT` basis;
- `DAYWORK` basis;
- provisional/allowance basis with an underlying valuation rule;
- another currently supported bound basis.

Later agreement/change reconciles the earlier effect non-destructively.

---

# 4. W-20 — commercial certificate tax is never statutory liability

`COMMERCIAL_CERTIFICATE_TAX_COMPONENT` is a product commercial certificate-calculation component used only for the commercial certificate's own presentation/derived net-payable semantics under its activated policy.

It never by itself constitutes:

- statutory VAT liability;
- statutory date-of-supply/tax point;
- statutory tax invoice/e-invoice;
- statutory tax credit note;
- AP liability;
- tax payment/cash truth.

Those facts retain their separately bound P1.4 authority profiles.

A report/payment interface must never label the commercial certificate-tax component as statutory VAT liability merely because the numbers currently match.

---

# 5. W-21 — AI-derived values preserve outcome provenance but never become supplier source truth silently

Phase 1 owes AI a deterministic boundary, not an AI implementation.

Where an AI/model/tool-derived value, mapping, extraction, classification or proposal is used in a governed decision or state-changing command and satisfies the frozen P1.4 load-bearing test, preserve enough provenance to reconstruct its influence.

At minimum the load-bearing chain preserves as applicable:

- underlying source evidence/version/location;
- that the value was machine-derived/proposed rather than supplier-originated;
- derivation/tool/model/config execution identity sufficient for supported reconstruction without requiring P1.5 to design the P1.10 AI platform;
- any human/domain action that accepted, corrected or transformed the proposal;
- the final authoritative fact/event that actually governed the outcome.

AI-derived content enters the deterministic core as normalized/internal proposal/derived information according to its domain layer.

It does **not** become supplier source truth merely because a model extracted it.

Where supplier confirmation is required to establish contractable supplier truth, confirmation creates/preserves the appropriate supplier-authoritative revision/fact rather than rewriting the AI proposal as if it had always been supplier-authored.

Agents/models still gain no direct authority to emit arbitrary P07 effects.

---

# 6. W-22 — security call/drawdown is distinct from security release

TX-049 semantics are refined from release-only wording to the bounded **Security Action** family.

Security lifecycle facts may include:

- effective/active security reference;
- expiry/extension;
- call/drawdown/claim action;
- release authorization;
- released/expired status.

`CallSecurity` / drawdown is not `ReleaseSecurity`.

A security call may link to TX-037 recovery/contra only when a governed product commercial recovery fact/effect is actually recognized under P07.

External bank/guarantor cash realization/payment remains external authority unless explicitly supported otherwise.

P11 does not become a banking/guarantee administration platform.

---

# 7. W-23 — EffectSubject discriminator declaration points

Subject class is never selected by projection convenience.

The declaration point is load-bearing and version-bound before the effect occurs:

- `COMMITMENT_OBLIGATION` — Commitment baseline or effective ChangeBasis declares component versus obligation subject;
- `MINIMUM_OBLIGATION` / `MINIMUM_QUALIFICATION_CREDIT` — MinimumObligationBasis declares the exact obligation lineage;
- `ADVANCE_OUTSTANDING_EFFECT` — `AdvanceBasis` declares contract-level OBLIGATION or explicit component allocation before advance recognition/recoupment;
- `RECOVERY_EFFECT` — `RecoveryBasis` declares component-linked or explicit contract-level OBLIGATION basis before recovery effect;
- `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` — activated `CertificateTaxCalculationProfile` / MonetaryCalculationPolicy declares component calculation or explicit certificate/Commitment-level OBLIGATION subject before certification;
- `ALLOWANCE_CONSUMPTION`, `CERTIFIED_GROSS`, `RETENTION_HELD` — component subject is mandatory by the closed matrix.

A subject declaration change affecting in-flight/history uses explicit governed change/correction/reclassification and never retroactively changes prior effect subject meaning.

---

# 8. W-24 — initial ContractingAuthorityContext establishment is governed

TX-045 is refined to cover **ContractingAuthorityContext / authority binding establishment and change**, not change only.

Before a load-bearing transaction requiring contracting/legal authority can become effective, it binds an effective `ContractingAuthorityContext` version.

Initial establishment is version 1/equivalent governed authority fact and preserves:

- tenant/project scope;
- represented legal entity or bounded multi-party arrangement;
- authority/evidence basis;
- effective start;
- provenance/version;
- permitted scope where relevant.

Later change/retirement uses effective-dated governed transition with in-flight treatment.

Historical transactions keep the exact context/version that governed them.

Initial establishment does not grant access to a partner or other tenant.

---

# 9. Candidate impact

BL-17 is closed by an absolute current-set rule: no excess/cross-period transferable minimum credit exists in the current model.

BL-18 is closed by explicit orthogonality and mapping:

`ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile`.

All six P1.2 valuation bases have a named P1.5 home.

No new independent profile/ledger/gravity well is introduced.

P07 remains sole independent XL.

A0–A3 is unaffected because these mechanics sit in P07/A4/cross-cutting authority boundaries.

P1.5 remains ACTIVE pending internal recheck and Claude round-3 agreement.