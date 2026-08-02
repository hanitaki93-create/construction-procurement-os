import { spawn } from 'node:child_process';
import process from 'node:process';

const sourceCommit = process.env['SOURCE_COMMIT'] || 'local';
const buildId = process.env['BUILD_ID'] || 'b01-local';
const releaseId = process.env['RELEASE_ID'] || 'b01-unreleased';

const images = [
  { name: 'api', tag: 'cpos-b01-api:local', file: 'infra/containers/api.Dockerfile' },
  { name: 'worker', tag: 'cpos-b01-worker:local', file: 'infra/containers/worker.Dockerfile' },
  {
    name: 'web-internal',
    tag: 'cpos-b01-web-internal:local',
    file: 'infra/containers/web-internal.Dockerfile',
  },
  {
    name: 'web-external',
    tag: 'cpos-b01-web-external:local',
    file: 'infra/containers/web-external.Dockerfile',
  },
];

function run(command, arguments_, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, arguments_, {
      stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
      env: process.env,
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
      else reject(new Error(`${command} ${arguments_.join(' ')} exited ${code}: ${stderr}`));
    });
  });
}

async function buildImages() {
  for (const image of images) {
    await run('docker', [
      'build',
      '--file',
      image.file,
      '--tag',
      image.tag,
      '--build-arg',
      `BUILD_ID=${buildId}`,
      '--build-arg',
      `RELEASE_ID=${releaseId}`,
      '--build-arg',
      `SOURCE_COMMIT=${sourceCommit}`,
      '.',
    ]);
  }
  process.stdout.write('CPOS_CONTAINER_BUILD_PASS\n');
}

async function inspect(format, image) {
  const result = await run('docker', ['image', 'inspect', '--format', format, image], {
    capture: true,
  });
  return result.stdout;
}

async function waitFor(url, expectedState) {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) {
        const body = await response.json();
        if (body.state === expectedState) return body;
      }
    } catch {
      // Readiness is retried within the bounded loop.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`${url} did not reach ${expectedState}`);
}

async function assertNameAvailable(name) {
  const result = await run('docker', ['ps', '--all', '--quiet', '--filter', `name=^/${name}$`], {
    capture: true,
  });
  if (result.stdout) throw new Error(`refusing to replace existing container ${name}`);
}

async function smokeImages() {
  for (const image of images) {
    const user = await inspect('{{.Config.User}}', image.tag);
    if (user !== '10001:10001') throw new Error(`${image.name} image does not run as 10001:10001`);
    const revision = await inspect('{{index .Config.Labels "org.opencontainers.image.revision"}}', image.tag);
    if (revision !== sourceCommit) throw new Error(`${image.name} revision label mismatch`);
  }

  await run('docker', ['run', '--rm', 'cpos-b01-worker:local', 'node', 'dist/main.js', '--check']);

  const names = ['cpos-b01-api-smoke', 'cpos-b01-internal-smoke', 'cpos-b01-external-smoke'];
  for (const name of names) await assertNameAvailable(name);

  try {
    await run('docker', [
      'run',
      '--detach',
      '--name',
      names[0],
      '--label',
      'cpos.scope=b01-smoke',
      '--publish',
      '127.0.0.1:3101:3001',
      'cpos-b01-api:local',
    ]);
    await run('docker', [
      'run',
      '--detach',
      '--name',
      names[1],
      '--label',
      'cpos.scope=b01-smoke',
      '--publish',
      '127.0.0.1:3102:8080',
      'cpos-b01-web-internal:local',
    ]);
    await run('docker', [
      'run',
      '--detach',
      '--name',
      names[2],
      '--label',
      'cpos.scope=b01-smoke',
      '--publish',
      '127.0.0.1:3103:8080',
      'cpos-b01-web-external:local',
    ]);

    await waitFor('http://127.0.0.1:3101/health/live', 'alive');
    await waitFor('http://127.0.0.1:3102/health/live', 'alive');
    await waitFor('http://127.0.0.1:3103/health/live', 'alive');

    const buildResponse = await fetch('http://127.0.0.1:3101/meta/build');
    if (!buildResponse.ok) throw new Error('API build metadata endpoint failed in container');
    const build = await buildResponse.json();
    if (build.sourceCommit !== sourceCommit || build.buildId !== buildId) {
      throw new Error('API container build metadata does not match OCI labels');
    }

    const internalIndex = await fetch('http://127.0.0.1:3102/');
    const externalIndex = await fetch('http://127.0.0.1:3103/');
    if (!internalIndex.ok || !externalIndex.ok) throw new Error('web container index failed');
    if ((await internalIndex.text()) === (await externalIndex.text())) {
      throw new Error('internal and external web images unexpectedly contain identical index output');
    }
  } finally {
    for (const name of names) {
      await run('docker', ['rm', '--force', name], { capture: true }).catch(() => undefined);
    }
  }

  process.stdout.write('CPOS_CONTAINER_SMOKE_PASS\n');
}

const command = process.argv[2];
if (command === 'build') await buildImages();
else if (command === 'smoke') await smokeImages();
else throw new Error('usage: node scripts/containers.mjs <build|smoke>');
