---

# 45. Event Architecture

Candidate domain events:
- ProjectCreated
- BudgetImported
- PackageCreated
- PackageMilestoneDue
- RFQApproved
- TenderIssued
- BidViewed
- BidSubmitted
- TenderClosed
- ComparisonCompleted
- RecommendationSubmitted
- RecommendationApproved
- CommitmentCreated
- CommitmentApproved
- ContractIssued
- ContractSigned
- SubmittalApproved
- ShipmentDispatched
- DeliveryReceived
- InvoiceReceived
- PaymentCertified
- ChangeRaised
- VendorComplianceExpired

Events drive:
- status
- tasks
- notifications
- integrations
- analytics
- later AI agents

---

# 46. Migration / Import / Legacy-System Transition

This is a business-critical product function, not an afterthought.

Need:
- CSV/Excel importer
- master-data mapping
- vendor deduplication
- project import
- budget import
- commitment import
- open package import
- document import
- historical vendor performance import
- legacy ID preservation
- validation report
- preview
- rollback
- reconciliation
- migration audit

Future:
connect directly to legacy platforms and migrate via API.

---

# 47. Data Quality Engine

Because adoption fails when users do not trust system data.

Checks:
- duplicate vendors
- missing cost allocations
- package dates impossible
- unsigned contract after commencement
- expired vendor insurance
- bid totals inconsistent with lines
- commitment exceeds approved recommendation
- invoice exceeds PO/contract balance
- delivery exceeds ordered qty
- missing approval
- broken integration mapping
- orphaned records
- stale status

Data quality should be visible as a platform health score.

---

# 48. Configuration / Admin Studio

Must support configurable:
- statuses
- numbering
- templates
- workflow matrices
- roles
- permissions
- cost code structures
- package types
- procurement milestones
- document requirements
- compliance requirements
- vendor-rating criteria
- tax
- currencies
- retention rules
- payment terms
- custom fields
- dashboard widgets
- email templates

Risk:
too much configuration makes implementation painful.

Phase 1 must define what is:
- fixed product standard
- configurable
- extensible
- custom

---

# 49. Localization / GCC Requirements

Research later in detail:
- AED/SAR/QAR etc.
- multi-currency
- VAT
- bilingual English/Arabic UI possibility
- Hijri/Gregorian date needs
- UAE/Saudi entity registrations
- trade licenses
- VAT certificates
- insurance/bonds
- local payment practices
- post-dated/security cheque references if needed
- contract forms/FIDIC influence
- local authority approvals
- data residency/security expectations

Do not over-localize the core schema.

---

# 50. Reliability / Performance

Enterprise expectations:
- background jobs
- retries
- queues
- transactional consistency
- audit persistence
- backups
- disaster recovery
- rate limiting
- monitoring
- observability
- data export
- attachment storage
- antivirus scanning
- uptime targets
- graceful connector failure
- offline/mobile strategy later

Large comparison grids and document-heavy records must remain fast.

---

# 51. Mobile / Field Experience

Likely limited but important:
- approve/reject
- package status
- delivery receipt
- vendor/contact
- document/photo
- issue/action
- signature status
- quick search
- notifications

Do not force desktop ERP screens onto mobile.

---

# 52. Future AI-Native Hooks — Deterministic Requirements Now

Even before AI exists, create structures for:

## 52.1 Source evidence
Every later AI output can link to exact:
- document
- page
- record
- revision
- field
- message
- bid

## 52.2 AI proposal objects
AI must not directly rewrite truth.
Later:
AI Proposal → validation → review/approval → deterministic transaction.

## 52.3 Confidence
Schema should support:
- confidence score
- uncertainty reason
- abstention
- human-review requirement

## 52.4 Agent authority
Future roles:
- read
- draft
- propose
- execute-with-approval
- execute-within-policy

## 52.5 Agent-safe actions
Business actions such as:
- create draft RFQ
- add vendor candidate
- draft comparison
- prepare recommendation
- draft contract
- request clarification

Should exist as bounded service operations, not arbitrary database writes.

## 52.6 Provenance
Future AI event must store:
- model
- version
- prompt/template
- source references
- tool calls
- output
- reviewer
- final accepted changes

## 52.7 Evaluation datasets
System should be able to retain corrected outcomes later for:
- quotation extraction
- scope classification
- vendor matching
- bid normalization
- drawing takeoff
- delay prediction

---

# 53. Future AI Capability Ladder — NOT Phase 1 Build Scope

Potential order only:

1. semantic search / project Q&A with citations
2. quotation metadata extraction
3. RFQ draft generation
4. bid line extraction
5. exclusion/inclusion extraction
6. comparison normalization
7. scope draft from library + project evidence
8. contract particulars extraction/drafting
9. tender clarification assistant
10. vendor ranking
11. price intelligence
12. procurement-delay prediction
13. contract-risk analysis
14. spec/drawing cross-reference
15. BOQ/takeoff
16. bounded autonomous procurement actions

Each capability requires its own truth-kernel-like evaluation before authority increases.

---

# 54. Known Incumbent/User Pain Themes to Investigate Deeply

Initial themes from public users and product positioning:

## Adoption
- users revert to Excel/email/WhatsApp
- setup requires discipline
- system freshness can become a full-time job
- subcontractors resist portals

## Cost
- enterprise pricing can be high
- annual-volume pricing feels punitive to some contractors
- integration services may add significant cost

## Integration
- duplicate entry between PM and accounting
- connectors do not always mean fully automatic sync
- reporting APIs can expose less than UI stores
- customers become locked into systems

## UX
- dense/cluttered interfaces
- too many notifications
- learning curves
- inconsistent modules
- web performance on huge projects

## Procurement-specific
- physical procurement object may not map one-to-one with submittal
- multiple submittals → one item
- one submittal → multiple deliveries
- bidders bypass portal and email proposal anyway
- different quotes still require human scope interpretation
- procurement schedules become stale if separate from actual transactions

These are hypotheses for formal Phase 1 research, not accepted truths yet.

---

# 55. Differentiation Hypotheses — DO NOT FREEZE YET

Potential product wedges to test:

1. **Procurement/commercial depth over generic PM breadth**
2. **Fast, low-friction implementation**
3. **Pricing far below enterprise incumbents**
4. **Excellent external vendor experience**
5. **Real transaction-derived procurement schedule**
6. **Long-lead item graph tied to submittals, manufacturing, logistics and delivery**
7. **Best-in-class bid leveling and recommendation**
8. **Scope-library + lessons-learned loop**
9. **Cleaner approval matrix engine**
10. **Open API / export / reduced lock-in**
11. **Built-in migration tools**
12. **Modern power-user UI**
13. **Agent-ready architecture**
14. **Data-quality / system-truth monitoring**
15. **GCC localization without making the product GCC-only**

None of these should be called competitive advantages until validated.

---

# 56. Commercial / Operational Risks Kept Explicitly Separate

A great product may still fail.

Phase 1 architecture must reserve later investigation for:
- implementation burden
- onboarding
- legacy migration
- integrations
- enterprise security review
- data residency
- customer trust
- procurement/IT ownership conflict
- change management
- training
- support expectations
- procurement department political dynamics
- vendor adoption
- pricing
- sales cycle
- procurement software buying process
- investor appetite
- market-entry channel

Software quality does not solve these automatically.

---

# 57. First Phase-1 Subphase Structure

## P1.0 — Architecture Control System
Define:
- source register
- evidence grading
- architecture decision records
- assumptions register
- unresolved questions register
- change-control process
- terminology dictionary

## P1.1 — Market / Competitor Reconstruction
Deep study:
- ProcurePro
- Procore
- Autodesk / BuildingConnected
- Oracle Aconex / Unifier / Textura
- CMiC
- Trimble Viewpoint
- SAP Ariba/Coupa
- smaller modern construction procurement startups

Deliver:
feature matrix + workflow matrix + data/object clues + UI patterns + weaknesses.

## P1.2 — Real Contractor Workflow Reconstruction
Map:
estimate handover → procurement plan → package → scope → sourcing → bid → comparison → negotiation → award → commitment → submittal → long lead → delivery/progress → payment → variation → closeout.

Deliver:
canonical real-world workflow variants.

## P1.3 — Domain Model / Master Data
Freeze full entity dictionary and relationships.

## P1.4 — Workflow / State-Machine Architecture
Freeze every object lifecycle and transition.

## P1.5 — Financial / Commercial Architecture
Budgets, commitments, changes, payments, posting, periods, retention, tax.

## P1.6 — Approval / Permission / Audit Architecture
Company/project/object authority.

## P1.7 — Integration / Migration / API Architecture
System boundaries and source-of-truth rules.

## P1.8 — UI / Navigation / Reporting Architecture
Screens, views, dashboards, power-user workflows.

## P1.9 — Nonfunctional Architecture
Security, tenancy, performance, observability, recovery, data lifecycle.

## P1.10 — AI-Readiness Architecture
Connectors, evidence, AI proposal schema, agent authority, evaluation hooks.
No AI feature implementation.

## P1.11 — Critique / Red-Team
Try to break architecture:
- missing real-world scenarios
- accounting contradictions
- subcontract edge cases
- workflow deadlocks
- migration impossibilities
- vendor participation friction
- unusable UI
- integration gaps

## P1.12 — Phase-1 Final Master Specification
Merge all accepted sections into build-ready architecture.

---

# 58. Architecture Gate Before Phase 2

Phase 1 is complete only if a builder can answer without invention:

- What entities exist?
- How are they related?
- What is master vs transaction?
- What states does each transaction pass through?
- Who may perform every action?
- What approvals are required?
- What changes financially when a transaction posts?
- What is reversible?
- What is immutable?
- What is externally synchronized?
- What screen owns the action?
- What events are emitted?
- What reports consume the data?
- What API operation exists?
- What future AI action could safely use it?
- What migration path exists?
- What evidence is retained?

If any critical workflow requires the builder to “decide what makes sense,” Phase 1 is not finished.

---

# 59. Initial Source / Study Library

## ProcurePro
- https://procurepro.co/
- https://procurepro.co/solutions/procurement-schedule
- https://procurepro.co/solutions/scope-of-works
- https://procurepro.co/solutions/tenders-and-price-breakdowns
- https://procurepro.co/solutions/comparisons-and-recommendations
- https://procurepro.co/solutions/contract-creation
- https://procurepro.co/solutions/vendor-management
- https://procurepro.co/solutions/data-analytics
- https://procurepro.co/faq
- YouTube channel: https://www.youtube.com/@procurepro_app

## Procore
- https://www.procore.com/en-ae/tender-management
- https://support.procore.com/products/online/user-guide/project-level/bidding
- https://support.procore.com/products/online/user-guide/company-level/workflows
- https://support.procore.com/products/online/user-guide/company-level/erp-integrations
- https://www.procore.com/pricing
- https://www.procore.com/ai
- Bid Management demo: https://www.youtube.com/watch?v=LBTf2u43nOc

## Autodesk
- Autodesk Build Cost Management help
- BuildingConnected support/training
- Autodesk Platform Services / construction APIs
- Cost Management intro/demo:
  https://www.youtube.com/watch?v=Z4RmKSNm9HA

## Oracle
- https://www.oracle.com/construction-engineering/aconex/
- Primavera Unifier 26 documentation:
  https://docs.oracle.com/en/industries/construction-engineering/primavera-unifier/26/

## CMiC
- https://www.cmicglobal.ae/products/project-management/bidding-and-procurement
- CMiC public documentation for:
  requisitions, purchase orders, subcontract management, SOV, changes, security

## Trimble Viewpoint
- https://www.viewpoint.com/solutions/construction-job-costing-software/construction-procurement
- Vista API documentation

## SAP Ariba
- SAP Supplier Management APIs
- sourcing / qualification / external approval architecture

---

# 60. What We Do Next

Start with **P1.0 Architecture Control System**, then P1.1 competitor reconstruction.

Do not yet design database tables in detail.

P1.1 should produce a structured matrix where every competitor is reverse-engineered across the exact same dimensions:
- modules
- actors
- masters
- transactions
- workflows
- approval behavior
- financial relationships
- vendor UX
- internal UX
- reporting
- integrations
- API
- implementation
- pricing
- AI
- complaints
- strengths
- architectural lessons
- possible attack surface

Only after that common matrix is complete should we lock the domain model.

---

# 61. Current High-Level Product Graph

```text
TENANT / COMPANY
├── Legal Entities / Business Units / Branches
├── Users / Roles / Approval Authorities
├── Vendor & Supplier Master
├── Scope / Contract / Workflow Libraries
├── Cost Code / Trade / UOM / Tax Masters
└── PROJECT
    ├── Budget / WBS / Cost Structure
    ├── Procurement Strategy
    ├── Procurement Packages
    │   ├── Scope
    │   ├── Bidder List
    │   ├── RFQ / Tender
    │   │   ├── Documents / Addenda
    │   │   ├── Clarifications
    │   │   └── Bids / Revisions
    │   ├── Technical Evaluation
    │   ├── Commercial Comparison
    │   ├── Negotiation
    │   ├── Recommendation
    │   ├── Approval
    │   └── Commitment
    │       ├── Purchase Order OR Subcontract
    │       ├── SOV / Lines
    │       ├── Contract Documents
    │       ├── Signature
    │       ├── Compliance
    │       ├── Changes
    │       ├── Submittals / Approvals
    │       ├── Long-Lead Tracked Items
    │       ├── Deliveries / Progress
    │       ├── Invoices / Payment Applications
    │       ├── Retention / Guarantees
    │       └── Closeout
    ├── Vendor Performance
    ├── Lessons Learnt
    ├── Documents / Evidence
    ├── Tasks / Ball-in-Court
    ├── Notifications
    ├── Audit Trail
    └── Analytics / Reports

CROSS-CUTTING
├── Workflow Engine
├── Permission Engine
├── Event Bus
├── API Gateway
├── Integration Hub
├── Migration Engine
├── Data Quality Engine
├── Search
└── Future AI Proposal / Evidence / Agent Authority Layer
```

---

# 62. Status of This v0.1 Map

**Reasonably established from first-pass evidence**
- package-centric procurement
- supplier master
- tender/bid/level/award
- commitment split PO/subcontract
- reusable workflows
- cost/budget linkage
- long-lead schedule need
- vendor compliance/performance
- audit/provenance
- integration architecture
- vendor-friction problem
- AI-ready requirement

**Still highly provisional**
- exact module boundaries
- exact financial ownership vs external ERP
- requisition/package relationship
- downstream payment depth
- change-management depth
- CDE/document ownership
- email/WhatsApp ingestion strategy
- GCC localization specifics
- every state machine
- database schema
- first commercial release boundary

This is intentional. The map exists so research can now become systematic.
