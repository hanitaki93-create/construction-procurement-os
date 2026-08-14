import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const inventoryPath = resolve(root, '04_phases/phase_2_build_decomposition/product_rebaseline/R00_CAPABILITY_INVENTORY_V0_5.csv');
const manifestPath = resolve(root, '04_phases/phase_2_build_decomposition/product_rebaseline/R00_CAPABILITY_SPEC_MANIFEST_V0_6.json');
const authorize = process.argv.includes('--authorize');

function fail(message) {
  console.error(`CAPABILITY_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(',');
  return lines.map((line) => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function requireFile(relativePath, description) {
  if (!relativePath) {
    fail(`${description} path missing`);
    return null;
  }
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    fail(`${description} does not exist: ${relativePath}`);
    return null;
  }
  return path;
}

const inventory = parseCsv(readFileSync(inventoryPath, 'utf8'));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const byId = new Map();

if (inventory.length !== 59) {
  fail(`expected 59 current capability rows; found ${inventory.length}. CAP-056 is intentionally unused/tombstoned and is not a capability.`);
}

for (const entry of manifest.capabilities ?? []) {
  for (const id of entry.ids ?? []) {
    if (byId.has(id)) fail(`duplicate manifest mapping for ${id}`);
    byId.set(id, entry);
  }
}

const commonFieldPath = requireFile(manifest.common_field_contract, 'common field contract');
if (commonFieldPath) {
  const text = readFileSync(commonFieldPath, 'utf8');
  if (!/STANDARD §C AUTHORITY/i.test(text)) fail('common field contract lacks STANDARD §C AUTHORITY marker');
}
requireFile(manifest.default_tenant_profile, 'default tenant profile');

const firstSpine = inventory.filter((row) => /^R0[1-8](?:_|$)/.test(row.target_block));
const requiredProduct = inventory.filter((row) =>
  /^R0[1-9](?:_|$)/.test(row.target_block) ||
  /^R10(?:_|$)/.test(row.target_block) ||
  row.target_block === 'CROSS_CUTTING'
);

const requiredHeaderTerms = [
  'Field / label',
  'Meaning',
  'Type',
  'Requirement',
  'Master / reference source',
  'Default',
  'Lifecycle editability',
  'Validation',
  'Security',
  'Downstream-copy behavior'
];

for (const row of requiredProduct) {
  const entry = byId.get(row.capability_id);
  if (!entry) {
    fail(`${row.capability_id} ${row.user_capability} has no CapabilitySpecification mapping`);
    continue;
  }
  const specPath = requireFile(entry.spec, `${row.capability_id} spec`);
  if (!specPath) continue;
  const specText = readFileSync(specPath, 'utf8');
  if (!/Acceptance/i.test(specText)) fail(`${row.capability_id} spec lacks an Acceptance section`);
  if (authorize && entry.meaning_status !== 'MEANING_PASS') {
    fail(`${row.capability_id} is not domain-authorized (${entry.meaning_status ?? 'MISSING'})`);
  }
}

for (const row of firstSpine) {
  const entry = byId.get(row.capability_id);
  if (!entry) continue;
  const fieldPath = requireFile(entry.field_contract, `${row.capability_id} field contract`);
  if (!fieldPath) continue;
  const fieldText = readFileSync(fieldPath, 'utf8');
  if (!/STANDARD §C AUTHORITY/i.test(fieldText)) {
    fail(`${row.capability_id} field contract lacks STANDARD §C AUTHORITY marker: ${entry.field_contract}`);
  }
  for (const term of requiredHeaderTerms) {
    if (!fieldText.includes(term)) fail(`${row.capability_id} field contract lacks required table column '${term}'`);
  }
  if (!/Closed enum/i.test(fieldText)) {
    fail(`${row.capability_id} field contract does not explicitly declare closed-enum semantics`);
  }
}

const numberingEntry = byId.get('CAP-011');
if (!numberingEntry) {
  fail('CAP-011 numbering capability missing from manifest');
} else {
  const numberingPath = requireFile(numberingEntry.spec, 'numbering policy');
  if (numberingPath) {
    const numbering = readFileSync(numberingPath, 'utf8');
    for (const klass of ['MR', 'RFQ', 'ADDENDUM', 'COMPARISON', 'RECOMMENDATION', 'AWARD', 'LPO', 'PO', 'SUBCONTRACT', 'GRN']) {
      if (!new RegExp(`\\| ${klass} \\|`).test(numbering)) fail(`numbering policy lacks concrete ${klass} class row`);
    }
    for (const marker of ['GAP_ALLOWED', 'CONTINUOUS_REQUIRED', 'FOR UPDATE', 'INV-NUM-01', 'INV-NUM-08']) {
      if (!numbering.includes(marker)) fail(`numbering policy lacks required control marker '${marker}'`);
    }
  }
}

for (const id of byId.keys()) {
  if (!inventory.some((row) => row.capability_id === id)) fail(`manifest references unknown capability ${id}`);
}

for (const requiredId of ['CAP-034','CAP-035','CAP-036','CAP-037','CAP-038','CAP-039','CAP-042','CAP-054','CAP-058']) {
  if (!byId.has(requiredId)) fail(`audit-required manifest registration missing for ${requiredId}`);
}

if (!process.exitCode) {
  console.log(`CAPABILITY_CHECK_PASS mode=${authorize ? 'AUTHORIZE' : 'STRUCTURE'} capabilities=${inventory.length} first_spine=${firstSpine.length} required_product=${requiredProduct.length} manifest_ids=${byId.size}`);
}
