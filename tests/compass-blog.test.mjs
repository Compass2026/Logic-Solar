// The Compass json_blog contract on Logic Solar: what the CRM's
// blog-publisher writes must render completely and safely, or fail the build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  loadReleasedArticles, parseMarkdown, renderBlocksHtml, heroHtml, heroVariants, blogPath, PREVIEW_RELEASE_HASH,
} from '../src/content/compass-blog-core.js';

const article = (over = {}) => ({
  slug: 'solar-consultation', title: 'Solar consultation', description: 'What to gather.', metaTitle: 'Solar Consultation',
  h1: 'What to gather before a solar consultation', datePublished: '2026-10-15', dateModified: '2026-10-15',
  bodyMarkdown: 'Intro with a "quote" & an <b>tag</b>.\n\n## Your bills\n\n- **Roof condition.** Do you know its age?\n- See [battery backup](https://www.logic-solar.com/services/battery)\n\n1. First\n2. Second',
  cta: { text: 'Get a quote', url: 'https://www.logic-solar.com/services/installation' },
  heroImage: { src: '/blog/images/solar-consultation-571a4c1c9494.png', alt: 'Homeowner reviewing utility bills', width: 1730, height: 909, illustrative: true },
  compass: { draft_id: 'a922bdfa-2adb-4a80-8fe2-c8f489beed00', keyword_id: '4f17b44f-343f-4bfc-9259-7b5d21ee36e6', release_hash: 'sha256:' + 'a'.repeat(64), version: 2 },
  ...over,
});
const plain = (s) => s.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ');

test('the site advertises the contract the CRM requires, hero images included', () => {
  const c = JSON.parse(fs.readFileSync('compass-blog.json', 'utf8'));
  assert.deepEqual(c, { version: 1, adapter: 'json_blog', keyword_provenance: true, markdown: true, seo_fields: true,
    hero_image: true, hero_image_dir: 'public/blog/images', hero_image_url_prefix: '/blog/images/' });
  assert.ok(Array.isArray(JSON.parse(fs.readFileSync('data/blog-posts.json', 'utf8'))));
  for (const f of ['src/content/compass-blog.ts', 'src/routing.ts', 'scripts/prerender.js']) assert.ok(fs.existsSync(f), f);
  assert.equal(blogPath('x'), '/blog/x/');
});

test('an approved article loads; malformed releases fail the build', () => {
  const [a] = loadReleasedArticles([article()]);
  assert.equal(a.heroImage.illustrative, true);
  assert.equal(a.preview, false);
  for (const bad of [
    { slug: 'Bad Slug' }, { h1: ' ' }, { cta: { text: 'x', url: 'javascript:alert(1)' } },
    { compass: { ...article().compass, release_hash: 'nope' } }, { datePublished: '2026-02-30' },
    { heroImage: { ...article().heroImage, src: 'https://cdn.example/x.png' } },
    { heroImage: { ...article().heroImage, alt: '' } }, { heroImage: { ...article().heroImage, width: 0 } },
  ]) assert.throws(() => loadReleasedArticles([article(bad)]), JSON.stringify(bad));
  assert.throws(() => loadReleasedArticles([article(), article()]), /duplicate/);
  assert.equal(loadReleasedArticles([article({ heroImage: undefined })])[0].heroImage, null);
});

test('a preview fixture renders on previews and is refused by a production build', () => {
  const fixture = article({ compass: { ...article().compass, release_hash: PREVIEW_RELEASE_HASH } });
  assert.equal(loadReleasedArticles([fixture], { allowPreviewFixtures: true })[0].preview, true);
  assert.throws(() => loadReleasedArticles([fixture]), /preview fixture/);
});

test('Markdown is text: raw HTML is escaped, only https links are anchors, every line survives', () => {
  const html = renderBlocksHtml(parseMarkdown(article().bodyMarkdown));
  assert.ok(!html.includes('<b>'));
  assert.ok(html.includes('&lt;b&gt;tag&lt;/b&gt;'));
  assert.ok(html.includes('<a href="https://www.logic-solar.com/services/battery">battery backup</a>'), 'internal links keep their exact href');
  assert.ok(html.includes('<h2>Your bills</h2>') && html.includes('<ul>') && html.includes('<ol>'));
  assert.ok(!renderBlocksHtml(parseMarkdown('[x](javascript:alert(1))')).includes('<a'));
  assert.match(renderBlocksHtml(parseMarkdown('[x](https://example.com)')), /target="_blank" rel="noopener noreferrer"/);
  // The CRM's live check: each authored line, without Markdown marks, is in the page text.
  const text = plain(html);
  for (const line of article().bodyMarkdown.split(/\n+/)) {
    const prose = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`#]/g, '').replace(/^\s*(?:-|\d+\.)\s+/, '').trim();
    assert.ok(text.includes(prose), prose);
  }
});

test('the hero renders with its alt text, dimensions and responsive WebP variants', () => {
  const [a] = loadReleasedArticles([article()]);
  const html = heroHtml(a.heroImage);
  assert.match(html, /<img src="\/blog\/images\/solar-consultation-571a4c1c9494\.png" alt="Homeowner reviewing utility bills" width="1730" height="909"/);
  assert.match(html, /srcset="\/blog\/images\/solar-consultation-571a4c1c9494-640\.webp 640w, \/blog\/images\/solar-consultation-571a4c1c9494-1280\.webp 1280w"/);
  assert.match(html, /<figcaption>Illustration<\/figcaption>/);
  assert.deepEqual(heroVariants({ ...a.heroImage, width: 800 }).map((v) => v.width), [640]);
  assert.ok(!heroHtml({ ...a.heroImage, illustrative: false }).includes('figcaption'));
});
