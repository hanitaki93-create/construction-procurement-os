# PROJECT STATE

**Updated:** 2026-08-01  
**Canonical status file:** this document  
**Repository:** `hanitaki93-create/construction-procurement-os`

---

# 1. Position

- Project: **Construction Procurement OS**
- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.9 — User Experience & Interaction Model**
- P1.0: **CP-05 PASS / CLOSED**
- P1.1: **PASS / FROZEN**
- P1.2: **PASS / CLOSED**
- P1.3: **PASS / CLOSED**
- P1.4: **PASS / CLOSED / FROZEN**
- P1.5: **PASS / CLOSED / FROZEN**
- P1.6: **PASS / CLOSED / FROZEN**
- P1.7: **PASS / CLOSED / FROZEN**
- P1.8: **PASS / CLOSED / FROZEN**
- P1.9: **ACTIVE / INTERNAL HOSTILE RECHECK PASS / CLAUDE AUDIT PENDING**
- P1.10+: **LOCKED** until P1.9 external PASS, ADR reconciliation and final checkpoint
- Product code: **NOT STARTED / LOCKED**
- Frontend implementation: **NOT STARTED / LOCKED**
- Dashboard/BI/warehouse implementation: **NOT STARTED / LOCKED**
- AI implementation: **NOT STARTED / LOCKED**
- Phase 2/3 build: **LOCKED**
- Process invention: **PAUSED** unless evidence proves a missing lifecycle
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**

Current status:

`P1.9 integrated candidate v0.2 internal hostile recheck PASS — Claude hostile audit pending. Do not close P1.9, accept candidate ADRs, unlock P1.10 or start product/frontend code until external PASS and final checkpoint.`

---

# 2. Canonical next-chat handoff

Read first:

- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_SELF_CONTAINED_HOSTILE_AUDIT_PACKET_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_HOSTILE_AUDIT_PROMPT_V0_1.md`

Then read as needed:

- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_INTEGRATED_USER_EXPERIENCE_INTERACTION_CANDIDATE_V0_2.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_INTERNAL_HOSTILE_AUDIT_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_INTERNAL_AUDIT_REMEDIATION_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_INTERNAL_HOSTILE_RECHECK_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_ENTRY_HANDOFF_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_WORKPLAN_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_TARGETED_OFFICIAL_UX_PRACTICE_EVIDENCE_V0_1.md`
- `04_phases/phase_1/P1.8_reporting_analytics_control_model/P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`
- `04_phases/phase_1/P1.7_integration_migration_api_contracts/P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`
- `02_research/control/adr_log.csv`

GitHub remains canonical truth.

Do not start P1.10, product code, frontend implementation, dashboard/BI/warehouse selection or AI implementation.

Do not accept ADR-0016 or ADR-0038–ADR-0041 until Claude PASS and final reconciliation.

---

# 3. Frozen beachhead and burden controls

Beachhead:

> UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments, with explicit procurement/commercial authority and an accounting posture the platform must coexist with.

Burden controls:

- 84 controlled scope areas;
- one independent XL gravity well unless an IMPOSSIBLE invariant forces controlled reopening;
- sole independent XL = **P07 commitment/change/valuation/commercial truth**;
- standard configuration to first live tender target ≤5 working days from clean inputs;
- bespoke named connectors required before first live tender = 0.

A0–A3:

`authorized requirement / material request / optional package`
`→ RFQ/tender`
`→ supplier response/revision`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

A0–A3 remains usable without:

- P07 execution;
- named ERP/CDE/email connectors;
- persistent supplier account/network;
- CPM/BPM;
- WMS/inventory;
- public API/broker;
- chat;
- advanced AI;
- warehouse/BI platform;
- cross-tenant shared learning.

---

# 4. Evidence authority hierarchy

1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Competitor/product evidence never outranks P1.2 primary contractor evidence or frozen architecture.

Open primary evidence debt remains FT-02, FT-06, FT-09/CR-02 and FT-10.

---

# 5. Frozen P1.4–P1.8 inheritance

## P1.4

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing grain;
- one authoritative source/writer per effective period;
- connector never business authority;
- product commercial truth ≠ external accounting truth;
- evidence integrity/provenance without full CDE ownership;
- residency/governed migration;
- cross-tenant learned tenant-business influence OUT by default;
- agents only through bounded operations.

## P1.5

- no universal procurement root;
- RequirementAllocation owns scope consumption only;
- AwardDecision ≠ Commitment;
- one semantic Commitment core;
- ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile;
- one economic value once and closed CommercialEffectVector;
- exact decimal/versioned money/FX/tax;
- claim ≠ assessment ≠ certification;
- physical ≠ commercial/certified ≠ accounting-posted ≠ paid actual;
- history-preserving correction;
- workflow/evidence/integration/AI never directly writes commercial truth.

## P1.6

- immutable EvidenceVersion/content/source/capture/location/reliance distinctions;
- exact issued artifact/member identity;
- issue/dispatch/delivery/read/ack/content/domain-effect separation;
- evidence correction/retraction cannot automatically reverse domain truth;
- bounded retention/redaction/disposition;
- AI-derived content source-linked and non-authoritative.

## P1.7

- exactly QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- common OperationRegistry and bounded service/domain action;
- stable idempotency/result recovery;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- immutable PublicationIntent;
- closed effect stages including EFFECT_INDETERMINATE and PARTIAL_EFFECT;
- timeout/absence is not proof of no effect;
- ConnectorProfile/AuthorityMapping and no co-master;
- migration truth/provenance/limitation;
- manual/file adapters and A0–A3 no-connector path;
- future chat/agents use the same operations.

## P1.8

- metric/projection/report/snapshot/result identities;
- declared/evaluated/restricted population distinctions;
- closed partial-population treatment and value states;
- time/status/actual-family separation;
- quality vector/materiality/decision-use assessment;
- report-use composition and current subsequent reliance;
- issued/current/restated/reconstruction distinctions;
- contribution/comparability/double-count controls;
- load-bearing limitation rendering inherited by P1.9;
- supplier/control/report/chat boundaries;
- A0–A3 reporting without connector or AI.

---

# 6. P1.9 governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use or correction meaning.**

P1.9 decides interaction meaning, task structure, disclosure, recovery and channel obligations. It does not select frontend framework, component library, pixels, database/cache/search, renderer, AI model or product code.

---

# 7. P1.9 current candidate

## Interaction grammar

Every affordance is QUERY, PROPOSAL, COMMAND, ASYNC_OPERATION, NAVIGATION or LOCAL_PRESENTATION.

Every command binds exact operation/version, principal/represented principal, tenant/project/authority context, target/member versions, authority/DOA, evidence/guards, consequences, idempotency and recovery.

No hidden command through navigation, filter, drag/drop, auto-save, import, annotation or chat.

## Pre-transmission recovery

`InteractionContinuationAnchor` exists before the first effect-bearing transmission and binds logical command, context, target, preview/confirmation and idempotency.

Proven pre-acceptance failure can resume under the same anchor. Possible acceptance/effect permits lookup/reconciliation only. Blind resend is prohibited.

## Outcomes and bulk

`InteractionOutcomeEnvelope` preserves acceptance, operational status, effect stage, item result and recovery.

Bulk uses exactly:

- ATOMIC_DOMAIN_SET;
- INDEPENDENT_ITEMS_CONTINUE;
- INDEPENDENT_ITEMS_STOP_ON_BLOCKING;
- ORDERED_DEPENDENT.

False external atomicity and whole-batch retry after unknown effect are prohibited.

## Work context/navigation

Every view binds exact tenant/project/ContractingAuthorityContext and canonical subject/version/as-of. Navigation/tasks/queues/history are derived and cannot become a universal case root or manual state writer.

## Approval

Approval binds exact proposal/version and current authority/DOA/delegation. Approval outcome remains distinct from downstream command and domain effect.

## External participation / ADR-0016 candidate

Bounded hybrid:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round-trip;
- manual/offline fallback.

No account/network prerequisite.

ExternalTaskGrant binds tenant-private relationship, exact contact/mailbox/team, task/version, operations, assurance, confidentiality, transfer/revocation and occurrences. Forwarding never transfers access.

`ExternalSubmissionAcceptancePolicy` and closed dispositions decide evidence-only, provisional, valid, rejected, withdrawn, superseded, late-limited and quarantined submissions. Only valid/explicit late-accepted responses enter governed response population.

## Evidence/communication

Source, capture, normalized, evaluation, supplier-confirmed, issued, reference, annotation, correction/retraction and disposition/redaction remain distinct.

Upload is untrusted capture. Issued member set immutable. Provider acceptance is not delivery/read/ack/domain effect.

## Reporting disclosure

`LoadBearingDisclosureBundle`, `SurfaceDisclosureProfile` and `DisclosureParityManifest` preserve value state, population, subset/range, use block, actual/time, quality, issue/restatement and current reliance through decision, compact, mobile, export, print and chat surfaces.

Decision-critical “not total,” range, blocked/limited use and current reliance consequences are inline/adjacent—not tooltip/badge/color/drill-only.

## Errors/recovery/accessibility

Errors are typed; generic retry is prohibited where effect may exist. Offline/manual/file fallback preserves operation/evidence semantics.

Keyboard, assistive status/error/progress, consequential review/correction, responsive disclosure, mobile task support declaration, timezone/date/currency/unit and Arabic/RTL structural obligations are binding.

## Conventional/chat coexistence

All A0–A3 work remains complete without chat. Chat-supported actions use the same operations, preview, continuation, confirmation, outcome and disclosure. Session memory/inference is not authority. P1.10 owns reasoning/autonomy.

---

# 8. Targeted official evidence

Official practice supports the bounded hybrid without governing architecture:

- Procore demonstrates structured bid submission plus email attachment submission without sign-in and buyer-on-behalf capture;
- Coupa demonstrates secure invitation-link/OTP access without mandatory account depending on settings, optional portal, terms/addenda, revisions, receipt/history and version-bound offline spreadsheet round-trip;
- SAP demonstrates response teams/alternative/offline responses and also the onboarding/network gravity kept optional here;
- Autodesk demonstrates centralized bid/task tracking and supplier-network gravity not adopted as prerequisite;
- W3C supports consequential review/correction/reversal, error suggestions, programmatic status/progress and structural RTL handling.

Primary UAE supplier-side evidence remains incomplete; later validation debt remains.

---

# 9. P1.9 audit chain

Internal Round 1:

`FAIL — four blockers.`

- BL-P19-01 — response could be lost before any recovery identity reached user;
- BL-P19-02 — captured external content versus valid organizational submission open;
- BL-P19-03 — disclosure placement/parity ambiguous;
- BL-P19-04 — bulk dependency/stop/indeterminate semantics incomplete.

Remediation:

- pre-transmission InteractionContinuationAnchor;
- ExternalSubmissionAcceptancePolicy + disposition + actor assurance;
- SurfaceDisclosureProfile + mandatory inline set + DisclosureParityManifest;
- four BulkExecutionPolicy modes;
- localization keys, contact transfer, fallback declaration, mobile support, copy policy and reauthentication safety.

Internal recheck:

`PASS — 114 hostile scenarios; G1–G16 PASS.`

Regression:

- P1.1–P1.8 reopening = NO;
- SECOND XL = CLEAN;
- A0–A3 = CLEAN;
- product code/P1.10 = LOCKED.

---

# 10. Candidate ADR posture

Still PROPOSED pending Claude PASS:

- ADR-0016 — bounded hybrid external-party UX;
- ADR-0038 — interaction operation, continuation, bulk and typed outcome;
- ADR-0039 — work context/navigation/no second root;
- ADR-0040 — load-bearing disclosure/history/reliance interaction;
- ADR-0041 — safe recovery/accessibility/localization/conventional-chat coexistence.

ADR-0017 remains P1.10-owned.

---

# 11. Current gate claim

- G1 operation/authority/evidence/consequence/result — PASS.
- G2 query/proposal/command/acceptance/effect — PASS.
- G3 navigation/tasks/queues no second root — PASS.
- G4 approval/DOA/delegation — PASS.
- G5 evidence layers — PASS.
- G6 communication occurrence/effect — PASS.
- G7 limitation placement/parity — PASS.
- G8 report history/current reliance — PASS.
- G9 external low-friction/no network — PASS.
- G10 grant/actor/submission validity — PASS.
- G11 control queues no GRC truth — PASS.
- G12 continuation/bulk/error/unknown recovery — PASS.
- G13 accessibility/mobile/localization/RTL — PASS semantic floor.
- G14 conventional A0–A3 no connector/account/chat/AI/P07 — PASS.
- G15 regression/one XL/product-code lock — PASS.
- G16 internal audit/readiness — PASS; Claude pending.

---

# 12. Immediate next action

Send Claude:

- `P1_9_CLAUDE_SELF_CONTAINED_HOSTILE_AUDIT_PACKET_V0_1.md`
- `P1_9_CLAUDE_HOSTILE_AUDIT_PROMPT_V0_1.md`

On FAIL: record, remediate narrowly, rerun internal audit and prepare Round 2.

On PASS: record verdict, absorb non-blocking watches, reconcile ADR-0016/0038–0041, create frozen P1.9 contract/final verdict/checkpoint and then unlock P1.10.

P1.9 remains active until then.