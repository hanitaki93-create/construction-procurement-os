# A2 Batch 02 — Decision-Critical Evidence

**Date:** 2026-07-28  
**Trigger:** CP-03 hostile critique / CHG-0002  
**Method:** decision-driven exact verification, not inherited document order  
**Parents tested:** 17 `VERIFY_EXACT` inherited claims  
**Atomic evidence created:** `EVD-0180` through `EVD-0196` plus new mechanism evidence `EVD-0197`

## Result

- 17/17 architecture-impacting evidence needs received exact current-source review.
- 17 atomic child claims are `SUPPORTED` at deliberately scoped wording.
- The inherited `EVD-0090` arrow-chain wording was **not** adopted literally; `EVD-0184` records the supported narrower fact that Autodesk connects contracts, payment applications and change orders within Cost Management without asserting one strict linear sequence.
- One additional high-value mechanism was discovered: `EVD-0197` shows CMiC can require workflow approval before posting becomes available while posting remains separately permission-controlled.

This batch does **not** advance a count toward 164. Its purpose is to increase decision coverage.

## Decision implications

### Structural root — ADR-0003
`EVD-0190` and `EVD-0195` prove mature construction systems can support requisition/request-led purchasing paths. This prevents ProcurementPackage from becoming a universal root by incumbent assumption alone. Primary contractor evidence in P1.2 remains decisive.

### PO / Subcontract type model — ADR-0004
`EVD-0191` shows a mature construction ERP can treat PO and Subcontract as purchasing commitments while preserving different cardinality and legal semantics. This supports investigating a shared abstraction without deciding implementation inheritance/composition.

### Accounting / commercial seam — ADR-0005
`EVD-0184`, `EVD-0187`, and earlier Procore integration evidence show that commercial workflow, organizational ownership and accounting synchronization are distinct concerns. Exact authority remains a P1.4 decision.

### V1 integration depth — ADR-0006
`EVD-0196` confirms Vista exposes a bidirectional cloud REST service layer. Combined with Procore evidence, integration capability is real but does not prove deep ERP integration belongs in V1.

### Budget / cost attribution — ADR-0011
`EVD-0182`, `EVD-0183`, and `EVD-0192` expose configurable budget-contract cardinality and detailed cost-code/category attribution. A single hard-coded one-budget/one-contract assumption would be unsafe.

### External identity and UX — ADR-0012 / ADR-0016
`EVD-0181` and `EVD-0186` demonstrate two real low-friction external participation patterns: secure-link access with no account and restricted guest identities without login. The correct model still depends on P1.2 supplier evidence and P1.4 identity architecture.

### Event-derived status — ADR-0013
`EVD-0180` shows actual procurement progress can drive schedule milestones automatically. This supports event-derived status as a serious option while leaving room for explicit planning fields.

### Document provenance — ADR-0014
`EVD-0185` and `EVD-0187` show organization-scoped ownership plus immutable/versioned records is a viable multi-party construction pattern.

### Posting / reversal / financial semantics — ADR-0015
`EVD-0192` and `EVD-0193` expose SOV financial grain and explicit posted/unposted states with posting dates/batches. This materially supports treating finalization/posting semantics as core architecture rather than UI status.

### Workflow engine and seam — ADR-0008 / ADR-0018
`EVD-0188`, `EVD-0189`, `EVD-0194`, and especially `EVD-0197` show mature systems separate configurable workflow/approval mechanics from explicit post/void authority. This is strong evidence for keeping workflow as an input/authorization mechanism rather than allowing configuration to mutate financial truth arbitrarily.

### Configuration / temporal questions — ADR-0009 / ADR-0019 / ADR-0020
Unifier exposes configurable workflow setups at multiple scopes, and CMiC exposes explicit posting state/date. These prove the problem exists but **do not settle** effective dating or in-flight configuration binding. Those remain P1.5 design decisions.

### Field-level integration authority / staleness — ADR-0021
Aconex organization boundaries and Vista bidirectional API support the need to model authority explicitly, but they do not settle field-level authority or read-path staleness. P1.4 must design this rather than inherit a competitor answer.

## Architecture-information-content outcome

The high-yield sources in this batch were primarily:
- object/cardinality revealing,
- mechanism/state revealing,
- authority/permission revealing,
- integration-boundary revealing.

Feature-existence facts that could not change a decision were not researched.

## Remaining targeted evidence posture

No further inherited claim is verified merely because it remains `PROPOSED`.

Grouped evidence is considered only where a cross-vendor pattern can change an ADR. Supplier-governance feature inventory and other non-load-bearing competitor detail remain preserved for P1.3 after primary contractor workflows.
