# P1.5 — Commercial Core — Workplan v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE WORKPLAN / NOT FROZEN  
**P1.4:** PASS / CLOSED / FROZEN  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

## 1. Purpose

P1.5 must produce **one internally consistent Commercial Core model of data, commercial value, lifecycle and authority**.

P1.5a–P1.5d are four views of the same core, not four sequential mini-projects:

- **P1.5a — Entities & Master Data**
- **P1.5b — Cost Ledger & Posting Semantics**
- **P1.5c — Lifecycles & State Machines**
- **P1.5d — Authority / Approval / Audit / Concurrency**

No track may freeze a decision that another track cannot express without duplicate truth, hidden mutation, history rewrite or second-ledger behaviour.

This phase remains architecture/specification only. It does not select database tables, ORM classes, API payloads, framework technology or product code.

---

## 2. Canonical inputs read before work

P1.5 work begins from the current canonical repository state and the following controlling inputs:

- `PROJECT_STATE.md`
- `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`
- `01_roadmaps/PHASE1_ROADMAP_V1_1_FROZEN.md` for the inherited P1.5 Ceiling Test and Closed Sub-graph Gate
- `P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`
- `P1_4_FINAL_CHECKPOINT_V1_0.md`
- current `02_research/control/adr_log.csv`
- `P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_3.md`
- `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_3.md`

Earlier provisional checkpoints remain evidence/candidate mechanics only where not later accepted. They do not override the frozen P1.4 contract or current ADR statuses.

Do not restart broad competitor research.

---

## 3. Frozen constraints P1.5 must inherit

P1.5 may choose physical representation but may not reinterpret these semantic boundaries:

1. tenant isolation, including indirect/model-mediated use;
2. `ContractingAuthorityContext` semantics and no implied partner access;
3. tenant-private supplier business relationships;
4. internal authorization versus external-grant non-bypass;
5. `OWN / MIRROR / REFERENCE / OUT` at load-bearing fact/field/event grain;
6. the frozen load-bearing test;
7. history-preserving evidence/provenance/supersession;
8. bounded offboarding, retention, disposition and tombstone semantics;
9. tenant-level declared residency and governed migration;
10. load-bearing configuration/version binding plus current live-security checks;
11. product commercial truth versus external accounting truth;
12. connector/middleware never becoming business authority;
13. P07 as the sole independent XL gravity well;
14. A0–A3 independent operation;
15. future agents acting through bounded domain operations rather than arbitrary truth writes;
16. cross-tenant learned business knowledge OUT by default;
17. ADR-0024 provenance and bounded-action constraints.

A P1.5 model that makes any frozen invariant difficult is defective; the invariant is not weakened for implementation convenience.

---

## 4. Core modelling principle — one decision, four reconciliations

Every load-bearing commercial-core decision is evaluated through four simultaneous questions.

### A — object / relation view

What business identity or relation exists, what is its cardinality, what is master/configuration/transaction/evidence, what can revise or supersede it, and which frozen authority boundary applies?

### B — economic event / balance view

Does the decision create, modify, reserve, recognize, certify, reverse, release, recover or merely describe economic/commercial exposure? Which canonical event causes the change and which positions are derived from it?

### C — lifecycle view

Which state transition occurs, what preconditions/guards apply, what becomes effective, what can be reversed/superseded/cancelled, and what historical meaning survives?

### D — authority / audit / concurrency view

Who may request, approve and execute the transition? Which bound policy/configuration governs it? Which current security capability is checked? What idempotency/concurrency rule prevents double effect? What audit/evidence must survive?

**Reconciliation rule:** no candidate object/event/state/approval mechanism advances to freeze unless all four views agree on one truth path.

---

## 5. Iterative reconciliation loop

P1.5 will run repeated vertical loops instead of completing one track horizontally.

For each commercial-core slice:

1. identify the real business/economic question;
2. identify candidate source/master/transaction/evidence identities;
3. apply the P1.4 load-bearing test;
4. classify authority and governing version/context;
5. identify economic event(s) and derived position(s);
6. define lifecycle transition(s), guards and reversibility;
7. define authorization/approval/audit/concurrency semantics;
8. run contradiction checks against P01–P12 and accepted ADRs;
9. run one or more golden-thread checkpoints;
10. run second-ledger / one-XL check;
11. run A0–A3 closed-slice check where relevant;
12. either promote to candidate contract or leave explicitly OPEN/FALSIFIABLE with blocker/evidence debt.

No physical table design precedes this loop.

---

## 6. Canonical commercial-event / balance questions

The following questions drive P1.5a–d together.

### Formation / obligation

- What event creates an effective supplier obligation?
- How is `AwardDecision` distinguished from commitment formation?
- What is immutable original obligation baseline versus later effective position?
- Can framework/terms authority exist without an obligation?
- What creates an effective call-off/release/order under terms authority?
- What facts make PO, subcontract, service, framework or call-off legally/commercially distinct without duplicating common invariants?

### Requirement / scope authority

- What requirement basis exists before sourcing?
- What does `RequirementAllocation` consume and conserve?
- How are quantity, non-quantified scope and hybrid authorization represented semantically?
- How do split/merge/reconciliation/conversion preserve one lineage?
- What happens when authorized scope decreases after sourcing/award/commitment?
- What is still unproven under FT-02/06/10?

### Commercial change

- What can change scope, price, quantity, rate, terms, time or valuation basis?
- What distinguishes instruction/work authority from agreed valuation?
- When does instructed work expand authorized requirement basis?
- How are provisional/unagreed positions certified without pretending final agreement?
- What changes original baseline versus current effective commitment?

### Fulfilment / earned value

- What does goods receipt prove versus what does it economically recognize?
- How do progress valuation, milestone certification, service/deliverable acceptance and material receipt compose without recognizing the same economic value twice?
- What is the common economic component/grain?
- How are reversible source fulfilment and irreversible certified defective work distinguished under CR-02?

### Certification / claims

- How are supplier claim, buyer assessment, certification and accounting posting kept distinct?
- What contractual/valuation authority supports every certified amount?
- What caps firm-price work versus remeasurable/provisional/daywork/milestone/service work?
- What event makes a certificate final/effective and how is it corrected later?

### Retention / advance / allowances / recovery

- Which events establish terms/exposure and which events reduce/release/recoup/recover them?
- Are positions stored facts or derived projections?
- Which economic base prevents double counting?
- What is product commercial truth versus external accounting/payment truth?

### Accounting seam

- Which facts remain product `OWN` and which are external `MIRROR/REFERENCE/OUT`?
- What is certification versus AP liability/posting?
- What is commercial `actual` versus accounting posted/paid?
- How do external rejection categories affect workflow without rewriting valid product truth?

### Correction / period close

- What is non-economic amendment versus reverse-and-replace, forward adjustment, physical reversal, reclassification or integration correction?
- Which historical events are immutable?
- What can be corrected in an open period versus a closed period?
- How is current position corrected without invisibly rewriting certified history?

### Money / currency / tax

- What is canonical decimal representation?
- Where is transaction/commitment/certificate currency carried?
- What rate source/fixing basis/version governs conversion?
- Which currency drives obligation, budget, reporting and accounting interface?
- At what steps does rounding occur and in what order do retention, advance recoupment, contra, tax and net certification calculate?

### Time / temporal meaning

- Which dates mean business validity/effectiveness versus record time?
- How are backdating, period cut-off, authority change, policy change, FX change and legal-entity change interpreted historically?
- Which in-flight objects remain on prior governing version versus require migration/re-evaluation?

### Numbering / identity / concurrency

- Which internal identities must never change?
- Which human/legal display numbers are scoped by tenant/legal entity/project/type/fiscal period?
- When are numbers allocated?
- Are gaps allowed?
- How do retry/cancel/rollback avoid duplicate or misleading numbers?
- Which state-changing commands require optimistic/pessimistic/conceptual concurrency guards or idempotency keys?

---

## 7. Provisional load-bearing catalogue programme

P1.5 must create a concrete catalogue, but the catalogue is derived by the frozen P1.4 test rather than by naming every field in advance.

The first catalogue pass will cover P01–P12 and shared substrates with at least:

- concept/fact/event;
- domain/process;
- business identity/grain candidate;
- load-bearing reason: outcome dependence / counterfactual materiality / reconstruction necessity;
- authority class and authoritative source/writer;
- governing version/effective context;
- evidence/provenance obligation;
- economic effect or `NONE`;
- lifecycle transition or state significance;
- approval/authorization significance;
- freshness/conflict significance where external;
- correction/reversal significance;
- evidence status: accepted / primary-supported / provisional / falsifiable debt;
- owning P1.5 track(s).

Initial families to catalogue:

1. Tenant / LegalEntity / ContractingAuthorityContext / Project authority facts
2. Budget/CostStructure attribution basis
3. DemandLine / PlannedRequirement authorization basis
4. RequirementAllocation lineage and consumption facts
5. ProcurementPackage grouping context
6. TenderEvent / TenderRelease / Addendum
7. TenderParticipant / BidIntent / BidSubmission revisions
8. normalization / BidLineMapping / EvaluationAdjustment
9. ComparisonSchema / ComparisonSnapshot / FX-tax evaluation basis
10. AwardRecommendation / ApprovalCase / AwardDecision
11. CommercialTermsAuthority / framework terms / call-off authority
12. commitment formation / original baseline / effective position
13. scope/quantity basis / valuation basis / economic component identity
14. authorized instruction / change / agreed change
15. fulfilment / receipt / valuation / milestone / deliverable facts
16. supplier claim / buyer assessment / certification
17. retention / advance / allowance / recovery events
18. closeout / security / warranty / release commercial effects
19. external accounting facts / posting / payment / reconciliation status
20. workflow outcome / domain-command execution / audit/concurrency facts
21. evidence/source/version/tombstone facts
22. integration authority/freshness/conflict facts
23. long-lead and technical-approval dependency facts only where they govern commercial transitions.

---

## 8. Open ADR programme

Current structural/commercial ADRs requiring active P1.5 treatment:

### P1.5a-heavy but cross-track

- **ADR-0003** procurement structural root
- **ADR-0004** PO/Subcontract/Framework/CallOff physical composition
- **ADR-0023** numbering/concurrency/fiscal rules

### P1.5b-heavy but cross-track

- **ADR-0010** GCC commercial semantics / evidence debt
- **ADR-0011** budget/cost attribution timing
- **ADR-0015** posting/finalization/reversal/correction physical semantics
- **ADR-0022** money/rounding/calculation order

### P1.5c/d-heavy but cross-track

- **ADR-0008** workflow engine breadth
- **ADR-0009** configuration breadth
- **ADR-0019** physical temporal model

### Interface/deployment watch

- **ADR-0006** integration depth remains open but cannot create an A0–A3 connector prerequisite.

Accepted P1.4 ADRs are inherited constraints, not reopened by schema convenience:

- ADR-0005
- ADR-0012
- ADR-0014
- ADR-0018
- ADR-0020
- ADR-0021
- ADR-0024
- ADR-0025
- ADR-0026

No open ADR is accepted merely because one candidate object model is convenient.

---

## 9. Evidence debt / falsifiability controls

The following stay explicit until resolved by evidence or bounded design that does not overclaim practice:

- **FT-02** exact RequirementAllocation mechanics;
- **FT-06** remeasurement conservation;
- **FT-09 / CR-02** rectification/replacement capacity;
- **FT-10** exclusive-scope authority.

P1.5 may define architecture capable of supporting the required invariants but may not label unobserved exact business mechanics as universal contractor truth.

Where a precise semantic decision is unavoidable before freeze, record:

- evidence grade;
- alternative models;
- why the selected invariant is necessary;
- whether it is product policy, domain truth, deployment configuration or still falsifiable.

---

## 10. Golden-thread checkpoints during modelling

Golden threads are used continuously as contradiction tests rather than saved for final P1.11.

### GT-1 — Standard subcontract package

Requirement/package → tender → bid comparison → award → subcontract commitment → change → progress claim → assessment/certification → retention → closeout.

### GT-2 — Imported long-lead equipment

Early planned requirement → allocation → tender → award/commitment → advance/terms → submittal dependency → manufacture/shipment/receipt → valuation/accounting seam.

### GT-3 — Progress claim / certification

Commitment/SOV or valuation basis → supplier claim → assessment → certification → retention/advance/tax → external accounting handoff → correction.

### GT-4 — Variation chain

Instruction / authority → scope-basis effect → provisional valuation where applicable → supplier agreement → commitment change → certification impact → later correction/reconciliation.

For each checkpoint identify:

- object/fact identities;
- authoritative source;
- load-bearing policy/config versions;
- command/transition;
- guard/approval;
- economic event;
- derived positions before/after;
- evidence;
- reversibility/correction;
- concurrency/idempotency risk.

Zero architecture invention is allowed at P1.5 gate execution.

---

## 11. Ceiling Test execution plan

The same core abstractions must survive on paper:

1. multi-entity / bounded JV contracting authority;
2. cross-country vendor identity with multiple legal/tax registrations/relationships;
3. multi-currency commercial chain;
4. authority/configuration change while transactions are in flight;
5. differing legal-entity fiscal semantics;
6. contextual vendor status without duplicating business truth.

**PASS rule:** scenario differences are expressed through configuration/policy/relationships over the same core abstractions.

**FAIL rule:** scenario requires a second incompatible ledger, history-corrupting single-country shortcut, duplicate truth object or fundamental ontology rewrite.

Run the Ceiling Test after each major candidate freeze, not only at P1.5 end.

---

## 12. Closed Sub-graph Gate execution plan

P1.5 must prove the focused V1 slice is executable without requiring the whole future platform.

For every retained V1 entity/action:

1. lifecycle reaches a valid terminal/steady state without an unbuilt product area;
2. each dependency is inside the slice or has an explicit interface/stub;
3. derived balances depend only on event types/contracts in the slice;
4. future entity/event types are additive and do not rewrite existing event meaning;
5. deferred workbenches do not remove deterministic store/invariant/provenance/action contracts.

A0–A3 must remain the most important early closed sub-graph:

`requirement/MR/package → RFQ/tender → supplier response → normalization/comparison → recommendation/approval → AwardDecision → external handoff`

It cannot depend on P07, ERP/CDE connector, supplier network, advanced AI, CPM/BPM or WMS.

---

## 13. Audit/history and redaction/tombstone compatibility

P1.5 owns the commercial/audit history invariant.

The candidate model must support:

- immutable record/event identity;
- history-preserving correction;
- commercial/financial meaning and derived-balance integrity;
- referential integrity;
- explicit redaction/tombstone action identity;
- authority and audit trail for redaction/tombstone;
- later payload restriction/disposition without making a domain event disappear;
- inability to fabricate missing historical provenance.

Do not freeze `append-only` as a simplistic physical slogan. Freeze the semantic invariant and controlled correction/redaction compatibility.

---

## 14. Projection reproducibility

Current positions/balances are projections over authoritative history, not independently edited truth.

For every projection define eventually:

- source event families;
- inclusion/exclusion conditions;
- effective applicability;
- derivation version/identity where evolution matters;
- recalculation rule;
- treatment of superseded/reversed/corrected events;
- currency/rounding basis;
- external authoritative inputs/freshness where used.

New event types may alter future or historical projections only through explicit controlled derivation evolution. Existing historical event meaning cannot change silently.

---

## 15. One-XL / second-ledger audit

At every loop ask whether a candidate subsystem is accumulating independent commercial authority.

The following may not become a second ledger or XL gravity well:

- RequirementAllocation;
- workflow/task/approval;
- evidence/audit;
- integration/reconciliation;
- accounting mirror;
- identity/authorization;
- AI/agent memory;
- schedule/long-lead overlay;
- CDE/technical approval seam;
- supplier network.

**P07 remains the sole independent XL.**

---

## 16. Working artifact sequence

### W0 — orientation / workplan

- `P1_5_WORKPLAN_V0_1.md`

### W1 — commercial event and derived-position frame

Define the candidate economic event families, economic component identity, position families and second-ledger guard before physical object freeze.

### W2 — provisional load-bearing catalogue v0.1

Catalogue P01–P12 facts/events/configuration using the frozen test and accepted authority boundaries.

### W3 — structural alternatives / ADR-0003 + ADR-0004

Test structural roots and commitment composition against sourcing, P07, A0–A3, Ceiling Test and Closed Sub-graph rules.

### W4 — money / posting / correction kernel

ADR-0015 + ADR-0022 + period/FX/tax semantics; execute closed-period correction micro-thread early.

### W5 — lifecycle kernel

State/transition/guard/event/reversibility contracts for SPINE transactions.

### W6 — authority / workflow / concurrency kernel

Approval outcome → domain command seam, DOA/delegation, numbering/idempotency/concurrency and audit catalogue.

### W7 — integrated vertical slices

Reconcile W1–W6 through GT-1–GT-4 and major P01–P12 transitions.

### W8 — Ceiling Test + Closed Sub-graph audit

Run complete mandated scenarios and focused V1 executability proof.

### W9 — hostile dual-model audit

Internal hostile audit → remediation/recheck → external Claude audit → remediation until both models PASS.

### W10 — final freeze / ADR reconciliation / P1.6 transition

Only after all gates pass.

---

## 17. Promotion / freeze discipline

Candidate semantics use one of:

- `FROZEN_INHERITED` — already frozen upstream;
- `ACCEPTED_P15_CANDIDATE` — internally coherent but hostile audit pending;
- `PROVISIONAL_EVIDENCE_SUPPORTED`;
- `FALSIFIABLE_EVIDENCE_DEBT`;
- `OPEN_ADR`;
- `REJECTED`.

No candidate becomes frozen because it appears in an entity diagram or event list.

All P1.5 freeze decisions must state:

- evidence/constraint basis;
- affected ADR(s);
- cross-track reconciliation result;
- golden-thread result;
- Ceiling/Closed-Subgraph impact;
- one-XL result;
- P1.4 regression result.

---

## 18. P1.5 gate

P1.5 cannot close until:

1. every derived balance has one canonical derivation over commercial financial events;
2. every SPINE transaction has a complete lifecycle;
3. every transition names guard, authority, financial effect, event and reversibility;
4. golden threads 1–4 execute on paper with zero architecture invention;
5. P1.5 Ceiling Test passes;
6. P1.5 Closed Sub-graph Gate passes;
7. append-only/history/redaction-tombstone compatibility passes;
8. projection reproducibility passes;
9. P07 remains sole independent XL;
10. A0–A3 remains a closed viable sub-graph;
11. open ADRs needed for core freeze are resolved or explicitly proven non-blocking;
12. hostile internal + Claude review passes;
13. product code remains locked throughout P1.5.

---

## 19. Immediate next artifact

Create `P1_5_COMMERCIAL_EVENT_BALANCE_FRAME_V0_1.md`.

It must define candidate event/position families and the economic-component/one-economic-value-once questions before any physical entity graph is frozen.
