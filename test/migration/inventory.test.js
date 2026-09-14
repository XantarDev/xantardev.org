import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { parseWxrInventory } from '../../scripts/migration/inventory.js';

const baseline = {
  schemaVersion: 1,
  posts: ['/first-post/'],
  pages: ['/about/'],
};

function wxr(items) {
  return `<?xml version="1.0"?><rss xmlns:wp="http://wordpress.org/export/1.2/" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>${items.join('')}</channel></rss>`;
}

function item({ id, type, status, slug, title = 'Synthetic title', date = '2025-02-03 04:05:06', link }) {
  return `<item><title>${title}</title><link>${link ?? `https://example.test/${slug}/`}</link><wp:post_id>${id}</wp:post_id><wp:post_type>${type}</wp:post_type><wp:status>${status}</wp:status><wp:post_name>${slug}</wp:post_name><wp:post_date>${date}</wp:post_date></item>`;
}

const publicItems = [
  item({ id: '10', type: 'post', status: 'publish', slug: 'first-post', title: 'First post' }),
  item({ id: '11', type: 'page', status: 'publish', slug: 'about', title: 'About' }),
];

test('extracts only approved published post/page records from synthetic WXR', () => {
  const result = parseWxrInventory(wxr([
    ...publicItems,
    item({ id: '12', type: 'post', status: 'draft', slug: 'not-public' }),
    item({ id: '13', type: 'attachment', status: 'inherit', slug: 'file' }),
  ]), baseline);

  assert.deepEqual(result.records, [
    { sourceId: '10', type: 'post', title: 'First post', slug: 'first-post', date: '2025-02-03 04:05:06', link: 'https://example.test/first-post/', path: '/first-post/', status: 'publish', route: '/first-post/' },
    { sourceId: '11', type: 'page', title: 'About', slug: 'about', date: '2025-02-03 04:05:06', link: 'https://example.test/about/', path: '/about/', status: 'publish', route: '/about/' },
  ]);
  assert.deepEqual(result.excluded, [
    { sourceId: '12', type: 'post', status: 'draft', reason: 'non-public-status' },
    { sourceId: '13', type: 'attachment', status: 'inherit', reason: 'unsupported-type' },
  ]);
});

test('rejects duplicate IDs, colliding routes, public records without slugs, and baseline mismatches', () => {
  assert.throws(() => parseWxrInventory(wxr([...publicItems, item({ id: '10', type: 'post', status: 'publish', slug: 'other' })]), baseline), /duplicate source ID: 10/);
  assert.throws(() => parseWxrInventory(wxr([...publicItems, item({ id: '12', type: 'post', status: 'publish', slug: 'ABOUT' })]), baseline), /duplicate route: \/ABOUT\//);
  assert.throws(() => parseWxrInventory(wxr([item({ id: '10', type: 'post', status: 'publish', slug: '' }), publicItems[1]]), baseline), /missing slug for public source ID: 10/);
  assert.throws(() => parseWxrInventory(wxr(publicItems), { ...baseline, posts: ['/missing/'] }), /baseline mismatch/);
  assert.throws(() => parseWxrInventory('<rss><channel><item></channel></rss>', baseline), /invalid WXR input/);
});

test('inventory command accepts synthetic input and baseline paths', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'xantardev-inventory-'));
  try {
    const input = join(directory, 'synthetic.xml');
    const routes = join(directory, 'routes.json');
    writeFileSync(input, wxr(publicItems));
    writeFileSync(routes, JSON.stringify(baseline));
    const { runInventory } = await import('../../scripts/migration/inventory.js');
    assert.deepEqual(runInventory(['--input', input, '--baseline', routes]).records.map(({ route }) => route), ['/first-post/', '/about/']);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
