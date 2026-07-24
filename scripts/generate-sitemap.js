import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://logic-solar.com';

const generateSitemap = () => {
  const dataPath = path.resolve(__dirname, '../src/data/locations-solar.json');
  const locationsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url><loc>${BASE_URL}/</loc><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/about</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/services/installation</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/services/battery</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/services/commercial</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/financing</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/faq</loc><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/contact</loc><priority>0.8</priority></url>
  
  <!-- State Hubs -->
  <url><loc>${BASE_URL}/locations/texas</loc><priority>0.9</priority></url>
  <url><loc>${BASE_URL}/locations/oklahoma</loc><priority>0.9</priority></url>
  <url><loc>${BASE_URL}/locations/kansas</loc><priority>0.9</priority></url>
  <url><loc>${BASE_URL}/locations/illinois</loc><priority>0.9</priority></url>
  <url><loc>${BASE_URL}/locations/missouri</loc><priority>0.9</priority></url>
`;

  const stateSlugMap = {
    'tx': 'texas',
    'ok': 'oklahoma',
    'ks': 'kansas',
    'il': 'illinois',
    'mo': 'missouri',
    'co': 'colorado'
  };

  // Dedicated High Priority Location Pages
  sitemap += `  <url><loc>${BASE_URL}/locations/texas/austin</loc><priority>0.9</priority></url>\n`;
  sitemap += `  <url><loc>${BASE_URL}/locations/missouri/kansas-city</loc><priority>0.9</priority></url>\n`;
  sitemap += `  <url><loc>${BASE_URL}/locations/kansas/wichita</loc><priority>0.9</priority></url>\n`;

  // Dynamic City Pages
  const states = locationsData.states;
  for (const [stateKey, stateData] of Object.entries(states)) {
    const fullStateSlug = stateSlugMap[stateKey] || stateKey;
    const cities = stateData.cities || [];
    cities.forEach(cityObj => {
      const citySlug = cityObj.slug;
      const locUrl = `${BASE_URL}/locations/${fullStateSlug}/${citySlug}`;
      if (
        locUrl !== `${BASE_URL}/locations/texas/austin` &&
        locUrl !== `${BASE_URL}/locations/missouri/kansas-city` && 
        locUrl !== `${BASE_URL}/locations/kansas/wichita`
      ) {
        sitemap += `  <url><loc>${locUrl}</loc><priority>0.7</priority></url>\n`;
      }
    });
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
