# Research Control Registers

These files are the live control plane for Phase 1 research.

## Registers
- `sources.csv` — external/internal source inventory and grades.
- `evidence.csv` — atomic claims linked to source IDs.
- `assumptions.csv` — load-bearing hypotheses with falsification tests.
- `open_questions.csv` — unresolved questions and what they block.
- `contradictions.csv` — conflicting evidence or incompatible claims.
- `terminology.csv` — canonical vocabulary and competitor synonyms.
- `adr_log.csv` — architecture decisions and alternatives.
- `requirements.csv` — accepted/proposed deterministic requirements.
- `changes.csv` — controlled changes to frozen artifacts.

## Rule
Accepted architecture must never exist only in prose. It must be represented through ADR/REQ traceability.

## P1.0 status
The schemas are active. Inherited v0.1 competitor claims are being retro-filed and then re-verified against exact sources.
