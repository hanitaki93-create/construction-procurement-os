# P1.2 — Artifact Eligibility Control v0.1

**Status:** ACTIVE  
**Purpose:** Prevent assistant-generated or reconstructed documents from being counted as primary contractor artifacts.

## Rule

An artifact may satisfy a P1.2 primary-artifact gate only when its provenance shows it existed in the contractor/supplier operating process independently of this research reconstruction.

Eligible examples:
- original contractor procurement tracker;
- original MR/requisition;
- original RFQ/tender pack;
- original supplier quotation/revision;
- original contractor comparison/levelling sheet;
- original DOA/approval record;
- original PO/subcontract;
- original delivery/GRN/claim/certificate/change record.

Not eligible as primary evidence:
- an assistant-generated comparison or summary built from source documents;
- a reconstruction created specifically for P1.2;
- a normalized table whose original operational form is unavailable;
- architecture/spec documents describing how the process should work.

Derived artifacts may still be used as analysis aids if clearly labelled and linked to their primary sources.

## Eligibility decisions

### ART-CAND-001 — Wires and cables comparison sheet

Files observed in the user library include:
- `Wires and cables comparision sheet (1).pdf`
- `wire_cable_price_comparison_sheet.pdf`

**Decision:** `DERIVED / NOT PRIMARY / DOES NOT SATISFY BID-LEVELING GATE`.

Reason:
- prior conversation provenance shows the comparison was generated in-chat from Coral Star quotation rates, Salma quotation rates and project/MR quantities;
- it is therefore evidence of a useful reconstructed comparison method, not evidence of the contractor's pre-existing operating comparison artifact.

It may be used later to test `PRC-15` normalization mechanics, but it contributes **0** toward the requirement for a real contractor bid-leveling artifact.

### ART-PRIMARY-001 — Perflex PO 00PO26-00000108

**Decision:** `PRIMARY TRANSACTION ARTIFACT / ELIGIBLE`.

It supports issued commitment structure and quotation-reference linkage. It does not prove the upstream approval workflow by itself.

### ART-PRIMARY-002 — Supplier quotation(s) addressed to Perflex

**Decision:** `PRIMARY SUPPLIER TRANSACTION ARTIFACT / ELIGIBLE`.

They support supplier-origin commercial evidence, pricing/scope/payment-term fields and revision references where present. They do not by themselves satisfy the contractor bid-leveling artifact requirement.

## Gate consequence

Current count of verified real contractor bid-leveling artifacts satisfying the P1.2 gate:

**0**

P1.2 must not mark the bid-leveling gate PASS until an original contractor comparison/levelling artifact is obtained and decomposed.
