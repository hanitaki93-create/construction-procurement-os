# P1.5 — Integrated Commercial Core Candidate v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL FREEZE CANDIDATE / HOSTILE AUDIT REQUIRED  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

## 1. Purpose and precedence

This document consolidates the current P1.5 Commercial Core candidate after interlocked work across:

- P1.5a entities/master data;
- P1.5b commercial event/balance/money/correction semantics;
- P1.5c lifecycle/state transitions;
- P1.5d authority/approval/audit/concurrency.

Inputs:

- `P1_5_WORKPLAN_V0_1.md`
- `P1_5_COMMERCIAL_EVENT_BALANCE_FRAME_V0_1.md`
- `P1_5_LOAD_BEARING_CATALOGUE_V0_1.md`
- `P1_5_STRUCTURAL_ROOT_COMMITMENT_ALTERNATIVES_V0_1.md`
- `P1_5_COMMITMENT_ECONOMIC_KERNEL_V0_1.md`
- `P1_5_MONEY_CORRECTION_TEMPORAL_KERNEL_V0_1.md`
- `P1_5_AUTHORITY_LIFECYCLE_CONCURRENCY_KERNEL_V0_1.md`
- frozen P1.4 boundary contract and accepted ADRs.

This is one coherent candidate to attack. Earlier P1.5 working artifacts remain reasoning history but do not override this candidate where wording differs.

No database schema, language/framework, API payload or product code is selected.

---

# 2. Candidate Commercial Core thesis

The V1 deterministic Commercial Core is a **polycentric graph of bounded business identities and events** around one product-owned P07 commercial truth substrate.

It is not:

- package-rooted;
- RequirementAllocation-rooted;
- one universal ProcurementCase;
- one generic workflow state machine;
- one generic Commitment lifecycle;
- a full accounting ledger;
- a document/CDE system;
- a supplier network.

Core authority path:

`authorized requirement source`
`→ RequirementAllocation lineage`
`→ optional package`
`→ sourcing transaction`
`→ AwardDecision`
`→ [external handoff OR effective Commitment]`
`→ change / fulfilment / claim / assessment / certification / release / recovery`
`→ derived commercial positions`
`→ external accounting reconciliation where configured`

---

# 3. Structural candidate

## C01 — no universal procurement root

V1 uses a **polycentric procurement graph**.

- `DemandLine` and `PlannedRequirement` are authorized requirement-source families.
- `RequirementAllocation` is the mandatory scope-consumption authority lineage where scope authority is required.
- `ProcurementPackage` is optional grouping/planning context.
- `TenderEvent` owns tender sourcing context.
- `AwardDecision` owns buyer selection.
- `Commitment` owns effective supplier obligation when P07 is activated.
- End-to-end navigation/reporting is a graph/projection concern, not a new universal truth object.

## C02 — award is not commitment

AwardDecision has no ordinary committed-cost effect by default.

Effective supplier obligation begins only through a governed commitment-formation transition or a separately explicit contractual obligation event.

## C03 — one semantic Commitment core, bounded behaviour composition

An effective supplier obligation has one semantic `Commitment` identity and common commercial core.

Shared core:

- tenant/project/ContractingAuthorityContext;
- counterparty relationship/registration context;
- formation/effectiveness evidence;
- immutable original baseline;
- requirement-allocation binding where scope-backed;
- terms-authority reference where applicable;
- monetary/valuation context;
- change/correction history;
- economic-component refs;
- closure/end semantics;
- authority/audit/concurrency invariants.

Kind-specific behaviour is composed through bounded capability profiles rather than a universal lifecycle or independent per-kind commercial engines.

Candidate kinds include PO, subcontract, call-off/release and service/other commitment where evidenced.

## C04 — terms authority separate from ordinary obligation

`CommercialTermsAuthority` may own reusable rates, formulas, terms, validity and call-off rules without creating ordinary committed cost.

Each effective call-off/release/order binds the exact terms-authority version.

If a terms/framework arrangement itself creates enforceable minimum monetary exposure, the exposure must be explicit and cannot be hidden inside non-economic terms metadata.

Exact guaranteed-minimum physical representation remains a candidate-detail watch.

## C05 — economic component identity

Every authoritative value contribution resolves to the minimum contractual **economic component** needed to conserve economic recognition.

The component may reuse an existing commitment line/SOV/milestone/deliverable/service-unit identity when sufficient.

A separate durable EconomicComponent object is not mandatory by default.

Hard invariant:

> the same underlying economic value cannot contribute twice to the same authoritative commercial position unless a governed reversal/correction removes or reclassifies the prior contribution first.

---

# 4. Candidate semantic identity dictionary

`Durable` means independent identity/history is semantically required; physical table/aggregate is not implied.

| Identity / concept | Candidate form | Why identity matters | Authority / note |
|---|---|---|---|
| Tenant | Durable | isolation/config/security boundary | frozen P1.4 OWN |
| LegalEntity | Durable/master | legal/fiscal/accounting/contract context | deployment-profiled master facts |
| ContractingAuthorityContext | Durable/versioned context | exact contracting authority incl bounded multi-party case | frozen P1.4 OWN |
| Project | Durable/master | primary operating scope | OWN/MIRROR/REFERENCE profile |
| SupplierRelationship | Durable tenant-private relation | selectable counterparty context | OWN tenant-private |
| Supplier registration/context | Durable/versioned where used | legal/tax/country relationship | authority by source profile |
| DemandLine | Durable requirement source where used | authorized need origin | candidate P01 |
| PlannedRequirement | Durable requirement source where used | early authorized procurement origin | candidate P01 |
| RequirementAllocation lineage | Durable authority lineage | prevents duplicate authorized scope consumption | OWN; exact mechanics still falsifiable |
| ProcurementPackage | Durable only where business grouping persists | optional grouping/planning | OWN; not root |
| TenderEvent | Durable transaction | sourcing context/lifecycle | OWN |
| TenderRelease revision | Immutable issued evidence identity | supplier-facing basis | OWN transaction evidence |
| TenderParticipant | Durable relation or bounded lifecycle record | tender×supplier facts/access | OWN |
| BidSubmission revision | Immutable supplier-source revision | supplier commercial truth | OWN integrity; supplier source principal |
| ComparisonSchema version | Versioned config | governs comparison grammar | OWN |
| ComparisonSnapshot | Immutable decision-basis identity | freezes evaluated basis | OWN |
| AwardRecommendation | Durable decision proposal where needed | preserves evaluated + contractable basis | OWN |
| ApprovalCase | Durable control context | policy/outcomes/tasks/authority history | OWN control, not domain truth |
| AwardDecision | Durable decision | approved buyer selection | OWN; not commitment |
| CommercialTermsAuthority | Durable only when reusable terms independently matter | rates/formulas/call-off rule lineage | OWN P07 when activated |
| Commitment | Durable obligation lineage | baseline/change/value/closeout truth | OWN P07 |
| Economic component | Semantic identity, physical reuse preferred | one-economic-value-once | within Commitment |
| Claim revision | Durable supplier-source revision | claimed position/evidence | OWN integrity; supplier source |
| Assessment | Durable event/result where load-bearing | buyer assessed position | OWN |
| Certification | Durable immutable/effective event lineage | certified commercial truth | OWN |
| Receipt/fulfilment event | Durable event | accepted/rejected/returned fulfilment | OWN |
| Change/instruction event | Durable event/lineage | obligation/scope/provisional authority change | OWN |
| Recovery/release event | Durable event | changes recovery/held/exposure position | OWN |
| EvidenceReference | Durable evidence identity where load-bearing | source/version/location/provenance | frozen ADR-0014 |
| Domain command/audit identity | Durable action identity | authority/idempotency/audit | OWN substrate |
| External accounting reference/mirror | Reference/versioned external fact | reconciliation/read path | MIRROR/REFERENCE/OUT |
| Current balances/status | Projection | reproducible current position | never independent writer |

Object-collapse remains required: a semantic identity may be implemented as event/value/version inside an owning aggregate if independent durable identity is unnecessary.

---

# 5. Commercial event family candidate

Semantic event families:

1. requirement/scope authority events;
2. terms-authority effectiveness/revision;
3. award-selection events — non-economic by default;
4. commitment formation;
5. commitment change;
6. authorized instruction/provisional authority;
7. fulfilment/acceptance events;
8. supplier claim revisions;
9. buyer assessment;
10. certification;
11. retention/advance/allowance/release effects;
12. recovery/contra effects;
13. commercial correction/reclassification;
14. closeout/end events;
15. external accounting interface facts/events;
16. non-economic integration/audit/redaction/authority-transfer events.

Event type identity/version evolution must be additive/non-silent.

---

# 6. Canonical balance / position algebra

All positions below are derived. Exact monetary rounding/calculation policy is bound separately.

## B01 — authorized requirement remaining

Conceptually:

`current authorized requirement basis`
`- active consumed/reserved allocation lineage`
`+ valid releases/restorations`

Exact FT-02/06/10 mechanics remain falsifiable.

## B02 — current approved commitment

`original effective commitment baseline`
`+ effective approved obligation increases`
`- effective approved reductions/releases`
`+/- effective economic corrections/reclassifications according to type`

Pending proposal is excluded unless an independent effective instruction/provisional authority creates separately typed exposure.

## B03 — certified gross to date

Sum of effective gross certification contributions by economic component under their bound valuation/calculation policies, net of effective reversals/corrections of those contributions.

Claim and assessment values are excluded.

## B04 — retention outstanding

`effective retention withholding contributions`
`- effective retention releases`
`+/- retention corrections`

Retention does not reduce gross earned/certified work semantics.

## B05 — advance outstanding

`commercially recognized advance basis/disbursement fact where applicable`
`- effective recoupment`
`- releases`
`+/- corrections`

Cash/payment remains external where configured.

## B06 — allowance/provisional remaining

`current effective allowance/minimum basis`
`- qualifying effective consumption`
`- release/reduction`
`+/- correction`

Scope-backed and monetary-minimum cases stay distinct.

## B07 — recovery outstanding

`effective approved recovery basis`
`- effective recovered/released amount`
`+/- correction`

Replacement procurement cost/authority remains distinct.

## B08 — external posted/paid position

External authoritative MIRROR/REFERENCE result where configured.

It does not replace B02/B03 commercial truth.

## B09 — reconciliation difference

Explicit comparison between relevant product-owned commercial position and external authoritative accounting fact, with authority/freshness/disposition context.

Not an independently editable financial balance.

---

# 7. Monetary candidate

## M01 — exact decimal semantics

Authoritative commercial money uses exact decimal arithmetic with explicit currency.

Binary floating point is forbidden.

## M02 — calculation policy

Every load-bearing compound calculation binds a versioned bounded `MonetaryCalculationPolicy` defining:

- currency roles/quantum;
- calculation precision;
- rounding mode/boundaries;
- ordered product-defined calculation stages;
- FX basis hooks;
- tax basis hooks;
- rounding-difference treatment;
- correction/reversal rule.

No arbitrary tenant-authored formula language.

## M03 — currency roles

Contract/commitment, budget, reporting and accounting-posting currencies are distinct roles.

Original-currency authoritative value is preserved.

## M04 — purpose-specific FX

Comparison FX, contractual conversion, reporting conversion and accounting FX may have different authorities.

Each load-bearing use binds its source/rate/fixing date/version rather than live lookup.

## M05 — tax/regional policy boundary

Core calculation architecture exposes bounded deterministic policy slots for tax/retention/advance/security/certification semantics that may vary by jurisdiction/contract.

Specific GCC/UAE defaults or legal claims require authoritative evidence; no rule is invented here.

This is the candidate ADR-0010 architectural answer: **regional semantics are first-class deterministic policy dimensions where they affect commercial meaning, not late presentation localization and not a forked GCC ontology.**

---

# 8. Cost attribution candidate — ADR-0011

Sourcing must not be blocked by requiring final accounting/job-cost coding too early.

Candidate V1 rule:

1. P01–P06 may operate with project/budget context and a controlled attribution state appropriate to the deployment.
2. Before **Commitment effectiveness**, each commitment must bind an explicit product commercial cost-attribution identity/profile sufficient for internal commercial control.
3. That binding may be:
   - final cost code/package/work breakdown; or
   - an explicitly configured controlled suspense/unallocated/holding attribution where the deployment permits it.
4. A null/unknown attribution is not equivalent to a governed suspense attribution.
5. Reclassification later is history-preserving and does not recreate commitment value.
6. Before certification/accounting handoff, deployment policy may require more specific/final external accounting mapping.
7. External job-cost/GL master remains external authority where configured; product owns the historical transaction attribution binding it used.

This preserves early sourcing and eventual financial attribution without pretending detailed accounting coding is universally known at requisition time.

Candidate status: `ACCEPTED_P15_CANDIDATE`, not frozen.

---

# 9. Correction/finality candidate

Economically effective/finalized history is never corrected by in-place economic mutation.

Bounded correction intents:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical/source reversal;
- reclassification;
- integration-only correction.

True reversal neutralizes original contribution under original monetary semantics.

Forward adjustment is a new-period effect under its governing policy.

Closed-period constraints choose permitted correction method; they do not justify history rewrite.

Redaction/tombstoning is separate from economic correction and cannot change monetary meaning.

---

# 10. Temporal candidate

Use a hybrid semantic temporal model:

### Domain/economic events

- immutable event identity;
- immutable recorded/audit time;
- business-effective time/period where material;
- correction/supersession lineage.

### Load-bearing mutable master/configuration

- immutable version identity;
- effective/valid applicability;
- recorded/audit creation time;
- explicit migration/supersession.

### External data

- source ID/version;
- external effective time where available;
- observed/fetched time;
- freshness/conflict state.

Historical interpretation uses bound versions, not current lookup.

Backdating/migration is a governed action.

Universal bitemporal tables are not mandated.

---

# 11. Workflow/configuration candidate

## W01 — bounded shared control primitives

V1 shared control vocabulary may include:

- sequential/parallel approvals;
- threshold/DOA routing;
- delegation;
- bounded typed conditions;
- return/request-info;
- task/ball-in-court;
- expiry/escalation;
- compliance/technical prerequisite;
- explicitly authorized override where domain policy allows it.

Domain command owns final transition/effect.

## W02 — constrained typed configuration

V1 supports versioned typed configuration for bounded dimensions such as:

- DOA;
- role/permission assignment;
- legal/project mappings;
- contextual eligibility profiles;
- numbering;
- monetary policies;
- authority mappings;
- cost-attribution gates;
- commitment capability profiles.

No arbitrary scripts, formula language, custom event types, custom state machines or generic policy engine.

---

# 12. Lifecycle candidate

P1.5 rejects one overloaded universal `status`.

Each SPINE transaction separates as applicable:

- identity lifecycle;
- business-effectiveness axis;
- domain-specific operational state;
- approval/control state;
- external/integration state;
- derived status projections.

## Commitment effectiveness axis

- pre-effective — no obligation;
- effective/open — obligation exists;
- ended — ordinary performance/expansion ended, with explicit end reason.

End reason may distinguish completed/closed, cancelled, terminated, expired, superseded/replaced as supported.

Correction/release/recovery/audit commands may remain reachable after ordinary close where domain rules permit.

## Change/instruction axis

Proposed/negotiated, authorized instruction/provisional effect where separately valid, approved/agreed effective change, rejected/withdrawn/superseded/corrected.

Instruction authority and final commercial agreement are separate axes where necessary.

## Claim/assessment/certification

Supplier claim, buyer assessment, certification, and accounting state each keep independent lifecycle/authority.

---

# 13. Domain transition skeleton

Every transition must eventually have exact guard/authority/economic/event/reversibility. v0.1 skeleton:

| Transition | Primary guard families | Authority/control | Economic effect | Event/result | Correction/reversibility |
|---|---|---|---|---|---|
| Establish/Revise requirement basis | valid source authority/evidence | domain authority/policy | SCOPE | requirement-basis event/version | governed change; no rewrite |
| Split/Merge/Reconcile allocation | conservation/current lineage | P01 domain action | SCOPE | allocation lineage event | history preserving; FT debt |
| Issue tender release/addendum | valid sourcing scope/content | P03 permission/control | NONE | immutable release revision | supersession only |
| Accept bid revision | valid participant/source provenance | supplier/external grant or buyer-on-behalf provenance | NONE | BidSubmission revision | new revision, no edit |
| Freeze comparison | valid source mappings/evaluation policy | buyer control | NONE | ComparisonSnapshot | new snapshot if reevaluated |
| Make AwardDecision effective | valid recommendation/contractable basis/DOA | P06 domain command | NONE | AwardDecision | reject/supersede/re-tender history |
| Make Commitment effective | valid allocation/counterparty/terms/DOA/evidence | P07 domain command | OBLIGATION | CommitmentBecameEffective | later change/correction/end |
| Make instruction effective | issuer authority/scope/contract rule | P07 domain command | SCOPE/provisional authority | instruction event | supersede/reconcile |
| Make commitment change effective | scope/value/DOA/current-version guards | P07 domain command | OBLIGATION +/- | CommitmentChanged | correction/change history |
| Record goods receipt/return | commitment/component/qty/tolerance | P07 fulfilment command | FULFILMENT | receipt/return event | physical reversal where real |
| Submit claim revision | valid commitment/period/source | supplier provenance | CLAIM only | claim revision | supersede/withdraw where valid |
| Make assessment effective | valuation/evidence/prior state | buyer authority | ASSESSMENT | assessment event | correction/supersession |
| Make certification effective | valuation basis/evidence/caps/DOA/money/period/current version | P07 certification command | CERTIFICATION | certification event | governed correction only |
| Release retention/security | release condition/outstanding position | domain authority | RELEASE | release event | correction if error |
| Make recovery effective | valid basis/evidence/authority | domain authority | RECOVERY | recovery event | correction/release |
| Reclassify attribution | valid target mapping/policy | domain/accounting boundary control | NONE total / classification | reclassification event | later reclassification |
| Correct commercial event | classified error/period/authority | bounded correction command | depends type | correction/reversal/adjustment | correction of correction allowed via new history |
| Close/end commitment | completion/disposition/outstanding obligations | domain authority | closure/release as defined | end event + reason | post-close correction/release reachable |

---

# 14. Authority and command candidate

Every load-bearing state change follows:

`request`
`→ current principal/security`
`→ bound policy/config`
`→ workflow/approval outcome where required`
`→ domain invariant revalidation`
`→ concurrency/idempotency check`
`→ atomic domain event/effect`
`→ audit/evidence`
`→ projections/integration notifications`

External grants never satisfy internal authorization.

Agents use the same bounded commands.

---

# 15. Concurrency/idempotency candidate

High-risk commands require:

- stable command/idempotency identity;
- current expected state/version or equivalent causal precondition;
- atomic invariant + event effect at required business boundary;
- multi-identity conservation protection where allocation/components are affected;
- exactly one successful economic effect for one logical command;
- deterministic retry result.

Physical locking/transaction strategy is later implementation.

---

# 16. Numbering candidate

- immutable internal identity separate from display number;
- versioned numbering policy by supported scope;
- number allocation at defined issue/effectiveness/finalization milestone;
- idempotent retry returns same logical number;
- allocated historical number not silently reused;
- gapless numbering not universal default; only verified policy where required;
- fiscal/effective-date rule explicit;
- backdated number allocation governed.

---

# 17. ADR candidate reconciliation

No status changes in this candidate. Proposed promotion directions:

## ADR-0003

Polycentric procurement graph; RequirementAllocation authority backbone, not universal root.

## ADR-0004

One semantic Commitment core + bounded composed capability profiles; terms authority separate from ordinary commitment.

## ADR-0008

Bounded shared control primitives; domain transitions remain domain-owned.

## ADR-0009

Constrained typed/versioned configuration; no generalized no-code rules engine.

## ADR-0010

Core commercial semantics expose regional/contract-sensitive deterministic policy dimensions from inception; GCC/UAE semantics are policy/profile inputs, not late UI localization and not a separate regional ontology. Specific defaults/legal requirements remain evidence-driven.

## ADR-0011

Effective Commitment requires explicit controlled product cost attribution, allowing a governed suspense/unallocated bucket where deployment permits; sourcing may precede final accounting coding; later reclassification is history-preserving.

## ADR-0015

History-preserving bounded correction taxonomy; no in-place economic mutation.

## ADR-0019

Hybrid event effective/recorded time + versioned effective load-bearing config/master; no universal bitemporal mandate.

## ADR-0022

Exact decimal money + explicit currency + versioned deterministic MonetaryCalculationPolicy.

## ADR-0023

Separate internal identity/display numbering + bounded numbering policy + idempotent version/conservation-safe commands.

ADR-0006 connector depth remains open and non-blocking for Commercial Core meaning.

---

# 18. Evidence debt retained

The candidate does not promote these to proven universal mechanics:

- FT-02 RequirementAllocation exact mechanics;
- FT-06 remeasurement conservation;
- FT-09 / CR-02 rectification/replacement capacity;
- FT-10 exclusive-scope authority;
- exact regional/GCC tax/retention/security/certification defaults under ADR-0010;
- exact legal/gapless numbering requirements.

Where the product needs a deterministic rule despite practice variability, the rule must be explicitly classified as product policy/configuration rather than “contractor reality.”

---

# 19. GT-1 — standard subcontract full P1.5 pass

Path:

`requirement`
→ allocation
→ optional package
→ tender/release/bid
→ comparison
→ recommendation/approval
→ AwardDecision
→ subcontract-kind Commitment effective
→ baseline/economic components
→ claim
→ assessment
→ certification
→ retention/advance
→ instruction/change
→ later certification
→ final account/release/close

Result:

- no universal package/root required;
- award/commitment distinction preserved;
- claim/assessment/certification separation preserved;
- change/correction history preserved;
- one-economic-value-once enforceable through component identity;
- accounting remains external seam;
- no second ledger.

**GT-1: PASS candidate with no architecture invention.**

---

# 20. GT-2 — imported long-lead equipment full P1.5 pass

Path:

`PlannedRequirement`
→ allocation
→ tender/award
→ PO-kind Commitment
→ advance/security terms refs
→ technical/submittal dependency
→ manufacture/shipment milestones
→ delivery/receipt/return
→ match/accounting interface
→ recovery/replacement if defect

Result:

- planned root supported;
- goods capability does not need subcontract SOV;
- technical approval remains interface-only;
- payment/job-cost external authority possible;
- CR-02 separation of replacement authority/recovery preserved.

**GT-2: PASS candidate with no architecture invention.**

---

# 21. GT-3 — progress claim/certification full P1.5 pass

Path:

Commitment/component
→ claim revision
→ measurement/fulfilment evidence
→ assessment
→ bound MonetaryCalculationPolicy
→ certification approval/domain command
→ certification event
→ retention/advance/recovery/tax components
→ external AP posting
→ payment later
→ closed-period correction if required

Result:

- exact monetary policy reproducible;
- no claim/certification collapse;
- certification/accounting split preserved;
- correction/period semantics available;
- current projections event-backed.

**GT-3: PASS candidate structurally.**

Regional policy examples remain evidence debt, not architecture invention.

---

# 22. GT-4 — variation chain full P1.5 pass

Path:

existing Commitment
→ instruction request
→ issuer authority
→ effective instruction
→ scope-basis expansion if genuinely authorized new scope
→ provisional valuation authority where contract permits
→ progress/certification
→ supplier agreement
→ effective Commitment change
→ reconcile prior provisional history
→ current projections

Result:

- scope authorization/value agreement remain distinct;
- provisional valuation is explicit;
- later agreement does not rewrite prior history;
- idempotent/effective-time model handles late agreement.

**GT-4: PASS candidate.**

---

# 23. P1.5 Ceiling Test — full candidate run

## CT-1 Multi-entity / JV

Same core works with ContractingAuthorityContext identifying one legal entity or bounded multi-party arrangement.

Commitment/event authority and cost/fiscal policies bind exact context.

No duplicate ledger/ontology.

**PASS.**

## CT-2 Cross-country vendor relationship

Tenant-private supplier relationship can hold multiple legal/tax registration contexts.

Tender/award/Commitment binds the exact counterparty context used.

No need to duplicate supplier commercial history globally.

**PASS.**

## CT-3 Multi-currency commercial chain

Commitment currency, budget/reporting currency and external accounting currency are distinct roles with purpose-specific FX.

Same commercial event algebra works.

**PASS.**

## CT-4 Authority change in flight

Case/event retains bound policy version; live security is checked for new action; controlled migration/re-evaluation exists.

**PASS.**

## CT-5 Different legal-entity fiscal semantics

Period/numbering/monetary policies bind by context; no new event ontology/ledger.

**PASS.**

## CT-6 Contextual vendor status

Supplier identity/relationship is stable while eligibility result is context-specific.

No duplicate vendor required for status alone.

**PASS.**

### Ceiling Test candidate verdict

**PASS — all six scenarios fit the same core abstractions without second ledger, duplicate truth or ontology rewrite.**

Hostile audit still required before gate is final.

---

# 24. P1.5 Closed Sub-graph Gate — full candidate run

## A0–A3 sourcing/award slice

Contains:

- requirement source;
- allocation authority;
- optional package;
- supplier relationship/eligibility;
- tender/release;
- bid revisions;
- comparison;
- recommendation/approval;
- AwardDecision;
- external handoff.

Dependencies:

- P07: not required;
- ERP/CDE connector: not required;
- supplier network/account: not required;
- advanced AI: not required;
- CPM/WMS/general BPM: not required.

Lifecycle reaches valid terminal AwardDecision/handoff.

**PASS.**

## Goods commitment slice

Can implement Commitment + quantity goods capability + receipt/return + external accounting interface without progress-certification subsystem.

Shared money/change/correction contracts remain substrate.

**PASS candidate.**

## Subcontract certification slice

Can implement Commitment + progress valuation + claim/assessment/certification + retention/advance + external AP interface without WMS/CDE/CPM/full ERP.

**PASS candidate.**

## Future capability additivity

Adding milestone/service/deliverable capability introduces new typed events/components without rewriting prior event meaning.

Projection versioning handles derivation evolution.

**PASS.**

## Deferred workbenches

Omitting UI/workbench depth does not remove deterministic identities/invariants/provenance/commands.

**PASS.**

### Closed Sub-graph candidate verdict

**PASS — the focused first build can bottom out inside explicit domain/interface contracts without implementing the full future platform.**

Hostile audit still required before gate is final.

---

# 25. Audit/history/redaction compatibility

Candidate satisfies the roadmap invariant:

- immutable event/record identity;
- economic meaning not silently rewritten;
- correction lineage explicit;
- referential integrity preserved semantically;
- redaction/tombstone actions are separate governed history;
- payload disposition cannot erase economic effect;
- post-close corrections/releases remain reachable;
- missing historical provenance is never fabricated.

**Candidate PASS.**

---

# 26. Projection reproducibility

Every load-bearing current position must be able to identify:

- source event families;
- component scope;
- inclusion/exclusion conditions;
- effective applicability;
- calculation/derivation policy version;
- correction/reversal treatment;
- currency/FX/tax/rounding basis where relevant;
- external freshness cut-off where relevant.

New event types/formulas require explicit versioned derivation evolution.

**Candidate PASS.**

---

# 27. One-XL / second-ledger audit

The integrated candidate keeps:

- RequirementAllocation = scope authority only;
- P08 = integration/reconciliation metadata only;
- P09/workflow = control only;
- evidence/audit = provenance only;
- P10 = planning/expediting projection;
- P11 = bounded closeout/security/warranty obligations;
- P12 = technical dependency seam;
- accounting mirror = external authority;
- AI/agent memory = no business truth.

Commercial obligation/change/valuation/certification/recovery remains in P07.

**SECOND XL: CLEAN.**

---

# 28. Object-explosion audit

Candidate avoids assuming every semantic noun is a top-level aggregate.

Promote durable independent identity only where at least one applies:

- independent lifecycle;
- independent external/business reference;
- independent concurrency/authority boundary;
- immutable revision lineage;
- many-to-many relationship requiring stable reference;
- historical reconstruction cannot rely safely on parent-local value only.

Otherwise use event/value/version/projection inside an owning identity.

Specific decisions remain P1.5a implementation architecture, but this rule prevents the P1.2 vocabulary from becoming dozens of unnecessary aggregates.

**Candidate CLEAN.**

---

# 29. Remaining non-blocking design debt

These require later detail but do not currently change truth ownership:

- exact physical aggregate boundaries;
- exact SQL/event-store/storage pattern;
- API payloads;
- command transport;
- lock/transaction mechanism;
- concrete V1 calculation profile set;
- concrete numbering formats;
- connector implementation;
- UI state labels;
- report/query physical models;
- agent/tool implementation.

---

# 30. Potential blockers for hostile audit

The internal hostile audit must attack at least:

1. guaranteed-minimum terms authority versus Commitment boundary;
2. economic-component identity becoming a hidden generic ontology;
3. controlled suspense cost attribution becoming permanent uncoded truth;
4. MonetaryCalculationPolicy becoming an arbitrary formula engine;
5. regional policy slots deferring an actually core GCC semantic;
6. hybrid temporal model failing “known-at” reconstruction;
7. correction modes creating duplicate/ambiguous current position;
8. display numbering policy conflicting with effective/backdated date;
9. bounded workflow configuration secretly becoming BPM;
10. capability composition allowing nonsensical commercial combinations;
11. claim/assessment/certification object explosion;
12. multi-allocation/multi-award/multi-commitment conservation under FT debt;
13. closed commitment still needing correction/recovery/release;
14. external accounting mirror becoming effective co-master in reports;
15. A0–A3 dependency leakage from shared commercial substrate;
16. Ceiling Test scenarios actually requiring hidden country/entity forks.

---

# 31. Candidate overall verdict

`READY FOR INTERNAL HOSTILE P1.5 AUDIT — NOT FROZEN.`

The candidate currently satisfies:

- coherent four-track model;
- canonical event-backed commercial positions;
- SPINE transition skeleton;
- GT-1–GT-4 on paper with no architecture invention;
- Ceiling Test candidate PASS;
- Closed Sub-graph candidate PASS;
- audit/redaction compatibility candidate PASS;
- projection reproducibility candidate PASS;
- second XL clean;
- A0–A3 clean.

No ADR status changes have been made by this candidate.

---

# 32. Next action

Run `P1_5_INTERNAL_HOSTILE_AUDIT_V0_1.md` against this integrated candidate and all frozen upstream constraints.

Do not promote ADRs or unlock P1.6 before internal remediation/recheck and external Claude hostile audit both PASS.
