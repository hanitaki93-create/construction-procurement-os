# Decision-Leverage Classification v1.0

**Date:** 2026-07-28  
**Trigger:** CP-03 hostile critique  
**Scope:** inherited competitor claims `EVD-0005` through `EVD-0168`  
**Purpose:** stop treating inherited text volume as the research workload. Evidence effort is proportional to architectural decision leverage.

## 1. Governing rule

For every inherited competitor claim ask:

> Which architecture decision can this evidence change, and would flipping its truth value plausibly change the decision?

If the answer is no, P1.0 does not spend verification effort on it. The claim is preserved and reconstructed in P1.3 after primary contractor evidence.

This is a research-priority rule, not a reduction in product ambition.

## 2. Full partition

The canonical machine-readable partition is `DECISION_LEVERAGE_CLASSIFICATION_V1_0.csv`.

All 164 inherited §2 claims are classified exactly once:

- 9 `VERIFIED_DECISION_RELEVANT` — already verified in CP-03 and potentially useful to named decisions.
- 13 `VERIFIED_BACKGROUND` — already verified but architecturally non-load-bearing; no further P1.0 work.
- 20 `PAIN_SIGNAL` — user/market friction; theme and count, never use as ontology evidence.
- 17 `VERIFY_EXACT` — individually verify in targeted P1.0 A2 because the result can change a structural decision.
- 38 `VERIFY_GROUPED` — use as cross-vendor patterns rather than 38 independent completion targets.
- 13 `ADR_INPUT_HYPOTHESIS` — inherited architecture lessons/inferences; do not source-verify as product facts.
- 54 `DEFER_P1_3` — preserve untouched for competitor reconstruction after P1.2.

**Total: 164.**

## 3. Exact-verification set and decision target

| Evidence | Why it remains in P1.0 | Decision target |
|---|---|---|
| EVD-0051 | Whether procurement schedule/status can derive from transaction progress | ASM-0011 / ADR-0013 |
| EVD-0054 | External vendor access model without heavyweight accounts | ASM-0010/0014 / ADR-0012/0016 |
| EVD-0080 | Budget-to-contract allocation shape/cardinality | ASM-0009 / ADR-0011 |
| EVD-0089 | Whether budget/contract relationship cardinality is configurable | ASM-0009 / ADR-0011 |
| EVD-0090 | Contract → payment → change lifecycle coupling | ASM-0003/0013 / ADR-0005/0015 |
| EVD-0099 | Immutable/auditable project-record mechanics | ASM-0012 / ADR-0014 |
| EVD-0103 | Secure external/guest participant model | Q-0006 / ADR-0012 |
| EVD-0107 | Multi-party data-ownership boundaries | Q-0002/Q-0006 / ADR-0005 |
| EVD-0120 | General workflow-engine mechanics | ASM-0006 / ADR-0008 |
| EVD-0124 | Configurable forms and business-process states | ASM-0006/0007 / ADR-0008/0009 |
| EVD-0133 | Requisition → PO path independent of procurement packages | ASM-0001 / ADR-0003 |
| EVD-0134 | PO and subcontract type relationship | ASM-0002 / ADR-0004 |
| EVD-0139 | Job/cost-code/category attribution mechanics | ASM-0009 / ADR-0011 |
| EVD-0143 | Posted vs unposted financial-state semantics | ASM-0013 / ADR-0015 |
| EVD-0144 | Financial-role privilege verbs including post/void/approve | P1.5 authority/posting seam |
| EVD-0150 | Material-request/purchasing path | ASM-0001 / ADR-0003 |
| EVD-0154 | Bidirectional ERP/API capability | ASM-0004 / ADR-0006 and P1.4 integration authority |

A `VERIFY_EXACT` disposition is not acceptance of the incumbent model. It only means the claim is sufficiently decision-leveraged to justify early verification.

## 4. Grouped patterns

`VERIFY_GROUPED` claims are not processed in document order. They are grouped around decisions:

1. **Package/status derivation pattern** — EVD-0052, EVD-0056, EVD-0058.
2. **ERP/integration seam pattern** — EVD-0081, EVD-0123, EVD-0141, EVD-0153.
3. **Document/audit governance pattern** — EVD-0108 through EVD-0112.
4. **Workflow/configuration pattern** — EVD-0126 through EVD-0131.
5. **Commitment/financial mechanics pattern** — EVD-0135–0138, EVD-0140–0142, EVD-0145–0147.
6. **Viewpoint commercial/accounting pattern** — EVD-0151–0153 and EVD-0155.
7. **Supplier-governance lifecycle pattern** — EVD-0160 through EVD-0167.

A grouped pattern is complete when enough independent evidence exists to constrain the decision; it is not necessary to prove every vendor feature instance.

## 5. Anti-anchoring rule

P1.0 may verify decision-leveraged incumbent mechanics, but **cannot use competitor vocabulary as canonical ontology**.

Canonical domain terminology is derived primary-first in P1.2. Competitor terms remain attributed synonyms/pattern labels until mapped after primary evidence.

## 6. P1.0 termination effect

The old target `82/164 verified` is retired.

P1.0 proceeds toward final gate when:

- every current structural assumption has a decision/ADR stub;
- the 17 exact claims have a disposition or are explicitly deferred because primary evidence is required first;
- grouped patterns have sufficient evidence or are explicitly deferred to P1.3;
- no architecture decision depends on an unclassified inherited claim;
- the control/traceability machinery is stable;
- the final hostile audit receives the actual repository artifacts, not a narrative-only summary.

Deep competitor reconstruction remains P1.3.
