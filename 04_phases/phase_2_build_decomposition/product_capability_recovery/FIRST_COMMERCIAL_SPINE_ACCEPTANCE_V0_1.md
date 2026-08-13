# CPOS First Commercial Spine Acceptance v0.1

**Date:** 2026-08-13
**Status:** DRAFT PRODUCT GATE

A contractor-facing release is not accepted as a serious procurement product until the following journey works end to end in normal procurement vocabulary.

## 1. Material / Purchase Requisition

A user can create a numbered MR with header, lines, UOM, delivery/need-by information, project/cost attribution, attachments and approval state. Lines may reference master data or be free-form.

## 2. RFQ / Tender

Approved MR/package lines can be selected into a numbered RFQ without re-keying. The RFQ has bidders, due date, commercial instructions, response structure, documents and addenda. CPOS can preview and issue a professional PDF/structured schedule and support manual download/send from day one.

## 3. Supplier response / revision

Supplier quotations can arrive through a secure task or controlled file/manual path. Original documents and every revision remain immutable and visibly attributable.

## 4. Comparison / leveling

The buyer can compare suppliers line by line, including original price, normalized values, missing/excluded scope, alternates, lead time, validity, payment terms and deviations. Buyer adjustments are visible and never overwrite supplier source truth.

## 5. Recommendation / approval / award

The system records the recommended supplier/value, supporting comparison snapshot, non-lowest or exception justification, approval/authority evidence and AwardDecision.

## 6. LPO / PO / Subcontract formation

The approved award basis converts without re-keying into a numbered order/commitment draft with supplier/project/company details, awarded lines, commercial terms, attachments and a professional issue-ready document. Award remains distinct from effective commitment.

## 7. Operational visibility

The user has registers/queues for MR, RFQ, quotation coverage, comparison/approval and LPO/PO/subcontract status, plus supplier/compliance context and procurement milestones.

## 8. Acceptance rule

Every stage must include:
- usable list/register and drill-down view;
- automatic business numbering where applicable;
- attachments/document history;
- search/filter/status;
- user-visible permissions;
- printable/exportable output for business documents;
- predecessor/successor lineage;
- deterministic manual path with optional AI disabled;
- domain-owner `MEANING_PASS`;
- technical/hostile tests for load-bearing rules.

If any stage exists only as a database/API primitive, the commercial spine is not complete.
