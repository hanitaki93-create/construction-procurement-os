# B01 SQL-First Migration Runbook

## Commands

```bash
pnpm infra:up
pnpm db:migrate
pnpm db:status
pnpm db:scan
```

## Rules

- Migration files are ordered immutable SQL records.
- Every file has a recorded checksum.
- The runner takes an advisory migration lock.
- Applied migration identity includes timestamp and build ID.
- A changed checksum is a hard failure.
- Failed transactional migrations roll back completely.
- There is no ORM auto-sync and no inferred destructive rollback.

The B01 migration creates technical migration/release metadata only. It must not contain tenant, identity, authentication, evidence or procurement tables.

## Clean rebuild

The PostgreSQL CI job creates a fresh PostgreSQL 18.4 database, applies migrations from zero, checks status, scans the catalog and proves checksum/concurrent-run behavior. In-memory substitutes cannot certify this gate.

## Schema targeting

The runner validates and sets the transaction-local schema search path before executing SQL. The same immutable migration can therefore rebuild into an isolated test schema without hard-coded business authority.

## Rollback

B01 data rollback is not a reverse SQL migration. Because B01 contains no business data:

- application/source rollback is a repository revert within the declared compatibility boundary;
- database test environments rebuild from zero;
- failed migrations roll back transactionally;
- later production schema history will use expand/migrate/verify/contract rather than destructive reverse inference.
