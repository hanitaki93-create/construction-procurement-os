# P1.2 FT Public Evidence Matrix v0.1

**Date:** 2026-07-29  
**Scope:** classify public first-party evidence against FT-01–FT-10 after source capture.

Status values used here:

- `SUPPORTED_PRIMARY_PUBLIC`
- `MIXED_VARIANT_PUBLIC`
- `PRIMARY_UNOBSERVED_PUBLIC`
- `INSUFFICIENT_PUBLIC_EVIDENCE`

These map later into the roadmap closure taxonomy. A public support finding does not prevent later private primary contradiction from reopening it.

| FT | Current claim | Public evidence status | Evidence summary | Closure consequence |
|---|---|---|---|---|
| FT-01 | Prior/effective requirement authority exists before sourcing/commitment | `SUPPORTED_PRIMARY_PUBLIC` | Khansaheb sampled site requisitions precede LPO; Bechtel buyer roles place Engineering material requisition before bidder list/bid request/PO; ASGC RFQ presents contractor-origin BOQ/source values. | Corroborated across independent contractors; exact physical `AuthorizedRequirementBasis` form remains open. |
| FT-02 | Commitment binds existing allocation rather than creating scope authority itself | `PRIMARY_UNOBSERVED_PUBLIC` | Sources expose requisition/requirement before PO/subcontract but do not expose a distinct allocation-reservation authority comparable to RequirementAllocation. | Do not claim direct corroboration. Keep primary target open. |
| FT-03 | Award/approval is distinct from effective commitment | `SUPPORTED_PRIMARY_PUBLIC` | Bechtel/Fluor show bid evaluation/recommendation → approval/decision → PO/subcontract document finalization/execution. | Strong corroboration. |
| FT-04 | Supplier claim/application, buyer assessment/verification, certification/approval are separately reconstructable | `MIXED_VARIANT_PUBLIC` | Skanska standard terms separate contractor invoice/payment application from supervisory work-stage confirmation/quality approval and later payment; Fluor/Bechtel show invoice validation and quantity/progress review. Terminology/artifact count varies. | Core distinction supported, exact three-artifact shape remains primary-variable. |
| FT-05 | Fulfillment mechanisms are composable by economic scope/component | `SUPPORTED_PRIMARY_PUBLIC` | Skanska subcontract terms allow work-stage progress, stored materials, unit-price invoicing, hourly work and amendment work under the same subcontract governance; Khansaheb shows goods receipt and subcontract technical execution as distinct mechanisms in one contractor environment. | Strong support for composable mechanisms; anti-double-counting grain still later design. |
| FT-06 | Remeasurable work still has hard scope/cap conservation | `INSUFFICIENT_PUBLIC_EVIDENCE` | Public sources show quantity verification/unit-price mechanisms but do not expose how scope authority constrains remeasurement growth. | Remains targeted primary question. |
| FT-07 | Buyer recovery is distinct from supplier-agreed contract change and gross earned value | `SUPPORTED_PRIMARY_PUBLIC` | ALEC terms separately establish replacement-at-supplier-cost/LD remedies while PO/agreement price/spec and invoice acceptance remain distinct; Fluor roles separately reference backcharges/claims/change management. | Supports separate recovery family, but tax/application ordering remains variable. |
| FT-08 | Commercial truth can coexist with external/separate accounting authority | `SUPPORTED_PRIMARY_PUBLIC` | Khansaheb audit: procurement creates GRN then Accounts processes supplier invoice; Fluor CMSi is cross-functional while finance/accounting remain distinct disciplines. | Strong corroboration of procurement/accounting seam. |
| FT-09 | Rectification procurement either restores source capacity or requires additional authorized capacity | `PRIMARY_UNOBSERVED_PUBLIC` | ALEC supports third-party replacement and recovery, but no source exposes allocation-capacity treatment of replacement procurement. | CR-02 remains pre-build obligation + primary target. |
| FT-10 | One active authorized basis per exclusive scope is workable | `PRIMARY_UNOBSERVED_PUBLIC` | Public procedures do not expose simultaneous competing requirement authorities over identical physical scope. | Keep open; direct contractor case/interview/artifact required. |

## Cross-case variants

### V-01 — qualification placement

- Fluor: supplier profile is explicitly neither bid system nor qualification.
- ALEC: prequalification approval is a separate process.
- ASGC: registration enables portal participation; buyer-side eligibility logic is not exposed publicly.

**Result:** registration, qualification, eligibility and invitation should remain semantically separable.

### V-02 — supplier-added scope

ASGC permits vendors to add quotation items beyond contractor-origin BOQ lines.

**Result:** comparison must support supplier-added/unmapped lines instead of forcing every offered line into an RFQ source line at ingestion.

### V-03 — quote revision

L&T requires preservation of initial and post-negotiation final offer references.

**Result:** supplier economic revision is versioned evidence; negotiation cannot overwrite original source truth.

### V-04 — partial no-quote

L&T requires item-level `No Quote` for unquoted/NIL items.

**Result:** partial coverage gaps differ from whole-event decline/no-response.

### V-05 — receipt topology

Khansaheb audit reports materials generally delivered directly to site.

**Result:** receipt/GRN cannot require central inventory/warehouse ownership.

### V-06 — valuation mechanism diversity

Skanska standard terms distinguish work-stage progress, stored materials, unit-price, hourly and additional/amendment work.

**Result:** one fixed fulfillment/valuation mode per commitment type would be false.

## Public evidence conclusion

Current public-first-party challenge status:

- `SUPPORTED_PRIMARY_PUBLIC`: FT-01, FT-03, FT-05, FT-07, FT-08
- `MIXED_VARIANT_PUBLIC`: FT-04
- `PRIMARY_UNOBSERVED_PUBLIC`: FT-02, FT-09, FT-10
- `INSUFFICIENT_PUBLIC_EVIDENCE`: FT-06

No `CONTRADICTED_PRIMARY` finding was discovered in this sprint.

Public evidence materially raises confidence but does not erase the remaining unobserved assumptions.