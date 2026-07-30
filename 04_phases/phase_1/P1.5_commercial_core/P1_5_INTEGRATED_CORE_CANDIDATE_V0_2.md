# P1.5 — Integrated Commercial Core Candidate v0.2

**Date:** 2026-07-30  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**Supersedes for current candidate semantics:** `P1_5_INTEGRATED_CORE_CANDIDATE_V0_1.md`  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

## 1. Purpose and precedence

This is the coherent P1.5 candidate after the first internal hostile audit and remediation.

It incorporates:

- the P1.5 workplan;
- commercial event/balance frame;
- load-bearing catalogue;
- structural alternatives;
- commitment economic kernel;
- money/correction/temporal kernel;
- authority/lifecycle/concurrency kernel;
- internal-audit remediation for minimum obligation, EconomicComponentKey and CommercialEffectVector;
- complete P01–P12 lifecycle matrix;
- targeted authoritative UAE/FIDIC ADR-0010 evidence;
- long-lead/status candidate boundary.

Where this v0.2 wording differs from prior P1.5 candidates, v0.2 controls the current internal/external audit.

No database schema, ORM, event-store technology, API payload, workflow vendor or product code is selected.

---

# 2. Commercial Core thesis

The V1 deterministic Commercial Core is a **polycentric graph of bounded identities, events, authority relationships and derived projections** around one product-owned P07 commercial truth substrate.

It is not:

- package-rooted;
- RequirementAllocation-rooted;
- one universal ProcurementCase;
- one generic workflow state machine;
- one generic Commitment lifecycle;
- a full accounting ledger;
- a CDE/records platform;
- a supplier network;
- a CPM/master scheduler;
- an AI-owned truth system.

Primary path:

`authorized requirement source`
`→ RequirementAllocation lineage`
`→ optional package`
`→ sourcing transaction`
`→ AwardDecision`
`→ [external handoff OR effective Commitment]`
`→ change / fulfilment / claim / assessment / certification / release / recovery`
`→ immutable typed commercial effects`
`→ derived commercial positions`
`→ external accounting/tax reconciliation where configured`

---

# 3. Structural root

## C01 — polycentric procurement graph

V1 has no universal procurement root object.

- `DemandLine` and `PlannedRequirement` are authorized requirement-source families.
- `RequirementAllocation` owns procurement-scope consumption lineage where required.
- `ProcurementPackage` is optional grouping/planning context.
- `TenderEvent` owns tender sourcing context.
- `AwardDecision` owns buyer selection.
- `Commitment` owns effective supplier obligation in activated P07.
- End-to-end traceability is relationship/projection over those canonical identities.

A future higher-order case/navigation object may be introduced only if independently load-bearing; it cannot become an alternative truth owner by convenience.

**ADR-0003 candidate direction.**

---

# 4. Effective obligation model

## C02 — award ≠ obligation

`AwardDecision` has no ordinary committed-cost effect by default.

Supplier obligation begins only through a governed commitment-effectiveness event or another explicitly typed P07 obligation event.

## C03 — semantic Commitment core

An effective supplier obligation has one semantic `Commitment` identity and common commercial kernel:

- tenant/project/ContractingAuthorityContext;
- counterparty relationship/registration context;
- formation/effectiveness evidence;
- immutable original baseline;
- RequirementAllocation bindings where scope-backed;
- terms-authority version where applicable;
- monetary/valuation context;
- EconomicComponentKey lineage;
- change/correction/end history;
- authority/audit/concurrency invariants.

Business kinds such as PO, subcontract, call-off/release and supported service/other commitments keep explicit kind/profile semantics.

Kind does not create a separate commercial ledger.

## C04 — bounded capability profiles

Specific commercial/fulfilment behaviour is composed from a closed product-supported compatibility/profile set, for example:

- quantity goods fulfilment;
- progress valuation;
- remeasurement;
- milestone valuation;
- rate-based service;
- deliverable acceptance;
- allowance/provisional mechanism.

Profiles define allowed combinations, required component basis, valuation/certification path and correction/closeout constraints.

Tenant configuration selects supported profiles/parameters; it cannot author new commercial mechanism code or arbitrary capability graphs.

**ADR-0004 / ADR-0009 candidate direction.**

---

# 5. Terms authority and guaranteed minimums

## C05 — reusable terms authority

`CommercialTermsAuthority` owns reusable rates, formulas, terms, validity and call-off rules where they have independent business identity.

Ordinary reusable terms do not create committed cost merely by existing.

Each effective call-off/release/order is its own Commitment binding the exact terms-authority version.

## C06 — enforceable monetary minimum creates Commitment obligation truth

If effectiveness of an arrangement itself creates an enforceable monetary minimum/take-or-pay/fee exposure, that exposure creates a linked P07 **minimum Commitment obligation lineage**.

It is never hidden inside non-economic terms metadata.

## C07 — qualifying call-off offset

A qualifying call-off remains its own Commitment.

A bounded `MinimumQualificationEffect` or equivalent explicit relationship credits qualifying call-off value against residual minimum exposure according to the governing terms.

Conceptually:

`minimum_residual = max(0, effective minimum obligation - qualifying credits - valid settlement/release effects)`

Total arrangement exposure does not double-count qualifying call-off value.

Example:

- minimum obligation AED 1.0m;
- qualifying call-off AED 0.3m;
- call-off obligation = AED 0.3m;
- residual minimum = AED 0.7m;
- total floor exposure = AED 1.0m, not AED 1.3m.

If qualifying call-offs reach AED 1.2m, residual minimum = 0 and ordinary call-off obligation = AED 1.2m.

## C08 — scope-backed minimum is separate

A guaranteed minimum based on identifiable physical scope may reserve RequirementAllocation capacity.

Scope reservation and monetary minimum exposure are distinct concepts even if one contract uses both.

---

# 6. Economic conservation identity

## C09 — mandatory EconomicComponentKey

Every event that can contribute to an authoritative P07 commercial value projection must resolve to a stable `EconomicComponentKey` within its Commitment lineage.

The key may reuse an existing:

- commitment line;
- SOV line/section;
- milestone;
- deliverable;
- service unit/period;
- contract scope partition.

Where existing identities cannot unify multiple value mechanisms, a thin mapping/component identity is required.

A separate universal component table/object is not mandated.

## C10 — canonical recognition grain

All mechanisms contributing to the same underlying economic value resolve to the same component lineage.

Receipt, stored-material, installation, milestone, service and certification mechanisms cannot invent incompatible keys for the same value.

## C11 — split/merge is history-preserving

If contractual structure legitimately splits/merges components:

- original component keys remain historical;
- new keys/lineage are explicit;
- prior recognized/certified contribution transfers into current projection by explicit lineage rules;
- split/merge cannot reset cumulative recognized value.

## C12 — one economic value once

> The same underlying economic value cannot contribute twice to the same authoritative commercial position unless a governed reversal/correction removes or reclassifies the prior contribution first.

This is a P07 conservation invariant, not a universal construction scope ontology.

---

# 7. Commercial event/effect algebra

## E01 — event families

Candidate semantic families:

1. requirement/scope authority;
2. terms authority;
3. award selection — non-economic by default;
4. commitment/minimum-obligation formation;
5. commitment change;
6. instruction/provisional authority;
7. fulfilment/acceptance;
8. supplier claim;
9. buyer assessment;
10. certification;
11. retention/advance/allowance release/effect;
12. recovery/contra;
13. correction/reclassification;
14. closeout/end;
15. external accounting/tax interface facts;
16. non-economic integration/audit/redaction/authority-transfer.

## E02 — CommercialEffectVector

Every economically effective P07 event contributes one or more immutable typed signed effects at Commitment + EconomicComponentKey grain where applicable.

This is product commercial effect algebra, **not double-entry GL accounting**.

Candidate closed core dimensions:

- `COMMITMENT_OBLIGATION`
- `MINIMUM_OBLIGATION`
- `MINIMUM_QUALIFICATION_CREDIT`
- `CERTIFIED_GROSS`
- `RETENTION_HELD`
- `ADVANCE_OUTSTANDING_EFFECT`
- `ALLOWANCE_CONSUMPTION`
- `RECOVERY_EFFECT`
- `CERTIFICATE_TAX_COMPONENT` only where product calculates a certificate tax component

Scope authority is not a monetary effect vector.

Claim and assessment monetary values remain separate authority-layer facts/projections and do not become certified effects.

## E03 — effect metadata

Each effect identifies as applicable:

- source event;
- Commitment;
- EconomicComponentKey;
- dimension;
- signed exact decimal amount + currency;
- MonetaryCalculationPolicy/version;
- effective time/period;
- cost-attribution binding;
- correction/reversal target;
- evidence/authority lineage.

## E04 — canonical projection rule

Authoritative commercial positions derive by summing/transforming effective effect vectors under an explicit derivation version and scope/component/attribution/effective-time rules.

No cached/current balance is an independent writer.

---

# 8. Canonical derived positions

## P01 — authorized requirement remaining

Derived from requirement basis and RequirementAllocation lineage.

Exact FT-02/06/10 conservation mechanics remain falsifiable.

## P02 — current contractual obligation exposure

Derived from effective ordinary `COMMITMENT_OBLIGATION` effects plus residual minimum-obligation logic:

`ordinary obligation + minimum obligation + minimum qualification credits + valid release/correction effects`

with qualification credits capped/linked so qualifying call-off value is not double counted.

## P03 — certified gross to date

Sum effective `CERTIFIED_GROSS` vectors by Commitment/EconomicComponentKey and derivation context.

## P04 — retention outstanding

Sum effective `RETENTION_HELD` effects; withholding increases, release/correction decreases.

Retention is not unearned scope and does not erase gross certified work.

## P05 — advance outstanding

Derived from effective `ADVANCE_OUTSTANDING_EFFECT` contributions under the bound advance basis; recoupment/release/correction reduce the position.

Advance cash/payment remains external where configured.

## P06 — allowance/provisional remaining

Authoritative allowance basis minus effective `ALLOWANCE_CONSUMPTION`, reduction/release/correction according to the bound contract policy.

## P07 — recovery outstanding

Derived from `RECOVERY_EFFECT` under an explicit sign/direction convention.

Replacement procurement authority/cost remains separate under CR-02.

## P08 — certificate tax component

Where product calculates tax inside a commercial certificate, `CERTIFICATE_TAX_COMPONENT` is a commercial calculation effect only.

It is **not automatically statutory VAT liability/date-of-supply/tax-invoice truth**.

## P09 — external posted/paid/tax state

External authoritative accounting/tax facts remain MIRROR/REFERENCE/OUT according to the P1.4 authority profile.

## P10 — reconciliation difference

Operational comparison between product commercial truth and external authoritative facts, not a second financial writer.

---

# 9. Money and calculation policy

## M01 — exact decimal / explicit currency

No binary floating point for authoritative commercial money.

Distinguish money, rate, quantity/UOM, percentage, FX rate and tax rate precision.

## M02 — MonetaryCalculationPolicy

Every load-bearing compound calculation binds a versioned bounded policy defining:

- currency roles/quantum;
- calculation precision;
- rounding mode/boundaries;
- ordered supported calculation stages;
- FX purpose/basis hooks;
- tax purpose/basis hooks;
- rounding-difference treatment;
- correction/reversal rule.

No arbitrary formula scripting.

## M03 — currency roles

Contract/commitment currency, component-rate currency where valid, budget currency, reporting currency and external accounting-posting currency may differ.

Original authoritative currency value is preserved.

## M04 — purpose-specific FX

Comparison/evaluation, contractual, reporting, statutory tax-invoice and external accounting FX can have different authorities.

Each load-bearing use binds source/rate/fixing date/version rather than current lookup.

## M05 — UAE tax authority boundary from targeted evidence

Current UAE VAT law/guidance confirms that commercial certification is not a universal statutory tax point.

Date-of-supply can depend on supply completion/transfer, invoice/payment and continuous-supply rules; later changes to consideration/returns/errors can require explicit tax adjustment/credit-note treatment; foreign-currency tax invoices use the statutory tax FX basis.

Therefore:

- certificate-commercial tax component is separate from statutory tax liability;
- statutory tax point/date-of-supply, tax invoice/e-invoice, tax credit note and tax posting each have explicit authority profiles;
- by default they may remain external accounting/tax MIRROR/REFERENCE/OUT facts;
- product commercial correction may cause/relate to external tax adjustment without becoming VAT journal accounting.

No new P07 ledger/event family is required.

---

# 10. GCC/regional semantics boundary — ADR-0010 candidate

Targeted authoritative UAE VAT evidence plus authoritative FIDIC contract structure found no missing commercial truth owner/event family.

The candidate direction is:

> Core commercial semantics expose first-class deterministic regional/contract policy dimensions where they affect commercial meaning. UAE/GCC-specific defaults, tax rules, retention/advance/security/certification/final-account rules and contractual profiles are evidence-driven bounded profiles over the same core—not late presentation-only localization and not a forked GCC ontology/ledger.

Known separations preserved:

- certification ≠ statutory VAT tax point;
- certification ≠ payment/accounting posting;
- advance ≠ earned value;
- retention ≠ unearned scope;
- measurement/evaluation ≠ variation;
- provisional sum/daywork are explicit valuation mechanisms;
- correction/credit-note adjustment ≠ in-place rewrite;
- tax FX ≠ comparison/contract/reporting FX;
- interim certification ≠ final account/final certification.

Specific law/rate/default claims remain legal/product/configuration evidence, not universal architecture truth.

---

# 11. Cost attribution — ADR-0011 candidate

P01–P06 sourcing may proceed before final detailed accounting/job-cost coding where deployment policy permits.

Before Commitment effectiveness, each Commitment must bind an explicit product commercial cost-attribution identity/profile sufficient for internal control.

Allowed states may include:

- final cost/work breakdown attribution; or
- explicit governed `SUSPENSE / UNALLOCATED` attribution.

Suspense:

- is a real visible attribution identity, not null/unknown;
- requires permission/approval, owner, aging/deadline and escalation;
- has a deployment-defined hard resolution gate;
- may not pass the first product certification or external accounting/job-cost handoff requiring final mapping;
- may not reach commercial closeout unresolved.

Goods flows without product certification must resolve before required accounting/job-cost handoff or closeout.

Later reclassification is history-preserving and zero-net commercial value.

---

# 12. Correction/finality algebra

Economically effective history is never corrected by in-place economic mutation.

Supported semantic correction intents:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical/source reversal;
- reclassification;
- integration-only correction.

## C13 — true reversal

References original effect vector or explicit slice and contributes exact negating effect under original monetary semantics.

## C14 — replacement

Contributes new independently bound effect vectors under the replacement event's context.

## C15 — forward adjustment

Contributes only signed delta in the new allowed effective period.

## C16 — reclassification

Zero-net total commercial value; explicit from→to attribution transfer of identified effect slice.

## C17 — non-economic/integration correction

Zero commercial effect vector.

Closed-period/authority rules choose permitted correction path; they never justify historical overwrite.

Redaction/tombstoning is separate and cannot change economic meaning.

---

# 13. Temporal model — ADR-0019 candidate

Use a hybrid temporal model:

### domain/economic events

- immutable event identity;
- recorded/audit time;
- business-effective time/period where material;
- correction/supersession lineage.

### load-bearing mutable master/config

- immutable version;
- effective/valid applicability;
- recorded/audit creation;
- controlled migration/supersession.

### external MIRROR/REFERENCE

- source ID/version;
- source effective time where available;
- observed/fetched time;
- freshness/conflict.

Historical interpretation uses bound governing versions, not current lookup.

Backdating and in-flight migration are governed operations.

The substrate must support both:

- business-effective history; and
- where audit requires it, what was recorded/known by a prior cut-off.

Universal bitemporal tables are not required.

---

# 14. Workflow/configuration — ADR-0008/0009 candidate

Shared deterministic control primitives may include:

- sequential/parallel approval;
- DOA/threshold routing;
- delegation;
- bounded typed conditions;
- return/request-info;
- task/ball-in-court;
- expiry/escalation;
- compliance/technical prerequisite;
- explicit bounded override where domain policy allows.

Workflow result is consumed by domain command and never directly owns commercial state.

Configuration is constrained, typed, versioned and auditable.

No arbitrary tenant-authored:

- scripts/code;
- financial formula language;
- event types;
- state machines;
- data mutation rules;
- authorization language;
- agent authority logic.

---

# 15. State-change / agent-safe command contract

Every load-bearing action resolves through:

`CommandRequest`
`→ current principal/security`
`→ bound policy/config`
`→ approval/control outcome where required`
`→ deterministic invariant validation`
`→ concurrency/idempotency check`
`→ atomic domain transition/effect`
`→ audit/evidence`
`→ derived projections/integration notification`

Each command defines target identity, context, actor, bound versions, expected state, idempotency identity, guards, approval requirements, business-effective rule, effect/event, correction path and evidence.

Future agents use exactly this action surface and cannot mutate truth directly.

---

# 16. Concurrency / numbering — ADR-0023 candidate

## Concurrency

High-risk commands require:

- stable idempotency identity;
- current expected state/version or equivalent causal precondition;
- atomic invariant + authoritative effect;
- multi-identity conservation where allocation/components span records;
- exactly one successful effect for one logical command;
- deterministic retry result.

## Numbering

- immutable internal identity separate from display number;
- versioned numbering policy by bounded scope;
- defined allocation milestone;
- retry returns same number for same logical allocation;
- historical number not silently reused;
- no universal gapless promise;
- verified gap/fiscal requirements are explicit policy;
- business-effective/issue-date rule for fiscal sequence explicit;
- backdated allocation governed.

---

# 17. Lifecycle completeness

The current P1.5 lifecycle matrix covers load-bearing transitions for:

- P01 requirement basis/allocation/package;
- P02 supplier relationship/qualification/eligibility;
- P03 tender open/release/addenda/deadline/close/cancel/re-tender;
- P04 participation/intent/bid revisions/withdraw/non-response/grants;
- P05 normalization/adjustment/snapshot/re-evaluation;
- P06 recommendation/approval/AwardDecision/withdraw/handoff;
- P07 terms authority/minimum obligation/Commitment formation;
- P07 changes/instruction/provisional authority/agreement;
- P07 goods receipt/return/reinspection;
- P07 claim/assessment/certification/correction/retention/advance/allowance;
- P08 accounting export/reference/rejection/reconciliation/payment mirror;
- P09 approval/task/outcome/domain command;
- P10 milestone plan/actual projection/expediting exception;
- P11 closeout/final account/security/warranty/recovery/end;
- P12 technical approval dependency/reference/gate;
- cross-cutting correction/reclassification/redaction/authority transfer.

Each transition identifies source state/context, command/action, guard family, authority/control, result, economic effect or NONE, correction route, concurrency/idempotency expectation and evidence/version binding.

Projection/interface concepts do not receive fake independent lifecycles.

---

# 18. Long-lead / status boundary — ADR-0007/0013 candidate

## Long-lead identity

Reject a universal independent `TrackedItem` root.

Use thin `ProcurementMilestoneInstance` planning/observation identities anchored to existing canonical subject lineage such as PlannedRequirement, RequirementAllocation, Package, TenderEvent, AwardDecision, Commitment, EconomicComponentKey, technical approval dependency or external shipment reference.

Continuity is the requirement→allocation→sourcing→award→commitment/component lineage, not a second mirror object.

## Date/status semantics

Keep distinct:

- required;
- planned;
- forecast;
- confirmed;
- actual.

Actual transactional status/date derives from canonical domain/external authoritative events where possible.

Planning/required/forecast/confirmed values remain explicit typed inputs with source/authority.

Health/status projections derive from planning facts + actual events + dependencies under versioned rules.

No independently editable manual “actual status” competes with canonical events.

P10 remains procurement planning/expediting overlay, not CPM.

---

# 19. Evidence debt retained

P1.5 does not claim universal practitioner proof for:

- FT-02 exact RequirementAllocation mechanics;
- FT-06 remeasurement conservation implementation;
- FT-09/CR-02 rectification/replacement capacity;
- FT-10 exclusive-scope authority;
- specific UAE/GCC tax/retention/security/certification defaults beyond authoritative evidence reviewed;
- mandatory gapless/fiscal numbering rules.

Architecture can support those invariants without falsely labeling unobserved mechanics as universal practice.

---

# 20. ADR ownership / deferral boundary

## P1.5 candidates requiring final hostile validation before acceptance

- ADR-0003 structural root;
- ADR-0004 Commitment/type composition;
- ADR-0007 long-lead object model;
- ADR-0008 workflow breadth;
- ADR-0009 configuration breadth;
- ADR-0010 GCC/regional core semantics;
- ADR-0011 cost attribution timing;
- ADR-0013 event-derived vs planned status;
- ADR-0015 correction/finalization;
- ADR-0019 temporal model;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency.

## Intentionally later/non-blocking for P1.5 meaning

- ADR-0006 connector depth — P1.7 implementation/integration choice, subject to zero connector prerequisite;
- ADR-0016 external-party UX priority — later UI/external experience; identity semantics already frozen;
- ADR-0017 broader AI-readiness — P1.10 residual; bounded action/provenance/isolation substrate already frozen.

Accepted P1.4 ADRs remain inherited and are not reopened.

---

# 21. GT-1–GT-4 recheck

## GT-1 standard subcontract

Requirement → allocation → optional package → tender → comparison → award → subcontract Commitment → claim → assessment → certification → retention/advance → change/instruction → later certification → final account/release/end.

No architecture invention; effect-vector and component-key conservation apply.

**PASS candidate.**

## GT-2 imported long-lead equipment

PlannedRequirement → allocation → tender/award → PO Commitment → advance/security refs → technical dependency → milestone overlay → delivery/receipt/return → accounting seam → recovery/replacement if needed.

No TrackedItem mirror; actuals derive from canonical events.

**PASS candidate.**

## GT-3 claim/certification

Commitment/component → claim → measurement/evidence → assessment → MonetaryCalculationPolicy → certification command/effects → retention/advance/recovery/certificate-tax component → external AP/tax/payment facts → later correction.

Commercial tax component kept separate from statutory VAT fact.

**PASS candidate.**

## GT-4 instructed variation

Commitment → instruction authority → scope-basis effect where valid → provisional valuation → progress/certification → later supplier agreement/effective change → effect-vector reconciliation/current projections.

No destructive rewrite.

**PASS candidate.**

---

# 22. Ceiling Test v0.2

1. **Multi-entity/JV:** ContractingAuthorityContext + policy/attribution bindings work without ontology fork — PASS.
2. **Cross-country vendor:** exact counterparty registration/tax context bound to transaction; supplier relation remains tenant-private — PASS.
3. **Multi-currency:** purpose-specific currency/FX roles; same effect algebra — PASS.
4. **Authority change in flight:** bound historical policy + live security + explicit migration/re-evaluation — PASS.
5. **Different fiscal semantics:** period/numbering/monetary policy context, not separate ledger — PASS.
6. **Contextual vendor status:** relationship stable; eligibility contextual; no supplier duplication for status — PASS.

**CEILING TEST: INTERNAL CANDIDATE PASS.**

---

# 23. Closed Sub-graph Gate v0.2

## A0–A3

Requirement/allocation → optional package → tender/bid → comparison → approval/AwardDecision → external handoff.

No P07/ERP/CDE/network/AI/CPM/WMS dependency.

**PASS.**

## Goods P07 slice

Commitment + goods capability + receipt/return + bounded milestones + external accounting seam can operate without subcontract-certification UI/system.

**PASS candidate.**

## Subcontract P07 slice

Commitment + progress valuation + claim/assessment/certification + retention/advance + accounting interface can operate without WMS/CPM/full CDE/full ERP.

**PASS candidate.**

## Future additivity

New capability/event types may be added through controlled architecture/version evolution without rewriting old event meaning; projections version derivations.

**PASS.**

**CLOSED SUB-GRAPH: INTERNAL CANDIDATE PASS.**

---

# 24. Audit/history/redaction and known-at reconstruction

Candidate supports:

- immutable identity;
- recorded and business-effective time;
- bound configuration/evidence versions;
- correction effect lineage;
- redaction/disposition tombstone without economic mutation;
- `known-at` distinction for late-recorded/backdated events;
- projection derivation version;
- inability to fabricate missing provenance.

**INTERNAL CANDIDATE PASS.**

---

# 25. One-XL and object-explosion audit

- P07 owns commercial obligation/change/valuation/certification/recovery effects.
- RequirementAllocation owns non-monetary scope consumption.
- P08 owns interface/reconciliation metadata.
- P09 owns bounded control.
- P10 owns thin milestone/planning overlay.
- P11 owns bounded closeout/security/warranty relationships and P07 recovery/release effects where commercial.
- P12 owns dependency/gate seam.
- CommercialEffectVector is P07 effect algebra, not GL.
- EconomicComponentKey is conservation identity, not a scope ontology.
- Workflow/configuration are bounded, not BPM/no-code.
- AI/agents own no commercial truth.

Durable top-level identity is promoted only where independent lifecycle, external reference, concurrency/authority boundary, immutable revision lineage, many-to-many reference or reconstruction requires it.

**SECOND XL: CLEAN.**  
**OBJECT EXPLOSION: CONTROLLED CANDIDATE.**

---

# 26. Current candidate verdict

All five blockers from `P1_5_INTERNAL_HOSTILE_AUDIT_V0_1.md` have candidate remediations:

- BL-P15-01 minimum obligation identity — CLOSED;
- BL-P15-02 EconomicComponentKey — CLOSED;
- BL-P15-03 CommercialEffectVector algebra — CLOSED;
- BL-P15-04 complete lifecycle coverage — CLOSED;
- BL-P15-05 targeted regional evidence — CLOSED.

Additional ADR sweep:

- ADR-0007 candidate resolved;
- ADR-0013 candidate resolved;
- ADR-0006/0016/0017 explicitly routed later.

`READY FOR INTERNAL RECHECK — NOT FROZEN / ADR STATUSES UNCHANGED.`

---

# 27. Next action

Run `audits/P1_5_INTERNAL_RECHECK_V0_1.md` against this v0.2 candidate.

If internal PASS:

1. prepare one self-contained Claude P1.5 hostile-audit packet with no repo access assumption;
2. retain P1.5 ACTIVE and P1.6/product code LOCKED;
3. make no ADR status changes until Claude PASS and final P1.5 reconciliation.
