# P1.3 — Design Inheritance Conflict Audit v0.1

**Status:** INTERNAL HOSTILE AUDIT COMPLETE
**Question:** Does taking the best pattern from each incumbent accidentally create a product more complex, contradictory, or enterprise-heavy than the competitors being studied?

## Verdict

`PASS WITH FORWARD OBLIGATIONS — no unresolved P1.3 contradiction requires more competitor research.`

The synthesis is coherent only if **inheritance means semantic reuse, not cumulative feature scope**. The retained patterns must be activated by product surface and phase rather than all implemented as V1 prerequisites.

---

## IC-01 — Package-centric sourcing vs ordinary material/direct purchase

**Pressure:** ProcurePro/Procore/BuildingConnected are package-centric, while Kojo/Vista/CMiC expose ordinary requisition/direct-purchase paths.

**Resolution:** retain two entry experiences:
- fast material/MR/direct-source path;
- package/complex-scope tender path.

Both reconcile to P1.2 requirement/allocation authority downstream. `ProcurementPackage` remains optional.

**Result:** CLOSED.

---

## IC-02 — Low-friction supplier access vs mature supplier governance

**Pressure:** ProcurePro/Procore/Coupa/Aconex support low-friction external participation, while Ariba/TradeTapp/CMiC demonstrate deeper supplier registration/qualification/risk controls.

**Resolution:** separate:
- Vendor master;
- QualificationRecord / EligibilityEvaluation;
- TenderParticipant;
- ExternalAccessGrant;
- Invitation / intent / submission.

A supplier can participate through a bounded secure link/email flow without forcing a persistent portal account, while qualification can still be applied where the package requires it.

**Forward obligation:** P1.4 must define identity/tenancy/counterparty ownership and buyer-on-behalf provenance without conflating external access with vendor identity.

**Result:** CLOSED FOR P1.3.

---

## IC-03 — Structured bid forms vs messy supplier truth

**Pressure:** ProcurePro/Procore/BuildingConnected favor structured price/bid forms; P1.2 Perflex evidence and Qotera show PDF/Excel/email/WhatsApp/incomplete scope reality.

**Resolution:** structured response schema is a preferred acquisition channel, not the only legal quote representation.

Valid source capture includes:
- structured form;
- PDF;
- Excel;
- email attachment;
- governed buyer-on-behalf/manual capture.

Normalization happens after receipt and never destroys source truth.

**Result:** CLOSED.

---

## IC-04 — Fast/easy leveling vs immutable supplier economic truth

**Pressure:** Procore-style editable leveling is operationally fast, but direct mutation of bid values risks collapsing supplier truth and buyer adjustment.

**Resolution:** preserve four layers:
1. immutable supplier submission/revision;
2. normalized representation;
3. buyer EvaluationAdjustment;
4. supplier-confirmed contractable basis.

The UI may feel like one comparison workspace while the truth layers remain separate.

**Result:** CLOSED.

---

## IC-05 — Fast award-to-contract conversion vs legal/commercial formation rigor

**Pressure:** Procore/CMiC optimize selection -> PO/subcontract; P1.2 requires AwardDecision != Effective Commitment.

**Resolution:** a fast action may **prepare** the commitment from the award, but effectiveness requires the applicable formation evidence/authority.

Speed is UX; legal/commercial effect is domain truth.

**Forward obligation:** ADR-0004/P1.5 must decide physical PO/subcontract/framework composition.

**Result:** CLOSED FOR P1.3.

---

## IC-06 — ERP financial rigor vs small-footprint procurement layer

**Pressure:** CMiC/Vista provide reliable posting/receipt/accounting semantics because they own the ERP; our product explicitly does not want full GL/AP/cash ownership.

**Resolution:** borrow finalization, posting awareness, receipt transactions and correction semantics, but implement accounting coexistence through field/event authority:
- OWN;
- MIRROR;
- REFERENCE.

No editable parallel accounting ledger.

**Forward obligation:** P1.4/P1.5 must resolve authority boundaries and the P07/P08 physical seam.

**Result:** CLOSED FOR P1.3.

---

## IC-07 — Enterprise workflow flexibility vs bounded product controls

**Pressure:** Unifier proves arbitrary workflow/form configuration is powerful. Replicating it would create a second XL subsystem.

**Resolution:** fixed product-level gate classes + bounded effective-dated configuration. Hard domain invariants cannot be softened by deployment configuration.

No arbitrary customer state-machine/BPM designer in V1.

**Result:** CLOSED.

---

## IC-08 — Aconex-grade evidence vs accidental CDE product

**Pressure:** immutable cross-party audit and document ownership are valuable; full CDE ownership would explode scope.

**Resolution:** borrow evidence identity/version/provenance and external document references. Own only procurement/commercial evidence required for domain truth; allow Aconex/other CDE to remain authoritative for broader project documents.

**Result:** CLOSED.

---

## IC-09 — Live procurement schedule vs duplicate manual status ledger

**Pressure:** ProcurePro's live schedule is valuable; a manually updated procurement tracker would duplicate canonical workflow status.

**Resolution:** actual procurement milestones derive from canonical domain events. Required/baseline/forecast/supplier-confirmed dates remain explicit planning facts. P10 does not become CPM/master scheduling.

**Result:** CLOSED.

---

## IC-10 — Supplier network value vs network lock-in

**Pressure:** BuildingConnected/Ariba/Coupa gain value from supplier networks, but network onboarding creates adoption friction and cross-tenant identity complexity.

**Resolution:** tenant/project vendor graph and task-focused access are sufficient for V1. Shared discovery/network capabilities remain optional later features.

**Result:** CLOSED.

---

## IC-11 — Material simplicity vs commercial-core depth

**Pressure:** Kojo demonstrates very fast material-request value; P07 commercial truth is the single XL architecture gravity well.

**Resolution:** the existence of the deep substrate does not mean the first material or tender surface requires the full P07 feature set. The first paid sourcing rail may stop at AwardDecision/handoff while downstream commitment/fulfillment is external.

**Result:** CLOSED, subject to adoption-burden audit.

---

## IC-12 — Specialized subcontract payment controls vs payment-platform creep

**Pressure:** Textura validates claim/payment/compliance specialization, but importing the whole rail would create banking/payment/legal scope.

**Resolution:** retain semantic separation:
`claim != assessment/certification != invoice/AP != payment`

Payment may remain externally authoritative with evidence/reference/reconciliation in P08.

**Result:** CLOSED.

---

## IC-13 — AI-enabled competitor workflows vs deterministic truth

**Pressure:** incumbent AI extraction/leveling can tempt the product to make model outputs authoritative.

**Resolution:** AI may extract, map, suggest, classify, flag gaps or draft comparisons. Domain truth changes only through bounded structured operations, confidence/provenance, deterministic validation and required approval.

**Result:** CLOSED.

---

# The real cumulative-scope risk

No individual borrowed pattern is fatal. The danger is **activating every retained pattern before first value**.

Therefore the design inheritance register is interpreted as four layers:

1. **WEDGE-REQUIRED** — must exist for the first sourcing/comparison/award workflow.
2. **ARCHITECTURE-READY / DEFERRED** — seams and invariants must exist, but the full operational surface does not ship initially.
3. **INTERFACE-ONLY** — external authority/reference rather than owned subsystem.
4. **REJECTED / OUT** — deliberately not part of the product boundary.

P1.4/P1.5 may not convert `ARCHITECTURE-READY`, `INTERFACE-ONLY`, or `REJECTED` patterns into first-live-tender prerequisites without controlled justification.

# P1.4 inputs produced by this audit

P1.4 must explicitly resolve or preserve:
- organization/legal-entity/project ownership;
- vendor identity vs external access identity;
- buyer-on-behalf provenance;
- evidence ownership across organizations;
- field/event authority at integration seams;
- physical form of shared semantic roles only where P1.4 owns that decision.

# Final verdict

`PASS — the best-of-each synthesis is internally coherent and does not require a second XL subsystem, provided inherited semantics are layered by activation burden rather than cumulatively implemented.`
