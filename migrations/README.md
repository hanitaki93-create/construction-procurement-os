# SQL-first migrations

B01 migrations are forward-only historical records.

`000001_b01_technical_release_metadata.sql` creates technical release metadata only. It does not create tenant, principal, project, operation, evidence, procurement, reporting, P07, or AI state.

The migration runner:

- accepts ordered immutable six-digit IDs;
- hashes exact SQL bytes with SHA-256;
- rejects checksum drift;
- acquires a transaction-scoped PostgreSQL advisory lock;
- records applied build identity and timestamp;
- rolls back the complete pending batch on failure;
- supports status without fabricating applied state.
