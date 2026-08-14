# Architecture V2 Session 01 — Live Build Surface

This is implementation status, not architecture authority.

Current live implementation tranche:
- procurement schema migration `000014_v2_session01_supplier_mr.sql`;
- governed UOM starter references;
- Supplier/Subcontractor master persistence with primary contact + compliance base;
- Item Master persistence base;
- serialized MR numbering counter;
- Material/Purchase Requisition header + lines + distributions persistence;
- governed procurement service with tenant/principal authentication binding and role-aware writes;
- live HTTP endpoints for reference data, supplier register/create, MR register/create/detail/submit;
- API/contract/service tests.

Still in progress in this session:
- internal procurement UI;
- item/delivery/cost master management surfaces;
- MR cost-distribution editing;
- approval/review flow;
- route decision and demand-conservation foundation;
- file/attachment/issued-artifact foundation;
- professional MR document rendering/output;
- PostgreSQL hostile integration tests and concurrency tests;
- CI/debug closure.

The branch is intentionally incomplete until the vertical user journey is coherent.
