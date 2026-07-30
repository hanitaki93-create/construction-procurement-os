# P1.2 Perflex Bid-Leveling Artifact Decomposition v0.1

**Status:** PRIMARY_TRANSACTION_ARTIFACT / FOUNDER-CONTRACTOR EVIDENCE / P1.2 ARTIFACT GATE CANDIDATE

## Purpose

Decompose authentic Perflex comparison artifacts supplied directly from contractor procurement work and test whether P05 comparison/leveling semantics match real operating practice.

This evidence is not counted as an additional independent-contractor workflow case because it comes from the founder's own contractor environment. It is counted as a primary transaction artifact for the roadmap requirement that at least one real contractor bid-leveling/comparison artifact be decomposed.

## Artifacts supplied

### A. Villa 42 Aluminum comparison sheet

Perflex-branded comparison for aluminium and glass supply/installation for Villa 42.

Observed structure:
- two supplier quotations identified by quotation reference/date;
- common buyer-created line sequence and quantities;
- supplier unit price and total price side by side;
- 18 line items;
- commercial summary: total, discount, VAT, VAT-inclusive total;
- delivery terms;
- payment terms;
- technical-specification comparison;
- recommendation/remarks area.

Important observation:
Even when the priced line structure appears aligned, the offers are still not commercially/technically identical. Delivery, payment, discount, glazing/specification detail and approval assumptions differ. Equal or near-equal subtotal does not prove equivalence.

### B. Five Villas sanitaryware Comparison & Recommendation Form

Perflex-branded comparison across four supplier/product families for sanitaryware.

Observed structure:
- buyer comparison row sequence;
- supplier-specific item descriptions;
- product picture;
- brand;
- unit price;
- different brands/models presented against the same buyer need;
- explicit `Not Included`, `Not Mentioned`, `Not Applicable`, and fewer-option observations;
- multiple supplier options for some requirements and no equivalent for others;
- summary total/VAT;
- country of origin;
- warranty;
- delivery terms;
- payment terms;
- remarks;
- recommendation area.

Important observation:
Headline totals are not directly rankable where scope/coverage differs. A materially lower total can simply mean lower coverage. Item equivalence may be technical/functional rather than exact SKU/brand equivalence.

### C. AC Quotation Comparison Umm Al Quwain.xls

Authentic legacy comparison workbook supplied as an additional contractor sample.

The current artifact parser could not safely decompose the legacy binary `.xls` format in this pass. It is therefore recorded as corroborating primary evidence but is not required for the gate decision because artifacts A and B are sufficient completed transaction comparisons.

## Primary finding 1 — there is no universal comparison form

The evidence falsifies any architecture that assumes one fixed comparison grid schema can represent all packages.

Comparison shape varies by procurement problem:

1. **Simple homogeneous material**
   - buyer item;
   - quantity/UOM;
   - supplier unit/extended price;
   - lead time;
   - terms.

2. **Product/equipment alternative selection**
   - buyer need/reference;
   - supplier product/model/brand;
   - technical attributes;
   - pictures/datasheets;
   - equivalent/substitute judgment;
   - price;
   - warranty/origin/lead time.

3. **Trade subcontract / complex system package**
   - hierarchical scope sections/subsystems;
   - priced and unpriced scope;
   - quantities/rates/lump sums;
   - exclusions/inclusions;
   - provisional items;
   - technical deviations;
   - authority/consultant approvals;
   - programme;
   - commercial terms;
   - interfaces and missing scope.

4. **Mixed/ambiguous quotations**
   - supplier bundles;
   - supplier-added items;
   - missing items;
   - alternate brands;
   - inconsistent quantity/UOM;
   - quote attachments carrying load-bearing detail.

Therefore:

> Standardize the semantic comparison grammar, provenance, controls and outcome — not one physical comparison form.

## Primary finding 2 — comparison is a process, not a static document

A real comparison evolves through:

`Supplier quote/revision`
`→ capture original commercial/technical truth`
`→ map against buyer requirement/reference scope`
`→ identify missing/additional/bundled/alternate/deviated scope`
`→ technical/commercial clarification`
`→ supplier-confirmed revision where supplier economics change`
`→ buyer normalization/evaluation adjustments`
`→ freeze comparison snapshot`
`→ recommendation / approval / award`

The artifact visible to management is only one snapshot of this process.

## Primary finding 3 — four separate truths must remain distinct

The Perflex artifacts support the existing P05 separation:

1. **Supplier-origin truth**
   - exact quotation/revision;
   - supplier descriptions;
   - supplier quantities/rates/amounts;
   - exclusions/qualifications/terms;
   - attachments.

2. **Mapped/normalized representation**
   - how supplier lines correspond to buyer requirement/comparison rows;
   - UOM/quantity normalization;
   - bundle decomposition where justified;
   - comparable technical attributes.

3. **Buyer evaluation adjustment**
   - scope plug;
   - estimated missing value;
   - tax/FX normalization;
   - commercial loading;
   - risk/evaluation allowance;
   - scenario inclusion/exclusion.

4. **Supplier-confirmed contractable basis**
   - supplier revision/clarification/agreed final basis actually eligible to become commitment.

Internal leveling may inform award but must never silently rewrite supplier-origin or supplier-agreed truth.

## Required P05 semantic model

### ComparisonSchema

A package-specific schema assembled from reusable semantic dimensions.

It may be:
- template-derived;
- cloned from historical package;
- generated from BOQ/RFQ/price schedule;
- manually built;
- later AI-proposed.

It is not a universal fixed table.

### ComparisonRow / ScopeNode

Represents the buyer-side comparison basis at the grain appropriate to the package:
- item;
- BOQ line;
- system/subsystem;
- deliverable;
- section;
- allowance;
- commercial term;
- technical criterion.

Rows may be hierarchical.

### BidLineMapping

Must support many-to-many mapping between supplier lines and comparison rows.

Mapping status vocabulary should support at minimum:
- `EXACT_MATCH`
- `PARTIAL_MATCH`
- `BUNDLED`
- `ALTERNATE_OR_SUBSTITUTE`
- `SUPPLIER_ADDED`
- `MISSING_FROM_BID`
- `NOT_APPLICABLE`
- `UNMAPPED`
- `PENDING_CLARIFICATION`

The system must never force false one-line-to-one-line equivalence.

### Coverage / equivalence state

Coverage is separate from price.

For each supplier at relevant row/section/package grain preserve:
- quoted;
- missing;
- excluded;
- included elsewhere;
- alternate;
- additional;
- unclear;
- verified.

Technical equivalence is also separate from coverage:
- exact specified basis;
- accepted equivalent;
- proposed alternate;
- deviation;
- pending technical review;
- non-compliant.

### EvaluationAdjustment

Buyer-only comparison adjustment with:
- amount/value if any;
- reason/type;
- affected row/scope;
- source/evidence;
- actor/time;
- confidence/verification state;
- whether supplier confirmation is required.

An estimated plug cannot become contract value unless converted into supplier-confirmed commercial basis.

### ComparisonSnapshot

Immutable evaluated view preserving:
- selected supplier quote revisions;
- comparison schema version;
- mappings;
- coverage states;
- technical states;
- evaluation adjustments;
- FX/tax/rounding basis where relevant;
- unresolved clarifications;
- totals/rollups;
- actor/time/version.

This is the evidence that P06 recommendation/approval acts on.

## Comparison dimensions — fixed grammar, variable use

The platform should maintain a reusable dimension catalogue, while each package activates only what it needs.

### Scope/coverage
- inclusion/exclusion;
- quantity/UOM;
- missing/additional scope;
- bundle;
- option/alternate;
- provisional/allowance;
- interface responsibility.

### Technical
- brand/model/manufacturer;
- material/specification;
- performance/capacity;
- dimension/configuration;
- country of origin;
- approvals/compliance;
- drawings/submittals;
- warranty;
- deviation/equivalency.

### Commercial
- unit price;
- extended price;
- lump sum;
- discount;
- tax;
- currency/FX;
- payment terms;
- credit/advance;
- validity;
- delivery/lead time;
- commercial exclusions/qualifications.

### Risk/readiness
- completeness;
- unpriced exposure;
- technical approval risk;
- long-lead risk;
- unresolved clarification;
- vendor qualification/performance context.

No package is required to activate every dimension.

## Comparability guard

Do not infer `lowest bidder` from raw total alone.

The UI may always display supplier quoted total, but a ranked/evaluated comparison should disclose:
- coverage completeness;
- unresolved missing/excluded scope;
- technical qualification status;
- whether evaluated amount contains buyer adjustments;
- whether values are supplier-confirmed or internally estimated.

A package may be marked:
- `NOT_YET_COMPARABLE`
- `PARTIALLY_COMPARABLE`
- `COMPARABLE_WITH_DISCLOSED_ADJUSTMENTS`
- `COMPARABLE_SUPPLIER_CONFIRMED`

Exact labels remain later UI/state design; the semantic distinction is load-bearing.

## Industry-system corroboration

### ProcurePro

Official product material explicitly identifies inconsistent vendor pricing formats as the problem and uses tender price breakdowns so suppliers return prices in the same format. It also emphasizes inclusion/exclusion review and newer BidLevel extraction from supplier quotes.

Architecture lesson:
- standardize response structure where practical;
- do not assume standardization removes the need to level real supplier quotes.

Sources:
- https://procurepro.co/solutions/tenders-and-price-breakdowns
- https://procurepro.co/solutions/comparisons-and-recommendations

### Procore

Bid forms standardize responses using Amount, Unit/Quantity, Include/Exclude and Alternates. Bid Leveling then shows missing/excluded items, permits controlled edits/adjustments, notes, alternates and conversion of the finalized leveled bid into a PO/Subcontract.

Architecture lesson:
- prevention upstream + leveling downstream;
- preserve missing/excluded/alternate status as first-class comparison information.

Sources:
- https://support.procore.com/products/online/user-guide/project-level/bidding/tutorials/create-a-bid-form
- https://support.procore.com/products/online/user-guide/project-level/bidding/tutorials/level-bids-for-a-bid-form
- https://support.procore.com/products/portfolio-financials/user-guide/bid-room/tutorials/compare-bids-in-portfolio-financials

### BuildingConnected

Official Autodesk material uses custom bid forms with scope-specific line items plus side-by-side bid leveling. Autodesk's Ryan Companies case explicitly reports that different locations previously used different bid forms, detail levels and client presentation layouts and suffered from large Excel comparison workbooks.

Architecture lesson:
- the real problem is not solved by one universal template;
- standardize reusable structure/process while allowing scope-specific forms.

Sources:
- https://construction.autodesk.com/products/buildingconnected/
- https://construction.autodesk.com/resources/customers/ryan-companies-improved-construction-bid-management/

### Oracle Primavera Unifier

Current 2026 documentation supports default or company custom-designed bid tabulation. The comparison includes requestor lines, vendor bid lines and vendor-added lines.

Architecture lesson:
- company/package-specific comparison schema is normal;
- supplier-added scope must coexist with the buyer comparison basis.

Source:
- https://docs.oracle.com/en/industries/construction-engineering/primavera-unifier/26/business-process/comparingthebids-10296442a.html

### SAP Ariba Sourcing

Current bid analysis supports alternative bids, supplier-added line items, item coverage, non-price terms, filters, outliers and split award scenarios.

Architecture lesson:
- comparison is multi-dimensional and can contain supplier alternatives/additional items without corrupting the primary event structure.

Sources:
- https://help.sap.com/docs/strategic-sourcing/event-management/bid-analysis
- https://help.sap.com/docs/strategic-sourcing/event-management/bid-comparison-ui
- https://help.sap.com/docs/strategic-sourcing/event-management/supplier-added-items-in-events-8b1d6c823f844f6aa3382c9dc305c6fe

## Primary-vs-industry synthesis

The strongest shared pattern is:

`common buyer comparison basis`
`+ structured response where possible`
`+ supplier freedom for alternatives/additional scope`
`+ explicit missing/excluded coverage`
`+ buyer leveling/adjustment with provenance`
`+ immutable evaluated snapshot`
`+ supplier-confirmed commercial basis before commitment`

Perflex's lack of one standard form is therefore not evidence that comparison cannot be standardized. It shows **what** must be standardized at the semantic/process level rather than the spreadsheet-layout level.

## Gate decision

**P12-PRI-01 — completed authentic contractor bid-leveling/comparison artifact: CLOSED.**

Reason:
- artifact A is a completed Perflex contractor comparison with real bidder rows, quote references, pricing, technical comparison and commercial terms;
- artifact B independently demonstrates a materially different completed comparison shape with real products/vendors, missing coverage and package-specific evaluation dimensions;
- both have been decomposed under the P1.2 evidence rules;
- the roadmap asks for at least one real bid-leveling artifact decomposed, not a globally standardized template.

## Architectural consequence

No Review A/B/C reopening is required.

The primary evidence **supports and sharpens** P05:
- retain `ComparisonSchema` as package-specific;
- retain immutable supplier truth;
- retain many-to-many `BidLineMapping`;
- retain `EvaluationAdjustment` separate from supplier truth;
- retain immutable `ComparisonSnapshot`;
- add explicit coverage/equivalence semantics and hierarchical comparison basis;
- prohibit universal fixed comparison form as a structural assumption.

P1.2 may proceed to final reconciliation. FT-02/FT-06/FT-09/FT-10 remain separate primary-evidence questions and are not falsely closed by these comparison artifacts.
