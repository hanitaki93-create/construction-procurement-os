# P12 — External Technical / Material Approval Dependency Interface v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Purpose:** define the minimum procurement/commercial interface to consultant/client/design-team technical approvals so the system can govern tender, award, commitment, manufacturing, delivery and payment dependencies without becoming a full submittal/CDE/document-review platform.  
**Primary CAL-001 status:** material submittal/client approval is supported as a real variable gate; exact mechanics/authority/location remain UNKNOWN.

## 1. Problem to solve

Construction procurement often depends on technical approval of:

- material/product data;
- shop drawings;
- samples/mockups;
- method statements where relevant;
- equipment selections;
- alternatives/VE proposals;
- technical compliance schedules;
- manufacturer data;
- colours/finishes;
- other project-specific submissions.

The procurement system must answer:

- what exact procurement scope/product/revision requires approval;
- who is responsible to submit it;
- who reviews/approves it externally;
- what revision was submitted;
- what decision was received;
- whether conditions/comments remain;
- what downstream procurement action is blocked/allowed;
- whether a later design/product revision made the old approval stale.

It must do this without claiming ownership of every consultant markup, drawing workflow or project document.

## 2. Mature-system pattern

Procore's Submittals model provides a useful boundary pattern:

- responsible contractor/submitter;
- reviewer/approver workflow roles;
- revision identity;
- current status/ball-in-court;
- planned submit/review dates;
- required-on-site date and lead time;
- attachments/document evidence;
- actual/confirmed delivery information.

P12 adopts only the procurement-critical semantics and can reference an external CDE/submittal system for the detailed document workflow.

## 3. Technical approval is not commercial approval

Keep separate:

### Internal commercial approval

> Are we authorized to award/commit this commercial basis?

### External technical approval

> Is this product/material/design/scope technically acceptable under project/client/consultant requirements?

One may be conditional on the other.

Examples:
- award approved subject to consultant material approval;
- early PO placed at risk before final technical approval;
- technically approved product later commercially re-negotiated;
- lowest bidder rejected because proposed product is technically noncompliant.

Never collapse technical approval into DOA status.

## 4. Candidate semantic boundary

### `TechnicalApprovalRequirement`

Semantic role representing a procurement-critical external approval obligation.

Candidate fields:
- requirement ID;
- project;
- source contract/spec/drawing/client requirement;
- affected DemandLine/RequirementAllocation/package/commitment line/scope partition;
- responsible supplier/subcontractor;
- approval type/category;
- required reviewer organization/role;
- required-by/latest-safe date;
- downstream gates affected;
- status projection;
- external system/reference where applicable.

Physical implementation may be a lightweight record, external reference or projection. Final model remains open.

### `TechnicalSubmissionRevision`

A specific submitted technical revision/evidence set.

Candidate identity:
- revision ID/number;
- submitted product/material/design basis;
- source documents/versions;
- supplier/manufacturer;
- submitter;
- submission time;
- external CDE/submittal ID;
- supersedes relation.

### `ExternalTechnicalDecision`

Reviewer response against an exact revision.

Candidate outcome:
- `APPROVED`;
- `APPROVED_WITH_COMMENTS/CONDITIONS`;
- `REVISE_AND_RESUBMIT`;
- `REJECTED`;
- `VOID/SUPERSEDED`;
- other later-evidenced terminology.

Decision must preserve reviewer/source/time/comments/evidence identity.

## 5. Revision lineage

Technical approval always applies to an identifiable basis.

Required chain:

`Requirement`

`→ Submission v1`

`→ Decision v1`

`→ Submission v2...n as required`

A later submission/revision does not erase old decisions.

The current approved technical basis must resolve to the exact accepted revision.

## 6. Approval scope / cardinality

Architecture must support:
- one approval covering one commitment line;
- one approval covering several related lines/products;
- one line requiring several approvals;
- package-level material approval;
- split award where each vendor has different technical basis;
- alternate/VE approval separate from compliant base.

Do not assume one submittal = one PO line.

## 7. Downstream gate policy

A TechnicalApprovalRequirement can affect specific transitions.

Candidate gate points:
- tender release;
- bid validity/compliance;
- award recommendation;
- award effectiveness;
- commitment effectiveness;
- manufacture/release-to-production;
- shipment;
- goods acceptance;
- progress certification;
- final payment/closeout.

Policy determines severity:
- informational;
- warning;
- hard block;
- overridable block.

P09 compliance/override primitives apply.

## 8. Conditional commercial award

P06 can approve award with a technical condition.

Example:

`AwardDecision = APPROVED SUBJECT TO MATERIAL APPROVAL TA-001`

Required:
- condition references TechnicalApprovalRequirement;
- condition states what transitions remain blocked;
- later decision resolves/rejects the condition;
- commercial award does not silently imply technical acceptance.

## 9. At-risk commitment / early procurement

Real projects may place early orders before final technical approval due to long lead.

Candidate exception path:
- approved early-procurement authority;
- technical approval still outstanding;
- supplier/contract risk allocation recorded;
- manufacture/release gate explicitly defined;
- financial exposure visible;
- later rejection/change consequences traceable.

Do not hide this by marking the product approved prematurely.

## 10. Technical basis vs supplier commercial basis

A supplier may change product/model/specification without changing price, or change both.

Keep:
- technical submission basis;
- supplier commercial offer/commitment basis;

linked but distinct.

If approved technical revision changes commercial economics:
- supplier commercial evidence/change process must update P06/P07 truth as applicable;
- technical decision alone cannot modify contract price.

If commercial substitution changes product basis:
- technical approval may become stale/revalidation required.

## 11. Staleness / invalidation

Technical approval may become stale when:
- drawing/spec revision changes requirement;
- supplier/model/manufacturer changes;
- approved alternative is withdrawn;
- material source/country changes where relevant;
- client requirement changes;
- approved sample/finish differs from later order;
- approval validity expires if applicable.

Candidate response:
- `REVALIDATION_REQUIRED`;
- new submission revision;
- explicit determination that prior approval remains applicable.

Never silently carry approval from an old technical basis to a new one.

## 12. Conditions/comments

`APPROVED_WITH_COMMENTS` must not be flattened to ordinary APPROVED if comments create obligations.

Candidate condition handling:
- non-blocking informational comment;
- required revision before manufacture;
- required confirmation before delivery;
- field-installation condition;
- commercial/technical clarification required.

Conditions can create P09 tasks/compliance checks and remain linked to the technical decision.

## 13. External CDE/submittal authority

Possible ownership models:

### External system authoritative

Product stores:
- external approval ID;
- revision/status;
- reviewer/time;
- evidence link;
- freshness/sync metadata;
- downstream gate projection.

### Product lightweight ownership

Product can record/substantiate submissions/decisions directly where contractor has no dedicated CDE workflow.

### Hybrid

Product owns procurement requirement/gate; external system owns detailed submission/review workflow.

P08 field/event authority semantics apply.

## 14. Evidence requirements

At minimum preserve:
- exact submitted revision;
- response/decision document/message;
- reviewer organization/person/role where available;
- decision time;
- external reference;
- comments/conditions;
- source version/location;
- supersession/revalidation lineage.

The procurement system need not store large drawing packages itself if an external CDE is authoritative.

## 15. Schedule / long-lead integration

P10 may use TechnicalApprovalRequirement as a milestone/dependency.

Candidate planned dates:
- supplier submit by;
- internal review complete;
- external submission;
- required approval/drop-dead date;
- actual approval.

Technical decision actual date derives from P12 evidence.

A rejected/resubmitted revision affects forecast without overwriting baseline plan.

## 16. Supplier responsibility

The system should preserve who owes the submission:
- bidder before award;
- selected supplier;
- subcontractor;
- manufacturer;
- internal design/procurement team;
- nominated specialist.

Responsibility may transfer after award; history remains.

## 17. Edge cases

### E01 — Award approved subject to consultant approval

Required: award valid internally but downstream commitment/manufacture gate remains conditional.

### E02 — PO issued early, manufacturing prohibited until approval

Required: commitment effective may exist while production-release task remains blocked.

### E03 — Supplier submits alternate product

Required: alternate technical lineage separate from compliant base; commercial comparison/change updates if selected.

### E04 — Approved product changes model number

Required: determine revalidation; do not inherit approval automatically.

### E05 — Consultant approves with comments requiring revised drawing

Required: conditional decision + open obligation; exact gate policy explicit.

### E06 — Submittal rejected twice

Required: revisions/decisions preserved; P10 forecast/slippage derived.

### E07 — Technical approval arrives by email outside CDE

Required: controlled evidence capture/on-behalf record; source email retained.

### E08 — External CDE status stale

Required: freshness warning/block at critical transition under P08 policy.

### E09 — One approval covers three PO lines

Required: many-to-many linkage without duplicating decision.

### E10 — Split award uses two different approved manufacturers

Required: separate technical bases linked to each supplier/allocation.

### E11 — Approval revoked after manufacturing begins

Required: revoke/supersede event + explicit commercial/change/risk consequences; do not delete old approval.

### E12 — Approval not required for commodity item

Required: TechnicalApprovalRequirement absent/NOT_APPLICABLE; no fake workflow.

## 18. Failure patterns to reject

Fail later audit if design:
- equates commercial approval with technical approval;
- stores only current approval status with no revision basis;
- assumes one technical approval per PO line;
- lets technical approval modify commercial price silently;
- lets changed product inherit old approval without validation;
- treats approved-with-comments as unconditional without condition semantics;
- forces a full CDE/submittal platform to support procurement gating;
- cannot operate when approval evidence arrives by email/manual external process;
- duplicates authoritative status between CDE and product with no authority/freshness rule;
- makes all procurement require technical approval.

## 19. Primary audit tests later

1. Which material/subcontract packages require consultant/client approval?
2. At what stage: before tender, award, PO, manufacture, delivery, payment?
3. Who prepares/submits material submittals?
4. Where is the submittal actually tracked today?
5. What are real response/status terms?
6. How are revisions numbered and superseded?
7. How are approved-with-comments conditions handled?
8. Can procurement proceed before approval under exception?
9. What happens if technical approval changes price/scope?
10. Does one approval cover several PO/subcontract lines?
11. How are long-lead dates linked to approval timing?
12. Which system/document is authoritative evidence in disputes?
13. What happens when specs/drawings change after approval?
14. Are warranty/closeout documents tied back to approved material basis?

## 20. Current disposition

### Strong enough to carry forward provisionally
- technical approval separate from commercial approval;
- exact requirement/submission revision/decision lineage;
- many-to-many scope linkage;
- conditional award/commitment/manufacturing gates;
- early-procurement exception path;
- technical vs commercial basis distinction;
- staleness/revalidation after basis changes;
- conditional approval obligations;
- external CDE/lightweight/hybrid authority modes;
- P10 schedule dependency integration;
- no full submittal/CDE product required by default.

### Still unresolved
- exact P12 object decomposition;
- default technical response/status vocabulary;
- external reviewer identity model;
- CDE connector depth;
- technical approval gates by package type;
- approved-with-comments policy;
- technical document storage/markup depth;
- exact UAE consultant/client material approval practice.

## 21. Impact on P1.1 / scope

No P1.1 reopening proposed.

P12 formalizes an external dependency already observed in CAL-001 and earlier P01/P03/P06/P10 work. It keeps broad submittal/CDE management outside the procurement-commercial core unless later primary evidence proves deeper ownership necessary.

## 22. Next step

Integrate P01–P12 as the complete provisional operational workflow set and run the next internal hostile/burden checkpoint. External sourcing B5/B6 recheck remains pending and must still run when reviewer availability returns.