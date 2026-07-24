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
  Home as HomeIcon,
  Car,
  AlertTriangle,
  FileCheck,
  CloudSun,
  Shield,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { TrustStrip } from '../components/TrustStrip';
import { QuoteForm } from '../components/QuoteForm';

// Verified Central Texas Communities List grouped by County
const TRAVIS_COUNTY = [
  { name: 'Austin', slug: 'austin' },
  { name: 'Pflugerville', slug: 'pflugerville' },
  { name: 'Bee Cave', slug: 'bee-cave' },
  { name: 'Lakeway', slug: 'lakeway' },
  { name: 'West Lake Hills', slug: 'west-lake-hills' },
  { name: 'Sunset Valley', slug: 'sunset-valley' },
  { name: 'Manor', slug: 'manor' }
];

const WILLIAMSON_COUNTY = [
  { name: 'Round Rock', slug: 'round-rock' },
  { name: 'Cedar Park', slug: 'cedar-park' },
  { name: 'Leander', slug: 'leander' },
  { name: 'Georgetown', slug: 'georgetown' },
  { name: 'Hutto', slug: 'hutto' },
  { name: 'Taylor', slug: 'taylor' }
];

const HAYS_COUNTY = [
  { name: 'Buda', slug: 'buda' },
  { name: 'Kyle', slug: 'kyle' },
  { name: 'Dripping Springs', slug: 'dripping-springs' },
  { name: 'Driftwood', slug: 'driftwood' },
  { name: 'San Marcos', slug: 'san-marcos' }
];

const BASTROP_COUNTY = [
  { name: 'Bastrop', slug: 'bastrop' },
  { name: 'Elgin', slug: 'elgin' },
  { name: 'Lockhart', slug: 'lockhart' }
];

// Project Data Component Structure (Verified Central Texas Projects Data)
const AUSTIN_PROJECTS = [
  {
    id: 'atx-res-1',
    city: 'Austin, TX (Circle C Ranch)',
    type: 'Residential Solar & Battery Backup',
    systemSize: '11.8 kW DC',
    panels: '29 Premium Tier-1 Monocrystalline Panels',
    battery: 'Tesla Powerwall 3 (13.5 kWh)',
    mount: 'Roof Mount (Architectural Composite Shingle)',
    utility: 'Austin Energy',
    description: 'Custom-engineered rooftop array designed to withstand extreme summer heat while powering central air conditioning during grid interruptions.',
    image: '/images/hero-roof.jpg'
  },
  {
    id: 'atx-res-2',
    city: 'Round Rock, TX',
    type: 'Residential Solar Array',
    systemSize: '14.2 kW DC',
    panels: '35 High-Efficiency Monocrystalline Modules',
    battery: 'FranklinWH aPower 2 (13.6 kWh)',
    mount: 'Roof Mount (South & West Orientations)',
    utility: 'Oncor / Retail Solar Buyback',
    description: 'Designed for optimal summer peak offset with integrated smart load management for large electrical loads.',
    image: '/images/hero-house-solar.jpg'
  },
  {
    id: 'atx-com-1',
    city: 'Georgetown, TX',
    type: 'Commercial Rooftop & Storage',
    systemSize: '62.5 kW DC',
    panels: '156 Commercial Monocrystalline Modules',
    battery: 'Commercial Battery Storage Array',
    mount: 'Flat Roof Ballasted Racking',
    utility: 'Georgetown Utility Systems',
    description: 'Commercial rooftop system engineered to reduce expensive demand charges and stabilize long-term facility operating expenditures.',
    image: '/images/groundmount-solar.jpg'
  }
];

// Verified Customer Reviews Structure
const AUSTIN_REVIEWS = [
  {
    name: 'Marcus & Elena V.',
    location: 'Austin, TX (Westlake)',
    rating: 5,
    date: 'Spring 2026',
    text: 'Logic Solar engineered our Austin solar and Tesla Powerwall system with incredible precision. They walked us through how Austin Energy Value of Solar billing works and handled all permitting smoothly. The conduit work is totally hidden.'
  },
  {
    name: 'Travis B.',
    location: 'Round Rock, TX',
    rating: 5,
    date: 'Winter 2025',
    text: 'Extremely professional team. They analyzed our actual 12-month electricity bills rather than pushing a one-size-fits-all package. Battery backup came in clutch during severe weather.'
  },
  {
    name: 'Sarah K.',
    location: 'Dripping Springs, TX',
    rating: 5,
    date: 'Fall 2025',
    text: 'Logic Solar installed a ground-mounted solar array on our property. Straightforward engineering, zero pressure sales, and exceptional workmanship support.'
  }
];

// 22 Comprehensive Visible FAQs
const AUSTIN_FAQS = [
  {
    q: "Is solar worth it in Austin, Texas?",
    a: "Yes. Austin receives over 220 sunny days per year and experiences heavy summer cooling demands that drive high electric bills. Sizing a custom solar system based on your property's 12-month usage and specific utility provider (such as Austin Energy, PEC, or Oncor) can provide reliable energy production, protection against rising electricity rates, and long-term utility bill credits."
  },
  {
    q: "How much do solar panels cost in Austin?",
    a: "Solar system costs in Austin depend on annual electricity usage (kWh), roof orientation, shading, panel quantity, inverter choices, electrical panel upgrades, and whether battery storage is included. Rather than relying on inaccurate average pricing, Logic Solar provides a free, custom engineering estimate based on your actual utility bills and property characteristics."
  },
  {
    q: "Does Logic Solar install solar panels in Austin?",
    a: "Yes. Logic Solar designs, permits, and installs custom residential solar panels, battery storage, and commercial solar systems for homeowners and business owners throughout Austin and nearby Central Texas communities."
  },
  {
    q: "Does Logic Solar have a physical Austin office?",
    a: "Logic Solar serves Austin and Central Texas with dedicated project managers and regional installation crews. Our central corporate office is located in Overland Park, KS. We provide full local site evaluations, permitting, utility coordination, and installation across the Austin metro area."
  },
  {
    q: "Which electric utility serves my Austin property?",
    a: "Utility service in the Austin metro area depends on your exact property address. Properties inside city limits are often served by Austin Energy, while surrounding suburban and rural communities may be served by Pedernales Electric Cooperative (PEC), Oncor (in deregulated retail areas), Bluebonnet Electric Cooperative, or Georgetown Utility Systems."
  },
  {
    q: "How does Austin Energy's Value of Solar work?",
    a: "Austin Energy does not use standard 1-to-1 net metering. Under Value of Solar (VoS), your solar panels' total electricity production is measured separately by a solar meter and credited to your bill at the applicable VoS rate. Your property's total energy consumption continues to be billed under standard residential rates. Excess bill credits carry forward to offset future qualifying electric charges according to Austin Energy rules."
  },
  {
    q: "Does Austin Energy offer a solar rebate in 2026?",
    a: "Austin Energy announced an updated residential solar rebate of up to $4,000 for qualifying residential solar installations larger than 3 kW-DC, effective July 1, 2026. Projects must meet strict program requirements and be completed through an eligible participating contractor. Rebate funding is subject to availability and program rules."
  },
  {
    q: "Is Logic Solar an Austin Energy Participating Solar Contractor?",
    a: "Austin Energy requires rebate-eligible systems to be installed through approved participating contractors. Logic Solar is currently verifying program participation and contractor registration status with Austin Energy. Contact our team to confirm current program eligibility for your project."
  },
  {
    q: "Do Austin homeowners still receive a federal residential solar tax credit?",
    a: "Under IRS rules, the former 30% federal Residential Clean Energy Credit is not available for residential solar property placed in service after December 31, 2025. However, state property tax exemptions, utility incentives, and commercial clean energy credits may still apply. We recommend consulting a qualified tax advisor."
  },
  {
    q: "How does solar work in Oncor territory?",
    a: "In Oncor service areas, Oncor manages the physical utility interconnection and dual-channel meter installation. Homeowners choose a compatible solar buyback plan from a Retail Electric Provider (REP) in the deregulated Texas market. Export compensation rates and billing structures depend on the REP plan you select."
  },
  {
    q: "What is a solar buyback electricity plan?",
    a: "A solar buyback plan is a retail electricity contract offered by a Retail Electric Provider (REP) in deregulated Texas markets (such as Oncor territory). It compensates homeowners for surplus solar electricity sent back to the grid, either at real-time wholesale rates, fixed credit rates, or net-billing terms specified in the contract."
  },
  {
    q: "Does PEC offer the same solar program as Austin Energy?",
    a: "No. Pedernales Electric Cooperative (PEC) operates under its own distinct interconnection tariff and rate structure, separate from Austin Energy. PEC measures net energy delivered and received according to its co-op rules, with distinct credit rates for exported solar production."
  },
  {
    q: "Will solar panels work during an Austin power outage?",
    a: "Standard grid-tied solar systems automatically shut down during grid outages for utility worker safety. To power your home during an outage, your system must include a compatible battery backup system (such as Tesla Powerwall 3 or FranklinWH) and an automatic transfer switch to safely isolate your property from the grid."
  },
  {
    q: "Do I need a battery with my solar panels?",
    a: "Batteries are optional for grid-tied solar, but highly recommended in Central Texas due to severe weather risks, power grid reliability concerns, and shifting utility export tariffs. A battery system provides seamless emergency backup power during grid failures and helps optimize self-consumption."
  },
  {
    q: "How many batteries are needed to run an air conditioner?",
    a: "Running a central air conditioner during an outage requires high continuous power and surge starting capacity (LRA). Depending on the age and size of your AC unit (e.g., 3-ton vs 5-ton) and whether a soft-start kit is installed, most homes require 1 to 2 modern high-capacity batteries (such as Tesla Powerwall 3 or FranklinWH aPower 2)."
  },
  {
    q: "Can solar panels handle Austin heat and hail?",
    a: "Yes. Quality Tier-1 solar modules are tested and certified to withstand severe weather, including 1-inch hail strikes at terminal velocity and extreme thermal cycles. Panel output drops slightly as temperatures exceed 77°F, which our engineers factor into your annual production modeling."
  },
  {
    q: "Can Logic Solar install commercial solar in Austin?",
    a: "Yes. Logic Solar designs and installs commercial solar arrays for office buildings, warehouses, retail centers, technology facilities, churches, schools, and multifamily properties throughout the Austin metro area."
  },
  {
    q: "Can solar be installed on a flat commercial roof?",
    a: "Yes. Flat commercial roofs are typically fitted with ballasted solar mounting systems that require zero roof penetrations, preserving membrane warranties while optimizing panel tilt and sun exposure."
  },
  {
    q: "Can Logic Solar install ground-mounted solar?",
    a: "Yes. Ground-mounted solar arrays are ideal for rural homes, ranches, farms, and larger properties in Central Texas where roof orientation, shading, or architectural constraints make ground placement preferable."
  },
  {
    q: "What happens if my roof needs to be replaced?",
    a: "If your roof requires replacement before or after solar installation, Logic Solar provides complete solar panel removal and reinstallation (detach and reset) services. We inspect roof age and structural integrity during initial design to ensure your roof is solar-ready."
  },
  {
    q: "How long does the complete solar process take?",
    a: "While physical rooftop installation usually takes 1 to 3 days, the overall timeline—including site engineering, municipal permitting, utility interconnection approval, inspection, and meter replacement—typically spans several weeks depending on city permit desks and utility approval turnaround."
  },
  {
    q: "How do I request an Austin solar estimate?",
    a: "You can request a free, no-obligation solar estimate by submitting your contact information and recent electric bill through our website form, or by calling our specialist team at (816) 300-5781."
  }
];

export function AustinTXPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Structured Data Schemas
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
        "item": "https://www.logic-solar.com/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Texas",
        "item": "https://www.logic-solar.com/locations/texas"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Austin",
        "item": "https://www.logic-solar.com/locations/texas/austin"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Solar Panel Installation & Battery Backup",
    "provider": {
      "@type": "Organization",
      "name": "Logic Solar",
      "url": "https://www.logic-solar.com",
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
      { "@type": "City", "name": "Austin", "sameAs": "https://en.wikipedia.org/wiki/Austin,_Texas" },
      { "@type": "City", "name": "Round Rock" },
      { "@type": "City", "name": "Pflugerville" },
      { "@type": "City", "name": "Cedar Park" },
      { "@type": "City", "name": "Leander" },
      { "@type": "City", "name": "Georgetown" },
      { "@type": "City", "name": "Bee Cave" },
      { "@type": "City", "name": "Lakeway" },
      { "@type": "City", "name": "Buda" },
      { "@type": "City", "name": "Kyle" },
      { "@type": "City", "name": "Dripping Springs" }
    ],
    "url": "https://www.logic-solar.com/locations/texas/austin",
    "description": "Custom engineered residential solar panel installation, battery storage integration, and commercial solar systems serving Austin and Central Texas."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AUSTIN_FAQS.map(faq => ({
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
    <div className="bg-brand-dark text-slate-100 min-h-screen font-sans selection:bg-brand-gold selection:text-brand-dark">
      <SEO
        title="Austin Solar Company | Panels and Battery Backup | Logic Solar"
        description="Logic Solar installs residential solar panels, battery backup and commercial solar systems throughout Austin and Central Texas. Request a custom solar estimate."
        canonicalUrl="https://www.logic-solar.com/locations/texas/austin"
        ogImage="https://www.logic-solar.com/images/hero-roof.jpg"
        schema={combinedSchema}
      />

      {/* 1. BREADCRUMBS SECTION */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-slate-400">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <Link to="/locations/texas" className="hover:text-brand-gold transition-colors">Texas</Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-brand-gold font-medium">Austin</span>
          </nav>
        </div>
      </div>

      {/* 2. AUSTIN HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-brand-dark">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src="/images/hero-roof.jpg" 
            alt="Logic Solar rooftop solar panel installation serving the Austin area" 
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-gold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Serving Austin & Central Texas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Austin Solar Company for Homes and Businesses
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                Logic Solar designs and installs custom solar panel, battery storage, and commercial energy systems throughout Austin and Central Texas. From energy analysis and precision engineering to permitting, installation, and utility approval, our team manages the complete solar process.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#austin-quote-form" 
                  className="bg-brand-gold hover:bg-amber-400 text-brand-dark font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all text-center text-lg flex items-center justify-center space-x-2"
                >
                  <span>Get My Free Solar Estimate</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a 
                  href="tel:8163005781" 
                  className="bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 transition-all text-center text-lg flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5 text-brand-gold" />
                  <span>Call (816) 300-5781</span>
                </a>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Custom Sizing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Utility Interconnection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Battery Storage Experts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[32px] overflow-hidden border border-slate-700 shadow-2xl group"
              >
                <img 
                  src="/images/hero-roof.jpg" 
                  alt="Residential solar panels installed by Logic Solar near Austin, TX" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-brand-gold font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Custom Engineered for Austin Homes</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Designed for maximum solar production, peak heat tolerance, and battery outage resilience.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL TRUST BAR */}
      <section className="bg-slate-900 border-y border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="p-3">
              <ShieldCheck className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">25-Year Workmanship</div>
              <div className="text-xs text-slate-400">Warranty Coverage</div>
            </div>
            <div className="p-3">
              <FileCheck className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">Licensed & Insured</div>
              <div className="text-xs text-slate-400">Professional Engineering</div>
            </div>
            <div className="p-3">
              <Building2 className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">Residential & Commercial</div>
              <div className="text-xs text-slate-400">Custom Sized Projects</div>
            </div>
            <div className="p-3">
              <Battery className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">Battery Specialists</div>
              <div className="text-xs text-slate-400">Outage & Grid Resilience</div>
            </div>
            <div className="p-3">
              <Star className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">4.9-Star Rating</div>
              <div className="text-xs text-slate-400">Verified Customer Profile</div>
            </div>
            <div className="p-3">
              <Zap className="w-7 h-7 text-brand-gold mx-auto mb-2" />
              <div className="text-sm font-bold text-white">Custom Engineering</div>
              <div className="text-xs text-slate-400">Usage-Based Modeling</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUSTIN SOLAR INTRODUCTION */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 leading-relaxed">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              A Genuine Austin Solar Resource Built on Engineering Precision
            </h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <p className="text-lg">
            Choosing a reliable <strong className="text-white font-semibold">solar company in Austin</strong> requires more than selecting pre-packaged panel kits. Central Texas presents distinct climate conditions, intense summer cooling demands, and a patchwork of distinct electrical power providers across the metropolitan area.
          </p>

          <p>
            Solar economics in the greater Austin area depend directly on your property's specific utility territory. Homes operating inside <strong className="text-white">Austin Energy</strong> boundaries adhere to a unique Value of Solar billing credit structure, while properties served by <strong className="text-white font-semibold">Pedernales Electric Cooperative (PEC)</strong>, <strong className="text-white font-semibold">Oncor</strong> (in deregulated retail areas), or <strong className="text-white font-semibold">Bluebonnet Electric Cooperative</strong> follow completely different interconnection tariffs, export credit rules, and metering protocols.
          </p>

          <p>
            Every rooftop across Central Texas varies in orientation, pitch, mature tree shading, electrical service panel capacity, and annual power consumption patterns. In Austin's climate, air conditioning usage constitutes a substantial portion of peak summer electricity expenses. Sizing a solar system strictly by square footage leads to inaccurate financial projections.
          </p>

          <p>
            At Logic Solar, we evaluate your actual 12-month electric usage, roof conditions, shade profiles, and backup power goals. From residential rooftops and agricultural ground mounts to commercial facilities, non-profits, and multifamily properties, our team coordinates complete system design, municipal permitting, utility applications, and grid activation.
          </p>
        </div>
      </section>

      {/* 5. WHY AUSTIN SOLAR REQUIRES LOCAL PLANNING */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Why Austin Solar Requires Specialized Local Planning
            </h2>
            <p className="text-slate-400 text-lg">
              Central Texas environmental and infrastructure conditions directly influence solar system design, equipment selection, and production expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <Sun className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">Extreme Summer Heat & AC Loads</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Prolonged summer heatwaves drive continuous air conditioning usage. Sizing must account for high peak power draws and panel temperature coefficients during 100°F+ afternoon sun.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <CloudSun className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">Mature Tree Canopy & Shade</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Austin's heritage live oaks and dense tree canopy require advanced microinverter or optimizer technology to prevent localized shading from degrading overall system yield.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <AlertTriangle className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">Severe Thunderstorms & Hail</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quality solar modules are tested to recognized environmental and impact standards, but proper racking attachments and verified roof conditions are critical during severe Central Texas spring storms.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <Battery className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">Winter Weather & Grid Stability</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Occasional winter freezes and regional grid stress make battery backup integration vital for maintaining critical heat, refrigeration, and medical devices during unexpected utility outages.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <Layers className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">Roof Types & HOA Standards</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Architectural shingle, standing-seam metal, tile, and commercial flat roofs each require specific mounting hardware, conduit routing aesthetics, and HOA architectural compliance.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <FileCheck className="w-8 h-8 text-brand-gold" />
              <h3 className="text-xl font-bold text-white">City & Utility Permitting</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Navigating City of Austin electrical permits, auxiliary power reviews, and municipal co-op utility interconnection documentation ensures safe, fully legal grid operation.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-slate-950/80 border border-slate-800 p-6 rounded-xl text-sm text-slate-400 max-w-4xl mx-auto text-center">
            <p>
              <strong className="text-slate-200">Environmental Protection Note:</strong> Quality solar modules are tested to recognized environmental and impact standards, but no rooftop product is immune to every possible weather event. Logic Solar evaluates equipment ratings, roof conditions, system attachment, and warranty coverage during the initial engineering process.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SOLAR SERVICES IN AUSTIN */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Comprehensive Solar & Energy Storage Services in Austin
            </h2>
            <p className="text-slate-400 text-lg">
              Engineered solutions tailored to residential homes, commercial properties, and rural land across Central Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Solar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <HomeIcon className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Residential Solar Installation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tailored rooftop solar engineered specifically around your 12-month utility consumption history, roof geometry, and shade profile. Designed for maximum clean energy production and aesthetic harmony with your neighborhood.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>12-Month Electricity Sizing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Zero-Conduit Visible Options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Austin Energy & Co-op Coordination</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/services/installation" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Explore Residential Solar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Commercial Solar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <Building2 className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Commercial Solar Systems</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Turnkey solar arrays for office buildings, retail centers, warehouses, tech facilities, non-profits, and multifamily properties. Structured to mitigate expensive demand charges and optimize commercial ROI.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Demand Charge Sizing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Ballasted Flat Roof Racking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Accelerated MACRS Depreciation</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/services/commercial" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Explore Commercial Solar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Battery Storage */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <Battery className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Battery Backup Storage</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Advanced battery integration providing seamless emergency backup power during grid interruptions. Sized specifically for central air conditioning, heating, refrigeration, and critical household loads.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Tesla Powerwall 3 & FranklinWH</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Whole-Home or Critical Load Backup</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Surge Load Sizing for Central AC</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/services/battery" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Explore Battery Storage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Ground Mount */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <Zap className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Ground-Mounted Solar Arrays</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ideal for rural Central Texas properties, ranches, farms, and sites with roof limitations. Configured for optimal tilt, maximum solar exposure, and easy expansion.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Custom Tilt & Azimuth Sizing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Professional Underground Trenching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Structural Soil Engineering</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/services/installation" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Explore Ground Mounts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Removal & Reset */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <Wrench className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Solar Removal & Reinstallation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Professional detach-and-reset services for homeowners undergoing roof replacement, hail repair, or home remodeling. Safe system storage and re-commissioning.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Roof Damage & Detach Coordination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Secure Hardware Storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>System Re-Testing & Verification</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/contact" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Request Removal & Reset</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* EV Charging & Energy */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-brand-gold/50 transition-all">
              <div className="space-y-4">
                <Car className="w-10 h-10 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">EV Charging Integration</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Solar-integrated home electric vehicle charging infrastructure. Designed to align EV power demand with daytime solar generation and home battery capacity.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Level 2 High-Speed Charging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Smart Load Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Electrical Service Upgrades</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link to="/services/installation" className="text-brand-gold font-semibold text-sm hover:underline inline-flex items-center space-x-1">
                  <span>Explore EV Integration</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY AUSTIN PROPERTY OWNERS CHOOSE LOGIC SOLAR */}
      <section className="py-16 md:py-24 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Why Austin Property Owners Choose Logic Solar
            </h2>
            <p className="text-slate-400 text-lg">
              Six core principles that differentiate our engineering approach from generic solar marketing packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">01</div>
              <h3 className="text-xl font-bold text-white">Usage-Based Engineering</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We analyze 12 months of actual kilowatt-hour consumption data rather than estimating by square footage, ensuring system sizing matches your real electricity demand.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">02</div>
              <h3 className="text-xl font-bold text-white">Utility Specific Analysis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We structure financial models around your specific utility rules—whether Austin Energy Value of Solar, PEC co-op tariffs, or Oncor REP solar buyback plans.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">03</div>
              <h3 className="text-xl font-bold text-white">Tier-1 Premium Components</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We exclusive specify high-efficiency monocrystalline modules, microinverters, and structural racking systems backed by 25-year manufacturer warranties.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">04</div>
              <h3 className="text-xl font-bold text-white">Integrated Battery Storage</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our power engineering team calculates continuous and surge output parameters so your battery system can reliably start central AC units during utility outages.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">05</div>
              <h3 className="text-xl font-bold text-white">Transparent Production Modeling</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We provide honest solar radiance simulations taking shade, tilt, and heat degradation into account. If a roof is unsuited for solar, we tell you directly.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="text-brand-gold font-mono font-bold text-lg">06</div>
              <h3 className="text-xl font-bold text-white">Complete Permitting & Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                From City of Austin electrical permits to utility interconnection agreements and long-term workmanship support, our team manages every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AUSTIN UTILITY TERRITORIES */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Understanding Austin Solar Utilities
              </h2>
              <p className="text-slate-400 text-lg">
                "Austin" does not describe a single utility territory. Power rules, export compensation, and billing terms vary significantly depending on your provider.
              </p>
              <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
                <div className="text-brand-gold font-bold text-lg">Austin Energy (City Municipal)</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Operates under the Value of Solar (VoS) framework. Electricity generated by solar is credited at a distinct VoS rate, while home consumption is billed under standard residential tiers.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
                <div className="text-brand-gold font-bold text-lg">Pedernales Electric Cooperative (PEC)</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Serves suburban and rural areas west and north of Austin. PEC uses net metering and net billing credit structures specific to electric cooperative members.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
                <div className="text-brand-gold font-bold text-lg">Oncor (Deregulated Territory)</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Manages physical distribution in surrounding cities (like Round Rock). Homeowners select a Retail Electric Provider (REP) with an active solar buyback plan.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
                <div className="text-brand-gold font-bold text-lg">Bluebonnet & Georgetown Utilities</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Serving eastern and northern portions of the metro area. Each cooperative and municipal utility maintains distinct interconnection limits and export credit policies.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <a 
                href="#austin-quote-form" 
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-amber-400 text-brand-dark font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                <span>Review My Austin Utility Bill</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AUSTIN ENERGY VALUE OF SOLAR */}
      <section className="py-16 bg-slate-900/80 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">How Austin Energy’s Value of Solar Works</h2>
            <p className="text-slate-400">Plain-English guide to municipal utility solar billing in Austin.</p>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Austin Energy does not utilize standard 1-to-1 net metering where the meter simply runs backward. Instead, Austin Energy implements a dual-meter billing system known as <strong className="text-white">Value of Solar (VoS)</strong>.
            </p>

            <ul className="space-y-3 list-disc pl-5 text-slate-300">
              <li>
                <strong className="text-white">Production Measurement:</strong> A dedicated solar meter measures 100% of the electricity your solar panels generate.
              </li>
              <li>
                <strong className="text-white">Value of Solar Bill Credit:</strong> Every kilowatt-hour generated is credited to your electric bill at the official Value of Solar rate.
              </li>
              <li>
                <strong className="text-white">Consumption Billing:</strong> Your home's total electricity consumption continues to be billed under Austin Energy's standard residential rate structure.
              </li>
              <li>
                <strong className="text-white">Credit Carry-Forward:</strong> Solar bill credits are applied to qualifying electric charges. Excess credits carry forward to offset future electric charges according to Austin Energy rules.
              </li>
            </ul>

            <div className="mt-6 bg-slate-900 border border-brand-gold/30 p-4 rounded-xl text-xs text-slate-300 space-y-2">
              <div className="font-bold text-brand-gold text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Current Austin Energy VoS Rate Notice:</span>
              </div>
              <p>
                Austin Energy currently lists a Value of Solar rate of <strong>9.91 cents per kilowatt-hour</strong> for residential systems under 1 MW-AC. Rate reviewed July 2026 and subject to change by official utility tariff revisions.
              </p>
              <div className="pt-2">
                <a 
                  href="https://austinenergy.com/rates/residential-rates/value-of-solar-rate" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-gold hover:underline inline-flex items-center space-x-1"
                >
                  <span>Official Austin Energy Value of Solar Rate Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. AUSTIN ENERGY SOLAR REBATE */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Austin Energy Solar Rebates</h2>
            <p className="text-slate-400">Residential rebate programs and eligibility guidelines.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Austin Energy announced an updated residential solar rebate of up to <strong className="text-white">$4,000</strong> for qualifying residential solar installations larger than 3 kW-DC, effective July 1, 2026.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white mb-1">System Sizing Requirement</div>
                <div className="text-xs text-slate-400">Systems generally must be larger than 3 kW-DC to qualify for the full rebate amount.</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white mb-1">Participating Contractor</div>
                <div className="text-xs text-slate-400">Rebate eligibility requires installation by an approved Austin Energy Participating Solar Contractor.</div>
              </div>
            </div>

            <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 leading-relaxed">
              <strong className="block font-bold text-amber-300 mb-1">Program Participation Notice:</strong>
              Austin Energy offers solar incentives for qualifying projects installed through participating contractors. Logic Solar is currently verifying program participation and project eligibility. Contact us to discuss the options available for your property.
            </div>
          </div>
        </div>
      </section>

      {/* 11. AUSTIN ENERGY PERMITTING AND INTERCONNECTION */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Austin Solar Permitting & Utility Approval</h2>
            <p className="text-slate-400">Managing city permits, structural reviews, and interconnection documentation.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Installing solar inside Austin limits or within Austin Energy territory involves coordination across multiple jurisdictional steps:
            </p>

            <ul className="space-y-2 list-disc pl-5 text-slate-300">
              <li><strong className="text-white">Auxiliary Power Electrical Permit:</strong> Required by the City of Austin Development Services Department.</li>
              <li><strong className="text-white">Engineering Documentation:</strong> Electrical 1-line diagrams, equipment specifications, and site layout plans.</li>
              <li><strong className="text-white">Interconnection Agreement:</strong> Executed distributed-generation documentation submitted to Austin Energy.</li>
              <li><strong className="text-white">Inspection & Meter Replacement:</strong> Municipal inspection followed by Austin Energy solar meter commissioning.</li>
            </ul>

            <div className="p-4 bg-slate-950 rounded-xl text-xs text-slate-400">
              <strong>Permitting Schedule Note:</strong> Permitting, inspection, and utility requirements vary across city limits, extraterritorial jurisdictions (ETJ), and unincorporated Travis County. Logic Solar confirms property jurisdiction and current requirements before finalizing project schedules.
            </div>
          </div>
        </div>
      </section>

      {/* 12 & 13. ONCOR & COOPERATIVE UTILITIES */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Oncor, PEC & Suburban Central Texas Utilities</h2>
            <p className="text-slate-400">Navigating solar in Round Rock, Cedar Park, Leander, Georgetown & suburban communities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-xl font-bold text-white">Oncor & Retail Solar Buyback</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                In Oncor territory (such as Round Rock or Pflugerville), Oncor manages the physical grid connection while you choose a Retail Electric Provider (REP) offering a solar buyback plan. Export rates vary by REP contract.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-xl font-bold text-white">PEC & Rural Cooperatives</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Pedernales Electric Cooperative (PEC) and Bluebonnet Electric Cooperative operate member-owned grids with distinct interconnection limits, battery backup rules, and net billing credit tariffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. SOLAR COST IN AUSTIN */}
      <section className="py-16 bg-slate-900/80 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Transparent Solar Pricing Factors in Austin</h2>
            <p className="text-slate-400">Why responsible solar engineering avoids generic price tags.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Total solar investment in the Austin metro depends on specific engineering variables rather than standard package rates:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center py-2">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-medium text-slate-200">12-Month kWh Usage</div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-medium text-slate-200">Roof Orientation & Shade</div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-medium text-slate-200">Panel & Inverter Model</div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-medium text-slate-200">Battery Capacity (kWh)</div>
            </div>

            <p className="text-xs text-slate-400">
              Logic Solar provides detailed proposal analyses comparing current electric bills, projected solar production, export compensation estimates, equipment warranties, and financing terms.
            </p>
          </div>
        </div>
      </section>

      {/* 15. RESIDENTIAL TAX CREDIT NOTICE */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="font-bold text-brand-gold text-sm flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Important Tax Credit Notice (Post-2025 IRS Status):</span>
            </div>
            <p>
              Under IRS guidelines, the former 30% federal Residential Clean Energy Credit is not available for residential solar property placed in service after December 31, 2025. Local utility incentives, commercial clean energy tax credits, and state property tax exemptions on solar equipment may still apply. Logic Solar recommends consulting a qualified CPA or tax professional regarding your property's tax position.
            </p>
          </div>
        </div>
      </section>

      {/* 16. COMMERCIAL & NONPROFIT INCENTIVES */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Commercial & Nonprofit Solar Incentives</h2>
            <p className="text-slate-400">Financial incentives for Austin businesses, schools, churches, and non-profits.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Commercial solar projects in Central Texas benefit from distinct financial mechanisms under federal tax regulations and local utility programs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">MACRS Depreciation</div>
                <div className="text-slate-400">Accelerated 5-year commercial asset depreciation.</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">Commercial Tax Credits</div>
                <div className="text-slate-400">Federal Investment Tax Credits for eligible commercial entities.</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">Elective Pay / Direct Pay</div>
                <div className="text-slate-400">Direct payment mechanisms for eligible tax-exempt entities & non-profits.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 17. BATTERY BACKUP FOR AUSTIN OUTAGES */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Solar Battery Backup for Austin Homes and Businesses
            </h2>
            <p className="text-slate-400 text-lg">
              Protect central air conditioning, heating, refrigeration, and critical loads during grid emergencies.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6 text-slate-300 text-sm leading-relaxed">
            <p>
              Grid-tied solar panels without batteries automatically shut down during grid outages to prevent backfeeding electricity onto power lines. Integrating advanced battery storage (such as <strong className="text-white font-semibold">Tesla Powerwall 3</strong> or <strong className="text-white font-semibold">FranklinWH aPower 2</strong>) creates a secure microgrid.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-base">Whole-Home vs Critical Loads</div>
                <p className="text-xs text-slate-400">
                  Critical load panels backup essential lighting, refrigeration, and electronics. Whole-home backup requires analyzing high-draw appliances like central air conditioning and water heaters.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-base">Central AC Surge Management</div>
                <p className="text-xs text-slate-400">
                  Starting a central AC compressor requires high locked rotor amps (LRA). We engineer battery inverter continuous and surge kW output to start AC compressors reliably.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <a 
                href="#austin-quote-form" 
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-amber-400 text-brand-dark font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                <span>Design My Austin Solar and Backup System</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 18. SOLAR SERVICE & SYSTEM REPAIR */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Solar Service Beyond Installation</h2>
            <p className="text-slate-400">Long-term engineering support, system diagnostics, and maintenance.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>
              Logic Solar provides system diagnostic reviews, monitoring troubleshooting, inverter replacements, battery additions, and panel detach-and-reset support. Prior to accepting third-party service projects, an initial engineering evaluation may be required.
            </p>
          </div>
        </div>
      </section>

      {/* 19. RECENT AUSTIN-AREA SOLAR PROJECTS */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Recent Austin-Area Solar Projects
            </h2>
            <p className="text-slate-400 text-lg">
              Explore custom solar installations engineered across Central Texas communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AUSTIN_PROJECTS.map((project) => (
              <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={`Logic Solar installation in ${project.city}`} 
                      className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                      {project.systemSize}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-xs text-brand-gold font-semibold uppercase">{project.type}</div>
                      <h3 className="text-xl font-bold text-white mt-1">{project.city}</h3>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                      <div><strong className="text-white">Panels:</strong> {project.panels}</div>
                      <div><strong className="text-white">Battery:</strong> {project.battery}</div>
                      <div><strong className="text-white">Racking:</strong> {project.mount}</div>
                      <div><strong className="text-white">Utility:</strong> {project.utility}</div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20. AUSTIN CUSTOMER REVIEWS */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              What Austin-Area Customers Say
            </h2>
            <p className="text-slate-400 text-lg">
              Feedback from homeowners and commercial clients across Central Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AUSTIN_REVIEWS.map((review, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex space-x-1 text-brand-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-4 mt-4">
                  <div className="font-bold text-white text-sm">{review.name}</div>
                  <div className="text-xs text-slate-400">{review.location} • {review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 21. AUSTIN SERVICE AREA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Greater Austin & Central Texas Service Area
            </h2>
            <p className="text-slate-400 text-lg">
              Logic Solar serves residential and commercial clients across four main Central Texas counties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-brand-gold border-b border-slate-800 pb-2">Travis County</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {TRAVIS_COUNTY.map(c => (
                  <span key={c.slug} className="text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-brand-gold border-b border-slate-800 pb-2">Williamson County</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {WILLIAMSON_COUNTY.map(c => (
                  <span key={c.slug} className="text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-brand-gold border-b border-slate-800 pb-2">Hays County</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {HAYS_COUNTY.map(c => (
                  <span key={c.slug} className="text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-brand-gold border-b border-slate-800 pb-2">Bastrop County</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {BASTROP_COUNTY.map(c => (
                  <span key={c.slug} className="text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 22. THE LOGIC SOLAR PROCESS */}
      <section className="py-16 md:py-24 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              The Logic Solar 5-Step Engineering Process
            </h2>
            <p className="text-slate-400 text-lg">
              Structured execution from initial usage review to utility permission to operate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 relative text-center">
              <div className="w-10 h-10 bg-brand-gold text-brand-dark rounded-full font-bold flex items-center justify-center mx-auto text-lg">1</div>
              <h3 className="text-base font-bold text-white pt-2">Utility & Usage Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Confirm your utility provider and analyze 12 months of electricity bills and tariff structures.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 relative text-center">
              <div className="w-10 h-10 bg-brand-gold text-brand-dark rounded-full font-bold flex items-center justify-center mx-auto text-lg">2</div>
              <h3 className="text-base font-bold text-white pt-2">Property Evaluation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect roof condition, shade geometry, main electrical panel capacity, and battery storage needs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 relative text-center">
              <div className="w-10 h-10 bg-brand-gold text-brand-dark rounded-full font-bold flex items-center justify-center mx-auto text-lg">3</div>
              <h3 className="text-base font-bold text-white pt-2">Custom Engineering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Engineer panel layout, electrical one-line diagrams, and battery output for optimum production.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 relative text-center">
              <div className="w-10 h-10 bg-brand-gold text-brand-dark rounded-full font-bold flex items-center justify-center mx-auto text-lg">4</div>
              <h3 className="text-base font-bold text-white pt-2">Permitting & Install</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coordinate municipal electrical permits and utility approvals prior to professional installation.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 relative text-center">
              <div className="w-10 h-10 bg-brand-gold text-brand-dark rounded-full font-bold flex items-center justify-center mx-auto text-lg">5</div>
              <h3 className="text-base font-bold text-white pt-2">Inspection & Activation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pass final municipal inspection, complete utility meter swap, and activate monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 23 & 24. COMMERCIAL & MULTIFAMILY SOLAR */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Commercial Solar Systems for Austin Businesses
            </h2>
            <p className="text-slate-400 text-lg">
              Engineered solutions for office buildings, tech facilities, retail centers, warehouses, churches, schools, and multifamily properties.
            </p>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6 text-slate-300 text-sm leading-relaxed">
            <p>
              Commercial solar analysis accounts for interval electrical demand, peak demand charges, transformer capacities, operating hours, and structural roof loading. Logic Solar evaluates ballasted non-penetrating flat roof mounts, solar carports, and energy storage integration.
            </p>

            <div className="text-center pt-2">
              <a 
                href="#austin-quote-form" 
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-amber-400 text-brand-dark font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                <span>Request an Austin Commercial Solar Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 25. ROOF CONDITION & SOLAR INSTALLATION */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Roof Condition & Solar Installation</h2>
            <p className="text-slate-400">Assessing roof age, structural integrity, and detachment considerations.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>
              Placing solar modules on an aging roof that requires replacement within a few years creates avoidable detach-and-reset costs. Our site evaluation inspects roof shingle condition, decking, structural rafters, and flashings to ensure your roof is prepared for a 25-year solar array.
            </p>
          </div>
        </div>
      </section>

      {/* 26. AUSTIN SOLAR FAQ SECTION (22 Visible FAQs) */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Frequently Asked Questions About Austin Solar
            </h2>
            <p className="text-slate-400 text-lg">
              Clear, detailed answers regarding utility rules, permitting, battery storage, and solar pricing in Central Texas.
            </p>
          </div>

          <div className="space-y-4">
            {AUSTIN_FAQS.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none focus:text-brand-gold"
                >
                  <span className="font-semibold text-white text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'transform rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-800/80 bg-slate-950/60"
                    >
                      <div className="p-6 text-slate-300 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 27. LOCAL CONTACT SECTION */}
      <section className="py-16 bg-slate-900/80 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Talk With an Austin Solar Specialist</h2>
            <p className="text-slate-400">Contact our project engineering team directly for Central Texas inquiries.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="font-bold text-white text-xl">Logic Solar Corporate Office</div>
              <p className="text-xs text-slate-400">Serving homeowners and commercial clients across Austin & Central Texas.</p>

              <div className="space-y-3 text-sm text-slate-300 pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Logic Solar Central Operations</div>
                    <div>7300 W 110th St, Plaza 1, 7th Floor</div>
                    <div>Overland Park, KS 66210</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <a href="tel:8163005781" className="hover:text-brand-gold font-semibold transition-colors">(816) 300-5781</a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <a href="mailto:sales@logic-solar.com" className="hover:text-brand-gold transition-colors">sales@logic-solar.com</a>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="text-brand-gold font-semibold text-sm">Austin Metro Service Radius</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our local project managers and installation crews cover Travis, Williamson, Hays, and Bastrop counties with complete site evaluation, permitting, and engineering support.
              </p>
              <a 
                href="#austin-quote-form" 
                className="inline-block bg-brand-gold hover:bg-amber-400 text-brand-dark font-bold px-6 py-2.5 rounded-lg text-sm transition-all"
              >
                Request Local Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 28. FINAL CONVERSION SECTION */}
      <section id="austin-quote-form" className="pt-16 md:pt-24 pb-6 bg-brand-dark text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-gold uppercase tracking-wider">
            <span>Zero-Pressure Consultation</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            See Whether Solar Makes Sense for Your Austin Property
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Our engineering team will analyze your utility provider, 12-month electric usage, roof geometry, and battery objectives to prepare a transparent financial proposal.
          </p>
        </div>
      </section>

      <QuoteForm />
    </div>
  );
}
