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

For package/subcontract procurement, annexed scope binds to the exact frozen ProjectScopeInstance/issued tender basis and any approved negotiated changes. Contract formation may not silently substitute a different company-scope version.

## Formation lifecycle

`DRAFT -> REVIEW/APPROVAL -> READY_TO_ISSUE -> ISSUED -> EXECUTION_PENDING/ACKNOWLEDGED/ACTIVE -> SUPERSEDED/CANCELLED`

Award is not automatically effective commitment. Applicable approval/formation evidence must be satisfied before issue/effectiveness.

`ISSUED` does not itself mean `EXECUTED`. A linked Contract Execution / eSignature case governs delivery, acknowledgment/signature, reminders, execution evidence and final executed artifact according to document class.

## Numbering

Uses the governed document-class numbering policy. Revision/amendment does not silently reuse or mutate issued legal identity.

## Outputs

Professional branded LPO/PO/Subcontract PDF; annexures/attachments index; preview/download/manual-send; the exact issued artifact is the basis for acknowledgment/eSignature and any email/eSign provider integration.

## Execution relationship

LPO/PO may use simple acknowledgment/acceptance policy; subcontracts may require one or more formal signatories. Execution state is explicit and visible in registers. An unsigned draft or merely generated PDF cannot be represented as an executed contract.

## ERP coexistence

CPOS may send/mirror order data to external ERP and record external ID, accepted/rejected status and reconciliation. Accounting/GL/AP authority is not fabricated locally.

## Boundary to later P07

R08 owns formation, issued baseline, execution lifecycle and revision/amendment boundary. Deep variations, retention, advance recovery, claims, certification, recovery and final account remain later P07 work.

## Acceptance

A buyer converts an approved award into a numbered LPO/PO/Subcontract with supplier/project/lines/terms pre-populated, routes required approval, previews and issues a professional PDF, starts the correct acknowledgment/signature workflow on the exact artifact, sees execution status through completion, stores the executed artifact, and records ERP handoff without re-keying the commercial basis.