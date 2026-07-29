# P1.2 — Review C Critique Remediation v0.1

**Status:** BL-09 REMEDIATED / REVIEW C NARROW RECHECK REQUIRED / NOT FROZEN  
**Prior external verdict:** `FAIL — remediate blocker(s) before primary challenge/structural architecture`  
**Scope:** P07/P09–P12 + complete P01–P12 graph. Review A/B PASS remain binding.

## 1. Independent disposition

| Finding | Disposition | Current decision |
|---|---|---|
| BL-09 buyer-side entitlement/recovery missing | ACCEPT | Add a bounded buyer-entitlement/recovery event family under P07/P11 without P13. |
| Compliance evaluation object | ACCEPT COLLAPSE | Evaluation = event/evidence + derived current state unless later evidence proves independent lifecycle. |
| Bidder-selection staged objects | ACCEPT COLLAPSE | Selection/eligibility/invitation facts live on `TenderParticipant` aggregate/event history. |
| ReconciliationException durable aggregate | ACCEPT COLLAPSE WITH NUANCE | Exception is a projection/work item over integration events; persisted task/case may exist operationally but is not authoritative truth. |
| Schedule milestone ambiguity | ACCEPT | Separate versioned planning/forecast record from actual milestone projection over domain events. |
| P09 task/notification truth dependency | ACCEPT | Tasks/notifications/escalations are outside truth graph; no invariant may depend on their existence/status. |
| P09 overridable-vs-hard gate must never be configurable | PARTIAL PUSHBACK | Gate classes are fixed/bounded; override capability may be configured only within the allowed semantics of a named gate class. Customers cannot turn a hard domain invariant into an overridable gate. |
| P10 forecasts must never be computed | PARTIAL PUSHBACK | No recursive dependency/CPM propagation. Simple deterministic local derivations from explicit lead time/known prerequisite may be allowed as derived forecasts if provenance/formula is visible; they cannot become master-schedule logic. |
| P11 claims context reference-only | ACCEPT | Claims/dispute substance stays external/reference; recovery family stops at contractual entitlement, quantification, application/settlement evidence. |
| Six ADRs substantially decided | ACCEPT AS PROVISIONAL DIRECTION, NOT FINAL CLOSE | Record load-bearing provisional direction + exact remaining question + falsifier. Primary evidence may still overturn. |
| Falsification target list | ACCEPT | Publish before primary capture. |
| Pilot external-fulfilled disposition | ACCEPT | Award-only pilot must expose explicit external-fulfilled/released disposition so allocation does not remain artificially consumed forever. |

No P1.1 reopening is proposed.

---

## 2. BL-09 — buyer entitlement / recovery truth

The prior graph modeled supplier-side obligation and earned/payable value rigorously but lacked an equivalent bounded mechanism for buyer-side contractual entitlements.

### 2.1 Non-collapsible distinction

Add binding distinction:

`Buyer entitlement / recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

A buyer entitlement does not automatically mean the supplier agreed to reduce contract price.

A recovery applied to payable does not mean previously certified earned work was never earned.

### 2.2 BuyerEntitlement / Recovery semantic family

Introduce a semantic event family, not necessarily a new aggregate hierarchy.

Candidate entitlement bases include:
- liquidated damages / delay damages where contractually enforceable;
- backcharge / contra-charge;
- defect/rectification recovery;
- replacement-completion cost recovery after default/termination;
- security/bond/guarantee call proceeds where attributable;
- other evidenced contractual buyer recovery.

Each entitlement event preserves at minimum:
- affected commitment/counterparty;
- contractual/legal basis reference;
- trigger event/fact;
- scope/economic component affected where relevant;
- quantification method/basis;
- amount/currency/tax treatment where relevant;
- authority/actor/time;
- evidence/provenance;
- disputed/contested state;
- relationship to supplier response/acceptance where any;
- application/settlement method;
- accounting authority/reference where external;
- correction/reversal lineage.

### 2.3 Earned value and contract-price truth

Buyer recovery is separate from:
- original effective baseline;
- effective supplier-agreed contract change;
- gross certified earned value.

Conceptually:

`Gross certified earned value`
`− retention withheld`
`− advance recoupment`
`− effective applied buyer recoveries/deductions under contractual authority`
`± other governed payable adjustments`
`→ payable basis before accounting-specific treatment`

The equation is illustrative, not universal calculation law. ADR-0022 still owns ordering/tax/rounding policy.

### 2.4 Recovery lifecycle

Candidate semantic progression:

`potential entitlement / trigger identified`
`→ quantified/recommended entitlement`
`→ governed decision / contractual assertion`
`→ disputed | accepted | adjudicated/otherwise effective under contract/policy`
`→ applied against payable | separately receivable/settled | security proceeds`
`→ corrected/reversed/closed`

Not every organization needs every stage. The mandatory truth distinction is basis/trigger/quantification/authority/dispute/application.

### 2.5 Cross-commitment recovery

Where recovery arises because another supplier performs or rectifies the defaulting supplier's scope:
- preserve source/defaulting commitment;
- preserve replacement/rectifying commitment or cost evidence;
- preserve quantified allocation of recoverable amount;
- do not mutate the replacement commitment into a negative cost merely to net the defaulting supplier.

This is a cross-commitment reference, not a second cost ledger.

### 2.6 Security calls

P11 must distinguish:

`security validity / expiry / release ≠ security call / realized recovery`

A security call may create recovery proceeds/receivable/accounting facts under configured authority, while the procurement OS preserves the contractual trigger, instrument reference, claim/call evidence, amount and linkage to the affected commitment.

P11 remains bounded: no bank messaging/issuance platform and no general legal-claims suite.

---

## 3. P09 bounded control plane — strengthened boundary

### 3.1 Truth isolation

Task/notification/escalation is operational support only.

Binding invariant:

> no domain invariant, commercial balance, authority result, or legal/commercial state may depend on whether an operational task exists, is open, complete, overdue or deleted.

Task state may surface work needed because of domain state; it cannot create domain truth.

### 3.2 Gate classes

P09 uses a fixed bounded catalogue of semantic gate classes such as:
- informational;
- warning;
- overridable policy block;
- non-overridable domain/legal/compliance hard block.

**Pushback on literal reviewer cure:** customer configurability is not banned categorically.

Allowed:
- configure thresholds, roles, effective dates, evidence requirements;
- choose override behavior only where the named built-in gate class explicitly permits override.

Not allowed:
- customer converts a hard domain invariant into an overridable rule;
- arbitrary expression language/state-machine authoring;
- arbitrary customer-defined gate semantics that mutate financial/domain truth.

This keeps configurability bounded without requiring all customers to share identical policy severity.

### 3.3 Compliance evaluation collapse

Default physical posture:
- immutable `ComplianceEvaluation` event/evidence snapshot;
- current qualification/compliance state = derived projection;
- no separately editable compliance-status ledger.

Independent durable aggregate is allowed only if later primary evidence proves an independent review/version lifecycle requiring it.

---

## 4. P10 schedule/forecast boundary

### 4.1 Separate planning record from actual milestone

Do not use one generic `ScheduleMilestone` record to represent both.

**Planning/forecast fact:** versioned dated record with source/provenance, for example required/baseline/forecast/supplier-confirmed date.

**Actual milestone:** domain event or projection from canonical event history.

### 4.2 No CPM/master scheduling

P10 must not recursively propagate forecast dates through arbitrary dependency graphs, calculate critical path, resource-load, or become a master project schedule.

Allowed bounded derivation:
- local deterministic forecast derived from one explicit source fact + configured lead time/rule;
- must expose formula/source/version;
- may be overridden by later supplier-confirmed/forecast record under provenance.

Example allowed:
`confirmed fabrication complete date + explicit transit lead time → derived delivery forecast`

Example rejected:
`dependency network → recalculate all downstream package dates / float / critical path`

Health indicators may evaluate missing prerequisites/slippage, but do not become scheduling-network propagation.

---

## 5. P11 claims/recovery boundary

`pending change/dispute/claim context` remains reference/evidence only.

The product may track:
- linked claim/dispute reference;
- status/source system;
- whether it blocks closeout/recovery/application;
- entitlement/recovery facts already established by contractual/governed process.

It must not own:
- pleadings/correspondence strategy;
- legal-position drafting/history as a legal case system;
- adjudication/litigation workflow;
- general claims valuation outside the bounded recovery event family.

Buyer recovery stops at contractual entitlement + quantification + authority + dispute status + application/settlement evidence.

---

## 6. Other object-collapse decisions

### TenderParticipant

Eligibility/selection/invitation progression remains facts/events/state at `(TenderEvent × Vendor)` grain. No staged bidder-selection object family.

### Integration reconciliation

`ReconciliationException` is not commercial/accounting truth.

Canonical truth remains integration/domain events + authority mappings + observed mismatches.

Current exception/status is derived.

An operational remediation case/task may be persisted for assignment/SLA/evidence, but:
- it is outside financial truth;
- closing the case cannot mark mismatch resolved unless authoritative reconciliation event/fact exists.

### Framework reservation

Remains state on RequirementAllocation lineage, not a separate balance/entity family.

### Technical approval / closeout / work instruction

Retain durable identity provisionally because they may carry independent external identity, legal/history, revision and cross-process targeting.

---

## 7. First-live-tender boundary

A first live sourcing pilot may terminate at `AwardDecision` without implementing P07–P12.

To avoid permanently consumed allocation in an award-only deployment, expose an explicit governed terminal/disposition option for downstream fulfillment outside the product, such as:
- `EXTERNALLY_FULFILLED / HANDOFF_CONFIRMED`;
- `RELEASED_WITHOUT_INTERNAL_COMMITMENT` where appropriate;
- later migration/reconciliation to internal commitment when downstream module is enabled.

This disposition preserves award evidence and releases/closes the relevant remaining allocation under governed policy; it must never fabricate an internal commitment.

### Defaultable upstream burden

For simple quantitative pilot demand:
- nominal quantity required;
- default tolerance = zero unless configured;
- default deterministic rounding policy may be system-provided;
- simple cost attribution may use governed unresolved/external-reference exception where allowed.

Pilot customer does not configure a rounding architecture to source 200 doors.

---

## 8. ADR status correction — provisional direction register

Do **not** falsely mark these ADRs finally closed in P1.2 secondary-reference work.

Instead label their current posture:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

### ADR-0003 — structural root

Provisional direction already load-bearing:
- every sourcing route requires effective requirement authority before allocation/award;
- semantic `AuthorizedRequirementBasis` contract unifies DemandLine/PlannedRequirement behavior.

Still open:
- physical entity/root hierarchy;
- whether owner types collapse;
- navigation/tenancy structure.

Primary falsifier example:
- independent workflows routinely create valid awards/commitments with no identifiable prior requirement authority and do not reconstruct one later.

### ADR-0013 — event-derived status

Provisional direction:
- financial/commercial/status projections derive from canonical events/evidence;
- no independently edited competing status/balance.

Still open:
- which projections are persisted/materialized;
- event/state hybrid implementation.

### ADR-0014 — provenance depth

Provisional direction:
- load-bearing commercial/governance events preserve actor/time/authority/evidence/source/version sufficient for historical reconstruction.

Still open:
- exact field/document hash/redaction/storage depth per event class.

### ADR-0021 — integration authority/staleness

Provisional direction:
- per-field/event `OWN / MIRROR / REFERENCE` authority;
- explicit integration disposition/reconciliation.

Still open:
- deployment-specific authority matrix;
- staleness thresholds;
- connector mechanics.

### ADR-0019 — effective dating

Provisional direction:
- load-bearing policies/bases/delegations/authority mappings are effective-dated/version-bound.

Still open:
- temporal storage/query architecture and migration/cutover implementation.

### ADR-0008 — workflow generality

Provisional V1 direction:
- bounded built-in controls + configuration at roles/values/thresholds/evidence/rules permitted by named gate classes;
- no arbitrary customer-authored BPM/state machine.

Still open:
- exact configuration grammar and extension boundary after V1 evidence.

ADR-0022 remains open but now has binding deterministic-rounding dependency where hard conservation uses tolerance/conversion.

---

## 9. Falsification target list — required before primary capture

Primary interviews/artifacts remain blind capture first. These targets are used **after verbatim capture** to test whether the model survives.

### FT-01 — universal pre-sourcing requirement authority

Current claim:
Every sourcing route can be reconciled to effective authorized requirement scope before award/commitment.

Falsifier:
Repeated independent cases show legitimate procurement/award routinely proceeds with no prior requirement authority and the organization does not later reconcile to one.

### FT-02 — allocation before commitment

Current claim:
A committed scope binds existing authorized allocation rather than creating scope authority itself.

Falsifier:
Primary systems/processes treat commitment itself as the first and only authoritative scope allocation with no upstream conservation concept, and this does not create duplicate/uncontrolled procurement in practice.

### FT-03 — award is distinct from commitment

Current claim:
Internal award/selection approval is not itself authoritative contractual committed cost.

Falsifier:
Across independent contractors the formal award action itself legally/operationally creates the obligation with no separate formation/effectiveness distinction.

### FT-04 — claim / assessment / certification distinction

Current claim:
Supplier claim, buyer/QS assessment and certification are separately reconstructable truths where progress valuation exists.

Falsifier:
Independent contractor workflows consistently collapse these into one authoritative artifact/state without losing dispute/audit/economic meaning.

### FT-05 — fulfillment composability

Current claim:
Receipt/progress/milestone/deliverable mechanisms are composable by economic component and not fixed by PO-vs-subcontract type.

Falsifier:
Primary evidence shows commitment type determines one mutually exclusive fulfillment mechanism with no material mixed cases.

### FT-06 — remeasurement conservation

Current claim:
Remeasurable scope still conserves against explicit scope partition/cap while estimated quantity may vary.

Falsifier:
Primary workflows legitimately allow measured growth without any identifiable bounded scope partition/cap/change authority.

### FT-07 — buyer recovery separation

Current claim:
LD/backcharge/defect/termination recovery is distinct from supplier-agreed contract change and gross earned certification.

Falsifier:
Independent contract/process evidence demonstrates these recoveries are universally and correctly represented as contract-value changes or certification reductions with no loss of legal/economic truth.

### FT-08 — accounting coexistence

Current claim:
Procurement/commercial truth can remain deterministic while AP/payment/job-cost may remain external authority via field/event mapping.

Falsifier:
Independent deployments require accounting ownership inside the product for the commercial graph to remain coherent or operable.

Failure of a target forces model/ADR reconsideration. Review A/B/C PASS does not immunize any target from primary contradiction.

---

## 10. Non-collapsible distinction added by BL-09

Add to whole-graph invariant list:

`buyer entitlement/recovery ≠ effective commitment change ≠ reduction of gross certified earned value`

Also preserve:
- security expiry/release ≠ security call/recovery;
- recovery application ≠ cash settlement/payment posting.

---

## 11. Whole-graph status after remediation

- No P13 process added.
- P07 remains the only intended XL gravity well.
- P09/P10/P11/P12 boundaries are strengthened.
- Review A sourcing PASS remains intact.
- Review B commercial-core PASS remains intact.
- Buyer recovery reuses existing authority/evidence/correction/accounting primitives and adds only a bounded entitlement/recovery relation/event family.

**Review C remains OPEN pending narrow external recheck.**
