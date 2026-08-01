# P1.9 — Evidence, Document and Communication Interaction Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **The interface must preserve exact evidence identity, version, source, capture, reliance and communication occurrence while allowing useful viewing and comparison. It cannot turn filenames, current links, uploads, messages or annotations into business truth.**

---

# 2. Evidence presentation layers

Every evidence interaction identifies the layer:

- `SOURCE_EVIDENCE` — exact externally/internal originated content/version;
- `CAPTURE_OBSERVATION` — when/how/by whom it was captured;
- `NORMALIZED_REPRESENTATION` — structured proposal derived from source;
- `EVALUATION_OR_ADJUSTMENT` — buyer/internal assessment with attribution;
- `SUPPLIER_CONFIRMED_BASIS` — confirmed contractable basis where applicable;
- `ISSUED_ARTIFACT` — exact frozen member/version representation;
- `REFERENCE_EXTERNAL_RECORD` — external authoritative source/location;
- `ANNOTATION_OR_NOTE` — commentary not correction/truth;
- `CORRECTION_OR_RETRACTION` — history-preserving relation;
- `REDACTED_OR_DISPOSED_STATE` — payload limitation with retained provenance/tombstone.

Layers cannot be edited in one undifferentiated document/grid.

---

# 3. `EvidenceVersionView`

Must expose or make directly inspectable:

- EvidenceRecord/EvidenceVersion identity;
- source principal/attribution;
- source locator and capture occurrence;
- content identity/integrity assertion;
- version/effective/received/recorded times;
- authoritative/reference status;
- current/retracted/superseded/corrected/disposed/redacted status;
- access/confidentiality/residency;
- relied-on-by relations and immutable RelianceBindings;
- reconstruction level/limitations;
- untrusted-content processing state;
- no implication that hash means authenticity/truth.

Filename and current URL are descriptive only.

---

# 4. Upload/capture interaction

Upload proceeds through:

1. local selection;
2. untrusted capture and integrity identity;
3. malware/content safety checks where supported;
4. source/actor/channel/time declaration;
5. target/task/version correlation;
6. metadata/identity validation;
7. proposed EvidenceBinding or import proposal;
8. user review;
9. bounded acceptance command where required;
10. result/limitations.

Upload alone does not:

- accept source facts;
- normalize values;
- satisfy approval/prerequisite;
- issue/send content;
- overwrite an evidence version;
- create a domain event.

Interrupted upload is resumable or safely restarted under exact upload identity; duplicate content does not imply duplicate evidence identity.

---

# 5. Source versus structured comparison

Where normalized values are shown beside source:

- preserve exact source location/page/section where available;
- show extraction/transcription method and actor/model/version;
- highlight differences, missing/ambiguous fields and buyer adjustments;
- maintain independent version history;
- prohibit editing the source through the normalized grid;
- allow correction through exact proposal/command path;
- keep supplier confirmation separate.

AI extraction, when later activated, is proposal-only and source-linked.

---

# 6. Annotation and collaboration

Annotations bind author, time, target version/location and visibility.

They are not:

- source content;
- evidence correction;
- approval outcome;
- domain status;
- communication acknowledgment;
- supplier confirmation.

A note may trigger a task/proposal but cannot silently mutate load-bearing facts.

No generic collaboration-suite scope is created.

---

# 7. Issued artifact interaction

Before issue, interface exposes:

- artifact type/version;
- exact member set and member versions;
- source/report/projection/definition identities;
- addressees/recipient basis;
- channel and prerequisites;
- issue/publication intent;
- limitations/confidentiality;
- preview integrity;
- correction/restatement/withdrawal behavior;
- explicit non-equivalence of draft/current live content.

After issue, artifact/member set is immutable. “Replace file” creates new artifact/version/issue relation, never silent overwrite.

---

# 8. Communication occurrence view

Distinct occurrence states:

- prepared;
- issued;
- dispatch attempted;
- provider accepted;
- delivered/received where evidenced;
- read/open where evidenced;
- receipt acknowledgment;
- substantive content response;
- owning-domain effect established;
- failed/partial/indeterminate.

UI labels may not collapse them into “sent” or “completed.”

Every occurrence binds message/envelope/recipient/channel/attempt/correlation/time/evidence identities.

---

# 9. Recipient and distribution interaction

Before issue/send:

- show exact frozen recipients or governed distribution basis;
- show external/internal classification and authority;
- warn/block unauthorized/conflicting recipients;
- preserve BCC/hidden-recipient semantics without leaking them;
- distinguish contact email from authority/relationship;
- re-preview when recipient set changes;
- no use of stale saved recipients without current validation.

Retry uses original PublicationIntent. New audience/target creates new publication and, if effect-bearing, new logical operation.

---

# 10. Correction, retraction and supersession

UI distinguishes:

- source correction;
- evidence retraction;
- redaction;
- replacement version;
- report restatement;
- artifact withdrawal;
- domain correction.

A later evidence correction does not automatically reverse/retime domain truth or invalidate an established CommunicationSatisfactionSnapshot. Consequence change requires owning-domain correction.

Historical consumers see the original relied-upon version plus current limitation/correction relation.

---

# 11. Redaction, restriction and disposition

Must show:

- whether payload exists but is restricted;
- whether a redacted representation is shown;
- redaction basis/version;
- disposition event/tombstone;
- remaining metadata/provenance;
- impact on reconstruction/current reliance;
- request/access route where permitted.

Restricted/disposed cannot look like “no document.”

UI cannot offer download/open where policy denies it, nor reveal restricted filename/snippet/content through search/tooltips.

---

# 12. Untrusted content

External files, emails, imported text and future AI prompts are untrusted data.

Interaction must:

- distinguish preview from executable content;
- avoid automatic macro/script execution;
- surface unsupported/encrypted/corrupt states;
- preserve original while any safe rendering/derived text is separate;
- prevent embedded instructions from becoming system/agent commands;
- quarantine suspicious content without declaring it false;
- preserve evidence/communication occurrence and limitations.

---

# 13. Historical reliance interaction

A user viewing an old decision/report sees:

- exact evidence versions relied upon at the time;
- issue-time authority/configuration/use context;
- later correction/retraction/disposition notices;
- current reconstruction level;
- whether new reliance is permitted/limited/blocked;
- no silent rebinding to current source link/version.

---

# 14. Search/export

Search/export preserves:

- version/status/source;
- confidentiality/access;
- limitation/redaction;
- exact result/member set where issued;
- no current-link substitution;
- no hidden restricted snippets;
- export identity and generated time.

Downloaded/edited copies are external working copies and cannot re-enter as authoritative correction except through bounded import/proposal/command.

---

# 15. Hostile scenarios

1. user edits normalized field and assumes source changed;
2. same hash used for two evidence records;
3. current URL content changes;
4. annotation says “approved”;
5. upload shown as prerequisite satisfied before acceptance;
6. issued PDF link opens regenerated current content;
7. recipient set changes on retry;
8. provider accepted shown as delivered;
9. read receipt shown as domain acknowledgment;
10. evidence retracted after domain effect;
11. disposed evidence shown missing;
12. restricted file appears absent in search;
13. malicious attachment includes prompt instructions;
14. edited export re-uploaded as truth;
15. source and evaluation layers merge in comparison grid.

---

# 16. Exit test

Pass only when exact source/version/reliance/issue/recipient/occurrence meaning survives viewing, upload, comparison, annotation, communication, correction, restriction, disposition, search and export without becoming a CDE or communication truth owner.