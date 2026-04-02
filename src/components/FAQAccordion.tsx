import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQAccordion = ({ items, className }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={cn(
            "rounded-3xl border border-gray-100 transition-all duration-300",
            openIndex === index ? "bg-white shadow-xl border-brand-gold/20" : "bg-gray-50 hover:bg-white hover:shadow-md"
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-8 py-7 flex items-center justify-between text-left group"
          >
            <span className={cn(
              "text-lg font-bold transition-colors tracking-tight",
              openIndex === index ? "text-brand-dark" : "text-brand-dark/60 group-hover:text-brand-dark"
            )}>
              {item.question}
            </span>
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
              openIndex === index ? "bg-brand-gold text-brand-dark rotate-180" : "bg-white text-brand-dark/20 group-hover:text-brand-dark/40"
            )}>
              {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 text-brand-dark/60 leading-relaxed font-medium">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
