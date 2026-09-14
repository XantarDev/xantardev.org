import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertPublicTree,
  findProhibitedFiles,
  requiredIgnoreRules,
} from '../scripts/verify/privacy-isolation.js';

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'xantardev-privacy-'));
  return {
    root,
    file(path, content = 'synthetic') {
      const destination = join(root, path);
      mkdirSync(join(destination, '..'), { recursive: true });
      writeFileSync(destination, content);
    },
    cleanup() { rmSync(root, { recursive: true, force: true }); },
  };
}

test('ignore rules isolate controlled migration inputs', () => {
  assert.deepEqual(requiredIgnoreRules, [
    '/ltxantardevgt.WordPress.2026-09-14.xml',
    '/*.WordPress.*.xml',
    '*.wxr',
    '/migration/private/',
    '/migration/fingerprints/',
    '/migration/audit/',
    '/migration/staging/',
    '/migration/cache/',
    '/migration/logs/',
  ]);
});

test('privacy scan rejects synthetic raw inputs and private paths', () => {
  const tree = fixture();
  try {
    tree.file('migration/public/routes.json', '{"entries":[]}');
    tree.file('synthetic.WordPress.2026-09-14.xml');
    tree.file('migration/private/fingerprint.txt');
    tree.file('migration/logs/acquisition.log');
    assert.deepEqual(findProhibitedFiles(tree.root).map(({ reason }) => reason).sort(), [
      'acquisition-log', 'private-migration-path', 'raw-wxr',
    ]);
    assert.throws(() => assertPublicTree(tree.root, 'public source'), /prohibited files/);
  } finally { tree.cleanup(); }
});

test('privacy scan permits a sanitized public manifest', () => {
  const tree = fixture();
  try {
    tree.file('migration/public/routes.json', '{"entries":[]}');
    assert.deepEqual(findProhibitedFiles(tree.root), []);
    assert.doesNotThrow(() => assertPublicTree(tree.root, 'generated output'));
  } finally { tree.cleanup(); }
});
