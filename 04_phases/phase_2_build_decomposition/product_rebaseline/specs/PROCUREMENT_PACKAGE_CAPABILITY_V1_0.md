# CPOS Procurement Package Capability v1.0

## User meaning

A Procurement Package is an optional planning/grouping object for complex or trade-based procurement. It is not required for every purchase and does not replace the fast MR/direct-material path.

## Header

- immutable ID and governed package code/number;
- project/legal entity/authority context;
- display name/title;
- trade/category and package type;
- responsible buyer/owner;
- required-on-site / award target dates;
- budget/cost/WBS context where available;
- procurement strategy/route;
- lifecycle/status;
- scope summary and notes;
- attachments/specifications/drawings.

## Scope membership

A package groups approved MR/requirement scope or other authorized package scope. Membership preserves exact source identity, quantity/UOM or scope-partition basis and cost attribution. Adding/removing/reallocating scope is governed and history-preserving.

A package must not fabricate authority over scope merely because a buyer groups it for tendering.

## Lifecycle

`PLANNED -> PREPARING -> READY_FOR_SOURCING -> SOURCING -> AWARD_PENDING -> AWARDED/ORDERED -> COMPLETE/CANCELLED`

Actual state should derive from linked transaction events where possible rather than manual status duplication.

## Sourcing relationship

One package may create one or more RFQ/Tender events, and one RFQ may source selected package scope. Package and Tender remain distinct: package is planning/grouping; tender is the issued market event.

## Schedule / register

Package register shows code, project, trade/category, owner, required date, planned/actual RFQ/award/order milestones, scope/budget context, current sourcing state and risk/overdue indicators.

## Acceptance

A buyer groups multiple approved MR lines and scope documents into an aluminum package, tracks its procurement milestones, tenders only selected package scope, later sources a residual line separately, and can prove exactly which authorized scope each tender/order consumed.