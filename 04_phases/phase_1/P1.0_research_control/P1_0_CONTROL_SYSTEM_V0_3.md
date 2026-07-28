# P1.0 — Research Control System v0.3

**Status:** ACTIVE
**Supersedes:** v0.2 for current execution
**Trigger:** CP-05 hostile critique
**Inheritance:** All v0.2 rules remain binding except where explicitly changed below.

## 1. Evidence-dependency vocabulary

The label `P1_0_SUFFICIENT` is retired because it can be misread as permission to decide an ADR from P1.0/competitor evidence.

Active future-decision dependency classes are:
- `PRIMARY_REQUIRED` — primary contractor/operating evidence must be capable of changing the eventual ADR outcome.
- `DESIGN_PHASE` — the issue is known, but the decision is an architecture-design task in its assigned later phase.
- `ACCEPTED` — the ADR itself is already accepted under normal evidence/decision rules.

Current canonical mapping: `02_research/evidence/ADR_EVIDENCE_COVERAGE_V1_1.csv`.

For ontology/boundary decisions `ADR-0003`, `ADR-0004`, and `ADR-0005`, `PRIMARY_REQUIRED` is mandatory. Competitor evidence may reveal possibilities but cannot settle these decisions.

## 2. Source preservation

`02_research/sources/SOURCE_PRESERVATION_POLICY_V1_0.md` is binding.

Mutable external sources must be immutably preserved before they may support an ACCEPTED ADR/REQ or frozen architecture conclusion. Background, pain-signal and deferred competitor pages do not become a retroactive P1.0 archival queue; they must be re-verified and preserved if later promoted to decision-bearing evidence.

## 3. Anti-anchoring handoff to P1.2

P1.2 raw capture must preserve contractor vocabulary and observations before ontology mapping. Competitor hypotheses may not be used as a closed questionnaire that limits observation to previously enumerated patterns.

Roadmap-level P1.2 protocol requirements are governed by the next accepted roadmap revision.

## 4. Independent audit interface

The concise minimum CP-05 inspection artifact is:
`04_phases/phase_1/P1.0_research_control/audits/CP_05_INSPECTION_BUNDLE_V1_0.md`

It contains:
1. ADR index with status/dependency;
2. ten EVD examples spanning decision-leverage dispositions;
3. status vocabularies;
4. one complete SOURCE → EVD → ASM → ADR chain.

The independent auditor may request underlying artifacts when a sampled row is inconsistent, but the project cannot claim independent verification from narrative summary alone.

## 5. CP-05 completion test added

CP-05 must explicitly verify:
- no active use of retired `P1_0_SUFFICIENT` semantics;
- ontology/boundary ADRs remain PRIMARY_REQUIRED where applicable;
- no accepted/frozen conclusion relies on an unpreserved mutable external source;
- the inspection bundle matches canonical registers;
- P1.2 anti-anchoring capture requirements are scheduled before P1.2 execution.
