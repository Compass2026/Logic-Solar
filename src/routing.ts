// Route helpers for content the Compass CRM publishes. Blog URLs end in a
// slash, matching their canonical (https://www.logic-solar.com/blog/{slug}/),
// which is the route the CRM records for this site: /blog/{slug}/.
export { SITE_URL, BLOG_INDEX_PATH, blogPath } from './content/compass-blog-core.js';
export const canonicalFor = (path: string) => `https://www.logic-solar.com${path}`;
