import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']);
const ignoredDirectories = new Set(['node_modules', 'dist', 'coverage', '.vite']);
const importPattern =
  /(?:import|export)\s+(?:[^'"`]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/gu;

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

    if (entry.isDirectory()) files.push(...(await walk(absolute));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(absolute);
  }

  return files;
}

function packageRootFor(repositoryRoot, file) {
  const relative = path.relative(repositoryRoot, file);
  const [top, name] = relative.split(path.sep);
  return top && name && ['apps', 'packages'].includes(top)
    ? path.join(repositoryRoot, top, name)
    : null;
}

function classify(repositoryRoot, file) {
  const relative = path.relative(repositoryRoot, file).split(path.sep).join('/');

  return {
    relative,
    isBrowser:
      relative.startsWith('apps/web-internal/') ||
      relative.startsWith('apps/web-external/') ||
      relative.startsWith('packages/ui-foundation/'),
    isDatabaseCore: relative.startsWith('packages/database-core/'),
    isExternalWeb: relative.startsWith('apps/web-external/'),
    isPrivateTestGraph:
      relative.includes('/integration/') ||
      relative.includes('/tests/') ||
      /\.(?:test|spec)\.[cm]?[jt]sx?$/u.test(relative),
    isTestkit: relative.startsWith('packages/testkit/'),
  };
}

function relativeImportDisposition(repositoryRoot, file, specifier) {
  if (!specifier.startsWith('.')) {
    return { escapesPackage: false, staysInsidePackage: false };
  }
  const ownerRoot = packageRootFor(repositoryRoot, file);
  if (!ownerRoot) return { escapesPackage: false, staysInsidePackage: false };
  const resolved = path.resolve(path.dirname(file), specifier);
  const relativeToOwner = path.relative(ownerRoot, resolved);
  const escapesPackage = relativeToOwner.startsWith('..') || path.isAbsolute(relativeToOwner);
  return { escapesPackage, staysInsidePackage: !escapesPackage };
}

export function inspectSpecifier({ repositoryRoot, file, specifier }) {
  const kind = classify(repositoryRoot, file);
  const relativeDisposition = relativeImportDisposition(repositoryRoot, file, specifier);
  const violations = [];
  const report = (message) => violations.push({ file: kind.relative, specifier, message });
  const sourceInternalImport = specifier.includes('/src/') || specifier.endsWith('/src');
  const allowedPrivateTestImport =
    kind.isPrivateTestGraph && specifier.startsWith('.') && relativeDisposition.staysInsidePackage;

  if (sourceInternalImport && !allowedPrivateTestImport) {
    report('packages must consume declared public exports, never source internals');
  }

  if (specifier.startsWith('packages/') || specifier.startsWith('apps/')) {
    report('repository-root source imports are prohibited');
  }

  if (relativeDisposition.escapesPackage) {
    report('cross-package relative imports are prohibited');
  }

  if (
    kind.isBrowser &&
    (specifier === 'pg' ||
      specifier.startsWith('pg/') ||
      specifier === 'kysely' ||
      specifier.startsWith('@cpos/database-core') ||
      specifier.startsWith('@cpos/object-store/server'))
  ) {
    report('browser code cannot import database or server object-store capabilities');
  }

  if (
    !kind.isDatabaseCore &&
    !kind.isTestkit &&
    (specifier === 'pg' || specifier.startsWith('pg/') || specifier === 'kysely')
  ) {
    report('raw database libraries are private to database-core/testkit');
  }

  if (
    kind.isExternalWeb &&
    (specifier.startsWith('@cpos/web-internal') ||
      specifier.includes('apps/web-internal') ||
      specifier.includes('web-internal/src'))
  ) {
    report('external web cannot import internal application code');
  }

  return violations;
}

export async function checkRepositoryBoundaries(repositoryRoot) {
  const roots = ['apps', 'packages'].map((entry) => path.join(repositoryRoot, entry));
  const violations = [];

  for (const root of roots) {
    if (!(await exists(root))) continue;

    for (const file of await walk(root)) {
      const source = await readFile(file, 'utf8');
      for (const match of source.matchAll(importPattern)) {
        const specifier = match[1] ?? match[2];
        if (specifier) {
          violations.push(...inspectSpecifier({ repositoryRoot, file, specifier }));
        }
      }
    }
  }

  return violations;
}
