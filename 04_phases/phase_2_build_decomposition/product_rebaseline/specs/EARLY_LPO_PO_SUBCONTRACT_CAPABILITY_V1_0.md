# CPOS Early LPO / PO / Subcontract Formation Capability v1.0

## Purpose

Create a real commercial order/contract instrument immediately after approved award without waiting for the later deep P07 administration engine.

## Header

- immutable commitment-preparation ID and governed business number;
- document type: LPO / PO / SUBCONTRACT;
- legal entity/project/authority context;
- supplier/subcontractor and contact;
- award/comparison lineage;
- issue date/effective-date basis;
- currency/tax basis;
- payment terms;
- delivery/commencement/completion terms;
- ship-to/site location;
- warranty/guarantee/security summary where applicable;
- standard/special terms;
- status, approval and signatory state;
- external ERP/contract reference where applicable.

## Lines / SOV

Lines are carried from the approved supplier-confirmed/award basis without re-keying. Each preserves source RFQ/MR/package and supplier-quotation lineage. Support item/material lines and subcontract/SOV structures with quantity/UOM/rate/amount or lump-sum components as appropriate.

## Lifecycle

`DRAFT -> REVIEW/APPROVAL -> READY_TO_ISSUE -> ISSUED -> ACKNOWLEDGED/ACTIVE -> SUPERSEDED/CANCELLED`

Award is not automatically effective commitment. Applicable approval/formation evidence must be satisfied before issue/effectiveness.

## Numbering

Uses the governed document-class numbering policy. Revision/amendment does not silently reuse or mutate issued legal identity.

## Outputs

Professional branded LPO/PO/Subcontract PDF; annexures/attachments index; preview/download/manual-send; later e-sign/email connectors use the exact issued artifact.

## ERP coexistence

CPOS may send/mirror order data to external ERP and record external ID, accepted/rejected status and reconciliation. Accounting/GL/AP authority is not fabricated locally.

## Boundary to later P07

R08 owns formation, issued baseline and revision/amendment boundary. Deep variations, retention, advance recovery, claims, certification, recovery and final account remain later P07 work.

## Acceptance

A buyer converts an approved award into a numbered LPO/PO/Subcontract with supplier/project/lines/terms pre-populated, routes required approval, previews and issues a professional PDF, downloads/sends the exact artifact and records ERP handoff without re-keying the commercial basis.