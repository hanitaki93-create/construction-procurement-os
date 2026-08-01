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
- P1.9: **ACTIVE / INTERNAL POST-CLAUDE-ROUND-1 RECHECK PASS / CLAUDE ROUND 2 PENDING**
- P1.10+: **LOCKED** until P1.9 external PASS, ADR reconciliation and final checkpoint
- Product code: **NOT STARTED / LOCKED**
- Frontend implementation: **NOT STARTED / LOCKED**
- Dashboard/BI/warehouse implementation: **NOT STARTED / LOCKED**
- AI implementation: **NOT STARTED / LOCKED**
- Phase 2/3 build: **LOCKED**
- Process invention: **PAUSED** unless evidence proves a missing lifecycle
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**

Current status:

`P1.9 Claude Round 1 FAIL on BL-P19-05 only. Typed field/schema registry and W-62–W-66 remediation completed. Internal post-remediation recheck PASS. Claude Round 2 pending. Do not close P1.9, accept candidate ADRs, unlock P1.10 or start implementation until external PASS and final checkpoint.`

---

# 2. Canonical next-chat handoff

Read first:

- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_ROUND_2_HOSTILE_AUDIT_PROMPT_V0_1.md`

Then read:

- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_INTEGRATED_USER_EXPERIENCE_INTERACTION_CANDIDATE_V0_3.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_ROUND_1_VERDICT_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_CLAUDE_ROUND_1_REMEDIATION_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/audits/P1_9_INTERNAL_POST_CLAUDE_ROUND_1_RECHECK_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_ENTRY_HANDOFF_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_WORKPLAN_V0_1.md`
- `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_TARGETED_OFFICIAL_UX_PRACTICE_EVIDENCE_V0_1.md`
- `04_phases/phase_1/P1.8_reporting_analytics_control_model/P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`
- `04_phases/phase_1/P1.7_integration_migration_api_contracts/P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`
- `02_research/control/adr_log.csv`

GitHub remains canonical truth.

Do not start P1.10, product/frontend code, dashboard/BI/warehouse selection or AI implementation.

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

# 4. Evidence authority and open validation debt

Hierarchy:

1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Competitor/product evidence never outranks P1.2 primary contractor evidence or frozen architecture.

Open primary evidence debt remains:

- FT-02
- FT-06
- FT-09 / CR-02
- FT-10

Primary UAE supplier-side validation remains incomplete. P1.10/final Phase 1 checkpoint must preserve a falsification/build-validation plan covering secure-link/account tolerance, email/file/buyer capture, field burden/terminology, mobile/Arabic/RTL, revisions/addenda, receipt interpretation and support/fallback.

---

# 5. Frozen P1.4–P1.8 inheritance

## P1.4

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- OWN/MIRROR/REFERENCE/OUT at load-bearing grain;
- one authoritative source/writer per effective period;
- connector never business authority;
- tenant-private supplier relationships;
- optional reusable technical authentication identity without cross-tenant business data/grants;
- cross-tenant learned tenant-business influence OUT by default;
- agents only through bounded operations.

## P1.5

- no universal procurement root;
- RequirementAllocation owns scope consumption only;
- AwardDecision ≠ Commitment;
- one semantic Commitment core;
- ScopeBasis ≠ ValuationBasis ≠ CapabilityProfile;
- one economic value once;
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
- common OperationRegistry and bounded service/domain actions;
- stable idempotency/result recovery;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- immutable PublicationIntent;
- closed effect stages including EFFECT_INDETERMINATE and PARTIAL_EFFECT;
- timeout/absence is not proof of no effect;
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
- A0–A3 reporting without connector or AI.

---

# 6. P1.9 governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use, correction or field meaning.**

P1.9 decides interaction meaning, task structure, disclosure, recovery and channel obligations. It does not select frontend framework, component library, pixels, database/cache/search, renderer, AI model or product code.

---

# 7. P1.9 current controlling candidate v0.3

## 7.1 Interaction authority

Every affordance is QUERY, PROPOSAL, COMMAND, ASYNC_OPERATION, NAVIGATION or LOCAL_PRESENTATION.

Every command binds exact operation/version, principal/represented principal, tenant/project/authority context, target/member/schema versions, authority/DOA, evidence/guards, consequences, idempotency and recovery.

No hidden command through navigation, filter, drag/drop, auto-save, upload, import, annotation, spreadsheet edit or chat.

## 7.2 Confirmation and continuation

Consequential operations use exact preview and principal-bound confirmation.

Every operation binds `ConfirmationInvalidationPolicyVersion`; default is invalidation on any load-bearing target/member/principal/authority/recipient/value/field-schema/evidence/configuration/effect change unless a registered policy proves a bounded non-material class.

`InteractionContinuationAnchor` exists before effect-bearing transmission.

`AnchorAvailabilityProof` requires one:

- CLIENT_GENERATED_AND_DURABLY_PERSISTED;
- SERVER_RESERVED_AND_ACKNOWLEDGED before the effect call;
- CHANNEL_EMBEDDED_AND_RETRIEVABLE.

Same-round-trip anchor creation does not qualify.

Possible acceptance/effect routes to lookup/reconciliation, not blind resend.

## 7.3 Outcomes and bulk

`InteractionOutcomeEnvelope` preserves acceptance, operational status, effect stage, per-item result and recovery.

Bulk uses exactly:

- ATOMIC_DOMAIN_SET;
- INDEPENDENT_ITEMS_CONTINUE;
- INDEPENDENT_ITEMS_STOP_ON_BLOCKING;
- ORDERED_DEPENDENT.

False external atomicity and whole-batch retry after unknown effect are prohibited.

## 7.4 Work context/navigation

Every view binds tenant/project/ContractingAuthorityContext and canonical subject/version/as-of.

Navigation/tasks/queues/history are derived and cannot become a universal case root or manual business-state writer.

## 7.5 Approval

Approval binds exact proposal/version and current authority/DOA/delegation.

Approval outcome remains distinct from downstream command, AwardDecision, Commitment and established effect.

## 7.6 Product-owned field/schema grammar

Every load-bearing response/comparison value binds:

- one product-owned `RegisteredSemanticFieldKey`;
- one versioned `FieldFamilyKey`;
- exact layer, meaning, grain, unit/currency/time basis, validation and normalization/comparison eligibility;
- exact `ResponseSchemaVersion`.

Closed top-level families:

- IDENTITY_OR_REFERENCE;
- QUANTITY_WITH_UOM;
- MONETARY_WITH_CURRENCY;
- DECIMAL_MEASURE;
- PERCENTAGE_OR_RATE;
- DATE_OR_DATETIME;
- DURATION_OR_LEAD_TIME;
- ENUMERATED_SELECTION;
- BOOLEAN_OR_ACKNOWLEDGMENT;
- STRUCTURED_TEXT_IDENTIFIER;
- FREE_TEXT_EVIDENCE_ONLY;
- ATTACHMENT_EVIDENCE;
- REGISTERED_LINE_OR_TABLE_GROUP.

Tenant configuration may select, label without semantic conflict, order/group, apply permitted requiredness/enum subset/product-defined applicability/validation and bounded constraints.

Tenant configuration may not author field meaning/families, formulas, computed fields, conditions, executable validation, runtime joins, state/effects or metric population semantics.

Free text, arbitrary email content, attachments and unregistered spreadsheet columns remain source evidence. They become a registered normalized value only through a bounded proposal and explicit review/accept command preserving source and differences.

Semantic schema changes create a new version and comparability impact. Cross-version comparison requires compatible registered keys/policies or explicit mapping; otherwise segment/block.

Internal forms and future chat tools inherit the same registry.

No generic page/form builder. New semantic fields/families require prospective architecture change and hostile review.

## 7.7 External participation / ADR-0016 candidate

Bounded hybrid:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round-trip;
- manual/offline fallback.

No account/network prerequisite.

Persistent workspace is tenant/buyer-relationship scoped. Reusable technical authentication may enter isolated tenant-private workspaces, but V1 prohibits cross-tenant supplier business profile, task/history/grants, reputation, benchmark and marketplace/network mode.

`ExternalTaskGrant` binds tenant-private relationship, contact/mailbox/team, task/version, operations, assurance, confidentiality, transfer/revocation and occurrences. Forwarding never transfers authority.

`ExternalSubmissionAcceptancePolicy` and closed dispositions decide evidence-only, provisional, valid, rejected, withdrawn, superseded, late-limited and quarantined submissions. Only valid/explicit late-accepted responses enter the governed population.

A valid source submission may contain evidence-only content that is not a normalized value.

## 7.8 Receipt meaning

Receipt shows submission/revision identity, task/schema/member version, current disposition, response-population entry, outstanding conditions and explicit established/non-established meaning.

Unless separately true, receipt never implies compliance, technical/commercial acceptance, completeness, shortlist, award, contractable basis or Commitment.

Receipt semantics persist across portal, email, PDF, spreadsheet and status lookup.

## 7.9 Evidence/communication

Source, capture, normalized, evaluation, supplier-confirmed, issued, reference, annotation, correction/retraction and disposition/redaction remain distinct.

Upload is untrusted capture. Issued member set immutable. Provider acceptance is not delivery/read/ack/domain effect.

## 7.10 Reporting disclosure

`LoadBearingDisclosureBundle`, `SurfaceDisclosureProfile` and `DisclosureParityManifest` preserve value state, population, subset/range, use block, actual/time, quality, issue/restatement, current reliance and receipt disposition through decision, compact, mobile, export, print and chat surfaces.

Decision-critical not-total, range, blocked/limited use, current reliance and receipt non-meaning are inline/adjacent—not tooltip/badge/color/drill-only.

## 7.11 Errors/recovery/accessibility

Errors are typed; generic retry is prohibited where effect may exist. Offline/manual/file fallback preserves operation/evidence/schema semantics.

V1 first-party web supported journeys target **WCAG 2.2 Level AA**.

Keyboard, assistive status/error/progress, consequential review/correction, responsive disclosure, mobile task support declaration, timezone/date/currency/unit and Arabic/RTL structural obligations are binding.

A third-party/document/file path lacking equivalent access requires an accessible first-party or assisted/manual fallback.

## 7.12 Conventional/chat coexistence

All A0–A3 work remains complete without chat.

Chat-supported actions use the same operations, field registry, preview, continuation, confirmation, outcome and disclosure. Session memory/inference is not authority. P1.10 owns reasoning/autonomy.

---

# 8. P1.9 audit chain

## Internal Round 1

`FAIL — BL-P19-01/02/03/04.`

Closed by:

- pre-transmission continuation anchor;
- ExternalSubmissionAcceptancePolicy/disposition/actor assurance;
- SurfaceDisclosureProfile/DisclosureParityManifest;
- four BulkExecutionPolicy modes.

## Internal Round 2

`PASS — 114 hostile scenarios; G1–G16 PASS.`

## Claude Round 1

`FAIL — BL-P19-05 only.`

Claude accepted all other interaction semantics and identified unbounded field/form authorship as the sole second-XL path.

## Claude Round 1 remediation

- product-owned typed field-family and semantic-key registry;
- tenant selection/bounded constraints only;
- free text/unregistered content evidence-only until bounded normalization;
- schema-version compatibility/comparison rules;
- V1 tenant-private persistent workspace boundary;
- receipt disposition/non-meaning;
- principal-bound confirmation;
- pre-call anchor availability proof;
- versioned confirmation invalidation policy;
- WCAG 2.2 AA target.

## Internal post-Claude recheck

`PASS — 146 hostile scenarios; BL-P19-05 and W-62–W-66 closed; G1–G16 PASS.`

Regression:

- P1.1–P1.8 reopening = NO;
- SECOND XL = CLEAN;
- A0–A3 = CLEAN;
- product code/P1.10 = LOCKED.

---

# 9. Candidate ADR posture

Still PROPOSED pending Claude Round 2 PASS:

- ADR-0016 — bounded hybrid external-party UX plus product-owned field/schema registry and V1 tenant-private workspace boundary;
- ADR-0038 — operation interaction, principal-bound confirmation, continuation availability, bulk and typed outcome;
- ADR-0039 — work context/navigation/no second root;
- ADR-0040 — load-bearing disclosure/history/reliance/receipt parity;
- ADR-0041 — safe recovery, WCAG 2.2 AA target, localization/RTL and conventional-chat coexistence.

ADR-0017 remains P1.10-owned.

No ADR status changes until external PASS and final reconciliation.

---

# 10. Current gate claim

- G1 operation/authority/evidence/consequence/result — PASS
- G2 query/proposal/command/acceptance/effect — PASS
- G3 navigation/tasks/queues no second root — PASS
- G4 approval/DOA/delegation — PASS
- G5 field/schema authorship and comparison determinism — PASS
- G6 evidence/communication layers — PASS
- G7 limitation/receipt placement and parity — PASS
- G8 report history/current reliance — PASS
- G9 external low-friction/no network/cross-tenant workspace — PASS
- G10 grant/actor/submission validity — PASS
- G11 control queues no GRC truth — PASS
- G12 continuation/bulk/error/unknown recovery — PASS
- G13 accessibility/mobile/localization/RTL — PASS semantic target
- G14 conventional A0–A3 no connector/account/chat/AI/P07 — PASS
- G15 regression/one XL/product-code lock — PASS
- G16 internal audit/readiness — PASS; Claude Round 2 pending

---

# 11. Immediate next action

Send Claude:

- `P1_9_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`
- `P1_9_CLAUDE_ROUND_2_HOSTILE_AUDIT_PROMPT_V0_1.md`

On FAIL:

- record verdict;
- remediate narrowly;
- rerun full internal audit;
- prepare next external round.

On PASS:

- record verdict;
- absorb non-blocking watches;
- reconcile ADR-0016 and ADR-0038–ADR-0041;
- create frozen P1.9 contract, final verdict and checkpoint;
- prepare P1.10 entry handoff;
- unlock P1.10 only after canonical state update.

P1.9 remains active until then.