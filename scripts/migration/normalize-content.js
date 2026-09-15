import { parseFragment, serialize } from 'parse5';

const URL_ATTRIBUTES = new Set(['href', 'src', 'poster', 'action', 'formaction', 'data']);
const DROP_ATTRIBUTES = new Set(['srcdoc']);
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

function decodedSchemeProbe(value) {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => {
      const codePoint = Number.parseInt(hex, 16);
      return codePoint > 0x10ffff ? '' : String.fromCodePoint(codePoint);
    })
    .replace(/&#([0-9]+);?/g, (_, decimal) => {
      const codePoint = Number.parseInt(decimal, 10);
      return codePoint > 0x10ffff ? '' : String.fromCodePoint(codePoint);
    })
    .replace(/[\u0000-\u0020\ufffd]+/g, '')
    .trim();
}

function normalizeUrl(value, attribute) {
  const trimmed = value.trim();
  const schemeProbe = decodedSchemeProbe(trimmed);

  try {
    const url = new URL(schemeProbe, 'https://normalization.invalid');
    if (url.protocol !== 'https:' && url.origin === 'https://normalization.invalid' && schemeProbe.startsWith('#')) return value;
    if (url.protocol !== 'https:' && url.origin === 'https://normalization.invalid' && schemeProbe.startsWith('/')) return value;
    if (!SAFE_PROTOCOLS.has(url.protocol)) return null;
    if (attribute !== 'href' && ['mailto:', 'tel:'].includes(url.protocol)) return null;
    if (['http:', 'https:'].includes(url.protocol) && url.hostname === 'xantardev.org' && !url.port) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return null;
  }
  return value;
}

function normalizeSrcset(value) {
  if (/(?:^|,)\s*(?:javascript|data|vbscript|file):/i.test(value)) return null;

  const candidates = value.split(',').map((candidate) => candidate.trim()).filter(Boolean);
  const normalized = candidates.map((candidate) => {
    const [, url, descriptor = ''] = candidate.match(/^(\S+)(?:\s+(.+))?$/) ?? [];
    if (!url) return null;
    const safeUrl = normalizeUrl(url, 'src');
    return safeUrl ? `${safeUrl}${descriptor ? ` ${descriptor}` : ''}` : null;
  }).filter(Boolean);
  return normalized.length ? normalized.join(', ') : null;
}

function isGutenbergComment(node) {
  return node.nodeName === '#comment' && /^\s*\/?wp:/i.test(node.data);
}

function normalizeNode(node) {
  if (node.content) normalizeNode(node.content);
  if (node.childNodes) {
    node.childNodes = node.childNodes.filter((child) => !isGutenbergComment(child) && child.tagName !== 'script');
    for (const child of node.childNodes) normalizeNode(child);
  }
  if (!node.attrs) return;

  node.attrs = node.attrs.flatMap((attribute) => {
    const name = attribute.name.toLowerCase();
    if (name.startsWith('on') || DROP_ATTRIBUTES.has(name)) return [];
    if (name === 'srcset') {
      const value = normalizeSrcset(attribute.value);
      return value ? [{ ...attribute, value }] : [];
    }
    if (!URL_ATTRIBUTES.has(name)) return [attribute];
    const value = normalizeUrl(attribute.value, name);
    return value == null ? [] : [{ ...attribute, value }];
  });
}

function protectLiquid(html) {
  return html.replaceAll('{{', '&#123;&#123;').replaceAll('{%', '&#123;%');
}

/**
 * Normalize an imported public HTML fragment for safe, literal Jekyll output.
 * @param {string} html
 * @returns {string}
 */
export function normalizeContent(html) {
  if (typeof html !== 'string') throw new TypeError('content HTML must be a string');
  const fragment = parseFragment(html);
  normalizeNode(fragment);
  return protectLiquid(serialize(fragment));
}
