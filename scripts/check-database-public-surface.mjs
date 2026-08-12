import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { inspectDatabasePublicSurface } from './lib/database-public-surface.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = await inspectDatabasePublicSurface({ repositoryRoot });

if (errors.length > 0) {
  console.error('DATABASE_PUBLIC_SURFACE_CHECK_FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.info('DATABASE_PUBLIC_SURFACE_CHECK_PASS');
}
