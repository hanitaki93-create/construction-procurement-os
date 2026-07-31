# P1.6 — Evidence, Document & Communication Model — Workplan v0.1

**Date:** 2026-07-31  
**Status:** ACTIVE WORKPLAN / P1.6 ONLY  
**P1.5:** PASS / CLOSED / FROZEN  
**P1.7+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Objective

Freeze the durable evidence/document/communication semantics needed to reconstruct governed procurement and commercial outcomes without creating a second truth writer, full CDE, records-management platform, email system or collaboration suite.

P1.6 must answer, semantically:

1. what evidence identity means;
2. how source principal, channel, capture, version and location are proven;
3. how revisions, supersession and issued copies behave;
4. how external authoritative evidence is referenced/mirrored without losing historical reconstructability;
5. how messages, threads, transmittals, delivery/acknowledgment and domain acceptance remain distinct;
6. how confidentiality, retention, redaction, tombstone, offboarding and residency interact without rewriting business history;
7. how AI/tool extraction can influence governed outcomes while remaining distinct from source truth;
8. how A0–A3 gets the minimum evidence primitives without mandatory CDE/email migration or advanced AI.

P1.6 does not choose SQL tables, blob/object storage, hash algorithm implementation, email provider, e-sign vendor, CDE vendor, archive technology, OCR/model stack, API payloads or UI layout.

---

# 2. Frozen inheritance

P1.6 may not reinterpret:

- P1.4 OWN/MIRROR/REFERENCE/OUT at load-bearing fact/field/event grain;
- one authority per effective period;
- evidence custody/integrity ≠ legal/IP ownership;
- external authoritative records remain REFERENCE or narrow MIRROR;
- exact OS-issued supplier-facing release copy is product-governed evidence;
- no load-bearing source evidence edit-in-place;
- bounded retention/disposition/tombstone/post-termination authority;
- sensitivity classification is metadata, not a general policy engine;
- residency and governed region migration;
- P1.5 domain truth, lifecycle, value, correction and temporal semantics;
- evidence existence/message text never directly creates commercial truth;
- AI/tool-derived influence remains provenance-bearing and does not become supplier source truth;
- P07 remains sole independent XL;
- A0–A3 remains independently viable.

---

# 3. Working workstreams

## P1.6a — Evidence identity & provenance

Freeze semantic identities/relations for:

- evidence item versus evidence content/version;
- source principal/organization/contact/system;
- source channel and capture path;
- source external ID/location/reference;
- exact captured/issued version;
- content identity/integrity proof;
- source-page/section/region locator where value reconstruction requires it;
- buyer-on-behalf representation;
- duplicate-content versus duplicate-business-evidence handling;
- domain-event/evidence linkage;
- AI/tool extraction/proposal lineage.

## P1.6b — Document revision / issue / supersession

Freeze:

- draft/internal working artifact;
- source-submitted/captured artifact;
- product-generated artifact;
- product-issued artifact;
- revision versus replacement versus supersession;
- immutable issued copies;
- addendum/reissue/correction;
- composition/attachment semantics only where load-bearing;
- invalid/withdrawn/obsolete versions without deletion of history.

## P1.6c — Communication / message / transmittal

Freeze:

- message identity;
- thread/conversation context;
- participant/principal identity;
- channel provenance;
- outbound/inbound capture;
- transmittal/release envelope;
- delivery evidence;
- receipt evidence;
- acknowledgment;
- domain acceptance/agreement;
- buyer-on-behalf correspondence;
- channel duplication/idempotency.

## P1.6d — Confidentiality / retention / redaction / disposition

Freeze:

- classification metadata;
- access relationship to current authorization;
- retention basis/dependency linkage;
- legal/contract/customer/dispute/security basis categories at semantic level;
- redaction versus restriction versus disposal;
- tombstone/disposition record;
- post-termination retained-state authority;
- residency handling boundary;
- no generalized legal hold/eDiscovery/records policy engine.

## P1.6e — Reconstruction & hostile proof

Run reconstruction for at minimum:

1. tender release + addendum + supplier response revision;
2. supplier email quotation captured buyer-on-behalf;
3. normalized comparison value traced to exact supplier source location;
4. award based on one supplier revision while later revision exists;
5. Commitment/change/instruction/certification evidence chain;
6. invoice evidence versus commercial certification/accounting truth;
7. external CDE reference whose live URL/content later changes;
8. email/portal duplicate capture of the same attachment;
9. AI extraction accepted/corrected before governed outcome;
10. redacted/disposed payload after retained commercial event;
11. security call and later recovery evidence;
12. authority/config/version basis used in historical decision.

---

# 4. Candidate semantic primitives to test, not yet freeze

The work may justify bounded primitives such as:

- `EvidenceItem` — durable identity of an evidentiary record/relationship;
- `EvidenceVersion` — immutable captured/issued/source version identity;
- `ContentIdentity` — integrity/content identity separate from business identity;
- `SourcePrincipalRef` — who/what originated the source;
- `SourceLocator` — external/system/document/page/section/region locator;
- `EvidenceBinding` — why/how evidence relates to a governed fact/event;
- `IssuedArtifact` / issue event;
- `MessageEnvelope` / communication event;
- `Transmittal` / release envelope;
- `DeliveryObservation`;
- `AcknowledgmentObservation`;
- `DerivedObservation` — extraction/normalization/tool-derived fact with provenance;
- `DispositionRecord`.

These names are hypotheses. No separate durable object is justified merely because a noun exists.

---

# 5. Hard semantic distinctions

P1.6 must preserve:

- file/content identity ≠ business evidence identity;
- source document ≠ product-generated representation;
- revision ≠ correction of domain truth;
- superseded ≠ deleted;
- issued ≠ delivered;
- delivered ≠ read;
- read ≠ acknowledged;
- acknowledged ≠ agreed/accepted;
- message text ≠ domain command;
- electronic signature evidence ≠ business authority by itself;
- source principal ≠ capture actor;
- buyer-on-behalf capture ≠ direct supplier authentication;
- external source reference ≠ local authority;
- hash/integrity proof ≠ proof that contents are legally true;
- duplicate bytes ≠ duplicate business event;
- same filename ≠ same evidence;
- AI extraction ≠ supplier-authored value;
- confidentiality classification ≠ authorization policy;
- retention basis ≠ perpetual storage;
- payload disposal ≠ reversal of historical business event.

---

# 6. Gates

P1.6 may not close until:

G1 — Every disputed load-bearing value/decision can identify exact source evidence version and source location/locator sufficient for supported reconstruction.

G2 — Every externally communicated in-scope release/commitment/instruction/decision has a defined issue/capture path and actor/channel provenance.

G3 — Evidence/document/message semantics cannot directly become approval, AwardDecision, Commitment, receipt, certification, accounting or other domain truth without bounded domain action.

G4 — Revision/supersession/withdrawal/correction preserves historical version identity; no edit-in-place source-history rewrite.

G5 — External authoritative evidence can remain REFERENCE/MIRROR while preserving source identity, version/effective context, observed/fetched context and freshness/conflict where load-bearing.

G6 — Delivery, receipt, acknowledgment and domain acceptance/agreement are explicitly separate facts.

G7 — Retention/redaction/restriction/disposition/tombstone can operate without changing retained commercial meaning or creating permanent-retention loopholes.

G8 — AI/tool-derived influence can trace source → derived observation → acceptance/correction/transformation → authoritative domain fact/event.

G9 — Same content arriving by multiple channels cannot silently create duplicate source/business truth.

G10 — P1.6 remains SHARED SUBSTRATE / NOT XL; no full CDE, records management, email archive/server, collaboration, eDiscovery/legal-hold, CLM or signature platform gravity.

G11 — A0–A3 works with minimal evidence primitives and zero mandatory named CDE/email/AI connector.

G12 — P1.1–P1.5 regressions = NO; P07 remains sole XL; product code remains locked.

G13 — internal hostile review PASS + external Claude hostile review PASS before closure.

---

# 7. Targeted external evidence rule

Use current authoritative sources only where a semantic decision could otherwise depend on law/standard behavior, especially:

- legal recognition/functional equivalence of electronic records/signatures;
- evidentiary integrity/original-record concepts;
- required retention/accessibility where directly relevant;
- current UAE statutory claims if they could force evidence semantics.

Do not turn P1.6 into a legal-compliance encyclopedia.

Exact jurisdictional retention durations, signature-provider qualification, evidentiary admissibility outcomes and CDE vendor mechanics remain legal/product/implementation inputs unless they force core semantics.

---

# 8. Freeze sequence

1. build evidence identity/provenance contract;
2. build revision/issue/supersession contract;
3. build communication/transmittal contract;
4. build confidentiality/retention/disposition contract;
5. build reconstruction matrix across P01–P12 evidence targets;
6. consolidate integrated P1.6 candidate;
7. internal hostile audit;
8. remediate narrowly;
9. internal recheck;
10. prepare self-contained Claude hostile-audit packet;
11. external audit/remediation until both models PASS;
12. only then final P1.6 ADR/checkpoint/state transition to P1.7.

P1.7 remains locked during this work.
