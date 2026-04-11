import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export const QuoteForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.logic-solar.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="quote-form" className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-teal rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-brand-gold p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-brand-dark mb-6 leading-tight">
                Get Your Free <br />Solar Quote
              </h2>
              <p className="text-brand-dark/70 font-medium leading-relaxed mb-8">
                Join 12,000+ homeowners who have switched to Logic Solar. Our experts will analyze your home and provide a custom savings report.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">1</span>
                </div>
                <span className="font-bold text-brand-dark">Custom Design</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">2</span>
                </div>
                <span className="font-bold text-brand-dark">Savings Analysis</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">3</span>
                </div>
                <span className="font-bold text-brand-dark">Expert Consultation</span>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-4 lg:p-8 min-h-[600px]">
            <iframe
              src="https://link.logic-solar.com/widget/form/jXEWmVgfutwbzVW9JGIu"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
              id="inline-jXEWmVgfutwbzVW9JGIu" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Google ads 1 Form"
              data-height="911"
              data-layout-iframe-id="inline-jXEWmVgfutwbzVW9JGIu"
              data-form-id="jXEWmVgfutwbzVW9JGIu"
              title="Google ads 1 Form"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

