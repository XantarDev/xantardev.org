import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const PUBLIC_TYPES = new Set(['post', 'page']);

function text(value) {
  return value == null ? '' : String(value).trim();
}

function list(value) {
  return value == null ? [] : Array.isArray(value) ? value : [value];
}

function routeFor(slug, sourceId) {
  if (!slug) throw new Error(`missing slug for public source ID: ${sourceId}`);
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
    throw new Error(`invalid slug for public source ID: ${sourceId}`);
  }
  return `/${slug}/`;
}

function pathFor(link, route) {
  if (!link) return route;
  try { return new URL(link, 'https://inventory.invalid').pathname; } catch {
    throw new Error('invalid public record link');
  }
}

function validateBaseline(baseline) {
  if (!baseline || baseline.schemaVersion !== 1 || !Array.isArray(baseline.posts) || !Array.isArray(baseline.pages)) {
    throw new Error('invalid baseline');
  }
  const expected = new Map();
  for (const [type, routes] of [['post', baseline.posts], ['page', baseline.pages]]) {
    for (const route of routes) {
      if (typeof route !== 'string' || !/^\/[a-z0-9][a-z0-9-]*\/$/i.test(route)) throw new Error('invalid baseline');
      const key = route.toLowerCase();
      if (expected.has(key)) throw new Error('invalid baseline');
      expected.set(key, type);
    }
  }
  return expected;
}

function parseDocument(xml) {
  if (typeof xml !== 'string' || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('invalid WXR input');
  const validation = XMLValidator.validate(xml);
  if (validation !== true) throw new Error('invalid WXR input');
  const document = new XMLParser({ ignoreAttributes: false, parseTagValue: false }).parse(xml);
  if (!document.rss?.channel || !document.rss['@_xmlns:wp']) throw new Error('invalid WXR input');
  return document.rss.channel;
}

export function parseWxrInventory(xml, baseline) {
  const expected = validateBaseline(baseline);
  const channel = parseDocument(xml);
  const sourceIds = new Set();
  const routes = new Set();
  const records = [];
  const excluded = [];

  for (const item of list(channel.item)) {
    const sourceId = text(item['wp:post_id']);
    if (!sourceId) throw new Error('missing source ID');
    if (sourceIds.has(sourceId)) throw new Error(`duplicate source ID: ${sourceId}`);
    sourceIds.add(sourceId);

    const type = text(item['wp:post_type']);
    const status = text(item['wp:status']);
    if (!PUBLIC_TYPES.has(type)) {
      excluded.push({ sourceId, type, status, reason: 'unsupported-type' });
      continue;
    }
    if (status !== 'publish') {
      excluded.push({ sourceId, type, status, reason: 'non-public-status' });
      continue;
    }

    const slug = text(item['wp:post_name']);
    const route = routeFor(slug, sourceId);
    const key = route.toLowerCase();
    if (routes.has(key)) throw new Error(`duplicate route: ${route}`);
    routes.add(key);
    records.push({
      sourceId,
      type,
      title: text(item.title),
      slug,
      date: text(item['wp:post_date']),
      link: text(item.link),
      path: pathFor(text(item.link), route),
      status,
      route,
    });
  }

  records.sort((left, right) => left.sourceId.localeCompare(right.sourceId, undefined, { numeric: true }));
  if (records.length !== expected.size || records.some(({ route, type }) => expected.get(route.toLowerCase()) !== type)) {
    throw new Error('baseline mismatch');
  }
  return { schemaVersion: 1, records, excluded };
}

function readArguments(args) {
  if (args.length !== 4 || args[0] !== '--input' || args[2] !== '--baseline') {
    throw new Error('usage: migration:inventory --input <path> --baseline <path>');
  }
  return { input: args[1], baseline: args[3] };
}

export function runInventory(args) {
  const { input, baseline } = readArguments(args);
  return parseWxrInventory(readFileSync(input, 'utf8'), JSON.parse(readFileSync(baseline, 'utf8')));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(runInventory(process.argv.slice(2)), null, 2)); } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
