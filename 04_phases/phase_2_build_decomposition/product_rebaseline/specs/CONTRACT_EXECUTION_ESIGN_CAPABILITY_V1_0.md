# CPOS Contract Execution / eSignature Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Creating an LPO/PO/Subcontract PDF is not the end of procurement. CPOS must know whether the commercial instrument was actually sent, acknowledged, signed/accepted and executed, and must preserve the exact executed artifact.

## Execution object

### ExecutionCase
- commitment/order/contract identity;
- exact issued artifact version;
- execution method: acknowledgment / manual signature / external eSign / native-provider-neutral eSign;
- sender/issuer;
- recipient/signatory parties and roles;
- required signing/acknowledgment order where applicable;
- sent timestamp;
- expiry/deadline;
- reminder policy;
- current execution state;
- provider/external transaction reference where applicable.

## Lifecycle

Minimum states:
`NOT_READY -> READY_TO_SEND -> SENT -> VIEWED/DELIVERED -> PARTIALLY_SIGNED -> EXECUTED`

Exception states include `DECLINED`, `EXPIRED`, `DELIVERY_FAILED`, `VOIDED`, `SUPERSEDED` and `CANCELLED` where applicable.

A PO/LPO acknowledgment workflow may be simpler than subcontract multi-party signature; execution policy is document-class configurable.

## Evidence

Preserve:
- exact issued document;
- send/delivery occurrence;
- recipient identity/address;
- signature/acknowledgment occurrence and provider evidence;
- executed final artifact;
- reminders and failure/decline events;
- supersession/void history.

The system must never treat an unsigned draft or merely generated PDF as executed.

## Provider boundary

V1 architecture is provider-neutral. Manual/external execution may be supported before native eSign. Provider integrations (e.g. DocuSign or another qualified provider) bind through adapter contracts and may not become the authoritative commercial model.

## User surfaces

- execution status on LPO/PO/Subcontract register;
- send/signatory setup;
- pending signatures/acknowledgments queue;
- reminder/resend actions;
- executed-contract repository in business context;
- audit trail.

## AI boundary

AI may summarize execution status or draft reminder messages. It cannot forge, infer or silently mark acknowledgment/signature/execution.

## Acceptance

A subcontract generated from an approved award is issued to two required signatories, the system records delivery and signature progress, reminds an overdue signer, stores the final executed artifact when complete, and shows procurement management which awarded packages still have no executed contract.