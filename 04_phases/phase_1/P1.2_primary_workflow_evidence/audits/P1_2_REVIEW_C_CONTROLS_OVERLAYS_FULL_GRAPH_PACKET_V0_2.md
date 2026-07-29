# P1.2 Review C — Controls, Overlays + Complete Graph Packet v0.2

**Status:** READY FOR EXTERNAL HOSTILE REVIEW C  
**Scope:** P09–P12 + current complete P01–P12 graph/boundaries  
**Prerequisites:** Review A PASS + Review B PASS  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER / NOT FROZEN

## 1. Prior external gates

### Review A — PASS

Sourcing P01–P06 cleared structurally.

Binding outcomes include:
- supplier truth / normalized view / internal evaluation separated;
- evaluated basis ≠ supplier-confirmed contractable basis;
- one RequirementAllocation lineage;
- hard scope conservation separated from value governance;
- DemandLine / PlannedRequirement share an authorized-basis semantic contract while ADR-0003 remains open;
- scope-level uniqueness;
- downward basis reconciliation preserves prior valid authorization until exposure is resolved;
- CR-01 blocks conflicting new allocation consumption and commitment binding during unresolved reduction;
- award ≠ commitment.

### Review B — PASS

P07/P08 commercial core + accounting seam cleared structurally.

Binding outcomes include:
- CommercialTermsAuthority ≠ committed obligation;
- framework call-offs create independent effective obligations;
- scope-backed minimum reserves existing allocation capacity and call-offs draw it down;
- monetary minimum is commercial exposure and does not fabricate physical scope;
- one framework may carry both minimum types;
- scope/quantity basis and valuation basis are orthogonal;
- remeasurable work always has a hard conservation dimension: genuine cap or mandatory scope partition;
- valid scope-adding instruction may itself establish authorized basis expansion without manufacturing supplier-agreed price;
- fulfillment mechanisms are composable rather than PO/Subcontract type switches;
- cross-mechanism value resolves against a common economic base and cannot be earned twice;
- quantity tolerance is pre-authorized, deterministic and versioned;
- P08 accounting authority remains OWN/MIRROR/REFERENCE with explicit reconciliation/error disposition;
- second-ledger check CLEAN;
- Review A regression NO.

Do not re-litigate Review A/B unless P09–P12 or the whole graph introduces a direct contradiction.

---

# 2. P09 — deterministic control plane

## Purpose

Provide reusable authority/control across the domain without creating a programmable BPM product.

Candidate action contract:

`permission`
`+ authority/approval requirement`
`+ compliance/prerequisite state`
`+ current domain invariants`
`→ command allowed`
`→ domain command revalidates load-bearing facts`
`→ domain event`

Task/workflow completion never writes commercial truth directly.

## Candidate reusable primitives

- permission/capability check;
- approval/DOA requirement;
- effective policy/config reference;
- delegation/effective dates;
- compliance gate:
  - informational;
  - warning;
  - overridable block;
  - hard block;
- prerequisite/condition reference;
- explicit override/exception with actor/reason/evidence;
- task/notification/escalation as operational support;
- provenance/audit;
- deterministic derived status/projection.

## Historical reproducibility

For governed decisions/actions preserve enough to reconstruct:
- policy/rule version in force;
- resolved role at time of action;
- actor/approver;
- role-assignment basis/context;
- delegation evidence;
- exception/override;
- load-bearing compliance/prerequisite snapshot or references;
- domain object/event version acted upon.

## Boundary

P09 must not become:
- user-authored arbitrary state-machine language;
- low-code app builder;
- generalized BPM/process designer;
- replacement for domain invariants;
- parallel truth/status ledger;
- requirement that every customer model every internal process before first use.

Default V1 should use bounded built-in procurement/commercial controls with configuration at rule/value/role level, not customer programming.

---

# 3. P10 — long-lead / procurement schedule / expediting overlay

## Purpose

Give procurement one operational timeline from planning through release/delivery without replacing the project master schedule.

## Date semantics

Preserve where applicable:
- required date;
- baseline/planned date;
- forecast date;
- supplier-confirmed date;
- actual event date.

Do not overwrite one date type with another.

## Candidate milestones

Depending on package/commitment:
- procurement need identified;
- scope readiness;
- tender planned/issued;
- bid due/received;
- comparison/recommendation target;
- approval target;
- award target/actual;
- commitment target/actual;
- technical/material approval target/actual;
- manufacturing/fabrication forecast/confirmation;
- dispatch/shipping;
- required delivery;
- forecast delivery;
- actual delivery/acceptance;
- mobilization/start where relevant.

Actual milestones derive from canonical P01–P12 events whenever such event exists.

Forecast/supplier-confirmed milestones remain versioned operational planning truth, not fake actual events.

## Schedule health

May derive from:
- baseline vs forecast delta;
- missing prerequisite;
- overdue action;
- supplier-confirmed slippage;
- tender/DOA/technical-gate delay;
- forecast delivery after required date;
- unresolved high-risk dependency.

## Boundary

P10 must not become:
- CPM engine;
- Primavera replacement;
- resource-loaded project schedule;
- full logistics/TMS system;
- separate manual status ledger duplicating domain events.

Master-schedule dates can be REFERENCE/MIRROR inputs.

ADR-0007 remains open on whether long-lead identity is a durable object, planning record, or projection over existing entities/events.

---

# 4. P11 — commercial closeout / security / warranty

## Purpose

Prevent a false single `CLOSED` state when physical work is done but commercial/security/warranty obligations remain open.

## Distinctions

Keep separate where applicable:
- procurement/scope fulfillment;
- final goods acceptance;
- final subcontract/service certification;
- final account agreement;
- pending changes/disputes/claims context;
- retention outstanding/released;
- advance outstanding/fully recouped;
- framework reservation/minimum settlement where applicable;
- bond/guarantee/security validity;
- security expiry vs formal release/discharge;
- warranty/DLP active/expired/closed;
- invoice/payment/accounting closeout;
- commercial archival/closure.

A commitment may be operationally complete while commercially open.

## Release evidence

Retention/security release should preserve:
- obligation/contract basis;
- amount/instrument or reference;
- prerequisite conditions;
- approval/authority;
- release/expiry/discharge evidence;
- actor/time;
- residual obligations.

## Boundary

P11 must not become:
- bank-guarantee issuance platform;
- legal claims suite;
- insurance administration system;
- general warranty-service CRM;
- duplicate payable/payment ledger.

It owns/derives only procurement/commercial obligation, evidence and gates to the depth required by the wedge.

---

# 5. P12 — external technical/material approval dependency interface

## Purpose

Represent consultant/client/engineer/material approvals that constrain procurement without building a full CDE/submittal product.

Binding distinction:

`Commercial approval ≠ Technical/material approval`

A commercially selected vendor/product may still be blocked by external technical approval.

## Candidate dependency semantics

Preserve only what procurement needs:
- affected requirement/package/tender/award/commitment/scope;
- external approval type;
- submitted item/product/document revision;
- source/reference ID;
- external reviewing authority;
- submission date;
- referenced current state;
- decision evidence:
  - approved;
  - rejected;
  - approved with comments/conditions;
  - revise/resubmit;
- decision revision/basis;
- validity/expiry where relevant;
- downstream action(s) gated;
- external CDE/system identity/reference if authoritative elsewhere.

## Possible gates

Technical approval may condition:
- bidder/product eligibility;
- award effectiveness;
- commitment issue/release;
- manufacturing/fabrication release;
- ordering of a specific material/equal;
- delivery acceptance/use.

Gate placement is project/customer/contract dependent and remains primary-evidence territory.

## Boundary

P12 must not require:
- full drawing/submittal register ownership;
- markup/review engine;
- document transmittal platform;
- CDE replacement;
- consultant collaboration suite.

The procurement OS may own only dependency/reference/gate semantics.

---

# 6. Current complete provisional P01–P12 graph

## A. Need / authorization

`Project + Budget/Cost Structure`
`→ {DemandLine | PlannedRequirement}`
`→ AuthorizedRequirementBasis`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`

RequirementAllocation conserves authorized physical/business procurement scope.

## B. Market sourcing

`→ contextual vendor qualification/eligibility`
`→ TenderEvent`
`→ immutable TenderRelease + Addenda`
`→ TenderParticipant / bounded external access`
`→ intent / decline / non-response`
`→ immutable BidSubmission revisions`

## C. Evaluation / award

`→ source-linked normalization`
`→ internal EvaluationAdjustment`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase / DOA`
`→ AwardDecision`

## D. Commercial terms / obligation

Possible route:

`CommercialTermsAuthority → call-off/release/order`

or direct award/direct-source obligation route.

Effective obligation:

`Award/authority`
`+ supplier-agreed basis or applicable terms authority`
`+ backed RequirementAllocation`
`+ formation evidence`
`→ effective immutable original obligation baseline`

Framework minimum semantics:
- scope-backed reservation is on same allocation lineage;
- call-off draws reservation down;
- monetary minimum remains derived commercial exposure;
- both may coexist.

## E. Change / instruction / valuation basis

`effective baseline`
`→ controlled effective changes`

For legitimate instructed-unagreed work:

`AuthorizedWorkInstruction`
`→ basis expansion only when scope expands`
`→ named valuation authority`
`→ provisional/interim certification where contract permits`
`→ later supplier-agreed reconciliation`

Scope/quantity basis:
- FIRM_QUANTITY;
- REMEASURABLE_QUANTITY;
- NON_QUANTIFIED_SCOPE.

Valuation basis examples:
- FIRM_LUMP_SUM;
- UNIT_RATE_REMEASUREMENT;
- PROVISIONAL_SUM_ALLOWANCE;
- DAYWORK;
- MILESTONE;
- RATE_BASED_SERVICE.

## F. Fulfillment / earned value

Fulfillment mechanisms are composable at appropriate scope/economic-component grain:
- GOODS_RECEIPT;
- PROGRESS_VALUATION;
- MILESTONE_CERTIFICATION;
- RATE_BASED_SERVICE;
- DELIVERABLE_ACCEPTANCE.

Goods facts preserve:
`delivery ≠ receipt ≠ acceptance ≠ return`

Commercial progress preserves:
`supplier claim ≠ buyer assessment ≠ certification`

Every value-contributing mechanism resolves against a common economic base.

One economic component cannot be earned twice.

## G. Commercial positions

Derived/event-backed layers may include:
- original effective obligation;
- effective approved changes;
- current approved commitment;
- instructed/unagreed exposure;
- pending change exposure;
- accepted goods;
- certified gross;
- retention;
- advance/recoupment;
- provisional-sum allowance remaining;
- framework reserved-not-called;
- monetary-minimum exposure;
- remaining scope/exposure.

No editable competing current-balance ledger.

## H. Accounting coexistence

Per load-bearing field/event:
- OWN;
- MIRROR;
- REFERENCE.

Integration:
`domain event → export/send → external accept/post | reject/fail → reconcile/stale/mismatch`

Error disposition separates:
- DATA_DEFECT;
- TRANSPORT_OR_MAPPING_DEFECT;
- TEMPORAL_RESTRICTION;
- EXTERNAL_AUTHORITY_RETURN.

AP/payment/job-cost may remain external authority.

## I. Closeout

`final physical/commercial performance`
`→ final certification/account where applicable`
`→ retention/security/advance/minimum-settlement obligations`
`→ warranty/DLP obligations`
`→ accounting/interface closure`
`→ final commercial closure only when required obligations resolve`

## J. Cross-cutting overlays

P09 controls allowed commands but never substitutes for domain truth.

P10 projects procurement schedule/expediting state from planning inputs + canonical events.

P12 references/gates external technical approvals without owning full CDE truth.

---

# 7. Minimum non-collapsible distinctions

Preserve semantic distinctions even if physical objects later collapse:

1. requirement authorization ≠ package;
2. package ≠ supplier-facing tender release;
3. release ≠ supplier bid;
4. supplier bid ≠ normalized representation;
5. normalized representation ≠ buyer evaluation adjustment;
6. evaluated basis ≠ supplier-confirmed contractable basis;
7. recommendation ≠ approval ≠ award;
8. award ≠ effective obligation;
9. terms/rate authority ≠ scope-consuming obligation;
10. scope-backed reservation ≠ fresh call-off consumption;
11. monetary minimum ≠ physical procurement scope;
12. original obligation ≠ current approved commitment;
13. pending change ≠ effective contractual change;
14. work instruction authority ≠ supplier-agreed final price;
15. scope authorization ≠ budget/value variance;
16. firm quantity ≠ estimated remeasurable quantity;
17. quantity/scope basis ≠ valuation basis;
18. delivery ≠ receipt ≠ acceptance;
19. receipt ≠ invoice ≠ payment;
20. supplier claim ≠ buyer assessment ≠ certification;
21. certification ≠ payment;
22. retention ≠ unearned scope;
23. advance ≠ earned value;
24. commercial approval ≠ technical approval;
25. planned/forecast/supplier-confirmed date ≠ actual event date;
26. workflow/task completion ≠ domain transition;
27. accounting acceptance/posting ≠ commercial authorization;
28. security expiry ≠ release/discharge;
29. operational completion ≠ final commercial/accounting closeout.

Reviewer may collapse implementation objects where these truths remain reproducible.

---

# 8. Whole-graph gravity / burden attack

Only **one independent XL gravity well** is intended:

**P07 contractual/commercial truth.**

FAIL if the architecture requires another independent XL system:
- P08 full accounting ERP/GL/AP/cash;
- P09 generalized BPM/low-code platform;
- P10 CPM/Primavera/master scheduling;
- P11 banking/claims/insurance/warranty platform;
- P12 CDE/submittal platform;
- supplier full identity/portal platform;
- full inventory/warehouse/WMS;
- generalized contract-law engine.

A supporting primitive is acceptable only when bounded to procurement/commercial invariants and reusable without becoming its own product universe.

---

# 9. First-live-tender adoption attack

The long-term architecture is broad, but first adoption must not require broad implementation.

A coherent first surface must be possible around:

`requirement/package`
`→ bidders`
`→ tender release`
`→ supplier bid ingestion`
`→ normalization / comparison`
`→ recommendation / approval`
`→ award`

with stable interfaces/placeholders to downstream commitment/accounting/technical/schedule domains.

Before first live tender, the platform must **not** require:
- P07 full valuation/certification stack;
- ERP integration;
- P09 customer-authored workflow programming;
- master-schedule integration;
- CDE integration;
- security/warranty administration;
- framework/minimum support unless the live case needs it.

Manual/offline evidence/reference interfaces are allowed where provenance survives.

FAIL if downstream modules/configuration are prerequisites for a narrow sourcing pilot.

---

# 10. Missing-core-process attack

Do not add P13 merely because a feature exists.

A missing core process exists only when a required construction procurement/commercial lifecycle cannot be represented by P01–P12 or a bounded external interface/projection.

Challenge especially:
- vendor onboarding/qualification;
- sourcing/tendering;
- award/DOA;
- framework/call-off;
- commitment formation/change;
- instructed work;
- goods receipt;
- progress/milestone valuation;
- retention/advance/provisional sums;
- accounting coexistence;
- long-lead tracking;
- technical approvals;
- commercial closeout.

Candidate areas that should normally remain interfaces/projections rather than new core processes unless evidence proves otherwise:
- project document management/CDE;
- project master scheduling;
- inventory/warehouse;
- AP/GL/cash;
- payroll;
- owner revenue contracts;
- generalized legal claims;
- banking guarantee issuance;
- general supplier CRM;
- analytics/reporting;
- AI assistance.

---

# 11. Object-inflation attack

P01–P12 names are semantic hypotheses, not tables/services.

Prefer event/value/projection/state when durable identity is unnecessary.

Durable identity is justified only where required by one or more:
- immutable/versioned source evidence;
- legal/commercial history;
- independent lifecycle;
- external reference/integration identity;
- concurrency/idempotency;
- authority/audit/provenance;
- stable cross-process target identity.

Attack specifically whether these need durable aggregates or can collapse:
- compliance evaluations;
- bidder-selection stages;
- schedule milestone records;
- technical approval dependency;
- closeout obligations;
- reconciliation exceptions;
- work instructions;
- framework reservations;
- commercial projections.

Do not collapse truth distinctions merely to reduce table count.

---

# 12. Research anchoring / reversibility attack

P01–P12 remain **falsifiable candidate decomposition**.

Independent primary capture must remain blind to our vocabulary:
1. capture contractor terminology/actions/artifacts/statuses verbatim;
2. capture source-of-truth/workaround/duplicate reconciliation;
3. record unmatched observations and contradictions;
4. only then map to candidate model.

Higher-authority evidence wins.

FAIL any design choice that makes primary evidence practically unable to overturn:
- structural root;
- PO/Subcontract/Framework physical model;
- workflow generality;
- accounting authority;
- long-lead object model;
- external identity/access;
- event/status shape.

---

# 13. Open ADR check

The current provisional model must not silently resolve:
- ADR-0003 structural root;
- ADR-0004 PO/Subcontract/Framework/CallOff physical model;
- ADR-0005 accounting/commercial ownership;
- ADR-0007 long-lead model;
- ADR-0008 workflow generality;
- ADR-0010 GCC semantics/localization;
- ADR-0011 budget authority/timing;
- ADR-0012 external identity/access;
- ADR-0013 event-derived status;
- ADR-0014 provenance depth;
- ADR-0015 posting/finalization/correction physical model;
- ADR-0018 workflow-financial seam;
- ADR-0019 effective dating;
- ADR-0020 config binding;
- ADR-0021 integration authority/staleness;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal semantics.

Review B established a **hard dependency** on deterministic rounding policy for tolerance, but did not resolve ADR-0022 implementation architecture.

---

# 14. Primary evidence gate remains mandatory

Even if Review C passes, P1.2 does not close until primary workflow/artifact requirements are met.

Current closure requirements include:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 case outside founder prior pattern;
- at least 1 original contractor bid-leveling/comparison artifact decomposed;
- supplier-side friction evidence;
- variants/workarounds/contradictions/unmatched observations;
- primary corroboration/contradiction status against candidate architecture.

High-value blind evidence should test:
- starting demand/planning root;
- package/tender/revision practice;
- bid-leveling truth;
- award/DOA;
- framework/call-offs;
- PO/subcontract formation;
- changes/instructions/remeasurement;
- GRN/receipt;
- progress/milestone certification;
- retention/advance/provisional sums;
- ERP/accounting authority;
- long-lead tracking;
- technical/material approval;
- closeout/security/warranty;
- correction of approved/posted mistakes.

Secondary reference cannot substitute for this gate.

---

# 15. Reviewer output contract

Return only:

## BLOCKERS

For each:
- exact area/seam;
- why structural;
- minimum correction.

Do not fail exact UI, naming, customer thresholds or unresolved physical persistence unless the current provisional model has already made a harmful irreversible assumption.

## DELETE / COLLAPSE

Identify semantic candidates that should be:
- deleted;
- merged;
- event;
- value object;
- projection;
- state;

provided truth/audit invariants survive.

## SECOND-XL CHECK

Choose exactly one:

`CLEAN — only P07 is an XL gravity well`

or

`FAIL — identify the second XL subsystem and minimum reduction`

## MISSING-CORE-PROCESS CHECK

Choose exactly one:

`NONE — current P01–P12 coverage is complete enough`

or

`MISSING — exact required lifecycle absent and why interface/projection cannot cover it`

## FIRST-LIVE-TENDER CHECK

Choose exactly one:

`CLEAN — architecture supports a coherent narrow sourcing surface without downstream implementation`

or

`FAIL — exact downstream dependency that makes narrow launch impossible`

## REVIEW A/B REGRESSION?

`NO`

or exact sourcing/commercial invariant contradicted by the whole-graph/control design.

## ADR ANCHORING CHECK

List any open ADR already decided in practice despite being labeled open.

## PRIMARY-EVIDENCE REVERSIBILITY

Choose:

`CLEAN — blind primary evidence can still overturn provisional architecture`

or

`FAIL — exact provisional decision that has become practically irreversible`

## P1.1 REOPEN?

`NO` or exact frozen assumption requiring reopening.

## VERDICT

Choose exactly one:

`PASS — P09–P12/full graph coherent; proceed to primary challenge + later structural architecture`

or

`FAIL — remediate blocker(s) before primary challenge/structural architecture`

Be hostile. Reward fewer primitives, real-world usability, clean truth ownership, narrow adoption and reversibility — not feature breadth.
