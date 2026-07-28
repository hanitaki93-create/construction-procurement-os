# Architecture Truth

This directory contains **accepted deterministic architecture**, not raw research.

## Promotion rule
Research begins under `02_research/`. Once a decision is accepted and relevant gate conditions pass, it is promoted here as a versioned architecture artifact.

Recommended structure as areas activate:
- `decisions/ADR-####-name.md`
- `requirements/REQ-####-name.md`
- `domain/`
- `financial_core/`
- `state_machines/`
- `permissions_approvals/`
- `evidence_documents/`
- `integrations/`
- `reporting/`
- `ui/`
- `nonfunctional/`
- `ai_readiness/`

The register indexes remain under `02_research/control/`; this directory holds the accepted detailed artifacts.

Frozen architecture changes only through `CHG-####`.
