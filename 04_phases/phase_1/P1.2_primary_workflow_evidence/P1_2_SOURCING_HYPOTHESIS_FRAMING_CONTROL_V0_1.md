# P1.2 — Sourcing Hypothesis Framing Control v0.1

**Status:** BINDING CONTROL FOR P01–P06 / NOT A FREEZE  
**Purpose:** prevent secondary-reference process modelling from silently becoming accepted ontology before primary contractor evidence and later ADR resolution.

## 1. Binding interpretation of P01–P06

P01–P06 are **falsifiable candidate decompositions**, not accepted entity architecture and not validated contractor workflow.

Words such as `Demand`, `ProcurementPackage`, `TenderEvent`, `TenderRelease`, `BidSubmission`, `ComparisonSnapshot`, `AwardDecision`, etc. are working labels used to test:
- truth ownership;
- provenance/version invariants;
- lifecycle edge cases;
- split/partial allocation;
- authority/DOA;
- supplier participation friction;
- award-to-commitment seam.

Their presence in a process artifact does **not** decide that each must become a first-class persisted entity. Any may later collapse into:
- an event record;
- a value object;
- a projection/read model;
- a child component of another aggregate;
- a relationship/allocation record;
- or be removed entirely.

The hostile sourcing critique is specifically required to recommend such collapses where invariants survive.

## 2. ADR-0003 and ADR-0004 remain open

### ADR-0003 — Procurement structural root
Current formal status remains `PROPOSED / PENDING`.

The P01 candidate relationship `Demand ↔ ProcurementPackage ↔ TenderEvent` must **not** be read as a resolution that `ProcurementPackage` is the universal root.

P01 deliberately permits:
- requisition/demand-led procurement;
- package-led planning before detailed MR;
- direct sourcing;
- later reconciliation between planning package and demand.

Primary contractor evidence must still determine whether the durable structural root is package-led, requisition-led, plural/equal paths, or a higher-order abstraction.

### ADR-0004 — PO and Subcontract type model
Current formal status remains `PROPOSED / PENDING`.

P01–P06 stop at `AwardDecision` and hand off to P07. References to `{PO | subcontract}` describe observed/expected downstream outcomes only. They do **not** decide whether the eventual model is:
- separate top-level entities;
- one common `Commitment` supertype;
- shared commercial interfaces with composed subtype behavior;
- or another structure.

P07 may explore candidate mechanics but cannot close ADR-0004 without its required primary lifecycle/financial evidence and later P1.5 resolution.

## 3. Primary capture must remain unanchored

Independent P1.2 primary cases must be captured **without showing participants the P01–P06 object names, state names or graph**.

The capture sequence remains:
1. verbatim contractor terminology;
2. actual role/action/artifact/status/tool/source-of-truth;
3. exceptions/workarounds/duplicates/manual reconciliation;
4. mandatory unmatched observation capture;
5. only after raw reconstruction, map observations against candidate P01–P06 concepts.

A primary observation that does not fit P01–P06 is not an error. It must enter the Unmodeled/Unmatched Observation Register before any normalization attempt.

## 4. Required falsification posture

For every candidate object boundary or major invariant, later primary evidence may produce:
- `PRIMARY_CORROBORATED`;
- `PRIMARY_CONTRADICTED`;
- `PRIMARY_UNOBSERVED`;
- `NOT_TESTED`.

Contradiction has priority over preservation of the candidate model.

Examples of valid destructive outcomes:
- `ProcurementPackage` disappears as a persistent object and becomes a planning projection;
- `TenderEvent` and `TenderRelease` collapse into one versioned solicitation aggregate;
- `BidderCandidate` and `BidderSelection` collapse into events on a tender bidder set;
- `ComparisonSnapshot` becomes an immutable evaluation-version record rather than a standalone aggregate;
- `ApprovalCase` becomes a reusable approval primitive rather than procurement-domain entity;
- PO and subcontract do not share the candidate common seam currently implied by the graph.

## 5. What P01–P06 are allowed to establish now

They may provisionally establish **required behavior/invariants**, where supported by secondary references and logic, such as:
- no destructive replacement of released tender/bid evidence;
- explicit source/version provenance;
- supplier truth separated from buyer normalization/adjustment;
- decline separated from non-response;
- qualification separated from contextual eligibility/invitation;
- governed award separated from authoritative commitment creation;
- split/partial allocation must not double-award or double-commit;
- historical authority/DOA must remain reproducible.

Even these remain auditable, but they are deliberately more durable than current object names.

## 6. What P01–P06 are forbidden to establish

They may not by themselves:
- close ADR-0003 or ADR-0004;
- declare a universal procurement root;
- make `ProcurementPackage` mandatory for every procurement path;
- decide the PO/subcontract inheritance/composition model;
- define a generalized BPM engine;
- define the final tenant/customer-specific workflow language;
- replace missing primary evidence with incumbent-product behavior;
- count competitor patterns as independent contractor workflows.

## 7. Review rule

The sourcing hostile critique must distinguish:

**A. invariant failure** — blocker before P07 if the model cannot preserve critical truth/reversibility;

**B. candidate object over-modelling** — simplify/collapse before implementation, but object-name uncertainty alone is not a reason to stop hypothesis work;

**C. primary-evidence uncertainty** — carry explicitly to later primary audit unless the candidate design makes falsification impossible.

## 8. Gate implication

P01–P06 may proceed to critique and, if structurally cleared, to provisional P07 exploration.

They do **not** make P1.2 closeable. The existing independent-workflow, UAE/outside-pattern, real bid-level artifact, supplier-friction and corroboration gates remain unchanged.
