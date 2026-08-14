# CPOS Architecture V2 Common Field-Contract Semantics v1.0

**Status:** FREEZE-CANDIDATE SUPPORTING CONTRACT

This artifact closes the common part of Capability Specification Standard §C. Owning capability field-contract tables inherit these rules unless an explicit row overrides them.

## Contract-table columns

Every field row declares exactly:
1. **Field / label** — canonical product field name and ordinary UI label where different.
2. **Meaning** — business meaning; not implementation shorthand.
3. **Type** — semantic type, including closed enum/reference/money/quantity/document identity.
4. **Requirement** — REQUIRED / OPTIONAL / CONDITIONAL plus condition.
5. **Master / reference source** — authoritative master/object/policy or NONE.
6. **Default** — product/tenant default; `NONE` means the user/source must supply it when required.
7. **Lifecycle editability** — states/actions in which the field may change; issued/source/approved truth is immutable unless an explicit revision/correction path exists.
8. **Validation** — value/domain/cross-field rules.
9. **Security classification** — PUBLIC_BUSINESS, TENANT_INTERNAL, COMMERCIAL_CONFIDENTIAL, RESTRICTED_FINANCIAL, PERSONAL_CONTACT or SYSTEM_CONTROL.
10. **Downstream-copy behavior** — COPY_SNAPSHOT, COPY_REFERENCE, DERIVE, DO_NOT_COPY, or explicit rule.

## Common semantic types

- `UUIDv7` — immutable internal identity; never a displayed business number.
- `BusinessNumber` — governed number allocated by the document-class numbering policy.
- `ShortText(n)` / `LongText(n)` — Unicode text with stated maximum logical length.
- `LocalDate` — calendar date in project/legal-entity context.
- `Instant` — UTC timestamp plus display timezone.
- `Money(currency)` — exact decimal amount plus ISO-4217 currency; no floating-point storage.
- `Quantity(uom)` — exact decimal quantity plus governed UOM.
- `Percentage` — exact decimal 0..100 unless explicitly stated otherwise.
- `Reference<T>` — immutable reference to a governed master/domain object.
- `VersionReference<T>` — immutable reference to an exact version/basis used by a decision.
- `AttachmentSet` — ordered/typed BusinessAttachment references.
- `ClosedEnum{...}` — only enumerated values are legal; extension requires controlled change or a governed reference table if explicitly declared.

## Common record fields

These fields are inherited by material transaction/master records and need not be repeated in every capability table unless overridden.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| internal_id | Stable machine identity | UUIDv7 | REQUIRED | SYSTEM | generated | Never editable | globally unique; tenant-bound where applicable | SYSTEM_CONTROL | COPY_REFERENCE only |
| tenant_id | Owning tenant | Reference<Tenant> | REQUIRED | Tenant | session context | Never editable after create | actor/session tenant must match | SYSTEM_CONTROL | COPY_REFERENCE |
| legal_entity_id | Commercial/legal owner | Reference<LegalEntity> | CONDITIONAL for transaction/master classes that cross legal entities | Legal Entity | project/company default | Editable only before first approval/issue unless governed transfer exists | must be active and within tenant | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| project_id | Project context | Reference<Project> | CONDITIONAL by capability; REQUIRED for project procurement | Project | current project context | Editable in draft only; changing after dependent records exist requires recreate/transfer path | active, tenant/legal-entity compatible | TENANT_INTERNAL | COPY_REFERENCE |
| created_by | Actor who created record | Reference<Principal> | REQUIRED | Identity | current actor | Never editable | actor authorized for create | SYSTEM_CONTROL | DO_NOT_COPY |
| created_at | Creation occurrence | Instant | REQUIRED | SYSTEM | transaction clock | Never editable | trusted server time | SYSTEM_CONTROL | DO_NOT_COPY |
| updated_at | Last mutable-record update occurrence | Instant | REQUIRED for mutable records | SYSTEM | transaction clock | system-managed | monotonic per version | SYSTEM_CONTROL | DO_NOT_COPY |
| status | User-visible lifecycle state | ClosedEnum defined by owning spec | REQUIRED | owning lifecycle | initial state | Only via allowed domain transitions | transition guard + authority | TENANT_INTERNAL | COPY_SNAPSHOT where downstream provenance needs status-at-time |
| business_number | Human document/master number | BusinessNumber | CONDITIONAL by class | NumberingPolicy | policy-generated | Immutable once assigned except explicit external-number mapping fields | class policy uniqueness/reuse rules | TENANT_INTERNAL | COPY_SNAPSHOT |
| notes | Non-authoritative user notes | LongText(4000) | OPTIONAL | NONE | blank | Draft/working states; locked if the note forms part of an issued snapshot | sanitized; no executable markup | TENANT_INTERNAL | COPY_SNAPSHOT only when explicitly included |
| attachments | Business-context files | AttachmentSet | OPTIONAL/CONDITIONAL | File/Attachment capability | empty | Mutable in draft; issued/approved snapshots bind exact versions | user must have access; malware/verification policy | inherits document classification | COPY_REFERENCE to exact versions |

## Common money/quantity rules

1. Monetary values require explicit currency and exact-decimal/rounding policy.
2. Quantity requires governed UOM unless the row is explicitly lump-sum/non-quantified.
3. Source values are never normalized in place. Normalized value, source value and conversion basis are separate facts.
4. Negative quantity/amount is prohibited in ordinary create flows unless the specific capability defines a correction/credit semantic.
5. Percentages that allocate a whole must obey the owning conservation rule and declared tolerance/rounding.

## Common editability rule

`ISSUED`, `SUBMITTED`, `APPROVED`, `AWARDED`, `EXECUTED` and other terminal/evidence-bearing states do not permit silent field mutation. Changes use revision, amendment, correction, supersession or reversal semantics defined by the owning capability.

## Common security rule

- supplier quotation/comparison/rates/budgets/award values: COMMERCIAL_CONFIDENTIAL or RESTRICTED_FINANCIAL where budget policy requires;
- personal contact email/phone: PERSONAL_CONTACT;
- technical/public tender content: TENANT_INTERNAL unless issue policy intentionally exposes it to invited suppliers;
- credentials/tokens/provider secrets are never capability fields and belong to secret-management infrastructure.

## Common downstream-copy rule

A downstream object may copy values for usability, but must retain the upstream immutable reference/version so copied working values cannot erase lineage. If a downstream commercial fact legitimately diverges, it becomes a new fact with its own provenance rather than an edit of the source.
