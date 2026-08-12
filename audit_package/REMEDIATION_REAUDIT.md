# Remediation record — BL-B0406-01

## Prior independent verdict

`FAIL` on target `b6a3a6f76c6a8baa33dd6b4f30c26228fca511d5`.

One blocking finding was demonstrated: `scanDatabaseCatalog` queried only `cpos_*` and `testkit_*` schemas, while the committed product objects live in `platform`, `evidence`, `requirements`, `sourcing`, and `ops`. As a result, the release catalog gate could return clean without observing the product-owned database objects it was intended to police.

The prior audit explicitly stated that no live tenant escape or unsafe current definer was demonstrated; the blocker was loss of the security control itself.

## Surgical remediation

Target `4f9de1ed60bbd138f1b96a8b7e7e08af403b7c15` changes only the catalog control and its hostile test:

1. Product schemas are explicit scanner inputs: `platform`, `evidence`, `requirements`, `sourcing`, `ops`.
2. Historical `cpos_*` / `testkit_*` scanning remains intact.
3. `SECURITY DEFINER` remains prohibited by default. Existing legitimate definers are enumerated in an explicit approval registry.
4. An approved definer must contain a pinned `SET search_path`; otherwise the scanner reports it.
5. More than one security-definer function under the same approved identity reports a finding, preventing an overload bypass.
6. Context-mutation detection now distinguishes mutation from read-only context access: `set_config(...)` and direct `SET cpos.*` are prohibited; `SET ROLE` remains independently prohibited. `current_setting(...)` reads do not create a false positive.
7. A negative integration fixture injects an unapproved context-mutating definer into the actual product-owned `platform` schema and proves the scanner reports both violations.
8. After fixture cleanup, the exact-head full hostile suite and final clean fully migrated catalog scan pass.

## Required independent disposition

This record is not self-authorization. The independent auditor must inspect the exact complete-source target and return `PASS`, `FAIL`, or `BLOCKED` under `INDEPENDENT_HOSTILE_AUDIT_PROMPT.md`.

Until independent `PASS`:

- PR #7 remains draft / unmerged;
- dashboard deployment remains prohibited;
- B07 remains locked and out of scope;
- SSV-1 remains deferred, not waived.
