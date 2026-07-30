# P1.5 — Commercial Event & Balance Frame v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE CANDIDATE / NOT FROZEN / HOSTILE AUDIT PENDING  
**Parent:** `P1_5_WORKPLAN_V0_1.md`  
**Product code:** LOCKED

---

## 1. Purpose

Define the **economic meaning** that P1.5a–d must express before freezing physical entity composition.

This artifact does not decide database/event-store implementation, PO/Subcontract class hierarchy, universal event sourcing, accounting journal design or API payloads.

It defines a candidate commercial-event grammar and derived-position frame sufficient to test:

- one canonical commercial cost-event substrate;
- no second editable ledger;
- P07 commercial authority;
- external accounting seam;
- valuation/fulfilment composability;
- correction without history rewrite;
- money/FX/tax questions;
- lifecycle and authority implications;
- Ceiling Test and Closed Sub-graph compatibility.

Where P1.2 mechanics remain unproven, this file marks them provisional/falsifiable rather than promoting them to final ontology.

---

## 2. Core separation

P1.5 preserves six orthogonal commercial concerns already identified in P1.2:

1. **terms authority** — rates, formulas, conditions, validity and rules that may govern later obligations;
2. **committed obligation** — effective supplier obligation;
3. **scope/quantity authority** — what work/quantity is authorized and can be consumed;
4. **valuation basis** — how commercial value is measured/agreed/certified;
5. **fulfilment mechanism** — evidence/transition proving delivery, progress, milestone, service or deliverable performance;
6. **accounting authority/interface** — which accounting facts remain external and how reconciliation behaves.

These may intersect in one commercial transaction but are not collapsed into one mutable status/value record.

---

## 3. Event versus fact versus evidence versus projection

P1.5 must not call every dated record an economic event.

### Commercial economic event

A governed occurrence that changes an authoritative commercial exposure, obligation, recognized/certified amount, release, recovery or other product-owned commercial position.

### Governing fact/configuration

A load-bearing value used by an event/decision but which is not itself necessarily an economic movement, for example:

- valuation basis;
- tax basis;
- currency/FX fixing basis;
- retention formula;
- approval policy version;
- ContractingAuthorityContext;
- cost attribution binding.

### Evidence fact

A source/proof/observation that may support a transition or economic event but does not automatically create economic value, for example:

- goods receipt evidence;
- site measurement;
- supplier claim;
- delivery note;
- technical approval;
- milestone evidence.

### Approval/workflow fact

Authorization/routing/result consumed by a bounded domain command. It cannot itself become commercial truth.

### Derived projection

A reproducible current/historical position computed from authoritative events and governing facts. It is not independently editable truth.

---

## 4. Candidate event-family grammar

The following is a **semantic candidate family set**, not a physical event-class list.

### E0 — requirement/scope authority events

Purpose: establish or change authorized procurement scope/capacity.

Candidate effects:

- establish authorized requirement basis;
- increase/decrease/revise requirement basis;
- allocate/split/merge/reconcile scope lineage;
- reserve/release scope-backed capacity.

Economic effect:

- normally **no committed cost by itself**;
- scope authority/consumption effect only.

Guardrail:

`RequirementAllocation` must not become a value/commitment ledger.

Evidence debt:

FT-02/06/10 remain falsifiable.

### E1 — terms-authority events

Purpose: establish or revise contractual/commercial terms that may govern future obligations without necessarily creating an ordinary commitment.

Examples:

- framework/rate agreement effectiveness;
- terms schedule revision;
- call-off rule/version effectiveness;
- formula/retention/advance/valuation-term version effectiveness.

Economic effect:

- often **NONE** until a guaranteed minimum/exposure or later obligation exists;
- a monetary minimum/take-or-pay may create explicit exposure if contractually effective.

Hard question:

terms authority must not be mistaken for committed scope/value merely because rates exist.

### E2 — award-selection events

Purpose: record governed buyer selection/approval basis.

Examples:

- AwardDecision effectiveness;
- rejection/re-tender outcome.

Economic effect:

- **NONE by default**;
- award is not commitment.

A later commitment may consume the approved contractable basis.

### E3 — commitment-formation events

Purpose: create an effective supplier obligation.

Candidate effects:

- establish original commitment baseline;
- bind supplier/counterparty, ContractingAuthorityContext, scope lineage, commercial terms, valuation basis and currency basis;
- create current approved commitment exposure.

Examples conceptually:

- PO effectiveness;
- subcontract effectiveness;
- call-off/release/order effectiveness;
- service order effectiveness.

Physical composition remains ADR-0004.

### E4 — commitment-change events

Purpose: change the effective obligation after formation.

Candidate effect categories:

- add/reduce scope;
- change quantity;
- change rate/price;
- change terms;
- change valuation basis where legitimately permitted;
- extend/revise time where commercially load-bearing;
- transfer/reclassify attribution without rewriting original basis where allowed.

Rules:

- original baseline remains historically intact;
- current approved commitment is derived from effective baseline + effective approved changes;
- changes cannot silently create requirement authority where scope authorization is separately required.

### E5 — authorized-work / provisional-commercial authority events

Purpose: represent valid authority to proceed before final commercial agreement where contract/process allows it.

Candidate examples:

- AuthorizedWorkInstruction;
- provisional valuation authority;
- daywork authorization;
- provisional-sum instruction.

Possible effects:

- expand authorized requirement basis where the instruction itself is valid scope authority;
- establish permitted provisional valuation basis;
- **not** pretend supplier final price/agreement exists.

Later agreement/change reconciles provisional positions non-destructively.

### E6 — fulfilment/acceptance evidence events

Purpose: record delivery/progress/milestone/service/deliverable facts.

Candidate mechanisms:

- goods receipt;
- progress measurement/valuation evidence;
- milestone achievement;
- rate-based service evidence;
- deliverable acceptance;
- material stored/installed evidence.

Economic effect:

- **NONE automatically**;
- effect depends on whether the commercial model treats that evidence as a trigger/input for recognized/certified value.

Critical guard:

physical evidence and commercial recognition are separate concepts.

### E7 — supplier-claim events

Purpose: record what the supplier requests/asserts commercially.

Economic effect:

- supplier claim exposure/request only;
- not buyer assessment;
- not certification;
- not AP posting/liability by itself.

Claim revision/supersession preserves history.

### E8 — buyer-assessment events

Purpose: record buyer-side commercial evaluation of claimed/earned amount before or as part of certification process.

Economic effect:

- assessed amount/position;
- may remain non-final depending on process;
- does not become accounting posting merely because approved internally.

### E9 — certification events

Purpose: make an authoritative product-owned commercial certification effective where P07 domain is active.

Every certified amount must trace to an effective contractual/valuation authority.

Candidate effects may include:

- certified gross value;
- retention withheld/released effect;
- advance recoupment effect;
- contra/recovery effect where included in certification basis;
- tax/net certificate calculations according to later money/tax ADRs.

Certification remains distinct from accounting posting/payment.

### E10 — commercial release events

Purpose: release an existing commercial exposure/hold/security position without rewriting the event that created it.

Candidate examples:

- retention release;
- advance fully recouped/released;
- unused scope-backed reservation release;
- provisional allowance release;
- security/bond-related commercial release where in product scope;
- closeout release of remaining contractual exposure where valid.

### E11 — recovery / deduction / contra events

Purpose: create or change a governed commercial recovery position.

Candidate examples:

- backcharge/contra charge;
- supplier recovery;
- damages/deduction where supported and in product scope;
- cost recovery linked to rectification/replacement.

Guard:

recovery against original supplier is distinct from replacement procurement authorization/cost under CR-02.

### E12 — commercial correction events

Purpose: correct product-owned commercial truth without invisible history rewrite.

Semantic correction families:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical/source reversal;
- reclassification;
- governed supersession.

Exact finalization/reversal/posting model remains ADR-0015.

Closed-period correction must remain expressible without mutating the original certified event.

### E13 — external accounting-interface facts/events

Purpose: represent externally authoritative accounting results/status where needed for product operation/reconciliation.

Examples:

- AP posting reference/status;
- payment reference/status;
- job-cost posting reference/status;
- accounting close/period restriction;
- external rejection/return.

Authority:

normally `MIRROR / REFERENCE / OUT` under frozen P1.4 seam.

These do **not** become product commercial ledger events merely because they are imported.

### E14 — non-economic integration/audit events

Purpose: preserve operational history of synchronization/correction/transport without altering business economics.

Examples:

- sync attempt/success/failure;
- mapping correction;
- stale-source detection;
- reconciliation acknowledgment;
- redaction/tombstone action;
- authority-map cutover.

Economic effect:

`NONE`, unless a separate governed domain action is explicitly triggered.

---

## 5. Candidate derived-position families

Derived positions are computed from authoritative events/facts and never edited independently.

### P1 — requirement/scope positions

Examples:

- authorized requirement quantity/scope;
- allocated active scope;
- remaining authorized scope/capacity;
- reserved-not-called scope where valid;
- called/committed scope;
- released/restored scope where valid.

Not a commercial value ledger.

### P2 — commitment positions

Examples:

- original commitment baseline;
- approved change total by type;
- current approved commitment;
- pending/proposed change exposure, clearly separate from approved commitment;
- instructed/provisional exposure, clearly typed by authority state;
- closed/cancelled/released commitment exposure.

### P3 — fulfilment positions

Examples:

- received quantity;
- accepted deliverable state;
- measured progress;
- milestone achievement;
- economically recognized/eligible value where derivable.

Physical/progress facts must not be conflated with certification/accounting facts.

### P4 — claim/assessment/certification positions

Examples:

- claimed-to-date;
- assessed-to-date;
- certified-to-date;
- uncertified assessed amount;
- rejected/returned claim amount where meaningful.

Each position names its authority layer.

### P5 — retention positions

Examples:

- retention withheld-to-date;
- retention released-to-date;
- retention outstanding.

Derived from terms + qualifying certification/release/correction events.

### P6 — advance positions

Examples:

- advance entitlement/disbursed reference where product knows it;
- commercially recognized advance basis;
- recouped-to-date;
- outstanding recoupment position.

External cash/payment truth remains external where configured.

### P7 — allowance / provisional / minimum positions

Examples:

- provisional-sum allowance original/current/consumed/remaining;
- monetary guaranteed-minimum exposure original/qualified consumption/outstanding;
- scope-backed reserved-not-called position.

These must not fabricate requirement quantity or double-count commitment exposure.

### P8 — recovery positions

Examples:

- recovery/contra asserted;
- approved/effective recovery;
- recovered/certified amount;
- outstanding recovery.

Replacement authorization/cost remains separate.

### P9 — accounting-interface positions

Examples:

- external posted status/value;
- external paid status/value;
- reconciliation difference;
- sync rejected/returned state;
- staleness/conflict state.

These are interface/projection facts, not a duplicate product-owned ledger where accounting is authoritative.

### P10 — forecast/planning positions

Forecasts/targets may be explicit planning inputs or projections but must be typed so they cannot masquerade as commitment/certification/accounting truth.

Exact forecast model remains later work.

---

## 6. Economic component identity — one economic value once

P1.5 must define a semantic identity for the **economic component** being valued/recognized so multiple fulfilment mechanisms cannot create duplicate value.

For every value-contributing path, the model must be able to answer:

- what commercial scope/component is this value about?
- what contractual/valuation basis governs it?
- what value has already been recognized/certified for the same component?
- is the new evidence a transition of the same economic value or a separately earnable component?
- what event makes incremental value legitimate?

Hard invariant candidate:

> The same economic component cannot contribute the same economic value more than once to the same authoritative commercial position unless a governed correction/reversal explicitly removes the prior contribution first.

Examples:

- stored material certified as material value cannot become a second full material-value contribution merely because it is later installed;
- goods receipt and milestone evidence can both exist, but only the contractual valuation grammar determines whether they are separate earnable components;
- supplier claim and buyer certification do not create two earned-value contributions;
- AP posting/payment does not create a second product commercial value event.

Physical key/grain remains P1.5a work.

---

## 7. Original baseline, effective position and history

P1.5 distinguishes:

### original baseline

The commercially effective obligation at formation, immutable as historical meaning.

### effective change history

Governed changes/supersessions/corrections that alter future/current contractual position without rewriting original history.

### current position

A derived projection over effective history.

### pending/proposed position

Potential future effect that is explicitly not yet authoritative current commitment unless the domain has an independent valid authority state such as instructed/provisional work.

No `current_value` field may become independently editable truth if it is derivable from authoritative history.

---

## 8. Position algebra — candidate direction

This is conceptual, not yet the final money/rounding formula.

### current approved commitment

`original effective baseline`
`+ effective approved upward changes`
`- effective approved reductions/releases`
`+/- governed corrections/reclassifications as applicable`

### certified-to-date

sum of effective certification contributions
minus effective certification reversals/corrections
under the governing valuation/currency/rounding rules.

### retention outstanding

retention effects created under effective terms/certifications
minus effective retention releases/corrections.

### advance outstanding

commercially recognized advance basis
minus effective recoupment/release/correction effects.

### recovery outstanding

effective approved recovery basis
minus effective recovered/released/corrected effects.

Exact calculation order, currency/scale/rounding and tax treatment remain ADR-0022/ADR-0010 work.

---

## 9. Pending / approved / effective taxonomy

P1.5 must not use one overloaded `status` to imply economics.

At minimum distinguish semantic axes:

- proposed/requested;
- under review;
- approved as authorization;
- effective as domain/commercial event;
- superseded/reversed/cancelled;
- externally posted/accepted/rejected where external authority applies.

Approval may authorize a bounded domain command; the economic effect occurs only when the owning domain transition/event becomes effective.

This inherits ADR-0018.

---

## 10. Fulfilment versus valuation versus certification

These are distinct layers:

### fulfilment evidence

What was delivered/performed/achieved?

### valuation

What contractual formula/basis maps qualifying scope/performance into commercial value?

### assessment

What does the buyer evaluate as due/earned/acceptable?

### certification

What commercial amount becomes authoritatively certified by the product domain?

### accounting posting/payment

What external accounting/cash event occurs?

A valid architecture must support these being at different times, amounts and authorities.

---

## 11. RequirementAllocation boundary

`RequirementAllocation` remains scope-consumption authority, not value authority.

Candidate rules carried provisionally:

- one lineage connects authorized requirement slice → sourcing → award → later commitment;
- split/merge/reconciliation/conversion are history-preserving and idempotent;
- price/award value may exceed estimate without violating allocation conservation;
- value governance occurs through budget/DOA/commercial rules rather than rewriting allocation scope.

Do not freeze exact quantity/scope mechanics until FT-02/06/10 obligations are reconciled.

---

## 12. Budget / cost attribution boundary

P1.4 freezes that budget/cost master may be product or external authority by deployment profile and transaction attribution binding is product-owned.

P1.5 must still decide under ADR-0011:

- when attribution becomes mandatory;
- what may proceed without final cost coding;
- whether award, commitment, certification or another point is the hard transition;
- how later reclassification preserves history;
- how budget variance/availability controls differ from scope authorization;
- how external job-cost/accounting posting relates to product attribution.

No budget value is allowed to become a second commitment ledger.

---

## 13. Accounting seam

Frozen semantic split:

### product-owned commercial truth when domain activated

- effective commitment/change;
- relevant commercial fulfilment/valuation/assessment/certification/recovery events;
- transaction evidence/match/exception facts needed by product;
- current derived contractual positions.

### externally authoritative where configured

- AP posting/liability;
- payment/cash/bank facts;
- GL journals;
- accounting close;
- job-cost/accounting postings.

### reconciliation

P08 owns authority mapping, transport/reconciliation metadata/evidence, not balances.

ERP rejection does not mutate valid product commercial truth merely to make synchronization pass.

---

## 14. Correction grammar

Before ADR-0015 is decided, P1.5 retains the following distinct correction intents:

1. **non-economic amendment** — fixes descriptive/provenance data without changing economic meaning;
2. **reverse-and-replace** — neutralizes prior effect and introduces corrected effect;
3. **forward adjustment** — preserves prior period/event and books correcting effect later;
4. **physical/source reversal** — reverses a real fulfilment/source fact where legitimately reversible;
5. **reclassification** — changes classification/attribution without pretending the underlying economic event did not occur;
6. **integration correction** — fixes mapping/transport/reconciliation without economic mutation.

Closed-period correction must use a history-preserving mechanism consistent with period/accounting authority.

---

## 15. Money / FX / tax obligations carried into next kernel

This frame intentionally does not settle ADR-0022/0010 yet.

P1.5b must later bind every value event to enough context to reproduce legally/commercially significant amounts, including as applicable:

- transaction/obligation currency;
- amount precision/scale;
- governing FX source/rate/fixing date/version;
- budget/reporting conversion basis;
- tax basis/rate/version;
- rounding policy/version;
- calculation order;
- correction/reversal treatment.

Historical comparison FX/tax basis remains separate from later commitment/certification/accounting conversion basis where they serve different governed purposes.

---

## 16. Lifecycle implications

Every event family promoted later must map to a bounded state transition with:

- pre-state/context;
- command/request;
- guard/invariant;
- authority/approval result consumed;
- effective event;
- economic effect;
- evidence;
- reversibility/supersession;
- concurrency/idempotency rule.

The event family alone does not imply a universal object state machine.

---

## 17. Authority/audit implications

Every economic effect must identify:

- authoritative domain/source;
- tenant/project/ContractingAuthorityContext;
- principal/represented party where applicable;
- bound policy/configuration versions;
- evidence/source revision;
- effective business time and record/audit time semantics later defined under ADR-0019;
- command idempotency/concurrency protection;
- correction lineage.

Agents may propose or invoke permitted bounded commands under future authority rules, but cannot author arbitrary event history/balances.

---

## 18. Second-ledger rejection tests

Reject any P1.5 design where:

- `RequirementAllocation` stores independently edited committed value;
- workflow approval status directly writes a balance;
- evidence metadata becomes financial truth;
- a connector's transformed value becomes authoritative because it was synchronized;
- an ERP mirror is edited locally as co-master;
- claim amount and certified amount are collapsed;
- current commitment/retention/advance balances are manually editable independently of event history;
- receipt/progress/milestone mechanisms double count one economic component;
- agent memory or recommendation becomes authoritative commercial history;
- forecast/planning values silently become actual/committed/certified truth.

---

## 19. A0–A3 compatibility

The frame preserves A0–A3 as a closed sourcing/award subgraph.

A0–A3 may use:

- requirement/scope authority;
- tender/release/bid/comparison facts;
- approval/award facts;
- external handoff.

It does not require E3+ P07 commitment execution, accounting integration, supplier network, advanced AI, WMS, CPM or CDE.

AwardDecision remains non-economic by default until an effective commitment-forming domain event exists.

---

## 20. Ceiling Test implications

This event/position grammar must support without ontology fork:

- multiple legal entities / bounded JV context;
- supplier with multiple country/legal/tax relationships;
- commitment, budget/reporting and accounting currencies differing;
- authority/configuration changes in flight;
- different legal-entity fiscal/period rules;
- contextual supplier status.

No scenario may require a second incompatible commercial ledger.

---

## 21. Open questions / blockers before candidate freeze

### Q1 — ADR-0004 physical commitment composition

Can one semantic Commitment family with typed/composed behaviours support PO/Subcontract/Framework/CallOff without erasing legally distinct behaviour or forcing duplicate invariants?

### Q2 — economic component identity

What minimum semantic identity/grain is required to enforce one-economic-value-once across goods/progress/milestone/service/deliverable mechanisms?

### Q3 — commitment baseline/change grammar

Which changes are true commitment changes versus valuation/measurement effects versus attribution/reclassification?

### Q4 — requirement conservation

How should P1.5 remain structurally capable of FT-02/06/10 without falsely freezing unproven exact mechanics?

### Q5 — certification finalization / correction

What event/finalization semantics satisfy ADR-0015, closed-period correction and redaction/tombstone compatibility?

### Q6 — money/rounding/tax

ADR-0022/0010 remain blockers before legally significant value derivations can freeze.

### Q7 — budget/cost attribution

ADR-0011 remains open on mandatory transition/reclassification.

### Q8 — temporal model

ADR-0019 remains open on physical valid/record-time representation while P1.4 semantic version binding is frozen.

### Q9 — concurrency/idempotency

Which economic transitions require strong single-effect guarantees, sequence allocation or conflict detection under ADR-0023?

---

## 22. Current candidate assessment

The frame is coherent enough to drive the first load-bearing catalogue and structural alternatives, but is **NOT FROZEN**.

Promoted candidate principles:

- one event-backed commercial truth substrate;
- award ≠ commitment;
- terms authority ≠ obligation;
- fulfilment evidence ≠ certification;
- certification ≠ accounting posting/payment;
- original baseline ≠ current derived position;
- claim ≠ assessment ≠ certification;
- RequirementAllocation ≠ value ledger;
- same economic value is recognized once per authoritative commercial position;
- corrections preserve history;
- external accounting facts do not create a product co-master.

All remain subject to cross-track reconstruction, ADR resolution, golden-thread execution and hostile audit before P1.5 freeze.

---

## 23. Immediate next artifact

Create `P1_5_LOAD_BEARING_CATALOGUE_V0_1.md` using this frame plus the frozen P1.4 test.

The catalogue must expose where exact grain/cardinality/event semantics remain OPEN rather than choosing a physical model by convenience.
