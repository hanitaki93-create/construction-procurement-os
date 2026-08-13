# Claude Recovery Findings — Evidence Disposition v0.1

**Date:** 2026-08-13
**Status:** RECOVERY INPUT REVIEW

## ACCEPT — Capability Specification artifact class

Confirmed. Phase 1 names many capabilities but does not provide a complete field/document/journey specification for each one. A new CapabilitySpecification layer is required before successor implementation prompts are authorized.

## ACCEPT — Capability completeness is separate from invariant completeness

Confirmed. The existing compiler can prove semantic/mechanism coverage while a usable procurement object remains absent or too thin.

## ACCEPT — Numbering is a controlled architectural concern

Confirmed. Business numbering needs uniqueness scope, lifecycle, cancellation/revision behavior and concurrency-safe allocation. `max()+1` is prohibited.

## MODIFY — No-gap is not universal for LPO/PO

Do not hardcode `LPO/PO = no-gap` as a universal rule. External evidence shows continuous numbering may be legally/audit required for some document classes/jurisdictions, while other systems allow gap policies or external/ERP-assigned visible order numbers.

CPOS decision: every document class has an explicit **gap policy** and legal/audit disposition. A no-gap class requires a dedicated concurrency/assignment design; a gap-allowed class may use a higher-throughput sequence strategy. Jurisdiction/tenant policy chooses only from product-supported profiles.

## ACCEPT — Template engine is a scope-risk boundary

Confirmed. Business documents need product-owned versioned template classes and bounded tenant branding/content configuration. V1 must not accidentally introduce a tenant-authored programming/expression language.

## ACCEPT — Master data is an AI prerequisite

Confirmed. Quote extraction/normalization needs deterministic targets: RFQ line, item/free-form identity, UOM, currency, supplier, revision and source citation. Without those, AI output remains ungoverned free text.

## ACCEPT — Requisition distribution/cost attribution

Confirmed by enterprise procurement patterns. MR/PR must support line-level project/cost/WBS attribution and governed splits where required; this is distinct from the procurement quantity/scope conservation already implemented in B05.

## ACCEPT — Compliance expiry should reuse existing effective-date/evidence foundations

Confirmed direction. Supplier compliance documents should be named business documents over B04 evidence/versioning, with expiry/verification feeding sourcing and commitment eligibility. The exact jurisdiction-specific eligibility rules require capability profiles and domain review.

## ACCEPT — Early LPO/PO/Subcontract formation

Confirmed. Simple order/contract formation must be part of the first serious commercial spine. It should be split from later deep P07 variations/claims/retention/certification/recovery.

## ACCEPT — Domain-owner meaning review as mandatory gate

Confirmed. Technical hostile audit cannot certify product meaning/usability. Every capability spec requires a separate domain `MEANING_PASS` before its build prompt is authorized.
