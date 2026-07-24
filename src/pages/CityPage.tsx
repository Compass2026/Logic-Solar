import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CityTemplate } from '../components/CityTemplate';
import { KansasCityMOPage } from './KansasCityMOPage';
import { siteData } from '../data/siteData';
import locationsData from '../data/locations-solar.json';

export const CityPage = () => {
  const { state, city } = useParams<{ state: string; city: string }>();

  // Dedicated Kansas City, Missouri override
  if (state?.toLowerCase() === 'missouri' && city?.toLowerCase() === 'kansas-city') {
    return <KansasCityMOPage />;
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

  // Create a dynamic location object for CityTemplate
  const location = {
    city: formattedCity,
    state: formattedState,
    // The SEO component automatically appends " | Logic Solar"
    title: `Expert Solar Panel Installation in ${formattedCity}, ${formattedState}`,
    description: `Discover top-rated solar panels, battery backup, and energy independence solutions in ${formattedCity}, ${formattedState}. Save on local utility costs with Logic Solar.`,
    highlights: [
      `${formattedState} Solar Incentives`,
      `${formattedCity} Local Teams`,
      `Battery Backup Solutions`,
      `Maximum Energy Independence`
    ],
    backgroundImage: stateData?.heroImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"
  };

  return <CityTemplate location={location} stateData={stateData} />;
};
