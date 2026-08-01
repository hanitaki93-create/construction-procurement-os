# P1.7 — Competitor & Integration Foundation Evidence v0.1

**Date:** 2026-08-01  
**Status:** CURRENT OFFICIAL-DOCUMENTATION EVIDENCE / NOT ARCHITECTURE FREEZE  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Extract current, repeatable interface/integration/AI-readiness practices from official product and developer documentation without converting competitor marketing claims into product commitments.

Observations are classified as:

- `FOUNDATION_PRACTICE`;
- `INTERACTION_PATTERN`;
- `CAPABILITY_HYPOTHESIS`;
- `MARKETING_OR_PREVIEW`;
- `OUT_OF_SCOPE_ENTERPRISE_GRAVITY`;
- `IMPLEMENTATION_DETAIL`.

---

# 2. Sources reviewed

## SAP Ariba

- SAP Ariba APIs index  
  https://help.sap.com/docs/ARIBA_APIS
- Event Management API  
  https://help.sap.com/docs/ARIBA_APIS/0414af6b17164879920cf26608ae643d/event-management-api
- Event Management API v2 endpoints  
  https://help.sap.com/docs/ariba-apis/event-management-api/event-management-api-v2-endpoints
- Supplier bid retrieval  
  https://help.sap.com/docs/ariba-apis/event-management-api/retrieving-supplier-bids-for-event-with-event-management-api
- Integration monitoring APIs  
  https://help.sap.com/docs/ariba-apis/integration-monitoring-api-for-procurement/message-format-for-requests-and-responses

## Coupa

- Sourcing API  
  https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/the-coupa-core-api/resources/transactional-resources/sourcing-api-%28quote_requests%29
- Quote Responses API  
  https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/the-coupa-core-api/resources/transactional-resources/sourcing-api-%28quote_requests%29/quote-responses-api
- Core API getting started  
  https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/the-coupa-core-api/get-started-with-the-api
- Supplier API  
  https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/the-coupa-core-api/resources/reference-data-resources/suppliers-api-%28suppliers%29-da-5797-da-5797
- Purchase Orders API  
  https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/the-coupa-core-api/resources/transactional-resources/purchase-orders-api-%28purchase_orders%29
- Coupa Navi/Agent Studio glossary  
  https://docs.coupa.com/en/coupa-glossary/overview/c
- CSP Supplier Assistance Agent  
  https://docs.coupa.com/en/supplier-documentation/coupa-for-suppliers/the-coupa-supplier-portal-or-csp/answer-csp-related-questions-with-csp-supplier-assistance-agent

## Procore

- Procore Developer Platform  
  https://developers.procore.com/
- Webhooks v2  
  https://developers.procore.com/reference/rest/hooks
- Bid Packages API  
  https://developers.procore.com/reference/rest/project-bid-packages?version=1.0
- Bids APIs  
  https://developers.procore.com/reference/rest/bids?version=2.0
- Bid Package Documents  
  https://developers.procore.com/reference/rest/bid-package-documents?version=latest

## Autodesk / BuildingConnected

- Autodesk Platform Services documentation  
  https://aps.autodesk.com/developer/documentation/
- Data Management API  
  https://aps.autodesk.com/data-management-api
- BuildingConnected Webhooks API  
  https://aps.autodesk.com/blog/buildingconnected-webhooks-api
- Autodesk Construction Cloud overview  
  https://help.autodesk.com/cloudhelp/ENU/Docs-About-ACC/files/About_Autodesk_Construction_Cloud.html
- Autodesk Assistant in construction products  
  https://help.autodesk.com/view/BUILD/ENU/?guid=Access_Assistant&p=DOCS

## Email providers

- Microsoft Graph webhook delivery  
  https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks
- Microsoft Graph lifecycle/missed notification recovery  
  https://learn.microsoft.com/en-us/graph/change-notifications-lifecycle-events
- Microsoft Graph send message  
  https://learn.microsoft.com/en-us/graph/api/message-send?view=graph-rest-1.0
- Gmail push notifications  
  https://developers.google.com/workspace/gmail/api/guides/push
- Gmail message send  
  https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send

---

# 3. Foundation findings

## F01 — mature suites expose business-oriented APIs, not only files

SAP Ariba exposes event, item, participant, bid, award, approval, project-document and monitoring APIs.

Coupa exposes sourcing events, supplier responses, line/lot award, suppliers, requisitions and purchase-order/change resources.

Procore exposes bid packages, bids, documents and scoped project/company APIs.

Autodesk exposes project/document item/version APIs and BuildingConnected opportunity/bid events.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** expose bounded domain operations and meaningful resource/event identities rather than generic file upload plus CRUD.

## F02 — action/job endpoints are distinct from resource editing

SAP Ariba v2 uses explicit asynchronous jobs for actions such as publish, edit, timing changes and invitation operations, while resource endpoints handle event/item data.

Some API actions return or require separate job/status retrieval.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** separate resource/proposal state from bounded action invocation and asynchronous operation status. Queue/job acceptance is not business completion.

## F03 — API surfaces intentionally restrict some writes

SAP Ariba documents objects that can be read but not modified through its event API and notes that access control around open APIs must be governed.

Coupa documents resources/fields that cannot be created or updated directly even when readable.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** do not seek universal API parity with database fields or UI. Capability registration must state allowed queries/actions and preserve domain guards.

## F04 — source-system correlation IDs are common but not authority

SAP Ariba supports external-system correlation IDs to locate externally sourced events.

Procore/Autodesk/Coupa use stable product/project/resource IDs in scoped APIs.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** external IDs and correlation IDs are mappings/correlation, not business identity authority. Preserve source system, scope and mapping history; do not merge solely by identifier similarity.

## F05 — pagination and partial retrieval are first-class

SAP Ariba recommends paginated item retrieval for large sourcing events. Procore APIs expose page/per-page controls. Coupa APIs query resources rather than assuming full-estate transfer.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** bulk/query contracts need cursor/page semantics, bounded result sets and explicit partial/batch outcomes; a chat/agent query cannot silently load every tenant record.

## F06 — webhooks/change notifications are signals, not complete truth

Procore supports project/company scoped webhooks with payload versions.

BuildingConnected exposes events including new bid revision and opportunity status/comment changes.

Microsoft Graph and Gmail push systems notify of change but require follow-up retrieval/synchronization; Microsoft explicitly documents missed notifications, removed subscriptions and resynchronization.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** webhook/push receipt is an integration observation. Consumers retrieve/validate authoritative source state, dedupe, recover missed changes and never treat callback delivery as domain authority.

## F07 — subscription/permission lifecycle failure is normal

Microsoft Graph documents subscription expiration, reauthorization, removed subscriptions, missed notifications and delta/full resync recovery.

Gmail watch returns a current history ID and expiration; clients must continue synchronization from provider history state.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** connector state must expose active/degraded/reauthorization-required/expired/removed/resync-required conditions. Historical evidence survives connector revocation. Manual fallback remains available.

## F08 — asynchronous send acknowledgment is not delivery

Microsoft Graph send returns HTTP 202 Accepted. Provider notification delivery APIs have their own retry and acknowledgment semantics.

Gmail send returns a message resource, while subsequent transport/delivery remains separate.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** API acceptance/provider message ID/dispatch/delivery/read/acknowledgment remain distinct under frozen P1.6 semantics.

## F09 — least-privilege/scoped access is provider reality

Microsoft and Gmail send/read/watch operations use explicit OAuth permission scopes. Procore scopes APIs by company/project. SAP Ariba uses applications/API access and OAuth for documented APIs.

**Classification:** FOUNDATION_PRACTICE.

**P1.7 implication:** connector profiles declare scopes, tenant/resource boundaries and read/write/observe/send capabilities. Overbroad full-mailbox or full-platform access is not a default requirement.

## F10 — platform ecosystems support both apps and agents through common APIs

Procore currently presents its developer platform as supporting integrations, apps and agents through the same platform APIs.

Coupa exposes API resources and separately advertises Navi and Agent Studio for specialized conversational agents.

**Classification:** FOUNDATION_PRACTICE for common API substrate; CAPABILITY_HYPOTHESIS for specific agent outcomes.

**P1.7 implication:** future agents should consume the same bounded capability registry as UI/services/connectors. Do not create agent-only privileged mutations.

---

# 4. Interaction/AI findings

## A01 — conversational access to project/procurement information is becoming standard

Autodesk Assistant in Forma supports questions across project documents and records and provides prompt libraries/chat history.

Coupa Navi is described as conversational support for procurement questions/workflows, and the supplier assistance agent answers from Coupa documentation.

**Classification:** INTERACTION_PATTERN.

**P1.7 implication:** query/tool contracts should be citation/evidence capable and inspectable. P1.9 should support chat history/prompt entry and navigation to source records. P1.10 decides reasoning quality and reliability.

## A02 — official products explicitly warn that preview AI may be inaccurate

Autodesk documents prompt-driven AI enhancements as Tech Preview and states results may not be accurate.

**Classification:** MARKETING_OR_PREVIEW + CAPABILITY_HYPOTHESIS.

**P1.7 implication:** architecture must never equate availability with reliability. AI capability activation needs later evaluation, confidence/abstention/human-review rules and manual fallback.

## A03 — question answering is clearer than autonomous commercial action

Current official assistant examples emphasize answering questions, guiding users, querying project information, prompt libraries and support workflows. APIs expose explicit business actions separately.

**Classification:** FOUNDATION_PRACTICE + INTERACTION_PATTERN.

**P1.7 implication:** prioritize bounded query/explanation readiness and proposal/draft operations. Autonomous state change remains unproven and must route through ordinary domain commands.

## A04 — agent ecosystems can create specialized tools without changing system of record

Coupa marketplace examples describe AI integrations that read procurement requests, perform specialized work and write results back while Coupa remains system of record.

**Classification:** CAPABILITY_HYPOTHESIS supported by interface pattern, not proof of universal reliability.

**P1.7 implication:** preserve system-of-record authority and tool/result provenance. A specialized external agent can be added or removed without becoming authoritative merely by integration.

---

# 5. Practices to adopt semantically

1. bounded business operations, not generic mutation;
2. explicit read/write/observe/send capability profiles;
3. action/job status separated from resource state;
4. stable idempotency/correlation and external-ID mapping;
5. versioned webhook/event payloads;
6. provider callbacks treated as signals requiring validation/retrieval;
7. missed-notification/resync lifecycle;
8. provider subscription/scopes/reconsent/degradation states;
9. pagination/bulk partial outcomes;
10. exact external version/evidence reconstruction;
11. common capability substrate for UI/services/connectors/chat/agents;
12. conversational answers linked to inspectable source records/evidence;
13. explicit AI uncertainty/manual fallback;
14. no named connector prerequisite for minimal deployment.

---

# 6. Practices not to inherit blindly

## O01 — broad enterprise project/CDE scope

Autodesk Construction Cloud and Procore expose wide construction ecosystems. P1.7 should integrate at bounded seams rather than reproduce their CDE/project-management breadth.

**Classification:** OUT_OF_SCOPE_ENTERPRISE_GRAVITY.

## O02 — supplier-network prerequisites

SAP Ariba/Coupa network/account models can require configured supplier identities/accounts for certain integrations.

The product’s frozen A0–A3 path must retain buyer-on-behalf/manual capture and no persistent supplier-account prerequisite.

**Classification:** OUT_OF_SCOPE_ENTERPRISE_GRAVITY for required network activation.

## O03 — API permission model delegated to external platform

Some platforms rely on realm/application or platform-specific access assumptions.

Our P1.7 cannot assume the external platform’s authorization is sufficient for internal P09/domain authority.

**Classification:** FOUNDATION WARNING.

## O04 — current product endpoints as ontology

Competitor resource names and API endpoint structures change and deprecate over time. Procore documentation currently shows endpoint deprecations and version movement.

**Classification:** IMPLEMENTATION DETAIL / WARNING.

P1.7 should freeze semantic capabilities/events rather than clone endpoint names.

## O05 — marketing claims as reliability evidence

Conversational agents, automated workflows and autonomous negotiation claims do not prove that BOQ extraction, package creation or award decisions are reliable for this product’s construction-procurement context.

**Classification:** MARKETING_OR_PREVIEW.

---

# 7. Evidence-driven candidate conclusions

## C01 — three access surfaces, one semantic capability substrate

Support:

1. internal UI/service access;
2. external connector/API access;
3. future chat/agent tool access.

All resolve to the same registered bounded queries/proposals/commands/async operations.

## C02 — chat-first is optional, chat-ready is required

The architecture should expose query/explanation/proposal/action capabilities usable by chat, but deterministic screens/manual operation remain independent.

## C03 — email is a connector profile, not the evidence model

Microsoft/Gmail semantics differ in subscription, notification and send behavior. P1.7 must normalize them into frozen P1.6 message/transmittal/observation concepts without pretending provider callbacks have universal legal/business meaning.

## C04 — connector certification is semantic conformance

A connector must prove:

- authority mode;
- scope/permissions;
- external version semantics;
- callback authenticity/correlation;
- missed-change recovery;
- idempotency/replay behavior;
- degradation/reconsent/manual fallback;
- evidence/materialization behavior;
- no direct business-truth writing.

## C05 — current best practice supports activation tiers

Minimal deployments can use manual/file interfaces; mature deployments can add generic APIs/webhooks and selected named connectors without changing domain semantics.

## C06 — AI capability should be registered and evidence-gated

A capability such as `ProposeProcurementPackagesFromBOQ` can exist as disabled, experimental, review-required or later promoted without changing the deterministic operations it ultimately proposes/invokes.

The capability status/evaluation belongs primarily to P1.10, while P1.7 freezes the attachable interface and safe result types.

---

# 8. No architecture decision yet

This evidence supports the P1.7 direction but does not itself freeze API schemas, event names, connector technology, AI capability or ADR-0006.

Those decisions require the P1.7 semantic contracts and hostile audit.
