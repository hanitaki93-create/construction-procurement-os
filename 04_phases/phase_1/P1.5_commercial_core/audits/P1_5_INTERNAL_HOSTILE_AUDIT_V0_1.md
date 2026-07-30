# P1.5 — Internal Hostile Audit v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL HOSTILE AUDIT / REMEDIATION REQUIRED  
**Primary target:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_1.md`  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

## 1. Verdict

`FAIL — five structural/completeness blockers must close before external hostile review.`

The integrated candidate is coherent and materially stronger than P1.2 provisional mechanics, but it is not yet a P1.5 freeze candidate because five questions still require P1.5 to choose meaning/ownership rather than merely physical representation.

No blocker requires reopening P1.1, P1.2, P1.3 or P1.4.

No competitor-research restart is required.

---

# 2. Gate audit

| Gate / obligation | Result | Reason |
|---|---|---|
| Four-track reconciliation | PASS | entities/economic/lifecycle/authority views now share one candidate truth path |
| Canonical derived balances | FAIL NARROW | base algebra exists, but correction effect grammar is not canonical enough for unique summation after reversal/replace/reclassify |
| Complete SPINE lifecycles | FAIL | transition skeleton does not yet cover every load-bearing P01–P12 transaction/lifecycle |
| Transition guard/authority/effect/event/reversibility | FAIL by coverage | rows that exist are coherent, but complete SPINE matrix is missing |
| GT-1–GT-4 | PASS CANDIDATE | no structural invention, subject to blocker remediations |
| Ceiling Test | PASS CANDIDATE | no ontology fork found |
| Closed Sub-graph | PASS CANDIDATE | A0–A3 and P07 slices bottom out coherently |
| P1.4 regression | PASS | frozen boundary preserved |
| Audit/redaction compatibility | PASS | no invisible history rewrite required |
| Projection reproducibility | FAIL NARROW | correction inclusion/effect vectors need one canonical rule |
| One-XL | PASS | P07 remains sole independent XL |
| A0–A3 | PASS | no downstream prerequisite introduced |
| ADR/evidence readiness | FAIL | ADR-0010 cannot freeze on an unevidenced assertion that regional semantics fit existing policy slots |

---

# 3. Blockers

## BL-P15-01 — enforceable framework minimum obligation has no canonical obligation identity

### Attack

The candidate correctly separates `CommercialTermsAuthority` from ordinary Commitment, but still leaves a framework/terms arrangement with enforceable monetary minimum exposure as:

- a Commitment;
- an obligation component attached to terms authority;
- or “another bounded P07 identity”.

That is not physical-detail debt. It changes where the authoritative obligation lives and which events derive current commitment/exposure.

### Scenario

Framework agreement becomes effective on 1 January with a guaranteed AED 1,000,000 minimum spend. No call-off exists yet.

Questions left ambiguous:

- Is current approved commitment/exposure 0 or AED 1,000,000?
- Which identity owns that exposure?
- When a AED 300,000 call-off becomes effective, is portfolio current commitment AED 1.3m or AED 1.0m with AED 700k minimum outstanding?
- What event closes the residual AED 200k if qualifying call-offs reach AED 800k and the supplier is owed the unconsumed minimum?

A builder cannot answer from current candidate without deciding commercial truth ownership.

### Narrow remediation

Freeze one rule:

- `CommercialTermsAuthority` remains non-obligation terms authority;
- any enforceable minimum/take-or-pay exposure creates a linked **Commitment obligation lineage** at terms-authority effectiveness, with explicit `MINIMUM_OBLIGATION` component or equivalent typed Commitment basis;
- call-offs are separate Commitment obligations but qualifying values reduce the outstanding minimum exposure through an explicit qualification/offset relationship rather than duplicate commitment value;
- scope-backed reservation remains RequirementAllocation scope authority and is separate from monetary minimum obligation.

Do not invent a second framework ledger.

---

## BL-P15-02 — EconomicComponent is optional exactly where conservation needs it mandatory

### Attack

The candidate says an EconomicComponent may reuse line/SOV/milestone identity and does not need a standalone object. Correct.

But it does not yet freeze that **every value-contributing event must resolve to one stable economic-component key/identity lineage**.

Without that requirement, one module can certify by SOV line while another records stored material by PO line and later installation by a different scope segment. The one-economic-value-once invariant then has no common key.

### Scenario

Subcontract line L1 = AED 100k.

Certificate C1 recognizes AED 40k stored material using `SOV-1`.

Later progress valuation recognizes 70% of work using `ScopeSegment-A` and cannot prove whether that 70k includes the previously recognized 40k material.

The invariant is stated but unenforceable because the economic identities do not reconcile.

### Narrow remediation

Freeze:

> Every event that can contribute to an authoritative commercial value projection must resolve to a stable `EconomicComponentKey` within the Commitment. The key may be an existing line/SOV/milestone/deliverable identity or a thin mapping identity, but all mechanisms contributing to the same economic value must resolve to the same component lineage. Cross-component split/merge must be explicit and history-preserving.

No generic construction scope ontology is required.

---

## BL-P15-03 — correction taxonomy lacks canonical effect-vector algebra

### Attack

The candidate distinguishes correction types well, but current balance formulas still depend on phrases such as “plus/minus corrections according to type.”

P1.5 gate requires **one canonical derivation** for every balance.

If reverse-and-replace, forward adjustment and reclassification each implement custom balance logic, the architecture can drift into module-specific correction semantics.

### Scenario

Certificate event E1 contributes +100k gross and +10k retention withheld.

A partial error of 20k is corrected.

Possible implementations:

- mark E1 corrected and change projection reader;
- add reversal -20k gross / -2k retention;
- reverse full E1 then replace +80k;
- add forward -20k gross and independently recompute retention under current policy.

All can produce 80k today but differ historically and under future policy evolution.

### Narrow remediation

Freeze a canonical **CommercialEffectVector** model:

- every economically effective event contributes typed signed effects to defined projection dimensions at economic-component grain;
- a true reversal contributes the exact negating effect vector of the referenced original contribution (or explicit partial slice of it) under original semantics;
- replacement contributes a new independently bound effect vector;
- forward adjustment contributes only its delta in the new effective period;
- reclassification contributes zero total commercial-value effect and moves attribution through explicit from/to classification effects;
- non-economic/integration corrections contribute zero economic vector;
- projections sum effective effect vectors by dimension/component under an identified derivation version.

This is semantic algebra, not an accounting GL.

---

## BL-P15-04 — complete SPINE lifecycle gate is not yet satisfied

### Attack

The integrated transition table is a useful skeleton but P1.5 gate explicitly requires every SPINE transaction to have a complete lifecycle and every transition to name guard, authority, financial effect, event and reversibility.

Current table covers major vertical events but does not comprehensively close:

- contextual supplier eligibility/qualification;
- TenderParticipant intent/decline/non-response;
- tender amendment/close/cancel/re-tender lifecycle;
- comparison supersession/re-evaluation;
- award withdrawal/supersession after decision but before commitment;
- terms-authority lifecycle;
- framework minimum/call-off lifecycle;
- claim withdraw/revise/return lifecycle;
- assessment supersession;
- external accounting reconciliation states;
- long-lead tracked milestone lifecycle;
- closeout/security/warranty obligation lifecycle;
- technical-approval dependency lifecycle.

### Why blocker

A builder would still invent domain state semantics for retained SPINE/THIN actions, violating the P1.5 gate and Closed Sub-graph intent.

### Narrow remediation

Create a complete `P1_5_SPINE_LIFECYCLE_MATRIX_V0_1.md` covering all load-bearing P01–P12 transaction families.

For each transition record:

- source semantic state;
- command/action;
- guard;
- authority/control;
- resulting event/state;
- economic effect or NONE;
- reversibility/supersession/correction;
- idempotency/concurrency note;
- evidence/version binding.

Projection-only/interface concepts need not receive fake aggregate lifecycles; mark them explicitly as projection/interface and define their source lifecycle.

---

## BL-P15-05 — ADR-0010 regional-semantics closure lacks authoritative evidence

### Attack

The integrated candidate proposes a good architectural direction:

> regional semantics are deterministic policy dimensions, not late presentation localization and not a separate GCC ontology.

But P1.5 financial freeze cannot infer that retention, tax, certification, advance, security and final-account semantics can all fit the candidate policy slots without checking authoritative UAE/GCC contractual/regulatory evidence.

P1.2 itself carried ADR-0010 as evidence debt.

### Why blocker

A missing core semantic discovered later—e.g. a legally/contractually significant tax point, retention treatment, security-release effect or certification distinction that requires new event identity—would force P1.5 commercial-history redesign.

### Narrow remediation

Perform **targeted**, not broad, authoritative research sufficient to test whether candidate core needs another event/authority concept.

At minimum inspect current authoritative UAE sources / contract-standard sources relevant to:

- VAT/tax timing and adjustments for construction/commercial supplies;
- retention/payment/certification interaction where authoritative public guidance exists;
- advance payment/tax treatment hooks;
- performance/security/retention release only to the degree it creates procurement-commercial event semantics;
- FIDIC-style certification/change distinctions only from authoritative standard/contractual sources that can be cited within copyright limits.

The goal is not to encode UAE law in P1.5. The goal is to falsify the claim that the generic event/policy kernel is structurally sufficient.

If evidence fits current event/authority slots, ADR-0010 can resolve to regional deterministic profiles/modules over the same core.

---

# 4. Watches — not blockers yet

## W-P15-01 — controlled suspense attribution

The candidate allows a governed suspense/unallocated cost attribution at Commitment effectiveness.

Good for adoption, but it needs a mandatory resolution policy/deadline/gate so suspense does not become permanent uncoded truth.

Likely remediation can live in ADR-0011 candidate wording: suspense is a real explicit attribution bucket with authority and age/state, and deployment policy must define the latest transition before which detailed attribution is mandatory.

## W-P15-02 — MonetaryCalculationPolicy breadth

Bounded stage types are correct. Ensure stage composition cannot become arbitrary formula/no-code language.

Concrete V1 calculation profiles should demonstrate boundedness before freeze.

## W-P15-03 — known-at temporal reconstruction

Hybrid event/config timestamps appear sufficient, but lifecycle matrix should include at least one late-recorded/backdated approval/change and one corrected config version to prove `known-at` reconstruction.

## W-P15-04 — display numbering legal claims

Candidate wisely makes no gapless/fiscal claim. Any mandatory numbering rule remains evidence/deployment policy.

## W-P15-05 — claim/assessment/certification object collapse

Semantic identities are load-bearing, but physical aggregate identity can still be reduced. Avoid three large workflow aggregates merely because names are distinct.

## W-P15-06 — capability profile combinatorics

Commitment capability composition must use a closed supported profile set/compatibility matrix. Do not let arbitrary combination become a hidden rules engine.

## W-P15-07 — multi-allocation atomicity

FT-02/06/10 remain evidence debt. Architecture must support atomic conservation without falsely freezing exact contractor mechanics.

---

# 5. Regression check

- **P1.1 REOPEN = NO**
- **P1.2 REGRESSION = NO**
- **P1.3 REOPEN = NO**
- **P1.4 REOPEN = NO**
- **SECOND XL = CLEAN**
- **A0–A3 ACTIVATION = CLEAN**

The blockers are internal P1.5 completeness/semantic issues only.

---

# 6. Required remediation sequence

1. Close BL-P15-01 with explicit minimum-obligation lineage rule.
2. Close BL-P15-02 with mandatory stable EconomicComponentKey resolution for every value contribution.
3. Close BL-P15-03 with canonical CommercialEffectVector algebra and update derived-position formulas.
4. Create complete SPINE lifecycle matrix for BL-P15-04.
5. Perform targeted authoritative ADR-0010 research and record whether new semantic/event types are required.
6. Harden W-P15-01 and W-P15-06 while modifying candidate.
7. Run internal recheck against:
   - all five blockers;
   - GT-1–GT-4;
   - Ceiling Test;
   - Closed Sub-graph Gate;
   - one-XL;
   - A0–A3;
   - P1.4 regressions.
8. If PASS, prepare self-contained Claude P1.5 hostile-audit packet.

Do not change ADR statuses before internal recheck + external hostile review.

---

# 7. Current state

**P1.5 remains ACTIVE.**  
**P1.6+ remain LOCKED.**  
**Product code remains LOCKED.**
