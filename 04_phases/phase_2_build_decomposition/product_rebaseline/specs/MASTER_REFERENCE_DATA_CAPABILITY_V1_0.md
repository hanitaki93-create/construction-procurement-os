# CPOS Master / Reference Data Capability v1.0

## Purpose

Provide controlled reference data required for MR, RFQ, comparison, LPO/PO and AI normalization without forcing every construction purchase to be catalogue-led.

## Item / Material / Service / Scope Master

Minimum fields:
- immutable ID and governed business code;
- active/inactive lifecycle;
- type: MATERIAL / SERVICE / SUBCONTRACT_SCOPE / EQUIPMENT / OTHER;
- short description and detailed specification;
- default UOM;
- category/trade;
- manufacturer/brand/model where relevant;
- approved-equivalent/substitution policy;
- manufacturer part number/internal SKU where used;
- attachments/specification references;
- searchable aliases/keywords;
- optional supplier cross-references.

Free-form MR/RFQ lines remain legal through an explicit FREE_FORM mode; users must not create fake master items for one-off construction scope.

## UOM Registry

Controlled keys/symbols such as EA, PCS, SET, M, M2, M3, KG, TON, L, LS, DAY, MONTH. Every UOM declares dimension/family, display precision, rounding and safe conversion rules. Cross-family conversion is prohibited.

## Category / Trade Taxonomy

Versioned hierarchy for supplier classification, sourcing filters and analytics. It cannot become a universal package root.

## Cost / WBS Reference

CPOS may OWN, MIRROR or REFERENCE project cost/WBS structures. MR distributions bind to a valid reference and preserve attribution downstream.

## Other required references

Currency; tax treatment/rates where owned; payment-term templates; delivery/ship-to locations; standard commercial term blocks; language/locale; supplier compliance document types.

## User surfaces

Authorized users get real searchable maintenance/import/export screens, duplicate controls, active/inactive state and audit history. Ordinary transaction users select readable values, not opaque keys.

## AI readiness

AI may propose item/UOM/category matches but must preserve original text, confidence and ambiguity; human confirmation is required before normalized values become deterministic truth.

## Acceptance

A buyer raises an MR with both catalogue and free-form lines, selects real UOMs and cost references, carries them through RFQ and order without retyping, and can trace normalized values back to source wording.