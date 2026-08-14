# CPOS Supplier Performance / Capacity / Exposure Intelligence Capability v1.1

**Status:** FREEZE-CANDIDATE / MEANING REVIEW

## User meaning

Supplier selection must consider more than current price and document compliance. CPOS makes company-wide vendor history, performance and current exposure visible **inside the procurement decision moment**, not as information hidden on a supplier master page.

## Deterministic facts

At minimum expose:
- open RFQs/tenders involving the supplier;
- active awards/LPOs/POs/subcontracts and committed value where available;
- current projects/packages and relevant trade/category;
- known planned/confirmed start and delivery periods;
- historical tenders invited/responded/no-bid/won;
- historical order/contract value;
- delivery/receipt timeliness where owned;
- open material performance issues/nonconformance/escalations where later supported;
- compliance/eligibility state from Supplier Master.

## Performance ratings

Configurable governed rating dimensions may include quality, commercial responsiveness, programme/delivery, documentation, safety/HSE, cooperation and overall assessment. Each rating records project, period/event, reviewer, score/scale, comments and evidence. Ratings are history-preserving and cannot be silently overwritten.

## Capacity / exposure indicators

CPOS may derive transparent indicators such as active project count, current committed value, tender workload and overlapping required-delivery windows. These are decision support, not unchallengeable truth. Any risk label must expose the contributing facts and rule/version.

## Mandatory decision placement

Supplier intelligence must render directly in all of these user contexts when facts exist:

1. **Supplier shortlist/search results** — compact current qualification/compliance + active-project/commitment/exposure summary with drill-down.
2. **RFQ bidder selection** — the buyer sees the supplier's relevant trade history, current workload/exposure and material warnings before adding the bidder.
3. **Bid comparison/leveling** — each supplier header/side panel exposes current exposure, performance and qualification/compliance context beside price/technical status; the buyer does not leave the comparison to discover it.
4. **Recommendation/approval** — the decision brief snapshots the supplier-intelligence facts actually relied upon and distinguishes current live facts from the historical snapshot used by the submitted recommendation.
5. **Supplier portfolio/profile** — full drill-down/history and source facts.

A price-focused screen that hides these facts until the buyer manually opens the supplier record does **not** satisfy this capability.

## Decision behavior

The system must not auto-block a supplier solely because of a heuristic performance/capacity score unless an explicit governed policy defines that control. Exposure/performance indicators remain explainable facts or bounded heuristics. Event-specific eligibility remains a separate governed evaluation.

## AI readiness

AI may summarize performance history, identify recurring issues and explain exposure patterns using structured facts and cited documents. It may recommend questions/clarifications but cannot silently downgrade eligibility or make an award decision.

## Field contract

Build-time field semantics are defined by `field_contracts/R02_SUPPLIER_FIELD_CONTRACTS_V1_0.md`, section H, and the common field contract.

## Acceptance

While shortlisting and later comparing three aluminium subcontractors, a buyer sees—without leaving those workflows—that the cheapest bidder has four active projects, overlapping delivery dates, two recent poor programme ratings and one open compliance item. The buyer can drill to the source facts, snapshots the relevant context into the recommendation, and the system never converts a heuristic into hidden eligibility policy.