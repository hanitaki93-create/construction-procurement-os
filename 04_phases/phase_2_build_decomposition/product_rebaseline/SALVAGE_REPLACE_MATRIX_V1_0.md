# CPOS Salvage / Replace Matrix v1.0

## Classification rule

Each prior component is `KEEP`, `KEEP+EXTEND`, `SALVAGE_INTERNAL_ONLY`, `REPLACE_PRODUCT_SURFACE`, or `REJECT`. Reuse is justified by the new capability architecture, not by sunk cost.

| Prior area | Disposition | Rebaseline treatment |
|---|---|---|
| B01 engineering foundation | KEEP | retain toolchain, monorepo, strict TS, CI conventions |
| B02 tenant/project/authority/RLS | KEEP+EXTEND | retain; later extend organization/master-data authority as required |
| B03 operations/idempotency/effects | KEEP | retain as infrastructure for issue/email/render/AI/integration effects |
| B04 object/evidence pipeline | SALVAGE_INTERNAL_ONLY | retain provenance, immutable versions and artifact machinery; ordinary UX uses Documents/Attachments/Quotes/Licences/etc. |
| B05 authorized requirement/allocation | SALVAGE_INTERNAL_ONLY | retain conservation/guard semantics where valid; add first-class MR/PR header, lines, distributions and user lifecycle |
| B05 current UI/API vocabulary | REPLACE_PRODUCT_SURFACE | no ordinary `Requirements & Allocation` primary workflow |
| B06 sourcing version/issue/addendum | KEEP+EXTEND | retain exact-version issue semantics; rebuild RFQ formation around real lines, terms, documents and numbering |
| B06 external grants | KEEP+EXTEND | retain as secure participation substrate |
| B06 supplier relationship/contact | REPLACE_PRODUCT_SURFACE | migrate/extend into serious supplier master, addresses, contacts, registrations, compliance, categories and eligibility |
| current RFQ event number text field | REJECT | replace with governed numbering service |
| current free-text UOM key | REJECT as user/master model | replace with UOM registry; adapters may map legacy values |
| current dashboard | REJECT as product architecture | may remain developer harness only |
| planned supplier submissions | KEEP CONCEPT | rewrite against accepted RFQ/quote capability specs |
| planned normalization/comparison layering | KEEP STRONGLY | preserve supplier truth -> normalized -> buyer adjustment -> confirmed basis |
| planned recommendation/approval/award distinction | KEEP | productize with real registers, documents and decisions |
| old B10 'real web later' sequencing | REJECT | every rebuilt block ships its own real user surface |
| old B16 full commitment timing | REJECT | split early PO/LPO/subcontract formation from later deep commercial administration |
| P07 deep change/claims/retention/certification | KEEP LATER | retain as later commercial-administration program |
| AI-only-at-end interpretation | REJECT | keep AI authority governed, but design schemas and bounded assistive AI into the rebuilt spine |

## Migration rule

No destructive migration from rejected B05/B06 product tables is required until the replacement object model is accepted. Where possible, new user-facing objects may map to or supersede old internal primitives. If an old primitive forces incorrect product meaning, replace it rather than wrapping it indefinitely.

## Acceptance rule

No component is called `reused` until at least one rebuilt capability spec names it explicitly in Backend Truth Mapping and its hostile/domain tests pass.