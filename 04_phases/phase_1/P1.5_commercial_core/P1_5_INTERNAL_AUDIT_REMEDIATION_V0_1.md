# P1.5 — Internal Audit Remediation v0.1

**Date:** 2026-07-30  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK PENDING  
**Parent audit:** `audits/P1_5_INTERNAL_HOSTILE_AUDIT_V0_1.md`  
**P1.5:** ACTIVE  
**Product code:** LOCKED

---

## 1. Purpose

Close internal blockers BL-P15-01 through BL-P15-03 and harden W-P15-01/W-P15-06 without changing ADR statuses.

BL-P15-04 is handled by the separate full SPINE lifecycle matrix.

BL-P15-05 requires targeted authoritative external evidence and is not claimed closed by this artifact.

---

# 2. BL-P15-01 remediation — framework/minimum obligation identity

## R-P15-01 — terms authority never hides an obligation

`CommercialTermsAuthority` remains reusable commercial terms authority.

It is not the authoritative owner of committed value merely because rates, formulas, call-off conditions or other reusable terms exist.

If effectiveness of an arrangement itself creates an enforceable monetary minimum / take-or-pay / fee obligation, that economic obligation creates a linked **Commitment obligation lineage** under the same P07 commercial kernel.

Candidate commitment kind/profile:

`MINIMUM_OBLIGATION`

The exact business display label may follow the underlying framework/contract terminology; the semantic point is that the obligation is represented by Commitment truth, not hidden in terms metadata.

## R-P15-02 — minimum obligation and call-offs are separate but offset-linked

Each effective call-off/release/order remains its own Commitment.

A call-off may qualify against a linked minimum obligation according to the exact governing terms-authority rule.

The qualification is explicit through a `MinimumQualificationEffect` or equivalent bounded relationship/effect.

It does not:

- reduce the call-off's own obligation;
- create fake physical requirement quantity;
- create a second framework ledger.

## R-P15-03 — residual minimum exposure is derived

For one minimum obligation lineage:

`minimum_residual = max(0, effective_minimum_obligation - qualifying_credited_calloff_value - other valid minimum settlement/release effects)`

Portfolio/current contractual exposure for the arrangement is derived from:

- effective call-off/ordinary Commitment obligations; plus
- residual minimum exposure not already satisfied/qualified by those obligations; plus
- any separately effective non-qualifying obligations.

Thus an AED 1,000,000 minimum plus AED 300,000 qualifying call-off does not become AED 1,300,000 merely because both identities exist.

The result remains AED 1,000,000 floor exposure if the call-off fully qualifies, represented as:

- AED 300,000 call-off obligation;
- AED 700,000 residual minimum exposure.

If qualifying call-offs reach AED 1,200,000, residual minimum becomes zero and current ordinary call-off obligation is AED 1,200,000.

## R-P15-04 — minimum settlement/release

At expiry/termination/settlement:

- residual minimum may be released if contractually extinguished; or
- become/continue a payable/certifiable commercial obligation according to governing terms.

The event is history-preserving and references the minimum Commitment lineage.

## R-P15-05 — scope-backed minimum remains separate

A guaranteed minimum based on identifiable physical scope may reserve RequirementAllocation capacity.

Call-offs draw down that reservation.

Scope reservation is not automatically the same thing as monetary minimum exposure.

Where a contract has both, both semantics are explicit and linked without collapsing them.

**BL-P15-01 result: CLOSED candidate.**

---

# 3. BL-P15-02 remediation — mandatory EconomicComponentKey

## R-P15-06 — every value contribution resolves to a stable key

Every event that can contribute to an authoritative P07 commercial value projection must resolve to a stable **`EconomicComponentKey`** within its Commitment lineage.

The key is semantic and mandatory even when no new standalone object is required.

It may resolve directly to an existing load-bearing identity such as:

- commitment line;
- SOV line/section;
- milestone;
- deliverable;
- service unit/period;
- contract scope partition.

Where none alone can unify multiple value mechanisms, a thin mapping/component identity must be created.

## R-P15-07 — canonical recognition grain

For each economic component lineage, the architecture must identify the **canonical recognition grain** used by all mechanisms that can contribute the same economic value.

Receipt, stored-material, installation, milestone, service and certification mechanisms cannot independently invent incompatible component keys for the same underlying value.

## R-P15-08 — component split/merge/versioning

If contractual structure legitimately splits or merges economic components after formation/change:

- original component identities remain historical;
- new component identities/lineage are explicit;
- value/remaining basis transfer is conserved and history-preserving;
- prior certified/recognized contributions remain attached to their historical keys and are mapped into current projection through explicit lineage rules;
- no component split can reset cumulative recognized value.

## R-P15-09 — cross-component contribution

One event may affect multiple economic components only through explicit component-level contributions.

A single undivided total cannot be counted against several components unless the allocation formula itself is load-bearing and reproducible.

## R-P15-10 — not a construction ontology

`EconomicComponentKey` exists only for commercial value conservation.

It does not require a universal building-element/BOQ/work-breakdown ontology.

**BL-P15-02 result: CLOSED candidate.**

---

# 4. BL-P15-03 remediation — canonical CommercialEffectVector algebra

## R-P15-11 — every economically effective event emits typed signed commercial effects

Every P07 event that changes an authoritative commercial position contributes one or more immutable typed signed **CommercialEffectVector** entries/effects at the applicable Commitment + EconomicComponentKey grain.

This is semantic effect algebra, not a double-entry accounting GL.

The vector has a closed product-defined dimension vocabulary.

Candidate core dimensions:

- `COMMITMENT_OBLIGATION`
- `MINIMUM_OBLIGATION`
- `MINIMUM_QUALIFICATION_CREDIT`
- `CERTIFIED_GROSS`
- `RETENTION_HELD`
- `ADVANCE_OUTSTANDING_EFFECT`
- `ALLOWANCE_CONSUMPTION`
- `RECOVERY_EFFECT`
- `CERTIFIED_TAX` where product owns/calculates it
- narrowly defined other P07 commercial dimensions only through controlled architecture change.

Scope authority is not encoded as a monetary effect vector; RequirementAllocation remains separate.

Claim/assessment values remain separate authority-layer projections and do not enter certified commercial dimensions merely because they are monetary.

## R-P15-12 — effect metadata

Each economic effect identifies as applicable:

- source event identity;
- Commitment;
- EconomicComponentKey;
- effect dimension;
- signed exact decimal amount + currency;
- governing MonetaryCalculationPolicy/version;
- effective time/period;
- attribution binding;
- correction/reversal target where applicable;
- evidence/authority lineage.

## R-P15-13 — canonical projection rule

A canonical commercial position is the sum/derivation over **effective CommercialEffectVectors** for its defined dimension(s), filtered/grouped by the position's component, commitment, attribution, effective-time and derivation-version rules.

A cached balance is never an independent writer.

## R-P15-14 — true reversal

A true reversal references an original effect vector (or explicit partial slice) and contributes the exact negating effect under the original monetary semantics.

It does not rerun the original formula using current FX/tax/rounding policy.

## R-P15-15 — replace

Replacement contributes new independently bound effect vector(s) under the replacement event's governing context.

Reverse-and-replace therefore equals:

- negating referenced old effect(s); plus
- new replacement effect(s).

## R-P15-16 — forward adjustment

Forward adjustment contributes only the required signed delta as a new event/effect in its allowed effective period.

The original historical effect remains effective in its original period/history.

## R-P15-17 — reclassification

Reclassification has zero net total commercial-value effect.

It transfers attribution of an explicit existing effect slice through a from→to classification mapping/history.

Where reporting projections require signed from/to classification effects, they must net to zero for the affected economic amount and must not alter Commitment/certified total.

## R-P15-18 — non-economic/integration correction

Non-economic amendment and integration correction contribute zero CommercialEffectVector.

## R-P15-19 — effect-vector evolution

The dimension vocabulary is versioned/controlled.

Adding a future dimension/event type cannot silently reinterpret old effects.

Projection derivation versions declare which dimensions/event types they consume.

**BL-P15-03 result: CLOSED candidate.**

---

# 5. Canonical derived positions after remediation

## Current approved commitment

Derived from effective `COMMITMENT_OBLIGATION` effects plus applicable minimum residual logic and correction/reversal effects.

Ordinary call-off values that qualify against a minimum do not double-count floor exposure.

## Certified gross to date

Sum of effective `CERTIFIED_GROSS` effect vectors by Commitment/EconomicComponentKey and derivation context.

## Retention outstanding

Sum of effective `RETENTION_HELD` effects, where withholding increases the dimension and release/correction decreases it.

## Advance outstanding

Sum/derivation over effective `ADVANCE_OUTSTANDING_EFFECT` effects according to the bound advance basis; recoupment/release contribute negative effects.

## Allowance remaining

Derived from authoritative allowance basis minus effective `ALLOWANCE_CONSUMPTION` and release/correction effects.

## Recovery position

Derived from effective `RECOVERY_EFFECT` effects under the defined recovery direction/sign convention.

## Certified tax

Where product owns the tax calculation, derive from effective `CERTIFIED_TAX` vectors; external accounting tax posting remains separate authority.

No position is independently edited.

---

# 6. W-P15-01 hardening — controlled suspense attribution

## R-P15-20 — suspense is an explicit attribution identity, not missing data

A deployment may permit effective Commitment formation against a controlled `SUSPENSE / UNALLOCATED` commercial cost-attribution bucket.

The bucket:

- is an explicit authorized attribution identity;
- is visible in commercial positions/reporting;
- has owner/resolution responsibility;
- is not equivalent to null/unknown mapping.

## R-P15-21 — suspense requires a resolution rule

If suspense use is permitted, deployment policy must define:

- who may use/approve it;
- allowed transaction kinds/limits;
- resolution owner;
- aging/deadline/escalation;
- latest hard gate requiring specific attribution.

Candidate V1 hard ceiling:

> unresolved suspense may not pass the first product certification or external accounting/job-cost handoff that requires a final attribution mapping, and may not reach commercial closeout unresolved.

For goods flows without product certification, accounting/job-cost handoff or closeout becomes the hard resolution gate.

Reclassification is history-preserving.

---

# 7. W-P15-06 hardening — commitment capability compatibility

Capability composition uses a **closed product-supported compatibility matrix/profile**, not arbitrary tenant mix-and-match.

Examples of bounded profile semantics:

- goods quantity fulfilment;
- progress valuation;
- remeasurement;
- milestone valuation;
- rate-based service;
- deliverable acceptance;
- allowance/provisional mechanism.

A commitment kind/profile declares:

- allowed capabilities;
- required component basis;
- allowed combinations;
- prohibited combinations;
- required valuation/certification path;
- relevant correction/closeout rules.

Tenant configuration may select among supported profiles/parameters but cannot author new commercial mechanism code or arbitrary capability graphs.

---

# 8. Structural/one-XL check after remediation

- Minimum obligation uses the existing Commitment/P07 kernel, not a framework ledger.
- EconomicComponentKey is a conservation identity, not a new process gravity well.
- CommercialEffectVector is closed P07 commercial effect algebra, not GL/debit-credit accounting.
- RequirementAllocation remains non-monetary scope authority.
- Suspense attribution is cost classification, not a duplicate value ledger.
- Capability profiles remain bounded product configuration.

**SECOND XL: CLEAN candidate.**

---

# 9. ADR impact candidate — no status change yet

This remediation strengthens candidate decisions for:

- ADR-0004 commitment/framework/call-off composition;
- ADR-0011 cost attribution timing;
- ADR-0015 correction semantics;
- ADR-0022 monetary effect reproducibility;
- ADR-0009 bounded configuration.

No ADR status changes before internal recheck + external hostile audit.

---

# 10. Remaining blockers

Still open from internal audit:

- **BL-P15-04** complete SPINE lifecycle matrix;
- **BL-P15-05** targeted authoritative ADR-0010 regional-semantics evidence.

The next artifact is the SPINE lifecycle matrix.
