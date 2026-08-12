import path from 'node:path';
import process from 'node:process';

import { createDatabaseRuntime } from './public.js';

const command = process.argv[2];
if (!['health', 'migrate', 'status', 'scan'].includes(command ?? '')) {
  console.error('usage: database-core <health|migrate|status|scan>');
  process.exitCode = 2;
} else {
  const connectionString = process.env['DATABASE_URL'];
  if (!connectionString) throw new Error('DATABASE_URL is required');
  const runtime = createDatabaseRuntime({
    connectionString,
    maximumConnections: 5,
    idleTimeoutMs: 1_000,
    connectionTimeoutMs: 5_000,
    statementTimeoutMs: 15_000,
    applicationName: 'cpos-b01-database-cli',
  });

  try {
    const directory = path.resolve(process.env['MIGRATIONS_DIR'] ?? 'migrations/sql');
    if (command === 'health') console.info(JSON.stringify(await runtime.health(), null, 2));
    if (command === 'status') {
      console.info(JSON.stringify(await runtime.migrationStatus({ directory }), null, 2));
    }
    if (command === 'migrate') {
      console.info(
        JSON.stringify(
          await runtime.migrate({
            directory,
            buildId: process.env['BUILD_ID'] ?? 'local-development',
          }),
          null,
          2,
        ),
      );
    }
    if (command === 'scan') {
      const findings = await runtime.scanCatalog();
      console.info(JSON.stringify(findings, null, 2));
      if (findings.length > 0) process.exitCode = 1;
    }
  } finally {
    await runtime.close();
  }
}
