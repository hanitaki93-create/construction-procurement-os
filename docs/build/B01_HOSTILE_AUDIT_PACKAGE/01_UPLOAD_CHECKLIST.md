# B01 Independent Re-audit Upload Checklist

**Version:** 1.1  
**Audit target:** `3f4d89eea1d44b94d458cfb5f4e9dcc2c9b9f6e8`

## Required upload

Provide the auditor one ZIP containing:

- `00_READ_ME_FIRST.txt`;
- `IMPLEMENTATION_SHA.txt` matching the exact target above;
- `SHA256SUMS.txt`;
- `01_IMPLEMENTATION_SNAPSHOT/`;
- `02_AUDIT_MATERIALS/`.

## Mandatory hidden-file contents

The implementation snapshot must contain and preserve:

- `.github/workflows/`;
- `.node-version`;
- `.gitignore`;
- `.dockerignore`;
- `.env.example`;
- `.npmrc`, `.nvmrc`, `.prettierignore` and `.gitleaks.toml` where committed.

The exporter must use hidden-file inclusion when creating the downloadable artifact. A correct `git archive` followed by an artifact uploader that excludes hidden files is not acceptable.

## Other mandatory contents

- all source and test files;
- manifests and `pnpm-lock.yaml`;
- Dockerfiles and Compose files;
- migrations, fixtures and scripts;
- all B01 build and architecture documents;
- the freeze package and hostile-audit package;
- the first-audit findings, remediation record and targeted re-audit prompt.

## Do not provide

- cherry-picked files;
- screenshots as a substitute for source;
- only successful logs;
- generated `node_modules`;
- local secrets, credentials or private keys;
- a moving branch without pinning the implementation commit.

## Auditor confirmation

Before reviewing, the auditor must state:

- archive identity;
- exact commit reviewed;
- whether full source, tests, workflows and dotfiles were available;
- the result of a hidden-entry check;
- any evidence that could not be accessed.

A review against another commit or an archive missing hidden files is not a verdict on this remediated B01 candidate.
