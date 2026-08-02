import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const packageJsonUrl = new URL('package.json', root);
const workspaceUrl = new URL('pnpm-workspace.yaml', root);
const nodeVersionUrl = new URL('.node-version', root);

const packageJson = JSON.parse(await readFile(packageJsonUrl, 'utf8'));
const workspaceText = await readFile(workspaceUrl, 'utf8');
const nodeVersion = (await readFile(nodeVersionUrl, 'utf8')).trim();

const errors = [];
const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function checkDependencyBlock(blockName) {
  const block = packageJson[blockName] ?? {};
  for (const [name, version] of Object.entries(block)) {
    assert(
      typeof version === 'string' && exactVersionPattern.test(version),
      `${blockName}.${name} must use an exact version; received ${String(version)}`,
    );
  }
}

assert(packageJson.private === true, 'root package must remain private');
assert(packageJson.type === 'module', 'root package must use ESM');
assert(
  packageJson.packageManager === 'pnpm@10.34.0',
  `packageManager must be pnpm@10.34.0; received ${String(packageJson.packageManager)}`,
);
assert(
  packageJson.engines?.node === '24.18.0',
  `engines.node must be 24.18.0; received ${String(packageJson.engines?.node)}`,
);
assert(
  packageJson.engines?.pnpm === '10.34.0',
  `engines.pnpm must be 10.34.0; received ${String(packageJson.engines?.pnpm)}`,
);
assert(nodeVersion === '24.18.0', `.node-version must be 24.18.0; received ${nodeVersion}`);

checkDependencyBlock('dependencies');
checkDependencyBlock('devDependencies');
checkDependencyBlock('optionalDependencies');

assert(workspaceText.includes('minimumReleaseAge: 1440'), 'workspace must enforce release age');
assert(workspaceText.includes('catalog:'), 'workspace must define a central dependency catalog');
assert(!workspaceText.includes('latest'), 'workspace must not use the latest tag');
assert(!workspaceText.match(/:\s*[~^*]/u), 'workspace catalog must not use version ranges');

for (const requiredScript of [
  'build',
  'format:check',
  'lint',
  'typecheck',
  'test',
  'architecture:check',
  'manifests:check',
  'verify',
]) {
  assert(typeof packageJson.scripts?.[requiredScript] === 'string', `missing script ${requiredScript}`);
}

if (errors.length > 0) {
  console.error('ROOT_MANIFEST_CHECK_FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.info('ROOT_MANIFEST_CHECK_PASS');
}
