# P1.1-A — Beachhead Candidates v0.1

**Status:** PROVISIONAL / DECISION FRAME  
**Purpose:** Create explicit alternatives before selecting the V1 beachhead. None is accepted yet.

## Decision criteria

Each candidate will be scored against:

1. **Pain intensity** — procurement/commercial failure is frequent and economically meaningful.
2. **Workflow repeatability** — enough common structure exists to productize without forcing one contractor's process on everyone.
3. **Deterministic value** — the product is valuable before advanced AI.
4. **Primary-evidence access** — real workflows/artifacts can be obtained in P1.2.
5. **Implementation tractability** — V1 can form a closed sub-graph without requiring full ERP replacement.
6. **Integration burden** — accounting/ERP/CDE dependencies are survivable for V1.
7. **Willingness/ability to pay** — buyer has enough commercial exposure for procurement control to matter.
8. **Expansion ceiling** — success can expand naturally into the intended contractor procurement/commercial platform.
9. **External-party feasibility** — supplier/subcontractor participation can work without excessive behavior change.
10. **Competitive whitespace** — the wedge is not merely a weaker clone of an incumbent module.

## Candidate A — UAE private-sector mid-market main contractors

### Working profile
- Geography: UAE first; GCC expansion path.
- Organization: established general/main contractors with a real procurement function but without fully integrated enterprise procurement/commercial tooling.
- Project profile: villas/residential, hospitality, commercial, mixed private works and similar building projects with repeated subcontract/material packages.
- Operating pattern to test: accounting/ERP plus spreadsheets, email and messaging coexist; procurement status/comparison/approval/commercial evidence is fragmented across tools and people.

### Why it may be the strongest beachhead
- Complex enough to need a serious system, but potentially small enough to avoid enterprise-suite implementation burden.
- Repeated RFQ → bid leveling → approval → PO/subcontract → delivery/claim/change patterns create a deterministic operating spine.
- Natural expansion into commercial controls, vendor intelligence, evidence and later AI.
- Strong fit with a UAE/GCC-first evidence program.

### Main risks
- Budget sensitivity and implementation resistance.
- Wide variance in process maturity.
- Existing ERP/accounting stack may be highly inconsistent.
- Supplier participation can remain email/WhatsApp-heavy.

### Kill evidence
Reject or materially revise this candidate if primary evidence shows either:
- procurement pain is mostly organizational discipline rather than a system problem;
- workflow variance is too high to create a shared deterministic spine;
- target contractors will not adopt a separate operating layer unless it replaces accounting/ERP functions far beyond intended V1 scope.

---

## Candidate B — GCC upper-mid / enterprise main contractors with existing ERP/CDE

### Working profile
- Geography: UAE/Saudi/GCC.
- Organization: larger contractors with formal ERP/accounting, CDE/project controls, DOA matrices and dedicated procurement/commercial teams.
- Project profile: larger multi-project portfolios and more formal subcontract/payment/change governance.

### Why it may be attractive
- Very high commercial value per customer.
- Strong need for audit, permissions, integration, portfolio visibility and structured commercial controls.
- Architecture ceiling aligns naturally with this environment.

### Main risks
- Integration/security/migration burden can dominate V1.
- Incumbent suite overlap is much stronger.
- Sales and implementation cycles may require enterprise resources before product-market proof.
- Closed-subgraph V1 may become difficult if customers demand deep ERP/CDE integration immediately.

### Kill evidence
Demote as initial beachhead if the minimum credible implementation requires deep multi-system integration, migration, SSO/security/compliance and enterprise customization before core procurement value is visible.

---

## Candidate C — UAE/GCC specialist subcontractors with procurement-heavy delivery

### Working profile
- MEP, interiors/joinery, fit-out or other subcontractors with substantial vendor/material procurement and commercial administration.

### Why it may be attractive
- Procurement workflows may be narrower and easier to productize.
- Faster deployment and fewer enterprise dependencies may create a cleaner first build.
- Material/vendor control can produce direct operational value.

### Main risks
- Diverges from the intended head-contractor procurement/commercial platform thesis.
- Lower contract values and smaller teams can weaken willingness to pay.
- The resulting ontology could optimize for buying/material operations rather than package/subcontract/commercial coordination.
- Expansion from specialist-subcontractor workflow to main-contractor commercial governance may require more redesign than it initially appears.

### Kill evidence
Demote if the simplification comes mainly from removing the very cross-party/commercial complexity that creates the intended long-term product advantage.

---

## Current provisional ranking

1. **Candidate A — leading hypothesis**
2. Candidate B — high-value expansion candidate / possible beachhead if integration burden proves manageable
3. Candidate C — useful falsification/control candidate, but strategically suspect as the primary product thesis

This ranking is not a decision. It exists to drive focused evidence acquisition and comparison.

## Evidence required before selection

Before P1.1 freezes, obtain enough evidence to test:
- actual current tool stack and handoffs for representative candidate-A contractors;
- top procurement/commercial failure modes and their economic consequences;
- minimum buyer/user set;
- required accounting/ERP/CDE seam for initial adoption;
- supplier participation constraints;
- whether the deterministic procurement spine delivers value without broad accounting replacement;
- implementation effort and data-migration expectations;
- whether candidate B requires materially different architecture or primarily deeper integrations/configuration;
- whether candidate C reveals a genuinely superior wedge or only an easier but strategically weaker product.

## Next P1.1 step

Convert the leading candidates into three falsifiable wedge hypotheses and build the first SPINE / THIN / INTERFACE-ONLY / OUT candidate-area matrix.
