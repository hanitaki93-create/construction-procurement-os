# R00 Product Rebaseline Gate v0.1

R01 implementation is locked until R00 closes.

## Required outputs

1. Complete retained-capability inventory with no orphan SPINE/required Phase-1 area.
2. Current competitor evidence matrix by capability, distinguishing official documentation, workflow video/demo evidence, primary contractor evidence and inference.
3. Accepted CapabilitySpecification for every R01-R08 capability before its owning block begins.
4. User vocabulary/navigation model: backend ontology terms marked INTERNAL where not intended for ordinary UX.
5. Master/reference architecture including supplier, item/service, UOM, category/trade, cost/WBS, currency/tax/payment terms and locations.
6. Numbering policy with uniqueness/gap/concurrency/reissue semantics by document class.
7. Document/template boundary and professional output requirements for MR, RFQ, comparison/recommendation and LPO/PO/Subcontract.
8. Revised product/data architecture and salvage/replace matrix.
9. Rebuilt block program and predecessor/successor dependencies.
10. Capability-completeness compiler/check capable of failing build authorization when required product meaning is absent.
11. Domain owner `MEANING_PASS` on the first commercial spine and each capability before implementation.
12. Independent architecture review of load-bearing semantic changes before those changes are merged.

## Product proof scenarios required before R00 closure

### Scenario A — material purchase
Site user raises a 10+ line MR with item/free-form lines, UOM, need-by, location, attachments and cost distributions; approver approves selected lines; procurement sends selected lines to an RFQ without re-keying; three suppliers respond; comparison is built; award is approved; LPO is produced and issued.

### Scenario B — subcontract/package tender
Procurement creates a package/tender with scope documents and structured price breakdown; invitees respond with revisions/exclusions; buyer levels bids, records clarifications and non-lowest justification; award creates an issue-ready subcontract/commitment basis.

### Scenario C — ERP coexistence
CPOS owns sourcing/decision evidence while an external ERP remains authoritative for selected finance/AP/inventory fields. Handoff, external IDs, rejection/reconciliation and stale state are explicit.

### Scenario D — AI assisted leveling
Buyer uploads inconsistent PDF/Excel quotations. AI proposes extracted values and mappings with source citations/confidence. Human confirms/corrects. Supplier source truth remains immutable and the final comparison is reproducible.

## Fail conditions

R00 fails if any required capability is represented only by an internal primitive, if any business document has no output disposition, if any numbered document lacks numbering semantics, if any master-data reference is replaced by arbitrary free text without an explicit escape policy, or if a coder would need to invent field/workflow meaning during implementation.