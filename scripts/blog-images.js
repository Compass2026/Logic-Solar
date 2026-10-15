// After `vite build`: responsive WebP variants of each blog hero image, next
// to the original in dist/ (the original stays the <img> fallback and the
// file the CRM's live verification checks).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { heroVariants } from '../src/content/compass-blog-core.js';
import { loadBlogForBuild } from './blog-build.js';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
let written = 0;
for (const post of loadBlogForBuild()) {
  if (!post.heroImage) continue;
  const source = path.join(DIST, post.heroImage.src.slice(1));
  for (const v of heroVariants(post.heroImage)) {
    await sharp(source).resize({ width: v.width }).webp({ quality: 78 }).toFile(path.join(DIST, v.src.slice(1)));
    written++;
  }
}
console.log(`[blog-images] wrote ${written} hero variants`);
