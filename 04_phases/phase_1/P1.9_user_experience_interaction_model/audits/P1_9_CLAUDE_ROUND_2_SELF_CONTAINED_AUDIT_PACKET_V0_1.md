# Construction Procurement OS — P1.9 Claude Round 2 Self-Contained Audit Packet v0.1

**Date:** 2026-08-01  
**Stage:** P1.9 — User Experience & Interaction Model  
**Status:** INTERNAL POST-ROUND-1 RECHECK PASS / P1.9 ACTIVE / P1.10+ LOCKED / PRODUCT CODE LOCKED  
**Repository access:** NOT REQUIRED

---

# 1. Round-2 mission

Audit this packet only.

Claude Round 1 returned:

`FAIL — P1.9 remains open; blockers below must be remediated.`

One blocker:

> **BL-P19-05 — submission/response schema authorship was unbounded. Nothing stated who defined fields, from what vocabulary, or whether tenant-authored fields could carry load-bearing meaning.**

Round 1 otherwise accepted:

- continuation anchor;
- typed outcome envelope;
- bulk policy set;
- work-context/no-second-root model;
- approval/DOA separation;
- evidence/communication layers;
- load-bearing disclosure placement/parity;
- historical reliance interaction;
- external submission disposition and assurance;
- control-queue boundary;
- conventional A0–A3 floor.

Round 1 also raised W-62–W-66 and an accessibility-target watch.

This packet contains the remediation and enough unchanged context to assess P1.9 closure without repository access.

Treat the remediation and internal PASS as claims to attack.

Do not fail for frontend framework, component library, exact database/cache/search/schema, renderer, pixels/branding, exact testing tool, AI model/orchestration or product code intentionally deferred.

Fail if later frontend implementation or P1.10 must still choose:

- who may author field meaning;
- whether tenant fields can become normalized/comparison truth;
- schema-version comparability;
- persistent-workspace tenancy;
- receipt meaning;
- confirmation principal/materiality behavior;
- whether the continuation identity is actually available before a lost result;
- accessibility conformance target;
- any already-audited interaction-authority meaning.

---

# 2. Frozen upstream state

- P1.0 CLOSED
- P1.1 PASS / FROZEN
- P1.2 PASS / CLOSED
- P1.3 PASS / CLOSED
- P1.4 PASS / CLOSED / FROZEN
- P1.5 PASS / CLOSED / FROZEN
- P1.6 PASS / CLOSED / FROZEN
- P1.7 PASS / CLOSED / FROZEN
- P1.8 PASS / CLOSED / FROZEN
- P1.9 ACTIVE
- P1.10+ LOCKED
- Product/frontend/AI implementation LOCKED

P07 remains the sole independent XL.

A0–A3 must work without:

- P07;
- named connector;
- persistent supplier account/network;
- chat/AI;
- warehouse/BI platform.

Frozen semantics include:

- tenant/project/ContractingAuthorityContext;
- internal authority ≠ external grant;
- one authoritative source/writer and OWN/MIRROR/REFERENCE/OUT;
- AwardDecision ≠ Commitment;
- source submission ≠ normalized representation ≠ buyer adjustment ≠ confirmed basis;
- workflow approval ≠ domain effect;
- immutable evidence/version/reliance/issued artifact;
- issue ≠ provider acceptance ≠ delivery ≠ read ≠ acknowledgment ≠ domain effect;
- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- idempotency, effect stages and EFFECT_INDETERMINATE;
- metric/report population, subset/range, quality/use, restatement and reliance;
- tenant-private supplier relationship and cross-tenant business influence OUT by default.

---

# 3. Governing P1.9 thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use, correction or field meaning.**

No interface, task, form, queue, portal, document view, spreadsheet, export, chat surface or persistent workspace is a business-truth writer.

---

# 4. BL-P19-05 remediation — product-owned field grammar

## 4.1 Controlling rule

> **A response or comparison field may carry load-bearing meaning only when it binds a product-defined semantic field key from a versioned typed field-family registry. Tenant configuration may select and constrain registered meaning; it may not author new meaning.**

All internal intake, external response, structured-file, normalization and comparison schemas are composed only from this registry.

Every load-bearing field binds:

- `RegisteredSemanticFieldKey`;
- `FieldFamilyKey` and version;
- source or normalized layer;
- exact business definition and explicit non-meaning;
- value type and unit/currency/date/time semantics;
- grain/cardinality;
- allowed source channels;
- product-defined validation family;
- normalization/comparison eligibility;
- evidence/provenance;
- access/sensitivity/disclosure;
- lifecycle/effective period and successor relation.

The registry is semantic architecture, not a component library or physical database schema.

## 4.2 Closed top-level field families

V1 load-bearing fields must be registered members of:

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
13. `REGISTERED_LINE_OR_TABLE_GROUP`, composed only from registered child fields.

A family alone is insufficient. A load-bearing value requires an exact semantic field key.

A decimal labelled `Rate` is not a unit rate unless it binds a registered unit-rate role with exact monetary/currency/basis semantics.

## 4.3 Tenant configuration boundary

Tenant/event configuration may only:

- select registered fields supported by an activated capability;
- apply non-conflicting labels/help/localization;
- order/group fields;
- mark required/optional where the registered policy permits;
- select an allowed subset of product-defined enum values;
- activate product-defined applicability/visibility/validation policy members;
- apply tighter bounds from a permitted constraint set;
- choose supported attachment or line schemas.

Tenant configuration may not:

- author new semantic field keys/families;
- change meaning, grain, unit, currency role, denominator or actual/status family;
- create arbitrary conditional logic or branching;
- create formulas, computed fields or scripts;
- create arbitrary regex/cross-field/executable validation;
- create runtime joins or source lookups;
- turn free text into a load-bearing normalized value;
- create custom state, commands, effects or metric populations;
- use labels to override canonical meaning.

A conflicting tenant label is invalid. Canonical meaning remains inspectable at task and comparison surfaces.

Product-defined conditions/validators are registered versioned policy members, not tenant-authored expressions.

## 4.4 Evidence-only content and bounded normalization

Free text, unregistered columns, arbitrary email text and unsupported file content remain:

- attributable/versioned source evidence;
- visible to authorized reviewers;
- ineligible by themselves as normalized/comparison values.

They may become a registered normalized value only through a bounded proposal and explicit review/accept command that:

- cites exact source evidence/version/location;
- selects a registered semantic field key;
- records transformation, unit/currency/basis and limitation;
- preserves the source value unchanged;
- exposes differences;
- blocks ambiguous/unsupported mapping.

Future AI may propose the mapping, but cannot accept it or invent field meaning.

## 4.5 Schema versioning and comparability

Every event, task, form, structured template, response and comparison binds an exact `ResponseSchemaVersion` composed from registered fields.

A change to field key/family/version, grain/cardinality, unit/currency role, validity-changing requiredness, enum meaning/options, applicability/validation, row structure, acknowledgment relation or normalization/comparison eligibility creates a new semantic schema version and impact assessment.

Label/help/layout changes may remain presentation revisions only when canonical meaning and participation validity remain unchanged.

Responses across schema versions are directly comparable only when registered semantic keys and relevant versions/policies are compatible. Otherwise they are segmented, mapped under an explicit registered proposal/command or blocked.

A stale response/template cannot be current merely because it parses.

## 4.6 Internal surfaces and registry extension

Internal forms, buyer-on-behalf capture, imports, correction screens and future chat tools use the same registry.

No internal custom field or spreadsheet column can become a load-bearing source, comparison axis, metric denominator or command input without registered meaning.

A new field family or load-bearing semantic role requires prospective controlled architecture change with evidence, authority/layer, grain/value/validation, normalization/comparison/metric impact, access/evidence/migration/correction behavior, second-XL review and hostile testing.

Runtime tenant creation is prohibited.

No generic page/form builder.

---

# 5. W-62 — persistent workspace scope

For V1:

- optional persistent workspace is tenant/buyer-relationship scoped;
- reusable technical authentication may authenticate a person, but enters separately authorized tenant-private workspaces;
- tasks, drafts, history, contacts, grants, documents, messages, relationship data and performance are isolated per tenant/buyer relationship;
- no cross-tenant supplier business profile, directory, task history, relationship history, reputation, benchmark, recommendation or imported grant is permitted;
- no supplier marketplace/network mode is permitted;
- first participation cannot require account enrollment.

This preserves P1.4/ADR-0012’s optional reusable technical identity without creating cross-tenant business scope.

---

# 6. W-63 — receipt meaning

Every submission receipt displays inline or directly adjacent:

- submission/revision identity;
- task/event/schema/member version;
- current submission disposition;
- whether it entered the governed response population;
- outstanding identity, terms, addendum, field or attachment conditions;
- what the receipt establishes;
- what it does not establish.

Unless separately true, the receipt cannot imply:

- compliant;
- technically/commercially accepted;
- complete;
- shortlisted;
- awarded;
- contractable;
- Commitment established.

Receipt meaning is preserved through portal, email, PDF, spreadsheet and status lookup by `DisclosureParityManifest`.

---

# 7. W-64 — confirmation principal binding

Every confirmation binds exact:

- acting principal;
- represented principal;
- authentication/assurance class;
- tenant/project/ContractingAuthorityContext;
- preview and target/member/schema versions;
- confirmation time/expiry;
- `ConfirmationInvalidationPolicyVersion`.

At submission:

- same acting/represented-principal binding must be current;
- authority, delegation, DOA and access are rechecked;
- same principal may continue after reauthentication only when assurance is restored and no invalidating change occurred;
- different principal/represented principal invalidates confirmation and requires new preview/confirmation;
- confirmation is not transferable through session sharing, forwarding or delegated UI state.

---

# 8. W-65 — continuation-anchor availability proof

Before any effect-bearing transmission, `AnchorAvailabilityProof` must establish that the initiating user/channel can retrieve the continuation identity and conventional recovery route.

Permitted proof modes:

- `CLIENT_GENERATED_AND_DURABLY_PERSISTED`;
- `SERVER_RESERVED_AND_ACKNOWLEDGED` through a separate preflight/reservation round trip;
- `CHANNEL_EMBEDDED_AND_RETRIEVABLE` through an independently accessible task/submission record.

Creating the anchor only inside the same effect-bearing request does not qualify.

The action is blocked if availability proof does not exist.

The user/channel can retrieve:

- anchor/recovery reference;
- operation/target summary;
- result lookup route;
- support/manual correlation route where applicable.

Recovery remains:

- proven not accepted → safe resume/retry under same anchor;
- possible acceptance/effect → lookup/reconciliation only;
- changed command context → new preview/logical command;
- missing/lost anchor is never proof of no effect.

---

# 9. W-66 — confirmation invalidation policy

Every consequential operation version binds one `ConfirmationInvalidationPolicyVersion` stating:

- always-invalidating changes;
- product-defined bounded non-material classes;
- quantitative thresholds where legitimate;
- qualitative triggers;
- recipient/publication changes;
- authority/delegation/DOA/access changes;
- evidence/freshness/configuration/version changes;
- population/member-set changes;
- time/expiry;
- required disclosure and re-preview.

Default:

> any change to a load-bearing target, member set, principal, represented principal, authority, recipient, value basis, field/schema meaning, evidence version, configuration/policy or effect consequence invalidates confirmation unless a registered policy proves a bounded non-material class.

No tenant-authored materiality formula, script or conditional expression.

---

# 10. Accessibility target

For V1 first-party web task, report and external-participation surfaces, supported journeys target:

`WCAG 2.2 Level AA`

Binding semantics include keyboard operation, programmatic name/role/state/value, focus/error association, accessible status/progress, review/correct/confirm or governed reversibility for consequential submissions, responsive disclosure, exact date/timezone/currency/unit, Arabic/RTL structural behavior and mixed-script safety.

Where a third-party channel, generated document or structured-file path cannot provide equivalent access, an explicit accessible first-party or assisted/manual fallback is required without changing authority/evidence meaning.

Exact testing/certification technology remains later NFR/implementation work.

---

# 11. Unchanged interaction model that survived Round 1

## 11.1 Interaction classes

Every affordance is exactly QUERY, PROPOSAL, COMMAND, ASYNC_OPERATION, NAVIGATION or LOCAL_PRESENTATION.

Navigation, filter, selection, drag/drop, annotation, auto-save, upload, import and chat wording cannot silently execute commands.

Every state-changing affordance binds exact operation, principal/represented principal, context, target/member versions, authority, evidence, guards, consequences, idempotency and recovery.

## 11.2 Preview and typed outcome

Consequential action follows:

`draft → validation → preview → confirmation → submit → acceptance → effect status → recovery/correction`

`InteractionOutcomeEnvelope` preserves invocation/logical/async identities, acceptance, effect stage, per-item result, authoritative/publication identities and safe next action.

Accepted ≠ effect established. Provider accepted ≠ delivered/acknowledged/domain effect. Approval ≠ AwardDecision ≠ Commitment.

## 11.3 Bulk modes

Exactly:

- ATOMIC_DOMAIN_SET;
- INDEPENDENT_ITEMS_CONTINUE;
- INDEPENDENT_ITEMS_STOP_ON_BLOCKING;
- ORDERED_DEPENDENT.

Frozen member set, dependency graph, per-item identities, stop/continue, indeterminate behavior and item recovery are mandatory. False external atomicity and whole-batch resend after unknown item are prohibited.

## 11.4 Navigation/no second root

Views bind tenant/project/authority context, principal, canonical subject/version/as-of and access.

Polycentric navigation links requirement, allocation, optional package, tender, response, normalization, recommendation, approval, AwardDecision, optional Commitment, evidence, control, report and operation result.

Tasks/queues/history are derived and cannot write domain state. No universal procurement case root.

## 11.5 Approval

Approval binds exact proposal/version, evidence/limitations, current reviewer authority/DOA/delegation and typed outcome. Revised proposal does not inherit approval. Approval remains distinct from downstream command/effect.

## 11.6 External participation and validity

Modes:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round trip;
- manual/offline fallback.

`ExternalTaskGrant` is tenant-private/task-version scoped. Forwarding does not transfer authority.

Every event binds `ExternalSubmissionAcceptancePolicy` and every response has one:

- CAPTURED_EVIDENCE_ONLY;
- PROVISIONAL_PENDING_CONFIRMATION;
- VALID_SOURCE_SUBMISSION;
- REJECTED_INVALID;
- WITHDRAWN;
- SUPERSEDED_BY_REVISION;
- LATE_ACCEPTED_WITH_LIMITATION;
- QUARANTINED_UNCORRELATED_OR_UNTRUSTED.

Only valid/explicit late-accepted submissions enter the response population.

A valid source submission may contain evidence-only content that is not a normalized load-bearing value.

## 11.7 Evidence and communication

Source, capture, normalized, evaluation, supplier-confirmed, issued, external reference, annotation, correction/retraction and redacted/disposed layers remain distinct.

Upload is not accepted fact. Issued member set is immutable. Communication states and domain effect remain distinct. External content is untrusted data.

## 11.8 Load-bearing disclosure

Every result binds `LoadBearingDisclosureBundle` and one surface profile:

- INLINE_MANDATORY;
- ADJACENT_MANDATORY;
- EXPANDABLE_MANDATORY with inline consequence;
- DETAIL_AVAILABLE;
- PROHIBITED_ON_SURFACE.

Tooltip, badge, color, hover, optional drill or secondary page cannot satisfy required disclosure.

`DisclosureParityManifest` preserves semantics across compact/mobile/export/copy/chat. A surface unable to preserve meaning is prohibited.

## 11.9 Reporting/reliance

Subset ≠ total; range ≠ midpoint; missing/restricted ≠ zero.

Current, as-of, issued, recalculated, restated/superseded and withdrawn remain distinct.

New load-bearing reuse requires current `SubsequentRelianceAssessment`.

## 11.10 Error/recovery/control

Control acknowledgment does not resolve source predicate. Accepted variance does not mean resolved/compliant/no-effect.

Errors and recovery are typed. Generic Retry is prohibited when effect may exist.

Offline/manual/file fallback preserves task/schema/version, evidence, attribution, validation, operation identity and limitation.

## 11.11 Conventional UI/chat

All A0–A3 tasks, search, history, reports and recovery work with chat disabled.

Chat uses the same operation, confirmation, continuation, field registry, outcome and disclosure. No hidden agent write. P1.10 owns reasoning/autonomy.

---

# 12. A0–A3 activation proof

The conventional thread remains:

1. capture authorized requirement/source using registered fields/evidence;
2. establish allocation/optional package;
3. prepare tender and exact issue/response schema;
4. issue manually or through activated channel;
5. invite without account requirement;
6. receive structured/email/file/buyer-captured response;
7. determine submission disposition and field/evidence eligibility;
8. preserve revision/addendum/schema history;
9. normalize/compare registered meanings while preserving source/evaluation;
10. recommend;
11. record approval outcome;
12. establish AwardDecision through separate command;
13. perform external handoff;
14. recover from stale/duplicate/partial/indeterminate outcomes;
15. inspect reports/history/disclosures/reliance.

No named connector, persistent supplier account/network, chat, AI, warehouse or P07 is required.

---

# 13. Internal recheck result

Internal post-remediation hostile recheck attacked 146 scenarios and returned:

`PASS — BL-P19-05 and W-62–W-66 are closed; P1.9 is ready for Claude hostile audit Round 2.`

Claimed results:

- all G1–G16 PASS;
- P1.1–P1.8 reopen = NO;
- second XL = CLEAN;
- A0–A3 = CLEAN;
- product/frontend code = LOCKED;
- P1.10 = LOCKED.

The recheck specifically attacked:

- semantic smuggling through labels, generic numeric fields, requiredness, enums, conditions, formulas, validation, row groups, spreadsheets and internal forms;
- compatibility across response schema versions;
- evidence-only narrative/attachments and explicit normalization;
- cross-tenant workspace/profile leakage;
- misleading receipts;
- reauthentication by a different principal;
- anchor creation in the same failed round trip;
- tenant-authored materiality;
- Arabic/RTL/localization and accessible fallback;
- page/form/ontology second-XL growth.

---

# 14. Candidate ADR posture

No status has changed.

- ADR-0016 — candidate ACCEPT: bounded hybrid external participation, product-owned field/schema registry and V1 tenant-private workspace boundary.
- ADR-0038 — candidate ACCEPT: operation interaction, principal-bound confirmation, continuation availability, bulk and typed outcome.
- ADR-0039 — candidate ACCEPT: work context/navigation/no second root.
- ADR-0040 — candidate ACCEPT: load-bearing disclosure/history/reliance/receipt parity.
- ADR-0041 — candidate ACCEPT: safe recovery, WCAG 2.2 AA target, mobile/localization/RTL and conventional-chat coexistence.

ADR-0017 remains P1.10-owned.

No accepted upstream ADR is claimed to require reopening.

---

# 15. Primary validation debt

Primary UAE supplier-side validation remains incomplete.

P1.10/final Phase 1 checkpoint must preserve an explicit falsification/build-validation plan covering:

- secure-link/account tolerance;
- email/file/buyer-on-behalf behavior;
- field burden and terminology;
- mobile/Arabic/RTL;
- revisions/addenda;
- receipt interpretation;
- support/fallback.

This debt does not authorize weaker semantics or a supplier portal/network. It must not disappear from build gates.

---

# 16. Required hostile scenarios

Attack at minimum:

1. tenant creates `Rate incl. attendance` as free text and `Rate` as decimal;
2. tenant label conflicts with registered semantic key;
3. same numeric family, different monetary role;
4. quantity without UOM;
5. rate without denominator/basis;
6. arbitrary enum/compliance option;
7. arbitrary condition/branch;
8. computed field/formula;
9. custom regex/cross-field validation;
10. runtime lookup/join;
11. spreadsheet adds unregistered column;
12. buyer internal custom field;
13. free-text qualification omitted from review;
14. free text mapped to money without command;
15. AI maps field without human acceptance;
16. attachment price treated as normalized automatically;
17. requiredness changes after invitation;
18. enum meaning changes after responses;
19. label-only revision;
20. stale template parses successfully;
21. two schema versions with same label/different key;
22. explicit registered mapping across schema versions;
23. valid submission containing evidence-only fields;
24. new field family added by tenant;
25. registry expands into ontology/form-builder product;
26. one technical login opens two buyer workspaces;
27. cross-buyer tasks/history/profile/reputation;
28. first participation forced to create account;
29. receipt says `submitted successfully` while provisional;
30. receipt implies compliance/award;
31. email/PDF receipt loses disposition;
32. different principal completes confirmation after reauthentication;
33. same principal reauthenticates after evidence changes;
34. tenant defines materiality threshold;
35. anchor created server-side only inside effect-bearing call;
36. client-generated anchor not durably persisted;
37. channel-embedded anchor cannot be retrieved;
38. connection dies after effect-bearing call;
39. bulk one item indeterminate;
40. ordered-dependent item executes early;
41. subset/range/limitation laundering;
42. CSV/mobile/chat parity loss;
43. old report reused after restatement;
44. Arabic label translation conflicts with canonical key;
45. locale changes decimal/currency/date;
46. inaccessible structured-file path with no fallback;
47. no connector/account/chat/AI/P07;
48. page/form/BPM/CDE/GRC/BI/supplier-network/AI second XL.

Add your own.

---

# 17. Required response format

## VERDICT

Choose exactly:

`PASS — P1.9 User Experience & Interaction Model can close; proceed to final ADR reconciliation/checkpoint and unlock P1.10.`

or

`FAIL — P1.9 remains open; blockers below must be remediated.`

## BLOCKERS

For each blocker:

- blocker ID;
- section/clause;
- concrete failure path;
- why later frontend/physical/P1.10 work must choose semantic meaning;
- narrowest remediation.

Do not count framework, pixels, exact schemas, testing tools or AI model choices as blockers.

## WATCHES / NON-BLOCKING DEBT

Separate:

- semantic detail;
- contractor/supplier/legal evidence;
- later physical implementation;
- P1.10-owned.

## GATE CHECK

PASS/FAIL:

- G1 operation/authority/evidence/consequence/result
- G2 query/proposal/command/acceptance/effect
- G3 navigation/tasks/queues no second root
- G4 approval/DOA/delegation
- G5 field/schema authorship and comparison determinism
- G6 evidence/communication layers
- G7 limitation/receipt placement and parity
- G8 report history/current reliance
- G9 external low-friction/no network/cross-tenant workspace
- G10 grant/actor/submission validity
- G11 control queues no GRC truth
- G12 continuation/bulk/error/unknown recovery
- G13 accessibility/mobile/localization/RTL
- G14 conventional A0–A3 no connector/account/chat/AI/P07
- G15 regression/one XL/product-code lock
- G16 audit readiness

## REGRESSION CHECK

- P1.1 REOPEN
- P1.2 REGRESSION
- P1.3 REOPEN
- P1.4 REOPEN
- P1.5 REOPEN
- P1.6 REOPEN
- P1.7 REOPEN
- P1.8 REOPEN
- SECOND XL
- A0–A3 ACTIVATION

## ADR IMPACT

For ADR-0016 and ADR-0038–ADR-0041 choose:

- ACCEPT SEMANTIC DECISION
- KEEP PROPOSED — BLOCKING
- KEEP PROPOSED — LATER PHYSICAL/NON-BLOCKING

Confirm ADR-0017 remains P1.10-owned and state whether any upstream accepted ADR must reopen.

## P1.10 READINESS

Choose:

`READY AFTER P1.9 FINAL CHECKPOINT`

or

`NOT READY`

---

# 18. Final question

Is any load-bearing P1.9 decision still ambiguous enough that frontend implementation or P1.10 must choose field/schema authorship, source-to-normalized meaning, schema comparability, workspace tenancy, receipt eligibility meaning, principal-bound confirmation, pre-effect anchor availability, accessibility target or any already-accepted interaction-authority behavior?

A clean PASS is appropriate only if the answer is NO.