# CPOS Procurement Workbench / Portfolio Schedule Capability v1.0

## Purpose

Provide the operational surface a procurement team actually works from every day. This is not a generic dashboard and must not expose backend ontology as primary navigation.

The core procurement schedule is created earlier with MR/package planning. R09 does **not** invent procurement dates after sourcing; it rolls up, analyzes and manages the schedule facts already carried by live procurement objects.

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

Actionable queues include MRs awaiting review/procurement; packages/milestones at risk; RFQs to issue; supplier responses overdue/missing; comparisons in progress; clarifications awaiting action; approvals pending; awards not yet converted; contracts/orders awaiting issue or execution; compliance documents expiring; and schedule milestones at risk.

Every card drills to the underlying object and explains why it needs action.

## Registers

Each major object has a serious register with readable business number, project, supplier, dates, value, status, owner/ball-in-court, age, risk, search/filter/sort, saved views, export and drill-down. Bulk actions are allowed only where domain rules permit them.

## Portfolio procurement schedule

Roll up the core schedule facts created earlier and show:
- required-on-site/required-by dates;
- baseline procurement milestones;
- current forecast milestones;
- supplier-confirmed dates;
- actual issue/response/award/order/execution/delivery milestones derived from canonical events;
- variance and slippage;
- cross-project/project/package risk;
- responsible owner/ball-in-court;
- configurable views by project, trade, buyer, status and date horizon.

Required, baseline, forecast, supplier-confirmed and actual dates remain distinct facts.

## Supplier intelligence in workbench

Supplier views may roll up compliance, current tender/commitment exposure, performance ratings and capacity indicators so procurement management can detect concentration/overexposure across projects.

## UX rules

- responsive by task;
- RTL/Arabic designed into components;
- accessible controls/keyboard flow;
- no UUIDs/internal schema names in ordinary views;
- business numbers everywhere;
- documents/attachments appear in business context;
- errors explain business conflict and next action.

## Acceptance

A procurement manager opens CPOS in the morning, understands what needs attention across projects without a spreadsheet, sees schedule variance generated from live procurement facts rather than manually maintained status columns, identifies a supplier overexposure or unsigned contract risk, and drills from any queue/risk item to the exact source MR/package/RFQ/comparison/order and its history.