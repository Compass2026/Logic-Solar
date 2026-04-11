export interface InstallLocation {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  details?: string;
}

export const INSTALL_LOCATIONS: InstallLocation[] = [
  {
    id: 'st-louis-mo',
    city: 'St. Louis',
    state: 'MO',
    lat: 38.6270,
    lng: -90.1994,
    details: 'Custom residential solar installation with 24 panels.'
  },
  {
    id: 'kansas-city-mo',
    city: 'Kansas City',
    state: 'MO',
    lat: 39.0997,
    lng: -94.5786,
    details: 'Commercial rooftop system for local business.'
  },
  {
    id: 'springfield-il',
    city: 'Springfield',
    state: 'IL',
    lat: 39.7983,
    lng: -89.6445,
    details: 'Full home energy storage and solar integration.'
  },
  {
    id: 'chicago-il',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    lng: -87.6298,
    details: 'Urban solar solution for high-efficiency living.'
  },
  {
    id: 'kansas-city-ks',
    city: 'Kansas City',
    state: 'KS',
    lat: 39.1141,
    lng: -94.6275,
    details: 'Premium ground-mount installation on acreage.'
  },
  {
    id: 'wichita-ks',
    city: 'Wichita',
    state: 'KS',
    lat: 37.6872,
    lng: -97.3301,
    details: 'Residental solar and backup power solution.'
  },
  {
    id: 'oklahoma-city-ok',
    city: 'Oklahoma City',
    state: 'OK',
    lat: 35.4676,
    lng: -97.5164,
    details: 'Large scale residential energy project.'
  },
  {
    id: 'tulsa-ok',
    city: 'Tulsa',
    state: 'OK',
    lat: 36.1540,
    lng: -95.9928,
    details: 'Smart home energy management system.'
  },
  {
    id: 'dallas-tx',
    city: 'Dallas',
    state: 'TX',
    lat: 32.7767,
    lng: -96.7970,
    details: 'High-performance solar grid for modern estate.'
  },
  {
    id: 'austin-tx',
    city: 'Austin',
    state: 'TX',
    lat: 30.2672,
    lng: -97.7431,
    details: 'Eco-friendly solar array for sustainable home.'
  },
  {
    id: 'houston-tx',
    city: 'Houston',
    state: 'TX',
    lat: 29.7604,
    lng: -95.3698,
    details: 'Comprehensive solar and battery backup system.'
  }
];
