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
- applicable ProcurementRouteDecision/policy version;
- lifecycle/status;
- scope summary and notes;
- attachments/specifications/drawings;
- optional Estimating Handover basis reference;
- optional company Scope Library template/version reference.

## Scope membership

A package groups approved MR/requirement scope or other authorized package scope. Membership preserves exact source identity, quantity/UOM or scope-partition basis and cost attribution. Adding/removing/reallocating scope is governed and history-preserving.

A package must not fabricate authority over scope merely because a buyer groups it for tendering.

For package-based/subcontract procurement, the package may instantiate an approved Scope of Works template. Project tailoring is a governed ProjectScopeInstance whose deviations from the company standard remain visible and whose frozen version becomes part of the RFQ/contract basis.

## Estimating handover

A newly awarded project may seed package budget allowance, pre-award vendors/quotes, programme assumptions, notes, risks and opportunities from an Estimating Handover. These remain historical/source context; the delivery team can revise procurement strategy without rewriting the estimating basis.

## Procurement route / competition policy

Package strategy is evaluated against the governed ProcurementRoutePolicyVersion. The package records whether competitive tender, sole/single source, direct award, later framework use or another bounded route is permitted/required and what evidence/approvals apply. A manually typed 'strategy' cannot bypass the route decision.

## Procurement schedule core

Each material package owns a procurement plan from creation, not from a later dashboard block. At minimum track required-on-site and baseline/forecast milestones for RFQ issue, tender return, recommendation, approval, award/order and supplier delivery/start. Actual milestones populate from linked transactions; supplier-confirmed dates remain distinct from buyer forecasts.

## Lifecycle

`PLANNED -> PREPARING -> READY_FOR_SOURCING -> SOURCING -> AWARD_PENDING -> AWARDED/ORDERED -> COMPLETE/CANCELLED`

Actual state should derive from linked transaction events where possible rather than manual status duplication.

## Sourcing relationship

One package may create one or more RFQ/Tender events, and one RFQ may source selected package scope. Package and Tender remain distinct: package is planning/grouping; tender is the issued market event.

## Schedule / register

Package register shows code, project, trade/category, owner, required date, route/policy state, baseline/forecast/actual RFQ/award/order milestones, supplier-confirmed delivery where known, scope/budget context, current sourcing state and risk/overdue indicators.

## Acceptance

A buyer receives an aluminium package from estimating handover, seeds its allowance and known bidders, instantiates the approved Aluminium & Glazing scope template, tailors project requirements, groups approved MR/scope into the package, obtains the governed competitive-tender route decision, baselines its procurement milestones, tenders selected package scope, later sources a residual line separately, and can prove exactly which authorized scope/template/handover/policy basis each tender/order consumed.