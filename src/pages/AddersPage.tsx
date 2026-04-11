import React from 'react';
import { motion } from 'motion/react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

const ADDERS_DATA = [
  { item: "Main Panel Upgrade", price: "$3,500" },
  { item: "Full Service Upgrade", price: "$5,000" },
  { item: "Manual Transfer Switch", price: "$1,500" },
  { item: "Meter Combination", price: "$3,000" },
  { item: "Meter Relocation", price: "$1,500" },
  { item: "Multi-Meter Installation", price: "$0.40/watt" },
  { item: "Meter Upgrade", price: "$3,000" },
  { item: "Ground Mount Installation", price: "$0.30/watt + cost of trenching" },
  { item: "Trenching", price: "$20/ft" },
  { item: "Detach and Reset", price: "$300/panel" },
  { item: "EV Charger", price: "$1,500 + Cost of Charger" },
  { item: "Flat Roof / Ballast System", price: "$0.25/watt" },
  { item: "Solar Panel Critter Guard", price: "$20/ft" },
  { item: "Franklin aPower 2 Battery", price: "$15,500" },
  { item: "24KW Generator Installation (excludes gas line and gas hookup)", price: "$13,000" },
  { item: "Enphase Encharge IQ 10 Battery", price: "$14,500" },
  { item: "Enphase IQ Battery 5P", price: "$9,000" },
  { item: "Project Site Surveys / Trip Charges / Truck Rolls", price: "$500" },
  { item: "Small System Adder (4KW to 6KW)", price: "$1,500" },
  { item: "Small System Adder (4KW or less)", price: "$2,500" },
  { item: "Company Generated Lead", price: "$0.40/watt" },
  { item: "SREC Project Filing", price: "$1,000" },
  { item: "REAP Grant Application", price: "$750 (upfront payment is subtracted once approved)" },
  { item: "LightReach", price: "+$0.10/watt" },
  { item: "Domestic Content Package", price: "$0.50/watt" },
  { item: "Midas Wealth: Full Transfer", price: "$3,000" },
  { item: "My Incentives", price: "$4,000" },
  { item: "Credit Repair", price: "$200" }
];

export const AddersPage = () => {
  return (
    <InternalFormPageTemplate
      title="Adders Pricing"
      subtitle="Review Logic Solar adders and pricing details below."
      eyebrow="Internal Utility"
    >
      <div className="space-y-1">
        {ADDERS_DATA.map((adder, index) => (
          <motion.div
            key={adder.item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 border-b border-gray-100 last:border-0 hover:bg-brand-teal/[0.02] transition-colors group"
          >
            <div className="flex-1">
              <span className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mb-1 block">
                Item {index + 1}
              </span>
              <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-teal transition-colors">
                {adder.item}
              </h3>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:border-brand-teal/20 group-hover:bg-brand-teal/5 transition-all">
                <span className="text-xl font-black text-brand-teal">
                  {adder.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </InternalFormPageTemplate>
  );
};
