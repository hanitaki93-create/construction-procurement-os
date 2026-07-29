# P1.2 Public Contractor Role / Artifact Map v0.1

**Date:** 2026-07-29  
**Purpose:** satisfy the P1.2 requirement that every reconstructed workflow step has a named role and artifact/evidence carrier.

Only steps directly supported by public contractor-origin evidence are included. Where a source exposes a state/action but not a named internal form, the artifact is the externally observable record/document named by the source rather than an invented object.

---

## PUB-01 — Khansaheb Civil Engineering LLC, UAE

### Material purchase workflow

| Step | Named role | Artifact / record |
|---|---|---|
| Site need raised | Site requester / project site | Material requisition; sampled IDs include RM26660, RM24169, RM27792 |
| Requisition authorization | Divisional Manager | Approved material requisition |
| Commercial order prepared/issued | Procurement + authorized signatory | LPO; sampled IDs include G0013801, G0013451, G0013927 |
| Supplier receives order | Supplier | Forwarded LPO |
| Order follow-up | Procurement | LPO/follow-up record referenced by procedure |
| Physical delivery | Supplier / site receiving function | Delivery Note; sampled DNs verified |
| Receipt recorded | Site/receiving function | GRN; sampled GRNs include 19543 and others verified in audit |
| Invoice processed | Accounts | Supplier invoice referenced after GRN |
| Supplier performance reviewed | Procurement / management | Supplier Performance Evaluation; Supplier Selection Questionnaire |

### Tender / project overlay

| Step | Named role | Artifact / record |
|---|---|---|
| Tender opportunity/enquiry | Estimation / commercial function | Enquiry log |
| Authority to tender | Major tender approval authority | T39 + Authority Matrix |
| Tender document review | Estimation/commercial | Tender review form T3 |
| Contract review | Commercial/management | Contract review T4 |
| Estimate/cost build-up | Estimation | CANDY estimate; BOQ coded by trade; resource analysis |
| Commercial settlement | Estimation/commercial management | Commercial Summary T75 with agreed/approved signatures; Bid Settlement presentation |
| Client submission | Estimation/commercial | Technical & Commercial Submission ref. KID/SPN/EST/T096/07/271/2015 |
| Post-tender adjustment | Commercial/client interface | Post Tender Clarification No. 2; adjusted tender sum |
| Acceptance | Client / contractor commercial | Letter of Acceptance from Dubai Properties |
| Job setup / handover | GGM / project team | Contract Number request; Job Setup form M2a; Handover Meeting form F1.1 |
| Technical approval during delivery | Project/consultant | Material Submittal Schedule; Drawing Submittal Schedule; WIR approvals/rejections; NCRs |

**Role/artifact map status:** COMPLETE FOR THE RECONSTRUCTED STEPS.

---

## PUB-02 — ASGC, UAE

| Step | Named role | Artifact / record |
|---|---|---|
| Supplier registration/access | Vendor / ASGC eProcurement | Vendor registration / portal account |
| RFQ issued | ASGC procurement/buyer | RFQ record |
| Supplier notified | ASGC system → vendor | RFQ notification email/link |
| Supplier reviews requirement | Vendor | Active RFQ + contractor-origin BOQ/source fields |
| Supplier enters commercial header | Vendor | Quotation Basic Data: currency, payment method, delivery method, comments |
| Supplier prices requirement | Vendor | Quotation Detail: quantity/rate/line response |
| Supplier adds legitimate offered extras | Vendor | Supplier-added quotation item(s), distinct from locked contractor-origin fields |
| Supplier responds to non-price criteria | Vendor | Evaluation Criteria tab |
| Contractor evidence provided | ASGC | Contractor Documents tab |
| Supplier evidence provided | Vendor | Supplier Documents tab |
| Quote finalized | Vendor | Completed quotation record |
| Quote submitted | Vendor | Explicit quotation submission action/status |
| Downstream transaction interaction | Vendor / ASGC | LPO retrieval and invoice submission functions exposed by eProcurement |

**Role/artifact map status:** COMPLETE FOR THE PUBLIC RFQ/QUOTE FLOW.

---

## PUB-03 — Bechtel — engineered materials / equipment procurement

| Step | Named role | Artifact / record |
|---|---|---|
| Requirement prepared | Engineering with Buyer guidance | Material Requisition |
| Candidate vendors assembled | Buyer / Procurement | Bidder List |
| Vendors qualified | Buyer / Procurement | Qualification/prequalification record/status referenced by role |
| Solicitation formed | Buyer | Bid Package / Bid Request Package |
| Solicitation issued | Buyer → approved bidders | Bid Request / RFQ |
| Bidder questions coordinated | Buyer + Engineering / bidder | Bidder Q&A / clarification record |
| Bids received | Buyer | Bid / proposal |
| Commercial evaluation | Buyer / Procurement | Commercial evaluation / Commercial Bid Summary inputs |
| Technical evaluation | Engineering / functional personnel | Technical evaluation referenced by procurement roles |
| Comparison/recommendation | Buyer | Commercial Bid Summary + recommendation to award |
| Approval | Designated approval authority / supervisor | Approval in accordance with established procedures / delegated authority |
| Obligation prepared/issued | Buyer / Procurement | Purchase Order or subcontract document for execution |
| Supplier performance administered | Buyer / Expediter / Contracts | PO/subcontract administration records; correspondence/status reporting |
| Changes governed | Buyer / Contracts + supplier | PO change agreement and PO revision establishing scope/cost/schedule effect |
| Expediting | Buyer/Expediter | Submittal/fabrication/delivery status records |
| Closeout | Buyer / Contracts | Closeout/control status records |

**Role/artifact map status:** COMPLETE FOR THE RECONSTRUCTED FIRST-PARTY ROLE DESCRIPTION.

---

## PUB-04 — Fluor — subcontract lifecycle

| Step | Named role | Artifact / record |
|---|---|---|
| Candidate/pre-award context | Contract/Subcontract Management | Contractor profile / historical bid/performance/claim information in CMSi |
| RFP prepared | Contract/Subcontract Administrator / management | RFP package |
| Pre-bid explanation | Contracts/Subcontracts + bidders | RFP explanation / pre-bid meeting record |
| Proposal received | Bidder → Contracts/Subcontracts | Proposal |
| Commercial evaluation | Contracts/Subcontracts | Commercial proposal evaluation |
| Technical evaluation | Functional/technical personnel | Coordinated technical evaluation |
| Final evaluation/recommendation | Contracts/Subcontracts | Final proposal evaluation + recommendation |
| Decision/approval | Project/client decision makers / designated authority | Recommendation/decision record referenced by role |
| Contract finalized | Contracts/Subcontracts | Finalized subcontract/contract |
| Performance monitored | Contract/Subcontract Administrator | Performance / schedule status records |
| Changes administered | Contract/Subcontract Administrator | Change/modification records |
| Invoice reviewed | Contract/Subcontract Administrator + project functions | Invoice/billing record |
| Claim/backcharge context administered | Contracts/Subcontracts | Claim/backcharge records/history |
| Final modification/closeout | Contracts/Subcontracts | Final modification / closeout / performance evaluation record |

**Role/artifact map status:** COMPLETE FOR THE RECONSTRUCTED FIRST-PARTY CONTRACTS FLOW.

---

## PUB-05 — Larsen & Toubro / NPL — RFQ / negotiated quotation / comparative / PO

| Step | Named role | Artifact / record |
|---|---|---|
| RFQ created/issued | Buyer / NPL procurement | SAP enquiry / RFQ |
| Supplier receives solicitation | Vendor | RFQ + optional Excel input file |
| Initial quotation submitted | Vendor → Buyer | Initial offer in Excel/PDF; Initial Offer Reference Number |
| Offer attached to sourcing record | Buyer | Uploaded quote against selected RFQ in SAP |
| Negotiation occurs | Buyer + vendor | Negotiation interaction; original offer remains preserved |
| Final quotation submitted | Vendor → Buyer | Final Offer alongside Initial Offer Reference Number |
| Commercial details normalized | Buyer / system | Tax codes/rates, T&C, item rates/amounts, explicit item-level No Quote where applicable |
| Comparative produced | Buyer | Comparative Statement, multiple RFQs/offers side-by-side |
| Commercial ranking visible | Buyer / approval users | Discount %, rank/L1, rates, amounts, basic total, tax-inclusive total |
| Order basis selected | Buyer / approval authority | Adopted selected RFQ/final-offer basis |
| PO created | Buyer / procurement | Purchase Order referencing selected final commercial basis |

**Role/artifact map status:** COMPLETE FOR THE RECONSTRUCTED COMPARATIVE FLOW.

---

## Gate conclusion

For the five public contractor reconstructions, every included workflow step now has:

- a named responsible actor/role or explicit external party; and
- a source-evidenced artifact/record/evidence carrier.

No architecture object name was substituted merely because the public contractor used different terminology.

**P1.2 ROLE / ARTIFACT MAP REQUIREMENT: CLOSED FOR THE FIVE PUBLIC RECONSTRUCTIONS.**

This does not close the separate gate requiring decomposition of one **completed authentic bid-leveling artifact with real bidder rows**.