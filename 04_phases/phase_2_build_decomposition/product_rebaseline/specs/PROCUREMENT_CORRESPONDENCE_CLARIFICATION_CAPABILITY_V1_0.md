# CPOS Procurement Correspondence / Clarification Capability v1.0

**Status:** DRAFT / MEANING REVIEW REQUIRED

## User meaning

Commercial procurement decisions are shaped by invitations, reminders, clarifications, bidder questions, addenda, negotiation confirmations, award notices and contract communications. These communications must not disappear into personal inboxes or become an unstructured audit log.

## Core communication record

### ProcurementCorrespondence
- immutable internal ID;
- business context: supplier, package/RFQ/quotation/comparison/award/order/contract;
- correspondence type;
- sender/recipient identities and channels;
- subject/body or preserved external message reference;
- sent/received/recorded timestamps;
- attachments/source documents;
- response-to/thread relation;
- external provider/message reference where integrated;
- delivery/failure/acknowledgment state where known;
- confidentiality/visibility classification.

## Clarification

A ClarificationCase may bind a structured question to one or more RFQ/quotation/comparison items and record:
- question/request;
- supplier/party;
- issue date/due date;
- response(s)/revision references;
- affected scope/pricing/commercial terms;
- whether supplier confirmation changes the contractable basis;
- resolved/unresolved state;
- exact correspondence/source evidence.

A clarification may lead to a supplier-confirmed comparison basis or RFQ addendum, but cannot silently rewrite an issued RFQ or supplier quotation.

## Channels

Manual recorded communication, secure task/link messages, email ingestion/sending when integrated and provider-neutral external effects. The domain record does not depend on one mail provider.

## User surfaces

Contextual correspondence timeline; clarification queue; overdue responses; supplier thread; links from comparison cells/deviations to the exact clarification that resolved them; award/order communication history.

## Boundary

CPOS is not a general corporate email client. It owns procurement-relevant correspondence/provenance and may reference external messages where a connector remains authoritative.

## Acceptance

A bidder asks a scope question, the buyer issues a clarification, later sends an RFQ addendum to all bidders, receives a supplier confirmation changing one commercial term, and the comparison/recommendation can trace the final confirmed basis to the exact correspondence without changing the original quotation or tender issue.