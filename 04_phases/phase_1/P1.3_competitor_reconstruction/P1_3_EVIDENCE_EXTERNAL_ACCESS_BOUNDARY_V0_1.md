# P1.3 — Evidence & External Access Boundary v0.1

**Status:** PROVISIONAL BOUNDARY INPUT / FEEDS P1.4
**Size:** L shared substrate / not an independent XL subsystem

## 1. Purpose

Preserve load-bearing procurement/commercial evidence and permit low-friction external participation without becoming a CDE, records-management platform or supplier network.

## 2. Owned evidence semantics

For transactions governed inside the product, own:
- EvidenceReference identity;
- immutable/versioned source attachment record;
- source/capture provenance;
- actor / organization / timestamp;
- content integrity/hash where required;
- domain event/object/version linkage;
- evidence type/purpose;
- sensitivity/access classification needed for transaction use;
- supersession/version lineage;
- bounded retrieval/audit history where required.

Examples include tender releases, quotes/revisions, clarifications, approvals, commitment/change evidence, receipts, certifications and recoveries when those domains are activated.

## 3. External access semantics

Support bounded channels:
- guest task/tender link;
- email reply/attachment ingestion;
- optional persistent portal later;
- governed buyer-on-behalf capture.

Access must be tenant/project/tender/task scoped, least privilege, expiring/revocable and provenance preserving.

No supplier may browse unrelated tenant/project data merely because it has participated elsewhere.

## 4. Referenced external authority

Reference rather than own where another system is authoritative:
- CDE drawings/submittals/review records;
- enterprise document IDs;
- ERP/accounting/payment documents;
- bank/security/legal records;
- master project correspondence.

Preserve external system/record identity, version/effective state where available, and authority/freshness semantics.

## 5. Explicit refusals

The substrate is not:
- general folder/document management;
- project transmittal/correspondence platform;
- markup/annotation engine;
- design/submittal review workflow;
- CDE replacement;
- legal hold/eDiscovery;
- enterprise retention/redaction/classification-policy engine;
- records-management suite;
- mandatory supplier network/portal.

## 6. Email boundary

Email is a capture channel.

The first rail may accept supplier email attachments and deterministic metadata without requiring automatic structured extraction.

AI/extraction may improve later economics but cannot overwrite or replace supplier-source evidence.

## 7. P1.4 handoff

P1.4 must decide physical tenancy/ownership/access implementation without expanding this boundary.

Open implementation questions include:
- attachment storage model;
- authentication mechanism for guest actions;
- organization/contact identity persistence;
- sharing-token design;
- evidence retention defaults;
- cross-tenant supplier identity behavior.

The semantic burden ceiling remains L unless a controlled change proves a stronger requirement.
