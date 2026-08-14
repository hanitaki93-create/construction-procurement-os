# CPOS Procurement Workbench / Schedule Capability v0.1

**Status:** DRAFT / R00 MEANING REVIEW REQUIRED

## Purpose

Provide the operational surface a procurement team actually works from every day. The workbench is not a generic dashboard and must not expose backend ontology as primary navigation.

## Primary navigation

- Home / My Work
- Material Requisitions
- Packages / Procurement Plan
- RFQs / Tenders
- Supplier Responses
- Comparisons
- Recommendations / Approvals
- Awards
- LPOs / POs / Subcontracts
- Suppliers
- Receipts / GRNs where enabled
- Documents
- Reports / Search
- Administration / Reference Data for authorized users

## My Work

Shows actionable queues rather than vanity metrics:
- MRs awaiting procurement/review;
- RFQs to issue;
- supplier responses overdue/missing;
- comparisons in progress;
- clarifications awaiting response;
- approvals pending by user/team;
- awards not yet converted;
- orders awaiting issue/acknowledgment;
- compliance documents expiring;
- schedule milestones at risk.

Every card drills to the underlying object and explains why it needs action.

## Registers

Each major object has a serious register with configurable but bounded columns, saved filters, search, sort, status, project, supplier, dates, values, owner/ball-in-court, age and export. Registers support bulk non-destructive actions only where the domain permits them.

## Procurement schedule

Track at minimum:
- package/MR/RFQ/order identity;
- required-on-site date;
- planned RFQ date;
- planned response date;
- comparison/recommendation target;
- approval target;
- award/order target;
- supplier-confirmed lead/delivery date;
- actual issue/response/award/order milestones derived from domain events;
- forecast dates with visible formula/source;
- status and lateness/risk.

Required, baseline, forecast and supplier-confirmed dates are distinct facts.

## Product UX rules

- responsive desktop/tablet/mobile disposition by task;
- RTL/Arabic support planned into components, not retrofitted at the end;
- accessible controls and keyboard flow;
- no UUIDs or internal schema names in ordinary views;
- human-readable business numbers everywhere;
- documents and attachments appear in business context;
- errors explain the business conflict and next action.

## Acceptance

A procurement manager can open CPOS in the morning and know what must be acted on across projects without opening spreadsheets, then drill from a risk/queue item to the exact MR/RFQ/comparison/order and its source documents/history.