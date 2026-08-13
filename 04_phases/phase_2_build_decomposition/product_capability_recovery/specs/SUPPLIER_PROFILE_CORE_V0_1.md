# CPOS Supplier Profile Core v0.1

**Status:** DRAFT / MEANING REVIEW REQUIRED

A supplier/subcontractor profile is a durable counterparty record. It is not the same object as an RFQ participant, invitation, quote or user account.

## Minimum profile

- internal supplier identity and automatic supplier code;
- legal name, trading name and organization type;
- material supplier / subcontractor / service provider classification;
- active, inactive and blocked state;
- country and region;
- multiple business addresses by purpose;
- multiple contacts with job role, email and phone/mobile;
- business registration and licence references with validity dates;
- categories, trades and services;
- named supporting documents and expiry/verification state;
- sourcing eligibility;
- separate eligibility to receive an order/contract;
- derived RFQ, quotation, award and order history.

B04 stores file identity/version/provenance underneath. The user sees named supplier documents rather than generic evidence objects.

Eligibility is determined from current configured requirements and valid records. It is not one global approved-vendor checkbox.

## UX

Supplier register: code, name, type, trade/category, location, eligibility, next document expiry, active RFQs and award/order history.

Supplier record: Overview, Contacts, Addresses, Documents/Compliance, Trades/Categories, RFQs/Quotes, Awards/Orders and later Performance/Risk.

## Acceptance

A reviewer can create a supplier with several contacts and addresses, attach time-limited business documents, classify trades, see eligibility change when a required record expires, and select an existing contact during RFQ creation without re-keying supplier details.
