import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { motion } from 'motion/react';
import { FileCheck, Clock } from 'lucide-react';

export const HIAPage = () => {
  return (
    <InternalFormPageTemplate
      title="Home Improvement Agreement"
      subtitle="Generate and review project-specific legal agreements for customer signature."
      eyebrow="Contract Management"
    >
      <div className="flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-brand-gold/20 rounded-[40px] bg-brand-gold/5 p-12 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-brand-gold/10 flex items-center justify-center mb-8"
        >
          <FileCheck className="w-10 h-10 text-brand-gold" />
        </motion.div>
        
        <h3 className="text-3xl font-bold text-brand-dark mb-4 tracking-tight">Agreement Tool Coming Soon</h3>
        <p className="text-brand-dark/50 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
          The Home Improvement Agreement generator is currently being integrated into the sales portal. Check back shortly.
        </p>

        <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-brand-gold/10 text-brand-gold">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm tracking-wide">Under Construction</span>
        </div>
        
        {/* 
            GHL EMBED INSTRUCTIONS:
            Paste your GoHighLevel agreement form or signing portal iframe below this comment.
        */}
      </div>
    </InternalFormPageTemplate>
  );
};
