import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const requiredIgnoreRules = [
  '/ltxantardevgt.WordPress.2026-09-14.xml',
  '/*.WordPress.*.xml',
  '*.wxr',
  'node_modules/',
  '/migration/private/',
  '/migration/fingerprints/',
  '/migration/audit/',
  '/migration/staging/',
  '/migration/cache/',
  '/migration/logs/',
];

const privateMigrationPath = /^migration\/(?:private|fingerprints|audit|staging|cache|logs)(?:\/|$)/i;
const wxrFile = /(?:^|\/)(?:[^/]*wordpress[^/]*\.xml|[^/]+\.wxr)$/i;
const acquisitionLog = /(?:^|\/)acquisition(?:[-.]local)?\.log$/i;

export function prohibitedReason(path) {
  const normalized = path.replaceAll('\\', '/');
  if (wxrFile.test(normalized)) return 'raw-wxr';
  if (acquisitionLog.test(normalized)) return 'acquisition-log';
  if (privateMigrationPath.test(normalized)) return 'private-migration-path';
  return null;
}

export function findProhibitedFiles(root) {
  if (!existsSync(root)) return [];
  const findings = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory)) {
      const fullPath = join(directory, entry);
      if (statSync(fullPath).isDirectory()) walk(fullPath);
      else {
        const path = relative(root, fullPath).replaceAll('\\', '/');
        const reason = prohibitedReason(path);
        if (reason) findings.push({ path, reason });
      }
    }
  };
  walk(root);
  return findings;
}

export function assertPublicTree(root, label) {
  const findings = findProhibitedFiles(root);
  if (findings.length) {
    throw new Error(`${label} contains prohibited files: ${findings.map(({ path, reason }) => `${path} (${reason})`).join(', ')}`);
  }
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

if (process.argv[1]?.endsWith('privacy-isolation.js')) {
  const source = option('--source');
  const site = option('--site');
  if (!source && !site) throw new Error('Pass --source and/or --site to verify public trees.');
  if (source) assertPublicTree(source, 'public source');
  if (site) assertPublicTree(site, 'generated output');
  console.log('Privacy isolation checks passed.');
}
