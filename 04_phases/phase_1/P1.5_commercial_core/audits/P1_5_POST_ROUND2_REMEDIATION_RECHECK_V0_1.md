# P1.5 — Post-Claude-Round-2 Remediation Recheck v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL RECHECK PASS / EXTERNAL ROUND-3 REQUIRED  
**Current candidate:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_4.md`  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. Recheck scope

Recheck:

- BL-17 minimum over-credit/carry-forward semantics;
- BL-18 P1.2 valuation-basis reconciliation;
- watches W-20 through W-24;
- prior BL-14/15/16 closure;
- P1.1–P1.4 regressions;
- one-XL and A0–A3 guards;
- ADR-0004 readiness in particular.

This is not final P1.5 PASS. Claude round-3 agreement remains required.

---

# 2. BL-17 recheck

## Scenario A — no carry-forward

Minimum 1,000,000. Qualifying call-off 300,000.

- ordinary call-off obligation = 300,000;
- applied minimum credit = 300,000;
- residual minimum = 700,000.

PASS.

## Scenario B — call-offs exceed residual

Residual before call-off = 100,000. Qualifying call-off = 250,000.

- applied minimum credit = 100,000;
- excess 150,000 remains ordinary call-off value;
- no negative/transferable/banked minimum credit exists.

PASS.

## Scenario C — separate future period minimum

Year 1 residual = 0 after applied credits. Year 1 call-offs exceed the floor by 300,000. Year 2 has its own minimum `ObligationEffectKey`.

Current semantics:

- Year 1 excess produces no credit right;
- Year 2 starts from its own obligation basis;
- Year 1 economic value cannot reduce Year 2 minimum.

PASS — no double credit.

## Scenario D — contract requires carry-forward

Current product profile does not silently approximate it.

The contract is unsupported for this mechanism until controlled prospective architecture adds a named carry-forward right/effect with explicit lineages/conservation.

PASS — known bounded unsupported feature, not ambiguous truth.

**BL-17: CLOSED internally.**

---

# 3. BL-18 recheck

P1.2 required valuation basis and scope basis to remain orthogonal.

P1.5 v0.4 now makes three axes explicit:

`ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile`.

## FIRM_LUMP_SUM

Can be fulfilled/recognized through progress, milestone or deliverable mechanisms without changing the fixed contractual value except by governed change.

PASS.

## UNIT_RATE_REMEASUREMENT

Maps to the remeasurement capability and may compose with progress assessment/certification.

Measured quantity changes value under the bound rate/basis without inventing a variation inside already authorized remeasurable scope.

PASS.

## PROVISIONAL_SUM_ALLOWANCE

Maps to allowance/provisional capability, but actual consumption cannot remain valuation-undefined: it must bind a supported underlying valuation basis or named supported authority before effective consumption/certification.

PASS.

## DAYWORK

`ValuationBasis = DAYWORK` remains explicit.

Execution uses the bounded `RATE_BASED_SERVICE` capability as the rate × measured labour/plant/material/time/resource mechanism.

Because ValuationBasis remains separate, daywork is not semantically renamed into generic service.

PASS.

## MILESTONE

Maps to milestone valuation.

PASS.

## RATE_BASED_SERVICE

Maps directly to rate-based capability.

PASS.

## Fixed goods

`FIRM_QUANTITY` scope + fixed component baseline + quantity-goods fulfilment does not become unit-rate remeasurement merely because receipt recognizes part of the baseline.

PASS.

**BL-18: CLOSED internally.**

**P1.2 REGRESSION: NO.**

---

# 4. W-20 recheck — tax

Commercial certificate tax is explicitly commercial presentation/net-payable calculation only.

It never becomes statutory VAT liability/date-of-supply/invoice/credit-note/AP/payment truth merely because values match.

PASS.

---

# 5. W-21 recheck — AI provenance

Scenario:

Supplier PDF states AED 850,000. AI extracts AED 850,000. Buyer normalizes/accepts it. Later award uses that value.

Required reconstruction distinguishes:

- supplier source evidence/revision;
- machine-derived extraction/proposal;
- human/domain acceptance/transformation;
- final authoritative contractable/decision basis.

AI extraction does not rewrite itself as supplier-authored truth.

PASS.

This is a deterministic provenance obligation, not P1.10 orchestration/design.

---

# 6. W-22 recheck — security

Scenario:

Performance security is called after default.

- security call/drawdown is TX-049 SecurityAction;
- it is not release/expiry;
- if product commercial recovery is recognized, a separate TX-037 recovery event/effect links to the call;
- external guarantor/bank cash remains external.

PASS — no banking gravity well and no lost distinction.

---

# 7. W-23 recheck — subject declaration

For each conditional subject dimension, the discriminator is declared before effect emission:

- Commitment baseline/ChangeBasis;
- MinimumObligationBasis;
- AdvanceBasis;
- RecoveryBasis;
- CertificateTaxCalculationProfile/MonetaryCalculationPolicy.

Projection cannot choose subject later.

PASS.

---

# 8. W-24 recheck — ContractingAuthorityContext establishment

Scenario:

New project has no prior contracting context.

Before first load-bearing transaction requiring legal/contracting authority becomes effective:

- initial context version is established through governed authority fact;
- scope/basis/provenance/effective start are bound;
- later changes are effective-dated;
- history retains exact governing version;
- no partner access is implied.

PASS.

---

# 9. Prior blocker regression check

### BL-14 tax authority

Still closed. Commercial certificate tax and statutory tax remain different facts/authorities.

### BL-15 effect grain

Still closed. Every monetary P07 effect has COMPONENT or OBLIGATION subject; no third grain.

### BL-16 lifecycle membership

Still closed. TX-001–TX-056 remains the candidate closed membership set; TX-045/TX-049 semantic refinements do not add an unregistered family, they close the meaning of existing members.

PASS.

---

# 10. Gate recheck

- G1 Structural root / decomposability — PASS
- G2 Commitment / minimum / effect subject / valuation/capability / conservation — PASS
- G3 Balances / money / FX / tax / correction / temporal — PASS
- G4 Lifecycle completeness / transaction register — PASS
- G5 Authority / workflow / configuration / concurrency / numbering — PASS
- G6 Accounting / invoice / tax / regional seam — PASS
- G7 Long-lead / status / direct-source / security action — PASS
- G8 GT1–4 / Ceiling / Closed Sub-graph / A0–A3 — PASS
- G9 One-XL / object explosion / AI-safe bounded-action future — PASS

---

# 11. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 12. ADR posture before external round 3

No ADR status changes yet.

Current internal assessment:

Semantically ready for final reconciliation if Claude agrees:

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

Needs careful final project judgment rather than automatic acceptance:

- ADR-0010 — core regional semantics direction is now semantically defined, while exact regional rules/rates/law remain evidence-driven later;
- ADR-0011 — attribution timing/suspense boundary is semantically defined, but final status should be decided only at final reconciliation against the frozen roadmap and evidence.

Later-owned:

- ADR-0006 → P1.7;
- ADR-0016 → P1.9/later UI;
- ADR-0017 → P1.10.

---

# 13. Internal verdict

`PASS — Claude round-2 blockers are internally closed; send a narrow self-contained round-3 hostile re-audit.`

P1.5 remains ACTIVE.

P1.6 remains LOCKED.

Product code remains LOCKED.