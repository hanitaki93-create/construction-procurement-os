# CPOS Procurement Workbench / Schedule Capability v1.0

## Purpose

Provide the operational surface a procurement team actually works from every day. This is not a generic dashboard and must not expose backend ontology as primary navigation.

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

Actionable queues include MRs awaiting review/procurement; RFQs to issue; supplier responses overdue/missing; comparisons in progress; clarifications awaiting action; approvals pending; awards not yet converted; orders awaiting issue/acknowledgment; compliance documents expiring; schedule milestones at risk.

Every card drills to the underlying object and explains why it needs action.

## Registers

Each major object has a serious register with readable business number, project, supplier, dates, value, status, owner/ball-in-court, age, risk, search/filter/sort, saved views, export and drill-down. Bulk actions are allowed only where domain rules permit them.

## Procurement schedule

Track required-on-site date; planned RFQ; planned response; comparison/recommendation target; approval target; award/order target; supplier-confirmed lead/delivery; and actual issue/response/award/order milestones derived from canonical events. Required, baseline, forecast and supplier-confirmed dates remain distinct facts.

## UX rules

- responsive by task;
- RTL/Arabic designed into components;
- accessible controls/keyboard flow;
- no UUIDs/internal schema names in ordinary views;
- business numbers everywhere;
- documents/attachments appear in business context;
- errors explain business conflict and next action.

## Acceptance

A procurement manager opens CPOS in the morning, understands what needs attention across projects without a spreadsheet, and drills from a queue/risk item to the exact MR/RFQ/comparison/order with its source documents and history.