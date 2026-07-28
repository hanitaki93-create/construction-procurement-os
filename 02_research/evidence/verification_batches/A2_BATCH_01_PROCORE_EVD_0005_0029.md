# A2 Batch 01 — Procore — EVD-0005 through EVD-0029

**Date:** 2026-07-28  
**Scope:** first 25 inherited external claims  
**Purpose:** trigger CP-03 A2+A3 audit before source verification scales.

## Result

- Claims reviewed: **25**
- `SUPPORTED`: **21**
- `CONTESTED`: **4** — EVD-0016, EVD-0022, EVD-0023, EVD-0025
- `WITHDRAWN`: **0**
- `PROPOSED` remaining in batch: **0**

## Evidence method

The batch reopened current exact Procore help/API/pricing sources rather than trusting the v0.1 source-family links. Exact sources were registered as SRC-0013 through SRC-0029 where the original seed records were too broad. Existing exact Bidding and Workflows seeds SRC-0005 and SRC-0006 were reviewed and marked VERIFIED.

Mechanics claims use official technical/help/API evidence (A). Marketing/commercial positioning uses official product/pricing evidence (B). User-pain claims use review/community evidence (C) and are never used to prove mechanics.

## Important dispositions

### Fully supported mechanics/capabilities

Bid packages, bid forms/bidders, bid leveling, conversion of leveled bids to PO/Subcontract, Commitments, custom approval workflows, Project Financials, payment applications/invoices, change management, ERP integrations, company/project-level contexts, REST API capability, unlimited-user positioning, and the bidding workflow chain all survived source verification with explicit scope.

### Contested inherited wording

- `EVD-0016` — **strong role/permission model**: the structured multi-level/granular permission model is supported; `strong` is subjective.
- `EVD-0022` — **standardized directory feeding all workflows**: Directory reuse in Bidding and company/project contexts is supported; `all workflows` is not.
- `EVD-0023` — **custom workflow templates with assigned reviewers and ball-in-court ownership**: templates/reviewers are supported; Ball in Court is explicitly a Submittals workflow mechanic and cannot yet be generalized to custom Workflows.
- `EVD-0025` — **source-of-truth model around project records**: centralization is supported, but universal authoritative-source semantics were not established by reviewed product documentation.

## Pain claims

- ACV-based annual pricing is verified from Procore's official pricing page; `high/non-transparent` remains user sentiment supported by current G2 review evidence.
- Learning curve/admin overhead and notification-management friction are supported only as recurring user-review themes, not universal product facts.

## Method issue surfaced

The batch exposed composite inherited claims that can contain independently testable assertions. This became CP-03 finding `FND-0009`; the P1.0 control spec now prevents composite parent claims from supporting ADRs/Requirements unless all material components are independently verified or split into atomic child EVD claims.

## Boundary

This batch verifies **Procore only**. It is a method stress test, not cross-market evidence and not permission to copy Procore's ontology into our architecture.
