# CPOS Technical / Document Approval Dependency Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Construction procurement often depends on technical approval of materials, samples, shop drawings, data sheets or proposed alternatives. CPOS needs to know whether that dependency is satisfied before recommendation/order where policy requires it, without becoming a full CDE/submittal-management product.

## Dependency object

### TechnicalApprovalDependency
- project/package/RFQ/quotation/award/order context;
- dependency type (material submittal, sample, mock-up, shop drawing, technical data, alternate approval, consultant/client approval or other governed type);
- required item/scope/vendor/brand reference;
- authoritative system mode: OWN_THIN / MIRROR / REFERENCE;
- external document/workflow reference where applicable;
- submitted/reviewed/current revision identifiers;
- status;
- reviewer/authority context where CPOS owns the thin gate;
- conditions/comments;
- evidence/source files or external links;
- required-before milestone/action.

Minimum normalized states:
`NOT_REQUIRED`, `REQUIRED_NOT_SUBMITTED`, `SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `APPROVED_WITH_COMMENTS`, `REJECTED`, `REVISION_REQUIRED`, `SUPERSEDED`.

## Boundary

Aconex/Procore/CDE may remain authoritative for document workflow and revision control. CPOS owns only the procurement dependency/gate, cached/reference status where permitted, and the evidence of what status was relied upon for a procurement decision.

## Journey integration

- RFQ may require suppliers to provide technical submissions;
- quotation/alternate mappings may create approval dependencies;
- comparison shows technical approval status beside commercial leveling;
- recommendation/award policy may block or condition award/order when required approval is unresolved;
- LPO/PO/Subcontract may record approval conditions and exact approved brand/revision.

## Controls

Technical approval state must never be inferred from a generic attachment. Historical decisions preserve the exact approval status/reference relied on at the time.

## Acceptance

A supplier proposes an alternate HVAC unit. The quotation is commercially attractive but requires consultant approval. CPOS shows the dependency in comparison, prevents unconditional award under the configured policy, records the approved technical revision from the CDE, then allows the confirmed approved model to flow into the recommendation/order without pretending CPOS owns the entire submittal workflow.