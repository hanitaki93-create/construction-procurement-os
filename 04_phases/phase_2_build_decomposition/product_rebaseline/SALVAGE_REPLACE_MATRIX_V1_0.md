# CPOS Salvage / Replace Matrix v1.0

## Rule

Prior work is classified `KEEP`, `KEEP+EXTEND`, `SALVAGE_INTERNAL_ONLY`, `REPLACE_PRODUCT_SURFACE`, or `REJECT`. Reuse is justified by the new capability architecture, not by sunk cost.

| Prior area | Disposition | Treatment |
|---|---|---|
| B01 engineering foundation | KEEP | retain toolchain, monorepo, strict TS and CI conventions |
| B02 tenant/project/authority/RLS | KEEP+EXTEND | retain; extend only when new product semantics require it |
| B03 operations/idempotency/effects | KEEP | retain for issue/render/email/AI/integration effects |
| B04 object/evidence pipeline | SALVAGE_INTERNAL_ONLY | not on clean branch; cherry-pick provenance/artifact mechanisms only after capability adoption |
| B05 requirement/allocation | SALVAGE_INTERNAL_ONLY | not on clean branch; salvage conservation semantics only behind real MR/PR model if still valid |
| B05 current UI/API vocabulary | REJECT | no `Requirements & Allocation` primary workflow |
| B06 sourcing version/issue/addendum | SALVAGE_INTERNAL_ONLY | re-adopt exact-version issue/grant semantics only after RFQ capability spec accepts them |
| B06 supplier relationship/contact | REJECT AS MASTER MODEL | replace with serious supplier master/compliance model |
| current RFQ number field | REJECT | replace with governed numbering service |
| current free-text UOM | REJECT AS MASTER MODEL | replace with UOM registry and explicit free-form escape |
| current dashboard | REJECT AS PRODUCT ARCHITECTURE | historical harness only |
| comparison semantic layering | KEEP AS ARCHITECTURE | source -> normalized -> buyer adjustment -> confirmed basis |
| AwardDecision != Commitment | KEEP AS ARCHITECTURE | preserve while adding early PO/LPO formation |
| old B10 real-web-later sequence | REJECT | every rebuilt block includes real UI |
| old B16 commitment timing | REJECT | split early order/contract formation from later deep administration |
| deep P07 commercial administration | KEEP LATER | reopen after first procurement spine proves usable |
| AI only at final block | REJECT | data and bounded assistive AI designed into rebuilt spine |

## Clean-lineage rule

The canonical rebuild branch begins at accepted B03 main. No B04-B06 source file exists on the canonical rebuild unless intentionally ported under a new capability/block with explicit provenance, review and tests.

## Acceptance rule

A component is only considered reused when a rebuilt CapabilitySpecification names it in Backend Truth Mapping and the new block passes domain acceptance plus the applicable technical/hostile gates.