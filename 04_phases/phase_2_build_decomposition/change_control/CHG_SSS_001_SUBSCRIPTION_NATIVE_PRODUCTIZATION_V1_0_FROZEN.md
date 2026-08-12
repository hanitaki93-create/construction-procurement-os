# CHG-SSS-001 — Subscription-Native Productization & Evidence-Gate Amendment v1.0

**Date:** 2026-08-08  
**Status:** FROZEN CONTROLLED AMENDMENT  
**Change ID:** `CHG-SSS-001`  
**Applies to:** frozen Phase 1 semantics and frozen Phase 2 build program through an explicit prospective overlay  
**B01 disposition:** `VALID UNCHANGED`  
**Second XL:** `CLEAN — P07 REMAINS SOLE INDEPENDENT XL`  
**Commercial claim:** NONE — architecture/product-strategy coherence is not PMF, willingness-to-pay proof, production certification or security perfection

---

# 1. Purpose

Construction Procurement OS shall support a direct self-service/product-led path in which a qualified customer can:

`signup`
`→ establish tenant/company context`
`→ create/import project`
`→ create/import procurement requirement/sourcing context`
`→ issue RFQ`
`→ receive supplier participation`
`→ capture/revise quotations`
`→ normalize/compare`
`→ recommend/approve`
`→ establish AwardDecision`
`→ export/handoff`

without requiring:

- bespoke implementation;
- consultant-led onboarding;
- named ERP/CDE integration;
- mandatory migration project;
- persistent supplier account;
- custom source-code fork;
- advanced AI.

This amendment changes productization, commercialization substrate, UI sequencing and validation order. It does **not** replace the frozen deterministic procurement/commercial architecture.

---

# 2. Evidence and audit history

The amendment was developed after a subscription-native competitor reconstruction spanning construction procurement, construction SaaS, generic procurement SaaS, AI workflow wedges, supplier-participation patterns and Enterprise bridges.

The evidence supports the feasibility of:

- meaningful self-service construction workflows;
- direct checkout/free-trial entry coexisting with sales-assisted Enterprise;
- free invited-supplier participation;
- deeper governance/integration/security as paid expansion;
- provider/model-neutral AI with variable future commercial packaging;
- a small frictionless first-value door feeding a deeper governed system.

The evidence does **not** establish CPOS product-market fit.

Independent hostile audit history:

- Round 1: `PASS WITH BLOCKERS`; BL-SSS-01 through BL-SSS-05 identified.
- Round 2: BL-SSS-01 through BL-SSS-05 closed; BL-SSS-06 identified.
- Round 3: BL-SSS-06 closed; BL-SSS-07 validation-label collision identified; W3-01 through W3-04 identified.
- Round 4: BL-SSS-07 and W3-01 through W3-04 closed; one narrow enumeration defect BL-SSS-08 identified.
- BL-SSS-08 is closed in this frozen record by making SSV-1 apply to B10, B11 and B12 as well as the earlier human-facing blocks, with an extensible-never-reducible rule.

No fifth independent audit is required for the exact BL-SSS-08 one-sentence closure. The Round-4 auditor explicitly stated that on closure of that enumeration, B02 may proceed after CHG freeze, B01 final acceptance and explicit owner authorization.

---

# 3. Precedence and change discipline

This file is the controlling consolidated form of CHG-SSS-001.

It does not silently edit or reinterpret historical frozen artifacts.

Where an earlier artifact conflicts with this amendment on a prospective self-service matter explicitly changed here, this CHG controls prospectively and the historical wording remains reconstructable according to its original meaning.

Unchanged frozen contracts remain controlling for every semantic not expressly amended here.

Any future change to a load-bearing rule in this file requires normal controlled change, exact blast-radius analysis and the existing hostile-review discipline.

---

# 4. Frozen semantics preserved

The following remain unchanged:

- deterministic A0–A3 with AI disabled;
- deterministic A0–A3 with named connectors disabled;
- no mandatory persistent supplier account/network;
- tenant-private supplier relationships;
- tenant != legal entity;
- internal business authority != external task grant;
- RequirementAllocation conservation and lineage;
- optional ProcurementPackage rather than universal package root;
- supplier source truth != normalized representation;
- normalized representation != buyer EvaluationAdjustment;
- buyer adjustment != supplier-confirmed contractable basis;
- Recommendation != approval;
- approval != AwardDecision;
- AwardDecision != Commitment;
- one authoritative writer/source per load-bearing fact and effective period;
- immutable/historical correction rather than overwrite;
- exact evidence/version/source/location;
- communication observation != domain effect;
- bounded QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- idempotency, continuation and EFFECT_INDETERMINATE semantics;
- timeout/absence never proves no effect;
- reporting population/time/quality/reliance semantics;
- AI never becomes business truth;
- product-authored AI capability/prompt/tool/authority;
- tenant-isolated AI context/provider handling;
- connectors never become ungoverned co-masters;
- no generic BPM, CDE, CPM, ERP, iPaaS, supplier network or AI-agent platform;
- P07 remains the sole independent XL gravity well.

---

# 5. Self-service invariant

The ordinary deterministic sourcing rail must be usable under product-owned defaults.

A normal customer must not need to understand the internal ontology in order to operate correctly.

For the core rail, the product may not require bespoke named connectors, custom code or advanced AI before first value.

Enterprise configuration may enhance the product but may not invent new business truth.

---

# 6. SaaS control-plane boundary

Introduce a bounded platform-commercial control plane separate from customer procurement/commercial truth.

Durable concepts may include:

- `ProductOfferingVersion`;
- `EntitlementDefinitionVersion`;
- `UsageMeasureDefinitionVersion` where retained as a separate bounded registry;
- `TenantSubscription`;
- `MeteredUsageOccurrence`;
- `BillingProviderObservation`;
- `SubscriptionLifecycleOccurrence`.

`ResolvedEntitlementSnapshot` is not an independently editable authority.

If materialized, it is only a recomputable derived projection/cache binding exact source versions, resolution version/time, validity boundary and usage cut where applicable.

No mutable current-entitlement truth may exist independently of authoritative subscription/lifecycle/usage facts.

The SaaS control plane is not:

- GL;
- AR/AP;
- customer accounting;
- payment processor;
- tax engine;
- revenue-recognition system;
- generic entitlement platform.

---

# 7. Billing-provider boundary

An external billing/payment provider is authoritative only for its own external observations.

A provider callback is an `ExternalObservation` under P1.7.

It does not directly establish CPOS entitlement.

Billing integration uses the frozen connector grammar:

- ConnectorProfile;
- AuthorityMapping;
- correlation/idempotency;
- ExternalObservation;
- effect position;
- reconciliation;
- cutover/conformance;
- manual fallback.

Duplicate, reordered, delayed or absent callbacks cannot silently change entitlement meaning.

Manual/offline Enterprise subscription activation is permitted only through a governed product operation preserving actor, effective period, commercial evidence and reason.

---

# 8. Entitlement is not business authority

Entitlement answers only:

> Is this tenant commercially permitted to use this product capability now?

It does not answer:

> Is this principal authorized to execute this procurement action?

Effective operation eligibility is the intersection of:

- current product entitlement;
- authenticated principal;
- tenant/project/context membership;
- role/permission;
- delegation/DOA where applicable;
- registered operation authority;
- domain state and guards;
- evidence/configuration prerequisites;
- security/conformance state.

A higher plan cannot:

- make a person an approver;
- increase DOA;
- grant project access;
- bypass compliance/evidence;
- create AwardDecision;
- create Commitment;
- certify/pay;
- raise AI authority;
- weaken AI evaluation/review/context requirements.

Marketed plan names are prohibited as procurement-domain semantics.

---

# 9. Entitlement effective-period and command semantics

`TenantSubscription` and any load-bearing entitlement authority periods are effective-dated/versioned.

They must be explicitly registered under the existing `EFFECTIVE_PERIOD_NON_OVERLAP` invariant family with the applicable concurrency-control mechanism, including CC-3 where required.

For a consequential operation:

1. preview resolves current entitlement;
2. a material entitlement change invalidates the preview;
3. command acceptance revalidates current entitlement;
4. accepted command binds the exact entitlement evaluation/version used at acceptance;
5. once durably accepted, ordinary later subscription downgrade/expiry does not silently mutate or cancel that logical command;
6. security/abuse suspension may block or interrupt where the frozen operation/effect semantics permit;
7. every new logical command evaluates current entitlement.

No stale entitlement cache may authorize a command.

---

# 10. Packaging flexibility

Architecture does not freeze:

- price;
- permanent tier names;
- exact tier count;
- trial duration;
- card requirement;
- monthly/annual discount;
- exact AI allowance;
- AI billing unit;
- Enterprise service package.

A marketed offering is a versioned bundle over product-owned entitlement dimensions such as:

- workflow capability;
- internal-user scale;
- project/RFQ scale;
- governance depth;
- commercial/P07 depth;
- AI capability/usage;
- storage/processing;
- analytics;
- integrations/API;
- security/residency;
- support/service.

Old customers may remain on an old valid offering version.

Moving a feature between future plans cannot change domain fact meaning.

---

# 11. Usage metering

`UsageMeasureDefinitionVersion` defines what a commercial unit means where a separate usage registry is used.

Examples may later include:

- AI run;
- quotation/document extraction;
- processed page;
- tender package;
- drawing sheet/takeoff;
- agent action;
- storage/processing unit.

Provider tokens/cost remain internal resource observations unless deliberately adopted later as a commercial unit.

`MeteredUsageOccurrence` is append-only.

Consumed usage, remaining allowance and overage are derived.

There is no authoritative editable `allowance_remaining` balance.

Credits/corrections are immutable adjustment occurrences carrying actor, reason, evidence, effective/recorded time, quantity and relation where applicable.

Commercial usage limits are distinct from `AIResourceBudgetPolicy`.

Commercial exhaustion may never silently remove mandatory context, citations, security, evaluation or review.

---

# 12. AI commercial adaptability

P1.10 AI semantics remain controlling.

Future packaging may support:

- included AI;
- AI add-ons;
- credits;
- business processing units;
- premium model access;
- private/customer model profiles;
- new future capabilities.

Every provider/model profile remains capability-specifically evaluated according to the frozen AI architecture.

No model/provider automatically inherits a `SUFFICIENT_PASS` because it shares a commercial plan.

AI-off deterministic A0–A3 remains complete.

---

# 13. Self-service tenant bootstrap

B02 owns an idempotent governed path conceptually equivalent to:

`verified authentication identity`
`→ TenantBootstrapIntent`
`→ Tenant`
`→ minimum company/legal context`
`→ initial OWNER membership`
`→ minimum product-owned defaults`

The path must survive:

- retry;
- lost response;
- concurrent bootstrap;
- partial technical failure;
- invited existing user;
- one authentication identity belonging to multiple tenants.

Possession of an authentication identity cannot by itself create arbitrary ownership inside an existing tenant.

Exact authentication provider remains a physical choice.

---

# 14. Subscription lifecycle and offboarding

Subscription changes never rewrite procurement history.

Expiry/downgrade/cancellation may:

- block new non-entitled operations;
- prevent creation of additional resources;
- reduce future commercial allowance;
- place the tenant into a bounded restricted/read/export mode.

They may not erase or reinterpret:

- issued RFQs;
- supplier submissions;
- source evidence;
- comparisons;
- recommendations;
- approvals;
- AwardDecisions;
- later Commitments;
- audit history.

Commercial downgrade cannot silently hide business rows and then present a smaller denominator as the full population.

Security/business authorization continues to filter records the current principal is not authorized to see.

Offboarding remains subject to frozen retention/hold/disposition semantics.

---

# 15. In-flight external-task continuity

An `ExternalTaskGrant` validly issued while the tenant held the required entitlement binds its issue-time entitlement basis in addition to its existing task/version/due/expiry/action/assurance/revocation semantics.

Ordinary later subscription expiry/downgrade/cancellation:

- prevents new buyer issue/extension actions requiring unavailable entitlement;
- does not retroactively invalidate the issued supplier task;
- does not destroy supplier work already performed.

The existing grant due/expiry and `ExternalSubmissionAcceptancePolicy` are the commercial continuation bound.

If a supplier responds after buyer subscription expiry but while the task/policy remains valid:

- the response is captured under normal frozen semantics;
- it may enter the governed response population when policy permits;
- new buyer operations on it require current applicable entitlement.

Security/legal/domain/abuse revocation retains precedence.

Extending the tender is a new buyer operation and requires current entitlement.

---

# 16. First-public-offering grant limits

The architecture accepts the bounded exposure that a customer may issue a valid external task and then cancel before its due date.

Before first public self-service release, the active public `ProductOfferingVersion` must declare finite issue-time dispositions for at least:

- maximum newly issued external-task duration;
- outbound external invitations/tasks per applicable allowance period.

Exact numeric limits remain product/release decisions.

Requirements:

- evaluated at issue time;
- versioned;
- later offering changes do not shorten already-valid grants;
- unbounded/default-infinite public external-task duration is prohibited;
- security/legal/domain revocation remains independent;
- Enterprise offerings may declare different limits but may not omit an explicit disposition.

---

# 17. External supplier commercial invariant

An invited supplier/subcontractor does not require a paid CPOS subscription to:

- view an issued task;
- decline/no-bid;
- respond;
- upload/submit;
- revise where the grant permits.

Secure-link, email/file, buyer-on-behalf and optional persistent-workspace modes remain governed by the frozen external-participation model.

Any future supplier-side commercial product/marketplace requires separate change control and may never become prerequisite for responding to an ordinary buyer invitation.

---

# 18. Public self-service abuse boundary

Before broad public outbound use, the platform must support bounded controls for:

- verified identity before consequential outbound communication;
- signup/workspace rate controls;
- trial/public outbound invitation limits;
- AI/storage/resource limits;
- bounce/complaint suppression;
- supplier decline/report/suppression;
- abuse suspension independent of billing grace;
- platform sender-reputation isolation sufficient for the declared envelope.

Exact subdomains/provider pools/accounts are physical B14 decisions, not frozen semantics.

No generic fraud/GRC platform is authorized.

---

# 19. Quick Compare

Quick Compare is an acquisition/activation surface into the same semantic system, not a parallel truth model.

## 19.1 Genuine externally received supplier quote

A customer may upload/capture a real supplier quotation already received outside CPOS through the frozen buyer-on-behalf path.

The capture preserves as applicable:

- supplier as commercial source principal;
- internal capture actor separately;
- immutable source evidence;
- source channel/time;
- attribution/assurance basis;
- review/verification status.

Buyer-on-behalf is not automatically `UNVERIFIED_ASSERTION`.

`ExternalSubmissionAcceptancePolicy` determines the valid disposition.

Direct supplier login is not universally required.

## 19.2 Scratch/non-load-bearing comparison

If minimum governed sourcing/requirement/response-population context does not exist, Quick Compare remains `NON_LOAD_BEARING`.

It may produce:

- draft extraction;
- proposed mappings;
- draft normalization;
- provisional difference views;
- non-load-bearing comparison visualization.

It may not establish/persist as the authoritative governed form of:

- `ComparisonSnapshot`;
- AwardRecommendation;
- approval basis;
- AwardDecision;
- contractable supplier basis;
- Commitment input.

Promotion into governed sourcing creates the required normal domain objects. It does not mutate the scratch artifact into historical business truth.

The scratch artifact may remain as provenance/supporting evidence where appropriate.

## 19.3 Extraction

AI/OCR extraction is derived proposal/normalization, never the source quote itself.

## 19.4 Promotion

Before load-bearing recommendation/award:

- tenant/project/context exists;
- source evidence is bound;
- supplier source attribution is represented;
- sourcing/response context exists;
- applicable schema/acceptance policy exists;
- each quotation receives a valid frozen submission disposition;
- source/normalized/adjusted/contractable layers remain distinct.

Material negotiated supplier economic change still requires the applicable supplier-originated/confirmed revision; buyer-only allowances cannot become supplier contractable truth.

---

# 20. Principal attribution and external assurance

`ExternalActorAssuranceRecord` remains the broader frozen external-actor assurance/provenance record.

`PrincipalAttributionBasis` is the typed source-attribution dimension carried/referenced where source-principal attribution is load-bearing.

Bounded attribution classes include as applicable:

- `AUTHENTICATED_DIRECT`;
- `AUTHORIZED_REPRESENTATIVE`;
- `SYSTEM_ATTESTED`;
- `BUYER_ON_BEHALF_ASSERTED`;
- `UNVERIFIED_ASSERTION`.

No class automatically produces `VALID_SOURCE_SUBMISSION` or business authority.

`ExternalSubmissionAcceptancePolicy` remains the owner of submission sufficiency.

The system must never collapse:

- source principal;
- capture actor;
- login identity;
- representative;
- transport provider;
- later approver.

`PrincipalAttributionBasis` does not duplicate technical authentication, mailbox/team assurance, signatory evidence, external grant, supplier relationship or business authority.

It is not a second independently editable decision state.

---

# 21. Quick RFQ

Quick RFQ may accept MR/BOQ/specification/scope/project evidence and propose:

- requirement structure;
- RFQ content;
- response schema;
- scope breakdown;
- supplier-list suggestions.

Supplier-facing issue always uses the normal B06 operation.

Quick RFQ cannot bypass:

- requirement/source authority;
- registered semantic fields;
- response-schema rules;
- issue-set version;
- recipients;
- approval/authority;
- preview/confirmation;
- immutable issued artifact;
- external grant semantics.

AI-generated content cannot issue itself.

---

# 22. UI verticalization

P1.9 semantics remain frozen.

The first conventional UI travels with the block that owns the corresponding semantics:

- B02: signup/account/company/project/users/subscription;
- B04: file/evidence capture/view;
- B05: requirements/allocation/package;
- B06: supplier selection/RFQ/sourcing;
- B07: supplier submission/revision/buyer capture;
- B08: normalization/comparison;
- B09: recommendation/approval/AwardDecision;
- B10: navigation/onboarding/Quick Start/saved views/design-system/responsive/accessibility/Arabic-RTL/recovery consolidation;
- B11: external UX consolidation/hardening/optional persistent workspace;
- B12: fixed dashboards/report/search/export/product analytics.

Every UI uses the same domain owner and OperationRegistry.

UI never creates a second truth or authority path.

---

# 23. Fixed dashboards

B12 exposes product-owned dashboards rather than a generic BI builder.

Candidate surfaces include:

- Home / Action Required;
- Project Procurement;
- RFQ/Tender Coverage;
- Comparison;
- Approval Queue;
- Suppliers;
- later P07 Commercial.

Every state/KPI derives from authoritative facts/frozen reporting projections.

Prohibited:

- manually maintained duplicate procurement-status ledger;
- missing = zero;
- restricted = absent;
- stale = current;
- subset = total;
- entitlement-filtered subset presented as complete population;
- AI summary overriding deterministic metric truth.

A plan may make a dashboard capability unavailable; if shown, the dashboard must preserve population truth.

---

# 24. Procurement schedule and Scope Library restraint

This amendment does not make a full procurement schedule, CPM/master scheduling or deep generic Scope Library prerequisite to A0–A3.

Transaction dates, due dates, status and reporting may support initial project procurement visibility.

A deeper planning model or reusable scope library may be promoted later only through bounded product semantics/change control when evidence justifies it.

No feature is promoted merely because an incumbent has it.

---

# 25. Product analytics

Product-usage analytics are non-authoritative telemetry separate from procurement/report truth.

Pre-register event meanings for at least:

- qualified acquisition;
- verified signup;
- tenant activation;
- first project;
- first real sourcing/import event;
- first RFQ;
- supplier participation;
- first usable comparison;
- recommendation/approval/AwardDecision where applicable;
- paid conversion;
- second distinct procurement cycle;
- expansion;
- cancellation/churn.

Login alone is not retention.

Signup alone is not activation.

A demo import is not repeated procurement.

Commercial denominators/cohorts must be defined before interpreting the corresponding cohort.

Product analytics cannot become cross-tenant procurement truth or cross-tenant learned business influence.

---

# 26. B02 internal checkpoints

B02 remains one Build Program block but uses bounded internal checkpoints.

## B02-C1 — Identity / Tenant Bootstrap

Prove:

- verified identity path;
- idempotent tenant bootstrap;
- tenant != legal entity;
- initial owner membership;
- retry/concurrency/partial failure;
- multi-tenant identity isolation.

## B02-C2 — Subscription / Entitlement Core

Prove:

- offering/version registry;
- entitlement definitions;
- effective-period invariant;
- subscription lifecycle;
- entitlement-versus-authority intersection;
- preview/command revalidation;
- stale-cache refusal;
- manual Enterprise activation.

## B02-C3 — Usage / Lifecycle / Offboarding

Prove:

- usage-measure registry;
- append-only usage occurrences;
- derived allowance position;
- downgrade/cancel/expiry;
- read/export/offboarding floor;
- no history rewrite.

Where external billing-provider integration is physically included in B02, duplicate/reordered/missing observation reconciliation also passes.

## B02-C4 — Self-Service Product Surface

Prove:

- signup/account UI;
- tenant/company setup;
- first project creation;
- users/membership surface;
- subscription/account surface;
- minimum defaults;
- abuse controls sufficient for the declared B02 test envelope.

B02 internal checkpoints do not independently authorize B03.

Final B02 PASS requires C1–C4, block-local security/invariant evidence, SSV-1 comprehension, completion manifest and independent block audit.

---

# 27. Self-Service Validation namespace

The historical frozen `V*` labels retain their original meanings and are not reinterpreted.

Historical meanings remain reconstructable:

- V1 — primary contractor/supplier evidence;
- V2 — prototype comprehension;
- V3 — deterministic A0–A3 thin-slice build;
- V4 — P07 feasibility;
- V5 — NFR verification;
- V6 — AI capability gate;
- V7 — controlled live pilot;
- V8 — commercial/release decision.

New subscription-native validation uses the separate `SSV-*` namespace.

---

# 28. SSV-0 — Change closure

Owner: CHG-SSS-001 change-control process.

Satisfied by this frozen amendment and its audit/change evidence.

Timing: before formal B02 authorization.

---

# 29. SSV-1 — Rolling real-product comprehension

SSV-1 is a distributed block-completion gate, not a one-time later research phase.

The applicable-block set is:

- B02;
- B04;
- B05;
- B06;
- B07;
- B08;
- B09;
- B10;
- B11;
- B12.

**BL-SSS-08 closure:** any further block that introduces or materially changes a consequential human-facing semantic surface is added to this set by the same rule. The set is extensible, never reducible.

B03 remains outside the initial set only while it does not introduce a consequential human-facing semantic surface.

For every applicable block:

- its `RollingComprehensionCheckpoint` is a mandatory member of the final `BlockCompletionEvidenceManifest`;
- at least three non-builder construction practitioners exercise the affected real product surface against real, sanitized-real or realistic procurement tasks;
- the same practitioners may be reused across blocks;
- bespoke coaching that explains away an otherwise confusing semantic does not count as successful comprehension;
- unresolved critical-meaning misunderstanding prevents final block PASS;
- a disputed criticality classification receives independent second review;
- remediation is retested;
- the checkpoint is diagnostic comprehension evidence only and cannot be represented as demand, conversion, PMF or willingness-to-pay evidence.

A `CriticalMeaningMisunderstanding` includes misunderstanding that could materially affect:

- business fact meaning;
- source versus derived information;
- supplier truth versus buyer adjustment;
- actor versus represented principal;
- authority/DOA;
- external grant;
- evidence/provenance;
- current versus historical/versioned state;
- requested versus established action/effect;
- complete/partial/stale/restricted/indeterminate state;
- commercial consequence;
- required next action;
- irreversible/high-consequence operation.

Cosmetic preference, navigation inefficiency or non-critical terminology disagreement alone does not block.

Each checkpoint records a `ValidationGateDecision` including block/version, surfaces/scenarios, participant count/relevant practitioner background, findings/classification/rationale, remediation/retest, PASS/BLOCKED, owner and recorded time.

The normal predecessor rule then applies:

`block implementation`
`→ technical/invariant/security evidence`
`→ SSV-1 checkpoint`
`→ final BlockCompletionEvidenceManifest`
`→ block PASS`
`→ dependent successor unlock`

---

# 30. SSV-2 — Deterministic A0–A3 integrated validation

Owner: B15.

Prove the integrated deterministic self-service rail with:

- AI disabled;
- named connectors disabled;
- P07 not required;
- persistent supplier account not required.

SSV-2 is executed through B15 evidence, not as a duplicate phase after B15.

---

# 31. SSV-3 — External participation release validation

Owner: B15 using completed B06/B07/B11/B14 capabilities.

Before unrestricted public supplier invitation, prove released external modes against:

- grant security;
- replay/forwarding;
- expiry/revocation/transfer;
- submission integrity;
- receipt/disposition;
- attachments;
- no-account path;
- released email/file fallback;
- abuse controls;
- sender-reputation controls.

Controlled exercises used to satisfy SSV-3 are not themselves unrestricted public release.

---

# 32. Existing V4 / V5 / V6 remain unchanged

`V4` remains P07 feasibility and applies to affected B16/B17 capability.

`V5` remains NFR verification and contributes to the declared production/release envelope.

`V6` remains capability-specific AI validation and applies before affected B18 AI capability activation.

They are not renamed or folded into SSV labels.

---

# 33. SSV-4 — Self-service commercial release authorization

SSV-4 may PASS only after:

- B15 PASS;
- SSV-2 PASS;
- SSV-3 PASS where public supplier participation is included;
- applicable V5 NFR/security/restore verification PASS for the declared envelope;
- subscription lifecycle proof;
- upgrade/downgrade/cancellation proof;
- export/offboarding/recovery proof;
- no unresolved critical comprehension finding;
- every optional capability included in the release having passed its own activation gate.

Examples:

- deterministic A0–A3 may release with AI and P07 disabled;
- included AI capability additionally requires V6;
- included P07 capability additionally requires V4 and the relevant block PASS.

SSV-4 authorizes acceptance of the **first real paying customer**.

It does not require prior paid-conversion evidence.

---

# 34. SSV-5 — Commercial continuation evidence

SSV-5 is post-release commercial evidence.

Evaluate separately:

- activation;
- real workflow completion;
- paid conversion;
- second distinct procurement cycle;
- retention/renewal;
- expansion;
- churn;
- support burden;
- operating cost.

SSV-5 is not a prerequisite to first payment.

It decides whether to continue, change, expand or stop based on actual behavior.

---

# 35. Legacy V1/V2/V3/V7/V8 prospective disposition

Historical meanings remain unchanged.

For prospective self-service authorization:

- old V1 program-wide pre-build gating is `SUPERSEDED_FOR_PROSPECTIVE_SELF_SERVICE_AUTHORIZATION` by rolling SSV-1 plus continuing external falsification;
- old V2 throwaway-prototype gating is `SUPERSEDED_FOR_PROSPECTIVE_SELF_SERVICE_AUTHORIZATION` by SSV-1 on real vertical product surfaces;
- old V3 thin-slice intent is implemented prospectively by sequential real B02–B09 plus SSV-2 integrated proof in B15;
- old V7 monolithic pilot role is prospectively separated into SSV-3 external release validation and SSV-4 release authorization;
- old V8 combined release/commercial decision is prospectively separated into SSV-4 first-commercial-release authorization and SSV-5 actual commercial continuation evidence.

No historical artifact's original meaning is rewritten.

---

# 36. Legacy B01 / Phase-2 authorization wording

Historical artifacts contain wording requiring explicit authorization and a recorded V1/V2 sequencing decision.

After this CHG freezes:

- that wording keeps its historical meaning;
- it must not be reinterpreted as SSV-1 or SSV-2;
- its old V1/V2 prerequisite is `SUPERSEDED_FOR_PROSPECTIVE_AUTHORIZATION` for the subscription-native path.

B01 remains business-empty and has no SSV-1 requirement.

Formal B02 authorization becomes exactly:

1. CHG-SSS-001 / SSV-0 = FROZEN PASS;
2. B01 = FINAL PASS / OWNER-ACCEPTED;
3. explicit project-owner implementation authorization.

No legacy V1/V2 condition remains a separate B02 prerequisite.

---

# 37. Open-FT ownership

Open falsification/feasibility debt is not treated as a single undifferentiated pre-B05 lock.

## FT-02

Concerns whether Commitment binds existing allocation versus creates first/only scope authority.

A0–A3 stops before Commitment.

B05 may implement frozen RequirementAllocation sourcing/award lineage.

FT-02 remains mandatory before affected B16/P07 Commitment activation.

## FT-06

Remeasurement hard scope/cap conservation belongs predominantly to P07 valuation/fulfillment.

It does not block B05–B09 construction.

It remains mandatory before affected B16/B17 semantics.

## FT-09 / CR-02

Rectification/replacement capacity remains a pre-P07-fulfillment obligation.

It does not block B05–B09.

It remains mandatory before affected P07 fulfillment/change/recovery implementation.

## FT-10

Touches B05 exclusive-scope practice.

First implementation remains constrained to the frozen safe form:

- exclusivity only where scope is explicitly declared exclusive;
- no claim that free-form scope has a perfect deterministic natural key;
- overlap surfaced for controlled human resolution;
- AI/search may propose but never establish authority.

No stronger universal automatic exclusivity assumption may activate without the required evidence/change decision.

---

# 38. B18 timing / AI priority

B18 remains dependent on deterministic/manual equivalent and capability-specific V6 `SUFFICIENT_PASS`.

Commercial priority may place B18 soon after B15 because quotation extraction, mapping, gap detection and RFQ preparation can reduce human effort materially.

This does not make AI a deterministic-core dependency.

B16/B17 remain separately V4-gated.

Investment order between B18 and B16/B17 is evidence/customer driven after their respective gates.

---

# 39. Integration adaptability

P1.7 remains controlling and is not semantically reopened.

Future named adapters — including scheduling, CDE/document, project-management, ERP/accounting, e-signature, email and future systems — use the existing:

`ConnectorProfile`
`+ AuthorityMapping`
`+ bounded operation`
`+ ExternalObservation`
`+ exact version/freshness`
`+ reconciliation`
`+ manual fallback`

grammar.

Potential future systems such as Primavera, Autodesk, Procore, Aconex, SAP, Oracle, Dynamics, QuickBooks, Xero, CMiC, Vista/Sage and others are adapters, not frozen core dependencies.

No named connector becomes an ungoverned co-master.

No generic iPaaS is authorized.

---

# 40. Enterprise customization boundary

Permitted Enterprise work includes:

- named connector adapters;
- product-supported mappings;
- migration;
- SSO;
- residency/private deployment;
- security review;
- SLA/support;
- product-supported templates/configuration;
- certified implementation partners operating inside the same product contract.

Not permitted as normal delivery:

- tenant-specific permanent source-code fork;
- arbitrary customer state machine;
- arbitrary formula/business-truth semantics;
- customer-authored domain operation;
- uncontrolled report semantics;
- customer-authored AI tool/prompt/agent with new authority;
- generic iPaaS/custom platform behavior.

Enterprise work must not fracture CPOS into permanent customer-specific products.

---

# 41. Prospective build-program overlay

B01 remains unchanged.

Prospective intent:

`B01 Engineering Foundation`
`→ B02 Platform + Self-Service/SaaS Kernel + first UI`
`→ B03 Async/Event/Reconciliation + usage/event support`
`→ B04 Evidence/Files/Communication + UI`
`→ B05 Requirements/Allocation + UI`
`→ B06 Sourcing/RFQ/Grants + UI`
`→ B07 Supplier Submission/Revision/Buyer Capture + UI`
`→ B08 Normalization/Comparison + UI`
`→ B09 Recommendation/Approval/AwardDecision + UI`
`→ B10 UX/Onboarding/Quick-Start Consolidation`
`→ B11 External UX Consolidation/Hardening`
`→ B12 Reports/Dashboards/Search/Export + Product Analytics`
`→ B13 Integration/Migration/Provider-Neutral Email`
`→ B14 NFR/Security/Restore/Abuse/Release Hardening`
`→ B15 Deterministic Self-Service Release Validation`

Then independently gated:

- B16/B17 P07 under V4;
- B18 AI under V6.

A separate prospective P2.2 overlay records exact physical ownership changes; the historical frozen P2.2 artifact is not silently rewritten.

---

# 42. Blocker/watch closure register

Final disposition:

- BL-SSS-01 — CLOSED;
- BL-SSS-02 — CLOSED;
- BL-SSS-03 — CLOSED;
- BL-SSS-04 — CLOSED;
- BL-SSS-05 — CLOSED;
- BL-SSS-06 — CLOSED;
- BL-SSS-07 — CLOSED;
- BL-SSS-08 — CLOSED BY §29 EXTENSIBLE SSV-1 ENUMERATION;
- W2-01 — CLOSED;
- W2-02 — CLOSED;
- W2-03 — CLOSED;
- W2-04 — CLOSED AS ACCEPTED BOUNDED EXPOSURE;
- W2-05 — CLOSED;
- W3-01 — CLOSED;
- W3-02 — CLOSED;
- W3-03 — CLOSED;
- W3-04 — CLOSED AS RELEASE REQUIREMENT.

---

# 43. Blast radius

Final change disposition:

- P1.1 — NO REOPEN;
- P1.2 — NO REOPEN;
- P1.3 — NO REOPEN;
- P1.4 — ADDITIVE CHG for self-service bootstrap/subscription intersection only;
- P1.5 — NO REOPEN;
- P1.6 — ADDITIVE application of existing evidence/buyer-on-behalf grammar;
- P1.7 — ADDITIVE application to billing observations/connectors only;
- P1.8 — ADDITIVE product-analytics/entitlement-population clarification;
- P1.9 — ADDITIVE physical surface/comprehension application;
- P1.10 — CONTROLLED SEMANTIC REOPEN of ordered validation / ADR-0048 only;
- P1.11 — change-control/traceability update only.

No hidden second XL was identified across four hostile audit rounds.

---

# 44. B01 disposition

`B01 VALID UNCHANGED`

CHG-SSS-001 does not require reopening the B01 implementation architecture.

B01 remains independently verified on its own branch/head and must receive its normal project-owner acceptance before formal B02 authorization.

Provisional B02 work may remain isolated/reversible until that acceptance.

---

# 45. Freeze and authorization

`CHG-SSS-001 = FROZEN`

`SSV-0 = PASS`

The Round-4 BL-SSS-08 defect is closed exactly by §29, expanding SSV-1 to B10/B11/B12 and making the applicable set extensible, never reducible.

No additional broad architecture or competitor audit is required before B02.

Formal build authorization remains:

`B02 MAY PROCEED AFTER B01 FINAL PASS/OWNER ACCEPTANCE AND EXPLICIT OWNER AUTHORIZATION.`

Until then, isolated provisional implementation remains non-canonical and must be reconciled against this frozen CHG before acceptance.

---

# 46. Final non-claim

This freeze establishes that the subscription-native product strategy is coherent with the frozen CPOS architecture and can proceed without known load-bearing semantic contradiction.

It does **not** establish:

- product-market fit;
- willingness to pay;
- retention;
- market size capture;
- production certification;
- absolute security.

Those claims require their own later evidence.
