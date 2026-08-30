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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://www.logic-solar.com';

const NAP = {
  name: 'Logic Solar',
  phone: '(816) 300-5781',
  phoneIntl: '+18163005781',
  street: '7300 W 110th St, Plaza 1, 7th Floor',
  city: 'Overland Park',
  region: 'KS',
  zip: '66210',
};

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const title = (t) => (t.includes('Logic Solar') ? t : `${t} | Logic Solar`);
const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/locations-solar.json'), 'utf8')
);
const tiers = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/city-tiers.json'), 'utf8')
);
const tierOf = new Map(tiers.map((t) => [`${t.state}|${t.slug}`, t]));
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const routes = [];

const push = (route, t, desc, { schema = null, body = '', noindex = false, ogImage = null } = {}) =>
  routes.push({ route, title: title(t), desc, schema, body, noindex, ogImage });

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: NAP.name,
  telephone: NAP.phoneIntl,
  url: BASE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: NAP.street,
    addressLocality: NAP.city,
    addressRegion: NAP.region,
    postalCode: NAP.zip,
    addressCountry: 'US',
  },
};

push('/', 'Solar Panel Installation & Battery Backup | Logic Solar',
  'Custom-engineered solar installations, battery backup, and commercial solar across Kansas, Missouri, Texas, Oklahoma, Illinois, and Colorado. Free quotes: ' + NAP.phone + '.',
  {
    schema: orgSchema,
    body: `<h1>Logic Solar — Custom-Engineered Solar Energy Systems</h1>
<p>Logic Solar designs and installs high-performance residential and commercial solar systems, with battery backup and premium service. Based in ${NAP.city}, ${NAP.region}, serving Kansas, Missouri, Texas, Oklahoma, Illinois, and Colorado. Call ${NAP.phone} for a free quote.</p>`,
  });
push('/about', 'About Logic Solar | Custom-Engineered Solar Since Day One',
  'Meet Logic Solar: engineering-first solar installation with a premium service standard. Learn how we design, build, and stand behind every system.');
push('/services/installation', 'Solar Panel Installation | Residential Solar Systems',
  'Professional residential solar panel installation, custom-engineered for your roof, usage, and utility. Free system design and quote from Logic Solar.');
push('/services/battery', 'Battery Backup & Energy Storage',
  'Home battery backup and energy storage systems that keep the lights on and maximize your solar investment. Design and installation by Logic Solar.');
push('/services/commercial', 'Commercial Solar Installation',
  'Commercial solar systems engineered for businesses: lower operating costs, tax advantages, and dependable performance. Get a commercial quote from Logic Solar.');
push('/services/incentives', 'Solar Incentives & Tax Credits',
  'Federal tax credits, state incentives, and utility rebates that lower the cost of going solar. See what applies in KS, MO, TX, OK, IL, and CO.');
push('/services/how-it-works', 'How Solar Works | From Sunlight to Savings',
  'How a solar energy system works: panels, inverters, batteries, net metering, and what to expect from design through installation with Logic Solar.');
push('/roofing', 'Roofing Services',
  'Roof replacement and repair engineered to pair with solar: one team for your roof and your panels. Free inspections from Logic Solar.');
push('/financing', 'Solar Financing Options | $0-Down Solar Loans',
  'Flexible solar financing: $0-down loans, cash purchase, and options that make going solar pay from day one. See what fits your budget.');
push('/faq', 'Solar FAQ | Answers From Logic Solar',
  'Straight answers to the most common solar questions: costs, savings, batteries, roof requirements, incentives, and how installation works.');
push('/contact', 'Contact Logic Solar | Free Solar Quote',
  `Talk to Logic Solar: free quotes and system designs. Call ${NAP.phone} or send a message — ${NAP.city}, ${NAP.region}.`,
  { schema: orgSchema });
push('/privacy', 'Privacy Policy',
  'How Logic Solar collects, uses, and protects your information.');
push('/terms', 'Terms of Service',
  'The terms that govern use of the Logic Solar website and services.');

// Internal tool / campaign routes: prerendered so they resolve as real files
// (no SPA catch-all needed), but noindexed — they are not for search.
const internalRoutes = [
  '/adders', '/service', '/credit', '/credit-repair', '/deal', '/logins',
  '/onboard', '/sitesurvey', '/thankyou', '/commercial', '/solar-landing',
];
for (const r of internalRoutes) {
  push(r, 'Logic Solar', 'Logic Solar internal page.', { noindex: true });
}

// Flagship city pages keep the same meta their dedicated React pages set,
// so what crawlers see matches what hydration renders.
const dedicatedCityMeta = {
  'texas/austin': {
    title: 'Austin Solar Company | Panels and Battery Backup | Logic Solar',
    desc: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Austin and Central Texas. Request a custom solar estimate.',
  },
  'missouri/kansas-city': {
    title: 'Kansas City Solar Company | Logic Solar',
    desc: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Kansas City, Missouri and the KC metro. Request a custom solar estimate.',
  },
  'kansas/wichita': {
    title: 'Wichita Solar Company | Panels and Battery Backup | Logic Solar',
    desc: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Wichita and south-central Kansas. Request a custom solar estimate.',
  },
};

for (const [st, state] of Object.entries(data.states)) {
  const stateSlug = state.name.toLowerCase();
  const stateRoute = `/locations/${stateSlug}`;
  const cityLinks = state.cities
    .filter((c) => (tierOf.get(`${st}|${c.slug}`)?.tier ?? 3) < 3)
    .map((c) => `<li><a href="/locations/${stateSlug}/${c.slug}">Solar installation in ${esc(c.city)}, ${st.toUpperCase()}</a></li>`)
    .join('\n');

  push(stateRoute, `${state.name} Solar Installation | Panels, Battery & Commercial`,
    `Solar panel installation across ${state.name}: custom-engineered systems, battery backup, and commercial solar. ~${state.sunlightDays} sunny days a year. Free quotes: ${NAP.phone}.`,
    {
      schema: { ...orgSchema, areaServed: { '@type': 'State', name: state.name } },
      body: `<h1>Solar Installation in ${esc(state.name)}</h1>
<p>${esc(state.name)} averages around ${state.sunlightDays} days of sunshine a year, and homeowners here benefit from ${esc(state.stateIncentive)}. Logic Solar custom-engineers residential and commercial systems across the state — call ${NAP.phone} for a free quote.</p>
<h2>${esc(state.name)} cities we serve</h2>
<ul>${cityLinks}</ul>`,
    });

  for (const c of state.cities) {
    const tier = tierOf.get(`${st}|${c.slug}`);
    if (!tier || tier.tier >= 3) continue; // Tier 3: 301s to the state hub via vercel.json
    const kw = cap(c.keywords?.primary || 'solar installation');
    const secondary = (c.keywords?.secondary || []).join(', ');
    const cityRoute = `/locations/${stateSlug}/${c.slug}`;
    const dedicated = dedicatedCityMeta[`${stateSlug}/${c.slug}`];
    const teamNote = tier.anchorMiles > 5
      ? `about ${tier.anchorMiles} miles from our ${tier.nearestAnchor} team`
      : `home base of our ${tier.nearestAnchor} team`;
    push(cityRoute,
      dedicated ? dedicated.title : `${kw} in ${c.city}, ${st.toUpperCase()}`,
      dedicated ? dedicated.desc :
        `${kw} in ${c.city}, ${state.name} — ${tier.county} County. Custom-engineered by our ${tier.nearestAnchor} team. Free quotes: ${NAP.phone}.`,
      {
        schema: {
          ...orgSchema,
          areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: state.name } },
          makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${kw} in ${c.city}, ${state.name}` } },
        },
        body: `<h1>${esc(kw)} in ${esc(c.city)}, ${esc(state.name)}</h1>
<p>Logic Solar serves ${esc(c.city)} and the rest of ${esc(tier.county)} County ${esc(teamNote)}. With roughly ${state.sunlightDays} sunny days a year and the average ${esc(state.name)} electric bill near ${esc(state.avgBill)} per month, ${esc(c.city)} homeowners are strong candidates for solar. Local utility context: ${esc(state.utilityFocus)}. Available incentives include ${esc(state.stateIncentive)}.</p>
<p>Logic Solar custom-engineers every system — panels, ${esc(secondary || 'battery backup')}, and monitoring — and backs it with premium service. Call ${NAP.phone} or <a href="/contact">request a free quote</a>. Explore more of <a href="${stateRoute}">our ${esc(state.name)} service area</a>.</p>`,
      });
  }
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

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
  if (r.schema) {
    html = html.replace('</head>',
      () => `  <script type="application/ld+json">${JSON.stringify(r.schema)}</script>\n  </head>`);
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
