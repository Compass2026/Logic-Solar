import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface StateData {
  name: string;
  heroImage?: string;
  sunlightDays?: number;
  utilityFocus?: string;
  stateIncentive?: string;
  cities: { city: string; slug: string; state: string; stateName: string }[];
}

interface CityFAQSectionProps {
  city: string;        // e.g. "Austin"
  stateData: StateData;
}

// ─── FAQ Generation ──────────────────────────────────────────────────────────

function buildFAQs(city: string, stateData: StateData) {
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

// ─── JSON-LD Schema ──────────────────────────────────────────────────────────

function buildSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export const CityFAQSection = ({ city, stateData }: CityFAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = buildFAQs(city, stateData);
  const schema = buildSchema(faqs);

  return (
    <section className="py-24 md:py-32 bg-white" id="city-faq">
      {/* ── Invisible SEO: FAQPage JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
      />

      <div className="container-custom">
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-dark rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest mb-5">
              <HelpCircle className="w-4 h-4 text-brand-gold" />
              Local Solar FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-5 tracking-tight">
              Solar Questions Answered for{' '}
              <span className="text-brand-gold">{city}</span>
            </h2>
            <p className="text-lg text-brand-dark/60 leading-relaxed">
              Real answers about going solar in {city}, {stateData.name} — no jargon, no
              pressure.
            </p>
          </motion.div>
        </div>

        {/* ── Accordion ── */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={[
                  'rounded-3xl border transition-all duration-300',
                  isOpen
                    ? 'bg-white border-brand-gold/30 shadow-xl'
                    : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md',
                ].join(' ')}
              >
                <button
                  id={`city-faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`city-faq-a-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 px-8 py-7 text-left group"
                >
                  <span
                    className={[
                      'text-lg font-bold leading-snug transition-colors',
                      isOpen
                        ? 'text-brand-dark'
                        : 'text-brand-dark/60 group-hover:text-brand-dark',
                    ].join(' ')}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={[
                      'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 mt-0.5',
                      isOpen
                        ? 'bg-brand-gold text-brand-dark'
                        : 'bg-white text-brand-dark/30 group-hover:text-brand-dark/60',
                    ].join(' ')}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`city-faq-a-${index}`}
                      role="region"
                      aria-labelledby={`city-faq-q-${index}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 text-brand-dark/65 leading-relaxed font-medium text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-brand-dark/50 text-base mb-4 font-medium">
            Have a question we didn't cover?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark font-extrabold px-8 py-4 rounded-2xl hover:bg-brand-gold-bright transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Ask Our {city} Experts
          </a>
        </motion.div>
      </div>
    </section>
  );
};
