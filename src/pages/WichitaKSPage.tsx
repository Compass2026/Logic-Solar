import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Sun, 
  ShieldCheck, 
  Zap, 
  Phone, 
  Mail, 
  ArrowRight, 
  Building2, 
  Battery, 
  Wrench, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  HelpCircle, 
  FileText, 
  Layers, 
  ExternalLink, 
  Clock, 
  Sparkles,
  ChevronDown,
  Lock,
  Check,
  Tractor,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { TrustStrip } from '../components/TrustStrip';
// Projects and FAQ copy live in ../data/wichitaHub.js, shared with the
// Wichita hub sub-pages and scripts/prerender.js.
import { WICHITA_FAQS, WICHITA_PROJECTS } from '../data/wichitaHub';

// Wichita Metro & South-Central Kansas Communities
const WICHITA_METRO_COMMUNITIES = [
  { name: 'Wichita', slug: 'wichita', isHub: true },
  { name: 'Andover', slug: 'andover' },
  { name: 'Derby', slug: 'derby' },
  { name: 'Haysville', slug: 'haysville' },
  { name: 'Maize', slug: 'maize' },
  { name: 'Goddard', slug: 'goddard' },
  { name: 'Bel Aire', slug: 'bel-aire' },
  { name: 'Park City', slug: 'park-city' },
  { name: 'Valley Center', slug: 'valley-center' },
  { name: 'Kechi', slug: 'kechi' },
  { name: 'Mulvane', slug: 'mulvane' },
  { name: 'Rose Hill', slug: 'rose-hill' },
  { name: 'Clearwater', slug: 'clearwater' },
  { name: 'Cheney', slug: 'cheney' },
  { name: 'Colwich', slug: 'colwich' },
  { name: 'Eastborough', slug: 'eastborough' }
];

const SOUTH_CENTRAL_KS_COMMUNITIES = [
  { name: 'Augusta', slug: 'augusta' },
  { name: 'El Dorado', slug: 'el-dorado' },
  { name: 'Newton', slug: 'newton' },
  { name: 'Hutchinson', slug: 'hutchinson' },
  { name: 'Wellington', slug: 'wellington' },
  { name: 'Winfield', slug: 'winfield' },
  { name: 'Arkansas City', slug: 'arkansas-city' }
];

// Verified Local Customer Reviews Data Structure
const WICHITA_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Marcus & Ellen B.',
    city: 'Wichita, KS (Bradley Fair / East Wichita)',
    type: 'Residential Solar & Battery Storage',
    source: 'Verified Customer Review',
    date: 'Spring 2026',
    rating: 5,
    text: 'Logic Solar did an outstanding job on our Wichita home. Their team walked us through the entire Evergy Kansas Central interconnection process, handled all municipal permits, and engineered a solar array that looks incredible on our roof. Our summer electric bills have dropped drastically.'
  },
  {
    id: 'rev-2',
    name: 'Garth H.',
    city: 'Andover, KS',
    type: 'Suburban Residential Installation',
    source: 'Verified Customer Review',
    date: 'Winter 2025',
    rating: 5,
    text: 'Straightforward engineering advice with zero pressure. Logic Solar evaluated our actual 12-month power bills rather than pushing a pre-packaged system. The installation crew was meticulous, clean, and completed the job right on schedule.'
  },
  {
    id: 'rev-3',
    name: 'Kendra S.',
    city: 'Derby, KS',
    type: 'Residential Battery Integration',
    source: 'Verified Customer Review',
    date: 'Fall 2025',
    rating: 5,
    text: 'The battery backup system Logic Solar installed has given our family complete peace of mind during severe weather. When storm outages hit Derby, our essential circuits stay powered seamlessly.'
  }
];

export const WichitaKSPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State for Final Lead Intake
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    avgBill: '$150 - $300',
    propertyType: 'Residential',
    mountType: 'Roof Mount',
    batteryInterest: 'Yes',
    utilityProvider: 'Evergy Kansas Central'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission / trigger confirmation state
    setFormSubmitted(true);
  };

  // Canonical & Page Meta Data
  const canonicalUrl = "https://www.logic-solar.com/locations/kansas/wichita";
  const metaTitle = "Wichita Solar Company | Panels and Battery Backup | Logic Solar";
  const metaDescription = "Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Wichita and south-central Kansas. Request a custom solar estimate.";
  const ogImageUrl = "https://www.logic-solar.com/images/kansas-hero.jpg";

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.logic-solar.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Areas",
        "item": "https://www.logic-solar.com/locations/kansas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kansas",
        "item": "https://www.logic-solar.com/locations/kansas"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Wichita",
        "item": canonicalUrl
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Wichita Solar Panel & Battery Backup Installation",
    "serviceType": "Solar Energy System & Battery Storage Installation",
    "description": metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Logic Solar",
      "telephone": "(816) 300-5781",
      "email": "sales@logic-solar.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7300 W 110th St, Plaza 1, 7th Floor",
        "addressLocality": "Overland Park",
        "addressRegion": "KS",
        "postalCode": "66210",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Wichita", "sameAs": "https://en.wikipedia.org/wiki/Wichita,_Kansas" },
      { "@type": "City", "name": "Andover" },
      { "@type": "City", "name": "Derby" },
      { "@type": "City", "name": "Haysville" },
      { "@type": "City", "name": "Maize" },
      { "@type": "City", "name": "Goddard" },
      { "@type": "City", "name": "Bel Aire" },
      { "@type": "City", "name": "Park City" },
      { "@type": "City", "name": "Valley Center" },
      { "@type": "AdministrativeArea", "name": "Sedgwick County" }
    ],
    "url": canonicalUrl
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": WICHITA_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl
  };

  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        ogImage={ogImageUrl}
        schema={[breadcrumbSchema, serviceSchema, faqSchema, webPageSchema]}
      />

      {/* 1. BREADCRUMBS */}
      <nav className="bg-brand-dark border-b border-white/10 py-3 text-sm text-white/70 relative z-10" aria-label="Breadcrumb">
        <div className="container-custom flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-gold transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <Link to="/locations/kansas" className="hover:text-brand-gold transition-colors">
            Service Areas
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <Link to="/locations/kansas" className="hover:text-brand-gold transition-colors">
            Kansas
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <span className="text-brand-gold font-medium" aria-current="page">
            Wichita
          </span>
        </div>
      </nav>

      {/* 2. WICHITA HERO SECTION */}
      <section className="relative min-h-[85vh] bg-brand-dark flex items-center pt-12 pb-20 overflow-hidden">
        {/* Background Image with Ambient Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/kansas-hero.jpg" 
            alt="Logic Solar rooftop solar panel installation serving Wichita Kansas"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-extrabold uppercase tracking-wider mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>Serving Wichita and South-Central Kansas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Wichita Solar Company for Homes and Businesses
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 font-normal max-w-2xl">
              Logic Solar designs and installs custom solar panel, battery storage and commercial energy systems throughout Wichita and south-central Kansas. From property evaluation and engineering to permitting, installation and utility approval, our team manages the complete process.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a 
                href="#wichita-quote-form" 
                className="btn-gold text-center py-4 px-8 text-base font-extrabold rounded-xl shadow-lg hover:shadow-brand-gold/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get My Free Solar Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="tel:8163005781" 
                className="bg-white/10 hover:bg-white/20 text-white text-center py-4 px-8 text-base font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-brand-gold" />
                <span>Call (816) 300-5781</span>
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/70 font-medium">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <span>Serving Wichita and south-central Kansas with custom engineering & battery storage.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL TRUST BAR */}
      <section className="bg-brand-dark border-y border-white/10 py-10 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center text-center p-3">
              <ShieldCheck className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">25-Year Workmanship Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <CheckCircle2 className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">Licensed & Insured</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <Sun className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">Residential & Commercial</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <Battery className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">Solar & Battery Specialists</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <Star className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">4.9-Star Customer Rating</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <Zap className="w-7 h-7 text-brand-gold mb-2" />
              <span className="text-white font-bold text-sm">Custom-Engineered Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WICHITA SOLAR INTRODUCTION */}
      <section className="py-20 bg-white text-brand-dark">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Custom Solar Panel Engineering in Wichita, Kansas
            </h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
            <p>
              As a dedicated <strong>solar company in Wichita</strong> and south-central Kansas, Logic Solar brings custom-engineered renewable energy solutions to homeowners, commercial property developers, and agricultural operators across Sedgwick County and neighboring areas.
            </p>
            <p>
              Wichita properties vary significantly in roof orientation, slope, age, shading conditions, electrical service panel capacity, and annual power consumption patterns. A high-performance solar system cannot be designed using standard pre-packaged kits or generic assumptions. Our engineering team conducts a thorough property-specific analysis based on your actual 12-month utility usage history, roof geometry, available sun exposure, and backup-power priorities.
            </p>
            <p>
              Logic Solar manages every phase of the project internally—from initial drone site assessments and structural calculations to municipal building permits, Evergy Kansas Central utility interconnection filings, physical installation, and final meter activation. Whether you are seeking rooftop residential solar panels, an off-grid energy storage battery wall, or a commercial three-phase array, our team ensures your system delivers maximum reliability and long-term production.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY SOLAR REQUIRES LOCAL WICHITA PLANNING */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="max-w-3xl mb-14">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Local Environmental Factors</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Why Solar Requires Local Wichita Engineering
            </h2>
            <p className="text-slate-600 text-lg">
              Installing solar in south-central Kansas demands careful attention to severe weather patterns, local utility rules, and regional building standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <Zap className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">High Wind & Severe Thunderstorms</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Wichita experiences severe convective spring storms and high sustained wind gusts. Rooftop attachment hardware and ground-mount anchors must be structurally calculated for Kansas wind load pressures.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <AlertTriangle className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Hail Exposure & Temperature Cycles</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Seasonal hail exposure and extreme summer heat require Tier-1 solar modules with heavy tempered glass ratings and thermal coefficients that maintain high output during 100°F Kansas heatwaves.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <Battery className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Grid Outage & Storm Resilience</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Storm-driven power outages across Sedgwick County make battery backup integration essential for property owners who need uninterrupted power for medical equipment, refrigeration, or HVAC systems.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <Tractor className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Ground-Mount Acreage Opportunities</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Many properties surrounding Wichita, Andover, and Derby feature ample acreage. Fixed ground-mount solar arrays allow precise tilt optimization unconstrained by roof geometry.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <Building2 className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Electrical Service Capacity</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Older homes and commercial buildings in Wichita may require main electrical panel upgrades or busbar reviews to safely backfeed solar generation into the building's electrical service.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-dark font-bold mb-6">
                  <Compass className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Evergy Kansas Interconnection</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Navigating Evergy Kansas Central disconnect specifications, production meter requirements, and line diagrams ensures rapid inspection clearance and final Permission to Operate (PTO).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Weather Testing & Equipment Disclosure:</strong> Quality solar modules installed by Logic Solar are tested to recognized impact and environmental standards, but no rooftop product is immune to every possible storm. Logic Solar evaluates equipment ratings, attachment design, roof condition, and manufacturer warranty coverage prior to installation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SOLAR SERVICES IN WICHITA */}
      <section className="py-24 bg-brand-dark text-white relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Comprehensive Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Solar Installation & Energy Services in Wichita
            </h2>
            <p className="text-white/70 text-lg">
              Tailored clean energy solutions designed and installed for homeowners, businesses, and rural properties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Sun className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Residential Solar Installation</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Custom rooftop solar panel systems engineered for Wichita homes. Includes 12-month usage analysis, roof condition evaluation, panel layout optimization, microinverter wiring, visual concealment, and full utility interconnection.
                </p>
              </div>
              <Link 
                to="/locations/kansas/wichita/residential"
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Learn about residential solar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Commercial Solar Installation</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  High-output commercial rooftop and ground arrays for manufacturing plants, aviation suppliers, warehouses, retail centers, offices, churches, and agricultural facilities in Wichita. Optimized to reduce peak demand charges.
                </p>
              </div>
              <Link 
                to="/locations/kansas/wichita/commercial"
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Learn about commercial solar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Battery className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Battery Backup & Energy Storage</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Standard grid-tied solar shuts down during outages. Our battery storage integration (featuring Tesla Powerwall, FranklinWH, and Enphase) seamlessly powers critical circuits or whole-home loads during storm blackouts.
                </p>
              </div>
              <Link 
                to="/locations/kansas/wichita/battery"
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Explore battery backup options</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Ground-Mounted Solar Arrays</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Ideal for rural Sedgwick County properties, farms, acreage, or homes with shaded roofs. Ground-mounted solar provides unconstrained azimuth orientation, optimal tilt angles, and easy maintenance access.
                </p>
              </div>
              <Link 
                to="/services/installation" 
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Discover ground-mount solar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Solar Removal & Reinstallation</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Comprehensive detach-and-reset service for roofing upgrades or storm repairs. Our master technicians carefully unmount your solar panels, inspect electrical hardware, and reinstall the array after roof replacement.
                </p>
              </div>
              <Link 
                to="/services/installation" 
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Learn about detach & reset</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 6 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/50 transition-colors group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  <Tractor className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Commercial & Agricultural Energy</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Engineering heavy three-phase electrical connections, utility transformer reviews, production metering, trenching, and phased construction sequence planning for agricultural operations and multi-building facilities.
                </p>
              </div>
              <Link 
                to="/services/commercial" 
                className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm hover:underline"
              >
                <span>Explore agricultural solar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY WICHITA PROPERTY OWNERS CHOOSE LOGIC SOLAR */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">The Logic Difference</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Why Wichita Property Owners Choose Logic Solar
            </h2>
            <p className="text-slate-600 text-lg">
              We stand apart through rigorous custom engineering, Tier-1 equipment selection, and full lifecycle support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">01</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Usage-Based Engineering</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We analyze 12 months of actual utility consumption history rather than forcing arbitrary panel packages, ensuring your system accurately offsets your real annual kilowatt-hour demand.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">02</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Custom System Design</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every array is modeled in 3D to optimize solar radiation, avoid shade obstacles, respect setback codes, and deliver a clean, zero-conduit aesthetic tailored to your home's rooflines.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">03</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Premium Tier-1 Equipment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We deploy top-rated monocrystalline panels, microinverters, and concealed racking systems engineered to handle Kansas wind loads, hail impacts, and high summer ambient heat.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">04</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Advanced Battery Integration</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                As certified storage specialists, we design seamless battery backup architectures that keep your essential loads powered automatically during severe Midwestern storm blackouts.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">05</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">End-to-End Utility & Permitting</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our internal team prepares electrical single-lines, files city permits, coordinates municipal inspections, and completes Evergy Kansas Central interconnection documents on your behalf.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-brand-gold font-black text-xl mb-3">06</div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">25-Year Workmanship Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We stand behind our installations with long-term workmanship support, active system monitoring, clear client communication, and reliable local service commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EVERGY KANSAS CENTRAL AND UTILITY INTERCONNECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Utility Interconnection Framework</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Wichita Solar Installation & Utility Interconnection
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Wichita solar installations are primarily governed by <strong>Evergy Kansas Central</strong> interconnection policies. Some surrounding properties in Sedgwick and neighboring counties may be served by <strong>Sedgwick County Electric Cooperative</strong>, <strong>Butler Electric Cooperative</strong>, or municipal electric utilities.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Utility provider rules and rate structures directly dictate application forms, system sizing thresholds, disconnect requirements, production meter placement, engineering reviews, inspection procedures, and final Permission to Operate (PTO) timelines.
              </p>
              <div className="space-y-3 font-medium text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span>Confirming utility service territory & rate schedule</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span>Preparing site plans & electrical single-line diagrams</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span>Submitting formal utility interconnection filings</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span>Coordinating municipal electrical sign-offs & meter exchanges</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Interconnection Notice & Disclaimers</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Net metering credit rules and utility tariffs differ between investor-owned utilities like Evergy Kansas Central and rural electric cooperatives. Terminology such as net metering, net billing, and avoided-cost credit structures carry distinct legal and financial definitions.
              </p>
              <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-xs text-brand-gold font-semibold leading-relaxed">
                <strong className="block text-white mb-1">Important Utility Notice (2026 Source Update):</strong>
                Utility programs, rates, fees, export credit structures, and interconnection requirements can change. Logic Solar verifies the applicable utility and current requirements for each property before finalizing the system design.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WICHITA PERMITTING AND INSPECTIONS */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Wichita Permitting & Code Inspections
            </h2>
            <p className="text-slate-600 text-lg">
              Navigating municipal building codes, electrical regulations, and fire safety requirements.
            </p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Solar installation requirements vary depending on whether your property is located within the <strong>City of Wichita municipal limits</strong>, unincorporated <strong>Sedgwick County</strong>, or neighboring municipalities such as Andover, Derby, or Maize.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                  <span>Municipal Permits</span>
                </h4>
                <p className="text-sm text-slate-600">
                  Filing trade electrical and structural building permits with local city or county building departments prior to physical mounting.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                  <span>Fire & Setback Compliance</span>
                </h4>
                <p className="text-sm text-slate-600">
                  Ensuring solar module placement maintains required roof ridge, valley, and pathway access clearances for emergency personnel.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Logic Solar identifies the governing jurisdiction for your property before submitting plans, ensuring full structural compliance, equipment labeling, electrical grounding, and rapid inspection sign-offs.
            </p>
          </div>
        </div>
      </section>

      {/* 10. SOLAR COST IN WICHITA */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Transparent Pricing Analysis</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Understanding Solar Installation Costs in Wichita
            </h2>
            <p className="text-slate-600 text-lg">
              Total system investment is determined by property conditions, equipment specifications, and energy consumption.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-brand-dark mb-6">Key Variables Influencing System Investment</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>12-Month Utility Consumption</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Roof Pitch & Orientation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Structural Roof Condition</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Shade Mitigation Needs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Total Panel Quantity</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Microinverter Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Main Electrical Panel Upgrades</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Battery Storage Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Ground Mounting & Trenching</span>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto">
            Logic Solar provides honest, transparent property proposals comparing current electric bills, expected system production, equipment life, and backup power goals—without misleading price-per-watt averages or exaggerated savings promises.
          </p>
        </div>
      </section>

      {/* 11. RESIDENTIAL AND COMMERCIAL INCENTIVES */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Residential & Commercial Solar Incentives
            </h2>
            <p className="text-slate-600 text-lg">
              Understanding current federal, state, and commercial clean energy incentive frameworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-extrabold uppercase tracking-wider mb-4">
                  Residential Projects
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Homeowner Clean Energy Guidance</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Federal and local clean energy incentive rules have changed for residential projects placed in service in 2026. While state and local utility policies vary, homeowners should consult a qualified tax professional to evaluate current tax eligibility, deductions, or utility program incentives applicable to their specific financial situation.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 font-medium">
                Note: Logic Solar provides educational incentive context, not official tax advice.
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-extrabold uppercase tracking-wider mb-4">
                  Commercial & Agricultural
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Business Tax & Grant Programs</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Qualifying commercial, industrial, and agricultural enterprises may take advantage of federal commercial clean energy tax incentives, MACRS accelerated depreciation, and USDA REAP grants under separate commercial tax regulations. Eligibility depends on entity type, construction timing, prevailing wage rules, domestic content, and energy community status.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 font-medium">
                Recommend review with a CPA or corporate tax counsel prior to contract execution.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BATTERY BACKUP FOR WICHITA WEATHER AND OUTAGES */}
      <section className="py-20 bg-brand-dark text-white relative">
        <div className="container-custom max-w-4xl text-center">
          <Battery className="w-16 h-16 text-brand-gold mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Battery Storage for Wichita Weather Resilience
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Standard grid-tied solar panels do not operate during a power outage. Adding a battery backup system (such as Tesla Powerwall or Enphase IQ Battery) ensures automatic, instant transfer to stored power when Midwestern severe weather knocks out the grid.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left mb-10">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="font-bold text-brand-gold mb-2">Essential Circuits</h4>
              <p className="text-xs text-white/70">Powers refrigeration, medical equipment, WiFi routers, and home lighting.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="font-bold text-brand-gold mb-2">Critical HVAC & Pumps</h4>
              <p className="text-xs text-white/70">Custom-configured for sumps, well pumps, or high-efficiency heat pumps.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="font-bold text-brand-gold mb-2">Generator Integration</h4>
              <p className="text-xs text-white/70">Combines solar, battery storage, and automated backup generators for multi-day outages.</p>
            </div>
          </div>

          <a 
            href="#wichita-quote-form" 
            className="btn-gold inline-flex items-center gap-2 py-4 px-8 font-extrabold text-base rounded-xl shadow-lg"
          >
            <span>Design My Solar and Backup System</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 13. RECENT WICHITA-AREA SOLAR PROJECTS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Verified Local Installations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Recent Wichita-Area Solar Projects
            </h2>
            <p className="text-slate-600 text-lg">
              Explore custom residential, commercial, and agricultural solar arrays engineered across south-central Kansas.{' '}
              <Link to="/locations/kansas/wichita/projects" className="text-brand-gold font-bold hover:underline">View all Wichita projects</Link>.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {WICHITA_PROJECTS.map(project => (
              <div key={project.id} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img 
                      src={project.image} 
                      alt={`${project.type} project in ${project.city}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark/90 text-brand-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.city}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{project.type}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">{project.summary}</p>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">System Size:</span>
                        <span className="font-bold text-brand-dark">{project.systemSize}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">Panels:</span>
                        <span className="font-semibold">{project.panels}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">Battery:</span>
                        <span className="font-semibold">{project.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Utility:</span>
                        <span className="font-semibold">{project.utility}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a 
                    href="#wichita-quote-form" 
                    className="w-full py-2.5 bg-brand-dark text-white text-xs font-bold rounded-xl text-center block hover:bg-brand-gold hover:text-brand-dark transition-colors"
                  >
                    Request Similar Custom Estimate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. WICHITA CUSTOMER REVIEWS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Verified Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              What Wichita-Area Customers Say
            </h2>
            <p className="text-slate-600 text-lg">
              Hear from homeowners and property owners across Wichita, Andover, and Derby.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {WICHITA_REVIEWS.map(rev => (
              <div key={rev.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-bold text-brand-dark text-base">{rev.name}</div>
                  <div className="text-xs text-brand-gold font-bold">{rev.city}</div>
                  <div className="text-xs text-slate-400 mt-1">{rev.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. WICHITA SERVICE AREA */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Wichita Metro & South-Central Kansas Service Area
            </h2>
            <p className="text-slate-600 text-lg">
              Logic Solar provides full engineering, installation, and battery backup support across Sedgwick and neighboring counties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-gold" />
                <span>Wichita Metro Communities</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                {WICHITA_METRO_COMMUNITIES.map(c => (
                  <div key={c.slug} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-gold" />
                <span>Broader South-Central Kansas</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
                {SOUTH_CENTRAL_KS_COMMUNITIES.map(c => (
                  <div key={c.slug} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. THE LOGIC SOLAR PROCESS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Step-by-Step Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              The Logic Solar Installation Process
            </h2>
            <p className="text-white/70 text-lg">
              A structured 5-step engineering workflow ensuring seamless quality from concept to activation.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center mb-4">1</div>
                <h3 className="font-bold text-white text-base mb-2">Energy Review</h3>
                <p className="text-xs text-white/70">Analyzing 12 months of utility usage, roof condition, and shading patterns.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center mb-4">2</div>
                <h3 className="font-bold text-white text-base mb-2">Custom Engineering</h3>
                <p className="text-xs text-white/70">Designing structural attachment, electrical single-lines, and equipment layouts.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center mb-4">3</div>
                <h3 className="font-bold text-white text-base mb-2">Permits & Utility</h3>
                <p className="text-xs text-white/70">Preparing city building permits and filing Evergy interconnection applications.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center mb-4">4</div>
                <h3 className="font-bold text-white text-base mb-2">Installation</h3>
                <p className="text-xs text-white/70">Master technician mounting of panels, microinverters, conduit, and battery walls.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center mb-4">5</div>
                <h3 className="font-bold text-white text-base mb-2">PTO & Activation</h3>
                <p className="text-xs text-white/70">Coordinating municipal inspection, utility meter exchange, and system activation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 17. SOLAR FOR WICHITA BUSINESSES */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Commercial Energy Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-6">
                Commercial Solar Systems for Wichita Businesses
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Logic Solar delivers high-yield commercial solar installations for manufacturing facilities, aviation suppliers, warehouses, distribution centers, retail properties, office buildings, churches, schools, and agricultural operations across south-central Kansas.
              </p>
              <div className="space-y-3 text-sm text-slate-700 font-medium mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  <span>Interval usage data & peak demand charge analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  <span>Ballasted flat roof & ground-mount array design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  <span>Three-phase electrical infrastructure review</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  <span>Minimal operational disruption during construction</span>
                </div>
              </div>
              <a 
                href="#wichita-quote-form" 
                className="btn-gold inline-flex items-center gap-2 py-3.5 px-7 font-extrabold rounded-xl shadow-md text-sm"
              >
                <span>Request a Commercial Solar Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto h-full min-h-[350px]">
              <img 
                src="/images/groundmount-solar.jpg" 
                alt="Commercial solar panel installation in south-central Kansas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 18. ROOF CONDITION AND SOLAR INSTALLATION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Roof Condition & Solar Installation Planning
            </h2>
            <p className="text-slate-600 text-lg">
              Evaluating roof structural integrity, age, material type, and future replacement needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
            <p>
              Installing solar on an aging roof that requires replacement within 2 to 5 years creates avoidable removal and reinstallation expenses. Prior to physical solar mounting, Logic Solar evaluates roof structural framing, shingle condition, underlayment integrity, metal seam types, or flat roof membrane condition.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-brand-dark mb-1">Pre-Installation Inspection</h4>
                <p className="text-xs text-slate-600">Identifying existing leaks, missing shingles, or structural sagging before solar mounting.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-brand-dark mb-1">Detach & Reset Planning</h4>
                <p className="text-xs text-slate-600">Coordinating with licensed roofing contractors for roof replacements or storm repairs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 19. WICHITA FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              Frequently Asked Questions About Wichita Solar
            </h2>
            <p className="text-slate-600 text-lg">
              Clear, direct answers regarding solar costs, utility rules, weather performance, and battery storage.
            </p>
          </div>

          <div className="space-y-4">
            {WICHITA_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-brand-dark text-base sm:text-lg leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 20. LOCAL CONTACT SECTION */}
      <section className="py-20 bg-slate-900 text-white border-t border-white/10">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-gold font-extrabold uppercase tracking-wider text-xs block mb-2">Regional Kansas Hub</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Talk With a Wichita Solar Specialist
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Logic Solar serves Wichita and south-central Kansas from our Kansas regional office in Overland Park. Contact our engineering team today to review your property's solar potential.
              </p>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Kansas Regional Business Address</div>
                    <div className="text-white/70">7300 W 110th St, Plaza 1, 7th Floor</div>
                    <div className="text-white/70">Overland Park, KS 66210</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Phone Support</div>
                    <a href="tel:8163005781" className="text-brand-gold hover:underline font-bold">
                      (816) 300-5781
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Email Address</div>
                    <a href="mailto:sales@logic-solar.com" className="text-brand-gold hover:underline">
                      sales@logic-solar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm text-center">
              <h3 className="text-xl font-bold text-white mb-4">Serving Wichita & South-Central Kansas</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Our specialized installation crews perform property evaluations, drone site surveys, physical rooftop and ground mounting, and utility interconnection filings throughout Wichita and surrounding communities.
              </p>
              <a 
                href="tel:8163005781" 
                className="btn-gold py-3.5 px-8 font-extrabold text-sm rounded-xl inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call (816) 300-5781</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 21. FINAL CONVERSION SECTION */}
      <section id="wichita-quote-form" className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-5xl">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-brand-gold p-10 lg:p-12 flex flex-col justify-between text-brand-dark">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                  See Whether Solar Makes Sense for Your Wichita Property
                </h2>
                <p className="font-medium text-brand-dark/80 text-sm leading-relaxed mb-8">
                  Logic Solar will review your utility history, property conditions, roof orientation, solar irradiance, battery needs, utility requirements, and project goals with zero sales pressure.
                </p>
              </div>

              <div className="space-y-4 text-xs font-bold">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-black">1</div>
                  <span>Property & Utility Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-black">2</div>
                  <span>Custom Engineering Plan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-black">3</div>
                  <span>No-Obligation Estimate</span>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-8 lg:p-12">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">Estimate Request Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                    Thank you! A Wichita solar specialist from Logic Solar will review your property details and contact you shortly.
                  </p>
                  <a href="tel:8163005781" className="btn-gold py-3 px-6 text-sm font-extrabold rounded-xl inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Call (816) 300-5781</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-xl font-extrabold text-brand-dark mb-4">Request Your Wichita Solar Estimate</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input 
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(316) 555-0199"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Property Address *</label>
                      <input 
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Wichita, KS"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
                      <select 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Agricultural">Agricultural</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mount Interest</label>
                      <select 
                        name="mountType"
                        value={formData.mountType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                      >
                        <option value="Roof Mount">Roof Mount</option>
                        <option value="Ground Mount">Ground Mount</option>
                        <option value="Undecided">Undecided</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Battery Backup?</label>
                      <select 
                        name="batteryInterest"
                        value={formData.batteryInterest}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Unsure">Unsure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Average Monthly Electric Bill</label>
                      <select 
                        name="avgBill"
                        value={formData.avgBill}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                      >
                        <option value="Under $150">Under $150</option>
                        <option value="$150 - $300">$150 - $300</option>
                        <option value="$300 - $500">$300 - $500</option>
                        <option value="$500+">$500+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Utility Provider (If Known)</label>
                      <select 
                        name="utilityProvider"
                        value={formData.utilityProvider}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                      >
                        <option value="Evergy Kansas Central">Evergy Kansas Central</option>
                        <option value="Sedgwick County Electric Coop">Sedgwick County Electric Coop</option>
                        <option value="Butler Electric Coop">Butler Electric Coop</option>
                        <option value="Municipal Utility">Municipal Utility</option>
                        <option value="Other / Don't Know">Other / Don't Know</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-brand-gold text-brand-dark font-extrabold text-base rounded-xl shadow-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Get My Free Solar Estimate</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      100% Secure & Confidential
                    </span>
                    <span>No Sales Pressure</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
