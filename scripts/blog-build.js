// The build's view of the Compass blog: data/blog-posts.json validated by
// the shared core. A PRODUCTION build (Vercel production, or
// COMPASS_BLOG_PRODUCTION=1) refuses preview fixtures, so an unapproved
// sample can never reach www.logic-solar.com even if it were merged.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadReleasedArticles } from '../src/content/compass-blog-core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const isProductionBuild = () => process.env.VERCEL_ENV === 'production' || process.env.COMPASS_BLOG_PRODUCTION === '1';

export function loadBlogForBuild() {
  const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/blog-posts.json'), 'utf8'));
  const posts = loadReleasedArticles(raw, { allowPreviewFixtures: !isProductionBuild() });
  for (const p of posts) {
    if (p.heroImage && !fs.existsSync(path.resolve(__dirname, '../public', p.heroImage.src.slice(1)))) {
      throw new Error(`Compass blog: hero image ${p.heroImage.src} is not committed in public/`);
    }
  }
  return posts;
}
