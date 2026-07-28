# Build System

This area activates after Phase 1 passes and Phase 2 defines the implementation dependency graph.

## Principle
Freeze **build units and gates**, not hundreds of speculative prompts.

Phase 2 defines:
- dependency graph,
- `BU-####` work-unit boundaries,
- interfaces,
- migrations,
- acceptance gates,
- test obligations.

Phase 3 executes one unit at a time.

For each executed `BU-####`, preserve:
- frozen spec/REQ/ADR dependencies,
- just-in-time implementation plan,
- exact executed coding prompt,
- context manifest,
- code/commit reference,
- migrations,
- tests,
- gate result,
- deviations/failures.

Implementation discoveries that do not affect architecture are build decisions. Anything that changes frozen architecture requires `CHG-####`.
