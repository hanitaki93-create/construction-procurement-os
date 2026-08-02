import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(
  await readFile(path.join(repositoryRoot, 'packages/database-core/package.json'), 'utf8'),
);
const publicSource = await readFile(
  path.join(repositoryRoot, 'packages/database-core/src/public.ts'),
  'utf8',
);

const errors = [];
const exportsMap = packageJson.exports ?? {};
const forbiddenExport =
  /export\s+(?:type\s+)?(?:\{[^}]*\b(?:Pool|PoolClient|Client|Kysely|PrivateTransaction)\b|(?:class|interface|const|function|type)\s+(?:Pool|PoolClient|Client|Kysely|PrivateTransaction)\b)/u;
const unrestrictedQuery = /(?:readonly\s+)?query\s*\(/u;

if (Object.keys(exportsMap).join(',') !== '.') {
  errors.push('database-core must expose exactly one public package entry point');
}
if (exportsMap['.']?.default !== './dist/public.js') {
  errors.push('database-core default export must resolve to dist/public.js');
}
if (exportsMap['.']?.types !== './dist/public.d.ts') {
  errors.push('database-core type export must resolve to dist/public.d.ts');
}
if (forbiddenExport.test(publicSource)) {
  errors.push('database-core public source exports a raw client, pool, Kysely root, or private transaction');
}
if (unrestrictedQuery.test(publicSource)) {
  errors.push('database-core public runtime exposes an unrestricted query method');
}

if (errors.length > 0) {
  console.error('DATABASE_PUBLIC_SURFACE_CHECK_FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.info('DATABASE_PUBLIC_SURFACE_CHECK_PASS');
}
