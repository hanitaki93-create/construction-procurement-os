# CPOS Procurement Policy / Route Governance Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

A buyer must know which procurement route is permitted for a request/package and what evidence/competition/approval is required. Rules cannot live only in tribal knowledge or be invented by each implementation.

## Policy model

### ProcurementRoutePolicyVersion
Product-owned policy structure with bounded tenant configuration for criteria such as:
- legal entity / project / business unit where applicable;
- procurement category/trade;
- material/service/subcontract type;
- estimated/budget value bands and currency basis;
- emergency/critical/sole-source conditions;
- preferred/framework/direct-order availability;
- minimum competitive quotation/tender requirements;
- required justification/evidence;
- required approval/DOA gate class;
- allowed sourcing route(s);
- effective dates and version.

## Supported route outcomes

At minimum the architecture admits:
- competitive RFQ/tender;
- direct LPO/PO within governed authority;
- sole-source/single-source with justification and approval;
- framework/rate-agreement call-off where later enabled;
- external/ERP/stock disposition where configured;
- no-purchase/reject/return-to-requester.

The product does not assume every purchase needs three quotations or that one threshold policy fits every customer/jurisdiction.

## Evaluation

A ProcurementRouteDecision records:
- source MR/package/demand basis;
- estimated/budget context/version used;
- applicable policy version;
- evaluated route options/requirements;
- chosen route;
- exception/override reason and authority where applicable;
- decision time/actor.

A route decision never creates supplier award or commitment truth.

## Integration

- MR/package surfaces show permitted/required route and missing prerequisites;
- RFQ formation can prove why competition was required;
- direct-order flow proves why tender was not required;
- sole-source/non-competitive recommendation carries the route-policy justification into approval;
- framework call-off validates agreement applicability;
- workbench exposes policy exceptions requiring action.

## Controls

No arbitrary tenant-authored code/expression language in V2. Policy configuration uses bounded typed criteria/operators and versioned product semantics. Historical transactions preserve the exact policy version/decision relied upon.

## Acceptance

A low-value routine material MR is allowed to proceed to direct PO under company policy; a higher-value subcontract package requires competitive tender; an emergency sole-source purchase requires explicit justification and higher approval; and an auditor can reproduce the exact policy/version and exception evidence behind each route.