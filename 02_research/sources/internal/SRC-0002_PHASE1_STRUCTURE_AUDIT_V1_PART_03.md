### **P1.8 — Reporting & Query Model** *(split out of old P1.8)*

- **Objective:** use reporting as a **model-validation instrument**. This is why it comes before UI.
- **Inputs:** P1.5, §40's baseline report list.
- **Outputs:** every baseline report expressed as a query over P1.5 entities; rollup/portfolio semantics; the BI/export contract.
- **Dependencies:** P1.5.
- **Gate:** every report in the V1 scope is expressible with no missing field and no ambiguous aggregation. **Any report requiring a field that does not exist triggers a P1.5 amendment** — that is the point of running this before UI, and it is why splitting it from UI matters.

---

### **P1.9 — UI / Navigation / Interaction Architecture** *(rest of old P1.8)*

- **Objective:** assign every action to exactly one owning surface. Wireframe-level structure, not visual design.
- **Dependencies:** P1.5, P1.8.
- **Gate:** every state transition defined in P1.5 has exactly one owning screen and one owning control. Zero orphan actions (a transition with no UI) and zero phantom controls (a control with no transition). Navigation covers 100% of `SPINE` objects.

---

### **P1.10 — Nonfunctional & AI-Readiness Residual** *(merges old P1.9 + P1.10)*

- **Objective:** the nonfunctional envelope, plus the AI hooks that are genuinely additive.
- **Note on splitting §52:** two of its requirements are **binding architectural constraints, not hooks**, and must be declared at P1.5 entry —
  (i) every commercially significant value traces to a source document + location + revision;
  (ii) every business action exists as a bounded service operation, never an arbitrary write.
  Neither can be retro-fitted onto a frozen entity model. The remainder — proposal object, agent authority ladder, evaluation-dataset capture — is correctly late and correctly additive.
- **Outputs:** performance targets tied to real volumes (a 12-bidder × 400-line comparison grid), observability, DR/backup, rate limiting, data lifecycle/export; plus the residual AI structures.
- **Dependencies:** P1.5–P1.9. Tenancy already settled in P1.4.
- **Gate:** every nonfunctional requirement has a **number** and a measurement method. No AI structure constrains a deterministic entity beyond the two declared constraints.

---

### **P1.11 — Golden-Thread Validation, Red Team & Master Specification** *(merges old P1.11 + P1.12)*

- **Objective:** prove the specification is executable without invention, then assemble it.
- **Outputs:** golden-thread walkthrough results; adversarial findings and resolutions; the assembled Master Specification.
- **Dependencies:** all.
- **Gate:** see section G.
- **Note:** red-teaming is *also* a gate activity at P1.4, P1.5 and P1.7 — not only here.

---

# D. What to remove, merge, split or move

| v0.1 | Disposition | New home | Rationale |
|---|---|---|---|
| P1.0 Architecture Control System | **Keep, expand ~5×** | P1.0 | Right nouns, no schemas. Add requirement IDs, traceability, confidence states, contradiction register, decision states. Add retro-fitting §2–§3. |
| — | **ADD** | **P1.1 Thesis/Beachhead/Release Boundary** | Absent. This is the only mechanism that makes Phase 1 terminate. |
| P1.1 Market/Competitor Reconstruction | **Move later** | P1.3 | Must follow primary evidence or it becomes the ontology. |
| P1.2 Real Contractor Workflow | **Move earlier, harden** | P1.2 | Now precedes competitors. Requires primary-source acquisition plan, not template scraping. |
| — | **ADD** | **P1.4 Boundary/Ownership/Tenancy** | Ownership currently decided at P1.7, after the models that depend on it. Tenancy currently at P1.9. Both irreversible. |
| P1.3 Domain Model | **Merge** | P1.5a | Not separable from financial model. |
| P1.4 State Machines | **Merge** | P1.5c | Transitions carry financial effects; cannot precede the ledger. |
| P1.5 Financial/Commercial | **Merge + expand** | P1.5b | Absorb into core, and add the missing ledger/posting/period/FX/tax-timing layer. |
| P1.6 Approval/Permission/Audit | **Merge** | P1.5d | Approval state is object lifecycle state. |
| — | **ADD** | **P1.6 Evidence/Document/Communication** | Currently scattered across §34/§35/§38 with no owning subphase, despite being the substrate for both dispute defence and later AI. |
| P1.7 Integration/Migration/API | **Split 3 ways** | P1.4 (ownership) + P1.7 (integration & migration) + P1.7 (API, derived) | Three different dependency positions bundled into one line. Ownership must be early; API is mechanical and late. |
| P1.8 UI/Navigation/Reporting | **Split** | P1.8 (reporting) + P1.9 (UI) | Reporting is a data-model concern and validates P1.5. UI is downstream. Bundling them wastes reporting's diagnostic value. |
| P1.9 Nonfunctional | **Split** | P1.4 (tenancy, residency) + P1.10 (rest) | Tenancy is irreversible and cannot sit second-to-last. |
| P1.10 AI-Readiness | **Split** | P1.5 entry constraints (2 items) + P1.10 (rest) | Provenance and bounded-action design cannot be retro-fitted. |
| P1.11 Critique/Red-Team | **Convert to gate activity** | Gates at P1.4/P1.5/P1.7 + final pass in P1.11 | Terminal red-teaming surfaces findings at maximum cost. |
| P1.12 Final Master Spec | **Merge** | P1.11 | Assembly is not a phase; validation is. |
| §61 Product Graph | **Demote to hypothesis** | Assumption Register | Pre-commits the entire structure before evidence exists. See F1. |

---

# E. Missing workstreams

Absent from v0.1 entirely, ordered by consequence.

1. **Cost ledger / posting model.** [V: "ledger" = 1 occurrence, referring to the external GL] The substrate under every number in §8. See B1.
2. **Release boundary / scope allocation.** No mechanism decides V1 vs later. See B3.
3. **Primary evidence acquisition.** No design partners, no real artifacts, no observation. See B5.
4. **Source-of-truth ownership contract** as an early, explicit decision rather than a deferred one. See B2.
5. **Financial period, cut-off and backdating model.** [V: "financial periods" appears once, line 456, as a master-data bullet, never elaborated.]
6. **Multi-currency / FX policy.** [V: "currency" and "currencies" appear as master data (§5 line 453, §6.1 line 483, §48 line 1906) with no rate source, rate-date, revaluation or reporting-currency policy.] Directly relevant to a GCC contractor procuring imported plant and long-lead equipment in USD or EUR against an AED budget — that is not an edge case, it is the normal case for the exact packages §26's long-lead engine exists to manage.
7. **Tax timing rules.** [V: "tax code", "VAT", "tax regime" appear only as master-data entries.] VAT treatment of advance payments, retention held, retention released and progress certificates has non-obvious timing and is jurisdiction-specific. It affects the ledger, not just a field.
8. **Concurrency and locking on shared commercial records.** Multiple evaluators on one comparison grid (§17), simultaneous approvals (§21). Never addressed.
9. **Identity model for external parties.** See B7.
10. **Reporting-as-model-validation** as a deliberate step. See P1.8.
11. **Nonfunctional acceptance numbers.** §50 lists categories; no targets. "Large comparison grids must remain fast" (line 1966) is not a requirement.
12. **Two missing evidence classes** (see section 8 discussion below): the Excel/email incumbent, and supplier-side experience.

---

# F. Premature assumptions to return to hypothesis status

Only assumptions where being wrong changes architecture, not merely features.

### F1. Package as the structural root of commerce [V: §3.1 line 340, §9 line 639, §61 lines 2352–2407]
**Status in v0.1:** listed under *"Reasonably established from first-pass evidence"* (line 2414), and structurally hardcoded in §61.

**Why material:** §61 makes `PROCUREMENT PACKAGE` the parent of tenders, bids, evaluations, recommendations, approvals **and commitments**. If a meaningful share of real contractor procurement is requisition- or item-driven — repeat suppliers, call-off orders, materials-heavy trades, small-value fast purchases — then that path becomes a second-class citizen threaded awkwardly through a package it does not need.

**The document already knows this.** §10 (line 716) asks: *"How do project package procurement and ordinary material requisitions coexist without duplicate systems?"* — but §61 has already answered it structurally, before the question is researched.

**Note specific to your position:** electrical and solar contracting is materials- and equipment-heavy. If your primary evidence comes disproportionately from your own trade context, you may over-weight the item path; if it comes from ProcurePro's positioning, you will over-weight the package path. Both errors are architecturally expensive. Get evidence from both shapes before committing.

**Return to hypothesis. Test in P1.2. Decide in P1.5a.**

### F2. PO and Subcontract as two distinct entity types [V: §22, §23, §61 line 2377, listed as established at line 2417]
**Why material:** the alternative is one `Commitment` entity with a type discriminator and a **valuation-method capability** (`goods-receipt` vs `progress-measurement`). Two hard types duplicate approval logic, change logic, payment logic, compliance logic and reporting logic across both, permanently, and every future feature must be built twice. The document's own §28 (line 1311) identifies the real distinction precisely: *"For subcontracts: progress measurement is different from goods receipt."* That is a **valuation-method difference**, which is an argument for one entity with two valuation strategies, not for two entities.

**Return to hypothesis. Decide in P1.5a with the cost written down both ways.**

### F3. The product owns "payment/invoice commercial controls" while the GL is external [V: §4.1 line 392 vs §4.2 lines 400–402]
**Why material:** this seam is asserted but undefined, and it is the highest-risk boundary in the system. "Commercial controls over payment" without owning AP requires specifying exactly which side certifies, which side holds and releases retention, which side is authoritative for a commitment balance, and what happens when they disagree. Undefined seams become duplicate entry, which §3.6 (line 355) itself identifies as existential.

**Return to hypothesis. Decide in P1.4.**
