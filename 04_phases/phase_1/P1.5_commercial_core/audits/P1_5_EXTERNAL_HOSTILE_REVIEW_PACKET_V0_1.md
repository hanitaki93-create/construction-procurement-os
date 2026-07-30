# Construction Procurement OS — P1.5 Self-Contained External Hostile Review Packet v0.1

**Date:** 2026-07-30  
**Reviewer:** Claude / independent hostile auditor  
**Repository access:** NOT REQUIRED / DO NOT REQUEST  
**Stage:** P1.5 — Commercial Core  
**Status entering review:** INTERNAL RECHECK PASS / P1.5 ACTIVE / P1.6+ LOCKED / PRODUCT CODE LOCKED

---

# 1. Audit instruction

Audit only the material in this packet. You do not have repository access and none is required.

Your task is to decide whether P1.5 has frozen the **meaning of the deterministic commercial core** strongly enough that later architecture can choose physical storage, API, integration, reporting and UI representations without re-deciding:

- procurement structural root;
- obligation identity;
- scope versus value authority;
- economic value conservation;
- canonical commercial effect/balance algebra;
- money/FX/tax/rounding semantics;
- correction/finality/temporal meaning;
- lifecycle/state-transition meaning;
- authority/workflow/concurrency/numbering semantics;
- long-lead/status truth;
- accounting/tax boundary;
- first-build decomposability.

Be hostile and independent. Treat our internal PASS as a claim to attack.

Do not fail P1.5 merely because SQL tables, aggregate implementation, event-store technology, API payloads, connector protocol, UI layout, exact tax rates, exact numbering format, lock technology, or AI implementation remain later work.

Fail P1.5 if a remaining ambiguity would force a builder/later phase to choose **what commercial truth means, who owns it, how economic value is conserved/derived, or what lifecycle/action changes it**.

---

# 2. Frozen upstream constraints

## Phase state

- P1.0 CLOSED.
- P1.1 FROZEN.
- P1.2 CLOSED.
- P1.3 CLOSED.
- P1.4 PASS / CLOSED / FROZEN.
- P1.5 ACTIVE.
- P1.6+ LOCKED.
- Product code NOT STARTED / LOCKED.

## Beachhead

UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the product must coexist with.

## Burden controls

- 84 controlled scope areas.
- P07 commitment/change/valuation/commercial truth is the only intended independent XL gravity well.
- Standard configuration to first live tender <=5 working days from clean inputs.
- Bespoke named connectors required before first live tender = 0.

Reject as independent V1 gravity wells:

- full GL/AP/cash ERP;
- generalized BPM/low-code;
- CPM/master schedule;
- legal claims/banking/insurance;
- CDE/records management;
- WMS/inventory;
- mandatory supplier network.

## A0-A3 first-value rail

`requirement / MR / package`
`→ RFQ/tender`
`→ supplier response capture`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

A0-A3 must work without P07, ERP/CDE connector, persistent supplier network, CPM/BPM, WMS or advanced AI.

Controlled direct-source/direct-purchase remains a later A4 route, not a mandatory first-release route.

## Comparison truth

Four layers remain distinct:

1. supplier source submission/revision;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

## P1.2 evidence debt preserved

- FT-02 RequirementAllocation exact mechanics — PRIMARY_UNOBSERVED / HIGH RISK.
- FT-06 remeasurement conservation implementation — INSUFFICIENT_PRIMARY / HIGH RISK.
- FT-09 rectification/replacement capacity — PRIMARY_UNOBSERVED; CR-02 binding before P07 fulfillment implementation.
- FT-10 exclusive-scope authority — PRIMARY_UNOBSERVED / HIGH RISK.

CR-02:

- reversible source fulfillment may restore capacity only through valid history-preserving reversal/release;
- irreversible fulfilled/certified defective work does not silently return capacity;
- replacement procurement needs genuine additional/returned authority;
- recovery against original supplier is separate from replacement authorization/cost.

## P1.4 frozen authority constraints

- tenant isolation, including indirect/model-mediated cross-tenant use;
- ContractingAuthorityContext, including bounded multi-party case without implied partner access;
- tenant-private supplier business relationships;
- external grant can never satisfy internal role/delegation/DOA/domain authorization;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authoritative writer/source per effective period;
- frozen load-bearing test: outcome dependence OR counterfactual materiality OR reconstruction necessity;
- evidence provenance/history, bounded retention/disposition/tombstone;
- tenant-level residency and governed migration;
- load-bearing config/version binding + live current security;
- product commercial truth separate from external accounting truth;
- connector never business authority;
- shared AI executable allowed, shared private tenant learned knowledge OUT by default;
- future agents act only through bounded domain actions.

---

# 3. P1.5 gate

P1.5 must not close unless:

1. every retained derived commercial balance has one canonical derivation over commercial events/effects or explicit external authority;
2. every SPINE/load-bearing transaction has a complete lifecycle;
3. every state transition identifies guard, authority/control, economic effect, result event/state, reversibility/correction, concurrency/idempotency and evidence/version binding;
4. golden threads 1–4 execute on paper with zero architecture invention;
5. Ceiling Test passes;
6. Closed Sub-graph Gate passes;
7. audit/redaction/tombstone compatibility passes;
8. projection reproducibility passes;
9. P07 remains sole independent XL;
10. A0-A3 remains a closed viable subgraph;
11. core-freeze ADRs are decided semantically or proven later-owned/non-blocking;
12. hostile internal + Claude review pass;
13. product code stays locked throughout P1.5.

---

# 4. Candidate structural root

## Polycentric graph — leading/freeze candidate

There is no universal ProcurementPackage, DemandLine, RequirementAllocation or ProcurementCase root.

Canonical graph:

`{DemandLine | PlannedRequirement}`
`→ RequirementAllocation lineage`
`→ [optional ProcurementPackage]`
`→ sourcing route`
`→ AwardDecision`
`→ [external handoff OR effective Commitment]`

Truth ownership:

- requirement source owns authorized need basis;
- RequirementAllocation owns scope-consumption lineage only;
- package groups/plans but does not own need/value;
- TenderEvent owns competitive sourcing event;
- direct-source route owns its explicit justification/selection basis without pretending a tender occurred;
- AwardDecision owns buyer selection;
- Commitment owns effective supplier obligation in P07.

End-to-end navigation/reporting is graph/projection, not a new truth object.

Package-root, DemandLine-root, Allocation-root and universal ProcurementCase were rejected because each either contradicts observed routes, creates fake containers, or accumulates second-gravity state.

**Candidate ADR-0003.**

---

# 5. Commitment / terms / minimum model

## Award ≠ Commitment

AwardDecision has no ordinary committed-cost effect by default.

An effective supplier obligation begins only through a governed P07 obligation transition.

## One semantic Commitment core

An effective supplier obligation has one semantic Commitment identity with:

- tenant/project/ContractingAuthorityContext;
- counterparty relationship/registration context;
- formation/effectiveness evidence;
- immutable original baseline;
- RequirementAllocation binding(s) where scope-backed;
- terms-authority version where applicable;
- monetary/valuation context;
- EconomicComponentKey lineage;
- change/correction/end history;
- authority/audit/concurrency invariants.

PO, subcontract, call-off/release and supported service/other commitment kinds keep kind-specific profile semantics without separate commercial ledgers.

## Closed bounded capability profiles

Candidate mechanisms include:

- quantity goods fulfillment;
- progress valuation;
- remeasurement;
- milestone valuation;
- rate-based service;
- deliverable acceptance;
- allowance/provisional mechanism.

Tenant may choose supported profile/parameters but cannot author arbitrary capability graphs/formula code.

## CommercialTermsAuthority

Reusable terms/rates/formulas/call-off rules may exist without ordinary committed cost.

Each call-off is a separate Commitment binding exact terms version.

## Enforceable monetary minimum

If a framework/terms arrangement itself creates an enforceable minimum/take-or-pay/fee obligation, that exposure creates a linked P07 minimum Commitment obligation lineage rather than hiding value inside terms metadata.

A qualifying call-off remains a separate Commitment but receives an explicit qualification credit against residual minimum exposure.

Conceptual residual:

`max(0, effective minimum obligation - qualifying credits - valid settlement/release effects)`

AED 1.0m minimum + AED 0.3m qualifying call-off = AED 0.3m call-off obligation + AED 0.7m residual minimum, not AED 1.3m total.

Scope-backed minimum reservation remains RequirementAllocation scope authority and is distinct from monetary minimum exposure.

**Candidate ADR-0004.**

---

# 6. EconomicComponentKey and one-economic-value-once

Every event that can contribute to authoritative P07 commercial value must resolve to a stable `EconomicComponentKey` inside Commitment lineage.

The key may reuse an existing line, SOV section, milestone, deliverable, service period/unit or contract scope partition.

If those cannot unify multiple mechanisms for the same underlying value, a thin mapping/component identity is required.

All mechanisms contributing to the same economic value must resolve to the same canonical recognition grain.

Component split/merge is explicit/history-preserving and cannot reset prior recognized value.

One event affecting several components must have explicit component-level contribution/allocation.

Hard invariant:

> The same underlying economic value cannot contribute twice to the same authoritative commercial position unless a governed reversal/correction removes or reclassifies the prior contribution first.

This identity is for commercial conservation only; it is not a universal construction scope ontology.

---

# 7. CommercialEffectVector — canonical commercial effect algebra

Every economically effective P07 event emits one or more immutable typed signed effects at Commitment + EconomicComponentKey grain where applicable.

This is NOT double-entry GL accounting.

Closed candidate dimensions:

- `COMMITMENT_OBLIGATION`
- `MINIMUM_OBLIGATION`
- `MINIMUM_QUALIFICATION_CREDIT`
- `CERTIFIED_GROSS`
- `RETENTION_HELD`
- `ADVANCE_OUTSTANDING_EFFECT`
- `ALLOWANCE_CONSUMPTION`
- `RECOVERY_EFFECT`
- `CERTIFICATE_TAX_COMPONENT` where product calculates certificate tax

Scope authority is not monetary effect-vector truth.

Claim and assessment monetary values remain separate authority layers and do not enter certified effects merely because they are money.

Each effect binds as applicable:

- source event;
- Commitment;
- EconomicComponentKey;
- effect dimension;
- signed exact decimal amount + currency;
- MonetaryCalculationPolicy/version;
- business-effective time/period;
- cost attribution;
- correction target;
- evidence/authority lineage.

Canonical positions derive over effective vectors under explicit derivation version.

No cached/current balance is independently editable.

---

# 8. Canonical position families

## Requirement scope

Authorized requirement remaining derives from requirement-basis + RequirementAllocation lineage. Exact FT-02/06/10 mechanics remain falsifiable.

## Current contractual obligation exposure

Ordinary commitment effects + minimum-obligation effects + qualification credits + valid release/correction effects.

Qualification credits prevent minimum/call-off double counting.

## Pending/instructed/provisional exposure

Typed separately from approved current obligation. Pending proposals do not become current commitment without an effective domain event. An effective instruction may create separately typed scope/provisional exposure under contract authority.

## Certified gross to date

Sum effective `CERTIFIED_GROSS` effects by component/commitment/derivation context.

Claim and assessment excluded.

## Retention outstanding

Sum effective `RETENTION_HELD`: withholding positive, release/correction negative.

Retention does not reduce gross earned/certified semantics.

## Advance outstanding

Derived from `ADVANCE_OUTSTANDING_EFFECT`; recognized/disbursed basis positive where applicable, recoupment/release/correction negative.

Actual cash/payment authority may stay external.

## Allowance remaining

Authoritative allowance basis minus effective allowance consumption/reduction/release/correction.

## Recovery outstanding

Derived from `RECOVERY_EFFECT` under an explicit sign convention. Replacement procurement authority/cost remains separate.

## Certificate tax component

Product commercial certificate calculation only; not automatically statutory VAT liability/date-of-supply/tax-invoice truth.

## Actual — forbidden as unqualified truth term

Distinguish:

- physical actual fulfillment;
- product commercial certified actual;
- external accounting-posted actual;
- external paid cash.

A UI/report called `Actual` must declare which authority it means. No fallback may silently substitute one for another.

## Forecast

Forecast is versioned planning/projection over explicit inputs (current commitment, pending/instructed exposure, allowances, remeasurement forecasts, remaining need, explicit planner adjustment, etc.). Forecast cannot silently become commitment/certification/accounting actual.

---

# 9. Money / rounding / FX / tax candidate

## Exact decimals

No binary floating point for authoritative commercial money.

Money, rate, quantity/UOM, percentages, FX and tax rates retain appropriate separate precision.

## MonetaryCalculationPolicy

Every load-bearing compound calculation binds a versioned bounded policy defining:

- currency roles/quantum;
- calculation precision;
- rounding mode/boundaries;
- ordered supported stage types;
- FX purpose/basis hooks;
- tax purpose/basis hooks;
- rounding-difference treatment;
- correction/reversal rule.

No tenant-authored formula scripting.

## Currency roles

Commitment/contract, component-rate where valid, budget, reporting and accounting-posting currencies can differ.

Preserve original authoritative currency amount.

## Purpose-specific FX

Evaluation FX, contractual FX, reporting conversion, statutory tax-invoice conversion and external accounting FX can differ. Each load-bearing use binds rate/source/fixing date/version instead of live lookup.

## UAE targeted evidence result

Current UAE VAT law/guidance confirms commercial certification is not a universal statutory tax point. Date-of-supply can depend on completion/transfer, invoice/payment and continuous-supply rules. Later cancellation/changed consideration/returns/errors can require tax adjustments; decreases can require tax credit-note treatment. Foreign-currency tax invoices use the statutory UAE tax FX basis.

Therefore statutory:

- date-of-supply/tax point;
- tax invoice/e-invoice;
- tax credit note;
- tax posting/liability

have explicit authority profiles and normally remain external accounting/tax MIRROR/REFERENCE/OUT concerns unless a specific supported deployment says otherwise.

No new P07 tax ledger is introduced.

Official evidence reviewed:

- UAE Federal Decree-Law No. 8 of 2017 and amendments: https://tax.gov.ae/Datafolder/Files/Legislation/2025/Federal-Decree-Law-No-8-of-2017-and-amendments.pdf
- FTA VAT legislation index: https://tax.gov.ae/en/legislation/vat.aspx
- FTA Real Estate Guide VATGRE1: https://tax.gov.ae/DownloadOpenTextFile?fileUrl=en%2FVAT_VAT_Guides%2FReal_Estate_Guide%2FReal_Estate_Guide_VATGRE1_EN_19_04_2021_EN.pdf
- FIDIC 1999 Red Book official publication: https://fidic.org/books/construction-contract-1st-ed-1999-red-book
- FIDIC 1987 Red Book official publication: https://fidic.org/books/works-civil-engineering-construction-4th-ed-1987-red-book
- FIDIC 2017 Red Book / 2022 reprint official page: https://fidic.org/node/39524

**Candidate ADR-0010 / ADR-0022.**

---

# 10. Regional/GCC semantics candidate

Targeted evidence revealed no missing commercial truth owner/event family.

Candidate decision:

> Core commercial semantics expose first-class deterministic regional/contract policy dimensions where they affect commercial meaning. UAE/GCC-specific tax, retention, advance, security, certification, final-account and related defaults remain evidence-driven bounded profiles over the same core—not late presentation-only localization and not a separate GCC ontology/ledger.

Specific legal rates/requirements/defaults are later legal/product/configuration facts; P1.5 does not claim all UAE contractors use one contract form or one process.

FIDIC evidence supports separation of measurement/evaluation, variations, provisional sums/daywork, advance, interim certification, payment, retention, final account/final certification and correction rather than collapsing them.

---

# 11. Cost attribution candidate

Sourcing P01–P06 may proceed before final detailed accounting/job-cost coding where deployment policy permits.

Before Commitment effectiveness, bind an explicit product commercial cost-attribution identity/profile sufficient for internal commercial control.

This can be final attribution or an authorized `SUSPENSE / UNALLOCATED` bucket.

Suspense is not null; it requires approval, owner, aging/deadline, escalation and hard resolution gate.

It cannot pass the first product certification or accounting/job-cost handoff that requires final mapping and cannot reach closeout unresolved.

Later reclassification preserves history and has zero net commercial value.

**Candidate ADR-0011.**

---

# 12. Correction / finality / temporal candidate

No economically significant correction uses in-place economic mutation.

Correction intents:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical/source reversal;
- reclassification;
- integration-only correction.

## Effect semantics

- true reversal negates referenced original effect vector/slice under original monetary semantics;
- replacement creates new independently bound effect vectors;
- forward adjustment creates signed delta in a new allowed period;
- reclassification is zero-net commercial value and moves explicit attribution;
- non-economic/integration corrections have zero commercial effect vector.

Closed-period/authority rules select allowed correction form/effective period; they do not justify history overwrite.

## Temporal model

Domain/economic events preserve:

- immutable identity;
- recorded/audit time;
- business-effective time/period where material;
- correction/supersession lineage.

Mutable load-bearing master/config uses immutable version + effective applicability + recorded/audit creation + controlled migration.

External facts preserve source ID/version/effective time where available + observed/fetched time + freshness/conflict.

Historical interpretation binds governing versions, not current lookup.

Backdating/migration are governed actions.

The substrate can answer both business-effective history and, where audit requires, what was recorded/known at a prior cutoff.

Universal bitemporal tables are not required.

**Candidate ADR-0015 / ADR-0019.**

---

# 13. Workflow / configuration / authority

Every state-changing operation follows:

`CommandRequest`
`→ current principal/security`
`→ bound policy/config`
`→ approval/control outcome if required`
`→ deterministic invariant validation`
`→ concurrency/idempotency check`
`→ atomic authoritative domain event/effect`
`→ audit/evidence`
`→ projections/integration notification`

Workflow can route tasks, approvals, return/request-info, delegation, bounded conditions, expiry/escalation and supported overrides.

Workflow never directly owns commitment/certified/receipt/allocation/payment truth.

Configuration is typed/versioned/auditable and may cover DOA, roles, mappings, eligibility profiles, numbering, monetary profiles, attribution gates, authority maps and supported commitment capability profiles.

No arbitrary custom scripts, formula language, event types, state machines, mutation rules or generic agent authority logic.

**Candidate ADR-0008 / ADR-0009.**

---

# 14. Concurrency / numbering candidate

High-risk commands require:

- stable idempotency identity;
- expected current state/version or equivalent causal precondition;
- atomic invariant + event effect at required boundary;
- multi-identity conservation when allocation/components span identities;
- one successful effect per logical command;
- deterministic retry.

Internal immutable identity is separate from human/legal display number.

Numbering is versioned bounded policy defining scope, format, sequence, gap policy, allocation milestone, fiscal-date rule and cancellation/reuse behavior.

No universal gapless promise. Verified gap/legal rules are explicit policies.

Retry of same logical issue/effectiveness action returns same number/result.

Historical number not silently reused.

**Candidate ADR-0023.**

---

# 15. Long-lead / status truth candidate

Reject universal independent `TrackedItem` root.

Use thin `ProcurementMilestoneInstance` identities anchored to existing canonical subject lineage such as PlannedRequirement, RequirementAllocation, Package, TenderEvent, AwardDecision, Commitment, EconomicComponentKey, P12 dependency or external shipment reference.

Continuity follows requirement→allocation→sourcing→award→commitment/component lineage.

Keep distinct:

- required;
- planned;
- forecast;
- confirmed;
- actual.

Actual transactional dates/status derive from canonical domain/external authoritative events where possible.

Planning/forecast/confirmed dates are explicit typed facts with source/authority.

Health status is a versioned projection over planning facts + actual events + dependencies.

No manual second `actual_status` writer.

P10 remains procurement planning/expediting, not CPM.

**Candidate ADR-0007 / ADR-0013.**

---

# 16. Direct-source route

Controlled direct-source/direct-purchase is a sourcing route, not a fake tender.

It reuses:

- requirement/allocation authority;
- supplier relation/eligibility;
- supplier contractable source basis;
- justification/route reason;
- DOA/exception approval;
- AwardDecision;
- external handoff or later Commitment.

Conceptual command `MakeDirectSourceAwardDecisionEffective` produces ordinary AwardDecision with route/basis provenance and no economic effect by default.

It does not fabricate competitor bids or ComparisonSnapshot.

Direct source remains optional A4 and cannot become an A0–A3 prerequisite.

---

# 17. Supplier invoice / match seam

If product captures supplier invoice/tax-invoice evidence, source evidence/provenance is distinct from:

- product-owned match/classification/exception facts;
- external AP posting/liability;
- statutory tax-invoice/e-invoice authority;
- payment/cash.

Conceptual `EvaluateInvoiceMatch` may compare invoice evidence to Commitment/EconomicComponent, receipt or certification according to bounded commitment/deployment profile.

Match result may be matched or typed exception.

Exception resolution can invoke evidence revision, receipt correction, commercial correction/change, integration correction, bounded exception acceptance or return/rejection.

Match state never mutates product commercial truth merely to make invoice pass.

Product can own match/exception without becoming AP.

---

# 18. Lifecycle coverage

Complete semantic coverage exists for load-bearing families across:

- P01 requirement basis/allocation/package;
- P02 supplier relationship/qualification/eligibility;
- P03 tender open/release/addenda/deadline/close/cancel/re-tender;
- P04 participation/intent/bid revisions/withdraw/non-response/access grants;
- P05 mapping/adjustment/snapshot/re-evaluation;
- P06 recommendation/approval/AwardDecision/withdraw/handoff;
- direct-source selection path;
- P07 terms/minimum obligation/Commitment formation;
- P07 changes/instruction/provisional authority/agreement;
- P07 goods receipt/return/reinspection;
- supplier invoice/match seam;
- P07 claim/assessment/certification/correction/retention/advance/allowance;
- P08 export/external posting/rejection/reconciliation/payment reference;
- P09 approvals/tasks/outcome/domain command;
- P10 milestone/expediting;
- P11 closeout/final account/security/warranty/recovery/end;
- P12 technical approval dependency/gate;
- cross-cutting correction/reclassification/redaction/authority transfer.

For every state-changing family the specification records:

- source state/context;
- command/action;
- guard family;
- authority/control;
- result event/state;
- economic effect or NONE;
- correction/reversal path;
- concurrency/idempotency expectation;
- evidence/version binding.

Projection/interface concepts do not receive fake mutable lifecycles.

---

# 19. Non-collapsible distinctions

The candidate preserves at minimum:

need ≠ package;
package ≠ tender release;
release ≠ offer;
offer ≠ normalization;
normalization ≠ evaluation adjustment;
evaluated basis ≠ supplier contractable basis;
recommendation ≠ approval ≠ award;
award ≠ commitment;
original commitment ≠ current position;
pending change ≠ effective change;
value variance ≠ scope expansion;
delivery ≠ receipt ≠ acceptance;
receipt ≠ invoice ≠ payment;
claim ≠ assessment ≠ certification;
certification ≠ statutory VAT tax point;
certification ≠ payment/accounting posting;
retention ≠ unearned scope;
advance ≠ earned value;
recoupment ≠ reduction of gross earned value;
commercial approval ≠ technical approval;
planned/forecast/confirmed date ≠ actual event;
task completion ≠ domain transition;
commercial approval ≠ accounting posting;
security expiry ≠ security release;
commercial closeout ≠ cash closeout.

---

# 20. Internal audit history

Initial internal hostile audit returned:

`FAIL — five structural/completeness blockers must close before external hostile review.`

## BL-P15-01

Framework/minimum obligation lacked canonical obligation identity.

Remediated by linked minimum Commitment lineage + qualifying call-off credit + residual floor algebra.

## BL-P15-02

EconomicComponent could be optional/incompatible where conservation required stable recognition grain.

Remediated by mandatory EconomicComponentKey resolution for every value contribution.

## BL-P15-03

Correction taxonomy lacked canonical effect algebra.

Remediated by CommercialEffectVector dimensions and exact reversal/replace/adjust/reclass semantics.

## BL-P15-04

SPINE lifecycle coverage incomplete.

Remediated by complete P01–P12 lifecycle matrix plus direct-source and invoice/match supplements.

## BL-P15-05

Regional/GCC semantics lacked authoritative evidence.

Remediated by targeted current UAE FTA/MOF VAT evidence + authoritative FIDIC contract-structure review; no missing core truth/event family found, with certificate-tax/statutory-tax authority distinction added.

Additional internal sweep also resolved candidate directions for ADR-0007/0013 and clarified `actual`, forecast, direct-source and invoice/match.

Internal recheck after remediation: **PASS / BLOCKERS NONE / EXTERNAL REVIEW READY**.

No ADR statuses have been changed by P1.5 yet.

---

# 21. Candidate ADR decisions under external attack

Current status of all below remains PROPOSED until P1.5 external PASS/final reconciliation.

1. **ADR-0003 structural root** — polycentric graph; RequirementAllocation authority backbone, not universal root.
2. **ADR-0004 PO/Subcontract/type model** — one semantic Commitment core + bounded capability profiles; terms authority separate; explicit minimum obligation lineage.
3. **ADR-0007 long-lead model** — thin milestone overlay over canonical subject lineage, no universal TrackedItem.
4. **ADR-0008 workflow breadth** — bounded shared approval/control primitives, domain-owned transitions.
5. **ADR-0009 configuration breadth** — constrained typed/versioned config; no generic no-code engine.
6. **ADR-0010 GCC/regional semantics** — common core + first-class evidence-driven regional/contract deterministic profiles; not late UI localization or regional fork.
7. **ADR-0011 cost attribution timing** — explicit attribution by Commitment effectiveness, controlled suspense allowed only with mandatory resolution gate.
8. **ADR-0013 status truth** — actual event-derived, planning/forecast/confirmed explicit, health derived.
9. **ADR-0015 correction/finality** — history-preserving effect-vector correction grammar; no in-place economic mutation.
10. **ADR-0019 temporal model** — hybrid recorded/effective event time + versioned effective config/master + external observed/source time.
11. **ADR-0022 money/rounding** — exact decimal + explicit currency + bounded versioned MonetaryCalculationPolicy + purpose-specific FX/tax.
12. **ADR-0023 numbering/concurrency** — internal ID/display number split + bounded numbering policy + idempotent/version/conservation-safe commands.

Intentionally later/non-blocking:

- ADR-0006 connector depth → P1.7;
- ADR-0016 external UX → later UI/external surface;
- ADR-0017 broader AI-readiness → P1.10.

Accepted P1.4 ADRs remain frozen constraints.

---

# 22. Golden-thread candidate results

## GT-1 standard subcontract

Requirement → allocation → optional package → tender → comparison → award → subcontract Commitment → claim → assessment → certification → retention/advance → instruction/change → later certification → final account/release/end.

Result: PASS with no architecture invention.

## GT-2 imported long-lead equipment

PlannedRequirement → allocation → tender/award → PO Commitment → advance/security refs → technical dependency → milestone overlay → delivery/receipt/return → invoice match/accounting seam → recovery/replacement if needed.

Result: PASS with no TrackedItem/ERP/CDE invention.

## GT-3 progress claim/certification

Commitment/component → claim → measurement/evidence → assessment → MonetaryCalculationPolicy → certification effect vectors → retention/advance/recovery/certificate tax component → external AP/tax/payment → later correction.

Result: PASS; statutory VAT kept separately authoritative.

## GT-4 instructed variation

Commitment → instruction authority → scope-basis effect where valid → provisional valuation → progress/certification → supplier agreement/effective change → effect-vector reconciliation/current projections.

Result: PASS.

---

# 23. Ceiling Test candidate PASS

Test whether one core survives:

1. multi-entity/JV contracting authority — PASS;
2. cross-country vendor registration/context — PASS;
3. multi-currency commercial chain — PASS;
4. authority/config change in flight — PASS;
5. different legal-entity fiscal semantics — PASS;
6. contextual vendor status — PASS.

No scenario currently requires second ledger, duplicate truth or regional ontology fork.

Treat this PASS as a claim to attack.

---

# 24. Closed Sub-graph candidate PASS

## A0-A3

Requirement/allocation → optional package → tender/bid → comparison → approval/AwardDecision → external handoff.

No P07, connector, supplier network, AI, CPM, WMS or CDE required.

## Goods slice

Commitment + goods capability + milestones + receipt/return + invoice-match/accounting interface can operate without subcontract-certification system.

## Subcontract slice

Commitment + progress valuation + claim/assessment/certification + retention/advance + accounting interface can operate without WMS/CPM/full CDE/full ERP.

## Direct-source A4

Additive route reusing allocation/supplier/award/Commitment semantics; no fake tender.

## Future capabilities

New typed milestone/service/deliverable capabilities/events can be additive with versioned projection evolution and without changing old event meaning.

Treat this PASS as a claim to attack.

---

# 25. One-XL / object-explosion claim

- P07 owns commercial obligation/change/valuation/certification/recovery effects.
- RequirementAllocation owns scope consumption only.
- P08 owns integration/reconciliation metadata only.
- P09 owns bounded control only.
- P10 owns thin milestone/planning overlay only.
- P11 owns bounded closeout/security/warranty dependencies plus P07 effects where commercial.
- P12 owns technical dependency/gate only.
- CommercialEffectVector is P07 effect algebra, not GL.
- EconomicComponentKey is conservation identity, not construction ontology.
- workflow/configuration is bounded, not BPM/no-code.
- accounting/tax mirror remains external where authoritative.
- AI/agent memory owns no commercial truth.

Durable identity is promoted only where independent lifecycle, external reference, concurrency/authority boundary, immutable revision lineage, many-to-many reference or reconstruction requires it.

Internal claim: **SECOND XL CLEAN / OBJECT EXPLOSION CONTROLLED.**

---

# 26. Evidence debt still intentionally open

Do not fail P1.5 merely because these exact practitioner/legal mechanics remain falsifiable if the architecture safely supports them:

- FT-02 exact RequirementAllocation mechanics;
- FT-06 exact remeasurement conservation practice;
- FT-09/CR-02 replacement/rectification capacity mechanics;
- FT-10 universal exclusive-scope authority practice;
- exact UAE/GCC tax/retention/security/certification defaults and rates beyond sources reviewed;
- mandatory legal/gapless numbering rules;
- exact connector implementation;
- exact UI/report formulas and layouts.

Fail only if the missing detail means P1.5 has not actually decided a required truth/authority/effect/lifecycle invariant.

---

# 27. Required hostile scenarios

At minimum test:

1. one AED 1m framework minimum + multiple qualifying/non-qualifying call-offs: any double counting or missing obligation owner?
2. stored material certified then installed: can same material value be counted twice through different component keys?
3. progress claim 100, assessment 90, certificate 85, ERP posts 85, payment 60: are all authorities distinct?
4. partial certificate error corrected after period close: does effect algebra yield one reproducible current position without mutating original?
5. original certificate in USD with reporting/tax/accounting FX differing: can each purpose reconstruct its own basis?
6. tax point triggered by invoice/payment independently of commercial certificate: does candidate avoid false VAT authority?
7. allocation leaf split concurrently while two commitments form: can conservation be preserved without Allocation becoming ledger/root?
8. commitment change becomes effective while certification approval is pending: stale approval/valuation handling?
9. user approval recorded then permission/delegation revoked before command: can historical policy bypass live security?
10. retry after timeout during commitment/certificate/number issue: any duplicate event/number/effect?
11. direct-source route: can it reach AwardDecision/Commitment without fake tender/bid comparison and without weakening DOA?
12. supplier invoice disagrees with receipt/certificate: can match exception resolve without AP or commercial co-master?
13. a P07 subcontract uses stored material + SOV progress + milestone payment: does closed capability/component model remain coherent?
14. remeasurement quantity increases within authorized scope: can valuation change without fake VO and without unconserved scope?
15. instructed but unagreed work is certified provisionally, then later agreed at different value: can reconciliation preserve history?
16. framework minimum has no physical scope: can it coexist with RequirementAllocation without fake quantity?
17. cost attribution is suspense at commitment then remains unresolved at certification: is progression blocked correctly?
18. same supplier participates in two countries/legal registrations: can exact tax/counterparty context bind without duplicating supplier truth?
19. legal entity fiscal/numbering policy changes mid-year: can historical transactions remain interpretable?
20. backdated change is recorded today: can business-effective history and known-at history both be reconstructed?
21. long-lead milestone forecast says late but actual award/receipt events differ: any manual actual-status drift?
22. external accounting value is stale: can a report accidentally label product certified value as accounting actual?
23. final account changes commitment/certified/recovery position: does it use existing effects instead of opaque final-account balance?
24. a future milestone/service capability is added: can old event meaning/projections stay reproducible?
25. an AI agent proposes certification/change: can it ever write effect vectors directly or bypass bounded command/approval path?

Add your own attacks.

---

# 28. Required response format

## VERDICT

Choose exactly one:

`PASS — P1.5 Commercial Core can close; proceed to final ADR reconciliation/checkpoint and unlock P1.6.`

or

`FAIL — P1.5 remains open; blockers below must be remediated.`

## BLOCKERS

For every blocker provide:

- blocker ID;
- clause/section involved;
- failure mode;
- concrete counterexample;
- why it forces later architecture/build to choose or redesign commercial meaning/ownership/effect/lifecycle;
- narrowest remediation.

Do not turn implementation preferences into blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic watch;
- evidence/legal watch;
- physical-design/later-phase debt.

## GATE CHECK

PASS/FAIL with concise reasoning for:

- G1 Structural root / decomposability
- G2 Commitment / minimum / EconomicComponentKey / effect conservation
- G3 Canonical balances / money / FX / tax / correction / temporal
- G4 Lifecycle completeness / transition fields
- G5 Authority / workflow / configuration / concurrency / numbering
- G6 Accounting / invoice / tax / regional authority seam
- G7 Long-lead / status / direct-source completeness
- G8 GT-1–GT-4 / Ceiling / Closed Sub-graph / A0-A3
- G9 One-XL / object explosion / AI-safe bounded-action future

## REGRESSION CHECK

State exactly:

- `P1.1 REOPEN = YES/NO`
- `P1.2 REGRESSION = YES/NO`
- `P1.3 REOPEN = YES/NO`
- `P1.4 REOPEN = YES/NO`
- `SECOND XL = CLEAN/FAIL`
- `A0–A3 ACTIVATION = CLEAN/FAIL`

## ADR IMPACT

For each candidate ADR below, choose:

- `ACCEPT SEMANTIC DECISION`
- `KEEP PROPOSED — BLOCKING`
- `KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING`

and explain briefly:

- ADR-0003
- ADR-0004
- ADR-0007
- ADR-0008
- ADR-0009
- ADR-0010
- ADR-0011
- ADR-0013
- ADR-0015
- ADR-0019
- ADR-0022
- ADR-0023

Also confirm whether ADR-0006, ADR-0016 and ADR-0017 can remain later-owned without blocking P1.5.

Do not infer any unseen ADR wording.

## P1.6 READINESS

Choose exactly:

`READY AFTER P1.5 FINAL CHECKPOINT`

or

`NOT READY`

If not ready, state only the boundary/core reason.

---

# 29. Final audit question

Is any load-bearing commercial-core decision still ambiguous enough that P1.6 or later physical design would have to choose **what the business truth means, who owns it, what economic effect occurred, how it is derived/corrected, or what lifecycle/authority changes it**, rather than merely choose representation/implementation?

A clean PASS is appropriate only if the answer is **NO**.
