# P1.2 — Secondary Reference Policy v0.1

**Status:** ACTIVE  
**Purpose:** Keep research moving when primary contractor evidence is incomplete, without confusing incumbent practice with contractor reality.

## Rule

Missing primary evidence does **not** stop analysis.

When a workflow area is not yet evidenced sufficiently from independent contractor cases, the project may continue using:
- logical/domain reasoning;
- official competitor product documentation;
- official training/product-tour videos;
- implementation/user guides;
- professional best-practice guidance;
- high-quality public case studies.

All such material is classified `SECONDARY_REFERENCE` until primary evidence/audit confirms, contradicts or leaves it unresolved.

## Authority order

1. `PRIMARY_CONTRACTOR_EVIDENCE`
2. `PRIMARY_TRANSACTION_ARTIFACT`
3. `REGULATORY / CONTRACTUAL REQUIREMENT`
4. `SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING`
5. `SECONDARY_REFERENCE — PROFESSIONAL PRACTICE`
6. `INTERNAL_REASONING / HYPOTHESIS`

Higher authority can overturn lower authority.

## What secondary reference may do

It may:
- supply provisional object/state/mechanism candidates;
- expose mature edge cases we should not forget;
- provide provisional best-practice workflows;
- identify likely fields, controls, calculations and transitions;
- help design what later primary research must test;
- let Phase 1 continue rather than stopping at every evidence gap.

## What it may not do

It may not:
- satisfy the independent P1.2 workflow-count gate;
- satisfy the original contractor bid-leveling artifact gate;
- silently convert competitor vocabulary into canonical ontology;
- turn a competitor feature into a requirement merely because it exists;
- close a PRIMARY_REQUIRED ADR without the evidence class required by that ADR;
- be described as contractor reality before audit/corroboration.

## Anti-anchoring rule

Secondary learning happens in a separate layer from raw primary capture.

When later independent cases arrive:
1. capture them verbatim without showing/forcing the reference model;
2. reconstruct their actual workflow;
3. only then compare to the secondary reference baseline;
4. classify each reference pattern as `CORROBORATED / CONTRADICTED / UNOBSERVED / NOT_TESTED`.

## Progress rule

The project should **continue forward provisionally** using the strongest available evidence instead of halting for perfect information.

At every later freeze/red-team point, any decision still resting mainly on secondary/reference evidence must be visible and eligible for downgrade/reversal.

## Relationship to P1.3

P1.3 remains the formal deep competitor-reconstruction phase.

P1.2 secondary reference work is narrower: learn enough from top-tier systems and best practice to avoid ignorance-driven architecture and to define strong falsifiable expectations. It does not attempt the complete competitor matrix/state-machine reconstruction required by P1.3.
