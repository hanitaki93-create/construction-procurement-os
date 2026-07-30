# P1.3 — State-Machine Reconstructions v0.1

**Status:** SUFFICIENT FOR P1.3 STATE-DEPTH GATE / PUBLIC-EVIDENCE BOUNDED

This document reconstructs competitor transitions from official product/help documentation.

It distinguishes:
- **DOCUMENTED STATE** — product documentation explicitly exposes the status/state;
- **DOCUMENTED FACT/ACTION** — the fact/action is explicit but not necessarily a persisted status;
- **RECONSTRUCTED STAGE** — operational stage inferred from ordered documented actions; not claimed as a product status code.

---

# 1. Procore Bidding — reconstructed state machine

## 1.1 Bid package

### Documented persisted package status

- `OPEN`
- `CLOSED`

Official documentation states Open is used while the bid package is in progress and Closed when awarded/closed; closed packages are not visible to bidders.

### Reconstructed package flow

`PACKAGE CREATED`
`→ OPEN`
`→ BID FORM CREATED`
`→ BIDDERS ADDED`
`→ INVITATIONS ISSUED`
`→ PARTICIPATION / SUBMISSIONS ACCUMULATE`
`→ LEVELING / EVALUATION`
`→ {SOFT AWARD | AWARD + COMMITMENT CONVERSION | NO AWARD}`
`→ CLOSED`

Only `OPEN/CLOSED` are asserted here as documented package statuses. Other labels are documented actions/stages.

## 1.2 Bidder participation

Official Procore evidence exposes bidder-level behavior/state including:

- invitation not yet sent / n.a.;
- `Undecided`;
- `Will Bid`;
- `Will Not Bid`;
- `Bid Submitted`;
- `Awarded`.

Email submission can update bid status to Submitted and records last activity.

### Reconstructed participant flow

`BIDDER ADDED`
`→ INVITED`
`→ {UNDECIDED | WILL_BID | WILL_NOT_BID}`
`→ [if participating] BID_SUBMITTED`
`→ LEVELING / REVIEW`
`→ {AWARDED | NOT SELECTED / PACKAGE CLOSED}`

The product supports a **soft award** by setting bid status to Awarded without creating a contract.

This is direct competitor corroboration for our distinction:

`AwardDecision ≠ Effective Commitment`

## 1.3 Bid form / leveling

Documented prerequisites:

`BID FORM EXISTS + BIDS RECEIVED → LEVELING AVAILABLE`

Leveling can expose:
- missing/excluded items;
- alternates;
- private line items;
- editable leveled values;
- notes/color/activity history;
- vendor/project history.

A leveled or original bid can then be converted into:
- Purchase Order;
- Subcontract.

## 1.4 Architecture lessons

### BORROW

- bidder intent and submission facts separate from package status;
- soft award distinct from contract creation;
- email submission can update structured workflow state;
- leveling happens after structured response basis exists;
- fast award→commitment handoff.

### STRENGTHEN IN OUR MODEL

Procore allows leveled bid values to be edited and converted to commitment.

Our architecture must preserve the stronger semantic chain:

`supplier submission`
`→ normalized view`
`→ internal evaluation adjustment`
`→ supplier-confirmed contractable basis`
`→ award`
`→ commitment formation/effectiveness`

Activity history alone is not enough if the semantic layer of the edited value is ambiguous.

---

# 2. CMiC Bid Management / Procurement — reconstructed state machine

## 2.1 Bid package

Official CMiC documentation defines system status **classes**:

- `NEW`
- `IN_PROCESS`
- `AWARDED`

Deployments may define custom status codes mapped to these classes.

### Reconstructed package flow

`NEW`
`→ package/buyout scope configured`
`→ bidders added / invitations issued`
`→ IN_PROCESS`
`→ intent / submissions / bid analysis`
`→ buyout selection`
`→ purchase action`
`→ AWARDED`

The exact transition trigger to system class Awarded is not fully determined from public documentation, so the final arrow is reconstruction rather than asserted internal implementation.

## 2.2 Bidder participation

Documented behavior:

`BIDDER ADDED`
`→ INVITED`
`→ {INTEND_TO_BID | NOT_TO_BID}`
`→ supplier submission / quoted values`
`→ bid analysis`
`→ selected buyout items`

Intent may be changed repeatedly before the package due date; responses are no longer accepted after the due date.

Prequalification and approval status are displayed separately from intent/submission.

This corroborates:

`qualification ≠ selection ≠ invitation ≠ intent ≠ submission`

## 2.3 Buyout / purchase transition

CMiC supports buyout items as:
- one-to-one with project bid item;
- one buyout item linked to multiple project items;
- manually entered with no project-item link.

During bid analysis, desired vendor/item combinations are selected.

Purchase action can create:
- base contract/subcontract;
- change order;
- addition to an existing unposted contract/change.

CMiC also guards duplicate selection of the same buyout item under more than one vendor in the analysis flow.

## 2.4 Requisition → Purchase Order

Official documentation establishes:

`REQUISITION CREATED`
`→ APPROVAL where required`
`→ APPROVED REQUISITION`
`→ GENERATE PURCHASE ORDER`
`→ PO APPROVAL / PROCESSING RULES`

Only approved requisitions can generate POs through the described integration path.

This is strong competitor corroboration for:

`authorized demand/requisition ≠ commitment`

## 2.5 Architecture lessons

### BORROW

- separate package state, bidder state and prequalification state;
- flexible buyout mapping;
- approved requisition before PO conversion;
- PO and subcontract share commitment role while retaining different behavior;
- direct purchase handoff from evaluated buyout;
- posting/downstream activity constrains later editing.

### REJECT / ADAPT

- custom deployment status catalogues must not become arbitrary domain semantics;
- full single-database ERP/accounting ownership is outside our V1 boundary;
- project bid item identifiers cannot be assumed to represent exclusive physical scope.

---

# 3. SAP Ariba — third corroborating event state model

Official sourcing documentation exposes:

`PREVIEW → OPEN → PENDING_SELECTION → COMPLETED`

with `CANCELLED` as an abort path after publishing.

Guided sourcing additionally exposes review-response behavior, grading and award scenarios after bidding closes.

Supplier lifecycle/relationship semantics remain separate from sourcing-event state.

This is useful corroboration that:
- sourcing event has an independent lifecycle;
- supplier master/lifecycle is not tender participation;
- award selection can be a separate phase after responses close.

---

# 4. P1.3 state-depth gate verdict

**PASS for state-machine reconstruction requirement.**

Two required competitors are reconstructed at meaningful transition/state depth:

1. Procore Bidding;
2. CMiC Bid Management / Requisition / Purchase.

SAP Ariba provides a third independent event-state benchmark.

This does not mean their state models are copied. They are evidence feeding P1.5 lifecycle design after P1.4 ownership decisions.
