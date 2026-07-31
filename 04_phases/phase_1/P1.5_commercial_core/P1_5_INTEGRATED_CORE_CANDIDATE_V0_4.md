# P1.5 — Integrated Commercial Core Candidate v0.4

**Date:** 2026-07-31  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**Supersedes for current audit:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_3.md` where this file differs  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.5 audit semantics are:

1. `P1_5_INTEGRATED_CORE_CANDIDATE_V0_3.md` for unchanged clauses;
2. `P1_5_CLAUDE_ROUND2_REMEDIATION_V0_1.md` for BL-17/BL-18 and W-20–W-24 hardening;
3. `P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md` plus transition supplement for lifecycle membership, subject to the TX-045/TX-049 semantic refinements below.

No ADR status change is implied before external PASS and final reconciliation.

---

# 2. Minimum-credit conservation — closed current rule

For the current supported minimum-obligation semantics:

`applied_credit = min(qualifying_value, residual_before_credit)`

Only applied credit emits `MINIMUM_QUALIFICATION_CREDIT` against the identified minimum `ObligationEffectKey`.

Excess qualifying value emits no:

- negative minimum;
- transferable credit;
- banked credit;
- cross-period credit;
- cross-obligation credit.

It remains ordinary call-off/Commitment value.

The current P1.5 closed set does **not** support carry-forward banking of excess qualifying value.

A future carry-forward mechanism is additive only through controlled prospective architecture change with its own named right/effect, source and target obligation lineages, one-time conservation, correction/expiry and authority/provenance semantics.

Ordinary `MINIMUM_QUALIFICATION_CREDIT` may not be overloaded to implement it.

Where current contracts define separate period minimums without carry-forward, each minimum has its own stable obligation lineage and qualifying value may not be credited twice.

---

# 3. Scope, valuation and capability are three separate axes

## C62 — ScopeBasis

`ScopeBasis` answers what authorized procurement scope is conserved.

Current semantic families include:

- `FIRM_QUANTITY`;
- `REMEASURABLE_QUANTITY`;
- `NON_QUANTIFIED_SCOPE`;
- explicit partition/hybrid forms where already supported by P1.2.

ScopeBasis is RequirementAllocation/authorized-scope truth, not valuation truth.

## C63 — ValuationBasis

`ValuationBasis` answers how contractual monetary value is determined.

Current closed set inherited from P1.2:

1. `FIRM_LUMP_SUM`
2. `UNIT_RATE_REMEASUREMENT`
3. `PROVISIONAL_SUM_ALLOWANCE`
4. `DAYWORK`
5. `MILESTONE`
6. `RATE_BASED_SERVICE`

The relevant Commitment/EconomicComponentKey or governed valuation authority binds the valuation basis/version before authoritative value is produced.

## C64 — CapabilityProfile

`CapabilityProfile` answers which bounded execution/fulfilment/valuation/certification mechanism may operate.

Current closed set:

1. `QUANTITY_GOODS_FULFILMENT`
2. `PROGRESS_VALUATION`
3. `UNIT_RATE_REMEASUREMENT`
4. `MILESTONE_VALUATION`
5. `RATE_BASED_SERVICE`
6. `DELIVERABLE_ACCEPTANCE`
7. `ALLOWANCE_PROVISIONAL_MECHANISM`

`CapabilityProfile` is not the same semantic axis as `ValuationBasis`.

Product-defined compatible compositions are allowed; tenant configuration cannot invent a new axis member.

---

# 4. Closed valuation-basis mapping

| ValuationBasis | Capability treatment |
|---|---|
| `FIRM_LUMP_SUM` | `PROGRESS_VALUATION`, `MILESTONE_VALUATION` or `DELIVERABLE_ACCEPTANCE` according to the bound contract structure; `QUANTITY_GOODS_FULFILMENT` may evidence fulfilment of a fixed baseline without remeasuring that baseline |
| `UNIT_RATE_REMEASUREMENT` | `UNIT_RATE_REMEASUREMENT`, optionally composed with `PROGRESS_VALUATION` for assessment/certification workflow |
| `PROVISIONAL_SUM_ALLOWANCE` | `ALLOWANCE_PROVISIONAL_MECHANISM` plus an explicitly bound underlying supported valuation basis/profile for actual consumption |
| `DAYWORK` | `RATE_BASED_SERVICE` capability as the bounded rate × measured labour/plant/material/time/resource execution mechanism, while `ValuationBasis = DAYWORK` remains explicit |
| `MILESTONE` | `MILESTONE_VALUATION` |
| `RATE_BASED_SERVICE` | `RATE_BASED_SERVICE` |

The mapping preserves the contractual distinction between daywork and ordinary rate-based service.

No P1.2 valuation basis is orphaned.

A provisional allowance may not become authoritative consumption/certification under an unnamed valuation rule.

Instructed/unagreed work likewise requires a named effective contractual valuation authority before provisional certification.

---

# 5. Fixed-goods clarification

A fixed-quantity goods Commitment may use:

- `ScopeBasis = FIRM_QUANTITY`;
- a fixed commercial component/line baseline;
- `QUANTITY_GOODS_FULFILMENT` for accepted/rejected/returned physical fulfilment.

Accepted quantity may support proportional recognition/match under the bound profile, but receipt does not remeasure the fixed contractual baseline.

This does not misclassify firm goods as `UNIT_RATE_REMEASUREMENT`.

---

# 6. Tax hardening

`COMMERCIAL_CERTIFICATE_TAX_COMPONENT` is only a commercial certificate calculation/presentation/net-payable component under an activated versioned policy.

It is never by itself statutory:

- VAT liability;
- date-of-supply/tax point;
- invoice/e-invoice;
- credit note;
- AP liability;
- tax payment/cash truth.

Matching numerical values do not collapse their authority.

---

# 7. AI provenance boundary

If an AI/model/tool-derived value, extraction, mapping, classification or proposal materially influences a governed outcome and satisfies the P1.4 load-bearing test, its influence is provenance-bearing.

Preserve as applicable:

- underlying source evidence/version/location;
- machine-derived/proposed status;
- derivation/tool/model/config execution identity sufficient for supported reconstruction;
- human/domain acceptance/correction/transformation action;
- final authoritative fact/event.

AI-derived content does not become supplier source truth merely because it was extracted from supplier evidence.

Where supplier confirmation is required for contractable truth, the supplier-authoritative confirmation/revision remains distinct.

No agent/model directly writes arbitrary P07 effects.

---

# 8. Security action refinement

TX-049 is read as bounded `SecurityAction`, including as applicable:

- active/effective security reference;
- extension/expiry;
- call/drawdown/claim;
- release authorization;
- released/expired status.

Security call/drawdown is distinct from release.

If a call produces a product commercial recovery, the recovery effect is a separate TX-037 P07 recovery event linked to the security action.

Bank/guarantor cash realization remains external authority.

---

# 9. EffectSubject declaration points

EffectSubject choice is declared and version-bound before effect emission:

- Commitment baseline/effective ChangeBasis → `COMMITMENT_OBLIGATION` subject;
- MinimumObligationBasis → minimum obligation/qualification lineage;
- AdvanceBasis → advance OBLIGATION versus explicit component allocation;
- RecoveryBasis → component-linked versus explicit contract-level recovery;
- activated CertificateTaxCalculationProfile/MonetaryCalculationPolicy → certificate-tax component versus explicit Commitment-level obligation subject;
- `CERTIFIED_GROSS`, `RETENTION_HELD`, `ALLOWANCE_CONSUMPTION` remain component-only.

No projection chooses subject after the fact.

Subject migration requires governed change/reclassification/correction and preserves historical meaning.

---

# 10. ContractingAuthorityContext establishment

TX-045 covers initial establishment and later change of load-bearing ContractingAuthorityContext/authority binding.

Before an in-scope transaction requiring contracting/legal authority can become effective, it binds an effective context/version.

Initial version preserves scope, represented legal/multi-party authority, basis/provenance and effective start.

Later change/retirement is effective-dated with in-flight treatment.

Historical transactions preserve their governing version.

No context establishes cross-tenant or partner access by itself.

---

# 11. Candidate closure effect

Claude round-2 BL-17 candidate status: CLOSED internally.

Claude round-2 BL-18 candidate status: CLOSED internally.

Round-2 watches W-20–W-24: hardened.

P1.2 valuation representation remains intact.

P07 remains the sole independent XL.

A0–A3 remains unchanged and independently viable.

P1.5 remains ACTIVE pending full internal recheck and external round-3 PASS.