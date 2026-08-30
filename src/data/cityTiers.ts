import tiersData from './city-tiers.json';

export interface CityTier {
  state: string;      // state key, e.g. "tx"
  slug: string;       // city slug, e.g. "round-rock"
  city: string;
  tier: 1 | 2 | 3;    // 1 = flagship metro, 2 = in service radius, 3 = redirected to state hub
  county: string;
  nearestAnchor: string;
  anchorMiles: number;
}

export const CITY_TIERS = tiersData as CityTier[];

const byKey = new Map<string, CityTier>(
  CITY_TIERS.map((t) => [`${t.state}|${t.slug}`, t])
);

export const getCityTier = (stateKey: string, slug: string): CityTier | undefined =>
  byKey.get(`${stateKey.toLowerCase()}|${slug.toLowerCase()}`);

// Tier 3 cities redirect to their state hub; only tiers 1-2 have pages.
export const isServedCity = (stateKey: string, slug: string): boolean => {
  const t = getCityTier(stateKey, slug);
  return t !== undefined && t.tier < 3;
};
