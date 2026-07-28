# P1.1-D — Implementation Burden Budget v0.2

**Status:** PROVISIONAL / NOT FROZEN  
**Supersedes:** `P1_1_BURDEN_BUDGET_V0_1.md`  
**Purpose:** Bound implementation gravity without pretending unlike engineering costs are fungible.

## 1. Two-axis burden model

Every retained workstream is evaluated on two independent axes.

### Implementation cost

- `S` — bounded implementation with few states/dependencies.
- `M` — meaningful subsystem but limited cross-domain coupling.
- `L` — substantial state/integration/testing surface.
- `XL` — independent architecture/implementation gravity well requiring deliberate sub-slicing.

### Retrofittability

- `CHEAP` — can be added later without changing historical truth/core contracts.
- `EXPENSIVE` — later addition would require broad migration/reconfiguration or cross-domain rewiring.
- `IMPOSSIBLE` — missing it at first historical write/action loses information or violates an invariant that cannot be reconstructed reliably.

Cost does not cancel retrofittability. A cheap-to-retrofit XL feature is a prime deferral candidate; an impossible-to-retrofit substrate is retained and sub-sliced rather than deleted.

## 2. Numeric guardrails

These are the P1.1 implementation-burden budget; there is no summed pseudo-unit score.

1. **Independent XL SPINE gravity wells: maximum 1** in the current V1 boundary. Additional XL areas must be THIN/INTERFACE/OUT unless removal would break the closed lifecycle or violate an IMPOSSIBLE substrate invariant.
2. **XL + CHEAP may not be SPINE.** It is deferred/thinned by default.
3. **First-live-tender target:** a new tenant using standard configuration and clean onboarding inputs must be capable of reaching its first live tender within **5 working days**, excluding bespoke data cleanup requested by the customer.
4. **Bespoke connector dependency for first live tender: 0.** Standard import/export/interface contracts may exist, but a named ERP/CDE connector cannot be mandatory merely to issue the first tender.
5. Any later evidence that introduces a second independent XL SPINE gravity well reopens P1.1 scope/burden review before freeze or through normal change control after freeze.

The 5-day value is an operational architecture constraint, not a sales promise. It is meant to cap configuration/migration depth required before the core flow becomes executable.

## 3. Current workstream posture

| Workstream | Cost | Retrofittability | P1.1 treatment |
|---|---|---|---|
| identity / tenancy / authority / audit foundations | L | IMPOSSIBLE | retain substrate; UI/config depth can be thin |
| vendor master + minimum compliance state | M | EXPENSIVE | retain minimum state; deep SRM thin/out |
| demand / tender / bid evidence lifecycle | L | EXPENSIVE | retain; this is the first closed transaction path |
| comparison / approval / award | M | EXPENSIVE | retain core; recommendation and workflow breadth thin |
| commitment / change / valuation / balance truth | **XL** | IMPOSSIBLE/EXPENSIVE | **single allowed XL SPINE gravity well; sub-slice heavily around AP/GL/payment boundary** |
| evidence/document identity/provenance | L | IMPOSSIBLE | retain substrate; full CDE outside |
| external supplier participation | M | EXPENSIVE | retain task surface only; broad portal out |
| accounting/CDE/integration adapters | XL if deeply implemented | CHEAP/EXPENSIVE depending authority | INTERFACE-ONLY until specific boundary/evidence justifies an adapter |
| migration/import breadth | L | CHEAP | THIN; enough for safe onboarding only |
| dashboards/search/personalization | M | CHEAP | THIN |
| native mobile/offline | XL | CHEAP | OUT |
| general workflow/no-code platform | XL | EXPENSIVE | OUT; durable constrained primitives retained |
| inventory/warehouse | XL | CHEAP relative to procurement truth | OUT; commercial receipt event only |
| full AP/GL/payment execution | XL | EXPENSIVE | INTERFACE-ONLY/OUT implementation depending ADR-0005; no V1 ownership decision here |
| AI extraction/copilot/autonomy | XL | CHEAP relative to deterministic substrate | OUT from deterministic V1 |

## 4. Decision rules

- `IMPOSSIBLE` substrate is never cut merely to reduce build effort.
- `XL + CHEAP` is the first deferral class.
- `XL + EXPENSIVE` requires proof that it is part of the same closed gravity well or it becomes interface/thin.
- `L/M + CHEAP` user surfaces may be thinned without weakening core truth.
- A scope item cannot be promoted because "budget remains"; promotion requires lifecycle/primary-evidence justification.

## 5. Current result

Current provisional scope contains **one** independent XL SPINE gravity well: commitment/change/valuation/commercial truth.

Accounting replacement, full CDE, inventory, general workflow/no-code, native/offline, broad portal/marketplace and AI remain outside that gravity well.

The burden budget therefore passes provisionally **only if** the corrected closed graph can execute without pulling any of those adjacent XL domains into SPINE.

## 6. Reopen triggers

Reopen the burden assessment if P1.2/P1.4 shows:
- deep accounting ownership is required before commercial truth is usable;
- a bespoke connector is required before first tender;
- full certification/payment execution is required to close the retained commercial loop;
- persistent supplier portal is required for external participation;
- offline/native client is required for core actions;
- inventory stock truth is required for material procurement;
- constrained approval primitives cannot represent observed workflows.