/**
 * Single source of truth for city- and state-page meta.
 *
 * Plain ESM JavaScript so both scripts/prerender.js (Node) and the React
 * pages (Vite) import the exact same functions — the title/description a
 * crawler sees in the prerendered HTML is byte-identical to what SEO.tsx
 * sets on hydration.
 */

import locationsData from './locations-solar.json' with { type: 'json' };
import tiersData from './city-tiers.json' with { type: 'json' };

// Overland Park HQ number — city/state meta always quotes the HQ line;
// per-location NAP for schema lives in scripts/prerender.js.
const PHONE = '(816) 300-5781';

const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

// Homepage meta — shared by scripts/prerender.js and src/pages/Home.tsx.
// Description stays under 160 characters so Google doesn't truncate the
// phone number off the end.
export const homeMeta = {
  title: 'Solar Panel Installation & Battery Backup | Logic Solar',
  description: `Logic Solar is a solar energy company installing custom solar panels, battery backup, and commercial solar across six states. Free quotes: ${PHONE}.`,
};

// state slug ("texas") -> [stateKey ("tx"), state object]
const statesBySlug = new Map(
  Object.entries(locationsData.states).map(([key, state]) => [state.name.toLowerCase(), [key, state]])
);

const tierOf = new Map(tiersData.map((t) => [`${t.state}|${t.slug}`, t]));

// Flagship city pages keep the same meta their dedicated React pages set,
// so what crawlers see matches what hydration renders.
export const dedicatedCityMeta = {
  'texas/austin': {
    title: 'Austin Solar Company | Panels and Battery Backup | Logic Solar',
    description: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Austin and Central Texas. Request a custom solar estimate.',
  },
  'missouri/kansas-city': {
    title: 'Kansas City Solar Company | Logic Solar',
    description: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Kansas City, Missouri and the KC metro. Request a custom solar estimate.',
  },
  'kansas/wichita': {
    title: 'Wichita Solar Company | Panels and Battery Backup | Logic Solar',
    description: 'Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Wichita and south-central Kansas. Request a custom solar estimate.',
  },
};

/**
 * Meta for a state hub page, e.g. buildStateMeta('kansas').
 * Returns { title, description, h1 } or null for an unknown state.
 */
export function buildStateMeta(stateSlug) {
  const entry = statesBySlug.get(String(stateSlug).toLowerCase());
  if (!entry) return null;
  const [, state] = entry;
  return {
    title: `${state.name} Solar Installation | Panels, Battery & Commercial | Logic Solar`,
    description: `Solar panel installation across ${state.name}: custom-engineered systems, battery backup, and commercial solar. ~${state.sunlightDays} sunny days a year. Free quotes: ${PHONE}.`,
    h1: `Solar Installation in ${state.name}`,
  };
}

/**
 * Meta for a city page, e.g. buildCityMeta('kansas', 'olathe').
 * Returns { title, description, h1, kw } or null for an unknown or
 * unserved (tier 3) city. `kw` is the capitalized primary keyword the
 * prerender body copy also uses.
 */
export function buildCityMeta(stateSlug, citySlug) {
  const entry = statesBySlug.get(String(stateSlug).toLowerCase());
  if (!entry) return null;
  const [stateKey, state] = entry;
  const slug = String(citySlug).toLowerCase();
  const city = state.cities.find((c) => c.slug === slug);
  const tier = tierOf.get(`${stateKey}|${slug}`);
  if (!city || !tier || tier.tier >= 3) return null;

  const kw = cap(city.keywords?.primary || 'solar installation');
  const dedicated = dedicatedCityMeta[`${state.name.toLowerCase()}/${slug}`];
  return {
    title: dedicated ? dedicated.title : `${kw} in ${city.city}, ${stateKey.toUpperCase()} | Logic Solar`,
    description: dedicated ? dedicated.description :
      `${kw} in ${city.city}, ${state.name} — ${tier.county} County. Custom-engineered by our ${tier.nearestAnchor} team. Free quotes: ${PHONE}.`,
    h1: `${kw} in ${city.city}, ${state.name}`,
    kw,
  };
}
