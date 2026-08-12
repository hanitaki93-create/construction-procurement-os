# B02-C3/C4 + B03 Independent Hostile Audit Prompt v0.2

Perform the combined independent hostile audit defined by:

1. `B02_C3_C4_B03_INDEPENDENT_HOSTILE_AUDIT_PROMPT_V0_1.md`
2. `B02_C3_C4_B03_INDEPENDENT_HOSTILE_AUDIT_PACKET_V0_1.md`
3. `B02_C3_C4_B03_AUDIT_SOURCE_RECONCILIATION_V0_1.md`

This v0.2 prompt supersedes v0.1 **only for the corrected mandatory session/auth source manifest**. All hostile focus areas, verdict wording, blocker format, output sections, invariant pressure, gate rules and non-claims in v0.1 remain mandatory.

## Mandatory source correction

Do not request or fail the package for `apps/api/src/session-resolver.ts`; that path does not exist and was listed in error in packet v0.1.

For the verified-session/authentication boundary, inspect instead the exact repository sources:

- `apps/api/src/app.ts` — contains the `AuthenticationSessionResolver` / verified-session contract and production fail-closed request boundary;
- `apps/api/src/session-resolver.test.ts` — dedicated hostile/regression tests for the resolver seam;
- `apps/api/src/main.ts` — runtime wiring.

Every other mandatory source in packet v0.1 Section 3 remains mandatory.

## Packaging requirement

The supplied archive is expected to be a full `git archive` of the exact audit-prep commit, not a narrative subset. Before issuing a verdict, mechanically confirm that all corrected mandatory paths are present. If any other mandatory source is absent, use the v0.1 FAIL contract and identify the missing path(s).

Then execute the full hostile audit and return exactly the sections and PASS/FAIL wording required by v0.1.
