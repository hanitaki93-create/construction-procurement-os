# P1.7 — ADR-0006 V1 Integration Depth Candidate v0.1

**Date:** 2026-08-01  
**Status:** CANDIDATE DECISION / NOT ACCEPTED  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Decision question

What integration depth must V1 support without delaying A0–A3, creating connector co-masters or overcommitting to external products before customer/deployment evidence exists?

---

# 2. Candidate decision

Adopt one semantic integration core with activation tiers.

## Tier 0 — NATIVE / MANUAL FALLBACK — MANDATORY

Product operates end to end using:

- bounded internal UI/services;
- manual/config entry;
- buyer-on-behalf evidence capture;
- product-generated/downloadable issued artifacts;
- manual external communication/handoff with capture evidence;
- no named connector.

A0–A3 must pass at Tier 0.

## Tier 1 — STRUCTURED FILE EXCHANGE — MANDATORY V1 FOUNDATION

Support bounded, versioned, validated import/export for selected bootstrap and transaction seams:

- project/supplier/reference bootstrap;
- requirement/BOQ staging where supported;
- supplier response/price staging where supported;
- bounded award/handoff exports;
- migration/import manifests;
- item-level errors/quarantine;
- no direct state assignment.

Exact file formats are later product design; semantics freeze now.

## Tier 2 — GENERIC API / EVENT / EMAIL CONNECTOR CONTRACT — MANDATORY ARCHITECTURE, OPTIONAL ACTIVATION

V1 architecture and build specification must expose/provider-enable:

- registered command/query/proposal/async capability contracts;
- versioned event/publication semantics;
- connector authority/capability profiles;
- provider-neutral email send/capture/watch seam;
- generic inbound/outbound integration operations;
- idempotency/retry/reconciliation;
- future chat/agent tool access over the same operations.

A tenant may activate none, some or all Tier-2 adapters.

The deterministic product remains complete without them.

## Tier 3 — SELECTED NAMED CONNECTORS — EVIDENCE-DRIVEN OPTIONAL V1 DEPLOYMENT

One or more named email/ERP/accounting/CDE connectors may be selected for a deployment/release only after:

- customer demand and access evidence;
- provider API/version/conformance evidence;
- bounded implementation burden;
- authority profile;
- manual fallback;
- no A0–A3 prerequisite;
- connector certification.

P1.7 does not select a named provider.

## Tier 4 — DEEP REAL-TIME TRANSACTIONAL INTEGRATION — LATER BY DEFAULT

Deep bidirectional transactional integration, co-orchestrated ERP processes, broad CDE mirroring, real-time master-data dependency or multi-system transactional coupling is OUT of mandatory V1 unless later evidence/controlled change proves necessity.

It cannot create dual masters or make first tender depend on enterprise integration.

---

# 3. V1 seam decisions by external system class

## Email/message

V1 must be architecturally and product-spec ready for optional provider-neutral scoped email integration:

- exact outbound Transmittal send;
- inbound scoped capture;
- message/attachment evidence;
- reply/correlation;
- notification-gap/reconsent/retry;
- manual fallback.

A named Microsoft/Gmail/SMTP adapter is an implementation/deployment selection, not semantic architecture.

## ERP/accounting

Mandatory V1 integration depth:

- bounded structured export/API handoff of Award/Commitment/invoice-match/reference data where activated;
- inbound REFERENCE/MIRROR of externally authoritative accounting/posting/payment/master facts where activated;
- reconciliation/error/freshness semantics;
- no ERP posting/payment co-master;
- no deep real-time dependency for A0–A3.

## CDE/document systems

Mandatory architecture:

- external exact-version reference/capture under ReconstructionAnchorTest;
- scoped metadata/evidence import/reference;
- no full repository hierarchy/permissions/workflow mirror;
- no CDE prerequisite for product-issued tender/evidence path.

## Bank/security systems

Reference/observe specific external security/payment facts only when activated and evidenced.

No banking platform or cash authority.

## Technical/project systems

Bounded technical approval/dependency/source-event references where activated.

No CPM/BIM/project-management clone.

---

# 4. Why this decision

## A — preserves first-live speed

A0–A3 operates at Tier 0/1, so enterprise API access, provider contracts and customer IT approvals cannot block the first tender.

## B — preserves ceiling

Tier-2 contracts let email, ERP, CDE, chat, agents and future connectors attach without ontology rewrite.

## C — preserves evidence-based scope

Named connectors are selected only when real customers/providers justify them.

## D — prevents second XL

No iPaaS/ESB/MDM/network platform is created.

## E — supports replacement/reduction

Connectors can be enabled, limited, replaced or removed while product authority/manual path remains.

---

# 5. Explicit non-decisions

This candidate does not choose:

- Microsoft 365 versus Gmail;
- SMTP versus provider API;
- SAP/Coupa/Oracle/other ERP;
- Autodesk/Procore/Aconex/other CDE;
- REST versus GraphQL/RPC;
- webhook versus queue technology;
- API gateway/iPaaS;
- exact file formats;
- exact named connectors for V1 launch.

Those are deployment/product implementation choices subject to the frozen contracts.

---

# 6. Prohibited interpretations

- “Tier 2 mandatory architecture” does not mean every connector must be implemented before first tender.
- “Optional activation” does not allow connector semantics to be invented later.
- “Manual fallback” does not permit weaker domain/evidence history.
- “Named connector selected” does not grant it authority beyond profile.
- “Deep integration later” does not prohibit future expansion; it requires controlled evidence and no ontology rewrite.

---

# 7. Candidate ADR-0006 wording

**Decision:**

Adopt a tiered V1 integration depth. Tier 0 native/manual operation and Tier 1 bounded structured import/export are mandatory for the first-live product path. Tier 2 provider-neutral command/query/event/connector/email contracts are mandatory architecture and build-spec foundations but individually optional tenant activations. Named connectors are evidence-driven optional deployments and cannot be prerequisites for A0–A3. Deep real-time transactional integration remains later by default. Across all tiers, authority/event/evidence meanings are invariant, connector co-mastery is prohibited, and deterministic/manual operation remains complete.

---

# 8. Gate claim

Candidate closes ADR-0006 if hostile audit confirms:

- A0–A3 completes Tier 0/1;
- email/chat/agent/ERP/CDE expansion is attachable at Tier 2;
- named connector choice remains deployment evidence, not semantic gap;
- no mandatory integration implementation is hidden;
- product build specification can distinguish mandatory foundation from optional adapter;
- no second XL.

---

# 9. Hostile tests

1. No Microsoft/Google consent available — first tender completes? REQUIRED.
2. Customer later wants Graph email — adapter fits frozen mail profile? REQUIRED.
3. Customer later removes email connector — manual flow remains? REQUIRED.
4. ERP integration delayed six months — product commercial workflow unaffected? REQUIRED.
5. Named CDE has mutable current links only — cannot satisfy load-bearing evidence without capture? REQUIRED.
6. One deployment needs deep ERP writeback — controlled future activation/profile, no core rewrite? REQUIRED.
7. AI/chat disabled — APIs/UI/manual remain? REQUIRED.
8. Tier 1 file import attempts direct awarded status — rejected? REQUIRED.
9. Connector vendor changes — profile/effective cutover, no authority change? REQUIRED.
10. Integration ambition starts growing into iPaaS — one-XL gate fails? REQUIRED.

This decision remains candidate until internal and Claude hostile review PASS.
