# Traceability Model

Primary chain:

`SRC → EVD → ASM/Q/CON → ADR → REQ → SPEC → GT → BU → COMMIT → TEST → RELEASE`

Failure chain:

`INC → affected COMMIT/BU/REQ/ADR → root cause → corrective CHG/BU → regression TEST`

Migration chain:

`MIG → source schema/data → mapping → validation → execution → reconciliation → rollback evidence`

This chain is the reason the repository exists.
