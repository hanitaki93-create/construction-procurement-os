# P1.9 — Integrated User Experience & Interaction Candidate v0.3

**Date:** 2026-08-01  
**Status:** POST-CLAUDE-ROUND-1 REMEDIATED CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Supersedes:** v0.2 and earlier P1.9 candidate wording where conflicting  
**P1.9:** ACTIVE  
**P1.10+:** LOCKED  
**Product/frontend code:** LOCKED

---

# 1. Governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use, correction or field meaning.**

No interface, task, form, queue, portal, document view, dashboard, export, spreadsheet, chat surface or persistent workspace is a business-truth writer.

P1.9 defines interaction meaning and mandatory disclosure. It does not select frontend framework, component library, database, renderer, exact schema, pixels, AI model or product code.

---

# 2. Interaction classes and bounded actions

Every affordance is exactly:

- QUERY_INTERACTION;
- PROPOSAL_INTERACTION;
- COMMAND_INTERACTION;
- ASYNC_OPERATION_INTERACTION;
- NAVIGATION_INTERACTION;
- LOCAL_PRESENTATION_INTERACTION.

Every command/async affordance binds:

- OperationKey/version;
- acting and represented principal;
- tenant/project/ContractingAuthorityContext;
- exact target/member identities and versions;
- current authority, delegation and DOA;
- required evidence, configuration and prerequisites;
- consequence, explicit non-effect, reversibility and correction;
- idempotency, continuation and recovery;
- current eligibility and typed denial.

Navigation, selection, filtering, sorting, drag/drop, annotation, auto-save, upload, import, spreadsheet edit and chat wording cannot perform hidden command semantics.

---

# 3. Preview, confirmation and invalidation

Consequential interaction preserves:

`intent → context → draft/input → prevalidation → preview → confirmation → submit → accepted/rejected → effect pending/established/partial/indeterminate/no-effect → recovery/correction`

`OperationPreview` exposes exact:

- target/population/member set;
- actor and represented principal;
- authority/DOA/delegation;
- values, dates, currency, units and time basis;
- response/schema/member versions where applicable;
- evidence/source versions and freshness;
- limitations and blockers;
- recipients/publication;
- consequences and explicit non-effects;
- correction/reversibility;
- idempotency, bulk and unknown-effect risk.

Every consequential operation version binds a `ConfirmationInvalidationPolicyVersion`.

Default:

> Any change to a load-bearing target, member set, principal, represented principal, authority, recipient, value basis, field/schema meaning, evidence version, configuration/policy or effect consequence invalidates confirmation unless a registered policy proves a bounded non-material class.

A confirmation binds exact acting/represented principal and assurance. Reauthentication by the same principal may continue only after current authority/access/DOA recheck and no invalidating change. A different principal or represented principal requires new preview and confirmation.

No tenant-authored confirmation materiality formula, script or conditional expression.

---

# 4. Continuation before effect-bearing transmission

Every COMMAND/ASYNC_OPERATION reserves an immutable `InteractionContinuationAnchor` before the first effect-bearing transmission.

It binds:

- anchor identity;
- OperationKey/version/class;
- LogicalCommandId and channel/client submission identity;
- principal/context;
- target/member/schema versions;
- preview/confirmation identity and expiry;
- idempotency and recovery authorization.

An action is blocked until `AnchorAvailabilityProof` confirms that the initiating user/channel can retrieve the continuation identity and a conventional recovery route before the effect-bearing call.

Permitted proof:

- CLIENT_GENERATED_AND_DURABLY_PERSISTED;
- SERVER_RESERVED_AND_ACKNOWLEDGED in a separate preflight call;
- CHANNEL_EMBEDDED_AND_RETRIEVABLE through an independently accessible task/submission record.

Creating an anchor only inside the same effect-bearing request does not qualify.

Recovery:

- proven not accepted → safe resume/retry under same anchor;
- acceptance/effect possible → lookup/reconciliation only;
- changed command context → new preview/logical command;
- lost anchor is never proof of no effect.

---

# 5. Typed outcomes

`InteractionOutcomeEnvelope` binds:

- InvocationId, LogicalCommandId and AsyncOperationId;
- operation/context/actor/target;
- acceptance status;
- operational status;
- effect stage and per-item stages;
- authoritative domain result/event identity;
- publication/external correlation;
- typed rejection/partial/unknown explanation;
- safe next action and recovery reference.

One success/failure boolean is prohibited.

Required distinctions:

- request accepted ≠ effect established;
- provider accepted ≠ delivered/acknowledged/domain effect;
- approval recorded ≠ AwardDecision ≠ Commitment;
- pending names what is pending;
- effect indeterminate blocks ordinary resend;
- partial exposes every item result.

---

# 6. Bulk execution

Every bulk operation binds exactly one:

- ATOMIC_DOMAIN_SET;
- INDEPENDENT_ITEMS_CONTINUE;
- INDEPENDENT_ITEMS_STOP_ON_BLOCKING;
- ORDERED_DEPENDENT.

Policy binds:

- frozen batch/member/query snapshot;
- per-item logical command/publication identities;
- dependency graph;
- shared evidence/artifact/context dependencies;
- preflight and confirmation;
- stop/continue rule;
- indeterminate behavior;
- cancellation and correction/compensation limits;
- item-level recovery.

False external atomicity is prohibited. Whole-batch resend after an unknown item is prohibited. Mixed results remain partial/typed mixed outcome.

---

# 7. Work context, navigation and internal tasks

Every view binds tenant, project, ContractingAuthorityContext, principal/represented principal, canonical subject/type/version/as-of and access scope.

Polycentric navigation links:

- requirement;
- allocation;
- optional package;
- tender/RFQ;
- supplier response/revision;
- normalization/comparison;
- recommendation;
- approval;
- AwardDecision;
- optional Commitment;
- evidence/communication;
- control observation;
- report/snapshot;
- operation result/recovery.

Tasks, queues, activity feeds, saved views, cards and navigation groups are derived. Moving, assigning, acknowledging or closing them cannot change domain state without a separate command.

No universal procurement case root.

---

# 8. Approval and irreversible action

Approval binds exact proposal/version, evidence/limitations, reviewer authority/DOA/delegation, sequence/quorum and typed outcome.

Outcomes include approved, conditional approval, return, information request, rejection, decline/conflict, abstention, expiry, supersession and cancellation.

Approval remains distinct from downstream domain command and established effect. A revised proposal does not inherit approval silently.

High-consequence review shows exact values/member set, approval basis, actor/represented principal, evidence/limitations, recipients/publication, correction and indeterminate-effect risk.

---

# 9. Product-owned field and schema grammar

## 9.1 Registry rule

All internal intake, external response, structured-file, normalization and comparison schemas are composed only from a versioned product-owned registry of typed field families and registered semantic field keys.

Every load-bearing field binds:

- RegisteredSemanticFieldKey;
- FieldFamilyKey/version;
- source/normalized layer;
- business definition and explicit non-meaning;
- value type, unit/currency/date/time basis;
- grain/cardinality;
- allowed channel;
- validation family;
- normalization/comparison eligibility;
- evidence/provenance;
- access/sensitivity;
- lifecycle/successor relation.

## 9.2 Closed top-level field families

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
- REGISTERED_LINE_OR_TABLE_GROUP composed only from registered children.

A type family alone does not create meaning. A load-bearing value requires one exact registered semantic field key.

## 9.3 Tenant configuration

Tenant/event configuration may select registered fields, apply non-conflicting labels/help/localization, order/group fields, set permitted requiredness, select allowed enum subsets, activate product-defined applicability/validation policies, apply permitted bounded constraints and choose supported attachment/line schemas.

Tenant configuration may not:

- author semantic field keys/families;
- change meaning, grain, unit, monetary role, denominator or actual/status family;
- create arbitrary conditional logic, formulas, scripts, computed fields, executable validation, runtime joins or source lookups;
- make free text a load-bearing normalized value;
- create custom state, command, effect or metric population rules;
- let a label override canonical meaning.

A tenant label that conflicts with canonical meaning is invalid. Canonical meaning remains inspectable at the task and comparison surface.

## 9.4 Evidence-only content and normalization

Free text, unregistered columns, arbitrary email text and unsupported file content remain attributed source evidence.

They may become a registered normalized value only through a bounded proposal and explicit review/accept command binding exact source evidence, registered semantic key, transformation/unit/basis, differences and limitations.

AI may later propose but cannot accept or invent meaning.

## 9.5 Schema versioning and comparability

Every event, task, form, template, response and comparison binds exact `ResponseSchemaVersion`.

Semantic field/family, grain, unit/currency role, validity-changing requiredness, enum meaning, applicability/validation, row structure, acknowledgment or normalization eligibility changes create a new semantic schema version and impact assessment.

Responses across versions are directly comparable only when semantic keys and relevant versions/policies are compatible. Otherwise segment, use explicit registered mapping or block.

Label/layout-only revision is allowed only when canonical meaning and participation validity remain unchanged.

Internal forms, buyer capture, imports, corrections and later chat tools use the same registry.

New field families or load-bearing roles require prospective architecture change and hostile review. Runtime tenant creation is prohibited.

No generic page/form builder.

---

# 10. External participation / ADR-0016

External participation uses a bounded hybrid:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round-trip;
- manual/offline fallback.

Minimum is secure link and/or email/file with buyer-on-behalf fallback. No persistent account or network prerequisite.

`ExternalTaskGrant` binds tenant-private supplier relationship, exact contact/mailbox/team, task/version, operations, confidentiality, due/expiry, assurance, transfer/team policy, revocation and occurrences.

Forwarding never transfers grant. Shared-mailbox limitations and human attribution remain visible. Contact transfer records old/new contact, approval, effective revocation and notification occurrence.

## V1 workspace boundary

Persistent workspace is tenant/buyer-relationship scoped.

A reusable technical authentication credential may enter separately authorized tenant-private workspaces, but V1 prohibits:

- cross-tenant supplier business profile/directory;
- cross-buyer task or relationship history;
- imported grants/authority;
- pooled activity, performance, reputation, recommendation or benchmark;
- supplier marketplace/network mode.

---

# 11. External submission validity

Every event/task/schema version binds `ExternalSubmissionAcceptancePolicy` covering:

- allowed channel and exact task/member/schema version;
- supplier relationship/contact/organization assurance;
- shared mailbox/response team/signatory;
- terms/NDA/addendum acknowledgment;
- registered mandatory fields/attachments;
- due/late/withdrawal;
- buyer-on-behalf eligibility/source evidence;
- file version/integrity;
- confirmation/reconfirmation;
- response-population entry.

Every response has exactly one disposition:

- CAPTURED_EVIDENCE_ONLY;
- PROVISIONAL_PENDING_CONFIRMATION;
- VALID_SOURCE_SUBMISSION;
- REJECTED_INVALID;
- WITHDRAWN;
- SUPERSEDED_BY_REVISION;
- LATE_ACCEPTED_WITH_LIMITATION;
- QUARANTINED_UNCORRELATED_OR_UNTRUSTED.

Only valid or explicitly late-accepted submissions enter the governed response population.

`ExternalActorAssuranceRecord` preserves technical assurance, asserted person/role, organization/relationship, mailbox/team, signatory/attestation evidence, limitations and buyer-on-behalf source/actor.

A valid source submission may still contain evidence-only content that is not a normalized load-bearing value.

---

# 12. Revisions, addenda and structured files

Every submission/revision binds task/schema/member version, actor/channel/assurance, source values/attachments, times, terms/addendum acknowledgment, supersession and receipt.

Revisions never overwrite.

Material buyer change creates a new version and explicit prior-response treatment. Stale templates are blocked.

Structured file import remains:

`upload/untrusted capture → version/integrity validation → parse proposal → row validation/differences → review → explicit submit command → receipt`

---

# 13. Submission receipt

Every receipt shows inline/directly adjacent:

- submission/revision identity;
- task/event/schema/member version;
- current disposition;
- whether it entered the governed response population;
- outstanding identity, terms, addendum, field or attachment conditions;
- what receipt establishes;
- what it does not establish.

Unless separately true, receipt never implies compliant, technically/commercially accepted, complete, shortlisted, awarded, contractable or Commitment established.

Receipt semantics persist across portal, email, PDF, spreadsheet and status lookup.

---

# 14. Evidence/document/communication

Distinct layers:

- source evidence;
- capture observation;
- normalized representation;
- evaluation adjustment;
- supplier-confirmed basis;
- issued artifact;
- external reference;
- annotation;
- correction/retraction;
- redacted/disposed state.

Upload is not accepted fact or satisfied prerequisite. Filename/hash/current URL is not business identity/authority. Issued member set is immutable.

Communication remains prepared, issued, dispatch attempted, provider accepted, delivered/received, read/open, receipt acknowledgment, content response, domain effect and failed/partial/indeterminate.

External content is untrusted data and cannot instruct system or agent behavior.

---

# 15. Load-bearing disclosure and parity

Every load-bearing value carries `LoadBearingDisclosureBundle`.

Every surface/use binds one:

- INLINE_MANDATORY;
- ADJACENT_MANDATORY;
- EXPANDABLE_MANDATORY with inline consequence;
- DETAIL_AVAILABLE;
- PROHIBITED_ON_SURFACE.

Inline when applicable:

- value-state label;
- not-total/range meaning;
- blocked/limited/prohibited-use consequence;
- current reliance block;
- material stale/mixed-time/indeterminate/non-comparable consequence;
- exact actual/status family where ambiguous;
- consequential target/member set and represented principal;
- external submission disposition and receipt non-meaning.

Tooltip, badge-only, color, hover, optional drill or secondary page cannot satisfy inline/adjacent disclosure.

`DisclosureParityManifest` proves exports, copies and chat preserve mandatory human/machine meaning. A surface unable to preserve meaning is prohibited.

---

# 16. Reporting and historical reliance

Subset is labelled evaluated subset, never total, with eligible/evaluated/unevaluated population and gaps.

Range shows both bounds/unbounded ends; no midpoint.

Missing/unavailable/restricted/blocked are not zero or blank.

Current live, as-of, issued, recalculated, restated/superseding and withdrawn remain distinct. Old issued URL does not default to current data.

New load-bearing use of an old report requires current SubsequentRelianceAssessment.

Approve/award/issue commands bind exact permitted result/snapshot/version.

Restricted details never imply absent/zero; safe aggregate requires disclosure/inference policy.

---

# 17. Control queues

Control observation binds source predicate, subject, observed/as-of time, materiality, assignment/ack/escalation, accepted variance and resolution condition.

Acknowledgment, assignment, snooze or queue movement does not clear source predicate. Accepted variance does not mean resolved, compliant or no-effect.

No generic GRC/case/ticket platform.

---

# 18. Errors, recovery and fallback

Errors distinguish input, authorization, DOA, evidence, version/state conflict, stale/unavailable source, pre-acceptance transport, duplicate/idempotency, async block, partial batch, effect indeterminate, unsupported capability, file/import, untrusted content, localization/format and safe internal reference.

Generic Retry is prohibited where effect may exist.

Recovery is correction, re-preview, result lookup, idempotent replay, resume, safe pre-acceptance retry, reconciliation, manual/buyer capture, structured fallback, block/support or correction command.

Offline/manual/file fallback preserves task/schema/version, source/channel/time, evidence, actor, validation/proposal/command, idempotency and limitations.

---

# 19. Accessibility, mobile and localization

V1 first-party web task, report and external-participation surfaces target **WCAG 2.2 Level AA** for supported journeys.

Binding semantic floor includes:

- keyboard operation;
- programmatic name/role/state/value/relationships;
- meaningful focus and error association;
- no color/shape/hover/drag/spatial-only meaning;
- accessible success/error/waiting/progress;
- review/correct/confirm or governed reversibility for consequential submissions;
- responsive/zoom/reflow without disclosure loss;
- exact date/timezone/currency/unit;
- Arabic/RTL structural direction and mixed-script safety;
- translations derived, not source evidence.

Each task declares FULL_MOBILE_TASK, SAFE_MOBILE_REVIEW_AND_ACTION, MOBILE_READ_DECLINE_HELP_ONLY or DESKTOP_REQUIRED_WITH_EXPLICIT_FALLBACK.

A third-party/document/file path without equivalent access requires an explicit accessible first-party or assisted/manual fallback.

Exact testing/certification technology is deferred.

---

# 20. Conventional UI and later chat

All A0–A3 tasks, search, history, reports and recovery remain complete with chat disabled.

Every chat-supported action has conventional equivalent and uses the same OperationRegistry, authority, preview, confirmation, continuation anchor, outcome, field registry and disclosure parity.

Session memory, old reports and inference are non-authoritative. Ambiguous command/reference requires exact resolution and preview or abstention.

No hidden agent-only write, limitation hiding, invented value, unsupported causation or cross-tenant learned influence.

P1.10 owns reasoning/autonomy.

---

# 21. A0–A3 activation

The complete conventional thread works without named connector, persistent supplier account/network, chat, AI, warehouse or P07:

1. capture authorized requirement/source using registered fields/evidence;
2. establish allocation/optional package;
3. prepare tender draft/recipients/exact issue and response-schema version;
4. issue manually or through activated channel;
5. invite through secure link/email with no account requirement;
6. receive structured/email/file/buyer-captured response;
7. classify submission disposition and field/evidence eligibility;
8. preserve revision/addendum/schema history;
9. normalize and compare registered semantic fields while preserving source/evaluation layers;
10. create recommendation;
11. record approval outcome;
12. establish AwardDecision through separate command;
13. perform manual/activated external handoff;
14. recover from validation, stale version, duplicate, partial or indeterminate outcomes;
15. view reports/history with exact disclosure/reliance.

---

# 22. Candidate ADR posture

Remain proposed pending Claude PASS:

- ADR-0016 — bounded hybrid external participation plus product-owned field/schema registry and V1 tenant-scoped workspace boundary;
- ADR-0038 — operation interaction, confirmation, continuation, bulk and typed outcomes;
- ADR-0039 — work context/navigation/no second root;
- ADR-0040 — load-bearing disclosure/history/reliance/receipt parity;
- ADR-0041 — typed recovery/accessibility/localization/conventional-chat coexistence.

ADR-0017 remains P1.10-owned.

---

# 23. Evidence debt and build falsification

Primary UAE supplier-side validation remains open.

P1.10/final Phase 1 checkpoint must carry a falsification/build-validation plan for secure-link/account tolerance, email/file/buyer capture, field burden/terminology, mobile/Arabic/RTL, revisions/addenda, receipt interpretation and support/fallback.

This debt does not reopen settled semantics and cannot disappear from build gates.

---

# 24. Scope guard

Prohibited:

- generic page/form builder;
- tenant-authored semantic fields/formulas/conditions/validation expressions;
- BPM/workflow designer;
- CDE/collaboration suite;
- supplier network/marketplace/cross-tenant business profile;
- GRC/case system;
- BI/dashboard builder;
- AI/copilot subsystem;
- product/frontend implementation.

P07 remains the sole independent XL.