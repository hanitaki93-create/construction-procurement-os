# CPOS Scope of Works Library + Lessons Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

A company-wide library of reusable construction trade/package scope knowledge. It prevents every buyer/CA from starting from an old project's Word file and repeating historical scope gaps.

This is distinct from Item/Material/Service Master. Item Master describes reusable things bought; Scope Library describes reusable **package obligations, inclusions, exclusions, requirements and pricing structure**.

## Core objects

### ScopeTemplate
- immutable internal ID and governed template code;
- trade/category/package type;
- title and description;
- jurisdiction/company applicability;
- owner/steward;
- lifecycle state;
- current approved version.

### ScopeTemplateVersion
Versioned ordered content that may include:
- scope clauses / work requirements;
- standard inclusions;
- standard exclusions / boundary statements;
- coordination/interface responsibilities;
- submittal/sample/mock-up requirements;
- testing/commissioning requirements;
- quality/HSE/document requirements;
- materials/brands/specification references;
- provisional/optional items;
- required vendor returnables;
- price-breakdown/bid-form sections;
- checklist/risk prompts;
- standard attachments/reference documents.

### ProjectScopeInstance
A package/RFQ-specific governed instance created from an approved template version. Project tailoring is recorded as additions, removals or amendments without rewriting the company standard.

### LessonProposal
A structured suggestion from project/tender/award/change/closeout experience identifying a repeated scope gap, ambiguity, successful clause or commercial lesson. Promotion into the library requires review/approval.

## Lifecycle

Template: `DRAFT -> REVIEW -> APPROVED -> SUPERSEDED/RETIRED`

Project instance: `DRAFT -> REVIEW -> FROZEN_FOR_TENDER -> REVISED_BY_ADDENDUM/SUPERSEDED`

Lesson: `PROPOSED -> TRIAGED -> ACCEPTED/REJECTED -> INCORPORATED`

## Journey

Scope Library may seed Procurement Package, RFQ/Tender scope and bid-form structure. The exact source template/version remains traceable. An RFQ issue freezes the project-scope version used for that issue.

## User surfaces

- trade/category scope library;
- template/version editor with section ordering and tracked changes;
- compare versions;
- instantiate into project/package;
- project tailoring review;
- lesson proposals and approval queue;
- usage/history view showing projects/packages that used a version.

## Documents

Project Scope of Works can render to a professional annexure/PDF/Word-compatible export as part of RFQ or contract compilation. Generated output binds to the exact frozen scope instance/version.

## AI readiness

AI may propose clauses, detect differences against the company standard, classify lessons and identify likely scope gaps from historical changes/clarifications. AI cannot silently modify an approved library template or issued project scope.

## Acceptance

A buyer creates an Aluminium & Glazing package from an approved company scope template, tailors project-specific requirements, shows every deviation from the standard, issues the exact frozen scope with the RFQ, later records a lesson from a scope-gap clarification, and routes that lesson for controlled incorporation into the next template version.