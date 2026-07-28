# P1.1-B — Structural Wedge Hypotheses v0.2

**Status:** PROVISIONAL / NOT FROZEN  
**Supersedes:** `P1_1_WEDGE_HYPOTHESES_V0_1.md` for current P1.1 reasoning.

A P1.1 wedge is valid only if it tests where truth lives, which actors touch the system, or which lifecycle must close. Commercial demand, pricing and willingness-to-pay remain outside the proof claim.

## WEDGE-01 — Closed Sourcing-to-Commitment Control Path

**Structural hypothesis**  
A procurement transaction can move from demand (`MR` or procurement package) through tender, comparison, recommendation, approval, award and commitment handoff under one deterministic lifecycle/evidence/authority model, without a parallel status ledger being required for transaction truth.

**Required actors**  
Internal demand originator, procurement owner, evaluators/QS/commercial participants and authorized approver. Supplier participation may be direct or internally captured.

**What P1.2 must falsify/test**
- whether one shared lifecycle can represent observed sourcing variants without project-specific workflow invention;
- which status fields are transaction-derived versus legitimate planning inputs;
- whether MR-led and package-led demand must be first-class alternatives;
- where approval and handoff actually occur.

**Architecture consequence if supported**  
Demand identity, tender lifecycle, comparison/recommendation, authority, award handoff, evidence and status derivation remain core architecture surfaces.

**Commercial/process metrics may be measured later**  
Elapsed time and manual reconciliation frequency may be captured in P1.2, but they are not used to prove the architecture boundary in P1.1.

---

## WEDGE-02 — Commercial Commitment Truth

**Structural hypothesis**  
Approved award, cost attribution, issued commitment, controlled changes and downstream valuation events can be represented as one coherent commercial truth layer while accounting ownership remains an explicit external/interface decision.

**What P1.2/P1.4 must falsify/test**
- where commitment truth lives today;
- whether operational and accounting truth diverge materially;
- which system owns budget, invoice, payment and certification fields/events;
- whether product-owned commercial truth has standalone value before AP/GL/payment execution.

**Architecture consequence if supported**  
Cost attribution, commitment identity, commercial events, changes/reversals, valuation/progress events, balance derivation and accounting reconciliation remain retained substrate.

**Boundary**  
This wedge does **not** decide `ADR-0005`. AP/GL ownership stays `INTERFACE-ONLY / PRIMARY_REQUIRED` until the authority seam is resolved.

---

## WEDGE-03 — Task-Focused External Tender Participation

**Structural hypothesis**  
A supplier/subcontractor can securely receive a tender task, submit or revise commercial evidence and participate in clarification/response without needing to become a full internal-style tenant user or use a broad persistent portal.

**Minimum V1 external surface**
- invitation/access token or equivalent secure task access;
- tender acknowledgement/response state;
- bid form and/or attachment submission;
- revision identity/time/source;
- clarification/reply where required;
- confidentiality boundary by tender/project relationship.

**Explicit non-claim**  
WEDGE-03 does not require a supplier dashboard, marketplace, collaboration suite or broad vendor portal. Those remain OUT unless primary evidence makes them necessary.

**What P1.2 must falsify/test**
- whether task-focused access reduces or increases participation friction;
- whether persistent supplier accounts are actually required;
- whether attachment-only behavior can coexist with deterministic evidence capture;
- which external identity relationship is acceptable.

**Architecture consequence if supported**  
External identity/access, tender evidence/versioning and bounded external actions remain first-class.

## Joint rule

WEDGE-01 must form a closed deterministic sourcing path. WEDGE-02 extends it into durable commercial truth. WEDGE-03 changes how an external actor participates but does not require a broad portal.

No wedge is considered commercially validated by P1.1.