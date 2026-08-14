# CPOS Supplier / Subcontractor Master + Compliance Capability v1.0

## User meaning

A supplier/subcontractor is a durable business counterparty with legal identity, contacts, categories, compliance and procurement history. It is distinct from registration, qualification, project eligibility, tender participation, invitation and submission.

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

Supplier may be classified across versioned categories/trades, locations and service capabilities. Category membership does not automatically equal registration, qualification or eligibility.

## Compliance documents

Document type, number, issuer, issue date, expiry date, verification status, source file and responsible reviewer. Examples: trade licence, VAT certificate, insurance, certifications, prequalification documents.

## Registration / qualification relationship

Supplier Master is the durable identity used by the separate Supplier Registration / Qualification capability. Registration collects/vets profile information; qualification is contextual by trade/category/region/project policy and may expire/requalify. Neither is collapsed into one supplier-state flag.

## Eligibility

Derived/contextual eligibility is separate from supplier identity. It can consider current required documents, registration/qualification, project/trade criteria, risk state and explicit overrides with authority/evidence. A supplier can remain in the master while being ineligible for a specific tender/award.

## Performance / workload / exposure relationship

Supplier identity and compliance are the foundation for the separate Supplier Performance / Capacity / Exposure Intelligence capability. The supplier profile must expose current project/tender/commitment activity, governed performance ratings and explainable capacity/exposure indicators when those facts exist. Performance intelligence does not silently mutate legal identity, qualification or compliance state and may not become an opaque eligibility shortcut.

## User surfaces

Supplier profile, contacts, registration/qualification, compliance, categories/trades, sourcing/award/order history, performance/exposure summary, document expiry view, search/filter/import/export and duplicate-detection workflow.

Supplier facts must be reachable from bidder selection, comparison/leveling and recommendation without leaving the procurement decision context.

## Acceptance

A buyer creates a real UAE supplier with multiple contacts, address, TRN, licence and VAT documents, sends/records registration, qualifies the supplier for the relevant trade, receives an expiry warning, sees that the supplier is valid for one sourcing context but blocked for another, can inspect current procurement exposure/performance context, and can invite the correct contact without re-entering supplier details.