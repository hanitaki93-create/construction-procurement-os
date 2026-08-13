# CPOS Capability Specification Standard v0.1

**Date:** 2026-08-13
**Status:** REQUIRED FOR PRODUCT RECOVERY

## 1. Purpose

The existing invariant compiler proves that implemented mechanisms preserve frozen semantic rules. It does not prove that a real procurement capability exists for a user.

Every material product capability now requires a `CapabilitySpecification` before implementation authorization.

## 2. Mandatory capability-spec sections

Each specification must define all of the following.

### A. User meaning
- capability name in ordinary procurement language;
- primary users/roles;
- user problem and business outcome;
- terms that must never leak from backend ontology into ordinary UX.

### B. User-facing object model
- header object(s);
- line object(s);
- distribution/split objects where required;
- attachment/document associations;
- parent/child and source/derived lineage;
- explicit distinction between catalogue/master-backed and free-form records.

### C. Fields
For every field:
- label;
- meaning;
- data type;
- required/optional/conditional;
- reference/master-data source;
- defaulting rule;
- editability by lifecycle state;
- validation;
- privacy/security classification;
- whether it is copied/derived into downstream documents.

### D. Identity and numbering
- immutable internal identity;
- displayed business/document number;
- numbering scope (tenant/company/project/year/document class);
- mask/format;
- automatic/manual policy;
- gap policy;
- cancellation/reissue behavior;
- concurrency mechanism;
- legal/audit implication.

### E. Lifecycle
- statuses the user sees;
- allowed actions at each status;
- approvals/review gates;
- cancel/withdraw/revise/supersede semantics;
- downstream effect of each transition;
- late/exception states.

### F. Journey position
- exact predecessor objects;
- exact successor objects;
- conversion/copy rules;
- grouping/splitting rules;
- direct-buy/bypass alternatives where legitimate;
- which values remain source truth versus copied working values.

### G. Documents and outputs
- required printable/issued document classes;
- template inputs;
- company/project/supplier header blocks;
- line/table layout;
- terms/notes/attachments index;
- revision/version marking;
- language/RTL needs;
- preview/download/issue/manual-send behavior;
- immutable issued-artifact binding.

### H. Registers and operational views
- list/register columns;
- search/filter/sort;
- status summaries;
- overdue/risk indicators;
- cross-project/portfolio visibility if applicable;
- drill-down links.

### I. Backend truth mapping
- authoritative domain objects;
- existing B01-B06 primitives reused;
- new objects required;
- invariants participating;
- write owner;
- concurrency profile;
- evidence/provenance bindings;
- integration/ERP authority boundary.

### J. AI-enrichment readiness
- source documents/data available;
- deterministic target schema AI can map into;
- citation/provenance requirements;
- confidence/uncertainty representation;
- human confirmation step;
- actions AI is forbidden to perform silently;
- evaluation dataset/acceptance criteria.

### K. User acceptance
The capability must include user-language scenarios, not only unit/integration tests.

At minimum:
- create/edit/review/approve or issue flow;
- print/export/download flow if the object is a business document;
- revision/cancellation flow;
- one error/exception flow;
- one end-to-end predecessor -> capability -> successor flow;
- role/permission behavior visible to the user;
- mobile/RTL disposition where relevant.

## 3. Product-owned master/reference specifications

The following must have explicit capability/reference specifications before the revised sourcing spine is built:

1. Supplier/Subcontractor Master;
2. Supplier Contacts/Addresses;
3. Supplier Compliance and Eligibility;
4. Item/Material/Service/Scope Master;
5. UOM Registry;
6. Category/Trade Taxonomy;
7. Cost Code/WBS Reference;
8. Currency/Tax/Payment-Term reference;
9. Project Delivery/Ship-To Locations;
10. Document Numbering Policy;
11. Document Template Classes.

## 4. Mandatory first-spine capability specs

Before any successor implementation is authorized, accepted specs must exist for:

- Material Requisition / Purchase Requisition;
- Supplier Master + minimum compliance;
- Item/Service/UOM reference layer;
- RFQ/Tender Formation and Issue;
- Supplier Quotation and Revision;
- Bid Comparison / Leveling;
- Recommendation and Approval;
- Award Decision;
- Early LPO/PO/Subcontract Formation;
- Procurement Schedule/Register;
- Receipt/GRN handoff seam.

## 5. Capability completeness compiler

A new completeness check must fail a block/release when any retained capability lacks one of:

`CapabilitySpecification`
`-> user object`
`-> fields/master references`
`-> number policy where applicable`
`-> lifecycle`
`-> journey predecessor/successor`
`-> document/output disposition`
`-> backend mapping`
`-> user acceptance scenario`
`-> domain-owner decision`

The compiler must also fail when a SPINE capability is satisfied only by an internal/backend primitive without an accepted user-facing mapping.

## 6. Template-engine boundary

Document templates are product-owned and versioned.

Tenant configuration may set bounded presentation/content values such as:
- logo and company identity blocks;
- addresses/contact details;
- standard terms text selected from governed blocks;
- signature blocks;
- language/locale;
- approved optional sections.

V1 must not expose a general expression language, arbitrary code, tenant-authored formulas, or arbitrary conditional logic in templates.

## 7. Numbering as a registered control

Numbering is not a UI convenience. Every numbered document class must declare:
- uniqueness scope;
- gap policy;
- reservation/assignment timing;
- cancelled-number treatment;
- concurrency control;
- external/legal meaning.

The implementation must not use `max(number)+1` or equivalent race-prone allocation.

## 8. Domain validation gate

A capability is not build-authorized until the project owner/domain reviewer records:

`MEANING_PASS` or `MEANING_FAIL`

against the specification.

Independent technical audit remains separate and cannot substitute for domain acceptance.
