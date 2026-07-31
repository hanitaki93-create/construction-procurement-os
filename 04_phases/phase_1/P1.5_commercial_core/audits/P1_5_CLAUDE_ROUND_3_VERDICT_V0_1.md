# P1.5 — Claude Hostile Audit Round 3 Verdict v0.1

**Date:** 2026-07-31  
**Reviewer:** Claude / independent hostile auditor  
**Status:** PASS  
**P1.5:** READY FOR FINAL ADR RECONCILIATION / CHECKPOINT  
**P1.6:** READY AFTER P1.5 FINAL CHECKPOINT

---

## 1. Verdict

`PASS — P1.5 Commercial Core can close; proceed to final ADR reconciliation/checkpoint and unlock P1.6.`

## 2. Blockers

**None.**

Claude confirmed:

- BL-17 CLOSED — current minimum-credit semantics explicitly do not support excess-value carry-forward/banking; future carry-forward must be a separately named governed mechanism with its own lineage/conservation semantics rather than overloading `MINIMUM_QUALIFICATION_CREDIT`.
- BL-18 CLOSED — `ScopeBasis`, `ValuationBasis` and `CapabilityProfile` are distinct axes, and all six P1.2 valuation bases have explicit preserved-meaning mappings into the closed P1.5 capability set.
- prior BL-14, BL-15 and BL-16 remain closed.

## 3. Non-blocking watches

### W-25 — valuation-basis parameters

Daywork markup, attendance percentages and equivalent valuation-basis parameters need an explicit semantic home.

Final P1.5 freeze hardening:

- parameters that affect contractual valuation are load-bearing `ValuationBasis` / contractual valuation-rule parameters;
- they bind to the relevant valuation basis/version before authoritative calculation;
- they do not become `CapabilityProfile` semantics merely because a capability executes the calculation;
- exact physical storage belongs later.

### W-26 — axis name collisions

Some labels appear on both `ValuationBasis` and `CapabilityProfile` axes, notably `UNIT_RATE_REMEASUREMENT` and `RATE_BASED_SERVICE`.

Final P1.5 freeze hardening:

- the axes are distinct typed semantic namespaces even when labels resemble one another;
- a builder may not infer identity/equivalence from the shared label;
- physical naming/enum syntax remains implementation choice.

### W-27 — FX purpose for minimum qualification

Final P1.5 freeze hardening:

- minimum qualification is evaluated in the minimum obligation's governing currency/basis;
- where a qualifying call-off is in another currency, an explicit `MINIMUM_QUALIFICATION` FX purpose/basis is bound before applied credit is calculated;
- source/rate/fixing date/version are load-bearing where conversion affects the credit;
- qualification FX cannot silently reuse comparison, reporting or accounting FX.

### W-28 — instructed work and component identity

Final P1.5 freeze hardening:

- an effective instruction may establish work/scope authority before price agreement;
- before instructed value can emit authoritative certification/commercial value, it must resolve to governed `EconomicComponentKey` lineage or an explicitly governed component mapping;
- provisional valuation authority does not permit an ad hoc/untracked recognition grain.

### W-29 — wording

Editorial wording remains non-blocking. Final frozen artifacts use the clarified semantic terms above; later master-spec editorial cleanup must not change their meaning.

## 4. Gate check

- G1 Structural root / decomposability — PASS
- G2 Commitment / minimum / effect subject / valuation / capability / conservation — PASS
- G3 Balances / money / FX / tax / correction / temporal — PASS
- G4 Lifecycle completeness / transaction register — PASS
- G5 Authority / workflow / configuration / concurrency / numbering — PASS
- G6 Accounting / invoice / tax / regional seam — PASS
- G7 Long-lead / status / direct-source / security — PASS
- G8 GT1–4 / Ceiling / Closed Subgraph / A0–A3 — PASS
- G9 One-XL / object explosion / AI bounded action — PASS

## 5. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

## 6. ADR impact

Claude recommends **ACCEPT SEMANTIC DECISION** for:

- ADR-0003
- ADR-0004
- ADR-0007
- ADR-0008
- ADR-0009
- ADR-0013
- ADR-0015
- ADR-0019
- ADR-0022
- ADR-0023

Claude recommends **KEEP PROPOSED — LATER / NON-BLOCKING** for:

- ADR-0010 — regional semantics/rates/statutory tax evidence remains evidence-driven;
- ADR-0011 — detailed attribution/suspense mechanics remain later refinement under the frozen boundary.

Confirmed later-owned:

- ADR-0006 → P1.7
- ADR-0016 → P1.9 / later UI
- ADR-0017 → P1.10

## 7. P1.6 readiness

`READY AFTER P1.5 FINAL CHECKPOINT.`

Final hostile-audit answer:

> No load-bearing Commercial Core decision remains that requires P1.6 or later physical design to decide business meaning, ownership, effect, conservation or lifecycle.