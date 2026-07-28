# P1.1-B — Structural Wedge Hypotheses v0.3

**Status:** PROVISIONAL / NOT FROZEN  
**Supersedes:** `P1_1_WEDGE_HYPOTHESES_V0_2.md` for current P1.1 reasoning.

A wedge is valid here only when it states a structural operating claim that P1.2 can falsify from observed workflow/truth ownership. It is not a sales or product-market-fit claim.

## WEDGE-01 — Closed Procurement Control Graph

**Structural hypothesis**

For an in-scope procurement demand, one deterministic graph can preserve and explain the full control position:

`budget/cost context → demand {MR | package} → vendor eligibility → tender → bid/revision → comparison → governed award → commitment → change → valuation/progress → current commercial position`

without requiring a separate spreadsheet/status ledger to explain transaction state or the current procurement-to-commercial position.

The graph may reference externally authoritative budget/accounting values through explicit interfaces; it need not own the GL/AP/payment system.

**What P1.2 must falsify/test**
- whether observed procurement cases can enter and progress through one shared graph without project-specific ontology invention;
- whether MR-led and package-led demand are both required first-class entry patterns;
- whether budget/cost context is available early enough to anchor the retained commercial position;
- whether comparison/award/commitment/valuation can close without a separate parallel tracker that contains unique truth;
- which apparent status fields are derivable from events versus legitimate human planning inputs.

**Failure condition**

WEDGE-01 fails or must be structurally revised if representative workflows require unique authoritative states/relationships outside this graph that cannot be represented as explicit extensions or interfaces.

## WEDGE-02 — Commercial Commitment Truth

**Structural hypothesis**

Approved award, cost attribution, issued commitment, controlled changes, valuation/progress events, and retention/advance/recoupment positions can form one coherent commercial truth layer while accounting ownership remains an explicit boundary decision.

**What P1.2/P1.4 must falsify/test**
- where commitment and valuation truth live today;
- whether operational and accounting truth diverge materially;
- which system owns budget, invoice, payment and certification fields/events;
- whether product-owned commercial truth has standalone value before AP/GL/payment execution;
- whether retention/advance/recoupment positions require additional irreducible event semantics.

**Boundary**

This wedge does not decide `ADR-0005`. AP/GL ownership remains `INTERFACE-ONLY / PRIMARY_REQUIRED` until the authority seam is resolved.

## WEDGE-03 — Task-Focused External Tender Participation

**Structural hypothesis**

A supplier/subcontractor can securely participate in the tender lifecycle through bounded task actions without requiring a broad persistent portal or internal-style tenant account.

**Minimum action surface**

`invite/access → acknowledge → {respond | decline/no-bid} → submit/revise → clarify`

Bid/revision evidence must retain exact identity/provenance. Supplier-facing form configurability may be thin because human normalization can map attachment/freeform bids into the canonical SPINE bid-line/comparison structure.

**What P1.2 must falsify/test**
- whether task-focused access reduces or increases supplier friction;
- whether persistent accounts are actually required;
- whether decline/no-bid is materially used and should affect bidder coverage/performance signals;
- whether attachment-heavy behavior can coexist with deterministic comparison truth;
- which external identity relationship is acceptable.

## Joint rule

WEDGE-01 tests whether the full retained procurement-control graph closes. WEDGE-02 tests whether its downstream commercial position can remain coherent without prematurely owning accounting. WEDGE-03 tests whether an external actor can participate without creating a portal gravity well.

No wedge is commercially validated by P1.1.
