# CPOS AI Procurement Wedge v0.1

**Date:** 2026-08-13
**Status:** PRODUCT-ARCHITECTURE DRAFT

## Principle

AI must enrich a complete deterministic procurement system. It must not be used to hide missing master data, missing document structures or missing business workflows.

## First high-value capability

`Supplier quote documents -> cited extraction -> RFQ-line mapping -> normalized comparison proposal -> human confirmation`

The system should accept messy PDF/Excel supplier quotations and propose:
- line/item mapping;
- quantity and UOM;
- unit rate and total;
- inclusions/exclusions;
- alternates/substitutions;
- lead time;
- validity;
- payment terms;
- warranty/commercial notes;
- unresolved scope gaps.

Every proposed value must retain an exact source citation and confidence/uncertainty state. Human review creates governed normalized/evaluated truth; AI never overwrites supplier source truth.

## Required deterministic prerequisites

Before this AI capability is meaningful, CPOS needs:
- real MR/RFQ line identity;
- item/service/free-form line identity;
- UOM registry;
- supplier and quotation revision identity;
- immutable source documents;
- four-layer comparison semantics;
- accepted human workflow without AI.

## Additional AI opportunities after the first wedge

- RFQ draft/scope generation from approved MR, drawings/specifications and scope libraries;
- commercial deviation and scope-gap detection;
- arithmetic and quote consistency checks;
- historical rate/price search and benchmarking;
- supplier shortlist recommendations using category, history, performance and capacity context;
- procurement schedule risk/long-lead alerts;
- recommendation and approval brief drafting;
- LPO/PO/subcontract particulars drafting from approved award basis;
- supplier/compliance document extraction and expiry classification;
- estimating-to-delivery handover extraction.

## Gate model

AI activation should be capability-specific rather than waiting for one monolithic final AI block. Each capability requires:
- deterministic manual path complete;
- product-owned input/output schema;
- evaluation dataset and pass threshold;
- provenance/citation;
- tenant isolation;
- human confirmation for load-bearing changes;
- safe fallback when provider/model is unavailable.

A later global AI substrate may consolidate provider policy, evaluations and governance, but it must not postpone the AI-ready data architecture required by the sourcing spine.
