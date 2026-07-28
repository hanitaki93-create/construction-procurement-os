- signed version
- supersession

Future AI can draft; deterministic template engine remains source of final production.

---

# 25. eSignature / Execution

Need:
- internal approval complete gate
- signatories
- signing order
- signature status
- reminders
- expiry
- signed copy
- certificate
- decline
- reissue
- amendment
- integration abstraction

Must support:
- DocuSign
- Adobe Sign
- native signing later
- manual signed upload

---

# 26. Procurement Schedule / Long-Lead Control

This should be deeper than incumbent notification layers.

For each package/item:
- design-ready date
- tender-ready
- tender issue
- bid close
- evaluation
- recommendation
- approval
- PO/subcontract
- signed
- submittal due
- submittal approved
- advance payment
- material release
- production
- FAT
- shipment
- customs
- site delivery
- inspection
- installation start

Need dependency graph and baseline vs current forecast.

Status should derive from actual system events wherever possible.

Research question:
Should long-lead items be child objects of package, commitment lines, submittals, or independent tracked procurement items?

Likely answer: independent `TrackedItem` with links to all of them.

---

# 27. Submittal / Material Approval Interface

Even if full submittals live externally, procurement needs:
- submittal ID
- package
- vendor
- item
- submission date
- reviewer
- status
- approval code
- required-by date
- revision
- rejection
- approved date
- linked procurement milestone

Integration to Procore/ACC/Aconex should be planned.

---

# 28. Delivery / Receipt / GRN

Objects:
- delivery
- shipment
- delivery note
- receipt
- GRN
- inspection result
- shortage
- damage
- rejected qty
- accepted qty
- storage location
- commitment line
- project
- site

Need:
PO Qty → Delivered → Accepted → Invoiced → Paid.

For subcontracts:
progress measurement is different from goods receipt.

---

# 29. Invoice / Payment Application

Differentiate:
- supplier invoice against PO
- subcontractor progress claim/payment application
- advance payment
- retention release
- final payment

Controls:
- contract/PO value
- approved changes
- previous certified
- current claimed
- current certified
- materials on site
- retention
- advance recoupment
- deductions
- penalties
- contra charges
- VAT/tax
- balance
- compliance holds

Three-way match for goods:
PO ↔ receipt ↔ invoice.

Progress valuation for subcontracts:
SOV ↔ measured/approved progress ↔ claim ↔ certificate.

---

# 30. Change / Variation Management

Objects:
- potential change item
- change event
- vendor quotation
- internal estimate
- client variation
- subcontract change order
- PO amendment
- budget transfer
- time impact
- approval

Need preserve:
cause
→ entitlement
→ notice
→ pricing
→ approval
→ downstream commitment
→ upstream recovery
→ budget impact
→ forecast impact.

This is a major future product area beyond pure procurement.

---

# 31. Retention / Bonds / Guarantees / Insurance

Track:
- retention rule
- retained amount
- retention release conditions
- advance-payment guarantee
- performance bond
- warranty bond
- insurance certificates
- expiry
- required amount
- issuer
- beneficiary
- approval
- return/release

Payment may be automatically blocked by missing compliance.

---

# 32. Vendor Performance / Ratings

Dimensions:
- quality
- safety
- commercial
- response rate
- pricing competitiveness
- delivery
- programme
- documentation
- claims behavior
- cooperation
- defects
- closeout

Need:
- rating event
- project
- reviewer
- evidence
- aggregation
- recency weighting
- dispute/review
- visibility rules

Vendor workload/capacity:
- active tender value
- awarded workload
- project count
- package overlap
- region
- start/end window

---

# 33. Lessons Learnt / Corporate Knowledge

Must be structured and linked:
- project
- package
- vendor
- scope clause
- contract clause
- item
- issue
- outcome
- financial impact
- recommended change

Possible action:
Lesson → Scope Library Change Request
Lesson → Vendor Risk Flag
Lesson → Contract Template Change
Lesson → Procurement Policy Change

---

# 34. Document / Evidence Layer

Every transaction must support:
- attachments
- source documents
- revisions
- versions
- superseded status
- immutable issued versions
- document hashes
- timestamps
- creator
- issuer
- recipient
- confidentiality
- access
- transmittal
- linked objects
- annotations/comments

Do not rely on generic file storage only.

---

# 35. Communications Layer

Objects:
- message
- thread
- participant
- channel
- related transaction
- inbound/outbound
- attachment
- delivery status
- read status
- response required
- due date

Channels later:
- platform
- email
- WhatsApp Business
- SMS
- external portal

Principle:
Communication can occur externally, but critical commercial records should be capturable into a project evidence trail.

---

# 36. Task / Action / Ball-in-Court Engine

Shared infrastructure:
- action
- owner
- role
- due date
- related object
- priority
- blocker
- status
- dependency
- escalation
- completion evidence

Automatically generated from workflow events.

---

# 37. Notification Engine

Must avoid incumbent notification overload.

Need:
- event subscriptions
- user preferences
- digest
- urgency
- channel
- quiet hours
- escalation
- deduplication
- batch
- role relevance
- project relevance

Principle:
Notify on **action/risk**, not every database event.

---

# 38. Audit / Provenance / System Truth

Every critical object needs:
- created by
- created timestamp
- modified by
- modification history
- state changes
- workflow decisions
- financial postings
- reversals
- voids
- approvals
- generated documents
- signatures
- integration origin
- external ID
- source document
- AI provenance later

Financially meaningful records should use append/adjust semantics rather than destructive history.

---

# 39. Roles / Permissions / Security

Three layers likely required:
1. tenant/company role
2. project role
3. object/workflow authority

Need:
- least privilege
- view/create/edit/delete
- submit
- approve
- post
- void
- reopen
- override
- issue/send
- export
- financial visibility
- confidential tender access
- vendor-specific isolation
- external guest rights

Permission changes themselves must be audited.

---

# 40. Reporting / Analytics

Baseline reports:
- procurement schedule
- tender coverage
- bidder response
- savings/variance
- budget vs commitment
- package forecast
- unsigned contracts
- long-lead exposure
- vendor workload
- vendor performance
- compliance expiry
- overdue approvals
- pending clarifications
- change exposure
- payment status
- uncommitted budget
- user/system utilization
- audit report

Requirements:
- saved views
- configurable columns
- filters
- grouping
- export
- scheduled reports
- dashboards
- portfolio rollups
- data API / BI connector

Never make Power BI the only way to get a usable report.

---

# 41. UI / UX Architecture

## Global shell
- organization/project selector
- universal search
- command palette
- alerts/action center
- recent items
- favorites
- help
- profile

## Main product navigation candidate
- Home
- Projects
- Procurement
- Vendors
- Commercial
- Documents
- Reports
- Administration

## Project procurement workspace
- Dashboard
- Schedule
- Packages
- Requisitions
- Tenders
- Comparisons
- Recommendations
- Commitments
- Deliveries
- Payments
- Changes
- Vendors
- Documents
- Reports

## Important UI patterns from incumbents
- table-centric power-user grids
- saved views
- right-side flyout details
- tabs for complex records
- horizontal bid comparison
- portfolio dashboards
- Gantt for procurement schedule
- inline status and ball-in-court
- bulk actions
- audit timeline

Design target:
enterprise power without enterprise ugliness.

---

# 42. Search

Must search across:
- project
- package
- vendor
- RFQ/tender
- bid
- PO
- subcontract
- invoice
- delivery
- change
- document
- message

Support:
- identifiers
- names
- descriptions
- vendor references
- document text later
- filters
- scoped search

Search architecture should later support AI retrieval without redesign.

---

# 43. Integration Architecture

Integration must be a platform subsystem.

## Core integration classes
- ERP/accounting
- project management/CDE
- schedule
- estimating
- BIM/drawings
- identity
- email
- eSignature
- BI
- vendor registries
- payment/banking
- messaging

## Required deterministic concepts
- connector
- connection
- credential/secret reference
- entity mapping
- field mapping
- sync direction
- source of truth
- external ID
- sync cursor
- event subscription
- retry
- dead-letter queue
- reconciliation
- conflict
- manual resolution
- sync audit
- health status

## Likely initial connectors to design for
- Procore
- Autodesk Construction Cloud
- Aconex
- Viewpoint/Vista
- CMiC
- Sage
- QuickBooks
- Xero
- NetSuite
- SAP
- Microsoft 365
- DocuSign
- Power BI

Not all should be built initially. Architecture must not block them.

---

# 44. API-First Architecture

Every major platform object must have a documented service/API contract.

Principles:
- stable IDs
- typed schemas
- idempotent writes
- pagination
- filtering
- versioning
- webhooks/events
- permissions enforced server-side
- optimistic concurrency where needed
- audit metadata
- correlation IDs
- integration-safe error codes

Need three API surfaces eventually:
1. internal product API
2. external integration API
3. agent/tool API

The agent API may expose a safer subset than the external API.
