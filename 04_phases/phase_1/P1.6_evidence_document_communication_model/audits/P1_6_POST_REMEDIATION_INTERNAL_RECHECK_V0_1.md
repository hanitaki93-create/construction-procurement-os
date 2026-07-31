# P1.6 — Post-Remediation Internal Recheck v0.1

**Date:** 2026-07-31  
**Target:** `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_2.md`  
**Verdict:** PASS / EXTERNAL HOSTILE REVIEW READY  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Recheck scope

Recheck:

- BL-P16-01 immutable historical evidence reliance;
- BL-P16-02 external reconstruction anchor;
- BL-P16-03 communication-conditioned effectiveness;
- W-P16-01–05 hardening;
- all original P1.6 gates;
- P1.1–P1.5 regression;
- P07 sole XL;
- A0–A3 minimal activation;
- product-code lock.

---

# 2. BL-P16-01 recheck — RelianceBinding

## Scenario A — later supplier revision

AwardDecision used Quote Rev0 line 14.

Rev1 arrives later.

Result:

- Rev1 creates new EvidenceVersion/capture;
- effective AwardDecision remains immutably bound to Rev0 + exact SourceLocator;
- “latest supplier revision” can project Rev1 while “governing award revision” remains Rev0;
- reevaluation/correction creates a new domain event and new binding.

PASS.

## Scenario B — mistaken original binding

Operator later proves the award record was incorrectly linked to Quote RevA instead of Quote RevB.

Result:

- original reliance claim remains historical;
- governed correction records error, corrected binding, authority/time and affected-domain disposition;
- source EvidenceVersions are not edited;
- downstream correction/reevaluation is explicit if required.

PASS.

## Scenario C — ancillary evidence changes

A contextual note/link changes after award.

If not load-bearing, it may be updated/versioned without touching the immutable RelianceBinding.

PASS.

**BL-P16-01 CLOSED.**

---

# 3. BL-P16-02 recheck — ReconstructionAnchorTest

## Scenario A — provider object ID points to current version

CDE `DOC-481` always resolves current revision.

No immutable revision ID and no local capture.

Result:

- fails ReconstructionAnchorTest;
- may be ancillary/unresolved;
- cannot satisfy load-bearing SOURCE_BASIS requiring exact reconstruction.

PASS.

## Scenario B — provider supports immutable revision ID

CDE object `DOC-481`, immutable revision `REV-3`, historically addressable under provider semantics.

Result:

- version anchor may satisfy exact-source requirement with source/version/locator/observed/freshness provenance;
- connector/storage implementation later verifies actual provider semantics.

PASS.

## Scenario C — no provider versioning but local capture permitted

OS captures exact external Rev3 bytes with origin/reference/provenance.

Result:

- local EvidenceVersion is product evidence of what was relied on;
- external CDE remains business authority;
- historical source is reconstructable.

PASS.

## Scenario D — source later disappears legitimately/unexpectedly

Original reliance had valid anchor/capture.

Later external availability changes or valid disposal occurs.

Result:

- domain truth remains historical;
- availability/disposition state changes separately;
- reconstruction limitation is explicit;
- no fabricated content.

PASS.

**BL-P16-02 CLOSED.**

---

# 4. BL-P16-03 recheck — communication-conditioned effectiveness

## Scenario A — effective award, then notification fails

Profile = EFFECTIVE_THEN_NOTIFY.

AwardDecision becomes effective first.

Award notification email bounces.

Result:

- AwardDecision remains effective;
- failed transport is separate evidence;
- no silent rollback;
- owning process may take separate remedial communication/domain action if required.

PASS.

## Scenario B — instruction effective only on dispatch

Profile = COMMUNICATION_GATED_EFFECTIVENESS.

Sequence:

1. authorized pre-effective instruction basis frozen;
2. exact instruction artifact/Transmittal created;
3. provider send/dispatch observation recorded;
4. MakeInstructionEffective consumes that observation;
5. effective time uses dispatch observation if governing rule says so.

PASS.

## Scenario C — crash after dispatch before effectiveness command

Dispatch observation exists; domain command timed out/not committed.

Result:

- retry uses same immutable communication observation/pre-effective basis;
- no reissue/regeneration required;
- idempotent domain command can establish effective event with correct communication-derived effective time.

PASS.

## Scenario D — delivery required but only send exists

Profile requires DeliveryObservation.

Provider send observation exists but delivery not proven.

Result:

- domain effectiveness remains pending;
- send cannot substitute for delivery.

PASS.

## Scenario E — receipt acknowledgment versus content acceptance

Profile requires substantive supplier acceptance.

Supplier sends “received”.

Result:

- AcknowledgmentObservation exists;
- insufficient for substantive acceptance;
- domain effectiveness remains pending until valid ContentResponseEvidence + authority/invariant validation.

PASS.

**BL-P16-03 CLOSED.**

---

# 5. Watch recheck

## W-P16-01 time semantics

Source date, source sent assertion, provider send, delivery/receive, read/open, acknowledgment, OS capture and domain effective time are distinct typed observations.

PASS.

## W-P16-02 external freshness history

Current external availability/freshness/conflict updates observation history; prior relied-on state/version remains reconstructable.

PASS.

## W-P16-03 EvidenceRecord lineage

Lineage requires source/business relation evidence or governed reconciliation; filename/hash/similarity alone insufficient; mistaken assignment corrected history-preservingly.

PASS.

## W-P16-04 redacted issue

Redacted disclosure becomes separate derived EvidenceVersion + own PRODUCT_ISSUED/Transmittal, while original historical source/reliance remains.

PASS.

## W-P16-05 physical custody

Scan/photo identity/integrity remains separate from physical-original custody/location observation.

PASS.

---

# 6. Additional hostile scenarios

## H01 — same bytes, different suppliers

Same manufacturer datasheet hash uploaded by Supplier A and Supplier B.

Result: distinct evidentiary source histories; no hash-based merge.

PASS.

## H02 — same quote, two channels

Supplier Quote Rev1 sent email and portal.

Where equivalence proven:

- one EvidenceVersion;
- separate Capture/CommunicationOccurrences;
- one BidSubmission/domain revision unless actual business process created two separate submission events.

PASS.

## H03 — email body modifies attachment meaning

Same quote PDF resent with email saying “VAT now excluded”.

Result:

- attachment EvidenceVersion may be same;
- new MessageEnvelope/source evidence is distinct;
- owning domain must bind both if the email statement affects contractable/evaluation basis.

PASS.

## H04 — valid signature by unauthorized employee

Signature validation succeeds.

Result:

- integrity/attribution evidence can pass;
- business authority can still fail;
- internal P09/domain authorization unaffected.

PASS.

## H05 — payload disposed after valid retention end

AwardDecision remains retained; source quote payload is legitimately disposed under basis.

Result:

- domain event/binding history remains;
- minimal justified DispositionRecord/tombstone remains if basis supports;
- payload absence/reconstruction limitation is explicit;
- no near-complete metadata shadow retained.

PASS.

## H06 — redacted copy shared externally

Original claim contains confidential annex.

Redacted copy issued to external reviewer.

Result:

- original SOURCE_CAPTURED version unchanged;
- redaction action and derived version preserved;
- external Transmittal binds redacted version only;
- historical internal certification reliance can remain bound to original.

PASS.

## H07 — AI extraction error

Supplier quote source says 850,000. AI extracts 650,000. Buyer corrects before award.

Result:

- source exact version/location preserved;
- DerivedObservation 650,000 preserved/rejected/corrected as applicable;
- final normalized/evaluation/domain basis traces correction;
- AI observation never becomes supplier source truth.

PASS.

## H08 — physical delivery note scanned

Paper delivery note scanned and uploaded.

Result:

- scan has digital content identity/integrity;
- paper-original/custody status remains separate if relevant;
- scan cannot silently assert warehouse acceptance/GoodsReceipt.

PASS.

---

# 7. Gate check

- G1 exact source version/location reconstruction — PASS
- G2 external communication capture completeness/effectiveness — PASS
- G3 no evidence/message direct business writer — PASS
- G4 revision/issue/supersession immutability — PASS
- G5 external reference reconstructability — PASS
- G6 issue/send/delivery/read/ack/content/domain separation — PASS
- G7 retention/redaction/disposition — PASS
- G8 AI/source/derived provenance — PASS
- G9 duplicate channel/business dedupe — PASS
- G10 hash/content/business identity separation — PASS
- G11 source principal/attribution/physical scan/custody — PASS
- G12 no CDE/email/records/signature/legal gravity — PASS
- G13 A0–A3 minimal activation — PASS
- G14 P1.1–P1.5 regressions/P07 sole XL — PASS
- G15 product code locked — PASS

---

# 8. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

P1.5 Pattern A/B seam does not change P1.5 event meaning; it specifies the P1.6 evidence observation a P1.5/P01–P12 domain guard may consume where communication is a pre-existing governing condition.

---

# 9. Non-blocking debt/watch list for external review

- exact physical storage/versioning strategy remains later implementation;
- exact hash algorithms/signature providers remain later;
- exact UAE/GCC transaction-specific formality/retention requirements remain legal evidence debt;
- exact external CDE/provider version semantics must be validated by each connector under ReconstructionAnchorTest;
- full-text indexing/search/preview implementation remains later;
- exact email authentication/protocol evidence (SPF/DKIM/provider metadata, etc.) remains connector/security detail; PrincipalAttributionBasis preserves the semantic distinction now;
- broader AI confidence/orchestration remains P1.10.

None currently changes evidence meaning/ownership/lifecycle.

---

# 10. ADR candidate impact

External audit should test whether semantic closure supports:

### ADR-0027 — Evidence identity/version/content-integrity/reconstruction-anchor model

Candidate ACCEPT if auditor agrees.

### ADR-0028 — Communication/transmittal/delivery/acknowledgment/domain-effect boundary

Candidate ACCEPT if auditor agrees.

No change recommended to accepted P1.4/P1.5 ADRs.

ADR-0006 remains P1.7 connector depth.
ADR-0016 remains P1.9 external UX.
ADR-0017 remains P1.10 broader AI readiness.

---

# 11. Internal verdict

`PASS — P1.6 internal hostile blockers are closed; external hostile audit ready.`

P1.6 remains ACTIVE until Claude agrees and final checkpoint/ADR reconciliation is complete.

P1.7 remains LOCKED.

Product code remains LOCKED.
