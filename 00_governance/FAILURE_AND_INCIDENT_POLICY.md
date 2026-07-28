# Failure & Incident Policy

Failures during research, design, build, migration, deployment, or runtime are first-class records.

Use INC-#### for implementation/runtime failures that need root-cause tracking.

Every INC record must contain:
- detection,
- scope,
- exact affected build unit/commit/release,
- linked requirement/ADR,
- reproduction,
- root cause,
- fix,
- regression test,
- whether architecture changed.

A failed implementation is never deleted from history.
