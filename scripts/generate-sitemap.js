import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.logic-solar.com';
const LASTMOD = new Date().toISOString().split('T')[0];

// No <priority>: Google ignores it.
const url = (loc) =>
  `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod></url>\n`;

const generateSitemap = () => {
  const dataPath = path.resolve(__dirname, '../src/data/locations-solar.json');
  const locationsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const tiers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/city-tiers.json'), 'utf8'));
  const tierOf = new Map(tiers.map((t) => [`${t.state}|${t.slug}`, t]));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
`;
  sitemap += url(`${BASE_URL}/`);
  for (const p of [
    '/about',
    '/services/installation',
    '/services/battery',
    '/services/commercial',
    '/services/incentives',
    '/services/how-it-works',
    '/roofing',
    '/financing',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
  ]) {
    sitemap += url(`${BASE_URL}${p}`);
  }

  sitemap += `\n  <!-- State Hubs -->\n`;
  const states = locationsData.states;
  for (const stateData of Object.values(states)) {
    sitemap += url(`${BASE_URL}/locations/${stateData.name.toLowerCase()}`);
  }

  // Dedicated High Priority Location Pages
  const dedicated = [
    `${BASE_URL}/locations/texas/austin`,
    `${BASE_URL}/locations/missouri/kansas-city`,
    `${BASE_URL}/locations/kansas/wichita`,
  ];
  sitemap += `\n  <!-- Dedicated City Pages -->\n`;
  for (const loc of dedicated) {
    sitemap += url(loc);
  }

  // Dynamic City Pages
  sitemap += `\n  <!-- City Pages -->\n`;
  for (const stateData of Object.values(states)) {
    const stateSlug = stateData.name.toLowerCase();
    for (const cityObj of stateData.cities || []) {
      const stateKey = Object.keys(states).find((k) => states[k] === stateData);
      if ((tierOf.get(`${stateKey}|${cityObj.slug}`)?.tier ?? 3) >= 3) continue;
      const locUrl = `${BASE_URL}/locations/${stateSlug}/${cityObj.slug}`;
      if (!dedicated.includes(locUrl)) {
        sitemap += url(locUrl);
      }
    }
  }

  sitemap += `</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
