# P1.11 — Architecture & Traceability Index v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE VALIDATION INDEX  
**Purpose:** give a fresh builder/reviewer one canonical map from scope and evidence to frozen semantics, operations, reports, interactions, NFRs and validation gates.

---

# 1. Precedence

1. Final Phase 1 frozen master specification once issued.
2. Phase-specific frozen contracts and final checkpoints.
3. Accepted ADR log entries.
4. Phase-specific reconciliation and watch-closure artifacts.
5. Requirements/evidence/control registers.
6. Candidate/research/audit artifacts where not superseded.

An audit verdict or candidate clause cannot override a later frozen contract.

---

# 2. Canonical phase map

## P1.0 — Research control

Controls:

- evidence/source/assumption/question/contradiction/requirement/ADR/change registers;
- evidence grading and freeze/change rules;
- traceability and no-hidden-assumption discipline.

## P1.1 — Thesis, beachhead and release boundary

Frozen:

- UAE private-sector contractor procurement/commercial beachhead;
- 84 controlled scope areas;
- SPINE/THIN/INTERFACE-ONLY/OUT boundaries;
- P07 sole independent XL;
- first-live-tender target ≤5 working days;
- zero named-connector prerequisite;
- explicit V1 exclusions.

## P1.2 — Primary workflow evidence

Controls:

- contractor/supplier workflow/artifact evidence;
- source → normalized → buyer adjustment → supplier-confirmed comparison grammar;
- open fieldwork FT-02, FT-06, FT-09/CR-02, FT-10;
- unmodelled observation and contradiction handling.

## P1.3 — Competitor reconstruction

Controls:

- incumbents as evidence, not ontology;
- object/state/permission/integration/UX observations;
- unknowns explicit;
- competitor claims never outrank primary evidence.

## P1.4 — Boundary, ownership and tenancy

Canonical:

- `P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`

Frozen:

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing fact/event grain;
- one authoritative source/writer per effective period;
- product commercial truth ≠ external accounting truth;
- no connector/report/workflow/AI authority;
- effective-dated authority/configuration;
- tenant-private supplier relationships;
- residency/governed migration;
- cross-tenant business influence OUT by default;
- bounded-operation-only mutation.

## P1.5 — Commercial core

Canonical:

- `P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`

Frozen:

- polycentric graph, no universal ProcurementCase/Package root;
- RequirementAllocation owns scope consumption only;
- AwardDecision ≠ Commitment;
- one semantic Commitment core;
- ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile;
- COMPONENT versus OBLIGATION effect subject;
- closed CommercialEffectVector;
- exact money/FX/tax/calculation policy;
- claim ≠ assessment ≠ certification;
- physical ≠ commercial/certified ≠ accounting-posted ≠ paid actual;
- immutable history-preserving correction;
- workflow/evidence/integration/AI never commercial writer;
- P07 sole XL.

Open bounded debt:

- ADR-0010 exact GCC/statutory/rate evidence;
- ADR-0011 detailed attribution/suspense operation.

## P1.6 — Evidence, document and communication

Canonical:

- `P1_6_FROZEN_EVIDENCE_DOCUMENT_COMMUNICATION_MODEL_V1_0.md`

Frozen:

- EvidenceRecord/EvidenceVersion/content-integrity/source/capture/location/binding/reliance distinctions;
- exact reconstruction anchors;
- immutable issued artifact/member set;
- source/normalized/evaluation/confirmed/issued layers;
- issue ≠ dispatch ≠ provider accepted ≠ delivery ≠ read ≠ acknowledgment ≠ content response ≠ domain effect;
- communication-gated effect only through bounded domain establishment;
- evidence correction/retraction cannot silently reverse domain truth;
- retention/redaction/disposition/hold with preserved meaning;
- external content is untrusted data.

## P1.7 — Integration, migration and API

Canonical:

- `P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`

Frozen:

- OperationRegistry with QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- proposal non-authority;
- stable invocation/logical/async/publication/transport identities;
- current authority and exact result/recovery;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- immutable PublicationIntent;
- effect stages PRE_ACCEPTANCE / ACCEPTED_PRE_EFFECT / EFFECT_INDETERMINATE / EXTERNAL_EFFECT_EMITTED / DOMAIN_EFFECT_ESTABLISHED / TERMINAL_NO_EFFECT / PARTIAL_EFFECT;
- no ordinary retry under possible effect;
- ConnectorProfile/AuthorityMapping/conformance/cutover/reconciliation;
- migration class, manifest, acceptance profile and limitation;
- provider-neutral/manual/file/email floor;
- future chat/agents use the same operations.

## P1.8 — Reporting, analytics and control

Canonical:

- `P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`

Frozen:

- MetricDefinition/Projection/Result/ReportSnapshot/Artifact identities;
- restricted deterministic metric grammar;
- contribution occurrence/economic lineage/conservation/disposition;
- declared/evaluated/restricted population and denominator;
- complete/subset/range/missing/unknown value states;
- physical/commercial/accounting/cash actual separation;
- effective/recorded/as-of/known-at time;
- full quality vector and use assessment;
- report-level use composition and current subsequent reliance;
- immutable issued snapshots/restatement/reconstruction;
- target-scope aggregation, anti-double-count, currency/time/access comparability;
- tenant-private supplier performance and non-authoritative controls;
- no reporting/BI truth writer;
- A0–A3 report pack without connector/AI/P07.

## P1.9 — User experience and interaction

Canonical:

- `P1_9_FROZEN_USER_EXPERIENCE_INTERACTION_MODEL_V1_0.md`

Frozen:

- six interaction classes and no hidden commands;
- exact preview, principal-bound confirmation and typed outcome;
- retrievable continuation anchor before effect-bearing transmission;
- four bulk execution modes;
- polycentric navigation/tasks/queues, no case root;
- approval/DOA/delegation distinct from domain effect;
- bounded hybrid external participation, no account/network prerequisite;
- ExternalTaskGrant, actor assurance, response disposition and receipt meaning;
- product-owned typed field/schema registry and source-to-normalized bounded command;
- immutable evidence/communication distinctions;
- load-bearing disclosure placement and export/chat parity;
- current/issued/restated and subsequent reliance;
- typed error/recovery/offline/manual fallback;
- WCAG 2.2 AA target, mobile/Arabic/RTL;
- complete conventional no-chat/no-AI A0–A3.

## P1.10 — NFR and AI-readiness residual

Canonical:

- `P1_10_FROZEN_NONFUNCTIONAL_AI_READINESS_RESIDUAL_V1_0.md`

Frozen:

- measurable NFR grammar and finite workload envelopes;
- criticality/conformance/measurement health;
- performance/availability/durability/RTO/RPO/restore/degradation;
- telemetry/audit/domain separation;
- security/privacy/residency/lifecycle/file/quota/deployment contracts;
- product-owned AICapabilityRegistry;
- tenant narrower-only configuration and monotonicity proof;
- product-owned source/provider admission;
- AI run/proposal/context/coverage/uncertainty/evaluation/resource identities;
- L0–L6, no generative L6/general autonomous commercial agent;
- canonical human-confirmed L5 command digest;
- intersection-only sub-agent authority;
- tenant-isolated retrieval/memory/provider and AI-off floor;
- ordered architecture/evidence/prototype/build/P07/NFR/AI/pilot/commercial gates;
- explicit anti-platform/second-XL refusal.

---

# 3. Cross-cutting registries

## 3.1 Authority registry

Every load-bearing action/fact identifies:

- tenant/project/ContractingAuthorityContext;
- acting and represented principal;
- internal role/delegation/DOA or external task grant;
- authoritative owner and source;
- governing policy/configuration version;
- current eligibility;
- historical binding.

## 3.2 Subject/fact registry

Minimum subject families:

- tenant/legal entity/business unit/project/context;
- internal/external identity, supplier relationship and grant;
- requirement source, RequirementAllocation and optional ProcurementPackage;
- tender/RFQ/event/member/invitation;
- supplier source submission/revision;
- normalized representation/evaluation adjustment/confirmed basis;
- recommendation/approval/AwardDecision;
- Commitment and P07 effect subjects where activated;
- evidence/version/location/reliance;
- communication/transmittal/occurrence;
- connector/mapping/observation/publication/migration;
- metric/projection/report/snapshot/control observation;
- operation/invocation/continuation/outcome;
- AI capability/run/proposal/context/evaluation.

No family is a universal end-to-end root.

## 3.3 Operation registry

Every state-changing step maps to one registered COMMAND or ASYNC_OPERATION. Read/draft work maps to QUERY/PROPOSAL. Each operation binds:

- versioned key/class;
- authority and execution mode;
- exact target/member versions;
- inputs/guards/evidence/configuration;
- expected version/causal precondition;
- consequence and explicit non-effect;
- idempotency/continuation;
- event/publication;
- result/effect stage;
- correction/recovery.

## 3.4 Evidence/communication registry

Every load-bearing value/action binds exact evidence version/location and reliance. Every external communication identifies exact issue member set, recipient/channel, occurrences and effect rule. Content/callback cannot write domain truth directly.

## 3.5 Commercial registry

Every economic contribution binds exact CommercialEffectVector, subject grain, currency/calculation policy, effective/recorded time, authority/evidence and correction lineage. One economic value contributes once.

## 3.6 Reporting registry

Every load-bearing metric/report binds definition/version, source authority, grain, population, contribution, time/actual family, calculation/FX, quality/use, access, source cut and restatement lineage.

## 3.7 Interaction registry

Every human/external/chat affordance binds interaction class, exact context, operation/presentation meaning, disclosure profile, confirmation/recovery and accessibility/mobile/localization behavior.

## 3.8 NFR/AI registry

Every capability binds workload/NFR conformance and, when AI-enabled, exact product capability, provider/profile, source/context/evaluation/resource/authority/AI-off contracts.

---

# 4. Accepted ADR groups

- Roadmap/control: ADR-0001–0002.
- Structural/commercial: ADR-0003–0004, ADR-0007–0009, ADR-0013, ADR-0015, ADR-0018–0024.
- Boundary/tenancy/evidence: ADR-0005–0006, ADR-0012, ADR-0014, ADR-0025–0028.
- Integration/migration/API: ADR-0029–0032.
- Reporting/analytics: ADR-0033–0037.
- UX/interaction/external participation: ADR-0016, ADR-0038–0041.
- NFR/AI/validation: ADR-0017, ADR-0042–0048.

Proposed/non-blocking:

- ADR-0010 exact GCC/statutory/rate semantics;
- ADR-0011 detailed attribution/suspense mechanics.

The canonical ADR log must be synchronized before P1.11 final closure.

---

# 5. Traceability chain

Every SPINE requirement must resolve:

`Requirement ID`
`→ evidence/source/assumption/contradiction basis`
`→ accepted ADR or frozen phase clause`
`→ canonical subject/fact/event/operation`
`→ interaction/API/report/NFR ownership`
`→ one or more golden threads`
`→ build acceptance test`
`→ external validation gate where applicable`

Allowed terminal statuses:

- FULLY_TRACED;
- PHYSICAL_DECISION_DEFERRED_WITH_FROZEN_CONTRACT;
- EXTERNAL_VALIDATION_REQUIRED;
- LEGAL_EVIDENCE_REQUIRED;
- NON_SPINE_DEFERRED_WITH_NON_IMPACT_PROOF;
- BLOCKED_ARCHITECTURE_GAP.

No SPINE item may close as UNKNOWN, TBD or implied.

---

# 6. Build-facing deferred decisions

Physical design may select:

- language/framework;
- database/event/outbox/queue/search/object-storage technology;
- cloud/region/topology;
- identity/authentication vendor;
- email/provider/connector implementations;
- observability/security tooling;
- renderer/export technology;
- AI provider/model/runtime;
- exact physical schemas/indexes/caches;
- test automation technology.

Physical choices must preserve every frozen semantic identity, authority, version, population, effect, correction, recovery, disclosure, conformance and validation contract.

---

# 7. Architecture-question rule

During golden-thread execution, any question of the following form is a P1.11 failure until resolved:

- Which object owns this fact?
- Does this action write truth or create a proposal?
- Which authority applies?
- Which state/effect follows?
- What happens on duplicate, timeout, partial or unknown effect?
- Which evidence/version supports it?
- How is it corrected/reversed/restated?
- Which report population/time/actual family applies?
- Which interaction/confirmation/recovery is required?
- What NFR/security/residency contract applies?
- Can AI act or must it abstain?

Questions limited to permitted physical implementation choices are not architecture failures.