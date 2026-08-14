# CPOS Product Rebaseline Decision v1.0

**Date:** 2026-08-14
**Status:** OWNER REBASELINE / OLD PRODUCT PROGRAM REJECTED

## Decision

The B04-B06 procurement wave is rejected as a product increment. Its technical work may be reused only through explicit salvage decisions. It is not considered ready for independent product audit and no audit verdict can convert it into accepted product scope.

PR #7 is closed without merge. The prior B04-B06 audit package is historical engineering evidence only.

The old post-B06 build sequence B07-B18 is superseded and may not be resumed as written.

## Reason

The prior program proved mechanism correctness more strongly than product completeness. It allowed backend primitives to stand in for user capabilities. Material failures include under-specified MR/PR, supplier master and compliance, item/UOM/reference data, numbering, business-document rendering, RFQ line formation, award-to-order formation, operational registers, and leakage of backend ontology into the UI.

## Governing replacement principle

A build block is complete only when the real procurement capability exists end to end:

`capability evidence -> CapabilitySpecification -> domain meaning PASS -> backend mapping/invariants -> implementation -> real UI -> document/output -> predecessor/successor journey -> user acceptance -> technical hostile audit`

## Reuse doctrine

Existing code has no automatic protected status merely because it passed technical tests. Reuse is allowed only when the new product architecture proves that the object, operation, invariant or infrastructure still serves the accepted user capability without forcing product semantics around the old implementation.

Presumptively reusable substrate includes tenancy/authority/RLS, execution context, idempotency, exact decimal handling, object storage/evidence provenance, issued-artifact immutability, concurrency primitives, version/occurrence history, and selected B05/B06 conservation/issue semantics.

Presumptively rejected as canonical product design are the current B05/B06 user-facing abstractions, current supplier-master depth, manual RFQ numbering, current dashboard information architecture, and the old sequencing that delayed real internal UX and commitment formation.

## Target

CPOS must be valuable to a contractor that already owns Oracle, SAP, CMiC, Vista or another ERP by being materially better at construction procurement execution, supplier participation, bid intelligence, comparison/leveling, procurement visibility, evidence, decision support and AI-assisted work while coexisting with external finance/accounting authority.

The first accepted product spine is:

`MR/Package -> RFQ -> Supplier Quote/Revision -> Comparison/Leveling -> Recommendation/Approval -> Award -> LPO/PO/Subcontract -> Receipt/ERP handoff seam`

with serious master data, numbering, documents, registers, history and user acceptance throughout.