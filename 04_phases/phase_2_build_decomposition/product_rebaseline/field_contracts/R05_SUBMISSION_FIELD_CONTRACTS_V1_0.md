# CPOS Architecture V2 — R05 Supplier Response Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Supplier Response / Quotation Revision Header

Closed enum `response_channel = {SECURE_TASK, FILE_UPLOAD, EMAIL, BUYER_ON_BEHALF, API_IMPORT}`.
Closed enum `response_intent = {UNDECLARED, INTENDS_TO_BID, DECLINE_NO_BID}`.
Closed enum `response_status = {INVITED, INTENT_RECORDED, DRAFT_RESPONSE, SUBMITTED, RECEIVED, REVISED, WITHDRAWN, FINAL}`.
Closed enum `late_status = {ON_TIME, LATE_ACCEPTED, LATE_PENDING_DECISION, LATE_REJECTED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_invitation_id | Exact supplier invitation | Reference<Invitation> | REQUIRED | RFQ | NONE | immutable | invitation exists; supplier matches | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_id | Responding supplier | Reference<Supplier> | REQUIRED | Supplier Master | invitation supplier | immutable | must equal invitation supplier unless governed buyer-on-behalf correction before submit | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| invited_contact_id | Supplier contact originally invited | Reference<SupplierContact> | OPTIONAL/CONDITIONAL | Invitation | invitation contact | immutable source snapshot | contact belongs to supplier | PERSONAL_CONTACT | COPY_SNAPSHOT |
| rfq_issued_artifact_id | Exact tender version responded to | Reference<IssuedArtifactVersion> | REQUIRED | RFQ/provenance | invitation issue artifact | immutable | must be supplier-accessible issued version | SYSTEM_CONTROL | COPY_REFERENCE |
| response_revision_no | Supplier-response revision sequence | Integer >=1 | REQUIRED | response domain | 1 | immutable per revision; next revision creates new record/version | monotonic per supplier/RFQ | SYSTEM_CONTROL | COPY_SNAPSHOT |
| response_intent | Bid/decline intent | ClosedEnum | REQUIRED once intent action taken | product enum | UNDECLARED | transition action; historical intent occurrences retained | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| no_bid_reason | Supplier-declared decline reason | ClosedEnum{CAPACITY, SCOPE_MISMATCH, COMMERCIAL, PROGRAMME, LOCATION, NO_INTEREST, OTHER} + optional text | CONDITIONAL for DECLINE_NO_BID | product enum | NONE | immutable after submit; later clarification separate | reason class required | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to analytics/performance facts |
| response_status | Response lifecycle | ClosedEnum | REQUIRED | product lifecycle | INVITED | transition only | legal transition | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| channel | Capture/submission channel | ClosedEnum | REQUIRED | product enum | SECURE_TASK where supplier task used | immutable per revision | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| quotation_reference | Supplier quotation number/reference | ShortText(160) | OPTIONAL but strongly requested | supplier source | NONE | supplier/buyer capture editable until SUBMITTED/RECEIVED; locked after | preserve exact source text | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| quotation_date | Supplier quote date | LocalDate | OPTIONAL | supplier source | NONE | locked after received | valid date; may precede receive | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| received_submitted_at | Source receipt/submission occurrence | Instant | REQUIRED for SUBMITTED/RECEIVED+ | SYSTEM/provider/manual evidence | actual occurrence | immutable | trusted/capture-provenanced | SYSTEM_CONTROL | COPY_SNAPSHOT |
| currency | Quotation currency | ISO-4217 | REQUIRED if prices supplied | Currency registry/RFQ policy | RFQ requested currency | locked after received revision | allowed by RFQ or explicit deviation | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to comparison source layer |
| validity_until | Supplier validity date | LocalDate | OPTIONAL/CONDITIONAL when quote states validity | supplier source | derived only if source explicitly states days/date; otherwise NONE | locked after received revision | >= quotation_date/received date where sensible | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| lead_time_text | Supplier-stated lead time | ShortText(240) | OPTIONAL | supplier source | NONE | locked after received revision | preserve source wording | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| promised_delivery_date | Supplier-confirmed/requested delivery | LocalDate | OPTIONAL | supplier source | NONE | locked per revision | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to schedule as supplier-confirmed only |
| payment_term_source | Supplier-stated payment term | ShortText(1000) + optional mapped PaymentTerm | OPTIONAL | supplier source/PaymentTerm registry | NONE | source text immutable after received; mapping is separate capture | preserve source + mapped ref | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to comparison source layer |
| warranty_guarantee | Supplier-stated warranty/guarantee | LongText(3000) | OPTIONAL | supplier source | NONE | locked after received | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| commercial_notes | Supplier commercial notes | LongText(6000) | OPTIONAL | supplier source | blank | locked after received | preserve source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_documents | Exact PDF/XLSX/email/etc. | VersionReference<SourceDocumentVersion>[] | REQUIRED for document-based response; OPTIONAL for fully structured supplier entry | provenance | NONE | immutable per revision | exact source/capture channel | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| captured_by | Actor/system recording structured values | Reference<Principal/System> | REQUIRED | Identity | supplier actor or buyer | immutable occurrence | actor authorized/channel consistent | SYSTEM_CONTROL | COPY_SNAPSHOT |
| buyer_on_behalf_reason | Why buyer entered supplier data | LongText(2000) | CONDITIONAL for BUYER_ON_BEHALF | NONE | NONE | locked after capture finalization | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| late_status | Deadline treatment | ClosedEnum | REQUIRED for received response | RFQ policy | derived ON_TIME/LATE_PENDING | governed decision transitions | compare receive time to exact due/addendum version | SYSTEM_CONTROL | COPY_SNAPSHOT |

## B. Supplier Quotation Line

Closed enum `line_mapping_state = {RFQ_LINE, SUPPLIER_ADDED, UNMAPPED}`.
Closed enum `offer_kind = {BASE, ALTERNATE, SUBSTITUTE, OPTIONAL, EXCLUSION_NOTE}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| quotation_revision_id | Owning immutable response revision | Reference<SupplierResponseRevision> | REQUIRED | response | NONE | immutable | same supplier/RFQ | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_line_no | Supplier/source line reference | ShortText(80) | OPTIONAL | supplier source | source row/line if known | locked after received | preserve source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| mapping_state | Whether line maps to requested RFQ line | ClosedEnum | REQUIRED | product enum | RFQ_LINE when supplier structured response uses line | source capture locked after receive; comparison mapping may be separate | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| rfq_line_id | Requested line mapped by supplier/direct capture | Reference<RFQLine> | CONDITIONAL for RFQ_LINE | RFQ | NONE | locked after received; comparison may propose different normalization mapping separately | event-compatible | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_description | Supplier's exact offered description | LongText(2000) | REQUIRED for priced/offer line | supplier source | NONE | locked after received | nonblank/source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| quoted_quantity | Supplier-offered quantity | Quantity(source uom) | OPTIONAL/CONDITIONAL when source states quantity | supplier source/UOM capture | RFQ qty only if supplier directly accepted it; never silently inferred from missing source | locked after received | >0 when present | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| quoted_uom | Supplier-offered UOM | Reference<UOM> + raw source text | OPTIONAL/CONDITIONAL with quantity/rate | UOM registry/source | NONE | raw source locked; mapping may be confirmed | recognized or preserved raw text | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| unit_rate | Supplier source unit rate | Money(source currency)/uom | OPTIONAL/CONDITIONAL | supplier source | NONE | locked after received | exact decimal; source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| line_amount | Supplier source line amount | Money(source currency) | OPTIONAL/CONDITIONAL | supplier source | NONE | locked after received | exact decimal; math discrepancy may be flagged but source unchanged | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| tax_source | Supplier-stated tax | structured rate/amount/raw text | OPTIONAL | supplier source | NONE | locked after received | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| manufacturer_brand_model | Supplier proposed product/system | structured text | OPTIONAL | supplier source | NONE | locked after received | preserve exact source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to technical evaluation/comparison |
| lead_time_override | Line-specific supplier lead time | ShortText(240)/duration capture | OPTIONAL | supplier source | header lead time | locked after receive | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| offer_kind | Base/alternate/etc. | ClosedEnum | REQUIRED | product/source capture | BASE | locked after receive | legal enum; alternate should reference base/RFQ line | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| inclusion_exclusion_deviation | Supplier source qualification | LongText(5000) | OPTIONAL | supplier source | blank | locked after receive | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| line_source_citations | Exact page/sheet/cell regions | Reference<SourceDocumentVersion + location>[] | CONDITIONAL for extracted/manual-captured document values | provenance | NONE | immutable with capture | resolve to source | SYSTEM_CONTROL | COPY_REFERENCE |

## C. Structured Capture Provenance

Closed enum `capture_method = {SUPPLIER_STRUCTURED, HUMAN_TRANSCRIPTION, AI_PROPOSED_HUMAN_CONFIRMED, IMPORT_MAPPED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| target_field_path | Structured response field captured | registered semantic field key | REQUIRED | response schema registry | NONE | immutable per capture occurrence | registered field | SYSTEM_CONTROL | COPY_REFERENCE |
| captured_value | Deterministic structured value | typed according to target field | REQUIRED | target schema | NONE | correction creates new capture/version | type-valid | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to source layer only |
| raw_source_text | Exact nearby source wording | LongText(2000) | OPTIONAL/CONDITIONAL for document capture | source doc | NONE | immutable | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_citation | Exact source/version/location | Reference<SourceDocumentVersion+location> | CONDITIONAL for source-document capture | provenance | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| capture_method | How structured value entered | ClosedEnum | REQUIRED | product enum | SUPPLIER_STRUCTURED for direct form | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| confidence | Extraction confidence | Decimal 0..1 | CONDITIONAL for AI_PROPOSED_HUMAN_CONFIRMED | AI proposal | NONE | immutable proposal | range | SYSTEM_CONTROL | DO_NOT_COPY as business truth |
| confirmed_by / confirmed_at | Human confirmation of AI/manual ambiguity | Principal + Instant | CONDITIONAL for AI proposed values and policy-required manual review | Identity/SYSTEM | NONE | immutable | authorized buyer/supplier reviewer | SYSTEM_CONTROL | COPY_SNAPSHOT |

Buyer normalization, evaluation adjustments and supplier-confirmed negotiated values are prohibited from this source-capture object and belong to R06/R07 layers.
