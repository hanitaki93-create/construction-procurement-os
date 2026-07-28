# P1.1 — Thesis, Beachhead & Release Boundary — Workplan v0.1

**Status:** ACTIVE  
**Opened:** 2026-07-28  
**Dependency:** P1.0 CP-05 PASS

## Objective

Define who V1 serves and what V1 deliberately does not contain so the rest of Phase 1 can terminate without shrinking the long-term architectural ceiling.

P1.1 chooses a **first executable commercial attack surface**, not the final size of the platform.

## Governing distinction

`Focused V1 surface ≠ small architecture.`

Scope may be demoted because of dependency burden, technical incoherence, poor strategic leverage or inability to form a closed sub-graph. Scope is not demoted merely because the long-term product is ambitious.

## P1.1-A — Beachhead decision frame

Produce 2–4 explicit candidate beachheads, each specifying:
- geography;
- contractor size/complexity band;
- project/trade profile;
- procurement/commercial maturity;
- likely current software/tool stack;
- implementation environment;
- highest-value workflow failure;
- why this segment can support the long-term platform ceiling.

No candidate is selected from intuition alone; uncertainty and evidence needs are explicit.

## P1.1-B — Wedge hypotheses

For the leading beachhead candidates define three falsifiable wedge hypotheses with:
- target user/buyer;
- painful current process;
- deterministic product capability that changes the process;
- measurable improvement expected;
- kill condition.

AI capability is not required for a wedge to be viable in Phase 1.

## P1.1-C — Scope classification

Classify every candidate product area as exactly:
- `SPINE`
- `THIN`
- `INTERFACE-ONLY`
- `OUT`

Each classification records:
- reason;
- dependency impact;
- what future capability it preserves;
- evidence required to revisit it.

No `important later` bucket is allowed.

## P1.1-D — Implementation-burden budget

Create a numeric/weighted burden model covering at least:
- entity/state complexity;
- financial truth complexity;
- external-party complexity;
- integration dependency;
- migration burden;
- configuration/testing burden;
- operational/support burden.

The budget exists to prevent uncontrolled ERP sprawl, not to force a small product by convention.

## P1.1-E — Explicit exclusions and interface boundaries

For every `OUT` or `INTERFACE-ONLY` area define:
- what the platform will not own in V1;
- which external system/process remains authoritative;
- what minimum seam must exist so later expansion does not require ontology rewrite.

## P1.1-F — Integrated boundary draft

Produce one draft containing:
1. selected beachhead;
2. three wedge hypotheses;
3. full SPINE/THIN/INTERFACE-ONLY/OUT matrix;
4. burden budget;
5. explicit exclusions;
6. evidence-to-revisit conditions;
7. expected closed-subgraph shape for later P1.5 validation.

## Critique point

**STOP FOR HOSTILE CRITIQUE after P1.1-F is complete and before any P1.1 freeze.**

The critique should challenge:
- whether the selected beachhead is structurally wrong;
- whether a SPINE/THIN/INTERFACE-ONLY/OUT classification creates hidden dependencies or future rewrite;
- whether the burden model protects buildability without artificially shrinking ambition;
- whether exclusions sever a substrate required by the intended high ceiling;
- whether the V1 surface can plausibly become a closed executable sub-graph.

Do not critique scope merely for being ambitious.

## Gate

P1.1 may freeze only when:
- one named beachhead is selected;
- 100% of candidate areas are classified;
- three falsifiable wedge hypotheses exist;
- the burden budget is explicit;
- exclusions and revisit evidence are explicit;
- at least one attractive feature is deliberately deferred/cut for a stated burden/dependency reason;
- no `everything is core` outcome survives;
- hostile critique is resolved.
