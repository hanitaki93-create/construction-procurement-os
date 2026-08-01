# Construction Procurement OS — P2.2 Build-Block Dependency Graph v0.1

**Date:** 2026-08-02  
**Status:** INTEGRATED DECOMPOSITION CANDIDATE / INTERNAL AUDIT PENDING  
**Phase 1:** FROZEN  
**P2.1:** INTERNAL PASS / EXTERNAL AUDIT PENDING  
**Code:** LOCKED

---

# 1. Decomposition rule

Each block is a major, independently gateable implementation unit. A block may use several coding prompts, but it closes only when its major-block acceptance gate passes.

Every block inherits:

- frozen Phase 1 master package;
- P2.1 physical architecture candidate v0.2;
- exact module ownership and no-narrowing rules;
- code/authorization status in `PROJECT_STATE.md`.

No block may answer an architecture question by implementation convenience.

---

# 2. Final major-block count

**18 major blocks**:

- 15 deterministic foundation/A0–A3/release blocks;
- 2 separately gated P07 blocks;
- 1 separately gated AI block.

This is large enough to preserve ownership and recovery gates, but small enough to avoid hundreds of disconnected prompts.

---

# 3. Dependency graph

```text
B01 Engineering Foundation
 └─ B02 Platform Kernel: Tenancy, Authority, Operations, Idempotency, Audit
     └─ B03 Async/Event/Publication/Reconciliation Kernel
         └─ B04 Evidence, Files, Issued Artifacts & Communication Primitives
             └─ B05 Requirements & Allocation
                 └─ B06 Sourcing Events, RFQs, Invitations, Grants & Issue
                     └─ B07 Supplier Submissions, Revisions & Buyer Capture
                         └─ B08 Field/Schema Registry, Normalization & Comparison
                             └─ B09 Recommendation, Approval, AwardDecision & Handoff
                                 ├─ B10 Internal Conventional Web Application
                                 └─ B11 External Secure-Task Participation
                                     └─ B12 Reporting, Controls, Search & Export
                                         └─ B13 Integration, Migration & Provider-Neutral Email
                                             └─ B14 NFR, Security, Restore & Release Hardening
                                                 └─ B15 Deterministic A0–A3 Validation/Pilot Instrumentation
                                                     ├─ B16 P07 Commitment & Change Baseline [V4 GATED]
                                                     │   └─ B17 P07 Claims, Certification, Correction & Reporting [V4 GATED]
                                                     └─ B18 AI Capability Substrate & First Capabilities [V6 GATED]
```

B10 and B11 may develop in parallel after B09, but B12 closes only after both supply their disclosure/export/task-state contracts.

B14 obligations are implemented incrementally from B01 onward; B14 is the consolidation and proof block, not the first time security/NFR work appears.

---

# 4. Block contracts

## B01 — Engineering Foundation & Runtime Skeleton

Objective:

- create the reproducible monorepo, toolchain, deployable shells, local infrastructure and CI quality gates without business tables or business workflows.

Includes:

- Node 24 LTS/pnpm workspace/version manifest;
- TypeScript strict project references;
- `apps/api`, `apps/worker`, `apps/web-internal`, `apps/web-external`;
- package boundary conventions;
- Fastify health/readiness shell;
- React/Vite application shells;
- PostgreSQL 18 migration harness and local composition;
- S3-compatible/scanner adapter test services;
- OpenTelemetry bootstrap;
- lint/type/unit/integration/browser test harness;
- CI, SBOM/security baseline;
- architecture-dependency tests.

Excludes:

- tenant/business schemas;
- authentication;
- domain operations;
- evidence acceptance;
- product workflows.

Dependencies: none after P2.1/P2.2 freeze and V1/V2 execution authorization.

Gate:

- clean install/build/test from empty machine;
- all deployables start;
- migrations/bootstrap and test containers work;
- no forbidden cross-package dependency;
- no secrets/business logic.

## B02 — Platform Kernel: Tenancy, Authority, Operations, Idempotency & Audit

Objective:

- establish the only legal execution path before procurement modules exist.

Includes:

- tenant/project/legal-entity/principal/session/context foundations;
- role/delegation/DOA/external-grant primitives needed by later modules;
- `withExecutionContext` and fail-closed RLS;
- runtime/migration roles and ownership manifest foundation;
- OperationRegistry and dispatcher;
- QUERY/PROPOSAL/COMMAND/ASYNC_OPERATION envelopes;
- logical command/idempotency/continuation/preview/confirmation/outcome;
- expected-version/guard framework;
- audit/security records separated from telemetry;
- bootstrap administration through registered operations;
- reference test aggregate only for kernel proof.

Dependencies: B01.

Gate:

- hostile pooled-connection/RLS tests;
- same-principal confirmation and continuation tests;
- duplicate command returns same accepted result;
- no raw DB write path;
- every mutable kernel table has one owner.

## B03 — Async, Event, Publication & Reconciliation Kernel

Objective:

- create safe durable work and external-effect infrastructure before any module dispatches externally.

Includes:

- domain event/outbox/job/attempt tables;
- PublicationIntent/TransportAttempt/ExternalObservation/EffectPosition;
- seven effect stages;
- worker lanes, leases, heartbeats, fencing, fairness, tenant quotas;
- dead letter/quarantine/accepted unresolved variance;
- result/status lookup and reconciliation controls;
- crash/timeout/positive-no-effect protocols;
- versioned job/event readers.

Dependencies: B02.

Gate:

- crash at every pre/post-commit/transmission boundary;
- no duplicate external effect under lost response;
- stale worker fencing;
- indeterminate work cannot ordinary-retry;
- queue fairness/load proof at block envelope.

## B04 — Evidence, Files, Issued Artifacts & Communication Primitives

Objective:

- implement exact evidence identity/version/payload lifecycle and immutable issue/communication substrate.

Includes:

- UploadSession state machine;
- object adapter, quarantine, checksum, MIME/archive/malware states;
- EvidenceRecord/Version/SourceLocator/Binding/Reliance;
- orphan/missing payload reconciliation;
- ArtifactBuildIntent/IssuedArtifactVersion/member manifest;
- Transmittal/MessageEnvelope/CommunicationOccurrence;
- communication-satisfaction snapshot and owning-domain establishment seam;
- holds, redaction, disposition and RecoverySetManifest;
- manual upload/download paths.

Dependencies: B03.

Gate:

- cross-store crash/restore matrix;
- no upload status implies evidence acceptance;
- issued bytes immutable/reconstructable;
- callback correction cannot write domain truth;
- archive/malware/parser hostile tests.

## B05 — Requirements & Allocation

Objective:

- implement authorized requirement sources, scope lineage and optional package grouping.

Includes:

- requirement-source registry;
- RequirementAllocation lifecycle/conservation;
- optional ProcurementPackage;
- evidence and authority bindings;
- amendment/supersession without scope loss;
- allocation controls/report primitives;
- manual/file input.

Dependencies: B04.

Gate:

- GT-01/GT-03 allocation branches;
- no universal case/package root;
- no over-consumption/double allocation;
- package removal does not destroy lineage.

## B06 — Sourcing Events, RFQs, Invitations, Grants & Issue

Objective:

- create deterministic RFQ/tender preparation, issue and external-task authorization.

Includes:

- sourcing route/event/member/addendum/version lifecycle;
- supplier relationship/contact selection;
- registered response schema selection;
- invitation/addressee/channel freeze;
- ExternalTaskGrant issue/revoke/transfer;
- exact issue artifact and communication basis;
- deadlines/calendar versions;
- manual/file/no-account path.

Dependencies: B05.

Gate:

- GT-02/GT-04 issue/addendum branches;
- grant forwarding does not transfer authority;
- stale issue/template blocked;
- supplier participation requires no account or named connector.

## B07 — Supplier Submissions, Revisions & Buyer Capture

Objective:

- preserve source response truth across portal, email/file and governed buyer-on-behalf capture.

Includes:

- source submission/revision identity;
- actor assurance and exact task/schema/member versions;
- closed response dispositions;
- late/withdrawn/superseded/quarantined handling;
- buyer capture with source attribution;
- receipt population-entry/non-meaning;
- structured file round trip;
- attachment evidence links.

Dependencies: B06.

Gate:

- GT-04/GT-17/GT-18;
- only valid/allowed-late response enters population;
- receipt never implies compliance/award/Commitment;
- revision never overwrites source history.

## B08 — Field/Schema Registry, Normalization & Comparison

Objective:

- create product-owned typed meaning and deterministic bid-leveling without erasing source evidence.

Includes:

- RegisteredSemanticFieldKey/family/schema versions;
- finite group/constraint/compatibility policies;
- source-to-normalized cited proposal/acceptance;
- quantities/UOM/money/currency/rates/dates/enums;
- buyer evaluation adjustment;
- supplier-confirmed contractable basis;
- comparison population, exclusions and limitation states;
- comparison views/exports.

Dependencies: B07.

Gate:

- arbitrary field/form/formula/validator rejected;
- free text remains evidence;
- incompatible versions block/segment/map explicitly;
- exact-money/property tests;
- GT-01/02/04/18 comparison branches.

## B09 — Recommendation, Approval, AwardDecision & Handoff

Objective:

- complete deterministic A0–A3 authority and decision chain without P07.

Includes:

- recommendation and supporting basis;
- approval/conditional approval/revision invalidation;
- DOA/delegation checks;
- AwardDecision distinct from Commitment;
- rejection/re-tender;
- immutable handoff package/manual external handoff;
- decision/handoff registers;
- no-connector completion.

Dependencies: B08.

Gate:

- GT-02/05/06;
- approval cannot create AwardDecision or Commitment;
- changed proposal invalidates approval;
- A0–A3 completes with P07/connectors/AI off.

## B10 — Internal Conventional Web Application

Objective:

- expose complete internal A0–A3 through ordinary screens without UI-owned truth.

Includes:

- context-aware shell/navigation/tasks/queues;
- requirement, tender, response, comparison, approval, award and handoff surfaces;
- preview/confirmation/continuation/outcome flows;
- indeterminate/partial/bulk recovery;
- evidence and issued-artifact views;
- mobile/RTL/accessibility foundations;
- no chat dependency.

Dependencies: B09.

Gate:

- Playwright GT-01/02/05/06;
- keyboard/focus/error/status/RTL/mobile;
- no automatic consequential mutation retry;
- disclosure parity and same-principal confirmation.

## B11 — External Secure-Task Participation

Objective:

- deliver supplier/external participation without account/network dependency.

Includes:

- secure-link token exchange/session;
- task landing, response/revision, file upload, receipt/status;
- optional persistent tenant/buyer workspace boundary;
- email/file/manual fallback coordination;
- Arabic/RTL/mobile/accessibility;
- support/decline/help path.

Dependencies: B07 and B10 shell conventions; may develop in parallel with later B10 work.

Gate:

- GT-17/18;
- no internal route/data exposure;
- token forwarding/replay/expiry/revocation tests;
- receipt/disposition parity;
- no persistent account required.

## B12 — Reporting, Controls, Search & Export

Objective:

- implement deterministic projection/report/control layer over A0–A3.

Includes:

- product metric/operator registry;
- populations/contribution/time/actual/quality/use;
- block/subset/range;
- report execution/snapshot/issue/restatement/reliance;
- PostgreSQL search documents and access filtering;
- control observations/queues;
- mandatory A0–A3 report pack;
- export manifests and limitation parity.

Dependencies: B09, B10 and B11.

Gate:

- GT-15/16;
- restricted not absent, subset not total, range not point;
- issued snapshot immutable;
- derived store cannot write truth;
- search/export access and rebuild tests.

## B13 — Integration, Migration & Provider-Neutral Email

Objective:

- implement adapter/migration seams without making any provider a prerequisite or co-master.

Includes:

- ConnectorProfile/AuthorityMapping/mapping versions;
- outbound/inbound adapter contracts;
- provider-neutral email send/status lookup;
- observation admission/quarantine;
- cutover/conformance/reconciliation;
- migration class/manifest/acceptance profile;
- incomplete-history reference paths;
- manual fallback.

Dependencies: B12.

Gate:

- GT-11/12;
- timeout/absence never no-effect;
- adapter nonconformance changes future eligibility only;
- migration cannot fabricate state/balance/history;
- A0–A3 runs with all adapters disabled.

## B14 — NFR, Security, Restore & Release Hardening

Objective:

- prove the physical system against the frozen workload, durability, privacy and lifecycle contracts.

Includes:

- complete SLI/measurement-health instrumentation;
- capacity/load/resource lanes;
- session/revocation/rate/quota controls;
- PostgreSQL/object backup/PITR/RecoverySetManifest restore;
- residency/lifecycle/hold/tombstone proof;
- release/compatibility/rollback/drain;
- vulnerability/SBOM/provenance/secrets/incident controls;
- logging/privacy tests;
- operational runbooks.

Dependencies: B13; obligations applied incrementally earlier.

Gate:

- declared C0/C1/C2 conformance outcomes;
- semantic RPO0 crash/failover proof;
- end-to-end restore and GT replay;
- standard-envelope load or explicit lower verified envelope;
- no sensitive telemetry leakage.

## B15 — Deterministic A0–A3 Validation & Pilot Instrumentation

Objective:

- assemble the deterministic thin slice, field-validation instrumentation and controlled-pilot package without mislabeling architecture as market proof.

Includes:

- V1/V2 evidence/prototype capture tools;
- onboarding/first-tender instrumentation;
- supplier completion measurement;
- deterministic golden-thread pack;
- pilot configuration/data export/support tools;
- explicit ValidationGateDecision workflow/evidence pack;
- release candidate for authorized pilot.

Dependencies: B14.

Gate:

- zero architecture invention during thin slice;
- V1/V2 authorization evidence recorded;
- A0–A3 complete without optional systems;
- pilot/release claims remain separate.

## B16 — P07 Commitment & Change Baseline [V4 GATED]

Objective:

- implement the sole XL baseline only after separate feasibility authorization.

Includes:

- Commitment/components/obligations;
- ScopeBasis/ValuationBasis/CapabilityProfile;
- exact money and CommercialEffectVector;
- purchase/subcontract/call-off/service profiles;
- amendments/variations/instructions/advances/retention/recovery baseline;
- attribution/suspense mechanics within frozen boundaries.

Dependencies: B15 + V4 PASS.

Gate:

- GT-07/08 baseline;
- one value contributes once;
- AwardDecision remains distinct;
- no accounting actual substitution.

## B17 — P07 Claims, Certification, Correction & Reporting [V4 GATED]

Objective:

- complete claims/assessment/certification/security/correction/reconciliation and P07 reports.

Includes:

- claim/assessment/certification;
- retention release/security call/release;
- advance recovery/buyer recovery;
- closed-period correction and actual-family separation;
- P07 reports/restatement/reliance;
- external accounting handoff/reconciliation.

Dependencies: B16.

Gate:

- GT-07/08/13/14;
- immutable corrections and conservation;
- report/current position/history consistent;
- external posting/payment remain separate.

## B18 — AI Capability Substrate & First Capabilities [V6 GATED]

Objective:

- implement only separately evaluated product-owned capabilities over complete deterministic/manual paths.

Includes:

- capability/source/provider registries;
- run/proposal/context/evaluation/resource lineage;
- tenant-isolated retrieval namespace;
- monotonic configuration;
- L1–L5 bounded operation interfaces;
- evaluation/shadow/pilot tooling;
- AI-off/manual fallback.

Dependencies: B15 + capability-specific V6 PASS. P07 dependency only for capabilities that use P07.

Gate:

- GT-20;
- current SUFFICIENT_PASS;
- no cross-tenant/provider-training influence;
- no prompt/tool/authority tenant authorship;
- deterministic system remains complete with AI removed.

---

# 5. Prompt sizing

Expected implementation prompts per major block:

- B01–B04: 2–4 prompts each;
- B05–B09: 2–5 prompts each;
- B10–B13: 3–6 prompts each;
- B14–B15: 3–6 prompts each;
- B16–B18: separately estimated after their authorization.

Prompts are generated just in time. Later prompts may not assume a block passed until its acceptance evidence is committed.

---

# 6. Authorization state

This graph authorizes decomposition and prompt preparation only.

Execution of B01 remains locked until:

- P2.1/P2.2 external hostile PASS and freeze;
- explicit implementation authorization;
- ordered V1/V2 gate decision recorded.

P07 and AI remain independently gated regardless of B01 authorization.

---

# 7. Candidate gate claim

The graph claims:

- no circular architecture dependency;
- all 92 Phase 1 requirements and physical proof rows have an owning block;
- A0–A3 becomes complete by B15;
- optional P07/AI do not contaminate deterministic blocks;
- PA-G14 can PASS subject to internal/external audit.