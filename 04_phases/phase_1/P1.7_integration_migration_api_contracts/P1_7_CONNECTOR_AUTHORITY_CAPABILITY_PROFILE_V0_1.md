# P1.7 — Connector Authority & Capability Profile v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define the mandatory semantic profile for any email, ERP, accounting, CDE, bank, technical system, supplier portal, file exchange or other connector so connectivity never becomes business authority by accident.

This contract does not select a connector vendor, middleware, protocol or named external product.

---

# 2. Connector is an operational adapter

A Connector:

- authenticates to an external source/destination;
- reads/sends/observes/transforms/transports according to a profile;
- records operational state and evidence;
- invokes registered operations where permitted.

A Connector is never itself:

- tenant/legal/contracting authority;
- approver;
- supplier source principal merely because it transmitted content;
- P07 writer;
- accounting/tax source unless the configured external system is authoritative for that exact fact;
- evidence truth beyond its captured/validated observations;
- generic co-master.

---

# 3. ConnectorProfile

Every activated connector version binds:

- stable ConnectorProfileKey/version;
- connector/provider/product class;
- tenant scope;
- external account/realm/organization identity;
- authenticated technical principal/application;
- represented business organization/principal where applicable;
- allowed project/resource/ContractingAuthorityContext scope;
- granted OAuth/API/file/mailbox scopes;
- registered capabilities;
- fact/action-level authority mappings;
- external-ID/correlation mapping rules;
- source-version/reconstruction semantics;
- transformation/normalization rules;
- freshness/staleness/reconciliation policy;
- retry/subscription/resync behavior;
- materialization/evidence policy;
- degraded/manual fallback behavior;
- data-residency/sensitivity classification;
- effective period/cutover;
- certification/conformance result;
- revocation/offboarding behavior.

One technical connector may have different profiles per tenant/account/use case.

---

# 4. Capability verbs

A profile grants only explicit capability verbs per resource/fact/action.

Closed candidate verbs:

- `DISCOVER` — list/find external resources/changes;
- `READ_CURRENT` — retrieve current external representation;
- `READ_VERSION` — retrieve exact identified historical version;
- `OBSERVE_CHANGE` — receive/poll change signal;
- `CAPTURE_EVIDENCE` — create P1.6 source/capture evidence through bounded action;
- `PROPOSE_MAPPING` — create non-authoritative mapping/proposal;
- `INVOKE_QUERY` — call product query;
- `INVOKE_COMMAND` — request a named bounded product command;
- `ISSUE_SEND` — send exact PRODUCT_ISSUED/Transmittal artifact;
- `RECEIVE_CALLBACK` — receive external result/transport observation;
- `EXPORT` — send bounded product data/artifact outward;
- `IMPORT` — submit bounded inbound data for validation;
- `RECONCILE` — compare/retrieve for typed reconciliation;
- `ADMIN_CONNECTOR` — manage consent/subscription/profile only.

No generic READ_ALL/WRITE_ALL business meaning.

---

# 5. AuthorityMapping

For every load-bearing exchanged fact/event/field/action, bind:

1. semantic fact/action key;
2. authority mode: OWN / MIRROR / REFERENCE / OUT;
3. authoritative source/writer;
4. source/destination direction;
5. permitted capability verbs;
6. transformation authority;
7. source/effective/observed-time semantics;
8. freshness/staleness rule;
9. conflict classification/behavior;
10. correction/reconciliation path;
11. exact source/evidence/version anchor requirement;
12. materialization policy;
13. cutover/effective period;
14. failure/degraded/manual fallback;
15. allowed action under stale/unavailable source.

Entity-level blanket ownership cannot hide different fact authorities.

Example:

- external ERP owns `AP_POSTING_STATUS` and `PAYMENT_STATUS`;
- product P07 owns `CERTIFICATION_DECISION` and commercial effect;
- connector may REFERENCE/MIRROR ERP status but cannot update certificate to make reconciliation pass.

---

# 6. Transformation authority

Every transformation declares one:

- `TRANSPORT_ONLY` — no semantic transformation;
- `FORMAT_CANONICALIZATION` — encoding/format/time/field shape only, no business meaning change;
- `DETERMINISTIC_MAPPING` — versioned code/table maps external values to product representation;
- `PROPOSAL_MAPPING` — uncertain/AI/fuzzy mapping creates reviewable proposal;
- `DOMAIN_ACCEPTED_TRANSFORMATION` — owning-domain command accepts/transforms input into authoritative fact;
- `OUTBOUND_PRESENTATION` — product fact rendered for destination without transferring authority.

A connector cannot classify a fuzzy supplier/cost-code mapping as deterministic merely to avoid review.

---

# 7. External identity/reference mapping

## I01 — mapping identity

Preserve:

- tenant;
- external system/account/realm;
- external object/principal ID;
- external version/revision where material;
- product target identity;
- mapping type;
- confidence/status only for proposal mappings;
- source/evidence;
- effective period;
- creation/acceptance/correction history.

## I02 — no weak automatic merge

Name, email, VAT number, phone, document number, filename or semantic similarity alone cannot merge supplier/transaction/evidence identities where ambiguity exists.

## I03 — one-to-many/many-to-one

Mapping cardinality is explicit. A single external supplier may map to multiple tenant relationships; multiple legacy IDs may map to one product technical identity under governed evidence.

## I04 — mapping conflict

If one external ID maps to two active product targets in the same authority scope, enter conflict/quarantine; connector cannot choose latest/nearest silently.

---

# 8. Source version and evidence conformance

For load-bearing external evidence/reference, connector must prove P1.6 ReconstructionAnchorTest:

- exact historically addressable version;
- provider semantics that version is not current-content alias;
- source/object/context;
- SourceLocator;
- observation/freshness/conflict;
- retrieval/materialization path.

Connector certification records which resource/version endpoints genuinely pass.

A provider field named `revision` or `version` is not sufficient without semantic proof.

If resource fails:

- use permitted local immutable capture under policy;
- classify as ancillary/current-only;
- or block/quarantine load-bearing use.

---

# 9. Connector operational lifecycle

Closed states:

- `CONFIGURED_NOT_AUTHORIZED`;
- `AUTHORIZING`;
- `ACTIVE`;
- `ACTIVE_LIMITED`;
- `DEGRADED`;
- `REAUTHORIZATION_REQUIRED`;
- `RESYNC_REQUIRED`;
- `PAUSED`;
- `REVOKED`;
- `DISCONNECTED`;
- `RETIRED`.

State changes preserve history/effective time/reason.

Operational state cannot rewrite business facts previously captured/issued.

---

# 10. Degraded behavior

Every profile declares behavior for:

- authentication/token expiry;
- permission/scope revocation;
- subscription expiry/removal;
- missed notification/history gap;
- provider outage/rate limit;
- schema/version change;
- historical-version endpoint unavailable;
- write/send unavailable;
- partial API capability;
- external account disabled.

Allowed degraded actions may include:

- read cached historical product evidence;
- queue/retry outbound transport without regenerating issue;
- switch to manual/file capture/handoff;
- block freshness-dependent commands;
- allow product-owned deterministic operations that do not require external current fact;
- mark external facts stale/unavailable;
- initiate reauthorization/resync.

No connector outage automatically changes domain state.

---

# 11. Staleness/freshness

External fact representation preserves:

- source effective time;
- source recorded/version time;
- OS observed/fetched time;
- freshness/status;
- last successful sync/checkpoint;
- expected refresh/SLA if configured;
- stale threshold or explicit event-driven/no-threshold rule;
- unavailable/conflict state.

Commands requiring fresh external fact declare acceptable freshness/availability guard.

Middleware cannot refresh a stale fact by simply changing observed timestamp without retrieving/validating source.

---

# 12. Connector commands

A connector may invoke only named registered commands under its profile.

Every invocation carries:

- tenant/context;
- connector profile/version;
- technical principal;
- represented external principal/source;
- source evidence/version;
- logical command/idempotency identity;
- external correlation;
- current authority/grant;
- requested bounded action.

Connector authentication proves technical access, not automatic domain authority.

---

# 13. Outbound issue/send

For PRODUCT_ISSUED artifact/Transmittal:

- connector receives exact immutable artifact/version/member set;
- cannot regenerate/change attachment/body/recipient set except within frozen presentation envelope rules;
- each send/retry has TransportAttempt identity;
- provider message ID/callbacks remain communication observations;
- send API acceptance ≠ delivery/acknowledgment/domain effect;
- alternate connector/manual resend links same Transmittal where content unchanged;
- scope/revocation failure remains visible.

---

# 14. Inbound capture

Connector may create/call bounded capture operations for:

- MessageEnvelope/body/attachments;
- source principal/attribution evidence;
- external object/version/reference;
- capture occurrence;
- provider/subscription/correlation metadata;
- exact source timestamps/observed time;
- materialization/integrity evidence.

It cannot:

- convert email “approved” directly into ApprovalOutcome;
- treat invoice as AP/certified truth;
- treat CDE current pointer as historical version;
- merge duplicate business evidence by hash alone;
- infer supplier authority from mailbox ownership alone.

---

# 15. Connector certification/conformance

Before a connector profile can support a load-bearing capability, conformance evidence tests:

1. authentication/scopes/tenant isolation;
2. resource/account/project boundary;
3. source principal/represented identity;
4. exact version/revision semantics;
5. callback authenticity/correlation;
6. duplicate/retry behavior;
7. missed-notification/resync recovery;
8. pagination/rate/partial handling;
9. schema/version change behavior;
10. authority mapping;
11. transformation/mapping behavior;
12. evidence/materialization/integrity;
13. send/delivery/ack separation;
14. degradation/manual fallback;
15. revocation/offboarding/data disposition;
16. no direct business-truth write.

Result may be:

- `CERTIFIED_FULL_PROFILE`;
- `CERTIFIED_LIMITED_PROFILE`;
- `NON_LOAD_BEARING_ONLY`;
- `FAILED_CONFORMANCE`;
- `EXPIRED_REVALIDATION_REQUIRED`.

Certification is product/deployment conformance, not legal certification.

---

# 16. Connector replacement

Replacing connector/provider:

- creates new profile/version/effective period;
- preserves old external IDs/evidence/callback history;
- maps in-flight operations explicitly;
- prevents dual outbound/inbound writers during cutover;
- does not reissue historical artifacts;
- does not relabel old provider observations as new provider evidence;
- keeps manual fallback.

---

# 17. Agent/chat relation

A chat/agent is not automatically a connector.

If it calls external systems, each external tool path uses an authorized ConnectorProfile and registered capability.

An agent cannot bypass connector scopes, conformance, freshness or authority by using natural language/browser automation.

P1.10 owns reasoning/tool selection policy.

---

# 18. A0–A3 minimum

A0–A3 requires zero named connector.

Minimal profile supports:

- manual/config entry;
- structured file import/export;
- buyer-on-behalf evidence capture;
- product-issued artifact download/manual send or optional generic email connector;
- manual external handoff evidence.

Named connectors are activation options, not architecture prerequisites.

---

# 19. One-XL guard

This contract does not create:

- iPaaS/ESB;
- universal connector marketplace;
- MDM platform;
- generic ETL mapping designer;
- email/CDE/ERP clone;
- supplier network.

It freezes bounded connector semantics around existing domains.

**P07 sole XL: preserved.**

---

# 20. Hostile tests

1. ERP connector has write scope but product owns certificate — cannot overwrite certificate? REQUIRED.
2. CDE `revision` aliases current — connector cannot certify historical anchor? REQUIRED.
3. Same external supplier ID maps to two tenant suppliers — conflict/quarantine? REQUIRED.
4. Mail permission revoked — historical messages/evidence remain; connector degrades? REQUIRED.
5. Webhook missed — resync required, no “no changes” inference? REQUIRED.
6. Connector sends issued RFQ then retries — exact same artifact/Transmittal, no duplicate issue? REQUIRED.
7. AI fuzzy cost-code mapping — proposal, not deterministic mapping? REQUIRED.
8. Provider replaced during in-flight send — no dual writer/duplicate issue? REQUIRED.
9. Connector receives invoice — cannot mark certified/paid? REQUIRED.
10. No connector installed — first tender still works? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
