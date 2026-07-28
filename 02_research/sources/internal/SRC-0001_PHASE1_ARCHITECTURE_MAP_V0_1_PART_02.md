- forecast adjustments
- internal transfers
- committed cost
- pending commitment
- approved changes
- pending changes
- actual cost
- paid amount
- retention
- forecast final cost
- available budget
- package budget
- unallocated budget
- provisional sums
- allowances
- owner/client budget if upstream management added

Relationships:
Project
→ WBS
→ Cost Code
→ Budget Item
↔ Procurement Package
↔ Commitment SOV
↔ Change Item
↔ Payment
↔ Actual Cost

Cardinality must be configurable:
- one budget item → many commitment lines
- many budget items → one contract
- one package → multiple budgets
- one commitment → multiple package/budget allocations

---

# 9. Procurement Planning / Package Register

## First-class object: Procurement Package

Minimum candidate fields:
- package ID
- project
- trade/category
- package title
- description
- owner
- responsible CA/QS/buyer
- budget allocation
- planned procurement route
- planned bidder count
- required-on-site date
- lead time
- contract execution lead
- tender period
- recommendation period
- approval period
- submittal/approval period
- manufacturing period
- shipping period
- delivery period
- status
- risk score
- package dependencies
- long-lead flag
- design completeness
- procurement priority
- target award date
- actual award date
- expected delivery
- variance

Milestone engine should calculate backwards from required-on-site date and update status from actual transactions.

UI:
- table
- Gantt/timeline
- risk heat map
- milestone drawer
- filtered portfolios across projects
- “next action / blocker” column

---

# 10. Material / Service Requisition

Differentiate:
- material requisition
- service requisition
- package requisition
- ad-hoc purchase request
- emergency request

States:
Draft → Submitted → Under Review → Clarification → Approved → Sourcing → Committed → Closed / Rejected / Cancelled

Need:
- quantity
- unit
- spec
- required date
- delivery location
- cost code
- budget check
- attachments
- preferred brands
- alternatives allowed
- requester
- project
- package linkage
- approvals
- partial conversion
- balance tracking

Research question:
How do project package procurement and ordinary material requisitions coexist without duplicate systems?

---

# 11. Scope of Works Library

Company-level reusable IP:
- trade scope template
- clauses
- inclusions
- exclusions
- interfaces
- responsibilities
- testing
- commissioning
- authority requirements
- temporary works
- attendances
- material handling
- warranty
- deliverables
- HSE requirements
- QA/QC requirements

Need:
- versioning
- project adaptation
- tracked changes
- comments
- reviewer approval
- lesson-learned suggestions
- clause provenance
- mandatory clauses
- project-specific overrides
- rejected suggestions history

Eventually AI can help produce/edit scope, but deterministic library/versioning comes first.

---

# 12. Supplier Prequalification / Compliance

Lifecycle:
Prospect → Invited → Registration Started → Under Review → Qualified → Approved → Preferred → Restricted / Suspended → Expired

Dimensions:
- commercial
- technical
- safety
- insurance
- financial
- legal
- geography
- trade
- project type
- capacity
- certification
- sanctions/regulatory screening if applicable

Compliance objects:
- document
- issue date
- expiry date
- verification
- applicable entity/project
- required category
- exception/waiver
- reviewer
- renewal request

Important:
Qualification should be **context-sensitive**, not one global approved/not-approved bit.

---

# 13. Bidder List / Market Coverage

Need:
- long list
- shortlist
- vendor eligibility
- category match
- location
- active workload
- historical responsiveness
- project conflicts
- suspension
- current exposure
- performance
- existing agreements
- capacity
- invite rationale
- invite approval

Metrics:
- invitations
- viewed
- accepted
- declined
- no response
- quoted
- clarification
- disqualified

External bidder access should support secure magic links / frictionless access where risk permits.

---

# 14. RFQ / Tender Package

Objects:
- tender event
- tender package revision
- bid form
- scope
- pricing schedule
- instructions
- contractual terms
- documents
- drawings
- specs
- bidder list
- key dates
- clarification deadline
- submission deadline
- addenda
- confidentiality rules

Lifecycle:
Draft → Internal Review → Approved for Issue → Issued → Open → Clarification → Closed → Evaluation → Awarded / Cancelled

Must support:
- sealed bids if required
- late-bid policy
- bid confidentiality
- bidder-specific communication
- addenda acknowledgement
- reminder automation
- revision control
- deadline extension

---

# 15. Bidder Communication / Clarifications / Addenda

This is likely a major usability battlefield.

Need:
- tender message threads
- RFI/clarification
- questions
- responses
- broadcast addenda
- bidder-private messages
- email ingestion
- secure reply links
- attachments
- response deadlines
- unanswered-item register
- acknowledgment
- immutable history

Research priority:
How to capture emails/WhatsApp-like behavior without forcing supplier behavioral change.

Potential future channels:
- email gateway
- WhatsApp Business integration
- portal
- guest links

---

# 16. Bid Receipt

Must accept:
- structured portal bid
- uploaded supplier PDF
- spreadsheet
- email attachment
- manual entry
- revision/resubmission

Objects:
- bid
- bid revision
- bid line
- alternate
- qualification
- exclusion
- inclusion
- option
- commercial term
- technical deviation
- document
- validity
- lead time
- warranty
- payment term
- currency
- tax
- discount

Deterministic truth must preserve **supplier original submission** separately from normalized/evaluated data.

---

# 17. Bid Leveling / Commercial Comparison

Core product area.

Need side-by-side:
- bidder
- base price
- normalized price
- exclusions
- inclusions
- alternates
- provisional sums
- taxes
- discounts
- payment terms
- delivery
- warranty
- validity
- technical status
- compliance
- risk
- historic vendor performance
- budget variance
- negotiated adjustment
- forecast final package cost

Required data model:
Supplier Bid
→ Original Lines
→ Normalized Comparison Lines
→ Evaluator Adjustments
→ Negotiated Adjustments
→ Final Evaluated Offer

Every manual adjustment must retain:
- who
- when
- reason
- source
- previous value

UI benchmark:
large horizontal comparison grid + pinned scope/criteria columns + drill-down evidence.

---

# 18. Technical Evaluation

Separate from commercial evaluation.

Possible criteria:
- approved brand
- specification compliance
- material
- capacity
- performance
- authority approvals
- drawings/submittals
- method
- programme
- staffing
- experience
- deviations

Need:
- criteria templates
- weighted/nonweighted scoring
- pass/fail gates
- evaluator assignment
- independent evaluations
- consensus
- clarification requests
- approval
- source attachments

---

# 19. Negotiation Register

Often omitted by software despite being central.

Objects:
- negotiation round
- meeting/call
- attendees
- commercial issues
- scope issue
- price concession
- payment change
- programme change
- agreed/open item
- next action
- evidence
- revised offer

Must show offer evolution:
Bid v1 → clarification → negotiated offer v2 → final offer → award.

Potential future AI: negotiation summary, term-delta detection. Not Phase 1.

---

# 20. Recommendation for Award

Structured recommendation object:
- package
- recommended vendor
- evaluated price
- original price
- budget
- variance
- tender coverage
- evaluation summary
- technical status
- commercial status
- scope exceptions
- outstanding risks
- vendor capacity
- historical performance
- alternatives considered
- justification
- attachments
- approvers
- comments
- approval history

Lifecycle:
Draft → Submitted → Returned → Revised → Approved → Rejected → Superseded

Approval policy may depend on:
- value
- budget variance
- project
- business unit
- vendor risk
- single-source procurement
- tender coverage
- exception flags

---

# 21. Approval Engine

Must be reusable platform infrastructure.

Need:
- workflow template
- workflow version
- trigger
- step
- approver type
- named user
- role
- group
- financial authority
- sequential
- parallel
- any-of
- all-of
- conditional branch
- threshold
- escalation
- due date
- delegation
- substitution
- return/revise
- reject
- skip rule
- override rule
- emergency rule
- workflow manager
- immutable decision event

Approval matrices:
- company
- business unit
- project
- transaction type
- value band
- exception type
- currency

“Ball in court” must be a first-class platform concept.

---

# 22. Purchase Order

Use for material/equipment/lower-complexity commitments.

Core:
- vendor
- project(s)
- cost allocations
- lines
- quantity
- UOM
- unit price
- taxes
- discount
- delivery
- payment terms
- terms and conditions
- attachments
- budget
- approval
- revisions
- issue
- acknowledgement
- receipt
- invoice
- close

Need:
- partial receipt
- over/under tolerance
- cancellations
- returns
- price change
- PO variation/amendment
- multi-project allocations if supported

---

# 23. Subcontract

Richer commitment than PO.

Core:
- parties
- project
- contract type
- scope
- SOV
- original amount
- retention
- payment terms
- milestones
- programme
- LDs
- bonds
- insurance
- warranty
- variation rules
- notices
- compliance requirements
- attachments/schedules
- execution status
- commencement
- completion
- change orders
- payment applications
- final account

Contract truth:
Original → Approved Changes → Revised Contract Sum.

Never rewrite original financial truth.

---

# 24. Contract Generation / Template Engine

Need:
- master contract template
- clauses
- schedules
- annexures
- variables
- conditional clauses
- project-specific selections
- vendor particulars
- package particulars
- approved deviations
- document generation
- compile check
- issue version
- signature version
