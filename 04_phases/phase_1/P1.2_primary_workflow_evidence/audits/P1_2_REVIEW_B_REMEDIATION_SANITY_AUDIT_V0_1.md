# P1.2 — Review B Remediation Sanity Audit v0.1

**Status:** INTERNAL PROVISIONAL CHECK / NOT EXTERNAL PASS  
**Scope:** BL-03–BL-06, W01–W04 remediation only.

## 1. Framework agreement with no minimum + two call-offs

Input:
- annual concrete rate agreement;
- no guaranteed minimum quantity;
- call-off A = 100 m³;
- call-off B = 60 m³.

Expected:
- framework/rate authority becomes effective without RequirementAllocation consumption or committed cost;
- A and B each reference framework version/rates;
- A and B bind separate allocation leaves and form independent baselines;
- framework remains unchanged by ordinary call-off execution.

**Verdict:** PASS_PROVISIONAL.

## 2. Framework with guaranteed minimum

Input:
- annual plant-hire agreement with binding minimum spend/volume.

Expected:
- terms/rate authority still exists;
- guaranteed minimum is represented as committed obligation exposure rather than hidden inside the non-consuming terms role;
- later call-offs reconcile against that obligation according to contract terms rather than double-counting commitment.

**Verdict:** PASS_WITH_WATCH.

Watch: exact minimum-drawdown mechanics belong to ADR-0004/P1.5 and primary evidence. No new process required.

## 3. Remeasurable subcontract: estimated 1,000 m², actual 1,180 m²

Input:
- contract rate fixed at AED 50/m²;
- BOQ quantity 1,000 m² explicitly estimated/re-measurable;
- scope partition = complete specified plaster works for defined building/zone;
- actual governed measurement = 1,180 m².

Expected:
- RequirementAllocation hard dimension is the authorized plaster scope partition, not the estimated 1,000 m² unless a real maximum is separately authorized;
- no fake P07B variation simply because measured quantity is 1,180;
- certification uses governed measured quantity × effective rate;
- any contractual cap/limit still applies if present.

**Verdict:** PASS_PROVISIONAL.

No Review A regression.

## 4. Firm quantity contract exceeds baseline

Input:
- firm order 100 units;
- no tolerance/cap expansion;
- proposed fulfillment/commitment of 110.

Expected:
- FIRM_QUANTITY remains constrained;
- extra 10 requires effective upstream authorization + contractual change/new obligation as applicable;
- remeasurement semantics cannot be used to bypass firm quantity.

**Verdict:** PASS_PROVISIONAL.

## 5. Provisional sum allowance

Input:
- original subcontract includes AED 100,000 provisional sum;
- later instructed work valued at AED 72,000.

Expected:
- AED 100,000 allowance remains original contractual component/context but not earned work;
- instruction identifies actual scope and valuation basis;
- AED 72,000 may be valued/certified according to contract rule;
- allowance consumed/remaining projection = AED 72,000 / AED 28,000 where contract uses that drawdown model;
- no RequirementAllocation scope is created merely because allowance value exists.

**Verdict:** PASS_PROVISIONAL.

Watch: contract-specific treatment of provisional sums can differ; primary evidence required.

## 6. Daywork / instructed-unagreed variation

Input:
- buyer issues valid instruction for extra work;
- subcontractor must proceed;
- final variation price not agreed;
- contract permits daywork or fair valuation interim certification.

Expected:
- AuthorizedWorkInstruction establishes work authority;
- if scope expands, upstream authorized requirement basis expands through the same governed instruction/authority chain before new scope consumption;
- no final supplier-agreed price is fabricated;
- execution/measurement evidence accumulates;
- interim certification references named daywork/fair-valuation authority;
- later agreed variation becomes effective commercial change and reconciles prior provisional certification non-destructively.

**Verdict:** PASS_PROVISIONAL.

## 7. Instruction within existing remeasurable scope

Input:
- site instruction changes sequence/details but remains inside already-authorized remeasurable plaster scope;
- final measured quantity differs.

Expected:
- instruction does not automatically expand requirement basis;
- measurement/valuation follows existing remeasurement rule;
- change only required if contractual scope/rate/terms actually change.

**Verdict:** PASS_PROVISIONAL.

This prevents instruction from becoming a universal fake basis-change event.

## 8. Supply-and-install commitment

Input:
- one subcontract includes supplied equipment, installation and commissioning.

Expected:
- supply segment may use GOODS_RECEIPT;
- stored material value may be certified under PROGRESS_VALUATION using receipt as evidence;
- installation uses progress valuation;
- commissioning uses milestone/deliverable certification;
- entity remains one commitment if later ADR design chooses so;
- material value cannot be earned twice at storage and installation.

**Verdict:** PASS_WITH_WATCH.

Watch: exact cross-mechanism anti-double-counting grain belongs to P1.5.

## 9. Consultancy milestone contract

Input:
- design consultancy paid on deliverable milestones;
- no physical goods receipt and no measured quantity.

Expected:
- NON_QUANTIFIED_SCOPE;
- MILESTONE / DELIVERABLE_ACCEPTANCE fulfillment/valuation;
- no GRN and no fabricated progress quantity.

**Verdict:** PASS_PROVISIONAL.

## 10. Goods receipt tolerance

Input:
- nominal requirement 100 units;
- basis version authorizes +2% tolerance;
- commitment permits up to 102;
- supplier delivers 101.

Expected:
- hard authorized ceiling = 102;
- 101 may be accepted without post-hoc scope exception;
- nominal fulfillment remains distinguishable from 1 unit tolerance usage.

**Verdict:** PASS_PROVISIONAL.

Counter-test:
- supplier delivers 103;
- 103rd unit cannot be accepted as ordinary authorized fulfillment without new authorization/disposition.

**Verdict:** PASS_PROVISIONAL.

## 11. ERP mapping defect

Input:
- valid commercial commitment;
- export rejected because connector maps cost code incorrectly.

Expected:
- classify TRANSPORT_OR_MAPPING_DEFECT;
- correct mapping/config;
- retry same commercial truth;
- no mutation to commitment value/scope/cost attribution merely to make export pass.

**Verdict:** PASS_PROVISIONAL.

## 12. ERP authoritative return

Input:
- external system is authoritative for vendor master legal name/status;
- mirror differs.

Expected:
- EXTERNAL_AUTHORITY_RETURN;
- update mirror under authority contract;
- preserve historical transaction snapshots;
- do not treat this as generic transport rejection.

**Verdict:** PASS_PROVISIONAL.

## 13. Certification correction after prior certificate operated

Input:
- certificate 5 finalized/paid basis;
- later discover over-measurement of AED 10,000;
- policy requires forward adjustment in certificate 6.

Expected:
- certificate 5 remains historical;
- FORWARD_ADJUST in certificate 6 references target/reason/evidence;
- no destructive rewrite and no universal reverse primitive forced.

**Verdict:** PASS_PROVISIONAL.

## 14. Receipt return after acceptance

Input:
- goods accepted, then returned due latent defect.

Expected:
- PHYSICAL_REVERSAL / return disposition updates current accepted/fulfilled projection;
- original receipt/acceptance remains historical evidence;
- physical and commercial/accounting consequences remain separately traceable.

**Verdict:** PASS_PROVISIONAL.

## 15. Internal result

`FAIL_INTERNAL = 0`

`PASS_WITH_WATCH = 2`
- framework guaranteed-minimum drawdown mechanics;
- mixed-mechanism anti-double-counting grain.

All other affected threads PASS_PROVISIONAL.

No new P13 process is identified.

## 16. Continuation verdict

**READY FOR NARROW EXTERNAL REVIEW B RECHECK.**

This is not P07/P08 PASS and Review C remains blocked until the external recheck passes.
