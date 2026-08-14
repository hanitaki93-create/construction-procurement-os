# CPOS Master / Reference Data Capability v0.1

**Status:** DRAFT / R00 MEANING REVIEW REQUIRED

## Purpose

Provide the controlled reference layer required for MR, RFQ, comparison, PO/LPO and AI normalization without forcing every procurement transaction to be catalogue-led.

## Item / Material / Service / Scope Master

Minimum fields:
- immutable ID and governed business code;
- active/inactive lifecycle;
- type: MATERIAL / SERVICE / SUBCONTRACT_SCOPE / EQUIPMENT / OTHER;
- short description and long specification;
- default UOM;
- category/trade;
- manufacturer/brand/model where applicable;
- approved-equivalent/substitution policy;
- optional manufacturer part number and internal SKU;
- tax/category defaults where justified;
- attachment/specification references;
- optional preferred supplier or supplier cross-reference;
- search aliases/keywords.

Users may create legitimate free-form MR/RFQ lines where no master item exists. Free-form is an explicit line mode, not a fake master record.

## UOM Registry

Controlled keys and display symbols such as EA, PCS, SET, M, M2, M3, KG, TON, L, LS, DAY and MONTH. Each UOM declares dimension/family, precision/rounding and conversion rules where safe. Conversion is never inferred across incompatible families.

## Category / Trade Taxonomy

Versioned category/trade hierarchy used for supplier classification, sourcing filters and analytics. It must not force every transaction into a single universal package taxonomy.

## Cost / WBS Reference

CPOS can OWN, MIRROR or REFERENCE project cost codes/WBS. MR distributions bind to a current valid reference. Downstream documents preserve the attribution lineage even if the external ERP remains authoritative.

## Other required references

- currency;
- tax treatment/rates where owned;
- payment-term templates;
- delivery/ship-to locations;
- incoterm/delivery-term reference where used;
- standard commercial term blocks;
- language/locale;
- supplier document/compliance type registry.

## User surfaces

Real maintenance/search screens are required for permitted master data, including import/export, active/inactive state, duplicate detection and audit history. Ordinary users select reference values from searchable controls instead of typing opaque keys.

## AI readiness

AI extraction may propose item/UOM/category matches but must preserve original supplier/request text, show confidence, and require confirmation for ambiguous normalization.

## Acceptance

A buyer can raise an MR containing both catalogue and free-form lines, select real UOMs, use cost references, carry those lines into RFQ and PO/LPO without retyping, and still trace every normalized value back to the original wording.