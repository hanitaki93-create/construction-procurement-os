# CPOS Product Capability Recovery Gate v0.1

**Date:** 2026-08-13
**Status:** OPEN / BUILD PROGRAM RECOVERY REQUIRED
**Branch:** `architecture-product-capability-recovery-v1`
**B04-B06 independent re-audit target:** unchanged at `4f9de1ed60bbd138f1b96a8b7e7e08af403b7c15`

## 1. Decision

The frozen Phase-2 technical architecture is **not rejected wholesale**. The B01-B06 substrate is preserved unless a capability review proves a specific model defect.

However, the existing post-B06 build decomposition is **not authorized for implementation as written**. In particular, old B07+ prompts may not start merely because the B04-B06 technical audit passes.

This recovery gate exists because the project has strong traceability from:

`frozen requirement -> invariant -> object/operation -> write owner -> concurrency/security mechanism -> hostile test`

but lacks an equally binding traceability chain from:

`real procurement capability -> user-facing object -> required fields/master data -> display numbering -> lifecycle -> business document/output -> end-to-end journey -> user acceptance test -> backend truth`

The result is a real architecture-to-product translation defect: correct backend primitives can be judged complete while the recognizable procurement capability remains absent, too thin, or exposed in internal ontology vocabulary.

## 2. Evidence for opening the gate

The Phase-1 frozen scope explicitly retains, among others:

- material/request requisition path as SPINE;
- procurement package path as SPINE;
- vendor/subcontractor master as SPINE;
- minimum vendor compliance/eligibility state as SPINE;
- item/material catalogue as THIN rather than OUT;
- RFQ/tender event as SPINE;
- quote and revision capture as SPINE;
- bid comparison/levelling as SPINE;
- approval/authority as SPINE;
- award/handoff as SPINE;
- PO/subcontract commitment record as SPINE;
- contract/PO document compilation as THIN;
- material receipt/GRN as THIN.

The Phase-1 competitor inheritance explicitly states that CPOS should support both a fast material/MR path and a package/complex-scope path, and that users should not need to understand allocation ontology in order to request material.

Current B05/B06 implementation does not yet satisfy the product meaning of several of those statements:

- B05 models authorized requirement source/basis/allocation but no first-class user MR header/line/distribution capability;
- UOM is currently an unconstrained semantic key string rather than governed master/reference data;
- there is no implemented item/material/service master bound to requisition/RFQ lines;
- B06 supplier relationship/contact is a minimal placeholder, not a credible vendor master;
- RFQ `event_number` is entered rather than governed by a numbering policy/service;
- there is no complete RFQ document-template/output capability;
- there is no early PO/LPO formation capability despite PO/subcontract being a Phase-1 SPINE area;
- current internal web surfaces backend vocabulary (`Evidence`, `Requirements & allocation`) rather than the intended procurement vocabulary.

## 3. Recovery doctrine

### 3.1 Preserve strong substrate

Presumptively retain:

- modular TypeScript monolith and PostgreSQL authority;
- tenant/project/legal-entity/authority context;
- RLS and execution-context enforcement;
- idempotency/operation protocol;
- append-only version/occurrence history;
- exact decimal boundaries;
- concurrency profiles/guards;
- evidence/object-store provenance;
- issued-artifact immutability;
- sourcing issue/addendum/grant semantics;
- requirement allocation conservation;
- supplier submission/source truth and comparison semantic layering planned in Phase 1.

### 3.2 Stop leaking ontology into UX

Backend truth objects may remain abstract where justified, but ordinary users must operate in recognizable procurement language and objects:

- Material Requisition / Purchase Requisition;
- Item / Service / Scope Line;
- Supplier / Subcontractor;
- RFQ / Tender;
- Quotation / Revision;
- Comparison / Bid Leveling;
- Recommendation;
- Approval;
- Award;
- LPO / Purchase Order / Subcontract;
- Delivery / GRN / Receipt where in scope;
- Documents / Attachments / Addenda / Clarifications.

`EvidenceVersion`, `RequirementAllocation`, `IssuedArtifactVersion`, etc. remain internal truth primitives unless a specialist/admin view genuinely needs them.

### 3.3 Capability specs precede implementation

Every new or materially revised product capability requires an accepted `CapabilitySpecification` before its implementation block is authorized.

No capability spec may be satisfied merely by pointing to an invariant or backend table.

### 3.4 Domain-owner validation becomes mandatory

Every capability spec must include an explicit project-owner/domain validation decision before build authorization. This validation tests procurement meaning and usability, not only technical correctness.

Independent hostile audit remains required for mechanism/security/load-bearing semantics; domain validation is a separate mandatory gate.

## 4. Immediate lock state

- B04-B06 technical re-audit: **continue to independent verdict on the unchanged package**.
- PR #7 merge: **not authorized merely by this recovery work**.
- Old B07 implementation: **LOCKED**.
- Old B08-B18 implementation: **LOCKED**.
- Product architecture/capability recovery research and specification: **AUTHORIZED**.
- B01-B06 destructive rewrite: **NOT authorized without specific evidence and change record**.

## 5. Required recovery outputs

The recovery gate closes only when all of the following exist and have been reviewed:

1. competitor/end-to-end reverse-engineering refresh with evidence grading;
2. Capability Specification standard;
3. product-capability completeness matrix over the full retained Phase-1 scope;
4. master/reference data specification;
5. numbering and legal/display identity specification;
6. document-template/rendering boundary specification;
7. revised end-to-end procurement journey and revised build program;
8. B01-B06 disposition matrix: KEEP / EXTEND / MODIFY / REPLACE / DEFER;
9. explicit early commitment-formation decision for LPO/PO/subcontract;
10. AI-enrichment map tied to deterministic product objects and source provenance;
11. domain-owner acceptance of the revised product program;
12. independent architecture review of any load-bearing changes.

## 6. Target product bar

CPOS is not targeting a toy standalone RFQ app.

The product must be valuable even to an organization that already owns Oracle, SAP, CMiC, Vista or another ERP by being materially better in construction procurement execution, supplier participation, bid intelligence, comparison/leveling, procurement visibility, evidence/provenance, decision support and AI-assisted work while coexisting with external accounting authority.

A first serious commercial journey must be demonstrable as:

`MR/Package -> RFQ -> supplier responses/revisions -> normalized comparison -> recommendation/approval -> award -> issue-ready LPO/PO/subcontract -> downstream handoff/receipt seam`

with governed master data, numbering, documents, attachments, history and user-facing registers throughout.
