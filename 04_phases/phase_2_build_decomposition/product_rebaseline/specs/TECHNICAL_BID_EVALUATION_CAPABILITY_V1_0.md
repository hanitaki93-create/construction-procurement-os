# CPOS Technical Bid Evaluation / Two-Stage Tender Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

For complex subcontract/equipment procurement, commercial price alone is not enough. CPOS must support structured technical compliance/evaluation and, where policy requires it, technical qualification before commercial bids are opened or used for award.

## Tender policy modes

A product-owned RFQ/Tender policy may select:
- combined technical + commercial response;
- separate technical/commercial sections with both visible to authorized evaluators;
- governed two-stage/two-envelope evaluation where commercial content remains restricted until the technical-opening/evaluation condition is satisfied.

This is a bounded procurement policy, not a general workflow designer.

## Technical response structure

The tender may request/evaluate:
- scope compliance matrix;
- proposed brand/model/system;
- specification compliance/deviations;
- method statement or technical narrative;
- programme/lead-time capability;
- manpower/resources where relevant;
- required certifications/experience;
- submittals/data sheets/samples;
- alternates/value-engineering proposals;
- required returnable documents.

## TechnicalEvaluation

For each bidder and relevant criterion/line:
- source response/document references;
- evaluator(s);
- status such as COMPLIANT / PARTIALLY_COMPLIANT / DEVIATION / CLARIFICATION_REQUIRED / NON_COMPLIANT / NOT_APPLICABLE;
- comments/conditions;
- score only where a governed scoring scheme is configured;
- clarification linkage;
- technical approval dependencies where downstream consultant/client approval is still required;
- frozen evaluation version/snapshot.

## Commercial-opening gate

Where two-stage policy applies, commercial response visibility/opening is a governed event with authorization/time/evidence. Technical evaluation outcome can qualify bidders for commercial consideration without deleting the commercial submission of a non-qualified bidder.

## Decision integration

Comparison shows technical evaluation status beside commercial leveling. Recommendation identifies unresolved/conditional technical matters. Technical evaluation is distinct from TechnicalApprovalDependency: evaluation judges the tender response; dependency may represent later external material/submittal approval.

## AI boundary

AI may summarize technical submissions, map compliance evidence and propose deviation classifications with source citations/confidence. Human technical evaluation/approval remains explicit. AI cannot silently mark a bidder technically compliant or open restricted commercial content.

## Acceptance

A major HVAC tender is issued with separate technical and commercial response sections. Technical evaluators review models/data sheets/deviations and request clarifications, two bidders pass and one fails the governed technical stage, commercial bids are opened only for authorized comparison under policy, and the final recommendation preserves the technical evaluation/evidence without deleting or rewriting any supplier submission.