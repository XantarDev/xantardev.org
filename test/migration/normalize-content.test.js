import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeContent } from '../../scripts/migration/normalize-content.js';

test('preserves readable Gutenberg structures while removing block comments', () => {
  const normalized = normalizeContent(`
    <!-- wp:heading {"level":2} --><h2>Heading</h2><!-- /wp:heading -->
    <!-- wp:list --><ul><li>One</li><li>Two</li></ul><!-- /wp:list -->
    <table><tr><td>Cell</td></tr></table><pre><code>const value = 1;</code></pre>
  `);

  assert.doesNotMatch(normalized, /<!--\s*\/?wp:/i);
  assert.match(normalized, /<h2>Heading<\/h2>/);
  assert.match(normalized, /<ul><li>One<\/li><li>Two<\/li><\/ul>/);
  assert.match(normalized, /<table><tbody><tr><td>Cell<\/td><\/tr><\/tbody><\/table>/);
  assert.match(normalized, /<pre><code>const value = 1;<\/code><\/pre>/);
});

test('canonicalizes xantardev URLs and srcset candidates without changing external URLs', () => {
  const normalized = normalizeContent(`
    <a href="http://xantardev.org/posts/?ref=menu#details">Local</a>
    <img src="https://xantardev.org/wp-content/uploads/2024/01/photo.jpg" poster="http://xantardev.org/trailer.mp4"
      srcset="http://xantardev.org/a.jpg 1x, https://xantardev.org/b.jpg?size=2 2x, https://example.test/c.jpg 3x">
    <a href="https://example.test/read#section">External</a>
  `);

  assert.match(normalized, /href="\/posts\/\?ref=menu#details"/);
  assert.match(normalized, /src="\/wp-content\/uploads\/2024\/01\/photo.jpg"/);
  assert.match(normalized, /poster="\/trailer.mp4"/);
  assert.match(normalized, /srcset="\/a.jpg 1x, \/b.jpg\?size=2 2x, https:\/\/example.test\/c.jpg 3x"/);
  assert.match(normalized, /href="https:\/\/example.test\/read#section"/);
});

test('removes executable content and unsafe URLs while keeping safe fragments', () => {
  const normalized = normalizeContent(`
    <script>alert('no')</script><p onclick="run()"><a href="javascript:run()">Bad</a>
    <a href="java&#x09;script:run()">Obfuscated</a>
    <img src="data:image/png;base64,AAAA" onerror="run()" srcset="data:image/png;base64,AAAA 1x, /safe.jpg 2x">
    <iframe srcdoc="<script>alert(1)</script>" src="https://example.test/embed"></iframe>
    <form action="javascript:submit()"><button formaction="java&#99999999;script:x()">Go</button></form>
    <object data="vbscript:msgbox(1)"></object>
    <a href="#section">Fragment</a></p>
  `);

  assert.doesNotMatch(normalized, /<script|onclick|onerror|javascript:|java&#x09;script|vbscript:|data:|srcdoc=|action=|formaction=/i);
  assert.doesNotMatch(normalized, /srcset=/i);
  assert.match(normalized, /src="https:\/\/example.test\/embed"/);
  assert.match(normalized, /href="#section">Fragment<\/a>/);
});

test('sanitizes template content recursively', () => {
  const normalized = normalizeContent('<template><!-- wp:html --><script>alert(1)</script><a onclick="x()" href="javascript:x()">Bad</a></template>');

  assert.doesNotMatch(normalized, /<!--\s*wp:|<script|onclick|javascript:/i);
  assert.match(normalized, /<template><a>Bad<\/a><\/template>/);
});

test('escapes literal Liquid delimiters without changing visible content', () => {
  const normalized = normalizeContent('<p>{{ reader.name }} {% if reader %}welcome{% endif %}</p>');

  assert.doesNotMatch(normalized, /\{\{|\{%/);
  assert.match(normalized, /&#123;&#123; reader.name }} &#123;% if reader %}welcome&#123;% endif %}/);
});
