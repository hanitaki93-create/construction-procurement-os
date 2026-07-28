# P1.0 — Research Control System v0.4

**Status:** ACTIVE  
**Supersedes:** v0.3 for current control semantics  
**Trigger:** CP-05 hostile recheck  
**Inheritance:** All v0.3 rules remain binding except where explicitly augmented below.

## 1. Accepted ADR evidence basis

The canonical ADR register includes an `evidence_basis` field.

For every `ACCEPTED` ADR, `evidence_basis` is mandatory and must identify the dominant basis on which the decision was accepted:

- `INTERNAL_PRINCIPLE` — accepted from explicit architecture/governance reasoning rather than external product behavior;
- `PRIMARY` — accepted primarily from contractor/operating evidence;
- `COMPETITOR_PATTERN` — accepted primarily from a cross-incumbent pattern;
- `MIXED` — acceptance materially depends on multiple evidence classes;
- `REGULATORY_TECHNICAL` — accepted primarily from regulatory, accounting, legal, standards or other authoritative technical constraints.

A later controlled successor value may be added if needed, but an accepted ADR may never leave the basis blank.

Purpose: after new primary evidence arrives, the project must be able to query which accepted decisions rested on incumbent patterns, internal principles or primary evidence without reconstructing the rationale manually.

Current accepted ADRs:
- ADR-0001 — `INTERNAL_PRINCIPLE`
- ADR-0002 — `INTERNAL_PRINCIPLE`
- ADR-0024 — `INTERNAL_PRINCIPLE`

## 2. Primary-evidence handoff

Roadmap v1.3 governs the P1.2 verbatim-by-default capture rule and primary-corroboration reconciliation. P1.0 does not pre-accept any ontology hypothesis merely because it has an ADR stub or competitor evidence.

## 3. CP-05 audit-scope honesty

An external model verdict based on supplied control descriptions/bundles may certify the **control design** only to the extent actually inspected.

When the external auditor cannot access the canonical repository:
- the external verdict scope must be stated explicitly;
- canonical artifact execution must be checked separately against the repository;
- the project may combine the two for a gate decision only if both pass;
- the project must not describe the result as an independent repository/artifact execution audit.

## 4. Source preservation

Source Preservation Policy v1.0 remains binding. Optional background archival at cite time may be used as cheap recoverability insurance, but it is not a P1.0 completion queue.

## 5. Completion

P1.0 may close when the CP-05 design critique and canonical-artifact execution checks both pass and the audit-scope limitation is recorded.
