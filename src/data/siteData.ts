export const siteData = {
  name: "Logic Solar",
  tagline: "The Logical Choice for Energy Independence",
  description: "Premium solar solutions designed for performance, elegance, and long-term savings.",
  contact: {
    phone: "(816) 300-5781",
    email: "sales@logic-solar.com",
    address: "7300 W 110th St Plaza 1, 7th Floor, Overland Park, KS 66210",
  },
  nav: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "#",
      children: [
        { name: "Solar Installation", href: "/services/installation" },
        { name: "Battery Backup", href: "/services/battery" },
        { name: "Commercial Solar", href: "/services/commercial" },
        { name: "Solar Incentives", href: "/services/incentives" },
        { name: "How Solar Works", href: "/services/how-it-works" },
      ]
    },
    { name: "Service Areas", 
      href: "#",
      children: [
        { name: "Texas", href: "/locations/texas" },
        { name: "Oklahoma", href: "/locations/oklahoma" },
        { name: "Kansas", href: "/locations/kansas" },
        { name: "Illinois", href: "/locations/illinois" },
        { name: "Missouri", href: "/locations/missouri" },
        { name: "Colorado", href: "/locations/colorado" },
      ]
    },
    { name: "Financing", href: "/financing" },
    { name: "FAQ", href: "/faq" },
    { name: "Store", href: "http://logic.myreward.store/" },
    { name: "Contact", href: "/contact" },
  ],
  stats: [
    { label: "Energy Savings", value: "40%+", icon: "Zap" },
    { label: "Homes Powered", value: "1k+", icon: "Home" },
    { label: "Customer Rating", value: "4.9/5", icon: "Star" },
    { label: "Years Warranty", value: "25", icon: "ShieldCheck" },
  ],
  services: [
    {
      id: "installation",
      slug: "installation",
      title: "Residential Solar Installation",
      shortDescription: "Custom-engineered solar systems that blend seamlessly with your home's architecture.",
      fullDescription: "Our residential solar solutions are designed for homeowners who demand both performance and aesthetics. We use Tier-1 premium panels and precision mounting systems to ensure your home looks as good as it performs.",
      features: [
        "Tier-1 All-Black Premium Panels",
        "Micro-Inverter Technology for Max Efficiency",
        "Invisible Mounting Systems",
        "25-Year Performance Guarantee"
      ],
      benefits: [
        "Reduce monthly bills by up to 70%",
        "Increase home property value",
        "State & local incentive eligibility",
        "Backup power readiness"
      ],
      icon: "Sun",
      backgroundImage: "/images/installation-hero.jpg"
    },
    {
      id: "battery",
      slug: "battery",
      title: "Battery Backup & Storage",
      shortDescription: "Energy independence with premium storage solutions like Tesla Powerwall.",
      fullDescription: "Never worry about grid failure again. Our battery storage solutions store excess solar energy during the day to power your home through the night or during unexpected outages.",
      features: [
        "Tesla Powerwall Certified Installer",
        "Automatic Transfer During Outages",
        "Smart App Energy Monitoring",
        "Compact, Indoor/Outdoor Design"
      ],
      benefits: [
        "Total grid independence",
        "Zero interruption during outages",
        "Time-of-use load shifting",
        "Peace of mind for your family"
      ],
      icon: "Battery",
      backgroundImage: "/images/battery-hero.jpg",
      imagePosition: "object-right"
    },
    {
      id: "commercial",
      slug: "commercial",
      title: "Commercial Solar Solutions",
      shortDescription: "Scale your business efficiency with high-output commercial energy systems.",
      fullDescription: "Logic Solar helps businesses turn unused roof space into a high-yield asset. Our commercial systems are optimized for maximum ROI and long-term sustainability.",
      features: [
        "Large-Scale System Design",
        "Custom Energy Analytics",
        "Commercial Financing Options",
        "Ongoing Maintenance & Monitoring"
      ],
      benefits: [
        "Significant tax depreciation benefits",
        "Locked-in energy costs for decades",
        "Corporate sustainability leadership",
        "Reduced operational overhead"
      ],
      icon: "Building2",
      backgroundImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=2000"
    }
  ],
  locations: [
    {
      slug: "missouri",
      city: "Missouri",
      state: "MO",
      title: "Premium Solar Installation in Missouri",
      description: "Logic Solar provides elite solar energy solutions to homeowners across the Show-Me State. From St. Louis to Kansas City, we bring premium energy to Missouri.",
      backgroundImage: "/images/missouri-hero.jpg",
      highlights: [
        "Show-Me State Incentives",
        "St. Louis & KC Local Teams",
        "Ameren/Evergy Interconnection Experts",
        "Agricultural Solar Specialists"
      ]
    },
    {
      slug: "illinois",
      city: "Illinois",
      state: "IL",
      title: "Illinois's Choice for Luxury Solar",
      description: "Harness the power of the sun in the Prairie State with high-performance solar systems designed for the midwestern climate.",
      backgroundImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000",
      highlights: [
        "Illinois Shines Program Benefits",
        "Chicago Metro Service Area",
        "ComEd/Ameren Rebate Experts",
        "Winter-Optimized Panel Systems"
      ]
    },
    {
      slug: "kansas",
      city: "Kansas",
      state: "KS",
      title: "High-Performance Solar in Kansas",
      description: "Experience total energy independence in the Sunflower State with Logic Solar's custom-engineered residential systems.",
      backgroundImage: "/images/kansas-hero.jpg",
      highlights: [
        "High Solar Irradiance Performance",
        "Storm-Resistant Mounting",
        "Evergy Solar Incentives",
        "Rural & Residential Experts"
      ]
    },
    {
      slug: "oklahoma",
      city: "Oklahoma",
      state: "OK",
      title: "Oklahoma's Premium Solar Provider",
      description: "Bringing world-class solar technology and tornado-grade engineering to Oklahoma families and businesses.",
      backgroundImage: "/images/oklahoma-hero.jpg",
      highlights: [
        "Sooners State Solar Credits",
        "Tornado-Grade Engineering",
        "OG&E/PSO Network Experts",
        "Maximum Heat Efficiency"
      ]
    },
    {
      slug: "texas",
      city: "Texas",
      state: "TX",
      title: "Texas-Sized Energy Independence",
      description: "From Dallas to Austin, Logic Solar delivers the most reliable and efficient solar solutions for the Lonestar State.",
      backgroundImage: "/images/texas-hero.jpg",
      highlights: [
        "Texas-Sized Energy Savings",
        "Off-Grid Readiness",
        "Oncor/CenterPoint Specialists",
        "Lonestar Performance Warranty"
      ]
    },
    {
      slug: "colorado",
      city: "Colorado",
      state: "CO",
      title: "Colorado's Premier Solar Provider",
      description: "From Denver to Colorado Springs, Logic Solar delivers high-performance solar systems built for Colorado's 300 days of sunshine and mountain climate.",
      backgroundImage: "/images/colorado-hero.jpg",
      highlights: [
        "300 Days of Sunshine Per Year",
        "Xcel Energy Net Metering Experts",
        "CO Residential Energy Tax Credit",
        "Mountain-Grade System Engineering"
      ]
    }
  ],
  faqClusters: [
    {
      category: "Process",
      questions: [
        {
          question: "How long does the installation process take?",
          answer: "The typical installation takes 1-3 days, but the entire process from design to activation usually spans 4-8 weeks due to permitting and utility interconnection."
        },
        {
          question: "What is involved in the design phase?",
          answer: "We use advanced drone mapping and thermal scans to create a 3D model of your home, ensuring the most efficient and aesthetically pleasing layout."
        }
      ]
    },
    {
      category: "Savings",
      questions: [
        {
          question: "How much can I actually save with solar?",
          answer: "Most Logic Solar customers see a 40-70% reduction in their monthly utility bills. With current incentives, many systems pay for themselves in 5-7 years."
        },
        {
          question: "Are there still government incentives available?",
          answer: "The federal Investment Tax Credit (ITC) has been eliminated. However, many states and local utilities still offer rebates and performance-based incentives. Contact us to find out what's available in your area."
        }
      ]
    }
  ],
  faqs: [
    {
      question: "How much can I actually save with solar?",
      answer: "Most Logic Solar customers see a 40-70% reduction in their monthly utility bills. With current incentives, many systems pay for themselves in 5-7 years."
    },
    {
      question: "What happens during a power outage?",
      answer: "Standard solar systems shut off for safety. However, with our Battery Backup solutions, your home switches to stored energy instantly, keeping your lights and essentials running."
    },
    {
      question: "Are there still government incentives available?",
      answer: "The federal Investment Tax Credit (ITC) has been eliminated. However, many states and local utilities still offer rebates and performance-based incentives. Contact us to find out what's available in your area."
    }
  ]
};
