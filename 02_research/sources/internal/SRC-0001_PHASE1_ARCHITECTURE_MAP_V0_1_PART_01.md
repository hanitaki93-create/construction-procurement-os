# Construction Procurement OS
## Phase 1 — Deterministic Architecture Intelligence Map v0.1

**Status:** Initial architecture scaffold / research map  
**Purpose:** Establish the complete deterministic product surface before implementation or substantive AI development.  
**Scope:** Contractor-focused procurement + commercial operating system, designed API-first and AI-ready, with deep integration to accounting/ERP, project controls, drawings/documents, scheduling, and communications.

---

# 0. Executive Intent

The product thesis is **not** to build another generic construction management suite.

The target is a contractor procurement/commercial operating system that can eventually become:
- deep enough to replace Excel/email/fragmented procurement administration,
- structured enough to integrate into enterprise financial/project-control stacks,
- modern enough to beat incumbent usability and implementation friction,
- inexpensive enough to serve contractors priced out of enterprise platforms,
- API-native so every deterministic object and approved action can later become usable by AI agents,
- architected so AI is additive rather than existential.

The deterministic product must remain valuable even if advanced AI capabilities never mature.

The eventual Phase 1 deliverable is a build-ready technical specification. This v0.1 file is the **architecture table of contents + first intelligence layer**, not the finished Phase 1 specification.

---

# 1. Phase 1 Research Method

Each system area will pass through the same evidence process:

1. **Market leader reconstruction**
   - Product websites
   - Help/documentation
   - API documentation
   - Training academies
   - Product release notes
   - Official demos/webinars
   - Integration marketplaces

2. **Real workflow reconstruction**
   - Contractor SOPs
   - Procurement plans
   - Commercial department processes
   - Job descriptions
   - Tender templates
   - RFQ/comparison/award templates
   - Subcontract templates
   - Payment/variation procedures

3. **User-friction research**
   - Reddit
   - G2/Capterra/Software Advice
   - YouTube comments
   - Implementation consultants
   - User communities
   - Public support/forum threads

4. **Architecture extraction**
   - entities
   - relationships
   - state machines
   - business rules
   - approvals
   - permissions
   - calculations
   - audit events
   - external interfaces
   - UI patterns

5. **Critique**
   - what incumbent solves well
   - where manual work remains
   - where users abandon the system
   - where duplicate entry exists
   - where vendor/subcontractor participation breaks
   - where pricing or implementation creates a wedge

6. **Freeze**
   - accepted deterministic requirement
   - deferred issue
   - rejected feature
   - future-AI hook
   - unresolved research question

No substantive AI feature is built during Phase 1.

---

# 2. First Competitive Intelligence Map

## 2.1 Procore

### Strengths observed
- broad connected construction platform
- bid/tender packages
- vendor directory
- side-by-side bid leveling
- direct conversion of awarded/leveled bid into commitment
- commitments: POs + subcontracts
- customizable approval workflows
- project financials
- payment applications
- change management
- ERP integrations
- strong role/permission model
- broad mobile/project collaboration ecosystem
- API/integration orientation
- unlimited-user commercial positioning

### Product patterns worth studying
- company-level vs project-level objects
- bid package → bid form → bidders → bid leveling → award → commitment
- standardized directory feeding all workflows
- custom workflow templates with assigned reviewers and ball-in-court ownership
- ERP synchronization boundary between project financial management and accounting
- source-of-truth model around project records
- saved views, permissions, workflow templates

### Reported weaknesses / attack surfaces
- high/opaque annual-construction-volume pricing
- learning curve and administrative overhead
- notification overload
- reporting limitations for some users
- incomplete or costly accounting integrations
- implementation/adoption burden
- data becomes unreliable when staff stop maintaining it
- vendors may ignore portal workflows and respond via email
- procurement nuance can break one-to-one object models
- customers become operationally locked into the platform

### AI direction
By 2026 Procore is explicitly pursuing source-grounded AI agents with actions/triggers, document reasoning, RFI/submittal/contract-review workflows and many built-in actions. This means AI-readiness is no longer optional for a new platform.

---

## 2.2 ProcurePro

### Strategic relevance
ProcurePro is currently the closest benchmark for the exact product thesis: construction-head-contractor procurement as a dedicated operating layer.

### Observed deterministic modules
- Procurement Schedule
- Scope of Works Library
- Tenders & Price Breakdowns
- Compare & Recommend
- Approval workflow
- Contract Creation
- eSignature
- Vendor Management
- Vendor Ratings
- Lessons Learnt
- Data & Analytics
- external integrations

### Important patterns
- procurement schedule updates itself from actual procurement progress
- package milestone logic instead of parallel spreadsheet updating
- reusable company scope library
- vendor tender access without mandatory account/login
- standardized requested pricing breakdowns
- comparison + recommendation as one connected flow
- contract compilation from templates and particulars
- contract status feeding procurement schedule
- vendor records enriched from tender/contract activity
- vendor capacity/exposure across projects
- compliance document expiry
- lessons learnt feeding future procurement
- all features positioned around margin protection and procurement control

### AI direction
- BidLevel reads supplier quotes and extracts pricing/exclusions
- AI CoPilot
- AI Pricing Library
- AI Estimating Handover

### Architecture lesson
The product is not merely requisition-to-PO. For project procurement the core object is often the **procurement package**, which connects:
budget → scope → tender → bidders → prices → recommendation → approval → contract → execution status.

---

## 2.3 Autodesk Construction Cloud / BuildingConnected

### Relevant strengths
- strong common data environment
- model/drawing/document foundation
- BuildingConnected bid management and subcontractor network
- Cost Management:
  - budgets
  - contracts
  - payment applications
  - change orders
  - forecast
  - compliance
  - customizable attributes/views
- flexible budget-to-contract allocation models
- APIs/integration with estimating/ERP systems
- strong 2D/3D takeoff ecosystem

### Important UI/architecture patterns
- table-first financial views
- expandable child levels with roll-ups
- flyout detail panels rather than full-page navigation for every edit
- saved user views: filters/grouping/column positions
- budget snapshots
- explicit SOV
- configurable budget/contract relationship cardinality
- contract → payment → change flow
- project/member permissions and external collaboration

### Reported weaknesses
- some modules are duplicated or fragmented
- notification overload
- cost management integration gaps
- users still build custom CSV/report workarounds
- large-project drawing navigation can be cumbersome
- adoption can fail without strong internal controls

---

## 2.4 Oracle Aconex

### Relevant strengths
- document/common data environment
- immutable/auditable project record
- configurable workflows
- correspondence/forms
- tender/bid distribution
- guest/secure participant access
- supplier document management
- contract/change/cost control
- very strong multi-party project governance

### Important patterns
- project organizations maintain data ownership boundaries
- formal document register
- secure tender communications
- view/response status visibility
- supplier documentation packages with automated due dates/status
- strong auditability for dispute-heavy environments

### Likely weakness / opportunity
- enterprise complexity
- implementation/training burden
- UI rigidity
- overspecification for smaller contractors
- useful model to copy for audit and document governance, not necessarily UX

---

## 2.5 Oracle Primavera Unifier

### Relevant strengths
- configurable capital/project business processes
- cost management/control
- workflow engine
- fund management
- contracts
- integrations
- configurable forms and business-process states

### Architecture value
Unifier is important less as a procurement UX benchmark and more as a **workflow/configuration engine benchmark**:
- typed business processes
- configurable states
- routed approvals
- configurable forms
- project/company shells
- integration services

---

## 2.6 CMiC

### Strategic relevance
CMiC exposes a mature construction ERP data model through public documentation.

### Important patterns observed
- approved requisition → purchase order
- PO and subcontract are different commitment types
- PO may allocate across multiple jobs
- subcontract is project/job bound and legally richer
- subcontract SOV
- subcontract change orders
- job/cost-code/category mapping
- retainage
- AP integration
- vendor default currency / retainage
- posted vs unposted financial states
- role privileges for add/edit/delete/post/void/approve
- workflow control over printing/execution
- remaining-to-be-paid formulas
- lien waivers / insurance / compliance

### Architecture lesson
Construction financial truth requires explicit **posting**, **voiding**, **period**, **job-cost**, **SOV**, and **change-history** concepts. A simplistic CRUD ERP will fail.

---

## 2.7 Trimble Viewpoint / Vista

### Relevant patterns
- integrated construction procurement
- material requests/purchasing
- subcontract invoices/payments
- job costing
- financial integration
- bidirectional REST API for cloud-hosted Vista
- enterprise back-office orientation

### Architecture lesson
Our API layer must support both:
- platform-as-system-of-record mode
- platform-as-operational-front-end synchronized to an external accounting ERP

---

## 2.8 SAP Ariba / enterprise procurement platforms

### Why study them
Not construction-specific, but valuable for mature supplier governance:
- supplier registration
- questionnaires
- qualification
- preferred supplier state
- certificates
- external approval APIs
- sourcing events
- policy-driven procurement

### Architecture lesson
Supplier master should not be only a contacts table. It must support:
registration → qualification → compliance → performance → preferred/restricted/suspended states → category/project eligibility.

---

# 3. Cross-Market Conclusions So Far

1. **Package is a first-class object.**
   Construction procurement is not just material requisitions and POs.

2. **Budget/cost-code structure must exist before procurement.**
   Every commercial commitment eventually needs financial attribution.

3. **Vendor participation must be low-friction.**
   Forcing every subcontractor into a heavyweight portal will cause adoption failure.

4. **Human-maintained parallel trackers are a major failure mode.**
   Status should derive from transaction state wherever possible.

5. **Approval workflows are platform infrastructure, not module features.**
   The same engine must route RFQs, recommendations, commitments, variations, invoices, payments, vendor qualification, etc.

6. **ERP/accounting integration is existential.**
   A great procurement system that requires duplicate finance entry will be rejected or partially adopted.

7. **Document provenance is core.**
   Construction disagreements are often evidence disputes.

8. **Posting/finalization rules matter.**
   Financial objects need controlled transitions, not silent edits.

9. **External-party UX matters as much as employee UX.**
   Vendors/subcontractors are unwilling participants in the contractor’s software.

10. **AI competitors are moving fast.**
    Our deterministic architecture must be agent-ready from day one.

---

# 4. Product Boundary v0.1

## 4.1 Owned deeply by our product
- Procurement planning
- procurement packages
- scopes
- vendor/supplier master
- prequalification/compliance
- sourcing/tender/RFQ
- bid receipt
- bid leveling/comparison
- recommendation
- approval
- PO/subcontract commitment
- contract creation
- eSignature/status
- procurement schedule
- long-lead item tracking
- commercial changes
- procurement-linked deliveries
- payment/invoice commercial controls
- vendor performance
- analytics
- audit
- lessons learnt
- project procurement data model

## 4.2 Must integrate deeply; ownership decision later
- accounting / general ledger
- accounts payable
- project budget / job cost
- scheduling
- drawings
- document management
- RFIs
- submittals
- BIM
- estimating
- HR/user identity
- email
- eSignature
- payment rails
- tax systems

## 4.3 Explicitly outside initial deterministic product
- field safety
- timekeeping
- payroll
- equipment telematics
- full BIM authoring
- full CPM scheduling
- generic CRM
- generic HRIS

These may later integrate or expand if evidence supports it.

---

# 5. Enterprise / Tenant Architecture

Research and specify:

- Tenant / customer organization
- legal entities
- branches
- business units
- departments
- regions
- subsidiaries
- joint ventures
- projects
- project clusters/programs
- users
- external users
- teams
- roles
- permission sets
- delegation
- acting authority
- approval limits
- cost centers
- currencies
- tax registrations
- numbering sequences
- financial periods
- document templates
- workflow templates
- master data inheritance

Key unresolved question:
How much configuration should inherit:
company → business unit → project → package,
and how are project overrides controlled?

---

# 6. Core Master Data Catalogue

## 6.1 Organization masters
- company
- legal entity
- branch
- department
- project
- project type
- project phase
- client
- consultant
- owner
- joint venture
- location
- currency
- tax regime

## 6.2 User/security masters
- user
- employee
- role
- permission
- approval authority
- delegation
- project membership
- external participant

## 6.3 Commercial masters
- cost code
- cost category
- WBS
- BOQ code
- package type
- trade
- procurement category
- unit of measure
- tax code
- retention rule
- payment-term template
- contract template
- commercial clause library
- insurance requirement
- guarantee requirement
- document requirement

## 6.4 Supplier/vendor masters
- organization
- contacts
- trade/category capability
- geography
- approved status
- qualification status
- financial data
- compliance docs
- certifications
- insurance
- bank details
- tax details
- historical tenders
- active workload
- contracts
- ratings
- performance
- claims/disputes
- suspension/restriction
- preferred status
- external registry IDs

## 6.5 Item/material masters
Needed even if package procurement dominates:
- item/SKU
- manufacturer
- manufacturer part number
- approved brand
- alternate/equivalent mapping
- description
- UOM
- category
- specification
- typical lead time
- technical documents
- purchase history

## 6.6 Document masters
- document type
- document template
- revision status
- transmittal type
- approval code
- confidentiality
- retention period
- required evidence type

---

# 7. Project Setup

A project cannot enter procurement until a deterministic setup gate is passed.

Potential setup objects:
- project identity
- legal entity
- currency
- VAT/tax
- client
- consultant
- project team
- roles
- budget/WBS/cost codes
- baseline programme milestones
- procurement strategy
- approval matrices
- workflow templates
- contract templates
- scope-library version
- document numbering
- vendor restrictions
- reporting calendar
- payment policy
- delegation rules
- integration mappings

Potential gate:
`PROJECT_COMMERCIAL_READY`

---

# 8. Budget / Cost Structure

Must support:
- original budget
- approved revisions
