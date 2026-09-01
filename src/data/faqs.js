/**
 * FAQ copy shared between the React pages and scripts/prerender.js.
 *
 * Plain ESM JavaScript so the Node prerender script can import it directly:
 * the FAQPage schema emitted into the prerendered HTML must quote exactly
 * the Q&A text the hydrated page renders, so both read from here.
 */

// Rendered by FAQSection on the homepage.
export const homeFaqs = [
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
];

// Rendered by the /faq page, grouped by category.
export const faqClusters = [
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
];

/**
 * The four generated Q&As CityFAQSection renders on every non-flagship
 * city page. `stateData` is the state object from locations-solar.json.
 */
export function buildCityFaqs(city, stateData) {
  const state = stateData.name;
  const sunlightDays = stateData.sunlightDays ?? 200;
  const utilityFocus = stateData.utilityFocus ?? 'local utility net metering programs';
  const stateIncentive = stateData.stateIncentive ?? 'the Federal Solar Investment Tax Credit (ITC)';

  return [
    {
      question: `Are solar panels worth it in ${city}, ${state}?`,
      answer: `Absolutely! With ${state}'s average of ${sunlightDays} sunny days per year and local utility programs like ${utilityFocus}, ${city} homeowners consistently see excellent returns on their solar investment. Most Logic Solar customers in ${city} break even within 6–8 years and enjoy decades of free energy production after that.`,
    },
    {
      question: `What is the best solar incentive in ${state}?`,
      answer: `Homeowners in ${city} can take advantage of ${stateIncentive} to significantly lower the upfront cost of a solar installation. When combined with net metering credits and Logic Solar's flexible financing options, the out-of-pocket cost becomes very manageable for most families.`,
    },
    {
      question: `How long does solar installation take in ${city}?`,
      answer: `Our ${city} installation crews typically complete a standard residential solar system in 1–2 days. From your initial quote through final utility interconnection, the full process usually takes 4–8 weeks depending on local permitting timelines in ${state}.`,
    },
    {
      question: `Does Logic Solar offer battery backup in ${city}?`,
      answer: `Yes! Battery backup systems like the Tesla Powerwall and Enphase IQ Battery are available to every ${city} homeowner. Given ${state}'s utility rate structures and occasional grid outages, pairing solar with storage is one of the smartest investments you can make for energy independence.`,
    },
  ];
}
