# Build Execution Policy

## Phase 2
Freeze:
- build dependency graph,
- work-unit boundaries,
- interfaces,
- required migrations,
- acceptance gates,
- test obligations.

Do not freeze hundreds of speculative prompts.

## Phase 3
For each BU-####:
1. load only relevant frozen spec/REQ/ADR dependencies,
2. create a just-in-time implementation plan,
3. create the exact coding prompt,
4. execute,
5. run the predefined gate,
6. record result and failures,
7. preserve exact prompt + context + output metadata,
8. close or reopen the build unit.

Implementation discovery may create:
- a normal build decision if architecture is unaffected,
- CHG-#### if frozen architecture must change.

Never silently adapt architecture inside code.
