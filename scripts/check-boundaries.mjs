import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scanRoots = ['apps', 'packages']
  .map((entry) => path.join(repositoryRoot, entry))
  .filter(async () => true);
const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']);
const ignoredDirectories = new Set(['node_modules', 'dist', 'coverage', '.vite']);
const importPattern =
  /(?:import|export)\s+(?:[^'"`]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/gu;

const errors = [];

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

function packageRootFor(file) {
  const relative = path.relative(repositoryRoot, file);
  const [top, name] = relative.split(path.sep);
  return top && name && ['apps', 'packages'].includes(top)
    ? path.join(repositoryRoot, top, name)
    : null;
}

function classify(file) {
  const relative = path.relative(repositoryRoot, file).split(path.sep).join('/');
  return {
    relative,
    isBrowser:
      relative.startsWith('apps/web-internal/') ||
      relative.startsWith('apps/web-external/') ||
      relative.startsWith('packages/ui-foundation/'),
    isExternalWeb: relative.startsWith('apps/web-external/'),
    isDatabaseCore: relative.startsWith('packages/database-core/'),
    isTestkit: relative.startsWith('packages/testkit/'),
  };
}

function addError(file, specifier, message) {
  errors.push(`${path.relative(repositoryRoot, file)} -> ${specifier}: ${message}`);
}

function inspectSpecifier(file, specifier) {
  const kind = classify(file);

  if (specifier.includes('/src/') || specifier.endsWith('/src')) {
    addError(
      file,
      specifier,
      'packages must consume declared public exports, never source internals',
    );
  }

  if (specifier.startsWith('packages/') || specifier.startsWith('apps/')) {
    addError(file, specifier, 'repository-root source imports are prohibited');
  }

  if (specifier.startsWith('.')) {
    const ownerRoot = packageRootFor(file);
    if (ownerRoot) {
      const resolved = path.resolve(path.dirname(file), specifier);
      const relativeToOwner = path.relative(ownerRoot, resolved);
      if (relativeToOwner.startsWith('..') || path.isAbsolute(relativeToOwner)) {
        addError(file, specifier, 'cross-package relative imports are prohibited');
      }
    }
  }

  if (
    kind.isBrowser &&
    (specifier === 'pg' ||
      specifier.startsWith('pg/') ||
      specifier === 'kysely' ||
      specifier.startsWith('@cpos/database-core') ||
      specifier.startsWith('@cpos/object-store/server'))
  ) {
    addError(
      file,
      specifier,
      'browser code cannot import database or server object-store capabilities',
    );
  }

  if (
    !kind.isDatabaseCore &&
    !kind.isTestkit &&
    (specifier === 'pg' || specifier.startsWith('pg/') || specifier === 'kysely')
  ) {
    addError(file, specifier, 'raw database libraries are private to database-core/testkit');
  }

  if (
    kind.isExternalWeb &&
    (specifier.startsWith('@cpos/web-internal') ||
      specifier.includes('apps/web-internal') ||
      specifier.includes('web-internal/src'))
  ) {
    addError(file, specifier, 'external web cannot import internal application code');
  }
}

const roots = [];
for (const root of scanRoots) {
  if (await exists(root)) roots.push(root);
}

for (const root of roots) {
  for (const file of await walk(root)) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] ?? match[2];
      if (specifier) inspectSpecifier(file, specifier);
    }
  }
}

if (errors.length > 0) {
  console.error('ARCHITECTURE_BOUNDARY_CHECK_FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.info('ARCHITECTURE_BOUNDARY_CHECK_PASS');
}
