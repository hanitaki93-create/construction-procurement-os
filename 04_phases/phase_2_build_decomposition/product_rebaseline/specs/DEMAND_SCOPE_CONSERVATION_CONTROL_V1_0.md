# CPOS Demand / Scope Conservation Control v1.0

**Status:** DRAFT / LOAD-BEARING CONTROL REVIEW REQUIRED

## Purpose

Preserve the strongest part of the rejected B05 design without exposing its ontology as the user's primary workflow: approved demand/scope must remain traceable and cannot be silently over-committed, lost or duplicated as it is grouped, tendered, split-awarded, directly ordered, cancelled or re-sourced.

## User-visible positions

For quantitative MR lines, users may see understandable positions such as:
- requested;
- approved;
- planned/assigned to package or route;
- ordered/committed;
- received/fulfilled;
- remaining available.

Internal representation may use allocations/partitions/reservations but must not require the user to operate a generic allocation ontology.

## Core rules

1. **Authority:** commitment/order scope must trace to approved demand/package authority or an explicit governed amendment/exception.
2. **No double commitment:** cumulative effective commitment quantity/value/scope partition cannot exceed the authorized basis except through a governed amendment.
3. **Tendering is not consumption:** the same authorized scope may be invited to multiple competing bidders/RFQs as part of one sourcing route; issuing invitations does not consume demand.
4. **Award/commitment consumes:** split awards/direct orders/call-offs consume the applicable approved scope when they cross the governed commitment point.
5. **Partial routes:** an approved line may be split between direct order, package sourcing or multiple legitimate commitments when policy and quantities permit.
6. **Cancellation/reversal:** cancelled/voided commitments release or reverse consumption according to domain semantics without deleting history.
7. **Retender/residual:** residual or failed sourcing can be re-tendered without fabricating additional demand; prior sourcing history remains linked.
8. **UOM/currency:** quantity conservation uses authoritative UOM/conversion rules; monetary authorization uses explicit currency/budget semantics rather than approximate conversions.
9. **Concurrency:** competing award/order transactions must not both observe the same remaining authority and over-consume it. A declared guard/lock/serializable mechanism is required.

## Package semantics

Procurement Package membership is planning/grouping and preserves source partitions. A package does not itself create consumption or commitment. Moving/reallocating package scope keeps history and cannot create new authorized quantity.

## Relationship to rejected B05

The old RequirementAllocation/conservation mechanism may be salvaged if hostile review proves its semantics fit this V2 control. Salvage is implementation reuse only; V2 user language remains MR/Package/remaining quantity/scope.

## Acceptance

An MR approves 100 units. Procurement tenders all 100 units to three suppliers, then awards 60 to Supplier A and 40 to Supplier B. A concurrent attempt to issue another 20-unit PO is rejected unless demand is formally amended. If the 40-unit award is cancelled before effective replacement, the system preserves the cancelled history and correctly exposes the releasable/residual authority for re-sourcing.