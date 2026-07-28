# Construction Procurement OS

Permanent system of record for the product's research, architecture, build decomposition, implementation, validation, and operational history.

## Core rule

**Never guess where project truth lives.**

Every important artifact must have a stable path, stable ID where applicable, lifecycle/status, upstream/downstream traceability, and explicit freeze/change rules.

## Current position

- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.0 — Research Control System**
- Phase 1 Roadmap: **v1.0 FROZEN**
- Phase 2+: locked until their entry gates pass.

Always start with [`PROJECT_STATE.md`](PROJECT_STATE.md).

## Repository layers

1. `00_governance/` — project rules, freeze/change control, traceability, build/failure policy.
2. `01_roadmaps/` — frozen phase/subphase roadmaps and approved replacements.
3. `02_research/` — sources, evidence, assumptions, questions, contradictions, primary workflows and competitor research.
4. `03_architecture/` — accepted ADRs, requirements and deterministic design.
5. `04_phases/` — execution record of each phase/subphase: status, checkpoints, audits, outputs and freezes.
6. `05_build/` — Phase 2/3 build graph, work units, gates, migrations, exact executed prompts and build decisions.
7. `06_product/` — actual product source code once construction begins.
8. `07_quality/` — golden threads, test plans/results, performance and security evidence.
9. `08_operations/` — deployments, runbooks, incidents, migrations and recovery once a live system exists.
10. `09_history/` — superseded artifacts, change history and releases.

## Truth vs execution

**Truth artifacts:** evidence, ADRs, requirements, frozen architecture.

**Execution artifacts:** prompts, code, migrations, tests, incidents.

A coding prompt may evolve when implementation reveals details. A frozen architecture requirement may not silently change because a prompt is inconvenient.

## Build philosophy

After Phase 1, Phase 2 freezes the implementation dependency graph, build-unit boundaries, interfaces, migrations, gates and test obligations. It does **not** generate hundreds of speculative coding prompts.

During Phase 3 each build unit receives a just-in-time prompt generated from the current frozen specification. The exact executed prompt, context manifest, result and gate outcome are preserved with that build unit.
