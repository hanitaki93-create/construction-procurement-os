# B01-B06 Product Disposition v0.1

**Date:** 2026-08-13
**Status:** RECOVERY REVIEW

## B01 Engineering Foundation — KEEP

Retain monorepo, CI, database foundation, exact types, architecture validators, test infrastructure, object-store adapter, observability and release evidence. No product-capability defect justifies rebuilding B01.

## B02 Platform Kernel — KEEP / EXTEND REFERENCE CONFIGURATION

Retain tenant/project/legal-entity/principal/role/authority/RLS/operation/concurrency foundations.

Extend later with product configuration needed for:
- document numbering policies;
- bounded reference-data activation;
- template-class activation;
- business-unit/project defaults.

Do not replace existing execution-context or RLS design.

## B03 Async/Event/Publication/Reconciliation — KEEP

Retain as substrate for:
- document rendering;
- dispatch/email adapters;
- supplier-response ingestion;
- AI extraction jobs;
- ERP/CDE integrations;
- reconciliation and unknown-effect handling.

Do not make B03 concepts part of ordinary procurement UX.

## B04 Evidence/Files/Issued Artifacts/Communication — KEEP CORE / REFRAME UX

Strong reusable assets:
- upload sessions;
- immutable evidence versions;
- validation observations;
- object identity/checksum;
- issued artifact versions;
- build-member manifests;
- message/communication occurrence semantics.

Required product change:
ordinary users interact with named business documents and attachments. `Evidence` becomes infrastructure and specialist/admin detail.

Examples:
- Supplier -> Trade Licence / VAT Certificate / Insurance / Attachments;
- MR -> Supporting Documents;
- RFQ -> Tender Documents / Addenda;
- Quotation -> Original Quote / Revision Attachments;
- PO -> Issued Order / Annexures.

B04 should become the immutable document engine beneath these surfaces.

## B05 Requirements/Allocation — KEEP BACKEND / MAJOR PRODUCT EXTENSION

Strong reusable assets:
- authorized requirement source/version;
- allocation conservation;
- amendment guard;
- package membership and lineage;
- concurrency protection.

Missing product capability:
- Material/Purchase Requisition header;
- requisition lines;
- line distributions/cost attribution;
- item/service/master references;
- governed UOM reference;
- need-by/delivery/priority/requester;
- approvals and route status;
- printed/exported MR;
- requested/approved/sourced/ordered/received line visibility.

Decision:
`RequirementAllocation` remains the backend scope authority. It is not the primary user object.

## B06 Sourcing/RFQ/Grants/Issue — KEEP CORE / MAJOR PRODUCT EXTENSION

Strong reusable assets:
- sourcing event/version;
- response schema version;
- acceptance policy;
- event member;
- external task grant;
- addendum/version issue discipline;
- immutable issued-artifact binding;
- no-account external participation foundations.

Supplier-master defect:
current supplier relationship/contact tables are a placeholder and cannot satisfy the frozen vendor-master/compliance product scope.

RFQ product defects:
- event number entered manually;
- no governed numbering policy;
- no serious RFQ line model propagated from MR/package demand;
- no item/UOM/cost/master binding;
- commercial instructions/terms too thin;
- no complete professional RFQ PDF/Excel output contract;
- no ordinary send/download workflow surface;
- no procurement register quality surface.

Decision:
retain B06's issue/security semantics, but do not let old B07 consume B06 until R02-R05 close the missing product layers.

## Overall reuse judgment

- B01: high reuse.
- B02: high reuse.
- B03: high reuse.
- B04: high backend reuse, major UX reframing.
- B05: strong conservation reuse, major product-model expansion.
- B06: strong issue/version/grant reuse, supplier/RFQ product expansion mandatory.

No destructive rewrite is authorized by this document. Every change must be additive or surgically replace only the demonstrated incomplete surface/model.
