import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const UPLOAD = /(?:https?:\/\/xantardev\.org)?(\/wp-content\/uploads\/[A-Za-z0-9._~!$&'()*+,;=:@/%-]+)/g;

function parseArgs(args) {
  const out = { root: '.', files: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root') out.root = args[++i];
    else out.files.push(args[i]);
  }
  if (!out.files.length) throw new Error('usage: migration:assets --root <dir> <content-file>...');
  return out;
}

export function discoverUploadPaths(contents) {
  const paths = new Set();
  for (const content of contents) {
    for (const match of content.matchAll(UPLOAD)) {
      const path = decodeURI(match[1]);
      if (!path.startsWith('/wp-content/uploads/') || path.includes('..')) throw new Error(`unsafe asset path: ${path}`);
      paths.add(path);
    }
  }
  return [...paths].sort();
}

export async function fetchAssets({ root, files }) {
  const paths = discoverUploadPaths(files.map((path) => readFileSync(path, 'utf8')));
  const results = [];
  for (const path of paths) {
    const url = `https://xantardev.org${path}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`failed asset ${url}: ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (type.includes('text/html')) throw new Error(`asset returned HTML: ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length) throw new Error(`empty asset: ${url}`);
    const destination = join(root, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, bytes);
    results.push({ path, bytes: bytes.length, contentType: type });
  }
  return { schemaVersion: 1, results };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await fetchAssets(parseArgs(process.argv.slice(2))), null, 2)); } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
