# CP-05 Concise Inspection Bundle v1.0

**Purpose:** Minimal artifact bundle for independent CP-05 inspection without requiring repository browsing.

## 1. ADR index

| ADR | Decision | Status | Evidence dependency | Assumption/question |
|---|---|---|---|---|
| ADR-0001 | Phase 1 execution sequence | ACCEPTED | ACCEPTED | inherited roadmap defects |
| ADR-0002 | Commercial event substrate | ACCEPTED | ACCEPTED | Q-0003 substrate existence only |
| ADR-0003 | Procurement structural root | PROPOSED | PRIMARY_REQUIRED | ASM-0001 / Q-0004 |
| ADR-0004 | PO/Subcontract type model | PROPOSED | PRIMARY_REQUIRED | ASM-0002 / Q-0005 |
| ADR-0005 | Accounting/commercial ownership seam | PROPOSED | PRIMARY_REQUIRED | ASM-0003 / Q-0002 |
| ADR-0006 | V1 ERP/accounting integration depth | PROPOSED | PRIMARY_REQUIRED | ASM-0004 |
| ADR-0007 | Long-lead tracking object model | PROPOSED | PRIMARY_REQUIRED | ASM-0005 / Q-0008 |
| ADR-0008 | Workflow engine generality | PROPOSED | PRIMARY_REQUIRED | ASM-0006 |
| ADR-0009 | Configuration breadth | PROPOSED | PRIMARY_REQUIRED | ASM-0007 / Q-0007 |
| ADR-0010 | GCC semantics vs localization | PROPOSED | PRIMARY_REQUIRED | ASM-0008 |
| ADR-0011 | Budget/cost attribution timing | PROPOSED | PRIMARY_REQUIRED | ASM-0009 |
| ADR-0012 | External vendor identity/access | PROPOSED | PRIMARY_REQUIRED | ASM-0010 / Q-0006 |
| ADR-0013 | Event-derived status vs manual tracker | PROPOSED | PRIMARY_REQUIRED | ASM-0011 |
| ADR-0014 | Document provenance ownership/depth | PROPOSED | PRIMARY_REQUIRED | ASM-0012 |
| ADR-0015 | Posting/finalization/reversal/correction | PROPOSED | PRIMARY_REQUIRED | ASM-0013 / Q-0003 |
| ADR-0016 | External-party UX priority | PROPOSED | PRIMARY_REQUIRED | ASM-0014 |
| ADR-0017 | Broader AI-readiness substrate | PROPOSED | DESIGN_PHASE | ASM-0015 |
| ADR-0018 | Workflow-to-financial-state seam | PROPOSED | DESIGN_PHASE | hostile critique risk |
| ADR-0019 | Effective dating/temporal authority | PROPOSED | DESIGN_PHASE | hostile critique risk |
| ADR-0020 | In-flight configuration binding | PROPOSED | DESIGN_PHASE | Q-0007 extension |
| ADR-0021 | Field-level integration authority/staleness | PROPOSED | PRIMARY_REQUIRED | Q-0002 extension |
| ADR-0022 | Money representation/rounding/order | PROPOSED | DESIGN_PHASE | Q-0003 extension |
| ADR-0023 | Numbering/concurrency/fiscal semantics | PROPOSED | PRIMARY_REQUIRED | P1.4/P1.5 evidence required |
| ADR-0024 | Irreversible pre-model constraints: provenance + bounded actions | ACCEPTED | ACCEPTED | low-cost non-retrofittable substrate only |

Active dependency source: `02_research/evidence/ADR_EVIDENCE_COVERAGE_V1_1.csv`. `P1_0_SUFFICIENT` is retired; it cannot be used to resolve a future domain ADR.

## 2. Ten representative EVD rows across decision-leverage buckets

| EVD | Bucket | Claim | Source / locator | Source grade | Information content | Status |
|---|---|---|---|---|---|---|
| EVD-0009 | VERIFIED_DECISION_RELEVANT | awarded/leveled bid can convert to a commitment | SRC-0005/SRC-0013 — Bidding workflow + Level Bids conversion section | A | MECHANISM_REVEALING | SUPPORTED |
| EVD-0024 | VERIFIED_DECISION_RELEVANT | ERP synchronization seam exists between project financial tools and accounting | SRC-0021/SRC-0022 — ERP Integrations + QBO integration | A | MECHANISM_REVEALING | SUPPORTED |
| EVD-0005 | VERIFIED_BACKGROUND | Procore is a broad connected construction platform | SRC-0026/SRC-0017 — product suite + financial lifecycle overview | A/B | EXISTENCE_REVEALING | SUPPORTED |
| EVD-0012 | VERIFIED_BACKGROUND | Project Financials capability exists | SRC-0017 — Financial Management guide overview | A | EXISTENCE_REVEALING | SUPPORTED |
| EVD-0027 | PAIN_SIGNAL | ACV pricing plus high/non-transparent pricing sentiment | SRC-0026/SRC-0029 — pricing page + G2 review themes | B/C | PAIN_SIGNAL | SUPPORTED as scoped fact/theme |
| EVD-0028 | PAIN_SIGNAL | learning curve / administrative overhead theme | SRC-0029 — G2 pros/cons | C | PAIN_SIGNAL | SUPPORTED as recurring theme |
| EVD-0181 | VERIFY_EXACT resolved | suppliers can access ProcurePro tenders from secure emailed links without login | SRC-0031 — FAQ account/login question | B | MECHANISM_REVEALING | SUPPORTED |
| EVD-0191 | VERIFY_EXACT resolved | CMiC treats PO and subcontract as purchasing commitments with meaningful subtype differences | SRC-0039 — PO Module Interactions > Subcontract Management | A | OBJECT_MODEL_REVEALING | SUPPORTED |
| EVD-0039 | DEFER_P1_3 | ProcurePro Procurement Schedule capability | SRC-0003 — inherited seed; exact locator intentionally pending P1.3 | B | UNKNOWN / deferred | PROPOSED |
| EVD-0069 | DEFER_P1_3 | Autodesk strong common data environment | SRC-0011 — inherited documentation-set seed; exact page intentionally pending P1.3 | A | UNKNOWN / deferred | PROPOSED |

The last two rows demonstrate that deferral does not silently promote an inherited claim: they remain PROPOSED and cannot support an ADR/REQ.

## 3. Status vocabularies

- Source: `PENDING_REVIEW / AVAILABLE / VERIFIED / UNAVAILABLE / SUPERSEDED`
- Evidence: `PROPOSED / SUPPORTED / CONTESTED / WITHDRAWN / SUPERSEDED`
- Assumption: `OPEN / TESTING / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`
- Question: `OPEN / BLOCKING / RESOLVED / DEFERRED`
- Contradiction: `OPEN / RESOLVED / ACCEPTED_VARIANT`
- Terminology: `PROVISIONAL / CANONICAL / DEPRECATED / SUPERSEDED`
- ADR: `PROPOSED / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`
- Requirement: `PROPOSED / ACCEPTED / REJECTED / DEFERRED / SUPERSEDED`
- Change: `PROPOSED / ACCEPTED / REJECTED / IMPLEMENTED`

Source strength (`A/B/C/D/P/N/A`), confidence (`HIGH/MEDIUM/LOW/UNKNOWN`), architectural information content, decision leverage and lifecycle status are separate dimensions.

## 4. One complete chain

**SOURCE** — `SRC-0030`, ProcurePro Digital Procurement Schedule for Construction, official vendor page, source grade B, verified 2026-07-28.

**EVIDENCE** — `EVD-0180`: ProcurePro procurement schedules update milestone status automatically as procurement work is completed. Locator: Procurement Schedule > How it works > automatic schedule update. Information content: MECHANISM_REVEALING. Status: SUPPORTED.

**ASSUMPTION** — `ASM-0011`: parallel human-maintained procurement trackers are a major failure mode and statuses should derive from transaction events where possible. Status: OPEN. Falsification: primary workflows show separate trackers remain necessary/preferred for information not representable by transaction state.

**ADR** — `ADR-0013`: Event-derived procurement status versus manual trackers. Status: PROPOSED. Dependency: PRIMARY_REQUIRED. Competitor evidence establishes that event-derived schedule status is possible; P1.2 must still determine which real contractor fields are transactional status versus legitimate planning inputs.

This chain therefore informs the future decision without resolving it from competitor evidence.