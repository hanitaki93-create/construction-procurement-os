# CPOS Capability Specification Standard v1.1

Every material product capability requires an accepted `CapabilitySpecification` before implementation authorization.

## Mandatory sections

### A. User meaning
Capability name in ordinary procurement language, primary roles, business outcome, and internal/backend terms that must not leak into ordinary UX.

### B. User-facing object model
Header, lines, distributions/splits, attachments/documents, source/derived lineage, catalogue/master-backed versus free-form records.

### C. Fields — mandatory build authority
For every material product field: label, meaning, type, required/optional/conditional status, master/reference source, defaults, lifecycle editability, validation, security classification, downstream-copy behavior.

Section C may be represented either:
1. as an embedded field table in the owning CapabilitySpecification; or
2. as a **compiler-bound field-contract artifact** referenced by the capability manifest.

A separate field-contract artifact is not a waiver. It has equal freeze/build authority to the capability spec, must inherit the common field-contract semantics where used, must enumerate every closed enum, and must cover every material user/domain field named by the owning R01–R08 capability. The manifest must identify the exact field-contract path and the completeness compiler must fail if it is absent or lacks the required ten-column contract table.

Common system fields and common exact-money/UOM/editability/security/copy semantics may be inherited from one versioned common field-contract artifact to avoid duplicated definitions, provided the owning field contract explicitly inherits it.

### D. Identity and numbering
Immutable internal identity; displayed business/document number; scope; format; auto/manual policy; gap policy; cancellation/reissue behavior; concurrency mechanism; legal/audit implication.

### E. Lifecycle
Visible statuses, allowed actions, approval/review gates, cancel/withdraw/revise/supersede behavior, downstream effect, late/exception states.

### F. Journey position
Predecessors, successors, conversion/copy rules, grouping/splitting rules, legitimate bypass/direct-buy routes, source truth versus copied working values.

### G. Documents and outputs
Required printable/issued document classes, template inputs, headers, line/table layout, terms/notes/attachments index, revision marking, language/RTL, preview/download/issue/manual-send behavior and immutable issued-artifact binding.

### H. Registers and operational views
List/register columns, search/filter/sort, status summaries, overdue/risk indicators, portfolio visibility where applicable, and drill-down links.

### I. Backend truth mapping
Authoritative domain objects, accepted B01-B03 primitives reused, any B04-B06 mechanisms intentionally salvaged, new objects, invariants, write owner, concurrency profile, provenance bindings and ERP authority boundary.

### J. AI readiness
Source data, deterministic target schema, citation/provenance, confidence/uncertainty, human confirmation, forbidden silent actions and evaluation criteria.

### K. User acceptance
At minimum create/edit/review/approve-or-issue flow; print/export/download where the object is a business document; revision/cancellation; one error/exception; predecessor -> capability -> successor; role/permission behavior; mobile/RTL disposition.

## Required first-spine specs

- Master/reference data;
- Supplier Master + compliance;
- Material/Purchase Requisition;
- Procurement Package/Scope planning where applicable;
- RFQ/Tender formation and issue;
- Supplier Quotation and Revision;
- Bid Comparison/Leveling;
- Recommendation/Approval/Award;
- Early LPO/PO/Subcontract formation;
- Procurement Workbench/Schedule;
- Receipt/GRN handoff seam;
- Business document template/rendering;
- Numbering policy;
- cross-cutting quality/accessibility/localization/recovery binding.

## Completeness compiler

The build-authorization check must fail when any retained capability lacks:

`CapabilitySpecification -> user object -> Section-C field contract -> fields/master refs -> numbering disposition -> lifecycle -> predecessor/successor -> document/output disposition -> backend mapping -> user acceptance -> domain-owner decision`

For R01–R08, `field_contract` is mandatory in the manifest even when a capability spec also contains useful field prose. The checker validates:
- field-contract path exists;
- field contract declares `STANDARD §C AUTHORITY` or equivalent frozen marker;
- field contract contains a ten-column table including `Field / label`, `Meaning`, `Type`, `Requirement`, `Master / reference source`, `Default`, `Lifecycle editability`, `Validation`, `Security`, `Downstream-copy behavior`;
- owning capability IDs are mapped once;
- closed-enum definitions are explicit in the spec or bound field contract;
- no REQUIRED retained capability can bypass domain meaning status merely because its implementation block is later.

A SPINE/required capability cannot be satisfied only by an internal table, invariant or service.

## Domain validation

Before implementation of an owned capability, the project owner/domain reviewer records `MEANING_PASS` or `MEANING_FAIL` against the exact capability spec + field-contract version. Technical audit remains separate and cannot substitute for domain acceptance.

## Freeze rule

Architecture V2 freeze binds the architecture candidate, capability inventory, capability specs, field-contract artifacts, numbering policy, default profile, Phase-1 disposition trace and manifest together. Coding-session plans may sequence work but may not reinterpret those frozen meanings.