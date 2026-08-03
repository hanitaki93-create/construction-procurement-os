# B01 Independent Audit Upload Checklist

**Version:** 1.0  
**Audit target:** `1344a64454154bc624197b2a885bad9f8da9dafc`

## Preferred review method

Give the auditor read access to:

- the complete private repository;
- PR #1;
- branch `build/b01-engineering-foundation`;
- the exact implementation commit above;
- GitHub Actions run and job evidence cited in the frozen manifest.

Then provide the complete contents of `02_HOSTILE_AUDIT_PROMPT.md` as the audit instruction.

## Archive fallback

When repository access is impossible, provide one unmodified full-repository archive generated from the exact implementation commit.

The archive must include:

- all source and test files;
- dotfiles;
- `.github/workflows/`;
- manifests and `pnpm-lock.yaml`;
- Dockerfiles and Compose files;
- migrations, fixtures and scripts;
- all B01 build and architecture documents;
- the freeze package and hostile-audit package.

## Do not provide

- cherry-picked files;
- screenshots as a substitute for source;
- only successful logs;
- generated `node_modules`;
- local secrets, credentials or private keys;
- a moving branch without pinning the implementation commit.

## Auditor confirmation

Before reviewing, the auditor must state:

- repository/archive identity;
- exact commit reviewed;
- whether full source, tests and workflows were available;
- any evidence that could not be accessed.

A review against a different commit is not a verdict on this B01 candidate.
