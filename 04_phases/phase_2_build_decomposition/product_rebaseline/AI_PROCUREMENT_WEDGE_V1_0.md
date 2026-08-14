# CPOS AI Procurement Wedge v1.0

## Position

AI is not a decorative final block. The deterministic product model must be AI-ready from R01 onward, while AI authority remains bounded and reviewable.

## First production wedge — quotation extraction and leveling

Input:
- supplier PDF/Excel/email attachment;
- exact RFQ/Tender version and lines;
- supplier/revision identity;
- item/UOM/category references;
- original source document coordinates/locations.

AI output is a proposal containing:
- extracted supplier line/reference;
- proposed RFQ-line mapping;
- description/brand/model;
- quantity/UOM;
- unit rate/amount/currency;
- lead time;
- validity;
- payment terms;
- inclusions/exclusions/deviations;
- alternates/substitutes;
- source citation for every extracted value;
- confidence/ambiguity state.

Human confirmation/correction is required before proposed values enter deterministic structured capture or normalization.

## Forbidden silent actions

AI may not silently:
- modify supplier-origin truth;
- approve MR/RFQ/recommendation/award/order;
- create contractable price/terms without explicit confirmation;
- fabricate missing commercial facts;
- hide contrary evidence;
- issue/send a commercial document unless a separately authorized automation policy later permits it.

## Later wedges

- free-text MR normalization and item/UOM suggestions;
- RFQ/price-breakdown drafting from MR/specification documents;
- supplier shortlist/risk assistance using governed master/history;
- historical rate and price benchmarking;
- deviation/clarification drafting;
- recommendation briefing;
- PO/subcontract draft assistance;
- procurement schedule risk and exception explanation.

## Evaluation

Each AI capability requires a versioned evaluation dataset, extraction/mapping accuracy measures, citation correctness, uncertainty calibration and human-override tracking. Production activation is capability-specific and can be disabled without weakening deterministic workflows.

## Product differentiation target

CPOS should let a buyer take inconsistent real-world quotations and reach a transparent, source-cited, human-confirmed comparison materially faster than manual Excel work while retaining stronger provenance than a normal spreadsheet.