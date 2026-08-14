# CPOS Framework / Blanket / Rate Agreement + Call-off Capability v1.0

**Status:** RETAINED ARCHITECTURE / POST-FIRST-SPINE IMPLEMENTATION

## User meaning

Some procurement is governed by an existing rate/blanket/framework agreement rather than a fresh competitive RFQ for every purchase. CPOS must preserve this commercial pattern without confusing the agreement itself with actual scope/quantity consumption.

## CommercialTermsAuthority

Represents the reusable commercial authority:
- supplier(s);
- legal entity/project/category applicability;
- effective/expiry dates;
- agreed item/rate/discount/terms schedule;
- currency/tax/payment/delivery terms;
- minimum/maximum amount or quantity obligations where contractually real;
- per-release limits where applicable;
- approval/execution evidence;
- status/version/amendment history.

## Call-off / release

A call-off/release creates an actual scope-consuming/order obligation from approved MR/package demand using the applicable agreement terms. It preserves:
- source MR/package scope;
- authority/agreement version;
- released quantity/value;
- remaining governed limits where applicable;
- release number/business identity;
- approval/order/receipt lineage.

## Core invariant

`CommercialTermsAuthority != scope consumption` unless the agreement itself contains a true minimum committed obligation. Rate agreement existence must not fabricate ordered quantity or committed project cost.

## Controls

- no release after expiry without governed exception;
- per-release and total caps enforced where configured by the actual agreement;
- cumulative released quantity/value computed from immutable releases/corrections;
- agreement revisions do not rewrite historical releases;
- direct-release route still honors MR/authority/approval policy.

## Implementation posture

Architecture V2 retains this capability because Phase-1 competitor inheritance and construction purchasing practice support it. It is not required to block the first MR->RFQ->award->order commercial spine unless a pilot/customer proves blanket purchasing is first-release critical.

## Acceptance

A contractor has an annual concrete supply agreement with fixed rates and an expiry date. Project MRs can create numbered releases against the current agreement without a new RFQ, the system prevents use after expiry or above a true cap, and prior releases remain bound to the exact agreement version/rate that governed them.