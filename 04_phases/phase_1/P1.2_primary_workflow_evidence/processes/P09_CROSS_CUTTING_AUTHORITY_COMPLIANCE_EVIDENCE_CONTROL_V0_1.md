# P09 — Cross-Cutting Authority / Compliance / Evidence / Task Control v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Purpose:** define a bounded deterministic control plane reused across demand, sourcing, award, commitments, changes, receipts, valuations and integrations without creating a generalized BPM platform or letting workflow configuration bypass domain/commercial invariants.

## 1. Problem to solve

Every major process repeatedly needs:

- permissions;
- DOA/approval;
- delegation;
- exceptions/overrides;
- compliance checks;
- evidence/provenance;
- task assignment;
- reminders/notifications;
- derived status;
- historical authority;
- concurrency/idempotency controls.

Implementing each independently would create inconsistent semantics and enormous maintenance burden.

But solving them with a fully programmable workflow/BPM engine would create a second XL gravity well and allow customer configuration to violate commercial truth.

P09 defines **bounded reusable primitives**, not an arbitrary process language.

## 2. Mature-system patterns

Mature construction systems expose:

- granular task/action permissions rather than only broad admin/user roles;
- workflow managers/assignees and workflow history;
- distinct approve/reject/return actions;
- configurable approval paths;
- payment/commercial compliance holds;
- overrides requiring privileged authority;
- history of workflow actions.

These patterns support reusable governance primitives but do not require user-programmable domain behavior.

## 3. Three layers of control

### Layer A — permission

> Is this actor allowed to attempt this operation?

### Layer B — approval/authority

> Has the required organizational authority consented to the proposed operation?

### Layer C — deterministic domain guard

> Is the operation valid under commercial/state invariants right now?

All three may be required.

Example:

A director may have permission and DOA to approve an award, but domain service must still reject conversion if:
- contractable supplier basis is missing;
- allocation scope is already consumed;
- award became stale;
- required legal counterparty is unresolved.

Workflow approval never overrides hard domain invariants unless a specific governed exception path exists.

## 4. Operation-centric permissions

Permissions should map to business operations, not only screen access.

Candidate operations:
- create/edit/submit demand;
- select bidder;
- release tender;
- view protected bids;
- reveal blind bid;
- modify comparison adjustment;
- submit recommendation;
- approve/reject/return award;
- prepare/issue/effect commitment;
- approve commitment change;
- receive goods;
- reverse receipt;
- review/certify progress;
- release retention;
- authorize advance;
- approve ERP export;
- resolve reconciliation exception.

UI visibility follows permissions, but API/service enforcement is authoritative.

## 5. Actor types

Candidate actor classes:

### Internal user

Employee/authorized organizational user.

### External participant

Supplier/subcontractor/client/consultant acting within bounded external access.

### Service/integration actor

Connector, automation or future AI tool acting under explicit service identity/capability.

Every material action records actual actor identity/type; shared credentials are not acceptable audit evidence.

## 6. Authority policy

### `AuthorityPolicy`

Versioned/effective governance configuration that determines required approval for a specific business action/context.

Candidate dimensions may include:
- legal entity/company;
- operation/type;
- amount/value threshold;
- delegation;
- project;
- category/trade;
- budget variance;
- non-lowest selection;
- compliance override;
- exceptional terms;
- emergency/sole source;
- related-party/conflict.

V1 standard configuration should keep the mandatory setup core small. Additional dimensions are additive, not required for every customer.

## 7. Approval case

### `ApprovalCase`

A version-bound approval instance over a specific proposal/business action.

Candidate fields:
- approval-case ID;
- subject type + subject version;
- requested transition/action;
- policy version/effective date;
- approval basis/value/context;
- required roles/steps;
- resolved actual assignees;
- role-assignment basis at that time;
- delegates/effective dates;
- decisions/comments;
- step sequence/dependencies;
- timestamps;
- expiry/staleness/reconfirmation state.

Approval history is immutable.

## 8. Workflow is orchestration, not domain state authority

Candidate bounded workflow primitives:
- assign step;
- approve;
- reject;
- return;
- request clarification;
- delegate/substitute;
- escalate;
- expire;
- cancel/supersede.

Workflow result emits an **approval outcome**.

Then domain service evaluates:

`approval outcome + current domain state + hard invariants`

before performing the commercial transition.

Forbidden pattern:

`workflow node → directly set commitment.current_value`.

Required pattern:

`workflow outcome → domain command → invariant validation → domain event/transition`.

This is the candidate closure direction for ADR-0018 later.

## 9. Configuration binding

A workflow/policy may change while an instance is in flight.

Candidate default:
- each ApprovalCase binds to an explicit authority-policy/workflow version at instantiation;
- material subject change triggers new/reconfirmed case;
- organization may migrate an in-flight case only through explicit controlled action.

Do not resolve workflow rules live from today's configuration when reproducing yesterday's approval.

ADR-0020 remains open for final binding semantics.

## 10. Delegation and role history

Historical authority requires:
- actor identity;
- role they acted under;
- role assignment valid at time;
- delegation source/effective period if applicable;
- authority policy version.

Deleting/changing today's org chart cannot make old approvals uninterpretable.

## 11. Compliance evaluation

Compliance is contextual and transition-specific.

Candidate evaluation:

### `ComplianceCheck`

- subject vendor/commitment/payment/etc.;
- operation/gate;
- rule/evidence version;
- evaluated facts;
- result;
- severity;
- effective/expiry times;
- override eligibility;
- source evidence.

Candidate severity:
- `INFORMATIONAL`;
- `WARNING`;
- `HARD_BLOCK`;
- `OVERRIDABLE_BLOCK`.

Examples:
- vendor insurance warning during early tender;
- legal suspension hard block before award;
- expired compliance payment hold after certification;
- missing final bond block before start/payment.

Do not encode compliance as one permanent vendor boolean.

## 12. Override

### `OverrideDecision`

A privileged, explicit exception to an overridable rule.

Must preserve:
- exact blocked rule/gate;
- actor;
- authority;
- reason;
- evidence;
- scope;
- conditions;
- expiry/review date;
- created/effective timestamp.

An override does not mutate underlying evidence to make the supplier appear compliant.

Hard non-overridable invariants remain impossible to bypass through workflow configuration.

## 13. Evidence/provenance primitive

Every load-bearing business fact should be traceable to evidence where applicable.

### `EvidenceReference`

Candidate metadata:
- evidence ID;
- source type;
- source system;
- document/message/file/external record ID;
- immutable version/revision;
- location/page/cell/span where relevant;
- captured/received time;
- source-created time if known;
- actor/source identity;
- content hash/fingerprint where feasible;
- sensitivity/privacy classification;
- retention/legal-hold linkage later;
- supersession relationship.

The product need not become the authoritative CDE/document repository to preserve evidence identity and provenance.

## 14. Human/AI/system derived values

Derived commercial data records origin.

Candidate origins:
- `SOURCE_STRUCTURED`;
- `HUMAN_ENTERED`;
- `HUMAN_DERIVED`;
- `SYSTEM_DERIVED`;
- `AI_PROPOSED`;
- `EXTERNAL_MIRROR`.

For AI proposals, preserve source citation/confidence/model/run metadata where practical and human accepted/corrected state.

AI provenance is not permission to bypass deterministic operation authority.

## 15. Task vs state

### `Task`

Represents work someone needs to perform.

Candidate fields:
- source domain event/condition;
- task type;
- assignee/role;
- due date;
- priority;
- status;
- completion evidence/result;
- escalation/reminder policy.

A task does not own commercial truth.

Example:
- task `Review bid comparison` may complete;
- AwardRecommendation state changes only through domain action, not because task checkbox was marked complete.

## 16. Notification vs task

Notification is delivery of information/reminder.

Candidate facts:
- channel;
- recipient;
- payload/template version;
- sent time;
- delivery result;
- opened/acknowledged if available;
- retry/failure.

`Email sent` does not mean:
- supplier received tender;
- approval completed;
- task completed;
- addendum acknowledged.

Notifications may trigger awareness; domain events determine state.

## 17. Event-derived status

Operational status should derive from canonical domain events wherever possible.

Examples:
- demand partially sourced;
- bidder no response at deadline;
- tender evaluating;
- award pending commitment;
- commitment current value;
- goods partial fulfillment;
- subcontract certified percentage;
- ERP export rejected.

Some planning fields legitimately remain explicit human inputs:
- target tender date;
- expected award date;
- owner forecast date;
- risk narrative;
- procurement priority.

Do not conflate `planned/forecast status` with `actual transactional status`.

## 18. Exception/event handling

Cross-cutting exceptions may include:
- stale award basis;
- late bid;
- compliance expiry;
- over-receipt;
- certification over contract basis;
- failed ERP export;
- duplicate integration retry;
- missing cost mapping;
- approval expired;
- source evidence unavailable.

Each exception should carry:
- source event/subject;
- severity;
- blocking impact;
- owner;
- reason/context;
- resolution action;
- evidence;
- timestamps.

Do not use generic free-text `Issue` as the only control.

## 19. Idempotency

Externally retried or automated commands need deterministic idempotency.

Candidate requirement:
- client/request idempotency key for irreversible create/convert/post actions;
- same key + same operation returns existing result;
- same key + materially different payload rejects;
- downstream connector attempts preserve source operation identity.

Critical examples:
- award→commitment conversion;
- requirement-allocation split/bind;
- ERP commitment export;
- receipt import;
- certification posting;
- reversal/correction.

## 20. Concurrency

Domain writes affecting conserved truth must protect against race conditions.

Examples:
- two buyers award same RequirementAllocation leaf;
- two receipts consume final PO quantity simultaneously;
- two certification approvals exceed remaining SOV value;
- configuration changes while approval case is in flight;
- retry creates duplicate commitment/change.

Candidate techniques are implementation-owned later, but architecture requires:
- version/optimistic-concurrency check or equivalent;
- atomic invariant evaluation + write;
- idempotent operation identity;
- explainable conflict response.

## 21. Privacy / confidentiality boundary

Control plane must support object/field/evidence sensitivity such as:
- blind bid values;
- private commercial terms;
- employee approval comments;
- vendor financial/prequalification documents;
- bank/accounting references;
- legal correspondence.

Access control must be enforced below UI and must respect evidence redaction/retention policies designed later.

## 22. Edge cases

### E01 — Approver's authority expires during workflow

Required: policy/role assignment effective at decision time; stale case may require reassignment/reconfirmation.

### E02 — Workflow approves but domain value changed meanwhile

Required: domain service detects stale subject/version and refuses transition or requires reconfirmation.

### E03 — Supplier insurance expires after bid but before award

Required: historical eligibility remains; new compliance check at award may block/override progression.

### E04 — Director overrides missing insurance

Required: underlying noncompliance remains visible; OverrideDecision records authority/reason/expiry.

### E05 — Notification email bounces

Required: delivery failure does not falsify invitation/addendum state; task/exception created as needed.

### E06 — User manually marks procurement tracker as completed

Required: transactional completion derives from domain events; optional planning notes do not override it.

### E07 — AI proposes award while user lacks award authority

Required: AI proposal is advisory; action call still resolves service/user authority + approval + domain guard.

### E08 — Approval config changes mid-case

Required: existing case remains version-bound unless controlled migration/restart occurs.

### E09 — Two users approve same final step simultaneously

Required: one atomic transition; second receives already-completed/conflict result, not duplicate domain event.

### E10 — Integration retries commitment export

Required: same idempotency identity avoids duplicate ERP commitment.

## 23. Failure patterns to reject

Fail later audit if design:
- relies on UI-only permissions;
- uses one broad role with no operation-level capability where commercial risk requires more precision;
- lets workflow set financial/commercial state directly;
- evaluates historical approval against today's org chart/config;
- models compliance as one current boolean;
- lets override erase noncompliance evidence;
- treats task completion as business-state authority;
- treats notification sent as acknowledgment;
- duplicates manual status alongside event-derived actual status;
- lets AI actions bypass the same operation controls as humans;
- cannot survive retried irreversible actions;
- allows race conditions to violate allocation/commitment/certification invariants;
- requires a fully programmable BPM engine for normal customer configuration.

## 24. Primary audit tests later

1. What DOA/approval matrices exist and how often do they vary?
2. How are temporary/delegated approvers handled?
3. What actions require separate permissions beyond job role?
4. What compliance items block invite, award, commitment, work start, certification or payment?
5. What overrides exist in real practice?
6. What evidence is needed to defend commercial decisions later?
7. Which notifications are today mistaken for confirmed action?
8. Which status fields are manually maintained in trackers?
9. Which planning dates/statuses remain genuinely human forecast inputs?
10. What concurrent operations cause duplicate PO/award/receipt errors today?
11. How are approvals corrected or reopened after scope/value changes?
12. What privacy/confidentiality restrictions apply to bids/contracts/vendor records?

## 25. Current disposition

### Strong enough to carry forward provisionally
- permission / approval / domain guard separation;
- operation-centric capabilities;
- versioned effective AuthorityPolicy + ApprovalCase;
- workflow outcome consumed by deterministic domain service;
- historical role/delegation evidence;
- contextual compliance checks;
- explicit override record;
- evidence/provenance primitive;
- task separate from state;
- notification separate from acknowledgment;
- transactional status event-derived where possible;
- planning/forecast state explicitly separate;
- idempotency/concurrency architectural requirements;
- no generalized BPM requirement.

### Still unresolved
- exact permission hierarchy/inheritance;
- workflow template language depth;
- standard V1 approval dimensions;
- compliance rule catalogue;
- evidence storage vs CDE reference depth;
- task/notification subsystem scope;
- escalation/SLA defaults;
- final concurrency implementation;
- audit-store/redaction/legal-hold mechanics;
- AI service identity/capability design.

## 26. Impact on ADRs

Provides candidate direction but does not close:
- ADR-0008 Workflow engine generality;
- ADR-0013 event-derived status;
- ADR-0014 provenance depth;
- ADR-0018 workflow→financial-state seam;
- ADR-0019 effective dating;
- ADR-0020 in-flight configuration binding;
- ADR-0023 concurrency/numbering semantics.

## 27. Next step

Integrate P01–P09 into a full provisional workflow/control map, identify remaining process gaps such as long-lead tracking and reporting/search projections, and prepare the next internal critique boundary while external Claude review remains pending.