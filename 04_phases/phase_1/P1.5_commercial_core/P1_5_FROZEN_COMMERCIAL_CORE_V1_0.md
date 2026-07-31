# P1.5 — Commercial Core — FROZEN v1.0

**Date:** 2026-07-31  
**Status:** PASS / FROZEN  
**P1.5:** CLOSED  
**P1.6:** UNLOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Freeze scope

This document is the canonical semantic freeze for P1.5.

It consolidates the accepted Commercial Core decisions from:

- `P1_5_WORKPLAN_V0_1.md`;
- commercial event/balance frame;
- load-bearing fact/event catalogue;
- structural alternatives and Commitment economic kernel;
- money/correction/temporal kernel;
- authority/lifecycle/concurrency kernel;
- integrated candidates v0.1–v0.4;
- complete P01–P12 lifecycle matrix;
- transaction register TX-001–TX-056 and transition supplement;
- completeness/direct-source/invoice/actual/forecast hardening;
- targeted UAE/FIDIC evidence reconciliation;
- Claude hostile-audit rounds 1–3 and all accepted remediations/hardening;
- final ADR reconciliation.

Earlier candidates/remediation files remain decision-history evidence but do not override this freeze.

This freeze defines **commercial meaning, value authority, lifecycle, correction, conservation, control and temporal semantics**.

It does not choose SQL tables, ORM/class hierarchy, event-store technology, API payload shape, connector vendor/protocol, UI layout, lock technology or product code.

---

# 2. Structural graph

## F01 — polycentric procurement graph

V1 has no universal `ProcurementPackage`, `DemandLine`, `RequirementAllocation` or `ProcurementCase` root.

Canonical lineage:

`{DemandLine | PlannedRequirement}`
`→ RequirementAllocation lineage`
`→ [optional ProcurementPackage]`
`→ sourcing route`
`→ AwardDecision`
`→ [external handoff OR effective Commitment]`

Truth ownership:

- requirement source owns authorized need basis;
- `RequirementAllocation` owns procurement-scope consumption only;
- package owns grouping/planning only;
- `TenderEvent` owns competitive sourcing context;
- direct-source route owns explicit non-tender selection basis;
- `AwardDecision` owns buyer selection;
- `Commitment` owns effective supplier obligation when P07 is activated.

End-to-end case/navigation/reporting views are projections over canonical identities, not additional truth owners.

## F02 — no hidden allocation ledger

`RequirementAllocation` is not commitment/budget/accounting value truth.

FT-02/FT-06/FT-10 exact conservation mechanics remain evidence debt and may refine implementation without changing this boundary.

---

# 3. Scope, valuation and capability axes

## F03 — orthogonal axes

`ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile`.

### ScopeBasis

Answers: what authorized procurement scope is conserved?

Current semantic families include:

- `FIRM_QUANTITY`;
- `REMEASURABLE_QUANTITY`;
- `NON_QUANTIFIED_SCOPE`;
- explicit scope-partition/hybrid forms already supported by P1.2.

### ValuationBasis

Answers: by what contractual rule is monetary value determined?

Current closed set:

1. `FIRM_LUMP_SUM`
2. `UNIT_RATE_REMEASUREMENT`
3. `PROVISIONAL_SUM_ALLOWANCE`
4. `DAYWORK`
5. `MILESTONE`
6. `RATE_BASED_SERVICE`

### CapabilityProfile

Answers: what bounded execution/fulfilment/valuation/certification mechanism may operate?

Current closed set:

1. `QUANTITY_GOODS_FULFILMENT`
2. `PROGRESS_VALUATION`
3. `UNIT_RATE_REMEASUREMENT`
4. `MILESTONE_VALUATION`
5. `RATE_BASED_SERVICE`
6. `DELIVERABLE_ACCEPTANCE`
7. `ALLOWANCE_PROVISIONAL_MECHANISM`

Product-defined compatible compositions are allowed.

Tenant configuration cannot invent a new `ValuationBasis`, `CapabilityProfile`, financial formula language or arbitrary capability graph.

## F04 — valuation/capability reconciliation

| ValuationBasis | Supported capability treatment |
|---|---|
| `FIRM_LUMP_SUM` | `PROGRESS_VALUATION`, `MILESTONE_VALUATION` or `DELIVERABLE_ACCEPTANCE`; `QUANTITY_GOODS_FULFILMENT` may evidence fulfilment of a fixed baseline without remeasuring it |
| `UNIT_RATE_REMEASUREMENT` | `UNIT_RATE_REMEASUREMENT`, optionally with `PROGRESS_VALUATION` |
| `PROVISIONAL_SUM_ALLOWANCE` | `ALLOWANCE_PROVISIONAL_MECHANISM` plus an explicitly bound underlying supported valuation basis/profile for actual consumption |
| `DAYWORK` | `RATE_BASED_SERVICE` capability executes measured labour/plant/material/time/resource × bound rates while `ValuationBasis = DAYWORK` remains explicit |
| `MILESTONE` | `MILESTONE_VALUATION` |
| `RATE_BASED_SERVICE` | `RATE_BASED_SERVICE` |

The shared labels on different axes do not make the axes identical.

## F05 — valuation-basis parameters

Contractual parameters that affect authoritative valuation, such as daywork markups, attendance percentages, rate-table rules, caps or equivalent terms, belong to the governing `ValuationBasis` / contractual valuation-rule version.

They are load-bearing when the P1.4 test is met.

The execution capability may consume them but does not own their contractual meaning.

Exact physical storage remains later design.

---

# 4. Commitment and terms authority

## F06 — award ≠ Commitment

`AwardDecision` has no ordinary committed-cost effect by default.

Supplier obligation begins only through governed P07 commitment/minimum-obligation effectiveness.

## F07 — one semantic Commitment core

An effective supplier obligation has one semantic `Commitment` identity with common commercial kernel:

- tenant/project/ContractingAuthorityContext;
- counterparty relationship/registration context;
- formation/effectiveness evidence;
- immutable original baseline;
- RequirementAllocation binding(s) where scope-backed;
- terms-authority version where applicable;
- ScopeBasis / ValuationBasis / CapabilityProfile context;
- monetary calculation/FX/tax context as applicable;
- EffectSubject/economic-component lineage;
- change/correction/end history;
- authority/audit/concurrency invariants.

PO, subcontract, call-off/release and supported service/other kinds keep kind/profile semantics without creating separate commercial ledgers.

## F08 — CommercialTermsAuthority

Reusable rates/terms/formulas/validity/call-off rules may have independent identity without ordinary committed cost.

Each effective call-off/release/order is a separate `Commitment` binding the exact governing terms version.

---

# 5. Monetary minimums

## F09 — enforceable minimum obligation

If an arrangement itself creates an enforceable monetary minimum/take-or-pay/fee exposure, that exposure creates a linked P07 minimum `Commitment` obligation lineage.

It is never hidden inside non-economic terms metadata.

## F10 — minimum qualification credit

For an active minimum obligation lineage:

`applied_credit = min(qualifying_value, residual_before_credit)`

Only `applied_credit` emits `MINIMUM_QUALIFICATION_CREDIT` against the identified minimum `ObligationEffectKey`.

Excess qualifying value remains ordinary call-off value/evidence.

It emits no:

- negative minimum;
- transferable credit;
- banked credit;
- cross-period credit;
- cross-obligation credit.

## F11 — no hidden carry-forward

The current supported set does not support banking/carry-forward of excess qualifying minimum value.

A contract requiring carry-forward is unsupported by this mechanism until a prospective controlled architecture change introduces a distinct named right/effect with source/target obligation lineage, one-time conservation, expiry, correction, authority/evidence/config binding and historical-treatment rules.

Ordinary `MINIMUM_QUALIFICATION_CREDIT` may never be overloaded to approximate carry-forward.

Separate period minimums use distinct obligation lineages and the same qualifying economic value may not be credited twice.

Scope-backed minimum reservation remains RequirementAllocation scope authority and is distinct from monetary minimum exposure.

---

# 6. Economic conservation identity

## F12 — EffectSubject

Every monetary P07 effect resolves to:

`Commitment + EffectSubject`

`EffectSubject` is exactly one of:

1. `COMPONENT(EconomicComponentKey)`
2. `OBLIGATION(ObligationEffectKey)`

No third implicit/ad-hoc grain exists.

## F13 — EconomicComponentKey

Use `COMPONENT` for earnable/fulfillable/valued components such as commitment line, SOV section, milestone, deliverable, service unit/period, allowance component or governed scope partition.

Where existing identities cannot unify multiple mechanisms contributing to the same underlying value, P07 must use governed component mapping.

Receipt/certificate/UI/AI cannot invent an ad-hoc component key.

## F14 — ObligationEffectKey

Use `OBLIGATION` only for genuinely non-component obligation-level facts such as monetary minimum or a contract-level advance/recovery/tax component when explicitly supported by the governing basis.

It is not a parking bucket for unresolved component grain.

## F15 — dimension/subject matrix

| Dimension | Subject rule |
|---|---|
| `COMMITMENT_OBLIGATION` | COMPONENT or OBLIGATION fixed by baseline/profile; never both for same value |
| `MINIMUM_OBLIGATION` | OBLIGATION only |
| `MINIMUM_QUALIFICATION_CREDIT` | same OBLIGATION lineage as the minimum |
| `CERTIFIED_GROSS` | COMPONENT only |
| `RETENTION_HELD` | COMPONENT only |
| `ADVANCE_OUTSTANDING_EFFECT` | OBLIGATION by default; COMPONENT only under explicit component-allocated advance basis |
| `ALLOWANCE_CONSUMPTION` | COMPONENT only |
| `RECOVERY_EFFECT` | COMPONENT if component-linked; OBLIGATION only under explicit contract-level recovery basis |
| `COMMERCIAL_CERTIFICATE_TAX_COMPONENT` | COMPONENT when component-calculated; OBLIGATION only under explicit Commitment-level certificate-tax calculation basis |

Subject class is bound before effect emission by the governing baseline/change/minimum/advance/recovery/tax basis.

Projection cannot choose it later.

## F16 — one economic value once

The same underlying economic value cannot contribute twice to the same authoritative commercial position unless a governed reversal/correction/reclassification removes or transfers the prior contribution first.

- COMPONENT effects conserve by EconomicComponentKey lineage.
- OBLIGATION effects conserve by ObligationEffectKey lineage.
- movement between classes requires governed mapping/reclassification/correction.
- split/merge/reclassification never resets prior contribution.

## F17 — instructed work component identity

An effective instruction may establish work/scope authority before final price agreement.

Before instructed work can emit authoritative certification/commercial value, it must resolve to governed EconomicComponentKey lineage or an explicitly governed component mapping.

Provisional valuation authority cannot create an untracked recognition grain.

---

# 7. CommercialEffectVector

## F18 — effect algebra

Every economically effective P07 event emits immutable typed signed commercial effects under its bound EffectSubject.

This is product commercial effect algebra, not double-entry GL accounting.

Closed dimensions:

- `COMMITMENT_OBLIGATION`
- `MINIMUM_OBLIGATION`
- `MINIMUM_QUALIFICATION_CREDIT`
- `CERTIFIED_GROSS`
- `RETENTION_HELD`
- `ADVANCE_OUTSTANDING_EFFECT`
- `ALLOWANCE_CONSUMPTION`
- `RECOVERY_EFFECT`
- `COMMERCIAL_CERTIFICATE_TAX_COMPONENT`

Claim and assessment amounts remain separate authority-layer facts and do not enter certified effects merely because they are monetary.

## F19 — effect metadata

A load-bearing effect preserves as applicable:

- source event;
- Commitment;
- EffectSubject identity;
- dimension;
- signed exact-decimal amount/currency;
- MonetaryCalculationPolicy/version;
- business-effective time/period;
- cost-attribution binding;
- correction/reversal target;
- evidence/authority lineage.

No cached/current balance is independently editable.

---

# 8. Canonical positions

## F20 — current contractual obligation exposure

Derived from effective ordinary obligation effects plus minimum-obligation/qualification/release/correction effects under the governing derivation version.

## F21 — certified gross

Derived only from effective `CERTIFIED_GROSS` effects by Commitment/EconomicComponentKey/derivation context.

Claim and assessment are excluded.

## F22 — retention

`RETENTION_HELD` withholding increases retention outstanding; release/correction decreases it.

Retention does not reduce gross earned/certified semantics and is not unearned scope.

## F23 — advance

Advance outstanding derives from `ADVANCE_OUTSTANDING_EFFECT`.

Recoupment changes advance outstanding and, where applicable, net-payable presentation.

`ADVANCE_OUTSTANDING_EFFECT` never enters `CERTIFIED_GROSS` derivation.

Actual payment/cash may remain externally authoritative.

## F24 — allowance/provisional

Allowance remaining derives from authoritative allowance basis minus supported consumption/release/correction effects.

A provisional allowance may not become authoritative consumption/certification under an unnamed valuation rule.

## F25 — recovery

Recovery outstanding derives from `RECOVERY_EFFECT` under explicit sign/direction convention.

Replacement procurement authority/cost remains separate under CR-02.

## F26 — actual is not one universal truth

Distinguish:

- physical actual fulfilment;
- product commercial certified actual;
- external accounting-posted actual;
- external paid cash.

A report/UI labelled `Actual` must state which authority/position it means.

No cross-authority fallback may silently substitute another meaning.

## F27 — forecast

Forecast is a versioned planning/projection over explicit authoritative/planning inputs.

Forecast/pending/provisional values never become commitment/certification/accounting truth without the corresponding governed event.

---

# 9. Money, FX and tax

## F28 — exact decimal

Authoritative commercial money does not use binary floating point.

Money, rates, quantity/UOM, percentages, FX and tax rates carry appropriate precision semantics.

## F29 — MonetaryCalculationPolicy

Every load-bearing compound calculation binds a versioned bounded policy defining as applicable:

- currency roles/quantum;
- calculation precision;
- rounding mode/boundaries;
- ordered supported calculation stages;
- FX purpose/basis hooks;
- tax purpose/basis hooks;
- rounding-difference treatment;
- correction/reversal rule.

Tenant-authored formula scripting is not allowed in V1.

## F30 — purpose-specific FX

Evaluation, contractual, reporting, minimum-qualification, statutory tax-invoice and external accounting FX may have different authorities.

Each load-bearing conversion binds source/rate/fixing date/version.

### Minimum qualification FX

Applied minimum credit is evaluated in the minimum obligation's governing currency/basis.

If qualifying call-off value is in another currency, an explicit `MINIMUM_QUALIFICATION` FX purpose/basis must be bound before credit calculation.

It cannot silently reuse comparison/reporting/accounting FX.

## F31 — commercial certificate tax ≠ statutory tax

`COMMERCIAL_CERTIFICATE_TAX_COMPONENT` exists only when an activated versioned commercial certificate calculation policy requires product calculation.

It is a commercial certificate calculation/presentation/net-payable component only.

It never by itself constitutes statutory:

- VAT liability;
- date-of-supply/tax point;
- tax invoice/e-invoice;
- tax credit note/adjustment;
- AP liability;
- tax payment/cash truth.

Statutory tax facts retain separate P1.4 authority profiles, external by default unless a future explicitly supported deployment assigns a particular fact to the OS.

Matching numbers do not collapse the authority distinction.

---

# 10. Regional/GCC boundary

## F32 — common core with deterministic regional/contract profiles

UAE/GCC commercial semantics that affect commercial meaning are represented as evidence-driven bounded regional/contract policy over the common core.

They are not late presentation-only localization and do not create a separate GCC ledger/ontology.

Exact rates, statutory timing, localization obligations and jurisdictional defaults remain evidence-driven legal/product configuration inputs under ADR-0010.

ADR-0010 remains open/non-blocking for that later evidence work.

---

# 11. Cost attribution

## F33 — attribution before Commitment effectiveness

P01–P06 sourcing may proceed before final accounting/job-cost coding where deployment policy permits.

Before Commitment effectiveness, the Commitment binds explicit product commercial cost attribution sufficient for internal control.

This may be final mapping or explicit governed suspense/unallocated identity.

Suspense is visible, owned, aged, escalated and blocked from downstream states where final mapping is mandatory.

Detailed attribution/suspense operational mechanics remain non-blocking later refinement under ADR-0011.

---

# 12. Correction, finality and time

## F34 — no destructive economic edit

Economically significant history is not rewritten in place.

Correction modes remain distinct:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical/source reversal;
- reclassification;
- integration-only correction.

## F35 — effect-vector correction

True reversal emits exact negating effects under original semantics.

Replacement emits new effects.

Forward adjustment emits delta in permitted later period.

Reclassification transfers attribution with zero net commercial value.

Integration correction cannot mutate commercial truth merely to make synchronization pass.

## F36 — temporal semantics

Load-bearing history preserves:

- immutable event/record identity;
- recorded/audit time;
- business-effective time/period where material;
- bound policy/config/master/authority versions;
- correction/supersession lineage.

External facts preserve source version/effective context where available plus observed/fetched/freshness/conflict state.

Historical interpretation uses the governing versions, not current lookup.

Universal bitemporal tables are not mandated.

---

# 13. Workflow, authority and configuration

## F37 — workflow-to-domain seam

Workflow/task/approval outcome may authorize or produce an input consumed by a bounded deterministic domain command.

Workflow itself never writes commitment, receipt, certification, payment, balance or other commercial/accounting truth.

## F38 — bounded workflow/configuration

Supported control includes bounded approvals, DOA/threshold routing, delegation, sequential/parallel review, bounded conditions, returns/information requests, expiry/escalation, compliance/technical prerequisites and supported overrides.

Configuration is typed/versioned/auditable.

No arbitrary scripts, custom financial formulas, custom event types, custom state machines or generic mutation rules.

## F39 — ContractingAuthorityContext establishment/change

Before a load-bearing transaction requiring contracting/legal authority becomes effective, it binds an effective `ContractingAuthorityContext` version.

Initial establishment is governed and preserves tenant/project scope, represented legal entity or bounded multi-party arrangement, authority/evidence basis, effective start, provenance/version and relevant permitted scope.

Later change/retirement is effective-dated with in-flight treatment.

Historical transactions retain the exact governing context/version.

Contracting context grants no cross-tenant/partner access by itself.

---

# 14. Concurrency and numbering

## F40 — high-risk command semantics

High-risk state-changing commands use:

- stable idempotency identity;
- expected current state/version or causal precondition;
- atomic invariant/effect execution;
- multi-identity atomicity where conservation requires it;
- one successful effect per logical command;
- deterministic retry.

## F41 — identity ≠ display number

Immutable internal identity is separate from human/legal display numbering.

Numbering policy is versioned/bounded and may define scope, format, sequence, gap rule, allocation milestone, fiscal-date rule and cancellation/reuse behaviour.

No universal gapless promise exists unless evidence/contract/law requires it.

Retry of the same logical issuance returns the same result/number rather than consuming semantic duplicates.

---

# 15. Lifecycle completeness

## F42 — closed transaction register

P1.5 lifecycle completeness is measured against the canonical `P1_5_LOAD_BEARING_TRANSACTION_REGISTER_V0_1.md` membership `TX-001` through `TX-056`.

Every product state-changing member defines:

1. source state/context;
2. bounded command/action;
3. guards/domain invariants;
4. authority/control;
5. result event/state;
6. economic effect or explicit NONE/scope/external classification;
7. correction/reversal/supersession;
8. concurrency/idempotency;
9. evidence/config/version binding.

Projection-only views, caches, derived health/status, AI reasoning/proposals, external GL/AP/cash/tax journal lifecycles, full CDE, WMS and CPM activities do not receive fake product lifecycles.

## F43 — future transaction families

A new load-bearing transaction family may enter only prospectively through controlled register/version change.

Before activation it must define the full transition contract, effect subject/authority/derivation impact where relevant, preserve existing event meaning/history and pass affected golden-thread/Ceiling/Closed-Subgraph checks.

GT1–GT4 are coverage/execution samples, not membership proof.

---

# 16. Direct source, invoice, milestones and security

## F44 — direct source

Direct source is a sourcing route, not a fake tender/root.

It uses requirement/allocation, supplier eligibility, supplier contractable basis, justification, DOA/exception controls and ordinary `AwardDecision` semantics.

Pre-Commitment economic effect remains NONE.

Direct source remains optional A4 and does not burden A0–A3.

## F45 — supplier invoice/match

Captured supplier invoice/tax-invoice evidence remains source evidence.

Product may own match/classification/exception facts without owning AP liability/posting/payment.

Match state never mutates commercial truth merely to make an invoice pass.

## F46 — long-lead/status truth

No universal independent `TrackedItem` root exists.

Use thin milestone planning/observation anchored to canonical procurement lineage.

Keep `REQUIRED / PLANNED / FORECAST / CONFIRMED / ACTUAL` distinct.

Actual transactional milestone/status derives from canonical domain event or authoritative external source where applicable.

No manual second actual-status truth.

## F47 — security action

Security call/drawdown/claim is distinct from release/expiry.

A product commercial recovery arising from security action is a separate P07 recovery effect linked to the security action.

External bank/guarantor cash realization remains external authority.

P11 does not become banking/security-management software.

---

# 17. Evidence, audit and AI boundary inherited into later phases

## F48 — audit/history substrate

Commercial/audit history is append-only in economic meaning and compatible with controlled redaction/tombstoning.

Redaction/disposition may remove/restrict eligible payload while preserving event identity, financial meaning, referential integrity, evidence that disposition occurred and authority/audit trail under valid basis.

P1.6/P1.10 elaborate exact evidence storage, privacy, retention and hold mechanics without changing P1.5 commercial meaning.

## F49 — projection evolution

Projection/derivation definitions are explicit/versioned/traceable.

New event types may affect projections only under declared recalculation/effective-applicability rules.

Historical event meaning never changes silently.

## F50 — AI-derived influence

If AI/model/tool-derived extraction, mapping, classification, value or proposal materially influences a governed outcome and meets the P1.4 load-bearing test, preserve enough provenance for supported reconstruction.

As applicable preserve:

- underlying source evidence/version/location;
- machine-derived/proposed status;
- derivation/tool/model/config execution identity sufficient for supported reconstruction;
- human/domain acceptance/correction/transformation action;
- final authoritative fact/event.

AI-derived content enters as normalized/internal proposal/derived information according to the relevant domain layer.

It never becomes supplier source truth merely because it was extracted from supplier evidence.

Where supplier confirmation is required for contractable truth, supplier-authoritative confirmation/revision remains distinct.

Agents/models cannot directly emit arbitrary P07 effects or bypass domain guards.

P1.10 owns broader AI architecture.

---

# 18. Accounting/integration seam

## F51 — P07 commercial truth versus external accounting

Product P07 commercial truth remains distinct from external AP/payment/GL/job-cost/tax accounting authority.

Certification ≠ accounting posting/payment.

Commercial certificate tax ≠ statutory liability.

Invoice match ≠ AP liability.

Transport/mapping/reconciliation state ≠ business truth.

Connector is never authority merely because it moved/transformed data.

---

# 19. One-XL and activation

## F52 — one XL

P07 remains the only independent XL gravity well.

No independent ledger/control gravity well is introduced in RequirementAllocation, workflow, evidence, integration, accounting mirror, identity, scheduling, security, CDE, supplier network or AI memory.

## F53 — A0–A3 independence

A0–A3 remains usable without:

- direct-source execution;
- P07 execution;
- ERP/CDE connector;
- persistent supplier network/account;
- CPM/BPM platform;
- WMS/inventory;
- advanced AI;
- cross-tenant shared-learning mode.

First live tender target remains ≤5 working days from clean inputs with zero bespoke named connector prerequisite.

---

# 20. Explicit later-owned / evidence debt

The following remain open without reopening P1.5 commercial meaning:

- FT-02 exact RequirementAllocation mechanics;
- FT-06 exact remeasurement conservation practice;
- FT-09/CR-02 rectification/replacement capacity implementation;
- FT-10 universal exclusive-scope practice;
- ADR-0006 connector depth — P1.7;
- ADR-0010 exact GCC/regional legal/rate/statutory evidence/defaults;
- ADR-0011 detailed attribution/suspense operating mechanics;
- ADR-0016 external UX — P1.9/later UI;
- ADR-0017 broader AI readiness — P1.10;
- P1.6 evidence/document/message physical model;
- P1.7 APIs/integration/migration physical contracts;
- P1.8 report/query definitions;
- P1.9 UI/navigation/interaction design;
- P1.10 NFR/security/AI implementation;
- database/schema/ORM/event-store/locking implementation.

These later phases may choose representation and implementation but may not redefine P1.5 commercial truth by convenience.

---

# 21. Closure result

Internal hostile audit: FAIL → remediation → PASS.  
Claude round 1: FAIL on BL-14/15/16 → remediation.  
Internal recheck: PASS.  
Claude round 2: FAIL on BL-17/18 → remediation.  
Internal post-round-2 recheck: PASS.  
Claude round 3: **PASS / blockers none / G1–G9 PASS / regressions clean / P1.6 READY AFTER FINAL CHECKPOINT.**

**FINAL P1.5 RESULT: PASS / FROZEN.**

P1.6 may now specify the evidence/document/communication substrate against this Commercial Core.

Product code remains LOCKED.