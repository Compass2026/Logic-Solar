/**
 * Prerender — runs AFTER `vite build`.
 * Writes a real index.html for every route: unique title, meta description,
 * canonical, Open Graph + Twitter Card tags, LocalBusiness schema, and
 * crawlable content that React replaces on hydration. Crawlers see real
 * pages; users see the app. Internal tool routes are prerendered with
 * noindex so they resolve as files (no SPA catch-all) without being indexed.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCityMeta, buildStateMeta, dedicatedCityMeta } from '../src/data/pageMeta.js';
import { homeFaqs, faqClusters, buildCityFaqs } from '../src/data/faqs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://www.logic-solar.com';

// Per-location NAP. Each Google Business Profile is a separate listing, so
// every page's LocalBusiness schema must match the listing for the location
// that actually serves it — never a hardcoded HQ NAP.
const LOCATIONS = {
  overlandPark: {
    name: 'Logic Solar',
    phone: '(816) 300-5781',
    phoneIntl: '+18163005781',
    street: '7300 W 110th St, Plaza 1, 7th Floor',
    city: 'Overland Park',
    region: 'KS',
    zip: '66210',
    geo: { lat: 38.9310762, lng: -94.6707302 },
    isServiceArea: false,
    // Add the public Google Maps URL for the Overland Park GBP listing here
    // once verified — do not guess it.
    sameAs: ['https://www.instagram.com/logic_solar/'],
  },
  wichita: {
    name: 'Logic Solar',
    phone: '(316) 669-7219',
    phoneIntl: '+13166697219',
    street: '307 S Prescott Cir',
    city: 'Wichita',
    region: 'KS',
    zip: '67209',
    // US Census geocode for 307 S Prescott Cir, 67209 — confirm against the
    // live GBP pin before treating as authoritative.
    geo: { lat: 37.6785125, lng: -97.4701138 },
    isServiceArea: true,
    // Add the public Google Maps URL for the Wichita GBP listing here once
    // verified — do not guess it.
    sameAs: [
      'https://www.facebook.com/profile.php?id=61580455196022',
      'https://www.instagram.com/logic_solar',
      'https://www.linkedin.com/company/logic-solar/',
    ],
  },
};

// Route -> location. Every route not listed here uses the Overland Park HQ;
// adding a location page later is one line.
const ROUTE_LOCATION = {
  '/locations/kansas/wichita': 'wichita',
};
const locationFor = (route) => LOCATIONS[ROUTE_LOCATION[route] ?? 'overlandPark'];

const HQ = LOCATIONS.overlandPark;

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const title = (t) => (t.includes('Logic Solar') ? t : `${t} | Logic Solar`);

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/locations-solar.json'), 'utf8')
);
const tiers = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/city-tiers.json'), 'utf8')
);
const tierOf = new Map(tiers.map((t) => [`${t.state}|${t.slug}`, t]));
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const routes = [];

// `crumb` is the page's own name in its BreadcrumbList; defaults to the
// capitalized last URL segment. `schema` accepts one node or an array —
// everything is emitted as a single @graph per page.
const push = (route, t, desc, { schema = null, body = '', noindex = false, ogImage = null, crumb = null } = {}) =>
  routes.push({ route, title: title(t), desc, schema, body, noindex, ogImage, crumb });

// ── Schema building blocks — all @ids live on the canonical www host ──

const ORG_ID = `${BASE_URL}/#organization`;

const orgNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Logic Solar',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  telephone: HQ.phoneIntl,
  sameAs: HQ.sameAs,
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Logic Solar',
  url: BASE_URL,
  publisher: { '@id': ORG_ID },
};

const statesServed = ['Kansas', 'Missouri', 'Texas', 'Oklahoma', 'Illinois', 'Colorado']
  .map((name) => ({ '@type': 'State', name }));

const localBusinessSchema = (loc) => ({
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness${loc === HQ ? '' : `-${loc.city.toLowerCase()}`}`,
  name: loc.name,
  telephone: loc.phoneIntl,
  url: BASE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: loc.street,
    addressLocality: loc.city,
    addressRegion: loc.region,
    postalCode: loc.zip,
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: loc.geo.lat, longitude: loc.geo.lng },
  openingHours: 'Mo-Fr 09:00-17:00',
  sameAs: loc.sameAs,
  parentOrganization: { '@id': ORG_ID },
});

// Service copy harvested from the React service pages (SolarInstallation,
// BatteryBackup, CommercialSolar) so first-pass crawlers see the same
// Service schema hydration would inject.
const serviceNode = (route, name, description) => ({
  '@type': 'Service',
  '@id': `${BASE_URL}${route}#service`,
  name,
  description,
  provider: { '@id': ORG_ID },
  areaServed: statesServed,
  url: `${BASE_URL}${route}`,
});

const faqPageNode = (route, faqs) => ({
  '@type': 'FAQPage',
  '@id': `${BASE_URL}${route === '/' ? '' : route}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

// FAQPage schema may only describe Q&A that is visible in the raw HTML, so
// every faqPageNode is paired with this body markup.
const faqBody = (faqs) =>
  faqs.map((f) => `<h3>${esc(f.question)}</h3>\n<p>${esc(f.answer)}</p>`).join('\n');

push('/', 'Solar Panel Installation & Battery Backup | Logic Solar',
  'Custom-engineered solar installations, battery backup, and commercial solar across Kansas, Missouri, Texas, Oklahoma, Illinois, and Colorado. Free quotes: ' + HQ.phone + '.',
  {
    schema: [localBusinessSchema(HQ), faqPageNode('/', homeFaqs)],
    body: `<h1>Logic Solar — Custom-Engineered Solar Energy Systems</h1>
<p>Logic Solar designs and installs high-performance residential and commercial solar systems, with battery backup and premium service. Based in ${HQ.city}, ${HQ.region}, serving Kansas, Missouri, Texas, Oklahoma, Illinois, and Colorado. Call ${HQ.phone} for a free quote.</p>
<h2>Frequently asked questions</h2>
${faqBody(homeFaqs)}`,
  });
push('/about', 'About Logic Solar | Custom-Engineered Solar Since Day One',
  'Meet Logic Solar: engineering-first solar installation with a premium service standard. Learn how we design, build, and stand behind every system.',
  { crumb: 'About' });
push('/services/installation', 'Solar Panel Installation | Residential Solar Systems',
  'Professional residential solar panel installation, custom-engineered for your roof, usage, and utility. Free system design and quote from Logic Solar.',
  {
    crumb: 'Residential Solar Installation',
    schema: serviceNode('/services/installation', 'Residential Solar Installation',
      'Premium residential solar installation with custom engineering and Tier 1 components.'),
  });
push('/services/battery', 'Battery Backup & Energy Storage',
  'Home battery backup and energy storage systems that keep the lights on and maximize your solar investment. Design and installation by Logic Solar.',
  {
    crumb: 'Battery Backup & Storage',
    schema: serviceNode('/services/battery', 'Battery Backup & Storage',
      'Premium energy storage solutions for energy independence and outage protection.'),
  });
push('/services/commercial', 'Commercial Solar Installation',
  'Commercial solar systems engineered for businesses: lower operating costs, tax advantages, and dependable performance. Get a commercial quote from Logic Solar.',
  {
    crumb: 'Commercial Solar Solutions',
    schema: serviceNode('/services/commercial', 'Commercial Solar Solutions',
      'Strategic solar energy assets for businesses, providing custom engineering and ROI-focused installations.'),
  });
push('/services/incentives', 'Solar Incentives & Tax Credits',
  'Federal tax credits, state incentives, and utility rebates that lower the cost of going solar. See what applies in KS, MO, TX, OK, IL, and CO.',
  { crumb: 'Solar Incentives & Tax Credits' });
push('/services/how-it-works', 'How Solar Works | From Sunlight to Savings',
  'How a solar energy system works: panels, inverters, batteries, net metering, and what to expect from design through installation with Logic Solar.',
  { crumb: 'How Solar Works' });
push('/roofing', 'Roofing Services',
  'Roof replacement and repair engineered to pair with solar: one team for your roof and your panels. Free inspections from Logic Solar.',
  {
    crumb: 'Roofing Services',
    schema: serviceNode('/roofing', 'Roofing Services',
      'Roof replacement and repair engineered to pair with solar: one team for your roof and your panels.'),
  });
push('/financing', 'Solar Financing Options | $0-Down Solar Loans',
  'Flexible solar financing: $0-down loans, cash purchase, and options that make going solar pay from day one. See what fits your budget.',
  { crumb: 'Financing' });
push('/faq', 'Solar FAQ | Answers From Logic Solar',
  'Straight answers to the most common solar questions: costs, savings, batteries, roof requirements, incentives, and how installation works.',
  {
    crumb: 'FAQ',
    schema: faqPageNode('/faq', faqClusters.flatMap((c) => c.questions)),
    body: `<h1>Solar FAQ — Answers From Logic Solar</h1>
${faqClusters.map((c) => `<h2>${esc(c.category)}</h2>\n${faqBody(c.questions)}`).join('\n')}`,
  });
push('/contact', 'Contact Logic Solar | Free Solar Quote',
  `Talk to Logic Solar: free quotes and system designs. Call ${HQ.phone} or send a message — ${HQ.city}, ${HQ.region}.`,
  { crumb: 'Contact', schema: localBusinessSchema(HQ) });
push('/privacy', 'Privacy Policy',
  'How Logic Solar collects, uses, and protects your information.',
  { crumb: 'Privacy Policy' });
push('/terms', 'Terms of Service',
  'The terms that govern use of the Logic Solar website and services.',
  { crumb: 'Terms of Service' });

// Internal tool / campaign routes: prerendered so they resolve as real files
// (no SPA catch-all needed), but noindexed — they are not for search.
const internalRoutes = [
  '/adders', '/service', '/credit', '/credit-repair', '/deal', '/logins',
  '/onboard', '/sitesurvey', '/thankyou', '/commercial', '/solar-landing',
];
for (const r of internalRoutes) {
  push(r, 'Logic Solar', 'Logic Solar internal page.', { noindex: true });
}

// City/state titles and descriptions come from src/data/pageMeta.js — the
// same module the React pages use — so prerendered meta and hydrated meta
// can never drift apart.

for (const [st, state] of Object.entries(data.states)) {
  const stateSlug = state.name.toLowerCase();
  const stateRoute = `/locations/${stateSlug}`;
  const cityLinks = state.cities
    .filter((c) => (tierOf.get(`${st}|${c.slug}`)?.tier ?? 3) < 3)
    .map((c) => `<li><a href="/locations/${stateSlug}/${c.slug}">Solar installation in ${esc(c.city)}, ${st.toUpperCase()}</a></li>`)
    .join('\n');

  const stateMeta = buildStateMeta(stateSlug);
  push(stateRoute, stateMeta.title, stateMeta.description,
    {
      crumb: state.name,
      schema: { ...localBusinessSchema(HQ), areaServed: { '@type': 'State', name: state.name } },
      body: `<h1>${esc(stateMeta.h1)}</h1>
<p>${esc(state.name)} averages around ${state.sunlightDays} days of sunshine a year, and homeowners here benefit from ${esc(state.stateIncentive)}. Logic Solar custom-engineers residential and commercial systems across the state — call ${HQ.phone} for a free quote.</p>
<h2>${esc(state.name)} cities we serve</h2>
<ul>${cityLinks}</ul>`,
    });

  for (const c of state.cities) {
    const tier = tierOf.get(`${st}|${c.slug}`);
    if (!tier || tier.tier >= 3) continue; // Tier 3: 301s to the state hub via vercel.json
    const cityMeta = buildCityMeta(stateSlug, c.slug);
    const kw = cityMeta.kw;
    const secondary = (c.keywords?.secondary || []).join(', ');
    const cityRoute = `/locations/${stateSlug}/${c.slug}`;
    // The location whose GBP covers this city page. Its NAP drives both the
    // schema and the visible phone number in the prerendered body.
    const loc = locationFor(cityRoute);
    const teamNote = tier.anchorMiles > 5
      ? `about ${tier.anchorMiles} miles from our ${tier.nearestAnchor} team`
      : `home base of our ${tier.nearestAnchor} team`;
    const cityLocalBusiness = {
      ...localBusinessSchema(loc),
      areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: state.name } },
      makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${kw} in ${c.city}, ${state.name}` } },
    };
    // Flagship cities render dedicated React pages with their own FAQ copy,
    // so only template cities (which hydrate into CityFAQSection) get the
    // generated Q&A in body + FAQPage schema.
    const dedicated = dedicatedCityMeta[`${stateSlug}/${c.slug}`];
    const cityFaqs = dedicated ? null : buildCityFaqs(c.city, state);
    push(cityRoute, cityMeta.title, cityMeta.description,
      {
        crumb: c.city,
        schema: cityFaqs ? [cityLocalBusiness, faqPageNode(cityRoute, cityFaqs)] : cityLocalBusiness,
        body: `<h1>${esc(cityMeta.h1)}</h1>
<p>Logic Solar serves ${esc(c.city)} and the rest of ${esc(tier.county)} County ${esc(teamNote)}. With roughly ${state.sunlightDays} sunny days a year and the average ${esc(state.name)} electric bill near ${esc(state.avgBill)} per month, ${esc(c.city)} homeowners are strong candidates for solar. Local utility context: ${esc(state.utilityFocus)}. Available incentives include ${esc(state.stateIncentive)}.</p>
<p>Logic Solar custom-engineers every system — panels, ${esc(secondary || 'battery backup')}, and monitoring — and backs it with premium service. Call ${loc.phone} or <a href="/contact">request a free quote</a>. Explore more of <a href="${stateRoute}">our ${esc(state.name)} service area</a>.</p>` +
          (cityFaqs
            ? `\n<h2>Solar Questions Answered for ${esc(c.city)}</h2>\n${faqBody(cityFaqs)}`
            : ''),
      });
  }
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ── BreadcrumbList, derived from the real URL path ──
// Intermediate segments that are not themselves pages (/services, /locations)
// are skipped so no crumb links to a 404.

const crumbFor = new Map(
  routes.map((r) => [
    r.route,
    r.crumb ||
      (r.route.split('/').filter(Boolean).pop() || 'Home')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
  ])
);

const breadcrumbNode = (route) => {
  const segs = route.split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` }];
  let acc = '';
  segs.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segs.length - 1;
    if (!isLast && !crumbFor.has(acc)) return;
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: crumbFor.get(acc),
      // Google allows omitting `item` on the final crumb (the current page).
      ...(isLast ? {} : { item: `${BASE_URL}${acc}` }),
    });
  });
  return { '@type': 'BreadcrumbList', '@id': `${BASE_URL}${route}#breadcrumb`, itemListElement: items };
};

let written = 0;
for (const r of routes) {
  const canonical = `${BASE_URL}${r.route === '/' ? '' : r.route}`;
  const ogImage = r.ogImage || DEFAULT_OG_IMAGE;
  // Every replacement uses a function so "$" in content is never a regex pattern.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, () => `<meta name="description" content="${esc(r.desc)}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, () => `<meta property="og:title" content="${esc(r.title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, () => `<meta property="og:description" content="${esc(r.desc)}"`)
    .replace(/<meta property="og:image" content="[^"]*"/, () => `<meta property="og:image" content="${esc(ogImage)}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, () => `<meta property="og:url" content="${canonical}"`)
    .replace('</head>', () => `  <link rel="canonical" href="${canonical}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(r.title)}" />
  <meta name="twitter:description" content="${esc(r.desc)}" />
  <meta name="twitter:image" content="${esc(ogImage)}" />
  </head>`);

  if (r.route === '/') {
    html = html.replace('</head>',
      () => `  <link rel="preload" as="image" href="/images/modern_suburban_home_with_solar_panels.jpg" fetchpriority="high" />\n  </head>`);
  }
  if (r.noindex) {
    html = html.replace('</head>',
      () => `  <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  }
  // Assemble one @graph per page: Organization + WebSite on the homepage,
  // BreadcrumbList everywhere else, plus the page's own nodes. Noindexed
  // internal pages get no structured data.
  const graph = [];
  if (!r.noindex) {
    if (r.route === '/') graph.push(orgNode, websiteNode);
    else graph.push(breadcrumbNode(r.route));
    for (const node of [].concat(r.schema || [])) {
      // Service nodes reference the Organization @id — make it resolvable
      // in the same page graph.
      if (node['@type'] === 'Service' && !graph.includes(orgNode)) graph.unshift(orgNode);
      const { '@context': _context, ...rest } = node;
      graph.push(rest);
    }
  }
  if (graph.length) {
    const schemaJson = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    html = html.replace('</head>',
      () => `  <script type="application/ld+json">${schemaJson}</script>\n  </head>`);
  }
  if (r.body) {
    html = html.replace('<div id="root"></div>', () => `<div id="root">${r.body}</div>`);
  }

  const outDir = r.route === '/' ? DIST : path.join(DIST, r.route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  written++;
}

console.log(`[prerender] wrote ${written} routes (${routes.length} expected)`);
