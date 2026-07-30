# P1.5 — Long-Lead Tracking & Status Boundary v0.1

**Date:** 2026-07-30  
**Status:** P1.5 CANDIDATE / NOT FROZEN  
**ADRs:** ADR-0007, ADR-0013  
**Product code:** LOCKED

---

## 1. Purpose

Resolve two P1.5-owned structural truth questions before hostile external review:

- whether long-lead tracking needs an independent `TrackedItem` commercial/root object;
- which procurement dates/statuses are canonical events versus explicit planning inputs.

The boundary must preserve P10 as a bounded procurement planning/expediting overlay, not CPM/master scheduling and not a second transaction truth model.

---

# 2. Inherited evidence/constraint

P1.2 provisional operational coverage established:

- P10 = long-lead / procurement schedule / expediting projection;
- required/planned/forecast/confirmed/actual milestone dates overlay P01–P12;
- actual status derives from canonical domain events where possible;
- P10 must not become project scheduling software.

P1.5 must implement this distinction without duplicate truth.

---

# 3. ADR-0007 alternatives

## A — independent universal `TrackedItem`

Every long-lead concern gets a new durable tracked-item identity, potentially owning its own milestone/status chain across requirement, tender, award, commitment, submittal, shipment and receipt.

### Rejected

This duplicates the real transaction lineage and risks:

- a second status truth;
- fake object synchronization across sourcing/commitment/technical/shipment domains;
- generic project-scheduling gravity;
- hidden package/commitment duplication;
- independent lifecycle not justified by commercial authority.

## B — milestones only as local fields on existing objects

Each requirement/tender/commitment/etc stores its own dates directly.

### Rejected as complete answer

This avoids a new root but makes cross-phase milestone identity/history, forecasting and expediting relationships hard to preserve without duplicated date fields.

## C — thin `ProcurementMilestoneInstance` overlay anchored to canonical subject lineage

### Leading candidate

A long-lead milestone is a thin durable planning/observation identity only where independent date/history/expediting semantics are load-bearing.

Each milestone instance anchors to an existing canonical procurement subject/lineage, such as where applicable:

- PlannedRequirement;
- DemandLine / RequirementAllocation;
- ProcurementPackage;
- TenderEvent;
- AwardDecision;
- Commitment;
- EconomicComponentKey;
- P12 technical approval dependency;
- external shipment/logistics reference where authority remains external.

The anchor may change/advance through explicit lineage relationships, but the milestone does not become the owner of the underlying requirement, tender, commitment, approval, shipment or receipt truth.

The continuity of a long-lead commercial item is primarily the existing requirement → allocation → sourcing → award → commitment/component lineage, not a new universal `TrackedItem` root.

### Milestone semantics

Candidate milestone types/roles may include supported procurement stages such as:

- RFQ/tender target;
- award target;
- submittal required/approved target;
- manufacturing start/finish target;
- shipment target;
- delivery/receipt target;
- installation/other procurement-critical target where in scope.

The exact catalogue is configuration/profile work, not a generic scheduling ontology.

**ADR-0007 candidate direction:** thin milestone instances over existing canonical subject lineage; no independent universal tracked-item root.

---

# 4. Milestone date truth

For each milestone, keep semantically distinct as applicable:

- `REQUIRED` — governing required-by date from product or external authority;
- `PLANNED` — current internal plan/target;
- `FORECAST` — current predicted date;
- `CONFIRMED` — supplier/external-party confirmed expected date with source/provenance;
- `ACTUAL` — actual occurrence date derived from or bound to a canonical domain/external authoritative event.

These are different authority categories/facts and cannot be collapsed into one mutable `date`.

Where an external master schedule owns required dates, product may `REFERENCE/MIRROR` that date while owning the procurement relationship/forecast/exception fact.

---

# 5. ADR-0013 — status truth

## S01 — actual transactional status is event-derived

Where a canonical domain event answers whether something actually occurred, P10/reporting derives status/date from that event rather than storing an independently editable duplicate.

Examples:

- tender released;
- AwardDecision effective;
- Commitment effective;
- technical approval received where source authority captured;
- goods received;
- certification effective;
- retention released;
- commitment closed.

## S02 — planning state is explicit input

Planning facts legitimately remain human/external inputs where no domain event can determine them, including:

- required dates;
- planned dates;
- forecast dates;
- confirmed expected dates;
- expediting comments/reasons;
- risk/exception disposition;
- next-action ownership.

These are typed planning facts, not fake actual status.

## S03 — health is a derived/planning projection

`ON_TRACK / AT_RISK / LATE / BLOCKED` or equivalent health labels are projections from:

- required/planned/forecast/confirmed dates;
- canonical actual events;
- open dependency/exception facts;
- versioned health rule/profile.

A user may update the planning inputs/reason, but not directly rewrite a canonical actual event by changing health.

## S04 — confirmed does not mean actual

Supplier/external confirmation is source-attributed expectation/evidence.

It remains distinct from actual domain occurrence.

## S05 — manual correction of actuals targets source truth

If an actual status/date is wrong, correction targets the authoritative source event/reference through its governed correction path.

Do not add a manual `actual_status_override` that competes with canonical events.

A temporary reporting annotation may exist, but it cannot silently become transaction truth.

## S06 — derived status versioning

When status/health derivation rules evolve, rule/version identity is explicit where historical interpretation matters.

Existing domain event meaning does not change.

**ADR-0013 candidate direction:** hybrid model — actual transaction status event-derived; planning/required/forecast/confirmed values explicit typed inputs; status/health projections derive from both without an independently edited duplicate actual tracker.

---

# 6. Expediting lifecycle

A `ProcurementMilestoneInstance` may have a bounded planning lifecycle such as:

- planned/active;
- forecast updated;
- confirmed expected;
- actual achieved;
- superseded/cancelled/not-applicable;
- exception open/resolved.

This lifecycle describes the milestone planning/observation record, not the lifecycle of the underlying Tender/Commitment/etc.

Actual achievement binds the canonical source event/reference.

---

# 7. Cross-phase example

Long-lead equipment:

1. PlannedRequirement established.
2. Delivery-required milestone anchored to PlannedRequirement/RequirementAllocation lineage.
3. Tender target/award target milestones added as thin planning overlay.
4. AwardDecision actual derives from P06 event.
5. After PO-kind Commitment forms, future manufacturing/shipment/delivery milestones anchor to Commitment/EconomicComponent lineage while predecessor links preserve planning continuity.
6. Supplier confirms shipment forecast; confirmation remains sourced expectation.
7. GoodsReceipt actual derives from P07C event.
8. Long-lead health is projected from required/forecast/actual dates and open dependencies.

No independent `TrackedItem` needs to mirror Award/Commitment/Receipt state.

---

# 8. One-XL / Closed Sub-graph check

- milestone overlay has no commercial balance authority;
- actuals derive from canonical events;
- no CPM network/critical-path engine is introduced;
- A0–A3 can use sourcing milestones without P07;
- later P07 milestones attach when Commitment exists;
- P12 approval dates remain external-reference/dependency semantics.

**SECOND XL: CLEAN.**  
**A0–A3: CLEAN.**  
**Closed Sub-graph: CLEAN candidate.**

---

# 9. ADR candidate results

- **ADR-0007:** candidate resolved to milestone composition over existing canonical subject lineage; reject universal independent TrackedItem.
- **ADR-0013:** candidate resolved to hybrid derived/planned status: actual event-derived; planning inputs explicit; health/status projections derived/versioned.

No ADR status changes before external hostile review and final P1.5 reconciliation.
