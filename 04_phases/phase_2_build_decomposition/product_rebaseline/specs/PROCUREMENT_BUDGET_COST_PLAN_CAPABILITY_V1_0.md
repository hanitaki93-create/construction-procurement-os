# CPOS Procurement Budget / Cost Plan Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Procurement decisions need a governed budget/cost context. CPOS must not display invented 'budget variance' from an undefined number or require replacement of an existing ERP/cost-management system.

## Authority model

Budget/cost-plan data is explicitly `OWN`, `MIRROR` or `REFERENCE` by implementation/integration configuration.

### ProcurementBudgetBasis
At minimum:
- project/legal entity;
- source system/file/reference and authority mode;
- cost/WBS/package/trade mapping;
- budget/allowance amount and currency;
- optional quantity/rate basis;
- baseline/version/effective date;
- contingency/allowance classification where supplied;
- source provenance and reconciliation state.

## Relationship to estimating handover

Estimating Handover may propose/seed a procurement allowance. The live ProcurementBudgetBasis records whether that allowance is accepted as CPOS-owned baseline, mirrored from another system, or kept as historical reference only.

## Downstream use

Budget/cost context may be shown in:
- MR distributions;
- Procurement Package planning;
- RFQ/package strategy;
- comparison/negotiation;
- recommendation and approval;
- award/order forecast/commitment views;
- procurement analytics.

Budget variance always identifies which budget basis/version it compares against. A new external budget revision does not rewrite the historical basis used by a prior approved recommendation.

## Controls

- exact currency/decimal semantics;
- explicit version/revision history;
- no double-editable budget when ERP/cost system is authoritative;
- import/reconciliation failures visible;
- mapping changes preserve prior decision provenance;
- permissions for budget visibility may be narrower than general procurement access.

## Acceptance

A project imports a cost-plan allowance from an external system, maps it to an Aluminium package, uses that exact budget version in comparison/recommendation, later receives a revised external budget and can show both the current budget and the historical budget basis against which the original award was approved.