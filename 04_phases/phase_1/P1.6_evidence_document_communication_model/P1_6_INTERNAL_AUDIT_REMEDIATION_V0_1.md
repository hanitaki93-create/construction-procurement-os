# P1.6 — Internal Hostile Audit Remediation v0.1

**Date:** 2026-07-31  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent audit:** `audits/P1_6_INTERNAL_HOSTILE_AUDIT_V0_1.md`  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close:

- BL-P16-01 — historical evidence reliance binding mutability;
- BL-P16-02 — external reconstruction-anchor sufficiency;
- BL-P16-03 — communication-conditioned business-effect sequencing;
- W-P16-01–05 — time/freshness/lineage/redaction/physical-custody hardening.

These clauses supersede the affected current-candidate wording where inconsistent.

---

# 2. R01 — immutable historical RelianceBinding

A load-bearing governed domain fact/event/decision that relies on evidence creates or binds an immutable historical **RelianceBinding** semantics.

A RelianceBinding identifies as applicable:

- tenant/project/context;
- exact authoritative domain fact/event/decision identity;
- exact EvidenceVersion;
- exact SourceLocator where specific source content was relied on;
- binding role (`SOURCE_BASIS`, `VALIDATION_EVIDENCE`, `CORRECTION_EVIDENCE`, etc.);
- EvidenceRecord/source principal context;
- EvidenceBinding/reliance action identity;
- governing policy/config/authority version where material;
- relied-on time/effective context;
- provenance/audit identity.

## R01.1 — effectivity freezes reliance

Once the governed domain event becomes effective, its load-bearing RelianceBinding cannot be overwritten to point to a later/current EvidenceVersion or locator.

## R01.2 — later revisions are new evidence, not rebinding

If Quote Rev1 arrives after AwardDecision used Rev0:

- Rev1 is a new EvidenceVersion/capture;
- the AwardDecision→Rev0 RelianceBinding remains historical;
- reevaluation/correction, if required, creates a new governed domain event and new RelianceBinding(s).

## R01.3 — correction is additive/history-preserving

A mistaken RelianceBinding is corrected through a governed correction/supersession/re-evaluation record preserving:

- original binding;
- error/reason;
- corrected binding;
- authority/action/time;
- affected domain disposition.

The original historical claim is never silently replaced.

## R01.4 — ancillary relations

Non-load-bearing convenience/context links may be versioned/updated without becoming historical reliance truth.

The system must distinguish ancillary relationship from effective RelianceBinding.

## R01.5 — issued-output binding

A PRODUCT_ISSUED EvidenceVersion/Transmittal binds immutably to the issue/domain action that produced it.

A later reissue creates a new issue/output binding.

---

# 3. R02 — ReconstructionAnchorTest

An external reference is sufficient as load-bearing `SOURCE_BASIS` only when it passes the **ReconstructionAnchorTest** at the time of reliance.

## R02.1 — required semantic properties

The external anchor must identify the exact source version relied on such that later current-state change cannot silently substitute different content.

The supported source/connector/reference semantics must provide enough evidence of:

1. authoritative external source/system;
2. object/record identity;
3. immutable or historically addressable exact version/revision identity;
4. version semantics showing that the identified version is not merely an alias to current content;
5. source principal/authority context;
6. source locator within that version where required;
7. observed/fetched time and freshness/conflict context where material;
8. retrieval/reference path sufficient for supported reconstruction while the valid retention/source-access basis exists.

## R02.2 — stable object ID alone fails

An object ID such as `DOC-481` that always resolves to “current version” is not a sufficient version anchor even if the object ID itself never changes.

A URL, path, ETag-like current-state token or provider display revision is sufficient only when its source semantics actually meet the exact-version test.

## R02.3 — local immutable capture fallback

If the external source cannot provide a reconstruction-safe version anchor, an immutable local evidentiary capture of the exact relied-on version may satisfy the requirement where capture/retention is legally/contractually/product permitted.

The local copy remains product evidence of what was relied on; external business authority does not transfer.

## R02.4 — unresolved dependency

If neither reconstruction-safe external version anchor nor permitted immutable local capture exists, the evidence cannot satisfy a load-bearing `SOURCE_BASIS` requirement that requires exact later reconstruction.

The owning domain action must remain blocked/unresolved or use another valid evidence basis.

No generic “URL accepted by user” override bypasses this semantic gate.

## R02.5 — later legitimate source unavailability

If a historically valid anchor/capture later becomes inaccessible or payload is legitimately disposed:

- historical reliance is not reversed;
- availability/disposition state changes separately;
- reconstruction limitation is explicit;
- missing content is not fabricated.

This does not retroactively mean the original anchor failed if it satisfied the governing requirement at the time.

---

# 4. R03 — communication-conditioned effectiveness patterns

P1.6 supports exactly two semantic patterns for externally communicated domain actions.

The owning P01–P12 domain profile declares which pattern applies and which communication observation, if any, is load-bearing.

## Pattern A — `EFFECTIVE_THEN_NOTIFY`

Use when business/domain effectiveness does not depend on external issue/dispatch/delivery/acknowledgment.

Sequence:

1. owning domain command validates authority/invariants and makes domain event effective;
2. exact resulting PRODUCT_GENERATED/PRODUCT_ISSUED artifact is frozen as applicable;
3. Transmittal/CommunicationOccurrences attempt notification/issue;
4. delivery/acknowledgment observations are recorded separately.

Rules:

- notification failure does not silently reverse the effective domain event;
- a separate domain correction/withdrawal is required if the business process later needs one;
- external issue still preserves exact artifact/communication provenance.

Examples may include informational award notification after an already effective AwardDecision, subject to actual product/contract profile.

## Pattern B — `COMMUNICATION_GATED_EFFECTIVENESS`

Use when issue, dispatch, delivery, receipt acknowledgment or another named communication fact is a governing condition of business effectiveness.

Sequence:

1. owning domain creates/authorizes a **pre-effective immutable domain basis** containing enough final business content/version/number/authority to generate the outgoing artifact without yet asserting the final effective event;
2. P1.6 freezes the exact EvidenceVersion/Transmittal from that pre-effective basis;
3. required issue/dispatch/delivery/acknowledgment observation occurs and is recorded immutably;
4. owning-domain `Make…Effective` command consumes the exact required P1.6 observation + pre-effective basis + current security/domain guards;
5. domain effective event is emitted with causal binding to that communication evidence;
6. effective time may derive from the named communication observation where the governing domain rule requires it.

Rules:

- the pre-effective basis is not final domain effectiveness;
- the outgoing document may state the authorized instruction/commitment content, but the domain status remains pre-effective until the governing communication fact exists;
- if external transport fails, effectiveness does not occur when the governing profile requires successful dispatch/delivery/acknowledgment;
- retry is idempotent: once the immutable communication observation exists, the domain effectiveness command can be safely retried without reissuing/recreating content;
- P1.6 records communication facts but never emits the commercial/domain effect itself.

## R03.1 — no hidden third pattern

A later implementation cannot invent “document save means effective”, “email queued means delivered”, “read receipt means accepted” or another implicit effect rule.

The governing domain must select Pattern A or Pattern B and, for Pattern B, the exact observation type/basis.

## R03.2 — issue/dispatch/delivery distinctions

If the rule says:

- effective on **issue** → consume immutable issue/Transmittal fact;
- effective on **dispatch/send** → consume the named CommunicationOccurrence/send observation under the governing channel rule;
- effective on **delivery/receipt** → consume DeliveryObservation under the governing rule;
- effective on **acknowledgment** → consume AcknowledgmentObservation;
- effective on substantive **acceptance/agreement** → source ContentResponseEvidence plus owning-domain authority/invariant validation is required; acknowledgment of receipt is insufficient.

---

# 5. R04 — explicit TimeObservation semantics

P1.6 does not use one generic `document_timestamp` for all meanings.

Preserve distinct time semantics as applicable:

- `SOURCE_DOCUMENT_DATE` — date/time stated in source content;
- `SOURCE_SENT_TIME_ASSERTION` — time claimed by source/message metadata;
- `PROVIDER_SEND_OBSERVATION` — channel/provider/system observation of dispatch/send;
- `DELIVERY_RECEIVE_OBSERVATION` — channel/provider/addressee observation of delivery/receipt;
- `READ_OPEN_OBSERVATION` — channel access/open observation;
- `ACKNOWLEDGMENT_TIME` — source/addressee acknowledgment occurrence;
- `OS_CAPTURED_OBSERVED_TIME` — when OS captured/observed evidence;
- `DOMAIN_EFFECTIVE_TIME` — owning-domain effective time.

A timestamp may satisfy more than one role only where the governing source/channel/domain semantics explicitly establish that equivalence.

No later implementation may silently substitute OS upload time for source issue/receipt/effective time.

---

# 6. R05 — external freshness/availability observation history

External EvidenceVersion/reference identity remains historical.

Current external status is recorded through observation history/projection such as:

- fetched/observed time;
- available/unavailable;
- source current/superseded status;
- provider/source conflict;
- validation/freshness state.

Updating current freshness/availability must not overwrite the value/status observed and relied on by an earlier domain event.

Historical RelianceBinding binds the observation/version context relevant at decision time where load-bearing.

---

# 7. R06 — EvidenceRecord lineage membership

EvidenceVersion membership in one logical EvidenceRecord lineage is established only by supported source/business relationship evidence or governed classification, such as:

- source document/revision family ID;
- explicit source revision/supersession statement;
- provider/CDE version lineage;
- product-issued predecessor/addendum relation;
- bounded authorized reconciliation.

Filename, subject, visual similarity or hash equality alone cannot establish lineage.

If lineage assignment was wrong, correct through explicit history-preserving separation/reclassification; do not silently move versions between histories.

---

# 8. R07 — redacted derived representation issue

If a redacted derived representation is externally issued:

1. preserve source EvidenceVersion and RedactionAction/basis;
2. create/freeze the derived redacted EvidenceVersion with its own ContentIdentity/IntegrityAssertion;
3. issue that exact derived version through its own PRODUCT_ISSUED/Transmittal occurrence;
4. preserve disclosure recipients/context;
5. never relabel it as the unredacted source.

Past domain reliance on the unredacted source remains bound to the original source version.

---

# 9. R08 — physical-original custody observation

Where physical-original custody/location is itself load-bearing, preserve a bounded provenance observation/reference identifying as applicable:

- physical source/original identity assertion;
- holder/custodian/location reference;
- observation/time;
- transfer/receipt evidence where supported;
- relationship to scanned/captured EvidenceVersion.

A scan/photo proves only its captured representation/integrity.

It does not silently prove current physical-original custody or continued existence.

P1.6 does not build a warehouse/paper records-management chain-of-custody subsystem.

---

# 10. Candidate blocker closure

- BL-P16-01 → closed by R01.
- BL-P16-02 → closed by R02.
- BL-P16-03 → closed by R03.
- W-P16-01 → hardened by R04.
- W-P16-02 → hardened by R05.
- W-P16-03 → hardened by R06.
- W-P16-04 → hardened by R07.
- W-P16-05 → hardened by R08.

P1.6 remains ACTIVE pending consolidated v0.2 + internal recheck + external hostile audit.
