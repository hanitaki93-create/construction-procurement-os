# P1.7 — Integration, Migration & API Contracts — Workplan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE WORKPLAN / P1.7 ONLY  
**P1.6:** PASS / CLOSED / FROZEN  
**P1.8+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Objective

Freeze the deterministic interface, integration, migration and extension contracts that let humans, internal services, files, email, external systems, automation and future agents interact with the frozen procurement/commercial/evidence substrate without changing its authority or historical meaning.

P1.7 is a **capability-neutral readiness phase**.

It does not promise that AI can reliably:

- convert every BOQ into correct procurement packages;
- generate a complete ready-to-issue RFQ autonomously;
- evaluate every supplier response;
- negotiate or approve commercial decisions;
- replace deterministic/manual work.

It must instead ensure that any future proven capability can be attached, replaced, reduced, disabled or removed without rewriting deterministic domain truth, evidence history or manual operability.

---

# 2. Governing principle — readiness now, capability claims later

P1.7 freezes interfaces and authority, not speculative intelligence.

Every supported meaningful operation should be invokable through the same bounded semantic contract whether initiated by:

- a human screen;
- an internal deterministic service;
- structured import;
- email/portal/CDE/ERP connector;
- a future conversational assistant;
- one specialized agent;
- several coordinated agents.

No initiator receives direct database/event-store mutation or more authority than the underlying bounded domain action.

The deterministic/manual path remains independently operable if AI capability is absent, disabled, unreliable, unaffordable or replaced.

---

# 3. Phase boundaries

## P1.7 owns

- bounded command/query/tool contracts;
- domain-event versus integration-event meaning;
- API/event identity, versioning, idempotency and retry semantics;
- connector authority/capability profiles;
- email/CDE/ERP/file/external-system interface meaning;
- import/export/migration and cutover contracts;
- conflict, staleness, reconciliation, quarantine and degradation semantics;
- asynchronous operation/result states;
- capability registration/exposure for future UI/chat/agents;
- provider-neutral email/message connector seam;
- future chat/agent access to bounded queries, proposals and commands;
- ADR-0006 V1 integration-depth decision.

## P1.7 does not own

- chat panel/navigation/confirmation UX — P1.9;
- agent decomposition/orchestration/planning/memory/confidence/autonomy — P1.10;
- model/vendor selection or prompt design — P1.10/later;
- physical API gateway/event bus/outbox/database/object-storage technology — implementation;
- named ERP/CDE/email connector selection unless evidence proves a bounded V1 choice;
- declaring unproven AI capability reliable;
- product code.

---

# 4. Capability-neutral extension model

P1.7 must support four operation classes.

## C1 — deterministic query

Returns authoritative facts/projections/evidence under current authorization.

Examples:

- RFQs awaiting responses;
- exact quote revision used for award;
- reason a supplier was excluded;
- expiring security obligations;
- unresolved communication/evidence/integration states.

## C2 — non-authoritative proposal or draft

Creates a versioned proposal/draft/derived observation that cannot change business truth until accepted through a bounded action.

Examples:

- proposed BOQ extraction;
- proposed package grouping;
- RFQ draft;
- comparison commentary;
- follow-up email draft;
- proposed supplier mapping.

## C3 — bounded domain command

Requests a governed state transition using the same authority, guards, evidence and idempotency whether invoked from UI, API, import, connector or future agent.

Examples:

- create ProcurementPackage from approved allocations;
- freeze TenderRelease;
- issue Transmittal;
- record supplier response revision;
- submit ApprovalCase;
- make AwardDecision effective.

## C4 — asynchronous/conditional operation

Starts or records work whose final result is pending external processing, bulk evaluation, communication satisfaction, migration or another delayed boundary.

It exposes accepted/pending/progress/completed/rejected/partial/quarantined/cancelled states without pretending queue acceptance equals business effect.

---

# 5. BOQ-to-RFQ readiness example

P1.7 must permit, without assuming full autonomy:

`source BOQ EvidenceVersion`
`→ read/extract operation`
`→ DerivedObservation(s) with exact SourceLocator`
`→ proposed normalized lines`
`→ proposed RequirementAllocation/package mapping`
`→ review/accept/correct through bounded actions`
`→ RFQ/TenderRelease draft`
`→ governed approval/issue`
`→ exact PRODUCT_ISSUED artifact/Transmittal`.

The same architecture must support:

1. fully manual processing;
2. deterministic parser assistance;
3. AI extraction only;
4. AI package proposals with human validation;
5. more autonomous future workflow if reliability is proven;
6. later removal/replacement of the model without ontology migration.

No proposal is relabelled authoritative merely because confidence is high.

---

# 6. Email and communication readiness

P1.7 must define provider-neutral contracts for:

- connecting a mailbox/account/channel under tenant authority;
- inbound message/attachment discovery or explicit capture;
- exact MessageEnvelope/EvidenceVersion preservation under P1.6;
- sender/source attribution and represented-principal context;
- tenant/project/tender/Commitment correlation;
- outbound issue of exact Transmittal/EvidenceVersion;
- dispatch/delivery/bounce/acknowledgment observations;
- reply/revision/thread correlation;
- retries without duplicate business issue/effect;
- connector degradation/revocation/reconsent;
- least-privilege scopes;
- no full-mailbox archive requirement;
- manual fallback when connector is unavailable.

P1.7 remains provider-neutral. Microsoft Graph, Gmail, SMTP or another provider may later implement the contract.

---

# 7. Conversational/chat readiness

P1.7 must make future chat possible without designing the final chat UX.

A conversational request resolves only into:

1. one or more bounded read/query operations;
2. a non-authoritative proposal/draft with provenance;
3. a bounded command request with ordinary authority/confirmation/guard requirements;
4. an explanation of a rejection/conflict/uncertainty using inspectable evidence and result contracts.

Chat/agent interfaces cannot:

- invent hidden operations;
- execute arbitrary SQL;
- bypass approval or authority;
- merge tenant context;
- treat generated text as source evidence;
- claim completion when an operation is pending/rejected;
- hide which bounded action/query was executed;
- become required for ordinary product operation.

P1.9 owns conversational interaction design. P1.10 owns agent reasoning/orchestration/confidence/autonomy.

---

# 8. Competitor and best-practice evidence workstream

Use current official documentation, not marketing claims alone, to study:

- SAP Ariba sourcing/event APIs, asynchronous jobs and integration monitoring;
- Coupa sourcing, supplier, requisition/order APIs and conversational/agent surfaces;
- Procore scoped APIs, bid packages, project/company webhooks and marketplace/agent extension model;
- Autodesk Construction Cloud/BuildingConnected APIs, item/version access and webhooks;
- provider-neutral email/change-notification patterns;
- current AI/chat disclosures, citations, limitations and human-review patterns.

Classify each observation as:

- `FOUNDATION_PRACTICE` — mature interface/authority/retry/version principle;
- `INTERACTION_PATTERN` — useful P1.9 input;
- `CAPABILITY_HYPOTHESIS` — AI function requiring later evaluation;
- `MARKETING_OR_PREVIEW` — no reliability conclusion;
- `OUT_OF_SCOPE_ENTERPRISE_GRAVITY` — avoid inheriting unnecessary platform scope;
- `IMPLEMENTATION_DETAIL` — defer while preserving semantic requirement.

Competitor parity is not the objective. Extract proven patterns while preserving the product’s one-XL/A0–A3 constraints.

---

# 9. Workstreams

## P1.7a — command/query/capability contracts

Freeze:

- bounded operation identity;
- operation class C1–C4;
- semantic version;
- tenant/project/resource/ContractingAuthorityContext;
- authenticated/acting/represented principal;
- authority/capability requirement;
- expected version/preconditions;
- idempotency/logical command identity;
- evidence/source/config references;
- result/error/async state;
- proposal-versus-effective-result boundary;
- bulk/per-item behavior;
- capability discoverability for UI/chat/agents.

## P1.7b — domain/integration events

Freeze:

- domain event versus integration event;
- publication envelope versus business event identity;
- causation/correlation/command identity;
- recorded/effective/observed times;
- delivery/replay/idempotency;
- ordering scope;
- schema/semantic evolution;
- publication failure recovery;
- projection versioning/recalculation.

## P1.7c — connector authority/capability profiles

Freeze per exchanged fact/action:

- OWN/MIRROR/REFERENCE/OUT;
- direction;
- authoritative source/writer;
- read/write/observe/issue/callback capabilities;
- scopes and principal context;
- freshness/staleness/conflict;
- evidence/version anchor/materialization;
- transformation authority;
- degradation/manual fallback;
- cutover/in-flight handling;
- connector certification/conformance.

## P1.7d — import/export/migration

Freeze:

- bootstrap/current/historical import classes;
- source identity/version/time/authority mapping;
- validation/rejection/quarantine;
- weak-identity ambiguity;
- partial/resumable batch behavior;
- migration manifest;
- in-flight cutover;
- rollback/forward correction;
- source/copy disposition;
- no fabricated provenance or direct state assignment.

## P1.7e — reconciliation/error/degradation

Freeze typed classes for:

- transport/auth/authz;
- schema/semantic incompatibility;
- duplicate/replay;
- stale/unavailable source;
- mapping/referential ambiguity;
- authority conflict;
- evidence-anchor failure;
- business rejection;
- partial/batch failure;
- rate/availability degradation;
- unknown/quarantine.

## P1.7f — agent/tool seam

Freeze only:

- agents use the same registered capabilities as UI/services;
- explicit principal/tenant/context;
- read/query/proposal/command distinction;
- provenance/citations/evidence references;
- deterministic validation;
- idempotent invocation;
- inspectable action/result/error;
- capability enable/disable/version/replace;
- no direct DB/event writes;
- no cross-tenant context;
- no unproven autonomy assumption.

## P1.7g — ADR-0006 activation tiers

Evaluate and freeze V1 integration depth through deployment profiles, preserving one semantic core:

- Tier 0 — manual/config/file fallback;
- Tier 1 — structured import/export;
- Tier 2 — generic API/webhook/email connector contract;
- Tier 3 — selected named connectors only if justified;
- Tier 4 — deep real-time transactional integration, likely later unless evidence proves V1 necessity.

A0–A3 must operate at Tier 0/1 without named connector prerequisite.

---

# 10. Candidate outputs

1. `P1_7_COMPETITOR_FOUNDATION_EVIDENCE_V0_1.md`;
2. `P1_7_CAPABILITY_NEUTRAL_EXTENSION_CONTRACT_V0_1.md`;
3. `P1_7_COMMAND_QUERY_TOOL_CONTRACT_V0_1.md`;
4. `P1_7_DOMAIN_INTEGRATION_EVENT_CONTRACT_V0_1.md`;
5. `P1_7_CONNECTOR_AUTHORITY_CAPABILITY_PROFILE_V0_1.md`;
6. `P1_7_EMAIL_COMMUNICATION_CONNECTOR_CONTRACT_V0_1.md`;
7. `P1_7_IMPORT_EXPORT_MIGRATION_CONTRACT_V0_1.md`;
8. `P1_7_RECONCILIATION_ERROR_DEGRADATION_TAXONOMY_V0_1.md`;
9. `P1_7_ASYNC_IDEMPOTENCY_RETRY_CONTRACT_V0_1.md`;
10. `P1_7_AGENT_CHAT_TOOL_SEAM_V0_1.md`;
11. `P1_7_ADR_0006_INTEGRATION_DEPTH_CANDIDATE_V0_1.md`;
12. `P1_7_A0_A3_NO_CONNECTOR_PROFILE_V0_1.md`;
13. integrated candidate;
14. internal hostile audit/remediation/recheck;
15. self-contained Claude hostile-audit packet/prompt;
16. final freeze only after dual PASS.

---

# 11. Gates

P1.7 may close only if:

G1 — every load-bearing inbound/outbound fact/action has one authority/capability profile and no connector co-master.

G2 — all state-changing UI/API/import/connector/agent requests route through registered bounded domain commands with authority, preconditions, idempotency and evidence/config binding.

G3 — query/proposal/command/async operation classes are explicit; generated/proposed output cannot silently become effective truth.

G4 — domain events, integration events and transport envelopes are distinct; replay/redelivery cannot duplicate business effects.

G5 — commit/publication/callback/crash windows have deterministic recovery and stable causal identity.

G6 — imports/migrations preserve or explicitly qualify identity, authority, time, evidence and history; missing provenance is never fabricated.

G7 — external references satisfy P1.6 ReconstructionAnchorTest/materialization rules.

G8 — conflict/staleness/error/quarantine states are typed and cannot be resolved by overwriting authoritative truth.

G9 — authority transfer/cutover prevents dual writers and defines in-flight handling.

G10 — schema/capability/API/event evolution supports expansion, reduction, disablement and replacement without historical semantic rewrite.

G11 — email connectivity is provider-neutral, scoped, evidence-safe, idempotent and has manual fallback.

G12 — future chat/agents can query, propose and invoke bounded commands, but no AI capability or autonomy is assumed reliable.

G13 — ADR-0006 resolves V1 integration depth without named connector prerequisite for A0–A3.

G14 — A0–A3 executes end to end at minimal activation with deterministic/manual operation.

G15 — P1.1–P1.6 regression = NO; P07 sole XL; second XL clean; product code locked.

G16 — internal hostile audit PASS + Claude hostile audit PASS.

---

# 12. Hostile tests

At minimum:

1. AI package proposal is disabled after poor evaluation; manual flow still works.
2. New model produces different BOQ mapping; old accepted history remains bound to old proposal/source/version.
3. Chat asks to award supplier without authority; command rejected exactly as UI/API would be.
4. Chat claims completion while async operation remains pending; contract prevents false completed response.
5. Email connector unavailable; tender can still issue/capture through bounded manual/file path.
6. Same inbound email delivered twice; one message/evidence history plus duplicate occurrences as appropriate.
7. Mailbox scope revoked; connector stops without deleting historical evidence.
8. Domain commit succeeds but event publication fails.
9. Duplicate command after client timeout.
10. Callback arrives before local request-result persistence.
11. Two external systems claim authority for one fact.
12. Current CDE pointer changes after historical reliance.
13. migration lacks exact quote revision.
14. batch partly succeeds.
15. connector/API schema changes during retry.
16. agent invokes same command twice.
17. capability is removed/renamed while old clients/agents retry.
18. named connector is never installed; first tender still completes.
19. email-body-only supplier term remains exact source evidence.
20. AI result cites wrong tenant/project context; isolation/validation blocks it.

---

# 13. Freeze sequence

1. evidence scan;
2. capability-neutral contract;
3. command/query/tool contract;
4. event/async/idempotency contracts;
5. connector/email authority contracts;
6. migration/error contracts;
7. ADR-0006 and A0–A3 profiles;
8. integrated candidate;
9. internal hostile audit;
10. narrow remediation;
11. internal recheck;
12. self-contained Claude packet;
13. external remediation until dual PASS;
14. final ADR/checkpoint/state transition.

P1.8+ remains locked.

Product code remains locked.
