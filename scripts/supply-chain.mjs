import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const repositoryRoot = process.cwd();
const artifactsDirectory = path.join(repositoryRoot, 'artifacts', 'sbom');
const images = [
  'cpos-b01-api:local',
  'cpos-b01-worker:local',
  'cpos-b01-web-internal:local',
  'cpos-b01-web-external:local',
];

function run(command, arguments_) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, arguments_, {
      cwd: repositoryRoot,
      stdio: 'inherit',
      env: process.env,
    });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${arguments_.join(' ')} exited ${code}`));
    });
  });
}

async function scanSecrets() {
  await run('docker', [
    'run',
    '--rm',
    '--volume',
    `${repositoryRoot}:/repo:ro`,
    'zricethezav/gitleaks:v8.30.1',
    'detect',
    '--source=/repo',
    '--no-git',
    '--redact',
    '--config=/repo/.gitleaks.toml',
    '--exit-code=1',
  ]);
  process.stdout.write('CPOS_SECRET_SCAN_PASS\n');
}

async function generateSbom() {
  await mkdir(artifactsDirectory, { recursive: true });
  await run('docker', [
    'run',
    '--rm',
    '--volume',
    `${repositoryRoot}:/src`,
    'anchore/syft:v1.44.0',
    'scan',
    'dir:/src',
    '--exclude',
    '/src/.git',
    '--exclude',
    '/src/node_modules',
    '--output',
    'cyclonedx-json=/src/artifacts/sbom/source.cdx.json',
  ]);
  for (const image of images) {
    const filename = image.replaceAll(':', '-').replaceAll('/', '-');
    await run('docker', [
      'run',
      '--rm',
      '--volume',
      '/var/run/docker.sock:/var/run/docker.sock',
      '--volume',
      `${repositoryRoot}:/src`,
      'anchore/syft:v1.44.0',
      'scan',
      `docker:${image}`,
      '--output',
      `cyclonedx-json=/src/artifacts/sbom/${filename}.cdx.json`,
    ]);
  }
  process.stdout.write('CPOS_SBOM_PASS\n');
}

async function scanContainers() {
  for (const image of images) {
    await run('docker', [
      'run',
      '--rm',
      '--volume',
      '/var/run/docker.sock:/var/run/docker.sock',
      'aquasec/trivy:0.70.0',
      'image',
      '--scanners',
      'vuln',
      '--severity',
      'HIGH,CRITICAL',
      '--ignore-unfixed',
      '--exit-code',
      '1',
      '--no-progress',
      image,
    ]);
  }
  process.stdout.write('CPOS_CONTAINER_SCAN_PASS\n');
}

switch (process.argv[2]) {
  case 'secrets':
    await scanSecrets();
    break;
  case 'sbom':
    await generateSbom();
    break;
  case 'containers':
    await scanContainers();
    break;
  default:
    throw new Error('usage: node scripts/supply-chain.mjs <secrets|sbom|containers>');
}
