/**
 * Wichita hub — data for the service-specific Wichita pages
 * (/locations/kansas/wichita/residential, /battery, /commercial, /projects).
 *
 * Plain ESM JavaScript shared by scripts/prerender.js and the React page,
 * so prerendered meta, body copy, and FAQPage schema always match what
 * hydration renders. All copy is harvested from the approved Wichita page
 * content — no savings percentages, payback windows, or claims flagged in
 * SITEWIDE_CLAIMS_AUDIT.md.
 */

const WICHITA_PHONE = '(316) 669-7219';

// Verified projects — moved from WichitaKSPage.tsx so the projects page
// and the main Wichita page render the same data.
export const WICHITA_PROJECTS = [
  {
    id: 'wichita-res-1',
    city: 'Wichita, KS (East Wichita)',
    type: 'Residential Solar & Battery Backup',
    systemSize: '11.8 kW DC',
    panels: '29 High-Efficiency Monocrystalline Panels',
    inverter: 'Enphase IQ8M Microinverters',
    battery: 'Tesla Powerwall 2 (13.5 kWh)',
    mount: 'Rooftop Pitch Mount (Architectural Shingle)',
    utility: 'Evergy Kansas Central',
    installationYear: '2025',
    summary: 'Custom-engineered rooftop array with sleek zero-conduit aesthetics, configured for automatic battery transfer during seasonal thunder and wind storms.',
    image: '/images/hero-roof.jpg',
    verified: true
  },
  {
    id: 'wichita-res-2',
    city: 'Andover, KS',
    type: 'Residential Solar Array',
    systemSize: '14.2 kW DC',
    panels: '35 All-Black Premium Modules',
    inverter: 'Enphase IQ8+ Microinverters',
    battery: 'Grid-Tied Storage Ready',
    mount: 'South & West Facing Roof Pitch',
    utility: 'Evergy Kansas Central',
    installationYear: '2025',
    summary: 'Designed to offset 108% of annual electricity consumption for a growing suburban household with high summer cooling demand.',
    image: '/images/hero-house-solar.jpg',
    verified: true
  },
  {
    id: 'wichita-ag-1',
    city: 'Sedgwick County, KS (Rural Goddard)',
    type: 'Agricultural Ground-Mounted Solar & Storage',
    systemSize: '24.0 kW DC',
    panels: '60 Commercial-Grade Monocrystalline Panels',
    inverter: 'Ground-Mount Dual Inverter Assembly',
    battery: 'Commercial Energy Storage Array',
    mount: 'Fixed Ground Mount with Heavy Structural Anchoring',
    utility: 'Sedgwick County Electric Cooperative',
    installationYear: '2025',
    summary: 'Heavy-duty ground-mounted solar installation powering workshop equipment and farm buildings, engineered for high wind resistance.',
    image: '/images/groundmount-solar.jpg',
    verified: true
  }
];

// The 17 Wichita FAQs — moved from WichitaKSPage.tsx verbatim. The main
// Wichita page renders all of them; hub pages render topical subsets.
export const WICHITA_FAQS = [
  {
    q: "Is solar worth it in Wichita, Kansas?",
    a: "Yes. Wichita receives over 220 sunny days per year on average, offering exceptional solar irradiance for rooftop and ground-mounted solar arrays. When paired with custom system engineering, Evergy Kansas Central interconnection, and protection against rising regional electric utility rates, solar panel systems provide reliable long-term energy savings and property value enhancement across south-central Kansas."
  },
  {
    q: "How much do solar panels cost in Wichita?",
    a: "Solar system costs in Wichita depend on your 12-month electrical usage, roof orientation, roof condition, shading, panel quantity, inverter selection, potential main electrical panel upgrades, and whether battery backup is included. Logic Solar avoids arbitrary averages or generic quotes, providing a custom engineering evaluation based on your property's actual utility bills and structural layout."
  },
  {
    q: "Does Logic Solar install solar panels in Wichita?",
    a: "Yes. Logic Solar designs, permits, and installs custom residential solar panels, battery backup storage, and commercial solar energy systems throughout Wichita and surrounding Sedgwick, Butler, Harvey, and Sumner County communities."
  },
  {
    q: "Does Logic Solar have a Wichita office?",
    a: "Logic Solar serves Wichita and south-central Kansas from our Kansas regional office located at 7300 W 110th St, Plaza 1, 7th Floor, Overland Park, KS 66210. Our specialized installation crews travel directly to Wichita to conduct property evaluations, engineering reviews, equipment delivery, physical installations, and ongoing workmanship service."
  },
  {
    q: "Which utility serves Wichita solar customers?",
    a: "Most properties within the city of Wichita and nearby suburbs are served by Evergy Kansas Central. Outlying rural properties and nearby communities in south-central Kansas may be served by rural electric cooperatives such as Sedgwick County Electric Cooperative or Butler Electric Cooperative, or municipal utilities."
  },
  {
    q: "How does Evergy Kansas Central solar interconnection work?",
    a: "Evergy Kansas Central requires a formal interconnection application, including detailed site plans, equipment spec sheets, single-line electrical diagrams, and municipal inspection sign-offs prior to issuing Permission to Operate (PTO) and completing meter exchanges. Logic Solar handles the complete utility filing, engineering documentation, and inspection coordination on your behalf."
  },
  {
    q: "Do Wichita homeowners still receive a federal residential solar tax credit?",
    a: "Federal and local clean energy incentive rules have changed for residential projects placed in service in 2026. While state and local utility policies vary, homeowners should consult a qualified tax professional to evaluate current tax eligibility, deductions, or utility program incentives applicable to their specific financial situation."
  },
  {
    q: "Are commercial solar incentives still available?",
    a: "Yes. Qualifying commercial, industrial, and agricultural enterprises may take advantage of federal commercial clean energy tax credits, accelerated depreciation (MACRS), and USDA REAP grants under separate commercial tax regulations. Eligibility depends on entity type, construction timing, domestic content, and project sizing. We recommend reviewing your project with a CPA or corporate tax advisor."
  },
  {
    q: "Will solar panels work during a power outage?",
    a: "Standard grid-tied solar systems shut down automatically during grid outages to protect utility line technicians. However, when your system is paired with a battery backup storage system (such as Tesla Powerwall or Enphase IQ Battery), your system automatically isolates from the grid during blackouts, powering your critical household circuits."
  },
  {
    q: "Do I need a battery with my solar system?",
    a: "A battery storage system is optional but strongly recommended for Wichita property owners seeking resilience against severe weather blackouts. Systems can be installed as solar-only or custom-engineered as battery-ready for future storage additions."
  },
  {
    q: "Can solar panels handle Wichita hail and severe weather?",
    a: "Quality solar modules installed by Logic Solar are tested and certified to recognized industry impact standards, including tempered glass rated for heavy wind loads and hail impact. While no rooftop product is immune to extreme tornado-force storms, Logic Solar uses structural racking and high-grade attachment hardware designed specifically for Kansas wind and weather exposure."
  },
  {
    q: "Can Logic Solar install ground-mounted solar?",
    a: "Yes. Ground-mounted solar arrays are ideal for Wichita-area rural properties, farms, acreage, or homes with heavy roof shading or architectural limitations. Ground mounts allow optimal tilt angles and panel orientation for maximum solar collection."
  },
  {
    q: "Can Logic Solar install solar for Wichita businesses?",
    a: "Yes. We engineer commercial solar systems for manufacturing facilities, aviation suppliers, warehouses, distribution centers, retail properties, office buildings, churches, and agricultural operations across south-central Kansas."
  },
  {
    q: "Can solar be installed on a farm or rural property?",
    a: "Yes. Rural residential, farm, and agricultural properties in Sedgwick and surrounding counties benefit significantly from custom ground-mounts, three-phase electrical integrations, and energy storage designed for heavy equipment loads."
  },
  {
    q: "What happens if my roof needs replacement?",
    a: "Logic Solar offers professional solar panel removal and reinstallation (detach and reset) services. If your roof experiences storm damage or reaches the end of its lifespan, our technicians safely unmount the panels, store them during re-roofing, and reinstall the array once roofing work is completed."
  },
  {
    q: "How long does the complete solar process take?",
    a: "While physical rooftop installation typically takes only 1 to 3 days, the complete process—including site analysis, custom structural & electrical engineering, municipal permitting, HOA reviews, Evergy interconnection approval, and final meter activation—generally spans 4 to 8 weeks."
  },
  {
    q: "How do I request a Wichita solar estimate?",
    a: "Getting started is straightforward. Request a custom estimate through our online form or call our Wichita team at (316) 669-7219. We will review your property address, analyze your average electric bill, and prepare a custom engineering proposal with zero sales pressure."
  }
];

const pick = (...questions) =>
  questions.map((q) => {
    const faq = WICHITA_FAQS.find((f) => f.q === q);
    if (!faq) throw new Error(`Unknown Wichita FAQ: ${q}`);
    return faq;
  });

export const WICHITA_HUB = {
  residential: {
    crumb: 'Residential Solar',
    title: 'Residential Solar Panels in Wichita, KS | Logic Solar',
    description: `Custom-engineered rooftop and ground-mount solar panels for Wichita homes. 12-month usage analysis, Evergy interconnection, Tier 1 equipment. ${WICHITA_PHONE}.`,
    h1: 'Residential Solar Panel Installation in Wichita',
    intro: [
      'Logic Solar designs and installs custom rooftop solar panel systems for Wichita homes. Every project starts with a 12-month usage analysis, roof condition evaluation, panel layout optimization, microinverter wiring, visual concealment, and full Evergy Kansas Central utility interconnection.',
      'Wichita properties vary significantly in roof orientation, slope, age, shading conditions, electrical service panel capacity, and annual power consumption patterns. A high-performance solar system cannot be designed using standard pre-packaged kits or generic assumptions — our engineering team conducts a property-specific analysis based on your actual utility usage history, roof geometry, available sun exposure, and backup-power priorities.',
    ],
    features: [
      {
        title: 'Engineered for Kansas weather',
        text: 'Wichita experiences severe convective spring storms, high sustained wind gusts, and seasonal hail. Rooftop attachment hardware is structurally calculated for Kansas wind load pressures, with Tier-1 modules rated for heavy tempered-glass impact standards.',
      },
      {
        title: 'Roof condition comes first',
        text: 'Installing solar on an aging roof that needs replacement within a few years creates avoidable removal and reinstallation expense. Before mounting, we evaluate roof structural framing, shingle condition, and underlayment integrity — and coordinate detach-and-reset with licensed roofers when a roof needs work first.',
      },
      {
        title: 'Ground-mount options',
        text: 'Ground-mounted arrays are ideal for Wichita-area rural properties, farms, acreage, or homes with heavy roof shading. Ground mounts allow optimal tilt angles and panel orientation for maximum solar collection.',
      },
    ],
    faqs: pick(
      'Is solar worth it in Wichita, Kansas?',
      'How much do solar panels cost in Wichita?',
      'Can solar panels handle Wichita hail and severe weather?',
      'How long does the complete solar process take?'
    ),
  },
  battery: {
    crumb: 'Battery Backup',
    title: 'Wichita Battery Backup & Solar Storage Installation | Logic Solar',
    description: `Logic Solar installs Tesla Powerwall, FranklinWH and Enphase battery backup in Wichita, KS — essential circuits stay powered through storm outages. ${WICHITA_PHONE}.`,
    h1: 'Battery Backup & Energy Storage Installation in Wichita',
    intro: [
      'Standard grid-tied solar panels do not operate during a power outage. Adding a battery backup system — such as Tesla Powerwall, FranklinWH, or Enphase IQ Battery — ensures automatic, instant transfer to stored power when Midwestern severe weather knocks out the grid.',
      'Storm-driven power outages across Sedgwick County make battery backup integration essential for Wichita property owners who need uninterrupted power for medical equipment, refrigeration, or HVAC systems. Logic Solar custom-engineers battery architectures for essential circuits or whole-home loads.',
    ],
    features: [
      {
        title: 'Essential circuits',
        text: 'Powers refrigeration, medical equipment, WiFi routers, and home lighting automatically when the grid goes down.',
      },
      {
        title: 'Critical HVAC & pumps',
        text: 'Custom-configured for sumps, well pumps, or high-efficiency heat pumps that cannot afford downtime.',
      },
      {
        title: 'Generator integration',
        text: 'Combines solar, battery storage, and automated backup generators for multi-day outage resilience.',
      },
    ],
    faqs: pick(
      'Will solar panels work during a power outage?',
      'Do I need a battery with my solar system?',
      'Which utility serves Wichita solar customers?'
    ),
  },
  commercial: {
    crumb: 'Commercial Solar',
    title: 'Commercial Solar Installation in Wichita, KS | Logic Solar',
    description: `Commercial and agricultural solar for Wichita businesses: flat-roof ballast, ground mounts, three-phase integration, demand-charge analysis. ${WICHITA_PHONE}.`,
    h1: 'Commercial Solar Installation in Wichita',
    intro: [
      'Logic Solar delivers high-yield commercial solar installations for manufacturing facilities, aviation suppliers, warehouses, distribution centers, retail properties, office buildings, churches, schools, and agricultural operations across south-central Kansas.',
      'Commercial projects are engineered around interval usage data and peak demand charge analysis, with ballasted flat-roof and ground-mount array design, three-phase electrical infrastructure review, and construction sequencing planned for minimal operational disruption.',
    ],
    features: [
      {
        title: 'Agricultural energy systems',
        text: 'Rural and farm properties in Sedgwick and surrounding counties benefit from custom ground-mounts, three-phase electrical integrations, and energy storage designed for heavy equipment loads.',
      },
      {
        title: 'Utility & permitting handled',
        text: 'Our internal team prepares electrical single-lines, files permits, coordinates municipal inspections, and completes Evergy Kansas Central interconnection documents on your behalf.',
      },
      {
        title: 'Commercial tax frameworks',
        text: 'Qualifying commercial, industrial, and agricultural enterprises may take advantage of federal commercial clean energy tax credits, MACRS accelerated depreciation, and USDA REAP grants — reviewed with your CPA or corporate tax advisor.',
      },
    ],
    faqs: pick(
      'Can Logic Solar install solar for Wichita businesses?',
      'Are commercial solar incentives still available?',
      'Can solar be installed on a farm or rural property?'
    ),
  },
  projects: {
    crumb: 'Wichita Projects',
    title: 'Wichita Solar Projects & Case Studies | Logic Solar',
    description: 'Recent Logic Solar installations across Wichita, Andover, and rural Sedgwick County: residential rooftop solar, battery backup, and agricultural ground-mount systems.',
    h1: 'Recent Wichita-Area Solar Projects',
    intro: [
      'Explore custom residential, commercial, and agricultural solar arrays engineered by Logic Solar across south-central Kansas. Every project below is a verified installation with real system specifications.',
    ],
    features: [],
    faqs: [],
    projects: WICHITA_PROJECTS,
  },
};

export const WICHITA_HUB_PHONE = WICHITA_PHONE;
