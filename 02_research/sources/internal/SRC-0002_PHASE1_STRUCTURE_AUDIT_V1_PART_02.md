---

# C. Revised Phase 1 structure

Twelve subphases (vs your thirteen). Not inflated — three added, six merged.

---

### **P1.0 — Research Control System**

- **Objective:** make evidence, decisions and open questions traceable and revisable before research volume makes them permanent by accident.
- **Inputs:** none (bootstrap). Backlog: every claim currently in §2 and every conclusion in §3.
- **Outputs:** eight registers, each with a defined column schema, not prose —
  1. **Source Register** — source, type, date accessed, grade (A: vendor API/help docs & official training; B: vendor marketing & demos; C: review sites & forums; D: inference)
  2. **Evidence Register** — claim → source ID → grade → confidence → status
  3. **Terminology Dictionary** — one canonical term per concept, with the competitor synonyms it maps to
  4. **Assumption Register** — assumption → why it is load-bearing → what would falsify it → status
  5. **Open Question Register** — question → owner → what it blocks → resolution
  6. **Contradiction Register** — source A says X, source B says Y, resolution
  7. **ADR Log** — states: proposed / accepted / rejected / superseded / deferred, with the alternatives considered
  8. **Requirement Register** — REQ-IDs, each traced to evidence and forward to spec section
  Plus: a change-control rule for amending a frozen artifact.
- **Dependencies:** none.
- **Gate:** every §2 claim and every §3 conclusion has been retro-filed with a source and grade, or explicitly demoted to hypothesis. You can answer *"why do we believe X?"* for any X in ≤2 lookups. Registers exist as structured tables you can query, not paragraphs.

---

### **P1.1 — Thesis, Beachhead & Release Boundary** *(NEW)*

- **Objective:** decide who V1 is for and what V1 is, so specification depth can be *allocated* rather than applied uniformly. This is the mechanism that makes Phase 1 terminate.
- **Inputs:** §55 differentiation hypotheses, §4 boundary, §56 commercial risks, market knowledge.
- **Outputs:**
  1. Named beachhead segment: contractor size band, trade mix, geography, **and current tool stack** (what they run today determines your integration surface).
  2. **Scope classification of all ~56 content areas** into exactly one of: `SPINE` (fully specified), `THIN` (minimum viable object, specified shallowly), `INTERFACE-ONLY` (contract defined, implementation deferred), `OUT` (explicitly excluded from V1).
  3. Three falsifiable wedge hypotheses with kill criteria.
  4. An **implementation-burden budget** as a binding numeric constraint (e.g. "a new tenant reaches first live tender in ≤10 working days"). This constraint is what caps configuration depth later.
- **Dependencies:** P1.0.
- **Gate:** every content area classified. The `SPINE` list is small enough to be specified in the time you actually have. At least one feature in the current v0.1 has been cut as a direct consequence of the burden budget — if nothing was cut, the constraint is not real.

---

### **P1.2 — Primary Workflow Evidence** *(was P1.2; moved before competitors)*

- **Objective:** establish what contractors actually do, independent of what vendors built.
- **Inputs:** P1.1 beachhead definition.
- **Outputs:** 3–5 independent contractor process reconstructions (estimate handover → closeout) with **real artifacts obtained**, not described: actual bid-comparison spreadsheets, approval matrices/DOA tables, RFQ packs, subcontract templates, payment certificates, variation registers, procurement trackers. Plus a variant map showing where processes diverge and why, and a workaround register (what people do outside their software, and the reason).
- **Dependencies:** P1.0, P1.1.
- **Gate:** ≥3 independent contractors, ≥1 inside the beachhead geography, ≥1 outside your own trade. ≥1 complete real bid-leveling artifact obtained and decomposed. Every workflow step has a named artifact and a named role. Contradictions with vendor marketing are logged in the Contradiction Register.

---

### **P1.3 — Competitor Reconstruction** *(was P1.1)*

- **Objective:** extract **object models**, not feature lists. Read incumbents *against* observed reality rather than as reality.
- **Inputs:** P1.0 dictionary, P1.2 workflow map.
- **Outputs:** one structured matrix — rows = competitors, columns = the §60 dimension set, **controlled vocabularies per cell**, and a source ID + grade attached to every cell. Plus per-competitor object-model reconstruction (entity names, state names, permission names, field names as leaked by help documentation and training material — these are the highest-yield sources and should be graded above marketing). Pain signals kept in a **separate** register from architecture observations.
- **Dependencies:** P1.2.
- **Gate:** matrix complete with zero silently blank cells — "not determinable from public evidence" is an explicit recorded value. ≥2 competitors reconstructed to state-machine level. Every §3 cross-market conclusion re-derived from graded evidence or withdrawn.

---

### **P1.4 — Boundary, Ownership & Tenancy Contract** *(NEW — absorbs the early half of old P1.7 and P1.9)*

- **Objective:** fix what the system owns, mirrors and ignores — plus the irreversible deployment shape — **before** modeling anything.
- **Inputs:** P1.1–P1.3.
- **Outputs:**
  1. **Per-entity ownership table:** every candidate entity marked `OWN` / `MIRROR` / `REFERENCE` / `OUT`, with sync direction and the authoritative side named.
  2. **The accounting seam, drawn:** a diagram with named fields crossing it. Who certifies a payment. Who holds retention. Which side is authoritative for a commitment balance. What posts to the GL, when, and in what form. This resolves §4.2's deferred decision.
  3. **Tenancy & residency model** with an ADR: isolation level, legal-entity/business-unit/JV hierarchy, region strategy.
  4. **Identity model** including external-party access: account-based vs tokenized link, and the permission consequences of each.
- **Dependencies:** P1.3.
- **Gate:** every entity in the draft catalogue has exactly one authoritative owner. No entity is "shared." The GL seam diagram exists and a competent accountant can read it and say what appears in their trial balance.

---

### **P1.5 — Commercial Core** *(merges old P1.3 + P1.4 + P1.5 + P1.6, and adds the ledger)*

- **Objective:** produce **one internally consistent model** of entities, money, lifecycle and authority. Four interlocking tracks, iterated — explicitly *not* four sequential freezes.
- **Tracks (concurrent):**
  - **5a — Entities & master data:** entity dictionary, attributes, cardinalities, master vs transaction classification, numbering/sequence rules, immutability boundaries.
  - **5b — Cost ledger & posting semantics** *(NEW — the missing layer):* the financial event types that move money; the exact derivation of every balance in §8 (committed, pending commitment, actual, paid, retained, forecast final, available) as a formula over those events; period model and cut-off/backdating rules; reversal and adjustment semantics; **multi-currency: reporting currency, rate source, rate date policy, revaluation policy** (non-optional if you procure imported long-lead equipment against a local-currency budget); tax timing rules for advance payments, retention and progress claims.
  - **5c — Lifecycles & state machines:** every object's states, transitions, guards, side-effects and emitted events.
  - **5d — Authority:** permission model (tenant/project/object per §39), approval policy model (§21), audit event catalogue, and concurrency semantics for shared commercial records (two QSs on one comparison grid).
- **Inputs:** P1.4.
- **Dependencies:** P1.4. **Entry constraint:** the two binding AI-readiness constraints (see P1.10) are declared *before* 5a starts, not after.
- **Gate:** every derived financial figure has exactly one derivation formula traceable to ledger events. No entity has an undefined lifecycle. Every state transition names its required permission, its guard condition, its financial effect and its emitted event. Golden threads 1–4 (see G) execute on paper with zero invention.

---

### **P1.6 — Evidence, Document & Communication Model**

- **Objective:** define the provenance substrate. Construction disputes are evidence disputes (§7, line 358) — and this is the layer AI later depends on entirely.
- **Inputs:** P1.5.
- **Outputs:** document / version / revision / supersession model; hash and immutability rules for issued documents; transmittal model; message-thread model with the **capture rule** for externally-conducted communication (§35's principle turned into a mechanism); retention and confidentiality policy.
- **Dependencies:** P1.5 (but its two binding constraints are declared at P1.5 entry).
- **Gate:** every commercial value that can be disputed traces to a document version and a location within it. Every externally-communicated commitment has a defined capture path into the evidence trail.

---

### **P1.7 — Integration, Migration & API Contracts** *(was P1.7, now with the ownership decision already made)*

- **Objective:** specify the seams. Three deliverables at three different depths.
- **Outputs:**
  - **Integration:** the seam contracts implied by P1.4, specified — connector model, entity/field mapping, sync direction, conflict resolution, reconciliation, failure modes, health.
  - **Migration:** import model, legacy ID preservation, deduplication, validation, preview, rollback, reconciliation, migration audit. **Schema-level, not a tool** — legacy ID preservation is an entity attribute decision.
  - **API:** mechanically derived from P1.5. Three surfaces (internal / integration / agent) per §44.
- **Dependencies:** P1.4 (ownership), P1.5 (model).
- **Gate:** **one** reference connector specified end-to-end including failure and conflict behavior. The migration spec can ingest a real legacy dataset obtained during P1.2. Every P1.5 entity has a CRUD + action contract.

---
