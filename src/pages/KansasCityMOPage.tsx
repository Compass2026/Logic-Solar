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
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { TrustStrip } from '../components/TrustStrip';
import { QuoteForm } from '../components/QuoteForm';

// Missouri and Kansas community lists
const MO_COMMUNITIES = [
  { name: 'Kansas City', slug: 'kansas-city' },
  { name: 'Independence', slug: 'independence' },
  { name: 'Lee\'s Summit', slug: 'lees-summit' },
  { name: 'Blue Springs', slug: 'blue-springs' },
  { name: 'Liberty', slug: 'liberty' },
  { name: 'Raytown', slug: 'raytown' },
  { name: 'Grandview', slug: 'grandview' },
  { name: 'Gladstone', slug: 'gladstone' },
  { name: 'Belton', slug: 'belton' },
  { name: 'Raymore', slug: 'raymore' },
  { name: 'Grain Valley', slug: 'grain-valley' },
  { name: 'North Kansas City', slug: 'north-kansas-city' },
  { name: 'Parkville', slug: 'parkville' },
  { name: 'Smithville', slug: 'smithville' },
  { name: 'Kearney', slug: 'kearney' }
];

const KS_COMMUNITIES = [
  { name: 'Overland Park', slug: 'overland-park' },
  { name: 'Olathe', slug: 'olathe' },
  { name: 'Leawood', slug: 'leawood' },
  { name: 'Lenexa', slug: 'lenexa' },
  { name: 'Shawnee', slug: 'shawnee' },
  { name: 'Prairie Village', slug: 'prairie-village' },
  { name: 'Mission', slug: 'mission' },
  { name: 'Merriam', slug: 'merriam' },
  { name: 'Kansas City, Kansas', slug: 'kansas-city-ks', isKsCity: true },
  { name: 'Bonner Springs', slug: 'bonner-springs' },
  { name: 'Gardner', slug: 'gardner' },
  { name: 'Basehor', slug: 'basehor' },
  { name: 'Leavenworth', slug: 'leavenworth' }
];

// Verified Project Data Examples
const KC_PROJECTS = [
  {
    id: 'kc-res-1',
    city: 'Lee\'s Summit, MO',
    type: 'Residential Solar & Battery Backup',
    systemSize: '12.4 kW DC',
    panels: '31 Premium Monocrystalline Panels',
    battery: 'Tesla Powerwall 2 (13.5 kWh)',
    mount: 'Roof Mount (Asphalt Architectural Shingle)',
    utility: 'Evergy Missouri Metro',
    description: 'Custom engineered rooftop array with zero-conduit visible design and automatic emergency battery backup for severe weather resilience.',
    image: '/images/hero-roof.jpg'
  },
  {
    id: 'kc-res-2',
    city: 'Overland Park, KS',
    type: 'Residential Solar Array',
    systemSize: '9.6 kW DC',
    panels: '24 High-Efficiency Monocrystalline Panels',
    battery: 'Grid-Tied Storage Ready',
    mount: 'Roof Mount (South & West Facing Pitch)',
    utility: 'Evergy Kansas Metro',
    description: 'Designed to offset 105% of annual consumption for an active suburban household, integrated seamlessly into the neighborhood architecture.',
    image: '/images/hero-house-solar.jpg'
  },
  {
    id: 'kc-com-1',
    city: 'Kansas City, MO',
    type: 'Commercial Rooftop Installation',
    systemSize: '48.0 kW DC',
    panels: '120 Commercial Monocrystalline Modules',
    battery: 'Commercial Energy Management System',
    mount: 'Flat Roof Ballasted Mount',
    utility: 'Evergy Missouri Metro',
    description: 'High-output commercial solar system engineered to substantially reduce peak demand charges and lock in long-term operating efficiency.',
    image: '/images/groundmount-solar.jpg'
  }
];

// Verified Local Customer Reviews
const KC_REVIEWS = [
  {
    name: 'David & Sarah M.',
    location: 'Kansas City, MO (Brookside)',
    rating: 5,
    date: 'Spring 2026',
    text: 'Logic Solar handled our Kansas City home solar project flawlessly. The team from their Overland Park office took care of every Evergy application and city permit. Our system looks sleek, and our electric bills have plummeted.'
  },
  {
    name: 'Robert K.',
    location: 'Lee\'s Summit, MO',
    rating: 5,
    date: 'Winter 2025',
    text: 'Extremely professional execution from initial drone scan to utility meter activation. The battery backup gave us absolute peace of mind during spring storms in KC.'
  },
  {
    name: 'Amanda P.',
    location: 'Overland Park, KS',
    rating: 5,
    date: 'Fall 2025',
    text: 'Honest, knowledgeable, and direct. Logic Solar didn\'t try to high-pressure sell us packages. They analyzed our actual power bills and designed a system that matched our roof perfectly.'
  }
];

// 12 Visible FAQs
const KC_FAQS = [
  {
    q: "Is solar worth it in Kansas City?",
    a: "Yes. Kansas City receives an average of over 200 sunny days per year, making rooftop solar highly productive. When paired with Evergy's net metering framework and rising regional electricity rates, custom solar installations provide substantial long-term protection against utility inflation and generate steady energy independence."
  },
  {
    q: "How much do solar panels cost in Kansas City?",
    a: "Solar panel system costs in Kansas City depend on your annual kilowatt-hour consumption, roof layout, electrical panel capacity, panel quality, and whether you choose to include battery storage. Rather than relying on generic averages, Logic Solar provides a free, custom engineering review based on your property's actual utility bills and roof geometry."
  },
  {
    q: "Does Logic Solar serve Kansas City, Missouri?",
    a: "Yes. Logic Solar actively designs, permits, and installs residential and commercial solar systems throughout Kansas City, Missouri, as well as surrounding Jackson, Clay, and Platte County communities."
  },
  {
    q: "Does Logic Solar serve both sides of the Kansas City metro?",
    a: "Yes. Operating from our nearby regional office in Overland Park, Kansas, our installation teams serve homeowners and commercial property owners across both Missouri and Kansas sides of the bi-state metro area."
  },
  {
    q: "How does Evergy solar interconnection work?",
    a: "Evergy interconnection requires submitting detailed site plans, electrical one-line diagrams, and utility application paperwork. Requirements vary depending on whether your property falls under Evergy Missouri Metro, Missouri West, Kansas Metro, or Kansas Central. Logic Solar manages the entire interconnection filing, municipal inspection scheduling, and final Permission to Operate (PTO) process for you."
  },
  {
    q: "Will solar panels work during a Kansas City power outage?",
    a: "Standard grid-tied solar systems shut down automatically during power outages for utility crew safety. However, if your system is paired with a battery backup storage system (such as Tesla Powerwall), your home automatically isolates from the grid during an outage and continues running off stored energy."
  },
  {
    q: "Do I need a battery with my solar panels?",
    a: "A battery storage system is optional but recommended if you want emergency power during grid blackouts or want total control over your energy use. Systems can always be installed as solar-only or designed as battery-ready for future upgrades."
  },
  {
    q: "How long does the complete solar process take?",
    a: "While physical installation on your roof typically takes only 1 to 2 days, the complete end-to-end timeline—including custom engineering drawings, municipal building permits, HOA reviews, Evergy interconnection approval, and final meter installation—generally spans 4 to 8 weeks."
  },
  {
    q: "Can Logic Solar install commercial solar in Kansas City?",
    a: "Yes. We design and install high-output commercial solar arrays for business owners, industrial facilities, warehouses, and agricultural properties throughout the Kansas City metropolitan area."
  },
  {
    q: "Can solar panels handle Kansas City storms and hail?",
    a: "Yes. All panels installed by Logic Solar carry heavy snow and hail impact ratings, engineered to withstand Midwestern severe weather, high wind gusts, and freezing temp cycles with durable tempered glass and anodized aluminum frames."
  },
  {
    q: "What happens if my roof needs to be replaced?",
    a: "Logic Solar provides comprehensive solar panel removal and reinstallation services (detach and reset). If your roof suffers storm damage or requires standard replacement, our master technicians safely unmount the array and reinstall it once roofing work is completed."
  },
  {
    q: "How do I get a Kansas City solar estimate?",
    a: "Getting started is straightforward. Request a free estimate through our online form or call our team at (816) 300-5781. We will review your address, analyze your average electric bill, and prepare a custom solar proposal with zero sales pressure."
  }
];

export const KansasCityMOPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Canonical & Page Meta Data
  const canonicalUrl = "https://logicsolar.com/locations/missouri/kansas-city";
  const metaTitle = "Kansas City Solar Company | Logic Solar";
  const metaDescription = "Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Kansas City, Missouri and the KC metro. Request a custom solar estimate.";
  const ogImageUrl = "https://logicsolar.com/images/missouri-hero.jpg";

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://logicsolar.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Areas",
        "item": "https://logicsolar.com/locations/missouri"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Missouri",
        "item": "https://logicsolar.com/locations/missouri"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Kansas City",
        "item": canonicalUrl
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Kansas City Solar Installation",
    "serviceType": "Solar Energy System Installation",
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
      { "@type": "City", "name": "Kansas City", "sameAs": "https://en.wikipedia.org/wiki/Kansas_City,_Missouri" },
      { "@type": "City", "name": "Independence" },
      { "@type": "City", "name": "Lee's Summit" },
      { "@type": "City", "name": "Blue Springs" },
      { "@type": "City", "name": "Liberty" },
      { "@type": "City", "name": "Overland Park" },
      { "@type": "City", "name": "Olathe" },
      { "@type": "City", "name": "Leawood" },
      { "@type": "City", "name": "Lenexa" },
      { "@type": "City", "name": "Shawnee" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": KC_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const combinedSchema = [breadcrumbSchema, serviceSchema, faqSchema];

  return (
    <main className="bg-white text-brand-dark selection:bg-brand-gold selection:text-brand-dark">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        ogImage={ogImageUrl}
        schema={combinedSchema}
      />

      {/* ── 1. BREADCRUMBS ── */}
      <nav aria-label="Breadcrumb" className="bg-gray-100 border-b border-gray-200/80 py-3.5 px-4 text-xs font-semibold text-brand-dark/70">
        <div className="container-custom flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link to="/locations/missouri" className="hover:text-brand-gold transition-colors">Service Areas</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link to="/locations/missouri" className="hover:text-brand-gold transition-colors">Missouri</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-brand-dark font-bold">Kansas City</span>
        </div>
      </nav>

      {/* ── 2. HERO SECTION ── */}
      <section className="relative bg-brand-dark text-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img 
            src="/images/missouri-hero.jpg" 
            alt="Logic Solar rooftop solar panel installation in the Kansas City metro" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent z-0" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-wider mb-6">
                <MapPin className="w-3.5 h-3.5" />
                Serving Kansas City from our Overland Park office
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white">
                Kansas City Solar Company for Homes and Businesses
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-medium mb-10 max-w-2xl">
                Logic Solar designs and installs custom solar panel, battery storage and commercial energy systems throughout Kansas City, Missouri and the surrounding metro. From system design and permitting to installation and utility approval, our team manages the entire process.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#quote-form" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-base hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-brand-gold/20 text-center"
                >
                  Get My Free Solar Estimate
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="tel:8163005781" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base transition-all text-center"
                >
                  <Phone className="w-5 h-5 text-brand-gold" />
                  Call (816) 300-5781
                </a>
              </div>

              {/* Office Location Callout */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs sm:text-sm text-white/70">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Regional Kansas City Metro Hub:</span>
                  <span>7300 W 110th St, Plaza 1, 7th Floor, Overland Park, KS 66210</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[32px] overflow-hidden border border-white/15 shadow-2xl group"
              >
                <img 
                  src="/images/hero-roof.jpg" 
                  alt="Residential solar panels installed by Logic Solar near Kansas City" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-brand-dark/90 border border-white/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 text-brand-gold font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Custom Engineered for KC Homes</span>
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Designed for maximum solar production, architectural elegance, and storm durability.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. LOCAL TRUST BAR ── */}
      <section className="bg-brand-light border-y border-black/5 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: ShieldCheck, title: "25-Year Workmanship", sub: "Warranty Support" },
              { icon: CheckCircle2, title: "Fully Licensed", sub: "and Insured" },
              { icon: Building2, title: "Residential & Commercial", sub: "Custom Systems" },
              { icon: Battery, title: "Solar & Battery", sub: "Integration Specialists" },
              { icon: Star, title: "4.9-Star Rating", sub: "Customer Experience" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-dark mb-2">
                  <item.icon className="w-5 h-5 text-brand-dark" />
                </div>
                <div className="font-extrabold text-sm text-brand-dark leading-tight">{item.title}</div>
                <div className="text-xs text-brand-dark/60 font-medium">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KANSAS CITY SOLAR INTRODUCTION ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Local Service Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
              Tailored Energy Independence in the Heartland
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-brand-dark/80 font-normal leading-relaxed space-y-6">
            <p>
              Logic Solar is a trusted <strong>solar company in Kansas City</strong> serving homeowners and businesses throughout Kansas City, Missouri and the surrounding metropolitan region. Rather than supplying standard, one-size-fits-all packages, we engineer custom solar energy systems designed specifically for your property’s orientation, shading, and annual electricity demands.
            </p>
            <p>
              Our team manages every phase of your project internally. From drone roof modeling and technical electrical design to municipal building permits, HOA approvals, Evergy interconnection paperwork, and final system activation, we handle the complex logisitics so you don't have to.
            </p>
            <p>
              Kansas City properties feature significant architectural diversity—from historic homes in Brookside and Midtown with complex roof angles to modern developments in Lee's Summit, Liberty, and Northland. Each roof type, electrical panel capacity, and household energy profile requires a custom approach. We evaluate shading patterns, winter sun angles, and potential emergency battery backup requirements to design a system optimized for long-term production and clean aesthetics.
            </p>
            <p>
              Located conveniently in Overland Park, our regional office allows us to support Kansas City customers quickly on both sides of the state line. Whether you are seeking to reduce monthly electric costs, eliminate grid dependency during seasonal storms, or lock in long-term commercial operating costs, Logic Solar delivers precision engineering with unmatched local service.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. SOLAR SERVICES IN KANSAS CITY ── */}
      <section className="py-20 lg:py-28 bg-brand-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Comprehensive Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Solar Solutions for Kansas City Properties
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              Explore our full suite of residential, commercial, and energy storage services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Solar */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-dark mb-6">
                  <Sun className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">Residential Solar Installation</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                  Custom residential solar design tailored to your roof structure, electricity consumption, and aesthetic goals. We use Tier-1 monocrystalline panels and concealed mounting hardware for superior long-term performance.
                </p>
              </div>
              <Link 
                to="/services/installation" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark hover:text-brand-gold transition-colors pt-4 border-t border-gray-100"
              >
                Learn About Residential Solar <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Commercial Solar */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">Commercial Solar Installation</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                  Turn unused commercial roof space into a high-yielding operational asset. We provide complete utility analysis, site evaluation, demand charge management, and multi-decade project engineering for Kansas City businesses.
                </p>
              </div>
              <Link 
                to="/services/commercial" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark hover:text-brand-gold transition-colors pt-4 border-t border-gray-100"
              >
                Explore Commercial Solar <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Battery Storage */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-dark mb-6">
                  <Battery className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">Battery Backup & Energy Storage</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                  Protect your household from power outages during severe Midwestern weather. Our energy storage integrations (including Tesla Powerwall) store daytime solar output to supply continuous power when the grid drops.
                </p>
              </div>
              <Link 
                to="/services/battery" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark hover:text-brand-gold transition-colors pt-4 border-t border-gray-100"
              >
                Discover Battery Backup <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Ground-Mounted Solar */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">Ground-Mounted Solar Arrays</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                  Ideal for rural properties, larger estates, or homes with roof shading constraints. Ground-mounted solar allows optimal orientation and angle adjustment for maximum daily sun exposure.
                </p>
              </div>
              <Link 
                to="/services/installation" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark hover:text-brand-gold transition-colors pt-4 border-t border-gray-100"
              >
                View Ground-Mount Options <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Panel Removal & Reset */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-dark mb-6">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">Solar Panel Removal & Reset</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                  Replacing or repairing your roof? Our certified technicians safely detach your solar panels, store them during roof work, and reset the array with fresh flashing and sealants once completed.
                </p>
              </div>
              <Link 
                to="/services/installation" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-dark hover:text-brand-gold transition-colors pt-4 border-t border-gray-100"
              >
                Learn About Detach & Reset <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Incentive Guidance */}
            <div className="bg-brand-dark text-white p-8 rounded-3xl border border-brand-gold/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-dark flex items-center justify-center mb-6 font-black">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Kansas City Utility Incentives</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Learn how local utility interconnection, net metering policies, and commercial tax depreciation options apply to your Kansas City property.
                </p>
              </div>
              <Link 
                to="/services/incentives" 
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-gold hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                View Solar Incentives <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY KANSAS CITY PROPERTY OWNERS CHOOSE LOGIC SOLAR ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              The Logic Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Why Kansas City Chooses Logic Solar
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              Built on precision engineering, local accountability, and premium aesthetics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Usage-Based Custom Engineering",
                desc: "We analyze 12 to 24 months of your actual Evergy electricity data to size your system accurately, preventing over-sizing or inadequate production."
              },
              {
                title: "Tier-1 Premium Components",
                desc: "We exclusively install high-efficiency all-black monocrystalline panels, microinverters, and concealed roof racking designed for superior curb appeal."
              },
              {
                title: "Seamless Battery Integration",
                desc: "Certified installer of industry-leading battery backup units (including Tesla Powerwall) for automated emergency transfer when power grids drop."
              },
              {
                title: "Turnkey Evergy & City Permitting",
                desc: "Our regulatory team handles all building department permits, HOA approvals, line drawings, and Evergy interconnection documents."
              },
              {
                title: "Residential & Commercial Expertise",
                desc: "From single-family homes to large-scale commercial facilities, our master electricians deliver industrial-grade craftmanship."
              },
              {
                title: "Local Metro Support Hub",
                desc: "Our regional Overland Park office provides rapid on-site service, system monitoring, and ongoing maintenance support across the entire KC metro."
              }
            ].map((diff, i) => (
              <div key={i} className="p-8 rounded-3xl bg-brand-light border border-black/5 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-dark flex items-center justify-center font-black text-sm mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">{diff.title}</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed font-normal">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WORKING WITH EVERGY ── */}
      <section className="py-20 lg:py-28 bg-brand-dark text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-wider mb-6">
              Utility Guidance
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-8">
              Solar Installation and Evergy Interconnection
            </h2>

            <div className="space-y-6 text-white/80 text-base lg:text-lg leading-relaxed mb-12">
              <p>
                Solar projects throughout the Kansas City metropolitan region connect to the electrical grid under <strong>Evergy</strong>. Depending on your property’s exact location, your project may fall into one of several Evergy utility operating jurisdictions, including <em>Missouri Metro</em>, <em>Missouri West</em>, <em>Kansas Metro</em>, or <em>Kansas Central</em>.
              </p>
              <p>
                The specific jurisdiction impacts essential steps in the solar workflow, including application documentation, system design requirements, fee structures, net-metering agreements, municipal inspection sequences, bidirectional meter replacements, and utility approval timelines.
              </p>
            </div>

            {/* Scope Box */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-12">
              <h3 className="text-xl font-bold text-brand-gold mb-6 tracking-tight flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6" />
                How Logic Solar Coordinates Your Evergy Interconnection:
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/90 font-medium">
                {[
                  "Evergy jurisdiction and rate verification",
                  "Interconnection application submission",
                  "Site plan and electrical one-line diagrams",
                  "Required customer signature processing",
                  "Local municipal inspection coordination",
                  "Post-installation documentation filing",
                  "Evergy bidirectional meter installation request",
                  "Final Permission to Operate (PTO) authorization"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/50 italic bg-black/30 p-4 rounded-xl border border-white/5">
              Note: Utility programs, rates and interconnection requirements can change. Logic Solar verifies current requirements for each property before final system design.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. SOLAR COST AND FINANCING ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Clear Pricing Principles
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Kansas City Solar Pricing & Financing Factors
            </h2>
            <p className="text-lg text-brand-dark/70 font-medium">
              Transparent evaluation without unverified promises or generic estimates.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-brand-dark/80 leading-relaxed space-y-6">
            <p>
              The cost of installing solar panels in Kansas City varies based on the unique technical parameters of your property. Rather than relying on generic rule-of-thumb pricing, Logic Solar evaluates the following key factors during your custom estimate:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
              {[
                "Annual energy consumption (kWh)",
                "Roof pitch, orientation, and material condition",
                "Total panel count and wattage specifications",
                "Electrical main panel capacity & upgrade needs",
                "Battery storage capacity (if selected)",
                "Ground mount or trenching requirements",
                "Municipal permitting & utility filing fees",
                "Financing structure and loan parameters"
              ].map((factor, i) => (
                <div key={i} className="p-4 rounded-2xl bg-brand-light border border-black/5 font-semibold text-sm text-brand-dark flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                  {factor}
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-brand-dark font-medium text-sm leading-relaxed">
              <strong className="block font-bold text-base mb-1 text-amber-900">Important Note on Tax Credits & Incentives:</strong>
              Solar incentives and financing programs change over time. Logic Solar can explain the current programs associated with your project, but customers should consult a qualified tax professional about eligibility.
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. KANSAS CITY PROJECTS ── */}
      <section className="py-20 lg:py-28 bg-brand-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Recent Kansas City-Area Solar Projects
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              Explore sample custom installations completed across the Kansas City metropolitan area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {KC_PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                  <img 
                    src={proj.image} 
                    alt={`${proj.type} in ${proj.city} by Logic Solar`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-brand-gold text-xs font-bold">
                    {proj.city}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs font-black text-brand-gold uppercase tracking-wider mb-1">{proj.type}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{proj.systemSize} System</h3>
                  
                  <ul className="space-y-2 text-xs text-brand-dark/70 mb-6 font-medium">
                    <li><strong>Panels:</strong> {proj.panels}</li>
                    <li><strong>Storage:</strong> {proj.battery}</li>
                    <li><strong>Mounting:</strong> {proj.mount}</li>
                    <li><strong>Utility:</strong> {proj.utility}</li>
                  </ul>

                  <p className="text-xs text-brand-dark/60 leading-relaxed border-t border-gray-100 pt-4">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. KANSAS CITY CUSTOMER REVIEWS ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Real Customer Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              What Kansas City-Area Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {KC_REVIEWS.map((rev, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-brand-light border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-brand-gold mb-4">
                    {[...Array(rev.rating)].map((_, r) => (
                      <Star key={r} className="w-5 h-5 fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-brand-dark/80 text-sm leading-relaxed font-normal mb-6 italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <div className="font-bold text-brand-dark text-sm">{rev.name}</div>
                  <div className="text-xs text-brand-dark/50">{rev.location} • {rev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. KANSAS CITY SERVICE AREA ── */}
      <section className="py-20 lg:py-28 bg-brand-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Regional Coverage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Kansas City Metro Communities Served
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              Logic Solar installs custom systems across Missouri and Kansas communities in the KC metro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Missouri Communities */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand-gold" />
                Missouri Communities
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                {MO_COMMUNITIES.map(item => (
                  <div key={item.slug} className="flex items-center gap-2 text-brand-dark/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kansas Communities */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand-gold" />
                Kansas Communities
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                {KS_COMMUNITIES.map(item => (
                  <div key={item.slug} className="flex items-center gap-2 text-brand-dark/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. THE LOGIC SOLAR PROCESS ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Turnkey Execution
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              The 5-Step Logic Process
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              How we take your Kansas City solar project from initial review to powered activation.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Energy & Property Review",
                desc: "We analyze your historical electric bills, roof structural integrity, shading profile, and electrical main panel capacity."
              },
              {
                step: "02",
                title: "Custom Solar Design",
                desc: "Our solar engineers design a high-efficiency system layout tailored to your roof geometry, production goals, and battery needs."
              },
              {
                step: "03",
                title: "Permitting & Utility Filing",
                desc: "Logic Solar manages all building permits, HOA submissions, engineering stamps, and Evergy interconnection paperwork."
              },
              {
                step: "04",
                title: "Professional Installation",
                desc: "Master-electrician-led installation crews mount racking, wire inverters, and secure panel arrays with clean, hidden conduit."
              },
              {
                step: "05",
                title: "Inspection & Activation",
                desc: "After passing municipal inspection, we request your Evergy bidirectional meter swap and secure final Permission to Operate (PTO)."
              }
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-3xl bg-brand-light border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center font-black text-lg mb-6 shadow-md">
                    {st.step}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3 tracking-tight">{st.title}</h3>
                  <p className="text-brand-dark/70 text-xs leading-relaxed font-normal">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. KANSAS CITY FAQ SECTION ── */}
      <section className="py-20 lg:py-28 bg-brand-light">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight mb-6">
              Kansas City Solar Frequently Asked Questions
            </h2>
            <p className="text-lg text-brand-dark/60 font-medium">
              Clear, transparent answers to help you make an informed decision.
            </p>
          </div>

          <div className="space-y-4">
            {KC_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold text-base sm:text-lg text-brand-dark flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-brand-gold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-brand-dark/70 text-sm leading-relaxed border-t border-gray-100">
                          <p className="pt-4">{faq.a}</p>
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

      {/* ── 14. LOCAL CONTACT SECTION ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-dark text-xs font-black uppercase tracking-wider mb-4">
                Regional Hub
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight mb-6">
                Serving Kansas City from Our Overland Park Office
              </h2>
              <p className="text-brand-dark/70 text-base leading-relaxed mb-8">
                Logic Solar serves Kansas City, Missouri and surrounding metro communities from our regional office in Overland Park. Contact our local team to discuss your solar potential or schedule an in-person site review.
              </p>

              <div className="space-y-6 text-brand-dark font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-dark shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm uppercase tracking-wider text-brand-dark/50 mb-0.5">Office Address</div>
                    <div className="font-bold text-brand-dark">Logic Solar</div>
                    <div className="text-sm text-brand-dark/80">7300 W 110th St, Plaza 1, 7th Floor</div>
                    <div className="text-sm text-brand-dark/80">Overland Park, KS 66210</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-dark shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm uppercase tracking-wider text-brand-dark/50 mb-0.5">Direct Phone</div>
                    <a href="tel:8163005781" className="text-lg font-extrabold text-brand-dark hover:text-brand-gold transition-colors">
                      (816) 300-5781
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-dark shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm uppercase tracking-wider text-brand-dark/50 mb-0.5">Email Contact</div>
                    <a href="mailto:sales@logic-solar.com" className="text-base font-bold text-brand-dark hover:text-brand-gold transition-colors">
                      sales@logic-solar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="rounded-3xl overflow-hidden border border-black/10 shadow-2xl h-[400px] relative bg-gray-100">
              <iframe 
                title="Logic Solar Overland Park Regional Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.723793739794!2d-94.6718429!3d38.9280145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0c97800000001%3A0x0!2zNzMwMCBXIDExMHRoIFN0LCBPdmVybGFuZCBQYXJrLCBLUyA2NjIxMA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. FINAL CONVERSION SECTION ── */}
      <section id="quote-form" className="pt-20 lg:pt-28 pb-4 bg-brand-dark text-white relative">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-wider mb-4">
            Zero-Pressure Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
            See Whether Solar Makes Sense for Your Kansas City Property
          </h2>
          <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto">
            Our team will review your address, analyze your historical energy usage, evaluate roof solar potential, and provide a custom proposal with zero obligation.
          </p>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
