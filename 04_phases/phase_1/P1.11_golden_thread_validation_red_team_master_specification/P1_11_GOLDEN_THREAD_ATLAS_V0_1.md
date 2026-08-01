# P1.11 — Golden-Thread Atlas v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE VALIDATION ATLAS  
**Rule:** every thread must execute with zero architecture invention.

---

# Shared execution grammar

Every thread uses the following columns even where the value is `NOT_APPLICABLE`:

1. actors/principals and ContractingAuthorityContext;
2. source evidence and exact versions;
3. canonical subjects/facts;
4. registered operations and interaction classes;
5. state/planning/observation changes;
6. commercial effect or explicit no-effect;
7. domain/integration/communication events;
8. authority/approval/DOA/guards;
9. result/effect stage and recovery;
10. reports/control observations;
11. audit/lineage/correction;
12. NFR/security/privacy/residency;
13. AI path and deterministic fallback;
14. final expected position.

---

# GT-01 — Ordinary material requisition without ProcurementPackage

**Purpose:** prove the polycentric graph and A0–A3 no-package route.

**Actors:** requester, project procurement user, approver, invited suppliers, buyer.

**Initial:** authorized project/context exists; no package; no P07; no connector/AI requirement.

**Flow:**

1. capture an authorized requirement source and EvidenceVersion;
2. create RequirementAllocation directly to a sourcing event/RFQ route;
3. validate quantity/UOM/date/project/context and missing evidence;
4. approve RFQ issue under DOA where required;
5. issue exact immutable member set through manual/provider-neutral channel;
6. capture supplier source submissions/revisions;
7. normalize through registered field semantics while preserving source;
8. compare and prepare recommendation;
9. approve recommendation;
10. establish AwardDecision through a separate command;
11. hand off manually/structured file to external purchasing/accounting process.

**No-effect assertions:** allocation/package/recommendation/approval do not establish Commitment; manual handoff does not prove external PO/effect.

**Failure paths:** duplicate RFQ issue, stale supplier response, missing UOM, effect-indeterminate send, supplier no-response.

**Reports:** requirement/allocation, RFQ, response coverage, comparison readiness, approval and AwardDecision/handoff reports.

**Final:** AwardDecision established; external handoff recorded; no Commitment/P07 truth created.

---

# GT-02 — Standard subcontract package and competitive tender

**Purpose:** prove optional ProcurementPackage, technical/commercial evidence and competitive award.

**Actors:** project team, procurement, commercial/technical reviewers, approvers, subcontractors.

**Flow:**

1. allocate multiple requirement sources/components into an optional ProcurementPackage;
2. bind scope basis, document/evidence member set, tender rules, recipients and due dates;
3. issue tender/transmittal with exact versions and confidentiality grants;
4. receive source submissions and revisions;
5. create normalized representation, evaluation adjustments and confirmed contractable basis;
6. record compliance/clarification without changing supplier source;
7. prepare recommendation with exact comparison population and quality/use status;
8. conduct sequential/parallel approvals under bound policy/DOA;
9. establish AwardDecision;
10. produce external handoff artifact without establishing Commitment unless P07 is active and a separate command follows.

**Failure paths:** bidder withdrawal, conditional offer, missing technical schedule, approval return/request information, revised recommendation invalidating approval.

**Final:** immutable decision/evidence lineage and clean handoff.

---

# GT-03 — Imported long-lead equipment, multi-currency and expediting

**Purpose:** prove technical evidence, FX purposes, milestones and external observations without CPM/WMS gravity.

**Actors:** procurement, engineering, supplier, logistics/external observer, approver.

**Flow:**

1. requirement identifies equipment and required-on-site date;
2. tender binds registered quantity/UOM, technical evidence and currencies;
3. supplier quotes foreign currency with lead time and exclusions;
4. comparison uses explicit comparison FX purpose/rate/fixing/version;
5. award uses exact decision basis and technical approval state;
6. if P07 disabled, handoff only; if enabled, separate Commitment command binds contractual currency/valuation;
7. create thin milestone instances anchored to existing requirement/package/award/Commitment/component lineage;
8. preserve required/planned/forecast/confirmed/actual date families;
9. record external shipment observations as REFERENCE/MIRROR with freshness/evidence;
10. actual receipt derives from authoritative product/external actual event, never a manual tracker status.

**Failure paths:** stale shipment data, partial shipment, FX source unavailable, delivery promise changed, evidence missing.

**Final:** no independent TrackedItem/CPM root; explicit milestone/FX/evidence lineage.

---

# GT-04 — Supplier revision after addendum through guest/email/file paths

**Purpose:** prove external grant, schema/version and response disposition.

**Actors:** buyer, invited supplier contact/shared mailbox/team.

**Flow:**

1. buyer issues event version V1 with exact member set and ExternalTaskGrant;
2. supplier submits valid response V1 by secure link/email/file;
3. buyer issues material addendum V2;
4. prior response receives explicit remains-valid/stale/draft/resubmit disposition;
5. old template import is blocked or staged as a proposal with differences;
6. supplier acknowledges addendum and submits revision V2;
7. V1 remains immutable and V2 supersedes under exact lineage;
8. receipt states disposition/population entry and non-meaning.

**Failure paths:** forwarded link, unexpected sender, shared mailbox unknown human, late response, stale schema parses.

**Final:** one governed current response projection with full revision history; no supplier network required.

---

# GT-05 — Rejected recommendation/award and re-tender

**Purpose:** prove approval outcome, domain effect and sourcing restart separation.

**Flow:**

1. recommendation R1 prepared from valid comparison;
2. approver rejects/returns/requests information using typed outcome;
3. no AwardDecision or Commitment is established;
4. source tender and submissions remain historical;
5. buyer chooses a separate bounded action: revise recommendation, cancel event or create re-tender V2;
6. changed member/recipient/scope basis creates new event/publication identities;
7. old approvals do not carry forward;
8. V2 proceeds through full comparison/approval/award path.

**Failure paths:** UI moves task to approved, retry of rejected command, reuse old issue artifact, stale approval.

**Final:** exact rejection and re-tender history with no hidden state mutation.

---

# GT-06 — AwardDecision and manual external handoff with P07 disabled

**Purpose:** prove A0–A3 commercial usefulness without P07/ERP connector.

**Flow:**

1. AwardDecision establishes selected supplier/scope/commercial basis only;
2. product creates immutable handoff/export proposal;
3. authorized user issues exact artifact/structured file/manual communication;
4. external purchasing/accounting team creates its own PO/subcontract outside product;
5. product records communication/external observation/reference only;
6. absent verified external effect, product shows handoff/pending/unknown—not Commitment;
7. reporting marks P07 values NOT_APPLICABLE/UNSUPPORTED rather than zero.

**Final:** useful sourcing completion with honest boundary.

---

# GT-07 — P07 Commitment, progress claim and certification

**Purpose:** prove activated commercial core and external accounting seam.

**Actors:** procurement/commercial team, contractor/subcontractor, certifier, accounting reference.

**Flow:**

1. approved AwardDecision basis feeds a separate Commitment proposal/command;
2. Commitment binds ScopeBasis, ValuationBasis, CapabilityProfile, components/obligations, currency, calculation and authority versions;
3. supplier/subcontractor submits claim as source evidence/claim fact;
4. buyer assessment is separate;
5. authorized certification command emits exact CommercialEffectVector by subject/grain;
6. retention/advance/recovery/tax components follow governing rules;
7. external ERP posting/payment remain separate authoritative facts/observations;
8. reports show physical, certified, accounting-posted and paid actuals separately.

**Failure paths:** claim revision, overclaim, missing evidence, certification rejection, ERP mismatch, partial payment.

**Final:** one commercial truth lineage, no GL/AP/cash co-master.

---

# GT-08 — Variation chain with advance, retention, allowance and recovery

**Purpose:** prove effect algebra, valuation axes and one-time conservation.

**Flow:**

1. instruction establishes governed work authority, not ad hoc value;
2. instruction resolves to EconomicComponentKey lineage;
3. valuation proposal uses exact ValuationBasis and parameters;
4. approval establishes change through separate command;
5. effects record authorized value, provisional/allowance movement, advance/recovery, retention and tax-commercial component separately;
6. reclassification is zero-net under conservation group;
7. no excess minimum-qualification credit banking occurs;
8. reports recompute from exact contributions.

**Failure paths:** valuation before component mapping, shared label confusion, FX purpose mismatch, duplicate recovery.

**Final:** conserved, correctable change position without mini-ledgers.

---

# GT-09 — Supplier compliance expiry blocks transaction

**Purpose:** prove prerequisite/control observation versus domain state.

**Flow:**

1. supplier relationship has versioned compliance evidence and validity window;
2. tender/award/Commitment operation guard requires current applicable evidence;
3. expiry creates deterministic control observation and operation denial;
4. acknowledgment/assignment does not clear expiry;
5. new EvidenceVersion is captured/validated;
6. current guard passes only after accepted evidence/authority state;
7. prior attempted command remains rejected; user re-previews and confirms a new valid command.

**Final:** no manual “compliant” status writer and no GRC case platform.

---

# GT-10 — Communication-gated effectiveness under uncertainty

**Purpose:** prove established-once effect and communication-fact separation.

**Flow:**

1. owning domain issues pre-effective basis, exact artifact/member/recipient/channel/rule/calendar versions;
2. dispatch/provider/delivery/read/ack occurrences remain distinct;
3. frozen rule reaches first accepted satisfaction and creates canonical CommunicationSatisfactionSnapshot;
4. owning-domain operation validates lifecycle still permits establishment;
5. one immutable domain effect/event is established with stable identity/effective time;
6. later callback correction/retraction becomes contradictory evidence only;
7. any consequence change uses bounded owning-domain correction, never evidence recomputation.

**Failure paths:** unreachable addressee, competing snapshots, provider timeout, cancellation before future offset.

**Final:** exact snapshot/establishment disposition and no evidence writer.

---

# GT-11 — Mid-project migration with incomplete history

**Purpose:** prove migration truth and limitation.

**Flow:**

1. source data classified by migration class;
2. per-domain MigrationAcceptanceProfile evaluates identity, history, time, evidence, authority and configuration minimums;
3. records lacking native-history minimum are imported as reference/evidence-limited, not assigned fabricated current state/balance;
4. manifest records source IDs, transformations, limitations and rejected/quarantined items;
5. current open transaction migrates only through registered target operations/effects;
6. cutover prevents dual writer;
7. reports expose MIGRATION_LIMITED/EVIDENCE_LIMITED quality.

**Final:** honest usable migration with no invented history.

---

# GT-12 — Connector timeout after possible external effect

**Purpose:** prove effect-indeterminate and safe reconciliation.

**Flow:**

1. immutable PublicationIntent/LogicalCommandId created;
2. connector sends effect-bearing request;
3. timeout occurs after boundary may have been crossed;
4. stage becomes EFFECT_INDETERMINATE with positive evidence gap;
5. UI/agent offers lookup/reconcile/manual/block only—no generic retry/cancel/rebind;
6. authentic observations are correlated or quarantined by validation class;
7. confirmed effect advances to exact stage; positive no-effect proof may permit retry; permanently unresolved position closes operationally as accepted unresolved variance without asserting no effect.

**Final:** no duplicate effect and honest unresolved history.

---

# GT-13 — Closed-period certified financial error correction

**Purpose:** prove immutable history, effective/recorded time and reporting restatement.

**Flow:**

1. prior certificate/effect is immutable and period closed;
2. error evidence is captured and assessed;
3. policy selects permitted correction mode: reverse-and-replace, forward adjustment, reclassification or non-economic amendment;
4. new CommercialEffectVector entries preserve original semantics and recorded/effective periods;
5. external accounting correction remains separate;
6. projections/reports recalculate or restate under exact change class;
7. issued report snapshot remains unchanged and a superseding snapshot/notice is created.

**Final:** corrected current position with complete history and no in-place rewrite.

---

# GT-14 — Retention, bond/security release

**Purpose:** prove security call/release distinction and evidence-gated commercial effect.

**Flow:**

1. security/retention obligation/effect exists under Commitment;
2. release prerequisites bind exact evidence, dates, certification and authority;
3. release proposal/approval remains separate from command;
4. authorized command emits exact release effect;
5. external bank/ERP occurrence remains observation/reference unless product owns the specific fact;
6. expired/released/called states remain distinct;
7. reports show current security and commercial positions without double count.

---

# GT-15 — Issued report restatement and subsequent reliance

**Purpose:** prove immutable issue and current-use reassessment.

**Flow:**

1. ReportSnapshot S1 issued for declared use with source cut/quality/use assessment;
2. source correction or definition defect triggers recalculation;
3. RestatementRecord produces S2 and supersession/notice;
4. S1 remains immutable and historically issue-valid;
5. new AwardDecision user opens S1;
6. current SubsequentRelianceAssessment checks access, restatement, evidence, conformance, definition support and intended use;
7. reliance is blocked/limited/permitted independently of old issue.

---

# GT-16 — Partial/restricted portfolio metric must not appear as total

**Purpose:** prove population/quality/disclosure across surfaces.

**Flow:**

1. twenty eligible projects; one unavailable/restricted;
2. metric's PartialPopulationTreatment applies;
3. if full aggregate is safely computed under disclosure policy, show full with restricted drill-through; otherwise return PRESENT_EVALUABLE_SUBSET, deterministic range or block;
4. unknown population extent cannot produce subset point value;
5. approval/external/audit uses block subset result;
6. target-scope quality/comparability/use recomputed;
7. card, report, export and chat preserve “not total,” coverage and limitations.

---

# GT-17 — Buyer-on-behalf supplier capture

**Purpose:** prove source/capture attribution and validity.

**Flow:**

1. supplier sends offline/email/physical response;
2. internal user captures exact source occurrence/evidence;
3. capture records supplier/contact assertion, internal actor, reason, source/received/capture times, transcription differences and assurance limitation;
4. registered fields are staged as proposal; arbitrary content remains evidence;
5. ExternalSubmissionAcceptancePolicy determines evidence-only/provisional/valid/late/quarantine disposition;
6. supplier confirmation is obtained where required;
7. only valid/explicit late-accepted response enters governed population;
8. receipt/non-meaning and history remain clear.

---

# GT-18 — Untrusted file import with unknown fields

**Purpose:** prove field/schema registry and safe import.

**Flow:**

1. file durably captured as untrusted;
2. type/archive/scan/parser limits apply;
3. scan timeout is not clean;
4. exact template/schema/version/row identity checked;
5. registered fields parse into proposals;
6. unknown columns/free text remain evidence/unmapped proposal and cannot create semantics;
7. user reviews differences/errors;
8. explicit submit command creates valid source submission/imported facts;
9. no silent truncation/overwrite.

---

# GT-19 — Outage, restore and continuation

**Purpose:** prove semantic durability and safe recovery.

**Flow:**

1. effect-bearing command has retrievable continuation anchor;
2. authoritative acknowledgment occurs only after DurabilityAcknowledgementProof;
3. outage occurs;
4. restore uses tested backup/journal/object evidence;
5. tenant/access boundaries, idempotency, effect position, evidence payload/hash, holds, redactions and tombstones restore coherently;
6. result lookup returns established/partial/indeterminate exact stage;
7. no duplicate retry or lost acknowledged effect;
8. search/report/AI rebuild/degrade according to data-class RTO/RPO;
9. incident/measurement health reflects unavailable telemetry.

---

# GT-20 — Optional AI with incomplete context, abstention and AI-off fallback

**Purpose:** prove product-owned AI, context coverage and bounded authority.

**Flow:**

1. product AICapabilityDefinitionVersion is enabled under monotone tenant profile;
2. provider profile has independent current SUFFICIENT_PASS;
3. AI extracts/maps or drafts from exact allowed sources;
4. one mandatory source is unavailable or token/resource floor would omit it;
5. context assessment becomes unknown gap/access restricted/subset—not complete;
6. load-bearing all/total/current answer abstains/blocks or explicitly narrows scope;
7. AI proposal retains citations, source cut, limitations and expiry;
8. human reviews and accepts through registered command where permitted;
9. L5 transmits only exact confirmed digest; changed recipient/source invalidates;
10. provider outage or AI disable routes to deterministic/manual workflow.

**Final:** no AI truth/authority/dependency.

---

# Atlas-level assertions

- GT-01 through GT-06 prove A0–A3 without P07/connectors/account/chat/AI/warehouse.
- GT-07/08/13/14 prove the sole XL P07 on one commercial effect substrate.
- GT-10/12/19 prove uncertainty, durability and recovery.
- GT-11/18 prove migration/import truth.
- GT-15/16 prove report population/history/use.
- GT-04/17 prove low-friction external participation.
- GT-20 proves additive/replaceable AI.

The execution-results matrix must record an architecture question for any step lacking an exact controlling answer.