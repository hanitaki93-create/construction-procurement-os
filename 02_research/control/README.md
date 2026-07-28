# Research Control Registers

These files are the live control plane for Phase 1 research.

## Registers
- `sources.csv` — external/internal source inventory and grades.
- `../evidence/README.md` — canonical evidence-register index; evidence records are stored in stable ID-range CSVs.
- `assumptions.csv` — load-bearing hypotheses with falsification tests.
- `open_questions.csv` — unresolved questions and what they block.
- `contradictions.csv` — conflicting evidence or incompatible claims.
- `terminology.csv` — canonical vocabulary and competitor synonyms.
- `adr_log.csv` — architecture decisions and alternatives.
- `requirements.csv` — accepted/proposed deterministic requirements.
- `changes.csv` — controlled changes to frozen artifacts.

## Rule
Accepted architecture must never exist only in prose. It must be represented through ADR/REQ traceability.

Evidence IDs are unique across the project. The inherited v0.1 retro-file currently occupies `EVD-0001` through `EVD-0178` in `02_research/evidence/retrofile/`.

## P1.0 status
The schemas are active. Inherited v0.1 claims are structurally controlled and awaiting source-by-source verification under the audit checkpoints.
