# P1.5 — Commitment Economic Kernel v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE INTEGRATED CANDIDATE / NOT FROZEN  
**Parents:**
- `P1_5_COMMERCIAL_EVENT_BALANCE_FRAME_V0_1.md`
- `P1_5_LOAD_BEARING_CATALOGUE_V0_1.md`
- `P1_5_STRUCTURAL_ROOT_COMMITMENT_ALTERNATIVES_V0_1.md`

**Primary ADR pressure:** ADR-0003, ADR-0004, ADR-0011, ADR-0015, ADR-0019, ADR-0022, ADR-0023  
**Product code:** LOCKED

---

## 1. Purpose

Vertically test the leading P1.5 structural candidates through the actual commercial semantics of:

- commitment formation;
- original baseline;
- controlled change/instruction;
- goods/progress/milestone/service fulfilment;
- claim → assessment → certification;
- retention/advance/allowance/recovery;
- derived positions;
- correction/finalization;
- money/FX/tax hooks;
- lifecycle/authority/concurrency hooks.

This kernel is intended to reveal whether the leading structure survives economic truth before ADR-0003/0004 are promoted.

It does not choose database schema, class inheritance, event-store technology or API shapes.

---

# 2. Leading structural assumptions under test

## S1 — polycentric procurement graph

No universal procurement container.

`{DemandLine | PlannedRequirement}`
`→ RequirementAllocation lineage`
`→ [optional ProcurementPackage]`
`→ sourcing transaction`
`→ AwardDecision`
`→ [external handoff OR effective Commitment]`

Each stage owns its own truth and lifecycle.

## S2 — semantic Commitment identity

A `Commitment` exists when an effective supplier obligation exists.

PO/Subcontract/CallOff/Service kinds share one commercial kernel but retain kind/capability-specific behaviour.

## S3 — terms authority separate from ordinary commitment

Reusable rates/terms/call-off rules can exist as `CommercialTermsAuthority` without creating ordinary committed cost.

Where terms authority itself creates a guaranteed economic minimum/exposure, that obligation must be explicit rather than hidden inside “terms”.

## S4 — economic component identity

Every authoritative value contribution resolves to the minimum contractual economic component needed to prevent duplicate recognition.

This identity may reuse line/SOV/milestone/deliverable identity when sufficient; a new universal object is not assumed.

---

# 3. Kernel invariants

### K01 — award is not commitment

`AwardDecision` may authorize preparation/handoff but creates no supplier obligation by default.

### K02 — formation creates original baseline

Only a governed commitment-effectiveness transition creates the original effective obligation baseline.

### K03 — original baseline is historically immutable

Later changes/corrections do not edit the meaning of the original effective baseline.

### K04 — current commitment is derived

Current approved commitment is reconstructed from original baseline plus effective change/correction history.

### K05 — scope authority and value authority are distinct

RequirementAllocation controls authorized procurement scope consumption, not market value/budget spend.

### K06 — terms authority and obligation are distinct

Rates/formulas/terms alone do not create ordinary committed cost.

### K07 — one economic value once

The same underlying economic value cannot contribute twice to the same authoritative commercial position unless a governed reversal/correction removes/reclassifies the prior contribution first.

### K08 — fulfilment evidence is not automatically certified value

Delivery, receipt, progress, milestone or service evidence does not create certified value without the governing valuation/certification transition.

### K09 — claim ≠ assessment ≠ certification

Each is a distinct authority layer.

### K10 — certification ≠ accounting posting/payment

Product commercial certification and external accounting/cash truth are separate.

### K11 — workflow outcome is not commercial truth

Approval/workflow result authorizes or informs a bounded domain command; the domain event owns economic effect.

### K12 — corrections preserve history

No economically significant correction relies on invisible overwrite.

### K13 — derived positions are not independently editable

Commitment, certification, retention, advance, allowance, recovery and reconciliation positions derive from authoritative events/facts.

### K14 — governing versions are reproducible

Load-bearing terms, authority, policy, valuation, FX/tax/rounding and source evidence versions used by a historical effect remain reconstructable.

### K15 — single-effect concurrency

Retry/race/concurrent approval cannot create the same economic event/effect twice.

---

# 4. Minimal semantic identities

This is an identity contract, not a table list.

## 4.1 Commitment

Represents one effective supplier obligation lineage.

Minimum semantic identity must bind:

- tenant;
- project;
- ContractingAuthorityContext;
- counterparty relationship / legal-tax registration where load-bearing;
- commitment kind;
- formation/effectiveness lineage;
- original baseline identity;
- requirement-allocation binding(s) where scope-backed;
- terms-authority version where applicable;
- monetary/valuation context;
- economic component set/refs;
- change/correction lineage;
- terminal/closure semantics.

## 4.2 CommitmentKind

Explicit business/legal kind influencing allowed formation/capability/numbering/evidence rules.

Candidate V1 families:

- `PURCHASE_ORDER`;
- `SUBCONTRACT`;
- `CALL_OFF_OR_RELEASE`;
- `SERVICE_OR_OTHER_COMMITMENT` where evidenced.

`FRAMEWORK_OR_TERMS_AUTHORITY` is not automatically a Commitment kind because reusable terms may not create an obligation.

Exact closed V1 set remains subject to ADR-0004 evidence review.

## 4.3 CommercialTermsAuthority

Durable only where reusable terms/rates/formulas/call-off rules have independent business identity.

Must preserve:

- counterparty/relationship scope;
- validity/effective interval;
- rates/formulas/terms versions;
- permitted call-off conditions;
- valuation/retention/advance/tax terms where applicable;
- guaranteed-minimum rule where applicable;
- evidence/provenance.

It does not consume ordinary commitment scope/value merely by existing.

## 4.4 EconomicComponent

Semantic conservation identity for value recognition.

Minimum semantics:

- commitment scope;
- stable contractual component identity;
- source contractual structure reference;
- valuation basis;
- permitted fulfilment/recognition mechanisms;
- parent/child relation only where needed;
- cumulative contribution/reversal lineage.

May map to an existing line/SOV/milestone/deliverable/service unit rather than new object.

## 4.5 Commercial event identity

Every economically effective event needs immutable identity independent of current projections/display numbers.

The event identity must support:

- event family/type;
- commitment/component scope;
- effective business time;
- recorded/audit time semantics later chosen under ADR-0019;
- authority/principal;
- command/idempotency identity;
- governing version refs;
- evidence refs;
- correction/supersession linkage.

---

# 5. Commitment formation contract

## 5.1 Pre-effective preparation

Draft/preparation data may exist before obligation effectiveness.

It must not be counted in current approved commitment merely because:

- award exists;
- document number is allocated;
- draft is approved internally;
- supplier has been selected;
- document was generated.

## 5.2 Formation command

Conceptual bounded action:

`MakeCommitmentEffective`

Minimum guard families:

- valid tenant/project/ContractingAuthorityContext;
- valid counterparty relationship/registration;
- sufficient requirement-allocation authority where scope-backed;
- approved/valid contractable basis or separately authorized formation basis;
- required internal authority/DOA/compliance;
- required external technical gate where configured;
- valid terms/currency/valuation basis;
- no conflicting effective commitment consuming exclusive scope;
- concurrency/idempotency guard;
- formation evidence present where required.

## 5.3 Formation event

Conceptual effect:

`CommitmentBecameEffective`

Creates:

- immutable original baseline;
- effective obligation exposure;
- binding to authorized scope lineage;
- governing monetary/valuation/terms context;
- commitment lifecycle start.

Does **not** create accounting AP liability/payment by itself.

## 5.4 Original baseline

Baseline is the obligation meaning at formation.

It contains/references enough load-bearing basis to reconstruct:

- scope/components;
- price/rates/formulas;
- currency;
- quantity/UOM where relevant;
- valuation basis;
- retention/advance terms where applicable;
- tax terms where relevant;
- schedule/time terms where commercially load-bearing;
- terms-authority version where applicable.

Exact physical snapshot versus version-ref mix remains ADR-0019/P1.5a work.

---

# 6. Commitment kinds and capability profiles

One Commitment does not imply one fulfilment lifecycle.

## 6.1 Goods/quantity capability

Candidate characteristics:

- line quantity/UOM;
- delivery/receipt/accept/reject/return facts;
- quantity-based fulfilment;
- invoice-match seam;
- optional advance/payment terms;
- component recognition may be line-based.

## 6.2 Progress-valuation capability

Candidate characteristics:

- SOV/scope-component structure;
- progress/measurement evidence;
- supplier periodic claim;
- buyer assessment;
- certification;
- retention/advance recoupment;
- variations/instructions;
- final account/closeout.

## 6.3 Remeasurement capability

Candidate characteristics:

- rates + measured quantities;
- estimated quantity may not be authorization ceiling;
- authorized scope partition/cap remains explicit;
- measurement changes valuation without fake variation where contract permits.

FT-06 remains falsifiable evidence debt.

## 6.4 Milestone capability

Candidate characteristics:

- named milestone/deliverable;
- achievement/acceptance evidence;
- contractually defined amount/percentage/formula;
- no value before applicable achievement/approval conditions.

## 6.5 Rate-based service capability

Candidate characteristics:

- rate × governed service unit/time/quantity;
- service evidence/approval;
- component identity over service period/unit where needed.

## 6.6 Deliverable-acceptance capability

Candidate characteristics:

- deliverable identity;
- acceptance/rejection evidence;
- valuation contribution if contract ties acceptance to value.

## 6.7 Capability-composition constraint

A commitment may combine mechanisms only when each economic component clearly identifies:

- which mechanism(s) may contribute value;
- whether mechanisms are alternate evidence for same value, staged transitions of same value or separate earnable components;
- cumulative cap/basis;
- correction/reversal rules.

No free-form tenant capability engine is implied.

---

# 7. Scope and RequirementAllocation binding

## 7.1 Binding rule

A scope-backed Commitment binds existing RequirementAllocation lineage rather than creating a duplicate allocation balance.

## 7.2 Multi-leaf commitment

A single Commitment may bind multiple allocation leaves where the contract legitimately covers multiple authorized slices.

Value/scope association must remain reconstructable by component/slice where later changes/fulfilment require it.

## 7.3 Multi-commitment award/split

One AwardDecision may produce multiple commitments only where approved contractable scope is explicitly partitioned and allocation lineage prevents duplicate consumption.

## 7.4 Basis decrease

A reduction in authorized requirement basis after downstream binding cannot silently invalidate history.

The affected lineage must enter a controlled reconciliation state before conflicting new consumption/binding occurs.

Exact mechanics remain FT-02/06/10 work.

## 7.5 Non-quantified scope

A commitment may bind explicit scope partitions/deliverables rather than fabricated quantity.

The product does not require universal BOQ quantity.

---

# 8. Change kernel

## 8.1 Change categories

A proposed change should identify which semantic axis changes:

- authorized scope;
- committed scope;
- quantity;
- rate/price;
- valuation basis;
- term;
- time/date where commercially significant;
- cost attribution;
- other bounded contractual fact.

One change may affect multiple axes, but effects remain explicit.

## 8.2 Pending change

Pending/proposed change may contribute forecast/risk exposure but does not alter current approved commitment unless an independent effective authority exists.

## 8.3 Effective approved change

Conceptual command:

`MakeCommitmentChangeEffective`

Guards include:

- change basis/evidence;
- valid commercial authority/approval;
- requirement authority where scope expands;
- contractual/legal permissibility;
- valuation/money basis;
- current commitment/version conflict check;
- idempotency.

Conceptual event:

`CommitmentChanged`

Effect:

- adds/reduces/reclassifies effective obligation according to typed change;
- original baseline remains intact;
- current position changes via projection.

## 8.4 Authorized instruction before final agreement

Conceptual event/fact:

`WorkInstructionBecameEffective`

It may:

- authorize additional work/scope if issuer has that authority;
- expand requirement basis when the instruction itself is the legitimate source authority;
- establish provisional valuation authority where contract permits.

It does not assert final agreed supplier price.

## 8.5 Later agreement

A later negotiated/agreed change links to prior instruction/provisional valuation lineage.

Prior certification/valuation is reconciled non-destructively.

---

# 9. Fulfilment and recognition kernel

## 9.1 Fulfilment fact

A fulfilment fact answers:

> what was delivered/performed/achieved/accepted?

It does not answer automatically:

> what amount is commercially certified or paid?

## 9.2 Goods receipt

Conceptual command:

`RecordGoodsReceipt`

Possible outcomes:

- accepted;
- rejected;
- partially accepted;
- returned/reversed where real physical/business reversal occurs.

Guards include:

- commitment/component validity;
- quantity/UOM tolerance/basis;
- duplicate receipt/idempotency;
- acceptance authority;
- technical gate where applicable.

Receipt may make value eligible for invoice match/recognition according to terms but is not AP posting.

## 9.3 Progress/measurement

Measurement/progress evidence can update measured/assessable basis but does not itself certify value.

For remeasurement:

- measured quantity may change valuation within valid authorized scope partition/cap;
- no fake variation solely because estimate quantity changes;
- no unconserved scope authority.

## 9.4 Milestone/deliverable/service

Achievement/acceptance evidence links to exact economic component and governing valuation basis.

Evidence may trigger assessable/certifiable value only through the domain's valuation/certification rules.

---

# 10. One-economic-value-once enforcement

For a value-contributing event, require semantic answers:

1. `commitment_ref`
2. `economic_component_ref`
3. `valuation_basis_ref/version`
4. `contribution_basis`
5. `prior recognized/certified contribution for same component/basis`
6. `incremental contribution`
7. `cap or formula where applicable`
8. `correction/reversal lineage`

## Stored-material hostile case

Contract permits certification of stored material before installation.

Component structure must distinguish:

- stored-material value already recognized;
- installation/remaining work value not yet recognized.

Later installation may:

- transition previously recognized material from stored to installed evidence state with **zero duplicate material value**;
- recognize only incremental installation/remaining component value permitted by contract.

A model that simply certificates `receipt value + installed total value` fails K07.

## Claim/certification hostile case

Supplier claims 100.

Buyer assesses 90.

Certificate makes 85 effective after rules/components.

Commercial certified-to-date increases by 85 only.

Claim 100 and assessment 90 remain separate authority/history, not additive ledger entries.

---

# 11. Claim → assessment → certification kernel

## 11.1 Claim

Conceptual command/event:

`SubmitCommercialClaim`

Supplier-originated claim revision with immutable source provenance.

Economic authority:

- requested/claimed position only;
- no certified/posted effect.

## 11.2 Assessment

Conceptual command/event:

`RecordValuationAssessment`

Buyer-side evaluation over:

- claim;
- contractual basis;
- fulfilment/measurement evidence;
- prior certified/recognized values;
- changes/instructions;
- retention/advance/recovery rules.

Economic authority:

- assessed position;
- not necessarily final certificate.

## 11.3 Certification

Conceptual command:

`MakeCertificationEffective`

Minimum guards:

- valid commitment/component;
- effective contractual/valuation basis;
- assessable evidence;
- prior contribution/cap check;
- approval/authority;
- current security capability;
- tax/currency/rounding rule;
- period/cut-off rule;
- concurrency/idempotency;
- correction conflict check.

Conceptual event:

`CommercialAmountCertified`

Economic effect:

- authoritative product certification contribution by component;
- retention/advance/recovery/tax/net components according to bound calculation grammar;
- does not create external payment/cash truth.

---

# 12. Retention kernel

## 12.1 Terms

Retention terms are governing load-bearing terms, not balances.

May include:

- rate/percentage;
- caps;
- component applicability;
- release conditions/stages;
- exclusions;
- effective version.

## 12.2 Withholding effect

Retention withholding is derived/recorded as part of certification calculation/economic effect.

It does not reduce gross earned/certified work semantics; it changes the held/payable commercial component.

## 12.3 Release

Conceptual command/event:

`ReleaseRetention`

Guards:

- contractual release condition;
- closeout/security/warranty/technical dependencies where configured;
- authority;
- outstanding position;
- accounting interface status only where legitimately required by domain policy;
- idempotency.

Effect:

- decreases retention outstanding;
- does not edit old certificates.

---

# 13. Advance kernel

## 13.1 Advance basis

Advance terms may establish:

- entitlement/maximum;
- preconditions/security reference;
- recoupment rule;
- currency;
- effective terms version.

## 13.2 Cash/payment fact

If actual advance payment is externally authoritative, product stores MIRROR/REFERENCE fact/status rather than inventing cash truth.

## 13.3 Commercial advance position

Product may still need commercial outstanding/recoupment position derived from:

- applicable advance basis;
- recognized/disbursed external fact where required;
- certification recoupment effects;
- release/correction effects.

## 13.4 Recoupment

Advance recoupment is not reduction of gross earned work.

It is a separate certificate/commercial component reducing outstanding advance/payable/net position according to terms.

---

# 14. Provisional sum / allowance kernel

An allowance/provisional sum can define controlled commercial capacity/exposure without pretending final detailed scope/value is committed identically to ordinary fixed-price components.

Need distinguish:

- original/current allowance basis;
- instructed/approved consumption;
- certified consumption where applicable;
- remaining allowance;
- release/reduction;
- effect on current commitment under contract rule.

Exact interaction with commitment baseline/change algebra remains to be tested per contract pattern.

---

# 15. Guaranteed minimum / framework kernel

## 15.1 Ordinary reusable terms

No obligation merely from reusable rates/terms.

## 15.2 Scope-backed minimum

Where contract effectiveness reserves identifiable authorized scope:

- reserve same RequirementAllocation lineage;
- call-offs draw down reservation;
- do not consume same scope twice;
- residual reservation release/expiry is governed.

## 15.3 Monetary minimum/take-or-pay

Where contract effectiveness itself creates enforceable monetary exposure without fixed physical scope:

- create explicit obligation/exposure lineage at framework/terms-authority level or a linked minimum-obligation component;
- do not fabricate requirement quantity;
- qualifying call-off values reduce outstanding minimum under contract rule;
- residual settlement is commercial exposure/accounting seam, not procurement fulfilment.

**Open design:** whether minimum obligation is represented as a Commitment, obligation component attached to CommercialTermsAuthority, or another bounded P07 identity must be resolved before ADR-0004 freeze.

---

# 16. Recovery / contra kernel

Recovery is its own commercial authority/effect lineage.

Examples:

- backcharge;
- contra charge;
- damage/deduction where in scope;
- recovery for defective/defaulted work.

Rules:

- recovery basis/evidence/authority explicit;
- recovery does not erase original supplier obligation/history;
- replacement procurement authority/cost is separate under CR-02;
- recovery may affect certificate/net payable only under governed calculation rule;
- accounting cash recovery remains external where configured.

---

# 17. Derived position kernel

## 17.1 Current approved commitment

Conceptually:

`original effective obligation`
`+ effective obligation increases`
`- effective obligation reductions/releases`
`+/- economic corrections/reclassifications according to type`

No independent edit.

## 17.2 Claimed-to-date

Derived from effective claim revisions/claim-period semantics without adding to certification.

## 17.3 Assessed-to-date

Derived from effective buyer assessments/corrections.

## 17.4 Certified-to-date

Derived from effective certification contributions minus reversals/corrections according to bound derivation version.

## 17.5 Retention outstanding

Derived from applicable withholding contributions minus releases/corrections.

## 17.6 Advance outstanding

Derived from recognized advance basis/disbursement fact where applicable minus recoupment/release/correction.

## 17.7 Allowance remaining

Derived from effective allowance basis minus governed consumption/reduction/release.

## 17.8 Recovery outstanding

Derived from effective recovery basis minus recovered/released/corrected effect.

## 17.9 Accounting posted/paid

External-authority position where configured; never substituted for certified/commitment truth.

---

# 18. Correction/finalization kernel

ADR-0015 remains open, but the kernel requires a distinction between **business finality** and **history mutability**.

A record may become final/effective for ordinary editing while still permitting a governed correction path.

## 18.1 Non-economic amendment

Correct descriptive/provenance metadata only when economic meaning/authority remains unchanged.

Must preserve amendment audit.

## 18.2 Reverse-and-replace

Use where prior effect must be neutralized and corrected effect can be restated.

Original event remains visible/interpretable.

## 18.3 Forward adjustment

Use where closed period or business rule requires correction in later effective period.

Prior certified history remains unchanged; current position is corrected by later event.

## 18.4 Physical/source reversal

Use only when underlying fulfilment/source event genuinely reverses.

Cannot be used to “undo” irreversible certified defective work solely to free scope.

## 18.5 Reclassification

Changes attribution/classification without pretending economic effect did not occur.

Old/new context and reason remain reconstructable.

## 18.6 Integration correction

Mapping/transport/reconciliation repair only; no economic event unless separate domain correction is legitimately required.

---

# 19. Closed-period correction microthread

Scenario:

1. subcontract certificate C1 becomes effective in Period P1;
2. P1 is later closed externally/contractually;
3. a material commercial error in C1 is discovered;
4. product cannot edit C1 economics invisibly;
5. correction classification determines whether:
   - prior source fact was wrong;
   - calculation was wrong;
   - attribution was wrong;
   - external posting only was wrong;
6. governed correction event is authorized;
7. if P1 cannot accept economic restatement under chosen finalization semantics, a forward adjustment becomes effective in P2;
8. current certified position reflects C1 + correction;
9. original C1 remains reconstructable under its original rules/evidence;
10. external accounting reconciliation distinguishes product correction from ERP posting/period acceptance.

**Kernel result:** structurally expressible without history rewrite.

Exact choice among restatement/reversal/forward adjustment by condition remains ADR-0015/period-policy work.

---

# 20. Money/FX/tax hooks

No final monetary formula freezes until ADR-0022/0010.

Every economically effective value must nevertheless be able to bind:

- currency;
- decimal amount/scale semantics;
- unit rate/quantity where applicable;
- FX rate/source/fixing basis/version when conversion is load-bearing;
- tax basis/rate/version when applicable;
- rounding policy/version;
- calculation-order policy/version;
- effective legal/entity/fiscal context.

## 20.1 Currency roles must be distinct

Potential roles:

- commitment/contract currency;
- component/rate currency if allowed;
- budget/base currency;
- reporting currency;
- accounting-posting currency.

Do not assume one universal currency.

## 20.2 Historical evaluation FX vs contractual FX

Comparison-time FX used for bid evaluation is not automatically the same authority as later contract/certificate/accounting conversion.

Each governed purpose binds its own applicable basis.

---

# 21. Temporal hooks

P1.4 froze semantic version/effective binding; ADR-0019 decides physical temporal model.

Kernel requires at least semantic distinction among:

- effective business date/time;
- recorded/audit date/time;
- policy/configuration effective interval;
- document/evidence revision time;
- accounting period/fiscal context;
- authority-transfer cutover;
- correction effective period.

Backdating cannot be a free-form timestamp edit; it is a governed domain operation subject to period/authority/evidence rules.

---

# 22. Authority / approval hooks

For each effective economic command identify:

- requesting principal;
- represented party where applicable;
- internal permission/role;
- DOA/approval policy version;
- required approval outcome(s);
- compliance/technical gates;
- current live-security capability;
- deterministic domain invariant evaluation;
- command owner/service;
- resulting event authority.

Approval itself does not write the event effect.

---

# 23. Concurrency / idempotency hooks

High-risk single-effect commands include:

- MakeCommitmentEffective;
- MakeCommitmentChangeEffective;
- RecordGoodsReceipt/Return where cumulative quantity matters;
- MakeCertificationEffective;
- ReleaseRetention;
- apply advance recoupment/correction;
- approve effective recovery;
- close/cancel commitment;
- authority/config migration affecting in-flight cases;
- number allocation where legally/human significant.

P1.5d/ADR-0023 must define a command/version/idempotency pattern preventing:

- double click/retry duplicate event;
- two approvers creating duplicate effect;
- stale state transition after concurrent change;
- number reservation collision;
- double receipt/certification contribution.

---

# 24. GT-1 — standard subcontract microthread

`Demand/PlannedRequirement`
→ allocation
→ optional package
→ tender/bid/comparison
→ AwardDecision
→ prepare subcontract
→ approval/evidence
→ `CommitmentBecameEffective`
→ original baseline
→ supplier claim
→ assessment
→ certification
→ retention/advance components
→ variation/instruction
→ approved change
→ later certificate
→ final account/release/close

Checks:

- package optional upstream: PASS
- award ≠ commitment: PASS
- baseline/change separation: PASS
- claim/assessment/certification separation: PASS
- retention/advance distinct: PASS candidate
- external accounting seam: PASS
- correction path: expressible, ADR-0015 open

**GT-1 kernel result: PASS / no structural invention.**

---

# 25. GT-2 — imported long-lead equipment microthread

`PlannedRequirement`
→ allocation
→ tender/award
→ PO-kind Commitment
→ advance terms/security reference
→ submittal/technical gate reference
→ manufacturing/shipment milestones
→ delivery
→ GoodsReceipt accepted
→ commercial eligibility/match under terms
→ external accounting posting/payment reference
→ return/replacement/recovery if defective

Checks:

- early procurement without DemandLine: PASS
- goods capability without SOV: PASS
- external technical gate without CDE ownership: PASS
- payment external: PASS
- CR-02 separates replacement authority from recovery: PASS semantically
- exact receipt/accounting recognition: open deployment/contract semantics

**GT-2 kernel result: PASS / no structural invention.**

---

# 26. GT-3 — progress certification microthread

Effective subcontract commitment
→ supplier claim revision
→ measurement/progress evidence
→ buyer assessment
→ certification calculation
→ retention withholding
→ advance recoupment
→ recovery/contra where governed
→ tax/net calculation
→ `CommercialAmountCertified`
→ external AP posting reference/acceptance
→ payment reference later

Checks:

- one economic component contribution: PASS candidate
- claim/assessment/certification distinct: PASS
- gross earned vs retention/advance distinct: PASS
- certification vs AP/payment distinct: PASS
- rounding/tax formula: BLOCKED from freeze by ADR-0022/0010
- finalization/correction: BLOCKED from freeze by ADR-0015

**GT-3 kernel result: STRUCTURALLY PASS / monetary-correction details open.**

---

# 27. GT-4 — instructed variation microthread

Existing commitment
→ governed instruction proposed
→ issuer authority checked
→ instruction becomes effective
→ if genuinely new scope, requirement basis expands through legitimate instruction authority
→ provisional valuation authority applied if contract permits
→ work/progress evidence
→ interim assessment/certification against provisional basis
→ supplier commercial agreement reached later
→ approved change becomes effective
→ prior provisional values reconciled non-destructively
→ current commitment/certified projections recalculate under explicit derivation rules

Checks:

- instruction ≠ final agreement: PASS
- new scope authority distinct from price: PASS
- provisional certification explainable: PASS candidate
- later agreement does not rewrite prior history: PASS
- exact contract patterns/evidence: remains subject ADR-0010/domain evidence

**GT-4 kernel result: PASS candidate.**

---

# 28. Ceiling Test kernel preview

## Multi-entity/JV

Commitment binds exact ContractingAuthorityContext and entity/fiscal/money policy.

No ledger fork required.

## Cross-country vendor

Commitment binds exact counterparty relationship/registration and tax context without global supplier commercial truth.

No ontology fork.

## Multi-currency

Currency roles are explicit hooks; one event grammar works across currencies.

ADR-0022 must make calculation deterministic.

## Authority change in flight

Bound policy/config plus live-security check survives commitment/change/certification commands.

No history rewrite.

## Different fiscal semantics

Period/fiscal policy is bound per legal/entity context; correction can be forward where required.

No second ledger.

## Contextual vendor status

Supplier identity and eligibility context remain separate.

No supplier duplication required for status alone.

**Ceiling preview: CLEAN, pending monetary/temporal details.**

---

# 29. Closed Sub-graph kernel preview

## A0–A3

No P07 requirement: PASS.

## Goods commitment slice

Can bottom out at external accounting handoff without subcontract certification subsystem: candidate PASS.

## Subcontract certification slice

Can bottom out at external AP/payment interface without WMS/CDE/CPM/full ERP: candidate PASS.

## Capability additivity

A future milestone/service capability can attach to Commitment/EconomicComponent grammar without changing meaning of prior goods/progress events if event types and derivations are versioned.

Candidate PASS.

---

# 30. Structural candidate result

The kernel **does not falsify** the leading structural candidates.

### ADR-0003 direction survives

Polycentric procurement graph with RequirementAllocation as authority backbone, not universal root.

### ADR-0004 direction survives

One semantic effective-obligation `Commitment` core + bounded composed capability profiles; reusable terms authority separate from ordinary obligation.

### EconomicComponent direction survives

A common semantic economic conservation identity is necessary where multiple mechanisms contribute to one contract value, but it need not always become a new standalone physical object.

These remain `ACCEPTED_P15_CANDIDATE / NOT FROZEN` pending money/correction/lifecycle/authority details and hostile review.

---

# 31. Open blockers to next freeze

## B-P15-01 — monetary kernel

ADR-0022 must define representation, rounding and calculation order.

## B-P15-02 — GCC semantic evidence

ADR-0010 must separate universal commercial kernel from regional policy/contract evidence, especially retention/tax/certification/security semantics.

## B-P15-03 — correction/finalization

ADR-0015 must define allowed correction/finalization modes and closed-period behaviour.

## B-P15-04 — temporal physical semantics

ADR-0019 must choose enough temporal representation to make historical interpretation implementable.

## B-P15-05 — cost attribution timing

ADR-0011 must decide hard attribution transition and reclassification behaviour.

## B-P15-06 — numbering/concurrency

ADR-0023 must protect single-effect commands and display numbering semantics.

## B-P15-07 — guaranteed minimum representation

Need decide how a framework/terms authority that itself creates monetary obligation relates to Commitment without collapsing terms authority and ordinary call-offs.

## B-P15-08 — economic component minimum grain

Need specify candidate minimum semantics/cardinality strongly enough for goods/progress hybrid cases without creating generic scope ontology.

---

# 32. Immediate next step

Create a joint:

`P1_5_MONEY_CORRECTION_TEMPORAL_KERNEL_V0_1.md`

because ADR-0022, ADR-0015 and ADR-0019 constrain the same irreversible commercial-history semantics and should not be solved independently.

That artifact should also carry ADR-0010 and ADR-0011 dependencies explicitly rather than pretending regional/tax/cost-attribution questions are already settled.
