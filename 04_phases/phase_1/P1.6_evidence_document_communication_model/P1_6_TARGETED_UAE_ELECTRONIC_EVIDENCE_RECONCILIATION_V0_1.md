# P1.6 — Targeted UAE Electronic Evidence Reconciliation v0.1

**Date:** 2026-07-31  
**Status:** TARGETED AUTHORITATIVE EVIDENCE / P1.6 INPUT  
**Scope:** only legal/evidentiary semantics capable of forcing P1.6 architecture  
**Product code:** LOCKED

---

# 1. Sources reviewed

Authoritative/current sources:

1. UAE Legislation — Federal Decree-Law No. 46 of 2021 on Electronic Transactions and Trust Services  
   https://uaelegislation.gov.ae/en/legislations/1539

2. TDRA — Electronic Transactions and Trust Services legal framework / law and regulations  
   https://tdra.gov.ae/en/about/tdra-sectors/information-and-digital-government/policy-and-programs-department/trust-services/laws-and-regulations

3. UAE Legislation — Federal Decree-Law No. 35 of 2022 Promulgating the Law of Evidence in Civil and Commercial Transactions  
   https://uaelegislation.gov.ae/en/legislations/1612

The English legislation pages note that Arabic prevails for interpretation where applicable. This P1.6 memo does not assert legal advice, case outcomes or universal retention durations.

---

# 2. Architecture-relevant findings

## E01 — electronic form is not inherently inferior

Federal Decree-Law No. 46 of 2021 states that an electronic document does not lose legal force merely because it is electronic and provides functional rules for writing, signatures/seals, original documents, contract creation, attribution, acknowledgment and sending/receiving.

Architecture implication:

P1.6 does not require a paper-original ontology. It requires provenance/integrity/retrievability sufficient for the supported electronic evidence path.

## E02 — storage semantics support exact-version provenance

Article 6 provides that where storage is legally required, electronic storage can satisfy the requirement when the record is preserved in its created/sent/received form or an accurately representative form, remains usable/referable later, and retains information enabling identification of originator, destination, and send/receive date/time where available/applicable.

Architecture implication:

For load-bearing evidence, P1.6 should preserve exact captured/issued version identity, later retrievability, source principal/destination/channel and relevant sending/receiving observations. Storage technology remains later design.

## E03 — original-document semantics support integrity proof, not filename/path identity

Article 9 treats an electronic document as satisfying an original-form requirement where technical evidence confirms integrity from creation in final form, the information can be presented when requested, and any supervising-authority conditions are met.

Architecture implication:

A filename, mutable URL or database row ID alone is not an integrity/originality model. P1.6 needs content-integrity semantics plus exact evidence-version provenance. Hashing is one possible implementation technique, not itself proof of legal truth.

## E04 — attribution matters

Article 12 distinguishes the Originator and circumstances in which an electronic document is issued by or attributable to that originator, including authorized representatives and automated systems.

Architecture implication:

P1.6 must separate:

- source principal/originator;
- capture/import actor;
- buyer-on-behalf representative;
- transmission/service intermediary;
- automated source/system identity.

Capturing a supplier document internally does not rewrite the acting employee into the supplier source principal.

## E05 — acknowledgment of receipt is not acknowledgment of content

Article 13 expressly separates acknowledgment of receipt from acknowledgment of the content of the electronic document.

Architecture implication:

P1.6 must maintain distinct facts for:

- sent/issued;
- delivered/received observation;
- acknowledgment of receipt;
- acknowledgment/acceptance/agreement to content;
- governed domain acceptance/decision.

A transport-level acknowledgment cannot become contract/commercial approval truth.

## E06 — send/receive time/place are their own semantics

Article 14 defines default electronic sending/receiving rules by information-system entry and designated receiving systems, subject to agreement between originator and addressee.

Architecture implication:

P1.6 should store channel/source observations and applicable communication-basis/version rather than treating one application timestamp as universally equal to legal dispatch, receipt, read or acceptance.

The exact legal determination remains contract/jurisdiction evidence, not hard-coded universally.

## E07 — qualified trust services are distinct evidence capabilities

The law provides separate concepts for electronic signatures/seals, qualified timestamps and qualified electronic delivery services; Article 18 gives specified legal effects when requirements are met.

Architecture implication:

P1.6 should be able to reference signature/seal/timestamp/delivery-service evidence and validation context, but it must not assume every electronic message/signature has qualified status and must not build a trust-service-provider platform.

`signature present` is not equivalent to `qualified signature valid` and neither fact alone bypasses internal P09/domain authorization.

## E08 — UAE Evidence Law recognizes electronic correspondence and modern communications

Federal Decree-Law No. 35 of 2022 defines electronic evidence broadly and expressly includes electronic correspondence, including email, and modern means of communication. It also gives rules for formal/informal electronic evidence and extracts.

Architecture implication:

P1.6 should treat email/portal/message-channel artifacts as potentially evidentiary source records with provenance, not as inherently secondary or disposable transport.

However, evidentiary status does not make message content domain truth automatically.

---

# 3. P1.6 semantic conclusions supported by the evidence

The evidence supports the following candidate architecture rules:

1. electronic evidence can be first-class without requiring paper-original duplication;
2. exact evidence version and integrity are different from filename/path/business identity;
3. originator/source principal is different from capture actor/intermediary;
4. send, receive, acknowledgment and content acceptance/agreement are distinct;
5. load-bearing evidence should retain enough origin/destination/time/version context for later reconstruction;
6. qualified signature/seal/timestamp/delivery evidence is a bounded evidence type/validation seam, not universal business authority;
7. email and modern communication artifacts can be evidence and need a defined capture/provenance path where load-bearing;
8. no reviewed rule forces P1.6 to become a full CDE, records-management, email or digital-signature platform.

---

# 4. Explicit non-claims

This memo does not decide:

- exact UAE/GCC retention periods for every procurement/commercial artifact;
- whether a specific e-signature method is legally sufficient for a specific transaction;
- evidentiary weight in a particular dispute;
- notarial/registration/formality requirements for transaction classes not yet evidenced;
- exact qualified trust service provider/vendor selection;
- legal-hold/eDiscovery requirements;
- storage geography beyond frozen P1.4 residency semantics.

Those remain evidence-driven legal/product/implementation matters unless later evidence proves a semantic core requirement.

---

# 5. Effect on P1.6

No P1.4/P1.5 reopening is required.

The evidence strengthens the planned P1.6 distinctions:

`source/version/integrity + originator/channel/send-receive observations + evidence binding`

must remain separate from:

`acknowledgment/acceptance/agreement + bounded domain truth transition`.

P1.6 may proceed with that boundary as an architecture candidate.
