# Construction Procurement OS — P2.2 Build Program v1.0 Candidate

**Date:** 2026-08-02  
**Status:** STANDALONE FREEZE CANDIDATE / INDEPENDENT HOSTILE PASS PENDING  
**Major blocks:** 18  
**Phase 1:** FROZEN  
**Code:** LOCKED

---

# 1. Governing rule

Each block is a bounded, independently gateable implementation unit. A block may use several coding prompts, but it closes only through one final `BlockCompletionEvidenceManifest` PASS.

Every block inherits:

- Phase 1 frozen master package;
- P2.1 Physical Architecture v1.0 Candidate;
- Invariant Register and Frozen-Clause Coverage Matrix;
- exact ownership/concurrency/effective-period rules;
- current authorization locks.

No block may answer a semantic or load-bearing physical protocol question by implementation convenience.

Prompts after B01 are generated just in time from the actual predecessor implementation/evidence.

---

# 2. Dependency graph

```text
B01 Engineering Foundation
 └─ B02 Platform Kernel
     └─ B03 Async/Event/Publication/Reconciliation
         └─ B04 Evidence/Files/Issued Artifacts/Communication
             └─ B05 Requirements/Allocation
                 └─ B06 Sourcing/RFQ/Response Schema/Grants/Issue
                     └─ B07 Supplier Submissions/Revisions/Buyer Capture
                         └─ B08 Normalization/Comparison
                             └─ B09 Recommendation/Approval/AwardDecision/Handoff
                                 ├─ B10 Internal Conventional Web
                                 └─ B11 External Secure Tasks
                                     └─ B12 Reporting/Controls/Search/Export
                                         └─ B13 Integration/Migration/Provider-Neutral Email
                                             └─ B14 NFR/Security/Restore/Release Hardening
                                                 └─ B15 Deterministic A0–A3 Validation/Pilot Instrumentation
                                                     ├─ B16 P07 Commitment/Change Baseline [V4]
                                                     │   └─ B17 P07 Claims/Certification/Correction/Reporting [V4]
                                                     └─ B18 AI Capability Substrate/Capabilities [V6]
```

B10 and B11 may develop in parallel only after stable B09 transport/operation/disclosure contracts. B12 closes after both.

B14 consolidates full-system proof; every predecessor already owes local security/NFR evidence.

---

# 3. B01 — Engineering Foundation & Runtime Skeleton

Objective:

- reproducible monorepo, four deployable shells, local infrastructure, migrations, observability, CI, architecture/invariant/concurrency validators and completion evidence;
- no product/business behavior.

Owns:

- exact runtime/package/version manifest;
- TypeScript/pnpm/project boundaries;
- API/worker/internal/external shells;
- PostgreSQL migration/transaction foundation;
- test-only concurrency/effective-period/guard fixtures;
- InvariantRegister/FrozenClauseCoverage/WriteOwnership/ConcurrencyProfile/ReleaseCompatibility validators;
- exact numeric/int8 boundary;
- object/scanner adapters;
- OpenTelemetry;
- tests/CI/containers/SBOM/security;
- F1–F5 checkpoints.

Excludes tenants, auth, operations, evidence acceptance, procurement, reports, P07 and AI.

Gate:

- clean build/start/test;
- negative/positive architecture and completeness fixtures;
- real PostgreSQL isolation/write-skew/effective-period/deadlock tests;
- exact-type tests;
- scoped rollback;
- independent review.

---

# 4. B02 — Platform Kernel

Objective:

- create the only legal execution substrate before business tables exist.

Owns:

- tenant/project/legal entity/principal/session/context;
- role/delegation/DOA/external-grant primitives;
- `withExecutionContext`, FORCE RLS and runtime/migration roles;
- immutable InvariantRegisterVersion and coverage activation;
- object/operation reverse-mapping compiler;
- effective-dated family inventory;
- OperationRegistry and QUERY/PROPOSAL/COMMAND/ASYNC envelopes;
- idempotency, continuation, preview, confirmation and typed outcome;
- CC-1–CC-5 and global guard ranks/key encoding;
- expected-version/guard/constraint/retry framework;
- audit/security separation;
- governed bootstrap operations.

Gate:

- hostile pooled RLS/isolation;
- register completeness failures;
- effective-period exclusion/reference profiles;
- command duplicate/lost-result/confirmation/continuation;
- no raw mutation;
- one owner per mutable kernel object.

---

# 5. B03 — Async, Event, Publication and Reconciliation Kernel

Owns:

- domain events/outbox/jobs/attempts;
- PublicationIntent/TransportAttempt/ExternalObservation/EffectPosition;
- seven effect stages;
- worker lanes/leases/heartbeats/fencing/fairness/tenant quotas;
- dead-letter/quarantine/accepted unresolved variance;
- status/result lookup and reconciliation;
- versioned job/event readers.

Gate:

- crash before/after commit and possible transmission;
- no duplicate effect;
- stale-worker fencing;
- indeterminate cannot ordinary-retry;
- queue fairness/load at block envelope.

---

# 6. B04 — Evidence, Files, Issued Artifacts and Communication

Owns:

- UploadSession state machine;
- object adapter/quarantine/checksum/MIME/archive/malware/parser observations;
- EvidenceRecord/Version/SourceLocator/Binding/Reliance;
- orphan/missing payload reconciliation;
- ArtifactBuildIntent/IssuedArtifactVersion/member manifest;
- Transmittal/Message/CommunicationOccurrence;
- canonical satisfaction snapshot and owning-domain establishment seam;
- holds/redaction/disposition/RecoverySetManifest;
- manual upload/download.

Gate:

- cross-store crash/restore matrix;
- no state implication beyond exact acknowledgment;
- issued bytes immutable;
- callback correction cannot write domain truth;
- hostile files/parsers.

---

# 7. B05 — Requirements and Allocation

Owns:

- authorized requirement sources;
- RequirementAllocation lifecycle and conservation;
- AuthorizedRequirementBasis guard rows;
- optional ProcurementPackage;
- evidence/authority/version bindings;
- amendment/supersession;
- allocation controls.

Gate:

- no universal case/package root;
- concurrent allocation cannot exceed authorized quantity;
- no double allocation;
- package removal preserves lineage.

---

# 8. B06 — Sourcing, RFQ, Response Schema, Grants and Issue

Before issue, owns exact:

- sourcing route/event/member/addendum/version;
- supplier relationship/contact selection;
- response schema version;
- RegisteredSemanticFieldKeys;
- mandatory/optional groups and attachments;
- enum/reference versions;
- ExternalSubmissionAcceptancePolicy;
- event/member/schema compatibility;
- invitations/addressee/channel/calendar;
- ExternalTaskGrant issue/revoke/transfer;
- immutable issue artifact/communication basis;
- manual/file/no-account path.

Gate:

- schema/acceptance active before issue;
- grant forwarding does not transfer authority;
- stale issue blocked;
- no supplier account or connector required.

---

# 9. B07 — Supplier Submissions, Revisions and Buyer Capture

Owns:

- source submission/revision identity;
- actor assurance and exact event/member/schema/grant versions;
- closed dispositions including late/withdrawn/superseded/quarantined;
- buyer-on-behalf capture with source attribution;
- receipt population-entry/non-meaning;
- structured file round trip;
- attachment evidence links.

Gate:

- only valid/allowed-late response enters population;
- receipt never implies compliance/award/Commitment;
- revision never overwrites source history.

---

# 10. B08 — Normalization and Comparison

Owns:

- source-preserving cited normalization proposals;
- UOM/money/currency/rate/date/enum transformations;
- product exact-decimal executor use;
- buyer evaluation adjustment;
- comparison compatibility/population/exclusions/limitations;
- supplier-confirmed contractable basis;
- comparison views/exports.

It consumes B06 semantic field/schema versions and cannot redefine source response meaning retroactively.

Gate:

- arbitrary tenant field/form/formula rejected;
- free text remains evidence;
- incompatible versions block/segment/map;
- exact money/property tests;
- source/normalized/adjusted/confirmed layers remain distinct.

---

# 11. B09 — Recommendation, Approval, AwardDecision and Handoff

Owns:

- recommendation/supporting basis;
- approval/conditional approval/revision invalidation;
- DOA/delegation checks;
- AwardDecision distinct from Commitment;
- rejection/re-tender;
- immutable handoff package/manual external handoff;
- decision/handoff registers.

Gate:

- approval cannot create AwardDecision/Commitment;
- changed proposal invalidates approval;
- deterministic A0–A3 completes with P07/connectors/AI off.

---

# 12. B10 — Internal Conventional Web

Owns:

- context-aware internal shell/navigation/tasks/queues;
- requirement/tender/response/comparison/approval/award/handoff surfaces;
- exact preview/confirmation/continuation/outcome;
- indeterminate/partial/bulk recovery;
- evidence/artifact views;
- mobile/RTL/accessibility;
- no chat dependency.

Gate:

- Playwright golden flows;
- keyboard/focus/error/status/RTL/mobile;
- no automatic command replay;
- limitation/disclosure parity.

---

# 13. B11 — External Secure-Task Participation

Owns:

- opaque grant-token exchange and scoped external session;
- secure task, response/revision, upload, receipt/status;
- optional tenant/buyer workspace boundary;
- email/file/manual fallback coordination;
- mobile/RTL/accessibility/help/decline;
- no internal bundle/data and no account requirement.

Gate:

- forwarding/replay/expiry/revocation/transfer tests;
- receipt/disposition parity;
- no persistent account/network.

---

# 14. B12 — Reporting, Controls, Search and Export

Owns:

- product metric/operator/materiality/use registry;
- populations/contribution/time/actual/quality/use;
- block/subset/range;
- exact source-cut modes;
- report execution/snapshot/issue/restatement/reliance;
- PostgreSQL search/access filtering;
- control observations/queues;
- mandatory A0–A3 report pack;
- export manifests/limitation parity;
- ArabicSearchRelevanceDecision.

Gate:

- restricted not absent, subset not total, range not point;
- report immutable;
- derived store cannot write truth;
- source cut reconstructable;
- search/export tenant access.

---

# 15. B13 — Integration, Migration and Provider-Neutral Email

Owns:

- connector profiles/authority mappings/versions;
- outbound/inbound adapters;
- provider-neutral email send/status lookup;
- observation admission/quarantine;
- cutover/conformance/reconciliation;
- migration class/manifest/acceptance profile;
- incomplete-history reference paths;
- manual fallback.

Gate:

- timeout/absence never no-effect;
- connector nonconformance affects future eligibility only;
- migration cannot fabricate state/balance/history;
- A0–A3 runs with adapters disabled.

---

# 16. B14 — NFR, Security, Restore and Release Hardening

Consolidates but does not replace predecessor evidence.

Owns:

- full SLI/measurement-health instrumentation;
- load/capacity/resource lanes;
- session/revocation/rate/quota controls;
- PostgreSQL/object backup/PITR/RecoverySetManifest restore;
- residency/lifecycle/hold/tombstone proof;
- ReleaseCompatibilityManifest deployment/rollback/drain;
- vulnerability/SBOM/provenance/secrets/incident controls;
- logging/privacy tests and runbooks.

Gate:

- declared C0/C1/C2 conformance;
- semantic RPO0 crash/failover;
- end-to-end restore/golden replay;
- standard or explicit lower verified envelope;
- no sensitive telemetry leak.

---

# 17. B15 — Deterministic A0–A3 Validation and Pilot Instrumentation

Owns:

- V1/V2 evidence and prototype capture;
- onboarding/first-tender and supplier completion instrumentation;
- deterministic golden-thread pack;
- pilot configuration/export/support tools;
- ValidationGateDecision evidence;
- authorized pilot release candidate.

Gate:

- zero architecture invention;
- V1/V2 sequencing/authorization recorded;
- A0–A3 complete without optional systems;
- architecture/build/pilot/commercial claims remain separate.

---

# 18. B16 — P07 Commitment and Change Baseline [V4]

Requires B15 + V4 PASS.

Owns:

- Commitment/components/obligations;
- ScopeBasis/ValuationBasis/CapabilityProfile;
- CommercialEffectVector and exact money;
- purchase/subcontract/call-off/service profiles;
- amendments/variations/instructions/advance/retention/recovery;
- attribution/suspense;
- minimum-credit, economic-lineage and exclusive-scope concurrency profiles.

Gate:

- one value once;
- AwardDecision remains distinct;
- no actual-family substitution.

---

# 19. B17 — P07 Claims, Certification, Correction and Reporting [V4]

Owns:

- claim/assessment/certification;
- retention/security release/call;
- advance/buyer recovery;
- closed-period correction and actual-family separation;
- P07 reports/restatement/reliance;
- external accounting handoff/reconciliation.

Gate:

- immutable correction/conservation;
- history/current position/report consistency;
- external posting/payment remain separate.

---

# 20. B18 — AI Capability Substrate and First Capabilities [V6]

Requires B15 + capability-specific V6 PASS.

Owns:

- capability/source/provider/evaluation registries;
- run/proposal/context/resource lineage;
- tenant-isolated retrieval namespace;
- monotonic configuration;
- L1–L5 bounded operation interfaces;
- evaluation/shadow/pilot tooling;
- AI-off/manual fallback.

Gate:

- current SUFFICIENT_PASS;
- no cross-tenant/provider-training influence;
- product-owned prompt/tool/authority;
- deterministic product complete with AI removed.

---

# 21. Traceability and invariant ownership

- MR-001–MR-092 primary blocks: 92/92;
- invariant/non-state dispositions: 92/92;
- registered invariant families with block owners: 102/102;
- physical-proof rows with proof blocks: 19/19;
- external-validation rows with gates: 5/5;
- legal/non-SPINE rows with owner: all;
- unresolved architecture gaps: 0 claimed.

Every block maps:

`MR/frozen clause → INV/non-state disposition → objects/operations → enforcement/test → completion evidence`.

---

# 22. Block Completion Evidence Manifest

Every final block manifest records:

- block/prompt/commit identity;
- builder and independent reviewer(s);
- frozen requirements/ADRs/clauses;
- predecessor PASS manifests and authorization;
- delivered apps/modules/objects/migrations/APIs/operations/events/surfaces/reports;
- InvariantRegister and coverage versions;
- changed objects/operations and reverse invariant mappings;
- effective-period overlap dispositions;
- concurrency profiles/guards/constraints/lock order/tests;
- write ownership/RLS/catalog scan;
- compatibility/exact-type/calculation/source-cut evidence;
- local security/NFR/rollback/restore evidence;
- exact commands/artifacts;
- hostile scenarios;
- unresolved questions and invariant candidates;
- final PASS/FAIL and project-owner acceptance.

Required assertion:

`No frozen or newly encountered load-bearing invariant is implemented without an InvariantRegisterVersion entry. Every changed mutable object and state-changing operation reverse-references all participating invariants.`

Successor unlock requires final PASS, not an internal checkpoint.

---

# 23. Prompt sizing and authorization

Expected implementation prompts:

- B01–B04: 2–4 each;
- B05–B09: 2–5 each;
- B10–B13: 3–6 each;
- B14–B15: 3–6 each;
- B16–B18 estimated only after V4/V6 authorization.

Only B01 prompt is prepared now. Later prompts use actual predecessor evidence.

Execution of B01 remains locked until:

1. independent Phase 2 freeze PASS;
2. P2.1/P2.2 final checkpoint;
3. explicit implementation authorization;
4. recorded V1/V2 sequencing decision.