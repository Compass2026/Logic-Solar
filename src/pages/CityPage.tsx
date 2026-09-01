import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CityTemplate } from '../components/CityTemplate';
import { KansasCityMOPage } from './KansasCityMOPage';
import { WichitaKSPage } from './WichitaKSPage';
import { AustinTXPage } from './AustinTXPage';
import { siteData } from '../data/siteData';
import locationsData from '../data/locations-solar.json';
import { isServedCity } from '../data/cityTiers';
import { buildCityMeta } from '../data/pageMeta';

export const CityPage = () => {
  const { state, city } = useParams<{ state: string; city: string }>();

  // Dedicated Austin, Texas override
  if (state?.toLowerCase() === 'texas' && city?.toLowerCase() === 'austin') {
    return <AustinTXPage />;
  }

  // Dedicated Kansas City, Missouri override
  if (state?.toLowerCase() === 'missouri' && city?.toLowerCase() === 'kansas-city') {
    return <KansasCityMOPage />;
  }

  // Dedicated Wichita, Kansas override
  if (state?.toLowerCase() === 'kansas' && city?.toLowerCase() === 'wichita') {
    return <WichitaKSPage />;
  }

  // Format city nicely: e.g. "austin" -> "Austin", "san-antonio" -> "San Antonio"
  const formatName = (str: string) => 
    str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const formattedCity = city ? formatName(city) : '';

  // The URL uses the full state slug (e.g. "texas"), but the JSON is keyed by
  // 2-letter abbreviation (e.g. "tx"). Resolve via siteData.locations.
  const locationEntry = siteData.locations.find(l => l.slug === state);
  if (!locationEntry) return <Navigate to="/" replace />;

  const formattedState = locationEntry.state; // e.g. "TX"
  const stateKey = locationEntry.state.toLowerCase() as keyof typeof locationsData.states;
  const stateData = locationsData.states[stateKey];

  if (!stateData) {
    return <Navigate to="/" replace />;
  }

  // Tier 3 cities (outside the ~2-hour service radius) redirect to the state hub,
  // mirroring the 301s in vercel.json.
  if (city && !isServedCity(stateKey, city)) {
    return <Navigate to={`/locations/${state}`} replace />;
  }

  // Same meta the prerender script writes for this route — hydration must
  // set identical strings, or crawlers see two competing titles.
  const meta = buildCityMeta(state ?? '', city ?? '');
  if (!meta) return <Navigate to={`/locations/${state}`} replace />;

  // Create a dynamic location object for CityTemplate
  const location = {
    city: formattedCity,
    state: formattedState,
    // Visible hero copy — matches the prerendered <h1> for this route.
    title: meta.h1,
    description: meta.description,
    highlights: [
      `${formattedState} Solar Incentives`,
      `${formattedCity} Local Teams`,
      `Battery Backup Solutions`,
      `Maximum Energy Independence`
    ],
    backgroundImage: stateData?.heroImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"
  };

  return (
    <CityTemplate
      location={location}
      seo={{ title: meta.title, description: meta.description }}
      stateData={stateData}
    />
  );
};
