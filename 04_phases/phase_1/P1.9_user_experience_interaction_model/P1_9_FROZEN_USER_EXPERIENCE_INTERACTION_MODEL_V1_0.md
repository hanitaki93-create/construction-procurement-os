# P1.9 — Frozen User Experience & Interaction Model v1.0

**Date:** 2026-08-01  
**Status:** FROZEN / CONTROLLING P1.9 SEMANTIC CONTRACT  
**P1.9:** PASS / CLOSED / FROZEN  
**P1.10:** MAY BEGIN AFTER CANONICAL STATE UPDATE  
**Product/frontend code:** LOCKED / NOT STARTED

---

# 1. Purpose and precedence

This contract freezes deterministic interaction meaning across internal task surfaces, external participation, evidence/document/communication views, reports, exports, control queues, manual/file paths and future chat surfaces.

It controls over conflicting P1.9 candidate, remediation, audit and watch wording.

It does not select frontend framework, component library, database/cache/search, renderer, pixel design, branding, physical schema, accessibility test tool, AI model/orchestration or product code.

No later presentation or physical choice may reinterpret this contract.

---

# 2. Governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use or correction meaning.**

The interface is a projection/request surface over registered operations and authoritative facts. It is never a business-truth writer, workflow truth owner, report truth owner, supplier network, CDE, form engine or agent authority.

---

# 3. Interaction classes and hidden-action prohibition

Every affordance is exactly one:

- `QUERY_INTERACTION`;
- `PROPOSAL_INTERACTION`;
- `COMMAND_INTERACTION`;
- `ASYNC_OPERATION_INTERACTION`;
- `NAVIGATION_INTERACTION`;
- `LOCAL_PRESENTATION_INTERACTION`.

Navigation, selection, filtering, sorting, drag/drop, annotation, auto-save, upload, import, spreadsheet processing and chat wording cannot silently execute authoritative action.

Every state-changing affordance binds exact OperationKey/version, acting and represented principal, tenant/project/ContractingAuthorityContext, target/member identities and versions, authority/DOA/delegation, evidence/configuration/guards, consequences/non-effects, idempotency and recovery.

---

# 4. Preview, confirmation and invalidation

Consequential interaction preserves:

`intent → draft/input → prevalidation → exact preview → deliberate confirmation → submit → accepted/rejected → effect pending/established/partial/indeterminate/no-effect → recovery/correction`

Preview binds exact actor, context, targets/population, values, dates, currency/units, evidence/freshness, recipients/publication, limitations, consequences, correction/reversibility and unknown-effect risk.

Confirmation:

- is operation-specific and cannot waive blockers;
- binds exact acting and represented principal and assurance class;
- rechecks current authority, delegation, DOA and access at submission;
- cannot transfer through session sharing, forwarding or delegated UI state;
- after reauthentication requires the same principals and equal-or-stronger assurance;
- expires under the versioned `ConfirmationInvalidationPolicyVersion`.

Default invalidation applies to any load-bearing change in target/member set, principal, authority, recipient, value basis, field/schema meaning, evidence, configuration/policy or consequence unless a registered bounded non-material class proves otherwise.

No tenant-authored materiality formula, script or conditional expression.

---

# 5. Pre-transmission continuation and typed outcome

Before the first effect-bearing transmission, the initiating user/channel must possess a retrievable immutable `InteractionContinuationAnchor` and conventional recovery route.

`AnchorAvailabilityProof` is exactly one:

- `CLIENT_GENERATED_AND_DURABLY_PERSISTED`;
- `SERVER_RESERVED_AND_ACKNOWLEDGED` in a separate preflight/reservation exchange;
- `CHANNEL_EMBEDDED_AND_RETRIEVABLE` through an independently accessible task/submission record.

An anchor created only inside the same effect-bearing request is invalid. The action is blocked without proof.

Recovery:

- proven not accepted → safe resume/retry under the same anchor;
- acceptance/effect possible → lookup/reconciliation only;
- materially changed command → new preview/logical identity;
- lost anchor is never proof of no effect.

`InteractionOutcomeEnvelope` preserves invocation/logical/async identities, acceptance state, operational state, effect stage, item-level result, authoritative/publication identities, limitations and safe next action.

Accepted is never displayed as effect established.

---

# 6. Bulk execution

Every bulk operation uses exactly one:

- `ATOMIC_DOMAIN_SET`;
- `INDEPENDENT_ITEMS_CONTINUE`;
- `INDEPENDENT_ITEMS_STOP_ON_BLOCKING`;
- `ORDERED_DEPENDENT`.

Policy freezes member set/query cut, per-item identities, dependency graph, preflight, stop/continue, indeterminate behavior, cancellation, correction/compensation limits, confirmation and recovery.

False external atomicity and whole-batch resend after an unknown item are prohibited. Mixed results remain typed partial outcomes.

---

# 7. Work context, navigation and queues

Every view binds tenant, project, ContractingAuthorityContext, principal/represented principal, canonical subject/version/as-of and access scope.

Navigation is polycentric across requirement, allocation, optional package, tender, response, normalization, recommendation, approval, AwardDecision, optional Commitment, evidence, communication, control, report and operation result.

Tasks, queues, cards, activity feeds, saved views and navigation groupings are derived. Moving, assigning, acknowledging or closing them cannot create domain state without a separate registered command.

No universal procurement case root, generic workflow/case platform or manual actual-state writer.

---

# 8. Approval and irreversible actions

Approval binds exact proposal/version, evidence/limitations, reviewer authority/DOA/delegation, sequence/quorum and typed outcome.

Typed outcomes include approval, conditional approval, return, information request, rejection, decline/conflict, abstention, expiry, supersession and cancellation.

Approval outcome remains distinct from downstream command and established effect. Revised proposals do not inherit approval silently.

High-consequence review exposes exact values/member set, approval basis, actor/represented principal, evidence/limitations, recipients/publication, correction path and indeterminate risk.

---

# 9. External participation — bounded hybrid

V1 external participation is a task-focused bounded hybrid:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round-trip;
- manual/offline fallback.

Secure link and/or email/file form the minimum. First participation cannot require account enrollment.

Persistent workspaces are tenant/buyer-relationship scoped. Reusable technical authentication may identify a person but enters separately authorized tenant-private workspaces.

V1 prohibits cross-tenant supplier business profiles, directories, task/relationship history, reputation, benchmark, recommendation, imported grants, marketplace and network mode.

`ExternalTaskGrant` binds tenant-private relationship, exact contact/mailbox/team, task/version, permitted operations, confidentiality, assurance, transfer/team policy, due/expiry, revocation and communication occurrences.

Forwarding never transfers authority. Contact transfer/reissue records old/new principals and effective revocation. Delivery/read is not authority.

---

# 10. External submission validity and receipts

Every event/task version binds `ExternalSubmissionAcceptancePolicy` covering allowed channel, exact event/member/schema version, relationship/contact/organization assurance, terms/NDA/addendum acknowledgment, mandatory registered content, due/late/withdrawal, buyer-capture eligibility, file integrity/version and response-population entry.

Every response is exactly one:

- `CAPTURED_EVIDENCE_ONLY`;
- `PROVISIONAL_PENDING_CONFIRMATION`;
- `VALID_SOURCE_SUBMISSION`;
- `REJECTED_INVALID`;
- `WITHDRAWN`;
- `SUPERSEDED_BY_REVISION`;
- `LATE_ACCEPTED_WITH_LIMITATION`;
- `QUARANTINED_UNCORRELATED_OR_UNTRUSTED`.

Only valid or explicitly late-accepted submissions enter the governed response population.

Every receipt shows submission/revision identity, task/event/schema/member version, current disposition, whether it entered the governed response population, outstanding conditions, what it establishes and what it does not establish.

Unless separately true, receipt cannot imply compliant, accepted, complete, shortlisted, awarded, contractable or Commitment established. Receipt meaning persists across portal, email, PDF, spreadsheet and status lookup.

---

# 11. Product-owned field and schema grammar

A load-bearing response/comparison value exists only when it binds a product-defined `RegisteredSemanticFieldKey` from a versioned typed registry.

Closed top-level families:

1. `IDENTITY_OR_REFERENCE`;
2. `QUANTITY_WITH_UOM`;
3. `MONETARY_WITH_CURRENCY`;
4. `DECIMAL_MEASURE`;
5. `PERCENTAGE_OR_RATE`;
6. `DATE_OR_DATETIME`;
7. `DURATION_OR_LEAD_TIME`;
8. `ENUMERATED_SELECTION`;
9. `BOOLEAN_OR_ACKNOWLEDGMENT`;
10. `STRUCTURED_TEXT_IDENTIFIER`;
11. `FREE_TEXT_EVIDENCE_ONLY`;
12. `ATTACHMENT_EVIDENCE`;
13. `REGISTERED_LINE_OR_TABLE_GROUP`.

A primitive data type or label never supplies business meaning.

A registered field binds exact meaning/non-meaning, layer, type, unit/currency/time, grain/cardinality, channels, validation family, normalization/comparison eligibility, provenance, access and lifecycle/successor relation.

## Group composition

- arbitrary recursion is prohibited;
- groups use product-registered composition profiles;
- V1 permits registered scalar/evidence children and only explicitly registered one-level row-member composition;
- tenant configuration cannot alter composition depth, child cardinality or row identity;
- deeper/repeating structures require controlled architecture change and hostile review.

## Tenant configuration may

- select supported registered fields;
- provide non-conflicting labels/help/localization;
- order/group fields;
- mark required/optional where permitted;
- select allowed product enum subsets;
- activate registered applicability/validation policies;
- apply allowed tighter constraints;
- select supported attachment/line schemas.

## Tenant configuration may not

- create semantic keys/families;
- alter meaning, grain, unit, currency role or comparison eligibility;
- create arbitrary conditions, formulas, computed fields or scripts;
- create arbitrary regex/cross-field/executable validation;
- create runtime joins/lookups;
- promote free text to normalized truth;
- create states, commands, effects or metric populations;
- override canonical meaning through labels.

## Allowed constraint families

- numeric min/max;
- decimal precision/scale;
- text length min/max;
- date/time earliest/latest;
- duration min/max;
- enum allowed subset;
- attachment count/type bounds;
- row count bounds;
- permitted required/optional;
- registered acknowledgment requirement;
- registered applicability-policy selection.

No other tenant-authored constraint class is active.

---

# 12. Evidence-to-normalized transition and schema compatibility

Free text, email content, attachments, unregistered spreadsheet columns and unsupported file content remain attributable versioned source evidence.

They become a registered normalized value only through bounded proposal and explicit review/accept command citing exact source evidence/version/location, selecting one registered key, recording transformation/unit/currency/basis/limitations, preserving source unchanged and exposing differences. Ambiguous mapping blocks.

AI may propose mapping but cannot accept or invent meaning.

Every event, task, form, structured template, response and comparison binds exact `ResponseSchemaVersion`.

Semantic changes to key/family/version, grain/cardinality, unit/currency role, validity-changing requiredness, enum meaning/options, applicability/validation, row/member structure, acknowledgment or comparison eligibility create a new semantic schema version and impact assessment.

Cross-version compatibility is declared only by product registry through `FieldVersionCompatibilityRelation` and `SchemaVersionCompatibilityRelation`:

- `DIRECTLY_COMPATIBLE`;
- `COMPATIBLE_AFTER_REGISTERED_CONVERSION`;
- `COMPARABLE_WITH_EXPLICIT_LIMITATION`;
- `SEGMENT_ONLY`;
- `MAPPING_PROPOSAL_REQUIRED`;
- `BLOCKED_INCOMPATIBLE`.

No tenant/frontend/import/chat/AI ad-hoc compatibility judgment.

Enum subset changes that affect valid submissions create a new schema version and explicit prior-response treatment. Prior valid responses remain historically valid under their bound schema.

Stale templates are not current merely because they parse.

New field families/load-bearing roles require prospective controlled architecture change, evidence, impact analysis, second-XL review and hostile audit. Runtime tenant creation is prohibited.

---

# 13. Evidence, document and communication interaction

Source evidence, capture observation, normalized representation, evaluation adjustment, supplier-confirmed basis, issued artifact, external reference, annotation, correction/retraction and redacted/disposed state remain distinct.

Upload is untrusted capture, not accepted fact or satisfied prerequisite. Filename/hash/current URL is not business identity or authority. Issued member set is immutable.

Communication states remain prepared, issued, dispatch attempted, provider accepted, delivered/received, read/open, receipt acknowledgment, content response, domain effect and failed/partial/indeterminate.

External content is untrusted data and cannot supply system or agent instructions.

---

# 14. Load-bearing disclosure and historical reliance

Every load-bearing result carries `LoadBearingDisclosureBundle` and one surface placement:

- `INLINE_MANDATORY`;
- `ADJACENT_MANDATORY`;
- `EXPANDABLE_MANDATORY` with inline consequence;
- `DETAIL_AVAILABLE`;
- `PROHIBITED_ON_SURFACE`.

Inline/adjacent meaning includes as applicable:

- value-state label;
- subset/not-total or range meaning;
- blocked/limited/prohibited-use consequence;
- current-reliance block;
- material stale/mixed-time/indeterminate/non-comparable consequence;
- exact actual/status family;
- consequential target/member summary and represented principal;
- receipt disposition and non-meaning.

Tooltip, badge-only, color, hover, optional drill or secondary page cannot satisfy inline/adjacent disclosure.

`DisclosureParityManifest` proves compact/mobile/export/print/copy/chat retains required human and machine semantics. A surface unable to preserve meaning is prohibited.

Current live, as-of, issued, recalculated, restated/superseding and withdrawn remain distinct. New load-bearing use of an old report requires current `SubsequentRelianceAssessment`.

Restricted details never imply absent/zero; safe aggregation follows the P1.8 disclosure policy.

---

# 15. Errors, recovery, fallback and control queues

Errors distinguish input, authorization, DOA, evidence, stale version, source availability, pre-acceptance transport, duplicate/idempotency, partial batch, effect indeterminate, unsupported capability, import/file, untrusted content and localization/format failures.

Generic Retry is prohibited where effect may exist.

Recovery uses correction, re-preview, lookup, safe idempotent replay, resume, proven pre-acceptance retry, reconciliation, manual/buyer capture, structured fallback, block/support or owning-domain correction.

Offline/manual/file fallback preserves task/schema/version, source/channel/time, evidence, attribution, validation/proposal/command, idempotency and limitations.

Control observations preserve source predicate. Acknowledgment, assignment, snooze and accepted variance do not mean resolved, compliant or no-effect.

No generic GRC/case/ticket platform.

---

# 16. Accessibility, mobile, localization and RTL

V1 first-party web task, report and external-participation journeys target **WCAG 2.2 Level AA**.

Binding semantics include keyboard operation, programmatic name/role/state/value/relationships, meaningful focus/error association, accessible success/error/waiting/progress, review/correct/confirm or governed reversibility, responsive disclosure, exact dates/timezones/currency/units and Arabic/RTL structural direction with mixed-script safety.

Third-party channels, generated documents or structured files that cannot provide equivalent access require an explicit accessible first-party or assisted/manual fallback without changing authority/evidence meaning.

Each task declares:

- `FULL_MOBILE_TASK`;
- `SAFE_MOBILE_REVIEW_AND_ACTION`;
- `MOBILE_READ_DECLINE_HELP_ONLY`;
- `DESKTOP_REQUIRED_WITH_EXPLICIT_FALLBACK`.

Localized labels bind canonical keys and cannot collapse distinct outcomes. Translation is derived, not source evidence.

Exact testing/certification technology is deferred.

---

# 17. Conventional UI and future chat

All A0–A3 tasks, search, history, reports and recovery remain complete with chat/AI disabled.

Every chat-supported action has a conventional equivalent and uses the same OperationRegistry, registered field semantics, authority, preview, confirmation, continuation anchor, outcome and disclosure parity.

Session memory, inference and old reports are non-authoritative. Ambiguous references require exact resolution or abstention. No hidden agent-only writes.

P1.10 owns reasoning, confidence, evaluation and autonomy without changing this interaction authority.

---

# 18. A0–A3 floor

A first live tender can be completed through conventional/manual/file paths without named connector, persistent supplier account/network, chat, AI, warehouse or P07:

- authorized requirement/allocation/optional package;
- tender preparation and exact issue set;
- secure link/email/manual issue;
- valid supplier response/revision capture;
- source/normalized/evaluation/confirmed comparison layers;
- recommendation and approval;
- separate AwardDecision command;
- external handoff;
- reporting/history/control review;
- recovery from validation, stale, duplicate, partial or indeterminate outcomes.

---

# 19. Prohibitions and scope guard

No:

- hidden command;
- UI-owned status/truth;
- universal procurement case root;
- generic page/form/ontology builder;
- generic BPM/workflow designer;
- supplier network/marketplace;
- CDE/collaboration suite;
- GRC/case platform;
- BI/dashboard builder;
- AI subsystem;
- product/frontend code.

P07 remains the sole independent XL.

---

# 20. Accepted ADR basis

This frozen contract is the controlling semantic basis for:

- ADR-0016;
- ADR-0038;
- ADR-0039;
- ADR-0040;
- ADR-0041.

ADR-0017 remains P1.10-owned.

---

# 21. Closure

Internal hostile audit and remediation passed. Claude Round 2 returned PASS with no blockers. W-67–W-71 are closed.

P1.9 is PASS / CLOSED / FROZEN.
