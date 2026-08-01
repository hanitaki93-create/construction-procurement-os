# P1.7 — A0–A3 No-Connector Deployment Profile v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Prove that the first live sourcing rail can run end to end without any named ERP, accounting, CDE, email, supplier-network or AI connector while preserving the same frozen domain/evidence/interface semantics used by richer deployments.

---

# 2. Activation profile

Enabled:

- product-native UI/internal services;
- registered QUERY/PROPOSAL/COMMAND/ASYNC definitions;
- bounded manual/config entry;
- structured file import/export where useful;
- buyer-on-behalf evidence capture;
- product-generated/issued artifacts;
- manual/offline email/portal/courier communication capture;
- ordinary P09 approval;
- optional deterministic parsers.

Disabled/not required:

- named email connector;
- public API consumers;
- webhook/event broker;
- ERP/accounting connector;
- CDE connector;
- supplier account/network;
- chat/AI/agent capability;
- historical enterprise migration;
- advanced analytics/reporting.

---

# 3. End-to-end rail

## A0 — requirement / MR / package

1. user creates/imports requirement source through bounded entry/import;
2. exact source evidence is captured where applicable;
3. RequirementBasis/Allocation domain commands establish scope;
4. package is manually created from authorized allocations or accepted proposal;
5. no external cost code/master is required beyond configured product references;
6. ambiguous import rows remain review/quarantine.

## A1 — RFQ/tender release

1. buyer builds RFQ/tender draft using structured UI/manual data;
2. attachments/source docs captured/reference exact versions;
3. approval/domain guards apply;
4. exact TenderRelease/product-issued pack is frozen;
5. artifact is downloaded/exported for external sending;
6. buyer records manual send/issue occurrence/addressees/channel/time under bounded P1.6 action;
7. later corrections use addendum/reissue, not overwrite.

## A2 — supplier response / normalization / comparison

1. supplier responds outside product by email/file/physical delivery/portal;
2. buyer captures exact message/file/scan as source evidence, preserving buyer-on-behalf/source attribution status;
3. each supplier response revision is separately captured;
4. buyer manually enters or imports proposed normalized lines with exact source locators;
5. review/accept commands create normalized/evaluation facts;
6. comparison snapshot freezes exact source/proposal/policy versions;
7. no supplier login or mailbox ingestion required.

## A3 — recommendation / approval / AwardDecision / handoff

1. recommendation uses exact comparison/evidence basis;
2. ApprovalCase follows normal P09/domain process;
3. AwardDecision is made through bounded command;
4. award notification/handoff artifact may be generated/downloaded;
5. buyer manually sends and records issue/capture evidence;
6. bounded export/file/manual handoff to ERP/accounts/project team may occur;
7. external receipt/posting remains external/unknown until separately captured/reference if needed;
8. award remains distinct from Commitment/P07.

---

# 4. Structured file support

Minimum useful file operations may include:

- project/reference/supplier seed import;
- requirement/BOQ staging import;
- supplier-response price staging;
- comparison export;
- award/handoff export;
- evidence package/export manifest.

Every file operation uses P1.7 import/export contracts:

- schema/version;
- item-level validation;
- authority/provenance;
- proposal/staging versus domain command;
- partial/quarantine manifest;
- idempotency/run identity;
- no direct state/status assignment.

No exact Excel/CSV template is frozen in Phase 1.

---

# 5. Manual communication evidence

Manual/off-product sending/capture does not weaken evidence semantics.

Outbound:

- product freezes exact issued artifact/Transmittal;
- user downloads/sends externally;
- user records/captures send occurrence and available evidence;
- delivery/acknowledgment remains distinct and may be captured later.

Inbound:

- user captures exact source message/document/scan;
- source principal/represented party/capture actor remain distinct;
- exact EvidenceVersion/SourceLocator preserved;
- domain action consumes evidence where applicable.

The product must visibly distinguish direct authenticated external submission from buyer-on-behalf/manual capture.

---

# 6. Manual external handoff

Handoff package/export binds:

- exact AwardDecision/record scope;
- included evidence/artifact versions;
- schema/file/version;
- authority classification;
- generated time/actor;
- destination/recipient assertion;
- handoff occurrence/status;
- known limitations.

Manual destination entry/posting is external. It cannot be represented as completed accounting fact without external evidence/reference.

---

# 7. Queries without chat

All deterministic queries/explanations are accessible through ordinary screens/reports/navigation later designed in P1.8/P1.9.

Chat is an optional consumer, not the only query interface.

No capability may be chat-only if required for A0–A3.

---

# 8. Proposals without AI

PROPOSAL semantics may be used for human/deterministic drafts such as:

- draft package grouping;
- manual normalized mapping;
- RFQ draft;
- supplier identity mapping proposal.

AI is not required for the proposal class.

This proves proposal/domain separation is a general deterministic control, not AI-only complexity.

---

# 9. Failure/fallback

No-connector deployment still handles:

- file schema errors;
- duplicate imports;
- missing evidence;
- ambiguous supplier identity;
- manual send uncertainty;
- no delivery acknowledgment;
- partial batch;
- rejected approval/command;
- source revision changes;
- user correction.

Errors remain typed and visible.

No connector-specific health state is required.

---

# 10. First-live time guard

The profile must support first clean-input tender within the frozen target of no more than five working days without:

- connector development;
- customer IT/API approval;
- supplier onboarding/network account;
- historic data migration;
- AI model tuning;
- CDE integration;
- ERP configuration beyond bounded export/manual handoff.

This is an architecture/product-spec target, not a guarantee for poor/incomplete inputs.

---

# 11. Expansion path

Later activation can add:

- email connector;
- supplier portal/account;
- API/webhooks;
- ERP/CDE connector;
- chat;
- BOQ extraction/package proposal AI;
- automated reminders.

These consume the same operations/evidence/events and do not rewrite existing A0–A3 history.

Disabling them returns to this profile.

---

# 12. One-XL guard

No-connector profile demonstrates the product is not merely an integration shell or agent front end.

The deterministic procurement OS owns its bounded sourcing truth/evidence independently.

**P07 sole XL: preserved.**  
**Integration second XL: absent.**

---

# 13. Gate result candidate

- requirement/package — representable;
- exact tender issue — representable;
- supplier response revisions — representable;
- normalization/comparison — representable;
- recommendation/approval/AwardDecision — representable;
- external communication/handoff — representable;
- evidence/provenance — preserved;
- no named connector — required none;
- no AI — required none;
- no architecture invention — candidate PASS.

---

# 14. Hostile tests

1. Buyer has only ordinary email browser — tender still issues/captures? REQUIRED.
2. Supplier sends scanned handwritten quote — exact evidence + manual normalized proposal? REQUIRED.
3. No ERP access — award handoff export/manual evidence, no fake posting? REQUIRED.
4. No CDE — product-issued pack/evidence path remains? REQUIRED.
5. No AI/chat — package/RFQ/comparison still complete? REQUIRED.
6. Supplier sends Rev1 after comparison — new evidence/re-evaluation, no overwrite? REQUIRED.
7. File import partly invalid — explicit row manifest/manual continuation? REQUIRED.
8. User claims email sent but has no delivery proof — issue/send assertion distinct from delivery? REQUIRED.
9. Later connector activated — old manual history remains and no duplication? REQUIRED.
10. Connector later removed — workflow returns here? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
