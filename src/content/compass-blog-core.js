// Compass blog core: the json_blog contract's loader, a restricted Markdown
// renderer and the hero image helpers. Plain JS so the React pages
// (src/content/compass-blog.ts) and the Node build scripts (prerender,
// sitemap, blog images) share one implementation and can never drift.
//
// Contract: compass-blog.json v1 (json_blog, markdown, seo_fields,
// keyword_provenance, hero_image). data/blog-posts.json is written ONLY by the
// Compass CRM's blog-publisher after a human approval; each article carries
// its release marker (compass.release_hash) and, optionally, a hero image
// committed next to it in public/blog/images/.

export const SITE_URL = 'https://www.logic-solar.com';
export const BLOG_INDEX_PATH = '/blog/';
export const blogPath = (slug) => `/blog/${slug}/`;
export const HERO_IMAGE_PREFIX = '/blog/images/';
/** Responsive WebP widths generated at build time (scripts/blog-images.js). */
export const HERO_WIDTHS = [640, 1280];
/**
 * The release hash of a PREVIEW FIXTURE: an article shown on a preview
 * deployment that no human has approved. The production build refuses it.
 */
export const PREVIEW_RELEASE_HASH = 'sha256:' + '0'.repeat(64);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HTTPS = /^https:\/\/[^\s<>"]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const HERO_FILE = /^\/blog\/images\/[a-z0-9]+(-[a-z0-9]+)*-[0-9a-f]{12}\.(png|jpe?g|webp)$/;

function fail(message) { throw new Error(`Compass blog: ${message}`); }
const text = (v, field, max = 5000) => {
  if (typeof v !== 'string' || !v.trim() || v.length > max) fail(`missing or invalid ${field}`);
  return v;
};

/**
 * Validate the released articles. A malformed release fails the build rather
 * than shipping a partial article. `allowPreviewFixtures` is false for
 * production builds.
 */
export function loadReleasedArticles(input, { allowPreviewFixtures = false, reservedSlugs = [] } = {}) {
  if (!Array.isArray(input)) fail('data/blog-posts.json must be an array');
  const seen = new Set(reservedSlugs);
  const posts = input.map((a) => {
    if (!a || typeof a !== 'object' || !SLUG.test(a.slug ?? '') || seen.has(a.slug)) fail('invalid or duplicate slug');
    seen.add(a.slug);
    for (const f of ['title', 'description', 'metaTitle', 'h1']) text(a[f], f, 400);
    text(a.bodyMarkdown, 'bodyMarkdown', 60000);
    for (const d of [a.datePublished, a.dateModified]) {
      if (!DATE.test(d ?? '') || new Date(`${d}T12:00:00Z`).toISOString().slice(0, 10) !== d) fail('invalid article date');
    }
    if (!a.cta || typeof a.cta.text !== 'string' || !a.cta.text.trim() || (a.cta.url !== null && !HTTPS.test(a.cta.url ?? ''))) fail('invalid CTA');
    const c = a.compass;
    if (!c || !UUID.test(c.draft_id ?? '') || !UUID.test(c.keyword_id ?? '') || !/^sha256:[0-9a-f]{64}$/.test(c.release_hash ?? '')
        || !Number.isInteger(c.version) || c.version < 1) fail('missing release provenance');
    const preview = c.release_hash === PREVIEW_RELEASE_HASH;
    if (preview && !allowPreviewFixtures) fail(`${a.slug} is a preview fixture and cannot be built for production`);
    let heroImage = null;
    if (a.heroImage != null) {
      const h = a.heroImage;
      if (!HERO_FILE.test(h.src ?? '')) fail('hero image must be a committed file in /blog/images/');
      text(h.alt, 'hero alt text', 250);
      if (!Number.isInteger(h.width) || !Number.isInteger(h.height) || h.width < 1 || h.height < 1) fail('hero image dimensions');
      if (typeof h.illustrative !== 'boolean') fail('hero image illustrative flag');
      heroImage = { src: h.src, alt: h.alt, width: h.width, height: h.height, illustrative: h.illustrative };
    }
    // Rendering must never change the approved words: parse now so a body
    // with unsupported syntax fails the build.
    const blocks = parseMarkdown(a.bodyMarkdown);
    return {
      slug: a.slug, title: a.title, description: a.description, metaTitle: a.metaTitle, h1: a.h1,
      datePublished: a.datePublished, dateModified: a.dateModified, bodyMarkdown: a.bodyMarkdown, blocks,
      cta: { text: a.cta.text, url: a.cta.url }, heroImage, compass: { ...c }, preview,
      readMinutes: Math.max(1, Math.ceil(a.bodyMarkdown.split(/\s+/).filter(Boolean).length / 220)),
    };
  });
  return posts.sort((x, y) => y.datePublished.localeCompare(x.datePublished) || x.slug.localeCompare(y.slug));
}

// ── Markdown: headings (##, ###), paragraphs, - and 1. lists, **bold**,
// *italic* and [text](https://…) links. Everything else is TEXT: raw HTML is
// escaped, never interpreted, and only https links become anchors.
export function parseInline(s) {
  const out = [];
  const re = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;
  let last = 0; let m;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ t: 'text', v: s.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ t: 'link', v: m[1], href: m[2] });
    else if (m[3] !== undefined) out.push({ t: 'strong', v: m[3] });
    else out.push({ t: 'em', v: m[4] });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ t: 'text', v: s.slice(last) });
  return out;
}

export function parseMarkdown(md) {
  const blocks = [];
  let para = []; let list = null;
  const flush = () => {
    if (para.length) blocks.push({ t: 'p', inline: parseInline(para.join(' ')) });
    para = [];
    if (list) blocks.push(list);
    list = null;
  };
  for (const raw of md.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const h = /^(#{2,3})\s+(.+)$/.exec(line);
    if (h) { flush(); blocks.push({ t: h[1].length === 2 ? 'h2' : 'h3', inline: parseInline(h[2]) }); continue; }
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+\.\s+(.+)$/.exec(line);
    if (ul || ol) {
      if (para.length) { blocks.push({ t: 'p', inline: parseInline(para.join(' ')) }); para = []; }
      const kind = ul ? 'ul' : 'ol';
      if (list && list.t !== kind) { blocks.push(list); list = null; }
      list ??= { t: kind, items: [] };
      list.items.push(parseInline((ul ?? ol)[1]));
      continue;
    }
    if (list) { blocks.push(list); list = null; }
    para.push(line);
  }
  flush();
  return blocks;
}

export const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const internal = (href) => href.startsWith(SITE_URL + '/') || href === SITE_URL;
export function linkAttrs(href) {
  return internal(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
}
function inlineHtml(nodes) {
  return nodes.map((n) => {
    if (n.t === 'link') {
      const a = linkAttrs(n.href);
      return `<a href="${escapeHtml(n.href)}"${a.target ? ` target="${a.target}" rel="${a.rel}"` : ''}>${escapeHtml(n.v)}</a>`;
    }
    if (n.t === 'strong') return `<strong>${escapeHtml(n.v)}</strong>`;
    if (n.t === 'em') return `<em>${escapeHtml(n.v)}</em>`;
    return escapeHtml(n.v);
  }).join('');
}
/** Static HTML for the prerendered page (React renders the same blocks). */
export function renderBlocksHtml(blocks) {
  return blocks.map((b) => {
    if (b.t === 'ul' || b.t === 'ol') return `<${b.t}>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</${b.t}>`;
    return `<${b.t}>${inlineHtml(b.inline)}</${b.t}>`;
  }).join('\n');
}

// ── Hero image ──────────────────────────────────────────────────────────────
/** The build-time WebP variants of a hero no wider than the original. */
export function heroVariants(hero) {
  const base = hero.src.replace(/\.(png|jpe?g|webp)$/, '');
  return HERO_WIDTHS.filter((w) => w < hero.width).map((w) => ({ width: w, src: `${base}-${w}.webp` }));
}
export const HERO_SIZES = '(min-width: 1024px) 896px, 100vw';
export const ILLUSTRATIVE_CAPTION = 'Illustration';
export function heroHtml(hero, { eager = true } = {}) {
  const variants = heroVariants(hero);
  const source = variants.length
    ? `<source type="image/webp" srcset="${variants.map((v) => `${v.src} ${v.width}w`).join(', ')}" sizes="${HERO_SIZES}">`
    : '';
  const img = `<img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt)}" width="${hero.width}" height="${hero.height}" style="width:100%;height:auto"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
  return `<figure class="compass-hero"><picture>${source}${img}</picture>${hero.illustrative ? `<figcaption>${ILLUSTRATIVE_CAPTION}</figcaption>` : ''}</figure>`;
}

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
}
