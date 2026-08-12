import { spawn } from 'node:child_process';
import { connect } from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const composeFile = path.join(repositoryRoot, 'infra', 'local', 'compose.yml');
const composeBase = ['compose', '--project-name', 'cpos-b01', '--file', composeFile];

function run(command, arguments_, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, arguments_, {
      cwd: repositoryRoot,
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
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${command} ${arguments_.join(' ')} exited ${code}: ${stderr}`));
    });
  });
}

async function compose(arguments_, options) {
  return await run('docker', [...composeBase, ...arguments_], options);
}

async function httpReachable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
    await response.body?.cancel();
    return true;
  } catch {
    return false;
  }
}

async function clamdReady() {
  return await new Promise((resolve) => {
    const socket = connect({ host: '127.0.0.1', port: 3310 });
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, 2_000);
    socket.once('connect', () => socket.write('zPING\0'));
    socket.once('data', (chunk) => {
      clearTimeout(timer);
      const ready = chunk.toString('utf8').includes('PONG');
      socket.destroy();
      resolve(ready);
    });
    socket.once('error', () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
}

async function postgresReady() {
  try {
    await compose(['exec', '-T', 'postgres', 'pg_isready', '-U', 'cpos', '-d', 'cpos'], {
      capture: true,
    });
    return true;
  } catch {
    return false;
  }
}

async function waitForInfrastructure() {
  for (let attempt = 1; attempt <= 180; attempt += 1) {
    const checks = await Promise.all([
      postgresReady(),
      httpReachable('http://127.0.0.1:8333'),
      clamdReady(),
      httpReachable('http://127.0.0.1:13133'),
    ]);
    if (checks.every(Boolean)) {
      process.stdout.write('CPOS_LOCAL_INFRA_READY\n');
      return;
    }
    if (attempt % 10 === 0) {
      process.stdout.write(
        `Waiting for local infrastructure (${attempt}/180): postgres=${checks[0]} s3=${checks[1]} clamav=${checks[2]} otel=${checks[3]}\n`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }
  throw new Error('local infrastructure did not become ready within six minutes');
}

const action = process.argv[2];

switch (action) {
  case 'up':
    await compose(['up', '--detach']);
    await waitForInfrastructure();
    break;
  case 'wait':
    await waitForInfrastructure();
    break;
  case 'status':
    await compose(['ps']);
    break;
  case 'down':
    await compose(['down', '--remove-orphans']);
    break;
  case 'destroy':
    if (process.env['CPOS_CONFIRM_DESTROY'] !== 'YES') {
      throw new Error('set CPOS_CONFIRM_DESTROY=YES to remove only the cpos-b01 local volumes');
    }
    await compose(['down', '--volumes', '--remove-orphans']);
    break;
  default:
    throw new Error('usage: node scripts/local-infra.mjs <up|wait|status|down|destroy>');
}
