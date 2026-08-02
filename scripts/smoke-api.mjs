import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import process from 'node:process';

const port = 31_101;
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['apps/api/dist/main.js'], {
  env: {
    ...process.env,
    APP_ENV: 'test',
    BUILD_ID: 'smoke-build',
    HOST: '127.0.0.1',
    LOG_LEVEL: 'error',
    PORT: String(port),
    RELEASE_ID: 'smoke-release',
    SOURCE_COMMIT: 'smoke-commit',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForApi() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`API exited before readiness: ${child.exitCode}`);
    try {
      const response = await fetch(`${origin}/health/live`);
      if (response.ok) return;
    } catch {
      // The process is still starting.
    }
    await delay(100);
  }
  throw new Error('API did not become live within the smoke-test deadline');
}

async function verify() {
  await waitForApi();
  const [live, ready, build, openApi] = await Promise.all([
    fetch(`${origin}/health/live`),
    fetch(`${origin}/health/ready`),
    fetch(`${origin}/meta/build`),
    fetch(`${origin}/openapi.json`),
  ]);

  for (const response of [live, ready, build, openApi]) {
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }

  assert.equal((await live.json()).status, 'ok');
  assert.equal((await ready.json()).status, 'ok');
  assert.equal((await build.json()).buildId, 'smoke-build');
  assert.equal((await openApi.json()).openapi, '3.1.0');
}

try {
  await verify();
  console.info('API_SMOKE_PASS');
} finally {
  if (child.exitCode === null) child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    delay(5_000).then(() => {
      if (child.exitCode === null) child.kill('SIGKILL');
    }),
  ]);
}
