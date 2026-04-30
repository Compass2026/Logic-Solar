import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CityTemplate } from '../components/CityTemplate';
import locationsData from '../data/locations-solar.json';

export const CityPage = () => {
  const { state, city } = useParams<{ state: string; city: string }>();

  // Format city nicely: e.g. "austin" -> "Austin", "san-antonio" -> "San Antonio"
  const formatName = (str: string) => 
    str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const formattedCity = city ? formatName(city) : '';
  const formattedState = state ? state.toUpperCase() : '';

  // Check if state exists in our JSON
  const stateKey = state?.toLowerCase() as keyof typeof locationsData.states;
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
