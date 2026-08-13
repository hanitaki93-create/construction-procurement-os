# CPOS Domain Meaning Gate v0.1

**Date:** 2026-08-13
**Status:** REQUIRED FOR RECOVERED PRODUCT CAPABILITIES

Technical correctness and product meaning are separate gates.

Before a recovered/new capability receives implementation authorization, the domain reviewer records one of:

- `MEANING_PASS`
- `MEANING_FAIL`
- `MEANING_PENDING`

## Meaning review questions

The reviewer must be able to answer YES to all applicable questions:

1. Does the capability use the vocabulary a real contractor/procurement team expects?
2. Are the header/line/detail fields sufficient for real work rather than a demo?
3. Can master/reference data be reused without blocking legitimate free-form construction procurement?
4. Is the displayed document number handled automatically and professionally where expected?
5. Are approvals, revisions, cancellations and exceptions understandable to the user?
6. Can the capability produce the business document/export that people actually exchange outside the software?
7. Does it connect to its predecessor and successor without unnecessary re-keying?
8. Are source data, working data, buyer adjustments and final commercial truth clearly distinguished?
9. Do the registers/status views answer the questions a procurement manager actually asks every day?
10. Would the workflow still make sense to a company already using an ERP?
11. Is there a credible advantage beyond recreating the ERP field in another screen?
12. Are AI opportunities grounded in deterministic product objects and human-verifiable source evidence?

## Gate rule

`MEANING_PASS` does not replace technical review. It authorizes the product meaning for implementation; invariant/security/concurrency/architecture gates still apply separately.

`TECHNICAL_PASS` cannot override `MEANING_FAIL`.

No block is called commercially complete until both meaning and technical acceptance pass.
