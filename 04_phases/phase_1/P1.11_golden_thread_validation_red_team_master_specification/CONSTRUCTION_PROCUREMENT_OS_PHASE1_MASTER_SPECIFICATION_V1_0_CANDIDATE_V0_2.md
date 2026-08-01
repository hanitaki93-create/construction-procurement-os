# Construction Procurement OS — Phase 1 Master Specification v1.0 Candidate v0.2

**Date:** 2026-08-01  
**Status:** REMEDIATED MASTER-SPEC CANDIDATE / INTERNAL POST-CLAUDE RECHECK PENDING  
**Supersedes:** `CONSTRUCTION_PROCUREMENT_OS_PHASE1_MASTER_SPECIFICATION_V1_0_CANDIDATE.md` where conflicting  
**P1.0–P1.10:** CLOSED/FROZEN  
**P1.11 / Phase 1:** ACTIVE  
**Phase 2 / product/frontend/AI code:** LOCKED

---

# 1. Purpose and document class

This document is the build-facing **navigation, integration and precedence contract** for Phase 1.

It is not a replacement encyclopedia for the phase-frozen contracts. It identifies:

- the product/release boundary;
- the controlling semantic sources;
- cross-phase composition rules;
- representative golden-thread obligations;
- traceability and validation status;
- permitted physical decisions;
- the entry contract for later build decomposition.

Every section labelled `SUMMARY POINTER — NON-EXHAUSTIVE` is a navigation summary. The cited frozen source binds in full.

---

# 2. Closed precedence and no-narrowing rule

## 2.1 Governing hierarchy

1. explicit later `CHG-*` architecture-change record and the exact clauses it validly supersedes;
2. final frozen Phase 1 master specification for explicit direct conflicts and integration rules;
3. phase-specific frozen contracts, final checkpoints and incorporated watch closures for exact domain detail;
4. canonical accepted ADR log entries, read with their phase reconciliations and immutable decision history;
5. P1.11 traceability, action ownership, golden-thread and validation artifacts;
6. requirements/evidence/control registers;
7. older candidate/research/audit artifacts only where not superseded.

## 2.2 General versus specific

> **The master specification governs only on explicit direct conflict or explicit supersession. Where it is silent, summarizing, less specific or navigational, the applicable phase-frozen contract and incorporated watch closure bind in full. Silence, omission, abbreviation or generalized wording here never deletes, narrows or weakens a frozen clause.**

Where a general master statement and a specific frozen clause coexist, the specific frozen clause controls.

Where two equally specific frozen clauses appear inconsistent, implementation is blocked and architecture change control is required.

Implementation convenience, framework defaults, vendor behavior or physical design preference never resolve semantic conflict.

## 2.3 Change burden

This master specification may narrow, replace or omit a frozen clause only through an explicit `CHG-*` record containing:

- exact source clauses;
- proposed replacement;
- authority and evidence basis;
- affected ADRs, requirements and golden threads;
- regression and one-XL review;
- hostile review equivalent to the original freeze;
- explicit supersession wording.

No P1.11 Round-1 remediation changes a frozen business decision.

## 2.4 Summary marking

Every architecture summary below provides:

- controlling path;
- explicit non-exhaustive status;
- a reminder that all closed registries, taxonomies, guards, prohibitions, failure paths and watch closures remain inherited.

A builder may not treat a summary as the complete contract.

---

# 3. Product thesis and release boundary

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling sources: `01_roadmaps/PHASE1_ROADMAP_V1_3_FROZEN.md`, P1.1 final scope/release artifacts, accepted ADRs and `PROJECT_STATE.md`. Those sources bind in full.

## 3.1 Beachhead hypothesis

V1 targets UAE private-sector contractor procurement organizations acting as buyers of material and/or subcontract commitments under explicit procurement/commercial authority, with external accounting systems the product must coexist with.

This is an architecture and beachhead hypothesis, not market validation.

## 3.2 Deterministic thesis

The product must remain operationally useful when AI is unavailable, disabled, unevaluated or removed.

## 3.3 Mandatory A0–A3 floor

`authorized requirement / RequirementAllocation / optional ProcurementPackage`
`→ RFQ/tender`
`→ supplier source response/revision`
`→ normalization/comparison`
`→ recommendation/approval`
`→ AwardDecision`
`→ external handoff`

A0–A3 must operate without:

- P07 execution;
- named ERP/CDE/email connector;
- persistent supplier account or supplier network;
- public API/broker;
- chat or AI;
- warehouse/BI platform;
- cross-tenant learned business influence.

Manual, structured-file and provider-neutral channel paths are mandatory.

## 3.4 Sole independent XL

P07 commitment/change/valuation/commercial truth is the sole independent XL.

No independent generic:

- accounting GL/AP/cash ERP;
- BPM/workflow or case platform;
- CDE/records suite;
- CPM/project-management suite;
- supplier marketplace/network/reputation system;
- BI/warehouse/formula platform;
- page/form/no-code builder;
- SLO/SIEM/GRC/cloud-management product;
- prompt/capability/agent/tool/vector/memory/evaluation platform;
- general autonomous commercial agent.

---

# 4. Boundary, ownership, tenancy and authority

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.4_boundary_ownership_tenancy_contract/P1_4_FROZEN_BOUNDARY_CONTRACT_V1_0.md`, its final checkpoint and incorporated watch closures. The full contract binds.

Every load-bearing fact/action binds:

- tenant, project and ContractingAuthorityContext;
- acting and represented principal;
- internal role/delegation/DOA or external grant;
- authoritative owner/source and OWN/MIRROR/REFERENCE/OUT;
- effective/recorded/configuration versions;
- current access/eligibility;
- historical reconstruction lineage.

Exactly one authoritative writer exists per load-bearing fact/event per effective period.

Internal authorization is not external grant. Authentication is not authority.

Connector, workflow, evidence, report, queue and AI are never business authority.

Cross-tenant direct or model-mediated business influence is OUT by default across records, retrieval, embeddings, caches, memory, evaluation, providers and learning.

Residency and region change are governed, effective-dated and copy-disposition aware.

---

# 5. Procurement and commercial core

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.5_commercial_core/P1_5_FROZEN_COMMERCIAL_CORE_V1_0.md`, its transaction/effect registries, final checkpoint and incorporated watch closures. The full contract binds.

## 5.1 Polycentric graph

No universal ProcurementCase, Package, DemandLine or Allocation root owns end-to-end truth.

RequirementAllocation owns scope-consumption lineage. ProcurementPackage is optional grouping.

## 5.2 Comparison layers

Distinct and immutable/history-preserving:

1. supplier source submission/revision;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

## 5.3 Decision and effect distinctions

Recommendation ≠ approval ≠ AwardDecision ≠ Commitment.

Claim ≠ assessment ≠ certification ≠ accounting posting ≠ payment.

## 5.4 P07 when activated

One semantic Commitment core supports bounded PO, subcontract, call-off/release and service forms.

ScopeBasis, ValuationBasis and CapabilityProfile are distinct typed axes even when labels resemble each other.

Commercial value uses one closed `CommercialEffectVector` algebra at COMPONENT or OBLIGATION subject grain.

One economic value contributes once.

Actual families remain distinct:

- physical;
- product commercial/certified;
- external accounting-posted;
- paid cash.

Money is exact-decimal with explicit currency and versioned calculation, rounding, FX and tax purpose.

Correction is immutable and typed. No economic in-place rewrite.

## 5.5 Open bounded debt

- ADR-0010: exact GCC/statutory/rate/default/formality/retention/localization evidence.
- ADR-0011: detailed suspense/unallocated attribution operating mechanics.

ADR-0011 is the single `NON_SPINE_DEFERRED` requirement. Frozen rules already require explicit visible final attribution or governed suspense identity, no hidden/null attribution and resolution before transitions that require final mapping.

---

# 6. Evidence, document and communication

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.6_evidence_document_communication_model/P1_6_FROZEN_EVIDENCE_DOCUMENT_COMMUNICATION_MODEL_V1_0.md`, its final checkpoint and incorporated watch closures. The full contract binds.

Distinct meanings include EvidenceRecord, EvidenceVersion, content integrity, source principal, capture observation, SourceLocator, EvidenceBinding, immutable RelianceBinding, issued artifact/member set, transmittal, message and CommunicationOccurrence.

Filename, hash, URL, storage object or current pointer is not evidence identity, authority or truth.

Communication facts remain distinct:

- issue;
- dispatch;
- provider acceptance;
- delivery/receipt;
- read/open;
- receipt acknowledgment;
- substantive response;
- owning-domain effect.

## 6.1 Communication-gated effect

1. Exact addressee/channel/member/rule/calendar versions are frozen before issue.
2. Communication facts are non-implicative; a profile requiring delivery plus acknowledgment requires both explicit facts.
3. First accepted satisfaction under the then-governing admissibility criteria creates one canonical immutable `CommunicationSatisfactionSnapshot`.
4. The snapshot is evidence/control history, not domain truth.
5. A separate owning-domain command consumes the frozen snapshot—not a live recomputation over current observations—and validates current lifecycle/authority before establishing one effect once.
6. A callback correction/retraction received after snapshot creation but before establishment is corrective/contradictory evidence and does not automatically invalidate the snapshot.
7. Valid owning-domain cancellation, withdrawal or supersession before establishment may block the establishment command through its current lifecycle guard.
8. Later evidence correction never silently reverses or retimes an established effect; consequence change requires owning-domain correction.
9. Satisfaction snapshots that never establish an effect remain historical evidence with explicit establishment disposition.

Retention, redaction, disposition and holds preserve identity, audit, authority and required commercial meaning.

External content is untrusted and cannot instruct system or agent behavior.

---

# 7. Integration, migration, API and effect uncertainty

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.7_integration_migration_api_contracts/P1_7_FROZEN_INTEGRATION_MIGRATION_API_CONTRACT_V1_0.md`, its final checkpoint and incorporated W-48–W-51 closures. The full contract binds.

Exactly four operation classes exist:

- QUERY;
- PROPOSAL;
- COMMAND;
- ASYNC_OPERATION.

Proposal is non-authoritative. All state-changing initiators use one product OperationRegistry. No UI, import, connector, chat or agent raw mutation path exists.

DomainEvent, IntegrationEvent, TransportEnvelope and ExternalObservation are distinct.

Every outbound attempt binds immutable PublicationIntent and stable command/publication/continuation identities.

Effect stages are exactly:

1. PRE_ACCEPTANCE;
2. ACCEPTED_PRE_EFFECT;
3. EFFECT_INDETERMINATE;
4. EXTERNAL_EFFECT_EMITTED;
5. DOMAIN_EFFECT_ESTABLISHED;
6. TERMINAL_NO_EFFECT;
7. PARTIAL_EFFECT.

Timeout, missing callback or absence never proves no effect. Positive evidence is required for a no-effect claim after an effect-bearing attempt.

While indeterminate, ordinary retry, rebind, cancel-as-resolution and conflicting replacement are prohibited. Lookup, reconciliation, evidence capture, manual/block and explanation remain allowed.

An unresolved position may close operationally under explicit accepted-unresolved-variance disposition without asserting no effect or permitting replay.

Authentic or potentially relevant uncorrelated observations remain retained and quarantined under typed authenticity/admission class. They cannot establish domain truth. They may later be correlated, classified unrelated/invalid/duplicate or disposed only under evidence-retention authority; disposal cannot remove an active reconciliation dependency.

Connector conformance changes current/future eligibility, not historical truth.

Migration uses explicit class, immutable manifest and per-domain acceptance profile. It never fabricates state, balance, provenance or history.

---

# 8. Reporting, analytics and controls

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.8_reporting_analytics_control_model/P1_8_FROZEN_REPORTING_ANALYTICS_CONTROL_MODEL_V1_0.md`, its final checkpoint and incorporated watch closures. The full contract binds.

Reports are projections over authoritative facts, never truth writers.

Every load-bearing metric binds exact definition/version, purpose/non-meaning, source authority, grain, population, denominator, contribution, formula/operator versions, time, actual family, currency/FX, quality/use/access and correction/restatement lineage.

Calculation uses a product-controlled typed operator registry. Arbitrary SQL, scripts, runtime joins, tenant operators and hidden adjustments are prohibited.

Contribution identity separates occurrence, economic lineage, conservation group and metric-specific contribution/disposition.

Population separates declared eligible, evaluated, restricted and safely disclosable sets.

Incomplete population treatment is exactly:

- block;
- explicit evaluated subset;
- deterministic range.

A plausible partial point total is prohibited. Unknown population extent cannot produce a subset point value.

Quality is a complete vector. Use is permitted, limited or blocked. Report title/composition cannot upgrade member use.

Issued snapshots are immutable. Recalculation, semantic change, source correction, defect and restatement remain distinct.

Every load-bearing metric/report/use binds a versioned `MaterialityAndUsePolicy`. It defines quantitative/qualitative materiality, unknown/unbounded treatment and whether a change requires recalculation, formal restatement, disclosure, notification or reliance block. Absence of the required policy blocks new load-bearing reliance.

New use of an old report requires `SubsequentRelianceAssessment`.

Portfolio aggregation recomputes target population, quality and use; preserves correction identity; blocks incompatible actual/time/currency/access; and prevents restricted members appearing absent.

Control queues are derived. Acknowledgment, assignment, snooze or accepted variance does not clear the source predicate.

---

# 9. UX, interaction and external participation

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.9_user_experience_interaction_model/P1_9_FROZEN_USER_EXPERIENCE_INTERACTION_MODEL_V1_0.md`, its final checkpoint and incorporated watch closures. The full contract binds.

Every affordance is one of QUERY, PROPOSAL, COMMAND, ASYNC_OPERATION, NAVIGATION or LOCAL_PRESENTATION interaction.

No hidden command through selection, filter, drag/drop, annotation, autosave, upload, import, spreadsheet or chat wording.

Consequential action binds exact target/member versions, actor/represented principal, authority/DOA, values, evidence, limitations, recipients, consequences/non-effects, correction and unknown-effect risk.

Confirmation is operation-specific, same-principal and equal-or-stronger assurance. Material change invalidates it.

A durable/retrievable InteractionContinuationAnchor exists before effect-bearing transmission. Creating it only inside the same effect-bearing request is insufficient.

Bulk uses exactly one closed mode: atomic domain set, independent continue, independent stop-on-blocking or ordered dependent.

Navigation, tasks and queues are derived and never a universal case root or truth writer.

External participation supports secure task link, email/file, buyer-on-behalf capture, optional tenant/buyer-relationship workspace, structured-file round trip and manual/offline fallback. No supplier network/profile/reputation/marketplace.

Every response binds exact grant, event/schema/member version, actor assurance, source content, timing and one closed disposition. Only valid or explicitly allowed late responses enter the governed response population.

Every load-bearing field binds a product-owned semantic key/family. Tenant configuration cannot create field meaning, formula, condition, validator, state or effect. Free text and unregistered content remain evidence until cited normalization is explicitly accepted.

Load-bearing disclosure is inline/adjacent as required and must survive compact, mobile, export, print and future chat. Subset is not total; range is not point; restricted is not absent; issued/current/restated and current reliance remain distinct.

V1 first-party web target is WCAG 2.2 AA with keyboard, status/error, review, reflow, mobile and Arabic/RTL semantics.

Every chat/AI-supported action has a conventional equivalent.

---

# 10. Nonfunctional, security, lifecycle, deployment and AI readiness

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling contract: `04_phases/phase_1/P1.10_nonfunctional_ai_readiness_residual/P1_10_FROZEN_NONFUNCTIONAL_AI_READINESS_RESIDUAL_V1_0.md`, `P1_10_CLAUDE_ROUND_2_WATCH_CLOSURE_V1_0.md`, final checkpoint and incorporated watch closures. The full contracts bind.

## 10.1 NFR conformance

Every NFR binds exact workload, SLI formula/population/window, percentile/distribution, threshold, C0–C3 criticality, measurement health, test evidence, conformance and fallback.

Unverified is not achieved. Missing telemetry cannot improve a claim.

C0 integrity/security/authority/durability requires pass and has no waiver, lower envelope or error budget.

Acknowledged authoritative/evidence/issued/idempotency records require semantic RPO 0 and an accepted durability proof.

RTO/RPO, daily integrity, monthly sampled restore, quarterly end-to-end restore and annual disaster exercise are specified. A backup not restored in the previous quarter cannot support the claim.

Degradation protects tenant/security, durability/effect safety, evidence/submission attempt, result lookup and deterministic core before optional search/import/connectors/AI.

Telemetry remains distinct from audit/domain truth. Security/privacy/residency/lifecycle covers primary and derived copies including backups, logs, search, prompts, outputs, embeddings, retrieval, memory, evaluation and provider files.

Files, archives, parsers, imports, exports, quotas and deployment are finite/versioned and cannot silently truncate or create semantics.

## 10.2 Product-owned AI capability

Every runtime AI capability belongs to a product-authored `AICapabilityRegistry` definition. Product owns purpose/non-use, output class, prompts/instructions, source classes, context/retrieval, tools, authority ceiling, review, evaluation, resource floor, provider compatibility, isolation/residency/retention/training and AI-off fallback.

Tenant settings may only narrow. `ConfigurationMonotonicityCheck` runs before activation and on every material capability, configuration, source, tool, authority, evaluation, resource, provider or isolation change.

## 10.3 Registered source admission

A tenant may add a source only through an activated product-registered `AISourceClassVersion` and its admission/conformance contract. Tenant labels, URLs, files, examples or connectors cannot create source semantics. Admission does not create authority.

## 10.4 Provider/model evaluation

Every selectable provider/model profile carries its own exact version/region, compatibility, privacy/residency/training posture, resource limits, current `EvaluationSufficiencyDisposition`, adversarial validity and activation/expiry state.

A profile never inherits another profile’s evaluation. Only a current capability-specific `SUFFICIENT_PASS` profile may activate.

## 10.5 Context and resource behavior

AI context uses complete, known subset, deterministic range, segmented, access-restricted, unknown-gap or blocked disposition.

“All,” “total,” “complete,” “none” and “current” require complete underlying product proof. Citations do not substitute for coverage.

When a stricter tenant budget cannot fit mandatory context, citations, safety, confirmation and audit, the only outcomes are:

- queue;
- separately evaluated smaller product profile;
- explicitly narrower declared task scope;
- allowed evaluated subset or deterministic range under frozen use/disclosure rules;
- abstain;
- AI-off deterministic/manual fallback.

Budget cannot silently trim mandatory context, redefine completeness, skip review/citation/confirmation or select an unevaluated provider.

## 10.6 Evaluation and authority

Activation requires sufficient independent samples, critical strata, reviewed ground truth, one-sided 95% lower bounds for load-bearing rates and current adversarial coverage. Only current `SUFFICIENT_PASS` activates.

Agent levels are L0 disabled, L1 read/explain, L2 draft/propose, L3 recommend, L4 prepare exact command for human confirmation, L5 transmit the exact already-confirmed same-principal digest and L6 non-generative deterministic automation only.

No general autonomous commercial agent. Sub-agent authority is intersection-only. Effect-indeterminate pauses continuation.

Autonomous award, Commitment, certification, payment, external issue, grant, registry/policy change, deletion/hold, provider/residency change and uncertainty resolution are prohibited.

AI/provider outage leaves deterministic A0–A3 complete.

---

# 11. Canonical subject, action and report ownership

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling P1.11 sources: `P1_11_ARCHITECTURE_TRACEABILITY_INDEX_V0_1.md`, `P1_11_ACTION_SURFACE_API_REPORT_CATALOGUE_V0_1.md`, `P1_11_MASTER_REQUIREMENT_TRACEABILITY_MATRIX_V0_1.md`, `P1_11_GOLDEN_THREAD_ATLAS_V0_1.md` and execution results. These artifacts bind their exact inventories.

No subject family is a universal root.

Every state-changing human/external/system action maps to one COMMAND or ASYNC_OPERATION; every read/draft maps to QUERY or PROPOSAL.

Every operation binds exact authority, evidence, guards, target/member versions, consequence/non-effect, idempotency, event/publication, result/effect stage and correction/recovery.

Every supported SPINE action has a conventional owning surface. AI, chat, connector or public API exposure is optional and authorization-filtered.

No UI, report, queue, connector, evidence, migration or AI surface writes business truth outside the owning operation.

Mandatory no-connector A0–A3 reports cover requirement/allocation, RFQ/tender, supplier response/revision, normalization/comparison readiness, recommendation/approval, AwardDecision/handoff, open controls/data quality and immutable sourcing-event snapshot.

---

# 12. Traceability and known debt

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling sources: `P1_11_MASTER_REQUIREMENT_TRACEABILITY_MATRIX_V0_1.md`, its correction artifact, `P1_11_WATCH_OPEN_DEBT_RECONCILIATION_V0_1.md`, canonical ADR log and ADR-history manifest.

Correct 92-requirement disposition:

- 66 fully traced;
- 19 physical proof required under frozen semantics;
- 5 external validation required;
- 1 legal/jurisdiction evidence required;
- 1 non-SPINE deferred: ADR-0011 detailed suspense/attribution operating mechanics;
- 0 architecture gaps.

All W-14–W-91 have explicit frozen/build/validation/legal/deferred dispositions.

W-92–W-96 are closed by P1.11 Round-1 remediation:

- W-92 versioned MaterialityAndUsePolicy governs formal restatement obligation;
- W-93 names ADR-0011 as the non-SPINE deferral;
- W-94 source admission is product-registered;
- W-95 provider evaluation is profile-specific and non-inherited;
- W-96 V1/V2 uses recorded cross-functional adjudication.

Standing external/legal/build debt includes FT-02, FT-06, FT-09/CR-02, FT-10, contractor/supplier evidence, prototype comprehension, thin-slice build, P07 feasibility, NFR proof, AI evaluation/pilot, live pilot/commercial evidence and ADR-0010 jurisdiction specifics.

---

# 13. Golden-thread validation

> **SUMMARY POINTER — NON-EXHAUSTIVE.** Controlling sources: `P1_11_GOLDEN_THREAD_ATLAS_V0_1.md`, `P1_11_GOLDEN_THREAD_EXECUTION_RESULTS_V0_1.md` and P1.11 internal no-invention audits.

Twenty representative threads cover A0–A3, P07, evidence/communication, migration/integration uncertainty, closed-period correction, reports, external participation, untrusted import, outage/restore and AI-off.

Internal paper execution and fresh replay passed with zero architecture invention.

The following branches are mandatory reference checks:

- GT-10 uses frozen satisfaction snapshot plus current owning-domain establishment guard;
- GT-12 retains/quarantines uncorrelated observations and preserves indeterminacy;
- GT-13 corrects through immutable occurrences and explicit report restatement/reliance;
- GT-20 cannot buy past mandatory context/evaluation/confirmation and always retains deterministic fallback.

Paper execution is not build or field validation.

---

# 14. Permitted physical decisions

Phase 2/build design may choose language, framework, physical module/service boundaries, database/event-store/outbox/queue/search/cache/object storage, physical schemas/indexes/partitioning, cloud/region/topology, identity vendor, email/connectors, observability/security tools, renderer/file processing, AI provider/runtime, endpoint syntax, page routes/components/design system and test tooling.

Every choice must prove preservation of frozen identity, ownership, history/configuration, one-writer authority, operations/guards/effects/recovery, evidence/reliance/issue, commercial conservation/correction, report population/time/quality/use/restatement, interaction disclosure/confirmation/continuation/accessibility, NFR/privacy/residency/lifecycle, AI registry/context/evaluation/authority/isolation and A0–A3 no-dependency floor.

A physical choice cannot create a new truth writer or independent XL.

---

# 15. Ordered gates after architecture

## V0 — P1.11 closure

Dual hostile PASS and final frozen master specification.

## V1 — contractor/supplier evidence

Before irreversible build-scope commitment: at least 5 contractor participants from at least 3 organizations including 3 UAE-adjacent, and at least 10 suppliers including 5 UAE-active; target FT-02, FT-06, FT-09/CR-02 and FT-10.

A recorded `ValidationGateDecision` is required from a cross-functional panel containing product/domain architecture, independent validation, procurement practitioner, supplier/external participant and accessibility/UX representation as applicable.

## V2 — prototype comprehension

Before non-throwaway thin slice: at least 8 internal and 8 external users, with zero critical meaning misunderstanding in the final qualifying round.

Critical misunderstanding includes any misunderstanding capable of causing unauthorized action, wrong commercial meaning, false submission/receipt meaning, hidden limitation, evidence/authority confusion or unsafe recovery. Ambiguity is critical until independently resolved.

## V3 — deterministic A0–A3 thin slice

No AI or named-connector dependency, zero architecture invention, and restore/load/isolation/NFR instrumentation.

## V4 — P07 feasibility

Separate proof before P07 build or commercial commitment.

## V5 — NFR verification

Verify the declared envelope and conformance profile.

## V6 — AI capability gates

Deterministic/manual path, sufficient evaluation, adversarial testing, shadow and controlled pilot per capability.

## V7 — controlled live pilot

At least 2 contractors, 3 tenders each and 10 suppliers; evaluate ≤5-working-day first live tender and ≥80% supplier-completion hypotheses.

## V8 — commercial/release decision

Report architecture, field evidence, build, NFR, AI, pilot and commercial evidence separately. Results may revise or kill hypotheses.

Architecture PASS is not product, market or commercial validation.

---

# 16. Build-decomposition entry contract

After final P1.11 dual PASS, Phase 2 may translate—not redesign—the architecture into dependency-ordered build instructions.

Each build block must identify:

- requirement IDs;
- accepted ADRs and exact frozen clauses;
- controlling summary pointer and source path;
- subjects/facts/events/operations;
- authority/evidence/guards/effects/corrections;
- surface/API/report ownership;
- NFR/security/privacy/residency obligations;
- golden threads and acceptance tests;
- dependencies, migration and rollback;
- external-validation status;
- prohibited reinterpretations.

An architecture question is a failed decomposition gate and returns to controlled reconciliation. A physical-design question may proceed under the permitted-decision contract.

Phase 2 decomposition does not authorize code before the ordered V1/V2 authorization decision.

---

# 17. No-narrowing conformance requirement

The final P1.11 checkpoint requires a published no-narrowing check comparing this candidate with every frozen phase source.

The check must confirm:

- every summary has a controlling pointer;
- no direct conflict lacks explicit CHG supersession;
- no taxonomy, registry or state set is narrowed;
- no authority/truth path is broadened;
- no guard, prohibition, recovery or unknown/partial branch is weakened;
- no validation/activation gate is moved or weakened;
- all Claude-demonstrated omissions are closed;
- no unresolved architecture question remains.

Any failure blocks Phase 1 closure.

---

# 18. Candidate closure claim

This candidate claims that all load-bearing business meaning is frozen, all representative threads execute without semantic invention, every supported action has one owning operation/surface, no numbered watch remains an architecture blocker, no second XL or hidden truth writer exists, and all remaining uncertainty is explicitly physical, external, legal or bounded non-SPINE detail.

This claim remains subject to the no-narrowing check, internal post-remediation recheck and independent Claude Round-2 PASS.