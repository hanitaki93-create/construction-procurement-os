import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const inventoryPath = resolve(root, '04_phases/phase_2_build_decomposition/product_rebaseline/R00_CAPABILITY_INVENTORY_V0_5.csv');
const manifestPath = resolve(root, '04_phases/phase_2_build_decomposition/product_rebaseline/R00_CAPABILITY_SPEC_MANIFEST_V0_5.json');
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

const inventory = parseCsv(readFileSync(inventoryPath, 'utf8'));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const byId = new Map();

for (const entry of manifest.capabilities ?? []) {
  for (const id of entry.ids ?? []) {
    if (byId.has(id)) fail(`duplicate manifest mapping for ${id}`);
    byId.set(id, entry);
  }
}

const firstSpine = inventory.filter((row) => /^R0[1-8](?:_|$)/.test(row.target_block));
for (const row of firstSpine) {
  const entry = byId.get(row.capability_id);
  if (!entry) {
    fail(`${row.capability_id} ${row.user_capability} has no CapabilitySpecification mapping`);
    continue;
  }
  if (!entry.spec) {
    fail(`${row.capability_id} has no spec path`);
    continue;
  }
  const specPath = resolve(root, entry.spec);
  if (!existsSync(specPath)) {
    fail(`${row.capability_id} spec does not exist: ${entry.spec}`);
    continue;
  }
  const specText = readFileSync(specPath, 'utf8');
  if (!/Acceptance/i.test(specText)) fail(`${row.capability_id} spec lacks an Acceptance section`);
  if (authorize && entry.meaning_status !== 'MEANING_PASS') {
    fail(`${row.capability_id} is not domain-authorized (${entry.meaning_status ?? 'MISSING'})`);
  }
}

for (const id of byId.keys()) {
  if (!inventory.some((row) => row.capability_id === id)) fail(`manifest references unknown capability ${id}`);
}

if (!process.exitCode) {
  console.log(`CAPABILITY_CHECK_PASS mode=${authorize ? 'AUTHORIZE' : 'STRUCTURE'} first_spine=${firstSpine.length}`);
}
