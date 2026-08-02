import { readFile } from 'node:fs/promises';
import process from 'node:process';

const reportPath = process.argv[2] || 'artifacts/playwright/results.json';

function compactError(error) {
  if (!error) return undefined;
  const message = typeof error === 'string' ? error : error.message || error.stack;
  return typeof message === 'string' ? message.slice(0, 4_000) : undefined;
}

function collectFailures(suites, ancestry = [], failures = []) {
  for (const suite of suites || []) {
    const nextAncestry = suite.title ? [...ancestry, suite.title] : ancestry;
    collectFailures(suite.suites, nextAncestry, failures);

    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const failedResults = (test.results || []).filter((result) =>
          ['failed', 'timedOut', 'interrupted'].includes(result.status),
        );
        if (failedResults.length === 0) continue;

        failures.push({
          project: test.projectName || 'unknown',
          title: [...nextAncestry, spec.title].filter(Boolean).join(' > '),
          file: spec.file,
          line: spec.line,
          failures: failedResults.map((result) => ({
            status: result.status,
            retry: result.retry,
            duration: result.duration,
            errors: (result.errors || []).map(compactError).filter(Boolean),
          })),
        });
      }
    }
  }
  return failures;
}

try {
  const report = JSON.parse(await readFile(reportPath, 'utf8'));
  const failures = collectFailures(report.suites);
  if (failures.length === 0) {
    process.stdout.write('CPOS_PLAYWRIGHT_DIAGNOSTIC_PASS\n');
  } else {
    process.stderr.write('CPOS_PLAYWRIGHT_DIAGNOSTIC_FAIL\n');
    for (const failure of failures) {
      process.stderr.write(`${JSON.stringify(failure)}\n`);
    }
  }
} catch (error) {
  process.stderr.write(
    `${JSON.stringify({
      marker: 'CPOS_PLAYWRIGHT_DIAGNOSTIC_UNAVAILABLE',
      reportPath,
      error: error instanceof Error ? error.message : String(error),
    })}\n`,
  );
}
