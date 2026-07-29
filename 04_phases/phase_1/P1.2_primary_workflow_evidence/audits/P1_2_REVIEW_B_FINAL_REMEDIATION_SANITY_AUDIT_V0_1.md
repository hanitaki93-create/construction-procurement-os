# P1.2 — Review B Final Remediation Sanity Audit v0.1

**Status:** INTERNAL PROVISIONAL CHECK / NOT EXTERNAL PASS  
**Scope:** BL-07, BL-08, BL-05/06 wording obligations, W01 rounding/reduction behavior.  
**Upstream:** Review A PASS remains binding.

## 1. Scope-backed guaranteed minimum — full drawdown

Authorized requirement capacity: 700 units.

Framework guaranteed minimum: 500 units.

On effectiveness:
- 500 units become `reserved-not-called` on the existing RequirementAllocation lineage;
- remaining unreserved capacity = 200.

Call-off 1 = 200:
- reserved-not-called becomes 300;
- called/committed becomes 200;
- total capacity usage remains 500 reserved/committed, not 700.

Call-off 2 = 200:
- reserved-not-called 100;
- called/committed 400.

Call-off 3 = 100:
- reserved-not-called 0;
- called/committed 500.

No call-off double-consumes reserved scope.

**Verdict:** PASS_PROVISIONAL.

---

## 2. Scope-backed minimum + call-off above minimum

Authorized capacity = 700.

Minimum reservation = 500.

Call-offs total 600.

Expected:
- first 500 draws down reservation;
- extra 100 consumes the remaining ordinary authorized capacity;
- total committed = 600 <= authorized 700;
- remaining capacity = 100.

**Verdict:** PASS_PROVISIONAL.

---

## 3. Framework expires with unused reserved minimum

Authorized capacity = 700.

Minimum reservation = 500.

Only 400 is called before expiry.

Residual reservation = 100.

Expected:
- no silent release;
- governed disposition records whether residual is released, extended/renewed, or becomes a contractual settlement exposure under the agreement;
- any released quantity returns capacity on the same allocation lineage;
- historical minimum/reservation remains evidence.

**Verdict:** PASS_PROVISIONAL.

Watch: exact accounting/settlement handling remains ADR-0005/0011 where a financial liability survives without procurement fulfillment.

---

## 4. Pure monetary minimum

Framework terms:
- minimum annual spend AED 1,000,000;
- no fixed item/quantity at agreement formation.

Expected:
- do not fabricate 1,000,000 units/value of RequirementAllocation scope;
- record contractual minimum exposure under terms authority;
- actual call-offs bind real RequirementAllocation scope normally;
- qualifying call-off value reduces outstanding minimum exposure under the agreement formula;
- residual take-or-pay/fee settlement, if any, is commercial/accounting exposure rather than fake delivered/fulfilled scope.

**Verdict:** PASS_PROVISIONAL.

Watch: external re-review should confirm this does not violate the intended meaning of `commitment binds allocation` from Review A/P07A; current interpretation is that every **scope-consuming procurement obligation** binds allocation, while a pure financial minimum does not fabricate scope.

---

## 5. Remeasurable contract with no genuine quantity cap

Contract:
- road excavation scope partition = defined project section;
- estimated BOQ = 10,000 m³;
- actual measured = 12,300 m³;
- same physical authorized scope;
- unit rate fixed.

Expected:
- `REMEASURABLE_QUANTITY`;
- hard conservation uses mandatory `SCOPE_PARTITION_BASIS`;
- 10,000 is planning/valuation estimate, not fake hard allocation cap;
- 12,300 is measurable/valued under unit-rate mechanism without fake VO merely due to measurement;
- extension beyond the authorized road section would require scope expansion.

**Verdict:** PASS_PROVISIONAL.

No unconserved state exists.

---

## 6. Remeasurable contract with genuine maximum

Authorized excavation scope has explicit maximum 15,000 m³.

Actual measurement reaches 14,500.

Expected:
- quantitative/hybrid hard ceiling may be used because maximum is genuine authorization;
- measurement remains inside authorization;
- >15,000 requires governed expansion unless contract/authorization itself changes.

**Verdict:** PASS_PROVISIONAL.

---

## 7. Authorized instruction adds new scope

Existing authorized scope = electrical works floors 1–3.

Valid contract instruction adds floor 4 and issuer has delegated authority to instruct that scope.

Expected:
- the instruction itself becomes the effective source event for authorized-basis expansion;
- allocation capacity for floor 4 may be created from that event;
- no artificial second approval event is required solely to expand basis;
- price may remain unagreed;
- valuation/certification uses named contractual authority until final agreement.

**Verdict:** PASS_PROVISIONAL.

---

## 8. Instruction lacks internal authority but may create external exposure

Site actor issues added-scope instruction outside internal DOA; contract/legal facts may still create supplier exposure.

Expected:
- do not silently mark as clean authorized expansion;
- preserve instruction/executed-work/external exposure evidence;
- route governance exception/escalation;
- do not invent supplier price;
- later resolution determines internal authorization/correction/settlement while history survives.

**Verdict:** PASS_WITH_WATCH.

Watch belongs to authority/legal-effect policy, not a new process.

---

## 9. Mixed fulfillment — stored material then installation

Economic component:
- material component AED 300,000;
- installation component AED 200,000.

Material arrives:
- `GOODS_RECEIPT` provides physical evidence.

Stored-material certificate recognizes AED 240,000 of the material component.

Later installation progress occurs.

Expected:
- common economic-base/component identity knows AED 240,000 material value already recognized;
- later progress cannot recognize the same AED 240,000 as new material earned value;
- installation component may be recognized separately;
- later transition of stored→installed status does not double total economic value.

**Verdict:** PASS_PROVISIONAL.

Exact persisted matching grain remains P1.5.

---

## 10. Tolerance rounding

Nominal quantity = 97 units.

Tolerance = +2%.

Raw mathematical result = 98.94.

Expected:
- system does not choose rounding implicitly;
- basis version references governed rounding policy;
- policy may produce an allowed integer ceiling according to the business rule;
- exact applied result + rule/version is preserved;
- allocation/commitment/receipt hard invariant uses that derived ceiling.

**Verdict:** PASS_PROVISIONAL.

No global floor/ceil rule is assumed prematurely; ADR-0022 owns policy definition.

---

## 11. Tolerance under downward basis revision

Basis v1:
- nominal 100;
- +2%;
- governed ceiling 102.

Current commitment consumption = 100.

Proposed basis v2:
- nominal 90;
- same or newly defined tolerance rule;
- derived target ceiling <100.

Expected:
- v2 remains proposed/pending;
- old basis remains effective to back existing exposure;
- CR-01 blocks new conflicting allocation/commitment;
- downstream exposure must reduce before v2 becomes effective;
- tolerance rule is explicitly carried/redefined, never inherited silently.

**Verdict:** PASS_PROVISIONAL.

---

## 12. Internal result

`FAIL_INTERNAL = 0`

`PASS_WITH_WATCH = 1`
- instruction with disputed/missing internal authority but possible external contractual effect.

External re-review is still required for:
- BL-07 scope-backed reservation + monetary-minimum distinction;
- BL-08 mandatory conservation fallback;
- wording closures for instruction/economic base;
- W01 deterministic rounding/reduction behavior.

Review C remains blocked until Review B external PASS.