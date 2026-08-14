# CPOS Supplier / Subcontractor Master + Compliance Capability v1.0

## User meaning

A supplier/subcontractor is a durable business counterparty with legal identity, contacts, categories, compliance and procurement history. It is distinct from qualification, project eligibility, tender participation, invitation and submission.

## Core profile

- immutable supplier ID and governed supplier code;
- legal name and trade name;
- supplier type/entity type;
- active/inactive/on-hold state;
- country/emirate/jurisdiction;
- registered and operating addresses;
- phone, email, website;
- TRN/VAT/tax identifiers where applicable;
- trade/commercial licence/registration number, issuing authority, issue and expiry dates;
- default currency and payment-term preference where appropriate;
- bank/payment data only if later scope/security authorizes it;
- notes and controlled internal tags.

## Contacts

Multiple contacts with name, title/role, phone, email, preferred communication channel, primary/commercial/technical/accounts flags and active state.

## Categories / trades

Supplier may be classified across versioned categories/trades, locations and service capabilities. Category membership does not automatically equal eligibility.

## Compliance documents

Document type, number, issuer, issue date, expiry date, verification status, evidence file and responsible reviewer. Examples: trade licence, VAT certificate, insurance, certifications, prequalification documents.

## Eligibility

Derived/contextual eligibility is separate from supplier identity. It can consider current required documents, project/trade criteria, risk/qualification state and explicit overrides with authority/evidence. A supplier can remain in the master while being ineligible for a specific tender/award.

## User surfaces

Supplier profile, contacts, compliance tab, categories/trades, sourcing/award/order history, document expiry view, search/filter/import/export and duplicate-detection workflow.

## Acceptance

A buyer creates a real UAE supplier with multiple contacts, address, TRN, licence and VAT documents, receives an expiry warning, sees that the supplier is valid for one sourcing context but blocked for another, and can invite the correct contact without re-entering supplier details.