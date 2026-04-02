import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { siteData } from '@/src/data/siteData';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-8 tracking-tight">
              Common Questions About <span className="text-brand-gold">Logic Solar</span>
            </h2>
            <p className="text-lg text-brand-dark/60 mb-10">
              We believe in transparency. If you have a question that isn't answered here, our experts are ready to help.
            </p>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold mb-4">Need a direct answer?</h4>
              <p className="text-brand-dark/60 mb-6">Our solar consultants are available for a no-pressure conversation.</p>
              <a href="tel:8005555555" className="text-brand-gold font-extrabold text-2xl hover:underline">
                {siteData.contact.phone}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {siteData.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-brand-dark">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-brand-gold" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-dark/40" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-brand-dark/60 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
