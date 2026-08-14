# CPOS V2 — Phase-1 Scope Reopen Decisions v0.1

**Status:** AUDIT INPUT / NOT FROZEN
**Purpose:** Architecture V2 must not silently mutate the frozen P1.1 84-area classification. This register identifies material promotions/additions created by the 2026 product rebaseline and the evidence/boundary that justifies each.

## Rule

Unlisted Phase-1 scope remains preserved at its prior semantic boundary unless Architecture V2 explicitly clarifies its implementation timing. A promotion requires evidence and must survive hostile review before V2 freeze.

## SR-V2-01 — Supplier capacity/exposure intelligence

**P1.1:** `MAS-05 Vendor capacity/exposure optimization = OUT`.

**V2 proposal:** `CAP-047 = REQUIRED_THIN` deterministic performance/workload/exposure intelligence.

**Evidence change:** Current ProcurePro Vendor Management makes workload/capacity risk, company-wide tender/contract activity and performance visible in procurement decisions. Procore now exposes vendor project/performance/financial history in Bid Leveling. BuildingConnected/TradeTapp integrates qualification/risk into estimating/bid selection.

**Boundary:** V2 does **not** implement predictive optimization or opaque AI capacity scoring in first spine. It exposes deterministic facts and transparent indicators. Predictive optimization remains later.

**Decision:** PROMOTE OUT -> REQUIRED_THIN, subject to hostile review.

## SR-V2-02 — AI quotation extraction / leveling

**P1.1:** AI extraction/copilot/autonomy was OUT from deterministic V1 because it was considered XL + cheap-to-retrofit.

**V2 proposal:** `CAP-027` source-cited AI quotation extraction becomes an R06 DIFFERENTIATOR.

**Evidence change:** Specialist construction procurement products now commercially expose AI bid leveling/extraction, and the project target explicitly requires value beyond an ERP. The deterministic provenance/comparison substrate is designed first; AI remains bounded proposal-generation with human confirmation.

**Boundary:** No autonomous award, silent normalization, source mutation or unrestricted agent authority. If AI delays deterministic spine delivery, deterministic R06 comparison ships first and AI remains separately gated.

**Decision:** PROMOTE bounded extraction only; broad copilot/autonomy remains later.

## SR-V2-03 — Contract execution / eSignature lifecycle

**P1.1:** `COM-03 E-signature = INTERFACE-ONLY`.

**V2 proposal:** `CAP-048` makes **execution state/evidence** product-owned in R08 while cryptographic/signature-provider service remains provider-neutral/interface.

**Evidence change:** ProcurePro treats contract generation, sending, signature tracking/reminders and signed-artifact storage as one procurement workflow. A mere PDF generation state is insufficient to know whether procurement actually achieved an executed instrument.

**Boundary:** CPOS owns ExecutionCase/status/provenance. Native trust/signature technology may remain external; DocuSign/other provider integrations are adapters. Manual/external execution is valid.

**Decision:** CLARIFY/EXTEND interface boundary, not rebuild a signature trust platform.

## SR-V2-04 — Procurement schedule moved earlier

**P1.1:** `PRC-01 Procurement plan and milestone schedule = THIN`.

**V2 proposal:** `CAP-049` core schedule is REQUIRED in R03/R04; portfolio analytics remain R09.

**Evidence change:** ProcurePro positions the live procurement schedule as the organizing operational spine from estimating handover through signed contract. Introducing schedule only after sourcing/award would require duplicate late planning and weaken long-lead control.

**Boundary:** No CPM/master construction scheduling engine. V2 owns procurement milestones only; required/baseline/forecast/supplier-confirmed/actual semantics remain simple and deterministic.

**Decision:** THIN capability retained but SEQUENCED EARLY; not promoted to general scheduling platform.

## SR-V2-05 — Scope of Works Library + lessons

**P1.1:** No dedicated retained user capability specified at the product level; scope/package documents were spread across procurement/document concepts.

**V2 proposal:** `CAP-045` REQUIRED company Scope Library with project instances and controlled lessons feedback.

**Evidence change:** ProcurePro exposes Scope of Works Library as a central construction-procurement capability specifically to reduce repeated scope gaps and standardize trade procurement.

**Boundary:** Product-owned structured content/versioning, not a general CMS/no-code rules platform. Lessons are proposals requiring approval before company-standard promotion.

**Decision:** ADD REQUIRED specialist capability, subject to hostile review.

## SR-V2-06 — Estimating / pre-award handover

**P1.1:** No dedicated first-class handover capability.

**V2 proposal:** `CAP-046 = REQUIRED_THIN` in R03.

**Evidence change:** ProcurePro AI Estimating Handover explicitly carries vendors, quotes, notes, risks and opportunities into delivery; Procore has also expanded estimating-to-bidding integration. Repricing/re-sourcing from disconnected folders is a specialist-product weakness V2 should avoid.

**Boundary:** Import/handover seam only; CPOS is not an estimating engine. Source handover remains historical context, not current budget or award truth.

**Decision:** ADD REQUIRED_THIN.

## SR-V2-07 — Supplier registration/qualification

**P1.1:** `MAS-03 Vendor qualification/compliance documents = THIN`, `MAS-08 minimum eligibility/compliance = SPINE`, `EXT-02 Supplier self-registration = THIN`.

**V2 proposal:** `CAP-051 = REQUIRED_THIN` registration + contextual qualification/requalification, while keeping minimum eligibility efficient enough for first tender.

**Evidence change:** SAP Ariba and BuildingConnected/TradeTapp demonstrate explicit registration/qualification/risk lifecycles; V2's target is top-tier procurement coexistence, not supplier-name-plus-email master data.

**Boundary:** No mandatory heavy SRM implementation before first tender; product-owned qualification schemes remain bounded and task-focused.

**Decision:** CLARIFY and strengthen existing THIN scope.

## SR-V2-08 — Technical approval dependency

**P1.1:** `DOC-05 Submittals/RFI/transmittal management = OUT`; DI-14 explicitly required procurement dependency/gate semantics while allowing Aconex/CDE to remain authoritative.

**V2 proposal:** `CAP-053 = REQUIRED_SEAM` TechnicalApprovalDependency.

**Boundary:** No full CDE/submittal workflow. CPOS owns/references only the procurement gate/status/evidence relied on for commercial action.

**Decision:** RESTORE omitted DI-14 seam without reopening full CDE.

## SR-V2-09 — Framework / blanket / rate agreement path

**P1.3 DI-09:** explicitly retained architecture distinction between CommercialTermsAuthority and scope-consuming call-off; CMiC supports blanket orders/releases.

**V2 proposal:** `CAP-054` restored as POST_SPINE retained architecture.

**Boundary:** Does not block first MR->RFQ->award->order journey. Agreement itself does not consume scope unless a true minimum obligation exists.

**Decision:** RESTORE ARCHITECTURE; defer implementation unless pilot priority changes.

## SR-V2-10 — Evidence/document provenance on clean lineage

**P1.1:** `DOC-01` and `DOC-02` are SPINE/retrofit-impossible.

**V2 issue:** clean rebuild starts at accepted B03 and therefore does not inherit rejected B04 evidence implementation.

**V2 proposal:** `CAP-050` REQUIRED R01 explicit rebuild of file/source/issued-artifact provenance.

**Decision:** NOT a scope promotion; mandatory restoration of frozen SPINE substrate on the clean implementation lineage.

## Audit question

The hostile reviewer must determine whether each promotion/addition above is justified, whether any creates a second independent XL gravity well, and whether any cheaper boundary can preserve the commercial product target without losing required product meaning.