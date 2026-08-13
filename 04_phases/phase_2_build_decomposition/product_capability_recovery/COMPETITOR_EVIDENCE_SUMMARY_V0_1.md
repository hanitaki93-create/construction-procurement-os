# Competitor Evidence Summary v0.1

**Date:** 2026-08-13
**Status:** EXTERNAL-EVIDENCE INPUT

## Systems reviewed

Current public official documentation/training was reviewed for Oracle Fusion Procurement, SAP Ariba, Coupa, Trimble Vista, CMiC, Procore Bid Management, Kojo and ProcurePro.

## Convergent end-to-end floor

The serious-system floor is consistently recognizable as:

`Requisition / demand -> lines + project/cost attribution -> direct-buy or sourcing route -> RFQ/tender -> invited suppliers -> responses/revisions -> evaluation/leveling -> approval/award -> PO/contract -> receipt/handoff`

with supplier master, item/UOM/reference data, numbering, attachments/documents, lifecycle/status and operational registers surrounding the flow.

## Evidence-derived findings

### Oracle Fusion Procurement
- requisitions have line and distribution structures; distributions hold project/accounting context;
- buyers can process requisition lines into purchasing documents;
- supplier registration captures organization, contacts, addresses, tax identifiers, classifications, products/services, questionnaires and attachments;
- prospective sourcing suppliers are distinct from suppliers authorized for ordering.

### SAP Ariba
- sourcing can originate from requisitions and propagate line content into sourcing projects/events;
- events contain items/lots, terms, participants, attachments, timing, responses, scenarios and awards;
- sourcing relationships are distinct from fulfillment/trading relationships.

### Coupa
- sourcing events contain items/lots, forms/questionnaires and attachments;
- suppliers can access events from email and may use OTP without a persistent account;
- requisition data exposes header, line and allocation/split levels;
- approved requisitions can produce POs sent by multiple channels.

### Trimble Vista
- requisitions have automatic numbers, vendor/material/UOM/delivery/reviewer data and explicit Quote/Purchase/Stock routes;
- quote-route requisition lines initialize into vendor quotes;
- the system prints quote forms for suppliers;
- approved quote/requisition lines initialize into POs.

### CMiC
- PO numbering can be automatic/manual and use configurable masks;
- requisitions convert to POs;
- stock, non-stock and free-form purchasing coexist;
- receipt and invoice matching exist downstream.

### Procore
- bid packages/forms lead to invitations, received bids and bid leveling;
- leveled bids can convert directly into Purchase Orders or Subcontracts;
- soft award remains distinct from commitment creation;
- vendor history is surfaced during bid evaluation.

### Kojo
- job BOM/material planning supports field-friendly requisitioning;
- planned/master-backed materials coexist with practical project procurement workflows.

### ProcurePro
- construction procurement is treated as an execution layer spanning procurement schedule, tenders, structured price breakdowns, comparison/recommendation, approvals, contract creation, vendor management and analytics;
- vendor records accumulate tender/contract context and compliance expiry;
- AI is applied to quote leveling, historical pricing and estimating handover rather than replacing deterministic procurement truth.

## Implication for CPOS

CPOS should differentiate above this floor, not fall below it.

Target differentiation:
- construction-specific MR/package intake;
- low-friction supplier participation;
- source-preserving quote ingestion/revision history;
- AI-assisted extraction and normalization with citations;
- scope-gap/inclusion/exclusion intelligence;
- live procurement schedule/long-lead risk;
- cross-project supplier compliance/performance/capacity context;
- transparent recommendation/approval evidence;
- rapid award-to-LPO/PO/subcontract formation;
- immutable provenance;
- clean ERP/accounting coexistence.

## Current CPOS translation defects confirmed by comparison

1. MR/PR was collapsed into backend requirement/allocation vocabulary.
2. supplier master/compliance is below the original Phase-1 floor.
3. item/UOM/reference data is not yet a real product layer.
4. display numbering lacks a governed allocation policy.
5. document rendering/templates were not specified strongly enough.
6. RFQ formation does not yet behave as a propagation of authorized demand lines.
7. real internal product UX was sequenced too late.
8. simple PO/LPO formation was sequenced behind the much larger commercial-administration block.
9. procurement schedule/register visibility was sequenced too late.
10. AI prerequisites were not treated as immediate data-model requirements.
