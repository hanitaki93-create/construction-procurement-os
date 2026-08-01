# Construction Procurement OS — Phase 1 Master Specification v1.0 Candidate

**Date:** 2026-08-01  
**Status:** INTEGRATED MASTER-SPEC CANDIDATE / INTERNAL NO-INVENTION AUDIT PENDING  
**Architecture phases:** P1.0–P1.10 CLOSED/FROZEN  
**P1.11:** ACTIVE  
**Product/frontend/AI code:** NOT STARTED / LOCKED

---

# 1. Purpose

This document is the build-facing navigation and precedence contract for the Phase 1 architecture.

It does not duplicate every phase clause. It tells a fresh builder:

- what product is being built;
- what is owned, mirrored, referenced or excluded;
- which semantic contracts control each concern;
- how facts, actions, evidence, effects, reports and interactions compose;
- which capabilities are mandatory, optional or out;
- what physical decisions remain open;
- what tests must pass before non-throwaway build, P07 commitment, AI activation and release;
- which external/legal/commercial questions remain unvalidated.

A builder must not resolve a cross-file ambiguity by implementation convenience. The precedence and references below control.

---

# 2. Precedence

1. Final frozen Phase 1 master specification after P1.11 dual PASS.
2. Phase-specific frozen contracts and final checkpoints.
3. Canonical `02_research/control/adr_log.csv`.
4. Phase-specific final ADR reconciliations and watch closures.
5. P1.11 traceability, action catalogue, golden-thread atlas and validation results.
6. Requirements/evidence/control registers.
7. Candidate, research and audit artifacts only where not superseded.

Where this candidate summarizes a detailed phase contract, the phase contract supplies exact clause detail unless the final P1.11 freeze explicitly supersedes it.

---

# 3. Product thesis and boundary

## 3.1 Beachhead

V1 targets UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments under explicit procurement/commercial authority and an accounting environment the product must coexist with.

This is an architecture hypothesis pending the ordered contractor/supplier validation gates. It is not yet a market-validation claim.

## 3.2 Deterministic thesis

The product must remain commercially useful if advanced AI never works.

Core value:

- capture authorized requirements;
- prepare and issue RFQs/tenders;
- receive and preserve supplier source responses/revisions;
- normalize and compare without erasing source meaning;
- prepare recommendations and govern approvals;
- establish AwardDecision;
- hand off externally or establish P07 Commitment where activated;
- preserve evidence, authority, history, reports and recovery.

## 3.3 A0–A3 mandatory floor

A0–A3 must operate without:

- P07 execution;
- named ERP/CDE/email connector;
- persistent supplier account or supplier network;
- public API/broker;
- chat or AI;
- warehouse/BI platform;
- cross-tenant shared learning.

Manual, file and provider-neutral channel paths are mandatory architecture substrate.

## 3.4 Sole XL

P07 commitment/change/valuation/commercial truth is the sole independent XL gravity well.

The architecture explicitly refuses independent generic platforms for:

- BPM/workflow;
- CDE/records management;
- CPM/project scheduling;
- supplier network/marketplace;
- GRC/case management;
- BI/warehouse/formula builder;
- page/form/no-code builder;
- SLO/SIEM/cloud management;
- prompt/agent/tool/vector/memory/evaluation platform.

---

# 4. Scope classification

## SPINE

- tenant/project/authority context;
- requirement source and RequirementAllocation;
- optional ProcurementPackage;
- RFQ/tender event, issue and external grants;
- supplier source submission/revision;
- normalization/comparison/recommendation/approval/AwardDecision;
- evidence/version/source/location/reliance;
- registered operations, idempotency, recovery and audit;
- mandatory A0–A3 reports and conventional interaction;
- measurable core NFR/security/privacy/lifecycle contracts.

## THIN

- procurement milestones/expediting;
- supplier compliance prerequisites;
- control observations/work queues;
- optional tenant-scoped external workspace;
- bounded migration by accepted domain profile;
- selected named connectors where evidence supports activation;
- optional AI capabilities after deterministic/manual paths and evaluation.

## INTERFACE-ONLY OR SPLIT AUTHORITY

- external accounting/AP/payment/GL/job-cost truth;
- external CDE/master documents;
- bank/security-provider facts;
- external technical/shipment facts;
- public integration gateway/broker where later activated.

## OUT FOR V1

- full accounting GL/AP/cash ERP;
- supplier marketplace/network/profile/reputation system;
- general workflow/form/report/agent platform;
- warehouse/WMS/CPM/project management suite;
- cross-tenant business learning/benchmark influence;
- general autonomous commercial agent.

---

# 5. Canonical architecture layers

## 5.1 Boundary, ownership and tenancy

Controlling file:

`P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`

Every load-bearing fact/action binds:

- tenant;
- project;
- ContractingAuthorityContext;
- acting and represented principal;
- authoritative owner/source;
- OWN/MIRROR/REFERENCE/OUT classification;
- effective/recorded and governing configuration versions;
- current eligibility/access;
- historical reconstruction binding.

One authoritative writer exists per load-bearing fact/event per effective period.

Internal roles/delegation/DOA and external task grants are separate. Authentication does not create business authority.

Cross-tenant business influence is OUT by default across records, retrieval, embeddings, cache, memory, evaluation, providers and learning.

## 5.2 Commercial core

Controlling file:

`P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`

The procurement graph is polycentric:

`authorized requirement source`
`→ RequirementAllocation`
`→ optional ProcurementPackage`
`→ sourcing route`
`→ AwardDecision`
`→ external handoff or separate Commitment command`

No universal ProcurementCase/Package/Demand root owns end-to-end truth.

AwardDecision is not Commitment.

One semantic Commitment core supports bounded purchase order, subcontract, call-off/release and service forms.

Distinct axes:

- ScopeBasis;
- ValuationBasis;
- CapabilityProfile.

Commercial effects use one closed `CommercialEffectVector` algebra at COMPONENT or OBLIGATION subject grain. One economic value contributes once.

Distinct facts:

- claim;
- assessment;
- certification;
- external accounting posting;
- payment/cash.

Distinct actual families:

- physical;
- product commercial/certified;
- external accounting-posted;
- paid cash.

Correction is immutable and typed. No economic in-place rewrite.

Exact money binds decimal, currency, calculation order, rounding, FX/tax purpose and governing version.

Open bounded debt:

- ADR-0010 exact GCC/statutory/rate/default/formality evidence;
- ADR-0011 detailed suspense/attribution mechanics under frozen visible-attribution/resolution rules.

## 5.3 Evidence, document and communication

Controlling file:

`P1_6_FROZEN_EVIDENCE_DOCUMENT_COMMUNICATION_MODEL_V1_0.md`

Distinct objects/meanings include:

- EvidenceRecord;
- EvidenceVersion;
- content identity/integrity;
- source principal/attribution;
- capture observation/communication occurrence;
- SourceLocator;
- EvidenceBinding;
- immutable RelianceBinding;
- issued artifact/member set;
- Transmittal/MessageEnvelope/CommunicationOccurrence.

Filename, hash, URL, storage object or current pointer is not business evidence identity, authority or truth.

Communication facts remain distinct:

- issue;
- dispatch;
- provider acceptance;
- delivery/receipt;
- read/open;
- receipt acknowledgment;
- substantive response;
- owning-domain effect.

Where a frozen communication rule completes effect, first accepted satisfaction creates a canonical immutable snapshot and a separate owning-domain command establishes one effect once. Later evidence correction cannot silently reverse or retime it.

Retention, redaction, disposition and holds preserve identity, authority, audit and required commercial meaning.

External content remains untrusted data.

## 5.4 Integration, migration and API

Controlling file:

`P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`

Exactly four operation classes:

- QUERY;
- PROPOSAL;
- COMMAND;
- ASYNC_OPERATION.

Proposal is non-authoritative. Every state-changing initiator uses the same product OperationRegistry. No raw database/event-store mutation path exists for UI, connector, import, chat or agent.

Distinct asynchronous classes:

- DomainEvent;
- IntegrationEvent;
- TransportEnvelope;
- ExternalObservation.

Every outbound attempt binds immutable PublicationIntent with source fact/version, mapping/schema/disclosure versions, exact content basis and exact target/frozen recipient distribution.

Effect stages:

1. PRE_ACCEPTANCE;
2. ACCEPTED_PRE_EFFECT;
3. EFFECT_INDETERMINATE;
4. EXTERNAL_EFFECT_EMITTED;
5. DOMAIN_EFFECT_ESTABLISHED;
6. TERMINAL_NO_EFFECT;
7. PARTIAL_EFFECT.

Timeout, missing callback or absence never proves no effect. Indeterminate work permits lookup/reconciliation/manual/block only; ordinary retry/rebind/conflicting replacement is prohibited.

ConnectorProfile and AuthorityMapping define source/action authority and conformance. Connector is never co-master.

Migration uses explicit class, manifest, acceptance profile, target operations/effects and limitations. No fabricated state/balance/history.

## 5.5 Reporting, analytics and control

Controlling file:

`P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`

Reports are reproducible projections over authoritative facts, never independent truth.

Distinct objects:

- MetricDefinitionVersion;
- MetricExecution/Result;
- ProjectionDefinition/Execution/Result;
- ReportDefinition/Execution/Snapshot;
- artifact/issue/communication;
- recalculation/restatement/reconstruction;
- issue-time use and subsequent reliance.

Metrics bind source authority, grain, population, denominator, contribution, formula, time, actual family, currency/FX, quality/use, access and correction.

Calculations use a product-controlled typed operator registry; no arbitrary SQL/script/tenant formula.

Contribution identity separates:

- occurrence;
- economic lineage;
- conservation group;
- metric-specific contribution/disposition.

Population distinguishes declared eligible, evaluated, restricted and safely disclosable sets.

Incomplete population treatment is exactly:

- block;
- explicit evaluated subset;
- deterministic range.

A plausible partial point total is prohibited.

Quality is a full vector and per-use assessment. Report composition cannot upgrade member use.

Issued snapshots are immutable. Recalculation, semantic change, source correction and restatement are distinct.

New load-bearing use of an old report requires current SubsequentRelianceAssessment.

Portfolio aggregation recomputes target-scope population, quality and use; prevents double count; preserves comparable time/actual/currency/authority/access; and blocks unsafe inference/cross-tenant influence.

## 5.6 User experience and interaction

Controlling file:

`P1_9_FROZEN_USER_EXPERIENCE_INTERACTION_MODEL_V1_0.md`

Every affordance is one of:

- QUERY interaction;
- PROPOSAL interaction;
- COMMAND interaction;
- ASYNC_OPERATION interaction;
- NAVIGATION interaction;
- LOCAL_PRESENTATION interaction.

Selection, navigation, filter, drag/drop, annotation, autosave, upload, import and chat wording cannot hide a command.

Consequential actions use exact preview, current authority/evidence/target/member versions, same-principal confirmation, idempotency and typed result.

A retrievable continuation anchor exists before effect-bearing transmission.

Bulk uses one closed mode:

- atomic domain set;
- independent continue;
- independent stop-on-blocking;
- ordered dependent.

Navigation/tasks/queues are derived and cannot create a universal case or state writer.

External participation uses a bounded hybrid:

- secure task link;
- email/file response;
- governed buyer-on-behalf capture;
- optional tenant-scoped persistent workspace;
- structured file round-trip;
- manual/offline fallback.

No supplier network/profile is required or permitted as V1 business scope.

ExternalTaskGrant, actor assurance, exact task/schema/member version and response disposition control submission validity. Receipt states what submission establishes and does not establish.

Load-bearing fields bind product-owned registered semantic keys. Tenant configuration cannot create semantic field types, formulas, conditions, validators or state. Free text/unregistered content remains evidence until explicit cited normalization command.

Load-bearing disclosure uses mandatory placement and parity across full, compact, mobile, export, print and future chat surfaces. Subset is not total; range is not point; restricted is not absent; issued/current/restated and current reliance remain distinct.

V1 first-party web target is WCAG 2.2 AA, including keyboard/status/error/review/reflow/mobile and Arabic/RTL meaning.

All product-supported chat/AI actions have conventional equivalents.

## 5.7 Nonfunctional and AI readiness

Controlling file:

`P1_10_FROZEN_NONFUNCTIONAL_AI_READINESS_RESIDUAL_V1_0.md`

Every NFR binds exact workload, SLI formula/population/window, percentile/distribution, threshold, criticality, measurement health, evidence and conformance disposition.

C0 integrity/security/authority/durability requires verified pass and has no waiver/lower envelope/error budget.

Finite pilot and standard workload profiles and exact performance targets are frozen.

Acknowledged authoritative/evidence/issued/idempotency records require semantic RPO 0 and one accepted durability proof mode.

Capability RTO/RPO, backup integrity, sampled/end-to-end restore and disaster exercises are mandatory. A backup not restored in the prior quarter cannot support the claim.

Retry, queue, dead-letter, continuation and degradation prioritize tenant/security, durability, evidence and deterministic A0–A3 before optional connectors/AI.

Telemetry remains separate from audit/domain truth. Security/privacy/residency/lifecycle applies to all primary and derived copies, including prompts, outputs, embeddings, retrieval, memory, evaluation and provider files.

Files, archives, parsers, imports, exports, quotas and deployment are bounded and cannot silently truncate or create semantic fields.

Every runtime AI capability belongs to the product AICapabilityRegistry. Product owns prompt/instruction, source/context, tools, authority ceiling, evaluation, resource floor, provider compatibility, isolation and fallback.

Tenant AI configuration may only narrow and must pass monotonicity at activation and every material change.

AI context uses explicit complete/subset/range/segmented/restricted/unknown/block disposition. Citations do not substitute for coverage.

Evaluation requires sufficient independent samples, critical strata, confidence lower bounds, reviewed ground truth and current adversarial suites. Only current `SUFFICIENT_PASS` activates.

Agent authority:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare exact command for human confirmation;
- L5 transmit exact same-principal confirmed digest;
- L6 non-generative deterministic system automation only.

No general autonomous commercial agent exists. Sub-agent authority is intersection-only. Effect-indeterminate pauses continuation.

AI/provider outage leaves deterministic A0–A3 complete.

---

# 6. Canonical subjects and relationships

The minimum canonical subject families are:

- tenant/legal entity/business unit/project/ContractingAuthorityContext;
- internal identity, external identity, supplier relationship and ExternalTaskGrant;
- requirement source and RequirementAllocation;
- optional ProcurementPackage;
- tender/RFQ/event/member/invitation/addendum;
- supplier source submission/revision;
- normalized representation;
- buyer evaluation adjustment;
- supplier-confirmed contractable basis;
- recommendation/approval/AwardDecision;
- Commitment/component/obligation/effect/correction where P07 is active;
- evidence/version/source/location/binding/reliance;
- transmittal/message/communication occurrence/satisfaction snapshot;
- operation/invocation/continuation/outcome;
- connector/mapping/publication/observation/reconciliation/migration;
- metric/projection/report/snapshot/restatement/control observation;
- AI capability/run/proposal/context/evaluation.

No subject family is a universal root.

Detailed entity/cardinality attributes remain in the controlling phase contracts and later physical schemas, but physical design cannot merge semantically distinct families or create duplicate authority.

---

# 7. Canonical operation and ownership model

The builder-facing action/surface/API map is:

`P1_11_ACTION_SURFACE_API_REPORT_CATALOGUE_V0_1.md`

Rules:

- every state-changing human/external/system action maps to one COMMAND/ASYNC_OPERATION;
- every read/draft maps to QUERY/PROPOSAL;
- every operation binds exact authority, evidence, guards, target/member versions, consequence/non-effect, idempotency, event/publication, result/effect stage and correction/recovery;
- every product-supported action has a conventional owning surface;
- external API/connector/agent exposure is optional and authorization-filtered;
- no UI/API/agent privileged mutation bypass exists.

Physical endpoint names, page routes and component layout are open.

---

# 8. Reporting and control ownership

Mandatory no-connector A0–A3 report families:

1. requirement/allocation control;
2. RFQ/tender register;
3. supplier response/revision register;
4. normalization/comparison readiness;
5. recommendation/approval control;
6. AwardDecision/handoff register;
7. open controls/data quality;
8. immutable sourcing-event snapshot pack.

When P07 is active, add exact commitment/change/claim/certification/retention/recovery/reconciliation reports under separate actual families.

Control observations are derived conditions. Acknowledgment, assignment, snooze or accepted variance does not silently clear the source predicate or establish domain truth.

---

# 9. Golden-thread validation

Controlling atlas and results:

- `P1_11_GOLDEN_THREAD_ATLAS_V0_1.md`
- `P1_11_GOLDEN_THREAD_EXECUTION_RESULTS_V0_1.md`

Twenty threads cover:

- ordinary material without package;
- subcontract tender;
- imported long-lead equipment;
- addendum/revision;
- rejection/re-tender;
- AwardDecision/manual handoff/P07 off;
- Commitment/claim/certification;
- variation/advance/retention/recovery;
- compliance expiry;
- communication-gated effect;
- incomplete-history migration;
- connector indeterminate effect;
- closed-period correction;
- security release;
- report restatement/reliance;
- partial/restricted metric;
- buyer-on-behalf response;
- untrusted import;
- outage/restore;
- optional AI with incomplete context/AI-off.

Internal paper execution result:

`PASS — zero architecture invention across all twenty threads.`

This is not build or external validation.

---

# 10. Requirements and watch traceability

Controlling files:

- `P1_11_MASTER_REQUIREMENT_TRACEABILITY_MATRIX_V0_1.md`
- `P1_11_WATCH_OPEN_DEBT_RECONCILIATION_V0_1.md`
- `02_research/control/adr_log.csv`

The matrix consolidates 92 load-bearing requirements:

- 66 fully traced;
- 17 requiring physical proof under frozen semantics;
- 6 requiring external validation;
- 1 legal evidence item;
- 1 non-SPINE detailed deferral;
- 0 architecture gaps.

All W-14–W-91 have explicit closed/build/validation/legal dispositions.

Open mandatory external evidence:

- FT-02;
- FT-06;
- FT-09/CR-02;
- FT-10;
- beachhead and supplier UX hypotheses;
- prototype comprehension;
- build/NFR/AI/pilot/commercial gates.

Open legal/evidence debt:

- ADR-0010 exact GCC/statutory/rate/formality/retention/localization obligations.

Open non-SPINE detail:

- ADR-0011 suspense/attribution operating mechanics inside frozen visibility/resolution boundaries.

---

# 11. Permitted physical decisions

Phase 2/build design may choose:

- language and application/framework architecture;
- physical service/module boundaries;
- database/event-store/outbox/queue/search/cache/object storage;
- schemas/indexes/partitioning/concurrency strategy;
- cloud/region/topology/failover;
- authentication/identity vendor;
- email/connector/provider implementations;
- observability/security toolchain;
- renderer/export/file-processing technology;
- AI provider/model/runtime;
- endpoint syntax and serialization;
- page layout/routes/components/design system;
- automated test tools.

Every physical choice must prove preservation of:

- canonical identity and ownership;
- historical/effective/configuration versions;
- one writer/authority;
- operation/guard/idempotency/effect/recovery;
- evidence/reliance/issue semantics;
- commercial effect/correction/conservation;
- metric population/time/quality/use/restatement;
- interaction disclosure/confirmation/continuation/accessibility;
- NFR durability/security/privacy/residency/lifecycle;
- AI registry/context/evaluation/authority/isolation;
- A0–A3 no-dependency floor.

Physical choices cannot introduce a new truth writer or independent XL.

---

# 12. Ordered validation and build gates

## V0 — Architecture closure

P1.11 dual hostile PASS and final master specification.

## V1 — Primary contractor/supplier evidence

Before irreversible build-scope commitment:

- ≥5 contractor participants from ≥3 organizations, including ≥3 UAE beachhead-adjacent;
- ≥10 supplier participants, including ≥5 UAE-active and diverse role/digital/language profiles;
- target FT-02, FT-06, FT-09/CR-02 and FT-10;
- independent recorded ValidationGateDecision with revise/kill authority.

## V2 — Prototype comprehension

Before non-throwaway thin slice:

- ≥8 internal and ≥8 external users;
- zero critical meaning misunderstandings in final qualifying round;
- accessibility/mobile/Arabic/RTL and external receipt/submission meaning included.

## V3 — Deterministic A0–A3 thin slice

- no AI dependency;
- no named connector prerequisite;
- zero architecture invention;
- restore/load/isolation/NFR instrumentation;
- first-live-tender onboarding target evaluated.

## V4 — P07 feasibility

Separate proof before P07 build or commercial commitment.

## V5 — NFR verification

Verify the exact declared envelope and conformance rules.

## V6 — AI capability gates

Per capability: deterministic/manual path, sufficient evaluation, adversarial test, shadow and controlled pilot.

## V7 — Controlled live pilot

- ≥2 contractors;
- ≥3 tenders each;
- ≥10 suppliers;
- first-live-tender target ≤5 working days from clean inputs;
- supplier completion hypothesis ≥80% without buyer transcription except chosen buyer-capture path.

## V8 — Commercial/release decision

Report architecture, external evidence, build, NFR, AI, pilot and commercial evidence separately. Results may revise or kill hypotheses.

---

# 13. Build decomposition entry contract

After final P1.11 dual PASS, Phase 2 may decompose this architecture into build instructions.

A build instruction chunk must identify:

- requirement IDs;
- accepted ADRs/frozen clauses;
- subjects/facts/events/operations;
- authority/evidence/guards/effects/corrections;
- API/surface/report ownership;
- NFR/security/privacy/residency obligations;
- golden threads/acceptance tests;
- dependencies and rollback;
- external validation status;
- prohibited reinterpretations.

An implementation agent may ask physical-design questions, but an architecture question is a failed decomposition gate and must return to controlled reconciliation.

Phase 2 decomposition is not permission to start product code unless separately authorized after V1/V2 sequencing decisions.

---

# 14. Current validation status

## Internally complete

- P1.0–P1.10 frozen architecture;
- canonical ADR log through ADR-0048;
- 92-requirement traceability matrix;
- W-14–W-91 reconciliation;
- action/surface/API/report catalogue;
- twenty golden-thread paper execution.

## Still pending before Phase 1 closure

- internal artifact/no-invention recheck after this master candidate;
- independent fresh-review execution of at least two complex threads;
- Claude P1.11 hostile audit;
- final master-spec freeze, final verdict and checkpoint.

## Explicitly not complete

- primary contractor/supplier validation;
- prototype comprehension;
- product build;
- P07 feasibility build proof;
- NFR physical verification;
- AI evaluation/activation;
- live pilot;
- commercial/market validation.

---

# 15. Candidate closure claim

The current candidate claims:

- all load-bearing business meaning is frozen;
- all twenty representative threads execute on paper without architecture invention;
- no action/surface/API/report ownership gap remains;
- no numbered watch remains an architecture blocker;
- no second XL or hidden truth writer exists;
- all remaining uncertainty is physical proof, external validation, legal evidence or non-SPINE detail with explicit blast radius.

This claim must be attacked by the P1.11 internal no-invention audit and independent Claude review before Phase 1 closes.