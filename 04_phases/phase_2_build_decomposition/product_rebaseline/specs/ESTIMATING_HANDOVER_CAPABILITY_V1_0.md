# CPOS Estimating / Pre-award Handover Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

When a project is won, procurement should inherit the commercial and supplier intelligence created during estimating instead of starting from an empty project and hunting through folders.

## Core objects

### EstimatingHandover
- project/legal entity;
- source estimate/tender reference;
- source-system/file references;
- handover owner and date;
- overall status and review state;
- imported source package preserved.

### EstimatingPackageBasis
For each trade/package:
- trade/category/package mapping;
- estimated/budget allowance and currency;
- quantity/SOV/BOQ basis where available;
- assumed procurement route;
- target programme/required-on-site context;
- estimator notes and assumptions;
- identified risks/opportunities;
- preferred/considered vendors;
- tender-stage quotes and quote dates;
- exclusions/qualifications known at estimate time;
- confidence/source provenance.

### EstimatingVendorParticipation
Records which supplier/subcontractor priced or supported the pre-award tender, what they priced, quote/source reference and contextual notes. It does not create downstream eligibility or award rights automatically.

## Import modes

- structured import from estimating/ERP/preconstruction systems;
- spreadsheet import;
- preserved handover pack upload;
- controlled manual capture;
- later AI-assisted extraction from PDFs/spreadsheets with exact source citations and human confirmation.

## Journey

Approved estimating-package basis may seed:
- Procurement Package;
- procurement schedule baseline;
- budget/cost context;
- supplier shortlist suggestions;
- historical quote/reference comparison.

Delivery procurement may change the sourcing strategy, vendors or commercial basis, but the estimating source remains immutable historical context.

## User surfaces

- project handover overview;
- package-by-package estimating basis;
- vendors who priced during tender;
- assumptions/risks/opportunities;
- source files and citations;
- accepted/rejected mappings into procurement packages;
- differences between estimating basis and live procurement outcome.

## AI readiness

AI may classify handover documents, identify vendors/trades, extract allowances/quotes/risks and propose mappings. All extracted facts require confidence/source citation and human confirmation before becoming structured procurement context.

## Acceptance

A newly awarded project imports an estimating handover pack, maps Aluminium, HVAC and Firefighting into procurement packages, retains the original tender-stage vendors and quotations, carries the package allowance and key risks into procurement planning, and later shows where live procurement differed from the estimating basis without rewriting the original handover.