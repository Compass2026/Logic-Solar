/**
 * Prerender — runs AFTER `vite build`.
 * Writes a real index.html for every route: unique title, meta description,
 * canonical, Open Graph tags, LocalBusiness schema, and crawlable content
 * that React replaces on hydration. Crawlers see real pages; users see the app.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://logic-solar.com';

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
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const routes = [];

const push = (route, t, desc, { schema = null, body = '' } = {}) =>
  routes.push({ route, title: title(t), desc, schema, body });

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

push('/', 'Logic Solar | Solar Panel Installation, Battery Backup & Commercial Solar',
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
push('/financing', 'Solar Financing Options | $0-Down Solar Loans',
  'Flexible solar financing: $0-down loans, cash purchase, and options that make going solar pay from day one. See what fits your budget.');
push('/faq', 'Solar FAQ | Answers From Logic Solar',
  'Straight answers to the most common solar questions: costs, savings, batteries, roof requirements, incentives, and how installation works.');
push('/contact', 'Contact Logic Solar | Free Solar Quote',
  `Talk to Logic Solar: free quotes and system designs. Call ${NAP.phone} or send a message — ${NAP.city}, ${NAP.region}.`,
  { schema: orgSchema });

for (const [st, state] of Object.entries(data.states)) {
  const stateRoute = `/locations/${state.name.toLowerCase()}`;
  const cityLinks = state.cities
    .map((c) => `<li><a href="/locations/${c.state}/${c.slug}">Solar installation in ${esc(c.city)}, ${st.toUpperCase()}</a></li>`)
    .join('\n');

  push(stateRoute, `${state.name} Solar Installation | Panels, Battery & Commercial`,
    `Solar panel installation across ${state.name}: ~${state.sunlightDays} sunny days a year, ${state.stateIncentive}. Custom-engineered systems by Logic Solar.`,
    {
      schema: { ...orgSchema, areaServed: { '@type': 'State', name: state.name } },
      body: `<h1>Solar Installation in ${esc(state.name)}</h1>
<p>${esc(state.name)} averages around ${state.sunlightDays} days of sunshine a year, and homeowners here benefit from ${esc(state.stateIncentive)}. Logic Solar custom-engineers residential and commercial systems across the state — call ${NAP.phone} for a free quote.</p>
<h2>${esc(state.name)} cities we serve</h2>
<ul>${cityLinks}</ul>`,
    });

  for (const c of state.cities) {
    const kw = cap(c.keywords?.primary || 'solar installation');
    const secondary = (c.keywords?.secondary || []).join(', ');
    push(`/locations/${c.state}/${c.slug}`,
      `${kw} in ${c.city}, ${st.toUpperCase()}`,
      `${kw} in ${c.city}, ${state.name}: custom-engineered systems, ${secondary || 'battery backup'}, and premium service. Avg. ${state.name} electric bill ${state.avgBill}/mo — see what solar saves. Free quotes: ${NAP.phone}.`,
      {
        schema: {
          ...orgSchema,
          areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: state.name } },
          makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${kw} in ${c.city}, ${state.name}` } },
        },
        body: `<h1>${esc(kw)} in ${esc(c.city)}, ${esc(state.name)}</h1>
<p>Looking for ${esc(kw.toLowerCase())} in ${esc(c.city)}? With roughly ${state.sunlightDays} sunny days a year and the average ${esc(state.name)} electric bill near ${esc(state.avgBill)} per month, ${esc(c.city)} homeowners are strong candidates for solar. Local utility context: ${esc(state.utilityFocus)}. Available incentives include ${esc(state.stateIncentive)}.</p>
<p>Logic Solar custom-engineers every system — panels, ${esc(secondary || 'battery backup')}, and monitoring — and backs it with premium service. Call ${NAP.phone} or <a href="/contact">request a free quote</a>. Explore more of <a href="${stateRoute}">our ${esc(state.name)} service area</a>.</p>`,
      });
  }
}

let written = 0;
for (const r of routes) {
  const canonical = `${BASE_URL}${r.route === '/' ? '' : r.route}`;
  // Every replacement uses a function so "$" in content is never a regex pattern.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, () => `<meta name="description" content="${esc(r.desc)}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, () => `<meta property="og:title" content="${esc(r.title)}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, () => `<meta property="og:description" content="${esc(r.desc)}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, () => `<meta property="og:url" content="${canonical}"`)
    .replace('</head>', () => `  <link rel="canonical" href="${canonical}" />\n  </head>`);

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
