// The Compass blog's articles for the React app. The contract, validation
// and rendering rules live in compass-blog-core.js (shared with the build
// scripts); this module types them and loads data/blog-posts.json.
import releases from '../../data/blog-posts.json';
import { loadReleasedArticles } from './compass-blog-core.js';

export type Inline = { t: 'text' | 'strong' | 'em'; v: string } | { t: 'link'; v: string; href: string };
export type Block = { t: 'h2' | 'h3' | 'p'; inline: Inline[] } | { t: 'ul' | 'ol'; items: Inline[][] };
export type HeroImage = { src: string; alt: string; width: number; height: number; illustrative: boolean };
export type BlogArticle = {
  slug: string; title: string; description: string; metaTitle: string; h1: string;
  datePublished: string; dateModified: string; bodyMarkdown: string; blocks: Block[];
  cta: { text: string; url: string | null }; heroImage: HeroImage | null;
  compass: { draft_id: string; release_hash: string; keyword_id: string; version: number };
  preview: boolean; readMinutes: number;
};

// The production build itself (scripts/prerender.js) refuses preview
// fixtures, so the browser bundle can accept whatever passed the build.
export const BLOG_POSTS: BlogArticle[] = loadReleasedArticles(releases, { allowPreviewFixtures: true }) as BlogArticle[];
export const findArticle = (slug: string | undefined) => BLOG_POSTS.find((p) => p.slug === slug);
