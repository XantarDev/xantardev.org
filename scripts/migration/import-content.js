import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { normalizeContent } from './normalize-content.js';

const SITE = 'https://xantardev.org';
const PUBLIC_TYPES = new Set(['post', 'page']);

function list(value) {
  return value == null ? [] : Array.isArray(value) ? value : [value];
}

function text(value) {
  return value == null ? '' : String(value).trim();
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function yamlList(values) {
  return `[${values.map(yamlString).join(', ')}]`;
}

function parseArgs(args) {
  const options = { out: '.', only: '' };
  for (let index = 0; index < args.length; index += 2) {
    const name = args[index];
    const value = args[index + 1];
    if (!value || !['--input', '--baseline', '--out', '--only'].includes(name)) {
      throw new Error('usage: migration:import --input <path> --baseline <path> [--out <dir>] [--only <route>]');
    }
    options[name.slice(2)] = value;
  }
  if (!options.input || !options.baseline) throw new Error('usage: migration:import --input <path> --baseline <path> [--out <dir>] [--only <route>]');
  return options;
}

function parseChannel(xml) {
  if (typeof xml !== 'string' || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('invalid WXR input');
  const validation = XMLValidator.validate(xml);
  if (validation !== true) throw new Error('invalid WXR input');
  const document = new XMLParser({ ignoreAttributes: false, parseTagValue: false }).parse(xml);
  if (!document.rss?.channel || !document.rss['@_xmlns:wp']) throw new Error('invalid WXR input');
  return document.rss.channel;
}

function baselineRoutes(baseline) {
  return new Set([...baseline.posts, ...baseline.pages]);
}

function routeFor(slug) {
  return `/${slug}/`;
}

function taxonomies(item, domain) {
  return list(item.category)
    .filter((category) => category?.['@_domain'] === domain)
    .map((category) => text(category['@_nicename'] || category['#text']))
    .filter(Boolean);
}

function jekyllRelativeUrls(html) {
  const attributeUrl = /\b(href|src|poster|action|formaction|data)="(\/[^"]*)"/g;
  const srcset = /\bsrcset="([^"]*)"/g;
  return html
    .replace(attributeUrl, (_, name, path) => `${name}="{{ '${path}' | relative_url }}"`)
    .replace(srcset, (_, value) => {
      const candidates = value.split(',').map((candidate) => candidate.trim()).filter(Boolean).map((candidate) => {
        const [, path, descriptor = ''] = candidate.match(/^(\/\S+)(?:\s+(.+))?$/) ?? [];
        return path ? `{{ '${path}' | relative_url }}${descriptor ? ` ${descriptor}` : ''}` : candidate;
      });
      return `srcset="${candidates.join(', ')}"`;
    });
}

function recordFromItem(item) {
  const type = text(item['wp:post_type']);
  const status = text(item['wp:status']);
  if (!PUBLIC_TYPES.has(type) || status !== 'publish') return null;
  const slug = text(item['wp:post_name']);
  if (!slug) throw new Error(`missing slug for public source ID: ${text(item['wp:post_id'])}`);
  const route = routeFor(slug);
  return {
    sourceId: text(item['wp:post_id']),
    type,
    title: text(item.title),
    slug,
    route,
    date: text(item['wp:post_date']),
    author: text(item['dc:creator']) || 'xantardev',
    categories: taxonomies(item, 'category'),
    tags: taxonomies(item, 'post_tag'),
    excerpt: text(item['excerpt:encoded'] || item.description),
    content: jekyllRelativeUrls(normalizeContent(text(item['content:encoded']))),
  };
}

function frontMatter(record) {
  return [
    '---',
    `layout: ${record.type === 'post' ? 'post' : 'page'}`,
    `title: ${yamlString(record.title)}`,
    `date: ${yamlString(record.date)}`,
    `permalink: ${yamlString(record.route)}`,
    `source_id: ${yamlString(record.sourceId)}`,
    `author: ${yamlString(record.author)}`,
    `categories: ${yamlList(record.categories)}`,
    `tags: ${yamlList(record.tags)}`,
    record.excerpt ? `excerpt: ${yamlString(record.excerpt)}` : 'excerpt: ""',
    '---',
    '',
  ].join('\n');
}

function outputPath(record, root) {
  if (record.type === 'post') return join(root, '_posts', `${record.date.slice(0, 10)}-${record.slug}.md`);
  return join(root, `${record.slug}.md`);
}

export function importContent({ xml, baseline, out = '.', only = '' }) {
  const approved = baselineRoutes(baseline);
  const records = list(parseChannel(xml).item).map(recordFromItem).filter(Boolean)
    .filter((record) => !only || record.route === only);
  const unexpected = records.find((record) => !approved.has(record.route));
  if (unexpected) throw new Error(`route not approved: ${unexpected.route}`);
  if (only && records.length !== 1) throw new Error(`selected route not found: ${only}`);
  if (!only && records.length !== approved.size) throw new Error('baseline mismatch');

  const written = [];
  for (const record of records) {
    const path = outputPath(record, out);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${frontMatter(record)}${record.content}\n`);
    written.push({ route: record.route, path, sourceId: record.sourceId, title: record.title });
  }
  return { schemaVersion: 1, written };
}

export function runImport(args) {
  const options = parseArgs(args);
  return importContent({
    xml: readFileSync(options.input, 'utf8'),
    baseline: JSON.parse(readFileSync(options.baseline, 'utf8')),
    out: options.out,
    only: options.only,
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(runImport(process.argv.slice(2)), null, 2)); } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
