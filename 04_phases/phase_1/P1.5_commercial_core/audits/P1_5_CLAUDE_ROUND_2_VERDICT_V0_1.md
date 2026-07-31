# P1.5 — Claude Hostile Audit Round 2 — Verdict v0.1

**Date:** 2026-07-31  
**Status:** EXTERNAL HOSTILE AUDIT / FAIL / REMEDIATION REQUIRED  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

## 1. Verdict

`FAIL — P1.5 remains open; blockers below must be remediated.`

Claude confirmed:

- BL-14 tax authority — CLOSED;
- BL-16 lifecycle closed set — CLOSED;
- BL-15 core effect-subject cure — directionally correct, but two narrower ADR-0004 defects remain.

No P1.1/P1.3/P1.4 reopening was requested. P1.2 regression is conditional only on BL-18.

---

## 2. Blockers

### BL-17 — minimum-credit boundary still contains a qualifier

Current clause:

`applied_credit = min(qualifying_value, residual_before_credit)`

is accepted.

But wording that excess qualifying value does not become negative/transferable minimum credit **by default** leaves an unstated alternate branch.

A multi-period take-or-pay/carry-forward contract would force later design to decide whether excess credit crosses obligation lineages, what effect it emits and how one-time conservation is maintained.

Required narrow remediation:

- remove the qualifier for the current closed set; or
- define a named carry-forward mechanism with explicit source/target obligation lineage and effect/conservation semantics.

### BL-18 — closed capability set is not reconciled to P1.2 valuation bases

P1.2 explicitly separated scope/quantity basis from valuation basis and carried valuation mechanisms including:

- `FIRM_LUMP_SUM`;
- `UNIT_RATE_REMEASUREMENT`;
- `PROVISIONAL_SUM_ALLOWANCE`;
- `DAYWORK`;
- `MILESTONE`;
- `RATE_BASED_SERVICE`.

P1.5 separately closed seven capability profiles but did not state whether capability profile is the valuation axis or an orthogonal execution/fulfilment axis, nor map all P1.2 valuation bases to it.

Daywork is the clearest ambiguity.

Required narrow remediation:

- explicitly define the relationship between valuation basis and capability profile;
- map every P1.2 valuation basis into the P1.5 capability/profile model without inventing a new ontology by implementation convenience.

---

## 3. Watches accepted for hardening

### W-20 — commercial certificate tax is never statutory liability

State explicitly that `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` is a commercial certificate calculation/presentation/net-payable component and never statutory VAT liability by itself.

### W-21 — AI-derived input provenance

Where an AI-derived/extracted/proposed value influences a governed outcome, P1.4 load-bearing rules require provenance sufficient to reconstruct that influence.

AI-derived content remains normalized/internal proposal truth until a valid supplier/internal domain action establishes a different authority. It never silently becomes supplier source truth.

### W-22 — security call versus release

Security call/drawdown/recovery must be distinct from security release/expiry. Clarify TX-049/TX-037 relation.

### W-23 — conditional EffectSubject declaration points

For advance, recovery and commercial certificate tax, identify where COMPONENT versus OBLIGATION subject choice is declared and version-bound before the effect occurs.

### W-24 — initial ContractingAuthorityContext establishment

Clarify that initial establishment/version 1 is governed and load-bearing, not only later context change.

---

## 4. Gate result

- G1 Structural root / decomposability — PASS
- G2 Commitment / minimum / effect subject / conservation — FAIL (BL-17, BL-18)
- G3 Balances / money / FX / tax / correction / temporal — PASS
- G4 Lifecycle completeness / transaction register — PASS
- G5 Authority / workflow / configuration / concurrency / numbering — PASS
- G6 Accounting / invoice / tax / regional seam — PASS
- G7 Long-lead / status / direct-source — PASS
- G8 GT1–4 / Ceiling / Closed Sub-graph / A0–A3 — PASS
- G9 One-XL / object explosion / AI bounded action — PASS

Regression:

- P1.1 REOPEN = NO
- P1.2 REGRESSION = YES only while BL-18 remains unresolved
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

## 5. ADR impact from Claude round 2

Claude considers semantically acceptable, subject to final project reconciliation:

- ADR-0003
- ADR-0007
- ADR-0008
- ADR-0009
- ADR-0013
- ADR-0015
- ADR-0019
- ADR-0022
- ADR-0023

Blocking:

- ADR-0004 until BL-17/BL-18 close.

Later physical/non-blocking in Claude's view:

- ADR-0010
- ADR-0011

Later-owned:

- ADR-0006 → P1.7
- ADR-0016 → later UI
- ADR-0017 → P1.10

No ADR status is changed by this audit record.

---

## 6. P1.6 readiness

`NOT READY`

P1.5 remains ACTIVE until BL-17/BL-18 are remediated, internal recheck passes, and external re-audit agrees.