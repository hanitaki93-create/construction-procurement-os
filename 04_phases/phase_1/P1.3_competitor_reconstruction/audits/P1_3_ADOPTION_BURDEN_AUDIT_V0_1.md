# P1.3 — Adoption Burden Audit v0.1

**Status:** INTERNAL AUDIT COMPLETE
**Constraint:** P1.1 requires standard configuration to first live tender in **<= 5 working days from clean inputs**, with **0 bespoke named connectors** required before first live tender.

## Verdict

`PASS WITH ACTIVATION BOUNDARY — the inherited architecture can support narrow adoption only if deep downstream capabilities remain deferred and the first sourcing rail has strong defaults.`

The largest commercial risk is not missing functionality. It is forcing enterprise-grade setup before the user experiences sourcing/comparison value.

---

# 1. Activation levels

## A0 — Workspace bootstrap: required before any real transaction

Minimum:
- Tenant/Company identity;
- applicable Legal Entity / contracting posture at the minimum grain required for the transaction;
- Project;
- internal user identities;
- basic role/permission assignment;
- currency/timezone/locale defaults;
- deterministic default rounding policy;
- minimal project cost/reference structure or governed temporary attribution where the deployment permits it.

Not required:
- ERP connector;
- CDE connector;
- master schedule integration;
- full vendor qualification programme;
- custom BPM/workflow design;
- commercial valuation setup.

## A1 — First RFQ/tender: wedge-required

Required:
- Demand/MR or PlannedRequirement entry;
- RequirementAllocation generated/reconciled behind the user-facing flow;
- optional ProcurementPackage;
- Vendor/contact minimum identity;
- TenderEvent + Release;
- invited participants;
- due date / response instructions;
- source documents/evidence;
- secure low-friction external access or governed email/manual capture;
- basic response/comparison schema where helpful.

Defaults should make this possible without exposing the underlying allocation ontology to ordinary users.

Not required:
- persistent supplier portal account;
- deep qualification unless the package/policy demands it;
- accounting integration;
- technical/CDE integration;
- long-lead schedule integration;
- PO/subcontract implementation.

## A2 — First comparison: wedge-required

Required:
- immutable BidSubmission/revision evidence;
- normalization/mapping;
- package-specific ComparisonSchema;
- missing/excluded/alternate/bundled/additional/unresolved states;
- EvaluationAdjustment with provenance;
- technical/commercial distinction;
- frozen ComparisonSnapshot.

AI extraction/mapping may assist later, but deterministic manual operation must be possible first.

## A3 — First governed award: wedge-required for the full first monetization rail

Required:
- AwardRecommendation;
- justification structure, including non-lowest/sole-source/split outcome where applicable;
- ApprovalCase using a bounded policy preset or configured DOA;
- AwardDecision;
- externally fulfilled/handoff disposition when downstream commitment remains outside the product.

The pilot may legitimately stop here.

## A4 — Internal commitment/commercial execution: architecture-ready, deferred from first sourcing value

Capabilities:
- PO/subcontract/framework/call-off formation;
- effective baseline;
- controlled changes/instructions;
- receipt/acceptance/returns;
- progress valuation/certification;
- retention/advance/recovery;
- closeout/security/warranty;
- P08 accounting reconciliation.

These are load-bearing architecture seams, but they must not be mandatory setup for first tender/comparison/award.

## A5 — Enterprise/portfolio overlays: later activation

Examples:
- deep supplier qualification/performance programme;
- live procurement schedule/long-lead portfolio view;
- CDE/material-approval integration;
- ERP/API integrations;
- advanced analytics;
- external supplier network/discovery;
- advanced AI automation.

---

# 2. Borrowed competitor pattern -> burden decision

| Pattern | Source archetype | Activation decision |
|---|---|---|
| field/simple request | Kojo | A1, but simple UI over deterministic substrate |
| procurement package | ProcurePro/Procore | A1 only when useful; optional |
| structured bid form | Procore/BuildingConnected | A1 optional/preferred, never only quote channel |
| guest/email supplier access | ProcurePro/Procore/Aconex/Coupa | A1 required capability |
| supplier lifecycle/qualification | Ariba/TradeTapp/CMiC | A5 unless package policy requires a minimal A1 gate |
| bid leveling | Procore/BuildingConnected/ProcurePro | A2 core |
| deep posting/finalization | CMiC/Vista/Unifier | architecture seam now; A4 operational surface |
| accounting ownership | CMiC/Vista | REJECT as prerequisite; P08 interface/authority |
| full CDE | Aconex | INTERFACE-ONLY; not A1 prerequisite |
| general BPM | Unifier | REJECT; bounded gates only |
| subcontract payment rail | Textura | INTERFACE-ONLY/deferred |
| procurement schedule | ProcurePro | A5 overlay; actuals derive from A1-A4 events |
| supplier network | BuildingConnected/Ariba/Coupa | optional later; not A1 dependency |
| AI extraction/leveling | newer incumbent direction | later accelerator; never first deterministic dependency |

---

# 3. First-live-tender setup test

A standard deployment should be able to reach a real tender without configuring the entire architecture.

## Minimum setup sequence

1. company/legal entity/project;
2. users + one bounded approval preset;
3. import or enter vendor/contact minimums;
4. load requirement/package scope and documents;
5. issue tender through guest/email task access.

The architecture fails the P1.1 adoption constraint if first tender requires any of:
- ERP/CDE/master-schedule connector;
- full cost-code migration;
- all vendors completing persistent registration;
- full P07 valuation/receipt/change setup;
- customer-designed workflow state machine;
- complex integration mapping;
- comprehensive historical data migration.

---

# 4. Defaultability rules

Defaults are allowed only where they do not weaken truth.

Safe examples:
- zero quantity tolerance unless explicitly configured;
- deterministic system rounding preset;
- simple project currency/tax posture subject to deployment configuration;
- default tender-response statuses;
- fixed product-level approval gate classes;
- simple comparison schema generated from buyer requirement lines;
- no portal account required for external supplier task access.

Not safe to default away:
- legal entity/counterparty identity where obligation meaning depends on it;
- source-document provenance;
- supplier vs buyer economic truth layers;
- authorization for hard scope expansion;
- authority/approval where policy requires it.

---

# 5. Commercial burden kill conditions

Treat the following as future product kill/reshape signals rather than architecture problems to hide:

1. real users cannot issue first tender inside the <=5-working-day standard-setup target;
2. comparison requires more data preparation than current Excel/manual practice without compensating value;
3. suppliers refuse the participation channel and buyer-on-behalf capture becomes the normal path rather than an exception;
4. customers require ERP/CDE/schedule integration before they obtain procurement value;
5. every deployment requires bespoke workflow/configuration consulting;
6. the first paid value appears only after P07/A4 commercial implementation rather than A1-A3 sourcing value.

---

# 6. P1.4/P1.5 forward obligations

The next structural stages must make A0-A3 independently deployable while preserving seams for A4-A5.

Specifically:
- tenancy/legal-entity ownership must be rigorous but setup-light;
- external access must not require full supplier identity lifecycle;
- approval configuration needs useful product presets;
- comparison must work without ERP/CDE;
- downstream handoff must be a valid terminal state for early deployments;
- deferred modules may not become hidden database/schema prerequisites that force user configuration before first tender.

# Final verdict

`PASS — the best-of-each architecture can remain commercially deployable, but only with a hard activation boundary: A0-A3 first value, A4 commercial execution later, A5 enterprise overlays optional.`
