# B01 Independent Conformance Review — Access and Upload Checklist

## Preferred method: complete GitHub access

Give the independent reviewer read access to the private repository and require inspection of exact commit:

`1344a64454154bc624197b2a885bad9f8da9dafc`

Repository:

`hanitaki93-create/construction-procurement-os`

Then provide:

`docs/build/B01_INDEPENDENT_CONFORMANCE_AUDIT_PROMPT.md`

This is the only preferred method because the review must inspect the complete exact tree, commit history/diff and GitHub Actions evidence.

## Fallback method: complete immutable archive

When repository access is unavailable, upload one complete archive generated from exact implementation commit `1344a64454154bc624197b2a885bad9f8da9dafc`. Do not upload only selected source files.

The archive must include at minimum:

- `.github/workflows/`;
- all root manifests/configuration and the lockfile;
- `apps/`;
- `packages/`;
- `migrations/`;
- `infra/`;
- `scripts/`;
- `tests/`;
- `docs/build/`;
- `docs/runbooks/`;
- the complete frozen B01 prompt;
- the Phase-2 physical architecture, invariant register, coverage matrix and build program.

Also upload separately for convenient review:

1. `docs/build/B01_INDEPENDENT_CONFORMANCE_AUDIT_PROMPT.md`;
2. `docs/build/B01_COMPLETION_EVIDENCE_V1_0_CANDIDATE.md`;
3. `04_phases/phase_2_build_decomposition/build_prompts/B01_P01_ENGINEERING_FOUNDATION_RUNTIME_SKELETON_V1_0_CANDIDATE.md`;
4. `docs/build/B01_VERSION_MANIFEST.md`;
5. `docs/build/B01_ARCHITECTURE.md`;
6. `docs/build/B01_F1_CHECKPOINT.md`;
7. `docs/build/B01_F2_CHECKPOINT.md`;
8. `docs/build/B01_F3_CHECKPOINT.md`;
9. `docs/build/B01_F4_CHECKPOINT.md`;
10. `docs/build/B01_F5_VERIFICATION.md`.

## GitHub Actions evidence

The reviewer should independently inspect these exact successful runs:

- B01 Verification: `30764286699`;
- B01 F3 PostgreSQL: `30764286728`;
- B01 F4 Adapters: `30764286725`;
- B01 F5 Release Evidence: `30764286720`.

Do not substitute screenshots or copied summaries when the actual run logs are accessible.

## Integrity checks

Before the review begins, confirm:

- repository/branch name is correct;
- implementation commit exactly equals `1344a64454154bc624197b2a885bad9f8da9dafc`;
- frozen B01 prompt blob SHA equals `18c6e7a91a7e3af7dbf9d6d40e3c06f2ffeee5ad`;
- the archive, when used, contains no `node_modules`, generated secrets or local credentials;
- the reviewer understands that later evidence-document commits do not change the immutable implementation target;
- B02 remains locked regardless of the verdict until project-owner acceptance is separately recorded.

## Invalid review conditions

The review is invalid and must return `NOT PROVEN` rather than PASS when:

- the reviewer cannot inspect the exact commit;
- only a cherry-picked subset is supplied;
- the frozen prompt is missing or altered;
- CI conclusions are supplied without inspectable definitions/tests;
- access limitations prevent repository-wide scope-exclusion review;
- the reviewer is asked to trust the builder's completion record as authoritative.
