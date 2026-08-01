# P1.11 — Action, Surface, API & Report Catalogue v0.1

**Date:** 2026-08-01  
**Status:** BUILD-FACING VALIDATION CATALOGUE  
**Purpose:** eliminate orphan actions, phantom controls and UI/API invention.

---

# 1. Catalogue rules

Every supported action binds:

- canonical action family;
- OperationRegistry class;
- owning conventional surface;
- API exposure class;
- authority/guard/evidence basis;
- effect/result/recovery;
- related reports/control observations;
- AI role, if any.

`QUERY` and `PROPOSAL` never create business truth. `COMMAND` and `ASYNC_OPERATION` are the only state/effect-bearing classes. Local presentation/navigation never performs a command.

API exposure classes:

- `INTERNAL_PRODUCT_API_MANDATORY`;
- `EXTERNAL_INTEGRATION_API_OPTIONAL_ACTIVATION`;
- `EXTERNAL_TASK_CHANNEL`;
- `FUTURE_AGENT_TOOL_OPTIONAL`;
- `NO_EXTERNAL_API_PRESENTATION_ONLY`.

---

# 2. Context, identity and configuration

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| establish tenant/legal/project/context | COMMAND | administration/context setup | internal | privileged current authority; establishes versioned context, not commercial truth |
| change ContractingAuthorityContext | COMMAND | governed context-change review | internal | explicit effective date/migration/in-flight treatment |
| manage internal membership/role/delegation | COMMAND | access/authority administration | internal | current security authority; historical decisions retain original binding |
| create/revoke external task grant | COMMAND | external-participation administration/task invitation | internal + external channel | grant is task/version/tenant scoped, never internal DOA |
| configure supported product policy/profile | COMMAND | bounded configuration administration | internal | product-registered dimensions only; versioned and auditable |
| migrate/re-evaluate in-flight configuration | ASYNC_OPERATION/COMMAND | controlled migration/re-evaluation view | internal | no silent rebinding |
| inspect authority/configuration history | QUERY | history/audit view | internal | exact effective/recorded versions |

Reports/controls: access/delegation expiry, context/configuration change, grant expiry/revocation, migration/re-evaluation exception.

---

# 3. Requirement, allocation and package

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| capture requirement source/evidence | COMMAND or ASYNC_OPERATION for file capture | requirement workspace | internal; file/manual adapters | creates product-owned requirement/evidence facts only after validation |
| draft requirement | PROPOSAL | requirement editor | internal | non-authoritative draft |
| establish/change RequirementAllocation | COMMAND | allocation view | internal | owns scope consumption lineage; exact source/target quantities |
| create/update optional ProcurementPackage | COMMAND | package workspace | internal | grouping/coordination only, not universal root or commitment |
| validate package/tender readiness | QUERY | readiness panel | internal | derived validation/control observations |
| cancel/supersede requirement/allocation/package | COMMAND | record action panel | internal | typed lifecycle and history, subject to downstream guards |
| inspect allocation/package history | QUERY | history/evidence tabs | internal | canonical lineage |

Reports/controls: unallocated/overallocated scope, missing evidence, package readiness, supersession conflicts.

---

# 4. Tender/RFQ preparation and issue

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| create tender/RFQ draft | PROPOSAL | tender setup workspace | internal | draft only |
| bind scope/member/schema/recipient/date versions | COMMAND or proposal then command | tender setup/review | internal | creates governed event version/basis |
| validate recipients/grants/confidentiality/prerequisites | QUERY | issue readiness | internal | current authority/access/evidence checks |
| preview issue | PROPOSAL/QUERY | issue preview | internal | exact artifact/member/recipient/consequence preview |
| confirm and issue | COMMAND/ASYNC_OPERATION | issue confirmation/result view | internal; provider-neutral email/file/manual; optional integration | immutable issue/publication identity; acceptance/effect stages explicit |
| reissue/addendum/supersede | COMMAND | addendum/version workspace | internal | new event/member/publication version; no in-place mutation |
| cancel/withdraw event | COMMAND | tender lifecycle actions | internal | owning-domain lifecycle; issued history remains |
| lookup/reconcile issue result | QUERY/ASYNC_OPERATION | result recovery/reconciliation | internal | no blind retry under possible effect |

Reports/controls: RFQs issued/open/closed, invitation coverage, failed/indeterminate dispatch, addendum acknowledgment, due/aging.

---

# 5. External supplier participation

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| open external task | QUERY | secure task link/optional workspace | external task channel | exact task/grant/version/access only |
| acknowledge/decline/intent response | COMMAND | external task | external channel | distinct occurrences, not submission/award |
| upload source files/content | ASYNC_OPERATION | external response workspace/email capture | external channel | untrusted evidence capture only until accepted |
| submit source response | COMMAND | review-and-submit surface | external channel | ExternalSubmissionAcceptancePolicy determines disposition |
| revise/withdraw response | COMMAND | revision/history surface | external channel | immutable prior revision, exact supersession/withdrawal |
| request transfer/add team member | PROPOSAL/COMMAND under policy | external task support | external channel | buyer-approved or bounded team policy; forwarding alone no authority |
| buyer-on-behalf capture | COMMAND/PROPOSAL chain | internal supplier-response capture | internal | preserves external source/internal capture/assurance limitations |
| issue submission receipt/status | QUERY/system publication | receipt/status lookup | external channel | states disposition/population entry and explicit non-meaning |

Reports/controls: invited/responded/declined/no-response, response revisions, provisional/quarantined/late responses, attribution limitations.

---

# 6. Normalization, comparison and clarification

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| parse/import registered fields | ASYNC_OPERATION/PROPOSAL | import/normalization workspace | internal | creates proposals only; unknown content remains evidence |
| propose source-to-normalized mapping | PROPOSAL | normalization grid | internal; optional AI tool | exact source citation/field key/transformation/limitations |
| accept/correct normalized value | COMMAND | normalization review | internal | establishes normalized representation, not supplier source truth |
| record buyer evaluation adjustment | COMMAND | comparison/evaluation grid | internal | separate evaluation layer with evidence/reason/authority |
| request clarification | COMMAND/publication | clarification workspace | internal + external channel | communication only; no silent source mutation |
| capture supplier confirmation | COMMAND | clarification/response workspace | external/internal capture | establishes confirmed contractable basis where valid |
| compute comparison | QUERY | comparison workspace | internal | versioned deterministic projection over exact response population |
| freeze comparison snapshot | COMMAND/ASYNC_OPERATION | comparison issue/review | internal | immutable result/report snapshot if required |

Reports/controls: response completeness, normalization status, unresolved mappings, non-comparability, clarification aging, comparison readiness.

---

# 7. Recommendation, approval and AwardDecision

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| create recommendation draft | PROPOSAL | recommendation workspace | internal; optional AI recommendation | non-authoritative and source-cut bound |
| submit recommendation for approval | COMMAND | recommendation action | internal | creates approval task/basis, not award |
| approve/conditional/return/request-info/reject/decline/abstain | COMMAND | approval center | internal | approval outcome only; exact proposal/version/DOA/delegation |
| delegate/expire/escalate approval | COMMAND/system bounded operation | approval center | internal | no direct domain/commercial truth |
| establish AwardDecision | COMMAND | award preview/confirmation | internal | exact selected basis and immutable decision event; not Commitment |
| cancel/correct/supersede AwardDecision | COMMAND | award history/action | internal | typed domain correction/supersession, downstream guards |
| create external handoff proposal/artifact | PROPOSAL/ASYNC_OPERATION | award/handoff workspace | internal | no external effect until issue/transmission |
| issue handoff | COMMAND/ASYNC_OPERATION | handoff confirmation/result | internal/manual/optional integration | exact publication/effect uncertainty; no Commitment by implication |

Reports/controls: recommendation/approval status, DOA/delegation, stale proposal, AwardDecision/handoff status, rejected/re-tender paths.

---

# 8. P07 Commitment and commercial operations when activated

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| draft Commitment from award/external basis | PROPOSAL | Commitment workspace | internal | non-authoritative |
| establish Commitment | COMMAND | Commitment confirmation | internal; optional integration publication | creates one semantic obligation core/effects, separate from accounting posting |
| instruct/change/approve valuation basis | COMMAND | change/valuation workspace | internal | exact component/obligation lineage and governing versions |
| submit claim/application | COMMAND | external/internal claim workspace | external/manual/internal | claim fact only |
| assess claim | COMMAND | assessment workspace | internal | assessment distinct from claim/certification |
| certify value | COMMAND | certification confirmation | internal | emits exact CommercialEffectVector under authority/calculation policy |
| record external accounting posting/payment observation | COMMAND/ASYNC_OPERATION or connector observation | reconciliation view | internal/optional connector | REFERENCE/MIRROR according to authority; no co-master |
| reverse/replace/forward-adjust/reclassify | COMMAND | correction workspace | internal | immutable typed correction/conservation |
| release retention/advance/security | COMMAND | commercial release workspace | internal | exact prerequisite/effect semantics |
| reconcile external mismatch | ASYNC_OPERATION/COMMAND | reconciliation workspace | internal/optional connector | history-preserving; integration correction does not rewrite commercial truth |

Reports/controls: committed/approved/certified/retained/recovered/posted/paid positions by exact actual family, change/claim/certificate aging, reconciliation.

---

# 9. Evidence, communication and records

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| capture evidence/version/source locator | COMMAND/ASYNC_OPERATION | evidence capture | internal/external/manual/file | exact identity/integrity/attribution; untrusted until validated |
| bind evidence/reliance | COMMAND | owning transaction/evidence panel | internal | exact version/location/use; no current-pointer rebinding |
| issue transmittal/artifact | COMMAND/ASYNC_OPERATION | communication issue view | internal/optional channels | exact member/addressee/rule/publication identity |
| record delivery/read/ack/content occurrence | COMMAND/ExternalObservation | communication history | channel/connector/manual | occurrence evidence only |
| establish communication-gated domain effect | COMMAND | owning-domain recovery/action | internal | consumes canonical satisfaction snapshot; one established-once effect |
| redact/restrict/dispose under policy | COMMAND/ASYNC_OPERATION | records governance | internal | preserves tombstone/identity/authority/financial meaning/hold rules |
| place/release legal/contract hold | COMMAND | records governance | internal | current authority; prevents prohibited disposition |
| inspect reconstruction status | QUERY | evidence/audit view | internal | exact current reconstruction level/limitations |

Reports/controls: missing evidence, reconstruction limitation, pending communication basis, failed/bounced delivery, satisfaction without establishment, disposition/hold exceptions.

---

# 10. Integration, migration and recovery

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| configure/activate connector profile | COMMAND | integration administration | internal | product-supported profile/authority/conformance only |
| publish outbound intent | ASYNC_OPERATION | operation result/integration monitor | internal/optional external API | immutable PublicationIntent and exact target/mapping/disclosure |
| ingest external observation | ASYNC_OPERATION | integration intake/quarantine | external integration API | validation/correlation/quarantine; never domain event by itself |
| lookup/reconcile effect | QUERY/ASYNC_OPERATION | reconciliation view | internal/optional connector | exact effect-stage transitions; positive evidence burden |
| accept unresolved external variance | COMMAND | reconciliation decision | internal | closes attention only, not effect truth |
| execute cutover/authority transfer | ASYNC_OPERATION/COMMAND | cutover workspace | internal | effective-dated one-writer proof and in-flight disposition |
| preview migration | ASYNC_OPERATION/PROPOSAL | migration workspace | internal | manifest/acceptance/limitations, no state assignment |
| accept migration item/run | COMMAND/ASYNC_OPERATION | migration review | internal | registered target operations/effects or reference-only import |
| correct migration | COMMAND/ASYNC_OPERATION | migration correction | internal | history-preserving and manifest-linked |

Reports/controls: connector health/conformance, effect-indeterminate queue, quarantined observation classes, cutover variance, migration completeness/limitations/reconciliation.

---

# 11. Reporting, analytics and control observations

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| run registered metric/query/report | QUERY/ASYNC_OPERATION | report/query workspace | internal; optional external read API | exact definition/population/time/source cut/quality/use/access |
| freeze/issue report snapshot | COMMAND/ASYNC_OPERATION | report issue view | internal | immutable snapshot/artifact/issue identity |
| recalculate/rebuild | ASYNC_OPERATION | projection administration/result | internal | new execution/result, no prior mutation |
| restate/supersede/withdraw issued report | COMMAND/ASYNC_OPERATION | report history/reliance view | internal | explicit restatement/supersession/notice |
| assess subsequent reliance | QUERY/COMMAND if attested decision | historical report view | internal | current access/policy/evidence/restatement/use disposition |
| acknowledge/assign/snooze control observation | COMMAND | work queue/control view | internal | does not clear source predicate |
| accept variance | COMMAND | control/reconciliation decision | internal | explicit source-predicate/effect meaning preserved |

Reports/controls: A0–A3 pack, P07 pack when applicable, quality/completeness/freshness, portfolio comparability, supplier dimension reports, restatement status.

---

# 12. NFR, incident, restore and deployment

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| define/version product NFR/workload profile | COMMAND under architecture/release authority | engineering governance | internal engineering only | product-owned, not tenant SLO builder |
| record verification/conformance | COMMAND | release/conformance evidence | internal engineering | exact test/population/evidence; activation gating |
| lower declared envelope prospectively | COMMAND | release/commercial governance | internal | named approvals, C0 unchanged, contract/customer impact |
| declare incident/degradation | COMMAND/system observation | incident/service status | internal/system | operational state only; no business-truth mutation |
| restore/failover/rebuild | ASYNC_OPERATION | operations/recovery | internal engineering | exact run/evidence/RTO/RPO/tenant/history proof |
| release/rollback/kill capability | COMMAND/ASYNC_OPERATION | deployment governance | internal engineering | versioned in-flight disposition; history preserved |
| export/offboard tenant data | ASYNC_OPERATION | tenant governance/export | internal | exact authorization/scope/manifest/checksum/limitations |

Customer-facing product does not expose generic SLO/SIEM/GRC/cloud administration.

---

# 13. AI capability and agent operations

| Action family | Class | Owning surface | API | Authority/effect |
|---|---|---|---|---|
| enable/disable/narrow product AI capability | COMMAND | bounded tenant AI settings | internal | monotonicity proof; no capability/prompt/tool authorship |
| run extraction/mapping/classification/draft/query | ASYNC_OPERATION/PROPOSAL/QUERY | owning deterministic task surface | internal; optional future agent tool | exact run/source/context/evaluation/resource lineage |
| review/correct AI proposal | COMMAND | owning task review | internal | accepted deterministic fact only through registered command |
| prepare command at L4 | PROPOSAL | owning action preview | future agent tool/internal | exact canonical command/digest proposal |
| transmit confirmed command at L5 | COMMAND | conventional confirmation/result | internal/future agent tool | same-principal exact digest only |
| abstain/disable/fallback | QUERY/result disposition | same surface | internal | explicit unsupported/context/resource/provider reason; deterministic path remains |
| change product AI capability/provider profile | architecture/release COMMAND | engineering governance | internal engineering only | full change/evaluation/conformance gate |

No generic tenant prompt/agent/tool/vector/memory/evaluation builder.

---

# 14. Search, navigation and conventional ownership

Conventional surfaces required for A0–A3:

- global/project work context and search;
- requirement/allocation/package views;
- tender/RFQ setup, issue and recovery;
- supplier response/revision capture;
- normalization/comparison;
- recommendation/approval center;
- AwardDecision/handoff;
- evidence/communication/history;
- reports/controls;
- administration limited to bounded product configuration.

When P07 is active:

- Commitment;
- changes/valuation;
- claim/assessment/certification;
- retention/advance/security;
- reconciliation/correction.

Every product-supported chat/AI action has an inspectable conventional equivalent. Chat is never the only route.

---

# 15. Catalogue completeness result

- Human/external state-changing actions with no registered operation: **NONE IDENTIFIED**.
- Registered state-changing action with no conventional owning surface: **NONE IDENTIFIED**.
- SPINE action requiring chat/AI: **NONE**.
- SPINE action requiring named connector: **NONE**.
- UI control that could write business truth without operation: **PROHIBITED**.
- API/agent privileged mutation path outside OperationRegistry: **PROHIBITED**.
- Report/control queue as second truth writer: **PROHIBITED**.

This catalogue closes the build-facing action/surface/API ownership compilation gap. Physical page layout, route names, component library and endpoint syntax remain deferred.