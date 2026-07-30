# P1.5 — Internal Recheck v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL RECHECK PASS / EXTERNAL HOSTILE REVIEW READY  
**Primary candidate:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_2.md`  
**Binding supplements:**
- `P1_5_INTERNAL_AUDIT_REMEDIATION_V0_1.md`
- `P1_5_SPINE_LIFECYCLE_MATRIX_V0_1.md`
- `evidence/P1_5_ADR_0010_TARGETED_REGIONAL_EVIDENCE_V0_1.md`
- `P1_5_LONG_LEAD_STATUS_BOUNDARY_V0_1.md`
- `P1_5_COMPLETENESS_HARDENING_V0_1.md`

**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

## 1. Verdict

`PASS — internal P1.5 blockers are closed; prepare self-contained external hostile-review packet.`

This is **not** P1.5 final PASS or ADR acceptance.

Claude external hostile review remains mandatory before final freeze/ADR reconciliation/P1.6 unlock.

---

# 2. Original blocker recheck

## BL-P15-01 — framework/minimum obligation identity

**Prior failure:** terms authority with enforceable monetary minimum had no canonical obligation owner.

**Remediation:**

- reusable `CommercialTermsAuthority` remains terms authority;
- enforceable monetary minimum creates linked P07 minimum Commitment obligation lineage;
- qualifying call-offs remain separate Commitments;
- explicit qualification credit offsets residual minimum without double counting;
- scope-backed reservation remains RequirementAllocation scope authority;
- settlement/release stays event-backed.

Example AED 1m minimum + AED 300k qualifying call-off = AED 300k ordinary call-off obligation + AED 700k residual minimum, not AED 1.3m.

**Result: CLOSED.**

---

## BL-P15-02 — EconomicComponent conservation grain

**Prior failure:** one-economic-value-once was stated but component identity could be incompatible across fulfilment/valuation mechanisms.

**Remediation:** every value-contributing event resolves to a stable `EconomicComponentKey` inside Commitment lineage. Existing line/SOV/milestone/etc identity can serve as key; otherwise use thin mapping identity. Split/merge/versioning preserves prior contribution history. All mechanisms for the same value resolve to one canonical recognition grain.

**Result: CLOSED.**

---

## BL-P15-03 — correction algebra

**Prior failure:** balance formula said “corrections according to type” without one canonical economic effect algebra.

**Remediation:** immutable typed signed `CommercialEffectVector` effects define product-owned commercial value movement.

Core dimensions include:

- ordinary commitment obligation;
- minimum obligation / qualification credit;
- certified gross;
- retention held;
- advance outstanding effect;
- allowance consumption;
- recovery effect;
- certificate tax component where product calculates it.

True reversal negates original vector under original semantics; replacement adds new vector; forward adjustment adds delta in new period; reclassification is zero-net value transfer; non-economic/integration correction has zero economic vector.

All commercial positions derive from effects under explicit derivation version.

**Result: CLOSED.**

---

## BL-P15-04 — complete SPINE lifecycle coverage

**Prior failure:** integrated transition table was representative, not complete across P01–P12.

**Remediation:** full lifecycle matrix now covers load-bearing transaction/control families across P01–P12 plus cross-cutting correction/redaction/authority-transfer. Each transition includes source state/context, command/action, guards, authority, resulting event/state, economic effect, correction route, concurrency/idempotency and evidence/version binding.

Projection/interface concepts are explicitly marked rather than receiving fake lifecycles.

Completeness hardening adds:

- direct-source selection/AwardDecision path;
- supplier invoice/match/exception seam.

**Result: CLOSED.**

---

## BL-P15-05 — ADR-0010 regional semantics evidence

**Prior failure:** generic-core-with-regional-policy claim lacked authoritative UAE/GCC evidence sufficient to falsify missing core semantics.

**Remediation:** targeted authoritative review of current UAE VAT legislation/FTA construction guidance and authoritative FIDIC contract-publication structure.

Evidence confirms/reinforces distinctions already represented:

- certification ≠ statutory VAT tax point;
- certification ≠ payment/accounting posting;
- advance ≠ earned value;
- retention ≠ unearned scope;
- measurement/evaluation ≠ variation;
- provisional/daywork mechanisms remain explicit;
- tax adjustment/credit note ≠ destructive history rewrite;
- statutory tax FX ≠ evaluation/contract/reporting FX;
- interim certification ≠ final account/final certification.

No missing P07 commercial truth owner/event family was identified.

Candidate hardening makes certificate tax component separate from statutory tax-point/invoice/credit-note/posting authority.

**Result: CLOSED for P1.5 structural sufficiency.**

Specific UAE/GCC law/rates/defaults remain product/legal/configuration evidence, not universal architectural claims.

---

# 3. Watch recheck

## W-P15-01 suspense attribution

Hardened: suspense is explicit authorized attribution identity, not null. Requires owner/approval/age/deadline/hard resolution gate. Cannot reach required certification/accounting handoff/closeout unresolved.

**CLEAN candidate.**

## W-P15-02 calculation policy breadth

Bounded product-defined stage/profile vocabulary; tenant cannot write arbitrary formula scripts. Concrete V1 profiles remain later detailed spec/evidence.

**CLEAN / physical-profile detail later.**

## W-P15-03 known-at reconstruction

Hybrid temporal model preserves recorded time, business-effective time, bound version and late-recorded/backdated distinction. Projection-as-of semantics acknowledge known-at view.

**CLEAN candidate.**

## W-P15-04 numbering legal claims

No universal gapless/fiscal claim. Verified deployment/legal rules are explicit policy; immutable internal identity separate.

**CLEAN.**

## W-P15-05 claim/assessment/certification object explosion

Semantic identities remain distinct; physical aggregate/table independence is not assumed. Object-collapse rule remains binding.

**CLEAN.**

## W-P15-06 capability combinatorics

Closed supported compatibility/profile matrix; no arbitrary tenant capability graph.

**CLEAN.**

## W-P15-07 multi-allocation atomicity

Architecture requires atomic conservation/single-effect protocol while FT-02/06/10 exact business mechanics remain explicitly falsifiable.

**CLEAN / evidence debt retained.**

---

# 4. Additional ADR sweep

## ADR-0007 long-lead object

Candidate now explicit:

- no universal independent TrackedItem root;
- thin ProcurementMilestoneInstance planning/observation identity anchored to canonical subject lineage;
- long-lead continuity follows requirement→allocation→sourcing→award→commitment/component lineage;
- P10 remains overlay, not CPM.

**READY FOR EXTERNAL AUDIT.**

## ADR-0013 status truth

Candidate now explicit:

- actual transactional status/date event-derived where canonical source exists;
- required/planned/forecast/confirmed values explicit typed planning/source facts;
- health/status projections derived/versioned;
- no manual competing actual-status writer.

**READY FOR EXTERNAL AUDIT.**

## ADR-0006

Connector depth intentionally deferred to P1.7; authority seam already frozen and zero connector prerequisite preserved.

**NON-BLOCKING.**

## ADR-0016

External-party UX later surface decision; external identity/access semantics already frozen.

**NON-BLOCKING.**

## ADR-0017

Broader AI-readiness later P1.10; bounded actions, provenance and isolation already binding.

**NON-BLOCKING.**

---

# 5. Extra completeness sweep

## Controlled direct source

Direct-source route reuses requirement/allocation, supplier eligibility, contractable source basis, justification/DOA, AwardDecision and later Commitment. It does not fake TenderEvent/ComparisonSnapshot.

**CLEAN.**

## Supplier invoice/match

Invoice source evidence, product match/exception facts and external AP/tax posting authority are separated at fact level. Match resolution cannot mutate truth merely to sync/pass.

**CLEAN.**

## Actual

No unqualified universal `actual` authority remains. Distinguish physical actual, certified-commercial actual, external accounting-posted actual and paid cash.

**CLEAN.**

## Forecast

Forecast remains typed versioned planning/projection over explicit inputs and cannot silently become committed/certified/accounting truth.

**CLEAN.**

## Final account

Final account/closeout does not create an opaque new ledger. Any economic effect must materialize through the same commitment/change/certification/release/recovery/correction effect dimensions and transition rules.

**CLEAN.**

---

# 6. P1.5 gate recheck

| Obligation | Result |
|---|---|
| Four concurrent tracks reconcile | PASS |
| Every retained derived commercial balance has canonical event/effect derivation or explicit external authority | PASS |
| Current commitment/minimum exposure avoids double counting | PASS |
| One-economic-value-once is enforceable by EconomicComponentKey | PASS |
| Every SPINE/load-bearing transaction family has semantic lifecycle or is explicit projection/interface | PASS |
| Every transition records guard/authority/effect/event/correction/concurrency/evidence fields | PASS |
| GT-1 standard subcontract | PASS |
| GT-2 imported long-lead equipment | PASS |
| GT-3 progress claim/certification | PASS |
| GT-4 instructed variation | PASS |
| Ceiling Test six scenarios | PASS |
| Closed Sub-graph Gate | PASS |
| A0–A3 independence | PASS |
| Audit/redaction/tombstone compatibility | PASS |
| Projection reproducibility | PASS |
| Known-at/effective-time interpretability | PASS |
| One-XL / second-ledger | PASS |
| Object explosion controlled | PASS |
| P1.4 regression | PASS |
| Product code still locked | PASS |

---

# 7. Derived-position recheck

Canonical/typed positions now include:

- authorized requirement remaining — exact FT mechanics still falsifiable;
- ordinary/minimum current contractual obligation exposure;
- pending/proposed/instructed exposure typed separately;
- certified gross-to-date;
- retention outstanding;
- advance outstanding;
- allowance/provisional remaining;
- recovery outstanding;
- certificate tax component where product owns calculation;
- external accounting posted actual;
- external paid cash;
- physical fulfilment actuals;
- forecast/scenario projections with explicit profile/version;
- reconciliation differences.

No one position is independently editable commercial truth.

**PASS.**

---

# 8. Ceiling Test recheck

- multi-entity/JV — PASS;
- cross-country vendor relationship — PASS;
- multi-currency chain — PASS;
- authority change in flight — PASS;
- differing fiscal semantics — PASS;
- contextual vendor status — PASS.

No scenario requires country-specific ontology or second ledger.

**CEILING TEST: PASS INTERNAL.**

---

# 9. Closed Sub-graph recheck

- A0–A3 sourcing/award/handoff — PASS;
- goods commitment slice — PASS;
- subcontract certification slice — PASS;
- direct-source A4 route additive — PASS;
- future milestone/service capability additive — PASS;
- omitted future workbenches do not remove deterministic invariants/actions/evidence — PASS.

**CLOSED SUB-GRAPH: PASS INTERNAL.**

---

# 10. Regression / gravity check

- **P1.1 REOPEN = NO**
- **P1.2 REGRESSION = NO**
- **P1.3 REOPEN = NO**
- **P1.4 REOPEN = NO**
- **SECOND XL = CLEAN**
- **A0–A3 ACTIVATION = CLEAN**
- **P07 SOLE INDEPENDENT XL = PRESERVED**

---

# 11. Candidate ADRs ready for external attack — no status changes yet

P1.5 candidate decisions ready for hostile external review:

- ADR-0003 — polycentric structural root;
- ADR-0004 — one semantic Commitment core + bounded capability profiles + explicit minimum obligation;
- ADR-0007 — thin milestone overlay, no universal TrackedItem;
- ADR-0008 — bounded shared control primitives;
- ADR-0009 — constrained typed configuration;
- ADR-0010 — common core + first-class evidence-driven regional/contract profiles;
- ADR-0011 — explicit attribution by Commitment effectiveness with governed suspense and mandatory resolution gate;
- ADR-0013 — actual event-derived, planning inputs explicit, health derived;
- ADR-0015 — effect-vector/history-preserving correction grammar;
- ADR-0019 — hybrid effective/recorded/versioned temporal model;
- ADR-0022 — exact decimal + versioned MonetaryCalculationPolicy + purpose-specific FX/tax;
- ADR-0023 — internal identity/display number split + idempotent/conservation-safe concurrency.

ADR-0006/0016/0017 remain intentionally later-owned.

---

# 12. Internal result

**BLOCKERS: NONE.**  
**EXTERNAL HOSTILE REVIEW READINESS: READY.**

P1.5 remains ACTIVE and P1.6/product code remain LOCKED until Claude hostile review and final P1.5 reconciliation.
