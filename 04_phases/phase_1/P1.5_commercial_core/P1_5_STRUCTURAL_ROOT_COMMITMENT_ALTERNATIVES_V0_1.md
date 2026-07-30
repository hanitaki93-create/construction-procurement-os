# P1.5 — Structural Root & Commitment Alternatives v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE DECISION FRAMING / NOT FROZEN / ADR STATUS UNCHANGED  
**Parent:** `P1_5_LOAD_BEARING_CATALOGUE_V0_1.md`  
**Primary ADRs:** ADR-0003, ADR-0004  
**Cross-cutting:** FT-02/06/10, ADR-0011, ADR-0015, ADR-0019, ADR-0022, ADR-0023

---

## 1. Purpose

Attack three interlocked design questions before freezing a physical commercial core:

1. **What is the structural root of procurement?**
2. **How do PO, subcontract, service, framework and call-off obligations share commercial invariants without false unification?**
3. **What semantic identity prevents the same economic value from being recognized twice across goods/progress/milestone/service fulfilment paths?**

These questions cannot be decided independently.

A structural root that over-owns scope becomes a second gravity well. A commitment abstraction that is too generic erases legally/operationally distinct behaviour. A fulfilment model without economic-component identity permits duplicate value.

No database inheritance/composition technology is selected here.

---

## 2. Binding constraints

Any candidate must preserve:

- P01 origin families: `DemandLine` or `PlannedRequirement`;
- `RequirementAllocation` as scope-consumption authority only;
- optional `ProcurementPackage`;
- direct-demand and package-mediated sourcing;
- A0–A3 ability to terminate at `AwardDecision → external handoff` without P07;
- award ≠ commitment;
- supplier source truth ≠ normalization/evaluation ≠ contractable basis;
- P07 as sole independent XL;
- no duplicate allocation/value ledger;
- terms authority ≠ ordinary commitment;
- original commitment baseline ≠ current derived position;
- goods receipt ≠ subcontract/progress certification;
- one economic value once;
- P1.4 fact/event-level authority and bounded domain actions;
- future additive event/entity expansion without history rewrite.

---

# 3. ADR-0003 — procurement structural-root alternatives

## R1 — ProcurementPackage as universal root

### Shape

`Project → ProcurementPackage → RequirementAllocation → Tender/Award/Commitment`

or all sourcing/commitment records belong to a package even where user did not conceptually create one.

### Strengths

- simple navigation/container story;
- package aligns naturally with subcontract package procurement;
- convenient reporting grouping.

### Failures

- contradicts primary/provisional routes where package is optional;
- ordinary material requisition/direct sourcing would need fake package creation;
- long-lead early procurement could be forced into a container that is not the business authority;
- A0 onboarding burden increases;
- package risks inheriting false scope/value authority;
- future direct-source route becomes awkward.

### Verdict

**REJECT as universal structural root.**

`ProcurementPackage` remains valid optional grouping/planning context.

---

## R2 — DemandLine as universal root

### Shape

`DemandLine → allocation → sourcing → award → commitment`

All procurement ultimately reconciles to a detailed demand/requisition line.

### Strengths

- intuitive ordinary material-request path;
- strong line-level traceability;
- easy quantity conservation where demand is explicit.

### Failures

- planned/long-lead procurement may legitimately precede detailed MR/demand;
- would force later backfilled demand to become historical root after the fact;
- risks rewriting early procurement lineage;
- non-quantified subcontract/service scope does not always map cleanly to requisition lines.

### Verdict

**REJECT as universal root.**

`DemandLine` remains one authorized requirement-source family.

---

## R3 — RequirementAllocation as universal aggregate/root

### Shape

Every sourcing/award/commitment transaction is structurally owned by one `RequirementAllocation` aggregate/container.

### Strengths

- preserves hard scope lineage;
- direct and packaged paths converge;
- award/commitment cannot escape authorization;
- attractive closed-graph structure.

### Failures

- allocation is already frozen as **scope-consumption authority only**;
- one tender/commitment may bind multiple authorized leaves;
- one allocation leaf may move through split/reconciliation lifecycle without being the natural user/business container;
- turning allocation into navigation/workflow/value root creates a hidden universal gravity well;
- risk of embedding bid, approval, commitment and value states inside allocation;
- exact FT-02/06/10 mechanics remain unproven.

### Verdict

**REJECT as universal aggregate/root.**

`RequirementAllocation` remains a mandatory authority lineage/edge where scope authority is required, not the owner of all procurement truth.

---

## R4 — Higher-order ProcurementCase/ProcurementIntent universal root

### Shape

`Requirement source(s) → ProcurementCase → allocation/package/tender/direct-source/award/commitment`

One durable abstract root owns every procurement journey.

### Strengths

- common navigation and traceability;
- could unify direct sourcing, tendering and later commitment paths;
- easy portfolio reporting.

### Failures

- creates a new universal abstract object not proven by primary evidence;
- can become an ontology for its own sake;
- lifecycle becomes enormous because sourcing may terminate at award/handoff while downstream P07 is optional;
- risks second XL/control gravity around “case state”;
- may duplicate identities already held by tender, award and commitment;
- deferred/direct routes may pressure the case into generic BPM.

### Verdict

**REJECT for V1 unless later golden-thread evidence proves a durable higher-order case identity is independently load-bearing.**

A lightweight derived/navigation projection may later group related records without becoming truth authority.

---

## R5 — Polycentric closed graph with mandatory authority lineage

### Shape

No single universal procurement container.

Canonical authority/transaction graph:

`{DemandLine | PlannedRequirement}`
`→ RequirementAllocation lineage`
`→ [optional ProcurementPackage]`
`→ {TenderEvent | later controlled DirectSource event}`
`→ AwardDecision`
`→ [external handoff OR P07 Commitment]`

Relationships, not one root aggregate, preserve end-to-end traceability.

Key rules:

- requirement source owns authorized need basis;
- RequirementAllocation owns scope-consumption lineage;
- package groups/plans but does not own need or value;
- TenderEvent owns the sourcing event/release/participants/responses context;
- AwardDecision owns buyer selection decision;
- Commitment owns effective obligation when P07 is activated;
- each node has its own bounded lifecycle;
- end-to-end query/navigation is a graph/projection concern, not a new truth object.

### Strengths

- matches observed/provisional direct and packaged routes;
- supports early planned procurement;
- preserves A0–A3 independent termination;
- avoids allocation/package becoming hidden universal root;
- supports many-to-many allocation-to-tender/award/commitment relationships where legitimately needed;
- future direct-source path can attach to same authority lineage without fake tender/package;
- aligns Closed Sub-graph rule: each bounded slice bottoms out in explicit domain/interface contracts.

### Risks

- graph navigation/reporting must be deliberate later;
- relationship cardinalities need careful control;
- builder could accidentally create duplicated link states;
- RequirementAllocation exact mechanics remain falsifiable.

### Current verdict

**LEADING CANDIDATE — ACCEPTED_P15_CANDIDATE, NOT FROZEN.**

This is currently the only alternative that preserves upstream evidence, A0–A3 decomposability and one-XL discipline without inventing a universal container.

---

# 4. ADR-0003 candidate decision direction

Candidate statement:

> V1 uses a **polycentric procurement graph**, not one universal procurement root. Authorized requirement source and `RequirementAllocation` lineage provide the scope-authority backbone; package is optional grouping; sourcing, award and commitment remain bounded transaction identities with explicit relationships. No higher-order ProcurementCase becomes business truth unless later evidence proves an independently load-bearing identity.

ADR-0003 remains `PROPOSED` until cross-track/golden-thread/hostile validation.

---

# 5. ADR-0004 — PO/Subcontract/Framework/CallOff alternatives

## C1 — fully separate top-level commercial models

### Shape

Independent:

- PurchaseOrder
- Subcontract
- ServiceContract
- FrameworkAgreement
- CallOff

with mostly independent baseline/change/currency/terms/closeout logic.

### Strengths

- maximum domain-specific clarity;
- workflows can diverge naturally;
- easy to use familiar business labels.

### Failures

- duplicates shared commitment formation/change/money/history/authority invariants;
- corrections/FX/numbering/audit/concurrency diverge by module;
- harder to derive consistent commercial positions;
- future hybrid/service commitments multiply top-level models;
- raises risk of several mini-ledgers inside P07.

### Verdict

**REJECT as independent duplicated commercial cores.**

Distinct document/commitment kinds remain necessary, but not duplicated truth engines.

---

## C2 — one generic Commitment object with one universal lifecycle

### Shape

Every PO/subcontract/framework/call-off/service is one `Commitment` type differentiated mostly by `kind`.

One lifecycle, one fulfilment model, one valuation grammar.

### Strengths

- minimal object count;
- one baseline/change/correction engine;
- simple aggregation.

### Failures

- false unification;
- goods receipt and progress certification differ materially;
- terms authority/framework may exist without ordinary obligation;
- call-off has parent terms-authority relation;
- lump sum/SOV, remeasurement, milestone, service, goods quantity all differ;
- kind-based branching can become an unreadable mega-object;
- legal/document formation requirements differ.

### Verdict

**REJECT.**

A common commercial core cannot imply one universal lifecycle/fulfilment grammar.

---

## C3 — common CommitmentCore + composed capability contracts

### Semantic shape

A durable **Commitment** identity exists only when an effective supplier obligation exists.

Every Commitment shares a bounded common commercial core:

- tenant/project/ContractingAuthorityContext;
- counterparty relationship;
- formation/effectiveness evidence;
- original effective baseline;
- requirement-allocation bindings where applicable;
- terms-authority reference where applicable;
- currency/monetary context;
- change history;
- correction/supersession history;
- close/cancel state semantics;
- authority/audit/concurrency invariants.

Specific behaviour is composed from explicit capability contracts rather than one universal lifecycle:

- `QUANTITY_GOODS_FULFILMENT`
- `PROGRESS_VALUATION`
- `REMEASUREMENT`
- `MILESTONE_VALUATION`
- `RATE_BASED_SERVICE`
- `DELIVERABLE_ACCEPTANCE`
- `ALLOWANCE / PROVISIONAL_SUM`
- other narrowly evidenced commercial mechanisms.

A commitment may use multiple compatible capabilities by component/segment where the contract genuinely does so.

Document/business kinds remain explicit:

- PO;
- Subcontract;
- Service/Other Commitment as evidenced;
- CallOff/Release/Order;
- any later supported kind.

Kind influences allowed capabilities/guards/evidence, but does not own a separate commercial ledger.

### Framework / terms authority

`CommercialTermsAuthority` is **not automatically a Commitment**.

It may establish reusable rates/terms/formulas/call-off rules.

Each effective call-off/release/order is a Commitment referencing the exact terms-authority version.

If the framework itself creates a guaranteed commercial minimum/exposure, that exposure must be represented explicitly under its real contractual authority without inventing physical scope. The exact physical composition remains an open sub-question of this candidate.

### Strengths

- one shared baseline/change/correction/money authority substrate;
- preserves legally/operationally distinct commitment kinds;
- goods and subcontract fulfilment can diverge cleanly;
- supports hybrid/composable commercial mechanisms;
- prevents per-module duplicate ledgers;
- future kinds can reuse core contracts without ontology rewrite;
- fits P07 sole-XL direction.

### Risks

- capability model can become a generic rule engine if unconstrained;
- excessive mix-and-match could permit nonsensical combinations;
- physical aggregate boundaries remain to be tested;
- document-kind-specific mandatory terms/formation rules need explicit profiles;
- economic component identity becomes mandatory to prevent double value when capabilities compose.

### Current verdict

**LEADING CANDIDATE — ACCEPTED_P15_CANDIDATE, NOT FROZEN.**

---

## C4 — shared interfaces only, no common Commitment identity

### Shape

PO/Subcontract/etc remain independent aggregates but implement shared conceptual interfaces for baseline/change/money/audit.

### Strengths

- keeps domain aggregates strongly separate;
- can reuse services/contracts without inheritance;
- less risk of mega-object.

### Failures

- same effective supplier obligation concept lacks one canonical identity family;
- portfolio/commercial projections must normalize separate truth models;
- shared interfaces can still hide divergent semantics/duplicate ledgers;
- changes/corrections across types may drift;
- framework/call-off relationships become inconsistent across implementations.

### Verdict

**SECONDARY CANDIDATE / fallback if C3 aggregate coherence fails.**

The useful idea—composition/shared interfaces—is retained inside C3, but without surrendering one semantic Commitment identity for effective obligation.

---

# 6. ADR-0004 candidate decision direction

Candidate statement:

> An **effective supplier obligation has one semantic Commitment identity and common commercial core**, while PO/subcontract/call-off/service kinds retain explicit kind-specific formation, fulfilment and valuation capability profiles. `CommercialTermsAuthority` is separate because reusable terms do not necessarily create an ordinary obligation. Physical implementation should prefer composition/bounded capability contracts over one universal lifecycle or duplicated per-type commercial cores.

ADR-0004 remains `PROPOSED` until money, lifecycle, correction, Ceiling Test and hostile review validate this direction.

---

# 7. Economic component identity alternatives

A common CommitmentCore is unsafe unless value-contributing mechanisms resolve to a common economic identity.

## ECI-1 — commitment line only

Every economic contribution maps to a CommitmentLine.

### Problem

- SOV/milestones/services/lump-sum sections may not map naturally to item lines;
- one line may contain stored material + installation stages;
- non-quantified scope may need explicit partitions.

**REJECT as universal grain.**

---

## ECI-2 — SOV item only

Every economic contribution maps to a ScheduleOfValues item.

### Problem

- ordinary goods PO may not use SOV;
- milestone/service/deliverable models vary;
- invents SOV where business does not use it.

**REJECT as universal grain.**

---

## ECI-3 — generic EconomicComponent identity resolved from contractual structure

### Candidate semantics

Each value-contributing event references an **EconomicComponent** within a Commitment.

EconomicComponent means:

> the minimum contractually meaningful unit over which cumulative economic contribution must be conserved so the same value cannot be recognized twice.

It may resolve physically/business-wise to:

- commitment line;
- SOV line/section;
- milestone component;
- scope partition;
- deliverable;
- service period/unit;
- composite child component where contract requires it.

It is not a construction ontology and does not require all commitments to use the same physical component type.

Minimum semantics:

- stable identity within commitment history;
- contractual/valuation basis reference;
- parent/child relation only where needed for composition;
- allowed fulfilment/valuation mechanisms;
- cumulative recognized/certified contribution;
- correction/reversal lineage;
- no duplicate contribution across mechanisms.

### Strengths

- supports goods, progress, milestone and service models;
- preserves one-economic-value-once;
- allows stored material → installed work to transition through same economic lineage;
- can remain thin where one commitment line already is the component;
- avoids forcing a single BOQ/SOV ontology.

### Risks

- could become needless extra object per line if implemented mechanically;
- parent/child hierarchy could become generic scope ontology;
- exact cardinality to RequirementAllocation and valuation components needs testing.

### Current verdict

**LEADING SEMANTIC CANDIDATE — physical durable object not yet assumed.**

P1.5 may later implement component identity as existing line/SOV/milestone identity where sufficient, with a distinct component identity only when multiple mechanisms require a shared economic conservation grain.

---

# 8. One-economic-value-once candidate invariant

For each effective Commitment and economic component:

> a value contribution may enter an authoritative commercial position only once for the same underlying earned/recognized economic value, unless a governed reversal/correction first removes or reclassifies the prior contribution.

Therefore:

- supplier claim does not contribute certified value;
- assessment and certification are separate authority layers;
- stored-material certification and later installation must distinguish transition of prior recognized value from incremental earnable value;
- goods receipt alone does not imply value unless contract grammar says it triggers recognition/certification;
- milestone evidence can support value only under milestone valuation basis;
- external AP posting/payment never contributes a second product commercial value;
- recovery/reclassification must not duplicate or erase original obligation semantics.

---

# 9. Relationship cardinality candidate directions

These are semantic cardinality pressures, not final schema.

### Requirement source → allocation

One source may create multiple allocation leaves over time.

### Allocation → sourcing

One active allocation leaf may participate in one or more sourcing attempts over history, but overlapping active consumption must obey the authorized scope model.

One TenderEvent may source multiple allocation leaves.

### Package → allocation

Package may group multiple allocation leaves.

An allocation leaf need not belong to a package.

### Tender → award

One tender may produce one or multiple awards where permitted by split scope.

Each awarded slice must bind explicit allocation lineage.

### Award → commitment

Award may:

- hand off externally with no P07 commitment;
- produce one or more effective commitments only where the approved contractable basis/scope split supports it.

Commitment formation must not duplicate scope consumption.

### Terms authority → commitment

One terms authority version may govern many call-off commitments.

Each call-off binds the exact version used.

### Commitment → economic component

One commitment contains one or more economic components.

One value-contributing event may affect one or multiple components only if allocation of value across them is explicit/reconstructable.

---

# 10. A0–A3 test

R5 + C3 preserves A0–A3:

`Requirement source`
`→ RequirementAllocation`
`→ optional Package`
`→ TenderEvent`
`→ Bid/Comparison`
`→ AwardDecision`
`→ external handoff`

No CommitmentCore, fulfilment capability, ERP connector, supplier network or advanced AI is required before the external handoff terminal point.

**A0–A3 result: PASS for leading candidate.**

---

# 11. Standard subcontract thread test

Candidate path:

`Demand/PlannedRequirement`
`→ Allocation leaves`
`→ Package optional/likely`
`→ Tender`
`→ Comparison/Award`
`→ Subcontract-kind CommitmentCore`
`→ economic components likely SOV/scope segments`
`→ ProgressClaim`
`→ Assessment`
`→ Certification`
`→ retention/advance components`
`→ Change events`
`→ closeout/release`

No structural fork or second ledger required.

**GT-1 early structural result: PASS WITH OPEN money/correction/lifecycle details.**

---

# 12. Long-lead goods thread test

Candidate path:

`PlannedRequirement`
`→ Allocation`
`→ optional Package`
`→ Tender/Award`
`→ PO-kind CommitmentCore`
`→ line/economic components`
`→ advance/terms where applicable`
`→ submittal dependency reference`
`→ manufacture/shipment`
`→ GoodsReceipt`
`→ commercial recognition/match according to terms`
`→ external accounting seam`

The same structural graph works without subcontract SOV semantics.

**GT-2 early structural result: PASS WITH OPEN fulfilment/value timing details.**

---

# 13. Framework / call-off hostile test

### Ordinary rate framework

`CommercialTermsAuthority`
`→ no ordinary commitment value`
`→ call-off CommitmentCore(s)`
`→ each call-off binds terms version + allocation scope`

Clean.

### Scope-backed guaranteed minimum

Terms/framework effectiveness may reserve authorized scope lineage; call-offs draw down reservation rather than consume twice.

Exact physical event/aggregate needs later validation.

### Monetary guaranteed minimum

Framework may create explicit monetary exposure without physical scope.

This is the main hostile pressure on strict `terms authority ≠ commitment`.

Candidate interpretation:

- reusable terms authority remains distinct;
- if framework effectiveness itself creates enforceable monetary obligation, represent that obligation explicitly as an obligation/exposure component governed by the terms authority rather than pretending the terms document is economically inert;
- call-offs reduce/qualify outstanding minimum according to contract rule;
- do not fabricate RequirementAllocation quantity.

**Result: STRUCTURALLY EXPRESSIBLE, but exact obligation representation remains OPEN and must be attacked in money/lifecycle kernel.**

---

# 14. Ceiling Test preview

## Multi-entity/JV

R5 graph binds Project/transaction to frozen `ContractingAuthorityContext`; C3 CommitmentCore carries exact context.

**PASS.**

## Cross-country vendor relationship

Supplier relationship remains tenant-private; commitment binds exact counterparty registration/relationship and tax context.

**PASS structurally; tax semantics open ADR-0010.**

## Multi-currency commercial chain

C3 common monetary context can support commitment currency distinct from budget/reporting/accounting currencies.

**PASS structurally; ADR-0022 open.**

## Authority change in flight

Transactions bind load-bearing config version while live security is checked; R5 bounded lifecycles avoid one mega-case state.

**PASS structurally.**

## Different fiscal semantics

Commitment/economic events can bind entity-specific period rules without changing ontology.

**PASS structurally; period model open.**

## Contextual vendor status

Supplier business identity/relationship and contextual eligibility remain separate.

**PASS.**

No scenario requires a second ledger/ontology fork at this stage.

---

# 15. Closed Sub-graph preview

### A0–A3

Closed without P07: **PASS.**

### P07 goods slice

Could implement requirement → award → PO-kind commitment → goods fulfilment → external accounting seam without progress-certification UI, provided shared money/change/correction contracts exist.

**Candidate PASS.**

### P07 subcontract slice

Could implement requirement → award → subcontract-kind commitment → claim/assessment/certification → closeout without WMS/CDE/CPM/full ERP.

**Candidate PASS.**

Shared core does not require all capability profiles to be implemented simultaneously if omitted profiles have no hidden dependency.

---

# 16. Object-collapse pressure

The leading model deliberately avoids durable identity where event/value/projection suffices.

Likely durable semantic identities:

- requirement source identity;
- RequirementAllocation lineage identity;
- optional ProcurementPackage where users/business need durable grouping;
- TenderEvent;
- supplier business relationship;
- BidSubmission revision;
- ComparisonSnapshot;
- AwardDecision;
- CommercialTermsAuthority only where reusable terms have durable business identity;
- Commitment when effective obligation exists;
- economic component identity only where needed beyond an existing line/SOV/milestone identity.

Likely event/value/projection rather than independent aggregate by default:

- eligibility evaluation;
- bid intent/decline;
- many workflow/task statuses;
- current commitment/retention/advance balances;
- milestone health;
- reconciliation state;
- non-response;
- derived actual procurement status.

This is a candidate simplification direction, not final entity dictionary.

---

# 17. One-XL audit

R5 avoids ProcurementCase/allocation becoming a second XL.

C3 concentrates commercial baseline/change/value history inside the intended P07 gravity well while keeping type-specific capability profiles bounded.

EconomicComponent is a conservation identity, not a ledger or independent process gravity well.

**SECOND XL: CLEAN at alternatives stage.**

---

# 18. Current decisions / non-decisions

### Candidate promoted

- ADR-0003 leading direction: **R5 polycentric closed graph with mandatory requirement-allocation authority lineage.**
- ADR-0004 leading direction: **C3 common CommitmentCore + composed bounded capability profiles; terms authority separate from ordinary commitment.**
- economic recognition leading direction: **ECI-3 generic semantic economic-component identity, resolved to existing contractual grain where possible.**

### Still open

- exact Commitment physical aggregate boundary;
- whether CommercialTermsAuthority with guaranteed minimum carries a separate obligation component or other representation;
- economic-component durable identity versus reuse of existing line/SOV/milestone identity;
- exact many-to-many allocation/award/commitment cardinality and conservation mechanics under FT debt;
- money/rounding/tax;
- certification finalization/correction;
- period/temporal model;
- numbering/concurrency;
- workflow/configuration breadth.

No ADR status changes are made by this artifact.

---

# 19. Next required working step

Before accepting ADR-0003/0004, create:

`P1_5_COMMITMENT_ECONOMIC_KERNEL_V0_1.md`

It should vertically reconcile the leading R5/C3/ECI-3 candidates through:

- commitment formation;
- original baseline;
- change/instruction;
- goods/progress/milestone/service fulfilment;
- claim/assessment/certification;
- retention/advance/allowance/recovery;
- derived positions;
- correction/finalization;
- money/FX/tax hooks;
- lifecycle/authority/concurrency hooks;
- GT-1/GT-2/GT-3/GT-4 microthreads.

The kernel must show whether the leading structural candidates survive economic semantics before ADR promotion.
