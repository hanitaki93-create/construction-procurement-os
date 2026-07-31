# P1.6 — Internal Hostile Audit v0.1

**Date:** 2026-07-31  
**Target:** `P1_6_INTEGRATED_EVIDENCE_COMMUNICATION_CANDIDATE_V0_1.md`  
**Verdict:** FAIL NARROWLY / REMEDIATION REQUIRED  
**P1.6:** ACTIVE  
**P1.7+:** LOCKED  
**Product code:** LOCKED

---

# 1. Audit posture

Attack P1.6 as if a later builder wanted to exploit every ambiguity while still claiming compliance.

Do not fail for physical storage/API/UI choices.

Fail where a later phase would have to choose what evidence is historically authoritative, what exact version was relied on, what communication fact changes business effectiveness, or whether a reference is reconstruction-safe.

---

# 2. Blockers

## BL-P16-01 — historical EvidenceBinding mutability is not explicitly closed

### Failure

The candidate defines typed `EvidenceBinding` and immutable EvidenceVersion, but does not explicitly say that once a governed domain event relies on a `SOURCE_BASIS`/equivalent binding, that exact event↔evidence-version↔locator reliance link becomes immutable historical truth.

### Concrete scenario

AwardDecision A used supplier Quote Rev0 line 14.

After award, Rev1 arrives.

An implementation stores one editable `award.evidence_id`/binding and updates it to Rev1 because Rev1 is “current”.

The EvidenceVersions themselves remain immutable, so the builder claims P1.6 compliance, but the historical basis has been rewritten.

### Why blocking

P1.6 gate G1 fails: the system cannot prove which version/location the award actually relied on.

P1.5 historical meaning is also indirectly corrupted without changing P1.5 event rows.

### Narrow remediation

Define a separate immutable **RelianceBinding** semantic rule for load-bearing event/evidence relationships:

- exact domain fact/event/decision identity;
- exact EvidenceVersion;
- exact SourceLocator where applicable;
- binding role;
- governing action/time/version;
- immutable once the domain event is effective.

Correction adds a new correction/supersession/re-evaluation binding/event; it never overwrites the historical reliance link.

Non-load-bearing ancillary links may remain mutable/versioned as convenience relationships.

---

## BL-P16-02 — “stable external version anchor” lacks a semantic sufficiency test

### Failure

The candidate correctly rejects a mutable URL, but a builder could call almost any provider ID a “stable version anchor”, including an object ID whose content changes in place.

### Concrete scenario

External CDE object ID `DOC-481` always resolves to the current revision. AwardDecision used Rev3. Later the CDE updates `DOC-481` to Rev5 while keeping the object ID.

P1.6 stores `DOC-481` and calls it a stable object anchor.

Historical award reconstruction now returns Rev5.

### Why blocking

Whether an external reference is version-safe is evidence meaning, not connector representation.

P1.7 must not be forced to invent this test.

### Narrow remediation

Define a **ReconstructionAnchorTest**:

An external reference is sufficient for load-bearing `SOURCE_BASIS` only if its source contract/evidence semantics identify the exact immutable/historically retrievable version relied on, such that later current-version change cannot substitute another content state.

A stable object ID without stable version identity fails.

If the source cannot satisfy the test, immutable local capture is required for load-bearing reliance where legally/contractually permitted; otherwise the dependency remains unresolved and cannot satisfy the relevant evidence gate.

---

## BL-P16-03 — communication-conditioned business effectiveness has an unresolved sequencing cycle

### Failure

The candidate says communication does not create domain truth and, if delivery/acknowledgment is a condition of effectiveness, the owning domain consumes the P1.6 observation.

But for a product-generated artifact whose content comes from the domain action itself, the candidate does not define whether the business event exists before the document is issued, or whether the document must be issued before the event becomes effective.

### Concrete scenario

A governed instruction is approved internally but contract semantics say it becomes effective only when validly dispatched to the subcontractor.

The instruction PDF needs exact instruction number/content to issue.

If `MakeInstructionEffective` runs first, the instruction is commercially effective before dispatch.

If issue must run first, what authoritative pre-effective basis generated the supposedly final instruction artifact?

A failed transport retry makes the ambiguity worse.

### Why blocking

P1.7/API implementation would have to invent a lifecycle meaning decision.

This is not transport technology; it decides when the business event becomes effective.

### Narrow remediation

Freeze two supported semantic patterns:

1. **EFFECTIVE_THEN_NOTIFY** — owning domain event becomes effective under its own guards; product issues notification/artifact afterward. Delivery failure is separate evidence/process state and does not silently reverse the event.
2. **COMMUNICATION_GATED_EFFECTIVENESS** — owning domain first creates/authorizes a pre-effective immutable decision/instruction basis sufficient to freeze the outgoing EvidenceVersion/Transmittal. Required issue/dispatch/delivery/acknowledgment observation occurs. A second bounded owning-domain effectiveness command consumes that exact P1.6 observation and makes the event effective.

Where “send/dispatch” itself is the condition, the governing domain profile must identify the P1.6 observation that satisfies it.

P1.6 does not create the business effect; it supplies the exact communication fact.

No generic third implicit pattern.

---

# 3. Watches / non-blocking hardening

## W-P16-01 — time observations

Explicitly separate:

- source-authored document date;
- source-sent-time assertion;
- provider/transport send observation;
- delivery/receive observation;
- OS captured/observed time;
- domain effective time.

Otherwise one `timestamp` field may collapse them later.

## W-P16-02 — external freshness/availability is observation history

EvidenceVersion is immutable.

Current external freshness/availability/conflict must be new observations/projection, not overwritten mutable fields that erase what was known at decision time.

## W-P16-03 — source lineage membership correction

Clarify that EvidenceRecord lineage membership is established by source/business relationship evidence or governed classification, not filename/content similarity, and mistaken lineage assignment is corrected history-preservingly.

## W-P16-04 — redacted artifact issue

If a redacted derived representation is externally issued, it becomes its own PRODUCT_ISSUED EvidenceVersion/Transmittal while preserving derivation/redaction linkage to the source.

## W-P16-05 — physical-original custody

P1.6 correctly avoids paper records management. Clarify that where physical-original custody/location is itself load-bearing, it is a bounded external/reference/custody observation with provenance; a scan does not silently assert physical custody.

---

# 4. Gate check

- G1 exact source version/location reconstruction — FAIL (BL-P16-01, BL-P16-02)
- G2 external communication capture completeness — FAIL narrowly (BL-P16-03 sequencing/effectiveness)
- G3 evidence/message never direct business writer — PASS conceptually; BL-P16-03 requires sequencing hardening
- G4 revision/issue/supersession immutability — PASS except reliance binding gap under G1
- G5 external reference reconstructability — FAIL (BL-P16-02)
- G6 issue/delivery/read/ack/content/domain separation — PASS
- G7 retention/redaction/disposition — PASS with W-P16-04
- G8 AI/source/derived provenance — PASS
- G9 duplicate channel/business dedupe — PASS
- G10 hash/content/business identity separation — PASS
- G11 source principal/attribution/physical scan semantics — PASS with W-P16-05
- G12 no CDE/email/records/signature/legal gravity — PASS
- G13 A0–A3 minimal activation — PASS
- G14 P1.1–P1.5 regressions/P07 sole XL — PASS subject to blocker remediation
- G15 product code locked — PASS

---

# 5. Regression / gravity check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO if BL-P16-03 is resolved as a P1.6 communication-to-domain seam rather than changing P1.5 event meaning
- SECOND XL = CLEAN
- A0–A3 = CLEAN

---

# 6. ADR posture

No ADR status changes.

Candidate future ADR-0027/0028 remain reasonable only after blockers close.

No evidence supports reopening accepted ADR-0014, 0018, 0020, 0021, 0024, 0025 or 0026.

---

# 7. Verdict

`FAIL — P1.6 is coherent but not external-audit ready until BL-P16-01/02/03 are closed.`

All three blockers are narrow semantic closure issues; none requires new product scope or a second subsystem.
