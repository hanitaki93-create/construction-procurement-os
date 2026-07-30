# P1.5 — Completeness Hardening v0.1

**Date:** 2026-07-30  
**Status:** CANDIDATE HARDENING / INTERNAL RECHECK INPUT  
**Parent:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_2.md`  
**Product code:** LOCKED

---

## 1. Purpose

Close three completeness ambiguities found after the v0.2 consolidation but before internal recheck:

1. controlled direct-source/direct-purchase selection path;
2. supplier invoice/evidence/match seam without becoming AP;
3. ambiguous use of `actual` and `forecast` commercial positions.

This artifact supplements v0.2 and is part of the current audit target.

---

# 2. Controlled direct-source route

P1.3 already preserves direct-source/direct-purchase as a later A4 route, not part of first A0–A3 tender activation.

P1.5 must therefore support it without forcing a fake TenderEvent.

## DS01 — direct source is a sourcing route, not a procurement root

A controlled direct-source route uses the same:

- authorized requirement source;
- RequirementAllocation lineage;
- contextual supplier relationship/eligibility;
- contractable supplier basis/evidence;
- P09 justification/DOA/control;
- AwardDecision;
- later Commitment formation controls.

It simply omits competitive tender/release/comparison semantics that did not occur.

## DS02 — DirectSourceDecisionBasis

A load-bearing direct-source selection basis must preserve as applicable:

- authorized requirement/allocation scope;
- selected supplier/counterparty context;
- supplier source quotation/offer/contractable basis;
- route/justification type and reason;
- price/commercial evaluation evidence appropriate to the route;
- required exception/DOA approvals;
- conflict/compliance/eligibility facts;
- source/version/provenance.

It cannot fabricate competitor bids or a ComparisonSnapshot.

## DS03 — direct-source AwardDecision

Conceptual bounded command:

`MakeDirectSourceAwardDecisionEffective`

Guards:

- valid allocation authority;
- valid supplier eligibility/context;
- valid supplier contractable basis;
- supported direct-source reason/route;
- required DOA/exception approvals;
- current security/domain invariants;
- idempotency/current-version checks.

Result:

- ordinary `AwardDecision` with sourcing-route/basis provenance;
- `NONE` economic effect by default;
- later external handoff or P07 Commitment formation exactly like competitive award.

## DS04 — lifecycle

`proposed direct-source basis`
→ review/approval
→ effective AwardDecision
or rejection/withdrawal/revision.

No TenderEvent lifecycle is created.

## DS05 — A0–A3 unaffected

Direct source remains optional A4 expansion and cannot become mandatory first-release surface.

---

# 3. Supplier invoice / match seam

P1.4 freezes that product may own invoice evidence/match/exception facts without becoming AP.

## INV01 — SupplierInvoiceEvidence

Where captured in the product, supplier invoice/tax-invoice evidence is source evidence with immutable/versioned provenance.

It does not automatically create:

- AP liability;
- payment due truth;
- accounting posting;
- certified commercial value.

Those remain separately authoritative under the deployment profile.

## INV02 — invoice authority fields can be mixed

One invoice concept may contain:

- supplier source document/evidence — product evidence integrity, supplier source principal;
- product match/classification facts — `OWN`;
- external AP posting/liability ID/status/value — `MIRROR/REFERENCE`;
- statutory tax invoice/e-invoice status — external tax/accounting authority unless explicitly supported otherwise.

No whole-object co-master assumption is permitted.

## INV03 — match evaluation

Conceptual action:

`EvaluateInvoiceMatch`

Potential sources according to commitment kind/profile:

- Commitment/economic component;
- GoodsReceipt/return;
- certification/final account;
- supplier invoice evidence;
- tax/terms/mapping context where needed.

Result is an `InvoiceMatchResult` / exception fact, not AP posting.

Candidate states/results:

- matched;
- quantity/value/tax/reference mismatch;
- missing receipt/certification;
- duplicate suspected;
- external-accounting rejection/return;
- resolved/accepted exception under bounded policy.

Exact match profile is typed by commitment/deployment profile.

## INV04 — exception resolution

Resolving a match exception can produce one of:

- evidence correction/new supplier invoice revision;
- receipt correction;
- commercial correction/change;
- mapping/integration correction;
- bounded exception acceptance for accounting handoff;
- rejection/return to supplier/accounting process.

Match state never mutates product commercial truth merely to make invoice pass.

## INV05 — lifecycle

`captured source invoice`
→ match evaluation
→ matched OR exception
→ resolved/re-evaluated
→ accounting handoff/reference
→ external posted/paid states separately mirrored/referenced.

Source invoice correction uses new revision/credit-note/replacement evidence rather than rewriting history where load-bearing.

---

# 4. `Actual` is not one universal balance

The word `actual` is forbidden as an unqualified canonical commercial authority term because at least four different meanings exist:

1. **physical actual** — delivery/receipt/progress/milestone/service occurrence;
2. **commercial certified actual** — product-owned certified commercial amount/effect;
3. **accounting posted actual** — externally authoritative job-cost/AP/GL posting;
4. **cash paid actual** — externally authoritative payment/bank fact.

These may differ in time and amount.

## ACT01 — canonical names

Use explicit positions such as:

- `fulfilled/received quantity/value basis` where applicable;
- `certified_gross_to_date` / other typed commercial certified positions;
- `external_accounting_posted_actual`;
- `external_paid_cash`.

Reports/UI may display a user-facing `Actual`, but the report contract must declare which authority/position it means.

## ACT02 — no cross-authority fallback

If external accounting actual is unavailable/stale, product must not silently substitute certified commercial value and label it accounting actual.

A fallback/derived proxy must be explicitly named/typed.

---

# 5. Forecast position boundary

Forecast is a planning/projection truth, not committed/certified/accounting actual.

## FC01 — forecast inputs are explicit

Forecast may use supported inputs such as:

- current approved commitment;
- approved but not fully consumed allowances;
- instructed/provisional exposure;
- pending change/risk exposure according to forecast profile;
- expected remeasurement/quantity forecast;
- remaining requirement/planned need;
- external schedule/procurement forecast facts;
- explicit planner estimate/adjustment with provenance.

## FC02 — forecast profile/version

Any canonical forecast position binds a versioned derivation/profile defining:

- included source positions/events;
- treatment of pending/instructed/provisional values;
- currency/FX basis;
- planner adjustment authority;
- effective/as-of cut-off;
- scenario if more than one forecast is supported.

## FC03 — no silent promotion

Forecast/pending values never become commitment/certification/accounting truth without the corresponding governed domain event.

## FC04 — later reporting ownership

P1.8 may define exact forecast reports and formulas, but it must use these typed inputs/authority boundaries rather than inventing a new balance writer.

---

# 6. Lifecycle additions

Add to the P1.5 lifecycle coverage:

### Direct source

`proposed basis → approved/rejected/withdrawn → effective AwardDecision → external handoff or later Commitment`

Economic effect before Commitment: `NONE`.

### Supplier invoice/match

`source invoice captured → match evaluated → matched/exception → resolution/re-evaluation → external accounting handoff/reference`

Product economic effect: `NONE` unless exception resolution separately invokes a governed P07 correction/change action.

### Forecast

No independent economic lifecycle. Forecast versions/scenarios are planning/projection records over authoritative inputs.

---

# 7. One-XL / authority check

- direct source reuses P01/P02/P06/P07 authority and does not create a new procurement root;
- invoice match is evidence/exception/control seam, not AP;
- actual authority is explicitly split rather than duplicated;
- forecast is projection/planning, not ledger.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**

---

# 8. Current status

These hardenings introduce no new unresolved boundary choice.

They are included in the internal recheck and self-contained external audit packet.
