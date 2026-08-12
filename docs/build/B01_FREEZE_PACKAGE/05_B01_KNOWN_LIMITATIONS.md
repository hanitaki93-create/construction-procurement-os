# B01 Known Limitations and Expected Non-Findings

**Version:** 1.0  
**Status:** Freeze candidate

## Intentional limitations

B01 is an engineering foundation, not a usable procurement product. The following are intentionally absent and are not audit defects:

- business-domain tables and workflows;
- authentication and authorization models;
- suppliers, RFQs, comparisons and commercial approvals;
- purchase requisitions, purchase orders, commitments and contracts;
- receiving, invoices, payments, budgets and business reporting;
- evidence-acceptance authority;
- AI models, agents, recommendations or decision rights;
- production cloud-provider commitment;
- production deployment approval;
- complete workflow-level WCAG certification.

## Foundation-level limitations

- SeaweedFS, ClamAV and the OpenTelemetry Collector are local contract-test substrates, not final production-provider selections.
- Browser accessibility evidence covers the technical shells and foundational controls only.
- The API and worker expose technical lifecycle behavior only.
- Test schemas and deliberately unsafe concurrency fixtures are verification-only and must not enter product migration inventory.

## Findings that remain valid

An auditor should still report a defect when an intentional limitation is contradicted by implementation, when a technical mechanism is unsafe or non-reproducible, or when B01 creates hidden product authority despite the stated boundary.

## Successor impact

Later blocks may require controlled extension. A future requirement that cannot fit the current structure must be handled through an ADR, impact analysis, migration plan and a new verified baseline rather than silent mutation or project termination.
