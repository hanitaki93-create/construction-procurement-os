# S01 — Requisition UI evidence lock

Status: BUILDING / REVIEW REQUIRED
Scope: ERP shell + Material/Purchase Requisition register + MR document workspace only.

## Rule

This slice is reverse-engineered from proven procurement/ERP patterns. It does not authorize invention of downstream PO/LPO/subcontract UX. Later slices inherit this interaction grammar unless evidence justifies an explicit shared-pattern revision.

## Evidence used immediately before build

### FirstBit — user-provided live ERP screenshots
Observed patterns:
- permanent module navigation;
- dense registers with toolbar actions and filter row;
- many business records visible at once;
- open business documents retain context as top tabs;
- document header + line grid + action toolbar;
- related operational/financial views live around the document rather than on disconnected dashboards.

### Kojo — construction material requisitions
Observed patterns:
- requisition is a job/project demand object, not a generic form;
- requester, job/delivery need date and material lines dominate the document;
- digital requisitions continue directly into RFQ/PO processing;
- office and field both need status visibility.

### Oracle Procurement — requisition life cycle
Observed patterns:
- requisition and requisition-line lifecycle are first-class views;
- downstream negotiations/orders/shipments/receipts/invoices are grouped around originating requisition demand;
- related records support drill-down rather than duplicating data in disconnected pages.

### SAP Ariba — procurement navigation/approvals
Observed patterns:
- procurement documents are searchable actionable objects;
- approvals are globally discoverable but remain associated with the source business document;
- document type/status are central navigation concepts.

### Archdesk / ProcurePro — construction procurement control
Observed patterns:
- procurement stays tied to project context;
- operational visibility and milestones are part of everyday work, not a month-end report;
- construction procurement needs dense commercial information, not large SaaS marketing-style cards.

## S01 interaction grammar now locked for review

1. Compact permanent shell; operational space takes priority over explanatory copy.
2. Project scope is always visible and switchable.
3. Registers are dense, searchable, filterable, keyboard-openable tables.
4. Business documents open as workspaces rather than replacing the mental model with an unrelated screen.
5. Document identity/status/actions are persistent at the top.
6. Document metadata is summarized in a compact strip.
7. Detail is organized by tabs; tabs expose real data/actions only.
8. MR lines are a grid, with requested quantity, approved quantity, route and state visible together.
9. Approval/routing stays attached to the MR document.
10. Lifecycle is derived from actual governed state and route decisions; no invented downstream records.
11. Print/PDF is a functional document action and has a dedicated print layout.
12. Existing backend invariants remain authoritative; UI does not simulate impossible transitions.

## Explicitly out of scope for S01

- RFQ layout redesign;
- supplier 360 redesign;
- bid leveling redesign;
- recommendation/award redesign;
- PO/LPO/subcontract design;
- report centre;
- global cross-document search;
- invented downstream relationship records that the API cannot yet prove.

## Review gate

Do not propagate this grammar to the next slice until the live S01 preview is used and judged against:
- navigation comfort;
- information density;
- perceived relationship clarity;
- speed of locating/opening a requisition;
- clarity of MR status, lines, decisions and routing;
- whether the product still feels like disconnected AI-generated windows.
