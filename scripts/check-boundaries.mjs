import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { checkRepositoryBoundaries } from './lib/boundary-checker.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const violations = await checkRepositoryBoundaries(repositoryRoot);

if (violations.length > 0) {
  console.error('ARCHITECTURE_BOUNDARY_CHECK_FAIL');
  for (const violation of violations) {
    console.error(`- ${violation.file} -> ${violation.specifier}: ${violation.message}`);
  }
  process.exitCode = 1;
} else {
  console.info('ARCHITECTURE_BOUNDARY_CHECK_PASS');
}
